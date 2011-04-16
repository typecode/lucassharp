/******************************************/
/******************************************/
/****  JS Document                     ****/
/****  by Andrew Mahon                 ****/
/****  amahon@gmail.com                ****/
/******************************************/
/******************************************/

(function(amahon) {
	amahon.jQ.fn.slide_panel = function(options){
		var $sp, _o, _initialized, _is_open
		
		$sp = this
		_o = jQuery.extend({
			animate:true,
			open:false
		},options);
		_initialized = false
		
		function _initialize(){
			amahon.util.log("Initializing Slide Panel",'info')
			_setup_events()
			_is_open = _o.open
			$sp.find('.state').hide()
			$sp.find(".blockLink:first").click()
			if(!_is_open){
				_close(true)
			}
			return $sp
		}
		
		function _setup_events(){
			
			$sp.find(".blockLink").bind('click',_blockLinkClickHandler)
			$sp.find(".itemTitle").bind("click",_panelButtonClickedHandler)
			$sp.find('.itemTitle').bind('mouseover',_buttonMouseOverHandler)
			$sp.find('.itemTitle').bind('mouseout',_buttonMouseOutHandler)
			$sp.find(".button").bind("click",_panelButtonClickedHandler)
			$sp.find('.button').bind('mouseover',_buttonMouseOverHandler)
			$sp.find('.button').bind('mouseout',_buttonMouseOutHandler)
		}
		
		function _panelButtonClickedHandler(e){
			e.preventDefault()
			if(_is_open){
				_close()
				_is_open = false
				$sp.find('.state').text('[click for more]')
			}else{
				_open()
				_is_open = true
				$sp.find('.state').text('[close]')
			}
		}
		
		function _blockLinkClickHandler(e){
			e.preventDefault()
			$sp.find('img[name='+e.target.name+']').show().siblings().hide()
			amahon.jQ(e.target).addClass('active').siblings().removeClass('active')
		}
		
		function _buttonMouseOverHandler(e){
			$sp.find('.state').show()
		}
		
		function _buttonMouseOutHandler(e){
			$sp.find('.state').hide()
		}
		
		function _open(no_animate){
			var __buttonHeight = $sp.find('.button img').outerHeight()
			var __contentHeight = $sp.find('.inner').outerHeight()
			var __combinedHeight = __buttonHeight + __contentHeight
			
			//amahon.jQ(document).scrollTo($sp.find(".button"),500)
			
			if(_o.animate && !no_animate){
				$sp.stop().css('height',__buttonHeight).find('.inner').show()
				$sp.animate({'height':__combinedHeight+"px"},500,function(){
					amahon.jQ(this).css('height','auto')
				})
			} else {
				$sp.css('height',__buttonHeight).find('.inner').show().parent().css('height','auto')
			}
		}
		
		function _close(no_animate){
			var __buttonHeight = $sp.find('.button img').outerHeight()
			var __contentHeight = $sp.find('.inner').outerHeight()
			var __combinedHeight = __buttonHeight + __contentHeight
			if(_o.animate && !no_animate){
				$sp.stop().css('height',__combinedHeight).animate({'height':__buttonHeight+"px"},500,function(){
					amahon.jQ(this).find('.inner').hide()
					$sp.css('height','auto')
				})
			} else {
				$sp.find('.inner').hide().parent().css('height','auto')
				
			}
		}
		
		return _initialize()
	}
	
})(amahon);