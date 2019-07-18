/*
* Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See full license at the bottom of this file.
*/

(function () {
    "use strict";
    // The initialize function must be run each time a new page is loaded
    Office.initialize = function (reason) {
        $(document).ready(function () {
            app.initialize();
            //var documenturl = "https://corevo.sharepoint.com/sites/Contract365/v2.3.2/Dimension%20Data%20Contract%20Documents/Testing%20Term%20issue%2012312/Business%20Area%20Field.docx";
            //documenturl = "https://corevo.sharepoint.com/sites/Contract365/v2.3.2/Permission1%20Contract%20Documents/Regression/Contract%20Title.docx";
            //documenturl = "https://corevo.sharepoint.com/sites/Contract365/v2.3.2/Permission29052017%20Contract%20Documents/Testing%20Permissions%202/Blank%20Template%20test.docx";
            documenturl = Office.context.document.url;

            //Testing
            //localStorage.AccountID = 'K1Zkmhad';
            //localStorage.APIKey = 'xgEXoUSV5OXbGtZJdFAnwDqmFR2O+KXlnm7O2TTl1aVEmYUBZMQrh0+Cl58ZWBZCfS1nIxBB0YzLasdwq+tVTg==';

            //staging
            //localStorage.AccountID = 'FUniNQC2';
            //localStorage.APIKey = 'UK2RMUDblUXbGtZJdFAnwDqmFR2O+KXlnm7O2TTl1aVEmYUBZMQrh0+Cl58ZWBZCfS1nIxBB0Yz/OMTKqACGzQ==';

            //v2.3.2.2
            //localStorage.AccountID = 'eyHFDa4a';
            //localStorage.APIKey = 'McLI4/iYTinbGtZJdFAnwDqmFR2O+KXlnm7O2TTl1aVEmYUBZMQrh6vq7JJTpjwBfS1nIxBB0YxM2h/uwoCXxg==';

            //v2.4
            //localStorage.AccountID = 'CSIrJpkT';
            //localStorage.APIKey = 'JCL8mw3GKtfbGtZJdFAnwDqmFR2O+KXlnm7O2TTl1aVEmYUBZMQrh0+Cl58ZWBZCfS1nIxBB0YxCv1cE5Nuv3Q==';

            //dd
            //localStorage.AccountID = 'IAkn4wuh';
            //localStorage.APIKey = 'qbBP6f7Jp8DbGtZJdFAnwMkO3OzhcjCowUoFnCex1Mm9o7qDlhtJ8hqj+Vs/3LvCNW9R6GYh+OE=';

            //staging demo
            localStorage.AccountID = 'eyHFDa4a';
            localStorage.APIKey = 'McLI4/iYTinbGtZJdFAnwDqmFR2O+KXlnm7O2TTl1aVEmYUBZMQrh6vq7JJTpjwBfS1nIxBB0YxM2h/uwoCXxg==';

            if (documenturl.indexOf("_vti_history") != -1) {
                IsViewingVersions = true;
            }
            if (documenturl.indexOf("https://") != -1) {
                //get account details
                $.ajax({
                    url: vApiBaseSiteUrl + '/api/mailservice/accountdetails?accountid=' + localStorage.AccountID,
                    type: 'GET',
                    dataType: 'json',
                    'Content-Type': 'application/json',
                    cache: false,
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    async: false,
                    success: function (item) {
                        localStorage.APIKey = item.ApiKey;
                        localStorage.HostURL = item.HostURL;
                    },
                    error: function (item) {
                        localStorage.APIKey = "";
                        localStorage.HostURL = "";
                    }
                });

            } else {
                documenturl = "";
            }

            BindClauses();
            $('#txtSearchKeyword').keypress(function (event) {
                var keycode = (event.keyCode ? event.keyCode : event.which);
                if (keycode == '13') {
                    search();
                }
            });

            $('#tabCleanup').click(GetDocument);
            //if document is not related to a contract or new document is being created
            if (documenturl == "") {
                $("#tabVersion").addClass("hide");
                $("#tabMetadata").addClass("hide");
                $("#tabWorkflow").addClass("hide");

                $('.clause-item').removeClass("hide");
                $('.clause-item.this-doc').addClass("hide");
                $('a.this-documents').addClass("grey");
                $('.clause-item li').removeClass("hide");
                $(this).removeClass('grey');

                $('.add-clasue').addClass("hide");
                $('.clause-hide').addClass("show");
                $("#newClauseDiv").css("display", "none");
                $(".clause-delete-sec").addClass("hide");

            } else {
                $('.clause-item').addClass("hide");
                $('.clause-item.this-doc').removeClass("hide");
                $(".clause-delete-sec").removeClass("hide");

                $("#tabVersion").removeClass("hide");
                $("#tabMetadata").removeClass("hide");
                $("#tabWorkflow").removeClass("hide");

                $('.add-clasue').removeClass("hide");
                getdocumentdetails(documenturl.split("?")[0]);
            }

            getclausegroups();
            $('#get-data-from-selection').click(getDataFromSelection);
            $('#write-new-clause').click(writeNewClause);
            $('#cancel-write-new-clause').click(cancelwriteNewClause)
            $('#clear-new-clause').click(clearNewClause)
            $('#get-data-from-selectionmetadata').click(getDataFromSelectionMetadata);

            if (Office.context.document.settings) {

                // Provide implementation that uses the Settings object

            }
            else {

                // Use some other technique for saving custom properties,
                // like localStorage, sessionStorage or cookies

            }

            $('#demo5').scrollbox({
                direction: 'h',
                distance: 84
            });
            $('#demo5-backward').click(function () {
                $('#demo5').trigger('backward');
            });
            $('#demo5-forward').click(function () {
                $('#demo5').trigger('forward');
            });

            //$('.clause-item li > a').click(function () {
            //    $('.clause-item li').removeClass('active');
            //    $('.clause-item li').toggleClass('hide');
            //    $(this).parent().addClass('active');
            //});

            $('.search-btn').click(function () {
                $('.search').toggleClass("hide");
            });

            $('.add-clasue a').click(function () {
                $('.get-data').addClass("show");
                $('.clause-item').addClass("hide");
            });
            $('.back').click(function () {
                $('.get-data').removeClass("show");
                $('.clause-item.this-doc').removeClass("hide");
                $('#notificationword-message').hide();
            });

            $('.post-comments').click(function () {
                $('.comments-sec').removeClass('hide');
            });
            $('.cancel').click(function () {
                $('#postcommentsec').removeClass('show');
                $('#postcommentsec').addClass('hide');
            });

            $('.menu-item li > a').click(function () {
                $('.menu-item li').removeClass();
                $(this).parent().addClass('active');
                if ($(this).parent()[0].id == "tabClause") {
                    tabClause();
                } else if ($(this).parent()[0].id == "tabVersion") {
                    tabVersion();
                }
                else if ($(this).parent()[0].id == "tabMetadata") {
                    tabMetadata();
                }
                else if ($(this).parent()[0].id == "tabWorkflow") {
                    tabWorkflow();
                }
                else if ($(this).parent()[0].id == "tabCleanup") {
                    tabCleanup();
                }
            });

            $('a.all-library').click(function () {
                $('.clause-item.this-doc').addClass("hide");
                $('.clause-item').removeClass("hide");
                $('a.this-documents').addClass("grey");
                $('.clause-item li').removeClass("hide");
                $(this).removeClass('grey');

                $('.add-clasue').addClass("hide");
                $('.clause-hide').addClass("show");

                $("#newClauseDiv").css("display", "none");
                $('#notificationword-message').hide();
                $('.get-data').removeClass("show");
                $('#accordionthisdocument').css("display", "none");
            });
            $('a.this-documents').click(function () {
                $('.clause-item').addClass("hide");
                $('.clause-item.this-doc').removeClass("hide");
                $('a.all-library').addClass("grey");
                $('.clause-item li').removeClass("hide");
                $(this).removeClass('grey');

                $('.clause-hide').removeClass("show");
                $('.icon-sec').removeClass("show");
                $('.add-clasue').removeClass("hide");

                $("#newClauseDiv").css("display", "none");
                $('#notificationword-message').hide();
                $('.get-data').removeClass("show");
                $('#accordionthisdocument').css("display", "");
                if (documenturl != "") {
                    getdocumentdetails(documenturl.split("?")[0]);
                }
            });

            $("#dvBrowse").dialog({
                autoOpen: false,
                closeText: "",
                title: "Publish as Major Version",
                modal: true,
                buttons: [{
                    text: "OK",
                    "class": "button-not-close-css",
                    click: function () {
                        publishasmajorversion1(); $(this).dialog("close");
                    }
                }, {
                    text: "Cancel",
                    "class": "button-close-css",
                    click: function () {
                        $(this).dialog("close");
                    }
                }]
            });

            $("#dvBrowseUnpublish").dialog({
                autoOpen: false,
                closeText: "",
                title: "Unpublish",
                modal: true,
                buttons: [{
                    text: "OK",
                    "class": "button-not-close-css",
                    click: function () { unpublishdocumentversion1(); $(this).dialog("close"); }
                }, {
                    text: "Cancel",
                    "class": "button-close-css",
                    click: function () {
                        $(this).dialog("close");
                    }
                }]
            });

            $("#dvRestoreConfirm").dialog({
                autoOpen: false,
                closeText: "",
                title: "Restore",
                modal: true,
                buttons: [{
                    text: "OK",
                    "class": "button-not-close-css",
                    click: function () {
                        var my_data = $("#dvRestoreConfirm").data('param_1')
                        restoredocumentversion(my_data)
                        $(this).dialog("close");
                    }
                }, {
                    text: "Cancel",
                    "class": "button-close-css",
                    click: function () {
                        $(this).dialog("close");
                    }
                }]
            });
            //$('.major-version > .pre-content').click(function () {
            //    $('.sub-version').toggle('10');
            //});
            $('.sub-folder').click(function () {
                $('.sub-version').toggle('10');
                $(this).toggleClass('icon-change');
            });
        });
    };
})();

(function ($) {
    "use strict"

    // Accordion Toggle Items
    var iconOpen = 'fa fa-minus',
         iconClose = 'fa fa-plus';

    $(document).on('show.bs.collapse hide.bs.collapse', '.accordion', function (e) {
        var $target = $(e.target)
        $target.siblings('.accordion-heading')
        .find('em').toggleClass(iconOpen + ' ' + iconClose);
        if (e.type == 'show')
            $target.prev('.accordion-heading').find('.accordion-toggle').addClass('active');
        if (e.type == 'hide')
            $(this).find('.accordion-toggle').not($target).removeClass('active');
    });

})(jQuery);

$(document).ready(function () {
    //localStorage.AccountID = 'FUniNQC2';
    //localStorage.APIKey = 'UK2RMUDblUXbGtZJdFAnwDqmFR2O+KXlnm7O2TTl1aVEmYUBZMQrh0+Cl58ZWBZCfS1nIxBB0Yz/OMTKqACGzQ==';
    //BindClauses();
    //$('#txtSearchKeyword').keypress(function (event) {
    //    var keycode = (event.keyCode ? event.keyCode : event.which);
    //    if (keycode == '13') {
    //        search();
    //    }
    //});
});

var vWorkflowInitiator = "";
var vWorkflowParticipants = null;
var vAnyoneRejected = '';
var vNoOfWaiting = 0;
var vUserTaskPending = [];
var vMetadataValue = '';
var vContractID = "";
var vDocumentID = "";
var article = "";
var btn = "";
var thisDocumentLibrarySettings;
var documenturl = "";
var IsViewingVersions = false;
var versionurl = "";
function BindClauses() {
    $("#loading").css('display', '');
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/clause/allclauses',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            $("#accordion").empty();
            var v = $(data).length;
            var datalength = data.length;
            for (var i = 0; i < datalength; i++) {
                var item = data[i];
                var sUserName = item.LanguageTitle;
                article += '<li value="' + sUserName + '">' + sUserName + '</li>';
                var ii = i + 1;
                btn += '<li class="heading">'
                btn += '<a href="javascript:void(0)">' + item.LanguageTitle + '<sup class="default">Default</sup></a>'
                btn += '<span><img src="../Images/add.png" alt="" id="img' + item.RowKey + '" onclick="javascript:writeclause(this);" title="Add Clause to Document"></span>'
                btn += '<ul class="hide">'
                btn += '<li> ' + item.LanguageText + '</li>'
                btn += '</ul>'

                getLanguageAndAlter(item.RowKey)

                btn += '</li>'
            }
            $("#accordion").append(btn);

            $('.clause-item li > a').click(function () {
                $('.clause-item li').removeClass('active');
                $('.clause-item li').toggleClass('hide');
                $(this).parent().addClass('active');
            });

            $("#goback").click(function () {
                $("#target1").removeClass('active').animate({
                    left: -($("#accordion").width() + 350)
                }, 500);
            });

            $(".open").click(function () {
                $(this).closest('.info1').toggleClass('newclass');
            });

            $("#loading").css('display', 'none');
        },
        error:
            function (data) {
            }
    });
}

function abcclick(obj) {
    var sid = obj.id.replace('alter', '');
    getLanguageAndAlter(sid)
    var $target = $($(obj).attr('href')),
      $other = $target.siblings('.active'),
      animIn = function () {
          $target.addClass('active').show().css({
              left: -($target.width())
          }).animate({
              left: 0
          }, 500);
      };

    if (!$target.hasClass('active') && $other.length > 0) {
        $other.each(function (index, self) {
            var $this = $(obj);
            $this.removeClass('active').animate({
                left: -$this.width()
            }, 500, animIn);
        });
    } else if (!$target.hasClass('active')) {
        animIn();
    }
}

function writeclause(obj) {
    var sid = obj.id.replace('img', '');
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/clause/language?languageid=' + sid,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            var notificationmsg = "";
            if (data.MutuallyInclusiveWith != null && data.MutuallyInclusiveWith != "") {
                notificationmsg = data.LanguageTitle + " are mutually inclusive with " + data.MutuallyInclusiveWith;
            }
            if (data.MutuallyExclusiveWith != null && data.MutuallyExclusiveWith != "") {
                if (notificationmsg != "") {
                    notificationmsg += " and mutuallyexclusive with" + data.MutuallyExclusiveWith;
                } else {
                    notificationmsg = data.LanguageTitle + " are mutually exclusive with " + data.MutuallyExclusiveWith;
                }
            }
            if (notificationmsg != "") {
                app.showNotification("", notificationmsg);
            }
            addAndBindControl(data.RowKey, data.LanguageTitle, data.LanguageText);
        }
    });
}

function writealterclause(obj) {
    var sid = obj.id.replace('imgalter', '');
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/clause/language?languageid=' + sid,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            addAndBindControl(data.RowKey, data.LanguageTitle, data.LanguageText);
        }
    });
}

function addAndBindControl(clauseidastag, clausetitleastitle, clauselanguage) {

    Office.context.document.bindings.addFromNamedItemAsync(clauseidastag, "text", { id: 'myBinding' }, function (result) {

        if (result.status === Office.AsyncResultStatus.Failed) {

            // Error 3006 message: "The named item does not exist."
            // If the named item doesn't exist, then add and bind to it.
            if (result.error.code === 3006) {
                var myOOXMLRequest = new XMLHttpRequest();
                var myXML;
                myOOXMLRequest.open('GET', '../ContentControlBind/ContentControl.xml', false);
                myOOXMLRequest.send();

                if (myOOXMLRequest.status === 200) {
                    myXML = myOOXMLRequest.responseText;
                    clauselanguage = clauselanguage.replace(/<div>/g, '');
                    clauselanguage = clauselanguage.replace(/<\/div>/g, '');
                    clauselanguage = clauselanguage.replace(/<\/?div[^>]*>/g, "");
                    clauselanguage = clauselanguage.replace(/\n/g, '');
                    clauselanguage = clauselanguage.replace(/&nbsp;/g, ' ');
                    clauselanguage = clauselanguage.replace(/<br>/g, ' ');
                    clauselanguage = clauselanguage.replace(/<\/?span[^>]*>/g, "");
                    clauselanguage = clauselanguage.replace(/<p>/g, '');
                    clauselanguage = clauselanguage.replace(/<\/p>/g, '');
                    clauselanguage = clauselanguage.replace(/<\/?p[^>]*>/g, "");
                    myXML = myXML.replace('[Sample placeholder text.]', clauselanguage)
                    myXML = myXML.replace('MyContentControlTitle', clausetitleastitle)
                    myXML = myXML.replace('MyContentControlTag', clauseidastag)
                }
                Office.context.document.setSelectedDataAsync(myXML, { coercionType: 'ooxml' }, function (result) {
                    Office.context.document.bindings.addFromNamedItemAsync(clauseidastag, "text", { id: 'myBinding' });
                });
            }
            else app.showNotification(result.error.name + " " + result.error.code, result.error.message);
        }
    });
}

function search() {
    $("#loading").css('display', '');
    $("#accordion").empty();
    article = "";
    btn = "";
    $("#divSearchKeyword").empty();
    if ($("#txtSearchKeyword").val().trim() == "") {
        BindClauses();
    } else {
        $("#divSearchKeyword").append('<code>' + $("#txtSearchKeyword").val() + '<img src="../Images/close-filter.png" alt="" style="cursor:pointer;" onclick="javascript: cancelsearch(this);"></code>');
        $.ajax({
            url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/clause/clausesearch?searchkey=' + $("#txtSearchKeyword").val(),
            type: 'GET',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            cache: false,
            success: function (data) {
                if (data != null && data.length > 0) {
                    var artical = '';
                    $("#accordion").empty();
                    $(data).each(function (i, item) {
                        btn += '<li class="heading">'
                        btn += '<a href="javascript:void(0)">' + item.LanguageTitle + '<sup class="default">Default</sup></a>'
                        btn += '<span><img src="../Images/add.png" alt="" id="img' + item.RowKey + '" onclick="javascript:writeclause(this);" title="Add Clause to Document"></span>'
                        btn += '<ul class="hide">'
                        btn += '<li> ' + item.LanguageText + '</li>'
                        btn += '</ul>'
                        getLanguageAndAlter(item.RowKey)
                        btn += '</li>'
                    });

                    $("#accordion").append(btn);

                    $('.clause-item li > a').click(function () {
                        $('.clause-item li').removeClass('active');
                        $('.clause-item li').toggleClass('hide');
                        $(this).parent().addClass('active');
                    });

                    $("#goback").click(function () {
                        $("#target1").removeClass('active').animate({
                            left: -($("#accordion").width() + 350)
                        }, 500);
                    });

                    $(".open").click(function () {
                        $(this).closest('.info1').toggleClass('newclass');
                    });

                    $("#loading").css('display', 'none');
                }
                else {
                    $("#accordion").append('<li>No items found.</li>');
                }
                $("#loading").css('display', 'none');
            },
            error: function () {
            },
            complete: function () {

            }
        });
    }
}

function getLanguageAndAlter(languageid) {
    //$("#alternativeClauses").empty();
    //$("#imgLoading").show();
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/clause/alllanguageitems?languageid=' + languageid,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            //$("#alternativeClauses").empty();
            var articleDetails = "";
            var datalength = data.length;

            // $('#img' + languageid).parent().parent()
            var alternateItem = "";
            var alternativenumber = 1;
            for (var i = 0; i < datalength; i++) {
                var item = data[i];
                if (item.IsDefaultLanguage != "Yes") {
                    //articleDetails += '<div id="thediv' + item.RowKey + '" style="padding-top:10px;"><img src="../Images/add-80px-128.png" id="imgalter' + item.RowKey + '" onclick="javascript:writealterclause(this);" height="20" width="20" title="Add Clause to Document" style="cursor:pointer;" />' + item.LanguageText + '</div>';
                    alternateItem += '<div class="alternative hide">'
                    alternateItem += '<div class="heading">'
                    alternateItem += '<a href="javascript:void(0)">' + item.LanguageTitle + '<sup class="alternative">Alternative ' + alternativenumber + '</sup></a>'
                    alternateItem += '<span style="cursor:pointer"><img src="../Images/add.png" alt="" id="img' + item.RowKey + '" onclick="javascript:writeclause(this);" title="Add Clause to Document"></span>'
                    alternateItem += '<ul class="hide">'
                    alternateItem += '<li class="hide">' + item.LanguageText + '</li>'
                    alternateItem += '</ul>'
                    alternateItem += '</div>'
                    alternateItem += '</div>'
                    alternativenumber++;
                }
            }

            var d1 = $('#img' + languageid).parent().parent();
            d1.append(alternateItem);



            //$("#alternativeClauses").append(articleDetails);

            //if (datalength == 1) {
            //    $("#alternativeClauses").append('No alternative clause found.')
            //}
        },
        error: function () {
            //$("#alternativeClauses").append('No alternative clause found.')
        },
        complete: function () {
            // $("#imgLoading").hide();
        }
    });
}

function getclausegroups() {
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/clause/group?orderby=asc',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            var itm = "<li>Filter By Group</li>";
            itm += '<li><a href="javascript:void(0);" onclick="javascript:filterbygroup(this)">All</a></li>'
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                //itm += '<li><div class="checkbox"><label><input type="checkbox" value="' + item.GroupTitle + '" name="chkGroup[]">' + item.GroupTitle + '</label></div></li>'
                itm += '<li><a id=' + item.RowKey + ' href="javascript:void(0);" onclick="javascript:filterbygroup(this)">' + item.GroupTitle + '</a></li>'
            }

            //itm += '<li><button class="btn btn-primary" onclick="javascript:btnapplyfilter();">Apply</button></li>'
            $("#ulGroup").append(itm)
        }
    });
}

//apply filter by clause group
function getgroupitemstobind(groupid) {
    article = "";
    btn = "";
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/clause/clausesingroup?groupid=' + groupid,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        async: false,
        success: function (data) {
            $("#accordion").empty();
            var v = $(data).length;
            var datalength = data.length;
            for (var i = 0; i < datalength; i++) {
                var item = data[i];
                btn += '<li class="heading">'
                btn += '<a href="javascript:void(0)">' + item.LanguageTitle + '<sup class="default">Default</sup></a>'
                btn += '<span><img src="../Images/add.png" alt="" id="img' + item.RowKey + '" onclick="javascript:writeclause(this);" title="Add Clause to Document"></span>'
                btn += '<ul class="hide">'
                btn += '<li> ' + item.LanguageText + '</li>'
                btn += '</ul>'
                getLanguageAndAlter(item.RowKey)
                btn += '</li>'
            }
            if (datalength == 0) {
                $("#accordion").append("<li>No items found.</li>")
            }
            $("#accordion").append(btn);

            $('.clause-item li > a').click(function () {
                $('.clause-item li').removeClass('active');
                $('.clause-item li').toggleClass('hide');
                $(this).parent().addClass('active');
            });

            $("#goback").click(function () {
                $("#target1").removeClass('active').animate({
                    left: -($("#accordion").width() + 350)
                }, 500);
            });

            $(".open").click(function () {
                $(this).closest('.info1').toggleClass('newclass');
            });

            $("#loading").css('display', 'none');
        },
        error:
            function (data) {
            }
    });
}

function changeclausegroup(ddlvalue) {
    if (ddlvalue.value == "All") {
        BindClauses();
    } else {
        getgroupitemstobind(ddlvalue.value)
    }
}

function getdocumentdetails(obj) {
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/documents?docurl=' + obj,
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            vContractID = data.ContractID;
            vDocumentID = data.RowKey;
            if (data.ContractID == "") {
                $("#newClauseDivTitle").css("display", "none");
                $("#newClauseDiv").css("display", "none");
            }
            docdefaultview(data.ContractArea);
            bindclausesindocument();
        }, error: function (data) {
            $("#newClauseDivTitle").css("display", "none");
            $("#newClauseDiv").css("display", "none");
        }
    });
}

// Function that writes to a div with id='message' on the page.
function getDataFromSelection() {
    Office.context.document.getSelectedDataAsync(Office.CoercionType.Text, function (asyncResult) {
        if (asyncResult.status == Office.AsyncResultStatus.Failed) {
        }
        else {
            if (asyncResult.value == "") {
                $("#newClauseDiv").slideUp();
                app.showNotification("", 'Select text in the document.');
            } else {
                $("#newClauseDiv").slideDown();
                $("#ClauseDescription").val(asyncResult.value)
            }
        }
    });

}

function writeNewClause() {
    if ($("#ClauseTitle").val() == "") {
        app.showNotification("", 'Clause title is required.');
    } else if ($("#ClauseDescription").val() == "") {
        app.showNotification("", 'Clause text is required.');
    }
    else {
        $.ajax({
            url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/documents?documentid=' + vDocumentID,
            type: 'GET',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            cache: false,
            success: function (item) {
                if (item != "") {
                    if (item.RelatedClause != null && item.RelatedClause != "") {
                        if (item.RelatedClause.indexOf('<TitleLanguage>' + $("#ClauseTitle").val().trim() + '</TitleLanguage>') > -1) {
                            app.showNotification("", 'Clause title already exit.');
                        } else {
                            addAndBindControl("customclause", $("#ClauseTitle").val(), $("#ClauseDescription").val())
                        }
                    }
                }
            },
        });
    }
}

function cancelwriteNewClause() {
    $("#newClauseDiv").slideUp();
    $("#ClauseTitle").val("");
    $("#ClauseDescription").val("");
}

function clearNewClause() {
    $("#ClauseTitle").val("");
    $("#ClauseDescription").val("");
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function BindDocumentVersions() {
    $("#loading").css('display', '');
    if (vDocumentID == "" && documenturl != "") {
        $.ajax({
            url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/documents?docurl=' + documenturl.split("?")[0],
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            cache: false,
            success: function (data) {
                vContractID = data.ContractID;
                vDocumentID = data.RowKey;
                BindDocumentVersionsRec()
            }, error: function (data) {
                $("#loading").css('display', 'none');
                $("#tabDetailsVersion").empty();
                if (IsViewingVersions) {
                    $("#tabDetailsVersion").append('<div>Versions cannot be dispalyed while viewing a version.</div>')
                } else {
                    $("#tabDetailsVersion").append('<div>No item found.</div>')
                }
            }
        });
    } else {
        BindDocumentVersionsRec();
    }
}

function BindDocumentVersionsRec() {
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/documents/' + vDocumentID + '/versions',
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            var alldocumentusers = [];
            var allusers = "";
            var datalength = data.length;
            for (var j = 0 ; j < datalength; j++) {
                var item = data[j];
                alldocumentusers.push(item.ModifiedBy);
            }
            var uniqueusers = alldocumentusers.filter(onlyUnique);

            allusers += '<li><a href="javascript:void(0);" onclick="javascript:filtersubmittedby(this)">All Users</a></li>';
            uniqueusers.forEach(function (user) {
                allusers += '<li><a href="javascript:void(0);" onclick="javascript:filtersubmittedby(this)">' + user + '</a></li>';
            });

            $("#tabDetailsVersion").empty();
            var article = "";
            var publishedarticle = "";
            var isanypublishedversion = false;
            var addpreviousversion = false;
            var majorlinkadded = false;

            publishedarticle += '<div class="cv-sec">'
            publishedarticle += '<div class="pre-content-head clearfix">'
            publishedarticle += '<h5 class="cv col-xs-5 no-padding grey">Version(s)</h5>'
            publishedarticle += '<div class="icons col-xs-6 pull-right no-padding clearfix">'
            publishedarticle += '<div class="col-xs-12 pull-right no-padding text-right submited">'
            publishedarticle += '<div class="name blue submited">'
            publishedarticle += '<span>Submitted by</span>'
            publishedarticle += '<span class="dropdown">'
            publishedarticle += '<a data-toggle="dropdown" class="dropdown-toggle" aria-expanded="false" href="javascript:void(0)"><img src="../Images/arrowdown.png" alt=""></a>'
            publishedarticle += '<ul class="dropdown-menu">'
            publishedarticle += allusers
            publishedarticle += '</ul>'
            publishedarticle += '</span>'
            publishedarticle += '</div>'
            publishedarticle += '</div>'

            publishedarticle += '</div>'
            publishedarticle += '</div>'

            publishedarticle += '<div class="delete-sec">'
            publishedarticle += '<a href="javascript:void(0)" onclick="javascript:deleteallminorversions();">Delete minor version(s)</a>'
            publishedarticle += '</div>'

            var majorversiondiv = false;
            var minorversiondiv = false;
            var ismajorversiondivadded = false;
            var ispublishedadded = false;
            var countloop = datalength - 1;
            for (var i = datalength - 1 ; i >= 0; i--) {
                var item = data[i];
                var version = item.VersionNo.split('.')[1];
                if (version == 0) {
                    article += '<div class="major-version clearfix">';
                    majorversiondiv = true;
                    minorversiondiv = false;
                    ismajorversiondivadded = true;
                } else {
                    majorversiondiv = false;
                }
                if (!majorversiondiv && ismajorversiondivadded) {
                    article += '<div style="padding-left: 5%;" class="sub-version col-xs-12 no-padding">';
                }
                var modifiedcss = item.ModifiedBy.replace(/ /g, '')
                modifiedcss = modifiedcss.replace('(', '');
                modifiedcss = modifiedcss.replace(')', '');
                if (item.IsCurrentDocumentVersion == "Yes")
                    article += '<div class="pre-content ' + modifiedcss + ' version_bg">'
                else
                    article += '<div class="pre-content ' + modifiedcss + '">'

                article += '<div class="name blue" style="cursor:default;">'
                article += '<span>' + item.ModifiedBy + '</span>'
                article += '<span class="dropdown">'
                article += '<a href="javascript:void(0)" aria-expanded="false" class="dropdown-toggle" data-toggle="dropdown"><img alt="" style="padding-left:5px;" src="../Images/arrowdown.png"></a>'
                article += '<ul class="dropdown-menu">'
                article += '<li><a href="javascript:void(0);" data-value="' + item.Url + '" onclick="javascript:docview(this)">View</a></li>'
                if (countloop > i) {
                    //article += '<li><a href="javascript:void(0);" data-value="' + item.Url + '" onclick="javascript:restore(' + item.VersionNo + ')">Restore</a></li>'
                }
                if (version == 0) {
                    if (item.Level == "Published") {
                        ispublishedadded = true;
                        article += '<li class="docvesrion" style="display:none"><a href="javascript:void(0);" data-value="' + item.Url + '" onclick="javascript:unpublishdocumentversion(this)">Unpublish</a></li>'
                    } else {
                        article += '<li><a href="javascript:void(0);" data-value="' + item.VersionNo + '" onclick="javascript:deletedocumentversion(this)">Delete</a></li>'
                    }
                    article += '</ul>'
                    article += '</span>'
                    article += '<p class="pull-right blue major" title="Version">' + item.VersionNo + '</p>'
                } else {
                    if (!majorlinkadded) {
                        majorlinkadded = true;
                        if (!ispublishedadded) {
                            ispublishedadded = true;
                            article += '<li class="docvesrion" style="display:none"><a href="javascript:void(0);" onclick="javascript:publishasmajorversion()">Publish as Major Version</a></li>'
                        } else {
                            article += '<li><a href="javascript:void(0);" data-value="' + item.VersionNo + '" onclick="javascript:deletedocumentversion(this)">Delete</a></li>'
                        }
                    } else {
                        article += '<li><a href="javascript:void(0);" data-value="' + item.VersionNo + '" onclick="javascript:deletedocumentversion(this)">Delete</a></li>'
                    }
                    article += '</ul>'
                    article += '</span>'
                    article += '<p class="pull-right blue minor" title="Version">' + item.VersionNo + '</p>'
                }

                article += '</div>'
                article += '<div class="date clearfix">'
                if (version == 0) {
                    if (item.Level == "Published") {
                        article += '<a href="javascript:void(0);" class="sub-folder"></a>'
                    }
                }

                article += '<p class="col-xs-5 no-padding"><span>' + moment(new Date(item.Modified)).format('MM/DD/YYYY') + ' </span>|<span> ' + moment(new Date(item.Modified)).format('hh:mm A') + '</span></p>'
                if (version == 0) {
                    if (item.Level == "Published") {
                        article += '<p class="pmv" style="">Published</p>';
                        //article += '<p class="pull-left shared" title="Shared document"><a href="javascript:void(0)"><img src="../Images/shared.png" alt=""></a></p>';
                    }
                }
                article += '</div>'
                if (version == 0) {
                    if (item.CheckInComment.trim() == "") {
                        article += '<div class="des">- No Comments -</div>'
                    } else {
                        article += '<div class="des">' + item.CheckInComment + '</div>'
                    }
                    article += '</div>'
                } else {
                    article += '<div></div>'
                    article += '</div>'
                }
                if (minorversiondiv) {
                    article += '</div>';
                }

                if (!majorversiondiv && ismajorversiondivadded) {
                    article += '</div>';
                }

                var j = i - 1;
                var itemNxt = data[j];
                if (typeof itemNxt === 'undefined') {
                    if (minorversiondiv) {
                        article += '</div>';
                    }
                } else {
                    var versionNxt = itemNxt.VersionNo.split('.')[1];
                    if (versionNxt == 0 && ismajorversiondivadded) {
                        ismajorversiondivadded = false;
                        article += '</div>';
                    }
                }


            }
            if (ismajorversiondivadded)
                article += '</div>';
            $("#tabDetailsVersion").append(publishedarticle + article);
            if (typeof (thisDocumentLibrarySettings) != 'undefined' && thisDocumentLibrarySettings != null) {
                if (thisDocumentLibrarySettings.DocVersion == "All") {
                    $(".docvesrion").css("display", "");
                } else {
                    $(".docvesrion").css("display", "none");
                }
            } else {
                $(".docvesrion").css("display", "none");
            }
            $('.sub-folder').click(function () {
                $('.sub-version').toggle('10');
                $(this).toggleClass('icon-change');
            });

            $("#loading").css('display', 'none');
            $('#notificationword-message').hide();
        },
        error: function (data) {
            $("#loading").css('display', 'none');
            app.showNotification("", 'Something went wrong. Please try again later.');
        }
    });
}

function changelistnames(ddlvalue) {
    if (ddlvalue.text == "All") {
    } else {
        $("#loading").css('display', '');
        if (ddlvalue.text == "Contract Record") {
            $("#licontract").css('display', 'none');
            $("#lidocument").css('display', 'block');
            $.ajax({
                url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/Contracts?contractid=' + vContractID,
                type: 'GET',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey },
                cache: false,
                success: function (item) {
                    $('#divDetailsMetadata').empty();
                    var article = "";
                    article += '<div class="col-xs-12 field no-padding clearfix" >';
                    article += '<label class="col-xs-6 no-padding">Contract Record Title</label>'
                    article += '<label class="col-xs-5 no-padding PreserveSpace">' + item.ContractTitle + '</label>'
                    article += '<label class="col-xs-1 no-padding"><a class="save" id="ContractTitle" onclick="javascript:savemetadata(this);" href="javascript:void(0);"><img src="../Images/save.png" title="Replace selected text as metadata" alt=""></a></label>'
                    article += '</div>'

                    article += '<div class="col-xs-12 field no-padding clearfix" >';
                    article += '<label class="col-xs-6 no-padding">Contract Record Type</label>'
                    article += '<label class="col-xs-5 no-padding">' + item.ContractType + '</label>'
                    article += '</div>'

                    article += '<div class="col-xs-12 field no-padding clearfix">';
                    article += '<label class="col-xs-6 no-padding">Contract Record Number</label>'
                    article += '<label class="col-xs-5 no-padding">' + item.ContractNumber + '</label>'
                    article += '<label class="col-xs-1 no-padding"><a class="save" id="ContractNumber" onclick="javascript:savemetadata(this);" href="javascript:void(0);"><img src="../Images/save.png" title="Replace selected text as metadata" alt=""></a></label>'
                    article += '</div>'

                    article += '<div class="col-xs-12 field no-padding clearfix" >';
                    article += '<label class="col-xs-6 no-padding">Business Area</label>'
                    article += '<label class="col-xs-5 no-padding">' + item.BusinessArea + '</label>'
                    article += '</div>'

                    article += '<div class="col-xs-12 field no-padding clearfix">';
                    article += '<label class="col-xs-6 no-padding">Contract Value</label>'
                    article += '<label class="col-xs-5 no-padding">' + item.ContractValue + '</label>'
                    article += '<label class="col-xs-1 no-padding"><a class="save" id="ContractValue" onclick="javascript:savemetadata(this);" href="javascript:void(0);"><img src="../Images/save.png" title="Replace selected text as metadata" alt=""></a></label>'
                    article += '</div>'

                    article += '<div class="col-xs-12 field no-padding clearfix" style="cursor:default !important">';
                    article += '<label class="col-xs-6 no-padding">Contract Owner(s)</label>'
                    article += '<label class="col-xs-5 no-padding">' + item.ContractManagers + '</label>'
                    article += '</div>'

                    article += '<div class="col-xs-12 field no-padding clearfix">';
                    article += '<label class="col-xs-6 no-padding">Start Date</label>'
                    if (item.StartDate != null && item.StartDate != "") {
                        article += '<label class="col-xs-5 no-padding">' + moment(new Date(item.StartDate)).format('Do MMM YYYY') + '</label>'
                    } else {
                        article += '<label class="col-xs-5 no-padding">Not available.</label>'
                    }

                    article += '<label class="col-xs-1 no-padding"><a class="save" id="StartDate" onclick="javascript:savemetadata(this);" href="javascript:void(0);"><img src="../Images/save.png" title="Replace selected text as metadata" alt=""></a></label>'
                    article += '</div>'

                    article += '<div class="col-xs-12 field no-padding clearfix">';
                    article += '<label class="col-xs-6 no-padding">Originating Party</label>'
                    article += '<label class="col-xs-5 no-padding">' + item.OriginatingParty + '</label>'
                    article += '<label class="col-xs-1 no-padding"><a class="save" id="OriginatingParty" onclick="javascript:savemetadata(this);" href="javascript:void(0);"><img src="../Images/save.png" alt=""></a></label>'
                    article += '</div>'

                    article += '<div class="col-xs-12 field no-padding clearfix">';
                    article += '<label class="col-xs-6 no-padding">Counterparty</label>'
                    article += '<label class="col-xs-5 no-padding">' + item.Counterparty + '</label>'
                    article += '<label class="col-xs-1 no-padding"><a class="save" id="Counterparty" onclick="javascript:savemetadata(this);" href="javascript:void(0);"><img src="../Images/save.png" alt=""></a></label>'
                    article += '</div>'

                    article += '<div class="col-xs-12 field no-padding clearfix">';
                    article += '<label class="col-xs-6 no-padding">End Date</label>'
                    if (item.EndDate != null && item.EndDate != "") {
                        article += '<label class="col-xs-5 no-padding">' + moment(new Date(item.EndDate)).format('Do MMM YYYY') + '</label>'
                    } else {
                        article += '<label class="col-xs-5 no-padding">Not available.</label>'
                    }
                    article += '<label class="col-xs-1 no-padding"><a class="save" id="EndDate" onclick="javascript:savemetadata(this);" href="javascript:void(0);"><img src="../Images/save.png" alt=""></a></label>'
                    article += '</div>'

                    $('#divDetailsMetadata').append(article);
                    $("#loading").css('display', 'none');
                }
            });
        } else if (ddlvalue.text == "Document") {
            $("#licontract").css('display', 'block');
            $("#lidocument").css('display', 'none');
            $.ajax({
                url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/documents?documentid=' + vDocumentID,
                type: 'GET',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey },
                cache: false,
                success: function (item) {
                    $('#divDetailsMetadata').empty();
                    var article = "";
                    article += '<div class="col-xs-12 field no-padding clearfix" >';
                    article += '<label class="col-xs-6 no-padding">Document Name</label>'
                    article += '<label class="col-xs-5 no-padding">' + item.DocumentName + '</label>'
                    article += '<label class="col-xs-1 no-padding"></label>'
                    article += '</div>'
                    article += '<div class="col-xs-12 field no-padding clearfix" >';
                    article += '<label class="col-xs-6 no-padding">Document Type</label>'
                    article += '<label class="col-xs-5 no-padding">' + item.DocumentType + '</label>'
                    article += '<label class="col-xs-1 no-padding"></label>'
                    article += '</div>'
                    article += '<div class="col-xs-12 field no-padding clearfix">';
                    article += '<label class="col-xs-6 no-padding">Description</label>'
                    article += '<label class="col-xs-5 no-padding">' + item.Description + '</label>'
                    article += '<label class="col-xs-1 no-padding"><a class="save" id="Description" onclick="javascript:savemetadata(this);" href="javascript:void(0);"><img src="../Images/save.png" title="Replace selected text as metadata" alt=""></a></label>'
                    article += '</div>'

                    article += '<div class="col-xs-12 field no-padding clearfix">';
                    article += '<label class="col-xs-6 no-padding">Document Author</label>'
                    article += '<label class="col-xs-5 no-padding">' + item.DocumentAuthor + '</label>'
                    article += '<label class="col-xs-1 no-padding"><a class="save" id="DocumentAuthor" onclick="javascript:savemetadata(this);" href="javascript:void(0);"><img src="../Images/save.png" title="Replace selected text as metadata" alt=""></a></label>'
                    article += '</div>'

                    article += '<div class="col-xs-12 field no-padding clearfix">';
                    article += '<label class="col-xs-6 no-padding">Document Language</label>'
                    article += '<label class="col-xs-5 no-padding">' + item.DocumentLanguage + '</label>'
                    article += '<label class="col-xs-1 no-padding"><a class="save" id="DocumentLanguage" onclick="javascript:savemetadata(this);" href="javascript:void(0);"><img src="../Images/save.png" title="Replace selected text as metadata" alt=""></a></label>'
                    article += '</div>'

                    article += '<div class="col-xs-12 field no-padding clearfix" >';
                    article += '<label class="col-xs-6 no-padding">Is Finalized/Ready for Signature?</label>'
                    article += '<label class="col-xs-5 no-padding">' + item.IsFinalized + '</label>'
                    article += '</div>'

                    if (item.IsFinalized == "Yes") {
                        article += '<div class="col-xs-12 field no-padding clearfix" >';
                        article += '<label class="col-xs-6 no-padding">Finalized/Ready for Signature By</label>'
                        article += '<label class="col-xs-5 no-padding">' + item.FinalizedBy + ' on ' + moment(new Date(item.FinalizedDate)).format('Do MMM YYYY') + '</label>'
                        article += '</div>'
                    }

                    article += '<div class="col-xs-12 field no-padding clearfix" >';
                    article += '<label class="col-xs-6 no-padding">Is Standard?</label>'
                    article += '<label class="col-xs-5 no-padding">' + item.IsStandard + '</label>'
                    article += '</div>'

                    article += '<div class="col-xs-12 field no-padding clearfix" >';
                    article += '<label class="col-xs-6 no-padding">Document Status</label>'
                    article += '<label class="col-xs-5 no-padding">' + item.DocumentStatus + '</label>'
                    article += '</div>'

                    article += '<div class="col-xs-12 field no-padding clearfix" >';
                    article += '<label class="col-xs-6 no-padding">Created By</label>'
                    article += '<label class="col-xs-5 no-padding">' + item.CreatedBy + '</label>'
                    article += '</div>'

                    article += '<div class="col-xs-12 field no-padding clearfix" >';
                    article += '<label class="col-xs-6 no-padding">Created Date</label>'
                    article += '<label class="col-xs-5 no-padding">' + moment(new Date(item.Created)).format('Do MMM YYYY') + '</label>'
                    article += '</div>'

                    article += '<div class="col-xs-12 field no-padding clearfix" >';
                    article += '<label class="col-xs-6 no-padding">Last Updated</label>'
                    article += '<label class="col-xs-5 no-padding">' + moment(new Date(item.Modified)).format('Do MMM YYYY') + '</label>'
                    article += '</div>'

                    article += '<div class="col-xs-12 field no-padding clearfix" >';
                    article += '<label class="col-xs-6 no-padding">Shared With</label>'
                    article += '<label class="col-xs-5 no-padding">' + item.SharedWith + '</label>'
                    article += '</div>'

                    article += '<div class="col-xs-12 field no-padding clearfix" >';
                    article += '<label class="col-xs-6 no-padding">Reviewers</label>'
                    article += '<label class="col-xs-5 no-padding">' + item.Reviewers + '</label>'
                    article += '</div>'

                    article += '<div class="col-xs-12 field no-padding clearfix">';
                    article += '<label class="col-xs-6 no-padding">Signee</label>'
                    article += '<label class="col-xs-5 no-padding">' + item.Signee + '</label>'
                    article += '</div>'

                    $('#divDetailsMetadata').append(article);
                    $("#loading").css('display', 'none');
                }
            });
        } else if (ddlvalue.text == "Counterparties") {

        }
        $('#metadataSelection').text(ddlvalue.text);
    }
}

function getDataFromSelectionMetadata() {
    Office.context.document.getSelectedDataAsync(Office.CoercionType.Text, function (asyncResult) {
        if (asyncResult.status == Office.AsyncResultStatus.Failed) {
        }
        else {
            if (asyncResult.value == "") {
                app.showNotification("", 'Select text in the document.');
            } else {
                vMetadataValue = asyncResult.value;
                $('.currentImage').toggleClass('hide');
                $('.hiddenImage').toggleClass('show');
                $('.metadata-field').toggleClass('hover');
                $('#notificationword-message').hide();
            }
        }
    });
}

//cancel search button function
function cancelsearch(obj) {
    $(obj).parent().remove();
    $("#txtSearchKeyword").val("");
    search();
}

//cancel filter button function
function cancelfilter(obj) {
    var noitemschecked = true;
    $("input[name='chkGroup[]']:checked").each(function () {
        if ($(this).val() == $(obj).parent().text()) {
            $(obj).parent().remove();
            $(this).attr('checked', false);
        }
    })
    $("input[name='chkGroup[]']:checked").each(function () {
        noitemschecked = false;
    })
    if (noitemschecked) {
        $('#notificationword-message').hide();
        BindClauses();
    }
}

//apply filter button click
function btnapplyfilter() {
    $("#divFilterKeyword").empty();
    $("input[name='chkGroup[]']:checked").each(function () {
        $("#divFilterKeyword").append('<code>' + $(this).val() + '<img src="../Images/close-filter.png" alt="" style="cursor:pointer;" onclick="javascript: cancelfilter(this);"></code>');
        getgroupitemstobind($(this).val())
    })
}

function bindclausesindocument() {
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/clause/clausesindocument?documentid=' + vDocumentID,
        type: 'GET',
        dataType: 'json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (Languagecollection) {
            $("#accordionthisdocument").empty();
            var articlelanguage = "";
            if (typeof (Languagecollection) != "undefined") {
                for (var arrdsp = 0; arrdsp < Languagecollection.length; arrdsp++) {
                    articlelanguage += '<li class="heading">'
                    //var isremoved = "false"
                    switch (Languagecollection[arrdsp].Status) {
                        case 'User Added': {
                            articlelanguage += '<a href="javascript:void(0)">' + Languagecollection[arrdsp].LanguageTitle + '<span><img src="../../Content/Images/red-icon.jpg" style="margin-left:5px;" title="Not available in Library, User Added" alt=""></span></a>';
                        }
                            break;
                        case 'Language Edited': {
                            articlelanguage += '<a href="javascript:void(0)">' + Languagecollection[arrdsp].LanguageTitle + '<span><img src="../../Content/Images/yellow-icon.jpg" style="margin-left:5px;" title="Language Edited" alt=""></span></a>'
                        }
                            break;
                        case 'Removed': {
                            //isremoved = "true";
                            articlelanguage += '<a href="javascript:void(0)">' + Languagecollection[arrdsp].LanguageTitle + '<span><img src="../../Content/Images/flag-icon.jpg" style="margin-left:5px;" title="Required Term, Not in Document" alt=""></span></a>';
                        }
                            break;
                        case 'Same as Library':
                        default: {
                            articlelanguage += '<a href="javascript:void(0)">' + Languagecollection[arrdsp].LanguageTitle + '<span><img src="../../Content/Images/green-icon.jpg" style="margin-left:5px;" title="Same as Library" alt=""></span></a>';
                        }
                            break;
                    }
                    articlelanguage += '<ul class="hide">'
                    //if (isremoved == "true") {
                    //    articlelanguage += '<li style="text-decoration:line-through;">' + Languagecollection[arrdsp].LanguageText + '</li>'
                    //} else {
                    //    articlelanguage += '<li>' + Languagecollection[arrdsp].LanguageText + '</li>'
                    //}
                    articlelanguage += '<li>' + Languagecollection[arrdsp].LanguageText + '</li>'
                    articlelanguage += '</ul></li>'
                }
            }
            $("#accordionthisdocument").append(articlelanguage);

            $('.clause-item.this-doc li > a').click(function () {
                $('.clause-item li').removeClass('active');
                $('.clause-item li').toggleClass('hide');
                $(this).parent().addClass('active');
            });

            $("#loading").css('display', 'none');
        },
        error: function () {
        }
    });
}

function GetContractActivities() {
    $("#loading").css('display', '');
    $("#tabDetailsWorkflow").css('display', 'none');
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/contracts/' + vContractID + '/activity',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data1) {
            var datalength = data1.length;
            var foundforReview = false;
            if (datalength > 0) {
                //for (var i = 0; i < datalength; i++) {
                var i = 0;
                var item = data1[i];
                var RowKey = item.RowKey;
                var WorkflowTitle = item.WorkflowTitle;
                //var Participants = item.Participants;
                //var Status = item.Status;
                var ActivityType = item.ActivityType;

                //$("#wfTitle").empty();
                if (ActivityType == "Document Review") {
                    foundforReview = true;
                    //var article = "";
                    //article += '<div class="col-xs-8 no-padding">'
                    //article += '<div class="agreementLeft clearfix">'
                    //article += '<div class="col-xs-2 no-padding"><img class="task_head" alt="" src="../Images/workflow-title.png"></div>'
                    //article += '<div class="col-xs-10 no-padding">'
                    //article += '<h5 class="approval" title="' + WorkflowTitle + '">' + WorkflowTitle + '</h5>'
                    //article += '<span class="italic"> Started by <span id="createdBy">Robert</span> on <span id="startDate">5th May 2016</span><span id="dueOn"></span> </span>'
                    //article += '</div>'
                    //article += '</div>'
                    //article += '</div>'
                    //article += '<div class="col-xs-4 no-padding text-right"> <a class="linkText" href="javascript:void(0);">1 Past Worflow</a> </div>'
                    //$("#wfTitle").append(article);

                    $.ajax({
                        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/Workflow/taskdetail?taskid=&workflowid=' + RowKey,
                        type: 'GET',
                        cache: false,
                        contentType: false,
                        headers: { 'eContracts-ApiKey': localStorage.APIKey },
                        success: function (data) {
                            $("#tabDetailsWorkflow").css('display', '');
                            $(".divhide").css('display', 'block');
                            $(".divNoItemFound").css('display', 'none');
                            var articlestages = ""
                            var vTaskID = "";
                            var vTaskDetail = data.TaskDetail;
                            var vWorkflowDetail = data.WorkflowDetail;
                            if (vWorkflowDetail.Object == "Documents" && vWorkflowDetail.ObjectID == vDocumentID) {
                                var vWorkflowStages = data.WorkflowStages;
                                var vWorkflowTasks = data.WorkflowTasks;
                                var vWorkflowHistory = data.WorkflowHistory;
                                if (vTaskID != "")
                                    vWorkflowID = vTaskDetail.WorkflowID;
                                //else {
                                //    var vFilterTask = $.grep(vWorkflowTasks, function (n, x) {
                                //        return (n.Status == "In Progress" && n.AssignTo == localStorage.UserName);
                                //    });
                                //    if (vFilterTask.length > 0) {
                                //        vTaskDetail = vFilterTask[0];
                                //        vTaskID = vTaskDetail.RowKey;
                                //    }
                                //}

                                var vFilterTask = $.grep(vWorkflowTasks, function (n, i) {
                                    return (n.Status == "In Progress" && n.AssignTo == localStorage.UserName);
                                });
                                if (vFilterTask.length > 0) {
                                    vTaskDetail = vFilterTask[0];
                                    vTaskID = vTaskDetail.RowKey;
                                }

                                vWorkflowInitiator = vWorkflowDetail.Initiator;
                                vWorkflowParticipants = vWorkflowDetail.Participants.split(';');
                                vWorkflowParticipants = $.map(vWorkflowParticipants, $.trim);
                                $("#dvWorkflowStatus").html(vWorkflowDetail.Status);
                                $("#dvWorkflowStatusMenu").html(vWorkflowDetail.Status);
                                if (vWorkflowDetail.Status == "Cancelled") {
                                    $("#dvWorkflowStatusMenu").parent().css("pointer-events", "none");
                                    $("#dvWorkflowStatus").parent().css("pointer-events", "none");
                                }
                                else {
                                    $("#dvWorkflowStatusMenu").parent().css("pointer-events", "");
                                    $("#dvWorkflowStatus").parent().css("pointer-events", "");
                                }


                                $("#toDoContenPost").css("display", "");
                                if (vWorkflowInitiator == localStorage.UserName) {

                                }

                                if (vTaskID != "") {
                                    if (vTaskDetail.Status == "In Progress" && vTaskDetail.AssignTo == localStorage.UserName) {
                                        if (vTaskDetail.TaskType == "General" || vTaskDetail.TaskType == "Reassign") {
                                            if (vWorkflowDetail.WorkflowType == "Contract Approval" || vWorkflowDetail.WorkflowType == "Request Approval" || vWorkflowDetail.WorkflowType == "Renewal Approval") {
                                                $("#btnComplete").css("display", "none");
                                                $("#btnReject").css("display", "");
                                                $("#btnActions").css("display", "");
                                            }
                                            else if (vWorkflowDetail.WorkflowType == "Document Review") {
                                                $("#btnComplete").css("display", "none");
                                                $("#btnReject").css("display", "none");
                                                $("#btnApproveText").html('Reviewed');
                                                $("#btnActions").css("display", "");
                                            }
                                        }
                                        else if (vTaskDetail.TaskType == "Change Request") {
                                            $("#btnComplete").css("display", "");
                                            $("#btnActions").css("display", "none");
                                            $("#btnApprove").css("display", "none");
                                            $("#btnReject").css("display", "none");
                                        }
                                        $("#toDo_btn").css("display", "");
                                    }
                                    if (vTaskDetail.DueDate != null && vTaskDetail.DueDate != 'undefined')
                                        $("#dueOn").text(" due on " + moment(new Date(vTaskDetail.DueDate)).format('Do MMM YYYY'));
                                }

                                $("#workflowTitle").text(vWorkflowDetail.WorkflowTitle);
                                $("#workflowTitle").attr('title', vWorkflowDetail.WorkflowTitle);
                                $("#createdBy").text(vWorkflowInitiator);
                                $("#startDate").text(moment(new Date(vWorkflowDetail.StartDate)).format('Do MMM YYYY'));
                                $(".status_yellow").text(vWorkflowDetail.Status);

                                $("#dvParticipants").empty();
                                $("#accordion2").empty();
                                var vUserStatus = "";
                                var datalenght = vWorkflowStages.length;
                                for (var j = 0; j < datalenght; j++) {
                                    var vWorkflowStage = vWorkflowStages[j];
                                    var assignTo = vWorkflowStage.Participants.split(';');
                                    assignTo = $.map(assignTo, $.trim);
                                    var taskImg = '<img src="/Content/images/task_parallal.png" title="Parallel" />';
                                    if (vWorkflowStage.Order.toLowerCase() == "serial") {
                                        taskImg = '<img src="/Content/images/task_serial.png" title="Serial" />';
                                    }
                                    $.each(assignTo, function (index, value) {
                                        if (value.trim() != '') {
                                            //if (vUserStatus != "") {
                                            //    vUserStatus += '<li class="contraRigght_R_img">' + taskImg + '</li>';
                                            //}
                                            //var vFilterTask = $.grep(vWorkflowTasks, function (n, i) {
                                            //    return (n.StageID == vWorkflowStage.StageID && n.AssignTo == value && n.TaskType == 'General' &&
                                            //        (n.Status == 'Approved' || n.Status == 'Rejected' || n.Status == 'Reviewed' || n.Status == 'Cancelled' || n.Status == 'Stopped' || n.Status == 'In Progress'));
                                            //});
                                            //if (vFilterTask.length == 0) {
                                            //    vFilterTask = $.grep(vWorkflowTasks, function (n, i) {
                                            //        return (n.StageID == vWorkflowStage.StageID && n.AssignTo == value && n.TaskType == 'General');
                                            //    });
                                            //}
                                            var vFilterTask = $.grep(vWorkflowTasks, function (n, i) {
                                                return (n.StageID == vWorkflowStage.StageID && n.AssignTo == value && n.TaskType == 'General' &&
                                                    (n.Status == 'Approved' || n.Status == 'Rejected' || n.Status == 'Reviewed' || n.Status == 'Cancelled' || n.Status == 'Stopped' || n.Status == 'In Progress'));
                                            });
                                            if (vFilterTask.length == 0) {
                                                vFilterTask = $.grep(vWorkflowTasks, function (n, i) {
                                                    return (n.StageID == vWorkflowStage.StageID && n.AssignTo == value && n.TaskType == 'General');
                                                });
                                            }
                                            if (vFilterTask.length > 0) {
                                                //if (vFilterTask[0].Status == 'Approved') {
                                                //    vUserStatus += '<p><span>' + value + '</span><span><img src="../Images/approved.png" width="13" height="13" alt=""></span><span>Approved on ' + moment(new Date(vFilterTask[0].CompletedDate)).format('Do MMM YYYY') + '</span></p>';
                                                //}
                                                //else if (vFilterTask[0].Status == 'Rejected') {
                                                //    vUserStatus += '<p><span>' + value + '</span><span><img src="../Images/reject.png" width="13" height="13" alt=""></span><span>Rejected on ' + moment(new Date(vFilterTask[0].CompletedDate)).format('Do MMM YYYY') + '</span></p>';
                                                //}
                                                //else if (vFilterTask[0].Status == 'Reviewed') {
                                                //    vUserStatus += '<p><span>' + value + '</span><span><img src="../Images/approved.png" width="13" height="13" alt=""></span><span>Reviewed on ' + moment(new Date(vFilterTask[0].CompletedDate)).format('Do MMM YYYY') + '</span></p>';
                                                //}
                                                //else if (vFilterTask[0].Status == 'Change Requested') {
                                                //    vUserStatus += '<p><span>' + vFilterTask[0].AssignTo + '</span><span><img src="../Images/change_request.png" width="13" height="13" alt=""></span><span>Change Request on ' + moment(new Date(vFilterTask[0].CompletedDate)).format('Do MMM YYYY') + '</span></p>';
                                                //}
                                                //else if (vFilterTask[0].Status == 'Delegated') {
                                                //    vUserStatus += '<p><span>' + value + '</span><span><img src="../Images/delegated.png" width="13" height="13" alt=""></span><span>Delegated on ' + moment(new Date(vFilterTask[0].Timestamp)).format('Do MMM YYYY') + '</span></p>';
                                                //    vFilterTask = $.grep(vWorkflowTasks, function (n, i) {
                                                //        return (n.StageID == vWorkflowStage.StageID && n.DelegatedTaskID == vFilterTask[0].RowKey);
                                                //    });
                                                //    vUserStatus += '<li class="contraRigght_R_img">' + taskImg + '</li>';
                                                //    if (vFilterTask[0].Status == 'In Progress') {
                                                //        vUserStatus += '<p><span>' + value + '</span><span><img src="../Images/waiting-approval.png" width="13" height="13" alt=""></span><span>Assigned on ' + moment(new Date(vFilterTask[0].StartDate)).format('Do MMM YYYY') + '</span></p>';
                                                //        vUserTaskPending += vFilterTask[0].AssignTo + ";";
                                                //    } else if (vFilterTask[0].Status == 'Approved') {
                                                //        vUserStatus += '<p><span>' + value + '</span><span><img src="../Images/approved.png" width="13" height="13" alt=""></span><span>Approved on ' + moment(new Date(vFilterTask[0].CompletedDate)).format('Do MMM YYYY') + '</span></p>';
                                                //    }
                                                //    else if (vFilterTask[0].Status == 'Rejected') {
                                                //        vUserStatus += '<p><span>' + value + '</span><span><img src="../Images/reject.png" width="13" height="13" alt=""></span><span>Rejected on ' + moment(new Date(vFilterTask[0].CompletedDate)).format('Do MMM YYYY') + '</span></p>';
                                                //    }
                                                //    else if (vFilterTask[0].Status == 'Reviewed') {
                                                //        vUserStatus += '<p><span>' + value + '</span><span><img src="../Images/approved.png" width="13" height="13" alt=""></span><span>Reviewed on ' + moment(new Date(vFilterTask[0].CompletedDate)).format('Do MMM YYYY') + '</span></p>';
                                                //    }
                                                //    else if (vFilterTask[0].Status == 'Change Requested') {
                                                //        vUserStatus += '<p><span>' + value + '</span><span><img src="../Images/change_request.png" width="13" height="13" alt=""></span><span>Change Request on ' + moment(new Date(vFilterTask[0].CompletedDate)).format('Do MMM YYYY') + '</span></p>';
                                                //    }
                                                //}
                                                //else if (vFilterTask[0].Status == 'Reassigned') {
                                                //    vFilterTask = $.grep(vWorkflowTasks, function (n, x) {
                                                //        return (n.StageID == vWorkflowStage.StageID && n.ReassignTaskID == vFilterTask[0].RowKey);
                                                //    });
                                                //    vUserTaskPending += vFilterTask[0].AssignTo + ";";
                                                //    vUserStatus += '<p><span>' + vFilterTask[0].AssignTo + '</span><span><img src="../Images/reassigned.png" width="13" height="13" alt=""></span><span>Reassigned on ' + moment(new Date(vFilterTask[0].CompletedDate)).format('Do MMM YYYY') + '</span></p>';
                                                //    vUserStatus += '<li class="contraRigght_R_img">' + taskImg + '</li>';
                                                //    if (vFilterTask[0].Status == 'In Progress') {
                                                //        vUserStatus += '<p><span>' + value + '</span><span><img src="../Images/waitng-approval.png" width="13" height="13" alt=""></span><span>Assigned on ' + moment(new Date(vFilterTask[0].StartDate)).format('Do MMM YYYY') + '</span></p>';
                                                //        vUserTaskPending += vFilterTask[0].AssignTo + ";";
                                                //    } else if (vFilterTask[0].Status == 'Approved') {
                                                //        vUserStatus += '<p><span>' + value + '</span><span><img src="../Images/approved.png" width="13" height="13" alt=""></span><span>Approved on ' + moment(new Date(vFilterTask[0].CompletedDate)).format('Do MMM YYYY') + '</span></p>';
                                                //    }
                                                //    else if (vFilterTask[0].Status == 'Rejected') {
                                                //        vUserStatus += '<p><span>' + value + '</span><span><img src="../Images/reject.png" width="13" height="13" alt=""></span><span>Rejected on ' + moment(new Date(vFilterTask[0].CompletedDate)).format('Do MMM YYYY') + '</span></p>';
                                                //    }
                                                //    else if (vFilterTask[0].Status == 'Reviewed') {
                                                //        vUserStatus += '<p><span>' + value + '</span><span><img src="../Images/approved.png" width="13" height="13" alt=""></span><span>Reviewed on ' + moment(new Date(vFilterTask[0].CompletedDate)).format('Do MMM YYYY') + '</span></p>';
                                                //    }
                                                //    else if (vFilterTask[0].Status == 'Change Requested') {
                                                //        vUserStatus += '<p><span>' + value + '</span><span><img src="../Images/change_request.png" width="13" height="13" alt=""></span><span>Change Request on ' + moment(new Date(vFilterTask[0].CompletedDate)).format('Do MMM YYYY') + '</span></p>';
                                                //    }
                                                //}
                                                //else if (vFilterTask[0].Status == 'In Progress') {
                                                //    vUserStatus += '<p><span>' + value + '</span><span><img src="../Images/waitng-approval.png" width="13" height="13" alt=""></span><span>Assigned on ' + moment(new Date(vFilterTask[0].StartDate)).format('Do MMM YYYY') + '</span></p>';
                                                //    vUserTaskPending += vFilterTask[0].AssignTo + ";";
                                                //}
                                                //else if (vFilterTask[0].Status == 'Cancelled') {
                                                //    vUserStatus += '<p><span>' + value + '</span><span><img src="../Images/Cancel_Task.png" width="13" height="13" alt=""></span><span>' + vFilterTask[0].Status + ' on ' + moment(new Date(vFilterTask[0].Timestamp)).format('Do MMM YYYY') + '</span></p>';
                                                //}
                                                //else if (vFilterTask[0].Status != '') {
                                                //    vUserStatus += '<p><span>' + value + '</span><span><img src="../Images/stop.png" width="13" height="13" alt=""></span><span>' + vFilterTask[0].Status + ' on ' + moment(new Date(vFilterTask[0].Timestamp)).format('Do MMM YYYY') + '</span></p>';
                                                //}
                                                //else {
                                                //    vUserStatus += '<p><span>' + value + '</span><span class="">Not Assigned</span></p>';
                                                //}

                                                //vFilterTask = $.grep(vWorkflowTasks, function (n, x) {
                                                //    return (n.StageID == vWorkflowStage.StageID && n.ChangeReqTaskID == vFilterTask[0].RowKey);
                                                //});
                                                //if (vFilterTask.length > 0) {
                                                //    vUserStatus += '<li class="contraRigght_R_img">' + taskImg + '</li>';
                                                //    if (vFilterTask[0].Status == 'In Progress') {
                                                //        vUserStatus += '<p><span>' + value + '</span><span><img src="../Images/waitng-approval.png" width="13" height="13" alt=""></span><span>Assigned on ' + moment(new Date(vFilterTask[0].StartDate)).format('Do MMM YYYY') + '</span></p>';
                                                //        vUserTaskPending += vFilterTask[0].AssignTo + ";";
                                                //    } else if (vFilterTask[0].Status == 'Closed') {
                                                //        vUserStatus += '<p><span>' + value + '</span><span><img src="../Images/approved.png" width="13" height="13" alt=""></span><span>Closed on ' + moment(new Date(vFilterTask[0].CompletedDate)).format('Do MMM YYYY') + '</span></p>';
                                                //    }
                                                //    else if (vFilterTask[0].Status == 'Cancelled') {
                                                //        vUserStatus += '<p><span>' + value + '</span><span><img src="../Images/Cancel_Task.png" width="13" height="13" alt=""></span><span>' + vFilterTask[0].Status + ' on ' + moment(new Date(vFilterTask[0].Timestamp)).format('Do MMM YYYY') + '</span></p>';
                                                //    }
                                                //    else if (vFilterTask[0].Status != '') {
                                                //        vUserStatus += '<p><span>' + value + '</span><span><img src="../Images/stop.png" width="13" height="13" alt=""></span><span>' + vFilterTask[0].Status + ' on ' + moment(new Date(vFilterTask[0].Timestamp)).format('Do MMM YYYY') + '</span></p>';
                                                //    }
                                                //}

                                                vFilterTask.sort(function (x, y) {
                                                    var c = new Date(x.StartDate);
                                                    var d = new Date(y.StartDate);
                                                    return c - d;
                                                });
                                                var FlagRepeat = true;
                                                var switchVar = vFilterTask[0].Status;
                                                while (FlagRepeat) {
                                                    if (vFilterTask.length > 0) {
                                                        switchVar = vFilterTask[0].Status;
                                                        var vTaskIdForChngReq = vFilterTask[0].RowKey;
                                                        switch (switchVar) {
                                                            case "Cancelled":
                                                                vUserStatus += '<p><span>' + vFilterTask[0].AssignTo + '</span><span><img src="../Images/Cancel_Task.png" width="13" height="13" alt=""></span><span>' + vFilterTask[0].Status + ' on ' + moment(new Date(vFilterTask[0].Timestamp)).format('Do MMM YYYY') + '</span></p>';
                                                                FlagRepeat = false;
                                                                break;
                                                            case "Closed":
                                                                vUserStatus += '<p><span>' + vFilterTask[0].AssignTo + '</span><span><img src="../Images/approved.png" width="13" height="13" alt=""></span><span>' + vFilterTask[0].Status + ' on ' + moment(new Date(vFilterTask[0].Timestamp)).format('Do MMM YYYY') + '</span></p>';
                                                                FlagRepeat = false;
                                                                break;
                                                            case "In Progress":
                                                                vUserStatus += '<p><span>' + vFilterTask[0].AssignTo + '</span><span><img src="../Images/waitng-approval.png" width="13" height="13" alt=""></span><span>Assigned on ' + moment(new Date(vFilterTask[0].StartDate)).format('Do MMM YYYY') + '</span></p>';
                                                                if (vUserTaskPending.indexOf(vFilterTask[0].AssignTo) == -1)
                                                                    vUserTaskPending.push(vFilterTask[0].AssignTo);

                                                                FlagRepeat = false;

                                                                break;
                                                            case "Reviewed":
                                                                vUserStatus += '<p><span>' + vFilterTask[0].AssignTo + '</span><span><img src="../Images/approved.png" width="13" height="13" alt=""></span><span>Reviewed on ' + moment(new Date(vFilterTask[0].CompletedDate)).format('Do MMM YYYY') + '</span></p>';
                                                                FlagRepeat = false;
                                                                break;
                                                            case "Rejected":
                                                                vUserStatus += '<p><span>' + vFilterTask[0].AssignTo + '</span><span><img src="../Images/reject.png" width="13" height="13" alt=""></span><span>Rejected on ' + moment(new Date(vFilterTask[0].CompletedDate)).format('Do MMM YYYY') + '</span></p>';
                                                                FlagRepeat = false;
                                                                break;
                                                            case "Approved":
                                                                vUserStatus += '<p><span>' + vFilterTask[0].AssignTo + '</span><span><img src="../Images/approved.png" width="13" height="13" alt=""></span><span>Approved on ' + moment(new Date(vFilterTask[0].CompletedDate)).format('Do MMM YYYY') + '</span></p>';
                                                                FlagRepeat = false;
                                                                break;
                                                            case "Delegated":
                                                                vUserStatus += '<p><span>' + vFilterTask[0].AssignTo + '</span><span><img src="../Images/delegated.png" width="13" height="13" alt=""></span><span>Delegated on ' + moment(new Date(vFilterTask[0].CompletedDate)).format('Do MMM YYYY') + '</span></p>';
                                                                vUserStatus += '<li class="contraRigght_R_img">' + taskImg + '</li>';

                                                                vFilterTask = $.grep(vWorkflowTasks, function (n, i) {
                                                                    return (n.StageID == vWorkflowStage.StageID && n.DelegatedTaskID == vFilterTask[0].RowKey);
                                                                });
                                                                FlagRepeat = true;
                                                                break;
                                                            case "Reassigned":
                                                                vUserStatus += '<p><span>' + vFilterTask[0].AssignTo + '</span><span><img src="../Images/reassigned.png" width="13" height="13" alt=""></span><span>Reassigned on ' + moment(new Date(vFilterTask[0].CompletedDate)).format('Do MMM YYYY') + '</span></p>';

                                                                vUserStatus += '<li class="contraRigght_R_img">' + taskImg + '</li>';

                                                                vFilterTask = $.grep(vWorkflowTasks, function (n, i) {
                                                                    return (n.StageID == vWorkflowStage.StageID && n.ReassignTaskID == vFilterTask[0].RowKey);
                                                                });
                                                                FlagRepeat = true;
                                                                break;
                                                            case "Change Requested":
                                                                vUserStatus += '<p><span>' + vFilterTask[0].AssignTo + '</span><span><img src="../Images/change_request.png" width="13" height="13" alt=""></span><span>Change Request on ' + moment(new Date(vFilterTask[0].CompletedDate)).format('Do MMM YYYY') + '</span></p>';
                                                                vUserStatus += '<li class="contraRigght_R_img"><img src="/Content/images/task_change_request.png" title="Change Request" /></li>';
                                                                vFilterTask = $.grep(vWorkflowTasks, function (n, i) {
                                                                    return (n.StageID == vWorkflowStage.StageID && n.ChangeReqTaskID == vFilterTask[0].RowKey);
                                                                });

                                                                FlagRepeat = true;
                                                                break;
                                                            default:
                                                                vUserStatus += '<p><span>' + vFilterTask[0].AssignTo + '</span><span><img src="../Images/stop.png" width="13" height="13" alt=""></span><span>' + vFilterTask[0].Status + ' on ' + moment(new Date(vFilterTask[0].Timestamp)).format('Do MMM YYYY') + '</span></p>';
                                                                FlagRepeat = false;
                                                                break;

                                                        }

                                                        var vFilterChangeRequestedTask = $.grep(vWorkflowTasks, function (n, i) {
                                                            return (n.StageID == vWorkflowStage.StageID && n.ChangeReqTaskID == vTaskIdForChngReq && n.Status != "In Progress");
                                                        });

                                                        if (vFilterChangeRequestedTask.length > 0) {
                                                            vFilterChangeRequestedTask.sort(function (a, b) {
                                                                return a.AssignTo.toUpperCase().localeCompare(b.AssignTo);
                                                            })
                                                            var iChangeRequestedTaskCount = vFilterChangeRequestedTask.length;
                                                            for (var iChangeRequestedTask = 0; iChangeRequestedTask < iChangeRequestedTaskCount; iChangeRequestedTask++) {
                                                                var item = vFilterChangeRequestedTask[iChangeRequestedTask];
                                                                if (!FlagRepeat)
                                                                    vUserStatus += '<li class="contraRigght_R_img"><img src="/Content/images/task_change_request.png" title="Change Request" /></li>';

                                                                //vUserStatus += '<li class="contraRigght_R"><span class="toDoContenLeft2 "><img src="/Content/images/approved.png" style="cursor:default" title="Closed" /></span>' +
                                                                //                                   '<span class="toDoContenRight1">' + item.AssignTo + '<small>Closed on ' + moment(new Date(item.CompletedDate)).format('Do MMM YYYY') + '</small></span></li>';

                                                                vUserStatus += '<p><span>' + item.AssignTo + '</span><span><img src="../Images/approved.png" width="13" height="13" alt=""></span><span>Closed on ' + moment(new Date(vFilterTask[0].Timestamp)).format('Do MMM YYYY') + '</span></p>';
                                                                if (FlagRepeat)
                                                                    vUserStatus += '<li class="contraRigght_R_img"><img src="/Content/images/task_change_request.png" title="Change Request" /></li>';
                                                            }
                                                        }

                                                    }
                                                    else {
                                                        FlagRepeat = false;
                                                    }

                                                }
                                            }
                                            else {
                                                vUserStatus += '<p><span>' + value + '</span><span class="">Not Assigned</span></p>';
                                            }
                                        }
                                    });

                                    //if (('Stage ' + vWorkflowStage.StageID) == vWorkflowStage.StageTitle)
                                    //    $("#dvParticipants").append('<span class="documentsLeft width80">Stage ' + vWorkflowStage.StageID + ':</span><span class="documentsRight width20 text_align_right">' + vWorkflowStage.Status + '</span>');
                                    //else
                                    //    $("#dvParticipants").append('<span class="documentsLeft width80">Stage ' + vWorkflowStage.StageID + ': ' + vWorkflowStage.StageTitle + '</span><span class="documentsRight width20 text_align_right">' + vWorkflowStage.Status + '</span>');
                                    //$("#dvParticipants").append('<br/><ul>' + vUserStatus + '</ul><br/>');
                                    //vUserStatus = "";

                                    //binding stages 
                                    var vbindings = "";
                                    if (('Stage ' + vWorkflowStage.StageID) == vWorkflowStage.StageTitle && vWorkflowStage.StageTitle.indexOf('Stage ') > -1) {
                                        if (i == 0)
                                            vbindings = '<div class="accordion-group"><div class="accordion-heading"><a class="accordion-toggle active" data-toggle="collapse" data-parent="#accordion2" href="#collapse' + vWorkflowStage.StageID + '"> Stage ' + vWorkflowStage.StageID + ': </a></div><div style="" id="collapse' + vWorkflowStage.StageID + '" class="accordion-body collapse in"><div class="accordion-inner"><div class="inner-content">'
                                        else
                                            vbindings = '<div class="accordion-group"><div class="accordion-heading"><a class="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion2" href="#collapse' + vWorkflowStage.StageID + '"> Stage ' + vWorkflowStage.StageID + ': </a></div><div style="" id="collapse' + vWorkflowStage.StageID + '" class="accordion-body collapse"><div class="accordion-inner"><div class="inner-content">'
                                    }
                                    else {
                                        if (i == 0)
                                            vbindings = '<div class="accordion-group"><div class="accordion-heading"> <a class="accordion-toggle collapsed active" data-toggle="collapse" data-parent="#accordion2" href="#collapse' + vWorkflowStage.StageID + '"> Stage ' + vWorkflowStage.StageID + ': ' + vWorkflowStage.StageTitle + '</a> </div><div style="" id="collapse' + vWorkflowStage.StageID + '" class="accordion-body collapse in"><div class="accordion-inner"><div class="inner-content">'
                                        else
                                            vbindings = '<div class="accordion-group"><div class="accordion-heading"> <a class="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion2" href="#collapse' + vWorkflowStage.StageID + '"> Stage ' + vWorkflowStage.StageID + ': ' + vWorkflowStage.StageTitle + '</a> </div><div style="" id="collapse' + vWorkflowStage.StageID + '" class="accordion-body collapse"><div class="accordion-inner"><div class="inner-content">'
                                    }
                                    $("#accordion2").append(vbindings + vUserStatus + '</div></div></div></div>');
                                    vUserStatus = "";
                                    vbindings = "";

                                }

                                //if (vWorkflowDetail.WorkflowType == "Document Review") {
                                //    $("#bTaskSummary").html('Document(s) Summary');
                                //    GetDocuments(vWorkflowDetail.ObjectID);
                                //}


                                //Comment section 
                                $("#listTaskComments").empty();
                                datalenght = vWorkflowHistory.length;
                                $("#totComments").html("(" + datalenght + ")");
                                for (var k = 0; k < datalenght; k++) {
                                    var item = vWorkflowHistory[k];
                                    var vTime = '';
                                    if (typeof (item.ModifiedDate) != "undefined" && item.ModifiedDate != null && item.ModifiedDate != "")
                                        vTime = moment(new Date(item.ModifiedDate)).format('MMMM Do YYYY, h:mm A');
                                    else if (typeof (item.Created) != "undefined" && item.Created != null && item.Created != "")
                                        vTime = moment(new Date(item.Created)).format('MMMM Do YYYY, h:mm A');
                                    else
                                        vTime = moment(new Date(item.Timestamp)).format('MMMM Do YYYY, h:mm A');

                                    //var article = '<li>';
                                    //article += '<b class="color_lightgrey">' + item.Title + ' on ' + vTime;
                                    //article += '<br/><small class="color_dark">';
                                    //if (item.Description != '')
                                    //    article += 'Comment: ';
                                    //article += '<div class="taskcomment">' + item.Description;
                                    //if (item.User == localStorage.UserName && item.Type == "Comment")
                                    //    article += '<img src="../Content/Images/edit-quick.png" class="margin-left-5" onclick="GetCommentDetail(\'' + item.RowKey + '\')" /><img src="../Content/Images/close-quick.png" class="margin-left-5" onclick="DeleteComment(\'' + item.RowKey + '\')" />';
                                    //article += '</div';
                                    //article += '</small></b>';
                                    //article += '</li>';

                                    var article = "";
                                    article += "<p>" + item.Title + ' on ' + vTime + " <span style='font-size:11px;'>Comment: <span>" + item.Description + "</span></span></p>"
                                    $("#listTaskComments").append(article);
                                }
                                $("#loading").css('display', 'none');
                            }
                        },
                        error:
                            function (data) {
                            }
                    });
                    //break;
                }
                //  }

                if (!foundforReview) {
                    $("#loading").css('display', 'none');
                    $("#tabDetailsWorkflow").css('display', 'block');
                    $(".divhide").css('display', 'none');
                    $(".divNoItemFound").css('display', 'block');
                }
            } else {
                $("#loading").css('display', 'none');
                $("#tabDetailsWorkflow").css('display', 'block');
                $(".divhide").css('display', 'none');
                $(".divNoItemFound").css('display', 'block');
                //$("#listTaskComments").html('No item found.');
            }
        },
        error: function (data) {
            $("#loading").css('display', 'none');
            $("#tabDetailsWorkflow").css('display', 'block');
            $(".divhide").css('display', 'none');
            $(".divNoItemFound").css('display', 'block');
        }
    });
}

function filtersubmittedby(obj) {
    var modifiedcss = obj.text.replace(/ /g, '');
    modifiedcss = modifiedcss.replace('(', '');
    modifiedcss = modifiedcss.replace(')', '');
    if (obj.text == "All Users") {
        $('.pre-content').css('display', '');
    } else {
        $('.pre-content').css('display', 'none');
        $('.pre-content.' + modifiedcss + '').css('display', '');
    }
}

function docview(obj) {
    //var url ="https://corevo.sharepoint.com/sites/Contract365/V2.2.0/"+ obj.getAttribute("data-value");
    var url = localStorage.HostURL + "/" + obj.getAttribute("data-value");
    url = url.replace(/ /g, "%20");
    window.open("ms-word:ofe|u|" + url, "_self")
}

//Document publish as major version
function publishasmajorversion() {
    document.getElementById("txtVersionComments").value = "";
    $("#dvBrowse").dialog("open");
}
function publishasmajorversion1() {
    app.showNotification("", "Publishing... please wait.");
    $("#loading").css('display', '');
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/documents/' + vDocumentID + '/publish',
        type: 'POST',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
        data: {
            Comment: document.getElementById("txtVersionComments").value,
        },
        cache: false,
        success: function (published) {
            app.showNotification("", "Published");
            BindDocumentVersions();
        },
        error: function (published) {
            $("#loading").css('display', 'none');
            app.showNotification("", "Unable to Unpublish. Please try again later.");
        }
    });
}

//delete all versions of a document
function deleteallversions() {
    $("#loading").css('display', '');
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/documents/' + vDocumentID + '/deleteallversions',
        type: 'DELETE',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        "Content-Type": "application/json",
        cache: false,
        success: function (isdeleted) {
            BindDocumentVersions();
        },
        error: function (isdeleted) {
            $("#loading").css('display', 'none');
        }
    });
}

//delete all minor versions of a document
function deleteallminorversions() {
    $("#loading").css('display', '');
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/documents/' + vDocumentID + '/deleteallminorversions',
        type: 'DELETE',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, },
        "Content-Type": "application/json",
        cache: false,
        success: function (isdeleted) {
            BindDocumentVersions();
        },
        error: function (isdeleted) {
            $("#loading").css('display', 'none');
        }
    });
}

//delete a document version
function deletedocumentversion(obj) {
    $("#loading").css('display', '');
    var docVersion = obj.getAttribute("data-value");
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/documents/' + vDocumentID + '/deletedocumentversion?version=' + docVersion,
        type: 'DELETE',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        "Content-Type": "application/json",
        cache: false,
        success: function (isdeleted) {
            BindDocumentVersions();
        },
        error: function (isdeleted) {
            $("#loading").css('display', 'none');
        }
    });
}

function GetDocument() {
    var documentText = null;
    Office.context.document.getFileAsync("compressed", function (result) {
        if (result.status == "succeeded") {
            var myFile = result.value;
            myFile.getSliceAsync(0, function (resultSlice) {
                if (result.status == "succeeded") {
                    documentText = OSF.OUtil.encodeBase64(resultSlice.value.data);
                    myFile.closeAsync();
                    $.ajax({
                        type: "POST",
                        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/documents/parsedocument?docurl=' + documenturl + '&oldauthor=Ajith&newauthor=Hey Boy',
                        data: documentText,
                        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                        dataType: "json",
                        success: function (data) {

                        },
                        failure: function () {

                        }
                    });
                }
            });
        }
    });
}

function filterbygroup(obj) {
    $("#divSearchKeyword").empty();
    if (obj.text == "All") {
        BindClauses();
    } else {
        getgroupitemstobind(obj.id)
    }
}

//manoj
function DocumentMetadata(obj, objValue) {
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/documents/documentmetadata?documentid=' + vDocumentID + '&columnanmeandvalue=' + objValue + '~' + vMetadataValue,
        type: 'PUT',
        cache: false,
        contentType: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
        processData: false,
        success: function (document) {
            obj.parentNode.parentNode.childNodes[1].innerText = vMetadataValue;
            vMetadataValue = '';
        },
        complete: function () {
            applypage();
        }
    });
}
function ContractMetadata(obj, objValue) {
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/Contracts/contractmetadata?contractid=' + vContractID + '&columnanmeandvalue=' + objValue + '~' + vMetadataValue,
        type: 'PUT',
        cache: false,
        contentType: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
        processData: false,
        success: function (document) {
            obj.parentNode.parentNode.childNodes[1].innerText = vMetadataValue;
            vMetadataValue = '';
        },
        complete: function () {
            applypage();
        }
    });
}
//manoj

function savemetadata(obj) {
    var listName = $("#metadataSelection").text();
    var columnName = obj.id;

    if (listName == "Document") {
        if (columnName == "Description" && vMetadataValue.length > 300) {
            app.showNotification("", "only 300 char can allow");
            revertpage();
        } else if (columnName == "DocumentAuthor") {
            $.ajax({
                url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/users?username=' + vMetadataValue,
                type: 'GET',
                dataType: 'json',
                cache: false,
                headers: { 'eContracts-ApiKey': localStorage.APIKey },
                success: function (userdetails) {
                    DocumentMetadata(obj, columnName);
                },
                error: function (published) {
                    app.showNotification("", "UserName is not Available Select another user.");
                    revertpage();
                },
            });
        } else {
            DocumentMetadata(obj, columnName);
        }
    } else {
        //manoj
        if (columnName == "ContractTitle" && vMetadataValue.length > 100) {
            app.showNotification("", "only 100 char can allow");
            revertpage();
        } else if (columnName == "ContractTitle" && vMetadataValue.length <= 100) {
            $.ajax({
                url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/Contracts/contracttitleexist?contracttitle=' + encodeURIComponent(vMetadataValue),
                type: 'GET',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey },
                cache: false,
                success: function (contractdetails) {
                    if (contractdetails.length > 0) {
                        var vExist = (contractdetails[0].RowKey == vContractID) ? false : true;
                        if (vExist) {
                            app.showNotification("", "Contract Title Already Exist.");
                            revertpage();
                        } else {
                            ContractMetadata(obj, columnName);
                        }
                    } else {
                        ContractMetadata(obj, columnName);
                    }
                },
                error: function (contractdetails) {
                    ContractMetadata(obj, columnName);
                }
            });
        } else {
            ContractMetadata(obj, columnName);
        }
        //manoj

    }
}

function revertpage() {
    vMetadataValue = "";
    $('.currentImage').toggleClass('hide');
    $('.hiddenImage').toggleClass('show');
    $('.metadata-field').toggleClass('hover');
    //$('#notificationword-message').hide();
}

function applypage() {
    $('.currentImage').toggleClass('hide');
    $('.hiddenImage').toggleClass('show');
    $('.metadata-field').toggleClass('hover');
    $('#notificationword-message').hide();
}

function useraddedclause() {
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/documents?documentid=' + vDocumentID,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (item) {
            if (item != "") {
                if (item.RelatedClause != null && item.RelatedClause != "") {
                    if (item.RelatedClause.indexOf('<TitleLanguage>' + $("#ClauseTitle").val().trim() + '</TitleLanguage>')) {

                    }
                }
            }

        },
    });
}

//Document unpublish as major version
function unpublishdocumentversion(obj) {
    document.getElementById("txtUnpublishComments").value = "";
    versionurl = localStorage.HostURL + "/" + obj.getAttribute("data-value");
    versionurl = versionurl.replace(/ /g, "%20");
    $("#dvBrowseUnpublish").dialog("open");
}
function unpublishdocumentversion1() {
    app.showNotification("", "Unpublishing... please wait.");
    $("#loading").css('display', '');
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/documents/' + vDocumentID + '/unpublish',
        type: 'PUT',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
        data: {
            Comment: document.getElementById("txtUnpublishComments").value,
            VersionUrl: versionurl,
        },
        cache: false,
        success: function (published) {
            app.showNotification("", "Unpublished");
            BindDocumentVersions();
        },
        error: function (published) {
            $("#loading").css('display', 'none');
            app.showNotification("", "Unable to Unpublish. Please try again later.");
        }
    });
}

function restore(versionlabel) {
    $("#dvRestoreConfirm").data('param_1', versionlabel).dialog("open");
}

function restoredocumentversion(versionlabel) {
    $("#loading").css('display', '');
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/documents/' + vDocumentID + '/restore?versionlabel=' + versionlabel,
        type: 'PUT',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
        cache: false,
        success: function (data) {
            BindDocumentVersions();
        },
        error: function (data) {
            $("#loading").css('display', 'none');
        }
    });
}

function docdefaultview(doccontractarea) {
    //var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));        
    //var vDocLibFeat = $.grep(veContractFeatures, function (n, i) {
    //    return (n.RowKey == "14" && n.Status == "ON");
    //});
    var dURL = "";
    //multiple document library
    //if (vDocLibFeat.length > 0) {
    //    dURL = '/api/accounts/' + localStorage.AccountID + '/businessarea/contractareadetailsbyname?contractareaname=' + encodeURIComponent(doccontractarea)
    //} else {
    //    dURL = '/api/accounts/' + localStorage.AccountID + '/businessarea/contractareadetailsbyname?contractareaname=Business Area'
    //}
    dURL = vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/businessarea/contractareadetailsbyname?contractareaname=' + encodeURIComponent(doccontractarea)
    $.ajax({
        url: dURL,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        async: false,
        success: function (data) {
            thisDocumentLibrarySettings = data;
        },
        error: function (data) {
        }
    });
}

function clickrefresh() {
    $('.menu-item li').each(function () {
        if ($(this)[0].className == 'active') {
            if ($(this)[0].id == "tabClause") { tabClause(); return false; }
            else if ($(this)[0].id == "tabVersion") { tabVersion(); return false; }
            else if ($(this)[0].id == "tabMetadata") { tabMetadata(); return false; }
            else if ($(this)[0].id == "tabWorkflow") { tabWorkflow(); return false; }
            else if ($(this)[0].id == "tabCleanup") { tabCleanup(); return false; }
        }
    });
}

function tabClause() {
    if (documenturl == "") {
        $("#tabDetailsClause").slideDown("slow")
        $("#tabDetailsCleanup").slideUp("slow")

        $("#tabVersion").addClass("hide");
        $("#tabMetadata").addClass("hide");
        $("#tabWorkflow").addClass("hide");
    } else {
        $("#tabDetailsClause").slideDown("slow")
        $("#tabDetailsVersion").slideUp("slow")
        $("#tabDetailsMetadata").slideUp("slow")
        $("#tabDetailsWorkflow").slideUp("slow")
        $("#tabDetailsCleanup").slideUp("slow")
        $(".clause-delete-sec").addClass("show");
        $(".clause-delete-sec").removeClass("hide");
    }
    $('.get-data').removeClass("show");
    $('.clause-item.this-doc').removeClass("hide");
    $('.clause-item.this-doc').addClass("show");
    //$('.clause-item').addClass("hide");
    $('#notificationword-message').hide();
}
function tabVersion() {
    $("#tabDetailsClause").slideUp("slow")
    $("#tabDetailsVersion").slideDown("slow")
    $("#tabDetailsMetadata").slideUp("slow")
    $("#tabDetailsWorkflow").slideUp("slow")
    $("#tabDetailsCleanup").slideUp("slow")
    $(".clause-delete-sec").addClass("hide");
    $(".clause-delete-sec").removeClass("show");
    if (thisDocumentLibrarySettings != '' && thisDocumentLibrarySettings != 'undefined' && typeof thisDocumentLibrarySettings != "undefined") {
        //if no versioning is selected in the document library
        if (thisDocumentLibrarySettings.DocVersion == "No") {
            $("#tabDetailsVersion").empty();
            $("#tabDetailsVersion").append('<div>Versioning is turned off for the document library. <br/>Please contact administrator to turn on versioning for the document library.</div>')
        } else {
            BindDocumentVersions();
        }
    } else {
        BindDocumentVersions();
    }

    $('#notificationword-message').hide();
    $('.get-data').removeClass("show");
}
function tabMetadata() {
    $("#tabDetailsClause").slideUp("slow")
    $("#tabDetailsVersion").slideUp("slow")
    $("#tabDetailsMetadata").slideDown("slow")
    $("#tabDetailsWorkflow").slideUp("slow")
    $("#tabDetailsCleanup").slideUp("slow")
    $(".clause-delete-sec").addClass("hide");
    $(".clause-delete-sec").removeClass("show");

    if (IsViewingVersions) {
        $("#loading").css('display', 'none');
        $(".divMetaHide").css("display", "none");
        $(".divMetaNoItemFound").css("display", "");
    } else {
        $(".divMetaHide").css("display", "");
        $(".divMetaNoItemFound").css("display", "none");
        var objDefault = { text: "Document" };
        changelistnames(objDefault);
    }
    $('#notificationword-message').hide();
    $('.get-data').removeClass("show");
}
function tabWorkflow() {
    $("#tabDetailsClause").slideUp("slow")
    $("#tabDetailsVersion").slideUp("slow")
    $("#tabDetailsMetadata").slideUp("slow")
    $("#tabDetailsWorkflow").slideDown("slow")
    $("#tabDetailsCleanup").slideUp("slow")
    $(".clause-delete-sec").addClass("hide");
    $(".clause-delete-sec").removeClass("show");
    GetContractActivities();
    $('#notificationword-message').hide();
    $('.get-data').removeClass("show");
}
function tabCleanup() {
    if (documenturl == "") {
        $("#tabDetailsClause").slideUp("slow")
        $("#tabDetailsCleanup").slideDown("slow")

        $("#tabVersion").addClass("hide");
        $("#tabMetadata").addClass("hide");
        $("#tabWorkflow").addClass("hide");
    } else {
        $("#tabDetailsClause").slideUp("slow")
        $("#tabDetailsVersion").slideUp("slow")
        $("#tabDetailsMetadata").slideUp("slow")
        $("#tabDetailsWorkflow").slideUp("slow")
        $("#tabDetailsCleanup").slideDown("slow")
        $(".clause-delete-sec").addClass("hide");
        $(".clause-delete-sec").removeClass("show");
    }
    $('#notificationword-message').hide();
    $('.get-data').removeClass("show");
}