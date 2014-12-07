RCModal 模态框插件
==================

简单易用的模态框插件。能够为模态框提供滚动条，当模态框弹出后，滚动鼠标滚轮将不会滚动处于背景的页面，只会用于操作模态框。
基本原理是将模态框包裹在两层div中，最外层为透明背景，内层用于提供滚动条（受Bootstrap 3模态框启发）。

##使用方式

###初始化
将一个标签设置为弹窗
	var myModale = $(".modale").RCModal({/*settings here*/});

###显示弹窗
	myModale.showModale();

###隐藏弹窗
	myModale.hideModale();

##设置说明

			{
				width: '400px',		//弹窗的宽度
				top: '0px',			//弹窗距离屏幕顶部的高度
				'z-index': 900,		//弹窗的z-index图层
				showTime: 150,		//展开弹窗花费时间
				hideTime: 150,		//收起弹窗花费时间
				contentCss: {
					margin: '0 auto'//对弹窗内部设置css
				},
				backgroundCss: {	
					/**对弹窗背景设置的css**/
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
					/**对弹窗的滚动区域做的css**/
					overflow: 'auto',
					height: '100%',
					position: 'relative'
				}
			}