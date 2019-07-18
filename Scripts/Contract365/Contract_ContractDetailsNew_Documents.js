var parentfolderidtopass = "";
var dropdownlength = 0;
var uploadedfilecount = 0;
var contractparentfolderid = "";

$(document).ready(function () {
    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
    var vDocLibFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "20" && n.Status == "ON");
    });
    var details = "";
    //manoj
    if (typeof (localStorage.MaxRequestLength) != "undefined" && localStorage.MaxRequestLength != null && localStorage.MaxRequestLength != "") {
        $("#lblmaxsize").text("(Max " + Math.round(parseInt(localStorage.MaxRequestLength) / 1024) + "MB file.)");
    } else {
        $("#lblmaxsize").text("(Max 4MB file.)");
    }
    //manoj

    if (vDocLibFeat.length > 0) {
        //Tab width decrease
        if (!($(".borderTop_Right_none").hasClass("newdocview"))) {
            $(".borderTop_Right_none").addClass('newdocview');
        }
        //Tab width decrease
        details += '<div class="row-group"><div class="col11 no-pad" style="width:96% !important;"><div class="col7"><img src="/Content/Images/documents.png"> <a title="Displays Folder(s) and Document(s) associated with the Contract Record." href="javascript:void(0);" class="link-head" onclick="javascript: togglediv(\'ulDocument\', \'dvDocument\', \'imgdoc\');">Documents (<i id="lblDocumentsCount"></i>)</a><a href="javascript:void(0);" id="documentsort" class="add-btn close1 margin-left-5 obligation-act-new openmenuDocumentSort" style="display:none"><img src="../Content/Images/down_arrow_blk.png" alt="" title=""></a><a href="javascript:void(0);" class="add-btn close1 Contribute" id="btnAddContractDocument"><img src="/Content/Images/add-icon.png">Add</a><label class="details-label Contribute" id="lblAddContractDocument">or Drag & Drop</label><a href="javascript:void(0);" class="add-btn close1 Contribute" id="btnaddnewsubfolder" style="display:none"><img src="/Content/Images/add-icon.png">Manage Folder</a><a href="javascript:void(0);" id="documentMultiActions" class="add-btn close1 margin-left-5 obligation-act-new openmenuDocumentMultiActions" style="display:none"><img src="../Content/Images/icon/drop.png" style="height:14px !important;"></a></div>'
               + '<div class="col2" style="width: 12%;padding: 0;float:right;"><ul id="ulFolderDocumentView" class="tab"><li style="display:inline-block;"><a href="javascript:void(0);" id="listfolderdocumentview" class="tablinks group-wit-btn active" data-value="folder" onclick="DisplayDocument(\'folder\')"><img src="/Content/Images/folder-view.png" title="Displays Folder(s) and Documents(s) associated with Contract Record"></a></li><li style="display:inline-block; margin-left:-1px;"><a href="javascript:void(0);" id="listdocumentview" data-value="document" class="tablinks group-wit-btn" onclick="DisplayDocument(\'document\')"><img src="/Content/Images/list-view.png" title="Displays Documents(s) associated with Contract Record"></a></li></ul></div><div id="dvdocumentkeyword" style="width: 29%; float:left"><input style="width: 72%;float: left;padding: 5px 27px 5px 5px; border: 1px solid #ccc!important;" id="txtdocumentkeyword" name="keyword" placeholder="Document(s) Search" class="topSearchBox validelement" type="text"><img class="poPSear" style="cursor: pointer;position: relative;left: -62px;top: 1px;padding: 4px 0px 5px 5px;" onclick="javascript:SearchDocumentKeyword();" src="/Content/Images/search1.png"><a href="javascript:void(0)" class="linkPickerClear" style="float: left;display: block;margin-left: 4px!important;margin-top: 7px!important;" onclick="ClearDocumentKeyword();">Clear</a></div></div>'
               + '<div class="col1 text-right no-pad" style="width:3% !important;"><a href="javascript:void(0);" class="close1" onclick="javascript: togglediv(\'ulDocument\', \'dvDocument\', \'imgdoc\');"><img id="imgdoc" src="/Content/Images/e-open.png"></a></div></div><h2 id="showAll" class="box-title" style="margin-left: 26px;float: none;line-height: 16px;margin-top: 5px;"></h2><div class="row-group"><div class="col12"><div id="holder" style="width:100%;"><div id="iddropfile" class="dropfiles" style="display:none;">Drop files here.</div><ul class="ul-data" id="ulDocumentLoading"></ul><ul class="ul-data" id="ulDocument"></ul><span id="uploaddocumentprocess" style="font-size:12px; display:none;"><img src="/Content/Images/loading.gif" /> Uploading...</span></div></div><div id="dvDocument" class="col12 pad-top"></div></div>';
        $("#dvtabDocumentView").html(details);
        $("#dvtabSummaryDocumentView").html('<div class="row-group"><div class="col10 no-pad"><img src="/Content/Images/documents.png"> <a title="Displays Primary and Pinned Document(s) associated with the Contract Record." href="javascript:void(0);" class="link-head" onclick="javascript: togglediv(\'ulPinDocument\', \'dvPinDocument\', \'imgPindoc\');">Primary and Pinned Document(s) (<i id="lblPinDocumentsCount"></i>)</a><a href="javascript:void(0);" id="pindocumentsort" class="add-btn close1 margin-left-5 obligation-act-new openmenuDocumentSort" style="display:none"><img src="../Content/Images/down_arrow_blk.png" alt="" title=""></a></div><div class="col2 text-right no-pad"><a href="javascript:void(0);" class="close1" onclick="javascript: togglediv(\'ulPinDocument\', \'dvPinDocument\', \'imgPindoc\');"><img id="imgPindoc" src="/Content/Images/e-open.png"></a></div></div><div class="row-group pad-top"><div class="col12"><div style="width:100%;"><div class="wmessage clearfix clpendingaction" style="display:none;margin-left:35%;margin-top:-26px;margin-bottom:39px;"><table id="tblDocumentMissing"></table></div><ul class="ul-data" id="ulPinDocumentLoading"></ul><ul class="ul-data" id="ulPinDocument"></ul></div></div><div id="dvPinDocument" class="col12 pad-top"></div></div>');
        $("#hdnnewdocumentfeature").text("Yes");
        $("#litabDocumentView").css("display", "");
        //manoj
        if (documentview == null || documentview == "" || documentview == 'folder') {
            $("#btnaddnewsubfolder").css("display", "");
        }
        $('#txtdocumentkeyword').keypress(function (e) {
            if (e.keyCode == 13) {
                SearchDocumentKeyword();
            }
        });
        //manoj
    } else {
        //Tab width increase
        if (!($(".borderTop_Right_none").hasClass("newdocview"))) {
            $(".borderTop_Right_none").removeClass('newdocview');
        }
        //Tab width increase
        details += '<div class="row-group"><div class="col10 no-pad"><img src="/Content/Images/documents.png"> <a title="Displays Folder(s) and Document(s) associated with the Contract Record." href="javascript:void(0);" class="link-head" onclick="javascript: togglediv( \'ulDocument\', \'dvDocument\', \'imgdoc\');">Documents (<i id="lblDocumentsCount"></i>)</a><a href="javascript:void(0);" class="add-btn close1 Contribute" id="btnAddContractDocument"><img src="/Content/Images/add-icon.png">Add</a><label class="details-label Contribute" id="lblAddContractDocument">or Drag & Drop</label><a href="javascript:void(0);" class="add-btn close1 Contribute" id="btnaddnewsubfolder"><img src="/Content/Images/add-icon.png">Manage Folder</a><a href="javascript:void(0);" id="documentMultiActions" class="add-btn close1 margin-left-5 obligation-act-new openmenuDocumentMultiActions" style="display:none"><img src="../Content/Images/icon/drop.png" style="height:14px !important;"></a></div>'
        + '<div class="col2 text-right no-pad"><a href="javascript:void(0);" class="close1" onclick="javascript: togglediv(\'ulDocument\', \'dvDocument\', \'imgdoc\');"><img id="imgdoc" src="/Content/Images/e-open.png"></a></div></div><div class="warning-msg clearfix clpendingaction" style="display:none;"><img src="/Content/Images/icon/warning-icon.png" alt=""><table id="tblDocumentMissingNormal"></table><a href="javascript:void(0);" class="close1" onclick="GetContractPendingAction(true,\'Missing\')" title="View All"><img src="/Content/Images/view-all-new.png" style="cursor:pointer;">&nbsp;</a></div><h2 id="showAll" class="box-title" style="margin-left: 26px;float: none;line-height: 16px;margin-top: 5px;"></h2>'
        + '<div class="row-group"><div class="col12"><div id="holder" style="width:100%;"><div id="iddropfile" class="dropfiles" style="display:none;">Drop files here.</div><ul class="ul-data" id="ulDocumentLoading"></ul><ul class="ul-data" id="ulDocument"></ul><span id="uploaddocumentprocess" style="font-size:12px; display:none;"><img src="/Content/Images/loading.gif" /> Uploading...</span></div></div><div id="dvDocument" class="col12 pad-top"></div></div>';
        $("#dvtabSummaryDocumentView").html(details);
        $("#hdnnewdocumentfeature").text("No");
        $("#litabDocumentView").css("display", "none");
    }
    details = "";
    //dynamic holder binding value
    holder = document.getElementById('holder');
    holder.ondragover = function (e) {
        if (document.getElementById("btnAddContractDocument").style.display != "none") {
            e.preventDefault();
            document.getElementById("holder").style.border = "2px dashed #428bca ";
            $("#holder").css("min-height", "100px");
            document.getElementById("holder").style.opacity = "0.5";
            e.dataTransfer.setData('text/html', "You dragged the image!");
            document.getElementById("iddropfile").style.display = "block";
        }
    };
    holder.ondragend = function () { this.className = ''; return false; };
    holder.ondragleave = function () {
        document.getElementById("holder").style.border = "2px dashed white";
        $("#holder").css("min-height", "0px");
        $('#holder').css("opacity", "1");
        $('#holder').css("pointer-events", "auto");
        document.getElementById("iddropfile").style.display = "none";
    };
    var totalfiles = "";
    holder.ondrop = function (e) {
        if (contractItem.Permission != 'View' && contractItem.Permission != '' && contractItem.Permission != null) {
            $("#loadingPage").fadeIn();
            this.className = '';
            e.preventDefault();
            var files = e.dataTransfer.files;
            var fileslength = files.length;
            //if (document.getElementById("tbBulkControls").rows.length < 6) {
            //    if (fileslength <= 5) {
            for (var i = 0; i < fileslength; i++) {
                droppedfiles.push(files[i]);
            }
            totalfiles = files;
            removedItems = [];
            //manoj
            ReturnFolderSelection_New();
            //manoj
            readfiles(files);
            if (droppedfiles.length > 0) {
                $(".cldraganddrop").css('display', 'none');
                $('#btnBulkUploadSave').css('display', '');
                $('#btnBulkUploadCancel').css('display', '');
                $("#bulkuploaddoc").dialog("option", "title", "Bulk Document Upload");
                $("#bulkuploaddoc").dialog("open");
                $("#bulkuploaddoc").height("auto");
                applybulkdocumetdraganddrop();
            }
            else {
                document.getElementById("holder").style.border = "2px dashed white";
                $("#holder").css("min-height", "0px");
                $('#holder').css("opacity", "1");
                $('#holder').css("pointer-events", "auto");
                document.getElementById("iddropfile").style.display = "none";
            }
            $("#loadingPage").fadeOut();
            //    }
            //    else {
            //        $("#loadingPage").fadeOut();
            //        swal("", "Maximum 5 file(s) only allowed at a time....!");
            //        document.getElementById("holder").style.border = "2px dashed white";
            //        $("#ulDocument").css("min-height", "0px");
            //        $('#holder').css("opacity", "1");
            //        $('#holder').css("pointer-events", "auto");
            //    }
            //}
            //else {
            //    $("#loadingPage").fadeOut();
            //    swal("", "Maximum 5 file(s) only allowed at a time....!");
            //    document.getElementById("holder").style.border = "2px dashed white";
            //    $("#ulDocument").css("min-height", "0px");
            //    $('#holder').css("opacity", "1");
            //    $('#holder').css("pointer-events", "auto");
            //}
        }
    }
    $('#btnAddContractDocument').click(function () {
        Updatedocumenttap = false;
        $("#lblTemplateDescription").text("");
        $('#addNewDocument').css("pointer-events", "auto");
        $("#btnManagesubfolder").css("display", "none");
        AddContractDocument();
        addbuttonclick = true;
    });

    //manoj
    ko.applyBindings(uploaders);
    //manoj

    $('#btnaddnewsubfolder').click(function () {
        Updatedocumenttap = false;
        AddContractDocument("ManageFolder");
        //manoj
        //if (typeof ($('#showAll').text()) != "undefined" && $('#showAll').text().replace(/ \/ /g, '/') != null && $('#showAll').text().replace(/ \/ /g, '/') != "") {
        //    $("#txtnewfoldervalue").attr("placeholder", "Enter New sub-folder name");
        //    $("#dvfoldercreation").dialog("option", "title", "Create Sub-folder");

        //    //manoj
        //    var fldratrical = "";
        //    var arrShowallTesxt = $.map($('#showAll').text().split('/'), $.trim);
        //    arrShowallTesxt = arrShowallTesxt.filter(function (vFolder) { return vFolder !== '' });
        //    //var arrShowallTesxt = $('#showAll').text().split('/').filter(function (vFolder) { return vFolder !== '' });
        //    if (arrShowallTesxt.length == 1) {
        //        fldratrical = '<img src="../Content/Images/icon/folder_open.png" style="margin-right: 5px;"><span>' + arrShowallTesxt.toString() + '</span>';
        //    } else {
        //        for (var fldr = 0; fldr < arrShowallTesxt.length; fldr++) {
        //            if (arrShowallTesxt.length - 1 == fldr) {
        //                fldratrical += '/<img src="../Content/Images/icon/folder_open.png" style="margin-right: 5px;"><span>' + arrShowallTesxt[fldr].toString() + '</a>';
        //            } else {
        //                fldratrical += '/<img src="../Content/Images/icon/folder.png" style="margin-right: 5px;"><span>' + arrShowallTesxt[fldr].toString() + '</a>';
        //            }
        //        }
        //    }
        //    if (fldratrical.charAt(0) == '/') {
        //        fldratrical = fldratrical.substr(1);
        //    }
        //    $("#showAllFolder").html(fldratrical);
        //    //manoj
        //} else {
        //    $(this).attr("placeholder", "Enter folder name");
        //    $("#dvfoldercreation").dialog("option", "title", "Create Folder");
        //    $("#showAllFolder").html('');
        //}

        //var selectedparentdocument = "";
        //var headerid = $("#lblContractTitle").text();
        //headerid = headerid.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').replace(/[\*\|\,\"\:\<\>\[\}\{\}\'\(\)\&\#\%\.\-\!]/g, '').replace(/\//g, '').replace(/\s\s+/g, " ").trim();
        //selectedparentdocument = ($('#hdContAreaDocLibName').val() != null && $('#hdContAreaDocLibName').val() != "") ? $('#hdContAreaDocLibName').val() : '/Contract Documents/';
        //selectedparentdocument = (selectedparentdocument.charAt(0) != '/') ? '/' + selectedparentdocument : selectedparentdocument;
        //selectedparentdocument = ((selectedparentdocument.substr(selectedparentdocument.length - 1)) != "/") ? selectedparentdocument + "/" : selectedparentdocument;
        //selectedparentdocument = (typeof ($('#showAll').text()) != "undefined" && $('#showAll').text().replace(/ \/ /g, '/') != null && $('#showAll').text().replace(/ \/ /g, '/') != "") ? selectedparentdocument + $('#showAll').text().replace(/ \/ /g, '/') + '/' : selectedparentdocument + headerid + '/';
        //$("#hdnnewfolderurl").val(selectedparentdocument);
        //$("#hdnnewfoldercreatedfrom").val("detailspage");
        //$("#txtnewfoldervalue").removeClass('error');
        //$("#errormsg_txtnewfoldervalue").remove();
        ////$("#dvfoldercreation").dialog("option", "title", "Create Folder");
        //$("#dvfoldercreation").dialog("open");
    });
    //dynamic holder binding value
    //manoj




    $("#bulkuploaddoc").dialog({
        autoOpen: false,
        closeText: "",
        width: "70%",
        title: "Users",
        dialogClass: "popup_width100",
        modal: true,
        close: function () {
            $("#tbBulkControls").empty();
            dropexitfilename = [];
            $("#file").empty();
            droppedfiles.splice(0, droppedfiles.length)
            droppedControls = 0;
            $(this).dialog("close");
            document.getElementById("holder").style.border = "2px dashed white";
            $("#holder").css("min-height", "0px");
            $('#holder').css("opacity", "1");
            $('#holder').css("pointer-events", "auto");
            document.getElementById("iddropfile").style.display = "none";
        }
    });

});


function showfolderdocuments(parentfolderid) {
    //manoj
    multipleChecksDocumentID = "";
    multipleChecksDocumentName = "";
    multipleChecksDocumentReview = "";
    selectedamnddoc = false;
    selectedamnddocname = [];
    $("#documentMultiActions").css('display', 'none');
    //manoj
    var Istagexist = false;
    $("#showAll").find("a").each(function (e) {
        var tid = this.id;
        if (tid == parentfolderid.id) {
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
                if (splitsection[spl].indexOf(parentfolderid.id) > -1) {
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


    if ($("#showAll").text().indexOf("/") >= 0) {
        var texttille = parentfolderid.id
        Istagexist = false;
        $("#showAll").find("a").each(function (e) {
            var tid = this.id;
            if (tid == parentfolderid.id) {
                Istagexist = true;
            }
        });
        if (Istagexist) {
            $("#showAll").empty();
            var splitsection = Folderselection.split('~8Y92YagH');
            for (spl = 0; spl < splitsection.length; spl++) {
                if (splitsection[spl] != "") {
                    if (splitsection[spl].indexOf(texttille) > -1) {
                        if (spl == 0) {
                            $("#showAll").append(splitsection[spl]);
                            //spl = splitsection.length;
                            Folderselection = splitsection[spl];
                        }
                        else {
                            $("#showAll").append('/' + splitsection[spl]);
                            Folderselection += "~8Y92YagH" + splitsection[spl];
                            //spl = splitsection.length;
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
                if (id == parentfolderid.id) {
                    Isexist = true;
                }
            });
            if (!Isexist) {
                $("#showAll").append(' / <img src="../Content/Images/icon/folder_open.png" style="margin-right: 5px;"><a href="javascript:void(0)" id=' + parentfolderid.id + ' onclick="javascript:showfolderdocuments(this);">' + parentfolderid.text + '</a>');
                Folderselection += ' ~8Y92YagH <img src="../Content/Images/icon/folder_open.png" style="margin-right: 5px;"><a href="javascript:void(0)" id=' + parentfolderid.id + ' onclick="javascript:showfolderdocuments(this);">' + parentfolderid.text + '</a>';
            }
            $("#showAll").css('display', '');
        }
    } else {
        $("#showAll").empty();
        if (parentdocid == parentfolderid.id) {
            $("#showAll").append('<img src="../Content/Images/icon/folder_open.png" style="margin-right: 5px;"><a href="javascript:void(0)" id=' + parentdocid + ' onclick="javascript:showfolderdocuments(this);">' + parentdocname + '</a>');
            Folderselection = '<img src="../Content/Images/icon/folder_open.png" style="margin-right: 5px;"><a href="javascript:void(0)" id=' + parentdocid + ' onclick="javascript:showfolderdocuments(this);">' + parentdocname + '</a>';
        } else {
            $("#showAll").append('<img src="../Content/Images/icon/folder.png" style="margin-right: 5px;"><a href="javascript:void(0)" id=' + parentdocid + ' onclick="javascript:showfolderdocuments(this);">' + parentdocname + '</a> / <img src="../Content/Images/icon/folder_open.png" style="margin-right: 5px;"><a href="javascript:void(0)" id=' + parentfolderid.id + ' onclick="javascript:showfolderdocuments(this);">' + parentfolderid.text + '</a>');
            Folderselection = '<img src="../Content/Images/icon/folder.png" style="margin-right: 5px;"><a href="javascript:void(0)" id=' + parentdocid + ' onclick="javascript:showfolderdocuments(this);">' + parentdocname + '</a> ~8Y92YagH <img src="../Content/Images/icon/folder_open.png" style="margin-right: 5px;"><a href="javascript:void(0)" id=' + parentfolderid.id + ' onclick="javascript:showfolderdocuments(this);">' + parentfolderid.text + '</a>';
        }

        $("#showAll").css('display', '');
    }
    $("#ulDocument").empty();
    $("#ulDocument").html('<img src="../Content/Images/icon/loading.gif"> Please wait...');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/documentsinfolder?parentfolderid=' + parentfolderid.id + '&contractid=' + vContractID,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        async: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            if (typeof data == 'undefined' || data.length == 0) {//NoContent HttpStatusCode Update
                $("#ulDocument").empty();
                $("#ulDocument").append('No items found.');
                $("#documentsort").css('display', 'none');
                $('.ShowMoreDocuments').css("display", "none");
                $('#ShowMoreDocuments').css("display", "none");
                $('#ShowLessDocuments').css("display", "none");
                GetContractPendingAction(false);//Performance Optimization
            } else {
                $('#ulDocument').empty();
                CreateDocumentListNew(data);
                GetContractActivities(vContractID);//Performance Optimization
            }
        },
        error:
            function (data) {
                var Isexist = false;
                var id;
                $("#showAll").find("a").each(function (e) {
                    id = this.id;
                    if (id == parentfolderid.id) {
                        Isexist = true;
                    }
                });

                if (!Isexist) {
                    $("#showAll").append(' / <img src="../Content/Images/icon/folder_open.png" style="margin-right: 5px;"><a href="javascript:void(0)" id=' + parentfolderid.id + ' onclick="javascript:showfolderdocuments(this);">' + parentfolderid.text + '</a>');
                    Folderselection += ' ~8Y92YagH <img src="../Content/Images/icon/folder_open.png" style="margin-right: 5px;"><a href="javascript:void(0)" id=' + parentfolderid.id + ' onclick="javascript:showfolderdocuments(this);">' + parentfolderid.text + '</a>';

                }
                $("#showAll").css('display', '');
                $("#documentsort").css('display', 'none');
                //$("#ulFolderDocumentView").css('display', 'none');
                //$("#dvdocumentkeyword").css('display', 'none');
                $('#ulDocument').empty();
                $("#lblDocumentsCount").text('0');
                $("#ulDocument").append('No items found.');
                $('.ShowMoreDocuments').css("display", "none");
                $('#ShowMoreDocuments').css("display", "none");
                $('#ShowLessDocuments').css("display", "none");
            },
        complete: function () {
            BindSystemMilestoneTest(articleSystemMileStone, articleDocumentMileStone, articleMileStone, articleObligationMileStone);
        }
    });
}

function BindDocument(contractid) {
    multipleChecksDocumentID = '';
    multipleChecksDocumentName = '';
    articleDocumentMileStone = '';
    $("#documentMultiActions").css('display', 'none');
    if (contractid == null || contractid == "") { contractid = vContractID; }

    $("#ulDocument").empty();
    $("#alertsListUpcomingDocument").empty();
    $("#ddlDocumentList").empty();
    $("#dvDocument").empty();
    DocumentCount = 0;
    $("#ulDocument").html('<img src="../Content/Images/icon/loading.gif"> Please wait...');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/parentfolder?contractid=' + contractid,
        type: 'GET',
        cache: false,
        contentType: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            //manoj
            $("#hdnContractDocumentsUrl").text(data.FolderUrl);
            $("#hdnContractDocumentsUrlFixed").text(data.FolderUrl);
            //manoj
            parentdocid = data.RowKey;
            parentdocname = data.DocumentName;
            $("#showAll").empty();
            $("#showAll").append('<a href="javascript:void(0)" id=' + parentdocid + ' onclick="javascript:showfolderdocuments(this);">' + parentdocname + '</a>');
            Folderselection = '<a href="javascript:void(0)" id=' + parentdocid + ' onclick="javascript:showfolderdocuments(this);">' + parentdocname + '</a>';
            $("#showAll").css('display', '');
            var parentdoc = { id: parentdocid, text: parentdocname };
            showfolderdocuments(parentdoc)
        },
        error: function (request) {
            $("#documentsort").css('display', 'none');
            //$("#ulFolderDocumentView").css('display', 'none');
            //$("#dvdocumentkeyword").css('display', 'none');
            $("#lblDocumentsCount").text('0');
            $("#ulDocumentLoading").css('display', 'none');
            $("#ulDocument").html('No items found.');
            $('.ShowMoreDocuments').css("display", "none");
            $('#ShowMoreDocuments').css("display", "none");
            $('#ShowLessDocuments').css("display", "none");
        }
    });
}

function CreateDocumentListNew(data) {
    var NotActiveStatusDocument = $.grep(data, function (n, i) {
        return (n.IsActive == "No");
    });
    var DefaultDocLength = ($("#hdnnewdocumentfeature").text() == "Yes") ? 20 : 10;
    articleDocumentMileStone = "";
    var vFinalSignature = "dropdownMenuFinal";
    var vMarkFinalSignature = "dropdownMenuMarkFinal";
    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
    var vAccFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "1" && n.Status == "ON");
    });
    if (vAccFeat.length > 0) {
        vFinalSignature = "dropdownMenuFinalSignature";
        vMarkFinalSignature = "dropdownMenuMarkFinalSignature";
        if (contractItem.Permission == 'Manage' || contractItem.Permission == 'Contribute') {
            $("#dropdownMenuAmendment .signature").show();
            $("#dropdownMenuAmendmentFinal .signature").show();
        }
        else {
            $("#dropdownMenuAmendment .signature").hide();
            $("#dropdownMenuAmendmentFinal .signature").hide();
        }

    }
    else {
        $("#dropdownMenuAmendment .signature").hide();
        $("#dropdownMenuAmendmentFinal .signature").hide();
    }
    var vGetTime = moment(new Date()).utc();

    //var vGetTime = new Date();
    //$.ajax({
    //    url: '/Documents/GetTime',
    //    type: 'GET',
    //    dataType: 'json',
    //    cache: false,
    //    success: function (data) {
    //        var jsObject = JSON.parse(data);
    //        vGetTime = new Date(jsObject);
    //    }
    //});

    var count = 0;
    var documentCount = 0;
    var vPermission = $("#hdnPermission").val();

    var settings = {
        pattern: /\.[0-9a-z]+$/i,
        knownFileTypes: ['pdf', 'png', 'jpg', 'gif', 'bmp', 'doc', 'xls', 'ppt', 'docx', 'xlsx', 'txt', 'pptx', 'zip', 'rar', 'gzip', 'arj', 'wav', 'mp3', 'aif', 'aiff', 'm4a', 'ogg', 'wma', 'psd', 'ai', 'swf', 'fla', 'css', 'js', 'avi', 'mov', 'wmv', 'dotx'],
        WopiFrameFileTypes: ['doc', 'xls', 'ppt', 'docx', 'xlsx', 'pptx', 'dotx']
    };
    var datalenght = data.length;
    //clause
    //$("#ddlTemplateAndClauses").empty();
    //$("#ddlTemplateAndClauses").append('<option value="0">--Select--</option>');
    //$("#docversion").css("display", "none");
    //$("#ulTermsClauseBody").html("<li Style='margin-top: 10px;'>Select available document.<li>");
    $("#ulDocument").empty();
    var vTitle = '';
    var article = '';
    var articleSubFolder = '';
    if (datalenght > 0) {
        for (var vi = 0; vi < datalenght; vi++) {
            if (data[vi].ContractArea != "") {
                docdefaultview(data[vi].ContractArea);
                break;
            }
        }
    }
    var DocDefaultView = "";
    if (thisDocumentLibrarySettings != '' && thisDocumentLibrarySettings != 'undefined' && typeof thisDocumentLibrarySettings != "undefined") {
        DocDefaultView = thisDocumentLibrarySettings.DocDefaultView;
        DocVersion = thisDocumentLibrarySettings.DocVersion;
    }
    //if (datalenght > 0) {
    //    $("#ulFolderDocumentView").css('display', '');
    //    $("#dvdocumentkeyword").css('display', '');
    //    if (datalenght > 1) {
    //        $("#documentsort").css('display', '');
    //    } else {
    //        $("#documentsort").css('display', 'none');
    //    }
    //} else {
    //    $("#documentsort").css('display', 'none');
    //    $("#ulFolderDocumentView").css('display', 'none');
    //    $("#dvdocumentkeyword").css('display', 'none');
    //}

    for (var i = 0; i < datalenght; i++) {
        var item = data[i];
        //manoj
        if (item.IsOCRDoc == "Yes" && item.DocumentName.split('.').pop().toString().toLowerCase().indexOf('tif') > -1) {
            var OldDocumentName = item.DocumentName;
            item.DocumentName = item.DocumentName.split('.').slice(0, -1).join('.') + ".pdf";
            item.DocumentUrl = item.DocumentUrl.split('.').slice(0, -1).join('.') + ".pdf"
        }
        //manoj
        var vv = moment(new Date(item.Modified));
        var vTime = vv.fromNow();
        //vTime = vv.from(vGetTime);

        count++
        if (item.IsFolder == "True") {
            if (vTime == "Invalid date") {
                articleSubFolder += '<li class=" margin-bottom-5"><b title="Folder" style="margin-left: 21px; background-color: #888; " class="status_blue details_documentstatus">Folder</b><img src="../Content/Images/icon/folder.png" style="margin-top: -5px; margin-right: 7px;"><a style="display: inline-block; margin: 3px 0px 0px 0px;" href="javascript:void(0)" id=' + item.RowKey + ' onclick="javascript:showfolderdocuments(this);">' + item.DocumentName + '</a><span class="sub-text"> few seconds ago</span>';
            }
            else {
                articleSubFolder += '<li class=" margin-bottom-5"><b title="Folder" style="margin-left: 21px; background-color: #888; " class="status_blue details_documentstatus">Folder</b><img src="../Content/Images/icon/folder.png" style="margin-top: -5px; margin-right: 7px;"><a style="display: inline-block; margin: 3px 0px 0px 0px;" href="javascript:void(0)" id=' + item.RowKey + ' onclick="javascript:showfolderdocuments(this);">' + item.DocumentName + '</a><span class="sub-text"> ' + vTime + '</span>';
            }
            articleSubFolder += '<label id="DocumentID" style="display:none;">' + item.RowKey + '</label>';
            articleSubFolder += '<label id="FolderCreationMode" style="display:none;">' + item.CreationMode + '</label>';
            articleSubFolder += '<label id="DocumentName" style="display:none;">' + item.DocumentName + '</label>';
            if (contractItem.Status != "Expired" && contractItem.Status != "Cancelled" && contractItem.Status != "Replaced" && contractItem.Status != "Archived" && contractItem.Permission != "View" && contractItem.Permission != '' && contractItem.Permission != null) {
                articleSubFolder += '&nbsp;<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuFolder margin-left-5">';
            }
            articleSubFolder += '</li>';
        } else {
            documentCount++;
            var vClass = "openmenuDocumentFinal";
            var vDocIcon = "";// '<img src="../Content/Images/Doc_draft.png" class="doc_type margin-left-5" alt="Draft Document" title="Draft Document" />';
            var vPrimDocIcon = '';
            if (item.IsFinalized == "Yes") {
                vClass = "openmenuDocument";
                vDocIcon = '<img src="../Content/Images/icon/final_doc.png" class="doc_type margin-left-5" alt="Finalized Document" title="Finalized Document" />';
                if (item.CreationMode == "Amendment") {
                    vClass = "openmenuAmendmentDocumentFinal";
                    vDocIcon += '<img src="../Content/Images/amendments.png" style="height:16px; width:16px;" class="doc_type margin-left-5" alt="Amendment Document" title="Amendment Document" />';
                }
            } else if (item.CreationMode == "Amendment") {
                vClass = "openmenuAmendmentDocument";
                vDocIcon = '<img src="../Content/Images/amendments.png" style="height:16px; width:16px;" class="doc_type margin-left-5" alt="Amendment Document" title="Amendment Document" />';
            }
            //manoj
            if (item.IsPined == "Yes" && item.IsPrimary != "Yes") {
                vClass += "UnPin";
            }
            if (item.IsPrimary == "Yes") {
                vPrimDocIcon = '<img src="../Content/Images/primary_doc.png" class="doc_type margin-left-5" alt="Primary Document" title="Primary Document" />';
                vClass += "UnPin" + " hideItem primarydocument";
            } else {
                vClass += " showitem";
            }
            // Bug (eO37060, eO37244)
            if (item.DocumentStatus == "Expired" || contractItem.IsDraft == "Yes" || contractItem.Status == "Expired"
                || contractItem.Status == "Cancelled" || contractItem.Status == "Replaced" || contractItem.Status == "Archived") {
                vClass = "openmenuExpiredDocument";
            }
            //manoj
            vURLDoc = encodeURI(item.DocumentUrl);
            var ext = vURLDoc.match(settings.pattern);
            var vFileType = '<dd class="file-icon none"></dd>';
            if (ext != null) {
                if (ext.length > 0) { ext = ext[0].slice(1); }
                if (DocDefaultView == "WordClient") {
                    if (vURLDoc.toLowerCase().indexOf(localStorage.SPHostUrl.toLowerCase()) >= 0) {
                        if (jQuery.inArray(ext, settings.WopiFrameFileTypes) > -1) {
                            vRawURLDoc = encodeURIComponent(item.DocumentUrl);
                            vURLDoc = localStorage.SPHostUrl + "/_layouts/WopiFrame.aspx?sourcedoc=" + vRawURLDoc + "&action=default";
                        } else {
                            vRawURLDoc = "";
                        }
                    }
                }
                if (jQuery.inArray(ext.toLowerCase(), settings.knownFileTypes) > -1) {
                    vFileType = '<dd class="file-icon ' + ext + '"></dd>';
                }

                if (ext == 'zip') {
                    vClass = "openmenuZippedDocument";
                }
            }

            if (count <= DefaultDocLength)
                article += '<li class=" margin-bottom-5" active=' + item.IsActive + '>';
            else
                article += '<li class="ShowMoreDocuments margin-bottom-5" style="display:none;">';

            article += '<label id="FolderCreationMode" style="display:none;">' + item.CreationMode + '</label>';
            article += '<label id="DocumentID" style="display:none;">' + item.RowKey + '</label>';
            article += '<label id="SentForSign" style="display:none;">' + item.SentForSign + '</label>';
            article += '<label id="DocumentName" style="display:none;">' + item.DocumentName + '</label>';
            article += '<label id="ShareWorkflow" style="display:none;">' + item.ShareWorkflow + '</label>';
            article += '<label id="ReviewWorkflow" style="display:none;">' + item.ReviewWorkflow + '</label>';
            article += '<label id="BusinessArea" style="display:none;">' + item.BusinessArea + '</label>';
            article += '<label id="IsFinalized" style="display:none;">' + item.IsFinalized + '</label>';
            var primarydocchecking = (item.IsPrimary != null && item.IsPrimary != "") ? item.IsPrimary : "No";
            article += '<label id="IsPrimaryDoc" style="display:none;">' + primarydocchecking + '</label>';

            if (item.CreationMode == "Amendment") {
                article += '<label id="AmendmentID" style="display:none;">' + item.AmendmentID + '</label>';
            }
            if (item.IsActive != 'No') {
                article += '<input type="checkbox" id="' + item.RowKey + '" name="MultipleDocuments" class="Contribute" onclick="checkMultipleDocuments(this);" value=' + item.RowKey + ' /> ';
            } else {
                article += '<input type="checkbox" id="' + item.RowKey + '" name="MultipleDocuments" class="Contribute" style="visibility:hidden;" onclick="checkMultipleDocuments(this);" value=' + item.RowKey + ' /> ';
            }

            switch (item.DocumentStatus) {
                case "New":
                    if (contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Archived" || ((contractItem.ReadOnlyPermissions.indexOf(localStorage.UserName) > -1) && (!localStorage.UserType.indexOf("Global Contract Owner") >= 0)) || !(contractItem.Permission == 'Manage' || contractItem.Permission == 'Contribute'))
                        article += '<b title="New" style="cursor:default" id="' + item.RowKey + '" class="status_green_another details_documentstatus"><img src="../Content/Images/status/new.png" class="margin-right-5" style="cursor:default">new</b>';
                    else
                        article += '<b title="New" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_green_another details_documentstatus"><img src="../Content/Images/status/new.png" class="margin-right-5">new</b>';
                    break;
                case "Ready for Signature":
                    if (contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Archived" || ((contractItem.ReadOnlyPermissions.indexOf(localStorage.UserName) > -1) && (!localStorage.UserType.indexOf("Global Contract Owner") >= 0)) || !(contractItem.Permission == 'Manage' || contractItem.Permission == 'Contribute'))
                        article += '<b title="Ready for Signature" style="cursor:default" id="' + item.RowKey + '" class="status_green details_documentstatus"><img src="../Content/Images/status/active.png" class="margin-right-5" style="cursor:default">sign</b>';
                    else
                        article += '<b title="Ready for Signature" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_green details_documentstatus"><img src="../Content/Images/status/active.png" class="margin-right-5">sign</b>';
                    break;
                case "Awaiting Signatures":
                    if (contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Archived" || ((contractItem.ReadOnlyPermissions.indexOf(localStorage.UserName) > -1) && (!localStorage.UserType.indexOf("Global Contract Owner") >= 0)) || !(contractItem.Permission == 'Manage' || contractItem.Permission == 'Contribute'))
                        article += '<b title="Awaiting Signatures" style="cursor:default" id="' + item.RowKey + '" class="status_yellow details_documentstatus"><img src="../Content/Images/status/renew.png" class="margin-right-5" style="cursor:default">sign</b>';
                    else
                        article += '<b title="Awaiting Signatures" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_yellow details_documentstatus"><img src="../Content/Images/status/renew.png" class="margin-right-5">sign</b>';
                    break;
                case "Active":
                    if (contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Archived" || ((contractItem.ReadOnlyPermissions.indexOf(localStorage.UserName) > -1) && (!localStorage.UserType.indexOf("Global Contract Owner") >= 0)) || !(contractItem.Permission == 'Manage' || contractItem.Permission == 'Contribute'))
                        article += '<b title="Active" style="cursor:default" id="' + item.RowKey + '" class="status_green details_documentstatus"><img src="../Content/Images/status/active.png" class="margin-right-5" style="cursor:default">actv</b>';
                    else
                        article += '<b title="Active" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_green details_documentstatus"><img src="../Content/Images/status/active.png" class="margin-right-5">actv</b>';
                    break;
                case "Signed":
                    if (contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Archived" || ((contractItem.ReadOnlyPermissions.indexOf(localStorage.UserName) > -1) && (!localStorage.UserType.indexOf("Global Contract Owner") >= 0)) || !(contractItem.Permission == 'Manage' || contractItem.Permission == 'Contribute'))
                        article += '<b title="Signed" style="cursor:default" id="' + item.RowKey + '" class="status_blue details_documentstatus"><img src="../Content/Images/status/tick.png" class="margin-right-5" style="cursor:default">Sign</b>';
                    else
                        article += '<b title="Signed" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_blue details_documentstatus"><img src="../Content/Images/status/tick.png" class="margin-right-5">Sign</b>';
                    break;
                case "Expired":
                    if (contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Archived" || ((contractItem.ReadOnlyPermissions.indexOf(localStorage.UserName) > -1) && (!localStorage.UserType.indexOf("Global Contract Owner") >= 0)) || !(contractItem.Permission == 'Manage' || contractItem.Permission == 'Contribute'))
                        article += '<b title="Expired" style="cursor:default" id="' + item.RowKey + '" class="status_Gray details_documentstatus"><img src="../Content/Images/status/expried.png" class="margin-right-5" style="cursor:default">exp</b>';
                    else
                        article += '<b title="Expired" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_Gray details_documentstatus"><img src="../Content/Images/status/expried.png" class="margin-right-5">exp</b>';
                    break;
                case "Awaiting Review":
                    if (contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Archived" || ((contractItem.ReadOnlyPermissions.indexOf(localStorage.UserName) > -1) && (!localStorage.UserType.indexOf("Global Contract Owner") >= 0)) || !(contractItem.Permission == 'Manage' || contractItem.Permission == 'Contribute'))
                        article += '<b title="Awaiting Review" style="cursor:default" id="' + item.RowKey + '" class="status_yellow details_documentstatus"><img src="../Content/Images/status/renew.png" class="margin-right-5" style="cursor:default">Rev</b>';
                    else
                        article += '<b title="Awaiting Review" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_yellow details_documentstatus"><img src="../Content/Images/status/renew.png" class="margin-right-5">Rev</b>';
                    break;
                case "Reviewed":
                    if (contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Archived" || ((contractItem.ReadOnlyPermissions.indexOf(localStorage.UserName) > -1) && (!localStorage.UserType.indexOf("Global Contract Owner") >= 0)) || !(contractItem.Permission == 'Manage' || contractItem.Permission == 'Contribute'))
                        article += '<b title="Reviewed" style="cursor:default" id="' + item.RowKey + '" class="status_blue details_documentstatus"><img src="../Content/Images/status/tick.png" class="margin-right-5" style="cursor:default">Rev</b>';
                    else
                        article += '<b title="Reviewed" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_blue details_documentstatus"><img src="../Content/Images/status/tick.png" class="margin-right-5">Rev</b>';
                    break;
                case "In Negotiation":
                    if (contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Archived" || ((contractItem.ReadOnlyPermissions.indexOf(localStorage.UserName) > -1) && (!localStorage.UserType.indexOf("Global Contract Owner") >= 0)) || !(contractItem.Permission == 'Manage' || contractItem.Permission == 'Contribute'))
                        article += '<b title="In Negotiation" style="cursor:default" id="' + item.RowKey + '" class="status_yellow details_documentstatus"><img src="../Content/Images/status/renew.png" class="margin-right-5" style="cursor:default">nego</b>';
                    else
                        article += '<b title="In Negotiation" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_yellow details_documentstatus"><img src="../Content/Images/status/renew.png" class="margin-right-5">nego</b>';
                    break;
                case "Negotiation Complete":
                    if (contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Archived" || ((contractItem.ReadOnlyPermissions.indexOf(localStorage.UserName) > -1) && (!localStorage.UserType.indexOf("Global Contract Owner") >= 0)) || !(contractItem.Permission == 'Manage' || contractItem.Permission == 'Contribute'))
                        article += '<b title="Negotiation Complete" style="cursor:default" id="' + item.RowKey + '" class="status_blue details_documentstatus"><img src="../Content/Images/status/tick.png" class="margin-right-5" style="cursor:default">nego</b>';
                    else
                        article += '<b title="Negotiation Complete" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_blue details_documentstatus"><img src="../Content/Images/status/tick.png" class="margin-right-5">nego</b>';
                    break;
            }
            vTitle = item.DocumentName;
            if (vTitle.length > 61)
            { vTitle = vTitle.substring(0, 60) + '...'; }
            if (item.IsActive == "No") {
                if (item.CreationMode == "Template") {
                    article += vFileType + '<a data-value="' + encodeURI(item.DocumentUrl) + '" href="javascript:void(0);" title="' + item.DocumentName + '" onclick="ViewDocument(\'' + encodeURI(item.DocumentUrl) + '\')" style="pointer-events: none;" >' + item.DocumentName + '</a><img src="../Content/Images/new_item.png" alt="New" title="New">';
                } else {
                    article += vFileType + '<a data-value="' + encodeURI(item.DocumentUrl) + '" href="javascript:void(0);" title="' + item.DocumentName + '" onclick="ViewDocument(\'' + encodeURI(item.DocumentUrl) + '\')" >' + item.DocumentName + '</a><img src="../Content/Images/new_item.png" alt="New" title="New">';
                }
            } else {
                if (vRawURLDoc != "") {
                    if (DocDefaultView == "WordClient") {
                        article += vFileType + '<a href="#" seqe = "' + vRawURLDoc + '" onclick="viewdocinword(\'' + vRawURLDoc + '\')" title="' + item.DocumentName + '">' + vTitle + '</a>';
                    } else {
                        article += vFileType + '<a href="javascript:void(0);" data-value="' + encodeURIComponent(item.DocumentUrl) + '"   onclick="Opendocinbrowser(this)"  title="' + item.DocumentName + '">' + vTitle + '</a>';
                    }
                } else {
                    article += vFileType + '<a href="javascript:void(0);" data-value="' + encodeURIComponent(item.DocumentUrl) + '"  onclick="Opendocinbrowser(this)"  title="' + item.DocumentName + '">' + vTitle + '</a>';
                }
            }

            if (vTime == "Invalid date") {
                article += '<span class="sub-text"> few seconds ago</span>';
            }
            else {
                article += '<span class="sub-text"> ' + vTime + '</span>';
            }
            article += '';
            article += '';
            if (item.IsActive != "No") {
                article += vPrimDocIcon + vDocIcon + '&nbsp;<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="' + vClass + ' margin-left-5" onclick="FilterMenuOptions(this)" />';
            } else {
                article += vPrimDocIcon + vDocIcon + '&nbsp';
            }
            if (item.IsMetadataMismatch == "Yes" && item.ActualDocID == '' && ext.toLowerCase() != 'pdf') {
                article += '<a href="javascript:void(0);" data="' + item.ContractAndDocumentMetadata + '" onclick="javascript: openmismatched(this)"><img src="../Content/Images/icon/mismatch_icon.png"  style="cursor:pointer;" title="Mismatched Document and Contract Record Metadata." class="margin-left-5" /></a>';
            }
            if (documentview != 'folder' && documentview != "" && documentview != null) {
                var the_arr = item.DocumentUrl.replace(localStorage.SPHostUrl + "/", "").split('/');
                the_arr.pop();
                var changedUrl = the_arr.join('/');
                article += '<div class="documenturlclass" style="margin-left:0px"><label title="' + changedUrl + '"><img src="../Content/Images/icon/folder_open.png" style="margin-right: 5px;">' + changedUrl + '</label></div>'
            }
            article += '</li>';
            DocumentCount++;

            articleDocMiletstone = BindDocumentMilestones(item);
            var doclist = '<option value="' + item.RowKey + '">' + item.DocumentName + '</option>';
            $("#ddlDocumentList").append(doclist);
            articleDocumentMileStone += articleDocMiletstone;
            //BindDocumentAlert(item);
            //Clause
            //$("#ddlTemplateAndClauses").append('<option value="' + item.RowKey + '">' + item.DocumentName + '</option>');
        }
    }
    if (documentview != 'folder' && documentview != "" && documentview != null) {
        $("#ulDocument").html(article);
    }
    else {
        $("#ulDocument").html(articleSubFolder + article);
    }

    //manoj
    //For display inprogress status
    if (contractItem.IsActive == "" || contractItem.IsActive == "Yes") {
        if (NotActiveStatusDocument.length > 0) {
            $("#general-notification").css("visibility", "visible");
            $("#general-notification").html("Document uploaded successfully. All the options to perform action on document will be enabled once it is ready for use.");
            clearTimeout(cleartimevalue);
            cleartimevalue = setTimeout(refreshdocuemnt, 10000);

        } else {
            $("#general-notification").css("visibility", "hidden");
        }
    }
    //For display inprogress status
    //manoj

    //manoj
    if (documentview != 'folder' && documentview != "" && documentview != null) {
        $("#ulDocument").addClass('ulmarginclass');
    } else {
        $("#ulDocument").removeClass('ulmarginclass');
    }
    //manoj
    if ($("#ulDocument")[0].childNodes.length > 1) {
        $("#documentsort").css('display', '');
    } else {
        $("#documentsort").css('display', 'none');
    }
    if (count > DefaultDocLength && documentCount > DefaultDocLength) {
        //var more = count - 5;
        //$("#dvDocument").html('<a id="ShowMoreDocuments" href="javascript:void(0);" class="pad-all close1" onclick="ShowMoreDocuments()">' + more + ' More Document(s) </a>' +
        //                        '<a id="ShowLessDocuments" href="javascript:void(0);" class="pad-all close1" onclick="ShowLessDocuments()" style="display:none;">Show less</a>');        
        $("#dvDocument").html('<a id="ShowMoreDocuments" href="javascript:void(0);" class="pad-all close1" onclick="ShowMoreDocuments()">More Document(s) </a>' +
                                '<a id="ShowLessDocuments" href="javascript:void(0);" class="pad-all close1" onclick="ShowLessDocuments()" style="display:none;">Show less</a>');
    } else {
        $('.ShowMoreDocuments').css("display", "none");
        $('#ShowMoreDocuments').css("display", "none");
        $('#ShowLessDocuments').css("display", "none");
    }

    $("#lblDocumentsCount").text(count);

    //if ($("#showAll").text().indexOf("/") >= 0) {
    //    $('.ShowMoreDocuments').css("display", "none");
    //    $('#ShowMoreDocuments').css("display", "none");
    //    $('#ShowLessDocuments').css("display", "none");
    //}
    if (!$("#lblDocumentsCount").text().trim()) {
        $("#ulDocument").empty();
        $("#ulDocument").append('No items found.');
    }
    if (DocVersion == "No") {
        $('li.history').hide();
    }
    $(".openmenuDocument").contextMenu({ menu: vFinalSignature, leftButton: true }, function (action, el, pos) { contextMenuDocument(action, el.parent("li"), pos); });
    $(".openmenuDocumentFinal").contextMenu({ menu: vMarkFinalSignature, leftButton: true }, function (action, el, pos) { contextMenuDocument(action, el.parent("li"), pos); });
    $(".openmenuExpiredDocument").contextMenu({ menu: "dropdownExpiredDocument", leftButton: true }, function (action, el, pos) { contextMenuDocument(action, el.parent("li"), pos); }); // Bug (eO37060)
    $(".openmenuAmendmentDocument").contextMenu({ menu: "dropdownMenuAmendment", leftButton: true }, function (action, el, pos) { contextMenuAmendmentDocument(action, el.parent("li"), pos); });
    $(".openmenuAmendmentDocumentFinal").contextMenu({ menu: "dropdownMenuAmendmentFinal", leftButton: true }, function (action, el, pos) {
        contextMenuAmendmentDocument(action, el.parent("li"), pos);
    });
    //manoj
    //Un Pin Document Document
    $(".openmenuDocumentUnPin").contextMenu({ menu: vFinalSignature + "UnPin", leftButton: true }, function (action, el, pos) { contextMenuDocument(action, el.parent("li"), pos); });
    $(".openmenuDocumentFinalUnPin").contextMenu({ menu: vMarkFinalSignature + "UnPin", leftButton: true }, function (action, el, pos) { contextMenuDocument(action, el.parent("li"), pos); });
    $(".openmenuAmendmentDocumentUnPin").contextMenu({ menu: "dropdownMenuAmendmentUnPin", leftButton: true }, function (action, el, pos) { contextMenuAmendmentDocument(action, el.parent("li"), pos); });
    $(".openmenuAmendmentDocumentFinalUnPin").contextMenu({ menu: "dropdownMenuAmendmentFinalUnPin", leftButton: true }, function (action, el, pos) {
        contextMenuAmendmentDocument(action, el.parent("li"), pos);
    });

    $(".openmenuZippedDocument").contextMenu({ menu: "dropdownZippedDocument", leftButton: true }, function (action, el, pos) { contextMenuDocument(action, el.parent("li"), pos); });
    //manoj
    $(".openmenuFolder").contextMenu({ menu: 'myMenuFolder', leftButton: true }, function (action, el, pos) { contextMenuWorkFolder(action, el.parent("li"), pos); });
    if ($("#hdnnewdocumentfeature").text() != "Yes") {
        $(".pinhide").css("display", "none");
    } else {
        if ((contractItem.Permission == 'Manage' || contractItem.Permission == 'Contribute') && (!(contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Replaced" || contractItem.Status == "Archived"))) {
            $('.pinhide').css("display", "");
        } else {
            $('.pinhide').css("display", "none");
        }
        //manoj
        $(".hideItem").click(function () {
            if ((contractItem.Permission == 'Manage' || contractItem.Permission == 'Contribute') && (!(contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Replaced" || contractItem.Status == "Archived"))) {
                $(".unpindocument").hide();
                $(".pindocument").hide();
                $(".primary").show();
            }
        })
        $(".showitem").click(function () {
            if ((contractItem.Permission == 'Manage' || contractItem.Permission == 'Contribute') && (!(contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Replaced" || contractItem.Status == "Archived"))) {
                $(".unpindocument").show();
                $(".pindocument").show();
                $(".primary").show();
            }
        })
        $(".primarydocument").click(function () {
            //if (contractItem.Permission == 'Manage' || contractItem.Permission == 'Contribute' && (!(contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Replaced" || contractItem.Status == "Archived"))) {
            $(".primary").hide();
            //}
        })
        //manoj
    }
    //manoj
    if ((contractItem.Permission == 'Manage' || contractItem.Permission == 'Contribute') && (!(contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Replaced" || contractItem.Status == "Archived"))) {
        if (contractItem.IsDraft != 'Yes')
            $('.Contribute').css("display", "");

        //manoj
        if (documentview != 'folder' && documentview != "" && documentview != null) {
            $("#btnaddnewsubfolder").css("display", "none")
        }
        //manoj
    } else if (contractItem.Permission == 'Manage' || contractItem.Permission == 'Contribute') {
        $('.StatusPermission').css("display", "");
    } else {
        $('.Contribute').css("display", "none");
    }

    if (((contractItem.ContractDocumentsUrl != null && contractItem.ContractDocumentsUrl != "") || data.length > 0) && (contractItem.IsDraft != 'Yes' || (contractItem.IsDraft == 'Yes' && contractItem.CreatedBy == localStorage.UserName))) {
        if ((documentview == 'folder' || documentview == "" || documentview == null) && ($("#hdnPermission").val() == 'Manage' || $("#hdnPermission").val() == 'Contribute') && (!(contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Replaced" || contractItem.Status == "Archived"))) {
            $("#btnaddnewsubfolder").css('display', '');
        } else {
            $("#btnaddnewsubfolder").css('display', 'none');
        }
    } else {
        $("#btnaddnewsubfolder").css('display', 'none');
    }
    //manoj

    if (vAccFeat.length > 0) {
        if (contractItem.Permission == 'Manage' || contractItem.Permission == 'Contribute') {
            $("#dropdownMenuAmendment .signature").show();
            $("#dropdownMenuAmendmentFinal .signature").show();
        }
        else {
            $("#dropdownMenuAmendment .signature").hide();
            $("#dropdownMenuAmendmentFinal .signature").hide();
        }
    }
    else {
        $("#dropdownMenuAmendment li.signature.Contribute").hide();
        $("#dropdownMenuAmendmentFinal li.signature.Contribute").hide();
    }

    $("#contractLogs").empty();
    TermsAndClauseDocument(vContractID);

    pendingStarted = false;
    $("#tblContractSettingMetadata").empty();
    GetContractPendingAction(false, 'Documents');
    ApplyPermissionToMenu($("#hdnPermission").val());
    if (((contractItem.ContractDocumentsUrl != null && contractItem.ContractDocumentsUrl != "") || data.length > 0) && (contractItem.IsDraft != 'Yes' || (contractItem.IsDraft == 'Yes' && contractItem.CreatedBy == localStorage.UserName))) {
        if ((documentview == 'folder' || documentview == "" || documentview == null) && ($("#hdnPermission").val() == 'Manage' || $("#hdnPermission").val() == 'Contribute') && (!(contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Replaced" || contractItem.Status == "Archived"))) {
            $("#btnaddnewsubfolder").css('display', '');
        } else {
            $("#btnaddnewsubfolder").css('display', 'none');
        }
    } else {
        $("#btnaddnewsubfolder").css('display', 'none');
    }
}


//manoj
//For Chuck File Upload
function CreateDocumentListNewBlob(data) {
    //manoj
    var ulDocumentlist = $("#ulDocument li");
    if (ulDocumentlist.length > 0) {
        var documentexist = $(ulDocumentlist).find("input[id=" + data.RowKey + "]");
        if (documentexist.length > 0) {
            $(ulDocumentlist).find("input[id=" + data.RowKey + "]").parent().remove();
        }
    }
    //manoj

    var DefaultDocLength = ($("#hdnnewdocumentfeature").text() == "Yes") ? 20 : 10;
    articleDocumentMileStone = "";
    var vFinalSignature = "dropdownMenuFinal";
    var vMarkFinalSignature = "dropdownMenuMarkFinal";
    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
    var vAccFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "1" && n.Status == "ON");
    });
    if (vAccFeat.length > 0) {
        vFinalSignature = "dropdownMenuFinalSignature";
        vMarkFinalSignature = "dropdownMenuMarkFinalSignature";
        $("#dropdownMenuAmendment .signature").show();
        $("#dropdownMenuAmendmentFinal .signature").show();
    }
    else {
        $("#dropdownMenuAmendment .signature").hide();
        $("#dropdownMenuAmendmentFinal .signature").hide();
    }
    var vGetTime = moment(new Date()).utc();
    //var vGetTime = new Date();
    //$.ajax({
    //    url: '/Documents/GetTime',
    //    type: 'GET',
    //    dataType: 'json',
    //    cache: false,
    //    success: function (dataValue) {
    //        var jsObject = JSON.parse(dataValue);
    //        vGetTime = new Date(jsObject);
    //    }
    //});

    var count = 0;
    var vPermission = $("#hdnPermission").val();

    var settings = {
        pattern: /\.[0-9a-z]+$/i,
        knownFileTypes: ['pdf', 'png', 'jpg', 'gif', 'bmp', 'doc', 'xls', 'ppt', 'docx', 'xlsx', 'txt', 'pptx', 'zip', 'rar', 'gzip', 'arj', 'wav', 'mp3', 'aif', 'aiff', 'm4a', 'ogg', 'wma', 'psd', 'ai', 'swf', 'fla', 'css', 'js', 'avi', 'mov', 'wmv', 'dotx'],
        WopiFrameFileTypes: ['doc', 'xls', 'ppt', 'docx', 'xlsx', 'pptx', 'dotx']
    };
    var ChildCoumetcount = $("#ulDocument").children().length;
    var vTitle = '';
    var article = '';
    var articleSubFolder = '';

    var item = data;
    var vv = moment(new Date(item.Modified));
    var vTime = vv.fromNow();
    vTime = vv.from(vGetTime);

    count++
    if (item.IsFolder == "True") {
    } else {
        var vClass = "openmenuDocumentFinal";
        var vDocIcon = "";// '<img src="../Content/Images/Doc_draft.png" class="doc_type margin-left-5" alt="Draft Document" title="Draft Document" />';
        var vPrimDocIcon = '';
        if (item.IsFinalized == "Yes") {
            vClass = "openmenuDocument";
            vDocIcon = '<img src="../Content/Images/icon/final_doc.png" class="doc_type margin-left-5" alt="Finalized Document" title="Finalized Document" />';
            if (item.CreationMode == "Amendment") {
                vClass = "openmenuAmendmentDocumentFinal";
                vDocIcon += '<img src="../Content/Images/amendments.png" style="height:16px; width:16px;" class="doc_type margin-left-5" alt="Amendment Document" title="Amendment Document" />';
            }
        } else if (item.CreationMode == "Amendment") {
            vClass = "openmenuAmendmentDocument";
            vDocIcon = '<img src="../Content/Images/amendments.png" style="height:16px; width:16px;" class="doc_type margin-left-5" alt="Amendment Document" title="Amendment Document" />';
        }
        //manoj
        if (item.IsPined == "Yes" && item.IsPrimary != "Yes") {
            vClass += "UnPin";
        }
        if (item.IsPrimary == "Yes") {
            vPrimDocIcon = '<img src="../Content/Images/primary_doc.png" class="doc_type margin-left-5" alt="Primary Document" title="Primary Document" />';
            vClass += "UnPin" + " hideItem primarydocument";
        } else {
            vClass += " showitem";
        }
        //manoj
        vURLDoc = encodeURI(item.DocumentUrl);
        var ext = vURLDoc.match(settings.pattern);
        var vFileType = '<dd class="file-icon none"></dd>';
        if (ext != null) {
            if (ext.length > 0) { ext = ext[0].slice(1); }
            if (jQuery.inArray(ext.toLowerCase(), settings.knownFileTypes) > -1) {
                vFileType = '<dd class="file-icon ' + ext + '"></dd>';
            }
        }

        if (count <= DefaultDocLength)
            article += '<li class=" margin-bottom-5">';
        else
            article += '<li class="ShowMoreDocuments margin-bottom-5" style="display:none;">';

        article += '<label id="FolderCreationMode" style="display:none;">' + item.CreationMode + '</label>';
        article += '<label id="DocumentID" style="display:none;">' + item.RowKey + '</label>';
        article += '<label id="SentForSign" style="display:none;">' + item.SentForSign + '</label>';
        article += '<label id="DocumentName" style="display:none;">' + item.DocumentName + '</label>';
        article += '<label id="ShareWorkflow" style="display:none;">' + item.ShareWorkflow + '</label>';
        article += '<label id="ReviewWorkflow" style="display:none;">' + item.ReviewWorkflow + '</label>';
        article += '<label id="BusinessArea" style="display:none;">' + item.BusinessArea + '</label>';
        article += '<label id="IsFinalized" style="display:none;">' + item.IsFinalized + '</label>';
        var primarydocchecking = (item.IsPrimary != null && item.IsPrimary != "") ? item.IsPrimary : "No";
        article += '<label id="IsPrimaryDoc" style="display:none;">' + primarydocchecking + '</label>';

        if (item.CreationMode == "Amendment") {
            article += '<label id="AmendmentID" style="display:none;">' + item.AmendmentID + '</label>';
        }
        //article += '<input type="checkbox" id="' + item.RowKey + '" name="MultipleDocuments" class="Contribute" onclick="checkMultipleDocuments(this);" value=' + item.RowKey + ' /> ';

        switch (item.DocumentStatus) {
            case "New":
                if (contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Archived" || ((contractItem.ReadOnlyPermissions.indexOf(localStorage.UserName) > -1) && (!localStorage.UserType.indexOf("Global Contract Owner") >= 0)))
                    article += '<b title="New" style="cursor:default" id="' + item.RowKey + '" class="status_green_another details_documentstatus"><img src="../Content/Images/status/new.png" class="margin-right-5" style="cursor:default">new</b>';
                else
                    article += '<b title="New" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_green_another details_documentstatus"><img src="../Content/Images/status/new.png" class="margin-right-5">new</b>';
                break;
            case "Ready for Signature":
                if (contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Archived" || ((contractItem.ReadOnlyPermissions.indexOf(localStorage.UserName) > -1) && (!localStorage.UserType.indexOf("Global Contract Owner") >= 0)))
                    article += '<b title="Ready for Signature" style="cursor:default" id="' + item.RowKey + '" class="status_green details_documentstatus"><img src="../Content/Images/status/active.png" class="margin-right-5" style="cursor:default">sign</b>';
                else
                    article += '<b title="Ready for Signature" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_green details_documentstatus"><img src="../Content/Images/status/active.png" class="margin-right-5">sign</b>';
                break;
            case "Awaiting Signatures":
                if (contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Archived" || ((contractItem.ReadOnlyPermissions.indexOf(localStorage.UserName) > -1) && (!localStorage.UserType.indexOf("Global Contract Owner") >= 0)))
                    article += '<b title="Awaiting Signatures" style="cursor:default" id="' + item.RowKey + '" class="status_yellow details_documentstatus"><img src="../Content/Images/status/renew.png" class="margin-right-5" style="cursor:default">sign</b>';
                else
                    article += '<b title="Awaiting Signatures" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_yellow details_documentstatus"><img src="../Content/Images/status/renew.png" class="margin-right-5">sign</b>';
                break;
            case "Active":
                if (contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Archived" || ((contractItem.ReadOnlyPermissions.indexOf(localStorage.UserName) > -1) && (!localStorage.UserType.indexOf("Global Contract Owner") >= 0)))
                    article += '<b title="Active" style="cursor:default" id="' + item.RowKey + '" class="status_green details_documentstatus"><img src="../Content/Images/status/active.png" class="margin-right-5" style="cursor:default">actv</b>';
                else
                    article += '<b title="Active" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_green details_documentstatus"><img src="../Content/Images/status/active.png" class="margin-right-5">actv</b>';
                break;
            case "Signed":
                if (contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Archived" || ((contractItem.ReadOnlyPermissions.indexOf(localStorage.UserName) > -1) && (!localStorage.UserType.indexOf("Global Contract Owner") >= 0)))
                    article += '<b title="Signed" style="cursor:default" id="' + item.RowKey + '" class="status_blue details_documentstatus"><img src="../Content/Images/status/tick.png" class="margin-right-5" style="cursor:default">Sign</b>';
                else
                    article += '<b title="Signed" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_blue details_documentstatus"><img src="../Content/Images/status/tick.png" class="margin-right-5">Sign</b>';
                break;
            case "Expired":
                if (contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Archived" || ((contractItem.ReadOnlyPermissions.indexOf(localStorage.UserName) > -1) && (!localStorage.UserType.indexOf("Global Contract Owner") >= 0)))
                    article += '<b title="Expired" style="cursor:default" id="' + item.RowKey + '" class="status_Gray details_documentstatus"><img src="../Content/Images/status/expried.png" class="margin-right-5" style="cursor:default">exp</b>';
                else
                    article += '<b title="Expired" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_Gray details_documentstatus"><img src="../Content/Images/status/expried.png" class="margin-right-5">exp</b>';
                break;
            case "Awaiting Review":
                if (contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Archived" || ((contractItem.ReadOnlyPermissions.indexOf(localStorage.UserName) > -1) && (!localStorage.UserType.indexOf("Global Contract Owner") >= 0)))
                    article += '<b title="Awaiting Review" style="cursor:default" id="' + item.RowKey + '" class="status_yellow details_documentstatus"><img src="../Content/Images/status/renew.png" class="margin-right-5" style="cursor:default">Rev</b>';
                else
                    article += '<b title="Awaiting Review" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_yellow details_documentstatus"><img src="../Content/Images/status/renew.png" class="margin-right-5">Rev</b>';
                break;
            case "Reviewed":
                if (contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Archived" || ((contractItem.ReadOnlyPermissions.indexOf(localStorage.UserName) > -1) && (!localStorage.UserType.indexOf("Global Contract Owner") >= 0)))
                    article += '<b title="Reviewed" style="cursor:default" id="' + item.RowKey + '" class="status_blue details_documentstatus"><img src="../Content/Images/status/tick.png" class="margin-right-5" style="cursor:default">Rev</b>';
                else
                    article += '<b title="Reviewed" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_blue details_documentstatus"><img src="../Content/Images/status/tick.png" class="margin-right-5">Rev</b>';
                break;
            case "In Negotiation":
                if (contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Archived" || ((contractItem.ReadOnlyPermissions.indexOf(localStorage.UserName) > -1) && (!localStorage.UserType.indexOf("Global Contract Owner") >= 0)))
                    article += '<b title="In Negotiation" style="cursor:default" id="' + item.RowKey + '" class="status_yellow details_documentstatus"><img src="../Content/Images/status/renew.png" class="margin-right-5" style="cursor:default">nego</b>';
                else
                    article += '<b title="In Negotiation" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_yellow details_documentstatus"><img src="../Content/Images/status/renew.png" class="margin-right-5">nego</b>';
                break;
            case "Negotiation Complete":
                if (contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Archived" || ((contractItem.ReadOnlyPermissions.indexOf(localStorage.UserName) > -1) && (!localStorage.UserType.indexOf("Global Contract Owner") >= 0)))
                    article += '<b title="Negotiation Complete" style="cursor:default" id="' + item.RowKey + '" class="status_blue details_documentstatus"><img src="../Content/Images/status/tick.png" class="margin-right-5" style="cursor:default">nego</b>';
                else
                    article += '<b title="Negotiation Complete" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_blue details_documentstatus"><img src="../Content/Images/status/tick.png" class="margin-right-5">nego</b>';
                break;
        }

        vTitle = item.DocumentName;
        if (vTitle.length > 61)
        { vTitle = vTitle.substring(0, 60) + '...'; }
        //if (vRawURLDoc != "") {
        article += vFileType + '<a data-value="' + encodeURI(item.DocumentUrl) + '" href="javascript:void(0);" title="' + item.DocumentName + '"  onclick="ViewDocument(\'' + encodeURI(item.DocumentUrl) + '\')" >' + item.DocumentName + '</a><img src="../Content/Images/new_item.png" alt="New" title="New">';
        //} else {
        //    article += vFileType + '<a data-value="' + encodeURI(item.DocumentUrl); + '" href="javascript:void(0);" title="' + item.DocumentName + '">' + vTitle + '</a>';
        //}
        if (vTime == "Invalid date") {
            article += '<span class="sub-text"> few seconds ago</span>';
        }
        else {
            article += '<span class="sub-text"> ' + vTime + '</span>';
        }

        article += '';
        article += '';
        article += vPrimDocIcon + vDocIcon + '&nbsp;';
        if (item.IsMetadataMismatch == "Yes" && item.ActualDocID == '' && ext.toLowerCase() != 'pdf') {
            article += '<a href="javascript:void(0);" data="' + item.ContractAndDocumentMetadata + '" onclick="javascript: openmismatched(this)"><img src="../Content/Images/icon/mismatch_icon.png"  style="cursor:pointer;" title="Mismatched Document and Contract Record Metadata." class="margin-left-5" /></a>';
        }
        if (documentview != 'folder' && documentview != "" && documentview != null) {
            var the_arr = item.DocumentUrl.replace(localStorage.SPHostUrl + "/", "").split('/');
            the_arr.pop();
            var changedUrl = the_arr.join('/');
            article += '<div class="documenturlclass" style="margin-left:0px"><label title="' + changedUrl + '"><img src="../Content/Images/icon/folder_open.png" style="margin-right: 5px;">' + changedUrl + '</label></div>'
        }
        article += '</li>';
        DocumentCount++;

        articleDocMiletstone = BindDocumentMilestones(item);
        articleDocumentMileStone += articleDocMiletstone;
    }
    //}
    if ($("#ulDocument").html() == "No items found.") {
        $("#ulDocument").empty();
    }
    $("#ulDocument").prepend(article);
    //manoj
    //if (documentview != 'folder' && documentview != "" && documentview != null) {
    //    $("#ulDocument").addClass('ulmarginclass');
    //} else {
    //    $("#ulDocument").removeClass('ulmarginclass');
    //}
    ////manoj
    //if ($("#ulDocument")[0].childNodes.length > 1) {
    //    $("#documentsort").css('display', '');
    //} else {
    //    $("#documentsort").css('display', 'none');
    //}

    //if (!$("#lblDocumentsCount").text().trim()) {
    //    $("#ulDocument").empty();
    //    $("#ulDocument").append('No items found.');
    //}
    //if (DocVersion == "No") {
    //    $('li.history').hide();
    //}
    //$(".openmenuDocument").contextMenu({ menu: vFinalSignature, leftButton: true }, function (action, el, pos) { contextMenuDocument(action, el.parent("li"), pos); });
    //$(".openmenuDocumentFinal").contextMenu({ menu: vMarkFinalSignature, leftButton: true }, function (action, el, pos) { contextMenuDocument(action, el.parent("li"), pos); });
    //$(".openmenuAmendmentDocument").contextMenu({ menu: "dropdownMenuAmendment", leftButton: true }, function (action, el, pos) { contextMenuAmendmentDocument(action, el.parent("li"), pos); });
    //$(".openmenuAmendmentDocumentFinal").contextMenu({ menu: "dropdownMenuAmendmentFinal", leftButton: true }, function (action, el, pos) {
    //    contextMenuAmendmentDocument(action, el.parent("li"), pos);
    //});
    ////manoj
    ////Un Pin Document Document
    //$(".openmenuDocumentUnPin").contextMenu({ menu: vFinalSignature + "UnPin", leftButton: true }, function (action, el, pos) { contextMenuDocument(action, el.parent("li"), pos); });
    //$(".openmenuDocumentFinalUnPin").contextMenu({ menu: vMarkFinalSignature + "UnPin", leftButton: true }, function (action, el, pos) { contextMenuDocument(action, el.parent("li"), pos); });
    //$(".openmenuAmendmentDocumentUnPin").contextMenu({ menu: "dropdownMenuAmendmentUnPin", leftButton: true }, function (action, el, pos) { contextMenuAmendmentDocument(action, el.parent("li"), pos); });
    //$(".openmenuAmendmentDocumentFinalUnPin").contextMenu({ menu: "dropdownMenuAmendmentFinalUnPin", leftButton: true }, function (action, el, pos) {
    //    contextMenuAmendmentDocument(action, el.parent("li"), pos);
    //});
    ////manoj
    //$(".openmenuFolder").contextMenu({ menu: 'myMenuFolder', leftButton: true }, function (action, el, pos) { contextMenuWorkFolder(action, el.parent("li"), pos); });
    //if ($("#hdnnewdocumentfeature").text() != "Yes") {
    //    $(".pinhide").css("display", "none");
    //} else {
    //    if ((contractItem.Permission == 'Manage' || contractItem.Permission == 'Contribute') && (!(contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Replaced" || contractItem.Status == "Archived"))) {
    //        $('.pinhide').css("display", "");
    //    } else {
    //        $('.pinhide').css("display", "none");
    //    }
    //    //manoj
    //    $(".hideItem").click(function () {
    //        if ((contractItem.Permission == 'Manage' || contractItem.Permission == 'Contribute') && (!(contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Replaced" || contractItem.Status == "Archived"))) {
    //            $(".unpindocument").hide();
    //            $(".pindocument").hide();
    //            $(".primary").show();
    //        }
    //    })
    //    $(".showitem").click(function () {
    //        if ((contractItem.Permission == 'Manage' || contractItem.Permission == 'Contribute') && (!(contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Replaced" || contractItem.Status == "Archived"))) {
    //            $(".unpindocument").show();
    //            $(".pindocument").show();
    //            $(".primary").show();
    //        }
    //    })
    //    $(".primarydocument").click(function () {
    //        //if (contractItem.Permission == 'Manage' || contractItem.Permission == 'Contribute' && (!(contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Replaced" || contractItem.Status == "Archived"))) {
    //        $(".primary").hide();
    //        //}
    //    })
    //    //manoj
    //}
    //manoj
    if ((contractItem.Permission == 'Manage' || contractItem.Permission == 'Contribute') && (!(contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Replaced" || contractItem.Status == "Archived"))) {
        if (contractItem.IsDraft != 'Yes')
            $('.Contribute').css("display", "");
    } else if (contractItem.Permission == 'Manage' || contractItem.Permission == 'Contribute') {
        $('.StatusPermission').css("display", "");
    } else {
        $('.Contribute').css("display", "none");
    }
    //manoj
}
//For Chuck File Upload
//manoj

//manoj
function CreateDocumentListPinView(contractid) {
    articleDocumentMileStone = "";
    $('.ShowMorePinDocuments').css("display", "none");
    $('#ShowMorePinDocuments').css("display", "none");
    $('#ShowLessPinDocuments').css("display", "none");
    $("#hdnPinDocumentCount").text("No");
    $("#ulPinDocument").html('<img src="../Content/Images/icon/loading.gif"> Please wait...');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?contractid=' + contractid,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (Documentcollections) {
            //manoj 
            //Filter document(s) by primary and pined
            var data = null;
            if (typeof Documentcollections != 'undefined') {//NoContent HttpStatusCode Update
                data = $.grep(Documentcollections, function (n, i) {
                    return (n.IsPined == "Yes" || n.IsPrimary == "Yes");
                });
            }
            if (data != null && data.length > 0) {
                if (data.length >= 5) {
                    $("#hdnPinDocumentCount").text("Yes");
                } else {
                    $("#hdnPinDocumentCount").text("No");
                }
                if (data.length > 1) {
                    $("#pindocumentsort").css('display', '');
                } else {
                    $("#pindocumentsort").css('display', 'none');
                }
                //manoj
                var vFinalSignature = "dropdownMenuFinal";
                var vMarkFinalSignature = "dropdownMenuMarkFinal";
                var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
                var vAccFeat = $.grep(veContractFeatures, function (n, i) {
                    return (n.RowKey == "1" && n.Status == "ON");
                });
                if (vAccFeat.length > 0) {
                    vFinalSignature = "dropdownMenuFinalSignature";
                    vMarkFinalSignature = "dropdownMenuMarkFinalSignature";
                    $("#dropdownMenuAmendment .signature").show();
                    $("#dropdownMenuAmendmentFinal .signature").show();
                }
                else {
                    $("#dropdownMenuAmendment .signature").hide();
                    $("#dropdownMenuAmendmentFinal .signature").hide();
                }
                var vGetTime = moment(new Date()).utc();
                //var vGetTime = new Date();
                //$.ajax({
                //    url: '/Documents/GetTime',
                //    type: 'GET',
                //    dataType: 'json',
                //    cache: false,
                //    success: function (data) {
                //        var jsObject = JSON.parse(data);
                //        vGetTime = new Date(jsObject);
                //    }
                //});
                var count = 0;
                var vPermission = $("#hdnPermission").val();

                var settings = {
                    pattern: /\.[0-9a-z]+$/i,
                    knownFileTypes: ['pdf', 'png', 'jpg', 'gif', 'bmp', 'doc', 'xls', 'ppt', 'docx', 'xlsx', 'txt', 'pptx', 'zip', 'rar', 'gzip', 'arj', 'wav', 'mp3', 'aif', 'aiff', 'm4a', 'ogg', 'wma', 'psd', 'ai', 'swf', 'fla', 'css', 'js', 'avi', 'mov', 'wmv', 'dotx'],
                    WopiFrameFileTypes: ['doc', 'xls', 'ppt', 'docx', 'xlsx', 'pptx', 'dotx']
                };
                var datalenght = data.length;
                var vTitle = '';
                var article = '';
                var articleSubFolder = '';
                if (datalenght > 0) {
                    for (var vi = 0; vi < datalenght; vi++) {
                        if (data[vi].ContractArea != "") {
                            docdefaultview(data[vi].ContractArea);
                            break;
                        }
                    }
                }
                var DocDefaultView = "";
                if (thisDocumentLibrarySettings != '' && thisDocumentLibrarySettings != 'undefined' && typeof thisDocumentLibrarySettings != "undefined") {
                    DocDefaultView = thisDocumentLibrarySettings.DocDefaultView;
                    DocVersion = thisDocumentLibrarySettings.DocVersion;
                }
                for (var i = 0; i < datalenght; i++) {
                    var item = data[i];
                    var vv = moment(new Date(item.Modified));
                    var vTime = vv.fromNow();
                    vTime = vv.from(vGetTime);

                    count++
                    var vClass = "openmenuDocumentFinal";
                    var vDocIcon = "";// '<img src="../Content/Images/Doc_draft.png" class="doc_type margin-left-5" alt="Draft Document" title="Draft Document" />';
                    var vPrimDocIcon = '';
                    if (item.IsFinalized == "Yes") {
                        vClass = "openmenuDocument";
                        vDocIcon = '<img src="../Content/Images/icon/final_doc.png" class="doc_type margin-left-5" alt="Finalized Document" title="Finalized Document" />';
                        if (item.CreationMode == "Amendment") {
                            vClass = "openmenuAmendmentDocumentFinal";
                            vDocIcon += '<img src="../Content/Images/amendments.png" style="height:16px; width:16px;" class="doc_type margin-left-5" alt="Amendment Document" title="Amendment Document" />';
                        }
                    } else if (item.CreationMode == "Amendment") {
                        vClass = "openmenuAmendmentDocument";
                        vDocIcon = '<img src="../Content/Images/amendments.png" style="height:16px; width:16px;" class="doc_type margin-left-5" alt="Amendment Document" title="Amendment Document" />';
                    }
                    //manoj
                    if (item.IsPined == "Yes" && item.IsPrimary != "Yes") {
                        vClass += "UnPin";
                    }
                    if (item.IsPrimary == "Yes") {
                        vPrimDocIcon = '<img src="../Content/Images/primary_doc.png" class="doc_type margin-left-5" alt="Primary Document" title="Primary Document" />';
                        vClass += "UnPin" + " hideItem primarydocument";
                    } else {
                        vClass += " showitem";
                    }
                    //manoj
                    //if (item.IsPrimary == "Yes") {
                    //    vPrimDocIcon = '<img src="../Content/Images/primary_doc.png" class="doc_type margin-left-5" alt="Primary Document" title="Primary Document" />';
                    //}

                    // Bug (eO37060, eO37244)
                    if (item.DocumentStatus == "Expired" || contractItem.IsDraft == "Yes" || contractItem.Status == "Expired"
                    || contractItem.Status == "Cancelled" || contractItem.Status == "Replaced" || contractItem.Status == "Archived") {
                        vClass = "openmenuExpiredDocument";
                    }

                    vURLDoc = encodeURI(item.DocumentUrl);
                    var ext = vURLDoc.match(settings.pattern);
                    var vFileType = '<dd class="file-icon none"></dd>';
                    if (ext != null) {
                        if (ext.length > 0) { ext = ext[0].slice(1); }
                        if (DocDefaultView == "WordClient") {
                            if (vURLDoc.toLowerCase().indexOf(localStorage.SPHostUrl.toLowerCase()) >= 0) {
                                if (jQuery.inArray(ext, settings.WopiFrameFileTypes) > -1) {
                                    vRawURLDoc = encodeURIComponent(item.DocumentUrl);
                                    vURLDoc = localStorage.SPHostUrl + "/_layouts/WopiFrame.aspx?sourcedoc=" + vRawURLDoc + "&action=default";
                                } else {
                                    vRawURLDoc = "";
                                }
                            }
                        }

                        if (jQuery.inArray(ext.toLowerCase(), settings.knownFileTypes) > -1) {
                            vFileType = '<dd class="file-icon ' + ext + '"></dd>';
                        }
                        if (ext == 'zip') {
                            vClass = "openmenuZippedDocument";
                        }
                    }

                    if (count <= 10)
                        article += '<li class=" margin-bottom-5" active=' + item.IsActive + '>';
                    else
                        article += '<li class="ShowMorePinDocuments margin-bottom-5" style="display:none;">';

                    article += '<label id="FolderCreationMode" style="display:none;">' + item.CreationMode + '</label>';
                    article += '<label id="DocumentID" style="display:none;">' + item.RowKey + '</label>';
                    article += '<label id="SentForSign" style="display:none;">' + item.SentForSign + '</label>';
                    article += '<label id="DocumentName" style="display:none;">' + item.DocumentName + '</label>';
                    article += '<label id="ShareWorkflow" style="display:none;">' + item.ShareWorkflow + '</label>';
                    article += '<label id="ReviewWorkflow" style="display:none;">' + item.ReviewWorkflow + '</label>';
                    article += '<label id="BusinessArea" style="display:none;">' + item.BusinessArea + '</label>';
                    article += '<label id="IsFinalized" style="display:none;">' + item.IsFinalized + '</label>';
                    var primarydocchecking = (item.IsPrimary != null && item.IsPrimary != "") ? item.IsPrimary : "No";
                    article += '<label id="IsPrimaryDoc" style="display:none;">' + primarydocchecking + '</label>';

                    if (item.CreationMode == "Amendment") {
                        article += '<label id="AmendmentID" style="display:none;">' + item.AmendmentID + '</label>';
                    }
                    //article += '<input type="checkbox" id="' + item.RowKey + '" name="MultipleDocuments" class="Contribute" onclick="checkMultipleDocuments(this);" value=' + item.RowKey + ' /> ';

                    switch (item.DocumentStatus) {
                        case "New":
                            if (item.ContractStatus == 'Expired' || contractItem.Status == "Cancelled" || item.ContractStatus == 'Archived')
                                article += '<b title="New" style="cursor:default" id="' + item.RowKey + '" class="status_green_another details_documentstatus"><img src="../Content/Images/status/new.png" class="margin-right-5" style="cursor:default">new</b>';
                            else
                                article += '<b title="New" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_green_another details_documentstatus"><img src="../Content/Images/status/new.png" class="margin-right-5">new</b>';
                            break;
                        case "Ready for Signature":
                            if (item.ContractStatus == 'Expired' || contractItem.Status == "Cancelled" || item.ContractStatus == 'Archived')
                                article += '<b title="Ready for Signature" style="cursor:default" id="' + item.RowKey + '" class="status_green details_documentstatus"><img src="../Content/Images/status/active.png" class="margin-right-5" style="cursor:default">sign</b>';
                            else
                                article += '<b title="Ready for Signature" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_green details_documentstatus"><img src="../Content/Images/status/active.png" class="margin-right-5">sign</b>';
                            break;
                        case "Awaiting Signatures":
                            if (item.ContractStatus == 'Expired' || contractItem.Status == "Cancelled" || item.ContractStatus == 'Archived')
                                article += '<b title="Awaiting Signatures" style="cursor:default" id="' + item.RowKey + '" class="status_yellow details_documentstatus"><img src="../Content/Images/status/renew.png" class="margin-right-5" style="cursor:default">sign</b>';
                            else
                                article += '<b title="Awaiting Signatures" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_yellow details_documentstatus"><img src="../Content/Images/status/renew.png" class="margin-right-5">sign</b>';
                            break;
                        case "Active":
                            if (item.ContractStatus == 'Expired' || contractItem.Status == "Cancelled" || item.ContractStatus == 'Archived')
                                article += '<b title="Active" style="cursor:default" id="' + item.RowKey + '" class="status_green details_documentstatus"><img src="../Content/Images/status/active.png" class="margin-right-5" style="cursor:default">actv</b>';
                            else
                                article += '<b title="Active" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_green details_documentstatus"><img src="../Content/Images/status/active.png" class="margin-right-5">actv</b>';
                            break;
                        case "Signed":
                            if (item.ContractStatus == 'Expired' || contractItem.Status == "Cancelled" || item.ContractStatus == 'Archived')
                                article += '<b title="Signed" style="cursor:default" id="' + item.RowKey + '" class="status_blue details_documentstatus"><img src="../Content/Images/status/tick.png" class="margin-right-5" style="cursor:default">Sign</b>';
                            else
                                article += '<b title="Signed" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_blue details_documentstatus"><img src="../Content/Images/status/tick.png" class="margin-right-5">Sign</b>';
                            break;
                        case "Expired":
                            if (item.ContractStatus == 'Expired' || contractItem.Status == "Cancelled" || item.ContractStatus == 'Archived')
                                article += '<b title="Expired" style="cursor:default" id="' + item.RowKey + '" class="status_Gray details_documentstatus"><img src="../Content/Images/status/expried.png" class="margin-right-5" style="cursor:default">exp</b>';
                            else
                                article += '<b title="Expired" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_Gray details_documentstatus"><img src="../Content/Images/status/expried.png" class="margin-right-5">exp</b>';
                            break;
                        case "Awaiting Review":
                            if (item.ContractStatus == 'Expired' || contractItem.Status == "Cancelled" || item.ContractStatus == 'Archived')
                                article += '<b title="Awaiting Review" style="cursor:default" id="' + item.RowKey + '" class="status_yellow details_documentstatus"><img src="../Content/Images/status/renew.png" class="margin-right-5" style="cursor:default">Rev</b>';
                            else
                                article += '<b title="Awaiting Review" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_yellow details_documentstatus"><img src="../Content/Images/status/renew.png" class="margin-right-5">Rev</b>';
                            break;
                        case "Reviewed":
                            if (item.ContractStatus == 'Expired' || contractItem.Status == "Cancelled" || item.ContractStatus == 'Archived')
                                article += '<b title="Reviewed" style="cursor:default" id="' + item.RowKey + '" class="status_blue details_documentstatus"><img src="../Content/Images/status/tick.png" class="margin-right-5" style="cursor:default">Rev</b>';
                            else
                                article += '<b title="Reviewed" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_blue details_documentstatus"><img src="../Content/Images/status/tick.png" class="margin-right-5">Rev</b>';
                            break;
                        case "In Negotiation":
                            if (item.ContractStatus == 'Expired' || contractItem.Status == "Cancelled" || item.ContractStatus == 'Archived')
                                article += '<b title="In Negotiation" style="cursor:default" id="' + item.RowKey + '" class="status_yellow details_documentstatus"><img src="../Content/Images/status/renew.png" class="margin-right-5" style="cursor:default">nego</b>';
                            else
                                article += '<b title="In Negotiation" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_yellow details_documentstatus"><img src="../Content/Images/status/renew.png" class="margin-right-5">nego</b>';
                            break;
                        case "Negotiation Complete":
                            if (item.ContractStatus == 'Expired' || contractItem.Status == "Cancelled" || item.ContractStatus == 'Archived')
                                article += '<b title="Negotiation Complete" style="cursor:default" id="' + item.RowKey + '" class="status_blue details_documentstatus"><img src="../Content/Images/status/tick.png" class="margin-right-5" style="cursor:default">nego</b>';
                            else
                                article += '<b title="Negotiation Complete" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_blue details_documentstatus"><img src="../Content/Images/status/tick.png" class="margin-right-5">nego</b>';
                            break;
                    }

                    vTitle = item.DocumentName;
                    if (vTitle.length > 61)
                    { vTitle = vTitle.substring(0, 60) + '...'; }
                    if (item.IsActive == "No") {
                        article += vFileType + '<a data-value="' + encodeURI(item.DocumentUrl) + '" href="javascript:void(0);" title="' + item.DocumentName + '" onclick="ViewDocument(\'' + encodeURI(item.DocumentUrl) + '\')" >' + item.DocumentName + '</a><img src="../Content/Images/new_item.png" alt="New" title="New">';
                    } else {
                        if (vRawURLDoc != "") {
                            if (DocDefaultView == "WordClient") {
                                article += vFileType + '<a href="#" seqe = "' + vRawURLDoc + '" onclick="viewdocinword(\'' + vRawURLDoc + '\')" title="' + item.DocumentName + '">' + vTitle + '</a>';
                            } else {
                                article += vFileType + '<a href="javascript:void(0);" data-value="' + encodeURIComponent(item.DocumentUrl) + '"  onclick="Opendocinbrowser(this)" title="' + item.DocumentName + '">' + vTitle + '</a>';
                            }
                        } else {
                            article += vFileType + '<a href="javascript:void(0);" data-value="' + encodeURIComponent(item.DocumentUrl) + '"  onclick="Opendocinbrowser(this)" title="' + item.DocumentName + '">' + vTitle + '</a>';
                        }
                    }
                    if (vTime == "Invalid date") {
                        article += '<span class="sub-text"> few seconds ago</span>';
                    }
                    else {
                        article += '<span class="sub-text"> ' + vTime + '</span>';
                    }
                    article += '';
                    article += '';
                    if (item.IsActive != "No") {
                        article += vPrimDocIcon + vDocIcon + '&nbsp;<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="' + vClass + ' margin-left-5" onclick="FilterMenuOptions(this)" />';
                    } else {
                        article += vPrimDocIcon + vDocIcon + '&nbsp';
                    }
                    if (item.IsMetadataMismatch == "Yes" && item.ActualDocID == '' && ext.toLowerCase() != 'pdf') {
                        article += '<a href="javascript:void(0);" data="' + item.ContractAndDocumentMetadata + '" onclick="javascript: openmismatched(this)"><img src="../Content/Images/icon/mismatch_icon.png"  style="cursor:pointer;" title="Mismatched Document and Contract Record Metadata." class="margin-left-5" /></a>';
                    }
                    article += '</li>';
                }
                $("#ulPinDocument").html(articleSubFolder + article);
                if (count > 10) {
                    $("#dvPinDocument").html('<a id="ShowMorePinDocuments" href="javascript:void(0);" class="pad-all close1" onclick="ShowMorePinDocuments()">More Document(s) </a>' +
                                            '<a id="ShowLessPinDocuments" href="javascript:void(0);" class="pad-all close1" onclick="ShowLessPinDocuments()" style="display:none;">Show less</a>');
                } else {
                    $('.ShowMorePinDocuments').css("display", "none");
                    $('#ShowMorePinDocuments').css("display", "none");
                    $('#ShowLessPinDocuments').css("display", "none");
                }

                $("#lblPinDocumentsCount").text(count);

                if (!$("#lblPinDocumentsCount").text().trim()) {
                    $("#ulPinDocument").empty();
                    $("#ulPinDocument").append('No items found.');
                }
                if (DocVersion == "No") {
                    $('li.history').hide();
                }
                //Un Pin Document

                $(".openmenuDocumentUnPin").contextMenu({ menu: vFinalSignature + "UnPin", leftButton: true }, function (action, el, pos) { contextMenuDocument(action, el.parent("li"), pos); });
                $(".openmenuDocumentFinalUnPin").contextMenu({ menu: vMarkFinalSignature + "UnPin", leftButton: true }, function (action, el, pos) { contextMenuDocument(action, el.parent("li"), pos); });
                $(".openmenuExpiredDocument").contextMenu({ menu: "dropdownExpiredDocument", leftButton: true }, function (action, el, pos) { contextMenuDocument(action, el.parent("li"), pos); }); // Bug (eO37060)
                $(".openmenuAmendmentDocumentUnPin").contextMenu({ menu: "dropdownMenuAmendmentUnPin", leftButton: true }, function (action, el, pos) { contextMenuAmendmentDocument(action, el.parent("li"), pos); });
                $(".openmenuAmendmentDocumentFinalUnPin").contextMenu({ menu: "dropdownMenuAmendmentFinalUnPin", leftButton: true }, function (action, el, pos) {
                    contextMenuAmendmentDocument(action, el.parent("li"), pos);
                });
                //manoj
                $(".openmenuFolder").contextMenu({ menu: 'myMenuFolder', leftButton: true }, function (action, el, pos) { contextMenuWorkFolder(action, el.parent("li"), pos); });
                //if ($("#hdnnewdocumentfeature").text() != "Yes") {
                //    $(".pinhide").css("display", "none");
                //} else {
                //$('.pinhide').css("display", "");
                //manoj
                $(".openmenuZippedDocument").contextMenu({ menu: "dropdownZippedDocument", leftButton: true }, function (action, el, pos) { contextMenuDocument(action, el.parent("li"), pos); });
                $(".hideItem").click(function () {
                    if ((contractItem.Permission == 'Manage' || contractItem.Permission == 'Contribute') && (!(contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Replaced" || contractItem.Status == "Archived"))) {
                        $(".unpindocument").hide();
                        $(".pindocument").hide();
                        $(".primary").show();
                    }
                })
                $(".showitem").click(function () {
                    if ((contractItem.Permission == 'Manage' || contractItem.Permission == 'Contribute') && (!(contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Replaced" || contractItem.Status == "Archived"))) {
                        $(".unpindocument").show();
                        $(".pindocument").show();
                        $(".primary").show();
                    }
                })
                $(".primarydocument").click(function () {
                    $(".primary").hide();
                })
                //manoj
                //}

            } else {
                $("#pindocumentsort").css('display', 'none');
                $("#lblPinDocumentsCount").text('0');
                $("#ulPinDocument").html('No items found.');
                $("#hdnPinDocumentCount").text("No");
            }
        }, error:
                function (data) {
                    $("#pindocumentsort").css('display', 'none');
                    $("#lblPinDocumentsCount").text('0');
                    $("#ulPinDocument").html('No items found.');
                    $("#hdnPinDocumentCount").text("No");

                },
        complete: function (data) {
            //$("#ulPinDocument").parent().prepend('<div class="warning-msg clearfix" style="display:none;"><img src="/Content/Images/icon/warning-icon.png" alt=""><table id="tblDocumentMissing"></table><a href="javascript:void(0);" class="close1" onclick="GetContractPendingAction(true)" title="View All"><img src="/Content/Images/view-all-new.png" style="cursor:pointer;">&nbsp;</a></div>')
        }
    });
}
//manoj

function contextMenuWorkFolder(action, el, pos) {

    switch (action) {
        case "open":
            {
                var documentName = $(el).find("#DocumentName").text();
                var documentID = $(el).find("#DocumentID").text();
                var LinkURL = $("#" + documentID)[0];
                showfolderdocuments(LinkURL);
                break;
            }
        case "delete":
            {
                var documentName = $(el).find("#DocumentName").text();
                var documentID = $(el).find("#DocumentID").text();
                var FolderCreationMode = $(el).find("#FolderCreationMode").text();
                swal({
                    title: '',
                    text: "Are you sure you want to <span style=\"font-weight:700\">delete</span> the folder <span style=\"font-weight:700\">'" + documentName + "'</span>? All its documents will be deleted.",
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
                         var contractIDToPass = getParameterByName("ContractID");
                         $.ajax({
                             url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/folder?contractid=' + contractIDToPass + '&folderid=' + documentID,
                             type: 'DELETE',
                             dataType: 'json',
                             "Content-Type": "application/json",
                             headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
                             cache: false,
                             success: function (data) {
                                 //manoj
                                 var FolderID = $(el).find("#DocumentID").text();
                                 var ulDocumentlist = $("#ulDocument li");
                                 if (ulDocumentlist.length > 0) {
                                     var documentexist = $(ulDocumentlist).find("a[id=" + FolderID + "]");
                                     if (documentexist.length > 0) {
                                         $(ulDocumentlist).find("a[id=" + FolderID + "]").parent().remove();
                                     }
                                 }
                                 ulDocumentlist = $("#ulDocument li");
                                 if (ulDocumentlist.length == 0) {
                                     $("#ulDocument").html('No items found.');
                                 }
                                 //if (documentview == null || documentview == "" || documentview == 'folder') {
                                 //    if ($('#showAll').text() != null && $('#showAll').text() != "" && typeof ($('#showAll').text()) != "undefined") {
                                 //        var selectedfoldervalue = $('#showAll').find("a");
                                 //        var textvalueselected = $(selectedfoldervalue)[$(selectedfoldervalue).length - 1].textContent;
                                 //        var idvalueselected = $(selectedfoldervalue)[$(selectedfoldervalue).length - 1].id;
                                 //        var parentdocumentdetails = { id: idvalueselected, text: textvalueselected };
                                 //        showfolderdocuments(parentdocumentdetails);
                                 //    }
                                 //    else {
                                 //        BindDocument(vContractID);
                                 //    }
                                 //} else {
                                 //    DisplayDocument(documentview);
                                 //}
                                 //pendingStarted = false;
                                 //GetContractPendingAction(true, "BindPeoples");
                                 //$("#hdnFolderDocumentView").text('');
                                 //$("#hdnShowAllTextValue").html('');
                                 //PrvFolderselection = '';
                                 ////Bind primary and pined document based on new feature
                                 //if ($("#hdnnewdocumentfeature").text() == "Yes") {
                                 //    CreateDocumentListPinView(vContractID);
                                 //}
                                 ////manoj
                                 //if (typeof FolderCreationMode != "undefined" && FolderCreationMode != null && FolderCreationMode != "") {
                                 //    if (FolderCreationMode.trim() == "Amendment") {
                                 //        if (contractItem.ContractDocumentsUrl == "") {
                                 //            $('#lblFolderUrlAmend').text("/" + $('#hdContAreaDocLibName').val() + "/" + contractItem.ContractTitle.replace(/[\*\|\,\"\:\<\>\[\}\{\}\'\(\)\&\#\%\.\-\!]/g, '').replace(/\//g, '').replace(/\s\s+/g, " ").trim() + "/");
                                 //            $('#txtNewFolderNameAmend').val("Amendments");
                                 //        } else {
                                 //            $('#lblFolderUrlAmend').text(((contractItem.ContractDocumentsUrl.charAt(contractItem.ContractDocumentsUrl.length - 1)) != "/") ? contractItem.ContractDocumentsUrl + "/" : contractItem.ContractDocumentsUrl);
                                 //            //if ((contractItem.ContractDocumentsUrl.charAt(contractItem.ContractDocumentsUrl.length - 1)) != "/") {
                                 //            //    $('#lblFolderUrlAmend').text(contractItem.ContractDocumentsUrl + "/");
                                 //            //} else {
                                 //            //    $('#lblFolderUrlAmend').text(contractItem.ContractDocumentsUrl);
                                 //            //}
                                 //            $('#txtNewFolderNameAmend').val("Amendments");
                                 //        }
                                 //        $('#txtNewFolderNameAmend').css('display', '');
                                 //        $('#txtNewFolderNameAmend').addClass('validelement');
                                 //    }
                                 //}
                                 $("#ddlDocumentList option[value='" + documentID + "']").remove();
                                 //$("#ddlDocumentList").trigger('chosen:updated');
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


function documentstatuseditchange() {
    if ($("#ddlDocumentStatusEdit").val() != 0 && $("#ddlDocumentStatusEdit").val() == "Expired") {
        $("#dtValidFromEdit").val("");
        $("#dtValidTillEdit").val("");
        if (document.getElementById("ulvalidity1").style.display != "none") {
            $("#linkAddValidity1").click();
        }
        $("#linkAddValidity1").css('display', 'none');
    }
    else {
        $("#linkAddValidity1").css('display', 'block');
    }
}


function BindO365LibrarySettings() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/getdocumentsettings',
        type: 'GET',
        dataType: 'json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (librarysettings) {
            if (librarysettings.AllowSaveDraftInCloud == "on") {
                AllowSaveDraftInCloud = "on";
                if ($("input:radio[name=IsFinalized]:checked").val() == "Yes") {
                    if (librarysettings.SaveFinalInCloud == "on") {
                        SaveFinalInCloud = "on";
                    } else {
                        SaveFinalInCloud = "off";
                    }
                }
                else {
                    if (librarysettings.SaveDraftInCloud == "on") {
                        SaveDraftInCloud = "on";
                    }
                    else {
                        SaveDraftInCloud = "off";
                    }
                }
            }
            else {
                AllowSaveDraftInCloud = "off";
                SaveFinalInCloud = "off";
                SaveDraftInCloud = "off";
            }
        },
        error: function () {

        }
    });
}

function GetDocumentSignatureDetail(documentid) {
    $("#tblDocSignatureDetail").empty();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Documents/SignatureDetail?documentid=' + documentid,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            $(data).find('recipients').each(function () {
                var name = $(this).find('name').text();
                var state = $(this).find('state').text();
                var email = $(this).find('email').text();

                var sObject = item.Object;
                var sActivity = item.Activity;
                var sUserID = item.UserID;
                var sTimestamp = moment(new Date(item.Timestamp)).format('MM/DD/YYYY h:mm A');
                var article = '<tr><td><span class="logHis_Datetime">' + name + '</span></td><td><span class="logHis_Activity">' + email + '</span></td><td><span class="logHis_Datetime">' + state + '</span></td></tr>';
                $("#tblDocSignatureDetail").append(article);
            });

            $("#docSignatureDetail").dialog("open");
            $("#docSignatureDetail").height("auto");

        },
        error: function (data) {
            var vv = "";
        }
    });
}

// For edit document type
var editDocType = "";


function EditDocumentMetadata(documentID) {
    $("#loadingPage").fadeIn();
    //manoj
    $("#spnfolderurl").text('');
    editDocType = "";
    //manoj
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?documentid=' + documentID,
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (documententity) {
            $("#loadingPage").fadeOut();
            editDocType = documententity.DocumentType;
            $("#txtDocumentID").val(documententity.RowKey);
            var vDocName = documententity.DocumentName.split('.');
            $("#txtDocumentName").val(vDocName.slice(0, -1).join('.'));
            $("#spExt").html(vDocName[vDocName.length - 1]);
            $("#lblDocumentUrl").val(documententity.DocumentUrl);
            //manoj
            var FolderURLToReplace = $("#hdnContractDocumentsUrlFixed").text().slice(0, -1);
            var arrspnDocURL = documententity.DocumentUrl.replace(FolderURLToReplace, ";").split(';').filter(function (vfld) { return vfld !== '' });
            var spnDocURL = arrspnDocURL.pop();
            var arrspnDocURL = spnDocURL.split('/').filter(function (vfldr) { return vfldr !== '' });
            if (arrspnDocURL.length > 1) {
                arrspnDocURL = arrspnDocURL.slice(0, -1);
                $("#spnfolderurl").text($("#hdnContractDocumentsUrlFixed").text() + arrspnDocURL.join("/") + '/');
            } else {
                $("#spnfolderurl").text($("#hdnContractDocumentsUrlFixed").text());
            }
            //if (spnDocURL == '/') {
            //    spnDocURL = spnDocURL.substr(1);
            //}
            //$("#spnfolderurl").text(spnDocURL);
            //if (spnDocURL.charAt(0) == '/') {
            //    spnDocURL = spnDocURL.substr(1);
            //}
            //$("#spnfolderurl").text(spnDocURL);
            //manoj
            //$("#ddlDocumentType option").filter(function (index) { return $(this).text() === ((documententity.DocumentType != "0") ? documententity.DocumentType : "--Select--"); }).prop('selected', true);
            $("#txtDocumentDescriptionEdit").val(documententity.Description);
            GetValuesAndAutoPopulate("ddlAuthorEdit", documententity.DocumentAuthor);
            $("#txtDocumentLanguageEdit").val(documententity.DocumentLanguage);
            $("#txtHardCopyPhysicalLocationEdit").val(documententity.HardCopyPhysicalLocation);
            if (documententity.IsFinalized == "Yes") {
                $('input[type="radio"][name="IsFinalizedEdit"][value="Yes"]').prop('checked', true);
                //$("#liFinalizedBy").css("display", "");
                $("#liFinalizedBy").removeClass("finalizedDoc");
                var fFinalizedDate = "";
                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                { fFinalizedDate = moment(new Date(documententity.FinalizedDate)).format('MM/DD/YYYY'); }
                else { fFinalizedDate = moment(new Date(documententity.FinalizedDate)).format(localStorage.AppDateFormat); }
                $("#dvFinalizedBy").html(documententity.FinalizedBy + ' on ' + fFinalizedDate);
            }
            else {
                //$("#liFinalizedBy").css("display", "none");
                $("#liFinalizedBy").addClass("finalizedDoc");
                $("#dvFinalizedBy").html('');
                var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
                var vAccFeat = $.grep(veContractFeatures, function (n, i) {
                    return (n.RowKey == "16" && n.Status == "ON");
                });
                if (vAccFeat.length > 0) {
                    $('input[type="radio"][name="IsFinalizedEdit"][value="No"]').prop('checked', true);
                } else {
                    $('input[type="radio"][name="IsFinalizedEdit"][value="Yes"]').prop('checked', true);
                }
            }

            if ($('#linkMoreInfo1').text().indexOf("Less Information") > -1) {
                $("#linkMoreInfo1").click();
            }

            if (documententity.IsStandard == "Yes")
                $('input[type="radio"][name="IsStandardEdit"][value="Yes"]').prop('checked', true);
            else
                $('input[type="radio"][name="IsStandardEdit"][value="No"]').prop('checked', true);

            if (documententity.IsPrimary == "Yes")
                $('input[type="radio"][name="IsPrimaryEdit"][value="Yes"]').prop('checked', true);
            else
                $('input[type="radio"][name="IsPrimaryEdit"][value="No"]').prop('checked', true);

            if (documententity.DocumentStatus.trim() == 'Expired') {
                $("#dtValidFromEdit").val("");
                $("#dtValidTillEdit").val("");

                if (document.getElementById("ulvalidity1").style.display != "none") {
                    $("#linkAddValidity1").click();
                }
                $("#linkAddValidity1").css('display', 'none');

                //if ($("#linkAddValidity1").text() == "Track document expiration date") {
                //    $("#linkAddValidity1").css('display', 'none');
                //}
                //else {
                //    $("#linkAddValidity1").click();
                //    $("#linkAddValidity1").css('display', 'none');
                //}
            }
            else {
                $("#dtValidFromEdit").val("");
                $("#dtValidTillEdit").val("");

                if (document.getElementById("ulvalidity1").style.display != "none") {
                    $("#linkAddValidity1").click();
                }
                $("#linkAddValidity1").css('display', 'block');
                //if ($("#linkAddValidity1").text() == "Track document expiration date") {
                //    $("#linkAddValidity1").css('display', 'block');
                //}
                //else {
                //    $("#linkAddValidity1").click();
                //    $("#linkAddValidity1").css('display', 'block');
                //}
            }
            $("#ddlDocumentStatusEdit option").filter(function (index) { return $(this).text() === documententity.DocumentStatus; }).prop('selected', true);
            //*Harshitha
            var fvalidfrom = "";
            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                if (documententity.ValidFrom != null) {
                    var docvalidfrom = new Date(documententity.ValidFrom)
                    var docvalidfrom1 = (docvalidfrom.getUTCMonth() + 1) + '/' + docvalidfrom.getUTCDate() + '/' + docvalidfrom.getUTCFullYear();
                    fvalidfrom = moment(docvalidfrom1).format('MM/DD/YYYY');
                }
            }
            else {
                if (documententity.ValidFrom != null) {
                    var docvalidfrom = new Date(documententity.ValidFrom)
                    var docvalidfrom1 = (docvalidfrom.getUTCMonth() + 1) + '/' + docvalidfrom.getUTCDate() + '/' + docvalidfrom.getUTCFullYear();
                    fvalidfrom = moment(docvalidfrom1).format(localStorage.AppDateFormat);
                }
            }

            var fValidTill = "";
            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                if (documententity.ValidTill != null) {
                    var docvalidtill = new Date(documententity.ValidTill)
                    var docvalidtill1 = (docvalidtill.getUTCMonth() + 1) + '/' + docvalidtill.getUTCDate() + '/' + docvalidtill.getUTCFullYear();
                    fValidTill = moment(docvalidtill1).format('MM/DD/YYYY');
                }
            }
            else {
                if (documententity.ValidTill != null) {
                    var docvalidtill = new Date(documententity.ValidTill)
                    var docvalidtill1 = (docvalidtill.getUTCMonth() + 1) + '/' + docvalidtill.getUTCDate() + '/' + docvalidtill.getUTCFullYear();
                    fValidTill = moment(docvalidtill1).format(localStorage.AppDateFormat);
                }
            }
            $("#dtValidFromEdit").val(fvalidfrom);
            $("#dtValidTillEdit").val(fValidTill);
            //
            GetValuesAndAutoPopulate("ddlDocRemindToEdit", documententity.SendReminderTo);
            $("#txtReminder1Edit").val(documententity.Reminder1);
            $("#txtReminder2Edit").val(documententity.Reminder2);
            $("#txtReminder3Edit").val(documententity.Reminder3);
            if (documententity.Reminder1Condition != '') {
                $("#ddlReminder1Edit option").filter(function (index) { return $(this).text() === documententity.Reminder1Condition; }).prop('selected', true);
            }
            else {
                $("#ddlReminder1Edit").val('before')
            }
            if (documententity.Reminder2Condition != '') {
                $("#ddlReminder2Edit option").filter(function (index) { return $(this).text() === documententity.Reminder2Condition; }).prop('selected', true);
            }
            else {
                $("#ddlReminder2Edit").val('before')
            }
            if (documententity.Reminder3Condition != '') {
                $("#ddlReminder3Edit option").filter(function (index) { return $(this).text() === documententity.Reminder3Condition; }).prop('selected', true);
            }
            else {
                $("#ddlReminder3Edit").val('before')
            }

            if (vDocName[vDocName.length - 1] == 'zip' || vDocName[vDocName.length - 1] == 'ZIP') {
                $('#linkAddValidity1').css('display', 'none');
            } else {
                $('#linkAddValidity1').css('display', '');
            }
        },
        error: function () {
            $("#loadingPage").fadeOut();
        },
        complete: function () {
            $("#loadingPage").fadeOut();
            $("#trFileUpload").css("display", "none");
            $("#lblCTitleDoc").text($("#lblContractTitle").text());
            $(".validelement").each(function (index, element) {
                $(element).removeClass("error");
                $("#errormsg_" + element.id).remove();
            });
            $("#EditDocument").dialog("option", "title", "Edit Document Metadata");
            $("#EditDocument").dialog("open");
        }
    });
}

function AddContractDocument(objmanagefolder) {
    //manoj
    $("#btnManagesubfolder").css("display", "none");
    if (typeof ($("#hdnContractDocumentsUrl").text()) != "undefined" && $("#hdnContractDocumentsUrl").text() != null && $("#hdnContractDocumentsUrl").text() != "") {
        MangeContractFolder($("#hdnContractDocumentsUrl").text().substring(1));
        $("#liRelatedAction").html('Other Action(s)');
        $("#liManageFolders").css("display", "");
    } else {
        $("#dvManageFolder").html('No items found.');
        $("#liManageFolders").css("display", "none");
        $("#liRelatedAction").html('Other Action');
    }
    ClearManageDoc();
    $("#btnDocAdd").css("display", "");
    //manoj
    $("#btnDocCancel").html('<span class="pop_up_Content_Green pop_up_Content_White margin-0px">Cancel</span>');
    //manoj
    document.getElementById('docManageBulk').addEventListener('change', handleFileSelect, false);
    $('#lblTemplateDescription').text("");
    $('#dtValidFrom').removeClass('error')
    $('#dtValidTill').removeClass('error')
    $('#errormsg_dtValidFrom').text('');
    $('#errormsg_dtValidTill').text('');
    $('#dtValidFrom').val('');
    $('#dtValidTill').val('');
    $('#ddlDocumentStatus').val("New");
    //$("#formValidity").css("display", "none");
    $("#formValidityForm").css("display", "none");
    $("#tabUpload").addClass("document_active");
    $("#tabTemplate").removeClass("document_active");
    $("#tabExistingDocument").removeClass("document_active");
    $("#tabBulkUpload").removeClass('document_active');
    $("#tabManageFolder").removeClass('document_active');
    $("#btnDocAdd").html('<span class="ui-button-text">Upload</span>')
    //manoj
    $("#btnDocCancel").html('<span class="pop_up_Content_Green pop_up_Content_White margin-0px">Cancel</span>');
    //manoj

    if (document.getElementById("trdesc").style.display != "none") {
        //$(".clmoreinfo").toggle();
        $("#linkMoreInfo").click();
    }

    if ($("#ddlDocumentStatus").val() != 0 && $("#ddlDocumentStatus").val() == "Expired") {
        $("#dtValidFrom").val("");
        $("#dtValidTill").val("");
        if (document.getElementById("formValidityForm").style.display != "none") {
            $("#linkAddValidity").click();
        }
        $("#linkAddValidity").css('display', 'none');
        //if ($("#linkAddValidity").text() == "Track document expiration date") {
        //    $("#linkAddValidity").css('display', 'none');
        //}
        //else {
        //    $("#linkAddValidity").click();
        //    $("#linkAddValidity").css('display', 'none');
        //}
    }
    else {
        $("#linkAddValidity").css('display', 'block');
    }

    $("#tblContentControls").empty();
    selectUploadFromComputer();

    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
    var vAccFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "16" && n.Status == "ON");
    });
    if (vAccFeat.length > 0) {
        $('input[type="radio"][name="IsFinalized"][value="No"]').prop('checked', true);
    } else {
        $('input[type="radio"][name="IsFinalized"][value="Yes"]').prop('checked', true);
    }
    if (contractItem.IsStandard == "Yes")
        $('input[type="radio"][name="IsStandard"][value="Yes"]').prop('checked', true);
    else
        $('input[type="radio"][name="IsStandard"][value="No"]').prop('checked', true);
    //$('input[type="radio"][name="IsPrimary"][value="No"]').prop('checked', true);
    $("#radioPrimaryNo").prop("checked", true);
    $("#txtDocumentID").val("");
    $("#txtDocumentName").val("");
    $("#docContract").replaceWith($("#docContract").val('').clone(true));
    $("#txtDescriptionDoc").val("");
    $("#txtDocumentLanguageCreate").val("");
    $("#txtHardCopyPhysicalLocationCreate").val("");

    $("#lblCTitleDoc").text($("#lblContractTitle").text());
    $("#trFileUpload").css("display", "");
    $("#trDocumentType").css("display", "");
    $("#ddlDocumentTemplate").val("0");
    $("#ddlDocumentTemplate").removeClass('validelement');
    $("#txtDocumentNameCreate").val("");
    $("#txtDocumentNameCreate").removeClass('validelement');
    $("#docContract").replaceWith($("#docContract").val('').clone(true));

    $(".validelement").each(function (index, element) {
        $(element).removeClass("error");
        $("#errormsg_" + element.id).remove();
    });

    $(".specialchar").each(function (index, element) {
        $(element).removeClass("error");
        $("#errormsg_" + element.id).remove();
    });

    $(".filecorevo").each(function (index, element) {
        $(element).removeClass("error");
        $("#errormsg_" + element.id).remove();
    });


    if ($('#tblExistingDocument tr').length <= 0) {
        BindDocumentNotTagToContract();
    }
    $("#btnNewFolder").text('Create Sub Folder');
    setDocumentUrl();

    $("#ddlDocumentTypeCreate").val("0");

    if ($('#showAll').text() == null || $('#showAll').text() == "" || typeof ($('#showAll').text()) == "undefined") {
        $('#txtNewFolderName').addClass('validelement');
    }
    else {
        $('#txtNewFolderName').removeClass('validelement');
    }
    if (defaultGlobalSettings != null && defaultGlobalSettings != "") {
        var documentreminders = defaultGlobalSettings.DocumentReminders;
        var xmlDoc = $.parseXML(documentreminders);
        var $xml = $(xmlDoc);
        var $reminder = $xml.find("reminder");
        var j = 1;
        $reminder.each(function () {
            var beforeSplit = $(this).text();
            var remSplit = beforeSplit.split(/ +/);
            $("#ddlReminder" + j + "New").val(remSplit[0]);
            $("#txtReminder" + j + "New").val(remSplit[1]);
            j = j + 1;
        });
    }

    //manoj
    $("#fileUploadOCR").prop('checked', false);
    $("#trfileUploadOCR").css('display', 'none');
  
    if (typeof (objmanagefolder) != "undefined" && objmanagefolder != null && objmanagefolder != "") {
        Manage_Folder();
    }
    //manoj

    //$("#ddlDocumentTypeCreate").find('option[value="Primary Agreement"]').prop("selected", true);
    $("#addEditDocument").dialog("option", "title", "Manage Document");
    $("#addEditDocument").dialog("open");
}

function selectUploadFromComputer() {
    $("#tblNewDocument").css('display', '');
    $("#tblExistingDocument").css('display', 'none');
    $("#tblExistingDocumentSearch").css('display', 'none');
    $("#tblExistingDocumentPaging").css('display', 'none');
    $("#tblBulkUploadFolders").css('display', 'none');
    $("#tblManageFolders").css('display', 'none');
    $("#tabUpload").addClass('form-active');
    $("#tabTemplate").removeClass('form-active');
    $("#tabExistingDocument").removeClass('form-active');
    $("#tabBulkUpload").removeClass('form-active');
    $("#tabManageFolder").removeClass('form-active');
    $("#docContract").addClass('validelement');
    $("#docContract").addClass('validfilename');
    $("#ddlDocumentTemplate").removeClass('validelement');
    $("#trTemplate").css('display', 'none');
    $("#trTemplate1").css('display', 'none');
    $("#trFileUpload").css('display', '');
    $("#trDocumentType").css("display", "");
    $('input:checkbox[name=NotTaggedContract]').attr('checked', false);
    $("#hdnIsDocumentTag").text('');
    $("#formTitle").text('Upload from Computer');
}

var overwritedocument = false;
var DuplicateDocId = "";
function modalOnOpenDocument(dialog) {
    //manoj
    $('.ui-button-green-text').parent().attr('disabled', 'disabled');
    var ActiveTab = $("#leftTab");
    var ActiveTabContrtol = $(ActiveTab).find(".form-active");
    var ActiveTabID = "";
    if (typeof (ActiveTabContrtol) != "undefined" && ActiveTabContrtol != null && ActiveTabContrtol != "" && ActiveTabContrtol.length > 0) {
        ActiveTabID = ActiveTabContrtol[0].id;
    }
    //manoj
    if (ActiveTabID != null && ActiveTabID == "tabBulkUpload") {
        var selected_Doc_Count = $("#tblManageBulkControls tbody").find("tr").length;
        if (selected_Doc_Count > 0) {
            bulkdocumentManageupload();
        } else {
            swal("", "Please select the one or more document to upload.");
            $('.ui-button-green-text').parent().removeAttr('disabled');
        }
    } else if ($("#hdnIsDocumentTag").text() == "Yes") {
        //manoj
        document.getElementById("addNewDocument").style.pointerEvents = "default";
        document.getElementById("editNewDocument").style.pointerEvents = "default";
        //manoj
        var isExists = true;
        var headerid = $("#lblContractTitle").text();
        headerid = headerid.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').replace(/[\*\|\,\"\:\<\>\[\}\{\}\'\(\)\&\#\%\.\-\!]/g, '').replace(/\//g, '').replace(/\s\s+/g, " ").trim();
        var finalurl = "";
        finalurl = ($('#hdContAreaDocLibName').val() != null && $('#hdContAreaDocLibName').val() != "") ? $('#hdContAreaDocLibName').val() : '/Contract Documents/';
        finalurl = (finalurl.charAt(0) != '/') ? '/' + finalurl : finalurl;
        finalurl = ((finalurl.substr(finalurl.length - 1)) != "/") ? finalurl + "/" : finalurl;
        finalurl = ($('#showAll').text().replace(/ \/ /g, '/') != null && $('#showAll').text().replace(/ \/ /g, '/') != "") ? finalurl + $('#showAll').text().replace(/ \/ /g, '/') + '/' : finalurl + headerid + '/';
        //manoj
        var vDocuments = "";
        var VDocumentNameList = "";
        ContractDocumentDetails = [];
        Collectcontractdocument = false;
        $('input:checkbox[name="NotTaggedContract"]:checked').each(function () {
            if (!CheckDocumentExist(finalurl, this.value)) {
                if (vDocuments == "") {
                    vDocuments = this.id;
                }
                else {
                    vDocuments += ";" + this.id;
                }
            } else {
                VDocumentNameList += "," + this.value;
            }
        });
        //manoj
        if (VDocumentNameList != "") {
            VDocumentNameList = (VDocumentNameList.charAt(0) == ',') ? VDocumentNameList.substr(1) : VDocumentNameList;
            var nVDocumentNameList = VDocumentNameList.lastIndexOf(",");
            if (nVDocumentNameList > -1) {
                VDocumentNameList = VDocumentNameList.substr(0, nVDocumentNameList) + 'and' + VDocumentNameList.substr(nVDocumentNameList + 1);
            }
            swal("", " '" + VDocumentNameList + "' already exist");
        }
        //manoj
        if (vDocuments != "") {
            $("#loadingPage").fadeIn();
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?documentids=' + vDocuments + '&contractid=' + getParameterByName('ContractID') + '&username=' + localStorage.UserName + '&path=' + encodeURIComponent(finalurl),
                type: 'PUT',
                //data: formData,
                cache: false,
                contentType: false,
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, 'RefreshToken': localStorage.RefreshToken },
                processData: false,
                success: function (document) {
                    $("#addEditDocument").dialog("close");
                    //manoj
                    if (documentview == null || documentview == "" || documentview == 'folder') {
                        if ($('#showAll').text() != null && $('#showAll').text() != "" && typeof ($('#showAll').text()) != "undefined") {
                            var selectedfoldervalue = $('#showAll').find("a");
                            var textvalueselected = $(selectedfoldervalue)[$(selectedfoldervalue).length - 1].textContent;
                            var idvalueselected = $(selectedfoldervalue)[$(selectedfoldervalue).length - 1].id;
                            var parentdocumentdetails = { id: idvalueselected, text: textvalueselected };
                            showfolderdocuments(parentdocumentdetails);
                        }
                        else {
                            BindDocument(vContractID);
                        }
                    } else {
                        DisplayDocument(documentview);
                    }
                    pendingStarted = false;
                    GetContractPendingAction(true, "BindPeoples");
                    $("#hdnFolderDocumentView").text('');
                    $("#hdnShowAllTextValue").html('');
                    PrvFolderselection = '';
                    //Bind primary and pined document based on new feature
                    if ($("#hdnnewdocumentfeature").text() == "Yes") {
                        CreateDocumentListPinView(vContractID);
                    }
                    //manoj
                    $("#tblExistingDocument").empty();
                    $("#hdnIsDocumentTag").text('');
                    $("#tblNewDocument").css('display', '');
                    $("#tblExistingDocument").css('display', 'none');
                    $("#tblExistingDocumentSearch").css('display', 'none');
                    $("#tblExistingDocumentPaging").css('display', 'none');
                    $("#tabTemplate").addClass('form-active');
                    $("#tabUpload").removeClass('form-active');
                    $("#trTemplate").css('display', '');
                    $("#trTemplate1").css('display', '');
                    $("#trFileUpload").css('display', 'none');
                    $('.ui-button-green-text').parent().removeAttr('disabled');
                    $("#loadingPage").fadeOut();
                },
                error: function (document) {
                    $('.ui-button-green-text').parent().removeAttr('disabled');
                    $("#loadingPage").fadeOut();
                }
            });
        } else {
            if (VDocumentNameList == "") {
                swal("", "Please select atleast any one document.");
                $('.ui-button-green-text').parent().removeAttr('disabled');
            }
        }
    }
    else {
        var DocumentID = $("#txtDocumentID").val()
        if (DocumentID != "") {
            if (requiredValidator("EditDocument")) {
                    var vDocUrl = $("#lblDocumentUrl").val().trim();
                    if (CheckDocumentNameExistForEdit(vDocUrl, DocumentID)) {

                        swal("", "Document already exists with the same name.");
                    }
                    else {
                        if ($("#dtValidFromEdit").val() != '' && $("#dtValidTillEdit").val() != '') {
                            if (comparedates("dtValidFromEdit", "dtValidTillEdit")) {

                                EditnewDocument(DocumentID);
                            } else {
                                swal("", "Expires On date should be greater that Valid From date.");
                            }
                        }
                        else {

                            EditnewDocument(DocumentID);
                        }
                    }
            }
        }
        else {
            if (requiredValidator('addNewDocument')) {
                $('.ui-button-green-text').parent().attr('disabled', 'disabled');
                CheckFolderExist(DocumentID);
            } else {

                autoscroll();

                $("#addNewDocument").animate({
                    scrollTop: $(".error").offset().top
                }, 2000);

                try {
                    $("#addNewDocument").animate({
                        scrollTop: $("#errormsg_docContract").offset().top
                    }, 2000);
                }
                catch (ex) {
                }


                $('.ui-button-green-text').parent().removeAttr('disabled');
                $("#uploaddocumentprocess").css('display', 'none');
            }
        }
    }
}

function EditnewDocument(DocumentID) {
    var formData = new FormData();
    var opmlFile = $('#docContract')[0];
    var vDocumentType = "";

    formData.append("opmlFile", opmlFile.files[0]);
    formData.append("AccountID", localStorage.AccountID);
    formData.append("DocumentID", DocumentID);
    formData.append("ContractID", getParameterByName('ContractID'));
    formData.append("Description", $("#txtDocumentDescriptionEdit").val());

    var arrAuthorEdit = $("#ddlAuthorEdit").val();
    var vAuthorEdit = '';
    $(arrAuthorEdit).each(function (i, item) {
        if (vAuthorEdit == '') {
            vAuthorEdit = item;
        }
        else {
            vAuthorEdit += "; " + item;
        }
    });
    formData.append("DocumentAuthor", vAuthorEdit);
    formData.append("DocumentLanguage", $("#txtDocumentLanguageEdit").val());
    formData.append("HardCopyPhysicalLocation", $("#txtHardCopyPhysicalLocationEdit").val());
    formData.append("ContractTitle", $("#lblCTitleDoc").text());
    formData.append("DocumentName", $("#txtDocumentName").val());
    formData.append("Counterparty", $("#lblCounterparty").text());

    if ($("#ddlDocumentType").val() != "0") {
        vDocumentType = $("#ddlDocumentType").val();
    }
    formData.append("DocumentType", vDocumentType);
    formData.append("ModifiedBy", localStorage.UserName);
    formData.append("DocumentExt", $("#spExt").html());
    formData.append("IsFolder", 'False');
    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
    var vDocLibFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "14" && n.Status == "ON");
    });
    if (vDocLibFeat.length > 0) {
        formData.append("DocumentLibraryName", $('#hdContAreaDocLibName').val());
    }
    else {
        formData.append("DocumentLibraryName", "Contract Documents");
    }
    if ($("input:radio[name=IsFinalizedEdit]:checked").val() == "Yes") {
        formData.append("IsFinalized", "Yes");
    } else {
        formData.append("IsFinalized", "No");
    }
    if ($("input:radio[name=IsStandardEdit]:checked").val() == "Yes") {
        formData.append("IsStandard", "Yes");
    } else {
        formData.append("IsStandard", "No");
    }
    if ($("input:radio[name=IsPrimaryEdit]:checked").val() == "Yes") {
        formData.append("IsPrimary", "Yes");
    } else {
        formData.append("IsPrimary", "No");
    }
    formData.append("DocumentStatus", $("#ddlDocumentStatusEdit").val());
    formData.append("ValidFrom", $.datepicker.formatDate('mm/dd/yy', $("#dtValidFromEdit").datepicker('getDate')));
    formData.append("ValidTill", $.datepicker.formatDate('mm/dd/yy', $("#dtValidTillEdit").datepicker('getDate')));
    formData.append("Reminder1", $("#txtReminder1Edit").val());
    formData.append("Reminder1Condition", $("#ddlReminder1Edit").find('option:selected').text());
    formData.append("Reminder2", $("#txtReminder2Edit").val());
    formData.append("Reminder2Condition", $("#ddlReminder2Edit").find('option:selected').text());
    formData.append("Reminder3", $("#txtReminder3Edit").val());
    formData.append("Reminder3Condition", $("#ddlReminder3Edit").find('option:selected').text());
    var arrSendReminderTo = $("#ddlDocRemindToEdit").val();
    var vSendReminderTo = '';
    $(arrSendReminderTo).each(function (i, item) {
        if (vSendReminderTo == '') {
            vSendReminderTo = item;
        }
        else {
            vSendReminderTo += "; " + item;
        }
    });
    formData.append("SendReminderTo", vSendReminderTo);
    var IsContributeUser = contractItem.Permission.indexOf('Contribute') == -1 ? 'No' : 'Yes';
    formData.append("IsContributeUser", IsContributeUser);
    $("#inprocessDocumentMetadata").css('visibility', 'visible');
    //manoj
    $('#editNewDocument').css("pointer-events", "none");
    //manoj
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?documentid=' + DocumentID,
        type: 'PUT',
        data: formData,
        cache: false,
        contentType: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName, 'RefreshToken': localStorage.RefreshToken },
        processData: false,
        success: function (document) {
            $('.ui-button-green-text').parent().removeAttr('disabled');
            $("#EditDocument").dialog("close");
            $("#ulDocument").empty();
            $("#ulDocument").html('<img src="../Content/Images/icon/loading.gif"> Please wait...');
            //manoj
            if (documentview == null || documentview == "" || documentview == 'folder') {
                GetdocumentIsStandard(vContractID);
            } else {
                DisplayDocument(documentview);
            }
            pendingStarted = false;
            GetContractPendingAction(true, "BindPeoples");
            $("#hdnFolderDocumentView").text('');
            $("#hdnShowAllTextValue").html('');
            PrvFolderselection = '';
            //Bind primary and pined document based on new feature
            if ($("#hdnnewdocumentfeature").text() == "Yes") {
                CreateDocumentListPinView(vContractID);
            }
            //manoj
            if ($("#hdIsPrimaryDoc").val() == "Yes") {
                var Finalizedcontractstatus = ["Ready for Signature", "Awaiting Signatures", "Active", "Signed", "Expired"];
                var notFinalizedcontractstatus = ["New", "Awaiting Review", "Reviewed", "In Negotiation", "Negotiation Complete"];
                if (contractItem.IsFinalized == "Yes" && (Finalizedcontractstatus.indexOf($("#ddlDocumentStatusEdit").val()) > -1)) {
                    contractItem.Status = $("#ddlDocumentStatusEdit").val();
                    ContractTopActions();
                }
                else if (contractItem.IsFinalized != "Yes" && (notFinalizedcontractstatus.indexOf($("#ddlDocumentStatusEdit").val()) > -1)) {
                    contractItem.Status = $("#ddlDocumentStatusEdit").val();
                    ContractTopActions();
                } else if (contractItem.IsFinalized != "Yes" && (Finalizedcontractstatus.indexOf($("#ddlDocumentStatusEdit").val()) > -1)) {
                    contractItem.IsFinalized = "Yes";
                    contractItem.FinalizedBy = localStorage.UserName;
                    ContractTopActions();
                }
            }
            $("#inprocessDocumentMetadata").css('visibility', 'hidden');
            //manoj
            $('#editNewDocument').css("pointer-events", "auto");
            //manoj
        },
        error: function (Message) {
            $("#inprocessDocumentMetadata").css('visibility', 'hidden');
            //manoj
            $('#editNewDocument').css("pointer-events", "auto");
            //manoj
            swal(Message.responseText);
        }
        //complete: function () {
        //    $("#inprocessDocumentMetadata").css('visibility', 'hidden');
        //}

    });
}

function newDocumentOld(DocumentID) {
    var tblContentControls = null;
    var formData = new FormData();
    var opmlFile = $('#docContract')[0];
    var vDocumentType = "";

    if (opmlFile.files.length > 0) {
        formData.append("opmlFile", opmlFile.files[0]);
    }

    if (overwritedocument) { //if overwrite is yes
        formData.append("OverWrite", "Yes");
    }

    var contractformappend = "DocumentID=" + DocumentID;
    contractformappend += "&~DocDescription=" + $("#txtDescriptionDoc").val();

    var arrAuthorCreate = $("#ddlAuthorCreate").val();

    var vAuthorCreate = '';
    $(arrAuthorCreate).each(function (i, item) {
        if (vAuthorCreate == '') {
            vAuthorCreate = item;
        }
        else {
            vAuthorCreate += "; " + item;
        }
    });
    contractformappend += "&~DocumentAuthor=" + vAuthorCreate;
    contractformappend += "&~DocumentLanguage=" + $("#txtDocumentLanguageCreate").val();
    contractformappend += "&~HardCopyPhysicalLocation=" + $("#txtHardCopyPhysicalLocationCreate").val();
    contractformappend += "&~ContractID=" + getParameterByName('ContractID');
    contractformappend += "&~ContractTitle=" + $("#lblCTitleDoc").text();

    if ($("#ddlDocumentTypeCreate").val() != "0") {
        vDocumentType = $("#ddlDocumentTypeCreate").val();
    }
    contractformappend += "&~DocumentType=" + vDocumentType;
    contractformappend += "&~Counterparty=" + $("#lblCounterparty").text();
    if ($("#trTemplate").css('display') == 'none') {
        contractformappend += "&~DocumentName=";
    }
    else {
        contractformappend += "&~TemplateName=" + $("#ddlDocumentTemplate").find('option:selected').text();
        contractformappend += "&~DocumentName=" + $("#txtDocumentNameCreate").val();
        tblContentControls = $("#formtblContentControls *").serializeArray();

        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/automation',
            type: 'POST',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
            async: false,
            data: {
                TemplateName: "",
                DocumentName: $("#txtDocumentNameCreate").val(),
                ContractID: getParameterByName('ContractID'),
                Status: "",
                SendBy: "",
                RemindLater: "",
            },
            cache: false,
            success: function (rowKey) {
                formData.append("DocumentInAutomation", rowKey);
                if (!$.isEmptyObject(arrRelatedContracts)) {
                    CreateRelatedContracttemplate();
                }
            },
            error: function (rowKey) {

            }
        });
    }
    if ($("input:radio[name=IsFinalized]:checked").val() == "Yes") {
        contractformappend += "&~IsFinalized=Yes";
    } else {
        contractformappend += "&~IsFinalized=No";
    }

    if ($("input:radio[name=IsStandard]:checked").val() == "Yes") {
        contractformappend += "&~IsStandard=Yes";
    } else {
        contractformappend += "&~IsStandard=No";
    }

    if ($("#ddlDocumentStatus").val() != "0") {
        contractformappend += "&~DocumentStatus=" + $("#ddlDocumentStatus").val();
    }
    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
    var vDocLibFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "14" && n.Status == "ON");
    });
    if (vDocLibFeat.length > 0) {
        contractformappend += "&~DocumentLibraryName=" + $('#hdContAreaDocLibName').val();
    }
    else {
        contractformappend += "&~DocumentLibraryName=Contract Documents";
    }
    var contractiledetails = $("#lblCTitleDoc").text();
    contractformappend += "&~LocationURL=" + $('#lblFolderUrl').text();
    if ($("#ddlContracts").find('option:selected').val() != "0") {
        if ($('#txtNewFolderName').val() != "") {

        }
    }
    else {
        contractformappend += "&~FolderName=";
    }
    contractformappend += "&~NewFolderName=" + $('#txtNewFolderName').val().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').replace(/[\*\|\,\"\:\<\>\[\}\{\}\'\(\)\&\#\%\.\-\!]/g, '').replace(/\//g, '').replace(/\s\s+/g, " ").trim();

    if ($("input:radio[name=rad_Copy]:checked").val() == "Library") {
        contractformappend += "&~DocumentLocation=Office 365 Document Library";
    } else {
        contractformappend += "&~DocumentLocation=Office 365 Document Library & eContracts Cloud";
    }
    contractformappend += "&~CreatedBy=" + localStorage.UserName;
    contractformappend += "&~ModifiedBy=" + localStorage.UserName;
    if (tblContentControls != null) {
        var tblContentControlslength = tblContentControls.length;
        for (var i = 0; i < tblContentControlslength; i++) {
            var checkingvar = "&~" + tblContentControls[i].name + "=";
            if (contractformappend.indexOf(checkingvar) > 0) {
                var nextvar = contractformappend.substring(contractformappend.indexOf(checkingvar) + 1, contractformappend.length);
                var valuevar = contractformappend.substring(contractformappend.indexOf(checkingvar), nextvar.indexOf("&~") + contractformappend.indexOf(checkingvar) + 1);
                contractformappend = contractformappend.replace(valuevar, "&~" + tblContentControls[i].name + "=" + tblContentControls[i].value)
                nextvar = "";
                valuevar = "";
                checkingvar = "";
            }
            else {
                contractformappend += "&~" + tblContentControls[i].name + "=" + tblContentControls[i].value;
            }
        }
    }
    var result = "";
    $("#formtblContentControls .fieldphonecontrol").each(function (index) {
        if ($(this).val() != null && $(this).val() != "") {
            var name = $(this)[0].id;
            var value = $(this).intlTelInput("getSelectedCountryData").iso2 + "," + $(this).intlTelInput("getSelectedCountryData").dialCode + "," + $(this).intlTelInput("getNumber", intlTelInputUtils.numberFormat.INTERNATIONAL);
            result = result + "&~" + name + "=" + value;
        }
        else {
            var name = $(this)[0].id;
            var value = "";
            result = result + "&~" + name + "=" + value;
        }
    });
    contractformappend += result;

    formData.append("AccountID", localStorage.AccountID);
    var splitcontractformappend = contractformappend.split('&~');

    $(splitcontractformappend).each(function (i, item) {
        var splititem = item.split('=');
        formData.append(splititem[0].trim(), splititem[1]);
    });
    splitcontractformappend = [];
    contractformappend = '';
    if ($("#txtBusinessArea").val() != "") {
        formData.append("BusinessArea", $("#txtBusinessArea").val().trim());
    } else {
        formData.append("BusinessArea", $("#lblBusinessArea").text().trim());
    }
    formData.append("BusinessAreaPath", $("#lblBusinessAreaPath").text());
    formData.append("ContractArea", $("#lblContractArea").text().trim());
    formData.append("ContractAreaAdministrators", $("#lblContractAreaAdmins").text().trim());
    formData.append("BusinessAreaOwners", $("#lblBusinessAreaOwners").text().trim());

    formData.append("ValidFrom", $.datepicker.formatDate('mm/dd/yy', $("#dtValidFrom").datepicker('getDate')));
    formData.append("ValidTill", $.datepicker.formatDate('mm/dd/yy', $("#dtValidTill").datepicker('getDate')));
    formData.append("Reminder1", $("#txtReminder1New").val());
    formData.append("Reminder1Condition", $("#ddlReminder1New").find('option:selected').text());
    formData.append("Reminder2", $("#txtReminder2New").val());
    formData.append("Reminder2Condition", $("#ddlReminder2New").find('option:selected').text());
    formData.append("Reminder3", $("#txtReminder3New").val());
    formData.append("Reminder3Condition", $("#ddlReminder3New").find('option:selected').text());
    formData.append("CreatingFromContractForm", "No");

    var arrSendReminderTo = $("#ddlDocRemindTo").val();

    var vSendReminderTo = '';
    $(arrSendReminderTo).each(function (i, item) {
        if (vSendReminderTo == '') {
            vSendReminderTo = item;
        }
        else {
            vSendReminderTo += "; " + item;
        }
    });
    formData.append("SendReminderTo", vSendReminderTo);
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents',
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName, 'RefreshToken': localStorage.RefreshToken },
        processData: false,
        success: function (data) {
            //if ($("#ddlDocumentTemplate").attr("class").indexOf('validelement') >= 0) {

            //    setTimeout(funcMessageAfterDocGeneration, 10000);
            //}
            //else {
            $("#uploaddocumentprocess").css('display', 'none');
            $('.ui-button-green-text').parent().removeAttr('disabled');

            $("#ulDocument").empty();
            $("#ulDocument").html('<img src="../Content/Images/icon/loading.gif"> Please wait...');
            //manoj
            if (documentview == null || documentview == "" || documentview == 'folder') {
                GetdocumentIsStandard(vContractID);
            } else {
                DisplayDocument(documentview);
            }
            pendingStarted = false;
            // GetContractPendingAction(true, "BindPeoples");
            $("#hdnFolderDocumentView").text('');
            $("#hdnShowAllTextValue").html('');
            PrvFolderselection = '';
            //Bind primary and pined document based on new feature
            if ($("#hdnnewdocumentfeature").text() == "Yes") {
                CreateDocumentListPinView(vContractID);
            }
            //manoj                
            //}

            afterPost();
        },
        error: function (data) {

        }
    });
}

function funcMessageAfterDocGeneration() {
    $("#uploaddocumentprocess").css('display', 'none');
    $('.ui-button-green-text').parent().removeAttr('disabled');
    //manoj
    if (documentview == null || documentview == "" || documentview == 'folder') {
        if ($('#showAll').text() != null && $('#showAll').text() != "" && typeof ($('#showAll').text()) != "undefined") {
            var selectedfoldervalue = $('#showAll').find("a");
            var textvalueselected = $(selectedfoldervalue)[$(selectedfoldervalue).length - 1].textContent;
            var idvalueselected = $(selectedfoldervalue)[$(selectedfoldervalue).length - 1].id;
            var parentdocumentdetails = { id: idvalueselected, text: textvalueselected };
            showfolderdocuments(parentdocumentdetails);
        }
        else {
            BindDocument(vContractID);
        }
    } else {
        DisplayDocument(documentview);
    }
    pendingStarted = false;
    GetContractPendingAction(true, "BindPeoples");
    $("#hdnFolderDocumentView").text('');
    $("#hdnShowAllTextValue").html('');
    PrvFolderselection = '';
    //Bind primary and pined document based on new feature
    if ($("#hdnnewdocumentfeature").text() == "Yes") {
        CreateDocumentListPinView(vContractID);
    }
    //manoj
}

function afterPost() {
    $('.ui-button-green-text').parent().removeAttr('disabled');
    $("#addEditDocument").dialog("close");
    $("#ddlDocumentTypeCreate").val("0");
    //$("#ddlDocumentTypeCreate").find('option[value="Primary Agreement"]').prop("selected", true);
    $("#ddlDocumentTemplate").val("0");
    $("#txtDocumentNameCreate").val("");
    if ($('#txtNewFolderName').val() != "") {
        if ($("input:radio[name=IsFinalized]:checked").val() == "Yes") {
            $("#hdnFinalizedDocumentsUrl").text($('#lblFolderUrl').text() + $('#txtNewFolderName').val().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').replace(/[\*\|\,\"\:\<\>\[\}\{\}\'\(\)\&\#\%\.\-\!]/g, '').replace(/\//g, '').replace(/\s\s+/g, " ").trim());
        } else {
            $("#hdnDraftDocumentsUrl").text($('#lblFolderUrl').text() + $('#txtNewFolderName').val().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').replace(/[\*\|\,\"\:\<\>\[\}\{\}\'\(\)\&\#\%\.\-\!]/g, '').replace(/\//g, '').replace(/\s\s+/g, " ").trim());
        }
        var checkingtest = $('#lblFolderUrl').text();
        var spiltcheckingtest = checkingtest.split('/');
        if (spiltcheckingtest.length < 4) {
            $("#hdnContractDocumentsUrl").text(checkingtest + $('#txtNewFolderName').val().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').replace(/[\*\|\,\"\:\<\>\[\}\{\}\'\(\)\&\#\%\.\-\!]/g, '').replace(/\//g, '').replace(/\s\s+/g, " ").trim() + "/");
            $("#hdnContractDocumentsUrlFixed").text($("#hdnContractDocumentsUrl").text());
        }
    }
    $('#txtFolderName').val("");
    $('#txtNewFolderName').val("");
    $('#dtValidFrom').val("");
    $('#dtValidTill').val("");
    $('#txtReminder1New').val("");
    $('#txtReminder2New').val("");
    $('#txtReminder3New').val("");
    $("#ddlReminder1New").find('option[value="before"]').prop("selected", true);
    $("#ddlReminder2New").find('option[value="before"]').prop("selected", true);
    $("#ddlReminder3New").find('option[value="before"]').prop("selected", true);
   
  
}


function CheckDocumentExistwithoutparameter() {
    var DuplicateDocumentID = false;
    var vDocURL = "";
    var folderurltobind = "";

    if ($('#lblFolderUrl').text().slice(-1) != "/") {
        folderurltobind = $('#lblFolderUrl').text() + "/";
    } else {
        folderurltobind = $('#lblFolderUrl').text();
    }
    if ($("#ddlDocumentTemplate").is(":visible")) {
        if ($("#txtNewFolderName").val() != "") {
            var newfolderadd = encodeURIComponent($("#txtNewFolderName").val().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').replace(/[\*\|\,\"\:\<\>\[\}\{\}\'\(\)\&\#\%\.\!]/g, '').replace(/\//g, '').replace(/\s\s+/g, " ").trim());
            if (newfolderadd.trim() != "") {

                vDocURL = localStorage.SPHostUrl + folderurltobind + newfolderadd.trim() + "/" + encodeURIComponent($('#txtDocumentNameCreate').val()) + ".docx";
            } else {
                vDocURL = localStorage.SPHostUrl + folderurltobind + encodeURIComponent($('#txtDocumentNameCreate').val()) + ".docx";
            }
        }
        else {
            vDocURL = localStorage.SPHostUrl + folderurltobind + encodeURIComponent($('#txtDocumentNameCreate').val()) + ".docx";
        }
    }
    else {
        //manoj
        var DocumentName = $('#docContract')[0].files[0].name;
        if (document.getElementById("fileUploadOCR").style.display != "none") {
            if ($("#fileUploadOCR").is(':checked')) {
                DocumentName = $('#docContract')[0].files[0].name.split('.').slice(0, -1).join(".") + ".pdf";
            }
        }
        //manoj
        if ($("#txtNewFolderName").val() != "") {
            var newfolderadd = encodeURIComponent($("#txtNewFolderName").val().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').replace(/[\*\|\,\"\:\<\>\[\}\{\}\'\(\)\&\#\%\.\!]/g, '').replace(/\//g, '').replace(/\s\s+/g, " ").trim());
            if (newfolderadd.trim() != "") {
                vDocURL = localStorage.SPHostUrl + folderurltobind + newfolderadd.trim() + "/" + encodeURIComponent(DocumentName);
            } else {
                vDocURL = localStorage.SPHostUrl + folderurltobind + encodeURIComponent(DocumentName);
            }
        }
        else {
            vDocURL = localStorage.SPHostUrl + folderurltobind + encodeURIComponent(DocumentName);
        }
    }
    folderurltobind = "";
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?contractid=' + getParameterByName("ContractID") + '&docurl=' + vDocURL,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        async: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (folder) {
            if (folder != null) {
                DuplicateDocumentID = folder.RowKey;
            } else {
                DuplicateDocumentID = "False";
            }
        },
        error:
            function (data) {
                DuplicateDocumentID = "False";
            }
    });
    return DuplicateDocumentID;
}

$('#btnSelectFolder').click(function () {
    $("#treeviewFolder").dialog("option", "title", "Select Folder");
    $("#treeviewFolder").dialog("open");
});

function selectfolder() {
    //manoj
    //$("#loadingPage").fadeIn();
    //var ExistingDocument=[];
    var $tree = $('#treeviewFolderOption');
    var nodeselected = $tree.tree('getSelectedNode');
    var nodeselectedname = "";
    if (typeof (nodeselected) != "undefined" && nodeselected != null) {
        var selectednodeid = nodeselected.id;
        nodeselectedname = (nodeselected.name != null && nodeselected.name != "") ? nodeselected.name.split('/').pop() : nodeselected.name;
        var fixedvaluetopass = $("#hdnContractDocumentsUrlFixed").text();
        fixedvaluetopass = ((fixedvaluetopass.substr(fixedvaluetopass.length - 1)) != "/") ? fixedvaluetopass : fixedvaluetopass.substr(0, fixedvaluetopass.length - 1);
        var splturl = (selectednodeid.indexOf(fixedvaluetopass) > -1) ? selectednodeid.split(fixedvaluetopass).pop() : selectednodeid;
        var fixedurl = $("#hdnContractDocumentsUrlFixed").text();
        fixedurl = (fixedurl.charAt(0) != '/') ? '/' + fixedurl : fixedurl;
        fixedurl = ((fixedurl.substr(fixedurl.length - 1)) != "/") ? fixedurl + "/" : fixedurl;
        //finalurl = ($('#hdContAreaDocLibName').val() != null && $('#hdContAreaDocLibName').val() != "") ? $('#hdContAreaDocLibName').val() : '/Contract Documents/';
        if (splturl != "") {

            splturl = (splturl.charAt(0) == '/') ? splturl.substr(1) : splturl;
            splturl = ((splturl.substr(splturl.length - 1)) != "/") ? splturl + "/" : splturl;
        }
        splturl = fixedurl + splturl;

        //manoj
        if (ManageFolderAction == "Bulk") {
            var arrShowallTesxt = $.map(splturl.split('/'), $.trim);
            arrShowallTesxt = arrShowallTesxt.filter(function (vFolder) { return vFolder !== '' });
            arrShowallTesxt = arrShowallTesxt.slice(1);
            var fldratrical = '';
            if (arrShowallTesxt.length == 0) {

            }
            else if (arrShowallTesxt.length == 1) {
                fldratrical = '<img src="../Content/Images/icon/folder_open.png" style="margin-right: 5px;"><span>' + arrShowallTesxt.toString() + '</span>';
            } else {
                for (var fldr = 0; fldr < arrShowallTesxt.length; fldr++) {
                    if (arrShowallTesxt.length - 1 == fldr) {
                        fldratrical += '/<img src="../Content/Images/icon/folder_open.png" style="margin-right: 5px;"><span>' + arrShowallTesxt[fldr].toString() + '</a>';
                    } else {
                        fldratrical += '/<img src="../Content/Images/icon/folder.png" style="margin-right: 5px;"><span>' + arrShowallTesxt[fldr].toString() + '</a>';
                    }
                }
            }
            if (fldratrical != "" && fldratrical.charAt(0) == '/') {
                fldratrical = fldratrical.substr(1);
            }
            $("#dvDocFolderURL").html(fldratrical);
            $("#spnDocFolderURL").text(splturl);
            ChnageFolderExistDoc();
        } else if (ManageFolderAction == "New") {
            var arrShowallTesxt = $.map(splturl.split('/'), $.trim);
            arrShowallTesxt = arrShowallTesxt.filter(function (vFolder) { return vFolder !== '' });
            arrShowallTesxt = arrShowallTesxt.slice(1);
            var fldratrical = '';
            if (arrShowallTesxt.length == 0) {

            }
            else if (arrShowallTesxt.length == 1) {
                fldratrical = '<img src="../Content/Images/icon/folder_open.png" style="margin-right: 5px;"><span>' + arrShowallTesxt.toString() + '</span>';
            } else {
                for (var fldr = 0; fldr < arrShowallTesxt.length; fldr++) {
                    if (arrShowallTesxt.length - 1 == fldr) {
                        fldratrical += '/<img src="../Content/Images/icon/folder_open.png" style="margin-right: 5px;"><span>' + arrShowallTesxt[fldr].toString() + '</a>';
                    } else {
                        fldratrical += '/<img src="../Content/Images/icon/folder.png" style="margin-right: 5px;"><span>' + arrShowallTesxt[fldr].toString() + '</a>';
                    }
                }
            }
            if (fldratrical != "" && fldratrical.charAt(0) == '/') {
                fldratrical = fldratrical.substr(1);
            }
            $("#dvDocFolderURL_New").html(fldratrical);
            $("#spnDocFolderURL_New").text(splturl);
            ChnageFolderExistDoc_New();
        }
        else {
            $('#lblFolderUrl').text(splturl);
        }
        //manoj
        $("#treeviewFolder").dialog("close");
    } else {
        swal("", "Please select any folder.");
        $("#loadingPage").fadeOut();
    }
}
function selectfoldertomove() {
    $("#loadingPage").fadeIn();
    var ExistingDocument = [];
    var $tree = $('#treeviewFolderMoveOption');
    var nodeselected = $tree.tree('getSelectedNode');
    var nodeselectedname = "";
    if (nodeselected.id != null && nodeselected.id != "" && typeof (nodeselected.id) != "undefined") {
        var selectednodeid = nodeselected.id;
        nodeselectedname = (nodeselected.name != null && nodeselected.name != "") ? nodeselected.name.split('/').pop() : nodeselected.name;
        var fixedvaluetopass = $("#hdnContractDocumentsUrlFixed").text();
        fixedvaluetopass = ((fixedvaluetopass.substr(fixedvaluetopass.length - 1)) != "/") ? fixedvaluetopass : fixedvaluetopass.substr(0, fixedvaluetopass.length - 1);
        var splturl = (selectednodeid.indexOf(fixedvaluetopass) > -1) ? selectednodeid.split(fixedvaluetopass).pop() : selectednodeid;
        var fixedurl = $("#hdnContractDocumentsUrlFixed").text();
        fixedurl = (fixedurl.charAt(0) != '/') ? '/' + fixedurl : fixedurl;
        fixedurl = ((fixedurl.substr(fixedurl.length - 1)) != "/") ? fixedurl + "/" : fixedurl;
        //finalurl = ($('#hdContAreaDocLibName').val() != null && $('#hdContAreaDocLibName').val() != "") ? $('#hdContAreaDocLibName').val() : '/Contract Documents/';
        splturl = (splturl.charAt(0) == '/') ? splturl.substr(1) : splturl;
        splturl = ((splturl.substr(splturl.length - 1)) != "/") ? splturl + "/" : splturl;
        splturl = fixedurl + splturl;
        var DocumentSelectedName = [];
        $('input[type=checkbox][name="MultipleDocuments"]:checked').each(function () {
            var DocumentID = this.id;
            var isChecked = this.checked;
            var DocumentName = $(this).parent("li").find("#DocumentName").text();
            var ReviewWorkflow = $(this).parent("li").find("#ReviewWorkflow").text();

            if (isChecked) {
                if (DocumentSelectedName.indexOf(DocumentName) == -1 && DocumentName != null && DocumentName != "") {
                    if ($("#hdntreeviewFolderMove").val() == 'move') {
                        DocumentSelectedName.push(DocumentName);
                    }
                    else {
                        var FinalDocumetName = DocumentName.substr(0, DocumentName.lastIndexOf("."));
                        FinalDocumetName += "_Copy." + DocumentName.split('.').pop();
                        //if ($("#hdntreeviewFolderMove").val() == 'move') {
                        DocumentSelectedName.push(FinalDocumetName);
                        //}
                        //alert(URL.substring(0, URL.lastIndexOf("/") + 1));
                    }
                }
            }
        });
        //manoj
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?contractid=' + getParameterByName("ContractID") + '&foldeurl=' + splturl,
            type: 'GET',
            dataType: 'json',
            'Content-Type': 'application/json',
            cache: false,
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            success: function (data) {
                if (data != null) {
                    $(data).each(function (i, itemdocument) {
                        if (itemdocument.DocumentName != null && itemdocument.DocumentName != "") {
                            if (DocumentSelectedName.indexOf(itemdocument.DocumentName) > -1) {
                                ExistingDocument.push(itemdocument.DocumentName);
                            }
                        }
                    });
                    if (ExistingDocument.length == 0) {
                        FileToMove(selectednodeid);
                    } else {
                        var ExitstFinalDocumentList = "";
                        $(ExistingDocument).each(function (i, itemexdoc) {
                            if (ExitstFinalDocumentList == '') {
                                ExitstFinalDocumentList = itemexdoc
                            }
                            else {
                                ExitstFinalDocumentList += "," + itemexdoc;
                            }
                        });
                        var nlast = ExitstFinalDocumentList.lastIndexOf(",");
                        if (nlast > -1) {
                            ExitstFinalDocumentList = ExitstFinalDocumentList.substr(0, nlast) + ' and ' + ExitstFinalDocumentList.substr(nlast + 1);
                        }
                        if (ExitstFinalDocumentList != "") {
                            swal("", '<span style=\"font-weight:700\">' + ExitstFinalDocumentList + "</span> files already exist in '<span style=\"font-weight:700\">" + nodeselectedname + "</span>'");
                            $("#loadingPage").fadeOut();
                        }
                    }
                } else {
                    FileToMove(selectednodeid);
                }

            },
            error:
                function (data) {
                    FileToMove(selectednodeid);
                }
        });
    }
    else {
        swal("", "Please select any folder.");
        $("#loadingPage").fadeOut();
    }
}
function treeviewFolder_Create(parentFolderName) {
    $("#loadingPage").fadeIn();
    $('#tbodytreeviewFolder').empty();
    var spiltdsf = parentFolderName.split("/");
    /* Document treeview Popup Start */
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/treeview?documentname=' + spiltdsf[1],
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            recursiveIterationDocuments(data)
            $("#tbodytreeviewFolder").append(articleDocuments);
            if (articleDocuments == "") {
                $("#tbodytreeviewFolder").append("<tr><td><p class='f_p-error'>No Folder Structure Found.</p></td></tr>");
            }
            articleDocuments = "";
            $("#example-basic-treeviewFolder").treetable({ expandable: true, initialState: "expanded" });
            $("#loadingPage").fadeOut();
            $("#browse_treeviewFolder").dialog("option", "title", "Select Folder");
            $("#browse_treeviewFolder").dialog("open");
        },
        error:
        function (data) {
            if (articleDocuments == "") {
                $("#tbodytreeviewFolder").html("<tr><td><p class='f_p-error'>No Folder Structure Found.</p></td></tr>");
                $("#loadingPage").fadeOut();
                $("#browse_treeviewFolder").dialog("option", "title", "Select Folder");
                $("#browse_treeviewFolder").dialog("open");
            }
        }
    });
    /* Document treeview Popup End */
}
function recursiveIterationDocuments(object) {
    for (var i = 0; i < object.length; i++) {
        var item = object[i];
        var additional = "";
        additional = '<span style="color:#3487ce; cursor:pointer;" onclick="javascript:folderselected(this,\'' + item.DocumentName + '\')">' + item.DocumentName + '</span>'
        if (item.ChildrenData.length == 0) {
            articleDocuments += '<tr data-tt-id="tre-' + item.RowKey + '" class="branch expanded">';
            articleDocuments += '<td class="treeHead"><span id="ParentFolderID" style="display:none;">' + item.ParentFolderID + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/folder.png" /><small>' + additional + '</small></td></tr>';
        } else {
            articleDocuments += '<tr data-tt-id="tre-' + item.RowKey + '" data-tt-parent-id="tre-' + item.ParentFolderID + '" class="branch collapsed" style="display: table-row;">';
            articleDocuments += '<td><span id="ParentFolderID" style="display:none;">' + item.ParentFolderID + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/folder.png" /><small>' + additional + '</small></td></tr>';
            if (item.ChildrenData.length != 0) {
                for (var j = 0; j < item.ChildrenData.length; j++) {
                    var itemchild = item.ChildrenData[j];
                    additional = '<span style="color:#3487ce; cursor:pointer;" onclick="javascript:folderselected(this,\'' + item.DocumentName + "/" + itemchild.DocumentName + '\')">' + itemchild.DocumentName + '</span>'
                    articleDocuments += '<tr data-tt-id="tre-' + itemchild.RowKey + '" data-tt-parent-id="tre-' + itemchild.ParentFolderID + '" class="branch collapsed" style="display: table-row;">';
                    articleDocuments += '<td><span id="ParentFolderID" style="display:none;">' + itemchild.ParentFolderID + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/folder.png" class="padding_left_65px" /><small>' + additional + '</small></td></tr>';
                }
            }
        }
    }
}

//manoj
function CreateFolder(parentFolderName) {
    $("#browseFolder").html('<img src="../Content/Images/icon/loading.gif"> Working on it...');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/folderstructurejqtree?documentlibrary=' + parentFolderName,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (folder) {
            try {
                $("#btnaddsubfolder").css("display", "");
                $("#browseFolder").html('<div id="treeviewFolderOption" class="demo-section"></div><input id="txtFolder" type="hidden" /><input id="txtFolderURL" type="hidden" />');
                $('#treeviewFolderOption').empty();
                $('#treeviewFolderOption').tree({
                    data: folder,
                    autoOpen: 0
                });
            } catch (ex) {
                //alert(ex);
            }
        },
        error:
            function (data) {
                //$("#btnaddsubfolder").css("display", "none");
                $("#browseFolder").html('No items found.');
            }
    });
}

//For Manage Folder
function MangeContractFolder(parentFolderName) {
    $("#dvManageFolder").html('<img src="../Content/Images/icon/loading.gif"> Working on it...');
    //manoj
    $("#browseFolder").html('<img src="../Content/Images/icon/loading.gif"> Working on it...');
    $("#browseFolderMove").html('<img src="../Content/Images/icon/loading.gif"> Working on it...');
    //manoj
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/folderstructurejqtree?documentlibrary=' + parentFolderName,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (folder) {
            try {
                $("#btnManagesubfolder").css("display", "");
                $("#dvManageFolder").html('<div id="treeviewManageFolderOption" class="demo-section"></div><input id="txtManageFolder" type="hidden" /><input id="txtManageFolderURL" type="hidden" />');
                $('#treeviewManageFolderOption').empty();
                $('#treeviewManageFolderOption').tree({
                    data: folder,
                    autoOpen: 0
                });
            } catch (ex) {
                //alert(ex);
            }
        },
        error:
            function (data) {
                $("#btnManagesubfolder").css("display", "none");
                //$("#btnaddsubfolder").css("display", "none");
                $("#dvManageFolder").html('No items found.');
            }
    });
}
//For Manage Folder
//manoj

// Document Related Methods 
function BindDocument1(contractid) {
    multipleChecksDocumentID = '';
    multipleChecksDocumentName = '';
    articleDocumentMileStone = '';
    $("#documentMultiActions").css('display', 'none');
    if (contractid == null || contractid == "") { contractid = vContractID; }
    var vGetTime = moment(new Date()).utc();
    //var vGetTime = new Date();
    //$.ajax({
    //    url: '/Documents/GetTime',
    //    type: 'GET',
    //    dataType: 'json',
    //    cache: false,
    //    success: function (data) {
    //        var jsObject = JSON.parse(data);
    //        vGetTime = new Date(jsObject);
    //    }
    //});
    var vFinalSignature = "dropdownMenuFinal";
    var vMarkFinalSignature = "dropdownMenuMarkFinal";
    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
    var vAccFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "1" && n.Status == "ON");
    });
    if (vAccFeat.length > 0) {
        vFinalSignature = "dropdownMenuFinalSignature";
        vMarkFinalSignature = "dropdownMenuMarkFinalSignature";
        $("#dropdownMenuAmendment .signature").show();
        $("#dropdownMenuAmendmentFinal .signature").show();
    }
    else {
        $("#dropdownMenuAmendment .signature").hide();
        $("#dropdownMenuAmendmentFinal .signature").hide();
    }

    $("#ulDocument").empty();
    $("#alertsListUpcomingDocument").empty();
    $("#ddlDocumentList").empty();
    $("#dvDocument").empty();
    DocumentCount = 0;
    $("#ulDocument").html('<img src="../Content/Images/icon/loading.gif"> Please wait...');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?contractid=' + contractid,
        type: 'GET',
        cache: false,
        contentType: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            var count = 0;
            var vPermission = $("#hdnPermission").val();

            var settings = {
                pattern: /\.[0-9a-z]+$/i,
                knownFileTypes: ['pdf', 'png', 'jpg', 'gif', 'bmp', 'doc', 'xls', 'ppt', 'docx', 'xlsx', 'txt', 'pptx', 'zip', 'rar', 'gzip', 'arj', 'wav', 'mp3', 'aif', 'aiff', 'm4a', 'ogg', 'wma', 'psd', 'ai', 'swf', 'fla', 'css', 'js', 'avi', 'mov', 'wmv', 'dotx'],
                WopiFrameFileTypes: ['doc', 'xls', 'ppt', 'docx', 'xlsx', 'pptx', 'dotx']
            };
            var datalenght = data.length;
            //clause
            $("#ddlTemplateAndClauses").empty();
            $("#ddlTemplateAndClauses").append('<option value="0">--Select--</option>');
            $("#docversion").css("display", "none");
            $("#ulTermsClauseBody").html("<li Style='margin-top: 10px;'>Select available document.<li>");
            $("#ulDocument").empty();
            var vTitle = '';
            var article = '';
            if (datalenght > 0) {
                var vdocitem = data[0];
                docdefaultview(vdocitem.ContractArea);
            }
            var DocDefaultView = ""
            if (thisDocumentLibrarySettings != '' && thisDocumentLibrarySettings != 'undefined' && typeof thisDocumentLibrarySettings != "undefined") {
                DocDefaultView = thisDocumentLibrarySettings.DocDefaultView;
            }
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];
                count++
                var vClass = "openmenuDocumentFinal";
                var vv = moment(new Date(item.Modified));
                var vTime = vv.fromNow();
                vTime = vv.from(vGetTime);
                var vDocIcon = '<img src="../Content/Images/Doc_draft.png" class="doc_type margin-left-5" alt="Draft Document" title="Draft Document" />';
                var vPrimDocIcon = '';
                if (item.IsFinalized == "Yes") {
                    vClass = "openmenuDocument";
                    vDocIcon = '<img src="../Content/Images/icon/final_doc.png" class="doc_type margin-left-5" alt="Finalized Document" title="Finalized Document" />';
                    if (item.CreationMode == "Amendment") {
                        vClass = "openmenuAmendmentDocumentFinal";
                        vDocIcon += '<img src="../Content/Images/amendments.png" style="height:16px; width:16px;" class="doc_type margin-left-5" alt="Amendment Document" title="Amendment Document" />';
                    }
                } else if (item.CreationMode == "Amendment") {
                    vClass = "openmenuAmendmentDocument";
                    vDocIcon = '<img src="../Content/Images/amendments.png" style="height:16px; width:16px;" class="doc_type margin-left-5" alt="Amendment Document" title="Amendment Document" />';
                }
                if (item.IsPrimary == "Yes") {
                    vPrimDocIcon = '<img src="../Content/Images/primary_doc.png" class="doc_type margin-left-5" alt="Primary Document" title="Primary Document" />';
                }
                vURLDoc = encodeURI(item.DocumentUrl);
                var ext = vURLDoc.match(settings.pattern);
                var vFileType = '<dd class="file-icon none"></dd>';
                if (ext != null) {
                    if (ext.length > 0) { ext = ext[0].slice(1); }
                    if (vURLDoc.toLowerCase().indexOf(localStorage.SPHostUrl.toLowerCase()) >= 0) {
                        if (jQuery.inArray(ext, settings.WopiFrameFileTypes) > -1) {
                            vRawURLDoc = encodeURIComponent(item.DocumentUrl);
                            vURLDoc = localStorage.SPHostUrl + "/_layouts/WopiFrame.aspx?sourcedoc=" + vRawURLDoc + "&action=default";
                        } else {
                            vRawURLDoc = "";
                        }
                    }

                    if (jQuery.inArray(ext.toLowerCase(), settings.knownFileTypes) > -1) {
                        vFileType = '<dd class="file-icon ' + ext + '"></dd>';
                    }
                }

                if (count <= 5)
                    article += '<li class=" margin-bottom-5" active=' + item.IsActive + '>';
                else
                    article += '<li class="ShowMoreDocuments margin-bottom-5" style="display:none;">';

                article += '<label id="DocumentID" style="display:none;">' + item.RowKey + '</label>';
                article += '<label id="SentForSign" style="display:none;">' + item.SentForSign + '</label>';
                article += '<label id="DocumentName" style="display:none;">' + item.DocumentName + '</label>';
                article += '<label id="ShareWorkflow" style="display:none;">' + item.ShareWorkflow + '</label>';
                article += '<label id="ReviewWorkflow" style="display:none;">' + item.ReviewWorkflow + '</label>';
                article += '<label id="BusinessArea" style="display:none;">' + item.BusinessArea + '</label>';
                article += '<label id="IsFinalized" style="display:none;">' + item.IsFinalized + '</label>';
                var primarydocchecking = (item.IsPrimary != null && item.IsPrimary != "") ? item.IsPrimary : "No";
                article += '<label id="IsPrimaryDoc" style="display:none;">' + primarydocchecking + '</label>';

                if (item.CreationMode == "Amendment") {
                    article += '<label id="AmendmentID" style="display:none;">' + item.AmendmentID + '</label>';
                }
                article += '<input type="checkbox" id="' + item.RowKey + '" name="MultipleDocuments" class="Contribute" onclick="checkMultipleDocuments(this);" value=' + item.RowKey + ' /> ';

                switch (item.DocumentStatus) {
                    case "New":
                        article += '<b title="New" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_green_another details_documentstatus"><img src="../Content/Images/status/new.png" class="margin-right-5">new</b>';
                        break;
                    case "Ready for Signature":
                        article += '<b title="Ready for Signature" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_green details_documentstatus"><img src="../Content/Images/status/active.png" class="margin-right-5">sign</b>';
                        break;
                    case "Awaiting Signatures":
                        article += '<b title="Awaiting Signatures" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_yellow details_documentstatus"><img src="../Content/Images/status/renew.png" class="margin-right-5">sign</b>';
                        break;
                    case "Active":
                        article += '<b title="Active" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_green details_documentstatus"><img src="../Content/Images/status/active.png" class="margin-right-5">actv</b>';
                        break;
                    case "Signed":
                        article += '<b title="Signed" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_blue details_documentstatus"><img src="../Content/Images/status/tick.png" class="margin-right-5">Sign</b>';
                        break;
                    case "Expired":
                        article += '<b title="Expired" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_Gray details_documentstatus"><img src="../Content/Images/status/expried.png" class="margin-right-5">exp</b>';
                        break;
                    case "Awaiting Review":
                        article += '<b title="Awaiting Review" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_yellow details_documentstatus"><img src="../Content/Images/status/renew.png" class="margin-right-5">Rev</b>';
                        break;
                    case "Reviewed":
                        article += '<b title="Reviewed" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_blue details_documentstatus"><img src="../Content/Images/status/tick.png" class="margin-right-5">Rev</b>';
                        break;
                    case "In Negotiation":
                        article += '<b title="In Negotiation" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_yellow details_documentstatus"><img src="../Content/Images/status/renew.png" class="margin-right-5">nego</b>';
                        break;
                    case "Negotiation Complete":
                        article += '<b title="Negotiation Complete" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_blue details_documentstatus"><img src="../Content/Images/status/tick.png" class="margin-right-5">nego</b>';
                        break;
                }

                vTitle = item.DocumentName;
                if (vTitle.length > 61)
                { vTitle = vTitle.substring(0, 60) + '...'; }

                if (vRawURLDoc != "") {
                    if (DocDefaultView == "WordClient") {
                        article += vFileType + '<a href="javascript:void(0);" onclick="viewdocinword(\'' + vRawURLDoc + '\')" title="' + item.DocumentName + '">' + vTitle + '</a>';
                    } else {
                        article += vFileType + '<a href="' + vURLDoc + '" target="_blank" title="' + item.DocumentName + '">' + vTitle + '</a>';
                    }
                } else {
                    article += vFileType + '<a href="' + vURLDoc + '" target="_blank" title="' + item.DocumentName + '">' + vTitle + '</a>';
                }

                if (vTime == "Invalid date") {
                    article += '<span class="sub-text"> few seconds ago</span>';
                }
                else {
                    article += '<span class="sub-text"> ' + vTime + '</span>';
                }
                article += '';
                article += '';
                article += vPrimDocIcon + vDocIcon + '&nbsp;<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="' + vClass + ' margin-left-5" onclick="FilterMenuOptions(this)"/>';
                if (item.IsMetadataMismatch == "Yes" && item.ActualDocID == '' && ext.toLowerCase() != 'pdf') {
                    article += '<a href="javascript:void(0);" data="' + item.ContractAndDocumentMetadata + '" onclick="javascript: openmismatched(this)"><img src="../Content/Images/icon/mismatch_icon.png"  style="cursor:pointer;" title="Mismatched Document and Contract Record Metadata." class="margin-left-5" /></a>';
                }
                article += '</li>';
                DocumentCount++;

                articleDocMiletstone = BindDocumentMilestones(item);
                var doclist = '<option value="' + item.RowKey + '">' + item.DocumentName + '</option>';
                $("#ddlDocumentList").append(doclist);
                articleDocumentMileStone += articleDocMiletstone;
                //BindDocumentAlert(item);
                //Clause
                $("#ddlTemplateAndClauses").append('<option value="' + item.RowKey + '">' + item.DocumentName + '</option>');
            }
            $("#ulDocument").html(article);
            if (count > 5) {
                var more = count - 5;
                $("#dvDocument").html('<a id="ShowMoreDocuments" href="javascript:void(0);" class="pad-all close1" onclick="ShowMoreDocuments()">' + more + ' More Document(s) </a>' +
                                        '<a id="ShowLessDocuments" href="javascript:void(0);" class="pad-all close1" onclick="ShowLessDocuments()" style="display:none;">Show less</a>');
            }

            $("#lblDocumentsCount").text(count);

            if (!$("#lblDocumentsCount").text().trim()) {
                $("#ulDocument").empty();
                $("#ulDocument").append('No items found.');
            }
            $(".openmenuDocument").contextMenu({ menu: vFinalSignature, leftButton: true }, function (action, el, pos) { contextMenuDocument(action, el.parent("li"), pos); });
            $(".openmenuDocumentFinal").contextMenu({ menu: vMarkFinalSignature, leftButton: true }, function (action, el, pos) { contextMenuDocument(action, el.parent("li"), pos); });
            $(".openmenuAmendmentDocument").contextMenu({ menu: "dropdownMenuAmendment", leftButton: true }, function (action, el, pos) { contextMenuAmendmentDocument(action, el.parent("li"), pos); });
            $(".openmenuAmendmentDocumentFinal").contextMenu({ menu: "dropdownMenuAmendmentFinal", leftButton: true }, function (action, el, pos) {
                contextMenuAmendmentDocument(action, el.parent("li"), pos);
            });
            $("#contractLogs").empty();
        },
        error: function (request) {
            $("#ulDocument").empty();
            $("#lblDocumentsCount").text('0');
            $("#ulDocumentLoading").css('display', 'none');
            $("#ulDocument").append('No items found.');
            $("#ddlTemplateAndClauses").append('<option value="-1">No Document Available</option>');
        },
        complete: function () {
            BindSystemMilestoneTest(articleSystemMileStone, articleDocumentMileStone, articleMileStone, articleObligationMileStone);
        }
    });
}

function BindDocumentAlert(item) {
    if (item.ValidTill != null) {
        var sRowKey = item.RowKey;
        var sAlertTitle = item.DocumentName;
        var sPriority = "";

        var curDate = moment(new Date());
        var vDate = item.ValidTill;
        var start = moment(vDate);
        var beforealert = start.diff(curDate, "days");
        if (beforealert > 0 && ((beforealert <= item.Reminder1 + 60 && item.Reminder1Condition == "before") ||
            (beforealert <= item.Reminder2 + 60 && item.Reminder2Condition == "before") ||
            (beforealert <= item.Reminder3 + 60 && item.Reminder3Condition == "before"))) {
            var alert = "";
            alert += "<img src='../Content/Images/waitng-approval.png' />" + sAlertTitle;
            alert += " <small class='sub-text'>(reminder due in " + beforealert + " days)</small><br/>";
            $("#alertsListUpcomingDocument").append(alert);

            $("#spNoUpcomingAlert").css('display', 'none');
        }

        if (item.Reminder1Condition == "after" && item.Reminder1 > 0) {
            var nextDate = moment(vDate).add(item.Reminder1, "days");
            var afteralert = nextDate.diff(curDate, "days");
            if (afteralert > 0 && afteralert <= 60) {
                var alert = "";
                alert += "<img src='../Content/Images/waitng-approval.png' />" + sAlertTitle;
                alert += " <small class='sub-text'>(reminder due in " + afteralert + " days)</small><br/>";
                $("#alertsListUpcomingDocument").append(alert);

                $("#spNoUpcomingAlert").css('display', 'none');
            }
        }
        if (item.Reminder2Condition == "after" && item.Reminder2 > 0) {
            var nextDate = moment(vDate).add(item.Reminder2, "days");
            var afteralert = nextDate.diff(curDate, "days");
            if (afteralert > 0 && afteralert <= 60) {
                var alert = "";
                alert += "<img src='../Content/Images/waitng-approval.png' />" + sAlertTitle;
                alert += " <small class='sub-text'>(reminder due in " + afteralert + " days)</small><br/>";
                $("#alertsListUpcomingDocument").append(alert);

                $("#spNoUpcomingAlert").css('display', 'none');
            }

        }
        if (item.Reminder3Condition == "after" && item.Reminder3 > 0) {
            var nextDate = moment(vDate).add(item.Reminder3, "days");
            var afteralert = nextDate.diff(curDate, "days");
            if (afteralert > 0 && afteralert <= 60) {
                var alert = "";
                alert += "<img src='../Content/Images/waitng-approval.png' />" + sAlertTitle;
                alert += " <small class='sub-text'>(reminder due in " + afteralert + " days)</small><br/>";
                $("#alertsListUpcomingDocument").append(alert);

                $("#spNoUpcomingAlert").css('display', 'none');
            }
        }
    }
}

var multipleChecksDocumentID = "";
var multipleChecksDocumentName = "";
var multipleChecksDocumentReview = "";
var multipleChecksDocumentReviewTitle = "";
var multipleChecksDocumentSentForSign = "";
var multipleChecksDocumentIsFinalized = "";
var multipleChecksDocumentIsPrimaryDoc = "";
var multipleChecksDocumentURL = "";
var multiplechecksDocStatus = "";
function checkMultipleDocuments(object) {
    $(".openmenuDocumentMultiActions").contextMenu({ menu: 'dropdownMenuDocumentMultiActions', leftButton: true }, function (action, el, pos) { contextMenuDocumentMultiActions(action, el, pos); });
    multipleChecksDocumentID = "";
    multipleChecksDocumentName = "";
    multipleChecksDocumentReview = "";
    multipleChecksDocumentSentForSign = "";
    multipleChecksDocumentIsFinalized = "";
    multipleChecksDocumentIsPrimaryDoc = "";
    multipleChecksDocumentURL = "";
    multiplechecksDocStatus = "";
    var CanSendForSign = false;
    var IsExcelDoc = false;
    var IsDocuSign = false;
    var selectedFilesExt = [];
    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
    var vAccFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "1" && n.Status == "ON");
    });
    if (vAccFeat.length > 0) {
        var vConfig = vAccFeat[0].Configuration;
        var vProvider = $(vConfig).find('Provider').text();
        if (vProvider == "Docu Sign")
            IsDocuSign = true;
    }
    selectedamnddoc = false;
    selectedamnddocname = [];
    $('input[type=checkbox][name="MultipleDocuments"]:checked').each(function () {
        var DocumentID = this.id;
        var isChecked = this.checked;
        var DocumentName = $(this).parent("li").find("#DocumentName").text();
        var ReviewWorkflow = $(this).parent("li").find("#ReviewWorkflow").text();
        var SentForSign = $(this).parent("li").find("#SentForSign").text();

        //manoj
        var DocStatusTag = $(this).parent("li").find("b")[0].title;
        //manoj

        var IsFinalized = $(this).parent("li").find("#IsFinalized").text();
        var IsPrimaryDoc = $(this).parent("li").find("#IsPrimaryDoc").text();

        var LinkURL = $(this).parent("li").find("a").attr('href');
        if (LinkURL == "#" || LinkURL == "javascript:void(0);") {
            LinkURL = $(this).parent("li").find("a").attr('seqe')
            if (typeof (LinkURL) == "undefined" || LinkURL == "undefined") {
                LinkURL = $(this).parent("li").find("a").attr('data-value');
            }
        } else {
            LinkURL = $(this).parent("li").find("a").attr('data-value');
        }

        var amnmantdocument = $(this).parent("li").find("#FolderCreationMode").text();
        if (isChecked) {
            if (contractItem.Status != 'Expired' && contractItem.Status != 'Archived')
                $("#documentMultiActions").css('display', '');
            if (multipleChecksDocumentID == "") {
                multipleChecksDocumentID = DocumentID;
                multipleChecksDocumentName = DocumentName;
                multipleChecksDocumentReview = ReviewWorkflow;
                if (SentForSign != '')
                    multipleChecksDocumentSentForSign = SentForSign;

                //manoj
                multiplechecksDocStatus = DocStatusTag;
                //manoj

                multipleChecksDocumentIsFinalized = IsFinalized;
                multipleChecksDocumentIsPrimaryDoc = IsPrimaryDoc;
                multipleChecksDocumentURL = decodeURIComponent(LinkURL);
                multipleChecksDocumentReviewTitle = "Review for " + DocumentName;
            }
            else {
                multipleChecksDocumentID = multipleChecksDocumentID + ';' + DocumentID;
                //multipleChecksDocumentName = multipleChecksDocumentName + ';' + DocumentName;
                multipleChecksDocumentName = multipleChecksDocumentName + '~' + DocumentName;
                multipleChecksDocumentReview = multipleChecksDocumentReview + ";" + ReviewWorkflow;
                if (SentForSign != '')
                    multipleChecksDocumentSentForSign += ";" + SentForSign;

                //manoj
                multiplechecksDocStatus += ";" + DocStatusTag;
                //manoj

                multipleChecksDocumentIsFinalized += ";" + IsFinalized;
                multipleChecksDocumentIsPrimaryDoc += ";" + IsPrimaryDoc;
                multipleChecksDocumentURL += "|" + decodeURIComponent(LinkURL);
                multipleChecksDocumentReviewTitle = multipleChecksDocumentReviewTitle + ";Review for " + +DocumentName;
            }
            var ext = DocumentName.split('.').pop();
            selectedFilesExt.push(ext);
            CanSendForSign = false;
            if (typeof (ext) != "undefined" && ext != "" && !IsExcelDoc)
                if (ext.indexOf("doc") > -1 || ext.indexOf("docx") > -1 || ext.indexOf("pdf") > -1) {
                    CanSendForSign = true;
                }
                else if (ext != 'zip' && ext != 'ZIP')
                    IsExcelDoc = true;
            if (amnmantdocument == "Amendment") {
                selectedamnddocname.push(DocumentName);
                selectedamnddoc = true;
            }
        }
    });

    if (multipleChecksDocumentID.trim() == "") {
        $("#documentMultiActions").css('display', 'none');
    }
    else {
        if (multiplechecksDocStatus.indexOf('Expired') >= 0) {
            $("#dropdownMenuDocumentMultiActions .review").hide();
            $("#dropdownMenuDocumentMultiActions .final").hide();
            $("#dropdownMenuDocumentMultiActions .signature").hide();
            $("#dropdownMenuDocumentMultiActions .clexpire").hide();
        } else {
            $("#dropdownMenuDocumentMultiActions .review").show();
            $("#dropdownMenuDocumentMultiActions .final").show();
            $("#dropdownMenuDocumentMultiActions .signature").show();
            $("#dropdownMenuDocumentMultiActions .clexpire").show();

            if (multipleChecksDocumentReview.indexOf('In Progress') >= 0) {
                $("#dropdownMenuDocumentMultiActions .review").hide();
            }
            //eO39985
            if (contractItem.IsDraft != "Yes") {
                $("#dropdownMenuDocumentMultiActions .final").show();
            }
            else {
                $("#dropdownMenuDocumentMultiActions .final").hide();
                $("#dropdownMenuDocumentMultiActions .review").hide();
            }
            //if (multipleChecksDocumentSentForSign != "") {
            //    $("#dropdownMenuDocumentMultiActions .final").hide();
            //}
            //else if (contractItem.IsDraft != "Yes") {
            //    $("#dropdownMenuDocumentMultiActions .final").show();
            //}
            if (multipleChecksDocumentIsFinalized.indexOf('Yes') >= 0) {
                $("#dropdownMenuDocumentMultiActions .final").hide();
            }
            else if (contractItem.IsDraft != "Yes") {
                $("#dropdownMenuDocumentMultiActions .final").show();
            }
            if (multipleChecksDocumentSentForSign != "" || multipleChecksDocumentIsFinalized.indexOf('No') >= 0
                || !CanSendForSign || !IsDocuSign) {
                $("#dropdownMenuDocumentMultiActions .signature").hide();
            }
            else if (contractItem.IsDraft != "Yes") {
                $("#dropdownMenuDocumentMultiActions .signature").show();
            }
        }
    }
    if ($.inArray('zip', selectedFilesExt) > -1 || $.inArray('ZIP', selectedFilesExt) > -1) {
        $("#dropdownMenuDocumentMultiActions .review").hide();
        $("#dropdownMenuDocumentMultiActions .final").hide();
        $("#dropdownMenuDocumentMultiActions .signature").hide();
        $("#dropdownMenuDocumentMultiActions .duplicate").hide();

    }
    try {
        hideAllMenuAndStopPro(event);
    }
    catch (ex) {

    }
}

function contextMenuDocumentMultiActions(action, el, pos) {
    switch (action) {
        case "review":
            {
                MultipleDocumentReview();
                break;
            }
        case "final":
            {
                MultipleDocumentFinal();
                break;
            }
        case "remove":
            {
                if (selectedamnddoc == true && selectedamnddocname.length > 0) {
                    var documentnamevalues = "";
                    $(selectedamnddocname).each(function (idoc, amnddocname) {
                        documentnamevalues += "," + amnddocname;
                    });
                    documentnamevalues = (documentnamevalues.charAt(0) != ',') ? documentnamevalues : documentnamevalues.substr(1);
                    var n = documentnamevalues.lastIndexOf(",");
                    if (n > -1) {
                        documentnamevalues = documentnamevalues.substr(0, n) + 'and' + documentnamevalues.substr(n + 1);
                    }
                    swal("", "You can not untag following Amendment document(s) <span style='font-weight:700'>" + documentnamevalues + "</span> .");
                } else {
                    MultipleDocumentRemove();
                }
                break;
            }
        case "delete":
            {
                MultipleDocumentDelete();
                break;
            }
        case "move":
            {
                $('#load').empty();
                //if (typeof ($("#hdnContractDocumentsUrlFixed").text()) != "undefined" && $("#hdnContractDocumentsUrlFixed").text() != null && $("#hdnContractDocumentsUrlFixed").text() != "") {

                //}
                var finalurl = ($('#hdContAreaDocLibName').val() != null && $('#hdContAreaDocLibName').val() != "") ? $('#hdContAreaDocLibName').val() : '/Contract Documents/';
                finalurl = (finalurl.charAt(0) == '/') ? finalurl.substring(1) : finalurl;

                //manoj
                var documenturltopass = (typeof ($('#showAll').text()) != "undefined" && $('#showAll').text().replace(/ \/ /g, '/') != null && $('#showAll').text().replace(/ \/ /g, '/') != "") ? $('#showAll').text().replace(/ \/ /g, '/') : "";
                if (documenturltopass != "") {
                    documenturltopass = documenturltopass.trim();
                    documenturltopass = (documenturltopass.charAt(0) == '/') ? documenturltopass.substring(1) : documenturltopass;
                    var arrdocumenturltopass = documenturltopass.split('/');
                    finalurl += "/" + arrdocumenturltopass[0];
                }
                //manoj

                var ContarctName = $("#lblContractTitle").text().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').replace(/[\*\|\,\"\:\<\>\[\}\{\}\'\(\)\&\#\%\.\-\!]/g, '').replace(/\//g, '').replace(/\s\s+/g, " ").trim();
                urldetailsforcontact = (finalurl.charAt(0) == '/') ? finalurl.substring(1) : finalurl;
                CreateFolderToMove(finalurl, ContarctName);
                $("#hdntreeviewFolderMove").val('move');
                $("#treeviewFolderMove").dialog("option", "title", "Move to Folder");
                $("#treeviewFolderMove").dialog("open");
                break;
            }
        case "createcopy":
            {
                $('#load').empty();

                var finalurl = ($('#hdContAreaDocLibName').val() != null && $('#hdContAreaDocLibName').val() != "") ? $('#hdContAreaDocLibName').val() : '/Contract Documents/';
                finalurl = (finalurl.charAt(0) == '/') ? finalurl.substring(1) : finalurl;
                var documenturltopass = (typeof ($('#showAll').text()) != "undefined" && $('#showAll').text().replace(/ \/ /g, '/') != null && $('#showAll').text().replace(/ \/ /g, '/') != "") ? $('#showAll').text().replace(/ \/ /g, '/') : "";
                if (documenturltopass != "") {
                    documenturltopass = documenturltopass.trim();
                    documenturltopass = (documenturltopass.charAt(0) == '/') ? documenturltopass.substring(1) : documenturltopass;
                    var arrdocumenturltopass = documenturltopass.split('/');
                    finalurl += "/" + arrdocumenturltopass[0];
                }
                var ContarctName = $("#lblContractTitle").text().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').replace(/[\*\|\,\"\:\<\>\[\}\{\}\'\(\)\&\#\%\.\-\!]/g, '').replace(/\//g, '').replace(/\s\s+/g, " ").trim();
                urldetailsforcontact = (finalurl.charAt(0) == '/') ? finalurl.substring(1) : finalurl;
                CreateFolderToMove(finalurl, ContarctName);

                $("#hdntreeviewFolderMove").val('copy');
                $("#treeviewFolderMove").dialog("option", "title", "Create Copy");
                $("#treeviewFolderMove").dialog("open");
                break;
            }
        case "signature":
            {
                MultipleDocumentSignature(el);
                break;
            }
    }
}

//manoj
//ContextMenu for asc/desc order contract folder(s)/document(s)
function contextMenuDocumentSort(action, el, pos) {
    switch (action) {
        case 'ascorder': {
            if (typeof (el.prevObject[0].id) != "undefined" && el.prevObject[0].id != null && el.prevObject[0].id != "") {
                if (el.prevObject[0].id == "pindocumentsort") {
                    orderinglist('ulPinDocument', 'lblPinDocumentsCount', 'asc');
                } else {
                    orderinglist('ulDocument', 'lblDocumentsCount', 'asc')
                }
            }
            break;
        }
        case 'descorder': {
            if (typeof (el.prevObject[0].id) != "undefined" && el.prevObject[0].id != null && el.prevObject[0].id != "") {
                if (el.prevObject[0].id == "pindocumentsort") {
                    orderinglist('ulPinDocument', 'lblPinDocumentsCount', 'desc');
                } else {
                    orderinglist('ulDocument', 'lblDocumentsCount', 'desc')
                }
            }
            break;
        }
    }
}
//manoj

function MultipleDocumentReview() {
    $("#loadingPage").fadeIn();
    $(".FL_ApprovalSheetContract").css('display', 'none');
    if ($("#contractDetailsSummaryConfiguration").css('display') != 'none') {
        $("#contractDetailsSummaryConfiguration").css('display', 'none');
    }
    var documentName = multipleChecksDocumentName;
    var documentID = multipleChecksDocumentID;
    var title = multipleChecksDocumentReviewTitle;
    var businessArea = $("#lblBusinessArea").text();
    var contractArea = $("#lblContractArea").text();
    $("#tblStage").empty();
    $("#ddlRule").empty();
    //manoj
    //New
    var arrDocumentName = multipleChecksDocumentName.split('~');
    var WrkflwTitle = "";
    $(arrDocumentName).each(function (idocname, ndocname) {
        WrkflwTitle += "~" + "Review for " + ndocname;
    });
    WrkflwTitle = (WrkflwTitle.charAt(0) == '~') ? WrkflwTitle.substring(1) : WrkflwTitle;
    //New
    //manoj
    $("#txtWorkflowTitle").val(WrkflwTitle);
    //manoj
    $("#txtWorkflowTitle").prop('disabled', "disabled");
    //manoj
    $("#lblAutoUpdateStatus").text('Auto update Document status based on this Workflow.');
    $("#txtDuration").val("");
    //*Harshitha
    var nicInstance = nicEditors.findEditor('txtComment');
    nicInstance.setContent('');
    $("#hdWorkflowType").val("Document Review");
    $("#hdWorkflowObjectID").val(documentID);
    $("#hdWorkflowObjectTitle").val(documentName);
    GetValuesAndAutoPopulate("ddlWorkflowCC", "");

    var vWorkflowSettings = [];
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Workflow/evaluate?workflowType=Document Review&contractArea=' + encodeURIComponent(contractArea) + '&businessArea=' + encodeURIComponent(businessArea) + '&contractid=' + documentID,
        type: 'GET',
        cache: false,
        contentType: false,
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        processData: false,
        success: function (item) {
            vWorkflowSettings = item.WorkflowSettings;
            var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
            var vAccFeat = $.grep(veContractFeatures, function (n, i) {
                return (n.RowKey == "8" && n.Status == "ON");
            });
            if (vAccFeat.length > 0) {
                vWorkflowRules = item.WorkflowRules;
            }
            if (contractItem.IsFinalized == "Yes") {
                $("#liAutoUpdateStatus").css('display', 'none');
            } else {
                $("#liAutoUpdateStatus").css('display', '');
                $('#chkAutoUpdateStatus').prop('checked', true);
            }
            if (item.WorkflowSettings != null) {
                workflowRoutingOptions = vWorkflowSettings.WorkflowRoutingOptions.split(";");
                workflowRoutingOptions = $.map(workflowRoutingOptions, $.trim);
                if (workflowRoutingOptions.indexOf("Allow adding additional Stages") == -1) {
                    if (workflowRoutingOptions.indexOf("Allow over-ride of Admin Configuration") == -1) {
                        $("#spAddStage").css("display", "none");
                    }
                }
                $("#txtDuration").val(vWorkflowSettings.TaskDuration);
                if ($("#txtDuration").val() != "") {
                    $("#txtDuration").trigger("onchange");
                } else {
                    $("#lblDurationDate").empty();
                }
                //if (vWorkflowSettings.TaskDuration != "undefined" && vWorkflowSettings.TaskDuration != null && vWorkflowSettings.TaskDuration != "")
                //    $("#lblDurationDate").html(moment(new Date()).add("days", vWorkflowSettings.TaskDuration).format('MM/DD/YYYY'));
            }
            if (vWorkflowRules.length > 0) {
                $(vWorkflowRules).each(function (i, rule) {
                    $("#ddlRule").append('<option value="' + rule.RuleName + '">' + rule.RuleName + '</option>');
                });

                var workflowRules = vWorkflowRules[0];
                $("#ddlRule").find('option[value="' + workflowRules.RuleName + '"]').prop("selected", true);
                if (vWorkflowRules.length == 1) {
                    $("#lblddlRule").css("display", "");
                    $("#ddlRule").css("display", "none");
                    $("#lblddlRule").text(workflowRules.RuleName);
                    $("#ddlRule").attr('disabled', 'disabled');
                }
                else {
                    $("#lblddlRule").text("");
                    $("#lblddlRule").css("display", "none");
                    $("#ddlRule").css("display", "");
                    $("#ddlRule").removeAttr("disabled");
                }
                var participantsInXML = workflowRules.ParticipantsInXML;
                var totalFileCount = 0;
                var multipleDocnames = "";
                if (typeof workflowRules.WorkflowTitle != 'undefined' && workflowRules.WorkflowTitle != "") {
                    if (documentName.indexOf('~') >= 0) {
                        var docnames = documentName.split('~');
                        docnames.forEach(function (val, i) {
                            if (multipleDocnames == "") {
                                multipleDocnames = workflowRules.WorkflowTitle + ' for ' + val;
                            } else {
                                multipleDocnames = multipleDocnames + '~' + workflowRules.WorkflowTitle + ' for ' + val
                            }
                        })
                    }
                }
                if (workflowRules.RuleName == "Default") {
                    if (typeof workflowRules.WorkflowTitle != 'undefined' && workflowRules.WorkflowTitle != "") {
                        if (documentName.indexOf('~') < 0)
                            $("#txtWorkflowTitle").val(workflowRules.WorkflowTitle + ' for' + documentName);
                        else
                            $("#txtWorkflowTitle").val(multipleDocnames);
                    } else {
                        $("#txtWorkflowTitle").val("Review for " + documentName);
                    }
                }
                else {
                    if (typeof workflowRules.WorkflowTitle != 'undefined' && workflowRules.WorkflowTitle != "") {
                        if (documentName.indexOf('~') < 0)
                            $("#txtWorkflowTitle").val(workflowRules.WorkflowTitle + ' for ' + documentName);
                        else
                            $("#txtWorkflowTitle").val(multipleDocnames);
                    } else {
                        $("#txtWorkflowTitle").val('Conditional Review Workflow for ' + documentName);
                    }
                }
                //If the rule is ad-hoc 
                if (participantsInXML != "") {
                    $(participantsInXML).find('WorkflowPaticipant').each(function () {
                        var StageTitle = $(this).find('StageTitle').text();
                        var Participants = $(this).find('Participants').text();
                        var Order = $(this).find('Order').text();
                        totalFileCount++;
                        var htmlFormatFile = '<tr id="trStage' + totalFileCount + '">';
                        htmlFormatFile += '<td class="width30 wf_approval start_workflow">';
                        htmlFormatFile += '<input id="txtStage' + totalFileCount + '" value="' + StageTitle + '" name="Stage' + totalFileCount + '" title="Stage" placeholder="Stage Name" type="text" class="f_inpt width95 validelement" />';
                        htmlFormatFile += '</td>';
                        htmlFormatFile += '<td class="width40 start_workflow">';
                        htmlFormatFile += '<select id="ddlAssignTo' + totalFileCount + '" name="AssignTo' + totalFileCount + '"  multiple="multiple" data-placeholder="Select" class="width97 a-Workflow-height validmultiselect"></select>';
                        htmlFormatFile += '</td>';
                        htmlFormatFile += '<td class="width20 padding_top_3px v_align_top start_workflow">';
                        htmlFormatFile += '<select id="ddlOrder' + totalFileCount + '" name="Order' + totalFileCount + '"  class="f_inpt width97 height32">';
                        if (Order == "Serial")
                            htmlFormatFile += '<option value="Serial" selected="selected">Serial</option><option value="Parallel">Parallel</option></select>';
                        else
                            htmlFormatFile += '<option value="Serial">Serial</option><option value="Parallel" selected="selected">Parallel</option></select>';
                        htmlFormatFile += '</td>';
                        htmlFormatFile += '<td class="width10 padding_top_10px v_align_top start_workflow">';
                        if (totalFileCount > 1)
                            htmlFormatFile += '<img id="imgStageDelete' + totalFileCount + '" src="../Content/Images/icon/delete.png" style="width: 20px" onclick="DeleteStage(this)" />';
                        else
                            htmlFormatFile += '<img id="imgStageDelete' + totalFileCount + '" src="../Content/Images/icon/delete.png" style="visibility: hidden; width: 20px" onclick="DeleteStage(this)" />';
                        htmlFormatFile += '</td>';
                        htmlFormatFile += '</tr>';

                        $("#tblStage").append(htmlFormatFile);
                        var $options = $("#ddlApprovers > option").clone();
                        $('#ddlAssignTo' + totalFileCount).append($options);
                        $("#ddlAssignTo" + totalFileCount).chosen().change(function () {
                            var vasstoid = $(this).attr('id').replace("ddlAssignTo", "");
                            if ($(this).val() != null) {
                                if ($(this).val().length > 1 && (workflowRoutingOptions.indexOf("Allow over-ride of Admin Configuration") >= 0 ||
                                    workflowRoutingOptions.indexOf("Allow replacing participants") >= 0)) {
                                    $("#ddlOrder" + vasstoid).prop('disabled', false);
                                }
                                else {
                                    $("#ddlOrder" + vasstoid).val("Serial");
                                    $("#ddlOrder" + vasstoid).prop('disabled', true);
                                }
                            }
                            else {
                                $("#ddlOrder" + vasstoid).val("Serial");
                                $("#ddlOrder" + vasstoid).prop('disabled', true);
                            }
                        });
                        GetValuesAndAutoPopulate("ddlAssignTo" + totalFileCount, Participants);

                        if (item.WorkflowSettings != null) {
                            if (workflowRoutingOptions.indexOf("Allow over-ride of Admin Configuration") == -1) {
                                if (workflowRoutingOptions.indexOf("Allow replacing participants") == -1) {
                                    $("#ddlAssignTo" + totalFileCount).prop('disabled', true).trigger("chosen:updated");
                                    $("#ddlOrder" + totalFileCount).prop('disabled', true);
                                }
                                $("#txtStage" + totalFileCount).prop('disabled', true);
                                $("#imgStageDelete" + totalFileCount).css("visibility", "hidden");
                            }
                        }
                    });
                }
                else {
                    if ($("#ddlRule").html() == "") {
                        $("#ddlRule").append('<option value="Ad-hoc">Ad-hoc</option>');
                        $("#lblddlRule").css("display", "");
                        $("#ddlRule").css("display", "none");
                        $("#lblddlRule").text("Ad-hoc");
                    }
                    if (!workflowAdHoc)
                        $("#ddlRule").attr('disabled', 'disabled');
                    var totalFileCount = 1;
                    var htmlFormatFile = '<tr id="trStage' + totalFileCount + '">';
                    htmlFormatFile += '<td class="width30 wf_approval start_workflow">';
                    htmlFormatFile += '<input id="txtStage' + totalFileCount + '" name="Stage' + totalFileCount + '" title="Stage" placeholder="Stage Name" type="text" class="f_inpt width95 validelement" value="Stage ' + totalFileCount + '"/>';
                    htmlFormatFile += '</td>';
                    htmlFormatFile += '<td class="width40 start_workflow">';
                    htmlFormatFile += '<select id="ddlAssignTo' + totalFileCount + '" name="AssignTo' + totalFileCount + '"  multiple="multiple" data-placeholder="Select" class="width97 a-Workflow-height validmultiselect"></select>';
                    htmlFormatFile += '</td>';
                    htmlFormatFile += '<td class="width20 padding_top_3px v_align_top start_workflow">';
                    htmlFormatFile += '<select id="ddlOrder' + totalFileCount + '" name="Order' + totalFileCount + '"  class="f_inpt width97 height32" disabled="disabled"><option selected="selected">Serial</option><option>Parallel</option></select>';
                    htmlFormatFile += '</td>';
                    htmlFormatFile += '<td class="width10 padding_top_10px v_align_top start_workflow">';
                    htmlFormatFile += '<img src="../Content/Images/icon/delete.png" style="visibility: hidden; width: 20px" onclick="DeleteStage(this)" />';
                    htmlFormatFile += '</td>';
                    htmlFormatFile += '</tr>';

                    $("#tblStage").append(htmlFormatFile);
                    var $options = $("#ddlApprovers > option").clone();
                    $('#ddlAssignTo' + totalFileCount).append($options);
                    $("#ddlAssignTo" + totalFileCount).chosen().change(function () {
                        var vasstoid = $(this).attr('id').replace("ddlAssignTo", "");
                        if ($(this).val() != null) {
                            if ($(this).val().length > 1) {
                                $("#ddlOrder" + vasstoid).prop('disabled', false);
                            }
                            else {
                                $("#ddlOrder" + vasstoid).val("Serial");
                                $("#ddlOrder" + vasstoid).prop('disabled', true);
                            }
                        }
                        else {
                            $("#ddlOrder" + vasstoid).val("Serial");
                            $("#ddlOrder" + vasstoid).prop('disabled', true);
                        }
                    });
                }
            }
            else {
                if ($("#ddlRule").html() == "") {
                    $("#ddlRule").append('<option value="Ad-hoc">Ad-hoc</option>');
                    $("#lblddlRule").css("display", "");
                    $("#ddlRule").css("display", "none");
                    $("#lblddlRule").text("Ad-hoc");
                }
                if (!workflowAdHoc)
                    $("#ddlRule").attr('disabled', 'disabled');
                var totalFileCount = 1;
                var htmlFormatFile = '<tr id="trStage' + totalFileCount + '">';
                htmlFormatFile += '<td class="width30 wf_approval start_workflow">';
                htmlFormatFile += '<input id="txtStage' + totalFileCount + '" name="Stage' + totalFileCount + '" title="Stage" placeholder="Stage Name" type="text" class="f_inpt width95 validelement" value="Stage ' + totalFileCount + '"/>';
                htmlFormatFile += '</td>';
                htmlFormatFile += '<td class="width40 start_workflow">';
                htmlFormatFile += '<select id="ddlAssignTo' + totalFileCount + '" name="AssignTo' + totalFileCount + '"  multiple="multiple" data-placeholder="Select" class="width97 a-Workflow-height validmultiselect"></select>';
                htmlFormatFile += '</td>';
                htmlFormatFile += '<td class="width20 padding_top_3px v_align_top start_workflow">';
                htmlFormatFile += '<select id="ddlOrder' + totalFileCount + '" name="Order' + totalFileCount + '"  class="f_inpt width97 height32" disabled="disabled"><option selected="selected">Serial</option><option>Parallel</option></select>';
                htmlFormatFile += '</td>';
                htmlFormatFile += '<td class="width10 padding_top_10px v_align_top start_workflow">';
                htmlFormatFile += '<img src="../Content/Images/icon/delete.png" style="visibility: hidden; width: 20px" onclick="DeleteStage(this)" />';
                htmlFormatFile += '</td>';
                htmlFormatFile += '</tr>';

                $("#tblStage").append(htmlFormatFile);
                var $options = $("#ddlApprovers > option").clone();
                $('#ddlAssignTo' + totalFileCount).append($options);
                $("#ddlAssignTo" + totalFileCount).chosen().change(function () {
                    var vasstoid = $(this).attr('id').replace("ddlAssignTo", "");
                    if ($(this).val() != null) {
                        if ($(this).val().length > 1) {
                            $("#ddlOrder" + vasstoid).prop('disabled', false);
                        }
                        else {
                            $("#ddlOrder" + vasstoid).val("Serial");
                            $("#ddlOrder" + vasstoid).prop('disabled', true);
                        }
                    }
                    else {
                        $("#ddlOrder" + vasstoid).val("Serial");
                        $("#ddlOrder" + vasstoid).prop('disabled', true);
                    }
                });
            }
            //ENH492 - Workflow Cycle time Report & default naming of stages.
            $("#txtStage" + totalFileCount).autocomplete({
                source: StageName,
                minLength: 1,
                focus: function (event, ui) {
                    return false;
                },
                select: function (evn, uidetails) {
                    $("#txtStage" + totalFileCount).val(uidetails.item.label);

                }
            });
            $("#loadingPage").fadeOut();
            $("#dvWorkflow").dialog("option", "title", "Document Review Workflow");
            $("#dvWorkflow").dialog("open");
            $("#dvWorkflow").height("auto");
        },
        error: function () {
            $("#ddlRule").append('<option value="Ad-hoc">Ad-hoc</option>');
            $("#lblddlRule").css("display", "");
            $("#ddlRule").css("display", "none");
            $("#lblddlRule").text("Ad-hoc");
            if (!workflowAdHoc)
                $("#ddlRule").attr('disabled', 'disabled');
            var totalFileCount = 1;
            var htmlFormatFile = '<tr id="trStage' + totalFileCount + '">';
            htmlFormatFile += '<td class="width30 wf_approval start_workflow">';
            htmlFormatFile += '<input id="txtStage' + totalFileCount + '" name="Stage' + totalFileCount + '" title="Stage" placeholder="Stage Name" type="text" class="f_inpt width95 validelement" value="Stage ' + totalFileCount + '"/>';
            htmlFormatFile += '</td>';
            htmlFormatFile += '<td class="width40 start_workflow">';
            htmlFormatFile += '<select id="ddlAssignTo' + totalFileCount + '" name="AssignTo' + totalFileCount + '"  multiple="multiple" data-placeholder="Select" class="width97 a-Workflow-height validmultiselect"></select>';
            htmlFormatFile += '</td>';
            htmlFormatFile += '<td class="width20 padding_top_3px v_align_top start_workflow">';
            htmlFormatFile += '<select id="ddlOrder' + totalFileCount + '" name="Order' + totalFileCount + '"  class="f_inpt width97 height32" disabled="disabled"><option selected="selected">Serial</option><option>Parallel</option></select>';
            htmlFormatFile += '</td>';
            htmlFormatFile += '<td class="width10 padding_top_10px v_align_top start_workflow">';
            htmlFormatFile += '<img src="../Content/Images/icon/delete.png" style="visibility: hidden; width: 20px" onclick="DeleteStage(this)" />';
            htmlFormatFile += '</td>';
            htmlFormatFile += '</tr>';

            $("#tblStage").append(htmlFormatFile);
            var $options = $("#ddlApprovers > option").clone();
            $('#ddlAssignTo' + totalFileCount).append($options);
            $("#ddlAssignTo" + totalFileCount).chosen().change(function () {
                var vasstoid = $(this).attr('id').replace("ddlAssignTo", "");
                if ($(this).val() != null) {
                    if ($(this).val().length > 1) {
                        $("#ddlOrder" + vasstoid).prop('disabled', false);
                    }
                    else {
                        $("#ddlOrder" + vasstoid).val("Serial");
                        $("#ddlOrder" + vasstoid).prop('disabled', true);
                    }
                }
                else {
                    $("#ddlOrder" + vasstoid).val("Serial");
                    $("#ddlOrder" + vasstoid).prop('disabled', true);
                }
            });
            //ENH492 - Workflow Cycle time Report & default naming of stages.
            $("#txtStage" + totalFileCount).autocomplete({
                source: StageName,
                minLength: 1,
                focus: function (event, ui) {
                    return false;
                },
                select: function (evn, uidetails) {
                    $("#txtStage" + totalFileCount).val(uidetails.item.label);

                }
            });
            $("#loadingPage").fadeOut();
            $("#dvWorkflow").dialog("option", "title", "Document Review Workflow");
            $("#dvWorkflow").dialog("open");
            $("#dvWorkflow").height("auto");
        }
    });
}

function MultipleDocumentFinal() {
    swal({
        title: '',
        text: "Before finalization of word documents(.doc or .docx) if any selected, make sure that you have accepted track changes and cleaned up the document. Are you sure you want to mark selected documents as <span style='font-weight:700'>Finalized/Ready for Signature</span>?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        html: true
    },
                       function (confirmed) {
                           if (confirmed) {
                               $("#loadingPage").fadeIn();
                               var entityid = multipleChecksDocumentID;
                               $.ajax({
                                   url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/MarkFinal?documentid=' + entityid,
                                   type: 'PUT',
                                   cache: false,
                                   contentType: false,
                                   headers: {
                                       'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, 'RefreshToken': localStorage.RefreshToken, username: localStorage.UserName
                                   },
                                   processData: false,
                                   success: function (document) {
                                       $("#loadingPage").fadeOut();
                                       //manoj
                                       if (documentview == null || documentview == "" || documentview == 'folder') {
                                           if ($('#showAll').text() != null && $('#showAll').text() != "" && typeof ($('#showAll').text()) != "undefined") {
                                               var selectedfoldervalue = $('#showAll').find("a");
                                               var textvalueselected = $(selectedfoldervalue)[$(selectedfoldervalue).length - 1].textContent;
                                               var idvalueselected = $(selectedfoldervalue)[$(selectedfoldervalue).length - 1].id;
                                               var parentdocumentdetails = { id: idvalueselected, text: textvalueselected };
                                               showfolderdocuments(parentdocumentdetails);
                                           }
                                           else {
                                               BindDocument(vContractID);
                                           }
                                       } else {
                                           DisplayDocument(documentview);
                                       }
                                       //GetContractPendingAction(true, "BindPeoples");
                                       $("#hdnFolderDocumentView").text('');
                                       $("#hdnShowAllTextValue").html('');
                                       PrvFolderselection = '';
                                       //Bind primary and pined document based on new feature
                                       if ($("#hdnnewdocumentfeature").text() == "Yes") {
                                           CreateDocumentListPinView(vContractID);
                                       }
                                       //manoj
                                   },
                                   error: function () {
                                       $("#loadingPage").fadeOut();
                                   }
                               });
                           }
                           return;
                       });
}

function MultipleDocumentRemove() {
    var documentName = multipleChecksDocumentName;
    var documentID = multipleChecksDocumentID;

    swal({
        title: '',
        text: "Are you sure you want to <span style='font-weight:700'>remove</span> selected Documents from this Contract Record?",
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
                       url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/untag?contractid=' + getParameterByName('ContractID') + '&documentid=' + documentID,
                       type: 'PUT',
                       dataType: 'json',
                       "Content-Type": "application/json",
                       headers: {
                           'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName, 'RefreshToken': localStorage.RefreshToken
                       },
                       cache: false,
                       success: function (data) {
                           $("#loadingPage").fadeOut();
                           //manoj
                           if (documentview == null || documentview == "" || documentview == 'folder') {
                               if ($('#showAll').text() != null && $('#showAll').text() != "" && typeof ($('#showAll').text()) != "undefined") {
                                   var selectedfoldervalue = $('#showAll').find("a");
                                   var textvalueselected = $(selectedfoldervalue)[$(selectedfoldervalue).length - 1].textContent;
                                   var idvalueselected = $(selectedfoldervalue)[$(selectedfoldervalue).length - 1].id;
                                   var parentdocumentdetails = { id: idvalueselected, text: textvalueselected };
                                   showfolderdocuments(parentdocumentdetails);
                               }
                               else {
                                   BindDocument(vContractID);
                               }
                           } else {
                               DisplayDocument(documentview);
                           }
                           pendingStarted = false;
                           GetContractPendingAction(true, "BindPeoples");
                           $("#hdnFolderDocumentView").text('');
                           $("#hdnShowAllTextValue").html('');
                           PrvFolderselection = '';
                           //Bind primary and pined document based on new feature
                           if ($("#hdnnewdocumentfeature").text() == "Yes") {
                               CreateDocumentListPinView(vContractID);
                           }
                           //manoj
                       },
                       error: function () {
                           $("#loadingPage").fadeOut();
                       }
                   });
               }
               return;
           });
}

function MultipleDocumentDelete() {
    var documentName = multipleChecksDocumentName;
    var documentID = multipleChecksDocumentID;
    swal({
        title: '',
        text: "Are you sure you want to <span style='font-weight:700'>delete</span> selected documents?",
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
                     url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?documentid=' + documentID,
                     type: 'DELETE',
                     dataType: 'json',
                     "Content-Type": "application/json",
                     headers: {
                         'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName
                     },
                     cache: false,
                     success: function (data) {
                         //manoj
                         $("#loadingPage").fadeOut();
                         if (documentview == null || documentview == "" || documentview == 'folder') {
                             if ($('#showAll').text() != null && $('#showAll').text() != "" && typeof ($('#showAll').text()) != "undefined") {
                                 var selectedfoldervalue = $('#showAll').find("a");
                                 var textvalueselected = $(selectedfoldervalue)[$(selectedfoldervalue).length - 1].textContent;
                                 var idvalueselected = $(selectedfoldervalue)[$(selectedfoldervalue).length - 1].id;
                                 var parentdocumentdetails = { id: idvalueselected, text: textvalueselected };
                                 showfolderdocuments(parentdocumentdetails);
                             }
                             else {
                                 BindDocument(vContractID);
                             }
                         } else {
                             DisplayDocument(documentview);
                         }
                         pendingStarted = false;
                         GetContractPendingAction(true, "BindPeoples");
                         $("#hdnFolderDocumentView").text('');
                         $("#hdnShowAllTextValue").html('');
                         PrvFolderselection = '';
                         //Bind primary and pined document based on new feature
                         if ($("#hdnnewdocumentfeature").text() == "Yes") {
                             CreateDocumentListPinView(vContractID);
                         }
                         //manoj
                     },
                     error: function () {
                         $("#loadingPage").fadeOut();
                     }
                 });
             }
             return;
         });
}

$('#btnDocumentReview').click(function () {
    $("#loadingPage").fadeIn();
    $(".FL_ApprovalSheetContract").css('display', 'none');
    if ($("#contractDetailsSummaryConfiguration").css('display') != 'none') {
        $("#contractDetailsSummaryConfiguration").css('display', 'none');
    }
    var documentName = multipleChecksDocumentName;
    var documentID = multipleChecksDocumentID;
    var title = multipleChecksDocumentReviewTitle;
    var businessArea = $("#lblBusinessArea").text();
    var contractArea = $("#lblContractArea").text();
    $("#tblStage").empty();
    $("#ddlRule").empty();

    $("#txtWorkflowTitle").val("Review for " + documentName);
    $("#lblAutoUpdateStatus").text('Auto update Document status based on this Workflow.');
    $("#txtDuration").val("");
    //*Harshitha
    var nicInstance = nicEditors.findEditor('txtComment');
    nicInstance.setContent('');
    $("#hdWorkflowType").val("Document Review");
    $("#hdWorkflowObjectID").val(documentID);
    $("#hdWorkflowObjectTitle").val(documentName);
    GetValuesAndAutoPopulate("ddlWorkflowCC", "");
    var vWorkflowSettings = [];
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Workflow/evaluate?workflowType=Document Review&contractArea=' + encodeURIComponent(contractArea) + '&businessArea=' + encodeURIComponent(businessArea) + '&contractid=' + getParameterByName('ContractID'),
        type: 'GET',
        cache: false,
        contentType: false,
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        processData: false,
        success: function (item) {
            vWorkflowSettings = item.WorkflowSettings;
            var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
            var vAccFeat = $.grep(veContractFeatures, function (n, i) {
                return (n.RowKey == "8" && n.Status == "ON");
            });
            if (vAccFeat.length > 0) {
                vWorkflowRules = item.WorkflowRules;
            }
            if (contractItem.IsFinalized == 'Yes') {
                $("#liAutoUpdateStatus").css('display', 'none');
            } else {
                $("#liAutoUpdateStatus").css('display', '');
                $('#chkAutoUpdateStatus').prop('checked', true);
            }
            if (item.WorkflowSettings != null) {
                workflowRoutingOptions = vWorkflowSettings.WorkflowRoutingOptions.split(";");
                workflowRoutingOptions = $.map(workflowRoutingOptions, $.trim);
                if (workflowRoutingOptions.indexOf("Allow adding additional Stages") == -1) {
                    if (workflowRoutingOptions.indexOf("Allow over-ride of Admin Configuration") == -1) {
                        $("#spAddStage").css("display", "none");
                    }
                }
                $("#txtDuration").val(vWorkflowSettings.TaskDuration);
                if ($("#txtDuration").val() != "") {
                    $("#txtDuration").trigger("onchange");
                } else {
                    $("#lblDurationDate").empty();
                }
            }
            if (vWorkflowRules.length > 0) {
                $(vWorkflowRules).each(function (i, rule) {
                    $("#ddlRule").append('<option value="' + rule.RuleName + '">' + rule.RuleName + '</option>');
                });

                var workflowRules = vWorkflowRules[0];
                $("#ddlRule").find('option[value="' + workflowRules.RuleName + '"]').prop("selected", true);
                if (vWorkflowRules.length == 1) {
                    $("#lblddlRule").css("display", "");
                    $("#ddlRule").css("display", "none");
                    $("#lblddlRule").text(workflowRules.RuleName);
                    $("#ddlRule").attr('disabled', 'disabled');
                }
                else {
                    $("#lblddlRule").text("");
                    $("#lblddlRule").css("display", "none");
                    $("#ddlRule").css("display", "");
                    $("#ddlRule").removeAttr("disabled");
                }
                var participantsInXML = workflowRules.ParticipantsInXML;
                var totalFileCount = 0;
                if (workflowRules.RuleName == "Default") {
                    if (typeof workflowRules.WorkflowTitle != 'undefined' && workflowRules.WorkflowTitle != "") {
                        $("#txtWorkflowTitle").val(workflowRules.WorkflowTitle + ' for ' + documentName);

                    } else {
                        $("#txtWorkflowTitle").val("Review for " + documentName);
                    }

                } else {
                    if (typeof workflowRules.WorkflowTitle != 'undefined' && workflowRules.WorkflowTitle != "") {
                        $("#txtWorkflowTitle").val(workflowRules.WorkflowTitle + ' for ' + documentName);

                    } else {
                        $("#txtWorkflowTitle").val('Conditional Review Workflow for ' + documentName);
                    }
                }
                //If the rule is ad-hoc 
                if (participantsInXML != "") {
                    $(participantsInXML).find('WorkflowPaticipant').each(function () {
                        var StageTitle = $(this).find('StageTitle').text();
                        var Participants = $(this).find('Participants').text();
                        var Order = $(this).find('Order').text();
                        totalFileCount++;
                        var htmlFormatFile = '<tr id="trStage' + totalFileCount + '">';
                        htmlFormatFile += '<td class="width30 wf_approval start_workflow">';
                        htmlFormatFile += '<input id="txtStage' + totalFileCount + '" value="' + StageTitle + '" name="Stage' + totalFileCount + '" title="Stage" placeholder="Stage Name" type="text" class="f_inpt width95 validelement" />';
                        htmlFormatFile += '</td>';
                        htmlFormatFile += '<td class="width40 start_workflow">';
                        htmlFormatFile += '<select id="ddlAssignTo' + totalFileCount + '" name="AssignTo' + totalFileCount + '"  multiple="multiple" data-placeholder="Select" class="width97 a-Workflow-height validmultiselect"></select>';
                        htmlFormatFile += '</td>';
                        htmlFormatFile += '<td class="width20 padding_top_3px v_align_top start_workflow">';
                        htmlFormatFile += '<select id="ddlOrder' + totalFileCount + '" name="Order' + totalFileCount + '"  class="f_inpt width97 height32">';
                        if (Order == "Serial")
                            htmlFormatFile += '<option value="Serial" selected="selected">Serial</option><option value="Parallel">Parallel</option></select>';
                        else
                            htmlFormatFile += '<option value="Serial">Serial</option><option value="Parallel" selected="selected">Parallel</option></select>';
                        htmlFormatFile += '</td>';
                        htmlFormatFile += '<td class="width10 padding_top_10px v_align_top start_workflow">';
                        if (totalFileCount > 1)
                            htmlFormatFile += '<img id="imgStageDelete' + totalFileCount + '" src="../Content/Images/icon/delete.png" style="width: 20px" onclick="DeleteStage(this)" />';
                        else
                            htmlFormatFile += '<img id="imgStageDelete' + totalFileCount + '" src="../Content/Images/icon/delete.png" style="visibility: hidden; width: 20px" onclick="DeleteStage(this)" />';
                        htmlFormatFile += '</td>';
                        htmlFormatFile += '</tr>';

                        $("#tblStage").append(htmlFormatFile);
                        var $options = $("#ddlApprovers > option").clone();
                        $('#ddlAssignTo' + totalFileCount).append($options);
                        $("#ddlAssignTo" + totalFileCount).chosen().change(function () {
                            var vasstoid = $(this).attr('id').replace("ddlAssignTo", "");
                            if ($(this).val() != null) {
                                if ($(this).val().length > 1 && (workflowRoutingOptions.indexOf("Allow over-ride of Admin Configuration") >= 0 ||
                                    workflowRoutingOptions.indexOf("Allow replacing participants") >= 0)) {
                                    $("#ddlOrder" + vasstoid).prop('disabled', false);
                                }
                                else {
                                    $("#ddlOrder" + vasstoid).val("Serial");
                                    $("#ddlOrder" + vasstoid).prop('disabled', true);
                                }
                            }
                            else {
                                $("#ddlOrder" + vasstoid).val("Serial");
                                $("#ddlOrder" + vasstoid).prop('disabled', true);
                            }
                        });
                        GetValuesAndAutoPopulate("ddlAssignTo" + totalFileCount, Participants);

                        if (item.WorkflowSettings != null) {
                            if (workflowRoutingOptions.indexOf("Allow over-ride of Admin Configuration") == -1) {
                                if (workflowRoutingOptions.indexOf("Allow replacing participants") == -1) {
                                    $("#ddlAssignTo" + totalFileCount).prop('disabled', true).trigger("chosen:updated");
                                    $("#ddlOrder" + totalFileCount).prop('disabled', true);
                                }
                                $("#txtStage" + totalFileCount).prop('disabled', true);
                                $("#imgStageDelete" + totalFileCount).css("visibility", "hidden");
                            }
                        }
                    });
                }
                else {
                    if ($("#ddlRule").html() == "") {
                        $("#ddlRule").append('<option value="Ad-hoc">Ad-hoc</option>');
                        $("#lblddlRule").css("display", "");
                        $("#ddlRule").css("display", "none");
                        $("#lblddlRule").text("Ad-hoc");
                    }
                    if (!workflowAdHoc)
                        $("#ddlRule").attr('disabled', 'disabled');
                    var totalFileCount = 1;
                    var htmlFormatFile = '<tr id="trStage' + totalFileCount + '">';
                    htmlFormatFile += '<td class="width30 wf_approval start_workflow">';
                    htmlFormatFile += '<input id="txtStage' + totalFileCount + '" name="Stage' + totalFileCount + '" title="Stage" placeholder="Stage Name" type="text" class="f_inpt width95 validelement" value="Stage ' + totalFileCount + '"/>';
                    htmlFormatFile += '</td>';
                    htmlFormatFile += '<td class="width40 start_workflow">';
                    htmlFormatFile += '<select id="ddlAssignTo' + totalFileCount + '" name="AssignTo' + totalFileCount + '"  multiple="multiple" data-placeholder="Select" class="width97 a-Workflow-height validmultiselect"></select>';
                    htmlFormatFile += '</td>';
                    htmlFormatFile += '<td class="width20 padding_top_3px v_align_top start_workflow">';
                    htmlFormatFile += '<select id="ddlOrder' + totalFileCount + '" name="Order' + totalFileCount + '"  class="f_inpt width97 height32" disabled="disabled"><option selected="selected">Serial</option><option>Parallel</option></select>';
                    htmlFormatFile += '</td>';
                    htmlFormatFile += '<td class="width10 padding_top_10px v_align_top start_workflow">';
                    htmlFormatFile += '<img src="../Content/Images/icon/delete.png" style="visibility: hidden; width: 20px" onclick="DeleteStage(this)" />';
                    htmlFormatFile += '</td>';
                    htmlFormatFile += '</tr>';

                    $("#tblStage").append(htmlFormatFile);
                    var $options = $("#ddlApprovers > option").clone();
                    $('#ddlAssignTo' + totalFileCount).append($options);
                    $("#ddlAssignTo" + totalFileCount).chosen().change(function () {
                        var vasstoid = $(this).attr('id').replace("ddlAssignTo", "");
                        if ($(this).val() != null) {
                            if ($(this).val().length > 1) {
                                $("#ddlOrder" + vasstoid).prop('disabled', false);
                            }
                            else {
                                $("#ddlOrder" + vasstoid).val("Serial");
                                $("#ddlOrder" + vasstoid).prop('disabled', true);
                            }
                        }
                        else {
                            $("#ddlOrder" + vasstoid).val("Serial");
                            $("#ddlOrder" + vasstoid).prop('disabled', true);
                        }
                    });
                }
            }
            else {
                if ($("#ddlRule").html() == "") {
                    $("#ddlRule").append('<option value="Ad-hoc">Ad-hoc</option>');
                    $("#lblddlRule").css("display", "");
                    $("#ddlRule").css("display", "none");
                    $("#lblddlRule").text("Ad-hoc");
                }
                if (!workflowAdHoc)
                    $("#ddlRule").attr('disabled', 'disabled');
                var totalFileCount = 1;
                var htmlFormatFile = '<tr id="trStage' + totalFileCount + '">';
                htmlFormatFile += '<td class="width30 wf_approval start_workflow">';
                htmlFormatFile += '<input id="txtStage' + totalFileCount + '" name="Stage' + totalFileCount + '" title="Stage" placeholder="Stage Name" type="text" class="f_inpt width95 validelement" value="Stage ' + totalFileCount + '"/>';
                htmlFormatFile += '</td>';
                htmlFormatFile += '<td class="width40 start_workflow">';
                htmlFormatFile += '<select id="ddlAssignTo' + totalFileCount + '" name="AssignTo' + totalFileCount + '"  multiple="multiple" data-placeholder="Select" class="width97 a-Workflow-height validmultiselect"></select>';
                htmlFormatFile += '</td>';
                htmlFormatFile += '<td class="width20 padding_top_3px v_align_top start_workflow">';
                htmlFormatFile += '<select id="ddlOrder' + totalFileCount + '" name="Order' + totalFileCount + '"  class="f_inpt width97 height32" disabled="disabled"><option selected="selected">Serial</option><option>Parallel</option></select>';
                htmlFormatFile += '</td>';
                htmlFormatFile += '<td class="width10 padding_top_10px v_align_top start_workflow">';
                htmlFormatFile += '<img src="../Content/Images/icon/delete.png" style="visibility: hidden; width: 20px" onclick="DeleteStage(this)" />';
                htmlFormatFile += '</td>';
                htmlFormatFile += '</tr>';

                $("#tblStage").append(htmlFormatFile);
                var $options = $("#ddlApprovers > option").clone();
                $('#ddlAssignTo' + totalFileCount).append($options);
                $("#ddlAssignTo" + totalFileCount).chosen().change(function () {
                    var vasstoid = $(this).attr('id').replace("ddlAssignTo", "");
                    if ($(this).val() != null) {
                        if ($(this).val().length > 1) {
                            $("#ddlOrder" + vasstoid).prop('disabled', false);
                        }
                        else {
                            $("#ddlOrder" + vasstoid).val("Serial");
                            $("#ddlOrder" + vasstoid).prop('disabled', true);
                        }
                    }
                    else {
                        $("#ddlOrder" + vasstoid).val("Serial");
                        $("#ddlOrder" + vasstoid).prop('disabled', true);
                    }
                });
            }
            //ENH492 - Workflow Cycle time Report & default naming of stages.
            $("#txtStage" + totalFileCount).autocomplete({
                source: StageName,
                minLength: 1,
                focus: function (event, ui) {
                    return false;
                },
                select: function (evn, uidetails) {
                    $("#txtStage" + totalFileCount).val(uidetails.item.label);

                }
            });
            $("#loadingPage").fadeOut();
            $("#dvWorkflow").dialog("option", "title", "Document Review Workflow");
            $("#dvWorkflow").dialog("open");
            $("#dvWorkflow").height("auto");
        },
        error: function () {
            $("#ddlRule").append('<option value="Ad-hoc">Ad-hoc</option>');
            $("#lblddlRule").css("display", "");
            $("#ddlRule").css("display", "none");
            $("#lblddlRule").text("Ad-hoc");
            if (!workflowAdHoc)
                $("#ddlRule").attr('disabled', 'disabled');
            var totalFileCount = 1;
            var htmlFormatFile = '<tr id="trStage' + totalFileCount + '">';
            htmlFormatFile += '<td class="width30 wf_approval start_workflow">';
            htmlFormatFile += '<input id="txtStage' + totalFileCount + '" name="Stage' + totalFileCount + '" title="Stage" placeholder="Stage Name" type="text" class="f_inpt width95 validelement" value="Stage ' + totalFileCount + '"/>';
            htmlFormatFile += '</td>';
            htmlFormatFile += '<td class="width40 start_workflow">';
            htmlFormatFile += '<select id="ddlAssignTo' + totalFileCount + '" name="AssignTo' + totalFileCount + '"  multiple="multiple" data-placeholder="Select" class="width97 a-Workflow-height validmultiselect"></select>';
            htmlFormatFile += '</td>';
            htmlFormatFile += '<td class="width20 padding_top_3px v_align_top start_workflow">';
            htmlFormatFile += '<select id="ddlOrder' + totalFileCount + '" name="Order' + totalFileCount + '"  class="f_inpt width97 height32" disabled="disabled"><option selected="selected">Serial</option><option>Parallel</option></select>';
            htmlFormatFile += '</td>';
            htmlFormatFile += '<td class="width10 padding_top_10px v_align_top start_workflow">';
            htmlFormatFile += '<img src="../Content/Images/icon/delete.png" style="visibility: hidden; width: 20px" onclick="DeleteStage(this)" />';
            htmlFormatFile += '</td>';
            htmlFormatFile += '</tr>';

            $("#tblStage").append(htmlFormatFile);
            var $options = $("#ddlApprovers > option").clone();
            $('#ddlAssignTo' + totalFileCount).append($options);
            $("#ddlAssignTo" + totalFileCount).chosen().change(function () {
                var vasstoid = $(this).attr('id').replace("ddlAssignTo", "");
                if ($(this).val() != null) {
                    if ($(this).val().length > 1) {
                        $("#ddlOrder" + vasstoid).prop('disabled', false);
                    }
                    else {
                        $("#ddlOrder" + vasstoid).val("Serial");
                        $("#ddlOrder" + vasstoid).prop('disabled', true);
                    }
                }
                else {
                    $("#ddlOrder" + vasstoid).val("Serial");
                    $("#ddlOrder" + vasstoid).prop('disabled', true);
                }
            });
            //ENH492 - Workflow Cycle time Report & default naming of stages.
            $("#txtStage" + totalFileCount).autocomplete({
                source: StageName,
                minLength: 1,
                focus: function (event, ui) {
                    return false;
                },
                select: function (evn, uidetails) {
                    $("#txtStage" + totalFileCount).val(uidetails.item.label);

                }
            });
            $("#loadingPage").fadeOut();
            $("#dvWorkflow").dialog("option", "title", "Document Review Workflow");
            $("#dvWorkflow").dialog("open");
            $("#dvWorkflow").height("auto");
        }
    });

});

function BindDocumentNotTagToContract() {
    $('#tblExistingDocument').html('<img src="../Content/Images/icon/loading.gif">');
    $('#compact-paginationDocument').css("display", "none");
    try {
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/NotTaggedToContract?searchkeyword=' + encodeURIComponent($("#txtSearchDocument").val()),
            type: 'GET',
            cache: false,
            contentType: false,
            headers: {
                'eContracts-ApiKey': localStorage.APIKey
            },
            processData: false,
            success: function (datacollection) {
                var data = datacollection;
                //    $.grep(datacollection, function (n, i) {
                //    return (n.ContractArea == $("#lblContractArea").text().trim());
                //});
                if (data.length > 0) {
                    var settings = {
                        pattern: /\.[0-9a-z]+$/i,
                        knownFileTypes: ['pdf', 'png', 'jpg', 'gif', 'bmp', 'doc', 'xls', 'ppt', 'docx', 'xlsx', 'txt', 'pptx', 'zip', 'rar', 'gzip', 'arj', 'wav', 'mp3', 'aif', 'aiff', 'm4a', 'ogg', 'wma', 'psd', 'ai', 'swf', 'fla', 'css', 'js', 'avi', 'mov', 'wmv', 'dotx'],
                        WopiFrameFileTypes: ['doc', 'xls', 'ppt', 'docx', 'xlsx', 'pptx', 'dotx']
                    };
                    var article = '';
                    var datalenght = data.length;
                    for (var i = 0; i < datalenght; i++) {
                        var item = data[i];
                        var vURL = encodeURI(item.DocumentUrl);
                        var ext = vURL.match(settings.pattern);
                        var vFileType = '<dd class="file-icon none"></dd>';
                        if (ext != null) {
                            if (ext.length > 0) { ext = ext[0].slice(1); }
                            if (jQuery.inArray(ext.toLowerCase(), settings.knownFileTypes) > -1) {
                                vFileType = '<dd class="file-icon ' + ext + '"></dd>';
                            }
                        }

                        article += '<tr><td class="labelleft">';
                        article += '<input id="' + item.RowKey + '" type="checkbox" class="margin-right-5" name="NotTaggedContract" value="' + item.DocumentName + '" />';

                        article += vFileType + '<label for="' + item.RowKey + '" class="">' + item.DocumentName + '</label>';
                        article += '</td></tr>';
                    }
                    $("#tblExistingDocument").html(article);
                    article = '';
                    $('#compact-paginationDocument').css("display", "");
                    var vCount = $("#tblExistingDocument tr").length;
                    $('#compact-paginationDocument').pagination({
                        items: vCount,
                        itemsOnPage: 5,
                        typeID: 'tblExistingDocument',
                        cssStyle: 'compact-theme'
                    });
                } else {
                    $("#tblExistingDocument").html('<tr><td class="f_p-error det_metadata_notavailble">No items found.</td></tr>');
                }
            },
            error: function () {
                $("#tblExistingDocument").html('<tr><td class="f_p-error det_metadata_notavailble">No items found.</td></tr>');
            }
        });
    } catch (e) {

    }
}

$('#txtSearchDocument').keypress(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        $(".ui-autocomplete").css('display', 'none');
        BindDocumentNotTagToContract();
    }
});

function contextMenuDocument(action, el, pos) {

    switch (action) {
        case "view":
            {

                $("#loadingPage").fadeIn();
                ShowMetadata();
                var documentID = $(el).find("#DocumentID").text();
                $("#tblMetadataDetailDocument").empty();
                $('#tblMetadataDetailDocument').append('<tr><td><img src="../Content/Images/icon/loading.gif"/></td></tr>');
                $("#documentLogs").html('<tr><td colspan="4"><img src="../Content/Images/icon/loading.gif"/></td></tr>');
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/activities?objecttype=Document&objectid=' + documentID + '&actiontype=',
                    type: 'GET',
                    dataType: 'json',
                    "Content-Type": "application/json",
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    cache: false,
                    success: function (activities) {

                        $("#documentLogs").empty();
                        var datalenght = activities.length;
                        var article = '';
                        for (var i = 0; i < datalenght; i++) {
                            var item = activities[i];
                            var sObject = item.Object;
                            var sActivity = item.Activity;
                            var sUserID = item.UserID;
                            var sTimestamp = "";
                            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                            { sTimestamp = moment(new Date(item.Timestamp)).format('MM/DD/YYYY h:mm A'); }
                            else { sTimestamp = moment(new Date(item.Timestamp)).format(localStorage.AppDateFormat + " h:mm A"); }
                            article += '<tr><td><span class="logHis_Datetime">' + sTimestamp + '</span></td><td><b>' + sObject + '</b></td><td><span class="logHis_Activity">' + sActivity + '</span></td><td><span class="logHis_Datetime">' + sUserID + '</span></td></tr>';

                        }
                        $("#documentLogs").html(article);
                        $('#compact-pagination-documentLogs').pagination({
                            items: activities.length,
                            itemsOnPage: 15,
                            type: 'tbody',
                            typeID: 'documentLogs',
                            row: 'tr',
                            cssStyle: 'compact-theme'
                        });


                    },
                    error: function () {
                        $("#documentLogs").html('<tr><td colspan="4">No item found.</td></tr>');
                    }
                });


                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/activities?objecttype=Document&objectid=' + documentID + '&actiontype=',
                    type: 'GET',
                    dataType: 'json',
                    "Content-Type": "application/json",
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    cache: false,
                    success: function (activities) {

                        $("#documentLogs").empty();
                        var datalenght = activities.length;
                        var article = '';
                        for (var i = 0; i < datalenght; i++) {
                            var item = activities[i];
                            var sObject = item.Object;
                            var sActivity = item.Activity;
                            var sUserID = item.UserID;
                            // var sTimestamp = moment(new Date(item.Timestamp)).format('Do MMM, h:mm A');
                            var sTimestamp = "";

                            //var article = '<article class="box1">';
                            //article += '<div>';
                            //article += '<p class="text">' + sTimestamp;
                            //article += '  ' + sActivity + '</p>';
                            //article += '</div>';
                            //article += '</article>';
                            //$("#documentLogs").append(article);
                            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                            { sTimestamp = moment(new Date(item.Timestamp)).format('MM/DD/YYYY h:mm A'); }
                            else { sTimestamp = moment(new Date(item.Timestamp)).format(localStorage.AppDateFormat + " h:mm A"); }

                            article += '<tr><td><span class="logHis_Datetime">' + sTimestamp + '</span></td><td><b>' + sObject + '</b></td><td><span class="logHis_Activity">' + sActivity + '</span></td><td><span class="logHis_Datetime">' + sUserID + '</span></td></tr>';

                        }
                        $("#documentLogs").html(article);
                        $('#compact-pagination-documentLogs').pagination({
                            items: activities.length,
                            itemsOnPage: 15,
                            type: 'tbody',
                            typeID: 'documentLogs',
                            row: 'tr',
                            cssStyle: 'compact-theme'
                        });


                    },
                    error: function () {
                        $("#documentLogs").html('<tr><td colspan="4">No item found.</td></tr>');
                    }
                });





                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?documentid=' + documentID,
                    type: 'GET',
                    dataType: 'json',
                    "Content-Type": "application/json",
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    cache: false,
                    success: function (documententity) {
                        var vMetadata = '<tr>';
                        vMetadata += '<td class="text_label width40 meta_titles">Document Name</td>';
                        vMetadata += '<td class="text width60">' + documententity.DocumentName + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40 meta_titles">Description</td>';
                        vMetadata += '<td class="text width60">' + documententity.Description + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40 meta_titles">Document Type</td>';
                        if (documententity.DocumentType == "0")
                            vMetadata += '<td class="text width60">-</td>';
                        else
                            vMetadata += '<td class="text width60">' + documententity.DocumentType + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40 meta_titles">Document Author</td>';
                        if (documententity.DocumentAuthor == null)
                            vMetadata += '<td class="text width60">-</td>';
                        else
                            vMetadata += '<td class="text width60">' + documententity.DocumentAuthor + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40 meta_titles">Document Language</td>';
                        vMetadata += '<td class="text width60">' + documententity.DocumentLanguage + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40 meta_titles">Hard-copy Physical Location</td>';
                        vMetadata += '<td class="text width60">' + documententity.HardCopyPhysicalLocation + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40 meta_titles">Folder (show path)</td>';
                        vMetadata += '<td class="text width60">' + documententity.DocumentUrl + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40 meta_titles">Business Area</td>';
                        vMetadata += '<td class="text width60">' + documententity.BusinessArea + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40 meta_titles">Is Finalized/Ready for Signature?</td>';
                        vMetadata += '<td class="text width60">' + documententity.IsFinalized + '</td>';
                        vMetadata += '</tr>';
                        if (documententity.IsFinalized == "Yes") {
                            vMetadata += '<tr>';
                            vMetadata += '<td class="text_label width40 meta_titles">Finalized/Ready for Signature By</td>';
                            vMetadata += '<td class="text width60">' + documententity.FinalizedBy + ' on ' + moment(new Date(documententity.FinalizedDate)).format('Do MMM YYYY') + '</td>';
                            vMetadata += '</tr>';
                        }
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40 meta_titles">Is Standard?</td>';
                        vMetadata += '<td class="text width60">' + documententity.IsStandard + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40 meta_titles">Is Primary?</td>';
                        vMetadata += '<td class="text width60">' + documententity.IsPrimary + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40 meta_titles">Document Status</td>';
                        vMetadata += '<td class="text width60">' + documententity.DocumentStatus + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40 meta_titles">Document Version</td>';
                        vMetadata += '<td class="text width60">' + documententity.VersionNo + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40 meta_titles">Created by</td>';
                        vMetadata += '<td class="text width60">' + documententity.CreatedBy + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40 meta_titles">Created Date</td>';
                        vMetadata += '<td class="text width60">' + moment(new Date(documententity.Created)).utc().format('Do MMM YYYY') + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40 meta_titles">Last Updated</td>';
                        vMetadata += '<td class="text width60">' + moment(new Date(documententity.Modified)).utc().format('Do MMM YYYY') + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40 meta_titles">Shared with</td>';
                        vMetadata += '<td class="text width60">' + documententity.SharedWith + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40 meta_titles">Reviewer(s)</td>';
                        vMetadata += '<td class="text width60">' + documententity.Reviewers + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40 meta_titles">Signee</td>';
                        vMetadata += '<td class="text width60">' + documententity.Signee + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40 meta_titles">Document File Size</td>';
                        vMetadata += '<td class="text width60">' + documententity.FileSize + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40 meta_titles">Document Format</td>';
                        vMetadata += '<td class="text">' + documententity.DocumentFormat + '</td>';
                        vMetadata += '</tr>';



                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40 meta_titles">Creation Mode</td>';
                        vMetadata += '<td class="text width60">' + documententity.CreationMode + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40 meta_titles">Valid From</td>';
                        if (documententity.ValidFrom == null)
                            vMetadata += '<td class="text width60">-</td>';
                        else
                            vMetadata += '<td class="text width60">' + moment(new Date(documententity.ValidFrom)).utc().format('Do MMM YYYY') + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40 meta_titles">Valid Till</td>';
                        if (documententity.ValidTill == null)
                            vMetadata += '<td class="text width60">-</td>';
                        else
                            vMetadata += '<td class="text width60">' + moment(new Date(documententity.ValidTill)).utc().format('Do MMM YYYY') + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40 meta_titles">Send Reminder To</td>';
                        if (documententity.SendReminderTo == null)
                            vMetadata += '<td class="text width60">-</td>';
                        else {
                            if (documententity.SendReminderTo == "null")
                                vMetadata += '<td class="text width60">-</td>';
                            else
                                vMetadata += '<td class="text width60">' + documententity.SendReminderTo + '</td>';
                        }
                        vMetadata += '</tr>';

                        $("#tblMetadataDetailDocument").html(vMetadata);
                        setBlankValueToHyphen("tblMetadataDetailDocument");
                        $("#loadingPage").fadeOut();
                        $("#viewMetadataDetailDocument").dialog("option", "title", "Document Details");
                        $("#viewMetadataDetailDocument").dialog("open");

                    },
                    error: function () {
                    }
                });
                $('#documentLogs').css("display", "none");
                $('#compact-pagination-documentLogs').css("display", "none");
                $('#idDocumentPopup').css("display", "none");

                break;
            }
        case "replace":
            {
                ClearReplaceDocFrom();
                var documentID = $(el).find("#DocumentID").text();
                var documentName = $(el).find("#DocumentName").text();
                $("#txtdocumentToReplaceName").val(documentName.substring(0, documentName.lastIndexOf('.')));
                $('#lblDocumentExtension').val(documentName.split('.').pop());
                $("#lblReplaceTemplateDescription").text("");
                //addbuttonclick = true;
                $('#hdnDocumentID').val(documentID);
                $("#trTop").css('display', '');
                $("#divReplaceDocument").dialog("option", "title", "Replace Document");
                $("#divReplaceDocument").dialog("open");
                break;
            }
        case "delete":
            {
                var documentName = $(el).find("#DocumentName").text();
                var documentID = $(el).find("#DocumentID").text();
                swal({
                    title: '',
                    text: "Are you sure you want to <span style='font-weight:700'>delete '" + documentName + "'</span>?",
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
                 url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?documentid=' + documentID,
                 type: 'DELETE',
                 dataType: 'json',
                 "Content-Type": "application/json",
                 headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
                 cache: false,
                 success: function (data) {
                     //manoj
                     var ulDocumentlist = $("#ulDocument li");
                     if (ulDocumentlist.length > 0) {
                         var documentexist = $(ulDocumentlist).find("input[id=" + documentID + "]");
                         if (documentexist.length > 0) {
                             $(ulDocumentlist).find("input[id=" + documentID + "]").parent().remove();

                         }
                     }

                     ulDocumentlist = $("#ulPinDocument li");
                     if (ulDocumentlist.length > 0) {
                         var documentexist = $(ulDocumentlist).find("b[id=" + documentID + "]");
                         if (documentexist.length > 0) {
                             $(ulDocumentlist).find("b[id=" + documentID + "]").parent().remove();
                             $("#hdnPinDocumentCount").text("No");
                         }
                     }

                     ulDocumentlist = $("#ulPinDocument li");
                     if (ulDocumentlist.length == 0) {
                         $("#ulPinDocument").html('No items found.');
                     }

                     ulDocumentlist = $("#ulDocument li");
                     if (ulDocumentlist.length == 0) {
                         $("#ulDocument").html('No items found.');
                     }
                     //if (documentview == null || documentview == "" || documentview == 'folder') {
                     //    if ($('#showAll').text() != null && $('#showAll').text() != "" && typeof ($('#showAll').text()) != "undefined") {
                     //        var selectedfoldervalue = $('#showAll').find("a");
                     //        var textvalueselected = $(selectedfoldervalue)[$(selectedfoldervalue).length - 1].textContent;
                     //        var idvalueselected = $(selectedfoldervalue)[$(selectedfoldervalue).length - 1].id;
                     //        var parentdocumentdetails = { id: idvalueselected, text: textvalueselected };
                     //        showfolderdocuments(parentdocumentdetails);
                     //    }
                     //    else {
                     //        BindDocument(vContractID);
                     //    }
                     //} else {
                     //    DisplayDocument(documentview);
                     //}
                     //pendingStarted = false;
                     //GetContractPendingAction(true, "BindPeoples");
                     //$("#hdnFolderDocumentView").text('');
                     //$("#hdnShowAllTextValue").html('');
                     //PrvFolderselection = '';
                     ////Bind primary and pined document based on new feature
                     //if ($("#hdnnewdocumentfeature").text() == "Yes") {
                     //    CreateDocumentListPinView(vContractID);
                     //}
                     ////manoj
                     //*Harshitha
                     $("#ddlDocumentList option[value='" + documentID + "']").remove();
                     //$("#ddlDocumentList").trigger('chosen:updated');
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
        case "remove":
            {
                var documentName = $(el).find("#DocumentName").text();
                var documentID = $(el).find("#DocumentID").text();
                swal({
                    title: '',
                    text: "Are you sure you want to remove '<span style=\"font-weight:700\">" + documentName + "</span>'?",
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
                 url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/untag?contractid=' + getParameterByName('ContractID') + '&documentid=' + documentID,
                 type: 'PUT',
                 dataType: 'json',
                 "Content-Type": "application/json",
                 headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName, 'RefreshToken': localStorage.RefreshToken },
                 cache: false,
                 success: function (data) {
                     $("#loadingPage").fadeOut();
                     //manoj
                     if (documentview == null || documentview == "" || documentview == 'folder') {
                         if ($('#showAll').text() != null && $('#showAll').text() != "" && typeof ($('#showAll').text()) != "undefined") {
                             var selectedfoldervalue = $('#showAll').find("a");
                             var textvalueselected = $(selectedfoldervalue)[$(selectedfoldervalue).length - 1].textContent;
                             var idvalueselected = $(selectedfoldervalue)[$(selectedfoldervalue).length - 1].id;
                             var parentdocumentdetails = { id: idvalueselected, text: textvalueselected };
                             showfolderdocuments(parentdocumentdetails);
                         }
                         else {
                             BindDocument(vContractID);
                         }
                     } else {
                         DisplayDocument(documentview);
                     }
                     pendingStarted = false;
                     GetContractPendingAction(true, "BindPeoples");
                     $("#hdnFolderDocumentView").text('');
                     $("#hdnShowAllTextValue").html('');
                     PrvFolderselection = '';
                     //Bind primary and pined document based on new feature
                     if ($("#hdnnewdocumentfeature").text() == "Yes") {
                         CreateDocumentListPinView(vContractID);
                     }
                     //manoj
                     //*Harshitha
                     $("#ddlDocumentList option[value='" + documentID + "']").remove();
                     $("#ddlDocumentList").trigger('chosen:updated');
                     BindMilestone();
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
        case "edit":
            {
                var documentID = $(el).find("#DocumentID").text();
                $("#hdIsPrimaryDoc").val($(el).find("#IsPrimaryDoc").text());
                EditDocumentMetadata(documentID);

                break;
            }
        case "final":
            {
                //Check if document is having any revisions
                //var isrevisionexists = true;
                //var LinkURL = $(el).find("a").attr('href');
                //if (LinkURL == "#") {
                //    LinkURL = $(el).find("a").attr('seqe')
                //} else {
                //    LinkURL = $(el).find("a").attr('data-value')
                //}
                //var DocumentUrl = getQueryStringFromValue(LinkURL, 'sourcedoc');
                //$.ajax({
                //    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/revisionexists?docurl=' + DocumentUrl,
                //    type: 'GET',
                //    dataType: 'json',
                //    async: false,
                //    "Content-Type": "application/json",
                //    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                //    cache: false,
                //    success: function (revisiondata) {
                //        if (revisiondata) {
                //            isrevisionexists = true;
                //        }
                //    },
                //    error: function () {

                //    }
                //});

                var CanSend = false;
                var ext = $(el).find("dd").attr("class");
                if (typeof (ext) != "undefined" && ext != "")
                    if (ext.indexOf("doc") > -1 || ext.indexOf("docx") > -1)
                        CanSend = true;
                if (CanSend) {
                    swal({
                        title: '',
                        text: "Please make sure that you have accepted track changes and cleaned up the document. Are you sure you want to mark selected documents as <span style='font-weight:700'>Finalized/Ready for Signature</span>?",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Yes',
                        cancelButtonText: 'No',
                        html: true
                    },
                 function (confirmed) {
                     if (confirmed) {
                         $("#loadingPage").fadeIn();
                         var entityid = $(el).find("#DocumentID").text();
                         $.ajax({
                             url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/MarkFinal?documentid=' + entityid,
                             type: 'PUT',
                             cache: false,
                             contentType: false,
                             headers: {
                                 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, 'RefreshToken': localStorage.RefreshToken, username: localStorage.UserName
                             },
                             processData: false,
                             success: function (document) {
                                 //manoj
                                 $("#loadingPage").fadeOut();
                                 if (documentview == null || documentview == "" || documentview == 'folder') {
                                     if ($('#showAll').text() != null && $('#showAll').text() != "" && typeof ($('#showAll').text()) != "undefined") {
                                         var selectedfoldervalue = $('#showAll').find("a");
                                         var textvalueselected = $(selectedfoldervalue)[$(selectedfoldervalue).length - 1].textContent;
                                         var idvalueselected = $(selectedfoldervalue)[$(selectedfoldervalue).length - 1].id;
                                         var parentdocumentdetails = { id: idvalueselected, text: textvalueselected };
                                         showfolderdocuments(parentdocumentdetails);
                                     }
                                     else {
                                         BindDocument(vContractID);
                                     }
                                 } else {
                                     DisplayDocument(documentview);
                                 }
                                 //GetContractPendingAction(true, "BindPeoples");
                                 $("#hdnFolderDocumentView").text('');
                                 $("#hdnShowAllTextValue").html('');
                                 PrvFolderselection = '';
                                 //Bind primary and pined document based on new feature
                                 if ($("#hdnnewdocumentfeature").text() == "Yes") {
                                     CreateDocumentListPinView(vContractID);
                                 }
                                 //manoj
                             },
                             error: function () {
                                 $("#loadingPage").fadeOut();
                             }
                         });

                     }
                     return;
                 });
                } else {
                    swal({
                        title: '',
                        text: "Do you really want to mark this document as Finalized/Ready for Signature?",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Yes',
                        cancelButtonText: 'No',
                        html: true
                    },
                    function (confirmed) {
                        if (confirmed) {
                            $("#loadingPage").fadeIn();
                            var entityid = $(el).find("#DocumentID").text();
                            $.ajax({
                                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/MarkFinal?documentid=' + entityid,
                                type: 'PUT',
                                cache: false,
                                contentType: false,
                                headers: {
                                    'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, 'RefreshToken': localStorage.RefreshToken, username: localStorage.UserName
                                },
                                processData: false,
                                success: function (document) {
                                    //manoj
                                    $("#loadingPage").fadeOut();
                                    if (documentview == null || documentview == "" || documentview == 'folder') {
                                        if ($('#showAll').text() != null && $('#showAll').text() != "" && typeof ($('#showAll').text()) != "undefined") {
                                            var selectedfoldervalue = $('#showAll').find("a");
                                            var textvalueselected = $(selectedfoldervalue)[$(selectedfoldervalue).length - 1].textContent;
                                            var idvalueselected = $(selectedfoldervalue)[$(selectedfoldervalue).length - 1].id;
                                            var parentdocumentdetails = { id: idvalueselected, text: textvalueselected };
                                            showfolderdocuments(parentdocumentdetails);
                                        }
                                        else {
                                            BindDocument(vContractID);
                                        }
                                    } else {
                                        DisplayDocument(documentview);
                                    }
                                    //GetContractPendingAction(true, "BindPeoples");
                                    $("#hdnFolderDocumentView").text('');
                                    $("#hdnShowAllTextValue").html('');
                                    PrvFolderselection = '';
                                    //Bind primary and pined document based on new feature
                                    if ($("#hdnnewdocumentfeature").text() == "Yes") {
                                        CreateDocumentListPinView(vContractID);
                                    }
                                    //manoj
                                },
                                error: function () {
                                    $("#loadingPage").fadeOut();
                                }
                            });
                        }
                        return;
                    });
                }

                break;
            }
        case "download":
            {
                var LinkURL = $(el).find("a").attr('href');
                if (LinkURL == "#" || LinkURL == "javascript:void(0);") {
                    LinkURL = $(el).find("a").attr('seqe')
                    if (typeof (LinkURL) == "undefined" || LinkURL == "undefined") {
                        LinkURL = $(el).find("a").attr('data-value');
                    }
                } else {
                    LinkURL = $(el).find("a").attr('data-value');
                }
                //var LinkURL = $(el).find("a").attr('href');
                //var SourceUrl = "";
                //if (LinkURL == "#") {
                //    SourceUrl = $(el).find("a").attr('seqe')
                //} else {
                //    SourceUrl = getQueryStringFromValue(LinkURL, 'sourcedoc');
                //    //SourceUrl = encodeURIComponent(SourceUrl);
                //    var formatarray = "doc,xls,ppt,docx,xlsx,pptx,dotx";
                //    var filename = SourceUrl;
                //    filename = filename.split("/").pop().split(".").pop();
                //    if ($.inArray(filename, formatarray.split(',')) > -1) {
                //        SourceUrl = encodeURIComponent(SourceUrl);
                //    }
                //    else {
                //        SourceUrl = decodeURIComponent(SourceUrl);
                //        SourceUrl = encodeURIComponent(SourceUrl);
                //    }
                //}
                location = localStorage.SPHostUrl + "/_layouts/15/download.aspx?SourceUrl=" + LinkURL;
                break;
            }
        case "signature":
            {
                // var Stage = "";
                var requiredavalible = false;
                //  Stage = getParameterByName("Stage");
                if (Stage == 'pipeline') {
                    if ($("#spanstatus").text() != "") {
                        var arrstatus = ['Ready for Signature', 'Awaiting Signatures', 'Signed', 'Active', 'Expired', 'Replaced', 'Archived', 'On Hold', 'Cancelled'];
                        if (arrstatus.indexOf($("#spanstatus").text().trim()) > -1) {
                            Stage = '';
                        }
                    }
                }
                var documentName = $(el).find("#DocumentName").text();
                var sentForSign = $(el).find("#SentForSign").text();
                var documentID = $(el).find("#DocumentID").text();
                var isFinalized = $(el).find("#IsFinalized").text();
                var PrimaryDocumentCheck = $(el).find("#IsPrimaryDoc").text();
                var ext = $(el).find("dd").attr("class");
                var LinkURL = $(el).find("a").attr('href');
                if (LinkURL == "#" || LinkURL == "javascript:void(0);") {
                    var rawUrl = $(el).find("a").attr('seqe');
                    if (typeof (rawUrl) == "undefined" || rawUrl == "undefined") {
                        LinkURL = $(el).find("a").attr('data-value');
                    }
                    //viewdocinword(rawUrl);
                } else {
                    LinkURL = $(el).find("a").attr('data-value');
                }
                var CanSend = false;
                if (typeof (ext) != "undefined" && ext != "")
                    if (ext.indexOf("doc") > -1 || ext.indexOf("docx") > -1 || ext.indexOf("pdf") > -1)
                        CanSend = true;
                if (CanSend) {
                    if (sentForSign == '') {
                        $("#hdIsPrimaryDoc").val(PrimaryDocumentCheck);
                        if (PrimaryDocumentCheck == 'Yes')
                            $("#lblAutoUpdateStatusSignDoc").html("Auto update Document & Contract Record status based on this Workflow.");
                        else
                            $("#lblAutoUpdateStatusSignDoc").html("Auto update Document status based on this Workflow.");
                        if (Stage == 'pipeline') {
                            var vMetadatavaluetofinalize;
                            var metadataFields = [];
                            $.ajax({
                                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/IContractDetails?contractid=' + getParameterByName("ContractID"),
                                type: 'GET',
                                dataType: 'json',
                                headers: { 'eContracts-ApiKey': localStorage.APIKey },
                                cache: false,
                                async: false,
                                success: function (mainmetadataFields) {
                                    vMetadatavaluetofinalize = $(mainmetadataFields).find('Metadata');
                                },
                            });
                            $.ajax({
                                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contracttypes/metadatas?contracttypename=' + strSelectedContractType.trim(),
                                type: 'GET',
                                dataType: 'json',
                                headers: { 'eContracts-ApiKey': localStorage.APIKey },
                                cache: false,
                                async: false,
                                success: function (metadataFieldsvalue) {
                                    if (getParameterByName("Stage") == "pipeline") {
                                        metadataFields = $.grep(metadataFieldsvalue, function (n, i) {
                                            return (n.Finalizingfrom == "Required");
                                        });
                                    }
                                },
                            });

                            if ($("#hdIsPrimaryDoc").val() != 'No') {
                                $(metadataFields).each(function (i, item) {
                                    if ($(vMetadatavaluetofinalize).find(item.FieldName).text() == null || $(vMetadatavaluetofinalize).find(item.FieldName).text() == "") {
                                        requiredavalible = true;
                                    }
                                });
                            }

                            if (!requiredavalible) {
                                ClearSignatureForm();
                                //Disable ddlCC Users not related to contract
                                DisableCCUsers();
                                $.ajax({
                                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Workflow/settings',
                                    type: 'GET',
                                    dataType: 'json',
                                    "Content-Type": "application/json",
                                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                                    cache: false,
                                    success: function (settings) {
                                        $("#txtExpIn").val(settings.TaskDuration);
                                        $("#lblExpDateddl").html(moment(new Date()).add($("#ddltxtExpIn").val(), "days").format('MM/DD/YYYY'));
                                        $("#lblExpDatetxt").html(moment(new Date()).add(settings.TaskDuration, "days").format('MM/DD/YYYY'));
                                    },
                                    error: function () {

                                    }
                                });

                                if (isFinalized != 'Yes') {
                                    var finaltext = "Only <span style='font-weight:700'>Finalized/Ready for Signature</span> documents can be sent out for <span style='font-weight:700'>eSignature</span>. Do you want to mark this document as <span style='font-weight:700'>Finalized/Ready for Signature</span>?";
                                    if (ext.indexOf("doc") > -1 || ext.indexOf("docx") > -1) {
                                        finaltext = "Please make sure that you have accepted track changes and cleaned up the document. Are you sure you want to mark selected documents as <span style='font-weight:700'>Finalized/Ready for Signature</span>?";
                                    }
                                    swal({
                                        title: '',
                                        text: finaltext,
                                        type: 'warning',
                                        showCancelButton: true,
                                        confirmButtonText: 'Yes',
                                        cancelButtonText: 'No',
                                        html: true
                                    },
                                        function (confirmed) {
                                            if (confirmed) {
                                                $(el).find("#IsFinalized").text('Yes');
                                                isFinalized = 'Yes';
                                                $.ajax({
                                                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/MarkFinal?documentid=' + documentID,
                                                    type: 'PUT',
                                                    cache: false,
                                                    contentType: false,
                                                    headers: {
                                                        'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, 'RefreshToken': localStorage.RefreshToken, username: localStorage.UserName
                                                    },
                                                    processData: false,
                                                    success: function (document) {
                                                    }
                                                });
                                            }
                                            if (isFinalized == 'Yes') {
                                                $("#hdMarkAsFinal").val("Y");
                                                if (LinkURL == "#" || LinkURL == "javascript:void(0);") {
                                                    LinkURL = $(el).find("a").attr('seqe')
                                                    if (typeof (LinkURL) == "undefined" || LinkURL == "undefined") {
                                                        LinkURL = $(el).find("a").attr('data-value');
                                                    }
                                                } else {
                                                    LinkURL = $(el).find("a").attr('data-value')
                                                }
                                                $("#hdDocumentID").val(documentID);
                                                $("#hdDocumentURL").val(decodeURIComponent(LinkURL));
                                                $("#tdDocument").html("<b>" + documentName + "</b>");
                                                getNameAndEmailSignDocument();
                                                $('#chkAutoUpdateStatusSignDoc').prop('checked', true)
                                                $("#sendForSignature").dialog("open");
                                            }
                                            return;
                                        });

                                }
                                else {
                                    if (isFinalized == 'Yes') {
                                        $("#hdMarkAsFinal").val("Y");
                                        if (LinkURL == "#" || LinkURL == "javascript:void(0);") {
                                            LinkURL = $(el).find("a").attr('seqe')
                                            if (typeof (LinkURL) == "undefined" || LinkURL == "undefined") {
                                                LinkURL = $(el).find("a").attr('data-value');
                                            }
                                        } else {
                                            LinkURL = $(el).find("a").attr('data-value')
                                        }
                                        $("#hdDocumentID").val(documentID);
                                        $("#hdDocumentURL").val(decodeURIComponent(LinkURL));
                                        $("#tdDocument").html("<b>" + documentName + "</b>");
                                        getNameAndEmailSignDocument();
                                        $('#chkAutoUpdateStatusSignDoc').prop('checked', true)
                                        $("#sendForSignature").dialog("open");
                                    }
                                }
                            } else {
                                swal({
                                    title: '',
                                    text: "Some fields required for Contract Record finalization are not filled. Do you want to edit now?",
                                    type: 'warning',
                                    showCancelButton: true,
                                    confirmButtonText: 'Yes',
                                    cancelButtonText: 'No',
                                    html: true
                                },
                                function (confirmed) {
                                    if (confirmed) {
                                        if (Stage == 'pipeline') {
                                            location = "/Contracts/EditContract?ContractID=" + getParameterByName("ContractID") + "&ContractType=" + encodeURIComponent($("#lblContractType").text()) + "&Stage=" + Stage + "&Finalize=true";
                                        }
                                    } else {
                                        $("#loadingPage").fadeOut();
                                    }
                                });
                            }

                        } else {
                            ClearSignatureForm();
                            //Disable ddlCC Users not related to contract
                            DisableCCUsers();
                            $.ajax({
                                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Workflow/settings',
                                type: 'GET',
                                dataType: 'json',
                                "Content-Type": "application/json",
                                headers: { 'eContracts-ApiKey': localStorage.APIKey },
                                cache: false,
                                success: function (settings) {
                                    $("#txtExpIn").val(settings.TaskDuration);
                                    $("#lblExpDateddl").html(moment(new Date()).add($("#ddltxtExpIn").val(), "days").format('MM/DD/YYYY'));
                                    $("#lblExpDatetxt").html(moment(new Date()).add(settings.TaskDuration, "days").format('MM/DD/YYYY'));
                                },
                                error: function () {

                                }
                            });
                            if (isFinalized != 'Yes') {
                                var finaltext = "Only <span style='font-weight:700'>Finalized/Ready for Signature</span> documents can be sent out for <span style='font-weight:700'>eSignature</span>. Do you want to mark this document as <span style='font-weight:700'>Finalized/Ready for Signature</span>?";
                                if (ext.indexOf("doc") > -1 || ext.indexOf("docx") > -1) {
                                    finaltext = "Please make sure that you have accepted track changes and cleaned up the document. Are you sure you want to mark selected documents as <span style='font-weight:700'>Finalized/Ready for Signature</span>?";
                                }
                                swal({
                                    title: '',
                                    text: finaltext,
                                    type: 'warning',
                                    showCancelButton: true,
                                    confirmButtonText: 'Yes',
                                    cancelButtonText: 'No',
                                    html: true
                                },
                                    function (confirmed) {
                                        if (confirmed) {
                                            $(el).find("#IsFinalized").text('Yes');
                                            isFinalized = 'Yes';
                                            $.ajax({
                                                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/MarkFinal?documentid=' + documentID,
                                                type: 'PUT',
                                                cache: false,
                                                contentType: false,
                                                headers: {
                                                    'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, 'RefreshToken': localStorage.RefreshToken, username: localStorage.UserName
                                                },
                                                processData: false,
                                                success: function (document) {
                                                }
                                            });
                                        }
                                        if (isFinalized == 'Yes') {
                                            $("#hdMarkAsFinal").val("Y");
                                            if (LinkURL == "#" || LinkURL == "javascript:void(0);") {
                                                LinkURL = $(el).find("a").attr('seqe')
                                                if (typeof (LinkURL) == "undefined" || LinkURL == "undefined") {
                                                    LinkURL = $(el).find("a").attr('data-value');
                                                }
                                            } else {
                                                LinkURL = $(el).find("a").attr('data-value')
                                            }
                                            $("#hdDocumentID").val(documentID);
                                            $("#hdDocumentURL").val(decodeURIComponent(LinkURL));
                                            $("#tdDocument").html("<b>" + documentName + "</b>");
                                            getNameAndEmailSignDocument();
                                            $('#chkAutoUpdateStatusSignDoc').prop('checked', true)
                                            $("#sendForSignature").dialog("open");
                                        }
                                        return;
                                    });

                            }
                            else {
                                if (isFinalized == 'Yes') {
                                    $("#hdMarkAsFinal").val("Y");
                                    if (LinkURL == "#" || LinkURL == "javascript:void(0);") {
                                        LinkURL = $(el).find("a").attr('seqe')
                                        if (typeof (LinkURL) == "undefined" || LinkURL == "undefined") {
                                            LinkURL = $(el).find("a").attr('data-value');
                                        }
                                    } else {
                                        LinkURL = $(el).find("a").attr('data-value')
                                    }
                                    $("#hdDocumentID").val(documentID);
                                    $("#hdDocumentURL").val(decodeURIComponent(LinkURL));
                                    $("#tdDocument").html("<b>" + documentName + "</b>");
                                    getNameAndEmailSignDocument();
                                    $('#chkAutoUpdateStatusSignDoc').prop('checked', true)
                                    $("#sendForSignature").dialog("open");
                                }
                            }
                        }
                    } else {
                        swal("", "This document has already been sent for signature: " + sentForSign);
                    }
                } else {
                    swal("", "This document cannot be sent for eSignature: Only <span style='font-weight:700'>doc,docx</span> and <span style='font-weight:700'>pdf</span> type files can be sent for eSignature.");
                }
                break;
            }
        case "editO365":
            {
                var LinkURL = $(el).find("a").attr('href');
                if (LinkURL == "#" || LinkURL == "javascript:void(0);") {
                    var rawUrl = $(el).find("a").attr('seqe');
                    if (typeof (rawUrl) == "undefined" || rawUrl == "undefined") {
                        rawUrl = $(el).find("a").attr('data-value');
                    }
                    if (typeof rawUrl != 'undefined')
                        viewdocinword(rawUrl);
                    else {
                        LinkURL = $(el).find("a").attr('data-value');
                        Opendocinbrowser(LinkURL);
                    }
                } else {
                    LinkURL = $(el).find("a").attr('data-value');
                    Opendocinbrowser(LinkURL);
                }
                break;
            }
        case "sharelink":
            {
                var DocumentNameToCheck = $(el).find("#DocumentName").text();
                var DocumentExtFormat = ['doc', 'xls', 'ppt', 'docx', 'xlsx', 'pptx', 'dotx', 'pdf'];
                if (DocumentExtFormat.indexOf(DocumentNameToCheck.split('.').pop()) > -1) {
                    var documentStatus = $(el).find("b").attr('title');
                    var shareWorkflow = $(el).find("#ShareWorkflow").text();
                    var primarydocchecking = $(el).find("#IsPrimaryDoc").text();
                    $("#lblAutoUpdateStatusShareDoc").html("Auto update Document status to 'Negotiation Complete' when this External Share is completed.");
                    var iscommentexits = false;
                    var LinkURL = $(el).find("a").attr('href');
                    if (LinkURL == "#" || LinkURL == "javascript:void(0);") {
                        LinkURL = $(el).find("a").attr('seqe')
                        if (typeof (LinkURL) == "undefined" || LinkURL == "undefined") {
                            LinkURL = $(el).find("a").attr('data-value');
                        }
                    } else {
                        LinkURL = $(el).find("a").attr('data-value')
                    }
                    $.ajax({
                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/commentexists?docurl=' + LinkURL,
                        //url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/revisionexists?docurl=' + DocumentUrl,
                        type: 'GET',
                        dataType: 'json',
                        async: false,
                        "Content-Type": "application/json",
                        headers: { 'eContracts-ApiKey': localStorage.APIKey },
                        cache: false,
                        success: function (commentdata) {
                            if (commentdata) {
                                iscommentexits = true;
                            }
                            //success: function (revisiondata) {
                            //    if (revisiondata) {
                            //        isrevisionexists = true;
                            //    }
                        },
                        error: function () {

                        }
                    });
                    if (iscommentexits) {
                        swal({
                            title: '',
                            text: "Comments/ redlining found in this document. Do you want to share this to external users for External Share?",
                            type: 'warning',
                            showCancelButton: true,
                            confirmButtonText: 'Yes',
                            cancelButtonText: 'No',
                            html: true
                        },
                         function (confirmed) {
                             if (confirmed) {
                                 $.ajax({
                                     url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Workflow/settings',
                                     type: 'GET',
                                     dataType: 'json',
                                     "Content-Type": "application/json",
                                     headers: { 'eContracts-ApiKey': localStorage.APIKey },
                                     cache: false,
                                     success: function (settings) {
                                         $("#txtShareExpIn").val(settings.TaskDuration);
                                         if ($("#txtShareExpIn").val() != "") {
                                             $("#txtShareExpIn").trigger("onchange");
                                         } else {
                                             $("#lblValidLinkDate").empty();
                                         }
                                         //$("#lblValidLinkDate").html(moment(new Date()).add("days", settings.TaskDuration).format('MM/DD/YYYY'));
                                     },
                                     error: function () {

                                     }
                                 });
                                 ClearShareForm();

                                 var documentName = $(el).find("#DocumentName").text();
                                 var documentID = $(el).find("#DocumentID").text();
                                 $("#hdDocumentID").val(documentID);
                                 $("#hdDocumentURL").val(decodeURIComponent(LinkURL));
                                 $("#hdIsPrimaryDoc").val(primarydocchecking);
                                 $("#tdShareDocument").html("<b>" + documentName + "</b>");
                                 getNameAndEmailShareDocument();
                                 GetValuesAndAutoPopulate("ddlDocumentShareInternal", "");
                                 //getShareNameandEmailIdInternal(vContractID, "ddlDocumentShareInternal");
                                 $("#shareDocument").dialog("open");
                             }
                             return;
                         });
                    } else {
                        $.ajax({
                            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Workflow/settings',
                            type: 'GET',
                            dataType: 'json',
                            "Content-Type": "application/json",
                            headers: { 'eContracts-ApiKey': localStorage.APIKey },
                            cache: false,
                            success: function (settings) {
                                $("#txtShareExpIn").val(settings.TaskDuration);
                                if ($("#txtShareExpIn").val() != "") {
                                    $("#txtShareExpIn").trigger("onchange");
                                } else {
                                    $("#lblValidLinkDate").empty();
                                }
                                //$("#lblValidLinkDate").html(moment(new Date()).add("days", settings.TaskDuration).format('MM/DD/YYYY'));
                            },
                            error: function () {

                            }
                        });
                        ClearShareForm();
                        var documentName = $(el).find("#DocumentName").text();
                        var documentID = $(el).find("#DocumentID").text();
                        $("#hdDocumentID").val(documentID);
                        $("#hdDocumentURL").val(decodeURIComponent(LinkURL));
                        $("#hdIsPrimaryDoc").val(primarydocchecking);
                        $("#tdShareDocument").html("<b>" + documentName + "</b>");
                        getNameAndEmailShareDocument();
                        GetValuesAndAutoPopulate("ddlDocumentShareInternal", "");
                        //getShareNameandEmailIdInternal(vContractID, "ddlDocumentShareInternal");
                        $("#shareDocument").dialog("open");
                    }
                    //if (isrevisionexists) {
                    //    swal({
                    //        title: '',
                    //        text: "Revisions (comments or track changes) exists inside the document, do you really want to share this as a link?",
                    //        type: 'warning',
                    //        showCancelButton: true,
                    //        confirmButtonText: 'Yes',
                    //        cancelButtonText: 'No',
                    //        html: true
                    //    },
                    //     function (confirmed) {
                    //         if (confirmed) {
                    //             $.ajax({
                    //                 url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Workflow/settings',
                    //                 type: 'GET',
                    //                 dataType: 'json',
                    //                 "Content-Type": "application/json",
                    //                 headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    //                 cache: false,
                    //                 success: function (settings) {
                    //                     $("#txtShareExpIn").val(settings.TaskDuration);
                    //                     $("#lblValidLinkDate").html(moment(new Date()).add("days", settings.TaskDuration).format('MM/DD/YYYY'));
                    //                 },
                    //                 error: function () {

                    //                 }
                    //             });
                    //             ClearShareForm();

                    //             var documentName = $(el).find("#DocumentName").text();
                    //             var documentID = $(el).find("#DocumentID").text();
                    //             $("#hdDocumentID").val(documentID);
                    //             $("#hdDocumentURL").val(DocumentUrl);
                    //             $("#hdIsPrimaryDoc").val(primarydocchecking);
                    //             $("#tdShareDocument").html("<b>" + documentName + "</b>");
                    //             getNameAndEmailShareDocument();
                    //             $("#shareDocument").dialog("open");
                    //         }
                    //         return;
                    //     });
                    //} else {
                    //    $.ajax({
                    //        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Workflow/settings',
                    //        type: 'GET',
                    //        dataType: 'json',
                    //        "Content-Type": "application/json",
                    //        headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    //        cache: false,
                    //        success: function (settings) {
                    //            $("#txtShareExpIn").val(settings.TaskDuration);
                    //            $("#lblValidLinkDate").html(moment(new Date()).add(settings.TaskDuration, "days").format('MM/DD/YYYY'));
                    //        },
                    //        error: function () {

                    //        }
                    //    });
                    //    ClearShareForm();
                    //    var documentName = $(el).find("#DocumentName").text();
                    //    var documentID = $(el).find("#DocumentID").text();
                    //    $("#hdDocumentID").val(documentID);
                    //    $("#hdDocumentURL").val(DocumentUrl);
                    //    $("#hdIsPrimaryDoc").val(primarydocchecking);
                    //    $("#tdShareDocument").html("<b>" + documentName + "</b>");
                    //    getNameAndEmailShareDocument();
                    //    $("#shareDocument").dialog("open");
                    //}
                    //}
                } else {
                    swal("", "This document cannot be Shared: Only<span style='font-weight:700'> doc, xls, ppt, docx, xlsx, pptx, dotx and pdf </span> type files are allowed.");
                }
                break;
            }
        case "approve":
            {
                var documentName = $(el).find("#DocumentName").text();
                var documentID = $(el).find("#DocumentID").text();
                $("#txtTodoTitle").val('Approval for ' + documentName.split('.')[0]);
                $("#ddlTodoType option").filter(function (index) { return $(this).text() === "Document Approval"; }).prop('selected', true);
                $("#txtBrowseElement").val(documentName);
                $("#txtBrowseElementID").val(documentID);
                $("#trBrowse").css("display", "");
                $("#browse").css("display", "none");
                $("#tdBrowseElement").html("Documents");
                $('#ddlTodoType').attr('disabled', 'disabled');
                GetValuesAndAutoPopulate("ddlApprovers", "");
                $("#txtDueDate").val("");
                //*Harshitha
                var nicInstance = nicEditors.findEditor('txtNotes');
                nicInstance.setContent('');

                $("#chkNotifyMe").prop('checked', false);
                $("#dvTodo").dialog("open");
                break;
            }
        case "review":
            {
                $(".FL_ApprovalSheetContract").css('display', 'none');
                var documentName = $(el).find("#DocumentName").text();
                var documentID = $(el).find("#DocumentID").text();
                var reviewWorkflow = $(el).find("#ReviewWorkflow").text();
                var PrimaryDocChecking = $(el).find("#IsPrimaryDoc").text();
                //manoj
                $("#txtWorkflowTitle").prop('readonly', false);
                //manoj
                if (reviewWorkflow == "In Progress") {
                    var oWorkflowID = "";
                    var relatedcon = $.grep(ArrayofDocumentWorkflows, function (itemR) {
                        return itemR.DocumentID == documentID
                    });
                    //swal("", "Document Review is in progress for this document.");
                    $("#alertText1").html("Document Review is in progress for this document.");
                    if (relatedcon != null && relatedcon.length > 0) {
                        $("#textingdetails").html('<a target="_blank" title="View Workflow Details" href=/Activity/TaskDetails?TaskID=&WorkflowID=' + relatedcon[0].id + '><font color="#44A6D8">View Workflow Details</font></a>');
                        $("#dvAlertDetails1").dialog("open");
                    } else {
                        GetWorkflowByObjectAndStatus('Documents', documentID, 'In Progress');
                    }
                }
                else {
                    var relatedcon = $.grep(ArrayofDocumentWorkflows, function (itemR) {
                        return itemR.DocumentID == documentID
                    });
                    if (relatedcon.length > 0) {
                        $("#alertText1").html("Document Review is in progress for this document.");
                        $("#textingdetails").html('<a target="_blank" title="View Workflow Details" href=/Activity/TaskDetails?TaskID=&WorkflowID=' + relatedcon[0].id + '><font color="#44A6D8">View Workflow Details</font></a>');
                        $("#dvAlertDetails1").dialog("open");
                    }
                    else {
                        if ($("#contractDetailsSummaryConfiguration").css('display') != 'none') {
                            $("#contractDetailsSummaryConfiguration").css('display', 'none');
                        }
                        $("#loadingPage").fadeIn();
                        var businessArea = $("#lblBusinessArea").text();
                        var contractArea = $("#lblContractArea").text();
                        $("#tblStage").empty();
                        $("#ddlRule").empty();
                        if (contractItem.IsFinalized == 'Yes') {
                            $("#liAutoUpdateStatus").css('display', 'none');
                        } else {
                            $("#liAutoUpdateStatus").css('display', '');
                            $('#chkAutoUpdateStatus').prop('checked', true);
                        }
                        $("#txtWorkflowTitle").val('Review for ' + documentName);
                        if (PrimaryDocChecking == 'Yes')
                            $("#lblAutoUpdateStatus").text('Auto update Document & Contract Record status based on this Workflow.');
                        else
                            $("#lblAutoUpdateStatus").text('Auto update Document status based on this Workflow.');

                        $("#txtDuration").val("");
                        //*Harshitha
                        var nicInstance = nicEditors.findEditor('txtComment');
                        nicInstance.setContent('');
                        $("#hdWorkflowType").val("Document Review");
                        $("#hdWorkflowObjectID").val(documentID);
                        $("#hdWorkflowObjectTitle").val(documentName);
                        $("#hdIsPrimaryDoc").val(PrimaryDocChecking);
                        GetValuesAndAutoPopulate("ddlWorkflowCC", "");

                        var vWorkflowSettings = [];
                        $.ajax({
                            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Workflow/evaluate?workflowType=Document Review&contractArea=' + encodeURIComponent(contractArea) + '&businessArea=' + encodeURIComponent(businessArea) + '&contractid=' + documentID,
                            type: 'GET',
                            cache: false,
                            contentType: false,
                            headers: { 'eContracts-ApiKey': localStorage.APIKey },
                            processData: false,
                            success: function (item) {
                                vWorkflowSettings = item.WorkflowSettings;

                                var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
                                var vAccFeat = $.grep(veContractFeatures, function (n, i) {
                                    return (n.RowKey == "8" && n.Status == "ON");
                                });
                                if (vAccFeat.length > 0) {
                                    vWorkflowRules = item.WorkflowRules;
                                }
                                if (item.WorkflowSettings != null) {
                                    workflowRoutingOptions = vWorkflowSettings.WorkflowRoutingOptions.split(";");
                                    workflowRoutingOptions = $.map(workflowRoutingOptions, $.trim);
                                    if (workflowRoutingOptions.indexOf("Allow adding additional Stages") == -1) {
                                        if (workflowRoutingOptions.indexOf("Allow over-ride of Admin Configuration") == -1) {
                                            $("#spAddStage").css("display", "none");
                                        }
                                    }
                                    $("#txtDuration").val(vWorkflowSettings.TaskDuration);
                                    if ($("#txtDuration").val() != "") {
                                        $("#txtDuration").trigger("onchange");
                                    } else {
                                        $("#lblDurationDate").empty();
                                    }
                                    //if (vWorkflowSettings.TaskDuration != "undefined" && vWorkflowSettings.TaskDuration != null && vWorkflowSettings.TaskDuration != "")
                                    //    $("#lblDurationDate").html(moment(new Date()).add("days", vWorkflowSettings.TaskDuration).format('MM/DD/YYYY'));
                                    workflowAdHoc = vWorkflowSettings.WorkflowAdHoc;
                                }
                                if (vWorkflowRules.length > 0) {
                                    $(vWorkflowRules).each(function (i, rule) {
                                        $("#ddlRule").append('<option value="' + rule.RuleName + '">' + rule.RuleName + '</option>');
                                    });
                                    if (workflowAdHoc == "on") {
                                        $("#ddlRule").append('<option value="Ad-hoc">Ad-hoc</option>');
                                    }
                                    var workflowRules = vWorkflowRules[0];
                                    $("#ddlRule").find('option[value="' + workflowRules.RuleName + '"]').prop("selected", true);
                                    if (vWorkflowRules.length == 1 && workflowAdHoc == "") {
                                        $("#lblddlRule").css("display", "");
                                        $("#ddlRule").css("display", "none");
                                        $("#lblddlRule").text(workflowRules.RuleName);
                                        $("#ddlRule").attr('disabled', 'disabled');
                                    }
                                    else {
                                        $("#lblddlRule").text("");
                                        $("#lblddlRule").css("display", "none");
                                        $("#ddlRule").css("display", "");
                                        $("#ddlRule").removeAttr("disabled");
                                    }
                                    var participantsInXML = workflowRules.ParticipantsInXML;
                                    var totalFileCount = 0;
                                    if (workflowRules.RuleName == "Default") {
                                        if (typeof workflowRules.WorkflowTitle != 'undefined' && workflowRules.WorkflowTitle != "") {
                                            $("#txtWorkflowTitle").val(workflowRules.WorkflowTitle + ' for ' + documentName);
                                        } else {
                                            $("#txtWorkflowTitle").val("Review for " + documentName);
                                        }
                                    } else {
                                        if (typeof workflowRules.WorkflowTitle != 'undefined' && workflowRules.WorkflowTitle != "") {
                                            $("#txtWorkflowTitle").val(workflowRules.WorkflowTitle + ' for ' + documentName);
                                        }
                                        else {
                                            $("#txtWorkflowTitle").val('Conditional Review Workflow for ' + documentName);
                                        }
                                    }
                                    //If the rule is ad-hoc 
                                    if (participantsInXML != "") {
                                        $(participantsInXML).find('WorkflowPaticipant').each(function () {
                                            var StageTitle = $(this).find('StageTitle').text();
                                            var Participants = $(this).find('Participants').text();
                                            var Order = $(this).find('Order').text();
                                            totalFileCount++;
                                            var htmlFormatFile = '<tr id="trStage' + totalFileCount + '">';
                                            htmlFormatFile += '<td class="width30 wf_approval start_workflow">';
                                            htmlFormatFile += '<input id="txtStage' + totalFileCount + '" value="' + StageTitle + '" name="Stage' + totalFileCount + '" title="Stage" placeholder="Stage Name" type="text" class="f_inpt width95 validelement" />';
                                            htmlFormatFile += '</td>';
                                            htmlFormatFile += '<td class="width46 start_workflow">';
                                            htmlFormatFile += '<select id="ddlAssignTo' + totalFileCount + '" name="AssignTo' + totalFileCount + '"  multiple="multiple" data-placeholder="Select" class="width97 a-Workflow-height validmultiselect"></select>';
                                            htmlFormatFile += '</td>';
                                            htmlFormatFile += '<td class="width20 padding_top_3px v_align_top start_workflow">';
                                            htmlFormatFile += '<select id="ddlOrder' + totalFileCount + '" name="Order' + totalFileCount + '"  class="f_inpt width97 height32">';
                                            if (Order == "Serial")
                                                htmlFormatFile += '<option value="Serial" selected="selected">Serial</option><option value="Parallel">Parallel</option></select>';
                                            else
                                                htmlFormatFile += '<option value="Serial">Serial</option><option value="Parallel" selected="selected">Parallel</option></select>';
                                            htmlFormatFile += '</td>';
                                            htmlFormatFile += '<td class="width4 start_workflow">';
                                            if (totalFileCount > 1)
                                                htmlFormatFile += '<img id="imgStageDelete' + totalFileCount + '" src="../Content/Images/icon/delete.png" style="width: 20px" onclick="DeleteStage(this)" />';
                                            else
                                                htmlFormatFile += '<img id="imgStageDelete' + totalFileCount + '" src="../Content/Images/icon/delete.png" style="visibility: hidden; width: 20px" onclick="DeleteStage(this)" />';
                                            htmlFormatFile += '</td>';
                                            htmlFormatFile += '</tr>';

                                            $("#tblStage").append(htmlFormatFile);
                                            var $options = $("#ddlApprovers > option").clone();
                                            $('#ddlAssignTo' + totalFileCount).append($options);
                                            $("#ddlAssignTo" + totalFileCount).chosen().change(function () {
                                                var vasstoid = $(this).attr('id').replace("ddlAssignTo", "");
                                                if ($(this).val() != null) {
                                                    if ($(this).val().length > 1 && (workflowRoutingOptions.indexOf("Allow over-ride of Admin Configuration") >= 0 ||
                                                        workflowRoutingOptions.indexOf("Allow replacing participants") >= 0)) {
                                                        $("#ddlOrder" + vasstoid).prop('disabled', false);
                                                    }
                                                    else {
                                                        $("#ddlOrder" + vasstoid).val("Serial");
                                                        $("#ddlOrder" + vasstoid).prop('disabled', true);
                                                    }
                                                }
                                                else {
                                                    $("#ddlOrder" + vasstoid).val("Serial");
                                                    $("#ddlOrder" + vasstoid).prop('disabled', true);
                                                }
                                            });
                                            GetValuesAndAutoPopulate("ddlAssignTo" + totalFileCount, Participants);
                                            var vParticipantsArr = Participants.split(";");
                                            if (vParticipantsArr.length > 1)
                                                $("#ddlOrder" + totalFileCount).prop('disabled', false);
                                            else
                                                $("#ddlOrder" + totalFileCount).prop('disabled', true);


                                            if (item.WorkflowSettings != null) {
                                                if (workflowRoutingOptions.indexOf("Allow over-ride of Admin Configuration") == -1) {
                                                    if (workflowRoutingOptions.indexOf("Allow replacing participants") == -1) {
                                                        $("#ddlAssignTo" + totalFileCount).prop('disabled', true).trigger("chosen:updated");
                                                        $("#ddlOrder" + totalFileCount).prop('disabled', true);
                                                    }
                                                    $("#txtStage" + totalFileCount).prop('disabled', true);
                                                    $("#imgStageDelete" + totalFileCount).css("visibility", "hidden");
                                                }
                                            }
                                        });
                                    }
                                    else {
                                        if ($("#ddlRule").html() == "") {
                                            $("#ddlRule").append('<option value="Ad-hoc">Ad-hoc</option>');
                                            $("#lblddlRule").css("display", "");
                                            $("#ddlRule").css("display", "none");
                                            $("#lblddlRule").text("Ad-hoc");
                                        }
                                        if (!workflowAdHoc)
                                            $("#ddlRule").attr('disabled', 'disabled');
                                        var totalFileCount = 1;
                                        var htmlFormatFile = '<tr id="trStage' + totalFileCount + '">';
                                        htmlFormatFile += '<td class="width30" style="vertical-align: middle; padding-right: 11px;padding-top: 2px;">';
                                        htmlFormatFile += '<input id="txtStage' + totalFileCount + '" name="Stage' + totalFileCount + '" title="Stage" placeholder="Stage Name" type="text" class="f_inpt width95 validelement" value="Stage ' + totalFileCount + '"/>';
                                        htmlFormatFile += '</td>';
                                        htmlFormatFile += '<td class="width46 v_align_middle" style="padding-top: 2px;">';
                                        htmlFormatFile += '<select id="ddlAssignTo' + totalFileCount + '" name="AssignTo' + totalFileCount + '"  multiple="multiple" data-placeholder="Select" class="width97 a-Workflow-height validmultiselect"></select>';
                                        htmlFormatFile += '</td>';
                                        htmlFormatFile += '<td class="width20" style="vertical-align: middle;">';
                                        htmlFormatFile += '<select id="ddlOrder' + totalFileCount + '" name="Order' + totalFileCount + '"  class="f_inpt width97 height32" disabled="disabled"><option selected="selected">Serial</option><option>Parallel</option></select>';
                                        htmlFormatFile += '</td>';
                                        htmlFormatFile += '<td class="width4">';
                                        htmlFormatFile += '<img src="../Content/Images/icon/delete.png" style="visibility: hidden; width: 20px" onclick="DeleteStage(this)" />';
                                        htmlFormatFile += '</td>';
                                        htmlFormatFile += '</tr>';

                                        $("#tblStage").append(htmlFormatFile);
                                        var $options = $("#ddlApprovers > option").clone();
                                        $('#ddlAssignTo' + totalFileCount).append($options);

                                        $("#ddlAssignTo" + totalFileCount).chosen().change(function () {
                                            var vasstoid = $(this).attr('id').replace("ddlAssignTo", "");
                                            if ($(this).val() != null) {
                                                if ($(this).val().length > 1) {
                                                    $("#ddlOrder" + vasstoid).prop('disabled', false);
                                                }
                                                else {
                                                    $("#ddlOrder" + vasstoid).val("Serial");
                                                    $("#ddlOrder" + vasstoid).prop('disabled', true);
                                                }
                                            }
                                            else {
                                                $("#ddlOrder" + vasstoid).val("Serial");
                                                $("#ddlOrder" + vasstoid).prop('disabled', true);
                                            }
                                        });
                                    }
                                }
                                else {
                                    if ($("#ddlRule").html() == "") {
                                        $("#ddlRule").append('<option value="Ad-hoc">Ad-hoc</option>');
                                        $("#lblddlRule").css("display", "");
                                        $("#ddlRule").css("display", "none");
                                        $("#lblddlRule").text("Ad-hoc");
                                    }
                                    if (!workflowAdHoc)
                                        $("#ddlRule").attr('disabled', 'disabled');
                                    var totalFileCount = 1;
                                    var htmlFormatFile = '<tr id="trStage' + totalFileCount + '">';
                                    htmlFormatFile += '<td class="width30" style="vertical-align: middle; padding-right: 11px;padding-top: 2px;">';
                                    htmlFormatFile += '<input id="txtStage' + totalFileCount + '" name="Stage' + totalFileCount + '" title="Stage" placeholder="Stage Name" type="text" class="f_inpt width95 validelement" value="Stage ' + totalFileCount + '"/>';
                                    htmlFormatFile += '</td>';
                                    htmlFormatFile += '<td class="width46 v_align_middle" style="padding-top: 2px;">';
                                    htmlFormatFile += '<select id="ddlAssignTo' + totalFileCount + '" name="AssignTo' + totalFileCount + '"  multiple="multiple" data-placeholder="Select" class="width97 a-Workflow-height validmultiselect"></select>';
                                    htmlFormatFile += '</td>';
                                    htmlFormatFile += '<td class="width20" style="vertical-align: middle;">';
                                    htmlFormatFile += '<select id="ddlOrder' + totalFileCount + '" name="Order' + totalFileCount + '"  class="f_inpt width97 height32" disabled="disabled"><option selected="selected">Serial</option><option>Parallel</option></select>';
                                    htmlFormatFile += '</td>';
                                    htmlFormatFile += '<td class="width4">';
                                    htmlFormatFile += '<img src="../Content/Images/icon/delete.png" style="visibility: hidden; width: 20px" onclick="DeleteStage(this)" />';
                                    htmlFormatFile += '</td>';
                                    htmlFormatFile += '</tr>';

                                    $("#tblStage").append(htmlFormatFile);
                                    var $options = $("#ddlApprovers > option").clone();
                                    $('#ddlAssignTo' + totalFileCount).append($options);

                                    $("#ddlAssignTo" + totalFileCount).chosen().change(function () {
                                        var vasstoid = $(this).attr('id').replace("ddlAssignTo", "");
                                        if ($(this).val() != null) {
                                            if ($(this).val().length > 1) {
                                                $("#ddlOrder" + vasstoid).prop('disabled', false);
                                            }
                                            else {
                                                $("#ddlOrder" + vasstoid).val("Serial");
                                                $("#ddlOrder" + vasstoid).prop('disabled', true);
                                            }
                                        }
                                        else {
                                            $("#ddlOrder" + vasstoid).val("Serial");
                                            $("#ddlOrder" + vasstoid).prop('disabled', true);
                                        }
                                    });
                                }
                                //ENH492 - Workflow Cycle time Report & default naming of stages.
                                $("#txtStage" + totalFileCount).autocomplete({
                                    source: StageName,
                                    minLength: 1,
                                    focus: function (event, ui) {
                                        return false;
                                    },
                                    select: function (evn, uidetails) {
                                        $("#txtStage" + totalFileCount).val(uidetails.item.label);

                                    }
                                });
                                $("#loadingPage").fadeOut();
                                $("#dvWorkflow").dialog("option", "title", "Document Review Workflow");
                                $("#dvWorkflow").dialog("open");
                                $("#dvWorkflow").height("auto");
                            },
                            error: function () {
                                $("#ddlRule").append('<option value="Ad-hoc">Ad-hoc</option>');
                                $("#lblddlRule").css("display", "");
                                $("#ddlRule").css("display", "none");
                                $("#lblddlRule").text("Ad-hoc");
                                if (!workflowAdHoc)
                                    $("#ddlRule").attr('disabled', 'disabled');
                                var totalFileCount = 1;
                                var htmlFormatFile = '<tr id="trStage' + totalFileCount + '">';
                                htmlFormatFile += '<td class="width30 wf_approval start_workflow">';
                                htmlFormatFile += '<input id="txtStage' + totalFileCount + '" name="Stage' + totalFileCount + '" title="Stage" placeholder="Stage Name" type="text" class="f_inpt width95 validelement" value="Stage ' + totalFileCount + '"/>';
                                htmlFormatFile += '</td>';
                                htmlFormatFile += '<td class="width46 start_workflow">';
                                htmlFormatFile += '<select id="ddlAssignTo' + totalFileCount + '" name="AssignTo' + totalFileCount + '"  multiple="multiple" data-placeholder="Select" class="width97 a-Workflow-height validmultiselect"></select>';
                                htmlFormatFile += '</td>';
                                htmlFormatFile += '<td class="width20 padding_top_3px v_align_top start_workflow">';
                                htmlFormatFile += '<select id="ddlOrder' + totalFileCount + '" name="Order' + totalFileCount + '"  class="f_inpt width97 height32" disabled="disabled"><option selected="selected">Serial</option><option>Parallel</option></select>';
                                htmlFormatFile += '</td>';
                                htmlFormatFile += '<td class="width4 padding_top_10px v_align_top start_workflow">';
                                htmlFormatFile += '<img src="../Content/Images/icon/delete.png" style="visibility: hidden; width: 20px" onclick="DeleteStage(this)" />';
                                htmlFormatFile += '</td>';
                                htmlFormatFile += '</tr>';

                                $("#tblStage").append(htmlFormatFile);
                                var $options = $("#ddlApprovers > option").clone();
                                $('#ddlAssignTo' + totalFileCount).append($options);
                                $("#ddlAssignTo" + totalFileCount).chosen().change(function () {
                                    var vasstoid = $(this).attr('id').replace("ddlAssignTo", "");
                                    if ($(this).val() != null) {
                                        if ($(this).val().length > 1) {
                                            $("#ddlOrder" + vasstoid).prop('disabled', false);
                                        }
                                        else {
                                            $("#ddlOrder" + vasstoid).val("Serial");
                                            $("#ddlOrder" + vasstoid).prop('disabled', true);
                                        }
                                    }
                                    else {
                                        $("#ddlOrder" + vasstoid).val("Serial");
                                        $("#ddlOrder" + vasstoid).prop('disabled', true);
                                    }
                                });
                                //ENH492 - Workflow Cycle time Report & default naming of stages.
                                $("#txtStage" + totalFileCount).autocomplete({
                                    source: StageName,
                                    minLength: 1,
                                    focus: function (event, ui) {
                                        return false;
                                    },
                                    select: function (evn, uidetails) {
                                        $("#txtStage" + totalFileCount).val(uidetails.item.label);

                                    }
                                });
                                $("#loadingPage").fadeOut();
                                $("#dvWorkflow").dialog("option", "title", "Document Review Workflow");
                                $("#dvWorkflow").dialog("open");
                                $("#dvWorkflow").height("auto");
                            }
                        });
                    }

                }

                break;
            }
        case "version": {
            $("#tblVersionHistory").empty();
            $("#loadingPage").fadeIn();
            var documentID = $(el).find("#DocumentID").text();
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/' + documentID + '/versions',
                type: 'GET',
                dataType: 'json',
                "Content-Type": "application/json",
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'RefreshToken': localStorage.RefreshToken },
                cache: false,
                success: function (data) {
                    var datalenght = data.length;
                    for (var i = datalenght - 1 ; i >= 0; i--) {
                        var item = data[i];
                        var formatModifiedDate
                        if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                        { formatModifiedDate = moment(new Date(item.Modified)).utc().format('MM/DD/YYYY'); }
                        else { formatModifiedDate = moment(new Date(item.Modified)).utc().format(localStorage.AppDateFormat); }
                        var article = "";
                        article += '<tr>';
                        article += '<td>' + item.VersionNo + '</td>';
                        article += '<td>' + item.Size + '</td>';
                        article += '<td>' + formatModifiedDate + '</td>';
                        article += '<td>' + item.ModifiedBy + '</td>';
                        article += '</tr>';
                        $("#tblVersionHistory").append(article);
                    }

                    var vCount = data.length;
                    $("#loadingPage").fadeOut();
                    $("#dvVersionHistory").dialog("open");
                },
                error: function () {
                    $("#loadingPage").fadeOut();
                }
            });
            break;
        }
        case "primary":
            {
                swal({
                    title: '',
                    text: "Are you sure you want to mark this document as primary?",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    html: true
                },
     function (confirmed) {
         if (confirmed) {
             $("#loadingPage").fadeIn();
             var entityid = $(el).find("#DocumentID").text();
             $.ajax({
                 url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/MarkPrimary?documentid=' + entityid,
                 type: 'PUT',
                 cache: false,
                 contentType: false,
                 headers: {
                     'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, 'RefreshToken': localStorage.RefreshToken, username: localStorage.UserName
                 },
                 processData: false,
                 success: function (document) {
                     BindContractDetails(vContractID, "allow");
                     //manoj
                     //GetContractPendingAction(true, "BindPeoples");
                     $("#hdnFolderDocumentView").text('');
                     $("#hdnShowAllTextValue").html('');
                     PrvFolderselection = '';
                     //Bind primary and pined document based on new feature
                     if ($("#hdnnewdocumentfeature").text() == "Yes") {
                         CreateDocumentListPinView(vContractID);
                     }
                     //manoj
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
            //manoj
        case 'pin':
            {
                //Check pinning document restriction and allow
                if ($("#hdnPinDocumentCount").text() == "Yes") {
                    swal("", "Contract will allow only 5 document(s) to pin,5 document(s) already pinned");
                } else {
                    swal({
                        title: '',
                        //text: "Are you sure you want to mark this document as <span style=\"font-weight:700\">Pin Document</span>?",
                        text: "Are you sure you want to <span style=\"font-weight:700\">pin</span> this document into summary?",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Yes',
                        cancelButtonText: 'No',
                        html: true
                    },
         function (confirmed) {
             if (confirmed) {
                 $("#loadingPage").fadeIn();
                 var entityid = $(el).find("#DocumentID").text();
                 $.ajax({
                     url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/MarkPinorUnpin?documentid=' + entityid + '&action=pin',
                     type: 'PUT',
                     cache: false,
                     contentType: false,
                     headers: {
                         'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, 'RefreshToken': localStorage.RefreshToken, username: localStorage.UserName
                     },
                     processData: false,
                     success: function (document) {
                         //BindContractDetails(vContractID);
                         //manoj
                         if (documentview == null || documentview == "" || documentview == 'folder') {
                             if ($('#showAll').text() != null && $('#showAll').text() != "" && typeof ($('#showAll').text()) != "undefined") {
                                 var selectedfoldervalue = $('#showAll').find("a");
                                 var textvalueselected = $(selectedfoldervalue)[$(selectedfoldervalue).length - 1].textContent;
                                 var idvalueselected = $(selectedfoldervalue)[$(selectedfoldervalue).length - 1].id;
                                 var parentdocumentdetails = { id: idvalueselected, text: textvalueselected };
                                 showfolderdocuments(parentdocumentdetails);
                             }
                             else {
                                 BindDocument(vContractID);
                             }
                         } else {
                             DisplayDocument(documentview);
                         }
                         //GetContractPendingAction(true, "BindPeoples");
                         $("#hdnFolderDocumentView").text('');
                         $("#hdnShowAllTextValue").html('');
                         PrvFolderselection = '';
                         //Bind primary and pined document based on new feature
                         if ($("#hdnnewdocumentfeature").text() == "Yes") {
                             CreateDocumentListPinView(vContractID);
                         }
                         //manoj
                         $("#loadingPage").fadeOut();
                     },
                     error: function () {
                         $("#loadingPage").fadeOut();
                     }
                 });
             }
             return;
         });
                }

                break;
            }

        case 'unpin':
            {
                swal({
                    title: '',
                    //text: "Are you sure you want to mark this document as <span style=\"font-weight:700\">UnPin</span>?",
                    text: "Are you sure you want to <span style=\"font-weight:700\">unpin</span> this document from summary?",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    html: true
                },
     function (confirmed) {
         if (confirmed) {
             $("#loadingPage").fadeIn();
             var entityid = $(el).find("#DocumentID").text();
             $.ajax({
                 url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/MarkPinorUnpin?documentid=' + entityid + '&action=unpin',
                 type: 'PUT',
                 cache: false,
                 contentType: false,
                 headers: {
                     'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, 'RefreshToken': localStorage.RefreshToken, username: localStorage.UserName
                 },
                 processData: false,
                 success: function (document) {
                     //BindContractDetails(vContractID);
                     //manoj
                     if (documentview == null || documentview == "" || documentview == 'folder') {
                         if ($('#showAll').text() != null && $('#showAll').text() != "" && typeof ($('#showAll').text()) != "undefined") {
                             var selectedfoldervalue = $('#showAll').find("a");
                             var textvalueselected = $(selectedfoldervalue)[$(selectedfoldervalue).length - 1].textContent;
                             var idvalueselected = $(selectedfoldervalue)[$(selectedfoldervalue).length - 1].id;
                             var parentdocumentdetails = { id: idvalueselected, text: textvalueselected };
                             showfolderdocuments(parentdocumentdetails);
                         }
                         else {
                             BindDocument(vContractID);
                         }
                     } else {
                         DisplayDocument(documentview);
                     }
                     //GetContractPendingAction(true, "BindPeoples");
                     $("#hdnFolderDocumentView").text('');
                     $("#hdnShowAllTextValue").html('');
                     PrvFolderselection = '';
                     //Bind primary and pined document based on new feature
                     if ($("#hdnnewdocumentfeature").text() == "Yes") {
                         CreateDocumentListPinView(vContractID);
                     }
                     //manoj
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
            //manoj
    }
}

function tabchange(object) {
    if (object.id == "tabTemplate") {
        if ($("#ddlDocumentTemplate option").length <= 1) {
            swal("", "No templates are assigned to business area.");
        }
        $('input[type="radio"][name="IsStandard"][value="Yes"]').prop('checked', true);
        $("#tblNewDocument").css('display', '');
        $("#tblExistingDocument").css('display', 'none');
        $("#tblExistingDocumentSearch").css('display', 'none');
        $("#tblExistingDocumentPaging").css('display', 'none');
        $("#tblBulkUploadFolders").css('display', 'none');
        $("#tblManageFolders").css('display', 'none');
        $("#tabTemplate").addClass('form-active');
        $("#tabUpload").removeClass('form-active');
        $("#tabExistingDocument").removeClass('form-active');
        $("#tabBulkUpload").removeClass('form-active');
        $("#tabManageFolder").removeClass('form-active');
        $("#docContract").removeClass('validelement');
        $("#docContract").removeClass('validfilename');
        $("#ddlDocumentTemplate").addClass('validelement');
        $("#txtDocumentNameCreate").addClass('validelement');

        $("#trTemplate").css('display', '');
        $("#trTemplate1").css('display', '');
        $("#trDocumentType").css("display", "");
        $("#trFileUpload").css('display', 'none');
        $("#fileUploadOCR").prop('checked', false);
        $("#trfileUploadOCR").css('display', 'none');
        $("#docContract").replaceWith($("#docContract").val('').clone(true));
        $('input:checkbox[name=NotTaggedContract]').attr('checked', false);
        $("#hdnIsDocumentTag").text('');
        $("#formTitle").text('Create from Document Template');
        $("#divDoc1").css('display', '');
        $("#divDoc2").css('display', '');

        if (document.getElementById("trdesc").style.display != "none") {
            //$(".clmoreinfo").toggle();
            $("#linkMoreInfo").click();
        }

        if ($("#ddlDocumentStatus").val() != 0 && $("#ddlDocumentStatus").val() == "Expired") {
            $("#dtValidFrom").val("");
            $("#dtValidTill").val("");

            if (document.getElementById("formValidityForm").style.display != "none") {
                $("#linkAddValidity").click();
            }
            $("#linkAddValidity").css('display', 'none');
            //if ($("#linkAddValidity").text() == "Track document expiration date") {
            //    $("#linkAddValidity").css('display', 'none');
            //}
            //else {
            //    $("#linkAddValidity").click();
            //    $("#linkAddValidity").css('display', 'none');
            //}
        }
        else {
            $("#linkAddValidity").css('display', 'block');
        }
        $("#tabTemplate").addClass("document_active");
        $("#tabUpload").removeClass("document_active");
        $("#tabExistingDocument").removeClass("document_active");
        $("#tabBulkUpload").removeClass('document_active');
        $("#tabManageFolder").removeClass('document_active');
        $("#btnDocAdd").html('<span class="ui-button-text">Create</span>')
        $("#btnDocAdd").css("display", "");
        //manoj
        $("#btnDocCancel").html('<span class="pop_up_Content_Green pop_up_Content_White margin-0px">Cancel</span>');
        //manoj
        if ($("#ddlDocumentTemplate").val() != '0') {
            var selectedtemplatevalue = $("#ddlDocumentTemplate").val().split('~').pop();
            $("#ddlDocumentTypeCreate").find("option[value='" + selectedtemplatevalue + "']").prop("selected", true);
        } else {
            $("#ddlDocumentTypeCreate").find('option[value="0"]').prop("selected", true);
        }
       
    } else if (object.id == "tabUpload") {
        $('input[type="radio"][name="IsStandard"][value="No"]').prop('checked', true);

        $("#tblNewDocument").css('display', '');
        $("#tblExistingDocument").css('display', 'none');
        $("#tblExistingDocumentSearch").css('display', 'none');
        $("#tblExistingDocumentPaging").css('display', 'none');
        $("#tblBulkUploadFolders").css('display', 'none');
        $("#tblManageFolders").css('display', 'none');
        $("#tabUpload").addClass('form-active');
        $("#tabTemplate").removeClass('form-active');
        $("#tabExistingDocument").removeClass('form-active');
        $("#tabBulkUpload").removeClass('form-active');
        $("#tabManageFolder").removeClass('form-active');
        $("#docContract").addClass('validelement');
        $("#docContract").addClass('validfilename');
        $("#ddlDocumentTemplate").removeClass('validelement');
        $("#txtDocumentNameCreate").removeClass('validelement');

        $("#trTemplate").css('display', 'none');
        $("#trTemplate1").css('display', 'none');
        $("#trDocumentType").css("display", "");
        $("#trFileUpload").css('display', '');
        $('input:checkbox[name=NotTaggedContract]').attr('checked', false);
        $("#hdnIsDocumentTag").text('');
        $("#tblContentControls").empty();
        $("#formTitle").text('Upload from Computer');
        $("#divDoc1").css('display', '');
        $("#divDoc2").css('display', '');

        if (document.getElementById("trdesc").style.display != "none") {
            //$(".clmoreinfo").toggle();
            $("#linkMoreInfo").click();
        }

        if ($("#ddlDocumentStatus").val() != 0 && $("#ddlDocumentStatus").val() == "Expired") {
            $("#dtValidFrom").val("");
            $("#dtValidTill").val("");

            if (document.getElementById("formValidityForm").style.display != "none") {
                $("#linkAddValidity").click();
            }
            $("#linkAddValidity").css('display', 'none');
            //if ($("#linkAddValidity").text() == "Track document expiration date") {
            //    $("#linkAddValidity").css('display', 'none');
            //}
            //else {
            //    $("#linkAddValidity").click();
            //    $("#linkAddValidity").css('display', 'none');
            //}
        }
        else {
            $("#linkAddValidity").css('display', 'block');
        }

        $("#tabUpload").addClass("document_active");
        $("#tabTemplate").removeClass("document_active");
        $("#tabExistingDocument").removeClass("document_active");
        $("#tabBulkUpload").removeClass('document_active');
        $("#tabManageFolder").removeClass('document_active');
        $("#btnDocAdd").html('<span class="ui-button-text">Upload</span>')
        $("#btnDocAdd").css("display", "");
        //manoj
        $("#btnDocCancel").html('<span class="pop_up_Content_Green pop_up_Content_White margin-0px">Cancel</span>');
        //manoj
    }
    else if (object.id == "tabExistingDocument") {
        $("#tblNewDocument").css('display', 'none');
        $("#tblExistingDocument").css('display', '');
        $("#tblExistingDocumentSearch").css('display', '');
        $("#tblBulkUploadFolders").css('display', 'none');
        $("#tblManageFolders").css('display', 'none');
        $("#hdnIsDocumentTag").text('Yes');
        $("#tabExistingDocument").addClass('form-active');
        $("#tabUpload").removeClass('form-active');
        $("#tabTemplate").removeClass('form-active');
        $("#tabBulkUpload").removeClass('form-active');
        $("#tabManageFolder").removeClass('form-active');
        $("#tblContentControls").empty();
        $("#formTitle").text('Add from Office 365 Library');
        $("#divDoc1").css('display', 'none');
        $("#divDoc2").css('display', 'none');
        // $("#formValidity").css('display', 'none');
        $("#formValidityForm").css('display', 'none');
        $("#linkAddValidity").css('display', 'none');

        $("#tabExistingDocument").addClass("document_active");
        $("#tabUpload").removeClass("document_active");
        $("#tabTemplate").removeClass("document_active");
        $("#tabBulkUpload").removeClass('document_active');
        $("#tabManageFolder").removeClass('document_active');
        $("#btnDocAdd").html('<span class="ui-button-text">Add</span>')
        $("#btnDocAdd").css("display", "");
        //manoj
        $("#fileUploadOCR").prop('checked', false);
        $("#trfileUploadOCR").css('display', 'none');
        $("#docContract").replaceWith($("#docContract").val('').clone(true));
        $("#btnDocCancel").html('<span class="pop_up_Content_Green pop_up_Content_White margin-0px">Cancel</span>');
        //manoj
        if ($("#tblExistingDocument tr").length == 1 && $("#tblExistingDocument tr")[0].textContent == "No items found.") {
            $("#txtSearchDocument").val("");
            BindDocumentNotTagToContract();
        }
    }

        //manoj
        //For Manage Folder
    else if (object.id == "tabManageFolder") {
        $("#tblNewDocument").css('display', 'none');
        $("#tblExistingDocument").css('display', 'none');
        $("#tblBulkUploadFolders").css('display', 'none');
        $("#tblManageFolders").css('display', '');
        $("#tblExistingDocumentSearch").css('display', 'none');
        $("#tblExistingDocumentPaging").css('display', 'none');
        $("#hdnIsDocumentTag").text('');
        $("#tabExistingDocument").removeClass('form-active');
        $("#tabUpload").removeClass('form-active');
        $("#tabTemplate").removeClass('form-active');
        $("#tabBulkUpload").removeClass('form-active');
        $("#tabManageFolder").addClass('form-active');
        $("#tblContentControls").empty();
        $("#formTitle").text('Manage  Folder(s)');
        $("#divDoc1").css('display', 'none');
        $("#divDoc2").css('display', 'none');
        //$("#formValidity").css('display', 'none');
        $("#formValidityForm").css('display', 'none');
        $("#linkAddValidity").css('display', 'none');

        $("#tabExistingDocument").removeClass("document_active");
        $("#tabUpload").removeClass("document_active");
        $("#tabTemplate").removeClass("document_active");
        $("#tabBulkUpload").removeClass('document_active');
        $("#tabManageFolder").addClass('document_active');

        $("#btnDocAdd").css("display", "none");
        //manoj
        $("#fileUploadOCR").prop('checked', false);
        $("#trfileUploadOCR").css('display', 'none');
        $("#docContract").replaceWith($("#docContract").val('').clone(true));
        $("#btnDocCancel").html('<span class="pop_up_Content_Green pop_up_Content_White margin-0px">Close</span>');
        //manoj
        $("#btnDocAdd").html('<span class="ui-button-text">Add</span>')
        //if ($("#tblExistingDocument tr").length == 1 && $("#tblExistingDocument tr")[0].textContent == "No items found.") {
        //    $("#txtSearchDocument").val("");
        //    BindDocumentNotTagToContract();
        //}
    }
        //For Manage Folder

        //For Bulk Document Upload
    else if (object.id == "tabBulkUpload") {
        $("#tblNewDocument").css('display', 'none');
        $("#tblExistingDocument").css('display', 'none');
        $("#tblManageFolders").css('display', 'none');
        $("#tblBulkUploadFolders").css('display', '');
        $("#tblExistingDocumentSearch").css('display', 'none');
        $("#tblExistingDocumentPaging").css('display', 'none');
        $("#hdnIsDocumentTag").text('');
        $("#tabExistingDocument").removeClass('form-active');
        $("#tabUpload").removeClass('form-active');
        $("#tabTemplate").removeClass('form-active');
        $("#tabManageFolder").removeClass('form-active');
        $("#tabBulkUpload").addClass('form-active');
        $("#tblContentControls").empty();
        $("#formTitle").text('Bulk document(s) upload');
        $("#divDoc1").css('display', 'none');
        $("#divDoc2").css('display', 'none');
        //$("#formValidity").css('display', 'none');
        $("#formValidityForm").css('display', 'none');
        $("#linkAddValidity").css('display', 'none');

        $("#tabExistingDocument").removeClass("document_active");
        $("#tabUpload").removeClass("document_active");
        $("#tabTemplate").removeClass("document_active");
        $("#tabManageFolder").removeClass('document_active');
        $("#tabBulkUpload").addClass('document_active');
        $("#btnDocAdd").css("display", "");
        $("#btnDocAdd").html('<span class="ui-button-text">Upload</span>')
        $("#fileUploadOCR").prop('checked', false);
        $("#trfileUploadOCR").css('display', 'none');
        $("#docContract").replaceWith($("#docContract").val('').clone(true));
        document.getElementById('docManageBulk').addEventListener('change', handleFileSelect, false);
        $(".clManageupload").css('display', 'none');
        //if ($("#tblExistingDocument tr").length == 1 && $("#tblExistingDocument tr")[0].textContent == "No items found.") {
        //    $("#txtSearchDocument").val("");
        //    BindDocumentNotTagToContract();
        //}
    }
    //For Bulk Document Upload
    //manoj

    $('#dtValidFrom').val("");
    $('#dtValidTill').val("");
    //*Harshitha
    if (defaultGlobalSettings != null && defaultGlobalSettings != "") {
        var milestoneReminder = defaultGlobalSettings.MilestoneReminders;
        var xmlDoc = $.parseXML(milestoneReminder);
        var $xml = $(xmlDoc);
        var $reminder = $xml.find("reminder");
        var j = 1;
        $reminder.each(function () {
            var beforeSplit = $(this).text();
            var remSplit = beforeSplit.split(/ +/);
            $("#ddlReminder" + j + "MilestoneNew").val(remSplit[0]);
            $("#txtReminder" + j + "MilestoneNew").val(remSplit[1]);
            j = j + 1;
        });
    }

    if (defaultGlobalSettings != null && defaultGlobalSettings != "") {
        var documentreminders = defaultGlobalSettings.DocumentReminders;
        var xmlDoc = $.parseXML(documentreminders);
        var $xml = $(xmlDoc);
        var $reminder = $xml.find("reminder");
        var j = 1;
        $reminder.each(function () {
            var beforeSplit = $(this).text();
            var remSplit = beforeSplit.split(/ +/);
            $("#ddlReminder" + j + "New").val(remSplit[0]);
            $("#txtReminder" + j + "New").val(remSplit[1]);
            j = j + 1;
        });
    }
}


//[Bug id - eO36327] [Signature: Clear link is not displayed when selecting internal user]
function ClearResetSignee() {
    $("#" + $("#hdUserEmail").val()).val('');
    $("#" + $("#hdUserName").val()).val('');
    $('input:radio[name=SigneeUser]').each(function (i, item) {
        $(item).prop('checked', false);
    });
    //$('input:radio[name=SigneeUser]').attr('checked', false);
    ShowInternalSigneeOther();
    $("#ddlAuthorizeSignRestriction option:first-child").prop("selected", "selected");
}

function SelectedSignee() {
    var vSignee = $("input:radio[name=SigneeUser]:checked");
    var prevSignees = [];
    $('#tblInternalSignees tr td:first-child input').each(function () {
        if ($(this).val() != "")
            prevSignees.push($(this).val());
    });
    var userName = vSignee.val();
    var userEmail = vSignee.attr('title');
    if (userName == "AuthorizeSignRestriction") {
        userName = $('#ddlAuthorizeSignRestriction').val();
        userEmail = $('#ddlAuthorizeSignRestriction option:selected').attr("data-emailvalue");
    }
    if (prevSignees.indexOf(userName) > -1) {
        swal("", "Internal Signee already selected.");
    }
    else {
        $("#" + $("#hdUserEmail").val()).val(userEmail);
        $("#" + $("#hdUserName").val()).val(userName);
        $("#hdUserEmail").val('');
        $("#hdUserName").val('');
        $("#browseSigneeUser").dialog("close");
    }
}


var previousVal;
var previousID;
function ClickedOrder(obj) {
    previousVal = $(obj).val();
    previousID = $(obj).attr('id');
}

function SelectedOrder(obj) {
    var curVal = $(obj).val();
    var curID = $(obj).attr('id');
    $(".SigneeOrder").each(function (index, data) {
        var curVal2 = $(data).val();
        var curID2 = $(data).attr('id');
        if (curVal == curVal2 && previousID != curID2) {
            $(data).val(previousVal);
        }
    });
}

var previousDocVal;
var previousDocID;

function ClickedDocOrder(obj) {

    previousDocVal = $(obj).val();
    previousDocID = $(obj).attr('id');

}


function SelectedDocOrder(obj) {
    var curVal = $(obj).val();
    var curID = $(obj).attr('id');
    $(".DocOrder").each(function (index, data) {
        var curVal2 = $(data).val();
        var curID2 = $(data).attr('id');
        if (curVal == curVal2 && previousDocID != curID2) {
            $(data).val(previousDocVal);
        }
    });
    var docidAry = [];
    var docurlAry = [];
    docidAry = swap($("#hdDocumentID").val().split(';'), previousDocVal - 1, curVal - 1);
    $("#hdDocumentID").val(docidAry.join(";"));
    docurlAry = swap($("#hdDocumentURL").val().split('|'), previousDocVal - 1, curVal - 1);
    $("#hdDocumentURL").val(docurlAry.join("|"));
}

function swap(theArray, index1, index2) {
    var temp = theArray[index2];
    theArray[index2] = theArray[index1];
    theArray[index1] = temp;
    return theArray;
}

function SendForSignature() {
    //manoj
    var Collectemail = "";
    $('#tblSignees input[title="Email"]').each(function (i, item) {
        if ($.trim(item.value) != "") {
            Collectemail += ";" + $.trim(item.value);
        }
    });
    if ($.trim($("#txtInternalSignee1").val()) != "" || $.trim(Collectemail) != "") {
        //manoj
        var vValid = requiredValidator('sendForSignature', true);
        if ($("#hdDocumentID").val() == '') {
            vValid = false;
            swal({ html: true, title: '<i>Error</i>', text: '<b>Select document. </b>' });
        }

        if (vValid) {
            var emailvalue = "";
            arremail = [];
            $('#sendForSignature .validemail').each(function (i, item) {
                if (emailvalue == '') {
                    emailvalue = item.value;
                    if (emailvalue != "")
                        arremail.push(emailvalue.toLowerCase());
                    emailvalue = '';
                }
            });
            recipientsArray = arremail.sort();
            reportRecipientsDuplicate = [];
            for (var j = 0; j < recipientsArray.length - 1; j++) {
                if (recipientsArray[j + 1] == recipientsArray[j]) {
                    reportRecipientsDuplicate.push(recipientsArray[j]);
                    if (reportRecipientsDuplicate.length > 0) {
                        vValid = false;
                    }

                }
            }


            if (vValid && $("#hdDocumentID").val() != '') {
                $("#loadingPage").fadeIn();
                var contractForm = $("#frmSignees *, #frmInternalSignees *").serialize();

                var vAutoStatusChange = $("#chkAutoUpdateStatusSignDoc").is(':checked') ? 'Yes' : 'No';
                contractForm += "&SigneeMsg=" + encodeURIComponent($("#txtSigneeMsg").val());
                contractForm += "&Subject=" + encodeURIComponent($("#txtSubject").val());
                if (RightSignatureFlag) {
                    contractForm += "&ExpIn=" + $("#ddltxtExpIn").val();
                }
                else {
                    contractForm += "&ExpIn=" + $("#txtExpIn").val();
                }

                contractForm += "&DocumentURL=" + encodeURIComponent($("#hdDocumentURL").val());
                contractForm += "&AutoUpdateStatus=" + vAutoStatusChange;
                var ccUsers = $("#ddlCC").val();
                var internalSigneeUsers = '';
                var cc = '';
                var ins = '';
                $(ccUsers).each(function (i, item) {
                    if (cc == '') {
                        cc = item;
                    }
                    else {
                        cc += "; " + item;
                    }
                });
                contractForm += "&CC=" + cc;
                contractForm += "&InternalSignee=" + ins;
                contractForm += "&ConID=" + getParameterByName("ContractID");
                var vDocID = $("#hdDocumentID").val();
                $("#inprocessSendForSignature").css('visibility', 'visible');


                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?documentid=' + vDocID,
                    type: 'POST',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, 'UserName': localStorage.UserName },
                    data: contractForm,
                    cache: false,
                    success: function (person) {
                        var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
                        var vDocLibFeat = $.grep(veContractFeatures, function (n, i) {
                            return (n.RowKey == "26" && n.Status == "ON");
                        });
                        if (vDocLibFeat != null) {
                            if (vDocLibFeat.length > 0) {
                                if (person.split('~')[0] == "AdvancedDocusign") {
                                    window.open(person.split('~')[1]);
                                }
                            }
                        }

                        $("#sendForSignature").dialog("close");
                        ClearSignatureForm();
                        if (vAutoStatusChange == "Yes" && $("#hdIsPrimaryDoc").val() == "Yes") {
                            contractItem.Status = "Awaiting Signatures";
                            contractItem.IsFinalized = "Yes";
                            contractItem.FinalizedBy = localStorage.UserName;
                            ContractTopActions();
                            EnableAllMilestones(getParameterByName("ContractID"));
                        }


                        //manoj
                        if (documentview == null || documentview == "" || documentview == 'folder') {
                            if ($('#showAll').text() != null && $('#showAll').text() != "" && typeof ($('#showAll').text()) != "undefined") {
                                var selectedfoldervalue = $('#showAll').find("a");
                                var textvalueselected = $(selectedfoldervalue)[$(selectedfoldervalue).length - 1].textContent;
                                var idvalueselected = $(selectedfoldervalue)[$(selectedfoldervalue).length - 1].id;
                                var parentdocumentdetails = { id: idvalueselected, text: textvalueselected };
                                showfolderdocuments(parentdocumentdetails);
                            }
                            else {
                                BindDocument(vContractID);
                            }
                        } else {
                            DisplayDocument(documentview);
                        }
                        BindUpdatedContractDetails(vContractID);
                        //GetContractPendingAction(true, "BindPeoples");
                        $("#hdnFolderDocumentView").text('');
                        $("#hdnShowAllTextValue").html('');
                        PrvFolderselection = '';
                        //Bind primary and pined document based on new feature
                        if ($("#hdnnewdocumentfeature").text() == "Yes") {
                            CreateDocumentListPinView(vContractID);
                        }
                        //manoj
                        GetContractActivities(vContractID);
                        $("#loadingPage").fadeOut();
                    },
                    error: function (person) {
                        swal("", person.responseText);
                        $("#loadingPage").fadeOut();
                    },
                    complete: function () {
                        $("#inprocessSendForSignature").css('visibility', 'hidden');
                        $("#loadingPage").fadeOut();
                    }
                });


            }
            else {
                $('#sendForSignature .validemail').each(function (i, item) {
                    for (i = 0; i <= reportRecipientsDuplicate.length; i++) {
                        if (item.value.toLowerCase() == reportRecipientsDuplicate[i]) {
                            var id = item.id;
                            $('#' + id).addClass('error')
                        }
                    }

                });
            }
        }
        //manoj
    } else {
        swal("", "Please add <span style='font-weight:700'>External/Internal signee(s)</span> to send Document for Signature.");
    }
    //manoj
}

function getNameAndEmailSignDocument() {
    $("#loadingPage").fadeIn();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/' + getParameterByName("ContractID") + '/contacts',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            if (data != null) {
                var datalenght = data.length;
                var allInternal = ''
                var iex = 0;
                var iIn = 1;
                var totalFileCount = 0;
                var totalFileCountTaken = 0;
                var uiTakenCount = 2;
                for (var i = 0; i < datalenght; i++) {
                    var item = data[i];
                    totalFileCount++;
                    if (item.InternalOrExternal == "External") {
                        if (iex == 0 && totalFileCountTaken < 5) {
                            iex = 1;
                            totalFileCountTaken += 1;
                            $('#txtSignee1').val(item.ContactName);
                            $('#txtEmail1').val(item.EmailID);
                        }
                        else if (totalFileCountTaken < 5 && iex < 4) {
                            totalFileCountTaken += 1;
                            uiTakenCount += 1;
                            iex += 1;
                            var htmlFormatFile = '<tr id="trSignee' + totalFileCount + '">';
                            htmlFormatFile += '<td class="width40">';
                            htmlFormatFile += '<input id="txtSignee' + totalFileCount + '" value="' + item.ContactName + '" name="SigneeName' + totalFileCount + '" placeholder="Signee Name" title="Signee Name" type="text" class="f_inpt width90" value="' + item.ContactName + '" />';
                            htmlFormatFile += '</td>';
                            htmlFormatFile += '<td class="width40">';
                            htmlFormatFile += '<input id="txtEmail' + totalFileCount + '" value="' + item.EmailID + '" name="SigneeEmail' + totalFileCount + '" placeholder="Signee Email" title="Signee Email" type="text" class="f_inpt width90 validelement validemail" value="' + item.EmailID + '" />';
                            htmlFormatFile += '</td>';
                            htmlFormatFile += '<td class="width20">';
                            htmlFormatFile += '<select id="ddlSigneeOrder' + totalFileCount + '" name="SigneeOrder' + totalFileCount + '" onclick="ClickedOrder(this);" onchange="SelectedOrder(this);" class="f_inpt width100 SigneeOrder">';
                            htmlFormatFile += '<option value="1">1</option>';
                            htmlFormatFile += '<option value="2">2</option>';
                            htmlFormatFile += '<option value="3">3</option>';
                            htmlFormatFile += '<option value="4">4</option>';
                            htmlFormatFile += '<option value="5">5</option>';
                            htmlFormatFile += '</select>';
                            htmlFormatFile += '</td>';
                            htmlFormatFile += '<td style="width:20px">';
                            htmlFormatFile += '<a href="javascript:void(0)" onclick="DeleteSignee(this)"><img src="../Content/Images/icon/delete.png" /></a>';
                            htmlFormatFile += '</td>';
                            htmlFormatFile += '</tr>';
                            $("#tblSignees").append(htmlFormatFile);
                            $("#ddlSigneeOrder" + totalFileCount).val(uiTakenCount);
                        }
                    }
                    else {
                        if ($("#tblSigneeUser").find('li').length > 0) {
                            $("#tblSigneeUser").find('li').each(function () {
                                var inputval = ($(this).find('input').length > 0 ? $(this).find('input').val() : "");
                                if (inputval != "" && inputval == item.ContactName) {
                                    if (iIn == 1 && totalFileCountTaken < 5 && iIn < 5) {
                                        iIn = 2;
                                        totalFileCountTaken += 1;
                                        //$("#txtInternalSignee1").val(item.ContactName);
                                        $("#txtInternalEmail1").val(item.EmailID);
                                    }
                                    else if (totalFileCountTaken < 5 && iIn < 5) {
                                        AddInternalSignee();
                                        uiTakenCount += 1;
                                        totalFileCountTaken += 1;
                                        //$("#txtInternalSignee" + iIn).val(item.ContactName);
                                        $("#txtInternalEmail" + iIn).val(item.EmailID);
                                        iIn += 1;
                                    }
                                }
                            })

                        }
                        else {
                            var GetAuthorizedsignatory = '';
                            if (contractItem != "" && contractItem.CompanyProfile != "" && contractItem.CompanyProfile != "" && contractItem.CompanyProfile != "undefined")
                                GetAuthorizedsignatory = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/users/authorizedsignatory?contractid=' + getParameterByName("ContractID") + '&contractareaname=';
                            else
                                GetAuthorizedsignatory = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/users/authorizedsignatory?contractid=&contractareaname=' + encodeURIComponent($("#lblContractArea").text());
                            $.ajax({
                                url: GetAuthorizedsignatory,
                                type: 'GET',
                                dataType: 'json',
                                'Content-Type': 'application/json',
                                cache: false,
                                async: false,
                                headers: { 'eContracts-ApiKey': localStorage.APIKey },
                                success: function (data) {
                                    var v = $(data).length;
                                    var datalenght = data.length;
                                    for (var i = 0; i < datalenght; i++) {
                                        var itemin = data[i];
                                        var sRowKey = itemin.RowKey;
                                        var sUserName = itemin.UserName;
                                        var sEmail = itemin.EmailID;
                                        var nospaceUserName = sUserName.replace(/ /g, "_");
                                        var sUser = '<li>';
                                        sUser += '<input id="' + sEmail + '_' + nospaceUserName + '" title="' + sEmail + '" type="radio" name="SigneeUser" class="css-checkbox" value="' + sUserName + '" />';
                                        sUser += '<label for="' + sEmail + '_' + nospaceUserName + '" class="css-label">' + sUserName + '</label>';

                                        sUser += '</li>';
                                        $("#tblSigneeUser").append(sUser);
                                    }
                                    $("#tblSigneeUser").find('li').each(function () {
                                        var inputval = ($(this).find('input').length > 0 ? $(this).find('input').val() : "");
                                        if (inputval != "" && inputval == item.ContactName) {
                                            if (iIn == 1 && totalFileCountTaken < 5 && iIn < 5) {
                                                iIn = 2;
                                                totalFileCountTaken += 1;
                                                //$("#txtInternalSignee1").val(item.ContactName);
                                                $("#txtInternalEmail1").val(item.EmailID);
                                            }
                                            else if (totalFileCountTaken < 5 && iIn < 5) {
                                                AddInternalSignee();
                                                uiTakenCount += 1;
                                                totalFileCountTaken += 1;
                                                //$("#txtInternalSignee" + iIn).val(item.ContactName);
                                                $("#txtInternalEmail" + iIn).val(item.EmailID);
                                                iIn += 1;
                                            }
                                        }
                                    })
                                },
                                error:
                                    function (data) {

                                    }
                            });
                        }
                    }
                }
                if (uiTakenCount >= 5) {
                    $("#spAddSignee").css("display", "none");
                    $("#spAddInternalSignee").css("display", "none");
                }
                else {
                    $("#spAddSignee").css("display", "");
                    $("#spAddInternalSignee").css("display", "");
                }
            }
        },
        error: function () {
        },
        complete: function () {
            $("#loadingPage").fadeOut();
        }

    });
}

function AddSignee() {
    var vLastRow = $("#tblSignees tr:last").attr('id');
    var totalFileCount = "2";
    if (typeof vLastRow == "undefined") {
        totalFileCount = "2";
    }
    else {
        totalFileCount = parseInt(vLastRow.replace("trSignee", ""));
        totalFileCount += 1;
    }
    var vLastRowC = $("#tblSignees tr").length + $("#tblInternalSignees tr").length;
    var totalFileCountC = 2;
    if (typeof vLastRowC == "undefined") {
        totalFileCountC = 2;
    }
    else {

        totalFileCountC = vLastRowC;
    }
    if (totalFileCountC < 5) {
        var htmlFormatFile = '<tr id="trSignee' + totalFileCount + '">';
        htmlFormatFile += '<td class="width40">';
        htmlFormatFile += '<input id="txtSignee' + totalFileCount + '" maxlength="42" name="SigneeName' + totalFileCount + '" placeholder="Signee Name" title="Signee Signee" type="text" class="f_inpt width90" />';
        htmlFormatFile += '</td>';
        htmlFormatFile += '<td class="width40">';
        htmlFormatFile += '<input id="txtEmail' + totalFileCount + '" maxlength="50" name="SigneeEmail' + totalFileCount + '" placeholder="Signee Email" title="Signee Email" type="text" class="f_inpt width90 validemail" />';
        htmlFormatFile += '</td>';
        htmlFormatFile += '<td class="width20">';
        htmlFormatFile += '<select id="ddlSigneeOrder' + totalFileCount + '" name="SigneeOrder' + totalFileCount + '" onclick="ClickedOrder(this);" onchange="SelectedOrder(this);" class="f_inpt width100 SigneeOrder">';
        htmlFormatFile += '<option value="1" selected="selected">1</option>';
        htmlFormatFile += '<option value="2">2</option>';
        htmlFormatFile += '<option value="3">3</option>';
        htmlFormatFile += '<option value="4">4</option>';
        htmlFormatFile += '<option value="5">5</option>';
        htmlFormatFile += '</select>';
        htmlFormatFile += '</td>';
        htmlFormatFile += '<td style="width:20px">';
        htmlFormatFile += '<a href="javascript:void(0)" onclick="DeleteSignee(this)"><img src="../Content/Images/icon/delete.png" /></a>';
        htmlFormatFile += '</td>';
        htmlFormatFile += '</tr>';

        $("#tblSignees").append(htmlFormatFile);

        var rowCount = $("#tblSignees tr").length + $("#tblInternalSignees tr").length;
        $("#ddlSigneeOrder" + totalFileCount).val(rowCount);
        if (rowCount >= 5) {
            $("#spAddSignee").css("display", "none");
            $("#spAddInternalSignee").css("display", "none");
        }
        else {
            $("#spAddSignee").css("display", "");
            $("#spAddInternalSignee").css("display", "");
        }
    }
    else {
        $("#spAddSignee").css("display", "");
        $("#spAddInternalSignee").css("display", "");
    }
}

function DeleteSignee(n) {
    var vv = $(n.parentNode.parentNode).find('select');
    var curVal = 0;
    if (typeof vv != 'undefined') {
        curVal = parseInt(vv.val());
    }
    n.parentNode.parentNode.parentNode.removeChild(n.parentNode.parentNode);
    $("#spAddSignee").css("display", "");
    $("#spAddInternalSignee").css("display", "");
    $(".SigneeOrder").each(function (index, data) {
        var curVal2 = parseInt($(data).val());
        if (curVal2 > curVal) {
            $(data).val(curVal2 - 1);
        }
    });
}

function AddInternalSignee() {
    var vLastRow = $("#tblInternalSignees tr:last").attr('id');
    var totalFileCount = "2";
    if (typeof vLastRow == "undefined") {
        totalFileCount = "2";
    }
    else {
        totalFileCount = parseInt(vLastRow.replace("trInternalSignee", ""));
        totalFileCount += 1;
    }
    var vLastRowC = $("#tblSignees tr").length + $("#tblInternalSignees tr").length;
    var totalFileCountC = 2;
    if (typeof vLastRowC == "undefined") {
        totalFileCountC = 2;
    }
    else {

        totalFileCountC = vLastRowC;
    }
    if (totalFileCountC < 5) {
        var htmlFormatFile = '<tr id="trInternalSignee' + totalFileCount + '">';
        htmlFormatFile += '<td class="width80">';
        htmlFormatFile += '<input id="txtInternalSignee' + totalFileCount + '" name="InternalSigneeName' + totalFileCount + '" readonly="readonly" placeholder="Signee Name" title="Signee" type="text" class="f_inpt width80"  readonly="readonly" />';
        htmlFormatFile += '<span class="right-float"><a href="javascript:void(0)" onclick="BrowseInternalSignee(\'txtInternalSignee' + totalFileCount + '\', \'txtInternalEmail' + totalFileCount + '\')" class="linkText">Browse</a></span>';
        htmlFormatFile += '</td>';
        htmlFormatFile += '<td style="display:none;">';
        htmlFormatFile += '<input id="txtInternalEmail' + totalFileCount + '" name="InternalSigneeEmail' + totalFileCount + '" placeholder="Signee Email" title="Email" type="text" class="f_inpt width90 validemail" />';
        htmlFormatFile += '</td>';
        htmlFormatFile += '<td class="width20">';
        htmlFormatFile += '<select id="ddlInternalSigneeOrder' + totalFileCount + '" name="InternalSigneeOrder' + totalFileCount + '" onclick="ClickedOrder(this);" onchange="SelectedOrder(this);" class="f_inpt width100 SigneeOrder validelement">';
        htmlFormatFile += '<option value="1" selected="selected">1</option>';
        htmlFormatFile += '<option value="2">2</option>';
        htmlFormatFile += '<option value="3">3</option>';
        htmlFormatFile += '<option value="4">4</option>';
        htmlFormatFile += '<option value="5">5</option>';
        htmlFormatFile += '</select>';
        htmlFormatFile += '</td>';
        htmlFormatFile += '<td style="width:20px">';
        htmlFormatFile += '<a href="javascript:void(0)" onclick="DeleteInternalSignee(this)"><img src="../Content/Images/icon/delete.png" /></a>';
        htmlFormatFile += '</td>';
        htmlFormatFile += '</tr>';

        $("#tblInternalSignees").append(htmlFormatFile);

        var rowCount = $("#tblSignees tr").length + $("#tblInternalSignees tr").length;
        $("#ddlInternalSigneeOrder" + totalFileCount).val(rowCount);
        if (rowCount >= 5) {
            $("#spAddSignee").css("display", "none");
            $("#spAddInternalSignee").css("display", "none");
        }
        else {
            $("#spAddSignee").css("display", "");
            $("#spAddInternalSignee").css("display", "");
        }
    }
    else {
        $("#spAddSignee").css("display", "");
        $("#spAddInternalSignee").css("display", "");
    }
}

function DeleteInternalSignee(n) {
    var vv = $(n.parentNode.parentNode).find('select');
    var curVal = 0;
    if (typeof vv != 'undefined') {
        curVal = parseInt(vv.val());
    }
    n.parentNode.parentNode.parentNode.removeChild(n.parentNode.parentNode);
    $("#spAddSignee").css("display", "");
    $("#spAddInternalSignee").css("display", "");
    $(".SigneeOrder").each(function (index, data) {
        var curVal2 = parseInt($(data).val());
        if (curVal2 > curVal) {
            $(data).val(curVal2 - 1);
        }
    });
}

function BrowseInternalSignee(objName, objEmail) {
    $("#hdUserName").val(objName);
    $("#hdUserEmail").val(objEmail);
    var selectedID = $("#" + $("#hdUserEmail").val()).val();
    if ($("#tblSigneeUser li").length > 0) {
        $("#browseSigneeUser").dialog("option", "title", "Select Signee");
        if (selectedID != "") {
            var nospaceUserName = $("#" + $("#hdUserName").val()).val().replace(/ /g, "_");
            if ($('input:radio[name=SigneeUser][id="' + selectedID + '_' + nospaceUserName + '"]').length > 0) { //eO310538
                $('input:radio[name=SigneeUser][id="' + selectedID + '_' + nospaceUserName + '"]').prop('checked', 'checked'); //eO39958
                $("#ddlAuthorizeSignRestriction option:first-child").prop("selected", "selected"); //eO310538
                $('#ddlAuthorizeSignRestriction').css('display', 'none');
            }
            else {
                $('input:radio[name=SigneeUser][id="rad_AuthorizeSignRestriction"]').prop('checked', 'checked');
                $('#ddlAuthorizeSignRestriction').val($("#" + $("#hdUserName").val()).val()); //eO310538
                $('#ddlAuthorizeSignRestriction').css('display', '');
            }
        }
        else {
            $('input:radio[name=SigneeUser]').prop('checked', false); //eO39958
            $('#ddlAuthorizeSignRestriction').css('display', 'none'); //eO310538
        }
        $("#browseSigneeUser").dialog("open");
    } else {

        BindAuthorizedSignatory(vContractID, $("#lblContractArea").text(), $("#lblContractType").text());//Authorize Signatory Enhancment

    }
}


function BindAuthorizedSignatory(contractid, contractareaname, contracttype) {
    $("#loadingPage").fadeIn();
    //Authorize Signatory Enhancment
    var GetAuthorizedsignatory = '';
    if (setting_AuthorizeSign == "By Contract Type") {
        GetAuthorizedsignatory = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/users/authorizedsignatory?contractid=&contractareaname=&contracttype=' + encodeURIComponent(contracttype);
    }
    else if (setting_AuthorizeSign == "None") {
        GetAuthorizedsignatory = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/users/authorizedsignatory?contractid=&contractareaname=&contracttype=';
    }//Authorize Signatory Enhancment
    else {
        if (contractItem != "" && contractItem.CompanyProfile != "" && contractItem.CompanyProfile != "undefined")
            GetAuthorizedsignatory = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/users/authorizedsignatory?contractid=' + contractid + '&contractareaname=&contracttype=';
        else
            GetAuthorizedsignatory = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/users/authorizedsignatory?contractid=&contractareaname=' + encodeURIComponent(contractareaname) + '&contracttype=';
    }

    $.ajax({
        url: GetAuthorizedsignatory,
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
                var sEmail = item.EmailID;
                var nospaceUserName = sUserName.replace(/ /g, "_");
                var sUser = '<li>';
                sUser += '<input id="' + sEmail + '_' + nospaceUserName + '" title="' + sEmail + '" type="radio" name="SigneeUser" class="css-checkbox" value="' + sUserName + '" />';
                sUser += '<label for="' + sEmail + '_' + nospaceUserName + '" class="css-label">' + sUserName + '</label>';

                sUser += '</li>';
                $("#tblSigneeUser").append(sUser);
            }
            //Authorize Signatory Enhancment
            if (setting_AuthorizeSignRestriction == "No") {
                var sUser = '<li>';
                sUser += '<input id="rad_AuthorizeSignRestriction" type="radio" name="SigneeUser" class="css-checkbox" onclick="ShowInternalSigneeOther()" value="AuthorizeSignRestriction" />';
                sUser += '<label for="rad_AuthorizeSignRestriction" class="css-label" onclick="ShowInternalSigneeOther()">Other</label><br/>';
                sUser += '<select id="ddlAuthorizeSignRestriction" name="Status" class="f_inpt" style="display: none;"></select>';
                sUser += '</li>';
                $("#tblSigneeUser").append(sUser);
                var $options = "<option value=''>--Select--</option>" + $("#ddlDocumentShareInternal").html();
                //var $options = $("#ddlDocumentShareInternal > option").clone();
                $('#ddlAuthorizeSignRestriction').html($options);
            }
            //Authorize Signatory Enhancment

            $("#loadingPage").fadeOut();
            $("#browseSigneeUser").dialog("option", "title", "Select Signee");
            $("#browseSigneeUser").dialog("open");
        },
        error:
            function (data) {
                //Authorize Signatory Enhancment
                if (setting_AuthorizeSignRestriction == "No") {
                    var sUser = '<li>';
                    sUser += '<input id="rad_AuthorizeSignRestriction" type="radio" name="SigneeUser" class="css-checkbox" onclick="ShowInternalSigneeOther()" value="AuthorizeSignRestriction" />';
                    sUser += '<label for="rad_AuthorizeSignRestriction" class="css-label" onclick="ShowInternalSigneeOther()">Other</label><br/>';
                    sUser += '<select id="ddlAuthorizeSignRestriction" name="Status" class="f_inpt" style="display: none;"></select>';
                    sUser += '</li>';
                    $("#tblSigneeUser").append(sUser);
                    var $options = "<option value=''>--Select--</option>" + $("#ddlDocumentShareInternal").html();
                    //var $options = $("#ddlDocumentShareInternal > option").clone();
                    $('#ddlAuthorizeSignRestriction').html($options);
                }//Authorize Signatory Enhancment
                else {
                    var sUser = '<li>';
                    sUser += 'No items found.';
                    sUser += '</li>';
                    $("#tblSigneeUser").append(sUser);
                }
                $("#loadingPage").fadeOut();
                $("#browseSigneeUser").dialog("option", "title", "Select Signee");
                $("#browseSigneeUser").dialog("open");
            }
    });
}

function ClearSignatureForm() {
    $("#hdDocumentID").val('');
    $("#hdDocumentURL").val('');
    $("#hdMarkAsFinal").val('');
    $("#txtSubject").val('');
    $("#txtSigneeMsg").val('');
    $("#txtExpIn").val('');
    $("#spAddSignee").css("display", "");
    $("#spAddInternalSignee").css("display", "");
    GetValuesAndAutoPopulate("ddlCC", "");
    $('#chkAutoUpdateStatusSignDoc').attr('checked', true);
    $('#tblSignees').empty();
    var vSignee = '<tr>';
    vSignee += '<td class="width40">';
    vSignee += '<input id="txtSignee1" name="SigneeName1" title="Signee" placeholder="Signee Name" type="text" class="f_inpt width90" />';
    vSignee += '</td>';
    vSignee += '<td class="width40">';
    vSignee += '<input id="txtEmail1" name="SigneeEmail1" title="Email" placeholder="Signee Email" type="text" class="f_inpt width90 validemail" />';
    vSignee += '</td>';
    vSignee += '<td class="width20">';
    vSignee += '<select id="ddlSigneeOrder1" name="SigneeOrder1" onclick="ClickedOrder(this);" onchange="SelectedOrder(this);" class="f_inpt width100 SigneeOrder">';
    vSignee += '<option value="1" selected="selected">1</option>';
    vSignee += '<option value="2">2</option>';
    vSignee += '<option value="3">3</option>';
    vSignee += '<option value="4">4</option>';
    vSignee += '<option value="5">5</option>';
    vSignee += '</select>';
    vSignee += '</td>';
    vSignee += '<td style="width:20px"><img src="../Content/Images/icon/delete.png" style="visibility:hidden; width: 20px" /></td>';
    vSignee += '</tr>';
    $('#tblSignees').html(vSignee);
    $('#tblInternalSignees').empty();
    vSignee = '<tr>';
    vSignee += '<td class="width80">';
    vSignee += '<input id="txtInternalSignee1" name="InternalSigneeName1" placeholder="Signee Name" title="Signee" type="text" class="f_inpt width80"  readonly="readonly" />';
    vSignee += '<span class="right-float"><a href="javascript:void(0)" class="linkText" onclick="BrowseInternalSignee(\'txtInternalSignee1\', \'txtInternalEmail1\')">Browse</a></span>';
    vSignee += '</td>';
    vSignee += '<td style="display:none;">';
    vSignee += '<input id="txtInternalEmail1" name="InternalSigneeEmail1" placeholder="Signee Email" title="Email" type="text" class="f_inpt width90" />';
    vSignee += '</td>';
    vSignee += '<td class="width20">';
    vSignee += '<select id="ddlInternalSigneeOrder1" name="InternalSigneeOrder1" onclick="ClickedOrder(this);" onchange="SelectedOrder(this);" class="f_inpt width100 SigneeOrder validelement">';
    vSignee += '<option value="1">1</option>';
    vSignee += '<option value="2" selected="selected">2</option>';
    vSignee += '<option value="3">3</option>';
    vSignee += '<option value="4">4</option>';
    vSignee += '<option value="5">5</option>';
    vSignee += '</select>';
    vSignee += '</td>';
    vSignee += '<td style="width:20px">';
    vSignee += '<img src="../Content/Images/icon/delete.png" style="visibility:hidden; width: 20px" />';
    vSignee += '</td>';
    vSignee += '</tr>';
    $("#tblInternalSignees").append(vSignee);
}

function AddShareDocument() {
    var vLastRow = $("#tblShareDocument tr:last").attr('id');
    var count = $("#tblShareDocument tr").length;
    var totalFileCount = 2;
    if (typeof vLastRow == "undefined") {
        totalFileCount = 2;
    }
    else {
        totalFileCount = parseInt(vLastRow.replace("trShareDocument", ""));
        totalFileCount = parseInt(totalFileCount) + 1;
    }
    if (count <= 9) {
        var htmlFormatFile = '<tr id="trShareDocument' + totalFileCount + '">';
        htmlFormatFile += '<td>';
        htmlFormatFile += '<input id="txtShareDocument' + totalFileCount + '" maxlength="42" name="ShareDocumentName' + totalFileCount + '" placeholder="Name" maxlength="50" title="Name" type="text" class="f_inpt width90 validelement" />';
        htmlFormatFile += '</td>';
        htmlFormatFile += '<td>';
        htmlFormatFile += '<input id="txtShareDocumentEmail' + totalFileCount + '" maxlength="50" name="ShareDocumentEmail' + totalFileCount + '" placeholder="Email ID" maxlength="100" title="Email Id" type="text" class="f_inpt width90 validelement validemail" />';
        htmlFormatFile += '</td>';
        htmlFormatFile += '<td style="width:20px">';
        htmlFormatFile += '<a href="javascript:void(0)" onclick="DeleteShareDocument(this)"><img src="../Content/Images/icon/delete.png" /></a>';
        htmlFormatFile += '</td>';
        htmlFormatFile += '</tr>';

        $("#tblShareDocument").append(htmlFormatFile);
        if (count == 9) {
            $(".addmorelinks").hide();
        }
    }

}

function DeleteShareDocument(n) {
    n.parentNode.parentNode.parentNode.removeChild(n.parentNode.parentNode);
    $(".addmorelinks").show();
}
function ShareDocument() {
    var vValid = requiredValidator('shareDocument');
    if (vValid) {
        var emailvalue = "";
        arremail = [];
        $('#shareDocument .validemail').each(function (i, item) {
            if (emailvalue == '') {
                emailvalue = item.value;
                if (emailvalue != "")
                    arremail.push(emailvalue.toLowerCase());
                emailvalue = '';
            }
        });

        recipientsArray = arremail.sort();
        reportRecipientsDuplicate = [];
        for (var j = 0; j < recipientsArray.length - 1; j++) {
            if (recipientsArray[j + 1] == recipientsArray[j]) {
                reportRecipientsDuplicate.push(recipientsArray[j]);
                if (reportRecipientsDuplicate.length > 0) {
                    vValid = false;
                }
            }
        }

        var notify = $("#ddlDocumentShareInternal").chosen().find("option:selected");
        var notyEmail = "";
        var InternalEmail = [];
        $(notify).each(function (i, item) {
            var email = $(item).attr("data-emailvalue");
            if (email != null && email.trim() != "") {
                InternalEmail.push(email.toLowerCase());
                var name = item.text;
                notyEmail += name + "~" + email.trim() + ";";
            }
        });
        var commonEmail = $.grep(arremail, function (element) {
            return $.inArray(element.toLowerCase(), InternalEmail) !== -1;
        });

        if (vValid && commonEmail.length == 0) {
            $("#loadingPage").fadeIn();
            var vAutoStatusChange = $("#chkAutoUpdateStatusShareDoc").is(':checked') ? 'Yes' : 'No';
            var contractForm = $("#frmShareDocument *").serialize();
            contractForm += "&SendBy=" + localStorage.UserName;
            contractForm += "&Notes=" + encodeURIComponent($("#txtShareNotes").val());
            contractForm += "&ExpIn=" + $("#txtShareExpIn").val();
            contractForm += "&AllowComment=" + 'Yes';
            contractForm += "&AllowDownload=" + 'Yes';
            contractForm += "&AllowUpload=" + 'Yes';
            contractForm += "&AutoUpdateStatus=" + vAutoStatusChange;
            var notify = $("#ddlDocumentShareInternal").chosen().find("option:selected");
            var notyEmail = "";

            $(notify).each(function (i, item) {
                var email = $(item).attr("data-emailvalue");
                if (email != null && email.trim() != "") {

                    var name = item.text;
                    notyEmail += name + "~" + email.trim() + ";";
                }
            });

            contractForm += "&InternalUsers=" + notyEmail;
            if ($("#chkDisclose").is(':checked')) {
                contractForm += "&Disclose=Yes";
            } else {
                contractForm += "&Disclose=No";
            }
            var vDocID = $("#hdDocumentID").val();
            //$("#inprocessShareDocument").css('visibility', 'visible');
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/Share?documentid=' + vDocID,
                type: 'POST',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                data: contractForm,
                cache: false,
                success: function (person) {
                    $("#shareDocument").dialog("close");
                    $("#loadingPage").fadeOut();
                    if ((vAutoStatusChange == "Yes" && $("#hdIsPrimaryDoc").val() == "Yes") && contractItem.IsFinalized != "Yes") {
                        contractItem.Status = "In Negotiation";
                    }
                    ContractTopActions();
                    //manoj
                    if (documentview == null || documentview == "" || documentview == 'folder') {
                        if ($('#showAll').text() != null && $('#showAll').text() != "" && typeof ($('#showAll').text()) != "undefined") {
                            var selectedfoldervalue = $('#showAll').find("a");
                            var textvalueselected = $(selectedfoldervalue)[$(selectedfoldervalue).length - 1].textContent;
                            var idvalueselected = $(selectedfoldervalue)[$(selectedfoldervalue).length - 1].id;
                            var parentdocumentdetails = { id: idvalueselected, text: textvalueselected };
                            showfolderdocuments(parentdocumentdetails);
                        }
                        else {
                            BindDocument(vContractID);
                        }
                    } else {
                        DisplayDocument(documentview);
                    }
                    //GetContractPendingAction(true, "BindPeoples");
                    $("#hdnFolderDocumentView").text('');
                    $("#hdnShowAllTextValue").html('');
                    PrvFolderselection = '';
                    //Bind primary and pined document based on new feature
                    if ($("#hdnnewdocumentfeature").text() == "Yes") {
                        CreateDocumentListPinView(vContractID);
                    }
                    //manoj
                    ClearShareForm();
                    GetContractActivities(vContractID);
                },
                error: function (person) {
                    $("#loadingPage").fadeOut();
                },
                complete: function () {
                    //$("#inprocessShareDocument").css('visibility', 'hidden');
                }
            });
        }
        else {
            if (commonEmail.length > 0) {
                swal("", commonEmail.toString().trim() + " are same with internal user.");
            }
            $('#shareDocument .validemail').each(function (i, item) {
                for (i = 0; i <= reportRecipientsDuplicate.length; i++) {
                    if (item.value.toLowerCase() == reportRecipientsDuplicate[i]) {
                        var id = item.id;
                        $('#' + id).addClass('error')
                    }
                }
            });
        }
    }
}

function ClearShareForm() {
    $("#hdDocumentID").val('');
    $("#txtShareNotes").val('');
    //$("#txtShareExpIn").val('3');
    $("#txtShareExpIn").val('');
    $('#tblShareDocument').empty();
    $('#tblShareDocument').empty();
    GetValuesAndAutoPopulate("ddlDocumentShareInternal", "");
    $('#chkAutoUpdateStatusShareDoc').attr('checked', false);
    if (contractItem.IsFinalized == 'Yes') {
        $("#trAutoUpdateStatusShareDoc").css('display', 'none');
    } else {
        $("#trAutoUpdateStatusShareDoc").css('display', 'none');
    }
    $('#chkDisclose').attr('checked', false);
    var vSignee = '<tr>';
    vSignee += '<td>';
    vSignee += '<input id="txtShareDocument1" name="ShareDocumentName1" maxlength="42" title="Name" placeholder="Name" type="text" class="f_inpt width90 validelement" />';
    vSignee += '</td>';
    vSignee += '<td>';
    vSignee += '<input id="txtShareDocumentEmail1" name="ShareDocumentEmail1" maxlength="50" title="Email ID" placeholder="Email ID" type="text" class="f_inpt width90 validelement validemail" />';
    vSignee += '</td>';
    vSignee += '<td style="width:20px">&nbsp;</td>';
    vSignee += '</tr>';
    $('#tblShareDocument').html(vSignee);
}


//*harshitha
function SendCopy() {
    var vValid = requiredValidator('sendCopyPopUp');
    if (vValid) {

        var emailvalue = "";
        arremail = [];
        $('#sendCopyPopUp .validemail').each(function (i, item) {
            if (emailvalue == '') {
                emailvalue = item.value;
                if (emailvalue != "")
                    arremail.push(emailvalue.toLowerCase());
                emailvalue = '';
            }

        });

        recipientsArray = arremail.sort();
        reportRecipientsDuplicate = [];
        for (var j = 0; j < recipientsArray.length - 1; j++) {
            if (recipientsArray[j + 1] == recipientsArray[j]) {
                reportRecipientsDuplicate.push(recipientsArray[j]);
                if (reportRecipientsDuplicate.length > 0) {
                    vValid = false;
                }

            }
        }
        if (vValid) {
            $("#loadingPage").fadeIn();
            var nicInstance = nicEditors.findEditor('txtSendCopyNotes');
            var vcommentText = CleanWordFormatFromHTML(nicInstance.getContent());
            var vNoteTextCount = vcommentText.replace(/<\/?[^>]+(>|$)/g, "");
            if (vNoteTextCount.length <= 26500) {
                vcommentText = encodeURIComponent(vcommentText);
                var contractForm = $("#frmSendCopy *").serialize();


                contractForm += "&SendBy=" + localStorage.UserName;
                contractForm += "&Notes=" + vcommentText;
                var vDocID = $("#ddlDocumentList").val();
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contracts/' + vContractID + '/SendCopy?documentid=' + vDocID,
                    type: 'POST',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                    data: contractForm,
                    cache: false,
                    success: function (person) {
                        swal("", "Copy Sent.");
                        $("#sendCopyPopUp").dialog("close");
                        $("#loadingPage").fadeOut();
                        ClearSendCopyForm();
                    },
                    error: function (person) {
                        $("#loadingPage").fadeOut();
                    },
                    complete: function () {

                    }
                });
            }
            else {
                $("#loadingPage").fadeOut();
                swal("", "Note can not exceed 26500 characters");
            }
        }
        else {
            $('#sendCopyPopUp .validemail').each(function (i, item) {
                for (i = 0; i <= reportRecipientsDuplicate.length; i++) {
                    if (item.value.toLowerCase() == reportRecipientsDuplicate[i]) {
                        var id = item.id;
                        $('#' + id).addClass('error')
                    }
                }

            });
        }
    }
}
function AddSendCopy() {
    var vLastRow = $("#tblSendCopy tr:last").attr('id');
    var totalFileCount = 2;
    if (typeof vLastRow == "undefined") {
        totalFileCount = 2;
    }
    else {
        totalFileCount = parseInt(vLastRow.replace("trSendCopy", ""));
        totalFileCount = parseInt(totalFileCount) + 1;
    }
    var count = $("#tblSendCopy tr").length;

    if (count <= 10) {

        var htmlFormatFile = '<tr id="trSendCopy' + totalFileCount + '">';
        htmlFormatFile += '<td>';
        htmlFormatFile += '<input id="txtSendCopy' + totalFileCount + '" maxlength="42" name="SendCopyName' + totalFileCount + '" placeholder="Name" title="Name" type="text" class="f_inpt width90 validelement" />';
        htmlFormatFile += '</td>';
        htmlFormatFile += '<td>';
        htmlFormatFile += '<input id="txtSendCopyEmail' + totalFileCount + '" maxlength="50" name="SendCopyEmail' + totalFileCount + '" placeholder="Email ID" title="Email ID" type="text" class="f_inpt width90 validelement validemail" />';
        htmlFormatFile += '</td>';
        htmlFormatFile += '<td style="width:20px">';
        htmlFormatFile += '<a href="javascript:void(0)" onclick="DeleteShareContract(this)"><img src="../Content/Images/icon/delete.png" /></a>';
        htmlFormatFile += '</td>';
        htmlFormatFile += '</tr>';

        $("#tblSendCopy").append(htmlFormatFile);
        if (count == 10) {
            $(".addmorelinks").hide();
        }

    }

}

function ClearSendCopyForm() {
    var nicInstance = nicEditors.findEditor('txtSendCopyNotes');
    nicInstance.setContent('');
    $("#ddlDocumentList").val('').trigger('chosen:updated');
    $('#tblSendCopy').empty();
    var vSignee = '<tr>';
    vSignee += '<td>';
    vSignee += '<input id="txtSendCopy1" name="SendCopyName1" title="Name" placeholder="Name" type="text" class="f_inpt width90 validelement" />';
    vSignee += '</td>';
    vSignee += '<td>';
    vSignee += '<input id="txtSendCopyEmail1" name="SendCopyEmail1" title="Email ID" placeholder="Email ID" type="text" class="f_inpt width90 validelement validemail" />';
    vSignee += '</td>';
    vSignee += '<td style="width:20px">&nbsp;</td>';
    vSignee += '</tr>';
    $('#tblSendCopy').html(vSignee);
}

var isExecutedBindDocumentTypeandTemplate = false;
function BindDocumentTypeandTemplate(docType) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/templatedocuments',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (templates) {
            $("#ddlReplaceTemplate").empty();
            $("#ddlReplaceTemplate").append("<option value='0'>--Select--</option>");
            $("#ddlDocumentTemplate").html("<option value='0'>--Select--</option>");
            var datalenght = templates.length;
            hashtable = {};
            for (var i = 0; i < datalenght; i++) {
                var item = templates[i];
                if (thisContractAreaSettings.DocumentTemplates.split(';').indexOf(item.TemplateName) > -1) {
                    $("#ddlReplaceTemplate").append("<option value='" + item.TemplateName + "~" + item.DocumentType + "'>" + item.TemplateName + "</option>");
                    $("#ddlDocumentTemplate").append("<option value='" + item.TemplateName + "~" + item.DocumentType + "'>" + item.TemplateName + "</option>");
                    hashtable[item.TemplateName.replace(/ /g, '')] = item.Description;
                }
            }
        }
    });

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documenttypes',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (documenttypes) {
            $("#ddlDocumentType").html("<option value='0'>--Select--</option>");
            $("#ddlDocumentTypeCreate").html("<option value='0'>--Select--</option>");
            var datalenght = documenttypes.length;
            for (var i = 0; i < datalenght; i++) {
                var item = documenttypes[i];
                if (typeof thisContractAreaSettings === 'undefined') {
                    $("#ddlDocumentType").append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>");
                    $("#ddlDocumentTypeCreate").append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>")
                } else {
                    if (thisContractAreaSettings.DocumentTypes.split(';').indexOf(item.TypeName) > -1) {
                        $("#ddlDocumentType").append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>");
                        $("#ddlDocumentTypeCreate").append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>")
                    }
                }
            }
            $("#ddlDocumentType").val(docType);

            //Bug:eO311012 - 'Primary Agreement' not visible in Document Type Dropdown
            //$("#ddlDocumentTypeCreate option[value='Primary Agreement']").remove();
            //$("#ddlDocumentType option[value='Primary Agreement']").remove();

            //if (typeof thisContractAreaSettings === 'undefined') {
            //    $("#ddlDocumentTypeCreate").find('option[value="Primary Agreement"]').prop("selected", true);
            //}
            if ($("#ddlDocumentTypeCreate option[value='Others']").length == 0) {
                $("#ddlDocumentType").append("<option value='Others'>Others</option>");
                $("#ddlDocumentTypeCreate").append("<option value='Others'>Others</option>");
            }

            //if ($("#ddlDocumentTypeCreate option[value='Primary Agreement']").length > 0) {
            //    $("#ddlDocumentTypeCreate").find('option[value="Primary Agreement"]').prop("selected", true);
            //}


            //if ($("#ddlDocumentTypeCreate option[value='Primary Agreement']").length > 0) {
            //    $("#ddlDocumentTypeCreate").find('option[value="Primary Agreement"]').prop("selected", true);
            //}

        },
        error:
            function (data) {
                $("#ddlDocumentType").html("<option value='0'>--Select--</option>");
                $("#ddlDocumentTypeCreate").html("<option value='0'>--Select--</option>");
                $("#ddlDocumentType").append("<option value='Others'>Others</option>");
                $("#ddlDocumentTypeCreate").append("<option value='Others'>Others</option>");
            }
    });
}

function getNameAndEmailShareDocument() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/' + getParameterByName("ContractID") + '/contacts',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            if (data != null) {
                var allInternal = '';
                var datalenght = data.length;
                var totalFileCount = 0;
                var iex = 0;
                for (var i = 0; i < datalenght; i++) {
                    var item = data[i];

                    totalFileCount++;
                    if (item.InternalOrExternal == "External") {
                        if (iex == 0) {
                            iex = 1;
                            $('#txtShareDocument1').val(item.ContactName);
                            $('#txtShareDocumentEmail1').val(item.EmailID);
                        }
                        else {
                            var htmlFormatFile = '<tr id="trShareDocument' + totalFileCount + '">';
                            htmlFormatFile += '<td>';
                            htmlFormatFile += '<input id="txtShareDocument' + totalFileCount + '" value="' + item.ContactName + '" maxlength="42" name="ShareDocumentName' + totalFileCount + '" placeholder="Name" title="Name" type="text" class="f_inpt width90" value="' + item.ContactName + '" />';
                            htmlFormatFile += '</td>';
                            htmlFormatFile += '<td>';
                            htmlFormatFile += '<input id="txtShareDocumentEmail' + totalFileCount + '" value="' + item.EmailID + '" maxlength="50" name="ShareDocumentEmail' + totalFileCount + '" placeholder="Email ID" title="Email ID" type="text" class="f_inpt width90 validelement validemail" value="' + item.EmailID + '" />';
                            htmlFormatFile += '</td>';
                            htmlFormatFile += '<td style="width:20px">';
                            htmlFormatFile += '<a href="javascript:void(0)" onclick="DeleteShareDocument(this)"><img src="../Content/Images/icon/delete.png" /></a>';
                            htmlFormatFile += '</td>';
                            htmlFormatFile += '</tr>';
                            $("#tblShareDocument").append(htmlFormatFile);
                        }

                    }
                    else {
                        allInternal += item.ContactName + ";";
                    }
                }
                GetTextAndAutoPopulateNotHidden("ddlDocumentShareInternal", allInternal);
            }
        },
        error: function () {
        }

    });
}

function ShowMoreDocuments() {
    $('.ShowMoreDocuments').css("display", "");
    $('#ShowMoreDocuments').css("display", "none");
    $('#ShowLessDocuments').css("display", "");
}

function ShowLessDocuments() {
    $('.ShowMoreDocuments').css("display", "none");
    $('#ShowMoreDocuments').css("display", "");
    $('#ShowLessDocuments').css("display", "none");
}

function ShowMorePinDocuments() {
    $('.ShowMorePinDocuments').css("display", "");
    $('#ShowMorePinDocuments').css("display", "none");
    $('#ShowLessPinDocuments').css("display", "");
}

function ShowLessPinDocuments() {
    $('.ShowMorePinDocuments').css("display", "none");
    $('#ShowMorePinDocuments').css("display", "");
    $('#ShowLessPinDocuments').css("display", "none");
}

function replacedocument() {
    var IsFormValid = false;
    var duplicatedoc = true;
    var confirmreplaceext = false;
    var extdifferent = false;
    var vPreviousDocumentExtension = $('#lblDocumentExtension').val();
    var vrad_Replace = $('input[type="radio"][name=rad_Replace]:checked').val();
    if (vrad_Replace == 'Computer') {
        if (vrad_Replace == 'Computer' && requiredValidator("trFileUploadBrowse") && requiredValidator("trFileUploadBrowse1")) {
            IsFormValid = true;
        }
    }
    if (requiredValidator("tblReplaceDocument") || IsFormValid) {
        $("#loadingPage").fadeIn();
        var formData1 = new FormData();

        var opmlFile = $('#docToReplace')[0];
        var isUpload = true;
        var tblContentControls = null;
        var vrad_Replace = $('input[type="radio"][name=rad_Replace]:checked').val();
        var Documentnamerelace = "";
        var CheckDocumentnamerelace = "";
        if (vrad_Replace == 'Computer') {
            formData1.append("opmlFile", opmlFile.files[0]);
            var filename = "";
            if ($("#txtdocumentToReplaceName").val() != "") {
                filename = $("#txtdocumentToReplaceName").val();
            }
            else {
                filename = opmlFile.files[0].name;
                filename = filename.substring(0, filename.lastIndexOf('.'));
            }
            formData1.append("DocumentName", filename);

            //manoj
            //For OCR File Upload
            Documentnamerelace = filename + "." + opmlFile.files[0].name.split('.').pop();
            if (document.getElementById("ReplacefileUploadOCR").style.display != "none" && $("#ReplacefileUploadOCR").is(':checked')) {
                CheckDocumentnamerelace = filename + ".pdf";
                formData1.append("ISOCRDOC", "Yes");
            } else {
                formData1.append("ISOCRDOC", "No");
                CheckDocumentnamerelace = filename + "." + opmlFile.files[0].name.split('.').pop();
            }
            //For OCR File Upload
            //manoj

            var documentfileextension = Documentnamerelace.split('.').pop();

            if (vPreviousDocumentExtension != documentfileextension) {
                extdifferent = true;
                if (vPreviousDocumentExtension == 'doc' || vPreviousDocumentExtension == 'docx' || vPreviousDocumentExtension == 'DOC' || vPreviousDocumentExtension == 'DOCX') {
                    var getconformationupload = confirm("The file which is being uploaded is '." + documentfileextension + "', which is different from existing '." + vPreviousDocumentExtension + "'; Do you really want to upload? Older versions of the file cannot be restored.");
                    if (getconformationupload) {
                        confirmreplaceext = true;
                    }
                }
            }
        }
        else {
            formData1.append("TemplateName", $("#ddlReplaceTemplate").find('option:selected').text());
            isUpload = false;
            tblContentControls = $("#formtblReplaceControls *").serializeArray();
            formData1.append("DocumentName", $('#docToReplaceName').val());
            Documentnamerelace = $('#docToReplaceName').val() + ".docx";
            CheckDocumentnamerelace = $('#docToReplaceName').val() + ".docx";
            formData1.append("ISOCRDOC", "No");
        }
        if (CheckDocumentnamerelace != "") {
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?contractid=' + getParameterByName('ContractID') + '&docname=' + CheckDocumentnamerelace + '&docid=' + $('#hdnDocumentID').val(),
                type: 'GET',
                dataType: 'json',
                "Content-Type": "application/json",
                headers: { 'eContracts-ApiKey': localStorage.APIKey },
                cache: false,
                async: false,
                success: function (data) {
                    if (data.RowKey != $('#hdnDocumentID').val()) {
                        duplicatedoc = false;
                    }
                },
                error: function (data) {
                }
            });
        }

        formData1.append("documentaction", "replace");
        formData1.append("ContractID", getParameterByName('ContractID'));
        formData1.append("AccountID", localStorage.AccountID);
        formData1.append("DocumentID", $('#hdnDocumentID').val());
        formData1.append("ModifiedBy", localStorage.UserName);
        var IsContributeUser = contractItem.Permission.indexOf('Contribute') == -1 ? 'No' : 'Yes';
        formData1.append("IsContributeUser", IsContributeUser);
        if (tblContentControls != null) {
            var tblContentControlslength = tblContentControls.length;
            for (var i = 0; i < tblContentControlslength; i++)
                formData1.append(tblContentControls[i].name, tblContentControls[i].value);
        }

        if (duplicatedoc) {
            if (isUpload == true && confirmreplaceext == false && extdifferent == true && (vPreviousDocumentExtension == 'doc' || vPreviousDocumentExtension == 'docx' || vPreviousDocumentExtension == 'DOC' || vPreviousDocumentExtension == 'DOCX')) { $("#loadingPage").fadeOut(); } else {
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?documentid=' + DocumentID,
                    type: 'PUT',
                    data: formData1,
                    cache: false,
                    contentType: false,
                    headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, 'RefreshToken': localStorage.RefreshToken },
                    processData: false,
                    success: function (document) {
                        if (isUpload) {
                            $("#loadingPage").fadeOut();
                            $('#divReplaceDocument').dialog("close");
                            if (!$.isEmptyObject(arrRelatedContracts)) {
                                CreateRelatedContracttemplate();
                            }
                            ClearReplaceDocFrom();
                            //manoj
                            if (documentview == null || documentview == "" || documentview == 'folder') {
                                if ($('#showAll').text() != null && $('#showAll').text() != "" && typeof ($('#showAll').text()) != "undefined") {
                                    var selectedfoldervalue = $('#showAll').find("a");
                                    var textvalueselected = $(selectedfoldervalue)[$(selectedfoldervalue).length - 1].textContent;
                                    var idvalueselected = $(selectedfoldervalue)[$(selectedfoldervalue).length - 1].id;
                                    var parentdocumentdetails = { id: idvalueselected, text: textvalueselected };
                                    showfolderdocuments(parentdocumentdetails);
                                }
                                else {
                                    BindDocument(vContractID);
                                }
                            } else {
                                DisplayDocument(documentview);
                            }
                            pendingStarted = false;
                            GetContractPendingAction(true, "BindPeoples");
                            $("#hdnFolderDocumentView").text('');
                            $("#hdnShowAllTextValue").html('');
                            PrvFolderselection = '';
                            //Bind primary and pined document based on new feature
                            if ($("#hdnnewdocumentfeature").text() == "Yes") {
                                CreateDocumentListPinView(vContractID);
                            }
                            //manoj
                            BindMilestone(vContractID);
                        }
                        else {
                            setTimeout(ReplaceDocReload, 10000);
                        }
                        $('#ReplacefileUploadOCR').prop('checked', false);
                    },
                    error: function (document) {
                        $('#ReplacefileUploadOCR').prop('checked', false);
                        $("#loadingPage").fadeOut();
                        swal(document.responseText);
                    }
                });
            }
        }
        else {
            $("#loadingPage").fadeOut();
            swal("", "Another document with this file name already exists.Please rename and try again");
        }
    }
}

function ReplaceDocReload() {
    $("#loadingPage").fadeOut();
    $('#divReplaceDocument').dialog("close");
    ClearReplaceDocFrom();
    //manoj
    if (documentview == null || documentview == "" || documentview == 'folder') {
        if ($('#showAll').text() != null && $('#showAll').text() != "" && typeof ($('#showAll').text()) != "undefined") {
            var selectedfoldervalue = $('#showAll').find("a");
            var textvalueselected = $(selectedfoldervalue)[$(selectedfoldervalue).length - 1].textContent;
            var idvalueselected = $(selectedfoldervalue)[$(selectedfoldervalue).length - 1].id;
            var parentdocumentdetails = { id: idvalueselected, text: textvalueselected };
            showfolderdocuments(parentdocumentdetails);
        }
        else {
            BindDocument(vContractID);
        }
    } else {
        DisplayDocument(documentview);
    }
    pendingStarted = false;
    GetContractPendingAction(true, "BindPeoples");
    $("#hdnFolderDocumentView").text('');
    $("#hdnShowAllTextValue").html('');
    PrvFolderselection = '';
    //Bind primary and pined document based on new feature
    if ($("#hdnnewdocumentfeature").text() == "Yes") {
        CreateDocumentListPinView(vContractID);
    }
    //manoj
    BindMilestone(vContractID);

}

$('input[name=rad_Replace]:radio').change(function () {
    var vrad_Replace = $('input[type="radio"][name=rad_Replace]:checked').val();
    $("#txtDocumentNameReplace").val('');
    $("#docToReplace").replaceWith($("#docToReplace").val('').clone(true));
    $("#ddlReplaceTemplate").val("0");
    $("#tblReplaceControls").css('display', 'none');
    $("#tblReplaceControls").empty();
    if (vrad_Replace == 'Computer') {
        $("#trFileUploadBrowse").css('display', '');
        $("#trFileUploadBrowse1").css('display', '');
        $("#trTemplateBrowse").css('display', 'none');
        $("#trTemplateBrowse1").css('display', 'none');
        $("#tblReplaceControls").css('display', 'none');
        $("#docToReplace").addClass('validelement');
        $("#docToReplace").addClass('validfilename');
        $("#ddlReplaceTemplate").removeClass('validelement');
    }
    else {
        $("#trFileUploadBrowse").css('display', 'none');
        $("#trFileUploadBrowse1").css('display', 'none');
        $("#trTemplateBrowse").css('display', '');
        $("#trTemplateBrowse1").css('display', '');
        $("#tblReplaceControls").css('display', '');
        $("#docToReplace").removeClass('validelement');
        $("#docToReplace").removeClass('validfilename');
        $("#ddlReplaceTemplate").addClass('validelement');
    }
});

function ReplaceFileUploadChange(fileInput) {
    var files = fileInput.files;
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        $("#txtDocumentNameReplace").val(file.name.split('.')[0]);
    }
}

function ReplaceTemplateChange(ddlDocumentTemplate) {
    //$("#dvreplacehelptextvalue").css('display', 'none');
    if (ddlDocumentTemplate.value != "0") {
        $("#txtDocumentNameReplace").val($("#ddlReplaceTemplate").find('option:selected').text().split('.')[0]);
        $("#lblReplaceTemplateDescription").text(hashtable[ddlDocumentTemplate.value.split('~')[0].replace(/ /g, '')]);
        var strContractID = getParameterByName("ContractID");
        if (strContractID != "0") {
            getContractData(strContractID, 'tblReplaceControls', $("#ddlReplaceTemplate").find('option:selected').text(), "dvreplacehelptextvalue");
        }
    } else {
        $("#txtDocumentNameReplace").val('');
        $('#tblReplaceControls').empty();
        $("#lblReplaceTemplateDescription").text("");
    }
}

function ClearReplaceDocFrom() {
    $('#hdnDocumentID').val("");
    $("#docToReplace").replaceWith($("#docToReplace").val('').clone(true));
    $("#txtDocumentNameReplace").val('');
    $("#ddlReplaceTemplate").val("0");
    $('input[type="radio"][name="rad_Replace"][value="Computer"]').prop('checked', true);
    $("#trFileUploadBrowse").css('display', '');
    $("#trFileUploadBrowse1").css('display', '');
    $("#trTemplateBrowse").css('display', 'none');
    $("#trTemplateBrowse1").css('display', 'none');
    $("#tblReplaceControls").css('display', 'none');
    $("#docToReplace").addClass('validelement');
    $("#docToReplace").addClass('validfilename');
    $("#ddlReplaceTemplate").removeClass('validelement');
    $("#tblReplaceControls").empty();
    $("#txtdocumentToReplaceName").empty();
    removeValidations('tblReplaceControls');
}



$("#btnNewFolder").click(function () {
    if ($(this).text().trim() == "Create Sub Folder") {
        $("#txtNewFolderName").css('display', '');
        $(this).text('Cancel');
    } else if ($(this).text().trim() == "Cancel") {
        $("#txtNewFolderName").css('display', 'none');
        $("#errormsg_txtNewFolderName").remove();
        $("#txtNewFolderName").removeClass("error");
        $("#txtNewFolderName").val('');
        $(this).text('Create Sub Folder');
    }

});

function setDocumentUrl() {
    var headerid = $("#lblContractTitle").text();
    headerid = headerid.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').replace(/[\*\|\,\"\:\<\>\[\}\{\}\'\(\)\&\#\%\.\-\!]/g, '').replace(/\//g, '').replace(/\s\s+/g, " ").trim();
    var finalurl = "";
    //var newurl = "";
    //if ($('#hdnContractDocumentsUrl').text() != "") {
    //if (typeof ($('#hdnContractDocumentsUrl').text()) != "undefined"  && $("#hdnContractDocumentsUrl").text() != null && $("#hdnContractDocumentsUrl").text()!="") {

    //}
    finalurl = ($('#hdContAreaDocLibName').val() != null && $('#hdContAreaDocLibName').val() != "") ? $('#hdContAreaDocLibName').val() : '/Contract Documents/';
    finalurl = (finalurl.charAt(0) != '/') ? '/' + finalurl.trim() : finalurl.trim();
    finalurl = ((finalurl.substr(finalurl.length - 1)) != "/") ? finalurl + "/" : finalurl;
    //manoj
    if (typeof ($('#showAll').text()) != "undefined" && $('#showAll').text() != null && $('#showAll').text() != "") {
        $("#txtNewFolderName").val("");
        $("#txtNewFolderName").css('display', 'none');
        //var lastcharfind = finalurl;
        //lastcharfind = lastcharfind.substr(lastcharfind.length - 1)
        //if (lastcharfind == "/") {
        $("#lblFolderUrl").text(finalurl + $('#showAll').text().replace(/ \/ /g, '/') + '/');
        // }
        //else {
        //$("#lblFolderUrl").text($("#hdnContractDocumentsUrl").text() + "/");
        // }
        $("#btnNewFolder").css('display', '');
        //$("#lblFolderUrl").css('cursor', 'pointer');

        //$("#lblFolderUrl").click(function () {
        //    CreateFolder($("#hdnContractDocumentsUrl").text().substring(1));
        //    $("#treeviewFolder").dialog("option", "title", "Select Folder");
        //    $("#treeviewFolder").dialog("open");
        //});
        //$("#btnBrowseSubFolders").css('display', '');
        $("#btnBrowseSubFolders").parent().css("display", "")
        $("#btnBrowseSubFolders").click(function () {
            ManageFolderAction = "";
            CreateFolder($("#hdnContractDocumentsUrl").text().substring(1));
            $("#treeviewFolder").dialog("option", "title", "Select Folder");
            $("#treeviewFolder").dialog("open");
        });
    } else {
        //$("#btnBrowseSubFolders").css('display', 'none');
        $("#btnBrowseSubFolders").parent().css("display", "none")
        $("#txtNewFolderName").css('display', '');
        $("#lblFolderUrl").text(finalurl);
        //$("#lblFolderUrl").css('cursor', 'default');
        $("#btnNewFolder").css('display', 'none');
        $("#txtNewFolderName").val(headerid);
    }
    //manoj
    //if ($("#hdnContractDocumentsUrl").text() != "") {
    //    $("#txtNewFolderName").val("");
    //    $("#txtNewFolderName").css('display', 'none');
    //    var lastcharfind = $("#hdnContractDocumentsUrl").text();
    //    lastcharfind = lastcharfind.substr(lastcharfind.length - 1)
    //    if (lastcharfind == "/") {
    //        $("#lblFolderUrl").text($("#hdnContractDocumentsUrl").text());
    //    }
    //    else {
    //        $("#lblFolderUrl").text($("#hdnContractDocumentsUrl").text() + "/");
    //    }
    //    $("#btnNewFolder").css('display', '');
    //    $("#lblFolderUrl").css('cursor', 'pointer');

    //    $("#lblFolderUrl").click(function () {
    //        CreateFolder($("#hdnContractDocumentsUrl").text().substring(1));
    //        $("#treeviewFolder").dialog("option", "title", "Select Folder");
    //        $("#treeviewFolder").dialog("open");
    //    });
    //    $("#btnBrowseSubFolders").css('display', '');
    //    $("#btnBrowseSubFolders").click(function () {
    //        CreateFolder($("#hdnContractDocumentsUrl").text().substring(1));
    //        $("#treeviewFolder").dialog("option", "title", "Select Folder");
    //        $("#treeviewFolder").dialog("open");
    //    });

    //} else {
    //    $("#btnBrowseSubFolders").css('display', 'none');
    //    $("#txtNewFolderName").css('display', '');
    //    $("#lblFolderUrl").text('/' + $('#hdContAreaDocLibName').val() + '/');
    //    $("#lblFolderUrl").css('cursor', 'default');
    //    $("#btnNewFolder").css('display', 'none');
    //    if (typeof $("#ddlContracts").find('option:selected').val() != 'undefined' && $("#ddlContracts").find('option:selected').val() != "0") {
    //        $("#txtNewFolderName").val($("#ddlContracts").find('option:selected').text().replace(/[\*\|\,\"\:\<\>\[\}\{\}\'\(\)\&\#\%\.\-\!]/g, '').replace(/\//g, '').replace(/\s\s+/g, " ").trim());
    //    }
    //    else {
    //        $("#txtNewFolderName").val($("#lblContractTitle").text().replace(/[\*\|\,\"\:\<\>\[\}\{\}\'\(\)\&\#\%\.\-\!]/g, '').replace(/\//g, '').replace(/\s\s+/g, " ").trim());
    //    }
    //}
    if (AllowSaveDraftInCloud == "on") {
        $("#AllowSaveDraftCloud").css('display', '');
        if (SaveDraftInCloud == "on") {
            $("#rad_CopyLibraryAndAzure").attr('checked', 'checked');
        }
        else {
            $("#rad_CopyLibrary").attr('checked', 'checked');
        }
    }
    else {
        $("#AllowSaveDraftCloud").css('display', 'none');
        $("#rad_CopyLibrary").attr('checked', 'checked');
    }
    if (typeof ($('#showAll').text().replace(/ \/ /g, '/')) != "undefined" && $('#showAll').text().replace(/ \/ /g, '/') != null && $('#showAll').text().replace(/ \/ /g, '/') != "") {
        var n = $('#lblFolderUrl').text().split('/');
        var newurl = n[0] + "/" + n[1];
        $('#lblFolderUrl').text(newurl + "/" + $('#showAll').text().replace(/ \/ /g, '/') + '/')
    }
}

function onchangetemplate(ddlDocumentTemplate) {
    $('#spInProgress').css('display', '');
    //$("#dvhelptextvalue").css('display', 'none');
    if (ddlDocumentTemplate.value != "0") {
        $('#txtDocumentNameCreate').val($("#ddlDocumentTemplate").find('option:selected').text());
        var value = $("#ddlDocumentTemplate").find('option:selected').val();
        value = value.split("~");
        if (value[1] == "") {
            $("#ddlDocumentTypeCreate").val(0);
        }
        else {
            $("#ddlDocumentTypeCreate").val(value[1]);
        }
        var strContractID = getParameterByName("ContractID");
        if (strContractID != "0") {
            getContractData(strContractID, 'tblContentControls', $("#ddlDocumentTemplate").find('option:selected').text(), "dvhelptextvalue")
            var selectedtemplatevalue = $("#ddlDocumentTemplate").val().split('~').pop();
            $("#lblTemplateDescription").text(hashtable[$("#ddlDocumentTemplate").val().split('~')[0].replace(/ /g, '')]);
        }
        if ($("#ddlDocumentTypeCreate").val() == null) {
            $("#ddlDocumentTypeCreate").val(0);
        }
    } else {
        $("#ddlDocumentTypeCreate").find('option[value="0"]').prop("selected", true);
        $('#txtDocumentNameCreate').val("");
        $('#tblContentControls').empty();
        $('#lblTemplateDescription').text("");
        $('#spInProgress').css('display', 'none');
    }
}

//*Harshitha
function BindDocumentMilestones(item) {
    var completeArticle = '';
    var sbcount = 0;
    var vDocValidDate = '';
    if (item.ValidTill != null) {
        sbcount++;
        var Validdate;

        if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
        { Validdate = item.ValidTill.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'); }
        else {
            if (localStorage.AppDateFormat == 'DD/MM/YYYY') { Validdate = item.ValidTill.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1'); }
            else if (localStorage.AppDateFormat == 'MM/DD/YYYY') { Validdate = item.ValidTill.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'); }
        }
        vDocValidDate = '' + Validdate + '';
        var article = '';
        if (sbcount <= 5)
            article = '<li class=" margin-bottom-8 WrapText_h2">';
        else
            article = '<li class="ShowMoreMilestones margin-bottom-8 WrapText_h2" style="display:none;">';
        article += ' <img src="../Content/Images/sand.png" style="width: 15px;pointer-events: none;">';
        if (vDocValidDate != '') {
            article += '<span class="DateToSort" style="color: black;"> ' + vDocValidDate + ': </span>';
        }
        article += '<span style="color:#555555;">' + item.DocumentName + '</span>';


        var beforeDaysSort = [];
        var afterDaysSort = [];
        var beforeDays = '';
        var afterDays = '';

        if (item.Reminder1 != null && item.Reminder1 != "" && item.Reminder1 != 0) {
            if (item.Reminder1Condition == 'before') {
                beforeDaysSort.push(item.Reminder1);
            }
            else if (item.Reminder1Condition == 'after') {
                afterDaysSort.push(item.Reminder1);
            }
        }
        if (item.Reminder2 != null && item.Reminder2 != "" && item.Reminder2 != 0) {
            if (item.Reminder2Condition == 'before') {
                beforeDaysSort.push(item.Reminder2);
            }
            else if (item.Reminder2Condition == 'after') {
                afterDaysSort.push(item.Reminder2);
            }
        }
        if (item.Reminder3 != null && item.Reminder3 != "" && item.Reminder3 != 0) {
            if (item.Reminder3Condition == 'before') {
                beforeDaysSort.push(item.Reminder3);
            }
            else if (item.Reminder3Condition == 'after') {
                afterDaysSort.push(item.Reminder3);
            }
        }

        beforeDays = beforeDaysSort.sort(function (a, b) { return a - b });
        afterDays = afterDaysSort.sort(function (a, b) { return a - b });

        if (beforeDays != '' || afterDays != '') {
            article += '<span class="sub-text-head"> (Reminders ' + (beforeDays != '' ? beforeDays + ' day(s) before' : '') + (afterDays != '' ? (beforeDays != '' ? ' & ' + afterDays + ' day(s) after )' : afterDays + ' day(s) after ) ') : ')') + '</span>';
        }
        article += '</li>';
        completeArticle += article;
    }
    return completeArticle;

}

function StopShareDocument(collarabationid) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Documents/Share?collarabationid=' + collarabationid,
        type: 'PUT',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: {
            'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, 'UserName': localStorage.UserName
        },
        success: function (data) {
            if (data != null && data != "" && typeof (data) != "undefined") {
                contractItem.Status = data;
                ContractTopActions();
                if (documentview == null || documentview == "" || documentview == 'folder') {
                    if (typeof ($('#showAll').text()) != "undefined" && $('#showAll').text().replace(/ \/ /g, '/') != null && $('#showAll').text().replace(/ \/ /g, '/') != "") {
                        var selectedfoldervalue = $('#showAll').find("a");
                        var textvalueselected = $(selectedfoldervalue)[$(selectedfoldervalue).length - 1].textContent;
                        var idvalueselected = $(selectedfoldervalue)[$(selectedfoldervalue).length - 1].id;
                        var person = {
                            id: idvalueselected, text: textvalueselected
                        };
                        showfolderdocuments(person);
                    } else {
                        BindDocument(vContractID);
                    }
                } else {
                    DisplayDocument(documentview);
                }
                // BindDocument(vContractID);
            }
            GetContractActivities(vContractID);
            $("#loadingPage").fadeOut();
        },
        error:
            function (data) {
                $("#loadingPage").fadeOut();

            }
    });
}

function GetDocumentShareComment(wid) {
    $("#Det_" + wid).html('<img src="../Content/Images/icon/loading.gif">');
    var fetchingactivity = [];
    $.ajax({
        url: '/Documents/GetDocumentCollaborationComment?accountid=' + localStorage.AccountID + '&collaborationid=' + wid,
        type: 'GET',
        dataType: 'json',
        cache: false,
        async: false,
        success: function (data) {
            var jsObject = JSON.parse(data);
            $(jsObject).each(function (i, item) {
                var activitydetails = { Datetimedetails: ((typeof (item.PostDate) != "undefined" && item.PostDate != null && item.PostDate != "") ? item.PostDate : item.TimeStamp), Username: item.PostBy, CommentDetails: item.Comment, ExternalUser: "" };
                fetchingactivity.push(activitydetails);
            });
        },
        error:
            function (data) {
            }
    });
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/activities?objecttype=Documentupload&objectid=' + wid + '&actiontype=New Version Update',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        async: false,
        success: function (data) {
            $(data).each(function (i, item) {
                var activitydetails = { Datetimedetails: item.Timestamp, Username: item.UserID, CommentDetails: item.Activity, ExternalUser: "(User Activity)" };
                fetchingactivity.push(activitydetails);
            });
        },
        error:
            function (data) {
            }
    });

    if (fetchingactivity.length > 0) {
        fetchingactivity.sort(function (a, b) {
            return new Date(b.Datetimedetails) - new Date(a.Datetimedetails);
        });
        var article = '';
        $(fetchingactivity).each(function (it, itemdetails) {
            var externaluseractivity = ((typeof (itemdetails.ExternalUser) != "undefined" && itemdetails.ExternalUser != null && itemdetails.ExternalUser != "") ? itemdetails.ExternalUser : "")
            var vTime = moment(new Date(itemdetails.Datetimedetails)).format('MMMM Do YYYY, h:mm A');
            article += '<div class="activity-details-start row-group">';
            article += '<div class="col8 no-pad">';
            article += "<b>" + itemdetails.Username + "</b>" + externaluseractivity;
            if (itemdetails.CommentDetails != "") {
                if (itemdetails.CommentDetails.indexOf("Comment:") > -1) {
                    var splitcommment = itemdetails.CommentDetails.split("Comment:");
                    if (splitcommment[0] != "") {
                        article += '<br/>' + splitcommment[0].trim();
                    } else {
                        article += '<br/>' + item.Comment.trim();
                    }
                    if (splitcommment[1] != "") {
                        article += '<br/><b>Comment :</b>' + splitcommment[1].trim();
                    } else {
                        article += '<br/><b>Comment :</b>' + item.Comment.trim();
                    }
                } else {
                    article += '<br/>' + itemdetails.CommentDetails;
                }
            }
            article += '</div>';
            article += '<div class="col4 no-pad text-right">';
            article += vTime;
            article += '</div>';
            article += '</div>';
        });
        $("#Det_" + wid).html(article);
        article = '';
        fetchingactivity = [];
    } else {
        $("#Det_" + wid).html('<div>No item found.</div>');
    }

    $.ajax({
        url: '/Documents/GetDocumentCollaborationLink?accountid=' + localStorage.AccountID + '&collaborationid=' + wid + '&UserName=' + localStorage.UserName,
        type: 'GET',
        dataType: 'json',
        cache: false,
        // async: false,
        success: function (data) {
            if (data != "") {
                window.open(data, "_blank")
            }

        },
        error:
            function (data) {


            }
    });
}


function StopDocumentSignature(wid) {
    swal({
        title: '',
        text: "Are you sure you want to <span style=\"font-weight:700\">Cancel</span> signature process?",
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
                   url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Documents/StopSignature?documentid=' + wid,
                   type: 'PUT',
                   dataType: 'json',
                   'Content-Type': 'application/json',
                   cache: false,
                   headers: { 'eContracts-ApiKey': localStorage.APIKey, 'UserName': localStorage.UserName, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                   success: function (data) {
                       if (data == "Success" || data == "") {
                           GetContractActivities(vContractID, "true");
                       }
                       else {
                           if (data == "Fail") {
                               swal("", "This document has not able to cancel signature.");
                           }
                           else {
                               swal("", "This document has not able to cancel signature, because of " + data);
                           }
                       }
                       //$("#loadingPage").fadeOut();
                   },
                   error:
                       function (data) {
                           $("#loadingPage").fadeOut();
                       }
               });
           }
           return;
       });
}

function GetDocumentSignatureComment(wid) {
    $("#Det_" + wid).html('<img src="../Content/Images/icon/loading.gif">');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Documents/SignatureDetail?documentid=' + wid,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {

            var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
            var vAccFeat = $.grep(veContractFeatures, function (n, i) {
                return (n.RowKey == "1" && n.Status == "ON");
            });
            if (vAccFeat.length > 0) {
                var vConfig = vAccFeat[0].Configuration;
                var vProvider = $(vConfig).find('Provider').text();
                if (vProvider == "Right Signature")
                    RightSignatureComment(data, wid);
                else if (vProvider == "Echo Sign")
                    EcoSignatureComment(data, wid);
                else if (vProvider == "Docu Sign")
                    DocuSignatureComment(data, wid);
            }

        },
        error: function (data) {
            $("#Det_" + wid).empty();
        }
    });
}

function DocuSignatureDocumentHistory(data) {
    $("#createdid").css("display", "");
    $("#lastactivityid").css("display", "none");
    $("#expiresid").css("display", "none");
    $("#completedid").css("display", "");

    var created = $(data).find('Created:first').text();
    var completed = $(data).find('Completed:first').text();

    var subject = $(data).find('Subject').text();
    var message = $(data).find('EmailBlurb').text();
    var ExpiresDays = ($(data).find('ExpiresIn') != null && typeof $(data).find('ExpiresIn') != "undefined") ? $(data).find('ExpiresIn').text() : "";
    var enxpDate = '';
    if (ExpiresDays != "") {
        enxpDate = moment(new Date(created)).add(ExpiresDays, 'days');
    }
    var state = $(data).find('Status:first').text();
    $("#tdDocSignsubject").html(subject);
    $("#tdDocSignmessage").html(message);
    $("#tdDocSignstate").html(state);
    $("#tdDocSigncreated").html(moment(new Date(created)).utc().format('MMMM Do YYYY, h:mm A'));

    if (completed != null && completed != "" && $.inArray(state, DocSignCompState) > -1) {
        $("#tdDocSigncompleted").html(moment(new Date(completed)).utc().format('MMMM Do YYYY, h:mm A'));

    }
    else
        $("#tdDocSigncompleted").html('-');
    if (enxpDate != null && enxpDate != "") {
        $("#expiresid").css("display", "");
        $("#tdDocSignexpires").html(moment(new Date(enxpDate)).utc().format('MMMM Do YYYY, h:mm A'));
    }

    var article = '';
    $(data).find('Event').each(function () {
        var date = moment(new Date($(this).find('logTime').text())).format('MMMM Do YYYY, h:mm A');
        var message = $(this).find('Message').text();
        article += '<li>';
        article += '<p>';
        article += '<b>' + message + '</b> ';
        article += '<small>' + date + '</small>';
        article += '</p></li>';
    });
    $("#dvDocSignatureHist").html(article);

    article = '';
    $(data).find('Recipients').each(function () {
        var email = '';
        var name = '';
        $(this).find('Email').each(function (i, item) {
            if (email == '')
                email = $(item).text();
            else
                email += "; " + $(item).text();
        });
        $(this).find('UserName').each(function (i, item) {
            if (name == '')
                name = $(item).text();
            else
                name += "; " + $(item).text();
        });
        article += '<li>';
        article += '<p style="margin-bottom: 5px;">';
        article += '<b>' + email + '</b> ';
        article += '<small>(' + name + ')</small>';
        article += '</p></li>';
    });
    $("#dvDocSignatureUser").html(article);
    article = '';
}

function EcoSignatureDocumentHistory(data) {
    $("#createdid").css("display", "none");
    $("#lastactivityid").css("display", "none");
    $("#expiresid").css("display", "none");
    $("#completedid").css("display", "none");

    var subject = "Document sent for signature";
    var message = $(data).find('message').text();
    var state = $(data).find('status').last().text();
    $("#tdDocSignsubject").html(subject);
    $("#tdDocSignmessage").html(message);
    $("#tdDocSignstate").html(state);

    var article = '';
    $(data).find('DocumentHistoryEvent').each(function () {
        var date = moment(new Date($(this).find('date').text())).format('MMMM Do YYYY, h:mm A');
        var message = $(this).find('description').text();
        article += '<li>';
        article += '<p>';
        article += '<b>' + message + '</b> ';
        article += '<small>' + date + '</small>';
        article += '</p></li>';
    });
    $("#dvDocSignatureHist").html(article);

    article = '';
    $(data).find('participants').each(function () {
        $(this).find('ParticipantInfo').each(function () {
            var email = $(this).find('email').text();
            var name = $(this).find('name').text();
            if ($(this).find('ParticipantRole').text() == "SIGNER") {
                article += '<li>';
                article += '<p style="margin-bottom: 5px;">';
                article += '<b>' + email + '</b> ';
                article += '<small>(' + name + ')</small>';
                article += '</p></li>';
            }
        })
    });
    $("#dvDocSignatureUser").html(article);
}

function RightSignatureDocumentHistory(data) {
    var created = $(data).find('created-at').text();
    var completed = $(data).find('completed-at:first').text();
    var lastactivity = $(data).find('last-activity-at').text();
    var expires = $(data).find('expires-on').text();
    var subject = $(data).find('subject').text();
    var message = $(data).find('message').text();
    var state = $(data).find('state:first').text();
    $("#tdDocSigncreated").html(moment(new Date(created)).format('MMMM Do YYYY, h:mm A'));

    if (completed != null && completed != "" && $.inArray(state, DocSignCompState) > -1)
        $("#tdDocSigncompleted").html(moment(new Date(completed)).format('MMMM Do YYYY, h:mm A'));
    else
        $("#tdDocSigncompleted").html('-');

    $("#tdDocSignlastactivity").html(moment(new Date(lastactivity)).format('MMMM Do YYYY, h:mm A'));
    $("#tdDocSignexpires").html(moment(new Date(expires)).format('MMMM Do YYYY, h:mm A'));
    $("#tdDocSignsubject").html(subject);
    $("#tdDocSignmessage").html(message);
    $("#tdDocSignstate").html(state);


    var article = '';
    $(data).find('audit-trail').each(function () {
        var timestamp = moment(new Date($(this).find('timestamp').text())).format('MMMM Do YYYY, h:mm A');
        var message = $(this).find('message').text();
        article += '<li>';
        article += '<p>';
        article += '<b>' + message + '</b> ';
        article += '<small>' + timestamp + '</small>';
        article += '</p></li>';
    });
    $("#dvDocSignatureHist").html(article);

    article = '';
    $(data).find('recipient').each(function () {
        var issender = $(this).find('is-sender').text();
        if (issender != 'true') {
            var username = $(this).find('name').text();
            var mustsign = $(this).find('must-sign').text();
            var email = $(this).find('email').text();
            var state = $(this).find('state').text();
            article += '<li>';
            article += '<p style="margin-bottom: 5px;">';
            article += '<b>' + username + ' - ' + email + '</b> ';
            article += '<small>(' + state + ')</small>';
            article += '</p></li>';
        }
    });
    $("#dvDocSignatureUser").html(article);
    article = '';
    $("#createdid").css("display", "");
    $("#lastactivityid").css("display", "");
    $("#expiresid").css("display", "");
    $("#completedid").css("display", "");
}

function GetdocumentIsStandard(contractid) {
    articleDocumentMileStone = '';
    multipleChecksDocumentID = '';
    multipleChecksDocumentName = '';
    $("#documentMultiActions").css('display', 'none');
    if (contractid == null || contractid == "") { contractid = vContractID; }
    var vGetTime = moment(new Date()).utc();
    //var vGetTime = new Date();
    //$.ajax({
    //    url: '/Documents/GetTime',
    //    type: 'GET',
    //    dataType: 'json',
    //    cache: false,
    //    success: function (data) {
    //        var jsObject = JSON.parse(data);
    //        vGetTime = new Date(jsObject);
    //    }
    //});
    var vFinalSignature = "dropdownMenuFinal";
    var vMarkFinalSignature = "dropdownMenuMarkFinal";

    vFinalSignature = "dropdownMenuFinalSignature";
    vMarkFinalSignature = "dropdownMenuMarkFinalSignature";
    $("#ulDocument").html('<img src="../Content/Images/icon/loading.gif"> Please wait...');
    $("#ddlDocumentList").empty();
    $("#alertsListUpcomingDocument").empty();
    try {
        var article = '';
        DocumentCount = 0;
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?contractid=' + contractid,
            type: 'GET',
            cache: false,
            contentType: false,
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            processData: false,
            success: function (data) {
                $("#ulDocument").empty();
                var count = 0;
                var countStandard = 0;
                var vPermission = $("#hdnPermission").val();

                var settings = {
                    pattern: /\.[0-9a-z]+$/i,
                    knownFileTypes: ['pdf', 'png', 'jpg', 'gif', 'bmp', 'doc', 'xls', 'ppt', 'docx', 'xlsx', 'txt', 'pptx', 'zip', 'rar', 'gzip', 'arj', 'wav', 'mp3', 'aif', 'aiff', 'm4a', 'ogg', 'wma', 'psd', 'ai', 'swf', 'fla', 'css', 'js', 'avi', 'mov', 'wmv', 'dotx'],
                    WopiFrameFileTypes: ['doc', 'xls', 'ppt', 'docx', 'xlsx', 'pptx', 'dotx']
                };

                var datalenght = 0;
                if (typeof (data) != 'undefined') {
                    datalenght = data.length;

                    if (datalenght > 0) {
                        for (var vi = 0; vi < datalenght; vi++) {
                            if (data[vi].ContractArea != "") {
                                docdefaultview(data[vi].ContractArea);
                                break;
                            }
                        }
                    }
                }

                var DocDefaultView = ""
                if (thisDocumentLibrarySettings != '' && thisDocumentLibrarySettings != 'undefined' && typeof thisDocumentLibrarySettings != "undefined") {
                    DocDefaultView = thisDocumentLibrarySettings.DocDefaultView;
                    DocVersion = thisDocumentLibrarySettings.DocVersion;
                }
                for (var i = 0; i < datalenght; i++) {
                    var item = data[i];
                    count++
                    if (item.IsStandard == "Yes") {
                        countStandard++;
                    }
                    var vClass = "openmenuDocumentFinal";
                    var vv = moment(new Date(item.Modified));
                    var vTime = vv.fromNow();
                    vTime = vv.from(vGetTime);
                    var vDocIcon = "";//'<img src="../Content/Images/Doc_draft.png" class="doc_type margin-left-5" alt="Draft Document" title="Draft Document" />';
                    if (item.IsFinalized == "Yes") {
                        vClass = "openmenuDocument";
                        vDocIcon = '<img src="../Content/Images/icon/final_doc.png" class="doc_type margin-left-5" alt="Finalized/Ready for Signature" title="Finalized/Ready for Signature" />';
                        if (item.CreationMode == "Amendment") {
                            vClass = "openmenuAmendmentDocumentFinal";
                            vDocIcon += '<img src="../Content/Images/amendments.png" style="height:16px; width:16px;" class="doc_type margin-left-5" alt="Amendment Document" title="Amendment Document" />';
                        }
                    } else if (item.CreationMode == "Amendment") {
                        vClass = "openmenuAmendmentDocument";
                        vDocIcon = '<img src="../Content/Images/amendments.png" style="height:16px; width:16px;" class="doc_type margin-left-5" alt="Amendment Document" title="Amendment Document" />';

                    }

                    if (item.IsPrimary == "Yes") {
                        vDocIcon = '<img src="../Content/Images/primary_doc.png" class="doc_type margin-left-5" alt="Primary Document" title="Primary Document" />';
                    }
                    vURLDoc = encodeURI(item.DocumentUrl);
                    var ext = vURLDoc.match(settings.pattern);
                    var vFileType = '<dd class="file-icon none"></dd>';
                    if (ext != null) {
                        if (ext.length > 0) { ext = ext[0].slice(1); }
                        if (vURLDoc.toLowerCase().indexOf(localStorage.SPHostUrl.toLowerCase()) >= 0) {
                            if (jQuery.inArray(ext, settings.WopiFrameFileTypes) > -1) {
                                vRawURLDoc = vURLDoc;
                                vURLDoc = localStorage.SPHostUrl + "/_layouts/WopiFrame.aspx?sourcedoc=" + vURLDoc + "&action=default";
                            } else {
                                vRawURLDoc = "";
                            }
                        }

                        if (jQuery.inArray(ext.toLowerCase(), settings.knownFileTypes) > -1) {
                            vFileType = '<dd class="file-icon ' + ext + '"></dd>';
                        }
                    }

                    if (count <= 5)
                        article += '<li class=" margin-bottom-5" active=' + item.IsActive + '>';
                    else
                        article += '<li class="ShowMoreDocuments margin-bottom-5" style="display:none;">';

                    article += '<label id="DocumentID" style="display:none;">' + item.RowKey + '</label>';
                    article += '<label id="SentForSign" style="display:none;">' + item.SentForSign + '</label>';
                    article += '<label id="DocumentName" style="display:none;">' + item.DocumentName + '</label>';
                    article += '<label id="ShareWorkflow" style="display:none;">' + item.ShareWorkflow + '</label>';
                    article += '<label id="ReviewWorkflow" style="display:none;">' + item.ReviewWorkflow + '</label>';
                    article += '<label id="BusinessArea" style="display:none;">' + item.BusinessArea + '</label>';
                    article += '<label id="IsFinalized" style="display:none;">' + item.IsFinalized + '</label>';
                    var primarydocchecking = (item.IsPrimary != null && item.IsPrimary != "") ? item.IsPrimary : "No";
                    article += '<label id="IsPrimaryDoc" style="display:none;">' + primarydocchecking + '</label>';
                    if ($("#hdnPermission").val() != "View" && $("#hdnPermission").val() != "" && $("#hdnPermission").val() != null) {
                        article += '<input type="checkbox" id="' + item.RowKey + '" name="MultipleDocuments" onclick="checkMultipleDocuments(this);" value=' + item.RowKey + ' /> ';
                    }


                    switch (item.DocumentStatus) {
                        case "New":
                            article += '<b title="New" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_green_another details_documentstatus"><img src="../Content/Images/status/new.png" class="margin-right-5">new</b>';
                            break;
                        case "Ready for Signature":
                            article += '<b title="Ready for Signature" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_green details_documentstatus"><img src="../Content/Images/status/active.png" class="margin-right-5">sign</b>';
                            break;
                        case "Awaiting Signatures":
                            article += '<b title="Awaiting Signatures" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_yellow details_documentstatus"><img src="../Content/Images/status/renew.png" class="margin-right-5">sign</b>';
                            break;
                        case "Active":
                            article += '<b title="Active" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_green details_documentstatus"><img src="../Content/Images/status/active.png" class="margin-right-5">actv</b>';
                            break;
                        case "Signed":
                            article += '<b title="Signed" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_blue details_documentstatus"><img src="../Content/Images/status/tick.png" class="margin-right-5">Sign</b>';
                            break;
                        case "Expired":
                            article += '<b title="Expired" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_Gray details_documentstatus"><img src="../Content/Images/status/expried.png" class="margin-right-5">exp</b>';
                            break;
                        case "Awaiting Review":
                            article += '<b title="Awaiting Review" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_yellow details_documentstatus"><img src="../Content/Images/status/renew.png" class="margin-right-5">Rev</b>';
                            break;
                        case "Reviewed":
                            article += '<b title="Reviewed" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_blue details_documentstatus"><img src="../Content/Images/status/tick.png" class="margin-right-5">Rev</b>';
                            break;
                        case "In Negotiation":
                            article += '<b title="In Negotiation" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_yellow details_documentstatus"><img src="../Content/Images/status/renew.png" class="margin-right-5">nego</b>';
                            break;
                        case "Negotiation Complete":
                            article += '<b title="Negotiation Complete" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_blue details_documentstatus"><img src="../Content/Images/status/tick.png" class="margin-right-5">nego</b>';
                            break;
                    }

                    if (vRawURLDoc != "") {
                        if (DocDefaultView == "WordClient") {
                            article += vFileType + '<a href="javascript:void(0);" seqe ="' + vRawURLDoc + '" onclick="viewdocinword(\'' + vRawURLDoc + '\')">' + item.DocumentName + '</a>';
                        } else {
                            article += vFileType + '<a href="' + vURLDoc + '" target="_blank">' + item.DocumentName + '</a>';
                        }
                    } else {
                        article += vFileType + '<a href="' + vURLDoc + '" target="_blank">' + item.DocumentName + '</a>';
                    }

                    if (vTime == "Invalid date") {
                        article += '<span class="sub-text"> few seconds ago</span>';
                    }
                    else {
                        article += '<span class="sub-text"> ' + vTime + '</span>';
                    }

                    article += '';
                    article += '';
                    article += vDocIcon + '&nbsp;<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="' + vClass + ' margin-left-5" onclick="FilterMenuOptions(this)"/>';
                    article += '</li>';
                    DocumentCount++;
                    articleDocMiletstone = BindDocumentMilestones(item);
                    var doclist = '<option value="' + item.RowKey + '">' + item.DocumentName + '</option>';
                    $("#ddlDocumentList").append(doclist);
                    $("#ddlDocumentList").trigger('chosen:updated');
                    articleDocumentMileStone += articleDocMiletstone;
                    //BindDocumentAlert(item);

                }
                //$("#ulDocument").html(article);
                if (DocVersion == "No") {
                    $('li.history').hide();
                }
                //         if (datalenght == countStandard) {
                //             if (contractItem.IsStandard != "Yes") {
                //                 swal({
                //                     title: '',
                //                     text: "Marking the document as standard will make the contract as standard. Are you sure you want to make this Contract as standard?",
                //                     type: 'warning',
                //                     showCancelButton: true,
                //                     confirmButtonText: 'Yes',
                //                     cancelButtonText: 'No',
                //                     html: true
                //                 },
                //function (confirmed) {
                //    if (confirmed) {
                //        SetStandardFlag("Yes");
                //    }
                //    return;
                //});

                //             }
                //         }


                //$("#lblDocumentsCount").text(count);

                //if (!$("#lblDocumentsCount").text().trim()) {
                //    $("#ulDocument").empty();
                //    $("#ulDocument").append('<li>No items found.</li>');
                //}

                $(".openmenuDocument").contextMenu({ menu: vFinalSignature, leftButton: true }, function (action, el, pos) { contextMenuDocument(action, el.parent("li"), pos); });
                $(".openmenuDocumentFinal").contextMenu({ menu: vMarkFinalSignature, leftButton: true }, function (action, el, pos) { contextMenuDocument(action, el.parent("li"), pos); });
                $(".openmenuAmendmentDocument").contextMenu({ menu: "dropdownMenuAmendment", leftButton: true }, function (action, el, pos) { contextMenuAmendmentDocument(action, el.parent("li"), pos); });

            },
            error: function (request) {
                $("#ulDocument").empty();
                $("#lblDocumentsCount").text('0');
                $("#ulDocument").html('<li>No items found.</li>');
                //$("#btnAddContractDocument").css('display', '');
                //$("#lblAddContractDocument").css('display', '');
            },
            complete: function () {

                //*Harshitha
                //manoj
                if (documentview == null || documentview == "" || documentview == 'folder') {
                    if ($('#showAll').text() != null && $('#showAll').text() != "" && typeof ($('#showAll').text()) != "undefined") {
                        var selectedfoldervalue = $('#showAll').find("a");
                        var textvalueselected = $(selectedfoldervalue)[$(selectedfoldervalue).length - 1].textContent;
                        var idvalueselected = $(selectedfoldervalue)[$(selectedfoldervalue).length - 1].id;
                        var parentdocumentdetails = { id: idvalueselected, text: textvalueselected };
                        showfolderdocuments(parentdocumentdetails);
                    }
                    else {
                        // $("#ulDocument").html(article);
                        BindDocument(vContractID);
                    }
                } else {
                    DisplayDocument(documentview);
                }
                //GetContractPendingAction(true, "BindPeoples");
                $("#hdnFolderDocumentView").text('');
                $("#hdnShowAllTextValue").html('');
                PrvFolderselection = '';
                //Bind primary and pined document based on new feature
                if ($("#hdnnewdocumentfeature").text() == "Yes") {
                    CreateDocumentListPinView(vContractID);
                }
                //manoj
                BindSystemMilestoneTest(articleSystemMileStone, articleDocumentMileStone, articleMileStone, articleObligationMileStone);
            }

        });
    } catch (e) {

    }

}

function contextMenuAmendmentDocument(action, el, pos) {

    switch (action) {
        case "view":
            {
                var amendmentID = $(el).find("#AmendmentID").text();
                ViewAmendment(amendmentID);
                break;
            }
        case "replace":
            {
                ClearReplaceDocFrom();
                var documentID = $(el).find("#DocumentID").text();
                var documentName = $(el).find("#DocumentName").text();
                $("#txtdocumentToReplaceName").val(documentName.substring(0, documentName.lastIndexOf('.')));
                $('#lblDocumentExtension').val(documentName.split('.').pop());
                $("#lblReplaceTemplateDescription").text("");
                //addbuttonclick = true;
                $('#hdnDocumentID').val(documentID);
                $("#trTop").css('display', 'none');
                $("#divReplaceDocument").dialog("option", "title", "Replace Document");
                $("#divReplaceDocument").dialog("open");
                break;
            }
        case "delete":
            {
                var documentName = $(el).find("#DocumentName").text();
                var documentID = $(el).find("#DocumentID").text();
                swal({
                    title: '',
                    text: "Are you sure you want to delete '<span style=\"font-weight:700\">" + documentName + "</span>'?",
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
                 url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?documentid=' + documentID,
                 type: 'DELETE',
                 dataType: 'json',
                 "Content-Type": "application/json",
                 headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
                 cache: false,
                 success: function (data) {
                     //manoj                         
                     var ulDocumentlist = $("#ulDocument li");
                     if (ulDocumentlist.length > 0) {
                         var documentexist = $(ulDocumentlist).find("input[id=" + documentID + "]");
                         if (documentexist.length > 0) {
                             $(ulDocumentlist).find("input[id=" + documentID + "]").parent().remove();

                         }
                     }

                     ulDocumentlist = $("#ulPinDocument li");
                     if (ulDocumentlist.length > 0) {
                         var documentexist = $(ulDocumentlist).find("b[id=" + documentID + "]");
                         if (documentexist.length > 0) {
                             $(ulDocumentlist).find("b[id=" + documentID + "]").parent().remove();
                             $("#hdnPinDocumentCount").text("No");
                         }
                     }

                     ulDocumentlist = $("#ulPinDocument li");
                     if (ulDocumentlist.length == 0) {
                         $("#ulPinDocument").html('No items found.');
                     }

                     ulDocumentlist = $("#ulDocument li");
                     if (ulDocumentlist.length == 0) {
                         $("#ulDocument").html('No items found.');
                     }

                     //if (documentview == null || documentview == "" || documentview == 'folder') {
                     //    if ($('#showAll').text() != null && $('#showAll').text() != "" && typeof ($('#showAll').text()) != "undefined") {
                     //        var selectedfoldervalue = $('#showAll').find("a");
                     //        var textvalueselected = $(selectedfoldervalue)[$(selectedfoldervalue).length - 1].textContent;
                     //        var idvalueselected = $(selectedfoldervalue)[$(selectedfoldervalue).length - 1].id;
                     //        var parentdocumentdetails = { id: idvalueselected, text: textvalueselected };
                     //        showfolderdocuments(parentdocumentdetails);
                     //    }
                     //    else {
                     //        BindDocument(vContractID);
                     //    }
                     //} else {
                     //    DisplayDocument(documentview);
                     //}
                     //pendingStarted = false;
                     //GetContractPendingAction(true, "BindPeoples");
                     //$("#hdnFolderDocumentView").text('');
                     //$("#hdnShowAllTextValue").html('');
                     //PrvFolderselection = '';
                     ////Bind primary and pined document based on new feature
                     //if ($("#hdnnewdocumentfeature").text() == "Yes") {
                     //    CreateDocumentListPinView(vContractID);
                     //}
                     //manoj
                     //*Harshitha

                     $("#ddlDocumentList option[value='" + documentID + "']").remove();
                     //$("#ddlDocumentList").trigger('chosen:updated');
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
        case "remove":
            {
                //manoj
                var ContractLibUrl = "";
                //manoj
                var documentName = $(el).find("#DocumentName").text();
                var documentID = $(el).find("#DocumentID").text();
                swal({
                    title: '',
                    text: "Are you sure you want to remove '<span style=\"font-weight:700\">" + documentName + "</span>' from this Contract?",
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
                 url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/untag?contractid=' + getParameterByName('ContractID') + '&documentid=' + documentID,
                 type: 'PUT',
                 dataType: 'json',
                 "Content-Type": "application/json",
                 headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName, 'RefreshToken': localStorage.RefreshToken },
                 cache: false,
                 success: function (data) {
                     $("#loadingPage").fadeOut();
                     //manoj
                     if (documentview == null || documentview == "" || documentview == 'folder') {
                         if ($('#showAll').text() != null && $('#showAll').text() != "" && typeof ($('#showAll').text()) != "undefined") {
                             var selectedfoldervalue = $('#showAll').find("a");
                             var textvalueselected = $(selectedfoldervalue)[$(selectedfoldervalue).length - 1].textContent;
                             var idvalueselected = $(selectedfoldervalue)[$(selectedfoldervalue).length - 1].id;
                             var parentdocumentdetails = { id: idvalueselected, text: textvalueselected };
                             showfolderdocuments(parentdocumentdetails);
                         }
                         else {
                             BindDocument(vContractID);
                         }
                     } else {
                         DisplayDocument(documentview);
                     }
                     pendingStarted = false;
                     GetContractPendingAction(true, "BindPeoples");
                     $("#hdnFolderDocumentView").text('');
                     $("#hdnShowAllTextValue").html('');
                     PrvFolderselection = '';
                     //Bind primary and pined document based on new feature
                     if ($("#hdnnewdocumentfeature").text() == "Yes") {
                         CreateDocumentListPinView(vContractID);
                     }
                     //manoj

                     $("#ddlDocumentList option[value='" + documentID + "']").remove();
                     $("#ddlDocumentList").trigger('chosen:updated');
                     //*Harshitha
                     BindMilestone();
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
        case "edit":
            {
                $('#editNewDocument').css("pointer-events", "auto");
                var documentID = $(el).find("#DocumentID").text();
                $("#hdIsPrimaryDoc").val($(el).find("#IsPrimaryDoc").text());
                EditDocumentMetadata(documentID);
                break;
            }
        case "final":
            {
                //Check if document is having any revisions
                //var isrevisionexists = true;
                //var LinkURL = $(el).find("a").attr('href');
                //if (LinkURL == "#") {
                //    LinkURL = $(el).find("a").attr('seqe')
                //}
                //var DocumentUrl = getQueryStringFromValue(LinkURL, 'sourcedoc');
                //$.ajax({
                //    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/revisionexists?docurl=' + DocumentUrl,
                //    type: 'GET',
                //    dataType: 'json',
                //    async: false,
                //    "Content-Type": "application/json",
                //    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                //    cache: false,
                //    success: function (revisiondata) {
                //        if (revisiondata) {
                //            isrevisionexists = true;
                //        }
                //    },
                //    error: function () {

                //    }
                //});
                var CanSend = false;
                var ext = $(el).find("dd").attr("class");
                if (typeof (ext) != "undefined" && ext != "")
                    if (ext.indexOf("doc") > -1 || ext.indexOf("docx") > -1)
                        CanSend = true;
                if (CanSend) {
                    swal({
                        title: '',
                        text: "Please make sure that you have accepted track changes and cleaned up the document. Are you sure you want to mark selected documents as <span style='font-weight:700'>Finalized/Ready for Signature</span>?",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Yes',
                        cancelButtonText: 'No',
                        html: true
                    },
                 function (confirmed) {
                     if (confirmed) {
                         $("#loadingPage").fadeIn();
                         var entityid = $(el).find("#DocumentID").text();
                         $.ajax({
                             url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/MarkFinal?documentid=' + entityid,
                             type: 'PUT',
                             cache: false,
                             contentType: false,
                             headers: {
                                 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, 'RefreshToken': localStorage.RefreshToken, username: localStorage.UserName
                             },
                             processData: false,
                             success: function (document) {
                                 //manoj
                                 $("#loadingPage").fadeOut();
                                 if (documentview == null || documentview == "" || documentview == 'folder') {
                                     if ($('#showAll').text() != null && $('#showAll').text() != "" && typeof ($('#showAll').text()) != "undefined") {
                                         var selectedfoldervalue = $('#showAll').find("a");
                                         var textvalueselected = $(selectedfoldervalue)[$(selectedfoldervalue).length - 1].textContent;
                                         var idvalueselected = $(selectedfoldervalue)[$(selectedfoldervalue).length - 1].id;
                                         var parentdocumentdetails = { id: idvalueselected, text: textvalueselected };
                                         showfolderdocuments(parentdocumentdetails);
                                     }
                                     else {
                                         BindDocument(vContractID);
                                     }
                                 } else {
                                     DisplayDocument(documentview);
                                 }
                                 pendingStarted = false;
                                 GetContractPendingAction(true, "BindPeoples");
                                 $("#hdnFolderDocumentView").text('');
                                 $("#hdnShowAllTextValue").html('');
                                 PrvFolderselection = '';
                                 //Bind primary and pined document based on new feature
                                 if ($("#hdnnewdocumentfeature").text() == "Yes") {
                                     CreateDocumentListPinView(vContractID);
                                 }
                                 //manoj      

                             },
                             error: function () {
                                 $("#loadingPage").fadeOut();
                             }
                         });
                     }
                     return;
                 });
                } else {
                    swal({
                        title: '',
                        text: "Do you want to mark this document as Finalized/Ready for Signature?",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Yes',
                        cancelButtonText: 'No',
                        html: true
                    },
                    function (confirmed) {
                        if (confirmed) {
                            $("#loadingPage").fadeIn();
                            var entityid = $(el).find("#DocumentID").text();
                            $.ajax({
                                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/MarkFinal?documentid=' + entityid,
                                type: 'PUT',
                                cache: false,
                                contentType: false,
                                headers: {
                                    'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, 'RefreshToken': localStorage.RefreshToken, username: localStorage.UserName
                                },
                                processData: false,
                                success: function (document) {
                                    //manoj
                                    $("#loadingPage").fadeOut();
                                    if (documentview == null || documentview == "" || documentview == 'folder') {
                                        if ($('#showAll').text() != null && $('#showAll').text() != "" && typeof ($('#showAll').text()) != "undefined") {
                                            var selectedfoldervalue = $('#showAll').find("a");
                                            var textvalueselected = $(selectedfoldervalue)[$(selectedfoldervalue).length - 1].textContent;
                                            var idvalueselected = $(selectedfoldervalue)[$(selectedfoldervalue).length - 1].id;
                                            var parentdocumentdetails = { id: idvalueselected, text: textvalueselected };
                                            showfolderdocuments(parentdocumentdetails);
                                        }
                                        else {
                                            BindDocument(vContractID);
                                        }
                                    } else {
                                        DisplayDocument(documentview);
                                    }
                                    pendingStarted = false;
                                    GetContractPendingAction(true, "BindPeoples");
                                    $("#hdnFolderDocumentView").text('');
                                    $("#hdnShowAllTextValue").html('');
                                    PrvFolderselection = '';
                                    //Bind primary and pined document based on new feature
                                    if ($("#hdnnewdocumentfeature").text() == "Yes") {
                                        CreateDocumentListPinView(vContractID);
                                    }
                                    //manoj

                                },
                                error: function () {
                                    $("#loadingPage").fadeOut();
                                }
                            });
                        }
                        return;
                    });
                }

                break;
            }
        case "download":
            {
                var LinkURL = $(el).find("a").attr('href');
                var SourceUrl = "";
                if (LinkURL == "#" || LinkURL == "javascript:void(0);") {
                    LinkURL = $(el).find("a").attr('seqe')
                    if (typeof (LinkURL) == "undefined" || LinkURL == "undefined") {
                        LinkURL = $(el).find("a").attr('data-value');
                    }
                } else {
                    LinkURL = $(el).find("a").attr('data-value');
                }
                location = localStorage.SPHostUrl + "/_layouts/15/download.aspx?SourceUrl=" + LinkURL;
                break;
            }
        case "signature":
            {
                ClearSignatureForm();
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Workflow/settings',
                    type: 'GET',
                    dataType: 'json',
                    "Content-Type": "application/json",
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    cache: false,
                    success: function (settings) {
                        $("#txtExpIn").val(settings.TaskDuration);
                    },
                    error: function () {

                    }
                });
                var documentName = $(el).find("#DocumentName").text();
                var sentForSign = $(el).find("#SentForSign").text();
                var documentID = $(el).find("#DocumentID").text();
                var isFinalized = $(el).find("#IsFinalized").text();
                var PrimaryDocumentCheck = $(el).find("#IsPrimaryDoc").text();
                var CanSend = false;
                var ext = $(el).find("dd").attr("class");
                if (typeof (ext) != "undefined" && ext != "")
                    if (ext.indexOf("doc") > -1 || ext.indexOf("docx") > -1 || ext.indexOf("pdf") > -1)
                        CanSend = true;
                if (CanSend) {
                    if (sentForSign == '') {
                        if (PrimaryDocumentCheck == 'Yes')
                            $("#lblAutoUpdateStatusSignDoc").html("Auto update Document & Contract Record status based on this Workflow.");
                        else
                            $("#lblAutoUpdateStatusSignDoc").html("Auto update Document status based on this Workflow.");
                        if (isFinalized != 'Yes') {
                            var finaltext = "Only <span style='font-weight:700'>Finalized/Ready for Signature</span> documents can be sent out for <span style='font-weight:700'>eSignature</span>. Do you want to mark this document as <span style='font-weight:700'>Finalized/Ready for Signature</span>?";
                            if (ext.indexOf("doc") > -1 || ext.indexOf("docx") > -1) {
                                finaltext = "Are you sure all edit/ redlines have been accepted and the document is cleaned up. Mark this document as Finalized/Ready for Signature now?";
                            }
                            swal({
                                title: '',
                                text: finaltext,
                                type: 'warning',
                                showCancelButton: true,
                                confirmButtonText: 'Yes',
                                cancelButtonText: 'No',
                                html: true
                            },
                                  function (confirmed) {
                                      if (confirmed) {
                                          $(el).find("#IsFinalized").text('Yes');
                                          isFinalized = 'Yes';
                                          $.ajax({
                                              url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/MarkFinal?documentid=' + documentID,
                                              type: 'PUT',
                                              cache: false,
                                              contentType: false,
                                              headers: {
                                                  'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, 'RefreshToken': localStorage.RefreshToken, username: localStorage.UserName
                                              },
                                              processData: false,
                                              success: function (document) {
                                              }
                                          });
                                      }
                                      if (isFinalized == 'Yes') {
                                          $("#hdMarkAsFinal").val("Y");
                                          var LinkURL = $(el).find("a").attr('href');
                                          if (LinkURL == "#" || LinkURL == "javascript:void(0);") {
                                              LinkURL = $(el).find("a").attr('seqe')
                                              if (typeof (LinkURL) == "undefined" || LinkURL == "undefined") {
                                                  LinkURL = $(el).find("a").attr('data-value');
                                              }
                                          } else {
                                              LinkURL = $(el).find("a").attr('data-value')
                                          }
                                          $("#hdDocumentID").val(documentID);
                                          $("#hdDocumentURL").val(decodeURIComponent(LinkURL));
                                          $("#tdDocument").html("<b>" + documentName + "</b>");
                                          getNameAndEmailSignDocument();
                                          $('#chkAutoUpdateStatusSignDoc').prop('checked', true)
                                          $("#sendForSignature").dialog("open");
                                      }
                                      return;
                                  });

                        }
                        else {
                            if (isFinalized == 'Yes') {
                                $("#hdMarkAsFinal").val("Y");
                                var LinkURL = $(el).find("a").attr('href');
                                if (LinkURL == "#" || LinkURL == "javascript:void(0);") {
                                    LinkURL = $(el).find("a").attr('seqe')
                                    if (typeof (LinkURL) == "undefined" || LinkURL == "undefined") {
                                        LinkURL = $(el).find("a").attr('data-value');
                                    }
                                } else {
                                    LinkURL = $(el).find("a").attr('data-value')
                                }
                                $("#hdDocumentID").val(documentID);
                                $("#hdDocumentURL").val(decodeURIComponent(LinkURL));
                                $("#tdDocument").html("<b>" + documentName + "</b>");
                                getNameAndEmailSignDocument();
                                $('#chkAutoUpdateStatusSignDoc').prop('checked', true)
                                $("#sendForSignature").dialog("open");
                            }
                        }
                    }
                    else {

                        swal("", "This document has already been sent for signature: " + sentForSign);

                    }
                }
                else {
                    swal("", "This document cannot be sent for signature: Only <span style='font-weight:700'>doc,docx</span> and <span style='font-weight:700'>pdf</span> type files can be sent for signature.");
                }
                break;
            }
        case "editO365":
            {
                var LinkURL = $(el).find("a").attr('href');
                if (LinkURL == "#" || LinkURL == "javascript:void(0);") {
                    var rawUrl = $(el).find("a").attr('seqe');
                    if (typeof (rawUrl) == "undefined" || rawUrl == "undefined") {
                        rawUrl = $(el).find("a").attr('data-value');
                    }
                    if (typeof rawUrl != 'undefined')
                        viewdocinword(rawUrl);
                    else {
                        LinkURL = $(el).find("a").attr('data-value');
                        Opendocinbrowser(LinkURL);
                        //window.open(LinkURL);
                    }
                } else {
                    LinkURL = $(el).find("a").attr('data-value');
                    Opendocinbrowser(LinkURL);
                    //window.open(LinkURL);
                }
                break;
            }
        case "sharelink":
            {
                //manoj
                var DocumentNameToCheck = $(el).find("#DocumentName").text();
                var DocumentExtFormat = ['doc', 'xls', 'ppt', 'docx', 'xlsx', 'pptx', 'dotx', 'pdf'];
                if (DocumentExtFormat.indexOf(DocumentNameToCheck.split('.').pop()) > -1) {
                    //var documentStatus = $(el).find("b").attr('title');
                    //var shareWorkflow = $(el).find("#ShareWorkflow").text();
                    //if (shareWorkflow == "In Progress") {
                    //    swal("", "Negotiation/External Review is in progress for this document.");
                    //}
                    //else {
                    //if (primarydocchecking == 'Yes')
                    //    $("#lblAutoUpdateStatus").html("Auto update Document & Contract Record status to 'Negotiation Complete' when this Negotiation/External Review is completed.");
                    //else
                    $("#lblAutoUpdateStatusShareDoc").html("Auto update Document status to 'Negotiation Complete' when this External Share is completed.");
                    //Check if document is having any revisions
                    var isrevisionexists = false;
                    var LinkURL = $(el).find("a").attr('href');
                    if (LinkURL == "#" || LinkURL == "javascript:void(0);") {
                        LinkURL = $(el).find("a").attr('seqe')
                        if (typeof (LinkURL) == "undefined" || LinkURL == "undefined") {
                            LinkURL = $(el).find("a").attr('data-value');
                        }
                    } else {
                        LinkURL = $(el).find("a").attr('data-value')
                    }
                    $.ajax({
                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/revisionexists?docurl=' + LinkURL,
                        type: 'GET',
                        dataType: 'json',
                        async: false,
                        "Content-Type": "application/json",
                        headers: { 'eContracts-ApiKey': localStorage.APIKey },
                        cache: false,
                        success: function (revisiondata) {
                            if (revisiondata) {
                                isrevisionexists = true;
                            }
                        },
                        error: function () {

                        }
                    });
                    if (isrevisionexists) {
                        swal({
                            title: '',
                            text: "Revisions (comments or track changes) exists inside the document, do you really want to share this as a link?",
                            type: 'warning',
                            showCancelButton: true,
                            confirmButtonText: 'Yes',
                            cancelButtonText: 'No',
                            html: true
                        },
                         function (confirmed) {
                             if (confirmed) {
                                 $.ajax({
                                     url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Workflow/settings',
                                     type: 'GET',
                                     dataType: 'json',
                                     "Content-Type": "application/json",
                                     headers: { 'eContracts-ApiKey': localStorage.APIKey },
                                     cache: false,
                                     success: function (settings) {
                                         $("#txtShareExpIn").val(settings.TaskDuration);
                                         if ($("#txtShareExpIn").val() != "") {
                                             $("#txtShareExpIn").trigger("onchange");
                                         } else {
                                             $("#lblValidLinkDate").empty();
                                         }
                                     },
                                     error: function () {

                                     }
                                 });
                                 ClearShareForm();
                                 var documentName = $(el).find("#DocumentName").text();
                                 var documentID = $(el).find("#DocumentID").text();
                                 $("#hdDocumentID").val(documentID);
                                 $("#hdDocumentURL").val(decodeURIComponent(LinkURL));
                                 $("#tdShareDocument").html("<b>" + documentName + "</b>");
                                 getNameAndEmailShareDocument();
                                 GetValuesAndAutoPopulate("ddlDocumentShareInternal", "");
                                 //getShareNameandEmailIdInternal(vContractID, "ddlDocumentShareInternal");
                                 $("#shareDocument").dialog("open");
                             }
                             return;
                         });
                    } else {
                        $.ajax({
                            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Workflow/settings',
                            type: 'GET',
                            dataType: 'json',
                            "Content-Type": "application/json",
                            headers: { 'eContracts-ApiKey': localStorage.APIKey },
                            cache: false,
                            success: function (settings) {
                                $("#txtShareExpIn").val(settings.TaskDuration);
                                if ($("#txtShareExpIn").val() != "") {
                                    $("#txtShareExpIn").trigger("onchange");
                                } else {
                                    $("#lblValidLinkDate").empty();
                                }
                            },
                            error: function () {

                            }
                        });
                        ClearShareForm();
                        var LinkURL = $(el).find("a").attr('href');
                        if (LinkURL == "#" || LinkURL == "javascript:void(0);") {
                            LinkURL = $(el).find("a").attr('seqe')
                            if (typeof (LinkURL) == "undefined" || LinkURL == "undefined") {
                                LinkURL = $(el).find("a").attr('data-value');
                            }
                        } else {
                            LinkURL = $(el).find("a").attr('data-value')
                        }
                        var documentName = $(el).find("#DocumentName").text();
                        var documentID = $(el).find("#DocumentID").text();
                        $("#hdDocumentID").val(documentID);
                        $("#hdDocumentURL").val(decodeURIComponent(LinkURL));
                        $("#tdShareDocument").html("<b>" + documentName + "</b>");
                        getNameAndEmailShareDocument();
                        GetValuesAndAutoPopulate("ddlDocumentShareInternal", "");
                        //getShareNameandEmailIdInternal(vContractID, "ddlDocumentShareInternal");
                        $("#shareDocument").dialog("open");
                    }
                } else {
                    swal("", "This document cannot be Shared: Only<span style='font-weight:700'> doc, xls, ppt, docx, xlsx, pptx, dotx and pdf </span> type files are allowed.");
                }
                //}

                //if (documentStatus != "In Negotiation") {

                //}
                //else {
                //    swal("", "Negotiation/External Review is in progress for this document.");
                //}
                break;
            }
        case "approve":
            {
                var documentName = $(el).find("#DocumentName").text();
                var documentID = $(el).find("#DocumentID").text();
                $("#txtTodoTitle").val('Approval for ' + documentName.split('.')[0]);
                $("#ddlTodoType option").filter(function (index) { return $(this).text() === "Document Approval"; }).prop('selected', true);
                $("#txtBrowseElement").val(documentName);
                $("#txtBrowseElementID").val(documentID);
                $("#trBrowse").css("display", "");
                $("#browse").css("display", "none");
                $("#tdBrowseElement").html("Documents");
                $('#ddlTodoType').attr('disabled', 'disabled');

                GetValuesAndAutoPopulate("ddlApprovers", "");
                $("#txtDueDate").val("");
                //*Harshitha
                var nicInstance = nicEditors.findEditor('txtNotes');
                nicInstance.setContent('');

                $("#chkNotifyMe").prop('checked', false);
                $("#dvTodo").dialog("open");
                break;
            }
        case "review":
            {
                $(".FL_ApprovalSheetContract").css('display', 'none');
                var documentName = $(el).find("#DocumentName").text();
                var documentID = $(el).find("#DocumentID").text();
                var reviewWorkflow = $(el).find("#ReviewWorkflow").text();
                if (reviewWorkflow == "In Progress") {
                    //swal("", "Document Review is in progress for this document.");
                    $("#alertText1").html("Document Review is in progress for this document.");
                    $("#textingdetails").html('<a target="_blank" title="View Workflow Details" href=' + workflowurltoshowDOCUMENT + '><font color="#44A6D8">View Workflow Details</font></a>');
                    $("#dvAlertDetails1").dialog("open");
                }
                else {
                    $("#loadingPage").fadeIn();
                    if ($("#contractDetailsSummaryConfiguration").css('display') != 'none') {
                        $("#contractDetailsSummaryConfiguration").css('display', 'none');
                    }
                    var businessArea = $("#lblBusinessArea").text();
                    var contractArea = $("#lblContractArea").text();
                    $("#tblStage").empty();
                    $("#ddlRule").empty();
                    if (contractItem.IsFinalized == 'Yes') {
                        $("#liAutoUpdateStatus").css('display', 'none');
                    } else {
                        $("#liAutoUpdateStatus").css('display', '');
                        $('#chkAutoUpdateStatus').prop('checked', true);
                    }
                    $("#txtWorkflowTitle").val('Review for ' + documentName);
                    //manoj
                    $("#txtWorkflowTitle").prop('readonly', false);
                    //manoj
                    $("#lblAutoUpdateStatus").text('Auto update Document status based on this Workflow.');
                    $("#txtDuration").val("");
                    //*Harshitha
                    var nicInstance = nicEditors.findEditor('txtComment');
                    nicInstance.setContent('');

                    $("#hdWorkflowType").val("Document Review");
                    $("#hdWorkflowObjectID").val(documentID);
                    $("#hdWorkflowObjectTitle").val(documentName);
                    GetValuesAndAutoPopulate("ddlWorkflowCC", "");

                    var vWorkflowSettings = [];
                    $.ajax({
                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Workflow/evaluate?workflowType=Document Review&contractArea=' + encodeURIComponent(contractArea) + '&businessArea=' + encodeURIComponent(businessArea) + '&contractid=' + documentID,
                        type: 'GET',
                        cache: false,
                        contentType: false,
                        headers: { 'eContracts-ApiKey': localStorage.APIKey },
                        processData: false,
                        success: function (item) {
                            vWorkflowSettings = item.WorkflowSettings;

                            var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
                            var vAccFeat = $.grep(veContractFeatures, function (n, i) {
                                return (n.RowKey == "8" && n.Status == "ON");
                            });
                            if (vAccFeat.length > 0) {
                                vWorkflowRules = item.WorkflowRules;
                            }
                            if (item.WorkflowSettings != null) {
                                workflowRoutingOptions = vWorkflowSettings.WorkflowRoutingOptions.split(";");
                                workflowRoutingOptions = $.map(workflowRoutingOptions, $.trim);
                                if (workflowRoutingOptions.indexOf("Allow adding additional Stages") == -1) {
                                    if (workflowRoutingOptions.indexOf("Allow over-ride of Admin Configuration") == -1) {
                                        $("#spAddStage").css("display", "none");
                                    }
                                }
                                $("#txtDuration").val(vWorkflowSettings.TaskDuration);
                                if ($("#txtDuration").val() != "") {
                                    $("#txtDuration").trigger("onchange");
                                } else {
                                    $("#lblDurationDate").empty();
                                }
                            }
                            if (vWorkflowRules.length > 0) {
                                $(vWorkflowRules).each(function (i, rule) {
                                    $("#ddlRule").append('<option value="' + rule.RuleName + '">' + rule.RuleName + '</option>');
                                });
                                var workflowRules = vWorkflowRules[0];
                                $("#ddlRule").find('option[value="' + workflowRules.RuleName + '"]').prop("selected", true);
                                if (vWorkflowRules.length == 1) {
                                    $("#lblddlRule").css("display", "");
                                    $("#ddlRule").css("display", "none");
                                    $("#lblddlRule").text(workflowRules.RuleName);
                                    $("#ddlRule").attr('disabled', 'disabled');
                                }
                                else {
                                    $("#lblddlRule").text("");
                                    $("#lblddlRule").css("display", "none");
                                    $("#ddlRule").css("display", "");
                                    $("#ddlRule").removeAttr("disabled");
                                }
                                var participantsInXML = workflowRules.ParticipantsInXML;
                                var totalFileCount = 0;
                                if (workflowRules.RuleName == "Default") {
                                    if (typeof workflowRules.WorkflowTitle != 'undefined' && workflowRules.WorkflowTitle != "") {
                                        $("#txtWorkflowTitle").val(workflowRules.WorkflowTitle + ' for ' + documentName);
                                    } else {
                                        $("#txtWorkflowTitle").val('Review for ' + documentName);
                                    }
                                }
                                else {
                                    if (typeof workflowRules.WorkflowTitle != 'undefined' && workflowRules.WorkflowTitle != "") {
                                        $("#txtWorkflowTitle").val(workflowRules.WorkflowTitle + ' for ' + documentName);
                                    } else {
                                        $("#txtWorkflowTitle").val('Conditional Review Workflow for ' + documentName);
                                    }
                                }
                                //If the rule is ad-hoc 
                                if (participantsInXML != "") {
                                    $(participantsInXML).find('WorkflowPaticipant').each(function () {
                                        var StageTitle = $(this).find('StageTitle').text();
                                        var Participants = $(this).find('Participants').text();
                                        var Order = $(this).find('Order').text();
                                        totalFileCount++;
                                        var htmlFormatFile = '<tr id="trStage' + totalFileCount + '">';
                                        htmlFormatFile += '<td class="width30 wf_approval">';
                                        htmlFormatFile += '<input id="txtStage' + totalFileCount + '" value="' + StageTitle + '" name="Stage' + totalFileCount + '" title="Stage" placeholder="Stage Name" type="text" class="f_inpt width95 validelement" />';
                                        htmlFormatFile += '</td>';
                                        htmlFormatFile += '<td class="width46">';
                                        htmlFormatFile += '<select id="ddlAssignTo' + totalFileCount + '" name="AssignTo' + totalFileCount + '"  multiple="multiple" data-placeholder="Select" class="width97 a-Workflow-height validmultiselect"></select>';
                                        htmlFormatFile += '</td>';
                                        htmlFormatFile += '<td class="width20 padding_top_3px v_align_top">';
                                        htmlFormatFile += '<select id="ddlOrder' + totalFileCount + '" name="Order' + totalFileCount + '"  class="f_inpt width97 height32">';
                                        if (Order == "Serial")
                                            htmlFormatFile += '<option value="Serial" selected="selected">Serial</option><option value="Parallel">Parallel</option></select>';
                                        else
                                            htmlFormatFile += '<option value="Serial">Serial</option><option value="Parallel" selected="selected">Parallel</option></select>';
                                        htmlFormatFile += '</td>';
                                        htmlFormatFile += '<td class="width4">';
                                        if (totalFileCount > 1)
                                            htmlFormatFile += '<img id="imgStageDelete' + totalFileCount + '" src="../Content/Images/icon/delete.png" style="width: 20px" onclick="DeleteStage(this)" />';
                                        else
                                            htmlFormatFile += '<img id="imgStageDelete' + totalFileCount + '" src="../Content/Images/icon/delete.png" style="visibility: hidden; width: 20px" onclick="DeleteStage(this)" />';
                                        htmlFormatFile += '</td>';
                                        htmlFormatFile += '</tr>';

                                        $("#tblStage").append(htmlFormatFile);
                                        var $options = $("#ddlApprovers > option").clone();
                                        $('#ddlAssignTo' + totalFileCount).append($options);
                                        $("#ddlAssignTo" + totalFileCount).chosen().change(function () {
                                            var vasstoid = $(this).attr('id').replace("ddlAssignTo", "");
                                            if ($(this).val() != null) {
                                                if ($(this).val().length > 1 && (workflowRoutingOptions.indexOf("Allow over-ride of Admin Configuration") >= 0 ||
                                                    workflowRoutingOptions.indexOf("Allow replacing participants") >= 0)) {
                                                    $("#ddlOrder" + vasstoid).prop('disabled', false);
                                                }
                                                else {
                                                    $("#ddlOrder" + vasstoid).val("Serial");
                                                    $("#ddlOrder" + vasstoid).prop('disabled', true);
                                                }
                                            }
                                            else {
                                                $("#ddlOrder" + vasstoid).val("Serial");
                                                $("#ddlOrder" + vasstoid).prop('disabled', true);
                                            }
                                        });
                                        GetValuesAndAutoPopulate("ddlAssignTo" + totalFileCount, Participants);
                                        var vParticipantsArr = Participants.split(";");
                                        if (vParticipantsArr.length > 1)
                                            $("#ddlOrder" + totalFileCount).prop('disabled', false);
                                        else
                                            $("#ddlOrder" + totalFileCount).prop('disabled', true);


                                        if (item.WorkflowSettings != null) {
                                            if (workflowRoutingOptions.indexOf("Allow over-ride of Admin Configuration") == -1) {
                                                if (workflowRoutingOptions.indexOf("Allow replacing participants") == -1) {
                                                    $("#ddlAssignTo" + totalFileCount).prop('disabled', true).trigger("chosen:updated");
                                                    $("#ddlOrder" + totalFileCount).prop('disabled', true);
                                                }
                                                $("#txtStage" + totalFileCount).prop('disabled', true);
                                                $("#imgStageDelete" + totalFileCount).css("visibility", "hidden");
                                            }
                                        }
                                    });
                                }
                                else {
                                    if ($("#ddlRule").html() == "") {
                                        $("#ddlRule").append('<option value="Ad-hoc">Ad-hoc</option>');
                                        $("#lblddlRule").css("display", "");
                                        $("#ddlRule").css("display", "none");
                                        $("#lblddlRule").text("Ad-hoc");
                                    }
                                    if (!workflowAdHoc)
                                        $("#ddlRule").attr('disabled', 'disabled');
                                    var totalFileCount = 1;
                                    var htmlFormatFile = '<tr id="trStage' + totalFileCount + '">';
                                    htmlFormatFile += '<td class="width30" style="vertical-align: middle; padding-right: 11px;padding-top: 2px;">';
                                    htmlFormatFile += '<input id="txtStage' + totalFileCount + '" name="Stage' + totalFileCount + '" title="Stage" placeholder="Stage Name" type="text" class="f_inpt width95 validelement" value="Stage ' + totalFileCount + '"/>';
                                    htmlFormatFile += '</td>';
                                    htmlFormatFile += '<td class="width46 v_align_middle" style="padding-top: 2px;">';
                                    htmlFormatFile += '<select id="ddlAssignTo' + totalFileCount + '" name="AssignTo' + totalFileCount + '"  multiple="multiple" data-placeholder="Select" class="width97 a-Workflow-height validmultiselect"></select>';
                                    htmlFormatFile += '</td>';
                                    htmlFormatFile += '<td class="width20" style="vertical-align: middle;">';
                                    htmlFormatFile += '<select id="ddlOrder' + totalFileCount + '" name="Order' + totalFileCount + '"  class="f_inpt width97 height32" disabled="disabled"><option selected="selected">Serial</option><option>Parallel</option></select>';
                                    htmlFormatFile += '</td>';
                                    htmlFormatFile += '<td class="width4">';
                                    htmlFormatFile += '<img src="../Content/Images/icon/delete.png" style="visibility: hidden; width: 20px" onclick="DeleteStage(this)" />';
                                    htmlFormatFile += '</td>';
                                    htmlFormatFile += '</tr>';

                                    $("#tblStage").append(htmlFormatFile);
                                    var $options = $("#ddlApprovers > option").clone();
                                    $('#ddlAssignTo' + totalFileCount).append($options);

                                    $("#ddlAssignTo" + totalFileCount).chosen().change(function () {
                                        var vasstoid = $(this).attr('id').replace("ddlAssignTo", "");
                                        if ($(this).val() != null) {
                                            if ($(this).val().length > 1) {
                                                $("#ddlOrder" + vasstoid).prop('disabled', false);
                                            }
                                            else {
                                                $("#ddlOrder" + vasstoid).val("Serial");
                                                $("#ddlOrder" + vasstoid).prop('disabled', true);
                                            }
                                        }
                                        else {
                                            $("#ddlOrder" + vasstoid).val("Serial");
                                            $("#ddlOrder" + vasstoid).prop('disabled', true);
                                        }
                                    });
                                }
                            }
                            else {
                                if ($("#ddlRule").html() == "") {
                                    $("#ddlRule").append('<option value="Ad-hoc">Ad-hoc</option>');
                                    $("#lblddlRule").css("display", "");
                                    $("#ddlRule").css("display", "none");
                                    $("#lblddlRule").text("Ad-hoc");
                                }
                                if (!workflowAdHoc)
                                    $("#ddlRule").attr('disabled', 'disabled');
                                var totalFileCount = 1;
                                var htmlFormatFile = '<tr id="trStage' + totalFileCount + '">';
                                htmlFormatFile += '<td class="width30" style="vertical-align: middle; padding-right: 11px;padding-top: 2px;">';
                                htmlFormatFile += '<input id="txtStage' + totalFileCount + '" name="Stage' + totalFileCount + '" title="Stage" placeholder="Stage Name" type="text" class="f_inpt width95 validelement" value="Stage ' + totalFileCount + '"/>';
                                htmlFormatFile += '</td>';
                                htmlFormatFile += '<td class="width46 v_align_middle" style="padding-top: 2px;">';
                                htmlFormatFile += '<select id="ddlAssignTo' + totalFileCount + '" name="AssignTo' + totalFileCount + '"  multiple="multiple" data-placeholder="Select" class="width97 a-Workflow-height validmultiselect"></select>';
                                htmlFormatFile += '</td>';
                                htmlFormatFile += '<td class="width20" style="vertical-align: middle;">';
                                htmlFormatFile += '<select id="ddlOrder' + totalFileCount + '" name="Order' + totalFileCount + '"  class="f_inpt width97 height32" disabled="disabled"><option selected="selected">Serial</option><option>Parallel</option></select>';
                                htmlFormatFile += '</td>';
                                htmlFormatFile += '<td class="width4">';
                                htmlFormatFile += '<img src="../Content/Images/icon/delete.png" style="visibility: hidden; width: 20px" onclick="DeleteStage(this)" />';
                                htmlFormatFile += '</td>';
                                htmlFormatFile += '</tr>';

                                $("#tblStage").append(htmlFormatFile);
                                var $options = $("#ddlApprovers > option").clone();
                                $('#ddlAssignTo' + totalFileCount).append($options);

                                $("#ddlAssignTo" + totalFileCount).chosen().change(function () {
                                    var vasstoid = $(this).attr('id').replace("ddlAssignTo", "");
                                    if ($(this).val() != null) {
                                        if ($(this).val().length > 1) {
                                            $("#ddlOrder" + vasstoid).prop('disabled', false);
                                        }
                                        else {
                                            $("#ddlOrder" + vasstoid).val("Serial");
                                            $("#ddlOrder" + vasstoid).prop('disabled', true);
                                        }
                                    }
                                    else {
                                        $("#ddlOrder" + vasstoid).val("Serial");
                                        $("#ddlOrder" + vasstoid).prop('disabled', true);
                                    }
                                });
                            }
                            //ENH492 - Workflow Cycle time Report & default naming of stages.
                            $("#txtStage" + totalFileCount).autocomplete({
                                source: StageName,
                                minLength: 1,
                                focus: function (event, ui) {
                                    return false;
                                },
                                select: function (evn, uidetails) {
                                    $("#txtStage" + totalFileCount).val(uidetails.item.label);

                                }
                            });
                            $("#loadingPage").fadeOut();
                            $("#dvWorkflow").dialog("option", "title", "Document Review Workflow");
                            $("#dvWorkflow").dialog("open");
                            $("#dvWorkflow").height("auto");
                        },
                        error: function () {
                            $("#ddlRule").append('<option value="Ad-hoc">Ad-hoc</option>');
                            $("#lblddlRule").css("display", "");
                            $("#ddlRule").css("display", "none");
                            $("#lblddlRule").text("Ad-hoc");
                            if (!workflowAdHoc)
                                $("#ddlRule").attr('disabled', 'disabled');
                            var totalFileCount = 1;
                            var htmlFormatFile = '<tr id="trStage' + totalFileCount + '">';
                            htmlFormatFile += '<td class="width30 wf_approval">';
                            htmlFormatFile += '<input id="txtStage' + totalFileCount + '" name="Stage' + totalFileCount + '" title="Stage" placeholder="Stage Name" type="text" class="f_inpt width95 validelement" value="Stage ' + totalFileCount + '"/>';
                            htmlFormatFile += '</td>';
                            htmlFormatFile += '<td class="width46">';
                            htmlFormatFile += '<select id="ddlAssignTo' + totalFileCount + '" name="AssignTo' + totalFileCount + '"  multiple="multiple" data-placeholder="Select" class="width97 a-Workflow-height validmultiselect"></select>';
                            htmlFormatFile += '</td>';
                            htmlFormatFile += '<td class="width20 padding_top_3px v_align_top">';
                            htmlFormatFile += '<select id="ddlOrder' + totalFileCount + '" name="Order' + totalFileCount + '"  class="f_inpt width97 height32" disabled="disabled"><option selected="selected">Serial</option><option>Parallel</option></select>';
                            htmlFormatFile += '</td>';
                            htmlFormatFile += '<td class="width4 padding_top_10px v_align_top">';
                            htmlFormatFile += '<img src="../Content/Images/icon/delete.png" style="visibility: hidden; width: 20px" onclick="DeleteStage(this)" />';
                            htmlFormatFile += '</td>';
                            htmlFormatFile += '</tr>';

                            $("#tblStage").append(htmlFormatFile);
                            var $options = $("#ddlApprovers > option").clone();
                            $('#ddlAssignTo' + totalFileCount).append($options);
                            $("#ddlAssignTo" + totalFileCount).chosen().change(function () {
                                var vasstoid = $(this).attr('id').replace("ddlAssignTo", "");
                                if ($(this).val() != null) {
                                    if ($(this).val().length > 1) {
                                        $("#ddlOrder" + vasstoid).prop('disabled', false);
                                    }
                                    else {
                                        $("#ddlOrder" + vasstoid).val("Serial");
                                        $("#ddlOrder" + vasstoid).prop('disabled', true);
                                    }
                                }
                                else {
                                    $("#ddlOrder" + vasstoid).val("Serial");
                                    $("#ddlOrder" + vasstoid).prop('disabled', true);
                                }
                            });
                            $("#txtStage" + totalFileCount).autocomplete({
                                source: StageName,
                                minLength: 1,
                                focus: function (event, ui) {
                                    return false;
                                },
                                select: function (evn, uidetails) {
                                    $("#txtStage" + totalFileCount).val(uidetails.item.label);

                                }
                            });
                            $("#loadingPage").fadeOut();
                            $("#dvWorkflow").dialog("option", "title", "Document Review Workflow");
                            $("#dvWorkflow").dialog("open");
                            $("#dvWorkflow").height("auto");
                        }
                    });
                }
                break;
            }
        case "version": {
            $("#tblVersionHistory").empty();
            $("#loadingPage").fadeIn();
            var documentID = $(el).find("#DocumentID").text();
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/' + documentID + '/versions',
                type: 'GET',
                dataType: 'json',
                "Content-Type": "application/json",
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'RefreshToken': localStorage.RefreshToken },
                cache: false,
                success: function (data) {
                    var datalenght = data.length;
                    for (var i = datalenght - 1 ; i >= 0; i--) {
                        var item = data[i];
                        var formatModifiedDate = '';
                        if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                        { formatModifiedDate = moment(new Date(item.Modified)).format('MM/DD/YYYY'); }
                        else { formatModifiedDate = moment(new Date(item.Modified)).format(localStorage.AppDateFormat); }

                        var article = "";
                        article += '<tr>';
                        article += '<td>' + item.VersionNo + '</td>';
                        article += '<td>' + item.Size + '</td>';
                        article += '<td>' + formatModifiedDate + '</td>';
                        article += '<td>' + item.ModifiedBy + '</td>';
                        article += '</tr>';
                        $("#tblVersionHistory").append(article);
                    }

                    $("#loadingPage").fadeOut();
                    $("#dvVersionHistory").dialog("open");
                },
                error: function () {
                    $("#loadingPage").fadeOut();
                }
            });
            break;
        }
    }
}

var droppedControls = 0;
var dropcontrolifdelete = 0;
function readfiles(files) {
    var documentidcount = "";
    var filelistexit = "";
    var unvalidfile = "";
    var FileList = "";
    var rejectedfile = '';
    var vControl = "";
    var controluploadsetion = "";
    var uploingsectionid = 1;
    var lesscharfilename = "";
    var dropexitfilenamevalue = "";
    var fileslength = files.length;
    if (document.getElementById("tbBulkControls").rows.length > 0) {
        droppedControls = document.getElementById("tbBulkControls").rows.length - 1;
        uploingsectionid = document.getElementById("tbBulkControls").rows.length;
    }

    ////manoj
    //var headerid = $("#lblContractTitle").text();
    //headerid = headerid.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').replace(/[\*\|\,\"\:\<\>\[\}\{\}\'\(\)\&\#\%\.\-\!]/g, '').replace(/\//g, '').replace(/\s\s+/g, " ").trim();
    //var finalurl = "";
    ////var newurl = "";
    ////if ($('#hdnContractDocumentsUrl').text() != "") {
    //finalurl = ($('#hdContAreaDocLibName').val() != null && $('#hdContAreaDocLibName').val() != "") ? $('#hdContAreaDocLibName').val() : '/Contract Documents/';
    //finalurl = (finalurl.charAt(0) != '/') ? '/' + finalurl : finalurl;
    //finalurl = ((finalurl.substr(finalurl.length - 1)) != "/") ? finalurl + "/" : finalurl;
    //finalurl = ($('#showAll').text().replace(/ \/ /g, '/') != null && $('#showAll').text().replace(/ \/ /g, '/') != "") ? finalurl + $('#showAll').text().replace(/ \/ /g, '/') + '/' : finalurl + headerid + '/';
    ////if ($('#showAll').text().replace(/ \/ /g, '/') != null && $('#showAll').text().replace(/ \/ /g, '/') != "") {
    ////    $('#hdnContractDocumentsUrl').text(newurl + "/" + $('#showAll').text().replace(/ \/ /g, '/') + '/')
    ////} else {
    ////    $('#hdnContractDocumentsUrl').text(newurl + "/");
    ////}
    ////} else {
    ////    finalurl = ($('#hdContAreaDocLibName').val() != null && $('#hdContAreaDocLibName').val() != "") ? $('#hdContAreaDocLibName').val() : '/Contract Documents/';
    ////    //finalurl = $('#hdContAreaDocLibName').val();
    ////    finalurl = (finalurl.charAt(0) != '/') ? '/' + finalurl : finalurl;
    ////    finalurl = ((finalurl.substr(finalurl.length - 1)) != "/") ? finalurl + "/" : finalurl;
    ////    finalurl = (headerid != "" && (!$.isEmptyObject(headerid))) ? finalurl + headerid + '/' : finalurl;
    ////    $("#hdnContractDocumentsUrl").text(finalurl)
    ////}
    ////if ($("#hdnContractDocumentsUrl").text() != "") {
    ////    var lastcharfind = $("#hdnContractDocumentsUrl").text();
    ////    finalurl = (lastcharfind.substr(lastcharfind.length - 1) != "/") ? $("#hdnContractDocumentsUrl").text() + "/" : $("#hdnContractDocumentsUrl").text();
    ////    //lastcharfind = lastcharfind.substr(lastcharfind.length - 1)
    ////    //if (lastcharfind == "/") {
    ////    //    finalurl = $("#hdnContractDocumentsUrl").text();
    ////    //}
    ////    //else {
    ////    //    finalurl = $("#hdnContractDocumentsUrl").text() + "/";
    ////    //}
    ////}
    ////else {

    ////}
    ////manoj

    for (var i = 0; i < fileslength; i++) {
        var file = files[i];
        var acceptExtension = ['pdf', 'png', 'jpg', 'gif', 'bmp', 'doc', 'xls', 'ppt', 'docx', 'xlsx', 'txt', 'pptx', 'dotx', 'xps', 'rtf', 'odt', 'msg', 'dotm', 'docm', 'tif', 'tiff', 'TIF', 'TIFF', 'zip', 'ZIP'];
        var ext = file.name.split('.').pop().toString();
        if (acceptExtension.indexOf(ext.trim().toLowerCase()) > -1) {
            if ('size' in file) {
                var Filelengthcol = Math.round((file.size / 1048576));
                if (Filelengthcol > (Math.round(parseInt(localStorage.MaxRequestLength) / 1000))) {
                    //swal("", "The maximum permissible size is " + Math.round(((localStorage.MaxRequestLength / 1024) / 1024) * 10) / 10 + " MB, Please upload a file which is less than " + Math.round(((localStorage.MaxRequestLength / 1024) / 1024) * 10) / 10 + " MB");
                    if (FileList == "") {
                        FileList = files[i].name;
                    } else {
                        FileList += "," + files[i].name;
                    }
                    var index = droppedfiles.indexOf(files[i]);
                    if (index > -1) {
                        droppedfiles.splice(index, 1);
                    }
                } else if (dropexitfilename.indexOf(files[i].name) > -1) {
                    if (dropexitfilenamevalue == "") {
                        dropexitfilenamevalue = files[i].name;
                    } else {
                        dropexitfilenamevalue += "," + files[i].name;
                    }
                    var index = droppedfiles.lastIndexOf(files[i]);
                    if (index > -1) {
                        droppedfiles.splice(index, 1);
                    }
                }
                else {
                    if (IsFileValid(files[i].name)) {
                        var ValidateFileName = files[i].name.substr(0, files[i].name.lastIndexOf('.'));
                        var isNameValid = isSpecialCharacterFileName(files[i].name.substr(0, files[i].name.lastIndexOf('.')));
                        var isExists = true;
                        if (isNameValid == true) {
                            isExists = CheckDocumentExist("#spnDocFolderURL_New", files[i].name)
                        }
                        if (!isExists && isNameValid && (isContainsThreeAlphabets(files[i].name.substr(0, files[i].name.lastIndexOf('.'))))) {
                            if (droppedControls == 0) {
                                vControl += "<thead><tr>";
                                vControl += "<th style='width:50px'> Document Name";
                                vControl += "</th>";
                                vControl += "<th style='width:200px'> Document Type";
                                vControl += "</th>";
                                vControl += "<th style='width:200px'> Document Status";
                                vControl += "</th>";
                                if (OCRDocEnabled) {
                                    vControl += "<th style='width:100px; text-align: center!important' > Enable OCR";
                                    vControl += "</th>";
                                } else {
                                    vControl += "<th style='width:100px; text-align: center!important;display:none'> Enable OCR";
                                    vControl += "</th>";
                                }
                                vControl += "<th style='display:none;width:25%'> Document Path";
                                vControl += "</th>";
                                vControl += "<th style='width:100px'>Upload Status";
                                vControl += "</th>";
                                vControl += "<th style='width:50px'> Action";
                                vControl += "</th>";
                                //vControl += "<th style='display:none;'></th></tr></thead>";
                                vControl += "</thead>";
                            }
                            if (droppedControls == dropcontrolifdelete) {
                                var trid = 'tr_' + droppedControls;
                                var vContractTitle = 'ContractTitle_' + droppedControls;
                                var docid = 'ddlDocumentType_' + droppedControls;
                                var vDocumentPath = 'PathContractTitle_' + droppedControls;
                                var vDocumentPathLabel = 'LabelPathContractTitle_' + droppedControls;
                                var checkboxid = 'chkbx_' + droppedControls;
                                var checkboxidocr = 'chkbkocr_' + droppedControls;

                                if (isExists) {
                                    vControl += "<tr id='" + trid + "' style='color:red'>";
                                } else {
                                    vControl += "<tr id=" + trid + ">";
                                }

                                vControl += "<td ><span title='" + files[i].name.replace(/'/g, "") + "' class='upload_lab' style='max-width: none !important;width: 250px!important;'>" + files[i].name + "</span>";
                                vControl += "</td>";
                                vControl += "<td >";
                                vControl += "<select id=" + docid + " name=" + docid + " class='f_inpt width60'>";
                                vControl += "<option value='0'>--Select--</option></td>";
                                vControl += "<td><select id='ddlDocumentStatus" + droppedControls + "' name='ddlDocumentStatus" + droppedControls + "' class='f_inpt width60 validelement'>";
                                vControl += "<option value='0'>--Select--</option>";
                                vControl += "<option value='New' selected='selected'>New</option>";
                                vControl += "<option value='Awaiting Review'>Awaiting Review</option>";
                                vControl += "<option value='Reviewed'>Reviewed</option>";
                                vControl += "<option value='In Negotiation'>In Negotiation</option>";
                                vControl += "<option value='Negotiation Complete'>Negotiation Complete</option>";
                                vControl += "<option value='Ready for Signature'>Ready for Signature</option>";
                                vControl += "<option value='Awaiting Signatures'>Awaiting Signatures</option>";
                                vControl += "<option value='Signed'>Signed</option>";
                                vControl += "<option value='Active'>Active</option>";
                                vControl += "<option value='Expired'>Expired</option>";
                                vControl += "</select></td>";
                                if (OCRDocEnabled) {
                                    vControl += "<td style='text-align: center!important;'>";
                                } else {
                                    vControl += "<td style='text-align: center!important; display:none'>";
                                }
                                //manoj
                                var FileExt = files[i].name.split('.').pop().toString();
                                if (FileExt == 'PDF' || FileExt == 'pdf' || FileExt == 'tif' || FileExt == 'TIF' || FileExt == 'tiff' || FileExt == 'TIFF') {
                                    vControl += "<p style='margin-top: 8px; font-size:13px;'><input type='checkbox' name='convert' id=" + checkboxidocr + " onchange='ChangeDocumentBulk_New(this)'><p>";
                                } else {
                                    vControl += "<p style='margin-top: 8px; font-size:13px;'><input type='checkbox' name='convert' id=" + checkboxidocr + " disabled ><p>";
                                }
                                vControl += "</td>";
                                //manoj
                                vControl += "<td width='25%' style='display:none;'>";
                                vControl += "<input id=" + vDocumentPath + " style='display:none;' class='width60' readonly type='text' value='" + $("#spnDocFolderURL_New").text() + "' name=" + vDocumentPath + ">";
                                vControl += "<label id=" + vDocumentPathLabel + "> " + $("#spnDocFolderURL_New").text() + " </label>";
                                vControl += "</td>";
                                vControl += '<td><label id="uploadprogresslbl' + droppedControls + '"></label><span id="idLoading' + droppedControls + '" style="font-size:14px; margin-right:10px;display:none;"><img src="../Content/Images/loading.gif" /> Uploading Documents...</span><span id="idLoadingstart' + droppedControls + '" style="font-size:14px; margin-right:10px;">Start</span><span id="idLoadingcomplete' + droppedControls + '" style="font-size:14px; margin-right:10px;display:none;">Uploaded</span></td>';
                                vControl += "<td><img src='../Content/Images/Manage_close_red.png' title='Remove' onclick='deleteDoc(\"" + trid + "\");' style='float:left; padding-top:7px; cursor:pointer;'></td></tr>"
                                documentidcount += ";" + docid;
                                dropcontrolifdelete++;
                                droppedControls++;
                                dropexitfilename.push(files[i].name);
                            }
                            else {
                                var trid = 'tr_' + dropcontrolifdelete;
                                var vContractTitle = 'ContractTitle_' + dropcontrolifdelete;
                                var docid = 'ddlDocumentType_' + dropcontrolifdelete;
                                var vDocumentPath = 'PathContractTitle_' + dropcontrolifdelete;
                                var vDocumentPathLabel = 'LabelPathContractTitle_' + dropcontrolifdelete;
                                var checkboxid = 'chkbx_' + dropcontrolifdelete;
                                var checkboxidocr = 'chkbkocr_' + dropcontrolifdelete;

                                if (isExists) {
                                    vControl += "<tr id='" + trid + "' style='color:red'>";
                                } else {
                                    vControl += "<tr id=" + trid + ">";
                                }

                                //vControl += "<tr id=" + trid + ">";
                                vControl += "<td ><span title='" + files[i].name.replace(/'/g, "") + "' class='upload_lab' style='max-width: none !important;width: 250px!important;'>" + files[i].name + "</span>";
                                vControl += "</td>";
                                vControl += "<td >";
                                vControl += "<select id=" + docid + " name=" + docid + " class='f_inpt width60'>";
                                vControl += "<option value='0'>--Select--</option></td>";
                                vControl += "<td ><select id='ddlDocumentStatus" + dropcontrolifdelete + "' name='ddlDocumentStatus" + dropcontrolifdelete + "' class='f_inpt width60 validelement'>";
                                vControl += "<option value='0'>--Select--</option>";
                                vControl += "<option value='New' selected='selected'>New</option>";
                                vControl += "<option value='Awaiting Review'>Awaiting Review</option>";
                                vControl += "<option value='Reviewed'>Reviewed</option>";
                                vControl += "<option value='In Negotiation'>In Negotiation</option>";
                                vControl += "<option value='Negotiation Complete'>Negotiation Complete</option>";
                                vControl += "<option value='Ready for Signature'>Ready for Signature</option>";
                                vControl += "<option value='Awaiting Signatures'>Awaiting Signatures</option>";
                                vControl += "<option value='Signed'>Signed</option>";
                                vControl += "<option value='Active'>Active</option>";
                                vControl += "<option value='Expired'>Expired</option>";
                                vControl += "</select></td>";
                                if (OCRDocEnabled) {
                                    vControl += "<td style='text-align: center!important;'>";
                                } else {
                                    vControl += "<tdstyle='text-align: center!important;display:none'>";
                                }
                                //manoj
                                var FileExt = files[i].name.split('.').pop().toString();
                                if (FileExt == 'PDF' || FileExt == 'pdf' || FileExt == 'tif' || FileExt == 'TIF' || FileExt == 'tiff' || FileExt == 'TIFF') {
                                    vControl += "<p style='margin-top: 8px; font-size:13px;'><input type='checkbox' name='convert' id=" + checkboxidocr + "  onchange='ChangeDocumentBulk_New(this)'><p>";
                                } else {
                                    vControl += "<p style='margin-top: 8px; font-size:13px;'><input type='checkbox' name='convert' id=" + checkboxidocr + " disabled ><p>";
                                }
                                vControl += "</td>";
                                //manoj
                                vControl += "<td width='25%' style='display:none;'>";
                                vControl += "<input id=" + vDocumentPath + " style='display:none;' class='width60' readonly type='text' value='" + $("#spnDocFolderURL_New").text() + "' name=" + vDocumentPath + ">";
                                vControl += "<label id=" + vDocumentPathLabel + "> " + $("#spnDocFolderURL_New").text() + " </label>";
                                vControl += "</td>";
                                vControl += '<td><label id="uploadprogresslbl' + dropcontrolifdelete + '"></label><span id="idLoading' + dropcontrolifdelete + '" style="font-size:14px; margin-right:10px;display:none;"><img src="../Content/Images/loading.gif" /> Uploading Documents...</span><span id="idLoadingstart' + dropcontrolifdelete + '" style="font-size:14px; margin-right:10px;">Start</span><span id="idLoadingcomplete' + dropcontrolifdelete + '" style="font-size:14px; margin-right:10px;display:none;">Uploaded</span></td>';
                                vControl += "<td><img src='../Content/Images/Manage_close_red.png' title='Remove' onclick='deleteDoc(\"" + trid + "\");' style='float:right; padding-top:7px; cursor:pointer;'></td></tr>"
                                documentidcount += ";" + docid;
                                droppedControls++;
                                dropcontrolifdelete++;
                                dropexitfilename.push(files[i].name);
                            }
                        }
                        else {
                            if (!isNameValid) {
                                if (unvalidfile == "") {
                                    unvalidfile = files[i].name;
                                }
                                else {
                                    unvalidfile += "," + files[i].name;
                                }
                            }
                            else if (isExists) {
                                if (filelistexit == "") {
                                    filelistexit = files[i].name;
                                }
                                else {
                                    filelistexit += "," + files[i].name;
                                }
                            } else {
                                if (lesscharfilename == "") {
                                    lesscharfilename = files[i].name;
                                } else {
                                    lesscharfilename += "," + files[i].name;
                                }
                            }
                            var index = droppedfiles.indexOf(files[i]);
                            if (index > -1) {
                                droppedfiles.splice(index, 1);
                            }
                        }
                    }
                }
            }
        }
        else {
            if (rejectedfile == "") {
                rejectedfile = files[i].name;
            } else {
                rejectedfile += "," + files[i].name;
            }
            var index = droppedfiles.indexOf(files[i]);
            if (index > -1) {
                droppedfiles.splice(index, 1);
            }
        }
    }
    //Collectcontractdocument = false;
    //ContractDocumentDetails = [];
    if (FileList != null && FileList != "") {
        //swal("", "The maximum permissible size is 50MB, Please upload files which is less than 50MB");
        //swal("", "The maximum permissible size is " + Math.round(parseInt(localStorage.MaxRequestLength) / 1024) + " MB, Please upload a file which is less than " + Math.round(parseInt(localStorage.MaxRequestLength) / 1024) + " MB");
        swal("", "File exceeds " + Math.round((parseInt(localStorage.MaxRequestLength) / 1000)) + "MB size limit.");
        if (droppedfiles.length <= 0) {
            $("#tbBulkControls").empty();
            $("#file").empty();
            droppedfiles = [];
            dropexitfilename = [];
            opmlFile = null;
            droppedControls = 0;
            $("#lblFilesCount").text(droppedfiles + " file(s) uploaded.")
            loadinffdfdsf = 1;
        }
        FileList = "";
    } else {
        var alertvalue = "";
        if (filelistexit != null && filelistexit != "") {
            alertvalue = filelistexit + " already exists";
        }
        if (unvalidfile != null && unvalidfile != "") {
            if ((rejectedfile == null || rejectedfile == "") && (lesscharfilename == null || lesscharfilename == "") && (dropexitfilenamevalue == null && dropexitfilenamevalue == "") && (alertvalue == null || alertvalue == ""))
                alertvalue = unvalidfile + " File(s) names can't contain the following characters /:*\\?\"<>|#%";
            else if ((rejectedfile == null || rejectedfile == "") && (lesscharfilename == null || lesscharfilename == "") && (dropexitfilenamevalue == null && dropexitfilenamevalue == "")) {
                alertvalue += " and " + unvalidfile + " File(s) names can't contain the following characters /:*\\?\"<>|#%";
            } else {
                alertvalue += ", " + unvalidfile + " File(s) names can't contain the following characters /:*\\?\"<>|#%";
            }
        }

        if (rejectedfile != null && rejectedfile != "") {
            if ((lesscharfilename == null || lesscharfilename == "") && (dropexitfilenamevalue == null && dropexitfilenamevalue == "") && (alertvalue == null || alertvalue == ""))
                alertvalue = rejectedfile + " File(s) are not allowed";
            else if ((lesscharfilename == null || lesscharfilename == "") && (dropexitfilenamevalue == null && dropexitfilenamevalue == "")) {
                alertvalue += " and " + rejectedfile + " File(s) are not allowed";
            } else {
                alertvalue += ", " + rejectedfile + " File(s) are not allowed";
            }
        }

        if (lesscharfilename != null && lesscharfilename != "") {
            if ((dropexitfilenamevalue == null && dropexitfilenamevalue == "") && (alertvalue == null || alertvalue == ""))
                alertvalue = lesscharfilename + " File(s) names should contain the minimum of 3 alphabets";
            else if ((dropexitfilenamevalue == null && dropexitfilenamevalue == "")) {
                alertvalue += " and " + lesscharfilename + " File(s) names should contain the minimum of 3 alphabets";
            } else {
                alertvalue += "File(s) names should contain the minimum of 3 alphabets";
            }
        }

        if (dropexitfilenamevalue != null && dropexitfilenamevalue != "") {
            if ((alertvalue == null || alertvalue == ""))
                alertvalue = dropexitfilenamevalue + " File(s)  are already selected";
            else {
                alertvalue += " and " + dropexitfilenamevalue + " File(s) are already selected";
            }
        }

        if (alertvalue != null && alertvalue != "") {
            if (alertvalue.trim().indexOf('and') == 0) {
                alertvalue = alertvalue.replace('and', "");
                alertvalue = alertvalue.trim();
            }

            if (alertvalue.indexOf(',') == 0) {
                alertvalue = alertvalue.replace(',', "");
                alertvalue = alertvalue.trim();
            }
            alertvalue = alertvalue + ".";
            swal("", "" + alertvalue.trim() + "");
        }
        alertvalue = "";
    }

    $("#lblFilesCount").text(droppedControls + " file(s) selected.")
    $("#tbBulkControls").append(vControl);
    var xVlaueCount = $("#tbBulkControls tbody").find("tr").length;

    if (xVlaueCount == 0) {
        $("#tbBulkControls").empty();
        $("#lblFilesCount").text((xVlaueCount) + " file(s) selected.");
    } else {
        $('#tbBulkControls').css("pointer-events", "auto");
        getdocumenttypes(documentidcount);
        document.getElementById("holderbulk").style.border = "2px dashed #ccc";
        $('#holderbulk').css("opacity", "1");
        $('#holderbulk').css("pointer-events", "auto");
        document.getElementById("iddropfile").style.display = "none";
        $(".clManageDrop_New").css("display", "");
        // $(".clManageDropFldr_New").css("display", "");
        $(".clManageDrag_New").css("display", "none");
    }
    return xVlaueCount;
}
var holder;

function getdocumenttypes(obj) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/contractareadetailsbyname?contractareaname=' + encodeURIComponent(connamechecking),
        type: 'GET',
        dataType: 'json',
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        cache: false,
        success: function (documenttypes) {
            var datalenght = documenttypes.DocumentTypes.split(';');
            datalenght = stringArrayUnique(datalenght);
            if (obj.indexOf(';') > -1) {
                var objsplit = obj.split(';');
                for (var m = 0; m < objsplit.length; m++) {
                    if (objsplit[m] != "") {
                        if (datalenght.length > 0) {
                            for (var i = 0; i < datalenght.length; i++) { //Bug:eO311012 - 'Primary Agreement' not visible in Document Type Dropdown
                                if (datalenght[i] != null && datalenght[i] != "") { // && datalenght[i] != "Primary Agreement"
                                    $("#" + objsplit[m]).append("<option value='" + datalenght[i] + "'>" + datalenght[i] + "</option>")
                                }
                            }
                        }
                        //else {
                        //    $("#" + objsplit[m]).append("<option value='Primary Agreement'>Primary Agreement</option>")
                        //}
                        if ($("#" + objsplit[m] + " option[value='Others']").length == 0) {
                            $("#" + objsplit[m]).append("<option value='Others'>Others</option>");
                        }
                        //$("#" + objsplit[m]).find('option[value="Primary Agreement"]').prop("selected", true);
                    }
                }
            }
            else {
                //$("#" + obj).append("<option value='Primary Agreement'>Primary Agreement</option>")
                $("#" + obj).append("<option value='Others'>Others</option>")
                //$("#" + obj).find('option[value="Primary Agreement"]').prop("selected", true);
            }
        },
        error:
            function (data) {
            }
    });
}

//function deleteDoc(obj) {
//    $("#" + obj).empty();
//    removedItems.push(obj.split(/[_ ]+/).pop());
//    droppedControls--;
//    document.getElementById('files').addEventListener('change', handleFileSelect, false);
//    $("#lblFilesCount").text(droppedControls + " file(s) selected.");
//    if (droppedControls == 0) {
//        $("#tbBulkControls").empty();
//        dropexitfilename = [];
//    }
//}

function DocumentTypeClick(object) {
    cTitle = object.id
    cFlag = object.value
    $(".hhide").hide();

    $('#loadMA').html('<img src="../Content/Images/icon/loading.gif"> Working on it...');
    var contractTags = [];
    if ($('#tblDocumentType li').length <= 0) {
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documenttypes',
            type: 'GET',
            dataType: 'json',
            "Content-Type": "application/json",
            headers: {
                'eContracts-ApiKey': localStorage.APIKey
            },
            cache: false,
            success: function (data) {
                $('#loadMA').empty();
                var datalenght = data.length;
                for (var i = 0; i < datalenght; i++) {
                    var item = data[i];
                    contractTags.push(item.TypeName);
                    var article = '<li>';
                    article += '<input id="' + item.TypeName + '" type="radio" name="rdContract" class="css-checkbox" value="' + item.TypeName + '" />';
                    article += '<label for="' + item.TypeName + '" class="css-label">' + item.TypeName + '</label>';
                    article += '</li>';
                    $("#tblDocumentType").append(article);
                }
                var vCount = $("#tblDocumentType li").length;
                $('#compact-paginationDocumentType').pagination({
                    items: vCount,
                    itemsOnPage: 10,
                    type: 'ul',
                    row: 'li',
                    typeID: 'tblDocumentType',
                    cssStyle: 'compact-theme'
                });
            },
            error: function () {
                $('#loadMA').html('<p style="margin-left: 20px;">No Contract Found!</p>')
            }
        });
    } else {
        $('#loadMA').empty();
    }
    $("#browseDocumentType").dialog("option", "title", "Document Type");
    $("#browseDocumentType").dialog("open");

}

function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    var fileslength = files.length;
    for (var i = 0; i < fileslength; i++) {
        droppedfiles.push(files[i]);
    }

    removedItems = [];
    //ReturnFolderSelection_New();
    readfiles(files);
}
//document.getElementById('files').addEventListener('change', handleFileSelect, false);


function IsFileValid(filename) {
    var ext = filename.match(/\.(.+)$/)[1];
    switch (ext) {
        case 'exe':
            //case 'zip':
        case 'rar':
            swal("", ext + " files are not allowed. File name - " + filename);
            return false;
        default:
            return true;
    }

}

function CheckDocumentExist(folderurl, documentname) {
    var isExist = false;
    if (DocumentCount > 0) {
        var vDocURL = localStorage.SPHostUrl + folderurl + documentname;
        if (Collectcontractdocument == false) {
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?contractid=' + vContractID,
                type: 'GET',
                dataType: 'json',
                'Content-Type': 'application/json',
                cache: false,
                async: false,
                headers: {
                    'eContracts-ApiKey': localStorage.APIKey
                },
                success: function (folder) {
                    Collectcontractdocument = true;
                    ContractDocumentDetails = folder;
                    var Exit = $.grep(ContractDocumentDetails, function (n, i) {
                        return (n.DocumentUrl.toLowerCase() == vDocURL.toLowerCase());
                    });
                    if (Exit.length > 0) {
                        isExist = true;
                    } else {
                        Exit = $.grep(ContractDocumentDetails, function (n, i) {
                            return (n.DocumentName.toLowerCase() == documentname.toLowerCase() && n.IsActive == "No");
                        });
                        if (Exit.length > 0) {
                            isExist = true;
                        }
                    }
                },
                error:
                    function (data) {
                        Collectcontractdocument = true;
                        isExist = false;
                    }
            });
        }
        else {
            var Exit = $.grep(ContractDocumentDetails, function (n, i) {
                return (n.DocumentUrl.toLowerCase() == vDocURL.toLowerCase());
            });
            if (Exit.length > 0) {
                isExist = true;
            } else {
                Exit = $.grep(ContractDocumentDetails, function (n, i) {
                    return (n.DocumentName.toLowerCase() == documentname.toLowerCase() && n.IsActive == "No");
                });
                if (Exit.length > 0) {
                    isExist = true;
                }
            }
        }
    }
    return isExist;
}

//manoj
//For OCR File(s)
function CheckDocumentExistForOCR(folderurl, documentname) {
    var isExist = "Allow";
    var OCRDocumentName = "";
    if (DocumentCount > 0) {
        var OCRDocURL = "";
        if (documentname.split('.').pop().toString().toUpperCase().indexOf('TIF') > -1) {
            var arrdocumentname = documentname.split('.');
            OCRDocumentName = arrdocumentname.slice(0, -1).join('.') + ".pdf"
            OCRDocURL = localStorage.SPHostUrl + folderurl + OCRDocumentName;
        }
        var vDocURL = localStorage.SPHostUrl + folderurl + documentname;
        if (Collectcontractdocument == false) {
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?contractid=' + vContractID,
                type: 'GET',
                dataType: 'json',
                'Content-Type': 'application/json',
                cache: false,
                async: false,
                headers: { 'eContracts-ApiKey': localStorage.APIKey },
                success: function (folder) {
                    Collectcontractdocument = true;
                    ContractDocumentDetails = folder;
                    var Exit = $.grep(ContractDocumentDetails, function (n, i) {
                        return (n.DocumentUrl.toLowerCase() == vDocURL.toLowerCase());
                    });
                    var ExitOCR = [];
                    if (OCRDocURL != "") {
                        ExitOCR = $.grep(ContractDocumentDetails, function (n, i) {
                            return (n.DocumentUrl.toLowerCase() == OCRDocURL.toLowerCase());
                        });
                    }

                    if (Exit.length > 0 && ExitOCR.length > 0) {
                        isExist = "Not Allow";
                    } else if (Exit.length > 0) {
                        isExist = "Allow as PDF";
                    } else if (ExitOCR.length > 0) {
                        isExist = "Allow as OCR";
                    }
                    else {
                        Exit = $.grep(ContractDocumentDetails, function (n, i) {
                            return (n.DocumentName.toLowerCase() == documentname.toLowerCase() && n.IsActive == "No");
                        });

                        if (OCRDocumentName != "") {
                            ExitOCR = $.grep(ContractDocumentDetails, function (n, i) {
                                return (n.DocumentName.toLowerCase() == OCRDocumentName.toLowerCase() && n.IsActive == "No");
                            });
                        }

                        if (Exit.length > 0 && ExitOCR.length > 0) {
                            isExist = "Not Allow";
                        } else if (Exit.length > 0) {
                            isExist = "Allow as PDF";
                        } else if (ExitOCR.length > 0) {
                            isExist = "Allow as OCR";
                        } else {
                            isExist = "Allow"
                        }
                    }
                },
                error:
                    function (data) {
                        Collectcontractdocument = true;
                        isExist = false;
                    }
            });
        }
        else {
            var Exit = $.grep(ContractDocumentDetails, function (n, i) {
                return (n.DocumentUrl.toLowerCase() == vDocURL.toLowerCase());
            });
            if (Exit.length > 0) {
                isExist = true;
            } else {
                Exit = $.grep(ContractDocumentDetails, function (n, i) {
                    return (n.DocumentName.toLowerCase() == documentname.toLowerCase() && n.IsActive == "No");
                });
                if (Exit.length > 0) {
                    isExist = true;
                }
            }
        }
    }
    return isExist;
}
//For OCR File(s)
//manoj



function bulkdocumentupload1() {
    if (requiredValidator('formBulkControls', false)) {
        //manoj
        holderbulk.ondragover = function (e) {
            return false;
        }
        holderbulk.ondragend = function () {
            return false;
        }
        holderbulk.ondragleave = function () {
            return false;
        }
        holderbulk.ondrop = function (ev) {
            return false;
        }
        //manoj
        document.getElementById("tbBulkControls").style.pointerEvents = "none";
        for (var axh = 1; axh < document.getElementById("tbBulkControls").rows.length; axh++) {
            $('#idLoading' + axh).css('display', '');
            $('#idLoadingstart' + axh).css('display', 'none');
            $('#idLoadingcomplete' + axh).css('display', 'none');
        }
        $('#btnBulkUploadSave').css('display', 'none');
        $('#btnBulkUploadCancel').css('display', 'none');
        //manoj
        $(".cldraganddrop").css('display', '');
        //manoj

        //manoj
        var formDataFolder = new FormData();
        //formDataFolder.append("opmlFile" + ii + "", droppedfiles[ii]);
        formDataFolder.append("AccountID", localStorage.AccountID);
        formDataFolder.append("ContractID", getParameterByName("ContractID"))
        formDataFolder.append("CreatedBy", localStorage.UserName);
        formDataFolder.append("ModifiedBy", localStorage.UserName);
        formDataFolder.append("DocumentAuthor", localStorage.UserName);

        var headeridst = $("#lblContractTitle").text();
        headeridst = headeridst.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').replace(/[\*\|\,\"\:\<\>\[\}\{\}\'\(\)\&\#\%\.\-\!]/g, '').replace(/\//g, '').replace(/\s\s+/g, " ").trim();
        var finalurlst = ($('#hdContAreaDocLibName').val() != null && $('#hdContAreaDocLibName').val() != "") ? $('#hdContAreaDocLibName').val() : '/Contract Documents/';
        finalurlst = (finalurlst.charAt(0) != '/') ? '/' + finalurlst : finalurlst;
        finalurlst = ((finalurlst.substr(finalurlst.length - 1)) != "/") ? finalurlst + "/" : finalurlst;
        finalurlst = ($('#showAll').text().replace(/ \/ /g, '/') != null && $('#showAll').text().replace(/ \/ /g, '/') != "") ? finalurlst + $('#showAll').text().replace(/ \/ /g, '/') + '/' : finalurlst + headeridst + '/';
        formDataFolder.append("FolderPathFinal", finalurlst);
        if (typeof (formDataFolder) != 'undefined' && formDataFolder != null) {
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/foldercreation',
                type: 'POST',
                data: formDataFolder,
                cache: false,
                contentType: false,
                headers: {
                    'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, 'RefreshToken': localStorage.RefreshToken
                },
                processData: false,
                success: function (ParentFolderdata) {
                    var loadinffdfdsf = 1;
                    var uplosingdetailseperation = null;
                    var formData = new FormData();
                    var opmlFile = $('#files')[0];
                    if (opmlFile.files.length > 0) {
                        var droppedfileslength = droppedfiles.length;
                        var canCreate = false;
                        for (var ii = 0; ii < droppedfileslength; ii++) {
                            if (ii == droppedfileslength - 1) {
                                canCreate = true;
                            }
                            else {
                                canCreate = false;
                            }
                            formData.append("opmlFile" + ii + "", droppedfiles[ii]);
                            formData.append("AccountID", localStorage.AccountID);
                            formData.append("ContractID", getParameterByName("ContractID"));
                            formData.append("ParentFoldertoPass", ParentFolderdata);
                            if (uplosingdetailseperation == null) {
                                uplosingdetailseperation = $("#formBulkControls *").serialize();

                                var arravaluesplitop = uplosingdetailseperation.split("&ddlDocumentStatus");
                                formData.append("SearializeControls", arravaluesplitop[0]);
                                uplosingdetailseperation = null;
                                for (var arrop = 1; arrop < arravaluesplitop.length; arrop++) {
                                    if (uplosingdetailseperation == null) {
                                        uplosingdetailseperation = arravaluesplitop[arrop];
                                    }
                                    else {
                                        uplosingdetailseperation = uplosingdetailseperation + "&ddlDocumentStatus" + arravaluesplitop[arrop];
                                    }
                                }
                            }
                            else {
                                var jointandsplitop = "ddlDocumentStatus" + uplosingdetailseperation;
                                var arravaluesplithereop = jointandsplitop.split("&ddlDocumentStatus");
                                formData.append("SearializeControls", arravaluesplithereop[0]);
                                uplosingdetailseperation = null;
                                for (var arrrop = 1; arrrop < arravaluesplithereop.length; arrrop++) {
                                    if (uplosingdetailseperation == null) {
                                        uplosingdetailseperation = arravaluesplithereop[arrrop];
                                    }
                                    else {
                                        uplosingdetailseperation = uplosingdetailseperation + "&ddlDocumentStatus" + arravaluesplithereop[arrr];
                                    }
                                }

                            }
                            formData.append("CreatedBy", localStorage.UserName);
                            formData.append("ModifiedBy", localStorage.UserName);
                            formData.append("DocumentAuthor", localStorage.UserName);
                            if (contractItem.IsStandard == "Yes")
                                formData.append("IsStandard", "Yes");
                            else
                                formData.append("IsStandard", "No");
                            if (typeof (formData) != 'undefined' && formData != null) {
                                $.ajax({
                                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/bulkupload/Chunckmultifile',
                                    type: 'POST',
                                    data: formData,
                                    cache: false,
                                    contentType: false,
                                    headers: {
                                        'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, 'RefreshToken': localStorage.RefreshToken, 'CreateParentFolder': canCreate
                                    },
                                    processData: false,
                                    success: function (data) {
                                        CreateDocumentListNewBlob(data);
                                        $('#idLoading' + loadinffdfdsf).css('display', 'none');
                                        $('#idLoadingstart' + loadinffdfdsf).css('display', 'none');
                                        $('#idLoadingcomplete' + loadinffdfdsf).css('display', '');
                                        loadinffdfdsf++;
                                        if (droppedfileslength < loadinffdfdsf) {
                                            //GetdocumentIsStandard(vContractID);
                                            //manoj
                                            //if (documentview == null || documentview == "" || documentview == 'folder') {
                                            //    GetdocumentIsStandard(vContractID);
                                            //} else {
                                            //    DisplayDocument(documentview);
                                            //}
                                            //$("#hdnFolderDocumentView").text('');
                                            //$("#hdnShowAllTextValue").html('');
                                            PrvFolderselection = '';
                                            //Bind primary and pined document based on new feature
                                            //if ($("#hdnnewdocumentfeature").text() == "Yes") {
                                            //    CreateDocumentListPinView(vContractID);
                                            //}
                                            ////manoj
                                            //var headerid = $("#lblContractTitle").text();
                                            //headerid = headerid.replace(/[\*\|\,\"\:\<\>\[\}\{\}\'\(\)\&\#\%\.\-\!]/g, '').replace(/\//g, '').replace(/\s\s+/g, " ").trim();
                                            //var finalurl = "";
                                            //if ($("#hdnContractDocumentsUrl").text() != "") {
                                            //}
                                            //else {
                                            //    if ($('#hdContAreaDocLibName').val() != "") {
                                            //        finalurl = $('#hdContAreaDocLibName').val();
                                            //        if (finalurl.charAt(0) != '/') {
                                            //            finalurl = '/' + finalurl;
                                            //        }
                                            //        if ((finalurl.substr(finalurl.length - 1)) != "/") {
                                            //            finalurl = finalurl + "/";
                                            //        }
                                            //        finalurl = finalurl + headerid + '/';
                                            //    }
                                            //    else {
                                            //        finalurl = '/Contract Documents/' + headerid + '/';

                                            //    }
                                            //    $("#hdnContractDocumentsUrl").text(finalurl);
                                            //    $("#hdnContractDocumentsUrlFixed").text($("#hdnContractDocumentsUrl").text());
                                            //}
                                            $("#tbBulkControls").empty();
                                            $("#file").empty();
                                            droppedfiles = [];
                                            dropexitfilename = [];
                                            opmlFile = null;
                                            droppedControls = 0;
                                            $("#lblFilesCount").text(droppedfiles + " file(s) uploaded.")
                                            loadinffdfdsf = 1;
                                            uplosingdetailseperation == null;
                                            $('#tbBulkControls').css("pointer-events", "auto");
                                            $("#bulkuploaddoc").dialog("close");
                                            applybulkdocumetdraganddrop();
                                        }
                                    },
                                    error: function (ex) {
                                        $('#tbBulkControls').css("pointer-events", "auto");
                                        $('#btnBulkUpload').attr('disabled', 'disabled');
                                        $('#idLoading').css('display', 'none');
                                        $("#loadingPage").fadeOut();
                                        return false;
                                    }
                                });
                            }
                            formData = new FormData();
                        }
                    } else {
                        var droppedfileslength = droppedfiles.length;
                        var canCreate = false;
                        for (var i = 0; i < droppedfileslength; i++) {
                            if (i == 0) {
                                canCreate = true;
                            }
                            else {
                                canCreate = false;
                            }
                            formData.append("opmlFile" + i + "", droppedfiles[i]);
                            formData.append("AccountID", localStorage.AccountID);
                            formData.append("ContractID", getParameterByName("ContractID"));
                            formData.append("ParentFoldertoPass", ParentFolderdata);
                            if (uplosingdetailseperation == null) {
                                uplosingdetailseperation = $("#formBulkControls *").serialize();


                                var arravaluesplit = uplosingdetailseperation.split("&ddlDocumentStatus");
                                formData.append("SearializeControls", arravaluesplit[0]);
                                uplosingdetailseperation = null;
                                for (var arr = 1; arr < arravaluesplit.length; arr++) {
                                    if (uplosingdetailseperation == null) {
                                        uplosingdetailseperation = arravaluesplit[arr];
                                    }
                                    else {
                                        uplosingdetailseperation = uplosingdetailseperation + "&ddlDocumentStatus" + arravaluesplit[arr];
                                    }
                                }
                            }
                            else {
                                var jointandsplit = "ddlDocumentStatus" + uplosingdetailseperation;
                                var arravaluesplithere = jointandsplit.split("&ddlDocumentStatus");
                                formData.append("SearializeControls", arravaluesplithere[0]);
                                uplosingdetailseperation = null;
                                for (var arrr = 1; arrr < arravaluesplithere.length; arrr++) {
                                    if (uplosingdetailseperation == null) {
                                        uplosingdetailseperation = arravaluesplithere[arrr];
                                    }
                                    else {
                                        uplosingdetailseperation = uplosingdetailseperation + "&ddlDocumentStatus" + arravaluesplithere[arrr];
                                    }
                                }

                            }
                            formData.append("CreatedBy", localStorage.UserName);
                            formData.append("ModifiedBy", localStorage.UserName);
                            formData.append("DocumentAuthor", localStorage.UserName);
                            if (contractItem.IsStandard == "Yes")
                                formData.append("IsStandard", "Yes");
                            else
                                formData.append("IsStandard", "No");

                            if (typeof (formData) != 'undefined' && formData != null) {
                                $.ajax({
                                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/bulkupload/Chunckmultifile',
                                    type: 'POST',
                                    data: formData,
                                    cache: false,
                                    contentType: false,
                                    headers: {
                                        'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, 'RefreshToken': localStorage.RefreshToken, 'CreateParentFolder': canCreate
                                    },
                                    processData: false,
                                    success: function (data) {
                                        CreateDocumentListNewBlob(data);
                                        $('#idLoading' + loadinffdfdsf).css('display', 'none');
                                        $('#idLoadingstart' + loadinffdfdsf).css('display', 'none');
                                        $('#idLoadingcomplete' + loadinffdfdsf).css('display', '');
                                        loadinffdfdsf++;
                                        if (droppedfileslength < loadinffdfdsf) {
                                            //GetdocumentIsStandard(vContractID);
                                            //manoj
                                            //if (documentview == null || documentview == "" || documentview == 'folder') {
                                            //    GetdocumentIsStandard(vContractID);
                                            //} else {
                                            //    DisplayDocument(documentview);
                                            //}
                                            //$("#hdnFolderDocumentView").text('');
                                            //$("#hdnShowAllTextValue").html('');
                                            PrvFolderselection = '';
                                            //Bind primary and pined document based on new feature
                                            //if ($("#hdnnewdocumentfeature").text() == "Yes") {
                                            //    CreateDocumentListPinView(vContractID);
                                            //}
                                            ////manoj
                                            //var headerid = $("#lblContractTitle").text();
                                            //headerid = headerid.replace(/[\*\|\,\"\:\<\>\[\}\{\}\'\(\)\&\#\%\.\-\!]/g, '').replace(/\//g, '').replace(/\s\s+/g, " ").trim();
                                            //var finalurl = "";
                                            //if ($("#hdnContractDocumentsUrl").text() != "") {
                                            //}
                                            //else {
                                            //    if ($('#hdContAreaDocLibName').val() != "") {
                                            //        finalurl = $('#hdContAreaDocLibName').val();
                                            //        if (finalurl.charAt(0) != '/') {
                                            //            finalurl = '/' + finalurl;
                                            //        }
                                            //        if ((finalurl.substr(finalurl.length - 1)) != "/") {
                                            //            finalurl = finalurl + "/";
                                            //        }
                                            //        finalurl = finalurl + headerid + '/';
                                            //    }
                                            //    else {
                                            //        finalurl = '/Contract Documents/' + headerid + '/';

                                            //    }
                                            //    $("#hdnContractDocumentsUrl").text(finalurl);
                                            //    $("#hdnContractDocumentsUrlFixed").text($("#hdnContractDocumentsUrl").text());
                                            //}
                                            $("#tbBulkControls").empty();
                                            $("#file").empty();
                                            droppedfiles = [];
                                            dropexitfilename = [];
                                            opmlFile = null;
                                            droppedControls = 0;
                                            $("#lblFilesCount").text(droppedfiles + " file(s) uploaded.")
                                            loadinffdfdsf = 1;
                                            uplosingdetailseperation == null;
                                            $('#tbBulkControls').css("pointer-events", "auto");
                                            $("#bulkuploaddoc").dialog("close");
                                            applybulkdocumetdraganddrop();
                                        }
                                    },
                                    error: function (ex1) {
                                        $('#tbBulkControls').css("pointer-events", "auto");
                                        $('#btnBulkUpload').attr('disabled', 'disabled');
                                        $('#idLoading').css('display', 'none');
                                        $("#loadingPage").fadeOut();
                                        return false;
                                    }
                                });
                            }
                            formData = new FormData();
                        }
                    }
                },
                error: function (ex2) {
                    swal("", "Please Try Again Later....!");
                    return false;
                }
            });
        }
        //manoj
    }
}

function bulkdocumentupload() {
    if (requiredValidator('formBulkControls', false)) {
        //holderbulk.ondragover = function (e) {
        //    return false;
        //}
        //holderbulk.ondragend = function () {
        //    return false;
        //}
        //holderbulk.ondragleave = function () {
        //    return false;
        //}
        //holderbulk.ondrop = function (ev) {
        //    return false;
        //}
        var createdParentFolder = false;
        document.getElementById("tbBulkControls").style.pointerEvents = "none";
        //manoj
        $("#tbBulkControls tbody").find("tr").each(function (tblmanage) {
            var Row_id = this.id.split(/[_ ]+/).pop();
            $('#idLoading' + Row_id).css('display', '');
            $('#idLoadingstart' + Row_id).css('display', 'none');
            $('#idLoadingcomplete' + Row_id).css('display', 'none');
        });
        //manoj
        $('#btnBulkUploadSave').css('display', 'none');
        $('#btnBulkUploadCancel').css('display', 'none');
        $('.clManageDrop_New').css('display', 'none');
        $(".cldraganddrop").css('display', '');
        parentfolderidtopass = "";
        dropdownlength = 0;
        uploadedfilecount = 0;
        if (document.getElementById("spnmanagebtn_New").style.display == "none") {
            createdParentFolder = true;
        } else {
            createdParentFolder = false;
        }
        //if ((documentview == 'folder' || documentview == "" || documentview == null)) {
        //    if ($('#showAll').text() != null && $('#showAll').text() != "" && typeof ($('#showAll').text()) != "undefined") {
        //        var valuetocheck = $("#showAll")[0].lastChild;
        //        parentfolderidtopass = valuetocheck.id;
        //    } else {
        //        createdParentFolder = true;
        //    }
        //} else {
        //    if (contractparentfolderid != null && contractparentfolderid != "" && typeof (contractparentfolderid) != "undefined") {
        //        parentfolderidtopass = contractparentfolderid;
        //    } else {
        //        parentfolderidtopass = "";
        //        createdParentFolder = true;
        //    }
        //}
        if (!createdParentFolder) {
            //manoj
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/folderurl?contractid=' + getParameterByName("ContractID") + '&foldeurl=' + $("#spnDocFolderURL_New").text(),
                type: 'GET',
                dataType: 'json',
                'Content-Type': 'application/json',
                cache: false,
                headers: { 'eContracts-ApiKey': localStorage.APIKey },
                success: function (Parent_Folder) {
                    if (Parent_Folder != null) {
                        //parentFoldeIDtoPass = "";
                        dropdownlength = 0;
                        uploadedfilecount = 0;
                        parentfolderidtopass = Parent_Folder.RowKey;
                        FromManage = false;
                        bulkdocumentuploadchunk();
                    } else {
                        parentfolderidtopass = "";
                        dropdownlength = 0;
                        uploadedfilecount = 0;
                        return false;
                    }

                },
                error:
                    function (data) {
                        parentfolderidtopass = "";
                        dropdownlength = 0;
                        uploadedfilecount = 0;
                        return false;
                    }
            });
            //manoj
        }
        else {
            var formDataFolder = new FormData();
            formDataFolder.append("AccountID", localStorage.AccountID);
            formDataFolder.append("ContractID", getParameterByName("ContractID"))
            formDataFolder.append("CreatedBy", localStorage.UserName);
            formDataFolder.append("ModifiedBy", localStorage.UserName);
            formDataFolder.append("DocumentAuthor", localStorage.UserName);

            //var headeridst = $("#lblContractTitle").text();
            //headeridst = headeridst.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').replace(/[\*\|\,\"\:\<\>\[\}\{\}\'\(\)\&\#\%\.\-\!]/g, '').replace(/\//g, '').replace(/\s\s+/g, " ").trim();
            //var finalurlst = ($('#hdContAreaDocLibName').val() != null && $('#hdContAreaDocLibName').val() != "") ? $('#hdContAreaDocLibName').val() : '/Contract Documents/';
            //finalurlst = (finalurlst.charAt(0) != '/') ? '/' + finalurlst : finalurlst;
            //finalurlst = ((finalurlst.substr(finalurlst.length - 1)) != "/") ? finalurlst + "/" : finalurlst;
            //finalurlst = ($('#showAll').text().replace(/ \/ /g, '/') != null && $('#showAll').text().replace(/ \/ /g, '/') != "") ? finalurlst + $('#showAll').text().replace(/ \/ /g, '/') + '/' : finalurlst + headeridst + '/';
            formDataFolder.append("FolderPathFinal", $("#spnDocFolderURL_New").text());
            if (typeof (formDataFolder) != 'undefined' && formDataFolder != null) {
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/foldercreation',
                    type: 'POST',
                    data: formDataFolder,
                    cache: false,
                    contentType: false,
                    headers: {
                        'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, 'RefreshToken': localStorage.RefreshToken
                    },
                    processData: false,
                    success: function (ParentFolderdata) {
                        //parentFoldeIDtoPass = "";
                        dropdownlength = 0;
                        uploadedfilecount = 0;
                        parentfolderidtopass = ParentFolderdata;
                        FromManage = false;
                        bulkdocumentuploadchunk();
                    },
                    error: function (ex2) {
                        parentfolderidtopass = "";
                        dropdownlength = 0;
                        uploadedfilecount = 0;
                        return false;
                    }
                });
            }
        }
    }
}
function bulkdocumentuploadCancel() {
    $("#tbBulkControls").empty();
    dropexitfilename = [];
    $("#file").empty();
    droppedfiles.splice(0, droppedfiles.length)
    droppedControls = 0;
    $("#bulkuploaddoc").dialog("close");
    applybulkdocumetdraganddrop();
    document.getElementById("holder").style.border = "2px dashed white";
    $("#holder").css("min-height", "0px");
    $('#holder').css("opacity", "1");
    $('#holder').css("pointer-events", "auto");
    document.getElementById("holderbulk").style.border = "2px dashed white";
    $("#holder").css("min-height", "0px");
    $('#holderbulk').css("opacity", "1");
    $('#holderbulk').css("pointer-events", "auto");
    parentfolderidtopass = "";
    dropdownlength = 0;
    uploadedfilecount = 0;
    document.getElementById("iddropfile").style.display = "none";
}

function CreateFolderToMove(parentFolderName, ContarctNameselection) {
    $("#browseFolderMove").html('<img src="../Content/Images/icon/loading.gif"> Working on it...');
    newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/folderstructurejqtree?documentlibrary=' + parentFolderName;
    $.ajax({
        url: newurl,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        success: function (folder) {
            try {
                $("#btnaddsubfolder").css("display", "");
                $("#browseFolderMove").html('<div id="treeviewFolderMoveOption" class="demo-section"></div><input id="txtFolder" type="hidden" /><input id="txtFolderURL" type="hidden" />');
                $('#treeviewFolderMoveOption').empty();
                $('#treeviewFolderMoveOption').tree({
                    data: folder,
                    autoOpen: 0
                });
            } catch (ex) {
                // alert(ex);
            }
        },
        error:
        function (data) {
            $("#btnaddsubfolder").css("display", "none");
            $("#browseFolderMove").html('No items found.');
        }
    });
}

function FileToMove(passingurl) {
    $("#loadingPage").fadeIn();
    var formData1 = new FormData();
    formData1.append("ContractID", getParameterByName('ContractID'));
    formData1.append("AccountID", localStorage.AccountID);
    formData1.append("ModifiedBy", localStorage.UserName);
    var splturl = passingurl.split($("#hdnContractDocumentsUrlFixed").text());
    var urltoaccess = "";
    var typetoaccess = "";
    if ($("#hdntreeviewFolderMove").val() == 'move') {
        urltoaccess = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/movedocument?documentid=' + multipleChecksDocumentID + '&newurl=' + splturl[1] + '&validationurldetails=' + urldetailsforcontact;
        typetoaccess = "PUT";
    } else {
        urltoaccess = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/folderstructurejqtree?documents=' + multipleChecksDocumentID + '&locationurl=' + urldetailsforcontact + '&newfolder=' + splturl[1];
        typetoaccess = "POST";
    }
    $.ajax({
        url: urltoaccess,
        type: typetoaccess,
        data: formData1,
        cache: false,
        contentType: false,
        headers: {
            'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName, contractid: vContractID
        },
        processData: false,
        async: false,
        success: function (document) {
            fileurldetails = "";
            //manoj
            if (documentview == null || documentview == "" || documentview == 'folder') {
                if ($('#showAll').text() != null && $('#showAll').text() != "" && typeof ($('#showAll').text()) != "undefined") {
                    var selectedfoldervalue = $('#showAll').find("a");
                    var textvalueselected = $(selectedfoldervalue)[$(selectedfoldervalue).length - 1].textContent;
                    var idvalueselected = $(selectedfoldervalue)[$(selectedfoldervalue).length - 1].id;
                    var parentdocumentdetails = {
                        id: idvalueselected, text: textvalueselected
                    };
                    showfolderdocuments(parentdocumentdetails);
                }
                else {
                    BindDocument(vContractID);
                }
            } else {
                DisplayDocument(documentview);
            }
            //GetContractPendingAction(true, "BindPeoples");
            $("#hdnFolderDocumentView").text('');
            $("#hdnShowAllTextValue").html('');
            PrvFolderselection = '';
            //Bind primary and pined document based on new feature
            if ($("#hdnnewdocumentfeature").text() == "Yes") {
                CreateDocumentListPinView(vContractID);
            }
            //manoj
            $("#loadingPage").fadeOut();
            $("#documentMultiActions").css('display', 'none');
            $("#treeviewFolderMove").dialog("close");
        },
        error: function (document) {
            fileurldetails = "";
            //manoj
            if (documentview == null || documentview == "" || documentview == 'folder') {
                if ($('#showAll').text() != null && $('#showAll').text() != "" && typeof ($('#showAll').text()) != "undefined") {
                    var selectedfoldervalue = $('#showAll').find("a");
                    var textvalueselected = $(selectedfoldervalue)[$(selectedfoldervalue).length - 1].textContent;
                    var idvalueselected = $(selectedfoldervalue)[$(selectedfoldervalue).length - 1].id;
                    var parentdocumentdetails = {
                        id: idvalueselected, text: textvalueselected
                    };
                    showfolderdocuments(parentdocumentdetails);
                }
                else {
                    BindDocument(vContractID);
                }
            } else {
                DisplayDocument(documentview);
            }
            //GetContractPendingAction(true, "BindPeoples");
            $("#hdnFolderDocumentView").text('');
            $("#hdnShowAllTextValue").html('');
            PrvFolderselection = '';
            //Bind primary and pined document based on new feature
            if ($("#hdnnewdocumentfeature").text() == "Yes") {
                CreateDocumentListPinView(vContractID);
            }
            //manoj
            $("#loadingPage").fadeOut();
            $("#documentMultiActions").css('display', 'none');
            $("#treeviewFolderMove").dialog("close");
        }
    });
}
function MultipleDocumentRemove() {
    var documentName = multipleChecksDocumentName;
    var documentID = multipleChecksDocumentID;
    swal({
        title: '',
        text: "Are you sure you want to <span style='font-weight:700'>Untag</span> selected documents from this Contract?",
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
                 url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/untag?contractid=' + getParameterByName('ContractID') + '&documentid=' + documentID,
                 type: 'PUT',
                 dataType: 'json',
                 "Content-Type": "application/json",
                 headers: {
                     'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName, 'RefreshToken': localStorage.RefreshToken
                 },
                 cache: false,
                 success: function (data) {
                     $("#loadingPage").fadeOut();
                     //manoj
                     if (documentview == null || documentview == "" || documentview == 'folder') {
                         if ($('#showAll').text() != null && $('#showAll').text() != "" && typeof ($('#showAll').text()) != "undefined") {
                             var selectedfoldervalue = $('#showAll').find("a");
                             var textvalueselected = $(selectedfoldervalue)[$(selectedfoldervalue).length - 1].textContent;
                             var idvalueselected = $(selectedfoldervalue)[$(selectedfoldervalue).length - 1].id;
                             var parentdocumentdetails = {
                                 id: idvalueselected, text: textvalueselected
                             };
                             showfolderdocuments(parentdocumentdetails);
                         }
                         else {
                             BindDocument(vContractID);
                         }
                     } else {
                         DisplayDocument(documentview);
                     }
                     pendingStarted = false;
                     GetContractPendingAction(true, "BindPeoples");
                     $("#hdnFolderDocumentView").text('');
                     $("#hdnShowAllTextValue").html('');
                     PrvFolderselection = '';
                     //Bind primary and pined document based on new feature
                     if ($("#hdnnewdocumentfeature").text() == "Yes") {
                         CreateDocumentListPinView(vContractID);
                     }
                     //manoj                     
                 },
                 error: function () {
                     $("#loadingPage").fadeOut();
                 }
             });
         }
         return;
     });

}

var holderbulk;

function applybulkdocumetdraganddrop() {
    holderbulk = document.getElementById('holderbulk');
    holderbulk.ondragover = function (e) {
        e.preventDefault();
        document.getElementById("holderbulk").style.border = "2px dashed blue ";
        document.getElementById("holderbulk").style.opacity = "0.5";
        e.dataTransfer.setData('text/html', "You dragged the image!");
    };
    holderbulk.ondragend = function () {
        this.className = ''; return false;
    };
    holderbulk.ondragleave = function () {
        document.getElementById("holderbulk").style.border = "2px dashed #ccc";
        $('#holderbulk').css("opacity", "1");
        $('#holderbulk').css("pointer-events", "auto");
        document.getElementById("iddropfile").style.display = "none";
    };

    var totalfiles = "";
    holderbulk.ondrop = function (e) {

        if (contractItem.Permission != 'View' && contractItem.Permission != '' && contractItem.Permission != null) {
            $("#loadingPage").fadeIn();
            this.className = '';
            e.preventDefault();
            var files = e.dataTransfer.files;
            var fileslength = files.length;
            //if (document.getElementById("tbBulkControls").rows.length < 6) {
            //    if (((document.getElementById("tbBulkControls").rows.length - 1) + fileslength) <= 5) {
            for (var i = 0; i < fileslength; i++) {
                droppedfiles.push(files[i]);
            }
            totalfiles = files;
            removedItems = [];
            readfiles(files);
            if (droppedfiles.length > 0) {
                $(".cldraganddrop").css('display', 'none');
                $('#btnBulkUploadSave').css('display', '');
                $('#btnBulkUploadCancel').css('display', '');
                $("#bulkuploaddoc").dialog("option", "title", "Bulk Document Upload");
                $("#bulkuploaddoc").dialog("open");
                $("#bulkuploaddoc").height("auto");
                //applybulkdocumetdraganddrop();
            }
            else {
                document.getElementById("holderbulk").style.border = "2px dashed #ccc";
                $('#holderbulk').css("opacity", "1");
                $('#holderbulk').css("pointer-events", "auto");
                document.getElementById("iddropfile").style.display = "none";
            }
            $("#loadingPage").fadeOut();
            //    }
            //    else {
            //        $("#loadingPage").fadeOut();
            //        swal("", "Maximum 5 file(s) only allowed at a time....!");
            //        document.getElementById("holderbulk").style.border = "2px dashed white";
            //        $('#holderbulk').css("opacity", "1");
            //        $('#holderbulk').css("pointer-events", "auto");
            //    }
            //}
            //else {
            //    $("#loadingPage").fadeOut();
            //    swal("", "Maximum 5 file(s) only allowed at a time....!");
            //    document.getElementById("holderbulk").style.border = "2px dashed white";
            //    $('#holderbulk').css("opacity", "1");
            //    $('#holderbulk').css("pointer-events", "auto");
            //}
        }
    }
}

//Check document sent for automation and once document automation is done call BindDocument()
function BindPendingDocAutomation(vContractID) {
    $("#ulDocument").css('display', 'none');
    try {
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/automation?contractid=' + vContractID,
            type: 'GET',
            dataType: 'json',
            "Content-Type": "application/json",
            headers: {
                'eContracts-ApiKey': localStorage.APIKey
            },
            //async: false,
            success: function (data) {
                var datalength = data.length;
                docInAutomationList++;
                //if document generation taking long time, assuming its not created. Hence deleting entry from documentInAutomation table
                if (docInAutomationList == 50) {
                    $("#ulDocument").css('display', '');
                    $(data).each(function (itma, itemauto) {
                        deletePendingDocAutomation(itemauto);
                    });
                } else {
                    //if document is still being generated
                    if (datalength > 0) {
                        $("#ulDocumentLoading").css('display', '');
                        //$("#ulDocumentLoading").html('<img src="../Content/Images/icon/loading.gif"> Please wait...');
                        BindDocument(vContractID);
                    } else {
                        docInAutomationList = "";
                        $("#ulDocumentLoading").css('display', 'none');
                        $("#ulDocument").css('display', '');
                    }
                }
            },
            error: function () {
            }
        });
    } catch (e) {
    }
}


//deleting document automation entry
function deletePendingDocAutomation(itemauto) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/automation?documentid=' + itemauto.RowKey,
        type: 'DELETE',
        dataType: 'json',
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        cache: false,
        success: function () {
            swal("", "Unable to create document: " + itemauto.DocumentName + ". Please try again.");
        }
    });
}

//add new counterparty on document add
function documentstatuschange() {
    if ($("#ddlDocumentStatus").val() != 0 && $("#ddlDocumentStatus").val() == "Expired") {
        $("#dtValidFrom").val("");
        $("#dtValidTill").val("");
        if (document.getElementById("formValidityForm").style.display != "none") {
            $("#linkAddValidity").click();
        }
        $("#linkAddValidity").css('display', 'none');
        //if ($("#linkAddValidity").text() == "Track document expiration date") {
        //    $("#linkAddValidity").css('display', 'none');
        //}
        //else {
        //    $("#linkAddValidity").click();
        //    $("#linkAddValidity").css('display', 'none');
        //}
    }
    else {
        $("#linkAddValidity").css('display', 'block');
    }
}

function collcettemplate() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?contractid=' + contractid,
        type: 'GET',
        cache: false,
        contentType: false,
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        processData: false,
        success: function (data) {
            var vAccFeat = $.grep(data, function (n, i) {
                return (n.CreationMode == "Template");
            });
            if (vAccFeat.length > 0) {
                DocumnetTemplateCollection.push(vAccFeat[i]);
            }
        },
        error: function (request) {

        },
        complete: function () {
        }
    });
}


$("#ddlTemplateAndClauses").change(function (obj) {
    $("#ulTermsClauseBody").html('<img src="../Content/Images/icon/loading.gif">');
    var selectedtext = $("#ddlTemplateAndClauses option:selected").val();
    if (selectedtext != "0") {
        var docversionnum = '';
        var docversionby = '';
        var docversiondate = '';
        var docversioncollection = false;
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/' + selectedtext + '/versions',
            type: 'GET',
            dataType: 'json',
            "Content-Type": "application/json",
            headers: {
                'eContracts-ApiKey': localStorage.APIKey
            },
            cache: false,
            async: false,
            success: function (data) {
                var datalength = data.length;
                docversioncollection = true;
                docversionnum = data[datalength - 1].VersionNo;
                docversionby = data[datalength - 1].ModifiedBy;
                docversiondate = data[datalength - 1].Modified;
            },
            error: function () {
                docversioncollection = true;
                docversionnum = "0.0";
                docversionby = "None";
                docversiondate = "None";
            }
        });
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/clause/clausesindocument?documentid=' + selectedtext,
            type: 'GET',
            dataType: 'json',
            cache: false,
            async: false,
            headers: {
                'eContracts-ApiKey': localStorage.APIKey
            },
            success: function (Languagecollection) {
                if (Languagecollection != null) {

                    arrfinalclauselanguage = [];
                    arrPrvwClause = [];
                    arrforeditandcancel = [];
                    $("#ulTermsClauseBody").empty();
                    //$("#lblTermsClauseCount").empty();
                    languagerowkeycollection = [];
                    languagetitlecollection = [];
                    var articlelanguage = '';
                    var docurlkeyword = '';
                    for (var arrdsp = 0; arrdsp < Languagecollection.length; arrdsp++) {
                        var viewleveldata = '';
                        if (Languagecollection[arrdsp].RowKey != "" && Languagecollection[arrdsp].RowKey != null) {
                            languagerowkeycollection.push(Languagecollection[arrdsp].RowKey);
                            viewleveldata = Languagecollection[arrdsp].RowKey;
                        }
                        else {
                            languagetitlecollection.push(Languagecollection[arrdsp].LanguageTitle);
                            viewleveldata = Languagecollection[arrdsp].LanguageTitle;
                        }
                        arrfinalclauselanguage.push(Languagecollection[arrdsp].RowKey);
                        arrPrvwClause.push(Languagecollection[arrdsp]);
                        articlelanguage += '<div class="tagged-inner-cont clearfix"><div class="tagged-inner-left"></div>'//<input id=sel' + Languagecollection[arrdsp].RowKey + ' onclick="selectlanguge(this);" type="checkbox" name="SelectedClauseLanguagedetails" value=' + Languagecollection[arrdsp].LanguageTitle + '>
                        articlelanguage += '<div class="tagged-inner-right"><p class="action-heading">' + Languagecollection[arrdsp].LanguageTitle + '<a href="javascript:void(0)"></a>' //<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="margin-left-5"></a>'
                        var isremoved = "false"
                        switch (Languagecollection[arrdsp].Status) {
                            case 'User Added': {
                                articlelanguage += '<a class="bars-green" href="javascript:void(0)"><img src="../Content/Images/red-icon.jpg" title="Not available in Library,User Added"></a><span style="float:right;"><a href="javascript:void(0)" title="Comments" onclick="ViewClausecomments(\'' + viewleveldata + '\')" ><img src="../Content/Images/comment.png"></a>(<span id=counetcomment' + viewleveldata + '></span>)</span></p>';
                            }
                                break;
                            case 'Language Edited': {
                                articlelanguage += '<a class="bars-green" href="javascript:void(0)"><img src="../Content/Images/yellow-icon.jpg" title="Not same as Library"></a><span style="float:right;"><a href="javascript:void(0)" title="Comments" onclick="ViewClausecomments(\'' + viewleveldata + '\')" ><img src="../Content/Images/comment.png"></a>(<span id=counetcomment' + viewleveldata + '></span>)</span></p>';
                            }
                                break;
                            case 'Removed': {
                                isremoved = "true";
                                articlelanguage += '<a class="bars-green" href="javascript:void(0)"><img src="../Content/Images/flag-icon.jpg" title="Required Term Removed From Contract"></a><span style="float:right;"><a href="javascript:void(0)" title="Comments" onclick="ViewClausecomments(\'' + viewleveldata + '\')" ><img src="../Content/Images/comment.png"></a>(<span id=counetcomment' + viewleveldata + '></span>)</span></p>';
                            }
                                break;
                            case 'Same as Library':
                            default: {
                                articlelanguage += '<a class="bars-green" href="javascript:void(0)"><img src="../Content/Images/green-icon.jpg" title="Same as Library"></a><span style="float:right;"><a href="javascript:void(0)" title="Comments" onclick="ViewClausecomments(\'' + viewleveldata + '\')" ><img src="../Content/Images/comment.png"></a>(<span id=counetcomment' + viewleveldata + '></span>)</span></p>';
                            }
                                break;
                        }
                        if (isremoved == "true") {
                            var cleanText = Languagecollection[arrdsp].LanguageText.replace(/<\/?[^>]+(>|$)/g, "");
                            //articlelanguage += '<p style="text-decoration:line-through;">' + cleanText + '</p></div></div>'
                            articlelanguage += '<p>' + cleanText + '</p></div></div>'
                        } else {
                            articlelanguage += '<p>' + Languagecollection[arrdsp].LanguageText + '</p></div></div>'
                        }
                        docurlkeyword = Languagecollection[arrdsp].Keywords;
                    }
                    $("#ulTermsClauseBody").html(articlelanguage);
                    var divVersions = '<span>Current Version </span>';
                    divVersions += '<span class="ViewDoc_version">' + docversionnum + '</span>';
                    divVersions += '<span> By</span>';
                    divVersions += '<span class="grey"> ' + docversionby + '</span>';
                    divVersions += '<span> on</span>';
                    divVersions += '<span class="grey"> ' + moment(new Date(docversiondate)).format('Do MMM YYYY') + '</span> ';
                    //divVersions += '<span><button type="button" class="Viewdoc_word" style="cursor:pointer" onclick="viewdocinword(\'' + docurlkeyword + '\')">View in word</button></span>';
                    divVersions += '<span class="Viewdoc_word" ><span class="dropdown">'
                    divVersions += '<a aria-expanded="false" aria-haspopup="true" role="button" data-toggle="dropdown" href="javascript:void(0);" data-target="ul_opendoc" id="dLabel">'
                    divVersions += 'View Document'
                    divVersions += '<span class="caret"></span>'
                    divVersions += '</a>'
                    divVersions += '<ul id="ul_opendoc" class="dropdown-menu" aria-labelledby="dLabel">'
                    divVersions += '<li><a href="javascript:void(0);" onclick="viewdocinword(\'' + docurlkeyword + '\')">Open in Word</a></li>'
                    divVersions += '<li><a href="' + localStorage.SPHostUrl + "/_layouts/WopiFrame.aspx?sourcedoc=" + docurlkeyword + "&action=default" + '" target="_blank">Open in Word Online</a></li>'
                    divVersions += '</ul>'
                    divVersions += '</span>'
                    divVersions += '</span>'

                    $("#docversion").html(divVersions);

                    //$("#docversion").html('<span>Current Version</span><span class="ViewDoc_version">' + docversionnum + '</span><span><button type="button" class="Viewdoc_word"  style="cursor:pointer" onclick="viewdocinword(\'' + docurlkeyword + '\')">View in word</button ></span>')
                    $("#docversion").css("display", "inline-block");
                    articlelanguage = '';
                    if (languagerowkeycollection.length > 0) {
                        getallcontracttypecomment(languagerowkeycollection);
                    }

                    //if (languagetitlecollection.length > 0) {
                    //    getallcontracttypecommentbytitle(languagetitlecollection);
                    //}
                    //var optiontemplate = '<option value="All">All</option>';
                    //if (DocumnetTemplateCollection.length > 0) {
                    //    $(DocumnetTemplateCollection).each(function (i, Templatecollection) {
                    //        optiontemplate += '<option value="' + Templatecollection.DocumentName + '">' + Templatecollection.DocumentName + '</option>'
                    //    });
                    //    $("#ddlclauselanguagetemplate").append(optiontemplate);
                    //}
                    //else {
                    //    $("#ddlclauselanguagetemplate").append(optiontemplate);
                    //}
                    //$("#lblTermsClauseCount").empty();
                    //$("#lblTermsClauseCount").append(Languagecollection.length);
                } else {
                    $("#ulTermsClauseBody").html("<li style='margin-top: 10px'>No items found.</li>");
                    $("#docversion").css("display", "none");
                }
            },
            error: function () {
                $("#ulTermsClauseBody").html("<li style='margin-top: 10px'>No items found.</li>");
                $("#docversion").css("display", "none");
                //$("#lblTermsClauseCount").empty();
                //$("#lblTermsClauseCount").append("0");
            }
        });
    } else {
        $("#docversion").css("display", "none");
        $("#ulTermsClauseBody").html("<li Style='margin-top: 10px;'>Select available document.<li>");
    }
});


function viewdocinword(docurl) {
    var fileextension = docurl.split('.').pop();
    if (fileextension == 'docx' || fileextension == 'doc') {
        window.open("ms-word:ofe|u|" + decodeURIComponent(docurl), "_self");
        $("#showMSWordPopup_head").html("We're opening your document in Microsoft Word...");
        $("#showMSWordPopup_head").removeClass("red-text");
        $("#showMSWordPopup_head").removeClass("green-text");
        $("#showMSWordPopup_head").addClass("blue-text");
        $("#editwordlink").removeClass("redbg");
        $("#editwordlink").removeClass("greenbg");
        $("#editwordlink").addClass("bluebg");
        $("#linkEditInWordOnline").html('<p><img src="../Content/Images/wordonline.png" alt=""></p><p>Edit in Word Online</p>')

    } else if (fileextension == 'pptx' || fileextension == 'ppt') {
        window.open("ms-powerpoint:ofe|u|" + decodeURIComponent(docurl), "_self");
        $("#showMSWordPopup_head").html("We're opening your document in Microsoft PowerPoint...");
        $("#showMSWordPopup_head").removeClass("blue-text");
        $("#showMSWordPopup_head").removeClass("green-text");
        $("#showMSWordPopup_head").addClass("red-text");

        $("#editwordlink").removeClass("greenbg");
        $("#editwordlink").removeClass("bluebg");
        $("#editwordlink").addClass("redbg");
        $("#linkEditInWordOnline").html('<p><img src="../Content/Images/powerpointonline.png" alt=""></p><p>Edit in PowerPoint Online</p>')

    } else if (fileextension == 'xlsx' || fileextension == 'xls') {
        window.open("ms-excel:ofe|u|" + decodeURIComponent(docurl), "_self");
        $("#showMSWordPopup_head").html("We're opening your document in Microsoft Excel...");
        $("#showMSWordPopup_head").removeClass("blue-text");
        $("#showMSWordPopup_head").removeClass("red-text");
        $("#showMSWordPopup_head").addClass("green-text");
        $("#editwordlink").removeClass("bluebg");
        $("#editwordlink").removeClass("redbg");
        $("#editwordlink").addClass("greenbg");
        $("#linkEditInWordOnline").html('<p><img src="../Content/Images/excelonline.png" alt=""></p><p>Edit in Excel Online</p>')

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
                    $("#linkEditInWordOnline").attr('href', localStorage.SPHostUrl + "/_layouts/WopiFrame.aspx?sourcedoc=" + docurl + "&action=default")
                    $("#showMSWordPopup").dialog("option", "title", "");
                    $("#showMSWordPopup").dialog("open");
                } else {
                    docurl = decodeURIComponent(docurl);
                }
                window.open(docurl);
            }
        }
        //$("#linkEditInWordOnline").attr('href', localStorage.SPHostUrl + "/_layouts/WopiFrame.aspx?sourcedoc=" + docurl + "&action=default")
        //$("#showMSWordPopup").dialog("option", "title", "");
        //$("#showMSWordPopup").dialog("open");
    }
    else {
        location = localStorage.SPHostUrl + "/_layouts/15/download.aspx?SourceUrl=" + docurl;
    }
}

//manoj
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

//manoj
function EditMismatchMetadata(docurl) {
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
            }
        }
    } else {
        docurl = localStorage.SPHostUrl + "/_layouts/15/download.aspx?SourceUrl=" + docurl;
    }
    return docurl;
}
//manoj

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

//Popup for the single document status by ID start
function ChangeDocumentStatus(obj) {
    if (((contractItem.ReadOnlyPermissions.indexOf(localStorage.UserName) > -1) && (!localStorage.UserType.indexOf("Global Contract Owner") >= 0)) || !(contractItem.Permission == 'Manage' || contractItem.Permission == 'Contribute')) {
        return;
    } else if (contractItem.Status == "Cancelled" || contractItem.Status == "Expired") {
        return;
    }

    var primarydocumentcheck = $(obj).parent();
    var primarydocumentcheckdetails = $(primarydocumentcheck).find("#IsPrimaryDoc").text();
    $("#hdIsPrimaryDoc").val(primarydocumentcheckdetails);
    var CheckBindDocumentData = parseInt($("#tdDocumentList").children().length)
    var Parentnodetitle = obj.title;
    changedocumentstatusbyid = obj.id;
    if (CheckBindDocumentData != 0) {
        $("#dvManageDocumentStatus").dialog("open");
    }
    else {
        var ctrl = "<input id='rdDocumentNew' type='radio' name='DocumentStatus' value='New' class='css-checkbox' /><b title='New' class='status_green_another details_documentstatus'><img src='../Content/Images/status/new.png'>new</b><label for='rdDocumentNew' class='css-label'>New</label><br />";
        ctrl += "<input id='rdDocumentAwaitingReview' type='radio' name='DocumentStatus' value='Awaiting Review' class='css-checkbox' /><b title='Awaiting Review' class='status_yellow details_documentstatus'><img src='../Content/Images/status/renew.png'>Rev</b><label for='rdDocumentAwaitingReview' class='css-label'>Awaiting Review</label><br />";
        ctrl += "<input id='rdDocumentReviewed' type='radio' name='DocumentStatus' value='Reviewed' class='css-checkbox' /><b title='Reviewed' class='status_blue details_documentstatus'><img src='../Content/Images/status/tick.png'>Rev</b><label for='rdDocumentReviewed' class='css-label'>Reviewed</label><br />";
        ctrl += "<input id='rdDocumentInNegotiation' type='radio' name='DocumentStatus' value='In Negotiation' class='css-checkbox' /><b title='In Negotiation' class='status_yellow details_documentstatus'><img src='../Content/Images/status/renew.png'>nego</b><label for='rdDocumentInNegotiation' class='css-label'>In Negotiation</label><br />";
        ctrl += "<input id='rdDocumentNegotiationComplete' type='radio' name='DocumentStatus' value='Negotiation Complete' class='css-checkbox' /><b title='Negotiation Complete' class='status_blue details_documentstatus'><img src='../Content/Images/status/tick.png'>nego</b><label for='rdDocumentNegotiationComplete' class='css-label'>Negotiation Complete</label><br />";
        ctrl += "<input id='rdDocumentReadySignature' type='radio' name='DocumentStatus' value='Ready for Signature' class='css-checkbox' /><b title='Ready for Signature' class='status_green details_documentstatus'><img src='../Content/Images/status/active.png'>sign</b><label for='rdDocumentReadySignature' class='css-label'>Ready for Signature</label><br />";
        ctrl += "<input id='rdDocumentAwaitingSignatures' type='radio' name='DocumentStatus' value='Awaiting Signatures' class='css-checkbox' /><b title='Awaiting Signatures' class='status_yellow details_documentstatus'><img src='../Content/Images/status/renew.png'>sign</b><label for='rdDocumentAwaitingSignatures' class='css-label'>Awaiting Signatures</label><br />";
        ctrl += "<input id='rdDocumentSigned' type='radio' name='DocumentStatus' value='Signed' class='css-checkbox' /><b title='Signed' class='status_blue details_documentstatus'><img src='../Content/Images/status/tick.png'>Sign</b><label for='rdPipelineSigned' class='css-label'>Signed</label><br />";
        ctrl += "<input id='rdDocumentActive' type='radio' name='DocumentStatus' value='Active' class='css-checkbox' /><b title='Active' class='status_green details_documentstatus'><img src='../Content/Images/status/active.png'>actv</b><label for='rdDocumentActive' class='css-label'>Active</label><br />";
        ctrl += "<input id='rdDocumentExpired' type='radio' name='DocumentStatus' value='Expired' class='css-checkbox' /><b title='Expired' class='status_Gray details_documentstatus'><img src='../Content/Images/status/expried.png'>exp</b><label for='rdDocumentExpired' class='css-label'>Expired</label><br />";
        $("#tdDocumentList").append(ctrl);
    }
    $('input:radio[name="DocumentStatus"][value="' + Parentnodetitle + '"]').prop('checked', true);
    $("#dvManageDocumentStatus").dialog("open");
}
//Popup for the single document status by ID End

//change the single document status by ID start
function ChangeDocumentStatusByID() {
        if (requiredValidator("dvManageDocumentStatus", false)) {
            $("#loadingPage").fadeIn();
            var stat = '';
            stat = decodeURI($("input:radio[name=DocumentStatus]:checked").val());
            if (stat != "" && changedocumentstatusbyid != '') {
                if (stat.trim() != '' && changedocumentstatusbyid.trim() != '') {
                    $.ajax({
                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/changestatus?documentid=' + changedocumentstatusbyid.trim() + '&status=' + stat,
                        type: 'PUT',
                        dataType: 'json',
                        headers: {
                            'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName
                        },
                        contentType: false,
                        cache: false,
                        success: function (result) {
                            $("#dvManageDocumentStatus").dialog("close");
                            if ($("#hdIsPrimaryDoc").val() == "Yes") {
                                try {
                                    BindContractDetails(vContractID, "allow");
                                } catch (ex) {
                                }
                            } else {
                                //BindDocument(vContractID);
                                refreshdocuemnt();
                            }
                            changedocumentstatusbyid = '';
                            $("#loadingPage").fadeOut();
                        },
                        error: function (person) {
                            $("#loadingPage").fadeOut();
                        },
                    });
                }
            }
        }
}
//change the single document status by ID End

//add new counterparty on document add
function documentstatuschange() {
    if ($("#ddlDocumentStatus").val() != 0 && $("#ddlDocumentStatus").val() == "Expired") {
        $("#dtValidFrom").val("");
        $("#dtValidTill").val("");
        if (document.getElementById("formValidityForm").style.display != "none") {
            $("#linkAddValidity").click();
        }
        $("#linkAddValidity").css('display', 'none');
        //$("#linkAddValidity").css('display', 'none');
        //if ($("#linkAddValidity").text() == "Track document expiration date") {
        //    $("#linkAddValidity").css('display', 'none');
        //}
        //else {
        //    $("#linkAddValidity").click();
        //    $("#linkAddValidity").css('display', 'none');
        //}
    }
    else {
        $("#linkAddValidity").css('display', 'block');
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
        dURL = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/contractareadetailsbyname?contractareaname=' + encodeURIComponent(doccontractarea)
    } else {
        dURL = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/contractareadetailsbyname?contractareaname=Business Area'
    }

    $.ajax({
        url: dURL,
        type: 'GET',
        dataType: 'json',
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        async: false,
        success: function (data) {
            thisDocumentLibrarySettings = data;
        },
        error: function (data) {

        }
    });
}

//Create New Folder in JQTree with user given name
function createnewfoldermove() {
    if (requiredValidator('dvfoldercreationvalidate', false)) {
        if ($("#txtnewfoldervalue").val().replace(/\s\s+/g, " ").toLowerCase().trim() != "new folder" && $("#txtnewfoldervalue").val().replace(/\s\s+/g, " ").toLowerCase().trim() != "amendments" && $("#txtnewfoldervalue").val().replace(/\s\s+/g, " ").toLowerCase().trim() != "summary documents") {
            $("#loadingPage").fadeIn();
            if ($("#hdnnewfoldercreatedfrom").val() == "jqtree") {
                var $tree = $('#treeviewFolderMoveOption');
                var nodeselect = $tree.tree('getNodeById', $("#hdnnewfolderurl").val());
                var parent_node = nodeselect.parent;
                var folderexit = false;
                $(parent_node.children).each(function (i, childrendata) {
                    if (childrendata.name.toLowerCase() == $("#txtnewfoldervalue").val().replace(/\s\s+/g, " ").trim().toLowerCase() && folderexit == false) {
                        folderexit = true;
                    }
                });
                if (!folderexit) {
                    var headerid = $("#lblContractTitle").text();
                    headerid = headerid.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').replace(/[\*\|\,\"\:\<\>\[\}\{\}\'\(\)\&\#\%\.\-\!]/g, '').replace(/\//g, '').replace(/\s\s+/g, " ").trim();
                    var finalurl = ($('#hdContAreaDocLibName').val() != null && $('#hdContAreaDocLibName').val() != "") ? $('#hdContAreaDocLibName').val() : '/Contract Documents/';
                    finalurl = (finalurl.charAt(0) != '/') ? '/' + finalurl : finalurl;
                    finalurl = ((finalurl.substr(finalurl.length - 1)) != "/") ? finalurl + "/" : finalurl;
                    finalurl += headerid + "/";
                    var nodetoupdate = $("#hdnnewfolderurl").val().replace('New folder', $("#txtnewfoldervalue").val().replace(/\s\s+/g, " ").trim());
                    var contractdocumenturl = ($("#hdnContractDocumentsUrl").text() != null && $("#hdnContractDocumentsUrl").text() != "") ? $("#hdnContractDocumentsUrl").text() : finalurl;
                    var contractdocumenturl = $("#hdnContractDocumentsUrlFixed").text();
                    if (contractdocumenturl != "") {
                        contractdocumenturl = contractdocumenturl.substring(1);
                        if (contractdocumenturl != "") {
                            contractdocumenturl = contractdocumenturl.trim();
                        } else {
                            contractdocumenturl = 'Contract Documents/';
                        }
                    } else {
                        contractdocumenturl = 'Contract Documents/';
                    }
                    var splturl = nodetoupdate.split(contractdocumenturl);
                    $.ajax({
                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/folderstructurejqtree?locationurl=' + encodeURIComponent(contractdocumenturl) + '&newfolder=' + splturl[1],
                        type: 'POST',
                        cache: false,
                        contentType: false,
                        headers: {
                            'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName, contractId: getParameterByName("ContractID")
                        },
                        processData: false,
                        success: function (folder) {
                            if (folder != null) {
                                $tree = $('#treeviewFolderMoveOption');
                                nodeselect = $tree.tree('getNodeById', $("#hdnnewfolderurl").val());
                                $tree.tree(
                                'updateNode',
                                nodeselect,
                                {
                                    name: $("#txtnewfoldervalue").val().replace(/\s\s+/g, " ").trim(),
                                    id: nodetoupdate
                                }
                            );
                                $("#hdnnewfolderurl").val('');
                                $("#txtnewfoldervalue").val("");
                                $("#hdnnewfoldercreatedfrom").val("");
                                $("#dvfoldercreation").dialog("close");
                                $("#loadingPage").fadeOut();
                            } else {
                                var $tree = $('#treeviewFolderMoveOption');
                                var nodeselect = $tree.tree('getNodeById', $("#hdnnewfolderurl").val());
                                $('#treeviewFolderMoveOption').tree('removeNode', nodeselect);
                                $("#hdnnewfolderurl").val("");
                                $("#txtnewfoldervalue").val("");
                                $("#hdnnewfoldercreatedfrom").val("");
                                $("#dvfoldercreation").dialog("close");
                                $("#loadingPage").fadeOut();
                            }
                            $('input[type=checkbox][name="MultipleDocuments"]').prop('checked', false)
                        },
                        error: function (document) {
                            var $tree = $('#treeviewFolderMoveOption');
                            var nodeselect = $tree.tree('getNodeById', $("#hdnnewfolderurl").val());
                            $('#treeviewFolderMoveOption').tree('removeNode', nodeselect);
                            $("#hdnnewfolderurl").val("");
                            $("#txtnewfoldervalue").val("");
                            $('input[type=checkbox][name="MultipleDocuments"]').prop('checked', false)
                        }
                    });

                } else {
                    swal("", "Folder name <span style='font-weight:700'>" + $("#txtnewfoldervalue").val().replace(/\s\s+/g, " ").trim() + "</span> is already exist");
                    $("#loadingPage").fadeOut();
                }
            } else {
                var ul = document.getElementById("ulDocument");
                var folderexsist = false;
                var exitchecking = 0;
                var getpatentfolder = [];
                if (ul.childNodes.length > 0) {
                    $(ul.childNodes).each(function (i, childnodevalue) {
                        if (childnodevalue.childNodes.length > 0) {
                            var innertextvalue = $(childnodevalue).find("a").text();
                            if (innertextvalue.indexOf('.') == -1) {
                                if ($("#txtnewfoldervalue").val().replace(/\s\s+/g, " ").trim().toLowerCase() == innertextvalue.toLowerCase() && exitchecking == 0) {

                                    folderexsist = true;
                                    exitchecking = 1;
                                }
                            }
                        }
                    });
                }
                if (!folderexsist) {
                    //var headerid = document.getElementById('lblContractTitle').innerHTML;
                    //headerid = headerid.replace(/[\*\|\,\"\:\<\>\[\}\{\}\'\(\)\&\#\%\.\-\!]/g, '').replace(/\//g, '').replace(/\s\s+/g, " ").trim();
                    //var finalurl = ($('#hdContAreaDocLibName').val() != null && $('#hdContAreaDocLibName').val() != "") ? $('#hdContAreaDocLibName').val() : '/Contract Documents/';
                    //finalurl = (finalurl.charAt(0) != '/') ? '/' + finalurl : finalurl;
                    //finalurl = ((finalurl.substr(finalurl.length - 1)) != "/") ? finalurl + "/" : finalurl;
                    //finalurl += headerid + "/";
                    var nodetoupdate = $("#hdnnewfolderurl").val().replace('New folder', $("#txtnewfoldervalue").val().replace(/\s\s+/g, " ").trim());
                    var contractdocumenturl = "";
                    if (typeof ($('#showAll').text()) != "undefined" && $('#showAll').text().replace(/ \/ /g, '/') != null && $('#showAll').text().replace(/ \/ /g, '/') != "") {
                        contractdocumenturl = $('#showAll').text().replace(/ \/ /g, '/') + '/';
                    }
                    var finalurlstr = ($("#hdContAreaDocLibName").val().charAt(0) != '/') ? '/' + $("#hdContAreaDocLibName").val() : $("#hdContAreaDocLibName").val();
                    finalurlstr = ((finalurlstr.substr(finalurlstr.length - 1)) != "/") ? finalurlstr + "/" : finalurlstr;
                    finalurlstr = (contractdocumenturl != null && contractdocumenturl != "") ? finalurlstr + contractdocumenturl : finalurlstr
                    //if ($("#hdContAreaDocLibName").val() != "") {
                    //    contractdocumenturl = $("#hdContAreaDocLibName").val() + contractdocumenturl;
                    //} else {
                    //    contractdocumenturl = "Contract Documents/" + contractdocumenturl;
                    //}
                    $.ajax({
                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/folderstructurejqtree?locationurl=' + encodeURIComponent(finalurlstr) + '&newfolder=' + $("#txtnewfoldervalue").val().replace(/\s\s+/g, " ").trim(),
                        type: 'POST',
                        cache: false,
                        contentType: false,
                        headers: {
                            'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName, contractId: getParameterByName("ContractID")
                        },
                        processData: false,
                        success: function (folder) {
                            $("#hdnnewfolderurl").val('');
                            $("#txtnewfoldervalue").val("");
                            $("#hdnnewfoldercreatedfrom").val("");
                            $("#dvfoldercreation").dialog("close");
                            //manoj
                            if (documentview == null || documentview == "" || documentview == 'folder') {
                                if (typeof ($('#showAll').text()) != "undefined" && $('#showAll').text().replace(/ \/ /g, '/') != null && $('#showAll').text().replace(/ \/ /g, '/') != "") {
                                    //var selectedfoldervalue = $('#showAll').find("a");
                                    //var textvalueselected = $(selectedfoldervalue)[$(selectedfoldervalue).length - 1].textContent;
                                    //var idvalueselected = $(selectedfoldervalue)[$(selectedfoldervalue).length - 1].id;
                                    //var person = { id: idvalueselected, text: textvalueselected };
                                    //showfolderdocuments(person);
                                    //manoj
                                    BindCreatedFolder(folder);
                                    $("#loadingPage").fadeOut();
                                    //manoj

                                } else {
                                    $("#loadingPage").fadeOut();
                                    $("#hdnContractDocumentsUrl").text(finalurlstr + $("#txtnewfoldervalue").val().replace(/\s\s+/g, " ").trim() + '/');
                                    $("#hdnContractDocumentsUrlFixed").text($("#hdnContractDocumentsUrl").text());
                                    BindDocument(vContractID);
                                    $("#hdnFolderDocumentView").text('');
                                    $("#hdnShowAllTextValue").html('');
                                    PrvFolderselection = '';
                                    //Bind primary and pined document based on new feature
                                    if ($("#hdnnewdocumentfeature").text() == "Yes") {
                                        CreateDocumentListPinView(vContractID);
                                    }
                                }
                            } else {
                                $("#loadingPage").fadeOut();
                                DisplayDocument(documentview);
                                $("#hdnFolderDocumentView").text('');
                                $("#hdnShowAllTextValue").html('');
                                PrvFolderselection = '';
                                //Bind primary and pined document based on new feature
                                if ($("#hdnnewdocumentfeature").text() == "Yes") {
                                    CreateDocumentListPinView(vContractID);
                                }
                            }
                            //GetContractPendingAction(true, "BindPeoples");
                            //$("#hdnFolderDocumentView").text('');
                            //$("#hdnShowAllTextValue").html('');
                            //PrvFolderselection = '';
                            ////Bind primary and pined document based on new feature
                            //if ($("#hdnnewdocumentfeature").text() == "Yes") {
                            //    CreateDocumentListPinView(vContractID);
                            //}
                            //manoj
                            if ($(".openmenuDocumentMultiActions").css("display") != "none")
                                $(".openmenuDocumentMultiActions").hide();
                            $('input[type=checkbox][name="MultipleDocuments"]').prop('checked', false)
                        },
                        error: function (document) {
                            $("#hdnnewfolderurl").val('');
                            $("#txtnewfoldervalue").val("");
                            $("#hdnnewfoldercreatedfrom").val("");
                            $("#dvfoldercreation").dialog("close");
                            $("#loadingPage").fadeOut();
                            //manoj
                            if (documentview == null || documentview == "" || documentview == 'folder') {
                                if (typeof ($('#showAll').text()) != "undefined" && $('#showAll').text().replace(/ \/ /g, '/') != null && $('#showAll').text().replace(/ \/ /g, '/') != "") {
                                    var selectedfoldervalue = $('#showAll').find("a");
                                    var textvalueselected = $(selectedfoldervalue)[$(selectedfoldervalue).length - 1].textContent;
                                    var idvalueselected = $(selectedfoldervalue)[$(selectedfoldervalue).length - 1].id;
                                    var person = {
                                        id: idvalueselected.id, text: textvalueselected
                                    };
                                    showfolderdocuments(person);
                                } else {
                                    BindDocument(vContractID);
                                }
                            } else {
                                DisplayDocument(documentview);
                            }
                            //GetContractPendingAction(true, "BindPeoples");
                            $("#hdnFolderDocumentView").text('');
                            $("#hdnShowAllTextValue").html('');
                            PrvFolderselection = '';
                            //Bind primary and pined document based on new feature
                            if ($("#hdnnewdocumentfeature").text() == "Yes") {
                                CreateDocumentListPinView(vContractID);
                            }
                            //manoj
                            if ($(".openmenuDocumentMultiActions").css("display") != "none")
                                $(".openmenuDocumentMultiActions").hide();
                            $('input[type=checkbox][name="MultipleDocuments"]').prop('checked', false)
                        }
                    });
                } else {
                    swal("", "Folder name <span style='font-weight:700'>" + $("#txtnewfoldervalue").val().replace(/\s\s+/g, " ").trim() + "</span> already exists.");
                    $("#loadingPage").fadeOut();
                }
            }
        } else {
            swal("", "Folder name <span style='font-weight:700'>" + $("#txtnewfoldervalue").val().replace(/\s\s+/g, " ").trim() + "</span> already exists (or) Reserved.");
        }
    }
}


function Managenewfoldermove() {
    if (requiredValidator('dvManagefoldercreationvalidate', false)) {
        if ($("#txtManagefoldervalue").val().replace(/\s\s+/g, " ").toLowerCase().trim() != "new folder" && $("#txtManagefoldervalue").val().replace(/\s\s+/g, " ").toLowerCase().trim() != "amendments" && $("#txtManagefoldervalue").val().replace(/\s\s+/g, " ").toLowerCase().trim() != "summary documents") {
            $("#loadingPage").fadeIn();
            //if ($("#hdnnewfoldercreatedfrom").val() == "jqtree") {
            var $tree = $('#treeviewManageFolderOption');
            var nodeselect = $tree.tree('getNodeById', $("#hdnManagefolderurl").val());
            var parent_node = nodeselect.parent;
            var folderexit = false;
            $(parent_node.children).each(function (i, childrendata) {
                if (childrendata.name.toLowerCase() == $("#txtManagefoldervalue").val().replace(/\s\s+/g, " ").trim().toLowerCase() && folderexit == false) {
                    folderexit = true;
                }
            });
            if (!folderexit) {
                var contractdocumenturl = "";
                if ($("#hdnContractDocumentsUrlFixed").text() == "") {
                    var headerid = $("#lblContractTitle").text();
                    headerid = headerid.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').replace(/[\*\|\,\"\:\<\>\[\}\{\}\'\(\)\&\#\%\.\-\!]/g, '').replace(/\//g, '').replace(/\s\s+/g, " ").trim();
                    var finalurl = ($('#hdContAreaDocLibName').val() != null && $('#hdContAreaDocLibName').val() != "") ? $('#hdContAreaDocLibName').val() : '/Contract Documents/';
                    finalurl = (finalurl.charAt(0) != '/') ? '/' + finalurl : finalurl;
                    finalurl = ((finalurl.substr(finalurl.length - 1)) != "/") ? finalurl + "/" : finalurl;
                    finalurl += headerid + "/";
                    contractdocumenturl = ($("#hdnContractDocumentsUrl").text() != null && $("#hdnContractDocumentsUrl").text() != "") ? $("#hdnContractDocumentsUrl").text() : finalurl;
                    //var contractdocumenturl = ($("#hdnContractDocumentsUrl").text() != null && $("#hdnContractDocumentsUrl").text() != "") ? $("#hdnContractDocumentsUrl").text() : finalurl;
                } else {
                    contractdocumenturl = $("#hdnContractDocumentsUrlFixed").text();
                    //var contractdocumenturl = $("#hdnContractDocumentsUrlFixed").text();
                }

                var nodetoupdate = $("#hdnManagefolderurl").val().replace('New folder', $("#txtManagefoldervalue").val().replace(/\s\s+/g, " ").trim());
                if (contractdocumenturl != "") {
                    contractdocumenturl = contractdocumenturl.substring(1);
                    if (contractdocumenturl != "") {
                        contractdocumenturl = contractdocumenturl.trim();
                    } else {
                        contractdocumenturl = 'Contract Documents/';
                    }
                } else {
                    contractdocumenturl = 'Contract Documents/';
                }
                var splturl = nodetoupdate.split(contractdocumenturl);
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/folderstructurejqtree?locationurl=' + encodeURIComponent(contractdocumenturl) + '&newfolder=' + splturl[1],
                    type: 'POST',
                    cache: false,
                    contentType: false,
                    headers: {
                        'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName, contractId: getParameterByName("ContractID")
                    },
                    processData: false,
                    success: function (folder) {
                        if (folder != null) {
                            $tree = $('#treeviewManageFolderOption');
                            nodeselect = $tree.tree('getNodeById', $("#hdnManagefolderurl").val());
                            $tree.tree(
                            'updateNode',
                            nodeselect,
                            {
                                name: $("#txtManagefoldervalue").val().replace(/\s\s+/g, " ").trim(),
                                id: nodetoupdate
                            }
                        );
                            //manoj
                            if (typeof ($('#showAll').text()) != "undefined" && $('#showAll').text().replace(/ \/ /g, '/') != null && $('#showAll').text().replace(/ \/ /g, '/') != "" && !Updatedocumenttap) {
                                var arrSpltFolderToReload = $("#hdnManagefolderurl").val().replace($("#hdContAreaDocLibName").val(), "~").split('~');
                                var SpltFolderToReload = arrSpltFolderToReload.pop();
                                SpltFolderToReload = (SpltFolderToReload.charAt(0) == '/') ? SpltFolderToReload.substring(1) : SpltFolderToReload;
                                var arrFolderToReload = SpltFolderToReload.split('/');
                                var arrshowAll = $("#showAll").text().split('/');
                                arrshowAll = $.map(arrshowAll, $.trim);
                                if (arrshowAll.length == arrFolderToReload.length - 1) {
                                    arrFolderToReload = arrFolderToReload.slice(0, -1);
                                    if (arrFolderToReload.join('/') == arrshowAll.join('/')) {
                                        Updatedocumenttap = true;
                                    }
                                }
                            }
                            //manoj
                            $("#hdnManagefolderurl").val('');
                            $("#txtManagefoldervalue").val("");
                            $("#hdnnewfoldercreatedfrom").val("");
                            $("#dvManagefoldercreation").dialog("close");
                            $("#loadingPage").fadeOut();
                        } else {
                            var $tree = $('#treeviewManageFolderOption');
                            var nodeselect = $tree.tree('getNodeById', $("#hdnManagefolderurl").val());
                            $('#treeviewManageFolderOption').tree('removeNode', nodeselect);
                            $("#hdnManagefolderurl").val("");
                            $("#txtManagefoldervalue").val("");
                            $("#hdnnewfoldercreatedfrom").val("");
                            $("#dvManagefoldercreation").dialog("close");
                            $("#loadingPage").fadeOut();
                        }
                        //$('input[type=checkbox][name="MultipleDocuments"]').prop('checked', false)
                    },
                    error: function (document) {
                        var $tree = $('#treeviewManageFolderOption');
                        var nodeselect = $tree.tree('getNodeById', $("#hdnManagefolderurl").val());
                        $('#treeviewManageFolderOption').tree('removeNode', nodeselect);
                        $("#hdnManagefolderurl").val("");
                        $("#txtManagefoldervalue").val("");
                        //$('input[type=checkbox][name="MultipleDocuments"]').prop('checked', false)
                    }
                });

            } else {
                swal("", "Folder name <span style='font-weight:700'>" + $("#txtManagefoldervalue").val().replace(/\s\s+/g, " ").trim() + "</span> is already exist");
                $("#loadingPage").fadeOut();
            }
            //}
        } else {
            swal("", "Folder name <span style='font-weight:700'>" + $("#txtManagefoldervalue").val().replace(/\s\s+/g, " ").trim() + "</span> already exists (or) Reserved.");
        }
    }
}


//manoj
function BindCreatedFolder(Folderdata) {
    var DefaultDocLength = ($("#hdnnewdocumentfeature").text() == "Yes") ? 20 : 10;
    articleDocumentMileStone = "";
    var vFinalSignature = "dropdownMenuFinal";
    var vMarkFinalSignature = "dropdownMenuMarkFinal";
    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
    var vAccFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "1" && n.Status == "ON");
    });
    if (vAccFeat.length > 0) {
        vFinalSignature = "dropdownMenuFinalSignature";
        vMarkFinalSignature = "dropdownMenuMarkFinalSignature";
        $("#dropdownMenuAmendment .signature").show();
        $("#dropdownMenuAmendmentFinal .signature").show();
    }
    else {
        $("#dropdownMenuAmendment .signature").hide();
        $("#dropdownMenuAmendmentFinal .signature").hide();
    }
    var vGetTime = moment(new Date()).utc();
    //var vGetTime = new Date();
    //$.ajax({
    //    url: '/Documents/GetTime',
    //    type: 'GET',
    //    dataType: 'json',
    //    cache: false,
    //    success: function (data) {
    //        var jsObject = JSON.parse(data);
    //        vGetTime = new Date(jsObject);
    //    }
    //});

    var count = 0;
    var vPermission = $("#hdnPermission").val();

    var settings = {
        pattern: /\.[0-9a-z]+$/i,
        knownFileTypes: ['pdf', 'png', 'jpg', 'gif', 'bmp', 'doc', 'xls', 'ppt', 'docx', 'xlsx', 'txt', 'pptx', 'zip', 'rar', 'gzip', 'arj', 'wav', 'mp3', 'aif', 'aiff', 'm4a', 'ogg', 'wma', 'psd', 'ai', 'swf', 'fla', 'css', 'js', 'avi', 'mov', 'wmv', 'dotx'],
        WopiFrameFileTypes: ['doc', 'xls', 'ppt', 'docx', 'xlsx', 'pptx', 'dotx']
    };
    var articleSubFolder = '';
    if (Folderdata != null) {
        if (Folderdata.ContractArea != "") {
            docdefaultview(Folderdata.ContractArea);
        }
    }
    var DocDefaultView = "";
    if (thisDocumentLibrarySettings != '' && thisDocumentLibrarySettings != 'undefined' && typeof thisDocumentLibrarySettings != "undefined") {
        DocDefaultView = thisDocumentLibrarySettings.DocDefaultView;
        DocVersion = thisDocumentLibrarySettings.DocVersion;
    }

    var item = Folderdata;
    var vv = moment(new Date(item.Modified));
    var vTime = vv.fromNow();
    vTime = vv.from(vGetTime);
    count++
    if (item.IsFolder == "True") {
        if (vTime == "Invalid date") {
            articleSubFolder += '<li class=" margin-bottom-5"><b title="Folder" style="margin-left: 21px; background-color: #888; " class="status_blue details_documentstatus">Folder</b><img src="../Content/Images/icon/folder.png" style="margin-top: -5px; margin-right: 7px;"><a style="display: inline-block; margin: 3px 0px 0px 0px;" href="javascript:void(0)" id=' + item.RowKey + ' onclick="javascript:showfolderdocuments(this);">' + item.DocumentName + '</a><span class="sub-text"> few seconds ago</span>';
        }
        else {
            articleSubFolder += '<li class=" margin-bottom-5"><b title="Folder" style="margin-left: 21px; background-color: #888; " class="status_blue details_documentstatus">Folder</b><img src="../Content/Images/icon/folder.png" style="margin-top: -5px; margin-right: 7px;"><a style="display: inline-block; margin: 3px 0px 0px 0px;" href="javascript:void(0)" id=' + item.RowKey + ' onclick="javascript:showfolderdocuments(this);">' + item.DocumentName + '</a><span class="sub-text"> ' + vTime + '</span>';
        }
        articleSubFolder += '<label id="DocumentID" style="display:none;">' + item.RowKey + '</label>';
        articleSubFolder += '<label id="FolderCreationMode" style="display:none;">' + item.CreationMode + '</label>';
        articleSubFolder += '<label id="DocumentName" style="display:none;">' + item.DocumentName + '</label>';
        if (contractItem.Status != "Expired" && contractItem.Status != "Cancelled" && contractItem.Status != "Replaced" && contractItem.Status != "Archived" && contractItem.Permission != "View" && contractItem.Permission != '' && contractItem.Permission != null) {
            articleSubFolder += '&nbsp;<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuFolder margin-left-5">';
        }
        articleSubFolder += '</li>';
    }
    if ($("#ulDocument").html() == "No items found.") {
        $("#ulDocument").empty();
    }
    $("#ulDocument").prepend(articleSubFolder);
    if (documentview != 'folder' && documentview != "" && documentview != null) {
        $("#ulDocument").addClass('ulmarginclass');
    } else {
        $("#ulDocument").removeClass('ulmarginclass');
    }
    if ($("#ulDocument")[0].childNodes.length > 1) {
        $("#documentsort").css('display', '');
    } else {
        $("#documentsort").css('display', 'none');
    }
    if (count > DefaultDocLength) {
        $("#dvDocument").html('<a id="ShowMoreDocuments" href="javascript:void(0);" class="pad-all close1" onclick="ShowMoreDocuments()">More Document(s) </a>' +
                            '<a id="ShowLessDocuments" href="javascript:void(0);" class="pad-all close1" onclick="ShowLessDocuments()" style="display:none;">Show less</a>');
    } else {
        $('.ShowMoreDocuments').css("display", "none");
        $('#ShowMoreDocuments').css("display", "none");
        $('#ShowLessDocuments').css("display", "none");
    }

    $("#lblDocumentsCount").text(count);

    if (!$("#lblDocumentsCount").text().trim()) {
        $("#ulDocument").empty();
        $("#ulDocument").append('No items found.');
    }
    $(".openmenuFolder").contextMenu({
        menu: 'myMenuFolder', leftButton: true
    }, function (action, el, pos) {
        contextMenuWorkFolder(action, el.parent("li"), pos);
    });
    if (DocVersion == "No") {
        $('li.history').hide();
    }
    if ((contractItem.Permission == 'Manage' || contractItem.Permission == 'Contribute') && (!(contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Replaced" || contractItem.Status == "Archived"))) {
        if (contractItem.IsDraft != 'Yes')
            $('.Contribute').css("display", "");
    } else if (contractItem.Permission == 'Manage' || contractItem.Permission == 'Contribute') {
        $('.StatusPermission').css("display", "");
    } else {
        $('.Contribute').css("display", "none");
    }
}
//manoj

//Remove the selected folder(if user dosen't given name to that folder)
function removecreatedfolder() {
    var $tree = $('#treeviewFolderMoveOption');
    var nodeselect = $tree.tree('getNodeById', $("#hdnnewfolderurl").val());
    $('#treeviewFolderMoveOption').tree('removeNode', nodeselect);
    $("#hdnnewfolderurl").val("");
    $("#hdnnewfoldercreatedfrom").val("");
    $("#txtnewfoldervalue").val("");
}

function changeinuploadfiles(obj) {
    var id = obj.id;
    var filecontrol = document.getElementById(id);
    var txt = "";
    if ('files' in filecontrol) {
        if (filecontrol.files.length == 0) {
        } else {
            for (var i = 0; i < filecontrol.files.length; i++) {
                var acceptExtension = ['pdf', 'png', 'jpg', 'gif', 'bmp', 'doc', 'xls', 'ppt', 'docx', 'xlsx', 'txt', 'pptx', 'dotx', 'xps', 'rtf', 'odt', 'dotm', 'docm', 'msg', 'tif', 'tiff', 'csv', 'zip', 'ZIP'];
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
                        text: "Only file type pdf, png, jpg, gif, bmp, doc, xls, ppt, docx, xlsx, txt, pptx, dotx, xps, rtf, odt, dotm, docm, msg are allowed.",
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

//manoj
function DisplayDocument(objvalue) {
    multipleChecksDocumentID = "";
    multipleChecksDocumentName = "";
    multipleChecksDocumentReview = "";
    selectedamnddoc = false;
    selectedamnddocname = [];
    $("#documentMultiActions").css('display', 'none');
    $("#hdnShowAllTextValue").html('');
    $("#hdnFolderDocumentView").text('');
    PrvFolderselection = '';
    $(".tablinks").removeClass('active');
    documentview = objvalue;
    if (objvalue == 'folder' || documentview == "" || documentview == null) {
        $("#listfolderdocumentview").addClass("active");
        //$("#btnaddnewsubfolder").css('display', '');
        if ((documentview == 'folder' || documentview == "" || documentview == null) && ($("#hdnPermission").val() == 'Manage' || $("#hdnPermission").val() == 'Contribute') && (!(contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Replaced" || contractItem.Status == "Archived"))) {
            $("#btnaddnewsubfolder").css('display', '');
        } else {
            $("#btnaddnewsubfolder").css('display', 'none');
        }
        //ApplyPermissionToMenu($("#hdnPermission").val());
        $("#showAll").empty();
        $("#showAll").css('display', '');
        BindDocument(vContractID);
    } else {
        $("#listdocumentview").addClass("active");
        $("#btnaddnewsubfolder").css('display', 'none');
        if ($("#showAll").text().indexOf("/") >= 0) {
            bindfolderupload($("#showAll").find("a:first")[0])
        } else {
            $("#showAll").css('display', 'none');
        }
        $("#ulDocument").html('<img src="../Content/Images/icon/loading.gif"> Please wait...');
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?contractid=' + vContractID,
            type: 'GET',
            dataType: 'json',
            'Content-Type': 'application/json',
            cache: false,
            headers: {
                'eContracts-ApiKey': localStorage.APIKey
            },
            success: function (documentcollection) {
                if (typeof (documentcollection) == "undefined") { //eO39876
                    $("#lblDocumentsCount").text('0');
                    $("#ulDocument").html('No items found.');
                    $("#documentsort").css('display', 'none');
                }
                else {
                    var ParentFolderDatadata = $.grep(documentcollection, function (nparent, iparent) {
                        return (nparent.ParentFolderID == "" || nparent.ParentFolderID == null);
                    });
                    if (ParentFolderDatadata.length > 0) {
                        contractparentfolderid = ParentFolderDatadata.RowKey;
                    } else {
                        contractparentfolderid = "";
                    }
                    var data = $.grep(documentcollection, function (n, i) {
                        return (n.IsFolder != "Yes");
                    });
                    if (data.length == 0) {
                        contractparentfolderid = "";
                        $("#lblDocumentsCount").text('0');
                        $("#documentsort").css('display', 'none');
                        $("#ulDocument").html('No items found.');
                    } else {
                        $('#ulDocument').empty();
                        CreateDocumentListNew(data);
                        GetContractActivities(vContractID);
                    }
                }
            },
            error:
            function (data) {
                $("#lblDocumentsCount").text('0');
                $("#ulDocument").html('No items found.');
                $("#documentsort").css('display', 'none');
            },
            complete: function () {
            }
        });
    }
}

function bindfolderupload(parentfolderid) {
    multipleChecksDocumentID = "";
    multipleChecksDocumentName = "";
    multipleChecksDocumentReview = "";
    selectedamnddoc = false;
    selectedamnddocname = [];
    $("#documentMultiActions").css('display', 'none');
    var Istagexist = false;
    $("#showAll").find("a").each(function (e) {
        var tid = this.id;
        if (tid == parentfolderid.id) {
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
                if (splitsection[spl].indexOf(parentfolderid.id) > -1) {
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


    if ($("#showAll").text().indexOf("/") >= 0) {
        var texttille = parentfolderid.id
        Istagexist = false;
        $("#showAll").find("a").each(function (e) {
            var tid = this.id;
            if (tid == parentfolderid.id) {
                Istagexist = true;
            }
        });
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
                if (id == parentfolderid.id) {
                    Isexist = true;
                }
            });
            if (!Isexist) {
                $("#showAll").append(' / <img src="../Content/Images/icon/folder_open.png" style="margin-right: 5px;"><a href="javascript:void(0)" id=' + parentfolderid.id + ' onclick="javascript:showfolderdocuments(this);">' + parentfolderid.text + '</a>');
                Folderselection += ' ~8Y92YagH <img src="../Content/Images/icon/folder_open.png" style="margin-right: 5px;"><a href="javascript:void(0)" id=' + parentfolderid.id + ' onclick="javascript:showfolderdocuments(this);">' + parentfolderid.text + '</a>';
            }
            $("#showAll").css('display', 'none');
        }
    } else {
        $("#showAll").empty();
        if (parentdocid == parentfolderid.id) {
            $("#showAll").append('<img src="../Content/Images/icon/folder_open.png" style="margin-right: 5px;"><a href="javascript:void(0)" id=' + parentdocid + ' onclick="javascript:showfolderdocuments(this);">' + parentdocname + '</a>');
            Folderselection = '<img src="../Content/Images/icon/folder_open.png" style="margin-right: 5px;"><a href="javascript:void(0)" id=' + parentdocid + ' onclick="javascript:showfolderdocuments(this);">' + parentdocname + '</a>';
        } else {
            $("#showAll").append('<img src="../Content/Images/icon/folder.png" style="margin-right: 5px;"><a href="javascript:void(0)" id=' + parentdocid + ' onclick="javascript:showfolderdocuments(this);">' + parentdocname + '</a> / <img src="../Content/Images/icon/folder_open.png" style="margin-right: 5px;"><a href="javascript:void(0)" id=' + parentfolderid.id + ' onclick="javascript:showfolderdocuments(this);">' + parentfolderid.text + '</a>');
            Folderselection = '<img src="../Content/Images/icon/folder.png" style="margin-right: 5px;"><a href="javascript:void(0)" id=' + parentdocid + ' onclick="javascript:showfolderdocuments(this);">' + parentdocname + '</a> ~8Y92YagH <img src="../Content/Images/icon/folder_open.png" style="margin-right: 5px;"><a href="javascript:void(0)" id=' + parentfolderid.id + ' onclick="javascript:showfolderdocuments(this);">' + parentfolderid.text + '</a>';
        }

        $("#showAll").css('display', 'none');
    }
}


function orderinglist(objvalue, objcountvalue, actionvalue) {
    var DefaultDocumentList = $("#hdnnewdocumentfeature").text() == "Yes" && objvalue == "ulDocument" ? 20 : 10;
    var ul = document.getElementById(objvalue)
    var arr = $.makeArray(ul.children);
    if ((documentview == null || documentview == "" || documentview == "folder") && objvalue == "ulDocument") {
        var arr1 = [];
        var arr2 = [];
        if (actionvalue == "asc") {
            $.each(arr, function () {
                if ($(this).find('b').text() == "Folder") {
                    arr1.push(this);
                } else {
                    arr2.push(this);
                }
            })
            arr1.sort(function (a, b) {
                if (($(a).find('a').text().toLowerCase()) < ($(b).find('a').text().toLowerCase())) return -1;
                if (($(a).find('a').text().toLowerCase()) > ($(b).find('a').text().toLowerCase())) return 1;
                return 0;
            });
            arr2.sort(function (a, b) {
                if (($(a).find('a').text().toLowerCase()) < ($(b).find('a').text().toLowerCase())) return -1;
                if (($(a).find('a').text().toLowerCase()) > ($(b).find('a').text().toLowerCase())) return 1;
                return 0;
            });
            arr = arr1;
            $.each(arr2, function () {
                arr.push(this);
            });
        } else {
            $.each(arr, function () {
                if ($(this).find('b').text() == "Folder") {
                    arr1.push(this);
                } else {
                    arr2.push(this);
                }
            })
            arr1.sort(function (a, b) {
                if (($(a).find('a').text().toLowerCase()) < ($(b).find('a').text().toLowerCase())) return 1;
                if (($(a).find('a').text().toLowerCase()) > ($(b).find('a').text().toLowerCase())) return -1;
                return 0;
            });
            arr2.sort(function (a, b) {
                if (($(a).find('a').text().toLowerCase()) < ($(b).find('a').text().toLowerCase())) return 1;
                if (($(a).find('a').text().toLowerCase()) > ($(b).find('a').text().toLowerCase())) return -1;
                return 0;
            });
            arr = arr1;
            $.each(arr2, function () {
                arr.push(this);
            });
        }
    } else {
        if (actionvalue == "asc") {
            arr.sort(function (a, b) {
                if (($(a).find('a').text().toLowerCase()) < ($(b).find('a').text().toLowerCase())) return -1;
                if (($(a).find('a').text().toLowerCase()) > ($(b).find('a').text().toLowerCase())) return 1;
                return 0;
            });
        } else {
            arr.sort(function (a, b) {
                if (($(a).find('a').text().toLowerCase()) < ($(b).find('a').text().toLowerCase())) return 1;
                if (($(a).find('a').text().toLowerCase()) > ($(b).find('a').text().toLowerCase())) return -1;
                return 0;
            });
        }
    }

    $("#" + objvalue).empty();
    var appendcount = 1;
    var addclassvalue = (objvalue == "ulDocument") ? "ShowMoreDocuments" : "ShowMorePinDocuments";
    var oppclassvalue = (addclassvalue == 'ShowMoreDocuments') ? 'ShowLessDocuments' : 'ShowLessPinDocuments';
    $.each(arr, function () {
        $(this).removeClass("ShowMoreDocuments");
        $(this).removeClass("ShowLessDocuments");
        $(this).removeClass("ShowMorePinDocuments");
        $(this).removeClass("ShowLessPinDocuments");
        $(this).css("display", "")
        if (appendcount >= DefaultDocumentList + 1) {
            $(this).addClass(addclassvalue);
            $(this).css("display", "none")
        }
        $("#" + objvalue).append(this);
        appendcount++;
    });
    if (arr.length > DefaultDocumentList) {
        var objvaluetobind = addclassvalue == "ShowMoreDocuments" ? "dvDocument" : "dvPinDocument";
        $("#" + objvaluetobind).html('<a id="' + addclassvalue + '" href="javascript:void(0);" class="pad-all close1" onclick="' + addclassvalue + '()">More Document(s) </a>' +
                                '<a id="' + oppclassvalue + '" href="javascript:void(0);" class="pad-all close1" onclick="' + oppclassvalue + '()" style="display:none;">Show less</a>');
    } else {
        $('.' + addclassvalue).css("display", "none");
        $('#' + addclassvalue).css("display", "none");
        $('#' + oppclassvalue).css("display", "none");
    }

    $("#" + objcountvalue).text(arr.length);
    if (!$("#" + objcountvalue).text().trim()) {
        $("#" + objvalue).empty();
        $("#" + objvalue).append('No items found.');
    }
    if (DocVersion == "No") {
        $('li.history').hide();
    }
    var vFinalSignature = "dropdownMenuFinal";
    var vMarkFinalSignature = "dropdownMenuMarkFinal";
    //var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
    //var vAccFeat = $.grep(veContractFeatures, function (n, i) {
    //    return (n.RowKey == "1" && n.Status == "ON");
    //});
    //if (vAccFeat.length > 0) {
    //    vFinalSignature = "dropdownMenuFinalSignature";
    //    vMarkFinalSignature = "dropdownMenuMarkFinalSignature";
    //    $("#dropdownMenuAmendment .signature").show();
    //    $("#dropdownMenuAmendmentFinal .signature").show();
    //}
    //else {
    //    $("#dropdownMenuAmendment .signature").hide();
    //    $("#dropdownMenuAmendmentFinal .signature").hide();
    //}
    $(".openmenuDocument").contextMenu({
        menu: vFinalSignature, leftButton: true
    }, function (action, el, pos) {
        contextMenuDocument(action, el.parent("li"), pos);
    });
    $(".openmenuDocumentFinal").contextMenu({
        menu: vMarkFinalSignature, leftButton: true
    }, function (action, el, pos) {
        contextMenuDocument(action, el.parent("li"), pos);
    });
    $(".openmenuAmendmentDocument").contextMenu({
        menu: "dropdownMenuAmendment", leftButton: true
    }, function (action, el, pos) {
        contextMenuAmendmentDocument(action, el.parent("li"), pos);
    });
    $(".openmenuAmendmentDocumentFinal").contextMenu({
        menu: "dropdownMenuAmendmentFinal", leftButton: true
    }, function (action, el, pos) {
        contextMenuAmendmentDocument(action, el.parent("li"), pos);
    });
    //Un Pin Document
    $(".openmenuDocumentUnPin").contextMenu({
        menu: vFinalSignature + "UnPin", leftButton: true
    }, function (action, el, pos) {
        contextMenuDocument(action, el.parent("li"), pos);
    });
    $(".openmenuDocumentFinalUnPin").contextMenu({
        menu: vMarkFinalSignature + "UnPin", leftButton: true
    }, function (action, el, pos) {
        contextMenuDocument(action, el.parent("li"), pos);
    });
    $(".openmenuAmendmentDocumentUnPin").contextMenu({
        menu: "dropdownMenuAmendmentUnPin", leftButton: true
    }, function (action, el, pos) {
        contextMenuAmendmentDocument(action, el.parent("li"), pos);
    });
    $(".openmenuAmendmentDocumentFinalUnPin").contextMenu({
        menu: "dropdownMenuAmendmentFinalUnPin", leftButton: true
    }, function (action, el, pos) {
        contextMenuAmendmentDocument(action, el.parent("li"), pos);
    });
    $(".openmenuFolder").contextMenu({
        menu: 'myMenuFolder', leftButton: true
    }, function (action, el, pos) {
        contextMenuWorkFolder(action, el.parent("li"), pos);
    });
    //manoj
    $(".hideItem").click(function () {
        if ((contractItem.Permission == 'Manage' || contractItem.Permission == 'Contribute') && (!(contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Replaced" || contractItem.Status == "Archived"))) {
            $(".unpindocument").hide();
            $(".pindocument").hide();
            $(".primary").show();
        }
    })
    $(".showitem").click(function () {
        if ((contractItem.Permission == 'Manage' || contractItem.Permission == 'Contribute') && (!(contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Replaced" || contractItem.Status == "Archived"))) {
            $(".unpindocument").show();
            $(".pindocument").show();
            $(".primary").show();
        }
    })
    $(".primarydocument").click(function () {
        $(".primary").hide();
    })
    //manoj
    $("#contractLogs").empty();
}

function SearchDocumentKeyword() {
    multipleChecksDocumentID = "";
    multipleChecksDocumentName = "";
    multipleChecksDocumentReview = "";
    selectedamnddoc = false;
    selectedamnddocname = [];
    $("#documentMultiActions").css('display', 'none');
    if (requiredValidator("dvdocumentkeyword", true)) {
        if (typeof ($('#hdnFolderDocumentView').text()) != "undefined" && $("#hdnFolderDocumentView").text() != null && $("#hdnFolderDocumentView").text() != "") {

        } else {
            $("#hdnShowAllTextValue").html($("#showAll")[0].innerHTML);
            PrvFolderselection = Folderselection;
            $(".tablinks").each(function (index, element) {
                if ($(element).hasClass("active")) {
                    $("#hdnFolderDocumentView").text($(element).attr('data-value'));
                }
            });
        }
        if (typeof ($('#hdnFolderDocumentView').text()) == "undefined" || $("#hdnFolderDocumentView").text() == null || $("#hdnFolderDocumentView").text() == "") {
            $("#hdnFolderDocumentView").text('folder');
        }
        $(".tablinks").removeClass('active');
        documentview = 'document';
        $("#listdocumentview").addClass("active");
        $("#btnaddnewsubfolder").css('display', 'none');
        if ($("#showAll").text().indexOf("/") >= 0) {
            bindfolderupload($("#showAll").find("a:first")[0])
        } else {
            $("#showAll").css('display', 'none');
        }
        $("#ulDocument").html('<img src="../Content/Images/icon/loading.gif"> Searching...');
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?contractid=' + vContractID + '&searchkeyword=' + encodeURIComponent($("#txtdocumentkeyword").val()),
            type: 'GET',
            dataType: 'json',
            'Content-Type': 'application/json',
            cache: false,
            headers: {
                'eContracts-ApiKey': localStorage.APIKey
            },
            success: function (documentcollection) {
                var data = $.grep(documentcollection, function (n, i) {
                    return (n.IsFolder != "Yes");
                });
                if (data.length == 0) {
                    $("#lblDocumentsCount").text('0');
                    $("#ulDocument").html('No items found.');
                    $("#documentsort").css('display', 'none');
                } else {
                    $('#ulDocument').empty();
                    CreateDocumentListNew(data);
                    GetContractActivities(vContractID);
                }
            },
            error:
            function (data) {
                $("#lblDocumentsCount").text('0');
                $("#ulDocument").html('No items found.');
                $("#documentsort").css('display', 'none');
                $('.ShowMoreDocuments').css("display", "none");
                $('#ShowMoreDocuments').css("display", "none");
                $('#ShowLessDocuments').css("display", "none");
            },
            complete: function () {
            }
        });
    }
}

function ClearDocumentKeyword() {
    if ($("#hdnFolderDocumentView").text() == "") {
        $("#txtdocumentkeyword").val('');
    } else {
        multipleChecksDocumentID = "";
        multipleChecksDocumentName = "";
        multipleChecksDocumentReview = "";
        selectedamnddoc = false;
        selectedamnddocname = [];
        $("#documentMultiActions").css('display', 'none');
        $("#txtdocumentkeyword").val('');
        $(".tablinks").removeClass('active');
        documentview = (typeof ($('#hdnFolderDocumentView').text()) != "undefined" && $('#hdnFolderDocumentView').text() != null && $('#hdnFolderDocumentView').text() != "") ? $('#hdnFolderDocumentView').text() : 'folder';
        if (documentview == 'document') {
            DisplayDocument('document');
        } else {
            $("#showAll").html($("#hdnShowAllTextValue")[0].innerHTML);
            Folderselection = PrvFolderselection;
            $("#showAll").css("display", "");
            $("#listfolderdocumentview").addClass("active");
            if ((documentview == 'folder' || documentview == "" || documentview == null) && ($("#hdnPermission").val() == 'Manage' || $("#hdnPermission").val() == 'Contribute') && (!(contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Replaced" || contractItem.Status == "Archived"))) {
                $("#btnaddnewsubfolder").css('display', '');
            } else {
                $("#btnaddnewsubfolder").css('display', 'none');
            }
            //ApplyPermissionToMenu($("#hdnPermission").val());
            if ($("#showAll").text().indexOf("/") >= 0) {
                showfolderdocuments($("#showAll").find("a:last")[0])
            } else {
                BindDocument(vContractID);
            }
        }
        $("#hdnFolderDocumentView").text('');
        $("#hdnShowAllTextValue").html('');
        PrvFolderselection = '';
    }
}
//manoj

function getcontractsummerytemplate(ContractType, SummeryBlobURL, action) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/summerytemplatebyctype?contype=' + encodeURIComponent(ContractType),
        type: 'GET',
        dataType: 'json',
        cache: false,
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        //contentType: false,
        success: function (SummeryTemp) {
            if (action) {
                if (contractItem.Status != "Cancelled") {
                    var SummeryDocumentName = SummeryBlobURL.split('_');
                    $("#iStandardIcon").html('<label id="lblsummerydocumentpath" style="display:none"> ' + SummeryBlobURL + '</label><img src="../Content/Images/status/cover_sheet.png" alt="Contract Cover Sheet" title="Contract Cover Sheet" class="openmenusummerydocument" />');
                    //manoj
                    $(".openmenusummerydocument").contextMenu({
                        menu: 'dropdownMenuSummery', leftButton: true
                    }, function (action, el, pos) {
                        contextMenuSummeryDocument(action, el.parent("i"), pos);
                    });
                    if (contractItem.Permission != "View" && contractItem.Status != "Archived" && contractItem.Status != "Expired") {
                        $(".clCoverSheet").css("display", "");
                        $("#hdnsummeryTempDocu").text("Yes");
                        $("#lisummarydocument").css("display", "");
                    } else {
                        $(".clCoverSheet").css("display", "none");
                        $("#hdnsummeryTempDocu").text("No");
                        $("#lisummarydocument").css("display", "none");
                    }
                }
                if (typeof (SummeryTemp) == "undefined" || SummeryTemp == "undefined" || SummeryTemp == null) {
                    $(".clCoverSheet").css("display", "none");
                }

            }
            else if (contractItem.Permission != "View" && contractItem.Status != "Cancelled" && contractItem.Status != "Archived" && contractItem.Status != "Expired") {
                $("#iStandardIcon").html('<img src="../Content/Images/status/cover_sheet.png" alt="Contract Cover Sheet" title="Contract Cover Sheet" class="dropdownMenuGenerateSummery" />');
                $(".dropdownMenuGenerateSummery").contextMenu({
                    menu: 'dropdownMenuGenerateSummery', leftButton: true
                }, function (action, el, pos) {
                    contextMenuSummeryDocument(action, el.parent("i"), pos);
                });
                $("#hdnsummeryTempDocu").text("No");
                $("#lisummarydocument").css("display", "none");

                if (typeof (SummeryTemp) == "undefined" || SummeryTemp == "undefined" || SummeryTemp == null) {
                    $("#iStandardIcon").empty();
                }

            } else {
                $("#iStandardIcon").empty();
                $("#hdnsummeryTempDocu").text("No");
                $("#lisummarydocument").css("display", "none");
            }
        },
        error: function (SummeryTemp) {
            if (action) {
                var SummeryDocumentName = SummeryBlobURL.split('_');
                $("#iStandardIcon").html('<label id="lblsummerydocumentpath" style="display:none"> ' + SummeryBlobURL + '</label><img src="../Content/Images/status/cover_sheet.png" alt="Contract Cover Sheet" title="Contract Cover Sheet" class="openmenusummerydocument" />');
                //manoj
                $(".openmenusummerydocument").contextMenu({
                    menu: 'dropdownMenuSummery', leftButton: true
                }, function (action, el, pos) {
                    contextMenuSummeryDocument(action, el.parent("i"), pos);
                });
                $(".clCoverSheet").css("display", "none");
                //manoj
                if (contractItem.Permission != "View") {
                    $("#hdnsummeryTempDocu").text("Yes");
                    $("#lisummarydocument").css("display", "");
                } else {
                    $("#hdnsummeryTempDocu").text("No");
                    $("#lisummarydocument").css("display", "none");
                }
                //manoj
            } else {
                $("#iStandardIcon").empty();
                $("#hdnsummeryTempDocu").text("No");
                $("#lisummarydocument").css("display", "none");
            }
        }
    });
}

function ViewSummeryDocument(docurl) {
    srcurl = "https://view.officeapps.live.com/op/embed.aspx?src=" + docurl + "?" + randomString() + "=" + randomString() + "&wdStartOn=1";
    window.open(srcurl);
}

function GetSummeryDocument(vconid) {
    //manoj
    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
    var vCoverSheet = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "23" && n.Status == "ON");
    });
    if (vCoverSheet.length > 0) {
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?contractid=' + vconid,
            type: 'GET',
            cache: false,
            contentType: false,
            headers: {
                'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID
            },
            processData: false,
            success: function (item) {
                vContractTile = item.ContractTitle;
                contractItem = item;
                if (contractItem.SummeryBlobURL != null && contractItem.SummeryBlobURL != "") {
                    var SummeryDocumentName = contractItem.SummeryBlobURL.split('_');
                    $("#iStandardIcon").html('<label id="lblsummerydocumentpath" style="display:none"> ' + contractItem.SummeryBlobURL + '</label><img src="../Content/Images/status/cover_sheet.png" alt="Contract Cover Sheet" title="Contract Cover Sheet" class="openmenusummerydocument" />');
                    //manoj
                    $(".openmenusummerydocument").contextMenu({
                        menu: 'dropdownMenuSummery', leftButton: true
                    }, function (action, el, pos) {
                        contextMenuSummeryDocument(action, el.parent("i"), pos);
                    });
                    $(".clCoverSheet").css("display", "");
                    $("#hdnsummeryTempDocu").text("Yes");
                    $("#lisummarydocument").css("display", "");
                } else {
                    $("#iStandardIcon").html('<img src="../Content/Images/status/cover_sheet.png" alt="Contract Cover Sheet" title="Contract Cover Sheet" class="dropdownMenuGenerateSummery" />');
                    $(".dropdownMenuGenerateSummery").contextMenu({
                        menu: 'dropdownMenuGenerateSummery', leftButton: true
                    }, function (action, el, pos) {
                        contextMenuSummeryDocument(action, el.parent("i"), pos);
                    });
                    $("#hdnsummeryTempDocu").text("No");
                    $("#lisummarydocument").css("display", "none");
                }
                $("#loadingPage").fadeOut();
            }
        });
    } else {
        $("#loadingPage").fadeOut();
        $("#iStandardIcon").empty();
        $("#hdnsummeryTempDocu").text("No");
        $("#lisummarydocument").css("display", "none");
    }
}

//Context menu for Summery Document
function contextMenuSummeryDocument(action, el, pos) {
    switch (action) {
        case 'editO365': {
            ViewSummeryDocument($(el).find("#lblsummerydocumentpath").text());
            break;
        }
        case 'replace': {
            generatecoversheet('regenerate');
            break;
        }
        case 'genetarecover': {
            generatecoversheet('generate');
            break;
        }
        case 'download': {
            var LinkURL = decodeURIComponent($(el).find("#lblsummerydocumentpath").text());
            location = LinkURL;
            break;
        }
    }
}
//Context menu for Summery Document

function CheckDocumentNameExistForEdit(FolderUrl, documentID) {
    var isExist = false;
    var vDocURL = "";
    var folderurltobind = "";
    vDocURL = FolderUrl.substring(0, FolderUrl.lastIndexOf("/") + 1) + encodeURIComponent($('#txtDocumentName').val()) + "." + $("#spExt").text().trim();
    folderurltobind = "";
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?contractid=' + getParameterByName("ContractID") + '&docurl=' + vDocURL,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        async: false,
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        success: function (data) {
            if (data == null) {
                isExist = false;
            }
            else {
                if (data.RowKey == documentID) {
                    isExist = false;
                }
                else {
                    isExist = true;

                }
            }
        },
        error: function (data) {
            isExist = false;
        }
    });
    return isExist;
}


//manoj
//Cover Sheet Document Generate/Re-Generate
function coversheet_trigger(objvaluetrigger) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/automationcoversheet?coversheetid=' + vContractID,
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        //async: false,
        success: function (data) {
            if (data != null && data.length > 0) {
                coversheet_init(objvaluetrigger);
            } else {
                if (objvaluetrigger == 'generate') {
                    swal("", "Cover sheet document has been generated for this contract.");
                } else {
                    swal("", "Cover sheet document has been regenerated for this contract.");
                }
                GetSummeryDocument(contractItem.RowKey);
            }
        },
        error: function (SumDocu) {
            if (objvaluetrigger == 'generate') {
                swal("", "Cover sheet document has been generated for this contract.");
            } else {
                swal("", "Cover sheet document has been regenerated for this contract.");
            }
            GetSummeryDocument(contractItem.RowKey);
        }
    });
}

//Trigger every 5 sec if document not yet created
function coversheet_init(objinit) {
    setTimeout('coversheet_trigger("' + objinit + '")', 5000);
}
//Trigger every 5 sec if document not yet created

//Cover Sheet Document Generate/Re-Generate
//manoj






function MultipleDocumentSignature(el) {
    // var Stage = "";
    var requiredavalible = false;
    //  Stage = getParameterByName("Stage");
    if (Stage == 'pipeline') {
        if ($("#spanstatus").text() != "") {
            var arrstatus = ['Ready for Signature', 'Awaiting Signatures', 'Signed', 'Active', 'Expired', 'Replaced', 'Archived', 'On Hold', 'Cancelled'];
            if (arrstatus.indexOf($("#spanstatus").text().trim()) > -1) {
                Stage = '';
            }
        }
    }
    var documentName = '';
    var documentNameArr = multipleChecksDocumentName.split('~');
    var documentIDArr = multipleChecksDocumentID.split(';');
    var DocumentUrlArr = multipleChecksDocumentURL.split('|');

    var DocumentUrlArr = multipleChecksDocumentURL.split('|');
    var vOptions = '';
    var doccount = 1;

    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
    if (veContractFeatures == null) {
        GetFeaturesInDetailPage();
    }
    var vAccFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "26" && n.Status == "ON");
    });

    if (vAccFeat.length > 0 && documentNameArr.length > 1) {  //thilo advanved docusign

        for (i = 1; i <= documentNameArr.length; i++) {
            if (vOptions == '')
                vOptions = "<option value='" + i + "'>" + i + "</option>";
            else
                vOptions += "<option value='" + i + "'>" + i + "</option>";

        }
        $.each(documentNameArr, function (index, value) {
            if (documentName == '')
                documentName = "<b class='width90 float_left'>" + value + " <select id=ddlorder" + doccount + " class='width10 DocOrder' style='height:25px !important;' onclick='ClickedDocOrder(this)' onchange='SelectedDocOrder(this)'>" + vOptions + " </select><img src='/Content/Images/icon/delete.png' onclick='javascript:liRemoveSignDocOrder(this,\"" + documentIDArr[doccount - 1] + "\",\"" + DocumentUrlArr[doccount - 1] + "\");'></b>";
            else
                documentName += "<b class='width90 float_left'>" + value + " <select id=ddlorder" + doccount + " class='width10 DocOrder' style='height:25px !important;'  onclick='ClickedDocOrder(this)' onchange='SelectedDocOrder(this)'>" + vOptions + " </select><img src='/Content/Images/icon/delete.png' onclick='javascript:liRemoveSignDocOrder(this,\"" + documentIDArr[doccount - 1] + "\",\"" + DocumentUrlArr[doccount - 1] + "\");'></b>";
            doccount++;
        });
    }
    else {
        $.each(documentNameArr, function (index, value) {
            if (documentName == '')
                documentName = "<b class='width90 float_left'>" + value + " <img src='/Content/Images/icon/delete.png' onclick='javascript:liRemoveSignDoc(this,\"" + documentIDArr[index] + "\",\"" + DocumentUrlArr[index] + "\");'></b>";
            else
                documentName += "<b class='width90 float_left'>" + value + " <img src='/Content/Images/icon/delete.png' onclick='javascript:liRemoveSignDoc(this,\"" + documentIDArr[index] + "\",\"" + DocumentUrlArr[index] + "\");'></b>";
        });
    }

    var documentID = multipleChecksDocumentID;
    var DocumentUrl = multipleChecksDocumentURL;
    var PrimaryDocumentCheck = multipleChecksDocumentIsPrimaryDoc;

    $("#hdIsPrimaryDoc").val(PrimaryDocumentCheck);
    if (PrimaryDocumentCheck.indexOf('Yes') > -1)
        $("#lblAutoUpdateStatusSignDoc").html("Auto update Document & Contract Record status based on this Workflow.");
    else
        $("#lblAutoUpdateStatusSignDoc").html("Auto update Document status based on this Workflow.");
    if (Stage == 'pipeline') {
        var vMetadatavaluetofinalize;
        var metadataFields = [];
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/IContractDetails?contractid=' + getParameterByName("ContractID"),
            type: 'GET',
            dataType: 'json',
            headers: {
                'eContracts-ApiKey': localStorage.APIKey
            },
            cache: false,
            async: false,
            success: function (mainmetadataFields) {
                vMetadatavaluetofinalize = $(mainmetadataFields).find('Metadata');
            },
        });
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contracttypes/metadatas?contracttypename=' + strSelectedContractType.trim(),
            type: 'GET',
            dataType: 'json',
            headers: {
                'eContracts-ApiKey': localStorage.APIKey
            },
            cache: false,
            async: false,
            success: function (metadataFieldsvalue) {
                if (getParameterByName("Stage") == "pipeline") {
                    metadataFields = $.grep(metadataFieldsvalue, function (n, i) {
                        return (n.Finalizingfrom == "Required");
                    });
                }
            },
        });

        $(metadataFields).each(function (i, item) {
            if ($(vMetadatavaluetofinalize).find(item.FieldName).text() == null || $(vMetadatavaluetofinalize).find(item.FieldName).text() == "") {
                requiredavalible = true;
            }
        });
        if (!requiredavalible) {
            ClearSignatureForm();
            DisableCCUsers();
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Workflow/settings',
                type: 'GET',
                dataType: 'json',
                "Content-Type": "application/json",
                headers: {
                    'eContracts-ApiKey': localStorage.APIKey
                },
                cache: false,
                success: function (settings) {
                    $("#txtExpIn").val(settings.TaskDuration);
                    $("#lblExpDateddl").html(moment(new Date()).add($("#ddltxtExpIn").val(), "days").format('MM/DD/YYYY'));
                    $("#lblExpDatetxt").html(moment(new Date()).add(settings.TaskDuration, "days").format('MM/DD/YYYY'));
                },
                error: function () {

                }
            });

            $("#hdMarkAsFinal").val("Y");
            $("#hdDocumentID").val(documentID);
            $("#hdDocumentURL").val(DocumentUrl);
            $("#tdDocument").html(documentName);

            for (i = 1; i <= documentNameArr.length; i++) {
                $('#ddlorder' + i).val(i);
            }
            getNameAndEmailSignDocument();
            $('#chkAutoUpdateStatusSignDoc').prop('checked', true)
            $("#sendForSignature").dialog("open");
        } else {
            swal({
                title: '',
                text: "Some fields required for Contract Record finalization are not filled. Do you want to edit now?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                html: true
            },
                function (confirmed) {
                    if (confirmed) {
                        if (Stage == 'pipeline') {
                            location = "/Contracts/EditContract?ContractID=" + getParameterByName("ContractID") + "&ContractType=" + encodeURIComponent($("#lblContractType").text()) + "&Stage=" + Stage + "&Finalize=true";
                        }
                    } else {
                        $("#loadingPage").fadeOut();
                    }
                });
        }

    } else {
        ClearSignatureForm();
        DisableCCUsers();
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Workflow/settings',
            type: 'GET',
            dataType: 'json',
            "Content-Type": "application/json",
            headers: {
                'eContracts-ApiKey': localStorage.APIKey
            },
            cache: false,
            success: function (settings) {
                $("#txtExpIn").val(settings.TaskDuration);
                $("#lblExpDateddl").html(moment(new Date()).add($("#ddltxtExpIn").val(), "days").format('MM/DD/YYYY'));
                $("#lblExpDatetxt").html(moment(new Date()).add(settings.TaskDuration, "days").format('MM/DD/YYYY'));
            },
            error: function () {

            }
        });

        $("#hdMarkAsFinal").val("Y");
        $("#hdDocumentID").val(documentID);
        $("#hdDocumentURL").val(DocumentUrl);
        $("#tdDocument").html(documentName);
        for (i = 1; i <= documentNameArr.length; i++) {
            $('#ddlorder' + i).val(i);
        }
        getNameAndEmailSignDocument();
        $('#chkAutoUpdateStatusSignDoc').prop('checked', true)
        $("#sendForSignature").dialog("open");
    }
}

function liRemoveSignDoc(obj, docid, docurl) {
    var documentIDArr = $("#hdDocumentID").val().split(';');
    documentIDArr = documentIDArr.filter(function (elem) {
        return elem != docid;
    });
    $("#hdDocumentID").val(documentIDArr.join(';'));
    var DocumentUrlArr = $("#hdDocumentURL").val().split('|');
    DocumentUrlArr = DocumentUrlArr.filter(function (elem) {
        return elem != docurl;
    });
    $("#hdDocumentURL").val(DocumentUrlArr.join('|'));
    var child = obj.parentNode;
    child.parentNode.removeChild(child);
}

function liRemoveSignDocOrder(obj, docid, docurl) {
    var documentIDArr = $("#hdDocumentID").val().split(';');
    documentIDArr = documentIDArr.filter(function (elem) {
        return elem != docid;
    });
    $("#hdDocumentID").val(documentIDArr.join(';'));
    var DocumentUrlArr = $("#hdDocumentURL").val().split('|');
    DocumentUrlArr = DocumentUrlArr.filter(function (elem) {
        return elem != docurl;
    });
    $("#hdDocumentURL").val(DocumentUrlArr.join('|'));

    //var child = obj.parentNode;
    //child.parentNode.removeChild(child);


    var vv = $(obj.parentNode).find('select');

    var curVal = 0;
    if (typeof vv != 'undefined') {
        curVal = parseInt(vv.val());
    }
    obj.parentNode.parentNode.removeChild(obj.parentNode);



    $(".DocOrder").each(function (index, data) {
        var removeindex = $("#" + data.id + " > option").length;//data.childelementcount;

        var curVal2 = parseInt($(data).val());
        if (curVal2 > curVal) {
            $(data).val(curVal2 - 1);
        }
        $("#" + data.id + " option[value='" + removeindex + "']").remove();
        //  $("#ddlorder1 option[value='" + removeindex + "']").remove();

    });


}

//Sridhar
function DisableCCUsers() {
    var globalConOwners = getGlobalContractOwners();
    var contractPeople = (contractItem.ContractManagers + ";" + contractItem.Approvers + ";" + contractItem.Reviewers + ";" + contractItem.Signees
                    + ";" + contractItem.ContractAreaAdministrators + ";" + contractItem.BusinessAreaOwners + ";" + contractItem.ReadOnlyPermissions
                    + ";" + contractItem.ReadWritePermissions + ";" + contractItem.FullControlPermissions + ";" + contractItem.ProjectManager + ";" + businessAreaDetails.CCUsers + ";" + globalConOwners).split(';');
    contractPeople = $.map(contractPeople, $.trim);
    contractPeople = contractPeople.filter(function (people) {
        return people.trim() != '';
    });
    var myArray = $("#ddlCC>option").map(function () { return $(this).val(); }).get();
    if (myArray == null)
        myArray = [];
    $.each(myArray, function (i, item) {
        if (contractPeople.indexOf(item) < 0)
            $('#ddlCC option[value= "' + item + '"]').remove()//.css('display', 'none');
        else
            $('#ddlCC option[value= "' + item + '"]').css('display', '');
    });
    if (businessAreaDetails.CCUsers != "" && businessAreaDetails.CCUsers != null) {
        GetValuesAndAutoPopulate("ddlCC", businessAreaDetails.CCUsers);
    }

    $("#ddlCC").trigger('chosen:updated');
}

//manoj
function CheckFolderExist(DocumentID) {
    if ($("#txtNewFolderName").val() != "") {
        if ($("#txtNewFolderName").val().replace(/\s\s+/g, " ").toLowerCase().trim() != "new folder" && $("#txtNewFolderName").val().replace(/\s\s+/g, " ").toLowerCase().trim() != "amendments") {
            if (($('#lblFolderUrl').text().match(/\//g) || []).length > 2) {
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/childdocuments?contractid=' + vContractID + '&folderurl=' + $('#lblFolderUrl').text(),
                    type: 'GET',
                    cache: false,
                    contentType: false,
                    headers: {
                        'eContracts-ApiKey': localStorage.APIKey
                    },
                    success: function (childdocument) {
                        var documentresult = $.grep(childdocument, function (n, i) {
                            return (n.DocumentName.toLowerCase() == $("#txtNewFolderName").val().replace(/\s\s+/g, " ").toLowerCase().trim());
                        });
                        if (documentresult.length > 0) {
                            $("#uploaddocumentprocess").css('display', 'none');
                            swal("", "Folder name <span style='font-weight:700'>" + $("#txtNewFolderName").val().replace(/\s\s+/g, " ").trim() + "</span> already exists (or) Reserved.");
                        } else {
                            allowuploadDocument(DocumentID);
                        }
                    },
                    error: function (childdocument) {
                        allowuploadDocument(DocumentID);
                    }
                });
            } else {
                allowuploadDocument(DocumentID);
            }
        } else {
            $("#uploaddocumentprocess").css('display', 'none');
            swal("", "Folder name <span style='font-weight:700'>" + $("#txtNewFolderName").val().replace(/\s\s+/g, " ").trim() + "</span> already exists (or) Reserved.");
        }
    } else {
        allowuploadDocument(DocumentID);
    }
}

function allowuploadDocument(DocumentID) {
    DuplicateDocId = CheckDocumentExistwithoutparameter();
    if (DuplicateDocId != "False") {
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
                     $("#uploaddocumentprocess").css('display', '');
                     overwritedocument = true;
                     if ($("#dtValidFrom").val() != '' && $("#dtValidTill").val() != '') {
                         if (comparedates("dtValidFrom", "dtValidTill")) {
                             $("#addEditDocument").dialog("close");
                             newDocument(DocumentID);
                         } else {
                             $("#uploaddocumentprocess").css('display', 'none');
                             swal("", "Valid Till date should be greater than Valid From date.");
                         }
                     } else {
                         $("#addEditDocument").dialog("close");
                         newDocument(DocumentID);
                     }
                     $("#uploaddocumentprocess").css('display', 'none');
                 }
                 else {
                     $('.ui-button-green-text').parent().removeAttr('disabled');
                     $("#uploaddocumentprocess").css('display', 'none');
                 }
                 return;
             });

    }
    else {
        overwritedocument = false;
        $("#uploaddocumentprocess").css('display', '');
        DuplicateDocId = "";
        if ($("#dtValidFrom").val() != '' && $("#dtValidTill").val() != '') {
            if (comparedates("dtValidFrom", "dtValidTill")) {
                $("#addEditDocument").dialog("close");
                newDocument(DocumentID);
            } else {
                $("#uploaddocumentprocess").css('display', 'none');
                swal("", "Valid Till date should be greater than Valid From date.");
            }
        } else {
            $("#addEditDocument").dialog("close");
            newDocument(DocumentID);
        }
        // $("#uploaddocumentprocess").css('display', 'none');
    }
}


function ReplaceDocumentShareNew(collabrationID) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Documents/DocumentAcceptedShare?collarabationid=' + collabrationID,
        type: 'PUT',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: {
            'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging
        },
        success: function (data) {
            if (data != null && data != "" && typeof (data) != "undefined") {
                contractItem.Status = data;
                ContractTopActions();
                BindDocument(vContractID);
            }
            GetContractActivities(vContractID);
            $("#loadingPage").fadeOut();
            swal("", "New Version of the Document has been shared with users.");
        },
        error:
        function (data) {
            $("#loadingPage").fadeOut();
        }
    });

}


$('#btnAdd').click(function (e) {
    e.preventDefault();

    var removeBtn = "<img src='../Content/Images/icon/delete.png' style='float:right; margin-top:10px;' onclick='deleteDocumentElement(this)' />";
    var htmlFormatDiv = $("<div id='uploadContainer' style='height:30px'></div>");
    var htmlFormatFile = $("<input type='file' onchange='javascript:changeinuploadfiles(this);'/>");

    var totalFileCount = $("#inTD").children("div").length;
    htmlFormatFile.attr("id", "file" + (totalFileCount + 1));
    htmlFormatFile.attr("name", "file" + (totalFileCount + 1));
    htmlFormatFile.attr("class", "file_amendment");
    htmlFormatFile.addClass("HLeyckU8");
    htmlFormatDiv.attr("id", "uploadContainer" + (totalFileCount + 1));

    htmlFormatDiv.append(htmlFormatFile);
    htmlFormatDiv.append(removeBtn);

    $("#inTD").append(htmlFormatDiv);
});

function deleteDocumentElement(n) {
    var ele = n.parentNode.id;
    var pattern = /[0-9]+/g;
    var docNumb = ele.replace(/[^0-9]/g, '');
    n.parentNode.parentNode.removeChild(n.parentNode);

    var totalFileCount = $("#inTD").children().length;
    totalFileCount = totalFileCount + 1;
    var count = parseInt(docNumb) + 1;

    for (var i = count ; i < (totalFileCount + 1) ; i++) {
        $("#uploadContainer" + i).attr('id', 'uploadContainer' + (i - 1));
        var element = $("#file" + i);
        element.attr('id', 'file' + (i - 1));
        element.attr('name', 'file' + (i - 1));
    }
}

function deleteSavedDocumentElement(n, RowKey) {
    swal({
        title: '',
        text: "Are you sure you want to delete?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        html: true
    },
       function (confirmed) {
           if (confirmed) {
               $(n).parent().parent().remove();
               $.ajax({
                   url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?documentid=' + RowKey + '&amendment=True',
                   type: 'DELETE',
                   dataType: 'json',
                   "Content-Type": "application/json",
                   headers: {
                       'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName
                   },
                   cache: false,
                   success: function (data) {

                   },
                   error: function () {

                   }
               });
           }
           return;
       });

}

function getUrlOfAttachedDoc() {
    var urlOfAttachedDoc = "";
    $('.clsLinkOfDoc').each(function () {
        var href = $(this).attr('href');
        if (urlOfAttachedDoc == "")
            urlOfAttachedDoc += href;
        else
            urlOfAttachedDoc += ";" + href;
    });
    return urlOfAttachedDoc;
}


function DocuSignatureComment(data, wid) {
    var article = '';
    var strails = $(data).find('Event').text();
    $(data).find('Event').each(function () {
        var date = moment(new Date($(this).find('logTime').text())).format('MMMM Do YYYY, h:mm A');
        var message = $(this).find('Message').text();

        article += '<div class="activity-details-start row-group">';
        article += '<div class="col8 no-pad">';
        article += message;
        article += '</div>';
        article += '<div class="col4 no-pad text-right">';
        article += date;
        article += '</div>';
        article += '</div>';
    });

    $("#Det_" + wid).html(article);
}


function EcoSignatureComment(data, wid) {

    var article = '';
    var strails = $(data).find('DocumentHistoryEvent').text();
    $(data).find('DocumentHistoryEvent').each(function () {
        var date = moment(new Date($(this).find('date').text())).format('MMMM Do YYYY, h:mm A');
        var message = $(this).find('description').text();

        article += '<div class="activity-details-start row-group">';
        article += '<div class="col8 no-pad">';
        article += message;
        article += '</div>';
        article += '<div class="col4 no-pad text-right">';
        article += date;
        article += '</div>';
        article += '</div>';
    });

    $("#Det_" + wid).html(article);


}

function RightSignatureComment(data, wid) {
    var article = '';
    var strails = $(data).find('audit-trails').text();
    $(data).find('audit-trail').each(function () {
        var timestamp = moment(new Date($(this).find('timestamp').text())).format('MMMM Do YYYY, h:mm A');
        var message = $(this).find('message').text();

        article += '<div class="activity-details-start row-group">';
        article += '<div class="col8 no-pad">';
        article += message;
        article += '</div>';
        article += '<div class="col4 no-pad text-right">';
        article += timestamp;
        article += '</div>';
        article += '</div>';
    });

    $("#Det_" + wid).html(article);
}


function ShowDocSignatureDetail(wid) {
    $("#loadingPage").fadeIn();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Documents/SignatureDetail?documentid=' + wid,
        type: 'GET',
        dataType: 'json',
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        cache: false,
        success: function (data) {
            var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
            var vAccFeat = $.grep(veContractFeatures, function (n, i) {
                return (n.RowKey == "1" && n.Status == "ON");
            });
            if (vAccFeat.length > 0) {
                var vConfig = vAccFeat[0].Configuration;
                var vProvider = $(vConfig).find('Provider').text();
                if (vProvider == "Right Signature")
                    RightSignatureDocumentHistory(data);
                else if (vProvider == "Echo Sign")
                    EcoSignatureDocumentHistory(data);
                else if (vProvider == "Docu Sign")
                    DocuSignatureDocumentHistory(data);
            }
            $("#loadingPage").fadeOut();

            $("#docSignatureDetail").dialog("open");
            $("#docSignatureDetail").height("auto");
        },
        error: function (data) {
            $("#dvDocSignatureHist").empty();
            $("#loadingPage").fadeOut();
        }

    });

}
function ViewClausecomments(rkey) {
    $("#loadingPage").fadeIn();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/clause/clausecomment?objectid=' + rkey + '&commenttype=ContractClause&contractid=' + getParameterByName("ContractID"),
        type: 'GET',
        dataType: 'json',
        cache: false,
        async: false,
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        success: function (data) {
            $("#ViewCommnetlanguagecollection").empty();
            if (data.length > 0) {
                $(data).each(function (i, item) {
                    var vComment = '';
                    if (i < 5) {
                        vComment = '<li><span>&nbsp;</span>';
                    } else {
                        vComment = '<li class="hiddencomment"><span>&nbsp;</span>';
                    }
                    vComment += '<p>';
                    vComment += item.Comment;
                    vComment += '<P style="padding-top: 5px;"><small style="color: #ababab !important;font-size: 12px;">Posted By: ' + item.CreatedBy + ' on ' + moment(new Date(item.Timestamp)).format('Do MMM, h:mm A') + '</small></p>';
                    vComment += '</p></li>';
                    $("#ViewCommnetlanguagecollection").append(vComment);
                });

                $("#counetcomment" + rkey).html(data.length);
                $(".hiddencomment").css("display", "none");
                if (data.length > 5) {
                    $("#aCommentsMore").css("display", "");
                }
            }
            else {
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/clause/clausecomment?objectid=' + rkey + '&commenttype=UserAdded&contractid=' + getParameterByName("ContractID"),
                    type: 'GET',
                    dataType: 'json',
                    cache: false,
                    async: false,
                    headers: {
                        'eContracts-ApiKey': localStorage.APIKey
                    },
                    success: function (userdatadetail) {
                        $("#ViewCommnetlanguagecollection").empty();
                        if (userdatadetail.length > 0) {
                            $(userdatadetail).each(function (i, item) {
                                var vComment = '';
                                if (i < 5) {
                                    vComment = '<li><span>&nbsp;</span>';
                                } else {
                                    vComment = '<li class="hiddencomment"><span>&nbsp;</span>';
                                }
                                vComment += '<p>';
                                vComment += item.Comment;
                                vComment += '<P style="padding-top: 5px;"><small style="color: #ababab !important;font-size: 12px;">Posted By: ' + item.CreatedBy + ' on ' + moment(new Date(item.Timestamp)).format('Do MMM, h:mm A') + '</small></p>';
                                vComment += '</p></li>';
                                $("#ViewCommnetlanguagecollection").append(vComment);
                            });
                            usercommnetadded = true;
                            $("#counetcomment" + rkey).html(userdatadetail.length);
                            $(".hiddencomment").css("display", "none");
                            if (userdatadetail.length > 5) {
                                $("#aCommentsMore").css("display", "");
                            }
                        }
                        else {
                            usercommnetadded = true;
                            $("#ViewCommnetlanguagecollection").append("<div>No item found.</div>");
                        }
                    },
                    error: function (userdatadetail) {
                        usercommnetadded = true;
                        $("#ViewCommnetlanguagecollection").html("<div>No item found.</div>");
                    }
                });
            }
            //$("#cmtCount").text(data.length);
            $("#txtlanguagecommnet").val("");
            $("#divbuttonfunction").empty();
            var articalbutton = '<div><a href="javascript:void(0);" class="f_button_blue" onclick="addnewlanguage(\'' + rkey + '\')" >Post</a><a href="javascript:void(0);" onclick="cancelnewlanguage(\'' + rkey + '\')"> Clear</a></div>'
            $("#divbuttonfunction").append(articalbutton);
            $("#loadingPage").fadeOut();
            $("#addViewclanguaheCommnetpopup").dialog("option", "title", "Comment");
            $("#addViewclanguaheCommnetpopup").dialog("open");
        },
        error: function () {
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/clause/clausecomment?objectid=' + rkey + '&commenttype=UserAdded&contractid=' + getParameterByName("ContractID"),
                type: 'GET',
                dataType: 'json',
                cache: false,
                async: false,
                headers: {
                    'eContracts-ApiKey': localStorage.APIKey
                },
                success: function (userdata) {
                    $("#ViewCommnetlanguagecollection").empty();
                    if (userdata.length > 0) {
                        $(userdata).each(function (i, item) {
                            var vComment = '';
                            if (i < 5) {
                                vComment = '<li><span>&nbsp;</span>';
                            } else {
                                vComment = '<li class="hiddencomment"><span>&nbsp;</span>';
                            }
                            vComment += '<p>';
                            vComment += item.Comment;
                            vComment += '<P style="padding-top: 5px;"><small style="color: #ababab !important;font-size: 12px;">Posted By: ' + item.CreatedBy + ' on ' + moment(new Date(item.Timestamp)).format('Do MMM, h:mm A') + '</small></p>';
                            vComment += '</p></li>';
                            $("#ViewCommnetlanguagecollection").append(vComment);
                        });
                        usercommnetadded = true;
                        $("#counetcomment" + rkey).html(userdata.length);
                        $(".hiddencomment").css("display", "none");
                        if (userdata.length > 5) {
                            $("#aCommentsMore").css("display", "");
                        }
                    }
                    else {
                        usercommnetadded = true;
                        $("#ViewCommnetlanguagecollection").append("<div>No item found.</div>");
                    }
                    //$("#cmtCount").text(data.length);

                },
                error: function (userdata) {
                    $("#ViewCommnetlanguagecollection").html("<div>No item found.</div>");
                }
            });
            $("#txtlanguagecommnet").val("");
            $("#divbuttonfunction").empty();
            var articalbutton = '<div><a href="javascript:void(0);" class="f_button_blue" onclick="addnewlanguage(\'' + rkey + '\')" >Post</a><a href="javascript:void(0);" onclick="cancelnewlanguage(\'' + rkey + '\')"> Clear</a></div>'
            $("#divbuttonfunction").append(articalbutton);
            $("#loadingPage").fadeOut();
            $("#addViewclanguaheCommnetpopup").dialog("option", "title", "Comment");
            $("#addViewclanguaheCommnetpopup").dialog("open");
        }
    });
}

function getallcontracttypecomment(rkeycollection) {
    var rowkeysplit = rkeycollection;
    if (rowkeysplit.length > 0) {
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/clause/allcommnettypeclausecomment?commenttype=ContractClause',
            type: 'GET',
            dataType: 'json',
            cache: false,
            async: false,
            success: function (data) {
                var vAccFeat = $.grep(data, function (n, i) {
                    return (n.ContractID == getParameterByName("ContractID"));
                });
                if (vAccFeat.length > 0) {
                    $(rowkeysplit).each(function (i, item12) {
                        var vAccFeat12 = $.grep(vAccFeat, function (n, i) {
                            return (n.ObjectID == item12);
                        });
                        if (vAccFeat12.length > 0) {
                            $("#counetcomment" + item12).html(vAccFeat12.length);
                        }
                        else {
                            $("#counetcomment" + item12).html("0");
                        }
                    });
                }
                else {
                    $(rowkeysplit).each(function (i, item) {
                        $("#counetcomment" + item).html("0");
                    });
                }
            },
            error: function () {
                $(rowkeysplit).each(function (i, item) {
                    $("#counetcomment" + item).html("0");
                });
            }
        });
    }
}

function addnewlanguage(rkey) {
    if (requiredValidator('frmaddCommentLanguageText')) {
        $("#loadingPage").fadeIn();
        var typecomnet = "ContractClause";
        if (usercommnetadded) {
            typecomnet = "UserAdded";
        }
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/clause/clausecomment',
            type: 'POST',
            dataType: 'json',
            headers: {
                'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging
            },
            data: {
                ObjectID: rkey,
                Comment: $("#txtlanguagecommnet").val(),
                CommentType: typecomnet,
                CreatedBy: localStorage.UserName,
                ModifiedBy: localStorage.UserName,
                ContractID: getParameterByName("ContractID")
            },
            cache: false,
            success: function (data) {
                ViewClausecomments(rkey);
            },
            error: function () {
                $("#loadingPage").fadeOut();
                $("#txtlanguagecommnet").val("");
            },
            complete: function () {
                $("#loadingPage").fadeOut();
                $("#txtlanguagecommnet").val("");
            }
        });
    }
    else {
        $('.ui-button-green-text').parent().removeAttr('disabled');
    }
}

function cancelnewlanguage() {
    $("#txtlanguagecommnet").val("");
    $("#txtlanguagecommnet").focus();
}

function newDocumentChunk(DocumentID) {
    var tblContentControls = null;
    var formData = new FormData();
    var opmlFile = $('#docContract')[0];
    var vDocumentType = "";

    if (opmlFile.files.length > 0) {
        formData.append("opmlFile", opmlFile.files[0]);
    }
    if (overwritedocument) { //if overwrite is yes
        formData.append("OverWrite", "Yes");
    }
    formData.append("AccountID", localStorage.AccountID);
    formData.append("DocumentName", $("#txtDocumentNameCreate").val());
    formData.append("ContractID", vContractID);
    formData.append("FolderUrl", $('#lblFolderUrl').text());

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/chunkfile',
        type: 'POST',
        data: formData,
        contentType: false,
        headers: {
            'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName
        },
        processData: false,
        success: function (data) {
            //if ($("#ddlDocumentTemplate").attr("class").indexOf('validelement') >= 0) {
            //    setTimeout(funcMessageAfterDocGeneration, 10000);
            //}
            //else {
            $("#uploaddocumentprocess").css('display', 'none');
            $('.ui-button-green-text').parent().removeAttr('disabled');
            var vURL = encodeURI(data.DocumentUrl);
            if (documentview == null || documentview == "" || documentview == 'folder') {
                $("#ulDocument").prepend('<li class=" margin-bottom-5"><label id="FolderCreationMode" style="display:none;"></label><label id="DocumentID" style="display:none;">' + data.RowKey + '</label><label id="SentForSign" style="display:none;"></label><label id="DocumentName" style="display:none;">' + data.DocumentName + '</label><label id="ShareWorkflow" style="display:none;"></label><label id="ReviewWorkflow" style="display:none;"></label><label id="BusinessArea" style="display:none;"></label><label id="IsFinalized" style="display:none;">No</label><label id="IsPrimaryDoc" style="display:none;">No</label><input type="checkbox" id="' + data.RowKey + '" name="MultipleDocuments" class="Contribute" style="visibility:hidden;" onclick="checkMultipleDocuments(this);" value="' + data.RowKey + '"> <b title="New" style="cursor:pointer" id="' + data.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_green_another details_documentstatus"><img src="../Content/Images/status/new.png" class="margin-right-5">new</b><dd class="file-icon docx"></dd><a href="javascript:void(0);" onclick="ViewDocument(\'' + vURL + '\')"  title="' + data.DocumentName + '">' + data.DocumentName + '</a><img src="../Content/Images/new_item.png" alt="New" title="New"><span class="sub-text"> few seconds ago</span>&nbsp;<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuDocumentFinal showitem margin-left-5" onclick="FilterMenuOptions(this)"></li>');
            } else {
                $("#ulDocument").prepend('<li class=" margin-bottom-5"><label id="FolderCreationMode" style="display:none;"></label><label id="DocumentID" style="display:none;">' + data.RowKey + '</label><label id="SentForSign" style="display:none;"></label><label id="DocumentName" style="display:none;">' + data.DocumentName + '</label><label id="ShareWorkflow" style="display:none;"></label><label id="ReviewWorkflow" style="display:none;"></label><label id="BusinessArea" style="display:none;"></label><label id="IsFinalized" style="display:none;">No</label><label id="IsPrimaryDoc" style="display:none;">No</label><input type="checkbox" id="' + data.RowKey + '" name="MultipleDocuments" class="Contribute" style="visibility:hidden;" onclick="checkMultipleDocuments(this);" value="' + data.RowKey + '"> <b title="New" style="cursor:pointer" id="' + data.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_green_another details_documentstatus"><img src="../Content/Images/status/new.png" class="margin-right-5">new</b><dd class="file-icon docx"></dd><a href="javascript:void(0);" onclick="ViewDocument(\'' + vURL + '\')"  title="' + data.DocumentName + '">' + data.DocumentName + '</a><span class="sub-text"> few seconds ago</span>&nbsp;<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuDocumentFinal showitem margin-left-5" onclick="FilterMenuOptions(this)"><div class="documenturlclass" style="margin-left:0px"><label title="' + data.DocumentUrl + '"><img src="../Content/Images/icon/folder_open.png" style="margin-right: 5px;">' + data.DocumentUrl + '</label></div></li>');
            }

            //$("#ulDocument").empty();
            //$("#ulDocument").html('<img src="../Content/Images/icon/loading.gif"> Please wait...');              
            //if (documentview == null || documentview == "" || documentview == 'folder') {
            //    GetdocumentIsStandard(vContractID);
            //} else {
            //    DisplayDocument(documentview);
            //}
            //pendingStarted = false;
            //// GetContractPendingAction(true, "BindPeoples");
            //$("#hdnFolderDocumentView").text('');
            //$("#hdnShowAllTextValue").html('');
            //PrvFolderselection = '';
            ////Bind primary and pined document based on new feature
            ////if ($("#hdnnewdocumentfeature").text() == "Yes") {
            ////    CreateDocumentListPinView(vContractID);
            ////}              
            //}
            afterPost();
        },
        error: function (data) {
        }
    });
}

function newDocument(DocumentID) {
    var tblContentControls = null;
    var formData = new FormData();
    var opmlFile = $('#docContract')[0];
    var vDocumentType = "";

    if (opmlFile.files.length > 0) {
        formData.append("opmlFile", opmlFile.files[0]);
    }

    if (overwritedocument) { //if overwrite is yes
        formData.append("OverWrite", "Yes");
        formData.append("DuplicateDocId", DuplicateDocId);
    }

    var contractformappend = "DocumentID=" + DocumentID;
    contractformappend += "&~DocDescription=" + $("#txtDescriptionDoc").val();

    var arrAuthorCreate = $("#ddlAuthorCreate").val();

    var vAuthorCreate = '';
    $(arrAuthorCreate).each(function (i, item) {
        if (vAuthorCreate == '') {
            vAuthorCreate = item;
        }
        else {
            vAuthorCreate += "; " + item;
        }
    });
    contractformappend += "&~DocumentAuthor=" + vAuthorCreate;
    contractformappend += "&~DocumentLanguage=" + $("#txtDocumentLanguageCreate").val();
    contractformappend += "&~HardCopyPhysicalLocation=" + $("#txtHardCopyPhysicalLocationCreate").val();
    contractformappend += "&~ContractID=" + getParameterByName('ContractID');
    contractformappend += "&~ContractTitle=" + $("#lblCTitleDoc").text();

    if ($("#ddlDocumentTypeCreate").val() != "0") {
        vDocumentType = $("#ddlDocumentTypeCreate").val();
    }
    contractformappend += "&~DocumentType=" + vDocumentType;
    contractformappend += "&~Counterparty=" + $("#lblCounterparty").text();
    if ($("#trTemplate").css('display') == 'none') {
        contractformappend += "&~DocumentName=";
        if ($('#fileUploadOCR').prop('checked') == true) {
            contractformappend += "&~MakeReadable=Yes";
            contractformappend += "&~OcrOutputFormat=.pdf";
        } else {
            contractformappend += "&~MakeReadable=No";
            contractformappend += "&~OcrOutputFormat=NA";
        }
    }
    else {
        contractformappend += "&~TemplateName=" + $("#ddlDocumentTemplate").find('option:selected').text();
        contractformappend += "&~DocumentName=" + $("#txtDocumentNameCreate").val();
        contractformappend += "&~MakeReadable=No";
        contractformappend += "&~OcrOutputFormat=NA";
        tblContentControls = $("#formtblContentControls *").serializeArray();

        //$.ajax({
        //    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/automation',
        //    type: 'POST',
        //    dataType: 'json',
        //    headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
        //    async: false,
        //    data: {
        //        TemplateName: "",
        //        DocumentName: $("#txtDocumentNameCreate").val(),
        //        ContractID: getParameterByName('ContractID'),
        //        Status: "",
        //        SendBy: "",
        //        RemindLater: "",
        //    },
        //    cache: false,
        //    success: function (rowKey) {
        //        formData.append("DocumentInAutomation", rowKey);
        //        if (!$.isEmptyObject(arrRelatedContracts)) {
        //            CreateRelatedContracttemplate();
        //        }
        //    },
        //    error: function (rowKey) {

        //    }
        //});
    }
    if ($("input:radio[name=IsFinalized]:checked").val() == "Yes") {
        contractformappend += "&~IsFinalized=Yes";
    } else {
        contractformappend += "&~IsFinalized=No";
    }

    if ($("input:radio[name=IsStandard]:checked").val() == "Yes") {
        contractformappend += "&~IsStandard=Yes";
    } else {
        contractformappend += "&~IsStandard=No";
    }
    //@*enh 528*@
    //enh 528
    if ($("input:radio[name=IsPrimary]:checked").val() == "Yes") {
        contractformappend += "&~IsPrimary=Yes";
    } else {
        contractformappend += "&~IsPrimary=No";
    }
    //enh 528
    if ($("#ddlDocumentStatus").val() != "0") {
        contractformappend += "&~DocumentStatus=" + $("#ddlDocumentStatus").val();
    }
    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
    var vDocLibFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "14" && n.Status == "ON");
    });
    if (vDocLibFeat.length > 0) {
        contractformappend += "&~DocumentLibraryName=" + $('#hdContAreaDocLibName').val();
    }
    else {
        contractformappend += "&~DocumentLibraryName=Contract Documents";
    }
    var contractiledetails = $("#lblCTitleDoc").text();
    contractformappend += "&~LocationURL=" + $('#lblFolderUrl').text();
    if ($("#ddlContracts").find('option:selected').val() != "0") {
        //if ($('#txtNewFolderName').val() != "") {

        //}
    }
    else {
        contractformappend += "&~FolderName=";
    }
    contractformappend += "&~NewFolderName=" + $('#txtNewFolderName').val().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').replace(/[\*\|\,\"\:\<\>\[\}\{\}\'\(\)\&\#\%\.\-\!]/g, '').replace(/\//g, '').replace(/\s\s+/g, " ").trim();

    if ($("input:radio[name=rad_Copy]:checked").val() == "Library") {
        contractformappend += "&~DocumentLocation=Office 365 Document Library";
    } else {
        contractformappend += "&~DocumentLocation=Office 365 Document Library & eContracts Cloud";
    }
    contractformappend += "&~CreatedBy=" + localStorage.UserName;
    contractformappend += "&~ModifiedBy=" + localStorage.UserName;
    if (tblContentControls != null) {
        var tblContentControlslength = tblContentControls.length;
        for (var i = 0; i < tblContentControlslength; i++) {
            var checkingvar = "&~" + tblContentControls[i].name + "=";
            if (contractformappend.indexOf(checkingvar) > 0) {
                var nextvar = contractformappend.substring(contractformappend.indexOf(checkingvar) + 1, contractformappend.length);
                var valuevar = contractformappend.substring(contractformappend.indexOf(checkingvar), nextvar.indexOf("&~") + contractformappend.indexOf(checkingvar) + 1);
                contractformappend = contractformappend.replace(valuevar, "&~" + tblContentControls[i].name + "=" + tblContentControls[i].value)
                nextvar = "";
                valuevar = "";
                checkingvar = "";
            }
            else {
                contractformappend += "&~" + tblContentControls[i].name + "=" + tblContentControls[i].value;
            }
        }
    }
    var result = "";
    $("#formtblContentControls .fieldphonecontrol").each(function (index) {
        if ($(this).val() != null && $(this).val() != "") {
            var name = $(this)[0].id.split('_')[0];
            if ($(this).intlTelInput("getNumber", intlTelInputUtils.numberFormat.INTERNATIONAL).indexOf('+') > -1) {
                var value = $(this).intlTelInput("getSelectedCountryData").iso2 + "," + $(this).intlTelInput("getSelectedCountryData").dialCode + ", " + $(this).intlTelInput("getNumber", intlTelInputUtils.numberFormat.INTERNATIONAL).substr(1);
                result = result + "&~" + name + "=" + value;
            }
            else {
                var value = $(this).intlTelInput("getSelectedCountryData").iso2 + "," + $(this).intlTelInput("getSelectedCountryData").dialCode + "," + $(this).intlTelInput("getNumber", intlTelInputUtils.numberFormat.INTERNATIONAL);
                result = result + "&~" + name + "=" + value;
            }
        }
        else {
            var name = $(this)[0].id.split('_')[0];
            var value = "";
            result = result + "&~" + name + "=" + value;
        }
    });
    contractformappend += result;

    formData.append("AccountID", localStorage.AccountID);
    var splitcontractformappend = contractformappend.split('&~');

    $(splitcontractformappend).each(function (i, item) {
        var splititem = item.split('=');
        formData.append(splititem[0].trim(), splititem[1]);
    });
    splitcontractformappend = [];
    contractformappend = '';
    if ($("#txtBusinessArea").val() != "") {
        formData.append("BusinessArea", $("#txtBusinessArea").val().trim());
    } else {
        formData.append("BusinessArea", $("#lblBusinessArea").text().trim());
    }
    formData.append("BusinessAreaPath", $("#lblBusinessAreaPath").text());
    formData.append("ContractArea", $("#lblContractArea").text().trim());
    formData.append("ContractAreaAdministrators", $("#lblContractAreaAdmins").text().trim());
    formData.append("BusinessAreaOwners", $("#lblBusinessAreaOwners").text().trim());

    formData.append("ValidFrom", $.datepicker.formatDate('mm/dd/yy', $("#dtValidFrom").datepicker('getDate')));
    formData.append("ValidTill", $.datepicker.formatDate('mm/dd/yy', $("#dtValidTill").datepicker('getDate')));
    formData.append("Reminder1", $("#txtReminder1New").val());
    formData.append("Reminder1Condition", $("#ddlReminder1New").find('option:selected').text());
    formData.append("Reminder2", $("#txtReminder2New").val());
    formData.append("Reminder2Condition", $("#ddlReminder2New").find('option:selected').text());
    formData.append("Reminder3", $("#txtReminder3New").val());
    formData.append("Reminder3Condition", $("#ddlReminder3New").find('option:selected').text());
    formData.append("CreatingFromContractForm", "No");

    var arrSendReminderTo = $("#ddlDocRemindTo").val();

    var vSendReminderTo = '';
    $(arrSendReminderTo).each(function (i, item) {
        if (vSendReminderTo == '') {
            vSendReminderTo = item;
        }
        else {
            vSendReminderTo += "; " + item;
        }
    });
    formData.append("SendReminderTo", vSendReminderTo);
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/uploaddocument',
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        headers: {
            'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName, 'RefreshToken': localStorage.RefreshToken
        },
        processData: false,
        success: function (data) {
            //if ($("#ddlDocumentTemplate").attr("class").indexOf('validelement') >= 0) {
            //    setTimeout(funcMessageAfterDocGeneration, 10000);
            //    overwritedocument = false;
            //    DuplicateDocId = false;
            //}
            //else {
            $("#uploaddocumentprocess").css('display', 'none');
            $('.ui-button-green-text').parent().removeAttr('disabled');

            //manoj
            if (data.IsOCRDoc == "Yes") {
                data.DocumentName = data.DocumentName.split('.').slice(0, -1).join('.') + ".pdf";
            }
            //manoj

            var vURL = encodeURI(data.DocumentUrl);
            var ext = data.DocumentName.split('.').pop();
            if ($("#ulDocument").html() == "No items found.") {
                $("#ulDocument").empty();
            }
            if (overwritedocument) { //if overwrite is yes
                var ulDocumentlist = $("#ulDocument li");
                if (ulDocumentlist.length > 0) {
                    var documentexist = $(ulDocumentlist).find("input[id=" + data.RowKey + "]");
                    if (documentexist.length > 0) {
                        $(ulDocumentlist).find("input[id=" + data.RowKey + "]").parent().remove();
                    }
                }
                overwritedocument = false;
                DuplicateDocId = false;
            } else {
                var documentCount = Number($("#lblDocumentsCount").html()) + 1;
                $("#lblDocumentsCount").text(documentCount);
            }
            if (documentview == null || documentview == "" || documentview == 'folder') {
                if (data.CreationMode == "Template") {
                    $("#ulDocument").prepend('<li class=" margin-bottom-5" active=' + data.IsActive + '><label id="FolderCreationMode" style="display:none;"></label><label id="DocumentID" style="display:none;">' + data.RowKey + '</label><label id="SentForSign" style="display:none;"></label><label id="DocumentName" style="display:none;">' + data.DocumentName + '</label><label id="ShareWorkflow" style="display:none;"></label><label id="ReviewWorkflow" style="display:none;"></label><label id="BusinessArea" style="display:none;"></label><label id="IsFinalized" style="display:none;">No</label><label id="IsPrimaryDoc" style="display:none;">No</label>  <input type="checkbox" id="' + data.RowKey + '" name="MultipleDocuments" class="Contribute" style="visibility:hidden;" onclick="checkMultipleDocuments(this);" value="' + data.RowKey + '"><b title="New" style="cursor:pointer" id="' + data.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_green_another details_documentstatus"><img src="../Content/Images/status/new.png" class="margin-right-5">new</b><dd class="file-icon ' + ext + '"></dd><a href="javascript:void(0);" onclick="ViewDocument(\'' + vURL + '\')"  title="' + data.DocumentName + '" style="pointer-events: none;">' + data.DocumentName + '</a><img src="../Content/Images/new_item.png" alt="New" title="New"><span class="sub-text"> few seconds ago</span>&nbsp;</li>');//<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuDocumentFinal showitem margin-left-5">
                } else {
                    $("#ulDocument").prepend('<li class=" margin-bottom-5" active=' + data.IsActive + '><label id="FolderCreationMode" style="display:none;"></label><label id="DocumentID" style="display:none;">' + data.RowKey + '</label><label id="SentForSign" style="display:none;"></label><label id="DocumentName" style="display:none;">' + data.DocumentName + '</label><label id="ShareWorkflow" style="display:none;"></label><label id="ReviewWorkflow" style="display:none;"></label><label id="BusinessArea" style="display:none;"></label><label id="IsFinalized" style="display:none;">No</label><label id="IsPrimaryDoc" style="display:none;">No</label>  <input type="checkbox" id="' + data.RowKey + '" name="MultipleDocuments" class="Contribute" style="visibility:hidden;" onclick="checkMultipleDocuments(this);" value="' + data.RowKey + '"><b title="New" style="cursor:pointer" id="' + data.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_green_another details_documentstatus"><img src="../Content/Images/status/new.png" class="margin-right-5">new</b><dd class="file-icon ' + ext + '"></dd><a href="javascript:void(0);" onclick="ViewDocument(\'' + vURL + '\')"  title="' + data.DocumentName + '">' + data.DocumentName + '</a><img src="../Content/Images/new_item.png" alt="New" title="New"><span class="sub-text"> few seconds ago</span>&nbsp;</li>');//<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuDocumentFinal showitem margin-left-5">
                }
            } else {
                if (data.CreationMode == "Template") {
                    $("#ulDocument").prepend('<li class=" margin-bottom-5" active=' + data.IsActive + '><label id="FolderCreationMode" style="display:none;"></label><label id="DocumentID" style="display:none;">' + data.RowKey + '</label><label id="SentForSign" style="display:none;"></label><label id="DocumentName" style="display:none;">' + data.DocumentName + '</label><label id="ShareWorkflow" style="display:none;"></label><label id="ReviewWorkflow" style="display:none;"></label><label id="BusinessArea" style="display:none;"></label><label id="IsFinalized" style="display:none;">No</label><label id="IsPrimaryDoc" style="display:none;">No</label>  <input type="checkbox" id="' + data.RowKey + '" name="MultipleDocuments" class="Contribute" style="visibility:hidden;" onclick="checkMultipleDocuments(this);" value="' + data.RowKey + '"><b title="New" style="cursor:pointer" id="' + data.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_green_another details_documentstatus"><img src="../Content/Images/status/new.png" class="margin-right-5">new</b><dd class="file-icon ' + ext + '"></dd><a href="javascript:void(0);" onclick="ViewDocument(\'' + vURL + '\')"  title="' + data.DocumentName + '" style="pointer-events: none;">' + data.DocumentName + '</a><span class="sub-text"> few seconds ago</span>&nbsp;<div class="documenturlclass" style="margin-left:0px"><label title="' + data.DocumentUrl + '"><img src="../Content/Images/icon/folder_open.png" style="margin-right: 5px;">' + data.DocumentUrl + '</label></div></li>');//<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuDocumentFinal showitem margin-left-5">
                } else {
                    $("#ulDocument").prepend('<li class=" margin-bottom-5" active=' + data.IsActive + '><label id="FolderCreationMode" style="display:none;"></label><label id="DocumentID" style="display:none;">' + data.RowKey + '</label><label id="SentForSign" style="display:none;"></label><label id="DocumentName" style="display:none;">' + data.DocumentName + '</label><label id="ShareWorkflow" style="display:none;"></label><label id="ReviewWorkflow" style="display:none;"></label><label id="BusinessArea" style="display:none;"></label><label id="IsFinalized" style="display:none;">No</label><label id="IsPrimaryDoc" style="display:none;">No</label>  <input type="checkbox" id="' + data.RowKey + '" name="MultipleDocuments" class="Contribute" style="visibility:hidden;" onclick="checkMultipleDocuments(this);" value="' + data.RowKey + '"><b title="New" style="cursor:pointer" id="' + data.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_green_another details_documentstatus"><img src="../Content/Images/status/new.png" class="margin-right-5">new</b><dd class="file-icon ' + ext + '"></dd><a href="javascript:void(0);" onclick="ViewDocument(\'' + vURL + '\')"  title="' + data.DocumentName + '">' + data.DocumentName + '</a><span class="sub-text"> few seconds ago</span>&nbsp;<div class="documenturlclass" style="margin-left:0px"><label title="' + data.DocumentUrl + '"><img src="../Content/Images/icon/folder_open.png" style="margin-right: 5px;">' + data.DocumentUrl + '</label></div></li>');//<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuDocumentFinal showitem margin-left-5">
                }
            }
            $("#general-notification").css("visibility", "visible");
            $("#general-notification").html("Document uploaded successfully. All the options to perform action on document will be enabled once it is ready for use.");
            //setTimeout(function () { $("#general-notification").css("visibility", "hidden"); }, 10000);
            clearTimeout(cleartimevalue);
            cleartimevalue = setTimeout(refreshdocuemnt, 10000);
            //}
            afterPost();
            icontractdetails();
        },
        error: function (data) {
        },
        complete: function (data) {
            $("#uploaddocumentprocess").css('display', 'none');
        }

    });
}

function ViewDocument(docurl) {
    if (docurl != '') {
        $("#" + id).replaceWith($("#" + id).val('').clone(true));
        var srcurl = docurl;
        if (docurl.indexOf(".doc") >= 0 || docurl.indexOf(".ppt") >= 0 || docurl.indexOf(".xls") >= 0 || docurl.indexOf(".dotx") >= 0) {
            srcurl = "https://view.officeapps.live.com/op/embed.aspx?src=" + docurl + "&wdStartOn=1";
        }
        window.open(srcurl);
    }
}

function Loading_ActiveDocument() {
    if ($("#ulDocument").html() !== "No items found." && $("#ulDocument").find("[active='No']").length > 0) {
        $("#ulDocument").find("[active='No']").each(function () {
            //alert($(this).find("#DocumentID").text())
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?documentid=' + $(this).find("#DocumentID").text(),
                type: 'GET',
                dataType: 'json',
                "Content-Type": "application/json",
                headers: {
                    'eContracts-ApiKey': localStorage.APIKey
                },
                cache: false,
                success: function (data) {
                    if (data.IsActive == "Yes") {
                        //var ext = data.DocumentName.split('.').pop();
                        //var vv = moment(new Date(data.Modified));
                        //var vTime = vv.fromNow();
                        //vTime = vv.from(new Date());

                        //$("#ulDocument").find("[active='No']").html("");
                        //$("#ulDocument").find("[active='No']").html('<label id="FolderCreationMode" style="display:none;"></label><label id="DocumentID" style="display:none;">' + data.RowKey + '</label><label id="SentForSign" style="display:none;"></label><label id="DocumentName" style="display:none;">' + data.DocumentName + '</label><label id="ShareWorkflow" style="display:none;"></label><label id="ReviewWorkflow" style="display:none;"></label><label id="BusinessArea" style="display:none;"></label><label id="IsFinalized" style="display:none;">No</label><label id="IsPrimaryDoc" style="display:none;">No</label><input type="checkbox" id="' + data.RowKey + '" name="MultipleDocuments" class="Contribute" onclick="checkMultipleDocuments(this);" value="' + data.RowKey + '"> <b title="New" style="cursor:pointer" id="' + data.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_green_another details_documentstatus"><img src="../Content/Images/status/new.png" class="margin-right-5">new</b><dd class="file-icon ' + ext + '"></dd><a href="' + data.DocumentUrl + '"  target="_blank" title="' + data.DocumentName + '">' + data.DocumentName + '</a><img src="../Content/Images/new_item.png" alt="New" title="New"><span class="sub-text">' + vTime + '</span>&nbsp;<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuDocumentFinal showitem margin-left-5">');
                        //$(".openmenuDocumentFinal").contextMenu({ menu: 'dropdownMenuMarkFinal', leftButton: true }, function (action, el, pos) { contextMenuDocument(action, el.parent("li"), pos); });
                        //$("#ulDocument").find("[active='No']").removeAttr("active");
                        $.ajax({
                            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/documentmetadata?documentid=' + data.RowKey + '&columnanmeandvalue=IsActive~',
                            type: 'PUT',
                            dataType: 'json',
                            headers: {
                                'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName
                            },
                            contentType: false,
                            cache: false,
                            success: function (result) {
                                $("#uploaddocumentprocess").css('display', 'none');
                                $('.ui-button-green-text').parent().removeAttr('disabled');

                                $("#ulDocument").empty();
                                //$("#ulDocument").html('<img src="../Content/Images/icon/loading.gif"> Please wait...');
                                //manoj
                                if (documentview == null || documentview == "" || documentview == 'folder') {
                                    GetdocumentIsStandard(vContractID);
                                } else {
                                    DisplayDocument(documentview);
                                }
                                pendingStarted = false;
                                // GetContractPendingAction(true, "BindPeoples");
                                $("#hdnFolderDocumentView").text('');
                                $("#hdnShowAllTextValue").html('');
                                PrvFolderselection = '';
                                //Bind primary and pined document based on new feature
                                if ($("#hdnnewdocumentfeature").text() == "Yes") {
                                    CreateDocumentListPinView(vContractID);
                                }

                                $("#ulDocument").find("[active='No']").removeAttr("active");
                            }
                        });
                    }
                },
                error: function () {
                }
            });
        });
    }
}
function Loading_init1() {
    setTimeout('Loading_Layout_trigger1()', 10000);
}
function refreshdocuemnt() {
    if (documentview == null || documentview == "" || documentview == 'folder') {
        if ($('#showAll').text() != null && $('#showAll').text() != "" && typeof ($('#showAll').text()) != "undefined") {
            var selectedfoldervalue = $('#showAll').find("a");
            var textvalueselected = $(selectedfoldervalue)[$(selectedfoldervalue).length - 1].textContent;
            var idvalueselected = $(selectedfoldervalue)[$(selectedfoldervalue).length - 1].id;
            var parentdocumentdetails = {
                id: idvalueselected, text: textvalueselected
            };
            showfolderdocuments(parentdocumentdetails);
        }
        else {
            BindDocument(vContractID);
        }
    } else {
        DisplayDocument(documentview);
    }
}

$('#addEditDocument').on('dialogclose', function (event) {
    $("#txtSearchDocument").val("");
});

function ClearSearchKeyword() {
    $("#txtSearchDocument").val("");
    BindDocumentNotTagToContract();

}

window.setInterval(function () {
    Loading_ActiveDocument()
}, 10000);

//ENH476- Related Contracts - UI Change Start
function showDocumentsForRelatedContracts(ContractID, contraItem) {
    $("#tblDetailsMetadataRelatedContract").html('');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?contractid=' + ContractID,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        success: function (documentcollection) {
            var data = "";
            if (documentcollection != null && documentcollection != "undefined" && documentcollection != "") {
                var data = $.grep(documentcollection, function (n, i) {
                    return (n.IsFolder != "Yes");
                });
            }
            if (data.length != 0) {
                var NotActiveStatusDocument = $.grep(data, function (n, i) {
                    return (n.IsActive == "No");
                });
                var DefaultDocLength = ($("#hdnnewdocumentfeature").text() == "Yes") ? 20 : 10;
                articleDocumentMileStone = "";
                var vGetTime = moment(new Date()).utc();
                //var vGetTime = new Date();
                //$.ajax({
                //    url: '/Documents/GetTime',
                //    type: 'GET',
                //    dataType: 'json',
                //    cache: false,
                //    success: function (data) {
                //        var jsObject = JSON.parse(data);
                //        vGetTime = new Date(jsObject);
                //    }
                //});

                var count = 0;
                var vPermission = $("#hdnPermission").val();

                var settings = {
                    pattern: /\.[0-9a-z]+$/i,
                    knownFileTypes: ['pdf', 'png', 'jpg', 'gif', 'bmp', 'doc', 'xls', 'ppt', 'docx', 'xlsx', 'txt', 'pptx', 'zip', 'rar', 'gzip', 'arj', 'wav', 'mp3', 'aif', 'aiff', 'm4a', 'ogg', 'wma', 'psd', 'ai', 'swf', 'fla', 'css', 'js', 'avi', 'mov', 'wmv', 'dotx'],
                    WopiFrameFileTypes: ['doc', 'xls', 'ppt', 'docx', 'xlsx', 'pptx', 'dotx']
                };
                var datalenght = data.length;

                var vTitle = '';
                var article = '';
                var articleSubFolder = '';
                if (datalenght > 0) {
                    for (var vi = 0; vi < datalenght; vi++) {
                        if (data[vi].ContractArea != "") {
                            docdefaultview(data[vi].ContractArea);
                            break;
                        }
                    }
                }
                var DocDefaultView = "";
                if (thisDocumentLibrarySettings != '' && thisDocumentLibrarySettings != 'undefined' && typeof thisDocumentLibrarySettings != "undefined") {
                    DocDefaultView = thisDocumentLibrarySettings.DocDefaultView;
                    DocVersion = thisDocumentLibrarySettings.DocVersion;
                }

                for (var i = 0; i < datalenght; i++) {
                    var item = data[i];
                    var vv = moment(new Date(item.Modified));
                    var vTime = vv.fromNow();
                    vTime = vv.from(vGetTime);

                    count++
                    if (item.IsFolder == "True") {
                        if (vTime == "Invalid date") {
                            articleSubFolder += '<li class=" margin-bottom-5"><b title="Folder" style="margin-left: 21px; background-color: #888; " class="status_blue details_documentstatus">Folder</b><img src="../Content/Images/icon/folder.png" style="margin-top: -5px; margin-right: 7px;"><a style="display: inline-block; margin: 3px 0px 0px 0px;" href="javascript:void(0)" id=' + item.RowKey + ' onclick="javascript:showfolderdocuments(this);">' + item.DocumentName + '</a><span class="sub-text"> few seconds ago</span>';
                        }
                        else {
                            articleSubFolder += '<li class=" margin-bottom-5"><b title="Folder" style="margin-left: 21px; background-color: #888; " class="status_blue details_documentstatus">Folder</b><img src="../Content/Images/icon/folder.png" style="margin-top: -5px; margin-right: 7px;"><a style="display: inline-block; margin: 3px 0px 0px 0px;" href="javascript:void(0)" id=' + item.RowKey + ' onclick="javascript:showfolderdocuments(this);">' + item.DocumentName + '</a><span class="sub-text"> ' + vTime + '</span>';
                        }
                        articleSubFolder += '<label id="DocumentID" style="display:none;">' + item.RowKey + '</label>';
                        articleSubFolder += '<label id="FolderCreationMode" style="display:none;">' + item.CreationMode + '</label>';
                        articleSubFolder += '<label id="DocumentName" style="display:none;">' + item.DocumentName + '</label>';
                        if (contraItem.Status != "Expired" && contraItem.Status != "Cancelled" && contraItem.Status != "Replaced" && contraItem.Status != "Archived" && contraItem.Permission != "View" && contraItem.Permission != '' && contraItem.Permission != null) {
                            articleSubFolder += '&nbsp;<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuFolder margin-left-5">';
                        }
                        articleSubFolder += '</li>';
                    } else {
                        var vClass = "openmenuDocumentFinal";
                        var vDocIcon = "";// '<img src="../Content/Images/Doc_draft.png" class="doc_type margin-left-5" alt="Draft Document" title="Draft Document" />';
                        var vPrimDocIcon = '';
                        if (item.IsFinalized == "Yes") {
                            vClass = "openmenuDocument";
                            vDocIcon = '<img src="../Content/Images/icon/final_doc.png" class="doc_type margin-left-5" alt="Finalized Document" title="Finalized Document" />';
                            if (item.CreationMode == "Amendment") {
                                vClass = "openmenuAmendmentDocumentFinal";
                                vDocIcon += '<img src="../Content/Images/amendments.png" style="height:16px; width:16px;" class="doc_type margin-left-5" alt="Amendment Document" title="Amendment Document" />';
                            }
                        } else if (item.CreationMode == "Amendment") {
                            vClass = "openmenuAmendmentDocument";
                            vDocIcon = '<img src="../Content/Images/amendments.png" style="height:16px; width:16px;" class="doc_type margin-left-5" alt="Amendment Document" title="Amendment Document" />';
                        }

                        if (item.IsPined == "Yes" && item.IsPrimary != "Yes") {
                            vClass += "UnPin";
                        }
                        if (item.IsPrimary == "Yes") {
                            vPrimDocIcon = '<img src="../Content/Images/primary_doc.png" class="doc_type margin-left-5" alt="Primary Document" title="Primary Document" />';
                            vClass += "UnPin" + " hideItem primarydocument";
                        } else {
                            vClass += " showitem";
                        }

                        if (item.DocumentStatus == "Expired" || contraItem.IsDraft == "Yes" || contraItem.Status == "Expired"
                            || contraItem.Status == "Cancelled" || contraItem.Status == "Replaced" || contraItem.Status == "Archived") {
                            vClass = "openmenuExpiredDocument";
                        }

                        vURLDoc = encodeURI(item.DocumentUrl);
                        var ext = vURLDoc.match(settings.pattern);
                        var vFileType = '<dd class="file-icon none"></dd>';
                        if (ext != null) {
                            if (ext.length > 0) {
                                ext = ext[0].slice(1);
                            }
                            if (DocDefaultView == "WordClient") {
                                if (vURLDoc.toLowerCase().indexOf(localStorage.SPHostUrl.toLowerCase()) >= 0) {
                                    if (jQuery.inArray(ext, settings.WopiFrameFileTypes) > -1) {
                                        vRawURLDoc = encodeURIComponent(item.DocumentUrl);
                                        vURLDoc = localStorage.SPHostUrl + "/_layouts/WopiFrame.aspx?sourcedoc=" + vRawURLDoc + "&action=default";
                                    } else {
                                        vRawURLDoc = "";
                                    }
                                }
                            }
                            if (jQuery.inArray(ext.toLowerCase(), settings.knownFileTypes) > -1) {
                                vFileType = '<dd class="file-icon ' + ext + '"></dd>';
                            }
                        }

                        if (count <= DefaultDocLength)
                            article += '<li class=" margin-bottom-5" active=' + item.IsActive + '>';
                        else
                            article += '<li class="ShowMoreDocuments margin-bottom-5" style="display:none;">';

                        article += '<label id="FolderCreationMode" style="display:none;">' + item.CreationMode + '</label>';
                        article += '<label id="DocumentID" style="display:none;">' + item.RowKey + '</label>';
                        article += '<label id="SentForSign" style="display:none;">' + item.SentForSign + '</label>';
                        article += '<label id="DocumentName" style="display:none;">' + item.DocumentName + '</label>';
                        article += '<label id="ShareWorkflow" style="display:none;">' + item.ShareWorkflow + '</label>';
                        article += '<label id="ReviewWorkflow" style="display:none;">' + item.ReviewWorkflow + '</label>';
                        article += '<label id="BusinessArea" style="display:none;">' + item.BusinessArea + '</label>';
                        article += '<label id="IsFinalized" style="display:none;">' + item.IsFinalized + '</label>';
                        var primarydocchecking = (item.IsPrimary != null && item.IsPrimary != "") ? item.IsPrimary : "No";
                        article += '<label id="IsPrimaryDoc" style="display:none;">' + primarydocchecking + '</label>';

                        if (item.CreationMode == "Amendment") {
                            article += '<label id="AmendmentID" style="display:none;">' + item.AmendmentID + '</label>';
                        }
                        if (item.IsActive != 'No') {
                            //article += '<input type="checkbox" id="' + item.RowKey + '" name="MultipleDocuments" class="Contribute" onclick="checkMultipleDocuments(this);" value=' + item.RowKey + ' /> ';
                        } else {
                            // article += '<input type="checkbox" id="' + item.RowKey + '" name="MultipleDocuments" class="Contribute" style="visibility:hidden;" onclick="checkMultipleDocuments(this);" value=' + item.RowKey + ' /> ';
                        }

                        switch (item.DocumentStatus) {
                            case "New":
                                article += '<b title="New" style="cursor:default" id="' + item.RowKey + '" class="status_green_another details_documentstatus"><img src="../Content/Images/status/new.png" class="margin-right-5" style="cursor:default">new</b>';
                                break;
                            case "Ready for Signature":
                                article += '<b title="Ready for Signature" style="cursor:default" id="' + item.RowKey + '" class="status_green details_documentstatus"><img src="../Content/Images/status/active.png" class="margin-right-5" style="cursor:default">sign</b>';
                                break;
                            case "Awaiting Signatures":
                                article += '<b title="Awaiting Signatures" style="cursor:default" id="' + item.RowKey + '" class="status_yellow details_documentstatus"><img src="../Content/Images/status/renew.png" class="margin-right-5" style="cursor:default">sign</b>';
                                break;
                            case "Active":
                                article += '<b title="Active" style="cursor:default" id="' + item.RowKey + '" class="status_green details_documentstatus"><img src="../Content/Images/status/active.png" class="margin-right-5" style="cursor:default">actv</b>';
                                break;
                            case "Signed":
                                article += '<b title="Signed" style="cursor:default" id="' + item.RowKey + '" class="status_blue details_documentstatus"><img src="../Content/Images/status/tick.png" class="margin-right-5" style="cursor:default">Sign</b>';
                                break;
                            case "Expired":
                                article += '<b title="Expired" style="cursor:default" id="' + item.RowKey + '" class="status_Gray details_documentstatus"><img src="../Content/Images/status/expried.png" class="margin-right-5" style="cursor:default">exp</b>';
                                break;
                            case "Awaiting Review":
                                article += '<b title="Awaiting Review" style="cursor:default" id="' + item.RowKey + '" class="status_yellow details_documentstatus"><img src="../Content/Images/status/renew.png" class="margin-right-5" style="cursor:default">Rev</b>';
                                break;
                            case "Reviewed":
                                article += '<b title="Reviewed" style="cursor:default" id="' + item.RowKey + '" class="status_blue details_documentstatus"><img src="../Content/Images/status/tick.png" class="margin-right-5" style="cursor:default">Rev</b>';
                                break;
                            case "In Negotiation":
                                article += '<b title="In Negotiation" style="cursor:default" id="' + item.RowKey + '" class="status_yellow details_documentstatus"><img src="../Content/Images/status/renew.png" class="margin-right-5" style="cursor:default">nego</b>';
                                break;
                            case "Negotiation Complete":
                                article += '<b title="Negotiation Complete" style="cursor:default" id="' + item.RowKey + '" class="status_blue details_documentstatus"><img src="../Content/Images/status/tick.png" class="margin-right-5" style="cursor:default">nego</b>';
                                break;
                        }
                        vTitle = item.DocumentName;
                        if (vTitle.length > 61) {
                            vTitle = vTitle.substring(0, 60) + '...';
                        }
                        if (item.IsActive == "No") {
                            if (item.CreationMode == "Template") {
                                article += vFileType + '<a data-value="' + encodeURI(item.DocumentUrl) + '" href="javascript:void(0);" title="' + item.DocumentName + '" onclick="ViewDocument(\'' + encodeURI(item.DocumentUrl) + '\')" style="pointer-events: none;" >' + item.DocumentName + '</a><img src="../Content/Images/new_item.png" alt="New" title="New">';
                            } else {
                                article += vFileType + '<a data-value="' + encodeURI(item.DocumentUrl) + '" href="javascript:void(0);" title="' + item.DocumentName + '" onclick="ViewDocument(\'' + encodeURI(item.DocumentUrl) + '\')" >' + item.DocumentName + '</a><img src="../Content/Images/new_item.png" alt="New" title="New">';
                            }
                        } else {
                            if (vRawURLDoc != "") {
                                if (DocDefaultView == "WordClient") {
                                    article += vFileType + '<a href="#" seqe = "' + vRawURLDoc + '" onclick="viewdocinword(\'' + vRawURLDoc + '\')" title="' + item.DocumentName + '">' + vTitle + '</a>';
                                } else {
                                    article += vFileType + '<a href="javascript:void(0);" data-value="' + encodeURIComponent(item.DocumentUrl) + '"   onclick="Opendocinbrowser(\'' + encodeURIComponent(item.DocumentUrl) + '\')"  title="' + item.DocumentName + '">' + vTitle + '</a>';
                                }
                            } else {
                                article += vFileType + '<a href="javascript:void(0);" data-value="' + encodeURIComponent(item.DocumentUrl) + '"  onclick="Opendocinbrowser(\'' + encodeURIComponent(item.DocumentUrl) + '\')"  title="' + item.DocumentName + '">' + vTitle + '</a>';
                            }
                        }

                        if (vTime == "Invalid date") {
                            article += '<span class="sub-text"> few seconds ago</span>';
                        }
                        else {
                            article += '<span class="sub-text"> ' + vTime + '</span>';
                        }
                        article += '';
                        article += '';
                        if (item.IsActive != "No") {
                            article += vPrimDocIcon + vDocIcon + '&nbsp';
                        } else {
                            article += vPrimDocIcon + vDocIcon + '&nbsp';
                        }
                        if (documentview != 'folder' && documentview != "" && documentview != null) {
                            var the_arr = item.DocumentUrl.replace(localStorage.SPHostUrl + "/", "").split('/');
                            the_arr.pop();
                            var changedUrl = the_arr.join('/');
                            article += '<div class="documenturlclass" style="margin-left:0px"><label title="' + changedUrl + '"><img src="../Content/Images/icon/folder_open.png" style="margin-right: 5px;">' + changedUrl + '</label></div>'
                        }
                        article += '</li>';
                    }
                }
                $("#tblDetailsMetadataRelatedContract").html(articleSubFolder + article);
            } else {
                $("#tblDetailsMetadataRelatedContract").html("No items found.");
            }


        },
        error:
            function (data) {
                if (data.status == 404) {
                    $("#tblDetailsMetadataRelatedContract").html("No items found.");
                }
                $("#loadingPage").fadeOut();
            },
        complete: function () {
            $("#loadingPage").fadeOut();
            $('#dialogSummaryForRelatedContract').dialog('open');
        }
    });
}
//ENH476- Related Contracts - UI Change End


//manoj
function bulkdocumentManageupload() {
    if (requiredValidator('formManageBulkControls', false)) {
        $('#tabBulkUpload').removeClass('form-active');
        //holderManagebulk.ondragover = function (e) {
        //    return false;
        //}
        //holderManagebulk.ondragend = function () {
        //    return false;
        //}
        //holderManagebulk.ondragleave = function () {
        //    return false;
        //}
        //holderManagebulk.ondrop = function (ev) {
        //    return false;
        //}
        var createdParentFolder = false;
        document.getElementById("tblManageBulkControls").style.pointerEvents = "none";
        $("#tblManageBulkControls tbody").find("tr").each(function (tblmanage) {
            var Row_id = this.id.split(/[_ ]+/).pop();
            $('#idLoading' + Row_id).css('display', '');
            $('#idLoadingstart' + Row_id).css('display', 'none');
            $('#idLoadingcomplete' + Row_id).css('display', 'none');
        });
        //$('#btnManageBulkUploadSave').css('display', 'none');
        //$('#btnManageBulkUploadCancel').css('display', 'none');
        $(".clManageupload").css('display', '');
        $('.clManageDrop').css('display', 'none');
        parentfolderidtopass = "";
        dropdownlength = 0;
        uploadedfilecount = 0;
        if (document.getElementById("spnmanagebtn").style.display == "none") {
            createdParentFolder = true;
        } else {
            createdParentFolder = false;
        }

        //if ((documentview == 'folder' || documentview == "" || documentview == null)) {
        //    if ($('#showAll').text() != null && $('#showAll').text() != "" && typeof ($('#showAll').text()) != "undefined") {
        //        var valuetocheck = $("#showAll")[0].lastChild;
        //        parentfolderidtopass = valuetocheck.id;
        //    } else {
        //        createdParentFolder = true;
        //    }
        //} else {
        //    if (contractparentfolderid != null && contractparentfolderid != "" && typeof (contractparentfolderid) != "undefined") {
        //        parentfolderidtopass = contractparentfolderid;
        //    } else {
        //        parentfolderidtopass = "";
        //        createdParentFolder = true;
        //    }

        //}
        if (!createdParentFolder) {
            //manoj
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/folderurl?contractid=' + getParameterByName("ContractID") + '&foldeurl=' + $("#spnDocFolderURL").text(),
                type: 'GET',
                dataType: 'json',
                'Content-Type': 'application/json',
                cache: false,
                headers: { 'eContracts-ApiKey': localStorage.APIKey },
                success: function (Parent_Folder) {
                    if (Parent_Folder != null) {
                        //parentFoldeIDtoPass = "";
                        dropdownlength = 0;
                        uploadedfilecount = 0;
                        parentfolderidtopass = Parent_Folder.RowKey;
                        FromManage = true;
                        bulkdocumentuploadchunk();
                    } else {
                        parentfolderidtopass = "";
                        dropdownlength = 0;
                        uploadedfilecount = 0;
                        return false;
                    }

                },
                error:
                    function (data) {
                        parentfolderidtopass = "";
                        dropdownlength = 0;
                        uploadedfilecount = 0;
                        return false;
                    }
            });
            //manoj
        }
        else {
            var formDataFolder = new FormData();
            formDataFolder.append("AccountID", localStorage.AccountID);
            formDataFolder.append("ContractID", getParameterByName("ContractID"))
            formDataFolder.append("CreatedBy", localStorage.UserName);
            formDataFolder.append("ModifiedBy", localStorage.UserName);
            formDataFolder.append("DocumentAuthor", localStorage.UserName);

            //var headeridst = $("#lblContractTitle").text();
            //headeridst = headeridst.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').replace(/[\*\|\,\"\:\<\>\[\}\{\}\'\(\)\&\#\%\.\-\!]/g, '').replace(/\//g, '').replace(/\s\s+/g, " ").trim();
            //var finalurlst = ($('#hdContAreaDocLibName').val() != null && $('#hdContAreaDocLibName').val() != "") ? $('#hdContAreaDocLibName').val() : '/Contract Documents/';
            //finalurlst = (finalurlst.charAt(0) != '/') ? '/' + finalurlst : finalurlst;
            //finalurlst = ((finalurlst.substr(finalurlst.length - 1)) != "/") ? finalurlst + "/" : finalurlst;
            //finalurlst = ($('#showAll').text().replace(/ \/ /g, '/') != null && $('#showAll').text().replace(/ \/ /g, '/') != "") ? finalurlst + $('#showAll').text().replace(/ \/ /g, '/') + '/' : finalurlst + headeridst + '/';
            formDataFolder.append("FolderPathFinal", $("#spnDocFolderURL").text());
            if (typeof (formDataFolder) != 'undefined' && formDataFolder != null) {
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/foldercreation',
                    type: 'POST',
                    data: formDataFolder,
                    cache: false,
                    contentType: false,
                    headers: {
                        'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, 'RefreshToken': localStorage.RefreshToken
                    },
                    processData: false,
                    success: function (ParentFolderdata) {
                        //parentFoldeIDtoPass = "";
                        dropdownlength = 0;
                        uploadedfilecount = 0;
                        parentfolderidtopass = ParentFolderdata;
                        FromManage = true;
                        bulkdocumentuploadchunk();
                    },
                    error: function (ex2) {
                        parentfolderidtopass = "";
                        dropdownlength = 0;
                        uploadedfilecount = 0;
                        return false;
                    }
                });
            }
        }
    }
}

function Manage_Folder() {
    $("#liManageFolders a").trigger("click");
}
//manoj
//ENH476- Related Contracts - UI Change End

function setApprovalDocumentUrl() {
    var finalurl = "";
    if (typeof contractItem != "undefined" && contractItem != null && contractItem != "" && typeof contractItem.ContractDocumentsUrl != "undefined" && contractItem.ContractDocumentsUrl != null && contractItem.ContractDocumentsUrl != "") {
        finalurl = contractItem.ContractDocumentsUrl;
        finalurl = (finalurl.charAt(0) != '/') ? '/' + finalurl.trim() : finalurl.trim();
        finalurl = ((finalurl.substr(finalurl.length - 1)) != "/") ? finalurl + "/" : finalurl;
    } else {
        var headerid = $("#lblContractTitle").text();
        headerid = headerid.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').replace(/[\*\|\,\"\:\<\>\[\}\{\}\'\(\)\&\#\%\.\-\!]/g, '').replace(/\//g, '').replace(/\s\s+/g, " ").trim();
        finalurl = ($('#hdContAreaDocLibName').val() != null && $('#hdContAreaDocLibName').val() != "") ? $('#hdContAreaDocLibName').val() : '/Contract Documents/';
        finalurl = (finalurl.charAt(0) != '/') ? '/' + finalurl.trim() : finalurl.trim();
        finalurl = ((finalurl.substr(finalurl.length - 1)) != "/") ? finalurl + "/" : finalurl;
        finalurl += headerid + "/";
    }

    $("#lblFolderUrlApprovalSheet").text(finalurl + "Summary Documents" + '/');
    $("#lblFolderUrlApprovalSheet").css('cursor', 'default');
    $("#lblFolderUrlApprovalSheetFromComputer").text(finalurl + "Summary Documents" + '/');
    $("#lblFolderUrlApprovalSheetFromComputer").css('cursor', 'default');
    //manoj
}


$('#btnApprovalSheetCreate').click(function () {
    //manoj
    $("#docApprovalSheetContract").replaceWith($("#docApprovalSheetContract").val('').clone(true));
    $("#ddlSummaryDocumentTemplate").val('0');
    $("#txtSummaryDocumentNameCreate").val('');
    $("#txtSummaryDescriptionDoc").val('');
    $("#txtSummaryDescriptionDocFromComputer").val('');
    //manoj

    $('input[type="radio"][name="ApprovalSheetProcess"][value="ApprovalSheetFromTemplate"]').prop('checked', true);
    $('#dvASFromTemp').css("display", "");
    $('#dvASFromComputer').css("display", "none");
    $("#addEditApprovalSheetDocument").dialog("option", "title", "Create Summary/ Approval Sheet");
    $("#addEditApprovalSheetDocument").dialog("open");
});



function uploadApprovalSheettoSummaryDocs() {
    var isTemplate = false;
    if ($("input:radio[name=ApprovalSheetProcess]:checked").val() == "ApprovalSheetFromTemplate") {
        isTemplate = true;
    }
    else {
        isTemplate = false;
    }
    if (isTemplate) {
        if (requiredValidator('saveASFromTempForm')) {
            var folderurl = $("#lblFolderUrlApprovalSheet").text();
            var documentName = $("#txtSummaryDocumentNameCreate").val() + ".docx";
            if (!CheckDocumentExist(folderurl, documentName)) {
                $('.ui-button-green-text').parent().prop('disabled', true);
                var formData = new FormData();
                formData.append("DocDescription", $("#txtSummaryDescriptionDoc").val());
                formData.append("DocumentAuthor", "");
                formData.append("DocumentLanguage", "");
                formData.append("HardCopyPhysicalLocation", "");
                formData.append("ContractID", getParameterByName('ContractID'));
                formData.append("ContractTitle", $("#lblContractTitle").text());
                formData.append("DocumentType", "");
                formData.append("Counterparty", $("#lblCounterparty").text());
                formData.append("TemplateName", $("#ddlSummaryDocumentTemplate").find('option:selected').val().split('~')[1]);
                formData.append("TemplateID", $("#ddlSummaryDocumentTemplate").find('option:selected').val().split('~')[0]);
                formData.append("DocumentName", $("#txtSummaryDocumentNameCreate").val());
                formData.append("AccountID", localStorage.AccountID);
                formData.append("IsStandard", "No");
                formData.append("IsPrimary", "No");
                formData.append("IsFinalized", "No");
                formData.append("DocumentStatus", "New");
                formData.append("BusinessArea", $("#lblBusinessArea").text().trim());
                formData.append("BusinessAreaPath", $("#lblBusinessAreaPath").text());
                formData.append("ContractArea", $("#lblContractArea").text().trim());
                formData.append("ContractAreaAdministrators", $("#lblContractAreaAdmins").text().trim());
                formData.append("BusinessAreaOwners", $("#lblBusinessAreaOwners").text().trim());
                formData.append("ValidFrom", "");
                formData.append("ValidTill", "");
                formData.append("Reminder1", "");
                formData.append("Reminder1Condition", "");
                formData.append("Reminder2", "");
                formData.append("Reminder2Condition", "");
                formData.append("Reminder3", "");
                formData.append("Reminder3Condition", "");
                formData.append("CreatingFromContractForm", "No");
                formData.append("Location", "Office 365 Document Library");
                formData.append("LocationURL", folderurl);
                formData.append("CreatedBy", localStorage.UserName);
                formData.append("ModifiedBy", localStorage.UserName);
                formData.append("SendReminderTo", "");
                formData.append("HostURL", localStorage.SPHostUrl);
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/uploadapprovaltemplate',
                    type: 'POST',
                    data: formData,
                    cache: false,
                    contentType: false,
                    headers: {
                        'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName, 'RefreshToken': localStorage.RefreshToken
                    },
                    processData: false,
                    success: function (data) {
                        data = data[0];
                        oApprovalNewDocID = data.RowKey;
                        $("#addEditApprovalSheetDocument").dialog("close");
                        $("#btnApprovalSheetCreate").css('display', 'none');
                        $("#lblApprovalSheetTempdocuments").html("");

                        $("#uploaddocumentprocess").css('display', 'none');
                        $('.ui-button-green-text').parent().removeAttr('disabled');
                        var vURL = encodeURI(data.DocumentUrl);
                        var ext = data.DocumentName.split('.').pop();
                        if ($("#ulDocument").html() == "No items found.") {
                            $("#ulDocument").empty();
                        }
                        if (overwritedocument) { //if overwrite is yes
                            var ulDocumentlist = $("#ulDocument li");
                            if (ulDocumentlist.length > 0) {
                                var documentexist = $(ulDocumentlist).find("input[id=" + data.RowKey + "]");
                                if (documentexist.length > 0) {
                                    $(ulDocumentlist).find("input[id=" + data.RowKey + "]").parent().remove();
                                }
                            }
                            overwritedocument = false;
                            DuplicateDocId = false;
                        } else {
                            var documentCount = Number($("#lblDocumentsCount").html()) + 1;
                            $("#lblDocumentsCount").text(documentCount);
                        }
                        if (documentview == null || documentview == "" || documentview == 'folder') {
                            if (data.CreationMode == "Template") {
                                $("#ulDocument").prepend('<li class=" margin-bottom-5" active=' + data.IsActive + '><label id="FolderCreationMode" style="display:none;"></label><label id="DocumentID" style="display:none;">' + data.RowKey + '</label><label id="SentForSign" style="display:none;"></label><label id="DocumentName" style="display:none;">' + data.DocumentName + '</label><label id="ShareWorkflow" style="display:none;"></label><label id="ReviewWorkflow" style="display:none;"></label><label id="BusinessArea" style="display:none;"></label><label id="IsFinalized" style="display:none;">No</label><label id="IsPrimaryDoc" style="display:none;">No</label>  <input type="checkbox" id="' + data.RowKey + '" name="MultipleDocuments" class="Contribute" style="visibility:hidden;" onclick="checkMultipleDocuments(this);" value="' + data.RowKey + '"><b title="New" style="cursor:pointer" id="' + data.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_green_another details_documentstatus"><img src="../Content/Images/status/new.png" class="margin-right-5">new</b><dd class="file-icon ' + ext + '"></dd><a href="javascript:void(0);" onclick="ViewDocument(\'' + vURL + '\')"  title="' + data.DocumentName + '" style="pointer-events: none;">' + data.DocumentName + '</a><img src="../Content/Images/new_item.png" alt="New" title="New"><span class="sub-text"> few seconds ago</span>&nbsp;</li>');//<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuDocumentFinal showitem margin-left-5">
                            } else {
                                $("#ulDocument").prepend('<li class=" margin-bottom-5" active=' + data.IsActive + '><label id="FolderCreationMode" style="display:none;"></label><label id="DocumentID" style="display:none;">' + data.RowKey + '</label><label id="SentForSign" style="display:none;"></label><label id="DocumentName" style="display:none;">' + data.DocumentName + '</label><label id="ShareWorkflow" style="display:none;"></label><label id="ReviewWorkflow" style="display:none;"></label><label id="BusinessArea" style="display:none;"></label><label id="IsFinalized" style="display:none;">No</label><label id="IsPrimaryDoc" style="display:none;">No</label>  <input type="checkbox" id="' + data.RowKey + '" name="MultipleDocuments" class="Contribute" style="visibility:hidden;" onclick="checkMultipleDocuments(this);" value="' + data.RowKey + '"><b title="New" style="cursor:pointer" id="' + data.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_green_another details_documentstatus"><img src="../Content/Images/status/new.png" class="margin-right-5">new</b><dd class="file-icon ' + ext + '"></dd><a href="javascript:void(0);" onclick="ViewDocument(\'' + vURL + '\')"  title="' + data.DocumentName + '">' + data.DocumentName + '</a><img src="../Content/Images/new_item.png" alt="New" title="New"><span class="sub-text"> few seconds ago</span>&nbsp;</li>');//<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuDocumentFinal showitem margin-left-5">
                            }
                        } else {
                            if (data.CreationMode == "Template") {
                                $("#ulDocument").prepend('<li class=" margin-bottom-5" active=' + data.IsActive + '><label id="FolderCreationMode" style="display:none;"></label><label id="DocumentID" style="display:none;">' + data.RowKey + '</label><label id="SentForSign" style="display:none;"></label><label id="DocumentName" style="display:none;">' + data.DocumentName + '</label><label id="ShareWorkflow" style="display:none;"></label><label id="ReviewWorkflow" style="display:none;"></label><label id="BusinessArea" style="display:none;"></label><label id="IsFinalized" style="display:none;">No</label><label id="IsPrimaryDoc" style="display:none;">No</label>  <input type="checkbox" id="' + data.RowKey + '" name="MultipleDocuments" class="Contribute" style="visibility:hidden;" onclick="checkMultipleDocuments(this);" value="' + data.RowKey + '"><b title="New" style="cursor:pointer" id="' + data.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_green_another details_documentstatus"><img src="../Content/Images/status/new.png" class="margin-right-5">new</b><dd class="file-icon ' + ext + '"></dd><a href="javascript:void(0);" onclick="ViewDocument(\'' + vURL + '\')"  title="' + data.DocumentName + '" style="pointer-events: none;">' + data.DocumentName + '</a><span class="sub-text"> few seconds ago</span>&nbsp;<div class="documenturlclass" style="margin-left:0px"><label title="' + data.DocumentUrl + '"><img src="../Content/Images/icon/folder_open.png" style="margin-right: 5px;">' + data.DocumentUrl + '</label></div></li>');//<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuDocumentFinal showitem margin-left-5">
                            } else {
                                $("#ulDocument").prepend('<li class=" margin-bottom-5" active=' + data.IsActive + '><label id="FolderCreationMode" style="display:none;"></label><label id="DocumentID" style="display:none;">' + data.RowKey + '</label><label id="SentForSign" style="display:none;"></label><label id="DocumentName" style="display:none;">' + data.DocumentName + '</label><label id="ShareWorkflow" style="display:none;"></label><label id="ReviewWorkflow" style="display:none;"></label><label id="BusinessArea" style="display:none;"></label><label id="IsFinalized" style="display:none;">No</label><label id="IsPrimaryDoc" style="display:none;">No</label>  <input type="checkbox" id="' + data.RowKey + '" name="MultipleDocuments" class="Contribute" style="visibility:hidden;" onclick="checkMultipleDocuments(this);" value="' + data.RowKey + '"><b title="New" style="cursor:pointer" id="' + data.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_green_another details_documentstatus"><img src="../Content/Images/status/new.png" class="margin-right-5">new</b><dd class="file-icon ' + ext + '"></dd><a href="javascript:void(0);" onclick="ViewDocument(\'' + vURL + '\')"  title="' + data.DocumentName + '">' + data.DocumentName + '</a><span class="sub-text"> few seconds ago</span>&nbsp;<div class="documenturlclass" style="margin-left:0px"><label title="' + data.DocumentUrl + '"><img src="../Content/Images/icon/folder_open.png" style="margin-right: 5px;">' + data.DocumentUrl + '</label></div></li>');//<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuDocumentFinal showitem margin-left-5">
                            }
                        }

                        var lblDocText = "";
                        lblDocText += '<div class="width100">';
                        lblDocText += '<label id="DocumentID" style="display:none;">' + data.RowKey + '</label>';
                        lblDocText += '<label id="DocumentName" style="display:none;">' + data.DocumentName + '</label>';
                        lblDocText += '<label id="DocumentURL" style="display:none;">' + encodeURI(data.DocumentUrl) + '</label>';
                        lblDocText += '<a href="javascript:void(0);" style="pointer-events: none;cursor: default;" onclick="viewdocinword(\'' + vURL + '\')" class="linkText">' + data.DocumentName + '</a><a href="javascript:void(0);" onclick="viewdocinword(\'' + vURL + '\')" title="View Document" class="linkText" style="margin-left: 5px !important;pointer-events: none;cursor: default;"><img src="/Content/Images/external_link.png" id="newTabImage" style="margin-top: -1px;"></a>';
                        lblDocText += '</div>';

                        $("#lblApprovalSheetTempdocuments").html(lblDocText);
                        $("#lblApprovalSheetTempdocuments").css('display', '');

                        $("#general-notification").css("visibility", "visible");
                        $("#general-notification").html("Document uploaded successfully. All the options to perform action on document will be enabled once it is ready for use.");
                        //setTimeout(function () { $("#general-notification").css("visibility", "hidden"); }, 10000);
                        clearTimeout(cleartimevalue);
                        cleartimevalue = setTimeout(refreshdocuemnt, 10000);
                        $('.ui-button-green-text').parent().prop('disabled', false);
                        clearTimeout(cleartimevalue1);
                        cleartimevalue1 = setTimeout(refreshdocuemntApprovalsheet, 10000);
                        //}
                        afterPost();
                        icontractdetails();
                    },
                    error: function (data) {
                        $('.ui-button-green-text').parent().prop('disabled', false);
                        oApprovalNewDocID = "";
                    },
                    complete: function (data) {
                        $("#uploaddocumentprocess").css('display', 'none');
                    }
                });
            }
            else {
                swal("", " '" + documentName + "' already exist");
            }

        }
    }
    else {
        if (requiredValidator('saveASFromComputerForm')) {
            var folderurl = $("#lblFolderUrlApprovalSheetFromComputer").text();
            var documentName = encodeURIComponent($('#docApprovalSheetContract')[0].files[0].name);
            if (!CheckDocumentExist(folderurl, documentName)) {
                $('.ui-button-green-text').parent().prop('disabled', true);
                var formData = new FormData();
                var opmlFile = $('#docApprovalSheetContract')[0];
                if (opmlFile.files.length > 0) {
                    formData.append("opmlFile", opmlFile.files[0]);
                }
                formData.append("DocDescription", $("#txtSummaryDescriptionDocFromComputer").val());
                formData.append("DocumentAuthor", "");
                formData.append("DocumentLanguage", "");
                formData.append("HardCopyPhysicalLocation", "");
                formData.append("ContractID", getParameterByName('ContractID'));
                formData.append("ContractTitle", $("#lblContractTitle").text());
                formData.append("DocumentType", "");
                formData.append("Counterparty", $("#lblCounterparty").text());
                formData.append("AccountID", localStorage.AccountID);
                formData.append("IsStandard", "No");
                formData.append("IsPrimary", "No");
                formData.append("IsFinalized", "No");
                formData.append("DocumentStatus", "New");
                formData.append("BusinessArea", $("#lblBusinessArea").text().trim());
                formData.append("BusinessAreaPath", $("#lblBusinessAreaPath").text());
                formData.append("ContractArea", $("#lblContractArea").text().trim());
                formData.append("ContractAreaAdministrators", $("#lblContractAreaAdmins").text().trim());
                formData.append("BusinessAreaOwners", $("#lblBusinessAreaOwners").text().trim());
                formData.append("ValidFrom", "");
                formData.append("ValidTill", "");
                formData.append("Reminder1", "");
                formData.append("Reminder1Condition", "");
                formData.append("Reminder2", "");
                formData.append("Reminder2Condition", "");
                formData.append("Reminder3", "");
                formData.append("Reminder3Condition", "");
                formData.append("CreatingFromContractForm", "No");
                formData.append("Location", "Office 365 Document Library");
                formData.append("LocationURL", folderurl);
                formData.append("CreatedBy", localStorage.UserName);
                formData.append("ModifiedBy", localStorage.UserName);
                formData.append("SendReminderTo", "");
                formData.append("HostURL", localStorage.SPHostUrl);
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/uploadapprovaldocument',
                    type: 'POST',
                    data: formData,
                    cache: false,
                    contentType: false,
                    headers: {
                        'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName, 'RefreshToken': localStorage.RefreshToken
                    },
                    processData: false,
                    success: function (data) {
                        $("#addEditApprovalSheetDocument").dialog("close");
                        $("#btnApprovalSheetCreate").css('display', 'none');
                        $("#lblApprovalSheetTempdocuments").html("");
                        oApprovalNewDocID = data.RowKey;
                        $("#uploaddocumentprocess").css('display', 'none');
                        $('.ui-button-green-text').parent().removeAttr('disabled');
                        var vURL = encodeURI(data.DocumentUrl);
                        var ext = data.DocumentName.split('.').pop();
                        if ($("#ulDocument").html() == "No items found.") {
                            $("#ulDocument").empty();
                        }
                        if (overwritedocument) { //if overwrite is yes
                            var ulDocumentlist = $("#ulDocument li");
                            if (ulDocumentlist.length > 0) {
                                var documentexist = $(ulDocumentlist).find("input[id=" + data.RowKey + "]");
                                if (documentexist.length > 0) {
                                    $(ulDocumentlist).find("input[id=" + data.RowKey + "]").parent().remove();
                                }
                            }
                            overwritedocument = false;
                            DuplicateDocId = false;
                        } else {
                            var documentCount = Number($("#lblDocumentsCount").html()) + 1;
                            $("#lblDocumentsCount").text(documentCount);
                        }
                        if (documentview == null || documentview == "" || documentview == 'folder') {
                            if (data.CreationMode == "Template") {
                                $("#ulDocument").prepend('<li class=" margin-bottom-5" active=' + data.IsActive + '><label id="FolderCreationMode" style="display:none;"></label><label id="DocumentID" style="display:none;">' + data.RowKey + '</label><label id="SentForSign" style="display:none;"></label><label id="DocumentName" style="display:none;">' + data.DocumentName + '</label><label id="ShareWorkflow" style="display:none;"></label><label id="ReviewWorkflow" style="display:none;"></label><label id="BusinessArea" style="display:none;"></label><label id="IsFinalized" style="display:none;">No</label><label id="IsPrimaryDoc" style="display:none;">No</label>  <input type="checkbox" id="' + data.RowKey + '" name="MultipleDocuments" class="Contribute" style="visibility:hidden;" onclick="checkMultipleDocuments(this);" value="' + data.RowKey + '"><b title="New" style="cursor:pointer" id="' + data.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_green_another details_documentstatus"><img src="../Content/Images/status/new.png" class="margin-right-5">new</b><dd class="file-icon ' + ext + '"></dd><a href="javascript:void(0);" onclick="ViewDocument(\'' + vURL + '\')"  title="' + data.DocumentName + '" style="pointer-events: none;">' + data.DocumentName + '</a><img src="../Content/Images/new_item.png" alt="New" title="New"><span class="sub-text"> few seconds ago</span>&nbsp;</li>');//<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuDocumentFinal showitem margin-left-5">
                            } else {
                                $("#ulDocument").prepend('<li class=" margin-bottom-5" active=' + data.IsActive + '><label id="FolderCreationMode" style="display:none;"></label><label id="DocumentID" style="display:none;">' + data.RowKey + '</label><label id="SentForSign" style="display:none;"></label><label id="DocumentName" style="display:none;">' + data.DocumentName + '</label><label id="ShareWorkflow" style="display:none;"></label><label id="ReviewWorkflow" style="display:none;"></label><label id="BusinessArea" style="display:none;"></label><label id="IsFinalized" style="display:none;">No</label><label id="IsPrimaryDoc" style="display:none;">No</label>  <input type="checkbox" id="' + data.RowKey + '" name="MultipleDocuments" class="Contribute" style="visibility:hidden;" onclick="checkMultipleDocuments(this);" value="' + data.RowKey + '"><b title="New" style="cursor:pointer" id="' + data.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_green_another details_documentstatus"><img src="../Content/Images/status/new.png" class="margin-right-5">new</b><dd class="file-icon ' + ext + '"></dd><a href="javascript:void(0);" onclick="ViewDocument(\'' + vURL + '\')"  title="' + data.DocumentName + '">' + data.DocumentName + '</a><img src="../Content/Images/new_item.png" alt="New" title="New"><span class="sub-text"> few seconds ago</span>&nbsp;</li>');//<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuDocumentFinal showitem margin-left-5">
                            }
                        } else {
                            if (data.CreationMode == "Template") {
                                $("#ulDocument").prepend('<li class=" margin-bottom-5" active=' + data.IsActive + '><label id="FolderCreationMode" style="display:none;"></label><label id="DocumentID" style="display:none;">' + data.RowKey + '</label><label id="SentForSign" style="display:none;"></label><label id="DocumentName" style="display:none;">' + data.DocumentName + '</label><label id="ShareWorkflow" style="display:none;"></label><label id="ReviewWorkflow" style="display:none;"></label><label id="BusinessArea" style="display:none;"></label><label id="IsFinalized" style="display:none;">No</label><label id="IsPrimaryDoc" style="display:none;">No</label>  <input type="checkbox" id="' + data.RowKey + '" name="MultipleDocuments" class="Contribute" style="visibility:hidden;" onclick="checkMultipleDocuments(this);" value="' + data.RowKey + '"><b title="New" style="cursor:pointer" id="' + data.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_green_another details_documentstatus"><img src="../Content/Images/status/new.png" class="margin-right-5">new</b><dd class="file-icon ' + ext + '"></dd><a href="javascript:void(0);" onclick="ViewDocument(\'' + vURL + '\')"  title="' + data.DocumentName + '" style="pointer-events: none;">' + data.DocumentName + '</a><span class="sub-text"> few seconds ago</span>&nbsp;<div class="documenturlclass" style="margin-left:0px"><label title="' + data.DocumentUrl + '"><img src="../Content/Images/icon/folder_open.png" style="margin-right: 5px;">' + data.DocumentUrl + '</label></div></li>');//<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuDocumentFinal showitem margin-left-5">
                            } else {
                                $("#ulDocument").prepend('<li class=" margin-bottom-5" active=' + data.IsActive + '><label id="FolderCreationMode" style="display:none;"></label><label id="DocumentID" style="display:none;">' + data.RowKey + '</label><label id="SentForSign" style="display:none;"></label><label id="DocumentName" style="display:none;">' + data.DocumentName + '</label><label id="ShareWorkflow" style="display:none;"></label><label id="ReviewWorkflow" style="display:none;"></label><label id="BusinessArea" style="display:none;"></label><label id="IsFinalized" style="display:none;">No</label><label id="IsPrimaryDoc" style="display:none;">No</label>  <input type="checkbox" id="' + data.RowKey + '" name="MultipleDocuments" class="Contribute" style="visibility:hidden;" onclick="checkMultipleDocuments(this);" value="' + data.RowKey + '"><b title="New" style="cursor:pointer" id="' + data.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_green_another details_documentstatus"><img src="../Content/Images/status/new.png" class="margin-right-5">new</b><dd class="file-icon ' + ext + '"></dd><a href="javascript:void(0);" onclick="ViewDocument(\'' + vURL + '\')"  title="' + data.DocumentName + '">' + data.DocumentName + '</a><span class="sub-text"> few seconds ago</span>&nbsp;<div class="documenturlclass" style="margin-left:0px"><label title="' + data.DocumentUrl + '"><img src="../Content/Images/icon/folder_open.png" style="margin-right: 5px;">' + data.DocumentUrl + '</label></div></li>');//<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuDocumentFinal showitem margin-left-5">
                            }
                        }

                        var lblDocText = "";
                        lblDocText += '<div class="width100">';
                        lblDocText += '<label id="DocumentID" style="display:none;">' + data.RowKey + '</label>';
                        lblDocText += '<label id="DocumentName" style="display:none;">' + data.DocumentName + '</label>';
                        lblDocText += '<label id="DocumentURL" style="display:none;">' + encodeURI(data.DocumentUrl) + '</label>';
                        lblDocText += '<a href="javascript:void(0);" style="pointer-events: none;cursor: default;" onclick="viewdocinword(\'' + vURL + '\')" class="linkText">' + data.DocumentName + '</a><a href="javascript:void(0);" onclick="viewdocinword(\'' + vURL + '\')" title="View Document" class="linkText" style="margin-left: 5px !important;pointer-events: none;cursor: default;"><img src="/Content/Images/external_link.png" id="newTabImage" style="margin-top: -1px;"></a>';
                        lblDocText += '</div>';

                        $("#lblApprovalSheetTempdocuments").html(lblDocText);
                        $("#lblApprovalSheetTempdocuments").css('display', '');

                        $("#general-notification").css("visibility", "visible");
                        $("#general-notification").html("Document uploaded successfully. All the options to perform action on document will be enabled once it is ready for use.");
                        $('.ui-button-green-text').parent().prop('disabled', false);
                        //setTimeout(function () { $("#general-notification").css("visibility", "hidden"); }, 10000);
                        clearTimeout(cleartimevalue);
                        cleartimevalue = setTimeout(refreshdocuemnt, 10000);

                        clearTimeout(cleartimevalue1);
                        cleartimevalue1 = setTimeout(refreshdocuemntApprovalsheet, 10000);
                        //}
                        afterPost();
                        icontractdetails();

                    },
                    error: function (data) {
                        $('.ui-button-green-text').parent().prop('disabled', false);
                        oApprovalNewDocID = "";
                    },
                    complete: function (data) {
                        $("#uploaddocumentprocess").css('display', 'none');
                    }

                });
            }
            else {
                swal("", " '" + documentName + "' already exist");
            }
        }
    }
}

function showDocumentsforApprovalSheet(ContractID) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?contractid=' + ContractID,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        success: function (documentcollection) {
            var NotActiveStatusDocument = false;
            var data = $.grep(documentcollection, function (n, i) {
                return (n.IsFolder != "Yes");
            });
            if (data.length == 0) {

            } else {
                $.each(data, function (index, item) {
                    if (item.RowKey == oApprovalNewDocID) {
                        if (item.IsActive != "No") {
                            var vURL = encodeURI(item.DocumentUrl);
                            $("#lblApprovalSheetTempdocuments").html("");
                            var lblDocText = "";
                            lblDocText += '<div class="width100">';
                            lblDocText += '<label id="DocumentID" style="display:none;">' + item.RowKey + '</label>';
                            lblDocText += '<label id="DocumentName" style="display:none;">' + item.DocumentName + '</label>';
                            lblDocText += '<label id="DocumentURL" style="display:none;">' + encodeURI(item.DocumentUrl) + '</label>';
                            lblDocText += '<a href="javascript:void(0);"  onclick="viewdocinword(\'' + vURL + '\')" class="linkText">' + item.DocumentName + '</a><a href="javascript:void(0);" onclick="viewdocinword(\'' + vURL + '\')" title="View Document" class="linkText" style="margin-left: 5px !important;"><img src="/Content/Images/external_link.png" id="newTabImage" style="margin-top: -1px;"></a>';
                            lblDocText += '<a id="d_' + item.RowKey + '" name="' + escape(item.DocumentName) + '" href="javascript:void(0)" onclick="DeleteApprovalSheetDocument(this);"><img src="../Content/Images/icon/delete.png" title="delete"></a>';
                            lblDocText += '</div>';
                            $("#lblApprovalSheetTempdocuments").html(lblDocText);
                            $("#lblApprovalSheetTempdocuments").css('display', '');
                            oApprovalNewDocID = "";
                        }
                        else if (item.IsActive == "No") {
                            NotActiveStatusDocument = true;
                        }
                    }
                });
            }
            if (NotActiveStatusDocument) {
                clearTimeout(cleartimevalue1);
                cleartimevalue1 = setTimeout(refreshdocuemntApprovalsheet, 10000);
            }
        },
        error:
            function (data) {

            },
        complete: function () {

        }
    });
}


function DisplayApprovalDocument(objvalue) {
    $("#ulAdditionalApprovalDocs").html('<img src="../Content/Images/icon/loading.gif"> Please wait...');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?contractid=' + vContractID,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        success: function (documentcollection) {
            var ParentFolderDatadata = $.grep(documentcollection, function (nparent, iparent) {
                return (nparent.ParentFolderID == "" || nparent.ParentFolderID == null);
            });
            var tempDocumentID = "";
            if ($('#lblApprovalSheetTempdocuments').css('display') != 'none') {
                if ($('#lblApprovalSheetTempdocuments').find("#DocumentID").text() != null && $('#lblApprovalSheetTempdocuments').find("#DocumentID").text() != "" && $('#lblApprovalSheetTempdocuments').find("#DocumentID").text() != 'undefined') {
                    tempDocumentID = $('#lblApprovalSheetTempdocuments').find("#DocumentID").text();
                }
            }
            var data = $.grep(documentcollection, function (n, i) {
                return (n.IsFolder != "Yes" && n.RowKey != tempDocumentID && n.IsActive != "No");
            });
            if (data.length == 0) {
                contractparentfolderid = "";
                $("#ulAdditionalApprovalDocs").html('No items found.');
                $("#btnSaveAdditonalDocSummaryAdd").css('display', 'none');
                $("#addAdditionalApprovalSheetDocument").dialog("option", "title", "Select Document(s)");
                $("#addAdditionalApprovalSheetDocument").dialog("open");
            } else {
                $("#btnSaveAdditonalDocSummaryAdd").css('display', '');
                $('#ulAdditionalApprovalDocs').empty();
                CreateDocumentListNewForApproval(data);
            }
        },
        error:
        function (data) {
            $("#btnSaveAdditonalDocSummaryAdd").css('display', 'none');
            $("#ulAdditionalApprovalDocs").html('No items found.');
            $("#addAdditionalApprovalSheetDocument").dialog("option", "title", "Select Document(s)");
            $("#addAdditionalApprovalSheetDocument").dialog("open");
        },
        complete: function () {
        }
    });
}

function CreateDocumentListNewForApproval(data) {
    var datalenght = data.length;
    $("#ulAdditionalApprovalDocs").empty();
    var vTitle = '';
    var article = '';
    var DocDefaultView = "";
    if (thisDocumentLibrarySettings != '' && thisDocumentLibrarySettings != 'undefined' && typeof thisDocumentLibrarySettings != "undefined") {
        DocDefaultView = thisDocumentLibrarySettings.DocDefaultView;
    }
    for (var i = 0; i < datalenght; i++) {
        var item = data[i];
        if (item.IsActive != "No") {
            var settings = {
                pattern: /\.[0-9a-z]+$/i,
                knownFileTypes: ['pdf', 'png', 'jpg', 'gif', 'bmp', 'doc', 'xls', 'ppt', 'docx', 'xlsx', 'txt', 'pptx', 'zip', 'rar', 'gzip', 'arj', 'wav', 'mp3', 'aif', 'aiff', 'm4a', 'ogg', 'wma', 'psd', 'ai', 'swf', 'fla', 'css', 'js', 'avi', 'mov', 'wmv', 'dotx'],
                WopiFrameFileTypes: ['doc', 'xls', 'ppt', 'docx', 'xlsx', 'pptx', 'dotx']
            };
            var vPrimDocIcon = '';
            vURLDoc = encodeURI(item.DocumentUrl);
            var ext = vURLDoc.match(settings.pattern);
            var vFileType = '<dd class="file-icon none"></dd>';
            if (ext != null) {
                if (ext.length > 0) { ext = ext[0].slice(1); }
                if (DocDefaultView == "WordClient") {
                    if (vURLDoc.toLowerCase().indexOf(localStorage.SPHostUrl.toLowerCase()) >= 0) {
                        if (jQuery.inArray(ext, settings.WopiFrameFileTypes) > -1) {
                            vRawURLDoc = encodeURIComponent(item.DocumentUrl);
                            vURLDoc = localStorage.SPHostUrl + "/_layouts/WopiFrame.aspx?sourcedoc=" + vRawURLDoc + "&action=default";
                        } else {
                            vRawURLDoc = "";
                        }
                    }
                }
                if (jQuery.inArray(ext.toLowerCase(), settings.knownFileTypes) > -1) {
                    vFileType = '<dd class="file-icon ' + ext + '"></dd>';
                }
            }
            article += '<li class=" margin-bottom-5" active=' + item.IsActive + '>';
            article += '<label id="FolderCreationMode" style="display:none;">' + item.CreationMode + '</label>';
            article += '<label id="DocumentID" style="display:none;">' + item.RowKey + '</label>';
            article += '<label id="SentForSign" style="display:none;">' + item.SentForSign + '</label>';
            article += '<label id="DocumentName" style="display:none;">' + item.DocumentName + '</label>';
            article += '<label id="ShareWorkflow" style="display:none;">' + item.ShareWorkflow + '</label>';
            article += '<label id="ReviewWorkflow" style="display:none;">' + item.ReviewWorkflow + '</label>';
            article += '<label id="DocumentURL" style="display:none;">' + encodeURI(item.DocumentUrl) + '</label>';
            article += '<label id="BusinessArea" style="display:none;">' + item.BusinessArea + '</label>';
            article += '<label id="IsFinalized" style="display:none;">' + item.IsFinalized + '</label>';
            var primarydocchecking = (item.IsPrimary != null && item.IsPrimary != "") ? item.IsPrimary : "No";
            article += '<label id="IsPrimaryDoc" style="display:none;">' + primarydocchecking + '</label>';
            if (item.CreationMode == "Amendment") {
                article += '<label id="AmendmentID" style="display:none;">' + item.AmendmentID + '</label>';
            }
            if (item.IsActive != 'No') {
                article += '<input type="checkbox" id="' + item.RowKey + '" name="MultipleApprovalDocuments" class="Contribute" value=' + item.RowKey + ' /> ';
            } else {
                article += '<input type="checkbox" id="' + item.RowKey + '" name="MultipleApprovalDocuments" class="Contribute" style="visibility:hidden;" value=' + item.RowKey + ' /> ';
            }


            vTitle = item.DocumentName;
            if (vTitle.length > 61)
            { vTitle = vTitle.substring(0, 60) + '...'; }

            if (vRawURLDoc != "") {
                if (DocDefaultView == "WordClient") {
                    article += vFileType + '<a href="#" seqe = "' + vRawURLDoc + '" onclick="viewdocinword(\'' + vRawURLDoc + '\')" title="' + item.DocumentName + '">' + vTitle + '</a>';
                } else {
                    article += vFileType + '<a href="javascript:void(0);" data-value="' + encodeURIComponent(item.DocumentUrl) + '"   onclick="Opendocinbrowser(this)"  title="' + item.DocumentName + '">' + vTitle + '</a>';
                }
            } else {
                article += vFileType + '<a href="javascript:void(0);" data-value="' + encodeURIComponent(item.DocumentUrl) + '"  onclick="Opendocinbrowser(this)"  title="' + item.DocumentName + '">' + vTitle + '</a>';
            }
            article += '';
            article += '';
            article += vPrimDocIcon + '&nbsp';

            var the_arr = item.DocumentUrl.replace(localStorage.SPHostUrl + "/", "").split('/');
            the_arr.pop();
            var changedUrl = the_arr.join('/');
            article += '<div class="documenturlclass" style="margin-left:0px"><label title="' + changedUrl + '"><img src="../Content/Images/icon/folder_open.png" style="margin-right: 5px;">' + changedUrl + '</label></div>'
            article += '</li>';
        }
    }
    $("#ulAdditionalApprovalDocs").html(article);
    $("#ulAdditionalApprovalDocs").addClass('ulmarginclass');
    $("#addAdditionalApprovalSheetDocument").dialog("option", "title", "Select Document(s)");
    $("#addAdditionalApprovalSheetDocument").dialog("open");
}

function uploadAdditionalDocstoSummary() {
    $("#addAdditionalApprovalSheetDocument").dialog("close");
    $("#lblApprovalSheetdocuments").html("");
    $('.ui-button-green-text').parent().removeAttr('disabled');
    var lblDocText = "";
    $.each($("input[name='MultipleApprovalDocuments']:checked"), function () {
        var documentID = $(this).parent('li').find("#DocumentID").text();
        var documentName = $(this).parent('li').find("#DocumentName").text();
        var documentURL = $(this).parent('li').find("#DocumentURL").text();
        lblDocText += '<div class="width100">';
        lblDocText += '<label id="DocumentID" style="display:none;">' + documentID + '</label>';
        lblDocText += '<label id="DocumentName" style="display:none;">' + documentName + '</label>';
        lblDocText += '<label id="DocumentURL" style="display:none;">' + documentURL + '</label>';
        lblDocText += '<a href="javascript:void(0);"  onclick="viewdocinword(\'' + documentURL + '\')" class="linkText">' + documentName + '</a><a href="javascript:void(0);" onclick="viewdocinword(\'' + documentURL + '\')" title="View Document" class="linkText" style="margin-left: 5px !important;"><img src="/Content/Images/external_link.png" id="newTabImage" style="margin-top: -1px;"></a><a href="javascript:void(0);" onclick="removeadditionalapprovalsheetdocument(this)" title="Remove Document" class="linkText" style="margin-left: 5px !important;"><img src="/Content/Images/icon/delete.png" id="newTabImage" style="margin-top: -1px;"></a>';
        lblDocText += '</div>';
    });
    $("#lblApprovalSheetdocuments").html(lblDocText);
    $("#lblApprovalSheetdocuments").css('display', '');
}

function removeadditionalapprovalsheetdocument(obj) {
    $(obj).parent('div').remove();
}


function refreshdocuemntApprovalsheet() {
    if (oApprovalNewDocID != "" && oApprovalNewDocID != null) {
        showDocumentsforApprovalSheet(vContractID);
    }
}

//manoj
function onchangesummarytemplate(obj) {
    if (obj.value != "0") {
        $("#txtSummaryDocumentNameCreate").val($(obj).find('option:selected').text());
    } else {
        $("#txtSummaryDocumentNameCreate").val('');
    }
}
//manoj


function DeleteApprovalSheetDocument(obj) {
    $("#loadingPage").fadeIn();
    var approvalSheetDocumentID = (obj.id).slice(2);
    var documentName = unescape(obj.name);
    swal({
        title: '',
        text: "Are you sure you want to <span style='font-weight:700'>delete '" + documentName + "'</span>?",
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
                 url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?documentid=' + approvalSheetDocumentID,
                 type: 'DELETE',
                 dataType: 'json',
                 "Content-Type": "application/json",
                 headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
                 cache: false,
                 success: function (data) {
                     //manoj
                     $("#btnApprovalSheetCreate").css('display', '');
                     $("#lblApprovalSheetTempdocuments").html("");
                     $("#lblApprovalSheetTempdocuments").css('display', 'none');
                     clearTimeout(cleartimevalue);
                     cleartimevalue = setTimeout(refreshdocuemnt, 10000);

                     //$("#ddlDocumentList").trigger('chosen:updated');
                     $("#loadingPage").fadeOut();
                 },
                 error: function () {
                     $("#loadingPage").fadeOut();
                 }
             });
         }
         else {
             $("#loadingPage").fadeOut();
         }
         return;
     });
}


function checkFileExtension(fileControl) {
    var files = $(fileControl).prop('files');
    if (files.length > 0) {
        var extension = files[0].name.substr(files[0].name.lastIndexOf('.') + 1);
        if (extension == 'zip' || extension == 'ZIP') {
            $('#linkAddValidity').css('display', 'none');
        } else {
            $('#linkAddValidity').css('display', '');
        }
    } else {
        $('#linkAddValidity').css('display', '');
    }
}

function FilterMenuOptions(imgControl) {
    var eleli = $(imgControl).parent();
    var eleul = $(eleli).parent();
    var elePrimarylabel = $(eleli).find('label#IsPrimaryDoc');
    if ($(elePrimarylabel).text() == 'Yes') {
        $('li.primary').css('display', 'none');
    } else {
        if (contractItem.Permission.indexOf('Manage') >= 0) {
            $('li.primary').css('display', '');
        }
    }

}
function ShowInternalSigneeOther() {
    if ($('#rad_AuthorizeSignRestriction').prop('checked'))
        $('#ddlAuthorizeSignRestriction').css('display', '')
    else
        $('#ddlAuthorizeSignRestriction').css('display', 'none')

    $("#ddlAuthorizeSignRestriction").val($("#ddlAuthorizeSignRestriction option:first").val());
}