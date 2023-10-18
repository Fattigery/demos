let icon = document.querySelector('.tpf-tianjia');
let feature = document.querySelector('.chat-ext-section');
let dibu = document.querySelector('.main');
let ipt = document.querySelector('.chat-tool input');
icon.addEventListener('click', function () {
	feature.style.display = 'block';
});
dibu.addEventListener('click', hide);
ipt.addEventListener('click', hide);

function hide() {
	feature.style.display = 'none';
}
