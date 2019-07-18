
$(document).ready(function () {
    //manoj
    $("#limydashboard").css("display", "");
    $("#liGenaralBusinessArea").css("display", "none");
    //manoj
    getSettings();
    BindContractTermTypeddl();
});

var vEdit = "";
var vContractAutoNumberEnabled = false;

function fnCheckBusinessAreaNameExists(vBusinessAreaName, vContractAreaName) {
    var vExists = true;
    $.ajax({

        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/checkareanameexists/?vBusinessAreaName=' + vBusinessAreaName + '&vContractAreaName=' + vContractAreaName,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        async: false,
        success: function (data) {
            vExists = data;
        },
        error: function (data) {
            vExists = false;
        }

    });
    return vExists;
}

function ContractAreaNameChange(GroupNo) {
    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
    var vAccFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "14" && n.Status == "ON");
    });
    if ($('#titleMain').html() == 'Contract Area Name' && $("#txtAction").val() != "Edit" && vAccFeat.length > 0) {
        if ($("#txtBusinessAreaName").val().trim() != '') {
            var librarynametrim = $("#txtBusinessAreaName").val();
            librarynametrim = librarynametrim.replace(/~/g, '');
            var lengthlibname = librarynametrim.length;
            if (lengthlibname > 31) {
                librarynametrim = librarynametrim.substr(0, 31);
                $("#txtDocLibName").val(librarynametrim.replace(/[\*\|\,\"\:\<\>\[\}\{\}\'\^\(\)\&\@\$\#\%\.\-\!]/g, '').replace(/\//g, '').replace(/\s\s+/g, " ") + ' Contract Documents');
            }
            else {
                $("#txtDocLibName").val(librarynametrim.replace(/[\*\|\,\"\:\<\>\[\}\{\}\'\^\(\)\&\@\$\#\%\.\-\!]/g, '').replace(/\//g, '').replace(/\s\s+/g, " ") + ' Contract Documents');
            }
        }
    }
}


function addupdateBusinessArea() {
    if (requiredValidator("dialogEdit", false)) {
        $("#loadingPage").fadeIn();

        var DocLibraryName = "";
        if ($("input:radio[name=docArea]:checked").val() == "ContractArea")
            DocLibraryName = $('#txtDocLibName').val().replace(/[\*\|\,\"\:\<\>\[\}\{\}\'\^\(\)\&\@\$\#\%\.\-\!]/g, '').replace(/\//g, '').replace(/\s\s+/g, " ");

        if ($("#txtAction").val() == "Edit") {
            var txtBusinessAreaName = $("#txtBusinessAreaName").val().trim();
            var txtLegalEntity = $("#txtLegalEntity").val().trim(); // Added for bug (eO37116)
            var txtBusinessAreaNameAbbreviation = $("#txtBusinessAreaNameAbbreviation").val();
            var hdntxtContractAreaName = $("#hdntxtContractAreaName").val();
            var txtBusinessAreaOwner = '';
            var sbusinessAreaowners = [];
            var bao = '';
            $("#ddlBusinessAreaOwner option:selected").each(function () {
                if (bao == '') {
                    bao = $(this).text();
                }
                else {
                    bao += ";" + $(this).text();
                }
            });
            if (bao != '')
                sbusinessAreaowners = bao.split(';');

            if (bao == '')
                txtBusinessAreaOwner = 'Not Assigned';
            else
                txtBusinessAreaOwner = bao;

            //if ($("#hdntxtBusinessAreaOwner").val() != txtBusinessAreaOwner) { //if business area owner is changed

            //    if (txtBusinessAreaOwner == 'Not Assigned') { //removed all Owner
            //        var alluser = $("#hdntxtBusinessAreaOwner").val().split(';');
            //        for (var i = 0; i < alluser.length; i++) {
            //            removebusinessareapath(alluser[i])
            //        }
            //    } else {
            //        var array1 = []
            //        if ($("#hdntxtBusinessAreaOwner").val() != 'Not Assigned') {
            //            array1 = $("#hdntxtBusinessAreaOwner").val().split(';');
            //        }
            //        var array2 = sbusinessAreaowners;
            //        var addedUsers = [];
            //        var i = 0;
            //        $.grep(array2, function (el) { if ($.inArray(el, array1) == -1) addedUsers.push(el); i++; });

            //        var removedUsers = [];
            //        var i = 0;
            //        $.grep(array1, function (el) { if ($.inArray(el, array2) == -1) removedUsers.push(el); i++; });

            //        for (var i = 0; i < addedUsers.length; i++) {
            //            addbusinessareapath(addedUsers[i])
            //        }

            //        for (var i = 0; i < removedUsers.length; i++) {
            //            removebusinessareapath(removedUsers[i])
            //        }
            //    }

            //    if (vEdit == "BusinessArea") {
            //        //update business area owners
            //        $.ajax({
            //            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/businessareaowners?businessarea=' + encodeURIComponent(txtBusinessAreaName) + '&contractarea=' + encodeURIComponent(hdntxtContractAreaName) + '&businessareaownernames=' + txtBusinessAreaOwner,
            //            type: 'PUT',
            //            dataType: 'json',
            //            cache: false,
            //            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
            //            success: function (data) {
            //                $("#loadingPage").fadeOut();
            //            },
            //            error: function (data) {
            //                // alert('err')
            //                $("#loadingPage").fadeOut();
            //            }
            //        });
            //    } else if (vEdit == "ContractArea") {
            //        //update contract area admins
            //        $.ajax({
            //            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/contractareaadmins?contractarea=' + encodeURIComponent(txtBusinessAreaName) + '&contractareaadminnames=' + txtBusinessAreaOwner,
            //            type: 'PUT',
            //            dataType: 'json',
            //            cache: false,
            //            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
            //            success: function (data) {
            //                $("#loadingPage").fadeOut();
            //            }, error: function (data) {
            //                //alert('err')
            //                $("#loadingPage").fadeOut();
            //            }
            //        });
            //    }
            //}

            var txtContractTypes = '';
            var sContractTypes = $("#ddlContractType").val();
            var bao = '';
            $(sContractTypes).each(function (i, itm) {
                if (bao == '') {
                    bao = itm;
                }
                else {
                    bao += ";" + itm;
                }
            });

            if (bao != '')
                txtContractTypes = bao;

            var txtRequestTypes = '';
            var sRequestTypes = $("#ddlRequestType").val();
            var bao = '';
            $(sRequestTypes).each(function (i, itm) {
                if (bao == '') {
                    bao = itm;
                }
                else {
                    bao += ";" + itm;
                }
            });

            if (bao != '')
                txtRequestTypes = bao;


            //var ofullcontrol = $("#ddlUserFC").val();
            var ofullcontrolvar = "";
            $("#ddlUserFC option:selected").each(function () {
                if (ofullcontrolvar == '') {
                    ofullcontrolvar = $(this).text();
                }
                else {
                    ofullcontrolvar += ';' + $(this).text();
                }
            });

            //var ocontribute = $("#ddlUserC").val();
            var ocontributevar = "";
            $("#ddlUserC option:selected").each(function () {
                if (ocontributevar == '') {
                    ocontributevar = $(this).text();
                }
                else {
                    ocontributevar += ';' + $(this).text();
                }
            });

            //var oread = $("#ddlUserRO").val();
            var oreadvar = "";
            $("#ddlUserRO option:selected").each(function () {
                if (oreadvar == '') {
                    oreadvar = $(this).text();
                }
                else {
                    oreadvar += ';' + $(this).text();
                }
            });

            var userCCusers = "";
            $("#ddlCCUsers option:selected").each(function () {
                userCCusers += $(this).text() + ";";
            });
            if (userCCusers != "")
                userCCusers = removeLastChar(userCCusers, ';');

            var txtDocumentTemplates = '';
            var sDocumentTemplates = $("#ddlDocTemplates").val();
            var dtemplates = '';
            $(sDocumentTemplates).each(function (i, itm) {
                if (dtemplates == '') {
                    dtemplates = itm;
                }
                else {
                    dtemplates += ";" + itm;
                }
            });

            if (dtemplates != '')
                txtDocumentTemplates = dtemplates;


            var txtDocumentTypes = '';
            var sDocumentTypes = $("#ddlDocTypes").val();
            var dtypes = '';
            //$(sDocumentTypes).each(function (i, itm) {
            //    if (dtypes == '') {
            //        dtypes = itm;
            //    }
            //    else {
            //        dtypes += ";" + itm;
            //    }
            //});
            if (sDocumentTypes != null && sDocumentTypes != "") {
                sDocumentTypes = $.grep(sDocumentTypes, function (n, i) {
                    if (n != "") {
                        n = n.trim();
                        if (n != "") {
                            return (n);
                        }
                    }
                });
                //if (!(sDocumentTypes.indexOf("Primary Agreement") > -1) && sDocumentTypes != null) {
                //    sDocumentTypes.push("Primary Agreement");
                //}
                $(sDocumentTypes).each(function (i, itm) {
                    if (dtypes == '') {
                        dtypes = itm;
                    }
                    else {
                        dtypes += ";" + itm;
                    }
                });
            }
            else {
                sDocumentTypes = [];
                //sDocumentTypes.push("Primary Agreement");
                $(sDocumentTypes).each(function (i, itm) {
                    if (dtypes == '') {
                        dtypes = itm;
                    }
                    else {
                        dtypes += ";" + itm;
                    }
                });

            }
            if (dtypes != '')
                txtDocumentTypes = dtypes;

            var vExists = false;

            if ($('#titleMain').html() == 'Contract Area Name') {
                if ($("#txtBusinessAreaName").val().toLowerCase().trim() != $("#hdntxtContractAreaName").val().toLowerCase()) {
                    vExists = fnCheckBusinessAreaNameExists($("#txtBusinessAreaName").val().trim(), $("#hdntxtContractAreaName").val(), "ContractArea")
                }
            } else {
                if ($("#txtBusinessAreaName").val().toLowerCase().trim() != $("#hdntxtBusinessAreaName").val().toLowerCase()) {
                    vExists = fnCheckBusinessAreaNameExists($("#txtBusinessAreaName").val().trim(), $("#hdntxtContractAreaName").val(), "BusinessArea")
                }
            }
            if (vExists == true) {
                if ($('#titleMain').html() == 'Contract Area Name') {
                    swal("", "Contract Area with same name already exists! Please enter different Contract Area Name.");
                    // alert("Contract Area with same name already exists! Please enter different Contract Area Name.");
                } else {
                    swal("", "Business Area with same name already exists! Please enter different Business Area Name.");
                    // alert("Business Area with same name already exists! Please enter different Business Area Name.");
                }
                $('.ui-button-green-text').parent().removeAttr('disabled');
                $("#loadingPage").fadeOut();
            }
            else {
                var isinheriting = "No";
                if ($('#chkInheritAllUser')[0].checked) {
                    isinheriting = "Yes";
                }
                $.ajax({
                    //async: false,
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea?businessareaid=' + $('#txtRowKey').val(),
                    type: "PUT",
                    dataType: "json",
                    headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                    contentType: "application/json",
                    data: JSON.stringify({
                        "BusinessAreaName": txtBusinessAreaName,
                        "Owner": txtBusinessAreaOwner,
                        "InheritFromParent": isinheriting,
                        "ParentBusinessAreaID": $('#txtParentID').val(),
                        "ContractType": txtContractTypes,
                        "RequestType": txtRequestTypes,
                        "Description": $("#txtDescription").val(),
                        "Currency": $("#ddlCurrency").find('option:selected').text(),
                        //"LegalEntity": $("#ddlLegalEntity").find('option:selected').text(),
                        "LegalEntity": txtLegalEntity, // Added for bug(eO37116)
                        "ContractNumbering": $("input:radio[name=ContractNumber]:checked").val(),
                        "DocumentTemplates": txtDocumentTemplates,
                        "DocumentTypes": txtDocumentTypes,
                        "DocLibName": DocLibraryName,//Business Area Level Library Creation
                        "DocLibCreation": $("input:radio[name=docArea]:checked").val(),//Business Area Level Library Creation
                        "Abbreviation": txtBusinessAreaNameAbbreviation,
                        "DocVersion": $("input:radio[name=docversion]:checked").val(),
                        //"DocCheckout": $("input:radio[name=doccheckout]:checked").val(),
                        "DocCheckout": "No",
                        "DocDefaultView": $("input:radio[name=docdefaultview]:checked").val(),
                        "DocUploadExternal": $("input:radio[name=docuploadexternal]:checked").val(),
                        "DocSecurity": $("input:radio[name=docsecurity]:checked").val(),
                        //manoj
                        "ConfigureContractType": $("#ddlCnfcontracttype").val(),

                        "CCUsers": userCCusers
                    }),
                    success: function () {

                        if (!($("#dialogEdit").dialog("isOpen")))
                            $('.ui-button-green-text').parent().removeAttr('disabled');
                        //$("#loadingPage").fadeOut();
                        //if full control users changed
                        $.ajax({
                            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/businessarealocation?businessareaid=' + $('#txtRowKey').val(),
                            type: 'GET',
                            dataType: 'json',
                            headers: { 'eContracts-ApiKey': localStorage.APIKey },
                            cache: false,
                            async: false,
                            success: function (fullhierarchy) {
                                if (ofullcontrolvar != $('#hdntxtFullControlUsers').val()) {
                                    var busnsareaname = encodeURIComponent(fullhierarchy);
                                    $.ajax({
                                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/updateuserpermission?addforuser=' + ofullcontrolvar + '&previoususers=' + $('#hdntxtFullControlUsers').val() + '&businessareaname=' + busnsareaname + '&oldbusinessareaname=' + encodeURIComponent($('#hdntxtBusinessAreaPath').val()) + '&businessareaid=' + $('#txtRowKey').val() + '&permissionfor=Full',
                                        type: 'PUT',
                                        dataType: 'json',
                                        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                                        success: function (data) {
                                            //$("#loadingPage").fadeOut();
                                        }, error: function (data) {
                                            //alert('err')
                                            //$("#loadingPage").fadeOut();
                                        }
                                    });
                                }
                            },
                            error: function (fullhierarchy) {
                                //$("#loadingPage").fadeOut();
                            }
                        });


                        //if contribute users changed
                        $.ajax({
                            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/businessarealocation?businessareaid=' + $('#txtRowKey').val(),
                            type: 'GET',
                            dataType: 'json',
                            headers: { 'eContracts-ApiKey': localStorage.APIKey },
                            cache: false,
                            async: false,
                            success: function (fullhierarchy) {
                                var busnsareaname = encodeURIComponent(fullhierarchy);
                                if (ocontributevar != $('#hdntxtContributeUsers').val()) {
                                    $.ajax({
                                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/updateuserpermission?addforuser=' + ocontributevar + '&previoususers=' + $('#hdntxtContributeUsers').val() + '&businessareaname=' + busnsareaname + '&oldbusinessareaname=' + encodeURIComponent($('#hdntxtBusinessAreaPath').val()) + '&businessareaid=' + $('#txtRowKey').val() + '&permissionfor=Contribute',
                                        type: 'PUT',
                                        dataType: 'json',
                                        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                                        success: function (data) {
                                            //$("#loadingPage").fadeOut();
                                        }, error: function (data) {
                                            //alert('err')
                                            //$("#loadingPage").fadeOut();
                                        }
                                    });
                                }
                            },
                            error: function (fullhierarchy) {
                                //$("#loadingPage").fadeOut();
                            }
                        });


                        //if read users changed
                        $.ajax({
                            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/businessarealocation?businessareaid=' + $('#txtRowKey').val(),
                            type: 'GET',
                            dataType: 'json',
                            headers: { 'eContracts-ApiKey': localStorage.APIKey },
                            cache: false,
                            async: false,
                            success: function (fullhierarchy) {
                                var busnsareaname = encodeURIComponent(fullhierarchy);
                                if (oreadvar != $('#hdntxtReadOnlyUsers').val()) {
                                    $.ajax({
                                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/updateuserpermission?addforuser=' + oreadvar + '&previoususers=' + $('#hdntxtReadOnlyUsers').val() + '&businessareaname=' + busnsareaname + '&oldbusinessareaname=' + encodeURIComponent($('#hdntxtBusinessAreaPath').val()) + '&businessareaid=' + $('#txtRowKey').val() + '&permissionfor=Read',
                                        type: 'PUT',
                                        dataType: 'json',
                                        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                                        success: function (data) {
                                            //$("#loadingPage").fadeOut();
                                        }, error: function (data) {
                                            //alert('err')
                                            //$("#loadingPage").fadeOut();
                                        }
                                    });
                                }
                            },
                            error: function (fullhierarchy) {
                                //$("#loadingPage").fadeOut();
                            }
                        });


                        var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
                        var vAccFeat = $.grep(veContractFeatures, function (n, i) {
                            return (n.RowKey == "8" && n.Status == "ON");
                        });
                        if ($('#txtParentID').val() != 0 && vAccFeat.length > 0) {
                            vAccFeat = $.grep(veContractFeatures, function (n, i) {
                                return (n.RowKey == "12" && n.Status == "ON");
                            });
                            var vRequestApproval = '';
                            if (vAccFeat.length > 0) {
                                vRequestApproval = $("#ddlRequest").find('option:selected').text();
                            }
                            $.ajax({
                                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Workflow/BusinessAreaDefaultWorkflow',
                                type: 'PUT',
                                dataType: 'json',
                                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                                cache: false,
                                async: false,
                                data: {
                                    "ContractArea": hdntxtContractAreaName,
                                    "BusinessArea": txtBusinessAreaName,
                                    "ContractApproval": $("#ddlApproval").find('option:selected').text(),
                                    "DocumentReview": $("#ddlReview").find('option:selected').text(),
                                    "ContractRenewal": $("#ddlRenewal").find('option:selected').text(),
                                    "RequestApproval": vRequestApproval,
                                    "AmendmentApproval": $("#ddlAmendmentApproval").find('option:selected').text()
                                },
                                success: function (data) {
                                    //$("#loadingPage").fadeOut();
                                }, error: function (data) {
                                    //alert('err')
                                    //$("#loadingPage").fadeOut();
                                }
                            });
                        }
                        location = "/General/BusinessAreas";
                    },
                    error: function (data) {
                        $("#loadingPage").fadeOut();
                    },
                    complete: function (data) {
                        $("#loadingPage").fadeOut();
                    }
                });
            }

        } else {
            //  $("#loadingPage").fadeIn();
            $('#ddlBusinessAreaOwner').find('option:selected').val();
            var txtBusinessAreaName = $("#txtBusinessAreaName").val().trim();
            var txtBusinessAreaNameAbbrivation = $("#txtBusinessAreaNameAbbreviation").val();
            var hdntxtContractAreaName = $("#hdntxtContractAreaName").val();
            var txtBusinessAreaOwner = '';
            var sbusinessAreaowners = [];
            var bao = '';
            $("#ddlBusinessAreaOwner option:selected").each(function () {
                if (bao == '') {
                    bao = $(this).text();
                }
                else {
                    bao += ";" + $(this).text();
                }
            });
            if (bao != '')
                sbusinessAreaowners = bao.split(';');

            if (bao == '')
                txtBusinessAreaOwner = 'Not Assigned';
            else
                txtBusinessAreaOwner = bao;

            //save business owner in user list
            //get user details
            if (txtBusinessAreaOwner != 'Not Assigned') {
                var businessAreaNewPath = $("#hdntxtBusinessAreaPath").val() + " > " + txtBusinessAreaName;
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/updateuser?username=' + txtBusinessAreaOwner + '&businessareapath=' + businessAreaNewPath,
                    type: 'PUT',
                    dataType: 'json',
                    'Content-Type': 'application/json',
                    cache: false,
                    headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                    success: function (userdetails) {
                        //$("#loadingPage").fadeOut();
                    },
                    error:
                        function (userdetails) {
                            //$("#loadingPage").fadeOut();
                        }
                });
            }

            var txtContractTypes = '';
            var sContractTypes = $("#ddlContractType").val();
            var bao = '';
            $(sContractTypes).each(function (i, itm) {
                if (bao == '') {
                    bao = itm;
                }
                else {
                    bao += ";" + itm;
                }
            });

            if (bao != '')
                txtContractTypes = bao;

            var txtRequestTypes = '';
            var sRequestTypes = $("#ddlRequestType").val();
            var bao = '';
            $(sRequestTypes).each(function (i, itm) {
                if (bao == '') {
                    bao = itm;
                }
                else {
                    bao += ";" + itm;
                }
            });

            if (bao != '')
                txtRequestTypes = bao;

            var txtCCUsers = '';
            var sCCUsers = $("#ddlCCUsers").val();
            var bao = '';
            if (sCCUsers != '') {
                $(sCCUsers).each(function (i, itm) {
                    if (bao == '') {
                        bao = unescape(itm);
                    }
                    else {
                        bao += ";" + unescape(itm);
                    }
                });
            }

            if (bao != '')
                txtCCUsers = bao;

            //var ofullcontrol = $("#ddlUserFC").val();
            var ofullcontrolvar = "";
            $("#ddlUserFC option:selected").each(function () {
                if (ofullcontrolvar == '') {
                    ofullcontrolvar = $(this).text();
                }
                else {
                    ofullcontrolvar += ';' + $(this).text();
                }
            });

            //var ocontribute = $("#ddlUserC").val();
            var ocontributevar = "";
            $("#ddlUserC option:selected").each(function () {
                if (ocontributevar == '') {
                    ocontributevar = $(this).text();
                }
                else {
                    ocontributevar += ';' + $(this).text();
                }
            });

            //var oread = $("#ddlUserRO").val();
            var oreadvar = "";
            $("#ddlUserRO option:selected").each(function () {
                if (oreadvar == '') {
                    oreadvar = $(this).text();
                }
                else {
                    oreadvar += ';' + $(this).text();
                }
            });

            var txtDocumentTemplates = '';
            var sDocumentTemplates = $("#ddlDocTemplates").val();
            var dtemplates = '';
            $(sDocumentTemplates).each(function (i, itm) {
                if (dtemplates == '') {
                    dtemplates = itm;
                }
                else {
                    dtemplates += ";" + itm;
                }
            });

            if (dtemplates != '')
                txtDocumentTemplates = dtemplates;


            var txtDocumentTypes = '';
            var sDocumentTypes = $("#ddlDocTypes").val();
            var dtypes = '';
            $(sDocumentTypes).each(function (i, itm) {
                if (dtypes == '') {
                    dtypes = itm;
                }
                else {
                    dtypes += ";" + itm;
                }
            });

            if (dtypes != '')
                txtDocumentTypes = dtypes;

            var vExists = false;
            //if ($("#txtBusinessAreaName").val() != $("#hdntxtBusinessAreaName").val()) {
            //    vExists = fnCheckBusinessAreaNameExists($("#txtBusinessAreaName").val(), $("#hdntxtContractAreaName").val())
            //}

            if ($('#titleMain').html() == 'Contract Area Name') {
                if ($("#txtAction").val() != "Duplicate") {
                    if ($("#txtBusinessAreaName").val().toLowerCase().trim() != $("#hdntxtContractAreaName").val().toLowerCase()) {
                        vExists = fnCheckBusinessAreaNameExists($("#txtBusinessAreaName").val().trim(), $("#hdntxtContractAreaName").val(), "ContractArea")
                    }
                }
                else {
                    $('#txtRowKey').val('0');
                    vExists = fnCheckBusinessAreaNameExists($("#txtBusinessAreaName").val().trim(), $("#hdntxtContractAreaName").val(), "ContractArea")
                }
            } else {
                if ($("#txtBusinessAreaName").val().toLowerCase().trim() != $("#hdntxtBusinessAreaName").val().toLowerCase()) {
                    vExists = fnCheckBusinessAreaNameExists($("#txtBusinessAreaName").val().trim(), $("#hdntxtContractAreaName").val(), "BusinessArea")
                }
            }

            if (vExists == true) {
                if ($('#titleMain').html() == 'Contract Area Name') {
                    swal("Contract Area with same name already exists! Please enter different Contract Area Name.");
                    // alert("Contract Area with same name already exists! Please enter different Contract Area Name.");
                } else {
                    swal("Business Area with same name already exists! Please enter different Business Area Name.");
                    // alert("Business Area with same name already exists! Please enter different Business Area Name.");
                }
                $('.ui-button-green-text').parent().removeAttr('disabled');
                $("#loadingPage").fadeOut();
            }
            else {
                var isinheriting = "No";
                if ($('#chkInheritAllUser')[0].checked) {
                    isinheriting = "Yes";
                }
                $.ajax({
                    async: false,
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea',
                    type: "POST",
                    dataType: "json",
                    contentType: "application/json",
                    headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                    data: JSON.stringify({
                        "BusinessAreaName": txtBusinessAreaName,
                        "Owner": txtBusinessAreaOwner,
                        "InheritFromParent": isinheriting,
                        "ParentBusinessAreaID": $('#txtRowKey').val(),
                        "ContractType": txtContractTypes,
                        "RequestType": txtRequestTypes,
                        "Description": $("#txtDescription").val(),
                        "Currency": $("#ddlCurrency").find('option:selected').text(),
                        //"LegalEntity": $("#ddlLegalEntity").find('option:selected').text(),
                        "LegalEntity": $("#txtLegalEntity").val().trim(), // Added for bug(eO37116)
                        "ContractNumbering": $("input:radio[name=ContractNumber]:checked").val(),
                        "DocumentTemplates": txtDocumentTemplates,
                        "DocumentTypes": txtDocumentTypes,
                        "DocLibCreation": $("input:radio[name=docArea]:checked").val(),
                        "DocLibName": DocLibraryName,//Business Area Level Library Creation
                        "Abbreviation": txtBusinessAreaNameAbbrivation,
                        "DocVersion": $("input:radio[name=docversion]:checked").val(),
                        //"DocCheckout": $("input:radio[name=doccheckout]:checked").val(),
                        "DocCheckout": "No",
                        "DocDefaultView": $("input:radio[name=docdefaultview]:checked").val(),
                        "DocUploadExternal": $("input:radio[name=docuploadexternal]:checked").val(),
                        "DocSecurity": $("input:radio[name=docsecurity]:checked").val(),
                        //manoj
                        "ConfigureContractType": $("#ddlCnfcontracttype").val(),

                        "CCUsers": txtCCUsers
                    }),
                    success: function (data) {
                        var createdBusinessAreaRowKey = data;
                        if (!($("#dialogEdit").dialog("isOpen")))
                            $('.ui-button-green-text').parent().removeAttr('disabled');


                        //add default business area to a newly created contract area
                        if ($('#titleMain').html() == 'Contract Area Name') {
                            var Defaultabbr = txtBusinessAreaName.substring(0, 3);
                            if ($("#txtAction").val() != "Duplicate") {

                                $.ajax({
                                    async: false,
                                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea',
                                    type: "POST",
                                    dataType: "json",
                                    contentType: "application/json",
                                    headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                                    data: JSON.stringify({
                                        "BusinessAreaName": txtBusinessAreaName + "- Business Area",
                                        "Abbreviation": Defaultabbr.toUpperCase(),
                                        "Owner": txtBusinessAreaOwner,
                                        "ParentBusinessAreaID": data,
                                        "DocLibCreation": $("input:radio[name=docArea]:checked").val(),
                                    }),
                                    success: function (data) { },
                                    error:
                                function (data) {
                                    // $("#loadingPage").fadeOut();
                                }
                                });
                            }
                            else {
                                $.ajax({
                                    async: false,
                                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/contractareaduplicate',
                                    type: "POST",
                                    dataType: "json",
                                    contentType: "application/json",
                                    headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                                    data: JSON.stringify({
                                        "Abbreviation": Defaultabbr.toUpperCase(),
                                        "Owner": txtBusinessAreaOwner,
                                        "ParentBusinessAreaID": $("#hdntxtContractAreaName").val(),
                                        "RowKey": data,
                                        //"ContractType": txtContractTypes,
                                        //"Description": $("#txtDescription").val(),
                                        //"Currency": $("#ddlCurrency").find('option:selected').text(),
                                        //"LegalEntity": $("#ddlLegalEntity").find('option:selected').text(),
                                        //"ContractNumbering": $("input:radio[name=ContractNumber]:checked").val(),
                                        //"DocumentTemplates": txtDocumentTemplates,
                                        //"DocumentTypes": txtDocumentTypes
                                    }),
                                    success: function (data) { },
                                    error:
                                function (data) {
                                    // $("#loadingPage").fadeOut();
                                }
                                });
                            }
                        }

                        //if full control users changed
                        $.ajax({
                            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/businessarealocation?businessareaid=' + createdBusinessAreaRowKey,
                            type: 'GET',
                            dataType: 'json',
                            headers: { 'eContracts-ApiKey': localStorage.APIKey },
                            cache: false,
                            async: false,
                            success: function (fullhierarchy) {
                                var busnsareaname = encodeURIComponent(fullhierarchy);
                                // if (ofullcontrolvar != $('#hdntxtFullControlUsers').val()) {
                                $.ajax({
                                    //url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/updateuserpermission?addforuser=' + ofullcontrolvar + '&previoususers=' + $('#hdntxtFullControlUsers').val() + '&businessareaname=' + fullhierarchy + '&permissionfor=Full',
                                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/updateuserpermission?addforuser=' + ofullcontrolvar + '&previoususers=&businessareaname=' + busnsareaname + '&oldbusinessareaname=' + encodeURIComponent($('#hdntxtBusinessAreaPath').val()) + '&businessareaid=' + createdBusinessAreaRowKey + '&permissionfor=Full',
                                    type: 'PUT',
                                    dataType: 'json',
                                    headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                                    success: function (data) {
                                        //$("#loadingPage").fadeOut();
                                    },
                                    error:
                                 function (data) {
                                     //$("#loadingPage").fadeOut();
                                 }
                                });
                                //}
                            },
                            error: function (fullhierarchy) {
                                // $("#loadingPage").fadeOut();
                            }
                        });


                        //if contribute users changed
                        $.ajax({
                            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/businessarealocation?businessareaid=' + createdBusinessAreaRowKey,
                            type: 'GET',
                            dataType: 'json',
                            headers: { 'eContracts-ApiKey': localStorage.APIKey },
                            cache: false,
                            async: false,
                            success: function (fullhierarchy) {
                                var busnsareaname = encodeURIComponent(fullhierarchy);
                                // if (ocontributevar != $('#hdntxtContributeUsers').val()) {
                                $.ajax({
                                    //url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/updateuserpermission?addforuser=' + ocontributevar + '&previoususers=' + $('#hdntxtContributeUsers').val() + '&businessareaname=' + fullhierarchy + '&permissionfor=Contribute',
                                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/updateuserpermission?addforuser=' + ocontributevar + '&previoususers=&businessareaname=' + busnsareaname + '&oldbusinessareaname=' + encodeURIComponent($('#hdntxtBusinessAreaPath').val()) + '&businessareaid=' + createdBusinessAreaRowKey + '&permissionfor=Contribute',
                                    type: 'PUT',
                                    dataType: 'json',
                                    headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                                    success: function (data) {
                                        //$("#loadingPage").fadeOut();
                                    },
                                    error:
                                function (data) {
                                    //$("#loadingPage").fadeOut();
                                }
                                });
                                // }
                            },
                            error: function (fullhierarchy) {
                                //$("#loadingPage").fadeOut();
                            }
                        });

                        //if read users changed
                        $.ajax({
                            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/businessarealocation?businessareaid=' + createdBusinessAreaRowKey,
                            type: 'GET',
                            dataType: 'json',
                            headers: { 'eContracts-ApiKey': localStorage.APIKey },
                            cache: false,
                            async: false,
                            success: function (fullhierarchy) {
                                // if (oreadvar != $('#hdntxtReadOnlyUsers').val()) {
                                var busnsareaname = encodeURIComponent(fullhierarchy);
                                $.ajax({
                                    //url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/updateuserpermission?addforuser=' + oreadvar + '&previoususers=' + $('#hdntxtReadOnlyUsers').val() + '&businessareaname=' + fullhierarchy + '&permissionfor=Read',
                                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/updateuserpermission?addforuser=' + oreadvar + '&previoususers=&businessareaname=' + busnsareaname + '&oldbusinessareaname=' + encodeURIComponent($('#hdntxtBusinessAreaPath').val()) + '&businessareaid=' + createdBusinessAreaRowKey + '&permissionfor=Read',
                                    type: 'PUT',
                                    dataType: 'json',
                                    headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                                    success: function (data) {

                                    },
                                    error:
                                function (data) {
                                    //$("#loadingPage").fadeOut();
                                }
                                });
                                //}
                            },
                            error: function (fullhierarchy) {
                                //$("#loadingPage").fadeOut();
                            }
                        });


                        var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
                        var vAccFeat = $.grep(veContractFeatures, function (n, i) {
                            return (n.RowKey == "8" && n.Status == "ON");
                        });
                        if ($('#txtParentID').val() != 0 && vAccFeat.length > 0) {
                            vAccFeat = $.grep(veContractFeatures, function (n, i) {
                                return (n.RowKey == "12" && n.Status == "ON");
                            });
                            var vRequestApproval = '';
                            if (vAccFeat.length > 0) {
                                vRequestApproval = $("#ddlRequest").find('option:selected').text();
                            }
                            $.ajax({
                                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Workflow/BusinessAreaDefaultWorkflow',
                                type: 'PUT',
                                dataType: 'json',
                                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                                cache: false,
                                async: false,
                                data: {
                                    "ContractArea": hdntxtContractAreaName,
                                    "BusinessArea": txtBusinessAreaName,
                                    "ContractApproval": $("#ddlApproval").find('option:selected').text(),
                                    "DocumentReview": $("#ddlReview").find('option:selected').text(),
                                    "ContractRenewal": $("#ddlRenewal").find('option:selected').text(),
                                    "RequestApproval": vRequestApproval,
                                    "ContractRenewal": '',
                                    "AmendmentApproval": $("#ddlAmendmentApproval").find('option:selected').text()
                                },
                                success: function (data) {
                                    //$("#loadingPage").fadeOut();
                                },
                                error:
                            function (data) {
                                //$("#loadingPage").fadeOut();
                            }
                            });
                        }
                        location = "/General/BusinessAreas";
                    },
                    error: function (data) {
                        $("#loadingPage").fadeOut();
                    },
                    complete: function (data) {
                        $("#loadingPage").fadeOut();
                    }
                });
            }
        }
    }
    else {
        $('.ui-button-green-text').parent().removeAttr('disabled');
    }
}

var article = "";
var RecurContractArea = "";
var previousid = "";
var loggedInUserName = localStorage.UserName;
var vOwnerOfBusinessAreas = localStorage.OwnerOfBusinessAreas;
var isOwner = false;
var strContractAreaID = '';
function recursiveIterationbusinessareas(object) {
    if (object.ChildrenData.length != 0) {
        for (var i = 0; i < object.ChildrenData.length; i++) {
            var item = object.ChildrenData[i];

            if (item.ParentBusinessAreaID == 0) {
                RecurContractArea = item.BusinessAreaName;
                strContractAreaID = item.RowKey;
                article += '<tr data-tt-id="tre-' + item.RowKey + '" class="branch branchtree expanded">';
                if (item.Owner.indexOf(loggedInUserName) >= 0) { //if current logged in user is contract area administrator
                    isOwner = true;
                    if (strContractAreaID == "GenCA") {
                        article += '<td class="treeHead"><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractArea" style="display:none;">' + RecurContractArea + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/globset.png" /><small id="elBusinessArea">' + item.BusinessAreaName + '</small>&nbsp;<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuGeneral" /></td></tr>';
                    } else {
                        article += '<td class="treeHead"><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractArea" style="display:none;">' + RecurContractArea + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/globset.png" /><small id="elBusinessArea">' + item.BusinessAreaName + '</small>&nbsp;<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenu" /></td></tr>';
                    }
                } else {
                    isOwner = false;
                    article += '<td class="treeHead"><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractArea" style="display:none;">' + RecurContractArea + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/globset.png" /><small id="elBusinessArea">' + item.BusinessAreaName + '</small></td></tr>';
                }
            } else {
                article += '<tr data-tt-id="tre-' + item.RowKey + '" data-tt-parent-id="tre-' + item.ParentBusinessAreaID + '" class="branch branchtree collapsed" style="display: table-row;">';
                if (strContractAreaID == "GenCA") {
                    article += '<td><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractArea" style="display:none;">' + RecurContractArea + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/gen.png" /><small id="elBusinessArea">' + item.BusinessAreaName + '</small></td></tr>'; //&nbsp;<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuGeneral" />
                } else {
                    if (previousid == item.ParentBusinessAreaID) {

                        //find if child business area exists
                        $.ajax({
                            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/childbusinessareas?businessareaid=' + item.RowKey,
                            type: 'GET',
                            dataType: 'json',
                            'Content-Type': 'application/json',
                            headers: { 'eContracts-ApiKey': localStorage.APIKey },
                            async: false,
                            success: function (data) {
                                if (isOwner) {
                                    if (data.length == 0) {
                                        article += '<td><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractArea" style="display:none;">' + RecurContractArea + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/gen.png" class="padding_left_65px" /><small id="elBusinessArea">' + item.BusinessAreaName + '</small>&nbsp;<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenu" /></td></tr>';
                                    } else {
                                        article += '<td><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractArea" style="display:none;">' + RecurContractArea + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/gen.png" /><small id="elBusinessArea">' + item.BusinessAreaName + '</small>&nbsp;<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenu" /></td></tr>';
                                    }
                                } else {
                                    //current logged in user is owner of business area
                                    var ownerofBA = false;
                                    $.each(vOwnerOfBusinessAreas.split(';'), function (key, line) {
                                        var parts = line.split(' > ');
                                        if (parts[0] == RecurContractArea && parts[parts.length - 1] == item.BusinessAreaName) {
                                            ownerofBA = true;
                                        }
                                    });

                                    if (ownerofBA) {
                                        if (data.length == 0) {
                                            article += '<td><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractArea" style="display:none;">' + RecurContractArea + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/gen.png" class="padding_left_65px" /><small id="elBusinessArea">' + item.BusinessAreaName + '</small>&nbsp;<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenu" /></td></tr>';
                                        } else {
                                            article += '<td><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractArea" style="display:none;">' + RecurContractArea + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/gen.png" /><small id="elBusinessArea">' + item.BusinessAreaName + '</small>&nbsp;<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenu" /></td></tr>';
                                        }
                                    } else {
                                        if (data.length == 0) {
                                            article += '<td><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractArea" style="display:none;">' + RecurContractArea + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/gen.png" class="padding_left_65px" /><small id="elBusinessArea">' + item.BusinessAreaName + '</small></td></tr>';
                                        } else {
                                            article += '<td><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractArea" style="display:none;">' + RecurContractArea + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/gen.png" /><small id="elBusinessArea">' + item.BusinessAreaName + '</small></td></tr>';
                                        }
                                    }
                                }

                            },
                            error:
                                function (data) {

                                }
                        });
                    } else {
                        if (isOwner) {
                            article += '<td><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractArea" style="display:none;">' + RecurContractArea + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/gen.png" /><small id="elBusinessArea">' + item.BusinessAreaName + '</small>&nbsp;<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenu" /></td></tr>';
                        } else {
                            //current logged in user is owner of business area
                            var ownerofBA = false;
                            $.each(vOwnerOfBusinessAreas.split(';'), function (key, line) {
                                var parts = line.split(' > ');
                                if (parts[0] == RecurContractArea && parts[parts.length - 1] == item.BusinessAreaName) {
                                    ownerofBA = true;
                                }
                            });
                            if (ownerofBA) {
                                article += '<td><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractArea" style="display:none;">' + RecurContractArea + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/gen.png" /><small id="elBusinessArea">' + item.BusinessAreaName + '</small>&nbsp;<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenu" /></td></tr>';
                            } else {
                                article += '<td><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractArea" style="display:none;">' + RecurContractArea + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/gen.png" /><small id="elBusinessArea">' + item.BusinessAreaName + '</small></td></tr>';
                            }
                        }
                    }
                }
                if (previousid != item.ParentBusinessAreaID)
                    previousid = item.RowKey;
            }

            if (object.ChildrenData.length > 0)
                recursiveIterationbusinessareas(object.ChildrenData[i]);
        }
    }
}

$(function () {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/entities',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            recursiveIterationbusinessareas(data)
            $("#tbodyBusinessArea12").append(article);
            if (article == "") {
                $('#tbodyBusinessArea12').empty();
                $("#tbodyBusinessArea12").append("<tr><td><p class='f_p-error'>No Organization Hierarchy Found.</p></td></tr>");
            }
            article = "";
            $("#example-basic-12").treetable({ expandable: true, initialState: "expanded" }, true);
            $(".openmenu").contextMenu({ menu: 'myMenu', leftButton: true }, function (action, el, pos) { contextMenuWork(action, el.parent("td").parent("tr"), pos); });
            $(".openmenuGeneral").contextMenu({ menu: 'myMenuGeneral', leftButton: true }, function (action, el, pos) { contextMenuWorkGeneral(action, el.parent("td").parent("tr"), pos); });
        },
        error:
            function (data) {
                $('#tbodyBusinessArea12').empty();
                $("#tbodyBusinessArea12").append("<tr><td><p class='f_p-error'>No Organization Hierarchy Found.</p></td></tr>");
            }
    });

    $("#dialogEdit").dialog({
        autoOpen: false, closeText: "",
        width: "70%",
        height: "800",
        modal: true,
        resizable: true,
        buttons: [{
            text: "Save",
            "id": "btnBussAreaEdit",
            click: function () {
                $('.ui-button-green-text').parent().attr('disabled', 'disabled');
                addupdateBusinessArea();
            }
        },
            {
                text: "Cancel",
                "id": "btnBussAreaCancel",
                click: function () {
                    $(this).dialog("close");
                    $("#txtDocLibName").removeClass('validelement');
                    $("#txtDocLibName").removeClass('error');
                    $("#trDocLibName").find('td:first').empty();
                    $("#trDocLibName").find('td:first').text('Document Library Name');
                }
            }
        ],
        close: function (event, ui) {
            $("#txtDocLibName").removeClass('validelement');
            $("#txtDocLibName").removeClass('error');
            $("#trDocLibName").find('td:first').empty();
            $("#trDocLibName").find('td:first').text('Document Library Name');
        }

    });

    GetUsers();
    GetCurrencies();
    GetLegalEntities();

    $("#addEditDocumentType").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Document Type",
        modal: true,
        buttons: {
            "Save": function () {
                $('.ui-button-green-text').parent().attr('disabled', 'disabled');
                SaveDocumentType();
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $("#addEditTemplate").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Document Templates",
        modal: true,
        buttons: {
            "Save": function () {
                $('.ui-button-green-text').parent().attr('disabled', 'disabled');
                SaveTemplate();
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $("#AddEditContractTypes").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Contract Types",
        modal: true,
        buttons: {
            "Save": function () {
                $('.ui-button-green-text').parent().attr('disabled', 'disabled');
                SaveContractTypes();
            },
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
    }); // Added for bug(eO37116)

    restrictspecialcharactor("txtDocLibName");
});
var oUsersandGroup = '';
var vBusinessAreaOwners = '';
var vContractAreaAdmins = '';
var articleemailuserCC = '';
var vUsersList = '';
function GetUsers() {
    $('#ddlBusinessAreaOwner').empty();
    $('#ddlUserFC').empty();
    $('#ddlUserC').empty();
    $('#ddlUserRO').empty();
    $("#ddlCCUsers").empty();
    $.ajax({
        //url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/users',
        //url: '/Settings/SearchSettingsUser',
        //type: 'GET',
        //dataType: 'json',
        //'Content-Type': 'application/json',
        //cache: false,
        //async: false,
        //headers: { 'eContracts-ApiKey': localStorage.APIKey, 'AntiReqVerificationToken': $("#forgeryToken").val() },
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/users/filter?searchKeyword=&customQuery=&sortBy=&orderBy=',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (dataUser) {
            if (dataUser.length > 0) {
                oUsersandGroup = dataUser;
                dataUser = $.grep(dataUser, function (n, i) {
                    return (n.IsEnabled == "Yes" && n.IsGroup == "No");
                });
                articleemailuserCC = "";
                //dataUser = dataUser.Data;
                $(dataUser).each(function (i, item) {
                    var sRowKey = item.RowKey;
                    var sUserName = item.UserName;
                    var sEmail = item.EmailID;
                    articleemailuserCC += '<option value="' + sUserName + '" data-emailvalue="' + sEmail + '">' + sUserName + '</option>';
                    if (item.UserType.indexOf("Global Contract Owner") < 0)
                        vUsersList += '<option value="' + sUserName + '">' + sUserName + '</option>';
                    if (item.UserType.indexOf("Business Area Owner") >= 0 || item.UserType.indexOf("Global Administrator") >= 0 || item.UserType.indexOf("Global Contract Owner") >= 0)
                        vBusinessAreaOwners += '<option value="' + sUserName + '">' + sUserName + '</option>';
                    if (item.UserType.indexOf("Contract Area Administrator") >= 0 || item.UserType.indexOf("Global Administrator") >= 0 || item.UserType.indexOf("Global Contract Owner") >= 0)
                        vContractAreaAdmins += '<option value="' + sUserName + '">' + sUserName + '</option>';
                });

                $('#ddlBusinessAreaOwner').append(vBusinessAreaOwners);
                $("#ddlCCUsers").append(articleemailuserCC);
                $('#ddlUserFC').html(vUsersList);
                $('#ddlUserC').html(vUsersList);
                $('#ddlUserRO').html(vUsersList);
                $('#ddlBusinessAreaOwner').chosen().trigger("chosen:updated").change(function () {
                    var vUserFC = [];
                    $("#ddlUserFC option:selected").each(function () {
                        vUserFC.push($(this).text());
                    });
                    var vUserC = [];
                    $("#ddlUserC option:selected").each(function () {
                        vUserC.push($(this).text());
                    });
                    var vUserRO = [];
                    $("#ddlUserRO option:selected").each(function () {
                        vUserRO.push($(this).text());
                    });
                    var vUserArr = [];
                    $("#ddlBusinessAreaOwner option:selected").each(function () {
                        vUserArr.push($(this).text());
                    });

                    if (vUserArr == null || vUserArr == "" || vUserArr.length == 0)
                        $('#ddlBusinessAreaOwner').val('');
                    else
                        var vLength = vUserArr.length;

                    $("#ddlUserFC option").removeClass('hideUserAdmin');
                    $("#ddlUserFC option").attr("disabled", false);
                    $("#ddlUserC option").removeClass('hideUserAdmin');
                    $("#ddlUserC option").attr("disabled", false);
                    $("#ddlUserRO option").removeClass('hideUserAdmin');
                    $("#ddlUserRO option").attr("disabled", false);
                    for (var i = 0; i < vLength; i++) {
                        var vUser = vUserArr[i];
                        $("#ddlUserFC option").each(function (index, element) {
                            if (element.value == vUser) {
                                $(element).addClass('hideUserAdmin');
                                $(element).attr("disabled", true);
                            }
                        });
                        $("#ddlUserC option").each(function (index, element) {
                            if (element.value == vUser) {
                                $(element).addClass('hideUserAdmin');
                                $(element).attr("disabled", true);
                            }
                        });
                        $("#ddlUserRO option").each(function (index, element) {
                            if (element.value == vUser) {
                                $(element).addClass('hideUserAdmin');
                                $(element).attr("disabled", true);
                            }
                        });
                        //$("#ddlUserFC option[value='" + vUser + "']").addClass('hideUserAdmin');
                        //$("#ddlUserC option[value='" + vUser + "']").addClass('hideUserAdmin');
                        //$("#ddlUserRO option[value='" + vUser + "']").addClass('hideUserAdmin');
                        var indexFC = vUserFC != null ? vUserFC.indexOf(vUser) : -1;
                        var indexC = vUserC != null ? vUserC.indexOf(vUser) : -1;
                        var indexRo = vUserRO != null ? vUserRO.indexOf(vUser) : -1;
                        if (indexFC > -1) {
                            vUserFC.splice(indexFC, 1);
                        }
                        if (indexC > -1) {
                            vUserC.splice(indexC, 1);
                        }
                        if (indexRo > -1) {
                            vUserRO.splice(indexRo, 1);
                        }
                    }
                    $('#ddlUserFC').val(vUserFC).trigger('chosen:updated');
                    $('#ddlUserC').val(vUserC).trigger('chosen:updated');
                    $('#ddlUserRO').val(vUserRO).trigger('chosen:updated');
                });
                $('#ddlUserRO').chosen().trigger("chosen:updated").change(function () {
                    var vUserFC = [];
                    $("#ddlUserFC option:selected").each(function () {
                        vUserFC.push($(this).text());
                    });
                    var vUserC = [];
                    $("#ddlUserC option:selected").each(function () {
                        vUserC.push($(this).text());
                    });
                    var vUserRO = [];
                    var vUserROD = [];
                    $("#ddlUserRO option:selected").each(function () {
                        if ($(this)[0].disabled) {
                            vUserROD.push($(this).text());
                        }
                        vUserRO.push($(this).text());
                    });
                    $("#ddlUserFC option").removeClass('hideUserRO');
                    $("#ddlUserFC option").attr("disabled", false);
                    $("#ddlUserC option").removeClass('hideUserRO');
                    $("#ddlUserC option").attr("disabled", false);
                    if (vUserRO == null || vUserRO == "" || vUserRO.length == 0)
                        $('#ddlUserRO').val('');
                    else
                        var vLength = vUserRO.length;
                    for (var i = 0; i < vLength; i++) {
                        var vUser = vUserRO[i];
                        $("#ddlUserFC option").each(function (index, element) {
                            if (element.value == vUser) {
                                $(element).addClass('hideUserRO');
                                $(element).attr("disabled", true);
                            }
                        });
                        $("#ddlUserC option").each(function (index, element) {
                            if (element.value == vUser) {
                                $(element).addClass('hideUserRO');
                                $(element).attr("disabled", true);
                            }
                        });
                        //$("#ddlUserFC option[value='" + vUser + "']").addClass('hideUserRO');
                        //$("#ddlUserC option[value='" + vUser + "']").addClass('hideUserRO');
                        var indexFC = vUserFC != null ? vUserFC.indexOf(vUser) : -1;
                        var indexC = vUserC != null ? vUserC.indexOf(vUser) : -1;
                        if (indexFC > -1) {
                            vUserFC.splice(indexFC, 1);
                        }
                        if (indexC > -1) {
                            vUserC.splice(indexC, 1);
                        }

                    }
                    var vUserArr = [];
                    $("#ddlBusinessAreaOwner option:selected").each(function () {
                        vUserArr.push($(this).text());
                    });
                    for (var i = 0; i < vUserROD.length; i++) {
                        var vUser = vUserROD[i];
                        if ($('#ddlBusinessAreaOwner option[value="' + vUser + '"]').length > 0)
                            $('#ddlBusinessAreaOwner option[value="' + vUser + '"]').remove();
                        if ($('#ddlUserFC option[value="' + vUser + '"]').length > 0)
                            $('#ddlUserFC option[value="' + vUser + '"]').remove();
                        if ($('#ddlUserC option[value="' + vUser + '"]').length > 0)
                            $('#ddlUserC option[value="' + vUser + '"]').remove();
                    }
                    $('#ddlBusinessAreaOwner').val(vUserArr).trigger('chosen:updated');
                    $('#ddlUserFC').val(vUserFC).trigger('chosen:updated');
                    $('#ddlUserC').val(vUserC).trigger('chosen:updated');

                });

                $('#ddlUserC').chosen().trigger("chosen:updated").change(function () {
                    var vUserFC = [];
                    $("#ddlUserFC option:selected").each(function () {
                        vUserFC.push($(this).text());
                    });
                    var vUserC = [];
                    var vUserCD = [];
                    $("#ddlUserC option:selected").each(function () {
                        if ($(this)[0].disabled) {
                            vUserCD.push($(this).text());
                        }
                        vUserC.push($(this).text());
                    });
                    var vUserRO = [];
                    $("#ddlUserRO option:selected").each(function () {
                        vUserRO.push($(this).text());
                    });
                    if (vUserC == null || vUserC == "" || vUserC.length == 0)
                        $('#ddlUserC').val('');
                    else
                        var vLength = vUserC.length;
                    $("#ddlUserFC option").removeClass('hideUserC');
                    $("#ddlUserFC option").attr("disabled", false);
                    $("#ddlUserRO option").removeClass('hideUserC');
                    $("#ddlUserRO option").attr("disabled", false);

                    for (var i = 0; i < vLength; i++) {
                        var vUser = vUserC[i];
                        $("#ddlUserFC option").each(function (index, element) {
                            if (element.value == vUser) {
                                $(element).addClass('hideUserC');
                                $(element).attr("disabled", true);
                            }
                        });
                        $("#ddlUserRO option").each(function (index, element) {
                            if (element.value == vUser) {
                                $(element).addClass('hideUserC');
                                $(element).attr("disabled", true);
                            }
                        });
                        //$("#ddlUserFC option[value='" + vUser + "']").addClass('hideUserC');
                        //$("#ddlUserRO option[value='" + vUser + "']").addClass('hideUserC');
                        var indexFC = vUserFC != null ? vUserFC.indexOf(vUser) : -1;
                        var indexRo = vUserRO != null ? vUserRO.indexOf(vUser) : -1;
                        if (indexFC > -1) {
                            vUserFC.splice(indexFC, 1);
                        }

                        if (indexRo > -1) {
                            vUserRO.splice(indexRo, 1);
                        }
                    }
                    var vUserArr = [];
                    $("#ddlBusinessAreaOwner option:selected").each(function () {
                        vUserArr.push($(this).text());
                    });
                    for (var i = 0; i < vUserCD.length; i++) {
                        var vUser = vUserCD[i];
                        if ($('#ddlBusinessAreaOwner option[value="' + vUser + '"]').length > 0)
                            $('#ddlBusinessAreaOwner option[value="' + vUser + '"]').remove();
                        if ($('#ddlUserFC option[value="' + vUser + '"]').length > 0)
                            $('#ddlUserFC option[value="' + vUser + '"]').remove();
                        if ($('#ddlUserRO option[value="' + vUser + '"]').length > 0)
                            $('#ddlUserRO option[value="' + vUser + '"]').remove();

                    }
                    $('#ddlBusinessAreaOwner').val(vUserArr).trigger('chosen:updated');
                    $('#ddlUserFC').val(vUserFC).trigger('chosen:updated');
                    $('#ddlUserRO').val(vUserRO).trigger('chosen:updated');

                });

                $('#ddlUserFC').chosen().trigger("chosen:updated").change(function () {
                    var vUserFC = [];
                    var vUserFCD = [];
                    $("#ddlUserFC option:selected").each(function () {
                        if ($(this)[0].disabled) {
                            vUserFCD.push($(this).text());
                        }
                        vUserFC.push($(this).text());
                    });
                    var vUserC = [];
                    $("#ddlUserC option:selected").each(function () {
                        vUserC.push($(this).text());
                    });
                    var vUserRO = [];
                    $("#ddlUserRO option:selected").each(function () {
                        vUserRO.push($(this).text());
                    });

                    if (vUserFC == null || vUserFC == "")
                        $('#ddlUserFC').val('');
                    else
                        var vLength = vUserFC.length;
                    $("#ddlUserRO option").removeClass('hideUserFC');
                    $("#ddlUserRO option").attr("disabled", false);
                    $("#ddlUserC option").removeClass('hideUserFC');
                    $("#ddlUserC option").attr("disabled", false);

                    for (var i = 0; i < vLength; i++) {
                        var vUser = vUserFC[i];
                        $("#ddlUserRO option").each(function (index, element) {
                            if (element.value == vUser) {
                                $(element).addClass('hideUserFC');
                                $(element).attr("disabled", true);
                            }
                        });
                        $("#ddlUserC option").each(function (index, element) {
                            if (element.value == vUser) {
                                $(element).addClass('hideUserFC');
                                $(element).attr("disabled", true);
                            }
                        });
                        //$("#ddlUserRO option[value='" + vUser + "']").addClass('hideUserFC');
                        //$("#ddlUserC option[value='" + vUser + "']").addClass('hideUserFC');
                        var indexC = vUserC != null ? vUserC.indexOf(vUser) : -1;
                        var indexRo = vUserRO != null ? vUserRO.indexOf(vUser) : -1;

                        if (indexC > -1) {
                            vUserC.splice(indexC, 1);
                        }
                        if (indexRo > -1) {
                            vUserRO.splice(indexRo, 1);
                        }
                    }
                    var vUserArr = [];
                    $("#ddlBusinessAreaOwner option:selected").each(function () {
                        vUserArr.push($(this).text());
                    });
                    $('#ddlBusinessAreaOwner').removeClass('hideUserFC');
                    for (var i = 0; i < vUserFCD.length; i++) {
                        var vUser = vUserFCD[i];
                        $('#ddlBusinessAreaOwner option[value="' + vUser + '"]').addClass('hideUserFC');
                        if ($('#ddlBusinessAreaOwner option[value="' + vUser + '"]').length > 0)
                            $('#ddlBusinessAreaOwner option[value="' + vUser + '"]').remove();
                        var indexC = vUserArr != null ? vUserArr.indexOf(vUser) : -1;

                        if (indexC > -1) {
                            vUserArr.splice(indexC, 1);
                        }
                    }
                    $('#ddlBusinessAreaOwner').val(vUserArr).trigger('chosen:updated');
                    $('#ddlUserRO').val(vUserRO).trigger('chosen:updated');
                    $('#ddlUserC').val(vUserC).trigger('chosen:updated');

                });
                $("#ddlCCUsers").chosen();
            }
        },
        error:
            function (dataUser) {
            }
    });
}

function GetContractType(areaname, controlname, values) {
    var url = "";
    if (typeof areaname == "undefined") {
        url = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contracttypesexcludecontractarea';
    } else {
        if (areaname == 'econtractsnewca' || areaname == 'alltypes')//if new contract area is being created get all document template
        {
            $("#loadingPage").fadeIn();
            url = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contracttypes';
        } else {
            url = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contracttypeswithcontractarea?contractarea=' + encodeURIComponent(areaname);
        }
    }

    $('#ddlContractType').empty();

    var vContractTypeList = '';
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            $(data).each(function (i, item) {
                var sContractType = item.ContractType;
                vContractTypeList += '<option value="' + sContractType + '">' + sContractType + '</option>';
            });

            $('#ddlContractType').append(vContractTypeList);
            $('#ddlContractType').chosen().trigger("chosen:updated");

            if (areaname != 'econtractsnewca') {
                GetValuesAndAutoPopulate(controlname, values)
            }
        },
        error:
            function (data) {
            },
        complete: function (data) {
            if (areaname == 'econtractsnewca') {
                $("#loadingPage").fadeOut();
            }
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

function deleteBusinessArea(obj) {
    swal({
        title: '',
        text: "Are you sure?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        html: true
    },
   function (confirmed) {
       if (confirmed) {
           $.ajax({
               async: false,
               url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea?businessareaid=' + obj.id,
               type: "DELETE",
               dataType: "json",
               headers: { 'eContracts-ApiKey': localStorage.APIKey },
               contentType: "application/json"
           }).done(function (data) {
               result = data;
           }).fail(function (data) {

               swal("", data.status + ": " + data.statusText);
           });
           location = "/General/BusinessAreas";
       }
       return;
   });


}

function GetFCUsers(businessareaid, inheritparent) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/usershavingcontrols?areapermission=Full&businessareaid=' + businessareaid,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            var veContractFeaturesReqType = JSON.parse(localStorage.getItem("eContractFeatures"));
            var vAccFeatADGroup = $.grep(veContractFeaturesReqType, function (n, i) {
                return (n.RowKey == "27" && n.Status == "ON");
            });
            if (vAccFeatADGroup.length > 0) {
                oReadonlyUsers = [];
                var oGroups = $.grep(oUsersandGroup, function (n, i) {
                    return (n.IsGroup == "Yes");
                });
                var oOnlyUsers = $.grep(oUsersandGroup, function (n, i) {
                    return (n.IsGroup != "Yes");
                });
                var oUserGroupsofFC = $.grep(oGroups, function (n, i) {
                    return (n.BusinessArea.split(";").indexOf($("#hdntxtBusinessAreaPath").val().trim()) != -1);
                });

                $(oUserGroupsofFC).each(function (i, item) {
                    if (item.GroupUsersInBytes != null) {
                        var strUsersXML = ConvertByteArrayToString(item.GroupUsersInBytes);
                        //var xmlDoc = $.parseXML(replacetoamp(strUsersXML));
                        //var $xml = $(xmlDoc);
                        var $contracttypemetadata = $.map(strUsersXML.trim().split(';'), function (value) { return value.trim(); });
                        //var $contracttypemetadata = $xml.find("User");
                        $.each($contracttypemetadata, function (a, itemname) {
                            var oUser = $.grep(oOnlyUsers, function (n, i) {
                                return (n.UserName.trim() == itemname.trim());
                            });
                            if (oUser.length > 0) {
                                if (oUser[0].IsPermissionCustomised != "Yes") {
                                    oReadonlyUsers.push(itemname.trim());
                                }
                            }

                            //if ($(this).find("IsPermissionCustomised")[0].textContent != "Yes") {
                            //    oReadonlyUsers.push(itemname.trim());
                            //}
                        });

                    }
                });
                oReadonlyUsers = ArrRemoveDupe(oReadonlyUsers);
            }
            else {
                oReadonlyUsers = [];
            }
            $("#hdntxtFullControlUsers").val("");
            if (vAccFeatADGroup.length > 0) {
                if (oReadonlyUsers.length > 0) {
                    if (data != "") {
                        GetValuesAndAutoPopulateAD('ddlUserFC', data, true, oReadonlyUsers)
                        $('#ddlUserFC').trigger("change");
                    }
                }
                else {
                    if (data != "") {
                        GetValuesAndAutoPopulate('ddlUserFC', data, true)
                        $('#ddlUserFC').trigger("change");
                    }
                }

            }
            else {
                if (data != "") {
                    GetValuesAndAutoPopulate('ddlUserFC', data, true)
                    $('#ddlUserFC').trigger("change");
                }
            }
            //GetValuesAndAutoPopulate('ddlUserFC', data)
            //$('#ddlUserFC').trigger("change");
            if (!inheritparent) {
                $("#hdntxtFullControlUsers").val(data);
            }
        }
    });
}

function GetCUsers(businessareaid, inheritparent) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/usershavingcontrols?areapermission=Contribute&businessareaid=' + businessareaid,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            var veContractFeaturesReqType = JSON.parse(localStorage.getItem("eContractFeatures"));
            var vAccFeatADGroup = $.grep(veContractFeaturesReqType, function (n, i) {
                return (n.RowKey == "27" && n.Status == "ON");
            });
            if (vAccFeatADGroup.length > 0) {
                oReadonlyUsers = [];
                var oGroups = $.grep(oUsersandGroup, function (n, i) {
                    return (n.IsGroup == "Yes");
                });
                var oOnlyUsers = $.grep(oUsersandGroup, function (n, i) {
                    return (n.IsGroup != "Yes");
                });
                var oUserGroupsofCC = $.grep(oGroups, function (n, i) {
                    return (n.BusinessAreaContribute.split(";").indexOf($("#hdntxtBusinessAreaPath").val().trim()) != -1);
                });

                $(oUserGroupsofCC).each(function (i, item) {
                    if (item.GroupUsersInBytes != null) {
                        var strUsersXML = ConvertByteArrayToString(item.GroupUsersInBytes);
                        //var xmlDoc = $.parseXML(replacetoamp(strUsersXML));
                        //var $xml = $(xmlDoc);
                        //var $contracttypemetadata = $xml.find("User");
                        var $contracttypemetadata = $.map(strUsersXML.trim().split(';'), function (value) { return value.trim(); });
                        $.each($contracttypemetadata, function (a, itemname) {
                            var oUser = $.grep(oOnlyUsers, function (n, i) {
                                return (n.UserName.trim() == itemname.trim());
                            });
                            if (oUser.length > 0) {
                                if (oUser[0].IsPermissionCustomised != "Yes") {
                                    oReadonlyUsers.push(itemname.trim());
                                }
                            }
                            //if ($(this).find("IsPermissionCustomised")[0].textContent != "Yes") {
                            //    oReadonlyUsers.push($(this).find("UserName")[0].textContent.trim());
                            //}
                        });

                    }
                });
                oReadonlyUsers = ArrRemoveDupe(oReadonlyUsers);
            }
            else {
                oReadonlyUsers = [];
            }

            $("#hdntxtContributeUsers").val("");
            if (vAccFeatADGroup.length > 0) {
                if (oReadonlyUsers.length > 0) {
                    if (data != "") {
                        GetValuesAndAutoPopulateAD('ddlUserC', data, true, oReadonlyUsers);
                        $('#ddlUserC').trigger("change");
                    }
                }
                else {
                    if (data != "") {
                        GetValuesAndAutoPopulate('ddlUserC', data, true);
                        $('#ddlUserC').trigger("change");
                    }
                }

            }
            else {
                if (data != "") {
                    GetValuesAndAutoPopulate('ddlUserC', data, true);
                    $('#ddlUserC').trigger("change");
                }
            }

            //GetValuesAndAutoPopulate('ddlUserC', data)
            //$('#ddlUserC').trigger("change");
            if (!inheritparent) {
                $("#hdntxtContributeUsers").val(data);
            }
        }
    });
}

function GetROUsers(businessareaid, inheritparent) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/usershavingcontrols?areapermission=Read&businessareaid=' + businessareaid,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            var veContractFeaturesReqType = JSON.parse(localStorage.getItem("eContractFeatures"));
            var vAccFeatADGroup = $.grep(veContractFeaturesReqType, function (n, i) {
                return (n.RowKey == "27" && n.Status == "ON");
            });
            if (vAccFeatADGroup.length > 0) {
                oReadonlyUsers = [];
                var oGroups = $.grep(oUsersandGroup, function (n, i) {
                    return (n.IsGroup == "Yes");
                });
                var oOnlyUsers = $.grep(oUsersandGroup, function (n, i) {
                    return (n.IsGroup != "Yes");
                });
                var oUserGroupsofRC = $.grep(oGroups, function (n, i) {
                    return (n.BusinessAreaRead.split(";").indexOf($("#hdntxtBusinessAreaPath").val().trim()) != -1);
                });

                $(oUserGroupsofRC).each(function (i, item) {
                    if (item.GroupUsersInBytes != null) {
                        var strUsersXML = ConvertByteArrayToString(item.GroupUsersInBytes);
                        //var xmlDoc = $.parseXML(replacetoamp(strUsersXML));
                        //var $xml = $(xmlDoc);
                        //var $contracttypemetadata = $xml.find("User");
                        var $contracttypemetadata = $.map(strUsersXML.trim().split(';'), function (value) { return value.trim(); });
                        $.each($contracttypemetadata, function (a, itemname) {
                            var oUser = $.grep(oOnlyUsers, function (n, i) {
                                return (n.UserName.trim() == itemname.trim());
                            });
                            if (oUser.length > 0) {
                                if (oUser[0].IsPermissionCustomised != "Yes") {
                                    oReadonlyUsers.push(itemname.trim());
                                }
                            }
                            //if ($(this).find("IsPermissionCustomised")[0].textContent != "Yes") {
                            //    oReadonlyUsers.push($(this).find("UserName")[0].textContent.trim());
                            //}
                        });

                    }
                });
                oReadonlyUsers = ArrRemoveDupe(oReadonlyUsers);
            }
            else {
                oReadonlyUsers = [];
            }

            $("#hdntxtReadOnlyUsers").val("");
            if (vAccFeatADGroup.length > 0) {
                if (oReadonlyUsers.length > 0) {
                    if (data != "") {
                        GetValuesAndAutoPopulateAD('ddlUserRO', data, true, oReadonlyUsers);
                        $('#ddlUserRO').trigger("change");
                    }
                }
                else {
                    if (data != "") {
                        GetValuesAndAutoPopulate('ddlUserRO', data, true);
                        $('#ddlUserRO').trigger("change");
                    }
                }

            }
            else {
                if (data != "") {
                    GetValuesAndAutoPopulate('ddlUserRO', data, true);
                    $('#ddlUserRO').trigger("change");
                }
            }
            //GetValuesAndAutoPopulate('ddlUserRO', data)
            //$('#ddlUserRO').trigger("change");
            if (!inheritparent) {
                $("#hdntxtReadOnlyUsers").val(data);
            }
        }
    });
}
var oReadonlyUsers = [];
function contextMenuWork(action, el, pos) {
    switch (action) {
        case "add":
            {
                $("#trAdminOwner").css("display", "");
                $("#ddlBusinessAreaOwner").addClass('validmultiselect');
                $("#txtBusinessAreaName").removeAttr("readonly");
                $("#divUserAccess").css("display", "");
                $("#tblUserAccess").css("display", "");
                $("#loadingPage").fadeIn();
                $('#txtRowKey').val($(el).find("#RowKey").text());
                $("#hdntxtContractAreaName").val($(el).find("#ContractArea").text());
                ShowBusinessArea('add');

                $(".validelement").each(function (index, element) {
                    $(element).removeClass("error");
                    $("#errormsg_" + element.id).remove();
                });

                $("#aAdd").css("display", "block");
                $("#aUpdate").css("display", "none");

                $("#txtAction").val("Add");
                $("#hdntxtParent").val($(el).find("#elBusinessArea").text())
                $("#hdntxtParentID").val($(el).find("#RowKey").text())

                CleanForm();


                $("#dialogEdit").dialog("open");

                break;
            }
        case "edit":
            {
                $("#trAdminOwner").css("display", "");
                $("#ddlBusinessAreaOwner").addClass('validmultiselect');
                //$("#txtBusinessAreaName").attr("readonly", "readonly");  
                // $("#txtBusinessAreaNameAbbreviation").attr("readonly", "readonly");
                $("#loadingPage").fadeIn();
                $("#hdntxtContractAreaName").val($(el).find("#ContractArea").text());

                $(".validelement").each(function (index, element) {
                    $(element).removeClass("error");
                    $("#errormsg_" + element.id).remove();
                });

                $('#txtRowKey').val($(el).find("#RowKey").text());

                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea?businessareaid=' + $('#txtRowKey').val(),
                    type: 'GET',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    success: function (data) {
                        CleanForm();
                        $("#txtDescription").val(data.Description);

                        $("#ddlCurrency option[value='" + data.Currency + "']").attr("selected", "selected");
                        //$("#ddlLegalEntity option").filter(function (index) { return $(this).text() === data.LegalEntity; }).prop('selected', true);
                        $("#txtLegalEntity").val(data.LegalEntity); // Added for bug(eO37116)

                        $("#txtDocLibName").val(data.DocLibName);
                        //if (data.DocLibName == "") {
                        //    $("#txtDocLibName").val(data.BusinessAreaName + ' Contract Documents');
                        //    $("#txtDocLibName").removeAttr('disabled');

                        //}
                        //else {
                        //    $("#txtDocLibName").attr('disabled', 'disabled');
                        //}

                        $("input:radio[name=ContractNumber][value='" + data.ContractNumbering + "']").attr('checked', 'checked');
                        if (data.ContractNumbering != null && data.ContractNumbering != "" && data.ContractNumbering == "Auto-NonEdit") {
                            $("#lblautogenerate").css("display", "");
                        } else {
                            $("#lblautogenerate").css("display", "none");
                        }
                        if (data.InheritFromParent != null) {
                            if (data.InheritFromParent == "Yes") {
                                $('#chkInheritAllUser').prop('checked', true); // true
                            }
                        }
                        $('#txtParentID').val(data.ParentBusinessAreaID);

                        $("#aUpdate").css("display", "block");
                        $("#aAdd").css("display", "none");

                        $("#txtAction").val("Edit");
                        $("#btnBussAreaEdit").html('<span class="ui-button-text">Save</span>')
                        $("#txtBusinessAreaName").val(data.BusinessAreaName);
                        $("#txtBusinessAreaNameAbbreviation").val(data.Abbreviation);
                        $("#hdntxtBusinessAreaName").val(data.BusinessAreaName);



                        //if selected item is contract area
                        if (data.ParentBusinessAreaID == "0") {
                            vEdit = "ContractArea"
                            ShowContractArea();

                            if (data.DocLibCreation == "ContractArea") {
                                $("input[value='" + data.DocLibCreation + "']").prop('checked', true);
                                if (data.DocLibName == "") {
                                    $("#txtDocLibName").val(data.BusinessAreaName + ' Contract Documents');
                                    $("#txtDocLibName").removeAttr('disabled');
                                }
                                else {
                                    $("#txtDocLibName").attr('disabled', 'disabled');
                                }
                            }
                            else {
                                $("#txtDocLibName").val(data.BusinessAreaName + ' Contract Documents');
                                $("input[value='" + data.DocLibCreation + "']").prop('checked', true);
                                $('#trDocLibName').css('display', 'none');
                                $('#trDocLibName').find(':input').removeClass("validelement error");
                            }

                            var veContractFeaturesReqType = JSON.parse(localStorage.getItem("eContractFeatures"));
                            var vAccFeatADGroup = $.grep(veContractFeaturesReqType, function (n, i) {
                                return (n.RowKey == "27" && n.Status == "ON");
                            });
                            if (vAccFeatADGroup.length > 0) {
                                oReadonlyUsers = [];
                                var oGroups = $.grep(oUsersandGroup, function (n, i) {
                                    return (n.IsGroup == "Yes");
                                });
                                var oOnlyUsers = $.grep(oUsersandGroup, function (n, i) {
                                    return (n.IsGroup != "Yes");
                                });
                                var oUserGroupsofCA = $.grep(oGroups, function (n, i) {
                                    return (n.OwnerOfContractAreas.split(";").indexOf(data.BusinessAreaName.trim()) != -1);
                                });

                                $(oUserGroupsofCA).each(function (i, item) {
                                    if (item.GroupUsersInBytes != null) {
                                        var strUsersXML = ConvertByteArrayToString(item.GroupUsersInBytes);
                                        var $contracttypemetadata = $.map(strUsersXML.trim().split(';'), function (value) { return value.trim(); });
                                        $.each($contracttypemetadata, function (a, itemname) {
                                            var oUser = $.grep(oOnlyUsers, function (n, i) {
                                                return (n.UserName.trim() == itemname.trim());
                                            });
                                            if (oUser.length > 0) {
                                                if (oUser[0].IsPermissionCustomised != "Yes") {

                                                    oReadonlyUsers.push(itemname.trim());
                                                }
                                            }
                                        });


                                        //var xmlDoc = $.parseXML(replacetoamp(strUsersXML));
                                        //var $xml = $(xmlDoc);
                                        //var $contracttypemetadata = $xml.find("User");
                                        //$contracttypemetadata.each(function () {
                                        //    if ($(this).find("IsPermissionCustomised")[0].textContent != "Yes") {
                                        //        oReadonlyUsers.push($(this).find("UserName")[0].textContent.trim());
                                        //    }
                                        //});

                                    }
                                });
                                oReadonlyUsers = ArrRemoveDupe(oReadonlyUsers);
                            }
                            else {
                                oReadonlyUsers = [];
                            }
                            if (vAccFeatADGroup.length > 0) {
                                if (oReadonlyUsers.length > 0) {
                                    GetValuesAndAutoPopulateAD('ddlBusinessAreaOwner', data.Owner, true, oReadonlyUsers);
                                    $('#ddlBusinessAreaOwner').trigger("change");
                                }
                                else {
                                    GetValuesAndAutoPopulate('ddlBusinessAreaOwner', data.Owner, true);
                                    $('#ddlBusinessAreaOwner').trigger("change");
                                }

                            }
                            else {
                                GetValuesAndAutoPopulate('ddlBusinessAreaOwner', data.Owner, true);
                                $('#ddlBusinessAreaOwner').trigger("change");
                            }



                            $("#dialogEdit").dialog("option", "title", "Edit Contract Area (Control Panel)");

                            $("#imgNameHelp1").attr("title", "Enter the name of the new Contract Area to be created.");
                            $("#imgNameHelp1abb").attr("title", "Enter the name of the  Abbreviation to be created.");
                            $("#imgNameHelp2").attr("title", "Select the Contract Area Administrator(s) from the list.");
                            $("#imgNameHelp3").attr("title", "Enter Description for the new Contract Area.");
                            $("#imgNameHelp4").attr("title", "Select the legal entity from the list who is responsible for signing the contract.");
                            $("#imgNameHelp5").attr("title", "Currency of Legal Entity.");
                            $("#imgNameHelp6").attr("title", "Select for assigning manual contract number.");
                            $("#imgNameHelp7").attr("title", "Select to generate contract number automatically for all Contracts. Generated contract number cannot be edited.");
                            $("#imgNameHelp8").attr("title", "Select to generate contract number automatically on demand for all Contracts. Generated contract number can be edited.");
                            $("#imgNameHelp9").attr("title", "Select to generate contract number automatically on demand for all Contracts.");
                            $("#imgNameHelp10").attr("title", "Select the required type of Contract from the list or Add New Contract Type.");
                            $("#imgNameHelp11").attr("title", "Select the required type of Request from the list or Add New Request Type.");
                            $("#imgNameHelp12").attr("title", "Select the required Document template from the list or Add New Document Template.");
                            $("#imgNameHelp13").attr("title", "Select the required type of Document from the list or Add New Document Type.");
                            GetDocumentTypes('alldoctypes', 'ddlDocTypes', data.DocumentTypes);
                            GetTemplates('alltemplates', 'ddlDocTemplates', data.DocumentTemplates);
                            GetContractType('alltypes', 'ddlContractType', data.ContractType);
                            GetRequestType('allrequesttypes', 'ddlRequestType', data.RequestType);

                            if (!vContractAutoNumberEnabled) {
                                $('input[type="radio"][name="ContractNumber"][value="Auto-NonEdit"]').prop('disabled', true);
                                $('input[type="radio"][name="ContractNumber"][value="Auto"]').prop('disabled', true);
                                $("#pAutoNumber").css("display", "");
                            }

                            $("input:radio[name=docversion][value='" + data.DocVersion + "']").attr('checked', 'checked');
                            //$("input:radio[name=doccheckout][value='" + data.DocCheckout + "']").attr('checked', 'checked');
                            $("input:radio[name=docdefaultview][value='" + data.DocDefaultView + "']").attr('checked', 'checked');
                            //$("input:radio[name=docuploadexternal][value='" + data.DocUploadExternal + "']").attr('checked', 'checked');
                            $("input:radio[name=docsecurity][value='" + data.DocSecurity + "']").attr('checked', 'checked');

                            if ($('input:radio[name=docversion]:checked').val() == "All") {
                                $("input[name=docsecurity]").attr('disabled', false);
                            } else {
                                $("#chkdocRead").attr('checked', 'checked');
                                $("input[name=docsecurity]").attr('disabled', true);
                            }
                        } else { //it is a business area
                            vEdit = "BusinessArea"
                            ShowBusinessArea('edit');
                            GetValuesAndAutoPopulate('ddlCCUsers', data.CCUsers, true);
                            GetFCUsers(data.RowKey, false);
                            GetCUsers(data.RowKey, false);
                            GetROUsers(data.RowKey, false);
                            var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
                            var vAccFeatADGroup = $.grep(veContractFeatures, function (n, i) {
                                return (n.RowKey == "27" && n.Status == "ON");
                            });
                            var vAccFeat = $.grep(veContractFeatures, function (n, i) {
                                return (n.RowKey == "8" && n.Status == "ON");
                            });
                            if (vAccFeat.length > 0) {
                                $("#divWorkflows").css("display", "");
                                $("#tblWorkflows").css("display", "");
                                GetWorkflows($("#hdntxtContractAreaName").val(), data.BusinessAreaName);
                            } else {
                                $("#divWorkflows").css("display", "none");
                                $("#tblWorkflows").css("display", "none");
                            }

                            $.ajax({
                                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/businessarealocation?businessareaid=' + $('#txtRowKey').val(),
                                type: 'GET',
                                dataType: 'json',
                                headers: { 'eContracts-ApiKey': localStorage.APIKey },
                                success: function (businessareapath) {
                                    if (vAccFeatADGroup.length > 0) {
                                        oReadonlyUsers = [];
                                        var oGroups = $.grep(oUsersandGroup, function (n, i) {
                                            return (n.IsGroup == "Yes");
                                        });
                                        var oOnlyUsers = $.grep(oUsersandGroup, function (n, i) {
                                            return (n.IsGroup != "Yes");
                                        });
                                        var oUserGroupsofBA = $.grep(oGroups, function (n, i) {
                                            return (n.OwnerOfBusinessAreas.split(";").indexOf(businessareapath.trim()) != -1);
                                        });
                                        $(oUserGroupsofBA).each(function (i, item) {
                                            if (item.GroupUsersInBytes != null) {
                                                var strUsersXML = ConvertByteArrayToString(item.GroupUsersInBytes);

                                                var $contracttypemetadata = $.map(strUsersXML.trim().split(';'), function (value) { return value.trim(); });
                                                $.each($contracttypemetadata, function (a, itemname) {
                                                    var oUser = $.grep(oOnlyUsers, function (n, i) {
                                                        return (n.UserName.trim() == itemname.trim());
                                                    });
                                                    if (oUser.length > 0) {
                                                        if (oUser[0].IsPermissionCustomised != "Yes") {
                                                            oReadonlyUsers.push(itemname.trim());
                                                        }
                                                    }
                                                });

                                                //var xmlDoc = $.parseXML(replacetoamp(strUsersXML));
                                                //var $xml = $(xmlDoc);
                                                //var $contracttypemetadata = $xml.find("User");
                                                //$contracttypemetadata.each(function () {
                                                //    if ($(this).find("IsPermissionCustomised")[0].textContent != "Yes") {
                                                //        oReadonlyUsers.push($(this).find("UserName")[0].textContent.trim());
                                                //    }
                                                //});

                                            }
                                        });
                                        oReadonlyUsers = ArrRemoveDupe(oReadonlyUsers);
                                        GetValuesAndAutoPopulateAD('ddlBusinessAreaOwner', data.Owner, true, oReadonlyUsers);
                                        $('#ddlBusinessAreaOwner').trigger("change");
                                    }
                                    else {
                                        oReadonlyUsers = [];
                                        GetValuesAndAutoPopulate('ddlBusinessAreaOwner', data.Owner, true);
                                        $('#ddlBusinessAreaOwner').trigger("change");
                                    }

                                    $('#baLocation').html(businessareapath)
                                    $("#hdntxtBusinessAreaPath").val(businessareapath)

                                    GetFCUsers(data.RowKey, false);
                                    GetCUsers(data.RowKey, false);
                                    GetROUsers(data.RowKey, false);

                                    $("#loadingPage").fadeOut();
                                },
                                error: function (businessareapath) {
                                    $("#loadingPage").fadeOut();
                                }
                            });

                            $("#dialogEdit").dialog("option", "title", "Edit Business Area");
                            $("#imgNameHelp1").attr("title", "Enter the name of the new Business Area to be created.");
                            $("#imgNameHelp1abb").attr("title", "Enter the name of the  Abbreviation to be created.");
                            $("#imgNameHelp2").attr("title", "Select the Business Area Owner(s) from the list.");
                            $("#imgNameHelp3").attr("title", "Enter Description for the new Business Area.");
                            $("#imgNameHelp14").attr("title", "Select user(s) from the dropdown to provide different level of permission to access the Business Area.");
                            $("#imgNameHelp15").attr("title", "Select the existing Contract Record Approval Workflow from the list.");
                            $("#imgNameHelp16").attr("title", "Select the existing Renewal Approval Workflow from the list.");
                            $("#imgNameHelp17").attr("title", "Select the existing Document Review Workflow from the list.");
                            $("#imgNameHelp18").attr("title", "Select the existing Request Approval Workflow from the list.");
                            $("#imgNameHelp19").attr("title", "Manage the existing Contract Record Approval Workflow / Create new Contract Record Approval Workflow.");
                            $("#imgNameHelp20").attr("title", "Manage the existing Renewal Approval Workflow / Create new Renewal Approval Workflow.");
                            $("#imgNameHelp21").attr("title", "Manage existing Document Review Workflow / Create new Document Review Workflow.");
                            $("#imgNameHelp18").attr("title", "Select the existing Request Approval Workflow from the list.");
                            $("#imgNameHelp22").attr("title", "Manage existing Request Approval Workflow / Create new Request Approval Workflow.");
                            $("#imgNameHelp23").attr("title", "Select the existing Amendment Approval Workflow from the list.");
                            $("#imgNameHelp24").attr("title", "Manage existing Amendment Approval Workflow / Create new Amendment Approval Workflow.");
                        }
                        //GetValuesAndAutoPopulate('ddlBusinessAreaOwner', data.Owner);
                        //$('#ddlBusinessAreaOwner').trigger("change");
                        $("#hdntxtBusinessAreaOwner").val(data.Owner);
                        //Get parent details
                        $.ajax({
                            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea?businessareaid=' + data.ParentBusinessAreaID,
                            type: 'GET',
                            dataType: 'json',
                            headers: { 'eContracts-ApiKey': localStorage.APIKey },
                            success: function (data1) {
                                $("#hdntxtParent").val(data1.BusinessAreaName)
                                $("#hdntxtParentID").val(data1.RowKey)
                            }
                        });
                    },
                    error: function (data) {
                        // $("#loadingPage").fadeOut();
                    },
                    complete: function (data) {
                        $("#loadingPage").fadeOut();
                        $("#dialogEdit").dialog("open");
                        // $("#divUserAccess").css("display", "none");
                        // $("#tblUserAccess").css("display", "none");
                    }
                });

                break;
            }
        case "delete":
            {
                var rowkey = $(el).find("#RowKey").text();
                swal({
                    title: '',
                    text: "Are you sure you want <span style=\"font-weight:700\">delete</span> child business area?",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    html: true
                },
    function (confirmed) {
        if (confirmed) {
            $("#deletingPage").fadeIn();
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea?businessareaid=' + rowkey,
                type: "DELETE",
                dataType: "json",
                headers: { 'eContracts-ApiKey': localStorage.APIKey },
                contentType: "application/json"
            }).done(function (data) {

                location = "/General/BusinessAreas";
            }).fail(function (data) {

                swal("", data.status + ": " + data.statusText);
            });
        }
        return;
    });


                break;
            }
    }
}

function contextMenuWorkGeneral(action, el, pos) {
    switch (action) {
        case "edit":
            {
                $("#trAdminOwner").css("display", "");
                $("#ddlBusinessAreaOwner").addClass('validmultiselect');
                $("#txtBusinessAreaName").attr("readonly", "readonly");

                $("#loadingPage").fadeIn();
                $("#hdntxtContractAreaName").val($(el).find("#ContractArea").text());

                $(".validelement").each(function (index, element) {
                    $(element).removeClass("error");
                    $("#errormsg_" + element.id).remove();
                });

                $('#txtRowKey').val($(el).find("#RowKey").text());

                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea?businessareaid=' + $('#txtRowKey').val(),
                    type: 'GET',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    success: function (data) {
                        CleanForm();
                        $("#txtDescription").val(data.Description);

                        $("#ddlCurrency option[value='" + data.Currency + "']").attr("selected", "selected");
                        //$("#ddlLegalEntity option[value='" + data.LegalEntity + "']").attr("selected", "selected");
                        $("#txtLegalEntity").val(data.LegalEntity); // Added for bug(eO37116)
                        $("#txtDocLibName").val(data.DocLibName);
                        //if (data.DocLibName == "") {
                        //    $("#txtDocLibName").val(data.BusinessAreaName + ' Contract Documents');
                        //    $("#txtDocLibName").removeAttr('disabled');
                        //}
                        //else {
                        //    $("#txtDocLibName").attr('disabled', 'disabled');
                        //}
                        $("input:radio[name=ContractNumber][value='" + data.ContractNumbering + "']").attr('checked', 'checked');
                        if (data.InheritFromParent != null) {
                            if (data.InheritFromParent == "Yes") {
                                $('#chkInheritAllUser').prop('checked', true); // true
                            }
                        }
                        $('#txtParentID').val(data.ParentBusinessAreaID);

                        $("#aUpdate").css("display", "block");
                        $("#aAdd").css("display", "none");

                        $("#txtAction").val("Edit");

                        $("#txtBusinessAreaName").val(data.BusinessAreaName);
                        $("#hdntxtBusinessAreaName").val(data.BusinessAreaName);

                        GetValuesAndAutoPopulate('ddlBusinessAreaOwner', data.Owner);
                        $("#hdntxtBusinessAreaOwner").val(data.Owner);

                        //if selected item is contract area
                        if (data.ParentBusinessAreaID == "0") {
                            ShowContractArea();

                            if (data.DocLibCreation == "ContractArea") {
                                $("input[value='" + data.DocLibCreation + "']").prop('checked', true);
                                if (data.DocLibName == "") {
                                    $("#txtDocLibName").val(data.BusinessAreaName + ' Contract Documents');
                                    $("#txtDocLibName").removeAttr('disabled');
                                }
                                else {
                                    $("#txtDocLibName").attr('disabled', 'disabled');
                                }
                            }
                            else {
                                $("#txtDocLibName").val(data.BusinessAreaName + ' Contract Documents');
                                $("input[value='" + data.DocLibCreation + "']").prop('checked', true);
                                $('#trDocLibName').css('display', 'none');
                                $('#trDocLibName').find(':input').removeClass("validelement error");
                            }

                            $("#dialogEdit").dialog("option", "title", "Edit Contract Area (Control Panel)");

                            GetDocumentTypes(data.BusinessAreaName, 'ddlDocTypes', data.DocumentTypes);
                            GetTemplates(data.BusinessAreaName, 'ddlDocTemplates', data.DocumentTemplates);
                            GetContractType(data.BusinessAreaName, 'ddlContractType', data.ContractType);

                            $("input:radio[name=docversion][value='" + data.DocVersion + "']").attr('checked', 'checked');
                            //$("input:radio[name=doccheckout][value='" + data.DocCheckout + "']").attr('checked', 'checked');
                            $("input:radio[name=docdefaultview][value='" + data.DocDefaultView + "']").attr('checked', 'checked');
                            //$("input:radio[name=docuploadexternal][value='" + data.DocUploadExternal + "']").attr('checked', 'checked');
                            $("input:radio[name=docsecurity][value='" + data.DocSecurity + "']").attr('checked', 'checked');

                            if ($('input:radio[name=docversion]:checked').val() == "All") {
                                $("input[name=docsecurity]").attr('disabled', false);
                            } else {
                                $("#chkdocRead").attr('checked', 'checked');
                                $("input[name=docsecurity]").attr('disabled', true);
                            }


                        } else { //it is a business area
                            ShowBusinessArea('edit');
                            GetValuesAndAutoPopulate('ddlCCUsers', data.CCUsers, true);
                            GetFCUsers(data.RowKey, false);
                            GetCUsers(data.RowKey, false);
                            GetROUsers(data.RowKey, false);
                            GetWorkflows($("#hdntxtContractAreaName").val(), data.BusinessAreaName);

                            $("#dialogEdit").dialog("option", "title", "Edit Business Area");
                        }

                        //Get parent details
                        $.ajax({
                            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea?businessareaid=' + data.ParentBusinessAreaID,
                            type: 'GET',
                            dataType: 'json',
                            headers: { 'eContracts-ApiKey': localStorage.APIKey },
                            success: function (data1) {
                                $("#hdntxtParent").val(data1.BusinessAreaName)
                                $("#hdntxtParentID").val(data1.RowKey)
                            }
                        });
                    },
                    error: function (data) {

                    },
                    complete: function (data) {
                        $("#loadingPage").fadeOut();
                        $("#dialogEdit").dialog("open");
                        $("#divUserAccess").css("display", "none");
                        $("#tblUserAccess").css("display", "none");
                    }
                });

                break;
            }
    }
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

function GetCurrencies(selectedcurrency) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/currencies',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            var datalenght = data.length;
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];
                if (selectedcurrency == item.Abbreviation) {
                    $("#ddlCurrency").append("<option selected value='" + item.Abbreviation + "'>" + item.Abbreviation + "</option>")
                }
                else {
                    $("#ddlCurrency").append("<option value='" + item.Abbreviation + "'>" + item.Abbreviation + "</option>")
                }
            }
        }
    });
}

function GetLegalEntities(selectedentity) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/legalentities',
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            $(data).each(function (i, item) {

                if (selectedentity == item.LegalEntityName) {
                    $("#ddlLegalEntity").append("<option selected value='" + item.LegalEntityName + "'>" + item.LegalEntityName + "</option>")
                } else {
                    $("#ddlLegalEntity").append("<option value='" + item.LegalEntityName + "'>" + item.LegalEntityName + "</option>")
                }
            });
        }
    });
}

function GetTemplates(areaname, controlname, values) {
    var url = "";

    if (typeof areaname == "undefined") {
        url = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/templatedocumentsexcludecontractarea';
    } else {
        if (areaname == 'econtractsnewca' || areaname == 'alltemplates')//if new contract area is being created get all document template
        {
            $("#loadingPage").fadeIn();
            url = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/templatedocuments';
        } else {
            url = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/templatedocumentswithcontractarea?contractarea=' + encodeURIComponent(areaname);
        }
    }
    $("#ddlDocTemplates").empty();
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (templates) {
            var datalenght = templates.length;
            for (var i = 0; i < datalenght; i++) {
                var item = templates[i];
                $("#ddlDocTemplates").append("<option value='" + item.TemplateName + "'>" + item.TemplateName + "</option>");
            }

            $('#ddlDocTemplates').chosen().trigger("chosen:updated");
            if (areaname != 'econtractsnewca') {
                GetValuesAndAutoPopulate(controlname, values)
            }
        },
        error:
            function (data) {
                $('#ddlDocTemplates').chosen().trigger("chosen:updated");
            },
        complete: function (data) {
            if (areaname == 'econtractsnewca') {
                $("#loadingPage").fadeOut();
            }
        }
    });
}

function GetDocumentTypes(areaname, controlname, values) {
    var url = "";

    if (typeof areaname == "undefined") {
        url = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documenttypesexcludecontractarea';
    } else {
        if (areaname == 'econtractsnewca' || areaname == 'alldoctypes')//if new contract area is being created get all document types
        {
            $("#loadingPage").fadeIn();
            url = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documenttypes';
        } else {
            url = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documenttypeswithcontractarea?contractarea=' + encodeURIComponent(areaname);
        }
    }

    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (documenttypes) {
            $("#ddlDocTypes").empty();
            $("#ddlDocumentType").empty();

            var datalenght = documenttypes.length;
            for (var i = 0; i < datalenght; i++) {
                var item = documenttypes[i];
                $("#ddlDocTypes").append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>")

                $("#ddlDocumentType").append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>")
            }

            $('#ddlDocTypes').chosen().trigger("chosen:updated");

            if (areaname != 'econtractsnewca') {
                GetValuesAndAutoPopulate(controlname, values)
            }
        },
        error:
            function (data) {
            },
        complete: function (data) {
            if (areaname == 'econtractsnewca') {
                $("#loadingPage").fadeOut();
            }
        }
    });
}

function ShowContractArea() {
    $('#divUserAccess').css('display', 'none');
    $('#tblUserAccess').css('display', 'none');

    $('#divDocSign').css('display', 'none');
    $('#tblDocSign').css('display', 'none');

    $('#divWorkflows').css('display', 'none');
    $('#tblWorkflows').css('display', 'none');
    $('#divAlerts').css('display', 'none');

    $('#divDefaultProperties').css('display', '');
    $('#divNumbering').css('display', '');
    $('#divContractTypes').css('display', '');
    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
    var vAccFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "7" && n.Status == "ON");
    });
    if (vAccFeat.length > 0) {
        $('#divDocTemplates').css('display', '');
    }
    $('#divDocTypes').css('display', '');

    $("#tblDefaultProperties").css("display", "");
    var imgObj = $("#imgDefault");
    imgObj.attr("title", "Collapse");
    imgObj.attr("src", "../Content/Images/dp-dup.png");

    $("#tblNumbering").css("display", "none");
    imgObj = $("#imgNumbering");
    imgObj.attr("title", "Expand");
    imgObj.attr("src", "../Content/Images/dp-ddown.png");

    $("#spnContractTypes").css("display", "");
    imgObj = $("#imgContractTypes");
    imgObj.attr("title", "Collapse");
    imgObj.attr("src", "../Content/Images/dp-dup.png");


    vAccFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "12" && n.Status == "ON");
    });
    if (vAccFeat.length > 0) {
        $('#divRequestTypes').css('display', '');
        $("#spnRequestTypes").css("display", "");
        imgObj = $("#imgRequestTypes");
        imgObj.attr("title", "Collapse");
        imgObj.attr("src", "../Content/Images/dp-dup.png");
        $("#ddlRequestType").addClass('validmultiselect');
    } else {
        $("#ddlRequestType").removeClass('validmultiselect');
        $("#spnRequestTypes").css("display", "none");
        imgObj = $("#imgRequestTypes");
        imgObj.attr("title", "Expand");
        imgObj.attr("src", "../Content/Images/dp-ddown.png");
    }

    $("#spnDocTemplates").css("display", "");
    //imgObj = $("#imgTemplates");
    //imgObj.attr("title", "Expand");
    //imgObj.attr("src", "../Content/Images/dp-ddown.png");

    $("#spnDocTypes").css("display", "");
    imgObj = $("#imgDocTypes");
    imgObj.attr("title", "Collapse");
    imgObj.attr("src", "../Content/Images/dp-dup.png");


    $("#ddlContractType").addClass('validmultiselect');
    $("#ddlDocTypes").addClass('validmultiselect');
    $("#ddlCurrency").addClass('validelement');
    //$("#ddlLegalEntity").addClass('validelement');
    $("#txtLegalEntity").addClass('validelement'); // Added for bug(eO37116)
    //$("#txtDocLibName").addClass('validelement');

    $(".validelement").each(function (index, element) {
        $(element).removeClass("error");
        $("#errormsg_" + element.id).remove();
    });
    $(".validmultiselect").each(function (index, element) {
        $(element).parent().children('div').children('ul').removeClass("error");
        $("#errormsg_" + element.id).remove();
    });

    $("#dialogEdit").dialog("option", "title", "New Contract Area (Control Panel)");
    $('#titleMain').html('Contract Area Name');
    $('#titleMainabb').html('Abbreviation');
    $('#txtBusinessAreaName').attr('title', 'Contract Area Name');
    $('#txtBusinessAreaNameAbbreviation').attr('title', 'Abbreviation');

    $('#formOwner').html('Administrator');
    $('#baLocation').html("");
    var vDocLibFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "14" && n.Status == "ON");
    });

    if (vDocLibFeat.length > 0) {
        $("#tblDocLibraryProperties").css("display", "");
        $("#divDocLibraryProperties").css("display", "");
        $("#trDocLibName").css("display", "");
        //$('#trDocLibArea').css("display", "");//Business Area Level Library Creation
        $("input[value='ContractArea']").prop('checked', true);//Business Area Level Library Creation
    }
    else {
        $("#tblDocLibraryProperties").css("display", "none");
        $("#divDocLibraryProperties").css("display", "none");
        $("#trDocLibName").css("display", "none");
        //$('#trDocLibArea').css("display", "none");//Business Area Level Library Creation
    }

    $('#ddlBusinessAreaOwner').html(vContractAreaAdmins);
    $('#ddlBusinessAreaOwner').chosen().trigger("chosen:updated");
    $('#ddlBusinessAreaOwner').trigger("change");
}

function ShowBusinessArea(menuclick) {
    $("#ddlRequestType").removeClass('validmultiselect');
    $("#ddlContractType").removeClass('validmultiselect');
    $("#ddlDocTypes").removeClass('validmultiselect');
    $("#ddlCurrency").removeClass('validelement');
    $("#txtLegalEntity").removeClass('validelement'); // Added for bug(eO37116)
    //$("#ddlLegalEntity").removeClass('validelement');
    $("#txtDocLibName").removeClass('validelement');
    $("#txtDocLibName").removeClass('error');

    //
    $('#divUserAccess').css('display', '');
    $('#tblUserAccess').css('display', '');

    $('#divDocSign').css('display', '');
    $('#tblDocSign').css('display', '');

    $('#divWorkflows').css('display', '');
    $('#tblWorkflows').css('display', '');
    $('#divAlerts').css('display', '');

    $('#divDefaultProperties').css('display', 'none');
    $('#tblDefaultProperties').css('display', 'none');

    $('#divNumbering').css('display', 'none');
    $('#tblNumbering').css('display', 'none');

    $('#divContractTypes').css('display', 'none');
    $('#spnContractTypes').css('display', 'none');

    $('#divRequestTypes').css('display', 'none');
    $('#spnRequestTypes').css('display', 'none');

    $('#divDocTemplates').css('display', 'none');
    $('#spnDocTemplates').css('display', 'none');

    $('#divDocTypes').css('display', 'none');
    $('#spnDocTypes').css('display', 'none');


    $('#ddlBusinessAreaOwner').html(vBusinessAreaOwners);
    $('#ddlBusinessAreaOwner').chosen().trigger("chosen:updated");
    $('#ddlBusinessAreaOwner').trigger("change");

    $("#loadingPage").fadeIn();
    //Get business area location
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/businessarealocation?businessareaid=' + $('#txtRowKey').val(),
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            $('#baLocation').html(data)
            $("#hdntxtBusinessAreaPath").val(data)
            var arr = data.split('>')
            if (menuclick == "edit") {
                if (arr.length > 2) {
                    $('#chkInheritAllUser').removeAttr('disabled');
                    $('#chkInheritAllUser').css('display', '');
                    $('#chkInheritAllUserLabel').css('display', '');
                } else {
                    $('#chkInheritAllUser').attr('disabled', 'disabled');
                    $('#chkInheritAllUser').css('display', 'none');
                    $('#chkInheritAllUserLabel').css('display', 'none');
                }
            } else {//menu click is add
                if (arr.length >= 2) {
                    $('#chkInheritAllUser').removeAttr('disabled');
                    $('#chkInheritAllUser').css('display', '');
                    $('#chkInheritAllUserLabel').css('display', '');
                } else {
                    $('#chkInheritAllUser').attr('disabled', 'disabled');
                    $('#chkInheritAllUser').css('display', 'none');
                    $('#chkInheritAllUserLabel').css('display', 'none');
                }
            }
            $("#loadingPage").fadeOut();
        },
        error: function (data) {
            $("#loadingPage").fadeOut();
        }
    });

    $("#dialogEdit").dialog("option", "title", "New Business Area");
    $("#imgNameHelp1").attr("title", "Enter the name of the new Business Area to be created.");
    $("#imgNameHelp1abb").attr("title", "Enter the name of the new Business Area Abbriviation to be created.");
    $("#imgNameHelp2").attr("title", "Select the Business Area Owner(s) from the list.");
    $("#imgNameHelp3").attr("title", "Enter Description for the new Business Area.");
    $("#imgNameHelp14").attr("title", "Select user(s) from the dropdown to provide different level of permission to access the Business Area.");
    $("#imgNameHelp15").attr("title", "Select the existing Contract Record Approval Workflow from the list.");
    $("#imgNameHelp16").attr("title", "Select the existing Renewal Approval Workflow from the list.");
    $("#imgNameHelp17").attr("title", "Select the existing Document Review Workflow from the list.");
    $("#imgNameHelp18").attr("title", "Select the existing Request Approval Workflow from the list.");
    $("#imgNameHelp19").attr("title", "Manage the existing Contract Record Approval Workflow / Create new Contract Record Approval Workflow.");
    $("#imgNameHelp20").attr("title", "Manage the existing Renewal Approval Workflow / Create new Renewal Approval Workflow.");
    $("#imgNameHelp21").attr("title", "Manage existing Document Review Workflow / Create new Document Review Workflow.");
    $("#imgNameHelp22").attr("title", "Manage existing Request Approval Workflow / Create new Request Approval Workflow.");
    $("#imgNameHelp23").attr("title", "Select the existing Amendment Approval Workflow from the list.");
    $("#imgNameHelp24").attr("title", "Manage existing Amendment Approval Workflow / Create new Amendment Approval Workflow.");
    $('#titleMain').html('Business Area Name')
    $('#titleMainabb').html('Abbreviation')
    $('#txtBusinessAreaName').attr('title', 'Business Area Name')
    $("#txtBusinessAreaNameAbbreviation").attr('title', 'Abbreviation')

    $('#formOwner').html('Business Area Owner(s)');
    //*Harshitha
    $("#trDocLibName").css("display", "none");
    $("#tblDocLibraryProperties").css("display", "none");
    $("#divDocLibraryProperties").css("display", "none");
    //*Harshitha
    $("#txtDocLibName").removeClass('validelement');
    $("#txtDocLibName").removeClass('error');
    $("#trDocLibName").find('td:first').empty();
    $("#trDocLibName").find('td:first').text('Document Library Name');
}

function CleanForm() {
    $("#txtBusinessAreaName").val("");
    $("#txtBusinessAreaNameAbbreviation").val("");
    $("#pAutoNumber").css("display", "none");
    $('#ddlBusinessAreaOwner :selected').each(function (i, selected) {
        $('#ddlBusinessAreaOwner option[value="' + $(selected).text() + '"]').prop('selected', false);
        $("#ddlBusinessAreaOwner").trigger("chosen:updated");
        $('#ddlBusinessAreaOwner').trigger("change");
    });

    $('#ddlUserFC :selected').each(function (i, selected) {
        $('#ddlUserFC option[value="' + $(selected).text() + '"]').prop('selected', false);
        $("#ddlUserFC").trigger("chosen:updated");
        $('#ddlUserFC').trigger("change");
    });

    $('#ddlUserC :selected').each(function (i, selected) {
        $('#ddlUserC option[value="' + $(selected).text() + '"]').prop('selected', false);
        $("#ddlUserC").trigger("chosen:updated");
        $('#ddlUserC').trigger("change");
    });

    $('#ddlUserRO :selected').each(function (i, selected) {
        $('#ddlUserRO option[value="' + $(selected).text() + '"]').prop('selected', false);
        $("#ddlUserRO").trigger("chosen:updated");
        $('#ddlUserRO').trigger("change");
    });

    $('#ddlCCUsers :selected').each(function (i, selected) {
        $('#ddlCCUsers option[value="' + $(selected).text() + '"]').prop('selected', false);
        $("#ddlCCUsers").trigger("chosen:updated");
        $('#ddlCCUsers').trigger("change");
    });

    $("#txtDescription").val("");
    $("#chkInheritAllUser").attr('checked', false);

    $("#ddlCurrency").val("0")
    //$("#ddlLegalEntity").val("0");
    $("#txtLegalEntity").val(""); // Added for bug(eO37116)
    $('input[type="radio"][name="ContractNumber"][value="Manual"]').prop('checked', true);
    $('input[type="radio"][name="ContractNumber"][value="Auto-NonEdit"]').prop('disabled', false);
    $('input[type="radio"][name="ContractNumber"][value="Auto"]').prop('disabled', false);

    $('#ddlContractType :selected').each(function (i, selected) {
        $("#ddlContractType option[value='" + $(selected).text() + "']").prop('selected', false);
        $("#ddlContractType").trigger("chosen:updated");
    });
    $('#ddlRequestType :selected').each(function (i, selected) {
        $("#ddlRequestType option[value='" + $(selected).text() + "']").prop('selected', false);
        $("#ddlRequestType").trigger("chosen:updated");
    });


    $('#ddlDocTemplates :selected').each(function (i, selected) {
        $("#ddlDocTemplates option[value='" + $(selected).text() + "']").prop('selected', false);
        $("#ddlDocTemplates").trigger("chosen:updated");
    });


    $('#ddlDocTypes :selected').each(function (i, selected) {
        $("#ddlDocTypes option[value='" + $(selected).text() + "']").prop('selected', false);
        $("#ddlDocTypes").trigger("chosen:updated");
    });

    $("#txtDocLibName").val('');
    $("#txtDocLibName").removeAttr('disabled');

    $('input[type="radio"][name="docversion"][value="Major"]').prop('checked', true);
    $('input[type="radio"][name="docdefaultview"][value="WordOnline"]').prop('checked', true);
    $('input[type="radio"][name="docuploadexternal"][value="Yes"]').prop('checked', true);
    $('input[type="radio"][name="docsecurity"][value="Yes"]').prop('checked', true);
    $("input[name=docsecurity]").attr('disabled', true);
}

$('#btnAddContractArea').click(function () {
    $("#trAdminOwner").css("display", "");
    $("#ddlBusinessAreaOwner").addClass('validmultiselect');
    $("#txtBusinessAreaName").removeAttr("readonly");
    $("#divUserAccess").css("display", "");
    $("#tblUserAccess").css("display", "");

    $("#loadingPage").fadeIn();
    $('#txtRowKey').val('0');
    ShowContractArea();
    $(".validelement").each(function (index, element) {
        $(element).removeClass("error");
        $("#errormsg_" + element.id).remove();
    });

    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
    var vDocLibFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "14" && n.Status == "ON");
    });

    if (vDocLibFeat.length > 0) {
        $("#tblDocLibraryProperties").css("display", "");
        $("#divDocLibraryProperties").css("display", "");
        $("#trDocLibName").css("display", "");
        $("#txtDocLibName").addClass('validelement');
        var lable = "<label>Document Library Name</label><small class='required'>*</small></td>";
        $("#trDocLibName").find('td:first').html(lable);
        //$('#trDocLibArea').css("display", "");//Business Area Level Library Creation
        $("input[value='ContractArea']").prop('checked', true);//Business Area Level Library Creation
    } else {
        $("#txtDocLibName").removeClass('validelement');
        $("#txtDocLibName").removeClass('error');
        $("#trDocLibName").find('td:first').empty();
        $("#trDocLibName").find('td:first').text('Document Library Name');
        $("#trDocLibName").css("display", "none");
        $("#tblDocLibraryProperties").css("display", "none");
        $("#divDocLibraryProperties").css("display", "none");
        //$('#trDocLibArea').css("display", "none");//Business Area Level Library Creation
    }

    $("#aAdd").css("display", "block");
    $("#aUpdate").css("display", "none");
    $("#txtAction").val("Add");
    CleanForm();
    GetTemplates('econtractsnewca');
    GetDocumentTypes('econtractsnewca');
    GetContractType('econtractsnewca');

    $("#dialogEdit").dialog("open");
});

function GetMultiselectValues(multivalue) {
    var multiarr = [];
    var res = multivalue.split(";");
    var reslength = res.length;
    for (var i = 0; i < reslength; i++) {
        multiarr.push(res[i].trim());
    }

    return multiarr;
}

function SaveDocumentType() {

    if ($("#txtDocumentType").val() == "") {

        swal("", "Enter Document Type.");
    }
    else {
        $.ajax({
            url: '/Settings/SaveDocumentType',
            type: 'POST',
            dataType: 'json',
            headers: {
                'AntiReqVerificationToken': $("#forgeryToken").val(), 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging
            },
            data: {
                OldDocType: "",
                NewDocType: $("#txtDocumentType").val(),
                ContractArea: $("#txtBusinessAreaName").val()
            },
            cache: false,
            success: function (person) {
                var sbdoctype = $("#ddlDocTypes").val();

                var txtDocType = '';
                var bao = '';
                $(sbdoctype).each(function (i, itm) {
                    if (bao == '') {
                        bao = itm;
                    }
                    else {
                        bao += ";" + itm;
                    }
                });

                if (bao == '')
                    txtDocType = $("#txtDocumentType").val();
                else
                    txtDocType = bao + ";" + $("#txtDocumentType").val();

                GetDocumentTypes($("#txtBusinessAreaName").val(), 'ddlDocTypes', txtDocType);
            },
            complete: function (person) {
                $("#addEditDocumentType").dialog("close");
            }
        });
    }

}

function adddocumenttype() {
    $("#txtDocumentType").val("");
    $("#addEditDocumentType").dialog("option", "title", "Add Document Type");
    $("#addEditDocumentType").dialog("open");
}

function adddocumenttemplate() {
    var control = $("#docTemplate");
    control.replaceWith(control.val('').clone(true));
    $("#ddlDocumentType").val("0");
    $("#txtTemplateName").val("");

    $("#addEditTemplate").dialog("option", "title", "Add New Template");
    $("#addEditTemplate").dialog("open");
}

function addcontracttype() {
    bindAvailableOrg();
    $("#txtContractTypeID").val("");
    $("#txtContractType").val("");
    $('#ddlTransactionType').val('Select');
    $('#ddlContractClass').val('Select');
    $("#txtDescription").val("");
    $("#chkExtendable").prop('checked', false);
    $("#chkExtensionApproval").prop('checked', false);
    $("#chkRenewable").prop('checked', false);
    $("#chkRenewalApproval").prop('checked', false);
    $("#chkAmendable").prop('checked', false);
    $("#chkAmendmentApproval").prop('checked', false);
}

function SaveTemplate() {
    if (requiredValidator('tblUploadTemplate')) {
        if ($("#txtTemplateName").val() == "") {

            swal("", "Enter Template Name");
            $('.ui-button-green-text').parent().removeAttr('disabled');

        } else if ($('#docTemplate')[0].files[0].name.substring($('#docTemplate')[0].files[0].name.lastIndexOf('.')) != ".dotx") {

            swal("", "The document you selected is invalid, Please select template document(.dotx)");
            $('.ui-button-green-text').parent().removeAttr('disabled');
        }
        else {
            var vExists = fnCheckDocumentTemplateExists($("#txtTemplateName").val())

            if (vExists == true) {

                swal("", "Template with same name already exists! Please enter different Template Name.");
                $('.ui-button-green-text').parent().removeAttr('disabled');
            }
            else {
                $("#loadingPage").fadeIn();
                var formData = new FormData();
                var opmlFile = $('#docTemplate')[0];
                formData.append("opmlFile", opmlFile.files[0]);
                formData.append("AccountID", localStorage.AccountID);
                formData.append("TemplateName", $("#txtTemplateName").val());
                formData.append("CreatedBy", localStorage.UserName);
                formData.append("ModifiedBy", localStorage.UserName);
                formData.append("DocumentType", $("#ddlDocumentType").val());
                formData.append("ContractArea", $("#txtBusinessAreaName").val());
                $.ajax({
                    url: '/Settings/SaveTemplate',
                    type: 'POST',
                    data: formData,
                    cache: false,
                    contentType: false,
                    headers: {
                        'eContracts-ApiKey': localStorage.APIKey,
                        'AntiReqVerificationToken': $("#forgeryToken").val(), 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging
                    },
                    processData: false,
                    success: function (person) {

                        swal("", person.Message);
                        if (person.Success == true) {
                            var sbdoctemp = $("#ddlDocTemplates").val();
                            var txtDocTemplate = '';

                            var bao = '';
                            $(sbdoctemp).each(function (i, itm) {
                                if (bao == '') {
                                    bao = itm;
                                }
                                else {
                                    bao += ";" + itm;
                                }
                            });

                            if (bao == '')
                                txtDocTemplate = $("#txtTemplateName").val();
                            else
                                txtDocTemplate = bao + ";" + $("#txtTemplateName").val();

                            GetTemplates($("#txtBusinessAreaName").val(), 'ddlDocTemplates', txtDocTemplate)
                        }
                        else {
                            $('.ui-button-green-text').parent().removeAttr('disabled');
                        }
                        if (!($("#addEditTemplate").dialog("isOpen")))
                            $('.ui-button-green-text').parent().removeAttr('disabled');

                    },
                    error: function (person) {
                        var verr = '';
                    },
                    complete: function (data) {
                        $("#loadingPage").fadeOut();
                        $("#addEditTemplate").dialog("close");
                    }
                });
            }
        }
    }
    else {
        $('.ui-button-green-text').parent().removeAttr('disabled');
    }
}

function fnCheckDocumentTemplateExists(templateName) {
    var vExists = true;
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/checkdocumenttemplatenameexists/?vDocumentTemplateName=' + templateName,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        async: false,
        success: function (data) {
            vExists = data;
        },
        error: function (data) {
            vExists = false;
        }
    });
    return vExists;
}

function SaveContractTypes() {
    if (requiredValidator('AddEditContractTypes')) {
        //Find duplicate contract type if any
        var isduplicate = false;
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contracttypes?contracttypename=' + encodeURIComponent($("#txtContractType").val().trim()),
            type: 'GET',
            dataType: 'json',
            cache: false,
            async: false,
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            success: function (data) {
                if ($("#ui-id-1").text() == "New Contract Type") {
                    isduplicate = true;
                } else if ($("#ui-id-1").text() == "Edit Contract Type") {
                    if ($("#txtContractType").val() != data.ContractType) {
                        isduplicate = true;
                    } else if ($("#txtContractTypeID").val() != data.RowKey) {
                        isduplicate = true;
                    }
                } else {
                    isduplicate = false;
                }
                if (isduplicate) {

                    swal("", "Contract type:  " + $("#txtContractType").val() + "  already exists.");
                }
            },
            error:
                    function (data) {
                        isduplicate = false;
                    }
        });
        if (!isduplicate) {
            var vOrganisations = "";
            $('input:checkbox[name="Organisations"]:checked').each(function () {
                if (vOrganisations == "") {
                    vOrganisations = this.value;
                }
                else {
                    vOrganisations += ", " + this.value;
                }
            });
            //manoj
            var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
            var vCustomMetadata = $.grep(veContractFeatures, function (nveContractFeatures, iveContractFeatures) {
                return (nveContractFeatures.RowKey == "24");
            });
            //manoj
            $.ajax({
                url: '/Settings/SaveContractType',
                type: 'POST',
                dataType: 'json',
                headers: {
                    'AntiReqVerificationToken': $("#forgeryToken").val(), 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging
                },
                data: {
                    RowKey: $("#txtContractTypeID").val(),
                    ContractType: $("#txtContractType").val(),
                    Active: true,
                    TransactionType: $("#ddlTransactionType").find('option:selected').text(),
                    ContractClass: $("#ddlContractClass").find('option:selected').text(),
                    ContractTermType: $("#ddlContractTermType").find('option:selected').text(),
                    Description: $("#txtDescription").val(),
                    Extendable: $("#chkExtendable").is(':checked') ? 'Yes' : 'No',
                    ExtensionApproval: $("#chkExtensionApproval").is(':checked') ? 'Yes' : 'No',
                    Renewable: $("#chkRenewable").is(':checked') ? 'Yes' : 'No',
                    RenewalApproval: $("#chkRenewalApproval").is(':checked') ? 'Yes' : 'No',
                    Amendable: 'Yes',
                    AmendmentApproval: 'Yes',
                    Organisations: vOrganisations,
                    ContractArea: $("#txtBusinessAreaName").val(),
                    //manoj
                    FUCustomMetadata: (vCustomMetadata.length > 0) ? "OFF" : "ON"
                    //manoj
                },
                cache: false,
                success: function (person) {

                    swal("", person);
                    var sbcontracttype = $("#ddlContractType").val();
                    var txtContractType = '';

                    var bao = '';
                    $(sbcontracttype).each(function (i, itm) {
                        if (bao == '') {
                            bao = itm;
                        }
                        else {
                            bao += ";" + itm;
                        }
                    });

                    if (bao == '')
                        txtContractType = $("#txtContractType").val();
                    else
                        txtContractType = bao + ";" + $("#txtContractType").val();

                    GetContractType($("#txtBusinessAreaName").val(), 'ddlContractType', txtContractType)

                    if (!($("#AddEditContractTypes").dialog("isOpen")))
                        $('.ui-button-green-text').parent().removeAttr('disabled');
                },
                complete: function (data) {
                    $("#AddEditContractTypes").dialog("close");
                }
            });
        } else {
            $('.ui-button-green-text').parent().removeAttr('disabled');
        }
    }
}

function bindAvailableOrg() {
    $('#AvailableOrganisations').empty();
    $("#loadingPage").fadeIn();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/organisations',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (legalentity) {
            var oCount = 1;
            $(legalentity).each(function (i, item) {
                $('#AvailableOrganisations').append('<input id="chklistitem' + oCount + '" class="css1-checkbox" value="' + item.OrganisationName + '" name="Organisations" type="checkbox" /><label for="chklistitem' + oCount + '" class="css1-label">' + item.OrganisationName + '</label>');
                oCount++;
            });
        },
        error:
            function (data) {
            },
        complete: function (data) {
            $("#loadingPage").fadeOut();

            $("#AddEditContractTypes").dialog("option", "title", "New Contract Type");
            $("#AddEditContractTypes").dialog("open");
        }
    });
}

function GetValuesAndAutoPopulate(controlname, values) {

    var multiarr = [];
    var res = values != null ? values.split(";") : [];
    var reslength = res.length;
    var resValue = "";
    for (var i = 0; i < reslength; i++) {
        multiarr.push(res[i].trim());
    }

    ChosenOrder.setSelectionOrder($('#' + controlname), multiarr, true);
}

$('.chosenmulti').on('chosen:showing_dropdown', function (evt, params) {
    $('.result-selected').css('display', 'none');
});

function GetWorkflows(contractArea, businessArea) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Workflow/configuration/all?contractArea=' + encodeURIComponent(contractArea) + '&businessArea=' + encodeURIComponent(businessArea),
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            var contractConfigurations = data.ContractConfigurations;
            var documentConfigurations = data.DocumentConfigurations;
            var requestConfigurations = data.RequestConfigurations;
            var amendmentConfigurations = data.AmendmentConfigurations;

            $("#ddlApproval").empty();
            $("#ddlApproval").append("<option value='0'>--Select--</option>");
            var vDefault = '';
            var datalenght = contractConfigurations.length;
            for (var i = 0; i < datalenght; i++) {
                var item = contractConfigurations[i];
                $("#ddlApproval").append("<option value='" + item.RowKey + "'>" + item.WorkflowTitle + "</option>");

                if (item.IsDefault == 'Yes')
                { vDefault = item.RowKey; }
                else if (item.BusinessArea == 'All' && vDefault == '')
                { vDefault = item.RowKey; }
            }
            if (vDefault != '')
            { $("#ddlApproval").val(vDefault); }

            $("#ddlReview").empty();
            $("#ddlReview").append("<option value='0'>--Select--</option>");
            datalenght = documentConfigurations.length;
            vDefault = '';
            for (var i = 0; i < datalenght; i++) {
                var item = documentConfigurations[i];
                $("#ddlReview").append("<option value='" + item.RowKey + "'>" + item.WorkflowTitle + "</option>");

                if (item.IsDefault == 'Yes')
                { vDefault = item.RowKey; }
                else if (item.BusinessArea == 'All' && vDefault == '')
                { vDefault = item.RowKey; }
            }
            if (vDefault != '')
            { $("#ddlReview").val(vDefault); }

            var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
            var vAccFeat = $.grep(veContractFeatures, function (n, i) {
                return (n.RowKey == "12" && n.Status == "ON");
            });
            if (vAccFeat.length > 0) {
                $("#ddlRequest").empty();
                $("#ddlRequest").append("<option value='0'>--Select--</option>");
                datalenght = requestConfigurations.length;
                vDefault = '';
                for (var i = 0; i < datalenght; i++) {
                    var item = requestConfigurations[i];
                    $("#ddlRequest").append("<option value='" + item.RowKey + "'>" + item.WorkflowTitle + "</option>");

                    if (item.IsDefault == 'Yes')
                    { vDefault = item.RowKey; }
                    else if (item.BusinessArea == 'All' && vDefault == '')
                    { vDefault = item.RowKey; }
                }
                if (vDefault != '')
                { $("#ddlRequest").val(vDefault); }
            }

            $("#ddlAmendmentApproval").empty();
            $("#ddlAmendmentApproval").append("<option value='0'>--Select--</option>");
            var vDefault = '';
            var datalenght = amendmentConfigurations.length;
            for (var i = 0; i < datalenght; i++) {
                var item = amendmentConfigurations[i];
                $("#ddlAmendmentApproval").append("<option value='" + item.RowKey + "'>" + item.WorkflowTitle + "</option>");

                if (item.IsDefault == 'Yes')
                { vDefault = item.RowKey; }
                else if (item.BusinessArea == 'All' && vDefault == '')
                { vDefault = item.RowKey; }
            }
            if (vDefault != '')
            { $("#ddlAmendmentApproval").val(vDefault); }
        }
    });
}

function ManageWorkflows(workflowType) {
    location = "~/Settings/WorkflowConfigurationList?Type=" + workflowType + "&ContractArea=" + encodeURIComponent($("#hdntxtContractAreaName").val()) + "&BusinessArea=" + encodeURIComponent($("#hdntxtBusinessAreaName").val());
}

function getuserdetailsbyusername(strusername) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/users?username=' + strusername,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (legalentity) {

        },
        error:
            function (data) {
            }
    });
}
function addbusinessareapath(username) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/users?username=' + username,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            var d = data.OwnerOfBusinessAreas;
            var businessAreaNewPath = "";
            if (d == "") {
                businessAreaNewPath = $("#hdntxtBusinessAreaPath").val();
            } else {
                businessAreaNewPath = d + ";" + $("#hdntxtBusinessAreaPath").val();
            }

            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/updateuser?username=' + username + '&businessareapath=' + businessAreaNewPath,
                type: 'PUT',
                dataType: 'json',
                'Content-Type': 'application/json',
                cache: false,
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                success: function (userdetails) {

                },
                error:
                    function (userdetails) {
                    }
            });
        },
        error:
            function (data) {
            }
    });
}
function removebusinessareapath(username) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/users?username=' + username,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {

            var y = data.OwnerOfBusinessAreas.split(';');
            var removeItem = $("#hdntxtBusinessAreaPath").val();

            y = jQuery.grep(y, function (value) {
                return value != removeItem;
            });

            var bao = '';
            $(y).each(function (i, itm) {
                if (bao == '') {
                    bao = itm;
                }
                else {
                    bao += ";" + itm;
                }
            });

            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/updateuser?username=' + username + '&businessareapath=' + bao,
                type: 'PUT',
                dataType: 'json',
                'Content-Type': 'application/json',
                cache: false,
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                success: function (userdetails) {

                },
                error:
                    function (userdetails) {
                    }
            });
        },
        error:
            function (data) {
            }
    });
}

$('#chkInheritAllUser').change(function () {
    if ($(this).is(":checked")) {
        $("#loadingPage").fadeIn();
        GetFCUsers($("#hdntxtParentID").val(), true);
        GetCUsers($("#hdntxtParentID").val(), true);
        GetROUsers($("#hdntxtParentID").val(), true);
        $("#loadingPage").fadeOut();
    }
});

function GetRequestType(areaname, controlname, values) {
    var url = "";
    url = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/requesttypes';
    $('#ddlRequestType').empty();
    var vRequestTypeList = '';
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            $(data).each(function (i, item) {
                var sRequestType = item.RequestType;
                vRequestTypeList += '<option value="' + sRequestType + '">' + sRequestType + '</option>';
            });

            $('#ddlRequestType').append(vRequestTypeList);
            $('#ddlRequestType').chosen().trigger("chosen:updated");
            if (areaname != 'econtractsnewca') {
                GetValuesAndAutoPopulate(controlname, values)
            }
        },
        error:
            function (data) {
            },
        complete: function (data) {
            if (areaname == 'econtractsnewca') {
                $("#loadingPage").fadeOut();
            }
        }
    });
}

//Sridhar
function BindContractTermTypeddl() {
    $("#ddlContractTermType").append("<option value='0'>--Select--</option>");
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
                $("#ddlContractTermType").append("<option value='" + itemname.ContractTermName + "'>" + itemname.ContractTermDisplayName + "</option>")
            }
        }
    });
}

// Added for bug(eO37116)
function ViewLegalentity() {
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
            $.each($('#txtLegalEntity').val().replace("; ", ";").split(";"), function () {
                if (SelectedLEList.indexOf($.trim(this)) == -1)
                    SelectedLEList.push($.trim(this));
            });

            var myLEArrayList = [];
            var obj1 = {};

            $(data).each(function (idata, itemdata) {
                myLEArrayList.push(itemdata);
            });

            var article = '<thead><tr><th style="height:42px;"><input id="selectallLE" onclick="funselectallLE(this);" type="checkbox"/> Legal Entity</th><th style="height:42px">Default Currency</th><th style="height:42px;">Authorized Signatory(ies)</th></tr></thead><tbody>';

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
                article += '<label for="CP' + itemArray.RowKey + '" class="css1-label label-200pxwidth" title="' + escape(itemArray.LegalEntityName.trim()) + '"  onmouseover="UnescapeNameMouseOver(this)" style="display: inline;">' + itemArray.LegalEntityName.trim() + '</label></td>';
                article += '<td>' + itemArray.DefaultCurrency + '</td>';
                AuthorizedSignatory = itemArray.AuthorizedSignatory != "" ? itemArray.AuthorizedSignatory : "-"
                article += '<td>' + AuthorizedSignatory + '</td>';
                article += '</tr>';
            });

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
                "pagingType": "full_numbers"
            });
            alphabeticselection('tblLE');
            article = '';

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

function alphabeticselection(tblname) {
    $.fn.dataTable.ext.search.push(function (settings, searchData) {
        if (!_alphabetSearch) {
            return true;
        }
        if (_alphabetSearch == "Number") {//Custom
            if (numberindex.indexOf(searchData[0].charAt(0)) > -1) {
                return true;
            }//Custom
        } else {
            if (searchData[0].charAt(0).toLowerCase() === _alphabetSearch.toLowerCase()) {
                return true;
            }
        }

        return false;
    });

    var table = $('#' + tblname).DataTable();

    var alphabet = $('<div class="alphabet"/>').append('');

    $('<span class="clear active"/>')
        .data('letter', '')
        .html('All')
        .appendTo(alphabet);

    //Custom
    $('<span/>')
            .data('letter', 'Number')
            .html('#')
            .appendTo(alphabet);
    //Custom
    for (var i = 0 ; i < 26 ; i++) {
        var letter = String.fromCharCode(65 + i);

        $('<span/>')
            .data('letter', letter)
            .html(letter)
            .appendTo(alphabet);
    }

    alphabet.insertBefore(table.table().container());

    alphabet.on('click', 'span', function () {
        alphabet.find('.active').removeClass('active');
        $(this).addClass('active');

        _alphabetSearch = $(this).data('letter');
        table.draw();
    });
}

function eventFired(nameattr, objvalue, tablname) {
    if ($('input:checkbox[name="' + nameattr + '"]:checked').length == $('input:checkbox[name="' + nameattr + '"]').length && $('input:checkbox[name="' + nameattr + '"]:checked').length != 0) {
        $("#" + objvalue).attr('checked', true);
    } else {
        $("#" + objvalue).attr('checked', false);
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
        $("#txtLegalEntity").val(arrselectedLE.join("; "));
    } else {
        $("#txtLegalEntity").val('');
    }
    arrselectedLE = [];
    $("#browseLegalEntity").dialog("close");
    $('#dvCPExistingLegalEntity').css("display", "");
}

function checkMultipleDocumentsLE(object) {
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

    if ($('input:checkbox[name="CompanyProfile"]:checked').length == $('input:checkbox[name="CompanyProfile"]').length && $('input:checkbox[name="CompanyProfile"]:checked').length != 0) {
        $("#selectallLE").attr('checked', true);
    } else {
        $("#selectallLE").attr('checked', false);
    }

    try {
        hideAllMenuAndStopPro(event);
    }
    catch (ex) {

    }
}

$("#tblDocLibraryProperties input[name='docversion']").click(function () {
    if ($('input:radio[name=docversion]:checked').val() == "All") {
        $("input[name=docsecurity]").attr('disabled', false);
    } else {
        $("#chkdocRead").attr('checked', 'checked');
        $("input[name=docsecurity]").attr('disabled', true);
    }
});

function restrictspecialcharactor(controlid) {
    $('#' + controlid).keydown(function (e) {
        // Allow: backspace, delete, tab, escape and enter
        if (e.shiftKey === true && (e.keyCode == 220 || e.keyCode == 222 || e.keyCode == 186 || e.keyCode == 190 || e.keyCode == 188 || e.keyCode == 219 || e.keyCode == 221 || e.keyCode == 56 || e.keyCode == 57 || e.keyCode == 48 || e.keyCode == 55 || e.keyCode == 52 || e.keyCode == 51 || e.keyCode == 53 || e.keyCode == 49)) {
            e.preventDefault();
        }
        else if (e.keyCode == 219 || e.keyCode == 222 || e.keyCode == 190 || e.keyCode == 189 || e.keyCode == 188 || e.keyCode == 221) {
            e.preventDefault();
        }
        // Ensure that it is a number and stop the keypress
    });
}

function getSettings() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/settings',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            if (data.ContractNumberFormat != '') {
                vContractAutoNumberEnabled = true;
            }
        },
        error:
            function (data) {
            }
    });
}

//AD Integration Start
function ConvertByteArrayToString(data) {
    const extraByteMap = [1, 1, 1, 1, 2, 2, 3, 0];
    var count = data.length;
    var str = "";

    for (var index = 0; index < count;) {
        var ch = data[index++];
        if (ch & 0x80) {
            var extra = extraByteMap[(ch >> 3) & 0x07];
            if (!(ch & 0x40) || !extra || ((index + extra) > count))
                return null;

            ch = ch & (0x3F >> extra);
            for (; extra > 0; extra -= 1) {
                var chx = data[index++];
                if ((chx & 0xC0) != 0x80)
                    return null;

                ch = (ch << 6) | (chx & 0x3F);
            }
        }

        str += String.fromCharCode(ch);
    }

    return str;
}

function replacetoamp(objrevalue) {
    var findvalue = "&";
    var revalue = new RegExp(findvalue, 'g');
    objrevalue = objrevalue.replace(revalue, '&amp;');
    return objrevalue;
}

function ArrRemoveDupe(a) {
    var temp = {};
    for (var i = 0; i < a.length; i++)
        temp[a[i]] = true;
    var r = [];
    for (var k in temp)
        r.push(k);
    return r;
}

function GetValuesAndAutoPopulateAD(controlname, values, isuser, readonlyusers) {
    var multiarr = [];
    var res = values != null ? values.split(";") : [];
    var reslength = res.length;
    var resValue = "";
    for (var i = 0; i < reslength; i++) {
        //   multiarr.push(res[i].trim());
        if (isuser)
            resValue = res[i].trim();
        else
            resValue = escape(res[i].trim());
        if (resValue != "") {
            if ($('#' + controlname + ' option[value="' + resValue + '"]').length > 0 && multiarr.indexOf(resValue) == -1) {
                multiarr.push(resValue);
            }

        }
    }

    for (var j = 0; j < readonlyusers.length; j++) {
        var opt = readonlyusers[j].trim();
        $('#' + controlname + ' option[value="' + opt + '"]').attr("disabled", true);
    }
    //$("#" + controlname + "").trigger("chosen:updated");
    //$("#" + controlname + "").trigger("change");
    ChosenOrder.setSelectionOrder($('#' + controlname), multiarr, true);
}

var removeLastChar = function (value, char) {
    var lastChar = value.slice(-1);
    if (lastChar == char) {
        value = value.slice(0, -1);
    }
    return value;
}
function Loading_View_trigger() {
    //BindWorkflowSettings();
}
//AD Integration End

$("input[name='docArea']").change(function () {
    if ($('input[name=docArea]:checked').val() == "BusinessArea") {
        $('#trDocLibName').hide();
        $('#trDocLibName').find(':input').removeClass("validelement error");
    }
    else {
        $('#trDocLibName').show();
        $('#trDocLibName').find(':input').addClass("validelement");
    }
});
