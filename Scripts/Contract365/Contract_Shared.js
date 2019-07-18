var vApiKey = "";
var vCollaborationID = "";
var vIsComplete = false;
var vSendTo = "";
var contrcatItem = "";
var thisContractAreaSettings;
var vAccountID = "";
//var docnewvrupload = false;
var vCode = "";
var vUserName = '';
var vContractID = "";
var eContractFeatures = "";
var AppDateFormat = "";
var MaxRequestLength = "";
var settingsData = "";
//Sridhar
var TermTypeDisplayName = {};
$(function () {
    //Do not disclose people and activities if it is set as ON
    //KXlnm = "Disclose"
    //EXoUSV5OXbGtZ7O2TTl1aVEmYUBZMQ = "No"
    var vDisclose = getParameterByName("KXlnm");
    if (vDisclose !== "") {
        $("#commentactivity-Right").hide();
    } else {
        $("#commentactivity-Right").show();
    }
    //End
    vAccountID = getParameterByName("AccountID");
    vApiKey = getAPIKey(vAccountID);
    vUserName = getParameterByName("UserName");
    vCode = getParameterByName("Code");
    vContractID = getParameterByName("ContractID");
    GetFeatures();
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
            if (AccountSetting.DateFormat != "") {
                AppDateFormat = AccountSetting.DateFormat;
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

    GetMaxRequestLength();
    vCollaborationID = getCollaborationID(vAccountID, vUserName, vCode);
    getContractCollaboration(vAccountID, vCollaborationID);
    if ($("#hdnExpiry").val() == "Yes") {
        $("#dvExpired").css("display", "");
        $("#dvTask").css("display", "none");
        $(".newdoc").css("display", "none");
        $("#mid-section1").css("display", "none");
        $("#postComment").css("display", "none");
    } else if ($("#hdnExpiry").val() == "Stopped") {
        $("#dvStopped").css("display", "");
        $("#dvTask").css("display", "none");
        $(".newdoc").css("display", "none");
        $("#mid-section1").css("display", "none");
        $("#postComment").css("display", "none");
    }
    else {

        $("#dvExpired").css("display", "none");

        $("#mid-section1").css("display", "");
        GetComment(vAccountID, vCollaborationID);
        $('#btnPost').click(function () {
            PostComment(getParameterByName("AccountID"), vCollaborationID);
        });
        BindDocument(vAccountID, vContractID, vApiKey);


        ObligationDisplay(vAccountID, vContractID, vApiKey);
    }
    $("#viewDocument").dialog({
        autoOpen: false,
        closeText: "",
        width: "700px",
        title: "Document",
        modal: true
    });
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/Contracts?contractid=' + vContractID,
        type: 'GET',
        cache: false,
        contentType: false,
        async: false,
        headers: { 'eContracts-ApiKey': vApiKey },
        processData: false,
        error: function () {

        },
        success: function (item) {

            contrcatItem = item;
            // getcontractareasettings(item.ContractArea);
            BindContractTermDetail(item);

            var txtLiTType = item.TransactionType;
            if (txtLiTType == "0")
                txtLiTType = "";
            $("#hdnContractAreaName").text(item.ContractArea);
            //docdefaultview(item.ContractArea);
            $("#hdnContractID").text(item.RowKey);
            $("#hdnPermission").val(item.Permission);
            $("#hdnTransactionType").text(item.TransactionType);
            $("#hdnContractValue").text(item.ContractValue);
            $("#hdnContractCurrency").text(item.ContractCurrency);
            $("#hdnContractPricingType").text(item.ContractPricingType);
            $("#hdnPaymentType").text(item.PaymentType);
            $("#hdnBillingFrequency").text(item.BillingFrequency);
            $("#hdnOldEndDate").text(item.EndDate);
            $("#hdnBaseContractValue").text(item.BaseContractValue);
            $("#hdnBaseContractCurrency").text(item.BaseContractValueCurrency);
            $("#liTType").text(txtLiTType);
            $("#lblContractTitle").text(item.ContractTitle);
            $("#lblContractNumber").text(item.ContractNumber);
            $("#lblCounterparty").text(item.Counterparty);
            $("#lblContractType").text(item.ContractType);
            $("#lblDivider").css('display', '');
            $("#lblContractPrivacy").text(item.ContractPrivacy);

            BindSystemMilestones(item);
            BindMilestone(vAccountID, vContractID, vApiKey);
            BindNotes(vContractID);
            BindContractLabels(item);
            if (item.TransactionType == "Legal/General Agreement") {
                $("#artFinancials").css('display', 'none');
            }
            else {
                $("#artFinancials").css('display', '');
                ContractValueSettings(item, vAccountID, vApiKey);
            }
            if (item.Status != "0" && item.Status != "" && item.Status != "undefined") {
                $("#spanstatus").text(item.Status);
            }
            else {
                $("#spanstatus").html('<span class="f_p-error">Not Assigned</span>');
            }

            if (item.Description == "") {
                $("#lblContractDescription").text("Not Available");
            }
            else {
                $("#lblContractDescription").text(item.Description);
            }

            if (item.Renewable == "Yes") {
                $("#hdnIsRenewable").text("Yes");
                $("#hdnIsRenewableContract").text("Yes");
                $("#artRenewable").css('display', '');
                GetRenewalHistory(vAccountID, vContractID, vApiKey);
            } else {
                $("#hdnIsRenewable").text("No");
                $("#artRenewable").css('display', 'none');
            }
            //if (item.IsStandard == "Yes") {
            //    $("#iStandardCont").css('display', '');
            //} else {
            //    $("#iNonStandardCont").css('display', 'none');
            //}
            if (item.Amendable != null && item.Amendable == "Yes") {
                var arrstatus = ['Ready for Signature', 'Awaiting Signatures', 'Signed', 'Active', 'Expired', 'Replaced', 'Archived', 'On Hold', 'Cancelled'];
                if (arrstatus.indexOf(item.Status) > -1) {
                    $("#artAmendment").css('display', '');
                    BindAmendments(vAccountID, vContractID, vApiKey);
                }
            }

        }
    });
});


function CompleteReview() {
    swal({
        title: '',
        text: "Are you sure you want to complete this Negotiation/Review? If done, you'll not be able to comment from this page.",
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
                                       url: '/Contracts/ShareContractCompleteByUser?accountid=' + getParameterByName("AccountID"),
                                       type: 'PUT',
                                       dataType: 'json',
                                       headers: { 'AntiReqVerificationToken': $("#forgeryToken").val(), 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                                       data: {
                                           'username': getParameterByName("UserName"),
                                           'code': getParameterByName("Code")
                                       },
                                       cache: false,
                                       success: function (data) {
                                           $(".newdoc").css("display", "none");
                                           $("#dvTask").css("display", "none");
                                           $("#postComment").css("display", "none");
                                           $("#loadingPage").fadeOut();
                                       },
                                       error: function (data) {

                                           $("#loadingPage").fadeOut();
                                       }
                                   });
                               }
                               return;
                           });
}

function getContractCollaboration(AccountID, CollaborationID) {
    $.ajax({
        url: '/Contracts/GetContractCollaboration?accountid=' + AccountID + '&collaborationid=' + CollaborationID,
        type: 'GET',
        dataType: 'json',
        cache: false,
        async: false,
        success: function (entity) {
            var jsObject = JSON.parse(entity);
            if (jsObject.Status == "Stopped") { $("#hdnExpiry").val('Stopped'); } else {
                $("#spSender").html(jsObject.CreatedBy);
                $("#spSenderName").html(jsObject.CreatedBy);
                var vDate = new Date(jsObject.Created);
                $("#spSendDate").html(moment(vDate).format('Do MMM'));
                var start = moment(vDate);
                var end = moment(new Date());
                var vv = end.diff(start, "days");
                if (vv > parseInt(jsObject.ExpIn)) {
                    $("#hdnExpiry").val('Yes');
                }
                $("#spValidTill").html(moment(vDate).add(parseInt(jsObject.ExpIn), 'day').format('Do MMM'));
                if (!vIsComplete) {
                    $("#postComment").css("display", "");
                }
            }
        }
    });
}

function PostComment(accountid, collaborationid) {
    var vValid = requiredValidator('postComment');
    if (vValid) {
        $("#loadingPage").fadeIn();
        $.ajax({
            url: '/Contracts/PostShareComment?accountid=' + accountid,
            type: 'POST',
            dataType: 'json',
            headers: { 'AntiReqVerificationToken': $("#forgeryToken").val(), 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
            data: {
                'ContractCollaborationID': collaborationid,
                'Comment': $("#txtComment").val(),
                'PostBy': vSendTo
            },
            cache: false,
            //async: false,
            success: function (data) {
                var i = $("#tblComments li").length;
                var vComment = '';
                if ((i + 1) < 5) {
                    vComment = '<li><span>&nbsp;</span>';
                } else {
                    vComment = '<li class="hiddencomment"><span>&nbsp;</span>';
                }
                vComment += '<p><b>' + vSendTo + '</b>';
                vComment += '<small>' + moment(new Date()).format('Do MMM, h:mm A') + '</small>';
                vComment += '<span>' + 'Comment: ' + $("#txtComment").val() + '</span>';
                vComment += '</p></li>';

                //var vTime = moment(new Date()).format('Do MMM, h:mm A');
                //var vComment = '<li><span>&nbsp;</span>';
                //vComment += '<div class="activity-details-start row-group">';
                //vComment += '<div class="col8 no-pad">';
                //vComment += "<p><b>" + vSendTo + "</b><p>";
                //vComment += '<br/>' + $("#txtComment").val();
                //vComment += '</div>';
                //vComment += '<div class="col4 no-pad text-right">';
                //vComment += vTime;
                //vComment += '</div>';
                //vComment += '</div>';

                $("#tblComments").prepend(vComment);
                $("#txtComment").val("");
                vComment = '';
                $(".hiddencomment").css("display", "none");
                if ((i + 1) > 5) { $("#aCommentsMore").css("display", ""); } else
                {
                    $("#aCommentsMore").css("display", "none");
                }
                HideComment();
                $("#loadingPage").fadeOut();
            },
            error: function (data) {
                $("#loadingPage").fadeOut();
            }
        });
    }
}

function getCollaborationID(AccountID, UserName, Code) {
    var cid = "";
    $.ajax({
        url: '/Contracts/GetContractCollaborationUser?accountid=' + AccountID + '&username=' + UserName + '&code=' + Code,
        type: 'GET',
        dataType: 'json',
        cache: false,
        async: false,
        success: function (data) {
            cid = data.ContractCollaborationID;
            vSendTo = data.SendTo;
            if (data.Status != 'Complete') {
                $("#dvTask").css("display", "");
            }
            else {
                $("#dvTask").css("display", "none");
                $(".newdoc").css("display", "none");
                vIsComplete = true;
            }
        }
    });
    return cid;
}

function GetComment(accountid, collaborationid) {
    $.ajax({
        url: '/Contracts/GetContractCollaborationComment?accountid=' + accountid + '&collaborationid=' + collaborationid,
        type: 'GET',
        dataType: 'json',
        cache: false,
        async: false,
        success: function (data) {
            var jsObject = JSON.parse(data);
            jsObject.sort(function (a, b) {
                return new Date(b.Timestamp) - new Date(a.Timestamp);
            });
            $(jsObject).each(function (i, item) {
                var vComment = '';
                if (i < 5) {
                    vComment = '<li><span>&nbsp;</span>';
                } else {
                    vComment = '<li class="hiddencomment"><span>&nbsp;</span>';
                }
                vComment += '<p><b>' + item.PostBy + '</b>';
                if (typeof (item.PostDate) != "undefined" && item.PostDate != null && item.PostDate != "")
                    vComment += '<small>' + moment(new Date(item.PostDate)).format('Do MMM, h:mm A') + '</small>';
                else
                    vComment += '<small>' + moment(new Date(item.Timestamp)).format('Do MMM, h:mm A') + '</small>';
                var action = item.Comment.substr(0, item.Comment.lastIndexOf(':') - 7);
                var comment = ""
                if (item.Comment.lastIndexOf(':') >= 0)
                    comment = item.Comment.substr(item.Comment.lastIndexOf(':') - 7);
                else
                    comment = "Comment: " + item.Comment;
                vComment += '<span>' + action + '</span>';
                vComment += '<span>' + comment + '</span>';
                vComment += '</p></li>';

                //var vTime = moment(new Date(item.Timestamp)).format('Do MMM, h:mm A');
                //vComment += '<div class="activity-details-start row-group">';
                //vComment += '<div class="col8 no-pad">';
                //vComment += "<p><b>" + item.PostBy + "</b><p>";
                //if (item.Comment.indexOf("Comment:") > -1) {
                //    var splitcommment = item.Comment.split("Comment:");
                //    if (splitcommment[0] != "") {
                //        vComment += '<br/>' + splitcommment[0].trim();
                //    } else {
                //        vComment += '<br/>' + item.Comment.trim();
                //    }
                //    if (splitcommment[1] != "") {
                //        vComment += '\n<br/><p><b>Comment :</b><p>' + splitcommment[1].trim();
                //    } else {
                //        vComment += '\n<br/><p><b>Comment :</b><p>' + item.Comment.trim();
                //    }
                //} else {
                //    vComment += '<br/>' + item.Comment;
                //}
                //vComment += '</div>';
                //vComment += '<div class="col4 no-pad text-right">';
                //vComment += vTime;
                //vComment += '</div>';
                //vComment += '</div>';
                $("#tblComments").append(vComment);
            });
            $(".hiddencomment").css("display", "none");
            if (jsObject != null && jsObject.length > 5) { $("#aCommentsMore").css("display", ""); } else
            {
                $("#aCommentsMore").css("display", "none");
            }

        }
    });
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

function ObligationDisplay(AccountID, ContractID, APIKey) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + AccountID + '/feature?featureid=2',
        type: 'GET',
        cache: false,
        contentType: false,
        headers: { 'eContracts-ApiKey': APIKey },
        processData: false,
        success: function (data) {
            if (data.Status == "ON") {
                $("#articleObligation").css("display", "");
                BindObligations(AccountID, ContractID, APIKey);
            }
            else {
                $("#articleObligation").css("display", "none");
            }
        },
        error: function () {
            $("#articleObligation").css("display", "none");
        }
    });
}

//manoj
//Check financial feature is on/off
function ContractValueSettings(contRecord, AccountID, APIKey) {
    if (eContractFeatures == "") {
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/feature',
            type: 'GET',
            dataType: 'json',
            'Content-Type': 'application/json',
            cache: false,
            //async: false,
            headers: { 'eContracts-ApiKey': vApiKey },
            success: function (data) {
                eContractFeatures = data;
                var veContractFeatures = eContractFeatures;
                var vDocLibFeat = $.grep(veContractFeatures, function (n, i) {
                    return (n.RowKey == "19" && n.Status == "ON");
                });
                if (vDocLibFeat.length > 0) {
                    GetContractValueSetting(contRecord, AccountID, APIKey, 'ON');
                } else {
                    GetContractValueSetting(contRecord, AccountID, APIKey, 'OFF');
                }
            }
        });
    } else {
        var veContractFeatures = eContractFeatures;
        var vDocLibFeat = $.grep(veContractFeatures, function (n, i) {
            return (n.RowKey == "19" && n.Status == "ON");
        });
        if (vDocLibFeat.length > 0) {
            GetContractValueSetting(contRecord, AccountID, APIKey, 'ON');
        } else {
            GetContractValueSetting(contRecord, AccountID, APIKey, 'OFF');
        }
    }
}
//Check financial feature is on/off
//manoj

function GetContractValueSetting(contRecord, AccountID, APIKey, status) {
    var vContractValueSetting = '';
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + AccountID + '/settings',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': APIKey },
        cache: false,
        success: function (data) {
            settingsData = data;
            //manoj
            $("#divfinancialsection").removeClass('col12');
            $("#divfinancialsection").removeClass('col4');
            if (status != 'OFF') {
                //New section
                $("#divfinancialsection").addClass('col12');
                $("#divfinancialsection").html('<img src="../Content/Images/icon/loading.gif"> Please wait...');

                //manoj
                var cutomFinancialFields = [];
                var financialMetadataFields = [];
                var financialtable = "";
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + AccountID + '/contracttypes/metadatas?contracttypename=' + encodeURIComponent(contRecord.ContractType),
                    type: 'GET',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    cache: false,
                    async: false,
                    success: function (metadataFields) {
                        if (metadataFields != null && metadataFields.length > 0) {
                            cutomFinancialFields = $.grep(metadataFields, function (n, i) {
                                return (n.CustomFieldsGroupName == "FinancialCustomFields");
                            });
                            financialMetadataFields = $.grep(metadataFields, function (n, i) {

                                return (n.FinancialField == "true");
                            });
                            if (cutomFinancialFields.length > 0) {
                                financialtable = "<table style='width: 420px;'><thead><tr><th></th><th>Base Currency</th><th>Actual Currency</th></tr></thead><tbody>";
                                $(cutomFinancialFields).each(function (i, itemfield) {
                                    financialtable += "<tr><td>" + itemfield.FieldDisplayName + "</td><td><span id='lblBase" + itemfield.FieldName + "'></span><span class='basecurrencyformat' id='lblBase" + itemfield.FieldName + "Currency'></span></td><td><span id='lblActual" + itemfield.FieldName + "'></span><span class='actualcurrencyformat' id='lblActual" + itemfield.FieldName + "Currency'></span></td></tr>";
                                });
                                financialtable += "</tbody></table>";
                            }
                        }
                    },
                    error: function (data) {
                    }
                });
                //manoj
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + AccountID + '/Contracts/IContractDetails?contractid=' + getParameterByName("ContractID"),
                    type: 'GET',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': APIKey },
                    cache: false,
                    success: function (mainmetadataFields) {
                        var vMetadatavaluetobindcutomFinancial = $(mainmetadataFields).find('Metadata');
                        $("#divfinancialsection").html('<h3 class="f24"><span id="lblContractValue"></span><span id="lblContractCurrency"></span></h3><p class="sub-text">Contract Value</p><div id="dvcontractfinacialgroup" style=" text-align: center; margin: 25px 25% auto 28%;"></div>');
                        $("#dvcontractfinacialgroup").html(financialtable);
                        financialtable = "";
                        vContractValueSetting = settingsData.IsContractValueInBaseCurrency;
                        if (vContractValueSetting == "Display Contract Values in Base Currency") {
                            if (settingsData.CurrencyDisplayStyle == "UK") {
                                $('#lblContractValue').autoNumeric('init', { vMax: '99999999999999999999.99' });
                                $('#lblContractValue').autoNumeric('set', parseFloat(contRecord.BaseContractValue))

                                $('#txtContractValueCurrent').autoNumeric('init');
                                $('#txtContractValueCurrent').autoNumeric('set', parseFloat(contRecord.BaseContractValue))
                            } else if (settingsData.CurrencyDisplayStyle == "CAN") {
                                $('#lblContractValue').autoNumeric('init', { aSep: ' ', aDec: '.', vMax: '99999999999999999999.99' });
                                $('#lblContractValue').autoNumeric('set', parseFloat(contRecord.BaseContractValue))

                                $('#txtContractValueCurrent').autoNumeric('init', { aSep: ' ', aDec: '.' });
                                $('#txtContractValueCurrent').autoNumeric('set', parseFloat(contRecord.BaseContractValue))
                            } else if (settingsData.CurrencyDisplayStyle == "EU") {
                                $('#lblContractValue').autoNumeric('init', { aSep: '.', aDec: ',', vMax: '99999999999999999999.99' });
                                $('#lblContractValue').autoNumeric('set', parseFloat(contRecord.BaseContractValue))

                                $('#txtContractValueCurrent').autoNumeric('init', { aSep: '.', aDec: ',' });
                                $('#txtContractValueCurrent').autoNumeric('set', parseFloat(contRecord.BaseContractValue))

                            }
                            if (contRecord.BaseContractValueCurrency != null) {
                                $("#lblContractCurrency").text(contRecord.BaseContractValueCurrency);
                                $("#lblContractCurrencyCurrent").text(contRecord.BaseContractValueCurrency);
                            }
                        }
                        else {
                            if (settingsData.CurrencyDisplayStyle == "UK") {
                                $('#lblContractValue').autoNumeric('init', { vMax: '99999999999999999999.99' });
                                $('#lblContractValue').autoNumeric('set', parseFloat(contRecord.ContractValue))

                                $('#txtContractValueCurrent').autoNumeric('init');
                                $('#txtContractValueCurrent').autoNumeric('set', parseFloat(contRecord.ContractValue))
                            } else if (settingsData.CurrencyDisplayStyle == "CAN") {
                                $('#lblContractValue').autoNumeric('init', { aSep: ' ', aDec: '.', vMax: '99999999999999999999.99' });
                                $('#lblContractValue').autoNumeric('set', parseFloat(contRecord.ContractValue))

                                $('#txtContractValueCurrent').autoNumeric('init', { aSep: ' ', aDec: '.' });
                                $('#txtContractValueCurrent').autoNumeric('set', parseFloat(contRecord.ContractValue))
                            } else if (settingsData.CurrencyDisplayStyle == "EU") {
                                $('#lblContractValue').autoNumeric('init', { aSep: '.', aDec: ',', vMax: '99999999999999999999.99' });
                                $('#lblContractValue').autoNumeric('set', parseFloat(contRecord.ContractValue))

                                $('#txtContractValueCurrent').autoNumeric('init', { aSep: '.', aDec: ',' });
                                $('#txtContractValueCurrent').autoNumeric('set', parseFloat(contRecord.ContractValue))
                            }

                            if (contRecord.ContractCurrency != null) {
                                $("#lblContractCurrency").text(contRecord.ContractCurrency);
                                $("#lblContractCurrencyCurrent").text(contRecord.ContractCurrency);
                            }
                        }

                        var vCurrencyDisplayStyle = '';
                        if (settingsData.CurrencyDisplayStyle == "UK") {
                            vCurrencyDisplayStyle = "UK";
                        } else if (settingsData.CurrencyDisplayStyle == "CAN") {
                            vCurrencyDisplayStyle = "CAN";
                        } else if (settingsData.CurrencyDisplayStyle == "EU") {
                            vCurrencyDisplayStyle = "EU";
                        } else if (settingsData.CurrencyDisplayStyle == "IND") {
                            vCurrencyDisplayStyle = "IND";
                        }

                        //For  Base and Actual Currency
                        $(cutomFinancialFields).each(function (i, itemfield) {
                            if (vCurrencyDisplayStyle == "UK") {
                                $('#lblBase' + itemfield.FieldName).autoNumeric('init', { vMax: '99999999999999999999.99' });
                                $('#lblBase' + itemfield.FieldName).autoNumeric('set', parseFloat(($(vMetadatavaluetobindcutomFinancial).find('CustomBase' + itemfield.FieldName).text() != "") ? $(vMetadatavaluetobindcutomFinancial).find('CustomBase' + itemfield.FieldName).text() : "0"));
                                $('#lblBase' + itemfield.FieldName).append(" " + contRecord.BaseContractValueCurrency);
                                $('#lblActual' + itemfield.FieldName).autoNumeric('init', { vMax: '99999999999999999999.99' });
                                $('#lblActual' + itemfield.FieldName).autoNumeric('set', parseFloat(($(vMetadatavaluetobindcutomFinancial).find(itemfield.FieldName).text() != "") ? $(vMetadatavaluetobindcutomFinancial).find(itemfield.FieldName).text() : "0"));
                                $('#lblActual' + itemfield.FieldName).append(" " + contRecord.ContractCurrency);

                            } else if (vCurrencyDisplayStyle == "CAN") {
                                $('#lblBase' + itemfield.FieldName).autoNumeric('init', { aSep: ' ', aDec: '.', vMax: '99999999999999999999.99' });
                                $('#lblBase' + itemfield.FieldName).autoNumeric('set', parseFloat(($(vMetadatavaluetobindcutomFinancial).find('CustomBase' + itemfield.FieldName).text() != "") ? $(vMetadatavaluetobindcutomFinancial).find('CustomBase' + itemfield.FieldName).text() : "0"));
                                $('#lblBase' + itemfield.FieldName).append(" " + contRecord.BaseContractValueCurrency);
                                $('#lblActual' + itemfield.FieldName).autoNumeric('init', { aSep: ' ', aDec: '.', vMax: '99999999999999999999.99' });
                                $('#lblActual' + itemfield.FieldName).autoNumeric('set', parseFloat(($(vMetadatavaluetobindcutomFinancial).find(itemfield.FieldName).text() != "") ? $(vMetadatavaluetobindcutomFinancial).find(itemfield.FieldName).text() : "0"));
                                $('#lblActual' + itemfield.FieldName).append(" " + contRecord.ContractCurrency);

                            } else if (vCurrencyDisplayStyle == "EU") {
                                $('#lblBase' + itemfield.FieldName).autoNumeric('init', { aSep: '.', aDec: ',', vMax: '99999999999999999999.99' });
                                $('#lblBase' + itemfield.FieldName).autoNumeric('set', parseFloat(($(vMetadatavaluetobindcutomFinancial).find('CustomBase' + itemfield.FieldName).text() != "") ? $(vMetadatavaluetobindcutomFinancial).find('CustomBase' + itemfield.FieldName).text() : "0"));
                                $('#lblBase' + itemfield.FieldName).append(" " + contRecord.BaseContractValueCurrency);
                                $('#lblActual' + itemfield.FieldName).autoNumeric('init', { aSep: '.', aDec: ',', vMax: '99999999999999999999.99' });
                                $('#lblActual' + itemfield.FieldName).autoNumeric('set', parseFloat(($(vMetadatavaluetobindcutomFinancial).find(itemfield.FieldName).text() != "") ? $(vMetadatavaluetobindcutomFinancial).find(itemfield.FieldName).text() : "0"));
                                $('#lblActual' + itemfield.FieldName).append(" " + contRecord.ContractCurrency);

                            }
                            else if (vCurrencyDisplayStyle == "IND") {
                                $('#lblBase' + itemfield.FieldName).autoNumeric('init', { dGroup: '2', vMax: '99999999999999999999.99' });
                                $('#lblBase' + itemfield.FieldName).autoNumeric('set', parseFloat(($(vMetadatavaluetobindcutomFinancial).find('CustomBase' + itemfield.FieldName).text() != "") ? $(vMetadatavaluetobindcutomFinancial).find('CustomBase' + itemfield.FieldName).text() : "0"));
                                $('#lblBase' + itemfield.FieldName).append(" " + contRecord.BaseContractValueCurrency);
                                $('#lblActual' + itemfield.FieldName).autoNumeric('init', { dGroup: '2', vMax: '99999999999999999999.99' });
                                $('#lblActual' + itemfield.FieldName).autoNumeric('set', parseFloat(($(vMetadatavaluetobindcutomFinancial).find(itemfield.FieldName).text() != "") ? $(vMetadatavaluetobindcutomFinancial).find(itemfield.FieldName).text() : "0"));
                                $('#lblActual' + itemfield.FieldName).append(" " + contRecord.ContractCurrency);

                            }
                        });
                        var veContractFeatures = eContractFeatures;
                        var vAccFeatObligation = $.grep(veContractFeatures, function (n, i) {
                            return (n.RowKey == "19" && n.Status == "ON");
                        });
                        if (vAccFeatObligation.length > 0) {

                            $("#tblfinancialMetadata").html('');
                            var str = "";
                            for (var i = 0; i < financialMetadataFields.length; i++) {
                                var data = financialMetadataFields[i];
                                if (data.FieldName != "BusinessArea" && data.FieldName != "ContractType" && data.FieldName != "ContractTitle" && data.FieldName != "Counterparty") {

                                    if (data.FieldType == 'Date') {
                                        var date = $(mainmetadataFields).find(data.FieldName).text();
                                        onlydate = "";
                                        if (date != null) {
                                            onlydate = date.substring(0, date.length - 19);

                                        }
                                        if (onlydate != "") {
                                            if (AppDateFormat == null || AppDateFormat == "" || AppDateFormat == 'undefined') {
                                                onlydate = moment(new Date(onlydate)).format('MM/DD/YYYY');
                                            }
                                            else {
                                                onlydate = moment(new Date(onlydate)).format(AppDateFormat);
                                            }
                                        }
                                        str += '<tr>' +
                                                   '<td height="10" align="left" valign="top" class="content-text clr999 width40" style="word-break: break-word;">' + data.FieldDisplayName + '</td>';
                                        if (onlydate != "") {
                                            str += '<td height="10" align="left" valign="top" class="content-text width58">' + onlydate + '</td>';
                                        }
                                        else {
                                            str += '<td height="10" align="left" valign="top" class="content-text width58"> Not Available</td>';
                                        }
                                        str += '</tr>';
                                    }
                                    else if (data.FieldType == 'Phone Number') {
                                        str += '<tr>' +
                                                  '<td height="10" align="left" valign="top" class="content-text clr999 width40" style="word-break: break-word;">' + data.FieldDisplayName + '</td>';
                                        if (typeof ($(mainmetadataFields).find(data.FieldName).text()) != "undefined" && $(mainmetadataFields).find(data.FieldName).text() != null && $(mainmetadataFields).find(data.FieldName).text() != "") {
                                            if (typeof ($(mainmetadataFields).find(data.FieldName).text().split(',')[2]) != "undefined" && $(mainmetadataFields).find(data.FieldName).text().split(',')[2] != null && $(mainmetadataFields).find(data.FieldName).text().split(',')[2] != "") {
                                                str += '<td height="10" align="left" valign="top" class="content-text width58"> +' + $(mainmetadataFields).find(data.FieldName).text().split(',')[2].trim() + '</td>';
                                            }
                                            else {
                                                str += '<td height="10" align="left" valign="top" class="content-text width58"> Not Available</td>';
                                            }

                                        }
                                        else {
                                            str += '<td height="10" align="left" valign="top" class="content-text width58"> Not Available</td>';
                                        }
                                        str += '</tr>';
                                    }
                                    else if (data.FieldType == 'Number-P' || data.FieldType == 'Number-PD') {
                                        str += '<tr>' +
                                                  '<td height="10" align="left" valign="top" class="content-text clr999 width40" style="word-break: break-word;">' + data.FieldDisplayName + '</td>';
                                        if (typeof ($(mainmetadataFields).find(data.FieldName).text()) != "undefined" && $(mainmetadataFields).find(data.FieldName).text() != null && $(mainmetadataFields).find(data.FieldName).text() != "") {
                                            str += '<td height="10" align="left" valign="top" class="content-text width58">' + $(mainmetadataFields).find(data.FieldName).text() + ' %</td>';
                                        }
                                        else {
                                            str += '<td height="10" align="left" valign="top" class="content-text width58"> Not Available</td>';
                                        }
                                        str += '</tr>';
                                    }
                                    else {
                                        str += '<tr>' +
                                                   '<td height="10" align="left" valign="top" class="content-text clr999 width40" style="word-break: break-word;">' + data.FieldDisplayName + '</td>';
                                        if (typeof ($(mainmetadataFields).find(data.FieldName).text()) != "undefined" && $(mainmetadataFields).find(data.FieldName).text() != null && $(mainmetadataFields).find(data.FieldName).text() != "") {
                                            str += '<td height="10" align="left" valign="top" class="content-text width58">' + $(mainmetadataFields).find(data.FieldName).text() + '</td>';
                                        }
                                        else {
                                            str += '<td height="10" align="left" valign="top" class="content-text width58"> Not Available</td>';
                                        }
                                        str += '</tr>';
                                    }
                                }
                            }
                            $("#tblfinancialMetadata").append(str);

                        }
                    },
                });
                //New Section

            } else {
                //old section
                $("#divfinancialsection").addClass('col4');
                $("#divfinancialsection").html('<h3 class="f24"><span id="lblContractValue"></span><span id="lblContractCurrency"></span></h3><p class="sub-text">Contract Value</p>');
                vContractValueSetting = settingsData.IsContractValueInBaseCurrency;
                if (vContractValueSetting == "Display Contract Values in Base Currency") {
                    if (settingsData.CurrencyDisplayStyle == "UK") {
                        $('#lblContractValue').autoNumeric('init', { vMax: '99999999999999999999.99' });
                        $('#lblContractValue').autoNumeric('set', parseFloat(contRecord.BaseContractValue))

                        $('#txtContractValueCurrent').autoNumeric('init');
                        $('#txtContractValueCurrent').autoNumeric('set', parseFloat(contRecord.BaseContractValue))
                    } else if (settingsData.CurrencyDisplayStyle == "CAN") {
                        $('#lblContractValue').autoNumeric('init', { aSep: ' ', aDec: '.', vMax: '99999999999999999999.99' });
                        $('#lblContractValue').autoNumeric('set', parseFloat(contRecord.BaseContractValue))

                        $('#txtContractValueCurrent').autoNumeric('init', { aSep: ' ', aDec: '.' });
                        $('#txtContractValueCurrent').autoNumeric('set', parseFloat(contRecord.BaseContractValue))
                    } else if (settingsData.CurrencyDisplayStyle == "EU") {
                        $('#lblContractValue').autoNumeric('init', { aSep: '.', aDec: ',', vMax: '99999999999999999999.99' });
                        $('#lblContractValue').autoNumeric('set', parseFloat(contRecord.BaseContractValue))

                        $('#txtContractValueCurrent').autoNumeric('init', { aSep: '.', aDec: ',' });
                        $('#txtContractValueCurrent').autoNumeric('set', parseFloat(contRecord.BaseContractValue))
                    }
                    if (contRecord.BaseContractValueCurrency != null) {
                        $("#lblContractCurrency").text(contRecord.BaseContractValueCurrency);
                        $("#lblContractCurrencyCurrent").text(contRecord.BaseContractValueCurrency);
                    }
                }
                else {
                    if (settingsData.CurrencyDisplayStyle == "UK") {
                        $('#lblContractValue').autoNumeric('init', { vMax: '99999999999999999999.99' });
                        $('#lblContractValue').autoNumeric('set', parseFloat(contRecord.ContractValue))

                        $('#txtContractValueCurrent').autoNumeric('init');
                        $('#txtContractValueCurrent').autoNumeric('set', contRecord.ContractValue)
                    } else if (settingsData.CurrencyDisplayStyle == "CAN") {
                        $('#lblContractValue').autoNumeric('init', { aSep: ' ', aDec: '.', vMax: '99999999999999999999.99' });
                        $('#lblContractValue').autoNumeric('set', parseFloat(contRecord.ContractValue))

                        $('#txtContractValueCurrent').autoNumeric('init', { aSep: ' ', aDec: '.' });
                        $('#txtContractValueCurrent').autoNumeric('set', parseFloat(contRecord.ContractValue))
                    } else if (settingsData.CurrencyDisplayStyle == "EU") {
                        $('#lblContractValue').autoNumeric('init', { aSep: '.', aDec: ',', vMax: '99999999999999999999.99' });
                        $('#lblContractValue').autoNumeric('set', parseFloat(contRecord.ContractValue))

                        $('#txtContractValueCurrent').autoNumeric('init', { aSep: '.', aDec: ',' });
                        $('#txtContractValueCurrent').autoNumeric('set', parseFloat(contRecord.ContractValue))
                    }
                    if (contRecord.ContractCurrency != null) {
                        $("#lblContractCurrency").text(contRecord.ContractCurrency);
                        $("#lblContractCurrencyCurrent").text(contRecord.ContractCurrency);
                    }
                }
                //old section
            }
        }
    });
}

function BindDocument(AccountID, ContractID, APIKey) {

    $("#ulDocument").empty();
    try {
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + AccountID + '/documents?contractid=' + ContractID,
            type: 'GET',
            cache: false,
            contentType: false,
            headers: { 'eContracts-ApiKey': APIKey },
            processData: false,
            success: function (data) {
                var count = 0;
                var vPermission = $("#hdnPermission").val();

                var settings = {
                    pattern: /\.[0-9a-z]+$/i,
                    knownFileTypes: ['pdf', 'png', 'jpg', 'gif', 'bmp', 'doc', 'xls', 'ppt', 'docx', 'xlsx', 'txt', 'pptx', 'zip', 'rar', 'gzip', 'arj', 'wav', 'mp3', 'aif', 'aiff', 'm4a', 'ogg', 'wma', 'psd', 'ai', 'swf', 'fla', 'css', 'js', 'avi', 'mov', 'wmv', 'dotx'],
                    WopiFrameFileTypes: ['doc', 'xls', 'ppt', 'docx', 'xlsx', 'pptx', 'dotx']
                };

                var datalenght = (data != null ? data.length : 0);
                for (var i = 0; i < datalenght; i++) {
                    var item = data[i];
                    if (typeof (item.CollaborationURL) != "undefined" && item.CollaborationURL != null && item.CollaborationURL != "") {
                        count++
                        var vClass = "openmenuDocument";

                        //var vDocIcon = '<img src="../Content/Images/edit.png" class="doc_type" style="cursor: default;" alt="Draft Document" title="Draft Document" />';
                        var vDocIcon = "";
                        if (item.IsFinalized == "Yes") {
                            vDocIcon = '<img src="../Content/Images/icon/final_doc.png" class="doc_type" style="cursor: default;" alt="Finalized Document" title="Finalized Document" />';
                        } else if (item.CreationMode == "Amendment") {
                            vDocIcon = '<img src="../Content/Images/icon/amendment_doc.png" class="doc_type" style="cursor: default;" alt="Amendment Document" title="Amendment Document" />';
                        }
                        var vURL = encodeURI(item.CollaborationURL);
                        var ext = vURL.match(settings.pattern);
                        var vFileType = '<dd class="file-icon none"></dd>';
                        if (ext != null) {
                            if (ext.length > 0) { ext = ext[0].slice(1); }

                            if (jQuery.inArray(ext, settings.knownFileTypes) > -1) {
                                vFileType = '<dd class="file-icon ' + ext + '"></dd>';
                            }
                        }

                        var article = '';
                        if (count <= 5)
                            article = '<li>';
                        else
                            article = '<li class="ShowMoreDocuments" style="display:none;">';

                        article += '<label id="DocumentID" style="display:none;">' + item.RowKey + '</label>';
                        article += '<label id="SentForSign" style="display:none;">' + item.SentForSign + '</label>';
                        article += '<label id="DocumentName" style="display:none;">' + item.DocumentName + '</label>';
                        article += '<label id="ReviewWorkflow" style="display:none;">' + item.ReviewWorkflow + '</label>';
                        article += '<label id="BusinessArea" style="display:none;">' + item.BusinessArea + '</label>';
                        article += '<label id="DocumentURL" style="display:none;">' + vURL + '</label>';

                        article += vFileType + '<a href="javascript:void(0);" onclick="ViewDocument(\'' + vURL + '\');">' + item.DocumentName + '</a>';

                        article += '';
                        article += '';
                        article += vDocIcon + '&nbsp;<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="' + vClass + '" />';
                        article += '</li>';
                    }
                    $("#ulDocument").append(article);
                }

                if (count > 5) {
                    var more = count - 5;
                    $("#dvDocument").html('<a id="ShowMoreDocuments" href="javascript:void(0);" class="pad-all close1" onclick="ShowMoreDocuments()">' + more + ' More Documents </a>' +
                                          '<a id="ShowLessDocuments" href="javascript:void(0);" class="pad-all close1" onclick="ShowLessDocuments()" style="display:none;">Show less </a>');
                }

                $("#lblDocumentsCount").text(count);

                if (count == 0) {
                    $("#ulDocument").append('<li>No items found.</li>');
                }

                $(".openmenuDocument").contextMenu({ menu: 'dropdownMenuDocument', leftButton: true }, function (action, el, pos) {
                    contextMenuDocument(action, el.parent("li"), pos, AccountID, APIKey);
                });
                hidenewversionupload();
            },
            error: function (request) {
                if (!$("#lblDocumentsCount").text().trim()) {
                    $("#lblDocumentsCount").text('0');
                    $("#ulDocument").append('No items found');
                }
                else {
                    var arr = request.responseText.split(':');
                    var str1 = arr[1];
                    var str2 = "No document found";
                    if (str1.indexOf(str2) != -1) {
                        $("#lblDocumentsCount").text('0');
                        $("#ulDocument").append('No items found');
                    }
                }
                hidenewversionupload();
            }
        });
    } catch (e) {

        swal("", e.message);
    }
}

function ViewDocument(docurl) {
    if (docurl != '') {

        var srcurl = docurl;// "https://docs.google.com/viewer?url=" + vDocumentURL + "&embedded=true";
        if (docurl.indexOf(".doc") >= 0 || docurl.indexOf(".ppt") >= 0 || docurl.indexOf(".xls") >= 0 || docurl.indexOf(".dotx") >= 0) {
            srcurl = "https://view.officeapps.live.com/op/embed.aspx?src=" + docurl + "&wdStartOn=1";
        }
        window.open(srcurl);
    }
}

function ShowMoreDocuments() {
    $('.ShowMoreDocuments').css("display", "block");
    $('#ShowMoreDocuments').css("display", "none");
    $('#ShowLessDocuments').css("display", "block");
}

function ShowLessDocuments() {
    $('.ShowMoreDocuments').css("display", "none");
    $('#ShowMoreDocuments').css("display", "block");
    $('#ShowLessDocuments').css("display", "none");
}



function ShowMoreMilestones() {
    $('.ShowMoreMilestones').css("display", "block");
    $('#ShowMoreMilestones').css("display", "none");
    $('#ShowLessMilestones').css("display", "block");
}

function ShowLessMilestones() {
    $('.ShowMoreMilestones').css("display", "none");
    $('#ShowMoreMilestones').css("display", "block");
    $('#ShowLessMilestones').css("display", "none");
}

function BindAmendments(AccountID, ContractID, APIKey) {
    $("#ulAmendment").empty();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + AccountID + '/amendments?contractid=' + ContractID,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': APIKey },
        cache: false,
        success: function (contactsJsonPayload) {
            var count = 0;
            $(contactsJsonPayload).each(function (i, item) {
                count++
                if (count <= 5) {
                    var vDesc = item.AmendmentDescription;
                    if (vDesc == null || vDesc == '') {
                        vDesc = '';
                    }

                    var article = '';
                    if (count <= 5)
                        article = '<li>';
                    else
                        article = '<li class="ShowMoreAmendments" style="display:none;">';
                    article += '<label id="AmendmentID" style="display:none;">' + item.RowKey + '</label>';
                    article += '<label id="AmendmentTitle" style="display:none;">' + item.AmendmentTitle + '</label>';
                    article += '<a href="javascript:void(0)" onclick="ViewAmendment(\'' + item.RowKey + '\')">' + item.AmendmentTitle + '</a>';
                    article += '<span class="sub-text"> ' + vDesc + '</span>';
                    article += '&nbsp;<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuAmendment"/>';
                    article += '</li>';
                    $("#ulAmendment").append(article);

                }
            });

            if (count > 5) {
                var more = count - 5;
                $("#dvAmendment").html('<a id="ShowMoreAmendments" href="javascript:void(0);" class="pad-all close1" onclick="ShowMoreAmendments()">' + more + ' More Amendments </a>' +
                                          '<a id="ShowLessAmendments" href="javascript:void(0);" class="pad-all close1" onclick="ShowLessAmendments()" style="display:none;">Hide Amendments </a>');
            }

            $("#lblAmendmentsCount").text(count);
            if (!$("#lblAmendmentsCount").text().trim()) {
                $("#ulAmendment").append('No items found.');
            }
            $(".openmenuAmendment").contextMenu({ menu: 'dropdownMenu', leftButton: true }, function (action, el, pos) { contextMenuAmendment(action, el.parent("li"), pos, AccountID, APIKey); });

        },
        error: function (request) {
            if (!$("#lblAmendmentsCount").text().trim()) {
                $("#ulAmendment").append('No items found.');
            }
            else {
                var arr = request.responseText.split(':');
                var str1 = arr[1];
                var str2 = "No amendment found";
                if (str1.indexOf(str2) != -1) {
                    $("#lblAmendmentsCount").text('');
                    $("#ulAmendment").append('No items found.');
                }
            }
        }
    });
}

function ShowMoreAmendments() {
    $('.ShowMoreAmendments').css("display", "block");
    $('#ShowMoreAmendments').css("display", "none");
    $('#ShowLessAmendments').css("display", "block");
}

function ShowLessAmendments() {
    $('.ShowMoreAmendments').css("display", "none");
    $('#ShowMoreAmendments').css("display", "block");
    $('#ShowLessAmendments').css("display", "none");
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function BindObligations(AccountID, ContractID, APIKey) {

    $("#ulObligation").empty();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + AccountID + '/obligations?contractid=' + ContractID,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': APIKey },
        cache: false,
        success: function (contactsJsonPayload) {
            var count = 0;
            $(contactsJsonPayload).each(function (i, item) {
                count++;


                var vDueDate = '';
                var isDelayed = 'No';
                if (item.DueDate != null) {
                    var duedate = item.DueDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                    vDueDate = '(' + duedate + ')';
                    var DueDate = new Date(item.DueDate);
                    var currentDate = new Date();
                    var dateOne = new Date(DueDate.getFullYear(), DueDate.getMonth(), DueDate.getDate()); //Year, Month, Date
                    var dateTwo = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()); //Year, Month, Date
                    if (dateOne < dateTwo)
                        isDelayed = 'Yes';
                }


                var article = '';
                if (count <= 5)
                    article = '<li>';
                else
                    article = '<li class="ShowMoreObligations" style="display:none;">';
                article += '<label id="ObligationID" style="display:none;">' + item.RowKey + '</label>';
                article += '<label id="ObligationTitle" style="display:none;">' + item.ObligationTitle + '</label>';

                if (item.ObligationMet == "Yes" || item.ObligationMet == "yes")
                    article += '<a href="javascript:void(0)" onclick="ViewObligationDetail(\'' + item.RowKey + '\')"><del>' + item.ObligationTitle + '</del></a>';
                else
                    article += '<a href="javascript:void(0)" onclick="ViewObligationDetail(\'' + item.RowKey + '\')">' + item.ObligationTitle + '</a>';
                article += '<span class="sub-text"> ' + vDueDate + '</span>';
                article += '&nbsp;<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuObligation"/>';
                article += '</li>';
                $("#ulObligation").append(article);

            });

            if (count > 5) {
                var more = count - 5;
                $("#dvObligation").html('<a id="ShowMoreObligations" href="javascript:void(0);" class="pad-all close1" onclick="ShowMoreObligations()">' + more + ' More Obligations </a>' +
                                          '<a id="ShowLessObligations" href="javascript:void(0);" class="pad-all close1" onclick="ShowLessObligations()" style="display:none;">Hide Obligations </a>');
            }

            $("#lblObligationsCount").text(count);
            $(".openmenuObligation").contextMenu({ menu: 'dropdownMenu', leftButton: true }, function (action, el, pos) { contextMenuObligation(action, el.parent("div").parent("td").parent("tr"), pos, AccountID, APIKey); });

        },
        error: function (request) {
            if (!$("#lblObligationsCount").text().trim()) {
                $("#ulObligation").append('No items found.');
            }
            else {
                var arr = request.responseText.split(':');
                var str1 = arr[1];
                var str2 = "No obligations found";
                if (str1.indexOf(str2) != -1) {
                    $("#lblObligationsCount").text('');
                    $("#ulObligation").append('No items found.');
                }
            }
        }

    });
}


function ShowMoreObligations() {
    $('.ShowMoreObligations').css("display", "block");
    $('#ShowMoreObligations').css("display", "none");
    $('#ShowLessObligations').css("display", "block");
}

function ShowLessObligations() {
    $('.ShowMoreObligations').css("display", "none");
    $('#ShowMoreObligations').css("display", "block");
    $('#ShowLessObligations').css("display", "none");
}

function GetRenewalHistory(AccountID, ContractID, APIKey) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + AccountID + '/Contracts/' + ContractID + '/contractrenewalhistory',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': APIKey },
        success: function (data) {
            $("#renewalHistory").empty();
            $("#tblRenewalHistory").empty();
            var str = "";
            var strHist = "";
            $(data).each(function (i, item) {
                str += '<tr>';
                str += '<td>' + item.RenewalType + '</td>';
                if (item.RenewedDate != null) {
                    str += '<td>' + item.RenewedDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1') + '</td>';
                } else {
                    str += '<td></td>';
                }
                str += '<td>' + item.RenewedBy + '</td>';
                if (item.TermEndDate != null) {
                    str += '<td>' + item.TermEndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1') + '</td>';
                } else {
                    str += '<td></td>';
                }
                str += '<td>' + item.RenewalChecklist + '</td>';
                str += '<td>' + item.RenewalNotes + '</td>';
                str += '</tr>';


                strHist += '<li>' + item.RenewalType;
                if (item.RenewedDate != null) {
                    strHist += ' <span class="sub-text">' + item.RenewedDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1') + " | ";
                } else {
                    strHist += ' Not Available' + " | ";
                }
                strHist += item.RenewalNotes + '</span></li>';

            });
            $("#renewalHistory").append(str);
            $("#tblRenewalHistory").append(strHist);
            if (str != "") {

                $("#lblrenewalerror").css("display", "none");

            } else {
                $("#lblrenewalerror").css("display", "");
                $("#tblRenewalHistory").append('No items found.');

            }
        },
        error:
            function (data) {

                $("#lblrenewalerror").css("display", "");
                $("#tblRenewalHistory").append('No items found.');
            }
    });
}
function UploadNewVersionDocument() {
    var duplicatedoc = true;
    var uservalidation = true;
    var getconformation = true;
    var accountid = getParameterByName("AccountID");
    var vValid = requiredValidator('dvUpload');
    if (vValid) {
        $("#loadingPage").fadeIn();
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/activities?collaborationid=' + $("#hdnDocumentID").val().trim(),
            type: 'GET',
            dataType: 'json',
            "Content-Type": "application/json",
            headers: { 'eContracts-ApiKey': vApiKey },
            cache: false,
            success: function (data) {
                if (data != null) {
                    if (data.ObjectID.trim() == vCollaborationID.trim()) {
                        if (data.UserEmailID.trim() != getParameterByName("UserName").trim()) {
                            //uservalidation = false;
                            getconformation = confirm("New version uploaded by some other user. Do you want to overwrite?");
                        }
                    }
                }
            },
            error: function (data) {
            },
            complete: function (data) {
                if (getconformation) {
                    $("#loadingPage").fadeIn();
                    var formData = new FormData();
                    var opmlFile = $('#docToReplace')[0];
                    var Documentnamerelace = opmlFile.files[0].name;

                    formData.append("opmlFile", opmlFile.files[0]);
                    formData.append("UserName", vSendTo);
                    formData.append("UserEmailID", getParameterByName("UserName"));
                    formData.append("DocCode", getParameterByName("UserCode").trim());
                    formData.append("Comment", $("#txtCommentReplace").val());
                    if (duplicatedoc) {
                        $.ajax({
                            url: '/Documents/UploadNewVersionDocumentForContract?accountid=' + accountid + '&CollaborationID=' + vCollaborationID + '&documentID=' + $("#hdnDocumentID").val().trim(),
                            type: 'POST',
                            data: formData,
                            dataType: 'json',
                            headers: { 'AntiReqVerificationToken': $("#forgeryToken").val(), 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                            processData: false,
                            contentType: false,
                            success: function (item) {
                                window.location = window.location;
                                $("#dvUpload").dialog("close");
                                $("#loadingPage").fadeOut();
                            },
                            error: function (data) {
                                $("#dvUpload").dialog("close");
                                $("#loadingPage").fadeOut();
                            }
                        });
                    }
                    else {
                        $("#dvUpload").dialog("close");
                        $("#loadingPage").fadeOut();
                        swal("", "Another document with this file name already exists.Please rename and try again");
                    }
                }
                else {
                    $("#dvUpload").dialog("close");
                    $("#loadingPage").fadeOut();
                }
            }
        });
    }
}


function contextMenuDocument(action, el, pos, AccountID, APIKey) {
    switch (action) {
        case "view":
            {
                var documentID = $(el).find("#DocumentID").text();
                $("#tblMetadataDetail").empty();
                $('#tblMetadataDetail').append('<tr><td><img src="../Content/Images/icon/loading.gif"/></td></tr>');
                $("#viewMetadataDetail").dialog("option", "title", "View Document Metadata");
                $("#viewMetadataDetail").dialog("open");
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + AccountID + '/documents?documentid=' + documentID,
                    type: 'GET',
                    dataType: 'json',
                    "Content-Type": "application/json",
                    headers: { 'eContracts-ApiKey': APIKey },
                    cache: false,
                    success: function (documententity) {
                        var vMetadata = '<tr>';
                        vMetadata += '<td class="f_head">Document Name</td>';
                        vMetadata += '<td class="text">' + documententity.DocumentName + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="f_head">Document Type</td>';
                        vMetadata += '<td class="text">' + documententity.DocumentType + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="f_head">Creation Mode</td>';
                        vMetadata += '<td class="text">' + documententity.CreationMode + '</td>';
                        vMetadata += '</tr>';
                        $("#tblMetadataDetail").empty();
                        $("#tblMetadataDetail").append(vMetadata);
                    }
                });
                break;
            }
        case "viewdocument":
            {
                var LinkURL = $(el).find("#DocumentURL").text();
                ViewDocument(LinkURL);
                break;
            }
        case "download":
            {
                var LinkURL = $(el).find("#DocumentURL").text();
                var win = window.open(LinkURL, '_blank');
                win.focus();
                break;
            }
        case "newversion":
            {
                var documentID = $(el).find("#DocumentID").text();
                $("#hdnDocumentID").val(documentID);
                $("#txtCommentReplace").val('');
                $("#docToReplace").replaceWith($("#docToReplace").val('').clone(true));
                $("#dvUpload").dialog("open");
                break;
            }
    }
}

function contextMenuObligation(action, el, pos, AccountID, APIKey) {

    switch (action) {
        case "view":
            {
                var obligationID = $(el).find("#ObligationID").text();
                $("#tblMetadataDetail").empty();
                $('#tblMetadataDetail').append('<tr><td><img src="../Content/Images/icon/loading.gif"/></td></tr>');
                $("#viewMetadataDetail").dialog("option", "title", "View Obligation");
                $("#viewMetadataDetail").dialog("open");
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + AccountID + '/obligations?obligationid=' + obligationID,
                    type: 'GET',
                    dataType: 'json',
                    "Content-Type": "application/json",
                    headers: { 'eContracts-ApiKey': APIKey },
                    cache: false,
                    success: function (obligationentity) {
                        var vOblDueDate = obligationentity.DueDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                        var vMetadata = '<tr>';
                        vMetadata += '<td class="f_head">Obligation Title</td>';
                        vMetadata += '<td class="text">' + obligationentity.ObligationTitle + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="f_head">Obligation Type</td>';
                        vMetadata += '<td class="text">' + obligationentity.ObligationType + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="f_head">Description</td>';
                        vMetadata += '<td class="text">' + obligationentity.Description + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="f_head">Due Date</td>';
                        vMetadata += '<td class="text">' + vOblDueDate + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="f_head">Obligation Met</td>';
                        vMetadata += '<td class="text">' + obligationentity.ObligationMet + '</td>';
                        vMetadata += '</tr>';
                        $("#tblMetadataDetail").empty();
                        $("#tblMetadataDetail").append(vMetadata);
                    }
                });
                break;
            }
    }
}

function contextMenuMilestone(action, el, pos, AccountID, APIKey) {

    switch (action) {
        case "view":
            {
                var milestoneID = $(el).find("#MilestoneID").text();
                $("#tblMetadataDetail").empty();
                $('#tblMetadataDetail').append('<tr><td><img src="../Content/Images/icon/loading.gif"/></td></tr>');
                $("#viewMetadataDetail").dialog("option", "title", "View Milestone");
                $("#viewMetadataDetail").dialog("open");
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + AccountID + '/milestones?milestoneid=' + milestoneID,
                    type: 'GET',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': APIKey },
                    "Content-Type": "application/json",
                    cache: false,
                    success: function (milestoneentity) {
                        var vDueDate = "";
                        if (milestoneentity.MilestoneDate != null) {
                            milestoneentity.MilestoneDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                        }
                        var vMetadata = '<tr>';
                        vMetadata += '<td class="f_head">Milestone Title</td>';
                        vMetadata += '<td class="text">' + milestoneentity.MilestoneTitle + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="f_head">Milestone Type</td>';
                        vMetadata += '<td class="text">' + milestoneentity.MilestoneType + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="f_head">Description</td>';
                        if (milestoneentity.MilestoneDescription != '') {
                            vMetadata += '<td class="text">' + milestoneentity.MilestoneDescription + '</td>';
                        }
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="f_head">Milestone Date</td>';
                        if (milestoneentity.MilestoneDate != null) {
                            if (AppDateFormat == "undefined" || AppDateFormat == null || AppDateFormat == "")
                            { vDueDate = moment(new Date(milestoneentity.MilestoneDate)).format('MM/DD/YYYY'); }
                            else { vDueDate = moment(new Date(milestoneentity.MilestoneDate)).format(AppDateFormat); }
                        }
                        vMetadata += '<td class="text">' + vDueDate + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="f_head">Milestone Owner</td>';
                        if (milestoneentity.MilestoneOwner != '') {
                            vMetadata += '<td class="text">' + milestoneentity.MilestoneOwner + '</td>';
                        }
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="f_head">Priority</td>';
                        if (milestoneentity.Priority != '') {
                            vMetadata += '<td class="text">' + milestoneentity.Priority + '</td>';
                        }
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="f_head">Milestone Completed</td>';
                        if (milestoneentity.MilestoneCompleted != '') {
                            vMetadata += '<td class="text">' + milestoneentity.MilestoneCompleted + '</td>';
                        }
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="f_head">Completed Date</td>';
                        if (milestoneentity.MilestoneCompletedDate != null && milestoneentity.MilestoneCompletedDate != '') {
                            var completedate = milestoneentity.MilestoneCompletedDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                            vMetadata += '<td class="text">' + completedate + '</td>';
                        }
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="f_head">Show In Calendar</td>';
                        if (milestoneentity.ShowInCalendar != '') {
                            vMetadata += '<td class="text">' + milestoneentity.ShowInCalendar + '</td>';
                        }
                        vMetadata += '</tr>';
                        $("#tblMetadataDetail").empty();
                        $("#tblMetadataDetail").append(vMetadata);
                    }
                });
                break;
            }
    }
}

function contextMenuAmendment(action, el, pos, AccountID, APIKey) {

    switch (action) {
        case "view":
            {
                var amendmentID = $(el).find("#AmendmentID").text();
                $("#tblMetadataDetail").empty();
                $('#tblMetadataDetail').append('<tr><td><img src="../Content/Images/icon/loading.gif"/></td></tr>');
                $("#viewMetadataDetail").dialog("option", "title", "View Amendment");
                $("#viewMetadataDetail").dialog("open");
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + AccountID + '/amendments/sharedamendmentdetails?amendmentid=' + amendmentID,
                    type: 'GET',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': APIKey },
                    "Content-Type": "application/json",
                    cache: false,
                    success: function (amendmententity) {
                        var vMetadata = '<tr>';
                        vMetadata += '<td class="f_head">Amendment Title</td>';
                        vMetadata += '<td class="text">' + amendmententity.AmendmentTitle + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="f_head">Amendment Type</td>';
                        vMetadata += '<td class="text">' + amendmententity.AmendmentType + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="f_head">Amendment Description</td>';
                        vMetadata += '<td class="text">' + amendmententity.AmendmentDescription + '</td>';
                        vMetadata += '</tr>';

                        if (amendmententity.AttachmentURLs != "") {
                            var attachedDocs = [];
                            var attUrl = (amendmententity.AttachmentURLs).split(";");
                            var attUrllength = attUrl.length;
                            for (var i = 0; i < attUrllength; i++) {
                                var actualDoc = "";
                                var attParts = attUrl[i].split("/");
                                var attLastPart = attParts[attParts.length - 1];
                                var parts = attLastPart.split("_");
                                var partslength = parts.length;
                                for (var z = 0; z < partslength - 2; z++) {
                                    if (z < (partslength - 3)) {
                                        actualDoc += parts[z] + "_";
                                    }
                                    else if (z == (partslength - 3)) {
                                        actualDoc += parts[z];
                                    }
                                }

                                var extArr = attLastPart.split(".");
                                var ext = extArr[extArr.length - 1];
                                actualDoc += "." + ext;
                                var htmlDocu = "";
                                htmlDocu += "<tr>";
                                htmlDocu += "<td>";
                                htmlDocu += "<a href='" + attUrl[i] + "' style='border-bottom: 1px dotted;color: #3F91CC !important;font-size: 12px !important;'>";
                                htmlDocu += actualDoc;
                                htmlDocu += "</a>";
                                htmlDocu += "</td>";
                                htmlDocu += "</tr>";
                            }
                            vMetadata += '<tr>';
                            vMetadata += '<td class="f_head">Attached Documents</td>';
                            vMetadata += '<td class="text"><table  class="width100" cellpadding="2" cellspacing="2">' + htmlDocu + '</table></td>';
                            vMetadata += '</tr>';
                        }
                        else { vMetadata += '<tr><td class="f_head">Attached Documents</td><td class="text">No Attached Documents found.</td></tr>'; }
                        $("#tblMetadataDetail").empty();
                        $("#tblMetadataDetail").append(vMetadata);
                    }
                });

                break;
            }
    }
}

function contextMenuTerm(action, el, pos, AccountID, APIKey) {

    switch (action) {
        case "view":
            {
                var termID = $(el).find("#TermID").text();
                $("#tblMetadataDetail").empty();
                $('#tblMetadataDetail').append('<tr><td><img src="../Content/Images/icon/loading.gif"/></td></tr>');
                $("#viewMetadataDetail").dialog("option", "title", "View Term");
                $("#viewMetadataDetail").dialog("open");
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + AccountID + '/terms/contract/' + getParameterByName('ContractID') + '?termid=' + termID,
                    type: 'GET',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': APIKey },
                    "Content-Type": "application/json",
                    cache: false,
                    success: function (termentity) {
                        var vMetadata = '<tr>';
                        vMetadata += '<td class="f_head">Term Title</td>';
                        vMetadata += '<td class="text">' + termentity.TermTitle + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="f_head">Term Type</td>';
                        vMetadata += '<td class="text">' + termentity.TermType + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="f_head">Term Category</td>';
                        vMetadata += '<td class="text">' + termentity.TermCategory + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="f_head">Term Notes</td>';
                        vMetadata += '<td class="text">' + termentity.TermNotes + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="f_head">Term Text</td>';
                        vMetadata += '<td class="text">' + termentity.TermText + '</td>';
                        vMetadata += '</tr>';
                        $("#tblMetadataDetail").empty();
                        $("#tblMetadataDetail").append(vMetadata);
                    }
                });
                break;
            }
    }
}

$(document).ready(function () {
    $("#viewMetadataDetail").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "Detail",
        modal: true,
        buttons: {
            "Close": function () {
                $(this).dialog("close");
            }
        }
    });
    CreateNotificationList();

    $('#dialogSummary').dialog({
        autoOpen: false,
        closeText: "",
        width: "70%",
        title: 'Metadata',
        modal: true,
        resizable: true,
        show: {
            effect: "fade",
            duration: 500
        },
        hide: {
            effect: "fade",
            duration: 500
        },
        buttons: {
            "Close": function () {
                $(this).dialog("close");
            }
        }
    });

    $("#allAlerts").dialog({
        autoOpen: false,
        closeText: "",
        width: "60%",
        title: "Alerts",
        modal: true,
        resizable: true,
        show: {
            effect: "fade",
            duration: 500
        },
        hide: {
            effect: "fade",
            duration: 500
        },
        buttons: {
            Close: function () {
                $(this).dialog("close");
            }
        }
    });
    $("#dvUpload").dialog({
        autoOpen: false,
        closeText: "",
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
});

function CreateNotificationList() {
    $("#alertsList").html('');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/notifications?contractid=' + getParameterByName("ContractID"),
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': vApiKey },
        success: function (data) {
            if (data == null || data.length == 0)
            { $("#alertsList").append('<li class="f_p-error">No Alert Sent</li>'); }
            else
            {
                $(data).each(function (i, item) {
                    var sNotificationTitle = item.NotificationTitle;
                    var sNotificationDate = moment(new Date(item.NotificationDate)).format('Do MMM');

                    var article = "<li class='contraRigght'>";
                    if (i < 5) {
                        article += "<p class='contRP'>" + sNotificationTitle + "</p>";
                        article += "<small class='contRsmaLl'>" + sNotificationDate + "</small>";
                        article += "</li>";
                        $("#alertsList").append(article);
                    }


                    var sCategory = item.Category;
                    var vPriority = item.Priority;
                    var vPriorityIcon = '<img src="../Content/Images/priority_none.png" alt="None" title="None" />';
                    if (vPriority == "High") {
                        vPriorityIcon = '<img src="../Content/Images/priority_high.png" alt="High" title="High" />';
                    }
                    else if (vPriority == "Medium") {
                        vPriorityIcon = '<img src="../Content/Images/priority_medium.png" alt="Medium" title="Medium" />';
                    }
                    else if (vPriority == "Low") {
                        vPriorityIcon = '<img src="../Content/Images/priority_low.png" alt="Low" title="Low" />';
                    }

                    article = "";
                    article += '<article class="d-box1">';
                    article += '<div class="d_left-table">' + sNotificationDate;
                    article += '</div>';
                    article += '<div class="d_middle-table">';
                    article += '<p class="text">' + sNotificationTitle + '&nbsp;' + vPriorityIcon + '</p>';
                    article += '</div>';
                    article += '<div class="d_right-table">';
                    article += '<p class="text">' + item.UserID + '</p>';
                    article += '</div>';
                    article += '</article>';
                    $("#alertsListAll").append(article);
                });
                $("#seeMoreAlert").css("display", "");
                $('#compact-pagination-Alerts').pagination({
                    items: data.length,
                    itemsOnPage: 10,
                    type: 'section',
                    typeID: 'alertsListAll',
                    row: 'article',
                    cssStyle: 'compact-theme'
                });
            }
        },
        error:
            function (data) {
                $("#alertsList").append('<li class="f_p-error">No Alert Sent</li>');
            }
    });
}

function ShowAllAlerts() {
    $("#allAlerts").dialog("open");
}

function opensummary() {
    $('#dialogSummary').dialog('open');
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

function ShowComment() {
    $("#dvPostComment").css("display", "");
    $("#postCommentLink").css("display", "none");
}

function HideComment() {
    $("#dvPostComment").css("display", "none");
    $("#postCommentLink").css("display", "");
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

function MetadataSummary() {
    $("#Details").removeClass('pop_up__Acti');
    $("#Summary").addClass('pop_up__Acti');
    $('#tblSummary').css("display", "");
    $('#tblDetailsMetadata').css("display", "none");
}

function MetadataDetails() {
    $("#Summary").removeClass('pop_up__Acti');
    $("#Details").addClass('pop_up__Acti');
    $('#tblSummary').css("display", "none");
    $('#tblDetailsMetadata').css("display", "");
}

function BindMetaData(contractRecord) {
    if (contractRecord == null) {
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/Contracts?contractid=' + getParameterByName("ContractID"),
            type: 'GET',
            cache: false,
            contentType: false,
            async: false,
            headers: { 'eContracts-ApiKey': vApiKey },
            processData: false,
            success: function (data) {
                contractRecord = data;
            }
        });
    }

    $("#tdSumContractTitle").html(contractRecord.ContractTitle);
    $("#tdSumContractNumber").html(contractRecord.ContractNumber);
    $("#tdSumContractType").html(contractRecord.ContractType);

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/Contracts/IContractDetails?contractid=' + getParameterByName("ContractID"),
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': vApiKey },
        cache: false,
        success: function (mainmetadataFields) {
            var vMetadata = $(mainmetadataFields).find('Metadata');
            var vMetadataHTML = vMetadata[0].innerHTML;

            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/contracttypes/metadatas?contracttypename=' + encodeURIComponent(contractRecord.ContractType),
                type: 'GET',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': vApiKey },
                cache: false,
                success: function (metadataFields) {

                    $("#tblSummary").empty();
                    var datalenght = (metadataFields != null ? metadataFields.length : 0);
                    for (var i = 0; i < datalenght; i++) {
                        var item = metadataFields[i];
                        if ((item.FieldName != "ContractTitle") && (item.FieldName != "ContractNumber") && (item.FieldName != "ContractType") && (name != "STATUSCHANGEDALERT")) {

                            var vControls = '<tr>';
                            vControls += '<td class="f_head">' + item.FieldDisplayName + '</td>';

                            if (item.FieldType == "Date") {
                                var vv = $(vMetadata).find(item.FieldName).text();
                                var onlydate = "";
                                if (vv != null) {
                                    onlydate = vv.substring(0, vv.length - 19);
                                    vControls += '<td class="labelleft">' + onlydate + '</td>';
                                }
                            } else {
                                vControls += '<td class="labelleft">' + $(vMetadata).find(item.FieldName).text() + '</td>';
                            }

                            vControls += '</tr>';
                            vMetadataHTML = vMetadataHTML.replace("<" + item.FieldName + ">" + $(vMetadata).find(item.FieldName).text() + "</" + item.FieldName + ">", "");
                            $("#tblSummary").append(vControls);

                        }
                    }

                    var vContractFields = null;

                    $.ajax({
                        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/contractfields',
                        type: 'GET',
                        dataType: 'json',
                        "Content-Type": "application/json",
                        headers: { 'eContracts-ApiKey': vApiKey },
                        cache: false,
                        async: false,
                        success: function (contractfields) {
                            vContractFields = contractfields;


                            $("#tblDetailsMetadata").empty();
                            var datalenght = $(vMetadataHTML).length;
                            for (var i = 0; i < datalenght; i++) {
                                var item = $(vMetadataHTML)[i];
                                var name = item.nodeName;
                                if ((name != "CONTRACTTITLE") && (name != "CONTRACTNUMBER") && (name != "CONTRACTTYPE") && (name != "STATUSCHANGEDALERT")) {
                                    var vField = $.grep(vContractFields, function (person) { return person.FieldName.toUpperCase() == name });
                                    var value = item.textContent;
                                    if (vField.length > 0) {
                                        var vControls = '<tr>';
                                        vControls += '<td class="f_head">' + vField[0].FieldDisplayName + '</td>';
                                        if (value == '' || value == '0') {
                                            vControls += '<td class="labelleft">-</td>';
                                        }
                                        else {
                                            if (vField[0].FieldType == "Date") {
                                                var onlydate = "";
                                                onlydate = value.substring(0, value.length - 19);
                                                vControls += '<td class="labelleft">' + onlydate + '</td>';

                                            } else {
                                                vControls += '<td class="labelleft">' + value + '</td>';
                                            }
                                        }
                                        vControls += '</tr>';

                                        $("#tblDetailsMetadata").append(vControls);
                                    }
                                }
                            }
                        },
                        error: function (data) {

                        }
                    });
                }
            });
        }
    });
}


var articleSystemMileStone = "";
var articleDocumentMileStone = "";
var articleMileStone = "";
function BindMilestone(AccountID, ContractID, APIKey) {

    //*Harshitha
    var completeArticle = '';
    articleMileStone = '';
    $("#ulMilestoneBody").empty();
    $("#dvMilestoneAlert").empty();
    $("#dvMilestoneAlert").css('display', 'none');
    $("#alertsListUpcomingMilestone").empty();
    //*Harshitha


    var count = 0;
    var veContractFeatures = eContractFeatures;
    var vAccFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "2" && n.Status == "ON");
    });

    if (vAccFeat != null ? (vAccFeat.length > 0) : false) {
        var sysObligationMilestone = BindObligationMilestones(ContractID, count);
        completeArticle += sysObligationMilestone.sysObliMilestoneValid;
        count = sysObligationMilestone.count;

    }

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + AccountID + '/milestones?contractid=' + ContractID,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': APIKey },
        cache: false,
        success: function (contactsJsonPayload) {
            $(contactsJsonPayload).each(function (i, item) {
                count++;
                var vMilestoneDate = '';
                var vMilestStatus = '';
                if (item.MilestoneDate != null) {
                    var duedate = item.MilestoneDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                    vMilestoneDate = '(' + duedate + ')';
                    var MilestoneDate = new Date(item.MilestoneDate);
                    var currentDate = new Date();
                    var dateOne = new Date(MilestoneDate.getFullYear(), MilestoneDate.getMonth(), MilestoneDate.getDate(), 00, 00, 00); //Year, Month, Date
                    var dateTwo = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 00, 00, 00); //Year, Month, Date
                    if (dateOne < dateTwo)
                        vMilestStatus = '<b class="milestone-Delayed" title="DELAYED"><img src="../Content/Images/status/exp.png"> Dly</b>';
                    else if (dateOne >= dateTwo)
                        vMilestStatus = '<b class="milestone-Upcoming" title="UPCOMING"><img src="../Content/Images/status/renew.png"> Upco</b>';
                }


                var article = '';
                if (count <= 5)
                    article = '<li class=" margin-bottom-8">';
                else
                    article = '<li class="ShowMoreMilestones margin-bottom-8" style="display:none;">';
                article += '<label id="MilestoneID" style="display:none;">' + item.RowKey + '</label>';
                article += '<label id="MilestoneTitle" style="display:none;">' + item.MilestoneTitle + '</label>';


                if (item.MilestoneCompleted == "Yes" || item.MilestoneCompleted == "yes") {
                    vMilestStatus = '<b class="milestone-Complete" title="COMPLETED"><img src="../Content/Images/status/tick.png"> Comp</b>';

                    if (item.MilestoneDate != null) {
                    }
                    // article += vMilestStatus;
                    article += '<img style="width: 14px; vertical-align: sub;pointer-events: none; margin-right: 2px;" src="/Content/Images/cal-icon.png">';
                    article += '<span class="DateToSort" style="color: black;"> ' + vMilestoneDate + '</span>';
                    article += '<a href="javascript:void(0)" style="color:#555555;" onclick="ViewMilestineDetail(\'' + item.RowKey + '\')"><del>' + item.MilestoneTitle + '</del></a>';
                }
                else {
                    if (item.MilestoneDate != null) {
                    }
                    // article += vMilestStatus;
                    article += '<img style="width: 14px; vertical-align: sub;pointer-events: none; margin-right: 2px;" src="/Content/Images/cal-icon.png">';
                    article += '<span class="DateToSort" style="color: black;"> ' + vMilestoneDate + '</span>';
                    article += '<a href="javascript:void(0)" style="color:#555555;" onclick="ViewMilestineDetail(\'' + item.RowKey + '\')">' + item.MilestoneTitle + '</a>';
                }
                //eO310464
                //article += '<span class="sub-text"> ' + vMilestoneDate + '</span>';
                article += '&nbsp;<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuMilestone"/>';
                article += '</li>';
                //*Harshitha
                completeArticle += article;



                //
                BindMilestoneAlert(item);

            });
            articleMileStone = completeArticle;
            //*Harshitha
            $("#ulMilestoneBody").append(completeArticle);
            //
            if (count > 5) {
                var more = count - 5;
                $("#dvMilestone").html('<a id="ShowMoreMilestones" href="javascript:void(0);" class="pad-all close1" onclick="ShowMoreMilestones()">' + more + ' More Milestones </a>' +
                                          '<a id="ShowLessMilestones" href="javascript:void(0);" class="pad-all close1" onclick="ShowLessMilestones()" style="display:none;">Hide Milestones </a>');
            }

            $("#lblMilestonesCount").text(count);

            $(".openmenuMilestone").contextMenu({ menu: 'dropdownMenu', leftButton: true }, function (action, el, pos) { contextMenuMilestone(action, el.parent("li"), pos, AccountID, APIKey); });

            if (count == 0) {
                $("#ulMilestoneBody").append('No items found.');
            }
            else {
            }

        },
        error: function (request) {
            //*Harshitha
            if (completeArticle != '') {
                $("#ulMilestoneBody").append(completeArticle);
                $('#ulMilestoneBody > li').sort(sortDescending).appendTo('#ulMilestoneBody');
                //
                if (count > 5) {
                    var more = count - 5;
                    $("#dvMilestone").html('<a id="ShowMoreMilestones" href="javascript:void(0);" class="pad-all close1" onclick="ShowMoreMilestones()">' + more + ' More Milestones </a>' +
                                              '<a id="ShowLessMilestones" href="javascript:void(0);" class="pad-all close1" onclick="ShowLessMilestones()" style="display:none;">Hide Milestones </a>');
                }
                articleMileStone = completeArticle;
                $("#lblMilestonesCount").text(count);

                $(".openmenuMilestone").contextMenu({ menu: 'dropdownMenu', leftButton: true }, function (action, el, pos) { contextMenuMilestone(action, el.parent("li"), pos, AccountID, APIKey); });

            }
            else {
                $("#lblMilestonesCount").text('0');
                $("#ulMilestoneBody").append('No items found.');
            }
        },
        complete: function () {

            //*Harshitha

            BindSystemMilestoneTest(articleSystemMileStone, articleDocumentMileStone, articleMileStone);
        }
    });
}




function BindObligationMilestones(contractid, subCount) {
    var completeArticle = '';
    var sbcount = subCount;
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/obligations/obligationsNew?contractid=' + contractid,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': vApiKey },
        cache: false,
        async: false,
        success: function (contactsJsonPayload) {

            $(contactsJsonPayload).each(function (i, item) {

                var vDocValidDate = '';
                if (item.DueDate != null) {
                    sbcount++;
                    var Validdate = item.DueDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                    vDocValidDate = '(' + Validdate + ')';

                    var article = '';
                    if (sbcount <= 5)
                        article = '<li class=" margin-bottom-8">';
                    else
                        article = '<li class="ShowMoreMilestones margin-bottom-8" style="display:none;">';
                    article += '<span>' + item.ObligationTitle + '</span>';
                    if (vDocValidDate != '') {
                        article += '<span> - Obligation Due Date</span>';
                        article += '<span class="sub-text"> ' + vDocValidDate + '</span>';
                    }

                    var beforeDaysSort = [];
                    var afterDaysSort = [];
                    var beforeDays = '';
                    var afterDays = '';
                    var $rem = [item.Reminder1, item.Reminder2, item.Reminder3];
                    var $remCond = [item.Reminder1Condition, item.Reminder2Condition, item.Reminder3Condition];
                    $.each($remCond, function (i, item) {
                        if ($rem[i] != 0 && $rem[i] != "" && $rem[i] != null) {
                            if (item == 'before') {
                                beforeDaysSort.push($rem[i]);
                            }
                            else if (item == 'after') {
                                afterDaysSort.push($rem[i]);
                            }
                        }
                    });
                    beforeDays = beforeDaysSort.sort().reverse();
                    afterDays = afterDaysSort.sort().reverse();
                    if (beforeDays != '' || afterDays != '') {
                        article += '<span class="sub-text-head"> (Reminders ' + (beforeDays != '' ? beforeDays + ' days before' : '') + (afterDays != '' ? (beforeDays != '' ? ' & ' + afterDays + ' days after )' : afterDays + ' days after ) ') : ')') + '</span>';
                    }
                    article += '</li>';
                    completeArticle += article;
                }
            });
        },
        error: function (contactsJsonPayload) {

            alert
        }
    });

    return {
        count: sbcount,
        sysObliMilestoneValid: completeArticle
    };
}


function BindSystemMilestoneTest(sys, doc, actmile) {
    var vAccountID = getParameterByName("AccountID");

    if (actmile != '' || sys != '' || doc != '') {
        $("#ulMilestoneBody").empty();
        $("#ulMilestoneBody").append(actmile);
        $("#ulMilestoneBody").append(doc);
        $("#ulMilestoneBody").append(sys);
        var count = $("#ulMilestoneBody li").length;
        if (count == 0) {
            $("#ulMilestoneBody").append('No items found.');
            $("#lblMilestonesCount").text(0);
        }
        else {
            $("#ulMilestoneBody>li.ShowMoreMilestones").removeClass("ShowMoreMilestones");
            $("#ulMilestoneBody>li").css('display', 'block');

            $('#ulMilestoneBody>li').sort(sortDescending).appendTo('#ulMilestoneBody');
            $('#ulMilestoneBody>li').slice(5, count).addClass("ShowMoreMilestones");
            $('#ulMilestoneBody>li.ShowMoreMilestones').css('display', 'none');
            if (count > 5) {
                var more = count - 5;
                $("#dvMilestone").empty();
                $("#dvMilestone").html('<a id="ShowMoreMilestones" href="javascript:void(0);" class="pad-all close1" onclick="ShowMoreMilestones()">' + more + ' More Milestones </a>' +
                                            '<a id="ShowLessMilestones" href="javascript:void(0);" class="pad-all close1" onclick="ShowLessMilestones()" style="display:none;">Hide Milestones </a>');
            }
            $("#lblMilestonesCount").text(count);
            $(".openmenuMilestone").contextMenu({ menu: 'dropdownMenu', leftButton: true }, function (action, el, pos) { contextMenuMilestone(action, el.parent("li"), pos, vAccountID, vApiKey); });
        }

    }
}

function BindContractLabels(contractItem) {
    if (contractItem.Labels != '') {
        var txtLabelSpans = "";
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/label?labelNames=' + encodeURIComponent(contractItem.Labels),
            type: 'GET',
            dataType: 'json',
            cache: false,
            headers: { 'eContracts-ApiKey': vApiKey },
            success: function (data) {
                $('#dvLabelList').empty();
                var datalenght = data.length;
                for (var i = 0; i < datalenght; i++) {
                    var item = data[i];
                    txtLabelSpans += '<span class="label margin-right-5" style="font-size:12px;background-color:#' + item.LabelColor.trim() + ' !important;">';
                    txtLabelSpans += '<small style="float: left;">' + item.LabelTitle + '</small>';
                    txtLabelSpans += '</span>';
                }
                $('#dvLabelList').append(txtLabelSpans);

            }, error: function (data) {
                var clickEdit = "";
                $('#dvLabelList').append(clickEdit);
            }
        });
    } else {
        var clickEdit = "";
        $('#dvLabelList').append(clickEdit);
    }
}
function BindMilestoneAlert(item) {
    var sRowKey = item.RowKey;
    var sAlertTitle = item.MilestoneTitle;
    var sPriority = "";

    var curDate = moment(new Date());
    var vDate = item.MilestoneDate;
    var start = moment(vDate);
    var beforealert = start.diff(curDate, "days");

    if (beforealert > 0 && ((beforealert <= item.Reminder1 + 60 && item.Reminder1Condition == "before") ||
        (beforealert <= item.Reminder2 + 60 && item.Reminder2Condition == "before") ||
        (beforealert <= item.Reminder3 + 60 && item.Reminder3Condition == "before"))) {

        var alert = "";
        alert += "<img src='../Content/Images/waitng-approval.png' />" + sAlertTitle;
        alert += " <small class='sub-text'>(reminder due in " + beforealert + " days)</small><br/>";
        $("#alertsListUpcomingMilestone").append(alert);

        $("#spNoUpcomingAlert").css('display', 'none');
    }

    if (item.Reminder1Condition == "after" && item.Reminder1 > 0) {
        var nextDate = moment(vDate).add(item.Reminder2, "days");
        var afteralert = nextDate.diff(curDate, "days");
        if (afteralert > 0 && afteralert <= 60) {

            var alert = "";
            alert += "<img src='../Content/Images/waitng-approval.png' />" + sAlertTitle;
            alert += "<small class='sub-text'>(reminder due in " + afteralert + " days)</small><br/>";
            $("#alertsListUpcomingMilestone").append(alert);

            $("#spNoUpcomingAlert").css('display', 'none');
        }
    }
    if (item.Reminder2Condition == "after" && item.Reminder2 > 0) {
        var nextDate = moment(vDate).add(item.Reminder2, "days");
        var afteralert = nextDate.diff(curDate, "days");
        if (afteralert > 0 && afteralert <= 60) {

            var alert = "";
            alert += "<img src='../Content/Images/waitng-approval.png' />" + sAlertTitle;
            alert += "<small class='sub-text'>(reminder due in " + afteralert + " days)</small><br/>";
            $("#alertsListUpcomingMilestone").append(alert);

            $("#spNoUpcomingAlert").css('display', 'none');
        }

    }
    if (item.Reminder3Condition == "after" && item.Reminder3 > 0) {

        var nextDate = moment(vDate).add(item.Reminder2, "days");
        var afteralert = nextDate.diff(curDate, "days");
        if (afteralert > 0 && afteralert <= 60) {

            var alert = "";
            alert += "<img src='../Content/Images/waitng-approval.png' />" + sAlertTitle;
            alert += "<small class='sub-text'>(reminder due in " + afteralert + " days)</small><br/>";
            $("#alertsListUpcomingMilestone").append(alert);

            $("#spNoUpcomingAlert").css('display', 'none');
        }
    }


}



function BindSystemMilestones(Contract) {

    articleSystemMileStone = '';
    var vTermType = Contract.ContractTermType;
    var beforeDaysSort = [];
    beforeDaysSort = Object(beforeDaysSort)
    var afterDaysSort = [];
    afterDaysSort = Object(afterDaysSort)
    ReminderConditionCheck(beforeDaysSort, afterDaysSort, Contract);
    if (vTermType == "Fixed Term") {
        if (Contract.StartDate != null || Contract.EffectiveDate) {
            var dateValue = Contract.StartDate != null ? (Contract.StartDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1')) : (Contract.EffectiveDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'));
            SystemMileStoneArticle("Start / Effective Date", dateValue, beforeDaysSort, afterDaysSort);
        }
        if (Contract.NextEvaluationDate != null) {
            var dateValue = Contract.NextEvaluationDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
            SystemMileStoneArticle("Next Evaluation Date", dateValue, beforeDaysSort, afterDaysSort);
        }
        if (Contract.EndDate != null) {
            var dateValue = Contract.EndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
            SystemMileStoneArticle("End Date (Overall Contract)", dateValue, beforeDaysSort, afterDaysSort);
        }
    }
    else if (vTermType == "Evergreen / Perpetual") {
        if (Contract.StartDate != null || Contract.EffectiveDate) {
            var dateValue = Contract.StartDate != null ? (Contract.StartDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1')) : (Contract.EffectiveDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'));
            SystemMileStoneArticle("Start / Effective Date", dateValue, beforeDaysSort, afterDaysSort);
        }
        if (Contract.NextEvaluationDate != null) {
            var dateValue = Contract.NextEvaluationDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
            SystemMileStoneArticle("Next Evaluation Date", dateValue, beforeDaysSort, afterDaysSort);
        }
    }
    else if (vTermType == "Renewable") {
        if (Contract.StartDate != null || Contract.EffectiveDate != null) {
            var dateValue = Contract.StartDate != null ? (Contract.StartDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1')) : (Contract.EffectiveDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'));
            SystemMileStoneArticle("Initial Term Start Date", dateValue, beforeDaysSort, afterDaysSort);
        }
        //else {
        //    delayedTermDates += "<tr><td class='f_head'>Missing Initial Term Start Date</td></tr>";
        //}
        if (Contract.InitialTermEndDate != null) {
            var dateValue = Contract.InitialTermEndDate != null ? (Contract.InitialTermEndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1')) : "";
            SystemMileStoneArticle("Initial Term End Date", dateValue, beforeDaysSort, afterDaysSort);
        }
        //else {
        //    delayedTermDates += "<tr><td class='f_head'>Missing Initial Term End Date</td></tr>";
        //}
        if (Contract.EndDate != null) {
            var dateValue = Contract.EndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
            SystemMileStoneArticle("End Date (Overall Contract)", dateValue, beforeDaysSort, afterDaysSort);
        }

        if (Contract.TermEndDate != null) {
            var dateValue = Contract.TermEndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
            SystemMileStoneArticle("Current Term Ends", dateValue, beforeDaysSort, afterDaysSort);
        }
        //else {
        //    delayedTermDates += "<tr><td class='f_head'>Missing Current Term End Date</td></tr>";
        //}
        if (Contract.EffectiveDate != null) {
            var dateValue = Contract.EffectiveDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
            SystemMileStoneArticle("Current Term Starts", dateValue, beforeDaysSort, afterDaysSort);
        }
        //else {
        //    delayedTermDates += "<tr><td class='f_head'>Missing Current Term Start Date</td></tr>";
        //}
        //if (Contract.RenewalDate != null) {
        //    var dateValue = Contract.RenewalDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
        //    SystemMileStoneArticle("Renew On", dateValue, beforeDaysSort, afterDaysSort);
        //}
        //else {
        //    delayedTermDates += "<tr><td class='f_head'>Missing Renew On</td></tr>";
        //}

    }
    else if (vTermType == "Executed / Performance") {
        if (Contract.StartDate != null || Contract.EffectiveDate) {
            var dateValue = Contract.StartDate != null ? (Contract.StartDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1')) : (Contract.EffectiveDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'));
            SystemMileStoneArticle("Date of Execution / Performance", dateValue, beforeDaysSort, afterDaysSort);
        }
    }

    //*Harshitha
    BindSystemMilestoneTest(articleSystemMileStone, articleDocumentMileStone, articleMileStone);
}

function SystemMileStoneArticle(titleTerm, dateValue, beforeDaysSort, afterDaysSort) {
    var article = '';
    var formatdateValue = '';
    if (dateValue != "" && dateValue != null) {
        if (AppDateFormat == "undefined" || AppDateFormat == null || AppDateFormat == "") {
            formatdateValue = moment(new Date(dateValue)).format('MM/DD/YYYY');
        }
        else { formatdateValue = moment(new Date(dateValue)).format(AppDateFormat); }

        vDate = formatdateValue != "" ? (formatdateValue + ': ') : "";

        article = '<li class=" margin-bottom-8">';
        article += '<img src="/Content/Images/Contract_Term.png" style="pointer-events: none;">';
        article += '<span class="DateToSort" style="color: black;"> ' + vDate + '</span>';
        //article += ' <a href="javascript:void(0)" style="color:#555555;" onclick=contextMenuTerm(\"view\",\"\",\"\")>' + titleTerm + '</a>';
        article += ' <a href="javascript:void(0)" style="color:#555555;cursor: default;">' + titleTerm + '</a>';

        var beforeDays = '';
        var afterDays = '';
        var resultBefore = $.grep(beforeDaysSort, function (e) { return e.Condition == titleTerm; });
        if (resultBefore != 0) {
            beforeDays = resultBefore[0].Value;
        }
        var resultAfter = $.grep(afterDaysSort, function (e) { return e.Condition == titleTerm; });
        if (resultAfter != 0) {
            afterDays = resultAfter[0].Value;
        }
        if (beforeDays != '' || afterDays != '') {

            article += '<span class="sub-text-head"> (Reminders ' + (beforeDays != '' ? beforeDays + ' day(s) before' : '') + (afterDays != '' ? (beforeDays != '' ? ' & ' + afterDays + ' day(s) after )' : afterDays + ' day(s) after )') : ')') + ' </span>';
        }

        article += '</li>';

        articleSystemMileStone += article;
    }
}


function ReminderConditionCheck(beforeDaysSort, afterDaysSort, Contract) {
    var $rem = [Contract.RenewReminder1, Contract.RenewReminder2, Contract.RenewReminder3];
    var $remCond = [Contract.RenewReminder1Condition, Contract.RenewReminder2Condition, Contract.RenewReminder3Condition];
    $.each($remCond, function (i, item) {
        if ($rem[i] != 0 && $rem[i] != "" && $rem[i] != null) {
            var splitCond = item.split('-');
            if (splitCond[0] == 'before') {
                if (splitCond[1] != 'undefined')
                    Sortreminder(beforeDaysSort, splitCond[1], $rem[i]);
            }
            else if (splitCond[0] == 'after') {
                if (splitCond[1] != 'undefined')
                    Sortreminder(afterDaysSort, splitCond[1], $rem[i]);
            }
        }
    });
}

function Sortreminder(SortList, Condition, Value) {
    var result = $.grep(SortList, function (e) { return e.Condition == Condition; });
    if (result == 0) {
        SortList.push({ 'Condition': Condition, 'Value': Value });
    }
    else {
        result[0].Value = result[0].Value + ',' + Value;
        var splitResult = result[0].Value.split(',');
        splitResult.sort();
        var JoinResult = splitResult.join();
        result[0].Value = JoinResult;
    }


}


function sortDescending(a, b) {

    var date1 = $(a).find("span.DateToSort").text();
    date1 = date1.replace('(', '');
    date1 = date1.replace(')', '');
    date1 = date1.replace(':', '');
    date1 = date1.replace(/ /g, '');
    date1 = date1.split('/');

    if (AppDateFormat == 'DD/MM/YYYY') { date1 = new Date(date1[2], date1[1] - 1, date1[0]); }
    else { date1 = new Date(date1[2], date1[0] - 1, date1[1]); }
    var date2 = $(b).find("span.DateToSort").text();
    date2 = date2.replace('(', '');
    date2 = date2.replace(')', '');
    date2 = date2.replace(':', '');
    date2 = date2.replace(/ /g, '');
    date2 = date2.split('/');

    if (AppDateFormat == 'DD/MM/YYYY') { date2 = new Date(date2[2], date2[1] - 1, date2[0]); }
    else { date2 = new Date(date2[2], date2[0] - 1, date2[1]); }
    return date1 > date2 ? 1 : -1;
}


function BindNotes(contractid) {
    if (contractid == null || contractid == "") { contractid = vContractID; }
    $("#ulNotesBody").empty();
    $("#dvNotes").empty();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/contracts/' + contractid + '/notes',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': vApiKey },
        cache: false,
        success: function (data) {
            var count = 0;
            var datalenght = data != null ? data.length : 0;
            if (datalenght > 0) {
                for (var i = 0; i < datalenght; i++) {
                    var item = data[i];
                    count++;
                    if (typeof (item.Created) != "undefined" && item.Created != null && item.Created != "")
                        var vTime = moment(new Date(item.Created)).format('MMMM Do YYYY, h:mm A');
                    else
                        var vTime = moment(new Date(item.TimeStamp)).format('MMMM Do YYYY, h:mm A');
                    var article = '';
                    if (count <= 10)
                        article = '<li>';
                    else
                        article = '<li class="ShowMoreNotes" style="display:none;">';
                    article += '<span class="color_lightgrey" style="margin-left: 0px;" >' + item.CreatedBy + ' added a note.';
                    if (item.CreatedBy == vUserName)
                        article += '<img src="../Content/Images/edit-quick.png" class="margin-left-5" onclick="GetNoteDetail(\'' + item.RowKey + '\')" /><img src="../Content/Images/close-quick.png" class="margin-left-5" onclick="DeleteNote(\'' + item.RowKey + '\')" />';
                    article += '</span>';
                    article += '<span><small class="color_lightgrey">' + vTime + '</small></span>';

                    article += '<span style="display: block;clear: both;margin:15px 0px;" class="color_dark width100">' + item.Note + '</span>';

                    article += '</li>';

                    $("#ulNotesBody").append(article);

                }
            }
            else {
                $("#ulNotesBody").append('<li><b class="color_lightgrey">No items found.</b></li>');
            }

            if (count > 10) {
                var more = count - 10;
                $("#dvNotes").html('<a id="ShowMoreNotes" href="javascript:void(0);" class="pad-all close1" onclick="ShowMoreNotes()">' + more + ' More Notes </a>' +
                                      '<a id="ShowLessNotes" href="javascript:void(0);" class="pad-all close1" onclick="ShowLessNotes()" style="display:none;">Hide Notes </a>');
            }

            $("#lblNotesCount").text(count);

            if (!$("#lblNotesCount").text().trim()) {
                $("#ulNotesBody").append('<li>No items found.</li>');
            }
        },
        error: function (request) {
            $("#lblNotesCount").text('0');
            $("#ulNotesBody").append('No items found.');
        }
    });
}









function BindContractTermDetail(item) {
    var vTermType = item.ContractTermType;
    //Sridhar
    BindContractTermTypeddl();
    var vTermTypeDisplay = TermTypeDisplayName[vTermType];
    //Sridhar
    var vContractTerm = '';
    var vContractTermEnd = '';
    if (item.Status == "Expired") {
        var vExpiredDate = '';
        if (item.ExpiredDate != null)
            if (AppDateFormat == "undefined" || AppDateFormat == null || AppDateFormat == "") {
                vExpiredDate = item.ExpiredDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
            }
            else {
                if (AppDateFormat == 'DD/MM/YYYY') { vExpiredDate = item.ExpiredDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1'); }
                else if (AppDateFormat == 'MM/DD/YYYY') { vExpiredDate = item.ExpiredDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'); }
            }
        vExpiredDate = ' on ' + vExpiredDate;
        if (item.ExpiredBy == "auto")
            vContractTerm += '<small class="contract_term_date">This Contract auto expired' + vExpiredDate + '.</small>';
        else if (item.ExpiredBy != "")
            vContractTerm += '<small class="contract_term_date">This Contract was expired' + vExpiredDate + ' by ' + item.ExpiredBy + '.</small>';
        else
            vContractTerm += '<small class="contract_term_date">This Contract was expired' + vExpiredDate + '.</small>';
        $("#spContractTerm").html(vContractTerm);
        $("#spContractTerm").addClass('width80');
        $("#spContractTermEnd").html('');
    }
    else if (item.Status == "Cancelled") {
        var vCancelledDate = '';
        if (item.CancelledDate != null)
            if (AppDateFormat == "undefined" || AppDateFormat == null || AppDateFormat == "") {
                vCancelledDate = item.CancelledDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
            }
            else {
                if (AppDateFormat == 'DD/MM/YYYY') { vCancelledDate = item.CancelledDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1'); }
                else if (AppDateFormat == 'MM/DD/YYYY') { vCancelledDate = item.CancelledDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'); }
            }
        vCancelledDate = ' on ' + vCancelledDate;
        if (item.CancelledBy != "")
            vContractTerm += '<small class="contract_term_date">This Contract was cancelled' + vCancelledDate + ' by ' + item.CancelledBy + '.</small>';
        else
            vContractTerm += '<small class="contract_term_date">This Contract was cancelled' + vCancelledDate + '.</small>';
        $("#spContractTerm").html(vContractTerm);
        $("#spContractTerm").addClass('width80');
        $("#dvContractTermLeft").addClass('width80');
        $("#dvContractTermRight").addClass('width4');
        $("#spContractTermEnd").html('');
        $("#dvTask").css("display", "none");
    }
    else {
        if (vTermType == "Fixed Term") {
            $("#spContractTerm").removeClass('width80');
            $("#dvContractTermLeft").removeClass('width80');
            $("#dvContractTermRight").removeClass('width4');
            var vFromDate = moment(new Date());
            var vToDate = null;
            var FstartDate = null;
            var FendDate = null;
            if (item.StartDate != null) {
                if (AppDateFormat == "undefined" || AppDateFormat == null || AppDateFormat == "") {
                    FstartDate = item.StartDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                }
                else {
                    if (AppDateFormat == 'DD/MM/YYYY') { FstartDate = item.StartDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1'); }
                    else if (AppDateFormat == 'MM/DD/YYYY') { FstartDate = item.StartDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'); }
                }
                vContractTerm += '<small class="contract_term_date" title="Start / Effective Date">Start: <small class="colour-blue">' + FstartDate + '</small></small>';
            }
            else
                vContractTerm += '<small class="contract_term_date" title="Start / Effective Date">Start: NA</small>';

            if (item.EndDate != null) {
                vToDate = moment(new Date(item.EndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1')));
                if (AppDateFormat == "undefined" || AppDateFormat == null || AppDateFormat == "") {
                    FendDate = item.EndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                }
                else {
                    if (AppDateFormat == 'DD/MM/YYYY') { FendDate = item.EndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1'); }
                    else if (AppDateFormat == 'MM/DD/YYYY') { FendDate = item.EndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'); }
                }
                vContractTerm += '&nbsp;&nbsp;-&nbsp;&nbsp;<small class="contract_term_date" title="End Date">End: <span style="color:#44A6D8;">' + FendDate + '</small></small>';
            }
            else
                vContractTerm += '<small class="contract_term_date" title="End Date">End: NA</small>';


            if (vToDate != null) {
                var vDiff = DiffBetDate(vFromDate, vToDate);
                if (vDiff == '')
                    vContractTermEnd = '<img src="/Content/Images/Contract_Term.png"> Contract Term Ended';
                else
                    vContractTermEnd = '<img src="/Content/Images/Contract_Term.png"> Contract Ends in <small class="colour-blue">' + vDiff + '</small>';
            }
            if (vContractTermEnd == '')
                vContractTermEnd = '<small class="colour-blue">' + vTermTypeDisplay + '</small>';
            else
                vContractTermEnd += '; <small class="colour-blue">' + vTermTypeDisplay + '</small>';
        } else if (vTermType == "Evergreen / Perpetual") {
            var FstartDate = null;
            $("#spContractTerm").removeClass('width80');
            $("#dvContractTermLeft").removeClass('width80');
            $("#dvContractTermRight").removeClass('width4');
            if (item.StartDate != null) {
                if (AppDateFormat == "undefined" || AppDateFormat == null || AppDateFormat == "") {
                    FstartDate = item.StartDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                }
                else {
                    if (AppDateFormat == 'DD/MM/YYYY') { FstartDate = item.StartDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1'); }
                    else if (AppDateFormat == 'MM/DD/YYYY') { FstartDate = item.StartDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'); }
                }
                vContractTerm += '<small class="contract_term_date" title="Start / Effective Date">Start: <small class="colour-blue">' + FstartDate + '</small></small>';
            }
            else
                vContractTerm += '<small class="contract_term_date" title="Start / Effective Date">Start: NA</small>';


            if (vContractTermEnd == '')
                vContractTermEnd = '<small class="colour-blue">' + vTermTypeDisplay + '</small>';
            else
                vContractTermEnd += ' ; <small class="colour-blue">' + vTermTypeDisplay + '</small>';
        } else if (vTermType == "Executed / Performance") {
            var FstartDate = null;
            $("#spContractTerm").removeClass('width80');
            $("#dvContractTermLeft").removeClass('width80');
            $("#dvContractTermRight").removeClass('width4');
            if (item.StartDate != null) {
                if (AppDateFormat == "undefined" || AppDateFormat == null || AppDateFormat == "") {
                    FstartDate = item.StartDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                }
                else {
                    if (AppDateFormat == 'DD/MM/YYYY') { FstartDate = item.StartDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1'); }
                    else if (AppDateFormat == 'MM/DD/YYYY') { FstartDate = item.StartDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'); }
                }
                vContractTerm += '<small class="contract_term_date" title="Date of Execution / Performance">Date of Execution: <small class="colour-blue">' + FstartDate + '</small></small>';
            }
            else
                vContractTerm += '<small class="contract_term_date" title="Start / Effective Date">Start: NA</small>';


            if (vContractTermEnd == '')
                vContractTermEnd = '<small class="colour-blue">' + vTermTypeDisplay + '</small>';
            else
                vContractTermEnd += ' ; <small class="colour-blue">' + vTermTypeDisplay + '</small>';
        } else if (vTermType == "Renewable") {
            var FstartDate = null;
            var FendDate = null;
            $("#spContractTerm").removeClass('width80');
            $("#dvContractTermLeft").removeClass('width80');
            $("#dvContractTermRight").removeClass('width4');
            var vFromDate = moment(new Date());
            var vToDate = null;
            if (item.StartDate != null) {
                if (AppDateFormat == "undefined" || AppDateFormat == null || AppDateFormat == "") {
                    FstartDate = item.StartDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                }
                else {
                    if (AppDateFormat == 'DD/MM/YYYY') { FstartDate = item.StartDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1'); }
                    else if (AppDateFormat == 'MM/DD/YYYY') { FstartDate = item.StartDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'); }
                }
                vContractTerm += '<small class="contract_term_date" title="Start / Effective Date">Start: <small class="colour-blue">' + FstartDate + '</small></small>';
            }
            else
                vContractTerm += '<small class="contract_term_date" title="Start / Effective Date">Start: NA</small>';

            if (item.TermEndDate != null) {
                if (AppDateFormat == "undefined" || AppDateFormat == null || AppDateFormat == "") {
                    FendDate = item.TermEndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                }
                else {
                    if (AppDateFormat == 'DD/MM/YYYY') { FendDate = item.TermEndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1'); }
                    else if (AppDateFormat == 'MM/DD/YYYY') { FendDate = item.TermEndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'); }
                }
                vContractTerm += '&nbsp;&nbsp;-&nbsp;&nbsp;<small class="contract_term_date" title="End Date">Term End: <small class="colour-blue">' + FendDate + '</small></small>';
            }
            else
                vContractTerm += '<small class="contract_term_date" title="End Date">Term End: NA</small>';

            if (item.RenewalDate != null)
                vToDate = moment(new Date(item.RenewalDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1')));


            if (vToDate != null) {
                var vDiff = DiffBetDate(vFromDate, vToDate);
                if (vDiff == '')
                    vContractTermEnd = '<img src="/Content/Images/Contract_Term.png"> Contract Term Ended';
                else
                    vContractTermEnd = '<img src="/Content/Images/Contract_Term.png"> Current Term Ends in <small class="colour-blue">' + vDiff + '</small>';
            }
            if (vContractTermEnd == '')
                vContractTermEnd = '<small class="colour-blue">' + vTermTypeDisplay + '</small>';
            else
                vContractTermEnd += '; <small class="colour-blue">' + vTermTypeDisplay + '</small>';
        } else {
            vContractTerm += 'The Timelines & Dates for contract is not available.';
            $("#spContractTerm").addClass('width80');
            $("#dvContractTermLeft").addClass('width80');
            $("#dvContractTermRight").addClass('width4');
        }
        $("#spContractTerm").html(vContractTerm);
        $("#spContractTermEnd").html(vContractTermEnd);

        $(".openmenuTerm").contextMenu({ menu: 'dropdownMenuTerm', leftButton: true }, function (action, el, pos) { contextMenuTerm(action, el.parent("div"), pos); });
    }
}




function ShowTabDetail(TabName) {
    if (TabName == "Summary") {
        $('.info-box-main-body').css("display", "none");
        $('#tabSummaryDetail').css("display", "");

        $(".contracttab").removeClass("active");
        $("#tabSummary").addClass("active");
    }
    else if (TabName == "Activity") {
        $('.info-box-main-body').css("display", "none");
        $('#tabActivityDetail').css("display", "");

        $(".contracttab").removeClass("active");
        $("#tabActivity").addClass("active");
    }
    else if (TabName == "Catalog") {
        $('.info-box-main-body').css("display", "none");
        $('#tabCatalogDetail').css("display", "");

        $(".contracttab").removeClass("active");
        $("#tabCatalog").addClass("active");
    }
    else if (TabName == "Transactions") {
        $('.info-box-main-body').css("display", "none");
        $('#tabTransactionsDetail').css("display", "");

        $(".contracttab").removeClass("active");
        $("#tabTransactions").addClass("active");
    }
    else if (TabName == "Obligation") {
        $('.info-box-main-body').css("display", "none");
        $('#tabObligationNewDetail').css("display", "");

        $(".contracttab").removeClass("active");
        $("#tabObligation").addClass("active");
    }
    else if (TabName == "Notes") {
        $('.info-box-main-body').css("display", "none");
        $('#tabNotesDetail').css("display", "");

        $(".contracttab").removeClass("active");
        $("#tabNotes").addClass("active");
    }
}


function getcontractareasettings(contractareaname) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/businessarea/contractareadetailsbyname?contractareaname=' + encodeURIComponent(contractareaname),
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': vApiKey },
        success: function (data) {
            thisContractAreaSettings = data;
            if (thisContractAreaSettings.DocUploadExternal == "Yes") {
                // $(".newdoc").css("display", "");
            }
            else { $(".newdoc").css("display", "none"); }
        },
        error: function (data) {
            var vv = '';
        }
    });
}

//function docdefaultview(doccontractarea) {
//    if (eContractFeatures == "") {
//        var vAccountID = getParameterByName("AccountID");
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
//                if (vDocLibFeat != null ? (vDocLibFeat.length > 0) : false) {
//                    dURL = vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/businessarea/contractareadetailsbyname?contractareaname=' + encodeURIComponent(doccontractarea)
//                } else {
//                    dURL = vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/businessarea/contractareadetailsbyname?contractareaname=Business Area'
//                }

//                $.ajax({
//                    url: dURL,
//                    type: 'GET',
//                    dataType: 'json',
//                    headers: { 'eContracts-ApiKey': vApiKey },
//                    success: function (data) {
//                        if (data != '' && data != 'undefined' && typeof data != "undefined") {
//                            if (data.DocUploadExternal == "No") {
//                                docnewvrupload = true;
//                            }
//                            else {
//                                docnewvrupload = false;
//                            }
//                        } else {
//                            docnewvrupload = false;
//                        }
//                        hidenewversionupload(docnewvrupload);
//                    },
//                    error: function (data) {
//                        docnewvrupload = false;
//                        hidenewversionupload(docnewvrupload)
//                    }
//                });
//            }
//        });
//    }
//    else {
//        var veContractFeatures = eContractFeatures;
//        var vDocLibFeat = $.grep(veContractFeatures, function (n, i) {
//            return (n.RowKey == "14" && n.Status == "ON");
//        });
//        var dURL = "";
//        if (vDocLibFeat != null ? (vDocLibFeat.length > 0) : false) {
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
//                        docnewvrupload = true;
//                    }
//                    else {
//                        docnewvrupload = false;
//                    }
//                } else {
//                    docnewvrupload = false;
//                }
//                hidenewversionupload(docnewvrupload);
//            },
//            error: function (data) {
//                docnewvrupload = false;
//                hidenewversionupload(docnewvrupload)
//            }
//        });

//    }
//}

function hidenewversionupload() {
    $(".hideupload").css("display", "none");
}
function changeinupload(obj) {
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
                            if (Filelengthcol > (Math.round(parseInt(MaxRequestLength) / 1000))) {
                                // swal("", "The maximum permissible size is " + Math.round(parseInt(MaxRequestLength) / 1024) + " MB, Please upload a file which is less than " + Math.round(parseInt(MaxRequestLength) / 1024) + " MB");
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

//Sridhar
function BindContractTermTypeddl() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/contracttermtypesenabled',
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': vApiKey },
        cache: false,
        async: false,
        success: function (data) {
            var datalength = data.length;
            for (var i = 0; i < datalength; i++) {
                TermTypeDisplayName[data[i].ContractTermName] = data[i].ContractTermDisplayName;
            }
        },
        error: function (data) {
        }
    });
}
