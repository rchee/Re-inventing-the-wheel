/**
 * jquery轮播插件
 * @author RCHEE
 */
;
(function($) {

	$.fn.RCCarousel = function(options) {


		var imgUrls = [],
			length = 0,
			settings,
			currNum = 0, //当前播放到的
			nextNum = -1, //下一个（-1代表正常，其他数值代表用户按下了按钮，改变了播放顺序）
			topIndex = 100,
			that,
			imgUl, //图片ul的jQuery对象
			buttonUl, //按钮ul的jQuery对象
			timer, //计时器
			defaults = {
				stopTime: 6000,
				changeTime: 200,
				hasButton: true,
				autoPlay: true,
				minIndex: 100,
				maxIndex: 300,
				css: {
					/*最外层容器的css*/
					'position': 'relative'
				},
				imgUlCss: {
					/*列表容器的css*/
					position: 'relative',
					padding: 0
				},
				imgCss: {
					/*单个图片的css*/
					height: '200px',
					width: '100%',
					position: 'absolute',
					'background-size': 'cover',
					'background-position': '50% 50%'
				},
				imgLiCss: { /*图片容器的css*/
					position: 'absolute',
					width: '100%',
					height: '100%'
				},
				buttonUlCss: {
					/*按钮容器的css*/
					margin: 0,
					padding: 0,
					position: 'absolute',
					bottom: '10px',
					'z-index': 800
				},
				buttonCss: {
					/*按钮的css*/
					'list-style': 'none'
				},
				buttonActivateCss: {
					/*按钮激活状态的css*/
				}
			};


		//初始化变量
		settings = $.extend(true, defaults, options);
		length = 0;
		that = this;

		//对this进行装饰
		$(this).css(settings.css);

		//对图片ul进行装饰
		imgUl = $('ul', this).addClass("RCCarousel-ul");
		imgUl.css(settings.imgUlCss);

		//对图片li进行装饰
		$("li", imgUl).each(function(index) {
			$(this).addClass("RCCarousel-li").addClass("li-" + index).css(settings.imgLiCss);
			if (settings.onClick) {
				$(this).bind('click', {
					index: index
				}, settings.onClick);
			}
			length++;
		});

		//对图片li的内容进行处理
		$("li img", imgUl).each(function() {
			var thisJqo = $(this),
				imgUrl = thisJqo.attr("src"),
				parent = thisJqo.parent(),
				newDiv = $("<div></div>");
			newDiv.css($.extend(settings.imgCss, {
				"background-image": "url(" + imgUrl + ")"
			}));
			imgUrls.push(imgUrl);
			thisJqo.remove();
			parent.prepend(newDiv);
		});

		//在this后面加入按钮
		if (settings.hasButton) {
			buttonUl = $("<ul class='RCCarousel-buttons'></ul>");
			buttonUl.css(settings.buttonUlCss);
			for (var i = 0; i < length; i++) {
				var newButtonLi = $("<li class='RCCarousel-button li-" + i + "'></li>");
				newButtonLi.css(settings.buttonCss);
				newButtonLi.attr("data-index", i);
				newButtonLi.mouseenter(onButtonEnter);
				//				newButtonLi.mouseleave(onButtonLeave);
				buttonUl.append(newButtonLi);
			}
			imgUl.after(buttonUl);
		}

		//匹配按钮
		$('.next', that).click(onNext);
		$('.last', that).click(onLast);

		//第一张
		$("li", imgUl).first().css('z-index', topIndex++);
		$("li", buttonUl).first().css(settings.buttonActivateCss);

		//设置定时器
		if (settings.autoPlay) {
			timer = setTimeout(onEnterFarme, settings.stopTime);
		}






		var animateComp = true; //动画锁，防止正在进行动画的过程中插入新的动画
		/**	处理动画的函数**/
		function onEnterFarme() {
			clearTimeout(timer);
			if (animateComp) {
				var next = (nextNum == -1) ? (currNum + 1) % length : next = nextNum;

				if (next == currNum) {
					currNum = (next + 1) % length;
					timer = setTimeout(onEnterFarme, settings.stopTime);
					return;
				}
				animateComp = false;
				//imgli的动画
				$("li.li-" + next, imgUl).css({
					opacity: 0,
					'z-index': topIndex++
				}).animate({
					opacity: 1
				}, settings.changeTime, onSuccess);
				//切换下面的按钮
				$("li", buttonUl).css(settings.buttonCss);
				$("li.li-" + next, buttonUl).css(settings.buttonActivateCss);
				$("li.li-" + currNum, buttonUl).css(settings.buttonCss);
				currNum = next;
				nextNum = -1;
			}
			//防止index溢出
			if (topIndex > settings.maxIndex) {
				imgUl.children().each(function(i, e) {
					var o = $(this);
					o.css('z-index', i + settings.minIndex);
				});
				topIndex = settings.minIndex + length;
				$("li.li-" + next, imgUl).css('z-index', topIndex++);
			}
			/**
			 *动画完成的回调
			 */

			function onSuccess() {
				animateComp = true;
				if (nextNum != -1) {
					//按钮被按下了，立即调用自己
					onEnterFarme();
				} else {
					//按钮没被按下，继续该干嘛干嘛
					if (settings.autoPlay) {
						timer = setTimeout(onEnterFarme, settings.stopTime);
					}
				}
			}
		};

		/**
		 *下面的小圈圈
		 */
		function onButtonEnter() {
			nextNum = 1 * $(this).attr("data-index");
			onEnterFarme();
		};

		/*下一页*/
		function onNext() {
			nextNum = (currNum + 1) % length;
			onEnterFarme();
		};

		/*上一页*/
		function onLast() {
			nextNum = (currNum - 1) % length;
			onEnterFarme();
		};
	};

})(jQuery)