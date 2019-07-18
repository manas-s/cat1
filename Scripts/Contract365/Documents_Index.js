//Script for Filter Start
var strFinalizedDocumentsUrl = "";
var strDraftDocumentsUrl = "";
var SaveDraftInCloud = "";
var SaveFinalInCloud = "";
var AllowSaveDraftInCloud = "";
var vFinalSignature = "myMenu";
var vMarkFinalSignature = "myMenuFinal";
var listDocuments = [];
var v_isSearchFunction;
var v_isShowAllDocFunction;
var vProviderDocSign = '';
var vUserListEmail = '';
var vUserList = '';

var RightSignatureFlag = false;
var vUserListwithEmail = "";
var contractItem = "";
$(function () {

    CheckBulkUpload();
    CheckSignature();
    vUserList = GetUserList();
    $("#ddlDocumentShareInternal").append(vUserListEmail);
    $("#ddlDocumentShareInternal").chosen();

});

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function CheckSignature() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/feature?featureid=1',
        type: 'GET',
        cache: false,
        contentType: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        processData: false,
        async: false,
        success: function (data) {
            if (data.Status == "ON") {
                vFinalSignature = "myMenuSignature";
                vMarkFinalSignature = "myMenuFinalSignature";
            }
        },
        error: function () {

        }

    });
}

function CheckBulkUpload() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/feature?featureid=3',
        type: 'GET',
        cache: false,
        contentType: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        processData: false,
        async: false,
        success: function (data) {
            if (data.Status == "ON") {
                $("#bulkUpload").css("display", "");

            }
        },
        error: function () {

        }

    });
}

function savedViewDisplay(obj) {
    colorLink('spnAllDocuments', true);
    colorLink('spnFinalizedDocuments', false);
    colorLink('spnDraftDocuments', false);
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/savedview?viewid=' + obj.id,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        "Content-Type": "application/json",
        cache: false,
        success: function (savedviewentity) {
            $("#filterDocumentType option:selected").prop('selected', false);
            $("#filterLibraryName option:selected").prop('selected', false);
            $("#filterCreationMode option:selected").prop('selected', false);


            var val1 = savedviewentity.ViewQuery.split(';');
            var valdoctype = val1[0].split(',');
            var valdoctypelength = valdoctype.length;
            for (var i = 0; i < valdoctypelength; i++) {
                var valuedoctype = valdoctype[i].split(':');
                $("#filterDocumentType option[value='" + valuedoctype[1] + "']").prop("selected", true);
            }
            var vallibrary = val1[1].split(',');
            var vallibrarylength = vallibrary.length;
            for (var i = 0; i < vallibrarylength; i++) {
                var valuelibrary = vallibrary[i].split(':');
                $("#filterLibraryName option[value='" + valuelibrary[1] + "']").prop("selected", true);
            }
            var valcreation = val1[2].split(',');
            var valcreationlength = valcreation.length;
            for (var i = 0; i < valcreationlength; i++) {
                var valuecreation = valcreation[i].split(':');
                $("#filterCreationMode option[value='" + valuecreation[1] + "']").prop("selected", true);
            }
            applyFilter();
        }
    });
}

function clearSelection() {

    $("#showAll").css('display', 'inline');
    $("#btnAddView").css('display', 'none');
    $("#aRecentlyUpdated").css("background-color", "");
    $("#aRecentlyCreated").css("background-color", "");
    $("#liFiltersDocumentType").empty();
    $("#liFiltersLibraryName").empty();
    $("#liFiltersCreationMode").empty();
    $("#liFiltersSearchText").empty();
    $("#filterDocumentType option:selected").prop('selected', false);
    $("#filterLibraryName option:selected").prop('selected', false);
    $("#filterCreationMode option:selected").prop('selected', false);
    FilterDocuments("Finalized Documents");
}

function applyFilter() {
    $('#menu4').hide();
    $("#showAll").css('display', 'none');
    $("#liFiltersSearchText").empty();
    $("#liFiltersDocumentType").empty();
    $("#liFiltersLibraryName").empty();
    $("#liFiltersCreationMode").empty();

    $("#launcher4").css('display', '');
    $("#txtSearchBox").css('display', '');
    $("#btnAddView").css('display', 'block');
    var txtsearchboxvalue = $.trim($('#txtSearchBox').val());
    if (txtsearchboxvalue != "" && txtsearchboxvalue != null) {

        $('#liFiltersSearchText').append('<span><small>Showing search result for : ' + txtsearchboxvalue + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');
    }
    var customQuery1 = "DocumentType:";
    var isContainingAll1 = false;
    var isAnySelected1 = false;
    $('#filterDocumentType :selected').each(function (i, selected) {
        isAnySelected1 = true;
        if ($(selected).text() == "All")
            isContainingAll1 = true;

        $('#liFiltersDocumentType').append('<span><small>' + $(selected).text() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');
        customQuery1 += ',' + $(selected).text();

    });
    if (!isAnySelected1) {
        customQuery1 = "";
    }
    if (isContainingAll1) {
        $("#liFiltersDocumentType").empty();
        customQuery1 = "";
    }

    var customQuery2 = ";DocumentLibraryName:Finalized Documents";
    var isContainingAll2 = false;
    var isAnySelected2 = false;
    $('#filterLibraryName :selected').each(function (i, selected) {
        isAnySelected2 = true;
        if ($(selected).text() == "All")
            isContainingAll2 = true;

        $('#liFiltersLibraryName').append('<span><small>' + $(selected).text() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');
        customQuery2 += ',' + $(selected).text();
    });
    if (!isAnySelected2) {
        customQuery2 = "";
    }


    var customQuery3 = ";CreationMode:";
    var isContainingAll3 = false;
    var isAnySelected3 = false;
    $('#filterCreationMode :selected').each(function (i, selected) {
        isAnySelected3 = true;
        if ($(selected).text() == "All")
            isContainingAll3 = true;

        $('#liFiltersCreationMode').append('<span><small>' + $(selected).text() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');
        customQuery3 += ',' + $(selected).text();
    });
    if (!isAnySelected3) {
        customQuery3 = "";
    }
    if (isContainingAll3) {
        $("#liFiltersCreationMode").empty();
        customQuery3 = "";
    }

    var vIsShowAllDoc = false;
    if (isContainingAll1 && isContainingAll2 && isContainingAll3) {
        $("#showAll").css('display', 'inline');
        vIsShowAllDoc = true;
    }

    if (!isAnySelected1 && !isAnySelected2) {
        $("#btnAddView").css('display', 'none');
    }

    $("#listDocuments").empty();

    var sortby = "&sortbyfield=Timestamp&orderby=DESC";
    switch (selectedSortOption) {
        case "Recently Updated":
            sortby = '&sortbyfield=Timestamp&orderby=DESC';
            break;
        case "Recently Created":
            sortby = '&sortbyfield=Created&orderby=DESC';
            break;
        default:
            sortby = '&sortbyfield=Timestamp&orderby=DESC';
            break;
    }

    newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?showparent=true&searchkeyword=' + encodeURIComponent($("#txtSearchBox").val()) + '&customquery=' + customQuery1 + customQuery2 + customQuery3 + sortby;
    $('#listDocuments').html('<img src="../Content/Images/icon/loading.gif">');
    $.ajax({
        url: newurl,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            if (typeof data == 'undefined' || data.length == 0) {//NoContent HttpStatusCode Update
                $("#listDocuments").empty();
                $("#listDocuments").append('<p class="f_p-error">No Documents Available</p>');
                $("#compact-pagination").css('display', 'none');
            } else {
                $("#compact-pagination").css('display', '');
                $('#listDocuments').empty();
                GenerateListOfDocuments(data, false, false);
            }
        },
        error:
            function (data) {
                $("#listDocuments").empty();
                $("#listDocuments").append('<p class="f_p-error">No Documents Available</p>');
                $("#compact-pagination").css('display', 'none');
            }
    });
}

function GenerateListOfDocuments(data, isSearchFunction, isShowAllDocFunction) {
    var resultfound = true;
    listDocuments = data;
    v_isSearchFunction = isSearchFunction;
    v_isShowAllDocFunction = isShowAllDocFunction;
    CreateDocumentList(0);
    $('#compact-pagination').pagination({
        items: data.length,
        itemsOnPage: 20,
        type: 'ul',
        row: 'li',
        typeID: 'listDocuments',
        cssStyle: 'compact-theme',
        listname: 'Documents'
    });
    return resultfound;
}


function CreateDocumentList(page) {
    var startIndex = page * 20;
    var endIndex = startIndex + 20;

    var iCount = 0;
    var resultFound = false;
    var documentTags = [];

    var sortby = '';
    var fieldType = '';
    var contractTags = [];
    switch (selectedSortOption) {
        case "Recently Updated":
            sortby = 'Timestamp';
            fieldType = 'date';
            break;
        case "Recently Created":
            sortby = 'Created';
            fieldType = 'date';
            break;
        default:
            sortby = '';
            break;
    }

    $("#listDocuments").empty();
    for (var j = startIndex; j < endIndex; j++) {
        var item = listDocuments[j];
        if (item != null) {
            if (item.ParentFolderID == null || v_isShowAllDocFunction) {
                documentTags.push(item.DocumentName);
                var article = '<li>';
                article += '<span>&nbsp;</span>';
                article += '<p>';
                article += '<p id="IsFolder" style="display:none;">' + item.IsFolder + '</p>';
                article += '<p id="SentForSign" style="display:none;">' + item.SentForSign + '</p>';
                article += '<p id="DocumentID" style="display:none;">' + item.RowKey + '</p>';
                article += '<p id="DocumentName" style="display:none;">' + item.DocumentName + '</p>';
                article += '<p id="DocumentUrl" style="display:none;">' + item.DocumentUrl + '</p>';
                article += '<p id="sContractid" style="display:none;">' + item.ContractID + '</p>';
                article += '<p id="DocumentLibraryName" style="display:none;">' + item.DocumentLibraryName + '</p>';
                article += '<p class="files">';
                var isFolder = false;
                var vClass = "openmenu";
                var vDocIcon = '<img src="../Content/Images/icon/draft_doc.png" class="doc_type" alt="Draft Document" title="Draft Document" />';
                var vDocumentLibraryName = item.DocumentLibraryName;
                if (vDocumentLibraryName != '' && vDocumentLibraryName != null) {
                    if (vDocumentLibraryName == "Finalized Documents") {
                        vClass = "openmenuFinal";
                        vDocIcon = '<img src="../Content/Images/icon/final_doc.png" class="doc_type" alt="Finalized Document" title="Finalized Document" />';
                    }
                }

                if (item.DocumentName.toLowerCase().indexOf(".") < 0) {
                    isFolder = true;
                    article += '';
                }
                else {

                }

                if (isFolder) {
                    article += '<i><img src="../Content/Images/icon/folder.png" /><a href="javascript:void(0)" id=' + item.RowKey + ' onclick="javascript:showfolderdocuments(this);">' + item.DocumentName + '</a><img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuFolder" />';

                } else {
                    article += '<i><a href=' + encodeURI(item.DocumentUrl) + ' target="_blank">' + item.DocumentName + '</a>' + vDocIcon + '<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="' + vClass + '" />';

                }
                var docType = "";
                docType = item.DocumentType;
                if (!isFolder) {
                    if (item.ContractTitle == "") {
                        article += '<small class="cont_Doc_Small"> &lt;Not tagged to Contract or request&gt;  |  ' + docType;
                    } else {
                        article += '<small class="cont_Doc_Small PreserveSpace">' + item.ContractTitle + '  |  ' + docType;
                    }
                }


                if (sortby != '') {

                    if (item[sortby] != null && item[sortby] != "") {
                        if (fieldType == 'date') {
                            article += ' |&nbsp;<var title="' + selectedSortOption + '">' + moment(new Date(item[sortby])).format('Do MMM YYYY') + '</var>';
                        }
                        else {
                            article += ' |&nbsp;<var title="' + selectedSortOption + '">' + item[sortby] + '</var>';
                        }
                    }
                }
                else {
                    article += '</small></i>';
                }

                article += '</p>';

                if (vDocumentLibraryName != '' && vDocumentLibraryName != null) {
                    if (vDocumentLibraryName == "Draft Documents") {
                        article += '<b class="status_yellow">' + vDocumentLibraryName + '</b>';
                    }
                    else {
                        article += '<b class="status_green">' + vDocumentLibraryName + '</b>';
                    }
                }

                article += '</li>';
                $("#listDocuments").append(article);
                iCount++;
            }
            resultFound = true;
        }
    }

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

    $('.files').linktype();
    $(".openmenuFolder").contextMenu({ menu: 'myMenuFolder', leftButton: true }, function (action, el, pos) {
        contextMenuWorkFolder(action, el.parent("i").parent("p").parent("li"), pos);
    });
    $(".openmenu").contextMenu({ menu: vFinalSignature, leftButton: true }, function (action, el, pos) {
        contextMenuWork(action, el.parent("i").parent("p").parent("li"), pos);
    });
    $(".openmenuFinal").contextMenu({ menu: vMarkFinalSignature, leftButton: true }, function (action, el, pos) {
        contextMenuWork(action, el.parent("i").parent("p").parent("li"), pos);
    });
    var Permission = JSON.parse(localStorage.getItem("Permission"));
    if (Permission.UserRole != 'Super Admin') {
        ApplyPermissionToMenu(Permission.DocumentPermission);
    }

    if (v_isSearchFunction) {
        var txtsearchboxvalue = $.trim($('#txtSearchBox').val());
        if (resultFound) {
            if ($.trim($("#txtSearchBox").val()) == '') {
                $("#showAll").text("Showing All Documents");
            }
            else {
                $("#showAll").text('');

                $('#liFiltersSearchText').append('<span><small>Showing search result for : ' + txtsearchboxvalue + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');
            }
        } else {
            $("#showAll").text('');

            $('#liFiltersSearchText').append('<span><small>Showing search result for : ' + txtsearchboxvalue + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');
            $("#listDocuments").empty();
            $("#listDocuments").append("<p class='f_p-error'>No Result Found.</p>");
        }
    }
    $("#compact-pagination").css('display', '');

}

function ApplyPermissionToMenu(vPermission) {
    if (vPermission == 'Contribute') {
        $('.Manage').css("display", "none");
    }
    else if (vPermission == 'Collaborate') {
        $('.Manage').css("display", "none");
        $('.Contribute').css("display", "none");
    }
    else if (vPermission == 'View' || vPermission == '') {
        $('.Manage').css("display", "none");
        $('.Contribute').css("display", "none");
        $('.Collaborate').css("display", "none");
    }
}



function liRemove(obj) {
    if ($(obj.parentNode.parentNode.parentNode).attr('id') == 'liFiltersSearchText') {
        $(obj.parentNode.parentNode.parentNode).empty();
        $('#txtSearchBox').val('');
    }
    else {
        var child = obj.parentNode;
        var firstChild = child.firstChild;

        var find = " ";
        var re = new RegExp(find, 'g');

        $("#filterDocumentType option[value='" + firstChild.nodeValue.replace(re, '') + "']").prop("selected", false);
        $("#filterLibraryName option[value='" + firstChild.nodeValue.replace(re, '') + "']").prop("selected", false);
        $("#filterCreationMode option[value='" + firstChild.nodeValue.replace(re, '') + "']").prop("selected", false);

        child.parentNode.removeChild(child);
    }
    var hasItem1 = false;
    $('#liFiltersDocumentType span').each(function (i) {
        hasItem1 = true;
    });

    var hasItem2 = false;
    $('#liFiltersLibraryName span').each(function (i) {
        hasItem2 = true;
    });

    var hasItem3 = false;
    $('#liFiltersCreationMode span').each(function (i) {
        hasItem3 = true;
    });

    var hasItem4 = false;
    $('#liFiltersSearchText span').each(function (i) {
        hasItem4 = true;
    });

    applyFilter();
    if (!hasItem1 && !hasItem2 && !hasItem3 && !hasItem4) {
        $("#showAll").css('display', 'block');
        $("#showAll").css('display', 'inline');
        $("#showAll").text('');
        $("#showAll").text("Showing All Documents");
    }
}
//Script for Filter End

function tabchange(object) {
    if (object.id == "tabTemplate") {
        $("#tabTemplate").addClass('form-active');
        $("#tabUpload").removeClass('form-active');
        $("#docContract").removeClass('validelement');
        $("#ddlDocumentTemplate").addClass('validelement');

        $("#trTemplate").css('display', '');
        $("#trTemplate1").css('display', '');
        $("#trFileUpload").css('display', 'none');
        $("#txtDocumentNameCreate").addClass("validelement");

        $("#formTitle").text('Create From Template');

        var oo = object.parentNode;
    } else {
        $("#tblContentControls").empty();
        $("#tabUpload").addClass('form-active');
        $("#tabTemplate").removeClass('form-active');
        $("#docContract").addClass('validelement');
        $("#ddlDocumentTemplate").removeClass('validelement');

        $("#trTemplate").css('display', 'none');
        $("#trTemplate1").css('display', 'none');
        $("#trFileUpload").css('display', '');
        $("#txtDocumentNameCreate").removeClass("validelement");

        $("#formTitle").text('Upload From Computer');
    }
    $("#ddlDocumentTemplate").val("0");
    $("#txtDocumentNameCreate").val("");

    $("#txtContractRecElementID").val('');
    $("#txtContractRecElement").val('');
    $("#ddlDocumentTypeCreate").val("0");
    $("#ddlDocumentTypeCreate").val("0");//$("#ddlDocumentTypeCreate").find('option[value="Primary Agreement"]').prop("selected", true);
    $("#textDescription").val('');
    $("#txtFolderName").val("");
    $("#txtNewFolderName").val("");

    removeValidations("addEditDocument");
}

$(document).ready(function () {
    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
    var vAccFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "1");
    });
    if (vAccFeat.length > 0) {
        var vConfig = vAccFeat[0].Configuration;
        vProviderDocSign = $(vConfig).find('Provider').text();
        if (vProviderDocSign == "Right Signature")
            RightSignatureFlag = true;
        else
            RightSignatureFlag = false;
    }
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?sortbyfield=ContractTitle&orderby={orderby}',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (contracts) {
            var datalenght = contracts.length;
            for (var i = 0; i < datalenght; i++) {
                var item = contracts[i];

                $("#ddlContractsEdit").append("<option value=" + encodeURI(item.RowKey.trim()) + " class='PreserveSpace'>" + item.ContractTitle.trim() + "</option>");
            }
        }
    });

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/templatedocuments',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (templates) {
            var datalenght = templates.length;
            for (var i = 0; i < datalenght; i++) {
                var item = templates[i];

                $("#ddlReplaceTemplate").append("<option value='" + item.TemplateName + "~" + item.DocumentType + "'>" + item.TemplateName + "</option>");
                $("#ddlDocumentTemplate").append("<option value='" + item.TemplateName + "~" + item.DocumentType + "'>" + item.TemplateName + "</option>");
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
            var datalenght = documenttypes.length;
            for (var i = 0; i < datalenght; i++) {
                var item = documenttypes[i];

                $("#ddlDocumentType").append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>")
                $("#ddlDocumentTypeCreate").append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>")
                $("#filterDocumentType").append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>")
            }
            $("#ddlDocumentTypeCreate").val("0");//$("#ddlDocumentTypeCreate").find('option[value="Primary Agreement"]').prop("selected", true);
        },
        error:
            function (data) {
            }
    });

    BindCC();
    $("#addEditDocument").dialog({
        autoOpen: false, closeText: "",
        width: "75%",
        title: "Document",
        modal: true,
        buttons: {
            "Save": function () {
                modalOnOpenDocument();
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        },
        close: function (event, ui) {
            $("#txtDocumentID").val('');
            $("#ddlDocumentType option").filter(function (index) { return $(this).text() === '--Select--' }).prop('selected', true);
            $("#ddlDocumentTypeCreate option").filter(function (index) { return $(this).text() === '--Select--' }).prop('selected', true);
            $("#ddlDocumentTypeCreate").val("0");//$("#ddlDocumentTypeCreate").find('option[value="Primary Agreement"]').prop("selected", true);
            $("#ddlContractsEdit option").filter(function (index) { return $(this).text() === '--Select--' }).prop('selected', true);

            $("#txtDocumentName").val('');
            $('input[type="radio"][name="IsFinalizedEdit"][value="No"]').prop('checked', true);
            $("#txtAuthorEdit").val("");
            $("#txtDocumentLanguageEdit").val("");
            $("#txtHardCopyPhysicalLocationEdit").val("");
            $("#txtDescription").val('');
            $("#textDescription").val('');
            $("#txtContractRecElementID").val('');
            $("#txtContractRecElement").val('');
            $("#spExt").html('');
            $("#txtDuplicateDocumentName").val('');
            $("#spDuplicateDocumentExt").html('');
        }
    });

    $("#browseFolder").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Select Folder",
        modal: true,
        buttons: {
            "OK": function () { selectfolder(); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $("#EditDocument").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Document",
        modal: true,
        buttons: {
            "Save": function () {
                modalOnOpenDocument();
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        },
        close: function (event, ui) {
            $("#lblCTitleDoc").text('');
            $("#txtIsFolder").val('');
            $("#lblDocumentName").html('');

            $("#txtDocumentID").val('');
            $("#ddlDocumentType option").filter(function (index) { return $(this).text() === '--Select--' }).prop('selected', true);
            $("#ddlDocumentTypeCreate option").filter(function (index) { return $(this).text() === '--Select--' }).prop('selected', true);
            $("#ddlDocumentTypeCreate").val("0");//$("#ddlDocumentTypeCreate").find('option[value="Primary Agreement"]').prop("selected", true);
            $("#ddlContractsEdit option").filter(function (index) { return $(this).text() === '--Select--' }).prop('selected', true);

            $("#txtDocumentName").val('');
            $("#txtAuthorEdit").val("");
            $('input[type="radio"][name="IsFinalizedEdit"][value="No"]').prop('checked', true);
            $("#txtDocumentLanguageEdit").val("");
            $("#txtHardCopyPhysicalLocationEdit").val("");
            $("#textDescription").val('');
            $("#txtContractRecElementID").val('');
            $("#txtContractRecElement").val('');
            $("#spExt").html('');
            $("#txtDuplicateDocumentName").val('');
            $("#spDuplicateDocumentExt").html('');
        }
    });

    $("#viewMetadataDetail").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Detail",
        modal: true,
        buttons: {
            "Close": function () {
                $(this).dialog("close");
            }
        }
    });
    $("#sendForSignature").dialog({
        autoOpen: false, closeText: "",
        width: "75%",
        title: "Send for Signature",
        modal: true,
        buttons: {
            "Send": function () {
                SendForSignature();
            },
            Cancel: function () {
                $(this).dialog("close");
                ClearSignatureForm();
            }
        },
        close: function (event, ui) {

        },
        open: function (event, ui) {
            if (RightSignatureFlag) {
                $("#RightSignDropDown").show();
                $("#SignDocExptxt").hide();
            }
            else {
                $("#RightSignDropDown").hide();
                $("#SignDocExptxt").show();
            }
        }
    });

    $("#shareDocument").dialog({
        autoOpen: false, closeText: "",
        width: "75%",
        title: "Share Document",
        modal: true,
        buttons: {
            "Share": function () {
                ShareDocument();
            },
            Cancel: function () {
                $(this).dialog("close");
                ClearShareForm();
            }
        },
        close: function (event, ui) {
            $(".addmorelinks").show();
        }
    });

    $("#divReplaceDocument").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Replace Document",
        modal: true,
        buttons: {
            "OK": function () { replacedocument(); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });
    $("#browseSigneeUser").dialog({
        autoOpen: false, closeText: "",
        width: "75%",
        title: "User",
        modal: true,
        buttons: {
            "OK": function () {
                SelectedSignee();
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        },
        close: function (event, ui) {

        }
    });

    BindO365LibrarySettings();
    if (getParameterByName('CreateNew') == 'Yes') {
        $('input[type="radio"][name="IsFinalized"][value="Yes"]').prop('checked', true);
        removeValidations('addEditDocument');
        $("#addEditDocument").dialog("option", "title", "New Document");
        $("#addEditDocument").dialog("open");
    }
});



$('#btnAddDocument').click(function () {
    if ($("#showAll").text().indexOf("/") < 0) {
        strDraftDocumentsUrl = '';
        strFinalizedDocumentsUrl = '';
        $("#lblFolderUrl").removeAttr("disabled");
        $("#radioNo").removeAttr("disabled");
        $("#radioYes").removeAttr("disabled");
    }

    $("#tblContentControls").empty();
    $("#ddlDocumentTemplate").val("0");

    $("#txtDocumentID").val("");
    $("#txtDocumentNameCreate").val("");

    $("#lblCTitleDoc").text($("#lblContractTitle").text());

    $("#tabUpload").addClass('form-active');
    $("#tabTemplate").removeClass('form-active');

    $("#spInProgress").css('display', 'none');
    $("#trTemplate").css('display', 'none');
    $("#trTemplate1").css('display', 'none');
    $("#trFileUpload").css('display', '');
    $("#docContract").replaceWith($("#docContract").val('').clone(true));

    $("#leftTab").css('display', '');

    $("#trContracts").css('display', '');
    $("#trfinal").css('display', '');
    $("#trselect").css('display', '');
    $("#trnew").css('display', '');
    $("#trcopy").css('display', '');

    $("#trDuplicate").css('display', 'none');
    $("#trDocumentType").css('display', '');
    $('input[type="radio"][name="IsFinalized"][value="Yes"]').prop('checked', true);
    removeValidations('addEditDocument');
    $("#addEditDocument").dialog("option", "title", "New Document");
    $("#addEditDocument").dialog("open");
    setDocumentUrl();

    $(".nEw_ContRact3").css('display', 'none');
});
$('#btnAddDocument1').click(function () {
    if ($("#showAll").text().indexOf("/") < 0) {
        strDraftDocumentsUrl = '';
        strFinalizedDocumentsUrl = '';
        $("#lblFolderUrl").removeAttr("disabled");
        $("#radioNo").removeAttr("disabled");
        $("#radioYes").removeAttr("disabled");
    }
    $("#txtDocumentID").val("");
    $("#txtDocumentNameCreate").val("");
    $("#lblCTitleDoc").text($("#lblContractTitle").text());

    removeValidations('addEditDocument');
    $("#addEditDocument").dialog("option", "title", "New Document");
    $("#addEditDocument").dialog("open");

});

function modalOnOpenDocument(dialog) {

    var edithref = $(".edit a").attr('href');
    if (edithref == "#edit") {
        $('.ui-button-green-text').parent().attr('disabled', 'disabled');
    }

    var DocumentID = $("#txtDocumentID").val()
    var documentAction = "";
    documentAction = $("#hdnDocumentAction").val()
    if (documentAction != "") {
        if (documentAction == 'replace') {
            $("#ddlDocumentTypeCreate").removeClass('validelement');
            if (requiredValidator("addEditDocument")) {
                $("#loadingPage").fadeIn();
                var formData1 = new FormData();
                var opmlFile = $('#docContract')[0];

                formData1.append("opmlFile", opmlFile.files[0]);
                formData1.append("documentaction", "replace");
                formData1.append("Description", $("#txtDescription").val());
                formData1.append("ContractID", $("#txtContractID").val());
                formData1.append("AccountID", localStorage.AccountID);
                formData1.append("DocumentID", DocumentID);
                formData1.append("ModifiedBy", localStorage.UserName);
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?documentid=' + DocumentID,
                    type: 'PUT',
                    data: formData1,
                    cache: false,
                    contentType: false,
                    headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, 'RefreshToken': localStorage.RefreshToken },
                    processData: false,
                    success: function (document) {
                        $("#ddlDocumentTypeCreate").addClass('validelement');

                        swal({
                            title: '',
                            text: "Document Replaced",

                        },
                           function (confirmed) {
                               if (confirmed) {
                                   location = "/Documents";
                               }

                           });

                    }
                });
            }
            else {
                if (edithref == "#edit") {
                    $('.ui-button-green-text').parent().removeAttr('disabled');
                }
            }
        } else {
            $("#loadingPage").fadeIn();
            var formData2 = new FormData();
            var opmlFile = $('#docContract')[0];

            formData2.append("opmlFile", opmlFile.files[0]);
            formData2.append("documentaction", "duplicate");
            formData2.append("Description", $("#txtDescription").val());

            formData2.append("ContractID", $("#txtContractRecElementID").val());
            formData2.append("ContractTitle", $("#txtContractRecElement").val());
            formData2.append("AccountID", localStorage.AccountID);
            formData2.append("DocumentID", DocumentID);
            formData2.append("DocumentName", $("#txtDuplicateDocumentName").val());
            formData2.append("DocumentExt", $("#spDuplicateDocumentExt").html());
            formData2.append("CreatedBy", localStorage.UserName);
            formData2.append("ModifiedBy", localStorage.UserName);
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?documentid=' + DocumentID,
                type: 'PUT',
                data: formData2,
                cache: false,
                contentType: false,
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, 'RefreshToken': localStorage.RefreshToken },
                processData: false,
                success: function (document) {

                    swal({
                        title: '',
                        text: "Document Duplicated",

                    },
                   function (confirmed) {
                       if (confirmed) {
                           location = "/Documents";
                       }

                   });

                }
            });
        }
    }
    else if (DocumentID != "") {

        if (requiredValidator('EditDocument')) {
            $("#loadingPage").fadeIn();
            var formData3 = new FormData();
            var opmlFile = $('#docContract')[0];
            var vDocumentType = "";
            formData3.append("opmlFile", opmlFile.files[0]);
            formData3.append("AccountID", localStorage.AccountID);
            formData3.append("DocumentID", DocumentID);
            if ($("#ddlContractsEdit").val() != "0") {
                formData3.append("ContractID", $("#ddlContractsEdit").find('option:selected').val());
                formData3.append("ContractTitle", $("#ddlContractsEdit").find('option:selected').text());
            }
            else {
                formData3.append("ContractID", "");
                formData3.append("ContractTitle", "");
            }
            formData3.append("DocumentName", $("#txtDocumentName").val());
            formData3.append("DocumentAuthor", $("#txtAuthorEdit").val());
            formData3.append("DocumentLanguage", $("#txtDocumentLanguageEdit").val());
            formData3.append("HardCopyPhysicalLocation", $("#txtHardCopyPhysicalLocationEdit").val());

            if ($("input:radio[name=IsFinalizedEdit]:checked").val() == "Yes") {
                formData3.append("DocumentLibraryName", "Finalized Documents");
            } else {
                formData3.append("DocumentLibraryName", "Draft Documents");
            }
            formData3.append("Description", $("#textDescription").val());
            formData3.append("DocumentExt", $("#spExt").html());
            if ($("#ddlDocumentType").val() != "0") {
                vDocumentType = $("#ddlDocumentType").val();
            }
            formData3.append("DocumentType", vDocumentType);
            formData3.append("ModifiedBy", localStorage.UserName);
            formData3.append("IsFolder", $("#txtIsFolder").val());
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?documentid=' + DocumentID,
                type: 'PUT',
                data: formData3,
                cache: false,
                contentType: false,
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, 'RefreshToken': localStorage.RefreshToken },
                processData: false,
                success: function (document) {

                    swal({
                        title: '',
                        text: "Document Updated",

                    },
                     function (confirmed) {
                         if (confirmed) {
                             location = "/Documents";
                         }

                     });

                },
                error: function () {

                    swal("", "***err");
                }

            });
        }
        else {
            if (edithref == "#edit") {
                $('.ui-button-green-text').parent().removeAttr('disabled');
            }
        }
    }
    else {
        if (requiredValidator("addNewDocument")) {
            //If uploading file
            if ($("#ddlDocumentTemplate").attr("class").indexOf('validelement') == -1) {
                $("#idDocUploadInProgress").css('display', '');
                $('.ui-button-green-text').parent().attr('disabled', 'disabled');
            }
            if (CheckDocumentExist()) {

                swal("", "Document Exist");
                $('.ui-button-green-text').parent().removeAttr('disabled');
                $("#idDocUploadInProgress").css('display', 'none');
            }
            else {
                $("#loadingPage").fadeIn();
                newDocument();
            }
        }
        else {
            if (edithref == "#edit") {
                $('.ui-button-green-text').parent().removeAttr('disabled');
            }
        }
    }
}


function newDocument() {
    var tblContentControls = $("#formtblContentControls *").serializeArray();
    var formData = new FormData();
    var opmlFile = $('#docContract')[0];
    var vDocumentType = "";

    formData.append("opmlFile", opmlFile.files[0]);
    formData.append("AccountID", localStorage.AccountID);


    formData.append("ContractID", $("#txtContractRecElementID").val());

    formData.append("ContractTitle", "");

    if ($("#ddlDocumentTypeCreate").val() != "0") {
        vDocumentType = $("#ddlDocumentTypeCreate").val();
    }
    formData.append("DocumentType", vDocumentType);
    formData.append("Counterparty", $("#txtCounterpartyCreate").val());

    if ($("#ddlDocumentTemplate").is(":visible")) {
        formData.append("TemplateName", $("#ddlDocumentTemplate").find('option:selected').text());
        formData.append("DocumentName", $("#txtDocumentNameCreate").val());
    } else {
        formData.append("DocumentName", "");
    }


    if ($("input:radio[name=IsFinalized]:checked").val() == "Yes") {
        formData.append("DocumentLibraryName", "Finalized Documents");
    } else {
        formData.append("DocumentLibraryName", "Draft Documents");
    }

    formData.append("LocationURL", $('#lblFolderUrl').text())
    formData.append("FolderName", $('#txtNewFolderName').val().replace(/[\*\|\,\"\:\<\>\[\}\{\}\'\(\)\@\&\$\#\%\.\-\!\@\$]/g, '').replace(/\//g, '').replace(/\s\s+/g, " "))
    formData.append("NewFolderName", $('#txtNewFolderName').val().replace(/[\*\|\,\"\:\<\>\[\}\{\}\'\(\)\@\&\$\#\%\.\-\!\@\$]/g, '').replace(/\//g, '').replace(/\s\s+/g, " "))
    if ($("input:radio[name=rad_Copy]:checked").val() == "Library") {
        formData.append("DocumentLocation", "Office 365 Document Library");
    } else {
        formData.append("DocumentLocation", "Office 365 Document Library & eContracts Cloud");
    }

    formData.append("DocumentLanguage", $("#txtDocumentLanguage").val());
    formData.append("HardCopyPhysicalLocation", $("#txtHardCopyPhysicalLocation").val());
    formData.append("DocumentAuthor", $("#txtAuthor").val());
    formData.append("CreatedBy", localStorage.UserName);
    formData.append("ModifiedBy", localStorage.UserName);

    if (tblContentControls != null) {
        var tblContentControlslength = tblContentControls.length;
        for (var i = 0; i < tblContentControlslength; i++)
            formData.append(tblContentControls[i].name, tblContentControls[i].value);
    }
    formData.append("Description", $("#txtDescription").val());
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents',
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName, 'RefreshToken': localStorage.RefreshToken },
        processData: false,
        success: function (person) {
            $("#idDocUploadInProgress").css('display', 'none');
            $('.ui-button-green-text').parent().removeAttr('disabled');
            if ($("#ddlDocumentTemplate").attr("class").indexOf('validelement') >= 0) {

                swal("", "New document generation from template in progress. Please check in a few minutes.");
                $("#addEditDocument").dialog("close");
                $("#ddlDocumentTypeCreate").val("0");
                //$("#ddlDocumentTypeCreate").find('option[value="Primary Agreement"]').prop("selected", true);
                $("#ddlDocumentTemplate").val("0");
                $("#txtDocumentNameCreate").val("");
                $("#textDescription").val('');
                $('#txtFolderName').val("");
                $('#txtNewFolderName').val("");
                $("#loadingPage").fadeOut();
            }
            else {

                swal({
                    title: '',
                    text: "Document Uploaded.",

                },
                function (confirmed) {
                    if (confirmed) {
                        location = "/Documents";
                    }

                });
            }
        },
        error: function (person) {
            $("#idDocUploadInProgress").css('display', 'none');
            $('.ui-button-green-text').parent().removeAttr('disabled');
        }
    });
}

function CheckDocumentExist() {
    var isExist = false;
    if ($("#ddlDocumentTemplate").is(":visible")) {
        isExist = false;
    }
    else {
        var vDocURL = localStorage.SPHostUrl + $('#lblFolderUrl').text() + $('#docContract')[0].files[0].name;
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?docurl=' + vDocURL,
            type: 'GET',
            dataType: 'json',
            'Content-Type': 'application/json',
            cache: false,
            async: false,
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            success: function (folder) {
                isExist = true;
            },
            error:
                function (data) {
                    isExist = false;
                }
        });
    }
    return isExist;
}

function newDocument2() {
    var formData = new FormData();
    var opmlFile = $('#docContract')[0];
    var vDocumentType = "";

    formData.append("opmlFile", opmlFile.files[1]);
    formData.append("AccountID", localStorage.AccountID);


    formData.append("ContractID", $("#txtContractRecElementID").val());
    formData.append("ContractTitle", "");

    if ($("#ddlDocumentTypeCreate").val() != "0") {
        vDocumentType = $("#ddlDocumentTypeCreate").val();
    }
    formData.append("DocumentType", vDocumentType);

    if ($("#ddlDocumentTemplate").is(":visible")) {
        formData.append("TemplateName", $("#ddlDocumentTemplate").find('option:selected').text());
        formData.append("DocumentName", $("#txtDocumentNameCreate").val())

    } else {
        formData.append("DocumentName", "")
    }


    if ($("input:radio[name=IsFinalized]:checked").val() == "Yes") {
        formData.append("DocumentLibraryName", "Finalized Documents");
        if ($('#txtFolderName').val() != "") {
            formData.append("LocationURL", $('#txtFolderName').val())
            formData.append("FolderName", $('#txtFolderName').val())
        } else {
            formData.append("LocationURL", "Finalized Documents")
            formData.append("FolderName", $('#txtNewFolderName').val())
            formData.append("NewFolderName", $('#txtNewFolderName').val())
        }

    } else {
        formData.append("DocumentLibraryName", "Draft Documents");
        if ($('#txtFolderName').val() != "") {
            formData.append("LocationURL", $('#txtFolderName').val())
            formData.append("FolderName", $('#txtFolderName').val())
        } else {
            formData.append("LocationURL", "Draft Documents")
            formData.append("FolderName", $('#txtNewFolderName').val())
            formData.append("NewFolderName", $('#txtNewFolderName').val())
        }
    }

    if ($("input:radio[name=rad_Copy]:checked").val() == "Library") {
        formData.append("DocumentLocation", "Office 365 Document Library");
    } else {
        formData.append("DocumentLocation", "Office 365 Document Library & eContracts Cloud");
    }

    formData.append("CreatedBy", localStorage.UserName);
    formData.append("ModifiedBy", localStorage.UserName);

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents',
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName, 'RefreshToken': localStorage.RefreshToken },
        processData: false,
        success: function (person) {
            if ($("#ddlDocumentTemplate").attr("class").indexOf('validelement') >= 0) {

                swal("", "Document generation is inprogress.");
                $("#addEditDocument").dialog("close");
                $("#ddlDocumentTypeCreate").val("0");
                //$("#ddlDocumentTypeCreate").find('option[value="Primary Agreement"]').prop("selected", true);
                $("#textDescription").val('');
                $("#ddlDocumentTemplate").val("0");
                $("#txtDocumentNameCreate").val("");
                $('#txtFolderName').val("");
                $('#txtNewFolderName').val("");
            }
            else {

                swal({
                    title: '',
                    text: "Document Uploaded.",

                },
                  function (confirmed) {
                      if (confirmed) {
                          location = "/Documents";
                      }

                  });

            }
        }
    });
}

$('#btnSelectFolder').click(function () {

    $("#browseFolder").dialog("option", "title", "Select Folder");
    $("#browseFolder").dialog("open");

});

function selectfolder() {

    $("#browseFolder").dialog("close");
}

function CreateFolder() {
    $('#load').html('<img src="../Content/Images/icon/loading.gif"> Working on it...');
    var newurl = "";
    if ($("input:radio[name=IsFinalized]:checked").val() == "Yes") {
        newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/folderstructure?documentlibrary=Finalized Documents'
    } else {
        newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/folderstructure?documentlibrary=Draft Documents'
    }

    $.ajax({
        url: newurl,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (folder) {
            //$('#load').empty();
            //var inline2 = new kendo.data.HierarchicalDataSource({
            //    data: folder,
            //    schema: {
            //        model: {
            //            children: "childrenData"
            //        }
            //    }
            //});
            //var treeview = $("#treeviewFolder").kendoTreeView({
            //    template: kendo.template($("#treeviewFolder-template").html()),

            //    dataSource: inline2,
            //    loadOnDemand: false,
            //    schema: {
            //        model: {
            //            id: "RowKey",
            //            fields: {
            //                Folder: "Folder",
            //                FolderURL: "FolderURL"
            //            }
            //        }
            //    },
            //    select: function (e) {
            //        e.preventDefault();
            //        var tree = $('#treeviewFolder').data('kendoTreeView');
            //        var dataItem = tree.dataItem(e.node);
            //        var strFolderUrl = dataItem.FolderURL + "/";
            //        if (dataItem.FolderURL.indexOf('Draft Documents') != -1) {
            //            $('#lblFolderUrl').text('/Draft Documents/' + strFolderUrl.split('/Draft Documents/')[1])
            //        } else {
            //            $('#lblFolderUrl').text('/Finalized Documents/' + strFolderUrl.split('/Finalized Documents/')[1])
            //        }
            //    }
            //}).data("kendoTreeView");
            //treeview.expand(".k-item");
        },
        error:
            function (data) {
            }
    });
}
$(document).ready(function () {

    $("#addNewView").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Add View",
        modal: true,
        resizable: true,
        buttons: {
            "Save": function () { SaveView(); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $('#btnAddView').click(function () {
        $("#txtViewID").val("");
        $("#txtViewName").val("");

        $("#addNewView").dialog("option", "title", "New View");
        $("#addNewView").dialog("open");
    });

    FilterDocuments("Finalized Documents");
    GetSavedViews();
});

function GetSavedViews() {
    $('#liDocumentViews').empty();
    //Get Contract views
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/savedview?viewfor=Document&userid=',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            $("#liDocumentViews").empty();
            var datalenght = data.length;
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];


                var article = '<li><p><a href="javascript:void(0)" onclick="javascript:savedViewDisplay(this)" id=' + item.RowKey + ' name=' + item.ViewName + '>' + item.ViewName + '</a></p><a href="javascript:void(0);"><img title="Delete" src="../Content/Images/close-quick.png" onclick="deleteSavedView(this)" id=' + item.RowKey + ' /></a></li>';
                $("#liDocumentViews").append(article);
            }

        },
        error:
            function (data) {
                $('#liDocumentViews').empty();
                $("#liDocumentViews").append('<p class="f_p-error">No View Available</p>');
            }
    });
}

function deleteSavedView(n) {
    var viewName = $("#" + n.id).attr('name');
    swal({
        title: '',
        text: "Are you sure that you want to <span style=\"font-weight:700\">delete</span> this view?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        html: true
    },
function (confirmed) {
    if (confirmed) {
        var viewId = n.id;
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/savedview?viewid=' + viewId,
            type: 'DELETE',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
            cache: false,
            success: function (data) {

                swal("", data);
                GetSavedViews();
            }
        });
    }
    return;
});



}
function showalldocuments() {
    $("#launcher4").css('display', '');

    $("#txtSearchBox").css('display', '');
    colorLink('spnAllDocuments', true);
    colorLink('spnFinalizedDocuments', false);
    colorLink('spnDraftDocuments', false);
    $("#showAll").empty();
    $("#showAll").append('Showing All Documents');
    $("#footerPage").css('display', '');

    $('#listDocuments').html('<img src="../Content/Images/icon/loading.gif">');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/documentswithoutchild',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            $("#compact-pagination").css('display', '');
            $('#listDocuments').empty();
            GenerateListOfDocuments(data, false, true);
        },
        error:
            function (data) {
                $('#listDocuments').empty();
                $("#listDocuments").append('<p class="f_p-error">No Documents Available</p>');
                $("#compact-pagination").css('display', 'none');
            }
    });
}

function quickViewDisplay(obj) {
    colorLink('liDocumentViews a', false);
    colorLink('spnAllDocuments', false);
    selectedSortOption = "";
    $("#liFiltersSearchText").empty();
    $("#showAll").empty();
    $("#liFiltersDocumentType").empty();
    $("#liFiltersLibraryName").empty();
    $("#liFiltersCreationMode").empty();
    $("#filterDocumentType option:selected").prop('selected', false);
    $("#filterLibraryName option:selected").prop('selected', false);
    $("#filterCreationMode option:selected").prop('selected', false);
    $('#tdSort a').each(function (i, item) {
        item.style.backgroundColor = "";
    });
    $("#liFiltersQuickView").empty();
    $('#liFiltersQuickView').html('<li style="display:inline;">' + 'Showing search result for : ' + obj + '<img title="Remove" onclick="javascript:liRemove(this);" style="margin-left: 5px; margin-right: 10px; cursor:pointer;" src="../Content/Images/icon/close.png" /></li>');
    $('#liFiltersQuickView').css('display', 'none');

    if (obj == "Finalized") {
        FilterDocuments("Finalized Documents");
        colorLink('spnFinalizedDocuments', true);
        colorLink('spnDraftDocuments', false);
    }
    else if (obj == "Draft") {
        FilterDocuments("Draft Documents");
        colorLink('spnFinalizedDocuments', false);
        colorLink('spnDraftDocuments', true);
    }

    $("#launcher4").css('display', 'none');
    $("#btnAddView").css('display', 'none');
    $("#txtSearchBox").css('display', 'none');

    $("#showAll").css('display', 'inline');
    $("#showAll").html('Showing ' + obj + ' Documents<img title="Remove" onclick="javascript:showalldocuments();" style="margin-left: 5px; margin-right: 10px; cursor:pointer;" src="../Content/Images/icon/close.png" />');
}

function colorLink(objId, tobecolored) {
    if (tobecolored) {
        $('#' + objId).addClass("active_quick_view");
    }
    else {
        $('#' + objId).removeClass("active_quick_view");
    }
}

function FilterDocuments(libName) {
    var customQuery = "DocumentLibraryName:" + libName;

    $("#listDocuments").empty();

    newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?showparent=true&searchkeyword=' + encodeURIComponent($("#txtSearchBox").val()) + '&customquery=' + customQuery + '&sortbyfield=Timestamp&orderby=DESC';
    $('#listDocuments').html('<img src="../Content/Images/icon/loading.gif">');
    $.ajax({
        url: newurl,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            $("#compact-pagination").css('display', '');
            $('#listDocuments').empty();
            GenerateListOfDocuments(data, false, false);
        },
        error:
            function (data) {
                $("#listDocuments").empty();
                $("#listDocuments").append('<p class="f_p-error">No Documents Available</p>');
                $("#compact-pagination").css('display', 'none');
            }
    });
}

function showfolderdocuments(obj) {
    $("#footerPage").css('display', 'none');
    strDraftDocumentsUrl = '/Draft Documents/' + obj.text;
    strFinalizedDocumentsUrl = '/Finalized Documents/' + obj.text;
    if ($("#showAll").text().indexOf("/") >= 0) {
        if (obj.hash == "##") {
            $("#showAll").append(' / <a href="javascript:void(0)" id=' + obj.id + ' onclick="javascript:showfolderdocuments(this);">' + obj.text + '</a>');
        }
    } else {
        $("#showAll").empty();
        if ($("#spnFinalizedDocuments").hasClass("active_quick_view")) {
            $("#showAll").append('<a href="javascript:void(0)" onclick="javascript:quickViewDisplay(this);">Finalized Documents</a> / <a href="javascript:void(0)" id=' + obj.id + ' onclick="javascript:showfolderdocuments(this);">' + obj.text + '</a>');
        }
        else if ($("#spnDraftDocuments").hasClass("active_quick_view")) {
            $("#showAll").append('<a href="javascript:void(0)" onclick="javascript:quickViewDisplay(this);">Draft Documents</a> / <a href="javascript:void(0)" id=' + obj.id + ' onclick="javascript:showfolderdocuments(this);">' + obj.text + '</a>');
        }
        else {
            $("#showAll").append('<a href="javascript:void(0)" onclick="javascript:FilterDocuments(this);">All</a> / <a href="javascript:void(0)" id=' + obj.id + ' onclick="javascript:showfolderdocuments(this);">' + obj.text + '</a>');
        }
    }

    $('#listDocuments').html('<img src="../Content/Images/icon/loading.gif">');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/documentsinfolder?parentfolderid=' + obj.id,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID },
        success: function (data) {
            $("#compact-pagination").css('display', '');
            $('#listDocuments').empty();
            GenerateListOfDocuments(data, false, true);
        },
        error:
            function (data) {
                $('#listDocuments').empty();
                $("#listDocuments").append('<p class="f_p-error">No Documents Available</p>');
                $("#compact-pagination").css('display', 'none');
            }
    });
}
function SaveView() {
    if ($("#txtViewName").val() == "") {

        swal("", "Enter View Name.");
    }
    else {
        var query = "";
        $("#liFiltersDocumentType span").each(function (i, item) {
            query += "DocumentType:";
            var str = item.textContent;
            query += ",";

        });
        query = query.substring(0, query.length - 1)
        query += ";";
        $("#liFiltersLibraryName span").each(function (i, item) {
            query += "DocumentLibraryName:";
            var str = item.textContent;
            query += str + ',';
        });
        query = query.substring(0, query.length - 1)
        query += ";";
        $("#liFiltersCreationMode span").each(function (i, item) {
            query += "CreationMode:";
            var str = item.textContent;
            query += str + ',';

        });
        query = query.substring(0, query.length - 1)
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/savedview',
            type: 'POST',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
            data: {
                RowKey: $("#txtViewID").val(),
                ViewName: $("#txtViewName").val(),
                SearchKeyword: $("#txtSearchBox").val(),
                SortBy: '',
                ViewFor: "Document",
                ViewQuery: query,
                CreatedBy: localStorage.UserName,
                ModifiedBy: localStorage.UserName
            },
            cache: false,
            success: function (person) {
                $("#txtViewName").val("")
                GetSavedViews();
                $("#addNewView").dialog("close");
            }
        });
    }
}
function setBlankValueToHyphen(tableId) {
    $('#' + tableId + ' tr td').each(function () {
        var cellText = $(this).html();
        if (cellText == '' || cellText == '0') {
            $(this).html('-');
        }


    });
}
function contextMenuWork(action, el, pos) {

    switch (action) {
        case "delete":
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
               url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?documentid=' + documentID,
               type: 'DELETE',
               dataType: 'json',
               "Content-Type": "application/json",
               headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
               cache: false,
               success: function (data) {

                   $("#loadingPage").fadeOut();

                   swal({
                       title: '',
                       text: "Document Deleted",

                   },
                      function (confirmed) {
                          if (confirmed) {
                              location = "/Documents";
                          }

                      });

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
                var IsFolder = $(el).find("#IsFolder").text();
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?documentid=' + documentID,
                    type: 'GET',
                    dataType: 'json',
                    "Content-Type": "application/json",
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    cache: false,
                    success: function (documententity) {
                        $("#txtDocumentID").val(documententity.RowKey);
                        $("#textDescription").val(documententity.Description);
                        var vDocName = documententity.DocumentName.split('.');
                        $("#txtDocumentName").val(vDocName[0]);
                        $("#txtAuthorEdit").val(documententity.DocumentAuthor);
                        $("#txtDocumentLanguageEdit").val(documententity.DocumentLanguage);
                        $("#txtHardCopyPhysicalLocationEdit").val(documententity.HardCopyPhysicalLocation);
                        $("#spExt").html(vDocName[1]);
                        var vDocumentLibraryName = documententity.DocumentLibraryName;
                        if (vDocumentLibraryName != '' && vDocumentLibraryName != null) {
                            if (vDocumentLibraryName == "Finalized Documents") {
                                $('input[type="radio"][name="IsFinalizedEdit"][value="Yes"]').prop('checked', true);
                            }
                        }
                        $("#ddlDocumentType option").filter(function (index) { return $(this).text() === documententity.DocumentType; }).prop('selected', true);
                        $("#ddlContractsEdit option").filter(function (index) { return $(this).val() === documententity.ContractID; }).prop('selected', true);
                    }
                });

                $("#trFileUpload").css("display", "none");

                $("#lblCTitleDoc").text($("#lblContractTitle").text());
                $("#txtIsFolder").val(IsFolder);
                if (IsFolder == "True") {
                    $("#EditDocument").dialog("option", "title", "Edit Folder");
                    $("#lblDocumentName").html('Folder Name');
                    $("#trDocumentTypeEdit").css('display', 'none');
                    $('#trContractTitle').css('display', '');
                } else {
                    $("#EditDocument").dialog("option", "title", "Edit Document Metadata");
                    $("#lblDocumentName").html('Document Name');
                    $("#trDocumentTypeEdit").css('display', '');
                    $('#trContractTitle').css('display', 'none');
                }
                $("#EditDocument").dialog("open");
                break;
            }
        case "replace":
            {
                var documentID = $(el).find("#DocumentID").text();
                $('#hdDocumentID').val(documentID);
                $('#txtContractID').val($(el).find("#sContractid").text());
                $("#divReplaceDocument").dialog("option", "title", "Replace Document");
                $("#divReplaceDocument").dialog("open");
                break;
            }
        case "duplicate":
            {

                $("#txtDocumentID").val($(el).find("#DocumentID").text());

                $("#trFileUpload").css('display', 'none');
                $("#trDuplicate").css('display', '');
                $("#leftTab").css('display', 'none');
                $("#trContracts").css('display', '');
                $("#trTemplate").css('display', 'none');
                $("#trTemplate1").css('display', 'none');

                $("#trfinal").css('display', '');
                $("#trselect").css('display', '');
                $("#trnew").css('display', '');
                $("#trcopy").css('display', '');

                $("#trDocumentType").css('display', 'none');

                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?documentid=' + $(el).find("#DocumentID").text(),
                    type: 'GET',
                    dataType: 'json',
                    "Content-Type": "application/json",
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    cache: false,
                    success: function (documententity) {
                        var vDocName = documententity.DocumentName.split('.');
                        $("#txtDuplicateDocumentName").val('Copy of ' + vDocName[0]);
                        $("#txtDescription").val(documententity.Description);
                        $("#spDuplicateDocumentExt").html(vDocName[1]);

                        if (documententity.IsFinalized == "Yes") {
                            $('input[name="IsFinalized"][value="Yes"]').prop('checked', true);
                        }

                        if (documententity.DocumentUrl != null) {
                            var vs = "";
                            for (var vr = 3; vr < documententity.DocumentUrl.split('/').length - 1; vr++) {
                                vs += '/' + documententity.DocumentUrl.split('/')[vr];
                            }
                            $('#txtFolderName').val(vs);
                        }
                    }
                });


                $("#hdnDocumentAction").val('duplicate');
                $("#addEditDocument").dialog("option", "title", "Duplicate Document");
                $("#addEditDocument").dialog("open");
                break;
            }
        case "download":
            {
                var LinkURL = $(el).find("a").attr('href');
                var SourceUrl = "";
                if (LinkURL == "#") {
                    SourceUrl = $(el).find("a").attr('seqe')
                } else {
                    SourceUrl = getQueryStringFromValue(LinkURL, 'sourcedoc');
                    //SourceUrl = encodeURIComponent(SourceUrl);
                    var formatarray = "doc,xls,ppt,docx,xlsx,pptx,dotx";
                    var filename = SourceUrl;
                    filename = filename.split("/").pop().split(".").pop();
                    if ($.inArray(filename, formatarray.split(',')) > -1) {
                        SourceUrl = encodeURIComponent(SourceUrl);
                    }
                    else {
                        SourceUrl = decodeURIComponent(SourceUrl);
                        SourceUrl = encodeURIComponent(SourceUrl);
                    }
                }
                location = localStorage.SPHostUrl + "/_layouts/15/download.aspx?SourceUrl=" + SourceUrl;
                break;
            }
        case "viewdetails":
            {
                $("#loadingPage").fadeIn();
                $("#docMetadata").addClass('pop_up__Acti');
                $("#docActivities").removeClass('pop_up__Acti');

                var documentID = $(el).find("#DocumentID").text();
                $("#tblMetadataDetail").empty();
                $('#tblMetadataDetail').append('<tr><td><img src="../Content/Images/icon/loading.gif"/></td></tr>');
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?documentid=' + documentID,
                    type: 'GET',
                    dataType: 'json',
                    "Content-Type": "application/json",
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    cache: false,
                    success: function (documententity) {
                        var vMetadata = '<tr>';
                        vMetadata += '<td class="text_label width40">Document Name</td>';
                        vMetadata += '<td class="text width60">' + documententity.DocumentName + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40">Description</td>';
                        vMetadata += '<td class="text width60">' + documententity.Description + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40">Document Type</td>';
                        vMetadata += '<td class="text width60">' + documententity.DocumentType + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40">Document Author</td>';
                        vMetadata += '<td class="text width60">' + documententity.DocumentAuthor + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40">Document Language</td>';
                        vMetadata += '<td class="text width60">' + documententity.DocumentLanguage + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40">Hard-copy Physical Location</td>';
                        vMetadata += '<td class="text width60">' + documententity.HardCopyPhysicalLocation + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40">Folder (show path)</td>';
                        vMetadata += '<td class="text width60">' + documententity.DocumentUrl + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40">Business Area</td>';
                        vMetadata += '<td class="text width60">' + documententity.BusinessArea + '</td>';
                        vMetadata += '</tr>';
                        var strIsFinalized = "No";
                        var strIsFinalizedBy = "-";
                        if (documententity.IsFinalized == "Yes") {
                            strIsFinalized = "Yes";
                            strIsFinalizedBy = documententity.FinalizedBy;
                        }
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40">Finalized (Yes no)</td>';
                        vMetadata += '<td class="text width60">' + strIsFinalized + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40">Finalized/Ready for Signature By</td>';
                        vMetadata += '<td class="text width60">' + strIsFinalizedBy + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40">Document Version</td>';
                        vMetadata += '<td class="text width60">' + documententity.VersionNo + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40">Created by</td>';
                        vMetadata += '<td class="text width60">' + documententity.CreatedBy + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40">Created Date</td>';
                        vMetadata += '<td class="text width60">' + moment(new Date(documententity.Created)).format('Do MMM YYYY') + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40">Last Updated</td>';
                        vMetadata += '<td class="text width60">' + moment(new Date(documententity.Modified)).format('Do MMM YYYY') + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40">Shared with</td>';
                        vMetadata += '<td class="text width60">' + '' + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40">Reviewed by</td>';
                        vMetadata += '<td class="text width60">' + documententity.Reviewers + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40">Signed by</td>';
                        vMetadata += '<td class="text width60">' + documententity.Signee + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40">Document File Size</td>';
                        vMetadata += '<td class="text width60">' + documententity.FileSize + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40">Document Format</td>';
                        vMetadata += '<td class="text width60">' + documententity.DocumentFormat + '</td>';
                        vMetadata += '</tr>';



                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40">Creation Mode</td>';
                        vMetadata += '<td class="text width60">' + documententity.CreationMode + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40">Valid From</td>';
                        vMetadata += '<td class="text width60">' + documententity.ValidFrom + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40">Valid Till</td>';
                        vMetadata += '<td class="text width60">' + documententity.ValidTill + '</td>';
                        vMetadata += '</tr>';
                        $("#tblMetadataDetail").empty();
                        $("#tblMetadataDetail").append(vMetadata);
                        setBlankValueToHyphen("tblMetadataDetail");
                        $("#loadingPage").fadeOut();
                        $("#viewMetadataDetail").dialog("option", "title", "Document Details");
                        $("#viewMetadataDetail").dialog("open");
                    },
                    error: function () {

                    }
                });
                $("#documentLogs").empty();
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/activities?objecttype=&objectid=' + documentID + '&actiontype=',
                    type: 'GET',
                    dataType: 'json',
                    "Content-Type": "application/json",
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    cache: false,
                    success: function (activities) {
                        var datalenght = activities.length;
                        for (var i = 0; i < datalenght; i++) {
                            var item = activities[i];
                            var sObject = item.Object;
                            var sActivity = item.Activity;
                            var sUserID = item.UserID;
                            var sTimestamp = moment(new Date(item.Timestamp)).format('Do MMM, h:mm A');

                            var article = '<article class="box1">';
                            article += '<div>';
                            article += '<p class="text">' + sTimestamp;
                            article += '  ' + sActivity + '</p>';
                            article += '</div>';
                            article += '</article>';
                            $("#documentLogs").append(article);
                        }
                        $('#compact-pagination-documentLogs').pagination({
                            items: activities.length,
                            itemsOnPage: 15,
                            type: 'div',
                            typeID: 'documentLogs',
                            row: 'article',
                            cssStyle: 'compact-theme'
                        });
                    },
                    error: function () {

                    }
                });

                break;
            }
        case "final":
            {
                //Check if document is having any revisions
                var isrevisionexists = false;
                var LinkURL = $(el).find("a").attr('href');
                var DocumentUrl = getQueryStringFromValue(LinkURL, 'sourcedoc');
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/revisionexists?docurl=' + DocumentUrl,
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
                        text: "Revisions (comments or track changes) exists inside the document, do you really want to mark this document as Finalized/Ready for Signature?",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Yes',
                        cancelButtonText: 'No',
                        html: true
                    },
                 function (confirmed) {
                     if (confirmed) {
                         var entityid = $(el).find("#DocumentID").text();
                         $("#loadingPage").fadeIn();
                         $.ajax({
                             url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/MarkFinal?documentid=' + entityid,
                             type: 'PUT',
                             cache: false,
                             contentType: false,
                             headers: {
                                 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, 'RefreshToken': localStorage.RefreshToken
                             },
                             processData: false,
                             success: function (document) {
                                 $("#loadingPage").fadeOut();
                                 swal({
                                     title: '',
                                     text: "Document Marked as Final",
                                 },
                                   function (confirmed) {
                                       if (confirmed) {
                                           location = "/Documents";
                                       }
                                   });
                             }
                         });
                     }
                     return;
                 });
                } else {
                    swal({
                        title: '',
                        text: "Do you really want to mark this document as final?",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Yes',
                        cancelButtonText: 'No',
                        html: true
                    },
                    function (confirmed) {
                        if (confirmed) {
                            var entityid = $(el).find("#DocumentID").text();
                            $("#loadingPage").fadeIn();
                            $.ajax({
                                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/MarkFinal?documentid=' + entityid,
                                type: 'PUT',
                                cache: false,
                                contentType: false,
                                headers: {
                                    'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, 'RefreshToken': localStorage.RefreshToken
                                },
                                processData: false,
                                success: function (document) {
                                    $("#loadingPage").fadeOut();
                                    swal({
                                        title: '',
                                        text: "Document Marked as Final",
                                    },
                                      function (confirmed) {
                                          if (confirmed) {
                                              location = "/Documents";
                                          }
                                      });
                                }
                            });
                        }
                        return;
                    });
                }
                break;
            }
        case "signature":
            {
                ClearSignatureForm();
                var documentName = $(el).find("#DocumentName").text();
                var sentForSign = $(el).find("#SentForSign").text();

                if (sentForSign == '') {
                    var DocumentUrl = $(el).find("#DocumentUrl").text();
                    var documentID = $(el).find("#DocumentID").text();
                    var sContractid = $(el).find("#sContractid").text();

                    $("#hdDocumentID").val(documentID);
                    $("#hdDocumentURL").val(DocumentUrl);
                    $("#tdDocument").html("<b>" + documentName + "</b>");
                    if (sContractid != "") {
                        getNameAndEmailSignDocument(sContractid);
                    }
                    $("#sendForSignature").dialog("open");
                }
                else {

                    swal("", "This document has already been sent for signature: " + sentForSign);
                }
                break;
            }
        case "editO365":
            {
                var LinkURL = $(el).find("a").attr('href');
                window.open(LinkURL);
                break;
            }
        case "sharelink":
            {
                //ClearShareForm();
                //var documentName = $(el).find("#DocumentName").text();
                //var DocumentUrl = $(el).find("#DocumentUrl").text();
                //var documentID = $(el).find("#DocumentID").text();
                //var sContractid = $(el).find("#sContractid").text();
                //$("#hdDocumentID").val(documentID);
                //$("#hdDocumentURL").val(DocumentUrl);
                //$("#tdShareDocument").html("<b>" + documentName + "</b>");
                //if (sContractid != "") {
                //    getSigneeNameandEmailId(sContractid, "sharelink");
                //}
                //$("#shareDocument").dialog("open");
                //break;
                var documentStatus = $(el).find("b").attr('title');
                if (documentStatus != "In Negotiation") {
                    //Check if document is having any comments
                    var isrevisionexists = false;
                    var LinkURL = $(el).find("a").attr('href');
                    var DocumentUrl = $(el).find("#DocumentUrl").text();
                    $.ajax({
                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/revisionexists?docurl=' + DocumentUrl,
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
                                     },
                                     error: function () {

                                     }
                                 });
                                 if (vUserListwithEmail == "") {
                                     GetUserList();
                                     $("#ddlDocumentShareInternal").append(vUserListwithEmail);
                                     $("#ddlDocumentShareInternal").chosen().trigger("chosen:updated");
                                 }
                                 else {
                                     $("#ddlDocumentShareInternal").append(vUserListwithEmail);
                                     $("#ddlDocumentShareInternal").chosen().trigger("chosen:updated");
                                 }
                                 GetValuesAndAutoPopulate("ddlDocumentShareInternal", "");
                                 ClearShareForm();
                                 var documentName = $(el).find("#DocumentName").text();
                                 var documentID = $(el).find("#DocumentID").text();
                                 var sContractid = $(el).find("#sContractid").text();
                                 $("#hdDocumentID").val(documentID);
                                 $("#hdDocumentURL").val(DocumentUrl);
                                 $("#tdShareDocument").html("<b>" + documentName + "</b>");
                                 if (sContractid != "") {
                                     getSigneeNameandEmailId(sContractid, "sharelink");
                                     getShareNameandEmailIdInternal(sContractid, "ddlDocumentShareInternal");
                                 }
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
                            },
                            error: function () {

                            }
                        });
                        ClearShareForm();
                        var LinkURL = $(el).find("a").attr('href');
                        //var DocumentUrl = $(el).find("#DocumentUrl").text();
                        var documentName = $(el).find("#DocumentName").text();
                        var documentID = $(el).find("#DocumentID").text();
                        var sContractid = $(el).find("#sContractid").text();
                        $("#hdDocumentID").val(documentID);
                        $("#hdDocumentURL").val(DocumentUrl);
                        $("#tdShareDocument").html("<b>" + documentName + "</b>");
                        if (sContractid != "") {
                            getSigneeNameandEmailId(sContractid, "sharelink");
                            getShareNameandEmailIdInternal(sContractid, "ddlDocumentShareInternal");
                        }
                        $("#shareDocument").dialog("open");
                    }
                }
                else {
                    swal("", "Document negotiation is in progress for this document.");
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
                $("#dvTodo").dialog("open");
                $('#ddlTodoType').attr('disabled', 'disabled');
                fnChangeAssignedToText();
                break;
            }
        case "review":
            {
                var documentName = $(el).find("#DocumentName").text();
                var documentID = $(el).find("#DocumentID").text();
                $("#txtTodoTitle").val('Review for ' + documentName.split('.')[0]);
                $("#ddlTodoType option").filter(function (index) { return $(this).text() === "Document Review"; }).prop('selected', true);
                $("#txtBrowseElement").val(documentName);
                $("#txtBrowseElementID").val(documentID);
                $("#trBrowse").css("display", "");
                $("#browse").css("display", "none");
                $("#tdBrowseElement").html("Documents");
                $("#dvTodo").dialog("open");
                $('#ddlTodoType').attr('disabled', 'disabled');
                fnChangeAssignedToText();
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
                headers: { 'eContracts-ApiKey': localStorage.APIKey },
                cache: false,
                success: function (data) {
                    var datalenght = data.length;
                    for (var i = 0; i < datalenght; i++) {
                        var item = data[i];
                        var article = "";
                        article += '<tr>';
                        article += '<td>' + item.VersionNo + '</td>';
                        article += '<td>' + moment(new Date(item.Modified)).format('MM/DD/YYYY') + '</td>';
                        article += '<td>' + item.ModifiedBy + '</td>';
                        article += '</tr>';
                        $("#tblVersionHistory").append(article);
                    }

                    var vCount = data.length;
                    $('#compact-paginationVersionHistory').pagination({
                        items: vCount,
                        itemsOnPage: 10,
                        type: 'tbody',
                        row: 'tr',
                        typeID: 'tblVersionHistory',
                        cssStyle: 'compact-theme'
                    });
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
function contextMenuWorkFolder(action, el, pos) {

    switch (action) {
        case "open":
            {
                var documentName = $(el).find("#DocumentName").text();
                var documentID = $(el).find("#DocumentID").text();
                var documentLibraryName = $(el).find("#DocumentLibraryName").text();
                if (documentLibraryName == 'Draft Documents') {
                    $("#radioNo").attr('checked', 'checked');
                }
                else {
                    $("#radioYes").attr('checked', 'checked');
                }
                $("#radioNo").prop("disabled", true);
                $("#radioYes").prop("disabled", true);
                $("#lblFolderUrl").prop("disabled", true);
                var LinkURL = $("#" + documentID)[0];
                showfolderdocuments(LinkURL);

                break;
            }
        case "addnew":
            {
                var documentName = $(el).find("#DocumentName").text();
                var documentID = $(el).find("#DocumentID").text();
                var documentLibraryName = $(el).find("#DocumentLibraryName").text();
                if (documentLibraryName == 'Draft Documents') {
                    $("#radioNo").attr('checked', 'checked');
                }
                else {
                    $("#radioYes").attr('checked', 'checked');
                }
                $("#radioNo").prop("disabled", true);
                $("#radioYes").prop("disabled", true);
                $("#lblFolderUrl").prop("disabled", true);
                $("#tblContentControls").empty();
                $("#ddlDocumentTemplate").val("0");

                $("#txtDocumentID").val("");
                $("#txtDocumentNameCreate").val("");

                $("#lblCTitleDoc").text($("#lblContractTitle").text());

                $("#tabUpload").addClass('form-active');
                $("#tabTemplate").removeClass('form-active');

                $("#spInProgress").css('display', 'none');
                $("#trTemplate").css('display', 'none');
                $("#trTemplate1").css('display', 'none');
                $("#trFileUpload").css('display', '');
                $("#docContract").replaceWith($("#docContract").val('').clone(true));

                $("#leftTab").css('display', '');

                $("#trContracts").css('display', '');
                $("#trfinal").css('display', '');
                $("#trselect").css('display', '');
                $("#trnew").css('display', '');
                $("#trcopy").css('display', '');

                $("#trDuplicate").css('display', 'none');
                $("#trDocumentType").css('display', '');
                strDraftDocumentsUrl = '/Draft Documents/' + documentName;
                strFinalizedDocumentsUrl = '/Finalized Documents/' + documentName;
                removeValidations('addEditDocument');
                setDocumentUrl();
                $("#addEditDocument").dialog("option", "title", "New Document");
                $("#addEditDocument").dialog("open");


                break;
            }
        case "delete":
            {
                var LinkURL = $(el).find("a").attr('href');
                var SourceUrl = getQueryStringFromValue(LinkURL, 'sourcedoc');

                break;
            }
    }
}



function ShowMetadata() {
    $("#docMetadata").addClass('pop_up__Acti');
    $("#docActivities").removeClass('pop_up__Acti');
    $('#tblMetadataDetail').css("display", "");
    $('#documentLogs').css("display", "none");
    $('#compact-pagination-documentLogs').css("display", "none");
}

function ShowActivities() {
    $("#docMetadata").removeClass('pop_up__Acti');
    $("#docActivities").addClass('pop_up__Acti');
    $('#tblMetadataDetail').css("display", "none");
    $('#documentLogs').css("display", "");
    $('#compact-pagination-documentLogs').css("display", "none");
}


function replacedocument() {

    if (requiredValidator("tblReplaceDocument")) {

        $("#loadingPage").fadeIn();

        var formData1 = new FormData();
        var opmlFile = $('#docToReplace')[0];
        var isUpload = true;
        var tblContentControls = null;
        var vrad_Replace = $('input[type="radio"][name=rad_Replace]:checked').val();
        if (vrad_Replace == 'Computer') {
            formData1.append("opmlFile", opmlFile.files[0]);
        }
        else {
            formData1.append("TemplateName", $("#ddlReplaceTemplate").find('option:selected').text());
            isUpload = false;
            tblContentControls = $("#formtblReplaceControls *").serializeArray();
        }
        formData1.append("documentaction", "replace");
        formData1.append("ContractID", $('#txtContractID').val());
        formData1.append("AccountID", localStorage.AccountID);
        formData1.append("DocumentID", $('#hdDocumentID').val());
        formData1.append("ModifiedBy", localStorage.UserName);
        if (tblContentControls != null) {
            var tblContentControlslength = tblContentControls.length;
            for (var i = 0; i < tblContentControlslength; i++)
                formData1.append(tblContentControls[i].name, tblContentControls[i].value);
        }
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?documentid=' + DocumentID,
            type: 'PUT',
            data: formData1,
            cache: false,
            contentType: false,
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, 'RefreshToken': localStorage.RefreshToken },
            processData: false,
            success: function (document) {
                $('#divReplaceDocument').dialog("close");
                ClearReplaceDocFrom();
                if (isUpload) {

                    swal("", "Document Replaced");
                    $("#loadingPage").fadeOut();

                    BindDocument();
                }
                else {

                    swal("", "Replace document from template in progress. Please check in a few minutes.");
                    $("#loadingPage").fadeOut();
                }
            }
        });
    }
}

$('input[name=rad_Replace]:radio').change(function () {
    var vrad_Replace = $('input[type="radio"][name=rad_Replace]:checked').val();
    $('#txtContractID').val("");
    if (vrad_Replace == 'Computer') {
        $("#trFileUploadBrowse").css('display', '');
        $("#trTemplateBrowse").css('display', 'none');
        $("#tblReplaceControls").css('display', 'none');
        $("#docToReplace").addClass('validelement');
        $("#ddlReplaceTemplate").removeClass('validelement');
    }
    else {
        $("#trFileUploadBrowse").css('display', 'none');
        $("#trTemplateBrowse").css('display', '');
        $("#tblReplaceControls").css('display', '');
        $("#docToReplace").removeClass('validelement');
        $("#ddlReplaceTemplate").addClass('validelement');
    }
});

function ReplaceTemplateChange(ddlDocumentTemplate) {
    if (ddlDocumentTemplate.value != "0") {
        var strContractID = $('#txtContractID').val();
        if (strContractID != "" && strContractID != "0") {
            getContractData(strContractID, 'tblReplaceControls', $("#ddlReplaceTemplate").find('option:selected').text())
        }
        else {
            getContentControlsFromTemplate($("#ddlReplaceTemplate").find('option:selected').text(), 'tblReplaceControls');
        }

    } else {
        $('#tblReplaceControls').empty();
    }
}

function ClearReplaceDocFrom() {
    $('#hdnDocumentID').val("");
    $("#docToReplace").replaceWith($("#docToReplace").val('').clone(true));
    $("#ddlReplaceTemplate").val("0");
    $('input[type="radio"][name="rad_Replace"][value="Computer"]').prop('checked', true);
    $("#trFileUploadBrowse").css('display', '');
    $("#trTemplateBrowse").css('display', 'none');
    $("#tblReplaceControls").css('display', 'none');
    $("#docToReplace").addClass('validelement');
    $("#ddlReplaceTemplate").removeClass('validelement');
    $("#tblReplaceControls").empty();
}

function getSigneeNameandEmailId(scontrid, popUpModalName) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/' + scontrid + '/contacts',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            if (data != null) {
                if (popUpModalName == "signature") {
                    getNameEmailForSignature(data);
                }
                else if (popUpModalName == "sharelink") {
                    getNameEmailForShareLink(data);
                }
            }
        },
        error: function () {
        }
    });
}
function getNameEmailForSignature(vdata) {
    var datalenght = vdata.length;
    for (var i = 0; i < datalenght; i++) {
        var item = vdata[i];
        var vLastRow = $("#tblSignees tr:last").attr('id');
        var totalFileCount = "2";
        if (typeof vLastRow == "undefined") {
            totalFileCount = "2";
        }
        else {
            totalFileCount = parseInt(vLastRow.replace("trSignee", ""));
            totalFileCount += 1;
        }
        if (i == 0) {
            $('#txtSignee1').val(item.ContactName);
            $('#txtEmail1').val(item.EmailID);
        }
        else {
            var htmlFormatFile = '<tr id="trSignee' + totalFileCount + '">';
            htmlFormatFile += '<td>';
            htmlFormatFile += '<input id="txtSignee' + totalFileCount + '" value="' + item.ContactName + '" name="Signee' + totalFileCount + '" placeholder="Signee Name" title="Signee" type="text" class="f_inpt width90" value="' + item.ContactName + '" />';
            htmlFormatFile += '</td>';
            htmlFormatFile += '<td>';
            htmlFormatFile += '<input id="txtEmail' + totalFileCount + '" value="' + item.EmailID + '" name="Email' + totalFileCount + '" placeholder="Signee Email" title="Email" type="text" class="f_inpt width90 validemail" value="' + item.EmailID + '" />';
            htmlFormatFile += '</td>';
            htmlFormatFile += '<td style="width:20px">';
            htmlFormatFile += '<a href="javascript:void(0)" onclick="DeleteSignee(this)"><img src="../Content/Images/icon/delete.png" /></a>';
            htmlFormatFile += '</td>';
            htmlFormatFile += '</tr>';
            $("#tblSignees").append(htmlFormatFile);
        }

    }
}
function getNameEmailForShareLink(vdata) {
    var allInternal = '';
    var datalenght = vdata.length;
    var totalFileCount = 0;
    var iex = 0;
    for (var i = 0; i < datalenght; i++) {
        var item = vdata[i];

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
function ContractRec() {
    $("#txtSearchBoxTodoForm").val("");
    $('#dvLoading').html('<img src="../Content/Images/icon/loading.gif">');

    $('#compact-paginationContractsTodo').css('display', '');
    $('#compact-paginationDocumentsTodo').css('display', 'none');

    $("#tblDocumentsTodo").css("display", "none");
    $("#tblContractsTodo").css("display", "");
    if ($("#tblContractsTodo li").length == 0) {
        BindContractsLocal();
    }
    else {
        $("#dvContractRec").dialog("option", "title", "Select Contract");
        $("#dvContractRec").dialog("open");
        $('#dvLoading').html('');
    }
}

function getQueryStringFromValue(url, name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(url);
    return results == null ? url : decodeURIComponent(results[1].replace(/\+/g, " "));
}

//Script for search start
$(document).ready(function () {
    $('#txtSearchBox').keypress(function (e) {
        if ($('#txtSearchBox').val() != "") {
            if (e.keyCode == 13)
                search();
        }
    });
    $('#txtSearchBoxTodoForm').keypress(function (e) {
        if ($('#txtSearchBoxTodoForm').val() != "") {
            if (e.keyCode == 13)
                SearchContractRec();
        }
    });
});

function search() {


    $('#listDocuments').html('<img src="../Content/Images/icon/loading.gif">');

    $("#showAll").text("Showing search result for : '" + $("#txtSearchBox").val() + "'");
    applyFilter();
}
//Script for search end

function onchangetemplate(ddlDocumentTemplate) {
    $('#spInProgress').css('display', '');
    if (ddlDocumentTemplate.value != "0") {

        var strContractID = $("#txtContractRecElementID").val();
        if (strContractID == "0" || strContractID == "") {
            var vTemplate = ddlDocumentTemplate.value.split('~');
            getContentControlsFromTemplate(vTemplate[0], 'tblContentControls');
            if (vTemplate[1] != '') {
                $("#ddlDocumentTypeCreate option").filter(function (index) { return $(this).text() === vTemplate[1] }).prop('selected', true);
            }
        } else {
            getContractData(strContractID, 'tblContentControls', $("#ddlDocumentTemplate").find('option:selected').text());
        }

    } else {
        $('#tblContentControls').empty();
    }

    $('#spInProgress').css('display', 'none');
}

function onchangecontractrecord(ddlContracts) {

    $('#spInProgress').css('display', '');
    if (ddlContracts.value == "0") {
        $("#txtNewFolderName").val("");
        var strDocumentTemplate = $("#ddlDocumentTemplate").find('option:selected').text();
        getContentControlsFromTemplate(strDocumentTemplate, 'tblContentControls');
    } else {


        setDocumentUrl();
    }
    $('#spInProgress').css('display', 'none');
}

function getContentControlsFromTemplate(templatename, tblCtrl) {
    $('#spInProgress').css('display', '');
    $.ajax({
        url: 'api/accounts/' + localStorage.AccountID + '/documents/template?templatename=' + templatename,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        async: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (contractfields) {
            $('#spInProgress').css('display', 'none');
            var vTransactionTypeExist = '';
            var vContractClassExist = '';
            var datalenght = contractfields.length;

            if (datalenght > 0) {
                $("#" + tblCtrl).empty();
                $("#" + tblCtrl).append("<tr><td width='100%' colspan='2' valign='top'><div class='form_categoryhead'>Template Metadata</div></td></tr>");

                for (var i = 0; i < datalenght; i++) {
                    var item = contractfields[i];
                    var vUserList = '';
                    if (item.FieldName == "ContractType") {
                    }
                    else if (item.FieldName == "TransactionType")
                    { vTransactionTypeExist = 'Yes'; }
                    else if (item.FieldName == "ContractClass")
                    { vContractClassExist = 'Yes'; }
                    else {
                        var vControls = '<tr>';
                        var vDate = "";
                        var vUser = "";
                        vControls += '<td class="f_head"><label>' + item.FieldDisplayName;

                        if (item.FieldHelp == "true") {
                            vControls += "<img class='helpimg' src='../Content/Images/help_training.png'  title='" + item.HelpText + "'></label>";
                        } else {
                            vControls += '</label>';
                        }
                        vControls += '</td><td>';
                        if (item.FieldType == "Single Line Text") {
                            vControls += "<input type='text' id=" + item.FieldName + " maxlength='100' name=" + item.FieldName + " class='f_inpt width80' />";
                        }
                        else if (item.FieldType == "Multi Line Text") {
                            vControls += "<textarea name=" + item.FieldName + " id=" + item.FieldName + " cols='40' rows='3' class='f_inpt width80'></textarea>";
                        }
                        else if (item.FieldType == "Date") {
                            vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " class='f_date width80 validdate'/>";
                            vDate = item.FieldName;
                        }
                        else if (item.FieldType == "Choice") {
                            vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " class='f_inpt width80'>";
                            vControls += "<option value='0'>--Select--</option>";

                            var myArray = [];
                            myArray = item.ChoiceValues.split(';')
                            var myArraylength = myArray.length;
                            for (var i = 0; i < myArraylength; i = i + 1) {
                                do {
                                    myArray[i] = myArray[i].replace("&amp;", "&");
                                } while (myArray[i].indexOf("&amp;") > -1)
                                vControls += "<option value=" + myArray[i] + ">" + myArray[i] + "</option>";
                            }

                            vControls += '</select>';
                        }
                        else if (item.FieldType == "User") {
                            vControls += "<select id=" + item.FieldName + " multiple='multiple' class='f_inpt width80' name=" + item.FieldName + " title='" + item.FieldDisplayName + "' data-placeholder='--Select--'>"

                            vControls += "<option value='0'>--Select--</option>";
                            if (vUserList == '')
                            { vUserList = GetUserList(); }

                            vControls += '</select>';

                            vUser = item.FieldName;
                        } else if (item.FieldType == "Taxonomy") {

                            vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " class='f_inpt width80' readonly='readonly' type='text'>";
                            vControls += "<span class='right-float'><a href='javascript:void(0)' onclick='ViewBusinessArea()'> Browse</a></span>";

                        } else if (item.FieldType == "Lookup") {

                            if (item.FieldName == "Counterparty") {
                                vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " class='f_inpt width80' readonly='readonly' type='text'>";
                                vControls += "<span class='right-float'><a href='javascript:void(0)' onclick='ViewCounterparty()'> Browse</a></span>";
                            } else if (item.FieldName == "CompanyProfile") {
                                vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " class='f_inpt width80'>";
                                vControls += "<option value='0'>--Select--</option>";
                                vControls += getcompanyprofile() + "</select>";
                            }
                            else if (item.FieldName == "ContractPricingType") {
                                vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " class='f_inpt width80'>";
                                vControls += "<option value='0'>--Select--</option>";
                                getcontractpricingtype();
                            }
                            else if (item.FieldName == "BillingFrequency") {
                                vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " class='f_inpt width80'>";
                                vControls += "<option value='0'>--Select--</option>";
                                getbillingfrequency();
                            }
                            else if (item.FieldName == "Status") {
                                vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " class='f_inpt width80'>";
                                vControls += "<option value='0'>--Select--</option>";
                                vControls += getStatus() + "</select>";
                            }
                            else if (item.FieldName == "OriginatingParty") {
                                vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " class='f_inpt width80' readonly='readonly' type='text'>";
                                vControls += "<span class='right-float'><a href='javascript:void(0)' onclick='ViewOriginatingParty()'> Browse</a></span>";
                            }
                            else if (item.FieldName == "ContractCurrency") {
                                vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " class='f_inpt width80'>";
                                vControls += "<option value='0'>--Select--</option>";
                                vControls += getContractCurrency() + "</select>";
                            }

                        }
                        vControls += '</td></tr>';
                        $("#" + tblCtrl).append(vControls);
                        if (vDate != "") {
                            $("#" + vDate + "").datepicker();
                            vDate = "";
                        }
                        if (vUser != "") {

                            $("#" + vUser + "").chosen();
                            vUser = "";
                        }
                    }
                }
                $('.chosenmulti').on('chosen:showing_dropdown', function (evt, params) {
                    $('.result-selected').css('display', 'none');
                });
            } else {

                swal("", "No content controls are mapped in the template.");
            }
            if (vTransactionTypeExist == 'Yes') {
                $("#trTransactionType").css("display", "");
            }
            if (vContractClassExist == 'Yes') {
                $("#trContractClass").css("display", "");
            }
        },
        error:
            function (contractfields) {
                $('#tblContentControls').empty();
                $('#spInProgress').css('display', 'none');
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
function getContractData(ContractID, tblCtrl, strDocumentTemplate) {
    $('#spInProgress').css('display', '');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/IContractDetails?contractid=' + ContractID,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        async: false,
        success: function (mainmetadataFields) {
            $('#spInProgress').css('display', 'none');
            var vMetadata = $(mainmetadataFields).find('Metadata');
            $("#txtCounterpartyCreate").val($(vMetadata).find("Counterparty").text());
            strFinalizedDocumentsUrl = $(vMetadata).find("FinalizedDocumentsUrl").text();
            strDraftDocumentsUrl = $(vMetadata).find("DraftDocumentsUrl").text();

            if (strDocumentTemplate != null) {
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/template?templatename=' + strDocumentTemplate,
                    type: 'GET',
                    dataType: 'json',
                    'Content-Type': 'application/json',
                    cache: false,
                    async: false,
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    success: function (metadataFields) {
                        $("#" + tblCtrl).empty();
                        var vUserList = '';
                        $("#" + tblCtrl).append("<tr><td width='100%' colspan='2' valign='top'><div class='form_categoryhead'>Template Metadata</div></td></tr>");
                        var vTransactionTypeExist = '';
                        var vContractClassExist = '';
                        var datalenght = metadataFields.length;
                        for (var i = 0; i < datalenght; i++) {
                            var item = metadataFields[i];
                            if (item.FieldName == "ContractType") {
                            }
                            else if (item.FieldName == "TransactionType")
                            { vTransactionTypeExist = 'Yes'; }
                            else if (item.FieldName == "ContractClass")
                            { vContractClassExist = 'Yes'; }
                            else {
                                var vControls = '<tr>';
                                var vDate = "";
                                var vUser = "";
                                vControls += '<td class="f_head"><label>' + item.FieldDisplayName;

                                if (item.FieldHelp == "true") {
                                    vControls += "<img class='helpimg' src='../Content/Images/help_training.png' title='" + item.HelpText + "'></label>";
                                } else {
                                    vControls += '</label>';
                                }
                                vControls += '</td><td class="f_list">';

                                if (item.FieldType == "Single Line Text") {
                                    if ($(vMetadata).find(item.FieldName).text() != "") {
                                        vControls += "<input type='text' id=" + item.FieldName + " maxlength='100' name=" + item.FieldName + " value=" + $(vMetadata).find(item.FieldName).text() + " class='f_inpt width80' />";
                                    } else {
                                        vControls += "<input type='text' id=" + item.FieldName + " maxlength='100' name=" + item.FieldName + " class='f_inpt width80' />";
                                    }

                                }
                                else if (item.FieldType == "Multi Line Text") {
                                    if ($(vMetadata).find(item.FieldName).text() != "") {
                                        vControls += "<textarea name=" + item.FieldName + " id=" + item.FieldName + " cols='40' rows='5' class='f_inpt width80'>" + $(vMetadata).find(item.FieldName).text() + "</textarea>";
                                    } else {
                                        vControls += "<textarea name=" + item.FieldName + " id=" + item.FieldName + " cols='40' rows='5' class='f_inpt width80'></textarea>";
                                    }
                                }
                                else if (item.FieldType == "Date") {
                                    var vv = $(vMetadata).find(item.FieldName).text();
                                    var onlydate = "";
                                    if (vv != null) {
                                        onlydate = vv.substring(0, vv.length - 19);
                                    }

                                    vControls += "<input type='text' readonly id=" + item.FieldName + " name=" + item.FieldName + " value='" + onlydate + "' class='f_date width80 validdate'/>";

                                    vDate = item.FieldName;

                                }
                                else if (item.FieldType == "Choice") {
                                    vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " class='f_inpt width80'>";
                                    vControls += "<option value='0'>--Select--</option>";

                                    var myArray = [];
                                    myArray = item.ChoiceValues.split(';')
                                    var myArraylength = myArray.length;
                                    for (var i = 0; i < myArraylength; i = i + 1) {
                                        do {
                                            myArray[i] = myArray[i].replace("&amp;", "&");
                                        } while (myArray[i].indexOf("&amp;") > -1)
                                        if ($(vMetadata).find(item.FieldName).text() == myArray[i]) {
                                            vControls += "<option value=" + myArray[i] + " selected>" + myArray[i] + "</option>";
                                        } else {
                                            vControls += "<option value=" + myArray[i] + ">" + myArray[i] + "</option>";
                                        }
                                    }

                                    vControls += '</select>';
                                }
                                else if (item.FieldType == "User") {
                                    vControls += "<select id=" + item.FieldName + " multiple='multiple' class='f_inpt width76' name=" + item.FieldName + " title='" + item.FieldDisplayName + "' data-placeholder='--Select--'>"

                                    vControls += "<option value='0'>--Select--</option>";
                                    if (vUserList == '')
                                    { vUserList = GetUserList(); }
                                    vControls += vUserList;

                                    vControls += '</select>';

                                    vUser = item.FieldName;
                                } else if (item.FieldType == "Taxonomy") {

                                    if ($(vMetadata).find(item.FieldName).text() != "") {
                                        vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " value='" + $(vMetadata).find(item.FieldName).text() + "' class='f_inpt width80' readonly='readonly' type='text' />";
                                    } else {
                                        vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " class='f_inpt width80' readonly='readonly' type='text' />";
                                    }

                                    vControls += "<span class='right-float'><a href='javascript:void(0)' onclick='ViewBusinessArea()'> Browse</a></span>";

                                }
                                else if (item.FieldType == "Lookup") {

                                    if (item.FieldName == "Counterparty") {
                                        if ($(vMetadata).find(item.FieldName).text() == "Counterparty not in the list") {
                                            $("#chkCounterpartyNotInList").attr("checked", "checked");
                                            $("#tblCounterparties").attr('disabled', 'disabled');
                                        }
                                        else {
                                            $("#txtCounterpartyCreate").val($(vMetadata).find(item.FieldName).text());
                                        }

                                        vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " value='" + $(vMetadata).find(item.FieldName).text() + "' class='f_inpt width80' readonly='readonly' type='text' />";

                                        vControls += "<span class='right-float'><a href='javascript:void(0)' onclick='ViewCounterparty()'> Browse</a></span>";
                                    } else if (item.FieldName == "CompanyProfile") {
                                        vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " class='f_inpt width80'>";
                                        vControls += "<option value='0'>--Select--</option>";

                                        vControls += getcompanyprofile($(vMetadata).find(item.FieldName).text()) + "</select>";
                                    }
                                    else if (item.FieldName == "ContractPricingType") {
                                        vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " class='f_inpt width80'>";
                                        vControls += "<option value='0'>--Select--</option>";
                                        getcontractpricingtype($(vMetadata).find(item.FieldName).text());
                                    }
                                    else if (item.FieldName == "BillingFrequency") {
                                        vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " class='f_inpt width80'>";
                                        vControls += "<option value='0'>--Select--</option>";
                                        getbillingfrequency($(vMetadata).find(item.FieldName).text());
                                    }
                                    else if (item.FieldName == "Status") {
                                        vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " class='f_inpt width80' readonly>";
                                        vControls += "<option value='0'>--Select--</option>";
                                        vControls += getStatus($(vMetadata).find(item.FieldName).text()) + "</select>";
                                    }
                                    else if (item.FieldName == "OriginatingParty") {
                                        vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " value='" + $(vMetadata).find(item.FieldName).text() + "' class='f_inpt width80' readonly='readonly' type='text' />";
                                        $("#txtOriginatingPartyType").val($(vMetadata).find("OriginatingPartyType").text());
                                        if ($(vMetadata).find("OriginatingPartyType").text() == "Counterparty") {
                                            SelectCounterparties();
                                        }
                                        vControls += "<span class='right-float'><a href='javascript:void(0)' onclick='ViewOriginatingParty()'> Browse</a></span>";
                                    }
                                    else if (item.FieldName == "ContractCurrency") {
                                        vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " class='f_inpt width80'>";
                                        vControls += "<option value='0'>--Select--</option>";
                                        vControls += getContractCurrency($(vMetadata).find(item.FieldName).text()) + "</select>";
                                    }

                                }
                                vControls += '</td></tr>';
                                $("#" + tblCtrl).append(vControls);
                                if (vDate != "") {
                                    $("#" + vDate + "").datepicker();
                                    vDate = "";
                                }
                                if (vUser != "") {

                                    $("#" + vUser + "").chosen();
                                    vUser = "";
                                }
                            }
                        }
                        if (vTransactionTypeExist == 'Yes') {
                            $("#trTransactionType").css("display", "");
                        }
                        if (vContractClassExist == 'Yes') {
                            $("#trContractClass").css("display", "");
                        }
                    },
                    error:
                        function (contractfields) {
                            $("#" + tblCtrl).empty();
                            $('#spInProgress').css('display', 'none');
                        }
                });
            }
        },
        error:
            function (contractfields) {
                $("#" + tblCtrl).empty();
                $('#spInProgress').css('display', 'none');
            }
    });
}

function GetUserList() {
    //var vUserList = '';
    vUserListwithEmail = "";
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/users',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        async: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (dataUser) {
            var datalenght = dataUser.length;
            for (var i = 0; i < datalenght; i++) {
                var item = dataUser[i];
                var sRowKey = item.RowKey;
                var sUserName = item.UserName;
                vUserListEmail += '<option value="' + sUserName + '" data-emailvalue="' + sEmail + '">' + sUserName + '</option>';
                vUserList += '<option value="' + sUserName + '">' + sUserName + '</option>';
                vUserListwithEmail += '<option value="' + sEmail + '">' + sUserName + '</option>';
            }
        },
        error:
            function (dataUser) {
            }
    });
    return vUserList;
}

function ViewBusinessArea() {
    $('#txtBARowkey').val("");
    $('#txtBAParent').val("");
    $('#txtBA').val("");
    $("#browseBA").dialog("option", "title", "Browse Business Area");
    $("#browseBA").dialog("open");
    $("#browseBA").height("auto");
}

function ViewOriginatingParty() {
    ViewOPCounterparty();
    getcompanyprofile();
    $("#tblOriginatingParties").empty();
    $("#browseOriginatingParty").dialog("option", "title", "Originating Party Picker");
    $("#browseOriginatingParty").dialog("open");
}

function ViewOPCounterparty() {

    if ($('#tblOPCounterparties tr').length <= 0) {
        CounterpartyFunc1();
    }
}

function CounterpartyFunc() {
    $("#tblCounterparties").empty();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty',
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            $('#loadCP').empty();
            var arr = [];
            var counterpartyTags = [];
            if ($('#Counterparty').val() != null) {
                $.each($('#Counterparty').val().split(";"), function () {
                    arr.push($.trim(this));
                });
            }
            myCounterPartyArray = [];
            var obj1 = {};
            for (var i = 0; i < data.length; i++) {
                if (!(data[i].CounterpartyName in obj1)) {
                    if (data[i].CounterpartyName.trim() != "") {
                        if (data[i].IsGlobal == "Yes")
                            myCounterPartyArray.push(data[i]);
                        else {
                            if (typeof (data[i].BusinessAreasPath) != "undefined" && data[i].BusinessAreasPath != "") {
                                var contractarea = "";
                                var Businesssarea = "";
                                var splitbusinessPath = data[i].BusinessAreasPath.split(';');
                                $(splitbusinessPath).each(function (index) {
                                    if (this != "") {
                                        var path = this.toString();
                                        var contBusi = this.split('>');
                                        if (typeof (contBusi) != "undefined") {
                                            if (contBusi.length > 0) {
                                                contractarea = contBusi[0].trim();
                                                Businesssarea = contBusi[contBusi.length - 1].trim();

                                                if (localStorage.UserType.indexOf("Global Contract Owner") >= 0) {
                                                    myCounterPartyArray.push(data[i]);
                                                }
                                                else if (typeof (localStorage.BusinessAreaAccess) != "undefined" && localStorage.BusinessAreaAccess != "") {
                                                    var newArray = localStorage.BusinessAreaAccess.split(',').filter(function (v) { return v !== '' });
                                                    var found = $.grep(newArray, function (n, ind) {
                                                        return (n.indexOf(path) == 0);
                                                    });
                                                    if (found.length > 0) {
                                                        myCounterPartyArray.push(data[i]);
                                                    }
                                                }

                                            }
                                        }
                                    }
                                })

                            }
                        }
                    }
                }
                obj1[data[i].CounterpartyName] = true;
            }
            var datalength = myCounterPartyArray.length;
            for (var i = 0; i < datalength; i++) {
                var item = myCounterPartyArray[i];
                var article = "";
                if (i == 0) {
                    article += '<tr><th style="width:35%;">Counterparty Name</th><th style="width:20%;">Counterparty Type</th><th >Global or Regional</th></tr>';
                }

                article += '<tr><td>';
                if (arr.indexOf(item.CounterpartyName) >= 0) {
                    article += '<input id="CP' + item.RowKey + '" type="checkbox" name="Counterparty" class="css1-checkbox" checked value="' + escape(item.CounterpartyName) + '" />';
                } else {
                    article += '<input id="CP' + item.RowKey + '" type="checkbox" name="Counterparty" class="css1-checkbox" value="' + escape(item.CounterpartyName) + '" />';
                }

                article += '<label for="CP' + item.RowKey + '" class="css1-label"  style="display: inline;">' + item.CounterpartyName + '</label>';
                article += '</td><td>' + item.CounterpartyType + '';
                article += '</td>';
                article += '<td>' + (item.IsGlobal == "Yes" ? "Global" : item.BusinessAreas) + '';
                article += '</td></tr>';
                counterpartyTags.push(item.CounterpartyName);
                $("#tblCounterparties").append(article);
            }

            $("#txtSearchBoxCounterparty").autocomplete({
                source: counterpartyTags,
                minLength: 2,
                focus: function (event, ui) {
                    return false;
                },
                select: function (evn, uidetails) {
                    $("#txtSearchBoxCounterparty").val(uidetails.item.label);
                    SearchCounterparty();
                }
            });

            var vCount = $("#tblCounterparties tr").length;
            $('#compact-paginationCounterparties').pagination({
                items: vCount,
                itemsOnPage: 10,
                typeID: 'tblCounterparties',
                cssStyle: 'compact-theme'
            });
        },
        error: function () {
            $('#loadCP').empty();
            $('#loadCP').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No Counterparty Found!</p>')
        }
    });
}

function CounterpartyFunc1() {
    $("#tblOPCounterparties").empty();
    var vCounterparty = $('#Counterparty').val();
    if (typeof vCounterparty != 'undefined') {
        $.each(vCounterparty.split(";"), function (i, item) {
            var vCounterpartyName = $.trim(item);
            if (vCounterpartyName != "") {
                var article = '<li>';
                if ($('#OriginatingParty').val() == vCounterpartyName) {
                    article += '<input id="CPO' + i + '" type="radio" name="OriginatingParty" class="css-checkbox" checked value="' + vCounterpartyName + '" />';
                } else {
                    article += '<input id="CPO' + i + '" type="radio" name="OriginatingParty" class="css-checkbox" value="' + vCounterpartyName + '" />';
                }
                article += '<label for="CPO' + i + '" class="css-label">' + vCounterpartyName + '</label>';
                article += '</li>';
                $("#tblOPCounterparties").append(article);
            }
            else if (vCounterpartyName == "Counterparty not in the list")
            { $("#tblOPCounterparties").append('<li>' + vCounterpartyName + '</li>'); }
            else {
                $("#tblOPCounterparties").append('<li>Select Counterparty</li>');
            }
        });
    }
}

function ViewCounterparty() {
    $('#loadCP').html('<img src="../Content/Images/icon/loading.gif"> Working on it...');
    if ($('#tblCounterparties tr').length <= 0) {
        CounterpartyFunc();
    } else {
        $('#loadCP').empty();
    }
    $("#pCounterpartyNotInList").css("display", "");
    $("#browseCounterparty").dialog("option", "buttons", [{
        text: "OK", click: function () {
            var s = AddCounterparty();
            //if (s) {
            $(this).dialog("close");
            // }
        }
    }, {
        text: "Cancel", click: function () {
            $(this).dialog("close");
        }
    }]);
    $("#browseCounterparty").dialog("option", "title", "Counterparty Picker");
    $("#browseCounterparty").dialog("open");
}

function SaveCounterparty() {
    var isformvalid = false;
    if (requiredValidator('addNewEntityFields',false)) {
        isformvalid = true;
        var entityid = $("#txtCounterpartyID").val();
        var AddressLine1 = $("#txtAddressLine1").val();

        if (AddressLine1 == null || AddressLine1 == '') {
            AddressLine1 = '';
        }
        var strBusinessAreaOwnerof = "";
        if ($('input[type="radio"][name=IsGlobal]:checked').val() == "No") {
            if ($("#txtOwnerofBusinessArea").val() != $("#hdnOwnerofBusinessArea").val()) {
                if ($("#txtOwnerofBusinessArea").val() != "") {
                    for (var i = 0; i < selectedBusinessAreaID11.length; i++) {

                        var rowKPath = jQuery.grep(BusinessAreaPathRowKey, function (a) {
                            return a[1] === selectedBusinessAreaID11[i];
                        });
                        if (rowKPath != null && typeof (rowKPath) != "undefined")
                            strBusinessAreaOwnerof += rowKPath[0][0] + ";";
                    }
                    strBusinessAreaOwnerof = strBusinessAreaOwnerof.slice(0, -1)
                }
            } else {

                strBusinessAreaOwnerof = $("#hdnLocOwnerofBusinessArea").val()
            }
        }
        else {
            $("#txtOwnerofBusinessArea").val('');
            strBusinessAreaOwnerof = "";
        }
        if (entityid != '') {
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty?counterpartyid=' + entityid,
                type: 'PUT',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                data: {
                    RowKey: entityid,
                    CounterpartyName: $("#txtCounterpartyName").val(),
                    CounterpartyType: $("#ddlCounterpartyType").find('option:selected').text(),
                    AddressLine1: AddressLine1,
                    AddressLine2: $("#txtAddressLine2").val(),
                    City: ($("#txtCity").val() != null) ? $("#txtCity").val() : '',
                    State: ($("#txtState").val() != null) ? $("#txtState").val() : '',
                    Zip: $("#txtZip").val(),
                    Country: $("#ddlCountry").find('option:selected').text(),
                    ContactNo: $("#txtContactNo").val(),
                    Status: $("#ddlStatus").find('option:selected').text(),
                    EmailID: $("#txtEmailID").val(),
                    ModifiedBy: localStorage.UserName,
                    IsGlobal: $('input[type="radio"][name=IsGlobal]:checked').val(),
                    BusinessAreas: $("#txtOwnerofBusinessArea").val(),
                    BusinessAreasPath: strBusinessAreaOwnerof,
                },
                cache: false,
                success: function (person) {

                    swal("", person);
                    CounterpartyFunc();
                    CounterpartyFunc1();
                    $("#addEditCounterparty").dialog("close");
                }
            });
        }
        else {
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty',
                type: 'POST',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                data: {
                    CounterpartyName: $("#txtCounterpartyName").val(),
                    CounterpartyType: $("#ddlCounterpartyType").find('option:selected').text(),
                    AddressLine1: $("#txtAddressLine1").val(),
                    AddressLine2: $("#txtAddressLine2").val(),
                    City: $("#txtCity").val(),
                    State: $("#txtState").val(),
                    Zip: $("#txtZip").val(),
                    Country: $("#ddlCountry").find('option:selected').text(),
                    ContactNo: $("#txtContactNo").val(),
                    Status: $("#ddlStatus").find('option:selected').text(),
                    EmailID: $("#txtEmailID").val(),
                    CreatedBy: localStorage.UserName,
                    ModifiedBy: localStorage.UserName,
                    IsGlobal: $('input[type="radio"][name=IsGlobal]:checked').val(),
                    BusinessAreas: $("#txtOwnerofBusinessArea").val(),
                    BusinessAreasPath: strBusinessAreaOwnerof,
                },
                cache: false,
                success: function (person) {

                    swal("", person);
                    if ($("#Counterparty").val() == '')
                        $('#Counterparty').val($("#txtCounterpartyName").val());
                    else
                        $('#Counterparty').val($('#Counterparty').val() + "; " + $("#txtCounterpartyName").val());

                    CounterpartyFunc();
                    CounterpartyFunc1();
                    $("#addEditCounterparty").dialog("close");
                }
            });
        }
    }
    return isformvalid;
}

function CounterpartyPopup() {
    $("#txtCounterpartyID").val("");
    $("#txtCounterpartyName").val("");
    $('#ddlCounterpartyType').val('0');
    $("#hdnOwnerofBusinessArea").val('');
    $("#hdnLocOwnerofBusinessArea").val('');
    $("#txtOwnerofBusinessArea").val('');
    $('input[type="radio"][name=IsGlobal][value="Yes"]').prop('checked', true);
    $("#trcp-RgBusi").hide();
    $("#txtOwnerofBusinessArea").removeClass("validelement");
    $("#txtAddressLine1").val("");
    $("#txtAddressLine2").val("");
    $("#txtCity").val("");
    $("#txtState").val("");
    $("#txtZip").val("");
    $('#ddlCountry').val('0');
    $("#txtContactNo").val("");
    $("#txtEmailID").val("");
    $("#ddlStatus").val("Active");
    $(".validelement").each(function (index, element) {
        $(element).removeClass("error");
        $("#errormsg_" + element.id).remove();
    });

    $("#addEditCounterparty").dialog("option", "title", "New Counterparty");
    $("#addEditCounterparty").dialog("open");
}


function SelectLegalEntities() {
    $("#OPCounterparties").removeClass('form-active');
    $("#OPLeagalEntities").addClass('form-active');
    $('#tblOPLegalEntities').css("display", "");
    $('#tblOPCounterparties').css("display", "none");
    $('#txtOriginatingPartyType').val("Legal Entity");
    $('#compact-paginationOPLegalEntities').css("display", "");
    $('#compact-paginationOPCounterparties').css("display", "none");
}

function SelectCounterparties() {
    $("#OPLeagalEntities").removeClass('form-active');
    $("#OPCounterparties").addClass('form-active');
    $('#tblOPLegalEntities').css("display", "none");
    $('#tblOPCounterparties').css("display", "");
    $('#txtOriginatingPartyType').val("Counterparty");
    $('#compact-paginationOPCounterparties').css("display", "");
    $('#compact-paginationOPLegalEntities').css("display", "none");
}

function getcompanyprofile(obj) {
    $("#tblOPLegalEntities").empty();
    var control = "";
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/legalentities',
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        async: false,
        success: function (data) {
            var datalenght = data.length;
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];

                if (item.LegalEntityName == obj) {
                    control += "<option value=" + item.LegalEntityName + " selected='selected'>" + item.LegalEntityName + "</option>";
                }
                else {
                    control += "<option value=" + item.LegalEntityName + ">" + item.LegalEntityName + "</option>";
                }

                var article = '<li>';
                if ($('#OriginatingParty').val() == item.LegalEntityName) {
                    article += '<input id="OP' + item.RowKey + '" type="radio" name="OriginatingParty" class="css-checkbox" checked value="' + item.LegalEntityName + '" />';
                } else {
                    article += '<input id="OP' + item.RowKey + '" type="radio" name="OriginatingParty" class="css-checkbox" value="' + item.LegalEntityName + '" />';
                }
                article += '<label for="OP' + item.RowKey + '" class="css-label">' + item.LegalEntityName + '</label>';
                article += '</li>';
                $("#tblOPLegalEntities").append(article);
            }

            var vCount = $("#tblOPLegalEntities li").length;
            $('#compact-paginationOPLegalEntities').pagination({
                items: vCount,
                itemsOnPage: 15,
                type: 'ul',
                row: 'li',
                typeID: 'tblOPLegalEntities',
                cssStyle: 'compact-theme'
            });
        }
    });
    return control;
}

function getcontractpricingtype(obj) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contractpricingtype',
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            var datalenght = data.length;
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];
                if (item.TypeName == obj) {
                    $("#ContractPricingType").append("<option value='" + item.TypeName + "' selected='selected'>" + item.TypeName + "</option>")
                }
                else {
                    $("#ContractPricingType").append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>")
                }
            }

        }
    });
}

function getbillingfrequency(obj) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/billingfrequency',
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            var datalenght = data.length;
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];
                if (item.TypeName == obj) {
                    $("#BillingFrequency").append("<option value='" + item.TypeName + "' selected='selected'>" + item.TypeName + "</option>")
                }
                else {
                    $("#BillingFrequency").append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>")
                }
            }

        }
    });
}

function getStatus(obj) {
    var control = "";
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contractstatuses',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        async: false,
        success: function (contractstatuses) {
            var datalenght = contractstatuses.length;
            for (var i = 0; i < datalenght; i++) {
                var item = contractstatuses[i];
                if (item.ContractStatus == obj) {
                    control += "<option value=" + encodeURI(item.ContractStatus) + " selected='selected'>" + item.ContractStatus + "</option>";
                }
                else {
                    control += "<option value=" + encodeURI(item.ContractStatus) + ">" + item.ContractStatus + "</option>";
                }
            }
        }
    });
    return control;
}

function getContractCurrency(obj) {
    var control = "";
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/currencies',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        async: false,
        success: function (data) {
            var datalenght = data.length;
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];
                if (item.Abbreviation == obj) {
                    control += "<option value=" + encodeURI(item.Abbreviation) + " selected='selected'>" + item.Abbreviation + "</option>";
                }
                else {
                    control += "<option value=" + encodeURI(item.Abbreviation) + ">" + item.Abbreviation + "</option>";
                }
            }
        }
    });
    return control;
}

function AddCounterparty() {
    if ($("#chkCounterpartyNotInList").is(':checked')) {
        $('#Counterparty').val("Counterparty not in the list");
        return true;
    } else {
        var vCoounterparty = "";
        $('input:checkbox[name="Counterparty"]:checked').each(function () {
            if (vCoounterparty == "") {
                vCoounterparty = unescape(this.value);
            }
            else {
                vCoounterparty += "; " + unescape(this.value);
            }
        });
        if (vCoounterparty != "") {
            $('#Counterparty').val(vCoounterparty);
            $("#txtCounterpartyCreate").val(vCoounterparty);
            return true;
        } else {
            $('#Counterparty').val("");
            $("#txtCounterpartyCreate").val("");
            // alert('No Counterparty has been selected.');
            //swal("", "No Counterparty has been selected.");
            return true;
        }
    }
}

function AddOriginatingParty() {
    if ($('input:radio[name=OriginatingParty]:checked').val() != null) {
        $('#OriginatingParty').val($('input:radio[name=OriginatingParty]:checked').val());
        return true;
    } else {

        swal("", "No Originating Party has been selected.");
        return false;
    }
}

$(document).ready(function () {
    allowOnlyNumberInInputBox("txtExpIn");


    $("#browseBA").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Users",
        modal: true,
        buttons: {
            "OK": function () { $('#BusinessArea').val($('#txtBA').val()); $(this).dialog("close"); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $("#browseCounterparty").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Counterparty",
        modal: true,
        buttons: {
            "OK": function () { AddCounterparty(); },
            Cancel: function () {
                $(this).dialog("close"); $("#txtSearchBox").val("");
                ClearAddCounterparty();
                $('#chkCounterpartyNotInList').prop('checked', false);

                $('#dvCPExistingCounterparty').css("display", "");
                $('#dvCPAddCounterparty').css("display", "none");
                $('#rdCPAddCounterparty').attr('checked', false);
                $('#rdCPExistingCounterparty').attr('checked', true);

                $('.CP_Det').remove();
                $('.CP_Det1').css('display', 'none');
                $("#ddlCounterpartyType").removeClass('validelement');
                $("#txtEmailID").removeClass('validemail');
                BAOwnersselecteditems = [];
                $('#liSelectedBAOwners').empty();
                $('#txtBAOwnerofPath').val('');
                $('#txtBAOwnerof').val('');
                selectedBusinessAreaID11 = [];
            }
        }, close: function () {
            ClearAddCounterparty();
            $('#chkCounterpartyNotInList').prop('checked', false);

            $('#dvCPExistingCounterparty').css("display", "");
            $('#dvCPAddCounterparty').css("display", "none");
            $('#rdCPAddCounterparty').attr('checked', false);
            $('#rdCPExistingCounterparty').attr('checked', true);

            $('.CP_Det').remove();
            $('.CP_Det1').css('display', 'none');
            $("#ddlCounterpartyType").removeClass('validelement');
            $("#txtEmailID").removeClass('validemail');
            BAOwnersselecteditems = [];
            $('#liSelectedBAOwners').empty();
            $('#txtBAOwnerofPath').val('');
            $('#txtBAOwnerof').val('');


            selectedBusinessAreaID11 = [];

        }
    });
    $("#browseBAOwners").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Users",
        height: "auto",
        modal: true,
        draggable: true,
        drag: function (event, ui) {
            var fixPix = $(document).scrollTop();
            iObj = ui.position;
            iObj.top = iObj.top - fixPix;
            $(this).closest(".ui-dialog").css("top", iObj.top + "px");
        },
        buttons: {
            "Save": function () {
                $('#lblBusinessAreaOwners').text("");
                $('#txtOwnerofBusinessArea').text("");

                var selecteditemslength = BAOwnersselecteditems.length;

                if (selecteditemslength > 0) {
                    for (var i = 0; i < selecteditemslength; i++) {
                        if (i != selecteditemslength - 1) { $('#lblBusinessAreaOwners').append(BAOwnersselecteditems[i] + ";"); }
                        else { $('#lblBusinessAreaOwners').append(BAOwnersselecteditems[i]); }
                    }
                    $('#txtBAOwnerof').val($('#lblBusinessAreaOwners').text());
                }
                else {
                    $('#txtBAOwnerof').val("");
                }

                $('#txtOwnerofBusinessArea').val($('#txtBAOwnerof').val());
                selectedBusinessAreaID11 = [];
                $(selectedBusinessAreaID11Temp).each(function (i, item) {
                    selectedBusinessAreaID11.push(item);
                })

                selectedBusinessAreaID11Temp = [];
                $(this).dialog("close");
            },
            Cancel: function () {
                $(this).dialog("close");
                selectedBusinessAreaID11Temp = [];
            }
        }, close: function () {
            selectedBusinessAreaID11Temp = [];
        }
    });
    BindBusinessAreaPicker11();

    $("#dvVersionHistory").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Version History",
        modal: true,
        buttons: {
            "Close": function () { $(this).dialog("close"); }
        }
    });

    $("#browseMasterAgreements").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Master Agreements",
        modal: true,
        buttons: {
            "OK": function () {
                var s = AddMasterAgreement();
                // if (s) {
                $(this).dialog("close");
                // }
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $("#browseOriginatingParty").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Originating Party",
        modal: true,
        buttons: {
            "OK": function () {
                var s = AddOriginatingParty();
                // if (s) {
                $(this).dialog("close");
                // }
            },
            "Clear": function () {
                $('input:radio[name=OriginatingParty]').attr('checked', false);
                $("#OriginatingParty").val("");
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $("#addEditCounterparty").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Counterparty",
        modal: true,
        resizable: true,
        buttons: {
            "Save": function () {
                if (SaveCounterparty()) {
                }
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });
    $("#dvContractRec").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        height: "500",
        title: "Todo",
        modal: true,
        buttons: {
            "OK": function () { SelectContractRecElement(); $(this).dialog("close"); },
            "Clear": function () { fnClearSelectedContracts(); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });
    function fnClearSelectedContracts() {
        $.each($('#tblContractsTodo li input'), function (index, value) {
            value.checked = false;
        });
    }
    function AddCounterparty() {
        if ($("#chkCounterpartyNotInList").is(':checked')) {
            $('#Counterparty').val("Counterparty not in the list");
            return true;
        } else {
            var vCoounterparty = "";
            $('input:checkbox[name="Counterparty"]:checked').each(function () {
                if (vCoounterparty == "") {
                    vCoounterparty = unescape(this.value);
                }
                else {
                    vCoounterparty += "; " + unescape(this.value);
                }
            });
            if (vCoounterparty != "") {
                $('#Counterparty').val(vCoounterparty);
                return true;
            } else {
                $('#Counterparty').val("");
                //swal("", "No Counterparty has been selected.");
                return true;
            }
        }
    }
});

function CounterpartyCreate() {
    $('#loadCP').html('<img src="../Content/Images/icon/loading.gif"> Working on it...');
    if ($('#tblCounterparties tr').length <= 0) {
        CounterpartyFunc();
    } else {
        $('#loadCP').empty();
    }
    $("#pCounterpartyNotInList").css("display", "none");
    $("#browseCounterparty").dialog("option", "buttons", [{
        text: "Ok", click: function () {
            var vCoounterparty = "";
            $('input:checkbox[name="Counterparty"]:checked').each(function () {
                if (vCoounterparty == "") {
                    vCoounterparty = unescape(this.value);
                }
                else {
                    vCoounterparty += "; " + unescape(this.value);
                }
            });
            $("#txtCounterpartyCreate").val(vCoounterparty);
            $("#Counterparty").val(vCoounterparty);
            $(this).dialog("close");
        },
        Cancel: function () {
            $(this).dialog("close");
        }
    }]);
    $("#browseCounterparty").dialog("option", "title", "Counterparty Picker");
    $("#browseCounterparty").dialog("open");
}
function SelectContractRecElement() {
    var vSelectedElement = null;
    vSelectedElement = $('input[name=Contracts]:checked');
    strFinalizedDocumentsUrl = "";
    strDraftDocumentsUrl = "";
    $("#txtCounterpartyCreate").val("");
    $("#txtContractRecElement").val($(vSelectedElement).val());
    $("#txtContractRecElementID").val($(vSelectedElement).attr("id"));
    if ($("#txtContractRecElement").val() == "")
        $("#spCounterpartyCreate").css("display", "");
    else
        $("#spCounterpartyCreate").css("display", "none");

    setDocumentUrl();
}

function SearchContractRec() {
    $("#tblContractsTodo").empty();
    $('#dvLoading').css("display", "");
    $('#dvLoading').html('<img src="../Content/Images/icon/loading.gif"> Searching...');
    var vURL = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?searchkeyword=' + encodeURIComponent($("#txtSearchBoxTodoForm").val()) + '&customquery=&sortbyfield=ContractTitle&orderby=ASC';
    $.ajax({
        url: vURL,
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            var datalenght = data.length;
            var article = '';
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];
                var sRowKey = item.RowKey;
                var sContractTitle = item.ContractTitle;
                var sContractNumber = item.ContractNumber;

                article += '<li>';
                article += '<input id="' + sRowKey + '" type="radio" name="Contracts" class="css-checkbox" value="' + sContractTitle + '" />';
                article += '<label for="' + sRowKey + '" class="css-label">' + sContractTitle + '</label>';
                article += '</li>';
            }
            $("#tblContractsTodo").html(article);
            var vCount = $("#tblContractsTodo li").length;
            if (vCount != 0) {
                $('#dvLoading').html('');
                $('#compact-paginationContractsTodo').css('display', '');
                $('#compact-paginationContractsTodo').pagination({
                    items: vCount,
                    itemsOnPage: 15,
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
    var htmlFormatFile = '<tr id="trSignee' + totalFileCount + '">';
    htmlFormatFile += '<td class="width40">';
    htmlFormatFile += '<input id="txtSignee' + totalFileCount + '" name="SigneeName' + totalFileCount + '" placeholder="Signee Name" title="Signee Signee" type="text" class="f_inpt width90" />';
    htmlFormatFile += '</td>';
    htmlFormatFile += '<td class="width40">';
    htmlFormatFile += '<input id="txtEmail' + totalFileCount + '" name="SigneeEmail' + totalFileCount + '" placeholder="Signee Email" title="Signee Email" type="text" class="f_inpt width90 validemail" />';
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
    if (rowCount == 5) {
        $("#spAddSignee").css("display", "none");
        $("#spAddInternalSignee").css("display", "none");
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
    var htmlFormatFile = '<tr id="trInternalSignee' + totalFileCount + '">';
    htmlFormatFile += '<td class="width80">';
    htmlFormatFile += '<input id="txtInternalSignee' + totalFileCount + '" name="InternalSigneeName' + totalFileCount + '" placeholder="Signee Name" title="Signee" type="text" class="f_inpt width80" />';
    htmlFormatFile += '<span class="right-float"><a href="javascript:void(0)" onclick="BrowseInternalSignee(\'txtInternalSignee' + totalFileCount + '\', \'txtInternalEmail' + totalFileCount + '\')">Browse</a></span>';
    htmlFormatFile += '</td>';
    htmlFormatFile += '<td style="display:none;">';
    htmlFormatFile += '<input id="txtInternalEmail' + totalFileCount + '" name="InternalSigneeEmail' + totalFileCount + '" placeholder="Signee Email" title="Email" type="text" class="f_inpt width90 validemail" />';
    htmlFormatFile += '</td>';
    htmlFormatFile += '<td class="width20">';
    htmlFormatFile += '<select id="ddlInternalSigneeOrder' + totalFileCount + '" name="InternalSigneeOrder' + totalFileCount + '" onclick="ClickedOrder(this);" onchange="SelectedOrder(this);" class="f_inpt width100 SigneeOrder">';
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
    if (rowCount == 5) {
        $("#spAddSignee").css("display", "none");
        $("#spAddInternalSignee").css("display", "none");
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
function ClearResetSignee() {
    $("#" + $("#hdUserEmail").val()).val('');
    $("#" + $("#hdUserName").val()).val('');
    $('input:radio[name=SigneeUser]').attr('checked', false);
}
function BrowseInternalSignee(objName, objEmail) {
    $("#hdUserName").val(objName);
    $("#hdUserEmail").val(objEmail);
    //*Harshitha
    var selectedID = $("#" + $("#hdUserEmail").val()).val();
    if (selectedID != "") {
        var nospaceUserName = $("#" + $("#hdUserName").val()).val().replace(/ /g, "_");
        $('input:radio[name=SigneeUser][id="' + selectedID + '_' + nospaceUserName + '"]').attr('checked', 'checked');
    }
    else
        $('input:radio[name=SigneeUser]').attr('checked', false);
    $("#browseSigneeUser").dialog("option", "title", "Signee User");
    $("#browseSigneeUser").dialog("open");
}


function SelectedSignee() {
    var vSignee = $("input:radio[name=SigneeUser]:checked");
    var prevSignees = [];
    $('#tblInternalSignees tr td:first-child input').each(function () {
        if ($(this).val() != "")
            prevSignees.push($(this).val());
    });
    if (prevSignees.indexOf(vSignee.val()) > -1) {
        swal("", "Internal Signee already selected.");
    }
    else {
        $("#" + $("#hdUserEmail").val()).val(vSignee.attr('title'));
        $("#" + $("#hdUserName").val()).val(vSignee.val());
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

function SendForSignature() {

    var vValid = requiredValidator('sendForSignature');
    if (vValid) {
        $("#loadingPage").fadeIn();
        var contractForm = $("#frmSignees *, #frmInternalSignees *").serialize();
        contractForm += "&Subject=";
        contractForm += "&SigneeMsg=" + $("#txtSigneeMsg").val();
        contractForm += "&Subject=" + $("#txtSubject").val();
        if (RightSignatureFlag) {
            contractForm += "&ExpIn=" + $("#ddltxtExpIn").val();
        }
        else {
            contractForm += "&ExpIn=" + $("#txtExpIn").val();
        }
        contractForm += "&DocumentURL=" + $("#hdDocumentURL").val();
        var ccUsers = $("#ddlCC").val();
        var internalSigneeUsers = '';
        var cc = '';
        var ins = '';
        var datalenght = ccUsers.length;
        for (var i = 0; i < datalenght; i++) {
            var item = ccUsers[i];
            if (cc == '') {
                cc = item;
            }
            else {
                cc += "; " + item;
            }
        }
        contractForm += "&CC=" + cc;
        contractForm += "&InternalSignee=" + ins;
        var vDocID = $("#hdDocumentID").val();
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?documentid=' + vDocID,
            type: 'POST',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, 'RefreshToken': localStorage.RefreshToken, 'UserName': localStorage.UserName },
            data: contractForm,
            cache: false,
            success: function (person) {

                swal("", "Document Sent for Signature.");
                $("#sendForSignature").dialog("close");
                ClearSignatureForm();
                $("#loadingPage").fadeOut();
            },
            error: function (person) {

                swal("", person.responseText);
                $("#loadingPage").fadeOut();
            }
        });
    }
}

function getNameAndEmailSignDocument(ContractID) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/' + ContractID + '/contacts',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            var datalenght = data.length;
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];
                var vLastRow = $("#tblSignees tr:last").attr('id');
                var totalFileCount = "2";
                if (typeof vLastRow == "undefined") {
                    totalFileCount = "2";
                }
                else {
                    totalFileCount = parseInt(vLastRow.replace("trSignee", ""));
                    totalFileCount += 1;
                }
                if (i == 0) {
                    $('#txtSignee1').val(item.ContactName);
                    $('#txtEmail1').val(item.EmailID);
                }
                else if (i < 4) {
                    var htmlFormatFile = '<tr id="trSignee' + totalFileCount + '">';
                    htmlFormatFile += '<td class="width40">';
                    htmlFormatFile += '<input id="txtSignee' + totalFileCount + '" value="' + item.ContactName + '" name="SigneeName' + totalFileCount + '" placeholder="Signee Name" title="Signee Name" type="text" class="f_inpt width90" value="' + item.ContactName + '" />';
                    htmlFormatFile += '</td>';
                    htmlFormatFile += '<td class="width40">';
                    htmlFormatFile += '<input id="txtEmail' + totalFileCount + '" value="' + item.EmailID + '" name="SigneeEmail' + totalFileCount + '" placeholder="Signee Email" title="Signee Email" type="text" class="f_inpt width90 validemail" value="' + item.EmailID + '" />';
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
                    $("#ddlSigneeOrder" + totalFileCount).val(i + 2);
                }
            }
        },
        error: function () {
        }

    });
}

function ClearSignatureForm() {
    $("#hdDocumentID").val('');
    $("#hdDocumentURL").val('');
    $("#txtSubject").val('');
    $("#txtSigneeMsg").val('');
    $("#txtExpIn").val('3');

    GetValuesAndAutoPopulate("ddlCC", "");
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
    vSignee += '<input id="txtInternalSignee1" name="InternalSigneeName1" placeholder="Signee Name" title="Signee" type="text" class="f_inpt width80" />';
    vSignee += '<span class="right-float"><a href="javascript:void(0)" onclick="BrowseInternalSignee(\'txtInternalSignee1\', \'txtInternalEmail1\')">Browse</a></span>';
    vSignee += '</td>';
    vSignee += '<td style="display:none;">';
    vSignee += '<input id="txtInternalEmail1" name="InternalSigneeEmail1" placeholder="Signee Email" title="Email" type="text" class="f_inpt width90 validemail" />';
    vSignee += '</td>';
    vSignee += '<td class="width20">';
    vSignee += '<select id="ddlInternalSigneeOrder1" name="InternalSigneeOrder1" onclick="ClickedOrder(this);" onchange="SelectedOrder(this);" class="f_inpt width100 SigneeOrder">';
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

function BindCC() {
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
                var sEmail = item.EmailID;
                var article = '<option value="' + sUserName + '">' + sUserName + '</option>';
                $("#ddlCC").append(article);
                var nospaceUserName = sUserName.replace(/ /g, "_");
                var sUser = '<li>';
                //sUser += '<input id="' + sEmail + '" type="radio" name="SigneeUser" class="css-checkbox" value="' + sUserName + '" />';
                //sUser += '<label for="' + sEmail + '" class="css-label">' + sUserName + '</label>';
                sUser += '<input id="' + sEmail + '_' + nospaceUserName + '" title="' + sEmail + '" type="radio" name="SigneeUser" class="css-checkbox" value="' + sUserName + '" />';
                sUser += '<label for="' + sEmail + '_' + nospaceUserName + '" class="css-label">' + sUserName + '</label>';
                sUser += '</li>';
                $("#tblSigneeUser").append(sUser);
            }

            $("#ddlCC").chosen();
            $('.chosenmulti').on('chosen:showing_dropdown', function (evt, params) {
                $('.result-selected').css('display', 'none');
            });
        },
        error:
            function (data) {
            }
    });
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

function AddShareDocument() {
    var vLastRow = $("#tblShareDocument tr:last").attr('id');
    var count = $("#tblShareDocument tr").length;

    var totalFileCount = "2";
    if (typeof vLastRow == "undefined") {
        totalFileCount = "2";
    }
    else {
        totalFileCount = parseInt(vLastRow.replace("trShareDocument", ""));
        totalFileCount += 1;
    }


    if (count < 10) {

        var htmlFormatFile = '<tr id="trShareDocument' + totalFileCount + '">';
        htmlFormatFile += '<td>';
        htmlFormatFile += '<input id="txtShareDocument' + totalFileCount + '" maxlength="42" name="ShareDocumentName' + totalFileCount + '" placeholder="Name" maxlength="100" title="Name" type="text" class="f_inpt width90" />';
        htmlFormatFile += '</td>';
        htmlFormatFile += '<td>';
        htmlFormatFile += '<input id="txtShareDocumentEmail' + totalFileCount + '" maxlength="50" name="ShareDocumentEmail' + totalFileCount + '" placeholder="Email ID" maxlength="50" title="Email Id" type="text" class="f_inpt width90 validemail" />';
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
        $("#loadingPage").fadeIn();
        var contractForm = $("#frmShareDocument *").serialize();
        contractForm += "&SendBy=" + localStorage.UserName;
        contractForm += "&Notes=" + $("#txtShareNotes").val();
        contractForm += "&ExpIn=" + $("#txtShareExpIn").val();
        contractForm += "&AllowComment=" + 'Yes';
        contractForm += "&AllowDownload=";
        contractForm += "&AllowUpload=" + 'Yes';
        var notify = $("#ddlContractShareInternal").chosen().find("option:selected");
        var notyEmail = "";

        $(notify).each(function (i, item) {
            var email = $(item).attr("data-emailvalue");
            if (email != null && email.trim() != "") {

                var name = item.text;
                notyEmail += name + "~" + email.trim() + ";";
            }
        });

        contractForm += "&InternalUsers=" + notyEmail;
        var vDocID = $("#hdDocumentID").val();
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/Share?documentid=' + vDocID,
            type: 'POST',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
            data: contractForm,
            cache: false,
            success: function (person) {

                swal("", "Document Shared.");
                $("#shareDocument").dialog("close");
                $("#loadingPage").fadeOut();
                ClearShareForm();
            },
            error: function (person) {
                $("#loadingPage").fadeOut();
            }
        });
    }
}

function ClearShareForm() {
    $("#hdDocumentID").val('');
    $("#txtShareNotes").val('');
    $("#txtShareTo").val('');
    $("#txtShareExpIn").val('3');
    GetValuesAndAutoPopulate("ddlDocumentShareInternal", "");
    $('#tblShareDocument').empty();
    var vSignee = '<tr>';
    vSignee += '<td>';
    vSignee += '<input id="txtShareDocument1" maxlength="42" name="ShareDocumentName1" title="Name" placeholder="Name" type="text" class="f_inpt width90 validelement" />';
    vSignee += '</td>';
    vSignee += '<td>';
    vSignee += '<input id="txtShareDocumentEmail1" maxlength="50" name="ShareDocumentEmail1" title="Email ID" placeholder="Email ID" type="text" class="f_inpt width90 validelement validemail" />';
    vSignee += '</td>';
    vSignee += '<td style="width:20px">&nbsp;</td>';
    vSignee += '</tr>';
    $('#tblShareDocument').html(vSignee);
}

$("input:radio[name=IsFinalized]").click(function () {
    setDocumentUrl();
});

$("#lblFolderUrl").click(function () {
    CreateFolder();
    $("#browseFolder").dialog("option", "title", "Select Folder");
    $("#browseFolder").dialog("open");
});

$("#btnNewFolder").click(function () {
    if ($(this).text().trim() == "New Folder") {
        $("#txtNewFolderName").css('display', '');
        $(this).text('Cancel');
    } else if ($(this).text().trim() == "Cancel") {
        $("#txtNewFolderName").css('display', 'none');
        $(this).text('New Folder');
    }

});

function setDocumentUrl() {
    getContractData($('#txtContractRecElementID').val(), 'tblContentControls', $("#ddlDocumentTemplate").find('option:selected').text());

    if ($("input:radio[name=IsFinalized]:checked").val() == "Yes") {
        if (strFinalizedDocumentsUrl != "") {
            $("#txtNewFolderName").val("");
            $("#txtNewFolderName").css('display', 'none');
            $("#lblFolderUrl").text(strFinalizedDocumentsUrl + "/");
            $("#btnNewFolder").css('display', '');
        } else {
            $("#txtNewFolderName").css('display', '');
            $("#lblFolderUrl").text('/Finalized Documents/');
            $("#btnNewFolder").css('display', 'none');
            if ($("#txtContractRecElementID").val() != "0" || $("#txtContractRecElementID").val() != "") {
                $("#txtNewFolderName").val($("#txtContractRecElement").val().replace(/[\*\|\,\"\:\<\>\[\}\{\}\'\(\)\@\&\$\#\%\.\-\!\@\$]/g, '').replace(/\//g, '').replace(/\s\s+/g, " "));
            }
        }
        if (SaveFinalInCloud == "on") {
            $("#rad_CopyLibraryAndAzure").attr('checked', 'checked');
        } else {
            $("#rad_CopyLibrary").attr('checked', 'checked');
        }
    } else {
        if (strDraftDocumentsUrl != "") {
            $("#txtNewFolderName").val("");
            $("#txtNewFolderName").css('display', 'none');
            $("#lblFolderUrl").text(strDraftDocumentsUrl + "/");
            $("#btnNewFolder").css('display', '');
        } else {
            $("#txtNewFolderName").css('display', '');
            $("#lblFolderUrl").text('/Draft Documents/');
            $("#btnNewFolder").css('display', 'none');
            if ($("#txtContractRecElementID").val() != "0" || $("#txtContractRecElementID").val() != "") {
                $("#txtNewFolderName").val($("#txtContractRecElement").val().replace(/[\*\|\,\"\:\<\>\[\}\{\}\'\(\)\@\&\$\#\%\.\-\!\@\$]/g, '').replace(/\//g, '').replace(/\s\s+/g, " "));
            }
        }
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
    }

}

function BindO365LibrarySettings() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/getdocumentsettings',
        type: 'GET',
        dataType: 'json',
        cache: false,
        async: false,
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

var selectedSortOption = "";
function highlight(obj) {

    $('#tdSort a').each(function (i, item) {
        item.style.backgroundColor = "";
    });
    obj.style.backgroundColor = "#cccccc";

    selectedSortOption = obj.textContent;

}

function SearchCounterparty() {
    $("#tblCounterparties").html('');
    $('#loadCP').html('<img src="../Content/Images/icon/loading.gif"> Searching...');
    var vURL = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/getrelatedcounterparty?searchkeyword=' + encodeURIComponent($("#txtSearchBoxCounterparty").val()) + '&customquery=&sortbyfield=CounterpartyName&orderby=ASC';
    $.ajax({
        url: vURL,
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'BusinessAreaLocation': localStorage.GlobalBusinessAreaLocation },
        cache: false,
        success: function (data) {
            var arr = [];
            if ($('#Counterparty').val() != null) {
                $.each($('#Counterparty').val().split(";"), function () {
                    arr.push($.trim(this));
                });
            }
            var datalenght = data.length;
            var article = '';
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];
                if (i == 0) {
                    article += '<tr><th>Counterparty Name</th><th>Counterparty Type</th></tr>';
                }
                article = '<tr><td>';
                if (arr.indexOf(item.CounterpartyName) >= 0) {
                    article += '<input id="CP' + item.RowKey + '" type="checkbox" name="Counterparty" class="css1-checkbox" checked value="' + escape(item.CounterpartyName) + '" />';
                } else {
                    article += '<input id="CP' + item.RowKey + '" type="checkbox" name="Counterparty" class="css1-checkbox" value="' + escape(item.CounterpartyName) + '" />';
                }

                article += '<label for="CP' + item.RowKey + '" class="css1-label"  style="display: inline;">' + item.CounterpartyName + '</label>';
                article += '</td><td>' + item.CounterpartyType + '';
                article += '</td></tr>';
            }
            $('#loadCP').empty();
            $("#tblCounterparties").html(article);
            article = '';
            var vCount = $("#tblCounterparties tr").length;
            if (vCount != 0) {
                $('#loadCP').html('');
                $('#compact-paginationCounterparties').css('display', '');
                $('#compact-paginationCounterparties').pagination({
                    items: vCount,
                    itemsOnPage: 10,
                    typeID: 'tblCounterparties',
                    cssStyle: 'compact-theme'
                });
            } else {
                $('#loadCP').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No Counterparty Found!</p>')
                $('#compact-paginationCounterparties').css('display', 'none');
            }
        },
        error: function () {
            $('#compact-paginationCounterparties').css('display', 'none');
            $('#loadCP').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No Counterparty Found!</p>')
        }
    });

}

function BindContractsLocal() {
    $('#dvLoading').css("display", "");
    $("#tblContractsTodo").empty();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            var v = $(data).length;
            var contractTags = [];
            var datalenght = data.length;
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];
                var sRowKey = item.RowKey;
                var sContractTitle = item.ContractTitle;
                var sContractNumber = item.ContractNumber;

                var article = '<li>';
                article += '<input id="' + sRowKey + '" type="radio" name="Contracts" class="css-checkbox" value="' + sContractTitle + '" />';
                article += '<label for="' + sRowKey + '" class="css-label">' + sContractTitle + '</label>';
                article += '</li>';
                $("#tblContractsTodo").append(article);
                if (i == v - 1) {
                }
                contractTags.push(sContractTitle);
            }

            $("#txtSearchBoxTodoForm").autocomplete({
                source: contractTags,
                minLength: 2,
                focus: function (event, ui) {
                    return false;
                },
                select: function (evn, uidetails) {
                    $("#txtSearchBoxTodoForm").val(uidetails.item.label);
                    search();
                }
            });

            var vCount = $("#tblContractsTodo li").length;
            $('#compact-paginationContractsTodo').pagination({
                items: vCount,
                itemsOnPage: 10,
                type: 'ul',
                typeID: 'tblContractsTodo',
                row: 'li',
                cssStyle: 'compact-theme'
            });
            $('#dvLoading').css("display", "none");
            $("#dvContractRec").dialog("option", "title", "Select Contract");
            $("#dvContractRec").dialog("open");
            $('#dvLoading').html('');
        },
        error:
            function (data) {
            }
    });
}

//CounterParty Businessarea
var BAOwnersselecteditems = [];
function ViewOwnerofBusinessArea() {

    $('#txtBAOwnerofPath').val("");
    $('#txtBAOwnerof').val("");


    if ($("#txtOwnerofBusinessArea").val() != "") {
        BAOwnersselecteditems = $("#txtOwnerofBusinessArea").val().split(';');
        var selecteditemslength = BAOwnersselecteditems.length;
        $('#liSelectedBAOwners').html("");
        for (var i = 0; i < selecteditemslength; i++) {
            var re = new RegExp(" ", 'g');
            var str = BAOwnersselecteditems[i].trim().replace(re, '');
            if (selectedBusinessAreaID11.length >= i + 1)
                $('#liSelectedBAOwners').append('<span id="BAF_' + str + '" style="font-size:11px;">' + BAOwnersselecteditems[i].trim() + '<img src="/Content/Images/close-quick.png" id=' + selectedBusinessAreaID11[i][1] + ' onclick="javascript:liRemoveBAOwnersselecteditems(this,' + BAOwnersselecteditems.indexOf(BAOwnersselecteditems[i]) + ');" style="float:right" /></span>');
        }
    }
    else {
        $('#liSelectedBAOwners').html("");
        BAOwnersselecteditems = [];
    }

    $("#browseBAOwners").dialog("option", "title", "Browse Business Area");
    $("#browseBAOwners").dialog("open");
}

var article11 = "";
var articleBusinessAreaCounterp = "";
var BusinessAreaAccessCounterp = [];
function BindBusinessAreaPicker11() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/entities',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            //if (localStorage.UserType.indexOf("Global Contract Owner") >= 0) {
            //    recursiveIteration11(data)
            //    $("#tbodyBusinessArea11").append(article11);
            //    if (article11 == "") {
            //        $("#tbodyBusinessArea11").append("<tr><td><p class='f_p-error'>No items found.</p></td></tr>");
            //    }
            //}
            //else {
            BindBusinessAreMenuCounterp(data);
            //}

            //$("#example-basic-11").treetable({ expandable: true, initialState: "expanded" });
        },
        error:
            function (data) {
            }
    });
}

function recursiveIteration11(object) {
    if (object.ChildrenData.length != 0) {

        for (var i = 0; i < object.ChildrenData.length; i++) {
            var item = object.ChildrenData[i];
            // if (item.RowKey != "GenBA" && item.RowKey != "GenCA") {
            var additional = "";

            if (item.ParentBusinessAreaID == 0) {
                additional = '<span>' + item.BusinessAreaName + '</span>'
                strContractAreaName11 = item.BusinessAreaName;
                strContractAreaName11Owner = item.Owner;
                article11 += '<tr data-tt-id="tre-' + item.RowKey + '" class="branch expanded">';
                article11 += '<td class="treeHead"><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaName11 + '</span><span id="ContractAreaAdmin" style="display:none;">' + strContractAreaName11Owner + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/globset.png" /><small>' + additional + '</small></td></tr>';
            } else {
                if (strContractAreaName11 == thisContractAreaName && item.BusinessAreaName == thisBusinessAreaName) {
                    thisBusinessAreaNameRowKey = item.RowKey;
                    thisContractAreaNameRowKey = strContractAreabusinesarearowkeyCounterp;
                }
                additional = '<span style="color:#3487ce; cursor:pointer;" onclick="javascript:treeviewclick11(this)">' + item.BusinessAreaName + '</span>'
                article11 += '<tr data-tt-id="tre-' + item.RowKey + '" data-tt-parent-id="tre-' + item.ParentBusinessAreaID + '" class="branch collapsed" style="display: table-row;">';
                article11 += '<td><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaName11 + '</span><span id="ContractAreaAdmin" style="display:none;">' + strContractAreaName11Owner + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/gen.png" /><small>' + additional + '</small></td></tr>';
            }
        }

        recursiveIteration11(object.ChildrenData[i])
        // }
    }
}

$('input[type=radio][name=IsGlobal]').change(function () {
    if (this.value == 'Yes') {
        $("#trcp-RgBusi").hide();
        $("#txtOwnerofBusinessArea").removeClass("validelement");


    }
    else if (this.value == 'No') {
        if ($("#txtOwnerofBusinessArea").val() == "")
            addDefaultBusinessareaCounterparty($("#txtOwnerofBusinessArea").val().trim());
        $("#trcp-RgBusi").show();
        $("#txtOwnerofBusinessArea").addClass("validelement");
    }
});
var selectedBusinessAreaID11 = [];
var DeletedBusinessAreaID = [];
function treeviewclick11(obj) {
    var strBusinessAreaName = obj.textContent;
    var rowKey = obj.parentNode.parentNode.childNodes[2].textContent;
    var parentBusinessAreaID = obj.parentNode.parentNode.childNodes[1].textContent;
    var contractAreaName = obj.parentNode.parentNode.childNodes[3].textContent;
    var contractAreaNameOwner = obj.parentNode.parentNode.childNodes[4].textContent;


    $('#txtBAOwnerofPath').val(parentBusinessAreaID);
    $('#txtBAOwnerof').val(strBusinessAreaName);

    // Find and remove item from an array
    var i = BAOwnersselecteditems.indexOf(strBusinessAreaName);
    if (i != -1) {

    } else {
        BAOwnersselecteditems.push(strBusinessAreaName);
        $('#liSelectedBAOwners').append('<span style="font-size:11px;">' + strBusinessAreaName + '<img src="/Content/Images/close-quick.png" id=' + rowKey + ' onclick="javascript:liRemoveBAOwnersselecteditems(this);" style="float:right" /></span>');
    }
    $('#txtBAOwnerof').val(BAOwnersselecteditems);

    var found = $.grep(selectedBusinessAreaID11, function (value) {
        return value[1] == rowKey;
    });

    //  var i = selectedBusinessAreaID11.indexOf(rowKey);
    if (found != null && typeof (found) != "undefined" && found.length != 0) {

    } else {
        var rowK = jQuery.grep(BusinessAreaPathRowKey, function (a) {
            return a[1] === rowKey;
        });
        if (rowK != null && typeof (rowK) != "undefined" && rowK.length != 0) {
            selectedBusinessAreaID11 = $.grep(selectedBusinessAreaID11, function (value) {
                return value[1] != rowK[0][1];
            });
            selectedBusinessAreaID11.push([rowK[0][0], rowK[0][1]])
        }

    }
}


function liRemoveBAOwnersselecteditems(obj) {

    var child = obj.parentNode;
    var i = BAOwnersselecteditems.indexOf(child.textContent.trim());
    if (i != -1) {
        BAOwnersselecteditems.splice(i, 1);
    }
    child.parentNode.removeChild(child);

    //remove id from array
    selectedBusinessAreaID11 = $.grep(selectedBusinessAreaID11, function (value) {
        return value[1] != obj.id;
    });

}
function liRemoveBAOwnersselecteditems(obj, index) {

    var child = obj.parentNode;
    var innertextvale = child.textContent;
    index = BAOwnersselecteditems.indexOf(innertextvale);
    child.parentNode.removeChild(child);
    if (index != -1) {
        BAOwnersselecteditems.splice(index, 1);
    }
    DeletedBusinessAreaID.push(obj.id);
    //remove id from array
    selectedBusinessAreaID11 = $.grep(selectedBusinessAreaID11, function (value) {
        return value[1] != obj.id;
    });
}
function BindBusinessAreMenuCounterp(data) {
    if (typeof (BusinessAreaAccess) == "undefined" || BusinessAreaAccess == null || BusinessAreaAccess.length == 0) {
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/users/' + localStorage.UserID + '/businessareapermission',
            type: 'GET',
            dataType: 'json',
            'Content-Type': 'application/json',
            cache: true,
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            success: function (entity) {
                var BAreaAccess = entity.BusinessArea + ";" + entity.BusinessAreaContribute + ";" + entity.OwnerOfBusinessAreas;

                var newArray = BAreaAccess.split(';').filter(function (v) { return v !== '' }); // remove empty
                BusinessAreaAccessCounterp = newArray;

                /* Business Area Popup Start */

                recursiveIterationCounterp("", data)
                $("#tbodyBusinessArea11").append(articleBusinessAreaCounterp);
                if (articleBusinessAreaCounterp == "") {
                    $('#tbodyBusinessArea11').empty();
                    $("#tbodyBusinessArea11").append("<tr><td><p class='f_p-error'>No items found.</p></td></tr>");
                }
                articleBusinessAreaCounterp = "";
                $("#example-basic-11").treetable({ expandable: true, initialState: "expanded" }, true);


            },
            error:
                function (data) {
                }
        });

    }
    else {
        if (typeof (BusinessAreaAccess) == "object" && BusinessAreaAccess.length > 1) {
            BusinessAreaAccessCounterp = BusinessAreaAccess;
        }
        else
            BusinessAreaAccessCounterp.push(BusinessAreaAccess);


        recursiveIterationCounterp("", data)
        $("#tbodyBusinessArea11").append(articleBusinessAreaCounterp);
        if (articleBusinessAreaCounterp == "") {
            $('#tbodyBusinessArea11').empty();
            $("#tbodyBusinessArea11").append("<tr><td><p class='f_p-error'>No items found.</p></td></tr>");
        }
        articleBusinessAreaCounterp = "";
        $("#example-basic-11").treetable({ expandable: true, initialState: "expanded" }, true);

    }
}
var businessareaHeaderMenuCounterp = "";
var articleBusinessArea2Counterp = "";
var strContractAreaNameMenuCounterp = "";
var strContractAreaNameMenuOwnerCounterp = "";
var MyBusinessAreaCountCounterp = 0;
var strContractAreaAdminCounterp = "";
var strContractAreaNameCounterp = "";
var strContractAreabusinesarearowkeyCounterp = "";
var previousidCounterp = "";
var strContractAreaIDLayoutCounterp = '';
var strContractAreaName12Counterp = "";
var strContractAreaName12OwnerCounterp = "";
var previousidCounterp = "";
function recursiveIterationCounterp(path, object) {
    if (object.ChildrenData.length != 0) {
        for (var i = 0; i < object.ChildrenData.length; i++) {
            var item = object.ChildrenData[i];
            var spath = '';
            if (path == '') {
                spath = item.BusinessAreaName;
                BusinessAreaPathRowKey.push([spath, item.RowKey]);
            }
            else {
                spath = path + ' > ' + item.BusinessAreaName;
                BusinessAreaPathRowKey.push([spath, item.RowKey]);
            }
            var additional = "";
            var found = $.grep(BusinessAreaAccessCounterp, function (n, ind) {
                return (n.indexOf(spath) == 0);
            });
            //var found = _.some(BusinessAreaAccessWithRead, function (value) {
            //    return value.indexOf(spath) != -1;
            //});
            if (found.length > 0 || localStorage.UserType.indexOf("Global Contract Owner") >= 0 || item.RowKey == "GenCA" || item.RowKey == "GenBA") {

                if (item.ParentBusinessAreaID == 0) {
                    additional = '<span>' + item.BusinessAreaName + '</span>'
                    strContractAreaName12Counterp = item.BusinessAreaName;
                    strContractAreaName12OwnerCounterp = item.Owner;
                    articleBusinessAreaCounterp += '<tr data-tt-id="tre-' + item.RowKey + '" class="branch expanded">';
                    articleBusinessAreaCounterp += '<td class="treeHead"><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaName12Counterp + '</span><span id="ContractAreaAdmin" style="display:none;">' + strContractAreaName12OwnerCounterp + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/globset.png" /><small>' + additional + '</small></td></tr>';
                } else {
                    if (strContractAreaName12Counterp == thisContractAreaName && item.BusinessAreaName == thisBusinessAreaName) {
                        thisBusinessAreaNameRowKey = item.RowKey;
                        thisContractAreaNameRowKey = strContractAreabusinesarearowkeyCounterp;
                    }
                    additional = '<span style="color:#3487ce; cursor:pointer;" onclick="javascript:treeviewclick11(this)">' + item.BusinessAreaName + '</span>'
                    articleBusinessAreaCounterp += '<tr data-tt-id="tre-' + item.RowKey + '" data-tt-parent-id="tre-' + item.ParentBusinessAreaID + '" class="branch collapsed" style="display: table-row;">';
                    articleBusinessAreaCounterp += '<td><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaName12Counterp + '</span><span id="ContractAreaAdmin" style="display:none;">' + strContractAreaName12OwnerCounterp + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/gen.png" /><small>' + additional + '</small></td></tr>';
                }

                recursiveIterationCounterp(spath, object.ChildrenData[i])
            }
        }
    }
    //if (object.ChildrenData.length != 0) {
    //    BindRecBACounterp('', object);
    //}
}

var BusinessAreaPathRowKey = [];
var j = 1;
function BindRecBACounterp(path, object) {
    for (var i = 0; i < object.ChildrenData.length; i++) {
        var item = object.ChildrenData[i];
        var additional = "";
        var spath = '';
        if (path == '') {
            spath = item.BusinessAreaName;
            BusinessAreaPathRowKey.push([spath, item.RowKey]);
        }
        else {
            spath = path + ' > ' + item.BusinessAreaName;
            BusinessAreaPathRowKey.push([spath, item.RowKey]);
        }
        //var found = $.grep(BusinessAreaAccessWithRead, function (k,value) {
        //    return (value.indexOf(spath) != -1); 
        //});
        var found = $.grep(BusinessAreaAccessCounterp, function (n, ind) {
            return (n.indexOf(spath) == 0);
        });
        //var found = _.some(BusinessAreaAccessWithRead, function (value) {
        //    return value.indexOf(spath) != -1;
        //});
        if (found.length > 0 || localStorage.UserType.indexOf("Global Contract Owner") >= 0 || item.RowKey == "GenCA" || item.RowKey == "GenBA") {

            if (item.ParentBusinessAreaID != 0) {
                if (strContractAreaNameCounterp == thisContractAreaName && item.BusinessAreaName == thisBusinessAreaName) {
                    thisBusinessAreaNameRowKey = item.RowKey;
                    thisContractAreaNameRowKey = strContractAreabusinesarearowkeyCounterp;
                }
                if (item.Owner.trim().split(';').indexOf(localStorage.UserName.trim()) > -1) {//if business owner
                    additional = '<span style="color:#3487ce; cursor:pointer;" onclick="javascript:treeviewclick11(this)">' + item.BusinessAreaName + '</span>&nbsp; <img src="/Content/Images/icon/profile.png" style="cursor:default;" />'
                } else { //if permission in business area
                    additional = '<span style="color:#3487ce; cursor:pointer;" onclick="javascript:treeviewclick11(this)">' + item.BusinessAreaName + '</span>'
                }
            } else {
                additional = '<span>' + item.BusinessAreaName + '</span>';
            }
            if (additional != "") {
                if (item.ParentBusinessAreaID == 0) {
                    strContractAreaNameCounterp = item.BusinessAreaName;
                    strContractAreabusinesarearowkeyCounterp = item.RowKey;
                    strContractAreaAdminCounterp = item.Owner;
                    articleBusinessAreaCounterp += '<tr data-tt-id="tre-' + item.RowKey + '" class="branch expanded">';
                    articleBusinessAreaCounterp += '<td class="treeHead"><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaNameCounterp + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/globset.png" /><small>' + additional + '</small></td></tr>';
                } else {

                    articleBusinessAreaCounterp += '<tr data-tt-id="tre-' + item.RowKey + '" data-tt-parent-id="tre-' + item.ParentBusinessAreaID + '" class="branch collapsed" style="display: table-row;">';

                    if (previousidCounterp == item.ParentBusinessAreaID) {
                        //find if child business area exists
                        if (object.ChildrenData.length == 0) {
                            articleBusinessAreaCounterp += '<td><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaNameCounterp + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/gen.png" class="padding_left_65px" /><small>' + additional + '</small></td></tr>';
                        } else {
                            var spandis = object.ChildrenData.length * 2 * 5 * j;
                            articleBusinessAreaCounterp += '<td><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaNameCounterp + '</span><span class="indenter" style="padding-left: ' + spandis + 'px;"></span><img src="/Content/Images/icon/gen.png" /><small>' + additional + '</small></td></tr>';
                        }
                        //$.ajax({
                        //    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/childbusinessareas?businessareaid=' + item.RowKey,
                        //    type: 'GET',
                        //    dataType: 'json',
                        //    'Content-Type': 'application/json',
                        //    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                        //    async: false,
                        //    success: function (data) {
                        //        if (data.length == 0) {
                        //            articleBusinessArea += '<td><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaName + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/gen.png" class="padding_left_65px" /><small>' + additional + '</small></td></tr>';
                        //        } else {
                        //            articleBusinessArea += '<td><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaName + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/gen.png" /><small>' + additional + '</small></td></tr>';
                        //        }
                        //    },
                        //    error:
                        //        function (data) {

                        //        }
                        //});
                    } else {
                        articleBusinessAreaCounterp += '<td><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaNameCounterp + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/gen.png" /><small>' + additional + '</small></td></tr>';
                    }
                    if (previousidCounterp != item.ParentBusinessAreaID)
                        previousidCounterp = item.RowKey;
                }
            }
            //    recursiveIteration(object.ChildrenData[i])

            //if (object.ChildrenData.length > 0)
            //    recursiveIteration(object.ChildrenData[i])

            if (object.ChildrenData.length > 1) {
                j += 1;
                BindRecBACounterp(spath, object.ChildrenData[i]);

                if (j > 1)
                    j = j - 1;
                else
                    j = 1;
            }
            else if (object.ChildrenData.length == 1) {
                j += 1;
                BindRecBACounterp(spath, object.ChildrenData[i]);
                j = 1;
            }
        }
    }
}
function addDefaultBusinessareaCounterparty(path) {
    var rowK = jQuery.grep(BusinessAreaPathRowKey, function (a) {
        return a[0] === path;
    });
    if (typeof (rowK) != "undefined" && rowK != null && rowK.length != 0) {
        var thisBusinessAreaNameb = rowK[0][1];
        var thisBusinessAreaNameRowKeyb = rowK[0][0];
        $('#txtBAOwnerof').val(thisBusinessAreaNameb);

        // Find and remove item from an array
        var i = BAOwnersselecteditems.indexOf(thisBusinessAreaNameb);
        if (i != -1) {

        } else {
            BAOwnersselecteditems.push(thisBusinessAreaNameb);
            $('#liSelectedBAOwners').append('<span style="font-size:11px;">' + thisBusinessAreaNameb + '</span>');
        }
        $('#txtBAOwnerof').val(BAOwnersselecteditems);

        var found = $.grep(selectedBusinessAreaID11, function (value) {
            return value[1] == thisBusinessAreaNameRowKeyb;
        });

        //  var i = selectedBusinessAreaID11.indexOf(rowKey);
        if (found != null && typeof (found) != "undefined" && found.length != 0) {

        } else {
            var rowK = jQuery.grep(BusinessAreaPathRowKey, function (a) {
                return a[1] === thisBusinessAreaNameRowKeyb;
            });
            if (rowK != null && typeof (rowK) != "undefined" && rowK.length != 0) {
                selectedBusinessAreaID11 = $.grep(selectedBusinessAreaID11, function (value) {
                    return value[1] != rowK[0][1];
                });
                selectedBusinessAreaID11.push([rowK[0][0], rowK[0][1]])
            }

        }
        $("#txtOwnerofBusinessArea").val(thisBusinessAreaNameb);
    }

}



var contractItemrec = '';
function BindContractDetails(contractid) {

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?contractid=' + contractid,
        type: 'GET',
        cache: false,
        contentType: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID },
        processData: false,
        async: false,
        success: function (item) {
            contractItemrec = item;
        },
        error: function (dat) {
            contractItemrec = "";
        }
    })
}
function getShareNameandEmailIdInternal(scontrid, popUpModalName) {
    if (contractItem != "") {
        var UsersToShow = contractItemrec.ContractManagers + ";" + contractItemrec.BusinessOwners + ";" + contractItemrec.CreatedBy + ";" + contractItemrec.Approvers + ";" + contractItemrec.Reviewers + ";" + contractItemrec.Signees + ";" + contractItemrec.Requestor;
        var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
        var vAccFeat = $.grep(veContractFeatures, function (n, i) {
            return (n.RowKey == "11" && n.Status == "ON");
        });
        if (vAccFeat.length > 0) {
            try {
                if (contractItemrec.ProjectManager == null || contractItemrec.ProjectManager == "") {
                    UsersToShow += ";" + contractItemrec.ProjectManager;
                }
            }
            catch (ex) {

            }
        }
        HideOptionsNotRequiredExcept(popUpModalName, UsersToShow);
    }
    else {
        HideOptionsNotRequiredExcept(popUpModalName, "");
    }
}
function HideOptionsNotRequiredExcept(controlname, values) {

    var multiarr = [];
    var res = values != null ? values.split(";") : [];
    var reslength = res.length;
    var resValue = "";
    $("#" + controlname).children('option').hide();
    $('#' + controlname).chosen().trigger("chosen:updated");

    for (var i = 0; i < reslength; i++) {
        //   multiarr.push(res[i].trim());
        resValue = res[i].trim();
        if (resValue != "") {
            if ($('#' + controlname).children('option').filter(function () { return $(this).text() == resValue; }).length > 0 && multiarr.indexOf(resValue) == -1) {
                $('#' + controlname).children('option').filter(function () { return $(this).text() == resValue; }).show();
                multiarr.push(resValue);
            }
        }
    }
    if (multiarr.length == 0) {
        $('#' + controlname).attr("data-placeholder", "No users available").chosen();
    }
    else {
        $('#' + controlname).attr("data-placeholder", "Select User(s)").chosen();
    }
    $('#' + controlname).chosen().trigger("chosen:updated");
}
function GetTextAndAutoPopulateNotHidden(controlname, values) {

    var multiarr = [];
    var res = values != null ? values.split(";") : [];
    var reslength = res.length;
    var resValue = "";
    for (var i = 0; i < reslength; i++) {
        //   multiarr.push(res[i].trim());
        resValue = res[i].trim();
        if (resValue != "") {
            if ($('#' + controlname + ' option[value="' + resValue + '"]').length > 0 && multiarr.indexOf(resValue) == -1 && $('#' + controlname + ' option[value="' + resValue + '"]').css("display") != "none") {
                multiarr.push(resValue);
            }

        }
    }


    ChosenOrder.setSelectionOrder($('#' + controlname), multiarr, true);

}
