RCCarousel 轮播插件
======================

这是一个简单的轮播插件，支持自定义样式，支持按钮切换。默认绑定.next为下一页，绑定.last为上一页。
插件对动画做了类似同步锁的处理，可以一定程度上缓解同类插件中由于用户频繁切换轮播图带来的动画错乱。
插件中可以指定轮播图显示的z-index范围，不过对于z-index溢出的处理欠妥，发生溢出时有小bug。

##使用方式

	$(".carousel").RCCarousel({/*settings here*/});

##设置说明

	{
		stopTime: 6000,	//暂停时间
		changeTime: 200,//切换动画发生的时间
		hasButton: true,//是否有下面的导航按钮
		autoPlay: true, //是否自动播放
		minIndex: 100,	//最低的z-index
		maxIndex: 300,	//最高的z-index
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
		imgLiCss: { 
			/*图片容器的css*/
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
	}			