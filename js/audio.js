Vue.component("audio-tool", {
	props: ['nowmusicname', 'nowsingname', 'playimg'],
	template: '<div class="MusicPlay" id="musicBox" v-cloak><div class="mp-left"><img class="mp-img" src="NeteaseCloudMusicApi/docs/favicon.ico"/><div class="M-abs"><p>{{nowmusicname}}</p><p>{{nowsingname}}</p></div></div><div class="mp-right"><img class="mrimg songMenu" src="imgs/songMenu.png"/><img class="mrimg musicControl" :src="playimg"/></div><audio id="musicTool"></audio></div>'
})
var musicApp = new Vue({
	el: "#musicApp",
	data: {
		playimg: "imgs/playNow.png",
		nowmusicname: "告白气球",
		nowsingname: "周杰伦"
	}
})
var audioEle = document.getElementById("musicTool");
mui(document.body).on('tap', '.musicControl', function(e) {

	//	console.log(musicApp.playimg)
	if(musicApp.playimg == "imgs/playNow.png") {
		/*此时音乐播放*/
		musicApp.playimg = "imgs/playStop.png";
		var playPromise = audioEle.play();
		if(playPromise) {

		}

	} else {
		/*此时音乐暂停*/
		musicApp.playimg = "imgs/playNow.png";
		audioEle.pause();
	}
});