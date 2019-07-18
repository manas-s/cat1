var metadataLookUp = [];
var rowCounter = 0;
var thisBusinessAreaName = "";

$(document).ready(function () {
    $('#txtSearchBox').keypress(function (e) {
        if ($('#txtSearchBox').val() != "") {
            if (e.keyCode == 13)
                SearchAlert();
        }
    });
    GetSearchableAlertFields();
    CreateMyAlertList();
    $("#dvAlertDetails").dialog({
        autoOpen: false, closeText: "",
        width: "80%",
        title: "Alert",
        modal: true,
        buttons: {
            "OK": function () { $(this).dialog("close"); }
        }
    });

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

    $("#dvAlertForward").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Forward Alert",
        modal: true,
        buttons: {
            "OK": function () { ForwardAlert(); }
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
});
function MayAlertSettings() { location = "/General/AlertSetting"; }
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
                $("#ddlForwardTo").append(article);
            });
            $("#ddlForwardTo").chosen().trigger("chosen:updated");
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

var vSentNotification;

function lookUpSelect(ui, id) {
    $("#metadata_value_" + id).val(ui.item.fieldName);
    $("#metadata_type_" + id).val(ui.item.fieldType);
    //if (ui.item.fieldType == "Date")
    createOperatorsBasedOnMetdataType(ui.item.fieldType, id);
    createValueFieldBasedOnFieldType(ui.item.fieldType, ui.item.choiceValues, id);
}

function CreateMyAlertList() {
    $("#liFiltersforQuickViews").css("display", "");
    $("#launcher4").css('display', '');
    $("#txtSearchBox").css('display', '');
    colorLink('spnAllAlertList', true);
    $("#txtSearchBox").val("");
    $("#liAdvanceViewFilter").empty();
    $("#txtSearchBox").attr("placeholder", "Search in 'All Alerts'");
    colorLink('spnAlertListDismissed', false);
    colorLink('spnAlertListActive', false);
    colorLink('liSavedViews a', false);
    colorLink('liSavedViews span', false);
    $("#showAll").empty();
    $("#showAll").append('Showing All Alerts');
    $("#myAlerts").empty();
    $('#myAlerts').html('<img src="../Content/Images/icon/loading.gif">');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/notifications/Users?userid=' + localStorage.UserName + '&dismissed=&priority=&pagesize=0&startindex=0',
        type: 'GET',
        dataType: 'json',
        // 'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            vSentNotification = data;
            $('#myAlerts').empty();
            GenerateAlertList(data, false);
        },
        error:
            function (data) {
                $("#myAlerts").html('');
                $("#myAlerts").append('<p class="f_p-error">No items found.</p>');
            }
    });
}


function CreateMyAlertListDismissed() {
    $("#myAlerts").empty();
    $('#myAlerts').html('<img src="../Content/Images/icon/loading.gif">');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/notifications/Users?userid=' + localStorage.UserName + '&dismissed=Yes&priority=&pagesize=0&startindex=0',
        type: 'GET',
        dataType: 'json',
        //'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },

        success: function (data) {
            vSentNotification = data;
            $('#myAlerts').empty();
            GenerateAlertList(data, true);
        },
        error:
            function (data) {
                $("#myAlerts").html('');
                $("#myAlerts").append('<p class="f_p-error">No items found.</p>');
            }
    });
}

function editAdvanceView() {

    if (metadataLookUp.length == 0) {

        $("#loadingPage").fadeIn();

        //Priority
        var objPriority = {};
        objPriority.value = "Priority";
        objPriority.fieldType = "PriorityLookup";
        objPriority.choiceValues = "";
        objPriority.fieldName = "Priority";
        objPriority.label = "Priority";

        //Notification Type
        var objNotification = {};
        objNotification.value = "Notification Type";
        objNotification.fieldType = "NotificationLookup";
        objNotification.choiceValues = "";
        objNotification.fieldName = "NotificationType";
        objNotification.label = "Notification Type";

        metadataLookUp.push(objPriority);
        metadataLookUp.push(objNotification);

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
        if (metadataType == "PriorityLookup" || metadataType == "NotificationLookup" || metadataType == "Yes/No" || metadataType == "Date" || metadataType == "Value / Financials" || metadataType == "Multi- Choice (Dropdown)") {
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
            case "PriorityLookup":
                $("#tr_" + rowCounter + " select").filter("[id*='filterPriority']").val(rvalue);
                break;
            case "NotificationLookup":
                $("#tr_" + rowCounter + " select").filter("[id*='filterNotification']").val(rvalue);
                break;
            default: break;
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

function GetSearchableAlertFields() {
    //Priority
    var objPriority = {};
    objPriority.value = "Priority";
    objPriority.fieldType = "PriorityLookup";
    objPriority.choiceValues = "";
    objPriority.fieldName = "Priority";
    objPriority.label = "Priority";

    //Notification Type
    var objNotification = {};
    objNotification.value = "Notification Type";
    objNotification.fieldType = "NotificationLookup";
    objNotification.choiceValues = "";
    objNotification.fieldName = "NotificationType";
    objNotification.label = "Notification Type";

    metadataLookUp.push(objPriority);
    metadataLookUp.push(objNotification);

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

function createOperatorsBasedOnMetdataType(fieldType, rowid) {
    var control = ' <option value="">--Select--</option>' +
            ' <option value="eq">Equal</option>' +
            ' <option value="ne">Does not equal</option>' +
            //' <option value="like">Contains</option>' +
            //' <option value="notlike">Not Contains</option>' +
            //' <option value="empty">Is empty</option>' +
            //' <option value="any">Not empty (any value)</option>';
            $("#tr_" + rowid + " select").filter('[id*="operator_"]').empty();
    $("#tr_" + rowid + " select").filter('[id*="operator_"]').append(control);
}

function createValueFieldBasedOnFieldType(fieldType, choiceValues, rowid) {
    var control = "";

    switch (fieldType) {

        case "PriorityLookup":
            var options = "";
            control = '<span>' + '<select id=filterPriority' + rowid + ' class="width100 validelement filtervalue"> ';
            options += "<option value='All'>All</option>";
            options += "<option value='High'>High</option>";
            options += "<option value='Medium'>Medium</option>";
            options += "<option value='Low'>Low</option>";
            control += options + "</select>" + '</span>';
            $("#tr_" + rowid + " td:nth-child(4)").html("");
            $("#tr_" + rowid + " td:nth-child(4)").append(control);
            $("#filterPriority" + rowid).trigger("chosen:updated");
            break;

        case "NotificationLookup":
            var options = "";
            control = '<span>' + '<select id=filterNotification' + rowid + ' class="width100 validelement filtervalue"> ';
            options += "<option value='All'>All</option>";
            options += "<option value='Contract'>Contract</option>";
            options += "<option value='Extended'>Extended</option>";
            options += "<option value='Ownership'>Ownership</option>";
            options += "<option value='Permission'>Permission</option>";
            options += "<option value='Renewal'>Renewal</option>";
            options += "<option value='Status'>Status</option>";
            control += options + "</select>" + '</span>';
            $("#tr_" + rowid + " td:nth-child(4)").html("");
            $("#tr_" + rowid + " td:nth-child(4)").append(control);
            $("#filterNotification" + rowid).trigger("chosen:updated");
            break;

        default: break;
    }
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
        //row += '<td>';
        //row += '<span>' + '<a id="insertNewfilter_' + (id + 1) + '"' + 'onclick="insertNewfilterCondition(this)" href="javascript:void(0)"><img src="/Content/Images/plus_green.png" />' + '</a>' + '</span>';
        //row += '</td>';
        //row += '<td>';
        //row += '<span>' + '<input style="display:none" checked="checked" id="chkNewfilter_' + (id + 1) + '"' + 'type="checkbox" />' + '</span>';
        //row += '</td>';
        row += '<td>';
        row += '<span>' + '<select id="condition_' + (id + 1) + '"' + 'class="width100 validelement" >' + '<option value="">--Select--</option>' + '<option value="and">And</option>' + '<option value="or">Or</option>' + '</select>' + '</span>';
        row += '</td>';
        row += '<td>';
        row += '<input id="metadata_label_' + (id + 1) + '"' + 'type="text" class="f_textinput width90" />' + '<input id="metadata_value_' + (id + 1) + '"' + 'type="hidden" />' + '<input id="metadata_type_' + (id + 1) + '"' + 'type="hidden" />';
        row += '</td>';
        //row += '<td>' + '<span>' + '<input readonly id="metadata_type_' + (id + 1) + '"' + 'type="text" readonly class="f_textinput width90" />' + '</span>' + '</td>';
        row += '<td>';
        row += '<span>';
        row += '<select onchange="validateFilterValue(this)" id="operator_' + (id + 1) + '"' + 'type="text" class="width100 validelement">' +
               ' <option value="">--Select--</option>' +
               //' <option value="eq">Equals</option>' +
               //' <option value="gt">Is Greater than</option>'+
               //' <option value="ne">Does not equal</option>' +
               //' <option value="gt">Is greater than</option>' +
               //' <option value="ge">Is greater than or equal to</option>' + 
               //' <option value="lt">Is less than</option>' +
               //' <option value="le">Is less than or equal to</option>' +
               //' <option value="like">Contains</option>' +
               //' <option value="notlike">Not Contains</option>' +
               //' <option value="empty">Empty</option>' +
               //' <option value="any">Not Empty / Any </option>' +
               '</select>';
        row += '</span>';
        row += '</td>';
        row += '<td>';
        //row += '<span>' + '<input id="value_' + (id + 1) + '"' + 'type="text" class="f_textinput width90" />' + '</span>';
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
                } else {
                    //$('#metadata_label_' + (id + 1)).val('');
                    //$('#metadata_value_' + (id + 1)).val('');
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

function CreateMyAlertListActive() {
    $("#myAlerts").empty();
    $('#myAlerts').html('<img src="../Content/Images/icon/loading.gif">');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/notifications/Users?userid=' + localStorage.UserName + '&dismissed=No&priority=&pagesize=0&startindex=0',
        type: 'GET',
        dataType: 'json',
        // 'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            vSentNotification = data;
            $('#myAlerts').empty();
            GenerateAlertList(data, false);
        },
        error:
            function (data) {
                $("#myAlerts").html('');
                $("#myAlerts").append('<p class="f_p-error">No items found.</p>');
            }
    });
}

function quickViewDisplay(obj) {
    $("#liFiltersforQuickViews").css("display", "");
    colorLink('liSavedViews a', false);
    colorLink('liSavedViews span', false);
    colorLink('spnAllAlertList', false);
    selectedSortOption = "";
    $("#liFiltersSearchText").empty();
    $("#liFiltersPriority").empty();
    $("#liFiltersType").empty();
    $("#liAdvanceViewFilter").empty();
    $("#filterPriority option:selected").prop('selected', false);
    $("#filterNotification option:selected").prop('selected', false);
    $("#txtSearchBox").val("");
    $("#txtSearchBox").attr("placeholder", "Search in '" + obj.innerText + "'");
    if (obj.id == "aAlertListDismissed") {
        CreateMyAlertListDismissed();
        colorLink('spnAlertListDismissed', true);
        colorLink('spnAlertListActive', false);
    }
    else if (obj.id == "aAlertListActive") {
        CreateMyAlertListActive();
        colorLink('spnAlertListDismissed', false);
        colorLink('spnAlertListActive', true);
    }

    $("#launcher4").css('display', 'none');
    $("#btnAddView").css('display', 'none');


    $("#showAll").css('display', 'inline');
    $("#showAll").html('Showing ' + obj + ' Alerts<img title="Remove" onclick="javascript:CreateMyAlertList();" style="margin-left: 5px; margin-right: 10px; cursor:pointer;" src="../Content/Images/icon/close.png" />');
}

function colorLink(objId, tobecolored) {
    if (tobecolored) {
        $('#' + objId).addClass("active_quick_view");
    }
    else {
        $('#' + objId).removeClass("active_quick_view");
    }
}

function GenerateAlertList(alerts, isDismis) {
    $("#myAlerts").html('');
    var datalenght = alerts.length;
    for (var i = 0; i < datalenght; i++) {
        var item = alerts[i];
        var sCategory = item.Category;
        var isDismissed = item.UserDismissed;
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
        var vNewIcon = ' <img src="../Content/Images/new_item.png" alt="None" title="None" /> ';
        if (item.UserViewed != "No") { vNewIcon = ""; }


        var article = '<li>';
        article += '<p id="NotificationTitle" style="display:none;">' + sNotificationTitle + '</p>';
        article += '<p id="NotificationID" style="display:none;">' + item.RowKey + '</p>';
        if (isDismis)
            article += '<p><a href="javascript:void(0)" onclick="ViewAlertDetail(\'' + item.RowKey + '\')">' + sNotificationTitle + '</a>' + vNewIcon + vPriorityIcon + '&nbsp;&nbsp;<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuDismiss" />';
        else {
            if (isDismissed == "Yes")
                article += '<p><a href="javascript:void(0)" onclick="ViewAlertDetail(\'' + item.RowKey + '\')">' + sNotificationTitle + '</a>' + vNewIcon + vPriorityIcon + '&nbsp;&nbsp;<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuDismiss" />';
            else
                article += '<p><a href="javascript:void(0)" onclick="ViewAlertDetail(\'' + item.RowKey + '\')">' + sNotificationTitle + '</a>' + vNewIcon + vPriorityIcon + '&nbsp;&nbsp;<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenu" />';
        }
        //if (isDismis)
        //    article += '<p><a href="javascript:void(0)" onclick="ViewNotificationDetail(\'' + i + '\')">' + sNotificationTitle + '</a>' + vNewIcon + vPriorityIcon + '&nbsp;&nbsp;<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuDismiss" />';
        //else {
        //    if (isDismissed == "Yes")
        //        article += '<p><a href="javascript:void(0)" onclick="ViewNotificationDetail(\'' + i + '\')">' + sNotificationTitle + '</a>' + vNewIcon + vPriorityIcon + '&nbsp;&nbsp;<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuDismiss" />';
        //    else
        //        article += '<p><a href="javascript:void(0)" onclick="ViewNotificationDetail(\'' + i + '\')">' + sNotificationTitle + '</a>' + vNewIcon + vPriorityIcon + '&nbsp;&nbsp;<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenu" />';
        //}
        //article += '<a href="javascript:void(0)"></a>';
        article += '<small>' + sNotificationDate + '</small></p>';

        article += '</li>';



        $("#myAlerts").append(article);

    }
    $(".openmenu").contextMenu({ menu: 'myMenu', leftButton: true }, function (action, el, pos) {
        contextMenuWork(action, el.parent("p").parent("li"), pos);
    });
    $(".openmenuDismiss").contextMenu({ menu: 'myMenuDismissed', leftButton: true }, function (action, el, pos) {
        contextMenuWork(action, el.parent("p").parent("li"), pos);
    });


    $('#compact-pagination').pagination({
        items: alerts.length,
        itemsOnPage: 20,
        type: 'ul',
        row: 'li',
        typeID: 'myAlerts',
        cssStyle: 'compact-theme'
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

function contextMenuWork(action, el, pos) {

    switch (action) {
        case "view":
            {
                var notificationID = $(el).find("#NotificationID").text();
                ViewAlertDetail(notificationID);
                break;
            }
        case "forward":
            {
                $("#loadingPage").fadeIn();

                GetValuesAndAutoPopulate("ddlForwardTo", "");

                var notificationTitle = $(el).find("#NotificationTitle").text();
                var notificationID = $(el).find("#NotificationID").text();
                $("#hdNotificationID").val(notificationID);
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/notifications?notificationid=' + notificationID,
                    type: 'GET',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    cache: false,
                    success: function (entity) {
                        $("#sentOnForward").html(moment(new Date(entity.NotificationDate)).format('Do MMM'));


                        var vNotificationDescription = entity.NotificationDescription;
                        vNotificationDescription = vNotificationDescription.replace(/\n/g, "<br/>");

                        $("#alertTextForward").html(vNotificationDescription);
                        $("#loadingPage").fadeOut();
                        $("#dvAlertForward").dialog("open");
                    },
                    error: function (status) {
                        $("#loadingPage").fadeOut();
                    }
                });

                break;
            }
        case "dismiss":
            {
                var notificationTitle = $(el).find("#NotificationTitle").text();
                var notificationID = $(el).find("#NotificationID").text();
                swal({
                    title: '',
                    text: "Are you sure you want to <span style=\"font-weight:700\">dismiss '" + notificationTitle + "'</span>?",
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
               url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/notifications/' + notificationID + '?dismissed=Yes',
               type: 'PUT',
               dataType: 'json',
               headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
               cache: false,
               success: function (data) {
                   $("#loadingPage").fadeOut();
                   // alert(notificationTitle + ' Dismissed.');
                   swal("", notificationTitle + " Dismissed.");
                   var isDimiss = $(el).find("img.openmenu");
                   if (isDimiss.length > 0) {
                       $(isDimiss).removeClass("openmenu");
                       $(isDimiss).addClass("openmenuDismiss");
                       $(".openmenuDismiss").contextMenu({ menu: 'myMenuDismissed', leftButton: true }, function (action, el, pos) {
                           contextMenuWork(action, el.parent("p").parent("li"), pos);
                       });
                   }
                   // CreateMyAlertList();
               },
               error: function (status) {
                   $("#loadingPage").fadeOut();
               }
           });
       }
       return;
   });

                break;
            }
    }
}
function ViewNotificationDetail(id) {
    $("#tdNotificationText").html(vSentNotification[id].NotificationDescription);
    $("#tdNotificationSentTo").html(vSentNotification[id].UserID);
    $("#tdNotificationSentOn").html(moment(new Date(vSentNotification[id].NotificationDate)).format('Do MMM, h:mm A'));
    $("#dvNotificationDetail").dialog("open");
}
function ViewAlertDetails(notificationID) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/notifications?notificationid=' + notificationID,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (entity) {
            $("#sentOn").html(moment(new Date(entity.NotificationDate)).format('Do MMM'));
            $("#alertTitle").html(entity.NotificationTitle);

            var vNotificationDescription = entity.NotificationDescription;
            // vNotificationDescription = vNotificationDescription.replace(/\n/g, "<br/>");
            $("#alertText").html(vNotificationDescription);
        }
    });

    $("#dvAlertDetails").dialog("open");
}

function ForwardAlert() {
    if (requiredValidator('dvAlertForward')) {
        var arrForwardTo = $("#ddlForwardTo").val();
        var vForwardTo = '';
        $(arrForwardTo).each(function (i, item) {
            if (vForwardTo == '') {
                vForwardTo = item;
            }
            else {
                vForwardTo += "; " + item;
            }
        });
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/notifications/' + $("#hdNotificationID").val() + '?forwardto=' + vForwardTo,
            type: 'POST',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
            cache: false,
            success: function (data) {

                swal("", "Alert forwarded to " + vForwardTo);
                $("#hdNotificationID").val("");
                $("#dvAlertForward").dialog("close");
            }
        });
    }
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
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/savedview?viewfor=Alert&userid=' + localStorage.UserName,
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
                    removeBtn = "<img src='../Content/Images/Icon/delete.png' title='Delete' style='float:right; padding-top:7px; cursor:pointer;'  onclick='deleteSavedView(this)' id=" + item.RowKey + ">";
                var article = '<li style="padding-left:0px;"><a href="javascript:void(0)" data-isAdvance="Yes" class="alert_view" onclick="javascript:savedViewDisplay(this)" id=' + item.RowKey + ' name=' + item.ViewName + ' title=' + item.ViewName + '>' + item.ViewName + '</a>'
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
//        var query = "Priority:";
//        $("#liFiltersPriority").each(function (i, item) {

//            var str = item.textContent;
//            query += str + ',';

//        });

//        query += ";Category:";
//        $("#liFiltersType").each(function (i, item) {
//            var str = item.textContent;

//            //var find = '\r\n';
//            //var re = new RegExp(find, 'g');

//            //str = str.replace(re, ',');
//            query += str + ',';
//        });
//        query += ";";

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
//                ViewFor: 'Alert',
//                ViewQuery: query,
//                CreatedBy: localStorage.UserName,
//                ModifiedBy: localStorage.UserName
//            },
//            cache: false,
//            success: function (person) {
//                $("#txtViewName").val("")
//                GetSavedViews();
//                $("#addNewView").dialog("close");
//            }
//        });
//    }
//}

function getQuickViewLinkName(qvName) {
    var splitName = qvName.split(':');
    var rName = splitName[splitName.length - 1];
    rName = $.trim(rName);
    return rName;
}

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

                            case "PriorityLookup":
                                query += ' <value>' + $.trim($("#" + $(val).attr('id') + " select").filter("[id*='filterPriority']").val()) + '</value>';
                                break;

                            case "NotificationLookup":
                                query += ' <value>' + $.trim($("#" + $(val).attr('id') + " select").filter("[id*='filterNotification']").val()) + '</value>';
                                break;

                            default: break;
                        }
                        query += '<operator>' + $("#" + $(val).attr('id') + " select").filter('[id*="operator"]').val() + '</operator>';
                        query += '</filter>';
                    } else {
                        query += '<filter>'
                        query += '<isEnabled>Yes</isEnabled>';
                        query += '<condition>' + $("#" + $(val).attr('id') + " select").filter('[id*="condition"]').val() + '</condition>';
                        query += '<metadataname>' + $("#" + $(val).attr('id') + ' input:text').filter('[id*="metadata_label"]').val() + '</metadataname>';
                        query += '<metadatavalue>' + $("#" + $(val).attr('id') + ' input:hidden').filter('[id*="metadata_value"]').val() + '</metadatavalue>';
                        query += '<metadatatype>' + $("#" + $(val).attr('id') + ' input:hidden').filter('[id*="metadata_type"]').val() + '</metadatatype>';
                        fieldtype = $("#" + $(val).attr('id') + ' input:hidden').filter('[id*="metadata_type"]').val();
                        switch (fieldtype) {
                            case "PriorityLookup":
                                query += ' <value>' + $.trim($("#" + $(val).attr('id') + " select").filter("[id*='filterPriority']").val()) + '</value>';
                                break;
                            case "NotificationLookup":
                                query += ' <value>' + $.trim($("#" + $(val).attr('id') + " select").filter("[id*='filterNotification']").val()) + '</value>';
                                break;
                            default: break;
                        }
                        query += '<operator>' + $("#" + $(val).attr('id') + " select").filter('[id*="operator"]').val() + '</operator>';
                        query += '</filter>';
                    }
                })
                query += "</filters>";
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

                var qvName = "";
                if ($('#liFiltersQuickView').text() != "") {
                    qvName = getQuickViewLinkName($('#liFiltersQuickView').text());
                }

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
                            SortBy: "",
                            ViewFor: 'Alert',
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
                                //swal("", person);
                                restoreAdvanceViewIntial();
                                GetSavedViews();

                                if (operation == 'add') {
                                    setTimeout(function () {
                                        var viewObj = $("#liContractViews li p a").filter('[id*=' + '"' + person.split('&')[0] + '"' + ']');
                                        $("#loadingPage").fadeOut();
                                        if (viewObj.length > 0)
                                            savedViewDisplay(viewObj[0])
                                    }, 5000);

                                } else if (operation == 'update') {
                                    setTimeout(function () {
                                        var viewObj = $("#liContractViews li p a").filter('[id*=' + '"' + $("#txtViewID").val() + '"' + ']');
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


//function savedViewDisplay(obj) {
//    $.ajax({
//        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/savedview?viewid=' + obj.id,
//        type: 'GET',
//        dataType: 'json',
//        headers: { 'eContracts-ApiKey': localStorage.APIKey },
//        "Content-Type": "application/json",
//        cache: false,
//        success: function (savedviewentity) {
//            $("#liFiltersPriority").empty();
//            $("#liFiltersType").empty();
//            $("#liFiltersSearchText").empty();
//            $("#filterPriority option:selected").prop('selected', false);
//            $("#filterType option:selected").prop('selected', false);
//            $('#tdSort a').each(function (i, item) {
//                item.style.backgroundColor = "";
//            });

//            var values1 = savedviewentity.ViewQuery.split(';')[0].split(':')[1].split(',');
//            var values1length = values1.length;
//            for (var i = 0; i < values1length; i++) {
//                var find = " ";
//                var re = new RegExp(find, 'g');

//                values1[i] = values1[i].replace(re, '');

//                $("#filterPriority option[value='" + values1[i] + "']").prop("selected", true);
//            }

//            var values2 = savedviewentity.ViewQuery.split(';')[1].split(':')[1].split(',');
//            var values2length = values2.length;
//            for (var i = 0; i < values2length; i++) {
//                var find = " ";
//                var re = new RegExp(find, 'g');

//                values2[i] = values2[i].replace(re, '');

//                $("#filterType option[value='" + values2[i] + "']").prop("selected", true);
//            }

//            applyFilter();
//        }
//    });
//}


function savedViewDisplay(obj) {
    $('#txtSearchBox').val('');
    $("#liFiltersforQuickViews").css('display', 'none');
    if ($(obj).attr('data-isadvance') == 'Yes') {
        colorLink('liContractViews a', false);
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
                    $("#liFiltersPriority").empty();
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

                            if (metadatatype != 'Date') {
                                value = $(node).find('value').text();
                            }

                            if (operator != "Is Empty" && operator != "Any")
                                filterHtml += '<span><small >' + metadata + ' ' + operator + ' ' + value + '</small></span>';
                            else
                                filterHtml += '<span><small >' + metadata + ' ' + operator + '</small></span>';
                        }
                        else {
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
                            }
                            if (operator != "Is Empty" && operator != "Any")
                                filterHtml += ' <span><small>' + condition + '</small></span>' + '<span><small >' + metadata + ' ' + operator + ' ' + value + '</small></span>';
                            else
                                filterHtml += '<span><small >' + condition + '</small></span>' + '<span><small >' + metadata + ' ' + operator + '</small></span>';
                        }
                    });

                    var qvName = "";
                    var defaultviewname = savedviewentity.ViewName;
                    //savedViewNameFromViewTable = defaultviewname;
                    qvName = currentadvanceViewObj.ViewName;
                    colorLink(obj.id, true);
                    $("#filterPriority").css('display', '');
                    $("#filterNotification").css('display', '');
                    $("#txtSearchBox").attr("placeholder", "Search in 'All' ");

                    $('#menu4').hide();
                    $("#showAll").css('display', 'none');
                    $("#liFiltersSearchText").empty();
                    $("#liFiltersPriority").empty();
                    $("#liFiltersType").empty();
                    $("#liAdvanceViewFilter").empty();
                    var newurl = "";
                    var baname = ";";
                    if (thisBusinessAreaName == "" || thisBusinessAreaName == "All") {
                    } else {
                        baname = thisBusinessAreaName;
                    }
                    var baloc = "";
                    if (typeof localStorage.GlobalBusinessAreaLocation != 'undefined' && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
                        baloc = encodeURIComponent(localStorage.GlobalBusinessAreaLocation);
                    }

                    newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/advacnedviewnotification?BusinessAreaPath=' + baloc + '&filterXml=' + viewQueryXml + "&viewName=" + qvName + '&searchkeyword=' + encodeURIComponent($("#txtSearchBox").val());

                    $('#myAlerts').html('<img src="../Content/Images/icon/loading.gif">');

                    $.ajax({
                        url: newurl,
                        type: 'GET',
                        dataType: 'json',
                        'Content-Type': 'application/json',
                        cache: false,
                        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName, BusinessAreaLocation: localStorage.GlobalBusinessAreaLocation },
                        success: function (data) {
                            vSentNotification = data;
                            $('#myAlerts').empty();
                            GenerateAlertList(data, false);
                        },
                        error:
                            function (data) {
                                $("#myAlerts").html('');
                                $("#myAlerts").append('<p class="f_p-error">No items found.</p>');
                            }
                    });
                    $("#dvfilter").hide();
                    $("#liAdvanceViewFilter").html(filterHtml + '<a style="float:right;" href="javascript:void(0)" onclick="editAdvanceView()">Edit View</a>');

                }
            }
        });
    }
}

//manoj
function savedViewDisplaywithSearch(obj) {
    $("#liFiltersforQuickViews").css('display', 'none');
    if ($(obj).attr('data-isadvance') == 'Yes') {
        colorLink('liContractViews a', false);
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
                    $("#liFiltersPriority").empty();
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

                            if (metadatatype != 'Date') {
                                value = $(node).find('value').text();
                            }

                            if (operator != "Is Empty" && operator != "Any")
                                filterHtml += '<span><small >' + metadata + ' ' + operator + ' ' + value + '</small></span>';
                            else
                                filterHtml += '<span><small >' + metadata + ' ' + operator + '</small></span>';
                        }
                        else {
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
                            }
                            if (operator != "Is Empty" && operator != "Any")
                                filterHtml += ' <span><small>' + condition + '</small></span>' + '<span><small >' + metadata + ' ' + operator + ' ' + value + '</small></span>';
                            else
                                filterHtml += '<span><small >' + condition + '</small></span>' + '<span><small >' + metadata + ' ' + operator + '</small></span>';
                        }
                    });

                    var qvName = "";
                    var defaultviewname = savedviewentity.ViewName;
                    //savedViewNameFromViewTable = defaultviewname;
                    qvName = currentadvanceViewObj.ViewName;
                    colorLink(obj.id, true);
                    $("#filterPriority").css('display', '');
                    $("#filterNotification").css('display', '');
                    $("#txtSearchBox").attr("placeholder", "Search in 'All' ");

                    $('#menu4').hide();
                    $("#showAll").css('display', 'none');
                    $("#liFiltersSearchText").empty();
                    $("#liFiltersPriority").empty();
                    $("#liFiltersType").empty();
                    $("#liAdvanceViewFilter").empty();
                    var newurl = "";
                    var baname = ";";
                    if (thisBusinessAreaName == "" || thisBusinessAreaName == "All") {
                    } else {
                        baname = thisBusinessAreaName;
                    }
                    var baloc = "";
                    if (typeof localStorage.GlobalBusinessAreaLocation != 'undefined' && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
                        baloc = encodeURIComponent(localStorage.GlobalBusinessAreaLocation);
                    }

                    newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/advacnedviewnotification?BusinessAreaPath=' + baloc + '&filterXml=' + viewQueryXml + "&viewName=" + qvName + '&searchkeyword=' + encodeURIComponent($("#txtSearchBox").val());

                    $('#myAlerts').html('<img src="../Content/Images/icon/loading.gif">');

                    $.ajax({
                        url: newurl,
                        type: 'GET',
                        dataType: 'json',
                        'Content-Type': 'application/json',
                        cache: false,
                        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName, BusinessAreaLocation: localStorage.GlobalBusinessAreaLocation },
                        success: function (data) {
                            vSentNotification = data;
                            $('#myAlerts').empty();
                            GenerateAlertList(data, false);
                        },
                        error:
                            function (data) {
                                $("#myAlerts").html('');
                                $("#myAlerts").append('<p class="f_p-error">No items found.</p>');
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
}
//manoj

function clearSelection() {
    $("#btnAddView").css('display', 'none');
    $("#showAll").css('display', 'inline');
    $("#liFiltersPriority").empty();
    $("#liFiltersType").empty();
    $("#liFiltersSearchText").empty();
    $("#filterPriority option:selected").prop('selected', false);
    $("#filterNotification option:selected").prop('selected', false);
    $('#tdSort a').each(function (i, item) {
        item.style.backgroundColor = "";
    });
    applyFilter();
}

function applyFilter() {
    $(".hhide2").hide();
    $("#liAdvanceViewFilter").empty();
    $('#menu4').hide();
    $("#showAll").css('display', 'none');
    $("#liFiltersPriority").empty();
    $("#liFiltersType").empty();
    $("#btnAddView").css('display', 'block');
    $("#liFiltersSearchText").empty();
    $("#liAdvanceViewFilter").empty();
    var txtsearchboxvalue = $.trim($('#txtSearchBox').val());
    if (txtsearchboxvalue != "" && txtsearchboxvalue != null) {
        $('#liFiltersSearchText').append('<span><small>' + txtsearchboxvalue + '</small><a href="javascript:void(0)"><img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" /></a></span>');
    }
    var customQuery1 = "Priority:";
    var isContainingAll1 = false;
    var isAnySelected1 = false;
    $('#filterPriority :selected').each(function (i, selected) {
        isAnySelected1 = true;
        if ($(selected).text() == "All")
            isContainingAll1 = true;

        $('#liFiltersPriority').append('<span><small>' + $(selected).text() + '</small><a href="javascript:void(0)"><img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" /></a></span>');
        customQuery1 += ',' + $(selected).text();

    });
    if (!isAnySelected1) {
        customQuery1 = "";
    }
    if (isContainingAll1) {
        $("#liFiltersPriority").empty();
        customQuery1 = "";
    }

    var customQuery2 = ";Category:";
    var isContainingAll2 = false;
    var isAnySelected2 = false;
    $('#filterNotification :selected').each(function (i, selected) {
        isAnySelected2 = true;
        if ($(selected).text() == "All")
            isContainingAll2 = true;

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

    if (!isAnySelected1 && !isAnySelected2 && (txtsearchboxvalue == "" || txtsearchboxvalue == null)) {
        $("#btnAddView").css('display', 'none'); $("#showAll").css('display', 'inline');
    }

    $("#compact-pagination").empty();
    $("#myAlerts").empty();

    var newurl = "";
    var sortby = "&sortbyfield=Timestamp&orderby=DESC";
    switch (selectedSortOption) {
        case "Recently Updated":
            sortby = '&sortbyfield=Timestamp&orderby=DESC';
            break;
        case "Recently Notified":
            sortby = '&sortbyfield=NotificationDate&orderby=DESC';
            break;
        default:
            sortby = '&sortbyfield=Timestamp&orderby=DESC';
            break;
    }

    newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/notifications?searchkeyword=' + encodeURIComponent($("#txtSearchBox").val()) + '&userid=' + localStorage.UserName + '&customquery=' + customQuery1 + customQuery2 + sortby;
    $('#myAlerts').html('<img src="../Content/Images/icon/loading.gif">');
    $.ajax({
        url: newurl,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            $('#myAlerts').empty();
            GenerateAlertList(data, false);

        },
        error:
            function (data) {
                $("#myAlerts").empty();
                $("#myAlerts").append("<p class='f_p-error'>No Result Found.</p>");
            }
    });
}

function liRemove(obj) {
    var allowcustomsearch = false;
    if ($(obj.parentNode.parentNode.parentNode).attr('id') == 'liFiltersSearchText') {
        $(obj.parentNode.parentNode).empty();
        $('#txtSearchBox').val('');
        //manoj
        var CustomUl = $("#liSavedViews");
        TriggerChild = $(CustomUl).find(".active_quick_view");
        if (typeof TriggerChild != 'undefined' && TriggerChild != null && TriggerChild != "" && TriggerChild.length > 0) {
            savedViewDisplaywithSearch(TriggerChild[0]);
            allowcustomsearch = true;
        }
        //manoj
    }
    else {
        var child = obj.parentNode;
        child = child.parentNode;
        var firstChild = child.textContent;

        var find = " ";
        var re = new RegExp(find, 'g');

        firstChild = firstChild.replace(re, '');

        $("#filterPriority option[value='" + firstChild + "']").prop("selected", false);
        $("#filterNotification option[value='" + firstChild + "']").prop("selected", false);

        child.parentNode.removeChild(child);
    }
    if (!allowcustomsearch) {
        var hasItem1 = false;
        $('#liFiltersPriority span').each(function (i) {
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
            $("#showAll").text("Showing All Alerts");
        }
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

function SearchAlert() {
    //manoj
    var allowcustomsearch = false;
    var CustomUl = $("#liSavedViews");
    TriggerChild = $(CustomUl).find(".active_quick_view");
    if (typeof TriggerChild != 'undefined' && TriggerChild != null && TriggerChild != "" && TriggerChild.length > 0) {
        savedViewDisplaywithSearch(TriggerChild[0]);
        allowcustomsearch = true;
    } else {
        applyFilter();
    }
    //manoj
}


function Loading_View_trigger() {
    GetSavedViews();
    BindPeople();
}



function restoreAdvanceViewIntial() {
    $("#tblfilterConditions tr").each(function () {
        $(this).remove();

    });
    $("#txtAdvanceViewName").text('');
    $("#txtAdvanceViewName").val("");

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

function CreateAdvanceView() {
    $("#btnAdvanceViewSaveAs").css("display", "none");
    $("#btnUpdateAdvanceView").css("display", "none");
    $("#addNewAdvanceView").dialog({ 'title': 'Create View' });
    $("#btnCreateAdvanceView").css("display", "");
    $("#addNewAdvanceView").dialog("open");
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

function removefilterCondition(objRow) {
    $(objRow).parent().parent().parent().remove();
    if ($("#tblfilterConditions tr").length <= 9) {
        $("#btnAddNewAdFilter").css("display", "");
    }
}