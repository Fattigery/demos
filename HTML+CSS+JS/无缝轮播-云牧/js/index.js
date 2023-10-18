// 获取左右按钮和图片列表盒子
let left = document.querySelector('.left');
let right = document.querySelector('.right');
let imgList = document.querySelector('.img-list');

// 无缝轮播的关键，
// 克隆第一张图片到最后一张图片后面，
let clonefirstImg = imgList.firstElementChild.cloneNode();
// 克隆最后一张图片到第一张图片前面，
// let clonelastImg = imgList.lastElementChild.cloneNode();
imgList.appendChild(clonefirstImg);
// imgList.insertBefore(clonelastImg, imgList.children[0]);

// 定义一个变量，用来记录当前的图片索引
let index = 0;
// 定义一个节流锁，防止频繁点击
let flag = true;
// 右箭头点击事件
right.addEventListener('click', () => {
	if (!flag) return;
	// 关锁
	flag = false;
	index++;
	// 为什么要加过渡，因为在切换到最后一张假图时，需要将过渡去掉，才能无感觉切换到第一张，其他时间还是需要过渡的。
	imgList.style.transition = '.5s ease';
	imgList.style.left = -index * 1226 + 'px';
	if (index == 5) {
		// index=0放在外面是因为，当移动到最后一张假图时，会等500ms后才会无感移动到第一张，如果放在里面，那么给第一个小圆点设置类名时，也会等500ms，而且因为是500ms后才把index=0，所以还需要在定时器中重新调用一下changeActive函数，放在外面就是同步执行的了，先给小圆点添加类名，等500ms后图片会自动切换到第一张。
		index = 0;
		setTimeout(() => {
			imgList.style.left = 0;
			// 取消过渡（进行偷梁换柱）
			// 500毫秒是因为过渡时间是500毫秒，防止抖动
			imgList.style.transition = 'none';
		}, 500);
	}
	changeActive();
	// 开锁
	setTimeout(() => {
		flag = true;
	}, 500);
});

// 左箭头点击事件
// 去掉过渡实现瞬间到最后一张假图，然后利用异步任务后执行的特点，再滑动到最后一张图片
left.addEventListener('click', () => {
	if (!flag) return;
	// 关锁
	flag = false;
	index--;
	if (index == -1) {
		index = 5;
		imgList.style.transition = 'none';
		imgList.style.left = -index * 1226 + 'px';
		// 开启一个异步任务，等上面的同步代码执行完成后再执行定时器中的任务
		index--;
		setTimeout(() => {
			imgList.style.transition = '.5s ease';
			imgList.style.left = -index * 1226 + 'px';
			// changeActive();
		}, 0);
	} else {
		// imgList.style.transition = '.5s ease';
		imgList.style.left = -index * 1226 + 'px';
	}
	changeActive();
	// 开锁
	setTimeout(() => {
		flag = true;
	}, 500);
});

// 小圆点操作
// 根据图片动态生成小圆点
let circleList = document.querySelector('.circle-list');
for (let i = 0; i < imgList.children.length - 1; i++) {
	let li = document.createElement('li');
	li.classList.add('circle');
	li.setAttribute('data-index', i);
	circleList.appendChild(li);
}

// 获取所有小圆点
let circles = document.querySelectorAll('.circle');

// 封装一个根据索引改变小圆点的样式的函数
function changeActive() {
	// 将上一次有小圆点样式的移除
	if (document.querySelector('.circle.active')) {
		document.querySelector('.circle.active').classList.remove('active');
	}
	// 让索引和小圆点对应的小圆点添加类名
	circles.forEach(item => {
		if (item.dataset.index == index) {
			item.classList.add('active');
		}
	});
}
// 页面加载先执行一次
changeActive();

// 事件代理，给小圆点绑定点击事件
// 小圆点点击滑动到对应图片事件
circleList.onclick = e => {
	// 判断点击的是不是小圆点
	if (!e.target.hasAttribute('data-index')) return;
	// 获取小圆点自定义属性绑定的index
	let circleIndex = e.target.dataset.index;
	// 切换时有过渡效果
	imgList.style.transition = '.5s ease';
	// 让index = 小圆点的索引
	index = circleIndex;
	// 移动图片
	imgList.style.left = -index * 1226 + 'px';
	// 调用函数给小圆点添加类名
	changeActive();
};

// 自动轮播
let interValId = null;
interValId = setInterval(() => {
	right.click();
}, 2000);

// 鼠标移入移出事件
let arrow = document.querySelector('.arrow');
let wrap = document.querySelector('.wrap');
wrap.onmouseover = () => {
	clearInterval(interValId);
	arrow.style.display = 'block';
};
wrap.onmouseout = () => {
	arrow.style.display = 'none';
	interValId = setInterval(() => {
		right.click();
	}, 2000);
};
