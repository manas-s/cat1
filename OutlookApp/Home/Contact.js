/// <reference path="../App.js" />
var browsedDocConSel = '';
var counterpartyData = [];
var selectedCounterParty = "";
(function () {
    "use strict";

    // The Office initialize function must be run each time a new page is loaded
    Office.initialize = function (reason) {
        $(document).ready(function () {
            app.initialize();
            displayItemDetails();
        });
    };

    // Displays the "Subject" and "From" fields, based on the current mail item
    function displayItemDetails() {
        var item = Office.context.mailbox.item;
        var emailIds = [];
        SearchCounterparty("Y");
        var attachments = "<tr><th></th> <th style='text-align:left;'>Contact</th> <th style='text-align:left;'>Counterparty</th>  </tr>";
        var rowNo = 0;
        attachments += '<tr>';
        attachments += '<td>';
        attachments += '<input id="SelectUser_0" type="checkbox" class="counterPartyContact" contactName =' + '"' + item.from.displayName + '"' + 'contactEmail =' + '"' + item.from.emailAddress + '"' + '/>';
        attachments += '</td>';
        attachments += '<td class="f_text" id="tdContact_0">' + item.from.displayName + ' <br/> (' + item.from.emailAddress + ')';
        //attachments += '<a id="aSaveContact0" href="javascript:void(0)" onclick="SaveContact(\'' + item.from.displayName + '\',\'' + item.from.emailAddress + '\', 0)" class="linkText2 saveLink" style="display:none;">Save</a><span id="spanSave0" style="display:none;"><img src="../../Content/Images/icon/loading.gif"> Saving...</span>';
        attachments += '</td>';
        attachments += '<td id="tdCounterparties_0">';
        attachments += GetContactDetails(item.from.emailAddress, 0);
        attachments += '</td>';
        attachments += '</tr>';

        //attachments += '<p><input type="checkbox" name="Contacts" id="chkAttach' + rowNo + '" class="widt" value="' + item.from.displayName + '" /> ' + item.from.displayName + '(' + item.from.emailAddress + ')</p>';
        //attachments += '<ul class="drop">';
        //attachments += '<li style="width:50%;">';
        //attachments += "<input id='txtCounterpartyElement" + rowNo + "' name='CounterpartyElement' readonly='readonly' placeholder='Select Counterparty' type='text' width='180px' />";
        //attachments += '</li>';
        //attachments += '<li>';
        //attachments += "<a href='javascript:void(0)' onclick='ViewCounterparty(\"" + rowNo + "\");'>Browse</a>";
        //attachments += "<input id='txtCounterpartyElementID" + rowNo + "' name='CounterpartyElementID' type='hidden' />";
        //attachments += "<input id='txtEmailAddress" + rowNo + "' name='EmailAddress' type='hidden' value='" + item.from.emailAddress + "' />";
        //attachments += '</li>';
        //attachments += '</ul>';
        emailIds.push(item.from.emailAddress);
        rowNo++;
        for (var i = 0; i < item.to.length; i++) {
            if ($.inArray(item.to[i].emailAddress, emailIds) == -1) {
                attachments += '<tr>';
                attachments += '<td>';
                attachments += '<input id="SelectUser_' + rowNo + '"' + ' type="checkbox" class="counterPartyContact" contactName =' + '"' + item.to[i].displayName + '"' + 'contactEmail =' + '"' + item.to[i].emailAddress + '"' + '/>';
                attachments += '</td>';
                attachments += '<td class="f_text" id="tdContact_' + rowNo + '">' + item.to[i].displayName + ' <br/> (' + item.to[i].emailAddress + ')';
                attachments += '</td>';
                //attachments += '<a id="aSaveContact' + rowNo + '" href="javascript:void(0)" onclick="SaveContact(\'' + item.to[i].displayName + '\',\'' + item.to[i].emailAddress + '\',\'' + rowNo + '\')" class="linkText2 saveLink" style="display:none;">Save</a><span id="spanSave' + rowNo + '" style="display:none;"><img src="../../Content/Images/icon/loading.gif"> Saving...</span>';
                attachments += '<td id="tdCounterparties_' + rowNo + '"' + '>';
                attachments += GetContactDetails(item.to[i].emailAddress, rowNo);
                attachments += '</td>';
                attachments += '</tr>';

                //attachments += '<p><input type="checkbox" name="Contacts" id="chkAttach' + rowNo + '" class="widt" value="' + item.to[i].displayName + '" /> ' + item.to[i].displayName + '(' + item.to[i].emailAddress + ')</p>';
                //attachments += '<ul class="drop">';
                //attachments += '<li style="width:50%;">';
                //attachments += "<input id='txtCounterpartyElement" + rowNo + "' name='CounterpartyElement' readonly='readonly' placeholder='Select Counterparty' type='text' width='180px' />";
                //attachments += '</li>';
                //attachments += '<li>';
                //attachments += "<a href='javascript:void(0)' onclick='ViewCounterparty(\"" + rowNo + "\");'>Browse</a>";
                //attachments += "<input id='txtCounterpartyElementID" + rowNo + "' name='CounterpartyElementID' type='hidden' />";
                //attachments += "<input id='txtEmailAddress" + rowNo + "' name='EmailAddress' type='hidden' value='" + item.to[i].emailAddress + "' />";
                //attachments += '</li>';
                //attachments += '</ul>';
                rowNo++;
                emailIds.push(item.to[i].emailAddress)
            }
        }
        for (var i = 0; i < item.cc.length; i++) {
            if ($.inArray(item.cc[i].emailAddress, emailIds) == -1) {
                attachments += '<tr>';
                attachments += '<td>';
                attachments += '<input id="SelectUser_' + rowNo + '"' + ' type="checkbox" class="counterPartyContact" contactName =' + '"' + item.cc[i].displayName + '"' + 'contactEmail =' + '"' + item.cc[i].emailAddress + '"' + '/>';
                attachments += '</td>';
                attachments += '<td class="f_text" id="tdContact_' + rowNo + '">' + item.cc[i].displayName + ' <br/> (' + item.cc[i].emailAddress + ')';
                attachments += '</td>';
                //attachments += '&nbsp;&nbsp;<a id="aSaveContact' + rowNo + '" href="javascript:void(0)" onclick="SaveContact(\'' + item.cc[i].displayName + '\',\'' + item.cc[i].emailAddress + '\',\'' + rowNo + '\')" class="linkText2 saveLink" style="display:none;">Save</a><span id="spanSave' + rowNo + '" style="display:none;"><img src="../../Content/Images/icon/loading.gif"> Saving...</span>';
                attachments += '<td id="tdCounterparties_' + rowNo + '"' + '>';
                attachments += GetContactDetails(item.cc[i].emailAddress, rowNo);
                attachments += '</td>';
                attachments += '</tr>';

                //attachments += '<p><input type="checkbox" name="Contacts" id="chkAttach' + rowNo + '" class="widt" value="' + item.cc[i].displayName + '" /> ' + item.cc[i].displayName + '(' + item.cc[i].emailAddress + ')</p>';
                //attachments += '<ul class="drop">';
                //attachments += '<li style="width:50%;">';
                //attachments += "<input id='txtCounterpartyElement" + rowNo + "' name='CounterpartyElement' readonly='readonly' placeholder='Select Counterparty' type='text' width='180px' />";
                //attachments += '</li>';
                //attachments += '<li>';
                //attachments += "<a href='javascript:void(0)' onclick='ViewCounterparty(\"" + rowNo + "\");'>Browse</a>";
                //attachments += "<input id='txtCounterpartyElementID" + rowNo + "' name='CounterpartyElementID' type='hidden' />";
                //attachments += "<input id='txtEmailAddress" + rowNo + "' name='EmailAddress' type='hidden' value='" + item.cc[i].emailAddress + "' />";
                //attachments += '</li>';
                //attachments += '</ul>';
                rowNo++;
                emailIds.push(item.cc[i].emailAddress)
            }
        }
        $("#tblAttachments").append(attachments);
       
        $('#tblAttachments tr').each(function (index, tr) {
            $(tr).find('td').find('input[type="checkbox"]').attr("disabled", true);
        })

    }


    function GetContactDetails(emailid, j) {
        var vContracts = "";
        var vContractsend = "";
        var otherContracts = "";
        var others = '';
        $.ajax({
            url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/counterparty/contacts?emailid=' + emailid,
            type: 'GET',
            dataType: 'json',
            'Content-Type': 'application/json',
            cache: false,
            async: false,
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            success: function (data) {
                var otherCount = 0;
                var dataCount = data.length;
                var alreadyAdded = [];
                $(data).each(function (i, item) {
                    if ($.inArray(item.CounterpartyName, alreadyAdded) == -1) {
                        alreadyAdded.push(item.CounterpartyName);
                        if (vContracts == "") {
                            vContracts = '<a class="counterTitle" href="/Counterparty/CounterpartyDetail?CounterpartyID=' + item.CounterpartyID + '" target="_blank">' + item.CounterpartyName + '</a>';
                        }
                        else {
                            if (i < 2) {
                                vContracts += ' | ' + '<a class="counterTitle" href="/Counterparty/CounterpartyDetail?CounterpartyID=' + item.CounterpartyID + '" target="_blank">' + item.CounterpartyName + '</a>';
                            }
                            else {
                                if (otherContracts == "")
                                    otherContracts = '<div id="dvOtherContracts' + j + '" style="display:none;"><a class="counterTitle" href="/Counterparty/CounterpartyDetail?CounterpartyID=' + item.CounterpartyID + '" target="_blank">' + item.CounterpartyName + '</a>';
                                else
                                    otherContracts += ' | ' + '<a class="counterTitle" href="/Counterparty/CounterpartyDetail?CounterpartyID=' + item.CounterpartyID + '" target="_blank">' + item.CounterpartyName + '</a>';
                                otherCount++;
                            }
                        }
                    }
                });
                if (vContracts != "") {
                    if (dataCount > 2) {
                        otherContracts += "</div>";
                        vContracts += otherContracts;
                        vContracts += ' | ' + '<a href="javascript:void(0);" class="PreserveSpace" onclick="showMore(\'' + j + '\');" id="aOthers' + j + '">' + otherCount + ' More...</a>';

                    }
                    // vContractsend = "<div style='font-size: 12px;width: 93%;' class='bg-warning' id='dvMainContracts" + j + "'> The contact is saved to " + vContracts + ".</div>";
                    vContractsend = vContracts;
                }
            },
            error: function (data) {

            }
        });
        return vContractsend;
    }
})();

function showMore(num) {
    $("#dvOtherContracts" + num).toggle();
    var len = $("#dvOtherContracts" + num).find('a').length;
    if (len > 2) {
        len = len - 1;
    }
    if ($("#dvOtherContracts" + num).css('display') == "none") {
        $("#aOthers" + num).html(len + ' More..');
    }
    else {
        $("#aOthers" + num).html('Show Less..');
    }
}


$(document).ready(function () {
    $("#browseCounterparty").dialog({
        autoOpen: false,
        closeText: "",
        width: "90%",
        title: "Search and Select Counterparty",
        modal: true
    });
    $('#txtSearchBox').keypress(function (e) {
        if (e.keyCode == 13) {
            $(".ui-autocomplete").css('display', 'none');
            SearchCounterparty("Y");
        }
    });

    //manoj
    $('#txtCounterpartyElement1').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            OpenSearch();
        }
    });
    //manoj
});
var counterpartyTags = [];
function SearchCounterparty(openpopup) {
    //if (openpopup == "Y") {
    //    counterpartyData = [];
    //    counterpartyTags = [];
    //}
    $("#theadCounterpartiesTodo").css("display", "none");
    $("#tbodyCounterpartiesTodo").html('');
    $('#hdConElmID').val('1');
    var searchText = $("#txtSearchBox").val();
    $("#compact-paginationCounterparties").html('');
    //$('#tblCounterparties').html('<img src="../../Content/Images/icon/loading.gif"> Searching...');
    if ($(counterpartyData).length > 0) {
        //$("#tblCounterparties").html('');
        $('#loadCP').empty();
        var searchCounterparty = [];
        var vCount = '';
        if (searchText != '') {
            $.each(counterpartyData, function (i, item) {
                if (typeof (item.Description) != "undefined") {
                    if (item.CounterpartyName.toLowerCase().indexOf(searchText.toLowerCase()) > -1 || item.Description.toLowerCase().indexOf(searchText.toLowerCase()) > -1)
                        searchCounterparty.push(item);
                }
                else {
                    if (item.CounterpartyName.toLowerCase().indexOf(searchText.toLowerCase()) > -1)
                        searchCounterparty.push(item);
                }
            });

            $(searchCounterparty).each(function (i, item) {
                var article = '';
                //if (i == 0) {
                //    article += '<tr><th style="width: 15%; background: none repeat scroll 0% 0% rgb(41, 50, 74); color: rgb(255, 255, 255); font-weight: bold;text-align: left;">Counterparty Name</th>';
                //    article += '<th style="width: 15%; background: none repeat scroll 0% 0% rgb(41, 50, 74); color: rgb(255, 255, 255); font-weight: bold;text-align: left;">Counterparty Type</th></tr>';
                //}
                var checked = '';
                if (browsedDocConSel != "" && item.CounterpartyName == browsedDocConSel) {
                    checked = "checked";
                }
                article += '<tr><td style="padding: 4px;">';

                article += '<a title=' + '"' + item.CounterpartyName + '"' + ' id="' + item.RowKey + '" href="javascript:void(0);" name="Contracts" style="margin: 0 !important;bordor: none !important;" class="linkPickerClear PreserveSpace" onclick="AddCounterparty(this);">';
                article += item.CounterpartyName + '</a>';
                //article += '<input id="' + item.RowKey + '" type="radio" ' + checked + ' name="Counterparty" class="css-checkbox" value="' + escape(item.CounterpartyName) + '" />';
                //article += '<label for="' + item.RowKey + '" class="css-label">' + item.CounterpartyName + '</label>';

                article += '</td><td style="padding: 4px;">' + item.CounterpartyType + '';
                article += '</td></tr>';
                $("#tbodyCounterpartiesTodo").append(article);
            });
            vCount = $("#tbodyCounterpartiesTodo tr").length;
        }
        else {
            $(counterpartyData).each(function (i, item) {
                var article = '';
                //if (i == 0) {
                //    article += '<tr><th style="width: 15%; background: none repeat scroll 0% 0% rgb(41, 50, 74); color: rgb(255, 255, 255); font-weight: bold;text-align: left;">Counterparty Name</th>';
                //    article += '<th style="width: 15%; background: none repeat scroll 0% 0% rgb(41, 50, 74); color: rgb(255, 255, 255); font-weight: bold;text-align: left;">Counterparty Type</th></tr>';
                //}
                var checked = '';
                if (browsedDocConSel != "" && item.CounterpartyName == browsedDocConSel) {
                    checked = "checked";
                }
                article += '<tr><td style="padding: 4px;">';

                article += '<a title=' + '"' + item.CounterpartyName + '"' + ' id="' + item.RowKey + '" href="javascript:void(0);" name="Contracts" style="margin: 0 !important;bordor: none !important;" class="linkPickerClear PreserveSpace" onclick="AddCounterparty(this);">';
                article += item.CounterpartyName + '</a>';
                //article += '<input id="' + item.RowKey + '" type="radio" ' + checked + ' name="Counterparty" class="css-checkbox" value="' + escape(item.CounterpartyName) + '" />';
                //article += '<label for="' + item.RowKey + '" class="css-label">' + item.CounterpartyName + '</label>';

                article += '</td><td style="padding: 4px;">' + item.CounterpartyType + '';
                article += '</td></tr>';
                $("#tbodyCounterpartiesTodo").append(article);
            });
            vCount = $("#tbodyCounterpartiesTodo tr").length;
        }
        //$("#txtSearchBox").autocomplete({
        //    source: counterpartyTags,
        //    select: function (evn, uidetails) {
        //        $("#txtSearchBox").val(uidetails.item.label);
        //        SearchCounterparty("Y");
        //    }
        //});
        if (vCount != 0) {
            $("#theadCounterpartiesTodo").css("display", "");
            $('#loadCP').html('');
            if (vCount > 10) {
                $('#compact-paginationCounterparties').css('display', '');
                $('#compact-paginationCounterparties').pagination({
                    items: vCount,
                    itemsOnPage: 5,
                    type: 'tdbody',
                    row: 'tr',
                    typeID: 'tbodyCounterpartiesTodo',
                    cssStyle: 'compact-theme'
                });
            }
        } else {
            $('#loadCP').html('<p style="color: #565650;">No Results Found!</p>')
            $('#compact-paginationCounterparties').css('display', 'none');
            $("#theadCounterpartiesTodo").css("display", "none");
        }

    }
    else {
        $("#loadingPage").fadeIn();
        var vURL = vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/counterparty?searchkeyword=' + encodeURIComponent($("#txtSearchBox").val()) + '&customquery=&sortbyfield=CounterpartyName&orderby=ASC';
        $.ajax({
            url: vURL,
            type: 'GET',
            dataType: 'json',
            "Content-Type": "application/json",
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            cache: false,
            success: function (data) {
                counterpartyData = data;

                data = data.sort(function (a, b) {
                    return new Date(a.Modified).getTime() - new Date(b.Modified).getTime()
                });

               // data = data.slice(0, 30);

                var counTitle = $.map(data, function (item, i) {
                    return item.CounterpartyName
                }).sort(function (a, b) {
                    return new Date(a.CounterpartyName).getTime() - new Date(b.CounterpartyName).getTime()
                });

                $("#txtCounterpartyElement1").autocomplete({
                    source: counTitle,
                    select: function (evn, uidetails) {
                        $("#txtCounterpartyElement1").val(uidetails.item.label);
                        selectedCounterParty = uidetails.item.label;
                        SelectItem();
                    },
                    response: function (event, ui) {
                        if (ui.content.length === 0) {
                            $("#txtCounterpartyElement1").val("");
                        }
                    }
                });

                //counterpartyTags = [];
                //$("#tblCounterparties").html('');
                //$('#loadCP').empty();
                //$(data).each(function (i, item) {
                //    var article = '';
                //    if (i == 0) {
                //        article += '<tr><th style="width: 15%; background: none repeat scroll 0% 0% rgb(41, 50, 74); color: rgb(255, 255, 255); font-weight: bold;text-align: left;">Counterparty Name</th>';
                //        article += '<th style="width: 15%; background: none repeat scroll 0% 0% rgb(41, 50, 74); color: rgb(255, 255, 255); font-weight: bold;text-align: left;">Counterparty Type</th></tr>';
                //    }
                //    var checked = '';
                //    if (browsedDocConSel != "" && item.CounterpartyName == browsedDocConSel) {
                //        checked = "checked";
                //    }
                //    article += '<tr><td style="padding: 4px;">';

                //    article += '<a id="' + item.RowKey + '" href="javascript:void(0);" name="Contracts" style="margin: 0 !important;bordor: none !important;" class="linkPickerClear PreserveSpace" onclick="AddCounterparty(this);">';
                //    article += item.CounterpartyName + '</a>';
                //    //article += '<input id="' + item.RowKey + '" type="radio" ' + checked + ' name="Counterparty" class="css-checkbox" value="' + escape(item.CounterpartyName) + '" />';
                //    //article += '<label for="' + item.RowKey + '" class="css-label">' + item.CounterpartyName + '</label>';

                //    article += '</td><td style="padding: 4px;">' + item.CounterpartyType + '';
                //    article += '</td></tr>';
                //    $("#tblCounterparties").append(article);
                //    counterpartyTags.push(item.CounterpartyName);
                //});
                //var vCount = data.length;
                ////$("#txtSearchBox").autocomplete({
                ////    source: counterpartyTags,
                ////    select: function (evn, uidetails) {
                ////        $("#txtSearchBox").val(uidetails.item.label);
                ////        SearchCounterparty("Y");
                ////    }
                ////});
                //if (vCount != 0) {
                //    $('#loadCP').html('');
                //    $('#compact-paginationCounterparties').css('display', '');
                //    if (vCount > 10) {
                //        $('#compact-paginationCounterparties').pagination({
                //            items: vCount,
                //            itemsOnPage: 10,
                //            typeID: 'tblCounterparties',
                //            cssStyle: 'compact-theme'
                //        });
                //    }
                //} else {
                //    $('#loadCP').html('<p style="color: #565650;">No Results Found!</p>')
                //    $('#compact-paginationCounterparties').css('display', 'none');
                //}
                //if (openpopup == "Y") {
                //    $("#browseCounterparty").dialog("option", "title", "Search & Select Counterparty");
                //    $("#browseCounterparty").dialog("open");
                //}
                $("#loadingPage").fadeOut();
            },
            error: function () {
                $("#tblCounterparties").empty();
                $('#compact-paginationCounterparties').css('display', 'none');
                $('#loadCP').html('<p style="color: #565650;">No Results Found!</p>');
                $("#loadingPage").fadeOut();
            }
        });
    }
}

$('#txtSearchBox').keypress(function (e) {
    if ($('#txtSearchBox').val() != "") {
        if (e.keyCode == 13)
            SearchCounterparty("Y");
    }
});

function ViewCounterparty(ElementID) {
    $('#hdConElmID').val(ElementID);
    $('#tblCounterparties').html('<img src="../../Content/Images/icon/loading.gif"> Working on it...');
    //  if ($('#tblCounterparties tr').length <= 0) {
    SearchCounterparty("Y");
    // } else {
    //     $('#loadCP').empty();
    //     $("#browseCounterparty").dialog("option", "title", "Counterparty Picker");
    //     $("#browseCounterparty").dialog("open");
    //  }
}

function AddCounterparty(item) {
    var vSelectedElement = null;
    vSelectedElement = $(item);
    var vElemID = $('#hdConElmID').val();

    $("#txtCounterpartyElement" + vElemID).val("");
    $("#txtCounterpartyElementID" + vElemID).val("");
    browsedDocConSel = "";
    if (vSelectedElement.length > 0) {
        $('#tblAttachments tr').each(function (index, tr) {
            $(tr).find('td').find('input[type="checkbox"]').removeAttr("disabled");
        });
        $("#txtCounterpartyElement" + vElemID).val(unescape($(vSelectedElement).text()));
        selectedCounterParty = unescape($(vSelectedElement).text());
        browsedDocConSel = unescape($(vSelectedElement).text());
        $("#txtCounterpartyElementID" + vElemID).val($(vSelectedElement).attr("id"));
        $("#txtCounterpartyElement" + vElemID).prop('readonly',true);
        $("#imgClearSearch").css('display', '');
        $("#imgOpenSearch").removeClass('left_img_68').addClass('left_img_48');
    }

    $(".saveLink").css('display', '');
    $("#browseCounterparty").dialog("close");

}

function SaveContact(ContactName, EmailID, rowNo) {
    if (requiredValidator('saveForm', false)) {
        //var selectedDiv = $("#aSaveContact" + rowNo).parent().children()[3];

        //var atags = $(selectedDiv).find('.counterTitle');

        var isUpload = true;
        var selectedcon = $("#txtCounterpartyElement1").val();
        var selectedContacts = $('.counterPartyContact:checked');
        var contactsData = "";
        if (selectedCounterParty != '') {
            if (selectedContacts.length > 0) {

                $.each(selectedContacts, function (i, item) {
                    if (contactsData == "") {
                        contactsData = $(item).attr('contactName') + '~' + $("#txtCounterpartyElement1").val() + '~' + $("#txtCounterpartyElementID1").val() + '~' + $(item).attr('contactEmail');
                    } else {
                        contactsData += ";" + $(item).attr('contactName') + '~' + $("#txtCounterpartyElement1").val() + '~' + $("#txtCounterpartyElementID1").val() + '~' + $(item).attr('contactEmail');
                    }

                });
                var formData = new FormData();
                formData.append("Contacts", contactsData);
                //if (isUpload) {
                var indexRow = [];
                indexRow.push(rowNo);
                $("#aSaveContact" + rowNo).hide();
                $("#spanSave" + rowNo).show();
                $("#loadingPage").fadeIn();                
                $.ajax({
                    url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/Multicontact',
                    type: 'POST',
                    //dataType: 'json',
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    data: formData,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (person) {

                        //browsedDocConSel = "";
                        ////ClearForm();
                        //$.each(indexRow, function (i, item) {
                        //    $("#aSaveContact" + item).show();
                        //    $("#spanSave" + item).hide();
                        //});
                        for (var i = 0; i < selectedContacts.length; i++) {
                            rowNo = $(selectedContacts[i]).attr('id').split('_')[1];
                            if ($("#tdCounterparties_" + rowNo + ' a').filter(':contains(' +'"' + $("#txtCounterpartyElementID1").val() + '"' +')').length == 0) {
                                if ($("#tdCounterparties_" + rowNo + ' a').length == 0) {
                                    var html = '<a class="counterTitle" href="/Counterparty/CounterpartyDetail?CounterpartyID=' + $("#txtCounterpartyElementID1").val() + '" target="_blank">' + $("#txtCounterpartyElement1").val() + '</a>';
                                    $("#tdCounterparties_" + rowNo).append(html);
                                }
                                else if ($("#tdCounterparties_" + rowNo + " a").length == 1) {
                                    var html = ' | ' + '<a class="counterTitle" href="/Counterparty/CounterpartyDetail?CounterpartyID=' + $("#txtCounterpartyElementID1").val() + '" target="_blank">' + $("#txtCounterpartyElement1").val() + '</a>';
                                    $("#tdCounterparties_" + rowNo).append(html);
                                }
                                else if ($("#tdCounterparties_" + rowNo + " a").length == 2) {
                                    var html = '<div id="dvOtherContracts' + rowNo + '" style="display:none;"><a class="counterTitle" href="/Counterparty/CounterpartyDetail?CounterpartyID=' + $("#txtCounterpartyElementID1").val() + '" target="_blank">' + $("#txtCounterpartyElement1").val() + '</a></div>';
                                    html += ' | ' + '<a onclick="showMore(' + '\'' + rowNo + '\'' + ');"  href="javascript:void(0);" class="PreserveSpace" id="aOthers' + rowNo + '">1 More...</a>';
                                    $("#tdCounterparties_" + rowNo).append(html);
                                }
                                else if ($("#tdCounterparties_" + rowNo + " a").length > 2) {
                                    var html = ' | ' + '<a class="counterTitle" href="/Counterparty/CounterpartyDetail?CounterpartyID=' + $("#txtCounterpartyElementID1").val() + '" target="_blank">' + $("#txtCounterpartyElement1").val() + '</a></div>';
                                    $("#aOthers" + rowNo).html(($("#dvOtherContracts" + rowNo + " a").length + 1) + ' More..');
                                    $("#dvOtherContracts" + rowNo).append(html);
                                }

                                //var html = '| <a class="counterTitle" href="/Counterparty/CounterpartyDetail?CounterpartyID=' + $("#txtCounterpartyElementID1").val() + '" target="_blank">' + $("#txtCounterpartyElement1").val() + '</a>';
                                //$("#dvOtherContracts" + rowNo).append(html);
                                $(selectedContacts[i]).prop('checked', false);
                                if ($('#aOthers' + rowNo).text().indexOf('More..')) {
                                    showMore(rowNo);
                                }
                            }
                        }
                        selectedCounterParty = '';
                        $('#txtCounterpartyElement1').val('');
                        $('#txtCounterpartyElement1').prop('readonly', false);
                        $('#imgClearSearch').css('display', 'none');
                        $("#loadingPage").fadeOut();

                        app.initialize();
                        app.showNotification("", "Contact(s) saved successfully.");
                    },
                    error: function (item) {
                        selectedCounterParty = '';
                        $("#loadingPage").fadeOut();
                    }
                });
                //}
                //else {
                //    app.initialize();
                //    app.showNotification("", "Already uploaded to " + selectedcon);
                //}
            } else {
                app.initialize();
                app.showNotification("", "Please select contact(s)");
            }
        } else {
            $('.counterPartyContact').each(function () {
                $(this).prop('checked', false);
            })
            app.initialize();
            app.showNotification("", "Please select counterparty");
           
        }
    }
    else {
        app.initialize();
        app.showNotification("", "Please enter required fields.");
    }
}

function ClearForm() {
    $(':input', '#saveForm')
  .removeAttr('checked')
  .removeAttr('selected')
  .not(':button, :submit, :reset, :hidden, :radio, :checkbox')
  .val('');
    $('select', '#saveForm')
  .not(':button, :submit, :reset, :hidden, :radio, :checkbox')
  .val('0');
}


function OpenSearch() {
    if ($("#txtCounterpartyElement1").val() != '')
        $("#txtSearchBox").val($("#txtCounterpartyElement1").val());
    SearchCounterparty('Y');
    //$('#tblCounterparties').html('');
    $("#browseCounterparty").dialog("option", "title", "Search and Select Counterparty");
    $("#browseCounterparty").dialog("open");
}

function SelectItem() {
    $('#hdConElmID').val('1');
    var selCon = $("#txtCounterpartyElement1").val();
    var counterparty = $.grep(counterpartyData, function (item, i) {
        return item.CounterpartyName.toLowerCase() == selCon.toLowerCase()
    });

    if (counterparty.length > 0) {
        $('#tblAttachments tr').each(function (index, tr) {
            $(tr).find('td').find('input[type="checkbox"]').removeAttr("disabled");
        })
        var vElemID = $('#hdConElmID').val();

        $("#txtCounterpartyElementID" + vElemID).val("");
        browsedDocConSel = "";
        $("#txtCounterpartyElement" + vElemID).val(unescape(selCon));
        browsedDocConSel = unescape(selCon);
        $("#txtCounterpartyElementID" + vElemID).val(counterparty[0].RowKey);
        $('#txtCounterpartyElement' + vElemID).prop('readonly', true);
        $('#imgClearSearch').css('display', '');
        $(".saveLink").css('display', '');
    }
}

function txtClearSearch() {
    $('#tblAttachments tr').each(function (index, tr) {
        $(tr).find('td').find('input[type="checkbox"]').prop('checked', false)
        $(tr).find('td').find('input[type="checkbox"]').attr("disabled", true);
    })
    $("#txtCounterpartyElement1").val('');
    $("#txtSearchBox").val();
    $("#imgOpenSearch").removeClass('left_img_48').addClass('left_img_68');
    $("#imgClearSearch").css('display', 'none');
    $('#txtCounterpartyElement1').prop('readonly', false);
    localStorage.removeItem("selectedContract");
    selectedCounterParty = "";
}

$(document).on('change', '.counterPartyContact', function () {
    var checked = $(this).prop('checked');
    if ($('#txtCounterpartyElement1').val() == '' && checked) {
        $(this).prop('checked', false);
        $('#txtCounterpartyElement1').focus();
    }
    if ($('#txtCounterpartyElement1').val() != '' && checked) {
        var id = $(this).attr('id').split('_')[1];
        var counterpartylinks = $("#tdCounterparties_" + id + ' a');
        if (counterpartylinks.length > 0) {
            var couterpartArr = [];
            for (var k = 0; k < counterpartylinks.length; k++) {
                var counterpartyName = $.trim($(counterpartylinks[k]).text());
                couterpartArr.push(counterpartyName);
            }
            var moreLinks = $('#dvOtherContracts' + id + ' a');
            if (moreLinks.length > 0) {
                for (var j = 0; j < moreLinks.length; j++) {
                    var counterpartyName = $.trim($(moreLinks[j]).text());
                    couterpartArr.push(counterpartyName);
                }
            }

        }
        if (couterpartArr.length > 0) {
            if ($.inArray($.trim($('#txtCounterpartyElement1').val()), couterpartArr) >= 0) {
                $(this).prop('checked', false);
                app.initialize();
                app.showNotification('', 'Already added');
            }
        }
    }

})

$('#txtCounterpartyElement1').on('blur', function () {
    $('#tblAttachments tr').each(function (index, tr) {
        $(tr).find('td').find('checkbox').prop('checked', false)
        $(tr).find('td').find('input[type="checkbox"]').attr("disabled", true);
    })
})