helpers = {

	setBoxShadow: function(){
		var supportBoxShadow = $('.boxshadow').length;
		var haveBoxShadow = $('.box-shadow').length;

		if(haveBoxShadow){
			if(supportBoxShadow == 0){
				console.log('no boxshadow support');

	    		$('.box-shadow').css({
	    			border : "2px solid #888",
	    			borderTop : "1px solid #888",
	    			borderRight : "1px solid #888"
	    		});
			}
		}
	},
	
	init: function(){
		helpers.setBoxShadow();
	}
};

$(document).ready(function(){
	helpers.init();
});
