/// <reference path="../App.js" />

(function () {
    'use strict';

    // The initialize function must be run each time a new page is loaded
    Office.initialize = function (reason) {
        $(document).ready(function () {
            app.initialize();
            ShowSearch();
            var userProfile = Office.context.mailbox.userProfile;
            var emailID = userProfile.emailAddress;//"ajith_kumar@corevo.onmicrosoft.com";//
            emailID = emailID.toLowerCase();
            //if (typeof localStorage.UserName == "undefined" || localStorage.UserName == "") {
            ValidateUser(emailID);

            $('#set-subject').click(setSubject);
            $('#get-subject').click(getSubject);
            $('#add-to-recipients').click(addToRecipients);
        });
    };

    function ValidateUser(office365emailid) {
        //localStorage.AccountID = "K1Zkmhad";
        //localStorage.APIKey = "xgEXoUSV5OXbGtZJdFAnwDqmFR2O+KXlnm7O2TTl1aVEmYUBZMQrh0+Cl58ZWBZCfS1nIxBB0YzLasdwq+tVTg==";
        //localStorage.SPHostUrl = "https://corevo.sharepoint.com/sites/Contract365/V2";
        ////localStorage.UserName = "Ajith Kumar";
        ////localStorage.UserTitle = "Ajith";
        ////localStorage.UserType = "Global Contract Owner; Account Owner";
        ////localStorage.OEmail = "ajith_kumar@corevo.onmicrosoft.com";
        ////localStorage.UserID = "TvHXuplG";
        //localStorage.UserName = "Sugumar R";
        //localStorage.UserTitle = "Sugumar";
        //localStorage.UserType = "Contract Area Administrator; Business Area Owner; Business User";
        //localStorage.OEmail = "sugumar_r@corevo.onmicrosoft.com";
        //localStorage.UserID = "4OAvQ6L5";
        $.ajax({
            url: '/api/mailservice/userdetail?office365emailid=' + office365emailid,
            type: 'GET',
            dataType: 'json',
            cache: false,
            success: function (item) {
                localStorage.UserName = item.UserName;
                localStorage.AccountID = item.PartitionKey;
                localStorage.APIKey = item.ApiKey;
                localStorage.SPHostUrl = item.HostURL;
                localStorage.UserTitle = item.UserName;
                localStorage.UserType = item.UserType;
                localStorage.OEmail = item.O365EmailID;
                localStorage.UserID = item.RowKey;
            },
            error: function (item) {
                localStorage.UserName = "";
                localStorage.AccountID = "";
                localStorage.APIKey = "";
                localStorage.SPHostUrl = "";
                localStorage.UserTitle = "";
                localStorage.UserType = "";
                localStorage.OEmail = "";
                localStorage.UserID = "";
            }
        });
    }

    function setSubject() {
        Office.cast.item.toItemCompose(Office.context.mailbox.item).subject.setAsync("Hello world!");
    }

    function getSubject() {
        Office.cast.item.toItemCompose(Office.context.mailbox.item).subject.getAsync(function (result) {
            app.showNotification('The current subject is', result.value)
        });
    }

    function addToRecipients() {
        var item = Office.context.mailbox.item;
        var addressToAdd = {
            displayName: Office.context.mailbox.userProfile.displayName,
            emailAddress: Office.context.mailbox.userProfile.emailAddress
        };

        if (item.itemType === Office.MailboxEnums.ItemType.Message) {
            Office.cast.item.toMessageCompose(item).to.addAsync([addressToAdd]);
        } else if (item.itemType === Office.MailboxEnums.ItemType.Appointment) {
            Office.cast.item.toAppointmentCompose(item).requiredAttendees.addAsync([addressToAdd]);
        }
    }

})();




$(document).ready(function () {
    OnSearchForChange();
    $("#dvDetail").dialog({
        autoOpen: false,
        closeText: "",
        width: "98%",
        title: "Contract Detail",
        modal: true,
        draggable: false,
        buttons: {

        }
    });
    $('#inserch2_Filter').click(function () {
        $('#inserch2_Filter').popModal({
            html: $('#inserch2_FilterOptions'),
            placement: 'bottomLeft',
            showCloseBut: true,
            onDocumentClickClose: true,
            onDocumentClickClosePrevent: '',
            inline: true,
            overflowContent: false
        });
    });

    $('#txtKeyword').keypress(function (e) {
        if (e.keyCode == 13) {
            Search();
        }
    });

});


function ShowSearch() {
    $("#aSearch").addClass("active");
    $("#aCalender").removeClass('active');
    $(".ShowSearch").css('display', '');
    $(".ShowCalender").css('display', 'none');
}

function ShowCalender() {
    $("#aCalender").addClass("active");
    $("#aSearch").removeClass('active');
    $(".ShowSearch").css('display', 'none');
    $(".ShowCalender").css('display', '');
    ShowCalenderRenewal();
}


function OnSearchForChange() {
    var vSearchFor = $("#ddlSearchFor").find('option:selected').text();
    if (vSearchFor == 'Contracts') {
        $('input[type="radio"][name="ContractRadio"][value="All Contracts"]').prop('checked', true);
        $('input:checkbox[name=ContractCheck]').attr('checked', false);
        $(".ContractFilters").css('display', '');
        $(".DocumentFilters").css('display', 'none');
        $(".CounterpartyFilters").css('display', 'none');
    } else if (vSearchFor == 'Documents') {
        $('input[type="radio"][name="DocumentRadio"][value="All Documents"]').prop('checked', true);
        $('input:checkbox[name=DocumentCheck]').attr('checked', false);
        $(".ContractFilters").css('display', 'none');
        $(".DocumentFilters").css('display', '');
        $(".CounterpartyFilters").css('display', 'none');
    } else if (vSearchFor == 'Counterparty') {
        $('input[type="radio"][name="DocumentRadio"][value="All Counterparties"]').prop('checked', true);
        $('input:checkbox[name=DocumentCheck]').attr('checked', false);
        $(".ContractFilters").css('display', 'none');
        $(".DocumentFilters").css('display', 'none');
        $(".CounterpartyFilters").css('display', '');
    } else {
        $(".ContractFilters").css('display', 'none');
        $(".DocumentFilters").css('display', 'none');
        $(".CounterpartyFilters").css('display', 'none');
    }

    if ($("#txtKeyword").val() != '')
        Search();
}

var listContracts = [];
var listDocuments = [];
var listCounterparty = [];
var listTemplate = [];

function Search() {
    if ($("#txtKeyword").val() != '') {
        $(".popModal").css("display", "none");
        var vSearchFor = $("#ddlSearchFor").find('option:selected').text();
        if (vSearchFor == 'Contracts') {
            SearchContract();
        } else if (vSearchFor == 'Documents') {
            SearchDocument();
        } else if (vSearchFor == 'Counterparty') {
            SearchCounterparty();
        } else if (vSearchFor == 'Templates') {
            SearchTemplate();
        }
    }
    else {
        app.initialize();
        app.showNotification('', 'Enter keyword to search.')
    }
}

function SearchContract() {
    $("#loadingPage").fadeIn();

    var vSearchText = $("#txtKeyword").val();
    var vShowContracts = $("input:radio[name=ContractRadio]:checked").val();
    var vHideContracts = "";
    $('input:checkbox[name="ContractCheck"]:checked').each(function () {
        vHideContracts += this.value + "; ";
    });

    $.ajax({
        url: '/api/accounts/' + localStorage.AccountID + '/Contracts?stage=&searchkeyword=' + encodeURIComponent(vSearchText) + '&showcontracts=' + encodeURIComponent(vShowContracts) + '&hidecontracts=' + encodeURIComponent(vHideContracts),
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserName: localStorage.UserName, UserID: localStorage.UserID },
        success: function (data) {
            $("#ulSearchResult").empty();
            listContracts = data;
            var vCount = data.length;
            $("#spSearchResText").html(vCount + ' results found. <a id="inserch2_Filter" class="linkText" href="javascript:void(0)">add more filters</a>');
            $(data).each(function (i, item) {
                var sRowKey = item.RowKey;
                var sContractTitle = item.ContractTitle;
                var myUrl = '/Contracts/ContractDetails?ContractID=' + encodeURI(item.RowKey);

                var vContractNumber = '';
                if (item.ContractNumber == null || item.ContractNumber == "") {
                    vContractNumber = 'NA';
                } else {
                    vContractNumber = item.ContractNumber;
                }
                var article = '<li>';
                article += '<div>';
                article += '<a id="' + sRowKey + '" class="search-Result-Heading PreserveSpace" target="_blank" href="' + myUrl + '"></a>';

                article += '<span class="search-doc-Icons">';
                article += '<a href="javascript:void(0)" onclick="AddContractToMail(\'' + sRowKey + '\');"><img src="../Image/attached-mail.png"></a>';
                article += '<a href="javascript:void(0)" onclick="ContractDetail(\'' + sRowKey + '\');"><img src="../Image/more-drop.png"></a>';
                article += '</span>';

                article += '</div>';
                article += '<div class="search-Doc-status">';
                if (item.Status == "New") {
                    article += '<b title="New" class="status_green_another"><img src="../../Content/Images/status/new.png"/>new</b>';
                }
                else if (item.Status == "Awaiting Review") {
                    article += '<b title="Awaiting Review" class="status_yellow"><img src="../../Content/Images/status/renew.png"/>rev</b>';
                }
                else if (item.Status == "Reviewed") {
                    article += '<b title="Reviewed" class="status_blue"><img src="../../Content/Images/status/tick.png"/>rev</b>';
                }
                else if (item.Status == "Awaiting Approval") {
                    article += '<b title="Awaiting Approval" class="status_yellow"><img src="../../Content/Images/status/renew.png"/>appr</b>';
                }
                else if (item.Status == "Approved") {
                    article += '<b title="Approved" class="status_blue"><img src="../../Content/Images/status/tick.png"/>appr</b>';
                }
                else if (item.Status == "In Negotiation") {
                    article += '<b title="In Negotiation" class="status_yellow"><img src="../../Content/Images/status/renew.png"/>nego</b>';
                }
                else if (item.Status == "Negotiation Complete") {
                    article += '<b title="Negotiation Complete" class="status_blue"><img src="../../Content/Images/status/tick.png"/>nego</b>';
                }
                else if (item.Status == "Ready for Signature") {
                    article += '<b title="Ready for Signature" class="status_green"><img src="../../Content/Images/status/tick.png"/>Sign</b>';
                }
                else if (item.Status == "Awaiting Signatures") {
                    article += '<b title="Awaiting Signatures" class="status_yellow"><img src="../../Content/Images/status/renew.png"/>Sign</b>';
                }
                else if (item.Status == "Signed") {
                    article += '<b title="Signed" class="status_blue"><img src="../../Content/Images/status/tick.png"/>Sign</b>';
                }
                else if (item.Status == "Active") {
                    article += '<b title="Active" class="status_green"><img src="../../Content/Images/status/active.png"/>actv</b>';
                }
                else if (item.Status == "Up for Renewal") {
                    article += '<b title="Up for Renewal" class="status_red"><img src="../../Content/Images/status/exp.png"/>renw</b>';
                }
                else if (item.Status == "About to Expire") {
                    article += '<b title="About to Expire" class="status_red"><img src="../../Content/Images/status/exp.png"/>exp</b>';
                }
                else if (item.Status == "Expired") {
                    article += '<b title="Expired" class="status_Gray"><img src="../../Content/Images/status/expried.png"/>exp</b>';
                }
                else if (item.Status == "On Hold") {
                    article += '<b title="On Hold" class="status_red"><img src="../../Content/Images/status/exp.png"/>hold</b>';
                }
                else if (item.Status == "Replaced") {
                    article += '<b title="Replaced" class="status_Gray"><img src="../../Content/Images/status/replace.png"/>rep</b>';
                }
                else if (item.Status == "Cancelled") {
                    article += '<b title="Cancelled" class="status_Gray"><img src="../../Content/Images/status/close.png"/>canc</b>';
                }
                else if (item.Status == "Archived") {
                    article += '<b title="Archived" class="status_blue"><img src="../../Content/Images/status/archive.png"/>ARCH</b>';
                }
                else {
                    article += '<b title="Not Assigned" class="status_red"><img src="../../Content/Images/status/new.png"/>not</b>';
                }
                //article += '<b title="Signed" class="app-status_blue"><img src="img/tick.png">Sign</b>';
                article += '</div>';
                article += '</li>';

                $("#ulSearchResult").append(article);

                $("#" + sRowKey).html($('<div/>').text(item.ContractTitle).html());
            });

            if (vCount > 9) {
                $('#paginationSearchResult').css('display', '');
            }
            else {
                $('#paginationSearchResult').css('display', 'none');
            }


            $('#paginationSearchResult').pagination({
                items: vCount,
                itemsOnPage: 10,
                displayedPages: 3,
                edges: 1,
                type: 'ul',
                typeID: 'ulSearchResult',
                row: 'li',
                cssStyle: 'compact-theme'
            });
            $('#inserch2_Filter').click(function () {
                $('#inserch2_Filter').popModal({
                    html: $('#inserch2_FilterOptions'),
                    placement: 'bottomCenter',
                    showCloseBut: true,
                    onDocumentClickClose: true,
                    onDocumentClickClosePrevent: '',
                    inline: true,
                    overflowContent: false
                });
            });

            $("#loadingPage").fadeOut();
        },
        error:
            function (data) {
                $('#paginationSearchResult').css('display', 'none');
                $("#ulSearchResult").empty();
                $("#loadingPage").fadeOut();
                //$("#spSearchResText").html('No result found.');
                $("#spSearchResText").html('0 results found. <a id="inserch2_Filter" class="linkText" href="javascript:void(0)">add more filters</a>');
                $('#inserch2_Filter').click(function () {
                    $('#inserch2_Filter').popModal({
                        html: $('#inserch2_FilterOptions'),
                        placement: 'bottomCenter',
                        showCloseBut: true,
                        onDocumentClickClose: true,
                        onDocumentClickClosePrevent: '',
                        inline: true,
                        overflowContent: false
                    });
                });
            }
    });
}

function SearchDocument() {
    $("#loadingPage").fadeIn();

    var vSearchText = $("#txtKeyword").val();
    var vShowDocuments = $("input:radio[name=DocumentRadio]:checked").val();
    var vHideDocuments = "";
    $('input:checkbox[name="DocumentCheck"]:checked').each(function () {
        vHideDocuments += this.value + "; ";
    });

    $.ajax({
        url: '/api/accounts/' + localStorage.AccountID + '/Documents?searchkeyword=' + encodeURIComponent(vSearchText) + '&showdocuments=' + encodeURIComponent(vShowDocuments) + '&hidedocuments=' + encodeURIComponent(vHideDocuments),
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName },
        success: function (data) {
            $("#ulSearchResult").empty();
            listDocuments = data;
            var vCount = data.length;
            $("#spSearchResText").html(vCount + ' results found. <a id="inserch2_Filter" class="linkText" href="javascript:void(0)">add more filters</a>');
            var settings = {
                pattern: /\.[0-9a-z]+$/i,
                knownFileTypes: ['pdf', 'png', 'jpg', 'gif', 'bmp', 'doc', 'xls', 'ppt', 'docx', 'xlsx', 'txt', 'pptx', 'zip', 'rar', 'gzip', 'arj', 'wav', 'mp3', 'aif', 'aiff', 'm4a', 'ogg', 'wma', 'psd', 'ai', 'swf', 'fla', 'css', 'js', 'avi', 'mov', 'wmv', 'dotx'],
                WopiFrameFileTypes: ['doc', 'xls', 'ppt', 'docx', 'xlsx', 'pptx', 'dotx']
            };
            $(data).each(function (i, item) {
                var sRowKey = item.RowKey;

                var vURL = encodeURI(item.DocumentUrl);
                var ext = vURL.match(settings.pattern);
                if (ext != null) {
                    if (ext.length > 0) { ext = ext[0].slice(1); }
                    if (vURL.toLowerCase().indexOf(localStorage.SPHostUrl.toLowerCase()) >= 0) {
                        if (jQuery.inArray(ext, settings.WopiFrameFileTypes) > -1) {
                            vURL = localStorage.SPHostUrl + "/_layouts/WopiFrame.aspx?sourcedoc=" + vURL + "&action=default";
                        }
                    }
                }

                var article = '<li>';
                article += '<div>';
                article += '<a class="search-Result-Heading" target="_blank" href="' + vURL + '">' + item.DocumentName + '</a>';

                article += '<span class="search-doc-Icons">';
                article += '<a href="javascript:void(0)" onclick="AddDocumentToMail(\'' + sRowKey + '\');"><img src="../Image/attached-mail.png"></a>';
                article += '<a href="javascript:void(0)" onclick="DocumentDetail(\'' + sRowKey + '\');"><img src="../Image/more-drop.png"></a>';
                article += '</span>';

                article += '</div>';
                article += '<div class="search-Doc-status">';
                if (item.DocumentStatus == "New") {
                    article += '<b title="New" class="status_green_another"><img src="../../Content/Images/status/new.png"/>new</b>';
                }
                else if (item.DocumentStatus == "Awaiting Review") {
                    article += '<b title="Awaiting Review" class="status_yellow"><img src="../../Content/Images/status/renew.png"/>rev</b>';
                }
                else if (item.DocumentStatus == "Reviewed") {
                    article += '<b title="Reviewed" class="status_blue"><img src="../../Content/Images/status/tick.png"/>rev</b>';
                }
                else if (item.DocumentStatus == "In Negotiation") {
                    article += '<b title="In Negotiation" class="status_yellow"><img src="../../Content/Images/status/renew.png"/>nego</b>';
                }
                else if (item.DocumentStatus == "Negotiation Complete") {
                    article += '<b title="Negotiation Complete" class="status_blue"><img src="../../Content/Images/status/tick.png"/>nego</b>';
                }
                else if (item.DocumentStatus == "Ready for Signature") {
                    article += '<b title="Ready for Signature" class="status_green"><img src="../../Content/Images/status/tick.png"/>Sign</b>';
                }
                else if (item.DocumentStatus == "Awaiting Signatures") {
                    article += '<b title="Awaiting Signatures" class="status_yellow"><img src="../../Content/Images/status/renew.png"/>Sign</b>';
                }
                else if (item.DocumentStatus == "Signed") {
                    article += '<b title="Signed" class="status_blue"><img src="../../Content/Images/status/tick.png"/>Sign</b>';
                }
                else if (item.DocumentStatus == "Active") {
                    article += '<b title="Active" class="status_green"><img src="../../Content/Images/status/active.png"/>actv</b>';
                }
                else if (item.DocumentStatus == "Expired") {
                    article += '<b title="Expired" class="status_Gray"><img src="../../Content/Images/status/expried.png"/>exp</b>';
                }
                else {
                    article += '<b title="Not Assigned" class="status_red"><img src="../../Content/Images/status/new.png"/>not</b>';
                }
                //article += '<b title="Signed" class="app-status_blue"><img src="img/tick.png">Sign</b>';
                article += '</div>';
                article += '</li>';

                $("#ulSearchResult").append(article);
            });

            if (vCount > 9) {
                $('#paginationSearchResult').css('display', '');
            }
            else {
                $('#paginationSearchResult').css('display', 'none');
            }

            $('#paginationSearchResult').pagination({
                items: vCount,
                itemsOnPage: 10,
                displayedPages: 3,
                edges: 1,
                type: 'ul',
                typeID: 'ulSearchResult',
                row: 'li',
                cssStyle: 'compact-theme'
            });
            $('#inserch2_Filter').click(function () {
                $('#inserch2_Filter').popModal({
                    html: $('#inserch2_FilterOptions'),
                    placement: 'bottomCenter',
                    showCloseBut: true,
                    onDocumentClickClose: true,
                    onDocumentClickClosePrevent: '',
                    inline: true,
                    overflowContent: false
                });
            });

            $("#loadingPage").fadeOut();
        },
        error:
            function (data) {
                $('#paginationSearchResult').css('display', 'none');
                $("#ulSearchResult").empty();
                $("#loadingPage").fadeOut();
                $("#spSearchResText").html('No result found.');
            }
    });
}

function SearchCounterparty() {
    $("#loadingPage").fadeIn();

    var vSearchText = encodeURIComponent($("#txtKeyword").val());
    var vShowCounterparty = $("input:radio[name=CounterpartyRadio]:checked").val();
    var vHideCounterparty = "";
    $('input:checkbox[name="CounterpartyCheck"]:checked').each(function () {
        vHideCounterparty += this.value + "; ";
    });

    $.ajax({
        url: '/api/accounts/' + localStorage.AccountID + '/Counterparty?searchkeyword=' + encodeURIComponent(vSearchText) + '&showcounterparty=' + encodeURIComponent(vShowCounterparty) + '&hidecounterparty=' + encodeURIComponent(vHideCounterparty),
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserName: localStorage.UserName },
        success: function (data) {
            $("#ulSearchResult").empty();
            listCounterparty = data;
            var vCount = data.length;
            $("#spSearchResText").html(vCount + ' results found. <a id="inserch2_Filter" class="linkText" href="javascript:void(0)">add more filters</a>');

            $(data).each(function (i, item) {
                var sRowKey = item.RowKey;
                var vURL = '/Counterparty/CounterpartyDetail?CounterpartyID=' + encodeURI(item.RowKey);

                var article = '<li>';
                article += '<div>';
                article += '<a class="search-Result-Heading" target="_blank" href="' + vURL + '">' + item.CounterpartyName + '</a>';

                article += '<span class="search-doc-Icons">';
                article += '<a href="javascript:void(0)" onclick="AddCounterpartyToMail(\'' + sRowKey + '\');"><img src="../Image/attached-mail.png"></a>';
                article += '<a href="javascript:void(0)" onclick="CounterpartyDetail(\'' + sRowKey + '\');"><img src="../Image/more-drop.png"></a>';
                article += '</span>';

                article += '</div>';
                article += '<div class="search-Doc-status">';
                if (item.DocumentStatus == "Inactive") {
                    article += '<b title="Not Active" class="status_red"><img src="../../Content/Images/status/new.png"/>nact</b>';
                }
                else if (item.DocumentStatus == "Active") {
                    article += '<b title="Active" class="status_green"><img src="../../Content/Images/status/active.png"/>actv</b>';
                }
                else {
                    article += '<b title="Not Assigned" class="status_red"><img src="../../Content/Images/status/new.png"/>nasg</b>';
                }
                //article += '<b title="Signed" class="app-status_blue"><img src="img/tick.png">Sign</b>';
                article += '</div>';
                article += '</li>';

                $("#ulSearchResult").append(article);
            });

            if (vCount > 9) {
                $('#paginationSearchResult').css('display', '');
            }
            else {
                $('#paginationSearchResult').css('display', 'none');
            }

            $('#paginationSearchResult').pagination({
                items: vCount,
                itemsOnPage: 10,
                displayedPages: 3,
                edges: 1,
                type: 'ul',
                typeID: 'ulSearchResult',
                row: 'li',
                cssStyle: 'compact-theme'
            });
            $('#inserch2_Filter').click(function () {
                $('#inserch2_Filter').popModal({
                    html: $('#inserch2_FilterOptions'),
                    placement: 'bottomCenter',
                    showCloseBut: true,
                    onDocumentClickClose: true,
                    onDocumentClickClosePrevent: '',
                    inline: true,
                    overflowContent: false
                });
            });

            $("#loadingPage").fadeOut();
        },
        error:
            function (data) {
                $('#paginationSearchResult').css('display', 'none');
                $("#ulSearchResult").empty();
                $("#loadingPage").fadeOut();
                //$("#spSearchResText").html('No result found.');
                $("#spSearchResText").html('0 results found. <a id="inserch2_Filter" class="linkText" href="javascript:void(0)">add more filters</a>');
                $('#inserch2_Filter').click(function () {
                    $('#inserch2_Filter').popModal({
                        html: $('#inserch2_FilterOptions'),
                        placement: 'bottomCenter',
                        showCloseBut: true,
                        onDocumentClickClose: true,
                        onDocumentClickClosePrevent: '',
                        inline: true,
                        overflowContent: false
                    });
                });
            }
    });
}

function SearchTemplate() {
    $("#loadingPage").fadeIn();

    if (localStorage.UserType.indexOf("Global Contract Owner") >= 0 || localStorage.UserType.indexOf("Global Administrator") >= 0) {
        var vSearchText = $("#txtKeyword").val();
        var vShowCounterparty = $("input:radio[name=CounterpartyRadio]:checked").val();
        var vHideCounterparty = "";
        $('input:checkbox[name="CounterpartyCheck"]:checked').each(function () {
            vHideCounterparty += this.value + "; ";
        });

        $.ajax({
            url: '/api/accounts/' + localStorage.AccountID + '/templatedocuments?searchkeyword=' + encodeURIComponent(vSearchText),
            type: 'GET',
            dataType: 'json',
            'Content-Type': 'application/json',
            cache: false,
            headers: { 'eContracts-ApiKey': localStorage.APIKey, UserName: localStorage.UserName },
            success: function (data) {
                $("#ulSearchResult").empty();
                listTemplate = data;
                var vCount = data.length;
                $("#spSearchResText").html(vCount + ' results found.');

                $(data).each(function (i, item) {
                    var sRowKey = item.RowKey;
                    var vURL = item.BlobDocumentURL;
                    //vURL = localStorage.SPHostUrl + "/_layouts/WopiFrame.aspx?sourcedoc=" + vURL + "&action=default";
                    vURL = "https://view.officeapps.live.com/op/embed.aspx?src=" + vURL + "?" + randomPassword(4) + "&wdStartOn=1&wdEmbedCode=0";

                    var article = '<li>';
                    article += '<div>';
                    article += '<a class="search-Result-Heading" target="_blank" href="' + vURL + '">' + item.TemplateName + '</a>';

                    article += '<span class="search-doc-Icons">';
                    article += '<a href="javascript:void(0)" onclick="AddTemplateToMail(\'' + sRowKey + '\');"><img src="../Image/attached-mail.png"></a>';
                    article += '<a href="javascript:void(0)" onclick="TemplateDetail(\'' + sRowKey + '\');"><img src="../Image/more-drop.png"></a>';
                    article += '</span>';

                    article += '</div>';
                    article += '</li>';

                    $("#ulSearchResult").append(article);
                });

                if (vCount > 9) {
                    $('#paginationSearchResult').css('display', '');
                }
                else {
                    $('#paginationSearchResult').css('display', 'none');
                }

                $('#paginationSearchResult').pagination({
                    items: vCount,
                    itemsOnPage: 10,
                    displayedPages: 3,
                    edges: 1,
                    type: 'ul',
                    typeID: 'ulSearchResult',
                    row: 'li',
                    cssStyle: 'compact-theme'
                });
                $('#inserch2_Filter').click(function () {
                    $('#inserch2_Filter').popModal({
                        html: $('#inserch2_FilterOptions'),
                        placement: 'bottomLeft',
                        showCloseBut: true,
                        onDocumentClickClose: true,
                        onDocumentClickClosePrevent: '',
                        inline: true,
                        overflowContent: false
                    });
                });

                $("#loadingPage").fadeOut();
            },
            error:
                function (data) {
                    $('#paginationSearchResult').css('display', 'none');
                    $("#ulSearchResult").empty();
                    $("#loadingPage").fadeOut();
                    $("#spSearchResText").html('No result found.');
                }
        });
    } else {
        $("#ulSearchResult").empty();
        $("#loadingPage").fadeOut();
        $("#spSearchResText").html('Don\'t have permission.');
    }
}

function AddContractToMail(conid) {
    var vFilterContract = $.grep(listContracts, function (n, i) {
        return (n.RowKey == conid);
    });

    Office.context.mailbox.item.body.getAsync(
"html",
{ asyncContext: "This is passed to the callback" },
function callback(result) {
    if (vFilterContract.length > 0 && result.value.indexOf('CON_' + conid) == -1) {
        var vConItem = vFilterContract[0];
        var article = '<table id="CON_' + conid + '" cellpadding="0" cellspacing="0" style=" border: solid #a4a4a4 1px; background-color:#fff; width:550px;  margin-bottom: 15px; border-collapse: separate; border-spacing: 10px;">';
        article += '<tbody style="font-size:14px;">';
        article += '<tr>';
        article += '<td style="border-bottom:1px solid #f1f1f1;color: #333;font-family: Arial, sans-serif !important;" colspan="2">';
        article += '<table style="width:100%;">';
        article += '<tbody style="width:100%;">';
        article += '<tr>';
        article += '<td style="font-size:18px; color: #44A6D8;width:100%;" class="PreserveSpace">' + vConItem.ContractTitle + '</td>';
        article += '<td style="float:right;width:100%;">';
        article += '<b title="Signed" style="background-color: #44A6D8; color:#fff; padding: 1px 5px 3px; border-radius: 5px;width:100%;float:left; "><img style="margin-right:0px;float:left;margin-top: 2px;" src="~/Content/Images/status/tick.png">' + vConItem.Status + '</b>';
        article += '</td>';
        article += '</tr>';
        article += '<tr>';
        article += '<td style="color:#C0C0C0; padding:0  0 15px ;"  colspan="2" >';
        article += '<b style="display: block;font-size:13px; font-weight: normal;margin-top: -10px;" class="PreserveSpace">' + vConItem.Description + '</b>';
        article += '</td>';
        article += '</tr>';
        article += '</tbody>';
        article += '</table>';
        article += '</td>';
        article += '</tr>';

        article += '<tr>';
        article += '<td style="border-bottom:1px solid #f1f1f1;color: #333;padding-bottom: 10px;font-family: Arial, sans-serif !important;" colspan="2">';
        article += '<table style="width:100%;">';
        article += '<tbody style="width:100%;">';
        article += '<tr>';
        article += '<td style="font-size:13px; color: #44A6D8; padding-bottom: 10px;" colspan="2" >Metadata Summary</td>';
        article += '</tr>';
        article += '<tr>';
        article += '<td style="width:40%;vertical-align: text-top;" >Contract Record Number:</td>';
        if (vConItem.ContractNumber != '')
            article += '<td style="width:60%;color: #666;">' + vConItem.ContractNumber + '</td>';
        else
            article += '<td style="width:60%;color: #666;">-</td>';
        article += '</tr>';
        article += '<tr>';
        article += '<td style="width:40%;vertical-align: text-top;" >Counterparty:</td>';
        if (vConItem.Counterparty != '')
            article += '<td style="width:60%;color: #666;">' + vConItem.Counterparty + '</td>';
        else
            article += '<td style="width:60%;color: #666;">-</td>';
        article += '</tr>';
        article += '<tr>';
        article += '<td style="width:40%;vertical-align: text-top;" >Business Area:</td>';
        article += '<td style="width:60%;color: #666;">' + vConItem.BusinessArea + '</td>';
        article += '</tr>';
        article += '<tr>';
        article += '<td style="width:40%;vertical-align: text-top;" >Contract Owner(s):</td>';
        if (vConItem.ContractManagers != '')
            article += '<td style="width:60%;color: #666;">' + vConItem.ContractManagers + '</td>';
        else
            article += '<td style="width:60%;color: #666;">-</td>';
        article += '</tr>';
        article += '<tr>';
        article += '<td style="width:40%;vertical-align: text-top;" >Created Date:</td>';
        article += '<td style="width:60%;color: #666;">' + moment(new Date(vConItem.Created)).format('MM/DD/YYYY') + '</td>';
        article += '</tr>';
        article += '</tbody>';
        article += '</table>';
        article += '</td>';
        article += '</tr>';

        article += '<tr>';
        article += '<td style="color: #333;font-family: Arial, sans-serif !important;" colspan="2">';
        article += '<table style="width:100%;">';
        article += '<tbody style="width:100%;">';
        article += '<tr>';
        article += '<td style="font-size:13px; color: #44A6D8;padding-bottom: 10px;" colspan="2" >Timeline Summary</td>';
        article += '</tr>';

        if (vConItem.ContractTermType == "Fixed Term") {
            article += '<tr>';
            article += '<td style="width:40%;vertical-align: text-top;" >Start / Effective Date:</td>';
            if (vConItem.StartDate != null)
                article += '<td style="width:60%;color: #666;">' + moment(new Date(vConItem.StartDate)).format('MM/DD/YYYY') + '</td>';
            else
                article += '<td style="width:60%;color: #666;">-</td>';
            article += '</tr>';
            article += '<tr>';
            article += '<td style="width:40%;vertical-align: text-top;" >Next Evaluation Date:</td>';
            if (vConItem.NextEvaluationDate != null)
                article += '<td style="width:60%;color: #666;">' + moment(new Date(vConItem.NextEvaluationDate)).format('MM/DD/YYYY') + '</td>';
            else
                article += '<td style="width:60%;color: #666;">-</td>';
            article += '</tr>';
            article += '<tr>';
            article += '<td style="width:40%;vertical-align: text-top;" >End Date:</td>';
            if (vConItem.EndDate != null)
                article += '<td style="width:60%;color: #666;">' + moment(new Date(vConItem.EndDate)).format('MM/DD/YYYY') + '</td>';
            else
                article += '<td style="width:60%;color: #666;">-</td>';
            article += '</tr>';
        } else if (vConItem.ContractTermType == "Evergreen / Perpetual") {
            article += '<tr>';
            article += '<td style="width:40%;vertical-align: text-top;" >Start / Effective Date:</td>';
            if (vConItem.StartDate != null)
                article += '<td style="width:60%;color: #666;">' + moment(new Date(vConItem.StartDate)).format('MM/DD/YYYY') + '</td>';
            else
                article += '<td style="width:60%;color: #666;">-</td>';
            article += '</tr>';
            article += '<tr>';
            article += '<td style="width:40%;vertical-align: text-top;" >Next Evaluation Date:</td>';
            if (vConItem.NextEvaluationDate != null)
                article += '<td style="width:60%;color: #666;">' + moment(new Date(vConItem.NextEvaluationDate)).format('MM/DD/YYYY') + '</td>';
            else
                article += '<td style="width:60%;color: #666;">-</td>';
            article += '</tr>';
        } else if (vConItem.ContractTermType == "Executed / Performance") {
            article += '<tr>';
            article += '<td style="width:40%;vertical-align: text-top;" >Date of Execution / Performance:</td>';
            if (vConItem.StartDate != null)
                article += '<td style="width:60%;color: #666;">' + moment(new Date(vConItem.StartDate)).format('MM/DD/YYYY') + '</td>';
            else
                article += '<td style="width:60%;color: #666;">-</td>';
            article += '</tr>';
        } else if (vConItem.ContractTermType == "Renewable") {
            article += '<tr>';
            article += '<td style="width:40%;vertical-align: text-top;" >Start / Effective Date:</td>';
            if (vConItem.StartDate != null)
                article += '<td style="width:60%;color: #666;">' + moment(new Date(vConItem.StartDate)).format('MM/DD/YYYY') + '</td>';
            else
                article += '<td style="width:60%;color: #666;">-</td>';
            article += '</tr>';
            article += '<tr>';
            article += '<td style="width:40%;vertical-align: text-top;" >End Date:</td>';
            if (vConItem.EndDate != null)
                article += '<td style="width:60%;color: #666;">' + moment(new Date(vConItem.EndDate)).format('MM/DD/YYYY') + '</td>';
            else
                article += '<td style="width:60%;color: #666;">-</td>';
            article += '</tr>';
            article += '<tr>';
            article += '<td style="width:40%;vertical-align: text-top;" >Current Term Ends:</td>';
            if (vConItem.TermEndDate != null)
                article += '<td style="width:60%;color: #666;">' + moment(new Date(vConItem.TermEndDate)).format('MM/DD/YYYY') + '</td>';
            else
                article += '<td style="width:60%;color: #666;">-</td>';
            article += '</tr>';
            article += '<tr>';
            article += '<td style="width:40%;vertical-align: text-top;" >Renew On / Anniversary Date:</td>';
            if (vConItem.RenewalDate != null)
                article += '<td style="width:60%;color: #666;">' + moment(new Date(vConItem.RenewalDate)).format('MM/DD/YYYY') + '</td>';
            else
                article += '<td style="width:60%;color: #666;">-</td>';
            article += '</tr>';
        } else {
            article += '<tr>';
            article += '<td style="color: #666;" colspan="2" >No Timeline Summary</td>';
            article += '</tr>';
        }

        article += '</tbody>';
        article += '</table>';
        article += '</td>';
        article += '</tr>';
        article += '</tbody>';
        article += '</table><br/>';


        Office.cast.item.toItemCompose(Office.context.mailbox.item).body.setSelectedDataAsync(article, { coercionType: "html" });
    } else {
        app.initialize();
        app.showNotification("", "This contract tagged to this mail previously.");
    }
});
    //Office.cast.item.toItemCompose(Office.context.mailbox.item).body.getAsync(function (result) {
    //    var vTab = result.value;
    //    app.initialize();
    //    app.showNotification("", vTab);
    //});
    //app.initialize();
    //app.showNotification("", $("#C_" + conid).html());
    //var vTab = Office.cast.item.toItemCompose(Office.context.mailbox.item).body;
    //if (vFilterContract.length > 0) {
    //    var vConItem = vFilterContract[0];
    //    var article = '<table id="CON_' + conid + '" cellpadding="0" cellspacing="0" style=" border: solid #a4a4a4 1px; background-color:#fff; width:550px;  margin-bottom: 15px; border-collapse: separate; border-spacing: 10px;">';
    //    article += '<tbody style="font-size:14px;">';
    //    article += '<tr>';
    //    article += '<td style="border-bottom:1px solid #f1f1f1;color: #333;font-family: Arial, sans-serif !important;" colspan="2">';
    //    article += '<table style="width:100%;">';
    //    article += '<tbody style="width:100%;">';
    //    article += '<tr>';
    //    article += '<td style="font-size:18px; color: #44A6D8;width:100%;">' + vConItem.ContractTitle + '</td>';
    //    article += '<td style="float:right;width:100%;">';
    //    article += '<b title="Signed" style="background-color: #44A6D8; color:#fff; padding: 1px 5px 3px; border-radius: 5px;width:100%;float:left; "><img style="margin-right:0px;float:left;margin-top: 2px;" src="https://contracts365v2.azurewebsites.net/Content/Images/status/tick.png">' + vConItem.Status + '</b>';
    //    article += '</td>';
    //    article += '</tr>';
    //    article += '<tr>';
    //    article += '<td style="color:#C0C0C0; padding:0  0 15px ;"  colspan="2" >';
    //    article += '<b style="display: block;font-size:13px; font-weight: normal;margin-top: -10px;">' + vConItem.Description + '</b>';
    //    article += '</td>';
    //    article += '</tr>';
    //    article += '</tbody>';
    //    article += '</table>';
    //    article += '</td>';
    //    article += '</tr>';

    //    article += '<tr>';
    //    article += '<td style="border-bottom:1px solid #f1f1f1;color: #333;padding-bottom: 10px;font-family: Arial, sans-serif !important;" colspan="2">';
    //    article += '<table style="width:100%;">';
    //    article += '<tbody style="width:100%;">';
    //    article += '<tr>';
    //    article += '<td style="font-size:13px; color: #44A6D8; padding-bottom: 10px;" colspan="2" >Metadata Summary</td>';
    //    article += '</tr>';
    //    article += '<tr>';
    //    article += '<td style="width:40%;vertical-align: text-top;" >Contract Number:</td>';
    //    if(vConItem.ContractNumber!='')
    //        article += '<td style="width:60%;color: #666;">' + vConItem.ContractNumber + '</td>';
    //    else
    //        article += '<td style="width:60%;color: #666;">-</td>';
    //    article += '</tr>';
    //    article += '<tr>';
    //    article += '<td style="width:40%;vertical-align: text-top;" >Counterparty:</td>';
    //    if (vConItem.Counterparty != '')
    //        article += '<td style="width:60%;color: #666;">' + vConItem.Counterparty + '</td>';
    //    else
    //        article += '<td style="width:60%;color: #666;">-</td>';
    //    article += '</tr>';
    //    article += '<tr>';
    //    article += '<td style="width:40%;vertical-align: text-top;" >Business Area:</td>';
    //    article += '<td style="width:60%;color: #666;">' + vConItem.BusinessArea + '</td>';
    //    article += '</tr>';
    //    article += '<tr>';
    //    article += '<td style="width:40%;vertical-align: text-top;" >Contract Owner(s):</td>';
    //    if (vConItem.ContractManagers != '')
    //        article += '<td style="width:60%;color: #666;">' + vConItem.ContractManagers + '</td>';
    //    else
    //        article += '<td style="width:60%;color: #666;">-</td>';
    //    article += '</tr>';
    //    article += '<tr>';
    //    article += '<td style="width:40%;vertical-align: text-top;" >Created Date:</td>';
    //    article += '<td style="width:60%;color: #666;">' + moment(new Date(vConItem.Created)).format('MM/DD/YYYY') + '</td>';
    //    article += '</tr>';
    //    article += '</tbody>';
    //    article += '</table>';
    //    article += '</td>';
    //    article += '</tr>';

    //    article += '<tr>';
    //    article += '<td style="color: #333;font-family: Arial, sans-serif !important;" colspan="2">';
    //    article += '<table style="width:100%;">';
    //    article += '<tbody style="width:100%;">';
    //    article += '<tr>';
    //    article += '<td style="font-size:13px; color: #44A6D8;padding-bottom: 10px;" colspan="2" >Timeline Summary</td>';
    //    article += '</tr>';

    //    if (vConItem.ContractTermType == "Fixed Term") {
    //        article += '<tr>';
    //        article += '<td style="width:40%;vertical-align: text-top;" >Start / Effective Date:</td>';
    //        if (vConItem.StartDate != null)
    //            article += '<td style="width:60%;color: #666;">' + moment(new Date(vConItem.StartDate)).format('MM/DD/YYYY') + '</td>';
    //        else
    //            article += '<td style="width:60%;color: #666;">-</td>';
    //        article += '</tr>';
    //        article += '<tr>';
    //        article += '<td style="width:40%;vertical-align: text-top;" >Next Evaluation Date:</td>';
    //        if (vConItem.NextEvaluationDate != null)
    //            article += '<td style="width:60%;color: #666;">' + moment(new Date(vConItem.NextEvaluationDate)).format('MM/DD/YYYY') + '</td>';
    //        else
    //            article += '<td style="width:60%;color: #666;">-</td>';
    //        article += '</tr>';
    //        article += '<tr>';
    //        article += '<td style="width:40%;vertical-align: text-top;" >End Date:</td>';
    //        if (vConItem.EndDate != null)
    //            article += '<td style="width:60%;color: #666;">' + moment(new Date(vConItem.EndDate)).format('MM/DD/YYYY') + '</td>';
    //        else
    //            article += '<td style="width:60%;color: #666;">-</td>';
    //        article += '</tr>';
    //    } else if (vConItem.ContractTermType == "Evergreen / Perpetual") {
    //        article += '<tr>';
    //        article += '<td style="width:40%;vertical-align: text-top;" >Start / Effective Date:</td>';
    //        if (vConItem.StartDate != null)
    //            article += '<td style="width:60%;color: #666;">' + moment(new Date(vConItem.StartDate)).format('MM/DD/YYYY') + '</td>';
    //        else
    //            article += '<td style="width:60%;color: #666;">-</td>';
    //        article += '</tr>';
    //        article += '<tr>';
    //        article += '<td style="width:40%;vertical-align: text-top;" >Next Evaluation Date:</td>';
    //        if (vConItem.NextEvaluationDate != null)
    //            article += '<td style="width:60%;color: #666;">' + moment(new Date(vConItem.NextEvaluationDate)).format('MM/DD/YYYY') + '</td>';
    //        else
    //            article += '<td style="width:60%;color: #666;">-</td>';
    //        article += '</tr>';
    //    } else if (vConItem.ContractTermType == "Executed / Performance") {
    //        article += '<tr>';
    //        article += '<td style="width:40%;vertical-align: text-top;" >Date of Execution / Performance:</td>';
    //        if (vConItem.StartDate != null)
    //            article += '<td style="width:60%;color: #666;">' + moment(new Date(vConItem.StartDate)).format('MM/DD/YYYY') + '</td>';
    //        else
    //            article += '<td style="width:60%;color: #666;">-</td>';
    //        article += '</tr>';
    //    } else if (vConItem.ContractTermType == "Renewable") {
    //        article += '<tr>';
    //        article += '<td style="width:40%;vertical-align: text-top;" >Start / Effective Date:</td>';
    //        if (vConItem.StartDate != null)
    //            article += '<td style="width:60%;color: #666;">' + moment(new Date(vConItem.StartDate)).format('MM/DD/YYYY') + '</td>';
    //        else
    //            article += '<td style="width:60%;color: #666;">-</td>';
    //        article += '</tr>';
    //        article += '<tr>';
    //        article += '<td style="width:40%;vertical-align: text-top;" >End Date:</td>';
    //        if (vConItem.EndDate != null)
    //            article += '<td style="width:60%;color: #666;">' + moment(new Date(vConItem.EndDate)).format('MM/DD/YYYY') + '</td>';
    //        else
    //            article += '<td style="width:60%;color: #666;">-</td>';
    //        article += '</tr>';
    //        article += '<tr>';
    //        article += '<td style="width:40%;vertical-align: text-top;" >Current Term Ends:</td>';
    //        if (vConItem.TermEndDate != null)
    //            article += '<td style="width:60%;color: #666;">' + moment(new Date(vConItem.TermEndDate)).format('MM/DD/YYYY') + '</td>';
    //        else
    //            article += '<td style="width:60%;color: #666;">-</td>';
    //        article += '</tr>';
    //        article += '<tr>';
    //        article += '<td style="width:40%;vertical-align: text-top;" >Renew On / Anniversary Date:</td>';
    //        if (vConItem.RenewalDate != null)
    //            article += '<td style="width:60%;color: #666;">' + moment(new Date(vConItem.RenewalDate)).format('MM/DD/YYYY') + '</td>';
    //        else
    //            article += '<td style="width:60%;color: #666;">-</td>';
    //        article += '</tr>';
    //    } else {
    //        article += '<tr>';
    //        article += '<td style="color: #666;" colspan="2" >No Timeline Summary</td>';
    //        article += '</tr>';
    //    }

    //    article += '</tbody>';
    //    article += '</table>';
    //    article += '</td>';
    //    article += '</tr>';
    //    article += '</tbody>';
    //    article += '</table><br/>';


    //    Office.cast.item.toItemCompose(Office.context.mailbox.item).body.setSelectedDataAsync(article, { coercionType: "html" });
    //}
}

function ContractDetail(conid) {
    var vFilterContract = $.grep(listContracts, function (n, i) {
        return (n.RowKey == conid);
    });
    if (vFilterContract.length > 0) {
        var vConItem = vFilterContract[0];
        var article = '';
        if (vConItem.Description != '')
            article += '<li class="taB-pop-Up-text">' + vConItem.Description + '</li>';
        article += '<li><span class="taB-pop-Up-Left">Contract Record Number :</span>';
        if (vConItem.ContractNumber != '')
            article += '<span class="taB-pop-Up-Right">' + vConItem.ContractNumber + '</span></li>';
        else
            article += '<span class="taB-pop-Up-Right">-</span></li>';
        article += '<li><span class="taB-pop-Up-Left">Counterparty :</span>';
        if (vConItem.Counterparty != '')
            article += '<span class="taB-pop-Up-Right">' + vConItem.Counterparty + '</span></li>';
        else
            article += '<span class="taB-pop-Up-Right">-</span></li>';
        article += '<li><span class="taB-pop-Up-Left">Business Area :</span>';
        article += '<span class="taB-pop-Up-Right">' + vConItem.BusinessArea + '</span></li>';
        article += '<li><span class="taB-pop-Up-Left">Contract Owner(s) :</span>';
        if (vConItem.ContractManagers != '')
            article += '<span class="taB-pop-Up-Right">' + vConItem.ContractManagers + '</span></li>';
        else
            article += '<span class="taB-pop-Up-Right">-</span></li>';
        article += '<li><span class="taB-pop-Up-Left">Created Date :</span>';
        article += '<span class="taB-pop-Up-Right">' + moment(new Date(vConItem.Created)).format('MM/DD/YYYY') + '</span></li>';

        if (vConItem.ContractTermType != "") {
            article += '<li><span class="taB-pop-Up-Left">Term Type :</span>';
            article += '<span class="taB-pop-Up-Right">' + vConItem.ContractTermType + '</span></li>';

            if (vConItem.ContractTermType == "Fixed Term") {
                article += '<li><span class="taB-pop-Up-Left">Start / Effective Date :</span>';
                if (vConItem.StartDate != null)
                    article += '<span class="taB-pop-Up-Right">' + moment(new Date(vConItem.StartDate)).format('MM/DD/YYYY') + '</span></li>';
                else
                    article += '<span class="taB-pop-Up-Right">-</span></li>';
                article += '<li><span class="taB-pop-Up-Left">Next Evaluation Date :</span>';
                if (vConItem.NextEvaluationDate != null)
                    article += '<span class="taB-pop-Up-Right">' + moment(new Date(vConItem.NextEvaluationDate)).format('MM/DD/YYYY') + '</span></li>';
                else
                    article += '<span class="taB-pop-Up-Right">-</span></li>';
                article += '<li><span class="taB-pop-Up-Left">End Date :</span>';
                if (vConItem.EndDate != null)
                    article += '<span class="taB-pop-Up-Right">' + moment(new Date(vConItem.EndDate)).format('MM/DD/YYYY') + '</span></li>';
                else
                    article += '<span class="taB-pop-Up-Right">-</span></li>';
            } else if (vConItem.ContractTermType == "Evergreen / Perpetual") {
                article += '<li><span class="taB-pop-Up-Left">Start / Effective Date :</span>';
                if (vConItem.StartDate != null)
                    article += '<span class="taB-pop-Up-Right">' + moment(new Date(vConItem.StartDate)).format('MM/DD/YYYY') + '</span></li>';
                else
                    article += '<span class="taB-pop-Up-Right">-</span></li>';
                article += '<li><span class="taB-pop-Up-Left">Next Evaluation Date :</span>';
                if (vConItem.NextEvaluationDate != null)
                    article += '<span class="taB-pop-Up-Right">' + moment(new Date(vConItem.NextEvaluationDate)).format('MM/DD/YYYY') + '</span></li>';
                else
                    article += '<span class="taB-pop-Up-Right">-</span></li>';
            } else if (vConItem.ContractTermType == "Executed / Performance") {
                article += '<li><span class="taB-pop-Up-Left">Date of Execution / Performance :</span>';
                if (vConItem.StartDate != null)
                    article += '<span class="taB-pop-Up-Right">' + moment(new Date(vConItem.StartDate)).format('MM/DD/YYYY') + '</span></li>';
                else
                    article += '<span class="taB-pop-Up-Right">-</span></li>';
            } else if (vConItem.ContractTermType == "Renewable") {
                article += '<li><span class="taB-pop-Up-Left">Start / Effective Date :</span>';
                if (vConItem.StartDate != null)
                    article += '<span class="taB-pop-Up-Right">' + moment(new Date(vConItem.StartDate)).format('MM/DD/YYYY') + '</span></li>';
                else
                    article += '<span class="taB-pop-Up-Right">-</span></li>';
                article += '<li><span class="taB-pop-Up-Left">End Date :</span>';
                if (vConItem.EndDate != null)
                    article += '<span class="taB-pop-Up-Right">' + moment(new Date(vConItem.EndDate)).format('MM/DD/YYYY') + '</span></li>';
                else
                    article += '<span class="taB-pop-Up-Right">-</span></li>';
                article += '<li><span class="taB-pop-Up-Left">Current Term Ends :</span>';
                if (vConItem.TermEndDate != null)
                    article += '<span class="taB-pop-Up-Right">' + moment(new Date(vConItem.TermEndDate)).format('MM/DD/YYYY') + '</span></li>';
                else
                    article += '<span class="taB-pop-Up-Right">-</span></li>';
                article += '<li><span class="taB-pop-Up-Left">Renew On / Anniversary Date :</span>';
                if (vConItem.RenewalDate != null)
                    article += '<span class="taB-pop-Up-Right">' + moment(new Date(vConItem.RenewalDate)).format('MM/DD/YYYY') + '</span></li>';
                else
                    article += '<span class="taB-pop-Up-Right">-</span></li>';
            }
        }

        $("#ulDetail").html(article);
        $("#dvDetail").dialog("option", "title", vConItem.ContractTitle);
        $("#dvDetail").dialog("open");
    }
}

function AddDocumentToMail(conid) {
    var article = '';
    var vFilterContract = $.grep(listDocuments, function (n, i) {
        return (n.RowKey == conid);
    });
    Office.context.mailbox.item.body.getAsync(
"html",
{ asyncContext: "This is passed to the callback" },
function callback(result) {
    if (vFilterContract.length > 0 && result.value.indexOf('DOC_' + conid) == -1) {
        var vConItem = vFilterContract[0];
        $("#loadingPage").fadeIn();
        $.ajax({
            url: '/api/accounts/' + localStorage.AccountID + '/Documents/SendDocumentsToBlob?DocumentUrl=' + encodeURIComponent(vConItem.DocumentUrl),
            type: 'POST',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
            cache: false,
            success: function (person) {
                if (person != '') {
                    var vBlobDocArr = person.split('~');
                    $.each(vBlobDocArr, function (index, value) {
                        Office.cast.item.toItemCompose(Office.context.mailbox.item).addFileAttachmentAsync(value, vConItem.DocumentName);
                    });
                    Office.cast.item.toItemCompose(Office.context.mailbox.item).body.setSelectedDataAsync(article, { coercionType: "html" });

                    DeleteTempDocs(person);
                }
                $("#loadingPage").fadeOut();
            },
            error:
                function (data) {
                    $("#loadingPage").fadeOut();
                }
        });

        article = '<table id="DOC_' + conid + '" cellpadding="0" cellspacing="0" style=" border: solid #a4a4a4 1px; background-color:#fff; width:550px;  margin-bottom: 15px; border-collapse: separate; border-spacing: 10px;">';
        article += '<tbody style="font-size:14px;">';
        article += '<tr>';
        article += '<td style="border-bottom:1px solid #f1f1f1;color: #333;font-family: Arial, sans-serif !important;" colspan="2">';
        article += '<table style="width:100%;">';
        article += '<tbody style="width:100%;">';
        article += '<tr>';
        article += '<td style="font-size:18px; color: #44A6D8;">' + vConItem.DocumentName + '</td>';
        article += '<td style="float:right;">';
        article += '<b title="Signed" style="background-color: #44A6D8; color:#fff; padding: 1px 5px 3px; border-radius: 5px;width:100%; "><img style="margin-right:4px;" src="~/Content/Images/status/tick.png">' + vConItem.DocumentStatus + '</b>';
        article += '</td>';
        article += '</tr>';
        article += '<tr>';
        article += '<td style="color:#C0C0C0; padding:0  0 15px ;"  colspan="2" >';
        article += '<b style="display: block;font-size:13px; font-weight: normal;margin-top: -10px;">' + vConItem.Description + '</b>';
        article += '</td>';
        article += '</tr>';
        article += '</tbody>';
        article += '</table>';
        article += '</td>';
        article += '</tr>';

        article += '<tr>';
        article += '<td style="border-bottom:1px solid #f1f1f1;color: #333;padding-bottom: 10px;font-family: Arial, sans-serif !important;" colspan="2">';
        article += '<table style="width:100%;">';
        article += '<tbody style="width:100%;">';
        article += '<tr>';
        article += '<td style="font-size:13px; color: #44A6D8; padding-bottom: 10px;" colspan="2" >Metadata Summary</td>';
        article += '</tr>';
        article += '<tr>';
        article += '<td style="width:40%;vertical-align: text-top;" >Document Type:</td>';
        if (vConItem.DocumentType != '')
            article += '<td style="width:60%;color: #666;">' + vConItem.DocumentType + '</td>';
        else
            article += '<td style="width:60%;color: #666;">-</td>';
        article += '</tr>';
        article += '<tr>';
        article += '<td style="width:40%;vertical-align: text-top;" >Contract Title:</td>';
        if (vConItem.ContractTitle != '')
            article += '<td style="width:60%;color: #666;" class="PreserveSpace">' + vConItem.ContractTitle + '</td>';
        else
            article += '<td style="width:60%;color: #666;">-</td>';
        article += '</tr>';
        article += '<tr>';
        article += '<td style="width:40%;vertical-align: text-top;" >Business Area:</td>';
        article += '<td style="width:60%;color: #666;">' + vConItem.BusinessArea + '</td>';
        article += '</tr>';
        article += '<tr>';
        article += '<td style="width:40%;vertical-align: text-top;" >Created By:</td>';
        article += '<td style="width:60%;color: #666;">' + vConItem.CreatedBy + '</td>';
        article += '</tr>';
        article += '<tr>';
        article += '<td style="width:40%;vertical-align: text-top;" >Created Date:</td>';
        article += '<td style="width:60%;color: #666;">' + moment(new Date(vConItem.Created)).format('MM/DD/YYYY') + '</td>';
        article += '</tr>';
        article += '</tbody>';
        article += '</table>';
        article += '</td>';
        article += '</tr>';

        article += '</tbody>';
        article += '</table><br/>';


    } else {
        app.initialize();
        app.showNotification("", "This contract tagged to this mail previously.");
    }
});


    //if (vFilterContract.length > 0) {
    //    var vConItem = vFilterContract[0];
    //    $("#loadingPage").fadeIn();
    //    $.ajax({
    //        url: '/api/accounts/' + localStorage.AccountID + '/Documents/SendDocumentsToBlob?DocumentUrl=' + encodeURIComponent(vConItem.DocumentUrl),
    //        type: 'POST',
    //        dataType: 'json',
    //        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging  },
    //        cache: false,
    //        success: function (person) {
    //            if (person != '') {
    //                var vBlobDocArr = person.split('~');
    //                $.each(vBlobDocArr, function (index, value) {
    //                    Office.cast.item.toItemCompose(Office.context.mailbox.item).addFileAttachmentAsync(value, vConItem.DocumentName);
    //                });
    //                Office.cast.item.toItemCompose(Office.context.mailbox.item).body.setSelectedDataAsync(article, { coercionType: "html" });

    //                DeleteTempDocs(person);
    //            }
    //            $("#loadingPage").fadeOut();
    //        },
    //        error:
    //            function (data) {
    //                $("#loadingPage").fadeOut();
    //            }
    //    });

    //    article = '<table cellpadding="0" cellspacing="0" style=" border: solid #a4a4a4 1px; background-color:#fff; width:550px;  margin-bottom: 15px; border-collapse: separate; border-spacing: 10px;">';
    //    article += '<tbody style="font-size:14px;">';
    //    article += '<tr>';
    //    article += '<td style="border-bottom:1px solid #f1f1f1;color: #333;font-family: Arial, sans-serif !important;" colspan="2">';
    //    article += '<table style="width:100%;">';
    //    article += '<tbody style="width:100%;">';
    //    article += '<tr>';
    //    article += '<td style="font-size:18px; color: #44A6D8;">' + vConItem.DocumentName + '</td>';
    //    article += '<td style="float:right;">';
    //    article += '<b title="Signed" style="background-color: #44A6D8; color:#fff; padding: 1px 5px 3px; border-radius: 5px;width:100%; "><img style="margin-right:4px;" src="https://contracts365v2.azurewebsites.net/Content/Images/status/tick.png">' + vConItem.DocumentStatus + '</b>';
    //    article += '</td>';
    //    article += '</tr>';
    //    article += '<tr>';
    //    article += '<td style="color:#C0C0C0; padding:0  0 15px ;"  colspan="2" >';
    //    article += '<b style="display: block;font-size:13px; font-weight: normal;margin-top: -10px;">' + vConItem.Description + '</b>';
    //    article += '</td>';
    //    article += '</tr>';
    //    article += '</tbody>';
    //    article += '</table>';
    //    article += '</td>';
    //    article += '</tr>';

    //    article += '<tr>';
    //    article += '<td style="border-bottom:1px solid #f1f1f1;color: #333;padding-bottom: 10px;font-family: Arial, sans-serif !important;" colspan="2">';
    //    article += '<table style="width:100%;">';
    //    article += '<tbody style="width:100%;">';
    //    article += '<tr>';
    //    article += '<td style="font-size:13px; color: #44A6D8; padding-bottom: 10px;" colspan="2" >Metadata Summary</td>';
    //    article += '</tr>';
    //    article += '<tr>';
    //    article += '<td style="width:40%;vertical-align: text-top;" >Document Type:</td>';
    //    if (vConItem.DocumentType != '')
    //        article += '<td style="width:60%;color: #666;">' + vConItem.DocumentType + '</td>';
    //    else
    //        article += '<td style="width:60%;color: #666;">-</td>';
    //    article += '</tr>';
    //    article += '<tr>';
    //    article += '<td style="width:40%;vertical-align: text-top;" >Contract Title:</td>';
    //    if (vConItem.ContractTitle != '')
    //        article += '<td style="width:60%;color: #666;">' + vConItem.ContractTitle + '</td>';
    //    else
    //        article += '<td style="width:60%;color: #666;">-</td>';
    //    article += '</tr>';
    //    article += '<tr>';
    //    article += '<td style="width:40%;vertical-align: text-top;" >Business Area:</td>';
    //    article += '<td style="width:60%;color: #666;">' + vConItem.BusinessArea + '</td>';
    //    article += '</tr>';
    //    article += '<tr>';
    //    article += '<td style="width:40%;vertical-align: text-top;" >Created By:</td>';
    //    article += '<td style="width:60%;color: #666;">' + vConItem.CreatedBy + '</td>';
    //    article += '</tr>';
    //    article += '<tr>';
    //    article += '<td style="width:40%;vertical-align: text-top;" >Created Date:</td>';
    //    article += '<td style="width:60%;color: #666;">' + moment(new Date(vConItem.Created)).format('MM/DD/YYYY') + '</td>';
    //    article += '</tr>';
    //    article += '</tbody>';
    //    article += '</table>';
    //    article += '</td>';
    //    article += '</tr>';

    //    article += '</tbody>';
    //    article += '</table><br/>';


    //}
}

function DocumentDetail(conid) {
    var vFilterContract = $.grep(listDocuments, function (n, i) {
        return (n.RowKey == conid);
    });
    if (vFilterContract.length > 0) {
        var vConItem = vFilterContract[0];
        var article = '';
        if (vConItem.Description != '')
            article += '<li class="taB-pop-Up-text">' + vConItem.Description + '</li>';
        article += '<li><span class="taB-pop-Up-Left">Document Type :</span>';
        if (vConItem.DocumentType != '')
            article += '<span class="taB-pop-Up-Right">' + vConItem.DocumentType + '</span></li>';
        else
            article += '<span class="taB-pop-Up-Right">-</span></li>';
        article += '<li><span class="taB-pop-Up-Left">Contract Title :</span>';
        if (vConItem.ContractTitle != '')
            article += '<span class="taB-pop-Up-Right PreserveSpace">' + vConItem.ContractTitle + '</span></li>';
        else
            article += '<span class="taB-pop-Up-Right">-</span></li>';
        article += '<li><span class="taB-pop-Up-Left">Business Area :</span>';
        article += '<span class="taB-pop-Up-Right">' + vConItem.BusinessArea + '</span></li>';
        article += '<li><span class="taB-pop-Up-Left">Created By :</span>';
        article += '<span class="taB-pop-Up-Right">' + vConItem.CreatedBy + '</span></li>';
        article += '<li><span class="taB-pop-Up-Left">Created Date :</span>';
        article += '<span class="taB-pop-Up-Right">' + moment(new Date(vConItem.Created)).format('MM/DD/YYYY') + '</span></li>';

        $("#ulDetail").html(article);
        $("#dvDetail").dialog("option", "title", vConItem.DocumentName);
        $("#dvDetail").dialog("open");
    }
}

function AddCounterpartyToMail(conid) {
    var vFilterContract = $.grep(listCounterparty, function (n, i) {
        return (n.RowKey == conid);
    });
    Office.context.mailbox.item.body.getAsync(
"html",
{ asyncContext: "This is passed to the callback" },
function callback(result) {
    if (vFilterContract.length > 0 && result.value.indexOf('CONP_' + conid) == -1) {
        var vConItem = vFilterContract[0];
        var article = '<table id="CONP_' + conid + '" cellpadding="0" cellspacing="0" style=" border: solid #a4a4a4 1px; background-color:#fff; width:550px;  margin-bottom: 15px; border-collapse: separate; border-spacing: 10px;">';
        article += '<tbody style="font-size:14px;">';
        article += '<tr>';
        article += '<td style="border-bottom:1px solid #f1f1f1;color: #333;font-family: Arial, sans-serif !important;" colspan="2">';
        article += '<table style="width:100%;">';
        article += '<tbody style="width:100%;">';
        article += '<tr>';
        article += '<td style="font-size:18px; color: #44A6D8;width:100%;" colspan="2">' + vConItem.CounterpartyName + '</td>';
        article += '<td style="float:right;width: 100%;">';
        article += '<b title="Signed" style="background-color: #44A6D8; color:#fff; padding: 1px 5px 3px; border-radius: 5px;width:100%;float: left; "><img style="margin-right: 0px;float: left;margin-top: 2px;" src="~/Content/Images/status/tick.png">' + vConItem.Status + '</b>';
        article += '</td>';
        article += '</tr>';
        article += '</tbody>';
        article += '</table>';
        article += '</td>';
        article += '</tr>';

        article += '<tr>';
        article += '<td style="border-bottom:1px solid #f1f1f1;color: #333;padding-bottom: 10px;font-family: Arial, sans-serif !important;" colspan="2">';
        article += '<table style="width:100%;">';
        article += '<tbody style="width:100%;">';
        article += '<tr>';
        article += '<td style="width:40%;vertical-align: text-top;" >Counter-party Type:</td>';
        if (vConItem.CounterpartyType != '')
            article += '<td style="width:60%;color: #666;">' + vConItem.CounterpartyType + '</td>';
        else
            article += '<td style="width:60%;color: #666;">-</td>';
        article += '</tr>';
        article += '<tr>';
        article += '<td style="width:40%;vertical-align: text-top;" >Created By:</td>';
        article += '<td style="width:60%;color: #666;">' + vConItem.CreatedBy + '</td>';
        article += '</tr>';
        article += '<tr>';
        article += '<td style="width:40%;vertical-align: text-top;" >Created Date:</td>';
        article += '<td style="width:60%;color: #666;">' + moment(new Date(vConItem.Created)).format('MM/DD/YYYY') + '</td>';
        article += '</tr>';
        article += '</tbody>';
        article += '</table>';
        article += '</td>';
        article += '</tr>';

        article += '</tbody>';
        article += '</table><br/>';


        Office.cast.item.toItemCompose(Office.context.mailbox.item).body.setSelectedDataAsync(article, { coercionType: "html" });

    } else {
        app.initialize();
        app.showNotification("", "This contract tagged to this mail previously.");
    }
});

    //if (vFilterContract.length > 0) {
    //    var vConItem = vFilterContract[0];
    //    var article = '<table cellpadding="0" cellspacing="0" style=" border: solid #a4a4a4 1px; background-color:#fff; width:550px;  margin-bottom: 15px; border-collapse: separate; border-spacing: 10px;">';
    //    article += '<tbody style="font-size:14px;">';
    //    article += '<tr>';
    //    article += '<td style="border-bottom:1px solid #f1f1f1;color: #333;font-family: Arial, sans-serif !important;" colspan="2">';
    //    article += '<table style="width:100%;">';
    //    article += '<tbody style="width:100%;">';
    //    article += '<tr>';
    //    article += '<td style="font-size:18px; color: #44A6D8;width:100%;" colspan="2">' + vConItem.CounterpartyName + '</td>';
    //    article += '<td style="float:right;width: 100%;">';
    //    article += '<b title="Signed" style="background-color: #44A6D8; color:#fff; padding: 1px 5px 3px; border-radius: 5px;width:100%;float: left; "><img style="margin-right: 0px;float: left;margin-top: 2px;" src="https://contracts365v2.azurewebsites.net/Content/Images/status/tick.png">' + vConItem.Status + '</b>';
    //    article += '</td>';
    //    article += '</tr>';
    //    article += '</tbody>';
    //    article += '</table>';
    //    article += '</td>';
    //    article += '</tr>';

    //    article += '<tr>';
    //    article += '<td style="border-bottom:1px solid #f1f1f1;color: #333;padding-bottom: 10px;font-family: Arial, sans-serif !important;" colspan="2">';
    //    article += '<table style="width:100%;">';
    //    article += '<tbody style="width:100%;">';
    //    article += '<tr>';
    //    article += '<td style="width:40%;vertical-align: text-top;" >Counter-party Type:</td>';
    //    if (vConItem.CounterpartyType != '')
    //        article += '<td style="width:60%;color: #666;">' + vConItem.CounterpartyType + '</td>';
    //    else
    //        article += '<td style="width:60%;color: #666;">-</td>';
    //    article += '</tr>';
    //    article += '<tr>';
    //    article += '<td style="width:40%;vertical-align: text-top;" >Created By:</td>';
    //    article += '<td style="width:60%;color: #666;">' + vConItem.CreatedBy + '</td>';
    //    article += '</tr>';
    //    article += '<tr>';
    //    article += '<td style="width:40%;vertical-align: text-top;" >Created Date:</td>';
    //    article += '<td style="width:60%;color: #666;">' + moment(new Date(vConItem.Created)).format('MM/DD/YYYY') + '</td>';
    //    article += '</tr>';
    //    article += '</tbody>';
    //    article += '</table>';
    //    article += '</td>';
    //    article += '</tr>';

    //    article += '</tbody>';
    //    article += '</table><br/>';


    //    Office.cast.item.toItemCompose(Office.context.mailbox.item).body.setSelectedDataAsync(article, { coercionType: "html" });
    //}
}

function CounterpartyDetail(conid) {
    var vFilterContract = $.grep(listCounterparty, function (n, i) {
        return (n.RowKey == conid);
    });
    if (vFilterContract.length > 0) {
        var vConItem = vFilterContract[0];
        var article = '';
        article += '<li><span class="taB-pop-Up-Left">Counterparty Type :</span>';
        if (vConItem.CounterpartyType != '')
            article += '<span class="taB-pop-Up-Right">' + vConItem.CounterpartyType + '</span></li>';
        else
            article += '<span class="taB-pop-Up-Right">-</span></li>';
        article += '<li><span class="taB-pop-Up-Left">Created By :</span>';
        article += '<span class="taB-pop-Up-Right">' + vConItem.CreatedBy + '</span></li>';
        article += '<li><span class="taB-pop-Up-Left">Created Date :</span>';
        article += '<span class="taB-pop-Up-Right">' + moment(new Date(vConItem.Created)).format('MM/DD/YYYY') + '</span></li>';

        $("#ulDetail").html(article);
        $("#dvDetail").dialog("option", "title", vConItem.CounterpartyName);
        $("#dvDetail").dialog("open");
    }
}

function AddTemplateToMail(conid) {
    var vFilterContract = $.grep(listTemplate, function (n, i) {
        return (n.RowKey == conid);
    });
    Office.context.mailbox.item.body.getAsync(
"html",
{ asyncContext: "This is passed to the callback" },
function callback(result) {
    if (vFilterContract.length > 0 && result.value.indexOf('TEMP_' + conid) == -1) {
        var vConItem = vFilterContract[0];
        var article = '<table id="TEMP_' + conid + '" cellpadding="0" cellspacing="0" style=" border: solid #a4a4a4 1px; background-color:#fff; width:550px;  margin-bottom: 15px; border-collapse: separate; border-spacing: 10px;">';
        article += '<tbody style="font-size:14px;">';
        article += '<tr>';
        article += '<td style="border-bottom:1px solid #f1f1f1;color: #333;font-family: Arial, sans-serif !important;" colspan="2">';
        article += '<table style="width:100%;">';
        article += '<tbody style="width:100%;">';
        article += '<tr>';
        article += '<td style="font-size:18px; color: #44A6D8;" colspan="2">' + vConItem.TemplateName + '</td>';
        article += '</tr>';
        article += '</tbody>';
        article += '</table>';
        article += '</td>';
        article += '</tr>';

        article += '<tr>';
        article += '<td style="border-bottom:1px solid #f1f1f1;color: #333;padding-bottom: 10px;font-family: Arial, sans-serif !important;" colspan="2">';
        article += '<table style="width:100%;">';
        article += '<tbody style="width:100%;">';
        article += '<tr>';
        article += '<td style="font-size:13px; color: #44A6D8; padding-bottom: 10px;" colspan="2" >Metadata Summary</td>';
        article += '</tr>';
        article += '<tr>';
        article += '<td style="width:40%;vertical-align: text-top;" >Document Type:</td>';
        if (vConItem.DocumentType != '')
            article += '<td style="width:60%;color: #666;">' + vConItem.DocumentType + '</td>';
        else
            article += '<td style="width:60%;color: #666;">-</td>';
        article += '</tr>';
        article += '<tr>';
        article += '<td style="width:40%;vertical-align: text-top;" >Contract Area:</td>';
        if (vConItem.ContractArea != '')
            article += '<td style="width:60%;color: #666;">' + vConItem.ContractArea + '</td>';
        else
            article += '<td style="width:60%;color: #666;">-</td>';
        article += '</tr>';
        article += '<tr>';
        article += '<td style="width:40%;vertical-align: text-top;" >Created By:</td>';
        article += '<td style="width:60%;color: #666;">' + vConItem.CreatedBy + '</td>';
        article += '</tr>';
        article += '<tr>';
        article += '<td style="width:40%;vertical-align: text-top;" >Created Date:</td>';
        article += '<td style="width:60%;color: #666;">' + moment(new Date(vConItem.Created)).format('MM/DD/YYYY') + '</td>';
        article += '</tr>';
        article += '</tbody>';
        article += '</table>';
        article += '</td>';
        article += '</tr>';

        article += '</tbody>';
        article += '</table><br/>';


        Office.cast.item.toItemCompose(Office.context.mailbox.item).body.setSelectedDataAsync(article, { coercionType: "html" });
        Office.cast.item.toItemCompose(Office.context.mailbox.item).addFileAttachmentAsync(vConItem.BlobDocumentURL, vConItem.TemplateName + '.dotx');

    } else {
        app.initialize();
        app.showNotification("", "This contract tagged to this mail previously.");
    }
});

    //if (vFilterContract.length > 0) {
    //    var vConItem = vFilterContract[0];
    //    var article = '<table cellpadding="0" cellspacing="0" style=" border: solid #a4a4a4 1px; background-color:#fff; width:550px;  margin-bottom: 15px; border-collapse: separate; border-spacing: 10px;">';
    //    article += '<tbody style="font-size:14px;">';
    //    article += '<tr>';
    //    article += '<td style="border-bottom:1px solid #f1f1f1;color: #333;font-family: Arial, sans-serif !important;" colspan="2">';
    //    article += '<table style="width:100%;">';
    //    article += '<tbody style="width:100%;">';
    //    article += '<tr>';
    //    article += '<td style="font-size:18px; color: #44A6D8;" colspan="2">' + vConItem.TemplateName + '</td>';
    //    article += '</tr>';
    //    article += '</tbody>';
    //    article += '</table>';
    //    article += '</td>';
    //    article += '</tr>';

    //    article += '<tr>';
    //    article += '<td style="border-bottom:1px solid #f1f1f1;color: #333;padding-bottom: 10px;font-family: Arial, sans-serif !important;" colspan="2">';
    //    article += '<table style="width:100%;">';
    //    article += '<tbody style="width:100%;">';
    //    article += '<tr>';
    //    article += '<td style="font-size:13px; color: #44A6D8; padding-bottom: 10px;" colspan="2" >Metadata Summary</td>';
    //    article += '</tr>';
    //    article += '<tr>';
    //    article += '<td style="width:40%;vertical-align: text-top;" >Document Type:</td>';
    //    if (vConItem.DocumentType != '')
    //        article += '<td style="width:60%;color: #666;">' + vConItem.DocumentType + '</td>';
    //    else
    //        article += '<td style="width:60%;color: #666;">-</td>';
    //    article += '</tr>';
    //    article += '<tr>';
    //    article += '<td style="width:40%;vertical-align: text-top;" >Contract Area:</td>';
    //    if (vConItem.ContractArea != '')
    //        article += '<td style="width:60%;color: #666;">' + vConItem.ContractArea + '</td>';
    //    else
    //        article += '<td style="width:60%;color: #666;">-</td>';
    //    article += '</tr>';
    //    article += '<tr>';
    //    article += '<td style="width:40%;vertical-align: text-top;" >Created By:</td>';
    //    article += '<td style="width:60%;color: #666;">' + vConItem.CreatedBy + '</td>';
    //    article += '</tr>';
    //    article += '<tr>';
    //    article += '<td style="width:40%;vertical-align: text-top;" >Created Date:</td>';
    //    article += '<td style="width:60%;color: #666;">' + moment(new Date(vConItem.Created)).format('MM/DD/YYYY') + '</td>';
    //    article += '</tr>';
    //    article += '</tbody>';
    //    article += '</table>';
    //    article += '</td>';
    //    article += '</tr>';

    //    article += '</tbody>';
    //    article += '</table><br/>';


    //    Office.cast.item.toItemCompose(Office.context.mailbox.item).body.setSelectedDataAsync(article, { coercionType: "html" });
    //    Office.cast.item.toItemCompose(Office.context.mailbox.item).addFileAttachmentAsync(vConItem.BlobDocumentURL, vConItem.TemplateName + '.dotx');
    //}
}

function TemplateDetail(conid) {
    var vFilterContract = $.grep(listTemplate, function (n, i) {
        return (n.RowKey == conid);
    });
    if (vFilterContract.length > 0) {
        var vConItem = vFilterContract[0];
        var article = '';
        article += '<li><span class="taB-pop-Up-Left">Document Type :</span>';
        if (vConItem.DocumentType != '')
            article += '<span class="taB-pop-Up-Right">' + vConItem.DocumentType + '</span></li>';
        else
            article += '<span class="taB-pop-Up-Right">-</span></li>';
        article += '<li><span class="taB-pop-Up-Left">Contract Area :</span>';
        if (vConItem.ContractArea != '')
            article += '<span class="taB-pop-Up-Right">' + vConItem.ContractArea + '</span></li>';
        else
            article += '<span class="taB-pop-Up-Right">-</span></li>';
        article += '<li><span class="taB-pop-Up-Left">Created By :</span>';
        article += '<span class="taB-pop-Up-Right">' + vConItem.CreatedBy + '</span></li>';
        article += '<li><span class="taB-pop-Up-Left">Created Date :</span>';
        article += '<span class="taB-pop-Up-Right">' + moment(new Date(vConItem.Created)).format('MM/DD/YYYY') + '</span></li>';

        $("#ulDetail").html(article);
        $("#dvDetail").dialog("option", "title", vConItem.TemplateName);
        $("#dvDetail").dialog("open");
    }
}

function ShowCalenderRenewal() {
    $("#spCalender").html("Contracts Up for Renewal");
    $("#aCalenderRenewal").addClass("search-in-tab-act");
    $("#aCalenderExpiry").removeClass('search-in-tab-act');
    $("#ddlCalenderDays").val("30");
    ShowCalenderContract();
}

function ShowCalenderExpiry() {
    $("#spCalender").html("Contracts Up for Expiry");
    $("#aCalenderExpiry").addClass("search-in-tab-act");
    $("#aCalenderRenewal").removeClass('search-in-tab-act');
    $("#ddlCalenderDays").val("30");
    ShowCalenderContract();
}

function ShowCalenderContract() {
    var vCalenderDays = $("#ddlCalenderDays").val();
    $("#loadingPage").fadeIn();
    $("#ulCalenderResult").empty();
    $("#spCalenderResText").empty();

    var vURL = '';
    if ($("#aCalenderRenewal").hasClass("search-in-tab-act"))
        vURL = '/api/accounts/' + localStorage.AccountID + '/Contracts/UpForRenew?days=' + vCalenderDays;
    else if ($("#aCalenderExpiry").hasClass("search-in-tab-act"))
        vURL = '/api/accounts/' + localStorage.AccountID + '/Contracts/AboutToExpire?days=' + vCalenderDays;

    $.ajax({
        url: vURL,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserName: localStorage.UserName, UserID: localStorage.UserID },
        success: function (data) {
            listContracts = data;
            var vCount = data.length;
            //$("#spCalenderResText").html(vCount + ' results found. <a id="inserch2_Filter" class="linkText" href="javascript:void(0)">add more filters</a>');
            $(data).each(function (i, item) {
                var sRowKey = item.RowKey;
                var sContractTitle = item.ContractTitle;
                var myUrl = '/Contracts/ContractDetails?ContractID=' + encodeURI(item.RowKey);

                var vContractNumber = '';
                if (item.ContractNumber == null || item.ContractNumber == "") {
                    vContractNumber = 'NA';
                } else {
                    vContractNumber = item.ContractNumber;
                }
                var article = '<li>';
                article += '<div>';
                article += '<a class="search-Result-Heading PreserveSpace" target="_blank" href="' + myUrl + '">' + item.ContractTitle + '</a>';

                article += '<span class="search-doc-Icons">';
                article += '<a href="javascript:void(0)" onclick="AddContractToMail(\'' + sRowKey + '\');"><img src="../Image/attached-mail.png"></a>';
                article += '<a href="javascript:void(0)" onclick="ContractDetail(\'' + sRowKey + '\');"><img src="../Image/more-drop.png"></a>';
                article += '</span>';

                article += '</div>';
                article += '<div class="search-Doc-status">';
                if (item.Status == "New") {
                    article += '<b title="New" class="status_green_another"><img src="../../Content/Images/status/new.png"/>new</b>';
                }
                else if (item.Status == "Awaiting Review") {
                    article += '<b title="Awaiting Review" class="status_yellow"><img src="../../Content/Images/status/renew.png"/>rev</b>';
                }
                else if (item.Status == "Reviewed") {
                    article += '<b title="Reviewed" class="status_blue"><img src="../../Content/Images/status/tick.png"/>rev</b>';
                }
                else if (item.Status == "Awaiting Approval") {
                    article += '<b title="Awaiting Approval" class="status_yellow"><img src="../../Content/Images/status/renew.png"/>appr</b>';
                }
                else if (item.Status == "Approved") {
                    article += '<b title="Approved" class="status_blue"><img src="../../Content/Images/status/tick.png"/>appr</b>';
                }
                else if (item.Status == "In Negotiation") {
                    article += '<b title="In Negotiation" class="status_yellow"><img src="../../Content/Images/status/renew.png"/>nego</b>';
                }
                else if (item.Status == "Negotiation Complete") {
                    article += '<b title="Negotiation Complete" class="status_blue"><img src="../../Content/Images/status/tick.png"/>nego</b>';
                }
                else if (item.DocumentStatus == "Ready for Signature") {
                    article += '<b title="Ready for Signature" class="status_green"><img src="../../Content/Images/status/tick.png"/>Sign</b>';
                }
                else if (item.Status == "Awaiting Signatures") {
                    article += '<b title="Awaiting Signatures" class="status_yellow"><img src="../../Content/Images/status/renew.png"/>Sign</b>';
                }
                else if (item.Status == "Signed") {
                    article += '<b title="Signed" class="status_blue"><img src="../../Content/Images/status/tick.png"/>Sign</b>';
                }
                else if (item.Status == "Active") {
                    article += '<b title="Active" class="status_green"><img src="../../Content/Images/status/active.png"/>actv</b>';
                }
                else if (item.Status == "Up for Renewal") {
                    article += '<b title="Up for Renewal" class="status_red"><img src="../../Content/Images/status/exp.png"/>renw</b>';
                }
                else if (item.Status == "About to Expire") {
                    article += '<b title="About to Expire" class="status_red"><img src="../../Content/Images/status/exp.png"/>exp</b>';
                }
                else if (item.Status == "Expired") {
                    article += '<b title="Expired" class="status_Gray"><img src="../../Content/Images/status/expried.png"/>exp</b>';
                }
                else if (item.Status == "On Hold") {
                    article += '<b title="On Hold" class="status_red"><img src="../../Content/Images/status/exp.png"/>hold</b>';
                }
                else if (item.Status == "Replaced") {
                    article += '<b title="Replaced" class="status_Gray"><img src="../../Content/Images/status/replace.png"/>rep</b>';
                }
                else if (item.Status == "Cancelled") {
                    article += '<b title="Cancelled" class="status_Gray"><img src="../../Content/Images/status/close.png"/>canc</b>';
                }
                else if (item.Status == "Archived") {
                    article += '<b title="Archived" class="status_blue"><img src="../../Content/Images/status/archive.png"/>ARCH</b>';
                }
                else {
                    article += '<b title="Not Assigned" class="status_red"><img src="../../Content/Images/status/new.png"/>not</b>';
                }
                //article += '<b title="Signed" class="app-status_blue"><img src="img/tick.png">Sign</b>';
                article += '</div>';
                article += '</li>';

                $("#ulCalenderResult").append(article);
            });

            if (vCount > 9) {
                $('#paginationCalenderResult').css('display', '');
            }
            else {
                $('#paginationCalenderResult').css('display', 'none');
            }


            $('#paginationCalenderResult').pagination({
                items: vCount,
                itemsOnPage: 10,
                displayedPages: 3,
                edges: 1,
                type: 'ul',
                typeID: 'ulCalenderResult',
                row: 'li',
                cssStyle: 'compact-theme'
            });
            //$('#inserch2_Filter').click(function () {
            //    $('#inserch2_Filter').popModal({
            //        html: $('#inserch2_FilterOptions'),
            //        placement: 'bottomLeft',
            //        showCloseBut: true,
            //        onDocumentClickClose: true,
            //        onDocumentClickClosePrevent: '',
            //        inline: true,
            //        overflowContent: false
            //    });
            //});

            $("#loadingPage").fadeOut();
        },
        error:
            function (data) {
                $('#paginationCalenderResult').css('display', 'none');
                $("#ulCalenderResult").empty();
                $("#loadingPage").fadeOut();
                $("#spCalenderResText").html('No result found.');
            }
    });
}

function DeleteTempDocs(DocumentUrl) {
    $.ajax({
        url: '/api/accounts/' + localStorage.AccountID + '/Documents/DeleteDocumentsFromBlob?DocumentUrl=' + encodeURIComponent(DocumentUrl),
        type: 'DELETE',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        "Content-Type": "application/json",
        cache: false,
        success: function (data) {

        }
    });
}

function randomPassword(length) {
    var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOP1234567890*-@^!~`'<>";
    var pass = "";
    for (var x = 0; x < length; x++) {
        var i = Math.floor(Math.random() * chars.length);
        pass += chars.charAt(i);
    }
    return pass;
}