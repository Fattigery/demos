// https://query.asilu.com/weather/baidu/?city=%E5%8C%97%E4%BA%AC&callback=weather

function weather(data) {
	let dateDayName = document.querySelector('.date-dayname');
	let dateDay = document.querySelector('.date-day');
	let location = document.querySelector('.location');
	// 天气图标
	let weather1 = document.querySelector('#weather-1');
	let weatherTemp = document.querySelector('.weather-temp');
	let weatherDesc = document.querySelector('.weather-desc');
	dateDayName.innerHTML = data.weather[0].date.split('（')[0];
	dateDay.innerHTML = '2022年' + data.date;
	location.innerHTML = '&#xe617;' + data.city;

	weather1.innerHTML = weatherIcon(1);
	weatherTemp.innerHTML = data.weather[0].temp;
	weatherDesc.innerHTML = data.weather[0].weather;
	console.log(data.weather[0].weather);
	// 封装一个判断天气选择图标的函数
	// 参数t为第几天
	function weatherIcon(t) {
		switch (data.weather[t - 1].weather) {
			case '多云':
				return '&#xe624;';
			case '小雨':
				return '&#xe622;';
			case '阴':
				return '&#xe624;';
			case '阴转小雨':
				return '&#xe642;';
			case '晴':
				return '&#xe61f;';
			case '阵雨转多云':
				return '&#xe644;';
			default:
				return '&#xe61f;';
		}
	}

	// 湿度风速等
	let pm = document.querySelector('.pm .value');
	let humidity = document.querySelector('.humidity .value');
	let wind = document.querySelector('.wind .value');

	pm.innerHTML = data.weather[0].icond;
	humidity.innerHTML = data.weather[0].iconn;
	wind.innerHTML = data.weather[0].wind;

	let weekList = document.querySelectorAll('.week-list li');
	for (let i = 0; i < weekList.length; i++) {
		weekList[i].querySelectorAll('span')[0].innerHTML = weatherIcon(i + 1);
		weekList[i].querySelectorAll('span')[1].innerHTML = data.weather[i + 1].date.split('（')[0];
		weekList[i].querySelectorAll('span')[2].innerHTML = data.weather[i + 1].temp;

		// 切换类名
		weekList[i].onclick = function () {
			console.log(document.querySelector('.active'));
			document.querySelector('.active').classList.remove('active');
			this.classList.add('active');
		};
	}
}

let btn = document.querySelector('.location-button');
let city = document.querySelector('#city');

btn.onclick = function () {
	// 判断输入内容
	if (city.value.trim().length > 0) {
		// JSONP，callback调用指定的回调函数，并把数据通过形参进行传递
		let script = document.createElement('script');
		script.src = `https://query.asilu.com/weather/baidu/?city=${city.value}&callback=weather`;

		// 插入到页面中
		document.body.appendChild(script);
		city.value = '';
		// 两秒后自动清除这个script标签
		setTimeout(function () {
			document.querySelector('script[src^="https://query"]').remove();
		}, 2000);
	} else {
		console.log('请输入城市名称');
	}
};

// 页面加载后自动调用一次
window.onload = function () {
	city.value = '北京';
	btn.onclick();
};
