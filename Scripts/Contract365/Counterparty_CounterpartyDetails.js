var vUserList = "";
var vGlobalObjForGeneric = "";
var relatedcounterpartyname = '';
var IsContractExist;
var vCoounterparty = "";
var vCoounterpartyId = "";
var thisBusinessAreaPath = "";
var thisBusinessAreaName = "";
var thisContractAreaName = "";
var thisBusinessAreaNameRowKey = "";
var thisContractAreaNameRowKey = "";
var vCurrencyDisplayStyle = '';
var multipleChecksDocumentID = [];
var myArrayRU = [];
var arrprevRU = [];
//manoj
var CounterPartyMetadata = null;
//For Related Counterparty
var PrvRelatedCounterparities = [];
var arrRelatedCounterparities = [];
var curRelatedCounterparities = [];
var arrSavedCounterparties = [];
var addRelatedButton = false;
//For Related Counterparty
//manoj

var oGeneralSettings;
function BackToList() {
    if (parent.history.length > 1)
        parent.history.back();
    else
        location = "/Counterparty";
}

var vCounterpartyID = "";

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

$(document).ready(function () {
    if (localStorage.UserType == "Business User") {
        $("#editCPindetails").css("display", "none");
        $(".Contribute").css("display", "none");
        $(".contributeCounterparty").css("display", "none");
    }
    else {
        $("#editCPindetails").css("display", "");
        $(".Contribute").css("display", "");
        $(".contributeCounterparty").css("display", "");
    }
    if (typeof localStorage.GlobalBusinessAreaLocation != 'undefined') {
        if (localStorage.GlobalBusinessAreaLocation != "All" && localStorage.GlobalBusinessAreaLocation != 'undefined') {
            thisContractAreaName = localStorage.GlobalBusinessAreaLocation.split('>')[0].trim();
            thisBusinessAreaName = localStorage.GlobalBusinessArea;//Business Area +';'+ Contract Area
            thisBusinessAreaPath = localStorage.GlobalBusinessAreaLocation;
        }
        else {
            thisContractAreaName = "";
            thisBusinessAreaName = "";//Business Area +';'+ Contract Area
            thisBusinessAreaPath = "";
        }
    }
    else {
        thisContractAreaName = "";
        thisBusinessAreaName = "";//Business Area +';'+ Contract Area
        thisBusinessAreaPath = "";
    }
    vCounterpartyID = getParameterByName("CounterpartyID");

    BindCounterpartyDetail();
    $(".openmenuDetails").contextMenu({ menu: 'myMenu', leftButton: true }, function (action, el, pos) { contextMenuDetails(action, el.parent("tr"), pos); });
    BindContacts();
    BindRelatedCounterparties(vCounterpartyID);
    bindgeneralSetting();
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
    vUserList = GetUserList();
    $("#ddlInternalUser").append(vUserList);
    BindBusinessAreaPicker11();
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
            "Save": function () { SaveCounterparty(); },
            Cancel: function () {
                $(this).dialog("close");
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
                $("#txtEmailID").val("");
                selectedBusinessAreaID11 = [];
            }
        },
        close: function () {
            PrvRelatedCounterparities = [];
            arrRelatedCounterparities = [];
            curRelatedCounterparities = [];
            //arrSavedCounterparties = [];
            selectedBusinessAreaID11 = [];
        }
    });

    $("#addEditContact").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "Create/Update Contact",
        modal: true,
        show: {
            effect: "fade",
            duration: 500
        },
        hide: {
            effect: "fade",
            duration: 500
        },
        buttons: {
            "Save": function () { if (SaveContact()) { $(this).dialog("close"); } },
            Cancel: function () {
                $(this).dialog("close");
            }
        },
        close: function () {
            $(".validelement").each(function (index, element) {
                $(element).removeClass("error");
                $("#errormsg_" + element.id).remove();
            });
            $(".validemail").each(function (index, element) {
                $(element).removeClass("error");
                $("#errormsg_" + element.id).remove();
            });
        }
    });
    $("#viewContact").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "View Contact",
        modal: true,
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
        },
        close: function () {
            $(".validelement").each(function (index, element) {
                $(element).removeClass("error");
                $("#errormsg_" + element.id).remove();
            });
            $(".validemail").each(function (index, element) {
                $(element).removeClass("error");
                $("#errormsg_" + element.id).remove();
            });
        }
    });

    $("#contractLogsPopup").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "Contract History",
        modal: true,
        buttons: {
            "OK": function () { $(this).dialog("close"); }
        }
    });
    $("#shareContract").dialog({
        autoOpen: false,
        closeText: "",
        width: "75%",
        title: "Share Contract Record",
        modal: true,
        buttons: {
            "Share": function () {
                ShareContract();
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
    $("#addEditStatus").dialog({
        autoOpen: false,
        closeText: "",
        width: "40%",
        title: "Change Status",
        modal: true,
        buttons: {
            "OK": function () { if (imgcheckgeneral()) { $(this).dialog("close"); applyFilter(); } },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });
    $("#addEditPeople").dialog({
        autoOpen: false,
        closeText: "",
        width: "65%",
        title: "People and Permissions",
        modal: true,
        buttons: {
            "OK": function () { if (savePeople()) { $(this).dialog("close"); } },
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
        dialogClass: "popup_width100",
        buttons: {
            "OK": function () {
                var s = false;
                vCoounterparty = "";
                vCoounterpartyId = "";
                var my_data = $(this).data('param_1')
                $('input:checkbox[name="Generic"]:checked').each(function () {
                    if (vCoounterparty == "") {
                        vCoounterparty = unescape(this.value);
                        vCoounterpartyId = this.id;
                    }
                    else {
                        vCoounterparty += "; " + unescape(this.value);
                        vCoounterpartyId += ";" + this.id;
                    }
                });

                if (vCoounterparty != "") {
                    $('#' + my_data).val(vCoounterparty);
                    s = true;
                    $(this).dialog("close");
                } else {

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
                           vCoounterparty = '';
                           $('#' + my_data).val('');

                           s = false;
                           $("#browseGeneric").dialog("close");
                       }
                       else {
                           $("#browseGeneric").dialog("open");
                       }
                   });


                    //// alert('No item has been selected.');
                    //swal("", "No item has been selected.");
                    //s = false;
                }

                //if (s) {
                //    $(this).dialog("close");
                //}
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });


    BindCountry();

    var Permission = JSON.parse(localStorage.getItem("Permission"));

    $("#popupCounterparties").dialog({
        autoOpen: false,
        closeText: "",
        width: "65%",
        height: "auto",
        title: "Related Counterparties",
        modal: true,
        buttons: {
            "OK": function () { RelatedCounterpartiesPush(); },
            Cancel: function () {
                //manoj
                if (addRelatedButton) {
                    PrvRelatedCounterparities = [];
                    arrRelatedCounterparities = [];
                    curRelatedCounterparities = [];
                    addRelatedButton = false;
                }
                //manoj
                $(this).dialog("close");
            }
        }
    });
});

function bindgeneralSetting() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/settings',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            oGeneralSettings = data;
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
                $("#filterType").append('<option value="' + item.TypeName + '">' + item.TypeName + '</option>');

            });
        },
        error:
            function (data) {
            }
    });
}

function SaveCounterparty() {
    var isformvalid = false;

    if (requiredValidator('addNewEntityFields', false)) {
        $("#loadingPage").fadeIn();

        isformvalid = true;
        var entityid = $("#txtCounterpartyID").val();
        var AddressLine1 = $("#txtAddressLine1").val();
        var vTitle = $("#txtCounterpartyName").val();
        if (AddressLine1 == null || AddressLine1 == '') {
            AddressLine1 = '';
        }
        var entityid = $("#txtCounterpartyID").val();
        var strBusinessAreaOwnerof = "";
        if ($('input[type="radio"][name=IsGlobal]:checked').val() == "No") {
            if ($("#txtOwnerofBusinessArea").val() != $("#hdnOwnerofBusinessArea").val()) {
                if ($("#txtOwnerofBusinessArea").val() != "") {
                    for (var i = 0; i < selectedBusinessAreaID11.length; i++) {

                        var rowKPath = jQuery.grep(BusinessAreaPathRowKey, function (a) {
                            return a[1] === selectedBusinessAreaID11[i][1];
                        });
                        if (rowKPath != null && typeof (rowKPath) != "undefined" && rowKPath.length != 0)
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


            var counterpartyForm = $("#counterpartyForm *").serialize();

            var cpresult = "&";
            $("#counterpartyForm .fielddatecontrol").each(function (index) {
                if ($(this).attr('class').toLowerCase().indexOf("hasdatepicker") >= 0) {

                    var name = $(this).attr('class');
                    name = name.split("hasDatepicker")[0];
                    name = name.slice(0, -1);

                    name = name.substr(name.lastIndexOf(' ') + 1);
                    var value = $.datepicker.formatDate('mm/dd/yy', $(this).datepicker('getDate'));
                    cpresult = cpresult + name + "=" + value + "&";
                }

            });
            cpresult = cpresult.slice(0, -1)
            counterpartyForm += cpresult;

            cpresult = "&";
            $("#counterpartyForm .fieldphonecontrol").each(function (index) {
                if ($(this).val() != null && $(this).val() != "") {
                    var name = $(this)[0].id;
                    var value = $(this).intlTelInput("getSelectedCountryData").iso2 + "," + $(this).intlTelInput("getSelectedCountryData").dialCode + "," + $(this).intlTelInput("getNumber", intlTelInputUtils.numberFormat.INTERNATIONAL)
                    cpresult = cpresult + name + "=" + value + "&";
                }
                else {
                    var name = $(this)[0].id;
                    var value = "";
                    cpresult = cpresult + name + "=" + value + "&";
                }
            });
            cpresult = cpresult.slice(0, -1)
            counterpartyForm += cpresult;

            counterpartyForm += "&AccountID=" + localStorage.AccountID;
            counterpartyForm += "&ModifiedBy=" + localStorage.UserName;
            counterpartyForm += "&BusinessAreasPath=" + encodeURIComponent(strBusinessAreaOwnerof);
            var formData = new FormData();
            formData.append("AccountID", localStorage.AccountID);
            formData.append("CounterpartyID", entityid);
            formData.append("SearializeControls", counterpartyForm);

            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/dynamicformupdate',
                type: 'PUT',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                success: function (data) {
                    // swal("", "saved");
                    if (!$.isEmptyObject(arrRelatedCounterparities)) {
                        CreateRelatedCounterparies(entityid, vTitle);
                    }
                    $("#addEditCounterparty").dialog("close");
                    $("#loadingPage").fadeOut();

                    swal({
                        title: '',
                        text: "saved",

                    },
                    function (confirmed) {
                        if (confirmed) {
                            location = location;
                        }

                    });

                },
                error: function (person) {
                    if (person.statusText == "Conflict") {
                        swal("", "<span style=\"font-weight:700\">" + vTitle + "</span> Counterparty is Already Exist");
                    }
                    //swal("", "Counterparty Name Exist");

                    $("#loadingPage").fadeOut();
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
                    if (!$.isEmptyObject(arrRelatedCounterparities)) {
                        CreateRelatedCounterparies(person, vTitle);
                    }
                    $("#addEditCounterparty").dialog("close");
                    swal({
                        title: '',
                        text: person,

                    },
                    function (confirmed) {
                        if (confirmed) {
                            location = location;
                        }

                    });
                }
            });
        }
    }
    return isformvalid;
}

function contextMenuDetails(action, el, pos) {
    switch (action) {

        case "edit":
            {
                $("#loadingPage").fadeIn();
                $("#loadingPage").fadeIn();
                var entityid = $("#hdnCounterpartyID").text();
                var entityname = $("#hdnCounterpartyName").text();
                $("#txtCounterpartyID").val(entityid);
                $('.removableCounterpartyField').remove();
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/allcontractsbycounterparty?counterparty=' + encodeURIComponent(entityname),
                    type: 'GET',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    cache: false,
                    success: function (data) {
                        $("#loadingPage").fadeOut();
                        if (data.length == 0) {
                            $("#addEditCounterparty").dialog("option", "title", "Edit Counterparty");
                            $("#addEditCounterparty").dialog("open");
                        } else {
                            var contractid = data[0].RowKey;
                            var businessareapath = data[0].BusinessAreaPath;
                            var vContractlist = $.grep(data, function (n, i) {
                                return (n.RowKey != contractid && n.BusinessAreaPath != businessareapath);
                            });
                            if (vContractlist.length > 0) {
                                swal({
                                    title: '',
                                    text: "Contracts exists with this counterparty,Do you want to proceed?",
                                    type: 'warning',
                                    showCancelButton: true,
                                    confirmButtonText: 'Yes',
                                    cancelButtonText: 'No',
                                    html: true
                                }, function (confirmed) {
                                    if (confirmed) {
                                        getCounterpartyFieldsEdit(entityid);
                                        $("#addEditCounterparty").dialog("option", "title", "Edit Counterparty");
                                        $("#addEditCounterparty").dialog("open");
                                    }
                                });
                            }
                            else {
                                getCounterpartyFieldsEdit(entityid);
                                $("#addEditCounterparty").dialog("option", "title", "Edit Counterparty");
                                $("#addEditCounterparty").dialog("open");
                            }
                        }
                    }, error: function (data) {
                        getCounterpartyFieldsEdit(entityid);
                        $("#addEditCounterparty").dialog("option", "title", "Edit Counterparty");
                        $("#addEditCounterparty").dialog("open");
                        $("#loadingPage").fadeOut();
                    }
                });

                //var entityid = $("#hdnCounterpartyID").text();
                //var entityname = $("#hdnCounterpartyName").text();
                //$("#txtCounterpartyID").val(entityid);
                //$('.removableCounterpartyField').remove();
                //getCounterpartyFieldsEdit(entityid);
                //$("#addEditCounterparty").dialog("option", "title", "Edit Counterparty");
                //$("#addEditCounterparty").dialog("open");

                break;
            }

        case "delete":
            {

                var legalEntityName = $("#lblCounterpartyName").text();
                swal({
                    title: '',
                    text: "Are you sure you want to <span style=\"font-weight:700\">delete '" + legalEntityName + "'</span>?",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    html: true
                },
   function (confirmed) {
       if (confirmed) {
           $("#loadingPage").fadeIn();
           var entityid = $("#hdnCounterpartyID").text();
           $.ajax({
               url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty?counterpartyid=' + entityid,
               type: 'DELETE',
               dataType: 'json',
               headers: { 'eContracts-ApiKey': localStorage.APIKey },
               cache: false,
               success: function (data) {
                   $("#loadingPage").fadeOut();

                   swal({
                       title: '',
                       text: data,

                   },
                   function (confirmed) {
                       if (confirmed) {
                           //location = "../../Counterparty/";
                           BackToList();
                       }

                   });
               }
           });
       }
       return;
   });



                break;
            }

    }
}

function getCounterpartyFieldsEdit(CounterpartyID) {
    $("#loadingPage").fadeIn();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/primaryfields',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (metadataFields) {
            var vMetadata = "";
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/icounterpartydetails?counterpartyid=' + CounterpartyID,
                type: 'GET',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey },
                cache: false,
                async: false,
                success: function (mainmetadataFields) {
                    vMetadata = $(mainmetadataFields).find('Metadata');
                    $("#txtCounterpartyName").val($(vMetadata).find('CounterpartyName').text());
                    $("#ddlCounterpartyType option").filter(function (index) { return $(this).text() === $(vMetadata).find('CounterpartyType').text(); }).prop('selected', true);
                    $("#ddlStatus option").filter(function (index) { return $(this).text() === $(vMetadata).find('Status').text(); }).prop('selected', true);
                    $("#hdnLocOwnerofBusinessArea").val($(vMetadata).find('BusinessAreasPath').text());
                    $("#hdnOwnerofBusinessArea").val($(vMetadata).find('BusinessAreas').text());
                    $('input[type="radio"][name=IsGlobal][value=' + $(vMetadata).find('IsGlobal').text() + ']').prop('checked', true);
                    if ($(vMetadata).find('IsGlobal').text() == 'Yes' || $(vMetadata).find('IsGlobal').text() == '') {
                        $("#trcp-RgBusi").hide();
                        $("#txtOwnerofBusinessArea").removeClass("validelement");
                    }
                    else if ($(vMetadata).find('IsGlobal').text() == 'No') {
                        $("#trcp-RgBusi").show();
                        $("#txtOwnerofBusinessArea").addClass("validelement");
                        $("#txtOwnerofBusinessArea").val($(vMetadata).find('BusinessAreas').text());
                        var EachBusinessAreaPath = $(vMetadata).find('BusinessAreasPath').text().split(';');

                        $(EachBusinessAreaPath).each(function () {
                            var path = this.toString();
                            var rowK = jQuery.grep(BusinessAreaPathRowKey, function (a) {
                                return a[0] === path;
                            });
                            if (rowK != null && typeof (rowK) != "undefined" && rowK.length != 0) {
                                selectedBusinessAreaID11 = $.grep(selectedBusinessAreaID11, function (value) {
                                    return value[1] != rowK[0][1];
                                });
                                selectedBusinessAreaID11.push([rowK[0][0], rowK[0][1]])
                                selectedBusinessAreaID11Temp.push([rowK[0][0], rowK[0][1]])
                            }
                        });
                    }
                }
            });

            $(metadataFields).each(function (i, item) {
                if (item != null && item.FieldName != null) {
                    if ((item.FieldName == "CounterpartyName") || (item.FieldName == "CounterpartyType") || (item.FieldName == "Status")) {
                    }
                    else {
                        if (item.ShowInEditForm == "true") {
                            var onlydate = "";
                            var vControls = "";
                            var vDate = "";
                            var vNumber = "";
                            var vPhoneNumber = "";
                            var vControlsYesNo = "";
                            var isYesOrNo = false;
                            var PhoneID = "";
                            var PhoneCountry = "";
                            var vEmail = "";
                            var vMultiDDL = "";
                            var vUser = "";
                            //manoj
                            var vCurrency = "";
                            var vNumberD = "";
                            var vNumberP = "";
                            var vNumberPD = "";
                            //manoj
                            if (item.FieldType != "File Upload") {
                                if (item.Required == "true") {
                                    vControls += '<li class="removableCounterpartyField"><p><b>' + item.FieldDisplayName + '</b><small>*</small>';
                                    if (item.FieldHelp == "true") {
                                        vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                                    }
                                    vControls += '</p><div>';
                                } else {
                                    vControls += '<li class="removableCounterpartyField"><p><b>' + item.FieldDisplayName + '</b>';
                                    if (item.FieldHelp == "true") {
                                        vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                                    }
                                    vControls += '</p><div>';
                                }
                            }
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
                                        headers: { 'eContracts-ApiKey': localStorage.APIKey },
                                        success: function (data) {
                                            $(data).each(function (i, item) {
                                                if ($(vMetadata).find("Country").text() == item) {
                                                    vControls += '<option value="' + item + '" selected>' + item + '</option>';
                                                } else {
                                                    vControls += '<option value="' + item + '">' + item + '</option>';
                                                }
                                            });
                                        },
                                        error:
                                            function (data) {

                                            }
                                    });

                                    vControls += '</select>';
                                    vControls += '<label style="font-size:12px;">' + item.Description + '</label>';
                                    //if (item.FieldHelp == "true") {
                                    //    vControls += '<span> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                                    //}
                                    vControls += '</div></li>';
                                } else {
                                    if ($(vMetadata).find(item.FieldName).text() == "") {
                                        if (item.Required == "true") {
                                            vControls += "<input type='text' id=" + item.FieldName + " maxlength='100' name=" + item.FieldName + " class='validelement'>";
                                        } else {
                                            vControls += "<input type='text' id=" + item.FieldName + " maxlength='100' name=" + item.FieldName + ">";
                                        }
                                    } else {
                                        if (item.Required == "true") {
                                            vControls += "<input type='text' id=" + item.FieldName + " maxlength='100' name=" + item.FieldName + " value='" + $(vMetadata).find(item.FieldName).text() + "' title='" + item.FieldDisplayName + "' class='validelement' />";
                                        } else {
                                            vControls += "<input type='text' id=" + item.FieldName + " maxlength='100' name=" + item.FieldName + " value='" + $(vMetadata).find(item.FieldName).text() + "' />";
                                        }
                                    }
                                    vControls += '<label style="font-size:12px;">' + item.Description + '</label>';
                                    //if (item.FieldHelp == "true") {
                                    //    vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                                    //}
                                    vControls += '</div></li>';
                                }
                            }
                            else if (item.FieldType == "Multi Line Text") {
                                //if (item.Required == "true") {
                                //    vControls += "<textarea name=" + item.FieldName + " id=" + item.FieldName + " title='" + item.FieldDisplayName + "' cols='25' rows='3' class=' validelement'>";
                                //} else {
                                //    vControls += "<textarea name=" + item.FieldName + " id=" + item.FieldName + " title='" + item.FieldDisplayName + "' cols='25' rows='3'></textarea>";
                                //}
                                if ($(vMetadata).find(item.FieldName).text() == "") {
                                    if (item.Required == "true") {
                                        vControls += "<textarea name=" + item.FieldName + " maxlength='300' id=" + item.FieldName + " cols='25' rows='3' title='" + item.FieldDisplayName + "' class='validelement'></textarea>";
                                    } else {
                                        vControls += "<textarea name=" + item.FieldName + " maxlength='300' id=" + item.FieldName + " cols='25' rows='3'></textarea>";
                                    }
                                } else {
                                    if (item.Required == "true") {
                                        vControls += "<textarea name=" + item.FieldName + " maxlength='300' id=" + item.FieldName + " cols='25' rows='3' title='" + item.FieldDisplayName + "' class='validelement'>" + $(vMetadata).find(item.FieldName).text() + "</textarea>";
                                    } else {
                                        vControls += "<textarea name=" + item.FieldName + " maxlength='300' id=" + item.FieldName + " cols='25' rows='3'>" + $(vMetadata).find(item.FieldName).text() + "</textarea>";
                                    }
                                }

                                vControls += '<label style="font-size:12px;">' + item.Description + '</label>';
                                //if (item.FieldHelp == "true") {
                                //    vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                                //}
                                vControls += '</div></li>';
                            }
                            else if (item.FieldType == "Hyperlink") {
                                //manoj
                                //for Hyperlink
                                var Hyperlinkvalue = $(vMetadata).find(item.FieldName).text();
                                if (item.Required == "true") {
                                    vControls += "<input type='text' id=" + item.FieldName + " maxlength='2083' name=" + item.FieldName + " placeholder='http://www.' value = '" + Hyperlinkvalue + "' class='validelement validwebsite'>";
                                } else {
                                    vControls += "<input type='text' id=" + item.FieldName + " maxlength='2083' name=" + item.FieldName + " placeholder='http://www.' value = '" + Hyperlinkvalue + "' class='validwebsite'>";
                                }
                                vControls += '<br>' + '<a href="javascript:void(0)" class="linkText" title="' + item.FieldDisplayName + '" onclick="navigateurl(\'' + item.FieldName + '\')"> Navigate</a>';
                                vControls += '</div></li>';
                                //for Hyperlink
                                //manoj
                            }
                            else if (item.FieldType == "Date") {
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

                                if (item.Required == "true") {
                                    vControls += "<input type='text' id=" + item.FieldName + "  title='" + item.FieldDisplayName + "' class='validelement  form-contro-Date validdate fielddatecontrol " + item.FieldName + "'/>";
                                } else {
                                    vControls += "<input type='text' id=" + item.FieldName + "  class='validdate  form-contro-Date fielddatecontrol " + item.FieldName + "'/>";
                                }

                                //if (item.Required == "true") {
                                //    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " value='" + onlydate + "' title='" + item.FieldDisplayName + "' class='validelement validdate'/>";
                                //} else {
                                //    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " value='" + onlydate + "' class='validdate'/>";
                                //}

                                //if (item.FieldHelp == "true") {
                                //    vControls += '<span> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                                //}
                                vControls += '<label style="font-size:12px;">' + item.Description + '</label>';
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

                                vControls += '</select>';
                                vControls += '<label style="font-size:12px;">' + item.Description + '</label>';
                                //if (item.FieldHelp == "true") {
                                //    vControls += '<span> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                                //}
                                vControls += '</div></li>';
                            } else if (item.FieldType == "Lookup") {
                                if (item.FieldName == "RelatedCounterparties") {
                                    if (item.Required == "true") {
                                        vControls += "<input id=" + item.FieldName + " name='" + item.FieldName + "' value='" + $(vMetadata).find(item.FieldName).text() + "' title='" + item.FieldDisplayName + "' class='validelement' readonly='readonly' type='text' />";
                                    } else {
                                        vControls += "<input id=" + item.FieldName + " name='" + item.FieldName + "' value='" + $(vMetadata).find(item.FieldName).text() + "' title='" + item.FieldDisplayName + "' readonly='readonly' type='text' />";
                                    }
                                    vControls += '<label style="font-size:12px;">' + item.Description + '</label>';
                                    //if (item.FieldHelp == "true") {
                                    //    vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                                    //}
                                    vControls += '<br/>' + "<a href='javascript:void(0)' class='linkText' id='" + item.FieldDisplayName + "' title='" + item.FieldName + "' onclick='ViewCounterpartyRelated(this)'> Browse</a>";
                                    vControls += '</div></li>';
                                    //manoj
                                    //GetRelatedCounterpartiesPopup(CounterpartyID);
                                    //manoj
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

                                                if (itemname == $(vMetadata).find(item.FieldName).text()) {
                                                    $("#" + item.FieldName).append("<option value='" + itemname + "' selected='selected'>" + itemname + "</option>")
                                                } else {
                                                    $("#" + item.FieldName).append("<option value='" + itemname + "'>" + itemname + "</option>")
                                                }
                                            }
                                        }
                                    });
                                    vControls += '</select>';
                                    vControls += '<label style="font-size:12px;">' + item.Description + '</label>';
                                    //if (item.FieldHelp == "true") {
                                    //    vControls += '<span> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                                    //}
                                    vControls += '</div></li>';
                                }
                            }
                            else if (item.FieldType.indexOf("Dropdown") > -1 || item.FieldType.indexOf("Multi Select") > -1) {
                                if (item.Required == "true") {
                                    vControls += "<select id=" + item.FieldName + " multiple='multiple' class='width90 chosenmulti validuser' name=" + item.FieldName + " title='" + item.FieldDisplayName + "' data-placeholder='--Select--'>"
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
                                vControls += '<label style="font-size:12px;">' + item.Description + '</label>';
                                //if (item.FieldHelp == "true") {
                                //    vControls += '<span> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                                //}
                                vControls += '</div></li>';
                                vMultiDDL = item.FieldName;
                            }
                            else if (item.FieldType == "Number") {

                                if ($(vMetadata).find(item.FieldName).text() == "") {
                                    if (item.Required == "true") {
                                        vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validelement' />";
                                    } else {
                                        vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' />";
                                    }
                                } else {
                                    if (item.Required == "true") {
                                        vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text() + "' class='validelement' />";
                                    } else {
                                        vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text() + "'/>";
                                    }
                                }


                                //if (item.FieldHelp == "true") {
                                //    vControls += '<span > <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                                //}
                                vControls += '<label style="font-size:12px;">' + item.Description + '</label>';
                                vControls += '</div></li>';
                                vNumber = item.FieldName;
                            }
                            else if (item.FieldType == "Number-D") {

                                if ($(vMetadata).find(item.FieldName).text() == "") {
                                    if (item.Required == "true") {
                                        vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validelement' />";
                                    } else {
                                        vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' />";
                                    }
                                } else {
                                    if (item.Required == "true") {
                                        vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text() + "' class='validelement' />";
                                    } else {
                                        vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text() + "'/>";
                                    }
                                }

                                vControls += '<label style="font-size:12px;">' + item.Description + '</label>';
                                vControls += '</div></li>';
                                vNumberD = item.FieldName;
                            }
                                //Percent
                            else if (item.FieldType == "Number-P") {

                                if ($(vMetadata).find(item.FieldName).text() == "") {
                                    if (item.Required == "true") {
                                        vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validelement' />";
                                    } else {
                                        vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' />";
                                    }
                                } else {
                                    if (item.Required == "true") {
                                        vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text() + "' class='validelement' />";
                                    } else {
                                        vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text() + "'/>";
                                    }
                                }
                                vControls += '<label class="margin-top-8" style="float: right;position: absolute;font-size:12px;">' + '%' + '</label>';
                                vControls += '<label style="float: left;font-size:12px;">' + item.Description + '</label>';
                                vControls += '</div></li>';
                                vNumberP = item.FieldName;
                            }
                                //Percent Decimal
                            else if (item.FieldType == "Number-PD") {

                                if ($(vMetadata).find(item.FieldName).text() == "") {
                                    if (item.Required == "true") {
                                        vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validelement' />";
                                    } else {
                                        vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' />";
                                    }
                                } else {
                                    if (item.Required == "true") {
                                        vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text() + "' class='validelement' />";
                                    } else {
                                        vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text() + "'/>";
                                    }
                                }
                                vControls += '<label class="margin-top-8" style="float: right;position: absolute;font-size:12px;">' + '%' + '</label>';
                                vControls += '<label style="float: left;font-size:12px;">' + item.Description + '</label>';
                                vControls += '</div></li>';
                                vNumberPD = item.FieldName;
                            }
                            else if (item.FieldType == "Phone Number") {
                                //Vinod
                                if ($(vMetadata).find(item.FieldName).text() != "") {
                                    if (item.Required == "true") {
                                        vControls += "<input type='text' id=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text().split(',')[2] + "' class='form-contro validelement validPhone fieldphonecontrol' />";
                                    } else {
                                        vControls += "<input type='text' id=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text().split(',')[2] + "'  class='form-contro validPhone fieldphonecontrol' />";
                                    }
                                    vControls += '<label style="font-size:12px;">' + item.Description + '</label>';
                                    vControls += '</div></li>';


                                    PhoneCountry = $(vMetadata).find(item.FieldName).text().split(',')[0];

                                }
                                else {
                                    if (item.Required == "true") {
                                        vControls += "<input type='text' id=" + item.FieldName + " title='" + item.FieldDisplayName + "'  class='form-contro validelement validPhone fieldphonecontrol' />";
                                    } else {
                                        vControls += "<input type='text' id=" + item.FieldName + " title='" + item.FieldDisplayName + "'  class='form-contro validPhone fieldphonecontrol' />";
                                    }
                                    vControls += '<label style="font-size:12px;">' + item.Description + '</label>';
                                    vControls += '</div></li>';
                                }

                                vPhoneNumber = vControls;
                                PhoneID = item.FieldName;
                            }
                            else if (item.FieldType == "Yes/No") {
                                if ($(vMetadata).find(item.FieldName).text() == "") {
                                    vControls += "	<div style='width: auto; margin-right: 15px;'><input style='float: left; width: auto;' type='radio' id='Yes" + item.FieldName + "' name=" + item.FieldName + " value='Yes' onchange='changeYesNoField(this);'><span style='float: left; margin: 7px 0px 0px 5px;'>Yes </span></div>";
                                    vControls += "	<div style='width: auto;'><input style='float: left; width: auto;' type='radio' id='No" + item.FieldName + "' name=" + item.FieldName + " checked value='No' onchange='changeYesNoField(this);'><span style='float: left; margin: 7px 0px 0px 5px;'>No </span></div>";
                                    vControls += "	<input type='hidden' id='hdnYes" + item.FieldName + "' value=" + item.CommentYes + " />";
                                    vControls += "	<input type='hidden' id='hdnNo" + item.FieldName + "' value=" + item.CommentNo + " />";
                                    vControls += "	<input type='hidden' id='hdnRequired" + item.FieldName + "' value=" + item.CommentRequired + " />";
                                    //vControls += "	<input type='radio' name=" + item.FieldName + " value='Yes'>Yes ";
                                    //vControls += "	<input type='radio' name=" + item.FieldName + " checked value='No'>No";
                                    if (item.CommentNo == "true") {
                                        isYesOrNo = true;
                                    }
                                } else {
                                    if ($(vMetadata).find(item.FieldName).text() == "Yes") {
                                        vControls += "	<div style='width: auto; margin-right: 15px;'><input style='float: left; width: auto;' type='radio' id='Yes" + item.FieldName + "' name=" + item.FieldName + " checked value='Yes' onchange='changeYesNoField(this);'><span style='float: left; margin: 7px 0px 0px 5px;'>Yes </span></div>";
                                        vControls += "	<div style='width: auto;'><input style='float: left; width: auto;' type='radio' id='No" + item.FieldName + "' name=" + item.FieldName + " value='No' onchange='changeYesNoField(this);'><span style='float: left; margin: 7px 0px 0px 5px;'>No </span></div>";
                                        vControls += "	<input type='hidden' id='hdnYes" + item.FieldName + "' value=" + item.CommentYes + " />";
                                        vControls += "	<input type='hidden' id='hdnNo" + item.FieldName + "' value=" + item.CommentNo + " />";
                                        vControls += "	<input type='hidden' id='hdnRequired" + item.FieldName + "' value=" + item.CommentRequired + " />";
                                        //vControls += "	<input type='radio' name=" + item.FieldName + " checked value='Yes'>Yes ";
                                        //vControls += "	<input type='radio' name=" + item.FieldName + " value='No'>No";
                                        if (item.CommentYes == "true") {
                                            isYesOrNo = true;
                                        }
                                    } else {
                                        //vControls += "	<input type='radio' name=" + item.FieldName + " value='Yes'>Yes ";
                                        //vControls += "	<input type='radio' name=" + item.FieldName + " checked value='No'>No";
                                        vControls += "	<div style='width: auto; margin-right: 15px;'><input style='float: left; width: auto;' type='radio' id='Yes" + item.FieldName + "' name=" + item.FieldName + " value='Yes' onchange='changeYesNoField(this);'><span style='float: left; margin: 7px 0px 0px 5px;'>Yes </span></div>";
                                        vControls += "	<div style='width: auto;'><input style='float: left; width: auto;' type='radio' id='No" + item.FieldName + "' name=" + item.FieldName + " checked value='No' onchange='changeYesNoField(this);'><span style='float: left; margin: 7px 0px 0px 5px;'>No </span></div>";
                                        vControls += "	<input type='hidden' id='hdnYes" + item.FieldName + "' value=" + item.CommentYes + " />";
                                        vControls += "	<input type='hidden' id='hdnNo" + item.FieldName + "' value=" + item.CommentNo + " />";
                                        vControls += "	<input type='hidden' id='hdnRequired" + item.FieldName + "' value=" + item.CommentRequired + " />";
                                        if (item.CommentNo == "true") {
                                            isYesOrNo = true;
                                        }
                                        if (item.CommentNo == "true") {
                                            isYesOrNo = true;
                                        }
                                    }
                                }

                                vControls += '<label style="width:auto;margin:7px 0px 0px 5px;" class="col12 p-text text-left help">' + item.Description + '</label>';
                                //if (item.FieldHelp == "true") {
                                //    vControls += '<span style="width:auto;margin:7px 0px 0px 5px;"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                                //}
                                vControls += '</div></li>';
                            } else if (item.FieldType == "Email") {

                                if ($(vMetadata).find(item.FieldName).text() == "") {
                                    if (item.Required == "true") {
                                        vControls += "<input type='text' id=" + item.FieldName + " maxlength='50'  name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validemail validelement' />";
                                    } else {
                                        vControls += "<input type='text' id=" + item.FieldName + " maxlength='50'  name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validemail' />";
                                    }
                                } else {
                                    if (item.Required == "true") {
                                        vControls += "<input type='text' id=" + item.FieldName + " maxlength='50'  name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text() + "' class='validemail validelement' />";
                                    } else {
                                        vControls += "<input type='text' id=" + item.FieldName + " maxlength='50'  name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text() + "' class='validemail' />";
                                    }
                                }

                                vControls += '<label style="font-size:12px;">' + item.Description + '</label>';
                                //if (item.FieldHelp == "true") {
                                //    vControls += '<span> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                                //}
                                vControls += '</div></li>';
                            } else if (item.FieldType.indexOf("Browse") > -1) {

                                if ($(vMetadata).find(item.FieldName).text() == "") {
                                    if (item.Required == "true") {
                                        vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validelement' readonly='readonly' type='text' />";
                                    } else {
                                        vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' readonly='readonly' type='text' />";
                                    }
                                } else {
                                    if (item.Required == "true") {
                                        vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text() + "' class='validelement' readonly='readonly' type='text' />";
                                    } else {
                                        vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text() + "' readonly='readonly' type='text' />";
                                    }
                                }

                                vControls += '<label style="font-size:12px;">' + item.Description + '</label>';
                                //if (item.FieldHelp == "true") {
                                //    vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                                //}
                                vControls += "<br/>" + "<a href='javascript:void(0)' class='linkText' id='" + item.FieldDisplayName + "' title='" + item.FieldName + "' onclick='ViewGeneric(this)'> Browse</a>";
                                vControls += '</div></li>';
                            } else if (item.FieldType == "User") {
                                if (item.Required == "true") {
                                    vControls += "<select id=" + item.FieldName + " multiple='multiple' class='form-contro multiselect validuser' name=" + item.FieldName + " title='" + item.FieldDisplayName + "' data-placeholder='--Select--'>"
                                } else {
                                    vControls += "<select id=" + item.FieldName + " multiple='multiple' class='form-contro multiselect' name=" + item.FieldName + " title='" + item.FieldDisplayName + "' data-placeholder='--Select--'>"
                                }
                                //vControls += "<option value='0'>--Select--</option>";
                                if (vUserList == "")
                                { vUserList = GetUserList(); }
                                vControls += vUserList;
                                vControls += '</select>';
                                vUser = item.FieldName;
                                vControls += '<label style="font-size:12px;">' + item.Description + '</label>';
                                //if (item.FieldHelp == "true") {
                                //    vControls += '<span> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                                //}
                                vControls += '</div></li>';
                            }
                            else if (item.FieldType == "Currency" || item.FieldType == "Value / Financials") {
                                if ($(vMetadata).find(item.FieldName).text() == "") {
                                    if (item.Required == "true") {
                                        //vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validelement' />";
                                        vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validelement validcontractvalue' />";
                                    } else {
                                        //vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' />";
                                        vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validcontractvalue' />";
                                    }
                                } else {
                                    if (item.Required == "true") {
                                        //vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text() + "' class='validelement' />";
                                        vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text() + "' class='validelement validcontractvalue' />";
                                    } else {
                                        //vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text() + "' />";
                                        vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text() + "' class='validcontractvalue' />";
                                    }
                                }
                                vControls += '<label style="font-size:12px;">' + item.Description + '</label>';
                                //if (item.FieldHelp == "true") {
                                //    vControls += '<span> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                                //}
                                vControls += '</div></li>';
                                vCurrency = item.FieldName;
                            }

                            $("#counterpartyItems").append(vControls);
                            if (isYesOrNo) {
                                vControlsYesNo += "<li class='removableCounterpartyField'>";
                                if (item.CommentRequired == "true") {
                                    vControlsYesNo += '<p><b>Add a Comment</b><small>*</small></p>';
                                } else {
                                    vControlsYesNo += '<p><b>Add a Comment</b></p>';
                                }
                                vControlsYesNo += '<div>';
                                if (item.CommentRequired == "true") {
                                    vControlsYesNo += '<textarea name="CustomCMD' + item.FieldName + '" id="CustomCMD' + item.FieldName + '" maxlength="500" title="' + item.FieldName + '" cols="25" rows="3" class="form-contro validelement" value="' + $(vMetadata).find('CustomCMD' + item.FieldName).text() + '">' + $(vMetadata).find('CustomCMD' + item.FieldName).text() + '</textarea>';
                                } else {
                                    vControlsYesNo += '<textarea name="CustomCMD' + item.FieldName + '" id="CustomCMD' + item.FieldName + '" maxlength="500" title="' + item.FieldName + '" cols="25" rows="3" class="form-contro" value="' + $(vMetadata).find('CustomCMD' + item.FieldName).text() + '">' + $(vMetadata).find('CustomCMD' + item.FieldName).text() + '</textarea>';
                                }
                                vControlsYesNo += "</div></li>";
                                $("#counterpartyItems").append(vControlsYesNo);
                            }
                            isYesOrNo = false;
                            if (vDate != "") {
                                //$("#" + vDate + "").datepicker({
                                //    changeMonth: true,
                                //    changeYear: true
                                //});

                                if (localStorage.AppDateFormat == null || localStorage.AppDateFormat == "" || localStorage.AppDateFormat == 'undefined') {
                                    if (onlydate != "") {
                                        $("#" + vDate + "").datepicker({
                                            changeMonth: true,
                                            changeYear: true
                                        });
                                        $("#" + vDate + "").datepicker().datepicker('setDate', onlydate);

                                        //$("#" + vDate + "").datepicker("refresh");
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
                                            changeYear: true,
                                            dateFormat: dateformate
                                        });

                                        $("#" + vDate + "").datepicker().datepicker('setDate', onlydate);
                                        // $("#" + vDate + "").datepicker("refresh");
                                    }
                                    else {
                                        $("#" + vDate + "").datepicker({
                                            changeMonth: true,
                                            changeYear: true,
                                            dateFormat: dateformate
                                        });
                                    }

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

            //Sridhar
            $('.form-contro-Date').on("paste", function (e) {
                e.preventDefault();
            });
            $("#loadingPage").fadeOut();
        }, error: function (data) {
            $("#loadingPage").fadeOut();
        }
    });
}


function GetUserList() {
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
//function ViewGeneric(obj) {
//    vGlobalObjForGeneric = obj;
//    $("#loadingPage").fadeIn();
//    $("#tblGeneric").empty();
//    var art = '<tr><td><article style="width:100%; text-align:center;">';
//    art += '<input id="txtSearchBoxGeneric" class="f_inpt cl width80" type="text" style="text-wrap:none" placeholder="Type to Search" />';
//    art += '<img title="Search" style="cursor: pointer; position: relative; left: -40px; top:-2px;" onclick="javascript: SearchGeneric();" src="../Content/Images/search_over.png" />';
//    art += "<a href='javascript:void(0)' class='linkPickerClear' onclick='ClearGeneric();'>Clear</a>";
//    art += '</article></td></tr>';
//    $("#tblGeneric").append(art);
//    $.ajax({
//        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterpartyfieldbydisplayname?fielddisplayname=' + obj.id,
//        type: 'GET',
//        dataType: 'json',
//        'Content-Type': 'application/json',
//        cache: false,
//        headers: { 'eContracts-ApiKey': localStorage.APIKey },
//        success: function (data) {
//            var prevSelected = $("#" + obj.title).val();
//            var arrprev = [];
//            $.each(prevSelected.split(";"), function () {
//                arrprev.push($.trim(this));
//            });

//            var datalength = data.length;
//            var genItems = [];
//            var article = "";
//            $(data).each(function (i, item) {
//                if (getParameterByName("CounterpartyID").trim().indexOf(item.RowKey) > -1) {
//                }
//                else {
//                    if (arrprev.indexOf(item.CounterpartyName.trim()) >= 0) {

//                    } else {
//                        var article = '<tr><td>';
//                        article += '<input id="' + item.RowKey + '" type="checkbox" name="Generic" class="css1-checkbox" value="' + escape(item.CounterpartyName) + '" />';
//                        article += '<label for="' + item.RowKey + '" class="css1-label">' + item.CounterpartyName + '</label>';
//                        article += '</td>';
//                        article += '<td class="ddl"><td></tr>'
//                        $("#tblGeneric").append(article);
//                        genItems.push(item.CounterpartyName);
//                        article = '';
//                    }

//                    $("#rel" + item.RowKey).click(function () {
//                        if (this.checked) {
//                            var vOptions = "<select class='f_inpt width90'>";
//                            var jsLang = $("#ddlRelationshipTypeParentedit option:selected").val();
//                            switch (jsLang) {
//                                case 'Parent':
//                                    vOptions += '<option value="Subsidiary">Subsidiary</option>';
//                                    break;
//                                case 'Subsidiary':
//                                    vOptions += '<option value="Parent">Parent</option>';
//                                    break;
//                                case 'Supplier':
//                                    vOptions += '<option value="Customer">Customer</option>';
//                                    break;
//                                case 'Customer':
//                                    vOptions += '<option value="Supplier">Supplier</option>';
//                                    break;
//                                case 'Prime Contractor':
//                                    vOptions += '<option value="Sub Contractor">Sub Contractor</option>';
//                                    break;
//                                case 'Sub Contractor':
//                                    vOptions += '<option value="Prime Contractor">Prime Contractor</option>';
//                                    break;
//                                case 'Dissolved on Merger':
//                                    vOptions += '<option value="Merged into">Merged into</option>';
//                                    break;
//                                case 'Merged into':
//                                    vOptions += '<option value="Dissolved on Merger">Dissolved on Merger</option>';
//                                    break;
//                                case 'Other':
//                                    vOptions += '<option value="Other">Other</option>';
//                                    break;
//                            }

//                            vOptions += '</select>';
//                            $(this).parent().parent().children(".ddl").append(vOptions);

//                        } else {
//                            $(this).parent().parent().children(".ddl").empty();
//                        }

//                    });
//                }
//            });
//            $("#tblGeneric").html(article);
//            article = '';


//            //for (var i = 0; i < datalength; i = i + 1) {
//            //    var item = data[i];
//            //    if (i == 0) {
//            //        article += '<tr><th><input id="selectall" onclick="funselectall(this);" type="checkbox"/> Select/Deselect All</th></tr>';
//            //    }

//            //    article += '<tr><td>';
//            //    if (arrprev.indexOf(item.CounterpartyName) > -1) {
//            //        article += '<input id="' + item.RowKey + '" type="checkbox" name="Generic" checked class="css1-checkbox" value="' + item.CounterpartyName + '" />';
//            //    } else {
//            //        article += '<input id="' + item.RowKey + '" type="checkbox" name="Generic" class="css1-checkbox" value="' + item.CounterpartyName + '" />';
//            //    }
//            //    article += '<label for="' + item.RowKey + '" class="css1-label">' + item.CounterpartyName + '</label>';
//            //    article += '</td></tr>';
//            //    genItems.push(item.CounterpartyName);
//            //}
//            //$("#tblGeneric").html(article);
//            //article = '';

//            var vCount = $("#tblGeneric tr").length;
//            $('#compact-paginationGeneric').pagination({
//                items: vCount,
//                itemsOnPage: 11,
//                typeID: 'tblGeneric',
//                cssStyle: 'compact-theme'
//            });
//            $("#txtSearchBoxGeneric").autocomplete({
//                source: genItems,
//                minLength: 1,
//                focus: function (event, ui) {
//                    return false;
//                },
//                select: function (evn, uidetails) {
//                    $("#txtSearchBoxGeneric").val(uidetails.item.label);
//                    ViewCounterparties();
//                }
//            });

//            $("#browseGeneric").data('param_1', obj.title).dialog("option", "title", obj.id + " Picker");
//            $("#browseGeneric").dialog("open");
//            $("#loadingPage").fadeOut();
//            //var prevSelected = $("#" + obj.title).val();
//            //var arrprev = [];
//            //$.each(prevSelected.split(";"), function () {
//            //    arrprev.push($.trim(this));
//            //});

//            //var myArray = [];
//            //myArray = data[0].ChoiceValues.split("\n")
//            //var myArraylength = myArray.length;
//            //var genItems = [];
//            //var article = "";
//            //for (var i = 0; i < myArraylength; i = i + 1) {
//            //    if (i == 0) {
//            //        article += '<tr><th><input id="selectall" onclick="funselectall(this);" type="checkbox"/> Select/Deselect All</th></tr>';
//            //    }

//            //    article += '<tr><td>';
//            //    if (arrprev.indexOf(myArray[i]) > -1) {
//            //        article += '<input id="' + myArray[i] + '" type="checkbox" name="Generic" checked class="css1-checkbox" value="' + myArray[i] + '" />';
//            //    } else {
//            //        article += '<input id="' + myArray[i] + '" type="checkbox" name="Generic" class="css1-checkbox" value="' + myArray[i] + '" />';
//            //    }
//            //    article += '<label for="' + myArray[i] + '" class="css1-label">' + myArray[i] + '</label>';
//            //    article += '</td></tr>';
//            //    genItems.push(myArray[i]);
//            //}
//            //$("#tblGeneric").html(article);
//            //article = '';

//            //var vCount = $("#tblGeneric tr").length;
//            //$('#compact-paginationGeneric').pagination({
//            //    items: vCount,
//            //    itemsOnPage: 11,
//            //    typeID: 'tblGeneric',
//            //    cssStyle: 'compact-theme'
//            //});
//            //$("#txtSearchBoxGeneric").autocomplete({
//            //    source: genItems,
//            //    minLength: 1,
//            //    focus: function (event, ui) {
//            //        return false;
//            //    }
//            //});

//            //$("#loadingPage").fadeOut();
//            //$("#browseGeneric").data('param_1', obj.title).dialog("option", "title", obj.id + " Picker");
//            //$("#browseGeneric").dialog("open");
//        },
//        error:
//            function (data) {
//                $("#tblGeneric").html('No item found.');
//                $("#browseGeneric").data('param_1', obj.title).dialog("option", "title", obj.id + " Picker");
//                $("#browseGeneric").dialog("open");
//                $("#loadingPage").fadeOut();
//            }
//    });


//    $('#txtSearchBoxGeneric').keypress(function (e) {
//        if ($('#txtSearchBoxGeneric').val() != "") {
//            if (e.keyCode == 13) {
//                $(".ui-autocomplete").css('display', 'none');
//                SearchGeneric();
//            }
//        }
//    });
//}

//function ClearGeneric() {
//    $('#loadGen').html('<img src="../Content/Images/icon/loading.gif">');
//    $("#tblGeneric").find("tr:gt(0)").remove();
//    $("#txtSearchBoxGeneric").val("")
//    var searchKeyword = "";
//    filtergeneric(searchKeyword);
//}

//function SearchGeneric() {
//    $('#loadGen').html('<img src="../Content/Images/icon/loading.gif">Searching...');
//    $("#tblGeneric").find("tr:gt(0)").remove();
//    var searchKeyword = $("#txtSearchBoxGeneric").val();
//    filtergeneric(searchKeyword);
//}

//function filtergeneric(searchKeyword) {
//    $.ajax({
//        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterpartyfieldbydisplayname?fielddisplayname=' + vGlobalObjForGeneric.id,
//        type: 'GET',
//        dataType: 'json',
//        'Content-Type': 'application/json',
//        cache: false,
//        headers: { 'eContracts-ApiKey': localStorage.APIKey },
//        success: function (data) {
//            var prevSelected = $("#" + vGlobalObjForGeneric.title).val();
//            var arrprev = [];
//            $.each(prevSelected.split(";"), function () {
//                arrprev.push($.trim(this));
//            });

//            var myArray = [];
//            myArray = data[0].ChoiceValues.split("\n")
//            var myArraylength = myArray.length;
//            var genItems = [];
//            var article = "";
//            for (var i = 0; i < myArraylength; i = i + 1) {
//                if (myArray[i].indexOf(searchKeyword) > -1 || searchKeyword == "") {
//                    if (i == 0) {
//                        article += '<tr><th><input id="selectall" onclick="funselectall(this);" type="checkbox"/> Select/Deselect All</th></tr>';
//                    }
//                    article += '<tr><td>';
//                    if (arrprev.indexOf(myArray[i]) >= 0) {
//                        article += '<input id="' + myArray[i] + '" type="checkbox" name="Generic" checked class="css1-checkbox" value="' + myArray[i] + '" />';
//                    } else {
//                        article += '<input id="' + myArray[i] + '" type="checkbox" name="Generic" class="css1-checkbox" value="' + myArray[i] + '" />';
//                    }
//                    article += '<label for="' + myArray[i] + '" class="css1-label">' + myArray[i] + '</label>';
//                    article += '</td></tr>';
//                    genItems.push(myArray[i]);
//                }
//            }
//            $("#tblGeneric").html(article);

//            var vCount = $("#tblGeneric tr").length;
//            $('#compact-paginationGeneric').pagination({
//                items: vCount,
//                itemsOnPage: 11,
//                typeID: 'tblGeneric',
//                cssStyle: 'compact-theme'
//            });
//            $("#txtSearchBoxGeneric").autocomplete({
//                source: genItems,
//                minLength: 1,
//                focus: function (event, ui) {
//                    return false;
//                },
//                select: function (evn, uidetails) {
//                    $("#txtSearchBoxGeneric").val(uidetails.item.label);
//                    ViewCounterparties();
//                }
//            });
//            $('#loadGen').empty();
//        },
//        error:
//            function (data) {

//            }
//    });
//}

//function funselectall(obj) {
//    if (obj.checked) {
//        $('input:checkbox[name=Generic]').attr('checked', true);
//    } else {
//        $('input:checkbox[name=Generic]').attr('checked', false);
//    }
//}


//manoj
//For general field popup
function ViewGeneric(obj) {
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
            art += '<input id="txtSearchBoxGeneric" class="f_inpt cl width80" type="text"  style="text-wrap:none" placeholder="Type to Search" />';
            art += '<img title="Search" style="cursor: pointer; position: relative; left: -40px; top:-2px;" onclick="javascript: SearchGeneric();" src="../Content/Images/search_over.png" />';
            art += "<a href='javascript:void(0)' class='linkPickerClear' onclick='ClearGeneric();'>Clear</a>";
            art += '</article></td></tr>';
            $("#tblGenericheader").html(art);
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
                minLength: 2,
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

function ClearGeneric() {
    $('#loadGen').html('<img src="../Content/Images/icon/loading.gif">');
    $("#tblGeneric").html("");
    $("#txtSearchBoxGeneric").val("")
    var searchKeyword = "";
    filtergeneric(searchKeyword);
}

function SearchGeneric() {
    $('#loadGen').html('<img src="../Content/Images/icon/loading.gif">Searching...');
    $("#tblGeneric").html("");
    var searchKeyword = $("#txtSearchBoxGeneric").val();
    filtergeneric(searchKeyword);
}

function filtergeneric(searchKeyword) {

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
                        obj1[arraysplitRU[i]] = true;
                    }
                }
            }
            var resultfound = true;
            var myArraylength = myArrayRU.length;
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
                source: arraysplitRU,
                minLength: 2,
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

function funselectall(obj) {
    if (obj.checked) {
        $('input:checkbox[name=Generic]').prop('checked', true);
        checkMultipleDocuments("");

    } else {
        $('input:checkbox[name=Generic]').prop('checked', false);
        checkMultipleDocuments("");
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
                if (arrprevRU.indexOf(myArrayRU[i]) >= 0 && multipleChecksDocumentID.indexOf(myArrayRU[i]) > -1) {
                    article += '<input id="' + myArrayRU[i] + '" type="checkbox" name="Generic" onclick="checkMultipleDocuments(this);" checked class="css1-checkbox" value="' + myArrayRU[i] + '" />';
                }
                else if (multipleChecksDocumentID.indexOf(myArrayRU[i]) > -1) {
                    article += '<input id="' + myArrayRU[i] + '" type="checkbox" name="Generic" onclick="checkMultipleDocuments(this);" checked class="css1-checkbox" value="' + myArrayRU[i] + '" />';
                }
                else {
                    article += '<input id="' + myArrayRU[i] + '" type="checkbox" name="Generic" onclick="checkMultipleDocuments(this);"  class="css1-checkbox" value="' + myArrayRU[i] + '" />';
                    checkboxchecking = false;
                }
            }
            else if (arrprevRU.indexOf(myArrayRU[i]) >= 0 && multipleChecksDocumentID.length == 0) {
                article += '<input id="' + myArrayRU[i] + '" type="checkbox" name="Generic" onclick="checkMultipleDocuments(this);" checked class="css1-checkbox" value="' + myArrayRU[i] + '" />';
            }
            else if (multipleChecksDocumentID.indexOf(myArrayRU[i]) > -1) {
                article += '<input id="' + myArrayRU[i] + '" type="checkbox" name="Generic" onclick="checkMultipleDocuments(this);" checked class="css1-checkbox" value="' + myArrayRU[i] + '" />';
            }
            else {
                article += '<input id="' + myArrayRU[i] + '" type="checkbox" name="Generic" onclick="checkMultipleDocuments(this);"  class="css1-checkbox" value="' + myArrayRU[i] + '" />';
                checkboxchecking = false;
            }
            article += '<label for="' + myArrayRU[i] + '" class="css1-label">' + myArrayRU[i] + '</label>';
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
                    $('#liSelectedRU').append('<span style="font-size:13px;">' + multipleChecksDocumentID[spl] + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveSelectedRU(this);" style="float:right" /></span>');
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

function checkMultipleDocuments(object) {
    $('#liSelectedRU').empty();
    var checkboxcheck = true;
    $('input[type=checkbox][name="Generic"]').each(function () {
        var DocumentID = this.id;
        var duplicatechecking = false;
        var isChecked = this.checked;
        if (isChecked) {
            if ((multipleChecksDocumentID.indexOf(DocumentID)) == -1) {
                multipleChecksDocumentID.push(DocumentID.trim());
            }
        }
        else {
            if (multipleChecksDocumentID.indexOf(DocumentID) != -1) {
                var ind = multipleChecksDocumentID.indexOf(DocumentID);
                multipleChecksDocumentID.splice(ind, 1);
            }
            checkboxcheck = false;
        }
    });
    for (var spl = 0; spl < multipleChecksDocumentID.length; spl++) {
        if (multipleChecksDocumentID[spl].trim() != "") {
            $('#liSelectedRU').append('<span style="font-size:13px;">' + multipleChecksDocumentID[spl] + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveSelectedRU(this);" style="float:right" /></span>');
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
//For general field popup
//manoj

//manoj
function ViewCounterpartyRelated(obj) {
    //manoj
    //if (addRelatedButton) {
    //    $("#lblCounterpartyGlobal").text(
    //}
    //if ($('input[type="radio"][name=IsGlobal]:checked').val() == "No") {

    //}
    //manoj
    if ($('#ddlRelationshipTypeCounterparties').hasClass('error')) {
        $('#ddlRelationshipTypeCounterparties').removeClass('error')
    }
    if ($('#ddlRelationshipTypeParentcounterparties').hasClass('error')) {
        $('#ddlRelationshipTypeParentcounterparties').removeClass('error')
    }

    vGlobalObjForGeneric = obj;
    var allowtoprocess = true;
    if (typeof (obj) != "undefined" && obj != null) {
        $("#lblRelatedPopup_Counterparties").text("Select Relationship for " + $("#txtCounterpartyName").val())
    } else {
        $("#lblRelatedPopup_Counterparties").text("Select Relationship for " + $("#lblCounterpartyName").text())
    }
    //$("#lblRelatedPopup_Counterparties").text("Select Relationship for " + $("#txtCounterpartyName").val())
    $("#loadingPage").fadeIn();
    $('#loadCounterparties').html('<img src="../Content/Images/icon/loading.gif"> Working on it...');
    $('#tblPopupCounterparties').empty();
    $("#txtSearchBoxCounterparties").val("");
    if ($('#tblPopupCounterparties tr').length <= 0) {
        relatedCounterpartiesTag = [];
        $("#txtSearchBoxCounterparties").val("");
        var strBusinessAreaOwnerof = "";
        //manoj
        if (addRelatedButton) {
            if ($("#lblCounterpartyGlobal").text() != "Yes") {
                strBusinessAreaOwnerof = $("#hdnBusinessAreasPath").val();
            } else {
                strBusinessAreaOwnerof = "";
            }
        } else {
            if ($('input[type="radio"][name=IsGlobal]:checked').val() == "No") {
                if ($("#txtOwnerofBusinessArea").val() != $("#hdnOwnerofBusinessArea").val()) {
                    if ($("#txtOwnerofBusinessArea").val() != "") {
                        for (var i = 0; i < selectedBusinessAreaID11.length; i++) {

                            var rowKPath = jQuery.grep(BusinessAreaPathRowKey, function (a) {
                                return a[1] === selectedBusinessAreaID11[i][1];
                            });
                            if (rowKPath != null && typeof (rowKPath) != "undefined" && rowKPath.length != 0)
                                strBusinessAreaOwnerof += rowKPath[0][0] + ";";
                        }

                        strBusinessAreaOwnerof = strBusinessAreaOwnerof.slice(0, -1)
                    } else {
                        allowtoprocess = false;
                    }
                } else {
                    strBusinessAreaOwnerof = $("#hdnLocOwnerofBusinessArea").val()
                }
            }
            else {
                $("#txtOwnerofBusinessArea").val('');
                strBusinessAreaOwnerof = "";
            }
        }
        if (allowtoprocess) {
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/relatedcounterpartypicker',
                type: 'GET',
                dataType: 'json',
                "Content-Type": "application/json",
                headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, 'BusinessAreaLocation': strBusinessAreaOwnerof },
                cache: false,
                success: function (data) {
                    $('#loadCounterparties').empty();
                    var SavedCounterParty = [];
                    $(arrSavedCounterparties).each(function (iCounterparty, itemCounterparty) {
                        SavedCounterParty.push($.trim(itemCounterparty.RelatedCounterpartyID));
                    });
                    if (SavedCounterParty.length > 0) {
                        data = $.grep(data, function (ndatacollction, idatacollction) {
                            return (SavedCounterParty.indexOf(ndatacollction.RowKey) == -1);
                        });
                    }
                    curRelatedCounterparities = PrvRelatedCounterparities.slice();
                    var arr = [];
                    var prevSelected = "";
                    if (typeof (obj) != "undefined" && obj != null) {
                        prevSelected = $("#RelatedCounterparties").val();
                    } else {
                        prevSelected = relatedcounterpartyname;
                    }
                    $.each(prevSelected.split(";"), function () {
                        arr.push($.trim(this));
                    });
                    var vCounterpartyList = '';
                    $(data).each(function (i, item) {
                        if (vCounterpartyID.indexOf(item.RowKey) > -1) {
                        }
                        else {
                            if (arr.length > 0) {
                                if (arrRelatedCounterparities.length > 0) {
                                    if (arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RootRelationshipType != "") {
                                        $("#ddlRelationshipTypeCounterparties option:selected").text(arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RootRelationshipType);
                                    }
                                    if (arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RelationshipType != "") {
                                        $("#ddlRelationshipTypeParentcounterparties").val(arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RelationshipType);
                                    }
                                }
                            }

                            if (arr.indexOf(item.CounterpartyName.trim()) >= 0) {
                                var article = '<tr><td>';
                                article += '<input id="' + item.RowKey + '" type="checkbox" name="RelatedCounterparty" checked class="css1-checkbox" value="' + item.CounterpartyName + '" onchange="javascript:currentrelatedcounterparty(this);" />';
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
                                article += '<input id="' + item.RowKey + '" type="checkbox" name="RelatedCounterparty" class="css1-checkbox" value="' + item.CounterpartyName + '" onchange="javascript:currentrelatedcounterparty(this);" />';
                                article += '<label for="' + item.RowKey + '" class="css1-label">' + item.CounterpartyName + '</label>';
                                article += '</td>';
                                article += '<td class="ddl"><td></tr>'
                                //$("#tblPopupCounterparties").append(article);
                                vCounterpartyList += article;
                                relatedCounterpartiesTag.push(item.CounterpartyName);
                            }

                            //$("input[id='" + item.RowKey + "'][name='RelatedCounterparty']:checkbox").click(function () {
                            //    var oID = '';
                            //    if (this.checked) {
                            //        oID = this.id;
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
                            //        if (curRelatedCounterparities.length > 0) {
                            //            var curRelCuntprty = $.grep(curRelatedCounterparities, function (n, i) {
                            //                return (n.RowKey == oID);
                            //            });
                            //            var index = curRelatedCounterparities.indexOf(curRelCuntprty[0]);
                            //            if (index >= 0) {
                            //                curRelatedCounterparities[index].ChildRelationship = $(this).parent().parent().children(".ddl").find('option:selected').text();
                            //                addselectedcounterparties();
                            //            }
                            //        }
                            //    } else {
                            //        $(this).parent().parent().children(".ddl").empty();
                            //    }
                            //});
                        }
                    });

                    $("#tblPopupCounterparties").append(vCounterpartyList);
                    $("input[name='RelatedCounterparty']:checkbox").click(function () {
                        var oID = '';
                        if (this.checked) {
                            oID = this.id;
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
                            if (curRelatedCounterparities.length > 0) {
                                var curRelCuntprty = $.grep(curRelatedCounterparities, function (n, i) {
                                    return (n.RowKey == oID);
                                });
                                var index = curRelatedCounterparities.indexOf(curRelCuntprty[0]);
                                if (index >= 0) {
                                    curRelatedCounterparities[index].ChildRelationship = $(this).parent().parent().children(".ddl").find('option:selected').text();
                                    addselectedcounterparties();
                                }
                            }
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

                    $("#txtSearchBoxCounterparties").autocomplete({
                        source: relatedCounterpartiesTag,
                        minLength: 2,
                        focus: function (event, ui) {
                            return false;
                        },
                        select: function (evn, uidetails) {
                            $("#txtSearchBoxCounterparties").val(uidetails.item.label);
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
                    addselectedcounterparties();
                    $("#tblPopupCounterparties").html('');
                    $('#loadCounterparty').html('<p style="margin-left: 20px;">No items found.</p>');
                    $("#popupCounterparties").dialog("option", "title", "Related Counterparties");
                    $("#popupCounterparties").dialog("open");
                    $("#loadingPage").fadeOut();
                }
            });
        } else {
            swal("", "Select business area.");
            $("#loadingPage").fadeOut();
        }
    } else {
        $('#loadMA').empty();
        addselectedcounterparties();
        $("#popupCounterparties").dialog("option", "title", "Related Contract Records");
        $("#popupCounterparties").dialog("open");
        $("#loadingPage").fadeOut();
    }
}


$('#txtSearchBoxCounterparties').keypress(function (e) {
    if ($('#txtSearchBoxGeneric').val() != "") {
        if (e.keyCode == 13) {
            $(".ui-autocomplete").css('display', 'none');
            ViewCounterparties();
        }
    }
});

function RelatedCounterpartiesPush() {
    if (requiredValidator('popupCounterparties', false)) {
        var vRelatedCounterpartyID = "";
        var vRelatedCounterpartyTitle = "";
        var vChildRelation = "";
        var resultvaluetobind = [];
        $(arrSavedCounterparties).each(function (inSavedCP, itemnSavedCP) {
            resultvaluetobind.push($.trim(itemnSavedCP.RelatedCounterpartyTitle));
        });
        $(curRelatedCounterparities).each(function (i, item) {
            if (item != null) {
                vRelatedCounterpartyID += ";" + item.RowKey;
                vRelatedCounterpartyTitle += ";" + item.CounterpartyName;
                vChildRelation += ";" + item.ChildRelationship;
                resultvaluetobind.push($.trim(item.CounterpartyName));
            }
        });
        vRelatedCounterpartyID = (vRelatedCounterpartyID.charAt(0) === ';') ? vRelatedCounterpartyID.substr(1) : vRelatedCounterpartyID;
        vRelatedCounterpartyTitle = (vRelatedCounterpartyTitle.charAt(0) === ';') ? vRelatedCounterpartyTitle.substr(1) : vRelatedCounterpartyTitle;
        vChildRelation = (vChildRelation.charAt(0) === ';') ? vChildRelation.substr(1) : vChildRelation;
        if (vRelatedCounterpartyID != "") {
            arrRelatedCounterparities = [];
            arrRelatedCounterparities.push({
                CounterpartyID: vCounterpartyID,
                CounterpartyTitle: (addRelatedButton) ? $("#lblCounterpartyName").text() : $("#txtCounterpartyName").val(),
                RelatedCounterpartyID: vRelatedCounterpartyID,
                RelatedCounterpartyTitle: vRelatedCounterpartyTitle,
                RelationshipType: $("#ddlRelationshipTypeParentcounterparties").find('option:selected').text(),
                RelatedRelationshipType: vChildRelation,
                RootRelationshipType: $("#ddlRelationshipTypeCounterparties").find('option:selected').text(),
                CreatedBy: localStorage.UserName,
                ModifiedBy: localStorage.UserName,
            });
            //manoj
            if (addRelatedButton) {
                CreateRelatedCounterparies(vCounterpartyID, $("#lblCounterpartyName").text())
            } else {
                //manoj
                PrvRelatedCounterparities = curRelatedCounterparities.slice();
                $("#popupCounterparties").dialog("close");
                $('#RelatedCounterparties').val(resultvaluetobind.join(";"));
            }
            return true;
        } else {
            PrvRelatedCounterparities = [];
            arrRelatedCounterparities = [];
            curRelatedCounterparities = [];
            $('#RelatedCounterparties').val(resultvaluetobind.join(";"));
            swal("", "No Counterparty has been selected.");
            $("#popupCounterparties").dialog("close");
            return false;
        }
    }
}
//manoj

//function ViewCounterpartyRelated(obj) {
//    var baname = "";
//    //if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
//    //    baname = localStorage.GlobalBusinessAreaLocation;
//    //}
//    vGlobalObjForGeneric = obj;
//    $("#loadingPage").fadeIn();
//    relatedCounterpartiesTag = [];
//    $("#txtSearchBoxCounterparties").val("");
//    //manoj
//    var strBusinessAreaOwnerof = "";
//    if ($('input[type="radio"][name=IsGlobal]:checked').val() == "No") {
//        if ($("#txtOwnerofBusinessArea").val() != $("#hdnOwnerofBusinessArea").val()) {
//            if ($("#txtOwnerofBusinessArea").val() != "") {
//                for (var i = 0; i < selectedBusinessAreaID11.length; i++) {

//                    var rowKPath = jQuery.grep(BusinessAreaPathRowKey, function (a) {
//                        return a[1] === selectedBusinessAreaID11[i][1];
//                    });
//                    if (rowKPath != null && typeof (rowKPath) != "undefined" && rowKPath.length != 0)
//                        strBusinessAreaOwnerof += rowKPath[0][0] + ";";
//                }

//                strBusinessAreaOwnerof = strBusinessAreaOwnerof.slice(0, -1)
//            }
//        } else {

//            strBusinessAreaOwnerof = $("#hdnLocOwnerofBusinessArea").val()
//        }
//    }
//    else {
//        $("#txtOwnerofBusinessArea").val('');
//        strBusinessAreaOwnerof = "";
//    }
//    //manoj
//    $.ajax({
//        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/relatedcounterpartypicker',
//        type: 'GET',
//        dataType: 'json',
//        'Content-Type': 'application/json',
//        cache: false,
//        headers: { 'eContracts-ApiKey': localStorage.APIKey, BusinessAreaLocation: strBusinessAreaOwnerof },
//        success: function (data) {
//            $("#tblGeneric").empty();
//            var prevSelected = $("#" + obj.title).val();
//            var arrprev = [];
//            $.each(prevSelected.split(";"), function () {
//                arrprev.push($.trim(this));
//            });

//            var datalength = data.length;
//            var genItems = [];
//            var article = "";
//            $(data).each(function (i, item) {
//                if (getParameterByName("CounterpartyID").trim().indexOf(item.RowKey) > -1) {
//                }
//                else {
//                    if (arrprev.indexOf(item.CounterpartyName.trim()) >= 0) {

//                    } else {
//                        var article = '<tr><td>';
//                        article += '<input id="' + item.RowKey + '" type="checkbox" name="Generic" class="css1-checkbox" value="' + escape(item.CounterpartyName) + '" />';
//                        article += '<label for="' + item.RowKey + '" class="css1-label">' + item.CounterpartyName + '</label>';
//                        article += '</td>';
//                        article += '<td class="ddl"><td></tr>'
//                        $("#tblGeneric").append(article);
//                        genItems.push(item.CounterpartyName);
//                        article = '';
//                    }
//                    $("#lblRelatedPopup_Counterpartiesedit").text("Select Relationship for " + $("#lblCounterpartyName").text());
//                    $("#" + item.RowKey).click(function () {
//                        if (this.checked) {
//                            var vOptions = "<select class='f_inpt width90'>";
//                            var jsLang = $("#ddlRelationshipTypeParentedit option:selected").val();
//                            switch (jsLang) {
//                                case 'Parent':
//                                    vOptions += '<option value="Subsidiary">Subsidiary</option>';
//                                    break;
//                                case 'Subsidiary':
//                                    vOptions += '<option value="Parent">Parent</option>';
//                                    break;
//                                case 'Supplier':
//                                    vOptions += '<option value="Customer">Customer</option>';
//                                    break;
//                                case 'Customer':
//                                    vOptions += '<option value="Supplier">Supplier</option>';
//                                    break;
//                                case 'Prime Contractor':
//                                    vOptions += '<option value="Sub Contractor">Sub Contractor</option>';
//                                    break;
//                                case 'Sub Contractor':
//                                    vOptions += '<option value="Prime Contractor">Prime Contractor</option>';
//                                    break;
//                                case 'Dissolved on Merger':
//                                    vOptions += '<option value="Merged into">Merged into</option>';
//                                    break;
//                                case 'Merged into':
//                                    vOptions += '<option value="Dissolved on Merger">Dissolved on Merger</option>';
//                                    break;
//                                case 'Other':
//                                    vOptions += '<option value="Other">Other</option>';
//                                    break;
//                            }

//                            vOptions += '</select>';
//                            $(this).parent().parent().children(".ddl").append(vOptions);

//                        } else {
//                            $(this).parent().parent().children(".ddl").empty();
//                        }

//                    });
//                }
//            });

//            $("#tblGeneric").html(article);
//            article = '';

//            //for (var i = 0; i < datalength; i = i + 1) {
//            //    var item = data[i];
//            //    if (i == 0) {
//            //        article += '<tr><th><input id="selectall" onclick="funselectall(this);" type="checkbox"/> Select/Deselect All</th></tr>';
//            //    }

//            //    article += '<tr><td>';
//            //    if (arrprev.indexOf(item.CounterpartyName) > -1) {
//            //        article += '<input id="' + item.RowKey + '" type="checkbox" name="Generic" checked class="css1-checkbox" value="' + item.CounterpartyName + '" />';
//            //    } else {
//            //        article += '<input id="' + item.RowKey + '" type="checkbox" name="Generic" class="css1-checkbox" value="' + item.CounterpartyName + '" />';
//            //    }
//            //    article += '<label for="' + item.RowKey + '" class="css1-label">' + item.CounterpartyName + '</label>';
//            //    article += '</td></tr>';
//            //    genItems.push(item.CounterpartyName);
//            //}
//            //$("#tblGeneric").html(article);
//            //article = '';

//            var vCount = $("#tblGeneric tr").length;
//            $('#compact-paginationGeneric').pagination({
//                items: vCount,
//                itemsOnPage: 11,
//                typeID: 'tblGeneric',
//                cssStyle: 'compact-theme'
//            });
//            $("#txtSearchBoxGeneric").autocomplete({
//                source: genItems,
//                minLength: 1,
//                focus: function (event, ui) {
//                    return false;
//                },
//                select: function (evn, uidetails) {
//                    $("#txtSearchBoxGeneric").val(uidetails.item.label);
//                    ViewCounterparties();
//                }
//            });

//            $("#browseGeneric").data('param_1', obj.title).dialog("option", "title", obj.id + " Picker");
//            $("#browseGeneric").dialog("open");
//            $("#loadingPage").fadeOut();
//        },
//        error:
//            function (data) {
//                $("#tblGeneric").html('No item found.');
//                $("#browseGeneric").data('param_1', obj.title).dialog("option", "title", obj.id + " Picker");
//                $("#browseGeneric").dialog("open");
//                $("#loadingPage").fadeOut();
//            }
//    });


//    $('#txtSearchBoxGeneric').keypress(function (e) {
//        if ($('#txtSearchBoxGeneric').val() != "") {
//            if (e.keyCode == 13) {
//                $(".ui-autocomplete").css('display', 'none');
//                SearchGenericRelated();
//            }
//        }
//    });
//}

function ClearGenericRelated() {
    $('#loadGen').html('<img src="../Content/Images/icon/loading.gif">');
    $("#tblGeneric").find("tr:gt(0)").remove();
    $("#txtSearchBoxGeneric").val("")
    var searchKeyword = "";
    filtergenericRelated(searchKeyword);
}

function SearchGenericRelated() {
    $('#loadGen').html('<img src="../Content/Images/icon/loading.gif">Searching...');
    $("#tblGeneric").find("tr:gt(0)").remove();
    var searchKeyword = $("#txtSearchBoxGeneric").val();
    filtergenericRelated(searchKeyword);
}

function filtergenericRelated(searchKeyword) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            var prevSelected = $("#" + vGlobalObjForGeneric.title).val();
            var arrprev = [];
            $.each(prevSelected.split(";"), function () {
                arrprev.push($.trim(this));
            });

            var datalength = data.length;
            var genItems = [];
            var article = "";
            for (var i = 0; i < datalength; i = i + 1) {
                var item = data[i];
                if (item.CounterpartyName.indexOf(searchKeyword) > -1 || searchKeyword == "") {
                    if (i == 0) {
                        article += '<tr><th><input id="selectall" onclick="funselectall(this);" type="checkbox"/> Select/Deselect All</th></tr>';
                    }
                    article += '<tr><td>';
                    if (arrprev.indexOf(item.CounterpartyName) >= 0) {
                        article += '<input id="' + item.RowKey + '" type="checkbox" name="Generic" checked class="css1-checkbox" value="' + escape(item.CounterpartyName) + '" />';
                    } else {
                        article += '<input id="' + item.RowKey + '" type="checkbox" name="Generic" class="css1-checkbox" value="' + escape(item.CounterpartyName) + '" />';
                    }
                    article += '<label for="' + item.RowKey + '" class="css1-label">' + item.CounterpartyName + '</label>';
                    article += '</td></tr>';
                    genItems.push(item.CounterpartyName);
                }
            }
            $("#tblGeneric").html(article);
            article = '';
            var vCount = $("#tblGeneric tr").length;
            $('#compact-paginationGeneric').pagination({
                items: vCount,
                itemsOnPage: 11,
                typeID: 'tblGeneric',
                cssStyle: 'compact-theme'
            });
            $("#txtSearchBoxGeneric").autocomplete({
                source: genItems,
                minLength: 1,
                focus: function (event, ui) {
                    return false;
                },
                select: function (evn, uidetails) {
                    $("#txtSearchBoxGeneric").val(uidetails.item.label);
                    ViewCounterparties();
                }
            });
            $('#loadGen').empty();
        },
        error:
            function (data) {

            }
    });
}



var arrofFinancials = [];
function BindCounterpartyDetail() {
    var counterpartyID = getParameterByName('CounterpartyID');
    var vMetadataa = "";
    var allowRequired = false;
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/icounterpartydetails?counterpartyid=' + counterpartyID,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (mainmetadataFields) {
            vMetadataa = $(mainmetadataFields).find('Metadata');
            $("#txtCounterpartyName").val($(vMetadataa).find('CounterpartyName').text());
            $("#ddlCounterpartyType option").filter(function (index) { return $(this).text() === $(vMetadataa).find('CounterpartyType').text(); }).prop('selected', true);
            $("#ddlStatus option").filter(function (index) { return $(this).text() === $(vMetadataa).find('ddlStatus').text(); }).prop('selected', true);
            $("#hdnCounterpartyID").text(counterpartyID);
            $("#hdnCounterpartyName").text($(vMetadataa).find('CounterpartyName').text());
            $("#lblCounterpartyName").text($(vMetadataa).find('CounterpartyName').text());
            $("#spnCounterpartyName").text($(vMetadataa).find('CounterpartyName').text());
            $("#lblCounterpartyGlobal").text($(vMetadataa).find('IsGlobal').text());
            //manoj
            $("#hdnBusinessAreasPath").val($(vMetadataa).find('BusinessAreasPath').text());
            //manoj
            //$("#lblCounterpartyStatus").text($(vMetadataa).find('Status').text());
            $("#lblCounterpartyType").text($(vMetadataa).find('CounterpartyType').text());
            $("#lblCounterpartyGlobal").text(($(vMetadataa).find('IsGlobal').text() == "Yes" || $(vMetadataa).find('IsGlobal').text() == "") ? "Global" : "Regional");
            if ($(vMetadataa).find('Status').text() == "Inactive") {
                $("#lblCounterpartyStatus").html('<b title="Inactive" class="status_Gray" style="padding: 5px 10px; color:#fff; vertical-align: -webkit-baseline-middle;">Inactive</b>');
            }
            else if ($(vMetadataa).find('Status').text() == "Active") {
                allowRequired = true;
                $("#lblCounterpartyStatus").html('<b title="Active" class="status_green" style="padding: 5px 10px; color:#fff; vertical-align: -webkit-baseline-middle;">Active</b>');
            }
            //$("#lblCounterpartyStatus").text($(vMetadataa).find('Status').text());
            $("#txtContactID").val(counterpartyID);
            $("#lblRelatedPopup_Counterparties").text("Select Relationship for " + $(vMetadataa).find('CounterpartyName').text())
            //$("#ddlCounterparty option").filter(function (index) { return $(this).text() === counterparty.CounterpartyName; }).prop('selected', true);
            var vCreatedOn = "";
            var vCreatedBy = "";
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
            BindContractsForCounterparty();
            BindDocumentsForCounterparty();
            var vControls = "";
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/primaryfields',
                type: 'GET',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey },
                cache: false,
                success: function (metadataFields) {
                    //manoj
                    if (allowRequired) {
                        RequiredMetadata(vMetadataa, metadataFields);
                    } else {
                        $("#tblRequiredMissing").parent().hide();
                    }
                    //manoj

                    arrofFinancials = [];

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
                                        if ($(vMetadataa).find(item.FieldName).text() == "" || $(vMetadataa).find(item.FieldName).text() == null) {
                                            if (item.Required == "true") {
                                                vControls += "<td height='10' align='left' valign='top' class='content-text width58' id='" + item.FieldName + '1' + "'>Not Available</td>";
                                            } else {
                                                vControls += "<td height='10' align='left' valign='top' class='content-text width58' id='" + item.FieldName + '1' + "'>Not Available</td>";
                                            }
                                        }
                                        else {
                                            if (item.FieldType == 'Date') {
                                                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                                                    if (navigator.userAgent.indexOf('MSIE') == -1 && navigator.userAgent.indexOf('Trident') == -1) {
                                                        onlydate = moment(new Date($(vMetadataa).find(item.FieldName).text())).format('MM/DD/YYYY');
                                                    } else {
                                                        onlydate = moment($(vMetadataa).find('Created').text(), " MM/DD/YYYY THH:mm:ssZ").format('MM/DD/YYYY');
                                                    }
                                                }
                                                else {
                                                    if (navigator.userAgent.indexOf('MSIE') == -1 && navigator.userAgent.indexOf('Trident') == -1) {
                                                        onlydate = moment(new Date($(vMetadataa).find(item.FieldName).text())).format(localStorage.AppDateFormat);
                                                    } else {
                                                        onlydate = moment($(vMetadataa).find('Created').text(), "MM/DD/YYYY THH:mm:ssZ").format(localStorage.AppDateFormat);
                                                    }
                                                }
                                                vDate = true;
                                            }
                                            if (item.Required == "true") {
                                                if (item.FieldName == "Country") {
                                                    if ($(vMetadataa).find(item.FieldName).text() == "0") {
                                                        vControls += "<td height='10' align='left' valign='top' class='content-text width58' id='" + item.FieldName + '1' + "'>Not Available</td>";
                                                    } else {
                                                        vControls += "<td height='10' align='left' valign='top' class='content-text width58' id='" + item.FieldName + '1' + "'>" + $(vMetadataa).find(item.FieldName).text() + "</td>";
                                                    }
                                                } else {
                                                    if (vDate) { vControls += "<td height='10' align='left' valign='top' class='content-text width58' id='" + item.FieldName + '1' + "'>" + onlydate + "</td>"; }
                                                    else {
                                                        if ($(vMetadataa).find(item.FieldName).text() == "0") {
                                                            vControls += "<td height='10' align='left' valign='top' class='content-text width58' id='" + item.FieldName + '1' + "'>Not Available</td>";
                                                        }
                                                        else {
                                                            if (item.FieldType == "Yes/No") {
                                                                if (typeof ($(vMetadataa).find(item.FieldName).text()) != "undefined" && $(vMetadataa).find(item.FieldName).text() != null && $(vMetadataa).find(item.FieldName).text() != "") {
                                                                    if (typeof ($(vMetadataa).find('CustomCMD' + item.FieldName).text()) != "undefined") {
                                                                        if ($(vMetadataa).find('CustomCMD' + item.FieldName).text() != "" && $(vMetadataa).find('CustomCMD' + item.FieldName).text() != null) {
                                                                            vControls += "<td height='10' align='left' valign='top' class='content-text width40' id='" + item.FieldName + '1' + "'>" + $(vMetadataa).find(item.FieldName).text() + "<br />" + $(vMetadataa).find('CustomCMD' + item.FieldName).text() + "</td>";
                                                                        }
                                                                        else {
                                                                            vControls += "<td height='10' align='left' valign='top' class='content-text width40' id='" + item.FieldName + '1' + "'>" + $(vMetadataa).find(item.FieldName).text() + "</td>";
                                                                        }
                                                                    }
                                                                    else {
                                                                        vControls += "<td height='10' align='left' valign='top' class='content-text width40' id='" + item.FieldName + '1' + "'>" + $(vMetadataa).find(item.FieldName).text() + "</td>";
                                                                    }
                                                                }
                                                                else {
                                                                    vControls += "<td height='10' align='left' valign='top' class='content-text  width40' id='" + item.FieldName + '1' + "'>Not Available</td>";
                                                                }
                                                            }
                                                            else if (item.FieldType.indexOf("Value / Financials") >= 0) {
                                                                if (typeof ($(vMetadataa).find(item.FieldName).text()) != "undefined" && $(vMetadataa).find(item.FieldName).text() != null && $(vMetadataa).find(item.FieldName).text() != "" && $(vMetadataa).find(item.FieldName).text() != ".") {
                                                                    arrofFinancials.push(item.FieldName + "1" + "_formatted")
                                                                    var value = $(vMetadataa).find(item.FieldName).text();
                                                                    if (value != "") {
                                                                        vControls += "<td height='10' align='left' valign='top' class='content-text  width40' id='" + item.FieldName + '1' + "'>" + "<span class='content-text' id='" + item.FieldName + '1' + "_formatted" + "'>" + value + "</span>" + "</td>";
                                                                    }
                                                                    else {
                                                                        vControls += "<td height='10' align='left' valign='top' class='content-text  width40' id='" + item.FieldName + '1' + "'>Not Available</td>";
                                                                    }
                                                                }
                                                                else {
                                                                    vControls += "<td height='10' align='left' valign='top' class='content-text  width40' id='" + item.FieldName + '1' + "'>Not Available</td>";
                                                                }
                                                            }
                                                            else if (item.FieldType == "Phone Number") {
                                                                if (typeof ($(vMetadataa).find(item.FieldName).text()) != "undefined") {
                                                                    if (typeof ($(vMetadataa).find(item.FieldName).text().split(',')[2]) != "undefined" && $(vMetadataa).find(item.FieldName).text().split(',')[2] != null && $(vMetadataa).find(item.FieldName).text().split(',')[2] != "") {
                                                                        vControls += "<td height='10' align='left' valign='top' class='content-text width58' id='" + item.FieldName + '1' + "'> +" + $(vMetadataa).find(item.FieldName).text().split(',')[2].trim() + "</td>";
                                                                    }
                                                                    else {
                                                                        vControls += "<td height='10' align='left' valign='top' class='content-text width58' id='" + item.FieldName + '1' + "'>Not Available</td>";
                                                                    }
                                                                }
                                                                else
                                                                    vControls += "<td height='10' align='left' valign='top' class='content-text width58' id='" + item.FieldName + '1' + "'>Not Available</td>";
                                                            }
                                                                //Added by Jay
                                                            else if (item.FieldType == "Number-P" || item.FieldType == "Number-PD") {
                                                                if (typeof ($(vMetadataa).find(item.FieldName).text()) != "undefined" && $(vMetadataa).find(item.FieldName).text() != null && $(vMetadataa).find(item.FieldName).text() != "") {
                                                                    vControls += "<td height='10' align='left' valign='top' class='content-text width58' id='" + item.FieldName + '1' + "'> " + $(vMetadataa).find(item.FieldName).text() + '%' + "</td>";
                                                                }
                                                                else {
                                                                    vControls += "<td height='10' align='left' valign='top' class='content-text width58' id='" + item.FieldName + '1' + "'>Not Available</td>";
                                                                }
                                                            }
                                                            else
                                                                vControls += "<td height='10' align='left' valign='top' class='content-text width58' id='" + item.FieldName + '1' + "'>" + $(vMetadataa).find(item.FieldName).text() + "</td>";
                                                        }
                                                    }
                                                }
                                            }
                                            else {
                                                if (item.FieldName == "Country") {
                                                    if ($(vMetadataa).find(item.FieldName).text() == "0") {
                                                        vControls += "<td height='10' align='left' valign='top' class='content-text width58' id='" + item.FieldName + '1' + "'>Not Available</td>";
                                                    } else {
                                                        vControls += "<td height='10' align='left' valign='top' class='content-text width58' id='" + item.FieldName + '1' + "'>" + $(vMetadataa).find(item.FieldName).text() + "</td>";
                                                    }
                                                }
                                                else {
                                                    if (vDate) { vControls += "<td height='10' align='left' valign='top' class='content-text width58' id='" + item.FieldName + '1' + "'>" + onlydate + "</td>"; }
                                                    else {
                                                        if ($(vMetadataa).find(item.FieldName).text() == "0") {
                                                            vControls += "<td height='10' align='left' valign='top' class='content-text width58' id='" + item.FieldName + '1' + "'>Not Available</td>";
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
                                                                        vControls += "<td height='10' align='left' valign='top' class='content-text width58' id='" + item.FieldName + '1' + "'> +" + $(vMetadataa).find(item.FieldName).text().split(',')[2].trim() + "</td>";
                                                                    }
                                                                    else {
                                                                        vControls += "<td height='10' align='left' valign='top' class='content-text width58' id='" + item.FieldName + '1' + "'>Not Available</td>";
                                                                    }
                                                                }
                                                                else
                                                                    vControls += "<td height='10' align='left' valign='top' class='content-text width58' id='" + item.FieldName + '1' + "'>Not Available</td>";
                                                            }
                                                                //Added by Jay
                                                            else if (item.FieldType == "Number-P" || item.FieldType == "Number-PD") {
                                                                if (typeof ($(vMetadataa).find(item.FieldName).text()) != "undefined" && $(vMetadataa).find(item.FieldName).text() != null && $(vMetadataa).find(item.FieldName).text() != "") {
                                                                    vControls += "<td height='10' align='left' valign='top' class='content-text width58' id='" + item.FieldName + '1' + "'> " + $(vMetadataa).find(item.FieldName).text() + '%' + "</td>";
                                                                }
                                                                else {
                                                                    vControls += "<td height='10' align='left' valign='top' class='content-text width58' id='" + item.FieldName + '1' + "'>Not Available</td>";
                                                                }
                                                            }
                                                            else
                                                                vControls += "<td height='10' align='left' valign='top' class='content-text width58' id='" + item.FieldName + '1' + "'>" + $(vMetadataa).find(item.FieldName).text() + "</td>";

                                                        }

                                                    }
                                                }
                                            }
                                        }

                                        //vControls += '<label>' + item.Description + '</label>';
                                        //if (item.FieldHelp == "true") {
                                        //    vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                                        //}
                                        vControls += '</tr>';
                                        // }

                                        // $("#Counterpartymatadata").append(vControls);
                                    }
                                }

                            }
                        }
                    });
                    if (vCreatedBy != "") {
                        vControls += ' <tr><td height="10" align="left" valign="top" class="content-text clr999 width40">Created By</td><td height="10" align="left" valign="top" class="content-text width58" id="CreatedBy1">' + vCreatedBy + '</td></tr>';
                    }
                    if (vCreatedOn != "") {
                        vControls += ' <tr><td height="10" align="left" valign="top" class="content-text clr999 width40">Created On</td><td height="10" align="left" valign="top" class="content-text width58" id="Created1">' + vCreatedOn + '</td></tr>';
                    }
                    $("#Counterpartymatadata").append(vControls);

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
                }, error: function (data) {
                    $("#tblRequiredMissing").parent().hide();
                }
            });
        },
        error:
            function (data) {
                $('.refr-Butt,.content-body-right,.agreement,.documents,.contract_Left').empty();//.col12,
                $(".contract_Left").append('<p class="f_p-error det_metadata_notavailble" style="margin-left: 284px;">Counterparty is no longer available.</p>');

            }
    });
}

//manoj
function RequiredMetadata(MatadataCollection, PrimaryFieldCollection) {
    var RequiredFieldCollection = [];
    if (localStorage.UserType != "Business User") {
        if (typeof PrimaryFieldCollection != "undefined" && PrimaryFieldCollection != null) {
            var CounterpartyFieldList = $.grep(PrimaryFieldCollection, function (nFieldList, iFieldList) {
                return (nFieldList.FieldName != "CounterpartyName" && nFieldList.FieldName != "CounterpartyType" && nFieldList.FieldName != "Status" && nFieldList.ShowInEditForm == "true" && nFieldList.FieldType != "File Upload" && nFieldList.Required == "true");
            });
            if (CounterpartyFieldList.length > 0) {
                $(CounterpartyFieldList).each(function (iConterpartyFL, itemConterpartyFL) {
                    if ($(MatadataCollection).find(itemConterpartyFL.FieldName).text() == "") {
                        RequiredFieldCollection.push(itemConterpartyFL.FieldDisplayName);
                    }
                });
                if (RequiredFieldCollection.length > 0) {
                    var FieldCollectionString = RequiredFieldCollection.join(";");
                    if (FieldCollectionString.lastIndexOf(";") > -1) {
                        FieldCollectionString = FieldCollectionString.substr(0, FieldCollectionString.lastIndexOf(";")) + ' and ' + FieldCollectionString.substr(FieldCollectionString.lastIndexOf(";") + 1);
                    }
                    FieldCollectionString = FieldCollectionString.replace(/[\;]/g, '; ');
                    var requiredMSG = 'Missing Required Metadata';
                    requiredMSG = requiredMSG + FieldCollectionString;
                    $("#tblRequiredMissing").html("<tr><td class='text-left'><a href='javascript:void(0);' data-title='" + requiredMSG + "'><img src='/Content/Images/missing-exc.png' style='cursor: pointer !important;'/></a></td></tr>");
                    if (oGeneralSettings.DisplayMissingInformation == "Yes") {
                        $("#tblRequiredMissing").parent().show();
                    }
                    else {
                        $("#tblRequiredMissing").parent().hide();
                    }
                } else {
                    $("#tblRequiredMissing").parent().hide();
                }
            } else {
                $("#tblRequiredMissing").parent().hide();
            }
        } else {
            $("#tblRequiredMissing").parent().hide();
        }
    } else {
        $("#tblRequiredMissing").parent().hide();
    }
}
//manoj


function BindContacts() {
    $("#listContacts").html('');

    var vURL = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/counterparty/' + getParameterByName('CounterpartyID') + '/contacts?searchkeyword=';
    $.ajax({
        url: vURL,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            if (data.length == 0) {
                $("#listContacts").append('<p class="f_p-error">No items found.</p>');
            }
            else {

                var moreThanTen = 0;
                var allowuser = (localStorage.UserType == "Business User") ? false : true;
                $(data).each(function (i, item) {
                    var vCountry = '';
                    if (item.Country == "--Select--")
                        vCountry = "";
                    else
                        vCountry = item.Country;

                    var article = '';
                    if (i >= 10) {
                        moreThanTen++;
                        article = '<li class="showallcontact" style="display:none;">';
                    }
                    else {
                        article = '<li>';
                    }
                    article += '<p id="ContactID" style="display:none;">' + item.RowKey + '</p>';
                    article += '<p id="ContactName" style="display:none;">' + item.ContactName + '</p>';
                    article += '<p class="ContactEmailID" data-contractid="' + item.RowKey + '" style="display:none;">' + item.EmailID + '</p>';
                    article += '<p>' + item.ContactName;
                    //manoj
                    if (allowuser) {
                        article += '<i><img src="/Content/Images/drop-arrow.png" alt="Open Menu" title="Open Menu" class="openmenuContact"/></i>';
                    }
                    //manoj                    
                    article += '<small>';
                    var vAddress = '';

                    if (item.AddressLine1 != "")
                        vAddress += item.AddressLine1 + ', ';

                    if (item.AddressLine2 != "") {
                        if (vAddress == "")
                            vAddress = item.AddressLine2;
                        else
                            vAddress += item.AddressLine2 + ', ';
                    }
                    if (item.City != "") {
                        if (vAddress == "")
                            vAddress = item.City;
                        else
                            vAddress += item.City + ', ';
                    }

                    if (item.State != "") {
                        if (vAddress == "")
                            vAddress = item.State;
                        else
                            vAddress += item.State + ', ';
                    }

                    if (item.Country != "" && item.Country != "--Select--" && item.Country != "0") {
                        if (vAddress == "")
                            vAddress = item.Country;
                        else
                            vAddress += item.Country + ', ';
                    }

                    var vInternalOrExternal = '';
                    if (item.InternalOrExternal != "") {
                        vInternalOrExternal = item.InternalOrExternal;
                    }
                    if (vAddress == "" || vAddress == "0")
                        article += vInternalOrExternal;
                    else
                        article += vAddress + (vInternalOrExternal != "" ? (' | ' + vInternalOrExternal) : "");
                    article += '</small>';

                    article += '</p></li>';



                    $("#listContacts").append(article);


                });
                if (moreThanTen > 0) {
                    $("#listContacts").append('<p class="text"><i class="detail-load"><a href="javascript:void(0)" onclick="showallcontact(this);">' + moreThanTen + ' More To See</a></i></p>');
                }
                $(".openmenuContact").contextMenu({ menu: 'myMenu', leftButton: true }, function (action, el, pos) {
                    contextMenuWork(action, el.parent("i").parent("p").parent("li"), pos);
                });

            }

            if (localStorage.UserType.indexOf("Global Contract Owner") > -1 || localStorage.UserType.indexOf("Global Administrator") > -1) {
                $('#myMenu .delete').show();
            }
            else {
                $('#myMenu .delete').hide();
            }

        },
        error:
            function (data) {
                $("#listContacts").append('<p class="f_p-error det_metadata_notavailble">No items found.</p>');
            }
    });

}

function showallcontact(item) {
    $(".showallcontact").css("display", "");
    $(item).text('');
    $(item).css('pointer-event', 'none');
}

function BindContractsForCounterparty() {
    var baname = "";
    if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
        baname = localStorage.GlobalBusinessAreaLocation;
    }

    $("#listContracts").html('');
    var vURL = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?counterparty=' + encodeURIComponent($("#lblCounterpartyName").text());
    $.ajax({
        url: vURL,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, BusinessAreaLocation: baname },
        success: function (data) {
            if (data.length == 0) {
                $("#listContracts").append('<p class="f_p-error">No items found.</p>');
            }
            else {
                var datalenght = data.length;
                for (var i = 0; i < datalenght; i++) {
                    var item = data[i];
                    var vPermission = '';
                    if (item.Permission == 'Manage') {
                        vPermission = 'openmenu';
                    }
                    else if (item.Permission == 'Contribute') {
                        vPermission = 'openmenuContribute';
                    }
                    else if (item.Permission == 'Collaborate') {
                        vPermission = 'openmenuCollaborate';
                    }
                    else if (item.Permission == 'View') {
                        vPermission = 'openmenuView';
                    }

                    var myUrl = '/Contracts/ContractDetails?ContractID=' + encodeURI(item.RowKey);

                    var article = '<li>';

                    var vContractNumber = '';
                    if (item.ContractNumber == null || item.ContractNumber == "") {
                        vContractNumber = 'No Contract Record Number';
                    } else {
                        vContractNumber = item.ContractNumber;
                    }
                    article += '<p id="ContractID" style="display:none;">' + item.RowKey + '</p>';
                    article += '<p id="ContractTitle" style="display:none;" class="PreserveSpace">' + item.ContractTitle + '</p>';
                    article += '<p id="ContractType" style="display:none;">' + item.ContractType + '</p>';
                    article += '<p id="Status" style="display:none;">' + item.Status + '</p>';
                    article += '<p id="ContractValue" style="display:none;">' + item.ContractValue + '</p>';
                    article += '<p id="ContractCurrency" style="display:none;">' + item.ContractCurrency + '</p>';
                    article += '<p id="ContractPricingType" style="display:none;">' + item.ContractPricingType + '</p>';
                    article += '<p id="PaymentType" style="display:none;">' + item.PaymentType + '</p>';
                    article += '<p id="BillingFrequency" style="display:none;">' + item.BillingFrequency + '</p>';
                    article += '<p id="EndDate" style="display:none;">' + item.EndDate + '</p>';
                    article += '<p id="TermEndDate" style="display:none;">' + item.TermEndDate + '</p>';
                    article += '<p id="Extendable" style="display:none;">' + item.Extendable + '</p>';
                    article += '<p id="Renewable" style="display:none;">' + item.Renewable + '</p>';
                    article += '<p id="BaseContractValue" style="display:none;">' + item.BaseContractValue + '</p>';
                    article += '<p id="BaseContractValueCurrency" style="display:none;">' + item.BaseContractValueCurrency + '</p>';


                    if (item.Permission != "" && item.Permission != "No Access") {
                        article += '<p><a href=' + myUrl + ' class="PreserveSpace">' + item.ContractTitle + '</a>';
                    } else {
                        article += '<p class="PreserveSpace">' + item.ContractTitle;
                    }

                    article += '<small>' + vContractNumber + ' | ' + item.ContractType + '</small>';

                    article += '</p>';

                    // Changed Colours of Status (eO36929)
                    if (item.Status == "New") {
                        article += '<b class="status_green_another">' + item.Status + '</b>';
                    }
                    else if (item.Status == "Drafting") {
                        article += '<b class="status_yellow">' + item.Status + '</b>';
                    }
                    else if (item.Status == "Awaiting Review") {
                        article += '<b class="status_yellow">' + item.Status + '</b>';
                    }
                    else if (item.Status == "Awaiting Approval") {
                        article += '<b class="status_yellow">' + item.Status + '</b>';
                    }
                    else if (item.Status == "In Negotiation") {
                        article += '<b class="status_yellow">' + item.Status + '</b>';
                    }
                    else if (item.Status == "Ready for Signature") {
                        article += '<b class="status_green">' + item.Status + '</b>';
                    }
                    else if (item.Status == "Awaiting Signatures") {
                        article += '<b class="status_yellow">' + item.Status + '</b>';
                    }
                    else if (item.Status == "Signed") {
                        article += '<b class="status_blue">' + item.Status + '</b>';
                    }
                    else if (item.Status == "Active") {
                        article += '<b class="status_green">' + item.Status + '</b>';
                    }
                    else if (item.Status == "Up for Renewal") {
                        article += '<b class="status_red">' + item.Status + '</b>';
                    }
                    else if (item.Status == "Renewed") {
                        article += '<b class="status_green">' + item.Status + '</b>';
                    }
                    else if (item.Status == "Extended") {
                        article += '<b class="status_green">' + item.Status + '</b>';
                    }
                    else if (item.Status == "On Hold") {
                        article += '<b class="status_red">' + item.Status + '</b>';
                    }
                    else if (item.Status == "Replaced") {
                        article += '<b class="status_Gray">' + item.Status + '</b>';
                    }
                    else if (item.Status == "Expired") {
                        article += '<b class="status_Gray">' + item.Status + '</b>';
                    }
                    else if (item.Status == "Cancelled") {
                        article += '<b class="status_Gray">' + item.Status + '</b>';
                    }
                    else if (item.Status == "Terminated") {
                        article += '<b class="status_Gray">' + item.Status + '</b>';
                    }
                    else if (item.Status == "Archived") {
                        article += '<b class="status_Gray">' + item.Status + '</b>';
                    }
                    else if (item.Status == "Reviewed") {
                        article += '<b class="status_blue">' + item.Status + '</b>';
                    }
                    else if (item.Status == "About to Expire") {
                        article += '<b class="status_red">' + item.Status + '</b>';
                    }
                    else if (item.Status == "Approved") {
                        article += '<b class="status_blue">' + item.Status + '</b>';
                    }
                    else if (item.Status == "Negotiation Complete") {
                        article += '<b class="status_blue">' + item.Status + '</b>';
                    } else {
                        if (item.Status == "0" || item.Status == "" || item.Status == "undefined") {
                            article += '<b class="chocolate">Not Assigned</b>';

                        } else {
                            article += '<b class="chocolate">' + item.Status + '</b>';
                        }
                    }

                    article += '</li>';

                    $("#listContracts").append(article);
                }

                // Included Pagination (eO36929)
                $('#compact-pagination2').pagination({
                    items: datalenght,
                    itemsOnPage: 5,
                    type: 'ul',
                    row: 'li',
                    typeID: 'listContracts',
                    cssStyle: 'compact-theme'
                });

                $('#compact-paginationCon').css("display", "");
            }
        },
        error:
            function (data) {
                $("#listContracts").append('<p class="f_p-error det_metadata_notavailble">No items found.</p>');
            }
    });
}

function BindDocumentsForCounterparty() {
    var baname = "";
    if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
        baname = localStorage.GlobalBusinessAreaLocation;
    }

    $("#listDocuments").html('');
    var vURL = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?counterparty=' + encodeURIComponent($("#lblCounterpartyName").text());
    $.ajax({
        url: vURL,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, BusinessAreaLocation: baname },
        success: function (data) {
            if (data.length == 0) {
                $("#listDocuments").append('<p class="f_p-error">No items found.</p>');
            }
            else {
                var settings = {
                    pattern: /\.[0-9a-z]+$/i,
                    knownFileTypes: ['pdf', 'png', 'jpg', 'gif', 'bmp', 'doc', 'xls', 'ppt', 'docx', 'xlsx', 'txt', 'pptx', 'zip', 'rar', 'gzip', 'arj', 'wav', 'mp3', 'aif', 'aiff', 'm4a', 'ogg', 'wma', 'psd', 'ai', 'swf', 'fla', 'css', 'js', 'avi', 'mov', 'wmv', 'dotx'],
                    WopiFrameFileTypes: ['doc', 'xls', 'ppt', 'docx', 'xlsx', 'pptx', 'dotx']
                };
                var datalenght = data.length;
                for (var i = 0; i < datalenght; i++) {
                    var item = data[i];
                    var vURL = encodeURI(item.DocumentUrl);
                    var ext = vURL.match(settings.pattern);
                    var vFileType = '<i class="file-icon none"></i>';
                    if (ext != null) {
                        if (ext.length > 0) { ext = ext[0].slice(1); }
                        //if (vURL.toLowerCase().indexOf(localStorage.SPHostUrl.toLowerCase()) >= 0) {
                        //    if (jQuery.inArray(ext, settings.WopiFrameFileTypes) > -1) {
                        //        vURL = localStorage.SPHostUrl + "/_layouts/WopiFrame.aspx?sourcedoc=" + vURL + "&action=default";
                        //    }
                        //}

                        if (jQuery.inArray(ext, settings.knownFileTypes) > -1) {
                            vFileType = '<i class="file-icon ' + ext + '"></i>';
                        }
                    }
                    var vv = moment(new Date(item.Modified));
                    var vTime = vv.fromNow();
                    var vDocIcon = '<img src="../Content/Images/Doc_draft.png" class="doc_type" alt="Draft Document" title="Draft Document" />';
                    if (item.IsFinalized == "Yes") {
                        vDocIcon = '<img src="../Content/Images/icon/final_doc.png" class="doc_type" alt="Finalized Document" title="Finalized Document" />';
                    } else if (item.CreationMode == "Amendment") {
                        vDocIcon = '<img src="../Content/Images/icon/amendment_doc.png" class="doc_type" alt="Amendment Document" title="Amendment Document" />';
                    }

                    var article = '<li>';

                    if (item.Permission != "" && item.Permission != "No Access") {
                        article += '<p style="word-wrap: break-word;display: inline-block;width: 500px;">' + vFileType + '<a style="width: 75%" href="javascript:void(0);" title=' + item.DocumentName + ' onclick="Opendocinbrowser(\'' + encodeURIComponent(item.DocumentUrl) + '\')" >' + item.DocumentName + '</a><i>' + vDocIcon + '</i>';
                    } else {
                        article += '<p style="word-wrap: break-word">' + vFileType + '' + item.DocumentName + '<i>' + vDocIcon + '</i>';
                    }
                    article += '<small class="PreserveSpace">';
                    if (item.ContractTitle == "") {
                        if (item.DocumentType == "0" || item.DocumentType == "") {
                            article += '&lt;Not tagged to Contract&gt;  |  NA';
                        }
                        else {
                            article += '&lt;Not tagged to Contract&gt;  |  ' + item.DocumentType;
                        }

                    } else {
                        if (item.DocumentType == "0" || item.DocumentType == "") {
                            article += item.ContractTitle + '  |  NA';
                        }
                        else {
                            article += item.ContractTitle + '  |  ' + item.DocumentType;
                        }

                    }
                    article += '  |  ' + vTime + '</small>';
                    article += '</p>';

                    // Changed colour of the status (eO36929)
                    if (item.DocumentStatus == "New") {
                        article += '<b class="status_green_another">' + item.DocumentStatus + '</b>';
                    }
                    else if (item.DocumentStatus == "Drafting") {
                        article += '<b class="status_yellow">' + item.DocumentStatus + '</b>';
                    }
                    else if (item.DocumentStatus == "Awaiting Review") {
                        article += '<b class="status_yellow">' + item.DocumentStatus + '</b>';
                    }
                    else if (item.DocumentStatus == "Awaiting Approval") {
                        article += '<b class="status_yellow">' + item.DocumentStatus + '</b>';
                    }
                    else if (item.DocumentStatus == "In Negotiation") {
                        article += '<b class="status_yellow">' + item.DocumentStatus + '</b>';
                    }
                    else if (item.DocumentStatus == "Ready for Signature") {
                        article += '<b class="status_green">' + item.DocumentStatus + '</b>';
                    }
                    else if (item.DocumentStatus == "Awaiting Signatures") {
                        article += '<b class="status_yellow">' + item.DocumentStatus + '</b>';
                    }
                    else if (item.DocumentStatus == "Signed") {
                        article += '<b class="status_blue">' + item.DocumentStatus + '</b>';
                    }
                    else if (item.DocumentStatus == "Active") {
                        article += '<b class="status_green">' + item.DocumentStatus + '</b>';
                    }
                    else if (item.DocumentStatus == "Expired") {
                        article += '<b class="status_Gray">' + item.DocumentStatus + '</b>';
                    }
                    else if (item.DocumentStatus == "Negotiation Complete") {
                        article += '<b class="status_blue">' + item.DocumentStatus + '</b>';
                    }
                    else if (item.DocumentStatus == "Reviewed") {
                        article += '<b class="status_blue">' + item.DocumentStatus + '</b>';
                    }
                    else {
                        if (item.DocumentStatus == "0" || item.DocumentStatus == "" || item.DocumentStatus == "undefined") {
                            article += '<b class="chocolate">Not Assigned</b>';

                        } else {
                            article += '<b class="chocolate">' + item.DocumentStatus + '</b>';
                        }
                    }

                    article += '</li>';

                    $("#listDocuments").append(article);
                }

                // Included Pagination (eO36929)
                $('#compact-paginationDoc').pagination({
                    items: datalenght,
                    itemsOnPage: 5,
                    type: 'ul',
                    row: 'li',
                    typeID: 'listDocuments',
                    cssStyle: 'compact-theme'
                });

                $('#compact-paginationDoc').css("display", "");
            }
        },
        error:
            function (data) {
                $("#listDocuments").append('<p class="f_p-error det_metadata_notavailble">No items found.</p>');
            }
    });
}

function addContact() {
    // $("#contactInline").toggle();
    $('#btnAddCounterpartyContact').trigger("click");
}

$('#btnAddCounterpartyContactInline').click(function () {

    if (requiredValidator('contactInline')) {
        var strContractID = getParameterByName('CounterpartyID');
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contacts',
            type: 'POST',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
            data: {
                ContactName: $("#txtCounterpartyContactInline").val(),
                CounterpartyID: $("#hdnCounterpartyID").text(),
                CounterpartyName: $("#lblCounterpartyName").text(),
                CreatedBy: localStorage.UserName,
                ModifiedBy: localStorage.UserName
            },
            cache: false,
            success: function (person) {
                swal("", person);
                $("#contactInline").toggle();
                $("#txtCounterpartyContactInline").val("");
                BindContacts();
            }
        });
    }
});

$('#btnAddCounterpartyContact').click(function () {

    // addContact();


    $("#txtContactID").val("");
    $("#txtContactName").val("");
    $("#spnCounterpartyName").text($('#lblCounterpartyName').text());
    if ($("#hdnCounterpartyName").val() != "" && $("#hdnCounterpartyName").val() != null && $("#hdnCounterpartyName").val() != "") {
        $("#ddlCounterparty option").filter(function (index) { return $(this).text() === $("#hdnCounterpartyName").val(); }).prop('selected', true);
        $("#ddlCounterparty").prop('disabled', true);
    }
    else {
        $("#ddlCounterparty option").filter(function (index) { return $(this).text() === $("#hdnCounterpartyName").val(); }).prop('selected', true);

        $("#ddlCounterparty").prop('disabled', false);
    }
    $('input[type="radio"][name=InternalOrExternal][value="External"]').prop('checked', true);
    $("#InternalUser").hide();
    $(".ExContact").show();
    $("#ddlInternalUser").removeClass("validelement");
    $("#txtAddressLine1C").val("");
    $("#txtAddressLine2C").val("");
    $("#txtCityC").val("");
    $("#txtStateC").val("");
    $("#ddlCountryC").val("0");
    $("#txtZipC").val("");
    $("#txtContactNoC").val("");
    $("#txtEmailIDC").val("");


    $("#addEditContact").dialog("option", "title", "New Contact");
    $("#addEditContact").dialog("open");


});

function SaveContact() {
    if (requiredValidator('addNewContactFields')) {
        $("#loadingPage").fadeIn();
        var contactID = $("#txtContactID").val();
        var counterpartyID = $("#hdnCounterpartyID").text();
        var counterpartyName = $('#spnCounterpartyName').text();
        var isExistsEmail = false;
        if (contactID != '') {
            if ($('input[type="radio"][name=InternalOrExternal]:checked').val() == "Internal") {
                isExistsEmail = false;
                ContactName = $("#ddlInternalUser").val();
                $("#txtAddressLine1C").val('');
                $("#txtAddressLine2C").val('');
                $("#txtCityC").val('');
                $("#txtStateC").val('');
                $("#txtZipC").val('');
                CountryName = "";
                $("#txtContactNoC").val('');
                $("#txtEmailIDC").val('');
                var email = $("#txtEmailIDC").val().trim();
                if ((ContactName != InternalUser && counterpartyName == InternalUserCounterName) || (InternalUser == "")) {
                    $.ajax({
                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/counterparty/' + counterpartyID + '/contactsname?Contact=' + ContactName,
                        type: 'GET',
                        dataType: 'json',
                        'Content-Type': 'application/json',
                        cache: false,
                        async: false,
                        headers: { 'eContracts-ApiKey': localStorage.APIKey },
                        success: function (data) {
                            var isFlag = false;
                            if (data != null && data.length > 0) {
                                for (var i = 0; i < data.length; i++) {
                                    if (data[i].InternalOrExternal == "Internal") {
                                        if (data[i].RowKey != contactID) {
                                            isFlag = true;
                                        }
                                    }
                                }
                            }
                            if (!isFlag) {
                                $.ajax({
                                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contacts?contactid=' + contactID,
                                    type: 'PUT',
                                    dataType: 'json',
                                    headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                                    data: {
                                        RowKey: contactID,
                                        ContactName: ContactName,
                                        CounterpartyName: counterpartyName,
                                        Role: $("#txtRole").val(),
                                        CounterpartyID: counterpartyID,
                                        AddressLine1: $("#txtAddressLine1C").val(),
                                        AddressLine2: $("#txtAddressLine2C").val(),
                                        City: $("#txtCityC").val(),
                                        State: $("#txtStateC").val(),
                                        Zip: $("#txtZipC").val(),
                                        Country: CountryName,
                                        ContactNo: $("#txtContactNoC").val(),
                                        EmailID: $("#txtEmailIDC").val(),
                                        CreatedBy: localStorage.UserName,
                                        ModifiedBy: localStorage.UserName,
                                        InternalOrExternal: $('input[type="radio"][name=InternalOrExternal]:checked').val()
                                    },
                                    cache: false,
                                    success: function (person) {
                                        $.modal.close();
                                        $("#loadingPage").fadeOut();

                                        //location = location;
                                        //  location = "CounterpartyContacts";
                                        var vCount = $("#listContacts tr").length;
                                        if (vCount > 20) {
                                            vCtypeCurrentPage = $('#compact-pagination').pagination('getCurrentPage');
                                        }
                                        else {
                                            vCtypeCurrentPage = 1;
                                        }

                                        swal({
                                            title: '',
                                            text: person,

                                        },
                                     function (confirmed) {
                                         if (confirmed) {
                                             //location = "/Settings/CounterpartyContacts?Currentpage=" + vCtypeCurrentPage;
                                             location = location;
                                         }

                                     });
                                    }
                                });
                            }
                            else {
                                swal("", "Internal contact exists with this counterparty. Please select different internal user");
                                $("#loadingPage").fadeOut();
                            }
                        },
                        error:
                            function (data) {
                                swal("", "Internal contact exists with this counterparty. Please select different internal user");
                                $("#loadingPage").fadeOut();
                            }
                    });
                }
                else {
                    var ContactName = "";
                    var CountryName = "";
                    if ($('input[type="radio"][name=InternalOrExternal]:checked').val() == "Internal") {
                        isExistsEmail = false;
                        ContactName = $("#ddlInternalUser").val();
                        $("#txtAddressLine1C").val('');
                        $("#txtAddressLine2C").val('');
                        $("#txtCityC").val('');
                        $("#txtStateC").val('');
                        $("#txtZipC").val('');
                        CountryName = "";
                        $("#txtContactNoC").val('');
                        $("#txtEmailIDC").val('');
                        $.ajax({
                            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/counterparty/' + counterpartyID + '/contactsname?Contact=' + ContactName,
                            type: 'GET',
                            dataType: 'json',
                            'Content-Type': 'application/json',
                            cache: false,
                            async: false,
                            headers: { 'eContracts-ApiKey': localStorage.APIKey },
                            success: function (data) {
                                var isFlag = false;
                                if (data != null && data.length > 0) {
                                    for (var i = 0; i < data.length; i++) {
                                        if (data[i].InternalOrExternal == "Internal") {
                                            if (data[i].RowKey != contactID) {
                                                isFlag = true;
                                            }
                                        }
                                    }
                                }
                                if (!isFlag) {
                                    $.ajax({
                                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contacts',
                                        type: 'PUT',
                                        dataType: 'json',
                                        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                                        data: {
                                            ContactName: ContactName,
                                            Role: $("#txtRole").val(),
                                            CounterpartyName: counterpartyName,
                                            CounterpartyID: counterpartyID,
                                            AddressLine1: $("#txtAddressLine1C").val(),
                                            AddressLine2: $("#txtAddressLine2C").val(),
                                            City: $("#txtCityC").val(),
                                            State: $("#txtStateC").val(),
                                            Zip: $("#txtZipC").val(),
                                            Country: CountryName,
                                            ContactNo: $("#txtContactNoC").val(),
                                            EmailID: $("#txtEmailIDC").val(),
                                            CreatedBy: localStorage.UserName,
                                            ModifiedBy: localStorage.UserName,
                                            InternalOrExternal: $('input[type="radio"][name=InternalOrExternal]:checked').val()
                                        },
                                        cache: false,
                                        success: function (person) {
                                            $.modal.close();
                                            $("#loadingPage").fadeOut();
                                            swal({
                                                title: '',
                                                text: person,

                                            },
                                      function (confirmed) {
                                          if (confirmed) {
                                              location = location;

                                          }

                                      });
                                        }
                                    });
                                }
                                else {
                                    swal("", "Internal contact exists with this counterparty. Please select different internal user");
                                    $("#loadingPage").fadeOut();
                                }
                            },
                            error:
                                function (data) {
                                    swal("", "Internal contact exists with this counterparty. Please select different internal user");
                                    $("#loadingPage").fadeOut();
                                }
                        });
                    }
                }
            }
            else {
                var email = $("#txtEmailIDC").val().trim();
                ContactName = $("#txtContactName").val();
                CountryName = $("#ddlCountryC").find('option:selected').text();
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/counterparty/' + counterpartyID + '/contactsname?Contact=' + ContactName,
                    type: 'GET',
                    dataType: 'json',
                    'Content-Type': 'application/json',
                    cache: false,
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    success: function (data) {
                        if (data != null && data.length > 0) {
                            for (var i = 0; i < data.length; i++) {
                                if (data[i].EmailID.trim().toLowerCase() == email.toLowerCase()) {
                                    if (data[i].RowKey != contactID) {
                                        isExistsEmail = true;
                                    }
                                }
                            }
                        }
                        if (!isExistsEmail) {
                            $.ajax({
                                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contacts?contactid=' + contactID,
                                type: 'PUT',
                                dataType: 'json',
                                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                                data: {
                                    RowKey: contactID,
                                    ContactName: ContactName,
                                    CounterpartyName: counterpartyName,
                                    Role: $("#txtRole").val(),
                                    CounterpartyID: counterpartyID,
                                    AddressLine1: $("#txtAddressLine1C").val(),
                                    AddressLine2: $("#txtAddressLine2C").val(),
                                    City: $("#txtCityC").val(),
                                    State: $("#txtStateC").val(),
                                    Zip: $("#txtZipC").val(),
                                    Country: CountryName,
                                    ContactNo: $("#txtContactNoC").val(),
                                    EmailID: $("#txtEmailIDC").val(),
                                    CreatedBy: localStorage.UserName,
                                    ModifiedBy: localStorage.UserName,
                                    InternalOrExternal: $('input[type="radio"][name=InternalOrExternal]:checked').val()
                                },
                                cache: false,
                                success: function (person) {
                                    $.modal.close();
                                    $("#loadingPage").fadeOut();

                                    //location = location;
                                    //  location = "CounterpartyContacts";
                                    var vCount = $("#listContacts tr").length;
                                    if (vCount > 20) {
                                        vCtypeCurrentPage = $('#compact-pagination').pagination('getCurrentPage');
                                    }
                                    else {
                                        vCtypeCurrentPage = 1;
                                    }

                                    swal({
                                        title: '',
                                        text: person,

                                    },
                                 function (confirmed) {
                                     if (confirmed) {
                                         //location = "/Settings/CounterpartyContacts?Currentpage=" + vCtypeCurrentPage;
                                         location = location;
                                     }

                                 });
                                }
                            });
                        }
                        else {
                            swal("", "EmailID already exists with this contact. Please select different EmailID");
                            $("#loadingPage").fadeOut();
                        }
                    },
                    error: function (data) {
                        swal("", "Internal contact exists with this counterparty. Please select different internal user");
                        $("#loadingPage").fadeOut();
                    }
                });



            }
        }
        else {
            var ContactName = "";
            var CountryName = "";
            if ($('input[type="radio"][name=InternalOrExternal]:checked').val() == "Internal") {
                ContactName = $("#ddlInternalUser").val();
                $("#txtAddressLine1C").val('');
                $("#txtAddressLine2C").val('');
                $("#txtCityC").val('');
                $("#txtStateC").val('');
                $("#txtZipC").val('');
                CountryName = "";
                $("#txtContactNoC").val('');
                $("#txtEmailIDC").val('');
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/counterparty/' + counterpartyID + '/contactsname?Contact=' + ContactName,
                    type: 'GET',
                    dataType: 'json',
                    'Content-Type': 'application/json',
                    cache: false,
                    async: false,
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    success: function (data) {
                        var isFlag = false;
                        if (data != null && data.length > 0) {
                            for (var i = 0; i < data.length; i++) {
                                if (data[i].InternalOrExternal == "Internal") {
                                    isFlag = true;
                                }
                            }
                        }

                        if (!isFlag) {
                            isformvalid = true;

                            $.ajax({
                                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contacts',
                                type: 'POST',
                                dataType: 'json',
                                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                                data: {
                                    ContactName: ContactName,
                                    Role: $("#txtRole").val(),
                                    CounterpartyName: counterpartyName,
                                    CounterpartyID: counterpartyID,
                                    AddressLine1: $("#txtAddressLine1C").val(),
                                    AddressLine2: $("#txtAddressLine2C").val(),
                                    City: $("#txtCityC").val(),
                                    State: $("#txtStateC").val(),
                                    Zip: $("#txtZipC").val(),
                                    Country: CountryName,
                                    ContactNo: $("#txtContactNoC").val(),
                                    EmailID: $("#txtEmailIDC").val(),
                                    CreatedBy: localStorage.UserName,
                                    ModifiedBy: localStorage.UserName,
                                    InternalOrExternal: $('input[type="radio"][name=InternalOrExternal]:checked').val()
                                },
                                cache: false,
                                success: function (person) {
                                    $.modal.close();
                                    $("#loadingPage").fadeOut();
                                    swal({
                                        title: '',
                                        text: person,

                                    },
                              function (confirmed) {
                                  if (confirmed) {
                                      location = location;

                                  }

                              });
                                }
                            });
                        }
                        else {
                            swal("", "Internal contact exists with this counterparty. Please select different internal user");
                            $("#loadingPage").fadeOut();
                        }
                    },
                    error:
                        function (data) {
                            swal("", "Internal contact exists with this counterparty. Please select different internal user");
                            $("#loadingPage").fadeOut();
                        }
                });
            }
            else {
                var email = $("#txtEmailIDC").val().trim();
                ContactName = $("#txtContactName").val();
                CountryName = $("#ddlCountryC").find('option:selected').text();
                if (ContactName != "") {
                    $.ajax({
                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/counterparty/' + counterpartyID + '/contactsname?Contact=' + ContactName,
                        type: 'GET',
                        dataType: 'json',
                        'Content-Type': 'application/json',
                        cache: false,
                        async: false,
                        headers: { 'eContracts-ApiKey': localStorage.APIKey },
                        success: function (data) {
                            var isFlag = false;
                            if (data != null && data.length > 0) {
                                for (var i = 0; i < data.length; i++) {
                                    if (data[i].EmailID != null && data[i].EmailID != "" && data[i].EmailID != 'undefined') {
                                        if (email != "") {
                                            if (data[i].EmailID.trim().toLowerCase() == email.toLowerCase()) {
                                                isFlag = true;
                                            }
                                        }
                                    }
                                }
                            }
                            if (!isFlag) {
                                $.ajax({
                                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contacts',
                                    type: 'POST',
                                    dataType: 'json',
                                    headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                                    data: {
                                        ContactName: ContactName,
                                        CounterpartyName: counterpartyName,
                                        Role: $("#txtRole").val(),
                                        CounterpartyID: counterpartyID,
                                        AddressLine1: $("#txtAddressLine1C").val(),
                                        AddressLine2: $("#txtAddressLine2C").val(),
                                        City: $("#txtCityC").val(),
                                        State: $("#txtStateC").val(),
                                        Zip: $("#txtZipC").val(),
                                        Country: CountryName,
                                        ContactNo: $("#txtContactNoC").val(),
                                        EmailID: $("#txtEmailIDC").val(),
                                        ModifiedBy: localStorage.UserName,
                                        InternalOrExternal: $('input[type="radio"][name=InternalOrExternal]:checked').val()
                                    },
                                    cache: false,
                                    success: function (person) {
                                        $.modal.close();
                                        $("#loadingPage").fadeOut();
                                        swal({
                                            title: '',
                                            text: person,

                                        },
                                  function (confirmed) {
                                      if (confirmed) {
                                          location = location;


                                      }

                                  });
                                    }
                                });
                            }
                            else {
                                swal("", "EmailID already exists with this contact. Please select different EmailID");
                                $("#loadingPage").fadeOut();
                            }

                        },
                        error: function (data) {
                            $.ajax({
                                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contacts',
                                type: 'POST',
                                dataType: 'json',
                                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                                data: {
                                    ContactName: ContactName,
                                    CounterpartyName: counterpartyName,
                                    Role: $("#txtRole").val(),
                                    CounterpartyID: counterpartyID,
                                    AddressLine1: $("#txtAddressLine1C").val(),
                                    AddressLine2: $("#txtAddressLine2C").val(),
                                    City: $("#txtCityC").val(),
                                    State: $("#txtStateC").val(),
                                    Zip: $("#txtZipC").val(),
                                    Country: CountryName,
                                    ContactNo: $("#txtContactNoC").val(),
                                    EmailID: $("#txtEmailIDC").val(),
                                    ModifiedBy: localStorage.UserName,
                                    InternalOrExternal: $('input[type="radio"][name=InternalOrExternal]:checked').val()
                                },
                                cache: false,
                                success: function (person) {
                                    $.modal.close();
                                    $("#loadingPage").fadeOut();
                                    swal({
                                        title: '',
                                        text: person,

                                    },
                              function (confirmed) {
                                  if (confirmed) {
                                      location = location;


                                  }

                              });
                                }
                            });
                            //swal("", "Contact name exists with this counterparty. Please select different internal user");
                            //$("#loadingPage").fadeOut();
                        }
                    });
                }



            }
        }

    }

}

function contextMenuWork(action, el, pos) {
    switch (action) {
        case "delete":
            {

                var contactName = $(el).find("#ContactName").text();
                swal({
                    title: '',
                    text: "Are you sure you want to <span style=\"font-weight:700\">delete '" + contactName + "'</span>?",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    html: true
                },
   function (confirmed) {
       if (confirmed) {
           $("#loadingPage").fadeIn();
           var contactID = $(el).find("#ContactID").text();
           console.log(contactID);
           $.ajax({
               url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contacts?contactid=' + contactID,
               type: 'DELETE',
               dataType: 'json',
               headers: { 'eContracts-ApiKey': localStorage.APIKey },
               cache: false,
               success: function (data) {
                   $("#loadingPage").fadeOut();


                   swal({
                       title: '',
                       text: data,

                   },
                 function (confirmed) {
                     if (confirmed) {
                         location = location;
                     }

                 });
               }
           });
       }
       return;
   });

                break;
            }
        case "view":
            {
                var contactID = $(el).find("#ContactID").text();
                $('#CounterpartyContactMetadata').empty();
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contacts?contactid=' + contactID,
                    type: 'GET',
                    dataType: 'json',
                    cache: false,
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    success: function (counterpartyContact) {                      
                        var vControls = "";
                        if (counterpartyContact != null) {
                            if (counterpartyContact.ContactName == "")
                                vControls += ' <tr><td height="10" align="left" valign="top" class="content-text clr999 width40 padding_left_20px padding_top_10px" style="color: #999999;">Contact Name : </td><td height="10" align="left" valign="top" class="content-text width58 padding_left_20px padding_top_10px" style="color: #555555;" id="' + counterpartyContact.ContactName + '1"> - </td></tr>';
                            else
                                vControls += ' <tr><td height="10" align="left" valign="top" class="content-text clr999 width40 padding_left_20px padding_top_10px" style="color: #999999;">Contact Name : </td><td height="10" align="left" valign="top" class="content-text width58 padding_left_20px padding_top_10px" style="color: #555555;" id="' + counterpartyContact.ContactName + '1">' + counterpartyContact.ContactName + '</td></tr>';
                            if (counterpartyContact.ContactNo == "")
                                vControls += ' <tr><td height="10" align="left" valign="top" class="content-text clr999 width40 padding_left_20px padding_top_10px" style="color: #999999;">Contact No : </td><td height="10" align="left" valign="top" class="content-text width58 padding_left_20px padding_top_10px" style="color: #555555;" id="' + counterpartyContact.ContactNo + '1"> - </td></tr>';
                            else
                                vControls += ' <tr><td height="10" align="left" valign="top" class="content-text clr999 width40 padding_left_20px padding_top_10px" style="color: #999999;">Contact No : </td><td height="10" align="left" valign="top" class="content-text width58 padding_left_20px padding_top_10px" style="color: #555555;" id="' + counterpartyContact.ContactNo + '1">' + counterpartyContact.ContactNo + '</td></tr>';
                            if (counterpartyContact.CounterpartyName == "")
                                vControls += ' <tr><td height="10" align="left" valign="top" class="content-text clr999 width40 padding_left_20px padding_top_10px" style="color: #999999;">Counterparty Name : </td><td height="10" align="left" valign="top" class="content-text width58 padding_left_20px padding_top_10px" style="color: #555555;" id="' + counterpartyContact.CounterpartyName + '1"> - </td></tr>';
                            else
                                vControls += ' <tr><td height="10" align="left" valign="top" class="content-text clr999 width40 padding_left_20px padding_top_10px" style="color: #999999;">Counterparty Name : </td><td height="10" align="left" valign="top" class="content-text width58 padding_left_20px padding_top_10px" style="color: #555555;" id="' + counterpartyContact.CounterpartyName + '1">' + counterpartyContact.CounterpartyName + '</td></tr>';
                            if (counterpartyContact.Country == ""|| counterpartyContact.Country =="--Select--")
                                vControls += ' <tr><td height="10" align="left" valign="top" class="content-text clr999 width40 padding_left_20px padding_top_10px" style="color: #999999;">Country : </td><td height="10" align="left" valign="top" class="content-text width58 padding_left_20px padding_top_10px" style="color: #555555;" id="' + counterpartyContact.Country + '1"> - </td></tr>';
                            else
                                vControls += ' <tr><td height="10" align="left" valign="top" class="content-text clr999 width40 padding_left_20px padding_top_10px" style="color: #999999;">Country : </td><td height="10" align="left" valign="top" class="content-text width58 padding_left_20px padding_top_10px" style="color: #555555;" id="' + counterpartyContact.Country + '1">' + counterpartyContact.Country + '</td></tr>';
                            if (counterpartyContact.State == "")
                                vControls += ' <tr><td height="10" align="left" valign="top" class="content-text clr999 width40 padding_left_20px padding_top_10px" style="color: #999999;">State : </td><td height="10" align="left" valign="top" class="content-text width58 padding_left_20px padding_top_10px" style="color: #555555;" id="' + counterpartyContact.State + '1"> - </td></tr>';
                            else
                                vControls += ' <tr><td height="10" align="left" valign="top" class="content-text clr999 width40 padding_left_20px padding_top_10px" style="color: #999999;">State : </td><td height="10" align="left" valign="top" class="content-text width58 padding_left_20px padding_top_10px" style="color: #555555;" id="' + counterpartyContact.State + '1">' + counterpartyContact.State + '</td></tr>';
                            if (counterpartyContact.Zip == "")
                                vControls += ' <tr><td height="10" align="left" valign="top" class="content-text clr999 width40 padding_left_20px padding_top_10px" style="color: #999999;">Zip : </td><td height="10" align="left" valign="top" class="content-text width58 padding_left_20px padding_top_10px" style="color: #555555;" id="' + counterpartyContact.Zip + '1"> - </td></tr>';
                            else
                                vControls += ' <tr><td height="10" align="left" valign="top" class="content-text clr999 width40 padding_left_20px padding_top_10px" style="color: #999999;">Zip : </td><td height="10" align="left" valign="top" class="content-text width58 padding_left_20px padding_top_10px" style="color: #555555;" id="' + counterpartyContact.Zip + '1">' + counterpartyContact.Zip + '</td></tr>';
                            if (counterpartyContact.City == "")
                                vControls += ' <tr><td height="10" align="left" valign="top" class="content-text clr999 width40 padding_left_20px padding_top_10px" style="color: #999999;">City : </td><td height="10" align="left" valign="top" class="content-text width58 padding_left_20px padding_top_10px" style="color: #555555;" id="' + counterpartyContact.City + '1">' - '</td></tr>';
                            else
                            vControls += ' <tr><td height="10" align="left" valign="top" class="content-text clr999 width40 padding_left_20px padding_top_10px" style="color: #999999;">City : </td><td height="10" align="left" valign="top" class="content-text width58 padding_left_20px padding_top_10px" style="color: #555555;" id="' + counterpartyContact.City + '1">' + counterpartyContact.City + '</td></tr>';
                            if (counterpartyContact.AddressLine1 == "")
                                vControls += ' <tr><td height="10" align="left" valign="top" class="content-text clr999 width40 padding_left_20px padding_top_10px" style="color: #999999;">AddressLine1 : </td><td height="10" align="left" valign="top" class="content-text width58 padding_left_20px padding_top_10px" style="color: #555555;" id="' + counterpartyContact.AddressLine1 + '1"> - </td></tr>';
                            else
                                vControls += ' <tr><td height="10" align="left" valign="top" class="content-text clr999 width40 padding_left_20px padding_top_10px" style="color: #999999;">AddressLine1 : </td><td height="10" align="left" valign="top" class="content-text width58 padding_left_20px padding_top_10px" style="color: #555555;" id="' + counterpartyContact.AddressLine1 + '1">' + counterpartyContact.AddressLine1 + '</td></tr>';
                            if (counterpartyContact.AddressLine2 == "")
                                vControls += ' <tr><td height="10" align="left" valign="top" class="content-text clr999 width40 padding_left_20px padding_top_10px" style="color: #999999;">AddressLine2 : </td><td height="10" align="left" valign="top" class="content-text width58 padding_left_20px padding_top_10px" style="color: #555555;" id="' + counterpartyContact.AddressLine2 + '1">- </td></tr>';
                            else
                                vControls += ' <tr><td height="10" align="left" valign="top" class="content-text clr999 width40 padding_left_20px padding_top_10px" style="color: #999999;">AddressLine2 : </td><td height="10" align="left" valign="top" class="content-text width58 padding_left_20px padding_top_10px" style="color: #555555;" id="' + counterpartyContact.AddressLine2 + '1">' + counterpartyContact.AddressLine2 + '</td></tr>';
                            if (counterpartyContact.Created == "")
                                vControls += ' <tr><td height="10" align="left" valign="top" class="content-text clr999 width40 padding_left_20px padding_top_10px" style="color: #999999;">Created : </td><td height="10" align="left" valign="top" class="content-text width58 padding_left_20px padding_top_10px" style="color: #555555;" id="' + counterpartyContact.Created + '1"> - </td></tr>';
                            else
                                vControls += ' <tr><td height="10" align="left" valign="top" class="content-text clr999 width40 padding_left_20px padding_top_10px" style="color: #999999;">Created : </td><td height="10" align="left" valign="top" class="content-text width58 padding_left_20px padding_top_10px" style="color: #555555;" id="' + counterpartyContact.Created + '1">' + counterpartyContact.Created + '</td></tr>';
                            if (counterpartyContact.CreatedBy == "")
                                vControls += ' <tr><td height="10" align="left" valign="top" class="content-text clr999 width40 padding_left_20px padding_top_10px" style="color: #999999;">CreatedBy : </td><td height="10" align="left" valign="top" class="content-text width58 padding_left_20px padding_top_10px" style="color: #555555;" id="' + counterpartyContact.CreatedBy + '1"> - </td></tr>';
                            else
                                vControls += ' <tr><td height="10" align="left" valign="top" class="content-text clr999 width40 padding_left_20px padding_top_10px" style="color: #999999;">CreatedBy : </td><td height="10" align="left" valign="top" class="content-text width58 padding_left_20px padding_top_10px" style="color: #555555;" id="' + counterpartyContact.CreatedBy + '1">' + counterpartyContact.CreatedBy + '</td></tr>';
                            if (counterpartyContact.EmailID == "")
                                vControls += ' <tr><td height="10" align="left" valign="top" class="content-text clr999 width40 padding_left_20px padding_top_10px" style="color: #999999;">EmailID : </td><td height="10" align="left" valign="top" class="content-text width58 padding_left_20px padding_top_10px" style="color: #555555;" id="' + counterpartyContact.EmailID + '1"> - </td></tr>';
                            else
                                vControls += ' <tr><td height="10" align="left" valign="top" class="content-text clr999 width40 padding_left_20px padding_top_10px" style="color: #999999;">EmailID : </td><td height="10" align="left" valign="top" class="content-text width58 padding_left_20px padding_top_10px" style="color: #555555;" id="' + counterpartyContact.EmailID + '1">' + counterpartyContact.EmailID + '</td></tr>';
                            if (counterpartyContact.InternalOrExternal == "")
                                vControls += ' <tr><td height="10" align="left" valign="top" class="content-text clr999 width40 padding_left_20px padding_top_10px" style="color: #999999;">InternalOrExternal : </td><td height="10" align="left" valign="top" class="content-text width58 padding_left_20px padding_top_10px" style="color: #555555;" id="' + counterpartyContact.InternalOrExternal + '1">-</td></tr>';
                            else
                                vControls += ' <tr><td height="10" align="left" valign="top" class="content-text clr999 width40 padding_left_20px padding_top_10px" style="color: #999999;">InternalOrExternal : </td><td height="10" align="left" valign="top" class="content-text width58 padding_left_20px padding_top_10px" style="color: #555555;" id="' + counterpartyContact.InternalOrExternal + '1">' + counterpartyContact.InternalOrExternal + '</td></tr>';
                            if (counterpartyContact.Modified == "")
                                vControls += ' <tr><td height="10" align="left" valign="top" class="content-text clr999 width40 padding_left_20px padding_top_10px" style="color: #999999;">Modified : </td><td height="10" align="left" valign="top" class="content-text width58 padding_left_20px padding_top_10px" style="color: #555555;" id="' + counterpartyContact.Modified + '1"> - </td></tr>';
                            else
                                vControls += ' <tr><td height="10" align=left" valign="top" class="content-text clr999 width40 padding_left_20px padding_top_10px" style="color: #999999;">Modified : </td><td height="10" align="left" valign="top" class="content-text width58 padding_left_20px padding_top_10px" style="color: #555555;" id="' + counterpartyContact.Modified + '1">' + counterpartyContact.Modified + '</td></tr>';
                            if (counterpartyContact.ModifiedBy == "")
                                vControls += ' <tr><td height="10" align="left" valign="top" class="content-text clr999 width40 padding_left_20px padding_top_10px" style="color: #999999;">ModifiedBy : </td><td height="10" align="left" valign="top" class="content-text width58 padding_left_20px padding_top_10px" style="color: #555555;" id="' + counterpartyContact.ModifiedBy + '1"> - </td></tr>';
                            else
                                vControls += ' <tr><td height="10" align="left" valign="top" class="content-text clr999 width40 padding_left_20px padding_top_10px" style="color: #999999;">ModifiedBy : </td><td height="10" align="left" valign="top" class="content-text width58 padding_left_20px padding_top_10px" style="color: #555555;" id="' + counterpartyContact.ModifiedBy + '1">' + counterpartyContact.ModifiedBy + '</td></tr>';
                            if (counterpartyContact.Role == "")
                                vControls += ' <tr><td height="10" align="left" valign="top" class="content-text clr999 width40 padding_left_20px padding_top_10px" style="color: #999999;">Role : </td><td height="10" align="left" valign="top" class="content-text width58 padding_left_20px padding_top_10px" style="color: #555555;" id="' + counterpartyContact.Role + '1">-</td></tr>';
                            else
                                vControls += ' <tr><td height="10" align="left" valign="top" class="content-text clr999 width40 padding_left_20px padding_top_10px" style="color: #999999;">Role : </td><td height="10" align="left" valign="top" class="content-text width58 padding_left_20px padding_top_10px" style="color: #555555;" id="' + counterpartyContact.Role + '1">' + counterpartyContact.Role + '</td></tr>';

                        }
                        $("#CounterpartyContactMetadata").append(vControls);
                    }
                });

                $("#viewContact").dialog("option", "title", "View Contact");
                $("#viewContact").dialog("open");
                break;
            }
        case "edit":
            {


                var contactID = $(el).find("#ContactID").text();
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contacts?contactid=' + contactID,
                    type: 'GET',
                    dataType: 'json',
                    cache: false,
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    success: function (counterparty) {
                        $("#txtContactID").val(counterparty.RowKey);
                        $("#txtContactName").val(counterparty.ContactName);
                        if ($("#hdnCounterpartyName").val() != "" && $("#hdnCounterpartyName").val() != null && $("#hdnCounterpartyName").val() != "") {
                            $("#ddlCounterparty option").filter(function (index) { return $(this).text() === $("#hdnCounterpartyName").val(); }).prop('selected', true);
                            $("#ddlCounterparty").prop('disabled', true);
                        }
                        else {
                            $("#ddlCounterparty option").filter(function (index) { return $(this).text() === $("#hdnCounterpartyName").val(); }).prop('selected', true);

                            $("#ddlCounterparty").prop('disabled', false);
                        }
                        //$("#ddlCounterparty option").filter(function (index) { return $(this).text() === counterparty.CounterpartyName; }).prop('selected', true);
                        $("#txtAddressLine1C").val(counterparty.AddressLine1);
                        $("#txtAddressLine2C").val(counterparty.AddressLine2);
                        $("#txtCityC").val(counterparty.City);
                        $("#txtStateC").val(counterparty.State);
                        $("#txtZipC").val(counterparty.Zip);
                        $("#ddlCountryC option").filter(function (index) { return $(this).text() === counterparty.Country; }).prop('selected', true);
                        $("#txtContactNoC").val(counterparty.ContactNo);
                        $("#txtEmailIDC").val(counterparty.EmailID);
                        $("#txtRole").val(counterparty.Role);
                        if (counterparty.InternalOrExternal == "Internal") {
                            $("#InternalUser").show();
                            $(".ExContact").hide();
                            $('input[type="radio"][name=InternalOrExternal][value="Internal"]').prop('checked', true);
                            InternalUser = counterparty.ContactName;
                            InternalUserCounterName = counterparty.CounterpartyName;
                            $("#ddlInternalUser option").filter(function (index) { return $(this).text() === counterparty.ContactName; }).prop('selected', true);
                            $("#ddlInternalUser").removeClass("validelement");
                        }
                        else {
                            $('input[type="radio"][name=InternalOrExternal][value="External"]').prop('checked', true);
                            $("#ddlInternalUser option").filter(function (index) { return $(this).text() === counterparty.ContactName; }).prop('selected', true);
                            $("#InternalUser").hide();
                            $(".ExContact").show();
                            InternalUser = "";
                            $("#ddlInternalUser").addClass("validelement");
                            InternalUserCounterName = "";
                        }
                    }
                });

                $("#addEditContact").dialog("option", "title", "Edit Contact");
                $("#addEditContact").dialog("open");
                break;
            }
        case "viewdetailsCC":
            {
                var entityid = $(el).find("#ContractID").text();
                location = "/Contracts/ContractDetails?ContractID=" + entityid;
                break;
            }
        case "editCC":
            {
                var entityid = $(el).find("#ContractID").text();
                var contracttype = $(el).find("#ContractType").text();
                location = "/Contracts/EditContract?ContractID=" + entityid + '&ContractType=' + encodeURIComponent(contracttype);
                break;
            }
    }
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
                $("#ddlCountryC").append('<option value=' + item + '>' + item + '</option>');
                $("#ddlCountry").append('<option value=' + item + '>' + item + '</option>');
            });
        },
        error:
            function (data) {
            }
    });
}

function BindCounterparty() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            var datalenght = data.length;
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];
                $("#ddlCounterparty").append('<option value=' + item.RowKey + '>' + item.CounterpartyName + '</option>');
            }
        },
        error:
            function (data) {
            }
    });
}


function contextMenuWorkContract(action, el, pos) {

    switch (action) {
        case "delete":
            {
                var contractTitle = $(el).find("#ContractTitle").text();
                swal({
                    title: '',
                    text: "Are you sure you want to <span style=\"font-weight:700\">delete '" + contractTitle + "'</span>?",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    html: true
                },
   function (confirmed) {
       if (confirmed) {
           var entityid = $(el).find("#ContractID").text();
           $.ajax({
               url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?contractid=' + entityid,
               type: 'DELETE',
               dataType: 'json',
               headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
               cache: false,
               success: function (data) {
                   swal({
                       title: '',
                       text: data,

                   },
                     function (confirmed) {
                         if (confirmed) {
                             location = location;
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
                var entityid = $(el).find("#ContractID").text();
                var contracttype = $(el).find("#ContractType").text();

                location = "/Contracts/EditContract?ContractID=" + entityid + '&ContractType=' + encodeURIComponent(contracttype);
                break;
            }
        case "viewdetails":
            {
                var entityid = $(el).find("#ContractID").text();
                location = "/Contracts/ContractDetails?ContractID=" + entityid;
                break;
            }
        case "approve":
            {
                var contractTitle = $(el).find("#ContractTitle").text();
                var contractID = $(el).find("#ContractID").text();
                $("#txtTodoTitle").val('Approval for ' + contractTitle);
                $("#ddlTodoType option").filter(function (index) { return $(this).text() === "Contract Approval"; }).prop('selected', true);
                $("#txtBrowseElement").val(contractTitle);
                $("#txtBrowseElementID").val(contractID);
                $("#trBrowse").css("display", "");
                $("#browse").css("display", "none");
                $("#tdBrowseElement").html("Contract Title");
                $("#dvTodo").dialog("open");
                $('#ddlTodoType').attr('disabled', 'disabled');
                fnChangeAssignedToText();
                break;
            }
        case "review":
            {

                var contractTitle = $(el).find("#ContractTitle").text();
                var contractID = $(el).find("#ContractID").text();
                $("#txtTodoTitle").val('Review for ' + contractTitle);
                $("#ddlTodoType option").filter(function (index) { return $(this).text() === "Contract Review"; }).prop('selected', true);
                $("#txtBrowseElement").val(contractTitle);
                $("#txtBrowseElementID").val(contractID);
                $("#trBrowse").css("display", "");
                $("#browse").css("display", "none");
                $("#tdBrowseElement").html("Contract Title");
                $("#dvTodo").dialog("open");
                $('#ddlTodoType').attr('disabled', 'disabled');
                fnChangeAssignedToText();
                break;
            }
        case "history":
            {
                $("#loadingPage").fadeIn();
                var contractID = $(el).find("#ContractID").text();
                $("#hdContractID").val(contractID);
                CreateContractActivityList();
                break;
            }
        case "share":
            {
                var contractID = $(el).find("#ContractID").text();
                $("#hdContractID").val(contractID);
                var contractTitle = $(el).find("#ContractTitle").text();
                $("#hdContractTitle").val(contractTitle);
                $("#tdShareContract").append("<b>" + contractTitle + "</b>");
                $("#shareContract").dialog("open");
                break;
            }
        case "alerts":
            {
                $("#loadingPage").fadeIn();
                var contractID = $(el).find("#ContractID").text();
                $("#hdContractID").val(contractID);
                CreateAlertList();
                break;
            }
        case "status":
            {
                $("#loadingPage").fadeIn();
                var contractID = $(el).find("#ContractID").text();
                $("#hdContractID").val(contractID);
                var Status = $(el).find("#Status").text();
                $("#hdContractStatus").val(Status);
                var Renewable = $(el).find("#Renewable").text();
                if (Renewable != null && Renewable == "Yes") {
                    $("#hdnIsRenewable").text("Yes");
                } else {
                    $("#hdnIsRenewable").text("No");
                }
                var Extendable = $(el).find("#Extendable").text();
                if (Extendable != null && Extendable == "Yes") {
                    $("#hdnIsExtendable").text("Yes");
                } else {
                    $("#hdnIsExtendable").text("No");
                }
                BindStatus();
                break;
            }
        case "people":
            {
                $("#loadingPage").fadeIn();
                var contractID = $(el).find("#ContractID").text();
                $("#hdContractID").val(contractID);
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?contractid=' + contractID,
                    type: 'GET',
                    cache: false,
                    contentType: false,
                    headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID },
                    processData: false,
                    success: function (item) {
                        $('input[name="ContractPrivacy"][value="' + item.ContractPrivacy + '"]').prop('checked', true);

                        if (item.BusinessOwners != "") {

                            GetValuesAndAutoPopulate("ddlBusinessOwners", item.BusinessOwners);
                        }

                        if (item.ContractManagers != "") {

                            GetValuesAndAutoPopulate("ddlContractManagers", item.ContractManagers);
                        }
                        if (item.Approvers != "") {

                            GetValuesAndAutoPopulate("ddlReviewers", item.Approvers);
                        }

                        if (item.Signees != "") {

                            GetValuesAndAutoPopulate("ddlSignees", item.Signees);
                        }

                        if (item.BusinessUsers != "") {

                            GetValuesAndAutoPopulate("ddlBusinessUsers", item.BusinessUsers);
                        }


                        $("#loadingPage").fadeOut();
                        $("#addEditPeople").dialog("option", "title", "People & Permissions");
                        $("#addEditPeople").dialog("open");
                    }
                });
                break;
            }
        case "duplicate":
            {
                swal({
                    title: '',
                    text: "Are you sure you want to create <span style=\"font-weight:700\">duplicate</span> Contract Record?",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    html: true
                },
   function (confirmed) {
       if (confirmed) {
           var contractID = $(el).find("#ContractID").text();
           var contractType = $(el).find("#ContractType").text();
           location = "/Contracts/EditContract?ContractID=" + contractID + "&ContractType=" + contractType + "&Duplicate=Yes";

       }
       return;
   });

                break;
            }
        case "delete":
            {
                swal({
                    title: '',
                    text: "Are you sure you want to <span style=\"font-weight:700\">delete</span> Contract Record?",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    html: true
                },
   function (confirmed) {
       if (confirmed) {
           var contractID = $(el).find("#ContractID").text();
           $("#hdContractID").val(contractID);
           $.ajax({
               url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?contractid=' + contractID,
               type: 'DELETE',
               dataType: 'json',
               headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
               cache: false,
               success: function (data) {
                   swal({
                       title: '',
                       text: data,

                   },
                     function (confirmed) {
                         if (confirmed) {
                             location = "/Contracts";
                         }

                     });
               }
           });
       }
       return;
   });

                break;
            }
    }
}

function BindPeople() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/users',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            var v = $(data).length;
            $(data).each(function (i, item) {
                var sRowKey = item.RowKey;
                var sUserName = item.UserName;
                var article = '<option value="' + sUserName + '">' + sUserName + '</option>';
                $("#ddlBusinessOwners").append(article);
                $("#ddlContractManagers").append(article);
                $("#ddlReviewers").append(article);
                $("#ddlSignees").append(article);
                $("#ddlBusinessUsers").append(article);
            });

            $("#ddlBusinessOwners").chosen();
            $("#ddlContractManagers").chosen();
            $("#ddlReviewers").chosen();
            $("#ddlSignees").chosen();
            $("#ddlBusinessUsers").chosen();

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

function CreateContractActivityList() {
    $("#contractLogs").empty();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/activities/contracts/' + $("#hdContractID").val() + '?actiontype=',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            var datalenght = data.length;
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];
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
                $("#contractLogs").append(article);
            }
            $("#hdContractID").val('');
            $('#compact-pagination-Activity').pagination({
                items: data.length,
                itemsOnPage: 15,
                type: 'div',
                typeID: 'contractLogs',
                row: 'article',
                cssStyle: 'compact-theme'
            });
            $("#loadingPage").fadeOut();
            $('#contractLogsPopup').dialog('open');
        },
        error: function () {
            var article = '<article class="box1">';
            article += '<div>';
            article += '<p class="text">No History</p>';
            article += '</div>';
            article += '</article>';
            $("#contractLogs").append(article);
            $("#loadingPage").fadeOut();
            $('#contractLogsPopup').dialog('open');
        }
    });
}

function AddShareContract() {
    var vLastRow = $("#tblShareContract tr:last").attr('id');
    var totalFileCount = "2";
    if (typeof vLastRow == "undefined") {
        totalFileCount = "2";
    }
    else {
        totalFileCount = parseInt(vLastRow.replace("trSignee", ""));
        totalFileCount += 1;
    }
    var count = $("#tblShareContract tr").length;


    if (count < 10) {

        var htmlFormatFile = '<tr id="trShareContract' + totalFileCount + '">';
        htmlFormatFile += '<td>';
        htmlFormatFile += '<input id="txtShareContract' + totalFileCount + '" maxlength="42" name="ShareContractName' + totalFileCount + '" placeholder="Name" title="Name" type="text" class="f_inpt width90" />';
        htmlFormatFile += '</td>';
        htmlFormatFile += '<td>';
        htmlFormatFile += '<input id="txtShareContractEmail' + totalFileCount + '" maxlength="50" name="ShareContractEmail' + totalFileCount + '" placeholder="Email ID" title="Email ID" type="text" class="f_inpt width90 validemail" />';
        htmlFormatFile += '</td>';
        htmlFormatFile += '<td style="width:20px">';
        htmlFormatFile += '<a href="javascript:void(0)" onclick="DeleteShareContract(this)"><img src="../Content/Images/icon/delete.png" /></a>';
        htmlFormatFile += '</td>';
        htmlFormatFile += '</tr>';

        $("#tblShareContract").append(htmlFormatFile);

    }
    if (count == 9) {
        $(".addmorelinks").hide();
    }

}

function DeleteShareContract(n) {
    n.parentNode.parentNode.parentNode.removeChild(n.parentNode.parentNode);
    $(".addmorelinks").show();
}

function ShareContract() {
    var vValid = requiredValidator('shareContract');
    if (vValid) {
        var contractForm = $("#frmShareContract").serialize();
        contractForm += "&SendBy=" + localStorage.UserName;
        contractForm += "&Notes=" + $("#txtShareNotesContract").val();
        contractForm += "&ExpIn=" + $("#txtShareExpInContract").val();
        contractForm += "&ContractTitle=" + $("#hdContractTitle").val();
        contractForm += "&AllowComment=" + ($("#chkAllowComment").is(':checked') ? 'Yes' : '');

        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contracts/Share?contractid=' + $("#hdContractID").val(),
            type: 'POST',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
            data: contractForm,
            cache: false,
            success: function (person) {
                swal("", "Contract Shared.");
                $("#shareContract").dialog("close");
                ClearShareForm();
            }
        });
    }
}

function ClearShareForm() {
    $("#hdDocumentID").val('');
    $("#txtShareNotesContract").val('');
    $("#txtShareTo").val('');
    $("#txtShareExpInContract").val('');
    $("#chkAllowComment").prop('checked', false);
    $("#hdContractID").val('');
    $('#tblShareContract').empty();
    var vSignee = '<tr>';
    vSignee += '<td>';
    vSignee += '<input id="txtShareContract1" name="ShareContractName1" maxlength="42" title="Name" placeholder="Name" type="text" class="f_inpt width90 validelement" />';
    vSignee += '</td>';
    vSignee += '<td>';
    vSignee += '<input id="txtShareContractEmail1" name="ShareContractEmail1" maxlength="50" title="Email ID" placeholder="Email ID" type="text" class="f_inpt width90 validelement validemail" />';
    vSignee += '</td>';
    vSignee += '<td style="width:20px">&nbsp;</td>';
    vSignee += '</tr>';
    $('#tblShareContract').html(vSignee);
    $(".validelement").each(function (index, element) {
        $(element).removeClass("error");
        $("#errormsg_" + element.id).remove();
    });
    $(".error").removeClass("error");
}

function CreateAlertList() {
    $("#alertsListAll").html('');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/notifications?contractid=' + $("#hdContractID").val(),
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            if (data.length == 0)
            { $("#alertsListAll").append('<li class="f_p-error">No Alert Sent</li>'); }
            else
            {
                var datalenght = data.length;
                for (var i = 0; i < datalenght; i++) {
                    var item = data[i];
                    var sCategory = item.Category;
                    var sNotificationTitle = item.NotificationTitle;
                    var sNotificationDate = moment(new Date(item.NotificationDate)).format('Do MMM');
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

                    var article = "";
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
                }
                $("#hdContractID").val('');
                $('#compact-pagination-Alerts').pagination({
                    items: data.length,
                    itemsOnPage: 10,
                    type: 'section',
                    typeID: 'alertsListAll',
                    row: 'article',
                    cssStyle: 'compact-theme'
                });
                $("#loadingPage").fadeOut();
                $('#allAlerts').dialog('open');
            }
        },
        error:
            function (data) {
                $("#alertsListAll").append('<li class="f_p-error">No Alert Sent</li>');
            }
    });
}

function BindStatus() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contractstatusesbyCLM',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (contractstatuses) {
            $(contractstatuses).each(function (i, item) {
                var ctrl = "";

                if ((item.ContractStatus.trim() == "Renewed" && $("#hdnIsRenewable").text() == "No") || (item.ContractStatus.trim() == "Extended" && $("#hdnIsExtendable").text() == "No") || (item.ContractStatus.trim() == "Up for Renewal" && $("#hdnIsRenewable").text() == "No"))
                { }
                else {
                    if (item.ContractStatus.trim() != "Renewed") {
                        if ($("#hdContractStatus").val() == item.ContractStatus.trim()) {
                            ctrl = "<li id=" + item.ContractStatus.trim() + "><input id='" + item.RowKey + "' type='radio' checked onclick='javascript:statusclick(this);' name='rdstatus' value=" + encodeURI(item.ContractStatus.trim()) + " class='css-checkbox' /><label for='" + item.RowKey + "' class='css-label'>" + item.ContractStatus.trim() + "</label></li>";
                        } else {
                            ctrl = "<li id=" + item.ContractStatus.trim() + "><input id='" + item.RowKey + "' type='radio' onclick='javascript:statusclick(this);' name='rdstatus' value=" + encodeURI(item.ContractStatus.trim()) + " class='css-checkbox' /><label for='" + item.RowKey + "' class='css-label'>" + item.ContractStatus.trim() + "</label></li>";
                        }
                    }
                }

                if (item.ContractStatus.trim() == "Renewed") {

                }
                else if (item.ContractStatus.trim() == "Extended") {
                    if ($("#hdnIsExtendable").text() != "No") {
                        ctrl += "<div class='f_list' style='padding: 0px 0px 0px 10px;display:none;' id='dvExtendCtrl'><input type='text' id='dtExtendedDate' placeholder='Extended Date' class='f_inpt width90 validdate' /></div>";
                    }
                }
                else if (item.ContractStatus.trim() == "Cancelled") {
                    ctrl += "<div class='f_list' style='padding: 0px 0px 0px 10px;display:none;' id='dvCancelCtrl'><textarea id='txtCancelledReason' placeholder='Reason for Cancellation' rows='3' class='f_text-box width90' /></div>";
                }
                $("#menu34").append(ctrl);

                if ($("#hdContractStatus").val() == "Renewed") {
                    $('#dvRenewCtrl').css("display", "");
                    $('#dvCancelCtrl').css("display", "none");
                }
                else if ($("#hdContractStatus").val() == "Cancelled") {
                    $('#dvCancelCtrl').css("display", "");
                    $('#dvRenewCtrl').css("display", "none");
                }
            });
            $("#dtRenewalDate").datepicker();
            $("#dtExtendedDate").datepicker();
            $("#loadingPage").fadeOut();
            $('#addEditStatus').dialog('open');
        }
    });
}

function statusclick(e) {
    $('input[name="rdstatus"][value="' + decodeURI(e.value) + '"]').prop('checked', true);
    if (decodeURI(e.value) == "Renewed") {
        $('#dvRenewCtrl').css("display", "block");
        $('#dvCancelCtrl').css("display", "none");
        $('#dvExtendCtrl').css("display", "none");
    }
    else if (decodeURI(e.value) == "Extended") {
        $('#dvExtendCtrl').css("display", "block");
        $('#dvCancelCtrl').css("display", "none");
        $('#dvRenewCtrl').css("display", "none");
    }
    else if (decodeURI(e.value) == "Cancelled") {
        $('#dvCancelCtrl').css("display", "block");
        $('#dvRenewCtrl').css("display", "none");
        $('#dvExtendCtrl').css("display", "none");
    }
    else {
        $('#dvCancelCtrl').css("display", "none");
        $('#dvRenewCtrl').css("display", "none");
        $('#dvExtendCtrl').css("display", "none");

    }
}

function imgcheckgeneral() {
    var selectedValue = decodeURI($("input:radio[name=rdstatus]:checked").val());
    if (selectedValue == "Cancelled") {
        if ($("#txtCancelledReason")[0].value == "") {
            swal("", "Enter reason for cancellation.");
            return false;
        } else {
            changestatus();

            return true;
        }
    } else if (selectedValue == "Renewed") {
        if ($("#dtRenewalDate")[0].value == "") {

            swal("", "Select renewal date.");
            return false;
        } else {
            changestatus();
            updaterenewaldate();


            BindMetaData(null);
            return true;
        }
    } else if (selectedValue == "Extended") {
        if ($("#dtExtendedDate")[0].value == "") {

            swal("", "Select extended date.");
            return false;
        } else {
            changestatus();
            updateenddate();

            BindMetaData(null);
            return true;
        }
    } else if (selectedValue == "undefined" || selectedValue == "0" || selectedValue == "") {
        swal("", "Select Status");
        return false;
    } else {
        changestatus();

        return true;
    }
}

function changestatus() {
    $('.ui-button-green-text').parent().attr('disabled', 'disabled');
    var stat = decodeURI($("input:radio[name=rdstatus]:checked").val());
    var vCancelNote = '';
    if (stat == "Cancelled")
    { vCancelNote = "CancelledReason=" + $("#txtCancelledReason").val(); }
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + $("#hdContractID").val() + '/changestatus?status=' + stat,
        type: 'PUT',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
        data: vCancelNote,
        cache: false,
        success: function (result) {
            $('.ui-button-green-text').parent().removeAttr('disabled');
        }
    });
}

function updaterenewaldate() {
    var dt = $("#dtRenewalDate").val();
    var changeEndDate = 'No';
    if ($("#chkUpdateEndDate").is(':checked')) {
        changeEndDate = 'Yes';
    }
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + $("#hdContractID").val() + '/renew?renewdate=' + dt,
        type: 'PUT',
        dataType: 'json',
        async: false,
        data: {
            RenewedBy: localStorage.UserName,
            ModifiedBy: localStorage.UserName
        },
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName, ChangeEndDate: changeEndDate },
        cache: false,
        success: function (result) {
        }
    });
}

function updateenddate() {
    var dt = $("#dtExtendedDate").val();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + $("#hdContractID").val() + '/extend?enddate=' + dt,
        type: 'PUT',
        dataType: 'json',
        async: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
        data: {
            ModifiedBy: localStorage.UserName
        },
        cache: false,
        success: function (result) {
        }
    });
}

function savePeople() {
    $('.ui-button-green-text').parent().attr('disabled', 'disabled');
    var isformvalid = false;
    if (requiredValidator('addNewPeople')) {

        var businessowners = $("#ddlBusinessOwners").val();
        var ba = '';
        $(businessowners).each(function (i, item) {
            if (ba == '') {
                ba = item;
            }
            else {
                ba += "; " + item;
            }
        });

        var contractmanagers = $("#ddlContractManagers").val();
        var cm = '';
        $(contractmanagers).each(function (i, item) {
            if (cm == '') {
                cm = item;
            }
            else {
                cm += "; " + item;
            }
        });

        var approvers = $("#ddlReviewers").val();
        var app = '';
        $(approvers).each(function (i, item) {
            if (app == '') {
                app = item;
            }
            else {
                app += "; " + item;
            }
        });

        var signees = $("#ddlSignees").val();
        var sign = '';
        $(signees).each(function (i, item) {
            if (sign == '') {
                sign = item;
            }
            else {
                sign += "; " + item;
            }
        });

        var businessusers = $("#ddlBusinessUsers").val();
        var bu = '';
        $(businessusers).each(function (i, item) {
            if (bu == '') {
                bu = item;
            }
            else {
                bu += "; " + item;
            }
        });

        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + $("#hdContractID").val() + '/people',
            type: 'PUT',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
            data: {
                ContractPrivacy: $("input[type='radio'][name='ContractPrivacy']:checked").val(),
                PermissionAssignment: "Role-Based",
                BusinessOwners: ba,
                ContractManagers: cm,
                Approvers: app,
                Signees: sign,
                BusinessUsers: bu,
                ModifiedBy: localStorage.UserName
            },
            cache: false,
            success: function (person) {
                $('.ui-button-green-text').parent().removeAttr('disabled');

                swal("", "People & Permissions Setting Saved.");
                $("#addEditPeople").dialog("close");
                $("#hdContractID").val('');
            }
        });

    }
    else {
        $('.ui-button-green-text').parent().removeAttr('disabled');
    }
    return isformvalid;
}



function togglediv(firstObject, secondObject) {
    $("#" + firstObject).slideToggle();
    $("#" + secondObject).slideToggle();
}

function togglediv(firstObject, secondObject, imgObject) {
    $("#" + firstObject).slideToggle();
    $("#" + secondObject).slideToggle();

    var imgObj = $("#" + imgObject);

    if (imgObj.attr("title") == "Collapse") {
        imgObj.attr("title", "Expand");
        imgObj.attr("src", "../Content/Images/dp-ddown.png");
    } else {
        imgObj.attr("title", "Collapse");
        imgObj.attr("src", "../Content/Images/dp-dup.png");
    }
}


function liRemoveRelationship(obj) {
    var child = obj.parentNode;
    var relatedcounterpartyidtodelete = child.id;
    var relatedcounterpartyname1 = child.textContent;
    swal({
        title: '',
        text: "Are you sure you want to delete '<span style=\"font-weight:700\">" + relatedcounterpartyname1 + "</span>'?",
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
             if (getParameterByName('CounterpartyID') != "") {
                 $.ajax({
                     url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/' + getParameterByName('CounterpartyID') + '/relatedcounterparties?relatedcounterpartyid=' + relatedcounterpartyidtodelete,
                     type: 'DELETE',
                     dataType: 'json',
                     headers: { 'eContracts-ApiKey': localStorage.APIKey },
                     cache: false,
                     success: function (data) {
                         location = location;
                         document.getElementById("rel" + relatedcounterpartyidtodelete).disabled = false;
                         relatedcounterpartyname1 = relatedcounterpartyname1.substr(0, relatedcounterpartyname1);
                         relatedcounterpartyname1 = relatedcounterpartyname1.replace(relatedcounterpartyname1.trim(), "");
                         relatedcounterpartyname1 = relatedcounterpartyname1.replace(";;", ";");
                         var n = relatedcounterpartyname1.charAt(0);
                         if (n == ";") {
                             relatedcounterpartyname1 = relatedcounterpartyname1.substr(1, relatedcounterpartyname1.length - 1);
                         }
                         n = relatedcounterpartyname1.charAt(relatedcounterpartyname1.length - 1);
                         if (n == ";") {
                             relatedcounterpartyname1 = relatedcounterpartyname1.substr(0, relatedtextboxval.length - 1);
                         }
                     }
                 });
             }
             else {
                 document.getElementById("rel" + relatedcounterpartyidtodelete).disabled = false;
                 relatedcounterpartyname1 = relatedcounterpartyname1.substr(0, relatedcounterpartyname1);
                 relatedcounterpartyname1 = relatedcounterpartyname1.replace(relatedcounterpartyname1.trim(), "");
                 relatedcounterpartyname1 = relatedcounterpartyname1.replace(";;", ";");
                 var n = relatedcounterpartyname1.charAt(0);
                 if (n == ";") {
                     relatedcounterpartyname1 = relatedcounterpartyname1.substr(1, relatedcounterpartyname1.length - 1);
                 }
                 n = relatedcounterpartyname1.charAt(relatedcounterpartyname1.length - 1);
                 if (n == ";") {
                     relatedcounterpartyname1 = relatedcounterpartyname1.substr(0, relatedtextboxval.length - 1);
                 }
                 location = location;
             }
         }
         return;
     });
}

function BindRelatedCounterparties(counterpartyid) {
    if (counterpartyid == null || counterpartyid == "") { counterpartyid = vCounterpartyID; }
    $("#ulRelatedCounterparties").empty();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/relatedcounterparties?counterpartyid=' + counterpartyid,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (contactsJsonPayload) {
            //manoj
            arrSavedCounterparties = contactsJsonPayload.slice();
            BindSavedCounterparty();
            if (addRelatedButton) {
                addRelatedButton = false;
                $("#popupCounterparties").dialog("close");
                $("#loadingPage").fadeOut();
            }
            //manoj
        },
        error: function (request) {
            arrSavedCounterparties = [];
            relatedcounterpartyname = "";
            if (!$("#lblRelatedCounterpartiesCount").text().trim()) {
                $("#ulRelatedCounterparties").append('No items found.');
            }
            else {
                $("#ulRelatedCounterparties").append('No items found.');
            }
            if (addRelatedButton) {
                addRelatedButton = false;
                $("#popupCounterparties").dialog("close");
                $("#loadingPage").fadeOut();
            }
        }
    });
}
//manoj
function BindSavedCounterparty() {
    relatedcounterpartyname = "";
    //$("#hdnRelatedCounterparties").empty();
    $("#ulRelatedCounterparties").empty();
    $(arrSavedCounterparties).each(function (i, item) {
        var myUrl = '/Counterparty/CounterpartyDetail?CounterpartyID=' + encodeURI(item.RelatedCounterpartyID);
        //$("#hdnRelatedCounterparties").append(item.RelatedCounterpartyID + ';');
        relatedcounterpartyname += ";" + item.RelatedCounterpartyTitle;
        $("#ulRelatedCounterparties").append('<a href="' + myUrl + '">' + item.RelatedCounterpartyTitle + '</a> (' + item.RelatedRelationshipType + ')');
    });
    relatedcounterpartyname = (relatedcounterpartyname.charAt(0) === ';') ? relatedcounterpartyname.substr(1) : relatedcounterpartyname;
}
//manoj

//manoj
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
//manoj

//$("#ddlRelationshipTypeCounterparties").change(function () {
//    $("#ddlRelationshipTypeParent").empty();

//    var jsLang = this.value;
//    switch (jsLang) {
//        case 'Parent':
//            $("#ddlRelationshipTypeParent").append("<option value='Parent'>Parent</option>");
//            $("#ddlRelationshipTypeParent").append("<option value='Subsidiary'>Subsidiary</option>");
//            break;
//        case 'Supplier':
//            $("#ddlRelationshipTypeParent").append("<option value='Supplier'>Supplier</option>");
//            $("#ddlRelationshipTypeParent").append("<option value='Customer'>Customer</option>");
//            break;
//        case 'Prime Contractor':
//            $("#ddlRelationshipTypeParent").append("<option value='Prime Contractor'>Prime Contractor</option>");
//            $("#ddlRelationshipTypeParent").append("<option value='Sub Contractor'>Sub Contractor</option>");
//            break;
//        case 'Dissolved on Merger':
//            $("#ddlRelationshipTypeParent").append("<option value='Dissolved on Merger'>Dissolved on Merger</option>");
//            $("#ddlRelationshipTypeParent").append("<option value='Merged into'>Merged into</option>");
//            break;
//        case 'Other':
//            $("#ddlRelationshipTypeParent").append("<option value='Other'>Other</option>");
//            break;
//    }

//    $('input:checkbox[name="RelatedCounterparty"]:checked').each(function () {
//        $(this).parent().parent().children(".ddl").empty();
//        var vOptions = "<select class='f_inpt width90'>";
//        var jsLang = $("#ddlRelationshipTypeParent option:selected").val();
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
//    });
//});

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

//$("#ddlRelationshipTypeParent").change(function () {

//    $('input:checkbox[name="RelatedCounterparty"]:checked').each(function () {
//        $(this).parent().parent().children(".ddl").empty();
//        var vOptions = "<select class='f_inpt width90'>";
//        var jsLang = $("#ddlRelationshipTypeParent option:selected").val();
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
//    });
//});

//manoj
function AddRelatedCounterparties() {
    addRelatedButton = true;
    ViewCounterpartyRelated();
}
//manoj
var relatedCounterpartiesTag = [];
//function AddRelatedCounterparties() {
//    addRelatedButton = true;
//    var baname = "";
//    //if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
//    //    baname = localStorage.GlobalBusinessAreaLocation;
//    //}
//    $("#loadingPage").fadeIn();
//    $('#loadCounterparties').html('<img src="../Content/Images/icon/loading.gif"> Working on it...');
//    $('#tblPopupCounterparties').empty();
//    $("#txtSearchBoxCounterparties").val("");
//    if ($('#tblPopupCounterparties tr').length <= 0) {
//        $("#txtSearchBoxCounterparties").val("");
//        $.ajax({
//            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/getrelatedcounterparty?searchkeyword=&customquery=&sortbyfield=&orderby=DESC',
//            type: 'GET',
//            dataType: 'json',
//            "Content-Type": "application/json",
//            headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, BusinessAreaLocation: baname, RequiresScope: "" },
//            cache: false,
//            success: function (data) {
//                $('#loadCounterparties').empty();
//                var arr = [];
//                var counterpartyTags = [];
//                if (relatedcounterpartyname != "") {
//                    if (relatedcounterpartyname.trim() != "") {
//                        var prevSelected = relatedcounterpartyname.trim();
//                        $.each(prevSelected.split(";"), function () {
//                            arr.push($.trim(this));
//                        });
//                    }
//                }
//                $(data).each(function (i, item) {
//                    if (getParameterByName("CounterpartyID").trim().indexOf(item.RowKey) > -1) {
//                    }
//                    else {
//                        if (arr.indexOf(item.CounterpartyName.trim()) >= 0) {
//                            //var article = '<tr><td>';
//                            //article += '<input id="rel' + item.RowKey + '" type="checkbox" name="RelatedCounterparty" disabled class="css1-checkbox" value="' + item.CounterpartyName + '" />';
//                            //article += '<label for="' + item.RowKey + '" class="css1-label">' + item.CounterpartyName + '</label>';
//                            //article += '</td>';
//                            //article += '<td class="ddl"><td></tr>'
//                            //$("#tblPopupCounterparties").append(article);
//                            //relatedCounterpartiesTag.push(item.CounterpartyName);
//                        } else {
//                            var article = '<tr><td>';
//                            article += '<input id="rel' + item.RowKey + '" type="checkbox" name="RelatedCounterparty" class="css1-checkbox" value="' + escape(item.CounterpartyName) + '" />';
//                            article += '<label for="' + item.RowKey + '" class="css1-label">' + item.CounterpartyName + '</label>';
//                            article += '</td>';
//                            article += '<td class="ddl"><td></tr>'
//                            $("#tblPopupCounterparties").append(article);
//                            relatedCounterpartiesTag.push(item.CounterpartyName);
//                        }

//                        $("#rel" + item.RowKey).click(function () {
//                            if (this.checked) {
//                                var vOptions = "<select class='f_inpt width90'>";
//                                var jsLang = $("#ddlRelationshipTypeParent option:selected").val();
//                                switch (jsLang) {
//                                    case 'Parent':
//                                        vOptions += '<option value="Subsidiary">Subsidiary</option>';
//                                        break;
//                                    case 'Subsidiary':
//                                        vOptions += '<option value="Parent">Parent</option>';
//                                        break;
//                                    case 'Supplier':
//                                        vOptions += '<option value="Customer">Customer</option>';
//                                        break;
//                                    case 'Customer':
//                                        vOptions += '<option value="Supplier">Supplier</option>';
//                                        break;
//                                    case 'Prime Contractor':
//                                        vOptions += '<option value="Sub Contractor">Sub Contractor</option>';
//                                        break;
//                                    case 'Sub Contractor':
//                                        vOptions += '<option value="Prime Contractor">Prime Contractor</option>';
//                                        break;
//                                    case 'Dissolved on Merger':
//                                        vOptions += '<option value="Merged into">Merged into</option>';
//                                        break;
//                                    case 'Merged into':
//                                        vOptions += '<option value="Dissolved on Merger">Dissolved on Merger</option>';
//                                        break;
//                                    case 'Other':
//                                        vOptions += '<option value="Other">Other</option>';
//                                        break;
//                                }

//                                vOptions += '</select>';
//                                $(this).parent().parent().children(".ddl").append(vOptions);

//                            } else {
//                                $(this).parent().parent().children(".ddl").empty();
//                            }

//                        });
//                    }
//                });

//                var vCount = $("#tblPopupCounterparties tr").length;
//                if (vCount != 0) {
//                    $('#compact-paginationRelatedCounterparties').pagination({
//                        items: vCount,
//                        itemsOnPage: 10,
//                        typeID: 'tblPopupCounterparties',
//                        cssStyle: 'compact-theme'
//                    });
//                } else {
//                    $('#loadCounterparties').html('<p style="margin-left: 20px;">No items found.</p>')
//                }

//                $("#txtSearchBoxCounterparties").autocomplete({
//                    source: relatedCounterpartiesTag,
//                    minLength: 2,
//                    focus: function (event, ui) {
//                        return false;
//                    },
//                    select: function (evn, uidetails) {
//                        $("#txtSearchBoxCounterparties").val(uidetails.item.label);
//                        ViewCounterparties();
//                    }
//                });

//                $("#popupCounterparties").dialog("option", "title", "Related Counterparties");
//                $("#popupCounterparties").dialog("open");
//                $("#loadingPage").fadeOut();
//            },
//            error: function () {
//                $('#loadMA').empty();
//                $('#loadCounterparties').html('');
//                $('#tblPopupCounterparties').html('No items found.')
//                $("#popupCounterparties").dialog("option", "title", "Related Counterparties");
//                $("#popupCounterparties").dialog("open");
//                $("#loadingPage").fadeOut();
//            }
//        });
//    } else {
//        $('#loadMA').empty();
//        $("#popupCounterparties").dialog("option", "title", "Related Contract Records");
//        $("#popupCounterparties").dialog("open");
//        $("#loadingPage").fadeOut();
//    }
//    BindRelatedCounterpartiesPopup(vCounterpartyID);
//}

function BindRelatedCounterpartiesPopup(counterpartyid) {
    if (counterpartyid == null || counterpartyid == "") { counterpartyid = vCounterpartyID; }
    $('#liSelectedCounterparties').empty();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/relatedcounterparties?counterpartyid=' + counterpartyid,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (contactsJsonPayload) {
            var count = 0;
            $(contactsJsonPayload).each(function (i, item) {
                $('#liSelectedCounterparties').append('<span style="font-size:11px;" id=' + item.RowKey + '>' + item.RelatedCounterpartyTitle + ' (' + item.RelatedRelationshipType + ') <img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveRelationship(this);" style="float:right" /></span>');
            });
        },
        error: function (request) {
        }
    });
}


function EditCounterparty() {
    $("#loadingPage").fadeIn();
    //manoj
    //For Related CounterParties
    PrvRelatedCounterparities = [];
    arrRelatedCounterparities = [];
    curRelatedCounterparities = [];
    //arrSavedCounterparties = [];
    //For Related CounterParties
    //manoj
    IsContractExist = false;
    var entityid = $("#hdnCounterpartyID").text();
    var entityname = $("#hdnCounterpartyName").text();
    $("#txtCounterpartyID").val(entityid);
    $('.removableCounterpartyField').remove();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/allcontractsbycounterparty?counterparty=' + encodeURIComponent(entityname),
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            $("#loadingPage").fadeOut();
            if (data.length == 0) {
                IsContractExist = false;
                //$("#addEditCounterparty").dialog("option", "title", "Edit Counterparty");
                //$("#addEditCounterparty").dialog("open");
            } else {
                var contractid = data[0].RowKey;
                var businessareapath = data[0].BusinessAreaPath;
                var vContractlist = $.grep(data, function (n, i) {
                    return (n.RowKey != contractid && n.BusinessAreaPath != businessareapath);
                });
                //if (vContractlist.length > 0) {
                //    swal({
                //        title: '',
                //        text: "This Counterparty exists in another business area, Do you want to continue?",
                //        type: 'warning',
                //        showCancelButton: true,
                //        confirmButtonText: 'Yes',
                //        cancelButtonText: 'No',
                //        html: true
                //    }, function (confirmed) {
                //        if (confirmed) {
                //            getCounterpartyFieldsEdit(entityid);
                //            $("#addEditCounterparty").dialog("option", "title", "Edit Counterparty");
                //            $("#addEditCounterparty").dialog("open");
                //        }
                //    });
                //}
                //else {
                //    getCounterpartyFieldsEdit(entityid);
                //    $("#addEditCounterparty").dialog("option", "title", "Edit Counterparty");
                //    $("#addEditCounterparty").dialog("open");
                //}
                IsContractExist = true;
            }
            getCounterpartyFieldsEdit(entityid);
            $("#addEditCounterparty").dialog("option", "title", "Edit Counterparty");
            $("#addEditCounterparty").dialog("open");
        }, error: function (data) {
            getCounterpartyFieldsEdit(entityid);
            $("#addEditCounterparty").dialog("option", "title", "Edit Counterparty");
            $("#addEditCounterparty").dialog("open");
            $("#loadingPage").fadeOut();
        }
    });
    //var entityid = $("#hdnCounterpartyID").text();
    //$("#txtCounterpartyID").val(entityid);
    //$('.removableCounterpartyField').remove();
    //getCounterpartyFieldsEdit(entityid);
    //$("#addEditCounterparty").dialog("option", "title", "Edit Counterparty");
    //$("#addEditCounterparty").dialog("open");
}


//manoj
function ViewCounterparties() {
    $("#tblPopupCounterparties").html('');
    if ($.trim($("#txtSearchBoxCounterparties").val()) != "") {
        $('#loadCounterparties').html('<img src="../Content/Images/icon/loading.gif"> Searching...');
    } else {
        $('#loadCounterparties').html('<img src="../Content/Images/icon/loading.gif">');
    }
    relatedCounterpartiesTag = [];
    //manoj
    var strBusinessAreaOwnerof = "";
    if ($('input[type="radio"][name=IsGlobal]:checked').val() == "No") {
        if ($("#txtOwnerofBusinessArea").val() != $("#hdnOwnerofBusinessArea").val()) {
            if ($("#txtOwnerofBusinessArea").val() != "") {
                for (var i = 0; i < selectedBusinessAreaID11.length; i++) {

                    var rowKPath = jQuery.grep(BusinessAreaPathRowKey, function (a) {
                        return a[1] === selectedBusinessAreaID11[i][1];
                    });
                    if (rowKPath != null && typeof (rowKPath) != "undefined" && rowKPath.length != 0)
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
    //manoj
    var vURL = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/relatedcounterpartypicker?searchkeyword=' + encodeURIComponent($("#txtSearchBoxCounterparties").val()) + '&customquery=&sortbyfield=Timestamp&orderby=DESC';
    $.ajax({
        url: vURL,
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'BusinessAreaLocation': strBusinessAreaOwnerof },
        cache: false,
        success: function (data) {
            $("#tblPopupCounterparties").html('');
            $('#loadCounterparty').html('');
            var SavedCounterParty = [];
            $(arrSavedCounterparties).each(function (iCounterparty, itemCounterparty) {
                SavedCounterParty.push($.trim(itemCounterparty.RelatedCounterpartyID));
            });
            if (SavedCounterParty.length > 0) {
                data = $.grep(data, function (ndatacollction, idatacollction) {
                    return (SavedCounterParty.indexOf(ndatacollction.RowKey) == -1);
                });
            }
            var datalenght = data.length;
            var prevSelected = [];
            $.each(curRelatedCounterparities, function (ipvr, itempvr) {
                prevSelected.push($.trim(itempvr.CounterpartyName));
            });
            var arr = prevSelected;
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];
                if (vCounterpartyID.indexOf(item.RowKey) > -1) { }
                else {
                    if (arr.indexOf(item.CounterpartyName.trim()) >= 0) {
                        var article = '<tr><td>';
                        article += '<input id="' + item.RowKey + '" type="checkbox" name="RelatedCounterparty" checked class="css1-checkbox" value="' + item.CounterpartyName + '" onchange="javascript:currentrelatedcounterparty(this);" />';
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
                        article += '<input id="' + item.RowKey + '" type="checkbox" name="RelatedCounterparty" class="css1-checkbox" value="' + item.CounterpartyName + '" onchange="javascript:currentrelatedcounterparty(this);" />';
                        article += '<label for="' + item.RowKey + '" class="css1-label">' + item.CounterpartyName + '</label>';
                        article += '</td>';
                        article += '<td class="ddl"><td></tr>'
                        $("#tblPopupCounterparties").append(article);
                    }

                    $("input[id='" + item.RowKey + "'][name='RelatedCounterparty']:checkbox").click(function () {
                        var oID = '';
                        if (this.checked) {
                            oID = this.id;
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
                            if (curRelatedCounterparities.length > 0) {
                                var curRelCuntprty = $.grep(curRelatedCounterparities, function (n, i) {
                                    return (n.RowKey == oID);
                                });
                                var index = curRelatedCounterparities.indexOf(curRelCuntprty[0]);
                                if (index >= 0) {
                                    curRelatedCounterparities[index].ChildRelationship = $(this).parent().parent().children(".ddl").find('option:selected').text();
                                    addselectedcounterparties();
                                }
                            }

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
            $('#loadCounterparties').html('<p style="margin-left: 20px;">No items found.</p>');
            $('#compact-paginationRelatedCounterparties').css('display', 'none');
        }
    });
}
//manoj
//function ViewCounterparties() {
//    var baname = "";
//    //if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
//    //    baname = localStorage.GlobalBusinessAreaLocation;
//    //}
//    $("#tblPopupCounterparties").html('');
//    $('#loadCounterparties').html('<img src="../Content/Images/icon/loading.gif"> Searching...');
//    //manoj
//    var strBusinessAreaOwnerof = "";
//    if ($('input[type="radio"][name=IsGlobal]:checked').val() == "No") {
//        if ($("#txtOwnerofBusinessArea").val() != $("#hdnOwnerofBusinessArea").val()) {
//            if ($("#txtOwnerofBusinessArea").val() != "") {
//                for (var i = 0; i < selectedBusinessAreaID11.length; i++) {

//                    var rowKPath = jQuery.grep(BusinessAreaPathRowKey, function (a) {
//                        return a[1] === selectedBusinessAreaID11[i][1];
//                    });
//                    if (rowKPath != null && typeof (rowKPath) != "undefined" && rowKPath.length != 0)
//                        strBusinessAreaOwnerof += rowKPath[0][0] + ";";
//                }

//                strBusinessAreaOwnerof = strBusinessAreaOwnerof.slice(0, -1)
//            }
//        } else {

//            strBusinessAreaOwnerof = $("#hdnLocOwnerofBusinessArea").val()
//        }
//    }
//    else {
//        $("#txtOwnerofBusinessArea").val('');
//        strBusinessAreaOwnerof = "";
//    }
//    //manoj
//    var vURL = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/relatedcounterpartypicker?searchkeyword=' + encodeURIComponent($("#txtSearchBoxCounterparties").val()) + '&customquery=&sortbyfield=&orderby=DESC';
//    $.ajax({
//        url: vURL,
//        type: 'GET',
//        dataType: 'json',
//        "Content-Type": "application/json",
//        //headers: { 'eContracts-ApiKey': localStorage.APIKey, BusinessAreaLocation: baname },
//        headers: { 'eContracts-ApiKey': localStorage.APIKey, BusinessAreaLocation: strBusinessAreaOwnerof },
//        cache: false,
//        success: function (data) {
//            $("#tblPopupCounterparties").html('');
//            $("#loadCounterparties").css('display', 'none');
//            var datalenght = data.length;
//            var arr = [];
//            var counterpartyTags = [];
//            if (relatedcounterpartyname != "") {
//                if (relatedcounterpartyname.trim() != "") {
//                    var prevSelected = relatedcounterpartyname.trim();
//                    $.each(prevSelected.split(";"), function () {
//                        arr.push($.trim(this));
//                    });
//                }
//            }
//            for (var i = 0; i < datalenght; i++) {
//                var item = data[i];
//                if (getParameterByName("CounterpartyID").trim().indexOf(item.RowKey.trim()) > -1) { }
//                else {
//                    if (arr.indexOf(item.CounterpartyName.trim()) >= 0) {
//                        //var article = '<tr><td>';
//                        //article += '<input id="' + item.RowKey + '" type="checkbox" name="RelatedCounterparty" disabled class="css1-checkbox" value="' + item.CounterpartyName + '" />';
//                        //article += '<label for="' + item.RowKey + '" class="css1-label">' + item.CounterpartyName + '</label>';
//                        //article += '</td>';
//                        //article += '<td class="ddl"><td></tr>'
//                        //$("#tblPopupCounterparties").append(article);
//                        //relatedCounterpartiesTag.push(item.CounterpartyName);
//                    }
//                    else {
//                        var article = '<tr><td>';
//                        article += '<input id="rel' + item.RowKey + '" type="checkbox" name="RelatedCounterparty" class="css1-checkbox" value="' + escape(item.CounterpartyName) + '" />';
//                        article += '<label for="' + item.RowKey + '" class="css1-label">' + item.CounterpartyName + '</label>';
//                        article += '</td>';
//                        article += '<td class="ddl"><td></tr>'
//                        $("#tblPopupCounterparties").append(article);
//                    }


//                    $("#rel" + item.RowKey).click(function () {
//                        if (this.checked) {
//                            var vOptions = "<select class='f_inpt width90'>";
//                            var jsLang = $("#ddlRelationshipTypeParent option:selected").val();
//                            switch (jsLang) {
//                                case 'Parent':
//                                    vOptions += '<option value="Subsidiary">Subsidiary</option>';
//                                    break;
//                                case 'Subsidiary':
//                                    vOptions += '<option value="Parent">Parent</option>';
//                                    break;
//                                case 'Supplier':
//                                    vOptions += '<option value="Customer">Customer</option>';
//                                    break;
//                                case 'Customer':
//                                    vOptions += '<option value="Supplier">Supplier</option>';
//                                    break;
//                                case 'Prime Contractor':
//                                    vOptions += '<option value="Sub Contractor">Sub Contractor</option>';
//                                    break;
//                                case 'Sub Contractor':
//                                    vOptions += '<option value="Prime Contractor">Prime Contractor</option>';
//                                    break;
//                                case 'Dissolved on Merger':
//                                    vOptions += '<option value="Merged into">Merged into</option>';
//                                    break;
//                                case 'Merged into':
//                                    vOptions += '<option value="Dissolved on Merger">Dissolved on Merger</option>';
//                                    break;
//                                case 'Other':
//                                    vOptions += '<option value="Other">Other</option>';
//                                    break;
//                            }

//                            vOptions += '</select>';
//                            $(this).parent().parent().children(".ddl").append(vOptions);

//                        } else {

//                            $(this).parent().parent().children(".ddl").empty();
//                        }

//                    });
//                }
//            }
//            var vCount = $("#tblPopupCounterparties tr").length;
//            if (vCount != 0) {
//                $('#loadCounterparties').html('');
//                $('#compact-paginationRelatedCounterparties').css('display', '');
//                $('#compact-paginationRelatedCounterparties').pagination({
//                    items: vCount,
//                    itemsOnPage: 10,
//                    typeID: 'tblPopupCounterparties',
//                    cssStyle: 'compact-theme'
//                });
//            } else {
//                $('#loadCounterparties').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>')
//                $('#compact-paginationRelatedCounterparties').css('display', 'none');
//            }
//        },
//        error: function () {
//            $('#compact-paginationRelatedCounterparties').css('display', 'none');
//            $('#loadCounterparties').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>')
//        }
//    });

//}


function DeleteCounterpartyproceed(entityid, entityname) {
    var legalEntityName = entityname;
    swal({
        title: '',
        text: "Are you sure you want to <span style=\"font-weight:700\">delete '" + legalEntityName + "'</span>?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        html: true
    },
function (confirmed) {
    if (confirmed) {
        $("#loadingPage").fadeIn();
        var entityid = $("#hdnCounterpartyID").text();
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty?counterpartyid=' + entityid,
            type: 'DELETE',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            cache: false,
            success: function (data) {
                $("#loadingPage").fadeOut();
                swal({
                    title: '',
                    text: data,
                },
                function (confirmed) {
                    if (confirmed) {
                        location = "../../Counterparty/";
                    }
                });
            }
        });
    }
    return;
});
}

function DeleteCounterparty() {
    var entityid = $("#hdnCounterpartyID").text();
    var entityname = $("#hdnCounterpartyName").text();
    //check if any contract exist with this counterparty
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/allcontractsbycounterparty?counterparty=' + encodeURIComponent(entityname),
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            if (data.length == 0) {
                DeleteCounterpartyproceed(entityid, entityname);
            } else {
                var contractid = data[0].RowKey;
                var businessareapath = data[0].BusinessAreaPath;
                var vContractlist = $.grep(data, function (n, i) {
                    return (n.RowKey != contractid && n.BusinessAreaPath != businessareapath);
                });
                if (vContractlist.length > 0) {
                    swal("", "This counterparty exists in another business area, So cannot be deleted since related Contract Records exits.");
                }
                else {
                    DeleteCounterpartyproceed(entityid, entityname);
                }
                //swal("", "This counterparty cannot be deleted since Related Contract Records exits.");
            }
        }, error: function (data) {
            DeleteCounterpartyproceed(entityid, entityname);
        }
    });


}

var prev_val;
$('#ddlStatus').focus(function () {
    prev_val = $(this).val();
}).change(function (e) {
    if (IsContractExist == true) {
        swal({
            title: '',
            text: "Contracts exists with this counterparty,Do you want to proceed?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            html: true
        },
function (confirmed) {
    if (!confirmed) {
        $('#ddlStatus option[value="' + prev_val + '"]').prop('selected', true);
        //! status change
    }

});
    }
});

//manoj
function CreateRelatedCounterparies(conterpartyid, counterpartyname) {
    if (addRelatedButton) {
        $("#loadingPage").fadeIn();
    }
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
            arrSavedCounterparties = [];
            if (addRelatedButton) {
                BindRelatedCounterparties();
            }
        },
        error: function (request) {
            PrvRelatedCounterparities = [];
            arrRelatedCounterparities = [];
            curRelatedCounterparities = [];
            arrSavedCounterparties = [];
            if (addRelatedButton) {
                BindRelatedCounterparties();
            }
        }
    });
}
//manoj

//function CreateRelatedCounterparties(counterpartyid, counterpartytitle) {
//    var vRelatedCounterpartyID = "";
//    var vRelatedCounterpartyTitle = "";
//    var vChildRelation = "";
//    vRelatedCounterpartyID = vCoounterpartyId;
//    vRelatedCounterpartyTitle = vCoounterparty;
//    $('input:checkbox[name="RelatedCounterparty"]:checked').each(function () {
//        if (vRelatedCounterpartyID == "") {
//            vRelatedCounterpartyID = this.id.trim();
//            vRelatedCounterpartyTitle = unescape(this.value);
//            vChildRelation = $(this).parent().parent().children(".ddl").find('option:selected').text();
//        }
//        else {
//            vRelatedCounterpartyID += "; " + this.id.trim();
//            vRelatedCounterpartyTitle += "; " + unescape(this.value);
//            vChildRelation += "; " + $(this).parent().parent().children(".ddl").find('option:selected').text();
//        }
//    });
//    if (requiredValidator('popupCounterparties', false)) {
//        if (vRelatedCounterpartyID != "") {
//            $("#loadingPage").fadeIn();
//            $.ajax({
//                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/' + counterpartyid + '/relatedcounterparties',
//                type: 'POST',
//                dataType: 'json',
//                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
//                data: {
//                    CounterpartyID: counterpartyid,
//                    CounterpartyTitle: counterpartytitle,
//                    RelatedCounterpartyID: vRelatedCounterpartyID,
//                    RelatedCounterpartyTitle: vRelatedCounterpartyTitle,
//                    RelationshipType: $("#ddlRelationshipTypeParentedit").find('option:selected').text(),
//                    RelatedRelationshipType: vChildRelation,
//                    CreatedBy: localStorage.UserName,
//                    ModifiedBy: localStorage.UserName,
//                },
//                cache: false,
//                success: function (person) {
//                    //alert('Related Counterparty Saved');
//                    swal("", "Related Counterparty Saved");
//                    $("#popupCounterparties").dialog("close");
//                    $("#loadingPage").fadeOut();
//                    BindRelatedCounterparties();
//                },
//                error: function (request) {
//                    $("#loadingPage").fadeOut();
//                }
//            });
//            return true;
//        } else {
//            // alert('No counterparty has been selected.');
//            swal("", "No counterparty has been selected.");
//            return false;
//        }
//    }

//}

$("#ddlRelationshipTypeCounterpartiesedit").change(function () {
    $("#ddlRelationshipTypeParentedit").empty();

    var jsLang = this.value;
    switch (jsLang) {
        case 'Parent':
            $("#ddlRelationshipTypeParentedit").append("<option value='Parent'>Parent</option>");
            $("#ddlRelationshipTypeParentedit").append("<option value='Subsidiary'>Subsidiary</option>");
            break;
        case 'Supplier':
            $("#ddlRelationshipTypeParentedit").append("<option value='Supplier'>Supplier</option>");
            $("#ddlRelationshipTypeParentedit").append("<option value='Customer'>Customer</option>");
            break;
        case 'Prime Contractor':
            $("#ddlRelationshipTypeParentedit").append("<option value='Prime Contractor'>Prime Contractor</option>");
            $("#ddlRelationshipTypeParentedit").append("<option value='Sub Contractor'>Sub Contractor</option>");
            break;
        case 'Dissolved on Merger':
            $("#ddlRelationshipTypeParentedit").append("<option value='Dissolved on Merger'>Dissolved on Merger</option>");
            $("#ddlRelationshipTypeParentedit").append("<option value='Merged into'>Merged into</option>");
            break;
        case 'Other':
            $("#ddlRelationshipTypeParentedit").append("<option value='Other'>Other</option>");
            break;
    }

    $('input:checkbox[name="Generic"]:checked').each(function () {
        $(this).parent().parent().children(".ddl").empty();
        var vOptions = "<select class='f_inpt width90'>";
        var jsLang = $("#ddlRelationshipTypeParentedit option:selected").val();
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
    });
});
$("#ddlRelationshipTypeParentedit").change(function () {
    $('input:checkbox[name="Generic"]:checked').each(function () {
        $(this).parent().parent().children(".ddl").empty();
        var vOptions = "<select class='f_inpt width90'>";
        var jsLang = $("#ddlRelationshipTypeParentedit option:selected").val();
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
    });
});

//CounterParty Businessarea
var BAOwnersselecteditems = [];
function ViewOwnerofBusinessArea() {

    $('#txtBAOwnerofPath').val("");
    $('#txtBAOwnerof').val("");


    if ($("#txtOwnerofBusinessArea").val() != "") {
        // BAOwnersselecteditems = $("#txtOwnerofBusinessArea").val().split(';');
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
        $("#trcp-RgBusi").show();
        if (thisBusinessAreaName != "")
            addDefaultBusinessareaCounterparty();
        $("#txtOwnerofBusinessArea").addClass("validelement");
    }
    //manoj
    $("#RelatedCounterparties").val('');
    PrvRelatedCounterparities = [];
    arrRelatedCounterparities = [];
    curRelatedCounterparities = [];
    var SavedCounterparties = "";
    $(arrSavedCounterparties).each(function (isvcount, itemsvcount) {
        SavedCounterparties += ";" + itemsvcount.RelatedCounterpartyTitle;
    });
    $("#RelatedCounterparties").val((SavedCounterparties.charAt(0) === ';') ? SavedCounterparties.substr(1) : SavedCounterparties);
    //manoj
});
function addDefaultBusinessareaCounterparty() {


    $('#txtBAOwnerofPath').val(thisContractAreaNameRowKey);
    $('#txtBAOwnerof').val(thisBusinessAreaName);

    // Find and remove item from an array
    var i = BAOwnersselecteditems.indexOf(thisBusinessAreaPath);
    if (i != -1) {

    } else {
        BAOwnersselecteditems.push(thisBusinessAreaPath);
        $('#liSelectedBAOwners').append('<span style="font-size:11px;">' + thisBusinessAreaName + '</span>');
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
var selectedBusinessAreaID11 = [];
var selectedBusinessAreaID11Temp = [];
var DeletedBusinessAreaID = [];
function treeviewclick11(obj) {
    var strBusinessAreaName = obj.textContent;
    var rowKey = obj.parentNode.parentNode.childNodes[2].textContent;
    var parentBusinessAreaID = obj.parentNode.parentNode.childNodes[1].textContent;
    var contractAreaName = obj.parentNode.parentNode.childNodes[3].textContent;
    var contractAreaNameOwner = obj.parentNode.parentNode.childNodes[4].textContent;

    //var rowKey = obj.parentNode.parentNode.childNodes[1].textContent;
    //var parentBusinessAreaID = obj.parentNode.parentNode.childNodes[0].textContent;
    //var contractAreaName = obj.parentNode.parentNode.childNodes[2].textContent;
    //var contractAreaNameOwner = obj.parentNode.parentNode.childNodes[3].textContent;


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

function addDefaultBusinessareaCounterparty() {


    $('#txtBAOwnerofPath').val(thisContractAreaNameRowKey);
    $('#txtBAOwnerof').val(thisBusinessAreaName);

    // Find and remove item from an array
    var i = BAOwnersselecteditems.indexOf(thisBusinessAreaPath);
    if (i != -1) {

    } else {
        BAOwnersselecteditems.push(thisBusinessAreaPath);
        $('#liSelectedBAOwners').append('<span style="font-size:11px;">' + thisBusinessAreaName + '</span>');
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
$('input[type=radio][name=InternalOrExternal]').change(function () {
    if (this.value == 'External') {
        $("#InternalUser").hide();
        $("#txtContactName").addClass("validelement");
        $("#ddlInternalUser").removeClass("validelement");
        $(".ExContact").show();

    }
    else if (this.value == 'Internal') {
        $("#InternalUser").show();
        $("#ddlInternalUser").addClass("validelement");
        $("#txtContactName").removeClass("validelement");
        $(".ExContact").hide();

    }
});

function GetContractValueSetting() {
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

        }
    });
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

//manoj
//For Related Counterparty
//function GetRelatedCounterpartiesPopup(counterpartyid) {
//    if (typeof counterpartyid != 'undefined' && counterpartyid != null && counterpartyid != "") {
//        //if (counterpartyid == null || counterpartyid == "") { counterpartyid = vCounterpartyID; }
//        $('#liRelatedCounterparties').empty();
//        $.ajax({
//            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/relatedcounterparties?counterpartyid=' + counterpartyid,
//            type: 'GET',
//            dataType: 'json',
//            headers: { 'eContracts-ApiKey': localStorage.APIKey },
//            cache: false,
//            success: function (contactsJsonPayload) {
//                //var bindHtml = "";
//                //$(contactsJsonPayload).each(function (i, item) {
//                //    bindHtml+='<span style="font-size:11px;" id=' + item.RowKey + '>' + item.RelatedCounterpartyTitle + ' (' + item.RelatedRelationshipType + ') <img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveRelationship(this);" style="float:right" /></span>';
//                //});
//                //$('#liRelatedCounterparties').html(bindHtml);
//                arrSavedCounterparties = contactsJsonPayload.slice();
//            },
//            error: function (request) {
//                arrSavedCounterparties = [];
//                //$('#liRelatedCounterparties').html('');
//            }
//        });
//    } else {
//        arrSavedCounterparties = [];
//    }
//}

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
    //manoj
    //Saved Counterparties
    SelectedCounterpartiesHTML = "";
    $(arrSavedCounterparties).each(function (i, item) {
        SelectedCounterpartiesHTML += '<span style="font-size:11px;" id=' + item.RelatedCounterpartyID + '>' + item.RelatedCounterpartyTitle + ' (' + item.RelatedRelationshipType + ') <img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveSavedCounterPartyRelationship(this);" style="float:right" /></span>'
    });
    $('#liRelatedCounterparties').html(SelectedCounterpartiesHTML);
    //Saved Counterparties
    //manoj
}

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

function liRemoveSavedCounterPartyRelationship(obj) {
    var child = obj.parentNode;
    var relatedcounterpartyidtodelete = child.id;
    var relatedcounterpartynametoremove = child.textContent;
    swal({
        title: '',
        text: "Are you sure to delete '<span style=\"font-weight:700\">" + relatedcounterpartynametoremove + "</span>'?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        html: true
    },
     function (confirmed) {
         if (confirmed) {
             $("#loadingPage").fadeIn();
             child.parentNode.removeChild(child);
             var relatedcounterpartyid = child.id;
             arrSavedCounterparties = $.grep(arrSavedCounterparties, function (nSavedCP, iSavedCP) {
                 return (nSavedCP.RelatedCounterpartyID != relatedcounterpartyid);
             });
             if (vCounterpartyID != "") {
                 $.ajax({
                     url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/' + vCounterpartyID + '/relatedcounterparties?relatedcounterpartyid=' + relatedcounterpartyidtodelete,
                     type: 'DELETE',
                     dataType: 'json',
                     headers: { 'eContracts-ApiKey': localStorage.APIKey },
                     cache: false,
                     success: function (data) {
                         var resultvaluetobind = [];
                         $(arrSavedCounterparties).each(function (inSavedCP, itemnSavedCP) {
                             resultvaluetobind.push($.trim(itemnSavedCP.RelatedCounterpartyTitle));
                         });
                         $(curRelatedCounterparities).each(function (iCurCP, itemCurCP) {
                             resultvaluetobind.push($.trim(itemCurCP.CounterpartyName));
                         });
                         $("#RelatedCounterparties").val(resultvaluetobind.join(";"));
                         BindSavedCounterparty();
                         $("#loadingPage").fadeOut();
                         AddRelatedCounterparties();
                     }
                 });
             }
         }
         return;
     });
}
//For Related Counterparty
//manoj
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
    //if (bowser.msie) {
    //    if (bowser.version == 10) {
    //        Openinbrowser = false;
    //    }
    //}
    return Openinbrowser;
}

function getQueryStringFromValue(url, name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(url);
    return results == null ? url : decodeURIComponent(results[1].replace(/\+/g, " "));
}
//manoj


function Loading_View_trigger() {
    GetContractValueSetting();
    BindCounterpartyType();

    if (localStorage.UserType == "Business User") {
        $("#editCPindetails").css("display", "none");
        $(".Contribute").css("display", "none");
        $(".contributeCounterparty").css("display", "none");
    }
    else {
        $("#editCPindetails").css("display", "");
        $(".Contribute").css("display", "");
        $(".contributeCounterparty").css("display", "");
    }
}

function bindPhoneNumberEdit(id, countryCode) {
    $("#" + id).intlTelInput({
        initialCountry: countryCode,
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
    $("." + id.name).css("display", "none");
    var CommentYes = $("#hdnYes" + id.name).val();
    var CommentNo = $("#hdnNo" + id.name).val();
    var CommentRequired = $("#hdnRequired" + id.name).val();
    var vControls = "<li class='removableCounterpartyField'>";
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
            $("#" + id.id).parent().parent().after(vControls);
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
            $("#" + id.id).parent().parent().after(vControls);
        } else {
            $("." + id.name).css("display", "none");
        }
    }
}