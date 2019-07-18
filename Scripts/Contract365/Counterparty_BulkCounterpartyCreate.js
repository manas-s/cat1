var allfilterdatas = '';
var thisBusinessAreaName = "";
var thisContractAreaName = "";
var thisBusinessAreaNameRowKey = "";
var thisContractAreaNameRowKey = "";
var thisBusinessAreaPath = "";
$(document).ready(function () {
    $("input[name='IsGlobal']").each(function (i) {
        $(this).attr('disabled', 'disabled');
    });
    $("#trcp-RgBusi").hide();
    $("#txtOwnerofBusinessArea").removeClass("validelement");
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/counterpartyfields',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            BindBusinessAreaPicker11();
            $(data).each(function (i, item) {
                // if (item.FieldName != "Status")
                allfilterdatas += "<option value=" + item.FieldName + ">" + item.FieldName + "</option>";
            });
        },
        error: function (data) {
            BindBusinessAreaPicker11();
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
    $("#hdnOwnerofBusinessArea").val('');
    $("#hdnLocOwnerofBusinessArea").val('');
    $("#txtOwnerofBusinessArea").val('');

});
function readexcelfile() {
    if (requiredValidator('divFileUpload')) {
        var formData = new FormData();
        var opmlFile = $('#docCounterparty')[0];
        formData.append("opmlFile", opmlFile.files[0]);
        formData.append("AccountID", localStorage.AccountID);

        $('#tbBulkControls').html('<img src="../Content/Images/icon/loading.gif"> Loading data from excelsheet...');

        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/bulk',
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
            processData: false,
            success: function (data) {
                $("input[name='IsGlobal']").each(function (i) {
                    $(this).attr('disabled', false);
                });
                var html = "<tr id='trdropdown'>";

                var i = 0;
                $.each(data[0], function (key, value) {//+ key.replace(/\s/g, '') + "~"

                    var strFilter = "<select id='ddl" + i + "' onchange='ddlselectchange(this);' class='f_inpt width80' title='field' name='" + key + "' >";
                    strFilter += "<option value='0'>Select Column</option>";
                    strFilter += allfilterdatas;
                    html += "<td style='min-width: 150px;'>" + strFilter + "</td>";
                    i++;
                });

                html += "</tr>";

                //add header row
                html += "<tr id='trhead' class='tablehead'>";

                $.each(data[0], function (key, value) {
                    html += "<td style='min-width: 150px;'>" + key + "</td>";
                });
                html += "</tr>";

                $.each(data, function (key, row) {
                    html += "<tr>";
                    $.each(row, function (key, fieldValue) {

                        html += "<td style='min-width: 150px;'><label title='date field' id=" + key.replace(/\s/g, '') + ">" + fieldValue + "</label></td>";
                    });
                    html += "</tr>";
                });

                $("#btns").css('display', '');
                $('#tbBulkControls').empty();
                $("#tbBulkControls").append(html);
            },
            error: function (data) {
                $('#tbBulkControls').html('Only excel sheet with .xlsx extension is allowed.');
                $("#btns").css('display', 'none');
            }
        });
    }

}
//function readexcelfile() {
//    if (requiredValidator('divFileUpload')) {
//        var formData = new FormData();
//        var opmlFile = $('#docCounterparty')[0];
//        formData.append("opmlFile", opmlFile.files[0]);
//        formData.append("AccountID", localStorage.AccountID);

//        $('#tbBulkControls').html('<img src="../Content/Images/icon/loading.gif"> Loading data from excelsheet...');

//        $.ajax({
//            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/bulk',
//            type: 'POST',
//            data: formData,
//            cache: false,
//            contentType: false,
//            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
//            processData: false,
//            success: function (data) {

//                var html = "<tr id='trdropdown'>";

//                var i = 0;
//                $.each(data[0], function (key, value) {//+ key.replace(/\s/g, '') + "~"
//                    var strFilter = "<select id='ddl" + i + "' onchange='ddlselectchange(this);' class='f_inpt width80' title='field' name='" + key + "' >";
//                    strFilter += "<option value='0'>Select Column</option>";
//                    strFilter += "<option value='Address Line1'>Address Line1</option>";
//                    strFilter += "<option value='Address Line2'>Address Line2</option>";
//                    strFilter += "<option value='City'>City</option>";
//                    strFilter += "<option value='Contact Number'>Contact Number</option>";
//                    strFilter += "<option value='Counterparty Name'>Counterparty Name</option>";
//                    strFilter += "<option value='Counterparty Type'>Counterparty Type</option>";
//                    strFilter += "<option value='Country'>Country</option>";
//                    strFilter += "<option value='Email ID'>Email ID</option>";
//                    strFilter += "<option value='State'>State</option>";
//                    strFilter += "<option value='Status'>Status</option>";
//                    strFilter += "<option value='Zip'>Zip</option>";
//                    html += "<td>" + strFilter + "</td>";
//                    i++;
//                });

//                html += "</tr>";

//                //add header row
//                html += "<tr id='trhead' class='tablehead'>";

//                $.each(data[0], function (key, value) {
//                    html += "<td>" + key + "</td>";
//                });
//                html += "</tr>";

//                $.each(data, function (key, row) {
//                    html += "<tr>";
//                    $.each(row, function (key, fieldValue) {
//                        //html += "<td><input type='text' class='f_inpt width80' title='date field' id='" + key.replace(/\s/g, '') + "' value='" + fieldValue + "'></input></td>";
//                        html += "<td><label title='date field' id=" + key.replace(/\s/g, '') + ">" + fieldValue + "</label></td>";
//                    });
//                    html += "</tr>";
//                });

//                $("#btns").css('display', '');
//                $('#tbBulkControls').empty();
//                $("#tbBulkControls").append(html);
//            },
//            error: function (data) {
//                $('#tbBulkControls').html('.XLSX files should be Upload only');

//                $("#btns").css('display', 'none');
//            }
//        });
//    }
//}
function bulkcounterpartycreate() {

    var contitle = 0;
    var contype = 0;
    var counterpartyName = 0;
    var counterpartyType = 0;

    $('select[title="field"]').each(function () {
        var ddlid = this.id;
        var e = document.getElementById(ddlid);
        var strUser = e.options[e.selectedIndex].text;
        if (strUser == "CounterpartyName") {
            counterpartyName++;
        }
        else if (strUser == "CounterpartyType") {
            counterpartyType++;
        }
    });
    if (requiredValidator('divFileUpload')) {
        if (counterpartyName > 0 && counterpartyName < 2 && counterpartyType > 0 && counterpartyType < 2) {
            if (requiredValidator('tbBulkControls')) {
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
                var formData = new FormData();
                var opmlFile = $('#docCounterparty')[0];
                var contractForm = $("#divFileUpload").serialize();
                contractForm += "&BusinessAreasPath= " + encodeURIComponent(strBusinessAreaOwnerof);
                formData.append("opmlFile", opmlFile.files[0]);
                formData.append("AccountID", localStorage.AccountID);
                formData.append("SearializeControls", contractForm);
                var selectedColumns = "";
                $('#trdropdown td').each(function () {
                    selectedColumns += $(this).find('option:selected').text() + '~';
                });

                var excelColumns = $('#trhead td');

                var oldColumns = "";
                $('#trhead td').each(function () {
                    oldColumns += $(this)[0].textContent + '~';
                });

                formData.append("OldColumns", oldColumns);
                formData.append("NewColumns", selectedColumns);
                formData.append("CurrentUser", localStorage.UserName);

                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/bulkcreate',
                    type: 'POST',
                    data: formData,
                    cache: false,
                    contentType: false,
                    headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                    processData: false,
                    success: function (data) {
                        var control = $("#docCounterparty");
                        control.replaceWith(control.val('').clone(true));

                        BAOwnersselecteditems = [];
                        selectedBusinessAreaID11 = [];
                        selectedBusinessAreaID11Temp = [];
                        $("#txtOwnerofBusinessArea").val('');
                        $("#trcp-RgBusi").hide();
                        $("#txtOwnerofBusinessArea").removeClass("validelement");
                        $("input[type=radio][name=IsGlobal][value='Yes']").prop("checked", true);
                        $("input[name='IsGlobal']").each(function (i) {
                            $(this).attr('disabled', 'disabled');
                        });
                        //alert('Counterparties created successfully.')
                        swal("", "Counterparties creation process started successfully. Counterparties will be up in sometime.");
                        $('#tbBulkControls').html('');
                        $("#btns").css('display', 'none');
                    },
                    error: function (data) {
                        BAOwnersselecteditems = [];
                        selectedBusinessAreaID11 = [];
                        selectedBusinessAreaID11Temp = [];
                        $("#txtOwnerofBusinessArea").val('');
                        $("#trcp-RgBusi").hide();
                        $("#txtOwnerofBusinessArea").removeClass("validelement");
                        $("input[type=radio][name=IsGlobal][value='Yes']").prop("checked", true);
                        $("input[name='IsGlobal']").each(function (i) {
                            $(this).attr('disabled', 'disabled');
                        });
                    }
                });
            }
        }

        else if (counterpartyName == 0 && counterpartyType == 0) {
            swal("", "Please Select Counterparty Name and Counterparty Type");
        }
        else if (counterpartyName > 1 && counterpartyType > 1) {
            swal("", "Please Select Counterparty Name and Counterparty Type");
        }
        else if (counterpartyName == 0) {
            swal("", "Please Select Counterparty Name");
        }
        else if (counterpartyType == 0) {
            swal("", "Please Select Counterparty Type");
        }
        else if (counterpartyName > 1) {
            swal("", "Please Select Counterparty Name");
        }
        else if (counterpartyType > 1) {
            swal("", "Please Select Counterparty Type");
        }
    }
    else {

    }

}

//function bulkcounterpartycreate() {
//    var alertmsg = [];
//    var countername = 0;
//    var countertype = 0;
//    var counterpartystatus = 0;
//    $('select[title="field"]').each(function () {
//        var ddlid = this.id;
//        var e = document.getElementById(ddlid);
//        var strUser = e.options[e.selectedIndex].text;
//        if (strUser == "Counterparty Name") {
//            countername++;
//        }
//        else if (strUser == "Counterparty Type") {
//            countertype++;
//        }
//        else if (strUser == "Status") {
//            counterpartystatus++;
//        }
//    });

//    if (countername > 0 && countername < 2 && countertype > 0 && countertype < 2 && counterpartystatus > 0 && counterpartystatus < 2) {
//        manoj
//        if (requiredValidator('tbBulkControls')) {
//            var formData = new FormData();
//            var opmlFile = $('#docCounterparty')[0];
//            formData.append("opmlFile", opmlFile.files[0]);
//            formData.append("AccountID", localStorage.AccountID);

//            var selectedColumns = "";
//            $('#trdropdown td').each(function () {
//                selectedColumns += $(this).find('option:selected').text() + '~';
//            });

//            var excelColumns = $('#trhead td');

//            var oldColumns = "";
//            $('#trhead td').each(function () {
//                oldColumns += $(this)[0].innerText + '~';
//            });

//            formData.append("OldColumns", oldColumns);
//            formData.append("NewColumns", selectedColumns);
//            formData.append("CurrentUser", localStorage.UserName);

//            $.ajax({
//                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/bulkcreate',
//                type: 'POST',
//                data: formData,
//                cache: false,
//                contentType: false,
//                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
//                processData: false,
//                success: function (data) {
//                    var control = $("#docCounterparty");
//                    control.replaceWith(control.val('').clone(true));

//                    // alert('Counterparties created successfully.')
//                    swal("", "Counterparties created successfully.");
//                    $('#tbBulkControls').html('');
//                    $("#btns").css('display', 'none');
//                },
//                error: function (data) {

//                }
//            });
//        }
//    }
//    else {
//        if (countername == 0) {
//            alertmsg.push("Counterparty Name");
//        }
//        else if (countername > 1) {
//            alertmsg.push("Counterparty Name");
//        }
//        if (countertype == 0) {
//            alertmsg.push("Counterparty Type");
//        }
//        else if (countertype > 1) {
//            alertmsg.push("Counterparty Type");
//        }
//         if (counterpartystatus == 0) {
//            alertmsg.push("Status");
//        }
//        else if (counterpartystatus > 1) {
//            alertmsg.push("Status");
//        }
//         var message = "";
//         for(var f=0;f<alertmsg.length;f++)
//         {
//             if(alertmsg[f]!="")
//             {
//                 if(f==0)
//                 {
//                     message = "Please Select " + alertmsg[f].trim();
//                 }
//                 else if (f == 1 && f == alertmsg.length-1)
//                 {
//                     message += ' and ' + alertmsg[f].trim();
//                 }
//                 else if(f!=alertmsg.length-1)
//                 {
//                     message +=',' + alertmsg[f].trim();
//                 }
//                 else
//                 {
//                     message +=' and ' + alertmsg[f].trim();
//                 }
//             }
//         }
//         message += '.';
//         swal("", message);
//         message = [];
//         alertmsg = [];
//    }
//}

function cancelbulkupload() {
    removeValidations('divFileUpload');
    $("#docCounterparty").replaceWith($("#docCounterparty").val('').clone(true));
    //var control = $("#docCounterparty");
    //control.replaceWith(control.val('').clone(true));
    $('#tbBulkControls').html('');
    $("#btns").css('display', 'none');

    BAOwnersselecteditems = [];
    selectedBusinessAreaID11 = [];
    selectedBusinessAreaID11Temp = [];
    $("#txtOwnerofBusinessArea").val('');
    $("#trcp-RgBusi").hide();
    $("#txtOwnerofBusinessArea").removeClass("validelement");
    $("input[type=radio][name=IsGlobal][value='Yes']").prop("checked", true);
    $("input[name='IsGlobal']").each(function (i) {
        $(this).attr('disabled', 'disabled');
    });
}

function ddlselectchange(obj) {

}

$('#btnCancel').click(function () {
    removeValidations('divFileUpload');
    $("#docCounterparty").replaceWith($("#docCounterparty").val('').clone(true));
    $('#tbBulkControls').html('');
    $("#btns").css('display', 'none');

    BAOwnersselecteditems = [];
    selectedBusinessAreaID11 = [];
    selectedBusinessAreaID11Temp = [];
    $("#txtOwnerofBusinessArea").val('');
    $("#trcp-RgBusi").hide();
    $("#txtOwnerofBusinessArea").removeClass("validelement");
    $("input[type=radio][name=IsGlobal][value='Yes']").prop("checked", true);

    $("input[name='IsGlobal']").each(function (i) {
        $(this).attr('disabled', 'disabled');
    });

});

$('#btnImportCancel').click(function () {
    removeValidations('divFileUpload');
    $("#docCounterparty").replaceWith($("#docCounterparty").val('').clone(true));
    $('#tbBulkControls').html('');
    $("#btns").css('display', 'none');

    BAOwnersselecteditems = [];
    selectedBusinessAreaID11 = [];
    selectedBusinessAreaID11Temp = [];
    $("#txtOwnerofBusinessArea").val('');
    $("#trcp-RgBusi").hide();
    $("#txtOwnerofBusinessArea").removeClass("validelement");
    $("input[type=radio][name=IsGlobal][value='Yes']").prop("checked", true);

    $("input[name='IsGlobal']").each(function (i) {
        $(this).attr('disabled', 'disabled');
    });

});

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
        $("#txtOwnerofBusinessArea").removeClass("validelement");


    }
    else if (this.value == 'No') {
        $("#trcp-RgBusi").show();
        if (thisBusinessAreaName != "")
            addDefaultBusinessareaCounterparty();
        $("#txtOwnerofBusinessArea").addClass("validelement");
    }
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
    var rowKey = obj.parentNode.parentNode.childNodes[1].textContent;
    var parentBusinessAreaID = obj.parentNode.parentNode.childNodes[0].textContent;
    var contractAreaName = obj.parentNode.parentNode.childNodes[2].textContent;
    var contractAreaNameOwner = obj.parentNode.parentNode.childNodes[3].textContent;


    $('#txtBAOwnerofPath').val(parentBusinessAreaID);
    $('#txtBAOwnerof').val(strBusinessAreaName);

    // Find and remove item from an array
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
                $("#example-basic-11").treetable({ expandable: true, initialState: "expanded" },true);


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
        $("#example-basic-11").treetable({ expandable: true, initialState: "expanded" },true);

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
    $("#txtOwnerofBusinessArea").val(thisBusinessAreaName);
}


function Loading_View_trigger() {

}