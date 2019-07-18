var amendmentcompletedchecking = false;
var amendmentWorkflowConflict = "";

$(document).ready(function () {
    $("#addEditAmendment").dialog({
        autoOpen: false,
        closeText: "",
        width: "80%",
        height: "700",
        title: "Amendment",
        dialogClass: "popup_width100",
        modal: true,
        buttons: [
            {
                text: "Save & Start Approval",
                "id": "btnSaveAndApproval",
                click: function () { modalOnOpenAmendmentAndStartApproval(); }
            },
            {
                text: "Save",
                click: function () { modalOnOpenAmendment(); }
            },
            {
                text: "Cancel",
                click: function () { $(this).dialog("close"); }
            }
        ],
        close: function (event, ui) {

        }
    });
});

function BindAmendments(contractid) {
    if (contractid == null || contractid == "") { contractid = vContractID; }
    $("#ulAmendment").empty();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/amendments?contractid=' + contractid,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        asyn: false,
        success: function (contactsJsonPayload) {
            var count = 0;
            $(contactsJsonPayload).each(function (i, item) {
                count++
                // if (count <= 5) {
                var vDesc = item.AmendmentDescription;
                if (vDesc == null || vDesc == '') {
                    vDesc = '';
                }

                var article = '';
                if (count <= 5)
                    article = '<li class=" margin-bottom-8 WrapText_h2">';
                else
                    article = '<li class="ShowMoreAmendments margin-bottom-8 WrapText_h2" style="display:none;">';
                article += '<label id="AmendmentID" style="display:none;">' + item.RowKey + '</label>';
                article += '<label id="AmendmentTitle" style="display:none;">' + item.AmendmentTitle + '</label>';
                article += '<label id="AmendmentApprovalWorkflow" style="display:none;">' + item.ApprovalWorkflow + '</label>';
                article += '<a href="javascript:void(0)" onclick="ViewAmendment(\'' + item.RowKey + '\')">' + item.AmendmentTitle + '</a>';
                article += '<span class="sub-text"> ' + vDesc + '</span>';
                article += '&nbsp;<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuAmendment"/>';
                article += '</li>';
                $("#ulAmendment").append(article);

                // }
            });

            if (count > 5) {
                var more = count - 5;
                $("#dvAmendment").html('<a id="ShowMoreAmendments" href="javascript:void(0);" class="pad-all close1" onclick="ShowMoreAmendments()">' + more + ' More Amendments </a>' +
                                          '<a id="ShowLessAmendments" href="javascript:void(0);" class="pad-all close1" onclick="ShowLessAmendments()" style="display:none;">Show less</a>');
            }

            $("#lblAmendmentsCount").text(count);
            if (count == 0) {
                $("#ulAmendment").append('No items found.');
            }
            $(".openmenuAmendment").contextMenu({ menu: 'dropdownMenuAmendmentRecord', leftButton: true }, function (action, el, pos) { contextMenuAmendment(action, el.parent("li"), pos); });

        },
        error: function (request) {
            $("#lblAmendmentsCount").text('0');
            $("#ulAmendment").append('No items found.');
        }
    });
}

function ShowMoreAmendments() {
    $('.ShowMoreAmendments').css("display", "");
    $('#ShowMoreAmendments').css("display", "none");
    $('#ShowLessAmendments').css("display", "");
}

function ShowLessAmendments() {
    $('.ShowMoreAmendments').css("display", "none");
    $('#ShowMoreAmendments').css("display", "");
    $('#ShowLessAmendments').css("display", "none");
}

function addAmendment() {
    $("#btnAddAmendment").click();
    //manoj
    $("#dtAmendmentFinalizedDate").keypress(function (event) { event.preventDefault(); });
    $("#dtAmendmentEffectiveDate").keypress(function (event) { event.preventDefault(); });
    //manoj
}

function amendmentcompleted(obj) {
    if (obj.value == "Yes") {
        $("#dtAmendmentFinalizedDate").addClass("validelement");
        $('#trAmendmentCompletedDate').css('display', 'table-row');
        $('#trAmendmentCompletedBy').css('display', 'table-row');
        $('#trAmendmentEffectiveDate').css('display', 'table-row');
    } else {
        $("#dtAmendmentFinalizedDate").removeClass("validelement");
        $('#trAmendmentEffectiveDate').css('display', 'none');
        $('#trAmendmentCompletedDate').css('display', 'none');
        $('#trAmendmentCompletedBy').css('display', 'none');
        $("#txtAmendmentFinalizedBy").val('');
        $("#dtAmendmentEffectiveDate").val('');
        $("#dtAmendmentFinalizedDate").val('');
    }
}

function modalOnOpenAmendment(dialog) {
    var fAmendmentEffectiveDate = '';
    if ($("#dtAmendmentEffectiveDate").val() != "" && $("#dtAmendmentEffectiveDate").val() != null) {
        fAmendmentEffectiveDate = $.datepicker.formatDate('mm/dd/yy', $("#dtAmendmentEffectiveDate").datepicker('getDate'));
    }
    var fContractEndDateAfterAmend = '';
    if ($("#txtContractEndDateAfterAmend").val() != "" && $("#txtContractEndDateAfterAmend").val() != null) {
        fContractEndDateAfterAmend = $.datepicker.formatDate('mm/dd/yy', $("#txtContractEndDateAfterAmend").datepicker('getDate'));
    }
    var fAmendmentCompletedDate = '';
    if ($("#dtAmendmentFinalizedDate").val() != "" && $("#dtAmendmentFinalizedDate").val() != null) {
        fAmendmentCompletedDate = $.datepicker.formatDate('mm/dd/yy', $("#dtAmendmentFinalizedDate").datepicker('getDate'));
    }
    var fContractEndDateCurrentAmend = '';
    if ($("#txtContractEndDateCurrent").val() != "" && $("#txtContractEndDateCurrent").val() != null) {
        fContractEndDateCurrentAmend = $.datepicker.formatDate('mm/dd/yy', $("#txtContractEndDateCurrent").datepicker('getDate'));
    }

    var completeddate = fAmendmentCompletedDate != '' ? new Date(fAmendmentCompletedDate) : "";
    var effectivedate = fAmendmentEffectiveDate != '' ? new Date(fAmendmentEffectiveDate) : "";
    var currentdate = new Date(moment());
    var EndDateAfterAmend = fContractEndDateAfterAmend != '' ? new Date(fContractEndDateAfterAmend) : "";
    if (EndDateAfterAmend != "" && currentdate != "" && EndDateAfterAmend < currentdate) {
        swal({
            title: '',
            text: "Contract Record End Date(After Amendment) cannot be less than Today's Date",
            type: 'warning',
            showCancelButton: false,
            confirmButtonText: 'OK',
            html: true
        },
       function (confirmed) {
           if (confirmed) {
               $("#loadingPage").fadeOut();
           }
       });
        return;
    }
    else if (completeddate != "" && effectivedate != "" && completeddate > effectivedate) {
        if (completeddate > currentdate) {
            swal({
                title: '',
                text: "Amendment Finalized Date cannot be greater than Today's Date",
                type: 'warning',
                showCancelButton: false,
                confirmButtonText: 'OK',
                html: true
            },
           function (confirmed) {
               if (confirmed) {
                   $("#loadingPage").fadeOut();

               }
           });
            return;
        }
        //else if (completeddate > effectivedate) {
        //    swal({
        //        title: '',
        //        text: "Amendment Finalized Date cannot be greater than Effective Date",
        //        type: 'warning',
        //        showCancelButton: false,
        //        confirmButtonText: 'OK',
        //        html: true
        //    },
        //  function (confirmed) {
        //      if (confirmed) {
        //          $("#loadingPage").fadeOut();

        //      }
        //  });
        //    return;
        //}
    }
    $('.ui-button-green-text').parent().attr('disabled', 'disabled');
    var urlOfAttachedDoc = getUrlOfAttachedDoc();
    var isformvalid = false;
    if (requiredValidator('addNewAmendment')) {
        $("#loadingPage").fadeIn();
        isformvalid = true;
        var strContractID = getParameterByName('ContractID');
        var AmendmentID = $("#txtAmendmentID").val()
        if (AmendmentID != "") {
            if (!CheckAmendmentTitle(AmendmentID, $("#txtAmendmentTitle").val())) {
                var effectivedate = ($("#dtAmendmentEffectiveDate").val() != "") ? false : true;
                if (!effectivedate) {
                    effectivedate = CheckAmendmentEffectivedate(AmendmentID, $("#ddlAmendmentType").val());
                } else {
                    effectivedate = false;
                }
                if (!effectivedate) {
                    var formData = new FormData();
                    var opmlFile = $('#docAmendment')[0];

                    formData.append("opmlFile", opmlFile.files[0]);
                    var totalFileCount = $("#inTD").children("div").length

                    for (var i = 1; i < totalFileCount + 1; i++) {

                        var filename = '#file' + i;
                        formData.append("opmlFile" + i, $(filename)[0].files[0]);

                    }
                    formData.append("UrlOfAttachedDoc", urlOfAttachedDoc);
                    formData.append("AmendmentID", AmendmentID);
                    formData.append("ContractID", getParameterByName('ContractID'));
                    formData.append("ContractTitle", $("#lblCTitleAmend").text());
                    formData.append("AmendmentTitle", $("#txtAmendmentTitle").val())
                    formData.append("AmendmentType", $("#ddlAmendmentType").val());
                    formData.append("AmendmentDescription", $("#txtAmendmentDesc").val());
                    formData.append("OriginatingCompany", "OriginatingCompany");
                    formData.append("AccountID", localStorage.AccountID);
                    formData.append("ModifiedBy", localStorage.UserName);

                    formData.append("LocationURL", $('#lblFolderUrlAmend').text())
                    formData.append("FolderName", $('#txtNewFolderNameAmend').val().replace(/[\*\|\,\"\:\<\>\[\}\{\}\'\(\)\&\#\%\.\-\!]/g, '').replace(/\//g, '').replace(/\s\s+/g, " ").trim())
                    formData.append("NewFolderName", $('#txtNewFolderNameAmend').val().replace(/[\*\|\,\"\:\<\>\[\}\{\}\'\(\)\&\#\%\.\-\!]/g, '').replace(/\//g, '').replace(/\s\s+/g, " ").trim())

                    if ($("#txtBusinessArea").val() != "") {
                        formData.append("BusinessArea", $("#txtBusinessArea").val().trim());
                    } else {
                        formData.append("BusinessArea", $("#lblBusinessArea").text().trim());
                    }
                    formData.append("BusinessAreaPath", $("#lblBusinessAreaPath").text());
                    formData.append("ContractArea", $("#lblContractArea").text().trim());
                    formData.append("ContractAreaAdministrators", $("#lblContractAreaAdmins").text().trim());
                    formData.append("BusinessAreaOwners", $("#lblBusinessAreaOwners").text().trim());

                    var RequestedByToArr = $("#ddlRequestedBy").val();
                    var vRequestedBy = '';
                    $(RequestedByToArr).each(function (i, item) {
                        if (vRequestedBy == '') {
                            vRequestedBy = item;
                        }
                        else {
                            vRequestedBy += "; " + item;
                        }
                    });
                    formData.append("RequestedBy", vRequestedBy);

                    //var vAmendmentCompleted = $('input[type="radio"][name=AmendmentCompleted]:checked').val();
                    //if (vAmendmentCompleted == "Yes") {
                    //    amendmentcompletedchecking = true;
                    //}
                    //else {
                    //    amendmentcompletedchecking = false;
                    //}
                    //formData.append("AmendmentCompleted", vAmendmentCompleted);
                    //formData.append("AmendmentCompletedDate", (vAmendmentCompleted == "Yes") ? fAmendmentCompletedDate : '');

                    var vAmendmentCompleted = $('input[type="radio"][name=AmendmentFinalized]:checked').val();
                    if (vAmendmentCompleted == "Yes") {
                        if (fAmendmentEffectiveDate == '')
                            amendmentcompletedchecking = true;
                        else {
                            if (vAmendmentCompleted)
                                amendmentcompletedchecking = true;
                            else
                                amendmentcompletedchecking = false;
                        }
                    }
                    else {
                        amendmentcompletedchecking = false;
                    }
                    formData.append("AmendmentFinalized", vAmendmentCompleted);
                    formData.append("AmendmentFinalizedDate", (vAmendmentCompleted == "Yes") ? fAmendmentCompletedDate : '');
                    formData.append("AmendmentFinalizedBy", (vAmendmentCompleted == "Yes") ? $("#txtAmendmentFinalizedBy").val() : '');

                    formData.append("EffectiveDate", fAmendmentEffectiveDate);

                    if ($("#chkContractValidity").is(":checked")) {
                        formData.append("IsContractValidityEnabled", "Yes");
                        formData.append("ContractEndDateAfterAmendment", fContractEndDateAfterAmend);
                        if ($("#chkUpdateContractValidity").is(":checked")) {
                            formData.append("UpdateContractEndDate", "Yes");
                        } else {
                            formData.append("UpdateContractEndDate", "No");
                        }
                        formData.append("ContractValidityNotes", $("#txtContractValidityNotes").val());
                    } else {
                        formData.append("IsContractValidityEnabled", "No");
                        formData.append("ContractEndDateAfterAmendment", "");
                        formData.append("UpdateContractEndDate", "No");
                        formData.append("ContractValidityNotes", "");
                    }
                    if ($("#chkContractValue").is(":checked")) {
                        formData.append("IsContractValueEnabled", "Yes");
                        formData.append("FunderOrAccountName", $("#txtFunderName").val());
                        formData.append("FunderOrAccountNumber", $("#txtFunderNumber").val());
                        formData.append("ContractValueAfterAmendment", $("#txtContractValueAfterAmend").autoNumeric('get'));
                        if (vAmendmentCompleted == "Yes") {
                            formData.append("UpdateContractValue", "Yes");
                        } else {
                            formData.append("UpdateContractValue", "No");
                        }
                        formData.append("ContractValueNotes", $("#txtContractValueNotes").val());
                    } else {
                        formData.append("IsContractValueEnabled", "NO");
                        formData.append("FunderOrAccountName", "");
                        formData.append("FunderOrAccountNumber", "");
                        formData.append("ContractValueAfterAmendment", "");
                        formData.append("UpdateContractValue", "No");
                        formData.append("ContractValueNotes", "");
                    }

                    if ($("#chkSOW").is(":checked")) {
                        formData.append("IsSOWEnabled", "Yes");
                        formData.append("SummaryOfSOWAfterAmendment", $("#txtSOWAfter").val());

                    } else {
                        formData.append("IsSOWEnabled", "No");
                        formData.append("SummaryOfSOWAfterAmendment", "");
                    }
                    if (CheckAmendmentDocumentExist()) {
                        //if document exists as confirmation to overwrite
                        swal({
                            title: '',
                            text: ExitDocuemntName + " already exists, do you want to overwrite the existing document?",
                            type: 'warning',
                            showCancelButton: true,
                            confirmButtonText: 'Yes',
                            cancelButtonText: 'No',
                            html: true
                        },
              function (confirmed) {
                  if (confirmed) {
                      if ($("#chkReplaceDoc").is(":checked")) {
                          formData.append("ReplaceDocument", "Yes");
                          formData.append("AmendmentidtoPass", AmendmentidtoPass);
                      } else {
                          formData.append("ReplaceDocument", "Yes");
                          formData.append("AmendmentidtoPass", AmendmentidtoPass);
                      }

                      $.ajax({
                          url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/amendments?amendmentid=' + AmendmentID,
                          type: 'PUT',
                          data: formData,
                          cache: false,
                          contentType: false,
                          headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName, 'RefreshToken': localStorage.RefreshToken },
                          processData: false,
                          success: function (person) {
                              $('.ui-button-green-text').parent().removeAttr('disabled');
                              BindAmendments();
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
                              amendmentsucessbinding();
                              //manoj
                              $("#addEditAmendment").dialog("close");
                          },
                          complete: function () {
                              if ($('#txtNewFolderNameAmend').val() != "" && document.getElementById('txtNewFolderNameAmend').style.display != 'none') {
                                  var checkingtestamd = $('#lblFolderUrlAmend').text();
                                  $('#lblFolderUrlAmend').text(((checkingtestamd.substr(checkingtestamd.length - 1)) != "/") ? checkingtestamd + "/" + $('#txtNewFolderNameAmend').val() + "/" : checkingtestamd + $('#txtNewFolderNameAmend').val() + "/");
                                  $("#hdnContractDocumentsUrl").text(((checkingtestamd.substr(checkingtestamd.length - 1)) != "/") ? checkingtestamd + "/" : checkingtestamd);
                                  $("#hdnContractDocumentsUrlFixed").text($("#hdnContractDocumentsUrl").text());
                                  $('#txtNewFolderNameAmend').css('display', 'none');
                                  $('#txtNewFolderNameAmend').val("");
                                  $('#txtNewFolderNameAmend').removeClass('validelement');
                                  if (contractItem != null) {
                                      if (contractItem.AmendmentDocumentsUrl == null || contractItem.AmendmentDocumentsUrl == "") {
                                          if ($('#lblFolderUrlAmend').text().indexOf("/Amendments/") >= 0) {
                                              contractItem.AmendmentDocumentsUrl = $('#lblFolderUrlAmend').text();
                                          }
                                      }
                                  }
                              }
                              clearTimeout(cleartimevalue2);
                              cleartimevalue2 = setTimeout(refreshContractActivities, 10000);
                              //GetContractActivities(vContractID);
                              $("#loadingPage").fadeOut();
                          }
                      });
                  }
                  else {
                      $('.ui-button-green-text').parent().removeAttr('disabled');
                      $("#loadingPage").fadeOut();
                  }
                  return;
              });
                    } else {
                        if ($("#chkReplaceDoc").is(":checked")) {
                            formData.append("ReplaceDocument", "Yes");
                            formData.append("AmendmentidtoPass", AmendmentidtoPass);
                        } else {
                            formData.append("ReplaceDocument", "No");
                        }
                        $.ajax({
                            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/amendments?amendmentid=' + AmendmentID,
                            type: 'PUT',
                            data: formData,
                            cache: false,
                            contentType: false,
                            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName, 'RefreshToken': localStorage.RefreshToken },
                            processData: false,
                            success: function (person) {
                                $('.ui-button-green-text').parent().removeAttr('disabled');
                                BindAmendments();
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
                                amendmentsucessbinding();
                                $("#addEditAmendment").dialog("close");
                            },
                            complete: function () {
                                if ($('#txtNewFolderNameAmend').val() != "" && document.getElementById('txtNewFolderNameAmend').style.display != 'none') {
                                    var checkingtestamd = $('#lblFolderUrlAmend').text();
                                    $('#lblFolderUrlAmend').text(((checkingtestamd.substr(checkingtestamd.length - 1)) != "/") ? checkingtestamd + "/" + $('#txtNewFolderNameAmend').val() + "/" : checkingtestamd + $('#txtNewFolderNameAmend').val() + "/");
                                    $("#hdnContractDocumentsUrl").text(((checkingtestamd.substr(checkingtestamd.length - 1)) != "/") ? checkingtestamd + "/" : checkingtestamd);
                                    $("#hdnContractDocumentsUrlFixed").text($("#hdnContractDocumentsUrl").text());
                                    $('#txtNewFolderNameAmend').css('display', 'none');
                                    $('#txtNewFolderNameAmend').val("");
                                    $('#txtNewFolderNameAmend').removeClass('validelement');
                                    if (contractItem != null) {
                                        if (contractItem.AmendmentDocumentsUrl == null || contractItem.AmendmentDocumentsUrl == "") {
                                            if ($('#lblFolderUrlAmend').text().indexOf("/Amendments/") >= 0) {
                                                contractItem.AmendmentDocumentsUrl = $('#lblFolderUrlAmend').text();
                                            }
                                        }
                                    }
                                }
                                clearTimeout(cleartimevalue2);
                                cleartimevalue2 = setTimeout(refreshContractActivities, 10000);
                                //GetContractActivities(vContractID);
                                $("#loadingPage").fadeOut();
                            }
                        });
                    }

                } else {
                    var effectivedateamdvalue;
                    if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                    { effectivedateamdvalue = $.datepicker.formatDate('mm/dd/yy', $("#dtAmendmentEffectiveDate").datepicker('getDate')); }
                    else {
                        if (localStorage.AppDateFormat == "MM/DD/YYYY")
                            effectivedateamdvalue = $.datepicker.formatDate('mm/dd/yy', $("#dtAmendmentEffectiveDate").datepicker('getDate'));
                        else
                            effectivedateamdvalue = $.datepicker.formatDate('dd/mm/yy', $("#dtAmendmentEffectiveDate").datepicker('getDate'));
                    }
                    swal("", "Amendment record exists with the effective date '<span style=\"font-weight:700\">" + effectivedateamdvalue + "</span>'");
                    $("#loadingPage").fadeOut();
                }
            } else {
                swal("", "Amendment record exists with the title '<span style=\"font-weight:700\">" + $("#txtAmendmentTitle").val() + "</span>'");
                $("#loadingPage").fadeOut();
                $("#txtAmendmentTitle").focus();
            }
        }
        else {
            if (!CheckAmendmentTitle(AmendmentID, $("#txtAmendmentTitle").val())) {
                var effectivedate = ($("#dtAmendmentEffectiveDate").val() != "") ? false : true;
                if (!effectivedate) {
                    effectivedate = CheckAmendmentEffectivedate(AmendmentID, $("#ddlAmendmentType").val());
                } else {
                    effectivedate = false;
                }
                if (!effectivedate) {
                    var formData1 = new FormData();
                    var opmlFile = $('#docAmendment')[0];

                    formData1.append("opmlFile", opmlFile.files[0]);
                    var totalFileCount = $("#inTD").children("div").length
                    for (var i = 1; i < totalFileCount + 1; i++) {
                        var filename = '#file' + i;
                        formData1.append("opmlFile" + i, $(filename)[0].files[0]);
                    }
                    formData1.append("AccountID", localStorage.AccountID);
                    formData1.append("AmendmentID", AmendmentID);
                    formData1.append("ContractID", getParameterByName('ContractID'));
                    formData1.append("ContractTitle", $("#lblCTitleAmend").text());
                    formData1.append("AmendmentTitle", $("#txtAmendmentTitle").val())
                    formData1.append("AmendmentType", $("#ddlAmendmentType").val());
                    formData1.append("AmendmentDescription", $("#txtAmendmentDesc").val());
                    formData1.append("OriginatingCompany", "OriginatingCompany");
                    formData1.append("CreatedBy", localStorage.UserName);
                    formData1.append("ModifiedBy", localStorage.UserName);

                    formData1.append("LocationURL", $('#lblFolderUrlAmend').text())
                    formData1.append("FolderName", $('#txtNewFolderNameAmend').val().replace(/[\*\|\,\"\:\<\>\[\}\{\}\'\(\)\&\#\%\.\-\!]/g, '').replace(/\//g, '').replace(/\s\s+/g, " ").trim())
                    formData1.append("NewFolderName", $('#txtNewFolderNameAmend').val().replace(/[\*\|\,\"\:\<\>\[\}\{\}\'\(\)\&\#\%\.\-\!]/g, '').replace(/\//g, '').replace(/\s\s+/g, " ").trim())

                    if ($("#txtBusinessArea").val() != "") {
                        formData1.append("BusinessArea", $("#txtBusinessArea").val().trim());
                    } else {
                        formData1.append("BusinessArea", $("#lblBusinessArea").text().trim());
                    }
                    formData1.append("BusinessAreaPath", $("#lblBusinessAreaPath").text());
                    formData1.append("ContractArea", $("#lblContractArea").text().trim());
                    formData1.append("ContractAreaAdministrators", $("#lblContractAreaAdmins").text().trim());
                    formData1.append("BusinessAreaOwners", $("#lblBusinessAreaOwners").text().trim());

                    var RequestedByToArr = $("#ddlRequestedBy").val();
                    var vRequestedBy = '';
                    $(RequestedByToArr).each(function (i, item) {
                        if (vRequestedBy == '') {
                            vRequestedBy = item;
                        }
                        else {
                            vRequestedBy += "; " + item;
                        }
                    });
                    formData1.append("RequestedBy", vRequestedBy);
                    //var vAmendmentCompleted = $('input[type="radio"][name=AmendmentCompleted]:checked').val();
                    //if (vAmendmentCompleted == "Yes") {
                    //    amendmentcompletedchecking = true;
                    //}
                    //else {
                    //    amendmentcompletedchecking = false;
                    //}
                    //formData1.append("AmendmentCompleted", vAmendmentCompleted);
                    //formData1.append("AmendmentCompletedDate", (vAmendmentCompleted == "Yes") ? fAmendmentCompletedDate : '');
                    var vAmendmentCompleted = $('input[type="radio"][name=AmendmentFinalized]:checked').val();
                    if (vAmendmentCompleted == "Yes") {
                        if (fAmendmentEffectiveDate == '')
                            amendmentcompletedchecking = true;
                        else {
                            if (vAmendmentCompleted)
                                amendmentcompletedchecking = true;
                            else
                                amendmentcompletedchecking = false;
                        }
                    }
                    else {
                        amendmentcompletedchecking = false;
                    }
                    formData1.append("AmendmentFinalized", vAmendmentCompleted);
                    formData1.append("AmendmentFinalizedDate", (vAmendmentCompleted == "Yes") ? fAmendmentCompletedDate : '');
                    formData1.append("AmendmentFinalizedBy", (vAmendmentCompleted == "Yes") ? $("#txtAmendmentFinalizedBy").val() : '');

                    formData1.append("EffectiveDate", fAmendmentEffectiveDate);

                    if ($("#chkContractValidity").is(":checked")) {
                        formData1.append("IsContractValidityEnabled", "Yes");
                        formData1.append("ContractEndDateAfterAmendment", fContractEndDateAfterAmend);
                        if ($("#chkUpdateContractValidity").is(":checked")) {
                            formData1.append("UpdateContractEndDate", "Yes");
                        } else {
                            formData1.append("UpdateContractEndDate", "No");
                        }
                        formData1.append("ContractValidityNotes", $("#txtContractValidityNotes").val());
                    } else {
                        formData1.append("IsContractValidityEnabled", "No");
                        formData1.append("ContractEndDateAfterAmendment", "");
                        formData1.append("UpdateContractEndDate", "No");
                        formData1.append("ContractValidityNotes", "");
                    }

                    if ($("#chkContractValue").is(":checked")) {
                        formData1.append("IsContractValueEnabled", "Yes");
                        formData1.append("FunderOrAccountName", $("#txtFunderName").val());
                        formData1.append("FunderOrAccountNumber", $("#txtFunderNumber").val());
                        formData1.append("ContractValueAfterAmendment", $("#txtContractValueAfterAmend").autoNumeric('get'));
                        if (vAmendmentCompleted == "Yes") {
                            formData1.append("UpdateContractValue", "Yes");
                        } else {
                            formData1.append("UpdateContractValue", "No");
                        }
                        formData1.append("ContractValueNotes", $("#txtContractValueNotes").val());
                    } else {
                        formData1.append("IsContractValueEnabled", "No");
                        formData1.append("FunderOrAccountName", "");
                        formData1.append("FunderOrAccountNumber", "");
                        formData1.append("ContractValueAfterAmendment", "");
                        formData1.append("UpdateContractValue", "No");
                        formData1.append("ContractValueNotes", "");
                    }

                    if ($("#chkSOW").is(":checked")) {
                        formData1.append("IsSOWEnabled", "Yes");
                        formData1.append("SummaryOfSOWAfterAmendment", $("#txtSOWAfter").val());

                    } else {
                        formData1.append("IsSOWEnabled", "No");
                        formData1.append("SummaryOfSOWAfterAmendment", "");
                    }

                    if (CheckAmendmentDocumentExist()) {
                        //if document exists as confirmation to overwrite
                        swal({
                            title: '',
                            text: ExitDocuemntName + " already exists, do you want to overwrite the existing document?",
                            type: 'warning',
                            showCancelButton: true,
                            confirmButtonText: 'Yes',
                            cancelButtonText: 'No',
                            html: true
                        },
              function (confirmed) {
                  if (confirmed) {
                      if ($("#chkReplaceDoc").is(":checked")) {
                          formData1.append("IsSOWEnabled", "Yes");
                          formData1.append("ReplaceDocument", "Yes");
                          formData1.append("AmendmentidtoPass", AmendmentidtoPass);
                      } else {
                          formData1.append("IsSOWEnabled", "No");
                          formData1.append("ReplaceDocument", "Yes");
                          formData1.append("AmendmentidtoPass", AmendmentidtoPass);
                      }

                      $.ajax({
                          url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/amendments/addwithdoc',
                          type: 'POST',
                          data: formData1,
                          cache: false,
                          contentType: false,
                          headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName, 'RefreshToken': localStorage.RefreshToken },
                          processData: false,
                          success: function (person) {
                              $('.ui-button-green-text').parent().removeAttr('disabled');
                              $("#addEditAmendment").dialog("close");
                              BindAmendments();
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
                              amendmentsucessbinding();
                          },
                          complete: function (person) {
                              if ($('#txtNewFolderNameAmend').val() != "") {
                                  var checkingtestamd = $('#lblFolderUrlAmend').text();
                                  var lastCharcheckingamd = checkingtestamd.slice(-1);
                                  if (lastCharcheckingamd == "/") {
                                      $('#lblFolderUrlAmend').text(checkingtestamd + $('#txtNewFolderNameAmend').val() + "/");
                                      $("#hdnContractDocumentsUrl").text(checkingtestamd);
                                      $("#hdnContractDocumentsUrlFixed").text($("#hdnContractDocumentsUrl").text());
                                      $('#txtNewFolderNameAmend').css('display', 'none');
                                      $('#txtNewFolderNameAmend').val("");
                                  } else {
                                      $('#lblFolderUrlAmend').text(checkingtestamd + "/" + $('#txtNewFolderNameAmend').val() + "/");
                                      $("#hdnContractDocumentsUrl").text(checkingtestamd + "/");
                                      $("#hdnContractDocumentsUrlFixed").text($("#hdnContractDocumentsUrl").text());
                                      $('#txtNewFolderNameAmend').css('display', 'none');
                                      $('#txtNewFolderNameAmend').val("");
                                  }
                                  //manoj
                                  if (contractItem != null) {
                                      if (contractItem.AmendmentDocumentsUrl == null || contractItem.AmendmentDocumentsUrl == "") {
                                          if ($('#lblFolderUrlAmend').text().indexOf("/Amendments/") >= 0) {
                                              contractItem.AmendmentDocumentsUrl = $('#lblFolderUrlAmend').text();
                                          }
                                      }
                                  }
                                  //manoj
                                  $('#txtNewFolderNameAmend').removeClass('validelement');
                              }
                              if ($('#dvAmendmentMsg').css('display') != 'none') {
                                  GetContractActivities(vContractID);
                              }
                              clearTimeout(cleartimevalue2);
                              cleartimevalue2 = setTimeout(refreshContractActivities, 10000);
                              //GetContractActivities(vContractID);
                              $("#loadingPage").fadeOut();
                          },
                          error: function (person) {
                              $("#loadingPage").fadeOut();
                          }
                      });
                  }
                  else {
                      $('.ui-button-green-text').parent().removeAttr('disabled');
                      $("#loadingPage").fadeOut();
                  }
                  return;
              });

                    } else {
                        if ($("#chkReplaceDoc").is(":checked")) {
                            formData1.append("IsSOWEnabled", "Yes");
                            formData1.append("ReplaceDocument", "Yes");
                            formData1.append("AmendmentidtoPass", AmendmentidtoPass);
                        } else {
                            formData1.append("IsSOWEnabled", "No");
                            formData1.append("ReplaceDocument", "No");
                        }
                        $.ajax({
                            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/amendments/addwithdoc',
                            type: 'POST',
                            data: formData1,
                            cache: false,
                            contentType: false,
                            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName, 'RefreshToken': localStorage.RefreshToken },
                            processData: false,
                            success: function (person) {
                                $('.ui-button-green-text').parent().removeAttr('disabled');
                                $("#addEditAmendment").dialog("close");
                                $("#loadingPage").fadeOut();
                                BindAmendments();
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
                                amendmentsucessbinding();
                                //manoj
                            },
                            complete: function (person) {
                                if ($('#txtNewFolderNameAmend').val() != "") {
                                    var checkingtestamd = $('#lblFolderUrlAmend').text();
                                    var lastCharcheckingamd = checkingtestamd.slice(-1);
                                    if (lastCharcheckingamd == "/") {
                                        $('#lblFolderUrlAmend').text(checkingtestamd + $('#txtNewFolderNameAmend').val() + "/");
                                        $("#hdnContractDocumentsUrl").text(checkingtestamd);
                                        $('#txtNewFolderNameAmend').css('display', 'none');
                                        $('#txtNewFolderNameAmend').val("");
                                    } else {
                                        $('#lblFolderUrlAmend').text(checkingtestamd + "/" + $('#txtNewFolderNameAmend').val() + "/");
                                        $("#hdnContractDocumentsUrl").text(checkingtestamd + "/");
                                        $('#txtNewFolderNameAmend').css('display', 'none');
                                        $('#txtNewFolderNameAmend').val("");
                                    }
                                    //manoj
                                    if (contractItem != null) {
                                        if (contractItem.AmendmentDocumentsUrl == null || contractItem.AmendmentDocumentsUrl == "") {
                                            if ($('#lblFolderUrlAmend').text().indexOf("/Amendments/") >= 0) {
                                                contractItem.AmendmentDocumentsUrl = $('#lblFolderUrlAmend').text();
                                            }
                                        }
                                    }
                                    //manoj
                                    $('#txtNewFolderNameAmend').removeClass('validelement');
                                }
                                if ($('#dvAmendmentMsg').css('display') != 'none') {
                                    GetContractActivities(vContractID);
                                }
                                clearTimeout(cleartimevalue2);
                                cleartimevalue2 = setTimeout(refreshContractActivities, 10000);
                                //GetContractActivities(vContractID);
                                $("#loadingPage").fadeOut();
                            },
                            error: function (person) {
                                $("#loadingPage").fadeOut();
                            }
                        });
                    }
                } else {
                    var effectivedateamdvalue;
                    if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                    { effectivedateamdvalue = $.datepicker.formatDate('mm/dd/yy', $("#dtAmendmentEffectiveDate").datepicker('getDate')); }
                    else {
                        if (localStorage.AppDateFormat == "MM/DD/YYYY")
                            effectivedateamdvalue = $.datepicker.formatDate('mm/dd/yy', $("#dtAmendmentEffectiveDate").datepicker('getDate'));
                        else
                            effectivedateamdvalue = $.datepicker.formatDate('dd/mm/yy', $("#dtAmendmentEffectiveDate").datepicker('getDate'));
                    }
                    swal("", "Amendment record exists with the effective date '<span style=\"font-weight:700\">" + effectivedateamdvalue + "</span>'");
                    $("#loadingPage").fadeOut();
                }
            } else {
                swal("", "Amendment record exists with the title '<span style=\"font-weight:700\">" + $("#txtAmendmentTitle").val() + "</span>'");
                $("#loadingPage").fadeOut();
                $("#txtAmendmentTitle").focus();
            }
        }
    }
    else {


        autoscroll();
        $("#addEditAmendment").animate({
            scrollTop: $(".error").offset().top
        }, 2000);
        $('.ui-button-green-text').parent().removeAttr('disabled');
    }
    return isformvalid;
}

function modalOnOpenAmendmentAndStartApproval(dialog) {
    var fAmendmentEffectiveDate = '';
    if ($("#dtAmendmentEffectiveDate").val() != "" && $("#dtAmendmentEffectiveDate").val() != null) {
        fAmendmentEffectiveDate = $.datepicker.formatDate('mm/dd/yy', $("#dtAmendmentEffectiveDate").datepicker('getDate'));
    }
    var fContractEndDateAfterAmend = '';
    if ($("#txtContractEndDateAfterAmend").val() != "" && $("#txtContractEndDateAfterAmend").val() != null) {
        fContractEndDateAfterAmend = $.datepicker.formatDate('mm/dd/yy', $("#txtContractEndDateAfterAmend").datepicker('getDate'));
    }
    var fAmendmentCompletedDate = '';
    if ($("#dtAmendmentFinalizedDate").val() != "" && $("#dtAmendmentFinalizedDate").val() != null) {
        fAmendmentCompletedDate = $.datepicker.formatDate('mm/dd/yy', $("#dtAmendmentFinalizedDate").datepicker('getDate'));
    }
    var fContractEndDateCurrentAmend = '';
    if ($("#txtContractEndDateCurrent").val() != "" && $("#txtContractEndDateCurrent").val() != null) {
        fContractEndDateCurrentAmend = $.datepicker.formatDate('mm/dd/yy', $("#txtContractEndDateCurrent").datepicker('getDate'));
    }

    var completeddate = fAmendmentCompletedDate != '' ? new Date(fAmendmentCompletedDate) : "";
    var effectivedate = fAmendmentEffectiveDate != '' ? new Date(fAmendmentEffectiveDate) : "";
    var currentdate = new Date(moment());
    var EndDateAfterAmend = fContractEndDateAfterAmend != '' ? new Date(fContractEndDateAfterAmend) : "";

    if (EndDateAfterAmend != "" && currentdate != "" && EndDateAfterAmend < currentdate) {
        swal({
            title: '',
            text: "Contract Record End Date(After Amendment) cannot be less than Today's Date",
            type: 'warning',
            showCancelButton: false,
            confirmButtonText: 'OK',
            html: true
        },
       function (confirmed) {
           if (confirmed) {
               $("#loadingPage").fadeOut();
           }
       });
        return;
    }
    else if (completeddate != "" && effectivedate != "" && completeddate > effectivedate) {
        if (completeddate > currentdate) {
            swal({
                title: '',
                text: "Amendment Finalized Date cannot be greater than Today's Date",
                type: 'warning',
                showCancelButton: false,
                confirmButtonText: 'OK',
                html: true
            },
           function (confirmed) {
               if (confirmed) {
                   $("#loadingPage").fadeOut();

               }
           });
            return;
        }
        //else if (completeddate > effectivedate) {
        //    swal({
        //        title: '',
        //        text: "Amendment Finalized Date cannot be greater than Effective Date",
        //        type: 'warning',
        //        showCancelButton: false,
        //        confirmButtonText: 'OK',
        //        html: true
        //    },
        //  function (confirmed) {
        //      if (confirmed) {
        //          $("#loadingPage").fadeOut();

        //      }
        //  });
        //    return;
        //}
    }
    $('.ui-button-green-text').parent().attr('disabled', 'disabled');
    var urlOfAttachedDoc = getUrlOfAttachedDoc();
    var isformvalid = false;
    if (requiredValidator('addNewAmendment')) {
        $("#loadingPage").fadeIn();
        isformvalid = true;
        var strContractID = getParameterByName('ContractID');
        var AmendmentID = $("#txtAmendmentID").val();
        var amendmentName = $("#AmendmentTitle").text();
        var amendmentApprovalWorkflow = $("#AmendmentApprovalWorkflow").text();
        if (AmendmentID != "") {
            if (!CheckAmendmentTitle(AmendmentID, $("#txtAmendmentTitle").val())) {
                var effectivedate = ($("#dtAmendmentEffectiveDate").val() != "") ? false : true;
                if (!effectivedate) {
                    effectivedate = CheckAmendmentEffectivedate(AmendmentID, $("#ddlAmendmentType").val());
                } else {
                    effectivedate = false;
                }
                if (!effectivedate) {
                    var formData = new FormData();
                    var opmlFile = $('#docAmendment')[0];

                    formData.append("opmlFile", opmlFile.files[0]);
                    var totalFileCount = $("#inTD").children("div").length

                    for (var i = 1; i < totalFileCount + 1; i++) {

                        var filename = '#file' + i;
                        formData.append("opmlFile" + i, $(filename)[0].files[0]);

                    }
                    formData.append("UrlOfAttachedDoc", urlOfAttachedDoc);
                    formData.append("AmendmentID", AmendmentID);
                    formData.append("ContractID", getParameterByName('ContractID'));
                    formData.append("ContractTitle", $("#lblCTitleAmend").text());
                    formData.append("AmendmentTitle", $("#txtAmendmentTitle").val())
                    formData.append("AmendmentType", $("#ddlAmendmentType").val());
                    formData.append("AmendmentDescription", $("#txtAmendmentDesc").val());
                    formData.append("OriginatingCompany", "OriginatingCompany");
                    formData.append("AccountID", localStorage.AccountID);
                    formData.append("ModifiedBy", localStorage.UserName);

                    formData.append("LocationURL", $('#lblFolderUrlAmend').text())
                    formData.append("FolderName", $('#txtNewFolderNameAmend').val().replace(/[\*\|\,\"\:\<\>\[\}\{\}\'\(\)\&\#\%\.\-\!]/g, '').replace(/\//g, '').replace(/\s\s+/g, " ").trim())
                    formData.append("NewFolderName", $('#txtNewFolderNameAmend').val().replace(/[\*\|\,\"\:\<\>\[\}\{\}\'\(\)\&\#\%\.\-\!]/g, '').replace(/\//g, '').replace(/\s\s+/g, " ").trim())

                    if ($("#txtBusinessArea").val() != "") {
                        formData.append("BusinessArea", $("#txtBusinessArea").val().trim());
                    } else {
                        formData.append("BusinessArea", $("#lblBusinessArea").text().trim());
                    }
                    formData.append("BusinessAreaPath", $("#lblBusinessAreaPath").text());
                    formData.append("ContractArea", $("#lblContractArea").text().trim());
                    formData.append("ContractAreaAdministrators", $("#lblContractAreaAdmins").text().trim());
                    formData.append("BusinessAreaOwners", $("#lblBusinessAreaOwners").text().trim());

                    var RequestedByToArr = $("#ddlRequestedBy").val();
                    var vRequestedBy = '';
                    $(RequestedByToArr).each(function (i, item) {
                        if (vRequestedBy == '') {
                            vRequestedBy = item;
                        }
                        else {
                            vRequestedBy += "; " + item;
                        }
                    });
                    formData.append("RequestedBy", vRequestedBy);

                    //var vAmendmentCompleted = $('input[type="radio"][name=AmendmentCompleted]:checked').val();
                    //if (vAmendmentCompleted == "Yes") {
                    //    amendmentcompletedchecking = true;
                    //}
                    //else {
                    //    amendmentcompletedchecking = false;
                    //}
                    //formData.append("AmendmentCompleted", vAmendmentCompleted);
                    //formData.append("AmendmentCompletedDate", (vAmendmentCompleted == "Yes") ? fAmendmentCompletedDate : '');

                    var vAmendmentCompleted = $('input[type="radio"][name=AmendmentFinalized]:checked').val();
                    if (vAmendmentCompleted == "Yes") {
                        if (fAmendmentEffectiveDate == '')
                            amendmentcompletedchecking = true;
                        else {
                            if (vAmendmentCompleted)
                                amendmentcompletedchecking = true;
                            else
                                amendmentcompletedchecking = false;
                        }
                    }
                    else {
                        amendmentcompletedchecking = false;
                    }
                    formData.append("AmendmentFinalized", vAmendmentCompleted);
                    formData.append("AmendmentFinalizedDate", (vAmendmentCompleted == "Yes") ? fAmendmentCompletedDate : '');
                    formData.append("AmendmentFinalizedBy", (vAmendmentCompleted == "Yes") ? $("#txtAmendmentFinalizedBy").val() : '');

                    formData.append("EffectiveDate", fAmendmentEffectiveDate);

                    if ($("#chkContractValidity").is(":checked")) {
                        formData.append("IsContractValidityEnabled", "Yes");
                        formData.append("ContractEndDateAfterAmendment", fContractEndDateAfterAmend);
                        if ($("#chkUpdateContractValidity").is(":checked")) {
                            formData.append("UpdateContractEndDate", "Yes");
                        } else {
                            formData.append("UpdateContractEndDate", "No");
                        }
                        formData.append("ContractValidityNotes", $("#txtContractValidityNotes").val());
                    } else {
                        formData.append("IsContractValidityEnabled", "No");
                        formData.append("ContractEndDateAfterAmendment", "");
                        formData.append("UpdateContractEndDate", "No");
                        formData.append("ContractValidityNotes", "");
                    }
                    if ($("#chkContractValue").is(":checked")) {
                        formData.append("IsContractValueEnabled", "Yes");
                        formData.append("FunderOrAccountName", $("#txtFunderName").val());
                        formData.append("FunderOrAccountNumber", $("#txtFunderNumber").val());
                        formData.append("ContractValueAfterAmendment", $("#txtContractValueAfterAmend").autoNumeric('get'));
                        if (vAmendmentCompleted == "Yes") {
                            formData.append("UpdateContractValue", "Yes");
                        } else {
                            formData.append("UpdateContractValue", "No");
                        }
                        formData.append("ContractValueNotes", $("#txtContractValueNotes").val());
                    } else {
                        formData.append("IsContractValueEnabled", "NO");
                        formData.append("FunderOrAccountName", "");
                        formData.append("FunderOrAccountNumber", "");
                        formData.append("ContractValueAfterAmendment", "");
                        formData.append("UpdateContractValue", "No");
                        formData.append("ContractValueNotes", "");
                    }

                    if ($("#chkSOW").is(":checked")) {
                        formData.append("IsSOWEnabled", "Yes");
                        formData.append("SummaryOfSOWAfterAmendment", $("#txtSOWAfter").val());

                    } else {
                        formData.append("IsSOWEnabled", "No");
                        formData.append("SummaryOfSOWAfterAmendment", "");
                    }
                    if (CheckAmendmentDocumentExist()) {
                        //if document exists as confirmation to overwrite
                        swal({
                            title: '',
                            text: ExitDocuemntName + " already exists, do you want to overwrite the existing document?",
                            type: 'warning',
                            showCancelButton: true,
                            confirmButtonText: 'Yes',
                            cancelButtonText: 'No',
                            html: true
                        },
              function (confirmed) {
                  if (confirmed) {
                      if ($("#chkReplaceDoc").is(":checked")) {
                          formData.append("ReplaceDocument", "Yes");
                          formData.append("AmendmentidtoPass", AmendmentidtoPass);
                      } else {
                          formData.append("ReplaceDocument", "Yes");
                          formData.append("AmendmentidtoPass", AmendmentidtoPass);
                      }
                      $.ajax({
                          url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/amendments?amendmentid=' + AmendmentID,
                          type: 'PUT',
                          data: formData,
                          cache: false,
                          contentType: false,
                          headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName, 'RefreshToken': localStorage.RefreshToken },
                          processData: false,
                          success: function (person) {
                              StartAmendmentApproval($("#txtAmendmentTitle").val(), AmendmentID, amendmentApprovalWorkflow);
                              $('.ui-button-green-text').parent().removeAttr('disabled');
                              BindAmendments();
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
                              amendmentsucessbinding();
                              //manoj
                              $("#addEditAmendment").dialog("close");
                          },
                          complete: function () {
                              if ($('#txtNewFolderNameAmend').val() != "" && document.getElementById('txtNewFolderNameAmend').style.display != 'none') {
                                  var checkingtestamd = $('#lblFolderUrlAmend').text();
                                  $('#lblFolderUrlAmend').text(((checkingtestamd.substr(checkingtestamd.length - 1)) != "/") ? checkingtestamd + "/" + $('#txtNewFolderNameAmend').val() + "/" : checkingtestamd + $('#txtNewFolderNameAmend').val() + "/");
                                  $("#hdnContractDocumentsUrl").text(((checkingtestamd.substr(checkingtestamd.length - 1)) != "/") ? checkingtestamd + "/" : checkingtestamd);
                                  $("#hdnContractDocumentsUrlFixed").text($("#hdnContractDocumentsUrl").text());
                                  $('#txtNewFolderNameAmend').css('display', 'none');
                                  $('#txtNewFolderNameAmend').val("");
                                  $('#txtNewFolderNameAmend').removeClass('validelement');
                                  if (contractItem != null) {
                                      if (contractItem.AmendmentDocumentsUrl == null || contractItem.AmendmentDocumentsUrl == "") {
                                          if ($('#lblFolderUrlAmend').text().indexOf("/Amendments/") >= 0) {
                                              contractItem.AmendmentDocumentsUrl = $('#lblFolderUrlAmend').text();
                                          }
                                      }
                                  }
                              }
                              clearTimeout(cleartimevalue2);
                              cleartimevalue2 = setTimeout(refreshContractActivities, 10000);
                              //GetContractActivities(vContractID);
                              $("#loadingPage").fadeOut();
                          }
                      });
                  }
                  else {
                      $('.ui-button-green-text').parent().removeAttr('disabled');
                      $("#loadingPage").fadeOut();
                  }
                  return;
              });
                    } else {

                        if ($("#chkReplaceDoc").is(":checked")) {
                            formData.append("ReplaceDocument", "Yes");
                            formData.append("AmendmentidtoPass", AmendmentidtoPass);
                        } else {
                            formData.append("ReplaceDocument", "No");
                        }
                        $.ajax({
                            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/amendments?amendmentid=' + AmendmentID,
                            type: 'PUT',
                            data: formData,
                            cache: false,
                            contentType: false,
                            headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName, 'RefreshToken': localStorage.RefreshToken },
                            processData: false,
                            success: function (person) {
                                StartAmendmentApproval($("#txtAmendmentTitle").val(), AmendmentID, amendmentApprovalWorkflow);
                                $('.ui-button-green-text').parent().removeAttr('disabled');
                                BindAmendments();
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
                                amendmentsucessbinding();
                                $("#addEditAmendment").dialog("close");
                            },
                            complete: function () {
                                if ($('#txtNewFolderNameAmend').val() != "" && document.getElementById('txtNewFolderNameAmend').style.display != 'none') {
                                    var checkingtestamd = $('#lblFolderUrlAmend').text();
                                    $('#lblFolderUrlAmend').text(((checkingtestamd.substr(checkingtestamd.length - 1)) != "/") ? checkingtestamd + "/" + $('#txtNewFolderNameAmend').val() + "/" : checkingtestamd + $('#txtNewFolderNameAmend').val() + "/");
                                    $("#hdnContractDocumentsUrl").text(((checkingtestamd.substr(checkingtestamd.length - 1)) != "/") ? checkingtestamd + "/" : checkingtestamd);
                                    $("#hdnContractDocumentsUrlFixed").text($("#hdnContractDocumentsUrl").text());
                                    $('#txtNewFolderNameAmend').css('display', 'none');
                                    $('#txtNewFolderNameAmend').val("");
                                    $('#txtNewFolderNameAmend').removeClass('validelement');
                                    if (contractItem != null) {
                                        if (contractItem.AmendmentDocumentsUrl == null || contractItem.AmendmentDocumentsUrl == "") {
                                            if ($('#lblFolderUrlAmend').text().indexOf("/Amendments/") >= 0) {
                                                contractItem.AmendmentDocumentsUrl = $('#lblFolderUrlAmend').text();
                                            }
                                        }
                                    }
                                }
                                clearTimeout(cleartimevalue2);
                                cleartimevalue2 = setTimeout(refreshContractActivities, 10000);
                                //GetContractActivities(vContractID);
                                $("#loadingPage").fadeOut();
                            }
                        });
                    }

                } else {
                    var effectivedateamdvalue;
                    if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                    { effectivedateamdvalue = $.datepicker.formatDate('mm/dd/yy', $("#dtAmendmentEffectiveDate").datepicker('getDate')); }
                    else {
                        if (localStorage.AppDateFormat == "MM/DD/YYYY")
                            effectivedateamdvalue = $.datepicker.formatDate('mm/dd/yy', $("#dtAmendmentEffectiveDate").datepicker('getDate'));
                        else
                            effectivedateamdvalue = $.datepicker.formatDate('dd/mm/yy', $("#dtAmendmentEffectiveDate").datepicker('getDate'));
                    }
                    swal("", "Amendment record exists with the effective date '<span style=\"font-weight:700\">" + effectivedateamdvalue + "</span>'");
                    $("#loadingPage").fadeOut();
                }
            } else {
                swal("", "Amendment record exists with the title '<span style=\"font-weight:700\">" + $("#txtAmendmentTitle").val() + "</span>'");
                $("#loadingPage").fadeOut();
                $("#txtAmendmentTitle").focus();
            }
        }
        else {
            if (!CheckAmendmentTitle(AmendmentID, $("#txtAmendmentTitle").val())) {
                var effectivedate = ($("#dtAmendmentEffectiveDate").val() != "") ? false : true;
                if (!effectivedate) {
                    effectivedate = CheckAmendmentEffectivedate(AmendmentID, $("#ddlAmendmentType").val());
                } else {
                    effectivedate = false;
                }
                if (!effectivedate) {
                    var formData1 = new FormData();
                    var opmlFile = $('#docAmendment')[0];

                    formData1.append("opmlFile", opmlFile.files[0]);
                    var totalFileCount = $("#inTD").children("div").length
                    for (var i = 1; i < totalFileCount + 1; i++) {
                        var filename = '#file' + i;
                        formData1.append("opmlFile" + i, $(filename)[0].files[0]);
                    }
                    formData1.append("AccountID", localStorage.AccountID);
                    formData1.append("AmendmentID", AmendmentID);
                    formData1.append("ContractID", getParameterByName('ContractID'));
                    formData1.append("ContractTitle", $("#lblCTitleAmend").text());
                    formData1.append("AmendmentTitle", $("#txtAmendmentTitle").val())
                    formData1.append("AmendmentType", $("#ddlAmendmentType").val());
                    formData1.append("AmendmentDescription", $("#txtAmendmentDesc").val());
                    formData1.append("OriginatingCompany", "OriginatingCompany");
                    formData1.append("CreatedBy", localStorage.UserName);
                    formData1.append("ModifiedBy", localStorage.UserName);

                    formData1.append("LocationURL", $('#lblFolderUrlAmend').text())
                    formData1.append("FolderName", $('#txtNewFolderNameAmend').val().replace(/[\*\|\,\"\:\<\>\[\}\{\}\'\(\)\&\#\%\.\-\!]/g, '').replace(/\//g, '').replace(/\s\s+/g, " ").trim())
                    formData1.append("NewFolderName", $('#txtNewFolderNameAmend').val().replace(/[\*\|\,\"\:\<\>\[\}\{\}\'\(\)\&\#\%\.\-\!]/g, '').replace(/\//g, '').replace(/\s\s+/g, " ").trim())

                    if ($("#txtBusinessArea").val() != "") {
                        formData1.append("BusinessArea", $("#txtBusinessArea").val().trim());
                    } else {
                        formData1.append("BusinessArea", $("#lblBusinessArea").text().trim());
                    }
                    formData1.append("BusinessAreaPath", $("#lblBusinessAreaPath").text());
                    formData1.append("ContractArea", $("#lblContractArea").text().trim());
                    formData1.append("ContractAreaAdministrators", $("#lblContractAreaAdmins").text().trim());
                    formData1.append("BusinessAreaOwners", $("#lblBusinessAreaOwners").text().trim());

                    var RequestedByToArr = $("#ddlRequestedBy").val();
                    var vRequestedBy = '';
                    $(RequestedByToArr).each(function (i, item) {
                        if (vRequestedBy == '') {
                            vRequestedBy = item;
                        }
                        else {
                            vRequestedBy += "; " + item;
                        }
                    });
                    formData1.append("RequestedBy", vRequestedBy);
                    //var vAmendmentCompleted = $('input[type="radio"][name=AmendmentCompleted]:checked').val();
                    //if (vAmendmentCompleted == "Yes") {
                    //    amendmentcompletedchecking = true;
                    //}
                    //else {
                    //    amendmentcompletedchecking = false;
                    //}
                    //formData1.append("AmendmentCompleted", vAmendmentCompleted);
                    //formData1.append("AmendmentCompletedDate", (vAmendmentCompleted == "Yes") ? fAmendmentCompletedDate : '');
                    var vAmendmentCompleted = $('input[type="radio"][name=AmendmentFinalized]:checked').val();
                    if (vAmendmentCompleted == "Yes") {
                        if (fAmendmentEffectiveDate == '')
                            amendmentcompletedchecking = true;
                        else {
                            if (vAmendmentCompleted)
                                amendmentcompletedchecking = true;
                            else
                                amendmentcompletedchecking = false;
                        }
                    }
                    else {
                        amendmentcompletedchecking = false;
                    }
                    formData1.append("AmendmentFinalized", vAmendmentCompleted);
                    formData1.append("AmendmentFinalizedDate", (vAmendmentCompleted == "Yes") ? fAmendmentCompletedDate : '');
                    formData1.append("AmendmentFinalizedBy", (vAmendmentCompleted == "Yes") ? $("#txtAmendmentFinalizedBy").val() : '');

                    formData1.append("EffectiveDate", fAmendmentEffectiveDate);

                    if ($("#chkContractValidity").is(":checked")) {
                        formData1.append("IsContractValidityEnabled", "Yes");
                        formData1.append("ContractEndDateAfterAmendment", fContractEndDateAfterAmend);
                        if ($("#chkUpdateContractValidity").is(":checked")) {
                            formData1.append("UpdateContractEndDate", "Yes");
                        } else {
                            formData1.append("UpdateContractEndDate", "No");
                        }
                        formData1.append("ContractValidityNotes", $("#txtContractValidityNotes").val());
                    } else {
                        formData1.append("IsContractValidityEnabled", "No");
                        formData1.append("ContractEndDateAfterAmendment", "");
                        formData1.append("UpdateContractEndDate", "No");
                        formData1.append("ContractValidityNotes", "");
                    }

                    if ($("#chkContractValue").is(":checked")) {
                        formData1.append("IsContractValueEnabled", "Yes");
                        formData1.append("FunderOrAccountName", $("#txtFunderName").val());
                        formData1.append("FunderOrAccountNumber", $("#txtFunderNumber").val());
                        formData1.append("ContractValueAfterAmendment", $("#txtContractValueAfterAmend").autoNumeric('get'));
                        if (vAmendmentCompleted == "Yes") {
                            formData1.append("UpdateContractValue", "Yes");
                        } else {
                            formData1.append("UpdateContractValue", "No");
                        }
                        formData1.append("ContractValueNotes", $("#txtContractValueNotes").val());
                    } else {
                        formData1.append("IsContractValueEnabled", "No");
                        formData1.append("FunderOrAccountName", "");
                        formData1.append("FunderOrAccountNumber", "");
                        formData1.append("ContractValueAfterAmendment", "");
                        formData1.append("UpdateContractValue", "No");
                        formData1.append("ContractValueNotes", "");
                    }

                    if ($("#chkSOW").is(":checked")) {
                        formData1.append("IsSOWEnabled", "Yes");
                        formData1.append("SummaryOfSOWAfterAmendment", $("#txtSOWAfter").val());

                    } else {
                        formData1.append("IsSOWEnabled", "No");
                        formData1.append("SummaryOfSOWAfterAmendment", "");
                    }

                    if (CheckAmendmentDocumentExist()) {
                        //if document exists as confirmation to overwrite
                        swal({
                            title: '',
                            text: ExitDocuemntName + " already exists, do you want to overwrite the existing document?",
                            type: 'warning',
                            showCancelButton: true,
                            confirmButtonText: 'Yes',
                            cancelButtonText: 'No',
                            html: true
                        },
              function (confirmed) {
                  if (confirmed) {
                      if ($("#chkReplaceDoc").is(":checked")) {
                          formData1.append("IsSOWEnabled", "Yes");
                          formData1.append("ReplaceDocument", "Yes");
                          formData1.append("AmendmentidtoPass", AmendmentidtoPass);
                      } else {
                          formData1.append("IsSOWEnabled", "No");
                          formData1.append("ReplaceDocument", "Yes");
                          formData1.append("AmendmentidtoPass", AmendmentidtoPass);
                      }

                      $.ajax({
                          url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/amendments/addwithdoc',
                          type: 'POST',
                          data: formData1,
                          cache: false,
                          contentType: false,
                          headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName, 'RefreshToken': localStorage.RefreshToken },
                          processData: false,
                          success: function (person) {
                              $('.ui-button-green-text').parent().removeAttr('disabled');
                              $("#addEditAmendment").dialog("close");
                              BindAmendments();
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
                              amendmentsucessbinding();
                          },
                          complete: function (person) {
                              if ($('#txtNewFolderNameAmend').val() != "") {
                                  var checkingtestamd = $('#lblFolderUrlAmend').text();
                                  var lastCharcheckingamd = checkingtestamd.slice(-1);
                                  if (lastCharcheckingamd == "/") {
                                      $('#lblFolderUrlAmend').text(checkingtestamd + $('#txtNewFolderNameAmend').val() + "/");
                                      $("#hdnContractDocumentsUrl").text(checkingtestamd);
                                      $("#hdnContractDocumentsUrlFixed").text($("#hdnContractDocumentsUrl").text());
                                      $('#txtNewFolderNameAmend').css('display', 'none');
                                      $('#txtNewFolderNameAmend').val("");
                                  } else {
                                      $('#lblFolderUrlAmend').text(checkingtestamd + "/" + $('#txtNewFolderNameAmend').val() + "/");
                                      $("#hdnContractDocumentsUrl").text(checkingtestamd + "/");
                                      $("#hdnContractDocumentsUrlFixed").text($("#hdnContractDocumentsUrl").text());
                                      $('#txtNewFolderNameAmend').css('display', 'none');
                                      $('#txtNewFolderNameAmend').val("");
                                  }
                                  //manoj
                                  if (contractItem != null) {
                                      if (contractItem.AmendmentDocumentsUrl == null || contractItem.AmendmentDocumentsUrl == "") {
                                          if ($('#lblFolderUrlAmend').text().indexOf("/Amendments/") >= 0) {
                                              contractItem.AmendmentDocumentsUrl = $('#lblFolderUrlAmend').text();
                                          }
                                      }
                                  }
                                  //manoj
                                  $('#txtNewFolderNameAmend').removeClass('validelement');
                              }
                              clearTimeout(cleartimevalue2);
                              cleartimevalue2 = setTimeout(refreshContractActivities, 10000);
                              //GetContractActivities(vContractID);
                              $("#loadingPage").fadeOut();
                              AmendmentID = person;
                              StartAmendmentApproval($("#txtAmendmentTitle").val(), AmendmentID["responseJSON"].Message, amendmentApprovalWorkflow);
                          },
                          error: function (person) {
                              $("#loadingPage").fadeOut();
                          }
                      });
                  }
                  else {
                      $('.ui-button-green-text').parent().removeAttr('disabled');
                      $("#loadingPage").fadeOut();
                  }
                  return;
              });

                    } else {
                        if ($("#chkReplaceDoc").is(":checked")) {
                            formData1.append("IsSOWEnabled", "Yes");
                            formData1.append("ReplaceDocument", "Yes");
                            formData1.append("AmendmentidtoPass", AmendmentidtoPass);
                        } else {
                            formData1.append("IsSOWEnabled", "No");
                            formData1.append("ReplaceDocument", "No");
                        }
                        $.ajax({
                            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/amendments/addwithdoc',
                            type: 'POST',
                            data: formData1,
                            cache: false,
                            contentType: false,
                            headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName, 'RefreshToken': localStorage.RefreshToken },
                            processData: false,
                            success: function (person) {
                                $('.ui-button-green-text').parent().removeAttr('disabled');
                                $("#addEditAmendment").dialog("close");
                                $("#loadingPage").fadeOut();
                                BindAmendments();
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
                                amendmentsucessbinding();
                                //manoj
                            },
                            complete: function (person) {
                                if ($('#txtNewFolderNameAmend').val() != "") {
                                    var checkingtestamd = $('#lblFolderUrlAmend').text();
                                    var lastCharcheckingamd = checkingtestamd.slice(-1);
                                    if (lastCharcheckingamd == "/") {
                                        $('#lblFolderUrlAmend').text(checkingtestamd + $('#txtNewFolderNameAmend').val() + "/");
                                        $("#hdnContractDocumentsUrl").text(checkingtestamd);
                                        $('#txtNewFolderNameAmend').css('display', 'none');
                                        $('#txtNewFolderNameAmend').val("");
                                    } else {
                                        $('#lblFolderUrlAmend').text(checkingtestamd + "/" + $('#txtNewFolderNameAmend').val() + "/");
                                        $("#hdnContractDocumentsUrl").text(checkingtestamd + "/");
                                        $('#txtNewFolderNameAmend').css('display', 'none');
                                        $('#txtNewFolderNameAmend').val("");
                                    }
                                    //manoj
                                    if (contractItem != null) {
                                        if (contractItem.AmendmentDocumentsUrl == null || contractItem.AmendmentDocumentsUrl == "") {
                                            if ($('#lblFolderUrlAmend').text().indexOf("/Amendments/") >= 0) {
                                                contractItem.AmendmentDocumentsUrl = $('#lblFolderUrlAmend').text();
                                            }
                                        }
                                    }
                                    //manoj
                                    $('#txtNewFolderNameAmend').removeClass('validelement');
                                }
                                clearTimeout(cleartimevalue2);
                                cleartimevalue2 = setTimeout(refreshContractActivities, 10000);
                                $("#loadingPage").fadeOut();
                                AmendmentID = person;
                                StartAmendmentApproval($("#txtAmendmentTitle").val(), AmendmentID["responseJSON"].Message, amendmentApprovalWorkflow);
                            },
                            error: function (person) {
                                $("#loadingPage").fadeOut();
                            }
                        });
                    }
                } else {
                    var effectivedateamdvalue;
                    if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                    { effectivedateamdvalue = $.datepicker.formatDate('mm/dd/yy', $("#dtAmendmentEffectiveDate").datepicker('getDate')); }
                    else {
                        if (localStorage.AppDateFormat == "MM/DD/YYYY")
                            effectivedateamdvalue = $.datepicker.formatDate('mm/dd/yy', $("#dtAmendmentEffectiveDate").datepicker('getDate'));
                        else
                            effectivedateamdvalue = $.datepicker.formatDate('dd/mm/yy', $("#dtAmendmentEffectiveDate").datepicker('getDate'));
                    }
                    swal("", "Amendment record exists with the effective date '<span style=\"font-weight:700\">" + effectivedateamdvalue + "</span>'");
                    $("#loadingPage").fadeOut();
                }
            } else {
                swal("", "Amendment record exists with the title '<span style=\"font-weight:700\">" + $("#txtAmendmentTitle").val() + "</span>'");
                $("#loadingPage").fadeOut();
                $("#txtAmendmentTitle").focus();
            }
        }
    }
    else {
        autoscroll();
        $("#addEditAmendment").animate({
            scrollTop: $(".error").offset().top
        }, 2000);
        $('.ui-button-green-text').parent().removeAttr('disabled');
    }
    return isformvalid;
}

function contextMenuAmendment(action, el, pos) {
    switch (action) {
        case "view":
            {
                var amendmentID = $(el).find("#AmendmentID").text();
                ViewAmendment(amendmentID);

                break;
            }
        case "delete":
            {
                var amendmentTitle = $(el).find("#AmendmentTitle").text();
                swal({
                    title: '',
                    text: "Are you sure you want to delete '<span style=\"font-weight:700\">" + amendmentTitle + "</span>'?  All attachments will be deleted.",
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
                   url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/amendments/documents?amendmentid=' + $(el).find("#AmendmentID").text(),
                   type: 'GET',
                   dataType: 'json',
                   headers: { 'eContracts-ApiKey': localStorage.APIKey },
                   "Content-Type": "application/json",
                   cache: false,
                   async: false,
                   success: function (data) {
                       deleteamentmentdocumets(data, $(el).find("#AmendmentID").text());
                   }, error: function (data) {
                       deleteamanetment($(el).find("#AmendmentID").text());
                   }
               });
           }
           return;
       });
                break;
            }
        case "edit":
            {
                $("#loadingPage").fadeIn();
                $("#dvAmendmentMsg").css('display', 'none');
                $("#docAmendment").replaceWith($("#docAmendment").val('').clone(true));
                $('#inTD').empty();
                $("#trAttachedDoc").attr("style", "");
                var amendmentID = $(el).find("#AmendmentID").text();
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/amendments/amendmentdetails?amendmentid=' + amendmentID,
                    type: 'GET',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    "Content-Type": "application/json",
                    cache: false,
                    success: function (amendmententity) {
                        setAmendmenturl();
                        $("#txtAmendmentID").val(amendmententity.RowKey);
                        $("#txtAmendmentTitle").val(amendmententity.AmendmentTitle);
                        $("#txtAmendmentDesc").val(amendmententity.AmendmentDescription);
                        $("#ddlAmendmentType option").filter(function (index) { return $(this).text() === amendmententity.AmendmentType; }).prop('selected', true);

                        $("#tblDocu").empty();
                        GetValuesAndAutoPopulate("ddlRequestedBy", amendmententity.RequestedBy);

                        if (amendmententity.AmendmentFinalized != '') {
                            $('input[type="radio"][name="AmendmentFinalized"][value="' + amendmententity.AmendmentFinalized + '"]').prop('checked', true);
                            if (amendmententity.AmendmentFinalized == "No") {
                                $('#trAmendmentCompletedDate').css('display', 'none');
                                $('#trAmendmentCompletedBy').css('display', 'none');
                                $('#trAmendmentEffectiveDate').css('display', 'none');
                                $("#dtAmendmentFinalizedDate").removeClass("validelement");
                            }
                            else {
                                $("#dtAmendmentFinalizedDate").addClass("validelement");
                                $('#trAmendmentCompletedDate').css('display', 'table-row');
                                $('#trAmendmentCompletedBy').css('display', 'table-row');
                                $('#trAmendmentEffectiveDate').css('display', 'table-row');
                            }
                        }
                        else {
                            $('input[type="radio"][name="AmendmentFinalized"][value="No"]').prop('checked', true);
                            $('#trAmendmentCompletedDate').css('display', 'none');
                            $('#trAmendmentCompletedBy').css('display', 'none');
                            $('#trAmendmentEffectiveDate').css('display', 'none');
                            $("#dtAmendmentFinalizedDate").removeClass("validelement");
                        }
                        if (amendmententity.AmendmentFinalizedBy != null && amendmententity.AmendmentFinalizedBy != '') {
                            $("#txtAmendmentFinalizedBy").val(amendmententity.AmendmentFinalizedBy)
                        }
                        else {
                            $("#txtAmendmentFinalizedBy").val('');
                        }
                        if (amendmententity.AmendmentFinalizedDate != null && amendmententity.AmendmentFinalizedDate != '') {
                            var completedate = "";

                            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                            { completedate = moment(new Date(amendmententity.AmendmentFinalizedDate)).format('MM/DD/YYYY'); }
                            else { completedate = moment(new Date(amendmententity.AmendmentFinalizedDate)).format(localStorage.AppDateFormat); }

                            $("#dtAmendmentFinalizedDate").val(completedate);
                        }
                        else {
                            $("#dtAmendmentFinalizedDate").val('')
                        }

                        if (amendmententity.EffectiveDate != null) {

                            var fEffectiveDate = "";
                            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                            { fEffectiveDate = moment(new Date(amendmententity.EffectiveDate)).utc().format('MM/DD/YYYY'); }
                            else { fEffectiveDate = moment(new Date(amendmententity.EffectiveDate)).utc().format(localStorage.AppDateFormat); }
                            $("#dtAmendmentEffectiveDate").val(fEffectiveDate);
                        }

                        if ((contractItem.ContractTermType == "Evergreen / Perpetual" || contractItem.ContractTermType == "Executed / Performance" || contractItem.EndDate == null) && contractItem.ContractTermType != "0") {
                            $("#chkContractValidity").attr("disabled", "disabled");
                            $("#chkContractValidity").attr("style", "cursor:not-allowed;");
                            if ($("#ddlAmendmentType option[value='Change to Terms']").length != -1)
                                $("#ddlAmendmentType option[value='Change to Terms']").remove();
                            $("#chkContractValidity").prop('checked', false);
                            $("#tblContractValidity").css('display', 'none');
                        } else {
                            if ($("#ddlAmendmentType option[value='Change to Terms']").length != 1)
                                $("#ddlAmendmentType").append("<option value='Change to Terms'>Change to Terms</option>")
                            if (amendmententity.IsContractValidityEnabled == "Yes") {
                                $('#chkContractValidity').prop('checked', true);
                                $("#tblContractValidity").css('display', '');
                                $("#imgconValidity").css('display', '');
                            }
                            else {
                                $('#chkContractValidity').prop('checked', false);
                                $("#tblContractValidity").css('display', 'none');
                                $("#imgconValidity").css('display', 'none');
                            }
                            $("#chkContractValidity").removeAttr('disabled');
                            $("#chkContractValidity").attr("style", "cursor:pointer;");
                        }


                        if (contractItem.TransactionType == "Legal/General Agreement") {
                            $("#chkContractValue").attr("disabled", "disabled");
                            $("#chkContractValue").attr("style", "cursor:not-allowed;");
                            if ($("#ddlAmendmentType option[value='Change of Contract Value']").length != -1)
                                $("#ddlAmendmentType option[value='Change of Contract Value']").remove();
                        }
                        else {
                            if ($("#ddlAmendmentType option[value='Change of Contract Value']").length != 1)
                                $("#ddlAmendmentType").append("<option value='Change of Contract Value'>Change of Contract Value</option>")
                            $("#chkContractValue").removeAttr('disabled');
                            $("#chkContractValue").attr("style", "cursor:pointer;");
                        }


                        if (amendmententity.ContractEndDateAfterAmendment != null) {
                            var fAppDateFormate = "";
                            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                            { fAppDateFormate = moment(new Date(amendmententity.ContractEndDateAfterAmendment)).utc().format('MM/DD/YYYY'); }
                            else { fAppDateFormate = moment(new Date(amendmententity.ContractEndDateAfterAmendment)).utc().format(localStorage.AppDateFormat); }
                            $("#txtContractEndDateAfterAmend").val(fAppDateFormate);
                        }
                        if (amendmententity.UpdateContractEndDate == "Yes") {
                            $('#chkUpdateContractValidity').prop('checked', true);
                        }
                        $("#txtContractValidityNotes").val(amendmententity.ContractValidityNotes);


                        if (amendmententity.IsContractValueEnabled == "Yes") {
                            $('#chkContractValue').prop('checked', true);
                            $("#tblContractValue").css('display', '');
                            $("#imgconValue").css('display', '');
                        } else {
                            $('#chkContractValue').prop('checked', false);
                            $("#tblContractValue").css('display', 'none');
                            $("#imgconValue").css('display', 'none');
                        }

                        if (vCurrencyDisplayStyle == "UK") {
                            $('#txtContractValueAfterAmend').autoNumeric('init');
                            $('#txtContractValueAfterAmend').autoNumeric('set', amendmententity.ContractValueAfterAmendment);

                        } else if (vCurrencyDisplayStyle == "CAN") {
                            $('#txtContractValueAfterAmend').autoNumeric('init', { aSep: ' ', aDec: '.' });
                            $('#txtContractValueAfterAmend').autoNumeric('set', amendmententity.ContractValueAfterAmendment);

                        } else if (vCurrencyDisplayStyle == "EU") {
                            $('#txtContractValueAfterAmend').autoNumeric('init', { aSep: '.', aDec: ',' });
                            $('#txtContractValueAfterAmend').autoNumeric('set', amendmententity.ContractValueAfterAmendment);

                        }

                        if (amendmententity.UpdateContractValue == "Yes") {
                            $('#chkUpdateContractValue').prop('checked', true);
                        }
                        $("#txtContractValueNotes").val(amendmententity.ContractValueNotes);

                        if (amendmententity.FunderOrAccountName != null && amendmententity.FunderOrAccountName != '' && typeof (amendmententity.FunderOrAccountName) != 'undefined') {
                            $("#txtFunderName").val(amendmententity.FunderOrAccountName)
                        }
                        else {
                            $("#txtFunderName").val('');
                        }
                        if (amendmententity.FunderOrAccountNumber != null && amendmententity.FunderOrAccountNumber != '' && typeof (amendmententity.FunderOrAccountNumber) != 'undefined') {
                            $("#txtFunderNumber").val(amendmententity.FunderOrAccountNumber)
                        }
                        else {
                            $("#txtFunderNumber").val('');
                        }
                        if (amendmententity.IsSOWEnabled == "Yes") {
                            $('#chkSOW').prop('checked', true);
                            $("#tblSOW").css('display', '');
                            $("#imgconSOW").css('display', '');
                        } else {
                            $('#chkSOW').prop('checked', false);
                            $("#tblSOW").css('display', 'none');
                            $("#imgconSOW").css('display', 'none');
                        }
                        $("#txtSOWAfter").val(amendmententity.SummaryOfSOWAfterAmendment);

                        if ($("#hdnStartDate").val() == "" || $("#hdnStartDate").val() == undefined)
                            $("#hdnStartDate").val(contractItem.StartDate);
                        var startdate = new Date($("#hdnStartDate").text());
                        $("#txtContractEndDateAfterAmend").datepicker("option", "minDate", startdate);
                        $("#dtAmendmentEffectiveDate").datepicker("option", "minDate", startdate);
                        $("#dtAmendmentFinalizedDate").datepicker("option", "minDate", startdate);
                        $("#dtAmendmentFinalizedDate").datepicker("option", "maxDate", new Date());


                        //get amendment documents
                        $.ajax({
                            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/amendments/documents?amendmentid=' + amendmentID,
                            type: 'GET',
                            dataType: 'json',
                            headers: { 'eContracts-ApiKey': localStorage.APIKey },
                            "Content-Type": "application/json",
                            cache: false,
                            success: function (data) {
                                var htmlDocu = "";
                                if (data.length > 0) {
                                    $(data).each(function (i, item) {
                                        //var htmlDocu = "";
                                        htmlDocu += "<tr>";
                                        htmlDocu += "<td>";
                                        htmlDocu += "<a class='clsLinkOfDoc' href='" + item.DocumentUrl + "' style='border-bottom: 1px dotted;color: #3F91CC !important;font-size: 12px !important;'>";
                                        htmlDocu += item.DocumentName;
                                        htmlDocu += "</a>";

                                        htmlDocu += "<a id='btnRemoveSavedDoc' href='javascript:void(0)' title='Remove file' onclick=(deleteSavedDocumentElement(this,'" + item.RowKey + "'))>";
                                        htmlDocu += "<img src='../Content/Images/icon/delete.png' style='float:right;margin: 5px 0px 0px 10px;'>";
                                        htmlDocu += "</a>";
                                        htmlDocu += "</td>";
                                        htmlDocu += "</tr>";
                                    });
                                    $("#tblDocu").html(htmlDocu);
                                } else {
                                    $("#tblDocu").html("<tr><td style='font-size:13px;'>No items found.</td></tr>");
                                }
                            }, error: function (data) {
                                $("#tblDocu").html("<tr><td style='font-size:13px;'>No items found.</td></tr>");
                            }, complete: function (data) {
                                $("#lblCTitleAmend").text($("#lblContractTitle").text());
                                $(".validelement").each(function (index, element) {
                                    $(element).removeClass("error");
                                    $("#errormsg_" + element.id).remove();
                                });
                                $("#loadingPage").fadeOut();
                                $("#addEditAmendment").dialog("option", "title", "Edit Amendment");
                                $("#addEditAmendment").dialog("open");
                                //if (amendmententity.ApprovalWorkflow == "In Progress") {
                                //    $("#btnSaveAndApproval").css('display', 'none');
                                //}
                                $("#btnSaveAndApproval").css('display', 'none');
                            }
                        });

                    },
                    error: function () {
                        $("#loadingPage").fadeOut();
                    },
                    complete: function () {

                    }
                });

                break;
            }
        case "approve":
            {
                $(".FL_ApprovalSheetContract").css('display', 'none');
                var amendmentName = $(el).find("#AmendmentTitle").text();
                var amendmentID = $(el).find("#AmendmentID").text();
                var amendmentApprovalWorkflow = $(el).find("#AmendmentApprovalWorkflow").text();
                $("#txtWorkflowTitle").prop('readonly', false);
                if (amendmentApprovalWorkflow == "In Progress") {
                    var oWorkflowID = "";
                    if (ArrayofAmendmentWorkflows.length > 0) {
                        var relatedcon = $.grep(ArrayofAmendmentWorkflows, function (itemR) {
                            return itemR.AmendmentID == amendmentID
                        });
                        if (relatedcon.length > 0) {
                            $("#alertText1").html("Amendment Approval is in progress for this amendment.");
                            $("#textingdetails").html('<a target="_blank" title="View Workflow Details" href=/Activity/TaskDetails?TaskID=&WorkflowID=' + relatedcon[0].id + '><font color="#44A6D8">View Workflow Details</font></a>');
                            $("#dvAlertDetails1").dialog("open");
                        }
                        else {
                            $("#loadingPage").fadeIn();
                            var businessArea = $("#lblBusinessArea").text();
                            var contractArea = $("#lblContractArea").text();
                            $("#tblStage").empty();
                            $("#ddlRule").empty();
                            $("#liAutoUpdateStatus").css('display', 'none');
                            $("#txtWorkflowTitle").val('Approval for ' + amendmentName);
                            $("#txtDuration").val("");
                            var nicInstance = nicEditors.findEditor('txtComment');
                            nicInstance.setContent('');
                            $("#hdWorkflowType").val("Amendment Approval");
                            $("#hdWorkflowObjectID").val(amendmentID);
                            $("#hdWorkflowObjectTitle").val(amendmentName);
                            GetValuesAndAutoPopulate("ddlWorkflowCC", "");
                            var vWorkflowSettings = [];
                            $.ajax({
                                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Workflow/evaluate?workflowType=Amendment Approval&contractArea=' + encodeURIComponent(contractArea) + '&businessArea=' + encodeURIComponent(businessArea) + '&contractid=' + amendmentID,
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
                                        amendmentWorkflowConflict = vWorkflowSettings.WorkflowConflict;
                                    }
                                    if (vWorkflowRules.length > 0) {
                                        $(vWorkflowRules).each(function (i, rule) {
                                            $("#ddlRule").append('<option value="' + rule.RuleName + '">' + rule.RuleName + '</option>');
                                        });
                                        if (workflowAdHoc == "on") {
                                            $("#ddlRule").append('<option value="Ad-hoc">Ad-hoc</option>');
                                        }
                                        var workflowRules = vWorkflowRules[0];
                                        $("#ddlRule").find('option[value="' + workflowRules.RuleName + '"]').attr("selected", true);
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
                                                $("#txtWorkflowTitle").val(workflowRules.WorkflowTitle + ' for ' + amendmentName);
                                            } else {
                                                $("#txtWorkflowTitle").val('Approval for ' + amendmentName);
                                            }
                                        }
                                        else {
                                            if (typeof workflowRules.WorkflowTitle != 'undefined' && workflowRules.WorkflowTitle != "") {
                                                $("#txtWorkflowTitle").val(workflowRules.WorkflowTitle + ' for ' + amendmentName);
                                            } else {
                                                $("#txtWorkflowTitle").val('Approval for ' + amendmentName);
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
                                            if (!workflowAdHoc) {
                                                if (amendmentWorkflowConflict != "Pick from possible options") { //eO310808
                                                    $("#ddlRule").attr('disabled', 'disabled');
                                                }
                                            }
                                                
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
                                        if (!workflowAdHoc) {
                                            if (amendmentWorkflowConflict != "Pick from possible options") { //eO310808
                                                $("#ddlRule").attr('disabled', 'disabled');
                                            }
                                        }
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
                                    $("#loadingPage").fadeOut();
                                    $("#contractDetailsSummaryConfiguration").css('display', 'none');
                                    $("#dvWorkflow").dialog("option", "title", "Amendment Approval Workflow");
                                    $("#dvWorkflow").dialog("open");
                                    $("#dvWorkflow").height("auto");
                                },
                                error: function () {
                                    $("#ddlRule").append('<option value="Ad-hoc">Ad-hoc</option>');
                                    $("#lblddlRule").css("display", "");
                                    $("#ddlRule").css("display", "none");
                                    $("#lblddlRule").text("Ad-hoc");
                                    if (!workflowAdHoc) {
                                        if (amendmentWorkflowConflict != "Pick from possible options") {
                                            $("#ddlRule").attr('disabled', 'disabled');
                                        }
                                    }
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

                                    $("#loadingPage").fadeOut();
                                    $("#contractDetailsSummaryConfiguration").css('display', 'none');
                                    $("#dvWorkflow").dialog("option", "title", "Amendment Approval Workflow");
                                    $("#dvWorkflow").dialog("open");
                                    $("#dvWorkflow").height("auto");
                                }
                            });
                        }
                    }
                    else {
                        $("#loadingPage").fadeIn();
                        var businessArea = $("#lblBusinessArea").text();
                        var contractArea = $("#lblContractArea").text();
                        $("#tblStage").empty();
                        $("#ddlRule").empty();
                        $("#liAutoUpdateStatus").css('display', 'none');
                        $("#txtWorkflowTitle").val('Approval for ' + amendmentName);
                        $("#txtDuration").val("");
                        var nicInstance = nicEditors.findEditor('txtComment');
                        nicInstance.setContent('');
                        $("#hdWorkflowType").val("Amendment Approval");
                        $("#hdWorkflowObjectID").val(amendmentID);
                        $("#hdWorkflowObjectTitle").val(amendmentName);
                        GetValuesAndAutoPopulate("ddlWorkflowCC", "");
                        var vWorkflowSettings = [];
                        $.ajax({
                            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Workflow/evaluate?workflowType=Amendment Approval&contractArea=' + encodeURIComponent(contractArea) + '&businessArea=' + encodeURIComponent(businessArea) + '&contractid=' + amendmentID,
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
                                    amendmentWorkflowConflict = vWorkflowSettings.WorkflowConflict;
                                }
                                if (vWorkflowRules.length > 0) {
                                    $(vWorkflowRules).each(function (i, rule) {
                                        $("#ddlRule").append('<option value="' + rule.RuleName + '">' + rule.RuleName + '</option>');
                                    });
                                    if (workflowAdHoc == "on") {
                                        $("#ddlRule").append('<option value="Ad-hoc">Ad-hoc</option>');
                                    }
                                    var workflowRules = vWorkflowRules[0];
                                    $("#ddlRule").find('option[value="' + workflowRules.RuleName + '"]').attr("selected", true);
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
                                            $("#txtWorkflowTitle").val(workflowRules.WorkflowTitle + ' for ' + amendmentName);
                                        } else {
                                            $("#txtWorkflowTitle").val('Approval for ' + amendmentName);
                                        }
                                    }
                                    else {
                                        if (typeof workflowRules.WorkflowTitle != 'undefined' && workflowRules.WorkflowTitle != "") {
                                            $("#txtWorkflowTitle").val(workflowRules.WorkflowTitle + ' for ' + amendmentName);
                                        } else {
                                            $("#txtWorkflowTitle").val('Approval for ' + amendmentName);
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
                                        if (!workflowAdHoc) {
                                            if (amendmentWorkflowConflict != "Pick from possible options") {
                                                $("#ddlRule").attr('disabled', 'disabled');
                                            }
                                        }
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
                                    if (!workflowAdHoc) {
                                        if (amendmentWorkflowConflict != "Pick from possible options") {
                                            $("#ddlRule").attr('disabled', 'disabled');
                                        }
                                    }
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
                                $("#loadingPage").fadeOut();
                                $("#contractDetailsSummaryConfiguration").css('display', 'none');
                                $("#dvWorkflow").dialog("option", "title", "Amendment Approval Workflow");
                                $("#dvWorkflow").dialog("open");
                                $("#dvWorkflow").height("auto");
                            },
                            error: function () {
                                $("#ddlRule").append('<option value="Ad-hoc">Ad-hoc</option>');
                                $("#lblddlRule").css("display", "");
                                $("#ddlRule").css("display", "none");
                                $("#lblddlRule").text("Ad-hoc");
                                if (!workflowAdHoc) {
                                    if (amendmentWorkflowConflict != "Pick from possible options") {
                                        $("#ddlRule").attr('disabled', 'disabled');
                                    }
                                }
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

                                $("#loadingPage").fadeOut();
                                $("#contractDetailsSummaryConfiguration").css('display', 'none');
                                $("#dvWorkflow").dialog("option", "title", "Amendment Approval Workflow");
                                $("#dvWorkflow").dialog("open");
                                $("#dvWorkflow").height("auto");
                            }
                        });

                    }

                }
                else {
                    if (ArrayofAmendmentWorkflows.length > 0) {
                        var relatedcon = $.grep(ArrayofAmendmentWorkflows, function (itemR) {
                            return itemR.AmendmentID == amendmentID
                        });
                        if (relatedcon.length > 0) {
                            $("#alertText1").html("Amendment Approval is in progress for this amendment.");
                            $("#textingdetails").html('<a target="_blank" title="View Workflow Details" href=/Activity/TaskDetails?TaskID=&WorkflowID=' + relatedcon[0].id + '><font color="#44A6D8">View Workflow Details</font></a>');
                            $("#dvAlertDetails1").dialog("open");
                        }
                        else {
                            $("#loadingPage").fadeIn();
                            var businessArea = $("#lblBusinessArea").text();
                            var contractArea = $("#lblContractArea").text();
                            $("#tblStage").empty();
                            $("#ddlRule").empty();
                            $("#liAutoUpdateStatus").css('display', 'none');
                            $("#txtWorkflowTitle").val('Approval for ' + amendmentName);
                            $("#txtDuration").val("");
                            var nicInstance = nicEditors.findEditor('txtComment');
                            nicInstance.setContent('');
                            $("#hdWorkflowType").val("Amendment Approval");
                            $("#hdWorkflowObjectID").val(amendmentID);
                            $("#hdWorkflowObjectTitle").val(amendmentName);
                            GetValuesAndAutoPopulate("ddlWorkflowCC", "");
                            var vWorkflowSettings = [];
                            $.ajax({
                                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Workflow/evaluate?workflowType=Amendment Approval&contractArea=' + encodeURIComponent(contractArea) + '&businessArea=' + encodeURIComponent(businessArea) + '&contractid=' + amendmentID,
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
                                        amendmentWorkflowConflict = vWorkflowSettings.WorkflowConflict;
                                    }
                                    if (vWorkflowRules.length > 0) {
                                        $(vWorkflowRules).each(function (i, rule) {
                                            $("#ddlRule").append('<option value="' + rule.RuleName + '">' + rule.RuleName + '</option>');
                                        });
                                        if (workflowAdHoc == "on") {
                                            $("#ddlRule").append('<option value="Ad-hoc">Ad-hoc</option>');
                                        }
                                        var workflowRules = vWorkflowRules[0];
                                        $("#ddlRule").find('option[value="' + workflowRules.RuleName + '"]').attr("selected", true);
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
                                                $("#txtWorkflowTitle").val(workflowRules.WorkflowTitle + ' for ' + amendmentName);
                                            } else {
                                                $("#txtWorkflowTitle").val('Approval for ' + amendmentName);
                                            }
                                        }
                                        else {
                                            if (typeof workflowRules.WorkflowTitle != 'undefined' && workflowRules.WorkflowTitle != "") {
                                                $("#txtWorkflowTitle").val(workflowRules.WorkflowTitle + ' for ' + amendmentName);
                                            } else {
                                                $("#txtWorkflowTitle").val('Approval for ' + amendmentName);
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
                                            if (!workflowAdHoc) {
                                                if (amendmentWorkflowConflict != "Pick from possible options") {
                                                    $("#ddlRule").attr('disabled', 'disabled');
                                                }
                                            }
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
                                        if (!workflowAdHoc) {
                                            if (amendmentWorkflowConflict != "Pick from possible options") {
                                                $("#ddlRule").attr('disabled', 'disabled');
                                            }
                                        }
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
                                    $("#loadingPage").fadeOut();
                                    $("#contractDetailsSummaryConfiguration").css('display', 'none');
                                    $("#dvWorkflow").dialog("option", "title", "Amendment Approval Workflow");
                                    $("#dvWorkflow").dialog("open");
                                    $("#dvWorkflow").height("auto");
                                },
                                error: function () {
                                    $("#ddlRule").append('<option value="Ad-hoc">Ad-hoc</option>');
                                    $("#lblddlRule").css("display", "");
                                    $("#ddlRule").css("display", "none");
                                    $("#lblddlRule").text("Ad-hoc");
                                    if (!workflowAdHoc) {
                                        if (amendmentWorkflowConflict != "Pick from possible options") {
                                            $("#ddlRule").attr('disabled', 'disabled');
                                        }
                                    }
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

                                    $("#loadingPage").fadeOut();
                                    $("#contractDetailsSummaryConfiguration").css('display', 'none');
                                    $("#dvWorkflow").dialog("option", "title", "Amendment Approval Workflow");
                                    $("#dvWorkflow").dialog("open");
                                    $("#dvWorkflow").height("auto");
                                }
                            });
                        }
                    }
                    else {
                        $("#loadingPage").fadeIn();
                        var businessArea = $("#lblBusinessArea").text();
                        var contractArea = $("#lblContractArea").text();
                        $("#tblStage").empty();
                        $("#ddlRule").empty();
                        $("#liAutoUpdateStatus").css('display', 'none');
                        $("#txtWorkflowTitle").val('Approval for ' + amendmentName);
                        $("#txtDuration").val("");
                        var nicInstance = nicEditors.findEditor('txtComment');
                        nicInstance.setContent('');
                        $("#hdWorkflowType").val("Amendment Approval");
                        $("#hdWorkflowObjectID").val(amendmentID);
                        $("#hdWorkflowObjectTitle").val(amendmentName);
                        GetValuesAndAutoPopulate("ddlWorkflowCC", "");
                        var vWorkflowSettings = [];
                        $.ajax({
                            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Workflow/evaluate?workflowType=Amendment Approval&contractArea=' + encodeURIComponent(contractArea) + '&businessArea=' + encodeURIComponent(businessArea) + '&contractid=' + amendmentID,
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
                                    amendmentWorkflowConflict = vWorkflowSettings.WorkflowConflict;
                                }
                                if (vWorkflowRules.length > 0) {
                                    $(vWorkflowRules).each(function (i, rule) {
                                        $("#ddlRule").append('<option value="' + rule.RuleName + '">' + rule.RuleName + '</option>');
                                    });
                                    if (workflowAdHoc == "on") {
                                        $("#ddlRule").append('<option value="Ad-hoc">Ad-hoc</option>');
                                    }
                                    var workflowRules = vWorkflowRules[0];
                                    $("#ddlRule").find('option[value="' + workflowRules.RuleName + '"]').attr("selected", true);
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
                                            $("#txtWorkflowTitle").val(workflowRules.WorkflowTitle + ' for ' + amendmentName);
                                        } else {
                                            $("#txtWorkflowTitle").val('Approval for ' + amendmentName);
                                        }
                                    }
                                    else {
                                        if (typeof workflowRules.WorkflowTitle != 'undefined' && workflowRules.WorkflowTitle != "") {
                                            $("#txtWorkflowTitle").val(workflowRules.WorkflowTitle + ' for ' + amendmentName);
                                        } else {
                                            $("#txtWorkflowTitle").val('Approval for ' + amendmentName);
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
                                        if (!workflowAdHoc) {
                                            if (amendmentWorkflowConflict != "Pick from possible options") {
                                                $("#ddlRule").attr('disabled', 'disabled');
                                            }
                                        }
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
                                    if (!workflowAdHoc) {
                                        if (amendmentWorkflowConflict != "Pick from possible options") {
                                            $("#ddlRule").attr('disabled', 'disabled');
                                        }
                                    }
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
                                $("#loadingPage").fadeOut();
                                $("#contractDetailsSummaryConfiguration").css('display', 'none');
                                $("#dvWorkflow").dialog("option", "title", "Amendment Approval Workflow");
                                $("#dvWorkflow").dialog("open");
                                $("#dvWorkflow").height("auto");
                            },
                            error: function () {
                                $("#ddlRule").append('<option value="Ad-hoc">Ad-hoc</option>');
                                $("#lblddlRule").css("display", "");
                                $("#ddlRule").css("display", "none");
                                $("#lblddlRule").text("Ad-hoc");
                                if (!workflowAdHoc) {
                                    if (amendmentWorkflowConflict != "Pick from possible options") {
                                        $("#ddlRule").attr('disabled', 'disabled');
                                    }
                                }
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

                                $("#loadingPage").fadeOut();
                                $("#contractDetailsSummaryConfiguration").css('display', 'none');
                                $("#dvWorkflow").dialog("option", "title", "Amendment Approval Workflow");
                                $("#dvWorkflow").dialog("open");
                                $("#dvWorkflow").height("auto");
                            }
                        });
                    }







                }

                break;
            }
    }
}

$('#btnAddAmendmentInline').click(function () {
    if (requiredValidator('amendmentInline')) {
        $("#loadingPage").fadeIn();
        var strContractID = getParameterByName('ContractID');
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/amendments/add',
            type: 'POST',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
            data: {
                ContractID: getParameterByName('ContractID'),
                ContractTitle: $("#lblContractTitle").text(),
                AmendmentTitle: $("#txtAmendmentTitleInline").val(),
                AmendmentDescription: $("#txtAmendmentDescInline").val(),
                CreatedBy: localStorage.UserName,
                ModifiedBy: localStorage.UserName,
            },
            cache: false,
            success: function (person) {
                $("#loadingPage").fadeOut();

                $("#amendmentInline").toggle();
                $("#txtAmendmentTitleInline").val("");
                $("#txtAmendmentDescInline").val("");

                BindAmendments();

                clearTimeout(cleartimevalue2);
                cleartimevalue2 = setTimeout(refreshContractActivities, 10000);
                //GetContractActivities(vContractID);
            },
            error: function (status) {
                $("#loadingPage").fadeOut();
            }
        });
    }
});

//manoj
function deleteamentmentdocumets(dataobj, objid) {
    var documentlength = 0;
    var passdocumenttodelete = dataobj.length;
    $(dataobj).each(function (i, item) {
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?documentid=' + item.RowKey,
            type: 'DELETE',
            dataType: 'json',
            "Content-Type": "application/json",
            headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
            cache: false,
            success: function (data) {
                documentlength++;
                if (passdocumenttodelete == documentlength) {
                    deleteamanetment(objid);
                }
            },
            error: function () {
                documentlength++;
                if (passdocumenttodelete == documentlength) {
                    deleteamanetment(objid);
                }
            },
        });
    });
}

function deleteamanetment(objid) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/amendments?amendmentid=' + objid,
        type: 'DELETE',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
        "Content-Type": "application/json",
        cache: false,
        success: function (data) {
            $("#loadingPage").fadeOut();
            reloadaction();
        },
        error: function () {
            $("#loadingPage").fadeOut();
            reloadaction();
        }
    });
}

function reloadaction() {
    BindAmendments();
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
}
//manoj

$('#btnAddAmendment').click(function () {
    AddAmendmentMore();
});

function AddAmendmentMore() {
    $("#trAttachedDoc").attr("style", "display:none");
    $("#btnSaveAndApproval").css('display', '');
    $("#dvAmendmentMsg").css('display', 'none');
    $("#tblDocu tr").remove();
    $("#txtAmendmentID").val("");
    $("#txtAmendmentTitle").val("");
    $('#txtAmendmentDesc').val("");
    $('#inTD').empty();

    $("#lblCTitleAmend").text($("#lblContractTitle").text());
    $(".validelement").each(function (index, element) {
        $(element).removeClass("error");
        $("#errormsg_" + element.id).remove();
    });
    var businessArea = $("#lblBusinessArea").text();
    var contractArea = $("#lblContractArea").text();

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Workflow/configuration/all?contractArea=' + encodeURIComponent(contractArea) + '&businessArea=' + encodeURIComponent(businessArea),
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        async: false,
        success: function (data) {
            if (businessAreaDetails != null) {
                if (businessAreaDetails.IsContractApprovalForAmd == "Yes") {
                    var contractConfigurations = data.contractConfigurations;
                    if (contractConfigurations[0].InitiationType == "On Create") {
                        $("#btnSaveAndApproval").css('display', 'none');
                        $("#dvAmendmentMsg").css('display', 'block');
                    }
                }
                else {
                    var amendmentConfigurations = data.AmendmentConfigurations;
                    if (typeof amendmentConfigurations[0] != 'undefined') {
                        if (amendmentConfigurations[0].InitiationType == "On Create") {
                            $("#btnSaveAndApproval").css('display', 'none');
                            $("#dvAmendmentMsg").css('display', 'block');
                        }
                    }
                }
            }
            else {
                var amendmentConfigurations = data.AmendmentConfigurations;
                if (typeof amendmentConfigurations[0] != 'undefined') {
                    if (amendmentConfigurations[0].InitiationType == "On Create") {
                        $("#btnSaveAndApproval").css('display', 'none');
                        $("#dvAmendmentMsg").css('display', 'block');
                    }
                }
            }
        }
    });

    GetValuesAndAutoPopulate("ddlRequestedBy", "");

    $("#docAmendment").replaceWith($("#docAmendment").val('').clone(true));

    if (contractItem.ContractTermType == "Evergreen / Perpetual" || contractItem.ContractTermType == "Executed / Performance" || contractItem.EndDate == null) {
        $("#chkContractValidity").attr("disabled", "disabled");
        $("#chkContractValidity").attr("style", "cursor:not-allowed;");
        if ($("#ddlAmendmentType option[value='Change to Terms']").length != -1)
            $("#ddlAmendmentType option[value='Change to Terms']").remove();
    }
    else {
        $("#chkContractValidity").removeAttr('disabled');
        $("#chkContractValidity").attr("style", "cursor:pointer;");
        if ($("#ddlAmendmentType option[value='Change to Terms']").length != 1)
            $("#ddlAmendmentType").append("<option value='Change to Terms'>Change to Terms</option>")
    }

    if (contractItem.TransactionType == "Legal/General Agreement") {
        $("#chkContractValue").attr("disabled", "disabled");
        $("#chkContractValue").attr("style", "cursor:not-allowed;");
        $("#ddlAmendmentType option[value='Change of Contract Value']").remove();
    }
    else {
        $("#chkContractValue").removeAttr('disabled');
        $("#chkContractValue").attr("style", "cursor:pointer;");
        if ($("#ddlAmendmentType option[value='Change of Contract Value']").length != 1)
            $("#ddlAmendmentType").append("<option value='Change of Contract Value'>Change of Contract Value</option>")
    }

    setAmendmenturl();

    $('#dtAmendmentEffectiveDate').val("");
    $("#chkContractValidity").prop('checked', false);
    $("#tblContractValidity").css('display', 'none');
    $("#imgconValidity").attr("title", "Collapse");
    $("#imgconValidity").attr("src", "../Content/Images/e-close.png");
    $('#txtContractEndDateAfterAmend').val("");
    $("#chkUpdateContractValidity").prop('checked', false);
    $('#txtContractValidityNotes').val("");

    $("#chkContractValue").prop('checked', false);
    $("#tblContractValue").css('display', 'none');
    $("#imgconValue").attr("title", "Collapse");
    $("#imgconValue").attr("src", "../Content/Images/e-close.png");
    $('#txtContractValueAfterAmend').val("");
    $("#chkUpdateContractValue").prop('checked', false);
    $('#txtContractValueNotes').val("");

    $("#chkSOW").prop('checked', false);
    $("#tblSOW").css('display', 'none');
    $("#imgconSOW").attr("title", "Collapse");
    $("#imgconSOW").attr("src", "../Content/Images/e-close.png");
    $('#txtSOWCurrent').val("");
    $('#txtSOWAfter').val("");
    $("#chkReplaceDoc").prop('checked', false);
    if (vDefaultAmendment == "Yes") {
        $("#dtAmendmentFinalizedDate").val("");
        $('#trAmendmentCompletedDate').css('display', '');
        $('#trAmendmentCompletedBy').css('display', '');
        $('input[type="radio"][name="AmendmentFinalized"][value="Yes"]').prop('checked', true);
        $("#dtAmendmentFinalizedDate").addClass("validelement");
    }
    else {
        $("#dtAmendmentFinalizedDate").val("");
        $('#trAmendmentCompletedDate').css('display', 'none');
        $('#trAmendmentCompletedBy').css('display', 'none');
        $('input[type="radio"][name="AmendmentFinalized"][value="No"]').prop('checked', true);
        $("#dtAmendmentFinalizedDate").removeClass("validelement");
    }
    if ($("#hdnStartDate").val() == "" || $("#hdnStartDate").val() == undefined)
        $("#hdnStartDate").val(contractItem.StartDate);
    var startdate = new Date($("#hdnStartDate").text());
    $("#txtContractEndDateAfterAmend").datepicker("option", "minDate", startdate);
    $("#dtAmendmentEffectiveDate").datepicker("option", "minDate", startdate);
    $("#dtAmendmentFinalizedDate").datepicker("option", "minDate", startdate);
    $("#dtAmendmentFinalizedDate").datepicker("option", "maxDate", new Date());

    if ($("input[type=radio][name=AmendmentFinalized]:checked").val() == "Yes") {
        $('#trAmendmentCompletedDate').css('display', '');
        $('#trAmendmentCompletedBy').css('display', '');
        $('#trAmendmentEffectiveDate').css('display', '');
    } else {
        $('#trAmendmentEffectiveDate').css('display', 'none');
        $('#trAmendmentCompletedDate').css('display', 'none');
        $('#trAmendmentCompletedBy').css('display', 'none');
        $("#dtAmendmentEffectiveDate").val('');
        $("#txtAmendmentFinalizedBy").val('');
        $("#dtAmendmentFinalizedDate").val('');
    }

    //$("#ddlAmendmentType option").val(function (idx, val) {
    //    $(this).siblings("[value='" + val + "']").remove();
    //});

    $("#ddlAmendmentType").val("0");
    $("#addEditAmendment").dialog("option", "title", "New Amendment");
    $("#addEditAmendment").dialog("open");



    if (vCurrencyDisplayStyle == "UK") {
        $('#txtContractValueAfterAmend').autoNumeric('init');
    } else if (vCurrencyDisplayStyle == "CAN") {
        $('#txtContractValueAfterAmend').autoNumeric('init', { aSep: ' ', aDec: '.' });
    } else if (vCurrencyDisplayStyle == "EU") {
        $('#txtContractValueAfterAmend').autoNumeric('init', { aSep: '.', aDec: ',' });
    }
}

function ViewAmendment(amendmentID) {
    $("#loadingPage").fadeIn();
    $('#tblAmendmentMetadataDetail').html('<tr><td><img src="../Content/Images/icon/loading.gif"/></td></tr>');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/amendments/amendmentdetails?amendmentid=' + amendmentID,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        "Content-Type": "application/json",
        cache: false,
        success: function (amendmententity) {

            var vMetadata = '<tr>';
            vMetadata += '<td class="text_label width50">Amendment Title</td>';
            vMetadata += '<td class="text width50" style="word-break: break-all; padding-right: 22px;">' + amendmententity.AmendmentTitle + '</td>'; //eO39885
            vMetadata += '</tr>';
            vMetadata += '<tr>';
            vMetadata += '<td class="text_label width50">Amendment Type</td>';
            vMetadata += '<td class="text width50" style="word-break: break-all; padding-right: 22px;">' + amendmententity.AmendmentType + '</td>';
            vMetadata += '</tr>';
            vMetadata += '<tr>';
            vMetadata += '<td class="text_label width50">Reason for Amendment</td>';
            vMetadata += '<td class="text width50" style="word-break: break-all; padding-right: 22px;">' + amendmententity.AmendmentDescription + '</td>'; //eO39885
            vMetadata += '</tr>';
            //eO310082
            vMetadata += '<tr>';
            vMetadata += '<td class="text_label width40">Requested / Initiated By</td>';
            vMetadata += '<td class="text width60" style="word-break: break-all; padding-right: 22px;">' + amendmententity.RequestedBy + '</td>';
            vMetadata += '</tr>';
            vMetadata += '<tr>';
            vMetadata += '<td class="text_label width40">Amendment Finalized?</td>';
            vMetadata += '<td class="text width60">';
            if (amendmententity.AmendmentFinalized != '') {
                vMetadata += amendmententity.AmendmentFinalized;
            }
            vMetadata += '</td>';
            vMetadata += '</tr>';
            vMetadata += '<tr>';
            vMetadata += '<td class="text_label width40">Amendment Finalized Date</td>';
            vMetadata += '<td class="text width60">';
            if (amendmententity.AmendmentFinalizedDate != null && amendmententity.AmendmentFinalizedDate != '') {
                var completedate = "";

                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                { completedate = amendmententity.AmendmentFinalizedDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'); }
                else {
                    if (localStorage.AppDateFormat == 'DD/MM/YYYY') { completedate = amendmententity.AmendmentFinalizedDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1'); }
                    else if (localStorage.AppDateFormat == 'MM/DD/YYYY') { completedate = amendmententity.AmendmentFinalizedDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'); }
                }
                vMetadata += completedate;
            }
            else {
                vMetadata += '-';
            }
            vMetadata += '</td>';
            vMetadata += '</tr>';

            vMetadata += '<tr>';
            vMetadata += '<td class="text_label width40">Amendment Finalized by</td>';
            vMetadata += '<td class="text width60" style="word-break: break-all; padding-right: 22px;">'; //eO39885
            if (amendmententity.AmendmentFinalizedBy != '') {
                vMetadata += amendmententity.AmendmentFinalizedBy;
            }
            vMetadata += '</td>';
            vMetadata += '</tr>';

            //eO310082
            //vMetadata += '<tr>';
            //vMetadata += '<td class="text_label width40">Amendment Completed</td>';
            //vMetadata += '<td class="text width60">';
            //if (amendmententity.AmendmentCompleted != '') {
            //    vMetadata += amendmententity.AmendmentCompleted;
            //}
            //vMetadata += '</td>';
            //vMetadata += '</tr>';
            //vMetadata += '<tr>';
            //vMetadata += '<td class="text_label width40">Completed Date</td>';
            //vMetadata += '<td class="text width60">';
            //if (amendmententity.AmendmentCompletedDate != null && amendmententity.AmendmentCompletedDate != '') {
            //    var completedate = "";

            //    if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
            //    { completedate = amendmententity.AmendmentCompletedDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'); }
            //    else {
            //        if (localStorage.AppDateFormat == 'DD/MM/YYYY') { completedate = amendmententity.AmendmentCompletedDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1'); }
            //        else if (localStorage.AppDateFormat == 'MM/DD/YYYY') { completedate = amendmententity.AmendmentCompletedDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'); }
            //    }
            //    vMetadata += completedate;
            //}
            //vMetadata += '</td>';
            //vMetadata += '</tr>';
            if (amendmententity.EffectiveDate != null) {
                vMetadata += '<tr>';
                vMetadata += '<td class="text_label width50">Start/ Effective Date of Amendment</td>';

                var fEffectiveDate = "";
                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                    if (getTimeZone().indexOf('+') > -1)
                        fEffectiveDate = moment(new Date(amendmententity.EffectiveDate)).format('MM/DD/YYYY');
                    else if (getTimeZone().indexOf('+00:00') > -1 || getTimeZone().indexOf('-') > -1)
                        fEffectiveDate = moment(new Date(amendmententity.EffectiveDate)).utc().format('MM/DD/YYYY');
                }
                else {
                    if (getTimeZone().indexOf('+') > -1)
                        fEffectiveDate = moment(new Date(amendmententity.EffectiveDate)).format(localStorage.AppDateFormat);
                    else if (getTimeZone().indexOf('+00:00') > -1 || getTimeZone().indexOf('-') > -1)
                        fEffectiveDate = moment(new Date(amendmententity.EffectiveDate)).utc().format(localStorage.AppDateFormat);
                }
                vMetadata += '<td class="text width50">' + fEffectiveDate + '</td>';
                vMetadata += '</tr>';
            }
            if (amendmententity.IsContractValidityEnabled == "Yes") {
                if (amendmententity.ContractEndDateAfterAmendment != null) {
                    vMetadata += '<tr>';
                    vMetadata += '<td class="text_label width50">Contract End Date(After Amendment)</td>';

                    var fContractEndDateAfterAmendment = "";
                    if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                        if (getTimeZone().indexOf('+') > -1)
                            fContractEndDateAfterAmendment = moment(new Date(amendmententity.ContractEndDateAfterAmendment)).format('MM/DD/YYYY');
                        else if (getTimeZone().indexOf('+00:00') > -1 || getTimeZone().indexOf('-') > -1)
                            fContractEndDateAfterAmendment = moment(new Date(amendmententity.ContractEndDateAfterAmendment)).utc().format('MM/DD/YYYY');
                    }
                    else {
                        if (getTimeZone().indexOf('+') > -1)
                            fContractEndDateAfterAmendment = moment(new Date(amendmententity.ContractEndDateAfterAmendment)).format(localStorage.AppDateFormat);
                        else if (getTimeZone().indexOf('+00:00') > -1 || getTimeZone().indexOf('-') > -1)
                            fContractEndDateAfterAmendment = moment(new Date(amendmententity.ContractEndDateAfterAmendment)).utc().format(localStorage.AppDateFormat);
                    }
                    vMetadata += '<td class="text width50">' + fContractEndDateAfterAmendment + '</td>';
                    vMetadata += '</tr>';
                }
                vMetadata += '<tr>';
                vMetadata += '<td class="text_label width50">Update (after approval) Contract Record metadata & Milestones</td>';
                vMetadata += '<td class="text width50">' + amendmententity.UpdateContractEndDate + '</td>';
                vMetadata += '</tr>';
                vMetadata += '<tr>';
                vMetadata += '<td class="text_label width50">Contract Validity Notes</td>';
                vMetadata += '<td class="text width50">' + amendmententity.ContractValidityNotes + '</td>';
                vMetadata += '</tr>';
            }

            if (amendmententity.IsContractValueEnabled == "Yes") {
                vMetadata += '<tr>';
                vMetadata += '<td class="text_label width50">Contract Value(After Amendment)</td>';
                vMetadata += '<td class="text width50">' + amendmententity.ContractValueAfterAmendment + '</td>';
                vMetadata += '</tr>';
                vMetadata += '<tr>';
                vMetadata += '<td class="text_label width50">Update (after approval) Contract Value in Contract Record</td>';
                vMetadata += '<td class="text width50">' + amendmententity.UpdateContractValue + '</td>';
                vMetadata += '</tr>';
                vMetadata += '<tr>';
                vMetadata += '<td class="text_label width50">Funding Source Name</td>';
                vMetadata += '<td class="text width50" style="word-break: break-all; padding-right: 22px;">' + amendmententity.FunderOrAccountName + '</td>'; //eO39885
                vMetadata += '</tr>';
                vMetadata += '<tr>';
                vMetadata += '<td class="text_label width50">Funding Source Number</td>';
                vMetadata += '<td class="text width50" style="word-break: break-all; padding-right: 22px;">' + amendmententity.FunderOrAccountNumber + '</td>'; //eO39885
                vMetadata += '</tr>';
                vMetadata += '<tr>';
                vMetadata += '<td class="text_label width50">Contract Value Notes</td>';
                vMetadata += '<td class="text width50" style="word-break: break-all; padding-right: 22px;">' + amendmententity.ContractValueNotes + '</td>'; //eO39885
                vMetadata += '</tr>';
            }

            if (amendmententity.IsSOWEnabled == "Yes") {
                vMetadata += '<tr>';
                vMetadata += '<td class="text_label width50">Summary of SOW/Obligation/Commitment(After Amendment)</td>';
                vMetadata += '<td class="text width50" style="word-break: break-all; padding-right: 22px;">' + amendmententity.SummaryOfSOWAfterAmendment + '</td>'; //eO39885
                vMetadata += '</tr>';
            }

            //get amendment documents
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/amendments/documents?amendmentid=' + amendmentID,
                type: 'GET',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey },
                "Content-Type": "application/json",
                cache: false,
                success: function (data) {
                    var htmlDocu = "";
                    if (data.length > 0) {
                        $(data).each(function (i, item) {
                            htmlDocu += "<tr>";
                            htmlDocu += "<td>";
                            htmlDocu += "<a href='" + item.DocumentUrl + "' style='border-bottom: 1px dotted;color: #3F91CC !important;font-size: 12px !important;'>";
                            htmlDocu += item.DocumentName;
                            htmlDocu += "</a>";
                            htmlDocu += "</td>";
                            htmlDocu += "</tr>";
                        });
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40">Attached Documents</td>';
                        vMetadata += '<td class="text width60"><table  class="width100" cellpadding="2" cellspacing="2">' + htmlDocu + '</table></td>';
                        vMetadata += '</tr>';
                    } else {
                        vMetadata += '<tr><td class="text_label width40">Attached Documents</td><td style="font-size:13px;">No items found.</td></tr>';
                    }
                    $("#loadingPage").fadeOut();
                }, error: function (data) {
                    vMetadata += '<tr><td class="text_label width40">Attached Documents</td><td style="font-size:13px;">No items found.</td></tr>';
                    $("#loadingPage").fadeOut();
                }, complete: function (data) {
                    $("#tblAmendmentMetadataDetail").html(vMetadata);
                    setBlankValueToHyphen("tblAmendmentMetadataDetail");
                    $("#viewAmendmentMetadataDetail").dialog("option", "title", "Amendment Details");
                    $("#viewAmendmentMetadataDetail").dialog("open");
                    $("#loadingPage").fadeOut();
                }
            });

        },
        error: function () {
            $("#loadingPage").fadeOut();
        },
        complete: function () {

        }
    });
}

function CheckAmendmentDocumentExist() {
    var isExist = false;
    var vDocURL = "";
    var totalFileCount = $("#inTD").children("div").length;
    ExitDocuemntName = "";
    if ($("#txtNewFolderNameAmend").is(":visible")) {
        isExist = false;
    }
    else {
        var childtfl = false;
        for (var tfl = 1; tfl < totalFileCount + 1; tfl++) {
            if ($('#file' + tfl)[0].files.length > 0) {
                childtfl = true;
            }
        }
        if ($('#docAmendment')[0].files.length > 0 || childtfl) {
            var lastcharfind = $('#lblFolderUrlAmend').text();
            lastcharfind = lastcharfind.substr(lastcharfind.length - 1)
            if (lastcharfind != "/") {
                vDocURL = localStorage.SPHostUrl + $('#lblFolderUrlAmend').text() + "/";
            } else {
                vDocURL = localStorage.SPHostUrl + $('#lblFolderUrlAmend').text();
            }
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?contractid=' + vContractID,
                type: 'GET',
                dataType: 'json',
                'Content-Type': 'application/json',
                cache: false,
                async: false,
                headers: { 'eContracts-ApiKey': localStorage.APIKey },
                success: function (folder) {
                    for (var fol = 0; fol < (totalFileCount + 1) ; fol++) {
                        if (fol == 0) {
                            if ($('#docAmendment')[0].files.length > 0) {
                                var urltosearch = vDocURL + $('#docAmendment')[0].files[0].name;
                                var vAccFeat = $.grep(folder, function (n, i) {
                                    return (n.DocumentUrl == urltosearch);
                                });
                                if (vAccFeat.length > 0) {
                                    AmendmentidtoPass = vAccFeat[0].AmendmentID;
                                    isExist = true;
                                    if (ExitDocuemntName == "") {
                                        ExitDocuemntName = $('#docAmendment')[0].files[0].name;
                                    } else {
                                        ExitDocuemntName += "," + $('#docAmendment')[0].files[0].name
                                    }
                                }
                            }
                        }
                        else {
                            if ($('#file' + fol)[0].files.length > 0) {
                                var urltosearch = vDocURL + $('#file' + fol)[0].files[0].name;
                                var vAccFeat = $.grep(folder, function (n, i) {
                                    return (n.DocumentUrl == urltosearch);
                                });
                                if (vAccFeat.length > 0) {
                                    AmendmentidtoPass = vAccFeat[0].AmendmentID;
                                    isExist = true;
                                    if (ExitDocuemntName == "") {
                                        ExitDocuemntName = $('#file' + fol)[0].files[0].name;
                                    } else {
                                        ExitDocuemntName += "," + $('#file' + fol)[0].files[0].name
                                    }
                                }
                            }
                        }
                    }
                },
                error:
                    function (data) {
                        isExist = false;
                        AmendmentidtoPass = "";
                    }
            });
        }
    }
    return isExist;
}

function amendmentsucessbinding() {
    if (amendmentcompletedchecking == true) {
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?contractid=' + getParameterByName("ContractID"),
            type: 'GET',
            cache: false,
            contentType: false,
            headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID },
            processData: false,
            success: function (item) {
                //if (item.ContractValue != "0") {
                //    $("#lblContractValue").text("Not available");
                //    $("#txtContractValueCurrent").val("Not Available");
                //    $("#lblContractCurrency").text("");

                //    $.ajax({
                //        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/settings',
                //        type: 'GET',
                //        dataType: 'json',
                //        headers: { 'eContracts-ApiKey': localStorage.APIKey },
                //        cache: false,
                //        success: function (data) {
                //            if (data.CurrencyDisplayStyle == "UK") {
                //                $('#txtContractValueAfterAmend').autoNumeric('init');
                //                vCurrencyDisplayStyle = "UK";
                //            } else if (data.CurrencyDisplayStyle == "CAN") {
                //                $('#txtContractValueAfterAmend').autoNumeric('init', { aSep: ' ', aDec: '.' });
                //                vCurrencyDisplayStyle = "CAN";
                //            } else if (data.CurrencyDisplayStyle == "EU") {
                //                $('#txtContractValueAfterAmend').autoNumeric('init', { aSep: '.', aDec: ',' });
                //                vCurrencyDisplayStyle = "EU";
                //            }
                //            $("#loadingPage").fadeOut();
                //        }
                //    });

                //} else {
                if (item != null) {
                    $("#hdnContractValue").text(item.ContractValue);
                    $("#hdnContractCurrency").text(item.ContractCurrency);
                    $("#hdnBaseContractValue").text(item.BaseContractValue);
                    $("#hdnBaseContractCurrency").text(item.BaseContractValueCurrency);
                }

                GetContractValueSetting(item);
                amendmentcompletedchecking = false;
                //}
            },
            error:
                       function (data) {
                           $("#loadingPage").fadeOut();
                       }
        });
    }
    else {
        $("#loadingPage").fadeOut();
    }
}

//check amendmant title start
function CheckAmendmentTitle(amnedmentid, amnedmenttitle) {
    var returnvalue = false;
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/amendments?contractid=' + vContractID,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        async: false,
        success: function (AmendmentCollection) {
            var vAccFeat;
            if (typeof (AmendmentCollection) != "undefined") {
                vAccFeat = $.grep(AmendmentCollection, function (n, i) {
                    return (n.AmendmentTitle.toLowerCase() == amnedmenttitle.trim().toLowerCase());
                });
            }
            if (vAccFeat.length > 0) {
                if (amnedmentid != null && amnedmentid != "") {
                    vAccFeat = $.grep(vAccFeat, function (n, i) {
                        return (n.RowKey == amnedmentid.trim());
                    });
                    if (vAccFeat.length > 0) {
                        returnvalue = false;
                    } else {
                        returnvalue = true;
                    }
                } else {
                    returnvalue = true;
                }
            }
        },
        error: function (request) {
        }
    });
    return returnvalue;
}

//manoj
function CheckAmendmentEffectivedate(amnedmentid, amendmenttype) {
    var returnvalue = false;
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/amendments?contractid=' + vContractID,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        async: false,
        success: function (AmendmentCollection) {
            //manoj
            var effectivedateamdvalue = $.datepicker.formatDate('mm/dd/yy', $("#dtAmendmentEffectiveDate").datepicker('getDate'))
            //manoj
            var vAccFeat = $.grep(AmendmentCollection, function (n, i) {
                return (moment(new Date(n.EffectiveDate)).format('MM/DD/YYYY') == effectivedateamdvalue && n.AmendmentType == amendmenttype);
            });
            if (vAccFeat.length > 0) {
                if (amnedmentid != null && amnedmentid != "") {
                    vAccFeat = $.grep(vAccFeat, function (n, i) {
                        return (n.RowKey == amnedmentid.trim());
                    });
                    if (vAccFeat.length > 0) {
                        returnvalue = false;
                    } else {
                        returnvalue = true;
                    }
                } else {
                    returnvalue = true;
                }
            }
        },
        error: function (request) {
        }
    });
    return returnvalue;
}
//manoj

function setAmendmenturl() {
    if (contractItem.AmendmentDocumentsUrl != "") {
        $('#lblFolderUrlAmend').text(contractItem.AmendmentDocumentsUrl)
        $('#txtNewFolderNameAmend').css('display', 'none');
        $('#txtNewFolderNameAmend').removeClass('validelement');
    } else {
        if (contractItem.ContractDocumentsUrl == "") {
            var headerid = $("#lblContractTitle").text();
            headerid = headerid.replace(/[\*\|\,\"\:\<\>\[\}\{\}\'\(\)\&\#\%\.\-\!]/g, '').replace(/\//g, '').replace(/\s\s+/g, " ").trim();
            var finalurl = "";
            finalurl = ($('#hdContAreaDocLibName').val() != null && $('#hdContAreaDocLibName').val() != "") ? $('#hdContAreaDocLibName').val() : '/Contract Documents/';
            finalurl = (finalurl.charAt(0) != '/') ? '/' + finalurl.trim() : finalurl.trim();
            finalurl = ((finalurl.substr(finalurl.length - 1)) != "/") ? finalurl + "/" : finalurl;
            if (typeof ($('#showAll').text()) != "undefined" && $('#showAll').text() != null && $('#showAll').text() != "") {
                $("#lblFolderUrlAmend").text(finalurl + $('#showAll').text().replace(/ \/ /g, '/') + '/');
                $('#txtNewFolderNameAmend').val("Amendments");
            }
            else {
                $('#lblFolderUrlAmend').text(finalurl + headerid.trim() + "/");
                $('#txtNewFolderNameAmend').val("Amendments");
            }
        } else {
            if ((contractItem.ContractDocumentsUrl.charAt(contractItem.ContractDocumentsUrl.length - 1)) != "/") {
                $('#lblFolderUrlAmend').text(contractItem.ContractDocumentsUrl + "/");
            } else {
                $('#lblFolderUrlAmend').text(contractItem.ContractDocumentsUrl);
            }
            $('#txtNewFolderNameAmend').val("Amendments");
        }
        $('#txtNewFolderNameAmend').addClass('validelement');
    }
}

function refreshContractActivities() {

    GetContractActivities(vContractID);

}
//check amendmant title end

function StartAmendmentApproval(AmendmentName, AmendmentID, AmendmentApprovalWorkflow) {
    $(".FL_ApprovalSheetContract").css('display', 'none');
    var amendmentName = AmendmentName;
    var amendmentID = AmendmentID;
    var amendmentApprovalWorkflow = AmendmentApprovalWorkflow;
    $("#txtWorkflowTitle").prop('readonly', false);
    if (amendmentApprovalWorkflow == "In Progress") {
        var oWorkflowID = "";
        if (ArrayofAmendmentWorkflows.length > 0) {
            var relatedcon = $.grep(ArrayofAmendmentWorkflows, function (itemR) {
                return itemR.AmendmentID == amendmentID
            });
            if (relatedcon.length > 0) {
                $("#alertText1").html("Amendment Approval is in progress for this amendment.");
                $("#textingdetails").html('<a target="_blank" title="View Workflow Details" href=/Activity/TaskDetails?TaskID=&WorkflowID=' + relatedcon[0].id + '><font color="#44A6D8">View Workflow Details</font></a>');
                $("#dvAlertDetails1").dialog("open");
            }
            else {
                $("#loadingPage").fadeIn();
                var businessArea = $("#lblBusinessArea").text();
                var contractArea = $("#lblContractArea").text();
                $("#tblStage").empty();
                $("#ddlRule").empty();
                $("#liAutoUpdateStatus").css('display', 'none');
                $("#txtWorkflowTitle").val('Approval for ' + amendmentName);
                $("#txtDuration").val("");
                var nicInstance = nicEditors.findEditor('txtComment');
                nicInstance.setContent('');
                $("#hdWorkflowType").val("Amendment Approval");
                $("#hdWorkflowObjectID").val(amendmentID);
                $("#hdWorkflowObjectTitle").val(amendmentName);
                GetValuesAndAutoPopulate("ddlWorkflowCC", "");
                var vWorkflowSettings = [];
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Workflow/evaluate?workflowType=Amendment Approval&contractArea=' + encodeURIComponent(contractArea) + '&businessArea=' + encodeURIComponent(businessArea) + '&contractid=' + amendmentID,
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
                            amendmentWorkflowConflict = vWorkflowSettings.WorkflowConflict;
                        }
                        if (vWorkflowRules.length > 0) {
                            $(vWorkflowRules).each(function (i, rule) {
                                $("#ddlRule").append('<option value="' + rule.RuleName + '">' + rule.RuleName + '</option>');
                            });
                            if (workflowAdHoc == "on") {
                                $("#ddlRule").append('<option value="Ad-hoc">Ad-hoc</option>');
                            }
                            var workflowRules = vWorkflowRules[0];
                            $("#ddlRule").find('option[value="' + workflowRules.RuleName + '"]').attr("selected", true);
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
                                    $("#txtWorkflowTitle").val(workflowRules.WorkflowTitle + ' for ' + amendmentName);
                                } else {
                                    $("#txtWorkflowTitle").val('Approval for ' + amendmentName);
                                }
                            }
                            else {
                                if (typeof workflowRules.WorkflowTitle != 'undefined' && workflowRules.WorkflowTitle != "") {
                                    $("#txtWorkflowTitle").val(workflowRules.WorkflowTitle + ' for ' + amendmentName);
                                } else {
                                    $("#txtWorkflowTitle").val('Approval for ' + amendmentName);
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
                                if (!workflowAdHoc) {
                                    if (amendmentWorkflowConflict != "Pick from possible options") {
                                        $("#ddlRule").attr('disabled', 'disabled');
                                    }
                                }
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
                            if (!workflowAdHoc) {
                                if (amendmentWorkflowConflict != "Pick from possible options") {
                                    $("#ddlRule").attr('disabled', 'disabled');
                                }
                            }
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
                        $("#loadingPage").fadeOut();
                        $("#contractDetailsSummaryConfiguration").css('display', 'none');
                        $("#dvWorkflow").dialog("option", "title", "Amendment Approval Workflow");
                        $("#dvWorkflow").dialog("open");
                        $("#dvWorkflow").height("auto");
                    },
                    error: function () {
                        $("#ddlRule").append('<option value="Ad-hoc">Ad-hoc</option>');
                        $("#lblddlRule").css("display", "");
                        $("#ddlRule").css("display", "none");
                        $("#lblddlRule").text("Ad-hoc");
                        if (!workflowAdHoc) {
                            if (amendmentWorkflowConflict != "Pick from possible options") {
                                $("#ddlRule").attr('disabled', 'disabled');
                            }
                        }
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

                        $("#loadingPage").fadeOut();
                        $("#contractDetailsSummaryConfiguration").css('display', 'none');
                        $("#dvWorkflow").dialog("option", "title", "Amendment Approval Workflow");
                        $("#dvWorkflow").dialog("open");
                        $("#dvWorkflow").height("auto");
                    }
                });
            }
        }
        else {
            $("#loadingPage").fadeIn();
            var businessArea = $("#lblBusinessArea").text();
            var contractArea = $("#lblContractArea").text();
            $("#tblStage").empty();
            $("#ddlRule").empty();
            $("#liAutoUpdateStatus").css('display', 'none');
            $("#txtWorkflowTitle").val('Approval for ' + amendmentName);
            $("#txtDuration").val("");
            var nicInstance = nicEditors.findEditor('txtComment');
            nicInstance.setContent('');
            $("#hdWorkflowType").val("Amendment Approval");
            $("#hdWorkflowObjectID").val(amendmentID);
            $("#hdWorkflowObjectTitle").val(amendmentName);
            GetValuesAndAutoPopulate("ddlWorkflowCC", "");
            var vWorkflowSettings = [];
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Workflow/evaluate?workflowType=Amendment Approval&contractArea=' + encodeURIComponent(contractArea) + '&businessArea=' + encodeURIComponent(businessArea) + '&contractid=' + amendmentID,
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
                        amendmentWorkflowConflict = vWorkflowSettings.WorkflowConflict;
                    }
                    if (vWorkflowRules.length > 0) {
                        $(vWorkflowRules).each(function (i, rule) {
                            $("#ddlRule").append('<option value="' + rule.RuleName + '">' + rule.RuleName + '</option>');
                        });
                        if (workflowAdHoc == "on") {
                            $("#ddlRule").append('<option value="Ad-hoc">Ad-hoc</option>');
                        }
                        var workflowRules = vWorkflowRules[0];
                        $("#ddlRule").find('option[value="' + workflowRules.RuleName + '"]').attr("selected", true);
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
                                $("#txtWorkflowTitle").val(workflowRules.WorkflowTitle + ' for ' + amendmentName);
                            } else {
                                $("#txtWorkflowTitle").val('Approval for ' + amendmentName);
                            }
                        }
                        else {
                            if (typeof workflowRules.WorkflowTitle != 'undefined' && workflowRules.WorkflowTitle != "") {
                                $("#txtWorkflowTitle").val(workflowRules.WorkflowTitle + ' for ' + amendmentName);
                            } else {
                                $("#txtWorkflowTitle").val('Approval for ' + amendmentName);
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
                            if (!workflowAdHoc) {
                                if (amendmentWorkflowConflict != "Pick from possible options") {
                                    $("#ddlRule").attr('disabled', 'disabled');
                                }
                            }
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
                        if (!workflowAdHoc) {
                            if (amendmentWorkflowConflict != "Pick from possible options") {
                                $("#ddlRule").attr('disabled', 'disabled');
                            }
                        }
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
                    $("#loadingPage").fadeOut();
                    $("#contractDetailsSummaryConfiguration").css('display', 'none');
                    $("#dvWorkflow").dialog("option", "title", "Amendment Approval Workflow");
                    $("#dvWorkflow").dialog("open");
                    $("#dvWorkflow").height("auto");
                },
                error: function () {
                    $("#ddlRule").append('<option value="Ad-hoc">Ad-hoc</option>');
                    $("#lblddlRule").css("display", "");
                    $("#ddlRule").css("display", "none");
                    $("#lblddlRule").text("Ad-hoc");
                    if (!workflowAdHoc) {
                        if (amendmentWorkflowConflict != "Pick from possible options") {
                            $("#ddlRule").attr('disabled', 'disabled');
                        }
                    }
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

                    $("#loadingPage").fadeOut();
                    $("#contractDetailsSummaryConfiguration").css('display', 'none');
                    $("#dvWorkflow").dialog("option", "title", "Amendment Approval Workflow");
                    $("#dvWorkflow").dialog("open");
                    $("#dvWorkflow").height("auto");
                }
            });

        }

    }
    else {
        if (ArrayofAmendmentWorkflows.length > 0) {
            var relatedcon = $.grep(ArrayofAmendmentWorkflows, function (itemR) {
                return itemR.AmendmentID == amendmentID
            });
            if (relatedcon.length > 0) {
                $("#alertText1").html("Amendment Approval is in progress for this amendment.");
                $("#textingdetails").html('<a target="_blank" title="View Workflow Details" href=/Activity/TaskDetails?TaskID=&WorkflowID=' + relatedcon[0].id + '><font color="#44A6D8">View Workflow Details</font></a>');
                $("#dvAlertDetails1").dialog("open");
            }
            else {
                $("#loadingPage").fadeIn();
                var businessArea = $("#lblBusinessArea").text();
                var contractArea = $("#lblContractArea").text();
                $("#tblStage").empty();
                $("#ddlRule").empty();
                $("#liAutoUpdateStatus").css('display', 'none');
                $("#txtWorkflowTitle").val('Approval for ' + amendmentName);
                $("#txtDuration").val("");
                var nicInstance = nicEditors.findEditor('txtComment');
                nicInstance.setContent('');
                $("#hdWorkflowType").val("Amendment Approval");
                $("#hdWorkflowObjectID").val(amendmentID);
                $("#hdWorkflowObjectTitle").val(amendmentName);
                GetValuesAndAutoPopulate("ddlWorkflowCC", "");
                var vWorkflowSettings = [];
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Workflow/evaluate?workflowType=Amendment Approval&contractArea=' + encodeURIComponent(contractArea) + '&businessArea=' + encodeURIComponent(businessArea) + '&contractid=' + amendmentID,
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
                            amendmentWorkflowConflict = vWorkflowSettings.WorkflowConflict;
                        }
                        if (vWorkflowRules.length > 0) {
                            $(vWorkflowRules).each(function (i, rule) {
                                $("#ddlRule").append('<option value="' + rule.RuleName + '">' + rule.RuleName + '</option>');
                            });
                            if (workflowAdHoc == "on") {
                                $("#ddlRule").append('<option value="Ad-hoc">Ad-hoc</option>');
                            }
                            var workflowRules = vWorkflowRules[0];
                            $("#ddlRule").find('option[value="' + workflowRules.RuleName + '"]').attr("selected", true);
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
                                    $("#txtWorkflowTitle").val(workflowRules.WorkflowTitle + ' for ' + amendmentName);
                                } else {
                                    $("#txtWorkflowTitle").val('Approval for ' + amendmentName);
                                }
                            }
                            else {
                                if (typeof workflowRules.WorkflowTitle != 'undefined' && workflowRules.WorkflowTitle != "") {
                                    $("#txtWorkflowTitle").val(workflowRules.WorkflowTitle + ' for ' + amendmentName);
                                } else {
                                    $("#txtWorkflowTitle").val('Approval for ' + amendmentName);
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
                                if (!workflowAdHoc) {
                                    if (amendmentWorkflowConflict != "Pick from possible options") {
                                        $("#ddlRule").attr('disabled', 'disabled');
                                    }
                                }
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
                            if (!workflowAdHoc) {
                                if (amendmentWorkflowConflict != "Pick from possible options") {
                                    $("#ddlRule").attr('disabled', 'disabled');
                                }
                            }
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
                        $("#loadingPage").fadeOut();
                        $("#contractDetailsSummaryConfiguration").css('display', 'none');
                        $("#dvWorkflow").dialog("option", "title", "Amendment Approval Workflow");
                        $("#dvWorkflow").dialog("open");
                        $("#dvWorkflow").height("auto");
                    },
                    error: function () {
                        $("#ddlRule").append('<option value="Ad-hoc">Ad-hoc</option>');
                        $("#lblddlRule").css("display", "");
                        $("#ddlRule").css("display", "none");
                        $("#lblddlRule").text("Ad-hoc");
                        if (!workflowAdHoc) {
                            if (amendmentWorkflowConflict != "Pick from possible options") {
                                $("#ddlRule").attr('disabled', 'disabled');
                            }
                        }
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

                        $("#loadingPage").fadeOut();
                        $("#contractDetailsSummaryConfiguration").css('display', 'none');
                        $("#dvWorkflow").dialog("option", "title", "Amendment Approval Workflow");
                        $("#dvWorkflow").dialog("open");
                        $("#dvWorkflow").height("auto");
                    }
                });
            }
        }
        else {
            $("#loadingPage").fadeIn();
            var businessArea = $("#lblBusinessArea").text();
            var contractArea = $("#lblContractArea").text();
            $("#tblStage").empty();
            $("#ddlRule").empty();
            $("#liAutoUpdateStatus").css('display', 'none');
            $("#txtWorkflowTitle").val('Approval for ' + amendmentName);
            $("#txtDuration").val("");
            var nicInstance = nicEditors.findEditor('txtComment');
            nicInstance.setContent('');
            $("#hdWorkflowType").val("Amendment Approval");
            $("#hdWorkflowObjectID").val(amendmentID);
            $("#hdWorkflowObjectTitle").val(amendmentName);
            GetValuesAndAutoPopulate("ddlWorkflowCC", "");
            var vWorkflowSettings = [];
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Workflow/evaluate?workflowType=Amendment Approval&contractArea=' + encodeURIComponent(contractArea) + '&businessArea=' + encodeURIComponent(businessArea) + '&contractid=' + amendmentID,
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
                        amendmentWorkflowConflict = vWorkflowSettings.WorkflowConflict;
                    }
                    if (vWorkflowRules.length > 0) {
                        $(vWorkflowRules).each(function (i, rule) {
                            $("#ddlRule").append('<option value="' + rule.RuleName + '">' + rule.RuleName + '</option>');
                        });
                        if (workflowAdHoc == "on") {
                            $("#ddlRule").append('<option value="Ad-hoc">Ad-hoc</option>');
                        }
                        var workflowRules = vWorkflowRules[0];
                        $("#ddlRule").find('option[value="' + workflowRules.RuleName + '"]').attr("selected", true);
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
                                $("#txtWorkflowTitle").val(workflowRules.WorkflowTitle + ' for ' + amendmentName);
                            } else {
                                $("#txtWorkflowTitle").val('Approval for ' + amendmentName);
                            }
                        }
                        else {
                            if (typeof workflowRules.WorkflowTitle != 'undefined' && workflowRules.WorkflowTitle != "") {
                                $("#txtWorkflowTitle").val(workflowRules.WorkflowTitle + ' for ' + amendmentName);
                            } else {
                                $("#txtWorkflowTitle").val('Approval for ' + amendmentName);
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
                            if (!workflowAdHoc) {
                                if (amendmentWorkflowConflict != "Pick from possible options") {
                                    $("#ddlRule").attr('disabled', 'disabled');
                                }
                            }
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
                        if (!workflowAdHoc) {
                            if (amendmentWorkflowConflict != "Pick from possible options") {
                                $("#ddlRule").attr('disabled', 'disabled');
                            }
                        }
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
                    $("#loadingPage").fadeOut();
                    $("#contractDetailsSummaryConfiguration").css('display', 'none');
                    $("#dvWorkflow").dialog("option", "title", "Amendment Approval Workflow");
                    $("#dvWorkflow").dialog("open");
                    $("#dvWorkflow").height("auto");
                },
                error: function () {
                    $("#ddlRule").append('<option value="Ad-hoc">Ad-hoc</option>');
                    $("#lblddlRule").css("display", "");
                    $("#ddlRule").css("display", "none");
                    $("#lblddlRule").text("Ad-hoc");
                    if (!workflowAdHoc) {
                        if (amendmentWorkflowConflict != "Pick from possible options") {
                            $("#ddlRule").attr('disabled', 'disabled');
                        }
                    }
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

                    $("#loadingPage").fadeOut();
                    $("#contractDetailsSummaryConfiguration").css('display', 'none');
                    $("#dvWorkflow").dialog("option", "title", "Amendment Approval Workflow");
                    $("#dvWorkflow").dialog("open");
                    $("#dvWorkflow").height("auto");
                }
            });
        }
    }
}