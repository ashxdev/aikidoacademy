/* -------------------------------------------------------------------------------- /
	
	imbus - Simple HTML Template v1.0
	Created by Granth (http://themeforest.net/user/Granth)
	v1.0 - 13.06.2013
	All rights reserved.
	web: http://www.granthweb.com
	twitter: http://twitter.com/#!/granthweb
	
	+----------------------------------------------------+
		TABLE OF CONTENTS
	+----------------------------------------------------+
	
	[1] CUSTOM PLUGINS
	[1.1] gwScrollTo
	[2] SETUP & COMMON
	[3] NAVIGATION
	[4] MENU SLIDING EFFECT - LAVALAMP PLUGIN	
	[5] CONTENT ELEMENTS - ALERTS, TABS, TOGGLES, PROGRESS
	[6] PORTFOLIO - ISOTOPE PLUGIN
	[7] SLIDERS
	[8]	TOP FOOTER TICKER
	[9] CONTACT FORM
	[10] GOOGLE MAP - GOMAP PLUGIN
	[11] SLIDER REVOLUTION
	
/ -------------------------------------------------------------------------------- */

/* add 'js-on' class to 'html' element */
var htmlClasses=(document.documentElement.className).split(' ');
htmlClasses.push('js-on');
document.documentElement.className = htmlClasses.join(' ').replace(/^\s+|\s+$/g, '');

(function($, undefined) {

	/* -------------------------------------------------------------------------------- /
		[1] CUSTOM PLUGINS
	/ -------------------------------------------------------------------------------- */	

	/* -------------------------------------------------------------------------------- /
		[1.1] gwScrollTo - Scroll to element (v1.0)
		
		@options 
		duration : scroll duration (integer)
		easing : easing type (string / boolean)
		target : target selector (string)
		callback : callback function (function)
		
		@notes
		smaller duration value makes animataion faster,
		easing requires jQuery plugin, if not present becomes false,
	 	fake easing name also becomes false,
		callback function fires when the animation is ready	
		
	/ -------------------------------------------------------------------------------- */	
	
		$.fn.gwScrollTo = function(options) {
			var defaults = {
					'duration'		: 1000,
					'easing'		: 'easeInOutCubic',
					'target'		: '#top',
					'callback' 		: ''
				},
				settings = $.extend({}, defaults, options),
				$obj=this;
					
			settings.easing = jQuery.easing[settings.easing] ? settings.easing : false;
			if ($(settings.target).length) { var offset=$(settings.target).offset(); } else { return false; };
			if($obj.is(':animated') || offset.top == $(window).scrollTop()) { return false; };
			return $obj.animate({
				scrollTop: $(settings.target).offset().top
				}, settings.duration, settings.easing, function() { 
					this.tagName==$obj[0].tagName ? $.isFunction(settings.callback) ? settings.callback.call(this) : false : false; 
				}
			);
		};

})(jQuery);

jQuery.noConflict();
jQuery(document).ready(function($, undefined) {
	
	/* -------------------------------------------------------------------------------- /
		[2] SETUP & COMMON
	/ -------------------------------------------------------------------------------- */	

		var $body=$('body'),
			$wrapper=$body.find('#wrapper'),
			$headerInfo=$body.find('#header-info'),
			$logo=$body.find('#logo'),
			$logoImg=$logo.find('img'),
			$navigation=$body.find('#primary-navigation'),
			$menu=$navigation.find('.menu'),
			$menuResponsive=$navigation.find('.menu-responsive'),
			$headerPanel=$body.find('#header-panel'),
			$bottom=$body.find('#bottom'),
			$footer=$body.find('#footer'),
			$navPlacehoder=$('<div />', { 'id': 'primary-navigation-placholder' }).css({'height':'45px','display':'none'}),
			headerInfoH=$headerInfo.length ? $headerInfo.outerHeight() : 0,		
			logoH=$logo.length ? $logo.height() : 0,
			navigationH=$navigation.length ? $navigation.height() : 0,
			headPanelH=$headerPanel.height ? $headerPanel.height() : 0,
			bottomH=$bottom.height ? $bottom.outerHeight() : 0,
			minLogoPadding=10,
			maxLogoPadding=20,
			headerPanelMarginBottom,
			logoPadding;

		var navOffsetTop = function() {
			return headerInfoH+logoH+minLogoPadding*2;
		}
		
		var mainOffsetTop = function() {
			return navOffsetTop()+navigationH+headPanelH;
		}	
	
		var isHeaderHidden = function() {
			var srollPoint = mainOffsetTop()/3*2;
			if (mainOffsetTop()/3*2<=$(window).scrollTop()) { return true; } else { return false; };
		}
	
		$logoImg.load(function() { logoH=$logo.length ? $logo.height() : 0; });
		if ($body.hasClass('stickymenu')) {$navPlacehoder.insertBefore($navigation); };
	
		setTimeout(function(){ 
			$(window).resize();
			$menu.find('.current > a').trigger('click');
		},10);
		$(window).resize();
		$menu.find('.current > a').trigger('click'); 
		
		var overlayTimer;
		$body.find('[class^="hide-info-box"]').delegate(this, 'mouseenter mouseleave', function(e) {
			clearTimeout(overlayTimer);
			if (e.type=='mouseenter') {
				if ($revSlider!=undefined) { $revSlider.find('.fullwidthabnner').revpause(); };
				$body.find('.header-overlay').addClass('visible');
			} else {
				overlayTimer=setTimeout(function(){
					/*if ($revSlider!=undefined) { 
						if (!$revSlider.find('.fullwidthabnner').hasClass('hovered')) { $revSlider.find('.fullwidthabnner').revresume().closest('.slider').trigger('mousemove'); };
					};*/
					$body.find('.header-overlay').removeClass('visible');					
				}, 300);
			};
		});

		/* on window scroll */
		$(window).scroll(function() {
			
			/* parallax header */
			if ($headerPanel.length) { 
				headerPanelMarginBottom = $menuResponsive.is(':visible') ? 0 : (mainOffsetTop()*0.6667>$(window).scrollTop() ? $(window).scrollTop() *-0.5 : mainOffsetTop()*0.6667*-0.5);
				if ($headerPanel.hasClass('header-parallax')) {
					$headerPanel.css('marginBottom',headerPanelMarginBottom).find('.page-title').css('bottom',headerPanelMarginBottom*-0.5+50);
				};
			};
			
			/* shrink logo padding */
			logoPadding=minLogoPadding+(maxLogoPadding-minLogoPadding)*(headerInfoH-$(window).scrollTop())/headerInfoH;
			$logo.css({
				paddingTop : function() { return $menuResponsive.is(':visible') ? maxLogoPadding : (logoPadding>minLogoPadding ? logoPadding : minLogoPadding) },
				paddingBottom : function() { return $menuResponsive.is(':visible') ? maxLogoPadding : (logoPadding>minLogoPadding ? logoPadding : minLogoPadding) }
			 });

			/* stickymenu  */
			if ($body.hasClass('stickymenu') && !$menuResponsive.is(':visible') && navOffsetTop()<= $(window).scrollTop()) {
				$navigation.addClass('stickynav');
				$navPlacehoder.css('display','block');
				if ($(document).height()-$(window).height()<=$(window).scrollTop()) {
					$footer.removeClass('stickyfooter-bottom');	
				} else {
					$footer.addClass('stickyfooter-bottom');
				}				
			} else {
				$navigation.removeClass('stickynav');
				$navPlacehoder.css('display','none');
			};

			/* scroll to top button */
			if ($(window).scrollTop()>0) {
				$body.find('#scroll-top').fadeIn(200);
			} else {
				$body.find('#scroll-top').fadeOut(200);
			};
		});
		
		/* on window resize */
		$(window).resize(function() {
			
			$(window).trigger('scroll');		

			/* modify header info height */
			headerInfoH=headerInfoH=$headerInfo.length ? $headerInfo.outerHeight() : 0;

			/* stickyfooter settings */
			if ($body.hasClass('stickyfooter')) {
				if (!$menuResponsive.is(':visible')) {
					$body.addClass('stickyfooter');
					bottomH=$bottom.height ? $bottom.outerHeight() : 0;
					$wrapper.css('marginBottom',bottomH-5);
				} else {
					$body.removeClass('stickyfooter');
					$wrapper.css('marginBottom',0);
				};
			};
		
			/* modify responsive menu */
			if ($menuResponsive.is(':visible')) {
				if (!$menuResponsive.hasClass('open')) {
					$menu.css('display','none').find('li:not(".current")').children('ul').css('display','none');
				};
				$menu.find('li').addClass("noLava").find('ul').each(function(index, element) {
					var $obj=$(this),
						parentsCnt=$obj.find('>li>a').parents('ul').length;
				
					$obj.find('>li>a').css({
						'paddingLeft' : (parentsCnt-1)*20+40+'px',
						'backgroundPosition' : (parentsCnt-1)*20+20+'px -5px'
					});
					$obj.find('>li.current>a').css({
						'paddingLeft' : (parentsCnt-1)*20+40+'px',
						'backgroundPosition' : (parentsCnt-1)*20+20+'px -54px'
					});
				});
			} else {
				$menuResponsive.removeClass('open');				
				$menu.css('display','block')
				.find('ul').css('display','block').end()				
				.find('li').removeClass("noLava").end().find('ul > li').addClass("noLava").end()
				.find('li.current').trigger('mouseenter').trigger('mouseleave').end()
				.find('li>a').css('paddingLeft','20px');				
			};
		}).resize();
		
		if (jQuery().magnificPopup) {
		$('.magnific-popup').each(function(index, element) {
			$(this).magnificPopup({
				type:'image',
				closeOnContentClick: true
			});		
		});
		$('.magnific-popup-html').each(function(index, element) {
        	$(this).magnificPopup({
			  disableOn: 700,
			  type: 'iframe'
	        });
		});
		
		};
		
		/* placeholder for old IEs */
		if ($('html').hasClass('lt-ie10') || $('html').hasClass('lt-ie9')) {
		   $body.find('input[placeholder], textarea[placeholder]').each(function(){  
		        var $this = $(this);        
		        
		        $this.val($this.attr('placeholder'));
		        $this.delegate(this, 'focus blur', function(e) {
		        	if (e.type=='focus') {
						if ($this.val() == $this.attr('placeholder')) { $this.val(''); };
					} else {
						if ($this.val() == '' || $this.val() == $this.attr('placeholder')) { $this.val($this.attr('placeholder')); };
					};
		        });
		    });
		};

		/* scroll button click event - call scroll to plugin  */
		$body.find('#scroll-top').css('display','none').delegate('a', 'click', function(e) {
			e.preventDefault();			
			$('html, body').gwScrollTo({'easing':'easeInOutCubic'});
		});

		/* search form validate & submit */
		$body.find('.searchform').delegate(this, 'submit', function(){
			var $this=$(this), $input=$this.find('input[name="s"]');
			if ($input[0].value=='') { $input.focus(); return false; };
		});
			
	/* -------------------------------------------------------------------------------- /
		[3] NAVIGATION
	/ -------------------------------------------------------------------------------- */

		$menu.delegate('li a', 'click mouseenter mouseleave', function(e) {
			var $this=$(this),
				$li=$(this).parent(), 
				$parents=$li.parents('ul').parent('li');
		
			/* navigation general */
			if (e.type=='click') {
				if (this.href.match(/#/gi)) { 
					e.preventDefault();
				} else {
					$menuResponsive.find('.menu-title').html($this.text())
					$menu.find('li.current').removeClass("current").find('>a').css('backgroundPositionY','-5px').css('backgroundPosition', function() { 
							var bgPosX=$(this).css('backgroundPosition').split(' ')[0]
							return bgPosX+' -5px'
					});						
					$li.addClass("current");
					$parents.each(function(index) {
						var $obj=$(this);
						if (!$obj.hasClass('current')) { 
							$obj.addClass("current").find('>a').css('backgroundPositionY','-54px').css('backgroundPosition', function() { 
								var bgPosX=$(this).css('backgroundPosition').split(' ')[0]
								return bgPosX+' -54px'
							});	
						};
					});					
				};
			};
			
			/* navigation responsive */
			if ($menuResponsive.is(':visible')) {
				if (e.type=='click') {
					if ($this.closest('li').find('>ul').is(':visible')) {
						$this.closest('li').find('>ul').slideUp(300,'easeInOutCubic');
					} else {
						$this.closest('li').find('>ul').slideDown(300,'easeInOutCubic').end().siblings().find('ul').slideUp(300,'easeInOutCubic');
					};				
				} else if (e.type=='mouseenter') {
					$this.css('backgroundPositionY','-54px');
					$this.css('backgroundPosition', function() { 
						var bgPosX=$(this).css('backgroundPosition').split(' ')[0];
						return bgPosX+' -54px'
					});					
				} else {
					if (!$this.closest('li').hasClass('current')) {
						$this.css('backgroundPositionY','-5px');
						$this.css('backgroundPosition', function() { 
							var bgPosX=$(this).css('backgroundPosition').split(' ')[0];
							return bgPosX+' -5px';
						});					
					};					
				};
			};
		});
		
		/* responsive menu click event */
		$menuResponsive.delegate(this, 'click', function() {
			var $this=$(this);
			if ($menu.is(':visible')) {
				$menu.slideUp(300,'easeInOutCubic');
			} else {
				$this.addClass('open');
				$menu.slideDown(300,'easeInOutCubic');
			};
		});	

	/* -------------------------------------------------------------------------------- /
		[4] MENU SLIDING EFFECT - LAVALAMP PLUGIN
	/ -------------------------------------------------------------------------------- */

		if (jQuery().lavaLamp) {
			setTimeout(function(){ 
				/* add "selectedLava" class to selected item before (important!) lavaLamp init */
				$menu.each(function(index, element) {
					$(this).children('li.current').addClass("selectedLava").end()
					/* add "noLava" class to submenu items */
					.find('ul > li').addClass("noLava").end()
					/* call the plugin */
					.lavaLamp({
						fx : 'easeOutExpo',
						speed : 500
						});
					});	
			},100);
		};			
	
	/* -------------------------------------------------------------------------------- /
		[5] CONTENT ELEMENTS - ALERTS, TABS, TOGGLES, PROGRESS
	/ -------------------------------------------------------------------------------- */		
	
		/* close alert */
		$body.find('.alert').delegate('.close', 'click', function() {
			$(this).closest('.alert').slideUp();
		});
		
		/* tabs */
		$body.find('.tabs').delegate('li', 'click', function(e) {
			var $this=$(this), 
				$tabsContent=$this.closest('.tabs-wrapper').next('.tabs-content'),
				$tabsContentLi=$tabsContent.find('> li'), 
				index=$this.closest('.tabs').find('> li').index($this);
			
			e.preventDefault();
			if (!$this.hasClass('current')) {
				$this.addClass('current').siblings('.current').removeClass('current');
				$tabsContentLi.eq(index).siblings('.current')
				.find('.tab-content').css('display','block')
				.fadeTo(200, 0, function() { 
					$tabsContent.stop().animate({
						'height' : $tabsContentLi.eq(index).find('.tab-content').outerHeight()
						},350, 'jswing', function() { 
							$tabsContentLi.eq(index).siblings('.current').removeClass('current').find('.tab-content').css('display','none');
							$tabsContentLi.eq(index).addClass('current').find('.tab-content')
							.fadeTo(200,1); 
					});
				});
			} else {
				$tabsContent.stop().animate({ 'height' : $tabsContentLi.eq(index).find('.tab-content').outerHeight() },350, 'jswing');
			};
		});
		/* correct tab height on window resize */
		$(window).resize(function() { $body.find('.tabs li.current').trigger('click'); });
		
		/* tabs - responsive style */
		$body.find('.tabs-content').delegate('.tab-title', 'click', function(e) {
			var $this=$(this), 
				$parent=$this.closest('li'),
				$tabsContent=$this.closest('.tabs-content'),
				$tabsContentLi=$tabsContent.find('> li'), 
				$tabs=$tabsContent.prev('.tabs-wrapper').find('.tabs'),
				$tabsLi=$tabs.find('> li'),
				index=$tabsContent.find('> li').index($parent);
			
			e.preventDefault();
			if (!$parent.hasClass('current')) {
				$parent.addClass('current').find('.tab-content').stop().css({'display':'none', 'opacity': 1}).slideDown(500,'easeOutExpo');
				$parent.siblings('.current').removeClass('current').find('.tab-content').stop().css('display','block').slideUp(500,'easeOutExpo', function(){
					$tabsContent.css('height',$parent.find('.tab-content').outerHeight());
				});
				$tabsLi.eq(index).addClass('current').siblings().removeClass('current');
			};
		});		
		
		/* toggles */
		$body.find('.toggles').delegate('.toggle-title', 'click', function(e) {
			var $this=$(this), $parent=$this.closest('li');
			
			e.preventDefault();
			if ($parent.hasClass('current')) {
				$parent.removeClass('current').find('.toggle-content').stop().css('display','block').slideUp(500,'easeOutExpo');
			} else {
				$parent.addClass('current').find('.toggle-content').stop().css('display','none').slideDown(500,'easeOutExpo');
				$parent.siblings('.current').find('.toggle-title').trigger('click');
			};
		});	
		
		/* progress bars */
		var $progressBars=$body.find('.progress-bars');
		
		$progressBars.find('.progress-label span').end()
		.find('.bar').css('width',0)
		.bind('inview', function (event, visible) {
			var $this=$(this), $parent=$this.closest('li'), timer;
			$this.addClass('trans-enabled');
			if (visible===true) {
				$this.css('width', Math.round(parseFloat($this.data('width')))+'%')
				.unbind('inview');
				timer=setInterval(function() {
					var percent = Math.round($this.width()/$parent.width()*100);
					//$parent.find('.progress-label span').html(percent+'%');
					if (percent==Math.round(parseFloat($this.data('width')))) { clearInterval(timer); };
				}, 5);				
			};
		});


	/* -------------------------------------------------------------------------------- /
		[6] PORTFOLIO - ISOTOPE PLUGIN
	/ -------------------------------------------------------------------------------- */

		var $portfolio=$body.find('.portfolio-isotope'),
			$portfolioFilter=$portfolio.find('.portfolio-filter'),
			$portfolioPosts=$portfolio.find('.portfolio-posts');
		
		if (jQuery().isotope) {
			$portfolioFilter.delegate('li', 'click', function(e) {
				var $this=$(this), filter;

				if ($this.data('filter')==undefined) {
					filter='*';
				} else {
					filter='[data-filter*="'+$this.data('filter')+'"]';
				};
				setTimeout(function() {
					$portfolioPosts.isotope({ filter: filter });
				}, 100);
			});
		};
		
		$(window).resize(function() {
			if ($portfolioFilter.find('li.current').length) {
				$portfolioFilter.find('li.current').trigger('click');
			} else {
				$portfolioFilter.find('li:first').trigger('click');
			};
		});
		
	/* -------------------------------------------------------------------------------- /
		[7] SLIDERS
	/ -------------------------------------------------------------------------------- */	

		if (jQuery().carouFredSel) {
			
			/* testimonials slider */
			$body.find('.testimonials .slides').each(function(index, element) {
				var $this=$(this);		
				$this.carouFredSel({
					responsive : true,
					auto : false,				
					height : 'variable',
					width : '100%',
					pagination : {
						keys : false,
						container : $(this).closest('.slider').find('.slider-pagination'),
						anchorBuilder : function(nr) { return '<li><a href="#" data-id="'+nr+'"></a></li>'; }
					},
					swipe :	{
						onTouch	: true
					},
				    onCreate : function () {
				        $(window).on('resize', function(){
							var timer=setInterval(function() {
							if ($this.find('li:first').height()!=0) { 
								clearInterval(timer);
								$this.parent().add($this).css('height', $this.children().first().height() + 'px');
							}
							},10);
				        }).trigger('resize');
				    }					
				});
			});
		
			/* testimonials slider */
			$body.find('.post-slider .slides').each(function(index, element) {
				var $this=$(this);		
				$this.carouFredSel({
					responsive : true,
					height: 'variable',
					width : '100%',
					height: "auto",
					auto : false,
					next  : $this.closest('.slider').find('.slider-control-next'),
					prev  : $this.closest('.slider').find('.slider-control-prev'),
					swipe :	{
						onTouch	: true
					},					
				    onCreate : function () {
				        $(window).on('resize', function(){
							var timer=setInterval(function() {
							if ($this.find('li:first').height()!=0) { 
								clearInterval(timer);
								$this.parent().add($this).css('height', $this.children().first().height() + 'px');
							}
							},10);
				        }).trigger('resize');
				    }					
				})
			});
			
			/* brands slider */
			$('.brands .slides').each(function(index, element) {
				var $this=$(this);		
				$this.carouFredSel({
					responsive : true,
					auto : false,
					width : '100%',
					next : $this.closest('.slider').find('.slider-controls .next'),
					prev : $this.closest('.slider').find('.slider-controls .prev'),
					scroll : 1,
					swipe :	{
						onTouch	: true
					},					
					items :	{
						width :	300,
						visible	: {
							min	: 1,
							max	: 4
						}
					},
					onCreate : function () {
				        $(window).on('resize', function(){
							var timer=setInterval(function() {
							if ($this.find('li:first').height()!=0) { 
								clearInterval(timer);
								$this.parent().add($this).css('height', $this.children().first().height() + 'px');
							}
							},100);
				        }).trigger('resize');
				    }	
				});
			});
		};

	/* -------------------------------------------------------------------------------- /
		[8] TOP FOOTER TICKER
	/ -------------------------------------------------------------------------------- */	

		var $ticker = $body.find('.ticker'),
			$tickerControls=$('.ticker-controls'),
			tickerTimer;
		
		$ticker.each(function(index, element) {
			$(this).bind('loaded clicked', function(e, dir) {
				var $this=$(this),	
					$tickerList=$this.find('.ticker-list'),
					$ticker=$tickerList.find('li'),
					tickerCnt=$ticker.length,
					dir = dir == undefined ? 'fw' : 'rev';
				
				var returnIndex = function (index) {
					index = index>=tickerCnt ? 0 : index;
					index = index<0 ? tickerCnt-1 : index;
					return index;
				}
	
				var play = function(index, direction) {
					direction = direction == undefined ? 'fw' : direction;
					index = index == undefined ? (direction=='fw' ? 0 : tickerCnt-1): returnIndex(index);
					var nextIndex = returnIndex(index+1),
						prevIndex = returnIndex(index-1),
						indexH;
												
					if (direction == 'fw') { 
						index=nextIndex;
					} else {
						index=prevIndex;
					};
					
					indexH=$ticker.eq(index).height();
					$ticker.stop().fadeTo(200,0, function() {
						$ticker.css({
							'position':'absolute',
							'top': $ticker.eq(index).height()
						}).eq(index).css('top','-='+$ticker.eq(index).height());
						$tickerList.stop().animate({
							'height' : indexH,
							},250, 'jswing', function() { $ticker.stop().fadeTo(200,1);
						});
					});
	
					if (direction == 'fw') { 
						$this.data('id',index)
					} else {
						$this.data('id',index);
					};		
				};
					
				if (e.type=='clicked') {
					clearInterval(tickerTimer);
					play($this.data('id'), dir);
					$this.trigger('loaded');
				};
				if (e.type=='loaded') {
					clearInterval(tickerTimer);
					if ($this.data('id')==undefined) { $this.data('id',0); 
						$tickerList.css('height',$ticker.eq($this.data('id')).height());
					};
					tickerTimer=setInterval(function() {
						play($this.data('id'));
					},5000);
				};
			});
		});
		
		/* ticker arrow event */
		$tickerControls.delegate('.arrow', 'click', function(e) {
			var $this=$(this), $ticker=$this.closest('.ticker-controls').prev('.ticker');
			e.preventDefault();
			if ($this.hasClass('next')) {
				$ticker.trigger('clicked');
			} else {
				$ticker.trigger('clicked','rev');
			};
		});
		
		/* correct ticker height on window resize */
		$tickerControls.prev('.ticker').trigger('loaded');
		var tickerResize=false;
		$(window).resize(function(e) {
			if (tickerResize) { clearTimeout(tickerResize); }
			tickerResize = setTimeout(function() {
				$tickerControls.prev('.ticker').trigger('loaded');
			}, 100);
		});




	/* -------------------------------------------------------------------------------- /
		[10] GOOGLE MAP - GOMAP PLUGIN
	/ -------------------------------------------------------------------------------- */	

		var $headerMap=$body.find("#header-map");
	
		if (jQuery().goMap && google && google.maps) {
			 $headerMap.each(function(index, element) {
				var map=$(this).goMap({ 
					markers : [{ 
						address : 'Leatherhead, Surrey United Kingdom 01372 818123, United Kingdom', /* change your adress here */
						title : 'Granth', /* title information */
						icon : {
							image : 'assets/images/misc/pin_red.png' /* your custom icon file */
						}	
					}], 
					scrollwheel : false,
					zoom : 13,
					maptype : 'ROADMAP'
				});
			});

			var mapResize=false;
			$(window).resize(function(e) {
				if (mapResize) { clearTimeout(mapResize); }
				mapResize = setTimeout(function() {
					if ($.goMap.getMarkers('markers').length) {
						$.goMap.map.panTo($.goMap.getMarkers('markers')[0].getPosition());
					};
				}, 100);
			});
		};
		
	/* -------------------------------------------------------------------------------- /
		[11] SLIDER REVOLUTION
	/ -------------------------------------------------------------------------------- */			

  	if (jQuery().revolution) {

        var $revSlider=$body.find('.rev-slider'),
        	sliderH=570; /* set the slider height */
		
		$revSlider.find('.fullwidthabnner').css({'height':sliderH,'maxHeight':sliderH}).revolution({    
			delay:9000,
			startheight:sliderH,
			startwidth:1020,
			
			navigationType:"none",                  
			navigationArrows:"none",        
			touchenabled:"on",                      
			onHoverStop:"on",                        
			
			navOffsetHorizontal:0,
			navOffsetVertical:20,
			
			hideCaptionAtLimit:0,
			hideAllCaptionAtLilmit:0,
			hideSliderAtLimit:0,
			
			stopAtSlide:-1,
			stopAfterLoops:-1,
			
			shadow:0,
			fullWidth:"on"	
		});			

		/* revslider arrows */
        $revSlider.delegate('.slider-control-prev, .slider-control-next', 'click', function(e){
			var $this=$(this), 
				$parent=$this.closest('.rev-slider');
			
			e.preventDefault();
			if ($this.hasClass('slider-control-prev')) {
				$revSlider.revprev();
			} else {
				$revSlider.revnext();
			};
		});
	};
});

/*additional script*/
;(function($){
    "use strict";
    
    // Contact form
    //---------------------------------------------

    $(function(){
        $("#subsribe-form").submit(function(e){
            // Stop the form actually posting
            e.preventDefault();
            var action = $(this).attr('action');
            $(".form-error").empty();
            var Params = {
                type: 'POST',
                cache: false
            }
            $.ajax( {
                type: Params.type,
                url: action,
                cache: Params.cache,
                data: $("#subsribe-form").serialize(),
                success: function( data ) {
                    if (  data.indexOf('error') != -1) {
                        $(".form-error").html(data).slideDown(300, "easeOutExpo");
                    } else {
                        $(".form-error").hide();
                        //$(".contact-form-wrap").height($(".contact-form").height());
                        $("#subsribe-form").slideUp(300, "easeInExpo");
                        $(".form-success").html(data).slideDown(300, "easeOutExpo");
                    }
                },
                error: function( jqxhr ) {
                    //console.log('error');
                }
            });
        });
    });	
})(jQuery);
