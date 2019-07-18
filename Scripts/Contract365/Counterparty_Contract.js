var InternalUser = "";
var InternalUserCounterName = "";
var counterpartyID = "";
var counterpartyName = "";
var vUserList = "";
$(document).ready(function () {
     counterpartyID = getParameterByName('CounterpartyID');
     counterpartyName = getParameterByName('CounterpartyName');
    var vURL = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contacts?searchkeyword=' + encodeURIComponent($("#txtSearchBox").val());

    if (counterpartyID != "") {
        //Showing all contacts
        $("#spnCounterpartyName").text(counterpartyName);
        $("#ddlCounterparty").css("display", "none");
        $("#spnCounterpartyName").css("display", "");
        $("#showAll").html("Showing contacts for '" + counterpartyName + "'.");
        vURL = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/counterparty/' + counterpartyID + '/contacts?searchkeyword='
    }
    var Permission = JSON.parse(localStorage.getItem("Permission"));
    //if (Permission.CounterpartyPermission == 'Read Only' || Permission.CounterpartyPermission == '') {
    //    $(".manageCounterpartyMenu").css("display", "none");
    //    $(".contributeCounterparty").css("display", "none");
    //}
    //else if (Permission.CounterpartyPermission == 'Edit / Read') {
    //    $(".manageCounterparty").css("display", "none");
    //    $(".contributeCounterparty").css("display", "");
    //}
    
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
            InternalUser = "";
            InternalUserCounterName = "";
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
                var datalenght = data.length;
                for (var i = 0; i < datalenght; i++) {
                    var item = data[i];
                    var vCountry = '';
                    if (item.Country == "--Select--")
                        vCountry = "";
                    else
                        vCountry = item.Country;



                    var vAddress = '';
                    var article = '<li>';
                    article += '<p id="ContactID" style="display:none;">' + item.RowKey + '</p>';
                    article += '<p id="ContactName" style="display:none;">' + item.ContactName + '</p>';
                    article += '<p class="ContactEmailID" data-counterparty="' + item.CounterpartyName + '" data-contractid="' + item.RowKey + '" style="display:none;">' + item.EmailID + '</p>';
                    article += '<p>' + item.ContactName;
                    article += '<img src="/Content/Images/drop-arrow.png" alt="Open Menu" title="Open Menu" class="openmenu"/>';
                    article += '<small>';

                    if (item.AddressLine1 != "") {
                        if (vAddress == "")
                            vAddress = item.AddressLine1;
                    }
                    if (item.AddressLine2 != "") {
                        if (vAddress == "")
                            vAddress = item.AddressLine2;
                        else
                            vAddress = ', ' + item.AddressLine2;
                    }
                    if (item.City != "") {
                        if (vAddress == "")
                            vAddress = item.City;
                        else
                            vAddress = ', ' + item.City;
                    }
                    if (item.State != "") {
                        if (vAddress == "")
                            vAddress = item.State;
                        else
                            vAddress = ', ' + item.State;
                    }
                    if (item.Country != "" && item.Country != "--Select--") {
                        if (vAddress == "" )
                            vAddress = item.Country;
                        else
                            vAddress = ', ' + item.Country;
                    }
                    var vInternalOrExternal = '';
                    if (item.InternalOrExternal != "") {
                        vInternalOrExternal = item.InternalOrExternal;
                    }

                    if (vAddress == "" || vAddress == "0")
                        article += item.CounterpartyName;
                    else
                        article += vAddress + ' | ' + item.CounterpartyName;

                    if (vInternalOrExternal != "")
                        article += ' | ' + vInternalOrExternal;
                    article += '</small></p>';
                    article += '</li>';



                    $("#listContacts").append(article);
                }
                $(".openmenu").contextMenu({ menu: 'myMenu', leftButton: true }, function (action, el, pos) {
                    contextMenuWork(action, el.parent("p").parent("li"), pos);
                });


                $('#compact-pagination').pagination({
                    items: data.length,
                    itemsOnPage: 20,
                    type: 'ul',
                    row: 'li',
                    typeID: 'listContacts',
                    cssStyle: 'compact-theme'
                });

            
              
            }
        },
        error:
            function (data) {
                $("#listContacts").append('<p class="f_p-error">No items found.</p>');
            }
    });
});

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

function ContactPopup() {
    $("#txtContactID").val("");
    $("#txtContactName").val("");
    var counterPartyName = getParameterByName('CounterpartyName');
    if (counterPartyName != "") {
        $("#ddlCounterparty option").filter(function (index) { return $(this).text() === counterPartyName; }).prop('selected', true);
        $("#ddlCounterparty").css('display', 'none');
    }
    else {
        $("#ddlCounterparty option").filter(function (index) { return $(this).text() === counterPartyName; }).prop('selected', true);
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
    $("#txtZipC").val("");
    $('#ddlCountryC').val('0');
    $("#txtContactNoC").val("");
    $("#txtEmailIDC").val("");

    $("#addEditContact").dialog("option", "title", "New Contact");
    $("#addEditContact").dialog("open");
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
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
        case "edit":
            {
                var contactID = $(el).find("#ContactID").text();
                $("#loadingPage").fadeIn();
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contacts?contactid=' + contactID,
                    type: 'GET',
                    dataType: 'json',
                    cache: false,
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    success: function (counterparty) {
                        $("#txtContactID").val(counterparty.RowKey);
                        $("#txtContactName").val(counterparty.ContactName);
                        if (counterpartyName != "") {
                            $("#ddlCounterparty option").filter(function (index) { return $(this).text() === counterparty.CounterpartyName; }).prop('selected', true);
                            $("#ddlCounterparty").prop('disabled', true);
                        }
                        else {
                            $("#ddlCounterparty option").filter(function (index) { return $(this).text() === counterparty.CounterpartyName; }).prop('selected', true);

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

                    },
                    error: function (data) {
                        $("#loadingPage").fadeOut();

                    },
                    complete: function () {
                        $("#loadingPage").fadeOut();

                        $("#addEditContact").dialog("option", "title", "Edit Contact");
                        $("#addEditContact").dialog("open");
                    }
                });



                break;
            }
    }
}
function SaveContact() {
    if (requiredValidator('addNewContactFields')) {
        $("#loadingPage").fadeIn();
        var contactID = $("#txtContactID").val();
        var counterpartyID = "";
        var counterpartyName = "";
        if ($("#ddlCounterparty").find('option:selected').val() != "0") {
            counterpartyID = $("#ddlCounterparty").find('option:selected').val();
            counterpartyName = $("#ddlCounterparty").find('option:selected').text();
        }


        if (contactID != '') {
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
                            if (data != null && data.length > 0 && data[0].InternalOrExternal == "Internal") {
                                isFlag = true;
                            }
                            if (!isFlag) {
                                isformvalid = true;
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
                                             location = "/Counterparty/Contacts?CounterpartyID=" + getParameterByName('CounterpartyID') + "&CounterpartyName=" + getParameterByName('CounterpartyName') + "&Currentpage=1";
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
                            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contacts?contactid=' + contactID,
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
                                  location = "/Counterparty/Contacts?CounterpartyID=" + getParameterByName('CounterpartyID') + "&CounterpartyName=" + getParameterByName('CounterpartyName') + "&Currentpage=1"

                              }

                          });
                            }
                        });
                    }
                    else {
                        ContactName = $("#txtContactName").val();
                        CountryName = $("#ddlCountryC").find('option:selected').text();
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
                                  location = "/Counterparty/Contacts?CounterpartyID=" + getParameterByName('CounterpartyID') + "&CounterpartyName=" + getParameterByName('CounterpartyName') + "&Currentpage=1"

                              }

                          });
                            }
                        });
                    }
                }
            }
            else {
                ContactName = $("#txtContactName").val();
                CountryName = $("#ddlCountryC").find('option:selected').text();
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
                             location = "/Counterparty/Contacts?CounterpartyID=" + getParameterByName('CounterpartyID') + "&CounterpartyName=" + getParameterByName('CounterpartyName') + "&Currentpage=1";
                         }

                     });
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
                        if (data != null && data.length > 0 && data[0].InternalOrExternal == "Internal") {
                            isFlag = true;
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
                                      location = "/Counterparty/Contacts?CounterpartyID=" + getParameterByName('CounterpartyID') + "&CounterpartyName=" + getParameterByName('CounterpartyName') + "&Currentpage=1"

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
                ContactName = $("#txtContactName").val();
                CountryName = $("#ddlCountryC").find('option:selected').text();
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
                          location = "/Counterparty/Contacts?CounterpartyID=" + getParameterByName('CounterpartyID') + "&CounterpartyName=" + getParameterByName('CounterpartyName') + "&Currentpage=1"

                      }

                  });
                    }
                });
            }
        }

    }

}

function modalOnOpen(dialog) {
    dialog.overlay.fadeIn('fast', function () {
        dialog.container.fadeIn('fast', function () {
            dialog.data.hide().slideDown('slow');
        });
    });


    // if the user clicks "yes"
    dialog.data.find("#btnSaveC").click(function (ev) {
        ev.preventDefault();

        var contactID = $("#txtContactID").val();
        var counterpartyID = "";
        var counterpartyName = "";
        if ($("#ddlCounterparty").find('option:selected').val() != "0") {
            counterpartyID = $("#ddlCounterparty").find('option:selected').val();
            counterpartyName = $("#ddlCounterparty").find('option:selected').text();
        }
        if (contactID != '') {
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contacts?contactid=' + contactID,
                type: 'PUT',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                data: {
                    RowKey: contactID,
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
                    ModifiedBy: localStorage.UserName
                },
                cache: false,
                success: function (person) {

                    $.modal.close();
                    //location = location;
                    //  location = "../Counterparty/Contacts";
                    $("#addEditContact").dialog("close");
                    swal({
                        title: '',
                        text: person,

                    },
                        function (confirmed) {
                            if (confirmed) {
                                location.reload();
                            }

                        });

                }
            });
        }
        else {
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
                    //   location = "../Counterparty/Contacts";
                    $("#addEditContact").dialog("close");
                    swal({
                        title: '',
                        text: person,

                    },
                    function (confirmed) {
                        if (confirmed) {
                            location.reload();
                        }

                    });
                }
            });
        }
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
                var sEmailId = (item.EmailID);
                //vUserList += '<option value="' + sUserName + '">' + sUserName + '</option>';
                vUserList += '<option value="' + sUserName + '" data-Email="' + sEmailId + '">' + sUserName + '</option>';
            });
        },
        error:
            function (dataUser) {
            }
    });
    return vUserList;
}

function Loading_View_trigger() {
    BindCountry();
    BindCounterparty();
    vUserList = GetUserList();
    $("#ddlInternalUser").append(vUserList);
    CheckGlobalSettingsForNewCP();
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
            $(".manageCounterpartyMenu").css("display", "none");
            var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
            if (veContractFeatures != null) {
                vAccFeat = $.grep(veContractFeatures, function (n, i) {
                    return (n.RowKey == "6" && n.Status == "ON");
                });
            }
            if (vAccFeat != null && vAccFeat.length > 0) {
                if (data == null) {
                    $(".manageCounterpartyMenu").css("display", "none");
                } else {
                    if (localStorage.UserType.indexOf("Global Contract Owner") >= 0) {
                        
                        $(".manageCounterpartyMenu").css("display", "");
                    }
                    else if (data.CreateCounterpartyCA == "Yes" && localStorage.UserType.indexOf("Contract Area Administrator") >= 0) {
                        
                        $(".manageCounterpartyMenu").css("display", "");
                    }
                    else if (data.CreateCounterpartyBA == "Yes" && localStorage.Permission.indexOf(localStorage.GlobalBusinessAreaLocation) >= 0) {
                        
                        $(".manageCounterpartyMenu").css("display", "");
                    }
                    else {
                        $(".manageCounterpartyMenu").css("display", "none");
                    }
                }
            }
        }
    });
}