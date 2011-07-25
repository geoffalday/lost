$(document).ready(function() {

	var COOKIE_NAME = 'lost';
	var options = { path: '/', expires: 1973 };
	var flagPos = 21;
	var liID = 'e0';
	var h2ID = 's0';
	
	if (!$.cookie(COOKIE_NAME)) {
		flagPos = $.cookie(COOKIE_NAME, ['21','e0','s0'], options);
	} else {
		var cookie = $.cookie(COOKIE_NAME).split(',');
		flagPos = parseInt(cookie[0]);
		liID = cookie[1];
		h2ID = cookie[2];
	}
		
	$('.list h2').each(function(i, v){
		$(this).attr('id','s' + i);
		$(this).disableSelection();
	});	
	
	$('.list li').each(function(i, v){
		$(this).attr('id','e' + i);
		$(this).disableSelection();
	});
	
	$('.list li').click(function(){
		var curOffset = $(this).position();
		var curPos = curOffset.top - 30;
		var curID = $(this).attr('id');
		var curSeason = $(this).parent().parent().find('h2').attr('id');
		
		$('.list h2').removeClass('current');
		$('#' + curSeason).addClass('current');
			
		$('.list li').removeClass('current');
		$(this).addClass('current');
	
		$('.flag').css('top', curPos);
		$('.flag').show();

		$('.list li').removeClass('done');
		var curInt = curID.substring(1);
		for (i=0;i<curInt;i++) {
			$('#e'+i).addClass('done');
		}
	
		$.cookie(COOKIE_NAME, [curPos, curID, curSeason], options);
	});

	// When the page loads, do this stuff.	
	$('.flag').css('top', flagPos);

	$('.list h2').removeClass('current');
	$('#' + h2ID).addClass('current'); 
	
	$('.list li').removeClass('current');
	$('#' + liID).addClass('current');
	
	$('.list li').removeClass('done');
	var curInt = liID.substring(1);
	for (i=0;i<curInt;i++) {
		$('#e'+i).addClass('done');
	}	
	
	// Todo: Mark done.

});

jQuery.fn.extend({ 
        disableSelection : function() { 
                this.each(function() { 
                        this.onselectstart = function() { return false; }; 
                        this.unselectable = "on"; 
                        jQuery(this).css('-moz-user-select', 'none'); 
                }); 
        } 
});
