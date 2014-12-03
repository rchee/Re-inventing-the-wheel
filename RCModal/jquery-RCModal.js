/**
 * 模态框插件
 * @author RChee
 * @param {Object} $
 */
(function($) {
	$.fn.RCModal = function(options) {
		var that = this,
			jqo = $(this),
			defults = {
				width: '400px',
				top: '0px',
				'z-index': 900,
				showTime: 150,
				hideTime: 150,
				contentCss: {
					margin: '0 auto'
				},
				backgroundCss: {
					display: 'none',
					position: 'fixed',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					'z-index': 1000,
					'background-color': '#000000',
					'zoom': 1
				},
				scrollCss: {
					overflow: 'auto',
					height: '100%',
					position: 'relative'
				}
			},
			settings = $.extend(true, {}, defults, options),
			backgroundDiv, scrollDiv;
		//设置样式
		jqo.css('width', settings.width);
		jqo.css(settings.contentCss);
		jqo.css('margin-top', settings.top);
		jqo.css('margin-bottom', settings.top);

		//包装
		scrollDiv = jqo.wrap('<div class="RCModal"/>').parent().css(settings.scrollCss);
		backgroundDiv = scrollDiv.wrap('<div style="display:none" class="RCModal"/>').parent().css(settings.backgroundCss).css('z-index', settings['z-index']);

		//去除display：none
		jqo.show();


		backgroundDiv.showModal = function() {
			//修饰body
			$('body').css('overflow', 'hidden');
			backgroundDiv.fadeIn(settings.showTime);
		};
		backgroundDiv.hideModal = function() {
			//移除对body的修饰
			$('body').css('overflow', 'auto');
			backgroundDiv.fadeOut(settings.hideTime);
		};


		//绑定事件
		backgroundDiv.click(backgroundDiv.hideModal);
		jqo.click(function(e) {
			//do nothing but stop pop,so that user can't close windows by click it
			e.stopPropagation();
		});

		$('.close', jqo).click(backgroundDiv.hideModal);

		return backgroundDiv;
	}
})(jQuery)