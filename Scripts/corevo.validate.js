function requiredValidator(formID, showMsg) {
    var isvalid = true;
    $.each($('input, select ,textarea', '#' + formID), function (k) {
        //for input type text
        //*Harshitha -- validNicEdit

        if (($(this).attr('class') != null && $(this).attr('class').indexOf("validelement") >= 0 && $.trim(this.value).length == 0) || ($(this).prop('type') == "select-one" && $(this).attr('class') != null && $(this).attr('class').indexOf("validelement") >= 0 && this.value == "0")) {
            $("#" + $(this).attr('id')).addClass('error');
            if ($("#" + $(this).attr('id')).css("display") == "none") {
                $("#" + $(this).attr('id')).css("display", "");
            }
            if ($(this).parent().parent().attr("style") == "display: none;" || $(this).parent().parent().attr("style") == "display:none;") {

            } else {
                isvalid = false;
            }

            if ($(this).attr('class').indexOf("validPhone") >= 0) {
                $("#" + $(this).attr('id')).removeClass('error');
                //var child = $("#" + $(this).attr('id')).parent();
                //$(child).addClass('error');
                $("#" + $(this).attr('id')).addClass('error');
            }

            if ($(this).attr('title') != null && (showMsg == true || typeof showMsg == 'undefined')) {
                $("#errormsg_" + $(this).attr('id') + "").remove();
                var errormsg = "";
                if ($(this).prop('type') == "text") {
                    errormsg = "Please enter ";
                } else if ($(this).prop('type') == "select-one") {
                    errormsg = "Please select ";
                } else if ($(this).prop('type') == "file") {
                    errormsg = "Please browse the ";
                }
                else {
                    errormsg = "Please enter ";
                }

                if ($(this).attr('class').indexOf("validPhone") >= 0) {
                    $("#" + $(this).attr('id')).removeClass('error');
                    var child = $("#" + $(this).attr('id')).parent();
                    $(child).addClass('error');
                    $(child).after('<span class="errorValidate" style="display:block;" id="errormsg_' + $(this).attr('id') + '">' + errormsg + $(this).attr('title') + ' </span>');
                }
                else {
                    $(this).after('<span class="errorValidate" style="display:block;" id="errormsg_' + $(this).attr('id') + '">' + errormsg + $(this).attr('title') + ' </span>');
                }
            }

            //event.preventDefault();
        }
        //Rahul -- For MultiChoice dropdown(Only for Create/Edit Contract and Request)
        if (($(this).attr('class') != null && $(this).attr('class').indexOf("validselect") >= 0 && $.trim(this.value).length == 0) || ($(this).prop('type') == "select-one" && $(this).attr('class') != null && $(this).attr('class').indexOf("validselect") >= 0 && this.value == "0")) {
            var child = $("#" + $(this).attr('id')).parent().children();
            $(child).addClass('error');
            $(child).next('div').css('border-radius', '4px');
            if ($(child).next('label').length > 0)
                $(child).next('label').removeClass('error');
            if ($(this).parent().parent().attr("style") == "display: none;" || $(this).parent().parent().attr("style") == "display:none;") {

            } else {
                isvalid = false;
            }

            if ($(this).attr('title') != null && (showMsg == true || typeof showMsg == 'undefined')) {
                $("#errormsg_" + $(this).attr('id') + "").remove();
                var errormsg = "";
                if ($(this).prop('type') == "text") {
                    errormsg = "Please enter ";
                } else if ($(this).prop('type') == "select-one") {
                    errormsg = "Please select ";
                } else if ($(this).prop('type') == "file") {
                    errormsg = "Please browse the ";
                }
                else {
                    errormsg = "Please enter ";
                }
                $(this).next().append('<span class="errorValidate" style="display:block;" id="errormsg_' + $(this).attr('id') + '">' + errormsg + $(this).attr('title') + ' </span>');
            }
        }
        else if ($("#" + $(this).attr('id')).hasClass('validselect') && this.value != "") {
            $("#" + $(this).attr('id')).parent().children().removeClass('error');
            $(this).parent().children().next('div').css('border-radius', '');
        }
        //Rahul 

        if (($(this).attr('class') != null && $(this).attr('class').indexOf("validuser") >= 0 && this.value == "")) {
            //$("#" + $(this).attr('id')).parent('div').addClass('error');
            isvalid = false;
            if ($(this).attr('title') != null && (showMsg == true || typeof showMsg == 'undefined')) {
                $("#errormsg_" + $(this).attr('id') + "").remove();
                var errormsg = "";
                if ($(this).prop('type') == "text") {
                    errormsg = "Please enter ";
                } else if ($(this).prop('type') == "select-one") {
                    errormsg = "Please select ";
                } else if ($(this).prop('type') == "file") {
                    errormsg = "Please browse the ";
                }
                else {
                    errormsg = "Please enter ";
                }
                $(this).next().append('<span class="errorValidate" style="display:block;" id="errormsg_' + $(this).attr('id') + '">' + errormsg + $(this).attr('title') + ' </span>');
            }
            $(this).next().children('ul').addClass('error');

            //event.preventDefault();
        }

        if (($(this).attr('class') != null && $(this).attr('class').indexOf("validPhone") >= 0 && this.value != "")) {
            if ($.trim($("#" + $(this).attr('id')).val())) {
                if (!($("#" + $(this).attr('id')).intlTelInput("isValidNumber"))) {
                    isvalid = false;
                    $("#errormsg_" + $(this).attr('id') + "").remove();
                    var errormsg = "Please enter valid ";
                    $("#" + $(this).attr('id')).addClass('error');
                    $(this).parent().after('<span class="errorValidate" style="display:block;" id="errormsg_' + $(this).attr("id") + '">' + errormsg + $(this).attr('title') + ' </span>');
                }
            }
        }

        //for multi select list validation
        if (($(this).attr('class') != null && $(this).attr('class').indexOf("validmultipleselect") >= 0 && this.value == "")) {
            var vid = $(this).attr('id');
            var length = $("#" + vid + " option").length;
            if (length == 0) {
                isvalid = false;
                $(this).addClass('error');
                event.preventDefault();
                $(this).change(function () {
                    if (this.value != "") {
                        $(this).removeClass('error');
                    }
                    $("#errormsg_" + $(this).attr('id') + "").remove();
                });
                $("select option").on(function () {
                    $(this).removeClass('error');
                });
            }

        }

        if (($(this).attr('class') != null && $(this).attr('class').indexOf("validmultiselect") >= 0 && this.value == "")) {

            //$("#" + $(this).attr('id')).parent('div').addClass('error');
            isvalid = false;
            if ($(this).attr('title') != null && (showMsg == true || typeof showMsg == 'undefined')) {
                $("#errormsg_" + $(this).attr('id') + "").remove();
                var errormsg = "";
                if ($(this).prop('type') == "text") {
                    errormsg = "Please enter ";
                } else if ($(this).prop('type') == "select-one") {
                    errormsg = "Please select ";
                } else if ($(this).prop('type') == "file") {
                    errormsg = "Please browse the ";
                }
                else {
                    errormsg = "Please enter ";
                }
                $(this).parent('div').after('<span class="errorValidate" style="display:block;" id="errormsg_' + $(this).attr('id') + '">' + errormsg + $(this).attr('title') + ' </span>');
            }
            $(this).parent().children('div').children('ul').addClass('error');
            //$(this).addClass('error');

            //event.preventDefault();

            $(this).change(function () {
                if (this.value != "") {
                    $(this).parent().children('div').children('ul').removeClass('error');
                }
                $("#errormsg_" + $(this).attr('id') + "").remove();
            });
        }

        //for date validation
        if ($(this).attr('class') != null && $(this).attr('class').indexOf("validdate") >= 0 && this.value != "" && this.value != "Invalid Date" && !isValidDate(this.value)) {

            $("#" + $(this).attr('id')).addClass('error');
            isvalid = false;
            if ($(this).attr('title') != null) {
                $("#errormsg_" + $(this).attr('id') + "").remove();
                var errormsg = "";
                if ($(this).prop('type') == "text") {
                    errormsg = "Please enter a valid ";
                }

                $(this).after('<span class="errorValidate" style="display:block;" id="errormsg_' + $(this).attr('id') + '">' + errormsg + $(this).attr('title') + ' </span>');
            }
        }
        //for number special char Validation
        if ($(this).attr('class') != null && $(this).attr('class').indexOf("validnumspec") >= 0 && !isValidNumSpecAlpha(this.value)) {
            isvalid = false;
            $("#" + $(this).attr('id')).addClass('error');
            if ($(this).attr('title') != null) {
                $("#errormsg_" + $(this).attr('id') + "").remove();
                var errormsg = "";


                if ($(this).prop('type') == "text") {
                    if (this.value == "") {

                    }
                    else {
                        errormsg = "Please enter a valid ";
                        $(this).after('<span class="errorValidate" style="display:block;" id="errormsg_' + $(this).attr('id') + '">' + errormsg + $(this).attr('title') + ' </span>');
                    }
                }

            }

        }

        //for email validation number
        if ($(this).attr('class') != null && $(this).attr('class').indexOf("validnumber") >= 0 && !isValidNumber(this.value) && this.value != "") {
            $("#" + $(this).attr('id')).addClass('error');
            isvalid = false;
            if ($(this).attr('title') != null) {
                $("#errormsg_" + $(this).attr('id') + "").remove();
                var errormsg = "";
                if ($(this).prop('type') == "text") {
                    errormsg = "Please enter a valid ";
                }
                $(this).after('<span class="errorValidate" style="display:block;" id="errormsg_' + $(this).attr('id') + '">' + errormsg + $(this).attr('title') + ' </span>');
            }
        }

        //for number validation greater than 0
        if ($(this).attr('class') != null && $(this).attr('class').indexOf("validnumbergtzero") >= 0 && !isGreaterThanZero(this.value) && this.value != "") {
            $("#" + $(this).attr('id')).addClass('error');
            isvalid = false;
            if ($(this).attr('title') != null) {
                $("#errormsg_" + $(this).attr('id') + "").remove();
                var errormsg = "";
                if ($(this).prop('type') == "text") {
                    errormsg = "Please enter a valid ";
                }
                $(this).after('<span class="errorValidate" style="display:block;" id="errormsg_' + $(this).attr('id') + '">' + errormsg + $(this).attr('title') + ' </span>');
            }
        }

        //for validation decimal number
        if ($(this).attr('class') != null && $(this).attr('class').indexOf("validnumeric") >= 0 && !isValidNumberic(this.value) && this.value != "") {
            $("#" + $(this).attr('id')).addClass('error');
            isvalid = false;
            if ($(this).attr('title') != null) {
                $("#errormsg_" + $(this).attr('id') + "").remove();
                var errormsg = "";
                if ($(this).prop('type') == "text") {
                    errormsg = "Please enter a valid ";
                }
                $(this).after('<span class="errorValidate" style="display:block;" id="errormsg_' + $(this).attr('id') + '">' + errormsg + $(this).attr('title') + ' </span>');
            }
        }
        //for email validation
        if ($(this).attr('class') != null && $(this).attr('class').indexOf("validemail") >= 0 && !isValidEmail(this.value) && this.value != "") {
            $("#" + $(this).attr('id')).addClass('error');
            isvalid = false;
            if ($(this).attr('title') != null) {
                $("#errormsg_" + $(this).attr('id') + "").remove();
                var errormsg = "";
                if ($(this).prop('type') == "text") {
                    errormsg = "Please enter a valid ";
                }
                $(this).after('<span class="errorValidate" style="display:block;" id="errormsg_' + $(this).attr('id') + '">' + errormsg + $(this).attr('title') + ' </span>');
            }
        }

        //for special character validation
        if ($(this).attr('class') != null && $(this).attr('class').indexOf("specialchar") >= 0 && !isSpecialCharacterFolder(this.value) && this.value != "") {

            $("#" + $(this).attr('id')).addClass('error');
            isvalid = false;
            if ($(this).attr('title') != null) {
                $("#errormsg_" + $(this).attr('id') + "").remove();
                var errormsg = "";
                if ($(this).prop('type') == "text") {
                    errormsg = "Special characters !@$^~`()-_=[];',*|\":<>/?#\\%.&+/{}. are not allowed in ";
                }

                $(this).after('<span class="errorValidate" style="display:block;" id="errormsg_' + $(this).attr('id') + '">' + errormsg + $(this).attr('title') + ' </span>');
            }
        }

        //Sridhar
        //for special character validation - contract relationship
        if ($(this).attr('class') != null && $(this).attr('class').indexOf("ConRel") >= 0 && !isSpecialCharacterFolderCR(this.value) && this.value != "") {

            $("#" + $(this).attr('id')).addClass('error');
            isvalid = false;
            $("#errormsg_" + $(this).attr('id') + "").remove();
            var errormsg = "";
            if ($(this).prop('type') == "text") {
                errormsg = "Special characters !@$^~`()_=[];',*|\":<>?#\\%.&+{}. are not allowed in ";
            }

            $(this).after('<span class="errorValidate" style="display:block;" id="errormsg_' + $(this).attr('id') + '">' + errormsg + $(this).attr('name') + ' </span>');

        }
        //Sridhar

        //for file name special character validate
        if ($(this).attr('class') != null && $(this).attr('class').indexOf("filecorevo") >= 0 && !isSpecialCharacterFileName(this.value) && this.value != "") {
            $("#" + $(this).attr('id')).addClass('error');
            isvalid = false;
            if ($(this).attr('title') != null) {
                $("#errormsg_" + $(this).attr('id') + "").remove();
                var errormsg = "";
                if ($(this).prop('type') == "text") {
                    //errormsg = "Special characters /:*\\?\"<>|#%. are not allowed in ";
                    // For Brookfield allow dot in filename
                    errormsg = "Special characters *|~\":<>/?#\\%&+ are not allowed in ";
                    // For Brookfield allow dot in filename
                }

                $(this).after('<span class="errorValidate" style="display:block;" id="errormsg_' + $(this).attr('id') + '">' + errormsg + $(this).attr('title') + ' </span>');
            }
        }

        //for email validation number
        if ($(this).attr('class') != null && $(this).attr('class').indexOf("choicevaluevalidate") >= 0 && !isChoiceValueValidate(this.value) && this.value != "") {
            $("#" + $(this).attr('id')).addClass('error');
            isvalid = false;
            if ($(this).attr('title') != null) {
                $("#errormsg_" + $(this).attr('id') + "").remove();
                var errormsg = "";
                if ($(this).prop('type') == "textarea") {
                    errormsg = "Length should not exceed 50 characters in ";
                }
                $(this).after('<span class="errorValidate" style="display:block;" id="errormsg_' + $(this).attr('id') + '">' + errormsg + $(this).attr('title') + ' </span>');
            }
        }

        //*Harshitha Validate the NicEdit textarea
        if (($(this).attr('class') != null && $(this).attr('class').indexOf("validNicEdit") >= 0)) {

            var nicE = new nicEditors.findEditor(this.id);
            var question = nicE.getContent();
            var ifonlySpace = nicE.getContent().replace(/<div>|<br>|&nbsp;|<\/div>|<p>|<\/p>/gi, '').trim()  // ENH475 - validation if only space is present  Support for all browser
            if ($.trim(question).length == 0 || question == '<br>' || question == '<BR>' || ifonlySpace == "" || ifonlySpace == null) {
                $("#" + $(this).attr('id')).parent().children('div:eq(1)').addClass('error');
                if ($(this).parent().parent().attr("style") == "display: none;" || $(this).parent().parent().attr("style") == "display:none;") {

                } else {
                    isvalid = false;
                }

                if ($(this).attr('title') != null && (showMsg == true)) {
                    $("#errormsg_" + $(this).attr('id') + "").remove();
                    var errormsg = "";
                    if ($(this).prop('type') == "text" && (showMsg == true)) {
                        errormsg = "Please enter ";
                    }

                    $(this).after('<span class="errorValidate" style="display:block;" id="errormsg_' + $(this).attr('id') + '">' + errormsg + $(this).attr('title') + ' </span>');
                }
            }
            //event.preventDefault();
        }

        //for string starts with alphabets
        if ($(this).attr('class') != null && $(this).attr('class').indexOf("startswithalphabets") >= 0 && !isStartsWithAlphabets(this.value) && this.value != "") {
            $("#" + $(this).attr('id')).addClass('error');
            isvalid = false;
            if ($(this).attr('title') != null) {
                $("#errormsg_" + $(this).attr('id') + "").remove();
                var errormsg = "";
                if ($(this).prop('type') == "text") {
                    errormsg = " should start by an alphabet.";
                }
                $(this).after('<span class="errorValidate" style="display:block;" id="errormsg_' + $(this).attr('id') + '">' + $(this).attr('title') + errormsg + ' </span>');
            }
        }

        //for string should contain minimum 5 alphabets
        if ($(this).attr('class') != null && $(this).attr('class').indexOf("validtitle") >= 0 && this.value != "" && !isContainsTwoAlphabets(this.value)) {
            $("#" + $(this).attr('id')).addClass('error');
            isvalid = false;
            $("#errormsg_" + $(this).attr('id') + "").remove();
            var errormsg = "";
            if ($(this).prop('type') == "text") {
                errormsg = "Should have a minimum of 2 alphabets.";
            }
            $(this).after('<span class="errorValidate" style="display:block;" id="errormsg_' + $(this).attr('id') + '">' + errormsg + ' </span>');
        }
        //for Business Area name should not contain , ; and ~
        if ($(this).attr('class') != null && $(this).attr('class').indexOf("validbusinessareaname") >= 0 && this.value != "" && !isSpecialCharacterBusinessAreaName(this.value)) {
            $("#" + $(this).attr('id')).addClass('error');
            isvalid = false;
            if ($(this).attr('title') != null) {
                $("#errormsg_" + $(this).attr('id') + "").remove();
                var errormsg = "";
                if ($(this).prop('type') == "text") {
                    //errormsg = "Special characters /:*\\?\"<>|#%. are not allowed in ";
                    // For Brookfield allow dot in filename
                    errormsg = "Special characters ~ , ; are not allowed in ";
                    // For Brookfield allow dot in filename
                }

                $(this).after('<span class="errorValidate" style="display:block;" id="errormsg_' + $(this).attr('id') + '">' + errormsg + $(this).attr('title') + ' </span>');
            }
        }


        //for File name should not be greater than 100
        if ($(this).attr('class') != null && $(this).attr('class').indexOf("validfilename") >= 0 && this.value != "") {
            var values = this.value.split('\\');
            var inputStr = values[values.length - 1];
            if (inputStr.length > 100) {
                $("#" + $(this).attr('id')).addClass('error');
                isvalid = false;
                $("#errormsg_" + $(this).attr('id') + "").remove();
                var errormsg = "";
                errormsg = "File name should not be greater than 100 characters.";
                $(this).after('<span class="errorValidate" style="display:block;" id="errormsg_' + $(this).attr('id') + '">' + errormsg + ' </span>');
            }
        }

        //contract value should not be less than 0
        if ($(this).attr('class') != null && $(this).attr('class').indexOf("validcontractvalue") >= 0 && (parseInt(this.value) < 0 && this.value != "")) {
            $("#" + $(this).attr('id')).addClass('error');
            isvalid = false;
            if ($(this).attr('title') != null) {
                $("#errormsg_" + $(this).attr('id') + "").remove();
                var errormsg = "";
                if ($(this).prop('type') == "text") {
                    errormsg = "Please enter a valid";
                }
                $(this).after('<span class="errorValidate" style="display:block;" id="errormsg_' + $(this).attr('id') + '">' + errormsg + " " + $(this).attr('title') + ' </span>');
            }
        }

        //TextBoxContain Minimum 2 character
        if ($(this).attr('class') != null && $(this).attr('class').indexOf("validIsMinTwoLetter") >= 0 && this.value != "" && !isContainsTwoLetters(this.value)) {
            $("#" + $(this).attr('id')).addClass('error');
            isvalid = false;
            $("#errormsg_" + $(this).attr('id') + "").remove();
            var errormsg = "";
            if ($(this).prop('type') == "text" || $(this).prop('type') == "textarea") {
                errormsg = "Should have a minimum of 2 characters.";
            }
            $(this).after('<span class="errorValidate" style="display:block;" id="errormsg_' + $(this).attr('id') + '">' + errormsg + ' </span>');
        }

        //manoj
        //for hyperlink
        if ($(this).attr('class') != null && $(this).attr('class').indexOf("validwebsite") >= 0 && this.value != "" && !isvalidwebsite(this.value)) {
            $("#" + $(this).attr('id')).addClass('error');
            isvalid = false;
            $("#errormsg_" + $(this).attr('id') + "").remove();
            var errormsg = "";
            if ($(this).prop('type') == "text" || $(this).prop('type') == "textarea") {
                errormsg = "Please enter a valid URL(eg:http://www.abc.com)";
            }
            $(this).after('<span class="errorValidate" style="display:block;" id="errormsg_' + $(this).attr('id') + '">' + errormsg + ' </span>');
        }
        //for hyperlink
        //manoj


        $("#" + $(this).attr('id')).focusout(function () {
            if (this.value != "") {
                if ($("#" + $(this).attr('id')).hasClass('validuser')) {
                    $("#" + $(this).attr('id')).parent('div').removeClass('error');
                }
                else if ($("#" + $(this).attr('id')).hasClass('validmultiselect')) {
                    $(this).parent().children('div').children('ul').removeClass('error');
                }
                else {
                    $("#" + $(this).attr('id')).removeClass('error');
                }
            }
            $("#errormsg_" + $(this).attr('id') + "").remove();
        });
    });
    return isvalid;
}

function isValidNumSpecAlpha(inputtxt) {
    var Special = /^[0-9a-zA-Z]+$/;
    var char = /[a-zA-Z]+/;
    if (Special.test(inputtxt)) {
        var numbers = /^[0-9]+$/;
        if (numbers.test(inputtxt)) {
            return false;
        }
        else {
            return true;
        }
    }
    else {
        if (char.test(inputtxt))
            return true;
        else
            return false;
    }

}
function isValidEmail(txtvalue) {
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.){1,2}))([a-zA-Z]{2,13}|[0-9]{1,3})(\]?)$/;
    if (filter.test(txtvalue)) {
        return true;
    }
    else {
        return false;
    }
}

function isValidNumber(txtvalue) {
    var filter = /^[0-9]+$/;
    if (filter.test(txtvalue)) {
        return true;
    }
    else {
        return false;
    }
}

function isStartsWithAlphabets(txtvalue) {
    var filter = /^[a-zA-Z].*$/;
    if (filter.test(txtvalue)) {
        return true;
    }
    else {
        return false;
    }
}

function isContainsFiveAlphabets(txtvalue) {
    if (txtvalue.replace(/[^a-zA-Z]/g, "").length > 4) {
        return true;
    }
    else {
        return false;
    }
}

function isContainsThreeAlphabets(txtvalue) {
    if (txtvalue.replace(/[^a-zA-Z]/g, "").length > 2) {
        return true;
    }
    else {
        return false;
    }
}

function isContainsTwoLetters(txtvalue) {
    if (txtvalue.length > 1) {
        return true;
    }
    else {
        return false;
    }
}


//manoj
//for hyperlink
function isvalidwebsite(txtvalue) {
    //var re = /^(www\.)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
    var re = /^(http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i
    //var re = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
    if (re.test(txtvalue)) {
        return true;
    } else {
        return false;
    }
}
//for hyperlink
//manoj

function isContainsTwoAlphabets(txtvalue) {
    if (txtvalue.replace(/[^a-zA-Z]/g, "").length > 1) {
        return true;
    }
    else {
        return false;
    }
}

function removeValidations(formID) {
    $.each($('input, select ,textarea', '#' + formID), function (k) {

        if (($(this).attr('class') != null && $(this).attr('class').indexOf("validelement") >= 0 && this.value == "") || ($(this).prop('type') == "select-one" && $(this).attr('class') != null && $(this).attr('class').indexOf("validelement") >= 0 && this.value == "0")) {
            $("#" + $(this).attr('id')).removeClass('error');
        }
        else if (($(this).attr('class') != null && $(this).attr('class').indexOf("validmultiselect") >= 0 && this.value == "")) {
            $(this).parent().children('div').children('ul').removeClass('error');
        }

    });

    $(".errorValidate").css("display", "none");
}

//returns false if firstDateControlID is greaterthan secondDateControlID
//returns true if secondDateControlID is greaterthan firstDateControlID
function comparedates(firstDateControlID, secondDateControlID, errormessage) {
    var isvalid = true;
    if ($("#" + firstDateControlID).val() != null && $("#" + firstDateControlID).val() != '' &&
        $("#" + secondDateControlID).val() != null && $("#" + secondDateControlID).val() != '') {

        var dt1 = new Date($.datepicker.formatDate('mm/dd/yy', $("#" + firstDateControlID).datepicker('getDate')));
        var dt2 = new Date($.datepicker.formatDate('mm/dd/yy', $("#" + secondDateControlID).datepicker('getDate')));

        //var dt1 = new Date($("#" + firstDateControlID).val());
        //var dt2 = new Date($("#" + secondDateControlID).val());

        var dateOne = new Date(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()); //Year, Month, Date
        var dateTwo = new Date(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()); //Year, Month, Date

        if (dateOne > dateTwo) {
            // $("#" + firstDateControlID).addClass('error');
            $("#" + secondDateControlID).addClass('error');

            if ($("#errormsg_" + secondDateControlID + "").val() != null) {
                $("#errormsg_" + secondDateControlID + "").remove();
            }
            $("#" + secondDateControlID).after('<span class="errorValidate" style="display:block;" id="errormsg_' + secondDateControlID + '">' + errormessage + ' </span>');
            isvalid = false;
        } else {
            isvalid = true;
        }
    }
    return isvalid;
}

function comparedates(firstDateControlID, secondDateControlID) {
    var isvalid = true;

    if ($("#" + firstDateControlID).val() != null && $("#" + firstDateControlID).val() != '' &&
        $("#" + secondDateControlID).val() != null && $("#" + secondDateControlID).val() != '') {



        var dt1 = new Date($.datepicker.formatDate('mm/dd/yy', $("#" + firstDateControlID).datepicker('getDate')));
        var dt2 = new Date($.datepicker.formatDate('mm/dd/yy', $("#" + secondDateControlID).datepicker('getDate')));


        //var dt1 = new Date($("#" + firstDateControlID).val());
        //var dt2 = new Date($("#" + secondDateControlID).val());


        var dateOne = new Date(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()); //Year, Month, Date
        var dateTwo = new Date(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()); //Year, Month, Date

        if (dateOne >= dateTwo) {
            isvalid = false;
        } else {
            isvalid = true;
        }
    }
    return isvalid;
}
//returns true if Date is greaterthan Today
function dategreaterthanequaltoday(firstDateControlID) {
    var isvalid = true;
    if ($("#" + firstDateControlID).val() != null && $("#" + firstDateControlID).val() != '') {
        var dt1 = new Date($.datepicker.formatDate('mm/dd/yy', $("#" + firstDateControlID).datepicker('getDate')));
        //var dt1 = new Date($("#" + firstDateControlID).val());

        var dt2 = new Date();

        var dateOne = new Date(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()); //Year, Month, Date
        var dateTwo = new Date(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()); //Year, Month, Date

        if (dateOne >= dateTwo) {
            isvalid = true;
        } else {
            isvalid = false;
        }
    }
    return isvalid;
}
function isValidDate(dateStr) {
    if (localStorage.AppDateFormat == null || localStorage.AppDateFormat == "" || localStorage.AppDateFormat == 'undefined') {
        // Checks for the following valid date formats:
        // MM/DD/YY   MM/DD/YYYY   MM-DD-YY   MM-DD-YYYY
        // Also separates date into month, day, and year variables

        var datePat = /^(\d{1,2})(\/|-)(\d{1,2})\2(\d{2}|\d{4})$/;

        // To require a 4 digit year entry, use this line instead:
        // var datePat = /^(\d{1,2})(\/|-)(\d{1,2})\2(\d{4})$/;

        var matchArray = dateStr.match(datePat); // is the format ok?
        if (matchArray == null) {
            //alert("Date is not in a valid format.")
            return false;
        }
        month = matchArray[1]; // parse date into variables
        day = matchArray[3];
        year = matchArray[4];
        if (month < 1 || month > 12) { // check month range
            //alert("Month must be between 1 and 12.");
            return false;
        }
        if (day < 1 || day > 31) {
            //alert("Day must be between 1 and 31.");
            return false;
        }
        if ((month == 4 || month == 6 || month == 9 || month == 11) && day == 31) {
            //alert("Month " + month + " doesn't have 31 days!")
            return false
        }
        if (month == 2) { // check for february 29th
            var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
            if (day > 29 || (day == 29 && !isleap)) {
                //alert("February " + year + " doesn't have " + day + " days!");
                return false;
            }
        }
        return true;  // date is valid
    }
    else {
        if (localStorage.AppDateFormat == "DD/MM/YYYY") {
            if (dateStr != "" && dateStr != "Invalid date") {
                var dtCh = "/";
                var daysInMonth = DaysArray(12)
                var pos1 = dateStr.indexOf(dtCh)
                var pos2 = dateStr.indexOf(dtCh, pos1 + 1)
                var strDay = dateStr.substring(0, pos1)
                var strMonth = dateStr.substring(pos1 + 1, pos2)
                var strYear = dateStr.substring(pos2 + 1)
                strYr = strYear
                if (strDay.charAt(0) == "0" && strDay.length > 1) strDay = strDay.substring(1)
                if (strMonth.charAt(0) == "0" && strMonth.length > 1) strMonth = strMonth.substring(1)
                for (var i = 1; i <= 3; i++) {
                    if (strYr.charAt(0) == "0" && strYr.length > 1) strYr = strYr.substring(1)
                }
                month = parseInt(strMonth)
                day = parseInt(strDay)
                year = parseInt(strYr)
                if (pos1 == -1 || pos2 == -1) {
                    // alert("The date format should be : dd/mm/yyyy")
                    return false
                }
                if (strMonth.length < 1 || month < 1 || month > 12) {
                    //alert("Please enter a valid month")
                    return false
                }
                if (strDay.length < 1 || day < 1 || day > 31 || (month == 2 && day > daysInFebruary(year)) || day > daysInMonth[month]) {
                    // alert("Please enter a valid day")
                    return false
                }
                // if (strYear.length != 4 || year == 0 || year < 1900 || year > maxYear) {

                if (strYear.length != 4 || year == 0 || year < 1900) {

                    // alert("Please enter a valid 4 digit year between " + minYear + " and " + maxYear)
                    return false
                }
                if (dateStr.indexOf(dtCh, pos2 + 1) != -1 || isInteger(stripCharsInBag(dateStr, dtCh)) == false) {
                    // alert("Please enter a valid date")
                    return false
                }
            }
            return true
        }
        else if (localStorage.AppDateFormat == "MM/DD/YYYY") {
            // Checks for the following valid date formats:
            // MM/DD/YY   MM/DD/YYYY   MM-DD-YY   MM-DD-YYYY
            // Also separates date into month, day, and year variables

            var datePat = /^(\d{1,2})(\/|-)(\d{1,2})\2(\d{2}|\d{4})$/;

            // To require a 4 digit year entry, use this line instead:
            // var datePat = /^(\d{1,2})(\/|-)(\d{1,2})\2(\d{4})$/;

            var matchArray = dateStr.match(datePat); // is the format ok?
            if (matchArray == null) {
                //alert("Date is not in a valid format.")
                return false;
            }
            month = matchArray[1]; // parse date into variables
            day = matchArray[3];
            year = matchArray[4];
            if (month < 1 || month > 12) { // check month range
                //alert("Month must be between 1 and 12.");
                return false;
            }
            if (day < 1 || day > 31) {
                //alert("Day must be between 1 and 31.");
                return false;
            }
            if ((month == 4 || month == 6 || month == 9 || month == 11) && day == 31) {
                //alert("Month " + month + " doesn't have 31 days!")
                return false
            }
            if (month == 2) { // check for february 29th
                var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
                if (day > 29 || (day == 29 && !isleap)) {
                    //alert("February " + year + " doesn't have " + day + " days!");
                    return false;
                }
            }
            return true;  // date is valid
        }
    }

}
function stripCharsInBag(s, bag) {
    var i;
    var returnString = "";
    // Search through string's characters one by one.
    // If character is not in bag, append to returnString.
    for (i = 0; i < s.length; i++) {
        var c = s.charAt(i);
        if (bag.indexOf(c) == -1) returnString += c;
    }
    return returnString;
}

function daysInFebruary(year) {
    // February has 29 days in any year evenly divisible by four,
    // EXCEPT for centurial years which are not also divisible by 400.
    return (((year % 4 == 0) && ((!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28);
}
function DaysArray(n) {
    for (var i = 1; i <= n; i++) {
        this[i] = 31
        if (i == 4 || i == 6 || i == 9 || i == 11) { this[i] = 30 }
        if (i == 2) { this[i] = 29 }
    }
    return this
}

function isInteger(s) {
    var i;
    for (i = 0; i < s.length; i++) {
        // Check that current character is number.
        var c = s.charAt(i);
        if (((c < "0") || (c > "9"))) return false;
    }
    // All characters are numbers.
    return true;
}

function isSpecialCharacter(obj) {
    var splChars = "*|,\":<>[]{}`\';()@&$#%-/?";
    for (var i = 0; i < obj.length; i++) {
        if (splChars.indexOf(obj.charAt(i)) != -1) {
            return false;
        }
    }
    return true;
}

function isSpecialCharacterFolder(obj) {
    var values = obj.split('\\');
    var splChars = "!@$^~`()-_=[];',*|\":<>/?#\\%.&+/{}.";
    for (var i = 0; i < values.length; i++) {
        for (var j = 0; j < values[i].length; j++) {
            if (splChars.indexOf(values[i].charAt(j)) != -1) {
                return false;
            }
        }
    }
    return true;
}
//Sridhar
function isSpecialCharacterFolderCR(obj) {
    var values = obj.split('\\');
    var splChars = "!@$^~`()_=[];',*|\":<>?#\\%.&+{}.";
    for (var i = 0; i < values.length; i++) {
        for (var j = 0; j < values[i].length; j++) {
            if (splChars.indexOf(values[i].charAt(j)) != -1) {
                return false;
            }
        }
    }
    return true;
}

function isSpecialCharacterBusinessAreaName(obj) {
    var values = obj.split('\\');
    var splChars = "~;,";
    for (var i = 0; i < values.length; i++) {
        for (var j = 0; j < values[i].length; j++) {
            if (splChars.indexOf(values[i].charAt(j)) != -1) {
                return false;
            }
        }
    }
    return true;
}

function isSpecialCharacterFileName(obj) {
    //var splChars = "*|\":<>/?#\\%.";
    // For Brookfield allow dot in filename and restrict ~
    //manoj
    //var splChars = "*|~\":<>/?#\\%";
    var splChars = "*|~\":<>/?#\\%&+";
    //manoj
    for (var i = 0; i < obj.length; i++) {
        if (splChars.indexOf(obj.charAt(i)) != -1) {
            return false;
        }
    }
    return true;
}


function isChoiceValueValidate(obj) {
    var arrvalues = obj.split('\n').sort();
    arrvalues = arrvalues.filter(function (e) { return e });
    return arrvalues.every(function (element) {
        return element.length <= 50;
    });
}

//Allow only numeric values in input box
function allowOnlyNumericInInputBox(controlid) {
    $('#' + controlid).keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
            // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
}

//Allow only number values in input box
function allowOnlyNumberInInputBox(controlid) {
    $('#' + controlid).keydown(function (e) {
        // Allow: backspace, delete, tab, escape and enter
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13]) !== -1 ||
            // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
            // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
        if (typeof ($(this)[0].value) != "undefined" && $(this)[0].value != null) {
            if ($(this)[0].value.length > 20) {
                e.preventDefault();
            }
        }

    });
}

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

function DiffBetDate(fromdate, todate) {
    var vResult = '';
    if (fromdate != "" && todate != "") {
        var From_date = new Date(fromdate);
        var To_date = new Date(todate);
        var diff_date = To_date - From_date;
        var years = Math.floor(diff_date / 31536000000);
        //var months = Math.floor((diff_date % 31536000000) / 2628000000);
        //var days = Math.floor(((diff_date % 31536000000) % 2628000000) / 86400000);
        var days = Math.ceil((diff_date % 31536000000) / 86400000);
        if (years > 0)
            vResult = years + " year(s)";

        if (days > 0) {
            if (vResult == '')
                vResult = days + " day(s)";
            else
                vResult += " and " + days + " day(s)";
        }
    }


    return vResult;
}

function isValidTitle(inputtxt) {
    var Special = /^[0-9a-zA-Z]+$/;
    var char = /[a-zA-Z]+/;
    if (inputStr.length < 5)
        return false;
    else
        return true;
}
function isValidNumberic(txtvalue) {
    var filter = /^[0-9]*(\.[0-9]+)?$/;
    if (filter.test(txtvalue)) {
        return true;
    }
    else {
        return false;
    }
}

function isBackSlashKey(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode != 92) { //If you want allow back space than check it (charcode === 92 || charcode === 8)
        return true;
    }
    return false;
}

function CleanWordFormatFromHTML(input) {
    // Word comments like conditional comments etc
    var content = input.replace(/<!--[\s\S]+?-->/gi, '');

    // Remove comments, scripts (e.g., msoShowComment), XML tag, VML content,
    // MS Office namespaced tags, and a few other tags
    content = content.replace(/<(!|script[^>]*>.*?<\/script(?=[>\s])|\/?(\?xml(:\w+)?|img|meta|link|style|\w:\w+)(?=[\s\/>]))[^>]*>/gi, '');

    // Convert <s> into <strike> for line-though
    content = content.replace(/<(\/?)s>/gi, "<$1strike>");

    // Replace nbsp entites to char since it's easier to handle
    //content = content.replace(/&nbsp;/gi, "\u00a0");
    content = content.replace(/&nbsp;/gi, ' ');

    // Convert <span style="mso-spacerun:yes">___</span> to string of alternating
    // breaking/non-breaking spaces of same length
    content = content.replace(/<span\s+style\s*=\s*"\s*mso-spacerun\s*:\s*yes\s*;?\s*"\s*>([\s\u00a0]*)<\/span>/gi, function (str, spaces) {
        return (spaces.length > 0) ? spaces.replace(/./, " ").slice(Math.floor(spaces.length / 2)).split("").join("\u00a0") : '';
    });
    return content;
}

//Allow Decimal Number value in input Textbox
function allowOnlyDecimalNumberInInputBox(controlid) {
    $('#' + controlid).keydown(function (e) {
        // Allow: backspace, delete, tab, escape and enter       
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13]) !== -1 ||
            // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
            // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }

        // Ensure that it is a decimal number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            if (e.keyCode == 110 || (e.keyCode == 190 && e.key != ">")) {
                if (typeof ($('#' + controlid)[0].value) != "undefined" && $('#' + controlid)[0].value != null) {
                    if ($('#' + controlid)[0].value.split('.').length == 1) {
                        return true;
                    }
                }
            }
            e.preventDefault();
        }

        if (typeof ($(this)[0].value) != "undefined" && $(this)[0].value != null) {
            if ($(this)[0].value.length > 20) {
                e.preventDefault();
            }
        }
        if (typeof ($(this)[0].value) != "undefined" && $(this)[0].value != null) {
            var num = $(this)[0].value.split('.');
            if (num.length > 1) {
                var index = $(this)[0].value.indexOf('.');
                var CharAfterdot = ($(this)[0].value.length + 1) - index;
                if (CharAfterdot > 5) {
                    return false;
                }
            }
        }
    });
}


function isGreaterThanZero(txtvalue) {
    var filter = /^[0-9]+$/;
    if (filter.test(txtvalue)) {
        var fval = parseFloat(txtvalue);
        return (parseFloat(txtvalue) > 0);
    }
    else {
        return false;
    }
}