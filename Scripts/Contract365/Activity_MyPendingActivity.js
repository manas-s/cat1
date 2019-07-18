$(document).ready(function () {
    localStorage.setItem("GlobalBusinessArea", "All");
    localStorage.setItem("GlobalBusinessAreaLocation", "All");
    localStorage.setItem("IsGeneralBusinessArea", "");
    if (typeof localStorage.eContractFeatures === "undefined")
        GetFeatures();
    if (typeof localStorage.AppAccountStatus === "undefined")
        GetAccountStatus();
    if (typeof localStorage.AppDateFormat === "undefined")
        GetApplicationDateFormat();
	CreateTodoList();

});
function CreateTodoList() {
    $("#todoList").html('');
	var action = 'Activity';
	$.ajax({
	    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Workflow/tasks?assignto=' + localStorage.UserName + '&status=In Progress&pageSize=5&startIndex=1',
		type: 'GET',
		dataType: 'json',
		headers: { 'eContracts-ApiKey': localStorage.APIKey },
		cache: false,
		success: function (data) {
			if (data.length == 0) {
			    $("#todoList").append('<p class="f_p-error">No items found.</p>');
			}
			else {
			    var datalenght = data.length;
			    for (var i = 0; i < datalenght; i++) {
			        var item = data[i];
			        var sTaskTitle = item.TaskTitle;
					var sRowKey = item.RowKey;
					var sInitiator = item.Initiator;
					var sDuedate = '';

					if (typeof item.DueDate != 'undefined' && item.DueDate != null) {
					    sDuedate = moment(new Date(item.DueDate)).format('MM/DD/YYYY');
					}
					var article = '<tr>';
					article += '<td class="text"><a href="/Activity/TaskDetails?TaskID=' + sRowKey + '&WorkflowID=' + item.WorkflowID + '" target="_blank">' + sTaskTitle + '</a></td>';
					article += '<td class="text">' + sInitiator + '</td>';
					article += '<td class="text">' + sDuedate + '</td>';
					article += '</tr>';

					$("#todoList").append(article);
				}
			}
		},
		error: function () {
		    $("#todoList").append('<p class="f_p-error">No items found.</p>');
		}
	});
}


function GetAccountStatus() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/LicenseLimit',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        async: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (entity) {
            localStorage.AppAccountStatus = entity.Status;
        }
    });
}

function GetApplicationDateFormat() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/AccountSetting',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        //async: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            localStorage.AppDateFormat = data.DateFormat;
        },
        error: function (data) {
            localStorage.AppDateFormat = "MM/DD/YYYY";
        }
    });
}

function GetFeatures() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/feature',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        //async: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            localStorage.setItem("eContractFeatures", JSON.stringify(data));
            var vAccFeat = $.grep(data, function (n, i) {
                return (n.RowKey == "29" && n.Status == "ON");
            });
            if (vAccFeat.length > 0) {
                if (typeof localStorage.CompanyBrandingLogo === "undefined") {
                    $.ajax({
                        url: '/Accounts/GetAccountSetting?accountid=' + localStorage.AccountID,
                        type: 'GET',
                        dataType: 'json',
                        cache: false,
                        success: function (AccountSetting) {
                            if (AccountSetting.CompanyLogo != "") {
                                localStorage.setItem("CompanyBrandingLogo", AccountSetting.CompanyLogo);
                                $(".FL_CompanyBrandingLogo").attr("src", AccountSetting.CompanyLogo);
                                $(".FL_CompanyBrandingLogo").css('display', '');
                            }
                            else {
                                $(".FL_CompanyBrandingLogo").css('display', '');
                                localStorage.setItem("CompanyBrandingLogo", '/Content/Images/logo.png');
                            }
                        }
                    });
                }
                else {
                    if (localStorage.CompanyBrandingLogo != "/Content/Images/logo.png") {
                        $(".FL_CompanyBrandingLogo").attr("src", localStorage.CompanyBrandingLogo);
                        $(".FL_CompanyBrandingLogo").css('display', '');
                    }
                    else {
                        $(".FL_CompanyBrandingLogo").css('display', '');
                    }

                }
            }
            else {
                $(".FL_CompanyBrandingLogo").css('display', '');
            }

        },
        error: function (data) {
            var vvvv = "";
        }
    });
}