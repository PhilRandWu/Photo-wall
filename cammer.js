var wrapUL = $(".wrapUL");
var wrapW = parseInt(wrapUL.css("width"));
var wrapH = parseInt(wrapUL.css("height"));
var liW = wrapW/5;
var liH = wrapH/5;
creatDom ();
function creatDom ()
{
	for(var i = 0; i < 5; i ++)
	{
		for(var j = 0; j < 5; j ++)
		{
			$('<li><div class = "box"><img src = ""></div></li>')
			.css({
				'width': liW + "px",
				'height': liH + "px",
				'left': j * liW,
				'top':i * liH,
				'transform': 'scale(0.9) rotate(' + (Math.random() * 40 - 20 ) + 'deg)'
				+ 'translateX(' + (30 * j -60) + 'px)'
				+ 'translateY(' + (30 * i -60) + 'px)'
				+ 'translateZ(-' + Math.random() * 500 + 'px)'
			})
			.find("img").attr('src','img/pic'+ (i*5+j) +'.jpg')
			.end()
			.appendTo(wrapUL);
		}
	}
	bindEvent ();
}
function bindEvent ()
{
	var change = true;
	$('li').on('click',function () 
	{
		if(change)
		{
			// 小变大
			var bgImg = $(this).find('img').attr('src');
			var bgLeft = 0,
				bgTop = 0;
			$('li').each(function (index) {
				var $this = $(this);
				
				$this.delay(10*index).animate({'opacity': 0},200,function () {
					$this.css({
						'transform': 'rotate(0deg)'
						+ 'translateX(0px)'
						+ 'translateY(0px)'
						+ 'translateZ(0px)'
					});
					$this.find('.box').css({
						'transform': 'scale(1)'
					});
					$this.find('img').attr('src',bgImg).css({
						'position':'absolute',
						'width':wrapW + 'px',
						'height':wrapH + 'px',
						'left': -bgLeft,
						'top': -bgTop
					});
					bgLeft += liW;
					if(bgLeft >= wrapW)
					{
						bgTop+= liH;
						bgLeft=0;
					}
					$this.animate({'opacity': 1},200);
				})
			})
			change = false;
		}
		 else{
			// 大变小
			change = true;
			$('li').each(function (index) {
				var j =index % 5;
				var i = Math.floor(index/5);
				var $this = $(this);
				$this.animate({'opacity': 0},200,function () {
					$(this).find('img').css({
						'position':'absolute',
						'width':'100%',
						'height':'100%',
						'left': 0,
						'top': 0
					});
					$this.find("img").attr('src','img/pic'+ index +'.jpg');
					$this.css({
						'transform': 'scale(0.9) rotate(' + (Math.random() * 40 - 20 ) + 'deg)'
						+ 'translateX(' + (30 * j -60) + 'px)'
						+ 'translateY(' + (30 * i -60) + 'px)'
						+ 'translateZ(-' + Math.random() * 500 + 'px)'
					});
				});
				$this.animate({'opacity': 1},200);
			})
			change = true;
        }
    })
}