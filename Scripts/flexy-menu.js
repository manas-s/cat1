
jQuery.fn.flexymenu = function(options){
	var settings = {
		 speed	 			: 300     				// dropdown speed (ms)
		,type	 			: "horizontal"    		// menu type arrangement
		,align	 			: "left"  				// menu alignment
		,indicator	 		: false     			// indicator that indicates a submenu
		,hideClickOut		: true     				// hide submenus when click outside menu
	}
	jQuery.extend( settings, options );
	
	var bigScreen = false;
	var menu = jQuery(this);
	var lastScreenWidth = window.innerWidth;
	
	if(settings.type == "vertical"){
		jQuery(menu).addClass("vertical");
		if(settings.align == "right"){
			jQuery(menu).addClass("right");
		}
	}
	
	if(settings.indicator == true){
		jQuery(menu).find("li").each(function(){
			if(jQuery(this).children("ul").length > 0){
				jQuery(this).append("<span class='indicator'>+</span>");
			}
		});
	}
	jQuery(menu).prepend("<li class='showhide'><span class='title'>MENU</span><span class='icon'><em></em><em></em><em></em><em></em></span></li>");
	
	screenSize();
	
	jQuery(window).resize(function() {
		if(lastScreenWidth <= 768 && window.innerWidth > 768){
			unbindEvents();
			hideCollapse();
			bindHover();
			if(settings.type == "horizontal" && settings.align == "right" && bigScreen == false){
				rightAlignMenu();
				bigScreen = true;
			}
		}
		if(lastScreenWidth > 768 && window.innerWidth <= 768){
			unbindEvents();
			showCollapse();
			bindClick();
			if(bigScreen == true){
				rightAlignMenu();
				bigScreen = false;
			}
		}
		lastScreenWidth = window.innerWidth;
	});
	
	function screenSize(){
		if(window.innerWidth <= 768){
			showCollapse();
			bindClick();
			if(bigScreen == true){
				rightAlignMenu();
				bigScreen = false;
			}
		}
		else{
			hideCollapse();
			bindHover();
			if(settings.type == "horizontal" && settings.align == "right" && bigScreen == false){
				rightAlignMenu();
				bigScreen = true;
			}
		}
	}
	
	function bindHover(){
		if (navigator.userAgent.match(/Mobi/i) || window.navigator.msMaxTouchPoints > 0){						
			jQuery(menu).find("a").on("click touchstart", function(e){
				e.stopPropagation(); 
				e.preventDefault();
				window.location.href = jQuery(this).attr("href");
				jQuery(this).parent("li").siblings("li").find("ul").stop(true, true).fadeOut(settings.speed);
				if(jQuery(this).siblings("ul").css("display") == "none"){
					jQuery(this).siblings("ul").stop(true, true).fadeIn(settings.speed);
				}
				else{
					jQuery(this).siblings("ul").stop(true, true).fadeOut(settings.speed);
					jQuery(this).siblings("ul").find("ul").stop(true, true).fadeOut(settings.speed);
				}
			});
			
			if(settings.hideClickOut == true){
				jQuery(document).bind("click.menu touchstart.menu", function(ev){
					if(jQuery(ev.target).closest(menu).length == 0){
						jQuery(menu).find("ul").fadeOut(settings.speed);
					}
				});
			}
		}
		else{
			jQuery(menu).find("li").bind("mouseenter", function(){
				jQuery(this).children("ul").stop(true, true).fadeIn(settings.speed);
			}).bind("mouseleave", function(){
				jQuery(this).children("ul").stop(true, true).fadeOut(settings.speed);
			});
		}
	}
	
	function bindClick(){
		jQuery(menu).find("li:not(.showhide)").each(function(){
			if(jQuery(this).children("ul").length > 0){
				jQuery(this).children("a").on("click", function(){
					if(jQuery(this).siblings("ul").css("display") == "none"){
						jQuery(this).siblings("ul").slideDown(settings.speed);
					}
					else{
						jQuery(this).siblings("ul").slideUp(settings.speed);
					}
				});
			}
		});
	}
	
	function showCollapse(){
		jQuery(menu).children("li:not(.showhide)").hide(0);
		jQuery(menu).children("li.showhide").show(0).bind("click", function(){
			if(jQuery(menu).children("li").is(":hidden")){
				jQuery(menu).children("li").slideDown(settings.speed);
			}
			else{
				jQuery(menu).children("li:not(.showhide)").slideUp(settings.speed);
				jQuery(menu).children("li.showhide").show(0);
			}
		});
	}
	
	function hideCollapse(){
		jQuery(menu).children("li").show(0);
		jQuery(menu).children("li.showhide").hide(0);
	}	
	
	function rightAlignMenu() {
		jQuery(menu).children("li").addClass("right");
		var menuItems = jQuery(menu).children("li");
		jQuery(menu).children("li:not(.showhide)").detach();
		for(var i = menuItems.length; i >= 1; i--){
			jQuery(menu).append(menuItems[i]);
		}		
	}
	
	function unbindEvents(){
		jQuery(menu).find("li, a").unbind();
		jQuery(document).unbind("click.menu touchstart.menu");
		jQuery(menu).find("ul").hide(0);
	}
}
