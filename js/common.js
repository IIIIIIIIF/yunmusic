//让所有字体可以使用rem的方法
//将body字体设置到50，这样从PSD拿到的字体大小就可以相互对应了，例如：PSD font-size:100px;   REM font-size:1rem;
(function (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
      docEl.getElementsByTagName("body")[0].style.fontSize = docEl.style.fontSize;
    };

  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

/*var loginContent = GetQueryString("info");
if(loginContent != null){
	var content = JSON.parse(loginContent);
	if(parseInt(GetQueryString("loginType")) == 0){
		window.localStorage.setItem("commonToken",content.data.token);
		window.localStorage.setItem("wechatOpenId",content.data.wechatOpenId);
		location.href = location.href.split("?")[0];
	}else{
		window.localStorage.setItem("commonToken",content.token);
		window.localStorage.setItem("wechatOpenId",content.wechatOpenId);
		location.href = location.href.split("?")[0];
	}
}else{
	
}

var userToken = window.localStorage.getItem("commonToken");
//登录地址
var loginUrl = "";
//c端首页地址
var indexUrl = "";
//路径
var url = "/";
var domain = "";

//判断手机微信
var isMobile = false;
var isWeixin = false;
var _mobile = /mobile/;
var _weixin = /micromessenger/i;
var _ua = navigator.userAgent.toLocaleLowerCase();
if (_mobile.test(_ua) && !_weixin.test(_ua)) {
    isMobile = true;
}
if (_weixin.test(_ua)) {
    isWeixin = true;
}

var urlHref = window.location.href.split('/')
if(urlHref[2] == "testwww.runnar.net"){
	domain=".runnar.net"
	loginUrl="http://testuser.runnar.net/loginmob";
	indexUrl = "http://testwww.runnar.net/mobile/home";
}else if(urlHref[2] == "www.irunnar.com"){
	domain=".irunnar.com";
	loginUrl="http://passport.runnar.net/loginmob";
	indexUrl = "http://www.irunnar.com/mobile/home";
}else if(urlHref[2] == "www.runnar.net"){
	domain=".runnar.net";
	loginUrl="http://passport.runnar.net/loginmob";
	indexUrl = "http://www.runnar.net/mobile/home";
}else{
	domain=".irunnar.com";
	loginUrl="http://passport.runnar.net/loginmob";
	indexUrl = "http://www.irunnar.com/mobile/home";
}


//设置cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires + ";path=/";
}
//获取cookie
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}

//生成uuid
function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
//        s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}

//截取url字符串
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)return unescape(r[2]);
    return null;
}
*/
