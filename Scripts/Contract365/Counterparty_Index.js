var PrvRelatedCounterparities = [];
var arrRelatedCounterparities = [];
var curRelatedCounterparities = [];
var arrSavedCounterparties = [];
var metadataLookUp = [];
var ShowCreateButton = false;
var IsContractExist;
var legalEntityID = "";
var thisBusinessAreaName = "";
var thisContractAreaName = "";
var thisBusinessAreaNameRowKey = "";
var thisContractAreaNameRowKey = "";
var thisBusinessAreaPath = "";
var vCurrencyDisplayStyle = '';
var multipleChecksDocumentIDd = [];
var arrprevRU = [];
var myArrayRU = [];
var vGlobalObjForGeneric = "";
var rowCounter = 0;

var vUserList = "";
//manoj
var vView = "";
var savedViewNameFromViewTable = "";
//manoj
$(document).ready(function () {

    $("#conSortByOptions").niceSelect();
    $('.nicEdit-panelContain').parent().width('100%');
    $('.nicEdit-panelContain').parent().next().width('100%');
    $('.nicEdit-main').width("99%");
    var Permission = JSON.parse(localStorage.getItem("Permission"));
    //if (Permission.CounterpartyPermission == 'Read Only' || Permission.CounterpartyPermission == '') {
    //    $(".manageCounterpartyMenu").css("display", "none");
    //    //$(".contributeCounterparty").css("display", "none");
    //}
    //else if (Permission.CounterpartyPermission == 'Edit / Read') {
    //    $(".manageCounterparty").css("display", "none");
    //    //$(".contributeCounterparty").css("display", "");
    //}

    if (localStorage.UserType == "" || localStorage.UserType == null)
        GetUserPermissionCPIndex();
    else {
        if (localStorage.UserType == "Business User") {
            $('.businessUser').css('display', 'none');
            $("#myMenu").find("li.edit.contributeCounterparty").each(function () {
                $(this).css('display', 'none');
            });
            $('.edit.manageCounterpartyMenu').css('display', 'none');
        }
        else {
            $('.businessUser').css('display', '');
            $("#myMenu").find("li.edit.contributeCounterparty").each(function () {
                $(this).css('display', '');
            });
            $('.edit.manageCounterpartyMenu').css('display', '');
        }
    }

   
    if (typeof localStorage.GlobalBusinessAreaLocation != 'undefined') {
        if (localStorage.GlobalBusinessAreaLocation != "All") {
            $("#dashmain").attr("src", "/Content/images/icon/gen.png");
        }
    }
    $("#NewCounterparty").click(function () {
        $("#idvSingleMultiple").toggle();
    });
    $('#txtSearchBox').keypress(function (e) {
        if ($('#txtSearchBox').val() != "") {
            if (e.keyCode == 13) {
                $('#txtSearchBox').blur();
                SearchCP();
            }
        }
    });
    ShowCreateButton = false
    GetContractValueSetting()
    CheckGlobalSettingsForNewCP();
    //manoj
    var VViewList = getParameterByName('View');
    if (VViewList != "") {
        if (VViewList == "BussinessArea") {
            vView = "BussinessArea";
            colorLink('qvThis', true);
        } else if (VViewList == "Recent") {
            vView = "Recent";
            colorLink('qvRecent', true);
        } else if (VViewList == "All") {
            vView = "All";
            colorLink('qvAll', true);
        }
    }
    //manoj
    applyFilter();

    GetSavedViews();
    $("#addNewView").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Add View",
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
            "Save": function () { SaveView(); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });
    BindCountry();
    BindCounterpartyType();


    if (typeof localStorage.GlobalBusinessAreaLocation != 'undefined') {
        if (localStorage.GlobalBusinessAreaLocation != "All" && localStorage.GlobalBusinessAreaLocation != 'undefined') {
            $("#dashmain").attr("src", "/Content/images/icon/gen.png");

            $('#heading_Counterparties').text(localStorage.GlobalBusinessAreaLocation);
            thisBusinessAreaPath = localStorage.GlobalBusinessAreaLocation;
            thisContractAreaName = localStorage.GlobalBusinessAreaLocation.split('>')[0].trim();
            thisBusinessAreaName = localStorage.GlobalBusinessArea;//Business Area +';'+ Contract Area
        }
        else {
            $('#heading_Counterparties').text('Counterparties');
            thisContractAreaName = "";
            thisBusinessAreaName = "";//Business Area +';'+ Contract Area
            thisBusinessAreaPath = "";
        }
    }
    else {
        $('#heading_Counterparties').text('Counterparties');
        thisContractAreaName = "";
        thisBusinessAreaName = "";//Business Area +';'+ Contract Area
        thisBusinessAreaPath = "";
    }


    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
    var vAccFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "5" && n.Status == "ON");
    });
    if (vAccFeat.length > 0) {
        $("#singleUpload").css("display", "none");
        $("#bulkUpload").css("display", "");
    } else {
        $("#singleUpload").css("display", "");
        $("#bulkUpload").css("display", "none");
    }
    //CheckBulkUpload();
    $("#addEditContact").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "New Contact",
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
            "Save": function () { SaveContact(); },
            Cancel: function () {
                $(this).dialog("close");
            }
        },
        close: function () {
            legalEntityID = "";
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
            "Save": function () { SaveCounterparty(); },
            Cancel: function () {
                arrRelatedCounterparities = [];
                $(this).dialog("close");
            }
        },
        close: function () {
            PrvRelatedCounterparities = [];
            arrRelatedCounterparities = [];
            curRelatedCounterparities = [];
            arrSavedCounterparties = [];
            selectedBusinessAreaID11 = [];
        }
    });

    $("#addEditCounterpartyStatus").dialog({
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
            "Save": function () { SaveCounterpartyStatus(); },
            Cancel: function () {
                arrRelatedCounterparities = [];
                $(this).dialog("close");
            }
        },
        close: function () {
            selectedBusinessAreaID11 = [];
        }
    });

    if (getParameterByName('CreateNew') == 'Yes') {
        removeValidations('addEditCounterparty');
        $("#addEditCounterparty").dialog("option", "title", "New Counterparty");
        $("#addEditCounterparty").dialog("open");
    }

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
                $('input:checkbox[name="Generic"]:checked').each(function () {
                    if (vCoounterparty == "") {
                        vCoounterparty = this.value;
                    }
                    else {
                        vCoounterparty += "; " + this.value;
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

                    ////alert('No item has been selected.');
                    //swal("", "No item has been selected.");
                    //s = false;
                }

                // if (s) {

                //}
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

    $("#addNewAdvanceView").dialog({
        autoOpen: false,
        closeText: "",
        width: "70%",
        title: "New View",
        dialogClass: "popup_width100",
        modal: true,
        resizable: false,
        buttons: [
            {
                id: "btnCreateAdvanceView",
                text: "Create",
                click: function () {
                    SaveView('true', 'add');
                }
            },
            {
                id: "btnAdvanceViewSaveAs",
                text: "Save as New View",
                click: function () {
                    SaveView('true', 'add');
                }
            },
            {
                id: "btnUpdateAdvanceView",
                text: "Update View",
                click: function () {
                    SaveView('true', 'update');
                }
            },
            {
                id: "btnAdvanceViewCancel",
                text: "Cancel",
                click: function () {
                    $(this).dialog("close");
                }
            }

        ],

        close: function (event, ui) {
            restoreAdvanceViewIntial();

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
    BindBusinessAreaPicker11();
    vUserList = GetUserList();
    $("#ddlInternalUser").append(vUserList);
});

$("#conSortByOptions").on('change', function () {
    applyFilter($("#conSortByOptions").val())
});

$("#conSortDirection").on('click', function () {
    var direction = $("#conSortDirection").attr("data-direction");
    if (direction == 'ASC') {
        $("#conSortDirection").attr("data-direction", 'DESC');
        $("#conSortDirection").attr("src", '/Content/Images/up_arrow_1.png');
    } else {
        $("#conSortDirection").attr("data-direction", 'ASC');
        $("#conSortDirection").attr("src", '/Content/Images/down-arrow_1.png');
    }
    applyFilter($("#conSortByOptions").val(), direction);
});

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
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
                $("#btnAddCounterparty").removeClass('f_button_green_small_update2');
                $("#btnAddCounterparty").addClass("f_button_green_small_update");
            }
        },
        error: function () {

        }

    });
}

var CounterPartyResult = [];
function GenerateTable(counterparty) {
    CounterPartyResult = counterparty;
    if (counterparty.length == 0) {
        $("#listCounterparty").append('<p class="f_p-error">No items found.</p>');
        $("#compact-pagination").css('display', 'none');
    }
    else {
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
            case "Title(A-Z)":
                sortby = 'CounterpartyName';
                break;
            default:
                sortby = '';
                break;
        }

        $("#compact-pagination").css('display', '');
        var counterpartyTags = [];
        var datalenght = counterparty.length;
        for (var i = 0; i < datalenght; i++) {
            var item = counterparty[i];
            counterpartyTags.push(item.CounterpartyName);

            //if (item.Country == "--Select--")
            //    item.Country = "";
            //var myUrl = '/Counterparty/CounterpartyDetail?CounterpartyID=' + encodeURI(item.RowKey);

            //var article = '<li>';
            //article += '<p id="CounterpartyID" style="display:none;">' + item.RowKey + '</p>';
            //article += '<p id="CounterpartyName" style="display:none;">' + item.CounterpartyName + '</p>';
            //article += '<p><a id=a' + item.RowKey + ' href="' + myUrl + '">' + item.CounterpartyName + '</a>';
            //article += '<img src="/Content/Images/drop-arrow.png" alt="Open Menu" title="Open Menu" class="openmenu"/>';

            //article += '<small id=sml' + item.RowKey + '>';
            //if (item.CounterpartyType != null && item.CounterpartyType != "") {
            //    article += item.CounterpartyType;
            //    article += " | ";
            //}

            //if (item.IsGlobal != "") {
            //    article += item.IsGlobal == "Yes" ? "Global" : "Regional";
            //    article += " | ";
            //}

            //if (item.AddressLine1 != "" && item.AddressLine1 != "--Select--" && item.AddressLine1 != "0") {
            //    article += item.AddressLine1;
            //    article += ", ";
            //}

            //if (item.AddressLine2 != "" && item.AddressLine2 != "--Select--" && item.AddressLine2 != "0") {
            //    article += item.AddressLine2;
            //    article += ', ';
            //}

            //if (item.City != "" && item.City != "--Select--" && item.City != "0") {
            //    article += item.City;
            //    article += ', ';
            //}

            //if (item.State != "" && item.State != "--Select--" && item.State != "0") {
            //    article += item.State;
            //    article += ', ';
            //}

            //if (item.Country != "" && item.Country != "--Select--" && item.Country != "0") {
            //    article += item.Country;
            //    article += ', ';
            //}

            //article = article.trim();
            //article = article.substring(0, article.length - 1);
            //article = article.trim();


            //if (sortby != '') {

            //    if (item[sortby] != null && item[sortby] != "") {
            //        if (fieldType == 'date') {
            //            article += ' |&nbsp;<var title="' + selectedSortOption + '">' + moment(new Date(item[sortby])).format('Do MMM YYYY') + '</var>';
            //        }
            //        else {
            //            article += ' |&nbsp;<var title="' + selectedSortOption + '">' + item[sortby] + '</var>';
            //        }
            //    }
            //}

            //article += '</small></p>';

            //if (item.Status == "Active") {
            //    article += '<b id=sts' + item.RowKey + ' class="status_green">' + item.Status + '</b>';
            //}
            //else if (item.Status == "Inactive") {
            //    article += '<b id=sts' + item.RowKey + ' class="status_Gray">' + item.Status + '</b>';
            //}
            //else {
            //    article += '<b id=sts' + item.RowKey + ' class="status_yellow">' + item.Status + '</b>';
            //}

            //article += '</li>';

            //$("#listCounterparty").append(article);
        }
        CreateCounterPartyListUnit(0);
        $("#txtSearchBox").autocomplete({
            source: counterpartyTags,
            minLength: 1,
            focus: function (event, ui) {
                return false;
            },
            select: function (evn, uidetails) {
                $("#txtSearchBox").val(uidetails.item.label);
                SearchCP();
            }
        });

        //$(".openmenu").contextMenu({ menu: 'myMenu', leftButton: true }, function (action, el, pos) {
        //    contextMenuWork(action, el.parent("p").parent("li"), pos);
        //});

        $('#compact-pagination').pagination({
            items: counterparty.length,
            itemsOnPage: 20,
            typeID: 'listCounterparty',
            cssStyle: 'compact-theme',
            listname: 'CounterPartyListUnit'
        });
    }
}

function CreateCounterPartyListUnit(page) {
    var startIndex = page * 20;
    var endIndex = startIndex + 20;
    $('#listCounterparty').empty();
    if (endIndex > CounterPartyResult.length) endIndex = CounterPartyResult.length;
    $("#spResult").html((startIndex + 1) + '&nbsp;to&nbsp;' + endIndex + '&nbsp;of&nbsp;' + CounterPartyResult.length);
    var resultfound = false;
    var checkboxchecking = true;
    if (startIndex == endIndex) {
        $("#listCounterparty").append('<p class="f_p-error">No items found.</p>');
        $("#compact-pagination").css('display', 'none');
    }
    else {
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
            case "Title(A-Z)":
                sortby = 'CounterpartyName';
                break;
            default:
                sortby = '';
                break;
        }

        var article = '';
        for (var i = startIndex; i < endIndex; i++) {
            var item = CounterPartyResult[i];

            if (item.Country == "--Select--")
                item.Country = "";
            var myUrl = '/Counterparty/CounterpartyDetail?CounterpartyID=' + encodeURI(item.RowKey);

            article += '<li>';
            article += '<p id="CounterpartyID" style="display:none;">' + item.RowKey + '</p>';
            article += '<p id="CounterpartyName" style="display:none;">' + item.CounterpartyName + '</p>';
            article += '<p><a id=a' + item.RowKey + ' href="' + myUrl + '">' + item.CounterpartyName + '</a>';
            article += '<img src="/Content/Images/drop-arrow.png" alt="Open Menu" title="Open Menu" class="openmenu"/>';

            article += '<small id=sml' + item.RowKey + '>';
            if (item.CounterpartyType != null && item.CounterpartyType != "") {
                article += item.CounterpartyType;
                article += " | ";
            }

            if (item.IsGlobal != "") {
                article += item.IsGlobal == "Yes" ? "Global" : "Regional";
                article += " | ";
            }

            if (item.AddressLine1 != "" && item.AddressLine1 != "--Select--" && item.AddressLine1 != "0") {
                article += item.AddressLine1;
                article += ", ";
            }

            if (item.AddressLine2 != "" && item.AddressLine2 != "--Select--" && item.AddressLine2 != "0") {
                article += item.AddressLine2;
                article += ', ';
            }

            if (item.City != "" && item.City != "--Select--" && item.City != "0") {
                article += item.City;
                article += ', ';
            }

            if (item.State != "" && item.State != "--Select--" && item.State != "0") {
                article += item.State;
                article += ', ';
            }

            if (item.Country != "" && item.Country != "--Select--" && item.Country != "0") {
                article += item.Country;
                article += ', ';
            }

            article = article.trim();
            article = article.substring(0, article.length - 1);
            article = article.trim();

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

            article += '</small></p>';

            if (item.Status == "Active") {
                article += '<b id=sts' + item.RowKey + ' class="status_green">' + item.Status + '</b>';
            }
            else if (item.Status == "Inactive") {
                article += '<b id=sts' + item.RowKey + ' class="status_Gray">' + item.Status + '</b>';
            }
            else {
                article += '<b id=sts' + item.RowKey + ' class="status_yellow">' + item.Status + '</b>';
            }

            article += '</li>';
        }
        $("#listCounterparty").html(article);

        $(".openmenu").contextMenu({ menu: 'myMenu', leftButton: true }, function (action, el, pos) {
            contextMenuWork(action, el.parent("p").parent("li"), pos);
        });
    }
    
}

function BindCounterpartDropdown(counterparty) {
    var datalenght = counterparty.length;
    for (var i = 0; i < datalenght; i++) {
        var item = counterparty[i];
        $("#ddlCounterparty").append('<option value=' + item.RowKey + '>' + item.CounterpartyName + '</option>');
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

function CounterpartyPopup() {
    //manoj
    //For Related CounterParties
    PrvRelatedCounterparities = [];
    arrRelatedCounterparities = [];
    curRelatedCounterparities = [];
    arrSavedCounterparties = [];
    //For Related CounterParties
    //manoj
    $("#idvSingleMultiple").toggle();
    $("#hdnOwnerofBusinessArea").val('');
    $("#hdnLocOwnerofBusinessArea").val('');
    $("#txtOwnerofBusinessArea").val('');
    if (thisBusinessAreaName == "") {
        $('input[type="radio"][name=IsGlobal][value="Yes"]').prop('checked', true);
        $("#trcp-RgBusi").hide();
        $("#txtOwnerofBusinessArea").removeClass("validelement");
    }
    else {

        $('input[type="radio"][name=IsGlobal][value="No"]').prop('checked', true);
        $("#trcp-RgBusi").show();
        $("#txtOwnerofBusinessArea").addClass("validelement");
        addDefaultBusinessareaCounterparty();
    }
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
    $("#ddlStatus").val("Active");
    $(".validelement").each(function (index, element) {
        $(element).removeClass("error");
        $("#errormsg_" + element.id).remove();
    });
    $('.removableCounterpartyField').remove();
    getCounterpartyFields();
    $("#addEditCounterparty").dialog("option", "title", "New Counterparty");
    $("#addEditCounterparty").dialog("open");
}

function deleteCounterparty(entityid, entityname) {
    swal({
        title: '',
        text: "Are you sure you want to <span style=\"font-weight:700\">delete '" + entityname + "'</span>?",
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
                              location = location;
                          }

                      });

               }
           });
       }
       return;
   });

}

function contextMenuWork(action, el, pos) {

    switch (action) {
        case "delete":
            {
                var entityname = $(el).find("#CounterpartyName").text();
                var entityid = $(el).find("#CounterpartyID").text();
                //check if any contract exist with this counterparty
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/allcontractsbycounterparty?counterparty=' + encodeURIComponent(entityname),
                    type: 'GET',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    cache: false,
                    success: function (data) {
                        if (data.length == 0) {
                            deleteCounterparty(entityid, entityname);
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
                                deleteCounterparty(entityid, entityname);
                            }
                        }
                    }, error: function (data) {
                        deleteCounterparty(entityid, entityname);
                    }
                });
                break;
            }
        case "newcontact":
            {
                var legalEntityName = $(el).find("#CounterpartyName").text();
                legalEntityID = $(el).find("#CounterpartyID").text();
                $('input[type="radio"][name=InternalOrExternal][value="External"]').prop('checked', true);
                $("#InternalUser").hide();
                $(".ExContact").show();
                $("#ddlInternalUser").removeClass("validelement");
                // $("#ddlCounterparty").append('<option value=' + legalEntityId + '>' + legalEntityName + '</option>');
                // $("#ddlCounterparty option").filter(function (index) { return $(this).text() === legalEntityName; }).prop('selected', true);

                $("#spnCounterpartyName").text(legalEntityName);
                $("#txtContactID").val("");
                $("#txtContactName").val("");
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
                break;
            }
        case "contacts":
            {
                var legalEntityName = $(el).find("#CounterpartyName").text();
                var entityid = $(el).find("#CounterpartyID").text();
                window.location = "../Counterparty/Contacts?CounterpartyID=" + entityid + "&CounterpartyName=" + legalEntityName;

                break;
            }
        case "acounterpartydetail":
            {
                var legalEntityName = $(el).find("#CounterpartyName").text();
                var entityid = $(el).find("#CounterpartyID").text();
                window.location = "../Counterparty/CounterpartyDetail?CounterpartyID=" + entityid + "&CounterpartyName=" + legalEntityName;

                break;
            }
        case "edit":
            {
                $("#loadingPage").fadeIn();
                //manoj
                //For Related CounterParties
                PrvRelatedCounterparities = [];
                arrRelatedCounterparities = [];
                curRelatedCounterparities = [];
                arrSavedCounterparties = [];
                //For Related CounterParties
                //manoj
                var entityid = $(el).find("#CounterpartyID").text();
                var entityname = $(el).find("#CounterpartyName").text();
                $("#txtCounterpartyID").val(entityid);
                $('.removableCounterpartyField').remove();

                $("#trcp-type").css("display", "");
                $("#trcp-add1").css("display", "");
                $("#trcp-add2").css("display", "");
                $("#trcp-city").css("display", "");
                $("#trcp-state").css("display", "");
                $("#trcp-country").css("display", "");
                $("#trcp-zip").css("display", "");
                $("#trcp-cnumb").css("display", "");
                $("#trcp-email").css("display", "");
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/allcontractsbycounterparty?counterparty=' + encodeURIComponent(entityname),
                    type: 'GET',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    cache: false,
                    success: function (data) {
                        IsContractExist = false;
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
                            //if (vContractlist.length > 0) {
                            //    IsContractExist = true;
                            //    //swal({
                            //    //    title: '',
                            //    //    text: "This Counterparty exists in another business area, Do you want to continue?",
                            //    //    type: 'warning',
                            //    //    showCancelButton: true,
                            //    //    confirmButtonText: 'Yes',
                            //    //    cancelButtonText: 'No',
                            //    //    html: true
                            //    //}, function (confirmed) {
                            //    //    if (confirmed) {
                            //    //        getCounterpartyFieldsEdit(entityid);
                            //    //        $("#addEditCounterparty").dialog("option", "title", "Edit Counterparty");
                            //    //        $("#addEditCounterparty").dialog("open");
                            //    //    }
                            //    //});
                            //}
                            //else {
                            //    IsContractExist = false;
                            //    //getCounterpartyFieldsEdit(entityid);
                            //    //$("#addEditCounterparty").dialog("option", "title", "Edit Counterparty");
                            //    //$("#addEditCounterparty").dialog("open");
                            //}
                            IsContractExist = true;
                            getCounterpartyFieldsEdit(entityid);
                            $("#addEditCounterparty").dialog("option", "title", "Edit Counterparty");
                            $("#addEditCounterparty").dialog("open");
                        }
                    }, error: function (data) {
                        if (data.statusText == "Not Found") {
                            //if (data.responseText.indexOf("No contract found") != -1) {
                            getCounterpartyFieldsEdit(entityid);
                            $("#addEditCounterparty").dialog("option", "title", "Edit Counterparty");
                            $("#addEditCounterparty").dialog("open");
                            $(".validelement").each(function (index, element) {
                                $(element).removeClass("error");
                                $("#errormsg_" + element.id).remove();
                            });
                            $("#loadingPage").fadeOut();
                        }
                        $("#loadingPage").fadeOut();
                    }
                });

                break;
            }
        case "modifyStatus":
            {

                // hiding controls
                $("#trcp-type").css("display", "none");
                $("#trcp-add1").css("display", "none");
                $("#trcp-add2").css("display", "none");
                $("#trcp-city").css("display", "none");
                $("#trcp-state").css("display", "none");
                $("#trcp-country").css("display", "none");
                $("#trcp-zip").css("display", "none");
                $("#trcp-cnumb").css("display", "none");
                $("#trcp-email").css("display", "none");

                var entityid = $(el).find("#CounterpartyID").text();
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty?counterpartyid=' + entityid,
                    type: 'GET',
                    dataType: 'json',
                    cache: false,
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    success: function (counterparty) {
                        $("#txtCounterpartyIDStatus").val(counterparty.RowKey);
                        $("#txtCounterpartyNameStatus").val(counterparty.CounterpartyName);
                        $("#ddlCounterpartyStatus option").filter(function (index) { return $(this).text() === counterparty.Status; }).prop('selected', true);
                    }
                });

                $("#addEditCounterpartyStatus").dialog("option", "title", "Modify Status");
                $("#addEditCounterpartyStatus").dialog("open");
                break;
            }
    }
}

function SaveCounterparty() {
    var vTitle = $("#txtCounterpartyName").val();
    var isformvalid = false;

    if (requiredValidator('addNewEntityFields',false)) {
        $("#loadingPage").fadeIn();
        isformvalid = true;
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



            //If multi dropdown is empty
            $('#counterpartyForm .chosenmulti').each(function (index) {
                if ($(this)[0].value == "") {
                    counterpartyForm += "&" + $(this)[0].id + "=";
                }
            });

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
                    if (!$.isEmptyObject(arrRelatedCounterparities)) {
                        CreateRelatedCounterparies($("#txtCounterpartyID").val(), $("#txtCounterpartyName").val())
                    }
                    $("#a" + entityid).text($("#txtCounterpartyName").val());
                    var counterpartytype = "";
                    if ($("#ddlCounterpartyType").find('option:selected').text() != null && $("#ddlCounterpartyType").find('option:selected').text() != "") {
                        counterpartytype = $("#ddlCounterpartyType").find('option:selected').text();
                        counterpartytype += " | ";
                    }
                    if ($('input[type="radio"][name=IsGlobal]:checked').val() == "No") {
                        counterpartytype += "Regional";
                        if ($("#Address").val() != "" && typeof $("#Address").val() != "undefined") {
                            counterpartytype += " | " + $("#Address").val();
                        }

                        $("#sml" + entityid).text(counterpartytype);
                        if ($("#sts" + entityid).text() != $("#ddlStatus").find('option:selected').text()) {
                            if ($("#sts" + entityid).text() == "Active") {
                                $("#sts" + entityid).removeClass('status_green');
                            }
                            else if ($("#sts" + entityid).text() == "Inactive") {
                                $("#sts" + entityid).removeClass('status_Gray');
                            }
                            else {
                                $("#sts" + entityid).removeClass('status_yellow');
                            }

                            if ($("#ddlStatus").find('option:selected').text() == "Active") {
                                $("#sts" + entityid).addClass('status_green');
                            } else if ($("#ddlStatus").find('option:selected').text() == "Inactive") {
                                $("#sts" + entityid).addClass('status_Gray');
                            } else {
                                $("#sts" + entityid).addClass('status_yellow');
                            }
                            $("#sts" + entityid).text($("#ddlStatus").find('option:selected').text());
                        }
                    }
                    else {
                        $("#sml" + entityid).parent().parent().remove();
                    }
                    BAOwnersselecteditems = [];
                    selectedBusinessAreaID11 = [];
                    $("#addEditCounterparty").dialog("close");
                    $("#loadingPage").fadeOut();

                    //location = location;
                },
                error: function (person) {
                    if (person.statusText == "Conflict") {
                        swal("", "<span style=\"font-weight:700\">" + vTitle + "</span> Counterparty is Already Exist");
                    }
                    //swal("", "" + person.responseText + "");
                    // swal("", "Counterparty Name Exist");
                    // $("#addEditCounterparty").dialog("close");
                    $("#loadingPage").fadeOut();
                }
            });
        }
        else {
            //var vTitle = $("#txtCounterpartyName").val();
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

                    if (!$.isEmptyObject(arrRelatedCounterparities)) {
                        CreateRelatedCounterparies(data, $("#txtCounterpartyName").val())
                    }
                    BAOwnersselecteditems = [];
                    selectedBusinessAreaID11 = [];
                    $("#addEditCounterparty").dialog("close");
                    $("#loadingPage").fadeOut();
                    if (vView == "") {
                        location = "/Counterparty";
                    }
                    else
                        location = "/Counterparty?View=" + vView;


                },
                error: function (person) {
                    if (person.statusText == "Conflict") {
                        swal("", "<span style=\"font-weight:700\">" + vTitle + "</span> Counterparty is Already Exist");
                    }
                    //swal("", "" + person.responseText + "");
                    // swal("", "Counterparty Name Exist");
                    // $("#addEditCounterparty").dialog("close");
                    $("#loadingPage").fadeOut();
                }
            });
        }
    }

    return isformvalid;
}

function SaveContact() {
    var isformvalid = false;
    var CanAdd = true;
    var counterpartyID = legalEntityID;
    var counterpartyName = "";
    counterpartyName = $("#spnCounterpartyName").text();


    var txtMailId = ($("#txtEmailIDC").val() != null && typeof ($("#txtEmailIDC").val()) != "undefined") ? $("#txtEmailIDC").val().toLowerCase().trim() : "";
    if (txtMailId == "") {
        CanAdd = true;
    }
    var email = $("#txtEmailIDC").val();
    if (email != "") {
        email = email.trim();
    }
    if (requiredValidator('addNewContactFields')) {
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
                                swal("", person);
                                $("#addEditContact").dialog("close");
                                $("#loadingPage").fadeOut();
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
            ContactName = $("#txtContactName").val();
            CountryName = $("#ddlCountryC").find('option:selected').text();
            isformvalid = true;
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
                                    swal("", person);
                                    $("#addEditContact").dialog("close");
                                    $("#loadingPage").fadeOut();
                                }
                            });
                        }

                    }
                });
            }

        }


    }
    else {
        $("#loadingPage").fadeOut();
        // swal("", "Contact with same EmailID exists in Counterparty '" + counterpartyName + "'. Please give a different EmailID.");
    }

    return isformvalid;
}

function modalOnOpen(dialog) {
    dialog.overlay.fadeIn('fast', function () {
        dialog.container.fadeIn('fast', function () {
            dialog.data.hide().slideDown('slow');
        });
    });


    // if the user clicks "yes"
    dialog.data.find("#btnSave").click(function (ev) {
        ev.preventDefault();
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
                    AddressLine2: ($("#txtAddressLine2").val() != null) ? $("#txtAddressLine2").val() : '',
                    City: ($("#txtCity").val() != null) ? $("#txtCity").val() : '',
                    State: ($("#txtState").val() != null) ? $("#txtState").val() : '',
                    Zip: ($("#txtZip").val() != null) ? $("#txtZip").val() : '',
                    Country: $("#ddlCountry").find('option:selected').text(),
                    ContactNo: $("#txtContactNo").val(),
                    Status: $("#ddlStatus").find('option:selected').text(),
                    EmailID: $("#txtEmailID").val(),
                    ModifiedBy: localStorage.UserName
                },
                cache: false,
                success: function (person) {
                    $.modal.close();

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
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty',
                type: 'POST',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                data: {
                    CounterpartyName: $("#txtCounterpartyName").val(),
                    CounterpartyType: $("#ddlCounterpartyType").find('option:selected').text(),
                    AddressLine1: AddressLine1,
                    AddressLine2: $("#txtAddressLine2").val(),
                    City: $("#txtCity").val(),
                    State: $("#txtState").val(),
                    Zip: $("#txtZip").val(),
                    Country: $("#ddlCountry").find('option:selected').text(),
                    ContactNo: $("#txtContactNo").val(),
                    Status: $("#ddlStatus").find('option:selected').text(),
                    EmailID: $("#txtEmailID").val(),
                    CreatedBy: localStorage.UserName
                },
                cache: false,
                success: function (person) {
                    $.modal.close();


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
    });
    dialog.data.find("#btnCancel").click(function (ev) {
        ev.preventDefault();
        $.modal.close();
    });


    dialog.data.find("#btnSaveC").click(function (ev) {
        ev.preventDefault();

        var counterpartyID = "";
        var counterpartyName = "";
        if ($("#ddlCounterparty").find('option:selected').val() != "0") {
            counterpartyID = $("#ddlCounterparty").find('option:selected').val();
            counterpartyName = $("#ddlCounterparty").find('option:selected').text();
        }

        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contacts',
            type: 'POST',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
            data: {
                ContactName: $("#txtContactName").val(),
                CounterpartyName: counterpartyName,
                CounterpartyID: counterpartyID,
                AddressLine1: $("#txtAddressLine1C").val(),
                AddressLine2: $("#txtAddressLine2C").val(),
                City: $("#txtCityC").val(),
                State: $("#txtStateC").val(),
                Zip: $("#txtZipC").val(),
                Country: $("#ddlCountryC").find('option:selected').text(),
                ContactNo: $("#txtContactNoC").val(),
                EmailID: $("#txtEmailIDC").val(),
                CreatedBy: localStorage.UserName
            },
            cache: false,
            success: function (person) {
                $.modal.close();

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
    });

    dialog.data.find("#btnCancelC").click(function (ev) {
        ev.preventDefault();
        $.modal.close();
    });
}

function modalOnClose(dialog) {
    dialog.data.fadeOut('fast', function () {
        dialog.container.slideUp('fast', function () {
            dialog.overlay.fadeOut('slow', function () {
                $.modal.close();
            });
        });
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
function GetSavedViews() {
    $('#liSavedViews').empty();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/savedview?viewfor=Counterparty&userid=',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            $("#liSavedViews").empty();
            $(data).each(function (i, item) {

                var removeBtn = '';
                if (localStorage.UserType.indexOf("Global Contract Owner") >= 0 || localStorage.UserType.indexOf("Global Administrator") >= 0 || localStorage.UserName == item.CreatedBy)
                    removeBtn = '<a href="javascript:void(0); title="Delete" onclick=deleteSavedView(this) id=' + item.RowKey + '><img src="/Content/Images/close-quick.png"></a>';


                var article = '<li><p><a href="javascript:void(0)" onclick="javascript:savedViewDisplay(this)" id=' + item.RowKey + ' name=' + item.ViewName + ' title=' + item.ViewName + '>' + item.ViewName + '</a></p>'
                                + removeBtn
                                + '</li>';

                $("#liSavedViews").append(article);
            });


        },
        error:
            function (data) {
                $('#liSavedViews').empty();
                $("#liSavedViews").append('<p class="f_p-error">No items found.</p>');
            }
    });
}

$('#btnAddView').click(function () {
    $("#txtViewID").val("");
    $("#txtViewName").val("");

    $("#addNewView").dialog("option", "title", "New View");
    $("#addNewView").dialog("open");
});

//function SaveView() {
//    if ($("#txtViewName").val() == "") {
//        swal("", "Enter View Name.");
//    }
//    else {
//        var query = "";
//        query += "Status:";
//        $("#liFiltersStatus span small").each(function (i, item) {
//            var str = item.textContent;
//            query += str + ',';
//        });
//        query = query.substring(0, query.length - 1)
//        query += ";";

//        query += "CounterpartyType:";
//        $("#liFiltersType span small").each(function (i, item) {
//            var str = item.textContent;
//            query += str + ',';
//        });
//        query = query.substring(0, query.length - 1)



//        $.ajax({
//            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/savedview',
//            type: 'POST',
//            dataType: 'json',
//            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
//            data: {
//                RowKey: $("#txtViewID").val(),
//                ViewName: $("#txtViewName").val(),
//                SearchKeyword: $("#txtSearchBox").val(),
//                SortBy: $("#txtSortBy").val(),
//                ViewFor: 'Counterparty',
//                ViewQuery: query,
//                DefaultViewName: vView,
//                CreatedBy: localStorage.UserName,
//                ModifiedBy: localStorage.UserName
//            },
//            cache: false,
//            success: function (person) {
//                if (person == "Please provide other view name.") {
//                    swal("", person);
//                }
//                else {
//                    $("#txtViewName").val("")
//                    GetSavedViews();
//                    $("#addNewView").dialog("close");
//                }
//            }
//        });
//    }
//}

function SaveView(isAdvanceView, operation) {
    if (requiredValidator('addNewAdvanceView', false)) {
        if ($("#txtAdvanceViewName").val() == "") {
            swal("", "Enter View Name.");
        } else {
            $("#loadingPage").fadeIn();
            var valid = true;
            var fieldtype = "";
            var temp = "";
            var query = "<filters>";
            if ($("#tblfilterConditions tr").length > 0) {
                $("#tblfilterConditions tr").each(function (index, val) {
                    temp = "";
                    if (index == 0) {
                        query += '<filter>';
                        query += '<isEnabled>Yes</isEnabled>';
                        query += '<condition>default</condition>';
                        query += '<metadataname>' + $("#" + $(val).attr('id') + ' input:text').filter('[id*="metadata_label"]').val() + '</metadataname>';
                        query += '<metadatavalue>' + $("#" + $(val).attr('id') + ' input:hidden').filter('[id*="metadata_value"]').val() + '</metadatavalue>';
                        query += '<metadatatype>' + $("#" + $(val).attr('id') + ' input:hidden').filter('[id*="metadata_type"]').val() + '</metadatatype>';
                        fieldtype = $("#" + $(val).attr('id') + ' input:hidden').filter('[id*="metadata_type"]').val();
                        switch (fieldtype) {
                            case "Date":
                                if ($("#" + $(val).attr('id') + " input:text").filter("[id*='date_value_']").length > 0) {
                                    temp = $.datepicker.formatDate('mm/dd/yy', $("#" + $(val).attr('id') + " input:text").filter("[id*='date_value_']").datepicker('getDate'));
                                    query += ' <value>' + $.trim(temp) + '</value>';
                                } else {
                                    query += ' <value></value>';
                                }
                                break;
                            case "Choice":
                            case "Multi- Choice (Dropdown)":
                                temp = $("#" + $(val).attr('id') + "  input:text").filter("[id*='choice_value_']").val();
                                if (temp[temp.length - 1] == ',') {
                                    temp = temp.substr(0, temp.lastIndexOf(','));
                                }
                                query += ' <value>' + temp + '</value>';
                                break;
                            case "User":
                                temp = $("#" + $(val).attr('id') + " input:text").filter("[id*='user_value_']").val();
                                if (temp[temp.length - 1] == ',') {
                                    temp = temp.substr(0, temp.lastIndexOf(','));
                                }
                                query += ' <value>' + $.trim(temp) + '</value>';
                                break;
                            case "Yes/No":
                                query += ' <value>' + $.trim($("#" + $(val).attr('id') + " select").filter("[id*='YesNo_value_']").val()) + '</value>';
                                break;
                            case "Value / Financials":
                                query += ' <value>' + $.trim($("#" + $(val).attr('id') + " input:text").filter("[id*='num_value_']").val()) + '</value>';
                                break;
                            default: control =
                                query += ' <value>' + $.trim($("#" + $(val).attr('id') + " input:text").filter("[id*='text_value_']").val()) + '</value>';
                                break;
                        }
                        query += '<operator>' + $("#" + $(val).attr('id') + " select").filter('[id*="operator"]').val() + '</operator>';
                        if ($("#qvThis").hasClass("active_quick_view")) {
                            query += '<quickview>regional</quickview>';
                        }
                        else if ($("#qvRecent").hasClass("active_quick_view")) {
                            query += '<quickview>withContract</quickview>';
                        }
                        else {
                            query += '<quickview>all</quickview>';
                        }
                        query += '</filter>';
                    } else {
                        query += '<filter>';
                        query += '<isEnabled>Yes</isEnabled>';
                        query += '<condition>' + $("#" + $(val).attr('id') + " select").filter('[id*="condition"]').val() + '</condition>';
                        query += '<metadataname>' + $("#" + $(val).attr('id') + ' input:text').filter('[id*="metadata_label"]').val() + '</metadataname>';
                        query += '<metadatavalue>' + $("#" + $(val).attr('id') + ' input:hidden').filter('[id*="metadata_value"]').val() + '</metadatavalue>';
                        query += '<metadatatype>' + $("#" + $(val).attr('id') + ' input:hidden').filter('[id*="metadata_type"]').val() + '</metadatatype>';
                        fieldtype = $("#" + $(val).attr('id') + ' input:hidden').filter('[id*="metadata_type"]').val();
                        switch (fieldtype) {
                            case "Date":
                                if ($("#" + $(val).attr('id') + " input:text").filter("[id*='date_value_']").length > 0) {
                                    temp = $.datepicker.formatDate('mm/dd/yy', $("#" + $(val).attr('id') + " input:text").filter("[id*='date_value_']").datepicker('getDate'));
                                    query += ' <value>' + $.trim(temp) + '</value>';
                                } else {
                                    query += '<value></value>';
                                }
                                break;
                            case "Choice":
                            case "Multi- Choice (Dropdown)":
                                temp = $("#" + $(val).attr('id') + " input:text").filter("[id*='choice_value_']").val();
                                if (temp[temp.length - 1] == ',') {
                                    temp = temp.substr(0, temp.lastIndexOf(','));
                                }
                                query += ' <value>' + $.trim(temp) + '</value>';
                                break;
                            case "User":
                                temp = $("#" + $(val).attr('id') + " input:text").filter("[id*='user_value_']").val();
                                if (temp[temp.length - 1] == ',') {
                                    temp = temp.substr(0, temp.lastIndexOf(','));
                                }
                                query += ' <value>' + $.trim(temp) + '</value>';
                                break;
                            case "Yes/No":
                                query += ' <value>' + $.trim($("#" + $(val).attr('id') + " select").filter("[id*='YesNo_value_']").val()) + '</value>';
                                break;
                            case "Value / Financials":
                                query += ' <value>' + $.trim($("#" + $(val).attr('id') + " input:text").filter("[id*='num_value_']").val()) + '</value>';
                                break;
                            default: control =
                                query += ' <value>' + $.trim($("#" + $(val).attr('id') + " input:text").filter("[id*='text_value_']").val()) + '</value>';
                                break;
                        }
                        query += '<operator>' + $("#" + $(val).attr('id') + " select").filter('[id*="operator"]').val() + '</operator>';
                        query += '</filter>';
                    }

                })
                query += "</filters>";
            }

            var qvName = "";
            if ($('#liFiltersQuickView').text() != "") {
                qvName = getQuickViewLinkName($('#liFiltersQuickView').text());
            }

            var url = "";
            var method = "";
            if (operation == 'add') {
                url = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/savedview';
                method = 'POST';
            } else if (operation == 'update') {
                url = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/savedview?viewid=' + $("#txtViewID").val();
                method = 'PUT';
            }
            if (operation == 'update' && ($("#txtAdvanceViewName").val() != currentadvanceViewObj.ViewName)) {
                $("#loadingPage").fadeOut();
                swal('', 'On edit View name cannot be changed, to create new view please click on \'Save as New View\' button');
            }
            else {
                var valid = true;
                var metadata = ""
                var operator = "";
                var operatortxt = "";
                var temp1 = "";
                var temp2 = "";
                var errmsg = "";

                $("#tblfilterConditions tr").each(function (index, val) {
                    metadata = $("#metadata_value_" + index).val();
                    operator = $("#operator_" + index).val();
                    temp1 = metadata + '~' + operator;
                    $("#tblfilterConditions tr").each(function (index1, val1) {

                        if (index != index1) {
                            metadata = $("#metadata_value_" + index1).val();
                            operator = $("#operator_" + index1).val();
                            operatortxt = $("#operator_" + index1 + ' option:selected').text();
                            temp2 = metadata + '~' + operator;
                            if (temp1 == temp2) {
                                if (errmsg.indexOf(metadata) == -1)
                                    errmsg += 'Dulipcate query with same Metadata and Operator found ' + '\'' + metadata + '\'' + ' ' + '\'' + operatortxt + '\'';
                                valid = false;

                            }
                        }

                    })
                })
                if (valid && errmsg == '') {
                    $.ajax({
                        url: url,
                        type: method,
                        dataType: 'json',
                        headers: { 'eContracts-ApiKey': localStorage.APIKey },
                        data: {
                            RowKey: $("#txtViewID").val(),
                            ViewName: $("#txtAdvanceViewName").val(),
                            SearchKeyword: "",
                            SortBy: $('#conAdvanceViewSortBy').val() + '~' + $('#advanceViewSortDirection').attr('data-direction'),
                            ViewFor: 'Counterparty',
                            ViewQuery: query,
                            DefaultViewName: qvName,
                            CreatedBy: localStorage.UserName,
                            ModifiedBy: localStorage.UserName,
                            isAdvanceView: 'Yes'
                        },
                        cache: false,
                        success: function (person) {
                            if (person == "Please provide other view name.") {
                                $("#loadingPage").fadeOut();
                                swal("", "View Name already exist, Please provide other view name."); // Bug(eO37164)
                            }
                            else {
                                $("#addNewAdvanceView").dialog("close");
                                restoreAdvanceViewIntial();
                                GetSavedViews();

                                if (operation == 'add') {
                                    setTimeout(function () {
                                        var viewObj = $("#liSavedViews li p a").filter('[id*=' + '"' + person.split('&')[0] + '"' + ']');
                                        $("#loadingPage").fadeOut();
                                        if (viewObj.length > 0)
                                            savedViewDisplay(viewObj[0])
                                    }, 5000);

                                } else if (operation == 'update') {
                                    setTimeout(function () {
                                        var viewObj = $("#liSavedViews li p a").filter('[id*=' + '"' + $("#txtViewID").val() + '"' + ']');
                                        $("#loadingPage").fadeOut();
                                        if (viewObj.length > 0)
                                            savedViewDisplay(viewObj[0])
                                    }, 5000);

                                }

                            }
                        }
                    });
                } else {
                    $("#loadingPage").fadeOut();
                    swal('', errmsg);
                }
            }

        }

    }
}

function getQuickViewLinkName(qvName) {
    var splitName = qvName.split(':');
    var rName = splitName[splitName.length - 1];
    rName = $.trim(rName);
    return rName;
}

//function savedViewDisplay(obj) {
//    colorLink('qvThis', false);
//    colorLink('qvRecent', false);
//    colorLink('qvAll', false);
//    $("#liFiltersSearchText").empty();
//    $("#liFiltersStatus").empty();
//    $("#liFiltersType").empty();
//    colorLink('liSavedViews a', false);
//    colorLink('liSavedViews span', false);
//    colorLink(obj.id, true);
//    $("#filterType option:selected").prop('selected', false);
//    $("#filterStatus option:selected").prop('selected', false);
//    $("#txtSearchBox").val("");
//    $("#txtSearchBox").attr("placeholder", "Search in '" + obj.innerText + "'");
//    $.ajax({
//        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/savedview?viewid=' + obj.id,
//        type: 'GET',
//        dataType: 'json',
//        headers: { 'eContracts-ApiKey': localStorage.APIKey },
//        // "Content-Type": "application/json",
//        cache: false,
//        success: function (savedviewentity) {
//            $("#filterStatus option:selected").prop('selected', false);
//            $("#filterType option:selected").prop('selected', false);
//            $("#liFiltersSearchText").empty();
//            $("#liFiltersStatus").empty();
//            $("#liFiltersType").empty();
//            $("#txtSearchBox").val(savedviewentity.SearchKeyword);
//            if (savedviewentity.SearchKeyword != "" && savedviewentity.SearchKeyword != null) {
//                $('#liFiltersSearchText').html('<span><small>Showing search result for : ' + savedviewentity.SearchKeyword + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');
//            } selectedSortOption = savedviewentity.SortBy;
//            $('#tdSort a').each(function (i, item) {
//                item.style.backgroundColor = "";
//            });
//            var val1 = savedviewentity.ViewQuery.split(';');
//            var valstatus = val1[0].split(',');
//            var valstatuslength = valstatus.length;
//            for (var i = 0; i < valstatuslength; i++) {
//                var valuestatus = valstatus[i].split(':');
//                var selectedvaluetoapply = (valuestatus.length == 2) ? valuestatus[1] : valuestatus[0];
//                $("#filterStatus option[value='" + selectedvaluetoapply + "']").prop("selected", true);
//                $('#liFiltersStatus').append('<span><small>' + selectedvaluetoapply + '</small><a href="javascript:void(0)"><img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" /></a></span>');
//            }
//            var valtype = val1[1].split(',');
//            var valtypelength = valtype.length;
//            for (var i = 0; i < valtypelength; i++) {
//                var valuetype = valtype[i].split(':');
//                var selectedvaluetoapply = (valuetype.length == 2) ? valuetype[1] : valuetype[0];
//                var find = " ";
//                var re = new RegExp(find, 'g');
//                selectedvaluetoapply = selectedvaluetoapply.replace(re, '');
//                $("#filterType option[value='" + selectedvaluetoapply + "']").prop("selected", true);
//                $('#liFiltersType').append('<span><small>' + selectedvaluetoapply + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');
//            }

//            if (savedviewentity.DefaultViewName == "BussinessArea") {
//                colorLink('qvThis', true);
//                colorLink('qvRecent', false);
//                colorLink('qvAll', false);
//            }
//            else if (savedviewentity.DefaultViewName == "Recent") {
//                colorLink('qvRecent', true);
//                colorLink('qvAll', false);
//                colorLink('qvThis', false);
//            }
//            else {
//                colorLink('qvAll', true);
//                colorLink('qvRecent', false);
//                colorLink('qvThis', false);
//            }

//            SaveViewapplyFilter();
//        }
//    });
//}

function savedViewDisplay(obj) {
    $("#txtSearchBox").val('');
    $("#liFiltersforQuickViews").css('display', 'none');
    colorLink('liSavedViews a', false);
    //manoj
    colorLink('qvThis', false);
    colorLink('qvRecent', false);
    colorLink('qvAll', false);
    colorLink('liSavedViews span', false);
    //manoj
    $('#liFiltersQuickView').empty();
    colorLink('liQuickView span', false);
    colorLink('liContractViews span', false);
    colorLink('liQuickView a', false);
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/savedview?viewid=' + obj.id + '&userid=' + localStorage.UserID,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        "Content-Type": "application/json",
        cache: false,
        success: function (savedviewentity) {
            currentadvanceViewObj = savedviewentity;
            $("#txtViewID").val(savedviewentity.RowKey);
            if (savedviewentity != null && savedviewentity != "") {
                $("#liFiltersSearchText").empty();
                $("#liFiltersStatus").empty();
                $("#liFiltersType").empty();
                $("#liAdvanceViewFilter").empty();
                var viewQueryXml = savedviewentity.ViewQuery;
                var condition = "";
                var metadata = "";
                var operator = "";
                var value = "";
                var metadatatype = "";
                var filterHtml = "";
                $(viewQueryXml).find('filter').each(function (index, node) {
                    if (index == 0) {
                        metadata = $(node).find('metadataname').text();
                        metadatatype = $(node).find('metadatatype').text();
                        operator = $(node).find('operator').text();
                        switch (operator) {
                            case "eq": operator = "Equals";
                                break;
                            case "lt": operator = "Less than"
                                break;
                            case "le": operator = "Less than or Equals to"
                                break;
                            case "gt": operator = "Greater than to"
                                break;
                            case "ge": operator = "Greater than or Equals to"
                                break;
                            case "ne": operator = "Does not Equals to"
                                break;
                            case "like": operator = "Contains";
                                break;
                            case "empty": operator = "Is Empty"
                                break;
                            case "any": operator = "Any"
                                break;
                            case "notlike": operator = "Not Contains"
                                break;
                        }
                        if (metadatatype == 'Date') {
                            value = $(node).find('value').text();
                            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                            { value = moment(new Date(value)).format('MM/DD/YYYY'); }
                            else { value = moment(new Date(value)).format(localStorage.AppDateFormat); }
                        } else {

                            value = $(node).find('value').text();
                        }
                        if (operator != "Is Empty" && operator != "Any")
                            filterHtml += '<span><small >' + metadata + ' ' + operator + ' ' + value + '</small></span>';
                        else
                            filterHtml += '<span><small >' + metadata + ' ' + operator + '</small></span>';
                    } else {
                        condition = $(node).find('condition').text();
                        metadata = $(node).find('metadataname').text();
                        metadatatype = $(node).find('metadatatype').text();
                        operator = $(node).find('operator').text();
                        switch (operator) {
                            case "eq": operator = "Equals";
                                break;
                            case "lt": operator = "Less than"
                                break;
                            case "le": operator = "Less than or Equals to"
                                break;
                            case "gt": operator = "Greater than to"
                                break;
                            case "ge": operator = "Greater than or Equals to"
                                break;
                            case "ne": operator = "Does not Equals to"
                                break;
                            case "like": operator = "Contains";
                                break;
                            case "empty": operator = "Is Empty"
                                break;
                            case "any": operator = "Any"
                                break;
                            case "notlike": operator = "Not Contains"
                                break;
                        }
                        if (metadatatype == 'Date') {
                            value = $(node).find('value').text();
                            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                            { value = moment(new Date(value)).format('MM/DD/YYYY'); }
                            else { value = moment(new Date(value)).format(localStorage.AppDateFormat); }
                        } else {

                            value = $(node).find('value').text();
                        }
                        if (operator != "Is Empty" && operator != "Any")
                            filterHtml += ' <span><small>' + condition + '</small></span>' + '<span><small >' + metadata + ' ' + operator + ' ' + value + '</small></span>';
                        else
                            filterHtml += '<span><small >' + condition + '</small></span>' + '<span><small >' + metadata + ' ' + operator + '</small></span>';
                    }
                });

                $("#spResult").empty();
                var qvName = "";
                var defaultviewname = savedviewentity.ViewName;
                savedViewNameFromViewTable = defaultviewname;
                qvName = currentadvanceViewObj.ViewName;
                colorLink('liSavedViews a', false);
                colorLink(obj.id, true);
                $("#txtSearchBox").attr("placeholder", "Search in 'All' ");
                $('#menu4').hide();
                $("#showAll").css('display', 'none');
                $("#liFiltersSearchText").empty();
                $("#liFiltersStatus").empty();
                $("#liFiltersType").empty();
                $("#liAdvanceViewFilter").empty();
                var newurl = "";
                var sortby = "&sortbyfield=Timestamp&orderby=DESC";
                if (typeof currentadvanceViewObj.SortBy != 'undefined') {
                    selectedSortOption = currentadvanceViewObj.SortBy.split('~')[0];
                }
                $("#conSortByOptions").val(selectedSortOption)
                $("#conSortByOptions").prop('disabled', true).niceSelect('update');
                switch (selectedSortOption) {
                    case "Recently Updated":
                        sortby = '&sortbyfield=Timestamp&orderby=DESC';
                        break;
                    case "Title(A-Z)":
                        sortby = '&sortbyfield=CounterpartyName&orderby=ASC';
                        break;
                    case "Title(Z-A)":
                        sortby = '&sortbyfield=CounterpartyName&orderby=DESC';
                        break;
                    default:
                        sortby = '&sortbyfield=Timestamp&orderby=DESC';
                        break;
                }
                if (typeof currentadvanceViewObj.SortBy != 'undefined') {
                    var orderBy = currentadvanceViewObj.SortBy.split('~')[1];
                    if (typeof orderBy != 'undefined' && sortby.indexOf('ContractTitle') == -1) {
                        sortby = sortby.substr(0, sortby.lastIndexOf('&'));
                        sortby = sortby + '&orderby=' + orderBy;
                    }
                }
                var baname = ";";
                if (thisBusinessAreaName == "" || thisBusinessAreaName == "All") {
                } else {
                    baname = thisBusinessAreaName;
                }
                var baloc = "";
                if (typeof localStorage.GlobalBusinessAreaLocation != 'undefined' && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
                    baloc = encodeURIComponent(localStorage.GlobalBusinessAreaLocation);
                }
                newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty?BusinessAreaPath=' + baloc + '&filterXml=' + viewQueryXml + sortby + "&viewName=" + qvName + '&searchkeyword=' + encodeURIComponent($("#txtSearchBox").val());
                $('#listCounterparty').html('<img src="../Content/Images/icon/loading.gif">');
                $.ajax({
                    url: newurl,
                    type: 'GET',
                    dataType: 'json',
                    'Content-Type': 'application/json',
                    cache: false,
                    headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName, BusinessAreaLocation: localStorage.GlobalBusinessAreaLocation },
                    success: function (data) {
                        $("#compact-pagination").css('display', '');
                        $('#listCounterparty').empty();
                        GenerateTable(data);
                    },
                    error:
                        function (data) {
                            $("#listCounterparty").empty();
                            $("#listCounterparty").append("<p class='f_p-error'>No items found.</p>");
                            $("#compact-pagination").css('display', 'none');
                            $("#divChkSelectAll").css('display', 'none');
                        }
                });
                $("#dvfilter").hide();
                $("#liAdvanceViewFilter").html(filterHtml + '<a style="float:right;" href="javascript:void(0)" onclick="editAdvanceView()">Edit View</a>');
                //manoj
                var txtsearchboxvalue = $.trim($('#txtSearchBox').val().trim());
                $("#txtSearchBox").val(txtsearchboxvalue);
                if (txtsearchboxvalue != "" && txtsearchboxvalue != null) {
                    $('#liFiltersSearchText').append('<span><small>Showing search result for : ' + txtsearchboxvalue + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');
                }
                //manoj
            }
        }
    });
}

//manoj
function savedViewDisplaywithSearch(obj) {
    $("#liFiltersforQuickViews").css('display', 'none');
    colorLink('liSavedViews a', false);
    $('#liFiltersQuickView').empty();
    colorLink('liQuickView span', false);
    colorLink('liContractViews span', false);
    colorLink('liQuickView a', false);
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/savedview?viewid=' + obj.id + '&userid=' + localStorage.UserID,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        "Content-Type": "application/json",
        cache: false,
        success: function (savedviewentity) {
            currentadvanceViewObj = savedviewentity;
            $("#txtViewID").val(savedviewentity.RowKey);
            if (savedviewentity != null && savedviewentity != "") {
                $("#liFiltersSearchText").empty();
                $("#liFiltersStatus").empty();
                $("#liFiltersType").empty();
                $("#liAdvanceViewFilter").empty();
                var viewQueryXml = savedviewentity.ViewQuery;
                var condition = "";
                var metadata = "";
                var operator = "";
                var value = "";
                var metadatatype = "";
                var filterHtml = "";
                $(viewQueryXml).find('filter').each(function (index, node) {
                    if (index == 0) {
                        metadata = $(node).find('metadataname').text();
                        metadatatype = $(node).find('metadatatype').text();
                        operator = $(node).find('operator').text();
                        switch (operator) {
                            case "eq": operator = "Equals";
                                break;
                            case "lt": operator = "Less than"
                                break;
                            case "le": operator = "Less than or Equals to"
                                break;
                            case "gt": operator = "Greater than to"
                                break;
                            case "ge": operator = "Greater than or Equals to"
                                break;
                            case "ne": operator = "Does not Equals to"
                                break;
                            case "like": operator = "Contains";
                                break;
                            case "empty": operator = "Is Empty"
                                break;
                            case "any": operator = "Any"
                                break;
                            case "notlike": operator = "Not Contains"
                                break;
                        }
                        if (metadatatype == 'Date') {
                            value = $(node).find('value').text();
                            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                            { value = moment(new Date(value)).format('MM/DD/YYYY'); }
                            else { value = moment(new Date(value)).format(localStorage.AppDateFormat); }
                        } else {

                            value = $(node).find('value').text();
                        }
                        if (operator != "Is Empty" && operator != "Any")
                            filterHtml += '<span><small >' + metadata + ' ' + operator + ' ' + value + '</small></span>';
                        else
                            filterHtml += '<span><small >' + metadata + ' ' + operator + '</small></span>';
                    } else {
                        condition = $(node).find('condition').text();
                        metadata = $(node).find('metadataname').text();
                        metadatatype = $(node).find('metadatatype').text();
                        operator = $(node).find('operator').text();
                        switch (operator) {
                            case "eq": operator = "Equals";
                                break;
                            case "lt": operator = "Less than"
                                break;
                            case "le": operator = "Less than or Equals to"
                                break;
                            case "gt": operator = "Greater than to"
                                break;
                            case "ge": operator = "Greater than or Equals to"
                                break;
                            case "ne": operator = "Does not Equals to"
                                break;
                            case "like": operator = "Contains";
                                break;
                            case "empty": operator = "Is Empty"
                                break;
                            case "any": operator = "Any"
                                break;
                            case "notlike": operator = "Not Contains"
                                break;
                        }
                        if (metadatatype == 'Date') {
                            value = $(node).find('value').text();
                            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                            { value = moment(new Date(value)).format('MM/DD/YYYY'); }
                            else { value = moment(new Date(value)).format(localStorage.AppDateFormat); }
                        } else {

                            value = $(node).find('value').text();
                        }
                        if (operator != "Is Empty" && operator != "Any")
                            filterHtml += ' <span><small>' + condition + '</small></span>' + '<span><small >' + metadata + ' ' + operator + ' ' + value + '</small></span>';
                        else
                            filterHtml += '<span><small >' + condition + '</small></span>' + '<span><small >' + metadata + ' ' + operator + '</small></span>';
                    }
                });

                $("#spResult").empty();
                var qvName = "";
                var defaultviewname = savedviewentity.ViewName;
                savedViewNameFromViewTable = defaultviewname;
                qvName = currentadvanceViewObj.ViewName;
                colorLink('liSavedViews a', false);
                colorLink(obj.id, true);
                $("#txtSearchBox").attr("placeholder", "Search in 'All' ");
                $('#menu4').hide();
                $("#showAll").css('display', 'none');
                $("#liFiltersSearchText").empty();
                $("#liFiltersStatus").empty();
                $("#liFiltersType").empty();
                $("#liAdvanceViewFilter").empty();
                var newurl = "";
                var sortby = "&sortbyfield=Timestamp&orderby=DESC";
                if (typeof currentadvanceViewObj.SortBy != 'undefined') {
                    selectedSortOption = currentadvanceViewObj.SortBy.split('~')[0];
                }
                $("#conSortByOptions").val(selectedSortOption)
                $("#conSortByOptions").prop('disabled', true).niceSelect('update');
                switch (selectedSortOption) {
                    case "Recently Updated":
                        sortby = '&sortbyfield=Timestamp&orderby=DESC';
                        break;
                    case "Title(A-Z)":
                        sortby = '&sortbyfield=CounterpartyName&orderby=ASC';
                        break;
                    case "Title(Z-A)":
                        sortby = '&sortbyfield=CounterpartyName&orderby=DESC';
                        break;
                    default:
                        sortby = '&sortbyfield=Timestamp&orderby=DESC';
                        break;
                }
                if (typeof currentadvanceViewObj.SortBy != 'undefined') {
                    var orderBy = currentadvanceViewObj.SortBy.split('~')[1];
                    if (typeof orderBy != 'undefined' && sortby.indexOf('ContractTitle') == -1) {
                        sortby = sortby.substr(0, sortby.lastIndexOf('&'));
                        sortby = sortby + '&orderby=' + orderBy;
                    }
                }
                var baname = ";";
                if (thisBusinessAreaName == "" || thisBusinessAreaName == "All") {
                } else {
                    baname = thisBusinessAreaName;
                }
                var baloc = "";
                if (typeof localStorage.GlobalBusinessAreaLocation != 'undefined' && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
                    baloc = encodeURIComponent(localStorage.GlobalBusinessAreaLocation);
                }
                newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty?BusinessAreaPath=' + baloc + '&filterXml=' + viewQueryXml + sortby + "&viewName=" + qvName + '&searchkeyword=' + encodeURIComponent($("#txtSearchBox").val());
                $('#listCounterparty').html('<img src="../Content/Images/icon/loading.gif">');
                $.ajax({
                    url: newurl,
                    type: 'GET',
                    dataType: 'json',
                    'Content-Type': 'application/json',
                    cache: false,
                    headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName, BusinessAreaLocation: localStorage.GlobalBusinessAreaLocation },
                    success: function (data) {
                        $("#compact-pagination").css('display', '');
                        $('#listCounterparty').empty();
                        GenerateTable(data);
                    },
                    error:
                        function (data) {
                            $("#listCounterparty").empty();
                            $("#listCounterparty").append("<p class='f_p-error'>No items found.</p>");
                            $("#compact-pagination").css('display', 'none');
                            $("#divChkSelectAll").css('display', 'none');
                        }
                });
                $("#dvfilter").hide();
                $("#liAdvanceViewFilter").html(filterHtml + '<a style="float:right;" href="javascript:void(0)" onclick="editAdvanceView()">Edit View</a>');
                //manoj
                var txtsearchboxvalue = $.trim($('#txtSearchBox').val().trim());
                $("#txtSearchBox").val(txtsearchboxvalue);
                if (txtsearchboxvalue != "" && txtsearchboxvalue != null) {
                    $('#liFiltersSearchText').append('<span><small>Showing search result for : ' + txtsearchboxvalue + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');
                }
                //manoj
            }
        }
    });
}
//manoj

function clearSelection() {
    $('#txtSearchBox').val("");
    $("#showAll").css('display', 'inline');
    $("#liFiltersSearchText").empty();
    $("#liFiltersStatus").empty();
    $("#liFiltersType").empty();
    $("#aRecentlyUpdated").css("background-color", "");
    $("#aRecentlyCreated").css("background-color", "");
    $("#conSortByOptions").val('Recently Updated')
    $("#conSortByOptions").prop('disabled', false).niceSelect('update');
    $("#filterStatus option:selected").prop('selected', false);
    $("#filterType option:selected").prop('selected', false);
    $('#tdSort a').each(function (i, item) {
        item.style.backgroundColor = "";
    });
    applyFilter();
    $("#showAll").css('display', 'inline');
    $("#btnAddView").css('display', 'none');
}

//function applyFilter(sortByOptions, sortDirection) {
//    if ($("#filterContractType :selected").length > 10) {
//        swal("", "Select upto 10.");
//    }
//    else {
//        $("#spResult").empty();
//        var qvName = "";
//        if ($('#liFiltersQuickView').text() != "") {
//            qvName = getQuickViewLinkName($('#liFiltersQuickView').text());
//        }
//        if (savedViewNameFromViewTable != "")
//            qvName = savedViewNameFromViewTable;

//        if (qvName == "") {
//            qvName = "All";
//            colorLink('liSavedViews a', false);
//            $("#btnFilter").css('display', 'inline');
//            $("#dvSrhBox").css('display', '');
//            $("#filteroptionrenewdates").css('display', 'none');
//            $("#txtSearchBox").val("");
//            $("#txtSearchBox").attr("placeholder", "Search in 'All'");
//        }
//        $(".hhide2").css('display', 'none');
//        $('#menu4').hide();
//        $("#showAll").css('display', 'none');
//        $("#liFiltersSearchText").empty();
//        $("#liFiltersStatus").empty();
//        $("#liFiltersType").empty();
//        $("#liFiltersSearchText").empty();
//        var txtsearchboxvalue = $.trim($('#txtSearchBox').val());
//        if (txtsearchboxvalue != "" && txtsearchboxvalue != null) {
//            $('#liFiltersSearchText').html('<span><small>Showing search result for : ' + txtsearchboxvalue + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');
//        }
//        var newurl = "";
//        var sortby = "&sortbyfield=Timestamp&orderby=DESC";
//        selectedSortOption = $('#conSortByOptions').find(":selected").text();
//        switch (selectedSortOption) {
//            case "Recently Updated":
//                sortby = '&sortbyfield=Timestamp&orderby=DESC';
//                break;
//            case "Title(A-Z)":
//                sortby = '&sortbyfield=RequestTitle&orderby=ASC';
//                break;
//            case "Title(Z-A)":
//                sortby = '&sortbyfield=RequestTitle&orderby=DESC';
//                break;
//            default:
//                sortby = '&sortbyfield=Timestamp&orderby=DESC';
//                break;
//        }
//var customquery = '';
//var filterquery = '';
//$('#filterStatus :selected').each(function (i, selected) {
//    if ($(selected).text() == "All") {
//        filterquery = ''; return false;
//    }
//    $('#liFiltersStatus').append('<span><small>' + $(selected).text() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');
//    if ($(selected).text() == "Not Available") {
//        if (filterquery == '')
//            filterquery += 'Status:undefined';
//        else
//            filterquery += ',undefined';
//    }
//    else {
//        if (filterquery == '')
//            filterquery += 'Status:' + $(selected).text();
//        else
//            filterquery += ',' + $(selected).text();
//    }

//});
//        if (filterquery == '')
//            $("#liFiltersStatus").empty(); else {
//            if (customquery == '')
//                customquery = filterquery;
//            else
//                customquery += ';' + filterquery;
//        }
//        filterquery = '';
//        $('#filterRequestType :selected').each(function (i, selected) {
//            if ($(selected).text() == "All") {
//                filterquery = ''; return false;
//            }
//            $('#liFiltersType').append('<span><small>' + $(selected).text() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');

//            if (filterquery == '')
//                filterquery += 'RequestType:' + $(selected).text();
//            else
//                filterquery += ',' + $(selected).text();

//        });
//        if (filterquery == '')
//            $("#liFiltersType").empty(); else {
//            if (customquery == '')
//                customquery = filterquery;
//            else
//                customquery += ';' + filterquery;
//        }



//        if (customquery == '') {
//            $("#showAll").css('display', 'inline');
//        }
//        else {
//            //$("#btnAddView").css('display', 'none');
//            $("#btnAddViewRequest").css('display', 'block');
//        }

//        $("#listContracts").empty();

//        var baname = ";";
//        if (thisBusinessAreaName == "" || thisBusinessAreaName == "All") {
//        } else {
//            baname = thisBusinessAreaName;
//        }
//        var baloc = "";
//        if (typeof localStorage.GlobalBusinessAreaLocation != 'undefined' && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
//            baloc = encodeURIComponent(localStorage.GlobalBusinessAreaLocation);
//        }
//        newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/getrelatedcounterparty?searchkeyword=' + encodeURIComponent($("#txtSearchBox").val()) + '&customquery=' + customQuery1 + customQuery2 + sortby;
//        $('#listCounterparty').html('<img src="../Content/Images/icon/loading.gif">');
//        newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests?BusinessAreaPath=' + baloc + '&stage=pipeline&searchkeyword=' + encodeURIComponent($("#txtSearchBox").val().trim()) + '&customquery=' + encodeURIComponent(customquery) + sortby + "&viewName=" + qvName;
//        $('#listCounterparty').html('<img src="../Content/Images/icon/loading.gif">');
//        $.ajax({
//            url: newurl,
//            type: 'GET',
//            dataType: 'json',
//            'Content-Type': 'application/json',
//            cache: false,
//            headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName, BusinessArea: baname, BusinessAreaLocation: localStorage.GlobalBusinessAreaLocation },
//            success: function (data) {
//                $("#compact-pagination").css('display', '');
//                $('#listContracts').empty();
//                GetData(data);
//            },
//            error:
//                function (data) {
//                    $("#listContracts").empty();
//                    $("#listContracts").append("<p class='f_p-error'>No items found.</p>");
//                    $("#compact-pagination").css('display', 'none');
//                    $("#divChkSelectAll").css('display', 'none');
//                }
//        });

//        $("#dvfilter").hide();
//    }
//}

function applyFilter(sortByOptions, sortDirection) {
    //manoj
    var allowcustomsearch = false;
    if (savedViewNameFromViewTable != "") {
        var CustomUl = $("#liSavedViews");
        TriggerChild = $(CustomUl).find(".active_quick_view");
        if (typeof TriggerChild != 'undefined' && TriggerChild != null && TriggerChild != "") {
            savedViewDisplaywithSearch(TriggerChild[0]);
            allowcustomsearch = true;
        }
    }

    if (!allowcustomsearch) {
        $(".hhide2").css('display', 'none');
        $('#menu4').hide();
        $("#showAll").css('display', 'none');
        $("#liFiltersSearchText").empty();
        $("#liFiltersStatus").empty();
        $("#liFiltersType").empty();
        $("#liFiltersSearchText").empty();
        $("#liAdvanceViewFilter").empty();
        var txtsearchboxvalue = $.trim($('#txtSearchBox').val());
        if (txtsearchboxvalue != "" && txtsearchboxvalue != null) {
            $('#liFiltersSearchText').append('<span><small>' + txtsearchboxvalue + '</small><a href="javascript:void(0)"><img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" /></a></span>');
        }
        var customQuery1 = "Status:";
        var isContainingAll1 = false;
        var isAnySelected1 = false;
        $('#filterStatus :selected').each(function (i, selected) {
            isAnySelected1 = true;
            if ($(selected).text() == "All")
                isContainingAll1 = true;

            $('#liFiltersStatus').append('<span><small>' + $(selected).text() + '</small><a href="javascript:void(0)"><img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" /></a></span>');
            customQuery1 += ',' + $(selected).text();

        });
        if (!isAnySelected1) {
            customQuery1 = "";
        }
        if (isContainingAll1) {
            $("#liFiltersStatus").empty();
            customQuery1 = "";
        }

        var customQuery2 = ";CounterpartyType:";
        var isContainingAll2 = false;
        var isAnySelected2 = false;
        $('#filterType :selected').each(function (i, selected) {
            isAnySelected2 = true;
            var sel = $(selected).text();
            if ($(selected).text() == "All")
                isContainingAll2 = true;

            $('#liFiltersType').append('<span><small>' + sel + '</small><a href="javascript:void(0)"><img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" /></a></span>');
            sel = encodeURIComponent(sel);
            customQuery2 += ',' + sel;
        });
        if (!isAnySelected2) {
            customQuery2 = "";
        }
        if (isContainingAll2) {
            $("#liFiltersType").empty();
            customQuery2 = "";
        }

        if (isContainingAll1 && isContainingAll2) {
            $("#showAll").css('display', 'inline');
        }

        if (!isAnySelected1 && !isAnySelected2 && txtsearchboxvalue == "") {
            $("#btnAddView").css('display', 'none');
        }

        $("#listCounterparty").empty();

        var newurl = "";
        var sortby = "&sortbyfield=CounterpartyName&orderby=ASC";

        if (typeof sortByOptions != 'undefined' && sortByOptions != "") {
            selectedSortOption = sortByOptions;
        }

        switch (selectedSortOption) {
            case "Recently Updated":
                sortby = '&sortbyfield=Timestamp&orderby=DESC';
                break;
            case "Recently Created":
                sortby = '&sortbyfield=Created&orderby=DESC';
                break;
            case "Title(A-Z)":
                sortby = '&sortbyfield=CounterpartyName&orderby=ASC';
                break;
            case "Title(Z-A)":
                sortby = '&sortbyfield=CounterpartyName&orderby=DESC';
                break;
            default:
                sortby = '&sortbyfield=Timestamp&orderby=DESC';
                break;
        }

        newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/getrelatedcounterparty?searchkeyword=' + encodeURIComponent($("#txtSearchBox").val()) + '&customquery=' + customQuery1 + customQuery2 + sortby;
        $('#listCounterparty').html('<img src="../Content/Images/icon/loading.gif">');

        if ($("#qvAll").hasClass("active_quick_view")) {
            $.ajax({
                url: newurl,
                type: 'GET',
                dataType: 'json',
                'Content-Type': 'application/json',
                cache: false,
                headers: { 'eContracts-ApiKey': localStorage.APIKey,'BusinessAreaLocationList': localStorage.GlobalBusinessAreaLocation, 'RequiresScope': 'No' },
                success: function (data) {
                    $("#compact-pagination").css('display', '');
                    $('#listCounterparty').empty();
                    GenerateTable(data);
                },
                error:
                    function (data) {
                        $("#listCounterparty").empty();
                        $("#listCounterparty").append('<p class="f_p-error">No items found.</p>');
                        $("#compact-pagination").css('display', 'none');
                    }
            });
        } else if ($("#qvThis").hasClass("active_quick_view")) {
            $.ajax({
                url: newurl,
                type: 'GET',
                dataType: 'json',
                'Content-Type': 'application/json',
                cache: false,
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'BusinessAreaLocation': localStorage.GlobalBusinessAreaLocation, 'RequiresScope': 'No' },
                success: function (data) {
                    $("#compact-pagination").css('display', '');
                    $('#listCounterparty').empty();
                    GenerateTable(data);
                },
                error:
                    function (data) {
                        $("#listCounterparty").empty();
                        $("#listCounterparty").append("<p class='f_p-error'>No items found.</p>");
                        $("#compact-pagination").css('display', 'none');
                    }
            });
        }
        else {

            var txtsearchboxvalue = $.trim($('#txtSearchBox').val());
            if (txtsearchboxvalue == "" || txtsearchboxvalue == null) {
                $("#txtSearchBox").val("");
                $("#txtSearchBox").attr("placeholder", "Search in 'Counterparties with Contracts'");
            }
            colorLink('liSavedViews a', false);
            colorLink('liSavedViews span', false);
            colorLink('qvRecent', true);
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Counterparty/RecentUsed?searchkeyword=' + encodeURIComponent($("#txtSearchBox").val()) + '&customquery=' + customQuery1 + customQuery2 + sortby,
                type: 'GET',
                dataType: 'json',
                'Content-Type': 'application/json',
                cache: false,
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'BusinessAreaLocation': localStorage.GlobalBusinessAreaLocation, 'RequiresScope': 'No' },
                success: function (data) {
                    $("#compact-pagination").css('display', '');
                    $('#listCounterparty').empty();
                    GenerateTable(data);
                },
                error:
                    function (data) {
                        $("#listCounterparty").empty();
                        $("#listCounterparty").append("<p class='f_p-error'>No items found.</p>");
                        $("#compact-pagination").css('display', 'none');
                    }
            });
        }
    }
}

function editAdvanceView() {

    if (metadataLookUp.length == 0) {
        $("#loadingPage").fadeIn();
        //Status
        var objStatus = {};
        objStatus.value = "Status";
        objStatus.fieldType = "Custom Lookup";
        objStatus.choiceValues = "";
        objStatus.fieldName = "Status";
        objStatus.label = "Status";

        //Counterparty Type
        var objCounterparty = {};
        objCounterparty.value = "Counterparty Type";
        objCounterparty.fieldType = "Custom Lookup";
        objCounterparty.choiceValues = "";
        objCounterparty.fieldName = "CounterpartyType";
        objCounterparty.label = "Counterparty Type";

        metadataLookUp.push(objCounterparty);
        metadataLookUp.push(objStatus);

        $("#loadingPage").fadeOut();
        appendFiltersOnEdit(currentadvanceViewObj.ViewQuery)

    } else {
        $("#loadingPage").fadeIn();
        appendFiltersOnEdit(currentadvanceViewObj.ViewQuery);
    }
}


function appendFiltersOnEdit(xmlQuery, isQuickView) {
    var condition = "";
    var operator = "";
    var metadataName = "";
    var metadataValue = "";
    var metadataType = "";
    var value = "";
    var tr = "";
    rowCounter = 0;
    restoreAdvanceViewIntial();
    $(xmlQuery).find('filter').each(function (index, value) {
        if (index == 0) {
            metadataName = $(value).find('metadataname').text();
            metadataValue = $(value).find('metadatavalue').text();
            metadataType = $(value).find('metadatatype').text();
            rvalue = $(value).find('value').text();
            operator = $(value).find('operator').text();

            $("#tr_0 input:text").filter('[id*="metadata_label_"]').val(metadataName);
            $("#tr_0 input:hidden").filter('[id*="metadata_value_"]').val(metadataValue);
            $("#tr_0 input:hidden").filter('[id*="metadata_type_"]').val(metadataType);


            $("#metadata_label_0").autocomplete({
                source: metadataLookUp,
                minLength: 0,
                select: function (event, ui) {
                    $("#metadata_value_0").val(ui.item.fieldName)
                    $("#metadata_type_0").val(ui.item.fieldType)
                    currentAutoCompleteUiObj = ui;
                    createOperatorsBasedOnMetdataType(ui.item.fieldType, 0)
                    if (operator != 'empty' && operator != 'any')
                        createValueFieldBasedOnFieldType(ui.item.fieldType, ui.item.choiceValues, 0);

                },

            }).focus(function () {
                $(this).autocomplete('search', $(this).val())
            });
        } else {
            insertNewfilterCondition("");
            metadataName = $(value).find('metadataname').text();
            metadataValue = $(value).find('metadatavalue').text();
            metadataType = $(value).find('metadatatype').text();
            rvalue = $(value).find('value').text();
            operator = $(value).find('operator').text();
            condition = $(value).find('condition').text();

            $("#tr_" + rowCounter + " input:text").filter('[id*="metadata_label_"]').val(metadataName);
            $("#tr_" + rowCounter + " input:hidden").filter('[id*="metadata_value_"]').val(metadataValue);
            $("#tr_" + rowCounter + " input:hidden").filter('[id*="metadata_type_"]').val(metadataType);
            $("#tr_" + rowCounter + " Select").filter('[id*="condition_"]').val(condition);

            $("#metadata_label_" + rowCounter).autocomplete({
                source: metadataLookUp,
                minLength: 0,
                select: function (event, ui) {
                    $("#metadata_value_" + rowCounter).val(ui.item.fieldName)
                    $("#metadata_type_" + rowCounter).val(ui.item.fieldType)
                    currentAutoCompleteUiObj = ui;
                    createOperatorsBasedOnMetdataType(ui.item.fieldType, rowCounter)
                    createValueFieldBasedOnFieldType(ui.item.fieldType, ui.item.choiceValues, 0);
                },
            }).focus(function () {
                $(this).autocomplete('search', $(this).val())
            });

        }
        var item = "";
        if (metadataType == "User" || metadataType == "Choice" || metadataType == "Yes/No" || metadataType == "Date" || metadataType == "Value / Financials" || metadataType == "Multi- Choice (Dropdown)") {
            item = metadataLookUp.filter(function (metadata, index) {
                return metadata.fieldName == metadataValue && metadata.fieldType == metadataType
            })
            if (item.length > 0 && typeof item[0] != 'undefined' && operator != 'empty' && operator != 'any')
                createValueFieldBasedOnFieldType(item[0].fieldType, item[0].choiceValues, rowCounter);
            else if (operator != 'empty' && operator != 'any')
                createValueFieldBasedOnFieldType('', '', rowCounter);

        } else if (operator != 'empty' && operator != 'any') {
            createValueFieldBasedOnFieldType('', '', rowCounter);
        }
        if (item.length > 0 && typeof item[0] != 'undefined')
            createOperatorsBasedOnMetdataType(item[0].fieldType, rowCounter);
        else
            createOperatorsBasedOnMetdataType('', rowCounter);
        $("#tr_" + rowCounter + " Select").filter('[id*="operator_"]').val(operator);
        switch (metadataType) {
            case "User":
                $("#tr_" + rowCounter + " input:text").filter('[id*="user_value_"]').val(rvalue);
                break;
            case "Choice":
            case "Multi - Choice(Dropdown)":
                $("#tr_" + rowCounter + " input:text").filter('[id*="choice_value_"]').val(rvalue);
                break;
            case "Yes/No":
                $("#tr_" + rowCounter + " select").filter('[id*="YesNo_value_"]').val(rvalue);
                break;
            case "Value / Financials":
                $("#tr_" + rowCounter + " input:text").filter('[id*="num_value_"]').val(rvalue);
                break;
            case "Date":
                var temp = "";
                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                { temp = moment(new Date(rvalue)).format('MM/DD/YYYY'); }
                else { temp = moment(new Date(rvalue)).format(localStorage.AppDateFormat); }

                $("#tr_" + rowCounter + " input:text").filter('[id*="date_value_"]').datepicker('setDate', temp);
                break;
            default:
                if (rvalue != 'undefined' && rvalue != '')
                    $("#tr_" + rowCounter + " input:text").filter('[id*="text_value_"]').val(rvalue);
                break;

        }
        if (typeof isQuickView == 'undefined') {
            $("#txtAdvanceViewName").val(currentadvanceViewObj.ViewName);

        } else {
            $("#txtAdvanceViewName").val(ObjectNameToSend);
        }

        var sortBy = currentadvanceViewObj.SortBy.split('~')[0];
        var orderBy = currentadvanceViewObj.SortBy.split('~')[1];
        if (typeof sortBy != 'undefined' && sortBy != '' && sortBy != null)
            $("#conAdvanceViewSortBy").val(sortBy)
        if (sortBy == "Title(A-Z)" || sortBy == "Title(Z-A)") {
            $("#advanceViewSortDirection").css('display', 'none');
        }
        if (typeof orderBy != 'undefined' && orderBy != '' && orderBy != null) {
            if (orderBy == 'ASC') {
                $("#advanceViewSortDirection").attr("data-direction", 'ASC');
                $("#advanceViewSortDirection").attr("src", '/Content/Images/down-arrow_1.png');
            } else if (orderBy == 'DESC') {
                $("#advanceViewSortDirection").attr("data-direction", 'DESC');
                $("#advanceViewSortDirection").attr("src", '/Content/Images/up_arrow_1.png');
            }
        }
    });

    if (typeof isQuickView == 'undefined') {
        $("#addNewAdvanceView").dialog({ 'title': 'Edit View' });
        $("#btnCreateAdvanceView").css("display", "none");
        $("#btnUpdateAdvanceView").css("display", "");
        $("#btnAdvanceViewSaveAs").css("display", "");
    }
    else {
        $("#addNewAdvanceView").dialog({ 'title': 'Quick View' });
        $("#btnCreateAdvanceView").css("display", "none");
        $("#btnUpdateAdvanceView").css("display", "none");
        $("#btnAdvanceViewSaveAs").css("display", "");
    }
    $("#loadingPage").fadeOut();
    $("#addNewAdvanceView").dialog("open");
}

function SaveViewapplyFilter() {
    $(".hhide2").css('display', 'none');
    $('#menu4').hide();
    $("#showAll").css('display', 'none');
    $("#liFiltersStatus").empty();
    $("#liFiltersType").empty();
    $("#btnAddView").css('display', 'block');
    $("#liFiltersSearchText").empty();
    var txtsearchboxvalue = $.trim($('#txtSearchBox').val());
    if (txtsearchboxvalue != "" && txtsearchboxvalue != null) {
        $('#liFiltersSearchText').append('<span><small>' + txtsearchboxvalue + '</small><a href="javascript:void(0)"><img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" /></a></span>');
    }
    var customQuery1 = "Status:";
    var isContainingAll1 = false;
    var isAnySelected1 = false;
    $('#filterStatus :selected').each(function (i, selected) {
        isAnySelected1 = true;
        if ($(selected).text() == "All")
            isContainingAll1 = true;
        //$('#liFiltersStatus').append('<li style="display:inline; color:#ffffff;">' + $(selected).text() + '<img title="Remove" onclick="javascript:liRemove(this);" style="margin-left: 5px; margin-right: 10px; cursor:pointer;" src="../Content/Images/icon/close.png"></li>');
        $('#liFiltersStatus').append('<span><small>' + $(selected).text() + '</small><a href="javascript:void(0)"><img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" /></a></span>');
        customQuery1 += ',' + $(selected).text();

    });
    if (!isAnySelected1) {
        customQuery1 = "";
    }
    if (isContainingAll1) {
        $("#liFiltersStatus").empty();
        customQuery1 = "";
    }

    var customQuery2 = ";CounterpartyType:";
    var isContainingAll2 = false;
    var isAnySelected2 = false;
    $('#filterType :selected').each(function (i, selected) {
        isAnySelected2 = true;
        if ($(selected).text() == "All")
            isContainingAll2 = true;
        //$('#liFiltersType').append('<li style="display:inline; color:#ffffff;">' + $(selected).text() + '<img title="Remove" onclick="javascript:liRemove(this);" style="margin-left: 5px; margin-right: 10px; cursor:pointer;" src="../Content/Images/icon/close.png"></li>');
        $('#liFiltersType').append('<span><small>' + $(selected).text() + '</small><a href="javascript:void(0)"><img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" /></a></span>');
        customQuery2 += ',' + $(selected).text();
    });
    if (!isAnySelected2) {
        customQuery2 = "";
    }
    if (isContainingAll2) {
        $("#liFiltersType").empty();
        customQuery2 = "";
    }

    if (isContainingAll1 && isContainingAll2) {
        $("#showAll").css('display', 'inline');
    }

    if (!isAnySelected1 && !isAnySelected2 && txtsearchboxvalue == "") {
        $("#btnAddView").css('display', 'none');
    }

    $("#listCounterparty").empty();

    var newurl = "";
    //var sortby = "&sortbyfield=Timestamp&orderby=DESC";
    var sortby = "&sortbyfield=CounterpartyName&orderby=ASC";
    switch (selectedSortOption) {
        case "Recently Updated":
            sortby = '&sortbyfield=Timestamp&orderby=DESC';
            break;
        case "Recently Created":
            sortby = '&sortbyfield=Created&orderby=DESC';
            break;
            //default:
            //    sortby = '&sortbyfield=CounterpartyName&orderby=ASC';
            //    break;
    }

    newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/getrelatedcounterparty?searchkeyword=' + encodeURIComponent($("#txtSearchBox").val()) + '&customquery=' + customQuery1 + customQuery2 + sortby;
    $('#listCounterparty').html('<img src="../Content/Images/icon/loading.gif">');

    if ($("#qvAll").hasClass("active_quick_view")) {
        $.ajax({
            url: newurl,
            type: 'GET',
            dataType: 'json',
            'Content-Type': 'application/json',
            cache: false,
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'RequiresScope': 'No' },
            success: function (data) {
                $("#compact-pagination").css('display', '');
                $('#listCounterparty').empty();
                GenerateTable(data);
            },
            error:
                function (data) {
                    $("#listCounterparty").empty();
                    $("#listCounterparty").append('<p class="f_p-error">No items found.</p>');
                    $("#compact-pagination").css('display', 'none');
                }
        });
    } else if ($("#qvRecent").hasClass("active_quick_view")) {
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Counterparty/RecentUsed?searchkeyword=' + encodeURIComponent($("#txtSearchBox").val()) + '&customquery=' + customQuery1 + customQuery2 + sortby,
            type: 'GET',
            dataType: 'json',
            'Content-Type': 'application/json',
            cache: false,
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'BusinessAreaLocation': localStorage.GlobalBusinessAreaLocation, 'RequiresScope': 'No' },
            success: function (data) {
                $("#compact-pagination").css('display', '');
                $('#listCounterparty').empty();
                GenerateTable(data);

            },
            error:
                function (data) {
                    $("#listCounterparty").empty();
                    $("#listCounterparty").append("<p class='f_p-error'>No items found.</p>");
                    $("#compact-pagination").css('display', 'none');
                }
        });
    }
    else {
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Counterparty/RecentUsed?searchkeyword=' + encodeURIComponent($("#txtSearchBox").val()) + '&customquery=' + customQuery1 + customQuery2 + sortby,
            type: 'GET',
            dataType: 'json',
            'Content-Type': 'application/json',
            cache: false,
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'BusinessAreaLocation': localStorage.GlobalBusinessAreaLocation, 'RequiresScope': 'No' },
            success: function (data) {
                $("#compact-pagination").css('display', '');
                $('#listCounterparty').empty();
                GenerateTable(data);

            },
            error:
                function (data) {
                    $("#listCounterparty").empty();
                    $("#listCounterparty").append("<p class='f_p-error'>No items found.</p>");
                    $("#compact-pagination").css('display', 'none');
                }
        });
    }
}
function liRemove(obj) {
    if ($(obj.parentNode.parentNode.parentNode).attr('id') == 'liFiltersSearchText') {
        $(obj.parentNode.parentNode).empty();
        $('#txtSearchBox').val('');
    }
    else {
        var child = obj.parentNode;
        child = child.parentNode;
        var firstChild = child.textContent;

        var find = " ";
        var re = new RegExp(find, 'g');

        firstChild = firstChild.replace(re, '');

        $("#filterStatus option[value='" + firstChild + "']").prop("selected", false);
        $("#filterType option[value='" + firstChild + "']").prop("selected", false);

        child.parentNode.removeChild(child);
    }
    var hasItem1 = false;
    $('#liFiltersStatus span').each(function (i) {
        hasItem1 = true;
    });

    var hasItem2 = false;
    $('#liFiltersType span').each(function (i) {
        hasItem2 = true;
    });

    var hasItem3 = false;
    $('#liFiltersSearchText span').each(function (i) {
        hasItem3 = true;
    });

    applyFilter();

    if (!hasItem1 && !hasItem2 && !hasItem3) {
        $("#showAll").css('display', 'block');
        $("#showAll").css('display', 'inline');
        $("#showAll").text('');
        $("#showAll").text("Showing All Counterparties");
    }
}

var selectedSortOption = "";
function highlight(obj) {

    $('#tdSort a').each(function (i, item) {
        item.style.backgroundColor = "";
    });
    obj.style.backgroundColor = "#cccccc";
    selectedSortOption = obj.textContent;

}

function SearchCP() {
    var txtsearchboxvalue = $.trim($('#txtSearchBox').val());
    applyFilter();
}

$("#mainContent").click(function () {
    $("#idvSingleMultiple").hide();
});

//Get the counterparty fields and prepare the Form
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
                            var vControlsNo = "";
                            var isNo = false;
                            var vDate = "";
                            var vNumber = "";
                            var vEmail = "";
                            var vMultiDDL = "";
                            var vUser = "";
                            var vPhoneNumber = "";
                            var PhoneID = "";
                            var PhoneCountry = "";
                            //manoj
                            var vCurrency = "";
                            //manoj
                            //Added by Jay 23 Aug 2018
                            var vNumberD = "";
                            var vNumberP = "";
                            var vNumberPD = "";

                            //manoj
                            if (item.Required == "true") {
                                vControls += '<li class="removableCounterpartyField"><p><b>' + item.FieldDisplayName + '</b><small>*</small>';
                            } else {
                                vControls += '<li class="removableCounterpartyField"><p><b>' + item.FieldDisplayName + '</b>';
                            }
                            if (item.FieldHelp == "true") {
                                vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + (item.HelpText == "" ? item.FieldDisplayName : item.HelpText) + '"></span>'
                            }
                            vControls += '</p><div>';
                            if (item.FieldType == "Single Line Text") {
                                if (item.FieldName == "Country") {
                                    if (item.Required == "true") {
                                        vControls += "<select id=" + item.FieldName + "  name=" + item.FieldName + " title='" + item.FieldDisplayName + "'  class='validelement'>";

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
                                                vControls += '<option value="' + item + '">' + item + '</option>';
                                            });
                                        },
                                        error:
                                            function (data) {

                                            }
                                    });

                                    vControls += '</select>';
                                    vControls += '<label style="font-size:12px">' + item.Description + '</label>';
                                    //if (item.FieldHelp == "true") {
                                    //    vControls += '<span> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                                    //}
                                    vControls += '</div></li>';
                                } else {
                                    if (item.Required == "true") {
                                        vControls += "<input type='text' id=" + item.FieldName + " maxlength='100' name=" + item.FieldName + " class='validelement'>";
                                    } else {
                                        vControls += "<input type='text' id=" + item.FieldName + " maxlength='100' name=" + item.FieldName + ">";
                                    }
                                    vControls += '<label style="font-size:12px">' + item.Description + '</label>';
                                    //if (item.FieldHelp == "true") {
                                    //    vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                                    //}
                                    vControls += '</div></li>';
                                }
                            }
                            else if (item.FieldType == "Multi Line Text") {
                                if (item.Required == "true") {
                                    vControls += "<textarea name=" + item.FieldName + " id=" + item.FieldName + " title='" + item.FieldDisplayName + "' cols='25' rows='3' class=' validelement'></textarea>";
                                } else {
                                    vControls += "<textarea name=" + item.FieldName + " id=" + item.FieldName + " title='" + item.FieldDisplayName + "' cols='25' rows='3'></textarea>";
                                }
                                vControls += '<label style="font-size:12px">' + item.Description + '</label>';
                                //if (item.FieldHelp == "true") {
                                //    vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                                //}
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
                                vControls += '<label  style="font-size:12px">' + item.Description + '</label>';
                                vControls += '<br/>' + '<a href="javascript:void(0)" class="linkText" title="' + item.FieldDisplayName + '" onclick="navigateurl(\'CP' + item.FieldName + '\')"> Navigate</a>';
                                vControls += '</div></li>';
                                //for Hyperlink
                                //manoj
                            }
                            else if (item.FieldType == "Date") {


                                if (item.Required == "true") {
                                    vControls += "<input type='text' id=" + item.FieldName + " title='" + item.FieldDisplayName + "'  class='validelement validdate fielddatecontrol " + item.FieldName + "'/>";
                                } else {
                                    vControls += "<input type='text' id=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validdate fielddatecontrol " + item.FieldName + "'/>";
                                }

                                //if (item.FieldHelp == "true") {
                                //    vControls += '<span> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                                //}
                                vControls += '<br/>' + '<label style="font-size:12px">' + item.Description + '</label>';
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
                                vControls += '<label style="font-size:12px">' + item.Description + '</label>';
                                //if (item.FieldHelp == "true") {
                                //    vControls += '<span> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                                //}
                                vControls += '</div></li>';
                            } else if (item.FieldType == "Lookup") {
                                if (item.FieldName == "RelatedCounterparties") {

                                    if (item.Required == "true") {
                                        vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validelement' readonly='readonly' type='text' />";
                                    } else {
                                        vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' readonly='readonly' type='text' />";
                                    }
                                    vControls += '<label style="font-size:12px">' + item.Description + '</label>';
                                    //if (item.FieldHelp == "true") {
                                    //    vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                                    //}
                                    vControls += "<br/>" + "<a href='javascript:void(0)' class='linkText' id='" + item.FieldDisplayName + "' title='" + item.FieldName + "' onclick='ViewCounterpartyRelated(this)'> Browse</a>";
                                    vControls += '</div></li>';
                                    //manoj
                                    GetRelatedCounterpartiesPopup();
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
                                                $("#" + item.FieldName).append("<option value='" + itemname + "'>" + itemname + "</option>")
                                            }
                                        }
                                    });
                                    vControls += '</select>';
                                    vControls += '<label style="font-size:12px">' + item.Description + '</label>';
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
                                vControls += '<label style="font-size:12px">' + item.Description + '</label>';
                                //if (item.FieldHelp == "true") {
                                //    vControls += '<span> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                                //}
                                vControls += '</div></li>';
                                vMultiDDL = item.FieldName;
                            }
                            else if (item.FieldType == "Number") {
                                if (item.Required == "true") {
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validelement form_input' />";
                                } else {
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form_input' />";
                                }

                                //if (item.FieldHelp == "true") {
                                //    vControls += '<span > <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                                //}
                                vControls += '<label style="font-size:12px">' + item.Description + '</label>';
                                vControls += '</div></li>';
                                vNumber = item.FieldName;
                            }
                            else if (item.FieldType == "Number-D") {
                                if (item.Required == "true") {
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validelement form_input' />";
                                } else {
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "'class='form_input' />";
                                }

                                vControls += '<label style="font-size:12px">' + item.Description + '</label>';
                                vControls += '</div>';
                                vNumberD = item.FieldName;
                            }
                                // Percent
                            else if (item.FieldType == "Number-P") {
                                if (item.Required == "true") {
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validelement form_input' />";
                                } else {
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form_input' />";
                                }
                                vControls += '<label class="margin-top-8 p-text" style="float: right;position: absolute;">' + '%' + '</label>';
                                vControls += '<label style="float: left;font-size:12px;">' + item.Description + '</label>';

                                vControls += '</div>';
                                vNumberP = item.FieldName;
                            }
                                // Percent Decimal
                            else if (item.FieldType == "Number-PD") {
                                if (item.Required == "true") {
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validelement form_input' />";
                                } else {
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form_input' />";
                                }
                                vControls += '<label class="margin-top-8 p-text" style="float: right;position: absolute;">' + '%' + '</label>';
                                vControls += '<label style="float: left;font-size:12px;">' + item.Description + '</label>';

                                vControls += '</div>';
                                vNumberPD = item.FieldName;
                            }
                            else if (item.FieldType == "Yes/No") {

                                vControls += "	<div style='width: auto; margin-right: 15px;'><input style='float: left; width: auto;' type='radio' id='Yes" + item.FieldName + "' name=" + item.FieldName + " value='Yes' onchange='changeYesNoField(this);'><span style='float: left; margin: 7px 0px 0px 5px;'>Yes </span></div>";
                                vControls += "	<div style='width: auto; margin-right: 15px;'><input style='float: left; width: auto;' type='radio' id='No" + item.FieldName + "' name=" + item.FieldName + " checked value='No' onchange='changeYesNoField(this);'><span style='float: left; margin: 7px 0px 0px 5px;'>No </span></div>";
                                vControls += "	<input type='hidden' id='hdnYes" + item.FieldName + "' value=" + item.CommentYes + " />";
                                vControls += "	<input type='hidden' id='hdnNo" + item.FieldName + "' value=" + item.CommentNo + " />";
                                vControls += "	<input type='hidden' id='hdnRequired" + item.FieldName + "' value=" + item.CommentRequired + " />";
                                vControls += '<label style="float: left;margin: 7px 0px 0px 5px;font-size:12px;" class="col12  text-left help">' + item.Description + '</label>';
                                vControls += '</div></li>';
                                if (item.CommentNo == "true") {
                                    isNo = true;
                                }

                            } else if (item.FieldType == "Email") {
                                if (item.Required == "true") {
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validemail validelement' />";
                                } else {
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validemail' />";
                                }
                                vControls += '<label style="font-size:12px">' + item.Description + '</label>';
                                vControls += '</div></li>';
                            } else if (item.FieldType.indexOf("Browse") > -1) {
                                if (item.Required == "true") {
                                    vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validelement' readonly='readonly' type='text' />";
                                } else {
                                    vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' readonly='readonly' type='text' />";
                                }
                                vControls += '<label style="font-size:12px">' + item.Description + '</label>';
                                vControls += "<br/>" + "<a href='javascript:void(0)' class='linkText' id='" + item.FieldDisplayName + "' title='" + item.FieldName + "' onclick='ViewGenericCounterparty(this)'> Browse</a>";
                                vControls += '</div></li>';
                            } else if (item.FieldType == "File Upload") {
                                if (item.Required == "true") {
                                    vControls += "<input type='file' id=" + item.FieldName + " name='docAttachment' title='" + item.FieldDisplayName + "' class='form-contro validelement' />";
                                } else {
                                    vControls += "<input type='file' id=" + item.FieldName + " name='docAttachment' title='" + item.FieldDisplayName + "' class='form-contro' />";
                                }
                                vControls += '<label style="font-size:12px">' + item.Description + '</label>';
                                vControls += '</div></li>';
                            } else if (item.FieldType == "Currency" || item.FieldType == "Value / Financials") {
                                if (item.Required == "true") {
                                    //vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validelement' />";
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validelement validcontractvalue' />";
                                } else {
                                    //vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' />";
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validcontractvalue' />";
                                }
                                vControls += '<label style="font-size:12px">' + item.Description + '</label>';
                                vControls += '</div></li>';
                                vCurrency = item.FieldName;
                            } else if (item.FieldType == "User") {
                                if (item.Required == "true") {
                                    vControls += "<select id=" + item.FieldName + " multiple='multiple' class='form-contro f_inpt width90 chosenmulti validuser' name=" + item.FieldName + " title='" + item.FieldDisplayName + "' data-placeholder='--Select--'>"
                                } else {
                                    vControls += "<select id=" + item.FieldName + " multiple='multiple' class='form-contro f_inpt width90 chosenmulti' name=" + item.FieldName + " title='" + item.FieldDisplayName + "' data-placeholder='--Select--'>"
                                }

                                if (vUserList == "")
                                { vUserList = GetUserList(); }
                                vControls += vUserList;
                                vControls += '</select>';
                                vControls += '<label style="font-size:12px">' + item.Description + '</label>';
                                vUser = item.FieldName;
                                vControls += '</div></li>';
                            }
                            else if (item.FieldType == "Phone Number") {
                                //Vinod
                                if (item.Required == "true") {
                                    vControls += "<input type='text' id=" + item.FieldName + " maxlength='100'  class='validelement validPhone fieldphonecontrol'>";
                                } else {
                                    vControls += "<input type='text' id=" + item.FieldName + " maxlength='100'  class='validPhone fieldphonecontrol'>";
                                }

                                vControls += '<input type="hidden" id="Hdn' + item.FieldName + '" name="country" value="' + item.Country + '">';
                                //if (item.FieldHelp == "true") {
                                //    vControls += '<span> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                                //}
                                vControls += '<label style="font-size:12px">' + item.Description + '</label>';
                                vControls += '</div></li>';
                                vPhoneNumber = vControls;
                                PhoneID = item.FieldName;
                                PhoneCountry = item.Country;
                            }

                            $("#counterpartyItems").append(vControls);
                            if (isNo) {
                                vControlsNo += "<li class='removableCounterpartyField'>";
                                if (item.CommentRequired == "true") {
                                    vControlsNo += '<p><b>Add a Comment</b><small>*</small></p>';
                                } else {
                                    vControlsNo += '<p><b>Add a Comment</b></p>';
                                }
                                vControlsNo += '<div>';
                                if (item.CommentRequired == "true") {
                                    vControlsNo += '<textarea name="CustomCMD' + item.FieldName + '" id="CustomCMD' + item.FieldName + '" maxlength="500" title="' + item.FieldName + '" cols="25" rows="3" class="form-contro validelement" ></textarea>';
                                } else {
                                    vControlsNo += '<textarea name="CustomCMD' + item.FieldName + '" id="CustomCMD' + item.FieldName + '" maxlength="500" title="' + item.FieldName + '" cols="25" rows="3" class="form-contro"></textarea>';
                                }
                                vControlsNo += "</div></li>";
                                $("#counterpartyItems").append(vControlsNo);
                            }
                            isNo = false;
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

                            if (vPhoneNumber != "") {
                                bindPhoneNumber(PhoneID, PhoneCountry);
                                vPhoneNumber = "";
                            }
                            //manoj
                        }
                    }
                }
            });
            $("#loadingPage").fadeOut();
        }, error: function (data) {
            $("#loadingPage").fadeOut();
        }
    });
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
                        BAOwnersselecteditems = [];
                        $(EachBusinessAreaPath).each(function () {
                            var path = this.toString().trim();
                            var rowK = jQuery.grep(BusinessAreaPathRowKey, function (a) {
                                return a[0] === path;
                            });
                            if (rowK != null && typeof (rowK) != "undefined" && rowK.length != 0) {
                                selectedBusinessAreaID11 = $.grep(selectedBusinessAreaID11, function (value) {
                                    return value[1] != rowK[0][1];
                                });
                                selectedBusinessAreaID11.push([rowK[0][0], rowK[0][1]])
                                selectedBusinessAreaID11Temp.push([rowK[0][0], rowK[0][1]])
                                BAOwnersselecteditems.push(rowK[0][0]);
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
                            var isYesOrNo = false;
                            var vControlsYesNo = "";
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
                                if ($(vMetadata).find(item.FieldName).text() == "") {
                                    if (item.Required == "true") {
                                        vControls += "<input type='text' id=CP" + item.FieldName + " maxlength='2083' name=" + item.FieldName + " placeholder='http://www.' class='validelement validwebsite'>";
                                    } else {
                                        vControls += "<input type='text' id=CP" + item.FieldName + " maxlength='2083' name=" + item.FieldName + " placeholder='http://www.' class='validwebsite'>";
                                    }
                                } else {
                                    if (item.Required == "true") {
                                        vControls += "<input type='text' id=CP" + item.FieldName + " maxlength='2083' name=" + item.FieldName + " placeholder='http://www.' value = '" + $(vMetadata).find(item.FieldName).text() + "' class='validelement validwebsite'>";
                                    } else {
                                        vControls += "<input type='text' id=CP" + item.FieldName + " maxlength='2083' name=" + item.FieldName + " placeholder='http://www.' value = '" + $(vMetadata).find(item.FieldName).text() + "' class='validwebsite'>";
                                    }
                                }
                                vControls += '<a href="javascript:void(0)" class="linkText" title="' + item.FieldDisplayName + '" onclick="navigateurl(\'CP' + item.FieldName + '\')"> Navigate</a>';
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
                                    vControls += '<label>' + item.Description + '</label>';
                                    //if (item.FieldHelp == "true") {
                                    //    vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                                    //}
                                    vControls += "<br/>" + "<a href='javascript:void(0)' class='linkText' id='" + item.FieldDisplayName + "' title='" + item.FieldName + "' onclick='ViewCounterpartyRelated(this)'> Browse</a>";
                                    vControls += '</div></li>';
                                    //manoj
                                    GetRelatedCounterpartiesPopup(CounterpartyID);
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
                                        vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validelement form_input width90' style='margin-right:5px;' />";
                                    } else {
                                        vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form_input width90' style='margin-right:5px;'  />";
                                    }
                                } else {
                                    if (item.Required == "true") {
                                        vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text() + "' class='validelement form_input width90' style='margin-right:5px;' />";
                                    } else {
                                        vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text() + "' class='form_input width90' style='margin-right:5px;'  />";
                                    }
                                }
                                vControls += '<label class="margin-top-8 p-text" style="float: right;">' + '%' + '</label>';
                                vControls += '<label style="font-size:12px;" class="col12 p-text text-left help">' + item.Description + '</label>';
                                vControls += '</div></li>';
                                vNumberP = item.FieldName;
                            }
                                //Percent Decimal
                            else if (item.FieldType == "Number-PD") {

                                if ($(vMetadata).find(item.FieldName).text() == "") {
                                    if (item.Required == "true") {
                                        vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validelement form_input width90' style='margin-right:5px;' />";
                                    } else {
                                        vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "'  class='form_input width90' style='margin-right:5px;' />";
                                    }
                                } else {
                                    if (item.Required == "true") {
                                        vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text() + "' class='validelement form_input width90' style='margin-right:5px;' />";
                                    } else {
                                        vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text() + "'  class='form_input width90' style='margin-right:5px;' />";
                                    }
                                }
                                vControls += '<label class="margin-top-8 p-text" style="float: right;">' + '%' + '</label>';
                                vControls += '<label style="font-size:12px;" class="col12 p-text text-left help">' + item.Description + '</label>';
                                vControls += '</div></li>';
                                vNumberPD = item.FieldName;
                            }
                            else if (item.FieldType == "Phone Number") {
                                if ($(vMetadata).find(item.FieldName).text() != "") {
                                    if (item.Required == "true") {
                                        vControls += "<input type='text' id=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text().split(',')[2] + "' class='validelement validPhone fieldphonecontrol' />";
                                    } else {
                                        vControls += "<input type='text' id=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text().split(',')[2] + "' class='validPhone fieldphonecontrol' />";
                                    }
                                    PhoneCountry = $(vMetadata).find(item.FieldName).text().split(',')[0];
                                } else {
                                    if (item.Required == "true") {
                                        vControls += "<input type='text' id=" + item.FieldName + "  title='" + item.FieldDisplayName + "'  class='validelement validPhone fieldphonecontrol' />";
                                    } else {
                                        vControls += "<input type='text' id=" + item.FieldName + "  title='" + item.FieldDisplayName + "' class='validPhone fieldphonecontrol' />";
                                    }
                                }
                                vControls += '<label style="font-size:12px;">' + item.Description + '</label>';
                                vControls += '</div></li>';
                                vPhoneNumber = vControls;
                                PhoneID = item.FieldName;
                            }
                            else if (item.FieldType == "Yes/No") {
                                if ($(vMetadata).find(item.FieldName).text() == "") {
                                    vControls += "	<div style='width: auto; margin-right: 15px;'><input style='float: left; width: auto;' type='radio' id='Yes" + item.FieldName + "' name=" + item.FieldName + " value='Yes' onchange='changeYesNoField(this);'><span style='float: left; margin: 7px 0px 0px 5px;'>Yes </span></div>";
                                    vControls += "	<div style='width: auto;'><input style='float: left; width: auto;' type='radio' id='No" + item.FieldName + "' name=" + item.FieldName + " checked value='No' onchange='changeYesNoField(this);'><span style='float: left; margin: 7px 0px 0px 5px;'>No </span></div>";
                                    //vControls += "	<input type='radio' name=" + item.FieldName + " value='Yes'>Yes ";
                                    //vControls += "	<input type='radio' name=" + item.FieldName + " checked value='No'>No";
                                    if (item.CommentNo == "true") {
                                        isYesOrNo = true;
                                    }
                                } else {
                                    if ($(vMetadata).find(item.FieldName).text() == "Yes") {
                                        vControls += "	<div style='width: auto; margin-right: 15px;'><input style='float: left; width: auto;' type='radio' id='Yes" + item.FieldName + "' name=" + item.FieldName + " checked value='Yes' onchange='changeYesNoField(this);'><span style='float: left; margin: 7px 0px 0px 5px;'>Yes </span></div>";
                                        vControls += "	<div style='width: auto;'><input style='float: left; width: auto;' type='radio' id='No" + item.FieldName + "' name=" + item.FieldName + " value='No' onchange='changeYesNoField(this);'><span style='float: left; margin: 7px 0px 0px 5px;'>No </span></div>";
                                        if (item.CommentYes == "true") {
                                            isYesOrNo = true;
                                        }
                                    } else {
                                        //vControls += "	<input type='radio' name=" + item.FieldName + " value='Yes'>Yes ";
                                        //vControls += "	<input type='radio' name=" + item.FieldName + " checked value='No'>No";
                                        vControls += "	<div style='width: auto; margin-right: 15px;'><input style='float: left; width: auto;' type='radio' id='Yes" + item.FieldName + "' name=" + item.FieldName + " value='Yes' onchange='changeYesNoField(this);'><span style='float: left; margin: 7px 0px 0px 5px;'>Yes </span></div>";
                                        vControls += "	<div style='width: auto;'><input style='float: left; width: auto;' type='radio' id='No" + item.FieldName + "' name=" + item.FieldName + " checked value='No' onchange='changeYesNoField(this);'><span style='float: left; margin: 7px 0px 0px 5px;'>No </span></div>";

                                        if (item.CommentNo == "true") {
                                            isYesOrNo = true;
                                        }
                                    }
                                }

                                vControls += "	<input type='hidden' id='hdnYes" + item.FieldName + "' value=" + item.CommentYes + " />";
                                vControls += "	<input type='hidden' id='hdnNo" + item.FieldName + "' value=" + item.CommentNo + " />";
                                vControls += "	<input type='hidden' id='hdnRequired" + item.FieldName + "' value=" + item.CommentRequired + " />";
                                vControls += '<div style="width: 100%"><label style="width:auto;font-size:12px;" class="col12 p-text text-left help">' + item.Description + '</label></div>';
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
                                vControls += "<br/>" + "<a href='javascript:void(0)' class='linkText' id='" + item.FieldDisplayName + "' title='" + item.FieldName + "' onclick='ViewGenericCounterparty(this)'> Browse</a>";
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
                                if ($(vMetadata).find(item.FieldName).text() == "" || $(vMetadata).find(item.FieldName).text() == ".") {
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
                                PhoneID = "";
                                PhoneCountry = "";
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




function getCounterpartyData(CounterpartyID) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/icounterpartydetails?counterpartyid=' + CounterpartyID,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (mainmetadataFields) {
            var vMetadata = $(mainmetadataFields).find('Metadata');

            $("#txtCounterpartyName").val($(vMetadata).find('CounterpartyName').text());
            $("#ddlCounterpartyType option").filter(function (index) { return $(this).text() === $(vMetadata).find('CounterpartyType').text(); }).prop('selected', true);
            $("#ddlStatus option").filter(function (index) { return $(this).text() === $(vMetadata).find('ddlStatus').text(); }).prop('selected', true);


            for (var j = 0; j < $(vMetadata)[0].childElementCount; j++) {
                var item = $(vMetadata)[0].children[j];
                if (item.ShowInCreateForm == "true") {
                    var vControls = "";
                    var vDate = "";
                    var vNumber = "";
                    var vPhoneNumber = "";
                    var PhoneID = "";
                    var PhoneCountry = "";
                    var vEmail = "";
                    var vMultiDDL = "";
                    var vNumberD = "";
                    var vNumberP = "";
                    var vNumberPD = "";
                    if (item.Required == "true") {
                        vControls += '<li><p><b>' + item.FieldDisplayName + '</b><small>*</small>';
                    } else {
                        vControls += '<li><p><b>' + item.FieldDisplayName + '</b>';
                    }
                    if (item.FieldHelp == "true") {
                        vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + (item.HelpText == "" ? item.FieldDisplayName : item.HelpText) + '"></span>'
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
                            vControls += '<label>' + item.Description + '</label>';
                        } else {
                            if (item.Required == "true") {
                                vControls += "<input type='text' id=" + item.FieldName + " maxlength='100' name=" + item.FieldName + " class='validelement'>";
                            } else {
                                vControls += "<input type='text' id=" + item.FieldName + " maxlength='100' name=" + item.FieldName + ">";
                            }
                            vControls += '<label style="font-size:12px;">' + item.Description + '</label>';
                        }
                        vControls += '</div></li>';
                    }
                    else if (item.FieldType == "Multi Line Text") {
                        if (item.Required == "true") {
                            vControls += "<textarea name=" + item.FieldName + " id=" + item.FieldName + " title='" + item.FieldDisplayName + "' cols='25' rows='3' class=' validelement'></textarea>";
                        } else {
                            vControls += "<textarea name=" + item.FieldName + " id=" + item.FieldName + " title='" + item.FieldDisplayName + "' cols='25' rows='3'></textarea>";
                        }
                        vControls += '<label style="font-size:12px;">' + item.Description + '</label>';
                        vControls += '</div></li>';
                    }
                    else if (item.FieldType == "Date") {


                        if (item.Required == "true") {
                            vControls += "<input type='text' id=" + item.FieldName + " title='" + item.FieldDisplayName + "'  class='validelement validdate fielddatecontrol " + item.FieldName + "'/>";
                        } else {
                            vControls += "<input type='text' id=" + item.FieldName + "  title='" + item.FieldDisplayName + "' class='validdate fielddatecontrol " + item.FieldName + "'/>";
                        }
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
                        for (var i = 0; i < myArraylength; i = i + 1) {
                            do {
                                myArray[i] = myArray[i].replace("&amp;", "&");
                            } while (myArray[i].indexOf("&amp;") > -1)
                            vControls += "<option value='" + myArray[i] + "'>" + myArray[i] + "</option>";
                        }

                        vControls += '</select>';
                        vControls += '<label style="font-size:12px;">' + item.Description + '</label>';
                        vControls += '</div></li>';
                    } else if (item.FieldType == "Lookup") {
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
                        vControls += '<label style="font-size:12px;">' + item.Description + '</label>';
                        vControls += '</div></li>';
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
                        vControls += '<label style="font-size:12px;">' + item.Description + '</label>';
                        vControls += '</div></li>';
                        vMultiDDL = item.FieldName;
                    }
                    else if (item.FieldType == "Number") {
                        if (item.Required == "true") {
                            vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validelement width40 form_input' />";
                        } else {
                            vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='width40 form_input' />";
                        }
                        vControls += '<label style="font-size:12px;">' + item.Description + '</label>';
                        vControls += '</div></li>';
                        vNumber = item.FieldName;
                    }
                    else if (item.FieldType == "Number-D") {
                        vControls += '<div class="col6 m12">';
                        if (item.Required == "true") {
                            vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro validelement width40 form_input' />";
                        } else {
                            vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form-contro width40 form_input' />";
                        }

                        vControls += '<label style="font-size:12px;" class="col12 p-text text-left help">' + item.Description + '</label>';
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
                        vControls += '<label class="margin-top-8 p-text" style="float: right;position: absolute;">' + '%' + '</label>';
                        vControls += '<label style="font-size:12px;" class="col12 p-text text-left help">'  + item.Description + '</label>';

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
                        vControls += '<label class="margin-top-8 p-text" style="float: right;position: absolute;">' + '%' + '</label>';
                        vControls += '<label style="font-size:12px;" class="col12 p-text text-left help">'  + item.Description + '</label>';

                        vControls += '</div>';
                        vNumberPD = item.FieldName;
                    }
                    else if (item.FieldType == "Phone Number") {
                        if (item.Required == "true") {
                            vControls += "<input type='text' id=" + item.FieldName + "  title='" + item.FieldDisplayName + "'  class='validelement validPhone fieldphonecontrol' />";
                        } else {
                            vControls += "<input type='text' id=" + item.FieldName + "  title='" + item.FieldDisplayName + "' class='validPhone fieldphonecontrol' />";
                        }
                        vControls += '<label style="font-size:12px;">' + item.Description + '</label>';
                        vControls += '</div></li>';
                        vPhoneNumber = vControls;
                        PhoneID = item.FieldName;
                        PhoneCountry = item.Country;
                    }
                    else if (item.FieldType == "Yes/No") {
                        vControls += "	<div style='width: auto; margin-right: 15px;'><input style='float: left; width: auto;' type='radio' name=" + item.FieldName + " value='Yes'><span style='float: left; margin: 7px 0px 0px 5px;'>Yes </span></div>";
                        vControls += "	<div style='width: auto; margin-right: 15px;'><input style='float: left; width: auto;' type='radio' name=" + item.FieldName + " checked value='No'><span style='float: left; margin: 7px 0px 0px 5px;'>No </span></div>";

                        vControls += '<label  style="float: left;margin: 7px 0px 0px 5px;font-size:12px;"  class="col12 p-text text-left help">' + item.Description + '</label>';
                        vControls += '</div></li>';
                    } else if (item.FieldType == "Email") {
                        if (item.Required == "true") {
                            vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validemail validelement' />";
                        } else {
                            vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validemail' />";
                        }
                        vControls += '<label style="font-size:12px;">' + item.Description + '</label>';
                        vControls += '</div></li>';
                    } else if (item.FieldType.indexOf("Browse") > -1) {
                        if (item.Required == "true") {
                            vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validelement' readonly='readonly' type='text' />";
                        } else {
                            vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' readonly='readonly' type='text' />";
                        }
                        vControls += '<label style="font-size:12px;">' + item.Description + '</label>';
                        vControls += "<br/>" + "<a href='javascript:void(0)' class='linkText' id='" + item.FieldDisplayName + "' title='" + item.FieldName + "' onclick='ViewGenericCounterparty(this)'> Browse</a>";
                        vControls += '</div></li>';
                    }

                    $("#counterpartyItems").append(vControls);
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
                }
            }
        }
    });
}

//function ViewGeneric(obj) {
//    vGlobalObjForGeneric = obj;
//    $("#loadingPage").fadeIn();
//    $("#tblGeneric").empty();
//    $("#liSelectedRU").empty();
//    var art = '<tr><td><article style="width:100%; text-align:center;">';
//    art += '<input id="txtSearchBoxGeneric" class="f_inpt cl width80" type="text" style="text-wrap:none" placeholder="Type to Search" />';
//    art += '<img title="Search" style="cursor: pointer; position: relative; left: -40px; top:-2px;" onclick="javascript: SearchGeneric();" src="../Content/Images/search_over.png" />';
//    art += "<a href='javascript:void(0)' class='linkPickerClear' onclick='ClearGeneric();'>Clear</a>";
//    art += '</article></td></tr>';
//    $("#tblGenericheader").html(art);

//    $.ajax({
//        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterpartyfieldbydisplayname?fielddisplayname=' + obj.id,
//        type: 'GET',
//        dataType: 'json',
//        'Content-Type': 'application/json',
//        cache: false,
//        headers: { 'eContracts-ApiKey': localStorage.APIKey },
//        success: function (data) {
//            var prevSelected = $("#" + obj.title).val();
//            //var arrprev = [];
//            arrprevRU = [];
//            $.each(prevSelected.split(";"), function () {
//                arrprevRU.push($.trim(this));
//            });

//            var myArray = [];
//            myArray = data[0].ChoiceValues.split("\n")
//            var myArraylength = myArray.length;
//            var genItems = [];
//            var article = "";
//            for (var i = 0; i < myArraylength; i = i + 1) {
//                if (i == 0) {
//                    article += '<tr><th><input id="selectall" onclick="funselectall(this);" type="checkbox"/> Select/Deselect All</th></tr>';
//                }
//                article += '<tr><td>';
//                if (arrprev.indexOf(myArray[i]) > -1) {
//                    article += '<input id="' + myArray[i] + '" type="checkbox" name="Generic" checked class="css1-checkbox" value="' + myArray[i] + '" />';
//                } else {
//                    article += '<input id="' + myArray[i] + '" type="checkbox" name="Generic" class="css1-checkbox" value="' + myArray[i] + '" />';
//                }
//                article += '<label for="' + myArray[i] + '" class="css1-label">' + myArray[i] + '</label>';
//                article += '</td></tr>';
//                genItems.push(myArray[i]);
//            }
//            $("#tblGeneric").html(article);
//            article = '';

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
//                    SearchGeneric();
//                }
//            });

//            $("#browseGeneric").data('param_1', obj.title).dialog("option", "title", obj.id + " Picker");
//            $("#browseGeneric").dialog("open");
//            $("#loadingPage").fadeOut();
//        },
//        error:
//            function (data) {
//                $("#tblGeneric").html('No item found')
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
//            article = '';

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
            for (var i = 0; i < datalength; i = i + 1) {
                var item = data[i];
                if (item.CounterpartyName.indexOf(searchKeyword) > -1 || searchKeyword == "") {
                    var article = "";
                    if (i == 0) {
                        article += '<tr><th><input id="selectall" onclick="funselectall(this);" type="checkbox"/> Select/Deselect All</th></tr>';
                    }
                    article += '<tr><td>';
                    if (arrprev.indexOf(item.CounterpartyName) >= 0) {
                        article += '<input id="' + item.CounterpartyName + '" type="checkbox" name="Generic" checked class="css1-checkbox" value="' + item.CounterpartyName + '" />';
                    } else {
                        article += '<input id="' + item.CounterpartyName + '" type="checkbox" name="Generic" class="css1-checkbox" value="' + item.CounterpartyName + '" />';
                    }
                    article += '<label for="' + item.CounterpartyName + '" class="css1-label">' + item.CounterpartyName + '</label>';
                    article += '</td></tr>';
                    $("#tblGeneric").append(article);
                    genItems.push(item.CounterpartyName);
                }
            }

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

function CheckGlobalSettingsForNewCP() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/GlobalSettings',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            localStorage.setItem("RestrictHighSecurityTagging", data.RestrictHighSecurityTagging);
            var vAccFeat = [];
            $("#dvAddCounterparty").css("display", "none");
            var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
            if (veContractFeatures != null) {
                vAccFeat = $.grep(veContractFeatures, function (n, i) {
                    return (n.RowKey == "6" && n.Status == "ON");
                });
            }
            if (vAccFeat != null && vAccFeat.length > 0) {
                if (data == null) {
                    $("#dvAddCounterparty").css("display", "none");
                    $('.newcontact').css("display", "none");
                } else {
                    if (localStorage.UserType.indexOf("Global Contract Owner") >= 0) {
                        //  if ($("#qvAll").hasClass("active_quick_view"))
                        $("#dvAddCounterparty").css("display", "");
                        $('.newcontact').css("display","");
                        ShowCreateButton = true;
                    }
                    else if (data.CreateCounterpartyCA == "Yes" && localStorage.UserType.indexOf("Contract Area Administrator") >= 0) {
                        //  if ($("#qvAll").hasClass("active_quick_view"))
                        $("#dvAddCounterparty").css("display", "");
                        $('.newcontact').css("display", "");
                        ShowCreateButton = true;
                    }
                    else if (data.CreateCounterpartyBA == "Yes" && localStorage.UserType.indexOf("Business Area Owner") >= 0) {
                        // if ($("#qvAll").hasClass("active_quick_view"))
                        $("#dvAddCounterparty").css("display", "");
                        $('.newcontact').css("display", "");
                        ShowCreateButton = true;
                    }
                    else {
                        $("#dvAddCounterparty").css("display", "none");
                        $('.newcontact').css("display", "none");
                        ShowCreateButton = false;
                    }
                }
            }
        }
    });
}

function ViewCounterpartyRelated(obj) {

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
    $("#txtSearchBoxCounterparties").val("");
    if ($('#tblPopupCounterparties tr').length <= 0) {
        var relatedCounterpartiesTag = [];
        $("#txtSearchBoxCounterparties").val("");
        //var arrcounterpartyIDarry = [];
        //var arrcounterpartyNamearry = [];
        //var arrcounterpartyRelationshipTypearr = [];
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
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/relatedcounterpartypicker',
            type: 'GET',
            dataType: 'json',
            "Content-Type": "application/json",
            headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, 'BusinessAreaLocation': strBusinessAreaOwnerof },
            cache: false,
            success: function (data) {
                $('#loadCounterparties').empty();
                $("#hdnRelatedCounterparties").append(getParameterByName("ContractID"))
                //manoj
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
                //manoj
                var arr = [];
                var counterpartyTags = [];
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
                                //$.each(arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RelatedCounterpartyID.split(";"), function () {
                                //    arrcounterpartyIDarry.push($.trim(this));
                                //});
                                //$.each(arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RelatedCounterpartyTitle.split(";"), function () {
                                //    arrcounterpartyNamearry.push($.trim(this));
                                //});
                                //$.each(arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RelatedRelationshipType.split(";"), function () {
                                //    arrcounterpartyRelationshipTypearr.push($.trim(this));
                                //});
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
                            article += '<input id="' + item.RowKey + '" type="checkbox" name="RelatedCounterparty" checked class="css1-checkbox" value="' + item.CounterpartyName + '" onchange="javascript:currentrelatedcounterparty(this);" />';
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
                            article += '<input id="' + item.RowKey + '" type="checkbox" name="RelatedCounterparty" class="css1-checkbox" value="' + item.CounterpartyName + '" onchange="javascript:currentrelatedcounterparty(this);" />';
                            article += '<label for="' + item.RowKey + '" class="css1-label"><a href="/Counterparty/CounterpartyDetail?CounterpartyID=' + item.RowKey + '" target="_blank">' + item.CounterpartyName + '</a></label>';   //ENH487 Customer inhanc
                            article += '</td>';
                            article += '<td class="ddl"><td></tr>'
                            //$("#tblPopupCounterparties").append(article);
                            vCounterpartyList += article;
                            relatedCounterpartiesTag.push(item.CounterpartyName);
                        }

                        //$("#" + item.RowKey).click(function () {
                        //$("input[id='" + item.RowKey + "'][name='RelatedCounterparty']:checkbox").click(function () {
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
                $("input[name='RelatedCounterparty']:checkbox").click(function () {
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
            error: function (xhr,error,status) {
                $('#loadMA').empty();
                addselectedcounterparties();
                $("#tblPopupCounterparties").html('');
                $('#loadCounterparties').html('<p style="margin-left: 20px;">No items found.</p>');
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

//function BindRelatedCounterpartiesPopup(counterpartyid) {
//    if (arrRelatedCounterparities.length > 0) {
//        $('#liSelectedCounterparties').empty();
//        var counterpartyarrid = arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RelatedCounterpartyID.split(";");
//        var counterpartyarrname = arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RelatedCounterpartyTitle.split(";");
//        for (var arrcount = 0; arrcount < counterpartyarrid.length; arrcount++) {
//            $('#liSelectedCounterparties').append('<span style="font-size:11px;" id=' + counterpartyarrid[arrcount] + '>' + counterpartyarrname[arrcount] + ' (' + arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RelationshipType + ') <img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveRelationshipcounterparty(this);" style="float:right" /></span>');
//        }
//    }
//}


function RelatedCounterpartiesPush() {
    if (requiredValidator('popupCounterparties', false)) {
        var vRelatedCounterpartyID = "";
        var vRelatedCounterpartyTitle = "";
        var vChildRelation = "";
        //manoj
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
        //manoj
        //$('input:checkbox[name="RelatedCounterparty"]:checked').each(function () {
        //    if (vRelatedCounterpartyID == "") {
        //        vRelatedCounterpartyID = this.id.replace("rel", "").trim();
        //        vRelatedCounterpartyTitle = this.value;
        //        vChildRelation = $(this).parent().parent().children(".ddl").find('option:selected').text();

        //    }
        //    else {
        //        vRelatedCounterpartyID += "; " + this.id.replace("rel", "").trim();
        //        vRelatedCounterpartyTitle += "; " + this.value;
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
            $('#RelatedCounterparties').val(resultvaluetobind.join(";"));
            $("#popupCounterparties").dialog("close");
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

function ViewCounterparties() {
    $("#tblPopupCounterparties").html('');
    if ($.trim($("#txtSearchBoxCounterparties").val()) != "") {
        $('#loadCounterparties').html('<img src="../Content/Images/icon/loading.gif"> Searching...');
    } else {
        $('#loadCounterparties').html('<img src="../Content/Images/icon/loading.gif">');
    }
    //var arrcounterpartyIDarry = [];
    //var arrcounterpartyNamearry = [];
    //var arrcounterpartyRelationshipTypearr = [];
    var relatedCounterpartiesTag = [];
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
            //var arr = [];
            //var counterpartyTags = [];
            //manoj
            var prevSelected = [];
            $.each(curRelatedCounterparities, function (ipvr, itempvr) {
                prevSelected.push($.trim(itempvr.CounterpartyName));
            });
            var arr = prevSelected;
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
                        article += '<input id="' + item.RowKey + '" type="checkbox" name="RelatedCounterparty" checked class="css1-checkbox" value="' + item.CounterpartyName + '" onchange="javascript:currentrelatedcounterparty(this);" />';
                        article += '<label for="' + item.RowKey + '" class="css1-label"><a href="/Counterparty/CounterpartyDetail?CounterpartyID=' + item.RowKey + '" target="_blank">' + item.CounterpartyName + '</a></label>';    //ENH487 Customer inhanc
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
                        article += '<label for="' + item.RowKey + '" class="css1-label"><a href="/Counterparty/CounterpartyDetail?CounterpartyID=' + item.RowKey + '" target="_blank">' + item.CounterpartyName + '</a></label>';    //ENH487 Customer inhanc
                        article += '</td>';
                        article += '<td class="ddl"><td></tr>'
                        $("#tblPopupCounterparties").append(article);
                    }

                    //$("#rel" + item.RowKey).click(function () {
                    $("input[id='" + item.RowKey + "'][name='RelatedCounterparty']:checkbox").click(function () {
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
            $('#loadCounterparties').html('<p style="margin-left: 20px;">No items found.</p>');
            $('#compact-paginationRelatedCounterparties').css('display', 'none');
        }
    });
}

function CreateRelatedCounterparies(conterpartyid, counterpartyname) {
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
        },
        error: function (request) {
            PrvRelatedCounterparities = [];
            arrRelatedCounterparities = [];
            curRelatedCounterparities = [];
            arrSavedCounterparties = [];
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
             // }
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

function quickViewDisplay(obj) {
    $("#conSortByOptions").val('Recently Updated')
    $("#conSortByOptions").prop('disabled', false).niceSelect('update');
    colorLink('qvThis', false);
    colorLink('qvRecent', false);
    colorLink('qvAll', false);
    colorLink('liSavedViews a', false);
    colorLink('liSavedViews span', false);
    $("#liFiltersforQuickViews").css("display", "");
    $("#liFiltersSearchText").empty();
    $("#liFiltersStatus").empty();
    $("#liFiltersType").empty();
    $("#txtSearchBox").val("");
    $("#filterStatus option:selected").prop('selected', false);
    $("#filterType option:selected").prop('selected', false);
    $("#txtSearchBox").attr("placeholder", "Search in '" + obj.innerText + "'");
    if (obj.id == "qvThis") {
        vView = "BussinessArea";
        colorLink('qvThis', true);
        //  $("#dvAddCounterparty").css("display", "none");
    } else if (obj.id == "qvRecent") {
        vView = "Recent";
        colorLink('qvRecent', true);
        //    $("#dvAddCounterparty").css("display", "none");
    } else if (obj.id == "qvAll") {
        vView = "All";
        colorLink('qvAll', true);
        //if (ShowCreateButton) {
        //    $("#dvAddCounterparty").css("display", "");
        //} else {
        //    $("#dvAddCounterparty").css("display", "none");
        //}
    }
    savedViewNameFromViewTable = "";
    applyFilter();
}

function colorLink(objId, tobecolored) {
    if (tobecolored) {
        $('#' + objId).addClass("active_quick_view");
    }
    else {
        $('#' + objId).removeClass("active_quick_view");
    }
}

var prev_val;
$('#ddlStatus').focus(function () {
    prev_val = $(this).val();
}).change(function (e) {
    if (IsContractExist == true) {
        swal({
            title: '',
            text: "Contracts exists with this counterparty,Do you want to proceed?",
            //"This Counterparty exists in another business area, Do you want to continue?",
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

//CounterParty Businessarea
var BAOwnersselecteditems = [];
function ViewOwnerofBusinessArea() {

    $('#txtBAOwnerofPath').val("");
    $('#txtBAOwnerof').val("");


    if ($("#txtOwnerofBusinessArea").val() != "") {
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
    if ($("#txtCounterpartyID").val() != "") {
        $("#RelatedCounterparties").val('');
        PrvRelatedCounterparities = [];
        arrRelatedCounterparities = [];
        curRelatedCounterparities = [];
        //manoj
        var SavedCounterparties = "";
        $(arrSavedCounterparties).each(function (isvcount, itemsvcount) {
            SavedCounterparties += ";" + itemsvcount.RelatedCounterpartyTitle;
        });
        $("#RelatedCounterparties").val((SavedCounterparties.charAt(0) === ';') ? SavedCounterparties.substr(1) : SavedCounterparties);
        //manoj
    } else {
        //manoj
        $("#RelatedCounterparties").val('');
        PrvRelatedCounterparities = [];
        arrRelatedCounterparities = [];
        curRelatedCounterparities = [];
        arrSavedCounterparties = [];
        //manoj
    }
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
    $("#txtOwnerofBusinessArea").val(thisBusinessAreaName);
}
var selectedBusinessAreaID11 = [];
var selectedBusinessAreaID11Temp = [];
var DeletedBusinessAreaID = [];
function treeviewclick11(obj) {

    var strBusinessAreaName = obj.textContent;
    var rowKey = obj.parentNode.parentNode.childNodes[2].textContent;
    var parentBusinessAreaID = obj.parentNode.parentNode.childNodes[1].textContent;
    var contractAreaName = obj.parentNode.parentNode.childNodes[2].textContent;
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

function CreateAdvanceView() {
    $("#btnAdvanceViewSaveAs").css("display", "none");
    $("#btnUpdateAdvanceView").css("display", "none");
    $("#addNewAdvanceView").dialog({ 'title': 'Create View' });
    $("#btnCreateAdvanceView").css("display", "");
    $("#addNewAdvanceView").dialog("open");
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
    //var i = BAOwnersselecteditems.indexOf(thisBusinessAreaName);
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
    var selecteditemslength = BAOwnersselecteditems.length;
    $('#lblBusinessAreaOwners').text('');
    if (selecteditemslength > 0) {
        for (var i = 0; i < selecteditemslength; i++) {
            if (i != selecteditemslength - 1) { $('#lblBusinessAreaOwners').append(BAOwnersselecteditems[i].trim().substring(BAOwnersselecteditems[i].trim().lastIndexOf(">") + 1, BAOwnersselecteditems[i].trim().length).trim() + ";"); }
            else { $('#lblBusinessAreaOwners').append(BAOwnersselecteditems[i].trim().substring(BAOwnersselecteditems[i].trim().lastIndexOf(">") + 1, BAOwnersselecteditems[i].trim().length).trim()); }
        }
        $('#txtOwnerofBusinessArea').val($('#lblBusinessAreaOwners').text());
    }
    else {
        $('#txtOwnerofBusinessArea').val("");
    }
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

$("#btnFilterA").on("click", function () {
    if ($(".nice-select").hasClass("open")) {
        $('.nice-select').removeClass('open');
    }
    $("#dvfilter").css('display', 'block');
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
        }
    });
}
//manoj
//Browse generic method(s) for Multi choice field(s) in counterparty
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
            //var resultfound = true;
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
    multipleChecksDocumentIDd = [];
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
            if (multipleChecksDocumentIDd.length > 0) {
                for (var spl = 0; spl < multipleChecksDocumentIDd.length; spl++) {
                    if (multipleChecksDocumentIDd[spl].trim() != "") {
                        $('#liSelectedRU').append('<span style="font-size:13px;">' + multipleChecksDocumentIDd[spl].trim() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveSelectedRU(this);" style="float:right" /></span>');
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
                                multipleChecksDocumentIDd.push(splitmulicheckforbind[spl].trim());
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
        //var spltarrprevRUstr = arrprevRU.toString();
        //if (spltarrprevRUstr.indexOf(";") > -1) {
        //    var spltarrprevRU = spltarrprevRUstr.split(';');
        //    arrprevRU = [];
        //    for (var arrli = 0; arrli < spltarrprevRU.length; arrli++) {
        //        if (spltarrprevRU[arrli].trim() != "") {
        //            arrprevRU.push(spltarrprevRU[arrli]);
        //        }
        //    }
        //}
        for (var i = startIndex; i < endIndex; i++) {
            var article = "";
            if (i == startIndex) {
                article += '<tr><th><input id="selectall" onclick="funselectall(this);" type="checkbox"/> Select/Deselect All</th></tr>';
            }

            article += '<tr><td>';
            if (arrprevRU != null && multipleChecksDocumentIDd.length > 0) {
                if (arrprevRU.indexOf(myArrayRU[i].trim()) >= 0 && multipleChecksDocumentIDd.indexOf(myArrayRU[i].trim()) > -1) {
                    article += '<input id="' + myArrayRU[i].trim() + '" type="checkbox" name="Generic"  onclick="checkMultipleDocuments(this);" checked class="css1-checkbox" value="' + myArrayRU[i].trim() + '" />';
                }
                else if (multipleChecksDocumentIDd.indexOf(myArrayRU[i].trim()) > -1) {
                    article += '<input id="' + myArrayRU[i].trim() + '" type="checkbox" name="Generic" onclick="checkMultipleDocuments(this);" checked class="css1-checkbox" value="' + myArrayRU[i].trim() + '" />';
                }
                else {
                    article += '<input id="' + myArrayRU[i].trim() + '" type="checkbox" name="Generic" onclick="checkMultipleDocuments(this);"  class="css1-checkbox" value="' + myArrayRU[i].trim() + '" />';
                    checkboxchecking = false;
                }
            }
            else if (arrprevRU.indexOf(myArrayRU[i].trim()) >= 0 && multipleChecksDocumentIDd.length == 0) {
                article += '<input id="' + myArrayRU[i].trim() + '" type="checkbox" name="Generic" onclick="checkMultipleDocuments(this);" checked class="css1-checkbox" value="' + myArrayRU[i].trim() + '" />';
            }
            else if (multipleChecksDocumentIDd.indexOf(myArrayRU[i].trim()) > -1) {
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
function liRemoveSelectedRU(obj) {
    var child = obj.parentNode;
    var child12 = child.firstChild.nodeValue;
    child12 = child12.trim();
    if (multipleChecksDocumentIDd.indexOf(child12) != -1) {
        var ind = multipleChecksDocumentIDd.indexOf(child12);
        multipleChecksDocumentIDd.splice(ind, 1);
    }
    var checkboxcheck = true;
    child.parentNode.removeChild(child);
    $('input[type=checkbox][name="Generic"]').each(function () {
        var DocumentID = this.value;
        var duplicatechecking = false;
        if (multipleChecksDocumentIDd.indexOf(DocumentID.trim()) > -1) {
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
            if ((multipleChecksDocumentIDd.indexOf(DocumentID.trim())) == -1) {
                multipleChecksDocumentIDd.push(DocumentID.trim());
            }
        }
        else {
            if (multipleChecksDocumentIDd.indexOf(DocumentID.trim()) != -1) {
                var ind = multipleChecksDocumentIDd.indexOf(DocumentID.trim());
                multipleChecksDocumentIDd.splice(ind, 1);
            }
            checkboxcheck = false;
        }
    });
    for (var spl = 0; spl < multipleChecksDocumentIDd.length; spl++) {
        if (multipleChecksDocumentIDd[spl].trim() != "") {
            $('#liSelectedRU').append('<span style="font-size:13px;">' + multipleChecksDocumentIDd[spl].trim() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveSelectedRU(this);" style="float:right" /></span>');
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
function funselectall(obj) {
    if (obj.checked) { // check select status       
        $('input:checkbox[name=Generic]').prop('checked', true);
        checkMultipleDocuments("");
    } else {
        $('input:checkbox[name=Generic]').prop('checked', false);
        checkMultipleDocuments("");
    }
}
//Browse generic method(s) for Multi choice field(s) in counterparty

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


//Sridhar
function SaveCounterpartyStatus() {
    var counterpartyid = $("#txtCounterpartyIDStatus").val();
    var status = $("#ddlCounterpartyStatus :selected").val();
    $("#loadingPage").fadeIn();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/counterpartystatus?counterpartyid=' + counterpartyid + '&status=' + status,
        type: 'PUT',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
        cache: false,
        success: function (person) {
            if ($("#sts" + counterpartyid).text() != $("#ddlCounterpartyStatus").find('option:selected').text()) {
                if ($("#sts" + counterpartyid).text() == "Active") {
                    $("#sts" + counterpartyid).removeClass('status_green');
                }
                else if ($("#sts" + counterpartyid).text() == "Inactive") {
                    $("#sts" + counterpartyid).removeClass('status_Gray');
                }
                else {
                    $("#sts" + counterpartyid).removeClass('status_yellow');
                }

                if ($("#ddlCounterpartyStatus").find('option:selected').text() == "Active") {
                    $("#sts" + counterpartyid).addClass('status_green');
                } else if ($("#ddlCounterpartyStatus").find('option:selected').text() == "Inactive") {
                    $("#sts" + counterpartyid).addClass('status_Gray');
                } else {
                    $("#sts" + counterpartyid).addClass('status_yellow');
                }
                $("#sts" + counterpartyid).text($("#ddlCounterpartyStatus").find('option:selected').text());
            }

            $("#addEditCounterpartyStatus").dialog("close");
            $("#loadingPage").fadeOut();
        },
        error: function (data) {
            $("#addEditCounterpartyStatus").dialog("close");
            $("#loadingPage").fadeOut();
        }
    });
}

//manoj
//For Related Counterparty
function GetRelatedCounterpartiesPopup(counterpartyid) {
    if (typeof counterpartyid != 'undefined' && counterpartyid != null && counterpartyid != "") {
        //if (counterpartyid == null || counterpartyid == "") { counterpartyid = vCounterpartyID; }
        $('#liRelatedCounterparties').empty();
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/relatedcounterparties?counterpartyid=' + counterpartyid,
            type: 'GET',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            cache: false,
            success: function (contactsJsonPayload) {
                //var bindHtml = "";
                //$(contactsJsonPayload).each(function (i, item) {
                //    bindHtml+='<span style="font-size:11px;" id=' + item.RowKey + '>' + item.RelatedCounterpartyTitle + ' (' + item.RelatedRelationshipType + ') <img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveRelationship(this);" style="float:right" /></span>';
                //});
                //$('#liRelatedCounterparties').html(bindHtml);
                arrSavedCounterparties = contactsJsonPayload.slice();
            },
            error: function (request) {
                arrSavedCounterparties = [];
                //$('#liRelatedCounterparties').html('');
            }
        });
    } else {
        arrSavedCounterparties = [];
    }
}

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
             if ($("#txtCounterpartyID").val() != "") {
                 $.ajax({
                     url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/' + $("#txtCounterpartyID").val().trim() + '/relatedcounterparties?relatedcounterpartyid=' + relatedcounterpartyidtodelete,
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
                             resultvaluetobind.push($.trim(itemnSavedCP.CounterpartyName));
                         });
                         $("#RelatedCounterparties").val(resultvaluetobind.join(";"));
                         $("#loadingPage").fadeOut();
                         ViewCounterparties();
                     }
                 });
             }
         }
         return;
     });
}
//For Related Counterparty
//manoj

$("#buttonfltr").click(function () {
    if ($(".nice-select").hasClass("open")) {
        $('.nice-select').removeClass('open');
    }
});

function restoreAdvanceViewIntial() {
    $("#tblfilterConditions tr").each(function () {
        $(this).remove();

    });
    $("#txtAdvanceViewName").text('');
    $("#txtAdvanceViewName").val("");
    $('#conAdvanceViewSortBy').val('Recently Updated');
    $("#btnAddNewAdFilter").css("display", "");
    var tr = '<tr id="tr_0">' +
    '<td>' + '</td>' +
     '<td>' +
     '<input id="metadata_label_0" type="text" class="validelement width90" />' +
     '<input id="metadata_value_0" type="hidden" />' +
     '<input id="metadata_type_0" type="hidden" />' +
     '</td>' +
     '<td>' +
     '<span>' +
     '<select id="operator_0" class="validelement" onchange="validateFilterValue(this)">' +
         //'<option value="">--Select--</option>' +
         //'<option value="eq">Equal</option>' +
         //'<option value="ne">Does not equal</option>' +
         //'<option value="gt">Is greater than</option>' +
         //'<option value="ge">Is greater than or equal to</option>' +
         //'<option value="lt">Is less than</option>' +
         //'<option value="le">Is less than or equal to</option>' +
         //'<option value="like">Contains</option>' +
         // '<option value="notlike">Not Contains</option>' +
         //'<option value="empty">Is empty</option>' +
         //'<option value="any">Not empty (any value)</option>' +
      '</select>' +
     '</span>' +
    '</td>' +
       '<td>' + '</td>' + '<td style="text-align: center!important;">' + '</td>' + '</tr>';


    $("#tblfilterConditions").append(tr);

    $("#metadata_label_0").autocomplete({
        source: metadataLookUp,
        minLength: 0,
        select: function (event, ui) {
            $("#metadata_value_0").val(ui.item.fieldName)
            $("#metadata_type_0").val(ui.item.fieldType)
            currentAutoCompleteUiObj = ui;
            createOperatorsBasedOnMetdataType(ui.item.fieldType, 0);
            createValueFieldBasedOnFieldType(ui.item.fieldType, ui.item.choiceValues, 0);

        },
    }).focus(function () {
        $(this).autocomplete('search', $(this).val())
    });
}

function Loading_View_trigger() {
    getSearchableCounterpartyFields();
}

$("#conAdvanceViewSortBy").on('change', function () {
    if ($(this).val() == "Title(A-Z)" || $(this).val() == "Title(Z-A)") {
        $("#advanceViewSortDirection").css("display", "none");
    } else {
        $("#advanceViewSortDirection").css("display", "");
    }
})

$("#advanceViewSortDirection").click(function () {
    var direction = $("#advanceViewSortDirection").attr("data-direction");
    if (direction == 'ASC') {
        $("#advanceViewSortDirection").attr("data-direction", 'DESC');
        $("#advanceViewSortDirection").attr("src", '/Content/Images/up_arrow_1.png');
    } else {
        $("#advanceViewSortDirection").attr("data-direction", 'ASC');
        $("#advanceViewSortDirection").attr("src", '/Content/Images/down-arrow_1.png');
    }
});

function createOperatorsBasedOnMetdataType(fieldType, rowid) {
    var control = "";
    control = ' <option value="">--Select--</option>' +
    ' <option value="eq">Equal</option>' +
    ' <option value="ne">Does not equal</option>' +
    ' <option value="like">Contains</option>' +
    ' <option value="notlike">Not Contains</option>' +
    ' <option value="empty">Is empty</option>' +
    ' <option value="any">Not empty (any value)</option>';
    $("#tr_" + rowid + " select").filter('[id*="operator_"]').empty();
    $("#tr_" + rowid + " select").filter('[id*="operator_"]').append(control);
}

function createValueFieldBasedOnFieldType(fieldType, choiceValues, rowid) {
    var control = "";
    control = '<span>' + '<input id="text_value_' + rowid + '"' + 'type="text" class="f_textinput width90 validelement" />' + '</span>';
    $("#tr_" + rowid + " td:nth-child(4)").html("");
    $("#tr_" + rowid + " td:nth-child(4)").append(control);
}

function split(val) {
    return val.split(/,\s*/);
}

function extractLast(term) {
    return split(term).pop();
}

function getSearchableCounterpartyFields() {

    //Status
    var objStatus = {};
    objStatus.value = "Status";
    objStatus.fieldType = "Custom Lookup";
    objStatus.choiceValues = "";
    objStatus.fieldName = "Status";
    objStatus.label = "Status";

    //Counterparty Type
    var objCounterparty = {};
    objCounterparty.value = "Counterparty Type";
    objCounterparty.fieldType = "Custom Lookup";
    objCounterparty.choiceValues = "";
    objCounterparty.fieldName = "CounterpartyType";
    objCounterparty.label = "Counterparty Type";

    metadataLookUp.push(objCounterparty);
    metadataLookUp.push(objStatus);

    $("#metadata_label_0").autocomplete({
        source: metadataLookUp,
        minLength: 0,
        select: function (event, ui) {
            $("#metadata_value_0").val(ui.item.fieldName)
            $("#metadata_type_0").val(ui.item.fieldType)
            currentAutoCompleteUiObj = ui;
            createOperatorsBasedOnMetdataType(ui.item.fieldType, 0);
            createValueFieldBasedOnFieldType(ui.item.fieldType, ui.item.choiceValues, 0);
        },
    }).focus(function () {
        $(this).autocomplete('search', $(this).val())
    });
}

function lookUpSelect(ui, id) {
    $("#metadata_value_" + id).val(ui.item.fieldName);
    $("#metadata_type_" + id).val(ui.item.fieldType);
    //if (ui.item.fieldType == "Date")
    createOperatorsBasedOnMetdataType(ui.item.fieldType, id);
    createValueFieldBasedOnFieldType(ui.item.fieldType, ui.item.choiceValues, id);
}

function insertNewfilterCondition(objCurrentRow) {
    //var previousRowId = $(objCurrentRow).parent().parent().parent().index();
    var previousRowId = $("#tblfilterConditions tr").length - 1;
    var id = rowCounter;
    var filterConditiontable = document.getElementById("tblfilterConditions");
    var row = filterConditiontable.insertRow(previousRowId + 1);
    row.id = "tr_" + (id + 1);
    var row = "";
    if (id != null && typeof id != 'undefined') {
        row += '<td>';
        row += '<span>' + '<select id="condition_' + (id + 1) + '"' + 'class="width100 validelement" >' + '<option value="">--Select--</option>' + '<option value="and">And</option>' + '<option value="or">Or</option>' + '</select>' + '</span>';
        row += '</td>';
        row += '<td>';
        row += '<input id="metadata_label_' + (id + 1) + '"' + 'type="text" class="f_textinput width90 validelement" />' + '<input id="metadata_value_' + (id + 1) + '"' + 'type="hidden" />' + '<input id="metadata_type_' + (id + 1) + '"' + 'type="hidden" />';
        row += '</td>';
        //row += '<td>' + '<span>' + '<input readonly id="metadata_type_' + (id + 1) + '"' + 'type="text" readonly class="f_textinput width90" />' + '</span>' + '</td>';
        row += '<td>';
        row += '<span>';
        row += '<select onchange="validateFilterValue(this)" id="operator_' + (id + 1) + '"' + 'type="text" class="width100 validelement">' +
               ' <option value="">--Select--</option>' +
               '</select>';
        row += '</span>';
        row += '</td>';
        row += '<td>';
        row += '</td>';
        row += '<td>';
        row += '<span>' + '<a href="javascript:void(0)" onclick="removefilterCondition(this)" >' + '<img src="/Content/Images/close_red.png"/></a>' + '</span>';
        row += '</td>';
        $("#tr_" + (id + 1)).append(row);
        rowCounter = rowCounter + 1;

        $('#metadata_label_' + (id + 1)).autocomplete({
            source: metadataLookUp,
            minLength: 0,
            select: function (event, ui) {
                currentAutoCompleteUiObj = ui;
                lookUpSelect(ui, (id + 1));
            },
            response: function (event, ui) {
                if (ui.content.length === 0) {
                    $('#metadata_label_' + (id + 1)).val('');
                    $('#metadata_value_' + (id + 1)).val('');
                }
            }
        }).focus(function () {
            $(this).autocomplete('search', $(this).val())
        });
    }
    if (previousRowId == 8) {
        $("#btnAddNewAdFilter").css("display", "none");
    }
}

function removefilterCondition(objRow) {
    $(objRow).parent().parent().parent().remove();
    if ($("#tblfilterConditions tr").length <= 9) {
        $("#btnAddNewAdFilter").css("display", "");
    }
}

function validateFilterValue(objthis) {
    var id = $(objthis).attr("id").split('_')[1];
    var rowObj = $(objthis).parent().parent().parent();
    var rowid = $(rowObj).attr('id').split('_')[1];
    var metadataType = $("#tr_" + rowid + " input:hidden").filter('[id*="metadata_type"]').val();
    var fieldName = $("#tr_" + rowid + " input:hidden").filter('[id*="metadata_value"]').val();
    var obj = metadataLookUp.filter(function (value, index) { return value.fieldType == metadataType && value.fieldName == fieldName });
    currentAutoCompleteUiObj.item = {};
    currentAutoCompleteUiObj.item.fieldType = obj[0].fieldType;
    currentAutoCompleteUiObj.item.choiceValues = obj[0].choiceValues;
    if ($(objthis).val() == "empty" || $(objthis).val() == "any") {
        $("#" + $(rowObj).attr('id') + " td:nth-child(4)").html('');
    } else {
        createValueFieldBasedOnFieldType(currentAutoCompleteUiObj.item.fieldType, currentAutoCompleteUiObj.item.choiceValues, rowid);
    }
    if (($("#metadata_type_" + id).val() == 'Single Line Text' || $("#metadata_type_" + id).val() == 'Multi Line Text' || $("#metadata_type_" + id).val() == 'Choice' || $("#metadata_type_" + id).val() == 'User' || $("#metadata_type_" + id).val() == "Yes/No")
          && ($("#operator_" + id).val() == 'ge' || $("#operator_" + id).val() == 'gt' || $("#operator_" + id).val() == 'lt' || $("#operator_" + id).val() == 'le')) {
        $("#operator_" + id).val("");
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

function bindPhoneNumberEdit(id, countryCode) {
    $("#" + id).intlTelInput({
        initialCountry: countryCode,
        separateDialCode: true,
        utilsScript: "/Scripts/utils.js"
    });

}
$('body').click(function () {
    $("#conSortByOptions").niceSelect();
});

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



function GetUserPermissionCPIndex() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/users?userid=' + localStorage.UserID + '&office365emailid=',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            localStorage.setItem("UserType", data.UserType);
            $("#userDesignation").html(data.UserType);
            if (localStorage.UserType == "Business User") {
                $('.businessUser').css('display', 'none');
                $("#myMenu").find("li.edit.contributeCounterparty").each(function () {
                    $(this).css('display', 'none');
                });
                $('.edit.manageCounterpartyMenu').css('display', 'none');
            }
            else {
                $('.businessUser').css('display', '');
                $("#myMenu").find("li.edit.contributeCounterparty").each(function () {
                    $(this).css('display', '');
                });
                $('.edit.manageCounterpartyMenu').css('display', '');
            }

        },
        error:
            function (data) {
                location = "/Error/UserDisabled";
            }
    });
}