/*
 分析：
 1.鼠标经过小盒子，让遮挡层与大盒子显示出来，离开隐藏
 2.黄色的遮挡层跟随鼠标移动
 3.移动黄色遮挡层，大图片跟随移动
 */
// 获取元素
let mask = document.querySelector('.mask');
let big = document.querySelector('.big');
let sm = document.querySelector('.sm');
// 1.鼠标经过小盒子，让遮挡层与大盒子显示出来，离开隐藏
sm.addEventListener('mouseenter', () => {
	mask.style.display = 'block';
	big.style.display = 'block';
});
sm.addEventListener('mouseleave', () => {
	mask.style.display = 'none';
	big.style.display = 'none';
});

// 2.黄色的遮挡层跟随鼠标移动
// 把鼠标在盒子内的坐标给遮挡层
sm.addEventListener('mousemove', e => {
	// 获取鼠标在盒子内的坐标
	let x = e.pageX - sm.getBoundingClientRect().left;
	let y = e.pageY - sm.getBoundingClientRect().top;
	// 设置遮挡层的坐标
	mask.style.left = x - mask.offsetWidth / 2 + 'px';
	mask.style.top = y - mask.offsetHeight / 2 + 'px';
	// 判断边界
	// mask可移动的最大距离就是大盒子的宽度减去遮挡层的宽度
	let maskX = sm.offsetWidth - mask.offsetWidth;
	let maskY = sm.offsetHeight - mask.offsetHeight;
	// 当遮挡层的left小于0时，让遮挡层的left等于0
	if (mask.offsetLeft <= 0) {
		mask.style.left = 0;
	} else if (mask.offsetLeft >= mask.offsetWidth) {
		// 因为盒子是400px，遮挡层是200px,所以当遮罩层移动200px时，就不应该再移动了，可移动范围就是0-200px;
		mask.style.left = maskX + 'px';
	}
	if (mask.offsetTop <= 0) {
		mask.style.top = 0;
	} else if (mask.offsetTop >= mask.offsetHeight) {
		mask.style.top = maskY + 'px';
	}

	// 3.移动黄色遮挡层，大图片跟随移动
	let bigImg = big.querySelector('img');
	// 计算大图片的最大移动距离 800-500
	let bigMax = bigImg.offsetWidth - big.offsetWidth;
	// 大图片的移动距离 X Y
	// 大图片的移动距离 = 遮挡层的移动距离 * 大图片的最大移动距离 / 遮挡层的最大移动距离
	// 遮挡层的移动距离 * 300 / 200
	let bigX = (mask.offsetLeft * bigMax) / maskX;
	let bigY = (mask.offsetTop * bigMax) / maskY;
	bigImg.style.left = -bigX + 'px';
	bigImg.style.top = -bigY + 'px';
});
