
var droppedfiles = [];
var cTitle = null;
var cFlag = null;
var removedItems = [];
var GlobalBusinessAreaName = "";
var GlobalContactAreaname = "";
var thisGlobalBusinessAreaName = "";
var thisGlobalContactAreaname = "";
var documenturltofetch = '';
var articaldocumenttype = '';
var dropexitfilename = [];
var vPipelineStatus = ["New", "Drafting", "Awaiting Review", "Reviewed", "Awaiting Approval", "Approved", "In Negotiation", "Negotiation Complete"];
var vContractStatus = ["Ready for Signature", "Awaiting Signatures", "Signed", "Active", "Up for Renewal", "Renewed", "Extended", "On Hold", "Replaced", "Expired", "Cancelled", "Terminated", "Archived"];
//manoj
//For Chunk File
var parentfolderidtopass = "";
var dropdownlength = 0;
var uploadedfilecount = 0;
var contractparentfolderid = "";
var OCRisEnabled = false;
//For Chunk File
//manoj


$(document).ready(function () {
    // Check for the various File API support.
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        // Great success! All the File APIs are supported.
    } else {
        // alert('The File APIs are not fully supported in this browser.');
        swal("", "The File APIs are not fully supported in this browser.");
    }

    var veContractFeatures_OCR = JSON.parse(localStorage.getItem("eContractFeatures"));
    var vDocLibFeat_OCR = $.grep(veContractFeatures_OCR, function (n_OCR, i_OCR) {
        return (n_OCR.RowKey == "25" && n_OCR.Status == "ON");
    });
    if (vDocLibFeat_OCR.length > 0) {
        OCRisEnabled = true;
    } else {
        OCRisEnabled = false;
    }

    if (typeof localStorage.GlobalBusinessAreaLocation != 'undefined') {
        if (localStorage.GlobalBusinessAreaLocation == "All") {
            thisGlobalContactAreaname = "";
            thisGlobalBusinessAreaName = "";
            $(".gloabalarea").css("display", "");
        }
        else {
            $(".gloabalarea").css("display", "none");
            thisGlobalBusinessAreaName = localStorage.GlobalBusinessArea;
            thisGlobalContactAreaname = localStorage.GlobalBusinessAreaLocation.split('>')[0].trim();
            if (thisGlobalBusinessAreaName != "") {
                thisGlobalBusinessAreaName = thisGlobalBusinessAreaName.trim();
                GlobalBusinessAreaName = thisGlobalBusinessAreaName;
            }
            if (thisGlobalContactAreaname != "") {
                thisGlobalContactAreaname = thisGlobalContactAreaname.trim();
                GlobalContactAreaname = thisGlobalContactAreaname;
            }
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/contractareadetailsbyname?contractareaname=' + encodeURIComponent(GlobalContactAreaname),
                type: 'GET',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey },
                cache: false,
                success: function (documenttypes) {
                    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
                    var vDocLibFeat = $.grep(veContractFeatures, function (n, i) {
                        return (n.RowKey == "14" && n.Status == "ON");
                    });
                    if (vDocLibFeat.length > 0) {
                        if (documenttypes.DocLibName != '') {
                            documenturltofetch = documenttypes.DocLibName;
                            $('#hdContAreaDocLibName').val(documenttypes.DocLibName);
                        }
                        else {
                            documenturltofetch = 'Contract Documents';
                            $('#hdContAreaDocLibName').val('Contract Documents');
                        }
                    }
                    else {
                        documenturltofetch = 'Contract Documents';
                        $('#hdContAreaDocLibName').val('Contract Documents');
                    }
                    var datalenght = documenttypes.DocumentTypes.split(';');
                    datalenght = stringArrayUnique(datalenght).sort();
                    if (datalenght.length > 0) {
                        for (var i = 0; i < datalenght.length; i++) { //Bug:eO311012 - 'Primary Agreement' not visible in Document Type Dropdown
                            if (datalenght[i] != null && datalenght[i] != "") { //  && datalenght[i] != "Primary Agreement"
                                //if (datalenght[i] == "Primary Agreement") {
                                //    articaldocumenttype += "<option value='" + datalenght[i] + "' selected>" + datalenght[i] + "</option>";
                                //} else {
                                articaldocumenttype += "<option value='" + datalenght[i] + "'>" + datalenght[i] + "</option>";
                                //}
                            }
                        }
                        if (datalenght.indexOf('Others') == -1)
                            articaldocumenttype += "<option value='Others'>Others</option>";
                    }
                    else {
                        //articaldocumenttype += "<option value='Primary Agreement' selected>Primary Agreement</option>";
                        articaldocumenttype += "<option value='Others'>Others</option>";
                    }
                    if (articaldocumenttype.indexOf("<option value='Others'>Others</option>") == -1 && articaldocumenttype.indexOf('<option value="Others">Others</option>') == -1) {
                        articaldocumenttype += "<option value='Others'>Others</option>";
                    }
                },
                error:
                    function (data) {
                    }
            });
        }
    } else {
        thisGlobalContactAreaname = "";
        thisGlobalBusinessAreaName = "";
    }

    $("#browseContracts").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Contracts Picker",
        modal: true,
        buttons: {
            "OK": function () {
                var s = AddContract();
                // if (s) {
                $(this).dialog("close");
                // }
            },
            "Clear": function () {
                //$('#txtSearchBoxBulkUpload').val('');
                $('input:radio[name=rdContract]').attr('checked', false);
                //SearchContract();
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });


    $("#browseBA_LayoutsBulk").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        height: 600,
        title: "Users",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "Close": function () {
                $(this).dialog("close");
            }
        }
    });

    $('#txtSearchBoxBulkUpload').keypress(function (e) {
        if (e.keyCode == 13) {
            $(".ui-autocomplete").css('display', 'none');
            SearchContract();
            return false;
        }
    });


    $("#browseDocumentType").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Document Type",
        modal: true,
        buttons: {
            "OK": function () {
                var ss = AddDocumentType();
                //  if (ss) {
                $(this).dialog("close");
                // }
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });
    //manoj
    ko.applyBindings(uploaders);
    //manoj
});

function AddDocumentType() {
    var valuetopass = false;
    if ($('input:radio[name=rdContract]:checked').val() != null) {
        if (cTitle == 'DocumentType') {
            var checkboxes = document.getElementsByName("checkbox");
            var checkboxesChecked = [];
            // loop over them all
            for (var i = 0; i < checkboxes.length; i++) {
                // And stick the checked ones onto an array...
                if (checkboxes[i].checked) {
                    checkboxesChecked.push(checkboxes[i]);
                    var idsplitvalu = checkboxes[i].id;
                    var aftersplit = idsplitvalu.split("_");
                    var vContractTitle = 'ddlDocumentType_' + aftersplit[1] + '';
                    $('#' + vContractTitle).val($('input:radio[name=rdContract]:checked').val());
                }
            }
            valuetopass = true;
        }
    }
    return valuetopass;
}

function AddContract() {
    if ($('input:radio[name=rdContract]:checked').val() != null) {
        if (cTitle == 'PathContractTitleAll') {
            var vDocPath = '';
            var businessAreadetails = '';
            var conAreaName = '';
            var articaldocumenttypesingle = "";
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?contractid=' + $('input:radio[name=rdContract]:checked')[0].id,
                type: 'GET',
                cache: false,
                contentType: false,
                async: false,
                headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID },
                processData: false,
                success: function (data) {
                    $(data).each(function (i, item) {
                        businessAreadetails = item.BusinessArea;
                        conAreaName = item.ContractArea;
                        vDocPath = item.ContractDocumentsUrl;

                        $.ajax({
                            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/contractareadetailsbyname?contractareaname=' + encodeURIComponent(conAreaName),
                            type: 'GET',
                            dataType: 'json',
                            headers: { 'eContracts-ApiKey': localStorage.APIKey },
                            cache: false,
                            async: false,
                            success: function (documenttypes) {
                                var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
                                var vDocLibFeat = $.grep(veContractFeatures, function (n, i) {
                                    return (n.RowKey == "14" && n.Status == "ON");
                                });
                                if (vDocLibFeat.length > 0) {
                                    if (documenttypes.DocLibName != '') {
                                        $('#hdContAreaDocLibName').val(documenttypes.DocLibName);
                                    }
                                    else {
                                        $('#hdContAreaDocLibName').val('Contract Documents');
                                    }
                                }
                                else {
                                    $('#hdContAreaDocLibName').val('Contract Documents');
                                }

                                var datalenght = documenttypes.DocumentTypes.split(';');
                                datalenght = stringArrayUnique(datalenght).sort();
                                if (datalenght.length > 0) {
                                    for (var i = 0; i < datalenght.length; i++) {//Bug:eO311012 - 'Primary Agreement' not visible in Document Type Dropdown
                                        if (datalenght[i] != null && datalenght[i] != "") { // && datalenght[i] != "Primary Agreement"
                                            articaldocumenttypesingle += "<option value='" + datalenght[i] + "'>" + datalenght[i] + "</option>";
                                        }
                                    }
                                } else {
                                    //articaldocumenttypesingle += "<option value='Primary Agreement'>Primary Agreement</option>"
                                }
                                if (articaldocumenttypesingle.indexOf("<option value='Others'>Others</option>") == -1 && articaldocumenttypesingle.indexOf('<option value="Others">Others</option>') == -1) {
                                    articaldocumenttypesingle += "<option value='Others'>Others</option>"
                                }
                            },
                            error:
                                function (data) {
                                }
                        });

                        if (item.ContractDocumentsUrl == "") {
                            vDocPath = '/' + $('#hdContAreaDocLibName').val();
                        }
                    });
                },
                error: function (data) {
                    vDocPath = '/Contract Documents';
                }
            });


            var checkboxes = document.getElementsByName("checkbox");
            var checkboxesChecked = [];
            // loop over them all
            for (var i = 0; i < checkboxes.length; i++) {
                // And stick the checked ones onto an array...
                if (checkboxes[i].checked) {
                    checkboxesChecked.push(checkboxes[i]);
                    var idsplitvalu = checkboxes[i].id;
                    var aftersplit = idsplitvalu.split("_");
                    var BusinessAreaName = 'BusnsAreaNm_' + aftersplit[1];
                    var vConAreaName = 'ConAreaName_' + aftersplit[1];
                    var vContractTitle = 'ContractTitle_' + aftersplit[1];
                    var vdocumenttypeid = 'ddlDocumentType_' + aftersplit[1];
                    $('#' + BusinessAreaName).val(businessAreadetails);
                    $('#' + vContractTitle).val($('input:radio[name=rdContract]:checked').val());
                    $('#' + vConAreaName).val(conAreaName);
                    $('#' + vdocumenttypeid).empty();
                    $('#' + vdocumenttypeid).append(articaldocumenttypesingle);
                    //$("#" + vdocumenttypeid).find('option[value="Primary Agreement"]').prop("selected", true);
                    $('#PathContractTitle_' + aftersplit[1]).val(vDocPath);
                    $('#LabelPathContractTitle_' + aftersplit[1]).text(vDocPath);
                    var IsExists;
                    if (vDocPath.slice(-1) != "/") {
                        IsExists = CheckDocumentExist(vDocPath + "/", GetDocumentName($('#tr_' + aftersplit[1])[0].firstChild.textContent));
                    } else {
                        IsExists = CheckDocumentExist(vDocPath, GetDocumentName($('#tr_' + aftersplit[1])[0].firstChild.textContent));
                    }
                    if (IsExists) {
                        $('#tr_' + aftersplit[1]).css('color', 'red');
                        $('#txtbx_' + aftersplit[1]).val('true');
                    } else {
                        $('#tr_' + aftersplit[1]).css('color', '');
                        $('#txtbx_' + aftersplit[1]).val('false');
                    }
                }
            }
            // Return the array if it is non-empty, or null
            //return checkboxesChecked.length > 0 ? checkboxesChecked : null;
            return true;

        }
        else {
            $('#' + cTitle).val($('input:radio[name=rdContract]:checked').val());
            var docpath = "Path" + cTitle;// vDocumentPath
            var docpathlabel = "LabelPath" + cTitle;
            var splitvar = cTitle.split('_')
            var splitlast = splitvar[splitvar.length - 1];
            var BusinessAreaName = 'BusnsAreaNm_' + splitlast;
            var conAraeName = 'ConAreaName_' + splitlast;
            var vdocumenttypeid = 'ddlDocumentType_' + splitlast;
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?contractid=' + $('input:radio[name=rdContract]:checked')[0].id,
                type: 'GET',
                cache: false,
                contentType: false,
                async: false,
                headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID },
                processData: false,
                success: function (data) {
                    $(data).each(function (i, item) {
                        $.ajax({
                            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/contractareadetailsbyname?contractareaname=' + encodeURIComponent(item.ContractArea),
                            type: 'GET',
                            dataType: 'json',
                            headers: { 'eContracts-ApiKey': localStorage.APIKey },
                            cache: false,
                            async: false,
                            success: function (documenttypes) {
                                var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
                                var vDocLibFeat = $.grep(veContractFeatures, function (n, i) {
                                    return (n.RowKey == "14" && n.Status == "ON");
                                });
                                if (vDocLibFeat.length > 0) {
                                    if (documenttypes.DocLibName != '') {
                                        $('#hdContAreaDocLibName').val(documenttypes.DocLibName);
                                    }
                                    else {
                                        $('#hdContAreaDocLibName').val('Contract Documents');
                                    }
                                }
                                else {
                                    $('#hdContAreaDocLibName').val('Contract Documents');
                                }
                                articaldocumenttypesingle = "";
                                var datalenght = documenttypes.DocumentTypes.split(';');
                                datalenght = stringArrayUnique(datalenght).sort();
                                if (datalenght.length > 0) {
                                    for (var i = 0; i < datalenght.length; i++) { //Bug:eO311012 - 'Primary Agreement' not visible in Document Type Dropdown
                                        if (datalenght[i] != null && datalenght[i] != "") {//  && datalenght[i] != "Primary Agreement"
                                            articaldocumenttypesingle += "<option value='" + datalenght[i] + "'>" + datalenght[i] + "</option>";
                                        }
                                    }
                                } else {
                                    //articaldocumenttypesingle += "<option value='Primary Agreement'>Primary Agreement</option>"
                                }
                                if (articaldocumenttypesingle.indexOf("<option value='Others'>Others</option>") == -1 && articaldocumenttypesingle.indexOf('<option value="Others">Others</option>') == -1) {
                                    articaldocumenttypesingle += "<option value='Others'>Others</option>"
                                }
                            },
                            error:
                                function (data) {
                                }
                        });
                        $('#' + docpath).val(item.ContractDocumentsUrl);
                        $('#' + docpathlabel).text(item.ContractDocumentsUrl);
                        $('#' + BusinessAreaName).val(item.BusinessArea);
                        $('#' + conAraeName).val(item.ContractArea);
                        $('#' + vdocumenttypeid).empty();
                        $('#' + vdocumenttypeid).append(articaldocumenttypesingle);
                        //$("#" + vdocumenttypeid).find('option[value="Primary Agreement"]').prop("selected", true);
                        if (item.ContractDocumentsUrl == "") {
                            $('#' + docpath).val('/' + $('#hdContAreaDocLibName').val() + '/' + item.ContractTitle.replace(/[\*\|\,\"\:\<\>\[\}\{\}\'\(\)\&\#\%\.\-\!]/g, '').replace(/\//g, '').replace(/\s\s+/g, " ").trim() + '/');
                            $('#' + docpathlabel).text('/' + $('#hdContAreaDocLibName').val() + '/' + item.ContractTitle.replace(/[\*\|\,\"\:\<\>\[\}\{\}\'\(\)\&\#\%\.\-\!]/g, '').replace(/\//g, '').replace(/\s\s+/g, " ").trim() + '/');
                            var IsExists = CheckDocumentExist('/' + $('#hdContAreaDocLibName').val() + '/' + item.ContractTitle.replace(/[\*\|\,\"\:\<\>\[\}\{\}\'\(\)\&\#\%\.\-\!]/g, '').replace(/\//g, '').replace(/\s\s+/g, " ").trim() + '/', GetDocumentName($('#tr_' + splitlast)[0].firstChild.textContent));
                            if (IsExists) {
                                $('#tr_' + splitlast).css('color', 'red');
                                $('#txtbx_' + splitlast).val('true');
                            } else {
                                $('#tr_' + splitlast).css('color', '');
                                $('#txtbx_' + splitlast).val('false');
                            }
                        } else {
                            var IsExists;
                            if (item.ContractDocumentsUrl.slice(-1) != "/") {
                                IsExists = CheckDocumentExist(item.ContractDocumentsUrl + "/", GetDocumentName($('#tr_' + splitlast)[0].firstChild.textContent));
                            }
                            else {
                                IsExists = CheckDocumentExist(item.ContractDocumentsUrl, GetDocumentName($('#tr_' + splitlast)[0].firstChild.textContent));
                            }
                            if (IsExists) {
                                $('#tr_' + splitlast).css('color', 'red');
                                $('#txtbx_' + splitlast).val('true');
                            } else {
                                $('#tr_' + splitlast).css('color', '');
                                $('#txtbx_' + splitlast).val('false');
                            }
                        }
                    });
                },
                error: function (data) {
                    $('#' + docpath).val('/Contract Documents');
                    $('#' + docpathlabel).text('/Contract Documents');
                }
            });

            return true;

        }
    } else {

        swal("", "No contract has been selected.");
        $("#popupContracts").dialog("close");
        return false;
    }

}

$('#btnCancel').click(function () {
    var control = $("#files");
    control.replaceWith(control.val('').clone(true));

    $("#tbBulkControls").empty();

});

//manoj
//For Chunk Filem Upload
function bulkdocumentupload() {
    $('#btnBulkUpload').attr('disabled', 'disabled');
    if (requiredValidator('formBulkControls', false)) {
        document.getElementById("tbBulkControls").style.pointerEvents = "none";
        $('input[type=checkbox][name="checkbox"]').each(function () {
            this.checked = true;
        });
        //manoj
        if (droppedfiles.length > 0) {
            bulkdocumentuploadchunk();
        } else {
            // alert("Select Document atleast 1 document.")
        }
    } else {
        $('#btnBulkUpload').removeAttr('disabled');
    }
}
//For Chunk Filem Upload
//manoj

function bulkdocumentupload1() {
    $('#btnBulkUpload').attr('disabled', 'disabled');
    if (requiredValidator('formBulkControls', false)) {
        document.getElementById("tbBulkControls").style.pointerEvents = "none";
        $('input[type=checkbox][name="checkbox"]').each(function () {
            this.checked = true;
        });
        $('#idLoading').css('display', '');
        var formData = new FormData();
        var opmlFile = $('#files')[0];
        if (opmlFile.files.length > 0) {
            var droppedfileslength = droppedfiles.length;
            for (var i = 0; i < droppedfileslength; i++) {
                formData.append("opmlFile" + i + "", droppedfiles[i]);
            }
            if (removedItems.length != 0) {
                formData.append("removedFiles", removedItems);
            }
        } else {
            var droppedfileslength = droppedfiles.length;
            for (var i = 0; i < droppedfileslength; i++) {
                formData.append("opmlFile" + i + "", droppedfiles[i]);
            }
            if (removedItems.length != 0) {
                formData.append("removedFiles", removedItems);
            }
        }

        formData.append("AccountID", localStorage.AccountID);
        var contractForm = $("#formBulkControls *").serialize();
        formData.append("SearializeControls", contractForm);
        formData.append("CreatedBy", localStorage.UserName);
        formData.append("ModifiedBy", localStorage.UserName);
        formData.append("DocumentAuthor", localStorage.UserName);
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/bulkupload',
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, 'RefreshToken': localStorage.RefreshToken },
            processData: false,
            success: function (data) {
                //$("#lblFilesCount").text(droppedControls + " file(s) uploaded.")
                //Removed//alert(droppedControls + ' documents uploaded successfully.')
                removedItems = [];
                $("#tbBulkControls").empty();
                $('#btnBulkUpload').removeAttr('disabled');
                $('#idLoading').css('display', 'none');
                var control = $("#files");
                control.replaceWith(control.val('').clone(true));
                $('#tbBulkControls').css("pointer-events", "auto");
                if (getParameterByName('Type') == 'pipeline') {
                    //location = "/Documents/BulkDocumentUpload?Type=pipeline";
                    //For Dimention Data
                    location = "/Contracts/Documents?Type=pipeline";
                } else {
                    //location = "/Documents/BulkDocumentUpload?Type=contracts";
                    //For Dimention Data
                    location = "/Contracts/Documents?Type=contracts";
                }
            },
            error: function () {
                $('#tbBulkControls').css("pointer-events", "auto");
                $('#btnBulkUpload').attr('disabled', 'disabled');
                $('#idLoading').css('display', 'none');
            }
        });
    }
    else {
        $('#btnBulkUpload').removeAttr('disabled');
    }
}

var droppedControls = 0;
var dropcontrolifdelete = 0;
function readfiles(files) {
    var documentidcount = "";
    var FileList = "";
    var rejectedfile = "";
    var unvalidfile = "";
    var vControl = "";
    var lesscharfilename = "";
    var dropexitfilenamevalue = "";
    // $("#tbBulkControls").empty();
    var fileslength = files.length;
    for (var i = 0; i < fileslength; i++) {
        var file = files[i];
        var file = files[i];
        var acceptExtension = ['pdf', 'png', 'jpg', 'gif', 'bmp', 'doc', 'xls', 'ppt', 'docx', 'xlsx', 'txt', 'pptx', 'dotx', 'xps', 'rtf', 'odt', 'dotm', 'docm', 'msg', 'tif', 'tiff', 'csv','zip','ZIP'];
        var ext = file.name.split('.').pop().toString();
        if (acceptExtension.indexOf(ext.trim().toLowerCase()) > -1) {
            if ('size' in file) {
                var Filelengthcol = Math.round((file.size / 1048576));
                if (Filelengthcol > (Math.round(parseInt(localStorage.MaxRequestLength) / 1000))) {
                    if (FileList == "") {
                        FileList = files[i].name;
                    } else {
                        FileList += "," + files[i].name;
                    }
                    //manoj
                    var deletedfilenameindex = droppedfiles.lastIndexOf(files[i]);
                    if (deletedfilenameindex > -1) {
                        droppedfiles.splice(deletedfilenameindex, 1);
                    }
                    //manoj

                } else if (dropexitfilename.indexOf(files[i].name) > -1) {
                    if (dropexitfilenamevalue == "") {
                        dropexitfilenamevalue = files[i].name;
                    } else {
                        dropexitfilenamevalue += "," + files[i].name;
                    }
                    //manoj
                    var deletedfilenameindex = droppedfiles.lastIndexOf(files[i]);
                    if (deletedfilenameindex > -1) {
                        droppedfiles.splice(deletedfilenameindex, 1);
                    }
                    //manoj
                }
                else if (!isSpecialCharacterFileName(files[i].name.substr(0, files[i].name.lastIndexOf('.')))) {
                    if (unvalidfile == "") {
                        unvalidfile = files[i].name;
                    } else {
                        unvalidfile += "," + files[i].name;
                    }
                    //manoj
                    var deletedfilenameindex = droppedfiles.lastIndexOf(files[i]);
                    if (deletedfilenameindex > -1) {
                        droppedfiles.splice(deletedfilenameindex, 1);
                    }
                    //manoj
                } else if (!isContainsThreeAlphabets(files[i].name.substr(0, files[i].name.lastIndexOf('.')))) {
                    if (lesscharfilename == "") {
                        lesscharfilename = files[i].name;
                    } else {
                        lesscharfilename += "," + files[i].name;
                    }
                    //manoj
                    var deletedfilenameindex = droppedfiles.lastIndexOf(files[i]);
                    if (deletedfilenameindex > -1) {
                        droppedfiles.splice(deletedfilenameindex, 1);
                    }
                    //manoj
                }
                else {
                    if (IsFileValid(files[i].name)) {
                        if (droppedControls == 0) {
                            vControl += "<thead><tr class='bulknocolor'>";
                            vControl += "<th width='13%'> Document Name";
                            vControl += "</th>";
                            vControl += "<th width='38%'> Business Area Name";
                            vControl += "</th>";
                            vControl += "<th width='30%'> Contract Record Name";
                            vControl += "</th>";
                            vControl += "<th width='20%'> Document Type";
                            vControl += "</th>";
                            if (OCRisEnabled) {
                                vControl += "<th width='25%'> Enable OCR";
                                vControl += "</th>";
                            } else {
                                vControl += "<th width='25%'  style='display:none'> Enable OCR";
                                vControl += "</th>";
                            }
                            vControl += "<th width='10%'> Document Path";
                            vControl += "</th>";
                            vControl += "<th  width='30%'>Upload Status";
                            vControl += "</th>";
                            vControl += "<th></th></tr></thead>";

                        }
                        if (droppedControls == dropcontrolifdelete) {
                            var trid = 'tr_' + droppedControls + '';
                            var vContractTitle = 'ContractTitle_' + droppedControls;
                            var BusinessAreaName = 'BusnsAreaNm_' + droppedControls;
                            var tdBusinessAreaName = 'tdBusnsAreaNm_' + droppedControls;
                            var conAreaName = 'ConAreaName_' + droppedControls;
                            var docid = 'ddlDocumentType_' + droppedControls;
                            var vDocumentPath = 'PathContractTitle_' + droppedControls;
                            var vDocumentPathLabel = 'LabelPathContractTitle_' + droppedControls;
                            var checkboxid = 'chkbx_' + droppedControls;
                            var txtboxid = 'txtbx_' + droppedControls;
                            var checkboxidocr = 'chkbkocr_' + droppedControls;
                            var isExists = true;
                            if (documenturltofetch != "") {
                                if (documenturltofetch.trim().slice(-1) != "/") {
                                    isExists = CheckDocumentExist('/' + documenturltofetch.trim() + '/', GetDocumentName(files[i].name))
                                } else { isExists = CheckDocumentExist('/' + documenturltofetch.trim(), GetDocumentName(files[i].name)) }
                            }
                            else {
                                isExists = CheckDocumentExist('/Contract Documents/', GetDocumentName(files[i].name))
                            }

                            if (isExists) {
                                vControl += "<tr id='" + trid + "' style='color:red'>";
                                vControl += "<td width='13%'><input  type='checkbox' id='" + checkboxid + "' name='checkbox' onclick='checkMultiple(this);' /><label style='width:70% !important;' title='date field'>" + files[i].name + "</label>";
                            } else {
                                vControl += "<tr id=" + trid + ">";
                                vControl += "<td width='13%'><input type='checkbox' id='" + checkboxid + "' name='checkbox' onclick='checkMultiple(this);'/><label style='width:70% !important;' title='date field'>" + files[i].name + "</label>";
                            }
                            vControl += "</td>";
                            if (isExists) {
                                vControl += "<td width='13%' style='display:none'><input  type='text' id='" + txtboxid + "' value='true' name='" + txtboxid + "'/></td>";
                            } else {
                                vControl += "<td width='13%' style='display:none'><input  type='text' id='" + txtboxid + "' value='false' name='" + txtboxid + "'/></td>";
                            }
                            if (thisGlobalBusinessAreaName != "") {
                                vControl += "<td width='38%' id='" + tdBusinessAreaName + "'><input id='" + BusinessAreaName + "' value='" + thisGlobalBusinessAreaName.replace("'", "&#39") + "' class='f_inpt width70 validelement' readonly='readonly' type='text' name='" + BusinessAreaName + "'><input id='" + conAreaName + "' class='f_inpt width60' readonly='readonly'  style='display:none'type='text' value='" + thisGlobalContactAreaname.replace("'", "&#39") + "'  name='" + conAreaName + "'>";
                            }
                            else {
                                vControl += "<td width='38%' id='" + tdBusinessAreaName + "'><input id='" + BusinessAreaName + "' class='f_inpt width70 validelement' readonly='readonly' type='text' name='" + BusinessAreaName + "'><input id='" + conAreaName + "' class='f_inpt width60' readonly='readonly'  style='display:none'type='text' name='" + conAreaName + "'>";
                                vControl += "<span class='right-float'><a href='javascript:void(0);' id='" + BusinessAreaName + "' onclick='ViewBusinessAreaPicker(this);' class='margin-top-5 float_none'> Browse</a></span></td>";
                            }

                            vControl += "<td width='30%'><input id='" + vContractTitle + "' class='f_inpt width60' readonly='readonly' type='text' name='" + vContractTitle + "'>";
                            vControl += "<span class='right-float'><a href='javascript:void(0);' id='" + vContractTitle + "' name='" + tdBusinessAreaName + "' onclick='ViewContractPicker(this);' class='margin-top-5 float_none'> Browse</a></span></td>";
                            vControl += "<td width='20%'>";
                            if (articaldocumenttype != '') {
                                vControl += "<select id='" + docid + "' name='" + docid + "' class='f_inpt width100'>";
                                vControl += "<option value='0'>--Select--</option>'" + articaldocumenttype + "'</td>";
                            } else {
                                vControl += "<select id='" + docid + "' name='" + docid + "' class='f_inpt width100'>";
                                vControl += "<option value='0'>--Select--</option></td>";
                            }

                            if (OCRisEnabled) {
                                vControl += "<td width='30%' >";
                            } else {
                                vControl += "<td width='30%'>";
                            }
                            var FileExt = files[i].name.split('.').pop().toString();
                            if (FileExt == 'PDF' || FileExt == 'pdf' || FileExt == 'tif' || FileExt == 'TIF' || FileExt == 'tiff' || FileExt == 'TIFF') {
                                vControl += "<p style='margin-top: 8px; font-size:13px;'><input type='checkbox' name='convert' id=" + checkboxidocr + " onchange='ChangeDocumentBulk_New(this)'><p>";
                            } else {
                                vControl += "<p style='margin-top: 8px; font-size:13px;'><input type='checkbox' name='convert' id=" + checkboxidocr + " disabled ><p>";
                            }
                            vControl += "</td>";
                            //manoj

                            vControl += "<td width='10%'>";
                            if (documenturltofetch != '') {
                                vControl += "<input id='" + vDocumentPath + "' style='display:none;' class='width60' readonly type='text' value='/" + documenturltofetch + "' name='" + vDocumentPath + "'>";
                                vControl += "<label id='" + vDocumentPathLabel + "'>/" + documenturltofetch + "</label>";
                            } else {
                                vControl += "<input id='" + vDocumentPath + "' style='display:none;' class='width60' readonly type='text' value='/Contract Documents' name='" + vDocumentPath + "'>";
                                vControl += "<label id='" + vDocumentPathLabel + "'>/Contract Documents</label>";
                            }
                            vControl += "</td>";
                            //manoj
                            vControl += '<td><label id="uploadprogresslbl' + droppedControls + '"></label><span id="idLoadingstart' + droppedControls + '" style="font-size:14px; margin-right:10px;" class="spnclstart">Start</span></td>'
                            //manoj
                            vControl += "<td><img src='../Content/Images/Icon/delete.png' title='Remove' onclick='deleteDoc(" + trid + ");' style='float:right; padding-top:7px; cursor:pointer;'></td></tr>"
                            documentidcount += ";" + docid;// getdocumenttypes(docid)
                            droppedControls++;
                            dropcontrolifdelete++;
                            dropexitfilename.push(files[i].name);
                        }
                        else {
                            var trid = 'tr_' + dropcontrolifdelete + '';
                            var vContractTitle = 'ContractTitle_' + dropcontrolifdelete + '';
                            var BusinessAreaName = 'BusnsAreaNm_' + dropcontrolifdelete + '';
                            var conAreaName = 'ConAreaName_' + dropcontrolifdelete;
                            var docid = 'ddlDocumentType_' + dropcontrolifdelete + '';
                            var vDocumentPath = 'PathContractTitle_' + dropcontrolifdelete + '';
                            var vDocumentPathLabel = 'LabelPathContractTitle_' + dropcontrolifdelete + '';
                            var checkboxid = 'chkbx_' + dropcontrolifdelete;
                            var txtboxid = 'txtbx_' + dropcontrolifdelete;
                            var checkboxidocr = 'chkbkocr_' + dropcontrolifdelete;
                            var isExists = true;
                            if (documenturltofetch != "") {
                                if (documenturltofetch.trim().slice(-1) != "/") {
                                    isExists = CheckDocumentExist('/' + documenturltofetch.trim() + '/', GetDocumentName(files[i].name))
                                } else { isExists = CheckDocumentExist('/' + documenturltofetch.trim(), GetDocumentName(files[i].name)) }
                            }
                            else {
                                isExists = CheckDocumentExist('/Contract Documents/', GetDocumentName(files[i].name))
                            }
                            if (isExists) {
                                vControl += "<tr id='" + trid + "' style='color:red'>";
                                vControl += "<td width='13%'><input  type='checkbox' id='" + checkboxid + "' name='checkbox' onclick='checkMultiple(this);' /><label style='width:70% !important;' title='date field'>" + files[i].name + "</label>";

                            } else {
                                vControl += "<tr id=" + trid + ">";
                                vControl += "<td width='13%'><input type='checkbox' id='" + checkboxid + "' name='checkbox' onclick='checkMultiple(this);'/><label style='width:70% !important;' title='date field'>" + files[i].name + "</label>";
                            }

                            vControl += "</td>";

                            if (isExists) {
                                vControl += "<td width='13%' style='display:none'><input  type='text' id='" + txtboxid + "' value='true' name='" + txtboxid + "'/></td>";
                            } else {
                                vControl += "<td width='13%' style='display:none'><input  type='text' id='" + txtboxid + "' value='false' name='" + txtboxid + "'/></td>";
                            }
                            if (thisGlobalBusinessAreaName != "") {
                                vControl += "<td width='38%' id='" + tdBusinessAreaName + "'><input id='" + BusinessAreaName + "' value='" + thisGlobalBusinessAreaName.replace("'", "&#39") + "' class='f_inpt width70 validelement' readonly='readonly' type='text' name='" + BusinessAreaName + "'><input id='" + conAreaName + "' class='f_inpt width60' readonly='readonly'  style='display:none'type='text' value='" + thisGlobalContactAreaname.replace("'", "&#39") + "' name='" + conAreaName + "'>";
                            }
                            else {
                                vControl += "<td width='38%' id='" + tdBusinessAreaName + "'><input id='" + BusinessAreaName + "' value='" + thisGlobalBusinessAreaName.replace("'", "&#39") + "' class='f_inpt width70 validelement' readonly='readonly' type='text' name='" + BusinessAreaName + "'><input id='" + conAreaName + "' class='f_inpt width60' readonly='readonly'  style='display:none'type='text' value='" + thisGlobalContactAreaname.replace("'", "&#39") + "' name='" + conAreaName + "'>";
                                vControl += "<span class='right-float'><a href='javascript:void(0);' id='" + BusinessAreaName + "' onclick='ViewBusinessAreaPicker(this);' class='margin-top-5 float_none'> Browse</a></span></td>";
                            }
                            //vControl += "<td width='30%'><input id='" + BusinessAreaName + "' class='f_inpt width60 validelement' readonly='readonly' type='text' name='" + BusinessAreaName + "'><input id='" + conAreaName + "' class='f_inpt width60' readonly='readonly'  style='display:none'type='text' name='" + conAreaName + "'>";
                            //vControl += "<span class='right-float'><a href='javascript:void(0);' id='" + BusinessAreaName + "' onclick='ViewBusinessAreaPicker(this);' class='margin-top-5 float_none'> Browse</a></span></td>";
                            vControl += "<td width='30%'><input id='" + vContractTitle + "' class='f_inpt width60' readonly='readonly' type='text' name='" + vContractTitle + "'>";
                            vControl += "<span class='right-float'><a href='javascript:void(0);' id='" + vContractTitle + "' name='" + tdBusinessAreaName + "' onclick='ViewContractPicker(this);' class='margin-top-5 float_none'> Browse</a></span></td>";
                            vControl += "<td width='20%'>";

                            if (articaldocumenttype != '') {
                                vControl += "<select id='" + docid + "' name='" + docid + "' class='f_inpt width100'>";
                                vControl += "<option value='0'>--Select--</option>'" + articaldocumenttype + "'</td>";
                            } else {
                                vControl += "<select id='" + docid + "' name='" + docid + "' class='f_inpt width100'>";
                                vControl += "<option value='0>'--Select--</option></td>";
                            }


                            if (OCRisEnabled) {
                                vControl += "<td width='30%'>";
                            } else {
                                vControl += "<td width='30%'>";
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

                            vControl += "<td width='10%'>";
                            if (documenturltofetch != '') {
                                vControl += "<input id='" + vDocumentPath + "' style='display:none;' class='width60' readonly type='text' value='/" + documenturltofetch + "' name='" + vDocumentPath + "'>";
                                vControl += "<label id='" + vDocumentPathLabel + "'>/" + documenturltofetch + "</label>";
                            } else {
                                vControl += "<input id='" + vDocumentPath + "' style='display:none;' class='width60' readonly type='text' value='/Contract Documents' name='" + vDocumentPath + "'>";
                                vControl += "<label id='" + vDocumentPathLabel + "'>/Contract Documents</label>";
                            }
                            vControl += "</td>";
                            //manoj
                            vControl += '<td><label id="uploadprogresslbl' + dropcontrolifdelete + '"></label><span id="idLoadingstart' + dropcontrolifdelete + '" style="font-size:14px; margin-right:10px;" class="spnclstart">Start</span></td>'
                            //manoj
                            vControl += "<td><img src='../Content/Images/Icon/delete.png' title='Remove' onclick='deleteDoc(" + trid + ");' style='float:right; padding-top:7px; cursor:pointer;'></td></tr>"
                            documentidcount += ";" + docid;
                            // getdocumenttypes(docid)
                            droppedControls++;
                            dropcontrolifdelete++;
                            dropexitfilename.push(files[i].name);
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
            //manoj
            var deletedfilenameindex = droppedfiles.lastIndexOf(files[i]);
            if (deletedfilenameindex > -1) {
                droppedfiles.splice(deletedfilenameindex, 1);
            }
            //manoj
        }
    }
    $("#tbBulkControls").append(vControl);
    var x = $("#tbBulkControls tbody").find("tr").length;

    if (x == 0) {
        $("#tbBulkControls").empty();
        $("#lblFilesCount").text((x) + " file(s) selected.");
        $(".clManageDrop").css("display", "none");
        $(".clManageDrag").css("display", "");
    }
    else {
        $("#lblFilesCount").text((x) + " file(s) selected.");
        //manoj
        $(".clManageDrop").css("display", "");
        $(".clManageDrag").css("display", "none");
        //manoj
    }

    if (FileList != null && FileList != "") {
        swal({
            title: '',
            text: "File exceeds " + Math.round((parseInt(localStorage.MaxRequestLength) / 1000)) + "MB size limit.",
            type: 'warning',
            showCancelButton: false,
            confirmButtonText: 'OK',
            html: true
        },
                                function (confirmed) {
                                    if (x == 0) {
                                        removedItems = [];
                                        $("#tbBulkControls").empty();
                                        $('#btnBulkUpload').removeAttr('disabled');
                                        $('#idLoading').css('display', 'none');
                                        var control = $("#files");
                                        control.replaceWith(control.val('').clone(true));
                                        if (getParameterByName('Type') == 'pipeline') {
                                            location = "/Documents/BulkDocumentUpload?Type=pipeline";
                                        } else {
                                            location = "/Documents/BulkDocumentUpload?Type=contracts";
                                        }
                                    }
                                });
    } else {
        var alertvalue = "";
        if (unvalidfile != null && unvalidfile != "") {
            alertvalue = unvalidfile + " File(s) names can't contain the following characters /:*\\?\"<>|#%";
        }
        if (rejectedfile != null && rejectedfile != "") {
            if ((lesscharfilename == null || lesscharfilename == "") && (alertvalue == null || alertvalue == ""))
                alertvalue = rejectedfile + " File(s) are not allowed.";
            else if ((lesscharfilename == null || lesscharfilename == "")) {
                alertvalue += "and " + rejectedfile + " File(s) are not allowed..";
            } else {
                alertvalue += ", " + rejectedfile + " File(s) are not allowed.";
            }
        }

        if (lesscharfilename != null && lesscharfilename != "") {
            if ((alertvalue == null || alertvalue == ""))
                alertvalue = lesscharfilename + " File(s) names should contain the minimum of 3 alphabets";
            else {
                alertvalue += "and " + lesscharfilename + " File(s) names should contain the minimum of 3 alphabets";
            }
        }

        if (alertvalue != null && alertvalue != "") {
            if (alertvalue.indexOf('and') == 0) {
                alertvalue = alertvalue.replace('and', "");
                alertvalue = alertvalue.trim();
            }

            if (alertvalue.indexOf(',') == 0) {
                alertvalue = alertvalue.replace(',', "");
                alertvalue = alertvalue.trim();
            }
            alertvalue = alertvalue + ".";
            swal({
                title: '',
                text: alertvalue,
                type: 'warning',
                showCancelButton: false,
                confirmButtonText: 'OK',
                html: true
            },
                                function (confirmed) {
                                    if (x == 0) {
                                        removedItems = [];
                                        $("#tbBulkControls").empty();
                                        $('#btnBulkUpload').removeAttr('disabled');
                                        $('#idLoading').css('display', 'none');
                                        var control = $("#files");
                                        control.replaceWith(control.val('').clone(true));
                                        if (getParameterByName('Type') == 'pipeline') {
                                            location = "/Documents/BulkDocumentUpload?Type=pipeline";
                                        } else {
                                            location = "/Documents/BulkDocumentUpload?Type=contracts";
                                        }
                                    }
                                });
        }
        alertvalue = "";
    }
    if (dropexitfilenamevalue != null && dropexitfilenamevalue != "") {
        swal("", " '" + dropexitfilenamevalue + " File(s) are already selected");
    }
}

var multipleChecks = "";
function checkMultiple(object) {
    var vID = object.id;
    var isChecked = object.checked;
    if (isChecked) {
        $("#btnMultipleAction").css('display', '');
        multipleChecks = multipleChecks + ';' + vID;
    } else {
        multipleChecks = multipleChecks.replace(';' + vID, '');
    }

    if (multipleChecks.trim() == "") {
        $("#btnMultipleAction").css('display', 'none');
    }
    try {
        hideAllMenuAndStopPro(event);
    }
    catch (ex) {

    }
}

var holder = document.getElementById('holder');
//manoj
holder.ondragover = function (e) {
    e.preventDefault();
    document.getElementById("holder").style.border = "2px dashed #428bca ";
    e.dataTransfer.setData('text/html', "You dragged the image!");
};

holder.ondragleave = function () {
    document.getElementById("holder").style.border = "2px dashed #ccc";
};
//manoj

holder.ondragend = function () { this.className = ''; return false; };
var totalfiles = "";
holder.ondrop = function (e) {
    this.className = '';
    e.preventDefault();
    var files = e.dataTransfer.files;
    var fileslength = files.length;
    for (var i = 0; i < fileslength; i++) {
        droppedfiles.push(files[i]);
    }
    totalfiles = files;
    readfiles(files);
    document.getElementById("holder").style.border = "2px dashed #ccc";
}


function getcontracts() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?sortbyfield=Timestamp&orderby=DESC',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID },
        success: function (data) {
            var datalenght = data.length;
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];
                $("#ContractPricingType").append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>")
            }
        },
        error:
            function (data) {

            }
    });
}

function getdocumenttypes(obj) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documenttypes',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (documenttypes) {
            if (obj.indexOf(';') > -1) {
                var objsplit = obj.split(';');
                for (var m = 0; m < objsplit.length; m++) {
                    if (objsplit[m] != "") {
                        $(documenttypes).each(function (i, item) {
                            $("#" + objsplit[m]).append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>")
                        });
                    }
                }
            }
            else {
                $(documenttypes).each(function (i, item) {
                    $("#" + obj).append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>")
                });
            }
        },
        error:
            function (data) {
            }
    });
}

function deleteDoc(obj) {
    var deletedfilename = document.getElementById("chkbx_" + obj.id.split(/[_ ]+/).pop()).nextSibling.innerHTML;
    var deletedfilenameindex_exist = dropexitfilename.indexOf(deletedfilename);
    //Rahul
    var deletedfilenameindex = droppedfiles.findIndex(function (x) { return x.name == deletedfilename })
    //Rahul
    dropexitfilename.splice(deletedfilenameindex_exist, 1);
    droppedfiles.splice(deletedfilenameindex, 1);
    $("#" + obj.id).remove();
    removedItems.push(obj.id.split(/[_ ]+/).pop());
    droppedControls--;
    document.getElementById('files').addEventListener('change', handleFileSelect, false);
    var x = $("#tbBulkControls tbody").find("tr").length;

    if (x == 0) {
        $("#tbBulkControls").empty();
        $("#lblFilesCount").text((x) + " file(s) selected.");
        $("#btnMultipleAction").css('display', 'none');
        $(".clManageDrop").css("display", "none");
        $(".clManageDrag").css("display", "");
    }
    else {
        $("#lblFilesCount").text((x) + " file(s) selected.");
        //manoj
        $(".clManageDrop").css("display", "");
        $(".clManageDrag").css("display", "none");
        //manoj

    }
}

function DocumentTypeClick(object) {
    cTitle = object.id
    cFlag = object.value
    $(".hhide").hide();
    $('#loadMA').html('<img src="../Content/Images/icon/loading.gif"> Working on it...');
    var contractTags = [];
    if (GlobalBusinessAreaName != '' && GlobalContactAreaname != '') {

        if ($('#tblDocumentType li').length == 0) {
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/contractareadetailsbyname?contractareaname=' + encodeURIComponent(GlobalContactAreaname),
                type: 'GET',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey },
                cache: false,
                async: false,
                success: function (documenttypes) {
                    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
                    var vDocLibFeat = $.grep(veContractFeatures, function (n, i) {
                        return (n.RowKey == "14" && n.Status == "ON");
                    });
                    if (vDocLibFeat.length > 0) {
                        if (documenttypes.DocLibName != '') {
                            $('#hdContAreaDocLibName').val(documenttypes.DocLibName);
                        }
                        else {
                            $('#hdContAreaDocLibName').val('Contract Documents');
                        }
                    }
                    else {
                        $('#hdContAreaDocLibName').val('Contract Documents');
                    }
                    $('#loadMA').empty();
                    var datalenght = documenttypes.DocumentTypes.split(';');
                    datalenght = stringArrayUnique(datalenght).sort();
                    if (datalenght.length > 0) {
                        for (var i = 0; i < datalenght.length; i++) {
                            if (datalenght[i] != null && datalenght[i] != "") {
                                contractTags.push(datalenght[i].trim());
                                var article = '<li>';
                                article += '<input id="' + datalenght[i].trim() + '" type="radio" name="rdContract" class="css-checkbox" value="' + datalenght[i].trim() + '" />';
                                article += '<label for="' + datalenght[i].trim() + '" class="css-label">' + datalenght[i].trim() + '</label>';
                                article += '</li>';
                                $("#tblDocumentType").append(article);
                            }
                        }

                    }
                    else {
                        $('#loadMA').empty();
                        $('#loadMA').html('<p style="margin-left: 20px;">No Document type Found!</p>')
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
                    $('#loadMA').empty();
                    $('#loadMA').html('<p style="margin-left: 20px;">No Document type Found!</p>')
                }
            });
            $("#browseDocumentType").dialog("option", "title", "Document Type Picker");
            $("#browseDocumentType").dialog("open");
        }
        else {
            var vCount = $("#tblDocumentType li").length;
            $('#compact-paginationDocumentType').pagination({
                items: vCount,
                itemsOnPage: 10,
                type: 'ul',
                row: 'li',
                typeID: 'tblDocumentType',
                cssStyle: 'compact-theme'
            });
            $("#browseDocumentType").dialog("option", "title", "Document Type Picker");
            $("#browseDocumentType").dialog("open");
        }
    }
    else {
        alert("Select Business Area");
    }
}
function ViewBusinessAreaPicker(object) {
    cTitle = object.id;
    $(".hhide").hide();
    if ($('#tbodyBusinessArea tr').length == 0) {
        ViewAllBusinessAreaForforBulkUp();
    } else {
        $("#browseBA_LayoutsBulk").dialog("option", "title", "Business Area Picker");
        $("#browseBA_LayoutsBulk").dialog("open");
    }
}

var articleBusinessArea1 = "";
function ViewAllBusinessAreaForforBulkUp() {
    $("#loadingPage").fadeIn();
    $('#tbodyBusinessAreaBulk').empty();
    /* Business Area Popup Start */
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/entities',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            getbusinessareapath();
            recursiveIterationGlobalContractforBulkUp(data)
            $("#tbodyBusinessAreaBulk").append(articleBusinessArea1);
            if (articleBusinessArea1 == "") {
                $("#tbodyBusinessAreaBulk").append("<tr><td><p class='f_p-error'>No items found.</p></td></tr>");
            }
            articleBusinessArea1 = "";
            $("#example-Bulk-1").treetable({ expandable: true, initialState: "expanded" });
            $("#loadingPage").fadeOut();
            $("#browseBA_LayoutsBulk").dialog("option", "title", "Select Business Area");
            $("#browseBA_LayoutsBulk").dialog("open");
        },
        error:
            function (data) {
                if (articleBusinessArea1 == "") {
                    $('#tbodyBusinessAreaBulk').empty();
                    $("#tbodyBusinessAreaBulk").append("<tr><td><p class='f_p-error'>No items found.</p></td></tr>");
                    $("#loadingPage").fadeOut();
                    $("#browseBA_LayoutsBulk").dialog("option", "title", "Select Business Area");
                    $("#browseBA_LayoutsBulk").dialog("open");
                }
            }
    });
    /* Business Area Popup End */
}

var previousidforBulkUp = "";
var strContractAreaName = "";
var strContractAreaID = '';
var strContractAreabusinesarearowkey = "";
function recursiveIterationGlobalContractforBulkUp(object) {
    if (object.ChildrenData.length != 0) {
        bindbusinessandcontractarea('', object);
    }
}

function bindbusinessandcontractarea(path, object) {
    try {
        for (var i = 0; i < object.ChildrenData.length; i++) {
            var item = object.ChildrenData[i];
            var additional = "";
            var spath = '';
            if (path == '')
                spath = item.BusinessAreaName;
            else
                spath = path + ' > ' + item.BusinessAreaName;
            var found = $.grep(BusinessAreaAccess, function (n, ind) {
                return (n.indexOf(spath) == 0);
            });
            if (found.length > 0 || localStorage.UserType.indexOf("Global Contract Owner") >= 0) {
                //var j = BusinessAreaAccess12.indexOf(item.BusinessAreaName);
                var j = BusinessAreaAccessID.indexOf(item.RowKey);
                if (j > -1 || item.Owner.trim().split(';').indexOf(localStorage.UserName.trim()) > -1) {
                    if (item.ParentBusinessAreaID != 0) {
                        if (item.Owner.trim().split(';').indexOf(localStorage.UserName.trim()) > -1) {//if business owner
                            additional = '<span style="color:#3487ce; cursor:pointer;" onclick="javascript:treeviewclickforBulkUp(this)">' + item.BusinessAreaName + '</span>&nbsp; <img src="/Content/Images/icon/profile.png" style="cursor:default;" />'
                        } else { //if permission in business area
                            additional = '<span style="color:#3487ce; cursor:pointer;" onclick="javascript:treeviewclickforBulkUp(this)">' + item.BusinessAreaName + '</span>'
                        }
                    } else {
                        additional = '<span>' + item.BusinessAreaName + '</span>';
                    }

                } else {
                    if (item.ParentBusinessAreaID != 0) {
                        if (strContractAreaID == "GenCA") {
                            additional = '<span style="color:#3487ce; cursor:pointer;" onclick="javascript:treeviewclickforBulkUp(this)">' + item.BusinessAreaName + '</span>'
                        } else {
                            if (localStorage.UserType.indexOf("Global Contract Owner") >= 0) {
                                additional = '<span style="color:#3487ce; cursor:pointer;" onclick="javascript:treeviewclickforBulkUp(this)">' + item.BusinessAreaName + '</span>'
                            } else {
                                additional = '<span>' + item.BusinessAreaName + '</span><span style="font-size:12px;font-style:italic;">(Request Access)</span>';
                            }
                        }
                    } else {
                        additional = '<span>' + item.BusinessAreaName + '</span>';
                    }
                }

                if (item.ParentBusinessAreaID == 0) {
                    strContractAreaID = item.RowKey;
                    strContractAreaName = item.BusinessAreaName;
                    strContractAreabusinesarearowkey = item.RowKey;
                    strContractAreaName12Owner = item.Owner;
                    articleBusinessArea1 += '<tr data-tt-id="tre-' + item.RowKey + '" class="branch expanded">';
                    articleBusinessArea1 += '<td class="treeHead"><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaName + '</span><span id="ContractAreaAdmin" style="display:none;">' + strContractAreaName12Owner + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/globset.png" /><small>' + additional + '</small></td></tr>';
                } else {
                    articleBusinessArea1 += '<tr data-tt-id="tre-' + item.RowKey + '" data-tt-parent-id="tre-' + item.ParentBusinessAreaID + '" class="branch collapsed" style="display: table-row;">';
                    if (previousidforBulkUp == item.ParentBusinessAreaID) {
                        //find if child business area exists
                        $.ajax({
                            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/childbusinessareas?businessareaid=' + item.RowKey,
                            type: 'GET',
                            dataType: 'json',
                            'Content-Type': 'application/json',
                            headers: { 'eContracts-ApiKey': localStorage.APIKey },
                            async: false,
                            success: function (data) {
                                if (data.length == 0) {
                                    articleBusinessArea1 += '<td><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaName + '</span><span id="ContractAreaAdmin" style="display:none;">' + strContractAreaName12Owner + '</span><span id="BusinessAreaOwner" style="display:none;">' + item.Owner + '</span><span id="BusinessAreaDescription" style="display:none;">' + item.Description + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/gen.png" class="padding_left_65px" /><small>' + additional + '</small></td></tr>';
                                } else {
                                    articleBusinessArea1 += '<td><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaName + '</span><span id="ContractAreaAdmin" style="display:none;">' + strContractAreaName12Owner + '</span><span id="BusinessAreaOwner" style="display:none;">' + item.Owner + '</span><span id="BusinessAreaDescription" style="display:none;">' + item.Description + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/gen.png" /><small>' + additional + '</small></td></tr>';
                                }
                            },
                            error:
                                function (data) {

                                }
                        });
                    } else {
                        articleBusinessArea1 += '<td><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaName + '</span><span id="ContractAreaAdmin" style="display:none;">' + strContractAreaName12Owner + '</span><span id="BusinessAreaOwner" style="display:none;">' + item.Owner + '</span><span id="BusinessAreaDescription" style="display:none;">' + item.Description + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/gen.png" /><small>' + additional + '</small></td></tr>';
                    }
                    if (previousidforBulkUp != item.ParentBusinessAreaID)
                        previousidforBulkUp = item.RowKey;
                }
                //if (previousidcreate != item.ParentBusinessAreaID)
                //    recursiveIteration12(object.ChildrenData[i])

                if (object.ChildrenData.length > 0)
                    bindbusinessandcontractarea(spath, object.ChildrenData[i]);
            }
        }
    }
    catch (ex) {
        alert(ex);
    }
}
function ContractPickerBySingle(TileDetails) {
    cTitle = TileDetails;
    var BusinessTittle = "";
    var ContractNameTittle = "";
    $(".hhide").hide();
    $('#loadMA').html('<img src="../Content/Images/icon/loading.gif"> Working on it...');
    $('#tblContracts').empty();
    var baloc = "";
    if (typeof localStorage.GlobalBusinessAreaLocation != 'undefined' && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
        baloc = localStorage.GlobalBusinessAreaLocation;
    }
    var contractTags = [];
    if (cTitle != "PathContractTitleAll") {
        var SpliforgetRow = cTitle.split('_');
        BusinessTittle = $('#BusnsAreaNm_' + SpliforgetRow[1]).val();
        ContractNameTittle = $('#ConAreaName_' + SpliforgetRow[1]).val();
    }
    if (BusinessTittle != '' && ContractNameTittle != '') {
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/contractsbybusinessarea?businessarea=' + encodeURIComponent(BusinessTittle) + '&contractarea=' + encodeURIComponent(ContractNameTittle) + '&stage=' + getParameterByName('Type'),
            type: 'GET',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName, BusinessAreaLocation: baloc, UserID: localStorage.UserID },
            success: function (datavalue) {
                $('#loadMA').empty();
                var data = $.grep(datavalue, function (n, ind) {
                    return (n.Status != "Replaced" && n.Status != "Expired" && n.Status != "Cancelled" && n.Status != "Archived" && n.InRecycleBin != "Yes" && n.IsDraft != "Yes");
                });
                //manoj
                //var datalenght = data.length;
                var article = '';
                $(data).each(function (icon, itemcon) {
                    contractTags.push(itemcon.ContractTitle);
                    article += '<li>';
                    article += '<input id="' + itemcon.RowKey + '" type="radio" name="rdContract" class="css-checkbox" value="' + itemcon.ContractTitle + '" />';
                    article += '<label for="' + itemcon.RowKey + '" class="css-label PreserveSpace">' + itemcon.ContractTitle + '</label>';
                    article += '</li>';
                });
                $("#tblContracts").html(article);
                article = '';
                //manoj
                if (typeof ($("#" + cTitle).val()) != 'undefined' && $("#" + cTitle).val() != null && $("#" + cTitle).val() != "") {
                    var selctedcontracttitle = $("#" + cTitle).val().trim();
                    $("input[name=rdContract][value='" + selctedcontracttitle + "']").attr('checked', true);
                }
                //manoj
                $("#txtSearchBoxBulkUpload").autocomplete({
                    source: contractTags,
                    minLength: 2,
                    focus: function (event, ui) {
                        return false;
                    },
                    select: function (evn, uidetails) {
                        $("#txtSearchBoxBulkUpload").val(uidetails.item.label);
                        SearchContract();
                    }
                });

                var vCount = $("#tblContracts li").length;
                $('#compact-paginationContracts').pagination({
                    items: vCount,
                    itemsOnPage: 10,
                    type: 'ul',
                    row: 'li',
                    typeID: 'tblContracts',
                    cssStyle: 'compact-theme'
                });
            },
            error: function () {
                $('#loadMA').empty();
                $('#loadMA').html('<p style="margin-left: 20px;">No Contract Found!</p>')
            }
        });
        BusinessTittle = '';
        ContractNameTittle = '';
    }
    else {
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?sortbyfield=ContractTitle&orderby={orderby}',
            type: 'GET',
            dataType: 'json',
            "Content-Type": "application/json",
            headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName, BusinessAreaLocation: baloc, UserID: localStorage.UserID },
            cache: false,
            success: function (datavalue) {
                $('#loadMA').empty();
                var FilteterByStatus = [];
                if (getParameterByName('Type') == 'pipeline') {//Pipeline Contract
                    FilteterByStatus = vPipelineStatus;
                } else {//Finanlized Contract
                    FilteterByStatus = vContractStatus;
                }
                var data = $.grep(datavalue, function (n, ind) {
                    return (n.Status != "Replaced" && n.Status != "Expired" && n.Status != "Cancelled" && n.Status != "Archived" && n.InRecycleBin != "Yes" && n.IsDraft != "Yes" && (FilteterByStatus.indexOf(n.Status) > -1));
                });

                //manoj
                //var datalenght = data.length;
                var article = '';
                $(data).each(function (icon, itemcon) {
                    contractTags.push(itemcon.ContractTitle);
                    article += '<li>';
                    article += '<input id="' + itemcon.RowKey + '" type="radio" name="rdContract" class="css-checkbox" value="' + itemcon.ContractTitle + '" />';
                    article += '<label for="' + itemcon.RowKey + '" class="css-label PreserveSpace">' + itemcon.ContractTitle + '</label>';
                    article += '</li>';
                });
                $("#tblContracts").html(article);
                article = '';
                //manoj

                $("#txtSearchBoxBulkUpload").autocomplete({
                    source: contractTags,
                    minLength: 2,
                    focus: function (event, ui) {
                        return false;
                    },
                    select: function (evn, uidetails) {
                        $("#txtSearchBoxBulkUpload").val(uidetails.item.label);
                        SearchContract();
                    }
                });

                var vCount = $("#tblContracts li").length;
                $('#compact-paginationContracts').pagination({
                    items: vCount,
                    itemsOnPage: 10,
                    type: 'ul',
                    row: 'li',
                    typeID: 'tblContracts',
                    cssStyle: 'compact-theme'
                });
            },
            error: function () {
                $('#loadMA').empty();
                $('#loadMA').html('<p style="margin-left: 20px;">No Contract Found!</p>')
            }
        });
    }
    $("#browseContracts").dialog("option", "title", "Contract Picker");
    $("#browseContracts").dialog("open");

}

function treeviewclickforBulkUp(obj) {
    articaldocumenttype = '<option value="0">--Select--</option>")';
    documenturltofetch = '';
    var Selectedobj = obj.parentNode.parentNode;
    var businessareaforbulkUp = obj.textContent;
    var contactareaforbulkup = $(Selectedobj).find("#ContractAreaName").text();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/contractareadetailsbyname?contractareaname=' + encodeURIComponent(contactareaforbulkup),
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        async: false,
        success: function (documenttypes) {
            //documenturltofetch = documenttypes.DocLibName;
            var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
            var vDocLibFeat = $.grep(veContractFeatures, function (n, i) {
                return (n.RowKey == "14" && n.Status == "ON");
            });
            if (vDocLibFeat.length > 0) {
                if (documenttypes.DocLibName != '') {
                    documenturltofetch = documenttypes.DocLibName;
                    $('#hdContAreaDocLibName').val(documenttypes.DocLibName);
                }
                else {
                    documenturltofetch = 'Contract Documents';
                    $('#hdContAreaDocLibName').val('Contract Documents');
                }
            }
            else {
                documenturltofetch = 'Contract Documents';
                $('#hdContAreaDocLibName').val('Contract Documents');
            }
            var datalenght = documenttypes.DocumentTypes.split(';');
            datalenght = stringArrayUnique(datalenght).sort();
            if (datalenght.length > 0) {
                for (var i = 0; i < datalenght.length; i++) {
                    if (datalenght[i] != null && datalenght[i] != "") {
                        articaldocumenttype += "<option value='" + datalenght[i] + "'>" + datalenght[i] + "</option>";
                    }
                }
                if (datalenght.indexOf('Others') == -1)
                    articaldocumenttype += "<option value='Others'>Others</option>"
            } else {
                //articaldocumenttype += "<option value='Primary Agreement'>Primary Agreement</option>"
                articaldocumenttype += "<option value='Others'>Others</option>"
            }
            if (articaldocumenttype.indexOf("<option value='Others'>Others</option>") == -1 && articaldocumenttype.indexOf('<option value="Others">Others</option>') == -1) {
                articaldocumenttype += "<option value='Others'>Others</option>"
            }
        },
        error:
            function (data) {
            }
    });
    if (cTitle == 'PathBusinessAreaNameAll') {
        GlobalBusinessAreaName = businessareaforbulkUp;
        GlobalContactAreaname = contactareaforbulkup;
        var checkboxes = document.getElementsByName("checkbox");
        var checkboxesChecked = [];
        // loop over them all
        for (var i = 0; i < checkboxes.length; i++) {
            // And stick the checked ones onto an array...
            if (checkboxes[i].checked) {
                checkboxesChecked.push(checkboxes[i]);
                var idsplitvalu = checkboxes[i].id;
                var aftersplit = idsplitvalu.split("_");
                var vContractTitle = 'ContractTitle_' + aftersplit[1];
                var vBusinessName = 'BusnsAreaNm_' + aftersplit[1];
                var vConAreaName = 'ConAreaName_' + aftersplit[1];
                var vdocumenttypeid = 'ddlDocumentType_' + aftersplit[1];
                $('#' + vdocumenttypeid).empty()
                $('#' + vdocumenttypeid).append(articaldocumenttype);
                //$("#" + vdocumenttypeid).find('option[value="Primary Agreement"]').prop("selected", true);
                $('#' + vContractTitle).val('');
                $('#' + vBusinessName).val(businessareaforbulkUp);
                $('#' + vConAreaName).val(contactareaforbulkup);
                var Urltosearch = '';
                if (documenturltofetch != "") {
                    Urltosearch = '/' + documenturltofetch;
                    $('#PathContractTitle_' + aftersplit[1]).val('/' + documenturltofetch);
                    $('#LabelPathContractTitle_' + aftersplit[1]).text('/' + documenturltofetch);
                }
                else {
                    Urltosearch = '/Contract Documents';
                    $('#PathContractTitle_' + aftersplit[1]).val('/Contract Documents');
                    $('#LabelPathContractTitle_' + aftersplit[1]).text('/Contract Documents');
                }
                var IsExists;
                if (Urltosearch.slice(-1) != "/") {
                    IsExists = CheckDocumentExist(Urltosearch + "/", GetDocumentName($('#tr_' + aftersplit[1])[0].firstChild.textContent));
                } else {
                    IsExists = CheckDocumentExist(Urltosearch, GetDocumentName($('#tr_' + aftersplit[1])[0].firstChild.textContent));
                }
                if (IsExists) {
                    $('#tr_' + aftersplit[1]).css('color', 'red');
                    $('#txtbx_' + aftersplit[1]).val('true');
                } else {
                    $('#tr_' + aftersplit[1]).css('color', '');
                    $('#txtbx_' + aftersplit[1]).val('false');
                }
            }
        }
        $("#browseBA_LayoutsBulk").dialog("close");
    }
    else {
        $('#' + cTitle).val(businessareaforbulkUp);
        var splitvar = cTitle.split('_')
        var splitlast = splitvar[splitvar.length - 1];
        var vConAreaName = 'ConAreaName_' + splitlast;
        var vContractTitle = 'ContractTitle_' + splitlast;
        var vdocumenttypeid = 'ddlDocumentType_' + splitlast;
        var docpath = "PathContractTitle_" + splitlast;// vDocumentPath
        var docpathlabel = "LabelPathContractTitle_" + splitlast;
        $('#' + vdocumenttypeid).empty();
        $('#' + vdocumenttypeid).append(articaldocumenttype);
        // $("#" + vdocumenttypeid).find('option[value="Primary Agreement"]').prop("selected", true);
        $('#' + vConAreaName).val(contactareaforbulkup);
        $('#' + vContractTitle).val('');
        var Urltosearch = '';
        if (documenturltofetch != '') {
            Urltosearch = '/' + documenturltofetch;
            $('#' + docpath).val('/' + documenturltofetch);
            $('#' + docpathlabel).text('/' + documenturltofetch);
        } else {
            Urltosearch = '/Contract Documents'
            $('#' + docpath).val('/Contract Documents');
            $('#' + docpathlabel).text('/Contract Documents');
        }

        var IsExists;
        if (Urltosearch.slice(-1) != "/") {
            IsExists = CheckDocumentExist(Urltosearch + "/", GetDocumentName($('#tr_' + splitlast)[0].firstChild.textContent));
        } else {
            IsExists = CheckDocumentExist(Urltosearch, GetDocumentName($('#tr_' + splitlast)[0].firstChild.textContent));
        }
        if (IsExists) {
            $('#tr_' + splitlast).css('color', 'red');
            $('#txtbx_' + splitlast).val('true');
        } else {
            $('#tr_' + splitlast).css('color', '');
            $('#txtbx_' + splitlast).val('false');
        }
        $("#browseBA_LayoutsBulk").dialog("close");
    }
    articaldocumenttype = '';
    documenturltofetch = '';
}
function ContractPickerforAll(Titledetails) {
    cTitle = Titledetails;
    $(".hhide").hide();
    $('#loadMA').html('<img src="../Content/Images/icon/loading.gif"> Working on it...');
    $('#tblContracts').empty();
    var baloc = "";
    if (typeof localStorage.GlobalBusinessAreaLocation != 'undefined' && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
        baloc = localStorage.GlobalBusinessAreaLocation;
    }
    var contractTags = [];
    if (GlobalBusinessAreaName != '' && GlobalContactAreaname != '') {
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/contractsbybusinessarea?businessarea=' + encodeURIComponent(GlobalBusinessAreaName) + '&contractarea=' + encodeURIComponent(GlobalContactAreaname) + '&stage=' + getParameterByName('Type'),
            type: 'GET',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName, BusinessAreaLocation: baloc, UserID: localStorage.UserID },
            success: function (datavalue) {
                $('#loadMA').empty();
                var data = $.grep(datavalue, function (n, ind) {
                    return (n.Status != "Replaced" && n.Status != "Expired" && n.Status != "Cancelled" && n.Status != "Archived" && n.InRecycleBin != "Yes" && n.IsDraft != "Yes");
                });
                //manoj
                //var datalenght = data.length;
                var article = ''
                $(data).each(function (icon, itemcon) {
                    contractTags.push(itemcon.ContractTitle);
                    article += '<li>';
                    article += '<input id="' + itemcon.RowKey + '" type="radio" name="rdContract" class="css-checkbox" value="' + itemcon.ContractTitle + '" />';
                    article += '<label for="' + itemcon.RowKey + '" class="css-label PreserveSpace">' + itemcon.ContractTitle + '</label>';
                    article += '</li>';

                });
                $("#tblContracts").html(article);
                article = '';
                //manoj

                $("#txtSearchBoxBulkUpload").autocomplete({
                    source: contractTags,
                    minLength: 2,
                    focus: function (event, ui) {
                        return false;
                    },
                    select: function (evn, uidetails) {
                        $("#txtSearchBoxBulkUpload").val(uidetails.item.label);
                        SearchContract();
                    }
                });

                var vCount = $("#tblContracts li").length;
                $('#compact-paginationContracts').pagination({
                    items: vCount,
                    itemsOnPage: 10,
                    type: 'ul',
                    row: 'li',
                    typeID: 'tblContracts',
                    cssStyle: 'compact-theme'
                });
            },
            error: function () {
                $('#loadMA').empty();
                $('#loadMA').html('<p style="margin-left: 20px;">No Contract Found!</p>')
            }
        });
    }
    else {
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?sortbyfield=ContractTitle&orderby={orderby}',
            type: 'GET',
            dataType: 'json',
            "Content-Type": "application/json",
            headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName, BusinessAreaLocation: baloc, UserID: localStorage.UserID },
            cache: false,
            success: function (datavalue) {
                $('#loadMA').empty();
                var FilteterByStatus = [];
                if (getParameterByName('Type') == 'pipeline') {//Pipeline Contract
                    FilteterByStatus = vPipelineStatus;
                } else {//Finanlized Contract
                    FilteterByStatus = vContractStatus;
                }
                var data = $.grep(datavalue, function (n, ind) {
                    return (n.Status != "Replaced" && n.Status != "Expired" && n.Status != "Cancelled" && n.Status != "Archived" && n.InRecycleBin != "Yes" && n.IsDraft != "Yes" && (FilteterByStatus.indexOf(n.Status) > -1));
                });
                //manoj
                //var datalenght = data.length;
                var article = '';
                $(data).each(function (icon, itemcon) {
                    contractTags.push(itemcon.ContractTitle);
                    article += '<li>';
                    article += '<input id="' + itemcon.RowKey + '" type="radio" name="rdContract" class="css-checkbox" value="' + itemcon.ContractTitle + '" />';
                    article += '<label for="' + itemcon.RowKey + '" class="css-label PreserveSpace">' + itemcon.ContractTitle + '</label>';
                    article += '</li>';
                });
                $("#tblContracts").html(article);
                article = '';
                //manoj

                $("#txtSearchBoxBulkUpload").autocomplete({
                    source: contractTags,
                    minLength: 2,
                    focus: function (event, ui) {
                        return false;
                    },
                    select: function (evn, uidetails) {
                        $("#txtSearchBoxBulkUpload").val(uidetails.item.label);
                        SearchContract();
                    }
                });

                var vCount = $("#tblContracts li").length;
                $('#compact-paginationContracts').pagination({
                    items: vCount,
                    itemsOnPage: 10,
                    type: 'ul',
                    row: 'li',
                    typeID: 'tblContracts',
                    cssStyle: 'compact-theme'
                });
            },
            error: function () {
                $('#loadMA').empty();
                $('#loadMA').html('<p style="margin-left: 20px;">No Contract Found!</p>')
            }
        });
    }
    $("#browseContracts").dialog("option", "title", "Contract Picker");
    $("#browseContracts").dialog("open");
}

function ViewContractPicker(object) {
    if (typeof localStorage.GlobalBusinessAreaLocation != 'undefined' && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
        if (requiredValidator('' + object.name + '', false)) {
            $("#txtSearchBoxBulkUpload").val('');
            cTitle = object.id;
            if (cTitle == "PathContractTitleAll") {
                ContractPickerforAll(cTitle);
            }
            else {
                ContractPickerBySingle(cTitle);
            }
        }
    } else {
        $("#txtSearchBoxBulkUpload").val('');
        cTitle = object.id;
        if (cTitle == "PathContractTitleAll") {
            ContractPickerforAll(cTitle);
        }
        else {
            ContractPickerBySingle(cTitle);
        }
    }
}

function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    var fileslength = files.length;
    for (var i = 0; i < fileslength; i++) {
        droppedfiles.push(files[i]);
    }

    readfiles(files);
}

document.getElementById('files').addEventListener('change', handleFileSelect, false);

function SearchContract() {
    //manoj
    if ($("#txtSearchBoxBulkUpload").val() == "") {
        if (cTitle == "PathContractTitleAll") {
            ContractPickerforAll(cTitle);
        }
        else {
            ContractPickerBySingle(cTitle);
        }
    } else {
        $("#tblContracts").html('');
        $('#loadMA').html('<img src="../Content/Images/icon/loading.gif"> Searching...');
        var vURL = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?searchkeyword=' + encodeURIComponent($("#txtSearchBoxBulkUpload").val()) + '&customquery=&sortbyfield=ContractTitle&orderby=ASC';
        $.ajax({
            url: vURL,
            type: 'GET',
            dataType: 'json',
            "Content-Type": "application/json",
            headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName },
            cache: false,
            success: function (datacollection) {
                var datavalue = [];
                if (typeof localStorage.GlobalBusinessAreaLocation != 'undefined' && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
                    datavalue = $.grep(datacollection, function (nall, indnall) {
                        return (nall.BusinessAreaPath == localStorage.GlobalBusinessAreaLocation);
                    });
                } else {
                    if (cTitle == "PathContractTitleAll") {
                        if (GlobalBusinessAreaName != '' && GlobalContactAreaname != '') {
                            datavalue = $.grep(datacollection, function (npathall, indpathall) {
                                return (npathall.ContractArea == GlobalContactAreaname && npathall.BusinessArea == GlobalBusinessAreaName);
                            });
                        } else {
                            datavalue = datacollection;
                        }
                    } else {
                        var SpliforgetRow = cTitle.split('_');
                        BusinessTittle = $('#BusnsAreaNm_' + SpliforgetRow[1]).val();
                        ContractNameTittle = $('#ConAreaName_' + SpliforgetRow[1]).val();
                        if (BusinessTittle != "" && ContractNameTittle != "") {
                            datavalue = $.grep(datacollection, function (npathall, indpathall) {
                                return (npathall.ContractArea == ContractNameTittle && npathall.BusinessArea == BusinessTittle);
                            });
                        }
                        else {
                            datavalue = datacollection;
                        }
                    }
                }
                var FilteterByStatus = [];
                if (getParameterByName('Type') == 'pipeline') {//Pipeline Contract
                    FilteterByStatus = vPipelineStatus;
                } else {//Finanlized Contract
                    FilteterByStatus = vContractStatus;
                }
                var data = $.grep(datavalue, function (n, ind) {
                    return (n.Status != "Replaced" && n.Status != "Expired" && n.Status != "Cancelled" && n.Status != "Archived" && n.InRecycleBin != "Yes" && n.IsDraft != "Yes" && (FilteterByStatus.indexOf(n.Status) > -1));
                });
                var arr = [];
                $.each($('#' + cTitle).val().split(";"), function () {
                    arr.push($.trim(this));
                });
                //manoj
                var article = '';
                $(data).each(function (icon, itemcon) {
                    article += '<li>';
                    article += '<input id="' + itemcon.RowKey + '" type="radio" name="rdContract" class="css-checkbox" value="' + itemcon.ContractTitle + '" />';
                    article += '<label for="' + itemcon.RowKey + '" class="css-label PreserveSpace">' + itemcon.ContractTitle + '</label>';
                    article += '</li>';
                });
                //manoj
                $('#loadMA').empty();
                $("#tblContracts").html(article);
                article = '';
                if (typeof ($("#" + cTitle).val()) != 'undefined' && $("#" + cTitle).val() != null && $("#" + cTitle).val() != "" && cTitle != "PathContractTitleAll") {
                    var selctedcontracttitle = $("#" + cTitle).val().trim();
                    $("input[name=rdContract][value='" + selctedcontracttitle + "']").attr('checked', true);
                }
                var vCount = $("#tblContracts li").length;
                if (vCount != 0) {
                    $('#compact-paginationContracts').pagination({
                        items: vCount,
                        itemsOnPage: 10,
                        type: 'ul',
                        row: 'li',
                        typeID: 'tblContracts',
                        cssStyle: 'compact-theme'
                    });
                } else {
                    $('#loadMA').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No Contract Found!</p>')
                    $('#compact-paginationContracts').css('display', 'none');
                }
            },
            error: function () {
                $('#compact-paginationContracts').css('display', 'none');
                $('#loadCP').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No Contract Found!</p>')
            }
        });
    }
    //manoj
}

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
    var vDocURL = localStorage.SPHostUrl + folderurl + documentname;
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?docurl=' + vDocURL,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        async: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
        success: function (folder) {
            isExist = true;
        },
        error:
            function (data) {
                isExist = false;
            }
    });
    return isExist;
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}



//get the Unique Array Start
function stringArrayUnique(array) {
    return $.grep(array, function (el, index) {
        return index === $.inArray(el, array);
    });
}
//get the Unique Array End

//manoj
function canceluploaddocument() {
    if (getParameterByName('Type') == 'pipeline') {
        location = "/Contracts/Documents?Type=pipeline";
    } else {
        location = "/Contracts/Documents?Type=contracts";
    }
}

//For Chunk File
var bulkdocumentuploadchunk = function () {
    if (droppedfiles.length > 0) {
        var fileControl = droppedfiles;
        if (fileControl.length > 0) {
            dropdownlength = droppedfiles.length;
            uploaders.uploaderCollection.removeAll();
            for (var i = 0; i < fileControl.length; i++) {
                //if (removedItems.indexOf(i.toString()) == -1) {
                //dropdownlength++;
                cful = Object.create(chunkedFileUploader);
                cful.init(fileControl[i], i);
                uploaders.uploaderCollection.push(cful);
                //}
            }
            uploaders.uploadAll();
        }
    }
}

var uploaders = {
    uploaderCollection: ko.observableArray([]),
    uploadAll: function () {
        for (var i = 0; i < this.uploaderCollection().length; i++) {
            var cful = this.uploaderCollection()[i];
            cful.uploadMetaData();
        }
    }
}

var chunkedFileUploader =
{
    maxRetries: 3,
    //blockLength: 1048576,
    blockLength: 1048576,
    numberOfBlocks: 1,
    currentChunk: 1,
    retryAfterSeconds: 3,
    fileToBeUploaded: null,
    size: 0,
    fileIndex: 0,
    name: "",

    init: function (file, index) {
        this.fileToBeUploaded = file;
        this.size = file.size;
        this.name = file.name;
        this.fileIndex = index;
    },

    uploadMetaData: function () {
        this.numberOfBlocks = Math.ceil(this.size / this.blockLength);
        this.currentChunk = 1;
        //manoj
        var Row_id_Value = "";
        var SelectedRow_Value = $('#tbBulkControls tbody tr').eq(this.fileIndex)
        if (typeof (SelectedRow_Value) != 'undefined' && SelectedRow_Value != null && SelectedRow_Value != "") {
            Row_id_Value = SelectedRow_Value[0].id.split(/[_ ]+/).pop();
        }
        var formData = new FormData();
        formData.append("AccountID", localStorage.AccountID);
        formData.append("CreatedBy", localStorage.UserName);
        formData.append("ModifiedBy", localStorage.UserName);
        formData.append("BusinessAreaName", $("#BusnsAreaNm_" + Row_id_Value).val());
        formData.append("ContractAreaName", $("#ConAreaName_" + Row_id_Value).val());
        formData.append("ContractTitle", $("#ContractTitle_" + Row_id_Value).val());
        formData.append("DocumentType", $("#ddlDocumentType_" + Row_id_Value).val());
        formData.append("ParentFoldertoPass", $("#LabelPathContractTitle_" + Row_id_Value).text());
        formData.append("IsDocumentExist", (document.getElementById("tr_" + Row_id_Value).style.color == "rgb(255, 0, 0)") ? "Yes" : "No");
        formData.append("RefreshToken", localStorage.RefreshToken);
        if (typeof ($("#chkbkocr_" + Row_id_Value)) != 'undefined' && $("#chkbkocr_" + Row_id_Value).is(':checked'))
            formData.append("IsOcrDoc", "Yes");
        else
            formData.append("IsOcrDoc", "No");

        //manoj
        $.ajax({
            type: "POST",
            //async: false,
            data: formData,
            dataType: 'json',
            headers: { 'AntiReqVerificationToken': $("#forgeryToken").val(), 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
            processData: false,
            contentType: false,
            url: "/Documents/SetContractMetadata?blocksCount=" + this.numberOfBlocks
                + "&fileName=" + this.name
                + "&fileSize=" + this.size
                + "&fileIndex=" + this.fileIndex,

        }).done(function (state) {
            if (state.success == true) {
                var cufl = uploaders.uploaderCollection()[state.index]
                cufl.displayStatusMessage(cufl, "0%");
                cufl.sendFile(cufl);
            }
        }).fail(function () {
            dropdownlength = dropdownlength - 1;
            this.displayStatusMessage("Failed to send MetaData");
        });
    },

    sendFile: function (uploader) {
        var start = 0,
            end = Math.min(uploader.blockLength, uploader.fileToBeUploaded.size),
            retryCount = 0,
            sendNextChunk, fileChunk;
        var cful = uploader;
        sendNextChunk = function () {
            fileChunk = new FormData();

            if (uploader.fileToBeUploaded.slice) {
                fileChunk.append('Slice', uploader.fileToBeUploaded.slice(start, end));
            }
            else if (uploader.fileToBeUploaded.webkitSlice) {
                fileChunk.append('Slice', uploader.fileToBeUploaded.webkitSlice(start, end));
            }
            else if (uploader.fileToBeUploaded.mozSlice) {
                fileChunk.append('Slice', uploader.fileToBeUploaded.mozSlice(start, end));
            }
            else {
                displayStatusMessage(cful, operationType.UNSUPPORTED_BROWSER);
                return;
            }
            jqxhr = $.ajax({
                async: true,
                url: ('/Documents/UploadChunk?id=' + uploader.currentChunk + "&fileIndex=" + uploader.fileIndex),
                data: fileChunk,
                headers: { 'AntiReqVerificationToken': $("#forgeryToken").val() },
                cache: false,
                contentType: false,
                processData: false,
                type: 'POST'
            }).fail(function (request, error) {
                if (error !== 'abort' && retryCount < maxRetries) {
                    ++retryCount;
                    setTimeout(sendNextChunk, retryAfterSeconds * 1000);
                }
                if (error === 'abort') {
                    dropdownlength = dropdownlength - 1;
                    displayStatusMessage(cful, "Aborted");
                }
                else {
                    if (retryCount === maxRetries) {
                        displayStatusMessage(cful, "Upload timed out.");
                        resetControls();
                        uploader = null;
                        dropdownlength = dropdownlength - 1;
                    }
                    else {
                        displayStatusMessage(cful, "Resuming Upload");
                    }
                }
                return;
            }).done(function (state) {
                if (state.error || state.isLastBlock) {
                    uploadedfilecount++;
                    cful.displayStatusMessage(cful, "100%");
                    if (uploadedfilecount == dropdownlength) {
                        if (getParameterByName('Type') == 'pipeline') {
                            //For Dimention Data
                            location = "/Contracts/Documents?Type=pipeline";
                        } else {
                            //For Dimention Data
                            location = "/Contracts/Documents?Type=contracts";
                        }
                        return;
                    }
                }
                ++cful.currentChunk;
                start = (cful.currentChunk - 1) * cful.blockLength;
                end = Math.min(cful.currentChunk * cful.blockLength, cful.fileToBeUploaded.size);
                retryCount = 0;
                cful.updateProgress(cful);
                if (cful.currentChunk <= cful.numberOfBlocks) {
                    sendNextChunk();
                }
            });
        }
        sendNextChunk();
    },

    displayStatusMessage: function (uploader, message) {
        if (typeof (message) != 'undefined' && message != null && message != "") {
            if (message == "100%") {
                message = "Completed";
            }
            var Row_id_Value = "";
            var SelectedRow_Value = $('#tbBulkControls tbody tr').eq(uploader.fileIndex)
            if (typeof (SelectedRow_Value) != 'undefined' && SelectedRow_Value != null && SelectedRow_Value != "") {
                Row_id_Value = SelectedRow_Value[0].id.split(/[_ ]+/).pop();
            }
            $("#uploadprogresslbl" + Row_id_Value).text(message);
            $('#idLoadingstart' + Row_id_Value).css('display', 'none');
        }
    },

    updateProgress: function (uploader) {
        var progress = uploader.currentChunk / uploader.numberOfBlocks * 100;
        if (progress <= 100) {
            uploader.displayStatusMessage(uploader, progress + "%");
        }
    }
}


//manoj
function GetDocumentName(DocumentName) {
    if (OCRisEnabled) {
        if (DocumentName.split('.').pop().toString().toUpperCase().indexOf('TIF') > -1) {
            var arrdocumentname = DocumentName.split('.');
            OCRDocumentName = arrdocumentname.slice(0, -1).join('.') + ".pdf"
        } else {
            OCRDocumentName = DocumentName;
        }
    } else {
        OCRDocumentName = DocumentName;
    }
    return OCRDocumentName;
}

function ChangeDocumentBulk_New(obj) {
    var ChangedRowValue = obj.id.split(/[_ ]+/).pop();
    var seletedfilename = $("#tr_" + ChangedRowValue).children('td').first()[0].textContent;
    var ResultToAction = false;
    var folderVlaue = $("#PathContractTitle_" + ChangedRowValue).val();
    folderVlaue = (folderVlaue.charAt(0) != '/') ? '/' + folderVlaue : folderVlaue;
    folderVlaue = ((folderVlaue.substr(folderVlaue.length - 1)) != "/") ? folderVlaue + "/" : folderVlaue;
    if (obj.checked) {
        var seletedfile_newname = seletedfilename.split('.').slice(0, -1).join(".") + ".pdf";
        ResultToAction = CheckDocumentExist(folderVlaue, seletedfile_newname);
    } else {
        ResultToAction = CheckDocumentExist(folderVlaue, seletedfilename);
    }
    if (ResultToAction) {
        $("#tr_" + ChangedRowValue).css("color", "red");
    } else {
        $("#tr_" + ChangedRowValue).css("color", "");
    }
}

function ManagemoreDoc() {
    if (document.getElementById("dvmanageholder").style.display == "none") {
        $(".clManageDrag").css("display", "");
    } else {
        $(".clManageDrag").css("display", "none");
    }
}
//For Chunk File
//manoj