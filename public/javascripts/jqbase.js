$(document).ready(function(){

	// 返回顶部
	$(window).scroll(function () {
		if ( $(window).scrollTop() > 500 ) {
			$('.to-top').show();
		} else {
			$('.to-top').hide();
		}
	});
	$('.to-top').click(function () {
		$('html, body').animate({ scrollTop: 0 }, 1000);
		// $('.to-top').hide();
	});

	// 二维码显示
	$('.weibo').mouseover(function () {
		$('#weibo').show();
	}).mouseout(function () {
		$('#weibo').hide();
	});

	// 鼠标悬浮在访客头像上，可显示访客的名字
	$().mouseover(function() {
		$().show("name");
	}).mouseout( function() {
		$().hide;
	} );
	
});