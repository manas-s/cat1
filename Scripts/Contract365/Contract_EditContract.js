var ContractID = getParameterByName('ContractID');
var ContractType = getParameterByName('ContractType');
var selecteditems = [];
var thisContractAreaSettings;
var businessAreaPath = "";
var projectManager = "";
var vCurrencyDisplayStyle = "";
var vInRecycleBin = false;
var vGlobalObjForGeneric = "";
var chkobj = "";
var chkspan = "";
var article1 = "";
var previousidcreate = "";
var strContractAreaName12 = "";
var strContractAreaName12Owner = "";
var IsStartDateExists = false;
var article14 = "";
var selecteditems14 = [];
var BusinessAreaAccess14 = localStorage.BusinessAreaAccess;
var strContractAreaName14 = "";
var strContractAreaName14Owner = "";
var previousidedit = "";
var treeBusinessAreaName = '';
var treeBusinessAreaRowKey = '';
var treeBusinessAreaParentBusinessAreaID = '';
var treeBusinessAreaContractAreaName = '';
var treeBusinessAreaContractAreaNameOwner = '';
var treeBusinessAreaOwner = '';
var treeBusinessAreaDescription = '';
var articleTaxonomy1 = "";
var IsTermExists = false;
var IsTermRequired = false;
var multipleChecksDocumentID = [];
var myArrayRU = [];
var arrprevRU = [];
var AutoinceramentNumberforValidate = "";
var PrvAutoinceramentNumberforValidate = "";
var vCounterpartyFields = [];
var DateFileldName = "";
var StatusToAdd = "";
var IsFullControlUser = false;
var InitialTermStartDate = '';
var LastTermEndDate = '';
var LicenseItem = "";
var columnOPConterparty = [];
var arrCALicenseLimit = [];
var myCounterPartyArray = [];
var CounterPartyArrayprev = [];
var contractshow = 0;
var vBusinessAreaChanged = false;
var oldcontractareaname = "";
var arrRelatedcontractRowkey = [];
var arrRelatedRequestRowkey = [];
var RelatedContractRelationShipTypeparent = "";
var oldRelatedcontract = '';
var SavedRelatedContract = [];
var arroldRelatedcontract = [];
var thisLegalEntity = "";
var thiscontractstatus = getParameterByName("Stage");
var LeagalEntity;
var globalcontractnumbersetting = [];
var contractnumbergenereated = [];
var globalseparator = "";
var contractnumbermanual = false;
var chkspan = "";
var mainmetadataFieldsTerm;
var vpipelineStatusAll = ["New", "Awaiting Review", "Reviewed", "In Negotiation", "Negotiation Complete"];
var vContractStatusActive = ["Ready for Signature", "Awaiting Signatures", "Signed", "Active", "Up for Renewal", "About to Expire", "Renewed", "Extended", "On Hold"];
var IsStatus = false;
var IsPermission = false;

var SelectedLegalEntity = "";
var finedvalues = "";
var ContractNumberFinalFormat;
var duplicatecontractchecking = "";
var CurrentContractTypeFields = [];
var CustomDateFieldsXML = "";
//manoj
var SettingUserRole = "";
var defaultGlobalSettings = "";
var applyCurrencyType = false;
var applyCurrencyChangeType = false;
var HideContractType = false;
//manoj
//Sridhar
var vContractTermType = "";
var curselectedContracts = [];
var thisBusinessAreaNameRowKey = "";
var thisContractAreaNameRowKey = "";
var thisBusinessAreaNameC = '';
var thisContractAreaNameC = '';
var thisBusinessAreaPath = '';

var termtypehelptext = "";

var RelationshipTypes = [];
var milestonebuttonclick = false;
var OlRelatedContracts = [];
var AllCounterparties = '';
var strSelCounterPartyField = "";
var PreviousLegalEntity = "";
var listRelatedContracts = [];
var listRelatedRequests = [];
var allUsersList = [];
var vAllMetadata = "";
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
function SelectLegalEntities() {
    $("#OPCounterparties").removeClass('pop_up_Harizondal_meta_active');
    $("#OPLeagalEntities").addClass('pop_up_Harizondal_meta_active');
    $('#tblOPLegalEntities').css("display", "");
    $('#tblOPCounterparties').css("display", "none");
    $('#txtOriginatingPartyType').val("Legal Entity");
    $('#compact-paginationOPLegalEntities').css("display", "");
    $('#compact-paginationOPCounterparties').css("display", "none");
    $('#artOPLegal').css("display", "");
    $('#artOPCounterparties').css("display", "none");
}
function SelectCounterparties() {
    $("#OPLeagalEntities").removeClass('pop_up_Harizondal_meta_active');
    $("#OPCounterparties").addClass('pop_up_Harizondal_meta_active');
    $('#tblOPLegalEntities').css("display", "none");
    $('#tblOPCounterparties').css("display", "");
    $('#txtOriginatingPartyType').val("Counterparty");
    $('#compact-paginationOPCounterparties').css("display", "");
    $('#compact-paginationOPLegalEntities').css("display", "none");
    $('#artOPLegal').css("display", "none");
    $('#artOPCounterparties').css("display", "");
}
function SelectExistingCounterparty() {
    $('#dvCPExistingCounterparty').css("display", "");
    $('#dvCPAddCounterparty').css("display", "none");
    $('#chkCounterpartyNotInList').prop('checked', false);
}
function SelectAddCounterparty() {
    $('#dvCPExistingCounterparty').css("display", "none");
    $('#dvCPAddCounterparty').css("display", "");
    if (!$('#chkCounterpartyNotInList').prop('checked')) {
        $('#chkCounterpartyNotInList').trigger('click');
    }
}
function CheckGlobalSettings1() {
    $('.CP_Det').css('display', 'none');
    $('.CP_Det1').css('display', 'none');
    $("#ddlCounterpartyType").removeClass('validelement');
    $("#txtEmailID").removeClass('validemail');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/GlobalSettings',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            //manoj
            localStorage.setItem("RestrictHighSecurityTagging", data.RestrictHighSecurityTagging);
            defaultGlobalSettings = data;
            if (data == null) {
                $("#spAddCounterparty").css("display", "none");
                $("#Upcoming").css("display", "none");
                $("#Delayed").css("display", "none");
            } else {
                if (data.CreateCounterpartyContract == "Yes") {
                    $("#spAddCounterparty").css("display", "");
                    $("#Upcoming").css("display", "");
                    $("#Delayed").css("display", "");
                }
                else {
                    $("#spAddCounterparty").css("display", "none");
                    $("#Upcoming").css("display", "none");
                    $("#Delayed").css("display", "none");
                }
            }
            if ($("#hdhMilestoneCapture").text() == "Yes") {
                BindPeople();
                BindMilestoneTypes();
            }
            //manoj
        }
    });
}
function getcontractareasettings(contractareaname, CtypeAction) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/contractareadetailsbyname?contractareaname=' + encodeURIComponent(contractareaname),
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        async: false,
        success: function (data) {
            thisContractAreaSettings = data;
            if (data.LegalEntity != "" || data.LegalEntity != "--Select--")
                thisLegalEntity = data.LegalEntity;
            SelectedLegalEntity = thisLegalEntity;
            getcontracttypes(ContractType, CtypeAction);
        },
        error: function (data) {
        }
    });
}
function getContractData() {
    var idel123 = 0;
    $("#loadingPage").fadeIn();
    $("#btnCreate").val("Submit");
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/IContractDetails?contractid=' + ContractID,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID },
        cache: false,
        success: function (mainmetadataFields) {
            CurrentContractTypeFields = [];
            mainmetadataFieldsTerm = mainmetadataFields;
            var vMetadata = $(mainmetadataFields).find('Metadata');
            vAllMetadata = $(mainmetadataFields).find('Metadata');
            oldcontractareaname = $(vMetadata).find('ContractArea').text();
            if (!vBusinessAreaChanged)
                getcontractareasettings($(vMetadata).find('ContractArea').text(), "No");
            var vCT = $(vMetadata).find('ContractType').text();
            //bindAuthoriseUsers();
            //getcontracttypes(vCT);
            //manoj
            if ($("#hdhMilestoneCapture").text() == "Yes") {
                //if (true) {
                try {
                    CustomDateFieldsXML = $(vMetadata).find('CustomDateFields').text();
                    CustomDateFieldsXML = CustomDateFieldsXML.replace(/1rCh84Wi/g, '<');
                    CustomDateFieldsXML = CustomDateFieldsXML.replace(/2iFVH1d3/g, '>');
                } catch (exc) {
                    //alert(ex);
                }
            }
            //manoj

            if ($(vMetadata).find('IsDraft').text() == "Yes") {
                $("#btnSaveDraft").css('display', '')
                $("#draftDescription").css('display', '')
            } else {
                $("#btnSaveDraft").css('display', 'none')
                $("#draftDescription").css('display', 'none')
            }
            if ($(vMetadata).find('Status').last().text() != "") {
                StatusToAdd = $(vMetadata).find('Status').last().text();
                if ($.inArray($(vMetadata).find('Status').last().text(), vContractStatusActive) !== -1)
                    IsStatus = true;
                else {
                    if ($.inArray($(vMetadata).find('Status').last().text(), vpipelineStatusAll) !== -1)
                        IsStatus = true;
                }
            }
            if ($(vMetadata).find('FullControlPermissions').text() != "") {
                var FullControlUsers = $(vMetadata).find('FullControlPermissions').text();
                var FullControlUsersarr = $.map(FullControlUsers.trim().split(';'), function (value) { return value.trim(); })
                if (FullControlUsersarr.indexOf(localStorage.UserName.trim()) > -1)
                    IsFullControlUser = true;
                else {
                    if (localStorage.UserType.indexOf("Global Contract Owner") >= 0) {
                        IsFullControlUser = true;
                    } else {
                        IsFullControlUser = false;
                    }

                }
            }
            else {
                if (localStorage.UserType.indexOf("Global Contract Owner") >= 0) {
                    IsFullControlUser = true;
                } else {
                    IsFullControlUser = false;
                }
            }
            if ($(vMetadata).find('Permission').text() != "") {
                if ($(vMetadata).find('Permission').text() == "Manage")
                    IsPermission = true;
            }

            var arrstatus = ["Ready for Signature", "Awaiting Signatures", "Signed", "Active", "Up for Renewal", "About to Expire", "Renewed", "Extended", "On Hold", "Replaced", "Expired", "Cancelled", "Terminated", "Archived"];
            //if (arrstatus.indexOf(StatusToAdd) > -1) {
            var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
            var vAccFeat = $.grep(veContractFeatures, function (n, i) {
                return (n.RowKey == "16" && n.Status == "ON");
            });
            if (arrstatus.indexOf(StatusToAdd) > -1) {
                thiscontractstatus = '';
            }
            else if (vAccFeat.length > 0) {
                thiscontractstatus = 'pipeline';
            } else {
                thiscontractstatus = '';
            }

            if (!vBusinessAreaChanged)
                $("#txtBusinessArea").val($(vMetadata).find('BusinessArea').text());
            $("#txtContractTemplateName").val($(vMetadata).find('ContractTemplateName').text());

            if (vBusinessAreaChanged) {
                if ($('#txtBA').val() != '') {
                    selecteditems = $('#txtBA').val().split(',');
                    var selecteditemslength = selecteditems.length;
                    $('#liSelectedBA').empty();
                    for (var i = 0; i < selecteditemslength; i++) {
                        $('#liSelectedBA').append('<span style="font-size:11px;">' + selecteditems[i] + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveSelected(this);" style="float:right" /></span>');
                    }
                    thisBusinessAreaNameC = $("#txtBusinessArea").val();
                    thisContractAreaNameC = $('#txtContractAreaName').val();
                    getBusinessAreaDetails($("#txtBusinessArea").val(), $('#txtContractAreaName').val());

                }
            } else {
                if ($(vMetadata).find('BusinessArea').text() != '') {
                    selecteditems = $(vMetadata).find('BusinessArea').text().split(',');
                    $('#txtBA').val($(vMetadata).find('BusinessArea').text());
                    thisBusinessAreaNameC = $(vMetadata).find('BusinessArea').text();
                    try {
                        thisContractAreaNameC = $(vMetadata).find("ContractArea").text();
                        $('#txtContractAreaName').val($(vMetadata).find("ContractArea").text());
                        $('#txtContractAreaAdministrators').val($(vMetadata).find("ContractAreaAdministrators").text());
                        $('#txtBusinessAreaOwners').val($(vMetadata).find("BusinessAreaOwners").text());
                        businessAreaPath = $(vMetadata).find("BusinessAreaPath").text();
                        thisBusinessAreaPath = $(vMetadata).find("BusinessAreaPath").text();
                    }
                    catch (err) {
                    }
                    var selecteditemslength = selecteditems.length;
                    $('#liSelectedBA').empty();
                    for (var i = 0; i < selecteditemslength; i++) {
                        $('#liSelectedBA').append('<span style="font-size:11px;">' + selecteditems[i] + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveSelected(this);" style="float:right" /></span>');
                    }

                    getBusinessAreaDetails($("#txtBusinessArea").val(), $('#txtContractAreaName').val());
                }
            }
            if (businessAreaPath != "") {
                BindRelatedContractsFilters();
            }
            BindBusinessAreaPicker11();
            if (getParameterByName("Duplicate") == "Yes") {

                $("#txtContractTitle").val($(vMetadata).find('ContractTitle').text() + "_Duplicate");
                //$("#txtContractNumber").val($(vMetadata).find('ContractNumber').text());
                CheckContractNumberSetting();

                $("#formTitle").html("Duplicate Contract");
                $("#btnDuplicate").css('display', '');
                $("#btnCreate").css('display', 'none');
                $("#duplicateDescription").css('display', '');
                $("#updateDescription").css('display', 'none');
                //PrvAutoinceramentNumberforValidate = $(vMetadata).find('AutoIncrmentNumber').text();
            }
            else {

                $("#duplicateDescription").css('display', 'none');
                $("#updateDescription").css('display', '');
                $("#txtContractTitle").val($(vMetadata).find('ContractTitle').text());
                $("#txtContractNumber").val($(vMetadata).find('ContractNumber').text());
                CheckContractNumberSetting();
                PrvAutoinceramentNumberforValidate = $(vMetadata).find('AutoIncrmentNumber').text();
            }

            $("#ddlTransactionTypes").find('option[value="' + $(vMetadata).find('TransactionType').text() + '"]').prop("selected", true);
            var contractclass = "";
            contractclass = $(vMetadata).find('ContractClass').text();
            $("#ddlContractClasses").find('option[value="' + contractclass + '"]').prop("selected", true);

            if (contractclass == "Sub-Contract") {
                $("#txtMasterAgreement").val($(vMetadata).find('RelatedContract').text());
                $("#txtRelatedContractID").val($(vMetadata).find('RelatedContractID').text());

            }
            //manoj
            //var veContractFeaturesCTLU = JSON.parse(localStorage.getItem("eContractFeatures"));
            //var vCustomMetadata = $.grep(veContractFeaturesCTLU, function (n, i) {
            //    return (n.RowKey == "24" && n.Status == "ON");
            //});    
            //if (vCustomMetadata.length > 0) {
            //    GetContractTypeDetails(vMetadata, ContractType);
            //} else {
            bindcontracttypemetadata(vMetadata, ContractType, true);
            //}
            //manoj

            $("#loadingPage").fadeOut();

        },
        error: function (data) {
            $("#loadingPage").fadeOut();
        }
    });
}

//manoj
//for CType Custom Metadata

function GetContractTypeDetails(vMetadata, ContractType) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contracttypes?contracttypename=' + encodeURIComponent(ContractType),
        type: 'GET',
        dataType: 'json',
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        cache: false,
        success: function (contracttypes) {
            //manoj
            if (contracttypes != null) {
                if (contracttypes.FUCustomMetadata.toLowerCase() == "off") {
                    bindcontracttypemetadata(vMetadata, ContractType, false);
                } else {
                    bindcontracttypemetadata(vMetadata, ContractType, true);
                }
            } else {
                bindcontracttypemetadata(vMetadata, ContractType, true)
            }
            //manoj
        },
        error: function (contracttypes) {
            bindcontracttypemetadata(vMetadata, ContractType, true)
        }
    });
}

function bindcontracttypemetadata(vMetadata, ContractType, action) {
    var idelcheck = null;
    //var ContractTypeToPass = "";
    //if (action) {
    //    ContractTypeToPass= vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contracttypes/metadatas?contracttypename=' + encodeURIComponent(ContractType)
    //} else {
    //    ContractTypeToPass= vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contracttypes/custommetadatas'
    //    $("#ddlTransactionTypes").find('option[value="Legal/General Agreement"]').prop("selected", true);
    //}
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contracttypes/metadatas?contracttypename=' + encodeURIComponent(ContractType),
        type: 'GET',
        dataType: 'json',
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        cache: false,
        success: function (metadataFieldsvalue) {
            var metadataFields = [];
            if (getParameterByName("Stage") == "pipeline" && getParameterByName("Duplicate") == "Yes") {
                metadataFields = $.grep(metadataFieldsvalue, function (n, i) {
                    return (n.Newform == "Show" || n.Newform == "Required");
                });
            } else if (getParameterByName("Stage") == "pipeline" && getParameterByName("Finalize") == "true") {
                metadataFields = $.grep(metadataFieldsvalue, function (n, i) {
                    return (n.Finalizingfrom == "Show" || n.Finalizingfrom == "Required");
                });
            } else if (getParameterByName("Stage") == "pipeline") {
                metadataFields = $.grep(metadataFieldsvalue, function (n, i) {
                    return (n.Newform == "Show" || n.Newform == "Required" || n.Finalizingfrom == "Show" || n.Finalizingfrom == "Required");
                });
            }
            else if (getParameterByName("Closeout") == "Yes") {
                metadataFields = $.grep(metadataFieldsvalue, function (n, i) {
                    return (n.Closeoutform == "Show" || n.Closeoutform == "Required");
                });
            }
            else {
                metadataFields = $.grep(metadataFieldsvalue, function (n, i) {
                    return (n.Finalizingfrom == "Show" || n.Finalizingfrom == "Required" || n.Closeoutform == "Show" || n.Closeoutform == "Required");
                });
            }

            var hasContractTermType = false;
            if ($.grep(metadataFieldsvalue, function (n, i) {
                    return (n.FieldName == "ContractTermType");
            }).length > 0) {
                hasContractTermType = true;
            }

            vContractMetadataFields = [];
            var vUserList = '';
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/users',
                type: 'GET',
                dataType: 'json',
                'Content-Type': 'application/json',
                cache: false,
                async: false,
                headers: {
                    'eContracts-ApiKey': localStorage.APIKey
                },
                success: function (dataUser) {
                    $(dataUser).each(function (i, item) {
                        var sRowKey = item.RowKey;
                        var sUserName = item.UserName;
                        vUserList += '<option value="' + sUserName + '">' + sUserName + '</option>';
                    });
                },
                error:
                    function (dataUser) {
                    }
            });

            //manoj
            //Financial Break Down Feature
            var veContractFeaturesFinancial = JSON.parse(localStorage.getItem("eContractFeatures"));
            var vDocLibFeatFinancial = $.grep(veContractFeaturesFinancial, function (nFinancial, iFinancial) {
                return (nFinancial.RowKey == "19" && nFinancial.Status == "ON");
            });
            if (vDocLibFeatFinancial.length > 0) {
                applyCurrencyChangeType = true;
                var FinancialmetadataFields = $.grep(metadataFields, function (nmeta, imeta) {
                    return (nmeta.FieldName == "ContractValue");
                });

                var CustomFinancialmetadataFields = $.grep(metadataFields, function (nmeta, imeta) {
                    return (nmeta.CustomFieldsGroupName == "FinancialCustomFields");
                });

                if (FinancialmetadataFields.length == 0 && CustomFinancialmetadataFields.length > 0) {
                    applyCurrencyType = true;
                }
            }
            //Financial Break Down Feature

            var startdate = $.grep(metadataFields, function (nmeta, imeta) {
                return (nmeta.FieldName == "StartDate");
            });

            if (startdate.length > 0)
                IsStartDateExists = true;
            //manoj

            var vTransactionTypeExist = '';
            var vContractClassExist = '';
            var strPreviousFieldGroupName = '';
            $(metadataFields).each(function (i, item) {
                if ((item.FieldName != "ContractTitle") && (item.FieldName != "ContractType") && (item.FieldName != "BusinessArea")) {
                    CurrentContractTypeFields.push(item.FieldName);
                }
                var strFieldGroupName = item.FieldGroup;
                if ((item.FieldName == "ContractTitle") || (item.FieldName == "ContractType") || (item.FieldName == "BusinessArea") || (item.FieldType == "File Upload")) {
                    switch (item.FieldName) {
                        case "BusinessArea":
                            {
                                $("#imgbusinessarea").attr('title', item.HelpText);
                                break;
                            }
                        case "ContractType":
                            {
                                $("#imgcontracttype").attr('title', item.HelpText);
                                break;
                            }
                        case "ContractTitle":
                            {
                                $("#imgcontracttitle").attr('title', item.HelpText);
                                $('#lblTitleDesc').text(item.Description);
                                break;
                            }
                    }
                }
                else {
                    if (item.FieldName == "Status")
                    { }
                    else {
                        if (!hasContractTermType)
                            vContractMetadataFields.push(item.FieldName);
                    }
                    if (!hasContractTermType) {
                        var idelvalue = "grp" + item.FieldGroup;
                        idelvalue = idelvalue.replace('&amp;', '');
                        idelvalue = idelvalue.replace(/[\*\|\,\"\:\<\>\[\}\{\}\'\(\)\@\&\$\#\%\.\-\!\@\$]/g, '').replace(/\//g, '').replace(/ /g, '');
                        if (item.ShowInEditForm == "true") {
                            var vControlsGroup = "";
                            if (strPreviousFieldGroupName != item.FieldGroup) {
                                vControlsGroup = '<div class="row-group"><hr class="form_hr"/><div class="col12 no-pad"><div class="collapse-heading"><div class="col10 no-pad"><h3 class="h3-head" style="padding-left: 10px;" id="fieldGroup-1">' + item.FieldGroup + '</h3>';
                                $.ajax({
                                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/contractfieldgroup?groupname=' + item.FieldGroup,
                                    type: 'GET',
                                    dataType: 'json',
                                    headers: {
                                        'eContracts-ApiKey': localStorage.APIKey
                                    },
                                    cache: false,
                                    async: false,
                                    success: function (data) {
                                        if (data != null) {
                                            vControlsGroup += '<p class="p-text help" style="padding-left: 10px;">' + data.Description + '</p>';
                                        }
                                    }
                                });
                                var idel123img = idelvalue + 'img';
                                vControlsGroup += '<p class="p-text"></p></div><div class="col2 text-right"><a class="" href="javascript:void(0);"><img id="' + idel123img + '" src="../Content/Images/e-close.png" title="Collapse" /></a></div></div></div></div><div id="' + idelvalue + '">';
                                try {
                                    //manoj
                                    var allowtocreatefield = true;
                                    if (getParameterByName("TaskAllow") == "No" && (item.FieldName == "ContractTermType" || item.FieldName == "RelatedRequests" || item.FieldName == "RelatedContracts")) {
                                        allowtocreatefield = false;
                                    }
                                    //manoj
                                    if (allowtocreatefield) {
                                        idelcheck = createingdivbyme(item, vControlsGroup, idelvalue, idelcheck, vUserList, vMetadata);
                                        allowOnlyNumberInInputBox("ContractTerm");
                                    }
                                }
                                catch (ex) {
                                }
                            }
                            else {
                                try {
                                    //manoj
                                    var allowtocreatefield = true;
                                    if (getParameterByName("TaskAllow") == "No" && (item.FieldName == "ContractTermType" || item.FieldName == "RelatedRequests" || item.FieldName == "RelatedContracts")) {
                                        allowtocreatefield = false;
                                    }
                                    //manoj
                                    if (allowtocreatefield) {
                                        idelcheck = createingdivbyme(item, vControlsGroup, idelvalue, idelcheck, vUserList, vMetadata);
                                        allowOnlyNumberInInputBox("ContractTerm");
                                    }
                                }
                                catch (ex) {
                                }
                            }
                        }
                    }
                    else {
                        if (item.FieldName == "ContractTermNotes" || item.FieldName == "StartDate" || item.FieldName == "TermEndDate" || item.FieldName == "RequiresAuth" || item.FieldName == "RenewalConfirmParticipants" || item.FieldName == "CounterpartyNotices" || item.FieldName == "CounterpartyNoticesRenewal" || item.FieldName == "EndDate") {
                        }
                        else {
                            vContractMetadataFields.push(item.FieldName);
                            var idelvalue = "grp" + item.FieldGroup;
                            idelvalue = idelvalue.replace('&amp;', '');
                            idelvalue = idelvalue.replace(/[\*\|\,\"\:\<\>\[\}\{\}\'\(\)\@\&\$\#\%\.\-\!\@\$]/g, '').replace(/\//g, '').replace(/ /g, '');
                            if (item.ShowInEditForm == "true") {
                                var vControlsGroup = "";
                                if (strPreviousFieldGroupName != item.FieldGroup) {
                                    vControlsGroup = '<div class="row-group"><hr class="form_hr"/><div class="col12 no-pad"><div class="collapse-heading"><div class="col10 no-pad"><h3 class="h3-head" style="padding-left: 10px;" id="fieldGroup-1">' + item.FieldGroup + '</h3>';
                                    $.ajax({
                                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/contractfieldgroup?groupname=' + item.FieldGroup,
                                        type: 'GET',
                                        dataType: 'json',
                                        headers: {
                                            'eContracts-ApiKey': localStorage.APIKey
                                        },
                                        cache: false,
                                        async: false,
                                        success: function (data) {
                                            if (data != null) {
                                                vControlsGroup += '<p class="p-text help" style="padding-left: 10px;">' + data.Description + '</p>';
                                            }
                                        }
                                    });
                                    var idel123img = idelvalue + 'img';
                                    vControlsGroup += '<p class="p-text"></p></div><div class="col2 text-right"><a class="" href="javascript:void(0);"><img id="' + idel123img + '" src="../Content/Images/e-close.png" title="Collapse" /></a></div></div></div></div><div id="' + idelvalue + '">';
                                    try {
                                        //manoj
                                        var allowtocreatefield = true;
                                        if (getParameterByName("TaskAllow") == "No" && (item.FieldName == "ContractTermType" || item.FieldName == "RelatedRequests" || item.FieldName == "RelatedContracts")) {
                                            allowtocreatefield = false;
                                        }
                                        //manoj
                                        if (allowtocreatefield) {
                                            idelcheck = createingdivbyme(item, vControlsGroup, idelvalue, idelcheck, vUserList, vMetadata);
                                            allowOnlyNumberInInputBox("ContractTerm");
                                        }
                                    }
                                    catch (ex) {
                                    }
                                }
                                else {
                                    try {
                                        //manoj
                                        var allowtocreatefield = true;
                                        if (getParameterByName("TaskAllow") == "No" && (item.FieldName == "ContractTermType" || item.FieldName == "RelatedRequests" || item.FieldName == "RelatedContracts")) {
                                            allowtocreatefield = false;
                                        }
                                        //manoj
                                        if (allowtocreatefield) {
                                            idelcheck = createingdivbyme(item, vControlsGroup, idelvalue, idelcheck, vUserList, vMetadata);
                                            allowOnlyNumberInInputBox("ContractTerm");
                                        }
                                    }
                                    catch (ex) {
                                    }

                                }
                            }
                        }
                    }
                }

                if (item.FieldType != "File Upload") {
                    strPreviousFieldGroupName = item.FieldGroup;
                }
            });
            if (getParameterByName("Duplicate") == "Yes") {

            }
            else {
                if (thiscontractstatus.toLowerCase() != null && thiscontractstatus.toLowerCase() != "") {
                    if (thiscontractstatus.toLowerCase().trim() == "pipeline") {
                        $("#ddlContractTypes").removeAttr("disabled");
                        $("#viewbusinessarea").removeClass("disable-control");
                        $("#viewbusinessarea").removeAttr("disabled");
                        $("#txtBusinessArea").removeAttr("disabled");
                        $("#ddlContractTypes").removeAttr("disabled");
                        $("#txtContractNumber").removeAttr("disabled");
                        $("#CompanyProfile").removeAttr("disabled");
                        $("#OriginatingParty").removeAttr("disabled");
                        $("#txtContractTitle").removeAttr("disabled"); //new
                    } else {
                        if (IsFullControlUser != true) {
                            $("#ddlContractTypes").attr("disabled", true);
                            $("#viewbusinessarea").addClass("disable-control");
                            $("#viewbusinessarea").attr("disabled", true);
                            $("#txtBusinessArea").attr("disabled", true);
                            $("#ddlContractTypes").attr("disabled", true);
                            $("#txtContractNumber").attr("disabled", true);
                            $("#CompanyProfile").attr("disabled", true);
                            $("#OriginatingParty").attr("disabled", true);
                            $("#txtContractTitle").attr("disabled", true); //new
                        }
                        else {
                            $("#ddlContractTypes").removeAttr("disabled");
                            $("#viewbusinessarea").removeClass("disable-control");
                            $("#viewbusinessarea").removeAttr("disabled");
                            $("#txtBusinessArea").removeAttr("disabled");
                            $("#ddlContractTypes").removeAttr("disabled");
                            $("#txtContractNumber").removeAttr("disabled");
                            $("#CompanyProfile").removeAttr("disabled");
                            $("#OriginatingParty").removeAttr("disabled");
                            $("#txtContractTitle").removeAttr("disabled"); //new
                        }
                    }
                } else {
                    if (IsFullControlUser != true) {
                        $("#viewbusinessarea").addClass("disable-control");
                        $("#viewbusinessarea").attr("disabled", true);
                        $("#ddlContractTypes").attr("disabled", true);
                        $("#txtContractTitle").attr("disabled", true); //new
                        $("#txtContractNumber").attr("disabled", true);
                        $("#txtBusinessArea").attr("disabled", true);
                        $("#CompanyProfile").attr("disabled", true);
                        $("#OriginatingParty").attr("disabled", true);
                    }
                    else {
                        $("#ddlContractTypes").removeAttr("disabled");
                        $("#viewbusinessarea").removeClass("disable-control");
                        $("#viewbusinessarea").removeAttr("disabled");
                        $("#txtBusinessArea").removeAttr("disabled");
                        $("#ddlContractTypes").removeAttr("disabled");
                        $("#txtContractNumber").removeAttr("disabled");
                        $("#CompanyProfile").removeAttr("disabled");
                        $("#OriginatingParty").removeAttr("disabled");
                        $("#txtContractTitle").removeAttr("disabled"); //new
                    }
                }
            }


            //manoj
            if ($("#hdhMilestoneCapture").text() == "Yes") {
                //if (true) {
                $('.customdatefieldchange').each(function () {
                    this.onchange = function () {
                        CustomDateFieldChange(this);
                    };
                });
            }

            if (applyCurrencyChangeType) {
                $("#ContractCurrency").trigger("onchange");
            }
            //manoj
        }
    });
    $("#loadingPage").fadeOut();
}

function getActiveCounterparties() {
    AllCounterparties = '';
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/counterpartypicker',
        type: 'GET',
        dataType: 'json',
        headers: {
            'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID
        },
        cache: false,
        //async: false,
        success: function (data) {
            AllCounterparties = data;
        },
        error: function (data) {
        }
    });

}

function getAllLegalEntities() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/legalentities',
        type: 'GET',
        dataType: 'json',
        headers: {
            'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID
        },
        cache: false,

        success: function (data) {
            LeagalEntity = data;
        },
        error: function (data) {
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
$(document).ready(function () {
    getActiveCounterparties();//Performance Optimization
    getCurrencyDisplayStyle();
    //manoj
    getContractData();
    //getAllLegalEntities();
    var DatepickerFormat = '';
    if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
    { DatepickerFormat = 'mm/dd/yy'; }
    else {
        DatepickerFormat = localStorage.AppDateFormat.toLowerCase().slice(0, -2);
    }
    $("#dtMilestoneDateNew").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: DatepickerFormat,
        //onSelect: function (dateText, inst) {
        //GetMilestonedynamicRecurrenceCount();
        //MilestoneDateSlectedEvent(this);
        //},
    });
    //manoj
    //Capture dates as milestone feature

    var veContractFeaturesMilestone = JSON.parse(localStorage.getItem("eContractFeatures"));
    var vDocLibFeatMilestone = $.grep(veContractFeaturesMilestone, function (n, i) {
        return (n.RowKey == "22" && n.Status == "ON");
    });
    if (vDocLibFeatMilestone.length > 0) {
        $("#hdhMilestoneCapture").text("Yes");
    } else {
        $("#hdhMilestoneCapture").text("No");
    }
    $('.AlertEnabled .Toggle').click(function () {
        //EnableSlider()
        var obj = jQuery(this).parent();
        $(obj).toggleClass('switch_enable').toggleClass('switch_disable');
        if ($(obj).hasClass('switch_enable')) {
            obj.children('input').val('Yes').change();
        }
        else {
            obj.children('input').val('No').change();
        }
    });
    //Allow only passitive numbers
    allowOnlyNumberInInputBox('txtReminder1MilestoneNew');
    allowOnlyNumberInInputBox('txtReminder2MilestoneNew');
    allowOnlyNumberInInputBox('txtReminder3MilestoneNew');
    //Allow only passitive numbers
    //Capture dates as milestone feature
    //manoj
    //CheckLicenseLimit();
    //CheckGlobalSettings();
    //BindCountry();
    //BindCounterpartyType();
    //getContractNumberFormat();


    //GetUsers();
    //BindContractRelationships();


    if (getParameterByName("Duplicate") == "Yes") {
        var veContractFeaturesPipeline = JSON.parse(localStorage.getItem("eContractFeatures"));
        var vPipelineFeature = $.grep(veContractFeaturesPipeline, function (n, i) {
            return (n.RowKey == "16" && n.Status == "ON");
        });
        if (vPipelineFeature.length > 0) {
            //manoj
            $("#viewbusinessarea").css("display", "none");
            //manoj
            contractshow = 0;
            $("#hformtitle").html("Create Duplicate Contract Record");
            $("#pformdescription").html("Fill in and submit this form to get started with a new Contract Record. A Contract Record is an envelope or cabinet that holds together Documents, Milestones, Amendments and Other Settings for a contract.");
            var vConStatus = '';
            var vCreateContMsgText = '';
            vConStatus += '<option value="New">New</option>';
            vConStatus += '<option value="Approved">Approved</option>';
            vConStatus += '<option value="In Negotiation">In Negotiation</option>';
            vConStatus += '<option value="Negotiation Complete">Negotiation Complete</option>';
            $("#ddlContractStatus").html(vConStatus);
            StatusToAdd = "New";
            vCreateContMsgText = 'This Contract Record will be added as a New/Work in Progress Contract Record to the Pipeline. If it\'s a Finalized/Ready for Signature Contract Record, <a href="javascript:void(0);" onclick="ChangeCreateContract(\'Final\');">add as Finalized/Ready for Signature.</a>';
            $("#dvCreateContMsgText").html(vCreateContMsgText);
            $('#statusdisplay').css("display", "block");
            $('#createstatusdisplay').css("display", "block");
        }
        else {
            //manoj
            $("#viewbusinessarea").css("display", "none");
            //manoj
            contractshow = 0;
            $("#hformtitle").html("Create Duplicate Contract Record");
            $("#pformdescription").html("Fill in and submit this form to get started with a new Contract Record. A Contract Record is an envelope or cabinet that holds together Documents, Milestones, Amendments and Other Settings for a contract.");
            var vConStatus = '';
            //var vCreateContMsgText = '';
            vConStatus += '<option value="Ready for Signature">Ready for Signature</option>';
            vConStatus += '<option value="Signed">Signed</option>';
            vConStatus += '<option value="Awaiting Signatures">Awaiting Signatures</option>';
            vConStatus += '<option value="Active">Active</option>';
            vConStatus += '<option value="Expired">Expired</option>';
            $("#ddlContractStatus").html(vConStatus);
            StatusToAdd = "Ready For Signature";
            vCreateContMsgText = 'This Contract Record will be added as a Finalized/Ready for Signature Contract Record.';
            $("#dvCreateContMsgText").html(vCreateContMsgText);
            $('#statusdisplay').css("display", "block");
            $('#createstatusdisplay').css("display", "block");
        }
    }
    else {
        $("#hformtitle").html("Edit Contract Record");
        $("#pformdescription").html("Edit an existing Contract Record.");
        $('#statusdisplay').empty();
        $('#createstatusdisplay').empty();
        //manoj
        if (thiscontractstatus.toLowerCase() != null && thiscontractstatus.toLowerCase() != "") {
            if (thiscontractstatus.toLowerCase().trim() == "pipeline") {
                $("#ddlContractTypes").removeAttr("disabled");
                $("#viewbusinessarea").removeClass("disable-control");
                $("#viewbusinessarea").removeAttr("disabled");
                $("#txtBusinessArea").removeAttr("disabled");
                $("#ddlContractTypes").removeAttr("disabled");
                $("#txtContractNumber").removeAttr("disabled");
                $("#CompanyProfile").removeAttr("disabled");
                $("#OriginatingParty").removeAttr("disabled");
                $("#txtContractTitle").removeAttr("disabled"); //new
            } else {
                if (IsFullControlUser != true) {
                    $("#ddlContractTypes").attr("disabled", true);
                    $("#viewbusinessarea").addClass("disable-control");
                    $("#viewbusinessarea").attr("disabled", true);
                    $("#txtBusinessArea").attr("disabled", true);
                    $("#ddlContractTypes").attr("disabled", true);
                    $("#txtContractNumber").attr("disabled", true);
                    $("#CompanyProfile").attr("disabled", true);
                    $("#OriginatingParty").attr("disabled", true);
                    $("#txtContractTitle").attr("disabled", true); //new
                }
            }
        } else {
            if (IsFullControlUser != true) {
                $("#viewbusinessarea").addClass("disable-control");
                $("#viewbusinessarea").attr("disabled", true);
                $("#ddlContractTypes").attr("disabled", true);
                $("#txtContractTitle").attr("disabled", true); //new
                $("#txtContractNumber").attr("disabled", true);
                $("#txtBusinessArea").attr("disabled", true);
                $("#CompanyProfile").attr("disabled", true);
                $("#OriginatingParty").attr("disabled", true);
            }
        }
        //manoj

    }

    if (localStorage.AppDateFormat == null || localStorage.AppDateFormat == "" || localStorage.AppDateFormat == 'undefined') {
        $("#dtStartDate").datepicker();
        $("#dtEndDate").datepicker();
    }
    else {
        var dateformate = localStorage.AppDateFormat.toLowerCase().slice(0, -2);
        $("#dtStartDate").datepicker({ dateFormat: dateformate });
        $("#dtEndDate").datepicker({ dateFormat: dateformate });
    }
    //ENH487 Customer inhanc
    $("#dvViewProject").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "Project",
        modal: true,
        buttons: {
            Close: function () {
                $(this).dialog("close");
            }
        }
    });

    $("#dvViewProjectTask").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "Project Task",
        modal: true,
        buttons: {
            Close: function () {
                $(this).dialog("close");
            }
        }
    });


    $("#browseBA").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        height: 600,
        title: "Users",
        modal: true,
        buttons: {
            "OK": function () {
                if ($('#liSelectedBA span').length > 0) {
                    if (treeBusinessAreaRowKey != "") {
                        $('#txtBARowkey').val(treeBusinessAreaRowKey);
                        $('#txtBAParent').val(treeBusinessAreaParentBusinessAreaID);
                        $('#txtBA').val(treeBusinessAreaName);
                        $('#txtContractAreaName').val(treeBusinessAreaContractAreaName);
                        $('#txtContractAreaAdministrators').val(treeBusinessAreaContractAreaNameOwner);
                        $('#txtBusinessAreaOwners').val(treeBusinessAreaOwner);
                        $('#lblBusinessAreaDescription').text(treeBusinessAreaDescription);

                        $.ajax({
                            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/businessarealocation?businessareaid=' + treeBusinessAreaRowKey,
                            type: 'GET',
                            dataType: 'json',
                            headers: {
                                'eContracts-ApiKey': localStorage.APIKey
                            },
                            success: function (fullhierarchy) {
                                businessAreaPath = fullhierarchy;
                                BindRelatedContractsFilters();
                            },
                            error: function (fullhierarchy) {

                            }
                        });

                        var str = $('#txtBA').val();
                        var strReplaced = str.replace(/\,/g, ';');
                        $('#txtBusinessArea').val(strReplaced);
                        getcontractareasettings($('#txtContractAreaName').val(), "Yes");
                        vBusinessAreaChanged = true;
                        //getcontracttypes("");
                    }
                    $(this).dialog("close");
                }
                else {

                    swal("", "Select Business Area");
                }
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });
    $("#popupContracts").dialog({
        autoOpen: false,
        closeText: "",
        width: "85%",
        height: "auto",
        title: "Related Contract Record(s)",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "OK": function () {
                curselectedContracts = []; RelatedContractsPush();
                $("#ddlRelConFilterContractType option:selected").prop('selected', false).trigger('chosen:updated');
                $("#ddlRelConFilterCounterparty option:selected").prop('selected', false).trigger('chosen:updated');
            },
            Cancel: function () {
                //if ($("#RelatedContracts").val() != "") {
                //    var rindex = "";
                //    //var selectedCont = $("#RelatedContracts").val().split(';');
                //    var selectedCont = $.map($("#RelatedContracts").val().split(';'), $.trim);
                //    if (arrRelatedContracts.length != 0) {
                //        var rtitle = arrRelatedContracts[arrRelatedContracts.length - 1].RelatedContractTitle.split(";");
                //        var rid = arrRelatedContracts[arrRelatedContracts.length - 1].RelatedContractID.split(";");
                //        var rrtype = arrRelatedContracts[arrRelatedContracts.length - 1].RelatedRelationshipType.split(";");
                //        var rtype = arrRelatedContracts[arrRelatedContracts.length - 1].RelationshipType.split(";");

                //        $(curselectedContracts).each(function (i, item) {
                //            if (item != "" && rtitle.indexOf(item.trim()) > -1) {
                //                rindex = rtitle.indexOf(item.trim());
                //                //Remove span
                //                $("#liSelectedRelatedContract span#" + rid[rindex]).remove();
                //                $('input:checkbox').filter('[id="' + rid[rindex] + '"]').prop('checked', false);
                //                if (arrRelatedcontractRowkey.length > 0) {
                //                    arrRelatedcontractRowkey.splice(arrRelatedcontractRowkey.indexOf(rid[rindex]),1)
                //                }
                //                rtitle[rindex] = "";
                //                rid[rindex] = "";
                //                rrtype[rindex] = "";
                //                rtype[rindex] = "";
                //            }
                //        });
                //        if (arrRelatedContracts.length > 0) {
                //            arrRelatedContracts[arrRelatedContracts.length - 1].RelatedContractTitle = $.grep(rtitle, function (item) { return item != "" }).join(';').replace(';;', ';');
                //            arrRelatedContracts[arrRelatedContracts.length - 1].RelatedContractID = $.grep(rid, function (item) { return item != "" }).join(';').replace(';;', ';');
                //            arrRelatedContracts[arrRelatedContracts.length - 1].RelatedRelationshipType = $.grep(rrtype, function (item) { return item != "" }).join(';').replace(';;', ';');
                //            arrRelatedContracts[arrRelatedContracts.length - 1].RelationshipType = $.grep(rtype, function (item) { return item != "" }).join(';').replace(';;', ';');
                //        }

                //        $(curselectedContracts).each(function (i, item) {
                //            if (item != "" && selectedCont.indexOf(item.trim()) > -1) {
                //                selectedCont.splice(selectedCont.indexOf(item.trim()), 1);
                //            }
                //        });
                //    }
                //    if (selectedCont != "")
                //        $("#RelatedContracts").val(selectedCont.join(';'));
                //    else
                //        $("#RelatedContracts").val("");
                //    curselectedContracts = [];
                //}
                //$("#ddlRelConFilterContractType option:selected").prop('selected', false).trigger('chosen:updated');
                //$("#ddlRelConFilterCounterparty option:selected").prop('selected', false).trigger('chosen:updated');
                $(this).dialog("close");
            }
        },
        close: function () {
            if ($("#RelatedContracts").val() != "") {
                var rindex = "";
                //var selectedCont = $("#RelatedContracts").val().split(';');
                var selectedCont = $.map($("#RelatedContracts").val().split(';'), $.trim);
                if (arrRelatedContracts.length != 0) {
                    var rtitle = arrRelatedContracts[arrRelatedContracts.length - 1].RelatedContractTitle.split(";");
                    var rstatus = arrRelatedContracts[arrRelatedContracts.length - 1].RelatedStatus.split(";");
                    var rid = arrRelatedContracts[arrRelatedContracts.length - 1].RelatedContractID.split(";");
                    var rrtype = arrRelatedContracts[arrRelatedContracts.length - 1].RelatedRelationshipType.split(";");
                    var rtype = arrRelatedContracts[arrRelatedContracts.length - 1].RelationshipType.split(";");

                    $(curselectedContracts).each(function (i, item) {
                        if (item != "" && rtitle.indexOf(item.trim()) > -1) {
                            rindex = rtitle.indexOf(item.trim());
                            //Remove span
                            $("#liSelectedRelatedContract span#" + rid[rindex]).remove();
                            $('input:checkbox').filter('[id="' + rid[rindex] + '"]').prop('checked', false);
                            if (arrRelatedcontractRowkey.length > 0) {
                                arrRelatedcontractRowkey.splice(arrRelatedcontractRowkey.indexOf(rid[rindex]), 1)
                            }
                            rtitle[rindex] = "";
                            rid[rindex] = "";
                            rrtype[rindex] = "";
                            rtype[rindex] = "";
                            rstatus[rindex] = "";
                        }
                    });
                    if (arrRelatedContracts.length > 0) {
                        arrRelatedContracts[arrRelatedContracts.length - 1].RelatedContractTitle = $.grep(rtitle, function (item) { return item != "" }).join(';').replace(';;', ';');
                        arrRelatedContracts[arrRelatedContracts.length - 1].RelatedContractID = $.grep(rid, function (item) { return item != "" }).join(';').replace(';;', ';');
                        arrRelatedContracts[arrRelatedContracts.length - 1].RelatedRelationshipType = $.grep(rrtype, function (item) { return item != "" }).join(';').replace(';;', ';');
                        arrRelatedContracts[arrRelatedContracts.length - 1].RelationshipType = $.grep(rtype, function (item) { return item != "" }).join(';').replace(';;', ';');
                        arrRelatedContracts[arrRelatedContracts.length - 1].RelatedStatus = $.grep(rstatus, function (item) { return item != "" }).join(';').replace(';;', ';');
                    }

                    $(curselectedContracts).each(function (i, item) {
                        if (item != "" && selectedCont.indexOf(item.trim()) > -1) {
                            selectedCont.splice(selectedCont.indexOf(item.trim()), 1);
                        }
                    });
                }
                if (selectedCont != "")
                    $("#RelatedContracts").val(selectedCont.join(';'));
                else
                    $("#RelatedContracts").val("");
                curselectedContracts = [];
            }
            $("#ddlRelConFilterContractType option:selected").prop('selected', false).trigger('chosen:updated');
            $("#ddlRelConFilterCounterparty option:selected").prop('selected', false).trigger('chosen:updated');
        }
    });

    $("#browseTaxonomy").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        height: 600,
        title: "Users",
        modal: true,
        position: {
            my: "center",
            at: "center",
            of: window
        },
        buttons: {
            "OK": function () {
                var my_data = $(this).data('param_taxonomy')
                if ($('#liSelectedTaxonomy span').length > 0) {
                    $('#' + my_data).val($('#liSelectedTaxonomy').text());
                    $(this).dialog("close");
                }
                else {
                    $('#' + my_data).val("");
                    $(this).dialog("close");
                }
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });
    $("#browseProjects").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "Project",
        modal: true,
        buttons: {
            "OK": function () {
                var s = AddProject();
                //if (s) {
                //$(this).dialog("close"); $("#txtSearchBoxProjects").val("");
                //}
            },
            Cancel: function () {
                arrRelatedCounterparities = [];
                $(this).dialog("close");
                $("#txtSearchBoxProjects").val("");
            }
        }
    });

    $("#browseProjectTasks").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "Project Tasks",
        modal: true,
        buttons: {
            "OK": function () {
                var s = AddProjectTask();
                // if (s) {
                $(this).dialog("close"); $("#txtSearchBoxProjectTasks").val("");
                //  }
            },
            "Clear": function () {
                $('#txtSearchBoxProjectTasks').val('');
                $('input:checkbox[name=ProjectTask]').prop('checked', false);
                $("#ProjectTask").val("");
            },
            Cancel: function () {
                $(this).dialog("close");
                $("#txtSearchBoxProjectTasks").val("");
                $('input:checkbox[name=ProjectTask]').prop('checked', false);
            }
        }
    });

    $("#popupCounterparties").dialog({
        autoOpen: false,
        closeText: "",
        width: "65%",
        height: "auto",
        title: "Related Counterparties",
        modal: true,
        buttons: {
            "OK": function () {
                RelatedCounterpartiesPush();
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $("#browseLegalEntity").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "CompanyProfile",
        dialogClass: "popup_width100",
        resizable: false,
        modal: true,
        buttons: {
            "OK": function () {
                AddLE();
            },
            Cancel: function () {
                $(this).dialog("close");

            }
        }, close: function () {

        }

    });

    $("#browseGenericforrelcon").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        modal: true,
        dialogClass: "popup_width100",
        buttons: {
            "OK": function () {
                var s = false;
                var vCoounterparty = "";

                var my_data = $(this).data('param_1')
                $('input:checkbox[name="Genericcon"]:checked').each(function () {
                    if (vCoounterparty == "") {
                        vCoounterparty = unescape(this.value);
                    }
                    else {
                        vCoounterparty += "; " + unescape(this.value);
                    }
                });

                if (vCoounterparty != "") {
                    $('#' + my_data).val(vCoounterparty);
                    s = true;
                } else {
                    swal("", "No item has been selected.");
                    s = false;
                }

                // if (s) {
                $(this).dialog("close");
                // }
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $("#browseGeneric").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        modal: true,
        buttons: {
            "OK": function () {
                var s = false;
                var vCoounterparty = "";
                var my_data = $(this).data('param_1')
                var listdetails = '';
                if (multipleChecksDocumentID != null && multipleChecksDocumentID.length > 0) {
                    listdetails = '';
                    for (var lsc = 0; lsc < multipleChecksDocumentID.length ; lsc++) {
                        if (listdetails == '') {
                            listdetails = multipleChecksDocumentID[lsc].trim();
                        }
                        else {
                            listdetails += ";" + multipleChecksDocumentID[lsc].trim();
                        }
                    }
                    $('#' + my_data).val(listdetails);
                    listdetails = '';
                    multipleChecksDocumentID = [];
                    $('#liSelectedRU').empty();
                    s = true;
                    $(this).dialog("close");
                }
                else {


                    swal({
                        title: '',
                        text: "No item has been selected. Do you want to continue?",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Yes',
                        cancelButtonText: 'No',
                        html: true
                    },
                    function (confirmed) {
                        if (confirmed) {
                            listdetails = '';
                            $('#' + my_data).val('');

                            s = false;
                            $("#browseGeneric").dialog("close");
                        }
                        else {
                            $("#browseGeneric").dialog("open");
                        }
                    });


                }

            },
            Cancel: function () {
                multipleChecksDocumentID = [];
                $('#liSelectedRU').empty();
                $(this).dialog("close");
            }
        }
    });

    $("#browseCounterparty").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "Counterparty",
        resizable: false,
        modal: true,
        buttons: {
            "OK": function () {
                AddCounterparty();
            },
            "Cancel": function () {
                $(this).dialog("close");
                if ($('#Counterparty').val() == "") {
                    //$('#Counterparty').css('display', '');//eO311158
                }
                currentSelectedCounterParty = [];
            }
        },
        close: function () {
            $(this).dialog("close"); $("#txtSearchBox").val("");
            if ($('#Counterparty').val() == "") {
                //$('#Counterparty').css('display', '');//eO311158
            }
            ClearAddCounterparty();
            $('#chkCounterpartyNotInList').prop('checked', false);

            $('#dvCPExistingCounterparty').css("display", "");
            $('#dvCPAddCounterparty').css("display", "none");
            $('#rdCPAddCounterparty').prop('checked', false);
            $('#rdCPExistingCounterparty').prop('checked', true);

            $('.CP_Det').remove();
            $('.CP_Det1').css('display', 'none');
            $("#ddlCounterpartyType").removeClass('validelement');
            $("#txtEmailID").removeClass('validemail');
            currentSelectedCounterParty = [];
        }
    });

    $("#browseMasterAgreements").dialog({
        autoOpen: false,
        closeText: "",
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

    //manoj
    //add milestone while creating contract
    $("#addEditMilestoneNew").dialog({
        autoOpen: false,
        closeText: "",
        width: "70%",
        height: "auto",
        resizable: false,
        title: "Milestone",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "Save": function () {
                if (validatemilestonedate()) {

                }
            },
            Cancel: function () {
                $("#" + $("#hdnfieldname").text()).attr("checked", false);
                $(this).dialog("close");
            }
        },
        close: function () {
            if (!milestonebuttonclick) {
                $("#" + $("#hdnfieldname").text()).attr("checked", false);
            }
            milestonebuttonclick = false;
            $(this).dialog("close");
        }
    });
    //add milestone while creating contract

    $("#browseOriginatingParty").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "Originating Party",
        modal: true,
        buttons: {
            "OK": function () {
                var s = AddOriginatingParty();
                // if (s) {
                $(this).dialog("close");
                //  }
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $("#addEditCounterparty").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "Counterparty",
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
            "Save": function () {
                if (SaveCounterparty()) {
                    selectedBusinessAreaID11 = [];
                }
            },
            Cancel: function () {
                $(this).dialog("close");
                selectedBusinessAreaID11 = [];
            }
        }
    });

    $("#browseRequest").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "Contract",
        modal: true,
        buttons: {
            "OK": function () {
                var s = AddRequest();
                //if (s) {
                $(this).dialog("close"); $("#txtSearchBoxRequest").val("");
                //}
            },
            Cancel: function () {
                $(this).dialog("close");
                $("#txtSearchBoxRequest").val("");
            }
        }
    });
    $("#browseBAOwners").dialog({
        autoOpen: false,
        closeText: "",
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
                        if (i != selecteditemslength - 1) { $('#lblBusinessAreaOwners').append(BAOwnersselecteditems[i].trim().substring(BAOwnersselecteditems[i].trim().lastIndexOf(">") + 1, BAOwnersselecteditems[i].trim().length).trim() + ";"); }
                        else {
                            $('#lblBusinessAreaOwners').append(BAOwnersselecteditems[i].trim().substring(BAOwnersselecteditems[i].trim().lastIndexOf(">") + 1, BAOwnersselecteditems[i].trim().length).trim());
                        }
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
                BAOwnersselecteditems = [];
                $(selectedBusinessAreaID11).each(function (i, item) {
                    BAOwnersselecteditems.push(item[0]);
                })
                selectedBusinessAreaID11Temp = [];
            }
        }, close: function () {
            BAOwnersselecteditems = [];
            $(selectedBusinessAreaID11).each(function (i, item) {
                BAOwnersselecteditems.push(item[0]);
            })
            selectedBusinessAreaID11Temp = [];
        }
    });
    // ENH493 Customer inhancment
    $("#viewMetadataDetailDocument").dialog({
        autoOpen: false,
        closeText: "",
        width: "70%",
        title: "Detail",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "Close": function () {
                $(this).dialog("close");
            }
        }
    });
    $('#txtSearchBoxContract').keypress(function (e) {
        if ($('#txtSearchBoxContract').val() != "") {
            if (e.keyCode == 13) {
                $(".ui-autocomplete").css('display', 'none');
                ViewContracts();
            }
        }
    });


    $('#txtSearchBox').keypress(function (e) {
        if ($('#txtSearchBox').val() != "") {
            if (e.keyCode == 13) {
                $(".ui-autocomplete").css('display', 'none');
                SearchCounterparty();
            }
        }
    });
    //$('#txtCounterpartyName').keypress(function (e) {
    //    if ($('#txtCounterpartyName').val() != "") {
    //        if (e.keyCode == 13) {
    //            e.preventDefault();
    //            //$(".ui-autocomplete").css('display', 'none');
    //            //AddCounterparty();
    //            fillCounterpartyDetails();
    //        }
    //    }
    //});
    $('#txtSearchBoxProjects').keypress(function (e) {
        if ($('#txtSearchBoxProjects').val() != "") {
            if (e.keyCode == 13) {
                $(".ui-autocomplete").css('display', 'none');
                SearchProjects();
            }
        }
    });

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/contractfieldgroup?groupname=' + $('#fieldGroup-1').text(),
        type: 'GET',
        dataType: 'json',
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        cache: false,
        success: function (data) {
            $('#fieldGroup-1Desc').text(data.Description)
        }
    });
});

function AddMasterAgreement() {
    if ($('input:radio[name=MasterAgreement]:checked').val() != null) {
        $('#txtMasterAgreement').val($('input:radio[name=MasterAgreement]:checked').val());
        $('#txtRelatedContractID').val($('input:radio[name=MasterAgreement]:checked')[0].id);
        return true;
    } else {
        swal("", "No contract has been selected.");
        $("#popupContracts").dialog("close");
        return false;
    }
}

function getContractNumberFormat() {
    var ContractNumFormat = "";
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/settings',
        type: 'GET',
        dataType: 'json',
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        cache: false,
        async: false,
        success: function (data) {
            if (data.ContractNumberFormat != null && data.ContractNumberFormat != "") {
                ContractNumFormat = data.ContractNumberFormat;
                var contractNumSetting = data.ContractNumberFormat.split('}');
                if (contractNumSetting.length > 2) {
                    if (contractNumSetting[1] != null && contractNumSetting[1] != "") {
                        contractNumSetting[1] = contractNumSetting[1].trim();
                        globalseparator = contractNumSetting[1].charAt(0);

                    }
                }
            }
        },
        error: function (data) {
        }
    });
    return ContractNumFormat;
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
function AddProject() {
    if ($('input[type="radio"][name=PickProject]:checked').val() == 'Existing') {
        var vProjects = "";
        var vProjectName = "";
        var arrTasks = [];
        $('input:checkbox[name="Project"]:checked').each(function () {
            vProjectName = this.value;
            if (vProjects == "") {
                vProjects = this.value;
                projectManager = this.nextSibling.nextSibling.value;

                $.each($('#ProjectTask').val().split(";"), function () {
                    if (vProjectName == $.trim(this).split(':')[0]) {
                        arrTasks.push($.trim(this));
                    }
                });
            }
            else {
                vProjects += "; " + this.value;
                projectManager += ";" + this.nextSibling.nextSibling.value;
                $.each($('#ProjectTask').val().split(";"), function () {
                    if (vProjectName == $.trim(this).split(':')[0]) {
                        arrTasks.push($.trim(this));
                    }
                });
            }
        });
        $('#ProjectTask').val(arrTasks.join("; "));

        if (vProjects != "") {
            $('#Project').val(vProjects);
            if (!($("#ProjectTask").hasClass("validelement"))) {
                $("#ProjectTask").addClass("validelement");
                $("#lblProjectTask").html("Project Tasks<span class='text-red'>*</span>");
            }
            $("#browseProjects").dialog("close");
            return true;
        } else {
            //alert('No project has been selected.');
            $('#Project').val(vProjects);
            if (!($("#Project").hasClass("validelement"))) {
                $("#ProjectTask").removeClass("validelement");
                $("#lblProjectTask").html("Project Tasks");
            }
            //swal("", "No project has been selected.");
            $("#browseProjects").dialog("close");
            return false;
        }
    }
    else {
        SaveProject();
    }
}
function AddProjectTask() {
    var vProjectTasks = "";
    $('input:checkbox[name="ProjectTask"]:checked').each(function () {
        if (vProjectTasks == "") {
            vProjectTasks = this.value;
        }
        else {
            vProjectTasks += "; " + this.value;
        }
    });

    if (vProjectTasks != "") {
        $('#ProjectTask').val(vProjectTasks);
        return true;
    } else {

        swal("", "No task has been selected.");
        return false;
    }
}
$("#ddlContractTypes").change(function (obj) {
    var idel123 = 0;
    var idelcheck = null;
    //var CtypeCustomMetadataStatus = "";
    $("#newdivforcheck").empty();
    //manoj
    if ($("#ddlContractTypes option:selected").val() == "0") {
        $("#imgbusinessarea").removeAttr("title");
        $("#imgcontracttype").removeAttr("title");
        $("#imgcontracttitle").removeAttr("title");
    }
    //manoj
    $('#undercheck').empty();
    $("#loadingPage").fadeIn();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/IContractDetails?contractid=' + ContractID,
        type: 'GET',
        dataType: 'json',
        headers: {
            'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID
        },
        cache: false,
        success: function (mainmetadataFields) {
            var vMetadata = $(mainmetadataFields).find('Metadata');
            //manoj
            if ($("#hdhMilestoneCapture").text() == "Yes") {
                //if (true) {
                try {
                    CustomDateFieldsXML = $(vMetadata).find('CustomDateFields').text();
                    CustomDateFieldsXML = CustomDateFieldsXML.replace(/1rCh84Wi/g, '<');
                    CustomDateFieldsXML = CustomDateFieldsXML.replace(/2iFVH1d3/g, '>');
                } catch (exc) {
                    //alert(exc);
                }
                //CustomDateFieldsXML = $(vMetadata).find('CustomDateFields').text();
            }
            //manoj
            if ($('#txtContractAreaName').val() == null || $('#txtContractAreaName').val() == "") {
                ContractType = $(vMetadata).find('ContractType').text();
            }
            else {
                ContractType = $("#ddlContractTypes option:selected").text();
                CtypeCustomMetadataStatus = $("#ddlContractTypes").val().split("~").slice(-1);
            }
            if (!vBusinessAreaChanged)
                getcontractareasettings($('#txtContractAreaName').val(), "No");

            //getcontracttypes(vCT);
            if ($(vMetadata).find('IsDraft').text() == "Yes") {
                $("#btnSaveDraft").css('display', '')
                $("#draftDescription").css('display', '')
            } else {
                $("#btnSaveDraft").css('display', 'none')
                $("#draftDescription").css('display', 'none')
            }
            if ($(vMetadata).find('RelatedRequestID').text() != '' && $(vMetadata).find('RelatedRequestID').text() != null) {
                $("#hdRequestID").text($(vMetadata).find('RelatedRequestID').text());
                $("#hdRequestTitle").text($(vMetadata).find('RelatedRequests').text());
            }
            else {
                $("#hdRequestID").text("");
                $("#hdRequestTitle").text("");
            }

            if (!vBusinessAreaChanged)
                $("#txtBusinessArea").val($(vMetadata).find('BusinessArea').text());
            $("#txtContractTemplateName").val($(vMetadata).find('ContractTemplateName').text());
            if (vBusinessAreaChanged) {
                if ($('#txtBA').val() != '') {
                    selecteditems = $('#txtBA').val().split(',');
                    var selecteditemslength = selecteditems.length;
                    $('#liSelectedBA').empty();
                    for (var i = 0; i < selecteditemslength; i++) {
                        $('#liSelectedBA').append('<span style="font-size:11px;">' + selecteditems[i] + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveSelected(this);" style="float:right" /></span>');
                    }
                    getBusinessAreaDetails($("#txtBusinessArea").val(), $('#txtContractAreaName').val());
                }
            } else {
                if ($(vMetadata).find('BusinessArea').text() != '') {
                    selecteditems = $(vMetadata).find('BusinessArea').text().split(',');
                    $('#txtBA').val($(vMetadata).find('BusinessArea').text());
                    try {
                        $('#txtContractAreaName').val($(vMetadata).find("ContractArea").text());
                        $('#txtContractAreaAdministrators').val($(vMetadata).find("ContractAreaAdministrators").text());
                        $('#txtBusinessAreaOwners').val($(vMetadata).find("BusinessAreaOwners").text());
                        businessAreaPath = $(vMetadata).find("BusinessAreaPath").text();
                    }
                    catch (err) {
                    }
                    $('#liSelectedBA').empty();
                    var selecteditemslength = selecteditems.length;
                    for (var i = 0; i < selecteditemslength; i++) {
                        $('#liSelectedBA').append('<span style="font-size:11px;">' + selecteditems[i] + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveSelected(this);" style="float:right" /></span>');
                    }

                    getBusinessAreaDetails($("#txtBusinessArea").val(), $('#txtContractAreaName').val());
                }
            }
            if (getParameterByName("Duplicate") == "Yes") {
                $("#loadingPage").fadeIn();
                $("#txtContractTitle").val($(vMetadata).find('ContractTitle').text() + "_Duplicate");
                //$("#txtContractNumber").val($(vMetadata).find('ContractNumber').text());
                CheckContractNumberSetting();
                $("#formTitle").html("Duplicate Contract");
                $("#btnDuplicate").css('display', '');
                $("#btnCreate").css('display', 'none');
                $("#duplicateDescription").css('display', '');
                $("#updateDescription").css('display', 'none');
                //PrvAutoinceramentNumberforValidate = $(vMetadata).find('AutoIncrmentNumber').text();
            }
            else {

                $("#loadingPage").fadeIn();
                $("#duplicateDescription").css('display', 'none');
                $("#updateDescription").css('display', '');
                $("#txtContractTitle").val($(vMetadata).find('ContractTitle').text());
                //if (($(vMetadata).find('ContractNumber').text()) == "") {
                //    alert("testing");
                //}
                $("#txtContractNumber").val($(vMetadata).find('ContractNumber').text());
                CheckContractNumberSetting();
                PrvAutoinceramentNumberforValidate = $(vMetadata).find('AutoIncrmentNumber').text();
            }

            $("#ddlTransactionTypes").find('option[value="' + $(vMetadata).find('TransactionType').text() + '"]').prop("selected", true);
            var contractclass = "";
            contractclass = $(vMetadata).find('ContractClass').text();
            $("#ddlContractClasses").find('option[value="' + contractclass + '"]').prop("selected", true);

            if (contractclass == "Sub-Contract") {
                $("#txtMasterAgreement").val($(vMetadata).find('RelatedContract').text());
                $("#txtRelatedContractID").val($(vMetadata).find('RelatedContractID').text());

            }
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contracttypes/metadatas?contracttypename=' + encodeURIComponent(ContractType),
                type: 'GET',
                dataType: 'json',
                headers: {
                    'eContracts-ApiKey': localStorage.APIKey
                },
                cache: false,
                success: function (metadataFieldsvalue) {
                    var metadataFields = [];
                    if (getParameterByName("Stage") == "pipeline" && getParameterByName("Duplicate") == "Yes") {
                        metadataFields = $.grep(metadataFieldsvalue, function (n, i) {
                            return (n.Newform == "Show" || n.Newform == "Required");
                        });
                    } else if (getParameterByName("Stage") == "pipeline" && getParameterByName("Finalize") == "true") {
                        metadataFields = $.grep(metadataFieldsvalue, function (n, i) {
                            return (n.Finalizingfrom == "Show" || n.Finalizingfrom == "Required");
                        });
                    } else if (getParameterByName("Stage") == "pipeline") {
                        metadataFields = $.grep(metadataFieldsvalue, function (n, i) {
                            return (n.Newform == "Show" || n.Newform == "Required" || n.Finalizingfrom == "Show" || n.Finalizingfrom == "Required");
                        });
                    }
                    else if (getParameterByName("Closeout") == "Yes") {
                        metadataFields = $.grep(metadataFieldsvalue, function (n, i) {
                            return (n.Closeoutform == "Show" || n.Closeoutform == "Required");
                        });
                    }
                    else {
                        metadataFields = $.grep(metadataFieldsvalue, function (n, i) {
                            return (n.Finalizingfrom == "Show" || n.Finalizingfrom == "Required" || n.Closeoutform == "Show" || n.Closeoutform == "Required");
                        });
                    }

                    var hasContractTermType = false;
                    if ($.grep(metadataFieldsvalue, function (n, i) {
                            return (n.FieldName == "ContractTermType");
                    }).length > 0) {
                        hasContractTermType = true;
                    }


                    vContractMetadataFields = [];
                    var vUserList = '';
                    $.ajax({
                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/users',
                        type: 'GET',
                        dataType: 'json',
                        'Content-Type': 'application/json',
                        cache: false,
                        async: false,
                        headers: {
                            'eContracts-ApiKey': localStorage.APIKey
                        },
                        success: function (dataUser) {
                            $(dataUser).each(function (i, item) {
                                var sRowKey = item.RowKey;
                                var sUserName = item.UserName;
                                vUserList += '<option value="' + sUserName + '">' + sUserName + '</option>';
                            });
                        },
                        error:
                            function (dataUser) {
                            }
                    });

                    //manoj
                    //Financial Break Down Feature
                    var veContractFeaturesFinancial = JSON.parse(localStorage.getItem("eContractFeatures"));
                    var vDocLibFeatFinancial = $.grep(veContractFeaturesFinancial, function (nFinancial, iFinancial) {
                        return (nFinancial.RowKey == "19" && nFinancial.Status == "ON");
                    });
                    if (vDocLibFeatFinancial.length > 0) {
                        applyCurrencyChangeType = true;
                        var FinancialmetadataFields = $.grep(metadataFields, function (nmeta, imeta) {
                            return (nmeta.FieldName == "ContractValue");
                        });

                        var CustomFinancialmetadataFields = $.grep(metadataFields, function (nmeta, imeta) {
                            return (nmeta.CustomFieldsGroupName == "FinancialCustomFields");
                        });

                        if (FinancialmetadataFields.length == 0 && CustomFinancialmetadataFields.length > 0) {
                            applyCurrencyType = true;
                        }
                    }
                    //Financial Break Down Feature

                    var startdate = $.grep(metadataFields, function (nmeta, imeta) {
                        return (nmeta.FieldName == "StartDate");
                    });

                    if (startdate.length > 0)
                        IsStartDateExists = true;

                    //manoj

                    var vTransactionTypeExist = '';
                    var vContractClassExist = '';
                    var strPreviousFieldGroupName = '';
                    $(metadataFields).each(function (i, item) {
                        var strFieldGroupName = item.FieldGroup;
                        if ((item.FieldName == "ContractTitle") || (item.FieldName == "ContractType") || (item.FieldName == "BusinessArea") || (item.FieldType == "File Upload")) {
                            switch (item.FieldName) {
                                case "BusinessArea":
                                    {
                                        $("#imgbusinessarea").attr('title', item.HelpText);
                                        break;
                                    }
                                case "ContractType":
                                    {
                                        $("#imgcontracttype").attr('title', item.HelpText);
                                        break;
                                    }
                                case "ContractTitle":
                                    {
                                        $("#imgcontracttitle").attr('title', item.HelpText);
                                        $('#lblTitleDesc').text(item.Description);
                                        break;
                                    }
                            }
                        }

                        else {
                            if (item.FieldName == "Status") {

                            }
                            else {
                                if (!hasContractTermType)
                                    vContractMetadataFields.push(item.FieldName);
                            }
                            if (!hasContractTermType) {
                                var idelvalue = "grp" + item.FieldGroup;
                                idelvalue = idelvalue.replace('&amp;', '');
                                idelvalue = idelvalue.replace(/[\*\|\,\"\:\<\>\[\}\{\}\'\(\)\@\&\$\#\%\.\-\!\@\$]/g, '').replace(/\//g, '').replace(/ /g, '');
                                if (item.ShowInEditForm == "true") {
                                    var vControlsGroup = "";
                                    if (strPreviousFieldGroupName != item.FieldGroup) {
                                        vControlsGroup = '<div class="row-group"><hr class="form_hr"/><div class="col12 no-pad"><div class="collapse-heading"><div class="col10 no-pad"><h3 class="h3-head" style="padding-left: 10px;" id="fieldGroup-1">' + item.FieldGroup + '</h3>';
                                        $.ajax({
                                            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/contractfieldgroup?groupname=' + item.FieldGroup,
                                            type: 'GET',
                                            dataType: 'json',
                                            headers: {
                                                'eContracts-ApiKey': localStorage.APIKey
                                            },
                                            cache: false,
                                            async: false,
                                            success: function (data) {
                                                if (data != null) {
                                                    vControlsGroup += '<p class="p-text help" style="padding-left: 10px;">' + data.Description + '</p>';
                                                }
                                            }
                                        });
                                        var idel123img = idelvalue + 'img';
                                        vControlsGroup += '<p class="p-text"></p></div><div class="col2 text-right"><a class="" href="javascript:void(0);"><img id="' + idel123img + '" src="../Content/Images/e-close.png" title="Collapse" /></a></div></div></div></div><div id="' + idelvalue + '">';
                                        try {
                                            //manoj
                                            var allowtocreatefield = true;
                                            if (getParameterByName("TaskAllow") == "No" && (item.FieldName == "ContractTermType" || item.FieldName == "RelatedRequests" || item.FieldName == "RelatedContracts")) {
                                                allowtocreatefield = false;
                                            }
                                            //manoj
                                            if (allowtocreatefield) {
                                                idelcheck = createingdivbyme(item, vControlsGroup, idelvalue, idelcheck, vUserList, vMetadata);
                                                allowOnlyNumberInInputBox("ContractTerm");
                                            }
                                        }
                                        catch (ex) {
                                        }
                                    }
                                    else {
                                        try {
                                            //manoj
                                            var allowtocreatefield = true;
                                            if (getParameterByName("TaskAllow") == "No" && (item.FieldName == "ContractTermType" || item.FieldName == "RelatedRequests" || item.FieldName == "RelatedContracts")) {
                                                allowtocreatefield = false;
                                            }
                                            //manoj
                                            if (allowtocreatefield) {
                                                idelcheck = createingdivbyme(item, vControlsGroup, idelvalue, idelcheck, vUserList, vMetadata);
                                                allowOnlyNumberInInputBox("ContractTerm");
                                            }
                                        }
                                        catch (ex) {
                                        }
                                    }
                                }

                            }
                            else {
                                if (item.FieldName == "ContractTermNotes" || item.FieldName == "StartDate" || item.FieldName == "TermEndDate" || item.FieldName == "RequiresAuth" || item.FieldName == "RenewalConfirmParticipants" || item.FieldName == "CounterpartyNotices" || item.FieldName == "CounterpartyNoticesRenewal" || item.FieldName == "EndDate") {

                                }
                                else {
                                    vContractMetadataFields.push(item.FieldName);
                                    var idelvalue = "grp" + item.FieldGroup;
                                    idelvalue = idelvalue.replace('&amp;', '');
                                    idelvalue = idelvalue.replace(/[\*\|\,\"\:\<\>\[\}\{\}\'\(\)\@\&\$\#\%\.\-\!\@\$]/g, '').replace(/\//g, '').replace(/ /g, '');
                                    if (item.ShowInEditForm == "true") {
                                        var vControlsGroup = "";
                                        if (strPreviousFieldGroupName != item.FieldGroup) {
                                            vControlsGroup = '<div class="row-group"><hr class="form_hr"/><div class="col12 no-pad"><div class="collapse-heading"><div class="col10 no-pad"><h3 class="h3-head" style="padding-left: 10px;" id="fieldGroup-1">' + item.FieldGroup + '</h3>';
                                            $.ajax({
                                                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/contractfieldgroup?groupname=' + item.FieldGroup,
                                                type: 'GET',
                                                dataType: 'json',
                                                headers: {
                                                    'eContracts-ApiKey': localStorage.APIKey
                                                },
                                                cache: false,
                                                async: false,
                                                success: function (data) {
                                                    if (data != null) {
                                                        vControlsGroup += '<p class="p-text help" style="padding-left: 10px;">' + data.Description + '</p>';
                                                    }
                                                }
                                            });
                                            var idel123img = idelvalue + 'img';
                                            vControlsGroup += '<p class="p-text"></p></div><div class="col2 text-right"><a class="" href="javascript:void(0);"><img id="' + idel123img + '" src="../Content/Images/e-close.png" title="Collapse" /></a></div></div></div></div><div id="' + idelvalue + '">';
                                            try {
                                                //manoj
                                                var allowtocreatefield = true;
                                                if (getParameterByName("TaskAllow") == "No" && (item.FieldName == "ContractTermType" || item.FieldName == "RelatedRequests" || item.FieldName == "RelatedContracts")) {
                                                    allowtocreatefield = false;
                                                }
                                                //manoj
                                                if (allowtocreatefield) {
                                                    idelcheck = createingdivbyme(item, vControlsGroup, idelvalue, idelcheck, vUserList, vMetadata);
                                                    allowOnlyNumberInInputBox("ContractTerm");
                                                }
                                            }
                                            catch (ex) {
                                            }
                                        }
                                        else {
                                            try {
                                                //manoj
                                                var allowtocreatefield = true;
                                                if (getParameterByName("TaskAllow") == "No" && (item.FieldName == "ContractTermType" || item.FieldName == "RelatedRequests" || item.FieldName == "RelatedContracts")) {
                                                    allowtocreatefield = false;
                                                }
                                                //manoj
                                                if (allowtocreatefield) {
                                                    idelcheck = createingdivbyme(item, vControlsGroup, idelvalue, idelcheck, vUserList, vMetadata);
                                                    allowOnlyNumberInInputBox("ContractTerm");
                                                }
                                            }
                                            catch (ex) {
                                            }
                                        }
                                    }
                                }
                            }

                        }
                        if (item.FieldType != "File Upload") {
                            strPreviousFieldGroupName = item.FieldGroup;
                        }

                        //Sridhar
                        $('.form-contro-Date').on("paste", function (e) {
                            e.preventDefault();
                        });
                    });
                    //manoj
                    if ($("#hdhMilestoneCapture").text() == "Yes") {
                        //if (true) {
                        $('.customdatefieldchange').each(function () {
                            this.onchange = function () {
                                CustomDateFieldChange(this);
                            };
                        });
                    }
                    if (applyCurrencyChangeType) {
                        $("#ContractCurrency").trigger("onchange");
                    }
                    //manoj

                    $("#loadingPage").fadeOut();
                }
            });
        },
        error: function (data) {
            $("#loadingPage").fadeOut();
        }
    });
});
$('#btnDuplicate').click(function () {
    $('.btn-blue').attr('disabled', 'disabled');
    if (requiredValidator('saveContactForm', false)) {
        $("#loadingPage").fadeIn();
        //manoj
        CheckContractTitle(false);
        //manoj
    }
    else {
        $("#spInProgress").css('visibility', 'hidden');
    }
});
$('#btnSaveDraft').click(function () {
    $('input:checkbox[class=customdatefiledfeature]:checked:enabled').each(function () {
        $(this).attr("checked", false);
    });
    $("#divcustommilestone").html('');
    $("#loadingPage").fadeIn();
    //$('#btnSaveDraft').css("pointer-events", "none");
    if ($("#txtContractTitle").val() != "") {
        if ($("#txtContractTitle").val().trim() != "") {
            $("#txtContractTitle").removeClass('error');
            $("#spInProgress").css('visibility', 'visible');
            //manoj
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/contracttitleexist?contracttitle=' + encodeURIComponent($("#txtContractTitle").val().trim()),
                type: 'GET',
                dataType: 'json',
                headers: {
                    'eContracts-ApiKey': localStorage.APIKey
                },
                cache: false,
                success: function (contractdetails) {
                    if (typeof contractdetails != 'undefined' && contractdetails.length > 0) {//NoContent HttpStatusCode Update
                        var vExist = (contractdetails[0].RowKey == getParameterByName("ContractID") && getParameterByName("Duplicate") == "") ? false : true;
                        if (vExist && contractdetails[0].InRecycleBin == "Yes") {
                            swal("", "A Contract Record with title <span style=\"font-weight:700\">" + $("#txtContractTitle").val().trim() + "</span> exists in the Recycle Bin. Please enter a different title.");
                            $("#loadingPage").fadeOut();
                        } else if (vExist) {
                            swal("", "Contract Record exists with the title <span style=\"font-weight:700\">" + $("#txtContractTitle").val().trim() + "</span>. Please enter a different title.");
                            $("#loadingPage").fadeOut();
                        } else {
                            UpdateContract(true);
                            $("#spInProgress").css('visibility', 'hidden');
                        }
                    } else {
                        UpdateContract(true);
                        $("#spInProgress").css('visibility', 'hidden');
                    }
                },
                error: function (contractdetails) {
                    UpdateContract(true);
                    $("#spInProgress").css('visibility', 'hidden');
                }
            });
            //manoj

        } else {
            $("#txtContractTitle").addClass('error');
            $("#loadingPage").fadeOut();
        }
    }
    else {
        $("#txtContractTitle").addClass('error');
        $("#loadingPage").fadeOut();
    }
});
$('#btnCreate').click(function () {
    $('.btn-blue').attr('disabled', 'disabled');
    //manoj
    if (vBusinessAreaChanged && typeof oldcontractareaname != 'undefined' && oldcontractareaname != null && oldcontractareaname != '' && oldcontractareaname != $('#txtContractAreaName').val()) {
        swal({
            title: '',
            text: "Contract Area has been changed as <span style=\"font-weight:700\">" + oldcontractareaname + "</span> to <span style=\"font-weight:700\">" + $('#txtContractAreaName').val() + "</span>, If contract contain folder(s) and document(s), Do you want to move folder(s) and document(s) into selected contract area library ?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            html: true
        },
        function (confirmed) {
            if (confirmed) {
                updatecontractbuttonclick();
            }
        });
    } else {
        updatecontractbuttonclick();
    }
    //manoj
});

function updatecontractbuttonclick() {
    if (checkwithrenewaldate()) {
        $("#spInProgress").css('visibility', 'visible');
        if (requiredValidator('saveContactForm', false)) {
            if (getParameterByName("Finalize") == "true" || getParameterByName("Closeout") == "Yes") {
                var textmsgtodisplay = getParameterByName("Finalize") == "true" ? " Do you want to Finalize this Contract Record now" : " Do you want to Closeout this Contract Record now"
                swal({
                    title: '',
                    text: textmsgtodisplay + "?",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    html: true
                },
            function (confirmed) {
                if (confirmed) {
                    $("#loadingPage").fadeIn();
                    CheckContractTitle(true);
                } else {
                    if (getParameterByName('Stage') == 'pipeline') {
                        location = "/Contracts/ContractDetails?ContractID=" + getParameterByName('ContractID') + "&Stage=pipeline";
                    } else {
                        location = "/Contracts/ContractDetails?ContractID=" + getParameterByName('ContractID');
                    }
                }
            });
            } else {
                $("#loadingPage").fadeIn();
                CheckContractTitle('edit', false, true);
            }
        }
        else {
            $("#spInProgress").css('visibility', 'hidden');
        }
    }
    else {
        swal("", "End date should be greater than renewal date.");
    }
    autoscroll();
}

//manoj
//For Checking Contract Title Exist
function CheckContractTitle(IsEdit) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/contracttitleexist?contracttitle=' + encodeURIComponent($("#txtContractTitle").val().trim()),
        type: 'GET',
        dataType: 'json',
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        cache: false,
        success: function (contractdetails) {
            if (typeof contractdetails != 'undefined' && contractdetails.length > 0) {//NoContent HttpStatusCode Update
                var vExist = false;
                if (contractdetails[0].RowKey == getParameterByName("ContractID") && getParameterByName("Duplicate") == "") //? false : (contractdetails[0].RowKey == getParameterByName("ContractID") && duplicatechecking == "Yes") ? true : false;
                    vExist = false;
                else
                    vExist = true;

                if (vExist && contractdetails[0].InRecycleBin == "Yes") {
                    swal("", "A Contract Record with title <span style=\"font-weight:700\">" + $("#txtContractTitle").val() + "</span> exists in the Recycle Bin. Please enter a different title.");
                    $('.btn-blue').removeAttr('disabled');
                    $("#loadingPage").fadeOut();
                } else if (vExist) {
                    swal("", "Contract Record exists with the title <span style=\"font-weight:700\">" + $("#txtContractTitle").val() + "</span>. Please enter a different title.");
                    $('.btn-blue').removeAttr('disabled');
                    $("#loadingPage").fadeOut();
                } else if (AutoinceramentNumberforValidate != "") {
                    CheckContractNumber(IsEdit);
                } else {
                    ContractDateValidation(false, IsEdit);
                }
            } else {
                if (AutoinceramentNumberforValidate != "") {
                    CheckContractNumber(IsEdit);
                } else {
                    ContractDateValidation(false, IsEdit);
                }
            }
        },
        error: function (contractdetails) {
            if (AutoinceramentNumberforValidate != "") {
                CheckContractNumber(IsEdit);
            } else {
                ContractDateValidation(false, IsEdit);
            }
        }
    });
}
//For Checking Contract Title Exist

//For Checking Contract Number Exist
function CheckContractNumber(IsEdit) {
    if (typeof ($("#txtContractNumber").val()) != 'undefined' && $.trim($("#txtContractNumber").val()) != null && $.trim($("#txtContractNumber").val()) != "") {
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contracts/contractnumberexist?contractnumber=' + (typeof ($("#txtContractNumber").val()) != 'undefined') ? $("#txtContractNumber").val() : "",
            type: 'GET',
            dataType: 'json',
            "Content-Type": "application/json",
            headers: {
                'eContracts-ApiKey': localStorage.APIKey
            },
            cache: false,
            success: function (ContractNumberdata) {
                var vExist = true;
                if (typeof conNumberData != 'undefined' && ContractNumberdata == null) {//NoContent HttpStatusCode Update
                    ContractDateValidation((IsEdit) ? false : true, IsEdit);
                }
                else {
                    if (ContractNumberdata.RowKey == getParameterByName("ContractID") && getParameterByName("Duplicate") == "") {
                        ContractDateValidation((IsEdit) ? false : true, IsEdit);
                    }
                    else if (ContractNumberdata.RowKey == getParameterByName("ContractID") && getParameterByName("Duplicate") == "Yes") {
                        swal("", "Contract Record exists with the number " + vNumber + "");
                        $('.btn-blue').removeAttr('disabled');
                        $("#loadingPage").fadeOut();
                    }
                }
            },
            error: function (ContractNumberdata) {
                ContractDateValidation((IsEdit) ? false : true, IsEdit);
            }
        });
    }
    else {
        ContractDateValidation((IsEdit) ? false : true, IsEdit);
    }
}
//For Checking Contract Number Exist
function ContractDateValidation(IsAutoIncre, IsEdit) {
    var countcomparedate;
    if (!comparedates("StartDate", "EndDate", "End date should be greater than start date.")) {
        swal("", "End date should be greater than start date.");
        $('.btn-blue').removeAttr('disabled');
        $("#loadingPage").fadeOut();
    }
    else if (!comparedates("StartDate", "NextEvaluationDate", "Evaluation date should be greater than start date.")) {
        if (IsEdit) {
            swal("", "Renewal date should be greater than start date.");
        } else {
            swal("", "Evaluation date should be greater than start date.");
        }
        $('.btn-blue').removeAttr('disabled');
        $("#loadingPage").fadeOut();
    }
    else if (!comparedates("StartDate", "ExpiryDate", "Expiry date should be greater than start date.")) {
        swal("", "Expiry date should be greater than start date.");
        $('.btn-blue').removeAttr('disabled');
        $("#loadingPage").fadeOut();
    } else if (!comparedates("EffectiveDate", "EndDate", "End date should be greater than effective date.")) {
        swal("", "End date should be greater than effective date.");
        $('.btn-blue').removeAttr('disabled');
        $("#loadingPage").fadeOut();
    }
    else if (!comparedates("EffectiveDate", "NextEvaluationDate", "Evaluation date should be greater than effective date.")) {
        swal("", "Renewal date should be greater than effective date.");
        $('.btn-blue').removeAttr('disabled');
        $("#loadingPage").fadeOut();
    }
    else if (!comparedates("EffectiveDate", "ExpiryDate", "Expiry date should be greater than effective date.")) {
        swal("", "Expiry date should be greater than effective date.");
        $('.btn-blue').removeAttr('disabled');
        $("#loadingPage").fadeOut();
    } else if (typeof ($("#ContractTermType").val()) != "undefined" && $("#ContractTermType").val() == "Renewable") {
        //manoj
        var renewalstartdate;
        var comparedate;
        if ($("#renewalViewHistoryTerm tr").length > 0) {
            var firstRow = $("#renewalViewHistoryTerm tr:first")[0];
            var lastRow = $("#renewalViewHistoryTerm tr:last")[0];
            var firstid = firstRow.id;
            var totalFileCountfrt = firstid.replace("renewalViewHistoryTerm", "");
            var lastid = lastRow.id;
            var totalFileCountlst = lastid.replace("renewalViewHistoryTerm", "");
            InitialTermStartDate = $('#RenewedDate' + totalFileCountfrt).text();
            LastTermEndDate = $('#TermEndDate' + totalFileCountlst).text();
        }

        if ($("#renewalViewHistoryTerm tr").length > 0 && $("#ContractConfirmSendTerm").val() != "") {
            var termcount = 1;
            $("#renewalViewHistoryTerm tr").each(function () {
                $(this).find('td').each(function () {
                    if ($(this).text() == "Current") {
                        termcount = $(this).attr('id').replace('TermStatus', '');
                    }
                    else {
                        $(this).find('b').each(function () {
                            if ($(this).text() == "Current") {
                                termcount = $(this).parent('td').attr('id').replace('TermStatus', '');
                            }
                        });
                    }

                });
            });
            var startdateParts = $("#RenewedDate" + termcount + "").text().trim().split('/');
            var strcomparedateParts = $("#txtRenewConfirmSendDate").text().trim();
            strcomparedateParts = (strcomparedateParts.charAt(0) == "(") ? strcomparedateParts.substr(1) : strcomparedateParts;
            strcomparedateParts = (strcomparedateParts.slice(-1) == ")") ? strcomparedateParts.slice(0, -1) : strcomparedateParts;
            var comparedateParts = strcomparedateParts.split('/');
            //manoj
            if (DatepickerFormat == 'mm/dd/yy') {
                renewalstartdate = new Date($.datepicker.formatDate('mm/dd/yy', new Date(startdateParts[2], startdateParts[0] - 1, startdateParts[1])));
                comparedate = new Date($.datepicker.formatDate('mm/dd/yy', new Date(comparedateParts[2], comparedateParts[0] - 1, comparedateParts[1])));
            } else {
                renewalstartdate = new Date($.datepicker.formatDate('mm/dd/yy', new Date(startdateParts[2], startdateParts[1] - 1, startdateParts[0])));
                comparedate = new Date($.datepicker.formatDate('mm/dd/yy', new Date(comparedateParts[2], comparedateParts[1] - 1, comparedateParts[0])));
            }
            //manoj
            var currenttoday = new Date();
            currenttoday.setHours(0, 0, 0, 0);
            countcomparedate = comparedate;
            //var dateCompare = new Date(comparedate);
            //dateCompare.setDate(dateCompare.getDate() - parseInt($("#ContractConfirmSendTerm").val()));
            //var Comparedd = dateCompare.getDate();
            //var Comparemm = dateCompare.getMonth() + 1;
            //var Comparey = dateCompare.getFullYear();
            //countcomparedate = $.datepicker.formatDate('mm/dd/yy', new Date(Comparey, Comparemm - 1, Comparedd));
            if (renewalstartdate < countcomparedate) {
                if ($("#ContractConfirmSendTerm").prop('disabled') == true) {
                    CheckDateBeforeSave(IsAutoIncre, IsEdit);
                }
                else {
                    if (countcomparedate > currenttoday) {
                        CheckDateBeforeSave(IsAutoIncre, IsEdit);
                    }
                    else {
                        swal("", "The authorization email alerts days is greater than the possible days allowed from today before current term ends.");
                        $('.btn-blue').removeAttr('disabled');
                        $("#loadingPage").fadeOut();
                    }
                }

            } else {
                if ($(':input[type="radio"][name=RenewalAuth]:checked').val() == "Yes") {
                    if (countcomparedate == "Invalid Date") {
                        swal("", "Please select a \"Current Term\" to receive Authorization alerts.");
                        $('.btn-blue').removeAttr('disabled');
                        $("#loadingPage").fadeOut();
                    }
                    else {
                        swal("", "Renewal authorization alert date should be greater than current term Start date.");
                        $('.btn-blue').removeAttr('disabled');
                        $("#loadingPage").fadeOut();
                    }
                }
                else
                    CheckDateBeforeSave(IsAutoIncre, IsEdit);
            }
        } else {
            CheckDateBeforeSave(IsAutoIncre, IsEdit);
        }
    }
    else {
        CheckDateBeforeSave(IsAutoIncre, IsEdit);
        //UpdateContract(false);
    }
}
//For Checking Contract Number Exist
//manoj

function UpdateContract(isdraft) {
    $("#ContractTerm").prop('disabled', false);
    $("#ContractTermChoices").prop('disabled', false);
    $("#EndDate").datepicker("option", "disabled", false);

    if (typeof (isdraft) === 'undefined') isdraft = true;
    var vTitle = $("#txtContractTitle").val().trim();

    var vNumber = "";
    if (typeof ($("#txtContractNumber").val()) != 'undefined') {
        vNumber = $("#txtContractNumber").val().trim();
    }

    var contractForm = $("#saveContactForm *").serialize();
    contractForm = contractForm.substring(contractForm.indexOf("&") + 1);
    contractForm = contractForm.substring(contractForm.indexOf("&") + 1);

    //manoj
    //If dropdown is empty
    $('#saveContactForm .choicevaluecheck').each(function (index) {
        if ($(this)[0].selectedIndex == "0") {
            {
                contractForm = contractForm.replace("&" + $(this)[0].id + "=0", "&" + $(this)[0].id + "=");
            }
            //contractForm += "&" + $(this)[0].id + "=";
        }
    });
    //manoj

    contractForm = contractForm.replace("&rdTermEndDate=Term", "");
    contractForm = contractForm.replace("&rdTermEndDate=EndDate", "");

    //If multi dropdown is empty
    $('#saveContactForm .chosenmulti').each(function (index) {
        if ($(this)[0].value == "") {
            contractForm += "&" + $(this)[0].id + "=";
        }
    });


    var result = "&";
    $("#saveContactForm .fielddatecontrol").each(function (index) {
        if ($(this).css('display') != 'none') {
            if ($(this).attr('class').toLowerCase().indexOf("hasdatepicker") >= 0) {
                var name = $(this).attr('class');
                name = name.split("hasDatepicker")[0];
                name = name.slice(0, -1);

                name = name.substr(name.lastIndexOf(' ') + 1);
                var value = $.datepicker.formatDate('mm/dd/yy', $(this).datepicker('getDate'));
                result = result + name + "=" + value + "&";
            }
            else {
                var name = $(this).attr('class').substr($(this).attr('class').lastIndexOf(' ') + 1);
                var value = $.datepicker.formatDate('mm/dd/yy', $(this).datepicker('getDate'));
                result = result + name + "=" + value + "&";
            }
        }
    });
    result = result.slice(0, -1)

    contractForm += result;
    result = "&";
    $("#saveContactForm .fieldphonecontrol").each(function (index) {
        if ($(this).val() != null && $(this).val() != "") {
            var name = $(this)[0].id;
            var value = $(this).intlTelInput("getSelectedCountryData").iso2 + "," + $(this).intlTelInput("getSelectedCountryData").dialCode + "," + $(this).intlTelInput("getNumber", intlTelInputUtils.numberFormat.INTERNATIONAL);
            result = result + name + "=" + value + "&";
        }
        else {
            var name = $(this)[0].id;
            var value = "";
            result = result + name + "=" + value + "&";
        }
    });
    result = result.slice(0, -1)
    contractForm += result;

    if (contractForm.indexOf("&OriginatingParty=") == -1) {
        if (contractForm.indexOf("&CompanyProfile=") == -1) {
            contractForm += "&OriginatingParty=" + encodeURIComponent(thisContractAreaSettings.LegalEntity);
        } else {
            var legalentityselection = $("#CompanyProfile").find('option:selected').text();
            if (typeof legalentityselection != 'undefined' && typeof legalentityselection != "") {
                if (legalentityselection != "--Select--") {
                    contractForm += "&OriginatingParty=" + encodeURIComponent(legalentityselection);
                } else {
                    contractForm += "&OriginatingParty=" + encodeURIComponent(thisContractAreaSettings.LegalEntity);
                }
            }
        }
    }
    if (contractForm.indexOf('Status=') == -1) {
        if (StatusToAdd != "")
            statusupdate = "&Status=" + StatusToAdd;
        else
            statusupdate = "&Status=" + $("#ddlContractStatus option:selected").val();
        contractForm += statusupdate;
        //contractForm += "&Status=" + StatusToAdd;
        //   contractForm += "&Status=" +ddlContractStatus $("#ddlContractStatus option:selected").val();// decodeURI($("#ddlContractStatus").val());
    }
    else if (contractForm.indexOf('Status=0') >= 0) {
        if (StatusToAdd != "")
            statusupdate = "&Status=" + StatusToAdd;
        else
            statusupdate = "&Status=" + $("#ddlContractStatus option:selected").val();
        contractForm = contractForm.replace(/Status=0/g, statusupdate);
    }
    if (getParameterByName("Closeout") == "Yes") {
        contractForm += "&CloseOut=Yes";
    }

    contractForm += "&ContractTitle=" + encodeURIComponent(vTitle);
    contractForm += "&BusinessArea= " + encodeURIComponent($("#txtBusinessArea").val().trim());
    contractForm += "&ContractType=" + encodeURIComponent($("#ddlContractTypes option:selected").text().trim());

    if (businessAreaPath != "") { //if business area changed
        contractForm += "&BusinessAreaPath=" + encodeURIComponent(businessAreaPath);
        contractForm += "&ContractArea=" + encodeURIComponent($("#txtContractAreaName").val().trim());
        contractForm += "&ContractAreaAdministrators=" + encodeURIComponent($("#txtContractAreaAdministrators").val().trim());
        contractForm += "&BusinessAreaOwners=" + encodeURIComponent($("#txtBusinessAreaOwners").val().trim());
    }

    if (PrvAutoinceramentNumberforValidate != AutoinceramentNumberforValidate && AutoinceramentNumberforValidate != null && AutoinceramentNumberforValidate != "") {
        contractForm += "&AutoIncrmentNumber= " + AutoinceramentNumberforValidate;
    } else {
        contractForm += "&AutoIncrmentNumber= " + PrvAutoinceramentNumberforValidate;
    }

    contractForm += "&AccountID=" + localStorage.AccountID;
    //contractForm += "&CreatedBy=" + localStorage.UserName;
    contractForm += "&ModifiedBy=" + localStorage.UserName;
    contractForm += "&OriginatingPartyType=" + encodeURIComponent($("#txtOriginatingPartyType").val());
    if (isdraft) {
        contractForm += "&IsDraft=Yes";
    } else {
        contractForm += "&IsDraft=No";
    }
    //if ($("#txtContractTemplateName").val() != "") {
    //    //SWAL DOUBT
    //    if (confirm('This contract is created from a contract template and it is non standard. Are you sure you want to make it as standard?')) {
    //        contractForm += "&IsStandard=Yes";
    //    }
    var vContractTypeKeys = '';
    $(CurrentContractTypeFields).each(function (i, item) {
        if (vContractTypeKeys == '') {
            vContractTypeKeys = item;
        }
        else {
            vContractTypeKeys += "; " + item;
        }
    });
    contractForm += "&ContractTypeKeys=" + vContractTypeKeys;
    var vvProject = $("#Project").val();
    if (typeof vvProject != 'undefined') {
        var pm = '';
        $.each(vvProject.split(";"), function () {
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/project?projectName=' + $.trim(this),
                type: 'GET',
                dataType: 'json',
                cache: false,
                async: false,
                headers: {
                    'eContracts-ApiKey': localStorage.APIKey
                },
                success: function (data) {
                    if (pm == '') {
                        pm = data.ProjectManager;
                    } else {
                        if (pm.indexOf(data.ProjectManager) <= -1) {
                            pm += ';' + data.ProjectManager;
                        }
                    }
                }
            });
        });
        var UniquelyPM = "";
        if (pm != "") {
            var arr = pm.split(';');
            UniquelyPM = arr.filter(function (item, pos) {
                return arr.indexOf(item) == pos;
            });
            UniquelyPM = UniquelyPM.join(';');
        }
        contractForm += "&ProjectManager= " + UniquelyPM;
    }
    contractForm = contractForm.replace('CompanyProfile=0', 'CompanyProfile=');
    //manoj
    if ($("#hdhMilestoneCapture").text() == "Yes") {
        var fieldandtitle = '';
        $('input:checkbox[class=customdatefiledfeature]:checked:enabled').each(function (customindex, customvalue) {
            if (typeof customvalue.id != "undefined" && customvalue.id != null && customvalue.id != "") {
                fieldandtitle += ";" + customvalue.id.replace('custommile', '');
                //customdatefieldschecked.push(customvalue.id.replace('custommile',''));
            }
        });
        if (typeof fieldandtitle != "undefined" && fieldandtitle != null && fieldandtitle != "") {
            fieldandtitle = (fieldandtitle.charAt(0) === ';') ? fieldandtitle.substr(1) : fieldandtitle;
            contractForm += "&CustomDateFields=" + fieldandtitle;
        } else {
            contractForm += "&CustomDateFields=";
        }
        fieldandtitle = '';
    }
    ////for Custom Metadata Feature
    //var passcustommetadatastatus = ($("#ddlContractTypes").val().split("~").slice(-1) == "OFF") ? "Yes" : "No";
    //if (passcustommetadatastatus == "Yes") {
    //    var veContractFeaturesCTLU = JSON.parse(localStorage.getItem("eContractFeatures"));
    //    var vCustomMetadata = $.grep(veContractFeaturesCTLU, function (n, i) {
    //        return (n.RowKey == "24" && n.Status == "ON");
    //    });
    //    passcustommetadatastatus = (vCustomMetadata.length > 0) ? passcustommetadatastatus : "No";
    //}
    //contractForm += "&CustomCTypeFeature=" + passcustommetadatastatus;
    ////for Custom Metadata Feature
    ////manoj
    if (ContractID != "") {
        contractForm += "&ContractID=" + getParameterByName('ContractID');
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts',
            type: 'PUT',
            dataType: 'json',
            headers: {
                'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, UserName: localStorage.UserName, 'RefreshToken': localStorage.RefreshToken
            },
            data: contractForm,
            cache: false,
            success: function (data) {
                //manoj
                //create milestone for custom date fields
                if ($("#hdhMilestoneCapture").text() == "Yes" && (!isdraft)) {
                    var Milestonecount = parseInt($("#divcustommilestone").children().length);
                    if (parseInt($("#divcustommilestone").children().length) > 0) {
                        $("#divcustommilestone").children().each(function (imilestone, itemmilestone) {
                            var formData = new FormData();
                            var milestoneForm = "ContractID=" + getParameterByName('ContractID');
                            milestoneForm += "&RowKey=Create";
                            milestoneForm += "&ContractTitle=" + encodeURIComponent($("#txtContractTitle").val());
                            milestoneForm += "&MilestoneTitle=" + encodeURIComponent(($(itemmilestone).find('#hdMilestoneTitle')[0].defaultValue != null && $(itemmilestone).find('#hdMilestoneTitle')[0].defaultValue != "") ? $(itemmilestone).find('#hdMilestoneTitle')[0].defaultValue : "");

                            milestoneForm += "&MilestoneType=" + encodeURIComponent(($(itemmilestone).find('#hdMilestoneType')[0].defaultValue != null && $(itemmilestone).find('#hdMilestoneType')[0].defaultValue != "") ? $(itemmilestone).find('#hdMilestoneType')[0].defaultValue : "");
                            milestoneForm += "&MilestoneDescription=" + encodeURIComponent(($(itemmilestone).find('#hdnMilestoneDescription')[0].defaultValue != null && $(itemmilestone).find('#hdnMilestoneDescription')[0].defaultValue != "") ? $(itemmilestone).find('#hdnMilestoneDescription')[0].defaultValue : "");

                            milestoneForm += "&MilestoneDate=" + encodeURIComponent(($(itemmilestone).find('#hdnMilestoneDate')[0].defaultValue != null && $(itemmilestone).find('#hdnMilestoneDate')[0].defaultValue != "") ? $(itemmilestone).find('#hdnMilestoneDate')[0].defaultValue : "");

                            milestoneForm += "&MilestoneOwner=" + encodeURIComponent($(itemmilestone).find('#hdnMilestoneOwner')[0].defaultValue);
                            milestoneForm += "&AutoComplete=" + encodeURIComponent($(itemmilestone).find('#hdnAutoComplete')[0].defaultValue);

                            milestoneForm += "&Priority=" + $(itemmilestone).find('#hdnPriority')[0].defaultValue;
                            milestoneForm += "&MilestoneCompleted=";
                            milestoneForm += "&MilestoneCompletedDate=" + null;
                            milestoneForm += "&MilestoneCompletedBy=";

                            milestoneForm += "&ShowInCalendar=" + encodeURIComponent(($(itemmilestone).find('#hdnShowInCalendar')[0].defaultValue != null && $(itemmilestone).find('#hdnShowInCalendar')[0].defaultValue != "") ? $(itemmilestone).find('#hdnShowInCalendar')[0].defaultValue : "Yes");
                            milestoneForm += "&CreatedBy=" + encodeURIComponent(localStorage.UserName);
                            milestoneForm += "&ModifiedBy=" + encodeURIComponent(localStorage.UserName);
                            milestoneForm += "&SendReminderTo=" + encodeURIComponent($(itemmilestone).find('#hdnSendReminderTo')[0].defaultValue);
                            milestoneForm += "&Reminder1=" + $(itemmilestone).find('#hdnReminder1')[0].defaultValue;
                            milestoneForm += "&Reminder2=" + $(itemmilestone).find('#hdnReminder2')[0].defaultValue;
                            milestoneForm += "&Reminder3=" + $(itemmilestone).find('#hdnReminder3')[0].defaultValue;
                            milestoneForm += "&Reminder1Condition=" + encodeURIComponent($(itemmilestone).find('#hdnReminder1Condition')[0].defaultValue);
                            milestoneForm += "&Reminder2Condition=" + encodeURIComponent($(itemmilestone).find('#hdnReminder2Condition')[0].defaultValue);
                            milestoneForm += "&Reminder3Condition=" + encodeURIComponent($(itemmilestone).find('#hdnReminder3Condition')[0].defaultValue);
                            milestoneForm += "&MilestoneStatus=" + encodeURIComponent($(itemmilestone).find('#hdnMilestoneStatus')[0].defaultValue);
                            milestoneForm += "&AlertsEnabled=" + $(itemmilestone).find('#hdnAlertsEnabled')[0].defaultValue;
                            milestoneForm += "&Ocurrences=" + encodeURIComponent("1");
                            milestoneForm += "&Recurrences=" + encodeURIComponent("None");
                            milestoneForm += "&CustomString=" + encodeURIComponent("None");
                            milestoneForm += "&MilestoneEndTerm=";
                            milestoneForm += "&RecMonthlyString=";
                            milestoneForm += "&CustomDateFieldName=" + $.trim(itemmilestone.id.replace('divcustommile', ''));
                            formData.append("SearializeControls", milestoneForm);
                            formData.append("objoccurrence", "");
                            $.ajax({
                                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/milestones/milestonesnew',
                                type: 'POST',
                                dataType: 'json',
                                headers: {
                                    'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName
                                },
                                data: formData,
                                cache: false,
                                contentType: false,
                                processData: false,
                                success: function (person) {
                                },
                                error: function (data) {
                                },
                            });
                        });
                    }
                }
                //create milestone for custom date fields
                //manoj
                if (!$.isEmptyObject(arrRelatedContracts)) {
                    CreateRelatedContract(getParameterByName('ContractID'), vTitle)
                }
                var docfinalize = getParameterByName("DocFianlize");
                if (typeof docfinalize != 'undefined' && docfinalize != "" && docfinalize == "Yes") {
                    docfinalize = "Yes";
                } else {
                    docfinalize = "No";
                }
                if (typeof ($("#ContractTermType").val()) != "undefined" && $("#ContractTermType").val() == "Renewable") {
                    RenewalTermSave(getParameterByName("ContractID"));
                }

                //Sridhar - Renewal Comments Capture
                var termCommentsXML = '';
                if (typeof ($("#ContractTermType").val()) != "undefined" && $("#ContractTermType").val() != "Renewable" && $("#ContractTermType").val() != "") {
                    //Sridhar
                    var vStartDate = $.datepicker.formatDate('mm/dd/yy', $("#StartDate").datepicker('getDate'));
                    var vEndDate = $.datepicker.formatDate('mm/dd/yy', $("#EndDate").datepicker('getDate'));
                    var vNextEvaluationDate = $.datepicker.formatDate('mm/dd/yy', $("#NextEvaluationDate").datepicker('getDate'));
                    termCommentsXML = getTermCommentsXML($("#ContractTermType").val(), vStartDate, vEndDate, vNextEvaluationDate, false);
                    $.ajax({
                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + vContractID + '/SaveTermComments',
                        type: 'PUT',
                        dataType: 'json',
                        headers: {
                            'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName
                        },
                        data: {
                            ContractID: vContractID,
                            TermCommentsXML: termCommentsXML
                        },
                        success: function (data) {
                        },
                        error: function () {
                        }
                    });
                }

                if (getParameterByName("Finalize") == "true") {
                    $.ajax({
                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?contractid=' + getParameterByName("ContractID") + '&finalized=Yes&username=' + localStorage.UserName + '&docs=' + docfinalize,
                        type: 'PUT',
                        dataType: 'json',
                        headers: {
                            'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging
                        },
                        cache: false,
                        success: function (data) {
                            location = "/Contracts/ContractDetails?ContractID=" + getParameterByName('ContractID');
                        }, error: function (person) {
                            location = "/Contracts/ContractDetails?ContractID=" + getParameterByName('ContractID') + "&Stage=pipeline";
                        }
                    });
                } else {
                    if (getParameterByName('Stage') == 'pipeline') {
                        location = "/Contracts/ContractDetails?ContractID=" + getParameterByName('ContractID') + "&Stage=pipeline";
                    } else {
                        location = "/Contracts/ContractDetails?ContractID=" + getParameterByName('ContractID');
                    }
                    $("#loadingPage").fadeOut();
                }

                if ($("#hdRequestID").text() != "" && $("#hdRequestID").text() != null) {
                    if (isdraft) {
                    }
                    else {
                        $.ajax({
                            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/updateststatus?requestid=' + $("#hdRequestID").text(),
                            type: 'PUT',
                            dataType: 'json',
                            headers: {
                                'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, UserName: localStorage.UserName, 'RefreshToken': localStorage.RefreshToken
                            },
                            cache: false,
                            success: function (data) {
                            },
                            error: function () {
                            }
                        });
                    }
                }

            },
            error: function (person) {
                $("#loadingPage").fadeOut();
            }
        });
    }
}
function CancelEdit() {

    if (getParameterByName('Stage') == 'pipeline') {
        location = "/Contracts/ContractDetails?ContractID=" + getParameterByName('ContractID') + "&Stage=pipeline";
    } else {
        location = "/Contracts/ContractDetails?ContractID=" + getParameterByName('ContractID');
    }
}

function ViewBusinessArea() {

    $('#txtBARowkey').val("");
    $('#txtBAParent').val("");

    if ($('#tbodyBusinessAreaEdit tr').length == 0) {
        BindBusinessArea()
    } else {
        $("#browseBA").dialog("option", "title", "Browse Business Area");
        $("#browseBA").dialog("open");
        $("#browseBA").height("auto");
    }
}
function ViewOriginatingParty() {
    ViewOPCounterparty();
    getcompanyprofile();
    $("#tblOriginatingParties").empty();
    $("#browseOriginatingParty").dialog("option", "title", "Originating Party Picker");
    $("#browseOriginatingParty").dialog("open");
}
function ProjectsFunc() {
    $("#tblProjects").empty();
    $("#loadingPage").fadeIn();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/project',
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        cache: false,
        success: function (data) {
            $('#loadPro').empty();
            arr = [];
            counterpartyTags = [];
            $.each($('#Project').val().split(";"), function () {
                arr.push($.trim(this));
            });
            var datalength = data.length;
            if (datalength > 0) {
                for (var i = 0; i < datalength; i++) {
                    var item = data[i];
                    var article = "";
                    if (i == 0) {
                        article += '<tr><th>Project Name</th></tr>';
                    }

                    article += '<tr><td>';
                    if (arr.indexOf(item.ProjectName) >= 0) {
                        article += '<input id="Pro' + item.RowKey + '" type="checkbox" name="Project" class="css1-checkbox" checked value="' + item.ProjectName + '" />&nbsp;';
                    } else {
                        article += '<input id="Pro' + item.RowKey + '" type="checkbox" name="Project" class="css1-checkbox" value="' + item.ProjectName + '" />&nbsp;';
                    }
                    article += '<label for="Pro' + item.RowKey + '" class="css1-label"><a href="javascript:ViewProject(\'' + escape(item.ProjectName) + '\')">' + item.ProjectName + '</a></label>';   //ENH487 Customer inhanc

                    article += '<input type="text" name="ProjectManager" style="display: none;" value="' + item.ProjectManager + '" />';
                    article += '</td></tr>';

                    counterpartyTags.push(item.ProjectName);
                    $("#tblProjects").append(article);
                }

                $("#txtSearchBoxProjects").autocomplete({
                    source: counterpartyTags,
                    minLength: 1,
                    focus: function (event, ui) {
                        return false;
                    },
                    select: function (evn, uidetails) {
                        $("#txtSearchBoxProjects").val(uidetails.item.label);
                        SearchProjects();
                    }
                });

                var vCount = $("#tblProjects tr").length;
                $('#compact-paginationProjects').pagination({
                    items: vCount,
                    itemsOnPage: 10,
                    currentPage: 1,
                    cssStyle: 'compact-theme',
                    type: 'tdbody',
                    row: 'tr',
                    typeID: 'tblProjects'
                });
                $("#loadingPage").fadeOut();
                $("#browseProjects").dialog("option", "title", "Project Picker");
                $("#browseProjects").dialog("open");
            } else {
                $("#loadingPage").fadeOut();
                $("#browseProjects").dialog("option", "title", "Project Picker");
                $("#browseProjects").dialog("open");
                $('#loadPro').empty();
                $('#loadPro').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>')
            }
        },
        error: function () {
            $('#loadPro').empty();
            $('#loadPro').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>')
        }
    });
}
function ProjectTasksFunc() {
    $("#tblProjectTasks").empty();
    $("#loadingPage").fadeIn();

    var vVarDataLength = 0;
    var isProjectSelected = false;
    var nproject = [];
    $.each($('#Project').val().split(";"), function () {
        nproject.push($.trim(this));
    });
    nproject = nproject.sort();
    $.each(nproject, function () {
        isProjectSelected = true;
        var vVarProjectName = $.trim(this);
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/projecttasks?projectnames=' + encodeURIComponent(vVarProjectName),
            type: 'GET',
            dataType: 'json',
            "Content-Type": "application/json",
            headers: {
                'eContracts-ApiKey': localStorage.APIKey
            },
            cache: false,
            success: function (data) {
                $('#loadProTask').empty();
                arr = [];
                counterpartyTags = [];
                $.each($('#ProjectTask').val().split(";"), function () {
                    arr.push($.trim(this));
                });
                var datalength = data.length;
                if (datalength > 0) {
                    for (var i = 0; i < datalength; i++) {
                        var item = data[i];
                        var article = "";
                        if (i == 0) {
                            if (arr.indexOf(vVarProjectName + ':Default Task') >= 0) {
                                article += '<tr><th><input id="' + vVarProjectName + '" onclick="funselectalltasks(this);" type="checkbox" checked name="ProjectTask" value="' + vVarProjectName + ':Default Task" class="float_left margin-right-5" />' + vVarProjectName + ' (Default Task)</th></tr>';
                            } else {
                                article += '<tr><th><input id="' + vVarProjectName + '" onclick="funselectalltasks(this);" type="checkbox" name="ProjectTask" value="' + vVarProjectName + ':Default Task" class="float_left margin-right-5" />' + vVarProjectName + ' (Default Task)</th></tr>';
                            }
                        }

                        article += '<tr><td>';
                        if (arr.indexOf(vVarProjectName + ':' + item.TaskID) >= 0) {
                            article += '<input id="' + vVarProjectName + item.RowKey + '" type="checkbox" title="' + vVarProjectName + '" onclick="funselecttask(this);" name="ProjectTask" class="css1-checkbox" checked value="' + vVarProjectName + ':' + item.TaskID + '" />';
                        } else {
                            article += '<input id="' + vVarProjectName + item.RowKey + '" type="checkbox" title="' + vVarProjectName + '" onclick="funselecttask(this);" name="ProjectTask" class="css1-checkbox"  value="' + vVarProjectName + ':' + item.TaskID + '" />';
                        }
                        article += '<label for="' + vVarProjectName + item.RowKey + '" class="css1-label"><a href="javascript:ViewProjectTask(\'' + escape(vVarProjectName + ':' + item.TaskID) + '\')">' + item.TaskID + ' : ' + item.TaskDescription + '</a></label>';   //ENH487 Customer inhanc
                        article += '</td></tr>';

                        counterpartyTags.push(item.TaskID);
                        $("#tblProjectTasks").append(article);
                    }
                    if (vVarDataLength == 0) {
                        vVarDataLength = datalength;
                    }

                } else {

                }
            },
            error: function () {
                $('#loadProTask').empty();
            }
        });
    });

    if (vVarDataLength == 0) {
        $("#loadingPage").fadeOut();
        $("#browseProjectTasks").dialog("option", "title", "Project Task Picker");
        $("#browseProjectTasks").dialog("open");
        $('#loadProTask').empty();
        if (!isProjectSelected) {
            $('#loadProTask').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>')
        }
    } else {
        $("#txtSearchBoxProjectTasks").autocomplete({
            source: counterpartyTags,
            minLength: 1,
            focus: function (event, ui) {
                return false;
            }
        });

        var vCount = $("#tblProjectTasks tr").length;
        $('#compact-paginationProjectTasks').pagination({
            items: vCount,
            itemsOnPage: 10,
            typeID: 'tblProjectTasks',
            cssStyle: 'compact-theme'
        });
        $("#loadingPage").fadeOut();
        $("#browseProjectTasks").dialog("option", "title", "Project Task Picker");
        $("#browseProjectTasks").dialog("open");
    }

}
function ViewProjects() {

    $('#loadPro').html('<img src="../Content/Images/icon/loading.gif"> Working on it...');
    if ($('#tblProjects tr').length <= 0) {
        ProjectsFunc();
    } else {
        $('#loadPro').empty();
        $("#browseProjects").dialog("option", "title", "Project Picker");
        $("#browseProjects").dialog("open");
    }
}
function ViewProjectTasks() {
    if ($("#Project").val() != "") {
        $('#loadPro').html('<img src="../Content/Images/icon/loading.gif"> Working on it...');
        ProjectTasksFunc();
    } else {
        swal("", "Please select project");
    }
}
//Performance Optimization Start
var cp_nextpagetoken = "";
var SelectedCounterpartList = [];
var myCounterPartyArrayAll = [];
function CounterpartyFuncOld(CounterpartyNames) {
    $("#loadingPage").fadeIn();
    $("#tblCounterparties").empty();
    $("#liSelectedCounterParty").empty();
    $("#menuSMultiple").css("display", ""); //Bug id: eO37487
    //$('#loadGenCounterParty').html('<img src="../Content/Images/icon/loading.gif">');
    var SelectedCounterpartList = [];
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/counterpartypicker',
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        cache: false,
        success: function (data) {
            CounterPartyArrayprev = [];

            if (CounterpartyNames.length > 0) {
                $.each(CounterpartyNames, function () {
                    if (SelectedCounterpartList.indexOf($.trim(this)) == -1)
                        SelectedCounterpartList.push($.trim(this));
                });
            }
            //else {
            //    $.each($('#Counterparty').val().replace("; ", ";").split(";"), function () {
            //        if (SelectedCounterpartList.indexOf($.trim(this)) == -1)
            //            SelectedCounterpartList.push($.trim(this));
            //    });
            //}
            var myCounterPartyArrayList = [];
            var obj1 = {
            };
            $(data).each(function (idata, itemdata) {
                if (!(itemdata.CounterpartyName in obj1)) {
                    if (itemdata.CounterpartyName.trim() != "") {
                        if (itemdata.IsGlobal == "Yes")
                            myCounterPartyArrayList.push(itemdata);
                        else {
                            if (typeof (itemdata.BusinessAreasPath) != "undefined" && itemdata.BusinessAreasPath != "") {
                                var contractarea = "";
                                var Businesssarea = "";
                                var splitbusinessPath = itemdata.BusinessAreasPath.split(';');
                                $(splitbusinessPath).each(function (index) {
                                    if (this != null && this.toString() != "") {
                                        var contBusi = this.split('>');
                                        if (typeof (contBusi) != "undefined") {
                                            if (contBusi.length > 0) {
                                                contractarea = contBusi[0].trim();
                                                Businesssarea = contBusi[contBusi.length - 1].trim();
                                                if (thisBusinessAreaNameC == Businesssarea && thisContractAreaNameC == contractarea)
                                                    myCounterPartyArrayList.push(itemdata);
                                            }
                                        }
                                    }
                                })

                            }
                        }
                    }
                }
                obj1[itemdata.CounterpartyName] = true;
            });

            //manoj
            var article = '<thead><tr><th><input id="selectallCounterParty" onclick="funselectallCounterParty(this);" type="checkbox"/> Counterparty Name</th><th>Counterparty Type</th><th>Country</th></tr></thead><tbody>';
            var countryvalue = ''
            $(myCounterPartyArrayList).each(function (iArray, itemArray) {
                article += '<tr><td>';
                if (SelectedCounterpartList.length > 0) {
                    if (SelectedCounterpartList.indexOf(itemArray.CounterpartyName) > -1) {
                        article += '<input id="' + itemArray.RowKey + '" type="checkbox" name="Counterparty" onclick="checkMultipleDocumentsCounterParty(this);" checked class="css1-checkbox" value="' + escape(itemArray.CounterpartyName) + '" />';
                    }
                    else {
                        article += '<input id="' + itemArray.RowKey + '" type="checkbox" name="Counterparty" onclick="checkMultipleDocumentsCounterParty(this);"  class="css1-checkbox" value="' + escape(itemArray.CounterpartyName) + '" />';
                    }
                }
                else {
                    article += '<input id="' + itemArray.RowKey + '" type="checkbox" name="Counterparty" onclick="checkMultipleDocumentsCounterParty(this);"  class="css1-checkbox" value="' + escape(itemArray.CounterpartyName) + '" />';
                }
                article += '<label for="CP' + itemArray.RowKey + '" class="css1-label" title="' + escape(itemArray.CounterpartyName) + '" onmouseover="UnescapeNameMouseOver(this)" style="display: inline;"><a href="/Counterparty/CounterpartyDetail?CounterpartyID=' + itemArray.RowKey + '" target="_blank">' + itemArray.CounterpartyName + '</a></label></td>';    //ENH487 Customer inhanc
                article += '<td>' + itemArray.CounterpartyType + '</td>';
                countryvalue = itemArray.Country != "0" ? itemArray.Country : "-"
                article += '<td>' + countryvalue + '</td>';
                article += '</tr>';
            });
            //manoj
            $("#listWrapper").html('<table id="tblCounterparties" class="f_list tablevaleclass"></table>');
            $("#tblCounterparties").html(article);
            _alphabetSearch = '';
            $("#tblCounterparties").DataTable({
                "columnDefs": [
                { "orderable": false, 'targets': "_all" }
                ],
                "fnDrawCallback": function () {
                    eventFired('Counterparty', 'selectallCounterParty', 'tblCounterparties');
                },
                "iDisplayLength": 20,
                "searchHighlight": true,
                "pagingType": "full_numbers",
                //"scrollY": "420px",
                //"scrollCollapse": true,
            });
            alphabeticselection('tblCounterparties');
            article = '';
            if ($('input:checkbox[name="Counterparty"]:checked').length == $('input:checkbox[name="Counterparty"]').length && $('input:checkbox[name="Counterparty"]:checked').length != 0) {
                $("#selectallCounterParty").attr('checked', true);
            } else {
                $("#selectallCounterParty").attr('checked', false);
            }
            $.each(SelectedCounterpartList, function () {
                if (typeof ($.trim(this)) != 'undefined' && $.trim(this) != null && $.trim(this) != "") {
                    $('#liSelectedCounterParty').append('<span style="font-size:13px;">' + $.trim(this) + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveSelectedCouterParty(this);" style="float:right" /></span>');
                }
            });
            //manoj
            // Find and remove item from an array

            //var i = BAOwnersselecteditems.indexOf($('#txtBA').val());
            //if (i != -1) {

            //} else {
            //    BAOwnersselecteditems.push($('#txtBA').val());
            //    $('#liSelectedBAOwners').append('<span style="font-size:11px;">' + $('#txtBA').val() + '</span>');
            //}
            $('#txtBAOwnerofPath').val($('#txtBAParent').val());
            //$('#txtBAOwnerof').val(BAOwnersselecteditems);

            //var i = selectedBusinessAreaID11.indexOf($('#txtBARowkey').val());
            //if (i != -1) {

            //} else {
            //    selectedBusinessAreaID11.push($('#txtBARowkey').val());
            //}
            $('.CP_Det').remove();
            $(".CP_Det1").css('display', 'none');
            $("#browseCounterparty").dialog("option", "title", "Counterparty Picker");
            $("#browseCounterparty").dialog("open");
            PrvRelatedCounterparities = [];
            arrRelatedCounterparities = [];
            curRelatedCounterparities = [];
            $("#loadingPage").fadeOut();
        },
        error: function () {
            $('#loadCP').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>')
            //var i = BAOwnersselecteditems.indexOf($('#txtBA').val());
            //if (i != -1) {

            //} else {
            //    //BAOwnersselecteditems.push($('#txtBA').val());
            //    $('#liSelectedBAOwners').append('<span style="font-size:11px;">' + $('#txtBA').val() + '</span>');
            //}
            $('.CP_Det').remove();
            $(".CP_Det1").css('display', 'none');
            $('#txtBAOwnerofPath').val($('#txtBAParent').val());
            $('#txtBAOwnerof').val(BAOwnersselecteditems);

            //var i = selectedBusinessAreaID11.indexOf($('#txtBARowkey').val());
            //if (i != -1) {

            //} else {
            //    selectedBusinessAreaID11.push($('#txtBARowkey').val());
            //}

            $("#browseCounterparty").dialog("option", "title", "Counterparty Picker");
            $("#browseCounterparty").dialog("open");
            PrvRelatedCounterparities = [];
            arrRelatedCounterparities = [];
            curRelatedCounterparities = [];
            $("#loadingPage").fadeOut();
        }
    });
}
function CounterpartyFunc(CounterpartyNames) {
    $("#loadingPage").fadeIn();
    $("#liSelectedCounterParty").empty();
    $('#loadGenCounterParty').html('')
    $("#menuSMultiple").css("display", "");//Bug id: eO37487
    $('#tblCounterparties').html('')
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/counterpartypicker',//?nextpagetoken=' + cp_nextpagetoken,
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (result_success) {
            var data = result_success;
            //data = $.grep(data, function (n, i) {
            //    return (n.IsGlobal == "Yes" || (typeof n.BusinessAreasPath != 'undefined' && n.BusinessAreasPath != ""
            //        && n.BusinessAreasPath.split(thisBusinessAreaPath + ';').indexOf() >= 0));
            //});
            cp_nextpagetoken = '';// result_success.NextPageToken;
            CounterPartyArrayprev = [];
            SelectedCounterpartList = [];
            if (CounterpartyNames.length > 0) {
                $.each(CounterpartyNames, function () {
                    if (SelectedCounterpartList.indexOf($.trim(this)) == -1)
                        SelectedCounterpartList.push($.trim(this));
                });
            }

            var columncounterparty = [];
            var myCounterPartyArrayList = [];
            myCounterPartyArray = []; //eO310313
            //manoj
            $(data).each(function (idata, itemdata) {
                if (itemdata.CounterpartyName.trim() != "") {
                    if (itemdata.IsGlobal == "Yes") {
                        columncounterparty.push(itemdata.CounterpartyName);
                        myCounterPartyArray.push(itemdata);
                    }
                    else {
                        if (typeof (itemdata.BusinessAreasPath) != "undefined" && itemdata.BusinessAreasPath != "") {
                            var contractarea = "";
                            var Businesssarea = "";
                            var splitbusinessPath = itemdata.BusinessAreasPath.split(';');
                            $(splitbusinessPath).each(function (index) {
                                if (this != null && this.toString() != "") {
                                    var contBusi = this.split('>');
                                    if (typeof (contBusi) != "undefined") {
                                        if (contBusi.length > 0) {
                                            contractarea = contBusi[0].trim();
                                            Businesssarea = contBusi[contBusi.length - 1].trim();
                                            if (thisBusinessAreaNameC == Businesssarea && thisContractAreaNameC == contractarea) {
                                                columncounterparty.push(itemdata.CounterpartyName);
                                                myCounterPartyArray.push(itemdata);
                                            }
                                        }
                                    }
                                }
                            })
                        }
                    }
                }
            });
            myCounterPartyArrayAll = myCounterPartyArray;
            $.each(SelectedCounterpartList, function () {
                if (typeof ($.trim(this)) != 'undefined' && $.trim(this) != null && $.trim(this) != "") {
                    $('#liSelectedCounterParty').append('<span style="font-size:13px;">' + $.trim(this) + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveSelectedCouterParty(this);" style="float:right" /></span>');
                }
            });
            CreateCounterPartyListPicker(0);
            var vCount = myCounterPartyArray.length;
            $('#compact-paginationCounterparties').pagination({
                items: vCount,
                itemsOnPage: $("#ddltblCounterparties").val(),
                typeID: 'tblCounterparties',
                cssStyle: 'compact-theme',
                listname: 'CreateCounterPartyListPicker'
            });
            $("#txtSearchBoxCounterparties").autocomplete({
                source: columncounterparty,
                minLength: 1,
                focus: function (event, ui) {
                    return false;
                },
                select: function (evn, uidetails) {
                    $("#txtSearchBox").val(uidetails.item.label);
                    SearchCounterpartyPicker();
                }
            });
            // Find and remove item from an array
            $('.CP_Det').remove();
            $(".CP_Det1").css('display', 'none');
            $("#browseCounterparty").dialog("option", "title", "Counterparty Picker");
            $("#browseCounterparty").dialog("open");
            PrvRelatedCounterparities = [];
            arrRelatedCounterparities = [];
            curRelatedCounterparities = [];
            $("#loadingPage").fadeOut();
        },
        error: function () {
            $("#listWrapper").html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>');
            $('.CP_Det').remove();
            $(".CP_Det1").css('display', 'none');
            $("#browseCounterparty").dialog("option", "title", "Counterparty Picker");
            $("#browseCounterparty").dialog("open");
            PrvRelatedCounterparities = [];
            arrRelatedCounterparities = [];
            curRelatedCounterparities = [];
            $("#loadingPage").fadeOut();
        }
    });
}

var currentSelectedCounterParty = [];
var currSelected = false;
$('#txtSearchBoxCounterparties').keyup(function (event) {
    currSelected = true;
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode != '13') {
        SearchCounterpartyPicker();
    }
    //Stop the event from propogation to other handlers
    //If this line will be removed, then keypress event handler attached
    //at document level will also be triggered
    event.stopPropagation();
});
function SearchCounterpartyPicker() {
    $("#tblCounterparties").empty();
    //eO310163 - Anand
    var vsrhKeyword = $('input#txtSearchBoxCounterparties[type="search"]').val().toLowerCase();
    myCounterPartyArray = $.grep(myCounterPartyArrayAll, function (n, i) {
        return (n.CounterpartyName.toLowerCase().search(vsrhKeyword) >= 0 || n.CounterpartyType.toLowerCase().search(vsrhKeyword) >= 0
             || n.Country.toLowerCase().search(vsrhKeyword) >= 0);
    });
    var srhAlphabet = $("#tblCounterpartiesAlphabet > span.active")[0].textContent;
    if (srhAlphabet == "#")
        myCounterPartyArray = $.grep(myCounterPartyArray, function (n, i) {
            return (n.CounterpartyName.search('0') == 0 || n.CounterpartyName.search('1') == 0 || n.CounterpartyName.search('2') == 0 ||
                 n.CounterpartyName.search('3') == 0 || n.CounterpartyName.search('4') == 0 || n.CounterpartyName.search('5') == 0 ||
                n.CounterpartyName.search('6') == 0 || n.CounterpartyName.search('7') == 0 || n.CounterpartyName.search('8') == 0 ||
                n.CounterpartyName.search('9') == 0);
        });
    else if (srhAlphabet != "All")
        myCounterPartyArray = $.grep(myCounterPartyArray, function (n, i) {
            return (n.CounterpartyName.toUpperCase().search(srhAlphabet) == 0);
        });
    CreateCounterPartyListPicker(0);
    var vCount = myCounterPartyArray.length;
    $('#compact-paginationCounterparties').pagination({
        items: vCount,
        itemsOnPage: $("#ddltblCounterparties").val(),
        typeID: 'tblCounterparties',
        cssStyle: 'compact-theme',
        listname: 'CreateCounterPartyListPicker'
    });
}
$('#tblCounterpartiesAlphabet > span').click(function () {
    $("#tblCounterpartiesAlphabet > span").removeClass('active');
    $(this).addClass('active');
    SearchCounterpartyPicker();
});
$("#ddltblCounterparties").change(function (obj) {
    CreateCounterPartyListPicker(0);
    var vCount = myCounterPartyArray.length;
    $('#compact-paginationCounterparties').pagination({
        items: vCount,
        itemsOnPage: $("#ddltblCounterparties").val(),
        typeID: 'tblCounterparties',
        cssStyle: 'compact-theme',
        listname: 'CreateCounterPartyListPicker'
    });
});
function CreateCounterPartyListPicker(page) {
    $("#tblCounterparties").css("display", "");
    var startIndex = page * parseInt($("#ddltblCounterparties").val());
    var endIndex = startIndex + parseInt($("#ddltblCounterparties").val());
    $('#tblCounterparties').empty();
    if (endIndex > myCounterPartyArray.length) endIndex = myCounterPartyArray.length;
    var resultfound = false;
    if (startIndex == endIndex) {
        var art = "No items found.";
        $("#tblCounterparties").append(art);
    }
    else {
        var article = "";
        for (var i = startIndex; i < endIndex; i++) {
            var itemArray = myCounterPartyArray[i];
            if (i == startIndex) {
                article += '<thead><tr><th><input id="selectallCounterParty" onclick="funselectallCounterParty(this);" type="checkbox"/> Counterparty Name</th><th>Counterparty Type</th><th>Country</th></tr></thead>';
            }

            article += '<tr><td>';
            if (SelectedCounterpartList.length > 0) {
                if (SelectedCounterpartList.indexOf(itemArray.CounterpartyName.trim()) > -1) {
                    article += '<input id="' + itemArray.RowKey + '" type="checkbox" name="Counterparty" onclick="checkMultipleDocumentsCounterParty(this);" checked class="css1-checkbox" value="' + escape(itemArray.CounterpartyName.trim()) + '" />';
                }
                else {
                    article += '<input id="' + itemArray.RowKey + '" type="checkbox" name="Counterparty" onclick="checkMultipleDocumentsCounterParty(this);"  class="css1-checkbox" value="' + escape(itemArray.CounterpartyName.trim()) + '" />';
                }
            }
            else {
                article += '<input id="' + itemArray.RowKey + '" type="checkbox" name="Counterparty" onclick="checkMultipleDocumentsCounterParty(this);"  class="css1-checkbox" value="' + escape(itemArray.CounterpartyName.trim()) + '" />';
            }

            if (currSelected) {
                if (currentSelectedCounterParty.length > 0) {
                    if (currentSelectedCounterParty.indexOf(itemArray.CounterpartyName.trim()) > -1) {
                        article += '<input id="' + itemArray.RowKey + '" type="checkbox" name="Counterparty" onclick="checkMultipleDocumentsCounterParty(this);" checked class="css1-checkbox" value="' + escape(itemArray.CounterpartyName.trim()) + '" />';
                    }
                    else {
                        article += '<input id="' + itemArray.RowKey + '" type="checkbox" name="Counterparty" onclick="checkMultipleDocumentsCounterParty(this);"  class="css1-checkbox" value="' + escape(itemArray.CounterpartyName.trim()) + '" />';
                    }
                }
            }

            article += '<label for="CP' + itemArray.RowKey + '" class="css1-label HighlightText" title="' + escape(itemArray.CounterpartyName.trim()) + '"  onmouseover="UnescapeNameMouseOver(this)" style="display: inline;"><a href="/Counterparty/CounterpartyDetail?CounterpartyID=' + itemArray.RowKey + '" target="_blank" >' + itemArray.CounterpartyName.trim() + '</a></label></td>';    //ENH487 Customer inhanc
            article += '<td class="HighlightText">' + itemArray.CounterpartyType + '</td>';
            countryvalue = itemArray.Country != "0" ? itemArray.Country : "-"
            article += '<td class="HighlightText">' + countryvalue + '</td>';
            article += '</tr>';
            $('#loading').empty();
            resultfound = true;
        }
        $("#tblCounterparties").html(article);
        article = '';
    }

    var srhtextarr = $("#txtSearchBoxCounterparties").val().trim();
    if (srhtextarr != '')
        $(".HighlightText").highlight(srhtextarr, "srchbold");

    if ($('input:checkbox[name="Counterparty"]:checked').length == $('input:checkbox[name="Counterparty"]').length && $('input:checkbox[name="Counterparty"]:checked').length != 0) {
        $("#selectallCounterParty").prop('checked', true);
    } else {
        $("#selectallCounterParty").prop('checked', false);
    }
    var checkingsdivchild = document.getElementById("liSelectedCounterParty").hasChildNodes();
    if (!checkingsdivchild) {
        if (multipleChecksDocumentID.length > 0) {
            for (var spl = 0; spl < multipleChecksDocumentID.length; spl++) {
                if (multipleChecksDocumentID[spl].trim() != "") {
                    $('#liSelectedCounterParty').append('<span style="font-size:13px;">' + multipleChecksDocumentID[spl].trim() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveSelectedCouterParty(this);" style="float:right" /></span>');
                }
            }
        }
        else {
        }
    }
    $('#loadGenCounterParty').empty();
}
//Performance Optimization End
function LegalEntityFunc() {
    $("#loadingPage").fadeIn();
    $("#liSelectedLegalEntity").empty();
    $('#loadGenLegalEntity').html('')
    var SelectedLEList = [];
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/legalentities',
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        cache: false,
        success: function (data) {
            LeagalEntity = data;
            CounterPartyArrayprev = [];
            $.each($('#CompanyProfile').val().replace("; ", ";").split(";"), function () {
                if (SelectedLEList.indexOf($.trim(this)) == -1)
                    SelectedLEList.push($.trim(this));
            });

            var myLEArrayList = [];
            var obj1 = {
            };

            $(data).each(function (idata, itemdata) {
                myLEArrayList.push(itemdata);
            });
            //manoj

            var article = '<thead><tr><th style="height:24px"><input id="selectallLE" onclick="funselectallLE(this);" type="checkbox"/> Legal Entity</th><th style="height:24px">Default Currency</th><th>Authorized Signatory(ies)</th></tr></thead><tbody>';
            //manoj 
            var AuthorizedSignatory = ''
            $(myLEArrayList).each(function (iArray, itemArray) {
                article += '<tr><td>';
                if (SelectedLEList.length > 0) {
                    if (SelectedLEList.indexOf(itemArray.LegalEntityName.trim()) > -1) {
                        article += '<input id="' + itemArray.RowKey + '" type="checkbox" name="CompanyProfile" onclick="checkMultipleDocumentsLE(this);" checked class="css1-checkbox" value="' + escape(itemArray.LegalEntityName.trim()) + '" />';
                    }
                    else {
                        article += '<input id="' + itemArray.RowKey + '" type="checkbox" name="CompanyProfile" onclick="checkMultipleDocumentsLE(this);"  class="css1-checkbox" value="' + escape(itemArray.LegalEntityName.trim()) + '" />';
                    }
                }
                else {
                    article += '<input id="' + itemArray.RowKey + '" type="checkbox" name="CompanyProfile" onclick="checkMultipleDocumentsLE(this);"  class="css1-checkbox" value="' + escape(itemArray.LegalEntityName.trim()) + '" />';
                }
                article += '<label for="CP' + itemArray.RowKey + '" class="css1-label" title="' + escape(itemArray.LegalEntityName.trim()) + '"  onmouseover="UnescapeNameMouseOver(this)" style="display: inline;">' + itemArray.LegalEntityName.trim() + '</label></td>';
                article += '<td>' + itemArray.DefaultCurrency + '</td>';
                AuthorizedSignatory = itemArray.AuthorizedSignatory != "" ? itemArray.AuthorizedSignatory : "-"
                article += '<td>' + AuthorizedSignatory + '</td>';
                article += '</tr>';
            });
            //manoj
            $("#listLEWrapper").html('<table id="tblLE" class="f_list"></table>');
            $("#tblLE").html(article);

            _alphabetSearch = '';
            $("#tblLE").DataTable({
                "columnDefs": [
                    { "orderable": false, 'targets': "_all" }
                ],
                "fnDrawCallback": function () {
                    eventFired('CompanyProfile', 'selectallLE', 'tblLE');
                },
                "iDisplayLength": 20,
                "searchHighlight": true,
                "pagingType": "full_numbers",
                //"scrollY": "420px",
                //"scrollCollapse": true,
            });
            alphabeticselection('tblLE');
            article = '';
            //manoj
            if ($('input:checkbox[name="CompanyProfile"]:checked').length == $('input:checkbox[name="CompanyProfile"]').length && $('input:checkbox[name="CompanyProfile"]:checked').length != 0) {
                $("#selectallLE").attr('checked', true);
            } else {
                $("#selectallLE").attr('checked', false);
            }
            $.each(SelectedLEList, function () {
                if (typeof ($.trim(this)) != 'undefined' && $.trim(this) != null && $.trim(this) != "") {
                    $('#liSelectedLegalEntity').append('<span style="font-size:13px;">' + $.trim(this) + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveSelectedLE(this);" style="float:right" /></span>');
                }
            });
            // Find and remove item from an array
            $("#browseLegalEntity").dialog("option", "title", "Legal Entity Picker");
            $("#browseLegalEntity").dialog("open");
            $("#loadingPage").fadeOut();
        },
        error: function () {
            $("#listLEWrapper").html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>');
            $("#browseLegalEntity").dialog("option", "title", "Legal Entity Picker");
            $("#browseLegalEntity").dialog("open");
            $("#loadingPage").fadeOut();
        }
    });
}


function CounterpartyFunc1() {
    $("#tblOPCounterparties").empty();
    var vCounterparty = $('#Counterparty').val();
    columnOPConterparty = [];
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
                columnOPConterparty.push(vCounterpartyName);
                $("#txtSearchBoxOPCounterparties").autocomplete({
                    source: columnOPConterparty,
                    minLength: 1,
                    focus: function (event, ui) {
                        return false;
                    },
                    select: function (evn, uidetails) {
                        $("#txtSearchBoxOPCounterparties").val(uidetails.item.label);
                        SearchOPCounterparties();
                    }
                });
            }
            else if (vCounterpartyName == "Counterparty not in the list")
            { $("#tblOPCounterparties").append('<li>' + vCounterpartyName + '</li>'); }
            else {
                $("#tblOPCounterparties").append('<li style="font-size:13px;">No Counterparty is available for this contract.</li>');
            }
        });
        var vCount = $("#tblOPCounterparties li").length;
        $('#compact-paginationOPCounterparties').pagination({
            items: vCount,
            itemsOnPage: 15,
            type: 'ul',
            row: 'li',
            typeID: 'tblOPCounterparties',
            cssStyle: 'compact-theme'
        });
    }
}

function ViewCounterparty(selectedFieldName) {
    currSelected = false;
    $('#txtSearchBoxCounterparties').val("");
    $("#Counterparty").css("display", "none");
    strSelCounterPartyField = selectedFieldName;
    var CounterpartyNames = [];
    var counter = $("#" + strSelCounterPartyField + "").val();
    $.each(counter.replace("; ", ";").split(";"), function () {
        CounterpartyNames.push($.trim(this));
    });
    // $("#counterpartyUL li").each(function (i, cp) {
    //     var name = cp.children[0].innerText;
    //     CounterpartyNames += ";" + name;
    // });
    //while (CounterpartyNames.charAt(0) === ';') {
    //    CounterpartyNames = CounterpartyNames.substr(1);
    //}
    if (CounterpartyNames.length > 0) {
        CounterpartyFunc(CounterpartyNames);
    }
    else {
        CounterpartyFunc(CounterpartyNames);
        //manoj
        //if (localStorage.UserType.indexOf("Global Contract Owner") >= 0 || localStorage.UserType.indexOf("Global Administrator") >= 0) {
        //    $("#menuSMultiple").css("display", "");
        //    getCounterpartyprimaryFields();
        //} else {
        //    $("#menuSMultiple").css("display", "none");
        //}
        getCounterpartyprimaryFields();
        //manoj
    }
    $('#loadCP').html('<img src="../Content/Images/icon/loading.gif"> Working on it...');
}

function ViewLegalEntity() {
    LegalEntityFunc();
    $('#loadCP').html('<img src="../Content/Images/icon/loading.gif"> Working on it...');
}

function ViewGeneric(obj) {
    vGlobalObjForGeneric = obj;
    $("#loadingPage").fadeIn();
    $("#tblGeneric").empty();
    $("#tblGenericheader").empty();
    $("#liSelectedRU").empty();
    var art = '<tr><td><article style="width:100%; text-align:center;">';
    art += '<input id="txtSearchBoxGeneric" class="f_inpt cl width80" type="text"  style="text-wrap:none" placeholder="Type to Search" />';
    art += '<img title="Search" style="cursor: pointer; position: relative; left: -40px; top:-2px;" onclick="javascript: SearchGeneric();" src="../Content/Images/search_over.png" />';
    art += "<a href='javascript:void(0)' class='linkPickerClear' onclick='ClearGeneric();'>Clear</a>";
    art += '</article></td></tr>';
    $("#tblGenericheader").append(art);

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contractfieldbydisplayname?fielddisplayname=' + encodeURIComponent(obj.id),
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        success: function (data) {
            var prevSelected = $("#" + obj.title).val();
            arrprevRU = [];
            $.each(prevSelected.split(";"), function () {
                arrprevRU.push($.trim(this));
            });
            var arraysplitRU = [];
            myArrayRU = [];
            arraysplitRU = data[0].ChoiceValues.split("\n")
            var obj1 = {
            };
            for (var i = 0; i < arraysplitRU.length; i++) {
                if (!(arraysplitRU[i] in obj1)) {
                    if (arraysplitRU[i].trim() != "") {
                        myArrayRU.push(arraysplitRU[i]);
                    }
                }
                obj1[arraysplitRU[i]] = true;
            }
            var resultfound = true;
            var myArraylength = myArrayRU.length;
            $("#browseGeneric").data('param_1', obj.title).dialog("option", "title", obj.id + " Picker");
            CreateReportUnitList(0);

            var vCount = myArraylength;

            $('#compact-paginationGeneric').pagination({
                items: vCount,
                itemsOnPage: 10,
                typeID: 'tblGeneric',
                cssStyle: 'compact-theme',
                listname: 'ReportUnit'
            });
            $('#compact-paginationGeneric').css("display", "");
            $("#txtSearchBoxGeneric").autocomplete({
                source: myArrayRU,
                minLength: 1,
                focus: function (event, ui) {
                    return false;
                },
                select: function (evn, uidetails) {
                    $("#txtSearchBoxGeneric").val(uidetails.item.label);
                    SearchGeneric();
                }
            });
            $("#loadingPage").fadeOut();
            $("#browseGeneric").dialog("open");

        },
        error:
            function (data) {
                $("#tblGenericheader").html('No item found.');
                $("#liSelectedRU").empty();
                $("#loadingPage").fadeOut();
                $("#browseGeneric").dialog("open");
            }
    });

    $('#txtSearchBoxGeneric').keypress(function (e) {
        if ($('#txtSearchBoxGeneric').val() != "") {
            if (e.keyCode == 13) {
                $(".ui-autocomplete").css('display', 'none');
                SearchGeneric();
            }
        }
    });
}

function ClearGeneric() {
    $('#loadGen').html('<img src="../Content/Images/icon/loading.gif">');
    $("#tblGeneric").find("tr:gt(0)").remove();
    $("#txtSearchBoxGeneric").val("")
    var searchKeyword = "";
    filtergeneric(searchKeyword);
}
function SearchGeneric() {
    $('#loadGen').html('<img src="../Content/Images/icon/loading.gif">Searching...');
    $("#tblGeneric").find("tr:gt(0)").remove();
    var searchKeyword = $("#txtSearchBoxGeneric").val();
    filtergeneric(searchKeyword);
}

function filtergeneric(searchKeyword) {
    multipleChecksDocumentID = [];
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contractfieldbydisplayname?fielddisplayname=' + encodeURIComponent(vGlobalObjForGeneric.id),
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        success: function (data) {
            var prevSelected = $("#" + vGlobalObjForGeneric.title).val();
            arrprevRU = [];
            $.each(prevSelected.split(";"), function () {
                arrprevRU.push($.trim(this));
            });
            var arraysplitRU = [];
            myArrayRU = [];
            arraysplitRU = data[0].ChoiceValues.split("\n")
            var obj1 = {
            };
            for (var i = 0; i < arraysplitRU.length; i++) {
                if (!(arraysplitRU[i] in obj1)) {
                    if (arraysplitRU[i].trim() != "") {
                        if (arraysplitRU[i].toLowerCase().indexOf(searchKeyword.toLowerCase()) > -1 || searchKeyword == "") {
                            myArrayRU.push(arraysplitRU[i]);
                        }
                    }
                }
                obj1[arraysplitRU[i]] = true;
            }
            var resultfound = true;
            var myArraylength = myArrayRU.length;
            CreateReportUnitList(0);

            var vCount = myArraylength;

            var vCount = $("#tblGeneric tr").length;

            $('#compact-paginationGeneric').pagination({
                items: vCount,
                itemsOnPage: 10,
                typeID: 'tblGeneric',
                cssStyle: 'compact-theme',
                listname: 'ReportUnit'
            });
            $('#compact-paginationGeneric').css("display", "");
            $("#txtSearchBoxGeneric").autocomplete({
                source: arraysplitRU,
                minLength: 1,
                focus: function (event, ui) {
                    return false;
                },
                select: function (evn, uidetails) {
                    $("#txtSearchBoxGeneric").val(uidetails.item.label);
                    SearchGeneric();
                }
            });
            $('#loadGen').empty();
        },
        error:
            function (data) {
                $('#loadGen').html
                $("#liSelectedRU").empty();
                $("#tblGeneric").html('No item found.');
            }
    });

    $('#txtSearchBoxGeneric').keypress(function (e) {
        if ($('#txtSearchBoxGeneric').val() != "") {
            if (e.keyCode == 13) {
                $(".ui-autocomplete").css('display', 'none');
                SearchGeneric();
            }
        }
    });
}

function ViewOPCounterparty() {
    if ($('#tblOPCounterparties tr').length <= 0) {
        CounterpartyFunc1();
    }
}
function ViewMasterAgreement() {
    $('#loadMA').html('<img src="../Content/Images/icon/loading.gif"> Working on it...');
    if ($('#tblMasterAgreements tr').length <= 0) {
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?contractclass=Master Agreement',
            type: 'GET',
            dataType: 'json',
            "Content-Type": "application/json",
            headers: {
                'eContracts-ApiKey': localStorage.APIKey
            },
            cache: false,
            success: function (data) {
                $('#loadMA').empty();
                $(data).each(function (i, item) {
                    var article = '<li>';
                    article += '<input id="' + item.RowKey + '" type="radio" name="MasterAgreement" class="css-checkbox" value="' + item.ContractTitle + '" />';
                    article += '<label for="' + item.RowKey + '" class="css-label PreserveSpace">' + item.ContractTitle + '</label>';
                    article += '</li>';
                });

                var vCount = $("#tblMasterAgreements li").length;
                $('#compact-paginationMasterAgreements').pagination({
                    items: vCount,
                    itemsOnPage: 15,
                    type: 'ul',
                    row: 'li',
                    typeID: 'tblMasterAgreements',
                    cssStyle: 'compact-theme'
                });

            },
            error: function () {
                $('#loadMA').empty();
                $('#loadMA').html('<p style="margin-left: 20px;">No items found.</p>')
            }
        });
    } else {
        $('#loadMA').empty();
    }
    $("#browseMasterAgreements").dialog("option", "title", "Master Agreement Picker");
    $("#browseMasterAgreements").dialog("open");
}
function getcompanyprofile(obj) {
    $("#tblOPLegalEntities").empty();
    var control = "";
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/legalentities',
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        cache: false,
        async: false,
        success: function (data) {
            $("#tblOPLegalEntities").empty();
            LeagalEntity = data;
            var legalentityval = $("#CompanyProfile").find('option:selected').text();
            $(data).each(function (i, item) {
                if (item.LegalEntityName == obj) {
                    control += "<option value='" + item.LegalEntityName + "' selected='selected'>" + item.LegalEntityName + "</option>";
                } else {
                    control += "<option value='" + item.LegalEntityName + "'>" + item.LegalEntityName + "</option>";
                }


                var article = '<li>';
                if ($('#OriginatingParty').val() != "") {
                    if ($('#OriginatingParty').val() == item.LegalEntityName) {
                        article += '<input id="OP' + item.RowKey + '" type="radio" name="OriginatingParty" class="css-checkbox" checked value="' + item.LegalEntityName + '" />';
                    } else {
                        article += '<input id="OP' + item.RowKey + '" type="radio" name="OriginatingParty" class="css-checkbox" value="' + item.LegalEntityName + '" />';
                    }
                    article += '<label for="OP' + item.RowKey + '" class="css-label">' + item.LegalEntityName + '</label>';
                    article += '</li>';
                    $("#tblOPLegalEntities").append(article);
                }
                else if (typeof legalentityval != 'undefined' && legalentityval != '' && legalentityval != '--Select--') {
                    if ($("#CompanyProfile").find('option:selected').text() == item.LegalEntityName) {
                        article += '<input id="OP' + item.RowKey + '" type="radio" name="OriginatingParty" class="css-checkbox" checked value="' + item.LegalEntityName + '" />';
                    } else {
                        article += '<input id="OP' + item.RowKey + '" type="radio" name="OriginatingParty" class="css-checkbox" value="' + item.LegalEntityName + '" />';
                    }
                    article += '<label for="OP' + item.RowKey + '" class="css-label">' + item.LegalEntityName + '</label>';
                    article += '</li>';
                    $("#tblOPLegalEntities").append(article);
                }
                else {
                    if (thisLegalEntity == item.LegalEntityName) {
                        article += '<input id="OP' + item.RowKey + '" type="radio" name="OriginatingParty" class="css-checkbox" checked value="' + item.LegalEntityName + '" />';
                    } else {
                        article += '<input id="OP' + item.RowKey + '" type="radio" name="OriginatingParty" class="css-checkbox" value="' + item.LegalEntityName + '" />';
                    }
                    article += '<label for="OP' + item.RowKey + '" class="css-label">' + item.LegalEntityName + '</label>';
                    article += '</li>';
                    $("#tblOPLegalEntities").append(article);
                }
            });

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
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        cache: false,
        success: function (data) {
            $(data).each(function (i, item) {
                if (item.TypeName == obj) {
                    $("#ContractPricingType").append("<option value='" + item.TypeName + "' selected='selected'>" + item.TypeName + "</option>")
                } else {
                    $("#ContractPricingType").append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>")
                }
            });

        }
    });
}
function getbillingfrequency(obj) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/billingfrequency',
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        cache: false,
        success: function (data) {
            $(data).each(function (i, item) {
                if (item.TypeName == obj) {
                    $("#BillingFrequency").append("<option value='" + item.TypeName + "' selected='selected'>" + item.TypeName + "</option>")
                } else {
                    $("#BillingFrequency").append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>")
                }
            });

        }
    });
}
function getStatus(obj) {
    var control = "";
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contractstatusesbyCLM',
        type: 'GET',
        dataType: 'json',
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        cache: false,
        async: false,
        success: function (contractstatuses) {
            $(contractstatuses).each(function (i, item) {
                if (item.ContractStatus == obj) {
                    control += "<option value='" + item.ContractStatus + "' selected='selected'>" + item.ContractStatus + "</option>";
                } else {
                    control += "<option value='" + item.ContractStatus + "'>" + item.ContractStatus + "</option>";
                }

            });
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
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        cache: false,
        async: false,
        success: function (data) {
            $(data).each(function (i, item) {
                if (item.Abbreviation == obj) {
                    control += "<option value='" + item.Abbreviation + "' selected='selected'>" + item.Abbreviation + "</option>";
                } else {
                    control += "<option value='" + item.Abbreviation + "'>" + item.Abbreviation + "</option>";
                }
            });
        }
    });
    return control;
}
function changecontractclass(ddlvalue) {
    if (ddlvalue.value == "Sub-Contract") {
    } else {
        $('#trmaster').css('display', 'none');
        $('#txtMasterAgreement').val("");
        $('#txtRelatedContractID').val("");
    }
}
$('#chkCounterpartyNotInList').click(function () {
    if ($("#chkCounterpartyNotInList").is(':checked')) {
        //if ($("#txtCounterpartyName").val() != "") {
        //    if ($("#txtCounterpartyName").val().trim() != "") {
        //        $('.CP_Det').css('display', '');
        //        $('.CP_Det1').css('display', '');
        //        $("#ddlCounterpartyType").addClass('validelement');
        //        $("#txtEmailID").addClass('validemail');
        //        getCounterpartyFields();
        //    }
        //    else {
        //        swal("", "Enter counterparty name.");
        //        $("#chkCounterpartyNotInList").prop('checked', false);
        //        $("#txtCounterpartyName").val("");
        //        $("#txtCounterpartyName").focus();
        //    }
        //} else {
        //    swal("", "Enter counterparty name.");
        //    $("#chkCounterpartyNotInList").prop('checked', false);
        //    $("#txtCounterpartyName").val("");
        //    $("#txtCounterpartyName").focus();
        //}

        if ($("#counterpartyDynamicItems li").length == 0) {
            $('.CP_Det').css('display', '');
            $('.CP_Det1').css('display', '');
            $("#txtCounterpartyName").addClass('validelement');
            $("#ddlCounterpartyType").addClass('validelement');
            $("#txtEmailID").addClass('validemail');
            getCounterpartyFields();
        }
    } else {
        $('.CP_Det').remove();
        $('.CP_Det1').css('display', 'none');
        $("#ddlCounterpartyType").removeClass('validelement');
        $("#txtEmailID").removeClass('validemail');
    }
});

var vContractMetadataFields = [];
var vSelectedCounterPartyId = "";
function AddCounterparty() {   // ENH493 Customer inhancment
    var CPLI = "";
    currentSelectedCounterParty = [];
    if ($('input[type="radio"][name=PickCounterparty]:checked').val() == 'Existing') {
        //manoj
        var arrselectedcunterparty = [];
        $.each($('#liSelectedCounterParty').children(), function () {
            if (typeof ($.trim(this)) != 'undefined' && $.trim(this) != null && $.trim(this.textContent) != "") {
                if (arrselectedcunterparty.indexOf($.trim(this.textContent)) == -1)
                    arrselectedcunterparty.push($.trim(this.textContent));
            }
        });
        if (arrselectedcunterparty.length > 0) {

            //for (var j = 0; j < arrselectedcunterparty.length; j++) {
            //    CPLI += '<li id=' + escape(arrselectedcunterparty[j]) + ' style="margin: 0 0 5px 0;"><div style="display: inline-block;">' +'<a>' + arrselectedcunterparty[j].trim()+'</a>' + '</div><div style="display: inline-block;padding-left: 10px;"><a href="javascript:void(0)" class="linkText" onclick="ViewCounterpartyDetails(\'' + escape(arrselectedcunterparty[j]) + '\')"> View Details</a></div>' + '  <a href=javascript:void(0)  >' + '<img src="/Content/Images/icon/delete.png" onclick="removeCounterParty(' + '\'' + arrselectedcunterparty[j] + '\'' + ')" title="Remove">' + '<a>' + '</li>';
            //}

            //Bug id :eO37627
            $(arrselectedcunterparty).each(function (i, arritem) {
                var itemCounterparty = arritem.replace(/\s+/g, '');//Remove white spaces from string
                if (AllCounterparties.length > 0) {
                    var vCounterparty = $.grep(AllCounterparties, function (n, i) {
                        return (n.CounterpartyName.replace(/\s+/g, '').toLowerCase() == itemCounterparty.toLowerCase());
                    });
                }
                if (vCounterparty != null && vCounterparty != "" && vCounterparty.length > 0)
                    CPLI += '<li id="' + escape(itemCounterparty) + '"  class="clsCounterparties" style="margin: 0 0 5px 0;"><div style="display: inline-block;">' + '<a>' + arritem + '</a>' + '</div><div style="display: inline-block;padding-left: 10px;"><a href="javascript:void(0)" class="linkText" onclick="ViewCounterpartyDetails(\'' + itemCounterparty + '\')"> View Details</a></div>' + '  <a href=javascript:void(0)  >' + '<img src="/Content/Images/icon/delete.png" onclick="removeCounterParty(this)" title="Remove">' + '<a>' + '</li>';
                else
                    CPLI += '<li id="' + escape(itemCounterparty) + '" class="clsCounterparties" style="margin: 0 0 5px 0;"><div style="display: inline-block;">' + '<a style="color: #6a6a6a !important;">' + arritem + '</a>' + '</div><div style="display: inline-block;padding-left: 10px;"><a href="javascript:void(0)" class="linkText" onclick="ViewCounterpartyDetails(\'' + itemCounterparty + '\')"> View Details</a></div>' + '  <a href=javascript:void(0)  >' + '<img src="/Content/Images/icon/delete.png" onclick="removeCounterParty(this)" title="Remove">' + '<a>' + '</li>';

            });

            if (strSelCounterPartyField != "") {
                $("#" + strSelCounterPartyField + "").val(arrselectedcunterparty.join("; "));
                if (strSelCounterPartyField == "Counterparty") {
                    $("#counterpartyUL li").remove();
                    $("#counterpartyUL").append(CPLI);                   
                }

            }
            else {
                $("#Counterparty").val(arrselectedcunterparty.join("; "));
                if (strSelCounterPartyField == "Counterparty") {
                    $("#counterpartyUL li").remove();
                    $("#counterpartyUL").append(CPLI);
                }
            }
        }
        else {
            if (strSelCounterPartyField != "") {
                $("#" + strSelCounterPartyField + "").val('');
                if ($("#counterpartyUL >li").length > 0)
                    $("#counterpartyUL li").remove();
            }
            else {
                $("#Counterparty").val('');
                if ($("#counterpartyUL >li").length > 0)
                    $("#counterpartyUL li").remove();
            }
        }
        arrselectedcunterparty = [];

        //manoj
        $('#liSelectedCounterParty').empty();
        $("#browseCounterparty").dialog("close");
        ClearAddCounterparty();
        $('#chkCounterpartyNotInList').prop('checked', false);

        $('#dvCPExistingCounterparty').css("display", "");
        $('#dvCPAddCounterparty').css("display", "none");

        $('#rdCPAddCounterparty').prop('checked', false);
        $('#rdCPExistingCounterparty').prop('checked', true);

        $('.CP_Det').remove();
        $('.CP_Det1').css('display', 'none');
        $("#ddlCounterpartyType").removeClass('validelement');
        $("#txtEmailID").removeClass('validemail');
        $("#Counterparty").css("display", "none");
    }
    else {
        if (requiredValidator('addNewEntityFields', false)) {
            isformvalid = true;
            var entityid = $("#txtCounterpartyID").val();
            var AddressLine1 = $("#txtAddressLine1").val();

            if (AddressLine1 == null || AddressLine1 == '') {
                AddressLine1 = '';
            }

            if ($("#chkCounterpartyNotInList").is(':checked')) {
                $("#loadingPage").fadeIn();
                var strBusinessAreaOwnerof = "";
                if ($('input[type="radio"][name=IsGlobal]:checked').val() == "No") {
                    if ($("#txtOwnerofBusinessArea").val() != "") {
                        if ($("#txtOwnerofBusinessArea").val() != "") {
                            for (var i = 0; i < selectedBusinessAreaID11.length; i++) {

                                var rowKPath = jQuery.grep(BusinessAreaPathRowKey, function (a) {
                                    return a[1] === selectedBusinessAreaID11[i][1];
                                });
                                if (rowKPath != null && typeof (rowKPath) != "undefined" && rowKPath.length != 0)
                                    strBusinessAreaOwnerof += rowKPath[0][0] + "; ";
                            }

                            strBusinessAreaOwnerof = strBusinessAreaOwnerof.slice(0, -1)
                        }
                    } else {

                        strBusinessAreaOwnerof = "";
                    }
                }
                else {
                    $("#txtOwnerofBusinessArea").val('');
                    strBusinessAreaOwnerof = "";
                }
                var vTitle = $("#txtCounterpartyName").val();
                var counterpartyForm = $("#counterpartyForm *").serialize();
                counterpartyForm += "&AccountID=" + localStorage.AccountID;
                counterpartyForm += "&CreatedBy=" + localStorage.UserName;
                counterpartyForm += "&ModifiedBy=" + localStorage.UserName;
                counterpartyForm += "&BusinessAreasPath=" + encodeURIComponent(strBusinessAreaOwnerof);
                var cpresult = "&";
                $("#counterpartyForm .fielddatecontrol").each(function (index) {
                    if ($(this).attr('class').toLowerCase().indexOf("hasdatepicker") >= 0) {

                        var name = $(this).prop('class');
                        name = name.split("hasDatepicker")[0];
                        name = name.slice(0, -1);

                        name = name.substr(name.lastIndexOf(' ') + 1);
                        var value = $.datepicker.formatDate('mm/dd/yy', $(this).datepicker('getDate'));
                        cpresult = cpresult + name + "=" + value + "&";
                    }
                    else {
                        var name = $(this).attr('class').substr($(this).attr('class').lastIndexOf(' ') + 1);
                        var value = $.datepicker.formatDate('mm/dd/yy', $(this).datepicker('getDate'));
                        cpresult = cpresult + name + "=" + value + "&";
                    }
                });
                cpresult = cpresult.slice(0, -1)
                counterpartyForm += cpresult;
                cpresult = "&";
                $("#counterpartyForm .fieldphonecontrol").each(function (index) {
                    if ($(this).val() != null && $(this).val() != "") {
                        var name = $(this)[0].id.split('_')[0];
                        var value = $(this).intlTelInput("getSelectedCountryData").iso2 + "," + $(this).intlTelInput("getSelectedCountryData").dialCode + "," + $(this).intlTelInput("getNumber", intlTelInputUtils.numberFormat.INTERNATIONAL);
                        cpresult = cpresult + name + "=" + value + "&";
                    }
                    else {
                        var name = $(this)[0].id.split('_')[0];
                        var value = "";
                        cpresult = cpresult + name + "=" + value + "&";
                    }
                });
                cpresult = cpresult.slice(0, -1)
                counterpartyForm += cpresult;

                var formData = new FormData();
                formData.append("AccountID", localStorage.AccountID);
                formData.append("SearializeControls", counterpartyForm);
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/dynamicform',
                    type: 'POST',
                    dataType: 'json',
                    headers: {
                        'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging
                    },
                    data: formData,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (data) {
                        if (!$.isEmptyObject(arrRelatedCounterparities)) {
                            CreateRelatedCounterparies(data, $("#txtCounterpartyName").val())
                        }
                        var common = [];
                        if (vCounterpartyFields.length > 0 && vContractMetadataFields.length > 0) {
                            common = $.grep(vContractMetadataFields, function (element) {
                                return $.inArray(element, vCounterpartyFields) !== -1;
                            });

                            if (common.length > 0 && common != "") {
                                $.ajax({
                                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/icounterpartydetails?counterpartyid=' + data,
                                    type: 'GET',
                                    dataType: 'json',
                                    headers: {
                                        'eContracts-ApiKey': localStorage.APIKey
                                    },
                                    cache: false,
                                    success: function (mainmetadataFields) {
                                        var vCPMetadata = $(mainmetadataFields).find('Metadata');
                                        $.each(common, function (i, l) {
                                            if (common[i] != "Description") {
                                                $('#' + common[i] + '').val($(vCPMetadata).find(common[i]).text());
                                            }
                                        });

                                        if (strSelCounterPartyField != "") {
                                            if ($('#' + strSelCounterPartyField + '').val() != "") {
                                                var CPValue = $('#' + strSelCounterPartyField + '').val() + "; " + $("#txtCounterpartyName").val();
                                                $('#' + strSelCounterPartyField + '').val(CPValue);
                                            }
                                            else {
                                                $('#' + strSelCounterPartyField + '').val($("#txtCounterpartyName").val());
                                            }
                                        }
                                        else {
                                            if ($('#Counterparty').val() != "") {
                                                var CPValue = $('#Counterparty').val() + "; " + $("#txtCounterpartyName").val();
                                                $('#Counterparty').val(CPValue);
                                            }
                                            else {
                                                $('#Counterparty').val($("#txtCounterpartyName").val());
                                            }
                                        }
                                        if (strSelCounterPartyField == "Counterparty") {
                                            var listr = '<li id="' + escape($("#txtCounterpartyName").val()) + '" class="clsCounterparties" style="margin: 0 0 5px 0;"><div style="display: inline-block;">' + '<a>' + $("#txtCounterpartyName").val() + '</a>' + '</div><div style="display: inline-block;padding-left: 10px;"><a href="javascript:void(0)" class="linkText" onclick="ViewCounterpartyDetails(\'' + $("#txtCounterpartyName").val() + '\')"> View Details</a></div>' + '  <a href=javascript:void(0)  >' + '<img src="/Content/Images/icon/delete.png" onclick="removeCounterParty(this)" title="Remove">' + '<a>' + '</li>';
                                            $("#counterpartyUL").append(listr);
                                        }




                                        $('#liSelectedCounterParty').empty();
                                        $("#browseCounterparty").dialog("close");
                                        ClearAddCounterparty();
                                        $('#chkCounterpartyNotInList').prop('checked', false);

                                        $('#dvCPExistingCounterparty').css("display", "");
                                        $('#dvCPAddCounterparty').css("display", "none");
                                        $('#rdCPAddCounterparty').prop('checked', false);
                                        $('#rdCPExistingCounterparty').prop('checked', true);

                                        $('.CP_Det').remove();
                                        $('.CP_Det1').css('display', 'none');
                                        $("#ddlCounterpartyType").removeClass('validelement');
                                        $("#txtEmailID").removeClass('validemail');
                                        getActiveCounterparties();


                                        $("#loadingPage").fadeOut();

                                    }, error: function (mainmetadataFields) {
                                        if (strSelCounterPartyField != "") {
                                            if ($('#' + strSelCounterPartyField + '').val() != "") {
                                                var CPValue = $('#' + strSelCounterPartyField + '').val() + "; " + $("#txtCounterpartyName").val();
                                                $('#' + strSelCounterPartyField + '').val(CPValue);
                                            }
                                            else {
                                                $('#' + strSelCounterPartyField + '').val($("#txtCounterpartyName").val());
                                            }
                                        }
                                        else {
                                            if ($('#Counterparty').val() != "") {
                                                var CPValue = $('#Counterparty').val() + "; " + $("#txtCounterpartyName").val();
                                                $('#Counterparty').val(CPValue);
                                            }
                                            else {
                                                $('#Counterparty').val($("#txtCounterpartyName").val());
                                            }
                                        }
                                        if (strSelCounterPartyField == "Counterparty") {
                                            var listr = '<li id="' + escape($("#txtCounterpartyName").val()) + '" class="clsCounterparties" style="margin: 0 0 5px 0;"><div style="display: inline-block;">' + '<a>' + $("#txtCounterpartyName").val() + '</a>' + '</div><div style="display: inline-block;padding-left: 10px;"><a href="javascript:void(0)" class="linkText" onclick="ViewCounterpartyDetails(\'' + $("#txtCounterpartyName").val().trim() + '\')"> View Details</a></div>' + '  <a href=javascript:void(0)  >' + '<img src="/Content/Images/icon/delete.png" onclick="removeCounterParty(this)" title="Remove">' + '<a>' + '</li>';
                                            $("#counterpartyUL").append(listr);
                                        }


                                        $('#liSelectedCounterParty').empty();
                                        $("#browseCounterparty").dialog("close");
                                        ClearAddCounterparty();
                                        $('#chkCounterpartyNotInList').prop('checked', false);

                                        $('#dvCPExistingCounterparty').css("display", "");
                                        $('#dvCPAddCounterparty').css("display", "none");
                                        $('#rdCPAddCounterparty').prop('checked', false);
                                        $('#rdCPExistingCounterparty').prop('checked', true);

                                        $('.CP_Det').remove();
                                        $('.CP_Det1').css('display', 'none');
                                        $("#ddlCounterpartyType").removeClass('validelement');
                                        $("#txtEmailID").removeClass('validemail');
                                        getActiveCounterparties();


                                        $("#loadingPage").fadeOut();
                                    }
                                });
                            }
                            else {
                                if (strSelCounterPartyField != "") {
                                    if ($('#' + strSelCounterPartyField + '').val() != "") {
                                        var CPValue = $('#' + strSelCounterPartyField + '').val() + "; " + $("#txtCounterpartyName").val();
                                        $('#' + strSelCounterPartyField + '').val(CPValue);
                                    }
                                    else {
                                        $('#' + strSelCounterPartyField + '').val($("#txtCounterpartyName").val());
                                    }
                                }
                                else {
                                    if ($('#Counterparty').val() != "") {
                                        var CPValue = $('#Counterparty').val() + "; " + $("#txtCounterpartyName").val();
                                        $('#Counterparty').val(CPValue);
                                    }
                                    else {
                                        $('#Counterparty').val($("#txtCounterpartyName").val());
                                    }
                                }
                                if (strSelCounterPartyField == "Counterparty") {
                                    var listr = '<li id="' + escape($("#txtCounterpartyName").val()) + '" class="clsCounterparties" style="margin: 0 0 5px 0;"><div style="display: inline-block;">' + '<a>' + $("#txtCounterpartyName").val() + '</a>' + '</div><div style="display: inline-block;padding-left: 10px;"><a href="javascript:void(0)" class="linkText" onclick="ViewCounterpartyDetails(\'' + $("#txtCounterpartyName").val() + '\')"> View Details</a></div>' + '  <a href=javascript:void(0)  >' + '<img src="/Content/Images/icon/delete.png" onclick="removeCounterParty(this)" title="Remove">' + '<a>' + '</li>';
                                    $("#counterpartyUL").append(listr);
                                }


                                $('#liSelectedCounterParty').empty();
                                $("#browseCounterparty").dialog("close");
                                ClearAddCounterparty();
                                $('#chkCounterpartyNotInList').prop('checked', false);

                                $('#dvCPExistingCounterparty').css("display", "");
                                $('#dvCPAddCounterparty').css("display", "none");
                                $('#rdCPAddCounterparty').prop('checked', false);
                                $('#rdCPExistingCounterparty').prop('checked', true);

                                $('.CP_Det').remove();
                                $('.CP_Det1').css('display', 'none');
                                $("#ddlCounterpartyType").removeClass('validelement');
                                $("#txtEmailID").removeClass('validemail');
                                getActiveCounterparties();


                                $("#loadingPage").fadeOut();
                            }
                        }
                        else {
                            if (strSelCounterPartyField != "") {
                                if ($('#' + strSelCounterPartyField + '').val() != "") {
                                    var CPValue = $('#' + strSelCounterPartyField + '').val() + "; " + $("#txtCounterpartyName").val();
                                    $('#' + strSelCounterPartyField + '').val(CPValue);
                                }
                                else {
                                    $('#' + strSelCounterPartyField + '').val($("#txtCounterpartyName").val());
                                }
                            }
                            else {
                                if ($('#Counterparty').val() != "") {
                                    var CPValue = $('#Counterparty').val() + "; " + $("#txtCounterpartyName").val();
                                    $('#Counterparty').val(CPValue);
                                }
                                else {
                                    $('#Counterparty').val($("#txtCounterpartyName").val());
                                }
                            }
                            if (strSelCounterPartyField == "Counterparty") {
                                var listr = '<li id="' + escape($("#txtCounterpartyName").val()) + '" class="clsCounterparties" style="margin: 0 0 5px 0;"><div style="display: inline-block;">' + '<a>' + $("#txtCounterpartyName").val() + '</a>' + '</div><div style="display: inline-block;padding-left: 10px;"><a href="javascript:void(0)" class="linkText" onclick="ViewCounterpartyDetails(\'' + $("#txtCounterpartyName").val() + '\')"> View Details</a></div>' + '  <a href=javascript:void(0)  >' + '<img src="/Content/Images/icon/delete.png" onclick="removeCounterParty(this)" title="Remove">' + '<a>' + '</li>';
                                $("#counterpartyUL").append(listr);
                            }

                            $('#liSelectedCounterParty').empty();
                            $("#browseCounterparty").dialog("close");
                            ClearAddCounterparty();
                            $('#chkCounterpartyNotInList').prop('checked', false);

                            $('#dvCPExistingCounterparty').css("display", "");
                            $('#dvCPAddCounterparty').css("display", "none");
                            $('#rdCPAddCounterparty').prop('checked', false);
                            $('#rdCPExistingCounterparty').prop('checked', true);

                            $('.CP_Det').remove();
                            $('.CP_Det1').css('display', 'none');
                            $("#ddlCounterpartyType").removeClass('validelement');
                            $("#txtEmailID").removeClass('validemail');
                            getActiveCounterparties();

                            $("#loadingPage").fadeOut();
                        }


                    },
                    error: function (person) {
                        swal("", "Counterparty Name Exist");
                        $("#loadingPage").fadeOut();
                    }
                });

            }
            else {
                var duplicatecounteparty = false;
                if (strSelCounterPartyField != "") {
                    if ($('#' + strSelCounterPartyField + '').val() != "") {
                        var arrselectedcounterpaty = ";" + $('#' + strSelCounterPartyField + '').val().replace(/; /g, ";") + ";"
                        if (arrselectedcounterpaty.toLowerCase().indexOf(";" + $("#txtCounterpartyName").val().toLowerCase() + ";") > -1) {
                            duplicatecounteparty = true;
                        }
                    }
                }
                else {
                    if ($('#Counterparty').val() != "") {
                        var arrselectedcounterpaty = ";" + $('#Counterparty').val().replace(/; /g, ";") + ";"
                        if (arrselectedcounterpaty.toLowerCase().indexOf(";" + $("#txtCounterpartyName").val().toLowerCase() + ";") > -1) {
                            duplicatecounteparty = true;
                        }
                    }
                }
                if (!duplicatecounteparty) {
                    $('#dvCPExistingCounterparty').css("display", "");
                    $('#dvCPAddCounterparty').css("display", "none");
                    $('#rdCPAddCounterparty').prop('checked', false);
                    $('#rdCPExistingCounterparty').prop('checked', true);
                    if (strSelCounterPartyField != "") {
                        if ($('#' + strSelCounterPartyField + '').val() != "") {
                            var CPValue = $('#' + strSelCounterPartyField + '').val() + "; " + $("#txtCounterpartyName").val();
                            $('#' + strSelCounterPartyField + '').val(CPValue);
                        }
                        else {
                            $('#' + strSelCounterPartyField + '').val($("#txtCounterpartyName").val());
                        }
                    }
                    else {
                        if ($('#Counterparty').val() != "") {
                            var CPValue = $('#Counterparty').val() + "; " + $("#txtCounterpartyName").val();
                            $('#Counterparty').val(CPValue);
                        }
                        else {
                            $('#Counterparty').val($("#txtCounterpartyName").val());
                        }
                    }
                    if (strSelCounterPartyField == "Counterparty") {
                        var listr = '<li id="' + escape($("#txtCounterpartyName").val()) + '" class="clsCounterparties" style="margin: 0 0 5px 0;"><div style="display: inline-block;">' + $("#txtCounterpartyName").val() + '</div><div style="display: inline-block;padding-left: 10px;"><a href="javascript:void(0)" class="linkText" onclick="ViewCounterpartyDetails(\'' + $("#txtCounterpartyName").val() + '\')"> View Details</a></div>' + '  <a href=javascript:void(0)  >' + '<img src="/Content/Images/icon/delete.png" onclick="removeCounterParty(this)" title="Remove">' + '<a>' + '</li>';
                        $("#counterpartyUL").append(listr);
                    }


                    $('#liSelectedCounterParty').empty();
                    $("#browseCounterparty").dialog("close");
                    ClearAddCounterparty();
                    $('#chkCounterpartyNotInList').prop('checked', false);

                    $('#dvCPExistingCounterparty').css("display", "");
                    $('#dvCPAddCounterparty').css("display", "none");
                    $('#rdCPAddCounterparty').prop('checked', false);
                    $('#rdCPExistingCounterparty').prop('checked', true);

                    $('.CP_Det').remove();
                    $('.CP_Det1').css('display', 'none');
                    $("#ddlCounterpartyType").removeClass('validelement');
                    $("#txtEmailID").removeClass('validemail');
                } else {
                    swal("", "Counterparty Name Exist");
                }
            }
        }
    }
}

function AddLE() {
    var arrselectedLE = [];
    $.each($('#liSelectedLegalEntity').children(), function () {
        if (typeof ($.trim(this)) != 'undefined' && $.trim(this) != null && $.trim(this.textContent) != "") {
            if (arrselectedLE.indexOf($.trim(this.textContent)) == -1)
                arrselectedLE.push($.trim(this.textContent));
        }
    });
    if (arrselectedLE.length > 0) {
        //manoj
        PreviousLegalEntity = $("#CompanyProfile").val();
        //manoj
        $("#CompanyProfile").val(arrselectedLE.join("; "));
        Removetextvalues();
    } else {
        $("#CompanyProfile").val('');
    }
    arrselectedLE = [];
    $("#browseLegalEntity").dialog("close");
    // ClearAddCounterparty();
    //  $('#chkCounterpartyNotInList').prop('checked', false);

    $('#dvCPExistingLegalEntity').css("display", "");
}
function ClearAddCounterparty() {
    $("#txtSearchBox").val("");
    $("#txtCounterpartyID").val("");
    $("#txtCounterpartyName").val("");
    $('#ddlCounterpartyType').val('0');
    $("#txtAddressLine1").val("");
    $("#txtAddressLine2").val("");
    $("#txtCity").val("");
    $("#txtState").val("");
    $("#txtZip").val("");
    $('#ddlCountry').val('0');
    $("#txtContactNo").val("");
    $("#txtOwnerofBusinessArea").val('');
    $('input[type="radio"][name=IsGlobal][value="Yes"]').prop('checked', true);
    $("#trcp-RgBusi").hide();
    $("#txtOwnerofBusinessArea").removeClass("validelement");
    $("#txtEmailID").val("");
    $("#ddlStatus").val("Active");
    $("#chkCounterpartyNotInList").attr("checked", false);
    $('.CP_Det').css('display', 'none');
    $('.CP_Det1').css('display', 'none');
    $("#ddlCounterpartyType").removeClass('validelement');
    $("#txtEmailID").removeClass('validemail');
    $(".validelement").each(function (index, element) {
        $(element).removeClass("error");
        $("#errormsg_" + element.id).remove();
    });
    //eO310726
    $('#tblCounterpartiesAlphabet span').removeClass('active');
    $($('#tblCounterpartiesAlphabet span')[0]).addClass('active');
}
function SaveCounterparty() {
    var isformvalid = false;
    if (requiredValidator('addNewEntityFields', false)) {
        isformvalid = true;
        var entityid = $("#txtCounterpartyID").val();
        var AddressLine1 = $("#txtAddressLine1").val();

        if (AddressLine1 == null || AddressLine1 == '') {
            AddressLine1 = '';
        }
        if (entityid != '') {
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty?counterpartyid=' + entityid,
                type: 'PUT',
                dataType: 'json',
                headers: {
                    'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging
                },
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
                    ModifiedBy: localStorage.UserName
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
                headers: {
                    'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging
                },
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
                    ModifiedBy: localStorage.UserName
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
    }
    return isformvalid;
}
function CounterpartyPopup() {
    $("#txtCounterpartyID").val("");
    $("#txtCounterpartyName").val("");
    $('#ddlCounterpartyType').val('0');
    $("#txtOwnerofBusinessArea").val('');
    if (thisBusinessAreaNameC == "") {
        $('input[type="radio"][name=IsGlobal][value="Yes"]').prop('checked', true);
        $("#trcp-RgBusi").hide();
        $("#txtOwnerofBusinessArea").removeClass("validelement");
        addDefaultBusinessareaCounterparty();
    }
    else {

        $('input[type="radio"][name=IsGlobal][value="No"]').prop('checked', true);
        $("#trcp-RgBusi").show();
        $("#txtOwnerofBusinessArea").addClass("validelement");
        addDefaultBusinessareaCounterpartyInBA();
    }
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
function BindCountry() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/countrynames',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        success: function (data) {
            $(data).each(function (i, item) {
                $("#ddlCountry").append('<option value="' + item + '">' + item + '</option>');
                $("#ddlCountryC").append('<option value="' + item + '">' + item + '</option>');
            });
        },
        error:
            function (data) {
            }
    });
}
function BindCounterpartyType() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterpartytypes',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        success: function (data) {
            $(data).each(function (i, item) {
                //var find = " ";
                //var re = new RegExp(find, 'g');
                //var str = item.TypeName.replace(re, '');
                $("#ddlCounterpartyType").append('<option value="' + item.TypeName + '">' + item.TypeName + '</option>');
                $("#filterType").append('<option value="' + item.TypeName + '">' + item.TypeName + '</option>');

            });
        },
        error:
            function (data) {
            }
    });
}
function ClearProjectSearch() {
    $('#txtSearchBoxProjects').val('');
    $('input:checkbox[name=Project]').attr('checked', false);
    $("#Project").val("");
    projectManager = "";
    SearchProjects();
}
function SearchProjects() {
    $("#tblProjects").html('');
    $('#loadPro').html('<img src="../Content/Images/icon/loading.gif"> Searching...');
    var vURL = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/project?searchkeyword=' + encodeURIComponent($("#txtSearchBoxProjects").val()) + '&customquery=&sortbyfield=ProjectName&orderby=ASC';
    $.ajax({
        url: vURL,
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        cache: false,
        success: function (data) {
            $('#loadPro').empty();
            arr = [];
            $.each($('#Project').val().split(";"), function () {
                arr.push($.trim(this));
            });
            var datalength = data.length;
            var article = '';
            for (var i = 0; i < datalength; i++) {
                var item = data[i];
                if (i == 0) {
                    article += '<tr><th>Project Name</th></tr>';
                }
                article += '<tr><td>';
                if (arr.indexOf(item.ProjectName) >= 0) {
                    article += '<input id="Pro' + item.RowKey + '" type="checkbox" name="Project" class="css1-checkbox" checked value="' + item.ProjectName + '" />';
                } else {
                    article += '<input id="Pro' + item.RowKey + '" type="checkbox" name="Project" class="css1-checkbox" value="' + item.ProjectName + '" />';
                }

                article += '<label for="Pro' + item.RowKey + '" class="css1-label"><a href="javascript:ViewProject(\'' + escape(item.ProjectName) + '\')">' + item.ProjectName + '</a></label>';   //ENH487 Customer inhanc
                article += '<input type="text" name="ProjectManager" style="display: none;" value="' + item.ProjectManager + '" />';
                article += '</td></tr>';
            }
            $("#tblProjects").html(article);
            article = '';
            var vCount = $("#tblProjects tr").length;
            if (vCount != 0) {
                $('#loadPro').html('');
                $('#compact-paginationProjects').css('display', '');
                $('#compact-paginationProjects').pagination({
                    items: vCount,
                    itemsOnPage: 10,
                    currentPage: 1,
                    cssStyle: 'compact-theme',
                    type: 'tdbody',
                    row: 'tr',
                    typeID: 'tblProjects'
                });
            } else {
                $('#loadPro').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>')
                $('#compact-paginationProjects').css('display', 'none');
            }
        },
        error: function () {
            $('#compact-paginationProjects').css('display', 'none');
            $('#loadPro').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>')
        }
    });

}
function SearchCounterparty() {
    $("#tblCounterparties").empty();
    $("#liSelectedCounterParty").empty();
    // multipleChecksDocumentID = [];
    $('#loadGenCounterParty').html('<img src="../Content/Images/icon/loading.gif">');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/counterpartypicker?searchkeyword=' + encodeURIComponent($("#txtSearchBox").val()) + '&customquery=&sortbyfield=CounterpartyName&orderby=ASC',
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        cache: false,
        success: function (data) {
            //CounterPartyArrayprev = [];
            //$.each($('#Counterparty').val().split(";"), function () {
            //  //  CounterPartyArrayprev.push($.trim(this));
            //    if (multipleChecksDocumentID.indexOf($.trim(this)) == -1)
            //        multipleChecksDocumentID.push($.trim(this));
            //});
            //$.each($(multipleChecksDocumentID), function () {
            //    CounterPartyArrayprev.push($.trim(this));

            //});
            myCounterPartyArray = [];
            var obj1 = {
            };
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
                                    if (this != null && this.toString() != "") {
                                        var contBusi = this.split('>');
                                        if (typeof (contBusi) != "undefined") {
                                            if (contBusi.length > 0) {
                                                contractarea = contBusi[0].trim();
                                                Businesssarea = contBusi[contBusi.length - 1].trim();
                                                if (thisBusinessAreaNameC == Businesssarea && thisContractAreaNameC == contractarea)
                                                    myCounterPartyArray.push(data[i]);
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
            var resultfound = true;
            var myArraylength = myCounterPartyArray.length;
            CreateCounterPartyListUnit(0);
            $('#loadGenCounterParty').html('');
            var vCount = myArraylength;
            var columncounterparty = [];
            for (var ci = 0; ci < myCounterPartyArray.length; ci++) {
                columncounterparty.push(myCounterPartyArray[ci].CounterpartyName);
            }
            $("#txtSearchBox").autocomplete({
                source: columncounterparty,
                minLength: 1,
                focus: function (event, ui) {
                    return false;
                },
                select: function (evn, uidetails) {
                    $("#txtSearchBox").val(uidetails.item.label);
                    SearchCounterparty();
                }
            });
            $('#compact-paginationCounterparties').pagination({
                items: vCount,
                itemsOnPage: 10,
                typeID: 'tblCounterparties',
                cssStyle: 'compact-theme',
                listname: 'CounterPartyListUnit'
            });
            $("#loadingPage").fadeOut();
            $("#browseCounterparty").dialog("option", "title", "Counterparty Picker");
            $("#browseCounterparty").dialog("open");
        },
        error:
            function (data) {
                $("#tblCounterparties").html('No item found.');
            }
    });

    $('#txtSearchBox').keypress(function (e) {
        if ($('#txtSearchBox').val() != "") {
            if (e.keyCode == 13) {
                $(".ui-autocomplete").css('display', 'none');
                SearchCounterparty();
            }
        }
    });
}
function liRemoveSelected(obj) {

    var child = obj.parentNode;
    if (chkspan.indexOf(child.firstChild.nodeValue + ";") != -1) {
        chkspan = chkspan.replace(child.firstChild.nodeValue + ";", "");
    }
    if (chkspan.indexOf(child.firstChild.nodeValue) != -1) {
        chkspan = chkspan.replace(child.firstChild.nodeValue, "");
    }
    var i = selecteditems14.indexOf(child.firstChild.nodeValue);
    if (i != -1) {
        selecteditems14.splice(i, 1);
    }
    child.parentNode.removeChild(child);
    $('#txtBA').val(selecteditems14);
}
function BindBusinessArea() {
    $("#loadingPage").fadeIn();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/entities',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        success: function (data) {
            if (BusinessAreaAccessID.length == 0) {
                getbusinessareapath1Optimized();//Performance Optimization
            }
            recursiveIteration12(data)
            //getbusinessareapath();

            //recursiveIteration14edit(data)
            // $("#tbodyBusinessAreaEdit").append(article14);
            $("#tbodyBusinessAreaEdit").append(article1);
            //article14 = "";
            article1 = "";
            $("#example-basic-15").treetable({ expandable: true, initialState: "expanded" });

            $("#loadingPage").fadeOut();
            $("#browseBA").dialog("option", "title", "Browse Business Area");
            $("#browseBA").dialog("open");
            $("#browseBA").height("auto");
        },
        error:
            function (data) {
                $("#loadingPage").fadeOut();
            }
    });
}
var strContractAreaID = '';
function recursiveIteration12(object) {
    if (object.ChildrenData.length != 0) {
        BindRecBAOther('', object);
    }
}

function BindRecBAOther(path, object) {
    for (var i = 0; i < object.ChildrenData.length; i++) {
        var item = object.ChildrenData[i];
        var additional = "";
        var spath = '';
        if (path == '')
            spath = item.BusinessAreaName;
        else
            spath = path + ' > ' + item.BusinessAreaName;
        var found = $.grep(BusinessAreaAccess, function (n, ind) {
            if (spath.indexOf('>') >= 0) { //eO310661
                return (n.indexOf(spath) == 0);
            }
            else {
                return (n.split('>')[0].toLowerCase().trim() == spath.toLowerCase());
            }
        });
        if (found.length > 0 || localStorage.UserType.indexOf("Global Contract Owner") >= 0 || item.RowKey == "GenCA" || item.RowKey == "GenBA") {
            var j = BusinessAreaAccessID.indexOf(item.RowKey);
            if (j > -1 || item.Owner.trim().split(';').indexOf(localStorage.UserName.trim()) > -1) {
                if (item.ParentBusinessAreaID != 0) {
                    if (item.Owner.trim().split(';').indexOf(localStorage.UserName.trim()) > -1) {//if business owner
                        if (arrCALicenseLimit.indexOf(item.BusinessAreaName) > -1) {
                            additional = '<span>' + item.BusinessAreaName + '</span>';
                        }
                        else {
                            additional = '<span style="color:#3487ce; cursor:pointer;" onclick="javascript:treeviewclick2edit(this)">' + item.BusinessAreaName + '</span>&nbsp; <img src="/Content/Images/icon/profile.png" style="cursor:default;" />'
                        }
                    } else { //if permission in business area
                        if (arrCALicenseLimit.indexOf(item.BusinessAreaName) > -1) {
                            additional = '<span>' + item.BusinessAreaName + '</span>';
                        }
                        else {
                            additional = '<span style="color:#3487ce; cursor:pointer;" onclick="javascript:treeviewclick2edit(this)">' + item.BusinessAreaName + '</span>'
                        }
                    }
                } else {
                    additional = '<span>' + item.BusinessAreaName + '</span>';
                }

            } else {
                if (item.ParentBusinessAreaID != 0) {
                    if (strContractAreaID == "GenCA") {
                        if (arrCALicenseLimit.indexOf(item.BusinessAreaName) > -1) {
                            additional = '<span>' + item.BusinessAreaName + '</span>';
                        }
                        else {
                            additional = '<span style="color:#3487ce; cursor:pointer;" onclick="javascript:treeviewclick2edit(this)">' + item.BusinessAreaName + '</span>'
                        }
                    } else {
                        if (localStorage.UserType.indexOf("Global Contract Owner") >= 0) {
                            if (arrCALicenseLimit.indexOf(item.BusinessAreaName) > -1) {
                                additional = '<span>' + item.BusinessAreaName + '</span>';
                            }
                            else {
                                additional = '<span style="color:#3487ce; cursor:pointer;" onclick="javascript:treeviewclick2edit(this)">' + item.BusinessAreaName + '</span>'
                            }
                        } else {
                            additional = '<span>' + item.BusinessAreaName + '</span><span style="font-size:12px;font-style:italic;">(Request Access)</span>';
                        }
                    }
                } else {
                    additional = '<span>' + item.BusinessAreaName + '</span>';
                }
            }

            if (item.ParentBusinessAreaID == 0) {
                strContractAreaName12 = item.BusinessAreaName;
                strContractAreaID = item.RowKey;
                strContractAreaName12Owner = item.Owner;
                article1 += '<tr data-tt-id="tre-' + item.RowKey + '" class="branch expanded">';
                article1 += '<td class="treeHead"><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaName12 + '</span><span id="ContractAreaAdmin" style="display:none;">' + strContractAreaName12Owner + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/globset.png" /><small>' + additional + '</small></td></tr>';
            } else {
                article1 += '<tr data-tt-id="tre-' + item.RowKey + '" data-tt-parent-id="tre-' + item.ParentBusinessAreaID + '" class="branch collapsed" style="display: table-row;">';
                if (previousidcreate == item.ParentBusinessAreaID) {
                    //find if child business area exists
                    if (object.ChildrenData.length == 0) {
                        article1 += '<td><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaName12 + '</span><span id="ContractAreaAdmin" style="display:none;">' + strContractAreaName12Owner + '</span><span id="BusinessAreaOwner" style="display:none;">' + item.Owner + '</span><span id="BusinessAreaDescription" style="display:none;">' + item.Description + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/gen.png" class="padding_left_65px" /><small>' + additional + '</small></td></tr>';
                    } else {
                        article1 += '<td><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaName12 + '</span><span id="ContractAreaAdmin" style="display:none;">' + strContractAreaName12Owner + '</span><span id="BusinessAreaOwner" style="display:none;">' + item.Owner + '</span><span id="BusinessAreaDescription" style="display:none;">' + item.Description + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/gen.png" /><small>' + additional + '</small></td></tr>';
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
                    //            article1 += '<td><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaName12 + '</span><span id="ContractAreaAdmin" style="display:none;">' + strContractAreaName12Owner + '</span><span id="BusinessAreaOwner" style="display:none;">' + item.Owner + '</span><span id="BusinessAreaDescription" style="display:none;">' + item.Description + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/gen.png" class="padding_left_65px" /><small>' + additional + '</small></td></tr>';
                    //        } else {
                    //            article1 += '<td><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaName12 + '</span><span id="ContractAreaAdmin" style="display:none;">' + strContractAreaName12Owner + '</span><span id="BusinessAreaOwner" style="display:none;">' + item.Owner + '</span><span id="BusinessAreaDescription" style="display:none;">' + item.Description + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/gen.png" /><small>' + additional + '</small></td></tr>';
                    //        }
                    //    },
                    //    error:
                    //        function (data) {

                    //        }
                    //});
                } else {
                    article1 += '<td><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaName12 + '</span><span id="ContractAreaAdmin" style="display:none;">' + strContractAreaName12Owner + '</span><span id="BusinessAreaOwner" style="display:none;">' + item.Owner + '</span><span id="BusinessAreaDescription" style="display:none;">' + item.Description + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/gen.png" /><small>' + additional + '</small></td></tr>';
                }
                if (previousidcreate != item.ParentBusinessAreaID)
                    previousidcreate = item.RowKey;
            }

            if (object.ChildrenData.length > 0)
                BindRecBAOther(spath, object.ChildrenData[i]);
        }
    }
}
function recursiveIteration14edit(object) {
    if (object.ChildrenData.length != 0) {
        for (var i = 0; i < object.ChildrenData.length; i++) {
            var item = object.ChildrenData[i];
            var additional = "";

            var j = BusinessAreaAccessID.indexOf(item.RowKey);//Full/Contribute/Read permission in bussiness area
            if (j > -1 || item.Owner.trim().split(';').indexOf(localStorage.UserName.trim()) > -1) {
                if (item.ParentBusinessAreaID != 0) {
                    if (item.Owner.trim().split(';').indexOf(localStorage.UserName.trim()) > -1) {//if business owner

                        if (arrCALicenseLimit.indexOf(item.BusinessAreaName) > -1) {
                            additional = '<span>' + item.BusinessAreaName + '</span>';
                        }
                        else {
                            additional = '<span style="color:#3487ce; cursor:pointer;" onclick="javascript:treeviewclick2edit(this)">' + item.BusinessAreaName + '</span>&nbsp; <img src="/Content/Images/icon/profile.png" style="cursor:default;" />'
                        }


                    } else { //if permission in business area

                        if (arrCALicenseLimit.indexOf(item.BusinessAreaName) > -1) {
                            additional = '<span>' + item.BusinessAreaName + '</span>';
                        }
                        else {
                            additional = '<span style="color:#3487ce; cursor:pointer;" onclick="javascript:treeviewclick2edit(this)">' + item.BusinessAreaName + '</span>'
                        }
                    }
                } else {
                    additional = '<span>' + item.BusinessAreaName + '</span>';
                }

            } else {
                if (item.ParentBusinessAreaID != 0) {
                    if (strContractAreaID == "GenCA") {

                        if (arrCALicenseLimit.indexOf(item.BusinessAreaName) > -1) {
                            additional = '<span>' + item.BusinessAreaName + '</span>';
                        }
                        else {
                            additional = '<span style="color:#3487ce; cursor:pointer;" onclick="javascript:treeviewclick2edit(this)">' + item.BusinessAreaName + '</span>'
                        }

                    } else {
                        if (localStorage.UserType.indexOf("Global Contract Owner") >= 0) {

                            if (arrCALicenseLimit.indexOf(item.BusinessAreaName) > -1) {
                                additional = '<span>' + item.BusinessAreaName + '</span>';
                            }
                            else {
                                additional = '<span style="color:#3487ce; cursor:pointer;" onclick="javascript:treeviewclick2edit(this)">' + item.BusinessAreaName + '</span>'
                            }

                        } else {
                            additional = '<span>' + item.BusinessAreaName + '</span><span style="font-size:12px;font-style:italic;">(Request Access)</span>';
                        }
                    }
                } else {
                    additional = '<span>' + item.BusinessAreaName + '</span>';
                }
            }

            if (item.ParentBusinessAreaID == 0) {
                strContractAreaName14 = item.BusinessAreaName;
                strContractAreaID = item.RowKey;
                strContractAreaName14Owner = item.Owner;
                article14 += '<tr data-tt-id="tre-' + item.RowKey + '" class="branch expanded">';
                article14 += '<td class="treeHead"><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaName14 + '</span><span id="ContractAreaAdmin" style="display:none;">' + strContractAreaName14Owner + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/globset.png" /><small>' + additional + '</small></td></tr>';
            } else {

                article14 += '<tr data-tt-id="tre-' + item.RowKey + '" data-tt-parent-id="tre-' + item.ParentBusinessAreaID + '" class="branch collapsed" style="display: table-row;">';

                if (previousidedit == item.ParentBusinessAreaID) {
                    //find if child business area exists
                    $.ajax({
                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/childbusinessareas?businessareaid=' + item.RowKey,
                        type: 'GET',
                        dataType: 'json',
                        'Content-Type': 'application/json',
                        headers: {
                            'eContracts-ApiKey': localStorage.APIKey
                        },
                        async: false,
                        success: function (data) {
                            if (data.length == 0) {
                                article14 += '<td><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaName14 + '</span><span id="ContractAreaAdmin" style="display:none;">' + strContractAreaName14Owner + '</span><span id="BusinessAreaOwner" style="display:none;">' + item.Owner + '</span><span id="BusinessAreaDescription" style="display:none;">' + item.Description + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/gen.png" class="padding_left_65px" /><small>' + additional + '</small></td></tr>';
                            } else {
                                article14 += '<td><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaName14 + '</span><span id="ContractAreaAdmin" style="display:none;">' + strContractAreaName14Owner + '</span><span id="BusinessAreaOwner" style="display:none;">' + item.Owner + '</span><span id="BusinessAreaDescription" style="display:none;">' + item.Description + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/gen.png" /><small>' + additional + '</small></td></tr>';
                            }
                        },
                        error:
                            function (data) {

                            }
                    });
                } else {
                    article14 += '<td><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaName14 + '</span><span id="ContractAreaAdmin" style="display:none;">' + strContractAreaName14Owner + '</span><span id="BusinessAreaOwner" style="display:none;">' + item.Owner + '</span><span id="BusinessAreaDescription" style="display:none;">' + item.Description + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/gen.png" /><small>' + additional + '</small></td></tr>';
                }
                if (previousidedit != item.ParentBusinessAreaID)
                    previousidedit = item.RowKey;
            }


            if (object.ChildrenData.length > 0)
                recursiveIteration14edit(object.ChildrenData[i]);
        }
    }
}
function treeviewclick2edit(obj) {

    treeBusinessAreaName = obj.textContent;
    treeBusinessAreaRowKey = obj.parentNode.parentNode.childNodes[2].textContent;
    treeBusinessAreaParentBusinessAreaID = obj.parentNode.parentNode.childNodes[1].textContent;
    treeBusinessAreaContractAreaName = obj.parentNode.parentNode.childNodes[3].textContent;
    treeBusinessAreaContractAreaNameOwner = obj.parentNode.parentNode.childNodes[4].textContent;
    treeBusinessAreaOwner = obj.parentNode.parentNode.childNodes[5].textContent;
    treeBusinessAreaDescription = obj.parentNode.parentNode.childNodes[6].textContent;
    var rowK = jQuery.grep(BusinessAreaPathRowKey, function (a) {
        return a[1] === treeBusinessAreaRowKey;
    });
    if (rowK != null && typeof (rowK) != "undefined" && rowK.length != 0) {
        thisBusinessAreaPath = rowK[0][0];
    }
    thisBusinessAreaNameC = treeBusinessAreaName;
    thisContractAreaNameC = treeBusinessAreaContractAreaName;
    thisBusinessAreaNameRowKey = treeBusinessAreaRowKey;
    thisContractAreaNameRowKey = treeBusinessAreaParentBusinessAreaID;
    // Find and remove item from an array
    $('#liSelectedBA').html('<span style="font-size:11px;">' + treeBusinessAreaName + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveSelected(this);" style="float:right" /></span>');

}
function getcontracttypes(ContractType, CtypeAction) {
    $("#ddlContractTypes").empty();
    $("#ddlContractTypes").append("<option value='0'>--Select--</option>");
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contracttypes',
        type: 'GET',
        dataType: 'json',
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        cache: false,
        success: function (contracttypes) {
            var veContractFeaturesCTLU = JSON.parse(localStorage.getItem("eContractFeatures"));
            var vCustomMetadata = $.grep(veContractFeaturesCTLU, function (n, i) {
                return (n.RowKey == "24" && n.Status == "ON");
            });
            if (vCustomMetadata.length > 0 && typeof thisContractAreaSettings != 'undefined') {
                var ContractAreaContractType = $.grep(contracttypes, function (nthiscontracttypes, ithiscontracttypes) {
                    return (thisContractAreaSettings.ContractType.split(';').indexOf(nthiscontracttypes.ContractType) > -1);
                });

                var Basicmetadata = $.grep(ContractAreaContractType, function (ncontracttypes, icontracttypes) {
                    return (ncontracttypes.FUCustomMetadata == "OFF");
                });
                if (Basicmetadata.length == ContractAreaContractType.length && Basicmetadata.length > 0 && ContractAreaContractType.length > 0) {
                    //manoj
                    HideContractType = true;
                    bindcontracttypeddl(contracttypes, true, CtypeAction);
                    //manoj
                } else {
                    HideContractType = false;
                    bindcontracttypeddl(contracttypes, true, CtypeAction)
                }
            } else {
                HideContractType = false;
                bindcontracttypeddl(contracttypes, false, CtypeAction);
            }

            ////manoj
            //if (typeof (thisContractAreaSettings) != 'undefined' && thisContractAreaSettings != null) {
            //    if (thisContractAreaSettings.ConfigureContractType == "default") {
            //        $("#ddlContractTypes option").filter(function (index) { return $(this).text() === "General" }).prop('selected', true);
            //        if (CtypeAction == "Yes") {
            //            $("#ddlContractTypes").trigger("change");
            //        }
            //        $(".ctypeconfigure").css("display", "none");
            //    } else {
            //        $(".ctypeconfigure").css("display", "");
            //    }
            //}

            ////manoj
        }
    });
}

//manoj
//Bind Contract Type
function bindcontracttypeddl(contracttypecollection, featurestatus, CtypeAction) {
    $("#ddlContractTypes").empty();
    $("#ddlContractTypes").append("<option value='0'>--Select--</option>");
    $(contracttypecollection).each(function (i, item) {
        if (item.Active == true) {
            var find = " ";
            var re = new RegExp(find, 'g');

            var str = escape(item.ContractType) + '~' + item.TransactionType + '~' + item.ContractClass + '~' + item.Description + '~' + item.FUCustomMetadata;
            if (ContractType == item.ContractType) {
                //if (seltype != "") {
                if (thisContractAreaSettings.ContractType.split(';').indexOf(item.ContractType) > -1) {
                    $("#ddlContractTypes").append('<option value="' + str + '" selected>' + item.ContractType + '</option>');
                    $("#lblContractTypeDescription").append(item.Description);
                }
                $("#ddlTransactionTypes").find('option[value="' + item.TransactionType + '"]').prop("selected", true);
                var contractclass = "";
                contractclass = item.ContractClass;
                $("#ddlContractClasses").find('option[value="' + contractclass + '"]').prop("selected", true);

                if (contractclass == "Sub-Contract") {
                }

                vContractTermType = item.ContractTermType;
                //}
            } else {
                if (thisContractAreaSettings.ContractType.split(';').indexOf(item.ContractType) > -1) {
                    $("#ddlContractTypes").append('<option value="' + str + '">' + item.ContractType + '</option>')
                }
            }
        }
        else {
            var find = " ";
            var re = new RegExp(find, 'g');

            var str = item.ContractType + '~' + item.TransactionType + '~' + item.ContractClass + '~' + item.Description + '~' + item.FUCustomMetadata;
            if (ContractType == item.ContractType) {
                //if (ContractType != "") {
                if (thisContractAreaSettings.ContractType.split(';').indexOf(item.ContractType) > -1) {
                    $("#ddlContractTypes").append('<option value="' + str + '" selected>' + item.ContractType + '</option>');
                    $("#lblContractTypeDescription").append(item.Description);
                }

                $("#ddlTransactionTypes").find('option[value="' + item.TransactionType + '"]').prop("selected", true);
                var contractclass = "";
                contractclass = item.ContractClass;
                $("#ddlContractClasses").find('option[value="' + contractclass + '"]').prop("selected", true);

                if (contractclass == "Sub-Contract") {
                }
            }
            //}
        }
    });
    //manoj
    //if(featurestatus && CtypeAction == "Yes"){
    //    if ($("#ddlContractTypes option:selected").text() == "--Select--" && (!HideContractType)) {
    //        $("#ddlContractTypes").trigger("change");
    //    } else if (HideContractType) {
    //        $("#ddlContractTypes").trigger("change");
    //    }
    //}
    //manoj
    if (!IsContactNumberGenerated) {
        CheckContractNumberSetting();
    }
}
//Bind Contract Type
//manoj


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
$("#btnHelp").click(function () {
    if ($(this).text().indexOf("Hide") > -1) {
        $(this).html("<img src='/Content/Images/input-help-white.png'>Show Help")
        $(".help").css('display', 'none');
        $("#helptext1").css('display', 'none');
        $("#helptext2").css('display', 'none');
        $("#helptext3").css('display', 'none');
    } else {
        $(this).html("<img src='/Content/Images/input-help-white.png'>Hide Help")
        $(".help").css('display', '');
        $("#helptext1").css('display', '');
        $("#helptext2").css('display', '');
        $("#helptext3").css('display', '');
    }
});
function funselectall(obj) {
    if (obj.checked) { // check select status       
        $('input:checkbox[name=Generic]').prop('checked', true);
        checkMultipleDocuments("");
    } else {
        $('input:checkbox[name=Generic]').prop('checked', false);
        checkMultipleDocuments("");
    }
}

function funselectallcon(obj) {
    if (obj.checked) {
        $('input:checkbox[name=Genericcon]').prop('checked', true);

    } else {
        $('input:checkbox[name=Genericcon]').prop('checked', false);
    }
}

function funselecttask(obj) {
    if (obj.checked) {
        $('input:checkbox[id="' + obj.title + '"]').prop("disabled", true);
    }

    var onecheckexists = false;
    $('input:checkbox[id^="' + obj.title + '"]').each(function () {
        if (this.checked) {
            onecheckexists = true;
        }
    });

    if (!onecheckexists) {
        $('input:checkbox[id="' + obj.title + '"]').removeAttr('disabled');
    }
}
function funselectalltasks(obj) {
    if (obj.checked) {
        $('input:checkbox[id^="' + obj.id + '"]').prop("disabled", true);
        $('input:checkbox[id^="' + obj.id + '"]').prop("checked", "checked");
        $('input:checkbox[id="' + obj.id + '"]').removeAttr('disabled');
    } else {
        $('input:checkbox[id^="' + obj.id + '"]').removeAttr('disabled');
        $('input:checkbox[id^="' + obj.id + '"]').prop("checked", false);
    }
}
function getCurrencyDisplayStyle() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/settings',
        type: 'GET',
        dataType: 'json',
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        cache: false,
        success: function (data) {
            if (data.CurrencyDisplayStyle == "UK") {
                vCurrencyDisplayStyle = "UK";
            } else if (data.CurrencyDisplayStyle == "CAN") {
                vCurrencyDisplayStyle = "CAN";
            } else if (data.CurrencyDisplayStyle == "EU") {
                vCurrencyDisplayStyle = "EU";
            } else if (data.CurrencyDisplayStyle == "IND") {
                vCurrencyDisplayStyle = "IND";
            }
        }
    });
}
$("#btnClearFilter").click(function () {
    if (getParameterByName('Stage') == 'pipeline') {
        location = "/Contracts/ContractDetails?ContractID=" + getParameterByName('ContractID') + "&Stage=pipeline";
    } else {
        location = "/Contracts/ContractDetails?ContractID=" + getParameterByName('ContractID');
    }
});
function getBusinessAreaDetails(businessareaname, contractareaname) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/detailsbyname?businessareaname=' + encodeURIComponent(businessareaname) + '&contractareaname=' + encodeURIComponent(contractareaname),
        type: 'GET',
        dataType: 'json',
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        success: function (data1) {
            $('#lblBusinessAreaDescription').text(data1.Description);
        }
    });
}
function ViewTaxonomy(obj) {

    if (chkobj == "") {
        chkobj = obj.title;
    }
    if (chkobj != obj.title) {
        chkobj = obj.title
        $("#tbodyTaxonomy12").append("");
        $("#tbodyTaxonomy12").empty();
    }

    $('#liSelectedTaxonomy').empty();
    var selecteditems = $("#" + obj.id + "").val().split(';');
    if (selecteditems != "") {
        var selecteditemslength = selecteditems.length;
        chkspan = "";
        for (var i = 0; i < selecteditemslength; i++) {
            $('#liSelectedTaxonomy').append('<span style="font-size:11px;">' + selecteditems[i] + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveSelected(this);" style="float:right" /></span>');
            if (chkspan == "") {
                chkspan = selecteditems[i];
            }
            else {
                if (chkspan.indexOf(selecteditems[i]) < 0) {
                    chkspan += ";" + selecteditems[i];
                }
            }
        }
    }

    if ($('#tbodyTaxonomy12 tr').length == 0) {
        BindTaxonomy(obj)
    } else {
        $("#browseTaxonomy").dialog("option", "title", "Taxonomy Picker");
        $("#browseTaxonomy").dialog("open");
        $("#browseTaxonomy").height("auto");
    }
}
function BindTaxonomy(obj) {
    $("#loadingPage").fadeIn();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/termsets?groupname=' + obj.title,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        success: function (data) {
            recursiveIterationTaxonomy12(data, obj.title)
            $("#tbodyTaxonomy12").append(articleTaxonomy1);
            articleTaxonomy1 = "";
            $("#example-basic-Taxonomy12").treetable({ expandable: true, initialState: "expanded" });
            $("#loadingPage").fadeOut();
            $("#browseTaxonomy").data('param_taxonomy', obj.id).dialog("option", "title", "Taxonomy Picker");
            $("#browseTaxonomy").dialog("open");
            $("#browseTaxonomy").height("auto");
        },
        error:
            function (data) {
                $("#loadingPage").fadeOut();
                articleTaxonomy1 = "No terms are found in the selected group.";
                $("#tbodyTaxonomy12").empty();
                $("#tbodyTaxonomy12").append(articleTaxonomy1);
                articleTaxonomy1 = "";
                $("#browseTaxonomy").data('param_taxonomy', obj.id).dialog("option", "title", "Taxonomy Picker");
                $("#browseTaxonomy").dialog("open");
                $("#browseTaxonomy").height("auto");
            }
    });
}
function recursiveIterationTaxonomy12(object, groupname) {
    if (object.length != 0) {
        for (var i = 0; i < object.length; i++) {
            var item = object[i];
            var additional = "";
            additional = '<span style="color:#3487ce; cursor:pointer;" onclick="javascript:treeviewclickTaxonomy(this)" id=' + item.split('|')[1] + '>' + item.split('|')[0] + '</span>'
            articleTaxonomy1 += '<tr data-tt-id="tre-' + item + '" class="branch expanded">';
            articleTaxonomy1 += '<td class="treeHead"><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/globset.png" /><small>' + additional + '</small></td></tr>';
            rec1(groupname, item)
        }
    }
}
function rec1(groupname, item) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/spterms?groupname=' + groupname + '&termset=' + item,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        async: false,
        success: function (data) {
            $(data).each(function (i, item1) {
                additional = "";
                additional = '<span style="color:#3487ce; cursor:pointer;" onclick="javascript:treeviewclickTaxonomy(this)" id=' + item1.split('|')[1] + '>' + item1.split('|')[0] + '</span>'
                articleTaxonomy1 += '<tr data-tt-id="tre-' + item1 + '" data-tt-parent-id="tre-' + item + '" class="branch collapsed" style="display: table-row;">';
                articleTaxonomy1 += '<td><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/gen.png" class="padding_left_65px" /><small>' + additional + '</small></td></tr>';
                rec12(groupname, item, item1);
            });
        },
        error:
            function (data) {
            }
    });
}
function rec12(groupname, item, itemnm) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/terminsideterm?groupname=' + groupname + '&termset=' + item + '&termname=' + itemnm,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        async: false,
        success: function (data) {
            $(data).each(function (i, item1) {
                additional = "";
                additional = '<span style="color:#3487ce; cursor:pointer;" onclick="javascript:treeviewclickTaxonomy(this)" id=' + item1.split('|')[1] + '>' + item1.split('|')[0] + '</span>'
                articleTaxonomy1 += '<tr data-tt-id="tre-' + item1 + '" data-tt-parent-id="tre-' + itemnm + '" class="branch collapsed" style="display: table-row;">';
                articleTaxonomy1 += '<td><span class="indenter" style="padding-left: 25px;"></span><img src="/Content/Images/icon/gen.png" class="padding_left_65px" /><small>' + additional + '</small></td></tr>';
                rec12(groupname, itemnm, item1)
                rec13(groupname, item, itemnm, item1)
            });
        },
        error:
            function (data) {
            }
    });
}
function rec13(groupname, item, itemnm, itemnm1) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/terminsideterml3?groupname=' + groupname + '&termset=' + item + '&parenttermname=' + itemnm + '&childtermname=' + itemnm1,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        async: false,
        success: function (data) {
            $(data).each(function (i, item1) {
                additional = "";
                additional = '<span style="color:#3487ce; cursor:pointer;" onclick="javascript:treeviewclickTaxonomy(this)" id=' + item1.split('|')[1] + '>' + item1.split('|')[0] + '</span>'
                articleTaxonomy1 += '<tr data-tt-id="tre-' + item1 + '" data-tt-parent-id="tre-' + itemnm1 + '" class="branch collapsed" style="display: table-row;">';
                articleTaxonomy1 += '<td><span class="indenter" style="padding-left: 35px;"></span><img src="/Content/Images/icon/gen.png" class="padding_left_65px" /><small>' + additional + '</small></td></tr>';
                rec13(groupname, item, itemnm1, item1)
            });
        },
        error:
            function (data) {
            }
    });
}
function treeviewclickTaxonomy(obj) {

    $('#liSelectedTaxonomy').html('<span style="font-size:13px;">' + obj.textContent + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveSelected(this);" style="float:right" /></span>');
}
function togglediv1234(firstObject, imgObject) {
    try {
        $("#" + firstObject).slideToggle();

    }
    catch (ex) {
    }
    var imgObj = $("#" + imgObject);

    if (imgObj.attr("title") == "Collapse") {
        imgObj.attr("title", "Expand");
        imgObj.attr("src", "../Content/Images/e-open.png");
    } else {
        imgObj.attr("title", "Collapse");
        imgObj.attr("src", "../Content/Images/e-close.png");
    }
}
function togglediv123(firstObject, imgObject, object2) {
    $("#" + firstObject).slideToggle();
    $("#" + object2).slideToggle();

    var imgObj = $("#" + imgObject);

    if (imgObj.attr("title") == "Collapse") {
        imgObj.attr("title", "Expand");
        imgObj.attr("src", "../Content/Images/e-open.png");
    } else {
        imgObj.attr("title", "Collapse");
        imgObj.attr("src", "../Content/Images/e-close.png");
    }
}

var contractFinalized = false; //eO39990
var IsContractTermType = false;
function createingdivbyme(item, vControlsGroup, idelvalue, idelcheck, vUserList, vMetadata) {
    IsContractTermType = false;
    var requiredvaluetocheck = false;
    if (getParameterByName("Stage") == "pipeline" && getParameterByName("Duplicate") == "Yes") {
        //eO39990
        if (contractFinalized) {
            requiredvaluetocheck = item.Finalizingfrom == "Required" ? true: false;
        }
        else {
            requiredvaluetocheck = item.Newform == "Required" ? true : false;
        }
    }
    else if (getParameterByName("Stage") == "pipeline" && getParameterByName("Finalize") == "true") {
        requiredvaluetocheck = item.Finalizingfrom == "Required" ? true : false;
    } else if (getParameterByName("Stage") == "pipeline") {
        requiredvaluetocheck = item.Newform == "Required" ? true : false;
    }
    else if (getParameterByName("Closeout") == "Yes") {
        requiredvaluetocheck = item.Closeoutform == "Required" ? true : false;
    }
    else {
        requiredvaluetocheck = item.Finalizingfrom == "Required" ? true : false;
    }


    //if (thiscontractstatus != "pipeline" && getParameterByName("Duplicate") != "Yes" && IsFullControlUser == true) {
    //    $("#ddlContractTypes").removeAttr("disabled");
    //    $("#txtContractTitle").removeAttr("disabled"); //new
    //    $("#viewbusinessarea").removeClass("disable-control");
    //    $("#viewbusinessarea").removeAttr("disabled");
    //    $("#txtBusinessArea").removeAttr("disabled");
    //    $("#ddlContractTypes").removeAttr("disabled");
    //    $("#txtContractNumber").removeAttr("disabled");
    //    $("#CompanyProfile").removeAttr("disabled");
    //    $("#OriginatingParty").removeAttr("disabled");
    //}

    var onlydate = "";
    var vDate = "";
    var vUser = "";
    var vNumber = "";
    var vPhoneNumber = "";
    var PhoneID = "";
    var PhoneCountry = "";
    var vEmail = "";
    var vCurrency = "";
    var vMultiDDL = "";
    var vProject = "";
    var vContractValue = false;
    var vControls = "";
    var checkedCriteria = "";
    var vNumberD = "";
    var vNumberP = "";
    var vNumberPD = "";
    var vMarginTop = "margin-top-8";
    if (item.FieldType == "Yes/No")
        vMarginTop = "";
    if (requiredvaluetocheck) {
        vControls += ' <div class="form-input-group"><div class="row-group"><label class="col3 m12 ' + vMarginTop + '">' + item.FieldDisplayName + '<span class="text-red">*</span></label> ';
    } else {
        vControls += '<div class="form-input-group"><div class="row-group"><label class="col3 m12 ' + vMarginTop + '">' + item.FieldDisplayName + '</label> ';
    }

    vControls += ' ';
    if (item.FieldType == "Single Line Text") {
        if (item.FieldName == "ContractNumber") {
            vControls += '<div class="col6 m12">';
            if ($(vMetadata).find(item.FieldName).text() == "") {
                if (requiredvaluetocheck) {
                    if (thiscontractstatus != "pipeline" && getParameterByName("Duplicate") != "Yes" && IsFullControlUser != true)
                        vControls += "<input type='text' id='txtContractNumber' maxlength='30' name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro validelement' disabled />";
                    else
                        vControls += "<input type='text' id='txtContractNumber' maxlength='30' name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro validelement' />";

                } else {
                    if (thiscontractstatus != "pipeline" && getParameterByName("Duplicate") != "Yes" && IsFullControlUser != true)
                        vControls += "<input type='text' id='txtContractNumber' maxlength='30' name=" + item.FieldName + " class='form-contro' disabled />";
                    else
                        vControls += "<input type='text' id='txtContractNumber' maxlength='30' name=" + item.FieldName + " class='form-contro' />";
                }
            } else {
                if (getParameterByName("Duplicate") == "Yes") {
                    if (requiredvaluetocheck) {
                        if (thiscontractstatus != "pipeline" && getParameterByName("Duplicate") != "Yes" && IsFullControlUser != true)
                            vControls += "<input type='text' id='txtContractNumber' maxlength='30' name=" + item.FieldName + " value='' title='" + item.FieldDisplayName + "' class='form-contro validelement' disabled />";
                        else
                            vControls += "<input type='text' id='txtContractNumber' maxlength='30' name=" + item.FieldName + " value='' title='" + item.FieldDisplayName + "' class='form-contro validelement' />";
                    } else {
                        if (thiscontractstatus != "pipeline" && getParameterByName("Duplicate") != "Yes" && IsFullControlUser != true)
                            vControls += "<input type='text' id='txtContractNumber' maxlength='30' name=" + item.FieldName + " value='' class='form-contro' disabled />";
                        else
                            vControls += "<input type='text' id='txtContractNumber' maxlength='30' name=" + item.FieldName + " value='' class='form-contro' />";
                    }
                }
                else {
                    if (requiredvaluetocheck) {
                        if (thiscontractstatus != "pipeline" && getParameterByName("Duplicate") != "Yes" && IsFullControlUser != true)
                            vControls += "<input type='text' id='txtContractNumber' maxlength='30' name=" + item.FieldName + " value='" + $(vMetadata).find(item.FieldName).text() + "' title='" + item.FieldDisplayName + "' class='form-contro validelement' disabled />";
                        else
                            vControls += "<input type='text' id='txtContractNumber' maxlength='30' name=" + item.FieldName + " value='" + $(vMetadata).find(item.FieldName).text() + "' title='" + item.FieldDisplayName + "' class='form-contro validelement' />";
                    } else {
                        if (thiscontractstatus != "pipeline" && getParameterByName("Duplicate") != "Yes" && IsFullControlUser != true)
                            vControls += "<input type='text' id='txtContractNumber' maxlength='30' name=" + item.FieldName + " value='" + $(vMetadata).find(item.FieldName).text() + "' class='form-contro' disabled />";
                        else
                            vControls += "<input type='text' id='txtContractNumber' maxlength='30' name=" + item.FieldName + " value='" + $(vMetadata).find(item.FieldName).text() + "' class='form-contro' />";
                    }
                }
            }
            vControls += '<input type="hidden" id="hdContractNumber" />';
            vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
            vControls += '</div>';
            //if (item.FieldHelp == "true") {
            vControls += '<div class="col3 m12">';
            vControls += '<div class="success-input-msg margin-top-8">';
            vControls += (item.FieldHelp == "true") ? '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>' : '';
            if (thiscontractstatus != "pipeline" && getParameterByName("Duplicate") != "Yes" && IsFullControlUser != true) {
                //vControls += '<a id="aOnDemand" href="javascript:void(0)" onclick="GenerateContactNumber()" class="disable-control" style="display:none;">Generate</a>';
            } else {
                vControls += '<a id="aOnDemand" class="linkText" href="javascript:void(0)" onclick="GenerateContactNumber()" style="display:none;">Generate</a>';
            }
            vControls += '</div>'
            vControls += '</div>'
            // }
        } else {
            vControls += '<div class="col6 m12">';
            if ($(vMetadata).find(item.FieldName).text() == "") {
                if (requiredvaluetocheck) {
                    vControls += "<input type='text' id=" + item.FieldName + " maxlength='100' name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro validelement' />";
                } else {
                    vControls += "<input type='text' id=" + item.FieldName + " maxlength='100' name=" + item.FieldName + " class='form-contro' />";
                }
            } else {
                if (requiredvaluetocheck) {
                    vControls += "<input type='text' id=" + item.FieldName + " maxlength='100' name=" + item.FieldName + " value='" + $(vMetadata).find(item.FieldName).text() + "' title='" + item.FieldDisplayName + "' class='form-contro validelement' />";
                } else {
                    vControls += "<input type='text' id=" + item.FieldName + " maxlength='100' name=" + item.FieldName + " value='" + $(vMetadata).find(item.FieldName).text() + "' class='form-contro' />";
                }
            }
            vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
            vControls += '</div>';
            if (item.FieldHelp == "true") {
                vControls += '<div class="col3 m12">';
                vControls += '<div class="success-input-msg margin-top-8">';
                vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                vControls += '</div>'
                vControls += '</div>'
            }
        }
    }
    else if (item.FieldType == "Multi Line Text") {
        vControls += '<div class="col6 m12">';
        if ($(vMetadata).find(item.FieldName).text() == "") {
            if (requiredvaluetocheck) {
                vControls += "<textarea name=" + item.FieldName + " id=" + item.FieldName + " maxlength='500' cols='40' rows='5' title='" + item.FieldDisplayName + "' class='form-contro validelement'></textarea>";
            } else {
                vControls += "<textarea name=" + item.FieldName + " id=" + item.FieldName + " maxlength='500' cols='40' rows='5' class='form-contro'></textarea>";
            }
        } else {
            if (requiredvaluetocheck) {
                vControls += "<textarea name=" + item.FieldName + " id=" + item.FieldName + " maxlength='500' cols='40' rows='5' title='" + item.FieldDisplayName + "' class='form-contro validelement'>" + $(vMetadata).find(item.FieldName).text() + "</textarea>";
            } else {
                vControls += "<textarea name=" + item.FieldName + " id=" + item.FieldName + " maxlength='500' cols='40' rows='5' class='form-contro'>" + $(vMetadata).find(item.FieldName).text() + "</textarea>";
            }
        }
        vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
        vControls += '</div>';
        if (item.FieldHelp == "true") {
            vControls += '<div class="col3 m12">';
            vControls += '<div class="success-input-msg margin-top-8">';
            vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
            vControls += '</div>'
            vControls += '</div>'
        }
    }
    else if (item.FieldType == "Date") {
        vDate = item.FieldName;
        DateFileldName = item.FieldName;
        var vv = $(vMetadata).find(item.FieldName).text();
        onlydate = "";
        if (vv != null) {
            onlydate = vv.substring(0, vv.length - 19);
        }
        if (onlydate != "") {
            if (localStorage.AppDateFormat == null || localStorage.AppDateFormat == "" || localStorage.AppDateFormat == 'undefined') {
                onlydate = moment(new Date(onlydate)).format('MM/DD/YYYY');
            }
            else {
                onlydate = moment(new Date(onlydate)).format(localStorage.AppDateFormat);
            }
        }
        if (item.FieldName == "EndDate" && IsStartDateExists) {
            IsTermExists = true;
            vControls += '<div class="col2 m12">';
            if (requiredvaluetocheck) {
                IsTermRequired = true;
                if ($(vMetadata).find('ContractTerm').text() != "" && $(vMetadata).find('ContractTerm').text() != null) {
                    vControls += "<input type='radio' checked style='float: left;margin: 10px 10px 0px 0px;' name='rdTermEndDate' value='Term'><input id='ContractTerm' style='float: left; width: 85%;' onchange='calculateenddate()' name='ContractTerm' type='text' title='" + item.FieldDisplayName + "' class='form-contro validelement' value='" + $(vMetadata).find('ContractTerm').text() + "' maxlength='4' />";
                }
                else {
                    vControls += "<input type='radio'  style='float: left;margin: 10px 10px 0px 0px;' name='rdTermEndDate' value='Term'><input id='ContractTerm' style='float: left; width: 85%;' onchange='calculateenddate()' name='ContractTerm' type='text' title='" + item.FieldDisplayName + "' class='form-contro' disabled value='' maxlength='4' />";
                }
            } else {
                if ($(vMetadata).find('ContractTerm').text() != "" && $(vMetadata).find('ContractTerm').text() != null) {
                    vControls += "<input type='radio' checked style='float: left;margin: 10px 10px 0px 0px;' name='rdTermEndDate' value='Term'><input id='ContractTerm' style='float: left; width: 85%;' onchange='calculateenddate()'  name='ContractTerm' type='text' title='" + item.FieldDisplayName + "' class='form-contro' value='" + $(vMetadata).find('ContractTerm').text() + "' maxlength='4' />";
                }
                else {
                    vControls += "<input type='radio'  style='float: left;margin: 10px 10px 0px 0px;' name='rdTermEndDate' value='Term'><input id='ContractTerm' style='float: left; width: 85%;' onchange='calculateenddate()' disabled name='ContractTerm' type='text' title='" + item.FieldDisplayName + "' class='form-contro' disabled value='' maxlength='4' />";
                }
            }
            vControls += '</div>';
            vControls += '<div class="col2 m12">';
            if ($(vMetadata).find('ContractTerm').text() != "" && $(vMetadata).find('ContractTerm').text() != null) {
                vControls += '<select id="ContractTermChoices"   name="ContractTermChoices" class="form-contro" onchange="calculateenddate()">';
            }
            else {
                vControls += '<select id="ContractTermChoices"  disabled name="ContractTermChoices" class="form-contro valid" onchange="calculateenddate()">';
            }
            if ($(vMetadata).find('ContractTermChoices').text() == "months") {
                vControls += '<option value="months" selected>Month(s)</option>';
                vControls += '<option value="years">Year(s)</option>';
            } else {
                vControls += '<option value="months">Month(s)</option>';
                vControls += '<option value="years" selected>Year(s)</option>';
            }

            vControls += '</select>';
            vControls += '</div>';

            vControls += '<div class="col6 m12" style="margin: 12px 0 0 25%;">';
            if ($(vMetadata).find('ContractTerm').text() != "" && $(vMetadata).find('ContractTerm').text() != null) {
                vControls += "<input type='radio' name='rdTermEndDate' value='EndDate' style='float: left;margin: 10px 10px 0px 0px;'><input type='text' id=" + item.FieldName + "  title='" + item.FieldDisplayName + "' class='form-contro form-contro-Date validdate form_input fielddatecontrol  " + item.FieldName + "'/>";
            }
            else {
                vControls += "<input type='radio' checked name='rdTermEndDate' value='EndDate' style='float: left;margin: 10px 10px 0px 0px;'><input type='text' id=" + item.FieldName + "  title='" + item.FieldDisplayName + "' class='form-contro form-contro-Date form_input fielddatecontrol " + item.FieldName + "'/>";
                IsTermExists = false;
            }


            if (item.FieldHelp == "true") {
                vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
            }
            vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
            vControls += '</div>';
            IsStartDateExists = false;
        }
        else {
            vControls += '<div class="col6 m12">';

            if (item.FieldName == "StartDate") {
                if (requiredvaluetocheck) {
                    vControls += "<input type='text' id='" + item.FieldName + "' onchange='calculateenddate()' title='" + item.FieldDisplayName + "' class='form-contro form-contro-Date validelement validdate form_input fielddatecontrol " + item.FieldName + "'/>";

                } else {
                    vControls += "<input type='text' id='" + item.FieldName + "' onchange='calculateenddate()' title='" + item.FieldDisplayName + "' class='form-contro form-contro-Date validdate form_input fielddatecontrol " + item.FieldName + "'/>";
                }
            }
            else {
                if ($("#hdhMilestoneCapture").text() == "Yes" && item.FieldName != "StartDate" && item.FieldName != "NextEvaluationDate" && item.FieldName != "EndDate" && item.FieldName != "LastSignatureDate") {
                    var customdatefieldexsit = false;
                    $(CustomDateFieldsXML).find('metadata').each(function () {
                        if (item.FieldName == $(this).find('CustomDateFieldName').text() && (!customdatefieldexsit)) {
                            customdatefieldexsit = true;
                        }
                    });
                    if (!customdatefieldexsit) {
                        if (requiredvaluetocheck) {
                            vControls += "<input type='text' id='" + item.FieldName + "' title='" + item.FieldDisplayName + "' class='form-contro form-contro-Date customdatefieldchange validelement validdate form_input fielddatecontrol " + item.FieldName + "'/>";
                        } else {
                            vControls += "<input type='text' id='" + item.FieldName + "' class='form-contro form-contro-Date validdate form_input customdatefieldchange fielddatecontrol " + item.FieldName + "'/>";
                        }
                    }
                    else {
                        if (requiredvaluetocheck) {
                            vControls += "<input disabled='disabled' type='text' id='" + item.FieldName + "' title='" + item.FieldDisplayName + "' class='form-contro form-contro-Date customdatefieldchange validelement validdate form_input fielddatecontrol " + item.FieldName + "'/>";
                        } else {
                            vControls += "<input disabled='disabled' type='text' id='" + item.FieldName + "' class='form-contro form-contro-Date validdate form_input customdatefieldchange fielddatecontrol " + item.FieldName + "'/>";
                        }
                    }
                }
                else {
                    if (requiredvaluetocheck) {
                        vControls += "<input type='text' id='" + item.FieldName + "' title='" + item.FieldDisplayName + "' class='form-contro form-contro-Date customdatefieldchange validelement validdate form_input fielddatecontrol " + item.FieldName + "'/>";
                    } else {
                        vControls += "<input type='text' id='" + item.FieldName + "' class='form-contro form-contro-Date validdate form_input customdatefieldchange fielddatecontrol " + item.FieldName + "'/>";
                    }
                }
            }
            vDate = item.FieldName;
            if (item.FieldHelp == "true") {
                vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
            }
            vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
            //manoj
            if ($("#hdhMilestoneCapture").text() == "Yes" && item.FieldName != "StartDate" && item.FieldName != "NextEvaluationDate" && item.FieldName != "EndDate" && item.FieldName != "LastSignatureDate") {
                var customdatefieldexsit = false;
                $(CustomDateFieldsXML).find('metadata').each(function () {
                    if (item.FieldName == $(this).find('CustomDateFieldName').text() && (!customdatefieldexsit)) {
                        customdatefieldexsit = true;
                    }
                });
                var status = $(vMetadata).find('Status').text()
                var statusArr = ["Replaced", "Expired", "Cancelled", "Archived"];
                if (!customdatefieldexsit) {
                    if (status != "" && status != null && jQuery.inArray(status, statusArr) == -1)
                        vControls += "<input id='custommile" + item.FieldName + "' class='customdatefiledfeature' onclick='addmilestone(this);' type='checkbox'/><label> Add as milestone </label>";
                    else
                        vControls += "<input id='custommile" + item.FieldName + "' class='customdatefiledfeature' onclick='addmilestone(this);' disabled='disabled' type='checkbox'/><label> Add as milestone </label>";

                } else {
                    vControls += "<input id='custommile" + item.FieldName + "' class='customdatefiledfeature' onclick='addmilestone(this);' checked disabled='disabled' type='checkbox'/><label> Milestone already created for this field </label>";
                }
            }
            //manoj
            vControls += '</div>';
        }
        //if (vDate == "StartDate") {
        //    IsStartDateExists = true;
        //}

    }
    else if (item.FieldType == "Choice") {
        if (item.FieldName == "TransactionType") {
            //ddlTransactionTypes
            vControls += '<div class="col6 m12">';
            if (requiredvaluetocheck) {
                vControls += "<select id='ddlTransactionTypes' name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro validelement'>";
            } else {
                vControls += "<select id='ddlTransactionTypes' name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro'>";
            }

            vControls += "<option value='0'>--Select--</option>";
            if ($(vMetadata).find(item.FieldName).text() == "Buy-Side") {
                vControls += "<option value='Buy-Side' selected>Buy-Side</option>";
            } else {
                vControls += "<option value='Buy-Side'>Buy-Side</option>";
            }
            if ($(vMetadata).find(item.FieldName).text() == "Sell-Side") {
                vControls += "<option value='Sell-Side' selected>Sell-Side</option>";
            } else {
                vControls += "<option value='Sell-Side'>Sell-Side</option>";
            }
            if ($(vMetadata).find(item.FieldName).text() == "Legal/General Agreement") {
                vControls += "<option value='Legal/General Agreement' selected>Legal/General Agreement</option>";
            } else {
                vControls += "<option value='Legal/General Agreement'>Legal/General Agreement</option>";
            }
            vControls += '</select>';
            vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
            vControls += '</div>';
            if (item.FieldHelp == "true") {
                vControls += '<div class="col3 m12">';
                vControls += '<div class="success-input-msg margin-top-8">';
                vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                vControls += '</div>'
                vControls += '</div>'
            }
        } else if (item.FieldName == "ContractClass") {
            //ddlContractClasses
            vControls += '<div class="col6 m12">';
            if (requiredvaluetocheck) {
                vControls += "<select id='ddlContractClasses' name=" + item.FieldName + " title='" + item.FieldDisplayName + "' onchange='changecontractclass(this);' class='form-contro validelement'>";
            } else {
                vControls += "<select id='ddlContractClasses' name=" + item.FieldName + " title='" + item.FieldDisplayName + "' onchange='changecontractclass(this);' class='form-contro'>";
            }

            vControls += "<option value='0'>--Select--</option>";
            if ($(vMetadata).find(item.FieldName).text() == "Individual") {
                vControls += "<option value='Individual' selected>Individual</option>";
            } else {
                vControls += "<option value='Individual'>Individual</option>";
            }
            if ($(vMetadata).find(item.FieldName).text() == "Master Agreement") {
                vControls += "<option value='Master Agreement' selected>Master Agreement</option>";
            } else {
                vControls += "<option value='Master Agreement'>Master Agreement</option>";
            }
            if ($(vMetadata).find(item.FieldName).text() == "Sub-Contract") {
                vControls += "<option value='Sub-Contract' selected>Sub-Contract</option>";
            } else {
                vControls += "<option value='Sub-Contract'>Sub-Contract</option>";
            }

            vControls += '</select>';
            vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
            vControls += '</div>';
            if (item.FieldHelp == "true") {
                vControls += '<div class="col3 m12">';
                vControls += '<div class="success-input-msg margin-top-8">';
                vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                vControls += '</div>'
                vControls += '</div>'
            }
        } else {
            vControls += '<div class="col6 m12">';
            if (item.FieldName == "ContractTermType") {
                if (requiredvaluetocheck) {
                    vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' onchange='changecontracttermtype(this);' class='form-contro validelement'>";
                } else {
                    vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' onchange='changecontracttermtype(this);' class='form-contro'>";
                }
                vControls += "<option value='0' id='termtypeselect'>--Select--</option>";
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contracttermtypesenabled',
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
                        for (var i = 0; i < datalength; i++) {
                            var itemname = data[i];
                            if (itemname.ContractTermName == vContractTermType) {
                                vControls += "<option value='" + itemname.ContractTermName + "' selected>" + itemname.ContractTermDisplayName + "</option>";
                                termtypehelptext = itemname.HelpText;
                            }
                            else
                                vControls += "<option value='" + itemname.ContractTermName + "'>" + itemname.ContractTermDisplayName + "</option>";
                        }
                    }
                });
            }
            else {
                if (requiredvaluetocheck) {
                    vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro choicevaluecheck validelement'>";
                } else {
                    vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro choicevaluecheck'>";
                }
                vControls += "<option value='0'>--Select--</option>";
                var myArray = [];
                myArray = item.ChoiceValues.split("\n")
                var myArraylength = myArray.length;
                for (var j = 0; j < myArraylength; j = j + 1) {
                    do {
                        myArray[j] = myArray[j].replace("&amp;", "&");
                    } while (myArray[j].indexOf("&amp;") > -1)
                    if ($(vMetadata).find(item.FieldName).text() == myArray[j]) {
                        vControls += "<option value='" + myArray[j] + "' selected>" + myArray[j] + "</option>";
                    } else {
                        vControls += "<option value='" + myArray[j] + "'>" + myArray[j] + "</option>";
                    }
                }
            }

            vControls += '</select>';
            if (termtypehelptext == "") {
                vControls += '<label class="col12 p-text text-left help" id="termtypeHelpText">' + item.Description + '</label>';
            }
            else if (item.FieldName == "ContractTermType") {
                vControls += '<label class="col12 p-text text-left help" id="termtypeHelpText">' + termtypehelptext + '</label>';
            }
            vControls += '</div>';
            if (item.FieldHelp == "true") {
                vControls += '<div class="col3 m12">';
                vControls += '<div class="success-input-msg margin-top-8">';
                vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                vControls += '</div>'
                vControls += '</div>'
            }
        }
        if (item.FieldName == "ContractTermType") {
            IsContractTermType = true;
        }
    }
    else if (item.FieldType == "Hyperlink") {
        //manoj
        //for HyperLink
        vControls += '<div class="col6 m12">';
        if (requiredvaluetocheck) {
            vControls += "<input type='text' id=" + item.FieldName + " maxlength='2083' name=" + item.FieldName + " placeholder='http://www.' title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text() + "' class='form-contro validelement validwebsite' />";
        } else {
            vControls += "<input type='text' id=" + item.FieldName + " maxlength='2083' name=" + item.FieldName + " placeholder='http://www.' title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text() + "' class='form-contro validwebsite' />";
        }
        vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
        vControls += '</div>';
        vControls += '<div class="col3 m12">';
        vControls += '<div class="success-input-msg margin-top-8">';
        if (item.FieldHelp == "true") {
            vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
        }
        vControls += '<a href="javascript:void(0)" class="linkText" title="' + item.FieldDisplayName + '" onclick="navigateurl(\'' + item.FieldName + '\')"> Navigate</a>';
        vControls += '</div>'
        vControls += '</div>'
        //for HyperLink
        //manoj
    }
    else if (item.FieldType == "Phone Number") {
        //Vinod

        PhoneCountry = "";
        vControls += '<div class="wid col6 m12">';
        if ($(vMetadata).find(item.FieldName).text() != "") {
            if (requiredvaluetocheck) {
                vControls += "<input type='text' id=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text().split(',')[2] + "' class='form-contro validelement validPhone fieldphonecontrol' />";
            } else {
                vControls += "<input type='text' id=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text().split(',')[2] + "' class='form-contro validPhone fieldphonecontrol' />";
            }
            PhoneCountry = $(vMetadata).find(item.FieldName).text().split(',')[0];
        }
        else {
            if (requiredvaluetocheck) {
                vControls += "<input type='text' id=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro validelement validPhone fieldphonecontrol' />";
            } else {
                vControls += "<input type='text' id=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro validPhone fieldphonecontrol' />";
            }
        }
        vControls += '<input type="hidden" id="Hdn' + item.FieldName + '" name="country" value="' + item.Country + '">';
        vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
        vControls += '</div>';
        vControls += '<div class="col3 m12">';
        vControls += '<div class="success-input-msg margin-top-8">';
        if (item.FieldHelp == "true") {
            vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
        }
        vControls += '</div>'
        vControls += '</div>'
        vPhoneNumber = vControls;
        PhoneID = item.FieldName;
    }
    else if (item.FieldType == "User") {
        vControls += '<div class="col6 m12">';
        if (requiredvaluetocheck) {
            vControls += "<select id=" + item.FieldName + " multiple='multiple' class='form-contro chosenmulti multiselect validselect' name=" + item.FieldName + " title='" + item.FieldDisplayName + "' data-placeholder='--Select--'>"
        } else {
            vControls += "<select id=" + item.FieldName + " multiple='multiple' class='form-contro chosenmulti multiselect' name=" + item.FieldName + " title='" + item.FieldDisplayName + "' data-placeholder='--Select--'>"
        }

        //vControls += "<option value='0'>--Select--</option>";
        vControls += vUserList;

        vControls += '</select>';

        vUser = item.FieldName;
        vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
        vControls += '</div>';
        if (item.FieldHelp == "true") {
            vControls += '<div class="col3 m12">';
            vControls += '<div class="success-input-msg margin-top-8">';
            vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
            vControls += '</div>'
            vControls += '</div>'
        }
    }
    else if (item.FieldType == "Taxonomy") {
        vControls += '<div class="col6 m12">';
        if (requiredvaluetocheck) {
            vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " value='" + $(vMetadata).find(item.FieldName).text() + "' class='form-contro validelement' readonly='readonly' type='text' />";
        } else {
            vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " value='" + $(vMetadata).find(item.FieldName).text() + "' class='form-contro' readonly='readonly' type='text' />";
        }

        if ($(vMetadata).find(item.FieldName).text() != '') {
            selecteditems = $(vMetadata).find(item.FieldName).text().split(';');
            var selecteditemslength = selecteditems.length;
            for (var i = 0; i < selecteditemslength; i++) {

                $('#liSelectedTaxonomy').append('<span style="font-size:11px;">' + selecteditems[i] + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveSelected(this);" style="float:right" /></span>');
            }
        }

        vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
        vControls += '</div>';
        vControls += '<div class="col3 m1">';
        vControls += '<div class="success-input-msg margin-top-8">';
        if (item.FieldHelp == "true") {
            vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
        }
        vControls += "<a href='javascript:void(0)' class='linkText' title='" + item.ChoiceValues + "' id='" + item.FieldName + "' onclick='ViewTaxonomy(this)'> Browse</a>";
        vControls += '</div>';
        vControls += '</div>';
    }
    else if (item.FieldType == "Lookup" || item.FieldType == "Lookup (Multi Select)") {
        if (item.FieldName == "Counterparty") {  // ENH493 Customer inhancment
            var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
            var vAccFeat = $.grep(veContractFeatures, function (n, i) {
                return (n.RowKey == "6" && n.Status == "ON");
            });
            var vreadonly = "";
            var vbrowse = "";
            var vCounterparty = "";
            if (vAccFeat.length > 0) {
                vreadonly = "readonly='readonly'";
                if (thiscontractstatus != "pipeline" && getParameterByName("Duplicate") != "Yes" && IsFullControlUser != true && $(vMetadata).find('IsDraft').text() != "Yes") {
                } else {
                    vbrowse = "<a href='javascript:void(0)' class='linkText' onclick='ViewCounterparty(\"" + item.FieldName + "\")'> Browse</a>";
                }
            }
            vControls += '<div class="col6 m12">';
            var recounterparty = new RegExp("'", 'g');
            //Check the business area mapped counterparty or not
            var counterparty = $(vMetadata).find(item.FieldName).text().replace(recounterparty, "&#39");
            var businessareapath = $(vMetadata).find("BusinessAreaPath").text();
            // var IsBAexistsInCP = true;
            var finalCP = '';
            var CounterpartyLI = '';

            if (counterparty != "undefined" && counterparty != "" && counterparty != null) {
                var AryCounterparty = counterparty.split(';');
                for (var j = 0; j < AryCounterparty.length; j++) {
                    //Counterparty Detail Issue-Manas(Maritz)
                    var itemCounterparty = AryCounterparty[j].replace(/\s+/g, '');//Remove white spaces from string
                    if (finalCP == "") {
                        finalCP = AryCounterparty[j].trim().replace(recounterparty, "&#39");
                        CounterpartyLI += '<li id="' + escape(itemCounterparty) + '" class="clsCounterparties" style="margin: 0 0 5px 0;"><div style="display: inline-block;">' + '<a>' + AryCounterparty[j] + '</a>' + '</div><div style="display: inline-block;padding-left: 10px;"><a href="javascript:void(0)" class="linkText" onclick="ViewCounterpartyDetails(\'' + itemCounterparty + '\')"> View Details</a></div>' + '  <a href=javascript:void(0)  >' + '<img src="/Content/Images/icon/delete.png" onclick="removeCounterParty(this)" title="Remove">' + '</a>' + '</li>';
                    }
                    else {
                        finalCP += "; " + AryCounterparty[j].trim().replace(recounterparty, "&#39");
                        CounterpartyLI += '<li id="' + escape(itemCounterparty) + '" class="clsCounterparties" style="margin: 0 0 5px 0;"><div style="display: inline-block;">' + '<a>' + AryCounterparty[j] + '</a>' + '</div><div style="display: inline-block;padding-left: 10px;"><a href="javascript:void(0)" class="linkText" onclick="ViewCounterpartyDetails(\'' + itemCounterparty + '\')"> View Details</a></div>' + '  <a href=javascript:void(0)  >' + '<img src="/Content/Images/icon/delete.png" onclick="removeCounterParty(this)" title="Remove">' + '</a>' + '</li>';
                    }
                    //if (AllCounterparties != null && AllCounterparties != "") {
                    //    var newItem = $.grep(AllCounterparties, function (p) {
                    //        return p.CounterpartyName == AryCounterparty[j].trim().replace(recounterparty, "&#39");
                    //    }).map(function (p) { return p })
                    //    //$(AryCounterparty).each(function (i, item) { //Bug id :eO37627
                    //    if (AryCounterparty[j] != '') {
                    //        var itemCounterparty = AryCounterparty[j].replace(/\s+/g, '');//Remove white spaces from string
                    //        if (AllCounterparties.length > 0) {
                    //            vCounterparty = $.grep(AllCounterparties, function (n, i) {
                    //                return (n.CounterpartyName.replace(/\s+/g, '').toLowerCase() == itemCounterparty.toLowerCase());
                    //            });
                    //        }
                    //    }
                    //    //});
                    //    if (newItem.length > 0) {
                    //        if (newItem[0].IsGlobal == "No") {
                    //            if (newItem[0].BusinessAreasPath != "undefined" && newItem[0].BusinessAreasPath != "") {
                    //                var contractarea = "";
                    //                var Businesssarea = "";
                    //                var splitbusinessPath = newItem[0].BusinessAreasPath.split(';');
                    //                //$(splitbusinessPath).each(function (index) {
                    //                for (var i = 0; i < splitbusinessPath.length; i++) {
                    //                    if (splitbusinessPath[i] != null && splitbusinessPath[i] != "") {

                    //                        if (splitbusinessPath[i] == businessareapath) {
                    //                            if (finalCP == "") {
                    //                                finalCP = AryCounterparty[j].trim().replace(recounterparty, "&#39");
                    //                                if (vCounterparty != null && vCounterparty != "" && vCounterparty.length > 0)
                    //                                    CounterpartyLI += '<li id="' + escape(itemCounterparty) + '" class="clsCounterparties" style="margin: 0 0 5px 0;"><div style="display: inline-block;">' + '<a>' + AryCounterparty[j] + '</a>' + '</div><div style="display: inline-block;padding-left: 10px;"><a href="javascript:void(0)" class="linkText" onclick="ViewCounterpartyDetails(\'' + itemCounterparty + '\')"> View Details</a></div>' + '  <a href=javascript:void(0)  >' + '<img src="/Content/Images/icon/delete.png" onclick="removeCounterParty(this)" title="Remove">' + '<a>' + '</li>';
                    //                                else
                    //                                    CounterpartyLI += '<li id="' + escape(itemCounterparty) + '" class="clsCounterparties" style="margin: 0 0 5px 0;"><div style="display: inline-block;">' + '<a style="color: #6a6a6a !important;">' + AryCounterparty[j] + '</a>' + '</div><div style="display: inline-block;padding-left: 10px;"><a href="javascript:void(0)" class="linkText" onclick="ViewCounterpartyDetails(\'' + itemCounterparty + '\')"> View Details</a></div>' + '  <a href=javascript:void(0)  >' + '<img src="/Content/Images/icon/delete.png" onclick="removeCounterParty(this)" title="Remove">' + '<a>' + '</li>';
                    //                                //CounterpartyLI += '<li id=' + escape(AryCounterparty[j]) + ' style="margin: 0 0 5px 0;"><div style="display: inline-block;">' +'<a>' + AryCounterparty[j].trim().replace(recounterparty, "&#39") +'</a>' + '</div><div style="display: inline-block;padding-left: 10px;"><a href="javascript:void(0)" class="linkText" onclick="ViewCounterpartyDetails(\'' + escape(AryCounterparty[j]) + '\')"> View Details</a></div>' + '  <a href=javascript:void(0)  >' + '<img src="/Content/Images/icon/delete.png" onclick="removeCounterParty(' + '\'' + AryCounterparty[j] + '\'' + ')" title="Remove">' + '<a>' + '</li>';
                    //                            }
                    //                            else {
                    //                                finalCP += "; " + AryCounterparty[j].trim().replace(recounterparty, "&#39");
                    //                                if (vCounterparty != null && vCounterparty != "" && vCounterparty.length > 0)
                    //                                    CounterpartyLI += '<li id="' + escape(itemCounterparty) + '" class="clsCounterparties" style="margin: 0 0 5px 0;"><div style="display: inline-block;">' + '<a>' + AryCounterparty[j] + '</a>' + '</div><div style="display: inline-block;padding-left: 10px;"><a href="javascript:void(0)" class="linkText" onclick="ViewCounterpartyDetails(\'' + itemCounterparty + '\')"> View Details</a></div>' + '  <a href=javascript:void(0)  >' + '<img src="/Content/Images/icon/delete.png" onclick="removeCounterParty(this)" title="Remove">' + '<a>' + '</li>';
                    //                                else
                    //                                    CounterpartyLI += '<li id="' + escape(itemCounterparty) + '" class="clsCounterparties" style="margin: 0 0 5px 0;"><div style="display: inline-block;">' + '<a style="color: #6a6a6a !important;">' + AryCounterparty[j] + '</a>' + '</div><div style="display: inline-block;padding-left: 10px;"><a href="javascript:void(0)" class="linkText" onclick="ViewCounterpartyDetails(\'' + itemCounterparty + '\')"> View Details</a></div>' + '  <a href=javascript:void(0)  >' + '<img src="/Content/Images/icon/delete.png" onclick="removeCounterParty(this)" title="Remove">' + '<a>' + '</li>';
                    //                            }
                    //                        }


                    //                    }
                    //                }
                    //            }

                    //        }
                    //        else {
                    //            if (finalCP == "") {
                    //                finalCP = AryCounterparty[j].trim().replace(recounterparty, "&#39");
                    //                if (vCounterparty != null && vCounterparty != "" && vCounterparty.length > 0)
                    //                    CounterpartyLI += '<li id="' + escape(itemCounterparty) + '" class="clsCounterparties" style="margin: 0 0 5px 0;"><div style="display: inline-block;">' + '<a>' + AryCounterparty[j] + '</a>' + '</div><div style="display: inline-block;padding-left: 10px;"><a href="javascript:void(0)" class="linkText" onclick="ViewCounterpartyDetails(\'' + itemCounterparty + '\')"> View Details</a></div>' + '  <a href=javascript:void(0)  >' + '<img src="/Content/Images/icon/delete.png" onclick="removeCounterParty(this)" title="Remove">' + '<a>' + '</li>';
                    //                else
                    //                    CounterpartyLI += '<li id="' + escape(itemCounterparty) + '" class="clsCounterparties" style="margin: 0 0 5px 0;"><div style="display: inline-block;">' + '<a style="color: #6a6a6a !important;">' + AryCounterparty[j] + '</a>' + '</div><div style="display: inline-block;padding-left: 10px;"><a href="javascript:void(0)" class="linkText" onclick="ViewCounterpartyDetails(\'' + itemCounterparty + '\')"> View Details</a></div>' + '  <a href=javascript:void(0)  >' + '<img src="/Content/Images/icon/delete.png" onclick="removeCounterParty(this)" title="Remove">' + '<a>' + '</li>';
                    //                //CounterpartyLI += '<li id=' + escape(AryCounterparty[j]) + ' style="margin: 0 0 5px 0;"><div style="display: inline-block;">' + '<a>' + AryCounterparty[j].trim().replace(recounterparty, "&#39") + '</a>' + '</div><div style="display: inline-block;padding-left: 10px;"><a href="javascript:void(0)" class="linkText" onclick="ViewCounterpartyDetails(\'' + escape(AryCounterparty[j]) + '\')"> View Details</a></div>' + '  <a href=javascript:void(0)  >' + '<img src="/Content/Images/icon/delete.png" onclick="removeCounterParty(' + '\'' + AryCounterparty[j] + '\'' + ')" title="Remove">' + '<a>' + '</li>';
                    //            }
                    //            else {
                    //                finalCP += "; " + AryCounterparty[j].trim().replace(recounterparty, "&#39");
                    //                if (vCounterparty != null && vCounterparty != "" && vCounterparty.length > 0)
                    //                    CounterpartyLI += '<li id="' + escape(itemCounterparty) + '" class="clsCounterparties" style="margin: 0 0 5px 0;"><div style="display: inline-block;">' + '<a>' + AryCounterparty[j] + '</a>' + '</div><div style="display: inline-block;padding-left: 10px;"><a href="javascript:void(0)" class="linkText" onclick="ViewCounterpartyDetails(\'' + itemCounterparty + '\')"> View Details</a></div>' + '  <a href=javascript:void(0)  >' + '<img src="/Content/Images/icon/delete.png" onclick="removeCounterParty(this)" title="Remove">' + '<a>' + '</li>';
                    //                else
                    //                    CounterpartyLI += '<li id="' + escape(itemCounterparty) + '" class="clsCounterparties" style="margin: 0 0 5px 0;"><div style="display: inline-block;">' + '<a style="color: #6a6a6a !important;">' + AryCounterparty[j] + '</a>' + '</div><div style="display: inline-block;padding-left: 10px;"><a href="javascript:void(0)" class="linkText" onclick="ViewCounterpartyDetails(\'' + itemCounterparty + '\')"> View Details</a></div>' + '  <a href=javascript:void(0)  >' + '<img src="/Content/Images/icon/delete.png" onclick="removeCounterParty(this)" title="Remove">' + '<a>' + '</li>';
                    //            }
                    //        }
                    //    }
                    //    else {
                    //        if (finalCP == "") {
                    //            finalCP = AryCounterparty[j].trim().replace(recounterparty, "&#39");
                    //            if (vCounterparty != null && vCounterparty != "" && vCounterparty.length > 0)
                    //                CounterpartyLI += '<li id="' + escape(itemCounterparty) + '" class="clsCounterparties" style="margin: 0 0 5px 0;"><div style="display: inline-block;">' + '<a>' + AryCounterparty[j] + '</a>' + '</div><div style="display: inline-block;padding-left: 10px;"><a href="javascript:void(0)" class="linkText" onclick="ViewCounterpartyDetails(\'' + itemCounterparty + '\')"> View Details</a></div>' + '  <a href=javascript:void(0)  >' + '<img src="/Content/Images/icon/delete.png" onclick="removeCounterParty(this)" title="Remove">' + '<a>' + '</li>';
                    //            else
                    //                CounterpartyLI += '<li id="' + escape(itemCounterparty) + '" class="clsCounterparties" style="margin: 0 0 5px 0;"><div style="display: inline-block;">' + '<a style="color: #6a6a6a !important;">' + AryCounterparty[j] + '</a>' + '</div><div style="display: inline-block;padding-left: 10px;"><a href="javascript:void(0)" class="linkText" onclick="ViewCounterpartyDetails(\'' + itemCounterparty + '\')"> View Details</a></div>' + '  <a href=javascript:void(0)  >' + '<img src="/Content/Images/icon/delete.png" onclick="removeCounterParty(this)" title="Remove">' + '<a>' + '</li>';
                    //        }
                    //        else {
                    //            finalCP += "; " + AryCounterparty[j].trim().replace(recounterparty, "&#39");
                    //            if (vCounterparty != null && vCounterparty != "" && vCounterparty.length > 0)
                    //                CounterpartyLI += '<li id="' + escape(itemCounterparty) + '" class="clsCounterparties" style="margin: 0 0 5px 0;"><div style="display: inline-block;">' + '<a>' + AryCounterparty[j] + '</a>' + '</div><div style="display: inline-block;padding-left: 10px;"><a href="javascript:void(0)" class="linkText" onclick="ViewCounterpartyDetails(\'' + itemCounterparty + '\')"> View Details</a></div>' + '  <a href=javascript:void(0)  >' + '<img src="/Content/Images/icon/delete.png" onclick="removeCounterParty(this)" title="Remove">' + '<a>' + '</li>';
                    //            else
                    //                CounterpartyLI += '<li id="' + escape(itemCounterparty) + '" class="clsCounterparties" style="margin: 0 0 5px 0;"><div style="display: inline-block;">' + '<a style="color: #6a6a6a !important;">' + AryCounterparty[j] + '</a>' + '</div><div style="display: inline-block;padding-left: 10px;"><a href="javascript:void(0)" class="linkText" onclick="ViewCounterpartyDetails(\'' + itemCounterparty + '\')"> View Details</a></div>' + '  <a href=javascript:void(0)  >' + '<img src="/Content/Images/icon/delete.png" onclick="removeCounterParty(this)" title="Remove">' + '<a>' + '</li>';
                    //        }
                    //    }
                    //}
                    //else {
                    //    if (finalCP == "") {

                    //        finalCP = AryCounterparty[j].trim().replace(recounterparty, "&#39");
                    //        if (vCounterparty != null && vCounterparty != "" && vCounterparty.length > 0)
                    //            CounterpartyLI += '<li id="' + escape(itemCounterparty) + '" class="clsCounterparties" style="margin: 0 0 5px 0;"><div style="display: inline-block;">' + '<a>' + AryCounterparty[j] + '</a>' + '</div><div style="display: inline-block;padding-left: 10px;"><a href="javascript:void(0)" class="linkText" onclick="ViewCounterpartyDetails(\'' + itemCounterparty + '\')"> View Details</a></div>' + '  <a href=javascript:void(0)  >' + '<img src="/Content/Images/icon/delete.png" onclick="removeCounterParty(this)" title="Remove">' + '<a>' + '</li>';
                    //        else
                    //            CounterpartyLI += '<li id="' + escape(itemCounterparty) + '" class="clsCounterparties" style="margin: 0 0 5px 0;"><div style="display: inline-block;">' + '<a style="color: #6a6a6a !important;">' + AryCounterparty[j] + '</a>' + '</div><div style="display: inline-block;padding-left: 10px;"><a href="javascript:void(0)" class="linkText" onclick="ViewCounterpartyDetails(\'' + itemCounterparty + '\')"> View Details</a></div>' + '  <a href=javascript:void(0)  >' + '<img src="/Content/Images/icon/delete.png" onclick="removeCounterParty(this)" title="Remove">' + '<a>' + '</li>';
                    //    }
                    //    else {
                    //        finalCP += "; " + AryCounterparty[j].trim().replace(recounterparty, "&#39");
                    //        if (vCounterparty != null && vCounterparty != "" && vCounterparty.length > 0)
                    //            CounterpartyLI += '<li id="' + escape(itemCounterparty) + '" class="clsCounterparties" style="margin: 0 0 5px 0;"><div style="display: inline-block;">' + '<a>' + AryCounterparty[j] + '</a>' + '</div><div style="display: inline-block;padding-left: 10px;"><a href="javascript:void(0)" class="linkText" onclick="ViewCounterpartyDetails(\'' + itemCounterparty + '\')"> View Details</a></div>' + '  <a href=javascript:void(0)  >' + '<img src="/Content/Images/icon/delete.png" onclick="removeCounterParty(this)" title="Remove">' + '<a>' + '</li>';
                    //        else
                    //            CounterpartyLI += '<li id="' + escape(itemCounterparty) + '" class="clsCounterparties" style="margin: 0 0 5px 0;"><div style="display: inline-block;">' + '<a style="color: #6a6a6a !important;">' + AryCounterparty[j] + '</a>' + '</div><div style="display: inline-block;padding-left: 10px;"><a href="javascript:void(0)" class="linkText" onclick="ViewCounterpartyDetails(\'' + itemCounterparty + '\')"> View Details</a></div>' + '  <a href=javascript:void(0)  >' + '<img src="/Content/Images/icon/delete.png" onclick="removeCounterParty(this)" title="Remove">' + '<a>' + '</li>';
                    //    }
                    //}

                    //Counterparty Detail Issue-Manas(Maritz)
                }
            }

            if (requiredvaluetocheck) {
                if (thiscontractstatus != "pipeline" && getParameterByName("Duplicate") != "Yes" && IsFullControlUser != true) {
                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " value='" + finalCP + "' class='form-contro validelement' " + vreadonly + " disabled type='text' style='display:none'/>";
                    vControls += "<ul id='counterpartyUL'>" + CounterpartyLI + "</ul>";
                } else {

                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " value='" + finalCP + "' class='form-contro validelement' " + vreadonly + " type='text' style='display:none'/>";
                    vControls += "<ul id='counterpartyUL'>" + CounterpartyLI + "</ul>";
                }

            } else {

                if (thiscontractstatus != "pipeline" && getParameterByName("Duplicate") != "Yes" && IsFullControlUser != true) {

                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " value='" + finalCP + "' class='form-contro' " + vreadonly + " disabled type='text' style='display:none'/>";
                    vControls += "<ul id='counterpartyUL'>" + CounterpartyLI + "</ul>";
                }
                else {
                    if ($(vMetadata).find(item.FieldName).text() == "") {
                        vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " value='" + finalCP + "' class='form-contro' " + vreadonly + " type='text' style='display:none'/>";//eO311158
                    }
                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " value='" + finalCP + "' class='form-contro' " + vreadonly + " type='text' style='display:none'/>";
                    vControls += "<ul id='counterpartyUL'>" + CounterpartyLI + "</ul>";
                }
            }
            vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
            vControls += '</div>';
            vControls += '<div class="col3 m1">';
            vControls += '<div class="success-input-msg margin-top-8">';
            if (item.FieldHelp == "true") {
                vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
            }
            vControls += vbrowse;
            vControls += '</div>';
            vControls += '</div>';

        }
        else if (item.FieldName == "CompanyProfile") {
            var vreadonlyCP = "readonly='readonly'";
            var vbrowseCP = "";
            if (thiscontractstatus != "pipeline" && getParameterByName("Duplicate") != "Yes" && IsFullControlUser != true) {
                // vbrowse = "<a href='javascript:void(0)' class='linkText disable-control' onclick='ViewCounterparty()'> Browse</a>";
            } else {
                vbrowseCP = "<a href='javascript:void(0)' class='linkText' onclick='ViewLegalEntity()'> Browse</a>";
            }

            vControls += '<div class="col6 m12">';
            var reLE = new RegExp("'", 'g');

            var LE = $(vMetadata).find(item.FieldName).text().replace(reLE, "&#39");
            var finalCP = '';
            if (LE != "undefined" && LE != "" && LE != null) {
                var AryLE = LE.split(';');
                for (var j = 0; j < AryLE.length; j++) {
                    if (finalCP == "")
                        finalCP = AryLE[j].trim().replace(reLE, "&#39");
                    else
                        finalCP += "; " + AryLE[j].trim().replace(reLE, "&#39");
                }
            }
            if (requiredvaluetocheck) {
                if (thiscontractstatus != "pipeline" && getParameterByName("Duplicate") != "Yes" && IsFullControlUser != true) {
                    // vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " value='" + $(vMetadata).find(item.FieldName).text().replace(recounterparty, "&#39") + "' class='form-contro validelement' " + vreadonly + " disabled type='text' />";
                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " value='" + finalCP + "' class='form-contro validelement' " + vreadonlyCP + " disabled type='text' />";

                } else {

                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " value='" + finalCP + "' class='form-contro validelement' " + vreadonlyCP + " type='text' />";

                }

            } else {
                if (thiscontractstatus != "pipeline" && getParameterByName("Duplicate") != "Yes" && IsFullControlUser != true) {
                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " value='" + finalCP + "' class='form-contro' " + vreadonlyCP + " disabled type='text' />";
                }
                else {

                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " value='" + finalCP + "' class='form-contro' " + vreadonlyCP + " type='text' />";

                }
            }

            vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
            vControls += '</div>';
            vControls += '<div class="col3 m1">';
            vControls += '<div class="success-input-msg margin-top-8">';
            if (item.FieldHelp == "true") {
                vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
            }
            vControls += vbrowseCP;
            vControls += '</div>';
            vControls += '</div>';
        }
            //else if (item.FieldName == "CompanyProfile") {
            //    vControls += '<div class="col6 m12">';
            //    if (requiredvaluetocheck) {
            //        if (thiscontractstatus != "pipeline" && getParameterByName("Duplicate") != "Yes") {
            //            vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " onchange='javascript:Removetextvalues()' class='form-contro validelement' disabled='disabled'>";
            //        } else {
            //            vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " onchange='javascript:Removetextvalues()' class='form-contro validelement'>";
            //        }
            //    } else {
            //        if (thiscontractstatus != "pipeline" && getParameterByName("Duplicate") != "Yes") {
            //            vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " onchange='javascript:Removetextvalues()' class='form-contro' disabled='disabled'>";
            //        } else {
            //            vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " onchange='javascript:Removetextvalues()' class='form-contro'>";
            //        }
            //    }
            //    vControls += "<option value='0'>--Select--</option>";
            //    SelectedLegalEntity = (typeof ($(vMetadata).find(item.FieldName).text()) != 'undefined' && $(vMetadata).find(item.FieldName).text() != null && $(vMetadata).find(item.FieldName).text() != "" && $(vMetadata).find(item.FieldName).text() != '--Select--') ? $(vMetadata).find(item.FieldName).text() : SelectedLegalEntity;
            //    vControls += getcompanyprofile($(vMetadata).find(item.FieldName).text()) + "</select>";
            //    vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
            //    vControls += '</div>';
            //    if (item.FieldHelp == "true") {
            //        vControls += '<div class="col3 m12">';
            //        vControls += '<div class="success-input-msg margin-top-8">';
            //        vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
            //        vControls += '</div>'
            //        vControls += '</div>'
            //    }
            //}
        else if (item.FieldName == "ContractPricingType") {
            vControls += '<div class="col6 m12">';
            if (requiredvaluetocheck) {
                vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " class='form-contro choicevaluecheck validelement'>";
            } else {
                vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " class='form-contro choicevaluecheck'>";
            }
            vControls += "<option value='0'>--Select--</option>";
            getcontractpricingtype($(vMetadata).find(item.FieldName).text());
            vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
            vControls += '</div>';
            if (item.FieldHelp == "true") {
                vControls += '<div class="col3 m12">';
                vControls += '<div class="success-input-msg margin-top-8">';
                vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                vControls += '</div>'
                vControls += '</div>'
            }
        }
        else if (item.FieldName == "BillingFrequency") {
            vControls += '<div class="col6 m12">';
            if (requiredvaluetocheck) {
                vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " class='form-contro choicevaluecheck validelement'>";
            } else {
                vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " class='form-contro choicevaluecheck'>";
            }
            vControls += "<option value='0'>--Select--</option>";
            getbillingfrequency($(vMetadata).find(item.FieldName).text());
            vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
            vControls += '</div>';
            if (item.FieldHelp == "true") {
                vControls += '<div class="col3 m12">';
                vControls += '<div class="success-input-msg margin-top-8">';
                vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                vControls += '</div>'
                vControls += '</div>'
            }
        }
        else if (item.FieldName == "AreasofModification" || item.FieldName == "SendNoticesfor" || item.FieldName == "ProcurementCategory" || item.FieldName == "RemediesorDamages") {
            var oLookupName = "";
            if (item.FieldName == "AreasofModification")
                oLookupName = "Area of Modification / Deviation";
            else if (item.FieldName == "SendNoticesfor")
                oLookupName = "Send Notices for";
            else if (item.FieldName == "ProcurementCategory")
                oLookupName = "Procurement Category";
            else if (item.FieldName == "RemediesorDamages")
                oLookupName = "Remedies / Damages";

            vControls += '<div class="col6 m12">';
            if (requiredvaluetocheck) {
                vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' multiple='multiple' class='form-contro chosenmulti validselect' data-placeholder='--Select--'>";
            } else {
                vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' multiple='multiple' class='form-contro chosenmulti' data-placeholder='--Select--'>";
            }
            getstandardLookupValues(oLookupName, item.FieldName, $(vMetadata).find(item.FieldName).text());
            vControls += '</select>';
            vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
            vControls += '</div>';

            if (item.FieldHelp == "true") {
                vControls += '<div class="col3 m12">';
                vControls += '<div class="success-input-msg margin-top-8">';
                vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                vControls += '</div>'
                vControls += '</div>'
            }
        }
        else if (item.FieldName == "Status") {
            vControls += '<div class="col6 m12">';
            if (requiredvaluetocheck) {
                vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " class='form-contro choicevaluecheck validelement'>";
            } else {
                vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " class='form-contro choicevaluecheck'>";
            }
            vControls += "<option value='0'>--Select--</option>";
            vControls += getStatus($(vMetadata).find(item.FieldName).text()) + "</select>";
            vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
            vControls += '</div>';
            if (item.FieldHelp == "true") {
                vControls += '<div class="col3 m12">';
                vControls += '<div class="success-input-msg margin-top-8">';
                vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                vControls += '</div>'
                vControls += '</div>'
            }
        }
        else if (item.FieldName == "OriginatingParty") {
            vControls += '<div class="col6 m12">';
            if (requiredvaluetocheck) {
                if (thiscontractstatus != "pipeline" && getParameterByName("Duplicate") != "Yes" && IsFullControlUser != true)
                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " value='" + $(vMetadata).find(item.FieldName).text() + "' disabled class='form-contro validelement' readonly='readonly' type='text' />";
                else
                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " value='" + $(vMetadata).find(item.FieldName).text() + "' class='form-contro validelement' readonly='readonly' type='text' />";

            } else {
                if (thiscontractstatus != "pipeline" && getParameterByName("Duplicate") != "Yes" && IsFullControlUser != true)
                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " value='" + $(vMetadata).find(item.FieldName).text() + "' disabled class='form-contro' readonly='readonly' type='text' />";
                else
                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " value='" + $(vMetadata).find(item.FieldName).text() + "' class='form-contro' readonly='readonly' type='text' />";
            }
            if ($(vMetadata).find(item.FieldName).text() == "") {

            } else {

                $("#txtOriginatingPartyType").val($(vMetadata).find("OriginatingPartyType").text());
                if ($(vMetadata).find("OriginatingPartyType").text() == "Counterparty") {
                    SelectCounterparties();
                }
            }
            vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
            vControls += '</div>';
            vControls += '<div class="col3 m1">';
            vControls += '<div class="success-input-msg margin-top-8">';
            if (item.FieldHelp == "true") {
                vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
            }
            if (thiscontractstatus != "pipeline" && getParameterByName("Duplicate") != "Yes" && IsFullControlUser != true) {
            } else {
                vControls += "<a href='javascript:void(0)' class='linkText' onclick='ViewOriginatingParty()'> Browse</a></div>";
            }
            vControls += '</div>';
            vControls += '</div>';
        }
        else if (item.FieldName == "ContractCurrency") {

        } else if (item.FieldName == "Project") {
            vProject = true;
            vControls += '<div class="col6 m11">';
            if (requiredvaluetocheck) {
                vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text() + "' class='form-contro validelement' readonly='readonly' type='text' />";
            } else {
                vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text() + "' class='form-contro' readonly='readonly' type='text' />";
            }
            vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
            vControls += '</div>';
            vControls += '<div class="col3 m1">';
            vControls += '<div class="success-input-msg margin-top-8">';
            if (item.FieldHelp == "true") {
                vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
            }
            vControls += "<a href='javascript:void(0)' class='linkText' onclick='ViewProjects()'> Browse</a>";
            vControls += '</div>';
            vControls += '</div>';

            projectManager = $(vMetadata).find("ProjectManager").text()
        } else if (item.FieldName == "PaymentType") {
            vControls += '<div class="col6 m12">';
            if (requiredvaluetocheck) {
                vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " class='form-contro choicevaluecheck validelement'>";
            } else {
                vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " class='form-contro choicevaluecheck'>";
            }
            vControls += "<option value='0'>--Select--</option>";
            getpaymenttype($(vMetadata).find(item.FieldName).text());
            vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
            vControls += '</div>';
            if (item.FieldHelp == "true") {
                vControls += '<div class="col3 m12">';
                vControls += '<div class="success-input-msg margin-top-8">';
                vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                vControls += '</div>'
                vControls += '</div>'
            }
        } else if (item.FieldName == "LicenceType") {
            vControls += '<div class="col6 m12">';
            if (requiredvaluetocheck) {
                vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " class='form-contro choicevaluecheck validelement'>";
            } else {
                vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " class='form-contro choicevaluecheck'>";
            }
            vControls += "<option value='0'>--Select--</option>";
            getlicencetype($(vMetadata).find(item.FieldName).text());
            vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
            vControls += '</div>';
            if (item.FieldHelp == "true") {
                vControls += '<div class="col3 m12">';
                vControls += '<div class="success-input-msg margin-top-8">';
                vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                vControls += '</div>'
                vControls += '</div>'
            }
        }
        else if (item.FieldName == "RelatedContracts") {
            vControls += '<div class="col6 m11">';
            oldRelatedcontract = $(vMetadata).find(item.FieldName).text();
            if (oldRelatedcontract != "") {
                SavedRelatedContract = [];
                $.each(oldRelatedcontract.split(";"), function () {
                    if (this != "") {
                        if ($.trim(this) != "") {
                            SavedRelatedContract.push($.trim(this));
                        }
                    }
                });
                oldRelatedcontract = SavedRelatedContract.join("; ");
            }
            if (requiredvaluetocheck) {
                vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text().replace(/'/g, "&#39;") + "' class='form-contro validelement' readonly='readonly' type='text' />";
            } else {
                vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text().replace(/'/g, "&#39;") + "' class='form-contro' readonly='readonly' type='text' />";
            }
            vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
            vControls += '</div>';
            vControls += '<div class="col3 m1">';
            vControls += '<div class="success-input-msg margin-top-8">';
            if (item.FieldHelp == "true") {
                vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
            }
            vControls += "<a href='javascript:void(0)' class='linkText' onclick='ViewRelatedContracts()'> Browse</a>";
            vControls += '</div>';
            vControls += '</div>';
        }
        else if (item.FieldName == "RelatedRequests") {
            vControls += '<div class="col6 m11">';
            if (requiredvaluetocheck) {
                vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "'  value='" + $(vMetadata).find(item.FieldName).text() + "' class='form-contro validelement' readonly='readonly' type='text' />";
            } else {
                vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "'  value='" + $(vMetadata).find(item.FieldName).text() + "' class='form-contro' readonly='readonly' type='text' />";
            }
            vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
            vControls += '</div>';
            vControls += '<div class="col3 m1">';
            vControls += '<div class="success-input-msg margin-top-8">';
            if (item.FieldHelp == "true") {
                vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
            }
            vControls += "<a href='javascript:void(0)' class='linkText' onclick='ViewRelatedRequest()'> Browse</a>";
            vControls += '</div>';
            vControls += '</div>';
        }
        else {
            vControls += '<div class="col6 m12">';
            if (requiredvaluetocheck) {
                vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro choicevaluecheck validelement'>";
            } else {
                vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro choicevaluecheck'>";
            }
            vControls += "<option value='0'>--Select--</option>";
            vControls += '</select>';
            vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
            vControls += '</div>';

            if (item.FieldHelp == "true") {
                vControls += '<div class="col3 m12">';
                vControls += '<div class="success-input-msg margin-top-8">';
                vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                vControls += '</div>'
                vControls += '</div>'
            }

            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/customlookupvaluedetails?lookupname=' + item.ChoiceValues,
                type: 'GET',
                dataType: 'json',
                "Content-Type": "application/json",
                headers: {
                    'eContracts-ApiKey': localStorage.APIKey
                },
                cache: false,
                success: function (data) {
                    var datalength1 = data.LookupFields.split(';');
                    datalength1 = datalength1.sort();
                    datalength1 = sortArrOfObjectsByParam(datalength1);
                    var datalength = datalength1.length;
                    for (var i = 0; i < datalength; i++) {
                        var itemname = datalength1[i];

                        if (itemname == $(vMetadata).find(item.FieldName).text()) {
                            $("#" + item.FieldName).append("<option value='" + itemname + "' selected='selected'>" + itemname + "</option>")
                        } else {
                            $("#" + item.FieldName).append("<option value='" + itemname + "'>" + itemname + "</option>")
                        }
                    }
                }
            });

        }

    }
    else if (item.FieldType.indexOf("Dropdown") > -1 || item.FieldType.indexOf("Multi Select") > -1) {
        if (item.FieldType.indexOf("Dropdown") > -1) {
            vControls += '<div class="col6 m12">';
            if (requiredvaluetocheck) {
                vControls += "<select id=" + item.FieldName + " multiple='multiple' class='form-contro width90 chosenmulti validselect' name=" + item.FieldName + " title='" + item.FieldDisplayName + "' data-placeholder='--Select--'>"
            } else {
                vControls += "<select id=" + item.FieldName + " multiple='multiple' class='form-contro width90 chosenmulti' name=" + item.FieldName + " title='" + item.FieldDisplayName + "' data-placeholder='--Select--'>"
            }
            var vMultiDDL1 = "";
            if (vMultiDDL1 == '') {
                var myArray = [];
                myArray = item.ChoiceValues.split("\n")
                var myArraylength = myArray.length;
                for (var i = 0; i < myArraylength; i = i + 1) {
                    vMultiDDL1 += "<option value='" + myArray[i] + "'>" + myArray[i] + "</option>";
                }
            }
            vControls += vMultiDDL1;
            vControls += '</select>';
            vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
            vControls += '</div>';
            if (item.FieldHelp == "true") {
                vControls += '<div class="col3 m12">';
                vControls += '<div class="success-input-msg margin-top-8">';
                vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                vControls += '</div>'
                vControls += '</div>'
            }
            vMultiDDL = item.FieldName;
        } else {
            if (item.ChoiceValues == "Counterparty") {

                //var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
                //var vAccFeat = $.grep(veContractFeatures, function (n, i) {
                //    return (n.RowKey == "6" && n.Status == "ON");
                //});
                //var vreadonly = "";
                //var vbrowse = "";
                //if (vAccFeat.length > 0) {
                //    vreadonly = "readonly='readonly'";
                //    vbrowse = "<a href='javascript:void(0)' class='linkText' onclick='ViewCounterparty(\"" + item.FieldName + "\")'> Browse</a>";
                //}
                //vControls += '<div class="col6 m12">';
                //var recounterparty = new RegExp("'", 'g');
                ////Check the business area mapped counterparty or not
                //var counterparty = $(vMetadata).find(item.FieldName).text().replace(recounterparty, "&#39");
                //var businessareapath = $(vMetadata).find("BusinessAreaPath").text();
                //// var IsBAexistsInCP = true;
                //var finalCP = '';
                //if (counterparty != "undefined" && counterparty != "" && counterparty != null) {
                //    var AryCounterparty = counterparty.split(';');
                //    for (var j = 0; j < AryCounterparty.length; j++) {
                //        if (AllCounterparties != null && AllCounterparties != "") {
                //            var newItem = $.grep(AllCounterparties, function (p) { return p.CounterpartyName == AryCounterparty[j].trim().replace(recounterparty, "&#39"); })
                //         .map(function (p) { return p })
                //            if (newItem.length > 0) {
                //                if (newItem[0].IsGlobal == "No") {
                //                    if (newItem[0].BusinessAreasPath != "undefined" && newItem[0].BusinessAreasPath != "") {
                //                        var contractarea = "";
                //                        var Businesssarea = "";
                //                        var splitbusinessPath = newItem[0].BusinessAreasPath.split(';');
                //                        //$(splitbusinessPath).each(function (index) {
                //                        for (var i = 0; i < splitbusinessPath.length; i++) {
                //                            if (splitbusinessPath[i] != null && splitbusinessPath[i] != "") {

                //                                if (splitbusinessPath[i] == businessareapath) {
                //                                    if (finalCP == "")
                //                                        finalCP = AryCounterparty[j].trim().replace(recounterparty, "&#39");
                //                                    else
                //                                        finalCP += "; " + AryCounterparty[j].trim().replace(recounterparty, "&#39");
                //                                }


                //                            }
                //                        }
                //                    }

                //                }
                //                else {
                //                    if (finalCP == "")
                //                        finalCP = AryCounterparty[j].trim().replace(recounterparty, "&#39");
                //                    else
                //                        finalCP += "; " + AryCounterparty[j].trim().replace(recounterparty, "&#39");
                //                }
                //            }
                //            else {
                //                if (finalCP == "")
                //                    finalCP = AryCounterparty[j].trim().replace(recounterparty, "&#39");
                //                else
                //                    finalCP += "; " + AryCounterparty[j].trim().replace(recounterparty, "&#39");
                //            }
                //        } else {
                //            if (finalCP == "")
                //                finalCP = AryCounterparty[j].trim().replace(recounterparty, "&#39");
                //            else
                //                finalCP += "; " + AryCounterparty[j].trim().replace(recounterparty, "&#39");
                //        }
                //    }
                //}


                //if (requiredvaluetocheck) {
                //    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " value='" + finalCP + "' class='form-contro validelement' " + vreadonly + " type='text' />";
                //} else {
                //    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " value='" + finalCP + "' class='form-contro' " + vreadonly + " type='text' />";
                //}
                //vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
                //vControls += '</div>';
                //vControls += '<div class="col3 m1">';
                //vControls += '<div class="success-input-msg margin-top-8">';
                //if (item.FieldHelp == "true") {
                //    vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                //}
                //vControls += vbrowse;
                //vControls += '</div>';
                //vControls += '</div>';

                var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
                var vAccFeat = $.grep(veContractFeatures, function (n, i) {
                    return (n.RowKey == "6" && n.Status == "ON");
                });
                var vreadonly = "";
                var vbrowse = "";
                if (vAccFeat.length > 0) {
                    vreadonly = "readonly='readonly'";
                    vbrowse = "<a href='javascript:void(0)' class='linkText' onclick='ViewCounterparty(\"" + item.FieldName + "\")'> Browse</a>";
                }
                vControls += '<div class="col6 m12">';
                var recounterparty = new RegExp("'", 'g');
                //Check the business area mapped counterparty or not
                var counterparty = $(vMetadata).find(item.FieldName).text().replace(recounterparty, "&#39");
                var businessareapath = $(vMetadata).find("BusinessAreaPath").text();
                // var IsBAexistsInCP = true;
                var finalCP = '';
                if (counterparty != "undefined" && counterparty != "" && counterparty != null) {
                    var AryCounterparty = counterparty.split(';');
                    for (var j = 0; j < AryCounterparty.length; j++) {
                        if (AllCounterparties != null && AllCounterparties != "") {
                            var newItem = $.grep(AllCounterparties, function (p) { return p.CounterpartyName == AryCounterparty[j].trim().replace(recounterparty, "&#39"); })
                         .map(function (p) { return p })
                            if (newItem.length > 0) {
                                if (newItem[0].IsGlobal == "No") {
                                    if (newItem[0].BusinessAreasPath != "undefined" && newItem[0].BusinessAreasPath != "") {
                                        var contractarea = "";
                                        var Businesssarea = "";
                                        var splitbusinessPath = newItem[0].BusinessAreasPath.split(';');
                                        //$(splitbusinessPath).each(function (index) {
                                        for (var i = 0; i < splitbusinessPath.length; i++) {
                                            if (splitbusinessPath[i] != null && splitbusinessPath[i] != "") {

                                                if (splitbusinessPath[i] == businessareapath) {
                                                    if (finalCP == "")
                                                        finalCP = AryCounterparty[j].trim().replace(recounterparty, "&#39");
                                                    else
                                                        finalCP += "; " + AryCounterparty[j].trim().replace(recounterparty, "&#39");
                                                }


                                            }
                                        }
                                    }

                                }
                                else {
                                    if (finalCP == "")
                                        finalCP = AryCounterparty[j].trim().replace(recounterparty, "&#39");
                                    else
                                        finalCP += "; " + AryCounterparty[j].trim().replace(recounterparty, "&#39");
                                }
                            }
                            else {
                                if (finalCP == "")
                                    finalCP = AryCounterparty[j].trim().replace(recounterparty, "&#39");
                                else
                                    finalCP += "; " + AryCounterparty[j].trim().replace(recounterparty, "&#39");
                            }
                        } else {
                            if (finalCP == "")
                                finalCP = AryCounterparty[j].trim().replace(recounterparty, "&#39");
                            else
                                finalCP += "; " + AryCounterparty[j].trim().replace(recounterparty, "&#39");
                        }
                    }
                }


                if (requiredvaluetocheck) {
                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " value='" + finalCP + "' class='form-contro validelement' " + vreadonly + " type='text' />";
                } else {
                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " value='" + finalCP + "' class='form-contro' " + vreadonly + " type='text' />";
                }
                vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
                vControls += '</div>';
                vControls += '<div class="col3 m1">';
                vControls += '<div class="success-input-msg margin-top-8">';
                if (item.FieldHelp == "true") {
                    vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                }
                vControls += vbrowse;
                vControls += '</div>';
                vControls += '</div>';

            }
            else {
                vControls += '<div class="col6 m12">';
                if (requiredvaluetocheck) {
                    vControls += "<select id=" + item.FieldName + " multiple='multiple' class='form-contro width90 chosenmulti validselect' name=" + item.FieldName + " title='" + item.FieldDisplayName + "' data-placeholder='--Select--'>"
                } else {
                    vControls += "<select id=" + item.FieldName + " multiple='multiple' class='form-contro width90 chosenmulti' name=" + item.FieldName + " title='" + item.FieldDisplayName + "' data-placeholder='--Select--'>"
                }
                var vMultiDDL1 = "";
                if (vMultiDDL1 == '') {
                    $.ajax({
                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/customlookupvaluedetails?lookupname=' + item.ChoiceValues,
                        type: 'GET',
                        dataType: 'json',
                        "Content-Type": "application/json",
                        headers: {
                            'eContracts-ApiKey': localStorage.APIKey
                        },
                        cache: false,
                        async: false,
                        success: function (data) {
                            var datalength1 = data.LookupFields.split(';');
                            datalength1 = datalength1.sort();
                            datalength1 = sortArrOfObjectsByParam(datalength1);
                            var datalength = datalength1.length;
                            for (var i = 0; i < datalength; i++) {
                                var itemname = datalength1[i];
                                vMultiDDL1 += "<option value='" + itemname + "'>" + itemname + "</option>";
                            }
                        }
                    });
                }
                vControls += vMultiDDL1;
                vControls += '</select>';
                vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
                vControls += '</div>';
                if (item.FieldHelp == "true") {
                    vControls += '<div class="col3 m12">';
                    vControls += '<div class="success-input-msg margin-top-8">';
                    vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                    vControls += '</div>'
                    vControls += '</div>'
                }
                vMultiDDL = item.FieldName;
            }

        }


    } else if (item.FieldType == "Currency" || item.FieldType == "Value / Financials") {
        if (item.FieldName == "ContractValue") {
            vContractValue = true;
        } else if (applyCurrencyType) {
            vContractValue = true;
        }
        vControls += '<div class="col6 m12">';
        if ($(vMetadata).find(item.FieldName).text() == "") {
            if (requiredvaluetocheck) {
                vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro validelement width40 form_input validcontractvalue' />";
            } else {
                vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro width40 form_input validcontractvalue' />";
            }
        } else {
            //var currencyVal = "";
            //if ($(vMetadata).find(item.FieldName).text() == "0")
            //    currencyVal = "";
            //else
            var currencyVal = $(vMetadata).find(item.FieldName).text();
            if (requiredvaluetocheck) {
                vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + currencyVal + "' class='form-contro validelement width40 form_input validcontractvalue' />";
            } else {
                vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + currencyVal + "' class='form-contro width40 form_input validcontractvalue' />";
            }
        }

        if (item.FieldName != "ContractValue" && applyCurrencyChangeType) {
            vControls += '<span class="p-text contractcurrencyabbrivation "></span>'
        }

        if (item.FieldHelp == "true") {
            vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>';
        }
        vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
        vControls += '</div>';
        vCurrency = item.FieldName;
    }
    else if (item.FieldType == "Number") {
        vControls += '<div class="col6 m12">';


        if ($(vMetadata).find(item.FieldName).text() == "") {
            if (requiredvaluetocheck) {
                vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro validelement width40 form_input' />";
            } else {
                vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro width40 form_input' />";
            }
        } else {
            if (requiredvaluetocheck) {
                vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text() + "' class='form-contro validelement width40 form_input' />";
            } else {
                vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text() + "' class='form-contro width40 form_input' />";

            }
        }
        if (item.FieldHelp == "true") {
            vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'

        }
        vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
        vControls += '</div>';
        vNumber = item.FieldName;
    }
    else if (item.FieldType == "Number-P") {
        vControls += '<div class="col6 m12">';
        if ($(vMetadata).find(item.FieldName).text() == "") {
            if (requiredvaluetocheck) {
                vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro validelement width40 form_input' />";
            } else {
                vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro width40 form_input' />";
            }
        } else {
            if (requiredvaluetocheck) {
                vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text() + "' class='form-contro validelement width40 form_input' />";
            } else {
                vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text() + "' class='form-contro width40 form_input' />";

            }
        }
        vControls += '<label class="margin-top-8">' + '%' + '</label>';
        if (item.FieldHelp == "true") {
            vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'

        }
        vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';

        vControls += '</div>';
        vNumberP = item.FieldName;
    }
        //Decimal
    else if (item.FieldType == "Number-D") {
        vControls += '<div class="col6 m12">';


        if ($(vMetadata).find(item.FieldName).text() == "") {
            if (requiredvaluetocheck) {
                vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro validelement width40 form_input' />";
            } else {
                vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro width40 form_input' />";
            }
        } else {
            if (requiredvaluetocheck) {
                vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text() + "' class='form-contro validelement width40 form_input' />";
            } else {
                vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text() + "' class='form-contro width40 form_input' />";

            }
        }
        if (item.FieldHelp == "true") {
            vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'

        }
        vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
        vControls += '</div>';
        vNumberD = item.FieldName;
    }
        //Decimal Percent
    else if (item.FieldType == "Number-PD") {
        vControls += '<div class="col6 m12">';
        if ($(vMetadata).find(item.FieldName).text() == "") {
            if (requiredvaluetocheck) {
                vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro validelement width40 form_input' />";
            } else {
                vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro width40 form_input' />";
            }
        } else {
            if (requiredvaluetocheck) {
                vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text() + "' class='form-contro validelement width40 form_input' />";
            } else {
                vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text() + "' class='form-contro width40 form_input' />";
            }
        }
        vControls += '<label class="margin-top-8">' + '%' + '</label>';
        if (item.FieldHelp == "true") {
            vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'

        }
        vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';

        vControls += '</div>';
        vNumberPD = item.FieldName;
    }
    else if (item.FieldType == "Yes/No") {
        vControls += '<div class="col6 m12">';

        if ($(vMetadata).find(item.FieldName).text() == "") {
            vControls += "	<input type='radio' name=" + item.FieldName + " id='Yes" + item.FieldName + "' value='Yes' onchange='changeYesNoField(this);'>Yes ";
            vControls += "	<input type='radio' name=" + item.FieldName + " id='No" + item.FieldName + "' checked value='No' onchange='changeYesNoField(this);'>No";
            vControls += "	<input type='hidden' id='hdnYes" + item.FieldName + "' value=" + item.CommentYes + " />";
            vControls += "	<input type='hidden' id='hdnNo" + item.FieldName + "' value=" + item.CommentNo + " />";
            vControls += "	<input type='hidden' id='hdnRequired" + item.FieldName + "' value=" + item.CommentRequired + " />";
        } else {
            if ($(vMetadata).find(item.FieldName).text() == "Yes") {
                checkedCriteria = "Yes";
                vControls += "	<input type='radio' name=" + item.FieldName + " id='Yes" + item.FieldName + "' checked value='Yes' onchange='changeYesNoField(this);'>Yes ";
                vControls += "	<input type='radio' name=" + item.FieldName + " id='No" + item.FieldName + "'  value='No' onchange='changeYesNoField(this);'>No";
            } else {
                checkedCriteria = "No";
                vControls += "	<input type='radio' name=" + item.FieldName + " id='Yes" + item.FieldName + "'  value='Yes' onchange='changeYesNoField(this);'>Yes ";
                vControls += "	<input type='radio' name=" + item.FieldName + " id='No" + item.FieldName + "' checked value='No' onchange='changeYesNoField(this);'>No";
            }
            vControls += "	<input type='hidden' id='hdnYes" + item.FieldName + "' value=" + item.CommentYes + " />";
            vControls += "	<input type='hidden' id='hdnNo" + item.FieldName + "' value=" + item.CommentNo + " />";
            vControls += "	<input type='hidden' id='hdnRequired" + item.FieldName + "' value=" + item.CommentRequired + " />";
        }

        vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
        vControls += '</div>';
        if (item.FieldHelp == "true") {
            vControls += '<div class="col3 m12">';
            vControls += '<div class="success-input-msg margin-top-8">';
            vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
            vControls += '</div>'
            vControls += '</div>'
        }
    } else if (item.FieldType == "Email") {
        vControls += '<div class="col6 m12">';


        if ($(vMetadata).find(item.FieldName).text() == "") {
            if (requiredvaluetocheck) {
                vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro validemail validelement' />";
            } else {
                vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro validemail' />";
            }
        } else {
            if (requiredvaluetocheck) {
                vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text() + "' class='form-contro validemail validelement' />";
            } else {
                vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text() + "' class='form-contro validemail' />";
            }
        }

        vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
        vControls += '</div>';
        if (item.FieldHelp == "true") {
            vControls += '<div class="col3 m12">';
            vControls += '<div class="success-input-msg margin-top-8">';
            vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
            vControls += '</div>'
            vControls += '</div>'
        }
    } else if (item.FieldType.indexOf("Browse") > -1) {
        vControls += '<div class="col6 m11">';

        if ($(vMetadata).find(item.FieldName).text() == "") {
            if (requiredvaluetocheck) {
                vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro validelement' readonly='readonly' type='text' />";
            } else {
                vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro' readonly='readonly' type='text' />";
            }
        } else {
            if (requiredvaluetocheck) {
                vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text() + "' class='form-contro validelement' readonly='readonly' type='text' />";
            } else {
                vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text() + "' class='form-contro' readonly='readonly' type='text' />";
            }
        }
        vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
        vControls += '</div>';
        vControls += '<div class="col3 m1">';
        vControls += '<div class="success-input-msg margin-top-8">';
        if (item.FieldHelp == "true") {
            vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
        }
        vControls += "<a href='javascript:void(0)' class='linkText' id='" + item.FieldDisplayName + "' title='" + item.FieldName + "' onclick='ViewGeneric(this)'> Browse</a>";
        vControls += '</div>';
        vControls += '</div>';
    }

    vControls += '</div></div>';
    if (item.CommentNo == "true" && checkedCriteria == "No") {
        var valueField = "CustomCMD" + item.FieldName
        if (item.CommentRequired == "true") {
            vControls += ' <div class="form-input-group ' + item.FieldName + '"><div class="row-group"><label class="col3 m12 ' + vMarginTop + '">Add a Comment<span class="text-red">*</span></label> ';
        } else {
            vControls += '<div class="form-input-group ' + item.FieldName + '"><div class="row-group"><label class="col3 m12 ' + vMarginTop + '">Add a Comment</label> ';
        }
        vControls += '<div class="col6 m12">';
        if (item.CommentRequired == "true") {
            vControls += "<textarea id='CustomCMD" + item.FieldName + "' name='CustomCMD" + item.FieldName + "' maxlength='500' title='" + item.FieldDisplayName + "' cols='40' rows='5' class='form-contro validelement' value='" + $(vMetadata).find(valueField).text() + "'> " + $(vMetadata).find(valueField).text() + "</textarea>";
        } else {
            vControls += "<textarea id='CustomCMD" + item.FieldName + "' name='CustomCMD" + item.FieldName + "' maxlength='500' title='" + item.FieldDisplayName + "' cols='40' rows='5' class='form-contro' value='" + $(vMetadata).find(valueField).text() + "'> " + $(vMetadata).find(valueField).text() + "</textarea>";
        }
        vControls += '</div>';
        vControls += '</div></div>';
    }
    if (item.CommentYes == "true" && checkedCriteria == "Yes") {
        var valueField = "CustomCMD" + item.FieldName
        if (item.CommentRequired == "true") {
            vControls += ' <div class="form-input-group ' + item.FieldName + '"><div class="row-group"><label class="col3 m12 ' + vMarginTop + '">Add a Comment<span class="text-red">*</span></label> ';
        } else {
            vControls += '<div class="form-input-group ' + item.FieldName + '"><div class="row-group"><label class="col3 m12 ' + vMarginTop + '">Add a Comment</label> ';
        }
        vControls += '<div class="col6 m12">';
        if (item.CommentRequired == "true") {
            vControls += "<textarea id='CustomCMD" + item.FieldName + "' name='CustomCMD" + item.FieldName + "' maxlength='500' title='" + item.FieldDisplayName + "' cols='40' rows='5' class='form-contro validelement' value='" + $(vMetadata).find(valueField).text() + "'>" + $(vMetadata).find(valueField).text() + "</textarea>";
        } else {
            vControls += "<textarea id='CustomCMD" + item.FieldName + "' name='CustomCMD" + item.FieldName + "' maxlength='500' title='" + item.FieldDisplayName + "' cols='40' rows='5' class='form-contro' value='" + $(vMetadata).find(valueField).text() + "'> " + $(vMetadata).find(valueField).text() + "</textarea>";
        }
        vControls += '</div>';
        vControls += '</div></div>';
    }
    if (vControlsGroup != "") {
        var final = vControlsGroup + vControls + '</div>';
        vControls = "";
        vControls = final;
        if (item.FieldGroup == "Primary Fields") {
            $("#newdivforcheck").append(vControls);
        }
        else {
            $("#undercheck").append(vControls);
            idelcheck = idelvalue;
        }


        //
        if (vDate != "") {
            if (localStorage.AppDateFormat == null || localStorage.AppDateFormat == "" || localStorage.AppDateFormat == 'undefined') {
                if (onlydate != "") {
                    $("#" + vDate + "").datepicker({
                        changeMonth: true,
                        changeYear: true
                    });
                    $("#" + vDate + "").datepicker().datepicker('setDate', onlydate);
                }
                else {
                    $("#" + vDate + "").datepicker({
                        changeMonth: true,
                        changeYear: true, dateFormat: dateformate
                    });
                }

            }
            else {
                var dateformate = localStorage.AppDateFormat.toLowerCase().slice(0, -2);

                if (onlydate != "") {
                    $("#" + vDate + "").datepicker({
                        changeMonth: true,
                        changeYear: true, dateFormat: dateformate
                    });
                    //$("#" + vDate + "").datepicker({ dateFormat: dateformate });
                    $("#" + vDate + "").datepicker().datepicker('setDate', onlydate);

                }
                else {
                    $("#" + vDate + "").datepicker({
                        changeMonth: true,
                        changeYear: true, dateFormat: dateformate
                    });
                }
            }
            vDate = "";
        }
        if (vNumber != "") {
            allowOnlyNumberInInputBox(vNumber);
            vNumber == "";
        }
        if (vNumberP != "") {
            allowOnlyNumberInInputBox(vNumberP);
            vNumberP == "";
        }
        if (vNumberD != "") {
            allowOnlyDecimalNumberInInputBox(vNumberD);
            vNumberD == "";
        }
        if (vNumberPD != "") {
            allowOnlyDecimalNumberInInputBox(vNumberPD);
            vNumberPD == "";
        }

        if (vPhoneNumber != "") {
            bindPhoneNumberEdit(PhoneID, PhoneCountry);
            vPhoneNumber = "";
            PhoneID = "";
            PhoneCountry = "";
        }

        if (vCurrency != "") {
            if (vCurrencyDisplayStyle == "UK") {
                $('#' + vCurrency).autoNumeric();
            } else if (vCurrencyDisplayStyle == "CAN") {
                $('#' + vCurrency).autoNumeric({
                    aSep: ' ',
                    aDec: '.',
                });

            } else if (vCurrencyDisplayStyle == "EU") {
                $('#' + vCurrency).autoNumeric({
                    aSep: '.',
                    aDec: ',',
                });
            } else if (vCurrencyDisplayStyle == "IND") {
                $('#' + vCurrency).autoNumeric({
                    dGroup: '2',
                });
            }
            vCurrency == "";
        }

        if (vUser != "") {
            $("#" + vUser + "").chosen().trigger("chosen:updated");
            $('.chosenmulti').on('chosen:showing_dropdown', function (evt, params) {
                $('.result-selected').css('display', 'none');
            });

            if ($(vMetadata).find(vUser).text() != "") {
                GetValuesAndAutoPopulate(vUser, $(vMetadata).find(vUser).text());
            }
            vUser = "";
        }

        if (vMultiDDL != "") {

            $("#" + vMultiDDL + "").chosen().trigger("chosen:updated");
            $('.chosenmulti').on('chosen:showing_dropdown', function (evt, params) {
                $('.result-selected').css('display', 'none');
            });

            if ($(vMetadata).find(vMultiDDL).text() != "") {
                GetValuesAndAutoPopulate(vMultiDDL, $(vMetadata).find(vMultiDDL).text());
            }
            vMultiDDL = "";
        }

        //If project is added, add project task to create form
        if (vProject) {
            var vControls = '<div class="form-input-group"><div class="row-group">';
            if (requiredvaluetocheck || ($(vMetadata).find("Project").text() != "")) {
                vControls += '<label id="lblProjectTask"  class="col3 m12 margin-top-8">Project Tasks<span class="text-red">*</span></label> ';
                vControls += '<div class="col6 m11">';
                vControls += "<input id='ProjectTask' name='ProjectTask' value='" + $(vMetadata).find("ProjectTask").text() + "' title='Project Task' class='form-contro validelement' readonly='readonly' type='text' />";
            } else {
                vControls += '<label id="lblProjectTask"  class="col3 m12 margin-top-8">Project Tasks</label> ';
                vControls += '<div class="col6 m11">';
                vControls += "<input id='ProjectTask' name='ProjectTask' value='" + $(vMetadata).find("ProjectTask").text() + "' title='Project Task' class='form-contro' readonly='readonly' type='text' />";
            }
            vControls += '</div>';
            vControls += '<div class="col3 m1">';
            vControls += '<div class="success-input-msg margin-top-8">';
            vControls += "<a href='javascript:void(0)' class='linkText' onclick='ViewProjectTasks()'> Browse</a>";
            vControls += '</div>';
            vControls += '</div>';
            vControls += '</div></div>';
            if (item.FieldGroup == "Primary Fields") {

                $("#newdivforcheck").append(vControls);
            }
            else {
                $("#" + idelvalue + "").append(vControls);
            }
        }

        //If contract value is added, add contract currecncy to create form
        if (vContractValue) {
            var vControls = '<div class="form-input-group"><div class="row-group">';
            vControls += '<label class="col3 m12 margin-top-8">Contract Currency<span class="text-red"></span></label> ';
            vControls += '<div class="col6 m12">';
            vControls += (applyCurrencyChangeType) ? "<select id='ContractCurrency' name='ContractCurrency' title='Contract Currency' class='form-contro' onchange='changecurrecytype()'>" : "<select id='ContractCurrency' name='ContractCurrency' title='Contract Currency' class='form-contro'>";
            //vControls += "<select id='ContractCurrency' name='ContractCurrency' title='Contract Currency' class='form-contro'>";
            vControls += "<option value='0'>--Select--</option>";
            vControls += getContractCurrency($(vMetadata).find("ContractCurrency").text()) + "</select>";
            vControls += '</div>';
            vControls += '</div></div>';
            if (item.FieldGroup == "Primary Fields") {

                $("#newdivforcheck").append(vControls);
            }
            else {
                $("#" + idelvalue + "").append(vControls);
            }
            applyCurrencyType = false;
        }

    }
    else {
        var final = vControlsGroup + vControls + '</div>';
        vControls = "";
        vControls = final;
        if (item.FieldGroup == "Primary Fields") {
            $("#newdivforcheck").append(vControls);
        }
        else {
            if (idelcheck != null && idelcheck != "") {
                $("#" + idelcheck + "").append(vControls);
            }
        }

        if (vDate != "") {

            if (localStorage.AppDateFormat == null || localStorage.AppDateFormat == "" || localStorage.AppDateFormat == 'undefined') {
                if (onlydate != "") {
                    $("#" + vDate + "").datepicker({
                        changeMonth: true,
                        changeYear: true
                    });
                    $("#" + vDate + "").datepicker().datepicker('setDate', onlydate);

                }
                else {
                    $("#" + vDate + "").datepicker({
                        changeMonth: true,
                        changeYear: true
                    });
                }

            }
            else {
                var dateformate = localStorage.AppDateFormat.toLowerCase().slice(0, -2);
                if (onlydate != "") {
                    $("#" + vDate + "").datepicker({
                        changeMonth: true,
                        changeYear: true, dateFormat: dateformate
                    });
                    $("#" + vDate + "").datepicker().datepicker('setDate', onlydate);

                }
                else {
                    $("#" + vDate + "").datepicker({
                        changeMonth: true,
                        changeYear: true, dateFormat: dateformate
                    });

                }

            }
            vDate = "";
        }
        if (vNumber != "") {
            allowOnlyNumberInInputBox(vNumber);
            vNumber == "";
        }
        if (vNumberP != "") {
            allowOnlyNumberInInputBox(vNumberP);
            vNumberP == "";
        }
        if (vNumberD != "") {
            allowOnlyDecimalNumberInInputBox(vNumberD);
            vNumberD == "";
        }
        if (vNumberPD != "") {
            allowOnlyDecimalNumberInInputBox(vNumberPD);
            vNumberPD == "";
        }
        if (vPhoneNumber != "") {
            bindPhoneNumberEdit(PhoneID, PhoneCountry);
            vPhoneNumber = "";
            PhoneID = "";
            PhoneCountry = "";
        }

        if (vCurrency != "") {
            if (vCurrencyDisplayStyle == "UK") {
                $('#' + vCurrency).autoNumeric();
            } else if (vCurrencyDisplayStyle == "CAN") {
                $('#' + vCurrency).autoNumeric({
                    aSep: ' ',
                    aDec: '.',
                });

            } else if (vCurrencyDisplayStyle == "EU") {
                $('#' + vCurrency).autoNumeric({
                    aSep: '.',
                    aDec: ',',
                });
            } else if (vCurrencyDisplayStyle == "IND") {
                $('#' + vCurrency).autoNumeric({
                    dGroup: '2',
                });
            }
            vCurrency == "";
        }


        if (vUser != "") {
            $("#" + vUser + "").chosen().trigger("chosen:updated");
            $('.chosenmulti').on('chosen:showing_dropdown', function (evt, params) {
                $('.result-selected').css('display', 'none');
            });

            if ($(vMetadata).find(vUser).text() != "") {
                GetValuesAndAutoPopulate(vUser, $(vMetadata).find(vUser).text());
            }
            vUser = "";
        }

        if (vMultiDDL != "") {

            $("#" + vMultiDDL + "").chosen().trigger("chosen:updated");
            $('.chosenmulti').on('chosen:showing_dropdown', function (evt, params) {
                $('.result-selected').css('display', 'none');
            });

            if ($(vMetadata).find(vMultiDDL).text() != "") {
                GetValuesAndAutoPopulate(vMultiDDL, $(vMetadata).find(vMultiDDL).text());
            }
            vMultiDDL = "";
        }

        //If project is added, add project task to create form
        if (vProject) {
            var vControls = '<div class="form-input-group"><div class="row-group">';
            if (requiredvaluetocheck || ($(vMetadata).find("Project").text() != "")) {
                vControls += '<label id="lblProjectTask"  class="col3 m12 margin-top-8">Project Tasks<span class="text-red">*</span></label> ';
                vControls += '<div class="col6 m11">';
                vControls += "<input id='ProjectTask' name='ProjectTask' value='" + $(vMetadata).find("ProjectTask").text() + "' title='Project Task' class='form-contro validelement' readonly='readonly' type='text' />";
            } else {
                vControls += '<label id="lblProjectTask"  class="col3 m12 margin-top-8">Project Tasks</label> ';
                vControls += '<div class="col6 m11">';
                vControls += "<input id='ProjectTask' name='ProjectTask' value='" + $(vMetadata).find("ProjectTask").text() + "' title='Project Task' class='form-contro' readonly='readonly' type='text' />";
            }
            vControls += '</div>';
            vControls += '<div class="col3 m1">';
            vControls += '<div class="success-input-msg margin-top-8">';
            vControls += "<a href='javascript:void(0)' class='linkText' onclick='ViewProjectTasks()'> Browse</a>";
            vControls += '</div>';
            vControls += '</div>';
            vControls += '</div></div>';
            if (item.FieldGroup == "Primary Fields") {

                $("#newdivforcheck").append(vControls);
            }
            else {
                $("#" + idelvalue + "").append(vControls);
            }
        }

        //If contract value is added, add contract currecncy to create form
        if (vContractValue) {
            var vControls = '<div class="form-input-group"><div class="row-group">';
            vControls += '<label class="col3 m12 margin-top-8">Contract Currency<span class="text-red"></span></label> ';
            vControls += '<div class="col6 m12">';
            //vControls += "<select id='ContractCurrency' name='ContractCurrency' title='Contract Currency' class='form-contro'>";
            vControls += (applyCurrencyChangeType) ? "<select id='ContractCurrency' name='ContractCurrency' title='Contract Currency' class='form-contro' onchange='changecurrecytype()'>" : "<select id='ContractCurrency' name='ContractCurrency' title='Contract Currency' class='form-contro'>";
            vControls += "<option value='0'>--Select--</option>";
            vControls += getContractCurrency($(vMetadata).find("ContractCurrency").text()) + "</select>";
            vControls += '</div>';
            vControls += '</div></div>';
            if (item.FieldGroup == "Primary Fields") {

                $("#newdivforcheck").append(vControls);
            }
            else {
                $("#" + idelvalue + "").append(vControls);
            }
            applyCurrencyType = false;
        }
    }
    if (item.FieldName == "ContractNumber") {

        CheckContractNumberSetting();
    }


    if (IsContractTermType) {
        var IsDisabled = "";
        var Disable = "";
        var Pointer = "";
        if (!(IsStatus && IsPermission)) {
            IsDisabled = "form_control_disabled";
            Disable = "disabled";

            Pointer = "pointer-events:none !important;color:grey !important;"

        }
        var vControls = '<div class="form-input-group">';
        vControls += '<div class="row-group">';
        vControls += '<div id="dvContractTerm" >';
        vControls += '<div class="width100 contract_TErm_REN" cellpadding="2" cellspacing="2">';
        vControls += '<div class="row-group">';
        vControls += '<label class="col3 m12 margin-top-8">Renewal/Termination conditions<small class="required"></small></label>';
        vControls += '<div class="col6 m12">';
        vControls += '<textarea  id="ContractTermNotes" maxlength="500"  cols="40" rows="5" class="form-contro ' + IsDisabled + '" name="ContractTermNotes" title="Notice"></textarea>';
        vControls += '</div>';
        vControls += '<div class="col3 m12">';
        vControls += '<div class="success-input-msg margin-top-8">';
        vControls += '<span class="p-text help">';
        vControls += '<img title="Enter Term Notes." src="../Content/Images/input-help.png">';
        vControls += '</span>';
        vControls += '</div>';
        vControls += '</div>';
        vControls += '</div>';
        vControls += '<div class="row-group" id="trContractTermDates2" style="display:none;">';
        vControls += '<div id="tblContractTermDates" class="row-group">';
        vControls += '<div class="row-group" id="trContractTermStartDate">';
        vControls += '<label class="col3 m12 margin-top-8" id="tdContractTermStartDateLbl">Start / Effective Date</label>';
        vControls += '<div class="col6 m12">';

        vControls += '<input id="StartDate"  title="Start Date" type="text" class="form-contro form-contro-Date validdate ' + IsDisabled + ' form_input fielddatecontrol StartDate" onchange="calculateenddate()">';

        vControls += '</div>';
        vControls += '<div class="col3 m12">';
        vControls += '<div class="success-input-msg margin-top-8">';
        vControls += '<span class="p-text help">';
        vControls += '<img title="Select the date from which the Contract becomes active." src="../Content/Images/input-help.png">';
        vControls += '</span>';
        vControls += '</div>';
        vControls += '</div>';
        vControls += '</div>';
        vControls += '<div class="row-group" id="trContractTermEvaluationDate">';
        vControls += '<label class="col3 m12 margin-top-8">Next Evaluation Date</label>';
        vControls += '<div class="col6 m12">';

        vControls += '<input id="NextEvaluationDate"  title="Next Evaluation Date" type="text" class="form-contro form-contro-Date validdate ' + IsDisabled + ' form_input fielddatecontrol NextEvaluationDate">';

        vControls += '</div>';
        vControls += '<div class="col3 m12">';
        vControls += '<div class="success-input-msg margin-top-8">';
        vControls += '<span class="p-text help">';
        vControls += '<img title="Select the date on which the Contract would be evaluated for renewal." src="../Content/Images/input-help.png">';
        vControls += '</span>';
        vControls += '</div>';
        vControls += '</div> ';
        vControls += '</div>';
        vControls += '<div class="row-group" id="trContractTermEndDate">';
        vControls += '<label class="col3 m12 margin-top-8">End Date</label>';
        vControls += '<div class="col2 m12" style="width: 18.6667%;">';
        vControls += "<input type='radio' " + Disable + " checked  style='float: left;margin: 10px 10px 0px 0px;' name='rdTermEndDate' value='Term' onclick='EnableContractTermEndChoice();'><input id='ContractTerm' style='float: left; width: 85%;' onchange='calculateenddate()' name='ContractTerm' type='text' title='End Date' class='form-contro " + IsDisabled + "' value='1' maxlength='4' />";
        vControls += '</div>';
        vControls += '<div class="col2 m12">';
        vControls += '<select id="ContractTermChoices"  name="ContractTermChoices" class="form-contro ' + IsDisabled + '" onchange="calculateenddate()">';
        vControls += '<option value="months">Month(s)</option>';
        vControls += '<option value="years" selected>Year(s)</option>';
        vControls += '</select>';
        vControls += '</div>';
        vControls += '<div class="col6 m12" style="margin: 12px 0 0 25%;">';
        vControls += '<input type="radio" ' + Disable + ' name="rdTermEndDate" value="EndDate" onclick="EnableContractTermEndDate();" style="float: left;margin: 10px 10px 0px 0px;"><input type="text" id="EndDate" title="End Date" class="form-contro form-contro-Date  validdate ' + IsDisabled + ' form_input fielddatecontrol EndDate"/>';
        vControls += '<span class="p-text help"><img src="../Content/Images/input-help.png" title="Select the end date after which the Contract expires or becomes inactive. "></span>'
        vControls += '</div>';
        vControls += '</div>';
        vControls += '</div>';
        vControls += '</div>';
        vControls += '<div class="row-group" id="trContractRenewalHistory" style="display:none;">';
        vControls += '<form id="RenewalActivities" style="width: 63%;">';
        vControls += '<table class="width76" style="margin-left: 41%;" id="tbRenewalActivities">';
        vControls += '<thead><tr><th style="width: 15%;">Term</th><th style="width: 15%;">Start Date</th><th style="width: 15%;">End Date</th></thead>';
        vControls += '<tbody id="renewalViewHistoryTerm"></tbody>';
        vControls += '</table>';
        vControls += '</form>';
        vControls += '<div class="row-group" style=" margin-bottom: 10px;">';
        vControls += '<label class="col3 m12 margin-top-8"></label>';
        vControls += '<a id="AddInitialTerm" ' + Disable + ' href="javascript:void(0);" style="display:none;color:#44a6d8;' + Pointer + '" title="Add Initial Term" onclick="AddRenewalTerm()">+ Add Terms</a>';
        vControls += '<div id="RenewTerm" style="display:none;">';
        vControls += '<a href="javascript:void(0);" ' + Disable + ' class="ManRenewal" style="display:none;color:#44a6d8;' + Pointer + '" title="Renew" onclick="RenewTerm()">Renew</a>';
        vControls += '</div>';
        vControls += '<a id="AddRenewalTerm" ' + Disable + ' href="javascript:void(0);" style="display:none;color:#44a6d8;' + Pointer + '" title="Add Renewal Term" onclick="AddRenewalTerm()">';
        vControls += '</a>';
        vControls += '</div>';
        vControls += '</div>';
        vControls += '<div class="row-group" id="trContractRenewalConfirmAuto" style="display:none;padding-top: 0px !important;">';
        vControls += '<div id="" class="row-group" style="margin-bottom: 10px !important;">';
        //vControls += '<div class="row-group">';
        //vControls += '<label class="col3 m12 margin-top-8"></label>';
        //vControls += '<div class="col6 m12">';
        //vControls += '<input checked="" ' + Disable + ' style="float: left;margin: 3px 10px 5px 0px;padding-bottom: 10px;" name="RenewalConfirmAuto" value="No" type="radio" onclick="RenewalConfirmAutofunc()">Manual Renewals Only';
        //vControls += '</div>';
        //vControls += '</div>';
        //vControls += '<div class="row-group">';
        //vControls += '<label class="col3 m12 margin-top-8"></label>';
        //vControls += '<div class="col6 m12">';
        //vControls += '<input name="RenewalConfirmAuto" ' + Disable + ' value="Yes" style="float: left;margin: 3px 10px 0px 0px;" type="radio" onclick="RenewalConfirmAutofunc()">Auto Renew at the end of each term';
        //vControls += '</div>';
        //vControls += '</div>';
        //vControls += '<div class="row-group" id="divRenewalConfirmAuto" style="display:none;">';
        //vControls += '<div class="row-group" id="" >';
        //vControls += '<div class="row-group">';
        //vControls += '<label class="col3 m12 margin-top-8">Renewal Term<small class="required">*</small></label>';
        //vControls += '<div class="col6 m12">';
        //vControls += '<input id="ContractAutoTerm"  name="ContractAutoTerm" maxlength="6" style="float: left; width: 85%;" title="Renew On / Anniversary Date" type="text" class="f_input_small width20 ' + IsDisabled + '" onchange="calculateenddateRenew(\'hdCurrentRenewalTermEnd\', \'ContractAutoTermChoices\', \'ContractAutoTerm\', \'AutoContractRenewOn\')"><select id="ContractAutoTermChoices" class="f_select_small width19 ' + IsDisabled + '" onchange="calculateenddateRenew(\'hdCurrentRenewalTermEnd\', \'ContractAutoTermChoices\', \'ContractAutoTerm\', \'AutoContractRenewOn\')"><option selected="" value="days">Day()s</option><option value="months">Month(s)</option><option value="years">Year(s)</option></select><p style="font-size:10.5px;display: inline;"></p><input id="AutoContractRenewOn" type="hidden">';
        //vControls += '</div>';
        //vControls += '</div>';
        vControls += '<div class="row-group">';
        vControls += '<label class="col3 m12 margin-top-8">Auto Renew at the end of each term</label>';
        vControls += '<div class="col6 m12">';
        vControls += '<input name="RenewalConfirmAuto" ' + Disable + ' value="Yes" style="float: left;" type="radio" onclick="RenewalConfirmAutofunc()" id="AutoRenewYes">';
        vControls += '<label for="AutoRenewYes" class="css-label" style="float:left">Yes</label>';
        vControls += '<input checked="" ' + Disable + ' style="float: left;margin-left: 20px;padding-bottom: 10px;" name="RenewalConfirmAuto" value="No" type="radio" onclick="RenewalConfirmAutofunc()" id="AutoRenewNo">';
        vControls += '<label for="AutoRenewNo" class="css-label">No</label>';
        vControls += '</div>';
        vControls += '<span class="right-float autoRenewal" style="color: #1b1616;font-size: 11px;margin-bottom: 10px;float: left;margin-left: 10px;"> Note: Contract will automatically expire if not renewed before End of Term.</span>';
        vControls += '</div>';
        //vControls += '<div class="row-group">';
        //vControls += '<label class="col3 m12 margin-top-8">Number of Renewal Terms</label>';
        //vControls += '<div class="col6 m12">';
        //vControls += '<select id="AutoContractRenewTermCount"  name="AutoContractRenewTermCount" class="f_select_small width30 ' + IsDisabled + '"><option value="Renewal 1">Renewal 1</option><option value="Renewal 2">Renewal 2</option><option value="Renewal 3">Renewal 3</option><option value="Renewal 4">Renewal 4</option><option value="Renewal 5">Renewal 5</option><option value="Renewal 6">Renewal 6</option><option value="Renewal 7">Renewal 7</option><option value="Renewal 8">Renewal 8</option><option value="Renewal 9">Renewal 9</option><option value="Renewal 10">Renewal 10</option><option value="Renewal 11">Renewal 11</option><option value="Renewal 12">Renewal 12</option><option value="Renewal 13">Renewal 13</option><option value="Renewal 14">Renewal 14</option><option value="Renewal 15">Renewal 15</option><option selected="" value="Unlimited">Unlimited</option></select>';
        //vControls += '</div>';
        //vControls += '</div>';
        vControls += '</div>';
        vControls += '</div>';
        vControls += '</div>';
        vControls += '</div>';
        vControls += '<div class="row-group" id="trContractRenewalConfirm" style="display:none;padding-top: 0px !important;">';
        vControls += '<div class="row-group" id="">';
        vControls += '<div class="row-group">';
        vControls += '<label class="col3 m12 margin-top-8">Requires Authorization?</label>';
        vControls += '<div class="col6 m12" style="margin-top: 5px;">';
        vControls += '<input  ' + Disable + ' style="float:left;margin: 3px 10px 0px 0px;" id="RenewalAuthYes" name="RenewalAuth" value="Yes" type="radio" onclick="RequiresAuthchange()" ><label for="RenewalAuthYes" class="css-label" style="float:left">Yes</label><input ' + Disable + ' checked="checked" style="float:left;margin: 3px 10px 0px 15px;" id="RenewalAuthNo" name="RenewalAuth" value="No" type="radio" onclick="RequiresAuthchange()"><label for="RenewalAuthNo" class="css-label">No</label>';
        vControls += '</div>';
        vControls += '</div>';
        vControls += '<div class="row-group">';
        vControls += '<div class="row-group"  id="RequiresAuthorizationYes" name="RequiresAuthorizationYes" style="display:none;">';
        vControls += '<div class="row-group">';
        vControls += '<label class="col3 m12 margin-top-8">Renewal Authorization Users<small class="required">*</small></label>';
        vControls += '<div class="col6 m12">';
        vControls += '<select id="RenewalConfirmParticipants"  name="RenewalConfirmParticipants"  multiple="multiple" class="f_input width80' + IsDisabled + '" data-placeholder="Select User(s)"></select>';
        vControls += '</div>';
        vControls += '</div>';
        vControls += '<div class="row-group" id="trContractRenewalConfirmDays">';
        vControls += '<label class="col3 m12 margin-top-8">Send Authorization EmailAlerts<small class="required">*</small></label>';
        vControls += '<div class="col6 m12">';

        vControls += '<input id="ContractConfirmSendTerm"  name="ContractConfirmSendTerm" type="text" maxlength=" 4" class="form-contro width40 form_input numberdaysrestrict ' + IsDisabled + '" onchange="calculateenddateRenewSub(\'hdCurrentRenewalTermEnd\', \'ContractNextTermChoicesRenewConfirm\', \'ContractConfirmSendTerm\', \'txtRenewConfirmSendDate\')"><select style="display:none;" id="ContractNextTermChoicesRenewConfirm" name="ContractNextTermChoicesRenewConfirm" class="f_select_small width19" ><option selected="" value="days">Day(s)</option></select><p style="font-size:10.5px;display: inline;">days before Term End Date</p><label id="txtRenewConfirmSendDate" style="color: #6c9539; font-size: 14px;margin-left: 6px;margin-top: 8px;"></label>';

        vControls += '</div>';
        vControls += '</div>';
        vControls += '<div class="row-group">';
        vControls += '<label class="col3 m12 margin-top-8">CC Users</label>';
        vControls += '<div class="col6 m12">';
        vControls += '<select id="RenewalConfirmParticipantsCC" name="RenewalConfirmParticipantsCC" multiple="multiple" class="f_input width80 ' + IsDisabled + ' " data-placeholder="Select User(s)"></select>';
        vControls += '</div>';
        vControls += '</div>';
        vControls += '<div class="row-group">';
        vControls += '<label class="col3 m12 margin-top-8"></label>';
        vControls += '<div class="col6 m12">';
        vControls += '<span class="right-float" style="font-size: 11px;margin-bottom: 10px;float: left;margin-top: 10px;">Note: The status of the Contract Record is updated to \'Expired\' if not renewed before end of term.</span>';
        vControls += '</div>';
        vControls += '</div>';
        vControls += '</div>';
        vControls += '</div>';
        vControls += '</div>';
        vControls += '</div>';

        //vControls += '<div class="row-group" id="trContractRenewalConfirmCounterparty" style="display:none;">';
        //vControls += '<div class="row-group" id="" >';
        //vControls += '<div class="row-group">';
        //vControls += '<label class="col3 m12 margin-top-8">Person / Address for Notice</label>';
        //vControls += '<div class="col6 m12">';
        //vControls += '<textarea id="CounterpartyNotices" maxlength="500"  cols="40" rows="5" class="form-contro" name="CounterpartyNotices" title="Notice"></textarea>';
        //vControls += '</div>';
        //vControls += '</div>';
        //vControls += '<div class="row-group" id="">';
        //vControls += '<label class="col3 m12 margin-top-8">Renewal Notice</label>';
        //vControls += '<div class="col6 m12">';
        //vControls += '<input id="CounterpartyNoticesRenewal" maxlength="6" name="CounterpartyNoticesRenewal" type="text" class="form-contro width40 form_input numberdaysrestrict"><select style="display:none;" id="ContractNextTermChoicesRenewCounter" name="ContractTermChoices" class="f_select_small width19" onchange="calculateenddateRenew(\'hdCurrentRenewalTermEnd\', \'ContractNextTermChoicesRenewCounter\', \'ContractConfirmSendTerm\', \'txtRenewConfirmRenewalCounter\')"><option selected="" value="days">Day(s)</option></select><p style="font-size:10.5px;display: inline;">days before Term End Date</p><input id="txtRenewConfirmRenewalCounter" title="End Date" type="hidden" class="form-contro-Date f_input_small width25">';
        //vControls += '</div>';
        //vControls += '</div>';
        //vControls += '<div class="row-group" id="">';
        //vControls += '<label class="col3 m12 margin-top-8">Cancellation / Termination Notice</label>';
        //vControls += '<div class="col6 m12">';
        //vControls += '<input id="CounterpartyNoticesCancel" maxlength="6" name="CounterpartyNoticesCancel" type="text" class="form-contro width40 form_input numberdaysrestrict"><select style="display:none;" id="ContractNextTermChoicesCancelCounter" name="ContractTermChoices" class="f_select_small width19" onchange="calculateenddateRenew(\'hdCurrentRenewalTermEnd\', \'ContractNextTermChoicesCancelCounter\', \'txtSendRenewReminderDayCancelConfirm\', \'txtRenewConfirmCancelCounter\')"><option selected="" value="days">Day(s)</option></select><p style="font-size:10.5px;display: inline;">days before Term End Date</p><input id="txtRenewConfirmCancelCounter" title="End Date" type="hidden" class="form-contro-Date f_input_small width25 ">';
        //vControls += '</div>';
        //vControls += '</div>';
        //vControls += '</div>';
        //vControls += '</div>';

        vControls += '</div>';
        vControls += '</div>';

        vControls += '</div>';
        vControls += '</div>';



        if (item.FieldGroup == "Primary Fields") {
            $("#newdivforcheck").append(vControls);

        }
        else {
            $("#" + idelvalue + "").append(vControls);
        }

        $("#ContractTermType").addClass(IsDisabled);
        if (localStorage.AppDateFormat == null || localStorage.AppDateFormat == "" || localStorage.AppDateFormat == 'undefined') {
            $("#StartDate").datepicker({
                changeMonth: true,
                changeYear: true
            });
            $("#NextEvaluationDate").datepicker({
                changeMonth: true,
                changeYear: true
            });
            $("#EndDate").datepicker({
                changeMonth: true,
                changeYear: true
            });
        }
        else {
            var dateformate = localStorage.AppDateFormat.toLowerCase().slice(0, -2);
            $("#StartDate").datepicker({
                changeMonth: true,
                changeYear: true,
                dateFormat: dateformate
            });
            $("#NextEvaluationDate").datepicker({
                changeMonth: true,
                changeYear: true,
                dateFormat: dateformate
            });
            $("#EndDate").datepicker({
                changeMonth: true,
                changeYear: true,
                dateFormat: dateformate
            });
        }

        $("#tbRenewalActivities th").css({ "background": "#29324a", "color": "white", "font-weight": "bold" });
        if (vUserList == "") {
            vUserList = GetUserList();
        }
        //$("#RenewalConfirmParticipants").append(vUserList);
        //$("#RenewalConfirmParticipantsCC").append(vUserList);
        //$("#RenewalConfirmParticipants").chosen();
        //$("#RenewalConfirmParticipantsCC").chosen();
        bindAuthoriseUsers();
        $("#ddlRenewalNotfInternalNew").append(vUserList);
        $("#ddlRenewalNotfInternalNew").chosen();
        allowOnlyNumberInInputBox("ContractConfirmSendTerm");

        //allowOnlyNumberInInputBox("CounterpartyNoticesRenewal");
        //allowOnlyNumberInInputBox("CounterpartyNoticesCancel");
        OpenManageContractTerm(mainmetadataFieldsTerm, ContractID, IsStatus, IsPermission);
        if (!(IsStatus && IsPermission)) {
            $('#RenewalConfirmParticipants').prop('disabled', true).trigger("chosen:updated");
            $('#RenewalConfirmParticipantsCC').prop('disabled', true).trigger("chosen:updated");
            $("#RenewalAuthYes").attr("disabled", "disabled");
            $("#RenewalAuthNo").attr("disabled", "disabled");

        }
        //Sridhar
      //  $("#termtypeselect").attr("disabled", "disabled");

    }

    else {


        if (IsTermExists) {
            $("#EndDate").datepicker("option", "disabled", true);
            $("input[name='rdTermEndDate']").change(function () {
                if ($(this).val() == "Term") {
                    if ($(this).is(':checked')) {
                        $("#ContractTerm").prop('disabled', false);
                        $("#ContractTermChoices").prop('disabled', false);
                        $("#EndDate").datepicker("option", "disabled", true);

                        if (IsTermRequired) {
                            $("#ContractTerm").addClass("validelement");
                            $("#ContractTermChoices").addClass("validelement");
                        }
                        $("#EndDate").removeClass("validelement validdate error");
                    }
                } else {
                    if ($(this).is(':checked')) {
                        $("#EndDate").datepicker("option", "disabled", false);
                        $("#ContractTerm").val("");
                        $("#ContractTerm").prop('disabled', true);
                        $("#ContractTermChoices").prop('disabled', true);

                        if (IsTermRequired) {
                            $("#ContractTerm").removeClass("validelement error");
                            $("#ContractTermChoices").removeClass("validelement error");
                        }
                        $("#EndDate").addClass("validelement validdate");
                    }
                }
            });
        }
        else {
            if (onlydate != "" && DateFileldName == "EndDate") {
                $("#EndDate").datepicker({ dateFormat: dateformate });
                $("#EndDate").datepicker().datepicker('setDate', onlydate);

            }
            else {
                $("#EndDate").datepicker({ dateFormat: dateformate });
                if (DateFileldName == "NextEvaluationDate") {
                    DateFileldName = "";
                }
            }
            $("input[name='rdTermEndDate']").change(function () {
                if ($(this).val() == "Term") {
                    if ($(this).is(':checked')) {
                        $("#ContractTerm").prop('disabled', false);
                        $("#ContractTermChoices").prop('disabled', false);
                        $("#EndDate").datepicker("option", "disabled", true);

                        if (IsTermRequired) {
                            $("#ContractTerm").addClass("validelement");
                            $("#ContractTermChoices").addClass("validelement");
                        }
                        $("#EndDate").removeClass("validelement validdate error");
                    }
                } else {
                    if ($(this).is(':checked')) {
                        $("#EndDate").datepicker("option", "disabled", false);
                        $("#ContractTerm").val("");
                        $("#ContractTerm").prop('disabled', true);
                        $("#ContractTermChoices").prop('disabled', true);

                        if (IsTermRequired) {
                            $("#ContractTerm").removeClass("validelement error");
                            $("#ContractTermChoices").removeClass("validelement error");
                        }
                        $("#EndDate").addClass("validelement validdate");
                    }
                }
            });
        }
    }

    //Sridhar
    $('.form-contro-Date').on("paste", function (e) {
        e.preventDefault();
    });

    return idelcheck;
}

$("#undercheck").click(function (e) {
    e = e || window.event;
    var who = e.target || e.srcElement;
    if (who.id != null && who.id != "") {
        var seleteddel = who.id;
        seleteddel1 = seleteddel.match(/img/g);
        if (seleteddel1 == "img") {
            var divi = seleteddel.split("img");
            try {
                $("#" + divi[0]).slideToggle();
            }
            catch (ex) {
                throw ex;
            }
            var imgObj = $("#" + divi[0] + 'img');
            if (imgObj.attr("title") == "Collapse") {
                imgObj.attr("title", "Expand");
                imgObj.attr("src", "../Content/Images/e-open.png");
            } else {
                imgObj.attr("title", "Collapse");
                imgObj.attr("src", "../Content/Images/e-close.png");
            }
        }
    }
});
function getCounterpartyFields() {
    $("#loadingPage").fadeIn();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/primaryfields',
        type: 'GET',
        dataType: 'json',
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        cache: false,
        success: function (metadataFields) {
            vCounterpartyFields = [];
            $("#counterpartyDynamicItems").empty();
            $(metadataFields).each(function (i, item) {
                if (item != null && item.FieldName != null) {
                    if ((item.FieldName == "CounterpartyName") || (item.FieldName == "CounterpartyType") || (item.FieldName == "Status")) {
                        if (item.FieldName == "CounterpartyType") {
                            vCounterpartyFields.push(item.FieldName);
                        }
                    }
                    else {
                        vCounterpartyFields.push(item.FieldName);
                        if (item.ShowInCreateForm == "true") {
                            var vControls = "";
                            var vDate = "";
                            var vNumber = "";
                            var vPhoneNumber = "";
                            var isYesOrNo = false;
                            var PhoneID = "";
                            var PhoneCountry = "";
                            var vEmail = "";
                            var vMultiDDL = "";
                            var vUser = "";
                            var vUserList = "";
                            //manoj
                            var vCurrency = "";
                            var vNumberD = "";
                            var vNumberP = "";
                            var vNumberPD = "";
                            //manoj
                            if (item.Required == "true") {
                                vControls += '<li class="removableCounterpartyField CP_Det"><p><b>' + item.FieldDisplayName + '</b><small>*</small>';
                            } else {
                                vControls += '<li class="removableCounterpartyField CP_Det"><p><b>' + item.FieldDisplayName + '</b>';
                            }
                            if (item.FieldHelp == "true") {
                                vControls += '<span> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                            }
                            vControls += '</p><div>';
                            if (item.FieldType == "Single Line Text") {
                                if (item.FieldName == "Country") {
                                    if (item.Required == "true") {
                                        vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "'  class='validelement'>";

                                    } else {
                                        vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "'>";
                                    }
                                    vControls += "<option value='0'>--Select--</option>";
                                    $.ajax({
                                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/countrynames',
                                        type: 'GET',
                                        dataType: 'json',
                                        'Content-Type': 'application/json',
                                        cache: false,
                                        async: false,
                                        headers: {
                                            'eContracts-ApiKey': localStorage.APIKey
                                        },
                                        success: function (data) {
                                            $(data).each(function (i, item) {
                                                vControls += '<option value="' + item + '">' + item + '</option>';
                                            });
                                        },
                                        error:
                                            function (data) {

                                            }
                                    });

                                    vControls += '</select>';
                                    vControls += '<label  class="p-text">' + item.Description + '</label>';
                                    vControls += '</div></li>';
                                } else {
                                    if (item.Required == "true") {
                                        vControls += "<input type='text' id=" + item.FieldName + " maxlength='100' name=" + item.FieldName + " class='validelement'>";
                                    } else {
                                        vControls += "<input type='text' id=" + item.FieldName + " maxlength='100' name=" + item.FieldName + ">";
                                    }
                                    vControls += '<label  class="p-text">' + item.Description + '</label>';
                                    vControls += '</div></li>';
                                }
                            }
                            else if (item.FieldType == "Multi Line Text") {
                                if (item.Required == "true") {
                                    vControls += "<textarea name=" + item.FieldName + " id=" + item.FieldName + " title='" + item.FieldDisplayName + "' maxlength='500' cols='40' rows='5' class=' validelement'></textarea>";
                                } else {
                                    vControls += "<textarea name=" + item.FieldName + " id=" + item.FieldName + " title='" + item.FieldDisplayName + "' maxlength='500' cols='40' rows='5'></textarea>";
                                }
                                vControls += '<label  class="p-text">' + item.Description + '</label>';
                                vControls += '</div></li>';
                            }
                            else if (item.FieldType == "Hyperlink") {
                                //manoj
                                //for Hyperlink
                                var Hyperlinkvalue = item.DefaultURL;
                                if (item.Required == "true") {
                                    vControls += "<input type='text' id=CP" + item.FieldName + " maxlength='2083' name=" + item.FieldName + " placeholder='http://www.' value = '" + Hyperlinkvalue + "' class='validelement validwebsite'>";
                                } else {
                                    vControls += "<input type='text' id=CP" + item.FieldName + " maxlength='2083' name=" + item.FieldName + " placeholder='http://www.' value = '" + Hyperlinkvalue + "' class='validwebsite'>";
                                }
                                vControls += '<label  class="p-text">' + item.Description + '</label>';
                                vControls += '<br/>' + '<a href="javascript:void(0)" class="linkText" title="' + item.FieldDisplayName + '" onclick="navigateurl(\'CP' + item.FieldName + '\')"> Navigate</a>';
                                vControls += '</div></li>';
                                //for Hyperlink
                                //manoj
                            }
                            else if (item.FieldType == "Phone Number") {
                                //Vinod
                                if (item.Required == "true") {
                                    vControls += "<input type='text' id='" + item.FieldName + "_CP'  title='" + item.FieldDisplayName + "'  class='form-contro validelement validPhone fieldphonecontrol' />";
                                } else {
                                    vControls += "<input type='text' id='" + item.FieldName + "_CP'  title='" + item.FieldDisplayName + "'  class='form-contro validPhone fieldphonecontrol' />";
                                }
                                vControls += '<label  class="p-text">' + item.Description + '</label>';
                                vControls += '</div></li>';

                                vPhoneNumber = vControls;
                                PhoneID = item.FieldName + "_CP";
                                PhoneCountry = item.Country;
                            }
                            else if (item.FieldType == "Date") {
                                if (item.Required == "true") {
                                    vControls += "<input type='text' id=" + item.FieldName + " title='" + item.FieldDisplayName + "'  class='validelement validdate fielddatecontrol " + item.FieldName + "'/>";
                                } else {
                                    vControls += "<input type='text' id=" + item.FieldName + "  title='" + item.FieldDisplayName + "' class='validdate fielddatecontrol " + item.FieldName + "'/>";
                                }
                                vControls += '<br/>' + '<label class="p-text">' + item.Description + '</label>';
                                vControls += '</div></li>';

                                vDate = item.FieldName;
                            }
                            else if (item.FieldType == "Choice") {
                                if (item.Required == "true") {
                                    vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "'  class='validelement'>";

                                } else {
                                    vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "'>";
                                }
                                vControls += "<option value='0'>--Select--</option>";
                                var myArray = [];
                                myArray = item.ChoiceValues.split("\n")
                                var myArraylength = myArray.length;
                                for (var i = 0; i < myArraylength; i = i + 1) {
                                    do {
                                        myArray[i] = myArray[i].replace("&amp;", "&");
                                    } while (myArray[i].indexOf("&amp;") > -1)
                                    vControls += "<option value='" + myArray[i] + "'>" + myArray[i] + "</option>";
                                }

                                vControls += '</select>';
                                vControls += '<label class="p-text">' + item.Description + '</label>';
                                vControls += '</div></li>';
                            } else if (item.FieldType == "Lookup") {
                                if (item.FieldName == "RelatedCounterparties") {
                                    if (item.Required == "true") {
                                        vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validelement' readonly='readonly' type='text' />";
                                    } else {
                                        vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' readonly='readonly' type='text' />";
                                    }
                                    vControls += '<label class="p-text">' + item.Description + '</label>';
                                    vControls += "<br/>" + "<a href='javascript:void(0)' class='linkText' id='" + item.FieldDisplayName + "' title='" + item.FieldName + "' onclick='ViewCounterpartyRelated(this)'> Browse</a>";
                                    vControls += '</div></li>';
                                } else {
                                    if (item.Required == "true") {
                                        vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validelement'>";
                                    } else {
                                        vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "'>";
                                    }
                                    vControls += "<option value='0'>--Select--</option>";


                                    $.ajax({
                                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contracttermtypesenabled',
                                        type: 'GET',
                                        dataType: 'json',
                                        "Content-Type": "application/json",
                                        headers: {
                                            'eContracts-ApiKey': localStorage.APIKey
                                        },
                                        cache: false,
                                        success: function (data) {
                                            var datalength = data.length;
                                            for (var i = 0; i < datalength; i++) {
                                                var itemname = data[i];
                                                $("#" + item.FieldName).append("<option value='" + itemname.ContractTermName + "'>" + itemname.ContractTermDisplayName + "</option>")
                                            }
                                        }
                                    });
                                    vControls += '</select>';
                                    vControls += '<label class="p-text" id="termtypeHelpText">' + item.Description + '</label>';
                                    vControls += '</div></li>';

                                }
                            }
                            else if (item.FieldType.indexOf("Dropdown") > -1 || item.FieldType.indexOf("Multi Select") > -1) {
                                if (item.Required == "true") {
                                    vControls += "<select id=" + item.FieldName + " multiple='multiple' class='width90 chosenmulti validselect' name=" + item.FieldName + " title='" + item.FieldDisplayName + "' data-placeholder='--Select--'>"
                                } else {
                                    vControls += "<select id=" + item.FieldName + " multiple='multiple' class='width90 chosenmulti' name=" + item.FieldName + " title='" + item.FieldDisplayName + "' data-placeholder='--Select--'>"
                                }
                                if (item.FieldType.indexOf("Dropdown") > -1) {
                                    var vMultiDDL1 = "";
                                    if (vMultiDDL1 == '') {
                                        var myArray = [];
                                        myArray = item.ChoiceValues.split("\n")
                                        var myArraylength = myArray.length;
                                        for (var i = 0; i < myArraylength; i = i + 1) {
                                            vMultiDDL1 += "<option value='" + myArray[i] + "'>" + myArray[i] + "</option>";
                                        }
                                    }
                                    vControls += vMultiDDL1;
                                } else {
                                    var vMultiDDL1 = "";
                                    if (vMultiDDL1 == '') {
                                        $.ajax({
                                            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/customlookupvaluedetails?lookupname=' + item.ChoiceValues,
                                            type: 'GET',
                                            dataType: 'json',
                                            "Content-Type": "application/json",
                                            headers: {
                                                'eContracts-ApiKey': localStorage.APIKey
                                            },
                                            cache: false,
                                            async: false,
                                            success: function (data) {
                                                var datalength1 = data.LookupFields.split(';');
                                                datalength1 = datalength1.sort();
                                                datalength1 = sortArrOfObjectsByParam(datalength1);
                                                var datalength = datalength1.length;
                                                for (var i = 0; i < datalength; i++) {
                                                    var itemname = datalength1[i];
                                                    vMultiDDL1 += "<option value='" + itemname + "'>" + itemname + "</option>";
                                                }
                                            }
                                        });
                                    }
                                    vControls += vMultiDDL1;
                                }

                                vControls += '</select>';
                                vControls += '<label class="p-text">' + item.Description + '</label>';
                                vControls += '</div></li>';
                                vMultiDDL = item.FieldName;
                            }
                            else if (item.FieldType == "Number") {
                                if (item.Required == "true") {
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validelement form_input' />";
                                } else {
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form_input' />";
                                }
                                vControls += '<label class="p-text">' + item.Description + '</label>';
                                vControls += '</div></li>';
                                vNumber = item.FieldName;
                            }
                            else if (item.FieldType == "Number-D") {
                                if (item.Required == "true") {
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validelement form_input' />";
                                } else {
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form_input' />";
                                }
                                vControls += '<label class="p-text">' + item.Description + '</label>';
                                vControls += '</div></li>';
                                vNumberD = item.FieldName;
                            }
                                //Percent
                            else if (item.FieldType == "Number-P") {
                                if (item.Required == "true") {
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validelement form_input' />";
                                } else {
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form_input' />";
                                }
                                vControls += '<label class="margin-top-8 p-text" style="float: right;position: absolute;">' + '%' + '</label>';
                                vControls += '<label class="p-text" style="float: left;">' + item.Description + '</label>';
                                vControls += '</div></li>';
                                vNumberP = item.FieldName;
                            }
                                //Percent Decimal
                            else if (item.FieldType == "Number-PD") {
                                if (item.Required == "true") {
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validelement form_input' />";
                                } else {
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form_input' />";
                                }
                                vControls += '<label class="margin-top-8 p-text" style="float: right;position: absolute;">' + '%' + '</label>';
                                vControls += '<label class="p-text" style="float: left;">' + item.Description + '</label>';
                                vControls += '</div></li>';
                                vNumberPD = item.FieldName;
                            }
                            else if (item.FieldType == "Yes/No") {
                                var isYesOrNo = false;
                                if ($(metadataFields).find(item.FieldName).text() == "") {
                                    vControls += "	<div style='width: auto; margin-right: 15px;'><input style='float: left; width: auto;' type='radio' id='Yes" + item.FieldName + "' name=" + item.FieldName + " value='Yes' onchange='changeYesNoFieldCounterparty(this);'><span style='float: left; margin: 7px 0px 0px 5px;'>Yes </span></div>";
                                    vControls += "	<div style='width: auto;'><input style='float: left; width: auto;' type='radio' id='No" + item.FieldName + "' name=" + item.FieldName + " checked value='No' onchange='changeYesNoFieldCounterparty(this);'><span style='float: left; margin: 7px 0px 0px 5px;'>No </span></div>";
                                    vControls += "	<input type='hidden' id='hdnYes" + item.FieldName + "' value=" + item.CommentYes + " />";
                                    vControls += "	<input type='hidden' id='hdnNo" + item.FieldName + "' value=" + item.CommentNo + " />";
                                    vControls += "	<input type='hidden' id='hdnRequired" + item.FieldName + "' value=" + item.CommentRequired + " />";
                                    if (item.CommentNo == "true") {
                                        isYesOrNo = true;
                                    }
                                } else {
                                    if ($(metadataFields).find(item.FieldName).text() == "Yes") {
                                        vControls += "	<div style='width: auto; margin-right: 15px;'><input style='float: left; width: auto;' type='radio' id='Yes" + item.FieldName + "' name=" + item.FieldName + " checked value='Yes' onchange='changeYesNoFieldCounterparty(this);'><span style='float: left; margin: 7px 0px 0px 5px;'>Yes </span></div>";
                                        vControls += "	<div style='width: auto;'><input style='float: left; width: auto;' type='radio' id='No" + item.FieldName + "' name=" + item.FieldName + " value='No' onchange='changeYesNoFieldCounterparty(this);'><span style='float: left; margin: 7px 0px 0px 5px;'>No </span></div>";
                                        vControls += "	<input type='hidden' id='hdnYes" + item.FieldName + "' value=" + item.CommentYes + " />";
                                        vControls += "	<input type='hidden' id='hdnNo" + item.FieldName + "' value=" + item.CommentNo + " />";
                                        vControls += "	<input type='hidden' id='hdnRequired" + item.FieldName + "' value=" + item.CommentRequired + " />";
                                        if (item.CommentYes == "true") {
                                            isYesOrNo = true;
                                        }
                                    } else {

                                        vControls += "	<div style='width: auto; margin-right: 15px;'><input style='float: left; width: auto;' type='radio' id='Yes" + item.FieldName + "' name=" + item.FieldName + " value='Yes' onchange='changeYesNoFieldCounterparty(this);'><span style='float: left; margin: 7px 0px 0px 5px;'>Yes </span></div>";
                                        vControls += "	<div style='width: auto;'><input style='float: left; width: auto;' type='radio' id='No" + item.FieldName + "' name=" + item.FieldName + " checked value='No' onchange='changeYesNoFieldCounterparty(this);'><span style='float: left; margin: 7px 0px 0px 5px;'>No </span></div>";
                                        vControls += "	<input type='hidden' id='hdnYes" + item.FieldName + "' value=" + item.CommentYes + " />";
                                        vControls += "	<input type='hidden' id='hdnNo" + item.FieldName + "' value=" + item.CommentNo + " />";
                                        vControls += "	<input type='hidden' id='hdnRequired" + item.FieldName + "' value=" + item.CommentRequired + " />";
                                        if (item.CommentNo == "true") {
                                            isYesOrNo = true;
                                        }
                                    }
                                }
                                vControls += '<label style="width:auto;margin:7px 0px 0px 5px;" class="col12 p-text text-left help">' + item.Description + '</label>';
                                if (isYesOrNo) {
                                    vControls += "<li class='removableCounterpartyField CP_Det'>";
                                    if (item.CommentRequired == "true") {
                                        vControls += '<p><b>Add a Comment</b><small>*</small></p>';
                                    } else {
                                        vControls += '<p><b>Add a Comment</b></p>';
                                    }
                                    vControls += '<div>';
                                    if (item.CommentRequired == "true") {
                                        vControls += '<textarea name="CustomCMD' + item.FieldName + '" id="CustomCMD' + item.FieldName + '" maxlength="500" title="' + item.FieldName + '" cols="25" rows="3" class="form-contro validelement" value="' + $(metadataFields).find('CustomCMD' + item.FieldName).text() + '">' + $(metadataFields).find('CustomCMD' + item.FieldName).text() + '</textarea>';
                                    } else {
                                        vControls += '<textarea name="CustomCMD' + item.FieldName + '" id="CustomCMD' + item.FieldName + '" maxlength="500" title="' + item.FieldName + '" cols="25" rows="3" class="form-contro" value="' + $(metadataFields).find('CustomCMD' + item.FieldName).text() + '">' + $(metadataFields).find('CustomCMD' + item.FieldName).text() + '</textarea>';
                                    }
                                }
                                vControls += '</div></li>';
                            } else if (item.FieldType == "Email") {
                                if (item.Required == "true") {
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validemail validelement' />";
                                } else {
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validemail' />";
                                }
                                vControls += '<label  class="p-text">' + item.Description + '</label>';
                                vControls += '</div></li>';
                            } else if (item.FieldType.indexOf("Browse") > -1) {
                                if (item.Required == "true") {
                                    vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validelement' readonly='readonly' type='text' />";
                                } else {
                                    vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' readonly='readonly' type='text' />";
                                }
                                vControls += '<label  class="p-text">' + item.Description + '</label>';
                                vControls += "<br/>" + "<a href='javascript:void(0)' class='linkText' id='" + item.FieldDisplayName + "' title='" + item.FieldName + "' onclick='ViewGenericCounterparty(this)'> Browse</a>";
                                vControls += '</div></li>';
                            } else if (item.FieldType == "File Upload") {
                                if (item.Required == "true") {
                                    vControls += "<input type='file' id=" + item.FieldName + " name='docAttachment' title='" + item.FieldDisplayName + "' class='form-contro validelement' onchange='javascript:changeinupload(this);' />";
                                } else {
                                    vControls += "<input type='file' id=" + item.FieldName + " name='docAttachment' title='" + item.FieldDisplayName + "' class='form-contro' onchange='javascript:changeinupload(this);' />";
                                }
                                vControls += '<label  class="p-text">' + item.Description + '</label>';
                                vControls += '</div></li>';
                            } else if (item.FieldType == "Currency" || item.FieldType == "Value / Financials") {
                                //manoj
                                if (item.Required == "true") {
                                    //vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validelement' />";
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validelement validcontractvalue' />";
                                } else {
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validcontractvalue' />";
                                    //vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' />";
                                }
                                vControls += '<label class="p-text">' + item.Description + '</label>';
                                vControls += '</div></li>';
                                vCurrency = item.FieldName;
                            } else if (item.FieldType == "User") {
                                if (item.Required == "true") {
                                    vControls += "<select id=" + item.FieldName + " multiple='multiple' class='form-contro f_inpt width90 chosenmulti validselect' name=" + item.FieldName + " title='" + item.FieldDisplayName + "' data-placeholder='--Select--'>"
                                } else {
                                    vControls += "<select id=" + item.FieldName + " multiple='multiple' class='form-contro f_inpt width90 chosenmulti' name=" + item.FieldName + " title='" + item.FieldDisplayName + "' data-placeholder='--Select--'>"
                                }

                                if (vUserList == "") {
                                    vUserList = GetUserList();
                                }
                                vControls += vUserList;
                                vControls += '</select>';
                                vControls += '<label class="p-text">' + item.Description + '</label>';
                                vUser = item.FieldName;
                                vControls += '</div></li>';
                            }

                            $("#counterpartyDynamicItems").append(vControls);
                            if (vDate != "") {

                                if (localStorage.AppDateFormat == null || localStorage.AppDateFormat == "" || localStorage.AppDateFormat == 'undefined') {
                                    $("#" + vDate + "").datepicker({
                                        changeMonth: true,
                                        changeYear: true
                                    });
                                }
                                else {
                                    var dateformate = localStorage.AppDateFormat.toLowerCase().slice(0, -2);

                                    $("#" + vDate + "").datepicker({
                                        changeMonth: true,
                                        changeYear: true, dateFormat: dateformate
                                    });

                                }
                                vDate = "";
                            }
                            if (vNumber != "") {
                                allowOnlyNumberInInputBox(vNumber);
                                vNumber == "";
                            }

                            if (vNumberD != "") {
                                allowOnlyDecimalNumberInInputBox(vNumberD);
                                vNumberD == "";
                            }
                            if (vNumberP != "") {
                                allowOnlyNumberInInputBox(vNumberP);
                                vNumberP == "";
                            }
                            if (vNumberPD != "") {
                                allowOnlyDecimalNumberInInputBox(vNumberPD);
                                vNumberPD == "";
                            }

                            if (vPhoneNumber != "") {
                                bindPhoneNumberEdit(PhoneID, PhoneCountry);
                                vPhoneNumber = "";
                                PhoneID = "";
                                PhoneCountry = "";
                            }

                            if (vMultiDDL != "") {
                                $("#" + vMultiDDL + "").chosen().trigger("chosen:updated");
                                $('.chosenmulti').on('chosen:showing_dropdown', function (evt, params) {
                                    $('.result-selected').css('display', 'none');
                                });
                                vMultiDDL = "";
                            }

                            if (vUser != "") {
                                $("#" + vUser + "").chosen().trigger("chosen:updated");
                                $('.chosenmulti').on('chosen:showing_dropdown', function (evt, params) {
                                    $('.result-selected').css('display', 'none');
                                });
                                vUser = "";
                            }
                            //manoj
                            if (vCurrency != "") {
                                if (vCurrencyDisplayStyle == "UK") {
                                    $('#' + vCurrency).autoNumeric();
                                } else if (vCurrencyDisplayStyle == "CAN") {
                                    $('#' + vCurrency).autoNumeric({
                                        aSep: ' ',
                                        aDec: '.',
                                    });

                                } else if (vCurrencyDisplayStyle == "EU") {
                                    $('#' + vCurrency).autoNumeric({
                                        aSep: '.',
                                        aDec: ',',
                                    });
                                } else if (vCurrencyDisplayStyle == "IND") {
                                    $('#' + vCurrency).autoNumeric({
                                        dGroup: '2',
                                    });
                                }
                                vCurrency == "";
                            }
                            //manoj
                        }
                    }
                }
            });
            $("#loadingPage").fadeOut();
        },
        error: function (metadataFields) {
            vCounterpartyFields = [];
            $("#loadingPage").fadeOut();
        },
    });
}



function CheckLicenseLimit() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/LicenseLimit',
        type: 'GET',
        cache: false,
        contentType: false,
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        processData: false,
        success: function (item) {
            LicenseItem = item;
            if (LicenseItem != null) {
                var ContractsforContractAreaLimitArray = [];
                var ContractsforContractAreaUsedArray = [];
                ContractsforContractAreaLimitArray = getXMLToArray(item.ContractsforContractAreaLimit);
                ContractsforContractAreaUsedArray = getXMLToArray(item.ContractsforContractAreaUsed);
                for (key in ContractsforContractAreaLimitArray) {
                    if (parseInt(ContractsforContractAreaLimitArray[key]) < parseInt(ContractsforContractAreaUsedArray[key])) {
                        arrCALicenseLimit.push(key);
                    }
                }
            }

            if (item.CounterpartiesUsed > item.CounterpartiesLimit) {

                $('#chkCounterpartyNotInList').attr('disabled', true);
            }
            else {
                $('#chkCounterpartyNotInList').attr('disabled', false);
            }


        }
    });
}

function getXMLToArray(xmlDoc) {

    var thisArray = [];
    //Check XML doc
    if ($(xmlDoc).find("ContractAreaLimit").length > 0) {
        $(xmlDoc).find("ContractAreaLimit").each(function () {
            thisArray[$(this).find("ContractArea").text()] = $(this).find("Contracts").text();
        });
    }
    else if ($(xmlDoc).find("ContractAreaUsed").length > 0) {
        $(xmlDoc).find("ContractAreaUsed").each(function () {
            thisArray[$(this).find("ContractArea").text()] = $(this).find("Contracts").text();
        });
    }
    return thisArray;
}







function GetUserList() {

    var vUserList = '';
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/users',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        async: false,
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        success: function (dataUser) {
            allUsersList = dataUser;
            $(dataUser).each(function (i, item) {
                var sRowKey = item.RowKey;
                var sUserName = item.UserName;
                vUserList += '<option value="' + sUserName + '">' + sUserName + '</option>';
            });
        },
        error:
            function (dataUser) {
            }
    });
    return vUserList;
}
function getpaymenttype(obj) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/paymenttypes',
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        cache: false,
        success: function (data) {
            $(data).each(function (i, item) {
                if (item.TypeName == obj) {
                    $("#PaymentType").append("<option value='" + item.TypeName + "' selected='selected'>" + item.TypeName + "</option>")
                } else {
                    $("#PaymentType").append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>")
                }
            });

        }
    });
}
function getlicencetype(obj) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/licencetypes',
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        cache: false,
        success: function (data) {
            $(data).each(function (i, item) {
                if (item.TypeName == obj) {
                    $("#LicenceType").append("<option value='" + item.TypeName + "' selected='selected'>" + item.TypeName + "</option>")
                } else {
                    $("#LicenceType").append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>")
                }
            });

        }
    });
}
function getTimeZone() {
    var offset = new Date().getTimezoneOffset(), o = Math.abs(offset);
    return (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
}

function calculateenddate() {
    if ($("#ContractTermChoices").find('option:selected').val() == "months" && ($("#ContractTerm").val() % 12 == 0)) {
        $("#ContractTermChoices").val('years');
        $("#ContractTerm").val($("#ContractTerm").val() / 12);
    }
    if (typeof $("#StartDate").val() != "undefined" && typeof $("#ContractTerm").val() != "undefined" && $("#StartDate").val() != "" && $("#ContractTerm").val() != "") {
        var nextDate = moment($.datepicker.formatDate('mm/dd/yy', $("#StartDate").datepicker('getDate'))).add($("#ContractTerm").val(), $("#ContractTermChoices").find('option:selected').val());
        if (nextDate._d != "Invalid Date") {
            if (localStorage.AppDateFormat == null || localStorage.AppDateFormat == "" || localStorage.AppDateFormat == 'undefined') {
                //if ($("#EndDate").val() == "") {
                if (getTimeZone().indexOf('+') > -1)
                    $("#EndDate").val(moment(nextDate).utc().format('MM/DD/YYYY'));
                else if (getTimeZone().indexOf('+00:00') > -1 || getTimeZone().indexOf('-') > -1)
                    $("#EndDate").val(moment(nextDate).utc().subtract(1, "days").format('MM/DD/YYYY'));
                //}
            }
            else {
                //if ($("#EndDate").val() == "") {
                if (getTimeZone().indexOf('+') > -1)
                    $("#EndDate").val(moment(nextDate).utc().format(localStorage.AppDateFormat));
                else if (getTimeZone().indexOf('+00:00') > -1 || getTimeZone().indexOf('-') > -1)
                    $("#EndDate").val(moment(nextDate).utc().subtract(1, "days").format(localStorage.AppDateFormat));
                //}
            }
        }
    }
}


function ClearGenericRelated() {
    $('#loadGencon').html('<img src="../Content/Images/icon/loading.gif">');
    $("#tblGenericforcon").find("tr:gt(0)").remove();
    $("#txtSearchBoxGenericcon").val("")
    var searchKeyword = "";
    filtergenericRelated(searchKeyword);
}

function SearchGenericRelated() {
    $('#loadGencon').html('<img src="../Content/Images/icon/loading.gif">Searching...');
    $("#tblGenericforcon").find("tr:gt(0)").remove();
    var searchKeyword = $("#txtSearchBoxGenericcon").val();
    filtergenericRelated(searchKeyword);
}

function filtergenericRelated(searchKeyword) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/counterpartypicker',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        success: function (data) {
            var prevSelected = $("#" + vGlobalObjForGeneric.title).val();
            var arrprev = [];
            $.each(prevSelected.split(";"), function () {
                arrprev.push($.trim(this));
            });

            var datalength = data.length;
            var genItems = [];
            for (var i = 0; i < datalength; i = i + 1) {
                var item = data[i];
                if (item.CounterpartyName.indexOf(searchKeyword) > -1 || searchKeyword == "") {
                    var article = "";
                    if (i == 0) {
                        article += '<tr><th><input id="selectall" onclick="funselectallcon(this);" type="checkbox"/> Select/Deselect All</th></tr>';
                    }
                    article += '<tr><td>';
                    if (arrprev.indexOf(item.CounterpartyName) >= 0) {
                        article += '<input id="' + escape(item.CounterpartyName) + '" type="checkbox" name="Genericcon" checked class="css1-checkbox" value="' + escape(item.CounterpartyName) + '" />';
                    } else {
                        article += '<input id="' + escape(item.CounterpartyName) + '" type="checkbox" name="Genericcon" class="css1-checkbox" value="' + escape(item.CounterpartyName) + '" />';
                    }
                    article += '<label for="' + escape(item.CounterpartyName) + '" class="css1-label">' + item.CounterpartyName + '</label>';
                    article += '</td></tr>';
                    $("#tblGenericforcon").append(article);
                    genItems.push(item.CounterpartyName);
                }
            }

            var vCount = $("#tblGenericforcon tr").length;
            $('#compact-paginationGenericcon').pagination({
                items: vCount,
                itemsOnPage: 11,
                typeID: 'tblGenericforcon',
                cssStyle: 'compact-theme'
            });
            $("#txtSearchBoxGenericcon").autocomplete({
                source: genItems,
                minLength: 1,
                focus: function (event, ui) {
                    return false;
                },
                select: function (evn, uidetails) {
                    $("#txtSearchBoxGenericcon").val(uidetails.item.label);
                    SearchGenericRelated();
                }
            });
            $('#loadGencon').empty();
        },
        error:
            function (data) {

            }
    });
}

function ViewGenericCounterparty(obj) {
    vGlobalObjForGeneric = obj;
    $("#loadingPage").fadeIn();
    $("#tblGeneric").empty();
    $("#tblGenericheader").empty();
    $("#liSelectedRU").empty();
    var art = '<tr><td><article style="width:100%; text-align:center;">';
    art += '<input id="txtSearchBoxGeneric" class="f_inpt cl width80" type="text" style="text-wrap:none" placeholder="Type to Search" />';
    art += '<img title="Search" style="cursor: pointer; position: relative; left: -40px; top:-2px;" onclick="javascript: SearchGenericCounterparty();" src="../Content/Images/search_over.png" />';
    art += "<a href='javascript:void(0)' class='linkPickerClear' onclick='ClearGenericCounterparty();'>Clear</a>";
    art += '</article></td></tr>';
    $("#tblGenericheader").append(art);

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterpartyfieldbydisplayname?fielddisplayname=' + obj.id,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        success: function (data) {
            var prevSelected = $("#" + obj.title).val();
            var arrprev = [];
            $.each(prevSelected.split(";"), function () {
                arrprev.push($.trim(this));
            });
            var arraysplitRU = [];
            myArrayRU = [];
            arraysplitRU = data[0].ChoiceValues.split("\n")
            var obj1 = {
            };
            for (var i = 0; i < arraysplitRU.length; i++) {
                if (!(arraysplitRU[i] in obj1)) {
                    if (arraysplitRU[i].trim() != "") {
                        myArrayRU.push(arraysplitRU[i]);
                    }
                }
                obj1[arraysplitRU[i]] = true;
            }
            var resultfound = true;
            var myArraylength = myArrayRU.length;
            $("#browseGeneric").data('param_1', obj.title).dialog("option", "title", obj.id + " Picker");
            CreateCounterPartyList(0);

            var vCount = myArraylength;

            $('#compact-paginationGeneric').pagination({
                items: vCount,
                itemsOnPage: 10,
                typeID: 'tblGeneric',
                cssStyle: 'compact-theme',
                listname: 'CounterPartyUnit'
            });
            $('#compact-paginationGeneric').css("display", "");
            $("#txtSearchBoxGeneric").autocomplete({
                source: myArrayRU,
                minLength: 1,
                focus: function (event, ui) {
                    return false;
                },
                select: function (evn, uidetails) {
                    $("#txtSearchBoxGeneric").val(uidetails.item.label);
                    SearchGenericCounterparty();
                }
            });
            $("#browseGeneric").dialog("open");
            $("#loadingPage").fadeOut();
        },
        error:
            function (data) {
                $("#tblGeneric").html("No items found.");
                $("#browseGeneric").dialog("open");
                $("#loadingPage").fadeOut();
            }
    });

    $('#txtSearchBoxGeneric').keypress(function (e) {
        if ($('#txtSearchBoxGeneric').val() != "") {
            if (e.keyCode == 13) {
                $(".ui-autocomplete").css('display', 'none');
                SearchGenericCounterparty();
            }
        }
    });
}

function ClearGenericCounterparty() {
    $('#loadGen').html('<img src="../Content/Images/icon/loading.gif">');
    $("#tblGeneric").find("tr:gt(0)").remove();
    $("#txtSearchBoxGeneric").val("")
    var searchKeyword = "";
    filtergenericCounterparty(searchKeyword);
}
function SearchGenericCounterparty() {
    $('#loadGen').html('<img src="../Content/Images/icon/loading.gif">Searching...');
    $("#tblGeneric").find("tr:gt(0)").remove();
    var searchKeyword = $("#txtSearchBoxGeneric").val();
    filtergenericCounterparty(searchKeyword);
}

function filtergenericCounterparty(searchKeyword) {
    $("#tblGeneric").empty();
    $("#liSelectedRU").empty();
    multipleChecksDocumentID = [];
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterpartyfieldbydisplayname?fielddisplayname=' + vGlobalObjForGeneric.id,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        success: function (data) {
            $("#tblGeneric").empty();
            $("#liSelectedRU").empty();
            var prevSelected = $("#" + vGlobalObjForGeneric.title).val();
            var arrprev = [];
            $.each(prevSelected.split(";"), function () {
                arrprev.push($.trim(this));
            });

            var arraysplitRU = [];
            myArrayRU = [];
            arraysplitRU = data[0].ChoiceValues.split("\n")
            var obj1 = {
            };
            for (var i = 0; i < arraysplitRU.length; i++) {
                if (!(arraysplitRU[i] in obj1)) {
                    if (arraysplitRU[i].trim() != "") {
                        if (arraysplitRU[i].toLowerCase().indexOf(searchKeyword.toLowerCase()) > -1 || searchKeyword == "") {
                            myArrayRU.push(arraysplitRU[i]);
                        }
                        obj1[arraysplitRU[i]] = true;
                    }
                }
            }
            var resultfound = true;
            var myArraylength = myArrayRU.length;
            CreateCounterPartyList(0);

            var vCount = myArraylength;

            var vCount = $("#tblGeneric tr").length;
            $('#compact-paginationGeneric').pagination({
                items: vCount,
                itemsOnPage: 10,
                typeID: 'tblGeneric',
                cssStyle: 'compact-theme',
                listname: 'CounterPartyUnit'
            });
            $("#txtSearchBoxGeneric").autocomplete({
                source: arraysplitRU,
                minLength: 1,
                focus: function (event, ui) {
                    return false;
                },
                select: function (evn, uidetails) {
                    $("#txtSearchBoxGeneric").val(uidetails.item.label);
                    SearchGeneric();
                }
            });
            $('#loadGen').empty();
        },
        error:
            function (data) {
                $('#loadGen').empty();
                $("#liSelectedRU").empty();
                $("#tblGeneric").html('No item found.');
            }
    });
}


function CheckContractNumberSetting() {
    $("#loadingPage").fadeIn();
    if (typeof thisContractAreaSettings != 'undefined') {
        if (thisContractAreaSettings.ContractNumbering == "Auto") {
            $("#aOnDemand").css("display", "");
            if (thiscontractstatus != "pipeline" && getParameterByName("Duplicate") != "Yes" && IsFullControlUser != true) {
                $('#txtContractNumber').attr('readonly', 'readonly');
            } else {
                $('#txtContractNumber').removeAttr('readonly', 'readonly');
            }
        }
        else if (thisContractAreaSettings.ContractNumbering == "Auto-NonEdit") {
            $("#aOnDemand").css('display', 'none');
            if ($("#txtContractNumber").val() == "") {
                GenerateContactNumber();
            }
            else {
                IsContactNumberGenerated = false;

            }
            $('#txtContractNumber').attr('readonly', 'readonly')
        }
        else if (thisContractAreaSettings.ContractNumbering == "Manual") {
            $("#aOnDemand").css('display', 'none');
            if (thiscontractstatus != "pipeline" && getParameterByName("Duplicate") != "Yes" && IsFullControlUser != true) {
                $('#txtContractNumber').attr('readonly', 'readonly');
            } else {
                $('#txtContractNumber').removeAttr('readonly', 'readonly')
            }
        }
    }
    $("#loadingPage").fadeOut();
}

var IsContactNumberGenerated = true;
function GenerateContactNumber() {
    $("#loadingPage").fadeIn();
    var FinalProfileValue = '';
    var businessAreaAndContractArea = $("#txtBusinessArea").val() + "~" + $('#txtContractAreaName').val();
    var contractTypesplit = $("#ddlContractTypes").val().split("~");
    if (contractTypesplit[0] != "0") {
        IsContactNumberGenerated = true;
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contracts/generatecontractnumberformat?businessAreaAndContractArea=' + encodeURIComponent(businessAreaAndContractArea) + '&contractType=' + encodeURIComponent(contractTypesplit[0]),
            type: 'GET',
            dataType: 'json',
            headers: {
                'eContracts-ApiKey': localStorage.APIKey, 'UserName': localStorage.UserName
            },
            cache: false,
            success: function (data) {
                //manoj

                ContractNumberFinalFormat = data;
                // var legalentitytextboxvalue = $("#CompanyProfile").find('option:selected').text()
                var legalentitytextboxvalue = $("#CompanyProfile").val();
                if (typeof thisLegalEntity != 'undefined' && thisLegalEntity != "" && typeof legalentitytextboxvalue != 'undefined' && legalentitytextboxvalue != "" && legalentitytextboxvalue != "--Select--") {
                    if (legalentitytextboxvalue != thisLegalEntity || ((typeof PreviousLegalEntity != 'undefined' && PreviousLegalEntity != null && PreviousLegalEntity != "") ? (PreviousLegalEntity != legalentitytextboxvalue) : false)) {
                        var gotfinalvalue = "";
                        PreviousLegalEntity = "";
                        for (keyvalue in ContractNumberFinalFormat) {
                            if (keyvalue.indexOf('Auto Increment Number') > -1) {
                                if (PrvAutoinceramentNumberforValidate != null && PrvAutoinceramentNumberforValidate != "") {
                                    if (PrvAutoinceramentNumberforValidate.indexOf("_Duplicate") > -1) {
                                        duplicatecontractchecking = (duplicatecontractchecking != "") ? duplicatecontractchecking : PrvAutoinceramentNumberforValidate;
                                        PrvAutoinceramentNumberforValidate = PrvAutoinceramentNumberforValidate.replace(/_Duplicate/g, "");
                                        ContractNumberFinalFormat[keyvalue] = PrvAutoinceramentNumberforValidate;
                                    } else {
                                        ContractNumberFinalFormat[keyvalue] = PrvAutoinceramentNumberforValidate;
                                    }
                                }
                                AutoinceramentNumberforValidate = ContractNumberFinalFormat[keyvalue]
                            } else if (keyvalue.indexOf('Legal Entity Name') > -1) {
                                //var vAccFeatdetails = $.grep(LeagalEntity, function (n, i) {
                                //    return (n.LegalEntityName == $("#CompanyProfile").find('option:selected').text());
                                //});
                                //if (vAccFeatdetails.length > 0) {
                                //    ContractNumberFinalFormat[keyvalue] = vAccFeatdetails[0].Abbreviation;
                                //}

                                if ($("#CompanyProfile").val().indexOf(';') > -1) {
                                    var profiles = $("#CompanyProfile").val().replace("; ", ";");
                                    aryProfiles = profiles.split(';');
                                    $(aryProfiles).each(function (i, profile) {
                                        var vAccFeatdetails = $.grep(LeagalEntity, function (n, i) {
                                            // return (n.LegalEntityName == $("#CompanyProfile").find('option:selected').text());
                                            return (n.LegalEntityName == profile.trim());
                                        });

                                        if (vAccFeatdetails.length > 0) {
                                            if (globalseparator == "")
                                                globalseparator = "/";
                                            if (FinalProfileValue == '')
                                                FinalProfileValue = vAccFeatdetails[0].Abbreviation;
                                            else
                                                FinalProfileValue = FinalProfileValue + globalseparator + vAccFeatdetails[0].Abbreviation;
                                        }
                                    });

                                }
                                else {
                                    var vAccFeatdetails = $.grep(LeagalEntity, function (n, i) {
                                        // return (n.LegalEntityName == $("#CompanyProfile").find('option:selected').text());
                                        return (n.LegalEntityName == $("#CompanyProfile").val().trim());
                                    });
                                    if (vAccFeatdetails.length > 0) {
                                        FinalProfileValue = vAccFeatdetails[0].Abbreviation;
                                    }
                                }

                                ContractNumberFinalFormat[keyvalue] = FinalProfileValue;
                            }
                            var valuevalue = ContractNumberFinalFormat[keyvalue];
                            gotfinalvalue += valuevalue;
                        }
                        AutoinceramentNumberforValidate = (typeof AutoinceramentNumberforValidate != 'undefined' && AutoinceramentNumberforValidate != null && AutoinceramentNumberforValidate != "") ? AutoinceramentNumberforValidate : "";
                        if (duplicatecontractchecking != "") {
                            var rescount = duplicatecontractchecking.match(/_Duplicate/g);
                            for (resc = 0; resc < rescount.length; resc++) {
                                AutoinceramentNumberforValidate += "_Duplicate";
                                gotfinalvalue += "_Duplicate";
                            }
                        }
                        $('#txtContractNumber').val(gotfinalvalue);
                        $('#hdContractNumber').val(gotfinalvalue);
                    } else {
                        var gotfinalvalue = "";
                        for (keyvalue in ContractNumberFinalFormat) {
                            if (keyvalue.indexOf('Auto Increment Number') > -1) {
                                if (PrvAutoinceramentNumberforValidate != null && PrvAutoinceramentNumberforValidate != "") {
                                    if (PrvAutoinceramentNumberforValidate.indexOf("_Duplicate") > -1) {
                                        duplicatecontractchecking = (duplicatecontractchecking != "") ? duplicatecontractchecking : PrvAutoinceramentNumberforValidate;
                                        PrvAutoinceramentNumberforValidate = PrvAutoinceramentNumberforValidate.replace(/_Duplicate/g, "");
                                        ContractNumberFinalFormat[keyvalue] = PrvAutoinceramentNumberforValidate;
                                    } else {
                                        ContractNumberFinalFormat[keyvalue] = PrvAutoinceramentNumberforValidate;
                                    }
                                }
                                AutoinceramentNumberforValidate = ContractNumberFinalFormat[keyvalue]
                            }
                            var valuevalue = ContractNumberFinalFormat[keyvalue];
                            gotfinalvalue += valuevalue;
                        }
                        AutoinceramentNumberforValidate = (typeof AutoinceramentNumberforValidate != 'undefined' && AutoinceramentNumberforValidate != null && AutoinceramentNumberforValidate != "") ? AutoinceramentNumberforValidate : "";
                        if (duplicatecontractchecking != "") {
                            var rescount = duplicatecontractchecking.match(/_Duplicate/g);
                            for (resc = 0; resc < rescount.length; resc++) {
                                AutoinceramentNumberforValidate += "_Duplicate";
                                gotfinalvalue += "_Duplicate";
                            }
                        }
                        $('#txtContractNumber').val(gotfinalvalue);
                        $('#hdContractNumber').val(gotfinalvalue);
                    }
                } else {
                    var gotfinalvalue = "";
                    for (keyvalue in ContractNumberFinalFormat) {
                        if (keyvalue.indexOf('Auto Increment Number') > -1) {
                            if (PrvAutoinceramentNumberforValidate != null && PrvAutoinceramentNumberforValidate != "") {
                                if (PrvAutoinceramentNumberforValidate.indexOf("_Duplicate") > -1) {
                                    duplicatecontractchecking = (duplicatecontractchecking != "") ? duplicatecontractchecking : PrvAutoinceramentNumberforValidate;
                                    PrvAutoinceramentNumberforValidate = PrvAutoinceramentNumberforValidate.replace(/_Duplicate/g, "");
                                    ContractNumberFinalFormat[keyvalue] = PrvAutoinceramentNumberforValidate;
                                } else {
                                    ContractNumberFinalFormat[keyvalue] = PrvAutoinceramentNumberforValidate;
                                }
                            }
                            AutoinceramentNumberforValidate = ContractNumberFinalFormat[keyvalue]
                        }
                        var valuevalue = ContractNumberFinalFormat[keyvalue];
                        gotfinalvalue += valuevalue;
                    }
                    AutoinceramentNumberforValidate = (typeof AutoinceramentNumberforValidate != 'undefined' && AutoinceramentNumberforValidate != null && AutoinceramentNumberforValidate != "") ? AutoinceramentNumberforValidate : "";
                    if (duplicatecontractchecking != "") {
                        var rescount = duplicatecontractchecking.match(/_Duplicate/g);
                        for (resc = 0; resc < rescount.length; resc++) {
                            AutoinceramentNumberforValidate += "_Duplicate";
                            gotfinalvalue += "_Duplicate";
                        }
                    }
                    $('#txtContractNumber').val(gotfinalvalue);
                    $('#hdContractNumber').val(gotfinalvalue);
                }
                $("#loadingPage").fadeOut();
                //manoj
            },
            error: function (data) {
                $("#loadingPage").fadeOut();
            }
        });
    }
    else {
        IsContactNumberGenerated = false;
    }
}

function checkMultipleDocuments(object) {
    $('#liSelectedRU').empty();
    var checkboxcheck = true;
    $('input[type=checkbox][name="Generic"]').each(function () {
        var DocumentID = this.id;
        var duplicatechecking = false;
        var isChecked = this.checked;
        if (isChecked) {
            if ((multipleChecksDocumentID.indexOf(DocumentID.trim())) == -1) {
                multipleChecksDocumentID.push(DocumentID.trim());
            }
        }
        else {
            if (multipleChecksDocumentID.indexOf(DocumentID.trim()) != -1) {
                var ind = multipleChecksDocumentID.indexOf(DocumentID.trim());
                multipleChecksDocumentID.splice(ind, 1);
            }
            checkboxcheck = false;
        }
    });
    for (var spl = 0; spl < multipleChecksDocumentID.length; spl++) {
        if (multipleChecksDocumentID[spl].trim() != "") {
            $('#liSelectedRU').append('<span style="font-size:13px;">' + multipleChecksDocumentID[spl].trim() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveSelectedRU(this);" style="float:right" /></span>');
        }
    }
    if (checkboxcheck == true) {
        $("#selectall").prop('checked', true);
    }
    else {
        $("#selectall").prop('checked', false);
    }
    try {
        hideAllMenuAndStopPro(event);
    }
    catch (ex) {

    }
}

function liRemoveSelectedRU(obj) {
    var child = obj.parentNode;
    var child12 = child.firstChild.nodeValue;
    child12 = child12.trim();
    if (multipleChecksDocumentID.indexOf(child12) != -1) {
        var ind = multipleChecksDocumentID.indexOf(child12);
        multipleChecksDocumentID.splice(ind, 1);
    }
    //$("#" + child12).attr('checked', false);
    var checkboxcheck = true;
    child.parentNode.removeChild(child);
    $('input[type=checkbox][name="Generic"]').each(function () {
        var DocumentID = this.value;
        var duplicatechecking = false;
        if (multipleChecksDocumentID.indexOf(DocumentID.trim()) > -1) {
        }
        else {
            this.checked = false;
        }
        var isChecked = this.checked;
        if (!isChecked) {
            checkboxcheck = false;
        }
    });
    if (checkboxcheck == true) {
        $("#selectall").prop('checked', true);
    }
    else {
        $("#selectall").prop('checked', false);
    }
}

function CreateReportUnitList(page) {
    $("#tblGeneric").css("display", "");
    var startIndex = page * 10;
    var endIndex = startIndex + 10;
    $('#tblGeneric').empty();
    if (endIndex > myArrayRU.length) endIndex = myArrayRU.length;
    $("#spResult").html((startIndex + 1) + '&nbsp;to&nbsp;' + endIndex + '&nbsp;of&nbsp;' + myArrayRU.length);
    var resultfound = false;
    var checkboxchecking = true;
    if (startIndex == endIndex) {
        var art = "No items found.";
        $("#tblGeneric").append(art);
        checkboxchecking = false;
        $('#loadGen').empty();
    }
    else {
        var spltarrprevRUstr = arrprevRU.toString();
        if (spltarrprevRUstr.indexOf(";") > -1) {
            var spltarrprevRU = spltarrprevRUstr.split(';');
            arrprevRU = [];
            for (var arrli = 0; arrli < spltarrprevRU.length; arrli++) {
                if (spltarrprevRU[arrli].trim() != "") {
                    arrprevRU.push(spltarrprevRU[arrli]);
                }
            }
        }
        for (var i = startIndex; i < endIndex; i++) {
            var article = "";
            if (i == startIndex) {
                article += '<tr><th><input id="selectall" onclick="funselectall(this);" type="checkbox"/> Select/Deselect All</th></tr>';
            }

            article += '<tr><td>';
            if (arrprevRU != null && multipleChecksDocumentID.length > 0) {
                if (arrprevRU.indexOf(myArrayRU[i].trim()) >= 0 && multipleChecksDocumentID.indexOf(myArrayRU[i].trim()) > -1) {
                    article += '<input id="' + myArrayRU[i].trim() + '" type="checkbox" name="Generic" onclick="checkMultipleDocuments(this);" checked class="css1-checkbox" value="' + myArrayRU[i].trim() + '" />';
                }
                else if (multipleChecksDocumentID.indexOf(myArrayRU[i].trim()) > -1) {
                    article += '<input id="' + myArrayRU[i].trim() + '" type="checkbox" name="Generic" onclick="checkMultipleDocuments(this);" checked class="css1-checkbox" value="' + myArrayRU[i].trim() + '" />';
                }
                else {
                    article += '<input id="' + myArrayRU[i].trim() + '" type="checkbox" name="Generic" onclick="checkMultipleDocuments(this);"  class="css1-checkbox" value="' + myArrayRU[i].trim() + '" />';
                    checkboxchecking = false;
                }
            }
            else if (arrprevRU.indexOf(myArrayRU[i].trim()) >= 0 && multipleChecksDocumentID.length == 0) {
                article += '<input id="' + myArrayRU[i].trim() + '" type="checkbox" name="Generic" onclick="checkMultipleDocuments(this);" checked class="css1-checkbox" value="' + myArrayRU[i].trim() + '" />';
            }
            else if (multipleChecksDocumentID.indexOf(myArrayRU[i].trim()) > -1) {
                article += '<input id="' + myArrayRU[i].trim() + '" type="checkbox" name="Generic" onclick="checkMultipleDocuments(this);" checked class="css1-checkbox" value="' + myArrayRU[i].trim() + '" />';
            }
            else {
                article += '<input id="' + myArrayRU[i].trim() + '" type="checkbox" name="Generic" onclick="checkMultipleDocuments(this);"  class="css1-checkbox" value="' + myArrayRU[i].trim() + '" />';
                checkboxchecking = false;
            }
            article += '<label for="' + myArrayRU[i].trim() + '" class="css1-label">' + myArrayRU[i].trim() + '</label>';
            article += '</td></tr>';
            $("#tblGeneric").append(article);
            $('#loading').empty();
            resultfound = true;

        }
    }
    if (checkboxchecking == true) {
        $("#selectall").prop('checked', true);
    }
    else {
        $("#selectall").prop('checked', false);
    }
    var checkingsdivchild = document.getElementById("liSelectedRU").hasChildNodes();
    if (!checkingsdivchild) {
        if (multipleChecksDocumentID.length > 0 != "") {
            for (var spl = 0; spl < multipleChecksDocumentID.length; spl++) {
                if (multipleChecksDocumentID[spl].trim() != "") {
                    $('#liSelectedRU').append('<span style="font-size:13px;">' + multipleChecksDocumentID[spl].trim() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveSelectedRU(this);" style="float:right" /></span>');
                }
            }
        }
        else {
            var idtext = $("#browseGeneric").data('param_1');
            if (typeof idtext != 'undefined') {
                var textvalid = $('#' + idtext).val();
                if (typeof textvalid != 'undefined' && textvalid != "") {
                    var splitmulicheckforbind = textvalid.split(';');
                    for (var spl = 0; spl < splitmulicheckforbind.length; spl++) {
                        if (splitmulicheckforbind[spl].trim() != "") {
                            $('#liSelectedRU').append('<span style="font-size:13px;">' + splitmulicheckforbind[spl].trim() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveSelectedRU(this);" style="float:right" /></span>');
                            multipleChecksDocumentID.push(splitmulicheckforbind[spl].trim());
                        }
                    }
                }
                else {
                    checkMultipleDocuments("");
                }
            }
            else {
                checkMultipleDocuments("");
            }
        }
    }
    $('#loadGen').empty();
}

function CreateCounterPartyList(page) {
    $("#tblGeneric").css("display", "");
    var startIndex = page * 10;
    var endIndex = startIndex + 10;
    $('#tblGeneric').empty();
    if (endIndex > myArrayRU.length) endIndex = myArrayRU.length;
    $("#spResult").html((startIndex + 1) + '&nbsp;to&nbsp;' + endIndex + '&nbsp;of&nbsp;' + myArrayRU.length);
    var resultfound = false;
    var checkboxchecking = true;
    if (startIndex == endIndex) {
        $("#tblGeneric").html("No items found.");
        checkboxchecking = false;
        $('#loadGen').empty();
    }
    else {
        var checkingsdivchild = document.getElementById("liSelectedRU").hasChildNodes();
        if (!checkingsdivchild) {
            if (multipleChecksDocumentID.length > 0) {
                for (var spl = 0; spl < multipleChecksDocumentID.length; spl++) {
                    if (multipleChecksDocumentID[spl].trim() != "") {
                        $('#liSelectedRU').append('<span style="font-size:13px;">' + multipleChecksDocumentID[spl].trim() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveSelectedRU(this);" style="float:right" /></span>');
                    }
                }
            }
            else {
                var idtext = $("#browseGeneric").data('param_1');
                if (typeof idtext != 'undefined') {
                    var textvalid = $('#' + idtext).val();
                    if (typeof textvalid != 'undefined' && textvalid != "") {
                        var splitmulicheckforbind = textvalid.split(';');
                        for (var spl = 0; spl < splitmulicheckforbind.length; spl++) {
                            if (splitmulicheckforbind[spl].trim() != "") {
                                $('#liSelectedRU').append('<span style="font-size:13px;">' + splitmulicheckforbind[spl] + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveSelectedRU(this);" style="float:right" /></span>');
                                multipleChecksDocumentID.push(splitmulicheckforbind[spl].trim());
                            }
                        }
                    }
                    else {
                        checkMultipleDocuments("");
                    }
                }
                else {
                    checkMultipleDocuments("");
                }
            }
        }
        var spltarrprevRUstr = arrprevRU.toString();
        if (spltarrprevRUstr.indexOf(";") > -1) {
            var spltarrprevRU = spltarrprevRUstr.split(';');
            arrprevRU = [];
            for (var arrli = 0; arrli < spltarrprevRU.length; arrli++) {
                if (spltarrprevRU[arrli].trim() != "") {
                    arrprevRU.push(spltarrprevRU[arrli]);
                }
            }
        }
        for (var i = startIndex; i < endIndex; i++) {
            var article = "";
            if (i == startIndex) {
                article += '<tr><th><input id="selectall" onclick="funselectall(this);" type="checkbox"/> Select/Deselect All</th></tr>';
            }

            article += '<tr><td>';
            if (arrprevRU != null && multipleChecksDocumentID.length > 0) {
                if (arrprevRU.indexOf(myArrayRU[i]) >= 0 && multipleChecksDocumentID.indexOf(myArrayRU[i].trim()) > -1) {
                    article += '<input id="' + myArray[i] + '" type="checkbox" name="Generic"  onclick="checkMultipleDocuments(this);" checked class="css1-checkbox" value="' + myArray[i].trim() + '" />';
                }
                else if (multipleChecksDocumentID.indexOf(myArrayRU[i].trim()) > -1) {
                    article += '<input id="' + myArrayRU[i].trim() + '" type="checkbox" name="Generic" onclick="checkMultipleDocuments(this);" checked class="css1-checkbox" value="' + myArrayRU[i].trim() + '" />';
                }
                else {
                    article += '<input id="' + myArrayRU[i].trim() + '" type="checkbox" name="Generic" onclick="checkMultipleDocuments(this);"  class="css1-checkbox" value="' + myArrayRU[i].trim() + '" />';
                    checkboxchecking = false;
                }
            }
            else if (arrprevRU.indexOf(myArrayRU[i].trim()) >= 0 && multipleChecksDocumentID.length == 0) {
                article += '<input id="' + myArrayRU[i].trim() + '" type="checkbox" name="Generic" onclick="checkMultipleDocuments(this);" checked class="css1-checkbox" value="' + myArrayRU[i].trim() + '" />';
            }
            else if (multipleChecksDocumentID.indexOf(myArrayRU[i].trim()) > -1) {
                article += '<input id="' + myArrayRU[i].trim() + '" type="checkbox" name="Generic" onclick="checkMultipleDocuments(this);" checked class="css1-checkbox" value="' + myArrayRU[i].trim() + '" />';
            }
            else {
                article += '<input id="' + myArrayRU[i].trim() + '" type="checkbox" name="Generic" onclick="checkMultipleDocuments(this);"  class="css1-checkbox" value="' + myArrayRU[i].trim() + '" />';
                checkboxchecking = false;
            }
            article += '<label for="' + myArrayRU[i].trim() + '" class="css1-label">' + myArrayRU[i].trim() + '</label>';
            article += '</td></tr>';
            $("#tblGeneric").append(article);
            $('#loading').empty();
            resultfound = true;

        }
    }
    if (checkboxchecking == true) {
        $("#selectall").prop('checked', true);
    }
    else {
        $("#selectall").prop('checked', false);
    }
    $('#loadGen').empty();
}

function getcontracttypemetadata(strcontracttype) {
    var idel123 = 0;
    var idelcheck = null;
    $("#newdivforcheck").empty();
    $("#undercheck").empty();
    $("#loadingPage").fadeIn();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contracttypes/metadatas?contracttypename=' + encodeURIComponent(strcontracttype),
        type: 'GET',
        dataType: 'json',
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        cache: false,
        success: function (metadataFields) {

            var hasContractTermType = false;
            if ($.grep(metadataFields, function (n, i) {
                    return (n.FieldName == "ContractTermType");
            }).length > 0) {
                hasContractTermType = true;
            }

            //manoj
            //Financial Break Down Feature
            var veContractFeaturesFinancial = JSON.parse(localStorage.getItem("eContractFeatures"));
            var vDocLibFeatFinancial = $.grep(veContractFeaturesFinancial, function (nFinancial, iFinancial) {
                return (nFinancial.RowKey == "19" && nFinancial.Status == "ON");
            });
            if (vDocLibFeatFinancial.length > 0) {
                applyCurrencyChangeType = true;
                var FinancialmetadataFields = $.grep(metadataFields, function (nmeta, imeta) {
                    return (nmeta.FieldName == "ContractValue");
                });

                var CustomFinancialmetadataFields = $.grep(metadataFields, function (nmeta, imeta) {
                    return (nmeta.CustomFieldsGroupName == "FinancialCustomFields");
                });

                if (FinancialmetadataFields.length == 0 && CustomFinancialmetadataFields.length > 0) {
                    applyCurrencyType = true;
                }
            }
            //Financial Break Down Feature

            var startdate = $.grep(metadataFields, function (nmeta, imeta) {
                return (nmeta.FieldName == "StartDate");
            });

            if (startdate.length > 0)
                IsStartDateExists = true;

            //manoj

            var vUserList = '';
            vContractMetadataFields = [];
            var vTransactionTypeExist = '';
            var vContractClassExist = '';
            var strPreviousFieldGroupName = '';
            $(metadataFields).each(function (i, item) {
                var strFieldGroupName = item.FieldGroup;
                if ((item.FieldName == "ContractTitle") || (item.FieldName == "ContractType") || (item.FieldName == "BusinessArea") || (item.FieldType == "File Upload")) {
                    $("#fieldGroup-1").text(item.FieldGroup);
                    $("#fieldGroup-1Desc")
                }
                else {

                    if (item.FieldName == "Status")
                    { }
                    else {
                        if (!hasContractTermType)
                            vContractMetadataFields.push(item.FieldName);
                    }
                    //check if show in contract form is enabled for this field
                    if (!hasContractTermType) {
                        var idelvalue = "grp" + item.FieldGroup;
                        idelvalue = idelvalue.replace(/[\*\|\,\"\:\<\>\[\}\{\}\'\(\)\@\&\$\#\%\.\-\!\@\$]/g, '').replace(/\//g, '').replace(/ /g, '')
                        if (strPreviousFieldGroupName != item.FieldGroup) {
                            vControlsGroup = '<div class="row-group"><hr class="form_hr"/><div class="col12 no-pad"><div class="collapse-heading"><div class="col10 no-pad"><h3 class="h3-head" style="padding-left: 10px;" id="fieldGroup-1">' + item.FieldGroup + '</h3>';
                            idel123 = 1;
                            $.ajax({
                                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/contractfieldgroup?groupname=' + item.FieldGroup,
                                type: 'GET',
                                dataType: 'json',
                                headers: {
                                    'eContracts-ApiKey': localStorage.APIKey
                                },
                                cache: false,
                                async: false,
                                success: function (data) {
                                    if (data != null) {
                                        vControlsGroup += '<p class="p-text help" style="padding-left: 10px;">' + data.Description + '</p>';
                                    }
                                }
                            });
                            var idel123img = idelvalue + 'img';
                            vControlsGroup += '<p class="p-text"></p></div><div class="col2 text-right"><a class="" href="javascript:void(0);"><img id="' + idel123img + '" src="../Content/Images/e-close.png" title="Collapse" /></a></div></div></div></div><div id="' + idelvalue + '">';
                            if (item.ShowInCreateForm == "true") {
                                idelcheck = createingdivbyme(item, vControlsGroup, idelvalue, idelcheck);
                                allowOnlyNumberInInputBox("ContractTerm");
                            }
                        }
                        else {
                            if (item.ShowInCreateForm == "true") {
                                var vControlsGroup = "";
                                idelcheck = createingdivbyme(item, vControlsGroup, idelvalue, idelcheck);
                                allowOnlyNumberInInputBox("ContractTerm");
                            }
                        }

                    }
                    else {
                        if (item.FieldName == "ContractTermNotes" || item.FieldName == "StartDate" || item.FieldName == "TermEndDate" || item.FieldName == "RequiresAuth" || item.FieldName == "RenewalConfirmParticipants" || item.FieldName == "CounterpartyNotices" || item.FieldName == "CounterpartyNoticesRenewal" || item.FieldName == "EndDate") {

                        }
                        else {
                            vContractMetadataFields.push(item.FieldName);
                            var idelvalue = "grp" + item.FieldGroup;
                            idelvalue = idelvalue.replace(/[\*\|\,\"\:\<\>\[\}\{\}\'\(\)\@\&\$\#\%\.\-\!\@\$]/g, '').replace(/\//g, '').replace(/ /g, '')
                            if (strPreviousFieldGroupName != item.FieldGroup) {
                                vControlsGroup = '<div class="row-group"><hr class="form_hr"/><div class="col12 no-pad"><div class="collapse-heading"><div class="col10 no-pad"><h3 class="h3-head" style="padding-left: 10px;" id="fieldGroup-1">' + item.FieldGroup + '</h3>';
                                idel123 = 1;
                                $.ajax({
                                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/contractfieldgroup?groupname=' + item.FieldGroup,
                                    type: 'GET',
                                    dataType: 'json',
                                    headers: {
                                        'eContracts-ApiKey': localStorage.APIKey
                                    },
                                    cache: false,
                                    async: false,
                                    success: function (data) {
                                        if (data != null) {
                                            vControlsGroup += '<p class="p-text help" style="padding-left: 10px;">' + data.Description + '</p>';
                                        }
                                    }
                                });
                                var idel123img = idelvalue + 'img';
                                vControlsGroup += '<p class="p-text"></p></div><div class="col2 text-right"><a class="" href="javascript:void(0);"><img id="' + idel123img + '" src="../Content/Images/e-close.png" title="Collapse" /></a></div></div></div></div><div id="' + idelvalue + '">';
                                if (item.ShowInCreateForm == "true") {
                                    idelcheck = createingdivbyme(item, vControlsGroup, idelvalue, idelcheck);
                                    allowOnlyNumberInInputBox("ContractTerm");
                                }
                            }
                            else {
                                if (item.ShowInCreateForm == "true") {
                                    var vControlsGroup = "";
                                    idelcheck = createingdivbyme(item, vControlsGroup, idelvalue, idelcheck);
                                    allowOnlyNumberInInputBox("ContractTerm");
                                }
                            }
                        }
                    }
                }

                if (item.FieldType != "File Upload") {
                    strPreviousFieldGroupName = item.FieldGroup;
                }
            });
            //manoj
            if ($("#hdhMilestoneCapture").text() == "Yes") {
                $('.customdatefieldchange').each(function () {
                    this.onchange = function () {
                        CustomDateFieldChange(this);
                    };
                });
            }
            if (applyCurrencyChangeType) {
                $("#ContractCurrency").trigger("onchange");
            }
            //manoj

            if (getParameterByName('ContractTemplateID') != "") {
                GetFormValuesFromContractTemplate();
            }

            $("#loadingPage").fadeOut();
        }, error: function (data) {
            $("#loadingPage").fadeOut();
        }
    });
}

function getCounterpartyprimaryFields() {

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/primaryfields',
        type: 'GET',
        dataType: 'json',
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        cache: false,
        success: function (metadataFields) {
            vCounterpartyFields = [];
            $(metadataFields).each(function (i, item) {
                if (item != null && item.FieldName != null) {
                    if ((item.FieldName == "CounterpartyName") || (item.FieldName == "CounterpartyType") || (item.FieldName == "Status")) {
                        if (item.FieldName == "CounterpartyType") {
                            vCounterpartyFields.push(item.FieldName)
                        }
                    }
                    else {
                        vCounterpartyFields.push(item.FieldName)
                    }
                }
            });

        },
        error: function (metadataFields) {
            vCounterpartyFields = [];
        }
    });
}


function SelectExistingProject() {
    $('#dvexistingProject').css("display", "");
    $('#dvAddProject').css("display", "none");
}

function SelectAddProject() {
    $('#dvexistingProject').css("display", "none");
    $('#dvAddProject').css("display", "");
}

function GetUsers() {
    var vUserList = '';
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/users',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        async: false,
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        success: function (dataUser) {
            $(dataUser).each(function (i, item) {
                var sRowKey = item.RowKey;
                var sUserName = item.UserName;
                vUserList += '<option value="' + sUserName + '">' + sUserName + '</option>';
            });

            $('#ddlProjectManager').append(vUserList);
            $('#ddlProjectManager').chosen().trigger("chosen:updated");
            $('#ddlBusinessManager').append(vUserList);
            $('#ddlBusinessManager').chosen().trigger("chosen:updated");
            $('#ddlContractManager').append(vUserList);
            $('#ddlContractManager').chosen().trigger("chosen:updated");

            $('.chosenmulti').on('chosen:showing_dropdown', function (evt, params) {
                $('.result-selected').css('display', 'none');
            });
        },
        error:
            function (dataUser) {
            }
    });
}

function SaveProject() {
    if (requiredValidator("addNewProjectEntityFields")) {
        var txtProjectManager = '';
        var sprojectManager = $("#ddlProjectManager").val();
        var bao = '';
        $(sprojectManager).each(function (i, itm) {
            if (bao == '') {
                bao = itm;
            }
            else {
                bao += ";" + itm;
            }
        });
        if (bao == '')
            txtProjectManager = 'Not Assigned';
        else
            txtProjectManager = bao;

        var txtBusinessManager = '';
        var sBusinessManager = $("#ddlBusinessManager").val();
        var bao = '';
        $(sBusinessManager).each(function (i, itm) {
            if (bao == '') {
                bao = itm;
            }
            else {
                bao += ";" + itm;
            }
        });

        if (bao == '')
            txtBusinessManager = 'Not Assigned';
        else
            txtBusinessManager = bao;

        var txtContractManager = '';
        var sContractManager = $("#ddlContractManager").val();
        var bao = '';
        $(sContractManager).each(function (i, itm) {
            if (bao == '') {
                bao = itm;
            }
            else {
                bao += ";" + itm;
            }
        });

        if (bao == '')
            txtContractManager = 'Not Assigned';
        else
            txtContractManager = bao;

        //manoj
        var isduplicate = false;
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/project?projectName=' + encodeURIComponent($("#txtProjectName").val().trim()),
            type: 'GET',
            dataType: 'json',
            cache: false,
            async: false,
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            success: function (data) {
                isduplicate = true;
                swal("", "Project: " + $("#txtProjectName").val() + " already exists.");
            },
            error:
            function (data) {
                isduplicate = false;
            }
        });
        //manoj
        if (!isduplicate) {
            if (!comparedates("dtStartDate", "dtEndDate", "End date should be greater than Start date")) {
                swal("", "End date should be greater than Start date");
            } else {
                if (($("#txtProjectID").val().indexOf(':') > -1) || ($("#txtProjectID").val().indexOf(',') > -1) || ($("#txtProjectID").val().indexOf(';') > -1)) {
                    swal("", "Characters colon(:), comma(,) and semicolon(;) are not allowed in Project ID");
                } else {
                    if (($("#txtProjectName").val().indexOf(':') > -1) || ($("#txtProjectName").val().indexOf(',') > -1) || ($("#txtProjectName").val().indexOf(';') > -1)) {
                        swal("", "Characters colon(:), comma(,) and semicolon(;) are not allowed in Project Name");
                    } else {
                        $("#loadingPage").fadeIn();
                        $.ajax({
                            url: '/Settings/SaveProject',
                            type: 'POST',
                            dataType: 'json',
                            headers: {
                                'AntiReqVerificationToken': $("#forgeryToken").val(), 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging
                            },
                            data: {
                                RowKey: $("#txtProjectRowKey").val(),
                                ProjectID: $("#txtProjectID").val(),
                                ProjectName: $("#txtProjectName").val(),
                                Description: $("#txtDescription").val(),
                                Status: $("#ddlStatus").find('option:selected').text(),
                                StartDate: $.datepicker.formatDate('mm/dd/yy', $("#dtStartDate").datepicker('getDate')),
                                EndDate: $.datepicker.formatDate('mm/dd/yy', $("#dtEndDate").datepicker('getDate')),
                                SubAccount: $("#txtSubAccount").val(),
                                SubAccount: $("#txtSubAccount").val(),
                                ProjectManager: txtProjectManager,
                                BusinessManager: txtBusinessManager,
                                ContractManager: txtContractManager,
                                USAIDContractNumber: $("#txtUSAIDContractNumber").val(),
                                CustomerID: $("#txtCustomerID").val(),
                                Country: $("#ddlCountry").find('option:selected').text(),
                                Division: $("#txtDivision").val(),
                                PracticeArea: $("#txtPracticeArea").val(),
                            },
                            cache: false,
                            success: function (person) {
                                SaveProjectTask();
                                //manoj
                                if ($('#Project').val() != "") {
                                    $('#Project').val($('#Project').val() + ";" + $("#txtProjectName").val());
                                } else {
                                    $('#Project').val($("#txtProjectName").val());
                                }
                                //manoj
                                //$('#Project').val($("#txtProjectName").val());
                                $('#tblProjects').empty();
                                $("#browseProjects").dialog("close");
                                ClearAddProjects();
                                $('#dvexistingProject').css("display", "");
                                $('#dvAddProject').css("display", "none");
                                $('#rdNewProject').prop('checked', false);
                                $('#rdProjectList').prop('checked', true);
                                $("#loadingPage").fadeOut();
                            },
                            error:
                                function (data) {
                                    $("#loadingPage").fadeOut();
                                }
                        });
                    }
                }
            }
        }
    }
}

function SaveProjectTask() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/project?projectName=' + $("#txtProjectName").val().trim(),
        type: 'GET',
        dataType: 'json',
        cache: false,
        async: false,
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        success: function (data) {
            $("#txtProjectRowKey").val(data.RowKey);
        }
    });
    var txtProjectManager = '';
    var sprojectManager = $("#ddlProjectManager").val();
    var bao = '';
    $(sprojectManager).each(function (i, itm) {
        if (bao == '') {
            bao = itm;
        }
        else {
            bao += ";" + itm;
        }
    });
    if (bao == '')
        txtProjectManager = 'Not Assigned';
    else
        txtProjectManager = bao;

    $("#loadingPage").fadeIn();
    $.ajax({
        url: '/Settings/SaveProjectTask',
        type: 'POST',
        dataType: 'json',
        headers: {
            'AntiReqVerificationToken': $("#forgeryToken").val(), 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging
        },
        data: {
            ProjectRowKey: $("#txtProjectRowKey").val(),
            TaskID: 'DEFAULT',
            TaskDescription: '' + $("#txtProjectName").val() + '(Default Task)',
            Manager: txtProjectManager,
            StartDate: '',
            EndDate: '',
        },
        cache: false,
        success: function (person) {
        },
        error:
            function (data) {
                $("#loadingPage").fadeOut();
            }
    });

}

function ClearAddProjects() {
    $("#txtProjectRowKey").val("");
    $("#txtProjectID").val("");
    $("#txtProjectName").val("");
    $("#txtDescription").val("");
    $('#ddlStatus').val('Active');
    $("#dtStartDate").val("");
    $("#dtEndDate").val("");
    $("#txtSubAccount").val("");
    GetValuesAndAutoPopulate('ddlProjectManager', "");
    GetValuesAndAutoPopulate('ddlBusinessManager', "");
    GetValuesAndAutoPopulate('ddlContractManager', "");
    $("#txtUSAIDContractNumber").val(""),
    $("#txtCustomerID").val("");
    $('#ddlCountry').val('0');
    $("#txtDivision").val("");
    $("#txtPracticeArea").val("");

}

function GetValuesAndAutoPopulate(controlname, values) {
    var multiarr = [];
    var res = values != null && values != "" ? values.split(";") : [];
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

var arr = [];
var RelatedContractIDarr = [];
var vRelatedContractTitlearr = [];
var RelatedRelationshipTypearr = [];
var vRelatedStatusarr = [];
var counterpartyTags = [];
var relatedContractsTag = [];
function ViewRelatedContracts() {
    $("#ddlRelConFilterContractType option:selected").prop('selected', false).trigger('chosen:updated');
    $("#ddlRelConFilterCounterparty option:selected").prop('selected', false).trigger('chosen:updated');
    $("#lblRelatedPopup_ContractTitle").text("Select Relationship for " + $("#txtContractTitle").val())
    $("#loadingPage").fadeIn();
    $('#loadContract').html('<img src="../Content/Images/icon/loading.gif"> Working on it...');
    $('#tblPopupContracts').empty();
    $("#txtSearchBoxContract").val("");
    var vURL = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/getrelatedcontracts?stage=&searchkeyword=&customquery=&sortbyfield=ContractTitle&orderby=ASC';

    //if ($('#tblPopupContracts tr').length <= 0) {
    $("#txtSearchBoxContract").val("");
    $.ajax({
        url: vURL,
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: {
            'eContracts-ApiKey': localStorage.APIKey, BusinessAreaLocation: businessAreaPath, UserID: localStorage.UserID
        },
        cache: false,
        success: function (data) {
            $('#loadContract').empty();
            $('#tblPopupContracts').empty();
            $("#hdnRelatedContracts").append(getParameterByName("ContractID"))
            var arrdetailssplit = [];
            $.each(oldRelatedcontract.split(";"), function () {
                if (this != "") {
                    if ($.trim(this) != "") {
                        arrdetailssplit.push($.trim(this));
                    }
                }
            });
            oldRelatedcontract = arrdetailssplit.join("; ");
            oldRelatedcontract = oldRelatedcontract.trim();
            arroldRelatedcontract = arrdetailssplit;
            $.each($('#RelatedContracts').val().split(";"), function () {
                if (this != "") {
                    if ($.trim(this) != "") {
                        arr.push($.trim(this));
                    }
                }
            });
            if ($('#RelatedContracts').val() != "") {
                $.each($('#RelatedContracts').val().split(";"), function () {
                    if (!(arr.indexOf($.trim(this)) > -1)) {
                        arr.push($.trim(this));
                    }
                });
                if (arr.length > 0) {
                    if (arrRelatedContracts.length > 0) {
                        $.each(arrRelatedContracts[arrRelatedContracts.length - 1].RelatedContractID.split(";"), function () {
                            RelatedContractIDarr.push($.trim(this));
                        });
                        $.each(arrRelatedContracts[arrRelatedContracts.length - 1].RelatedContractTitle.split(";"), function () {
                            vRelatedContractTitlearr.push($.trim(this));
                        });

                        $.each(arrRelatedContracts[arrRelatedContracts.length - 1].RelatedStatus.split(";"), function () {
                            if ($.trim(this) != "")
                                vRelatedStatusarr.push($.trim(this));
                        });
                        $.each(arrRelatedContracts[arrRelatedContracts.length - 1].RelatedRelationshipType.split(";"), function () {
                            RelatedRelationshipTypearr.push($.trim(this));
                        });
                    }
                }
            }
            listRelatedContracts = data;
            CreateRelatedContractsList(0);
            var vCount = data.length;
            if (vCount != 0) {
                $('#loadContract').html('');
                $("#tblPopupContracts tr td").attr('style', 'vertical-align: top');
                $('#compact-paginationRelatedContracts').css('display', '');
                $('#compact-paginationRelatedContracts').pagination({
                    items: vCount,
                    itemsOnPage: 10,
                    type: 'tbody',
                    typeID: 'tblPopupContracts',
                    row: 'tr',
                    cssStyle: 'compact-theme',
                    listname: 'RelatedContracts'
                });
            } else {
                $('#loadContract').html('<p style="margin-left: 20px;">No items found.</p>')
                $('#compact-paginationRelatedContracts').css('display', 'none');
            }
            $("#txtSearchBoxContract").autocomplete({
                source: relatedContractsTag,
                minLength: 2,
                focus: function (event, ui) {
                    return false;
                },
                select: function (evn, uidetails) {
                    $("#txtSearchBoxContract").val(uidetails.item.label);
                    ViewContracts();
                }
            });
            $("#popupContracts").dialog("option", "title", "Related Contract Record(s)");
            $("#popupContracts").dialog("open");
            $("#loadingPage").fadeOut();
        },
        error: function () {
            $('#loadMA').empty();
            $('#loadMA').html('<p style="margin-left: 20px;">No items found.</p>');
            $("#loadingPage").fadeOut();
        }
    });
    vContractID = getParameterByName("ContractID");
    BindRelatedContractsPopup(vContractID);
}

$("#ddlRelationshipType").change(function () {
    $("#ddlRelationshipTypeParent").empty();

    var jsLang = this.value;
    RelatedContractRelationShipTypeparent = jsLang;
    var rowK = jQuery.grep(RelationshipTypes, function (a) {
        return a[0] === jsLang;
    });
    if (rowK != null && typeof (rowK) != "undefined" && rowK.length != 0) {
        var Relationship = rowK[0];
        $("#ddlRelationshipTypeParent").append("<option value='" + Relationship[1] + "'>" + Relationship[1] + "</option>");
        $.each(Relationship[2], function (index, value) {
            var optRel2 = value.toString();
            $("#ddlRelationshipTypeParent").append("<option value='" + optRel2 + "'>" + optRel2 + "</option>");
        })
        //if ($(Relationship[2]).length == 0) {
        //    var optRel2 = Relationship[1].toString();
        //    $("#ddlRelationshipTypeParent").append("<option value='" + optRel2 + "'>" + optRel2 + "</option>");
        //}
    }
    else {
        switch (jsLang) {
            case 'Master Agreement':
                $("#ddlRelationshipTypeParent").append("<option value='Master Agreement'>Master Agreement</option>");
                $("#ddlRelationshipTypeParent").append("<option value='Sub-Agreement'>Sub-Agreement</option>");
                $("#ddlRelationshipTypeParent").append("<option value='SOW'>SOW</option>");
                break;
            case 'Prime Contractor Agreement':
                $("#ddlRelationshipTypeParent").append("<option value='Prime Contractor Agreement'>Prime Contractor Agreement</option>");
                $("#ddlRelationshipTypeParent").append("<option value='Sub Contractor Agreement'>Sub Contractor Agreement</option>");
                break;
            case 'Blanket Agreement':
                $("#ddlRelationshipTypeParent").append("<option value='Blanket Agreement'>Blanket Agreement</option>");
                $("#ddlRelationshipTypeParent").append("<option value='Order'>Order</option>");
                $("#ddlRelationshipTypeParent").append("<option value='Invoice'>Invoice</option>");
                break;
            case 'Original':
                $("#ddlRelationshipTypeParent").append("<option value='Original'>Original</option>");
                $("#ddlRelationshipTypeParent").append("<option value='Duplicate'>Duplicate</option>");
                $("#ddlRelationshipTypeParent").append("<option value='Copy'>Copy</option>");
                break;
            case 'Past Contract':
                $("#ddlRelationshipTypeParent").append("<option value='Past Contract'>Past Contract</option>");
                $("#ddlRelationshipTypeParent").append("<option value='Renegotiated Contract'>Renegotiated Contract</option>");
                break;
            case 'Primary Contract':
                $("#ddlRelationshipTypeParent").append("<option value='Primary Contract'>Primary Contract</option>");
                $("#ddlRelationshipTypeParent").append("<option value='Amendment'>Amendment</option>");
                $("#ddlRelationshipTypeParent").append("<option value='Modification'>Modification</option>");
                break;
            case 'Other':
                $("#ddlRelationshipTypeParent").append("<option value='Other'>Other</option>");
                break;
        }
    }

    $('input:checkbox[name="RelatedContract"]:checked').each(function () {
        $(this).parent().parent().children(".ddl").empty();
        var vOptions = "<select class='f_inpt width90' onchange='showallspans(this)'>";
        var jsLang = $("#ddlRelationshipTypeParent option:selected").val();
        var jsLangType = $("#ddlRelationshipType option:selected").val();
        var rela1 = jQuery.grep(RelationshipTypes, function (a) {
            return (a[1] === jsLang && a[0] === jsLangType);
        });
        var rela2 = jQuery.grep(RelationshipTypes, function (a) {
            return (a[2].indexOf(jsLang) > -1 && a[0] === jsLangType);
        });
        if (rela1 != null && typeof (rela1) != "undefined" && rela1.length != 0) {
            var Relationship = rela1[0];
            $.each(Relationship[2], function (index, value) {
                var optRel2 = value.toString();
                vOptions += "<option value='" + optRel2 + "'>" + optRel2 + "</option>";
            })
            if ($(Relationship[2]).length == 0) {
                var optRel2 = Relationship[1].toString();
                vOptions += "<option value='" + optRel2 + "'>" + optRel2 + "</option>";
            }
        }
        else if (rela2 != null && typeof (rela2) != "undefined" && rela2.length != 0) {
            var Relationship = rela2[0];
            vOptions += "<option value='" + Relationship[1] + "'>" + Relationship[1] + "</option>";
        }
        else {
            switch (jsLang) {
                case 'Master Agreement':
                    vOptions += '<option value="Sub-Agreement">Sub-Agreement</option>';
                    vOptions += '<option value="SOW">SOW</option>';
                    break;
                case 'Sub-Agreement':
                case 'SOW':
                    vOptions += '<option value="Master Agreement">Master Agreement</option>';
                    break;
                case 'Prime Contractor Agreement':
                    vOptions += '<option value="Sub Contractor Agreement">Sub Contractor Agreement</option>';
                    break;
                case 'Sub Contractor Agreement':
                    vOptions += '<option value="Prime Contractor Agreement">Prime Contractor Agreement</option>';
                    break;
                case 'Blanket Agreement':
                    vOptions += '<option value="Order">Order</option>';
                    vOptions += '<option value="Invoice">Invoice</option>';
                    break;
                case 'Order':
                case 'Invoice':
                    vOptions += '<option value="Blanket Agreement">Blanket Agreement</option>';
                    break;
                case 'Original':
                    vOptions += '<option value="Duplicate">Duplicate</option>';
                    vOptions += '<option value="Copy">Copy</option>';
                    break;
                case 'Duplicate':
                case 'Copy':
                    vOptions += '<option value="Original">Original</option>';
                    break;
                case 'Past Contract':
                    vOptions += '<option value="Renegotiated Contract">Renegotiated Contract</option>';
                    break;
                case 'Renegotiated Contract':
                    vOptions += '<option value="Past Contract">Past Contract</option>';
                    break;
                case 'Primary Contract':
                    vOptions += '<option value="Amendment">Amendment</option>';
                    vOptions += '<option value="Modification">Modification</option>';
                    break;
                case 'Amendment':
                case 'Modification':
                    vOptions += '<option value="Primary Contract">Primary Contract</option>';
                    break;
                case 'Other':
                    vOptions += '<option value="Other">Other</option>';
                    break;
            }
        }

        vOptions += '</select>';
        $(this).parent().parent().children(".ddl").append(vOptions);
    });
    showallspans("");
});

$("#ddlRelationshipTypeParent").change(function () {
    $('input:checkbox[name="RelatedContract"]:checked').each(function () {
        $(this).parent().parent().children(".ddl").empty();
        var vOptions = "<select class='f_inpt width90' onchange='showallspans(this)'>";
        var jsLang = $("#ddlRelationshipTypeParent option:selected").val();
        RelatedContractRelationShipTypeparent = jsLang;
        var jsLangType = $("#ddlRelationshipType option:selected").val();
        var rela1 = jQuery.grep(RelationshipTypes, function (a) {
            return (a[1] === jsLang && a[0] === jsLangType);
        });
        var rela2 = jQuery.grep(RelationshipTypes, function (a) {
            return (a[2].indexOf(jsLang) > -1 && a[0] === jsLangType);
        });
        if (rela1 != null && typeof (rela1) != "undefined" && rela1.length != 0) {
            var Relationship = rela1[0];
            $.each(Relationship[2], function (index, value) {
                var optRel2 = value.toString();
                vOptions += "<option value='" + optRel2 + "'>" + optRel2 + "</option>";
            })
            if ($(Relationship[2]).length == 0) {
                var optRel2 = Relationship[1].toString();
                vOptions += "<option value='" + optRel2 + "'>" + optRel2 + "</option>";
            }
        }
        else if (rela2 != null && typeof (rela2) != "undefined" && rela2.length != 0) {
            var Relationship = rela2[0];
            vOptions += "<option value='" + Relationship[1] + "'>" + Relationship[1] + "</option>";
        }
        else {
            switch (jsLang) {
                case 'Master Agreement':
                    vOptions += '<option value="Sub-Agreement">Sub-Agreement</option>';
                    vOptions += '<option value="SOW">SOW</option>';
                    break;
                case 'Sub-Agreement':
                case 'SOW':
                    vOptions += '<option value="Master Agreement">Master Agreement</option>';
                    break;
                case 'Prime Contractor Agreement':
                    vOptions += '<option value="Sub Contractor Agreement">Sub Contractor Agreement</option>';
                    break;
                case 'Sub Contractor Agreement':
                    vOptions += '<option value="Prime Contractor Agreement">Prime Contractor Agreement</option>';
                    break;
                case 'Blanket Agreement':
                    vOptions += '<option value="Order">Order</option>';
                    vOptions += '<option value="Invoice">Invoice</option>';
                    break;
                case 'Order':
                case 'Invoice':
                    vOptions += '<option value="Blanket Agreement">Blanket Agreement</option>';
                    break;
                case 'Original':
                    vOptions += '<option value="Duplicate">Duplicate</option>';
                    vOptions += '<option value="Copy">Copy</option>';
                    break;
                case 'Duplicate':
                case 'Copy':
                    vOptions += '<option value="Original">Original</option>';
                    break;
                case 'Past Contract':
                    vOptions += '<option value="Renegotiated Contract">Renegotiated Contract</option>';
                    break;
                case 'Renegotiated Contract':
                    vOptions += '<option value="Past Contract">Past Contract</option>';
                    break;
                case 'Primary Contract':
                    vOptions += '<option value="Amendment">Amendment</option>';
                    vOptions += '<option value="Modification">Modification</option>';
                    break;
                case 'Amendment':
                case 'Modification':
                    vOptions += '<option value="Primary Contract">Primary Contract</option>';
                    break;
                case 'Other':
                    vOptions += '<option value="Other">Other</option>';
                    break;
            }
        }
        vOptions += '</select>';
        $(this).parent().parent().children(".ddl").append(vOptions);
    });
    showallspans("");
});

function liRemoveRelationship(obj) {
    var lblcontracttitle = $("#txtContractTitle").val();
    // alert(lblcontracttitle)
    var child = obj.parentNode;
    var relatedContractTitle = child.textContent;
    var relatedContractidtodelete = child.id;
    var selectedcontract = $.grep(OlRelatedContracts, function (n) {
        return n.RelatedContractID == relatedContractidtodelete
    });
    var relationShipType = "";
    if (selectedcontract.length > 0)
        relationShipType = selectedcontract[0].RelationshipType;

    swal({
        title: '',
        text: "Do you wish to remove the relationship between the <span style=\"font-weight:700\">'" + lblcontracttitle + "(" + relationShipType + ")" + "' and '" + relatedContractTitle + "' </span>?",
        // text: "Are you sure you want to delete '<span style=\"font-weight:700\">" + relatedContractTitle + "</span>'?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        html: true
    },
     function (confirmed) {
         if (confirmed) {
             child.parentNode.removeChild(child);
             var relatedContractID = child.id;
             $('#loadContract').html('<img src="../Content/Images/icon/loading.gif"> Working on it...');
             $("#loadingPage").fadeIn();
             $('#tblPopupContracts').empty();
             $("#txtSearchBoxContract").val("");
             $.ajax({
                 url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + getParameterByName('ContractID') + '/relatedcontracts?relatedcontractid=' + relatedContractID,
                 type: 'DELETE',
                 dataType: 'json',
                 headers: {
                     'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName
                 },
                 "Content-Type": "application/json",
                 cache: false,
                 success: function (data) {
                     var relatedtextboxval = $("#RelatedContracts").val();
                     if (relatedContractTitle.indexOf('(') > -1) {
                         var nlst = relatedContractTitle.lastIndexOf("(");
                         relatedContractTitle = relatedContractTitle.substr(0, nlst);
                         var arrdetailssplit = [];
                         $.each(oldRelatedcontract.split(";"), function () {
                             if (this != "") {
                                 if ($.trim(this) != "") {
                                     arrdetailssplit.push($.trim(this));
                                 }
                             }
                         });
                         if (arrdetailssplit.indexOf(relatedContractTitle.trim()) > -1) {
                             var indextitle = arrdetailssplit.indexOf(relatedContractTitle.trim());
                             arrdetailssplit.splice(indextitle, 1);
                         }
                         if (SavedRelatedContract.indexOf(relatedContractTitle.trim()) > -1) {
                             var indextitle = SavedRelatedContract.indexOf(relatedContractTitle.trim());
                             SavedRelatedContract.splice(indextitle, 1);
                         }
                         oldRelatedcontract = arrdetailssplit.join("; ");
                         relatedtextboxval = arrdetailssplit.join("; ");
                         if (relatedtextboxval != "") {
                             $("#RelatedContracts").val(relatedtextboxval.trim());
                         }
                         else {
                             $("#RelatedContracts").val(relatedtextboxval);
                         }
                     }
                     $('#loadContract').html('<img src="../Content/Images/icon/loading.gif"> Working on it...');
                     $('#tblPopupContracts').empty();
                     $("#txtSearchBoxContract").val("");
                     var vURL = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/getrelatedcontracts?stage=&searchkeyword=&customquery=&sortbyfield=ContractTitle&orderby=ASC';
                     if ($('#tblPopupContracts tr').length <= 0) {
                         relatedContractsTag = [];
                         $("#txtSearchBoxContract").val("");
                         $.ajax({
                             url: vURL,
                             type: 'GET',
                             dataType: 'json',
                             "Content-Type": "application/json",
                             headers: {
                                 'eContracts-ApiKey': localStorage.APIKey, BusinessAreaLocation: businessAreaPath, UserID: localStorage.UserID
                             },
                             cache: false,
                             success: function (data) {
                                 $('#loadContract').empty();
                                 arroldRelatedcontract = [];
                                 $.each(oldRelatedcontract.split(";"), function () {
                                     if (this != "") {
                                         if ($.trim(this) != "") {
                                             arroldRelatedcontract.push($.trim(this));
                                         }
                                     }
                                 });
                                 arr = [];
                                 RelatedContractIDarr = [];
                                 vRelatedContractTitlearr = [];
                                 RelatedRelationshipTypearr = [];
                                 vRelatedStatusarr = [];
                                 counterpartyTags = [];
                                 $.each($('#RelatedContracts').val().split(";"), function () {
                                     arr.push($.trim(this));
                                 });
                                 if ($('#RelatedContracts').val() != "") {
                                     $.each($('#RelatedContracts').val().split(";"), function () {
                                         if (!(arr.indexOf($.trim(this)) > -1)) {
                                             arr.push($.trim(this));
                                         }
                                     });
                                     if (arr.length > 0) {
                                         if (arrRelatedContracts.length > 0) {
                                             $.each(arrRelatedContracts[arrRelatedContracts.length - 1].RelatedContractID.split(";"), function () {
                                                 RelatedContractIDarr.push($.trim(this));
                                             });
                                             $.each(arrRelatedContracts[arrRelatedContracts.length - 1].RelatedContractTitle.split(";"), function () {
                                                 vRelatedContractTitlearr.push($.trim(this));
                                             });
                                             $.each(arrRelatedContracts[arrRelatedContracts.length - 1].RelatedRelationshipType.split(";"), function () {
                                                 RelatedRelationshipTypearr.push($.trim(this));
                                             });
                                         }
                                     }
                                 }
                                 $(data).each(function (i, item) {
                                     if (ContractID.indexOf(item.RowKey) > -1) { }
                                     else {
                                         if (arroldRelatedcontract.indexOf(item.ContractTitle.trim()) >= 0) {

                                         } else if (SavedRelatedContract.indexOf(item.ContractTitle.trim()) == -1) {
                                             var article = '<tr><td>';
                                             if (arrRelatedcontractRowkey.indexOf(item.RowKey) >= 0) {
                                                 article += '<input id="' + item.RowKey + '" type="checkbox" name="RelatedContract" class="css1-checkbox" onchange="javascript:collectrelatedcontractrowkey(this);" value="' + item.ContractTitle + '" checked />';
                                                 article += '<label for="' + item.RowKey + '" class="css1-label"><a href="/Contracts/ContractDetails?ContractID=' + item.RowKey + '" target="_blank">' + item.ContractTitle + '</a></label>'; //css1-label PreserveSpace  //ENH487 Customer inhanc
                                                 article += '</td>';
                                                 article += '<td><label class="">' + item.ContractType + '</label></td>'
                                                 article += '<td><label class="">'
                                                 if (item.Counterparty != null && item.Counterparty != "") {
                                                     article += item.Counterparty
                                                 } else {
                                                     article += "-"
                                                 }
                                                 article += '</label></td><td><label class="" style="word-break: break-all;">'
                                                 if (item.ContractNumber != null && item.ContractNumber != "") {
                                                     article += item.ContractNumber
                                                 } else {
                                                     article += "-"
                                                 }
                                                 article += '</label></td><td><label class="">' + item.Status + '</label></td>'
                                                 article += '<td class="ddl width34">';
                                                 article += "<select class='f_inpt width90' onchange='showallspans(this)'>";
                                                 try {
                                                     var jsLangselected = RelatedContractRelationShipTypeparent;
                                                 } catch (ex) {
                                                     alert(ex);
                                                 }
                                                 var jsLangType = $("#ddlRelationshipType option:selected").val();
                                                 var rela1 = jQuery.grep(RelationshipTypes, function (a) {
                                                     return (a[1] === jsLangselected && a[0] === jsLangType);
                                                 });
                                                 var rela2 = jQuery.grep(RelationshipTypes, function (a) {
                                                     return (a[2].indexOf(jsLangselected) > -1 && a[0] === jsLangType);
                                                 });
                                                 if (rela1 != null && typeof (rela1) != "undefined" && rela1.length != 0) {
                                                     var Relationship = rela1[0];
                                                     $.each(Relationship[2], function (index, value) {
                                                         var optRel2 = value.toString();
                                                         article += "<option value='" + optRel2 + "'>" + optRel2 + "</option>";
                                                     })
                                                     if ($(Relationship[2]).length == 0) {
                                                         var optRel2 = Relationship[1].toString();
                                                         article += "<option value='" + optRel2 + "'>" + optRel2 + "</option>";
                                                     }
                                                 }
                                                 else if (rela2 != null && typeof (rela2) != "undefined" && rela2.length != 0) {
                                                     var Relationship = rela2[0];
                                                     article += "<option value='" + Relationship[1] + "'>" + Relationship[1] + "</option>";
                                                 }
                                                 else {
                                                     switch (jsLangselected) {
                                                         case 'Master Agreement':
                                                             article += '<option value="Sub-Agreement">Sub-Agreement</option>';
                                                             article += '<option value="SOW">SOW</option>';
                                                             break;
                                                         case 'Sub-Agreement':
                                                         case 'SOW':
                                                             article += '<option value="Master Agreement">Master Agreement</option>';
                                                             break;
                                                         case 'Prime Contractor Agreement':
                                                             article += '<option value="Sub Contractor Agreement">Sub Contractor Agreement</option>';
                                                             break;
                                                         case 'Sub Contractor Agreement':
                                                             article += '<option value="Prime Contractor Agreement">Prime Contractor Agreement</option>';
                                                             break;
                                                         case 'Blanket Agreement':
                                                             article += '<option value="Order">Order</option>';
                                                             article += '<option value="Invoice">Invoice</option>';
                                                             break;
                                                         case 'Order':
                                                         case 'Invoice':
                                                             article += '<option value="Blanket Agreement">Blanket Agreement</option>';
                                                             break;
                                                         case 'Original':
                                                             article += '<option value="Duplicate">Duplicate</option>';
                                                             article += '<option value="Copy">Copy</option>';
                                                             break;
                                                         case 'Duplicate':
                                                         case 'Copy':
                                                             article += '<option value="Original">Original</option>';
                                                             break;
                                                         case 'Past Contract':
                                                             article += '<option value="Renegotiated Contract">Renegotiated Contract</option>';
                                                             break;
                                                         case 'Renegotiated Contract':
                                                             article += '<option value="Past Contract">Past Contract</option>';
                                                             break;
                                                         case 'Primary Contract':
                                                             article += '<option value="Amendment">Amendment</option>';
                                                             article += '<option value="Modification">Modification</option>';
                                                             break;
                                                         case 'Amendment':
                                                         case 'Modification':
                                                             article += '<option value="Primary Contract">Primary Contract</option>';
                                                             break;
                                                         case 'Other':
                                                             article += '<option value="Other">Other</option>';
                                                             break;
                                                     }
                                                 }
                                                 article += '</select><td></tr>';
                                                 $("#tblPopupContracts").append(article);
                                             }
                                             else {
                                                 if (arr.indexOf(item.ContractTitle.trim()) >= 0) {
                                                     article += '<input id="' + item.RowKey + '" type="checkbox" name="RelatedContract" class="css1-checkbox" onchange="javascript:collectrelatedcontractrowkey(this);" value="' + item.ContractTitle + '" checked />';
                                                 } else {
                                                     article += '<input id="' + item.RowKey + '" type="checkbox" name="RelatedContract" class="css1-checkbox" onchange="javascript:collectrelatedcontractrowkey(this);" value="' + item.ContractTitle + '" />';
                                                 }
                                                 article += '<label for="' + item.RowKey + '" class="css1-label"><a href="/Contracts/ContractDetails?ContractID=' + item.RowKey + '" target="_blank">' + item.ContractTitle + '</a></label>'; //css1-label PreserveSpace   //ENH487 Customer inhanc
                                                 article += '</td>';
                                                 article += '<td><label class="">' + item.ContractType + '</label></td>'
                                                 article += '<td><label class="">'
                                                 if (item.Counterparty != null && item.Counterparty != "") {
                                                     article += item.Counterparty
                                                 } else {
                                                     article += "-"
                                                 }
                                                 article += '</label></td><td><label class="" style="word-break: break-all;">'
                                                 if (item.ContractNumber != null && item.ContractNumber != "") {
                                                     article += item.ContractNumber
                                                 } else {
                                                     article += "-"
                                                 }
                                                 article += '</label></td><td><label class="">' + item.Status + '</label></td>'
                                                 if (arr.indexOf(item.ContractTitle.trim()) >= 0) {
                                                     var indexvaluetake = vRelatedContractTitlearr.indexOf(item.ContractTitle.trim());
                                                     var relationtypefetch = RelatedRelationshipTypearr[indexvaluetake];
                                                     article += "<td class='ddl'><select class='f_inpt width90' onchange='showallspans(this)'>";
                                                     var jsLang = $("#ddlRelationshipTypeParent option:selected").val();
                                                     switch (jsLang) {
                                                         case 'Master Agreement':
                                                             if (relationtypefetch == "Sub-Agreement") {
                                                                 article += '<option value="Sub-Agreement" selected>Sub-Agreement</option>';
                                                                 article += '<option value="SOW">SOW</option>';
                                                             }
                                                             else {
                                                                 article += '<option value="Sub-Agreement" >Sub-Agreement</option>';
                                                                 article += '<option value="SOW" selected>SOW</option>';
                                                             }
                                                             break;
                                                         case 'Sub-Agreement':
                                                         case 'SOW':
                                                             article += '<option value="Master Agreement">Master Agreement</option>';
                                                             break;
                                                         case 'Prime Contractor Agreement':
                                                             article += '<option value="Sub Contractor Agreement">Sub Contractor Agreement</option>';
                                                             break;
                                                         case 'Sub Contractor Agreement':
                                                             article += '<option value="Prime Contractor Agreement">Prime Contractor Agreement</option>';
                                                             break;
                                                         case 'Blanket Agreement':
                                                             if (relationtypefetch == "Order") {
                                                                 article += '<option value="Order" selected>Order</option>';
                                                                 article += '<option value="Invoice">Invoice</option>';
                                                             }
                                                             else {
                                                                 article += '<option value="Order">Order</option>';
                                                                 article += '<option value="Invoice" selected>Invoice</option>';
                                                             }

                                                             break;
                                                         case 'Order':
                                                         case 'Invoice':
                                                             article += '<option value="Blanket Agreement">Blanket Agreement</option>';
                                                             break;
                                                         case 'Original':
                                                             if (relationtypefetch == "Duplicate") {
                                                                 article += '<option value="Duplicate" selected>Duplicate</option>';
                                                                 article += '<option value="Copy">Copy</option>';
                                                             }
                                                             else {
                                                                 article += '<option value="Duplicate">Duplicate</option>';
                                                                 article += '<option value="Copy" selected>Copy</option>';
                                                             }
                                                             break;
                                                         case 'Duplicate':
                                                         case 'Copy':
                                                             article += '<option value="Original">Original</option>';
                                                             break;
                                                         case 'Past Contract':
                                                             article += '<option value="Renegotiated Contract">Renegotiated Contract</option>';
                                                             break;
                                                         case 'Renegotiated Contract':
                                                             article += '<option value="Past Contract">Past Contract</option>';
                                                             break;
                                                         case 'Primary Contract':
                                                             if (relationtypefetch == "Amendment") {
                                                                 article += '<option value="Amendment" selected>Amendment</option>';
                                                                 article += '<option value="Modification">Modification</option>';
                                                             }
                                                             else {
                                                                 article += '<option value="Amendment">Amendment</option>';
                                                                 article += '<option value="Modification" selected>Modification</option>';
                                                             }
                                                             break;
                                                         case 'Amendment':
                                                         case 'Modification':
                                                             article += '<option value="Primary Contract">Primary Contract</option>';
                                                             break;
                                                         case 'Other':
                                                             article += '<option value="Other">Other</option>';
                                                             break;
                                                     }

                                                     article += '</select><td></tr>';
                                                 }
                                                 else {
                                                     article += '<td class="ddl"><td></tr>'
                                                 }
                                                 $("#tblPopupContracts").append(article);
                                                 relatedContractsTag.push(item.ContractTitle.trim());
                                                 $("#" + item.RowKey).click(function () {
                                                     if (this.checked) {
                                                         if ($(this).parent().parent().children(".ddl").find('option').length == 0) {
                                                             var vOptions = "<select class='f_inpt width90' onchange='showallspans(this)'>";
                                                             var jsLang = $("#ddlRelationshipTypeParent option:selected").val();
                                                             var jsLangType = $("#ddlRelationshipType option:selected").val();
                                                             var rela1 = jQuery.grep(RelationshipTypes, function (a) {
                                                                 return (a[1] === jsLang && a[0] === jsLangType);
                                                             });
                                                             var rela2 = jQuery.grep(RelationshipTypes, function (a) {
                                                                 return (a[2].indexOf(jsLang) > -1 && a[0] === jsLangType);
                                                             });
                                                             if (rela1 != null && typeof (rela1) != "undefined" && rela1.length != 0) {
                                                                 var Relationship = rela1[0];
                                                                 $.each(Relationship[2], function (index, value) {
                                                                     var optRel2 = value.toString();
                                                                     vOptions += "<option value='" + optRel2 + "'>" + optRel2 + "</option>";
                                                                 })
                                                                 if ($(Relationship[2]).length == 0) {
                                                                     var optRel2 = Relationship[1].toString();
                                                                     vOptions += "<option value='" + optRel2 + "'>" + optRel2 + "</option>";
                                                                 }
                                                             }
                                                             else if (rela2 != null && typeof (rela2) != "undefined" && rela2.length != 0) {
                                                                 var Relationship = rela2[0];
                                                                 vOptions += "<option value='" + Relationship[1] + "'>" + Relationship[1] + "</option>";
                                                             }
                                                             else {
                                                                 switch (jsLang) {
                                                                     case 'Master Agreement':
                                                                         vOptions += '<option value="Sub-Agreement">Sub-Agreement</option>';
                                                                         vOptions += '<option value="SOW">SOW</option>';
                                                                         break;
                                                                     case 'Sub-Agreement':
                                                                     case 'SOW':
                                                                         vOptions += '<option value="Master Agreement">Master Agreement</option>';
                                                                         break;
                                                                     case 'Prime Contractor Agreement':
                                                                         vOptions += '<option value="Sub Contractor Agreement">Sub Contractor Agreement</option>';
                                                                         break;
                                                                     case 'Sub Contractor Agreement':
                                                                         vOptions += '<option value="Prime Contractor Agreement">Prime Contractor Agreement</option>';
                                                                         break;
                                                                     case 'Blanket Agreement':
                                                                         vOptions += '<option value="Order">Order</option>';
                                                                         vOptions += '<option value="Invoice">Invoice</option>';
                                                                         break;
                                                                     case 'Order':
                                                                     case 'Invoice':
                                                                         vOptions += '<option value="Blanket Agreement">Blanket Agreement</option>';
                                                                         break;
                                                                     case 'Original':
                                                                         vOptions += '<option value="Duplicate">Duplicate</option>';
                                                                         vOptions += '<option value="Copy">Copy</option>';
                                                                         break;
                                                                     case 'Duplicate':
                                                                     case 'Copy':
                                                                         vOptions += '<option value="Original">Original</option>';
                                                                         break;
                                                                     case 'Past Contract':
                                                                         vOptions += '<option value="Renegotiated Contract">Renegotiated Contract</option>';
                                                                         break;
                                                                     case 'Renegotiated Contract':
                                                                         vOptions += '<option value="Past Contract">Past Contract</option>';
                                                                         break;
                                                                     case 'Primary Contract':
                                                                         vOptions += '<option value="Amendment">Amendment</option>';
                                                                         vOptions += '<option value="Modification">Modification</option>';
                                                                         break;
                                                                     case 'Amendment':
                                                                     case 'Modification':
                                                                         vOptions += '<option value="Primary Contract">Primary Contract</option>';
                                                                         break;
                                                                     case 'Other':
                                                                         vOptions += '<option value="Other">Other</option>';
                                                                         break;
                                                                 }
                                                             }
                                                             vOptions += '</select>';
                                                             $(this).parent().parent().children(".ddl").append(vOptions);

                                                         }
                                                     } else {

                                                         $(this).parent().parent().children(".ddl").empty();
                                                     }
                                                     showallspans(this);
                                                 });
                                             }
                                         }
                                     }
                                 });
                                 $("#loadingPage").fadeOut();
                                 var vCount = $("#tblPopupContracts tr").length;

                                 if (vCount != 0) {
                                     $("#tblPopupContracts tr td").attr('style', 'vertical-align: top');
                                     $('#loadContract').html('');
                                     $('#compact-paginationRelatedContracts').css('display', '');
                                     $('#compact-paginationRelatedContracts').pagination({
                                         items: vCount,
                                         itemsOnPage: 10,
                                         type: 'tbody',
                                         typeID: 'tblPopupContracts',
                                         row: 'tr',
                                         cssStyle: 'compact-theme'
                                     });
                                 } else {
                                     $('#loadContract').html('<p style="margin-left: 20px;">No items found.</p>')
                                     $('#compact-paginationRelatedContracts').css('display', 'none');
                                 }
                                 $("#txtSearchBoxContract").autocomplete({
                                     source: relatedContractsTag,
                                     minLength: 2,
                                     focus: function (event, ui) {
                                         return false;
                                     },
                                     select: function (evn, uidetails) {
                                         $("#txtSearchBoxContract").val(uidetails.item.label);
                                         ViewContracts();
                                     }
                                 });
                                 $("#popupContracts").dialog("option", "title", "Related Contract Record(s)");
                                 $("#popupContracts").dialog("open");
                                 $("#loadingPage").fadeOut();
                             },
                             error: function () {
                                 $('#loadMA').empty();
                                 $('#loadMA').html('<p style="margin-left: 20px;">No items found.</p>');
                                 $("#loadingPage").fadeOut();
                             }
                         });
                     } else {
                         $('#loadMA').empty();
                         $("#popupContracts").dialog("option", "title", "Related Contract Record(s)");
                         $("#popupContracts").dialog("open");
                         $("#loadingPage").fadeOut();
                     }
                     vContractID = getParameterByName("ContractID");
                     BindRelatedContractsPopup(vContractID);
                 }
             });
         }
         return;
     });
}

function ViewContracts() {
    relatedContractsTag = [];
    var selectedrows = "";
    if ($("#txtSearchBoxContract").val() != "") {
        $('input:checkbox[name="RelatedContract"]:checked').each(function () {
            rowtext = this.value;
            if (rowtext != "" && rowtext.trim() == $("#txtSearchBoxContract").val().trim() && this.checked == true)
                $(this).parent().parent().remove();
        });
        selectedrows = $('input:checkbox[name="RelatedContract"]:checked').parent().parent();
    }

    var strCustomQueryRelCon = "";
    if ($("#filteroptionstatus").css('display') != 'none') {
        var RelConFilterCP = $('#ddlRelConFilterCounterparty option:selected');
        var strQryRelConFilterCP = "";
        if (RelConFilterCP != null && RelConFilterCP != "") {
            RelConFilterCP.each(function () {
                strQryRelConFilterCP += $(this).text() + "~";
            });
            strQryRelConFilterCP = removeLastChar(strQryRelConFilterCP, '~');
        }

        if (strQryRelConFilterCP != null && strQryRelConFilterCP != "") {
            strCustomQueryRelCon += "Counterparty:" + encodeURIComponent(strQryRelConFilterCP) + ";";
        }

    }

    if ($("#filteroptiontype").css('display') != 'none') {
        var RelConFilterContractTypes = $('#ddlRelConFilterContractType option:selected');
        var strQryRelConFilterCT = "";
        if (RelConFilterContractTypes != null && RelConFilterContractTypes != "") {
            RelConFilterContractTypes.each(function () {
                strQryRelConFilterCT += $(this).text() + "~";
            });
            strQryRelConFilterCT = removeLastChar(strQryRelConFilterCT, '~');
        }

        if (strQryRelConFilterCT != null && strQryRelConFilterCT != "") {
            strCustomQueryRelCon += "ContractType:" + encodeURIComponent(strQryRelConFilterCT) + ";";
        }
    }
    if (strCustomQueryRelCon != "")
        strCustomQueryRelCon = removeLastChar(strCustomQueryRelCon, ';');

    $("#tblPopupContracts").html('');
    $('#loadContract').html('<img src="../Content/Images/icon/loading.gif"> Searching...');
    var vURL = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/getrelatedcontracts?stage=&searchkeyword=' + encodeURIComponent($("#txtSearchBoxContract").val()) + '&customquery=' + strCustomQueryRelCon + '&sortbyfield=ContractTitle&orderby=ASC';
    $.ajax({
        url: vURL,
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: {
            'eContracts-ApiKey': localStorage.APIKey, BusinessAreaLocation: businessAreaPath, UserID: localStorage.UserID
        },
        cache: false,
        success: function (data) {
            $("#tblPopupContracts").html('');
            $('#loadContract').empty();


            var datalenght = data.length;
            counterpartyTags = [];
            //$.each($('#RelatedContracts').val().split(";"), function () {
            //    arr.push($.trim(this));
            //});
            arr = [];
            relatedContractsTag = [];
            RelatedContractIDarr = [];
            vRelatedContractTitlearr = [];
            vRelatedStatusarr = [];
            RelatedRelationshipTypearr = [];
            $.each($('#RelatedContracts').val().split(";"), function () {
                if (this != "") {
                    if ($.trim(this) != "") {
                        arr.push($.trim(this));
                    }
                }
            });
            if ($('#RelatedContracts').val() != "") {
                $.each($('#RelatedContracts').val().split(";"), function () {
                    if (!(arr.indexOf($.trim(this)) > -1)) {
                        arr.push($.trim(this));
                    }
                });
                if (arr.length > 0) {
                    if (arrRelatedContracts.length > 0) {
                        $.each(arrRelatedContracts[arrRelatedContracts.length - 1].RelatedContractID.split(";"), function () {
                            RelatedContractIDarr.push($.trim(this));
                        });
                        $.each(arrRelatedContracts[arrRelatedContracts.length - 1].RelatedContractTitle.split(";"), function () {
                            vRelatedContractTitlearr.push($.trim(this));
                        });
                        $.each(arrRelatedContracts[arrRelatedContracts.length - 1].RelatedStatus.split(";"), function () {
                            vRelatedStatusarr.push($.trim(this));
                        });
                        $.each(arrRelatedContracts[arrRelatedContracts.length - 1].RelatedRelationshipType.split(";"), function () {
                            RelatedRelationshipTypearr.push($.trim(this));
                        });
                    }
                }
            }
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];
                if ($("#hdnRelatedContracts").text().indexOf(item.RowKey) > -1) { }
                else {
                    if (item.ContractTitle) {
                        if (arr.indexOf(item.ContractTitle.trim()) >= 0) {
                            var article = '<tr><td>';
                            article += '<input id="' + item.RowKey + '" type="checkbox" name="RelatedContract" checked class="css1-checkbox" value="' + item.ContractTitle + '" />';
                            article += '<label for="' + item.RowKey + '" class="css1-label"><a href="/Contracts/ContractDetails?ContractID=' + item.RowKey + '" target="_blank">' + item.ContractTitle + '</a></label>'; //css1-label PreserveSpace  //ENH487 Customer inhanc
                            article += '</td>';
                            article += '<td><label class="">' + item.ContractType + '</label></td>'
                            article += '<td><label class="">'
                            if (item.Counterparty != null && item.Counterparty != "") {
                                article += item.Counterparty
                            } else {
                                article += "-"
                            }
                            article += '</label></td><td><label class="" style="word-break: break-all;">'
                            if (item.ContractNumber != null && item.ContractNumber != "") {
                                article += item.ContractNumber
                            } else {
                                article += "-"
                            }
                            article += '</label></td><td><label class="">' + item.Status + '</label></td>'
                            var relationtypefetch = "";
                            if (arrRelatedContracts.length > 0) {
                                var indexvaluetake = arrRelatedContracts[arrRelatedContracts.length - 1].RelatedContractTitle.split(';').indexOf(item.ContractTitle.trim());
                                relationtypefetch = RelatedRelationshipTypearr[indexvaluetake];
                            }
                            else {
                                if (arr.indexOf(item.ContractTitle.trim()) >= 0) {
                                    var indexvaluetake = arr.indexOf(item.ContractTitle.trim());
                                    relationtypefetch = RelatedRelationshipTypearr[indexvaluetake];
                                }
                            }

                            //var indexvaluetake = arrRelatedContracts[arrRelatedContracts.length - 1].RelatedContractTitle.split(';').indexOf(item.ContractTitle.trim());
                            //var relationtypefetch = RelatedRelationshipTypearr[indexvaluetake];
                            article += "<td class='ddl'><select class='f_inpt width90' onchange='showallspans(this)'>";
                            var jsLang = $("#ddlRelationshipTypeParent option:selected").val();
                            switch (jsLang) {
                                case 'Master Agreement':
                                    if (relationtypefetch == "Sub-Agreement") {
                                        article += '<option value="Sub-Agreement" selected>Sub-Agreement</option>';
                                        article += '<option value="SOW">SOW</option>';
                                    }
                                    else {
                                        article += '<option value="Sub-Agreement" >Sub-Agreement</option>';
                                        article += '<option value="SOW" selected>SOW</option>';
                                    }
                                    break;
                                case 'Sub-Agreement':
                                case 'SOW':
                                    article += '<option value="Master Agreement">Master Agreement</option>';
                                    break;
                                case 'Prime Contractor Agreement':
                                    article += '<option value="Sub Contractor Agreement">Sub Contractor Agreement</option>';
                                    break;
                                case 'Sub Contractor Agreement':
                                    article += '<option value="Prime Contractor Agreement">Prime Contractor Agreement</option>';
                                    break;
                                case 'Blanket Agreement':
                                    if (relationtypefetch == "Order") {
                                        article += '<option value="Order" selected>Order</option>';
                                        article += '<option value="Invoice">Invoice</option>';
                                    }
                                    else {
                                        article += '<option value="Order">Order</option>';
                                        article += '<option value="Invoice" selected>Invoice</option>';
                                    }

                                    break;
                                case 'Order':
                                case 'Invoice':
                                    article += '<option value="Blanket Agreement">Blanket Agreement</option>';
                                    break;
                                case 'Original':
                                    if (relationtypefetch == "Duplicate") {
                                        article += '<option value="Duplicate" selected>Duplicate</option>';
                                        article += '<option value="Copy">Copy</option>';
                                    }
                                    else {
                                        article += '<option value="Duplicate">Duplicate</option>';
                                        article += '<option value="Copy" selected>Copy</option>';
                                    }
                                    break;
                                case 'Duplicate':
                                case 'Copy':
                                    article += '<option value="Original">Original</option>';
                                    break;
                                case 'Past Contract':
                                    article += '<option value="Renegotiated Contract">Renegotiated Contract</option>';
                                    break;
                                case 'Renegotiated Contract':
                                    article += '<option value="Past Contract">Past Contract</option>';
                                    break;
                                case 'Primary Contract':
                                    if (relationtypefetch == "Amendment") {
                                        article += '<option value="Amendment" selected>Amendment</option>';
                                        article += '<option value="Modification">Modification</option>';
                                    }
                                    else {
                                        article += '<option value="Amendment">Amendment</option>';
                                        article += '<option value="Modification" selected>Modification</option>';
                                    }
                                    break;
                                case 'Amendment':
                                case 'Modification':
                                    article += '<option value="Primary Contract">Primary Contract</option>';
                                    break;
                                case 'Other':
                                    article += '<option value="Other">Other</option>';
                                    break;
                            }

                            article += '</select></td></tr>';
                            $("#tblPopupContracts").append(article);

                            relatedContractsTag.push(item.ContractTitle.trim());
                        } else {
                            var article = '<tr><td>';
                            article += '<input id="' + item.RowKey + '" type="checkbox" name="RelatedContract" onchange="javascript:collectrelatedcontractrowkey(this);" class="css1-checkbox" value="' + item.ContractTitle + '" />';
                            article += '<label for="' + item.RowKey + '" class="css1-label"><a href="/Contracts/ContractDetails?ContractID=' + item.RowKey + '" target="_blank">' + item.ContractTitle + '</a></label>'; //css1-label PreserveSpace
                            article += '</td>';
                            article += '<td><label class="">' + item.ContractType + '</label></td>'
                            article += '<td><label class="">'
                            if (item.Counterparty != null && item.Counterparty != "") {
                                article += item.Counterparty
                            } else {
                                article += "-"
                            }
                            article += '</label></td><td><label class="" style="word-break: break-all;">'
                            if (item.ContractNumber != null && item.ContractNumber != "") {
                                article += item.ContractNumber
                            } else {
                                article += "-"
                            }
                            article += '</label></td><td><label class="">' + item.Status + '</label></td>'
                            article += '<td class="ddl"><td></tr>'
                            $("#tblPopupContracts").append(article);
                            relatedContractsTag.push(item.ContractTitle.trim());
                        }
                        $("#" + item.RowKey).click(function () {
                            if (this.checked) {
                                if ($(this).parent().parent().children(".ddl").find('option').length == 0) {
                                    var vOptions = "<select class='f_inpt width90' onchange='showallspans(this)'>";
                                    var jsLang = $("#ddlRelationshipTypeParent option:selected").val();
                                    var jsLangType = $("#ddlRelationshipType option:selected").val();
                                    var rela1 = jQuery.grep(RelationshipTypes, function (a) {
                                        return (a[1] === jsLang && a[0] === jsLangType);
                                    });
                                    var rela2 = jQuery.grep(RelationshipTypes, function (a) {
                                        return (a[2].indexOf(jsLang) > -1 && a[0] === jsLangType);
                                    });
                                    if (rela1 != null && typeof (rela1) != "undefined" && rela1.length != 0) {
                                        var Relationship = rela1[0];
                                        $.each(Relationship[2], function (index, value) {
                                            var optRel2 = value.toString();
                                            vOptions += "<option value='" + optRel2 + "'>" + optRel2 + "</option>";
                                        })
                                        if ($(Relationship[2]).length == 0) {
                                            var optRel2 = Relationship[1].toString();
                                            vOptions += "<option value='" + optRel2 + "'>" + optRel2 + "</option>";
                                        }
                                    }
                                    else if (rela2 != null && typeof (rela2) != "undefined" && rela2.length != 0) {
                                        var Relationship = rela2[0];
                                        vOptions += "<option value='" + Relationship[1] + "'>" + Relationship[1] + "</option>";
                                    }
                                    else {
                                        switch (jsLang) {
                                            case 'Master Agreement':
                                                vOptions += '<option value="Sub-Agreement">Sub-Agreement</option>';
                                                vOptions += '<option value="SOW">SOW</option>';
                                                break;
                                            case 'Sub-Agreement':
                                            case 'SOW':
                                                vOptions += '<option value="Master Agreement">Master Agreement</option>';
                                                break;
                                            case 'Prime Contractor Agreement':
                                                vOptions += '<option value="Sub Contractor Agreement">Sub Contractor Agreement</option>';
                                                break;
                                            case 'Sub Contractor Agreement':
                                                vOptions += '<option value="Prime Contractor Agreement">Prime Contractor Agreement</option>';
                                                break;
                                            case 'Blanket Agreement':
                                                vOptions += '<option value="Order">Order</option>';
                                                vOptions += '<option value="Invoice">Invoice</option>';
                                                break;
                                            case 'Order':
                                            case 'Invoice':
                                                vOptions += '<option value="Blanket Agreement">Blanket Agreement</option>';
                                                break;
                                            case 'Original':
                                                vOptions += '<option value="Duplicate">Duplicate</option>';
                                                vOptions += '<option value="Copy">Copy</option>';
                                                break;
                                            case 'Duplicate':
                                            case 'Copy':
                                                vOptions += '<option value="Original">Original</option>';
                                                break;
                                            case 'Past Contract':
                                                vOptions += '<option value="Renegotiated Contract">Renegotiated Contract</option>';
                                                break;
                                            case 'Renegotiated Contract':
                                                vOptions += '<option value="Past Contract">Past Contract</option>';
                                                break;
                                            case 'Primary Contract':
                                                vOptions += '<option value="Amendment">Amendment</option>';
                                                vOptions += '<option value="Modification">Modification</option>';
                                                break;
                                            case 'Amendment':
                                            case 'Modification':
                                                vOptions += '<option value="Primary Contract">Primary Contract</option>';
                                                break;
                                            case 'Other':
                                                vOptions += '<option value="Other">Other</option>';
                                                break;
                                        }
                                    }
                                    vOptions += '</select>';
                                    $(this).parent().parent().children(".ddl").append(vOptions);

                                }
                            } else {

                                $(this).parent().parent().children(".ddl").empty();
                            }
                            showallspans(this);
                        });
                    }
                }
            }

            collectrelatedcontractrowkey("");
            var vCount = $("#tblPopupContracts tr").length;
            if (vCount != 0) {
                $('#loadContract').html('');
                $("#tblPopupContracts tr td").attr('style', 'vertical-align: top');
                $('#compact-paginationRelatedContracts').css('display', '');
                $('#compact-paginationRelatedContracts').pagination({
                    items: vCount,
                    itemsOnPage: 10,
                    type: 'tbody',
                    typeID: 'tblPopupContracts',
                    row: 'tr',
                    cssStyle: 'compact-theme'
                });
                $(".validelement").each(function (index, element) {
                    $(element).removeClass("error");
                    $("#errormsg_" + element.id).remove();
                });
                if ($('#dvfilter').is(':hidden')) {
                }
                else {
                    $('#dvfilter').slideToggle();
                }
            } else {
                $(".validelement").each(function (index, element) {
                    $(element).removeClass("error");
                    $("#errormsg_" + element.id).remove();
                });
                if ($('#dvfilter').is(':hidden')) {
                }
                else {
                    $('#dvfilter').slideToggle();
                }
                $('#loadContract').html('<p style="margin-left: 20px;">No items found.</p>')
                $('#compact-paginationRelatedContracts').css('display', 'none');
            }
            //Sridhar
            if (selectedrows != null && selectedrows != "") {
                if (selectedrows != null && selectedrows != "") {
                    $('input:checkbox[name="RelatedContract"]:checked').each(function () {
                        rowtext = $(this).parent().parent().children().find("input[type=checkbox]")[0].value;
                        if (rowtext != "") {
                            $(selectedrows).each(function (i, item) {
                                if (item.children[0].textContent.trim() == rowtext.trim()) {
                                    selectedrows.splice(i, 1);
                                }
                            });
                        }
                    });
                    $(selectedrows).each(function (i, item) {
                        $(item).hide();
                    });
                    $("#tblPopupContracts").append(selectedrows);
                }
            }
            $("#txtSearchBoxContract").autocomplete({
                source: relatedContractsTag,
                minLength: 2,
                focus: function (event, ui) {
                    return false;
                },
                select: function (evn, uidetails) {
                    $("#txtSearchBoxContract").val(uidetails.item.label);
                    ViewContracts();
                }
            });
            $(".validelement").each(function (index, element) {
                $(element).removeClass("error");
                $("#errormsg_" + element.id).remove();
            });
            if ($('#dvfilter').is(':hidden')) {
            }
            else {
                $('#dvfilter').slideToggle();
            }
        },
        error: function () {
            $(".validelement").each(function (index, element) {
                $(element).removeClass("error");
                $("#errormsg_" + element.id).remove();
            });
            if ($('#dvfilter').is(':hidden')) {
            }
            else {
                $('#dvfilter').slideToggle();
            }
            $('#compact-paginationRelatedContracts').css('display', 'none');
            $('#loadContract').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>')
        }
    });
}

function RelatedContractsPush() {
    var vRelatedContractID = "";
    var vRelatedContractTitle = "";
    var vRelatedStatus = "";
    var vChildRelation = "";
    var vParentRelationshipType = "";
    $('input:checkbox[name="RelatedContract"]:checked').each(function () {
        if (vRelatedContractID == "") {
            vRelatedContractID = this.id;
            vRelatedContractTitle = this.value;
            vRelatedStatus = $(this).parent().parent().children().eq(4).text();
            vChildRelation = $(this).parent().parent().children(".ddl").find('option:selected').text();
            vParentRelationshipType = $("#ddlRelationshipTypeParent").find('option:selected').text();
        }
        else {
            vRelatedContractID += "; " + this.id;
            vRelatedContractTitle += "; " + this.value;
            vRelatedStatus = $(this).parent().parent().children().eq(4).text();
            vChildRelation += "; " + $(this).parent().parent().children(".ddl").find('option:selected').text();
            vParentRelationshipType += "; " + $("#ddlRelationshipTypeParent").find('option:selected').text();
        }
    });

    if (vRelatedContractID != "") {
        if (requiredValidator('popupContracts', false)) {
            //arrRelatedContracts.push({
            //    ContractID: "",
            //    ContractTitle: "",
            //    RelatedContractID: vRelatedContractID,
            //    RelatedContractTitle: vRelatedContractTitle,
            //    RelationshipType: vParentRelationshipType,
            //    RelatedRelationshipType: vChildRelation,
            //    CreatedBy: localStorage.UserName,
            //    ModifiedBy: localStorage.UserName
            //});

            $("#popupContracts").dialog("close");
            return true;
        }
    } else {

        swal("", "No contract has been selected.");
        $("#popupContracts").dialog("close");
        return false;
    }

}

function CreateRelatedContract(contractid, contracttitle) {

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + contractid + '/relatedcontracts',
        type: 'POST',
        dataType: 'json',
        headers: {
            'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging
        },
        data: {
            ContractID: contractid,
            ContractTitle: contracttitle,
            RelatedContractID: arrRelatedContracts[arrRelatedContracts.length - 1].RelatedContractID,
            RelatedContractTitle: arrRelatedContracts[arrRelatedContracts.length - 1].RelatedContractTitle,
            RelationshipType: arrRelatedContracts[arrRelatedContracts.length - 1].RelationshipType,
            RelatedStatus: arrRelatedContracts[arrRelatedContracts.length - 1].RelatedStatus,
            RelatedRelationshipType: arrRelatedContracts[arrRelatedContracts.length - 1].RelatedRelationshipType,
            CreatedBy: localStorage.UserName,
            ModifiedBy: localStorage.UserName,
        },
        cache: false,
        success: function (person) {
            arrRelatedContracts = [];
        },
        error: function (request) {
            arrRelatedContracts = [];
        }
    });
}


var arrRelatedContracts = [];
var curRelatedContracts = [];
var PrvRelatedCounterparities = [];
var arrRelatedCounterparities = [];
var curRelatedCounterparities = [];

function ViewRelatedRequest() {
    arrRelatedRequestRowkey = [];
    $('#loadProContract').html('<img src="../Content/Images/icon/loading.gif"> Working on it...');
    $.each($("#RelatedRequests").val().split(";"), function () {
        arrRelatedRequestRowkey.push($.trim(this));
    });
    if ($('#tblRequests tr').length <= 0) {
        RelatedRequestCollection();
    } else {
        EditRelatedRequests(0);
        $('#loadProContract').empty();
        $("#browseRequest").dialog("option", "title", "Request Picker");
        $("#browseRequest").dialog("open");
    }
}
var RequestTileTag = [];
function RelatedRequestCollection() {
    $("#tblRequests").empty();
    $("#loadingPage").fadeIn();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/relatedrequestsearch?businessarea=' + $("#txtBusinessArea").val() + '&sortbyfield=RequestTitle&orderby=ASC',
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: {
            'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID
        },
        cache: false,
        success: function (data) {
            $('#loadProRequest').empty();
            arr = [];
            $.each($('#RelatedRequests').val().split(";"), function () {
                arr.push($.trim(this));
            });
            var datalength = data.length;
            if (datalength > 0) {
                listRelatedRequests = data;
                EditRelatedRequests(0);
                $("#txtSearchBoxRequest").autocomplete({
                    source: RequestTileTag,
                    minLength: 1,
                    focus: function (event, ui) {
                        return false;
                    },
                    select: function (evn, uidetails) {
                        $("#txtSearchBoxRequest").val(uidetails.item.label);
                        SearchRequest();
                    }
                });

                RequestTileTag = [];
                var vCount = $("#tblRequests tr").length;
                $('#compact-paginationContracts').pagination({
                    items: vCount,
                    itemsOnPage: 10,
                    typeID: 'tblRequests',
                    cssStyle: 'compact-theme',
                    listname: 'RelatedRequestsEdit'
                });
                $("#loadingPage").fadeOut();
                try {
                    $("#browseRequest").dialog("option", "title", "Request Picker");
                    $("#browseRequest").dialog("open");
                }
                catch (ex) {
                    // alert(ex);
                }
            } else {
                $('#loadProRequest').empty();
                $('#loadProRequest').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>')
                $("#browseRequest").dialog("option", "title", "Request Picker");
                $("#browseRequest").dialog("open");
                $("#loadingPage").fadeOut();
            }

        },
        error: function () {
            $('#loadProRequest').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>')
            $("#browseRequest").dialog("option", "title", "Request Picker");
            $("#browseRequest").dialog("open");
            $("#loadingPage").fadeOut();
        }
    });

}

function EditRelatedRequests(page) {
    var article = "";
    var startIndex = page * 10;
    var endIndex = startIndex + 10;
    if (endIndex > listRelatedRequests.length) endIndex = listRelatedRequests.length;
    //$("#spResult").html((startIndex + 1) + '&nbsp;to&nbsp;' + endIndex + '&nbsp;of&nbsp;' + listRelatedContracts.length);
    for (i = startIndex; i < endIndex; i++) {
        var item = listRelatedRequests[i];
        if (item.RequestTitle != "") {
            if (i == 0) {
                article += '<tr><th>Request Title</th></tr>';
            }
            article += '<tr><td>';
            if (arrRelatedRequestRowkey.indexOf(item.RequestTitle) >= 0) {
                article += '<input id="Pro' + item.RowKey + '"  type="checkbox" onchange="addrealetedrequest(this)" name="RelatedRequest" class="css1-checkbox" checked value="' + item.RequestTitle + '" />';
            } else {
                article += '<input id="Pro' + item.RowKey + '"  type="checkbox" onchange="addrealetedrequest(this)" name="RelatedRequest" class="css1-checkbox" value="' + item.RequestTitle + '" />';
            }
            article += '<label for="Pro' + item.RowKey + '" class="css1-label"><a href="/Pipeline/RequestDetails?RequestID=' + item.RowKey + '" target="_blank">' + item.RequestTitle + '</a></label>';  //ENH487 Customer inhanc
            article += '</td></tr>';
            RequestTileTag.push(item.RequestTitle);
        }
    }
    $("#tblRequests").html(article);

    article = "";
}

function SearchRequest() {
    $("#tblRequests").empty();
    $('#loadProRequest').html('<img src="../Content/Images/icon/loading.gif"> Searching...');
    var vURL = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests?searchkeyword=' + encodeURIComponent($("#txtSearchBoxRequest").val()) + '&customquery=BusinessArea:' + $("#txtBusinessArea").val() + '&sortbyfield=RequestTitle&orderby=ASC';
    $.ajax({
        url: vURL,
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        cache: false,
        success: function (data) {
            $("#tblRequests").empty();
            $('#loadProRequest').empty();
            arr = [];
            $.each($('#RelatedRequests').val().split(";"), function () {
                arr.push($.trim(this));
            });
            //eO39951
            var article = '';
            var startIndex = 0 * 10;
            var endIndex = startIndex + 10;
            if (endIndex > data.length) endIndex = data.length;
            for (var i = startIndex ; i < endIndex; i++) {
                var item = data[i];
                if (i == 0) {
                    article += '<tr><th>Request Title</th></tr>';
                }
                article += '<tr><td>';
                if (arr.indexOf(item.RequestTitle) >= 0) {
                    article += '<input id="Pro' + item.RowKey + '" type="checkbox" onchange="addrealetedrequest(this)" name="RelatedRequest" checked class="css1-checkbox" value="' + item.RequestTitle + '" />';
                } else {
                    article += '<input id="Pro' + item.RowKey + '" type="checkbox" onchange="addrealetedrequest(this)" name="RelatedRequest" class="css1-checkbox" value="' + item.RequestTitle + '" />';
                }
                //article += '<input id="' + item.RowKey + '" type="checkbox" name="RelatedRequest" class="css1-checkbox" value="' + item.RequestTitle + '" />';
                article += '<label for="Pro' + item.RowKey + '" class="css1-label"><a href="/Pipeline/RequestDetails?RequestID=' + item.RowKey + '" target="_blank">' + item.RequestTitle + '</a></label>';    //ENH487 Customer inhanc
                article += '</td></tr>';
            }
            $("#tblRequests").html(article);
            article = '';
            var vCount = $("#tblRequests tr").length;
            if (vCount != 0) {
                $('#loadProRequest').html('');
                $('#compact-paginationContracts').css('display', '');
                $('#compact-paginationContracts').pagination({
                    items: vCount,
                    itemsOnPage: 10,
                    typeID: 'tblRequests',
                    cssStyle: 'compact-theme',
                    listname: 'RelatedRequestsEdit'
                });
            } else {
                $('#loadProRequest').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>')
                $('#compact-paginationContracts').css('display', 'none');
            }
        },
        error: function () {
            $('#compact-paginationContracts').css('display', 'none');
            $('#loadProRequest').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>')
        }
    });

}


function AddRequest() {
    var vRequest = "";
    var vRequestName = "";
    //$('input:checkbox[name="RelatedRequest"]:checked').each(function () {
    //    vRequestName = this.value;
    //    if (vRequest == "") {
    //        vRequest = this.value;
    //    }
    //    else {
    //        vRequest += "; " + this.value;
    //    }
    //});
    $(arrRelatedRequestRowkey).each(function (i, item) {
        if (vRequest == "") {
            vRequest = item;
        }
        else {
            vRequest += "; " + item;
        }
    });
    if (vRequest != "") {
        $('#RelatedRequests').val(vRequest);
        return true;
    } else {
        //alert('No contract has been selected.');
        swal("", "No request has been selected.");
        $('#RelatedRequests').val("");
        return false;
    }

}




function CreateCounterPartyListUnit(page) {
    $("#tblCounterparties").css("display", "");
    var startIndex = page * 10;
    var endIndex = startIndex + 10;
    $('#tblCounterparties').empty();
    if (endIndex > myCounterPartyArray.length) endIndex = myCounterPartyArray.length;
    $("#spResult").html((startIndex + 1) + '&nbsp;to&nbsp;' + endIndex + '&nbsp;of&nbsp;' + myCounterPartyArray.length);
    var resultfound = false;
    var checkboxchecking = true;
    if (startIndex == endIndex) {
        var art = "No items found.";
        $("#tblCounterparties").append(art);
        checkboxchecking = false;
        $('#loadGenCounterParty').empty();
    }
    else {
        //var spltarrprevRUstr = CounterPartyArrayprev.toString();
        //if (spltarrprevRUstr.indexOf(";") > -1) {
        //    var spltarrprevRU = spltarrprevRUstr.split(';');
        //    CounterPartyArrayprev = [];
        //    for (var arrli = 0; arrli < spltarrprevRU.length; arrli++) {
        //        if (spltarrprevRU[arrli].trim() != "") {
        //            CounterPartyArrayprev.push(spltarrprevRU[arrli].trim());
        //        }
        //    }
        //}
        for (var i = startIndex; i < endIndex; i++) {
            var article = "";
            if (i == startIndex) {
                article += '<tr><th><input id="selectallCounterParty" onclick="funselectallCounterParty(this);" type="checkbox"/> Select/Deselect All</th><th>Counterparty Type</th><th>Global or Regional</th></tr>';
            }

            article += '<tr><td>';
            //if (CounterPartyArrayprev != null && multipleChecksDocumentID.length > 0) {
            //    if (CounterPartyArrayprev.indexOf(myCounterPartyArray[i].CounterpartyName.trim()) >= 0 && multipleChecksDocumentID.indexOf(myCounterPartyArray[i].CounterpartyName.trim()) > -1) {
            //        article += '<input id="CP' + myCounterPartyArray[i].RowKey + '" type="checkbox" name="Counterparty" onclick="checkMultipleDocumentsCounterParty(this);" checked class="css1-checkbox" value="' + myCounterPartyArray[i].CounterpartyName.trim() + '" /></td>';
            //    }
            if (multipleChecksDocumentID.length > 0) {
                if (multipleChecksDocumentID.indexOf(myCounterPartyArray[i].CounterpartyName.trim()) > -1) {
                    article += '<input id="' + myCounterPartyArray[i].RowKey + '" type="checkbox" name="Counterparty" onclick="checkMultipleDocumentsCounterParty(this);" checked class="css1-checkbox" value="' + escape(myCounterPartyArray[i].CounterpartyName.trim()) + '" />';
                }
                else {
                    article += '<input id="' + myCounterPartyArray[i].RowKey + '" type="checkbox" name="Counterparty" onclick="checkMultipleDocumentsCounterParty(this);"  class="css1-checkbox" value="' + escape(myCounterPartyArray[i].CounterpartyName.trim()) + '" />';
                    checkboxchecking = false;
                }
            }
                //else if (CounterPartyArrayprev.indexOf(myCounterPartyArray[i].CounterpartyName.trim()) >= 0 && multipleChecksDocumentID.length == 0) {
                //    article += '<input id="' + myCounterPartyArray[i].RowKey + '" type="checkbox" name="Counterparty" onclick="checkMultipleDocumentsCounterParty(this);" checked class="css1-checkbox" value="' + myCounterPartyArray[i].CounterpartyName.trim() + '" /></td>';
                //}
                //else if (multipleChecksDocumentID.indexOf(myCounterPartyArray[i].CounterpartyName.trim()) > -1) {
                //    article += '<input id="' + myCounterPartyArray[i].RowKey + '" type="checkbox" name="Counterparty" onclick="checkMultipleDocumentsCounterParty(this);" checked class="css1-checkbox" value="' + myCounterPartyArray[i].CounterpartyName.trim() + '" /></td>';
                //}
            else {
                article += '<input id="' + myCounterPartyArray[i].RowKey + '" type="checkbox" name="Counterparty" onclick="checkMultipleDocumentsCounterParty(this);"  class="css1-checkbox" value="' + escape(myCounterPartyArray[i].CounterpartyName.trim()) + '" />';
                checkboxchecking = false;
            }
            article += '<label for="CP' + myCounterPartyArray[i].RowKey + '" class="css1-label"  style="display: inline;"><a href="/Counterparty/CounterpartyDetail?CounterpartyID=' + myCounterPartyArray[i].RowKey + '" target="_blank">' + myCounterPartyArray[i].CounterpartyName.trim() + '</a></label></td>';   //ENH487 Customer inhanc
            article += '<td>' + myCounterPartyArray[i].CounterpartyType + '';
            article += '</td>';
            article += '<td>' + (myCounterPartyArray[i].IsGlobal == "Yes" ? "Global" : myCounterPartyArray[i].BusinessAreas) + '';
            article += '</td></tr>';
            $("#tblCounterparties").append(article);
            $('#loading').empty();
            resultfound = true;
        }
    }
    if (checkboxchecking == true) {
        $("#selectallCounterParty").prop('checked', true);
    }
    else {
        $("#selectallCounterParty").prop('checked', false);
    }
    var checkingsdivchild = document.getElementById("liSelectedCounterParty").hasChildNodes();
    if (!checkingsdivchild) {
        if (multipleChecksDocumentID.length > 0) {
            for (var spl = 0; spl < multipleChecksDocumentID.length; spl++) {
                if (multipleChecksDocumentID[spl].trim() != "") {
                    $('#liSelectedCounterParty').append('<span style="font-size:13px;">' + multipleChecksDocumentID[spl].trim() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveSelectedCouterParty(this);" style="float:right" /></span>');
                }
            }
        }
        else {
            //var textvalid = $("#Counterparty").val();
            //if (typeof textvalid != 'undefined' && textvalid != "") {
            //    var splitmulicheckforbind = textvalid.split(';');
            //    for (var spl = 0; spl < splitmulicheckforbind.length; spl++) {
            //        if (splitmulicheckforbind[spl].trim() != "") {
            //            $('#liSelectedCounterParty').append('<span style="font-size:13px;">' + splitmulicheckforbind[spl].trim() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveSelectedCouterParty(this);" style="float:right" /></span>');
            //            multipleChecksDocumentID.push(splitmulicheckforbind[spl].trim());
            //        }
            //    }
            //}
            //else {
            //    checkMultipleDocumentsCounterParty("");
            //}
        }
    }
    $('#loadGenCounterParty').empty();
}








function funselectallCounterParty(obj) {
    if (obj.checked) { // check select status  
        $('input:checkbox[name=Counterparty]').prop('checked', true);
    } else {
        $('input:checkbox[name=Counterparty]').prop('checked', false);
    }
    checkMultipleDocumentsCounterParty("");
}

function funselectallLE(obj) {
    if (obj.checked) { // check select status  
        $('input:checkbox[name=CompanyProfile]').prop('checked', true);
    } else {
        $('input:checkbox[name=CompanyProfile]').prop('checked', false);
    }
    checkMultipleDocumentsLE("");
}

function checkMultipleDocumentsCounterParty(object) {
    //manoj
    var arrselectedcunterparty = [];
    currSelected = true;
    $.each($('#liSelectedCounterParty').children(), function () {
        if (arrselectedcunterparty.indexOf($.trim(this.textContent)) == -1)
            arrselectedcunterparty.push($.trim(this.textContent));
    });
    $('#liSelectedCounterParty').empty();

    //var tablebind = $('#tblCounterparties').DataTable();//Performance Optimization
    //$.each($('input:checkbox[name="Counterparty"]', tablebind.rows().nodes()), function () {
    $.each($('#tblCounterparties input:checkbox[name="Counterparty"]'), function () {
        if (typeof ($.trim(this)) != 'undefined' && $.trim(this) != null) {
            if ($.trim(this.value) != "") {
                if (this.checked) {
                    if (arrselectedcunterparty.indexOf(unescape($.trim(this.value))) == -1) {
                        arrselectedcunterparty.push(unescape($.trim(this.value)))
                    }
                    if (currentSelectedCounterParty.indexOf(unescape($.trim(this.value))) == -1) {
                        currentSelectedCounterParty.push(unescape($.trim(this.value)))
                    }
                } else if (arrselectedcunterparty.indexOf(unescape($.trim(this.value))) > -1) {
                    arrselectedcunterparty.splice(arrselectedcunterparty.indexOf(unescape($.trim(this.value))), 1);

                    if (currentSelectedCounterParty.indexOf(unescape($.trim(this.value))) > -1) {
                        currentSelectedCounterParty.splice(currentSelectedCounterParty.indexOf(unescape($.trim(this.value))), 1);
                    }
                }
            }
        }
    });
    arrselectedcunterparty.sort();
    $.each(arrselectedcunterparty, function () {
        $('#liSelectedCounterParty').append('<span style="font-size:13px;">' + $.trim(this) + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveSelectedCouterParty(this);" style="float:right" /></span>');
    });

    //if (arrselectedcunterparty.length == 0 && strSelCounterPartyField == "Counterparty") {
    //    $("#counterpartyUL").empty();
    //}
    arrselectedcunterparty = [];

    if ($('input:checkbox[name="Counterparty"]:checked').length == $('input:checkbox[name="Counterparty"]').length && $('input:checkbox[name="Counterparty"]:checked').length != 0) {
        $("#selectallCounterParty").prop('checked', true);
    } else {
        $("#selectallCounterParty").prop('checked', false);
    }
    //if ($(object).prop('checked') == false && strSelCounterPartyField == "Counterparty") {
    //    $("#counterpartyUL li div").filter(':contains(' + $(object).val() + ')').parent().remove();
    //}
    //manoj
    try {
        //hideAllMenuAndStopPro(event);//Performance Optimization
    }
    catch (ex) {

    }
}

function checkMultipleDocumentsLE(object) {
    //manoj
    var arrselectedLE = [];
    $.each($('#liSelectedLegalEntity').children(), function () {
        if (arrselectedLE.indexOf($.trim(this.textContent)) == -1)
            arrselectedLE.push($.trim(this.textContent));
    });
    $('#liSelectedLegalEntity').empty();

    var tablebind = $('#tblLE').DataTable();
    $.each($('input:checkbox[name="CompanyProfile"]', tablebind.rows().nodes()), function () {
        if (typeof ($.trim(this)) != 'undefined' && $.trim(this) != null) {
            if ($.trim(this.value) != "") {
                if (this.checked) {
                    if (arrselectedLE.indexOf(unescape($.trim(this.value))) == -1) {
                        arrselectedLE.push(unescape($.trim(this.value)))
                    }
                } else if (arrselectedLE.indexOf(unescape($.trim(this.value))) > -1) {
                    arrselectedLE.splice(arrselectedLE.indexOf(unescape($.trim(this.value))), 1);
                }
            }
        }
    });
    arrselectedLE.sort();
    $.each(arrselectedLE, function () {
        $('#liSelectedLegalEntity').append('<span style="font-size:13px;">' + $.trim(this) + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveSelectedLE(this);" style="float:right" /></span>');
    });
    arrselectedLE = [];

    //manoj
    if ($('input:checkbox[name="CompanyProfile"]:checked').length == $('input:checkbox[name="CompanyProfile"]').length && $('input:checkbox[name="CompanyProfile"]:checked').length != 0) {
        $("#selectallLE").prop('checked', true);
    } else {
        $("#selectallLE").prop('checked', false);
    }

    try {
        hideAllMenuAndStopPro(event);
    }
    catch (ex) {

    }
}

function liRemoveSelectedCouterParty(obj) {
    var child = obj.parentNode;
    //manoj
    //var tablebind = $('#tblCounterparties').DataTable();
    //$.each($('input:checkbox[name="Counterparty"]:checked', tablebind.rows().nodes()), function () {
    $('input:checkbox[name="Counterparty"]:checked').each(function () {
        if (typeof ($.trim(this)) != 'undefined' && $.trim(this) != null) {
            if (unescape($.trim(this.value)) == child.textContent) {
                this.checked = false;
            }
        }
    });
    child.parentNode.removeChild(child);

    if ($('input:checkbox[name="Counterparty"]:checked').length == $('input:checkbox[name="Counterparty"]').length && $('input:checkbox[name="Counterparty"]:checked').length != 0) {
        $("#selectallCounterParty").prop('checked', true);
    } else {
        $("#selectallCounterParty").prop('checked', false);
    }
    //manoj

    //if (strSelCounterPartyField == "Counterparty")
    //    $("#counterpartyUL li div").filter(':contains(' + $(child).text() + ')').parent().remove();
}

function liRemoveSelectedLE(obj) {
    var child = obj.parentNode;
    var tablebind = $('#tblLE').DataTable();
    $.each($('input:checkbox[name="CompanyProfile"]:checked', tablebind.rows().nodes()), function () {
        if (typeof ($.trim(this)) != 'undefined' && $.trim(this) != null) {
            if (unescape($.trim(this.value)) == child.textContent) {
                this.checked = false;
            }
        }
    });
    child.parentNode.removeChild(child);

    if ($('input:checkbox[name="CompanyProfile"]:checked').length == $('input:checkbox[name="CompanyProfile"]').length && $('input:checkbox[name="CompanyProfile"]:checked').length != 0) {
        $("#selectallLE").prop('checked', true);
    } else {
        $("#selectallLE").prop('checked', false);
    }

}

function checkwithrenewaldate() {
    var isallow = true;
    var RenewalDatevalue = $("#RenewalDate").val();
    if (typeof RenewalDatevalue != 'undefined') {
        if ($("#EndDate").val() != null && $("#EndDate").val() != '' &&
       $("#RenewalDate").val() != null && $("#RenewalDate").val() != '') {
            var dt1 = new Date($.datepicker.formatDate('mm/dd/yy', $("#EndDate").datepicker('getDate')));
            var dt2 = new Date($.datepicker.formatDate('mm/dd/yy', $("#RenewalDate").datepicker('getDate')));
            //var dt1 = new Date($("#" + firstDateControlID).val());
            //var dt2 = new Date($("#" + secondDateControlID).val());
            var dateOne = new Date(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()); //Year, Month, Date
            var dateTwo = new Date(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()); //Year, Month, Date

            if (dateOne >= dateTwo) {

            } else {
                isallow = false;
            }
        }
    }
    return isallow;
}

function BindRelatedContractsPopup(contractid) {
    if (contractid == null || contractid == "") {
        contractid = vContractID;
    }
    $('#liSelected').empty();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/relatedcontracts?contractid=' + contractid,
        type: 'GET',
        dataType: 'json',
        headers: {
            'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID
        },
        cache: false,
        success: function (contactsJsonPayload) {
            OlRelatedContracts = contactsJsonPayload;
            var count = 0;
            $(contactsJsonPayload).each(function (i, item) {
                $("#hdnRelatedContracts").append(item.RelatedContractID + ';');
                if (item.Permission != "")
                    $('#liSelected').append('<span style="font-size:11px;" id=' + item.RelatedContractID + '>' + item.RelatedContractTitle + ' (' + item.RelatedRelationshipType + ') <img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveRelationship(this);" style="float:right" /></span>');
            });
        },
        error: function (request) {
        }
    });

}

function ViewCounterpartyRelated(obj) {
    var baname = "";
    //if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
    //    baname = localStorage.GlobalBusinessAreaLocation;
    //}


    if ($('#ddlRelationshipTypeCounterparties').hasClass('error')) {
        $('#ddlRelationshipTypeCounterparties').removeClass('error')
    }
    if ($('#ddlRelationshipTypeParentcounterparties').hasClass('error')) {
        $('#ddlRelationshipTypeParentcounterparties').removeClass('error')
    }
    vGlobalObjForGeneric = obj;
    $("#lblRelatedPopup_Counterparties").text("Select Relationship for " + $("#txtCounterpartyName").val())
    $("#loadingPage").fadeIn();
    $('#loadCounterparties').html('<img src="../Content/Images/icon/loading.gif"> Working on it...');
    $('#tblPopupCounterparties').empty();
    $("#txtAddSearchBoxCounterparties").val("");
    if ($('#tblPopupCounterparties tr').length <= 0) {
        var relatedCounterpartiesTag = [];
        $("#txtAddSearchBoxCounterparties").val("");
        var arrcounterpartyIDarry = [];
        var arrcounterpartyNamearry = [];
        var arrcounterpartyRelationshipTypearr = [];
        //manoj
        var strBusinessAreaOwnerof = "";
        if ($('input[type="radio"][name=IsGlobal]:checked').val() == "No") {
            if ($("#txtOwnerofBusinessArea").val() != "") {
                if ($("#txtOwnerofBusinessArea").val() != "") {
                    for (var i = 0; i < selectedBusinessAreaID11.length; i++) {

                        var rowKPath = jQuery.grep(BusinessAreaPathRowKey, function (a) {
                            return a[1] === selectedBusinessAreaID11[i][1];
                        });
                        if (rowKPath != null && typeof (rowKPath) != "undefined" && rowKPath.length != 0)
                            strBusinessAreaOwnerof += rowKPath[0][0] + "; ";
                    }

                    strBusinessAreaOwnerof = strBusinessAreaOwnerof.slice(0, -1)
                }
            } else {

                strBusinessAreaOwnerof = "";
            }
        }
        else {
            $("#txtOwnerofBusinessArea").val('');
            strBusinessAreaOwnerof = "";
        }
        //manoj

        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/relatedcounterpartypicker',
            type: 'GET',
            dataType: 'json',
            "Content-Type": "application/json",
            headers: {
                'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, BusinessAreaLocation: strBusinessAreaOwnerof
            },
            cache: false,
            success: function (data) {
                $('#loadCounterparties').empty();
                $('#tblPopupCounterparties').empty();
                $("#hdnRelatedCounterparties").append(getParameterByName("ContractID"))
                //manoj
                curRelatedCounterparities = PrvRelatedCounterparities.slice();
                //manoj
                arr = [];
                counterpartyTags = [];
                var prevSelected = $("#RelatedCounterparties").val();
                $.each(prevSelected.split(";"), function () {
                    arr.push($.trim(this));
                });
                var vCounterpartyList = '';
                $(data).each(function (i, item) {
                    if ($("#txtCounterpartyID").val().indexOf(item.RowKey) > -1) {
                    }
                    else {
                        if (arr.length > 0) {
                            if (arrRelatedCounterparities.length > 0) {
                                $.each(arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RelatedCounterpartyID.split(";"), function () {
                                    arrcounterpartyIDarry.push($.trim(this));
                                });
                                $.each(arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RelatedCounterpartyTitle.split(";"), function () {
                                    arrcounterpartyNamearry.push($.trim(this));
                                });
                                $.each(arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RelatedRelationshipType.split(";"), function () {
                                    arrcounterpartyRelationshipTypearr.push($.trim(this));
                                });
                                if (arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RootRelationshipType != "") {
                                    //manoj
                                    $("#ddlRelationshipTypeCounterparties option:selected").text(arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RootRelationshipType);
                                    //manoj
                                    //$("#ddlRelationshipTypeCounterparties").val(arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RootRelationshipType);
                                }
                                if (arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RelationshipType != "") {
                                    $("#ddlRelationshipTypeParentcounterparties").val(arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RelationshipType);
                                }
                            }
                        }

                        if (arr.indexOf(item.CounterpartyName.trim()) >= 0) {
                            var article = '<tr><td>';
                            article += '<input id="rel' + item.RowKey + '" type="checkbox" name="RelatedCounterparty" checked class="css1-checkbox" value="' + escape(item.CounterpartyName) + '" onchange="javascript:currentrelatedcounterparty(this);" />';
                            article += '<label for="' + item.RowKey + '" class="css1-label">' + item.CounterpartyName + '</label>';
                            article += '</td>';
                            article += '<td class="ddl"><select class="f_inpt width90">';
                            var jsLang = $("#ddlRelationshipTypeParentcounterparties option:selected").val();
                            switch (jsLang) {
                                case 'Parent':
                                    article += '<option value="Subsidiary" selected>Subsidiary</option>';
                                    break;
                                case 'Subsidiary':
                                    article += '<option value="Parent" selected>Parent</option>';
                                    break;
                                case 'Supplier':
                                    article += '<option value="Customer" selected>Customer</option>';
                                    break;
                                case 'Customer':
                                    article += '<option value="Supplier" selected>Supplier</option>';
                                    break;
                                case 'Prime Contractor':
                                    article += '<option value="Sub Contractor" selected>Sub Contractor</option>';
                                    break;
                                case 'Sub Contractor':
                                    article += '<option value="Prime Contractor" selected>Prime Contractor</option>';
                                    break;
                                case 'Dissolved on Merger':
                                    article += '<option value="Merged into" selected>Merged into</option>';
                                    break;
                                case 'Merged into':
                                    article += '<option value="Dissolved on Merger" selected>Dissolved on Merger</option>';
                                    break;
                                case 'Other':
                                    article += '<option value="Other" selected>Other</option>';
                                    break;
                            }
                            article += '</select><td></tr>'
                            //$("#tblPopupCounterparties").append(article);
                            vCounterpartyList += article;
                            relatedCounterpartiesTag.push(item.CounterpartyName);
                        } else {
                            var article = '<tr><td>';
                            article += '<input id="rel' + item.RowKey + '" type="checkbox" name="RelatedCounterparty" class="css1-checkbox" value="' + escape(item.CounterpartyName) + '"  onchange="javascript:currentrelatedcounterparty(this);" />';
                            article += '<label for="' + item.RowKey + '" class="css1-label">' + item.CounterpartyName + '</label>';
                            article += '</td>';
                            article += '<td class="ddl"><td></tr>'
                            //$("#tblPopupCounterparties").append(article);
                            vCounterpartyList += article;
                            relatedCounterpartiesTag.push(item.CounterpartyName);
                        }

                        //$("#rel" + item.RowKey).click(function () {
                        //$("input[id='rel" + item.RowKey + "'][name='RelatedCounterparty']:checkbox").click(function () {
                        //    if (this.checked) {
                        //        var vOptions = "<select class='f_inpt width90' onchange='showallspans(this)'>";
                        //        var jsLang = $("#ddlRelationshipTypeParentcounterparties option:selected").val();
                        //        switch (jsLang) {
                        //            case 'Parent':
                        //                vOptions += '<option value="Subsidiary">Subsidiary</option>';
                        //                break;
                        //            case 'Subsidiary':
                        //                vOptions += '<option value="Parent">Parent</option>';
                        //                break;
                        //            case 'Supplier':
                        //                vOptions += '<option value="Customer">Customer</option>';
                        //                break;
                        //            case 'Customer':
                        //                vOptions += '<option value="Supplier">Supplier</option>';
                        //                break;
                        //            case 'Prime Contractor':
                        //                vOptions += '<option value="Sub Contractor">Sub Contractor</option>';
                        //                break;
                        //            case 'Sub Contractor':
                        //                vOptions += '<option value="Prime Contractor">Prime Contractor</option>';
                        //                break;
                        //            case 'Dissolved on Merger':
                        //                vOptions += '<option value="Merged into">Merged into</option>';
                        //                break;
                        //            case 'Merged into':
                        //                vOptions += '<option value="Dissolved on Merger">Dissolved on Merger</option>';
                        //                break;
                        //            case 'Other':
                        //                vOptions += '<option value="Other">Other</option>';
                        //                break;
                        //        }

                        //        vOptions += '</select>';
                        //        $(this).parent().parent().children(".ddl").append(vOptions);

                        //    } else {
                        //        $(this).parent().parent().children(".ddl").empty();
                        //    }
                        //    showallspans(this);
                        //});
                    }
                });

                $("#tblPopupCounterparties").append(vCounterpartyList);
                $("input[id^='rel'][name='RelatedCounterparty']:checkbox").click(function () {
                    if (this.checked) {
                        var vOptions = "<select class='f_inpt width90' onchange='showallspans(this)'>";
                        var jsLang = $("#ddlRelationshipTypeParentcounterparties option:selected").val();
                        switch (jsLang) {
                            case 'Parent':
                                vOptions += '<option value="Subsidiary">Subsidiary</option>';
                                break;
                            case 'Subsidiary':
                                vOptions += '<option value="Parent">Parent</option>';
                                break;
                            case 'Supplier':
                                vOptions += '<option value="Customer">Customer</option>';
                                break;
                            case 'Customer':
                                vOptions += '<option value="Supplier">Supplier</option>';
                                break;
                            case 'Prime Contractor':
                                vOptions += '<option value="Sub Contractor">Sub Contractor</option>';
                                break;
                            case 'Sub Contractor':
                                vOptions += '<option value="Prime Contractor">Prime Contractor</option>';
                                break;
                            case 'Dissolved on Merger':
                                vOptions += '<option value="Merged into">Merged into</option>';
                                break;
                            case 'Merged into':
                                vOptions += '<option value="Dissolved on Merger">Dissolved on Merger</option>';
                                break;
                            case 'Other':
                                vOptions += '<option value="Other">Other</option>';
                                break;
                        }

                        vOptions += '</select>';
                        $(this).parent().parent().children(".ddl").append(vOptions);

                    } else {
                        $(this).parent().parent().children(".ddl").empty();
                    }
                    showallspans(this);
                });

                var vCount = $("#tblPopupCounterparties tr").length;
                if (vCount != 0) {
                    $('#compact-paginationRelatedCounterparties').pagination({
                        items: vCount,
                        itemsOnPage: 10,
                        currentPage: 1,
                        cssStyle: 'compact-theme',
                        type: 'tdbody',
                        row: 'tr',
                        typeID: 'tblPopupCounterparties'
                        //items: vCount,
                        //itemsOnPage: 10,
                        //typeID: 'tblPopupCounterparties',
                        //cssStyle: 'compact-theme'
                    });
                } else {
                    $('#loadCounterparties').html('<p style="margin-left: 20px;">No items found.</p>')
                }

                $("#txtAddSearchBoxCounterparties").autocomplete({
                    source: relatedCounterpartiesTag,
                    minLength: 2,
                    focus: function (event, ui) {
                        return false;
                    },
                    select: function (evn, uidetails) {
                        $("#txtAddSearchBoxCounterparties").val(uidetails.item.label);
                        ViewCounterparties();
                    }
                });
                addselectedcounterparties();
                $("#popupCounterparties").dialog("option", "title", "Related Counterparties");
                $("#popupCounterparties").dialog("open");
                $("#loadingPage").fadeOut();
            },
            error: function () {
                $('#loadMA').empty();
                $('#loadCounterparties').html('<p style="margin-left: 20px;">No items found.</p>');
                $('#tblPopupCounterparties').empty();
                addselectedcounterparties();
                $("#popupCounterparties").dialog("option", "title", "Related Counterparties");
                $("#popupCounterparties").dialog("open");
                $("#loadingPage").fadeOut();
            }
        });
    } else {
        $('#loadMA').empty();
        addselectedcounterparties();
        $("#popupCounterparties").dialog("option", "title", "Related Contract Records");
        $("#popupCounterparties").dialog("open");
        $("#loadingPage").fadeOut();
    }
}

function BindRelatedCounterpartiesPopup(counterpartyid) {
    if (arrRelatedCounterparities.length > 0) {
        $('#liSelectedCounterparties').empty();
        var counterpartyarrid = arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RelatedCounterpartyID.split(";");
        var counterpartyarrname = arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RelatedCounterpartyTitle.split(";");
        for (var arrcount = 0; arrcount < counterpartyarrid.length; arrcount++) {
            $('#liSelectedCounterparties').append('<span style="font-size:11px;" id=' + counterpartyarrid[arrcount] + '>' + counterpartyarrname[arrcount] + ' (' + arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RelationshipType + ') <img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveRelationshipcounterparty(this);" style="float:right" /></span>');
        }
    }
}


function RelatedCounterpartiesPush() {
    if (requiredValidator('popupCounterparties', false)) {
        var vRelatedCounterpartyID = "";
        var vRelatedCounterpartyTitle = "";
        var vChildRelation = "";
        //manoj
        $(curRelatedCounterparities).each(function (i, item) {
            if (item != null) {
                vRelatedCounterpartyID += ";" + item.RowKey;
                vRelatedCounterpartyTitle += ";" + item.CounterpartyName;
                vChildRelation += ";" + item.ChildRelationship;
            }
        });
        vRelatedCounterpartyID = (vRelatedCounterpartyID.charAt(0) === ';') ? vRelatedCounterpartyID.substr(1) : vRelatedCounterpartyID;
        vRelatedCounterpartyTitle = (vRelatedCounterpartyTitle.charAt(0) === ';') ? vRelatedCounterpartyTitle.substr(1) : vRelatedCounterpartyTitle;
        vChildRelation = (vChildRelation.charAt(0) === ';') ? vChildRelation.substr(1) : vChildRelation;
        //manoj
        //$('input:checkbox[name="RelatedCounterparty"]:checked').each(function () {
        //    if (vRelatedCounterpartyID == "") {
        //        vRelatedCounterpartyID = this.id.replace("rel", "").trim();
        //        vRelatedCounterpartyTitle = unescape(this.value);
        //        vChildRelation = $(this).parent().parent().children(".ddl").find('option:selected').text();

        //    }
        //    else {
        //        vRelatedCounterpartyID += "; " + this.id.replace("rel", "").trim();
        //        vRelatedCounterpartyTitle += "; " + unescape(this.value);
        //        vChildRelation += "; " + $(this).parent().parent().children(".ddl").find('option:selected').text();
        //    }
        //});
        if (vRelatedCounterpartyID != "") {
            arrRelatedCounterparities = [];
            arrRelatedCounterparities.push({
                CounterpartyID: $("#txtCounterpartyID").val(),
                CounterpartyTitle: $("#txtCounterpartyName").val(),
                RelatedCounterpartyID: vRelatedCounterpartyID,
                RelatedCounterpartyTitle: vRelatedCounterpartyTitle,
                RelationshipType: $("#ddlRelationshipTypeParentcounterparties").find('option:selected').text(),
                RelatedRelationshipType: vChildRelation,
                RootRelationshipType: $("#ddlRelationshipTypeCounterparties").find('option:selected').text(),
                CreatedBy: localStorage.UserName,
                ModifiedBy: localStorage.UserName,
            });
            PrvRelatedCounterparities = curRelatedCounterparities.slice();
            $("#popupCounterparties").dialog("close");
            $('#RelatedCounterparties').val(vRelatedCounterpartyTitle);
            return true;
        } else {
            PrvRelatedCounterparities = [];
            arrRelatedCounterparities = [];
            curRelatedCounterparities = [];
            $('#RelatedCounterparties').val("");
            swal("", "No Counterparty has been selected.");
            $("#popupCounterparties").dialog("close");
            return false;
        }
    }
}

function ViewCounterparties() {
    var baname = "";

    //if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
    //    baname = localStorage.GlobalBusinessAreaLocation;
    //}
    $("#tblPopupCounterparties").html('');
    if ($.trim($("#txtAddSearchBoxCounterparties").val()) != "") {
        $('#loadCounterparties').html('<img src="../Content/Images/icon/loading.gif"> Searching...');
    } else {
        $('#loadCounterparties').html('<img src="../Content/Images/icon/loading.gif">');
    }
    var arrcounterpartyIDarry = [];
    var arrcounterpartyNamearry = [];
    var arrcounterpartyRelationshipTypearr = [];
    var relatedCounterpartiesTag = [];
    //manoj
    var strBusinessAreaOwnerof = "";
    if ($('input[type="radio"][name=IsGlobal]:checked').val() == "No") {
        if ($("#txtOwnerofBusinessArea").val() != "") {
            if ($("#txtOwnerofBusinessArea").val() != "") {
                for (var i = 0; i < selectedBusinessAreaID11.length; i++) {

                    var rowKPath = jQuery.grep(BusinessAreaPathRowKey, function (a) {
                        return a[1] === selectedBusinessAreaID11[i][1];
                    });
                    if (rowKPath != null && typeof (rowKPath) != "undefined" && rowKPath.length != 0)
                        strBusinessAreaOwnerof += rowKPath[0][0] + "; ";
                }

                strBusinessAreaOwnerof = strBusinessAreaOwnerof.slice(0, -1)
            }
        } else {

            strBusinessAreaOwnerof = "";
        }
    }
    else {
        $("#txtOwnerofBusinessArea").val('');
        strBusinessAreaOwnerof = "";
    }
    //manoj

    var vURL = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/relatedcounterpartypicker?searchkeyword=' + encodeURIComponent($("#txtAddSearchBoxCounterparties").val()) + '&customquery=&sortbyfield=Timestamp&orderby=DESC';
    $.ajax({
        url: vURL,
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: {
            'eContracts-ApiKey': localStorage.APIKey, BusinessAreaLocation: strBusinessAreaOwnerof
        },
        cache: false,
        success: function (data) {
            $("#tblPopupCounterparties").html('');
            var datalenght = data.length;
            counterpartyTags = [];
            //var prevSelected = $("#RelatedCounterparties").val();
            //manoj
            var prevSelected = [];
            $.each(curRelatedCounterparities, function (ipvr, itempvr) {
                prevSelected.push($.trim(itempvr.CounterpartyName));
            });
            arr = prevSelected;
            //manoj
            //$.each(prevSelected, function () {
            //    arr.push($.trim(this));
            //});
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];
                if ($("#txtCounterpartyID").val().indexOf(item.RowKey) > -1) { }
                else {

                    //if (arr.length > 0) {
                    //    if (arrRelatedCounterparities.length > 0) {
                    //        $.each(arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RelatedCounterpartyID.split(";"), function () {
                    //            arrcounterpartyIDarry.push($.trim(this));
                    //        });
                    //        $.each(arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RelatedCounterpartyTitle.split(";"), function () {
                    //            arrcounterpartyNamearry.push($.trim(this));
                    //        });
                    //        $.each(arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RelatedRelationshipType.split(";"), function () {
                    //            arrcounterpartyRelationshipTypearr.push($.trim(this));
                    //        });
                    //        if (arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RootRelationshipType != "") {
                    //            $("#ddlRelationshipTypeCounterparties").val(arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RootRelationshipType);
                    //        }
                    //        if (arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RelationshipType != "") {
                    //            $("#ddlRelationshipTypeParentcounterparties").val(arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RelationshipType);
                    //        }
                    //    }
                    //}
                    if (arr.indexOf(item.CounterpartyName.trim()) >= 0) {
                        var article = '<tr><td>';
                        article += '<input id="rel' + item.RowKey + '" type="checkbox" name="RelatedCounterparty" checked class="css1-checkbox" value="' + escape(item.CounterpartyName) + '"  onchange="javascript:currentrelatedcounterparty(this);" />';
                        article += '<label for="' + item.RowKey + '" class="css1-label">' + item.CounterpartyName + '</label>';
                        article += '</td>';
                        article += '<td class="ddl"><select class="f_inpt width90">';
                        var jsLang = $("#ddlRelationshipTypeParentcounterparties option:selected").val();
                        switch (jsLang) {
                            case 'Parent':
                                article += '<option value="Subsidiary" selected>Subsidiary</option>';
                                break;
                            case 'Subsidiary':
                                article += '<option value="Parent" selected>Parent</option>';
                                break;
                            case 'Supplier':
                                article += '<option value="Customer" selected>Customer</option>';
                                break;
                            case 'Customer':
                                article += '<option value="Supplier" selected>Supplier</option>';
                                break;
                            case 'Prime Contractor':
                                article += '<option value="Sub Contractor" selected>Sub Contractor</option>';
                                break;
                            case 'Sub Contractor':
                                article += '<option value="Prime Contractor" selected>Prime Contractor</option>';
                                break;
                            case 'Dissolved on Merger':
                                article += '<option value="Merged into" selected>Merged into</option>';
                                break;
                            case 'Merged into':
                                article += '<option value="Dissolved on Merger" selected>Dissolved on Merger</option>';
                                break;
                            case 'Other':
                                article += '<option value="Other" selected>Other</option>';
                                break;
                        }
                        article += '</select><td></tr>'
                        $("#tblPopupCounterparties").append(article);
                        relatedCounterpartiesTag.push(item.CounterpartyName);
                    }
                    else {
                        var article = '<tr><td>';
                        article += '<input id="rel' + item.RowKey + '" type="checkbox" name="RelatedCounterparty" class="css1-checkbox" value="' + escape(item.CounterpartyName) + '"  onchange="javascript:currentrelatedcounterparty(this);" />';
                        article += '<label for="' + item.RowKey + '" class="css1-label">' + item.CounterpartyName + '</label>';
                        article += '</td>';
                        article += '<td class="ddl"><td></tr>'
                        $("#tblPopupCounterparties").append(article);
                    }

                    //$("#rel" + item.RowKey).click(function () {
                    $("input[id='rel" + item.RowKey + "'][name='RelatedCounterparty']:checkbox").click(function () {
                        if (this.checked) {
                            var vOptions = "<select class='f_inpt width90' onchange='showallspans(this)'>";
                            var jsLang = $("#ddlRelationshipTypeParentcounterparties option:selected").val();
                            switch (jsLang) {
                                case 'Parent':
                                    vOptions += '<option value="Subsidiary">Subsidiary</option>';
                                    break;
                                case 'Subsidiary':
                                    vOptions += '<option value="Parent">Parent</option>';
                                    break;
                                case 'Supplier':
                                    vOptions += '<option value="Customer">Customer</option>';
                                    break;
                                case 'Customer':
                                    vOptions += '<option value="Supplier">Supplier</option>';
                                    break;
                                case 'Prime Contractor':
                                    vOptions += '<option value="Sub Contractor">Sub Contractor</option>';
                                    break;
                                case 'Sub Contractor':
                                    vOptions += '<option value="Prime Contractor">Prime Contractor</option>';
                                    break;
                                case 'Dissolved on Merger':
                                    vOptions += '<option value="Merged into">Merged into</option>';
                                    break;
                                case 'Merged into':
                                    vOptions += '<option value="Dissolved on Merger">Dissolved on Merger</option>';
                                    break;
                                case 'Other':
                                    vOptions += '<option value="Other">Other</option>';
                                    break;
                            }

                            vOptions += '</select>';
                            $(this).parent().parent().children(".ddl").append(vOptions);

                        } else {

                            $(this).parent().parent().children(".ddl").empty();
                        }
                        showallspans(this);
                    });
                }
            }
            var vCount = $("#tblPopupCounterparties tr").length;
            if (vCount != 0) {
                $('#loadCounterparties').html('');
                $('#compact-paginationRelatedCounterparties').css('display', '');
                $('#compact-paginationRelatedCounterparties').pagination({
                    items: vCount,
                    itemsOnPage: 10,
                    currentPage: 1,
                    cssStyle: 'compact-theme',
                    type: 'tdbody',
                    row: 'tr',
                    typeID: 'tblPopupCounterparties'
                    //items: vCount,
                    //itemsOnPage: 10,
                    //typeID: 'tblPopupCounterparties',
                    //cssStyle: 'compact-theme'
                });
            } else {
                $('#loadCounterparties').html('<p style="margin-left: 20px;">No items found.</p>');
                $('#compact-paginationRelatedCounterparties').css('display', 'none');
            }
        },
        error: function () {
            $('#compact-paginationRelatedCounterparties').css('display', 'none');
            $('#loadCounterparties').html('<p style="margin-left: 20px;">No items found.</p>');
        }
    });
}

function CreateRelatedCounterparies(conterpartyid, counterpartyname) {
    //manoj
    //Remove "rel" in Counterparty ID
    var RelCountID = arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RelatedCounterpartyID;
    RelCountID = $.trim(RelCountID);
    var liRelCountID = "";
    $.each(RelCountID.split(";"), function (iRelCountID, itemnameRelCountID) {
        liRelCountID += ";" + itemnameRelCountID.replace("rel", "");
    });
    arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RelatedCounterpartyID = (liRelCountID.charAt(0) === ';') ? liRelCountID.substr(1) : liRelCountID;
    //Remove "rel" in Counterparty ID
    //manoj
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/' + conterpartyid.trim() + '/relatedcounterparties',
        type: 'POST',
        dataType: 'json',
        headers: {
            'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging
        },
        data: {
            CounterpartyID: conterpartyid,
            CounterpartyTitle: counterpartyname,
            RelatedCounterpartyID: arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RelatedCounterpartyID,
            RelatedCounterpartyTitle: arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RelatedCounterpartyTitle,
            RelationshipType: arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RelationshipType,
            RelatedRelationshipType: arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RelatedRelationshipType,
            RootRelationshipType: arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RootRelationshipType,
            CreatedBy: localStorage.UserName,
            ModifiedBy: localStorage.UserName,
        },
        cache: false,
        success: function (person) {
            PrvRelatedCounterparities = [];
            arrRelatedCounterparities = [];
            curRelatedCounterparities = [];
        },
        error: function (request) {
            PrvRelatedCounterparities = [];
            arrRelatedCounterparities = [];
            curRelatedCounterparities = [];
        }
    });
}

function liRemoveRelationshipcounterparty(obj) {
    var child = obj.parentNode;
    var relatedcounterpartyidtodelete = child.id;
    var relatedcounterpartyname = child.textContent;
    swal({
        title: '',
        text: "Are you sure to delete '<span style=\"font-weight:700\">" + relatedcounterpartyname + "</span>'?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        html: true
    },
     function (confirmed) {
         if (confirmed) {
             child.parentNode.removeChild(child);
             var relatedcounterpartyid = child.id;
             if ($("#txtCounterpartyID").val() != "") {
                 $.ajax({
                     url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/' + $("#txtCounterpartyID").val().trim() + '/relatedcounterparties?relatedcounterpartyid=' + relatedcounterpartyidtodelete,
                     type: 'DELETE',
                     dataType: 'json',
                     headers: {
                         'eContracts-ApiKey': localStorage.APIKey
                     },
                     cache: false,
                     success: function (data) {
                         document.getElementById("rel" + relatedcounterpartyidtodelete).disabled = false;
                         var relatedtextboxval = $("#RelatedCounterparties").val();
                         if (relatedcounterpartyname.indexOf('(') > -1) {
                             var nlst = relatedcounterpartyname.lastIndexOf("(");
                             relatedcounterpartyname = relatedcounterpartyname.substr(0, nlst);
                             relatedtextboxval = relatedtextboxval.replace(relatedcounterpartyname.trim(), "");
                             relatedtextboxval = relatedtextboxval.replace(";;", ";");
                             var n = relatedtextboxval.charAt(0);
                             if (n == ";") {
                                 relatedtextboxval = relatedtextboxval.substr(1, relatedtextboxval.length - 1);
                             }
                             n = relatedtextboxval.charAt(relatedtextboxval.length - 1);
                             if (n == ";") {
                                 relatedtextboxval = relatedtextboxval.substr(0, relatedtextboxval.length - 1);
                             }
                             if (relatedtextboxval != "") {
                                 $("#RelatedCounterparties").val(relatedtextboxval.trim());
                             }
                             else {
                                 $("#RelatedCounterparties").val(relatedtextboxval);
                             }
                         }
                     }
                 });
             }
             else {
                 document.getElementById("rel" + relatedcounterpartyidtodelete).disabled = false;
                 var relatedtextboxval = $("#RelatedCounterparties").val();
                 if (relatedcounterpartyname.indexOf('(') > -1) {
                     var nlst = relatedcounterpartyname.lastIndexOf("(");
                     relatedcounterpartyname = relatedcounterpartyname.substr(0, nlst);
                     relatedtextboxval = relatedtextboxval.replace(relatedcounterpartyname.trim(), "");
                     relatedtextboxval = relatedtextboxval.replace(";;", ";");
                     var n = relatedtextboxval.charAt(0);
                     if (n == ";") {
                         relatedtextboxval = relatedtextboxval.substr(1, relatedtextboxval.length - 1);
                     }
                     n = relatedtextboxval.charAt(relatedtextboxval.length - 1);
                     if (n == ";") {
                         relatedtextboxval = relatedtextboxval.substr(0, relatedtextboxval.length - 1);
                     }
                     if (relatedtextboxval != "") {
                         $("#RelatedCounterparties").val(relatedtextboxval.trim());
                     }
                     else {
                         $("#RelatedCounterparties").val(relatedtextboxval);
                     }
                 }
             }
         }
         return;
     });
}

$("#ddlRelationshipTypeCounterparties").change(function () {
    $("#ddlRelationshipTypeParentcounterparties").empty();

    var jsLang = this.value;
    switch (jsLang) {
        case 'Parent':
            $("#ddlRelationshipTypeParentcounterparties").append("<option value='Parent'>Parent</option>");
            $("#ddlRelationshipTypeParentcounterparties").append("<option value='Subsidiary'>Subsidiary</option>");
            break;
        case 'Supplier':
            $("#ddlRelationshipTypeParentcounterparties").append("<option value='Supplier'>Supplier</option>");
            $("#ddlRelationshipTypeParentcounterparties").append("<option value='Customer'>Customer</option>");
            break;
        case 'Prime Contractor':
            $("#ddlRelationshipTypeParentcounterparties").append("<option value='Prime Contractor'>Prime Contractor</option>");
            $("#ddlRelationshipTypeParentcounterparties").append("<option value='Sub Contractor'>Sub Contractor</option>");
            break;
        case 'Dissolved on Merger':
            $("#ddlRelationshipTypeParentcounterparties").append("<option value='Dissolved on Merger'>Dissolved on Merger</option>");
            $("#ddlRelationshipTypeParentcounterparties").append("<option value='Merged into'>Merged into</option>");
            break;
        case 'Other':
            $("#ddlRelationshipTypeParentcounterparties").append("<option value='Other'>Other</option>");
            break;
    }
    var Action = 0;
    $('input:checkbox[name="RelatedCounterparty"]:checked').each(function () {
        $(this).parent().parent().children(".ddl").empty();
        var vOptions = "<select class='f_inpt width90' onchange='showallspans(this)'>";
        var jsLang = $("#ddlRelationshipTypeParentcounterparties option:selected").val();
        switch (jsLang) {
            case 'Parent':
                vOptions += '<option value="Subsidiary">Subsidiary</option>';
                break;
            case 'Subsidiary':
                vOptions += '<option value="Parent">Parent</option>';
                break;
            case 'Supplier':
                vOptions += '<option value="Customer">Customer</option>';
                break;
            case 'Customer':
                vOptions += '<option value="Supplier">Supplier</option>';
                break;
            case 'Prime Contractor':
                vOptions += '<option value="Sub Contractor">Sub Contractor</option>';
                break;
            case 'Sub Contractor':
                vOptions += '<option value="Prime Contractor">Prime Contractor</option>';
                break;
            case 'Dissolved on Merger':
                vOptions += '<option value="Merged into">Merged into</option>';
                break;
            case 'Merged into':
                vOptions += '<option value="Dissolved on Merger">Dissolved on Merger</option>';
                break;
            case 'Other':
                vOptions += '<option value="Other">Other</option>';
                break;
        }

        vOptions += '</select>';
        $(this).parent().parent().children(".ddl").append(vOptions);
        if (Action == 0) {
            changecounterpartychildrelationship($(this).parent().parent().children(".ddl").find('option:selected').text());
            Action = 1;
        }
    });
});

$("#ddlRelationshipTypeParentcounterparties").change(function () {
    var Action = 0;
    $('input:checkbox[name="RelatedCounterparty"]:checked').each(function () {
        $(this).parent().parent().children(".ddl").empty();
        var vOptions = "<select class='f_inpt width90' onchange='showallspans(this)'>";
        var jsLang = $("#ddlRelationshipTypeParentcounterparties option:selected").val();
        switch (jsLang) {
            case 'Parent':
                vOptions += '<option value="Subsidiary">Subsidiary</option>';
                break;
            case 'Subsidiary':
                vOptions += '<option value="Parent">Parent</option>';
                break;
            case 'Supplier':
                vOptions += '<option value="Customer">Customer</option>';
                break;
            case 'Customer':
                vOptions += '<option value="Supplier">Supplier</option>';
                break;
            case 'Prime Contractor':
                vOptions += '<option value="Sub Contractor">Sub Contractor</option>';
                break;
            case 'Sub Contractor':
                vOptions += '<option value="Prime Contractor">Prime Contractor</option>';
                break;
            case 'Dissolved on Merger':
                vOptions += '<option value="Merged into">Merged into</option>';
                break;
            case 'Merged into':
                vOptions += '<option value="Dissolved on Merger">Dissolved on Merger</option>';
                break;
            case 'Other':
                vOptions += '<option value="Other">Other</option>';
                break;
        }

        vOptions += '</select>';
        $(this).parent().parent().children(".ddl").append(vOptions);
        if (Action == 0) {
            changecounterpartychildrelationship($(this).parent().parent().children(".ddl").find('option:selected').text());
            Action = 1;
        }
    });
});

function getcompanyprofileforlegalentity() {
    $("#tblOPLegalEntities").empty();
    var applydefault = false;
    $("#tblOPLegalEntities").empty();
    var legalentity = $("#CompanyProfile").find('option:selected').text();
    if (typeof legalentity != 'undefined' && typeof legalentity != "") {
        if (legalentity != "--Select--") {
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/legalentities',
                type: 'GET',
                dataType: 'json',
                "Content-Type": "application/json",
                headers: {
                    'eContracts-ApiKey': localStorage.APIKey
                },
                cache: false,
                async: false,
                success: function (data) {
                    $.each(legalentity.split(";"), function (i, itemname) {
                        $(data).each(function (i, item) {
                            if (itemname == item.LegalEntityName) {
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
                        });
                    });
                }
            });
        }
        else {
            applydefault = true;
        }
    }
    else {
        applydefault = true;
    }

    if (applydefault) {
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/legalentities',
            type: 'GET',
            dataType: 'json',
            "Content-Type": "application/json",
            headers: {
                'eContracts-ApiKey': localStorage.APIKey
            },
            cache: false,
            async: false,
            success: function (data) {
                $(data).each(function (i, item) {
                    if (thisContractAreaSettings.LegalEntity == item.LegalEntityName) {
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
                });
            }
        });
    }
    applydefault = false;
}

function Removetextvalues() {
    $("#OriginatingParty").val("");
    var FinalProfileValue = '';
    var ContractNumberGeneration = $('#txtContractNumber').val();
    if (thisContractAreaSettings.ContractNumbering != "Manual" && typeof ContractNumberGeneration != "undefined" && ContractNumberGeneration != null && ContractNumberGeneration != "") {
        if (typeof ContractNumberFinalFormat != "undefined" && ContractNumberFinalFormat != null) {
            //  var legalentitytextboxvalue = $("#CompanyProfile").find('option:selected').text()
            var legalentitytextboxvalue = $("#CompanyProfile").val();
            if (typeof thisLegalEntity != 'undefined' && thisLegalEntity != "" && typeof legalentitytextboxvalue != 'undefined' && legalentitytextboxvalue != "" && legalentitytextboxvalue != "--Select--") {
                if (legalentitytextboxvalue != thisLegalEntity || ((typeof PreviousLegalEntity != 'undefined' && PreviousLegalEntity != null && PreviousLegalEntity != "") ? (PreviousLegalEntity != legalentitytextboxvalue) : false)) {
                    var gotfinalvalue = "";
                    PreviousLegalEntity = "";
                    for (keyvalue in ContractNumberFinalFormat) {
                        if (keyvalue.indexOf('Auto Increment Number') > -1) {
                            if (PrvAutoinceramentNumberforValidate != null && PrvAutoinceramentNumberforValidate != "") {
                                if (PrvAutoinceramentNumberforValidate.indexOf("_Duplicate") > -1) {
                                    duplicatecontractchecking = (duplicatecontractchecking != "") ? duplicatecontractchecking : PrvAutoinceramentNumberforValidate;
                                    PrvAutoinceramentNumberforValidate = PrvAutoinceramentNumberforValidate.replace(/_Duplicate/g, "");
                                    ContractNumberFinalFormat[keyvalue] = PrvAutoinceramentNumberforValidate;
                                } else {
                                    ContractNumberFinalFormat[keyvalue] = PrvAutoinceramentNumberforValidate;
                                }
                            }
                            AutoinceramentNumberforValidate = ContractNumberFinalFormat[keyvalue]
                        } else if (keyvalue.indexOf('Legal Entity Name') > -1) {
                            //var vAccFeatdetails = $.grep(LeagalEntity, function (n, i) {
                            //    return (n.LegalEntityName == $("#CompanyProfile").find('option:selected').text());
                            //});
                            //if (vAccFeatdetails.length > 0) {
                            //    ContractNumberFinalFormat[keyvalue] = vAccFeatdetails[0].Abbreviation;
                            //}

                            if ($("#CompanyProfile").val().indexOf(';') > -1) {
                                var profiles = $("#CompanyProfile").val().replace("; ", ";");
                                aryProfiles = profiles.split(';');
                                $(aryProfiles).each(function (i, profile) {
                                    var vAccFeatdetails = $.grep(LeagalEntity, function (n, i) {
                                        // return (n.LegalEntityName == $("#CompanyProfile").find('option:selected').text());
                                        return (n.LegalEntityName == profile.trim());
                                    });

                                    if (vAccFeatdetails.length > 0) {
                                        if (globalseparator == "")
                                            globalseparator = "/";
                                        if (FinalProfileValue == '')
                                            FinalProfileValue = vAccFeatdetails[0].Abbreviation;
                                        else
                                            FinalProfileValue = FinalProfileValue + globalseparator + vAccFeatdetails[0].Abbreviation;
                                    }
                                });

                            }
                            else {
                                var vAccFeatdetails = $.grep(LeagalEntity, function (n, i) {
                                    // return (n.LegalEntityName == $("#CompanyProfile").find('option:selected').text());
                                    return (n.LegalEntityName == $("#CompanyProfile").val().trim());
                                });
                                if (vAccFeatdetails.length > 0) {
                                    FinalProfileValue = vAccFeatdetails[0].Abbreviation;
                                }
                            }

                            ContractNumberFinalFormat[keyvalue] = FinalProfileValue;



                        }
                        var valuevalue = ContractNumberFinalFormat[keyvalue];
                        gotfinalvalue += valuevalue;
                    }
                    AutoinceramentNumberforValidate = (typeof AutoinceramentNumberforValidate != 'undefined' && AutoinceramentNumberforValidate != null && AutoinceramentNumberforValidate != "") ? AutoinceramentNumberforValidate : "";
                    if (duplicatecontractchecking != "") {
                        var rescount = duplicatecontractchecking.match(/_Duplicate/g);
                        for (resc = 0; resc < rescount.length; resc++) {
                            AutoinceramentNumberforValidate += "_Duplicate";
                            gotfinalvalue += "_Duplicate";
                        }
                    }
                    $('#txtContractNumber').val(gotfinalvalue);
                    $('#hdContractNumber').val(gotfinalvalue);
                } else {
                    var gotfinalvalue = "";
                    for (keyvalue in ContractNumberFinalFormat) {
                        if (keyvalue.indexOf('Auto Increment Number') > -1) {
                            if (PrvAutoinceramentNumberforValidate != null && PrvAutoinceramentNumberforValidate != "") {
                                if (PrvAutoinceramentNumberforValidate.indexOf("_Duplicate") > -1) {
                                    duplicatecontractchecking = (duplicatecontractchecking != "") ? duplicatecontractchecking : PrvAutoinceramentNumberforValidate;
                                    PrvAutoinceramentNumberforValidate = PrvAutoinceramentNumberforValidate.replace(/_Duplicate/g, "");
                                    ContractNumberFinalFormat[keyvalue] = PrvAutoinceramentNumberforValidate;
                                } else {
                                    ContractNumberFinalFormat[keyvalue] = PrvAutoinceramentNumberforValidate;
                                }
                            }
                            AutoinceramentNumberforValidate = ContractNumberFinalFormat[keyvalue]
                        }
                        var valuevalue = ContractNumberFinalFormat[keyvalue];
                        gotfinalvalue += valuevalue;
                    }
                    AutoinceramentNumberforValidate = (typeof AutoinceramentNumberforValidate != 'undefined' && AutoinceramentNumberforValidate != null && AutoinceramentNumberforValidate != "") ? AutoinceramentNumberforValidate : "";
                    if (duplicatecontractchecking != "") {
                        var rescount = duplicatecontractchecking.match(/_Duplicate/g);
                        for (resc = 0; resc < rescount.length; resc++) {
                            AutoinceramentNumberforValidate += "_Duplicate";
                            gotfinalvalue += "_Duplicate";
                        }
                    }
                    $('#txtContractNumber').val(gotfinalvalue);
                    $('#hdContractNumber').val(gotfinalvalue);
                }
            } else {
                var gotfinalvalue = "";
                for (keyvalue in ContractNumberFinalFormat) {
                    if (keyvalue.indexOf('Auto Increment Number') > -1) {
                        if (PrvAutoinceramentNumberforValidate != null && PrvAutoinceramentNumberforValidate != "") {
                            if (PrvAutoinceramentNumberforValidate.indexOf("_Duplicate") > -1) {
                                duplicatecontractchecking = (duplicatecontractchecking != "") ? duplicatecontractchecking : PrvAutoinceramentNumberforValidate;
                                PrvAutoinceramentNumberforValidate = PrvAutoinceramentNumberforValidate.replace(/_Duplicate/g, "");
                                ContractNumberFinalFormat[keyvalue] = PrvAutoinceramentNumberforValidate;
                            } else {
                                ContractNumberFinalFormat[keyvalue] = PrvAutoinceramentNumberforValidate;
                            }
                        }
                        AutoinceramentNumberforValidate = ContractNumberFinalFormat[keyvalue]
                    }
                    var valuevalue = ContractNumberFinalFormat[keyvalue];
                    gotfinalvalue += valuevalue;
                }
                AutoinceramentNumberforValidate = (typeof AutoinceramentNumberforValidate != 'undefined' && AutoinceramentNumberforValidate != null && AutoinceramentNumberforValidate != "") ? AutoinceramentNumberforValidate : "";
                if (duplicatecontractchecking != "") {
                    var rescount = duplicatecontractchecking.match(/_Duplicate/g);
                    for (resc = 0; resc < rescount.length; resc++) {
                        AutoinceramentNumberforValidate += "_Duplicate";
                        gotfinalvalue += "_Duplicate";
                    }
                }
                $('#txtContractNumber').val(gotfinalvalue);
                $('#hdContractNumber').val(gotfinalvalue);
            }
        } else {
            GenerateContactNumber();
        }
    }
}

function ChangeCreateContract(type) {
    var vConStatus = '';
    var vCreateContMsgText = '';
    if (type == "Final") {
        contractshow = 1;
        StatusToAdd = "Signed";
        $("#pageTitle").html('Add Contract Record (Finalized/Ready for Signature)');
        vConStatus += '<option value="Ready for Signature">Ready for Signature</option>';
        vConStatus += '<option value="Signed">Signed</option>';
        vConStatus += '<option value="Awaiting Signatures">Awaiting Signatures</option>';
        vConStatus += '<option value="Active">Active</option>';
        vConStatus += '<option value="Expired">Expired</option>';

        vCreateContMsgText = 'This Contract Record will be added as a Finalized/Ready for Signature Contract Record.';
        var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
        var vAccFeat = $.grep(veContractFeatures, function (n, i) {
            return (n.RowKey == "16" && n.Status == "ON");
        });
        if (vAccFeat.length > 0) {
            vCreateContMsgText += ' If it\'s a New/Work in Progress Contract Record, <a href="javascript:void(0);" onclick="ChangeCreateContract(\'Pipeline\');">create in Pipeline</a>';
        }
        contractFinalized = true; //eO39990
    }
    else {
        contractshow = 0;
        StatusToAdd = "New";
        $("#pageTitle").html('Create New Contract Record (In Pipeline)');
        vConStatus += '<option value="New">New</option>';
        vConStatus += '<option value="Approved">Approved</option>';
        vConStatus += '<option value="In Negotiation">In Negotiation</option>';
        vConStatus += '<option value="Negotiation Complete">Negotiation Complete</option>';
        vCreateContMsgText = 'This Contract Record will be added as a New/Work in Progress Contract Record to the Pipeline. If it\'s a Finalized/Ready for Signature Contract Record, <a href="javascript:void(0);" onclick="ChangeCreateContract(\'Final\');">add as Finalized/Ready for Signature.</a>';

        contractFinalized = false; //eO39990
    }
    $("#dvCreateContMsgText").html(vCreateContMsgText);
    $("#ddlContractStatus").html(vConStatus);
    //manoj
    $('#ddlContractTypes').trigger("change");
    //manoj
}

function showallspans(obj) {
    if (obj == "") {
        var reltypeselected = $("#ddlRelationshipType").find('option:selected').val();
        if (reltypeselected != 0 && $(this).parent().parent().children(".ddl").find('option:selected').text() != "") {
            $('#liSelectedRelatedContract').empty();
            $('input:checkbox[name="RelatedContract"]:checked').each(function () {
                $('#liSelectedRelatedContract').append('<span style="font-size:11px;" id=' + this.id + '>' + this.value + ' (' + $(this).parent().parent().children(".ddl").find('option:selected').text() + ') <img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveRelationshipselected(this);" style="float:right" /></span>');

                if (arrRelatedContracts.length > 0) {
                    var rtypeindex = arrRelatedContracts[arrRelatedContracts.length - 1].RelatedContractID.split(";").indexOf(this.id);
                    var rtypetoremove = arrRelatedContracts[arrRelatedContracts.length - 1].RelatedRelationshipType.split(";");
                    var reltypetoremove = arrRelatedContracts[arrRelatedContracts.length - 1].RelationshipType.split(";");
                    rtypetoremove[rtypeindex] = $(this).parent().parent().children(".ddl").find('option:selected').text();
                    reltypetoremove[rtypeindex] = $("#ddlRelationshipTypeParent").find('option:selected').text();
                    arrRelatedContracts[arrRelatedContracts.length - 1].RelatedRelationshipType = rtypetoremove.join(";");
                    arrRelatedContracts[arrRelatedContracts.length - 1].RelationshipType = reltypetoremove.join(";");
                }
            });
            //if (arrRelatedContracts.length > 0) {
            //    var curRelatedContracts = $("#RelatedContracts").val().replace(/; /g, ";");
            //    if (curRelatedContracts.indexOf(arrRelatedContracts[arrRelatedContracts.length - 1].RelatedContractTitle) < 0) {
            //        curRelatedContracts += arrRelatedContracts[arrRelatedContracts.length - 1].RelatedContractTitle;
            //        $("#RelatedContracts").val(curRelatedContracts);
            //    }
            //}
        }
        //else {
        //    if (arrRelatedContracts.length > 0) {
        //        var curRelatedContracts = $("#RelatedContracts").val().replace(/; /g, ";");
        //        curRelatedContracts = curRelatedContracts.replace(arrRelatedContracts[arrRelatedContracts.length - 1].RelatedContractTitle, "");
        //        $("#RelatedContracts").val(curRelatedContracts);
        //    }
        //}


    }
    else {
        var spanid = $(obj).parent().parent().children().find("input[type=checkbox]")[0].id;
        if (spanid != "") {
            $("#liSelectedRelatedContract #" + spanid).remove();
            var chkObj = $("#" + spanid)[0];
            if ($(chkObj).parent().parent().children(".ddl").find('option:selected').text() != "") {
                $('#liSelectedRelatedContract').append('<span style="font-size:11px;" id=' + chkObj.id + '>' + chkObj.value + ' (' + $(chkObj).parent().parent().children(".ddl").find('option:selected').text() + ') <img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveRelationshipselected(this);" style="float:right" /></span>');
            }

            if (arrRelatedContracts.length > 0) {
                var rtypeindex = arrRelatedContracts[arrRelatedContracts.length - 1].RelatedContractID.split(";").indexOf(chkObj.id);
                var rtypetoremove = arrRelatedContracts[arrRelatedContracts.length - 1].RelatedRelationshipType.split(";");
                var reltypetoremove = arrRelatedContracts[arrRelatedContracts.length - 1].RelationshipType.split(";");
                rtypetoremove[rtypeindex] = $(chkObj).parent().parent().children(".ddl").find('option:selected').text();
                reltypetoremove[rtypeindex] = $("#ddlRelationshipTypeParent").find('option:selected').text();
                arrRelatedContracts[arrRelatedContracts.length - 1].RelatedRelationshipType = rtypetoremove.join(";");
                arrRelatedContracts[arrRelatedContracts.length - 1].RelationshipType = reltypetoremove.join(";");
            }
        }
    }

}

function collectrelatedcontractrowkey(obj) {
    if (requiredValidator('popupContracts', false)) {
        if ($(obj).parent().parent().children().eq(4).text() == "Expired" && obj != "" && obj.checked == true) {

            swal({
                title: '',
                text: "This Contract has been Expired. Do you want to relate this contract?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                html: true
            },
                    function (confirmed) {
                        if (confirmed) {

                            //$('#liSelectedRelatedContract').empty();
                            //$('input:checkbox[name="RelatedContract"]:checked').each(function () {
                            //Remove Selected ContractID 
                            if (arrRelatedcontractRowkey.length > 0) {
                                arrRelatedcontractRowkey = $.grep(arrRelatedcontractRowkey, function (n) {
                                    return n.trim() != obj.id;
                                });
                            }
                            //Remove Selected ContractID
                            if (obj != "" && obj.checked == true) {
                                //manoj
                                $("#liSelectedRelatedContract #" + obj.id).remove();
                                //manoj
                                //$("#" + obj.id).trigger("click");
                                $('#liSelectedRelatedContract').append('<span style="font-size:11px;" id=' + obj.id + '>' + obj.value + ' (' + $(obj).parent().parent().children(".ddl").find('option:selected').text() + ') <img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveRelationshipselected(this);" style="float:right" /></span>');
                                arrRelatedcontractRowkey.push(obj.id);
                            }
                            //});
                            //arrRelatedcontractRowkey = [];
                            //$('input:checkbox[name="RelatedContract"]:checked').each(function () {
                            //    arrRelatedcontractRowkey.push(this.id);
                            //});
                            if ($('input:checkbox[name="RelatedContract"]:checked').length > 0) {
                                $("#relatedrole").show();
                            } else {
                                $("#relatedrole").hide();
                            }
                            var selectedrelatedvalues = [];
                            $.each($('#RelatedContracts').val().split(";"), function () {
                                if (this != "") {
                                    if ($.trim(this) != "") {
                                        selectedrelatedvalues.push($.trim(this));
                                    }
                                }
                            });
                            if (obj != "" && obj.checked == true) {
                                selectedrelatedvalues.push($.trim(obj.value));
                                curselectedContracts.push($.trim(obj.value));
                            }

                            $('input:checkbox[name="RelatedContract"]:not(:checked)').each(function () {
                                var notchkval = this.value;
                                var selvalues = $.grep(selectedrelatedvalues, function (n) {
                                    return n.trim() == notchkval.trim();
                                });
                                for (var i = selvalues.length - 1; i >= 0; i--) {
                                    if (selectedrelatedvalues.indexOf(this.value.trim()) > -1) {
                                        selectedrelatedvalues.splice(selectedrelatedvalues.indexOf(this.value.trim()), 1);
                                    }
                                }
                            });
                            if (selectedrelatedvalues.length > 0) {
                                $("#RelatedContracts").val(selectedrelatedvalues.join("; "));
                            }
                            else {
                                $("#RelatedContracts").val("");
                            }
                            if (obj != "" && obj.checked == true) {
                                if (arrRelatedContracts.length > 0) {
                                    arrRelatedContracts[arrRelatedContracts.length - 1].RelatedContractID += ";" + obj.id;
                                    arrRelatedContracts[arrRelatedContracts.length - 1].RelatedContractTitle += ";" + obj.value;
                                    arrRelatedContracts[arrRelatedContracts.length - 1].RelatedStatus += ";" + $(obj).parent().parent().children().eq(4).text();
                                    arrRelatedContracts[arrRelatedContracts.length - 1].RelatedRelationshipType += ";" + $(obj).parent().parent().children(".ddl").find('option:selected').text();
                                    arrRelatedContracts[arrRelatedContracts.length - 1].RelationshipType += ";" + $("#ddlRelationshipTypeParent").find('option:selected').text();
                                }
                                else {
                                    arrRelatedContracts.push({
                                        ContractID: "",
                                        ContractTitle: "",
                                        RelatedContractID: obj.id,
                                        RelatedContractTitle: obj.value,
                                        RelatedStatus: $(obj).parent().parent().children().eq(4).text(),
                                        RelationshipType: $("#ddlRelationshipTypeParent").find('option:selected').text(),
                                        RelatedRelationshipType: $(obj).parent().parent().children(".ddl").find('option:selected').text(),
                                        CreatedBy: localStorage.UserName,
                                        ModifiedBy: localStorage.UserName
                                    });
                                }
                            }
                            else if (obj != "" && obj.checked == false) {
                                var rtypeindex = arrRelatedContracts[arrRelatedContracts.length - 1].RelatedContractID.split(";").indexOf(obj.id);
                                var rtindex = arrRelatedContracts[arrRelatedContracts.length - 1].RelatedContractID.split(";");
                                var rtitle = arrRelatedContracts[arrRelatedContracts.length - 1].RelatedContractTitle.split(";");
                                var rstatus = arrRelatedContracts[arrRelatedContracts.length - 1].RelatedStatus.split(";");
                                var rtypetoremove = arrRelatedContracts[arrRelatedContracts.length - 1].RelatedRelationshipType.split(";");
                                var reltypetoremove = arrRelatedContracts[arrRelatedContracts.length - 1].RelationshipType.split(";");
                                rtindex.splice(rtypeindex, 1);
                                rtitle.splice(rtypeindex, 1);
                                rtypetoremove.splice(rtypeindex, 1);
                                reltypetoremove.splice(rtypeindex, 1);
                                rstatus.splice(rtypeindex, 1);
                                arrRelatedContracts[arrRelatedContracts.length - 1].RelatedContractID = rtindex.join(";").replace(";;", "");
                                arrRelatedContracts[arrRelatedContracts.length - 1].RelatedContractTitle = rtitle.join(";").replace(";;", "");
                                arrRelatedContracts[arrRelatedContracts.length - 1].RelatedRelationshipType = rtypetoremove.join(";").replace(";;", "");
                                arrRelatedContracts[arrRelatedContracts.length - 1].RelationshipType = reltypetoremove.join(";").replace(";;", "");
                                arrRelatedContracts[arrRelatedContracts.length - 1].RelatedStatus = rstatus.join(";").replace(";;", "");
                                $("#liSelectedRelatedContract").find('span#' + obj.id).remove();
                            }

                            RelatedContractRelationShipTypeparent = $("#ddlRelationshipTypeParent option:selected").val();

                        }
                        else {
                            $("#" + obj.id).prop('checked', false);
                            $("#" + obj.id).parent().parent().children(".ddl").empty();
                            $("#liSelectedRelatedContract").find('span#' + obj.id).remove();
                        }
                    }
            );
        }
        else {

            //$('#liSelectedRelatedContract').empty();
            //$('input:checkbox[name="RelatedContract"]:checked').each(function () {
            //Remove Selected ContractID 
            if (arrRelatedcontractRowkey.length > 0) {
                arrRelatedcontractRowkey = $.grep(arrRelatedcontractRowkey, function (n) {
                    return n.trim() != obj.id;
                });
            }
            //Remove Selected ContractID
            if (obj != "" && obj.checked == true) {
                //manoj
                $("#liSelectedRelatedContract #" + obj.id).remove();
                //manoj
                //$("#" + obj.id).trigger("click");
                $('#liSelectedRelatedContract').append('<span style="font-size:11px;" id=' + obj.id + '>' + obj.value + ' (' + $(obj).parent().parent().children(".ddl").find('option:selected').text() + ') <img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveRelationshipselected(this);" style="float:right" /></span>');
                arrRelatedcontractRowkey.push(obj.id);
            }
            //});
            //arrRelatedcontractRowkey = [];
            //$('input:checkbox[name="RelatedContract"]:checked').each(function () {
            //    arrRelatedcontractRowkey.push(this.id);
            //});
            if ($('input:checkbox[name="RelatedContract"]:checked').length > 0) {
                $("#relatedrole").show();
            } else {
                $("#relatedrole").hide();
            }
            var selectedrelatedvalues = [];
            $.each($('#RelatedContracts').val().split(";"), function () {
                if (this != "") {
                    if ($.trim(this) != "") {
                        selectedrelatedvalues.push($.trim(this));
                    }
                }
            });
            if (obj != "" && obj.checked == true) {
                selectedrelatedvalues.push($.trim(obj.value));
                curselectedContracts.push($.trim(obj.value));
            }

            $('input:checkbox[name="RelatedContract"]:not(:checked)').each(function () {
                var notchkval = this.value;
                var selvalues = $.grep(selectedrelatedvalues, function (n) {
                    return n.trim() == notchkval.trim();
                });
                for (var i = selvalues.length - 1; i >= 0; i--) {
                    if (selectedrelatedvalues.indexOf(this.value.trim()) > -1) {
                        selectedrelatedvalues.splice(selectedrelatedvalues.indexOf(this.value.trim()), 1);
                    }
                }
            });
            if (selectedrelatedvalues.length > 0) {
                $("#RelatedContracts").val(selectedrelatedvalues.join("; "));
            }
            else {
                $("#RelatedContracts").val("");
            }
            if (obj != "" && obj.checked == true) {
                if (arrRelatedContracts.length > 0) {
                    arrRelatedContracts[arrRelatedContracts.length - 1].RelatedContractID += ";" + obj.id;
                    arrRelatedContracts[arrRelatedContracts.length - 1].RelatedContractTitle += ";" + obj.value;
                    arrRelatedContracts[arrRelatedContracts.length - 1].RelatedStatus += ";" + $(obj).parent().parent().children().eq(4).text();
                    arrRelatedContracts[arrRelatedContracts.length - 1].RelatedRelationshipType += ";" + $(obj).parent().parent().children(".ddl").find('option:selected').text();
                    arrRelatedContracts[arrRelatedContracts.length - 1].RelationshipType += ";" + $("#ddlRelationshipTypeParent").find('option:selected').text();
                }
                else {
                    arrRelatedContracts.push({
                        ContractID: "",
                        ContractTitle: "",
                        RelatedContractID: obj.id,
                        RelatedContractTitle: obj.value,
                        RelatedStatus: $(obj).parent().parent().children().eq(4).text(),
                        RelationshipType: $("#ddlRelationshipTypeParent").find('option:selected').text(),
                        RelatedRelationshipType: $(obj).parent().parent().children(".ddl").find('option:selected').text(),
                        CreatedBy: localStorage.UserName,
                        ModifiedBy: localStorage.UserName
                    });
                }
            }
            else if (obj != "" && obj.checked == false) {
                var rtypeindex = arrRelatedContracts[arrRelatedContracts.length - 1].RelatedContractID.split(";").indexOf(obj.id);
                var rtindex = arrRelatedContracts[arrRelatedContracts.length - 1].RelatedContractID.split(";");
                var rtitle = arrRelatedContracts[arrRelatedContracts.length - 1].RelatedContractTitle.split(";");
                var rstatus = arrRelatedContracts[arrRelatedContracts.length - 1].RelatedStatus.split(";");
                var rtypetoremove = arrRelatedContracts[arrRelatedContracts.length - 1].RelatedRelationshipType.split(";");
                var reltypetoremove = arrRelatedContracts[arrRelatedContracts.length - 1].RelationshipType.split(";");
                rtindex.splice(rtypeindex, 1);
                rtitle.splice(rtypeindex, 1);
                rtypetoremove.splice(rtypeindex, 1);
                reltypetoremove.splice(rtypeindex, 1);
                rstatus.splice(rtypeindex, 1);
                arrRelatedContracts[arrRelatedContracts.length - 1].RelatedContractID = rtindex.join(";").replace(";;", "");
                arrRelatedContracts[arrRelatedContracts.length - 1].RelatedContractTitle = rtitle.join(";").replace(";;", "");
                arrRelatedContracts[arrRelatedContracts.length - 1].RelatedRelationshipType = rtypetoremove.join(";").replace(";;", "");
                arrRelatedContracts[arrRelatedContracts.length - 1].RelationshipType = reltypetoremove.join(";").replace(";;", "");
                arrRelatedContracts[arrRelatedContracts.length - 1].RelatedStatus = rstatus.join(";").replace(";;", "");
                $("#liSelectedRelatedContract").find('span#' + obj.id).remove();
            }

            RelatedContractRelationShipTypeparent = $("#ddlRelationshipTypeParent option:selected").val();

        }
    } else {
        $("#" + obj.id).prop('checked', false);
        $("#" + obj.id).parent().parent().children(".ddl").empty();
    }

}


function liRemoveRelationshipselected(obj) {
    var child = obj.parentNode;
    var removechildname = child.textContent;
    removechildname = removechildname.split('(')[0].trim();
    if (child.id != "") {

        if (arrRelatedContracts.length > 0) {
            var chkObj = $("#" + child.id);
            var rtypeindex = arrRelatedContracts[arrRelatedContracts.length - 1].RelatedContractID.split(";").indexOf(chkObj[0].id);
            var rtindex = arrRelatedContracts[arrRelatedContracts.length - 1].RelatedContractID.split(";");
            var rtitle = arrRelatedContracts[arrRelatedContracts.length - 1].RelatedContractTitle.split(";");
            var rstatus = arrRelatedContracts[arrRelatedContracts.length - 1].RelatedStatus.split(";");
            var rtypetoremove = arrRelatedContracts[arrRelatedContracts.length - 1].RelatedRelationshipType.split(";");
            var reltypetoremove = arrRelatedContracts[arrRelatedContracts.length - 1].RelationshipType.split(";");

            if (arrRelatedcontractRowkey.length > 0) {
                arrRelatedcontractRowkey.splice(arrRelatedcontractRowkey.indexOf(rtindex[rtypeindex]), 1)
            }

            rtindex.splice(rtypeindex, 1);
            rtitle.splice(rtypeindex, 1);
            rtypetoremove.splice(rtypeindex, 1);
            reltypetoremove.splice(rtypeindex, 1);
            rstatus.splice(rtypeindex, 1);
            arrRelatedContracts[arrRelatedContracts.length - 1].RelatedContractID = rtindex.join(";").replace(";;", "");
            arrRelatedContracts[arrRelatedContracts.length - 1].RelatedContractTitle = rtitle.join(";").replace(";;", "");
            arrRelatedContracts[arrRelatedContracts.length - 1].RelatedRelationshipType = rtypetoremove.join(";").replace(";;", "");
            arrRelatedContracts[arrRelatedContracts.length - 1].RelationshipType = reltypetoremove.join(";").replace(";;", "");
            arrRelatedContracts[arrRelatedContracts.length - 1].RelatedStatus = rstatus.join(";").replace(";;", "");
        }

        child.parentNode.removeChild(child);
        $("#" + child.id).prop('checked', false);
        $("#" + child.id).parent().parent().children(".ddl").empty();
        //remove from text box
        var selectedrelatedvalues = [];
        $.each($('#RelatedContracts').val().split(";"), function () {
            if (this != "") {
                if ($.trim(this) != "") {
                    selectedrelatedvalues.push($.trim(this));
                }
            }
        });
        if (selectedrelatedvalues.indexOf(removechildname) > -1) {
            selectedrelatedvalues.splice(selectedrelatedvalues.indexOf(removechildname), 1);
        }
        if (selectedrelatedvalues.length > 0) {
            $("#RelatedContracts").val(selectedrelatedvalues.join("; "));
        }
        else {
            $("#RelatedContracts").val("");
        }



    }

    var selectedcount = 0;
    $('input:checkbox[name="RelatedContract"]:checked').each(function () {
        selectedcount++;
    });
    if (selectedcount > 0) {
        $("#relatedrole").show();
    } else {
        $("#relatedrole").hide();
    }
}



function sortArrOfObjectsByParam(arrToSort) {
    arrToSort.sort(function (a, b) {
        var A = a.toUpperCase();
        var B = b.toUpperCase();
        return ((A < B) ? -1 : ((A > B) ? 1 : 0));
    });
    return arrToSort;
}
function CheckDateBeforeSave(IsAutoIncre, IsEdit) {
    $("#hdTodayDate").val(new Date());
    var StartDate = $("#StartDate").val();
    if (StartDate != null && StartDate != "" && typeof (StartDate) != "undefined")
        StartDate = $.datepicker.formatDate('mm/dd/yy', $("#StartDate").datepicker('getDate'));//$("#StartDate").val();    
    var EndDate = $("#EndDate").val();
    if (EndDate != null && EndDate != "" && typeof (EndDate) != "undefined")
        EndDate = $.datepicker.formatDate('mm/dd/yy', $("#EndDate").datepicker('getDate'));//$("#EndDate").val();


    if (typeof ($("#ContractTermType").val()) != "undefined" && $("#ContractTermType").val() == "Renewable") {
        if (InitialTermStartDate != "") {
            var arrcomparedateParts = InitialTermStartDate.split('/');
            if (DatepickerFormat == "dd/mm/yy") {
                StartDate = new Date($.datepicker.formatDate('mm/dd/yy', new Date(arrcomparedateParts[2], arrcomparedateParts[1] - 1, arrcomparedateParts[0])));
            }
            else {
                StartDate = new Date($.datepicker.formatDate('mm/dd/yy', new Date(arrcomparedateParts[2], arrcomparedateParts[0] - 1, arrcomparedateParts[1])));
            }
        }
        else
        {
            StartDate = "";
        }
        if (LastTermEndDate != "") {
            var arrcomparedateParts = LastTermEndDate.split('/');
            if (DatepickerFormat == "dd/mm/yy") {
                EndDate = new Date($.datepicker.formatDate('mm/dd/yy', new Date(arrcomparedateParts[2], arrcomparedateParts[1] - 1, arrcomparedateParts[0])));
            }
            else {
                EndDate = new Date($.datepicker.formatDate('mm/dd/yy', new Date(arrcomparedateParts[2], arrcomparedateParts[0] - 1, arrcomparedateParts[1])));
            }
        }
        else
        {
            EndDate = "";
        }
    }


    var Status = "";
    var IsDuplicate = false;
    if (IsEdit) {
        Status = StatusToAdd;
    }
    else {
        IsDuplicate = true;
        Status = $("#ddlContractStatus").val();
    }
    var TodayDateStr = '';
    var StartDateStr = '';
    var EndDateStr = '';
    var StartLessEqu = "Start date is less than Today's date";
    var EndLessEqu = "End date is less than Today's date";

    if (StartDate != null && StartDate != "") {
        StartDate = moment(new Date(StartDate)).format('MM/DD/YYYY');
    }
    if (EndDate != null && EndDate != "") {
        EndDate = moment(new Date(EndDate)).format('MM/DD/YYYY');
    }
    EndDateStr = moment(new Date(EndDate)).format('MM/DD/YYYY');
    TodayDateStr = moment(new Date()).format('MM/DD/YYYY');

    if (TodayDateStr == StartDate) {
        StartLessEqu = "Start date is equal to Today's date";
    }
    if (TodayDateStr == EndDateStr) {
        EndLessEqu = "End date is equal to Today's date";
    }
    if ((Status != null && Status != "" && typeof (Status) != "undefined")) {
        if (contractshow == 1) {
            if ((Status == "Signed" || Status == "Awaiting Signatures" || Status == "Ready for Signature" || Status == "Active") && (EndDate != null && EndDate != "" && typeof (EndDate) != "undefined") && (!comparedateswithGTtoday(EndDate))) {

                StatusToAdd = 'Expired';
             contractshow = 1;
             //$("#ddlContractStatus").val('Expired');

             //if (IsDuplicate)
             //    DuplicateSave(IsAutoIncre)
             //else
             //    UpdateContract(false);

                swal({
                    title: '',
                    text: EndLessEqu + ". Do you want to make the Contract Record status '<span style=\"font-weight:700\">Expired</span>' ?",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    html: true
                },
     function (confirmed) {
         if (confirmed) {
             StatusToAdd = 'Expired';
             contractshow = 1;
             //$("#ddlContractStatus").val('Expired');

             if (IsDuplicate)
                 DuplicateSave(IsAutoIncre)
             else
                 UpdateContract(false);

         }
         else {
             StatusToAdd = Status;
             contractshow = 0;
             if (IsDuplicate)
                 DuplicateSave(IsAutoIncre)
             else
                 UpdateContract(false);

         }
     });
            }
            else if ((Status == "Signed" || Status == "Awaiting Signatures" || Status == "Ready for Signature" || Status == "Expired") && (StartDate != null && StartDate != "" && typeof (StartDate) != "undefined") && (!comparedateswithGTtoday(StartDate)) && StatusToAdd != "Active") {

                StatusToAdd = 'Active';
                //  $("#ddlContractStatus").val('Active');
              contractshow = 1;
            //  if (IsDuplicate)
            //      DuplicateSave(IsAutoIncre)
            //else
            //      UpdateContract(false);

                swal({
                    title: '',
                    text: StartLessEqu + ". Do you want to make the Contract Record status '<span style=\"font-weight:700\">Active</span>' ?",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    html: true
                },
      function (confirmed) {
          if (confirmed) {
              StatusToAdd = 'Active';
              //$("#ddlContractStatus").val('Active');
              contractshow = 1;
              if (IsDuplicate)
                  DuplicateSave(IsAutoIncre)
              else
                  UpdateContract(false);

          }
          else {
              StatusToAdd = Status;
              contractshow = 0;
              if (IsDuplicate)
                  DuplicateSave(IsAutoIncre)
              else
                  UpdateContract(false);
          }
      });
            }
            else {
                StatusToAdd = Status;

                if (IsDuplicate)
                    DuplicateSave(IsAutoIncre)
                else
                    UpdateContract(false);

            }
        }
        else if (contractshow == 0) {
            if ((EndDate != null && EndDate != "" && typeof (EndDate) != "undefined") && (!comparedateswithGTtoday(EndDate))) {

                 StatusToAdd = 'Expired';
              contractshow = 1;
                //$("#ddlContractStatus").val('Expired');

            //  if (IsDuplicate)
            //      DuplicateSave(IsAutoIncre)
            //else
            //      UpdateContract(false);

                swal({
                    title: '',
                    text: EndLessEqu + ". Do you want to make the Contract Record finalized with status '<span style=\"font-weight:700\">Expired</span>' ?",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    html: true
                },
      function (confirmed) {
          if (confirmed) {
              StatusToAdd = 'Expired';
              contractshow = 1;
              //$("#ddlContractStatus").val('Expired');

              if (IsDuplicate)
                  DuplicateSave(IsAutoIncre)
              else
                  UpdateContract(false);

          }
          else {
              StatusToAdd = Status;
              contractshow = 0;
              if (IsDuplicate)
                  DuplicateSave(IsAutoIncre)
              else
                  UpdateContract(false);

          }
      });
            }
            else if ((StartDate != null && StartDate != "" && typeof (StartDate) != "undefined") && (!comparedateswithGTtoday(StartDate)) && StatusToAdd != "Active" && StatusToAdd != "Up for Renewal" && StatusToAdd != "About to Expire") {

                StatusToAdd = 'Active';
              contractshow = 1;
                // $("#ddlContractStatus").val('Active');

            //  if (IsDuplicate)
            //      DuplicateSave(IsAutoIncre)
            //else
            //      UpdateContract(false);

                swal({
                    title: '',
                    text: StartLessEqu + ". Do you want to make the Contract Record finalized with status '<span style=\"font-weight:700\">Active</span>' ?",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    html: true
                },
      function (confirmed) {
          if (confirmed) {
              StatusToAdd = 'Active';
              contractshow = 1;
              //$("#ddlContractStatus").val('Active');

              if (IsDuplicate)
                  DuplicateSave(IsAutoIncre)
              else
                  UpdateContract(false);

          }
          else {
              StatusToAdd = Status;
              contractshow = 0;
              if (IsDuplicate)
                  DuplicateSave(IsAutoIncre)
              else
                  UpdateContract(false);

          }
      });
            }
            else {
                StatusToAdd = Status;

                if (IsDuplicate)
                    DuplicateSave(IsAutoIncre)
                else
                    UpdateContract(false);

            }
        }
        else {
            StatusToAdd = Status;

            if (IsDuplicate)
                DuplicateSave(IsAutoIncre)
            else
                UpdateContract(false);

        }
    }
    else {
        StatusToAdd = Status;

        if (IsDuplicate)
            DuplicateSave(IsAutoIncre)
        else
            UpdateContract(false);

    }
}
function comparedateswithGTtoday(secondDateControlID) {
    var isvalid = true;
    if (secondDateControlID != null && secondDateControlID != '') {
        var dt1 = new Date();
        var dt2 = new Date(secondDateControlID);
        var dateOne = new Date(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()); //Year, Month, Date
        var dateTwo = new Date(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()); //Year, Month, Date
        if (dateTwo > dateOne) {
            isvalid = true;
        } else {
            isvalid = false;
        }
    }
    return isvalid;
}
function DuplicateSave(isAutoinceramentNumberforValidate) {
    var vTitle = $("#txtContractTitle").val().trim();
    var vNumber = "";
    if (typeof ($("#txtContractNumber").val()) != 'undefined') {
        vNumber = $("#txtContractNumber").val().trim();
    }
    var contractForm = $("#saveContactForm *").serialize();
    contractForm = contractForm.substring(contractForm.indexOf("&") + 1);
    contractForm = contractForm.substring(contractForm.indexOf("&") + 1);

    var result = "&";
    $("#saveContactForm .fielddatecontrol").each(function (index) {
        if ($(this).attr('class').toLowerCase().indexOf("hasdatepicker") >= 0) {
            var name = $(this).attr('class');
            name = name.split("hasDatepicker")[0];
            name = name.slice(0, -1);
            name = name.substr(name.lastIndexOf(' ') + 1);
            var value = $.datepicker.formatDate('mm/dd/yy', $(this).datepicker('getDate'));
            result = result + name + "=" + value + "&";
        }
        else {

            var name = $(this).attr('class').substr($(this).attr('class').lastIndexOf(' ') + 1);
            var value = $.datepicker.formatDate('mm/dd/yy', $(this).datepicker('getDate'));
            result = result + name + "=" + value + "&";
        }
    });
    result = result.slice(0, -1)
    contractForm += result;

    result = "&";
    $("#saveContactForm .fieldphonecontrol").each(function (index) {
        if ($(this).val() != null && $(this).val() != "") {
            var name = $(this)[0].id;
            var value = $(this).intlTelInput("getSelectedCountryData").iso2 + "," + $(this).intlTelInput("getSelectedCountryData").dialCode + "," + $(this).intlTelInput("getNumber", intlTelInputUtils.numberFormat.INTERNATIONAL);
            result = result + name + "=" + value + "&";
        }
        else {
            var name = $(this)[0].id;
            var value = "";
            result = result + name + "=" + value + "&";
        }
    });
    result = result.slice(0, -1)
    contractForm += result;


    if (contractForm.indexOf("&AutoIncrmentNumber") == -1 && isAutoinceramentNumberforValidate) {
        contractForm += "&AutoIncrmentNumber=" + encodeURIComponent(AutoinceramentNumberforValidate);
    }
    if (contractForm.indexOf("&OriginatingParty=") == -1) {
        if (contractForm.indexOf("&CompanyProfile=") == -1) {
            contractForm += "&OriginatingParty=" + encodeURIComponent(thisContractAreaSettings.LegalEntity);
        } else {
            var legalentityselection = $("#CompanyProfile").find('option:selected').text();
            if (typeof legalentityselection != 'undefined' && typeof legalentityselection != "") {
                if (legalentityselection != "--Select--") {
                    contractForm += "&OriginatingParty=" + encodeURIComponent(legalentityselection);
                } else {
                    contractForm += "&OriginatingParty=" + encodeURIComponent(thisContractAreaSettings.LegalEntity);
                }
            }
        }
    }
    contractForm += "&ContractTitle=" + encodeURIComponent(vTitle);
    contractForm += "&BusinessArea=" + encodeURIComponent($("#txtBusinessArea").val().trim());
    contractForm += "&ContractType=" + encodeURIComponent($("#ddlContractTypes option:selected").text().trim());

    if (businessAreaPath != "") { //if business area changed
        contractForm += "&BusinessAreaPath=" + encodeURIComponent(businessAreaPath);
        contractForm += "&ContractArea=" + encodeURIComponent($("#txtContractAreaName").val().trim());
        contractForm += "&ContractAreaAdministrators=" + $("#txtContractAreaAdministrators").val().trim();
        contractForm += "&BusinessAreaOwners=" + $("#txtBusinessAreaOwners").val().trim();
    }
    if (contractForm.indexOf('Status=') == -1) {
        if (StatusToAdd != "")
            statusupdate = "&Status=" + StatusToAdd;
        else
            statusupdate = "&Status=" + $("#ddlContractStatus option:selected").val();
        contractForm += statusupdate;
        //contractForm += "&Status=" + StatusToAdd;
        //   contractForm += "&Status=" +ddlContractStatus $("#ddlContractStatus option:selected").val();// decodeURI($("#ddlContractStatus").val());
    }
    else if (contractForm.indexOf('Status=0') >= 0) {
        if (StatusToAdd != "")
            statusupdate = "&Status=" + StatusToAdd;
        else
            statusupdate = "&Status=" + $("#ddlContractStatus option:selected").val();
        contractForm = contractForm.replace(/Status=0/g, statusupdate);
    }

    contractForm += "&AccountID=" + localStorage.AccountID;
    contractForm += "&CreatedBy=" + localStorage.UserName;
    contractForm += "&ModifiedBy=" + localStorage.UserName;
    contractForm += "&DuplicatedFrom=" + getParameterByName("ContractID");
    //manoj
    if ($("#hdhMilestoneCapture").text() == "Yes") {
        var fieldandtitle = '';
        $('input:checkbox[class=customdatefiledfeature]:checked:enabled').each(function (customindex, customvalue) {
            if (typeof customvalue.id != "undefined" && customvalue.id != null && customvalue.id != "") {
                fieldandtitle += ";" + customvalue.id.replace('custommile', '');
            }
        });
        if (typeof fieldandtitle != "undefined" && fieldandtitle != null && fieldandtitle != "") {
            fieldandtitle = (fieldandtitle.charAt(0) === ';') ? fieldandtitle.substr(1) : fieldandtitle;
            contractForm += "&CustomDateFields=" + fieldandtitle;
        } else {
            contractForm += "&CustomDateFields=";
        }
        fieldandtitle = '';
    }
    //manoj
    contractForm = contractForm.replace('CompanyProfile=0', 'CompanyProfile=');

    var formData = new FormData();
    formData.append("AccountID", localStorage.AccountID);
    formData.append("ContractType", encodeURIComponent($("#ddlContractTypes option:selected").text()));
    ////manoj
    ////for Custom Metadata Feature
    //var passcustommetadatastatus = ($("#ddlContractTypes").val().split("~").slice(-1) == "OFF") ? "Yes" : "No";
    //if (passcustommetadatastatus == "Yes") {
    //    var veContractFeaturesCTLU = JSON.parse(localStorage.getItem("eContractFeatures"));
    //    var vCustomMetadata = $.grep(veContractFeaturesCTLU, function (n, i) {
    //        return (n.RowKey == "24" && n.Status == "ON");
    //    });
    //    passcustommetadatastatus = (vCustomMetadata.length > 0) ? passcustommetadatastatus : "No";
    //}
    //formData.append("ContractTypeCustomMetadataFU", encodeURIComponent(passcustommetadatastatus));
    ////for Custom Metadata Feature
    ////manoj
    formData.append("SearializeControls", contractForm);
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts',
        type: 'POST',
        dataType: 'json',
        headers: {
            'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, UserName: localStorage.UserName, 'RefreshToken': localStorage.RefreshToken
        },
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            if (typeof ($("#ContractTermType").val()) != "undefined" && $("#ContractTermType").val() == "Renewable") {
                RenewalTermSave(getParameterByName("ContractID"));
            }
            //Removed
            //alert('Duplicate Contract Created');
            //manoj
            //create milestone for custom date fields
            if ($("#hdhMilestoneCapture").text() == "Yes") {
                var Milestonecount = parseInt($("#divcustommilestone").children().length);
                if (parseInt($("#divcustommilestone").children().length) > 0) {
                    $("#divcustommilestone").children().each(function (imilestone, itemmilestone) {
                        var formData = new FormData();
                        var milestoneForm = "ContractID=" + data;
                        milestoneForm += "&RowKey=Create";
                        milestoneForm += "&ContractTitle=" + encodeURIComponent($("#txtContractTitle").val());
                        milestoneForm += "&MilestoneTitle=" + encodeURIComponent(($(itemmilestone).find('#hdMilestoneTitle')[0].defaultValue != null && $(itemmilestone).find('#hdMilestoneTitle')[0].defaultValue != "") ? $(itemmilestone).find('#hdMilestoneTitle')[0].defaultValue : "");

                        milestoneForm += "&MilestoneType=" + encodeURIComponent(($(itemmilestone).find('#hdMilestoneType')[0].defaultValue != null && $(itemmilestone).find('#hdMilestoneType')[0].defaultValue != "") ? $(itemmilestone).find('#hdMilestoneType')[0].defaultValue : "");
                        milestoneForm += "&MilestoneDescription=" + encodeURIComponent(($(itemmilestone).find('#hdnMilestoneDescription')[0].defaultValue != null && $(itemmilestone).find('#hdnMilestoneDescription')[0].defaultValue != "") ? $(itemmilestone).find('#hdnMilestoneDescription')[0].defaultValue : "");

                        milestoneForm += "&MilestoneDate=" + encodeURIComponent(($(itemmilestone).find('#hdnMilestoneDate')[0].defaultValue != null && $(itemmilestone).find('#hdnMilestoneDate')[0].defaultValue != "") ? $(itemmilestone).find('#hdnMilestoneDate')[0].defaultValue : "");

                        milestoneForm += "&MilestoneOwner=" + encodeURIComponent($(itemmilestone).find('#hdnMilestoneOwner')[0].defaultValue);
                        milestoneForm += "&AutoComplete=" + encodeURIComponent($(itemmilestone).find('#hdnAutoComplete')[0].defaultValue);

                        milestoneForm += "&Priority=" + $(itemmilestone).find('#hdnPriority')[0].defaultValue;
                        milestoneForm += "&MilestoneCompleted=";
                        milestoneForm += "&MilestoneCompletedDate=" + null;
                        milestoneForm += "&MilestoneCompletedBy=";

                        milestoneForm += "&ShowInCalendar=" + encodeURIComponent(($(itemmilestone).find('#hdnShowInCalendar')[0].defaultValue != null && $(itemmilestone).find('#hdnShowInCalendar')[0].defaultValue != "") ? $(itemmilestone).find('#hdnShowInCalendar')[0].defaultValue : "Yes");
                        milestoneForm += "&CreatedBy=" + encodeURIComponent(localStorage.UserName);
                        milestoneForm += "&ModifiedBy=" + encodeURIComponent(localStorage.UserName);
                        milestoneForm += "&SendReminderTo=" + encodeURIComponent($(itemmilestone).find('#hdnSendReminderTo')[0].defaultValue);
                        milestoneForm += "&Reminder1=" + $(itemmilestone).find('#hdnReminder1')[0].defaultValue;
                        milestoneForm += "&Reminder2=" + $(itemmilestone).find('#hdnReminder2')[0].defaultValue;
                        milestoneForm += "&Reminder3=" + $(itemmilestone).find('#hdnReminder3')[0].defaultValue;
                        milestoneForm += "&Reminder1Condition=" + encodeURIComponent($(itemmilestone).find('#hdnReminder1Condition')[0].defaultValue);
                        milestoneForm += "&Reminder2Condition=" + encodeURIComponent($(itemmilestone).find('#hdnReminder2Condition')[0].defaultValue);
                        milestoneForm += "&Reminder3Condition=" + encodeURIComponent($(itemmilestone).find('#hdnReminder3Condition')[0].defaultValue);
                        milestoneForm += "&MilestoneStatus=" + encodeURIComponent($(itemmilestone).find('#hdnMilestoneStatus')[0].defaultValue);
                        milestoneForm += "&AlertsEnabled=" + $(itemmilestone).find('#hdnAlertsEnabled')[0].defaultValue;
                        milestoneForm += "&Ocurrences=" + encodeURIComponent("1");
                        milestoneForm += "&Recurrences=" + encodeURIComponent("None");
                        milestoneForm += "&CustomString=" + encodeURIComponent("None");
                        milestoneForm += "&MilestoneEndTerm=";
                        milestoneForm += "&RecMonthlyString=";
                        milestoneForm += "&CustomDateFieldName=" + $.trim(itemmilestone.id.replace('divcustommile', ''));
                        formData.append("SearializeControls", milestoneForm);
                        formData.append("objoccurrence", "");
                        $.ajax({
                            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/milestones/milestonesnew',
                            type: 'POST',
                            dataType: 'json',
                            headers: {
                                'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName
                            },
                            data: formData,
                            cache: false,
                            contentType: false,
                            processData: false,
                            success: function (person) {
                            },
                            error: function (data) {
                            },
                        });
                    });
                }
            }
            //create milestone for custom date fields
            //manoj

            //Sridhar
            if (data.indexOf('~') > -1)
                data = data.split('~')[0];
            if (contractshow == 0) {
                location = "/Contracts/ContractDetails?ContractID=" + data + "&Stage=pipeline";
            } else {
                location = "/Contracts/ContractDetails?ContractID=" + data;
            }
        }
    });

}

function getcontractnumbersettings(valuestoreplace, valuenewautonumber, valueprvautonumber) {
    var returnvalue = valuestoreplace;
    if (globalcontractnumbersetting.length > 0) {
        if (contractnumbergenereated.length > 1) {
            var vAccFeatdetails = $.grep(LeagalEntity, function (n, i) {
                return (n.LegalEntityName == $("#CompanyProfile").find('option:selected').text());
            });
            var indexvalue = 0;
            var presentvalue = false;
            $(globalcontractnumbersetting).each(function (i, itemglobalcontractnumbersetting) {
                presentvalue = (itemglobalcontractnumbersetting.indexOf('{Auto Increment Number~') > -1) ? true : presentvalue;
                indexvalue = (presentvalue == false) ? indexvalue + 1 : indexvalue;
            });
            indexvalue = (presentvalue == false) ? -1 : indexvalue;
            contractnumbergenereated[indexvalue] = valueprvautonumber;
            if (vAccFeatdetails.length > 0) {
                contractnumbergenereated[globalcontractnumbersetting.indexOf('{Legal Entity Name}')] = vAccFeatdetails[0].Abbreviation;
                returnvalue = contractnumbergenereated.join(globalseparator);
            } else {
                returnvalue = $("#txtContractNumber").val();
            }
        } else {
            if (valuestoreplace == "") {
                valuestoreplace = (typeof ($('#txtContractNumber').val()) != 'undefined' && $('#txtContractNumber').val() != null && $('#txtContractNumber').val() != "") ? $('#txtContractNumber').val().trim() : valuestoreplace;
            } else {
                if (typeof valuenewautonumber != 'undefined' && valuenewautonumber != null && valuenewautonumber != "") {
                    valuestoreplace = (valuestoreplace.indexOf(valuenewautonumber) > -1) ? valuestoreplace.replace(valuenewautonumber, valueprvautonumber) : valuestoreplace;
                }
            }
            var vAccPrvFeatdetails = $.grep(LeagalEntity, function (n, i) {
                return (n.LegalEntityName == SelectedLegalEntity);
            });
            var vAccNewFeatdetails = $.grep(LeagalEntity, function (n, i) {
                return (n.LegalEntityName == $("#CompanyProfile").find('option:selected').text());
            });
            if (vAccPrvFeatdetails.length > 0 && vAccNewFeatdetails.length > 0) {
                if (vAccNewFeatdetails[0].Abbreviation == "" && vAccPrvFeatdetails[0].Abbreviation == "") {
                    returnvalue = valuestoreplace;
                } else if (vAccPrvFeatdetails[0].Abbreviation == "") {
                    returnvalue = finedvalues.replace('Scx5euM4', vAccNewFeatdetails[0].Abbreviation); returnvalue = valuestoreplace;
                } else if (vAccNewFeatdetails[0].Abbreviation == "") {
                    finedvalues = valuestoreplace.replace(vAccPrvFeatdetails[0].Abbreviation, 'Scx5euM4');
                    returnvalue = valuestoreplace.replace(vAccPrvFeatdetails[0].Abbreviation, '');
                } else {
                    returnvalue = valuestoreplace.replace(vAccPrvFeatdetails[0].Abbreviation, vAccNewFeatdetails[0].Abbreviation)
                }
            } else {
                returnvalue = valuestoreplace;
            }
            SelectedLegalEntity = $("#CompanyProfile").find('option:selected').text();
        }
    } else if (valuestoreplace == null && valuestoreplace == "") {
        returnvalue = $("#txtContractNumber").val();
    } else {
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/settings',
            type: 'GET',
            dataType: 'json',
            headers: {
                'eContracts-ApiKey': localStorage.APIKey
            },
            cache: false,
            async: false,
            success: function (data) {
                if (data.ContractNumberFormat != null && data.ContractNumberFormat != "") {
                    var contractnumbersetting = data.ContractNumberFormat.split('}');
                    if (contractnumbersetting.length > 2) {
                        if (contractnumbersetting[1] != null && contractnumbersetting[1] != "") {
                            contractnumbersetting[1] = contractnumbersetting[1].trim();
                            globalseparator = contractnumbersetting[1].charAt(0);
                            globalcontractnumbersetting = [];
                            //data.ContractNumberFormat.split(separator);
                            $.each(data.ContractNumberFormat.split(globalseparator), function () {
                                globalcontractnumbersetting.push($.trim(this));
                            });
                            contractnumbergenereated = [];
                            $.each(valuestoreplace.split(globalseparator), function () {
                                contractnumbergenereated.push($.trim(this));
                            });
                            if (contractnumbergenereated.length > 1) {
                                var vAccFeatdetails = $.grep(LeagalEntity, function (n, i) {
                                    return (n.LegalEntityName == $("#CompanyProfile").find('option:selected').text());
                                });
                                if (vAccFeatdetails.length > 0) {
                                    contractnumbergenereated[globalcontractnumbersetting.indexOf('{Legal Entity Name}')] = vAccFeatdetails[0].Abbreviation;
                                }
                                var indexvalue = 0;
                                var presentvalue = false;
                                $(globalcontractnumbersetting).each(function (i, itemglobalcontractnumbersetting) {
                                    presentvalue = (itemglobalcontractnumbersetting.indexOf('{Auto Increment Number~') > -1) ? true : presentvalue;
                                    indexvalue = (presentvalue == false) ? indexvalue + 1 : indexvalue;
                                });
                                indexvalue = (presentvalue == false) ? -1 : indexvalue;
                                contractnumbergenereated[indexvalue] = valueprvautonumber;
                                returnvalue = contractnumbergenereated.join(globalseparator);
                            }
                            else {
                                valuestoreplace = (valuestoreplace.indexOf(valuenewautonumber) > -1) ? valuestoreplace.replace(valuenewautonumber, valueprvautonumber) : valuestoreplace;
                                var vAccPrvFeatdetails = $.grep(LeagalEntity, function (n, i) {
                                    return (n.LegalEntityName == thisLegalEntity);
                                });
                                var vAccNewFeatdetails = $.grep(LeagalEntity, function (n, i) {
                                    return (n.LegalEntityName == SelectedLegalEntity);
                                });
                                if (vAccPrvFeatdetails.length > 0 && vAccNewFeatdetails.length > 0) {
                                    if (vAccNewFeatdetails[0].Abbreviation == "" && vAccPrvFeatdetails[0].Abbreviation == "") {
                                        returnvalue = valuestoreplace;
                                    } else if (vAccPrvFeatdetails[0].Abbreviation == "") {
                                        returnvalue = finedvalues.replace('Scx5euM4', vAccNewFeatdetails[0].Abbreviation); returnvalue = valuestoreplace;
                                    } else if (vAccNewFeatdetails[0].Abbreviation == "") {
                                        finedvalues = valuestoreplace.replace(vAccPrvFeatdetails[0].Abbreviation, 'Scx5euM4');
                                        returnvalue = valuestoreplace;
                                    } else {
                                        returnvalue = valuestoreplace.replace(vAccPrvFeatdetails[0].Abbreviation, vAccNewFeatdetails[0].Abbreviation)
                                    }
                                } else {
                                    returnvalue = valuestoreplace;
                                }
                            }
                        }
                    } else {
                        returnvalue = (valuestoreplace.indexOf(valuenewautonumber) > -1) ? valuestoreplace.replace(valuenewautonumber, valueprvautonumber) : valuestoreplace;
                    }
                }
            },
            error: function (data) {
            }
        });
    }
    returnvalue == null ? returnvalue = "" : returnvalue = returnvalue;
    return returnvalue;
}





function getstandardLookupValues(lookupvaluename, fieldName, fieldvalue) {
    $.ajax({
        url: '/Settings/GetStandardLookupValues',
        type: 'Get',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: {
            lookupname: lookupvaluename
        },
        cache: false,
        success: function (jsObject) {
            if (jsObject.Success) {
                jsObject = jsObject.Data;
                var data = JSON.parse(jsObject);
                $(data).each(function (i, item) {
                    $("#" + fieldName + "").append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>")
                });
                $("#" + fieldName + "").chosen().trigger("chosen:updated");
                $('.chosenmulti').on('chosen:showing_dropdown', function (evt, params) {
                    $('.result-selected').css('display', 'none');
                });
                if (fieldvalue != null && fieldvalue != "") {
                    GetValuesAndAutoPopulate(fieldName, fieldvalue);
                }
            }


        },
        error: function (data) {

        }
    });
}

//Sridhar
function SearchOPLegalEntities() {
    var control = "";
    var txtsearchboxvalue = $('#txtSearchBoxOPLegal').val().trim().toLowerCase();
    if (txtsearchboxvalue != "" && txtsearchboxvalue != null) {
        $.ajax({
            url: '/Settings/SearchLegalEntities',
            type: 'Get',
            dataType: 'json',
            data: {
                searchKeyword: txtsearchboxvalue
            },
            cache: false,
            success: function (jsObject) {
                if (jsObject.Success) {
                    jsObject = jsObject.Data;
                    var data = JSON.parse(jsObject);
                    //
                    var columnOP = [];
                    $("#tblOPLegalEntities").empty();
                    var legalentityval = $("#CompanyProfile").find('option:selected').text();
                    $(data).each(function (i, item) {
                        if (thisLegalEntity == item.LegalEntityName) {
                            control += "<option selected='selected' value='" + item.LegalEntityName + "'>" + item.LegalEntityName + "</option>";
                        } else {
                            control += "<option value='" + item.LegalEntityName + "'>" + item.LegalEntityName + "</option>";
                        }

                        var article = '<li>';
                        if ($('#OriginatingParty').val() != "") {
                            if ($('#OriginatingParty').val() == item.LegalEntityName) {
                                article += '<input id="OP' + item.RowKey + '" type="radio" name="OriginatingParty" class="css-checkbox" checked value="' + item.LegalEntityName + '" />';
                            } else {
                                article += '<input id="OP' + item.RowKey + '" type="radio" name="OriginatingParty" class="css-checkbox" value="' + item.LegalEntityName + '" />';
                            }
                            article += '<label for="OP' + item.RowKey + '" class="css-label">' + item.LegalEntityName + '</label>';
                            article += '</li>';
                            $("#tblOPLegalEntities").append(article);
                        } else if (typeof legalentityval != 'undefined' && legalentityval != '' && legalentityval != '--Select--') {
                            if ($("#CompanyProfile").find('option:selected').text() == item.LegalEntityName) {
                                article += '<input id="OP' + item.RowKey + '" type="radio" name="OriginatingParty" class="css-checkbox" checked value="' + item.LegalEntityName + '" />';
                            } else {
                                article += '<input id="OP' + item.RowKey + '" type="radio" name="OriginatingParty" class="css-checkbox" value="' + item.LegalEntityName + '" />';
                            }
                            article += '<label for="OP' + item.RowKey + '" class="css-label">' + item.LegalEntityName + '</label>';
                            article += '</li>';
                            $("#tblOPLegalEntities").append(article);
                        }
                        else {
                            if (thisLegalEntity == item.LegalEntityName) {
                                article += '<input id="OP' + item.RowKey + '" type="radio" name="OriginatingParty" class="css-checkbox" checked value="' + item.LegalEntityName + '" />';
                            } else {
                                article += '<input id="OP' + item.RowKey + '" type="radio" name="OriginatingParty" class="css-checkbox" value="' + item.LegalEntityName + '" />';
                            }
                            article += '<label for="OP' + item.RowKey + '" class="css-label">' + item.LegalEntityName + '</label>';
                            article += '</li>';
                            $("#tblOPLegalEntities").append(article);
                        }
                        columnOP.push(item.LegalEntityName);
                        $("#txtSearchBoxOPLegal").autocomplete({
                            source: columnOP,
                            minLength: 1,
                            focus: function (event, ui) {
                                return false;
                            },
                            select: function (evn, uidetails) {
                                $("#txtSearchBoxOPLegal").val(uidetails.item.label);
                                SearchOPLegalEntities();
                            }
                        });
                    });

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
            }
        });
    }
    return control;
}
function SearchOPCounterparties() {
    $("#tblOPCounterparties").empty();
    var SearchVal = $("#txtSearchBoxOPCounterparties").val().trim().toLowerCase();
    var result = [];
    //var search_term = 'oo'; // your search term as string
    //var search = search_term.toUpperCase();
    for (var i = 0; i < columnOPConterparty.length; i++) {
        if (columnOPConterparty[i].toLowerCase().indexOf(SearchVal) >= 0) {
            result.push(columnOPConterparty[i]);
        }
    }

    for (var i = 0; i < result.length; i++) {
        var vCounterpartyName = result[i].trim();
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
            $("#tblOPCounterparties").append('<li style="font-size:13px;">No Counterparty is available.</li>');
        }
    }
    var vCount = $("#tblOPCounterparties li").length;
    $('#compact-paginationOPCounterparties').pagination({
        items: vCount,
        itemsOnPage: 15,
        type: 'ul',
        row: 'li',
        typeID: 'tblOPCounterparties',
        cssStyle: 'compact-theme'
    });

}
$('#txtSearchBoxOPLegal').keypress(function (e) {
    if (e.keyCode == 13) {
        $(".ui-autocomplete").css('display', 'none');
        SearchOPLegalEntities();
    }
});
//Sridhar

//manoj
function addmilestone(milestoneobj) {
    var fieldvalue = $("#" + milestoneobj.id.replace('custommile', '')).val();
    if (milestoneobj.checked == true) {
        if (typeof fieldvalue != 'undefined' && fieldvalue != null && fieldvalue != "") {
            $("#hdnfieldname").text(milestoneobj.id);
            //$("#divcustommilestone").append("<div id='div" + milestoneobj.id + "'>Testing Milestone</div>");           
            AddMilestoneMoreNew(milestoneobj.id);

        } else {
            swal("", "Select the date to add milestone.");
            milestoneobj.checked = false;
        }
    } else {
        var elem = document.getElementById('divcustommilestone');
        if (typeof elem != 'undefined' && elem != null) {
            $("#div" + milestoneobj.id).remove()
        }
    }
}
var listMilestoneNewData = "";
var listMilestoneNewEndDate = "";
var listMilestoneNewStartDate = "";
var milestoneRecur = "";
var milestoneRecurCusString = "";
var milestoneoccur = 1;

function AddMilestoneMoreNew(obj) {
    clearMilestoneFormDataNew();
    listMilestoneNewData = "";
    $("#txtMilestoneIDNew").val("");
    $("#txtMilestoneTitleNew").val("");
    $('#ddlMilestoneTypeNew').val("0");
    $("#dtMilestoneDateNew").val($("#" + obj.replace('custommile', '')).val());
    $("#ddlMilestoneNewPriority").val("Medium");
    //manoj
    $("#txtMileDescriptionNew").val('');
    $('input[type="radio"][name="ShowInCalendarNew"][value="Yes"]').prop('checked', true);
    //manoj
    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
    var vAccFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "11" && n.Status == "ON");
    });
    //if (projMgrs != "" && vAccFeat.length > 0) {
    //    GetValuesAndAutoPopulate("ddlSendReminderToNew", "{Project Managers}");
    //} else {
    GetValuesAndAutoPopulate("ddlSendReminderToNew", "");
    //}
    $("#milestonenewheading").text("New Milestone");
    $('input[type="radio"][name="MilestoneNewAutoComplete"][value="Yes"]').prop('checked', true);
    $("#dtMilestoneNewCompletedDate").val("");
    $("#amilestoneCRecurrence").css('display', 'none');
    $("#amilestoneESeries").css('display', 'none');
    $("#amilestoneERecurrence").css('display', 'none');
    $("#ulMilestoneNewCompletedDate").css('display', 'none');

    $("#liMilestoneRecurrence").css('display', '');

    var strEndDate = "";
    $('#txtMilestoneOccurrenceCount').val("12");
    if (typeof ($("#EndDate").val()) != 'undefined') {
        if ($("#EndDate").val() != "" && $("#EndDate").val() != null && $("#EndDate").val() != "null") {

            strEndDate = new Date($("#EndDate").val());
            listMilestoneNewEndDate = formatDatemile(strEndDate);
            $('#MilestoneNewOcurrenceEndDate').text("");
            var MNewEndDate = "";
            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
            { MNewEndDate = moment(new Date(listMilestoneNewEndDate)).format('MM/DD/YYYY'); }
            else {
                MNewEndDate = moment(new Date(listMilestoneNewEndDate)).format(localStorage.AppDateFormat);
            }

            $('#MilestoneNewOcurrenceEndDate').text(" (" + MNewEndDate + ")");
            $("#rdMilestoneNewEndOccurence").prop("checked", true);
        }
        else {
            listMilestoneNewEndDate = "Not Available";
            $('#MilestoneNewOcurrenceEndDate').text("");
            $('#MilestoneNewOcurrenceEndDate').text(" (" + listMilestoneNewEndDate + ")");
            $("#rdMilestoneNewEndOccurence").attr('disabled', true);
            $('#rdMilestoneNewEndOccurence').removeAttr('checked');
            $("#rdMilestoneNewEndOccurenceUser").prop("checked", true);
        }
    } else {
        listMilestoneNewEndDate = "Not Available";
        $('#MilestoneNewOcurrenceEndDate').text("");
        $('#MilestoneNewOcurrenceEndDate').text(" (" + listMilestoneNewEndDate + ")");
        $("#rdMilestoneNewEndOccurence").attr('disabled', true);
        $('#rdMilestoneNewEndOccurence').removeAttr('checked');
        $("#rdMilestoneNewEndOccurenceUser").prop("checked", true);
    }
    $("#divMilestoneOcurrenceWeekly").css('display', 'none');
    $("#divMilestoneOcurrenceMonthly").css('display', 'none');

    $("#dvMilestoneOcurrenceEnd").css('display', 'none');
    $("#divMilestoneOcurrenceSummary").css('display', 'none');

    document.getElementById("ddlMilestoneOccurencess").disabled = true;
    document.getElementById("dtMilestoneDateNew").disabled = true;

    $("#amilestoneRecNoneEdit").css('display', 'none');
    $("#amilestoneRecEdit").css('display', 'none');
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

    $("#lblCTitleNew").text($("#txtContractTitle").val());
    $(".validelement").each(function (index, element) {
        $(element).removeClass("error");
        $("#errormsg_" + element.id).remove();
    });
    GetValuesAndAutoPopulate("ddlMilestoneOwnerNew", localStorage.UserName);
    GetValuesAndAutoPopulate("ddlSendReminderToNew", localStorage.UserName);
    $("#lblerrorreclimitMilestone").css('display', 'none');
    $("#lblerrorreclimitMilestoneNotZero").css('display', 'none');

    var contractstatus = ["Signed", "Awaiting Signatures", "Ready for Signature", "Active", "Expired"];
    if (getParameterByName('Stage') == 'pipeline' || getParameterByName('Duplicate') == 'Yes') {
        $("#AlertMile").val('No').change();
        $(".AlertEnabled").removeClass("disabled_slider");
        $("#AlertMile").val('No').change();
        $("#reminderEnable").empty();
        $("#reminderEnable").append("Reminders <span style='font-size: 16px;color: red;margin-left: 20%;font-weight: 600;font: inherit;'>To turn ON reminders for milestone notifications, click <a href='javascript:void(0);' id='enableSwitch' onclick='enableMilestoneSwitch()'>Enable</a></span>")
    }
    else {
        $(".AlertEnabled").removeClass("disabled_slider");
        $("#AlertMile").val('Yes').change();
        $("#reminderEnable").empty();
        $("#reminderEnable").append("Reminders");
    }
    $("#addEditMilestoneNew").dialog("option", "title", "");
    $("#addEditMilestoneNew").dialog("open");
    $("#addEditMilestoneNew").height("auto");

}

function clearMilestoneFormDataNew() {
    $("#amilestoneRecNoneEdit").css('display', 'none');
    $("#amilestoneRecEdit").css('display', 'none');
    $("#txtMilestoneNewText").val("");
    $("#txtMilestoneIDNew").val("");
    $("#txtMilestoneTitleNew").val("");
    $('#ddlMilestoneTypeNew').val("0");
    $("#dtMilestoneDateNew").val("");
    $("#ddlMilestoneNewPriority").val("Medium");
    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
    var vAccFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "11" && n.Status == "ON");
    });
    //if (projMgrs != "" && vAccFeat.length > 0) {
    //   GetValuesAndAutoPopulate("ddlSendReminderToNew", "{Project Managers}");
    //} else {
    GetValuesAndAutoPopulate("ddlSendReminderToNew", "");
    //}

    $("#txtReminder1MilestoneNew").val("");
    $("#txtReminder2MilestoneNew").val("");
    $("#txtReminder3MilestoneNew").val("");
    $("#ddlReminder1MilestoneNew").val("before");
    $("#ddlReminder2MilestoneNew").val("before");
    $("#ddlReminder3MilestoneNew").val("before");

    $("#lblCTitleNew").text($("#txtContractTitle").val());
    $(".validelement").each(function (index, element) {
        $(element).removeClass("error");
        $("#errormsg_" + element.id).remove();
    });
    GetValuesAndAutoPopulate("ddlMilestoneOwnerNew", localStorage.UserName);

    GetValuesAndAutoPopulate("ddlSendReminderToNew", localStorage.UserName);

    $("#ddlMilestoneNewStatus").removeClass("error");

    $('#ddlMilestoneNewStatus').val('Upcoming');

    $('#ddlMilestoneOccurencess').val('None');

    $("#dtMilestoneNewCompletedDate").val("");
}

var jqXHR = "";
function BindPeople() {
    try {
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/userrolesetting',
            type: 'GET',
            dataType: 'json',
            headers: {
                'eContracts-ApiKey': localStorage.APIKey
            },
            cache: false,
            async: false,
            success: function (Settingdata) {
                if (Settingdata.length != 0) {
                    SettingUserRole = Settingdata[0].UserRoleSetting;
                }
            },
            error: function (data) {
            }
        });
        jqXHR = $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/users',
            type: 'GET',
            dataType: 'json',
            'Content-Type': 'application/json',
            cache: false,
            headers: {
                'eContracts-ApiKey': localStorage.APIKey
            },
            success: function (data) {
                var roleoption = '';
                var rolestype = SettingUserRole;
                $(SettingUserRole).find('Roles').each(function () {
                    var role = $(this).find('Role').text();
                    roleoption += '<option value="[' + role + ']">[' + role + ']</option>';
                });
                //$("#ddlSendRenewReminderTo").append(roleoption);
                $("#ddlSendReminderToNew").append(roleoption);
                //$("#ddlDocRemindTo").append(roleoption);
                //$("#ddlDocRemindToEdit").append(roleoption);
                //$("#ddlSendReminderToObligationNew").append(roleoption);
                var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
                var vAccFeat = $.grep(veContractFeatures, function (n, i) {
                    return (n.RowKey == "11" && n.Status == "ON");
                });
                if (!(vAccFeat.length > 0)) {
                    var valueRem = "{Project Managers}";
                    //$("#ddlSendRenewReminderTo option[value='" + valueRem + "']").remove();
                    $("#ddlSendReminderToNew option[value='" + valueRem + "']").remove();
                    //$("#ddlDocRemindTo option[value='" + valueRem + "']").remove();
                    //$("#ddlDocRemindToEdit option[value='" + valueRem + "']").remove();
                    //$("#ddlSendReminderToObligationNew option[value='" + valueRem + "']").remove();
                }

                var v = $(data).length;
                var datalenght = data.length;
                for (var i = 0; i < datalenght; i++) {
                    var item = data[i];
                    var sRowKey = item.RowKey;
                    var sUserName = item.UserName;
                    var sUserType = item.UserType;
                    var sEmail = item.EmailID;
                    //if (sUserType.indexOf("Global Contract Owner") >= 0) {
                    //    arrGlobalUser.push(sUserName);
                    //} else {
                    //    arrUser.push(sUserName);
                    //}
                    var articleemailuser = '<option value="' + sUserName + '" data-emailvalue="' + sEmail + '">' + sUserName + '</option>';
                    var article = '<option value="' + sUserName + '" disabled>' + sUserName + '</option>';
                    var articleReminder = '<option value="' + sUserName + '">' + sUserName + '</option>';
                    //$("#ddlContractManagers").append(article);
                    //$("#ddlReviewers").append(article);
                    //$("#ddlApproversNew").append(article);
                    //$("#ddlSignees").append(article);
                    //$("#ddlMilestoneOwner").append(article);
                    //$("#ddlObligationOwner").append(article);
                    //$("#ddlSendTo").append(article);
                    //$("#ddlSendToCancel").append(article);
                    //$("#ddlDocumentShareInternal").append(articleemailuser);
                    //$("#ddlContractShareInternal").append(articleemailuser);

                    ////Obligation Newly Added

                    //$("#ddlObligationNewOwner").append(article);

                    $("#ddlMilestoneOwnerNew").append(article);
                    $("#ddlSendReminderToNew").append(articleReminder);
                    //$("#ddlSendUserToRenewalConfirmUsers").append(article);
                    //$("#ddlSendUserToRenewalConfirmUsersCC").append(article);
                    //$("#ddlRenewalNotfInternalNew").append(article);
                    //$("#ddlReadOnly").append(article);
                    //$("#ddlReadWrite").append(article);
                    //$("#ddlFullControl").append(article);

                    //$("#ddlCC").append(article);
                    //$("#ddlWorkflowCC").append(article);
                    //$("#ddlWorkflowCCRenew").append(article);
                    //$("#ddlSendReminderTo").append(article);
                    //$("#ddlRenewalNotfInternal").append(article);


                    //$("#ddlRequestedBy").append(article);
                    //$("#ddlSendRenewReminderTo").append(article);
                    //$("#ddlSendReminderToObligationNew").append(article);


                    //$("#ddlDocRemindTo").append(article);
                    //$("#ddlDocRemindToEdit").append(article);
                    //$("#ddlAuthorCreate").append(article);
                    //$("#ddlAuthorEdit").append(article);
                }
                //$("#ddlDocumentList").chosen();

                //$("#ddlContractManagers").chosen();
                //$("#ddlReviewers").chosen();
                //$("#ddlApproversNew").chosen();
                //$("#ddlSignees").chosen();
                //$("#ddlMilestoneOwner").chosen();
                //$("#ddlObligationOwner").chosen();
                //$("#ddlDocumentShareInternal").chosen();
                //$("#ddlContractShareInternal").chosen();
                ////Newly added For Obligation New
                //$("#ddlRenewalNotfInternalNew").chosen();
                //$("#ddlObligationNewOwner").chosen();


                $("#ddlMilestoneOwnerNew").chosen();
                $("#ddlSendReminderToNew").chosen();
                //$("#ddlSendTo").chosen();
                //$("#ddlSendToCancel").chosen();

                //$("#ddlCC").chosen();
                //$("#ddlSendReminderTo").chosen();
                //$("#ddlRenewalNotfInternal").chosen();
                //$("#ddlReadOnly").chosen();
                //$("#ddlReadWrite").chosen();
                //$("#ddlFullControl").chosen();
                //$("#ddlSendUserToRenewalConfirmUsers").chosen();
                //$("#ddlSendUserToRenewalConfirmUsersCC").chosen();

                //$("#ddlSendReminderToObligationNew").chosen();
                //$("#ddlDocRemindTo").chosen();
                //$("#ddlDocRemindToEdit").chosen();
                //$("#ddlWorkflowCC").chosen();
                //$("#ddlWorkflowCCRenew").chosen();
                //$("#ddlRequestedBy").chosen();
                //$("#ddlAuthorEdit").chosen();
                //$("#ddlSendRenewReminderTo").chosen();

                //$("#ddlAuthorCreate").chosen().trigger("chosen:updated");
                $('.chosenmulti').on('chosen:showing_dropdown', function (evt, params) {
                    $('.result-selected').css('display', 'none');
                });

                //if (localStorage.UserName != "") {
                //    GetValuesAndAutoPopulate("ddlAuthorCreate", localStorage.UserName);
                //}
            },
            error:
                function (data) {
                }
        });
    } catch (exdsfdsf) {
        alert(exdsfdsf);
    }
}

function BindMilestoneTypes() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/milestonetypes',
        type: 'GET',
        dataType: 'json',
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        cache: false,
        success: function (documenttypes) {
            $(documenttypes).each(function (i, item) {
                //$("#ddlMilestoneType").append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>");
                $("#ddlMilestoneTypeNew").append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>");
            });
        }
    });
}

$("#ddlMilestoneTypeNew").change(function (obj) {
    if ($("#ddlMilestoneTypeNew").val() != "0") {
        var string1 = $("#ddlMilestoneTypeNew").val();
        var string2 = string1 + " for " + $("#txtContractTitle").val();
        if ($('#txtMilestoneTitleNew').val() == null || $('#txtMilestoneTitleNew').val() == "") {
            $('#txtMilestoneTitleNew').val(string2)
        }
        else {
            var update = false;
            var oldString = "";
            $("#ddlMilestoneTypeNew option").each(function () {
                if ($(this).val() != 0) {
                    var value = $(this).val() + " for";
                    if ($('#txtMilestoneTitleNew').val().indexOf(value) > -1) {
                        oldString = $(this).val();
                        update = true;
                    }
                }
            });
            if (update) {
                string2 = string1 + " " + $('#txtMilestoneTitleNew').val().substring(($('#txtMilestoneTitleNew').val().indexOf(" for ")) + 1);
                $('#txtMilestoneTitleNew').val(string2)
            }
        }
    }
    else {
        if ($('#txtMilestoneTitleNew').val() == null || $('#txtMilestoneTitleNew').val() == "") {
            $('#txtMilestoneTitleNew').val("")
        }
    }
});

function formatDatemile(date) {

    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}
//manoj
function validatemilestonedate() {
    if (requiredValidator('addNewMilestoneNew')) {
        if (comparedatestatus($.datepicker.formatDate('mm/dd/yy', $("#dtMilestoneDateNew").datepicker('getDate')), $("#ddlMilestoneNewStatus").val())) {
            var datevalidationallow = true;
            if ($("#txtMilestoneTitleNew").val() == "Start Date" && typeof ($("#StartDate").val()) != 'undefined') {
                if ($("#StartDate").val() != "") {
                    if (!comparedatesmile($.datepicker.formatDate('mm/dd/yy', $("#dtMilestoneDateNew").datepicker('getDate')), $("#StartDate").datepicker('getDate'))) {
                        //datevalidationexists = true;
                        datevalidationallow = false;
                        swal("", "Start date should be less than the end date milestone.");
                    }
                }
            }
            if ($("#txtMilestoneTitleNew").val() == "End Date" && typeof ($("#EndDate").val()) != 'undefined' && allow) {
                if ($("#EndDate").val() != "") {
                    if (!comparedatesmile(cStartDate, $.datepicker.formatDate('mm/dd/yy', $("#dtMilestoneDateNew").datepicker('getDate')))) {
                        datevalidationallow = false;
                        swal("", "End date should be greater than start date milestone.");
                    }
                }
            }
            if (datevalidationallow) {
                var start = moment($.datepicker.formatDate('mm/dd/yy', $("#dtMilestoneDateNew").datepicker('getDate')));
                var today = new Date();
                var end = moment(today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear());
                var vv = start.diff(end, "days");
                var vRenminder = '';
                var swalFlag = false;
                var blUpdate = true;
                //isformvalid = true;

                var oDate = false;
                if ($("#ddlReminder1MilestoneNew").val() == "before") {
                    if (vv <= parseInt($("#txtReminder1MilestoneNew").val())) {
                        oDate = true;
                    }
                }
                else {
                    oDate = false;
                }

                if ($("#ddlReminder2MilestoneNew").val() == "before") {
                    if (vv <= parseInt($("#txtReminder2MilestoneNew").val())) {
                        oDate = true;
                    }
                }
                else {
                    oDate = false;
                }

                if ($("#ddlReminder3MilestoneNew").val() == "before") {
                    if (vv <= parseInt($("#txtReminder3MilestoneNew").val())) {
                        oDate = true;
                    }
                }
                else {
                    oDate = false;
                }
                if (oDate) {
                    swal({
                        title: '',
                        text: "Reminders are out of date. Are you sure you want to save?",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Yes',
                        cancelButtonText: 'No',
                        html: true
                    },
                     function (confirmed) {
                         if (confirmed) {
                             milestonebuttonclick = true;
                             createmilestonediv();
                         }
                     });
                }
                else {
                    milestonebuttonclick = true;
                    createmilestonediv();
                }

                //isformvalid = blUpdate
            }
            //} else {
            //    //isformvalid = false;
            //    swal("", "Mile stone title already exists.");
            //}
        } else {
            $("#ddlMilestoneNewStatus").addClass('error');
            $('html, body').animate({ scrollTop: 0 }, 'fast');
        }
    }
}

function comparedatesmile(firstDate, secondDate) {

    var isvalid = true;
    if (firstDate != null && firstDate != '' &&
        secondDate != null && secondDate != '') {

        var dt1 = new Date(firstDate);
        var dt2 = new Date(secondDate);

        var dateOne = new Date(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()); //Year, Month, Date
        var dateTwo = new Date(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()); //Year, Month, Date

        if (dateOne > dateTwo) {
            isvalid = false;
        } else {
            isvalid = true;
        }
    }
    return isvalid;
}
//manoj
function comparedatestatus(firstDate, status) {
    var isvalid = true;
    if (firstDate != null && firstDate != '' &&
        status != null && status != '') {
        if (status == "Upcoming") {
            var dt1 = new Date(firstDate);
            var dt2 = new Date();


            var dateOne = new Date(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()); //Year, Month, Date
            var dateTwo = new Date(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()); //Year, Month, Date

            if (dateOne > dateTwo) {
                isvalid = true;
            } else {
                isvalid = false;
            }

        }
        else if (status == "Delayed") {

            var dt1 = new Date(firstDate);
            var dt2 = new Date();

            var dateOne = new Date(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()); //Year, Month, Date
            var dateTwo = new Date(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()); //Year, Month, Date

            if (dateOne < dateTwo) {
                isvalid = true;
            } else {
                isvalid = false;
            }

        }
    }
    return isvalid;
}

function createmilestonediv() {
    var arrMilestoneOwner = $("#ddlMilestoneOwnerNew :selected").val();
    var vMilestoneOwner = arrMilestoneOwner;
    //$(arrMilestoneOwner).each(function (i, item) {
    //    if (vMilestoneOwner == '') {
    //        vMilestoneOwner = item;
    //    }
    //    else {
    //        vMilestoneOwner += "; " + item;
    //    }
    //});
    arrMilestoneOwner = [];

    var SendReminderToArr = $("#ddlSendReminderToNew").val();
    var vSendReminderTo = '';
    $(SendReminderToArr).each(function (i, item) {
        if (vSendReminderTo == '') {
            vSendReminderTo = item;
        }
        else {
            vSendReminderTo += "; " + item;
        }
    });
    SendReminderToArr = [];
    var datepickevalue = $.datepicker.formatDate('mm/dd/yy', $("#dtMilestoneDateNew").datepicker('getDate'))
    $("#divcustommilestone").append("<div id='div" + $("#hdnfieldname").text() + "'>"
    + "<input id='hdMilestoneTitle' class='milestonetitle' value='" + $("#txtMilestoneTitleNew").val() + "' type='hidden' />"
    + "<input id='hdMilestoneType' value='" + $("#ddlMilestoneTypeNew").find('option:selected').text() + "' type='hidden' />"
    + "<input id='hdnMilestoneDate' value='" + datepickevalue + "' type='hidden' />"
    + "<input id='hdnMilestoneDescription' value='" + $("#txtMileDescriptionNew").val() + "' type='hidden' />"
    + "<input id='hdnShowInCalendar' value='" + $('input[name=ShowInCalendarNew]:checked').val() + "' type='hidden' />"
    + "<input id='hdnAutoComplete' value='" + $('input[type="radio"][name=MilestoneNewAutoComplete]:checked').val() + "' type='hidden' />"
    + "<input id='hdnMilestoneOwner' value='" + vMilestoneOwner + "' type='hidden' />"
    + "<input id='hdnPriority' value='" + $("#ddlMilestoneNewPriority").find('option:selected').text() + "' type='hidden' />"
    + "<input id='hdnSendReminderTo' value='" + vSendReminderTo + "' type='hidden' />"
    + "<input id='hdnReminder1' value='" + $("#txtReminder1MilestoneNew").val() + "' type='hidden' />"
    + "<input id='hdnReminder2' value='" + $("#txtReminder2MilestoneNew").val() + "' type='hidden' />"
    + "<input id='hdnReminder3' value='" + $("#txtReminder3MilestoneNew").val() + "' type='hidden' />"
    + "<input id='hdnReminder1Condition' value='" + encodeURIComponent($("#ddlReminder1MilestoneNew").find('option:selected').text()) + "' type='hidden' />"
    + "<input id='hdnReminder2Condition' value='" + encodeURIComponent($("#ddlReminder2MilestoneNew").find('option:selected').text()) + "' type='hidden' />"
    + "<input id='hdnReminder3Condition' value='" + encodeURIComponent($("#ddlReminder3MilestoneNew").find('option:selected').text()) + "' type='hidden' />"
    + "<input id='hdnMilestoneStatus' value='" + encodeURIComponent($("#ddlMilestoneNewStatus").find('option:selected').text()) + "' type='hidden' />"
    + "<input id='hdnAlertsEnabled'  value='" + $("#AlertMile").val() + "' type='hidden' /></div>");
    $("#addEditMilestoneNew").dialog("close");
}


function CustomDateFieldChange(Dateobj) {
    var divdateobj = document.getElementById("divcustommile" + Dateobj.id);
    if (typeof divdateobj != 'undefined' && divdateobj != null) {
        if ($("#" + Dateobj.id).datepicker('getDate') != null) {
            $(divdateobj).find("#hdnMilestoneDate").val($.datepicker.formatDate('mm/dd/yy', $("#" + Dateobj.id).datepicker('getDate')))
        } else {
            var elem = document.getElementById('divcustommilestone');
            if (typeof elem != 'undefined' && elem != null) {
                $("#divcustommile" + Dateobj.id).remove();
                $("#custommile" + Dateobj.id).attr('checked', false);
            }
        }
    }
}
//manoj

//CounterParty Businessarea

var BAOwnersselecteditems = [];
function ViewOwnerofBusinessArea() {

    $('#txtBAOwnerofPath').val("");
    $('#txtBAOwnerof').val("");


    if ($("#txtOwnerofBusinessArea").val() != "") {
        //BAOwnersselecteditems = $("#txtOwnerofBusinessArea").val().split(';');
        var selecteditemslength = BAOwnersselecteditems.length;
        selectedBusinessAreaID11Temp = [];
        $(selectedBusinessAreaID11).each(function (i, item) {
            selectedBusinessAreaID11Temp.push(item);
        })


        $('#liSelectedBAOwners').html("");
        var arrRemovedIndexs = [];
        for (var i = 0; i < selecteditemslength; i++) {
            var re = new RegExp(" ", 'g');
            var str = BAOwnersselecteditems[i].trim().replace(re, '').trim();
            str = str.substring(str.lastIndexOf(">") + 1, str.length);
            if (selectedBusinessAreaID11.length >= i + 1) {
                if (thisBusinessAreaNameRowKey == selectedBusinessAreaID11[i][1])
                    $('#liSelectedBAOwners').append('<span id="BAF_' + str + '" style="font-size:11px;">' + BAOwnersselecteditems[i].trim().substring(BAOwnersselecteditems[i].trim().lastIndexOf(">") + 1, BAOwnersselecteditems[i].trim().length).trim() + '</span>');
                else
                    $('#liSelectedBAOwners').append('<span id="BAF_' + str + '" style="font-size:11px;">' + BAOwnersselecteditems[i].trim().substring(BAOwnersselecteditems[i].trim().lastIndexOf(">") + 1, BAOwnersselecteditems[i].trim().length).trim() + '<img src="/Content/Images/close-quick.png" id=' + selectedBusinessAreaID11[i][1] + ' onclick="javascript:liRemoveBAOwnersselecteditems(this,' + BAOwnersselecteditems.indexOf(BAOwnersselecteditems[i]) + ');" style="float:right" /></span>');
            }
            else {
                arrRemovedIndexs.push(BAOwnersselecteditems[i]);
            }
        }
        if (arrRemovedIndexs.length > 0) {
            $.each(arrRemovedIndexs, function (index, value) {
                var index = BAOwnersselecteditems.indexOf(value);
                BAOwnersselecteditems.splice(index, 1);
            });

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
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
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

            //$("#example-basic-11").treetable({ expandable: true, initialState: "expanded" },true);
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
                if (strContractAreaName11 == thisContractAreaNameC && item.BusinessAreaName == thisBusinessAreaNameC) {
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
        selectedBusinessAreaID11 = [];
        selectedBusinessAreaID11Temp = [];
        BAOwnersselecteditems = [];
    }
    else if (this.value == 'No') {
        if (thisBusinessAreaNameC == "") {
            addDefaultBusinessareaCounterparty();
        }
        else {
            addDefaultBusinessareaCounterpartyInBA();
        }
        $("#trcp-RgBusi").show();
        $("#txtOwnerofBusinessArea").addClass("validelement");
        //manoj
        $("#RelatedCounterparties").val('');
        PrvRelatedCounterparities = [];
        arrRelatedCounterparities = [];
        curRelatedCounterparities = [];
        //manoj
    }
});
var selectedBusinessAreaID11 = [];
var selectedBusinessAreaID11Temp = [];
var DeletedBusinessAreaID = [];
function treeviewclick11(obj) {
    var strBusinessAreaName = obj.textContent;
    var rowKey = obj.parentNode.parentNode.childNodes[2].textContent;
    var parentBusinessAreaID = obj.parentNode.parentNode.childNodes[1].textContent;
    var contractAreaName = obj.parentNode.parentNode.childNodes[3].textContent;
    var contractAreaNameOwner = obj.parentNode.parentNode.childNodes[4].textContent;


    $('#txtBAOwnerofPath').val(parentBusinessAreaID);
    $('#txtBAOwnerof').val(strBusinessAreaName);

    //// Find and remove item from an array
    //var i = BAOwnersselecteditems.indexOf(strBusinessAreaName);
    //if (i != -1) {

    //} else {
    //    BAOwnersselecteditems.push(strBusinessAreaName);
    //    $('#liSelectedBAOwners').append('<span style="font-size:11px;">' + strBusinessAreaName + '<img src="/Content/Images/close-quick.png" id=' + rowKey + ' onclick="javascript:liRemoveBAOwnersselecteditems(this);" style="float:right" /></span>');
    //}
    //$('#txtBAOwnerof').val(BAOwnersselecteditems);

    var found = $.grep(selectedBusinessAreaID11Temp, function (value) {
        return value[1] == rowKey;
    });

    //  var i = selectedBusinessAreaID11.indexOf(rowKey);
    if (found != null && typeof (found) != "undefined" && found.length != 0) {

    } else {
        var rowK = jQuery.grep(BusinessAreaPathRowKey, function (a) {
            return a[1] === rowKey;
        });
        if (rowK != null && typeof (rowK) != "undefined" && rowK.length != 0) {
            selectedBusinessAreaID11Temp = $.grep(selectedBusinessAreaID11Temp, function (value) {
                return value[1] != rowK[0][1];
            });
            selectedBusinessAreaID11Temp.push([rowK[0][0], rowK[0][1]]);

            // Find and remove item from an array
            var i = BAOwnersselecteditems.indexOf(rowK[0][0]);
            if (i != -1) {

            } else {
                BAOwnersselecteditems.push(rowK[0][0]);
                $('#liSelectedBAOwners').append('<span style="font-size:11px;">' + strBusinessAreaName + '<img src="/Content/Images/close-quick.png" id=' + rowKey + ' onclick="javascript:liRemoveBAOwnersselecteditems(this);" style="float:right" /></span>');
            }
            $('#txtBAOwnerof').val(BAOwnersselecteditems);
        }

    }
}


function liRemoveBAOwnersselecteditems(obj) {

    var child = obj.parentNode;
    var rowK = jQuery.grep(BusinessAreaPathRowKey, function (a) {
        return a[1] === obj.id;
    });
    var i = BAOwnersselecteditems.indexOf(rowK[0][0]);
    if (i != -1) {
        BAOwnersselecteditems.splice(i, 1);
    }
    child.parentNode.removeChild(child);

    //remove id from array
    selectedBusinessAreaID11Temp = $.grep(selectedBusinessAreaID11Temp, function (value) {
        return value[1] != obj.id;
    });

}
function liRemoveBAOwnersselecteditems(obj, index) {

    var child = obj.parentNode;
    var rowK = jQuery.grep(BusinessAreaPathRowKey, function (a) {
        return a[1] === obj.id;
    });
    var innertextvale = child.textContent;
    index = BAOwnersselecteditems.indexOf(rowK[0][0]);
    child.parentNode.removeChild(child);
    if (index != -1) {
        BAOwnersselecteditems.splice(index, 1);
    }
    DeletedBusinessAreaID.push(obj.id);
    //remove id from array
    selectedBusinessAreaID11Temp = $.grep(selectedBusinessAreaID11Temp, function (value) {
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
            headers: {
                'eContracts-ApiKey': localStorage.APIKey
            },
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
                    if (strContractAreaName12Counterp == thisContractAreaNameC && item.BusinessAreaName == thisBusinessAreaNameC) {
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
                if (strContractAreaNameCounterp == thisContractAreaNameC && item.BusinessAreaName == thisBusinessAreaNameC) {
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
function addDefaultBusinessareaCounterparty(path, Name) {
    var rowK = jQuery.grep(BusinessAreaPathRowKey, function (a) {
        return a[0] === path;
    });
    if (typeof (rowK) != "undefined" && rowK != null && rowK.length != 0) {
        var thisBusinessAreaNameCb = Name;
        var thisBusinessAreaNameRowKeyb = rowK[0][1];
        $('#txtBAOwnerof').val(thisBusinessAreaNameCb);

        // Find and remove item from an array
        var i = BAOwnersselecteditems.indexOf(path);
        if (i != -1) {

        } else {
            BAOwnersselecteditems.push(path);
            $('#liSelectedBAOwners').append('<span style="font-size:11px;">' + thisBusinessAreaNameCb + '</span>');
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
                selectedBusinessAreaID11.push([rowK[0][0], rowK[0][1]]);
                selectedBusinessAreaID11Temp.push([rowK[0][0], rowK[0][1]]);
            }

        }
        var strValue = "";
        $(selectedBusinessAreaID11).each(function (i, item) {
            strValue = item[0].trim().substring(item[0].trim().lastIndexOf(">") + 1, item[0].trim().length).trim() + ";";
        });
        var lastChar = strValue.slice(-1);
        if (lastChar == ";") {
            strValue = strValue.slice(0, -1);
        }
        $("#txtOwnerofBusinessArea").val(strValue);
    }

}

function addDefaultBusinessareaCounterpartyInBA() {


    $('#txtBAOwnerofPath').val(thisContractAreaNameRowKey);
    $('#txtBAOwnerof').val(thisBusinessAreaNameC);

    // Find and remove item from an array
    var i = BAOwnersselecteditems.indexOf(thisBusinessAreaPath);
    if (i != -1) {

    } else {
        BAOwnersselecteditems.push(thisBusinessAreaPath);
        $('#liSelectedBAOwners').append('<span style="font-size:11px;">' + thisBusinessAreaNameC + '</span>');
    }
    $('#txtBAOwnerof').val(BAOwnersselecteditems);

    var found = $.grep(selectedBusinessAreaID11, function (value) {
        return value[1] == thisBusinessAreaNameRowKey;
    });

    //  var i = selectedBusinessAreaID11.indexOf(rowKey);
    if (found != null && typeof (found) != "undefined" && found.length != 0) {

    } else {
        var rowK = jQuery.grep(BusinessAreaPathRowKey, function (a) {
            return a[1] === thisBusinessAreaNameRowKey;
        });
        if (rowK != null && typeof (rowK) != "undefined" && rowK.length != 0) {
            selectedBusinessAreaID11 = $.grep(selectedBusinessAreaID11, function (value) {
                return value[1] != rowK[0][1];
            });
            selectedBusinessAreaID11.push([rowK[0][0], rowK[0][1]]);
            selectedBusinessAreaID11Temp.push([rowK[0][0], rowK[0][1]]);
        }

    }
    var strValue = "";
    $(selectedBusinessAreaID11).each(function (i, item) {
        strValue = item[0].trim().substring(item[0].trim().lastIndexOf(">") + 1, item[0].trim().length).trim() + ";";
    });
    var lastChar = strValue.slice(-1);
    if (lastChar == ";") {
        strValue = strValue.slice(0, -1);
    }
    $("#txtOwnerofBusinessArea").val(strValue);
}
function addDefaultBusinessareaCounterparty() {


    $('#txtBAOwnerofPath').val(treeBusinessAreaParentBusinessAreaID);
    $('#txtBAOwnerof').val(treeBusinessAreaName);

    // Find and remove item from an array
    var i = BAOwnersselecteditems.indexOf(thisBusinessAreaPath);
    if (i != -1) {

    } else {
        BAOwnersselecteditems.push(thisBusinessAreaPath);
        $('#liSelectedBAOwners').append('<span style="font-size:11px;">' + treeBusinessAreaName + '</span>');
    }

    $('#txtBAOwnerof').val(BAOwnersselecteditems);


    var found = $.grep(selectedBusinessAreaID11, function (value) {
        return value[1] == treeBusinessAreaRowKey;
    });

    //  var i = selectedBusinessAreaID11.indexOf(rowKey);
    if (found != null && typeof (found) != "undefined" && found.length != 0) {

    } else {
        var rowK = jQuery.grep(BusinessAreaPathRowKey, function (a) {
            return a[1] === treeBusinessAreaRowKey;
        });
        if (rowK != null && typeof (rowK) != "undefined" && rowK.length != 0) {
            selectedBusinessAreaID11 = $.grep(selectedBusinessAreaID11, function (value) {
                return value[1] != rowK[0][1];
            });
            selectedBusinessAreaID11.push([rowK[0][0], rowK[0][1]]);
            selectedBusinessAreaID11Temp.push([rowK[0][0], rowK[0][1]]);
        }

    }
    var strValue = "";
    $(selectedBusinessAreaID11).each(function (i, item) {
        strValue = item[0].trim().substring(item[0].trim().lastIndexOf(">") + 1, item[0].trim().length).trim() + ";";
    });
    var lastChar = strValue.slice(-1);
    if (lastChar == ";") {
        strValue = strValue.slice(0, -1);
    }
    $("#txtOwnerofBusinessArea").val(strValue);
}

$(".switch_val").change(function () {
    var obj = jQuery(this).parent();
    var input_val = obj.children('input').val();
    $(obj).removeClass('switch_enable');
    $(obj).removeClass('switch_disable');
    if ("0" == input_val || "No" == input_val) {
        $(obj).addClass('switch_disable');
    } else if ("1" == input_val || "Yes" == input_val) {
        $(obj).addClass('switch_enable');
    }
});

function changecurrecytype() {
    if ($("#ContractCurrency").find('option:selected').val() != '0') {
        $('.contractcurrencyabbrivation').each(function () {
            $(this).text($("#ContractCurrency").val());
        });
    } else {
        $('.contractcurrencyabbrivation').each(function () {
            $(this).text("");
        });
    }
}
function BindContractRelationships() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contractrelationships',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        success: function (data) {
            var options = "";
            if (data == null || data == "") {
                var relationshipType = "Master Agreement-Sub-Agreement/SOW;Prime Contractor Agreement-Sub Contractor Agreement;Blanket Agreement-Order/Invoice;Original-Duplicate/Copy;Past Contract-Renegotiated Contract;Primary Contract-Amendment/Modification;Other";
                var relationship1 = "Master Agreement;Prime Contractor Agreement;Blanket Agreement;Original;Past Contract;Primary Contract;Other";
                var relationship2 = "Sub-Agreement/SOW;Sub Contractor Agreement;Order/Invoice;Duplicate/Copy;Renegotiated Contract;Amendment/Modification;Other";
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/addrelationshipsettings?relationshiptypes=' + relationshipType + '&rel1=' + relationship1 + '&rel2=' + relationship2,
                    type: 'PUT',
                    dataType: 'json',
                    headers: {
                        'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging
                    },
                    cache: false,
                    success: function (data) {
                        $(data).each(function (i, item) {

                            var Relationship2 = [];
                            //Get all the relationship2 names
                            $(item.Relationship2).find('RelationshipName').each(function () {
                                var Relationship2each = $(this).text();
                                if (Relationship2each != null && typeof (Relationship2each) != "undefined" && Relationship2each != "")
                                    Relationship2.push(Relationship2each)
                            });
                            RelationshipTypes.push([item.RelationshipType, item.Relationship1, Relationship2]);
                            options += '<option value="' + item.RelationshipType + '">' + item.RelationshipType + '</option>';
                        });
                        $("#ddlRelationshipType").append(options);
                    },
                    error: function (person) {
                        RelationshipTypes = [];
                    }
                });
            }
            else {
                $(data).each(function (i, item) {

                    var Relationship2 = [];
                    //Get all the relationship2 names
                    $(item.Relationship2).find('RelationshipName').each(function () {
                        var Relationship2each = $(this).text();
                        if (Relationship2each != null && typeof (Relationship2each) != "undefined" && Relationship2each != "")
                            Relationship2.push(Relationship2each)
                    });
                    RelationshipTypes.push([item.RelationshipType, item.Relationship1, Relationship2]);
                    options += '<option value="' + item.RelationshipType + '">' + item.RelationshipType + '</option>';
                });
                $("#ddlRelationshipType").append(options);
            }
        },
        error: function (data) {
            var options = "";
            var relationshipType = "Master Agreement-Sub-Agreement/SOW;Prime Contractor Agreement-Sub Contractor Agreement;Blanket Agreement-Order/Invoice;Original-Duplicate/Copy;Past Contract-Renegotiated Contract;Primary Contract-Amendment/Modification;Other";
            var relationship1 = "Master Agreement;Prime Contractor Agreement;Blanket Agreement;Original;Past Contract;Primary Contract;Other";
            var relationship2 = "Sub-Agreement/SOW;Sub Contractor Agreement;Order/Invoice;Duplicate/Copy;Renegotiated Contract;Amendment/Modification;Other";
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/addrelationshipsettings?relationshiptypes=' + relationshipType + '&rel1=' + relationship1 + '&rel2=' + relationship2,
                type: 'PUT',
                dataType: 'json',
                headers: {
                    'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging
                },
                cache: false,
                success: function (data) {
                    $(data).each(function (i, item) {

                        var Relationship2 = [];
                        //Get all the relationship2 names
                        $(item.Relationship2).find('RelationshipName').each(function () {
                            var Relationship2each = $(this).text();
                            if (Relationship2each != null && typeof (Relationship2each) != "undefined" && Relationship2each != "")
                                Relationship2.push(Relationship2each)
                        });
                        RelationshipTypes.push([item.RelationshipType, item.Relationship1, Relationship2]);
                        options += '<option value="' + item.RelationshipType + '">' + item.RelationshipType + '</option>';
                    });
                    $("#ddlRelationshipType").append(options);
                },
                error: function (person) {
                    RelationshipTypes = [];
                }
            });
        }
    });
}

//Sridhar
function enableMilestoneSwitch() {
    $("#AlertMile").val('Yes').change();
    //$("#enableSwitch").parent().remove();
    $("#reminderEnable").empty();
    $("#reminderEnable").append("Reminders <span style='font-size: 16px;font-weight: 600;color: red;margin-left: 20%;font: inherit;'>To turn OFF reminders for milestone notifications, click <a href='javascript:void(0);' id='disableSwitch' onclick='disableMilestoneSwitch()'>Disable</a></span>")
}

function disableMilestoneSwitch() {
    $("#AlertMile").val('No').change();
    //$("#enableSwitch").parent().remove();
    $("#reminderEnable").empty();
    $("#reminderEnable").append("Reminders <span style='font-size: 16px;font-weight: 600;color: red;margin-left: 20%;font: inherit;'>To turn ON reminders for milestone notifications, click <a href='javascript:void(0);' id='enableSwitch' onclick='enableMilestoneSwitch()'>Enable</a></span>")
}

$("#AlertMile").change(function () {
    if (getParameterByName('Stage') == 'pipeline' || getParameterByName('Duplicate') == 'Yes') {
        if ($(this).val() == "Yes") {
            $("#reminderEnable").empty();
            $("#reminderEnable").append("Reminders <span style='font-size: 16px;font-weight: 600;color: red;margin-left: 20%;font: inherit;'>To turn OFF reminders for milestone notifications, click <a href='javascript:void(0);' id='disableSwitch' onclick='disableMilestoneSwitch()'>Disable</a></span>")
        }
        else if ($(this).val() == "No") {
            $("#reminderEnable").empty();
            $("#reminderEnable").append("Reminders <span style='font-size: 16px;font-weight: 600;color: red;margin-left: 20%;font: inherit;'>To turn ON reminders for milestone notifications, click <a href='javascript:void(0);' id='enableSwitch' onclick='enableMilestoneSwitch()'>Enable</a></span>")
        }
    }
});
//Sridhar

//manoj
//for Hyperlink
function navigateurl(obj) {
    if (typeof obj != 'undefined' && obj != null && obj != "") {
        var objvalue = $("#" + obj).val();
        var navigationresult = "";
        if (typeof objvalue != 'undefined' && objvalue != null && objvalue != "") {
            if (objvalue.trim() != "") {
                var reqularexprn = /^(http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i
                if (reqularexprn.test(objvalue)) {
                    navigationresult = "Valid"
                } else {
                    navigationresult = "Notvalid"
                }
            } else {
                navigationresult = "WhiteSpace";
            }
        } else {
            navigationresult = "Empty";
        }
        switch (navigationresult) {
            case "Valid": {
                window.open(objvalue);
                break;
            }
            case "Notvalid": {
                swal("", "Enter valid URL.");
                break;
            }
            case "WhiteSpace": {
                swal("", "URL should not contain whitespace.");
                break;
            }
            case "Empty": {
                swal("", "URL should not be empty.");
                break;
            }
        }
    }
}

//for Hyperlink
//manoj



function BindRelatedContractsFilters() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/getcontracttypesforrelatedcontracts',
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: {
            'eContracts-ApiKey': localStorage.APIKey, BusinessAreaLocation: businessAreaPath, UserID: localStorage.UserID
        },
        cache: false,
        success: function (ContractTypes) {
            $("#ddlRelConFilterContractType").empty();
            var control = "";
            var datalenght = ContractTypes.length;
            for (var i = 0; i < datalenght; i++) {
                var item = ContractTypes[i];
                control += "<option value=" + encodeURI(item.ContractType) + ">" + item.ContractType + "</option>";
            }

            $("#ddlRelConFilterContractType").append(control);
            $("#ddlRelConFilterContractType").chosen().trigger("chosen:updated");
        },
        error: function (ContractTypes) {

        }
    });

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/settings',
        type: 'GET',
        dataType: 'json',
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        cache: false,
        success: function (Settings) {
            var IsSystem = false;
            if (Settings.CounterpartyRelationshipScope.trim() == "System Level") {
                IsSystem = true;
            }
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty',
                type: 'GET',
                dataType: 'json',
                "Content-Type": "application/json",
                headers: {
                    'eContracts-ApiKey': localStorage.APIKey
                },
                cache: false,
                success: function (Counterparties) {
                    $("#ddlRelConFilterCounterparty").empty();
                    var control = "";
                    var datalenght = Counterparties.length;
                    for (var i = 0; i < datalenght; i++) {
                        var item = Counterparties[i];
                        if (item.Status == "Active") {
                            if (IsSystem) {
                                control += "<option value=" + encodeURI(item.CounterpartyName) + ">" + item.CounterpartyName + "</option>";
                            }
                            else {
                                if (typeof item.BusinessAreasPath != 'undefined' && item.BusinessAreasPath != null && item.BusinessAreasPath != "") {
                                    if (item.IsGlobal == "No") {
                                        if (businessAreaPath != "") {
                                            var isRelCounterpartyFilterAdd = false;
                                            $.each(item.BusinessAreasPath.split(";"), function () {
                                                if (businessAreaPath == $.trim(this)) {
                                                    isRelCounterpartyFilterAdd = true;
                                                }
                                            });
                                            if (isRelCounterpartyFilterAdd) {
                                                control += "<option value=" + encodeURI(item.CounterpartyName) + ">" + item.CounterpartyName + "</option>";
                                            }
                                        }
                                    }
                                    else {
                                        control += "<option value=" + encodeURI(item.CounterpartyName) + ">" + item.CounterpartyName + "</option>";
                                    }
                                }
                                else {
                                    control += "<option value=" + encodeURI(item.CounterpartyName) + ">" + item.CounterpartyName + "</option>";
                                }

                            }
                        }
                    }

                    $("#ddlRelConFilterCounterparty").append(control);
                    $("#ddlRelConFilterCounterparty").chosen().trigger("chosen:updated");
                },
                error: function (Counterparties) {

                }
            });


        },
        error: function (Settings) {
            var IsSystem = true;
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty',
                type: 'GET',
                dataType: 'json',
                "Content-Type": "application/json",
                headers: {
                    'eContracts-ApiKey': localStorage.APIKey
                },
                cache: false,
                success: function (Counterparties) {
                    $("#ddlRelConFilterCounterparty").empty();
                    var control = "";
                    var datalenght = Counterparties.length;
                    for (var i = 0; i < datalenght; i++) {
                        var item = Counterparties[i];
                        if (item.Status == "Active") {
                            if (IsSystem) {
                                control += "<option value=" + encodeURI(item.CounterpartyName) + ">" + item.CounterpartyName + "</option>";
                            }
                            else {
                                if (typeof item.BusinessAreasPath != 'undefined' && item.BusinessAreasPath != null && item.BusinessAreasPath != "") {
                                    if (item.IsGlobal == "No") {
                                        if (businessAreaPath != "") {
                                            var isRelCounterpartyFilterAdd = false;
                                            $.each(item.BusinessAreasPath.split(";"), function () {
                                                if (businessAreaPath == $.trim(this)) {
                                                    isRelCounterpartyFilterAdd = true;
                                                }
                                            });
                                            if (isRelCounterpartyFilterAdd) {
                                                control += "<option value=" + encodeURI(item.CounterpartyName) + ">" + item.CounterpartyName + "</option>";
                                            }
                                        }
                                    }
                                    else {
                                        control += "<option value=" + encodeURI(item.CounterpartyName) + ">" + item.CounterpartyName + "</option>";
                                    }
                                }
                                else {
                                    control += "<option value=" + encodeURI(item.CounterpartyName) + ">" + item.CounterpartyName + "</option>";
                                }

                            }
                        }
                    }

                    $("#ddlRelConFilterCounterparty").append(control);
                    $("#ddlRelConFilterCounterparty").chosen().trigger("chosen:updated");
                },
                error: function (Counterparties) {

                }
            });

        }
    });
}


function clearRelConSelection() {
    $("#ddlRelConFilterContractType option:selected").prop('selected', false).trigger('chosen:updated');
    $("#ddlRelConFilterCounterparty option:selected").prop('selected', false).trigger('chosen:updated');
    ViewContracts();
}

var removeLastChar = function (value, char) {
    var lastChar = value.slice(-1);
    if (lastChar == char) {
        value = value.slice(0, -1);
    }
    return value;
}

//manoj
function currentrelatedcounterparty(obj) {
    if (requiredValidator('popupCounterparties', false)) {
        if (curRelatedCounterparities.length > 0) {
            var curRelCuntprty = $.grep(curRelatedCounterparities, function (ncurRelatedCounterparities, icurRelatedCounterparities) {
                return (ncurRelatedCounterparities.RowKey != obj.id);
            });
            curRelatedCounterparities = curRelCuntprty;
        }
        if (obj != "" && obj.checked == true) {
            curRelatedCounterparities.push(
                {
                    RowKey: obj.id,
                    CounterpartyName: unescape(obj.value),
                    ChildRelationship: $(obj).parent().parent().children(".ddl").find('option:selected').text()
                });
        }
        //Add the List
        addselectedcounterparties();
        //Add the List
        //}
    }
    else {
        $("#" + obj.id).prop('checked', false);
        $("#" + obj.id).parent().parent().children(".ddl").empty();
    }
}

function changecounterpartychildrelationship(obj) {
    if (curRelatedCounterparities.length > 0) {
        var curRelCuntprty = $.grep(curRelatedCounterparities, function (ncurRelatedCounterparities, icurRelatedCounterparities) {
            return (ncurRelatedCounterparities.ChildRelationship = obj);
        });
        curRelatedCounterparities = curRelCuntprty;
        //Add the List
        addselectedcounterparties();
        //Add the List
    }
}

function addselectedcounterparties() {
    var SelectedCounterpartiesHTML = "";
    $(curRelatedCounterparities).each(function (i, item) {
        SelectedCounterpartiesHTML += '<span style="font-size:11px;" id=' + item.RowKey + '>' + item.CounterpartyName + ' (' + item.ChildRelationship + ') <img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveCounterPartyRelationshipselected(this);" style="float:right" /></span>'
    });
    $('#liSelectedCounterparties').html(SelectedCounterpartiesHTML);
}

//function liRemoveCounterPartyRelationshipselected(obj) {
//    var child = obj.parentNode;
//    var relatedcounterpartyidtodelete = child.id;
//    $("input[id='" + child.id + "'][name='RelatedCounterparty']:checkbox").prop('checked', false);
//    $("input[id='" + child.id + "'][name='RelatedCounterparty']:checkbox").trigger("onchange");
//}

function liRemoveCounterPartyRelationshipselected(obj) {
    var child = obj.parentNode;
    var relatedcounterpartyidtodelete = child.id;
    var allow = false;
    try {
        if (typeof ($("input[id='" + child.id + "'][name='RelatedCounterparty']:checkbox")) != 'undefined') {
            if ($("input[id='" + child.id + "'][name='RelatedCounterparty']:checkbox").length != 0) {
                $("input[id='" + child.id + "'][name='RelatedCounterparty']:checkbox").prop('checked', false);
                var dsfdsfsd = $("input[id='" + child.id + "'][name='RelatedCounterparty']:checkbox");
                $(dsfdsfsd).parent().parent().children(".ddl").empty();
                $("input[id='" + child.id + "'][name='RelatedCounterparty']:checkbox").trigger("onchange");
            } else {
                allow = true;
            }
        } else {
            allow = true;
        }
    } catch (excp) {
        allow = true;
    }
    if (allow) {
        if (curRelatedCounterparities.length > 0) {
            var curRelCuntprty = $.grep(curRelatedCounterparities, function (ncurRelatedCounterparities, icurRelatedCounterparities) {
                return (ncurRelatedCounterparities.RowKey != child.id);
            });
            curRelatedCounterparities = curRelCuntprty;
        }
        //Add the List
        addselectedcounterparties();
        //Add the List
    }
}
//manoj

//Sridhar
function CreateRelatedContractsList(page) {
    $("#tblPopupContracts").empty();
    relatedContractsTag = [];
    var startIndex = page * 10;
    var endIndex = startIndex + 10;
    if (endIndex > listRelatedContracts.length) endIndex = listRelatedContracts.length;
    for (var i = startIndex; i < endIndex; i++) {
        var item = listRelatedContracts[i];
        if (ContractID.indexOf(item.RowKey) > -1) { }
        else {
            if (arroldRelatedcontract.indexOf(item.ContractTitle.trim()) >= 0) {

            } else if (SavedRelatedContract.indexOf(item.ContractTitle.trim()) == -1) {
                var article = '<tr><td>';
                if (arrRelatedcontractRowkey.indexOf(item.RowKey.trim()) >= 0) {
                    article += '<input id="' + item.RowKey + '" type="checkbox" name="RelatedContract" onchange="javascript:collectrelatedcontractrowkey(this);" class="css1-checkbox" value="' + item.ContractTitle + '" checked />';
                } else {
                    article += '<input id="' + item.RowKey + '" type="checkbox" name="RelatedContract" onchange="javascript:collectrelatedcontractrowkey(this);" class="css1-checkbox" value="' + item.ContractTitle + '" />';
                }
                article += '<label for="' + item.RowKey + '" class="css1-label"><a href="/Contracts/ContractDetails?ContractID=' + item.RowKey + '" target="_blank">' + item.ContractTitle + '</a></label>'; //css1-label PreserveSpace    //ENH487 Customer inhanc
                article += '</td>';
                article += '<td><label class="">' + item.ContractType + '</label></td>'
                article += '<td><label class="">'
                if (item.Counterparty != null && item.Counterparty != "") {
                    article += item.Counterparty
                } else {
                    article += "-"
                }
                article += '</label></td><td><label class="" style="word-break: break-all;">'
                if (item.ContractNumber != null && item.ContractNumber != "") {
                    article += item.ContractNumber
                } else {
                    article += "-"
                }
                article += '</label></td><td><label class="">' + item.Status + '</label></td>'
                if (arrRelatedcontractRowkey.indexOf(item.RowKey.trim()) >= 0) {
                    var indexvaluetake = vRelatedContractTitlearr.indexOf(item.ContractTitle.trim());
                    var relationtypefetch = RelatedRelationshipTypearr[indexvaluetake];
                    article += "<td class='ddl'><select class='f_inpt width90' onchange='showallspans(this)'>";
                    var jsLang = $("#ddlRelationshipTypeParent option:selected").val();
                    var jsLangType = $("#ddlRelationshipType option:selected").val();

                    var rela1 = jQuery.grep(RelationshipTypes, function (a) {
                        return (a[1] === jsLang && a[0] === jsLangType);
                    });
                    var rela2 = jQuery.grep(RelationshipTypes, function (a) {
                        return (a[2].indexOf(jsLang) > -1 && a[0] === jsLangType);
                    });
                    if (rela1 != null && typeof (rela1) != "undefined" && rela1.length != 0) {
                        var Relationship = rela1[0];
                        $.each(Relationship[2], function (index, value) {
                            var optRel2 = value.toString();
                            article += "<option value='" + optRel2 + "'>" + optRel2 + "</option>";
                        })
                        if ($(Relationship[2]).length == 0) {
                            var optRel2 = Relationship[1].toString();
                            article += "<option value='" + optRel2 + "'>" + optRel2 + "</option>";
                        }
                    }
                    else if (rela2 != null && typeof (rela2) != "undefined" && rela2.length != 0) {
                        var Relationship = rela2[0];
                        article += "<option value='" + Relationship[1] + "'>" + Relationship[1] + "</option>";
                    }
                    else {
                        switch (jsLang) {
                            case 'Master Agreement':
                                if (relationtypefetch == "Sub-Agreement") {
                                    article += '<option value="Sub-Agreement" selected>Sub-Agreement</option>';
                                    article += '<option value="SOW">SOW</option>';
                                }
                                else {
                                    article += '<option value="Sub-Agreement" >Sub-Agreement</option>';
                                    article += '<option value="SOW" selected>SOW</option>';
                                }
                                break;
                            case 'Sub-Agreement':
                            case 'SOW':
                                article += '<option value="Master Agreement">Master Agreement</option>';
                                break;
                            case 'Prime Contractor Agreement':
                                article += '<option value="Sub Contractor Agreement">Sub Contractor Agreement</option>';
                                break;
                            case 'Sub Contractor Agreement':
                                article += '<option value="Prime Contractor Agreement">Prime Contractor Agreement</option>';
                                break;
                            case 'Blanket Agreement':
                                if (relationtypefetch == "Order") {
                                    article += '<option value="Order" selected>Order</option>';
                                    article += '<option value="Invoice">Invoice</option>';
                                }
                                else {
                                    article += '<option value="Order">Order</option>';
                                    article += '<option value="Invoice" selected>Invoice</option>';
                                }

                                break;
                            case 'Order':
                            case 'Invoice':
                                article += '<option value="Blanket Agreement">Blanket Agreement</option>';
                                break;
                            case 'Original':
                                if (relationtypefetch == "Duplicate") {
                                    article += '<option value="Duplicate" selected>Duplicate</option>';
                                    article += '<option value="Copy">Copy</option>';
                                }
                                else {
                                    article += '<option value="Duplicate">Duplicate</option>';
                                    article += '<option value="Copy" selected>Copy</option>';
                                }
                                break;
                            case 'Duplicate':
                            case 'Copy':
                                article += '<option value="Original">Original</option>';
                                break;
                            case 'Past Contract':
                                article += '<option value="Renegotiated Contract">Renegotiated Contract</option>';
                                break;
                            case 'Renegotiated Contract':
                                article += '<option value="Past Contract">Past Contract</option>';
                                break;
                            case 'Primary Contract':
                                if (relationtypefetch == "Amendment") {
                                    article += '<option value="Amendment" selected>Amendment</option>';
                                    article += '<option value="Modification">Modification</option>';
                                }
                                else {
                                    article += '<option value="Amendment">Amendment</option>';
                                    article += '<option value="Modification" selected>Modification</option>';
                                }
                                break;
                            case 'Amendment':
                            case 'Modification':
                                article += '<option value="Primary Contract">Primary Contract</option>';
                                break;
                            case 'Other':
                                article += '<option value="Other">Other</option>';
                                break;
                        }

                    }
                    article += '</select><td></tr>';
                }
                else {
                    article += '<td class="ddl"><td></tr>'
                }
                $("#tblPopupContracts").append(article);
                relatedContractsTag.push(item.ContractTitle.trim());
                $("#" + item.RowKey).click(function () {
                    if (this.checked) {
                        if ($(this).parent().parent().children(".ddl").find('option').length == 0) {
                            var vOptions = "<select class='f_inpt width90' onchange='showallspans(this)'>";
                            var jsLang = $("#ddlRelationshipTypeParent option:selected").val();
                            var jsLangType = $("#ddlRelationshipType option:selected").val();
                            $("#relatedrole").html("Relationship");
                            var rela1 = jQuery.grep(RelationshipTypes, function (a) {
                                return (a[1] === jsLang && a[0] === jsLangType);
                            });
                            var rela2 = jQuery.grep(RelationshipTypes, function (a) {
                                return (a[2].indexOf(jsLang) > -1 && a[0] === jsLangType);
                            });
                            if (rela1 != null && typeof (rela1) != "undefined" && rela1.length != 0) {
                                var Relationship = rela1[0];
                                $.each(Relationship[2], function (index, value) {
                                    var optRel2 = value.toString();
                                    vOptions += "<option value='" + optRel2 + "'>" + optRel2 + "</option>";
                                })

                                if ($(Relationship[2]).length == 0) {
                                    var optRel2 = Relationship[1].toString();

                                    vOptions += "<option value='" + optRel2 + "'>" + optRel2 + "</option>";
                                }
                            }
                            else if (rela2 != null && typeof (rela2) != "undefined" && rela2.length != 0) {
                                var Relationship = rela2[0];
                                vOptions += "<option value='" + Relationship[1] + "'>" + Relationship[1] + "</option>";
                            }
                            else {
                                switch (jsLang) {
                                    case 'Master Agreement':
                                        vOptions += '<option value="Sub-Agreement">Sub-Agreement</option>';
                                        vOptions += '<option value="SOW">SOW</option>';
                                        break;
                                    case 'Sub-Agreement':
                                    case 'SOW':
                                        vOptions += '<option value="Master Agreement">Master Agreement</option>';
                                        break;
                                    case 'Prime Contractor Agreement':
                                        vOptions += '<option value="Sub Contractor Agreement">Sub Contractor Agreement</option>';
                                        break;
                                    case 'Sub Contractor Agreement':
                                        vOptions += '<option value="Prime Contractor Agreement">Prime Contractor Agreement</option>';
                                        break;
                                    case 'Blanket Agreement':
                                        vOptions += '<option value="Order">Order</option>';
                                        vOptions += '<option value="Invoice">Invoice</option>';
                                        break;
                                    case 'Order':
                                    case 'Invoice':
                                        vOptions += '<option value="Blanket Agreement">Blanket Agreement</option>';
                                        break;
                                    case 'Original':
                                        vOptions += '<option value="Duplicate">Duplicate</option>';
                                        vOptions += '<option value="Copy">Copy</option>';
                                        break;
                                    case 'Duplicate':
                                    case 'Copy':
                                        vOptions += '<option value="Original">Original</option>';
                                        break;
                                    case 'Past Contract':
                                        vOptions += '<option value="Renegotiated Contract">Renegotiated Contract</option>';
                                        break;
                                    case 'Renegotiated Contract':
                                        vOptions += '<option value="Past Contract">Past Contract</option>';
                                        break;
                                    case 'Primary Contract':
                                        vOptions += '<option value="Amendment">Amendment</option>';
                                        vOptions += '<option value="Modification">Modification</option>';
                                        break;
                                    case 'Amendment':
                                    case 'Modification':
                                        vOptions += '<option value="Primary Contract">Primary Contract</option>';
                                        break;
                                    case 'Other':
                                        vOptions += '<option value="Other">Other</option>';
                                        break;
                                }
                            }
                            vOptions += '</select>';
                            $(this).parent().parent().children(".ddl").append(vOptions);

                        }
                    } else {

                        $(this).parent().parent().children(".ddl").empty();
                    }
                    showallspans(this);
                });
            }
        }
    }
}


function Loading_View_trigger() {
    //getActiveCounterparties();
    getAllLegalEntities();
    CheckLicenseLimit();
    CheckGlobalSettings();
    CheckGlobalSettings1();
    BindCountry();
    BindCounterpartyType();
    getContractNumberFormat();
    //getCurrencyDisplayStyle();

    GetUsers();
    BindContractRelationships();
    //getContractTitleAndnumberFormat();
    //BindTermTypes();
    //CheckLicenseLimit();
    //CheckGlobalSettings();
    //getAllLegalEntities();
    //if (CType == "")
    //    getcontracttypes();
    ////ContractTitleFormat = getContractTitleFormat();
    ////getContractNumberFormat();
    //getCurrencyDisplayStyle();
    ////getcontracttypemetadata(CType);
    ////CType = "";
    //removeformdata = true;
    //BindCountry();
    //BindCounterpartyType();
    //GetUsers();
    //BindContractRelationships();
    //if (businessAreaPath != "") {
    //    BindRelatedContractsFilters();
    //}
    //if (DefaultCurrency == "") {
    //    $.ajax({
    //        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/defaultcurrency',
    //        type: 'GET',
    //        dataType: 'json',
    //        headers: { 'eContracts-ApiKey': localStorage.APIKey },
    //        cache: false,
    //        //async: false,
    //        success: function (data) {
    //            DefaultCurrency = data.Abbreviation;
    //        }
    //    });
    //}
}
// ENH493 Customer inhancment
function ViewCounterpartyDetails(counterpartyname) {
    $("#loadingPage").fadeIn();
    var vCounterparty = "";
    var vCreatedOn = "";
    var vCreatedBy = "";
    var itemCounterparty = unescape(counterpartyname);
    var counterpartyName = itemCounterparty.replace(/\s+/g, '');   //removing all white space
    if (AllCounterparties.length > 0) {
        vCounterparty = $.grep(AllCounterparties, function (n, i) {
            return (n.CounterpartyName.replace(/\s+/g, '') == counterpartyName);
        });
    }
    if (vCounterparty == "") {
        $("#loadingPage").fadeOut();
        swal("", "This Counterparty information is not available in eContracts Counteparty database.");
    }
    else {
        var counterpartyID = vCounterparty[0].RowKey;
        $("#tblMetadataDetailDocument").html('');
        var vMetadataa = "";
        var vControls = "";
        var allowRequired = false;
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/icounterpartydetails?counterpartyid=' + counterpartyID,
            type: 'GET',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            cache: false,
            success: function (mainmetadataFields) {
                vMetadataa = $(mainmetadataFields).find('Metadata');


                //Created date issue in IE
                //if (localStorage.AppDateFormat == null || localStorage.AppDateFormat == "" || localStorage.AppDateFormat == 'undefined') {
                //    vCreatedOn = moment(new Date($(vMetadataa).find('Created').text())).format('MM/DD/YYYY');
                //}
                //else {
                //    vCreatedOn = moment(new Date($(vMetadataa).find('Created').text())).format(localStorage.AppDateFormat);
                //}
                if (localStorage.AppDateFormat == null || localStorage.AppDateFormat == "" || localStorage.AppDateFormat == 'undefined') {
                    vCreatedOn = moment(new Date($(vMetadataa).find('Created').text().split(" ")[0])).format('MM/DD/YYYY');
                }
                else {
                    vCreatedOn = moment(new Date($(vMetadataa).find('Created').text().split(" ")[0])).format(localStorage.AppDateFormat);
                }//Created date issue in IE
                vCreatedBy = $(vMetadataa).find('CreatedBy').text();
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/primaryfields',
                    type: 'GET',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    cache: false,
                    success: function (metadataFields) {
                        ////manoj
                        //if (allowRequired) {
                        //    RequiredMetadata(vMetadataa, metadataFields);
                        //} else {
                        //    $("#tblRequiredMissing").parent().hide();
                        //}
                        ////manoj
                        vControls += '<tr>'
                        vControls += '<td height="10" align="left" valign="top" class="content-text clr999 width40">Counterparty Name</td><td>' + vCounterparty[0].CounterpartyName + '</td>';
                        vControls += '</tr>'
                        vControls += '<tr>'
                        vControls += '<td height="10" align="left" valign="top" class="content-text clr999 width40">Counterparty Type</td><td>' + vCounterparty[0].CounterpartyType + '</td>';
                        vControls += '</tr>'
                        vControls += '<tr>'
                        vControls += '<td height="10" align="left" valign="top" class="content-text clr999 width40">Status</td><td>' + vCounterparty[0].Status + '</td>';
                        vControls += '</tr>'
                        vControls += '<tr>'
                        if (vCounterparty[0].IsGlobal == "Yes")
                            vControls += '<td height="10" align="left" valign="top" class="content-text clr999 width40">Global or Regional</td><td>Global</td>';
                        else
                            vControls += '<td height="10" align="left" valign="top" class="content-text clr999 width40">Global or Regional</td><td>Regional</td>';
                        vControls += '</tr>'

                        var arrofFinancials = [];

                        $(metadataFields).each(function (i, item) {
                            if (item != null && item.FieldName != null) {
                                if ((item.FieldName == "CounterpartyName") || (item.FieldName == "CounterpartyType") || (item.FieldName == "Status")) {
                                }
                                else {
                                    if (item.ShowInEditForm == "true") {
                                        if (item.FieldDisplayName == "Related Counterparties") {
                                        }
                                        else {
                                            //var vControls = "";
                                            var onlydate = "";
                                            var vDate = false;
                                            var vNumber = "";
                                            var vEmail = "";
                                            var vMultiDDL = "";
                                            var vUser = "";
                                            if (item.FieldType != "File Upload") {
                                                vControls += '<tr>'
                                                if (item.Required == "true") {
                                                    vControls += '<td height="10" align="left" valign="top" class="content-text clr999 width40">' + item.FieldDisplayName + '</td>';
                                                } else {
                                                    vControls += '<td height="10" align="left" valign="top" class="content-text clr999 width40">' + item.FieldDisplayName + '</td>';
                                                }
                                            }
                                            if ($(vMetadataa).find(item.FieldName).text() == "") {
                                                if (item.Required == "true") {
                                                    vControls += "<td height='10' align='left' valign='top' class='content-text clr999 width40' id='" + item.FieldName + '1' + "'>Not Available</td>";
                                                } else {
                                                    vControls += "<td height='10' align='left' valign='top' class='content-text clr999 width40' id='" + item.FieldName + '1' + "'>Not Available</td>";
                                                }
                                            }
                                            else {
                                                if (item.FieldType == 'Date') {
                                                    if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                                                        onlydate = moment(new Date($(vMetadataa).find(item.FieldName).text())).format('MM/DD/YYYY');
                                                    }
                                                    else {
                                                        onlydate = moment(new Date($(vMetadataa).find(item.FieldName).text())).format(localStorage.AppDateFormat);
                                                    }
                                                    vDate = true;
                                                }
                                                if (item.Required == "true") {
                                                    if (item.FieldName == "Country") {
                                                        if ($(vMetadataa).find(item.FieldName).text() == "0") {
                                                            vControls += "<td height='10' align='left' valign='top' class='content-text clr999  width40' id='" + item.FieldName + '1' + "'>Not Available</td>";
                                                        } else {
                                                            vControls += "<td height='10' align='left' valign='top' class='content-text clr999  width40' id='" + item.FieldName + '1' + "'>" + $(vMetadataa).find(item.FieldName).text() + "</td>";
                                                        }
                                                    }
                                                    else {
                                                        if (item.FieldType == "Yes/No") {
                                                            if (typeof ($(vMetadataa).find(item.FieldName).text()) != "undefined" && $(vMetadataa).find(item.FieldName).text() != null && $(vMetadataa).find(item.FieldName).text() != "") {
                                                                if (typeof ($(vMetadataa).find('CustomCMD' + item.FieldName).text()) != "undefined") {
                                                                    if ($(vMetadataa).find('CustomCMD' + item.FieldName).text() != "" && $(vMetadataa).find('CustomCMD' + item.FieldName).text() != null) {
                                                                        vControls += "<td height='10' align='left' valign='top' class='content-text clr999 width40' id='" + item.FieldName + '1' + "'>" + $(vMetadataa).find(item.FieldName).text() + "<br />" + $(vMetadataa).find('CustomCMD' + item.FieldName).text() + "</td>";
                                                                    }
                                                                    else {
                                                                        vControls += "<td height='10' align='left' valign='top' class='content-text clr999 width40' id='" + item.FieldName + '1' + "'>" + $(vMetadataa).find(item.FieldName).text() + "</td>";
                                                                    }
                                                                }
                                                                else {
                                                                    vControls += "<td height='10' align='left' valign='top' class='content-text clr999 width40' id='" + item.FieldName + '1' + "'>" + $(vMetadataa).find(item.FieldName).text() + "</td>";
                                                                }
                                                            }
                                                            else {
                                                                vControls += "<td height='10' align='left' valign='top' class='content-text clr999  width40' id='" + item.FieldName + '1' + "'>Not Available</td>";
                                                            }
                                                        }
                                                        else if (item.FieldType.indexOf("Value / Financials") >= 0) {
                                                            if (typeof ($(vMetadataa).find(item.FieldName).text()) != "undefined" && $(vMetadataa).find(item.FieldName).text() != null && $(vMetadataa).find(item.FieldName).text() != "" && $(vMetadataa).find(item.FieldName).text() != ".") {
                                                                arrofFinancials.push(item.FieldName + "1" + "_formatted")
                                                                var value = $(vMetadataa).find(item.FieldName).text();
                                                                if (value != "") {
                                                                    vControls += "<td height='10' align='left' valign='top' class='content-text clr999  width40' id='" + item.FieldName + '1' + "'>" + "<span class='content-text' id='" + item.FieldName + '1' + "_formatted" + "'>" + value + "</span>" + "</td>";
                                                                }
                                                                else {
                                                                    vControls += "<td height='10' align='left' valign='top' class='content-text clr999  width40' id='" + item.FieldName + '1' + "'>Not Available</td>";
                                                                }
                                                            }
                                                            else {
                                                                vControls += "<td height='10' align='left' valign='top' class='content-text clr999  width40' id='" + item.FieldName + '1' + "'>Not Available</td>";
                                                            }
                                                        }
                                                        else if (item.FieldType == "Phone Number") {
                                                            if (typeof ($(vMetadataa).find(item.FieldName).text()) != "undefined") {
                                                                if (typeof ($(vMetadataa).find(item.FieldName).text().split(',')[2]) != "undefined" && $(vMetadataa).find(item.FieldName).text().split(',')[2] != null && $(vMetadataa).find(item.FieldName).text().split(',')[2] != "") {
                                                                    vControls += "<td height='10' align='left' valign='top' class='content-text clr999  width40' id='" + item.FieldName + '1' + "'> +" + $(vMetadataa).find(item.FieldName).text().split(',')[2].trim() + "</td>";
                                                                }
                                                                else {
                                                                    vControls += "<td height='10' align='left' valign='top' class='content-text clr999  width40' id='" + item.FieldName + '1' + "'>Not Available</td>";
                                                                }
                                                            }
                                                            else
                                                                vControls += "<td height='10' align='left' valign='top' class='content-text clr999  width40' id='" + item.FieldName + '1' + "'>Not Available</td>";
                                                        }
                                                        else if (item.FieldType == "Number-P" || item.FieldType == "Number-PD") {
                                                            if (typeof ($(vMetadataa).find(item.FieldName).text()) != "undefined") {
                                                                vControls += "<td height='10' align='left' valign='top' class='content-text clr999  width40' id='" + item.FieldName + '1' + "'>" + $(vMetadataa).find(item.FieldName).text() + ' %' + "</td>";
                                                            }
                                                            else {
                                                                vControls += "<td height='10' align='left' valign='top' class='content-text clr999  width40' id='" + item.FieldName + '1' + "'>Not Available</td>";
                                                            }
                                                        }
                                                        else {
                                                            if (vDate) { vControls += "<td height='10' align='left' valign='top' class='content-text clr999 width40' id='" + item.FieldName + '1' + "'>" + onlydate + "</td>"; }
                                                            else {
                                                                if ($(vMetadataa).find(item.FieldName).text() != '0') {
                                                                    vControls += "<td height='10' align='left' valign='top' class='content-text clr999 width40' id='" + item.FieldName + '1' + "'>" + $(vMetadataa).find(item.FieldName).text() + "</td>";
                                                                } else {
                                                                    vControls += "<td height='10' align='left' valign='top' class='content-text clr999 width40' id='" + item.FieldName + '1' + "'> Not Available </td>";
                                                                }
                                                            }
                                                        }
                                                    }
                                                } else {
                                                    if (item.FieldName == "Country") {
                                                        if ($(vMetadataa).find(item.FieldName).text() == "0") {
                                                            vControls += "<td height='10' align='left' valign='top' class='content-text clr999  width40' id='" + item.FieldName + '1' + "'>Not Available</td>";
                                                        } else {
                                                            vControls += "<td height='10' align='left' valign='top' class='content-text clr999 width40' id='" + item.FieldName + '1' + "'>" + $(vMetadataa).find(item.FieldName).text() + "</td>";
                                                        }
                                                    }
                                                    else {
                                                        if (item.FieldType == "Yes/No") {
                                                            if (typeof ($(vMetadataa).find(item.FieldName).text()) != "undefined" && $(vMetadataa).find(item.FieldName).text() != null && $(vMetadataa).find(item.FieldName).text() != "") {
                                                                if (typeof ($(vMetadataa).find('CustomCMD' + item.FieldName).text()) != "undefined") {
                                                                    if ($(vMetadataa).find('CustomCMD' + item.FieldName).text() != "" && $(vMetadataa).find('CustomCMD' + item.FieldName).text() != null) {
                                                                        vControls += "<td height='10' align='left' valign='top' class='content-text clr999 width40' id='" + item.FieldName + '1' + "'>" + $(vMetadataa).find(item.FieldName).text() + "<br />" + $(vMetadataa).find('CustomCMD' + item.FieldName).text() + "</td>";
                                                                    }
                                                                    else {
                                                                        vControls += "<td height='10' align='left' valign='top' class='content-text clr999 width40' id='" + item.FieldName + '1' + "'>" + $(vMetadataa).find(item.FieldName).text() + "</td>";
                                                                    }
                                                                }
                                                                else {
                                                                    vControls += "<td height='10' align='left' valign='top' class='content-text clr999 width40' id='" + item.FieldName + '1' + "'>" + $(vMetadataa).find(item.FieldName).text() + "</td>";
                                                                }
                                                            }
                                                            else {
                                                                vControls += "<td height='10' align='left' valign='top' class='content-text clr999  width40' id='" + item.FieldName + '1' + "'>Not Available</td>";
                                                            }
                                                        }
                                                        else if (item.FieldType.indexOf("Value / Financials") >= 0) {
                                                            if (typeof ($(vMetadataa).find(item.FieldName).text()) != "undefined" && $(vMetadataa).find(item.FieldName).text() != null && $(vMetadataa).find(item.FieldName).text() != "" && $(vMetadataa).find(item.FieldName).text() != ".") {
                                                                arrofFinancials.push(item.FieldName + "1" + "_formatted")
                                                                var value = $(vMetadataa).find(item.FieldName).text();
                                                                if (value != "") {
                                                                    vControls += "<td height='10' align='left' valign='top' class='content-text clr999  width40' id='" + item.FieldName + '1' + "'>" + "<span class='content-text' id='" + item.FieldName + '1' + "_formatted" + "'>" + value + "</span>" + "</td>";
                                                                }
                                                                else {
                                                                    vControls += "<td height='10' align='left' valign='top' class='content-text clr999  width40' id='" + item.FieldName + '1' + "'>Not Available</td>";
                                                                }
                                                            }
                                                            else {
                                                                vControls += "<td height='10' align='left' valign='top' class='content-text clr999  width40' id='" + item.FieldName + '1' + "'>Not Available</td>";
                                                            }
                                                        }
                                                        else if (item.FieldType == "Phone Number") {
                                                            if (typeof ($(vMetadataa).find(item.FieldName).text()) != "undefined") {
                                                                if (typeof ($(vMetadataa).find(item.FieldName).text().split(',')[2]) != "undefined" && $(vMetadataa).find(item.FieldName).text().split(',')[2] != null && $(vMetadataa).find(item.FieldName).text().split(',')[2] != "") {
                                                                    vControls += "<td height='10' align='left' valign='top' class='content-text clr999  width40' id='" + item.FieldName + '1' + "'> +" + $(vMetadataa).find(item.FieldName).text().split(',')[2].trim() + "</td>";
                                                                }
                                                                else {
                                                                    vControls += "<td height='10' align='left' valign='top' class='content-text clr999  width40' id='" + item.FieldName + '1' + "'>Not Available</td>";
                                                                }
                                                            }
                                                            else
                                                                vControls += "<td height='10' align='left' valign='top' class='content-text clr999  width40' id='" + item.FieldName + '1' + "'>Not Available</td>";
                                                        }
                                                        else if (item.FieldType == "Number-P" || item.FieldType == "Number-PD") {
                                                            if (typeof ($(vMetadataa).find(item.FieldName).text()) != "undefined") {
                                                                vControls += "<td height='10' align='left' valign='top' class='content-text clr999  width40' id='" + item.FieldName + '1' + "'>" + $(vMetadataa).find(item.FieldName).text() + ' %' + "</td>";
                                                            }
                                                            else {
                                                                vControls += "<td height='10' align='left' valign='top' class='content-text clr999  width40' id='" + item.FieldName + '1' + "'>Not Available</td>";
                                                            }
                                                        }
                                                        else {
                                                            if (vDate) { vControls += "<td height='10' align='left' valign='top' class='content-text clr999 width40' id='" + item.FieldName + '1' + "'>" + onlydate + "</td>"; }
                                                            else {
                                                                if ($(vMetadataa).find(item.FieldName).text() != '0') {
                                                                    vControls += "<td height='10' align='left' valign='top' class='content-text clr999 width40' id='" + item.FieldName + '1' + "'>" + $(vMetadataa).find(item.FieldName).text() + "</td>";
                                                                } else {
                                                                    vControls += "<td height='10' align='left' valign='top' class='content-text clr999 width40' id='" + item.FieldName + '1' + "'> Not Available </td>";
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }

                                            vControls += '</tr>';

                                        }
                                    }

                                }
                            }
                        });

                        vControls += ' <tr><td height="10" align="left" valign="top" class="content-text clr999 width40">Created By</td><td height="10" align="left" valign="top" class="content-text clr999 width40" id="CreatedBy1">' + vCreatedBy + '</td></tr>';
                        vControls += ' <tr><td height="10" align="left" valign="top" class="content-text clr999 width40">Created On</td><td height="10" align="left" valign="top" class="content-text clr999 width40" id="Created1">' + vCreatedOn + '</td></tr>';

                        $("#tblMetadataDetailDocument").html(vControls);

                        if (arrofFinancials.length > 0) {
                            $(arrofFinancials).each(function (i, value) {
                                if ($('#' + value + '').length > 0) {
                                    if ($.isNumeric($('#' + value + '').html())) {
                                        if (vCurrencyDisplayStyle == "UK") {
                                            $('#' + value + '').autoNumeric();
                                        } else if (vCurrencyDisplayStyle == "CAN") {
                                            $('#' + value + '').autoNumeric({
                                                aSep: ' ', aDec: '.'
                                            });
                                        } else if (vCurrencyDisplayStyle == "EU") {
                                            $('#' + value + '').autoNumeric({
                                                aSep: '.', aDec: ','
                                            });
                                        } else if (vCurrencyDisplayStyle == "IND") {
                                            $('#' + value + '').autoNumeric({
                                                dGroup: '2',
                                            });
                                        } else {
                                            $('#' + value + '').autoNumeric('init');
                                        }
                                    }
                                }
                            });
                        }

                        $("#viewMetadataDetailDocument").dialog("option", "title", "Counterparty Details");
                        $("#viewMetadataDetailDocument").dialog("open");
                        $("#loadingPage").fadeOut();
                    }, error: function (data) {
                        $("#loadingPage").fadeOut();
                    }
                });
            },
        });

    }
}

//ENH487 Customer inhanc
function ViewProject(projname) {
    var projectname = unescape(projname);
    $("#loadingPage").fadeIn();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/project?projectName=' + projectname.trim(),
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (entity) {
            $("#dvProjectID").html(entity.ProjectID);
            $("#dvProjectName").html(entity.ProjectName);
            if (entity.Description == null || entity.Description == "") {
                $("#dvDescription").html("-");
            } else {
                $("#dvDescription").html(entity.Description);
            }
            $("#dvStatus").html(entity.Status);
            if (entity.StartDate == null || entity.StartDate == "") {
                $("#dvStartDate").html("-")
            }
            else {
                var fStartDate = "";
                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                { fStartDate = moment(new Date(entity.StartDate)).format('MM/DD/YYYY'); }
                else { fStartDate = moment(new Date(entity.StartDate)).format(localStorage.AppDateFormat); }
                $("#dvStartDate").html(fStartDate);
            }
            if (entity.EndDate == null || entity.EndDate == "") {
                $("#dvEndDate").html("-")
            }
            else {
                var fEndDate = "";
                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                { fEndDate = moment(new Date(entity.EndDate)).format('MM/DD/YYYY'); }
                else { fEndDate = moment(new Date(entity.EndDate)).format(localStorage.AppDateFormat); }
                $("#dvEndDate").html(fEndDate);
            }
            if (entity.SubAccount == null || entity.SubAccount == "") {
                $("#dvSubAccount").html("-")
            }
            else {
                $("#dvSubAccount").html(entity.SubAccount);
            }
            $("#dvProjectManager").html(entity.ProjectManager);
            $("#dvBusinessManager").html(entity.BusinessManager);
            if (entity.CustomerID == null || entity.CustomerID == "") {
                $("#dvCustomerID").html("-")
            }
            else {
                $("#dvCustomerID").html(entity.CustomerID);
            }
            if (entity.Country == "--Select--") {
                $("#dvCountry").html("-");
            } else {
                $("#dvCountry").html(entity.Country);
            }
            if (entity.Division == null || entity.Division == "") {
                $("#dvDivision").html("-")
            }
            else {
                $("#dvDivision").html(entity.Division);
            }
            if (entity.PracticeArea == null || entity.PracticeArea == "") {
                $("#dvPracticeArea").html("-")
            }
            else {
                $("#dvPracticeArea").html(entity.PracticeArea);
            }

            $("#dvViewProject").dialog("open");
            $("#loadingPage").fadeOut();
        },
        error:
            function (data) {
                $("#loadingPage").fadeOut();
            }
    });
}

function ViewProjectTask(id) {
    var taskid = unescape(id);
    $("#loadingPage").fadeIn();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/projecttaskbytaskid?taskid=' + taskid.trim(),
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (entity) {
            $("#dvTaskID").html(entity.TaskID);
            $("#dvTaskDescription").html(entity.TaskDescription);
            if (entity.StartDate == null || entity.StartDate == "") {
                $("#dvManager").html("-");
            } else {
                $("#dvManager").html(entity.Manager);
            }
            if (entity.StartDate == null || entity.StartDate == "") {
                $("#dvTaskStartDate").html("-");
            }
            else {
                var fStartDate = "";
                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                { fStartDate = moment(new Date(entity.StartDate)).format('MM/DD/YYYY'); }
                else { fStartDate = moment(new Date(entity.StartDate)).format(localStorage.AppDateFormat); }
                $("#dvTaskStartDate").html(fStartDate);
            }
            if (entity.EndDate == null || entity.EndDate == "") {
                $("#dvTaskEndDate").html("-");
            }
            else {
                var fEndDate = "";
                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                { fEndDate = moment(new Date(entity.EndDate)).format('MM/DD/YYYY'); }
                else { fEndDate = moment(new Date(entity.EndDate)).format(localStorage.AppDateFormat); }
                $("#dvTaskEndDate").html(fEndDate);
            }
            $("#dvViewProjectTask").dialog("open");
            $("#loadingPage").fadeOut();
        },
        error:
            function (data) {
                $("#loadingPage").fadeOut();
            }
    });
}

//Removing counterparties from li and input_textbox
function removeCounterParty(obj) {
    var cp = $(obj).parent().parent()[0].id;
    cp = unescape(cp);
    var strval = "";
    var SelectedCounterparty = "";
    SelectedCounterparty = $('#Counterparty').val().replace("; ", ";").split(";");
    if (typeof SelectedCounterparty != '' && SelectedCounterparty != null) {
        for (var i = 0; i < SelectedCounterparty.length; i++) {
            if (SelectedCounterparty[i].replace(/\s+/g, '') != cp.replace(/\s+/g, '')) {
                if (strval == "") {
                    strval = SelectedCounterparty[i];
                } else {
                    strval = strval + ';' + SelectedCounterparty[i]
                }
            }
        }
        $('#Counterparty').val(strval);
    }
    else {
        $('#Counterparty').val(SelectedCounterparty);
    }
    $($(obj).parent().parent()[0]).remove();

    if ($('#Counterparty').val() == "") {
        //$('#Counterparty').css('display', '');//eO311158
    }
}

function addrealetedrequest(obj) {
    if (obj != "" && obj.checked == true) {
        arrRelatedRequestRowkey.push(obj.value);
    }
    else if (obj != "" && obj.checked == false) {
        $(arrRelatedRequestRowkey).each(function (Index1, value) {
            if (value == obj.value) {
                arrRelatedRequestRowkey.splice(Index1, 1);//removing value from Document Selection
            }
        });

    }
}

function bindAuthoriseUsers() {
    $("#RenewalConfirmParticipants").empty();
    $("#RenewalConfirmParticipantsCC").empty();

    var article = '';
    var authorisedUsersusers = [];
    //    if (contractItem.FullControlPermissions != null && contractItem.FullControlPermissions != "") {
    //        var users = contractItem.FullControlPermissions.split(';');
    //        $.each(users, function (index, value) {
    //            authorisedUsersusers.push(value.trim());
    //    });
    //}

    if ($(vAllMetadata).find('FullControlPermissions').text() != "") {
        var FullControlUsers = $(vAllMetadata).find('FullControlPermissions').text();
        if (FullControlUsers.indexOf(';') > -1) {
            var FullControlUsersarr = $.map(FullControlUsers.trim().split(';'), function (value) { return value.trim(); })
            $.each(FullControlUsersarr, function (index, value) {
                authorisedUsersusers.push(value.trim());
            });
        }
        else {
            authorisedUsersusers.push(FullControlUsers);
        }
    }


    //if (contractItem.ReadWritePermissions != null && contractItem.ReadWritePermissions != "") {
    //    var users = contractItem.ReadWritePermissions.split(';');
    //    $.each(users, function (index, value) {
    //        authorisedUsersusers.push(value.trim());
    //    });
    //}

    if ($(vAllMetadata).find('ReadWritePermissions').text() != "") {
        var ReadWriteControlUsers = $(vAllMetadata).find('ReadWritePermissions').text();
        if (ReadWriteControlUsers.indexOf(';') > -1) {
            var ReadWriteControlUsersarr = $.map(ReadWriteControlUsers.trim().split(';'), function (value) { return value.trim(); })
            $.each(ReadWriteControlUsersarr, function (index, value) {
                authorisedUsersusers.push(value.trim());
            });
        }
        else {
            authorisedUsersusers.push(ReadWriteControlUsers);
        }
    }
    if ($(vAllMetadata).find('BusinessAreaOwners').text() != "") {
        var users = $(vAllMetadata).find('BusinessAreaOwners').text();
        if (users.indexOf(';') > -1) {
            var usersarr = $.map(users.trim().split(';'), function (value) { return value.trim(); })
            $.each(usersarr, function (index, value) {
                authorisedUsersusers.push(value.trim());
            });
        }
        else {
            authorisedUsersusers.push(users);
        }
    }
    if ($(vAllMetadata).find('ContractManagers').text() != "") {
        var users = $(vAllMetadata).find('ContractManagers').text();
        if (users.indexOf(';') > -1) {
            var usersarr = $.map(users.trim().split(';'), function (value) { return value.trim(); })
            $.each(usersarr, function (index, value) {
                authorisedUsersusers.push(value.trim());
            });
        }
        else {
            authorisedUsersusers.push(users);
        }
    }
    if (allUsersList.length == 0) {
        GetUserList();
    }
    var allGlobalContractOwners = $.grep(allUsersList, function (item, i) {
        return item.UserType.indexOf('Global Contract Owner') > -1;
    });
    var allBusinessAreaFullControl = $.grep(allUsersList, function (item, i) {
        return item.BusinessArea.indexOf($("#txtBusinessArea").val()) > -1;
    });
    var allBusinessAreaReadWrite = $.grep(allUsersList, function (item, i) {
        return item.BusinessAreaContribute.indexOf($("#txtBusinessArea").val()) > -1;
    });

    $.each(allBusinessAreaFullControl, function (index, value) {
        authorisedUsersusers.push(value.UserName.trim());
    });
    $.each(allBusinessAreaReadWrite, function (index, value) {
        authorisedUsersusers.push(value.UserName.trim());
    });
    $.each(allGlobalContractOwners, function (index, value) {
        authorisedUsersusers.push(value.UserName.trim());
    });
    authorisedUsersusers.push(localStorage.UserName);

    authorisedUsersusers = $.grep(authorisedUsersusers, function (n) { return (n); });

    authorisedUsersusers = authorisedUsersusers.filter(function (elem, index, self) {
        return index == self.indexOf(elem);
    });

    $.each(authorisedUsersusers, function (index, value) {
        article += '<option value="' + value.trim() + '">' + value.trim() + '</option>';
    });
    $("#RenewalConfirmParticipants").append(article);
    $("#RenewalConfirmParticipantsCC").append(article);
    $("#RenewalConfirmParticipants").chosen();
    $("#RenewalConfirmParticipantsCC").chosen();
}

//$("#txtCounterpartyName").blur(function () {

//    fillCounterpartyDetails();
//})


//function fillCounterpartyDetails() {

//    if ($("#txtCounterpartyName").val().trim() != "" && !($("#chkCounterpartyNotInList").prop('checked'))) {
//        $("#chkCounterpartyNotInList").prop('checked', true);
//        $('.CP_Det').css('display', '');
//        $('.CP_Det1').css('display', '');
//        $("#ddlCounterpartyType").addClass('validelement');
//        $("#txtEmailID").addClass('validemail');
//        getCounterpartyFields();
//    }
//}

function bindPhoneNumber(id, countryCode) {
    $("#" + id).intlTelInput({
        separateDialCode: true,
        utilsScript: "/Scripts/utils.js"
    });
}

function bindPhoneNumberEdit(id, countryCode) {
    $("#" + id).intlTelInput({
        initialCountry: countryCode,
        separateDialCode: true,
        utilsScript: "/Scripts/utils.js"
    });
}

//Vinod
function changeYesNoField(id) {
    $("#CustomCMD" + id.name).parent().parent().remove();
    var CommentYes = $("#hdnYes" + id.name).val();
    var CommentNo = $("#hdnNo" + id.name).val();
    var CommentRequired = $("#hdnRequired" + id.name).val();
    var vControls = "";
    if (id.value == "Yes") {
        if (CommentYes == "true") {
            if (CommentRequired == "true") {
                vControls += ' <div class="form-input-group ' + id.name + '"><div class="row-group"><label class="col3 m12">Add a Comment<span class="text-red">*</span></label> ';
            } else {
                vControls += '<div class="form-input-group ' + id.name + '"><div class="row-group"><label class="col3 m12">Add a Comment</label> ';
            }
            vControls += '<div class="col6 m12">';
            if (CommentRequired == "true") {
                vControls += "<textarea id='CustomCMD" + id.name + "' name='CustomCMD" + id.name + "' maxlength='500' title='" + id.name + "' cols='40' rows='5' class='form-contro validelement'></textarea>";
            } else {
                vControls += "<textarea id='CustomCMD" + id.name + "' name='CustomCMD" + id.name + "' maxlength='500' title='" + id.name + "' cols='40' rows='5' class='form-contro'></textarea>";
            }
            vControls += '</div>';
            vControls += '</div></div>';
            $("#" + id.id).parent().parent().after(vControls);
        } else {
            $("." + id.name).css("display", "none");
        }
    }
    if (id.value == "No") {
        if (CommentNo == "true") {
            if (CommentRequired == "true") {
                vControls += ' <div class="form-input-group ' + id.name + '"><div class="row-group"><label class="col3 m12">Add a Comment<span class="text-red">*</span></label> ';
            } else {
                vControls += '<div class="form-input-group ' + id.name + '"><div class="row-group"><label class="col3 m12">Add a Comment</label> ';
            }
            vControls += '<div class="col6 m12">';
            if (CommentRequired == "true") {
                vControls += "<textarea id='CustomCMD" + id.name + "' name='CustomCMD" + id.name + "' maxlength='500' title='" + id.name + "' cols='40' rows='5' class='form-contro validelement'></textarea>";
            } else {
                vControls += "<textarea id='CustomCMD" + id.name + "' name='CustomCMD" + id.name + "' maxlength='500' title='" + id.name + "' cols='40' rows='5' class='form-contro'></textarea>";
            }
            vControls += '</div>';
            vControls += '</div></div>';
            $("#" + id.id).parent().parent().after(vControls);
        } else {
            $("." + id.name).css("display", "none");
        }
    }
}

function changeYesNoFieldCounterparty(id) {
    $("#CustomCMD" + id.name).parent().parent().remove();
    $("." + id.name).css("display", "none");
    var CommentYes = $("#hdnYes" + id.name).val();
    var CommentNo = $("#hdnNo" + id.name).val();
    var CommentRequired = $("#hdnRequired" + id.name).val();
    var vControls = "<li class='removableCounterpartyField CP_Det'>";
    if (id.value == "Yes") {
        if (CommentYes == "true") {
            if (CommentRequired == "true") {
                vControls += '<p><b>Add a Comment</b><small>*</small></p>';
            } else {
                vControls += '<p><b>Add a Comment</b></p>';
            }
            vControls += '<div>';
            if (CommentRequired == "true") {
                vControls += '<textarea name="CustomCMD' + id.name + '" id="CustomCMD' + id.name + '" maxlength="500" title="' + id.name + '" cols="25" rows="3" class="form-contro validelement"></textarea>';
            } else {
                vControls += '<textarea name="CustomCMD' + id.name + '" id="CustomCMD' + id.name + '" maxlength="500" title="' + id.name + '" cols="25" rows="3" class="form-contro"></textarea>';
            }
            vControls += "</div></li>";
            $("#" + id.id).parent().parent().parent().after(vControls);
        } else {
            $("." + id.name).css("display", "none");
        }
    }
    if (id.value == "No") {
        if (CommentNo == "true") {
            if (CommentRequired == "true") {
                vControls += '<p><b>Add a Comment</b><small>*</small></p>';
            } else {
                vControls += '<p><b>Add a Comment</b></p>';
            }
            vControls += '<div>';
            if (CommentRequired == "true") {
                vControls += '<textarea name="CustomCMD' + id.name + '" id="CustomCMD' + id.name + '" maxlength="500" title="' + id.name + '" cols="25" rows="3" class="form-contro validelement"></textarea>';
            } else {
                vControls += '<textarea name="CustomCMD' + id.name + '" id="CustomCMD' + id.name + '" maxlength="500" title="' + id.name + '" cols="25" rows="3" class="form-contro"></textarea>';
            }
            vControls += "</div></li>";
            $("#" + id.id).parent().parent().parent().after(vControls);
        } else {
            $("." + id.name).css("display", "none");
        }
    }
}

