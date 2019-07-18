var vUserList = "";
var thisBusinessAreaName = "";
var thisContractAreaName = "";
var thisBusinessAreaNameRowKey = "";
var thisContractAreaNameRowKey = "";
var thisBusinessAreaPath = '';
//manoj
//For Related Counterparty
var PrvRelatedCounterparities = [];
var arrRelatedCounterparities = [];
var curRelatedCounterparities = [];
//For Related Counterparty
var AllowToProcess = "";
//manoj
var multipleChecksDocumentID = [];

$(document).ready(function () {
    if (typeof localStorage.GlobalBusinessAreaLocation != 'undefined') {
        if (localStorage.GlobalBusinessAreaLocation == "All") {
            if (localStorage.DefaultBusinessArea != "") {
                var vDBAarr = localStorage.DefaultBusinessArea.split('>');
                var vDBA = vDBAarr.slice(-1)[0].trim();
                thisContractAreaName = localStorage.DefaultBusinessArea.split('>')[0].trim();
                thisBusinessAreaName = vDBA;//Business Area +';'+ Contract Area

                businessAreaPath = localStorage.DefaultBusinessArea;
                thisBusinessAreaPath = localStorage.DefaultBusinessArea;
                //$("#txtOwnerofBusinessArea").val(vDBA);
                $('input[type="radio"][name=IsGlobal][value="No"]').prop('checked', true);
                //$("#hdnLocOwnerofBusinessArea").val(businessAreaPath);
                //$("#hdnOwnerofBusinessArea").val(vDBA);

            }
            else {
                //$("#txtOwnerofBusinessArea").val('');
                $('input[type="radio"][name=IsGlobal][value="Yes"]').prop('checked', true);
                //$("#hdnLocOwnerofBusinessArea").val("");
                //$("#hdnOwnerofBusinessArea").val("");

            }
        } else {
            thisContractAreaName = localStorage.GlobalBusinessAreaLocation.split('>')[0].trim();
            thisBusinessAreaName = localStorage.GlobalBusinessArea;//Business Area +';'+ Contract Area

            businessAreaPath = localStorage.GlobalBusinessAreaLocation;
            thisBusinessAreaPath = localStorage.GlobalBusinessAreaLocation;
            //$("#txtOwnerofBusinessArea").val(localStorage.GlobalBusinessArea);
            //$("#hdnLocOwnerofBusinessArea").val(businessAreaPath);
            //$("#hdnOwnerofBusinessArea").val(localStorage.GlobalBusinessArea);
            //$("#BusinessAreaMultiChoice").css('display', 'none');
            $('input[type="radio"][name=IsGlobal][value="No"]').prop('checked', true);


        }
    } else {
        if (localStorage.DefaultBusinessArea != "" && typeof localStorage.DefaultBusinessArea != 'undefined') {
            var vDBAarr = localStorage.DefaultBusinessArea.split('>');
            var vDBA = vDBAarr.slice(-1)[0].trim();
            thisContractAreaName = localStorage.DefaultBusinessArea.split('>')[0].trim();
            thisBusinessAreaName = vDBA;//Business Area +';'+ Contract Area

            businessAreaPath = localStorage.DefaultBusinessArea;
            thisBusinessAreaPath = localStorage.DefaultBusinessArea;

            // $("#BusinessAreaMultiChoice").css('display', 'none');
            $('input[type="radio"][name=IsGlobal][value="Yes"]').prop('checked', true);

        }
        else {

            $('input[type="radio"][name=IsGlobal][value="No"]').prop('checked', true);

        }
    }


    getCounterpartyFields();
    BindCounterpartyType();
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
    //manoj
    //For Related Counterparty
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
                $(this).dialog("close");
            }
        }
    });
    //For Related Counterparty
    //manoj

    $("#browseGeneric").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        modal: true,
        dialogClass: "popup_width100",
        buttons: {
            "OK": function () {
                var s = false;
                var vCoounterparty = "";

                var my_data = $(this).data('param_1')
                if (multipleChecksDocumentID != null && multipleChecksDocumentID.length > 0) {
                    var listdetails = '';
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

                // if (s) {

                // }
            },
            Cancel: function () {
                multipleChecksDocumentID = [];
                $('#liSelectedRU').empty();
                $(this).dialog("close");
            }
        }
    });


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
            $(metadataFields).each(function (i, item) {
                if (item != null && item.FieldName != null) {
                    if ((item.FieldName == "CounterpartyName") || (item.FieldName == "CounterpartyType") || (item.FieldName == "Status")) {
                    }
                    else {
                        if (item.ShowInCreateForm == "true") {
                            var vControls = "";
                            var vDate = "";
                            var vNumber = "";
                            var vPhoneNumber = "";
                            var PhoneID = "";
                            var PhoneCountry = "";
                            var vEmail = "";
                            var vMultiDDL = "";
                            var vUser = "";
                            var vNumberD = "";
                            var vNumberP = "";
                            var vNumberPD = "";
                            var vMarginTop = "margin-top-8";
                            if (item.Required == "true") {
                                vControls += '<div class="form-input-group"><div class="row-group"><label class="col3 m12 ' + vMarginTop + '">' + item.FieldDisplayName + '<span class="text-red">*</span>';
                                if (item.FieldHelp == "true") {
                                    // vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                                    //vControls += '<div class="col3 m12">';
                                    //vControls += '<div class="success-input-msg margin-top-8">';
                                    vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                                    //vControls += '</div>'
                                    //vControls += '</div>'
                                }
                                // vControls += '     </p><div>';
                                vControls += '</label>';
                            } else {
                                vControls += '<div class="form-input-group"><div class="row-group"><label class="col3 m12 ' + vMarginTop + '">' + item.FieldDisplayName;
                                if (item.FieldHelp == "true") {
                                    //    vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                                    //vControls += '<div class="col3 m12">';
                                    //vControls += '<div class="success-input-msg margin-top-8">';
                                    vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>';

                                    //vControls += '</div>'
                                    //vControls += '</div>'
                                }
                                vControls += '</label>';
                                // vControls += '     </p><div>';
                            }
                            if (item.FieldType == "Single Line Text") {
                                if (item.FieldName == "Country") {
                                    if (item.Required == "true") {
                                        vControls += "<div class='col6 m12'><select id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "'  class='form-contro validelement'>";

                                    } else {
                                        vControls += "<div class='col6 m12'><select id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro'>";
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
                                    vControls += '<label>' + item.Description + '</label>';
                                    //if (item.FieldHelp == "true") {
                                    //    vControls += '<span> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                                    //}
                                    vControls += '</div></li>';
                                } else {
                                    if (item.Required == "true") {
                                        vControls += "<div class='col6 m12'><input type='text' id=" + item.FieldName + " maxlength='100' name=" + item.FieldName + " class='form-contro validelement'>";
                                    } else {
                                        vControls += "<div class='col6 m12'><input type='text' id=" + item.FieldName + " maxlength='100' name=" + item.FieldName + " class='form-contro'>";
                                    }
                                    vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
                                    vControls += '</div>';
                                }
                            }
                            else if (item.FieldType == "Multi Line Text") {
                                if (item.Required == "true") {
                                    vControls += "<div class='col6 m12'><textarea name=" + item.FieldName + " maxlength='300' id=" + item.FieldName + " title='" + item.FieldDisplayName + "' cols='40' rows='5' class='form-contro validelement'></textarea><label class='col12 p-text text-left'></label>";
                                } else {
                                    vControls += "<div class='col6 m12'><textarea name=" + item.FieldName + " maxlength='300' id=" + item.FieldName + " title='" + item.FieldDisplayName + "' cols='40' rows='5' class='form-contro'></textarea><label class='col12 p-text text-left'></label>";
                                }
                                vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
                                vControls += '</div>';
                            }
                            else if (item.FieldType == "Hyperlink") {
                                //manoj
                                //for Hyperlink
                                var Hyperlinkvalue = item.DefaultURL;
                                if (item.Required == "true") {
                                    vControls += "<div class='col6 m12'><input type='text' id=" + item.FieldName + " maxlength='2083' placeholder='http://www.' name=" + item.FieldName + " value = '" + Hyperlinkvalue + "' class='form-contro  validelement validwebsite'>";
                                } else {
                                    vControls += "<div class='col6 m12'><input type='text' id=" + item.FieldName + " maxlength='2083' placeholder='http://www.' name=" + item.FieldName + " value = '" + Hyperlinkvalue + "' class='form-contro validwebsite'>";
                                }
                                vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
                                vControls += '</div>';
                                vControls += '<div class="col3 m1">';
                                vControls += '<div class="success-input-msg margin-top-8">';
                                vControls += '<a href="javascript:void(0)" class="linkText" title="' + item.FieldDisplayName + '" onclick="navigateurl(\'' + item.FieldName + '\')"> Navigate</a>';
                                vControls += '</div>';
                                vControls += '</div>';
                                //for Hyperlink
                                //manoj
                            }
                            else if (item.FieldType == "Phone Number") {
                                //Vinod

                                vControls += '<div class="wid col6 m12">';
                                if (item.Required == "true") {
                                    vControls += "<input type='text' id=" + item.FieldName + "  title='" + item.FieldDisplayName + "'  class='form-contro validelement validPhone fieldphonecontrol' />";
                                } else {
                                    vControls += "<input type='text' id=" + item.FieldName + " title='" + item.FieldDisplayName + "'  class='form-contro validPhone fieldphonecontrol' />";
                                }
                                vControls += '<input type="hidden" id="Hdn' + item.FieldName + '" name="country" value="' + item.Country + '">';
                                vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
                                vControls += '</div>';
                                vControls += '<div class="col3 m12">';
                                vControls += '<div class="success-input-msg margin-top-8">';

                                vControls += '</div>'
                                vControls += '</div>'
                                vPhoneNumber = vControls;
                                PhoneID = item.FieldName;
                                PhoneCountry = item.Country;
                            }
                            else if (item.FieldType == "Date") {
                                vControls += '<div class="col6 m12">';
                                if (item.Required == "true") {
                                    vControls += "<input type='text' id=" + item.FieldName + " title='" + item.FieldDisplayName + "'  class='form-contro form-contro-Date validelement validdate form_input fielddatecontrol" + item.FieldName + "'/>";
                                } else {
                                    vControls += "<input type='text' id=" + item.FieldName + "  title='" + item.FieldDisplayName + "' class='form-contro form-contro-Date validdate form_input fielddatecontrol " + item.FieldName + "'/>";
                                }
                                vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
                                vControls += '</div>';

                                vDate = item.FieldName;
                            }
                            else if (item.FieldType == "Choice") {
                                if (item.Required == "true") {
                                    vControls += "<div class='col6 m12'><select id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "'  class='form-contro validelement'>>";

                                } else {
                                    vControls += "<div class='col6 m12'><select id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro'>";
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
                                vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
                                vControls += '</div>';
                                //if (item.FieldHelp == "true") {
                                //    vControls += '<span> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                                //}

                            } else if (item.FieldType == "Lookup") {
                                vControls += '<div class="col6 m11">';
                                if (item.FieldName == "RelatedCounterparties") {

                                    if (item.Required == "true") {
                                        vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro validelement' readonly='readonly' type='text' />";
                                    } else {
                                        vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro'  readonly='readonly' type='text' />";
                                    }
                                    vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
                                    vControls += '</div>';
                                    vControls += '<div class="col3 m1">';
                                    vControls += '<div class="success-input-msg margin-top-8">';
                                    //if (item.FieldHelp == "true") {
                                    //    vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                                    //}
                                    vControls += "<a href='javascript:void(0)' class='linkText' id='" + item.FieldDisplayName + "' title='" + item.FieldName + "' onclick='ViewCounterpartyRelated(this)'> Browse</a>";
                                    vControls += '</div>';
                                    vControls += '</div>';
                                } else {
                                    if (item.Required == "true") {
                                        vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro validelement'>";
                                    } else {
                                        vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro'>";
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
                                    vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';

                                    //if (item.FieldHelp == "true") {
                                    //    vControls += '<span> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                                    //}
                                    vControls += '</div>';
                                }
                            }
                            else if (item.FieldType.indexOf("Dropdown") > -1 || item.FieldType.indexOf("Multi Select") > -1) {
                                vControls += '<div class="col6 m11">';
                                if (item.Required == "true") {
                                    vControls += "<select id=" + item.FieldName + " multiple='multiple' class='width90 counter-Choice chosenmulti validuser form-contro' name=" + item.FieldName + " title='" + item.FieldDisplayName + "' data-placeholder='--Select--'>"
                                } else {
                                    vControls += "<select id=" + item.FieldName + " multiple='multiple' class='width90 counter-Choice chosenmulti form-contro' name=" + item.FieldName + " title='" + item.FieldDisplayName + "' data-placeholder='--Select--'>"
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
                                vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
                                //if (item.FieldHelp == "true") {
                                //    vControls += '<span> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                                //}
                                vControls += '</div>';
                                vMultiDDL = item.FieldName;
                            }
                            else if (item.FieldType == "Number") {
                                vControls += '<div class="col6 m12">';
                                if (item.Required == "true") {
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro validelement form_input' />";
                                } else {
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro form_input' />";
                                }

                                //if (item.FieldHelp == "true") {
                                //    vControls += '<span > <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                                //}
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

                                vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
                                vControls += '</div>';
                                vNumberD = item.FieldName;
                            }
                                // Percent
                            else if (item.FieldType == "Number-P") {
                                vControls += '<div class="col6 m12">';
                                if (item.Required == "true") {
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro validelement width40 form_input' />";
                                } else {
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro width40 form_input' />";
                                }
                                vControls += '<label class="margin-top-8">' + '%' + '</label>';
                                vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
                                vControls += '</div>';
                                vNumberP = item.FieldName;
                            }
                                // Percent Decimal
                            else if (item.FieldType == "Number-PD") {
                                vControls += '<div class="col6 m12">';
                                if (item.Required == "true") {
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro validelement width40 form_input' />";
                                } else {
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro width40 validNumberFormat form_input' />";
                                }
                                vControls += '<label class="margin-top-8">' + '%' + '</label>';
                                vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
                                vControls += '</div>';
                                vNumberPD = item.FieldName;
                            }
                            else if (item.FieldType == "Yes/No") {

                                vControls += '<div class="col6 m12">';
                                vControls += "<input  type='radio' name=" + item.FieldName + " id='Yes" + item.FieldName + "' value='Yes' onchange='changeYesNoField(this);'>Yes ";
                                vControls += "<input  type='radio' name=" + item.FieldName + " checked id='No" + item.FieldName + "' checked value='No' onchange='changeYesNoField(this);'>No";
                                vControls += "	<input type='hidden' id='hdnYes" + item.FieldName + "' value=" + item.CommentYes + " />";
                                vControls += "	<input type='hidden' id='hdnNo" + item.FieldName + "' value=" + item.CommentNo + " />";
                                vControls += "	<input type='hidden' id='hdnRequired" + item.FieldName + "' value=" + item.CommentRequired + " />";
                                vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
                                vControls += '</div>';

                                if (item.CommentNo == "true") {
                                    if (item.CommentRequired == "true") {
                                        vControls += ' <div class="form-input-group ' + item.FieldName + '"><div class="row-group"><label class="col3 m12">Add a Comment<span class="text-red">*</span></label> ';
                                    } else {
                                        vControls += '<div class="form-input-group ' + item.FieldName + '"><div class="row-group"><label class="col3 m12">Add a Comment</label> ';
                                    }
                                    vControls += '<div class="col6 m12">';
                                    if (item.CommentRequired == "true") {
                                        vControls += "<textarea id='CustomCMD" + item.FieldName + "' name='CustomCMD" + item.FieldName + "' maxlength='500' title='" + item.FieldName + "' cols='40' rows='5' class='form-contro validelement'></textarea>";
                                    } else {
                                        vControls += "<textarea id='CustomCMD" + item.FieldName + "' name='CustomCMD" + item.FieldName + "' maxlength='500' title='" + item.FieldName + "' cols='40' rows='5' class='form-contro'></textarea>";
                                    }
                                    vControls += '</div>';
                                    vControls += '</div></div>';
                                }
                            } else if (item.FieldType == "Email") {
                                vControls += '<div class="col6 m12">';
                                if (item.Required == "true") {
                                    vControls += "<input type='text' id=" + item.FieldName + " maxlength='50'  name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro validemail validelement' />";
                                } else {
                                    vControls += "<input type='text' id=" + item.FieldName + " maxlength='50'  name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro validemail' />";
                                }
                                vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
                                vControls += '</div>';
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
                                //if (item.FieldHelp == "true") {
                                //    vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                                //}
                                vControls += "<a href='javascript:void(0)' class='linkText' id='" + item.FieldDisplayName + "' title='" + item.FieldName + "' onclick='ViewGeneric(this)'> Browse</a>";
                                vControls += '</div>';
                                vControls += '</div>';
                            } else if (item.FieldType == "File Upload") {
                                vControls += '<div class="col6 m12">';
                                if (item.Required == "true") {
                                    vControls += "<input type='file' id=" + item.FieldName + " name='docAttachment' title='" + item.FieldDisplayName + "' class='form-contro validelement browse-file-doc' />";
                                } else {
                                    vControls += "<input type='file' id=" + item.FieldName + " name='docAttachment' title='" + item.FieldDisplayName + "' class='form-contro browse-file-doc' />";
                                }
                                vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
                                vControls += '</div>';
                            } else if (item.FieldType == "Currency" || item.FieldType == "Value / Financials") {
                                vControls += '<div class="col6 m12">';
                                if (item.Required == "true") {
                                    vControls += "<input type='text' id=" + item.FieldName + " maxlength='50'  name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro validelement' />";
                                } else {
                                    vControls += "<input type='text' id=" + item.FieldName + " maxlength='50'  name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro' />";
                                }
                                vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
                                //if (item.FieldHelp == "true") {
                                //    vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                                //}
                                vControls += '</div>';
                            } else if (item.FieldType == "User") {
                                if (item.Required == "true") {
                                    vControls += "<div class='col6 m12'><select id=" + item.FieldName + " multiple='multiple' class='form-contro f_inpt width90 chosenmulti validuser' name=" + item.FieldName + " title='" + item.FieldDisplayName + "' data-placeholder='--Select--'>"
                                } else {
                                    vControls += "<div class='col6 m12'><select id=" + item.FieldName + " multiple='multiple' class='form-contro f_inpt width90 chosenmulti' name=" + item.FieldName + " title='" + item.FieldDisplayName + "' data-placeholder='--Select--'>"
                                }

                                if (vUserList == "")
                                { vUserList = GetUserList(); }
                                vControls += vUserList;
                                vControls += '</select>';
                                vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';
                                //if (item.FieldHelp == "true") {
                                //    vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                                //}
                                vUser = item.FieldName;
                                vControls += '</div>';
                            }

                            $("#newdivforcheck").append(vControls);
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
                                        changeYear: true,
                                        dateFormat: dateformate
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
                                vPhoneNumber = "";
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
                        }
                    }
                }
            });
            BindBusinessAreaPicker11();
            // $("#loadingPage").fadeOut();
        }, error: function (data) {
            BindBusinessAreaPicker11();
            //$("#loadingPage").fadeOut();
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

function SaveCounterparty() {
    var isformvalid = false;
    if (requiredValidator('counterpartyForm',false)) {
        $("#loadingPage").fadeIn();
        var strBusinessAreaOwnerof = "";
        if ($('input[type="radio"][name=IsGlobal]:checked').val() == "No") {
            if ($("#txtOwnerofBusinessArea").val() != $("#hdnOwnerofBusinessArea").val()) {
                if ($("#txtOwnerofBusinessArea").val() != "") {
                    for (var i = 0; i < selectedBusinessAreaID11.length; i++) {

                        var rowKPath = jQuery.grep(BusinessAreaPathRowKey, function (a) {
                            return a[1] === selectedBusinessAreaID11[i][1];
                        });
                        if (rowKPath != null && typeof (rowKPath) != "undefined" && rowKPath.length > 0)
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
        isformvalid = true;
        var vTitle = $("#txtCounterpartyName").val();
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
                var name = $(this)[0].id;
                var value = $(this).intlTelInput("getSelectedCountryData").iso2 + "," + $(this).intlTelInput("getSelectedCountryData").dialCode + "," + $(this).intlTelInput("getNumber", intlTelInputUtils.numberFormat.INTERNATIONAL);
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
        counterpartyForm += "&CreatedBy=" + localStorage.UserName;
        counterpartyForm += "&ModifiedBy=" + localStorage.UserName;
        counterpartyForm += "&BusinessAreasPath=" + encodeURIComponent(strBusinessAreaOwnerof);
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
                if (!$.isEmptyObject(arrRelatedCounterparities) && !$.isEmptyObject(data)) {
                    CreateRelatedCounterparies(data, vTitle)
                }
                swal("", "Counterparty created.");
                $("#txtCounterpartyName").val("");
                $("#loadingPage").fadeOut();
                location = "/Home?SPHostUrl=" + localStorage.SPHostUrl;

            },
            error: function (person) {
                person.responseText = person.responseText.replace('{"Message":"', '');
                person.responseText = person.responseText.replace('"}', '');
                swal("", "" + person.responseText + "");

                $("#loadingPage").fadeOut();

            }
        });

    }
    return isformvalid;
}

$('#btnCreateCounterparty').click(function () { SaveCounterparty() });


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
        $('#txtOwnerofBusinessArea').val('');
        $("#txtOwnerofBusinessArea").removeClass("validelement");
        selectedBusinessAreaID11 = [];
        selectedBusinessAreaID11Temp = [];
        BAOwnersselecteditems = [];

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
    //if (typeof (BusinessAreaAccess) == "undefined" || BusinessAreaAccess == null || BusinessAreaAccess.length == 0) {
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

            if ($('input[type="radio"][name=IsGlobal]:checked').val() == 'Yes') {
                $("#trcp-RgBusi").hide();
                $("#txtOwnerofBusinessArea").removeClass("validelement");


            }
            else if ($('input[type="radio"][name=IsGlobal]:checked').val() == 'No') {
                $("#trcp-RgBusi").show();
                if (thisBusinessAreaName != "")
                    addDefaultBusinessareaCounterparty();
                $("#txtOwnerofBusinessArea").addClass("validelement");
            }
            $("#loadingPage").fadeOut();
        },
        error:
            function (data) {
                if ($('input[type="radio"][name=IsGlobal]:checked').val() == 'Yes') {
                    $("#trcp-RgBusi").hide();
                    $("#txtOwnerofBusinessArea").removeClass("validelement");


                }
                else if ($('input[type="radio"][name=IsGlobal]:checked').val() == 'No') {
                    $("#trcp-RgBusi").show();
                    if (thisBusinessAreaName != "")
                        addDefaultBusinessareaCounterparty();
                    $("#txtOwnerofBusinessArea").addClass("validelement");
                }
                $("#loadingPage").fadeOut();
            }
    });

}
//else {
//    if (typeof (BusinessAreaAccess) == "object" && BusinessAreaAccess.length > 1) {
//        BusinessAreaAccessCounterp = BusinessAreaAccess;
//    }
//    else
//        BusinessAreaAccessCounterp.push(BusinessAreaAccess);


//    recursiveIterationCounterp("", data)
//    $("#tbodyBusinessArea11").append(articleBusinessAreaCounterp);
//    if (articleBusinessAreaCounterp == "") {
//        $('#tbodyBusinessArea11').empty();
//        $("#tbodyBusinessArea11").append("<tr><td><p class='f_p-error'>No items found.</p></td></tr>");
//    }
//    articleBusinessAreaCounterp = "";
//    $("#example-basic-11").treetable({ expandable: true, initialState: "expanded" }, true);
//    if ($('input[type="radio"][name=IsGlobal]:checked').val() == 'Yes') {
//        $("#trcp-RgBusi").hide();
//        $("#txtOwnerofBusinessArea").removeClass("validelement");


//    }
//    else if ($('input[type="radio"][name=IsGlobal]:checked').val() == 'No') {
//        $("#trcp-RgBusi").show();
//        if (thisBusinessAreaName != "")
//            addDefaultBusinessareaCounterparty();
//        $("#txtOwnerofBusinessArea").addClass("validelement");
//    }
//    $("#loadingPage").fadeOut();

//}
//}
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
            //BusinessAreaPathRowKey.push([spath, item.RowKey]);
        }
        else {
            spath = path + ' > ' + item.BusinessAreaName;
            //BusinessAreaPathRowKey.push([spath, item.RowKey]);
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
            //    BindRecBACounterp(spath, object.ChildrenData[i]);

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
    var i = BAOwnersselecteditems.indexOf(thisBusinessAreaName);
    if (i != -1) {

    } else {
        BAOwnersselecteditems.push(thisBusinessAreaName);
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
            selectedBusinessAreaID11.push([rowK[0][0], rowK[0][1]])
        }

    }
    $("#txtOwnerofBusinessArea").val(thisBusinessAreaName);
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

//For Related Counterparty
function ViewCounterpartyRelated(obj) {
    if ($('#ddlRelationshipTypeCounterparties').hasClass('error')) {
        $('#ddlRelationshipTypeCounterparties').removeClass('error')
    }
    if ($('#ddlRelationshipTypeParentcounterparties').hasClass('error')) {
        $('#ddlRelationshipTypeParentcounterparties').removeClass('error')
    }
    AllowToProcess = false;
    if ($('input[type="radio"][name=IsGlobal]:checked').val() == "No" && $("#txtOwnerofBusinessArea").val() != "") {
        AllowToProcess = true;
    }
    else if ($('input[type="radio"][name=IsGlobal]:checked').val() != "No") {
        AllowToProcess = true;
    }
    if (AllowToProcess) {
        var baname = "";
        $("#lblRelatedPopup_Counterparties").text("Select Relationship for " + $("#txtCounterpartyName").val())
        $("#loadingPage").fadeIn();
        $('#loadCounterparties').html('<img src="../Content/Images/icon/loading.gif"> Working on it...');
        $('#tblPopupCounterparties').empty();
        $("#txtSearchBoxCounterparties").val("");
        if ($('#tblPopupCounterparties tr').length <= 0) {
            var relatedCounterpartiesTag = [];
            $("#txtSearchBoxCounterparties").val("");
            var strBusinessAreaOwnerof = "";
            if ($('input[type="radio"][name=IsGlobal]:checked').val() == "No") {
                if ($("#txtOwnerofBusinessArea").val() != $("#hdnOwnerofBusinessArea").val()) {
                    if ($("#txtOwnerofBusinessArea").val() != "") {
                        for (var i = 0; i < selectedBusinessAreaID11.length; i++) {

                            var rowKPath = jQuery.grep(BusinessAreaPathRowKey, function (a) {
                                return a[1] === selectedBusinessAreaID11[i][1];
                            });
                            if (rowKPath != null && typeof (rowKPath) != "undefined" && rowKPath.length > 0)
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
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/relatedcounterpartypicker',
                type: 'GET',
                dataType: 'json',
                "Content-Type": "application/json",
                headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, BusinessAreaLocation: strBusinessAreaOwnerof },
                cache: false,
                success: function (data) {
                    $('#loadCounterparties').empty();
                    $('#tblPopupCounterparties').empty();
                    curRelatedCounterparities = PrvRelatedCounterparities.slice();
                    var arr = [];
                    var prevSelected = $("#RelatedCounterparties").val();
                    $.each(prevSelected.split(";"), function () {
                        arr.push($.trim(this));
                    });
                    var vCounterpartyList = '';
                    $(data).each(function (i, item) {
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
                            article += '<input id="rel' + item.RowKey + '" type="checkbox" name="RelatedCounterparty" checked class="css1-checkbox" value="' + escape(item.CounterpartyName) + '" onchange="javascript:currentrelatedcounterparty(this);" />';
                            article += '<label for="' + item.RowKey + '" class="css1-label"><a href="/Counterparty/CounterpartyDetail?CounterpartyID=' + item.RowKey + '" target="_blank">' + item.CounterpartyName + '</a></label>';   //ENH487 Customer inhanc
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
                            article += '<label for="' + item.RowKey + '" class="css1-label"><a href="/Counterparty/CounterpartyDetail?CounterpartyID=' + item.RowKey + '" target="_blank">' + item.CounterpartyName + '</a></label>';   //ENH487 Customer inhanc
                            article += '</td>';
                            article += '<td class="ddl"><td></tr>'
                            //$("#tblPopupCounterparties").append(article);
                            vCounterpartyList += article;
                            relatedCounterpartiesTag.push(item.CounterpartyName);
                        }

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
                        //});
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
                            typeID: 'tblPopupCounterparties',
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
    } else {
        swal("", "Select the business area.");
    }
}

function RelatedCounterpartiesPush() {
    if (requiredValidator('popupCounterparties', false)) {
        var vRelatedCounterpartyID = "";
        var vRelatedCounterpartyTitle = "";
        var vChildRelation = "";

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
    $("#tblPopupCounterparties").html('');
    if ($.trim($("#txtSearchBoxCounterparties").val()) != "") {
        $('#loadCounterparties').html('<img src="../Content/Images/icon/loading.gif"> Searching...');
    } else {
        $('#loadCounterparties').html('<img src="../Content/Images/icon/loading.gif">');
    }
    var relatedCounterpartiesTag = [];
    var strBusinessAreaOwnerof = "";
    if ($('input[type="radio"][name=IsGlobal]:checked').val() == "No") {
        if ($("#txtOwnerofBusinessArea").val() != $("#hdnOwnerofBusinessArea").val()) {
            if ($("#txtOwnerofBusinessArea").val() != "") {
                for (var i = 0; i < selectedBusinessAreaID11.length; i++) {

                    var rowKPath = jQuery.grep(BusinessAreaPathRowKey, function (a) {
                        return a[1] === selectedBusinessAreaID11[i][1];
                    });
                    if (rowKPath != null && typeof (rowKPath) != "undefined" && rowKPath.length > 0)
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

    var vURL = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/relatedcounterpartypicker?searchkeyword=' + encodeURIComponent($("#txtSearchBoxCounterparties").val()) + '&customquery=&sortbyfield=Timestamp&orderby=DESC';
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
            //var counterpartyTags = [];
            var prevSelected = [];
            $.each(curRelatedCounterparities, function (ipvr, itempvr) {
                prevSelected.push($.trim(itempvr.CounterpartyName));
            });
            var arr = prevSelected;
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];
                if (arr.indexOf(item.CounterpartyName.trim()) >= 0) {
                    var article = '<tr><td>';
                    article += '<input id="rel' + item.RowKey + '" type="checkbox" name="RelatedCounterparty" checked class="css1-checkbox" value="' + escape(item.CounterpartyName) + '"  onchange="javascript:currentrelatedcounterparty(this);" />';
                    article += '<label for="' + item.RowKey + '" class="css1-label"><a href="/Counterparty/CounterpartyDetail?CounterpartyID=' + item.RowKey + '" target="_blank">' + item.CounterpartyName + '</a></label>';   //ENH487 Customer inhanc
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
                    article += '<label for="' + item.RowKey + '" class="css1-label"><a href="/Counterparty/CounterpartyDetail?CounterpartyID=' + item.RowKey + '" target="_blank">' + item.CounterpartyName + '</a></label>';   //ENH487 Customer inhanc
                    article += '</td>';
                    article += '<td class="ddl"><td></tr>'
                    $("#tblPopupCounterparties").append(article);
                }

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
                });
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
                    typeID: 'tblPopupCounterparties',
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
    //Remove "rel" in Counterparty ID
    var RelCountID = arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RelatedCounterpartyID;
    RelCountID = $.trim(RelCountID);
    var liRelCountID = "";
    $.each(RelCountID.split(";"), function (iRelCountID, itemnameRelCountID) {
        liRelCountID += ";" + itemnameRelCountID.replace("rel", "");
    });
    arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RelatedCounterpartyID = (liRelCountID.charAt(0) === ';') ? liRelCountID.substr(1) : liRelCountID;
    //Remove "rel" in Counterparty ID
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
//For Related Counterparty
//manoj

function Loading_View_trigger() {

}

function bindPhoneNumber(id, countryCode) {
    $("#" + id).intlTelInput({
        //allowDropdown: false,
        //onlyCountries: [countryCode],
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
                article += '<tr><th style="width:10% !important"><input id="selectall" onclick="funselectall(this);" type="checkbox"/> Select/Deselect All</th></tr>';
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
        $("#selectall").attr('checked', true);
    }
    else {
        $("#selectall").attr('checked', false);
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
        $("#selectall").attr('checked', true);
    }
    else {
        $("#selectall").attr('checked', false);
    }
    try {
        hideAllMenuAndStopPro(event);
    }
    catch (ex) {

    }
}

function funselectall(obj) {
    if (obj.checked) {
        $('input:checkbox[name=Generic]').attr('checked', true);
        checkMultipleDocuments("");

    } else {
        $('input:checkbox[name=Generic]').attr('checked', false);
        checkMultipleDocuments("");
    }
}
function funselectallcon(obj) {
    if (obj.checked) {
        $('input:checkbox[name=Genericcon]').attr('checked', true);

    } else {
        $('input:checkbox[name=Genericcon]').attr('checked', false);
    }
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

function bindPhoneNumber(id, countryCode) {
    $("#" + id).intlTelInput({
        //allowDropdown: false,
        //onlyCountries: [countryCode],
        separateDialCode: true,
        utilsScript: "/Scripts/utils.js"
    });
}