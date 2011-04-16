/******************************************/
/******************************************/
/****  JS Document                     ****/
/****  by Andrew Mahon                 ****/
/****  amahon@gmail.com                ****/
/******************************************/
/******************************************/

(function(amahon) {
	amahon.jQ.fn.portfolioSite = function(options){
		var $ps, _o, _initialized, _small_icon_visible
		
		
		$ps = this
		_o = jQuery.extend({
			content:""
		},options);
		_initialized = false
		
		function _initialize(){
			amahon.util.log("Initializing Portfolio Site",'info')
			_setup_components()
			_setup_events()
						
			if(window.location.hash){
				$ps.find("a[name='"+window.location.hash.substring(1,window.location.hash.length)+"']").click()
			} else {
				$ps.find("a[name='pageHome']").click()
			}
			_small_icon_visible = false
			$ps.find("#top_nav").css('opacity',0.0)
			_initialized = true
		}
		
		function _setup_components(){
			amahon.util.dump($ps.find(".slide_panel"))
			$ps.find(".slide_panel").each(function(i,j){
				amahon.jQ(j).slide_panel({})
			})
		}
		
		function _setup_events(){
			amahon.jQ(document).bind('scroll',_documentScrollHandler)
			$ps.find("a").live("click",_siteLinkClickHandler)
		}
		
		function _documentScrollHandler(e){
			e.stopPropagation()
			if(amahon.jQ(document).scrollTop() < 5){
				if(_small_icon_visible){
					_small_icon_visible = false
					$ps.find("#top_nav").stop().animate({'opacity':0.0},500)
				}
			} else {
				if(!_small_icon_visible){
					_small_icon_visible = true
					$ps.find("#top_nav").stop().animate({'opacity':1.0},500)
				}
			}
		}
		
		function _siteLinkClickHandler(e){
			
			var _$t = amahon.jQ(e.target)
			if(e.target.nodeName != 'A'){
				if(e.target.parentNode.nodeName == 'A'){
					_$t = amahon.jQ(e.target.parentNode)
				}
			}
			if(_$t.attr('target') == "_content"){
				e.preventDefault()
				if(amahon.jQ(_o.content).length > 0){
					amahon.jQ.get(_$t.attr('href'),{},function(d,ts,xhr){
						window.location.hash = _$t.attr('name')
						amahon.jQ(_o.content).html(d)
						amahon.jQ(document).trigger("CLE",{})
					})
				}
			} else if(_$t.attr('target') == "_scroll"){
				e.preventDefault()
				$(document).scrollTo(_$t.attr('href'),500,{offset:-15})
			} else{
			}
		}
		
		_initialize()
		return $ps
	}
	
})(amahon);