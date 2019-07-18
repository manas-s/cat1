var strColumns = "";
var businessAreaPath = "";
strColumns += "<option value='0'>Select Column</option>";
var stage = '';
$(document).ready(function () {
    stage = getParameterByName("Stage");
    if (getParameterByName("Stage") == "" || getParameterByName("Stage") == "pipeline") {
        $("#aNavPipeline").addClass('actNav');
        $("#bNavPipeline").removeClass('pipeline_1');
        $("#bNavPipeline").addClass('act-pipeline');
        $("#aNavContracts").removeClass('actNav');
        $("#bNavContracts").addClass('contrac_1');
        $("#bNavContracts").removeClass('act-contrac');
    }
    else {
        $("#aNavPipeline").removeClass('actNav');
        $("#bNavPipeline").addClass('pipeline_1');
        $("#bNavPipeline").removeClass('act-pipeline');
        $("#aNavContracts").addClass('actNav');
        $("#bNavContracts").removeClass('contrac_1');
        $("#bNavContracts").addClass('act-contrac');
    }
    if (typeof localStorage != 'undefined') {
        if (typeof localStorage.GlobalBusinessArea != "undefined" && localStorage.GlobalBusinessArea != "" && localStorage.GlobalBusinessArea != "All") {
            $("#txtBusinessArea").val(localStorage.GlobalBusinessArea);
            $("#viewbusinessarea").css('display', 'none');
            getBusinessAreaDetails(localStorage.GlobalBusinessArea)
        } else {
            $("#viewbusinessarea").css('display', '');
        }
    }
    else {
        $("#viewbusinessarea").css('display', '');
    }
    
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contractfields',
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            var datalenght = data.length;
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];
                if (item.FieldName != "BusinessArea" && item.FieldName!="Status") {
                    strColumns += '<option value="' + item.FieldName + ':' + item.FieldType + '" >' + item.FieldDisplayName + '</option>';
                }
            }

        },
        error: function (data) {

        }
    });

    $("#browseBA").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        height: 600,
        title: "Users",
        dialogClass: "popup_width100",
        modal: true,
        position: {
            my: "center",
            at: "center",
            of: window
        },
        buttons: {
            "OK": function () {
                $("#txtContractTitle").val("");
                $("#txtContractNumber").val("");

                if ($('#liSelectedBA span').length > 0) {
                    $('#txtBARowkey').val(treeBusinessAreaRowKey);
                    $('#txtBAParent').val(treeBusinessAreaParentBusinessAreaID);
                    $('#txtBA').val(treeBusinessAreaName);
                    $('#txtContractAreaName').val(treeBusinessAreaContractAreaName);
                    $('#txtContractAreaAdministrators').val(treeBusinessAreaContractAreaNameOwner);
                    $('#txtBusinessAreaOwners').val(treeBusinessAreaOwner);
                    $('#lblBusinessAreaDescription').text(treeBusinessAreaDescription);
                    getBusinessAreaPathOK(treeBusinessAreaRowKey);
                    var str = $('#txtBA').val();
                    var strReplaced = str.replace(/\,/g, ';');
                    $('#txtBusinessArea').val(strReplaced);                   
                    $(this).dialog("close");
                }
                else {                  
                    swal("", "Select Business Area");
                }
            },
            Cancel: function () {
                $(this).dialog("close");
                $('#liSelectedBA').html('');
                $('#txtBusinessArea').val('');
            }
        }
    });
});

function readexcelfile()
{
    if (requiredValidator('divFileUpload')) {
        var vTime = new Date() + " - ";
        var formData = new FormData();
        var opmlFile = $('#docContract')[0];
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

                var html = "<tr id='trdropdown'>";
                var i = 0;
                $.each(data[0], function (key, value) {
                    var strFilter = "<select id='ddl" + key.replace(/\s/g, '').replace(/&amp;/g, '') + "~" + i + "' onchange='ddlselectchange(this);' class='f_inpt width80' title='field' name='" + key + "' >";
                    strFilter += strColumns;
                    html += "<td>" + strFilter + "</td>";
                    i++;
                });

                html +="</tr>";

                //add header row
                html += "<tr id='trhead' class='tablehead'>";

                $.each(data[0], function (key, value) {
                    html+="<td>" + key + "</td>";
                });
                html+="</tr>";

                $.each(data, function (key, row) {
                    html += "<tr>";
                    $.each(row, function (key, fieldValue) {                   
                        html += "<td><label title='date field' id=" + key.replace(/\s/g, '') + ">" + fieldValue + "</label></td>";
                    });
                    html += "</tr>";
                });
                $("#btns").css('display', '');
                $('#tbBulkControls').empty();
                $("#tbBulkControls").append(html);
                vTime += new Date();                
            },
            error: function (data) {
                $('#tbBulkControls').html('Only excel sheet with .xlsx extension are allowed.');
                $("#btns").css('display', 'none');
            }
        });
    }
}
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
function bulkcontractcreate()
{
    var contitle = 0;
    var contype = 0;
    $('select[title="field"]').each(function () {
        var ddlid = this.id;
        var e = document.getElementById(ddlid);
        var strUser = e.options[e.selectedIndex].value.split(':')[0];
        if (strUser == "ContractTitle")
        {
            contitle++;
        }
        else if (strUser == "ContractType")
        {
            contype++;
        }
    });

    if (contitle > 0 && contitle < 2 && contype > 0 && contype < 2) {
        if (requiredValidator('tbBulkControls')) {
            removeValidations('bulkall');
            $('#imgCreating').css('display', '');
            var contractForm = $("#docContract").serialize();
            contractForm = contractForm.substring(contractForm.indexOf("&") + 1);
            contractForm = contractForm.substring(contractForm.indexOf("&") + 1);
            contractForm += "&BusinessArea= " + $("#txtBusinessArea").val().trim();
            contractForm += "&ContractArea=" + $("#txtContractAreaName").val().trim();
            contractForm += "&ContractAreaAdministrators=" + $("#txtContractAreaAdministrators").val().trim();
            contractForm += "&BusinessAreaOwners=" + $("#txtBusinessAreaOwners").val().trim();
            contractForm += "&BusinessAreaPath=" + businessAreaPath;
            contractForm += "&ContractManagers=" + localStorage.UserName;
            contractForm += "&Status=Signed";
            var formData = new FormData();
            formData.append("AccountID", localStorage.AccountID);
            formData.append("SearializeControls", contractForm);
            formData.append("CurrentUser", localStorage.UserName);

            var opmlFile = $('#docContract')[0];
            formData.append("opmlFile", opmlFile.files[0]);

            var selectedColumns = "";
            $('#trdropdown td').each(function () {
                selectedColumns += $(this).find('option:selected').val() + '~';
            });

            var excelColumns = $('#trhead td');

            var oldColumns = "";
            $('#trhead td').each(function () {
                oldColumns += $(this)[0].textContent + '~';
            });

            formData.append("OldColumns", oldColumns);
            formData.append("NewColumns", selectedColumns);

            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/bulkcreate',
                type: 'POST',
                data: formData,
                cache: false,
                contentType: false,
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, Stage: stage },
                processData: false,
                success: function (data) {
                    var control = $("#docContract");
                    control.replaceWith(control.val('').clone(true));
                    swal("", "Contract(s) creation process started successfully. Contracts will be up in sometime.");
                    $('#tbBulkControls').html('');
                    $("#btns").css('display', 'none');
                    $('#imgCreating').css('display', 'none');
                },
                error: function (data) {
                    $('#imgCreating').css('display', 'none');
                }
            });
        }
    }
    else if (contitle == 0 && contype==0)
    {
        swal("", "Please Select Contract Record Type and Contract Record Title")
    }
    else if (contitle > 1 && contype>1)
    {
        swal("", "Please Select Contract Record Type and Contract Record Title")
    }
    else if(contitle==0)
    {
        swal("", "Please Select Contract Record Title")
    }
    else if(contype==0)
    {
        swal("", "Please Select Contract Record Type")
    }
    else if (contitle > 1)
    {
        swal("", "Please Select Contract Record Title")
    }
    else if (contype > 1) {
        swal("", "Please Select Contract Record Type")
    }
}

function ddlselectchange(obj) {
    var fieldtype = obj.value.split(/[~]+/).pop();
    var tdvalue1 = obj.id.split(/[~]+/).pop();

    var tdvalue = parseInt(tdvalue1) + 1;
    if (fieldtype == "Date") {
        $('[id^=' + $('#trhead td:nth-child(' + tdvalue + ')')[0].textContent.replace(/ /g, '') + ']').addClass('validelement');
        $('[id^=' + $('#trhead td:nth-child(' + tdvalue + ')')[0].textContent.replace(/ /g, '') + ']').addClass('validdate');
    } else {
        $('[id^=' + $('#trhead td:nth-child(' + tdvalue + ')')[0].textContent.replace(/ /g, '') + ']').removeClass('validelement');
        $('[id^=' + $('#trhead td:nth-child(' + tdvalue + ')')[0].textContent.replace(/ /g, '') + ']').removeClass('validdate');
    }
}

$('#btnCancel').click(function () {
    removeValidations('bulkall');
    $("#docContract").replaceWith($("#docContract").val('').clone(true));
    $('#txtBusinessArea').val('');
    $('#tbBulkControls').html('');
    $("#btns").css('display', 'none');

});

$('#btnImportCancel').click(function () {
    removeValidations('bulkall');
    $("#docContract").replaceWith($("#docContract").val('').clone(true));

    $('#tbBulkControls').html('');
    $("#btns").css('display', 'none');
    $('#liSelectedBA').html('');
    if (typeof localStorage.GlobalBusinessArea != "undefined" && localStorage.GlobalBusinessArea != "" && localStorage.GlobalBusinessArea != "All") {

    }
    else {
        $('#txtBusinessArea').val('');
    }

});


function ViewBusinessAreaBulk() {
    $('#txtBARowkey').val("");
    $('#txtBAParent').val("");
    $('#txtBA').val("");
    $('#txtContractAreaName').val("");
    $('#txtContractAreaAdministrators').val("");
    $('#txtBusinessAreaOwners').val("");
    $('#lblBusinessAreaDescription').text("");

    if ($('#tbodyBusinessArea12 tr').length == 0) {
        BindBusinessArea()
    } else {
        $("#browseBA").dialog("option", "title", "Business Area Picker");
        $("#browseBA").dialog("open");
        $("#browseBA").height("auto");
    }
}

var article1 = "";
var selecteditems12 = [];
var BusinessAreaAccess12 = localStorage.BusinessAreaAccess;

function BindBusinessArea() {
    $("#loadingPage").fadeIn();   
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/entities',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            getbusinessareapath();
            recursiveIteration12(data)
            $("#tbodyBusinessArea12").append(article1);
            article1 = "";
            $("#example-basic-12").treetable({ expandable: true, initialState: "expanded" }, true);

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

var strContractAreaName12 = "";
var strContractAreaName12Owner = "";
var previousidcreate = "";
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
            return (n.indexOf(spath) == 0);
        });
        if (found.length > 0 || localStorage.UserType.indexOf("Global Contract Owner") >= 0 || item.RowKey == "GenCA" || item.RowKey == "GenBA") {
            //var j = BusinessAreaAccess12.indexOf(item.BusinessAreaName);
            var j = BusinessAreaAccessID.indexOf(item.RowKey);
            if (j > -1 || item.Owner.trim().split(';').indexOf(localStorage.UserName.trim()) > -1) {
                if (item.ParentBusinessAreaID != 0) {
                    if (item.Owner.trim().split(';').indexOf(localStorage.UserName.trim()) > -1) {//if business owner
                        additional = '<span style="color:#3487ce; cursor:pointer;" onclick="javascript:treeviewclick1(this)">' + item.BusinessAreaName + '</span>&nbsp; <img src="/Content/Images/icon/profile.png" style="cursor:default;" />'
                    } else { //if permission in business area
                        additional = '<span style="color:#3487ce; cursor:pointer;" onclick="javascript:treeviewclick1(this)">' + item.BusinessAreaName + '</span>'
                    }
                } else {
                    additional = '<span>' + item.BusinessAreaName + '</span>';
                }

            } else {
                if (item.ParentBusinessAreaID != 0) {
                    if (strContractAreaID == "GenCA") {
                        additional = '<span style="color:#3487ce; cursor:pointer;" onclick="javascript:treeviewclick1(this)">' + item.BusinessAreaName + '</span>'
                    } else {
                        if (localStorage.UserType.indexOf("Global Contract Owner") >= 0) {
                            additional = '<span style="color:#3487ce; cursor:pointer;" onclick="javascript:treeviewclick1(this)">' + item.BusinessAreaName + '</span>'
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

function treeviewclick1(obj) {
    treeBusinessAreaName = obj.textContent;
    treeBusinessAreaRowKey = obj.parentNode.parentNode.childNodes[2].textContent;
    treeBusinessAreaParentBusinessAreaID = obj.parentNode.parentNode.childNodes[1].textContent;
    treeBusinessAreaContractAreaName = obj.parentNode.parentNode.childNodes[3].textContent;
    treeBusinessAreaContractAreaNameOwner = obj.parentNode.parentNode.childNodes[4].textContent;
    treeBusinessAreaOwner = obj.parentNode.parentNode.childNodes[5].textContent;
    treeBusinessAreaDescription = obj.parentNode.parentNode.childNodes[6].textContent;

    $('#liSelectedBA').html('<span style="font-size:13px;">' + treeBusinessAreaName + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveSelected(this);" style="float:right" /></span>');
}

function liRemoveSelected(obj) {

    var child = obj.parentNode;

    var i = selecteditems12.indexOf(child.firstChild.nodeValue);
    if (i != -1) {
        selecteditems12.splice(i, 1);
    }
    child.parentNode.removeChild(child);
    $('#txtBA').val(selecteditems12);
}

function getBusinessAreaPathOK(treeBusinessAreaRowKey) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/businessarealocation?businessareaid=' + treeBusinessAreaRowKey,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (fullhierarchy) {
            businessAreaPath = fullhierarchy;
            var contractareaname = "";
            contractareaname = businessAreaPath.split('>')[0];
            contractareaname = contractareaname.trim();
            //get contract area details
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/contractareadetailsbyname?contractareaname=' + encodeURIComponent(contractareaname),
                type: 'GET',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey },
                success: function (contractareadata) {
                    $('#txtContractAreaName').val(contractareadata.BusinessAreaName);
                    $('#txtContractAreaAdministrators').val(contractareadata.Owner);
                },
                error: function (fullhierarchy) {

                }
            });
        },
        error: function (fullhierarchy) {

        }
    });
}

function getBusinessAreaDetails(businessareaname) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/detailsbyname?businessareaname=' + encodeURIComponent(businessareaname),
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            getBusinessAreaPathOK(data.RowKey);
            $('#txtBARowkey').val(data.RowKey);
            $('#txtBAParent').val(data.ParentBusinessAreaID);
            $('#txtBA').val(businessareaname);
            $('#txtBusinessAreaOwners').val(data.Owner);
            $('#lblBusinessAreaDescription').text(data.Description);
        },
        error:
            function (data) {
                
            }
    });
}



function Loading_View_trigger() {

}