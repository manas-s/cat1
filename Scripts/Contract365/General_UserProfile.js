

var currentUser = "";

$(document).ready(function () {

    BindUserDetail();
    BindDropdown();
    GetUserList();

    $("#dvUpdateUserDetail").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        height: "auto",
        title: "Edit Profile",
        modal: true,
        buttons: {
            "Save": function () {
                if ($('#imageUploder').val() != "") {
                    UploadProfilePicture();
                }
                else {
                    UpdateUser();
                }
            },
            Cancel: function () { $(this).dialog("close"); }
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

                if ($('#liSelectedBA span').length > 0) {
                    $('#txtBARowkey').val(treeBusinessAreaRowKey);
                    $('#txtBAParent').val(treeBusinessAreaParentBusinessAreaID);
                    $('#txtBA').val(treeBusinessAreaName);
                    $('#txtContractAreaName').val(treeBusinessAreaContractAreaName);
                    $('#txtContractAreaAdministrators').val(treeBusinessAreaContractAreaNameOwner);
                    $('#txtBusinessAreaOwners').val(treeBusinessAreaOwner);

                    $.ajax({
                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/businessarealocation?businessareaid=' + treeBusinessAreaRowKey,
                        type: 'GET',
                        dataType: 'json',
                        async: false,
                        headers: { 'eContracts-ApiKey': localStorage.APIKey },
                        success: function (fullhierarchy) {
                            businessAreaPath = fullhierarchy;
                        },
                        error: function (fullhierarchy) {

                        }
                    });
                    var str = $('#txtBA').val();
                    var strReplaced = str.replace(/\,/g, ';');
                    $('#txtBusinessArea').val(strReplaced);

                    $(this).dialog("close");
                }
                else {

                    $('#txtBARowkey').val('');
                    $('#txtBAParent').val('');
                    $('#txtBA').val('');
                    $('#txtContractAreaName').val('');
                    $('#txtContractAreaAdministrators').val('');
                    $('#txtBusinessAreaOwners').val('');
                    businessAreaPath = '';
                    var str = $('#txtBA').val();
                    $('#txtBusinessArea').val('');

                    $(this).dialog("close");
                }
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $("#dvViewHierarchy").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "Reports To",
        modal: true,
        buttons: {
            close: function () {
                $(this).dialog("close");
            }
        }
    });

    var vAccFeat = "";
    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
    vAccFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "38" && n.Status == "ON");
    });
    if (vAccFeat.length > 0) {
        $(".FL_esacalation").css('display', '');
    }
    else {
        $(".FL_esacalation").css('display', 'none');
    }
});

function BindDropdown() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/countrynames',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            $("#ddlCountry").append('<option value=0 selected=true>--Select--</option>');
            $(data).each(function (i, item) {
                $("#ddlCountry").append('<option value=' + item + '>' + item + '</option>');
            });
        },
        error: function () {

        }
    });
}

function ViewBusinessArea() {
    $('#txtBARowkey').val("");
    $('#txtBAParent').val("");
    $('#txtBA').val("");
    $("#browseBA").dialog("option", "title", "Browse Business Area");
    $("#browseBA").dialog("open");
    $("#browseBA").height("auto");
}

function BindUserDetail() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/users?userid=' + localStorage.UserID + '&office365emailid=',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (entity) {
            var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
            var vAccFeat = $.grep(veContractFeatures, function (n, i) {
                return (n.RowKey == "38" && n.Status == "ON");
            });

            currentUser = entity;
            if (entity.UserType.indexOf('Contract Area Administrator') >= 0) {
                getContractAreasOfUser(entity.UserName)
            } else {
                $("#tdContractArea").parent().hide();
                //$("#tdContractArea").html('Not Available')
            }

            if (entity.UserName != "") {
                $("#tdUserName").html(entity.UserName);
            }
            else {
                $("#tdUserName").html('-');
            }
            if (entity.O365EmailID != "") {
                $("#tdLoginEmailID").html(entity.O365EmailID);
            }
            else {
                $("#tdLoginEmailID").html('-');
            }

            var vAddress = '';
            if (entity.AddressLine1 != "")
                vAddress += entity.AddressLine1 + ', ';
            if (entity.AddressLine2 != "") {
                if (vAddress == "")
                    vAddress = entity.AddressLine2;
                else
                    vAddress += entity.AddressLine2 + ', ';
            }
            if (entity.City != "") {
                if (vAddress == "")
                    vAddress = entity.City;
                else
                    vAddress += entity.City + ', ';
            }
            if (entity.Country != "" && entity.Country != "--Select--") {
                if (vAddress == "")
                    vAddress = entity.Country;
                else
                    vAddress += entity.Country + ', ';
            }
            if (vAddress != "") {
                $("#tdAddress").html(vAddress);
            }
            else {
                $("#tdAddress").html('-');
            }
            if (entity.ProfilePicture != null && entity.ProfilePicture != "") {
                $("#imgUser").attr('src', entity.ProfilePicture);
                $("#imgProfile").attr('src', entity.ProfilePicture);
                $("#imgProfileLogo").attr('src', entity.ProfilePicture);
                $('.profile_1').html('<img src="' + entity.ProfilePicture + '" style="height: 20px; width: 20px; padding-right: 10px;" />');
            }
            else if (entity.ProfilePicture == null || entity.ProfilePicture == "") {
                $("#imgUser").attr('src', "/Content/Images/my-proffil.png");
                $("#imgProfile").attr('src', "/Content/Images/my-proffil.png");
                $("#imgProfileLogo").attr('src', "/Content/Images/my-proffil-logo.png");
            }
            if (entity.EmailID != null && entity.EmailID != "") {
                $("#tdEmailID").html(entity.EmailID);
            }
            else {
                $("#tdEmailID").html('-');
            }

            if (entity.PhoneNo1 != null && entity.PhoneNo1 != "") {
                $("#tdPhoneNo1").html(entity.PhoneNo1);
            }
            else {
                $("#tdPhoneNo1").html('-');
            }
            if (entity.PhoneNo2 != null && entity.PhoneNo2 != "") {
                $("#tdPhoneNo2").html(entity.PhoneNo2);
            }
            else {
                $("#tdPhoneNo2").html('-');
            }

            if (typeof (entity.JobDescription) != "undefined" && entity.JobDescription != null && entity.JobDescription != "") {
                $("#tdJobTitle").html(entity.JobDescription);
            }
            else {
                $("#tdJobTitle").html('-');
            }

            if (typeof (entity.Department) != "undefined" && entity.Department != null && entity.Department != "") {
                $("#tdDepartment").html(entity.Department);
            }
            else {
                $("#tdDepartment").html('-');
            }
            $('#btnViewReportingHierarchy').css('display', 'none');
            if (vAccFeat.length > 0) {
                if (typeof (entity.MyManager) != "undefined" && entity.MyManager != null && entity.MyManager != "") {
                    var userDisable = '';
                    var usertitle = '';
                    if (entity.IsManagerAvailable == "No") {
                        userDisable = ' disabled_item_link';
                        usertitle = 'title="This user is no longer available."';
                    }
                    var vUsers = '<a href="javascript:void(0);" onclick="ViewUserProfile(\'' + escape(entity.MyManager.trim()) + '\')" class="Link_UserProfile' + userDisable + '" ' + usertitle + '>' + entity.MyManager.trim() + '</a>';
                    $("#tdMyManager").html(vUsers);

                    if (entity.ReportToManager != '') {
                        if ($(entity.ReportToManager).find('Level').length > 0) {
                            $('#btnViewReportingHierarchy').css('display', '');
                        }
                    }
                }
                else {
                    $("#tdMyManager").html('-');
                }
            }
            else
            {
                if (typeof (entity.MyManager) != "undefined" && entity.MyManager != null && entity.MyManager != "") {
                    var userDisable = '';
                    var usertitle = '';
                    if (entity.IsManagerAvailable == "No") {
                        userDisable = ' disabled_item_link';
                        usertitle = 'title="This user is no longer available."';
                    }
                    var vUsers = '<a href="javascript:void(0);" onclick="ViewUserProfile(\'' + escape(entity.MyManager.trim()) + '\')" style="display:none" class="Link_UserProfile' + userDisable + '" ' + usertitle + '>' + entity.MyManager.trim() + '</a>';
                    $("#tdMyManager").html(vUsers);

                    if (entity.ReportToManager != '') {
                        if ($(entity.ReportToManager).find('Level').length > 0) {
                            $('#btnViewReportingHierarchy').css('display', 'none');
                        }
                    }
                }
                
            }


            if (entity.OutOfOffice != null && entity.OutOfOffice != "") {
                $("#tdOutOfOffice").html(entity.OutOfOffice);
            }
            else {
                $("#tdOutOfOffice").html('-');
            }

            if (entity.DelegateTo != null && entity.DelegateTo != "") {
                $("#tdDelegateTo").html(entity.DelegateTo);
            }
            else {
                $("#tdDelegateTo").html('-');
            }
            //*Harshitha
            if (entity.UserRoleSetting != null && entity.UserRoleSetting != "") {
                $("#tdUserRole").html(entity.UserRoleSetting);
            }
            else {
                $("#tdUserRole").parent().hide();
                //$("#tdUserRole").html('Not Available');
            }
            //Prabhakar Jan 15 2015
            if (entity.UserType != null && entity.UserType != "") {
                $("#tdUserType").html(entity.UserType);
            }
            else {
                $("#tdUserType").html('Not Available');
            }
            var businessAreaArr = [];
            if (entity.OwnerOfBusinessAreas != "") {
                businessAreaArr = entity.OwnerOfBusinessAreas.split(";");
                var reslength = businessAreaArr.length;
                var vBusinessArea = '';
                for (var i = 0; i < reslength; i++) {
                    if (businessAreaArr[i].trim() != "") {
                        if (vBusinessArea == '')
                            vBusinessArea = businessAreaArr[i].trim();
                        else
                            vBusinessArea += '<br/>' + businessAreaArr[i].trim();
                    }
                }
                $("#tdOwnershipBusinessArea").html(vBusinessArea);
            }
            else
                $("#tdOwnershipBusinessArea").parent().hide();
            //$("#tdOwnershipBusinessArea").html('Not Available')
            if (entity.BusinessArea != "") {
                businessAreaArr = entity.BusinessArea.split(";");
                var reslength = businessAreaArr.length;
                var vBusinessArea = '';
                for (var i = 0; i < reslength; i++) {
                    if (businessAreaArr[i].trim() != "") {
                        if (vBusinessArea == '')
                            vBusinessArea = businessAreaArr[i].trim();
                        else
                            vBusinessArea += '<br/>' + businessAreaArr[i].trim();
                    }
                }
                $("#tdfullCtrlBusinessArea").html(vBusinessArea);
            }
            else
                $("#tdfullCtrlBusinessArea").parent().hide();
            // $("#tdfullCtrlBusinessArea").html('Not Available')
            if (entity.BusinessAreaContribute != "") {
                businessAreaArr = entity.BusinessAreaContribute.split(";");
                var reslength = businessAreaArr.length;
                var vBusinessArea = '';
                for (var i = 0; i < reslength; i++) {
                    if (businessAreaArr[i].trim() != "") {
                        if (vBusinessArea == '')
                            vBusinessArea = businessAreaArr[i].trim();
                        else
                            vBusinessArea += '<br/>' + businessAreaArr[i].trim();
                    }
                }
                $("#tdContributeBusinessArea").html(vBusinessArea);
            }
            else
                $("#tdContributeBusinessArea").parent().hide();
            //$("#tdContributeBusinessArea").html('Not Available')
            if (entity.BusinessAreaRead != "") {
                businessAreaArr = entity.BusinessAreaRead.split(";");
                var reslength = businessAreaArr.length;
                var vBusinessArea = '';
                for (var i = 0; i < reslength; i++) {
                    if (businessAreaArr[i].trim() != "") {
                        if (vBusinessArea == '')
                            vBusinessArea = businessAreaArr[i].trim();
                        else
                            vBusinessArea += '<br/>' + businessAreaArr[i].trim();
                    }
                }
                $("#tdReadBusinessArea").html(vBusinessArea);
            }
            else
                $("#tdReadBusinessArea").parent().hide();
            if (entity.DefaultBusinessArea != "") {
                $("#tdDefaultBusinessArea").html(entity.DefaultBusinessArea);
                $("#rdBusinessAreaMetrics").attr('disabled', false);
                $("#rdBusinessAreaDashboard").attr('disabled', false);
            }
            else {
                $("#tdDefaultBusinessArea").html('Not Available');
                $("#rdBusinessAreaMetrics").attr('disabled', true);
                $("#rdBusinessAreaDashboard").attr('disabled', true);
            }

            if (entity.LandingPage != "")
                $("#tdMyLandingpage").html(entity.LandingPage);
            else
                $("#tdDefaultBusinessArea").parent().hide();


            businessAreaPath = entity.DefaultBusinessArea;
            //Prabhakar


            $("#txtUserID").val(entity.RowKey);
            $("#txtUserName").val(entity.UserName);
            $("#txtAddress1").val(entity.AddressLine1);
            $("#txtAddress2").val(entity.AddressLine2);
            $("#txtCity").val(entity.City);
            $("#ddlCountry option").filter(function (index) { return $(this).text() === entity.Country; }).prop('selected', true);
            $("#txtEmailID").val(entity.EmailID);
            $("#txtPhoneNo1").val(entity.PhoneNo1);
            $("#txtPhoneNo2").val(entity.PhoneNo2);
            $('input:radio[name=Landingpage]').filter('[value="' + entity.LandingPage + '"]').prop('checked', true);
            if (entity.OutOfOffice == "Yes") {
                $("input:radio[name=OutOfOffice][value='Yes']").attr('checked', 'checked');
                $("#ddlDelegateTo option").filter(function (index) { return $(this).text() === entity.DelegateTo; }).prop('selected', true);
                $("#liDelegateTo").css("display", "");
                $("#ddlDelegateTo").addClass('validelement');
            }
            else {
                $("input:radio[name=OutOfOffice][value='No']").attr('checked', 'checked');
                $("#liDelegateTo").css("display", "none");
                $("#ddlDelegateTo").removeClass('validelement');
            }
            if (businessAreaPath != '') {
                var vDBAarr = businessAreaPath.split('>');
                $('#txtBusinessArea').val(vDBAarr.slice(-1)[0].trim());
            }
            else
                $('#txtBusinessArea').val('');
        },
        error:
            function (data) {
            }
    });
}


function getContractAreasOfUser(username) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/contractareas',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            var v = "";
            $(data).each(function (i, item) {
                if (item.Owner.indexOf(username) > -1) {
                    if (item.RowKey == "GenCA" || item.BusinessAreaName == "Business Area") {
                    } else { v += item.BusinessAreaName + ';'; }
                }
            });
            if (v != "") { v = v.slice(0, -1) }

            $("#tdContractArea").html(v)
        },
        error: function (data) {
            var vv = '';
        }
    });
}

function OpenEditProfile() {
    businessAreaPath = currentUser.DefaultBusinessArea;
    if (currentUser.ProfilePicture != null && currentUser.ProfilePicture != "") {
        $("#imgUser").attr('src', currentUser.ProfilePicture);
        $("#imgProfile").attr('src', currentUser.ProfilePicture);
        $("#imgProfileLogo").attr('src', currentUser.ProfilePicture);
        $('.profile_1').html('<img src="' + currentUser.ProfilePicture + '" style="height: 20px; width: 20px; padding-right: 10px;" />');
    }
    else if (currentUser.ProfilePicture == null || currentUser.ProfilePicture == "") {
        $("#imgUser").attr('src', "/Content/Images/my-proffil.png");
        $("#imgProfile").attr('src', "/Content/Images/my-proffil.png");
        $("#imgProfileLogo").attr('src', "/Content/Images/my-proffil-logo.png");
    }

    $("#txtUserID").val(currentUser.RowKey);
    $("#txtUserName").val(currentUser.UserName);
    $("#txtAddress1").val(currentUser.AddressLine1);
    $("#txtAddress2").val(currentUser.AddressLine2);
    $("#txtCity").val(currentUser.City);
    $("#ddlCountry option").filter(function (index) { return $(this).text() === currentUser.Country; }).prop('selected', true);
    $("#txtEmailID").val(currentUser.EmailID);
    $("#txtPhoneNo1").val(currentUser.PhoneNo1);
    $("#txtPhoneNo2").val(currentUser.PhoneNo2);
    if (currentUser.OutOfOffice == "Yes") {
        $("input:radio[name=OutOfOffice][value='Yes']").prop('checked', 'checked');
        $("#ddlDelegateTo option").filter(function (index) { return $(this).text() === currentUser.DelegateTo; }).prop('selected', true);
        $("#liDelegateTo").css("display", "");
        $("#ddlDelegateTo").addClass('validelement');
    }
    else {
        $("input:radio[name=OutOfOffice][value='No']").prop('checked', 'checked');
        $("#liDelegateTo").css("display", "none");
        $("#ddlDelegateTo").removeClass('validelement');
    }
    if (businessAreaPath != '') {
        var vDBAarr = businessAreaPath.split('>');
        $('#txtBusinessArea').val(vDBAarr.slice(-1)[0].trim());
    }
    else
        $('#txtBusinessArea').val('');


    $("#dvUpdateUserDetail").dialog("open");
    $("#dvUpdateUserDetail").height("auto");

}

function GetUserList() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/users',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (dataUser) {
            var vUserList = '';
            vUserList += '<option value="0"></option>';
            $(dataUser).each(function (i, item) {
                var sRowKey = item.RowKey;
                var sUserName = item.UserName;
                if (localStorage.UserName != sUserName)
                    vUserList += '<option value="' + sUserName + '">' + sUserName + '</option>';
            });
            $("#ddlDelegateTo").append(vUserList);
        },
        error:
            function (dataUser) {
            }
    });
}

function UpdateUser() {

    var PrifilePic = "";
    if ($("#hdnProfileURI").val() != "") {
        PrifilePic = $("#hdnProfileURI").val();
    }
    if (requiredValidator('dvUpdateUserDetail', false)) {
        var vOutOfOffice = $('input:radio[name=OutOfOffice]:checked').val();
        var vDelegateTo = "";
        if (vOutOfOffice == "Yes")
            vDelegateTo = $("#ddlDelegateTo").find('option:selected').text();
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/users?userid=' + $("#txtUserID").val(),
            type: 'PUT',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
            data: {
                RowKey: $("#txtUserID").val(),
                UserName: $("#txtUserName").val(),
                AddressLine1: $("#txtAddress1").val(),
                AddressLine2: $("#txtAddress2").val(),
                City: $("#txtCity").val(),
                Country: $("#ddlCountry").find('option:selected').text(),
                EmailID: $("#txtEmailID").val(),
                PhoneNo1: $("#txtPhoneNo1").val(),
                PhoneNo2: $("#txtPhoneNo2").val(),
                OutOfOffice: vOutOfOffice,
                DefaultBusinessArea: businessAreaPath,
                DelegateTo: vDelegateTo,
                ModifiedBy: localStorage.UserName,
                ProfilePicture: PrifilePic,
                LandingPage: $("input[name=Landingpage]:checked").val()
            },
            cache: false,
            success: function (status) {
                BindUserDetail();
                $("#dvUpdateUserDetail").dialog("close");
            }
        });
    }
}

function OutOfOffice(obj) {
    if (obj.value == "Yes") {
        $('#liDelegateTo').css('display', '');
        $("#ddlDelegateTo").addClass('validelement');
    } else {
        $('#liDelegateTo').css('display', 'none');
        $("#ddlDelegateTo").removeClass("error");
        $("#ddlDelegateTo").removeClass('validelement');
        $("#ddlDelegateTo").val('0');
    }
}



function ViewBusinessArea() {
    $('#txtBARowkey').val("");
    $('#txtBAParent').val("");
    $('#txtBA').val("");
    $('#txtContractAreaName').val("");
    $('#txtContractAreaAdministrators').val("");
    $('#txtBusinessAreaOwners').val("");

    var txtvalue = $('#txtBusinessArea').val();
    if (txtvalue == "" || txtvalue == null) {
        $('#liSelectedBA').empty();
    }
    else {
        $('#liSelectedBA').html('<span style="font-size:11px;">' + txtvalue + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveSelected(this);" style="float:right" /></span>');
    }



    if ($('#tbodyBusinessArea12 tr').length == 0) {
        BindBusinessArea()
    } else {
        $("#browseBA").dialog("option", "title", "Business Area Picker");
        $("#browseBA").dialog("open");
        $("#browseBA").height("auto");
    }
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

function treeviewclick1(obj) {
    treeBusinessAreaName = obj.textContent;
    treeBusinessAreaRowKey = obj.parentNode.parentNode.childNodes[2].textContent;
    treeBusinessAreaParentBusinessAreaID = obj.parentNode.parentNode.childNodes[1].textContent;
    treeBusinessAreaContractAreaName = obj.parentNode.parentNode.childNodes[3].textContent;
    treeBusinessAreaContractAreaNameOwner = obj.parentNode.parentNode.childNodes[4].textContent;
    treeBusinessAreaOwner = obj.parentNode.parentNode.childNodes[5].textContent;


    $('#liSelectedBA').html('<span style="font-size:11px;">' + treeBusinessAreaName + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveSelected(this);" style="float:right" /></span>');
}



function UploadProfilePicture() {

    var formData = new FormData();
    var opmlFile = $('#imageUploder')[0];
    var ext = opmlFile.files[0].type;
    var extension = ext.split('/')[1];
    if (opmlFile.size > 1000141) {

        swal("", "File size is greater than 1MB");
    }
    else {
        formData.append("opmlFile", opmlFile.files[0]);
        formData.append("AccountID", localStorage.AccountID);
        formData.append("CurrentUser", localStorage.UserID);

        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/importProfilePicture?FileExt=' + extension,
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
            success: function (data) {
                $("#hdnProfileURI").val(data);
                UpdateUser();
            }

        });

    }

}

function previewFile() {

    var formData = new FormData();
    var opmlFile = $('#imageUploder')[0];
    var filePath = $('#imageUploder').val();
    var ext = opmlFile.src;
    var preview = document.querySelector('#imgUser');
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();

    reader.onloadend = function () {
        preview.src = reader.result;
    }
    $("#imgUser").attr("src", filePath)
    if (file) {
        reader.readAsDataURL(file);
    } else {
        preview.src = "";
    }
}

function Loading_View_trigger() {

}

$("#btnViewReportingHierarchy").click(function () {
    $('#tblviewHierarchy').empty();
    var ReporToManagerXml = currentUser.ReportToManager
    if (ReporToManagerXml != '') {
        var row = '<tr>'
        $(ReporToManagerXml).find('Level').each(function (index, val) {
            row += '<td style="padding:5px;">' + 'Level ' + $(val).find('Id').text() + ":" + '</td>';
            row += '<td style="padding:5px;">' + $(val).find('UserIdName').text().split('-')[1] + '</td>';
            row += '</tr>';
        })
        $('#tblviewHierarchy').append(row);
        $('#dvViewHierarchy').dialog('open');
    }


});