var thisBusinessAreaNameC = '';
var thisContractAreaNameC = '';
var thisBusinessAreaName = "";
var thisContractAreaName = "";
var thisBusinessAreaNameRowKey = "";
var thisContractAreaNameRowKey = "";
var thisBusinessAreaPath = '';
var thisContractAreaSettings;
var businessAreaPath = "";
var thisLegalEntity = "";
var thisCurrency = "";
var vCurrencyDisplayStyle = "";
var projectManager = "";
var RequestID = getParameterByName('RequestID');
var RequestType = getParameterByName('RequestType');
var RType = RequestType;
var vGlobalObjForGeneric = "";
var chkspan = "";
var UserRoleMap = {};
var chkobj = "";
var multipleChecksDocumentID = [];
var myArrayRU = [];
var arrprevRU = [];
var SettingUserRole = "";
var GlobalSettingUserRole = "";
var myCounterPartyArray = [];
var CounterPartyArrayprev = [];
var article1 = "";
var selecteditems12 = [];
var defaultAssignto = [];
var BusinessAreaAccess12 = localStorage.BusinessAreaAccess;
var TermTypeHelpText = {};
var strSelCounterPartyField = "";
var listRelatedContracts = [];
var AllCounterparties = "";  // ENH493 Customer inhancment
//manoj
var DocumentSelection = [];
//manoj


function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


$(document).ready(function () {
    CheckLicenseLimit();
    article1 = "";
    $("#txtRequestTitle").val("");
    BindBusinessAreaPicker11();
    if (typeof localStorage.GlobalBusinessAreaLocation != 'undefined') {
        if (localStorage.GlobalBusinessAreaLocation == "All") {
            if (localStorage.DefaultBusinessArea != "") {
                var vDBAarr = localStorage.DefaultBusinessArea.split('>');
                var vDBA = vDBAarr.slice(-1)[0].trim();
                thisContractAreaName = localStorage.DefaultBusinessArea.split('>')[0].trim();
                thisBusinessAreaName = vDBA + ';' + thisContractAreaName;//Business Area +';'+ Contract Area
                thisBusinessAreaNameC = vDBA;
                thisContractAreaNameC = localStorage.DefaultBusinessArea.split('>')[0].trim()
                thisBusinessAreaPath = localStorage.DefaultBusinessArea
                businessAreaPath = localStorage.DefaultBusinessArea;
                $("#txtRequestBusinessArea").val(vDBA);
                $("#txtContractAreaName").val(thisContractAreaName);
                getcontractareasettings(thisContractAreaName);
                getBusinessAreaDetails($("#txtRequestBusinessArea").val(), $('#txtContractAreaName').val());
            }
            else {
                $("#txtRequestBusinessArea").val('');
                $("#txtContractAreaName").val('');
            }
        } else {
            thisContractAreaName = localStorage.GlobalBusinessAreaLocation.split('>')[0].trim();
            thisBusinessAreaName = localStorage.GlobalBusinessArea + ';' + thisContractAreaName;//Business Area +';'+ Contract Area
            thisBusinessAreaNameC = localStorage.GlobalBusinessArea;
            thisContractAreaNameC = localStorage.GlobalBusinessAreaLocation.split('>')[0].trim();
            thisBusinessAreaPath = localStorage.GlobalBusinessAreaLocation;
            businessAreaPath = localStorage.GlobalBusinessAreaLocation;
            $("#txtRequestBusinessArea").val(localStorage.GlobalBusinessArea);
            $("#txtContractAreaName").val(thisContractAreaName);
            $("#viewbusinessarea").css('display', 'none');
            getBusinessAreaDetails($("#txtRequestBusinessArea").val(), $('#txtContractAreaName').val());
            if (thisContractAreaName != "") {

                getcontractareasettings(thisContractAreaName);  //Get contract area settings
            }
        }
    } else {
        if (localStorage.DefaultBusinessArea != "" && typeof localStorage.DefaultBusinessArea != 'undefined') {
            var vDBAarr = localStorage.DefaultBusinessArea.split('>');
            var vDBA = vDBAarr.slice(-1)[0].trim();
            thisContractAreaName = localStorage.DefaultBusinessArea.split('>')[0].trim();
            thisBusinessAreaName = vDBA + ';' + thisContractAreaName;//Business Area +';'+ Contract Area
            thisBusinessAreaNameC = vDBA;
            thisContractAreaNameC = localStorage.DefaultBusinessArea.split('>')[0].trim();
            thisBusinessAreaPath = localStorage.DefaultBusinessArea;

            businessAreaPath = localStorage.DefaultBusinessArea;
            $("#txtRequestBusinessArea").val(vDBA);
            $("#txtContractAreaName").val(thisContractAreaName);
            getcontractareasettings(thisContractAreaName);
            getBusinessAreaDetails($("#txtRequestBusinessArea").val(), $('#txtContractAreaName').val());
        }
        else {
            $("#txtRequestBusinessArea").val('');
            $("#txtContractAreaName").val('');
            thisBusinessAreaNameC = "";
            thisContractAreaNameC = "";
            thisBusinessAreaPath = "";
        }
    }

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/detailsbyname?businessareaname=' + encodeURIComponent($("#txtRequestBusinessArea").val()) + '&contractareaname=' + encodeURIComponent($("#txtContractAreaName").val()),
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            treeBusinessAreaOwner = data.Owner;
        },
        error: function (data) {

        }
    });


    //manoj
    if (typeof thisContractAreaSettings != 'undefined' && thisContractAreaSettings != null) {
        if (thisContractAreaSettings.ConfigureContractType == "default") {
            $("#ddlRequestTypes option").filter(function (index) { return $(this).text() === "General" }).prop('selected', true);
            $("#ddlRequestTypes").trigger("change");
            $(".ctypeconfigure").css("display", "none");
        } else {
            $(".ctypeconfigure").css("display", "");
        }
    }
    //manoj
    $('#viewbusinessarea').click(function () {
        ViewBusinessArea()
    });

    //eO39919
    //ENH487 Customer inhanc
    $("#dvViewProject").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "Project",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "Close": function () {
                $(this).dialog("close");
            }
        }
    });

    //eO39919
    $("#dvViewProjectTask").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "Project Task",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "Close": function () {
                $(this).dialog("close");
            }
        }
    });




    $("#browseBA").dialog({
        autoOpen: false, closeText: "",
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

                //$("#txtRequestTitle").val("");

                if ($('#liSelectedBA span').length > 0) {
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
                        headers: { 'eContracts-ApiKey': localStorage.APIKey },
                        success: function (fullhierarchy) {
                            businessAreaPath = fullhierarchy;
                        },
                        error: function (fullhierarchy) {

                        }
                    });
                    var str = $('#txtBA').val();
                    var strReplaced = str.replace(/\,/g, ';');
                    $('#txtRequestBusinessArea').val(strReplaced);

                    getcontractareasettings($('#txtContractAreaName').val());
                    BindRequestTypes();
                    //manoj
                    if (typeof thisContractAreaSettings != 'undefined' && thisContractAreaSettings != null) {
                        if (thisContractAreaSettings.ConfigureContractType == "default") {
                            $("#ddlRequestTypes option").filter(function (index) { return $(this).text() === "General" }).prop('selected', true);
                            $("#ddlRequestTypes").trigger("change");
                            $(".ctypeconfigure").css("display", "none");
                        } else {
                            $(".ctypeconfigure").css("display", "");
                        }
                    }
                    //manoj
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


    $("#browseTaxonomy").dialog({
        autoOpen: false, closeText: "",
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
                    $('#' + my_data).val(chkspan);
                    chkspan = "";
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


    $("#addEditCounterparty").dialog({
        autoOpen: false, closeText: "",
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
                }
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $("#popupCounterparties").dialog({
        autoOpen: false, closeText: "",
        width: "65%",
        height: "auto",
        title: "Related Counterparties",
        modal: true,
        buttons: {
            "OK": function () { RelatedCounterpartiesPush(); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $("#browseLegalEntity").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "CompanyProfile",
        dialogClass: "popup_width100",
        resizable: false,
        modal: true,
        buttons: {
            "OK": function () { AddLE(); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }, close: function () {

        }

    });

    $("#browseGenericforrelcon").dialog({
        autoOpen: false, closeText: "",
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

                //if (s) {
                $(this).dialog("close");
                // }
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $("#browseGeneric").dialog({
        autoOpen: false, closeText: "",
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
                        text: "No item has been selected,Do you want to continue?",
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
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Counterparty",
        resizable: false,
        modal: true,
        buttons: {
            "OK": function () { AddCounterparty(); },
            Cancel: function () {
                $(this).dialog("close"); $("#txtSearchBox").val("");
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
                BAOwnersselecteditems = [];
                $('#liSelectedBAOwners').empty();
                $('#txtBAOwnerofPath').val('');
                $('#txtBAOwnerof').val('');
                selectedBusinessAreaID11 = [];
                currentSelectedCounterParty = [];
            }
        }, close: function () {
            PrvRelatedCounterparities = [];
            arrRelatedCounterparities = [];
            curRelatedCounterparities = [];
            currentSelectedCounterParty = [];
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
            BAOwnersselecteditems = [];
            $('#liSelectedBAOwners').empty();
            $('#txtBAOwnerofPath').val('');
            $('#txtBAOwnerof').val('');


            selectedBusinessAreaID11 = [];

        }
    });

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/requestfieldgroup?groupname=' + $('#fieldGroup-1').text(),
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            $('#fieldGroup-1Desc').text(data.Description)
        }
    });

    $("#browseProjects").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Project",
        modal: true,
        buttons: {
            "OK": function () {
                var s = AddProject();
                // if (s) {
                $(this).dialog("close"); $("#txtSearchBoxProjects").val("");
                // }
            },
            "Clear": function () {
                arrRelatedCounterparities = [];
                $('#txtSearchBoxProjects').val('');
                $('input:checkbox[name=Project]').attr('checked', false);
                $("#Project").val("");
            },
            Cancel: function () {
                arrRelatedCounterparities = [];
                $(this).dialog("close");
                $("#txtSearchBoxProjects").val("");
            }
        }
    });

    $("#browseProjectTasks").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        height: 500,
        title: "Project Tasks",
        modal: true,
        buttons: {
            "OK": function () {
                var s = AddProjectTask();
                // if (s) {
                $(this).dialog("close"); $("#txtSearchBoxProjectTasks").val("");
                // }
            },
            "Clear": function () {
                $('#txtSearchBoxProjectTasks').val('');
                $('input:checkbox[name=ProjectTask]').attr('checked', false);
                $("#ProjectTask").val("");
            },
            Cancel: function () {
                $(this).dialog("close");
                $("#txtSearchBoxProjectTasks").val("");
                $('input:checkbox[name=ProjectTask]').attr('checked', false);
            }
        }
    });

    $('#txtSearchBoxProjects').keypress(function (e) {
        if ($('#txtSearchBoxProjects').val() != "") {
            if (e.keyCode == 13) {
                $(".ui-autocomplete").css('display', 'none');
                SearchProjects();
            }
        }
    });


    $("#browseContracts").dialog({
        autoOpen: false, closeText: "",
        width: "85%",
        title: "Contract",
        modal: true,
        buttons: {
            "OK": function () {
                var s = AddContract();
                // if (s) {
                $(this).dialog("close"); $("#txtSearchBoxContracts").val("");
                $("#lblselectedrelatedcontracts").text("");
                //}
            },
            Cancel: function () {
                $(this).dialog("close");
                $("#txtSearchBoxContracts").val("");
                $("#lblselectedrelatedcontracts").text("");
            }
        }
    });

    $('#txtSearchBoxContracts').keypress(function (e) {
        if ($('#txtSearchBoxContracts').val() != "") {
            if (e.keyCode == 13) {
                $(".ui-autocomplete").css('display', 'none');
                SearchContracts();
            }
        }
    });

    $("#browseOriginatingParty").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Originating Party",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "OK": function () {
                var s = AddOriginatingParty();
                // if (s) {
                $(this).dialog("close");
                // }
            },
            Cancel: function () {
                $(this).dialog("close");
            }
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
                        if (i != selecteditemslength - 1) { $('#lblBusinessAreaOwners').append(BAOwnersselecteditems[i].trim().substring(BAOwnersselecteditems[i].trim().lastIndexOf(">") + 1, BAOwnersselecteditems[i].trim().length).trim() + ";"); }
                        else { $('#lblBusinessAreaOwners').append(BAOwnersselecteditems[i].trim().substring(BAOwnersselecteditems[i].trim().lastIndexOf(">") + 1, BAOwnersselecteditems[i].trim().length).trim()); }
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
    $("#viewMetadataDetailDocument").dialog({
        autoOpen: false,
        width: "70%",
        title: "Detail",
        closeText: "",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "Close": function () {
                $(this).dialog("close");
            }
        }
    });
    getActiveCounterparties();      // ENH493 Customer inhancment
});



function CheckLicenseLimit() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/LicenseLimit',
        type: 'GET',
        cache: false,
        contentType: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        processData: false,
        success: function (item) {
            if (item.CounterpartiesUsed > item.CounterpartiesLimit) {

                $('#chkCounterpartyNotInList').attr('disabled', true);
            }
            else {
                $('#chkCounterpartyNotInList').attr('disabled', false);
            }

        }
    });
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

function CheckGlobalSettingsCreateRequest() {
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
            localStorage.setItem("RestrictHighSecurityTagging", data.RestrictHighSecurityTagging);
            if (data == null) {
                $("#spAddCounterparty").css("display", "none");
                $("#Upcoming").css("display", "none");
                $("#Delayed").css("display", "none");
            } else {
                if (data.CreateCounterpartyRequest == "Yes") {
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
        }
    });
}

function BindGlobalSettings() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/GlobalSettings?accountid=' + localStorage.AccountID,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        contentType: 'application/json',
        cache: false,
        async: false,
        success: function (data) {
            if (data != null) {
                localStorage.setItem("RestrictHighSecurityTagging", data.RestrictHighSecurityTagging);
                GlobalSettingUserRole = data.UserRoleSetting;
            }
        },
        error: function (data) {
        }
    });
}

function getcontractareasettings(contractareaname) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/contractareadetailsbyname?contractareaname=' + encodeURIComponent(contractareaname),
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        async: false,
        success: function (data) {
            data.ConfigureContractType = (data.ConfigureContractType != null && data.ConfigureContractType != "") ? data.ConfigureContractType : "configure";
            thisContractAreaSettings = data;
            if (data.Currency != "" || data.Currency != "--Select--")
                thisCurrency = data.Currency;

            if (data.LegalEntity != "" || data.LegalEntity != "--Select--")
                thisLegalEntity = data.LegalEntity;

        },
        error: function (data) {

        }
    });
}


//Showing Business are In Tree View


function ViewBusinessArea() {

    $('#txtBARowkey').val("");
    $('#txtBAParent').val("");
    $('#txtBA').val("");
    $('#txtContractAreaName').val("");
    $('#txtContractAreaAdministrators').val("");
    $('#txtBusinessAreaOwners').val("");
    $('#lblBusinessAreaDescription').text("");
    //AssignToDDlPopulate("AssignedTo", "");
    if ($('#tbodyBusinessArea12 tr').length == 0) {
        BindBusinessArea()
    } else {
        $("#browseBA").dialog("option", "title", "Business Area Picker");
        $("#browseBA").dialog("open");
        $("#browseBA").height("auto");
    }
}



function BindBusinessArea() {//Performance Optimization
    $("#loadingPage").fadeIn();
    if (BusinessAreaAccessID.length == 0 && localStorage.UserType.indexOf("Global Contract Owner") < 0) {
        getbusinessareapath1Optimized();
    }
    recursiveIteration12(BusinessAreaList);
    $("#tbodyBusinessArea12").append(article1);
    article1 = "";
    $("#example-basic-12").treetable({ expandable: true, initialState: "expanded" }, true);

    $("#loadingPage").fadeOut();

    if (getParameterByName("RequestID") != "") {
        if (RequestBusinessArea != '' && $("#txtBusinessArea").val() == RequestBusinessArea) {
            var obj = $('.ReqRequiredObj')[0];
            treeviewclick1(obj);
        }
    }
    $("#browseBA").dialog("option", "title", "Browse Business Area");
    $("#browseBA").dialog("open");
    $("#browseBA").height("auto");
}//Performance Optimization
//function BindBusinessArea() {
//    $("#loadingPage").fadeIn();
//    $.ajax({
//        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/entities',
//        type: 'GET',
//        dataType: 'json',
//        'Content-Type': 'application/json',
//        headers: { 'eContracts-ApiKey': localStorage.APIKey },
//        success: function (data) {
//            if (article1 == "") {
//                getbusinessareapath1();
//                recursiveIteration12(data)
//            }
//            $("#tbodyBusinessArea12").append(article1);
//            //article1 = "";
//            $("#example-basic-12").treetable({ expandable: true, initialState: "expanded" }, true);

//            $("#loadingPage").fadeOut();
//            $("#browseBA").dialog("option", "title", "Browse Business Area");
//            $("#browseBA").dialog("open");
//            $("#browseBA").height("auto");
//        },
//        error:
//            function (data) {
//                $("#loadingPage").fadeOut();
//            }
//    });

//}





var strContractAreaName12 = "";
var strContractAreaName12Owner = "";
var previousidcreate = "";
var strContractAreaID = '';

function recursiveIteration12(object) {
    if (object.ChildrenData.length != 0) {
        BindRecBAOther('', object);

        //for (var i = 0; i < object.ChildrenData.length; i++) {
        //    var item = object.ChildrenData[i];
        //    var additional = "";
        //    // var j = BusinessAreaAccess12.indexOf(item.BusinessAreaName);
        //    var j = BusinessAreaAccessID.indexOf(item.RowKey);
        //    if (j > -1 || item.Owner.trim().split(';').indexOf(localStorage.UserName.trim()) > -1) {
        //        if (item.ParentBusinessAreaID != 0) {
        //            if (item.Owner.trim().split(';').indexOf(localStorage.UserName.trim()) > -1) {//if business owner
        //                additional = '<span style="color:#3487ce; cursor:pointer;" onclick="javascript:treeviewclickRequest(this)">' + item.BusinessAreaName + '</span>&nbsp; <img src="/Content/Images/icon/profile.png" style="cursor:default;" />'
        //            } else { //if permission in business area
        //                additional = '<span style="color:#3487ce; cursor:pointer;" onclick="javascript:treeviewclickRequest(this)">' + item.BusinessAreaName + '</span>'
        //            }
        //        } else {
        //            additional = '<span>' + item.BusinessAreaName + '</span>';
        //        }

        //    } else {
        //        if (item.ParentBusinessAreaID != 0) {
        //            if (strContractAreaID == "GenCA") {
        //                additional = '<span style="color:#3487ce; cursor:pointer;" onclick="javascript:treeviewclickRequest(this)">' + item.BusinessAreaName + '</span>'
        //            } else {
        //                if (localStorage.UserType.indexOf("Global Contract Owner") >= 0) {
        //                    additional = '<span style="color:#3487ce; cursor:pointer;" onclick="javascript:treeviewclickRequest(this)">' + item.BusinessAreaName + '</span>'
        //                } else {
        //                    additional = '<span>' + item.BusinessAreaName + '</span><span style="font-size:12px;font-style:italic;">(Request Access)</span>';
        //                }
        //            }
        //        } else {
        //            additional = '<span>' + item.BusinessAreaName + '</span>';
        //        }
        //    }

        //    if (item.ParentBusinessAreaID == 0) {
        //        strContractAreaName12 = item.BusinessAreaName;
        //        strContractAreaID = item.RowKey;
        //        strContractAreaName12Owner = item.Owner;
        //        article1 += '<tr data-tt-id="tre-' + item.RowKey + '" class="branch expanded">';
        //        article1 += '<td class="treeHead"><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaName12 + '</span><span id="ContractAreaAdmin" style="display:none;">' + strContractAreaName12Owner + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/globset.png" /><small>' + additional + '</small></td></tr>';
        //    } else {
        //        if (previousidcreate == item.ParentBusinessAreaID) {

        //            article1 += '<tr data-tt-id="tre-' + item.RowKey + '" data-tt-parent-id="tre-' + item.ParentBusinessAreaID + '" class="branch collapsed" style="display: table-row;">';

        //            //find if child business area exists
        //            $.ajax({
        //                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/childbusinessareas?businessareaid=' + item.RowKey,
        //                type: 'GET',
        //                dataType: 'json',
        //                'Content-Type': 'application/json',
        //                headers: { 'eContracts-ApiKey': localStorage.APIKey },
        //                async: false,
        //                success: function (data) {
        //                    if (data.length == 0) {
        //                        article1 += '<td><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaName12 + '</span><span id="ContractAreaAdmin" style="display:none;">' + strContractAreaName12Owner + '</span><span id="BusinessAreaOwner" style="display:none;">' + item.Owner + '</span><span id="BusinessAreaDescription" style="display:none;">' + item.Description + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/gen.png" class="padding_left_65px" /><small>' + additional + '</small></td></tr>';
        //                    } else {
        //                        article1 += '<td><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaName12 + '</span><span id="ContractAreaAdmin" style="display:none;">' + strContractAreaName12Owner + '</span><span id="BusinessAreaOwner" style="display:none;">' + item.Owner + '</span><span id="BusinessAreaDescription" style="display:none;">' + item.Description + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/gen.png" /><small>' + additional + '</small></td></tr>';
        //                    }
        //                },
        //                error:
        //                    function (data) {

        //                    }
        //            });
        //        } else {
        //            article1 += '<tr data-tt-id="tre-' + item.RowKey + '" data-tt-parent-id="tre-' + item.ParentBusinessAreaID + '" class="branch collapsed" style="display: table-row;">';
        //            article1 += '<td><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaName12 + '</span><span id="ContractAreaAdmin" style="display:none;">' + strContractAreaName12Owner + '</span><span id="BusinessAreaOwner" style="display:none;">' + item.Owner + '</span><span id="BusinessAreaDescription" style="display:none;">' + item.Description + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/gen.png" /><small>' + additional + '</small></td></tr>';
        //        }
        //        if (previousidcreate != item.ParentBusinessAreaID)
        //            previousidcreate = item.RowKey;
        //    }
        //    //if (previousidcreate != item.ParentBusinessAreaID)
        //    //    recursiveIteration12(object.ChildrenData[i])

        //    if (object.ChildrenData.length > 0)
        //        recursiveIteration12(object.ChildrenData[i]);
        //}
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
        var found = $.grep(BusinessAreaAccessWithRead, function (n, ind) {
            if (spath.indexOf('>') >= 0) { //eO310661
                return (n.indexOf(spath) == 0);
            }
            else {
                return (n.split('>')[0].toLowerCase().trim() == spath.toLowerCase());
            }
        });
        if (found.length > 0 || localStorage.UserType.indexOf("Global Contract Owner") >= 0 || item.RowKey == "GenCA" || item.RowKey == "GenBA") {
            // var j = BusinessAreaAccess12.indexOf(item.BusinessAreaName);
            var j = BusinessAreaAccessID.indexOf(item.RowKey);
            if (j > -1 || item.Owner.trim().split(';').indexOf(localStorage.UserName.trim()) > -1) {
                if (item.ParentBusinessAreaID != 0) {
                    if (item.Owner.trim().split(';').indexOf(localStorage.UserName.trim()) > -1) {//if business owner
                        additional = '<span style="color:#3487ce; cursor:pointer;" onclick="javascript:treeviewclickRequest(this)">' + item.BusinessAreaName + '</span>&nbsp; <img src="/Content/Images/icon/profile.png" style="cursor:default;" />'
                    } else { //if permission in business area
                        additional = '<span style="color:#3487ce; cursor:pointer;" onclick="javascript:treeviewclickRequest(this)">' + item.BusinessAreaName + '</span>'
                    }
                } else {
                    additional = '<span>' + item.BusinessAreaName + '</span>';
                }

            } else {
                if (item.ParentBusinessAreaID != 0) {
                    if (strContractAreaID == "GenCA") {
                        additional = '<span style="color:#3487ce; cursor:pointer;" onclick="javascript:treeviewclickRequest(this)">' + item.BusinessAreaName + '</span>'
                    } else {
                        if (localStorage.UserType.indexOf("Global Contract Owner") >= 0) {
                            additional = '<span style="color:#3487ce; cursor:pointer;" onclick="javascript:treeviewclickRequest(this)">' + item.BusinessAreaName + '</span>'
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
                if (previousidcreate == item.ParentBusinessAreaID) {

                    article1 += '<tr data-tt-id="tre-' + item.RowKey + '" data-tt-parent-id="tre-' + item.ParentBusinessAreaID + '" class="branch collapsed" style="display: table-row;">';

                    //find if child business area exists
                    //Performance


                    // if (item.ChildrenData.length == 0) {
                    //     article1 += '<td><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaName12 + '</span><span id="ContractAreaAdmin" style="display:none;">' + strContractAreaName12Owner + '</span><span id="BusinessAreaOwner" style="display:none;">' + item.Owner + '</span><span id="BusinessAreaDescription" style="display:none;">' + item.Description + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/gen.png" class="padding_left_65px" /><small>' + additional + '</small></td></tr>';
                    // } else {
                    //     article1 += '<td><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaName12 + '</span><span id="ContractAreaAdmin" style="display:none;">' + strContractAreaName12Owner + '</span><span id="BusinessAreaOwner" style="display:none;">' + item.Owner + '</span><span id="BusinessAreaDescription" style="display:none;">' + item.Description + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/gen.png" /><small>' + additional + '</small></td></tr>';
                    // }
                    $.ajax({
                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/childbusinessareas?businessareaid=' + item.RowKey,
                        type: 'GET',
                        dataType: 'json',
                        'Content-Type': 'application/json',
                        headers: { 'eContracts-ApiKey': localStorage.APIKey },
                        async: false,
                        success: function (data) {
                            if (data.length == 0) {
                                article1 += '<td><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaName12 + '</span><span id="ContractAreaAdmin" style="display:none;">' + strContractAreaName12Owner + '</span><span id="BusinessAreaOwner" style="display:none;">' + item.Owner + '</span><span id="BusinessAreaDescription" style="display:none;">' + item.Description + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/gen.png" class="padding_left_65px" /><small>' + additional + '</small></td></tr>';
                            } else {
                                article1 += '<td><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaName12 + '</span><span id="ContractAreaAdmin" style="display:none;">' + strContractAreaName12Owner + '</span><span id="BusinessAreaOwner" style="display:none;">' + item.Owner + '</span><span id="BusinessAreaDescription" style="display:none;">' + item.Description + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/gen.png" /><small>' + additional + '</small></td></tr>';
                            }
                        },
                        error:
                            function (data) {

                            }
                    });
                } else {
                    article1 += '<tr data-tt-id="tre-' + item.RowKey + '" data-tt-parent-id="tre-' + item.ParentBusinessAreaID + '" class="branch collapsed" style="display: table-row;">';
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


var treeBusinessAreaName = '';
var treeBusinessAreaRowKey = '';
var treeBusinessAreaParentBusinessAreaID = '';
var treeBusinessAreaContractAreaName = '';
var treeBusinessAreaContractAreaNameOwner = '';
var treeBusinessAreaOwner = '';
var treeBusinessAreaDescription = '';

function treeviewclickRequest(obj) {
    treeBusinessAreaName = obj.textContent;
    treeBusinessAreaRowKey = obj.parentNode.parentNode.childNodes[2].textContent;
    treeBusinessAreaParentBusinessAreaID = obj.parentNode.parentNode.childNodes[1].textContent;
    treeBusinessAreaContractAreaName = obj.parentNode.parentNode.childNodes[3].textContent;
    treeBusinessAreaContractAreaNameOwner = obj.parentNode.parentNode.childNodes[4].textContent;
    treeBusinessAreaOwner = obj.parentNode.parentNode.childNodes[5].textContent;
    treeBusinessAreaDescription = obj.parentNode.parentNode.childNodes[6].textContent;
    thisBusinessAreaNameC = treeBusinessAreaName;
    thisContractAreaNameC = treeBusinessAreaContractAreaName;
    thisBusinessAreaNameRowKey = treeBusinessAreaRowKey;
    thisContractAreaNameRowKey = treeBusinessAreaParentBusinessAreaID;
    $('#liSelectedBA').html('<span style="font-size:11px;">' + treeBusinessAreaName + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveSelected(this);" style="float:right" /></span>');
}



//Check the Request Title is Exists in the Request Table (Request Title is unique)
function CheckRequestTitleExist(requesttitle) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/checkrequesttitleexist?requesttitle=' + encodeURIComponent(requesttitle),
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            if (data == null)
            { Checkdatebeforsave(); }
            else
            {
                if (data.InRecycleBin) {
                    swal("", "A Request with title " + requesttitle + " exists in the recycle bin. Please enter a different title.");
                } else {
                    swal("", "Request exists with the title " + requesttitle + "");
                }
                $("#loadingPage").fadeOut();
            }
        },
        error: function (data) {
            Checkdatebeforsave();
        }
    });
}



//Create Request
function CreateRequest(isdraft) {
    var vTitle = $("#txtRequestTitle").val();
    var requestForm = $("#saveRequestForm *").serialize();
    var result = "&";
    $("#saveRequestForm .fielddatecontrol").each(function (index) {
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
    requestForm += result;

    result = "&";
    $("#saveRequestForm .fieldphonecontrol").each(function (index) {
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
    requestForm += result;


    if (requestForm.indexOf("&OriginatingParty=") == -1) {
        if (requestForm.indexOf("&CompanyProfile=") == -1) {
            requestForm += "&OriginatingParty=" + thisLegalEntity;
        } else {
            var legalentityselection = $("#CompanyProfile").find('option:selected').text();
            if (typeof legalentityselection != 'undefined' && typeof legalentityselection != "") {
                if (legalentityselection != "--Select--") {
                    requestForm += "&OriginatingParty=" + legalentityselection;
                } else {
                    requestForm += "&OriginatingParty=" + thisLegalEntity;
                }
            }
        }
    }
    requestForm += "&RequestTitle=" + encodeURIComponent(vTitle);
    requestForm += "&BusinessArea=" + encodeURIComponent($("#txtRequestBusinessArea").val().trim());
    requestForm += "&RequestType=" + encodeURIComponent($("#ddlRequestTypes option:selected").text());
    requestForm += "&AccountID=" + localStorage.AccountID;
    requestForm += "&CreatedBy=" + localStorage.UserName;
    requestForm += "&ModifiedBy=" + localStorage.UserName;
    requestForm += "&InRecycleBin=" + "";
    requestForm += "&ContractArea=" + encodeURIComponent($("#txtContractAreaName").val().trim());
    requestForm += "&ContractAreaAdministrators=" + $("#txtContractAreaAdministrators").val().trim();
    requestForm += "&BusinessAreaOwners=" + $("#txtBusinessAreaOwners").val().trim();
    requestForm += "&BusinessAreaPath=" + encodeURIComponent(businessAreaPath);
    if (isdraft) {
        requestForm += "&Submittedby=";
        requestForm += "&IsDraft=Yes";
    }
    else {
        requestForm += "&IsDraft=" + "";
        requestForm += "&Submittedby=" + localStorage.UserName;
    }
    requestForm = requestForm.replace('CompanyProfile=0', 'CompanyProfile=');

    if (isdraft == false) {
        if (requestForm.indexOf("&Status=0") >= 0) {
            requestForm = requestForm.replace(/&Status=0/g, "&Status=New");
        }
        else if (requestForm.indexOf("&Status=") < 0) {
            requestForm += "&Status=New";
        }
    }
    else {
        if (requestForm.indexOf("&Status=0") >= 0) {
            requestForm = requestForm.replace(/&Status=0/g, "&Status=Draft");
        }
        else if (requestForm.indexOf("&Status=") < 0) {
            requestForm += "&Status=Draft";
        }
    }

    if (requestForm.indexOf("AssignedTo") == -1) {
        var Assigntodefault = defaultAssignto;
        var defaultassignstr = '';
        $(Assigntodefault).each(function (i, item) {
            if (typeof (item) != 'undefined') {
                if (defaultassignstr == '') {
                    defaultassignstr = item;
                }
                else {
                    defaultassignstr += ";" + item;
                }
            }

        });

        if (defaultassignstr != '')
            requestForm += "&AssignedTo=" + defaultassignstr;
    }

    var formData = new FormData();
    formData.append("AccountID", localStorage.AccountID);
    formData.append("SearializeControls", requestForm);

    //file upload
    $('input:file[name="docAttachment"]').each(function (index, value) {
        formData.append("opmlFile" + index + "", value.files[0]);
    });
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests',
        type: 'POST',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, UserName: localStorage.UserName, 'RefreshToken': localStorage.RefreshToken },
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            location = "/Pipeline/RequestDetails?RequestID=" + data;
        },
        error: function (person) {
            $("#loadingPage").fadeOut();
        }
    });
}

//Click the Save as Draft Button
$('#btnSaveasDraftRequest').click(function () {
    $("#loadingPage").fadeIn();
    if ($("#txtRequestTitle").val() != "") {
        if ($("#txtRequestTitle").val().trim() != "") {
            $("#txtRequestTitle").removeClass('error');
            $("#spInProgress").css('visibility', 'visible');
            CreateRequest(true);
            $("#spInProgress").css('visibility', 'hidden');
        } else {
            $("#txtRequestTitle").addClass('error');
            $("#loadingPage").fadeOut();
        }
    }
    else {
        $("#txtRequestTitle").addClass('error');
        $("#loadingPage").fadeOut();
    }
});

$('#btnCreateRequest').click(function () {
    $("#spInProgress").css('visibility', 'visible');
    if (requiredValidator('saveRequestForm', false)) {
        var vTitle = $("#txtRequestTitle").val().trim();
        $("#loadingPage").fadeIn();
        CheckRequestTitleExist(vTitle);
    }
    autoscroll();
    $("#spInProgress").css('visibility', 'hidden');
});

//manoj
function Checkdatebeforsave() {
    if (!comparedates("StartDate", "EndDate", "End date should be greater than Start date")) {
        swal("", "End date should be greater than Start date");
        $("#loadingPage").fadeOut();
    }
    else if (!comparedates("StartDate", "RenewalDate", "Renewal date should be greater than Start date")) {
        swal("", "Renewal date should be greater than Start date");
        $("#loadingPage").fadeOut();
    }
    else if (!comparedates("StartDate", "ExpiryDate", "Expiry date should be greater than Start date")) {
        swal("", "Expiry date should be greater than Start date");
        $("#loadingPage").fadeOut();
    } else if (!comparedates("EffectiveDate", "EndDate", "End date should be greater than Effective date")) {
        swal("", "End date should be greater than Effective date");
        $("#loadingPage").fadeOut();
    }
    else if (!comparedates("EffectiveDate", "RenewalDate", "Renewal date should be greater than Effective date")) {
        swal("", "Renewal date should be greater than Effective date");
        $("#loadingPage").fadeOut();
    }
    else if (!comparedates("EffectiveDate", "ExpiryDate", "Expiry date should be greater than Effective date")) {
        swal("", "Expiry date should be greater than Effective date");
        $("#loadingPage").fadeOut();
    }
    else if ((!comparedateswithGTtoday("RequiredByDate"))) {
        swal("", "Required by date should not be less than today.");
        $("#loadingPage").fadeOut();
    }
    else {
        CreateRequest(false);
    }
}
//manoj

//Get The Users
function GetUserList() {
    var vUserList = '';
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/users',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        async: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
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
    return vUserList;
}



function BindRequestTypes() {
    var prvselectedtrigger = $("#ddlRequestTypes option:selected").text();
    var prvselectedreqtype = (typeof ($("#ddlRequestTypes option:selected").text()) != 'undefined' && $("#ddlRequestTypes option:selected").text() != null && $("#ddlRequestTypes option:selected").text() != "" && $("#ddlRequestTypes option:selected").text() != "--Select--") ? $("#ddlRequestTypes option:selected").text() : RequestType;
    $("#ddlRequestTypes").empty();
    $("#ddlRequestTypes").append("<option value='0'>--Select--</option>");

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/requesttypes',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        async: false,
        success: function (requestTypes) {
            if (requestTypes.length > 0) {

                $(requestTypes).each(function (i, item) {

                    if (item.Active == true) {
                        var find = " ";
                        var re = new RegExp(find, 'g');

                        var str = escape(item.RequestType + '~' + item.Description);
                        if (RequestType == item.RequestType) {
                            if (item.Active) {
                                $("#ddlRequestTypes").append('<option value="' + str + '" selected>' + item.RequestType + '</option>');
                                $("#lblContractTypeDescription").text(item.Description);
                                if (treeBusinessAreaOwner != "") {
                                    AssignToDDlPopulate("AssignedTo", treeBusinessAreaOwner);
                                }
                            }
                        } else {
                            if (typeof thisContractAreaSettings != 'undefined') {
                                if (thisContractAreaSettings.RequestType.split(';').indexOf(item.RequestType) > -1) {
                                    if (prvselectedreqtype == item.RequestType) {
                                        $("#ddlRequestTypes").append('<option value="' + str + '" selected>' + item.RequestType + '</option>');
                                        $("#lblContractTypeDescription").text(item.Description);
                                        if (treeBusinessAreaOwner != "") {
                                            AssignToDDlPopulate("AssignedTo", treeBusinessAreaOwner);
                                        }
                                    } else {
                                        $("#ddlRequestTypes").append('<option value="' + str + '">' + item.RequestType + '</option>')
                                    }
                                }
                            }
                        }
                    }
                });
                //manoj
                if (typeof prvselectedtrigger != 'undefined' && prvselectedtrigger != null && prvselectedtrigger != "" && prvselectedtrigger != $("#ddlRequestTypes option:selected").text()) {
                    $('#ddlRequestTypes').trigger('change');
                }
                else if (RequestType != "") {
                    $('#ddlRequestTypes').trigger('change');
                }
            }
        },
        error: function (requestTypes) {
            $('#ddlRequestTypes').trigger('change');
        }
    });
}

//Request Types dropdown Change Event
var removeformdata = false;
$("#ddlRequestTypes").change(function (obj) {
    //manoj
    if ($("#ddlRequestTypes option:selected").val() == "0") {
        $("#imgbusinessarea").removeAttr("title");
        $("#imgrequesttype").removeAttr("title");
        $("#imgrequesttitle").removeAttr("title");
    }
    //manoj
    var RType = unescape($("#ddlRequestTypes option:selected").val());
    var vRequestTypeVal = RType.split('~');
    if (vRequestTypeVal.length > 1) {
        $("#lblContractTypeDescription").text(vRequestTypeVal[1]);
    }

    if (removeformdata) {
        $('#mainRequestForm div').each(function (index) {
            if (index > 15) {

            }
        });
    }
    getrequesttypemetadata(vRequestTypeVal[0]);
    //BindBusinessAreaPicker11();
    if (vRequestTypeVal = "0") {
    }
    removeformdata = true;
});

var vContractMetadataFields = [];
//Get The Request Type Meta Data By RequestName And Prepare the Form
function getrequesttypemetadata(strrequesttype) {
    var idel123 = 0;
    var idelcheck = null;
    $("#newdivforcheck").empty();
    $("#undercheck").empty();
    $("#loadingPage").fadeIn();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/requesttypes/metadatas?requesttypename=' + encodeURIComponent(strrequesttype),
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (metadataFields) {
            vContractMetadataFields = [];
            var vUserList = '';
            var strPreviousFieldGroupName = '';
            $(metadataFields).each(function (i, item) {
                var strFieldGroupName = item.FieldGroup;
                if ((item.FieldName == "RequestTitle") || (item.FieldName == "RequestType") || (item.FieldName == "BusinessArea")) {
                    //manoj
                    switch (item.FieldName) {
                        case "BusinessArea":
                            {
                                $("#imgbusinessarea").attr('title', item.HelpText);
                                break;
                            }
                        case "RequestType":
                            {
                                $("#imgrequesttype").attr('title', item.HelpText);
                                break;
                            }
                        case "RequestTitle":
                            {
                                $("#imgrequesttitle").attr('title', item.HelpText);
                                break;
                            }
                    }
                    //manoj
                    $("#fieldGroup-1").text(item.FieldGroup);
                }
                else {
                    if ((item.FieldType == "File Upload") || (item.FieldName == "Status")) {
                    }
                    else {
                        vContractMetadataFields.push(item.FieldName);
                    }

                    var idelvalue = "grp" + item.FieldGroup;
                    idelvalue = idelvalue.replace('&amp;', '');
                    idelvalue = idelvalue.replace(/[\*\|\,\"\:\<\>\[\}\{\}\'\(\)\@\&\$\#\%\.\-\!\@\$]/g, '').replace(/\//g, '').replace(/ /g, '');
                    if (item.ShowInCreateForm == "true") {
                        var vControlsGroup = "";
                        if (strPreviousFieldGroupName != item.FieldGroup) {
                            vControlsGroup += '<div class="row-group"><hr class="form_hr"/>';
                            vControlsGroup += '<div class="col12 no-pad">';
                            vControlsGroup += '<div class="collapse-heading">';
                            vControlsGroup += '<div class="col10 no-pad">';
                            vControlsGroup += '<h3 class="h3-head" style="padding-left: 10px;">' + item.FieldGroup + '</h3>';
                            $.ajax({
                                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/requestfieldgroup?groupname=' + item.FieldGroup,
                                type: 'GET',
                                dataType: 'json',
                                headers: { 'eContracts-ApiKey': localStorage.APIKey },
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
                            idelcheck = createingdivbyme(item, vControlsGroup, idelvalue, idelcheck);
                        }
                        else {
                            idelcheck = createingdivbyme(item, vControlsGroup, idelvalue, idelcheck);
                        }
                    }
                }
                strPreviousFieldGroupName = item.FieldGroup;
            });
            $("#loadingPage").fadeOut();
        }, error: function (data) {
            $("#loadingPage").fadeOut();
        }
    });
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

function CounterpartyFuncOld(CounterpartyNames) {
    $("#loadingPage").fadeIn();
    $("#tblCounterparties").empty();
    $("#liSelectedCounterParty").empty();
    var SelectedCounterpartList = [];
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/counterpartypicker',
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            CounterPartyArrayprev = [];
            if (CounterpartyNames.length > 0) {
                $.each(CounterpartyNames, function () {
                    if (SelectedCounterpartList.indexOf($.trim(this)) == -1)
                        SelectedCounterpartList.push($.trim(this));
                });
            }
            var myCounterPartyArrayList = [];
            var obj1 = {};
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
                article += '<label for="CP' + itemArray.RowKey + '" class="css1-label" title="' + escape(itemArray.CounterpartyName.trim()) + '" onmouseover="UnescapeNameMouseOver(this)" style="display: inline;"><a href="/Counterparty/CounterpartyDetail?CounterpartyID=' + itemArray.RowKey + '" target="_blank">' + itemArray.CounterpartyName.trim() + '</a></label></td>'; //ENH487 Customer inhanc
                article += '<td>' + itemArray.CounterpartyType + '</td>';
                countryvalue = itemArray.Country != "0" ? itemArray.Country : "-"
                article += '<td>' + countryvalue + '</td>';
                article += '</tr>';
            });
            //manoj
            $("#listWrapper").html('<table id="tblCounterparties" class="f_list"></table>');
            $("#tblCounterparties").html(article);
            _alphabetSearch = '';
            $("#tblCounterparties").DataTable({
                "columnDefs": [
                { "orderable": false, 'targets': "_all" }
                ],
                "fnDrawCallback": function () { eventFired('Counterparty', 'selectallCounterParty', 'tblCounterparties'); },
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
            $("#loadingPage").fadeOut();
            $('.CP_Det').remove();
            $(".CP_Det1").css('display', 'none');
            PrvRelatedCounterparities = [];
            arrRelatedCounterparities = [];
            curRelatedCounterparities = [];
            $("#browseCounterparty").dialog("option", "title", "Counterparty Picker");
            $("#browseCounterparty").dialog("open");
        },
        error: function () {

            //[bug id: eO36259][Unable to pick the counterparty while creating request if there is no counterparty]
            PrvRelatedCounterparities = [];
            arrRelatedCounterparities = [];
            curRelatedCounterparities = [];
            $("#listWrapper").html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>');
            $('.CP_Det').remove();
            $(".CP_Det1").css('display', 'none');
            $("#browseCounterparty").dialog("option", "title", "Counterparty Picker");
            $("#browseCounterparty").dialog("open");
            $("#loadingPage").fadeOut();
        }
    });
}

var cp_nextpagetoken = "";
var SelectedCounterpartList = [];
var myCounterPartyArrayAll = [];
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
            //$("#txtSearchBoxCounterparties").autocomplete({
            //    source: columncounterparty,
            //    minLength: 1,
            //    focus: function (event, ui) {
            //        return false;
            //    },
            //    select: function (evn, uidetails) {
            //        $("#txtSearchBox").val(uidetails.item.label);
            //        SearchCounterpartyPicker();
            //    }
            //});
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
    var vsrhKeyword = $("#txtSearchBoxCounterparties").val().toLowerCase();
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
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            CounterPartyArrayprev = [];
            $.each($('#CompanyProfile').val().replace("; ", ";").split(";"), function () {
                if (SelectedLEList.indexOf($.trim(this)) == -1)
                    SelectedLEList.push($.trim(this));
            });

            var myLEArrayList = [];
            var obj1 = {};

            $(data).each(function (idata, itemdata) {
                myLEArrayList.push(itemdata);
            });
            //manoj

            var article = '<thead><tr><th style="height:24px"><input id="selectallLE" onclick="funselectallLE(this);" type="checkbox"/> Legal Entity</th><th style="height:24px">Default Currency</th><th>Authorized Signatory(ies)</th></tr></thead><tbody>';
            //manoj 
            var countryvalue = ''
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
                "fnDrawCallback": function () { eventFired('CompanyProfile', 'selectallLE', 'tblLE'); },
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

function SearchCounterparty() {

    //  multipleChecksDocumentID = [];
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/counterpartypicker?searchkeyword=' + encodeURIComponent($("#txtSearchBox").val()) + '&customquery=&sortbyfield=CounterpartyName&orderby=ASC',
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            $("#tblCounterparties").empty();
            $("#liSelectedCounterParty").empty();
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
                $("#loadingPage").fadeOut();

                $("#browseCounterparty").dialog("option", "title", "Counterparty Picker");
                $("#browseCounterparty").dialog("open");
                $("#tblCounterparties").html('<p style="color: black; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>');
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
//$('#txtCounterpartyName').keypress(function (e) {
//    if ($('#txtCounterpartyName').val() != "") {
//        if (e.keyCode == 13) {
//            e.preventDefault();
//            fillCounterpartyDetails();
//            //$(".ui-autocomplete").css('display', 'none');
//            //AddCounterparty();
//        }
//    }
//});
function CounterpartyPopup() {
    $("#txtCounterpartyID").val("");
    $("#txtCounterpartyName").val("");
    $('#ddlCounterpartyType').val('0');
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

function SaveCounterparty() {
    var isformvalid = false;
    if (requiredValidator('addEditCounterparty', false)) {
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
                    ModifiedBy: localStorage.UserName
                },
                cache: false,
                success: function (person) {
                    swal("", person);
                    if (strSelCounterPartyField != "") {
                        if ($("#" + strSelCounterPartyField + "").val() == '')
                            $('#' + strSelCounterPartyField + '').val($("#txtCounterpartyName").val());
                        else
                            $('#' + strSelCounterPartyField + '').val($('#' + strSelCounterPartyField + '').val() + "; " + $("#txtCounterpartyName").val());
                    }
                    else {
                        if ($("#Counterparty").val() == '')
                            $('#Counterparty').val($("#txtCounterpartyName").val());
                        else
                            $('#Counterparty').val($('#Counterparty').val() + "; " + $("#txtCounterpartyName").val());
                    }



                    CounterpartyFunc();
                    CounterpartyFunc1();
                    $("#addEditCounterparty").dialog("close");
                }
            });
        }
    }
    return isformvalid;
}

function getcompanyprofile() {
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

function SelectLegalEntities() {
    $("#OPCounterparties").removeClass('pop_up_Harizondal_meta_active');
    $("#OPLeagalEntities").addClass('pop_up_Harizondal_meta_active');
    $('#tblOPLegalEntities').css("display", "");
    $('#tblOPCounterparties').css("display", "none");
    $('#txtOriginatingPartyType').val("Legal Entity");
    $('#compact-paginationOPLegalEntities').css("display", "");
    $('#compact-paginationOPCounterparties').css("display", "none");
}

function SelectCounterparties() {
    $("#OPLeagalEntities").removeClass('pop_up_Harizondal_meta_active');
    $("#OPCounterparties").addClass('pop_up_Harizondal_meta_active');
    $('#tblOPLegalEntities').css("display", "none");
    $('#tblOPCounterparties').css("display", "");
    $('#txtOriginatingPartyType').val("Counterparty");
    $('#compact-paginationOPCounterparties').css("display", "");
    $('#compact-paginationOPLegalEntities').css("display", "none");
}

function getStatus() {
    var control = "";
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/requeststatus',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        async: false,
        success: function (status) {
            $(status).each(function (i, item) {
                if (item.RequestStatus == "New") {
                    control += "<option selected='selected' value='" + item.RequestStatus + "'>" + item.RequestStatus + "</option>";
                } else {
                    control += "<option value='" + item.RequestStatus + "'>" + item.RequestStatus + "</option>";
                }
            });
        }
    });
    return control;
}

function getContractCurrency() {
    var control = "";
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/currencies',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        async: false,
        success: function (data) {
            $(data).each(function (i, item) {
                if (thisCurrency != "") {
                    if (item.Abbreviation == thisCurrency) {
                        control += "<option selected='selected' value='" + item.Abbreviation + "'>" + item.Abbreviation + "</option>";
                    } else {
                        control += "<option value='" + item.Abbreviation + "'>" + item.Abbreviation + "</option>";
                    }
                } else {
                    if (item.BaseCurrency == "Yes") {
                        control += "<option selected='selected' value='" + item.Abbreviation + "'>" + item.Abbreviation + "</option>";
                    } else {
                        control += "<option value='" + item.Abbreviation + "'>" + item.Abbreviation + "</option>";
                    }
                }
            });
        }
    });
    return control;
}

function ViewGeneric(obj) {
    vGlobalObjForGeneric = obj;
    $("#loadingPage").fadeIn();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/requestfieldbydisplayname?fielddisplayname=' + encodeURIComponent(obj.id),
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            $("#tblGenericheader").empty();
            $("#tblGeneric").empty();
            $("#liSelectedRU").empty();
            var art = '<tr><td><article style="width:100%; text-align:center;">';
            art += '<input id="txtSearchBoxGeneric" class="f_inpt cl width80" type="text" style="text-wrap:none" placeholder="Type to Search" />';
            art += '<img title="Search" style="cursor: pointer; position: relative; left: -40px; top:-2px;" onclick="javascript: SearchGeneric();" src="../Content/Images/search_over.png" />';
            art += "<a href='javascript:void(0)' class='linkPickerClear' onclick='ClearGeneric();'>Clear</a>";
            art += '</article></td></tr>';
            $("#tblGenericheader").append(art);
            var prevSelected = $("#" + obj.title).val();
            arrprevRU = [];
            $.each(prevSelected.split(";"), function () {
                arrprevRU.push($.trim(this));
            });
            var arraysplitRU = [];
            myArrayRU = [];
            arraysplitRU = data[0].ChoiceValues.split("\n")
            var obj1 = {};
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
                $("#loadingPage").fadeOut();
                $("#browseGeneric").dialog("open");
                $("#tblGenericheader").html('<p style="color: black; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>')
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
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/requestfieldbydisplayname?fielddisplayname=' + encodeURIComponent(vGlobalObjForGeneric.id),
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            $("#tblGeneric").empty();
            $("#liSelectedRU").empty();
            var prevSelected = $("#" + vGlobalObjForGeneric.title).val();
            arrprevRU = [];
            $.each(prevSelected.split(";"), function () {
                arrprevRU.push($.trim(this));
            });
            var arraysplitRU = [];
            myArrayRU = [];
            arraysplitRU = data[0].ChoiceValues.split("\n")
            var obj1 = {};
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
                $('#loadGen').empty();
                $("#tblGeneric").html('<p style="color: black; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>');
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

function ViewGenericCounterparty(obj) {
    vGlobalObjForGeneric = obj;
    $("#loadingPage").fadeIn();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterpartyfieldbydisplayname?fielddisplayname=' + obj.id,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            $("#tblGeneric").empty();
            $("#tblGenericheader").empty();
            $("#liSelectedRU").empty();
            var art = '<tr><td><article style="width:100%; text-align:center;">';
            art += '<input id="txtSearchBoxGeneric" class="f_inpt cl width80" type="text" style="text-wrap:none" placeholder="Type to Search" />';
            art += '<img title="Search" style="cursor: pointer; position: relative; left: -40px; top:-2px;" onclick="javascript: SearchGenericCounterparty();" src="../Content/Images/search_over.png" />';
            art += "<a href='javascript:void(0)' class='linkPickerClear' onclick='ClearGenericCounterparty();'>Clear</a>";
            art += '</article></td></tr>';
            $("#tblGenericheader").append(art);
            var prevSelected = $("#" + obj.title).val();
            var arrprev = [];
            $.each(prevSelected.split(";"), function () {
                arrprev.push($.trim(this));
            });
            var arraysplitRU = [];
            myArrayRU = [];
            arraysplitRU = data[0].ChoiceValues.split("\n")
            var obj1 = {};
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
            $("#loadingPage").fadeOut();
            $("#browseGeneric").dialog("open");
        },
        error:
            function (data) {
                $("#loadingPage").fadeOut();
                $("#browseGeneric").dialog("open");
                $("#tblGeneric").html('<p style="color: black; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>');
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

    multipleChecksDocumentID = [];
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterpartyfieldbydisplayname?fielddisplayname=' + vGlobalObjForGeneric.id,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
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
            var obj1 = {};
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
                $("#tblGeneric").html('<p style="color: black; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>');
            }
    });
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
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            $("#tblGenericforcon").empty();
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
                $('#loadGencon').empty();
                $("#tblGenericforcon").html('<p style="color: black; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>');
            }
    });
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
        //    } else {
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
        $("#txtOwnerofBusinessArea").val('');
        $('input[type="radio"][name=IsGlobal][value="Yes"]').prop('checked', true);
        $("#trcp-RgBusi").hide();
        $("#txtOwnerofBusinessArea").removeClass("validelement");
    }

});



function getCounterpartyFields() {
    $("#loadingPage").fadeIn();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/primaryfields',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
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
                            var PhoneID = "";
                            var PhoneCountry = "";
                            var isYesOrNo = false;
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
                                        vControls += "<select id=" + item.FieldName + "  name=" + item.FieldName + " title='" + item.FieldDisplayName + "'>";
                                    }
                                    vControls += "<option value='0'>--Select--</option>";
                                    $.ajax({
                                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/countrynames',
                                        type: 'GET',
                                        dataType: 'json',
                                        'Content-Type': 'application/json',
                                        cache: false,
                                        async: false,
                                        headers: { 'eContracts-ApiKey': localStorage.APIKey },
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
                                    vControls += "<input type='text' id='" + item.FieldName + "_CP'" + " title='" + item.FieldDisplayName + "'  class='form-contro validelement validPhone fieldphonecontrol' />";
                                } else {
                                    vControls += "<input type='text' id='" + item.FieldName + "_CP'" + " title='" + item.FieldDisplayName + "'  class='form-contro validPhone fieldphonecontrol' />";
                                }
                                vControls += '<label  class="p-text">' + item.Description + '</label>';
                                vControls += '</div></li>';

                                vPhoneNumber = vControls;
                                PhoneID = item.FieldName + "_CP";
                                PhoneCountry = item.Country;
                            }
                            else if (item.FieldType == "Date") {

                                if (item.Required == "true") {
                                    vControls += "<input type='text' id=" + item.FieldName + " title='" + item.FieldDisplayName + "'  class='validelement validdate fielddatecontrol form-contro-Date " + item.FieldName + "'/>";
                                } else {
                                    vControls += "<input type='text' id=" + item.FieldName + "  title='" + item.FieldDisplayName + "' class='validdate fielddatecontrol form-contro-Date " + item.FieldName + "'/>";
                                }
                                vControls += '<br/>' + '<label  class="p-text">' + item.Description + '</label>';
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
                                if (item.FieldName == "ContractTermType") {
                                    $.ajax({
                                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contracttermtypesenabled',
                                        type: 'GET',
                                        dataType: 'json',
                                        "Content-Type": "application/json",
                                        headers: { 'eContracts-ApiKey': localStorage.APIKey },
                                        cache: false,
                                        success: function (data) {
                                            var datalength = data.length;
                                            for (var i = 0; i < datalength; i++) {
                                                var itemname = data[i];
                                                $("#" + item.FieldName).append("<option value='" + itemname.ContractTermName + "'>" + itemname.ContractTermDisplayName + "</option>");
                                            }
                                        }
                                    });
                                }
                                else {
                                    var myArray = [];
                                    myArray = item.ChoiceValues.split("\n")
                                    var myArraylength = myArray.length;
                                    for (var i = 0; i < myArraylength; i = i + 1) {
                                        do {
                                            myArray[i] = myArray[i].replace("&amp;", "&");
                                        } while (myArray[i].indexOf("&amp;") > -1)
                                        vControls += "<option value='" + myArray[i] + "'>" + myArray[i] + "</option>";
                                    }
                                }
                                vControls += '</select>';
                                vControls += '<label  class="p-text">' + item.Description + '</label>';
                                vControls += '</div></li>';
                            } else if (item.FieldType == "Lookup") {
                                if (item.FieldName == "RelatedCounterparties") {
                                    if (item.Required == "true") {
                                        vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validelement' readonly='readonly' type='text' />";
                                    } else {
                                        vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' readonly='readonly' type='text' />";
                                    }
                                    vControls += '<label  class="p-text">' + item.Description + '</label>';
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
                                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/customlookupvaluedetails?lookupname=' + item.ChoiceValues,
                                        type: 'GET',
                                        dataType: 'json',
                                        "Content-Type": "application/json",
                                        headers: { 'eContracts-ApiKey': localStorage.APIKey },
                                        cache: false,
                                        success: function (data) {
                                            var datalength1 = data.LookupFields.split(';');
                                            datalength1 = datalength1.sort();
                                            datalength1 = sortArrOfObjectsByParam(datalength1);
                                            var datalength = datalength1.length;
                                            for (var i = 0; i < datalength; i++) {
                                                var itemname = datalength1[i];
                                                $("#" + item.FieldName).append("<option value='" + itemname + "'>" + itemname + "</option>")
                                            }
                                        }
                                    });
                                    vControls += '</select>';
                                    vControls += '<label  class="p-text">' + item.Description + '</label>';
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
                                            headers: { 'eContracts-ApiKey': localStorage.APIKey },
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
                                vControls += '<label  class="p-text">' + item.Description + '</label>';
                                vControls += '</div></li>';
                                vMultiDDL = item.FieldName;
                            }
                            else if (item.FieldType == "Number") {
                                if (item.Required == "true") {
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validelement form_input' />";
                                } else {
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form_input' />";
                                }
                                vControls += '<label  class="p-text">' + item.Description + '</label>';
                                vControls += '</div></li>';
                                vNumber = item.FieldName;
                            }
                            else if (item.FieldType == "Number-D") {
                                if (item.Required == "true") {
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validelement form_input' />";
                                } else {
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form_input' />";
                                }
                                vControls += '<label  class="p-text">' + item.Description + '</label>';
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
                                vControls += '<label class="p-text" style="float:left;">' + item.Description + '</label>';
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

                                //vControls += "	<div style='width: auto; margin-right: 15px;'><input style='float: left; width: auto;' type='radio' name=" + item.FieldName + " id='Yes" + item.FieldName + "' value='Yes' onchange='changeYesNoField(this);'><span style='float: left; margin: 7px 0px 0px 5px;'>Yes </span></div>";
                                //vControls += "	<div style='width: auto;'><input style='float: left; width: auto;' type='radio' checked name=" + item.FieldName + " id='No" + item.FieldName + "' checked value='No' onchange='changeYesNoField(this);'><span style='float: left; margin: 7px 0px 0px 5px;'>No </span></div>";
                                //vControls += "	<input type='hidden' id='hdnYes" + item.FieldName + "' value=" + item.CommentYes + " />";
                                //vControls += "	<input type='hidden' id='hdnNo" + item.FieldName + "' value=" + item.CommentNo + " />";
                                //vControls += "	<input type='hidden' id='hdnRequired" + item.FieldName + "' value=" + item.CommentRequired + " />";
                                //vControls += '<label style="width:auto;margin:7px 0px 0px 5px;" class="col12 p-text text-left help">' + item.Description + '</label>';
                                //vControls += '</div></li>';


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
                                //if (item.FieldHelp == "true") {
                                //    vControls += '<span style="width:auto;margin:7px 0px 0px 5px;"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                                //}

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
                                vControls += '<label class="p-text">' + item.Description + '</label>';
                                vControls += '</div></li>';
                            } else if (item.FieldType.indexOf("Browse") > -1) {
                                if (item.Required == "true") {
                                    vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validelement' readonly='readonly' type='text' />";
                                } else {
                                    vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' readonly='readonly' type='text' />";
                                }
                                vControls += '<label class="p-text">' + item.Description + '</label>';
                                vControls += "<br/>" + "<a href='javascript:void(0)' class='linkText' id='" + item.FieldDisplayName + "' title='" + item.FieldName + "' onclick='ViewGenericCounterparty(this)'> Browse</a>";
                                vControls += '</div></li>';
                            } else if (item.FieldType == "File Upload") {
                                if (item.Required == "true") {
                                    vControls += "<input type='file' id=" + item.FieldName + " name='docAttachment' class='validelement browse-file-doc' onchange='javascript:changeinuploadChecking(this);' style='cursor:pointer;' />";
                                } else {
                                    vControls += "<input type='file' id=" + item.FieldName + " name='docAttachment' class='browse-file-doc' onchange='javascript:changeinuploadChecking(this);' style='cursor:pointer;' />";
                                }
                                vControls += '<label class="p-text">' + item.Description + '</label>';
                                vControls += '</div></li>';
                            } else if (item.FieldType == "Currency" || item.FieldType == "Value / Financials") {
                                if (item.Required == "true") {
                                    //vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validelement' />";
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validelement validcontractvalue' />";
                                } else {
                                    //vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' />";
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validcontractvalue' />";
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

                                if (vUserList == "")
                                { vUserList = GetUserList(); }
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
                                bindPhoneNumber(PhoneID, PhoneCountry);
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

var vCounterpartyFields = [];
var PrvRelatedCounterparities = [];
var arrRelatedCounterparities = [];
var curRelatedCounterparities = [];
function getCounterpartyprimaryFields() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/primaryfields',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
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
var vCounterparty = '';
var vSelectedCounterPartyId = "";
function AddCounterparty() {
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
            //    CPLI += '<li id=' + escape(arrselectedcunterparty[j]) + ' style="margin: 0 0 5px 0;"><div style="display: inline-block;">' + '<a>' + arrselectedcunterparty[j].trim() + '</a>' + '</div><div style="display: inline-block;padding-left: 10px;"><a href="javascript:void(0)" class="linkText" onclick="ViewCounterpartyDetails(\'' + arrselectedcunterparty[j].trim() + '\')"> View Details</a></div>' + '  <a href=javascript:void(0)  >' + '<img src="/Content/Images/icon/delete.png" onclick="removeCounterParty(' + '\'' + arrselectedcunterparty[j] + '\'' + ')" title="Remove">' + '<a>' + '</li>';
            //}
            //Bug id :eO37627
            $(arrselectedcunterparty).each(function (i, arritem) {
                var itemCounterparty = arritem.replace(/\s+/g, '');//Remove white spaces from string
                if (AllCounterparties.length > 0) {
                    vCounterparty = $.grep(AllCounterparties, function (n, i) {
                        return (n.CounterpartyName.replace(/\s+/g, '').toLowerCase() == itemCounterparty.toLowerCase());
                    });
                }
                if (vCounterparty != null && vCounterparty != "" && vCounterparty.length > 0)
                    CPLI += '<li id="' + escape(itemCounterparty) + '" class="clsCounterparties" style="margin: 0 0 5px 0;"><div style="display: inline-block;">' + '<a>' + arritem + '</a>' + '</div><div style="display: inline-block;padding-left: 10px;"><a href="javascript:void(0)" class="linkText" onclick="ViewCounterpartyDetails(\'' + itemCounterparty + '\')"> View Details</a></div>' + '  <a href=javascript:void(0)  >' + '<img src="/Content/Images/icon/delete.png" onclick="removeCounterParty(this)" title="Remove">' + '<a>' + '</li>';
                else
                    CPLI += '<li id="' + escape(itemCounterparty) + '" class="clsCounterparties" style="margin: 0 0 5px 0;"><div style="display: inline-block;">' + '<a style="color: #6a6a6a !important;">' + arritem + '</a>' + '</div><div style="display: inline-block;padding-left: 10px;"><a href="javascript:void(0)" class="linkText" onclick="ViewCounterpartyDetails(\'' + itemCounterparty + '\')"> View Details</a></div>' + '  <a href=javascript:void(0)  >' + '<img src="/Content/Images/icon/delete.png" onclick="removeCounterParty(this)" title="Remove">' + '<a>' + '</li>';

            });
            if (strSelCounterPartyField != "") {
                $("#" + strSelCounterPartyField + "").val(arrselectedcunterparty.join("; "));
                if (strSelCounterPartyField == "Counterparty") {
                    $("#counterpartyUL li").remove();
                    $("#counterpartyUL").append(CPLI);
                }
            } else {
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
                //$("#counterpartyUL").append('');
            }
            else {
                $("#Counterparty").val('');
                if ($("#counterpartyUL >li").length > 0)
                    $("#counterpartyUL li").remove();
                //$("#counterpartyUL").append('');
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
                    headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                    data: formData,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (data) {
                        if (!$.isEmptyObject(arrRelatedCounterparities)) {
                            CreateRelatedCounterparies(data, $("#txtCounterpartyName").val())
                        }
                        if (vCounterpartyFields.length > 0 && vContractMetadataFields.length > 0) {
                            var common = $.grep(vContractMetadataFields, function (element) {
                                return $.inArray(element, vCounterpartyFields) !== -1;
                            });

                            if (common.length > 0 && common != "") {
                                $.ajax({
                                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/icounterpartydetails?counterpartyid=' + data,
                                    type: 'GET',
                                    dataType: 'json',
                                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
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
                                                $('#' + strSelCounterPartyField + '').val(CPValue.trim());
                                            }
                                            else {
                                                $('#' + strSelCounterPartyField + '').val($("#txtCounterpartyName").val());
                                            }
                                        }
                                        else {
                                            if ($('#Counterparty').val() != "") {
                                                var CPValue = $('#Counterparty').val() + "; " + $("#txtCounterpartyName").val();
                                                $('#Counterparty').val(CPValue.trim());
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

                                    }, error: function (mainmetadataFields) {
                                        if (strSelCounterPartyField != "") {
                                            if ($('#' + strSelCounterPartyField + '').val() != "") {
                                                var CPValue = $('#' + strSelCounterPartyField + '').val() + "; " + $("#txtCounterpartyName").val();
                                                $('#' + strSelCounterPartyField + '').val(CPValue.trim());
                                            }
                                            else {
                                                $('#' + strSelCounterPartyField + '').val($("#txtCounterpartyName").val());
                                            }
                                        }
                                        else {
                                            if ($('#Counterparty').val() != "") {
                                                var CPValue = $('#Counterparty').val() + "; " + $("#txtCounterpartyName").val();
                                                $('#Counterparty').val(CPValue.trim());
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


                                        $("#loadingPage").fadeOut();
                                    }
                                });
                            }
                            else {

                                if (strSelCounterPartyField != "") {
                                    if ($('#' + strSelCounterPartyField + '').val() != "") {
                                        var CPValue = $('#' + strSelCounterPartyField + '').val() + "; " + $("#txtCounterpartyName").val();
                                        $('#' + strSelCounterPartyField + '').val(CPValue.trim());
                                    }
                                    else {
                                        $('#' + strSelCounterPartyField + '').val($("#txtCounterpartyName").val());
                                    }
                                }
                                else {
                                    if ($('#Counterparty').val() != "") {
                                        var CPValue = $('#Counterparty').val() + "; " + $("#txtCounterpartyName").val();
                                        $('#Counterparty').val(CPValue.trim());
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
                        }
                        else {
                            if (strSelCounterPartyField != "") {
                                if ($('#' + strSelCounterPartyField + '').val() != "") {
                                    var CPValue = $('#' + strSelCounterPartyField + '').val() + "; " + $("#txtCounterpartyName").val();
                                    $('#' + strSelCounterPartyField + '').val(CPValue.trim());
                                }
                                else {
                                    $('#' + strSelCounterPartyField + '').val($("#txtCounterpartyName").val());
                                }
                            }
                            else {
                                if ($('#Counterparty').val() != "") {
                                    var CPValue = $('#Counterparty').val() + "; " + $("#txtCounterpartyName").val();
                                    $('#Counterparty').val(CPValue.trim());
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
                        var arrselectedcounterpaty = ";" + $('#' + strSelCounterPartyField + '').val().replace("; ", ";") + ";"
                        if (arrselectedcounterpaty.toLowerCase().indexOf(";" + $("#txtCounterpartyName").val().trim().toLowerCase() + ";") > -1) {
                            duplicatecounteparty = true;
                        }
                    }
                }
                else {
                    if ($('#Counterparty').val() != "") {
                        var arrselectedcounterpaty = ";" + $('#Counterparty').val().replace("; ", ";") + ";"
                        if (arrselectedcounterpaty.toLowerCase().indexOf(";" + $("#txtCounterpartyName").val().trim().toLowerCase() + ";") > -1) {
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
                            $('#' + strSelCounterPartyField + '').val(CPValue.trim());
                        }
                        else {
                            $('#' + strSelCounterPartyField + '').val($("#txtCounterpartyName").val());
                        }
                    }
                    else {
                        if ($('#Counterparty').val() != "") {
                            var CPValue = $('#Counterparty').val() + "; " + $("#txtCounterpartyName").val();
                            $('#Counterparty').val(CPValue.trim());
                        }
                        else {
                            $('#Counterparty').val($("#txtCounterpartyName").val());
                        }
                    }
                    if (strSelCounterPartyField == "Counterparty") {
                        var listr = '<li id="' + escape($("#txtCounterpartyName").val()) + '" class="clsCounterparties" style="margin: 0 0 5px 0;"><div style="display: inline-block;">' + $("#txtCounterpartyName").val() + '</div><div style="display: inline-block;padding-left: 10px;"><a href="javascript:void(0)" class="linkText" onclick="ViewCounterpartyDetails(\'' + $("#txtCounterpartyName").val().trim() + '\')"> View Details</a></div>' + '  <a href=javascript:void(0)  >' + '<img src="/Content/Images/icon/delete.png" onclick="removeCounterParty(this)" title="Remove">' + '<a>' + '</li>';
                        $("#counterpartyUL").append(listr);
                    }

                    //multipleChecksDocumentID = [];
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
    $("#txtOwnerofBusinessArea").val('');
    $('input[type="radio"][name=IsGlobal][value="Yes"]').prop('checked', true);
    $("#trcp-RgBusi").hide();
    $("#txtOwnerofBusinessArea").removeClass("validelement");
    $("#txtCounterpartyName").val("");
    $('#ddlCounterpartyType').val('0');
    $("#txtAddressLine1").val("");
    $("#txtAddressLine2").val("");
    $("#txtCity").val("");
    $("#txtState").val("");
    $("#txtZip").val("");
    $('#ddlCountry').val('0');
    $("#txtContactNo").val("");
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

$('#txtSearchBox').keypress(function (e) {
    if ($('#txtSearchBox').val() != "") {
        if (e.keyCode == 13) {
            $(".ui-autocomplete").css('display', 'none');
            SearchCounterparty();
        }
    }
});

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

function getCurrencyDisplayStyle() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/settings',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
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

function BindSettings() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/userrolesetting',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        async: false,
        success: function (data) {
            if (data.length != 0) {
                SettingUserRole = data[0].UserRoleSetting;
            }
        },
        error: function (data) {
        }
    });
}
function AddRolesddl(controlname) {
    var roleoption = "";
    if (SettingUserRole == "")
        BindSettings();
    var rolestype = SettingUserRole;
    $(SettingUserRole).find('Roles').each(function () {
        var role = $(this).find('Role').text();
        if ($("#" + controlname + " option[value='[" + role + "]']").length == 0) {
            roleoption += '<option value="[' + role + ']">[' + role + ']</option>';
        }
    })
    var html = $("#" + controlname).html();
    html = roleoption + html;
    $("#" + controlname).html(html);
}

function AssignToDDlPopulate(controlname, values) {
    var multiarr = [];
    var res = values.split(";");
    var reslength = res.length;
    for (var i = 0; i < reslength; i++) {
        if (res[i].trim() != "") {
            multiarr.push(res[i].trim());
        }
    }

    if (GlobalSettingUserRole == "")
        BindGlobalSettings();
    if (GlobalSettingUserRole.trim() != "") {
        var userroleselectedresult = GlobalSettingUserRole

        var GlobelUserRoleSetting = userroleselectedresult.split(";");
        $.ajax({
            url: '/Settings/SearchUser',
            type: 'Get',
            dataType: 'json',
            data: { searchKeyword: "" },
            cache: false,
            success: function (datauserdefault) {
                defaultAssignto = [];
                var usernameandrole = null;
                for (var k = 0; k < datauserdefault.length; k++) {
                    var item = datauserdefault[k];
                    if (usernameandrole == null) {
                        usernameandrole = item.UserName;
                    }
                    else {
                        usernameandrole = usernameandrole + ";" + item.UserName;
                    }
                }
                for (var j = 0; j < GlobelUserRoleSetting.length; j++) {
                    var finalresulchecking = GlobelUserRoleSetting[j];
                    if (usernameandrole.indexOf(finalresulchecking) == -1) {
                        var finalresulcheckingtrim = finalresulchecking.replace('[', '');
                        finalresulcheckingtrim = finalresulcheckingtrim.replace(']', '');
                        for (var axh = 0; axh < datauserdefault.length; axh++) {
                            if (datauserdefault[axh].UserRoleSetting.indexOf(finalresulcheckingtrim) != -1) {
                                var usernamefetch = datauserdefault[axh].UserName;
                                if (usernamefetch.trim() != "") {
                                    if (multiarr.indexOf(usernamefetch.trim()) == -1) {
                                        multiarr.push(usernamefetch.trim());
                                        defaultAssignto.push(usernamefetch);
                                    }
                                }
                            }
                        }
                    }
                    else {
                        if (finalresulchecking != "") {
                            if (multiarr.indexOf(finalresulchecking.trim() == -1)) {
                                multiarr.push(finalresulchecking.trim());
                                defaultAssignto.push(usernamefetch);
                            }
                        }

                    }
                }
                $('#' + controlname).val(multiarr).trigger('chosen:updated');
            },
        });

        $('#' + controlname).val(multiarr).trigger('chosen:updated');
    }
    else {
        $('#' + controlname).val(multiarr).trigger('chosen:updated');
    }
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
                        article += '<input id="Pro' + item.RowKey + '" type="checkbox" name="Project" class="css1-checkbox" checked value="' + item.ProjectName + '" />';
                    } else {
                        article += '<input id="Pro' + item.RowKey + '" type="checkbox" name="Project" class="css1-checkbox" value="' + item.ProjectName + '" />';
                    }
                    article += '<label for="Pro' + item.RowKey + '" class="css1-label"><a href="javascript:ViewProject(\'' + escape(item.ProjectName) + '\')">' + item.ProjectName + '</a></label>';//ENH487 Customer inhanc

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
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
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

                        article += '<tr><td style="padding: 10px 10px 10px 25px;">';
                        if (arr.indexOf(vVarProjectName + ':' + item.TaskID) >= 0) {
                            article += '<input id="' + vVarProjectName + item.RowKey + '" type="checkbox" title="' + vVarProjectName + '" onclick="funselecttask(this);" name="ProjectTask" class="css1-checkbox" checked   value="' + vVarProjectName + ':' + item.TaskID + '" />';
                        } else {
                            article += '<input id="' + vVarProjectName + item.RowKey + '" type="checkbox" title="' + vVarProjectName + '" onclick="funselecttask(this);" name="ProjectTask" class="css1-checkbox"   value="' + vVarProjectName + ':' + item.TaskID + '" />';
                        }
                        article += '<label for="' + vVarProjectName + item.RowKey + '" class="css1-label"><a href="javascript:ViewProjectTask(\'' + escape(vVarProjectName + ':' + item.TaskID) + '\')">' + item.TaskID + ' : ' + item.TaskDescription + '</a></label>';  //ENH487 Customer inhanc
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

function AddProject() {
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
        return true;
    } else {
        //  alert('No project has been selected.');
        swal("", "No project has been selected.");
        return false;
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
        $('input:checkbox[id="' + obj.id + '"]').removeAttr('disabled');
    } else {
        $('input:checkbox[id^="' + obj.id + '"]').removeAttr('disabled');
    }
}

function SearchProjects() {

    $('#loadPro').html('<img src="../Content/Images/icon/loading.gif"> Searching...');
    var vURL = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/project?searchkeyword=' + encodeURIComponent($("#txtSearchBoxProjects").val()) + '&customquery=&sortbyfield=ProjectName&orderby=ASC';
    $.ajax({
        url: vURL,
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            $("#tblProjects").html('');
            $('#loadPro').empty();
            arr = [];
            $.each($('#Project').val().split(";"), function () {
                arr.push($.trim(this));
            });
            var datalength = data.length;
            for (var i = 0; i < datalength; i++) {
                var item = data[i];
                var article = '';
                if (i == 0) {
                    article += '<tr><th>Project Name</th></tr>';
                }
                article = '<tr><td>';
                if (arr.indexOf(item.ProjectName) >= 0) {
                    article += '<input id="Pro' + item.RowKey + '" type="checkbox" name="Project" class="css1-checkbox" checked value="' + item.ProjectName + '" />';
                } else {
                    article += '<input id="Pro' + item.RowKey + '" type="checkbox" name="Project" class="css1-checkbox" value="' + item.ProjectName + '" />';
                }

                article += '<label for="Pro' + item.RowKey + '" class="css1-label"><a href="javascript:ViewProject(\'' + escape(item.ProjectName) + '\')">' + item.ProjectName + '</a></label>';  //ENH487 Customer inhanc
                article += '<input type="text" name="ProjectManager" style="display: none;" value="' + item.ProjectManager + '" />';
                article += '</td></tr>';
                $("#tblProjects").append(article);
            }
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

function BindCounterpartyType() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterpartytypes',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            $(data).each(function (i, item) {
                //var find = " ";
                //var re = new RegExp(find, 'g');
                //var str = item.TypeName.replace(re, '');
                $("#ddlCounterpartyType").append('<option value="' + item.TypeName + '">' + item.TypeName + '</option>');
            });
        },
        error:
            function (data) {
            }
    });
}

function BindCountry() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/countrynames',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            $(data).each(function (i, item) {
                $("#ddlCountry").append('<option value="' + item + '">' + item + '</option>');
            });
        },
        error:
            function (data) {
            }
    });
}

function collectrelatedcontractrowkey(obj) {
    //var objid = obj.id.replace("Pro", "");
    //var curContracts = "";
    //if (obj != "" && obj.checked == true) {
    //    curContracts = $('#RelatedContracts').val();
    //    if (curContracts == "") {
    //        $('#RelatedContracts').val(obj.value.trim());
    //    }
    //    else {
    //        $('#RelatedContracts').val(curContracts + "; " + obj.value.trim());
    //    }
    //}
    //else if (obj != "" && obj.checked == false) {
    //    var curContractsArr = [];
    //    $($('#RelatedContracts').val().split(';')).each(function (i, item) {
    //        curContractsArr.push($.trim(item));
    //    });
    //    if (curContractsArr.length <= 0) {
    //    }
    //    else {
    //        var curContractsIndex = curContractsArr.indexOf(obj.value);
    //        if (curContractsIndex != -1)
    //            curContractsArr.splice(curContractsIndex, 1);

    //        $('#RelatedContracts').val(curContractsArr.join(";"));
    //    }
    //}
}

var counterpartyTags = [];
var arr = [];
function ContractsFunc() {
    $("#tblContracts").empty();
    $("#loadingPage").fadeIn();
    var baname = "";
    if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
        baname = localStorage.GlobalBusinessAreaLocation;
    }
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/getrelatedcontracts?stage=&searchkeyword=&customquery=&sortbyfield=ContractTitle&orderby=ASC',
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: {
            'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, BusinessAreaLocation: businessAreaPath
        },
        cache: false,
        success: function (data) {
            $("#tblContracts").empty();
            $('#loadProContracts').empty();
            $.each($('#RelatedContracts').val().split(";"), function () {
                arr.push($.trim(this));
            });
            var datalength = data.length;
            if (datalength > 0) {
                listRelatedContracts = data;
                CreateRelatedContractsList(0);
                $("#txtSearchBoxContracts").autocomplete({
                    source: counterpartyTags,
                    minLength: 1,
                    focus: function (event, ui) {
                        return false;
                    },
                    select: function (evn, uidetails) {
                        $("#txtSearchBoxContracts").val(uidetails.item.label);
                        SearchContracts();
                    }
                });

                var vCount = data.length;
                $("#tblContracts tr td").attr('style', 'vertical-align: top');
                $('#compact-paginationContracts').css('display', '');
                $('#compact-paginationContracts').pagination({
                    items: vCount,
                    itemsOnPage: 10,
                    type: 'tbody',
                    typeID: 'tblContracts',
                    row: 'tr',
                    cssStyle: 'compact-theme',
                    listname: 'RelatedContracts'
                });

                $("#loadingPage").fadeOut();
                $("#browseContracts").dialog("option", "title", "Related Contract Record(s)");
                $("#browseContracts").dialog("open");
            } else {
                $("#loadingPage").fadeOut();
                $("#browseContracts").dialog("option", "title", "Related Contract Record(s)");
                $("#browseContracts").dialog("open");
                $('#loadProContracts').empty();
                $('#loadProContracts').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>')
            }
        },
        error: function () {
            $("#loadingPage").fadeOut();
            $("#browseContracts").dialog("option", "title", "Related Contract Record(s)");
            $("#browseContracts").dialog("open");
            $('#loadProContracts').empty();
            $('#loadProContracts').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>')
        }
    });
}

function AddContract() {
    var vContracts = [];
    var vContractName = "";
    $("#RelatedContracts").val('');
    $('input:checkbox[name="RelatedContracts"]:checked').each(function () {
        vContracts.push($.trim(this.value));
        if ($("#RelatedContracts").val() == "") {
            $("#RelatedContracts").val(this.value)
        } else {
            $("#RelatedContracts").val($("#RelatedContracts").val() + ";" + this.value)
        }
    });
    //if ($("#lblselectedrelatedcontracts").text() != "") {
    //    var splitselectedrelatedcontract = [];
    //    if (typeof ($('#RelatedContracts').val()) != 'undefined' && $('#RelatedContracts').val() != null && $('#RelatedContracts').val() != '')
    //        splitselectedrelatedcontract = $('#RelatedContracts').val().trim().split("; ");

    //    $(vContracts).each(function (i, item1) {
    //        if (splitselectedrelatedcontract.indexOf($.trim(item1)) == -1) {
    //            splitselectedrelatedcontract.push($.trim(item1));
    //        }
    //    });
    //    vContractName = '';
    //    $(splitselectedrelatedcontract).each(function (ifinal, itemfinal) {
    //        vContractName += "; " + $.trim(itemfinal);
    //    });
    //} else {
    vContractName = '';
    $(vContracts).each(function (ifinal, itemfinal) {
        vContractName += "; " + $.trim(itemfinal);
    });
    //}

    vContractName = (vContractName != null && vContractName != "") ? vContractName.trim() : vContractName;
    vContractName = vContractName.charAt(0) == ";" ? vContractName.substr(1) : vContractName;
    vContractName = (vContractName.substr(vContractName.length - 1)) == ";" ? vContractName.slice(0, -1) : vContractName;
    vContractName = (vContractName != null && vContractName != "") ? vContractName.trim() : vContractName;

    if (vContractName != "") {
        //$('#RelatedContracts').val(vContractName);
        $("#lblselectedrelatedcontracts").text("");
        return true;
    } else {
        swal("", "No contract has been selected.");
        $("#RelatedContracts").val("");
        $("#popupContracts").dialog("close");
        return false;
    }
}

function ViewRelatedContracts() {
    $('#loadProContract').html('<img src="../Content/Images/icon/loading.gif"> Working on it...');
    //if ($('#tblContracts tr').length <= 0) {
    ContractsFunc();
    $("#lblselectedrelatedcontracts").text("");
    //} else {
    //    $('#loadProContract').empty();
    //    $("#browseContracts").dialog("option", "title", "Related Contract Record(s)");
    //    $("#browseContracts").dialog("open");
    //}
}

function SearchContracts() {
    $('#loadProContracts').html('<img src="../Content/Images/icon/loading.gif"> Searching...');
    var vURL = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/getrelatedcontracts?stage=&searchkeyword=' + encodeURIComponent($("#txtSearchBoxContracts").val()) + '&customquery=&sortbyfield=ContractTitle&orderby=ASC';
    $("#tblContracts").html('');
    if ($("#txtSearchBoxContracts").val() != "") {
        $("#lblselectedrelatedcontracts").text("Yes");
    } else {
        $("#lblselectedrelatedcontracts").text("");
    }
    $.ajax({
        url: vURL,
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, BusinessAreaLocation: businessAreaPath },
        cache: false,
        success: function (data) {
            $('#loadProContracts').empty();
            arr = [];
            $.each($('#RelatedContracts').val().split(";"), function () {
                arr.push($.trim(this));
            });
            var datalength = data.length;
            var article = '';
            for (var i = 0; i < datalength; i++) {
                var item = data[i];
                article += '<tr><td>';
                if (arr.indexOf(item.ContractTitle) >= 0) {
                    article += '<input id="' + item.RowKey + '" type="checkbox" name="RelatedContracts" onchange="javascript:collectrelatedcontractrowkey(this);" class="css1-checkbox" checked value="' + item.ContractTitle + '" />';
                } else {
                    article += '<input id="' + item.RowKey + '" type="checkbox" name="RelatedContracts" onchange="javascript:collectrelatedcontractrowkey(this);" class="css1-checkbox" value="' + item.ContractTitle + '" />';
                }

                article += '<label for="' + item.RowKey + '" class="css1-label PreserveSpace"><a href="/Contracts/ContractDetails?ContractID=' + item.RowKey + '" target="_blank">' + item.ContractTitle + '</a></label>';  //ENH487 Customer inhanc
                article += '</td>'
                article += '<td><label>' + item.ContractType + '</label></td>'
                article += '<td><label>'
                if (item.Counterparty != null && item.Counterparty != "") {
                    article += item.Counterparty
                } else {
                    article += "-"
                }
                article += '</label></td><td><label style="word-break: break-all;">'
                if (item.ContractNumber != null && item.ContractNumber != "") {
                    article += item.ContractNumber
                } else {
                    article += "-"
                }
                article += '</label></td><td><label>' + item.Status + '</label></td>'
                article += '</tr>';
            }
            $("#tblContracts").html(article);
            article = '';
            var vCount = $("#tblContracts tr").length;
            if (vCount != 0) {
                $('#loadProContracts').html('');
                $("#tblContracts tr td").attr('style', 'vertical-align: top');
                $('#compact-paginationContracts').css('display', '');
                $('#compact-paginationContracts').pagination({
                    items: vCount,
                    itemsOnPage: 10,
                    type: 'tbody',
                    typeID: 'tblContracts',
                    row: 'tr',
                    cssStyle: 'compact-theme'
                });
            } else {
                $('#loadProContracts').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>')
                $('#compact-paginationContracts').css('display', 'none');
            }
        },
        error: function () {
            $('#compact-paginationContracts').css('display', 'none');
            $('#loadProContracts').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>')
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
        $('#liSelectedTaxonomy').empty();
    }
    if ($('#tbodyTaxonomy12 tr').length == 0) {

        BindTaxonomy(obj)
    } else {
        $("#browseTaxonomy").dialog("option", "title", "Taxonomy Picker");
        $("#browseTaxonomy").dialog("open");
        $("#browseTaxonomy").height("auto");
    }
}

var articleTaxonomy1 = "";
function BindTaxonomy(obj) {
    $("#loadingPage").fadeIn();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/termsets?groupname=' + obj.title,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
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
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
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
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
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
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
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

    if (chkspan == "") {

        chkspan = obj.textContent;
        $('#liSelectedTaxonomy').html('<span style="font-size:13px;">' + obj.textContent + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveSelected(this);" style="float:right" /></span>');
    }
    else {

        if (chkspan.indexOf(obj.textContent) < 0) {
            $("#liSelectedTaxonomy").append('<span style="font-size:13px;">' + obj.textContent + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveSelected(this);" style="float:right" /></span>');
            chkspan += ";" + obj.textContent;
        }

    }

}
var selecteditems14 = [];
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

function createingdivbyme(item, vControlsGroup, idelvalue, idelcheck) {
    var vControls = "";
    var vDate = "";
    var vUser = "";
    var vNumber = "";
    var vPhoneNumber = "";
    var PhoneID = "";
    var PhoneCountry = "";
    var vEmail = "";
    var vCurrency = "";
    var vMultiDDL = "";
    var vProject = false;
    var vContractValue = false;
    var vUserList = '';
    var vNumberD = "";
    var vNumberP = "";
    var vNumberPD = "";
    var vMarginTop = "margin-top-8";
    if (item.FieldType == "Yes/No")
        vMarginTop = "";
    if (item.Required == "true") {
        vControls += '<div class="form-input-group"><div class="row-group"><label class="col3 m12 ' + vMarginTop + '">' + item.FieldDisplayName + '<span class="text-red">*</span></label>';
    } else {
        vControls += '<div class="form-input-group"><div class="row-group"><label class="col3 m12 ' + vMarginTop + '">' + item.FieldDisplayName + '<span class="text-red">&nbsp;</span></label>';
    }

    vControls += '';
    if (item.FieldType == "Single Line Text") {
        if (item.Required == "true") {
            vControls += "<div class='col6 m12'><input type='text' id=" + item.FieldName + " maxlength='100' name=" + item.FieldName + " class='form-contro validelement'>";

        } else {
            vControls += "<div class='col6 m12'><input type='text' id=" + item.FieldName + " maxlength='100' name=" + item.FieldName + " class='form-contro '>";
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
    else if (item.FieldType == "Multi Line Text") {
        if (item.Required == "true") {
            vControls += "<div class='col6 m12'><textarea name=" + item.FieldName + " id=" + item.FieldName + " title='" + item.FieldDisplayName + "' maxlength='500' cols='40' rows='5' class='form-contro validelement'></textarea><label class='col12 p-text text-left'></label>";
        } else {
            vControls += "<div class='col6 m12'><textarea name=" + item.FieldName + " id=" + item.FieldName + " title='" + item.FieldDisplayName + "' maxlength='500' cols='40' rows='5' class='form-contro'></textarea><label class='col12 p-text text-left'></label>";
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
    else if (item.FieldType == "Hyperlink") {
        //manoj
        //for Hyperlink
        var hyperlinkURL = item.DefaultURL;
        if (item.Required == "true") {
            vControls += "<div class='col6 m12'><input type='text' id=" + item.FieldName + " maxlength='2083' placeholder='http://www.' name=" + item.FieldName + " value = '" + hyperlinkURL + "' class='form-contro validelement validwebsite'>";

        } else {
            vControls += "<div class='col6 m12'><input type='text' id=" + item.FieldName + " maxlength='2083' placeholder='http://www.' name=" + item.FieldName + " value = '" + hyperlinkURL + "' class='form-contro validwebsite'>";
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
        //for Hyperlink
        //manoj
    }
    else if (item.FieldType == "Phone Number") {
        //Vinod

        vControls += '<div class="wid col6 m12">';
        if (item.Required == "true") {
            vControls += "<input type='text' id=" + item.FieldName + " title='" + item.FieldDisplayName + "'  class='form-contro validelement validPhone fieldphonecontrol' />";
        } else {
            vControls += "<input type='text' id=" + item.FieldName + " title='" + item.FieldDisplayName + "'  class='form-contro validPhone fieldphonecontrol' />";
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
        PhoneCountry = item.Country;
    }
    else if (item.FieldType == "Date") {
        vControls += '<div class="col6 m12">';

        if (item.Required == "true") {
            vControls += "<input type='text' id=" + item.FieldName + " title='" + item.FieldDisplayName + "'  class='form-contro form-contro-Date validelement validdate form_input fielddatecontrol " + item.FieldName + "'/>";
        } else {
            vControls += "<input type='text' id=" + item.FieldName + "  title='" + item.FieldDisplayName + "' class='form-contro form-contro-Date validdate form_input fielddatecontrol " + item.FieldName + "'/>";
        }
        if (item.FieldHelp == "true") {
            vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
        }
        vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
        vControls += '</div>';

        vDate = item.FieldName;
    }
    else if (item.FieldType == "Choice") {
        vControls += '<div class="col6 m12">';
        if (item.FieldName == "ContractTermType") {
            if (item.Required == "true") {
                vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' onchange='changecontracttermtype(this)'  class='form-contro validelement'>";

            } else {
                vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' onchange='changecontracttermtype(this)' class='form-contro'>";
            }
        }
        else {
            if (item.Required == "true") {
                vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "'  class='form-contro validelement'>";

            } else {
                vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro'>";
            }
        }

        vControls += "<option value='0'>--Select--</option>";

        if (item.FieldName == "ContractTermType") {
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contracttermtypesenabled',
                type: 'GET',
                dataType: 'json',
                "Content-Type": "application/json",
                headers: { 'eContracts-ApiKey': localStorage.APIKey },
                cache: false,
                success: function (data) {
                    var datalength = data.length;
                    for (var i = 0; i < datalength; i++) {
                        var itemname = data[i];
                        TermTypeHelpText[data[i].ContractTermName] = data[i].HelpText;
                        $("#" + item.FieldName).append("<option value='" + itemname.ContractTermName + "'>" + itemname.ContractTermDisplayName + "</option>");
                    }
                }
            });
        }
        else {
            var myArray = [];
            myArray = item.ChoiceValues.split("\n")
            var myArraylength = myArray.length;
            for (var i = 0; i < myArraylength; i = i + 1) {
                do {
                    myArray[i] = myArray[i].replace("&amp;", "&");
                } while (myArray[i].indexOf("&amp;") > -1)
                vControls += "<option value='" + myArray[i] + "'>" + myArray[i] + "</option>";
            }
        }

        vControls += '</select>';
        if (item.FieldName == "ContractTermType") {
            vControls += '<label class="col12 p-text text-left help" id="termtypeHelpText">' + item.Description + '</label>';
        }
        else {
            vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
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
    else if (item.FieldType == "User") {
        if (item.Required == "true") {
            vControls += "<div class='col6 m12'><select id=" + item.FieldName + " multiple='multiple' class='form-contro f_inpt width90 chosenmulti validselect' name=" + item.FieldName + " title='" + item.FieldDisplayName + "' data-placeholder='--Select--'>"
        } else {
            vControls += "<div class='col6 m12'><select id=" + item.FieldName + " multiple='multiple' class='form-contro f_inpt width90 chosenmulti' name=" + item.FieldName + " title='" + item.FieldDisplayName + "' data-placeholder='--Select--'>"
        }

        if (vUserList == '')
        { vUserList = GetUserList(); }
        vControls += vUserList;

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

        vUser = item.FieldName;
    } else if (item.FieldType == "Taxonomy") {
        if (item.Required == "true") {
            vControls += "<div class='col6 m12'><input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro validelement' readonly='readonly' type='text' />";
        } else {
            vControls += "<div class='col6 m12'><input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro' readonly='readonly' type='text' />";
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
    } else if (item.FieldType == "Lookup") {
        if (item.FieldName == "Counterparty") {
            var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
            var vAccFeat = $.grep(veContractFeatures, function (n, i) {
                return (n.RowKey == "6" && n.Status == "ON");
            });
            var vreadonly = "";
            var vbrowse = "";
            if (vAccFeat.length > 0) {
                vreadonly = "readonly='readonly'";
                vbrowse = "<a title='Browse and select one or more Counterparty from the list to link with this Contract.' href='javascript:void(0)' class='linkText' onclick='ViewCounterparty(\"" + item.FieldName + "\")'> Browse</a>";
            }


            vControls += '<div class="col6 m11">';
            if (item.Required == "true") {
                vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro validelement' " + vreadonly + " type='text'style='display:none' />";
                vControls += "<ul id='counterpartyUL'></ul>";
            } else {
                vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro' " + vreadonly + " type='text' style='display:none' />";
                vControls += "<ul id='counterpartyUL'></ul>";
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
            //else if (item.FieldName == "CompanyProfile") {
            //    vControls += '<div class="col6 m12">';
            //    if (item.Required == "true") {
            //        vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' onchange='javascript:Removetextvalues()' class='form-contro validelement'>";
            //    } else {
            //        vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' onchange='javascript:Removetextvalues()' class='form-contro'>";
            //    }
            //    vControls += "<option value='0'>--Select--</option>";
            //    vControls += getcompanyprofile() + "</select>";
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

        else if (item.FieldName == "CompanyProfile") {

            vreadonly = "readonly='readonly'";
            vbrowse = "<a href='javascript:void(0)' class='linkText' onclick='ViewLegalEntity()'> Browse</a>";

            vControls += '<div class="col6 m11">';
            var recounterparty = new RegExp("'", 'g');
            var counterparty = thisLegalEntity.replace(recounterparty, "&#39");
            if (counterparty != "undefined" && counterparty != "" && counterparty != null) {
                var AryCounterparty = counterparty.split(';');
                var finalCP = '';
                for (var j = 0; j < AryCounterparty.length; j++) {
                    if (finalCP == "")
                        finalCP = AryCounterparty[j].trim().replace(recounterparty, "&#39");
                    else
                        finalCP += "; " + AryCounterparty[j].trim().replace(recounterparty, "&#39");
                }

            }
            if (finalCP == undefined) {
                finalCP = "";
            }
            if (item.Required == "true") {
                vControls += "<input id=" + item.FieldName + " value='" + finalCP + "' name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro validelement' " + vreadonly + " type='text' />";
            } else {
                vControls += "<input id=" + item.FieldName + " value='" + finalCP + "' name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro' " + vreadonly + " type='text' />";
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

        else if (item.FieldName == "Status") {
            vControls += '<div class="col6 m12">';
            if (item.Required == "true") {
                vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro validelement'>";
            } else {
                vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro'>";
            }
            //vControls += "<option value='0'>--Select--</option>";
            vControls += getStatus() + "</select>";
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
        else if (item.FieldName == "ContractCurrency") {
        } else if (item.FieldName == "Project") {
            vProject = true;
            vControls += '<div class="col6 m11">';
            if (item.Required == "true") {
                vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro validelement' readonly='readonly' type='text' />";
            } else {
                vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro' readonly='readonly' type='text' />";
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
        } else if (item.FieldName == "RelatedContracts") {
            vControls += '<div class="col6 m11">';
            if (item.Required == "true") {
                vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro validelement' readonly='readonly' type='text' />";
            } else {
                vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro' readonly='readonly' type='text' />";
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
        else if (item.FieldName == "OriginatingParty") {
            vControls += '<div class="col6 m11">';
            if (item.Required == "true") {
                vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro validelement' readonly='readonly' type='text' />";
            } else {
                vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro' readonly='readonly' type='text' />";
            }
            vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
            vControls += '</div>';
            vControls += '<div class="col3 m1">';
            vControls += '<div class="success-input-msg margin-top-8">';
            if (item.FieldHelp == "true") {
                vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
            }
            vControls += "<a href='javascript:void(0)' class='linkText' onclick='ViewOriginatingParty()'> Browse</a>";
            vControls += '</div>';
            vControls += '</div>';
        } else if (item.FieldName == "ContractType") {
            vControls += '<div class="col6 m12">';
            if (item.Required == "true") {
                vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro validelement'>";
            } else {
                vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro'>";
            }
            vControls += "<option value='0'>--Select--</option>";
            vControls += getContractType() + "</select>";
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
        else {

            vControls += '<div class="col6 m12">';
            if (item.Required == "true") {
                vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro validelement'>";
            } else {
                vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro'>";
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
                headers: { 'eContracts-ApiKey': localStorage.APIKey },
                cache: false,
                success: function (data) {
                    var datalength1 = data.LookupFields.split(';');
                    datalength1 = datalength1.sort();
                    datalength1 = sortArrOfObjectsByParam(datalength1);
                    var datalength = datalength1.length;
                    for (var i = 0; i < datalength; i++) {
                        var itemname = datalength1[i];
                        $("#" + item.FieldName).append("<option value='" + itemname + "'>" + itemname + "</option>")
                    }
                }
            });
        }
    }
    else if (item.FieldType.indexOf("Dropdown") > -1 || item.FieldType.indexOf("Multi Select") > -1) {
        if (item.FieldType.indexOf("Dropdown") > -1) {
            vControls += '<div class="col6 m12">';
            if (item.Required == "true") {
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
                var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
                var vAccFeat = $.grep(veContractFeatures, function (n, i) {
                    return (n.RowKey == "6" && n.Status == "ON");
                });
                var vreadonly = "";
                var vbrowse = "";
                if (vAccFeat.length > 0) {
                    vreadonly = "readonly='readonly'";
                    vbrowse = "<a title='Browse and select one or more Counterparty from the list to link with this Contract.' href='javascript:void(0)' class='linkText' onclick='ViewCounterparty(\"" + item.FieldName + "\")'> Browse</a>";
                }
                vControls += '<div class="col6 m11">';
                if (item.Required == "true") {
                    vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro validelement' " + vreadonly + " type='text' />";
                } else {
                    vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro' " + vreadonly + " type='text' />";
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
                if (item.Required == "true") {
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
                        headers: { 'eContracts-ApiKey': localStorage.APIKey },
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
        }

        vControls += '<div class="col6 m12">';
        if (item.Required == "true") {
            vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro validelement width40 form_input validcontractvalue' />";
        } else {
            vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro width40 form_input validcontractvalue' />";
        }

        if (item.FieldHelp == "true") {
            vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
        }
        vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
        vControls += '</div>';
        vCurrency = item.FieldName;
    }
    else if (item.FieldType == "Number") {
        vControls += '<div class="col6 m12">';
        if (item.Required == "true") {
            vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro validelement width40 form_input' />";
        } else {
            vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro width40 form_input' />";
        }

        if (item.FieldHelp == "true") {
            vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
        }
        vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
        vControls += '</div>';
        vNumber = item.FieldName;
    }
    else if (item.FieldType == "Number-D") {
        vControls += '<div class="col6 m12">';
        if (item.Required == "true") {
            vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro validelement width40 form_input' />";
        } else {
            vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro width40 form_input' />";
        }

        if (item.FieldHelp == "true") {
            vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
        }
        vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
        vControls += '</div>';
        vNumberD = item.FieldName;
    }
        //Percent
    else if (item.FieldType == "Number-P") {
        vControls += '<div class="col6 m12">';
        if (item.Required == "true") {
            vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro validelement width40 form_input' />";
        } else {
            vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro width40 form_input' />";
        }
        vControls += '<label class="margin-top-8">' + '%' + '</label>';
        if (item.FieldHelp == "true") {
            vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
        }
        vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
        vControls += '</div>';
        vNumberP = item.FieldName;
    }
        //Percent Decimal
    else if (item.FieldType == "Number-PD") {
        vControls += '<div class="col6 m12">';
        if (item.Required == "true") {
            vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro validelement width40 form_input' />";
        } else {
            vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro width40 form_input' />";
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
        vControls += '<div class="col2 m12" style="width:50% !important">';
        vControls += "	<input type='radio' name=" + item.FieldName + " id='Yes" + item.FieldName + "' value='Yes' onchange='changeYesNoField(this);'>Yes ";
        vControls += "	<input type='radio' name=" + item.FieldName + " id='No" + item.FieldName + "' checked value='No' onchange='changeYesNoField(this);'>No";
        vControls += "	<input type='hidden' id='hdnYes" + item.FieldName + "' value=" + item.CommentYes + " />";
        vControls += "	<input type='hidden' id='hdnNo" + item.FieldName + "' value=" + item.CommentNo + " />";
        vControls += "	<input type='hidden' id='hdnRequired" + item.FieldName + "' value=" + item.CommentRequired + " />";
        vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
        vControls += '</div>';
        if (item.FieldHelp == "true") {
            vControls += '<div class="col3 m12">';
            vControls += '<div class="success-input-msg margin-top-7" style="display: inline-block;float: left;">';
            vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
            vControls += '</div>'
            vControls += '</div>'
        }
        if (item.CommentNo == "true") {
            if (item.CommentRequired == "true") {
                vControls += ' <div class="form-input-group ' + item.FieldName + '"><div class="row-group"><label class="col3 m12">Add a Comment<span class="text-red">*</span></label> ';
            } else {
                vControls += '<div class="form-input-group ' + item.FieldName + '"><div class="row-group"><label class="col3 m12">Add a Comment</label> ';
            }
            vControls += '<div class="col6 m12">';
            if (item.CommentRequired == "true") {
                vControls += "<textarea id='CustomCMD" + item.FieldName + "' name='CustomCMD" + item.FieldName + "' maxlength='500' title='" + item.FieldDisplayName + "' cols='40' rows='5' class='form-contro validelement'></textarea>";
            } else {
                vControls += "<textarea id='CustomCMD" + item.FieldName + "' name='CustomCMD" + item.FieldName + "' maxlength='500' title='" + item.FieldDisplayName + "' cols='40' rows='5' class='form-contro'></textarea>";
            }
            vControls += '</div>';
            vControls += '</div></div>';
            //$("#" + id.id).parent().after(vControls);
        }
    } else if (item.FieldType == "Email") {
        vControls += '<div class="col6 m12">';
        if (item.Required == "true") {
            vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro validemail validelement' />";
        } else {
            vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro validemail' />";
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
        if (item.Required == "true") {
            vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro validelement' readonly='readonly' type='text' />";
        } else {
            vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro' readonly='readonly' type='text' />";
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
    else if (item.FieldType == "File Upload") {
        vControls += '<div class="col2 m12" style="width: 50% !important">';
        if (item.Required == "true") {
            vControls += "<input type='file' id=" + item.FieldName + " name='docAttachment' class='validelement browse-file-doc' onchange='javascript:changeinuploadChecking(this);' style='cursor:pointer;' />";
        } else {
            vControls += "<input type='file' id=" + item.FieldName + " name='docAttachment' class='browse-file-doc' onchange='javascript:changeinuploadChecking(this);' style='cursor:pointer;' />";
        }
        vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
        vControls += '</div>';
        if (item.FieldHelp == "true") {
            vControls += '<div class="col3 m12">';
            vControls += '<div class="success-input-msg margin-top-7">';
            vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
            vControls += '</div>'
            vControls += '</div>'
        }
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
            bindPhoneNumber(PhoneID, PhoneCountry);
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

            if (vUser == "Requestor") {
                if (localStorage.UserName != "") {
                    GetValuesAndAutoPopulate("Requestor", localStorage.UserName);
                }
            }
            if (vUser == "AssignedTo") {
                //AddRolesddl("AssignedTo");
                if (treeBusinessAreaOwner != "") {
                    AssignToDDlPopulate("AssignedTo", treeBusinessAreaOwner);
                }
            }

            vUser = "";
        }
        if (vMultiDDL != "") {
            $("#" + vMultiDDL + "").chosen().trigger("chosen:updated");
            $('.chosenmulti').on('chosen:showing_dropdown', function (evt, params) {
                $('.result-selected').css('display', 'none');
            });
            vMultiDDL = "";
        }

        //If project is added, add project task to create form
        if (vProject) {
            var vControls = '<div class="form-input-group"><div class="row-group">';
            //vControls += '<label class="col3 m12 margin-top-8">Project Tasks<span class="text-red margin-top-8">*</span></label> ';
            //vControls += '<div class="col6 m11 margin-top-8">';
            //vControls += "<input id='ProjectTask' name='ProjectTask' title='Project Task' class='form-contro validelement' readonly='readonly' type='text' />";
            if (item.Required == "true") {
                vControls += '<label id="lblProjectTask" class="col3 m12 margin-top-8">Project Tasks<span class="text-red margin-top-8">*</span></label> ';
                vControls += '<div class="col6 m11 margin-top-8">';
                vControls += "<input id='ProjectTask' name='ProjectTask' title='Project Task' class='form-contro validelement' readonly='readonly' type='text' />";
            } else {
                vControls += '<label id="lblProjectTask" class="col3 m12 margin-top-8">Project Tasks</label> ';
                vControls += '<div class="col6 m11 margin-top-8">';
                vControls += "<input id='ProjectTask' name='ProjectTask' title='Project Task' class='form-contro' readonly='readonly' type='text' />";
            }

            vControls += '</div>';
            vControls += '<div class="col3 m1">';
            vControls += '<div class="success-input-msg margin-top-8">';
            vControls += "<a href='javascript:void(0)' class='linkText' onclick='ViewProjectTasks()'> Browse</a>";
            vControls += '</div>';
            vControls += '</div>';
            vControls += '</div></div><div>';
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
            vControls += "<select id='ContractCurrency' name='ContractCurrency' title='Contract Currency' class='form-contro'>";
            vControls += "<option value='0'>--Select--</option>";
            vControls += getContractCurrency() + "</select>";
            vControls += '</div>';
            vControls += '</div></div><div>';
            if (item.FieldGroup == "Primary Fields") {
                $("#newdivforcheck").append(vControls);
            }
            else {
                $("#" + idelvalue + "").append(vControls);
            }
        }
    }
    else {
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
        //Added by Jay
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
        //end here

        if (vPhoneNumber != "") {
            bindPhoneNumber(PhoneID, PhoneCountry);
            vPhoneNumber = "";
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

            if (vUser == "Requestor") {
                if (localStorage.UserName != "") {
                    GetValuesAndAutoPopulate("Requestor", localStorage.UserName);
                }
            }

            if (vUser == "AssignedTo") {
                //AddRolesddl("AssignedTo");
                if (treeBusinessAreaOwner != "") {
                    AssignToDDlPopulate("AssignedTo", treeBusinessAreaOwner);
                }
            }

            vUser = "";
        }
        if (vMultiDDL != "") {
            $("#" + vMultiDDL + "").chosen().trigger("chosen:updated");
            $('.chosenmulti').on('chosen:showing_dropdown', function (evt, params) {
                $('.result-selected').css('display', 'none');
            });
            vMultiDDL = "";
        }

        //If project is added, add project task to create form
        if (vProject) {
            var vControls = '<div class="form-input-group"><div class="row-group">';
            if (item.Required == "true") {
                vControls += '<label class="col3 m12 margin-top-8">Project Tasks<span class="text-red margin-top-8">*</span></label> ';
                vControls += '<div class="col6 m11 margin-top-8">';
                vControls += "<input id='ProjectTask' name='ProjectTask' title='Project Task' class='form-contro validelement' readonly='readonly' type='text' />";
            } else {
                vControls += '<label class="col3 m12 margin-top-8">Project Tasks</label> ';
                vControls += '<div class="col6 m11 margin-top-8">';
                vControls += "<input id='ProjectTask' name='ProjectTask' title='Project Task' class='form-contro' readonly='readonly' type='text' />";
            }
            vControls += '</div>';
            vControls += '<div class="col3 m1">';
            vControls += '<div class="success-input-msg margin-top-8">';
            vControls += "<a href='javascript:void(0)' class='linkText' onclick='ViewProjectTasks()'> Browse</a>";
            vControls += '</div>';
            vControls += '</div>';
            vControls += '</div></div><div>';
            if (item.FieldGroup == "Primary Fields") {
                $("#newdivforcheck").append(vControls);
            }
            else {
                if (idelcheck != null && idelcheck != "") {
                    $("#" + idelcheck + "").append(vControls);
                }
            }
        }

        //If contract value is added, add contract currecncy to create form
        if (vContractValue) {
            var vControls = '<div class="form-input-group"><div class="row-group">';
            vControls += '<label class="col3 m12 margin-top-8">Contract Currency<span class="text-red"></span></label> ';
            vControls += '<div class="col6 m12">';
            vControls += "<select id='ContractCurrency' name='ContractCurrency' title='Contract Currency' class='form-contro'>";
            vControls += "<option value='0'>--Select--</option>";
            vControls += getContractCurrency() + "</select>";
            vControls += '</div>';
            vControls += '</div></div><div>';
            if (item.FieldGroup == "Primary Fields") {
                $("#newdivforcheck").append(vControls);
            }
            else {
                if (idelcheck != null && idelcheck != "") {
                    $("#" + idelcheck + "").append(vControls);
                }
            }
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

function ViewOriginatingParty() {
    ViewOPCounterparty();
    //getcompanyprofileforlegalentity();
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

function AddOriginatingParty() {
    if ($('input:radio[name=OriginatingParty]:checked').val() != null) {
        $('#OriginatingParty').val($('input:radio[name=OriginatingParty]:checked').val());
        return true;
    } else {
        swal("", "No Originating Party has been selected.");
        return false;
    }
}

function getContractType() {
    var control = "";
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contracttypes',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        async: false,
        success: function (contracttypes) {
            $(contracttypes).each(function (i, item) {
                if (thisContractAreaSettings.ContractType.split(';').indexOf(item.ContractType) > -1)
                    control += "<option value='" + item.ContractType + "'>" + item.ContractType + "</option>";
            });
        }
    });
    return control;
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
                if (arrprevRU.indexOf(myArrayRU[i]) >= 0 && multipleChecksDocumentID.indexOf(myArrayRU[i].trim()) > -1) {
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
        var art = "No items found.";
        $("#tblGeneric").append(art);
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
                if (arrprevRU.indexOf(myArrayRU[i].trim()) >= 0 && multipleChecksDocumentID.indexOf(myArrayRU[i].trim()) > -1) {
                    article += '<input id="' + myArray[i].trim() + '" type="checkbox" name="Generic"  onclick="checkMultipleDocuments(this);" checked class="css1-checkbox" value="' + myArray[i].trim() + '" />';
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
        //            CounterPartyArrayprev.push(spltarrprevRU[arrli]);
        //        }
        //    }
        //}
        for (var i = startIndex; i < endIndex; i++) {
            var article = "";
            if (i == startIndex) {
                article += '<tr><th style="width:35%;"><input id="selectallCounterParty" onclick="funselectallCounterParty(this);" type="checkbox"/> Select/Deselect All</th><th style="width:20%;">Counterparty Type</th><th>Global or Regional</th></tr>';
            }

            article += '<tr><td>';
            //     if (CounterPartyArrayprev != null && multipleChecksDocumentID.length > 0) {
            //     if (CounterPartyArrayprev.indexOf(myCounterPartyArray[i].CounterpartyName.trim()) >= 0 && multipleChecksDocumentID.indexOf(myCounterPartyArray[i].CounterpartyName.trim()) > -1) {
            //         article += '<input id="CP' + myCounterPartyArray[i].RowKey + '" type="checkbox" name="Counterparty" onclick="checkMultipleDocumentsCounterParty(this);" checked class="css1-checkbox" value="' + myCounterPartyArray[i].CounterpartyName.trim() + '" />';
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
                //    article += '<input id="' + myCounterPartyArray[i].RowKey + '" type="checkbox" name="Counterparty" onclick="checkMultipleDocumentsCounterParty(this);" checked class="css1-checkbox" value="' + myCounterPartyArray[i].CounterpartyName.trim() + '" />';
                //}
                //else if (multipleChecksDocumentID.indexOf(myCounterPartyArray[i].CounterpartyName.trim()) > -1) {
                //    article += '<input id="' + myCounterPartyArray[i].RowKey + '" type="checkbox" name="Counterparty" onclick="checkMultipleDocumentsCounterParty(this);" checked class="css1-checkbox" value="' + myCounterPartyArray[i].CounterpartyName.trim() + '" />';
                //}
            else {
                article += '<input id="' + myCounterPartyArray[i].RowKey + '" type="checkbox" name="Counterparty" onclick="checkMultipleDocumentsCounterParty(this);"  class="css1-checkbox" value="' + escape(myCounterPartyArray[i].CounterpartyName.trim()) + '" />';
                checkboxchecking = false;
            }
            article += '<label for="CP' + myCounterPartyArray[i].RowKey + '" class="css1-label"><a href="/Counterparty/CounterpartyDetail?CounterpartyID=' + myCounterPartyArray[i].RowKey + '" target="_blank">' + myCounterPartyArray[i].CounterpartyName.trim() + '</a></label></td>';  //ENH487 Customer inhanc
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
            //            $('#liSelectedCounterParty').append('<span style="font-size:13px;">' + splitmulicheckforbind[spl] + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveSelectedCouterParty(this);" style="float:right" /></span>');
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

function checkMultipleDocumentsCounterParty(object) {
    //manoj
    var arrselectedcunterparty = [];
    currSelected = true;
    $.each($('#liSelectedCounterParty').children(), function () {
        if (arrselectedcunterparty.indexOf($.trim(this.textContent)) == -1)
            arrselectedcunterparty.push($.trim(this.textContent));
    });
    $('#liSelectedCounterParty').empty();

    //var tablebind = $('#tblCounterparties').DataTable();
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
    arrselectedcunterparty = [];

    if ($('input:checkbox[name="Counterparty"]:checked').length == $('input:checkbox[name="Counterparty"]').length && $('input:checkbox[name="Counterparty"]:checked').length != 0) {
        $("#selectallCounterParty").prop('checked', true);
    } else {
        $("#selectallCounterParty").prop('checked', false);
    }
    //manoj
    if ($(object).prop('checked') == false && strSelCounterPartyField == "Counterparty") {
        $("#counterpartyUL li div").filter(':contains(' + $(object).val() + ')').parent().remove();
    }
    try {
        //hideAllMenuAndStopPro(event);
    }
    catch (ex) {

    }
}

function funselectallLE(obj) {
    if (obj.checked) { // check select status  
        $('input:checkbox[name=CompanyProfile]').prop('checked', true);
    } else {
        $('input:checkbox[name=CompanyProfile]').prop('checked', false);
    }
    checkMultipleDocumentsLE("");
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
    //  $("#counterpartyUL li div").filter(':contains(' + $(child).text() + ')').parent().remove();
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
            headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, BusinessAreaLocation: strBusinessAreaOwnerof },
            cache: false,
            success: function (data) {
                $('#loadCounterparties').empty();
                $("#hdnRelatedCounterparties").append(getParameterByName("ContractID"))
                arr = [];
                counterpartyTags = [];
                //manoj
                curRelatedCounterparities = PrvRelatedCounterparities.slice();
                //manoj
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
                                    //$("#ddlRelationshipTypeCounterparties").val(arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RootRelationshipType);
                                    //manoj
                                    $("#ddlRelationshipTypeCounterparties option:selected").text(arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RootRelationshipType);
                                    //manoj
                                }
                                if (arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RelationshipType != "") {
                                    $("#ddlRelationshipTypeParentcounterparties").val(arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RelationshipType);
                                }
                            }
                        }

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
                            //$("#tblPopupCounterparties").append(article);
                            vCounterpartyList += article;
                            relatedCounterpartiesTag.push(item.CounterpartyName);
                        } else {
                            var article = '<tr><td>';
                            article += '<input id="rel' + item.RowKey + '" type="checkbox" name="RelatedCounterparty" class="css1-checkbox" value="' + escape(item.CounterpartyName) + '" onchange="javascript:currentrelatedcounterparty(this);" />';
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
                        //        var vOptions = "<select class='f_inpt width90'>";
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

                        //});
                    }
                });

                $("#tblPopupCounterparties").append(vCounterpartyList);
                $("input[id^='rel'][name='RelatedCounterparty']:checkbox").click(function () {
                    if (this.checked) {
                        var vOptions = "<select class='f_inpt width90'>";
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
                addselectedcounterparties();
                $('#loadMA').empty();
                $('#loadMA').html('<p style="margin-left: 20px;">No items found.</p>');
                $("#loadingPage").fadeOut();
            }
        });
    } else {
        addselectedcounterparties();
        $('#loadMA').empty();
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
                RootRelationshipType: $("#ddlRelationshipTypeCounterparties").find('option:selected').text(),
                RelatedRelationshipType: vChildRelation,
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
            swal("", "No Counterparty has been selected.");
            $('#RelatedCounterparties').val("");
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
        $('#loadCounterparties').html('<img src="../Content/Images/icon/loading.gif"> ');
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
        headers: { 'eContracts-ApiKey': localStorage.APIKey, BusinessAreaLocation: strBusinessAreaOwnerof },
        cache: false,
        success: function (data) {
            $("#tblPopupCounterparties").html('');
            var datalenght = data.length;
            //arr =[];
            counterpartyTags = [];
            //manoj
            var prevSelected = [];
            $.each(curRelatedCounterparities, function (ipvr, itempvr) {
                prevSelected.push($.trim(itempvr.CounterpartyName));
            });
            arr = prevSelected;
            //manoj
            //var prevSelected = $("#RelatedCounterparties").val();
            //$.each(prevSelected.split(";"), function () {
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
                        article += '<input id="rel' + item.RowKey + '" type="checkbox" name="RelatedCounterparty" class="css1-checkbox" value="' + escape(item.CounterpartyName) + '" onchange="javascript:currentrelatedcounterparty(this);" />';
                        article += '<label for="' + item.RowKey + '" class="css1-label">' + item.CounterpartyName + '</label>';
                        article += '</td>';
                        article += '<td class="ddl"><td></tr>'
                        $("#tblPopupCounterparties").append(article);
                    }


                    //$("#rel" + item.RowKey).click(function () {
                    $("input[id='rel" + item.RowKey + "'][name='RelatedCounterparty']:checkbox").click(function () {
                        if (this.checked) {
                            var vOptions = "<select class='f_inpt width90'>";
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

function ViewLegalEntity() {
    LegalEntityFunc();
    $('#loadCP').html('<img src="../Content/Images/icon/loading.gif"> Working on it...');
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
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
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
        var vOptions = "<select class='f_inpt width90'>";
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
        var vOptions = "<select class='f_inpt width90'>";
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
                headers: { 'eContracts-ApiKey': localStorage.APIKey },
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
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            cache: false,
            async: false,
            success: function (data) {
                $(data).each(function (i, item) {
                    if (thisLegalEntity == item.LegalEntityName) {
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
                $("#tblOPCounterparties").append('<li style="font-size:13px;">No Counterparty is available for this contract.</li>');
            }
        });
    }
}

function comparedateswithGTtoday(secondDateControlID) {
    var isvalid = true;

    if ($("#" + secondDateControlID).val() != null && $("#" + secondDateControlID).val() != '') {



        var dt1 = new Date();
        var dt2 = new Date($.datepicker.formatDate('mm/dd/yy', $("#" + secondDateControlID).datepicker('getDate')));


        //var dt1 = new Date($("#" + firstDateControlID).val());
        //var dt2 = new Date($("#" + secondDateControlID).val());


        var dateOne = new Date(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()); //Year, Month, Date
        var dateTwo = new Date(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()); //Year, Month, Date

        if (dateTwo >= dateOne) {
            isvalid = true;
        } else {
            isvalid = false;
        }
    }
    return isvalid;
}

//CounterParty Businessarea


var BAOwnersselecteditems = [];
function ViewOwnerofBusinessArea() {

    $('#txtBAOwnerofPath').val("");
    $('#txtBAOwnerof').val("");


    if ($("#txtOwnerofBusinessArea").val() != "") {
        BAOwnersselecteditems = $("#txtOwnerofBusinessArea").val().split(';');
        var selecteditemslength = BAOwnersselecteditems.length;
        selectedBusinessAreaID11Temp = [];
        $(selectedBusinessAreaID11).each(function (i, item) {
            selectedBusinessAreaID11Temp.push(item);
        })


        $('#liSelectedBAOwners').html("");
        for (var i = 0; i < selecteditemslength; i++) {
            var re = new RegExp(" ", 'g');
            var str = BAOwnersselecteditems[i].trim().replace(re, '');
            if (selectedBusinessAreaID11.length >= i + 1) {
                if (thisBusinessAreaNameRowKey == selectedBusinessAreaID11[i][1])
                    $('#liSelectedBAOwners').append('<span id="BAF_' + str + '" style="font-size:11px;">' + BAOwnersselecteditems[i].trim() + '</span>');
                else
                    $('#liSelectedBAOwners').append('<span id="BAF_' + str + '" style="font-size:11px;">' + BAOwnersselecteditems[i].trim() + '<img src="/Content/Images/close-quick.png" id=' + selectedBusinessAreaID11[i][1] + ' onclick="javascript:liRemoveBAOwnersselecteditems(this,' + BAOwnersselecteditems.indexOf(BAOwnersselecteditems[i]) + ');" style="float:right" /></span>');
            }
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

            BusinessAreaList = data;//Performance Optimization
            BindBusinessAreMenuCounterp(data);


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
        $("#trcp-RgBusi").show();
        if (thisBusinessAreaNameC != "")
            addDefaultBusinessareaCounterparty();
        $("#txtOwnerofBusinessArea").addClass("validelement");
    }
    //manoj
    $("#RelatedCounterparties").val('');
    PrvRelatedCounterparities = [];
    arrRelatedCounterparities = [];
    curRelatedCounterparities = [];
    //manoj
});
function addDefaultBusinessareaCounterparty() {


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
            selectedBusinessAreaID11.push([rowK[0][0], rowK[0][1]])
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
            selectedBusinessAreaID11Temp.push([rowK[0][0], rowK[0][1]])
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

//Sridhar 
function changecontracttermtype(vTermTypeSelected) {
    var vTermType = vTermTypeSelected.value;
    if (TermTypeHelpText[vTermType] != "" && typeof TermTypeHelpText[vTermType] != 'undefined') {
        if (vTermType == "Fixed Term") {
            $("#termtypeHelpText").html(TermTypeHelpText[vTermType]);
        }
        else if (vTermType == "Evergreen / Perpetual") {
            $("#termtypeHelpText").html(TermTypeHelpText[vTermType]);
        }
        else if (vTermType == "Executed / Performance") {
            $("#termtypeHelpText").html(TermTypeHelpText[vTermType]);
        }
        else if (vTermType == "Renewable") {
            $("#termtypeHelpText").html(TermTypeHelpText[vTermType]);
        }
        else {
            $("#termtypeHelpText").html('');
        }
    }

}

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
function getBusinessAreaDetails(businessareaname, contractareaname) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/detailsbyname?businessareaname=' + encodeURIComponent(businessareaname) + '&contractareaname=' + encodeURIComponent(contractareaname),
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data1) {
            $('#lblBusinessAreaDescription').text(data1.Description);
        }
    });
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
    $("#tblContracts").empty();
    counterpartyTags = [];
    var startIndex = page * 10;
    var endIndex = startIndex + 10;
    if (endIndex > listRelatedContracts.length) endIndex = listRelatedContracts.length;
    var article = "";
    //manoj
    var RelatedContracts = $.map($("#RelatedContracts").val().split(';'), $.trim);
    //manoj
    for (var i = startIndex; i < endIndex; i++) {
        var item = listRelatedContracts[i];
        article += '<tr><td>';
        if (RelatedContracts.indexOf(item.ContractTitle) >= 0) {
            article += '<input id="Pro' + item.RowKey + '" type="checkbox" name="RelatedContracts" class="css1-checkbox" checked onchange="javascript:collectrelatedcontractrowkey(this);" value="' + item.ContractTitle + '" />';
        } else {
            article += '<input id="Pro' + item.RowKey + '" type="checkbox" name="RelatedContracts" class="css1-checkbox" onchange="javascript:collectrelatedcontractrowkey(this);" value="' + item.ContractTitle + '" />';
        }
        article += '<label for="Pro' + item.RowKey + '" class="css1-label PreserveSpace"><a href="/Contracts/ContractDetails?ContractID=' + item.RowKey + '" target="_blank">' + item.ContractTitle + '</a></label></td><td><label>' + item.ContractType + '</label></td><td><label>';  //ENH487 Customer inhanc
        if (item.Counterparty != null && item.Counterparty != "") {
            article += item.Counterparty
        } else {
            article += "-"
        }
        article += '</label></td><td><label style="word-break: break-all;">'
        if (item.ContractNumber != null && item.ContractNumber != "") {
            article += item.ContractNumber
        } else {
            article += "-"
        }
        article += '</label></td><td><label>' + item.Status + '</label></td></tr>'
        counterpartyTags.push(item.ContractTitle);
    }
    $("#tblContracts").html(article);
    article = '';
}

//manoj
function changeinuploadChecking(obj) {
    var idreset = 0;
    var ExistFileName = [];
    var id = obj.id;
    var vAccFeatReqDoc = $.grep(DocumentSelection, function (n, i) {
        return (n.RowKey != id);
    });
    DocumentSelection = vAccFeatReqDoc;
    var filecontrol = document.getElementById(id);
    var txt = "";
    if ('files' in filecontrol) {
        if (filecontrol.files.length == 0) {
            $("#" + id).prop("title", id);
        }
        else {
            for (var i = 0; i < filecontrol.files.length; i++) {
                var acceptExtension = ['pdf', 'png', 'jpg', 'gif', 'bmp', 'doc', 'xls', 'ppt', 'docx', 'xlsx', 'txt', 'pptx', 'dotx', 'xps', 'rtf', 'odt', 'dotm', 'docm', 'msg', 'tif', 'tiff', 'csv', 'zip', 'ZIP'];
                var file = filecontrol.files[i];
                var ext = file.name.split('.').pop().toString();
                var vAccFeatDetails = $.grep(DocumentSelection, function (n, i) {
                    return (n.Name.toLowerCase() == file.name.toLowerCase());
                });
                if (vAccFeatDetails.length > 0) {
                    ExistFileName.push(file.name)
                }
                else if (acceptExtension.indexOf(ext.trim().toLowerCase()) > -1) {
                    if ('size' in file) {
                        if (file.size > 0) {
                            var Filelengthcol = Math.round((file.size / 1048576));
                            if (Filelengthcol > (Math.round(parseInt(localStorage.MaxRequestLength) / 1000))) {
                                //swal("", "The maximum permissible size is " + Math.round(parseInt(localStorage.MaxRequestLength) / 1024) + " MB, Please upload a file which is less than " + Math.round(parseInt(localStorage.MaxRequestLength) / 1024) + " MB");
                                swal("", "File exceeds " + Math.round((parseInt(localStorage.MaxRequestLength) / 1000)) + "MB size limit.");
                                $("#" + id).replaceWith($("#" + id).val('').clone(true));
                                idreset = 1;
                            }
                            else {
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
                                            idreset = 1;
                                        });
                                }
                                else if (!isContainsThreeAlphabets(file.name.substr(0, file.name.lastIndexOf('.')))) {
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
                                            idreset = 1;
                                        });
                                }
                                else {
                                    var person = { RowKey: id, Name: file.name };
                                    //manoj                                    
                                    DocumentSelection.push(person);
                                    //Rahul
                                    if (person.Name != "")
                                        $("#" + id).prop('title', file.name);
                                    else
                                        $("#" + id).prop('title', id);
                                }
                            }
                        }
                        else {
                            swal("", "File cannot be empty.");
                            $("#" + id).replaceWith($("#" + id).val('').clone(true));
                            idreset = 1;
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
                                       idreset = 1;
                                   });
                }
            }
            if (ExistFileName.length > 0 && idreset == 0) {
                var filsexisitdetails = "";
                $(ExistFileName).each(function (i, FileName) {
                    filsexisitdetails += "," + FileName;
                });
                filsexisitdetails = (filsexisitdetails.charAt(0) == ',') ? filsexisitdetails.substr(1) : filsexisitdetails;
                swal("", "Following File(s) already selected <span style='font-weight:700'>" + filsexisitdetails + "</span>");
                var vAccFeatFinal = $.grep(DocumentSelection, function (n, i) {
                    return (n.RowKey != id);
                });
                DocumentSelection = vAccFeatFinal;
                $("#" + id).replaceWith($("#" + id).val('').clone(true));
            }
        }
    }
}
//manoj

function Loading_View_trigger() {
    CheckGlobalSettingsCreateRequest();
    //Bind RequestTypes For the DropDown
    BindRequestTypes();
    getCurrencyDisplayStyle();
    BindCounterpartyType();
    BindCountry();
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
                if (localStorage.AppDateFormat == null || localStorage.AppDateFormat == "" || localStorage.AppDateFormat == 'undefined') {
                    if (navigator.userAgent.indexOf('MSIE') == -1 && navigator.userAgent.indexOf('Trident') == -1)
                        vCreatedOn = moment(new Date($(vMetadataa).find('Created').text())).format('MM/DD/YYYY');
                    else
                        vCreatedOn = moment($(vMetadataa).find('Created').text(), "MM/DD/YYYY THH:mm:ssZ").format('MM/DD/YYYY');
                }
                else {
                    if (navigator.userAgent.indexOf('MSIE') == -1 && navigator.userAgent.indexOf('Trident') == -1)
                        vCreatedOn = moment(new Date($(vMetadataa).find('Created').text())).format(localStorage.AppDateFormat);
                    else
                        vCreatedOn = moment($(vMetadataa).find('Created').text(), "MM/DD/YYYY THH:mm:ssZ").format(localStorage.AppDateFormat);
                }
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
                                                            if (typeof ($(vMetadataa).find(item.FieldName).text()) != "undefined" && $(vMetadataa).find(item.FieldName).text() != null && $(vMetadataa).find(item.FieldName).text() != "") {
                                                                if (typeof ($(vMetadataa).find(item.FieldName).text().split(',')[2]) != "undefined" && $(vMetadataa).find(item.FieldName).text().split(',')[2] != null && $(vMetadataa).find(item.FieldName).text().split(',')[2] != "") {
                                                                    vControls += "<td height='10' align='left' valign='top' class='content-text clr999  width40' id='" + item.FieldName + '1' + "'> +" + $(vMetadataa).find(item.FieldName).text().split(',')[2].trim() + "</td>";
                                                                }
                                                                else {
                                                                    vControls += "<td height='10' align='left' valign='top' class='content-text clr999  width40' id='" + item.FieldName + '1' + "'>Not Available</td>";
                                                                }
                                                            }
                                                            else {
                                                                vControls += "<td height='10' align='left' valign='top' class='content-text clr999  width40' id='" + item.FieldName + '1' + "'>Not Available</td>";
                                                            }
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
                                                        //vControls += "<td height='10' align='left' valign='top' class='content-text width58' style='color: #555555;' id='" + item.FieldName + '1' + "'>" + $(vMetadataa).find(item.FieldName).text() + "</td>";
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
                                                            if (typeof ($(vMetadataa).find(item.FieldName).text()) != "undefined" && $(vMetadataa).find(item.FieldName).text() != null && $(vMetadataa).find(item.FieldName).text() != "") {
                                                                if (typeof ($(vMetadataa).find(item.FieldName).text().split(',')[2]) != "undefined" && $(vMetadataa).find(item.FieldName).text().split(',')[2] != null && $(vMetadataa).find(item.FieldName).text().split(',')[2] != "") {
                                                                    vControls += "<td height='10' align='left' valign='top' class='content-text clr999  width40' id='" + item.FieldName + '1' + "'> +" + $(vMetadataa).find(item.FieldName).text().split(',')[2].trim() + "</td>";
                                                                }
                                                                else {
                                                                    vControls += "<td height='10' align='left' valign='top' class='content-text clr999  width40' id='" + item.FieldName + '1' + "'>Not Available</td>";
                                                                }
                                                            }
                                                            else {
                                                                vControls += "<td height='10' align='left' valign='top' class='content-text clr999  width40' id='" + item.FieldName + '1' + "'>Not Available</td>";
                                                            }
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
                                                                    vControls += "<td height='10' align='left' valign='top' class='content-text clr999 width40' id='" + item.FieldName + '1' + "'>	Not Available </td>";
                                                                }
                                                            }
                                                        }
                                                        //vControls += "<td height='10' align='left' valign='top' class='content-text width58 padding_left_20px padding_top_10px' style='color: #555555;' id='" + item.FieldName + '1' + "'>" + $(vMetadataa).find(item.FieldName).text() + "</td>";

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
// ENH493 Customer inhancment
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

function sortArrOfObjectsByParam(arrToSort) {
    arrToSort.sort(function (a, b) {
        var A = a.toUpperCase();
        var B = b.toUpperCase();
        return ((A < B) ? -1 : ((A > B) ? 1 : 0));
    });
    return arrToSort;
}

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
