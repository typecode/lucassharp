/******************************************/
/******************************************/
/****  JS Document                     ****/
/****  by Andrew Mahon                 ****/
/****  amahon@gmail.com                ****/
/******************************************/
/******************************************/

(function(amahon) {
	var log = true
	amahon.util.log = function(message,level){
		if(log){
			if (typeof console != "undefined" && typeof console.debug != "undefined") {
				if(!level){
					console.info(message)
				} else {
					console[level](message)
				}
			}
		}
	}
	amahon.util.dump = function(object){
		if(log){
			if (typeof console != "undefined" && typeof console.debug != "undefined") {
				console.log(object)
			}
		}
	}
})(amahon);