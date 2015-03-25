// author: 李炎霞
// date: 2014-09-23 
// update: 2014-09-23 

window.onload = function(){
	var oSkills = document.getElementById('skills');
	var oDraw = oSkills.getContext('2d');

	// 第一个正六边形
	// 获取画布宽高
	var w = oSkills.width;
	var h = oSkills.height;

	// 上
	oDraw.fillStyle = '#448aca';
	oDraw.strokeStyle = '#448aca';
	oDraw.beginPath();
		oDraw.moveTo( w/2, h/2 );
		oDraw.lineTo( w/4, 20 );
		oDraw.lineTo( (3*w)/4 , 20 );
	oDraw.closePath();
	oDraw.fill();
	oDraw.stroke();

	// 右上
	oDraw.fillStyle = '#448aca';
	oDraw.strokeStyle = '#448aca';
	oDraw.beginPath();
		oDraw.moveTo( w/2, h/2 );
		oDraw.lineTo( (3*w)/4 , 20 );
		oDraw.lineTo( w, h/2 );
	oDraw.closePath();
	oDraw.fill();
	oDraw.stroke();

	// 右下
	oDraw.fillStyle = '#448aca';
	oDraw.strokeStyle = '#448aca';
	oDraw.beginPath();
		oDraw.moveTo( w/2, h/2 );
		oDraw.lineTo( w, h/2 );
		oDraw.lineTo( (3*w)/4 , 280 );
	oDraw.closePath();
	oDraw.fill();
	oDraw.stroke();

	// 下
	oDraw.fillStyle = '#448aca';
	oDraw.strokeStyle = '#448aca';
	oDraw.beginPath();
		oDraw.moveTo( w/2, h/2 );
		oDraw.lineTo( (3*w)/4 , 280 );
		oDraw.lineTo( w/4, 280 );
	oDraw.closePath();
	oDraw.fill();
	oDraw.stroke();

	// 左下
	oDraw.fillStyle = '#448aca';
	oDraw.strokeStyle = '#448aca';
	oDraw.beginPath();
		oDraw.moveTo( w/2, h/2 );
		oDraw.lineTo( w/4, 280 );
		oDraw.lineTo( 0, h/2 );
	oDraw.closePath();
	oDraw.fill();
	oDraw.stroke();

	// 左上
	oDraw.fillStyle = '#448aca';
	oDraw.strokeStyle = '#448aca';
	oDraw.beginPath();
		oDraw.moveTo( w/2, h/2 );
		oDraw.lineTo( 0, h/2 );
		oDraw.lineTo( w/4, 20 );
	oDraw.closePath();
	oDraw.fill();
	oDraw.stroke();



	// 第二个正六边形
	// 获取画布宽高
	var w2 = 2/3*w;
	var h2 = 2/3*h;

	// 上
	oDraw.fillStyle = '#cddff3';
	oDraw.strokeStyle = '#cddff3';
	oDraw.beginPath();
		oDraw.moveTo( w/2, h/2 );
		oDraw.lineTo( 100, 63 );
		oDraw.lineTo( 200 , 63 );
	oDraw.closePath();
	oDraw.fill();
	oDraw.stroke();

	// 右上
	oDraw.fillStyle = '#cddff3';
	oDraw.strokeStyle = '#cddff3';
	oDraw.beginPath();
		oDraw.moveTo( w/2, h/2 );
		oDraw.lineTo( 200 , 63 );
		oDraw.lineTo( 250, 150 );
	oDraw.closePath();
	oDraw.fill();
	oDraw.stroke();

	// 右下
	oDraw.fillStyle = '#cddff3';
	oDraw.strokeStyle = '#cddff3';
	oDraw.beginPath();
		oDraw.moveTo( w/2, h/2 );
		oDraw.lineTo( 250, 150 );
		oDraw.lineTo( 200 , 237 );
	oDraw.closePath();
	oDraw.fill();
	oDraw.stroke();

	// 下
	oDraw.fillStyle = '#cddff3';
	oDraw.strokeStyle = '#cddff3';
	oDraw.beginPath();
		oDraw.moveTo( w/2, h/2 );
		oDraw.lineTo( 200 , 237 );
		oDraw.lineTo( 100, 237 );
	oDraw.closePath();
	oDraw.fill();
	oDraw.stroke();

	// 左下
	oDraw.fillStyle = '#cddff3';
	oDraw.strokeStyle = '#cddff3';
	oDraw.beginPath();
		oDraw.moveTo( w/2, h/2 );
		oDraw.lineTo( 100, 237 );
		oDraw.lineTo( 50, 150 );
	oDraw.closePath();
	oDraw.fill();
	oDraw.stroke();

	// 左上
	oDraw.fillStyle = '#cddff3';
	oDraw.strokeStyle = '#cddff3';
	oDraw.beginPath();
		oDraw.moveTo( w/2, h/2 );
		oDraw.lineTo( 50, 150 );
		oDraw.lineTo( 100, 63 );
	oDraw.closePath();
	oDraw.fill();
	oDraw.stroke();

}

$(document).ready(function(){

	// alert($(document).height());
	// alert($(document).offset.top);
	
	// 直接通过导航点击改变
	changeDotNav();

	// 通过滚动改变导航位置
	$(window).bind('scroll', function(){
		parallaxScroll();
		changeDotNav();
	});    // scroll 用于可滚动的元素和window对象（浏览器窗口）

	// nav 1
	$('#navbar .nav_whoami').click(function(){
		$('html, body').animate({             // animate( {}, time(可选), callback(可选) )
			scrollTop: 0
		}, 1000, function(){
			parallaxScroll();
		});
	});

	// nav 2
	$('#navbar .nav_myskills').click(function(){
		$('html, body').animate({             // animate( {}, time(可选), callback(可选) )
			scrollTop: $('#myskills').offset().top
		}, 1000, function(){
			parallaxScroll();
		});
		return false;
	});

	// nav 3
	$('#navbar .nav_experience').click(function(){
		$('html, body').animate({             // animate( {}, time(可选), callback(可选) )
			scrollTop: $('#experience').offset().top
		}, 1000, function(){
			parallaxScroll();
		});
		return false;
	});


	// nav 4
	$('#navbar .nav_contact').click(function(){
		$('html, body').animate({             // animate( {}, time(可选), callback(可选) )
			scrollTop: $('#contact').offset().top
		}, 1000, function(){
			parallaxScroll();
		});
		return false;
	});

	// 控制导航处的和显示与不显示
	$('#navbar a').hover(function(){
		$(this).prev('h1').show();
	},function(){
		$(this).prev('h1').hide();
	});

});

// 函数定义

function parallaxScroll(){
	var scrolled = $(window).scrollTop();
	$('#page-1').css('top', (0 - (scrolled*.35)) + 'px');
	$('#page-2').css('top', (0 - (scrolled*.55)) + 'px');
	$('#page-3').css('top', (0 - (scrolled*.65)) + 'px');
	$('#page-4').css('top', (0 - (scrolled*.65)) + 'px');
}


// 设置导航点的选中状态
function changeDotNav(){
	var section1Top = 0;
	var section2Top = $('#myskills').offset().top - (($('#experience').offset().top - $('#myskills').offset().top) / 2);
	var section3Top = $('#experience').offset().top - (($('#contact').offset().top - $('#experience').offset().top) / 2);
	var section4Top = $('#contact').offset().top - (($(document).height() - $('#contact').offset().top) / 2);
	$('#navbar a').removeClass('active');
	if( $(document).scrollTop() >= section1Top && $(document).scrollTop() <= section2Top ){
		$('#navbar .nav_whoami').addClass('active');
	} else if( $(document).scrollTop() >= section2Top && $(document).scrollTop() <= section3Top ){
		$('#navbar .nav_myskills').addClass('active');
	} else if( $(document).scrollTop() >= section3Top && $(document).scrollTop() <= section4Top ){
		$('#navbar .nav_experience').addClass('active');
	} else if ( $(document).scrollTop() >= section4Top ){
		$('#navbar .nav_contact').addClass('active');
	}
}


// $(document).ready(function(){
//     $("section[data-type='bg']").each(function(){
//         var $bgObj = $(this);
//         $(window).scroll(function(){
//             var yPos = -$(window).scrollTop(this)/$bgObj.data('speed');
//             var coords = '50%' + yPos + 'px';
//             $bgObj.css({backgroundPosition: coords});
//         });
//     });
// });