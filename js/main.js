/*正则*/
var emailReg=/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
/*正则*/
var nginxUrl="http://localhost:8083/proxy/html";
/*获取传递参数*/
  function GetQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");  //寻找&+url参数名=参数值+&.&可以不存在
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
    }
/*获取传递参数*/
/*ajax封装*/
var musicAjax=function($,url,callback){
	$.ajax(url,{
	dataType:'json',//服务器返回json格式数据
	type:'get',//HTTP请求类型
	timeout:10000,//超时时间设置为10秒；
	xhrFields: { withCredentials: true },
	headers:{'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'},	              
	success:function(data){
		callback(data);
	},
	error:function(xhr,type,errorThrown){
		//异常处理；
		console.log(type,xhr,errorThrown);
	}
});
}

/*ajax封装*/
var loginStatus=function($){
	$.ajax(nginxUrl+'/login/status',{
	dataType:'json',//服务器返回json格式数据
	type:'get',//HTTP请求类型
	timeout:10000,//超时时间设置为10秒；
	xhrFields: { withCredentials: true },
	headers:{'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'},	              
	success:function(data){
	//	console.log(data);
		if(data.code==200){
			offCanvasWrapperApp.loginStatus=false;
			offCanvasWrapperApp.username=data.profile.nickname;
			offCanvasWrapperApp.avatarUrl=data.profile.avatarUrl;
		}
	},
	error:function(xhr,type,errorThrown){
		//异常处理；
		console.log(type,xhr,errorThrown);
	}
});
}
var userLogin=function($){
	document.getElementById('loginBtn').addEventListener('tap', function(){
	/*var email = document.getElementById('account').value;
	if(!emailReg.test(email)){
	  $.toast('邮箱格式不正确');
	  return false;
	}
	var pwd      = document.getElementById('password').value;
 	if(pwd.length < 6){
		$.toast('密码至少6个字符');
		return false;
	}*/
 	var email="13323338673@163.com";
 	var	pwd="as123as."
 	$("#loginBtn").button('loading');//切换为loading状态
 	 $.ajax({
      url: nginxUrl+"/login",
      xhrFields: {
        withCredentials: true
      },
      data: {
      	email:email,
      	password:pwd
      },
      type:"get",
      success: function (data) {
        if(data.code==200){
        	 mui.openWindow({
							url:"index.html",
							id:"index"
						})
        }
       	$("#loginBtn").button('reset');//切换为loading状态
      },
      error: function (err) {
      	console.log(JSON.stringify(err))
       // console.log(err)
      }
   });
});
}

/*轮播*/
var getBanner=function($){
	$.ajax(nginxUrl+'/banner',{
	dataType:'json',//服务器返回json格式数据
	type:'get',//HTTP请求类型
	timeout:10000,//超时时间设置为10秒；
	xhrFields: { withCredentials: true },
	headers:{'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'},	              
	success:function(data){
	//	console.log(data);
		if(data.code==200){
			offCanvasWrapperApp.banners=data.banners;
			offCanvasWrapperApp.length=data.banners.length-1;
			offCanvasWrapperApp.firstBanners=data.banners[0]
			offCanvasWrapperApp.lastBanners=data.banners[data.banners.length-1]
		}
	},
	error:function(xhr,type,errorThrown){
		//异常处理；
		console.log(type,xhr,errorThrown);
	}
});
}
/*每日推荐歌单*/
var getRecommendResource=function($){
	$.ajax(nginxUrl+'/recommend/resource',{
	dataType:'json',//服务器返回json格式数据
	type:'get',//HTTP请求类型
	timeout:10000,//超时时间设置为10秒；
	xhrFields: { withCredentials: true },
	headers:{'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'},	              
	success:function(data){
	//	console.log(data);
		if(data.code==200){
			offCanvasWrapperApp.RecommendResource=data.recommend
		}
	},
	error:function(xhr,type,errorThrown){
		//异常处理；
		console.log(type,xhr,errorThrown);
	}
});
}
/*首页每日推荐电台*/
var getRecommendmusic=function($){
	$.ajax(nginxUrl+'/personalized/djprogram',{
	dataType:'json',//服务器返回json格式数据
	type:'get',//HTTP请求类型
	timeout:10000,//超时时间设置为10秒；
	xhrFields: { withCredentials: true },
	headers:{'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'},	              
	success:function(data){
		//console.log(data);
		if(data.code==200){
			offCanvasWrapperApp.RecommendRDjprogram=data.result
		}
	},
	error:function(xhr,type,errorThrown){
		//异常处理；
		console.log(type,xhr,errorThrown);
	}
});
}
/*每日推荐歌单列表详情*/
var getGedanList=function($,id){
	var url=nginxUrl+'/playlist/detail?id='+id
	musicAjax($,url,function(data){
	//	console.log(data);
		if(data.code==200){
			gedanApp.styleobj.background="url("+data.playlist.coverImgUrl+")";
			gedanApp.picUrl=data.playlist.coverImgUrl
			gedanApp.playCount=data.playlist.playCount;
			gedanApp.name=data.playlist.name;
			gedanApp.avatarUrl=data.playlist.creator.avatarUrl;
			gedanApp.nickname=data.playlist.creator.nickname;
			gedanApp.trackCount=data.playlist.trackCount;
			gedanApp.tracks=data.playlist.tracks;
		}
		
	})
}
/*获取音乐*/
var getMusic=function($,id){
	var url=nginxUrl+'/song/url?id='+id
	musicAjax($,url,function(data){
	//	console.log(data);
		if(data.code==200){
			getMusicStatus($,id,data)	
		}	
	})
}
/*查看音乐是否可用*/
var getMusicStatus=function($,id,data){
	var url=nginxUrl+'/check/music?id='+id
	musicAjax($,url,function(res){
	//	console.log(res);
		if(res.success==true){
	//		console.log(data.data);
			audioEle.setAttribute("src", data.data[0].url);
			musicApp.playimg="imgs/playStop.png";	
			audioEle.play();		
		}else{
			mui.toast(res.message)
		}
	})
}

/*获取歌单分类*/
var getCatlist=function($){
	var url=nginxUrl+'/playlist/catlist'
	musicAjax($,url,function(data){
//		console.log(data);
		if(data.code==200){
			
		}	
	})
}
/*获取热搜*/
var getSearchhotlist=function($){
	var url=nginxUrl+'/search/hot'
	musicAjax($,url,function(data){
	//	console.log(data);
		if(data.code==200){
			hotApp.hotlist=data.result.hots
		}	
	})
}
/*搜索结果*/
var getSearchMultimatch=function($,key){
	var url=nginxUrl+'/search/multimatch?keywords='+key
	musicAjax($,url,function(data){
	//	console.log(data);
		if(data.code==200){
		
		}	
	})
}

/*排行榜内容摘要*/
var getTopdetailList=function($){
	var url=nginxUrl+'/toplist/detail'
	musicAjax($,url,function(data){
		console.log(data);
		if(data.code==200){
		
		}	
	})
}
