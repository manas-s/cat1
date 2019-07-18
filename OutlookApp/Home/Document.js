/// <reference path="../App.js" />
var xhr;
var serviceRequest;
var strDocTypes = "";
var MaxRequestLength = "";
var browsedContractSel = '';
var browsedDocConSel = '';
var browsedCounterparty = [];
var thisContractAreaSettings;
var arrDocTypes = [];
var arrDocTypeIds = [];
var counterpartyData = [];
var ContractData = [];
var statusRequired = ["New", "Drafting", "Awaiting Review", "Reviewed", "In Negotiation", "Awaiting Approval", "Approved", "Negotiation Complete", "Ready for Signature", "Awaiting Signatures", "Signed", "Active", "Up for Renewal", "Renewed", "Extended", "About to Expire"];
//Data table Alphabet search
var _alphabetSearch = '';
var numberindex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
var ContractSelected = false;
//Data table Alphabet search
(function () {
    "use strict";

    // The Office initialize function must be run each time a new page is loaded
    Office.initialize = function (reason) {
        $(document).ready(function () {
            MaxRequestLength = localStorage.MaxRequestLength;
            displayItemDetails();
        });
    };

    // Displays the "Subject" and "From" fields, based on the current mail item
    function displayItemDetails() {
        if (typeof (localStorage.selectedContract) != "undefined") {
            var selectedContract = localStorage.selectedContract;
            $("#txtContractRecElement1").val(selectedContract);
        }
        if (typeof (localStorage.AllContract) != "undefined" && localStorage.AllContract != null) {
            ContractData = JSON.parse(localStorage.getItem('AllContract'));

            if (typeof (localStorage.selectedContract) != "undefined") {
                var selectedContract = localStorage.selectedContract;
                var selContract = $.grep(ContractData, function (item, i) {
                    return item.ContractTitle.toLowerCase() == selectedContract.toLowerCase()
                });

                if (selContract.length > 0) {
                    $("#txtContractRecElement1").val(selContract[0].ContractTitle);
                    $("#txtContractRecElementID1").val(selContract[0].RowKey);
                    browsedContractSel = "";
                    browsedDocConSel = selContract[0].RowKey;
                    $("#txtCounterpartyCreate1").val(selContract[0].Counterparty);
                    if (selContract[0].ContractDocumentsUrl != "") {
                        $("#DocumentsUrl1").val(selContract[0].ContractDocumentsUrl);
                    }
                    else {
                        $("#DocumentsUrl1").val("/Contract Documents");
                        //$("#Folder1").val($(vSelectedElement).val().replace(/[^a-zA-Z 0-9]+/g, ''));
                    }
                    $("#lblBusinessArea").val(selContract[0].BusinessArea);
                    $("#lblBusinessAreaPath").val(selContract[0].BusinessAreaPath);
                    $("#lblContractArea").val(selContract[0].ContractArea);
                    $("#lblContractAreaAdmins").val(selContract[0].ContractAreaAdministrators);
                    $("#lblBusinessAreaOwners").val(selContract[0].BusinessAreaOwners);

                    $("#imgClearSearch").css('display', '');
                    $("#txtContractRecElement1").prop('readonly', true);
                    $("#imgOpenSearch").removeClass('left_img_68').addClass('left_img_48');
                }
            }

        }

        BindContracts('active');
        var selCon = $("#txtContractRecElement1").val();
        var item = Office.context.mailbox.item;
        var attachments = "";
        if (strDocTypes == "") {
            strDocTypes = GetDocumentTypes();
        }
        if (typeof item.attachments == "undefined") {
            $("#spNote").css("display", "");
            //$("#dvSaveFormButn").css("display", "none");
            $("#saveForm").css("display", "none");
        } else {
            $("#spNote").css("display", "none");
            //$("#dvSaveFormButn").css("display", "");
            $("#saveForm").css("display", "");
            if (item.attachments.length > 0) {
                //attachments += '<tr>';
                //attachments += '<td colspan=3 font-size: 14px;color: #696060;">Documents to Upload</td>';
                //attachments += '</tr>';
                attachments += '<tr> <th style="width:25%">Document Name</th> <th style="width:15%">Document Type</th> <th style="width:10%; text-align:center;">Enable OCR</th> <th style="width:8%"></th> <th style="width:8%"></th> </tr>';
            }
            var vFileType = "";
            var knownFileTypes = ['pdf', 'png', 'jpg', 'gif', 'bmp', 'doc', 'xls', 'ppt', 'docx', 'xlsx', 'txt', 'pptx', 'zip', 'rar', 'gzip', 'arj', 'wav', 'mp3', 'aif', 'aiff', 'm4a', 'ogg', 'wma', 'psd', 'ai', 'swf', 'fla', 'css', 'js', 'avi', 'mov', 'wmv', 'dotx', 'tif', 'tiff', 'csv', 'zip', 'ZIP', 'CSV', 'PDF', 'PNG', 'JPG', 'GIF', 'BMP', 'DOC', 'XLS', 'PPT', 'DOCX', 'XLSX', 'TXT', 'PPTX', 'ZIP', 'RAR', 'GZIP', 'ARJ', 'WAV', 'MP3', 'AIF', 'AIFF', 'M4A', 'OGG', 'WMA', 'PSD', 'AI', 'SWF', 'FLA', 'CSS', 'JS', 'AVI', 'MOV', 'WMV', 'DOTX', 'TIF', 'TIFF'];
            arrDocTypeIds = [];
            for (var i = 0; i < item.attachments.length; i++) {
                var additional = GetDocumentDetails(item.attachments[i].name, i);
                var style = "";
                var ext = item.attachments[i].name.split('.').pop();
                vFileType = "";
                if (jQuery.inArray(ext.toLowerCase(), knownFileTypes) > -1) {
                    vFileType = '<dt class="file-icon-ext ' + ext.toLowerCase() + '"></dt>';
                } else {
                    vFileType = '<dt class="file-icon-ext ' + 'unsuport' + '"></dt>';
                }

                attachments += '<tr id="trFileIndex_' + i + '"' + '>';
                if (vFileType == "")
                    attachments += '<td style="width:30%;" id="tdDoc' + i + '"' + '>' + '<div title=' + '"' + item.attachments[i].name + '"' + ' style="max-width:105px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;">' + item.attachments[i].name + '</div>' + ' <br/> <span style="font-size:12px" >' + filesize(item.attachments[i].size) + '</span>' + '</td>';
                else
                    attachments += '<td style="width:30%;" id="tdDoc' + i + '"' + '>' + vFileType + '<div title=' + '"' + item.attachments[i].name + '"' + ' style="max-width:105px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;">' + item.attachments[i].name + '</div>' + ' <br/> <span style="font-size:12px" >' + filesize(item.attachments[i].size) + '</span>' + '</td>';
                arrDocTypeIds.push("ddlDocumentType" + i);
                attachments += "<td style=width:30%;><select id='ddlDocumentType" + i + "' title='Document Type' class='f_inpt width50 DocumentTypeDDl validelement' style='height: 30px;width: 98% !important;float:left'>";
                attachments += '<option value="0">Document Type</option>' + strDocTypes;
                attachments += '</select></td>';
                //manoj

                //manoj
                var isError = validateAttachments(item.attachments[i].name, ext, i, item.attachments[i].size);

                if (typeof (localStorage.OCRFeature) != "undefined" && localStorage.OCRFeature != null && localStorage.OCRFeature != "" && localStorage.OCRFeature != "No" && ext.toLowerCase().indexOf('tif') > -1) {
                    attachments += '<td style="width:10%; text-align:center"><input type="checkbox" name="convert" id="tdOCRDoc_' + i + '" onchange="ChangeOCRDocument(this)"></td>';
                } else {
                    attachments += '<td style="width:10%; text-align:center"><input disabled ="true" type="checkbox" name="convert" id="tdOCRDoc_' + i + '" onchange="ChangeOCRDocument(this)"></td>';
                }

                if (additional != '') {
                    attachments += '<td>' + '<img title="View Uploaded to"  src="../../Content/Images/icon/view_detail_icon.png" onclick="showUploadedTo(this)" id="lnkUploadedto_' + i + '"' + '/>' + '</td>';
                } else {
                    attachments += '<td>' + '</td>';
                }
                //attachments += '<p  style="visibility: hidden;float:left;"><input type="checkbox" name="convert" id="tdOCRDoc' + i +' " onchange="ChangeOCRDocument(this)"><p>';



                //if (selCon != '')
                //    attachments += '&nbsp;&nbsp;<a id="aUploadAttach' + i + '" href="javascript:void(0)" onclick="UploadAttachments(\'' + i + '\', this)" class="linkText2 uploadLink">Upload</a><span id="spanUpload' + i + '" style="display:none;"><img src="../../Content/Images/icon/loading.gif"> Uploading...</span>';
                //else
                //    attachments += '&nbsp;&nbsp;<a id="aUploadAttach' + i + '" href="javascript:void(0)" onclick="UploadAttachments(\'' + i + '\', this)" class="linkText2 uploadLink" style="display:none;">Upload</a><span id="spanUpload' + i + '" style="display:none;"><img src="../../Content/Images/icon/loading.gif"> Uploading...</span>';
                //if (additional != '')
                //    attachments += '<td>' + '<a onclick="showUploadedTo(this)" id="lnkUploadedto_' + i + '"' + 'href="javascript:void(0)">Already exists in</a>' + '</td>';
                if (isError == "") {
                    var sizeInMB = filesize(item.attachments[i].size, { exponent: 2 }).split(' ')[0];
                    if (parseInt($.trim(sizeInMB)) < 5) {
                        attachments += '<td style="width:8%;" class="docValid"><img id="validImg_' + i + '"' + 'src="../../Content/Images/approved.png" title ="Document is ready for upload"  alt="Document is ready for upload"><img style="display:none" id="loadingImg_' + i + '"' + 'src="../../Content/Images/icon/loading.gif"  alt="Uploading..."> <img title="Uploaded successfully" style="display:none" id="UploadComplete_' + i + '"' + 'src="../../Content/Images/upload_completed.png"  alt="Uploaded successfully"> </td>';
                    } else {
                        attachments += '<td style="width:8%;" class="docValid"><img id="validImg_' + i + '"' + 'src="../../Content/Images/warning.png" title ="Uploading large file(s). This may take a few minutes."  alt="Document is ready for upload"><img style="display:none" id="loadingImg_' + i + '"' + 'src="../../Content/Images/icon/loading.gif"  alt="Uploading..."> <img title="Uploaded successfully" style="display:none" id="UploadComplete_' + i + '"' + 'src="../../Content/Images/upload_completed.png"  alt="Uploaded successfully"> </td>';
                    }
                } else {
                    attachments += '<td style="width:8%;" title =' + '"' + isError + '"' + 'class="docInValid"><img id="inValidImg_' + i + '"' + 'src="../../Content/Images/not_support.png"  alt="Some validation are failed !"> </td>';
                }

                attachments += '<td style="width:10%;"><img title="Remove Document" id="removeDocImg_' + i + '"' + ' src="../../Content/Images/close_red.png" onclick=removeAttachment(this)></td>';


                attachments += '</tr>';
                attachments += '<tr  style="display:none"  id="dvuploadedto_' + i + '"' + '>' + '<td colspan=7>' + additional + '</td>' + '</tr>';
            }
            if (attachments != "") {
                serviceRequest = new Object();
                serviceRequest.attachmentToken = "";
                serviceRequest.ewsUrl = Office.context.mailbox.ewsUrl;
                serviceRequest.attachments = new Array();
                $("#tblAttachments").append(attachments);
                if ($('.docInValid').length == 0) {
                    $('#btnMultiDocUpload').removeClass('disable-link');
                    $('#btnMultiDocUpload').css('background-color', 'rgb(68, 166, 216)');
                    $('#btnMultiDocUpload').css('border', '1px solid #44A6D8');
                }

            }
            else {
                attachments += "<p>No attachments found.</p>";
                $("#tblAttachments").append(attachments);
                $("#ulDocuments").css("display", "none");
                $('#btnMultiDocUpload').removeClass('disable-link');
                $('#btnMultiDocUpload').css('background-color', 'rgb(68, 166, 216)');
                $('#btnMultiDocUpload').css('border', '1px solid #44A6D8');
                $('#btnMultiDocUpload').parent().parent().hide();
                //$("#btnCancel").css("display", "none");
                //$("#btnSave").css("display", "none");
            }

            $.each(item.attachments, function (i, item) {
                $("#aOthers" + i).click(function () {
                    $("#dvOtherContracts" + i).toggle();
                    var len = $("#dvOtherContracts" + i).find('a').length;
                    if ($("#dvOtherContracts" + i).css('display') == "none") {
                        $("#aOthers" + i).html(len + ' More..');
                    }
                    else {
                        $("#aOthers" + i).html(len + ' Less..');
                    }
                });
            })


            $(arrDocTypeIds).each(function (j, documenttypeId) {
                if ($("#" + documenttypeId).length == 0) {
                }
                else {
                    $("#" + documenttypeId + " > option").each(function () {
                        var text = $(this).text();
                        if (text.length > 25) {
                            text = text.substring(0, 24) + '...';
                            $(this).text(text);
                        }
                    });
                }

            });
        }
    }

    function GetDocumentTypes() {
        var docType = ""
        $.ajax({
            url: '/api/accounts/' + localStorage.AccountID + '/documenttypes',
            type: 'GET',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            cache: false,
            async: false,
            success: function (documenttypes) {
                arrDocTypes = documenttypes;
                $("#ddlDocumentTypeCreate").empty();
                $("#ddlDocumentTypeCreate").append('<option value="0">Document Type</option>');
                $(documenttypes).each(function (i, item) {
                    docType += "<option value='" + item.TypeName + "'>" + item.TypeName + "</option>";
                    $("#ddlDocumentTypeCreate").append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>");
                });
                //$("#ddlDocumentTypeCreate").append("<option value='Others'>Others</option>");
                $("#ddlDocumentTypeCreate > option").each(function () {
                    var text = $(this).text();
                    if (text.length > 25) {
                        text = text.substring(0, 24) + '...';
                        $(this).text(text);
                    }
                });
            },
            error:
                function (data) {
                    arrDocTypes = [];
                    $("#ddlDocumentTypeCreate").empty();
                    $("#ddlDocumentTypeCreate").append('<option value="0">Document Type</option>');
                    $("#ddlDocumentTypeCreate").append("<option value='Others'>Others</option>");
                }
        });
        return docType;
    }

    var ContractIDs = [];
    function GetDocumentDetails(docname, j) {
        var vContracts = "";
        var otherContracts = "";
        var otherContracts_OCR = "";
        var vContracts_OCR = "";
        ContractIDs = [];
        var passingurl = '';
        if (typeof (localStorage.OCRFeature) != "undefined" && localStorage.OCRFeature != null && localStorage.OCRFeature != "" && localStorage.OCRFeature != "No" && docname.split('.').pop().toString().toLowerCase().indexOf('tif') > -1) {
            passingurl = '/api/accounts/' + localStorage.AccountID + '/documents/ocrdocument?docname=' + docname;
        } else {
            passingurl = '/api/accounts/' + localStorage.AccountID + '/documents?docname=' + docname;
        }
        $.ajax({
            url: passingurl,
            type: 'GET',
            dataType: 'json',
            'Content-Type': 'application/json',
            cache: false,
            async: false,
            headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID },
            success: function (data) {
                var otherCount = 0;
                //manoj
                if (typeof (localStorage.OCRFeature) != "undefined" && localStorage.OCRFeature != null && localStorage.OCRFeature != "" && localStorage.OCRFeature != "No" && docname.split('.').pop().toString().toLowerCase().indexOf('tif') > -1) {
                    var OCRDoctoFind = $.grep(data, function (itemdoc, idoc) {
                        return itemdoc.DocumentName.toLowerCase().split('.').pop().toString() == "pdf";
                    });
                    data = $.grep(data, function (itemdoc, idoc) {
                        return itemdoc.DocumentName.toLowerCase().split('.').pop().toString() != "pdf";
                    });
                    if (OCRDoctoFind.length > 0) {
                        var otherCount_OCR = 0;
                        var others_OCR = OCRDoctoFind.length;

                        $(OCRDoctoFind).each(function (iOCR, itemOCR) {
                            if (vContracts_OCR == "") {
                                ContractIDs.push(itemOCR.ContractID);
                                vContracts_OCR = '<div style="font-size: 12px;width: 93%;display:none" id="dvMainContractsOCR_' + j + '">Uploaded to <a href="/Contracts/ContractDetails?ContractID=' + itemOCR.ContractID + '" target="_blank" class="PreserveSpace conTitle">' + itemOCR.ContractTitle + '</a>';
                            }
                            else {
                                if (i < 2) {
                                    if (ContractIDs.indexOf(itemOCR.ContractID) == -1) {
                                        ContractIDs.push(itemOCR.ContractID);
                                        vContracts_OCR += ' | ' + ' <a href="/Contracts/ContractDetails?ContractID=' + itemOCR.ContractID + '" target="_blank" class="PreserveSpace conTitle">' + itemOCR.ContractTitle + '</a>';
                                    }
                                }
                                else {
                                    if (ContractIDs.indexOf(itemOCR.ContractID) == -1) {
                                        ContractIDs.push(itemOCR.ContractID);
                                        if (otherContracts_OCR == "")
                                            otherContracts_OCR = '<div id="dvOtherContracts' + j + '" style="display:none;"><a href="/Contracts/ContractDetails?ContractID=' + itemOCR.ContractID + '" target="_blank" class="PreserveSpace conTitle">' + itemOCR.ContractTitle + '</a>';
                                        else
                                            otherContracts_OCR += +' | ' + '<a href="/Contracts/ContractDetails?ContractID=' + itemOCR.ContractID + '" target="_blank" class="PreserveSpace conTitle">' + itemOCR.ContractTitle + '</a>';
                                        otherCount_OCR++;

                                    }
                                }
                            }
                        });
                        if (vContracts_OCR != "") {
                            if (others_OCR > 2) {
                                otherContracts_OCR += "</div>";
                                vContracts_OCR += otherContracts_OCR;
                                vContracts_OCR += ' | ' + ' <a href="javascript:void(0);" class="PreserveSpace" id="aOthers' + j + '">' + otherCount_OCR + ' More...</a>';
                            }
                            vContracts_OCR += "</div>";
                        }
                    }
                }
                //manoj
                var others = data.length;
                $(data).each(function (i, item) {
                    if (vContracts == "") {
                        ContractIDs.push(item.ContractID);
                        vContracts = '<div style="font-size: 12px;width: 93%; border:solid 1px #ccc;padding:4px; "  id="dvMainContracts_' + j + '">Uploaded to <a href="/Contracts/ContractDetails?ContractID=' + item.ContractID + '" target="_blank" class="PreserveSpace conTitle">' + item.ContractTitle + '</a>';
                    }
                    else {
                        if (i < 2) {
                            if (ContractIDs.indexOf(item.ContractID) == -1) {
                                ContractIDs.push(item.ContractID);
                                vContracts += ' | ' + '<a href="/Contracts/ContractDetails?ContractID=' + item.ContractID + '" target="_blank" class="PreserveSpace conTitle">' + item.ContractTitle + '</a>';
                            }
                        }
                        else {
                            if (ContractIDs.indexOf(item.ContractID) == -1) {
                                ContractIDs.push(item.ContractID);
                                if (otherContracts == "")
                                    otherContracts = '<div id="dvOtherContracts' + j + '" style="display:none;"><a href="/Contracts/ContractDetails?ContractID=' + item.ContractID + '" target="_blank" class="PreserveSpace conTitle">' + item.ContractTitle + '</a>';
                                else
                                    otherContracts += ' | ' + '<a href="/Contracts/ContractDetails?ContractID=' + item.ContractID + '" target="_blank" class="PreserveSpace conTitle">' + item.ContractTitle + '</a>';
                                otherCount++;

                            }
                        }
                    }
                });
                if (vContracts != "") {
                    if (others > 2) {
                        otherContracts += "</div>";
                        vContracts += otherContracts;
                        vContracts += ' | ' + '<a href="javascript:void(0);" class="PreserveSpace" id="aOthers' + j + '">' + otherCount + ' More...</a>';
                    }
                    vContracts += "</div>";

                }
                vContracts += vContracts_OCR;
            },
            error: function (data) {

            }
        });
        return vContracts;
    }
})();

function UploadAttachments(docind, item) {
    if ($("#txtContractRecElement1").val() == "") {
        $("#txtContractRecElement1").addClass('error');
        $("#txtContractRecElement1").focusout(function () {
            if (this.value != "") {
                $("#txtContractRecElement1").removeClass('error');
            }
        });
    }
    else {
        var acceptExtension = ['pdf', 'png', 'jpg', 'gif', 'bmp', 'doc', 'xls', 'ppt', 'docx', 'xlsx', 'txt', 'pptx', 'dotx', 'xps', 'rtf', 'odt', 'dotm', 'docm', 'msg', 'tif', 'tiff', 'csv', 'zip', 'ZIP', 'PDF', 'PNG', 'JPG', 'GIF', 'BMP', 'DOC', 'XLS', 'PPT', 'DOCX', 'XLSX', 'TXT', 'PPTX', 'DOTX', 'XPS', 'RTF', 'ODT', 'DOTM', 'DOCM', 'MSG', 'TIF', 'TIFF', 'CSV'];
        var myJsonObject = '';
        if (typeof (Office.context.mailbox.item.attachments[docind].$0_0) == "undefined") {
            myJsonObject = JSON.parse(JSON.stringify(Office.context.mailbox.item.attachments[docind]._data$p$0)); //New property change to obj
        }
        else {
            myJsonObject = JSON.parse(JSON.stringify(Office.context.mailbox.item.attachments[docind].$0_0)); // Old property change to obj
        }
        var ext = myJsonObject.name.split('.').pop().toString();


        if (acceptExtension.indexOf(ext.trim().toLowerCase()) > -1) {
            var isUpload = true;
            var selectedcon = $("#txtContractRecElement1").val();
            var selectedDiv = ($("#tdOCRDoc_" + docind).is(':checked')) ? $(item).parent().find('#dvMainContractsOCR_' + docind) : $(item).parent().find('#dvMainContracts_' + docind);
            if (typeof (selectedDiv) == "undefined" && selectedDiv != null && selectedDiv != "") {
                $.each(atags, function (i, item) {
                    var title = $(item).text();
                    if (title.toLowerCase() == selectedcon.toLowerCase()) {
                        isUpload = false;
                    }
                })
            }
            var atags = $(selectedDiv).find('.conTitle');
            if (isUpload) {
                //attachNewDoc(item, docind);
                $("#aUploadAttach" + docind).hide();
                $("#spanUpload" + docind).show();

                vAttachIndexArr.push(docind);
                vAttachIndex = docind;
                //$("#loadingPage").fadeIn();
                Office.context.mailbox.getCallbackTokenAsync(attachmentTokenCallback);
            }
            else {
                app.initialize();
                $('#notification-message').removeClass('notification-success');
                $('#notification-message').addClass('notification-error');
                app.showNotification("", "Already uploaded to " + selectedcon);
            }
        }
        else {
            app.initialize();
            $('#notification-message').removeClass('notification-success');
            $('#notification-message').addClass('notification-error');
            app.showNotification("", "Cannot Upload ." + ext + " files.");
        }
    }

    //if (requiredValidator('saveForm', false)) {
    //}
    //else {
    //    app.initialize();
    //    app.showNotification("", "Enter required fields.");
    //}
};
function UploadAttachmentsMul() {
    if ($("#txtContractRecElement1").val() == "") {
        $("#txtContractRecElement1").addClass('error');
        $("#txtContractRecElement1").focusout(function () {
            if (this.value != "") {
                $("#txtContractRecElement1").removeClass('error');
            }
        });
        app.initialize();
        $('#notification-message').removeClass('notification-success');
        $('#notification-message').addClass('notification-error');
        app.showNotification("", "Please select Contract.");
    } else if (!ContractSelected) {
        $("#txtContractRecElement1").addClass('error');
        $("#txtContractRecElement1").focusout(function () {
            if (this.value != "") {
                $("#txtContractRecElement1").removeClass('error');
            }
        });
        app.initialize();
        $('#notification-message').removeClass('notification-success');
        $('#notification-message').addClass('notification-error');
        app.showNotification("", "Please select Contract.");
    }
    else {

        //$("input:checkbox[name=MultiselectDoc]:checked").each(function (i, item) {
        //    var attcId = $(item).attr("data-attchIndex");
        //    vAttachIndexMul.push(attcId);
        //    if ($("#ddlDocumentType" + attcId).val() == "0") {
        //        $("#ddlDocumentType" + attcId).addClass('error');
        //        $("#ddlDocumentType" + attcId).focusout(function () {
        //            if ($("#ddlDocumentType" + attcId).val() != "0") {
        //                $("#ddlDocumentType" + attcId).removeClass('error');
        //            }
        //        });
        //        flag += 1;
        //    }
        //});


        $("#tblAttachments tr").each(function (i, item) {
            var id = $(item).attr('id');

            if (typeof id != 'undefined' && id != '') {
                if ($.inArray(id.split('_')[1], vAttachIndexMul) < 0) {
                    vAttachIndexMul.push(id.split('_')[1]);
                }
            }

        });
        //vAttachIndex = docind;
        //$("#loadingPage").fadeIn();
        Office.context.mailbox.getCallbackTokenAsync(attachmentTokenCallbackMul);

    }
    //if (requiredValidator('saveForm', false)) {

    //}
    //else {
    //    app.initialize();
    //    app.showNotification("", "Enter required fields.");
    //}
};
var vAttachIndex = -1;
var vAttachIndexArr = [];
function attachmentTokenCallback(asyncResult, userContext) {
    if (asyncResult.status == "succeeded") {
        serviceRequest.attachmentToken = asyncResult.value;
        makeServiceRequest();
    }
    else {
        // $("#loadingPage").fadeOut();
        app.initialize();
        $('#notification-message').removeClass('notification-success');
        $('#notification-message').addClass('notification-error');
        app.showNotification("", "Could not get callback token: " + asyncResult.error.message);
    }
}

var vAttachIndexMul = [];
function attachmentTokenCallbackMul(asyncResult, userContext) {
    if (asyncResult.status == "succeeded") {
        serviceRequest.attachmentToken = asyncResult.value;
        makeServiceRequestMul();
    }
    else {
        $("#loadingPage").fadeOut();
        app.initialize();
        $('#notification-message').removeClass('notification-success');
        $('#notification-message').addClass('notification-error');
        app.showNotification("", "Could not get callback token: " + asyncResult.error.message);
    }
}

function makeServiceRequest() {
    if (vAttachIndex >= 0) {
        xhr = new XMLHttpRequest();

        // Update the URL to point to your service location.
        xhr.open("POST", "/api/mailservice/attachments", true);

        xhr.setRequestHeader("eContracts-ApiKey", localStorage.APIKey);
        xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xhr.onreadystatechange = requestReadyStateChange;

        var j = 0;
        //var atchmt = Attachments.filter(function (attach) { return attach.Value == Office.context.mailbox.item.attachments[i].name });
        //if (atchmt.length > 0) {
        var myJsonObject = '';
        if (typeof (Office.context.mailbox.item.attachments[vAttachIndex].$0_0) == "undefined") {
            myJsonObject = JSON.parse(JSON.stringify(Office.context.mailbox.item.attachments[vAttachIndex]._data$p$0)); //New property change to obj
        }
        else {
            myJsonObject = JSON.parse(JSON.stringify(Office.context.mailbox.item.attachments[vAttachIndex].$0_0)); // Old property change to obj
        }

        // var myJsonObject = JSON.parse(JSON.stringify(Office.context.mailbox.item.attachments[vAttachIndex].$0_0)); //change to obj
        myJsonObject.accountid = localStorage.AccountID;
        myJsonObject.contractid = $("#txtContractRecElementID1").val();
        myJsonObject.contracttitle = $("#txtContractRecElement1").val();
        myJsonObject.doctype = ($("#ddlDocumentType" + vAttachIndex).val() == "0" ? "0" : $("#ddlDocumentType" + vAttachIndex).val());
        myJsonObject.path = $("#DocumentsUrl1").val();
        myJsonObject.OCRDoc = ($("#tdOCRDoc_" + vAttachIndex).is(':checked')) ? "Yes" : "No";
        myJsonObject.foldername = $("#Folder1").val();
        myJsonObject.username = localStorage.UserName;
        myJsonObject.siteurl = localStorage.SPHostUrl;
        myJsonObject.businessarea = $("#lblBusinessArea").val().trim();
        myJsonObject.businessareapath = $("#lblBusinessAreaPath").val().trim();
        myJsonObject.contractarea = $("#lblContractArea").val().trim();
        myJsonObject.contractareaadministrators = $("#lblContractAreaAdmins").val().trim();
        myJsonObject.businessareaowners = $("#lblBusinessAreaOwners").val().trim();
        myJsonObject = JSON.stringify(myJsonObject); //change back to string
        serviceRequest.attachments.push(JSON.parse(myJsonObject));
        j++;
        //}
        // Translate the attachment details into a form easily understood by WCF.
        for (i = 0; i < Office.context.mailbox.item.attachments.length; i++) {

        }
        // Send the request. The response is handled in the 
        // requestReadyStateChange function.
        xhr.send(JSON.stringify(serviceRequest));

        if ($("#dvMainContracts_" + vAttachIndex).length == 0) {
            var html = '<div style="font-size: 12px;width: 93%;" class="bg-warning" id="dvMainContracts_' + vAttachIndex + '"><a href="/Contracts/ContractDetails?ContractID=' + $("#txtContractRecElementID1").val() + '" target="_blank" class="PreserveSpace conTitle">Uploaded to ' + $("#txtContractRecElement1").val() + '</a></div>';
            $("#tdDoc" + vAttachIndex).append(html);
        }

        else if ($("#dvMainContracts_" + vAttachIndex + " a").length == 1) {
            var links = $("#dvMainContracts_" + vAttachIndex + " a").map(function (e) {
                return this.text;
            }).get();
            if (links.indexOf($("#txtContractRecElement1").val()) != -1) {
            }
            else {
                var html = '; <a href="/Contracts/ContractDetails?ContractID=' + $("#txtContractRecElementID1").val() + '" target="_blank" class="PreserveSpace conTitle">' + $("#txtContractRecElement1").val() + '</a>';
                $("#dvMainContracts_" + vAttachIndex).append(html);
            }
        }
        else if ($("#dvMainContracts_" + vAttachIndex + " a").length == 2) {
            var links = $("#dvMainContracts_" + vAttachIndex + " a").map(function (e) {
                return this.text;
            }).get();
            if (links.indexOf($("#txtContractRecElement1").val()) != -1) {
            }
            else {
                var html = '<div id="dvOtherContracts' + vAttachIndex + '" style="display:none;"><a href="/Contracts/ContractDetails?ContractID=' + $("#txtContractRecElementID1").val() + '" target="_blank" class="PreserveSpace conTitle">' + $("#txtContractRecElement1").val() + '</a></div>';
                html += '; <a href="javascript:void(0);" class="PreserveSpace" id="aOthers' + vAttachIndex + '">1 More...</a>';
                $("#dvMainContracts_" + vAttachIndex).append(html);

                $("#aOthers" + vAttachIndex).click(function () {
                    $("#dvOtherContracts" + vAttachIndex).toggle();
                    var len = $("#dvOtherContracts" + vAttachIndex).find('a').length;
                    if ($("#dvOtherContracts" + vAttachIndex).css('display') == "none") {
                        $("#aOthers" + vAttachIndex).html(len + ' More..');
                    }
                    else {
                        $("#aOthers" + vAttachIndex).html('Show Less..');
                    }
                });
            }
        }
        else if ($("#dvmaincontracts_" + vAttachIndex + " a").length > 2) {
            var links = $("#dvMainContracts_" + vAttachIndex + " a").map(function (e) {
                return this.text;
            }).get();
            if (links.indexOf($("#txtContractRecElement1").val()) != -1) {
            }
            else {
                var html = '; <a href="/Contracts/ContractDetails?ContractID=' + $("#txtContractRecElementID1").val() + '" target="_blank" class="PreserveSpace conTitle">' + $("#txtContractRecElement1").val() + '</a></div>';
                $("#aOthers" + vAttachIndex).html(($("#dvOtherContracts" + vAttachIndex + " a").length + 1) + ' More..');
                $("#dvOtherContracts" + vAttachIndex).append(html);
            }
        }


    }
    else {
        //$("#loadingPage").fadeOut();
        app.initialize();
        $('#notification-message').removeClass('notification-success');
        $('#notification-message').addClass('notification-error');
        app.showNotification("", "Please enter required fields.");
    }
};


function makeServiceRequestMul() {
    if (vAttachIndexMul.length > 0) {
        xhr = new XMLHttpRequest();
        // Update the URL to point to your service location.
        xhr.open("POST", "/api/mailservice/attachments", true);

        xhr.setRequestHeader("eContracts-ApiKey", localStorage.APIKey);
        xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xhr.onreadystatechange = requestReadyStateChange;
        var temp = [];
        $(vAttachIndexMul).each(function (j, item) {
            var attId = parseInt(item.toString());

            if ($.inArray(attId, temp) == -1) {
                temp.push(attId);
                var myJsonObject = '';
                if (typeof (Office.context.mailbox.item.attachments[attId].$0_0) == "undefined") {
                    myJsonObject = JSON.parse(JSON.stringify(Office.context.mailbox.item.attachments[attId]._data$p$0)); //New property change to obj
                }
                else {
                    myJsonObject = JSON.parse(JSON.stringify(Office.context.mailbox.item.attachments[attId].$0_0)); // Old property change to obj
                }
                //var myJsonObject = JSON.parse(JSON.stringify(Office.context.mailbox.item.attachments[attId].$0_0)); //change to obj
                myJsonObject.accountid = localStorage.AccountID;
                myJsonObject.contractid = $("#txtContractRecElementID1").val();
                myJsonObject.contracttitle = $("#txtContractRecElement1").val();
                myJsonObject.doctype = ($("#ddlDocumentType" + attId).val() == "0" ? "0" : $("#ddlDocumentType" + attId).val());
                myJsonObject.path = $("#DocumentsUrl1").val();
                myJsonObject.OCRDoc = ($("#tdOCRDoc_" + attId).is(':checked')) ? "Yes" : "No";
                myJsonObject.foldername = $("#Folder1").val();
                myJsonObject.username = localStorage.UserName;
                myJsonObject.siteurl = localStorage.SPHostUrl;
                myJsonObject.businessarea = $("#lblBusinessArea").val().trim();
                myJsonObject.businessareapath = $("#lblBusinessAreaPath").val().trim();
                myJsonObject.contractarea = $("#lblContractArea").val().trim();
                myJsonObject.contractareaadministrators = $("#lblContractAreaAdmins").val().trim();
                myJsonObject.businessareaowners = $("#lblBusinessAreaOwners").val().trim();
                myJsonObject = JSON.stringify(myJsonObject); //change back to string
                serviceRequest.attachments.push(JSON.parse(myJsonObject));
                $('#validImg_' + attId).hide();
                $('#loadingImg_' + attId).show();
                $('#removeDocImg_' + attId).hide();
                $('#lnkUploadedto_' + attId).hide();
                $('#dvuploadedto_' + attId).hide();
                $('#UploadComplete_' + attId).hide();
                if ($('#tdOCRDoc_' + attId).prop('checked')) {
                    $('#tdOCRDoc_' + attId).prop('disabled', true);
                }
                if ($("#dvMainContracts_" + attId).length == 0) {
                    var html = '<tr style="display:none" id="dvuploadedto_' + attId + '"' + '>' + '<td colspan =7>' + '<div style="font-size: 12px;width: 93%;"  id="dvMainContracts_' + attId + '"' + '>Uploaded to <a href="/Contracts/ContractDetails?ContractID=' + $("#txtContractRecElementID1").val() + '" target="_blank" class="PreserveSpace conTitle">' + $("#txtContractRecElement1").val() + '</a></div>' + '</td>' + '</tr>';
                    $('#tblAttachments tr#trFileIndex_' + attId).after(html);
                    $('#tblAttachments tr#trFileIndex_' + attId).children().eq(3).append('<img style="display:none" title="View Uploaded to" src="../../Content/Images/icon/view_detail_icon.png" onclick="showUploadedTo(this)" id="lnkUploadedto_' + attId + '"' + 'style="">')
                }
                else if ($("#dvMainContracts_" + attId + " a").length == 1) {
                    var links = $("#dvMainContracts_" + attId + " a").map(function (e) {
                        return this.text;
                    }).get();
                    if (links.indexOf($("#txtContractRecElement1").val()) != -1) {
                    }
                    else {
                        var html = '; <a href="/Contracts/ContractDetails?ContractID=' + $("#txtContractRecElementID1").val() + '" target="_blank" class="PreserveSpace conTitle">' + $("#txtContractRecElement1").val() + '</a>';
                        $("#dvMainContracts_" + attId).append(html);
                    }
                }
                else if ($("#dvMainContracts_" + attId + " a").length == 2) {
                    var links = $("#dvMainContracts_" + attId + " a").map(function (e) {
                        return this.text;
                    }).get();
                    if (links.indexOf($("#txtContractRecElement1").val()) != -1) {
                    }
                    else {
                        var html = '<div id="dvOtherContracts' + attId + '" style="display:none;"><a href="/Contracts/ContractDetails?ContractID=' + $("#txtContractRecElementID1").val() + '" target="_blank" class="PreserveSpace conTitle">' + $("#txtContractRecElement1").val() + '</a></div>';
                        html += '; <a href="javascript:void(0);" class="PreserveSpace" id="aOthers' + j + '">1 More...</a>';
                        $("#dvMainContracts_" + attId).append(html);

                        $("#aOthers" + attId).click(function () {
                            $("#dvOtherContracts" + attId).toggle();
                            var len = $("#dvOtherContracts" + attId).find('a').length;
                            if ($("#dvOtherContracts" + j).css('display') == "none") {
                                $("#aOthers" + attId).html(len + ' More..');
                            }
                            else {
                                $("#aOthers" + attId).html('Show Less..');
                            }
                        });
                    }
                }
                else if ($("#dvMainContracts_" + attId + " a").length > 2) {
                    var links = $("#dvMainContracts_" + attId + " a").map(function (e) {
                        return this.text;
                    }).get();
                    if (links.indexOf($("#txtContractRecElement1").val()) != -1) {
                    }
                    else {
                        var html = '; <a href="/Contracts/ContractDetails?ContractID=' + $("#txtContractRecElementID1").val() + '" target="_blank" class="PreserveSpace conTitle">' + $("#txtContractRecElement1").val() + '</a></div>';
                        $("#aOthers" + attId).html(($("#dvOtherContracts" + attId + " a").length + 1) + ' More..');
                        $("#dvOtherContracts" + attId).append(html);
                    }

                }
            }

        })
        //var j = 0;
        ////var atchmt = Attachments.filter(function (attach) { return attach.Value == Office.context.mailbox.item.attachments[i].name });
        ////if (atchmt.length > 0) {

        //j++;
        //}
        // Translate the attachment details into a form easily understood by WCF.
        //for (i = 0; i < Office.context.mailbox.item.attachments.length; i++) {

        //}

        // Send the request. The response is handled in the 
        // requestReadyStateChange function.
        $('#btnMultiDocUpload').addClass('disable-link');
        $('#btnMultiDocUpload').css({ 'background-color': '#ccd2d6', 'border': '1px', 'border-style': 'solid', 'border-color': 'rgb(204, 210, 214)' });
        xhr.send(JSON.stringify(serviceRequest));
        temp = [];
        //vAttachIndexMul = [];

    }
    else {
        $("#loadingPage").fadeOut();
        vAttachIndexMul = [];
        app.initialize();
        $('#notification-message').removeClass('notification-success');
        $('#notification-message').addClass('notification-error');
        app.showNotification("", "Please enter required fields.");
    }
};


// Handles the response from the JSON web service.
function requestReadyStateChange() {
    //$("#loadingPage").fadeOut();
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            var response = JSON.parse(JSON.stringify(xhr.responseText));
            if (!response.isError) {
                $("#loadingPage").fadeOut();


                app.initialize();
                $('#notification-message').addClass('notification-success');
                $('#notification-message').removeClass('notification-error');
                app.showNotification("", "Document(s) successfully uploaded to eContracts.");
                ClearForm();
                if (vAttachIndexArr.length == 0) {
                    vAttachIndexArr = vAttachIndexMul;
                }
                vAttachIndexMul = [];
                $(vAttachIndexArr).each(function (j, item) {
                    $("#loadingImg_" + item).css('display', 'none');
                    $('#lnkUploadedto_' + item).css('display', '');
                    $("#UploadComplete_" + item).css('display', '');
                    $("#aUploadAttach" + item).css('display', '');
                    if ($('#tdOCRDoc_' + item).prop('checked')) {
                        $('#tdOCRDoc_' + item).prop('disabled', false);
                    }
                });
                if (typeof serviceRequest != 'undefined')
                    serviceRequest.attachments = [];
            } else {
                $("#loadingPage").fadeOut();
                if (typeof serviceRequest != 'undefined')
                    serviceRequest.attachments = [];
                app.initialize();
                $('#notification-message').removeClass('notification-success');
                $('#notification-message').addClass('notification-error');
                app.showNotification("", response.message);
                if (vAttachIndexArr.length == 0) {
                    vAttachIndexArr = vAttachIndexMul;
                }
                vAttachIndexMul = [];
                $(vAttachIndexArr).each(function (j, item) {
                    $("#loadingImg_" + item).css('display', 'none');
                    $("#spanUpload" + item).css('display', 'none');
                    $("#aUploadAttach" + item).css('display', '');
                });
                $('#btnMultiDocUpload').removeClass('disable-link');
                $('#btnMultiDocUpload').css('background-color', 'rgb(68, 166, 216)');
                $('#btnMultiDocUpload').css('border', '1px solid #44A6D8');
            }
        } else {
            if (xhr.status == 404) {
                $("#loadingPage").fadeOut();
                if (typeof serviceRequest != 'undefined')
                    serviceRequest.attachments = [];
                app.initialize();
                $('#notification-message').removeClass('notification-success');
                $('#notification-message').addClass('notification-error');
                app.showNotification("", "The app server could not be found.");
                if (vAttachIndexArr.length == 0) {
                    vAttachIndexArr = vAttachIndexMul;
                }
                vAttachIndexMul = [];
                $(vAttachIndexArr).each(function (j, item) {
                    $("#loadingImg_" + item).css('display', 'none');
                    $("#spanUpload" + item).css('display', 'none');
                    $("#aUploadAttach" + item).css('display', '');
                });
                $('#btnMultiDocUpload').removeClass('disable-link');
                $('#btnMultiDocUpload').css('background-color', 'rgb(68, 166, 216)');
                $('#btnMultiDocUpload').css('border', '1px solid #44A6D8');
            } else {
                $("#loadingPage").fadeOut();
                if (typeof serviceRequest != 'undefined')
                    serviceRequest.attachments = [];
                app.initialize();
                $('#notification-message').removeClass('notification-success');
                $('#notification-message').addClass('notification-error');
                app.showNotification("", "There was an unexpected error: " + xhr.status + " -- " + xhr.statusText);
                if (vAttachIndexArr.length == 0) {
                    vAttachIndexArr = vAttachIndexMul;
                }
                vAttachIndexMul = [];
                $(vAttachIndexArr).each(function (j, item) {
                    $("#loadingImg_" + item).css('display', 'none');
                    $("#spanUpload" + item).css('display', 'none');
                    $("#aUploadAttach" + item).css('display', '');
                });
                $('#btnMultiDocUpload').removeClass('disable-link');
                $('#btnMultiDocUpload').css('background-color', 'rgb(68, 166, 216)');
                $('#btnMultiDocUpload').css('border', '1px solid #44A6D8');
            }
        }
    }
};

$(document).ready(function () {
    $('#aAttachment').css("background-color", "#3f91cc");
    $('#aAttachment').css("color", "#ffffff");
    $("#dvContractRec").dialog({
        autoOpen: false,
        closeText: "",
        width: "95%",
        title: "Task",
        modal: true,
        close: function () {

        }
    });

    $("#browseCounterparty").dialog({
        autoOpen: false,
        closeText: "",
        width: "95%",
        title: "Counterparty",
        modal: true,
        buttons: {
            "OK": function () {
                var vCoounterparty = "";
                //browsedCounterparty = [];
                $(browsedCounterparty).each(function () {
                    if (vCoounterparty == "") {
                        vCoounterparty = this.value;
                        // browsedCounterparty.push(this.value);
                    }
                    else {
                        vCoounterparty += "; " + this.value;
                        // browsedCounterparty.push(this.value);
                    }
                });
                $("#txtCounterpartyCreate").val(vCoounterparty);
                $("#Counterparty").val(vCoounterparty);
                $(this).dialog("close");
            },
            "Clear": function () { $("#txtSearchBoxCounterparty").val(""); browsedCounterparty = []; CounterpartyFunc(); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });
    $('#txtSearchBoxTodoForm').keypress(function (e) {
        if (e.keyCode == 13) {
            $(".ui-autocomplete").css('display', 'none');
            SearchContractRec1();
        }
    });
    $('#txtSearchBoxCounterparty').keypress(function (e) {
        if (e.keyCode == 13) {
            $(".ui-autocomplete").css('display', 'none');
            CounterpartyFunc();
        }
    });

    $('#txtContractRecElement1').keypress(function (e) {
        if (e.keyCode == 13) {
            OpenSearch();
        }
    });
    //fnClearSelectedContracts();
});

function ContractRec(ElementID) {
    $('#hdConElmID').val(ElementID);
    $("#txtSearchBoxTodoForm").val("");
    $('#dvLoading').html('<img src="../../Content/Images/icon/loading.gif">');

    $('#compact-paginationContractsTodo').css('display', '');
    $('#compact-paginationDocumentsTodo').css('display', 'none');

    $("#tblDocumentsTodo").css("display", "none");
    $("#tblContractsTodo").css("display", "");
    BindContracts('');
    //if ($(ContractData).length == 0) {
    //    BindContracts(true);
    //}
    //else {
    //    BindContracts(false);
    //}
    // else {
    $("#dvContractRec").dialog("option", "title", "Search and Select Contract");


    $("#dvContractRec").dialog("open");
    $('#dvLoading').html('');
    // }
}

function fnClearSelectedContracts() {
    $.each($('#tbodyContractsTodo tr input'), function (index, value) {
        value.checked = false;
    });

    $('input:checkbox[name="Counterparty"]:checked').each(function () {
        value.checked = false;
    });
    browsedContractSel = "";
    browsedDocConSel = ""
    //$("#txtContractRecElement1").val('');
    $("#txtContractRecElement").val('');
    ContractSelected = false;

}

//function BindContracts(bindFlag) {
//    $("#loadingPage").fadeIn();
//    $("#tbodyContractsTodo").empty();
//    $("#compact-paginationContractsTodo").empty();
//    $('#theadContractsTodo').css('display', '');
//    var flag = false;
//    if ($("input:radio[name=ApprovalProcess]:checked").val() != "Document")
//        flag = true;
//    if (bindFlag) {
//        $.ajax({
//            url: '/api/accounts/' + localStorage.AccountID + '/Contracts/contractsforoutlook',
//            type: 'GET',
//            dataType: 'json',
//            'Content-Type': 'application/json',
//            cache: false,
//            headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName },
//            success: function (data) {
//                var v = $(data).length;
//                ContractData = data;
//                if (typeof (localStorage.AllContract) == "undefined") {
//                    localStorage.setItem('AllContract', JSON.stringify(ContractData));
//                }
//                else {
//                    localStorage.AllContract = JSON.stringify(ContractData);
//                }
//                var contractTags = [];
//                $(data).each(function (i, item) {
//                    var sRowKey = item.RowKey;
//                    var sContractTitle = item.ContractTitle;
//                    var sContractNumber = item.ContractNumber != null && item.ContractNumber != "" ? item.ContractNumber : "-";
//                    var sCounterparty = typeof (item.Counterparty) != "undefined" && item.Counterparty != "" ? item.Counterparty : "-";
//                    var checked = "";
//                    if ((($.inArray(item.Status, statusRequired) > -1) || (item.IsDraft == "Yes" && item.CreatedBy == localStorage.UserName)) && item.InRecycleBin != "Yes") {
//                        if (flag) {
//                            if (browsedContractSel != "" && sRowKey == browsedContractSel) {
//                                checked = "checked";
//                            }
//                        }
//                        else {
//                            if (browsedDocConSel != "" && sRowKey == browsedDocConSel) {
//                                checked = "checked";
//                            }
//                        }
//                        var article = '<tr>';
//                        article += '<td>';
//                        article += '<a id="' + sRowKey + '" href="javascript:void(0);" name="Contracts" style="margin: 0 !important;bordor: none !important;" class="linkPickerClear PreserveSpace" onclick="SelectContractRecElement(this);">';
//                        article += sContractTitle + '</a>';
//                        article += '<p id="ContractDocumentsUrl" style="display:none;">' + item.ContractDocumentsUrl + '</p>';
//                        article += '<p id="Counterparty" style="display:none;">' + item.Counterparty + '</p>';
//                        article += '<p id="BusinessAreaPath" style="display:none;">' + item.BusinessAreaPath + '</p>';
//                        article += '<p id="ContractArea" style="display:none;">' + item.ContractArea + '</p>';
//                        article += '<p id="BusinessArea" style="display:none;">' + item.BusinessArea + '</p>';
//                        article += '<p id="ContractAreaAdministrators" style="display:none;">' + item.ContractAreaAdministrators + '</p>';
//                        article += '<p id="BusinessAreaOwners" style="display:none;">' + item.BusinessAreaOwners + '</p>';
//                        article += '</td>';
//                        article += '<td>';
//                        article += sCounterparty;
//                        article += '</td>';
//                        article += '<td>';
//                        article += sContractNumber;
//                        article += '</td>';
//                        article += '</tr>';
//                        $("#tbodyContractsTodo").append(article);
//                        if (i == v - 1) {
//                        }
//                        contractTags.push(sContractTitle);
//                    }
//                });
//                //$("#txtSearchBoxTodoForm").autocomplete({
//                //    source: contractTags,
//                //    select: function (evn, uidetails) {
//                //        $("#txtSearchBoxTodoForm").val(uidetails.item.label);
//                //        SearchContractRec1();
//                //    }
//                //});
//                var vCount = $("#tbodyContractsTodo tr").length;
//                if (vCount > 10) {
//                    $('#compact-paginationContractsTodo').pagination({
//                        items: vCount,
//                        itemsOnPage: 10,
//                        type: 'tr',
//                        typeID: 'tbodyContractsTodo',
//                        row: 'td',
//                        cssStyle: 'compact-theme'
//                    });
//                }
//                $("#loadingPage").fadeOut();
//                $("#dvContractRec").dialog("option", "title", "Search / Select Contract");
//                $("#dvContractRec").dialog("open");
//                $('#dvLoading').html('');
//            },
//            error:
//                function (data) {
//                    $("#loadingPage").fadeOut();
//                }
//        });
//    }
//    else {
//        var v = $(ContractData).length;
//        var contractTags = [];
//        $(ContractData).each(function (i, item) {
//            var sRowKey = item.RowKey;
//            var sContractTitle = item.ContractTitle;
//            var sContractNumber = item.ContractNumber != null && item.ContractNumber != "" ? item.ContractNumber : "-";
//            var sCounterparty = typeof (item.Counterparty) != "undefined" && item.Counterparty != "" ? item.Counterparty : "-";
//            var checked = "";
//            if ((($.inArray(item.Status, statusRequired) > -1) || (item.IsDraft == "Yes" && item.CreatedBy == localStorage.UserName)) && item.InRecycleBin != "Yes") {
//                if (flag) {
//                    if (browsedContractSel != "" && sRowKey == browsedContractSel) {
//                        checked = "checked";
//                    }
//                }
//                else {
//                    if (browsedDocConSel != "" && sRowKey == browsedDocConSel) {
//                        checked = "checked";
//                    }
//                }
//                var article = '<tr>';
//                article += '<td>';
//                article += '<a id="' + sRowKey + '" href="javascript:void(0);" name="Contracts" style="margin: 0 !important;bordor: none !important;" class="linkPickerClear PreserveSpace" onclick="SelectContractRecElement(this);">';
//                article += sContractTitle + '</a>';
//                article += '<p id="ContractDocumentsUrl" style="display:none;">' + item.ContractDocumentsUrl + '</p>';
//                article += '<p id="Counterparty" style="display:none;">' + item.Counterparty + '</p>';
//                article += '<p id="BusinessAreaPath" style="display:none;">' + item.BusinessAreaPath + '</p>';
//                article += '<p id="ContractArea" style="display:none;">' + item.ContractArea + '</p>';
//                article += '<p id="BusinessArea" style="display:none;">' + item.BusinessArea + '</p>';
//                article += '<p id="ContractAreaAdministrators" style="display:none;">' + item.ContractAreaAdministrators + '</p>';
//                article += '<p id="BusinessAreaOwners" style="display:none;">' + item.BusinessAreaOwners + '</p>';
//                article += '</td>';
//                article += '<td>';
//                article += sCounterparty;
//                article += '</td>';
//                article += '<td>';
//                article += sContractNumber;
//                article += '</td>';
//                article += '</tr>';
//                $("#tbodyContractsTodo").append(article);
//                if (i == v - 1) {
//                }
//                contractTags.push(sContractTitle);
//            }
//        });
//        //$("#txtSearchBoxTodoForm").autocomplete({
//        //    source: contractTags,
//        //    select: function (evn, uidetails) {
//        //        $("#txtSearchBoxTodoForm").val(uidetails.item.label);
//        //        SearchContractRec1();
//        //    }
//        //});
//        var vCount = $("#tbodyContractsTodo tr").length;
//        if (vCount > 10) {
//            $('#compact-paginationContractsTodo').pagination({
//                items: vCount,
//                itemsOnPage: 10,
//                type: 'tr',
//                typeID: 'tbodyContractsTodo',
//                row: 'td',
//                cssStyle: 'compact-theme'
//            });
//        }
//        $("#loadingPage").fadeOut();
//        $("#dvContractRec").dialog("option", "title", "Search / Select Contract");
//        $("#dvContractRec").dialog("open");
//        $('#dvLoading').html('');
//    }
//}

function SearchContractRec() {
    var flag = false;
    if ($("input:radio[name=ApprovalProcess]:checked").val() != "Document")
        flag = true;
    $("#compact-paginationContractsTodo").empty();
    $("#tbodyContractsTodo").empty();
    $('#dvLoading').css("display", "");
    $('#dvLoading').html('<img src="../../Content/Images/icon/loading.gif"> Searching...');
    var vURL = '/api/accounts/' + localStorage.AccountID + '/Contracts?stage=&searchkeyword=' + encodeURIComponent($("#txtSearchBoxTodoForm").val()) + '&customquery=&sortbyfield=ContractTitle&orderby=ASC';
    $.ajax({
        url: vURL,
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName },
        cache: false,
        success: function (data) {
            $('#theadContractsTodo').css('display', '');
            $(data).each(function (i, item) {
                var sRowKey = item.RowKey;
                var sContractTitle = item.ContractTitle;

                if ($("#txtSearchBoxTodoForm").val() == "" || sContractTitle.toLowerCase().indexOf($("#txtSearchBoxTodoForm").val().toLowerCase()) >= 0) {
                    var sContractNumber = item.ContractNumber != null && item.ContractNumber != "" ? item.ContractNumber : "-";
                    var sCounterparty = typeof (item.Counterparty) != "undefined" && item.Counterparty != "" ? item.Counterparty : "-";
                    var checked = "";
                    if ((($.inArray(item.Status, statusRequired) > -1) || (item.IsDraft == "Yes" && item.CreatedBy == localStorage.UserName)) && item.InRecycleBin != "Yes") {
                        if (flag) {
                            if (browsedContractSel != "" && sRowKey == browsedContractSel) {
                                checked = "checked";
                            }
                        }
                        else {
                            if (browsedDocConSel != "" && sRowKey == browsedDocConSel) {
                                checked = "checked";
                            }
                        }
                        var article = '<tr>';
                        article += '<td>';
                        article += '<a id="' + sRowKey + '" href="javascript:void(0);" name="Contracts" style="margin: 0 !important;bordor: none !important;" class="linkPickerClear PreserveSpace" onclick="SelectContractRecElement(this);" title="' + sContractTitle + '">';
                        article += '</a>';
                        article += '<p id="ContractDocumentsUrl" style="display:none;">' + item.ContractDocumentsUrl + '</p>';
                        article += '<p id="Counterparty" style="display:none;">' + item.Counterparty + '</p>';
                        article += '<p id="BusinessAreaPath" style="display:none;">' + item.BusinessAreaPath + '</p>';
                        article += '<p id="ContractArea" style="display:none;">' + item.ContractArea + '</p>';
                        article += '<p id="BusinessArea" style="display:none;">' + item.BusinessArea + '</p>';
                        article += '<p id="ContractAreaAdministrators" style="display:none;">' + item.ContractAreaAdministrators + '</p>';
                        article += '<p id="BusinessAreaOwners" style="display:none;">' + item.BusinessAreaOwners + '</p>';
                        article += '</td>';
                        article += '<td>';
                        article += '<div title=' + '"' + sCounterparty + '"' + 'style="max-width:125px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden">' + sCounterparty + '</div>';
                        article += '</td>';
                        article += '<td>';
                        article += '<div title=' + '"' + sContractNumber + '"' + 'style="max-width:125px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden">' + sContractNumber + '</div>';
                        article += '</td>';
                        article += '</tr>';
                        $("#tbodyContractsTodo").append(article);
                        $("#" + sRowKey).html($('<div/>').text(item.ContractTitle).html());
                    }
                }


            });
            var vCount = $("#tbodyContractsTodo tr").length;

            if (vCount != 0) {
                $('#dvLoading').html('');
                if (vCount > 5) {
                    $('#compact-paginationContractsTodo').css('display', '');
                    $('#compact-paginationContractsTodo').pagination({
                        items: vCount,
                        itemsOnPage: 5,
                        type: 'tdbody',
                        typeID: 'tbodyContractsTodo',
                        row: 'tr',
                        cssStyle: 'compact-theme'
                    });
                }

            } else {
                $('#dvLoading').html('<p style="color: #565650;">No Result Found!</p>')
                $('#compact-paginationContractsTodo').css('display', 'none');
                $('#theadContractsTodo').css('display', 'none');
            }
        },
        error: function (data) {
            $('#compact-paginationContractsTodo').css('display', 'none');
            $('#dvLoading').html('<p style="color: #565650;">No Result Found!</p>')
            $('#theadContractsTodo').css('display', 'none');
        }
    });
}

function SearchContractRec1() {
    $("#compact-paginationContractsTodo").empty();
    $("#tbodyContractsTodo").empty();
    var searchText = $("#txtSearchBoxTodoForm").val();
    if (searchText != null && searchText != '') {
        $('#dvLoading').css("display", "");
        $('#dvLoading').html('<img src="../../Content/Images/icon/loading.gif"> Searching...');
        if ($(ContractData).length > 0) {
            $("#theadContractsTodo").show();
            var searchContracts = ContractData;
            searchContracts = $.grep(ContractData, function (item, i) {
                return item.ContractTitle.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
                    item.Counterparty.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
                    item.Description.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
                    item.ContractNumber.toLowerCase().indexOf(searchText.toLowerCase()) > -1
            });
            $(searchContracts).each(function (i, item) {
                var sRowKey = item.RowKey;
                var sContractTitle = item.ContractTitle;
                var sContractNumber = item.ContractNumber != null && item.ContractNumber != "" ? item.ContractNumber : "-";
                var sCounterparty = typeof (item.Counterparty) != "undefined" && item.Counterparty != "" ? item.Counterparty : "-";
                if ((($.inArray(item.Status, statusRequired) > -1) || (item.IsDraft == "Yes" && item.CreatedBy == localStorage.UserName)) && item.InRecycleBin != "Yes") {

                    var article = '<tr>';
                    article += '<td>';
                    article += '<a id="' + sRowKey + '" href="javascript:void(0);" name="Contracts" style="margin: 0 !important;bordor: none !important;" class="linkPickerClear PreserveSpace" onclick="SelectContractRecElement(this);" title="' + sContractTitle + '">';
                    article += '</a>';
                    article += '<p id="ContractDocumentsUrl" style="display:none;">' + item.ContractDocumentsUrl + '</p>';
                    article += '<p id="Counterparty" style="display:none;">' + item.Counterparty + '</p>';
                    article += '<p id="BusinessAreaPath" style="display:none;">' + item.BusinessAreaPath + '</p>';
                    article += '<p id="ContractArea" style="display:none;">' + item.ContractArea + '</p>';
                    article += '<p id="BusinessArea" style="display:none;">' + item.BusinessArea + '</p>';
                    article += '<p id="ContractAreaAdministrators" style="display:none;">' + item.ContractAreaAdministrators + '</p>';
                    article += '<p id="BusinessAreaOwners" style="display:none;">' + item.BusinessAreaOwners + '</p>';
                    article += '</td>';
                    article += '<td>';
                    article += '<div title=' + '"' + sCounterparty + '"' + 'style="max-width:125px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden">' + sCounterparty + '</div>';
                    article += '</td>';
                    article += '<td>';
                    article += '<div title=' + '"' + sContractNumber + '"' + 'style="max-width:125px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden">' + sContractNumber + '</div>';
                    article += '</td>';
                    article += '</tr>';
                    $("#tbodyContractsTodo").append(article);
                    $("#" + sRowKey).html($('<div/>').text(item.ContractTitle).html());
                }
            });
            var vCount = $("#tbodyContractsTodo tr").length;

            if (vCount != 0) {
                $('#dvLoading').html('');
                $('#compact-paginationContractsTodo').css('display', '');
                if (vCount > 5) {
                    $('#compact-paginationContractsTodo').pagination({
                        items: vCount,
                        itemsOnPage: 5,
                        type: 'tdbody',
                        typeID: 'tbodyContractsTodo',
                        row: 'tr',
                        cssStyle: 'compact-theme'
                    });
                }
            } else {
                $('#dvLoading').html('<p style="color: #565650;">No Result Found!</p>');
                $('#compact-paginationContractsTodo').css('display', 'none');
                $('#theadContractsTodo').css('display', 'none');
            }

        }
        else {
            SearchContractRec();
        }
    }
}

function SelectContractRecElement(item) {
    var vSelectedElement = null;
    vSelectedElement = $(item);
    var vElemID = $('#hdConElmID').val();

    $("#txtContractRecElement" + vElemID).val("");
    $("#txtContractRecElementID" + vElemID).val("");
    $("#txtCounterpartyCreate" + vElemID).val("");
    $("#DocumentsUrl" + vElemID).val("/Contract Documents");

    if (vSelectedElement.length > 0) {

        localStorage.selectedContract = $(vSelectedElement).text();

        ContractSelected = true;
        $("#txtContractRecElement" + vElemID).val($(vSelectedElement).text());
        $("#txtContractRecElementID" + vElemID).val($(vSelectedElement).attr("id"));
        if (vElemID != "") {
            browsedContractSel = $(vSelectedElement).attr("id");
            browsedDocConSel = "";
        }
        else {
            browsedContractSel = "";
            browsedDocConSel = $(vSelectedElement).attr("id");
        }
        $("#txtCounterpartyCreate" + vElemID).val($(vSelectedElement).parent("td").find("#Counterparty").text());
        if ($(vSelectedElement).parent("td").find("#ContractDocumentsUrl").text() != "") {
            $("#DocumentsUrl" + vElemID).val($(vSelectedElement).parent("td").find("#ContractDocumentsUrl").text());
        }
        else {
            $("#DocumentsUrl" + vElemID).val("/Contract Documents");
            $("#Folder" + vElemID).val($(vSelectedElement).val().replace(/[^a-zA-Z 0-9]+/g, ''));
        }
        $("#lblBusinessArea").val($(vSelectedElement).parent("td").find("#BusinessArea").text());
        $("#lblBusinessAreaPath").val($(vSelectedElement).parent("td").find("#BusinessAreaPath").text());
        $("#lblContractArea").val($(vSelectedElement).parent("td").find("#ContractArea").text());
        $("#lblContractAreaAdmins").val($(vSelectedElement).parent("td").find("#ContractAreaAdministrators").text());
        $("#lblBusinessAreaOwners").val($(vSelectedElement).parent("td").find("#BusinessAreaOwners").text());

        $("#imgClearSearch").css('display', '');
        $("#txtContractRecElement").prop('readonly', true);
        $("#imgOpenSearch").removeClass('left_img_68').addClass('left_img_48');
        getcontractareasettings($(vSelectedElement).parent("td").find("#ContractArea").text());
    }
    if ($("#txtContractRecElement").val() == "")
        $("#spCounterpartyCreate").css("display", "none");
    else
        $("#spCounterpartyCreate").css("display", "none");

    $(".uploadLink").css('display', '');
    $("#dvContractRec").dialog("close");
}

function SelectItem() {

    var selCon = $("#txtContractRecElement1").val();
    var contract = $.grep(ContractData, function (item, i) {
        return item.ContractTitle.toLowerCase() == selCon.toLowerCase()
    });

    if (contract.length > 0) {
        //var vElemID = $('#hdConElmID').val();
        localStorage.selectedContract = selCon;


        ContractSelected = true;
        $("#txtContractRecElementID1").val(contract[0].RowKey);
        browsedContractSel = contract[0].RowKey;
        browsedDocConSel = "";
        $("#txtCounterpartyCreate1").val(contract[0].Counterparty);
        if (contract[0].ContractDocumentsUrl != "") {
            $("#DocumentsUrl1").val(contract[0].ContractDocumentsUrl);
        }
        else {
            $("#DocumentsUrl1").val("/Contract Documents");
            //$("#Folder" + vElemID).val($(vSelectedElement).val().replace(/[^a-zA-Z 0-9]+/g, ''));
        }
        $("#lblBusinessArea").val(contract[0].BusinessArea);
        $("#lblBusinessAreaPath").val(contract[0].BusinessAreaPath);
        $("#lblContractArea").val(contract[0].ContractArea);
        $("#lblContractAreaAdmins").val(contract[0].ContractAreaAdministrators);
        $("#lblBusinessAreaOwners").val(contract[0].BusinessAreaOwners);
        getcontractareasettings(contract[0].ContractArea);
        if ($("#txtContractRecElement").val() == "")
            $("#spCounterpartyCreate").css("display", "none");
        else
            $("#spCounterpartyCreate").css("display", "none");

       
        $(".uploadLink").css('display', '');
        $("#imgClearSearch").css('display', '');
        $("#txtContractRecElement1").prop('readonly', true);
        $("#imgOpenSearch").removeClass('left_img_68').addClass('left_img_48');

    }
    $("#dvContractRec").dialog("close");
}

function txtClearSearch() {
    $(".uploadLink").css('display', 'none');
    $("#txtContractRecElement1").val('');
    ContractSelected = false;
    $("#txtContractRecElement1").prop('readonly', false);
    $("#imgOpenSearch").removeClass('left_img_48').addClass('left_img_68');
    $("#imgClearSearch").css('display', 'none');

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
    $("#hdConElmID").val("");
    $("#IsMulAttch").hide();
    fnClearSelectedContracts();
    $('#dvLoading').css("display", "none");

    $('#btnMultiDocUpload').removeClass('disable-link');
    $('#btnMultiDocUpload').css('background-color', 'rgb(68, 166, 216)');
    $('#btnMultiDocUpload').css('border', '1px solid #44A6D8');
}

function ShowAttachment() {
    $('#aAttachment').css("background-color", "#3f91cc");
    $('#aAttachment').css("color", "#ffffff");
    $('#aComputer').css("background-color", "#f0f0f0");
    $('#aComputer').css("color", "#3f91cc");
    $("#dvAttachment").css("display", "block");
    $("#dvComputer").css("display", "none");
    ClearFormComputer();
    //ClearForm();
}

function ShowComputer() {
    $('#aAttachment').css("background-color", "#f0f0f0");
    $('#aAttachment').css("color", "#3f91cc");
    $('#aComputer').css("background-color", "#3f91cc");
    $('#aComputer').css("color", "#ffffff");
    $("#dvAttachment").css("display", "none");
    $("#dvComputer").css("display", "block");
    //fnClearSelectedContracts();
    ClearFormComputer();
    //ClearForm();
}

function CounterpartyCreate() {
    $("#loadingPage").fadeIn();
    //  if ($('#tblCounterparties tr').length <= 0) {
    CounterpartyFunc();
    //} else {
    //     $("#loadingPage").fadeOut();
    //     $("#browseCounterparty").dialog("option", "title", "Counterparty Picker");
    //     $("#browseCounterparty").dialog("open");
    // }
}

function CounterpartyFunc() {

    $("#compact-paginationCounterparties").empty();
    if ($(counterpartyData).length > 0) {
        $("#tblCounterparties").empty();
        $('#loadCP').empty();
        var arr = [];
        var counterpartyTags = [];
        if ($('#txtCounterpartyCreate').val() != null) {
            $.each(browsedCounterparty, function () {
                arr.push($.trim(this));
            });
        }
        var article = "";
        //$(counterpartyData).each(function (i, item) {

        //    article += '<tr><td>';
        //    if (arr.indexOf(item.CounterpartyName) >= 0) {
        //        article += '<input id="CP' + item.RowKey + '" type="checkbox" name="Counterparty" class="css1-checkbox" checked value="' + item.CounterpartyName + '" onclick="browsedCounterpartyFun(this)" />';
        //    } else {
        //        article += '<input id="CP' + item.RowKey + '" type="checkbox" name="Counterparty" class="css1-checkbox" value="' + item.CounterpartyName + '" onclick="browsedCounterpartyFun(this)"/>';
        //    }

        //    article += '<label for="CP' + item.RowKey + '" class="css1-label">' + item.CounterpartyName + '</label> (' + item.CounterpartyType + ')';
        //    article += '</td></tr>';
        //    counterpartyTags.push(item.CounterpartyName);
        //});

        //$("#tblCounterparties").append(article);

        //$("#txtSearchBoxCounterparty").autocomplete({
        //    source: counterpartyTags,
        //    select: function (evn, uidetails) {
        //        $("#txtSearchBoxCounterparty").val(uidetails.item.label);
        //        CounterpartyFunc();
        //    }
        //});

        //var vCount = counterpartyData.length;
        //$('#compact-paginationCounterparties').pagination({
        //    items: vCount,
        //    itemsOnPage: 5,
        //    typeID: 'tblCounterparties',
        //    cssStyle: 'compact-theme'
        //});

        //manoj 
        $(counterpartyData).each(function (iArray, itemArray) {
            article += '<tr><td>';
            if (arr.length > 0) {
                if (arr.indexOf(itemArray.CounterpartyName.trim()) > -1) {
                    article += '<input id="CP' + itemArray.RowKey + '" type="checkbox" name="Counterparty" class="css1-checkbox" checked value="' + escape(itemArray.CounterpartyName) + '" onclick="browsedCounterpartyFun(this)" />';
                }
                else {
                    article += '<input id="CP' + itemArray.RowKey + '" type="checkbox" name="Counterparty" class="css1-checkbox" value="' + escape(itemArray.CounterpartyName) + '" onclick="browsedCounterpartyFun(this)"/>';
                    //checkboxchecking = false;
                }
            }
            else {
                article += '<input id="CP' + itemArray.RowKey + '" type="checkbox" name="Counterparty" class="css1-checkbox" value="' + escape(itemArray.CounterpartyName) + '" onclick="browsedCounterpartyFun(this)"/>';
                //checkboxchecking = false;
                //checkboxchecking = false;
            }
            article += '<label for="CP' + itemArray.RowKey + '" class="css1-label">' + itemArray.CounterpartyName + '</label> (' + itemArray.CounterpartyType + ')';
            article += '<td>' + itemArray.CounterpartyType + '</td>';
            article += '<td>' + itemArray.Country + '</td>';
            article += '</tr>';
            counterpartyTags.push(itemArray.CounterpartyName);
            //$('#loading').empty();
        });
        //manoj
        $("#listWrapper").html('<table id="tblCounterparties" class="f_list"></table>');
        $("#tblCounterparties").html(article);
        _alphabetSearch = '';
        $("#tblCounterparties").DataTable({
            "fnDrawCallback": function () { eventFired('Counterparty', 'selectallCounterParty'); },
            "iDisplayLength": 20,
        });
        alphabeticselection('tblCounterparties');
        article = '';
        //manoj

        $("#loadingPage").fadeOut();
        $("#browseCounterparty").dialog("option", "title", "Counterparty Picker");
        $("#browseCounterparty").dialog("open");
    }
    else {
        var vURL = '/api/accounts/' + localStorage.AccountID + '/counterparty?searchkeyword=' + encodeURIComponent($("#txtSearchBoxCounterparty").val()) + '&customquery=&sortbyfield=CounterpartyName&orderby=ASC';
        $.ajax({
            url: vURL,
            type: 'GET',
            dataType: 'json',
            "Content-Type": "application/json",
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            cache: false,
            success: function (data) {
                counterpartyData = data;
                $("#tblCounterparties").empty();
                $('#loadCP').empty();
                var arr = [];
                var counterpartyTags = [];
                if ($('#txtCounterpartyCreate').val() != null) {
                    $.each(browsedCounterparty, function () {
                        arr.push($.trim(this));
                    });
                }
                var article = "";
                //$(data).each(function (i, item) {

                //    article += '<tr><td>';
                //    if (arr.indexOf(item.CounterpartyName) >= 0) {
                //        article += '<input id="CP' + item.RowKey + '" type="checkbox" name="Counterparty" class="css1-checkbox" checked value="' + item.CounterpartyName + '" />';
                //    } else {
                //        article += '<input id="CP' + item.RowKey + '" type="checkbox" name="Counterparty" class="css1-checkbox" value="' + item.CounterpartyName + '" />';
                //    }

                //    article += '<label for="CP' + item.RowKey + '" class="css1-label">' + item.CounterpartyName + '</label> (' + item.CounterpartyType + ')';
                //    article += '</td></tr>';
                //    counterpartyTags.push(item.CounterpartyName);
                //});

                //$("#tblCounterparties").append(article);

                //$("#txtSearchBoxCounterparty").autocomplete({
                //    source: counterpartyTags,
                //    select: function (evn, uidetails) {
                //        $("#txtSearchBoxCounterparty").val(uidetails.item.label);
                //        CounterpartyFunc();
                //    }
                //});

                //var vCount = data.length;
                //$('#compact-paginationCounterparties').pagination({
                //    items: vCount,
                //    itemsOnPage: 5,
                //    typeID: 'tblCounterparties',
                //    cssStyle: 'compact-theme'
                //});
                //manoj 
                $(data).each(function (iArray, itemArray) {
                    article += '<tr><td>';
                    if (arr.length > 0) {
                        if (arr.indexOf(itemArray.CounterpartyName.trim()) > -1) {
                            article += '<input id="CP' + itemArray.RowKey + '" type="checkbox" name="Counterparty" class="css1-checkbox" checked value="' + escape(itemArray.CounterpartyName) + '" onclick="browsedCounterpartyFun(this)" />';
                        }
                        else {
                            article += '<input id="CP' + itemArray.RowKey + '" type="checkbox" name="Counterparty" class="css1-checkbox" value="' + escape(itemArray.CounterpartyName) + '" onclick="browsedCounterpartyFun(this)"/>';
                            //checkboxchecking = false;
                        }
                    }
                    else {
                        article += '<input id="CP' + itemArray.RowKey + '" type="checkbox" name="Counterparty" class="css1-checkbox" value="' + escape(itemArray.CounterpartyName) + '" onclick="browsedCounterpartyFun(this)"/>';
                        //checkboxchecking = false;
                        //checkboxchecking = false;
                    }
                    article += '<label for="CP' + itemArray.RowKey + '" class="css1-label">' + itemArray.CounterpartyName + '</label> (' + itemArray.CounterpartyType + ')';
                    article += '<td>' + itemArray.CounterpartyType + '</td>';
                    article += '<td>' + itemArray.Country + '</td>';
                    article += '</tr>';
                    counterpartyTags.push(itemArray.CounterpartyName);
                    //$('#loading').empty();
                });
                //manoj
                $("#listWrapper").html('<table id="tblCounterparties" class="f_list"></table>');
                $("#tblCounterparties").html(article);
                _alphabetSearch = '';
                $("#tblCounterparties").DataTable({
                    "fnDrawCallback": function () { eventFired('Counterparty', 'selectallCounterParty'); },
                    "iDisplayLength": 20,
                });
                alphabeticselection('tblCounterparties');
                article = '';
                //manoj
                $("#loadingPage").fadeOut();
                $("#browseCounterparty").dialog("option", "title", "Counterparty Picker");
                $("#browseCounterparty").dialog("open");
            },
            error: function () {
                $("#loadingPage").fadeOut();
                $("#browseCounterparty").dialog("option", "title", "Counterparty Picker");
                $("#browseCounterparty").dialog("open");
                $('#loadCP').empty();
                $('#loadCP').html('<p style="color: #565650;">No Result Found!</p>');
                $('#theadContractsTodo').css('display', 'none');
            }
        });
    }
}

function UploadFromComputer() {
    $("#loadingPage").fadeIn();
    if (requiredValidator('saveFormComputer', false)) {
        var formData = new FormData();
        var opmlFile = $('#docContract')[0];
        var vDocumentType = "";

        formData.append("opmlFile", opmlFile.files[0]);
        formData.append("OverWrite", "Yes");
        formData.append("AccountID", localStorage.AccountID);
        formData.append("DocumentID", '');

        ////formData.append("ContractID", $("#ddlContracts").val());
        formData.append("ContractID", $("#txtContractRecElementID").val());

        formData.append("ContractTitle", $("#txtContractRecElement").val());

        //if ($("#ddlDocumentTypeCreate").val() != "0") {
        //    vDocumentType = $("#ddlDocumentTypeCreate").val();
        //}
        //else {
        //    vDocumentType = "Others";
        //}
        formData.append("DocumentType", $("#ddlDocumentTypeCreate").val());
        formData.append("Counterparty", $("#txtCounterpartyCreate").val());

        formData.append("DocumentName", "");

        //if ($("input:radio[name=IsFinalized]:checked").val() == "Yes") {
        //    formData.append("DocumentLibraryName", "Finalized Documents");
        //} else {
        formData.append("DocumentLibraryName", "Contract Documents");
        //}

        formData.append("LocationURL", $("#DocumentsUrl").val() + "/");
        formData.append("FolderName", $("#Folder").val());
        formData.append("NewFolderName", $("#Folder").val());
        formData.append("IsFinalized", "No");

        //if ($("input:radio[name=rad_Copy]:checked").val() == "Library") {
        formData.append("DocumentLocation", "Office 365 Document Library");
        //} else {
        //    formData.append("DocumentLocation", "Office 365 Document Library & eContracts Cloud");
        //}

        formData.append("DocumentLanguage", "");
        formData.append("HardCopyPhysicalLocation", "");
        formData.append("Description", "");
        formData.append("CreatedBy", localStorage.UserName);
        formData.append("ModifiedBy", localStorage.UserName);
        formData.append("BusinessArea", $("#lblBusinessArea").val().trim());
        formData.append("BusinessAreaPath", $("#lblBusinessAreaPath").val());
        formData.append("ContractArea", $("#lblContractArea").val().trim());
        formData.append("ContractAreaAdministrators", $("#lblContractAreaAdmins").val().trim());
        formData.append("BusinessAreaOwners", $("#lblBusinessAreaOwners").val().trim());
        formData.append("ValidFrom", "");
        formData.append("ValidTill", "");
        formData.append("Reminder1", "");
        formData.append("Reminder1Condition", "");
        formData.append("Reminder2", "");
        formData.append("Reminder2Condition", "");
        formData.append("Reminder3", "");
        formData.append("Reminder3Condition", "");
        formData.append("SendReminderTo", "");
        formData.append("DocumentStatus", "New");
        formData.append("IsStandard", "No");
        formData.append("DocumentAuthor", localStorage.UserName);

        $.ajax({
            url: '/api/mailservice/attachmentsfromcomputer',
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
            processData: false,
            success: function (person) {
                //ClearFormComputer();
                $("#loadingPage").fadeOut();
                app.initialize();
                $('#notification-message').addClass('notification-success');
                $('#notification-message').removeClass('notification-error');
                app.showNotification("", "Document(s) successfully uploaded to eContracts.");
                ClearFormComputer();
                //$("#idDocUploadInProgress").css('display', 'none');
                //$('.ui-button-green-text').parent().removeAttr('disabled');
                //if ($("#ddlDocumentTemplate").attr("class").indexOf('validelement') >= 0) {
                //    alert('​​New document generation from template in progress. Please check in a few minutes.');
                //    $("#addEditDocument").dialog("close");
                //    $("#ddlDocumentTypeCreate").val("0");
                //    $("#ddlDocumentTemplate").val("0");
                //    $("#txtDocumentNameCreate").val("");
                //    $("#textDescription").val('');
                //    $('#txtFolderName').val("");
                //    $('#txtNewFolderName').val("");
                //}
                //else {
                //    alert('Document Uploaded.');
                //    location = "/Documents";
                //}
            },
            error: function (person) {
                $("#loadingPage").fadeOut();
                //$("#idDocUploadInProgress").css('display', 'none');
                //$('.ui-button-green-text').parent().removeAttr('disabled');
            },
            complete: function (data) {
                $("#loadingPage").fadeOut();
            }
        });
    }
    else {
        $("#loadingPage").fadeOut();
        app.initialize();
        $('#notification-message').removeClass('notification-success');
        $('#notification-message').addClass('notification-error');
        app.showNotification("", "Please enter required fields.");
    }
}

function ClearFormComputer() {
    $(':input', '#saveFormComputer')
  .removeAttr('checked')
  .removeAttr('selected')
  .not(':button, :submit, :reset, :hidden, :radio, :checkbox')
  .val('');
    $('select', '#saveFormComputer')
  .not(':button, :submit, :reset, :hidden, :radio, :checkbox')
  .val('0');
    $("#hdConElmID").val("");

    //$('#docContract').replaceWith($('#docContract').clone());
    $('#docContract').replaceWith($('#docContract').val('').clone(true));
    //if (typeof ($.browser) != "undefined" && $.browser.msie) {

    //    $('#docContract').replaceWith($('#docContract').clone());
    //}
    //else {
    //    $('#docContract').val('');
    //}

    fnClearSelectedContracts();
}

function MultiCheckAtt(obj) {
    if ($('input[name=MultiselectDoc]:checked').length > 0) {
        $("#IsMulAttch").show();
    }
    else {
        ClearMulAtt();
        $("#IsMulAttch").hide();
    }

}
function ClearMulAtt() {
    $("input:checkbox[name=MultiselectDoc]").each(function () {
        $(this).removeAttr('checked');
    })
    $(".DocumentTypeDDl").each(function () {
        $(this).val('0');
    })
    $("#IsMulAttch").hide();
    // fnClearSelectedContracts();
    //SelectContractRecElement();
}


function changeinupload(obj) {
    var id = obj.id;
    var filecontrol = document.getElementById(id);
    var txt = "";
    if ('files' in filecontrol) {
        if (filecontrol.files.length == 0) {
        } else {
            for (var i = 0; i < filecontrol.files.length; i++) {
                var acceptExtension = ['pdf', 'png', 'jpg', 'gif', 'bmp', 'doc', 'xls', 'ppt', 'docx', 'xlsx', 'txt', 'pptx', 'dotx', 'xps', 'rtf', 'odt', 'msg', 'dotm', 'docm', 'tif', 'tiff', 'zip', 'ZIP', 'PDF', 'PNG', 'JPG', 'GIF', 'BMP', 'DOC', 'XLS', 'PPT', 'DOCX', 'XLSX', 'TXT', 'PPTX', 'DOTX', 'XPS', 'RTF', 'ODT', 'MSG', 'DOTM', 'DOCM', 'TIF', 'TIFF', 'TIF', 'TIFF'];
                var file = filecontrol.files[i];
                var ext = file.name.split('.').pop().toString();
                if (acceptExtension.indexOf(ext.trim().toLowerCase()) > -1) {
                    if ('size' in file) {
                        if (file.size > 0) {
                            var Filelengthcol = Math.round(((file.size / 1024) / 1024) * 10) / 10;
                            if (Filelengthcol > (Math.round(parseInt(MaxRequestLength) / 1024))) {
                                app.initialize();
                                $('#notification-message').removeClass('notification-success');
                                $('#notification-message').addClass('notification-error');
                                app.showNotification("", "The maximum permissible size is " + Math.round(parseInt(MaxRequestLength) / 1024) + " MB, Please upload a file which is less than " + Math.round(parseInt(MaxRequestLength) / 1024) + " MB");
                                $("#" + id).replaceWith($("#" + id).val('').clone(true));
                                //if (typeof ($.browser) != "undefined" && $.browser.msie) {
                                //    $("#" + id).replaceWith($("#" + id).clone());
                                //}
                                //else {
                                //    $("#" + id).val('');
                                //}
                            } else {
                                if (!isSpecialCharacterFileName(file.name.substr(0, file.name.lastIndexOf('.')))) {
                                    app.initialize();

                                    $('#notification-message').removeClass('notification-success');
                                    $('#notification-message').addClass('notification-error');
                                    app.showNotification("", "Unsupported characters in file name.");
                                    $("#" + id).replaceWith($("#" + id).val('').clone(true));
                                    //if (typeof ($.browser) != "undefined" && $.browser.msie) {
                                    //    $("#" + id).replaceWith($("#" + id).clone());
                                    //}
                                    //else {
                                    //    $("#" + id).val('');
                                    //}

                                }


                            }
                        } else {
                            app.initialize();
                            $('#notification-message').removeClass('notification-success');
                            $('#notification-message').addClass('notification-error');
                            app.showNotification("", "File cannot be empty.");
                            $("#" + id).replaceWith($("#" + id).val('').clone(true));
                            //if (typeof ($.browser) != "undefined" && $.browser.msie) {
                            //    $("#" + id).replaceWith($("#" + id).clone());
                            //}
                            //else {
                            //    $("#" + id).val('');
                            //}
                        }
                    }
                }
                else {
                    app.initialize();
                    $('#notification-message').removeClass('notification-success');
                    $('#notification-message').addClass('notification-error');
                    app.showNotification("", "Only file type doc, xls, ppt, docx, xlsx, pptx, dotx and pdf are allowed.");
                    //if (typeof ($.browser) != "undefined" && $.browser.msie) {
                    $("#" + id).replaceWith($("#" + id).val('').clone(true));
                    //}
                    //else {
                    //    $("#" + id).val('');
                    //}
                }
            }
        }
    }
}

function browsedCounterpartyFun(obj) {
    //if ($(obj).is(':checked')) {
    //    var name = $(obj).val();
    //    if ($(browsedCounterparty).indexOf(name) == -1) {
    //        browsedCounterparty.push(name);
    //    }
    //}
    //else {
    //    if ($(browsedCounterparty).indexOf(name) > -1) {
    //        browsedCounterparty = jQuery.grep(browsedCounterparty, function (value) {
    //            return value != name;
    //        });
    //    }
    //}
    //manoj
    browsedCounterparty = [];
    var tablebind = $('#tblCounterparties').DataTable();
    var browsedCounterparty = "";
    $.each($('input:checkbox[name="Counterparty"]:checked', tablebind.rows().nodes()), function () {
        if (typeof ($.trim(this)) != 'undefined' && $.trim(this) != null) {
            if ($.trim(this.value) != "") {
                browsedCounterparty.push(unescape($.trim(this.value)));
            }
        }
    });
    //manoj

}
//Alphabet Search for DataTable View 
function alphabeticselection(tblname) {
    $.fn.dataTable.ext.search.push(function (settings, searchData) {
        if (!_alphabetSearch) {
            return true;
        }
        if (_alphabetSearch == "Number") {//Custom
            if (numberindex.indexOf(searchData[0].charAt(0)) > -1) {
                return true;
            }//Custom
        } else {
            if (searchData[0].charAt(0) === _alphabetSearch) {
                return true;
            }
        }

        return false;
    });

    var table = $('#' + tblname).DataTable();

    var alphabet = $('<div class="alphabet"/>').append('');

    $('<span class="clear active"/>')
        .data('letter', '')
        .html('All')
        .appendTo(alphabet);

    //Custom
    $('<span/>')
            .data('letter', 'Number')
            .html('0-9')
            .appendTo(alphabet);
    //Custom
    for (var i = 0 ; i < 26 ; i++) {
        var letter = String.fromCharCode(65 + i);

        $('<span/>')
            .data('letter', letter)
            .html(letter)
            .appendTo(alphabet);
    }

    alphabet.insertBefore(table.table().container());

    alphabet.on('click', 'span', function () {
        alphabet.find('.active').removeClass('active');
        $(this).addClass('active');

        _alphabetSearch = $(this).data('letter');
        table.draw();
    });
}

function eventFired(nameattr, objvalue) {
    if ($('input:checkbox[name="' + nameattr + '"]:checked').length == $('input:checkbox[name="' + nameattr + '"]').length && $('input:checkbox[name="' + nameattr + '"]:checked').length != 0) {
        $("#" + objvalue).attr('checked', true);
    } else {
        $("#" + objvalue).attr('checked', false);
    }
}
//Alphabet Search for DataTable Viewx

function BindContracts(stage) {
    $("#tbodyContractsTodo").empty();
    $("#compact-paginationContractsTodo").empty();
    $('#theadContractsTodo').css('display', '');
    var flag = false;
    if ($("input:radio[name=ApprovalProcess]:checked").val() != "Document")
        flag = true;
    var txtsearchboxvalue = '';
    if (stage != null && stage != '') {
        if (ContractData.length == 0) {
            txtsearchboxvalue = $("#txtContractRecElement").val();
            newurl = '/api/accounts/' + localStorage.AccountID + '/Contracts/contractsforoutlook?stage=&searchkeyword=' + encodeURIComponent(txtsearchboxvalue);
            $("#loadingPage").fadeIn();
            $.ajax({
                url: newurl,
                type: 'GET',
                dataType: 'json',
                'Content-Type': 'application/json',
                cache: false,
                headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName, BusinessAreaLocation: localStorage.GlobalBusinessAreaLocation },
                success: function (data) {
                    var arrStatus = ["Ready for Signature", "Awaiting Signatures", "Signed", "Active", "Up for Renewal", "About to Expire", "On Hold", "Replaced", "Expired", "Cancelled", "Archived"];
                    var tempData = $.grep(data, function (item, i) {
                        return (statusRequired.indexOf(item.Status) > -1 || (item.IsDraft == "Yes" && item.CreatedBy == localStorage.UserName)) && item.InRecycleBin != "Yes"
                    });
                    ContractData = tempData;
                    if (typeof (localStorage.AllContract) == "undefined") {
                        localStorage.setItem('AllContract', JSON.stringify(ContractData));
                    }
                    else {
                        localStorage.AllContract = JSON.stringify(ContractData);
                    }
                    ContractData = ContractData.sort(function (a, b) {
                        return new Date(a.Modified).getTime() - new Date(b.Modified).getTime()
                    });
                    var conTitle = $.map(ContractData, function (item, i) {
                        return item.ContractTitle
                    })
                    //conTitle = conTitle.slice(0, 30);


                    $("#txtContractRecElement1").autocomplete({
                        source: conTitle,
                        select: function (evn, uidetails) {
                            $("#txtContractRecElement1").val(uidetails.item.label);
                            ContractSelected = true;
                            SelectItem();
                        },
                        response: function (event, ui) {
                            if (ui.content.length === 0) {
                                $("#txtContractRecElement1").val('');
                            }
                        }
                    });

                    $("#loadingPage").fadeOut();
                },
                error:
                    function (data) {
                        $("#loadingPage").fadeOut();
                    }
            });
        }
        else {
            ContractData = ContractData.sort(function (a, b) {
                return new Date(a.Modified).getTime() - new Date(b.Modified).getTime()
            });
            var conTitle = $.map(ContractData, function (item, i) {
                return item.ContractTitle
            })
            //conTitle = conTitle.slice(0, 30);
          
            $("#txtContractRecElement1").autocomplete({
                source: conTitle,
                select: function (evn, uidetails) {
                    $("#txtContractRecElement1").val(uidetails.item.label);
                    ContractSelected = true;
                    SelectItem();
                },
                response: function (event, ui) {
                    if (ui.content.length === 0) {
                        $("#txtContractRecElement1").val('');
                    }
                }
            });

        }
    }
    else {
        var v = $(ContractData).length;
        $(ContractData).each(function (i, item) {
            var sRowKey = item.RowKey;
            var sContractTitle = item.ContractTitle;
            var sContractNumber = item.ContractNumber != null && item.ContractNumber != "" ? item.ContractNumber : "-";
            var sCounterparty = typeof (item.Counterparty) != "undefined" && item.Counterparty != "" ? item.Counterparty : "-";
            if ((($.inArray(item.Status, statusRequired) > -1) || (item.IsDraft == "Yes" && item.CreatedBy == localStorage.UserName)) && item.InRecycleBin != "Yes") {

                var article = '<tr>';
                article += '<td>';
                article += '<a id="' + sRowKey + '" href="javascript:void(0);" name="Contracts" style="margin: 0 !important;bordor: none !important;" class="linkPickerClear PreserveSpace" onclick="SelectContractRecElement(this);" title="' + sContractTitle + '">';
                article += '</a>';
                article += '<p id="ContractDocumentsUrl" style="display:none;">' + item.ContractDocumentsUrl + '</p>';
                article += '<p id="Counterparty" style="display:none;">' + item.Counterparty + '</p>';
                article += '<p id="BusinessAreaPath" style="display:none;">' + item.BusinessAreaPath + '</p>';
                article += '<p id="ContractArea" style="display:none;">' + item.ContractArea + '</p>';
                article += '<p id="BusinessArea" style="display:none;">' + item.BusinessArea + '</p>';
                article += '<p id="ContractAreaAdministrators" style="display:none;">' + item.ContractAreaAdministrators + '</p>';
                article += '<p id="BusinessAreaOwners" style="display:none;">' + item.BusinessAreaOwners + '</p>';
                article += '</td>';
                article += '<td>';
                article += '<div title=' + '"' + sCounterparty + '"' + 'style="max-width:125px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden">' + sCounterparty + '</div>';
                article += '</td>';
                article += '<td>';
                article += '<div title=' + '"' + sContractNumber + '"' + 'style="max-width:125px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden">' + sContractNumber + '</div>';
                article += '</td>';
                article += '</tr>';
                $("#tbodyContractsTodo").append(article);
                $("#" + sRowKey).html($('<div/>').text(item.ContractTitle).html());
                if (i == v - 1) {
                }
            }
        });

        var vCount = $("#tbodyContractsTodo tr").length;
        if (vCount > 5) {
            $('#compact-paginationContractsTodo').pagination({
                items: vCount,
                itemsOnPage: 5,
                type: 'tdbody',
                typeID: 'tbodyContractsTodo',
                row: 'tr',
                cssStyle: 'compact-theme'
            });
        }
        $('#dvLoading').html('');
    }
}

function ClearSearch() {
    $("#tbodyContractsTodo").empty();
    $("#compact-paginationContractsTodo").empty();
    $('#theadContractsTodo').css('display', 'none');
}

function OpenSearch() {
    $('#hdConElmID').val('1');
    if ($("#txtContractRecElement1").val() != '')
        $("#txtSearchBoxTodoForm").val($("#txtContractRecElement1").val());

    $('#compact-paginationContractsTodo').css('display', '');
    $('#compact-paginationDocumentsTodo').css('display', 'none');

    $("#tblDocumentsTodo").css("display", "none");
    $("#tblContractsTodo").css("display", "");
    //if ($(ContractData).length == 0) {
    //    BindContracts(true);
    //}
    //else {
    //    BindContracts(false);
    //}
    // else {
    $("#tbodyContractsTodo").empty();
    $("#compact-paginationContractsTodo").empty();
    $('#theadContractsTodo').css('display', 'none');
    $("#dvContractRec").dialog("option", "title", "Search and Select Contract");
    $("#dvContractRec").dialog("open");
    if ($("#txtSearchBoxTodoForm").val() == '')
        $('#dvLoading').html('');
    //manoj
    if ($("#txtContractRecElement1").val() != "") {
        SearchContractRec1();
    }
    //manoj
}
//manoj
function ChangeOCRDocument(obj) {
    var Row_id = $(obj).attr('id').split('_')[1];
    if ($(obj).prop('checked')) {
        $('#validImg_' + Row_id).attr('src', '../../Content/Images/warning.png');
        $('#validImg_' + Row_id).attr('title', 'This may take few minutes');
    } else {

        $('#validImg_' + Row_id).attr('src', '../../Content/Images/approved.png');
        $('#validImg_' + Row_id).attr('title', 'Document is ready for upload');
    }
    //if (obj.checked == true) {
    //    $("#dvMainContracts_" + Row_id).css("display", "none");
    //    $("#dvMainContractsOCR_" + Row_id).css("display", "");
    //} else {
    //    $("#dvMainContractsOCR_" + Row_id).css("display", "none");
    //    $("#dvMainContracts_" + Row_id).css("display", "");
    //}
}

//manoj

function validateAttachments(fileName, ext, index, size) {
    var errMsgs = "";
    var acceptExtension = ['pdf', 'png', 'jpg', 'gif', 'bmp', 'doc', 'xls', 'ppt', 'docx', 'xlsx', 'txt', 'pptx', 'dotx', 'xps', 'rtf', 'odt', 'msg', 'dotm', 'docm', 'tif', 'tiff', 'zip', 'ZIP', 'PDF', 'PNG', 'JPG', 'GIF', 'BMP', 'DOC', 'XLS', 'PPT', 'DOCX', 'XLSX', 'TXT', 'PPTX', 'DOTX', 'XPS', 'RTF', 'ODT', 'MSG', 'DOTM', 'DOCM', 'TIF', 'TIFF'];

    if (acceptExtension.indexOf(ext.trim().toLowerCase()) < 0) {
        errMsgs = 'Unsupported file format.';
    }

    if (size <= 0) {
        if (errMsgs == '') {
            errMsgs = "File cannot be empty.";
        } else {
            errMsgs += "\n " + "File cannot be empty.";
        }
    }
    if (fileName.length > 100) {
        if (errMsgs == '') {
            errMsgs = "File name is too long.";
        } else {
            errMsgs += "\n " + "File name is too long.";
        }
    }
    var Filelengthcol = parseInt(filesize(size, { exponent: 2 }).split(' ')[0]);
    if (Filelengthcol > 100) {
        if (errMsgs == '') {
            errMsgs = " File exceeds 100 MB size limit.";
        } else {
            errMsgs += "\n " + "File exceeds 100 MB size limit.";
        }
    }

    if (!isSpecialCharacterFileName(fileName.substr(0, fileName.lastIndexOf('.')))) {

        if (errMsgs == '') {
            errMsgs = "Unsupported characters in file name.";
        } else {
            errMsgs += "\n " + "Unsupported characters in file name.";
        }
    }

    //if (!isContainsThreeAlphabets(fileName.substr(0, fileName.lastIndexOf('.')))) {
    //    if (errMsgs == '') {
    //        errMsgs = "File name should contain at least 3 characters.";
    //    } else {
    //        errMsgs += "\n " + "File name should contain at least 3 characters.";
    //    }
    //}

    return errMsgs;
}

function removeAttachment(obj) {
    var id = $(obj).parent().parent().attr('id').split('_')[1];
    $('#dvuploadedto_' + id).remove();
    $(obj).parent().parent().remove();

    if ($('.docInValid').length == 0) {
        $('#btnMultiDocUpload').removeClass('disable-link');
        $('#btnMultiDocUpload').css({ 'background-color': 'rgb(68, 166, 216) !important', 'border': '1px', 'border-style': 'solid', 'border-color': '#44A6D8' });
    }


    if ($('#tblAttachments').find('tr').length == 1) {
        $('#btnMultiDocUpload').addClass('disable-link');
        $('#btnMultiDocUpload').css({ 'background-color': '#ccd2d6', 'border': '1px', 'border-style': 'solid', 'border-color': 'rgb(204, 210, 214)' });


    }
}

function showUploadedTo(obj) {
    var id = $(obj).attr('id').split('_')[1];
    $('#dvuploadedto_' + id).toggle();


    $('#tblAttachments tr').each(function (i, item) {
        if (i != id) {
            $('#dvuploadedto_' + i).hide();
        }

    });
}


function getcontractareasettings(contractareaname) {
    $("#loadingPage").fadeIn();
    $.ajax({
        url: '/api/accounts/' + localStorage.AccountID + '/businessarea/contractareadetailsbyname?contractareaname=' + encodeURIComponent(contractareaname),
        type: 'GET',
        dataType: 'json',
        async: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            $("#loadingPage").fadeOut();
            thisContractAreaSettings = data;
            BindDocumentType();
        },
        error: function (data) {
            $("#loadingPage").fadeOut();
            var vv = '';
        }
    });
}

function BindDocumentType() {
    if ($("input:radio[name=ApprovalProcess]:checked").val() != "Document") {
        $(arrDocTypeIds).each(function (j, documenttypeId) {
            if ($("#" + documenttypeId).length == 0) {
            }
            else {
                $("#" + documenttypeId).empty();
                $("#" + documenttypeId).append('<option value="0">Document Type</option>');
                $(arrDocTypes).each(function (i, item) {
                    if (typeof thisContractAreaSettings === 'undefined') {
                        $("#" + documenttypeId).append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>")
                    } else {
                        if (thisContractAreaSettings.DocumentTypes.split(';').indexOf(item.TypeName) > -1) {
                            $("#" + documenttypeId).append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>")
                        }
                    }
                });
                //$("#" + documenttypeId).append("<option value='Others'>Others</option>");
            }

        });

        $(arrDocTypeIds).each(function (j, documenttypeId) {
            if ($("#" + documenttypeId).length == 0) {
            }
            else {
                $("#" + documenttypeId + " > option").each(function () {
                    var text = $(this).text();
                    if (text.length > 25) {
                        text = text.substring(0, 24) + '...';
                        $(this).text(text);
                    }
                });
            }

        });
    }
    else {
        $("#ddlDocumentTypeCreate").empty();
        $("#ddlDocumentTypeCreate").append('<option value="0">Document Type</option>');
        $(arrDocTypes).each(function (i, item) {
            if (typeof thisContractAreaSettings === 'undefined') {
                $("#ddlDocumentTypeCreate").append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>")
            } else {
                if (thisContractAreaSettings.DocumentTypes.split(';').indexOf(item.TypeName) > -1) {
                    $("#ddlDocumentTypeCreate").append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>")
                }
            }
        });
        //$("#ddlDocumentTypeCreate").append("<option value='Others'>Others</option>");

        $("#ddlDocumentTypeCreate > option").each(function () {
            var text = $(this).text();
            if (text.length > 25) {
                text = text.substring(0, 24) + '...';
                $(this).text(text);
            }
        });
    }
}
