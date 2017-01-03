require('../../sass/media.scss');
require('../../sass/swiper.min.css');
var $ = require('webpack-zepto');
var swiper = require('swiper');


$(document).ready(function() {
  var version = '1.0.5.0';

  var hasHotInit      = false;
  var hasVideoClick   = false;
  var hasPictureClick = false;
  var hasMusicClick   = false;

  var currentTag = 'tag_HOT';
  var dataurl    = 'http://igodownload.com/vcdownloader/api/vcd/info.do';
  //var datatest   = 'http://52.66.17.184:7070/vcdownloader/api/vcd/info.do';

  var Hot     = $('.tab1')[0];
  var Video   = $('.tab2')[0];
  var Picture = $('.tab3')[0];
  var Music   = $('.tab4')[0];

  var hotSort   = 0;
  var videoSort = 0;
  var picSort   = 0;
  var musicSort = 0;

  var hotLen   = 0;
  var videoLen = 0;
  var picLen   = 0;

  var hotIndex     = 0;
  var videoIndex   = 0;
  var pictureIndex = 0;
  var musicIndex   = 0;

  var hotToEnd   = false;
  var videoToEnd = false;
  var picToEnd   = false;
  var musicToEnd = false;


  var hotPos   = 0;
  var videoPos = 0;
  var picPos   = 0;
  var musicPos = 0;


  var hotLoading   = true;
  var videoLoading = true;
  var picLoading   = true;
  var musicLoading = true;

  var hotError   = false;
  var videoError = false;
  var picError   = false;
  var musicError = false

  var errorPage  = document.getElementById('wrongPage');

  function trackLoadCount(type, which) {
    ga('send', 'event', '资源页', type, which);
  }
  function errorTrack(type, which) {
    ga('send', 'event', '资源页', type, which);
  }

 	function handlColor(n) {
 		var arr = $('.tab');
 		var array = $('.content');
 		for (var i = 0; i < arr.length; i++) {
 			if (i == n) {
 				$(arr[i]).addClass('encolor');
 				$(array[i]).css({'display':'block'});
 			} else {
 				$(arr[i]).removeClass('encolor');
 				$(array[i]).css({'display':'none'});
 			}
 		}
 }

  function GetQueryString(param) {
    var version = '1.0.5.0';
    var reg = new RegExp("(^|&)"+ param +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r != null) {
      version = unescape(r[2]);
    }
    return version;
  }

  function createBannerItems(n, arr) {
    var bannerStr = '';
    var bannerIndex = 0;
    for (var i = 0; i < n; i++) {
      bannerIndex++;
      bannerStr += '<div class="swiper-slide">\
                      <a type="" onclick="trackBanner(this)" myname="banner-'+bannerIndex+'" class="bannerA" gyhref="" type="" dis="">\
                        <img class="bannerIMG" src="">\
                      </a>\
                      <div class="gradient">\
                        <p class="imgAlt bannerP"></p>\
                      </div>\
                  </div>\
                  ';
    }
    return bannerStr;
  }

  function createHotItems(n, arr) {
    var hotStr = '';
    var string = '';
    for (var i = 0; i < n; i++) {
      var cover  = arr[i].cover;
      var url    = arr[i].url;
      var title  = arr[i].title;
      var count  = arr[i].count;
      var size   = arr[i].size;
      var time   = arr[i].duration;
      var author = arr[i].author;
      var imgNum = arr[i].imgNum;

      var conDis = encodeURI(arr[i].contentDisposition);
      var mtype  = arr[i].mimetype;
      var link   = arr[i].url;
      var typeCode = arr[i].code;
      hotIndex++;
      if (hotIndex > 20) {
        string = 'onclick="trackHot(this)" ';
      } else {
        string = 'onclick="trackHot(this)" myname="tuijian-'+hotIndex+'" ';
      }
      if (typeCode == 'Video') {
        hotStr += '<dl class = "Conlists">\
                    <dt class="typeImg typevideoImg">\
                      <div class="bgImg"></div>\
                      <div class="describe describe1">\
                        <span></span>\
                      </div>\
                       <img src="'+cover+'">\
                    </dt>\
                    <dd class="typeText typeText1">\
                      <div class="conTittle">'+title+'</div>\
                      <div class="downNum"><span class="icon loadIcon"></span><span class="loadNum">'+count+'</span></div>\
                      <div class="resourceSize">\
                        <span class="icon timeIcon"></span><span class="verifyNum">'+time+'</span>\
                      </div>\
                    </dd>\
                    <dd class="typeBtn typeBtn1">\
                      <a '+string+'gyhref="'+link+'" type="'+mtype+'" dis="'+conDis+'">\
                        <div class="loadBtn">\
                          <span class="loadArrow"></span>\
                        </div>\
                      </a>\
                    </dd>\
                  </dl>\
                  ';
      } else if (typeCode == 'Music') {
        hotStr += '<dl class = "Conlists">\
                    <dt class="typeImg typeMusicImg">\
                      <div class="bgImg"></div>\
                      <div class="describe describe2">\
                        <span></span>\
                      </div>\
                      <img src="'+cover+'">\
                    </dt>\
                    <dd class="typeText typeText2">\
                      <div class="conTittle">'+title+'</div>\
                      <div class="author"><span class="icon authorIcon"></span><span class="authorName">'+author+'</span></div>\
                      <div class="downNum"><span class="icon loadIcon"></span><span class="loadNum">'+count+'</span></div>\
                      <div class="resourceSize">\
                        <span class="icon verifyIcon"></span><span class="verifyNum">'+size+'</span>\
                      </div>\
                    </dd>\
                    <dd class="typeBtn typeBtn2">\
                      <a '+string+'gyhref="'+link+'" type="'+mtype+'" dis="'+conDis+'">\
                        <div class="loadBtn">\
                          <span class="loadArrow"></span>\
                        </div>\
                      </a>\
                    </dd>\
                  </dl>\
                  ';
      } else if (typeCode == 'Picture') {
        hotStr += '<dl class = "Conlists">\
                    <dt class="typeImg typePicImg">\
                      <div class="bgImg"></div>\
                      <div class="describe describe1">\
                        <span>'+imgNum+'</span>\
                      </div>\
                      <img src="'+cover+'">\
                    </dt>\
                    <dd class="typeText typeText1">\
                      <div class="conTittle">'+title+'</div>\
                      <div class="downNum"><span class="icon loadIcon"></span><span class="loadNum">'+count+'</span></div>\
                      <div class="resourceSize">\
                        <span class="icon verifyIcon"></span><span class="verifyNum">'+size+'</span>\
                      </div>\
                    </dd>\
                    <dd class="typeBtn typeBtn1">\
                      <a '+string+'gyhref="'+link+'" type="'+mtype+'" dis="'+conDis+'">\
                        <div class="loadBtn">\
                          <span class="loadArrow"></span>\
                        </div>\
                        </a>\
                    </dd>\
                  </dl>\
                  ';
      }
    }
    return hotStr;
  }

  function createVideoItems(n, arr) {
    var videoStr = '';
    var string   = '';
    for (var i = 0; i < n; i++) {
      var time  = arr[i].duration;
      var title = arr[i].title;
      var count = arr[i].count;
      var cover = arr[i].cover;
      var conDis = encodeURI(arr[i].contentDisposition);
      var mtype  = arr[i].mimetype;
      var link  = arr[i].url;
      videoIndex++;
      if (videoIndex > 10) {
        string = 'onclick="trackVideo(this)" ';
      } else {
        string = 'onclick="trackVideo(this)" myname="video-'+videoIndex+'" ';
      }
      videoStr += '<a '+string+'gyhref="'+link+'" type="'+mtype+'" dis="'+conDis+'">\
                    <dl class = "classifyList videoList">\
                      <dt class="typeImg videoImg">\
                        <img src="'+cover+'">\
                        <div class="bgImg"></div>\
                        <div class="describe describe1">\
                          <span>'+time+'</span>\
                        </div>\
                      </dt>\
                      <dd class="typeText typeText1">\
                        <div class="conTittle">'+title+'</div>\
                        <div class="downNum"><span class="icon loadIcon"></span><span class="loadNum">'+count+'</span></div>\
                      </dd>\
                    </dl>\
                  </a>\
                  ';
              }
      return videoStr;
  }

  function createPicItems(n, arr) {
    var picStr = '';
    var string = '';
    for (var i = 0; i < n; i++) {
      var imgCount = arr[i].imgNum;
      var title    = arr[i].title;
      var count    = arr[i].count;
      var size     = arr[i].size;
      var cover    = arr[i].cover;
      var conDis = encodeURI(arr[i].contentDisposition);
      var mtype  = arr[i].mimetype;
      var link   = arr[i].url;
      pictureIndex++;
      if (pictureIndex > 10) {
        string = 'onclick="trackPicture(this)" ';
      } else {
        string = 'onclick="trackPicture(this)" myname="picture-'+pictureIndex+'" ';
      }
      picStr += '<a '+string+'gyhref="'+link+'" type="'+mtype+'" dis="'+conDis+'">\
                  <dl class = "classifyList picList">\
                    <dt class="typeImg picImg">\
                      <div class="bgImg"></div>\
                      <img src="'+cover+'">\
                      <div class="describe describe1">\
                        <span>'+imgCount+'</span>\
                      </div>\
                    </dt>\
                    <dd class="typeText typeText1">\
                      <div class="conTittle">'+title+'</div>\
                      <div class="downNum"><span class="icon loadIcon"></span><span class="loadNum">'+count+'</span></div>\
                      <div class="resourceSize">\
                        <span class="icon verifyIcon"></span><span class="verifyNum">'+size+'</span>\
                      </div>\
                    </dd>\
                  </dl>\
                </a>\
                  ';
    }
    return picStr;
  }

  function createMusicItems(n, arr) {
    var musicStr = '';
    var string   = '';
    for (var i = 0; i < n; i++) {
      var title  = arr[i].title;
      var count  = arr[i].count;
      var size   = arr[i].size;
      var cover  = arr[i].cover;
      var conDis = encodeURI(arr[i].contentDisposition);
      var mtype  = arr[i].mimetype;
      var link   = arr[i].url;
      var author = arr[i].author;
      musicIndex++;
      if (musicIndex > 10) {
        string = 'onclick="trackMusic(this)" ';
      } else {
        string = 'onclick="trackMusic(this)" myname="music-'+musicIndex+'" ';
      }
      musicStr += '<a '+string+'gyhref="'+link+'" type="'+mtype+'" dis="'+conDis+'">\
                    <dl class = "classifyList picList">\
                      <dt class="typeImg picImg">\
                        <div class="bgImg"></div>\
                        <img src="'+cover+'">\
                        <div class="author"><span class="icon authorIcon"></span><span class="authorName">'+author+'</span></div>\
                      </dt>\
                      <dd class="typeText typeText1">\
                        <div class="conTittle">'+title+'</div>\
                        <div class="downNum"><span class="icon loadIcon"></span><span class="loadNum">'+count+'</span></div>\
                        <div class="resourceSize">\
                          <span class="icon verifyIcon"></span><span class="verifyNum">'+size+'</span>\
                        </div>\
                      </dd>\
                    </dl>\
                  </a>\
                  ';
    }
    return musicStr;
  }

  function dataOver() {
    $('#loading').css({'display':'none'});
    $('.bottom').css({'display':'block'});
  }

  function dataNotOver() {
    $('#loading').css({'display':'block'});
    $('.bottom').css({'display':'none'});
  }

  function whetherEnd(bool) {
    if (bool) {
      dataOver();
    } else {
      dataNotOver();
    }
  }

  function loadingState() {
    $('#loading').show();
    //$('#wrongPage').hide();
  }

  function online(content) {
    $(content).show();
    $('#wrongPage').hide();
  }
  function offline(content, curTag) {
    $(content).hide();
    $('#loading').hide();
    if (currentTag == curTag) {
      $('#wrongPage').show();
    } else {
      // $('#wrongPage').hide();
    }
  }

  function timeOutProcess() {
    $('#timeOut').show();
    var l = ($(window).width() - $('#timeOut').width()) / 2;
    $('#timeOut').css({'margin-left':l});
    setTimeout(function() {
      $('#timeOut').hide();
    }, 2000);
    $('#loading').hide();
  }

  function hideLoadingInit(l) {
    if (l < 10) {
      dataOver();
      return true;
    }
    return false;
  }

  function hotAjax() {
    if (!hasHotInit) {
      hotError = true;
      hasHotInit = true;
      loadingState();
      $.ajax({
        type : "GET",
        url  : dataurl,
        //url : 'http://172.17.133.114:8080/hot.json',
        timeout: 15000,
        data : {
          "code": "Hot",
          "sort": hotSort,
          "ver" : version,
          "checkFlag": false
        },
        success : function(data) {
          online('.content1');
          handlColor(0);
          var len = data.HotList.length;
          if (len == 0) {
            dataOver();
            hotToEnd = true;
          } else {
            var str = createHotItems(len, data.HotList);
            $('.mainWrap').append($(str));
            hotSort = data.HotList[len - 1].sort;
          }
          if (hideLoadingInit(len)) {
            dataOver();
            hotToEnd = true;
          }
          $('#loading').hide();
          hotLoading = false;
          hotError = false;
          trackLoadCount('推荐页手动加载', '推荐手动次数');
        },
        error: function() {
          offline('.content1', 'tag_HOT');
          hotError = true;
          hasHotInit = false;
          errorTrack('加载错误','推荐错误次数');
        },
        complete: function(XMLHttpRequest, status) {
          hotLoading = false;
          if (status == 'timeout') {
            timeOutProcess();
          }
        }
      });
    }
  }

  function videoAjax() {
    loadingState();
    videoError = true;
    $.ajax({
      type : "GET",
      url : dataurl,
      //url : 'http://172.17.129.200:8080/video.json',
      timeout: 15000,
      data : {
        "code": "Video",
        "sort": videoSort,
        "ver" : version,
        "checkFlag": false
      },
      success: function(data) {
        online('.content2');
        handlColor(1);
        var len = data.VideoList.length;
        if (len == 0) {
          dataOver();
          videoToEnd = true;
        } else {
          var str = createVideoItems(len, data.VideoList);
          $('.content2').append($(str));
          videoSort = data.VideoList[len - 1].sort;
        }
        if (hideLoadingInit(len)) {
          dataOver();
          videoToEnd = true;
        }
        $('#loading').hide();
        videoLoading  = false;
        videoError = false;
        trackLoadCount('视频页手动加载', '视频手动次数');
      },
      error: function() {
        videoError = true;
        offline('.content2', 'tag_VIDEO');
        errorTrack('加载错误','视频错误次数');
      },
      complete: function(XMLHttpRequest, status) {
        videoLoading = false;
        if (status == 'timeout') {
          timeOutProcess();
        }
      }
    });
  }

  function pictureAjax() {
    loadingState();
    picError = true;
    $.ajax({
      type : "GET",
      url  : dataurl,
      //url : 'http://172.17.133.114:8080/picture.json',
      timeout: 15000,
      data : {
        "code": "Picture",
        "sort": picSort,
        "ver" : version,
        "checkFlag": false
      },
      success: function(data) {
        online('.content3');
        handlColor(2);
        var len = data.PictureList.length;
        if (len == 0) {
          dataOver();
          picToEnd = true;
        } else {
          var str = createPicItems(len, data.PictureList);
          $('.content3').append($(str));
          picSort = data.PictureList[len - 1].sort;
        }
        $('#loading').hide();
        if (hideLoadingInit(len)) {
          dataOver();
          picToEnd = true;
        }
        picLoading = false;
        picError = false;
        trackLoadCount('图片页手动加载', '图片手动次数');
      },
      error: function() {
        picError = true;
        offline('.content3', 'tag_PICTRUE');
        errorTrack('加载错误','图片错误次数');
      },
      complete: function(XMLHttpRequest,status) {
        picLoading = false;
        if (status == 'timeout') {
          timeOutProcess();
        }
      }
    });
  }


  function musicAjax() {
   loadingState();
    musicError = true;
    $.ajax({
      type : "GET",
      url  : dataurl,
      //url  : 'http://172.17.133.114:8080/music.json',
      timeout: 15000,
      data : {
        "code": "Music",
        "sort": musicSort,
        "ver" : version,
        "checkFlag": false
      },
      success: function(data) {
        online('.content4');
        handlColor(3);
        var len = data.MusicList.length;
        if (len == 0) {
          dataOver();
          musicToEnd = true;
        } else {
          var str = createMusicItems(len, data.MusicList);
          $('.content4').append($(str));
          musicSort = data.MusicList[len - 1].sort;
        }
        $('#loading').hide();
        if (hideLoadingInit(len)) {
          dataOver();
          musicToEnd = true;
        }
        musicLoading  = false;
        musicError = false;
        trackLoadCount('音乐页手动加载', '音乐手动次数');
      },
      error: function() {
        musicError = true;
        offline('.content4', 'tag_MUSIC');
        errorTrack('加载错误','音乐错误次数');
      },
      complete: function(XMLHttpRequest,status) {
        musicLoading = false;
        if (status == 'timeout') {
          timeOutProcess();
        }
      }
    });
  }

  function addClickEvent() {
    switch (currentTag) {
      case 'tag_HOT':
        hotAjax();
        errorPage.onclick = function() {
          hotAjax();
        };
        break;
      case 'tag_VIDEO':
        videoAjax();
        break;
      case 'tag_PICTRUE':
        pictureAjax();
        break;
      case 'tag_MUSIC':
        musicAjax();
        break;
      default:
        break;
    }
  }


  function errorState(whichContent) {
    $(whichContent).hide();
    $('#wrongPage').show();
    $('#loading').hide();
  }


  Hot.onclick = function() {
    errorPage.onclick = function() {
      hotAjax();
    };
    currentTag = 'tag_HOT';
    $('#wrongPage').hide();
  	handlColor(0);
    whetherEnd(hotToEnd);
    if (hotError) {
      errorState('.content1');
      return;
    }
    $(window).scrollTop(hotPos);
    addClickEvent();
  };

  Video.onclick = function() {
    errorPage.onclick = function() {
      videoAjax();
    };
    currentTag = 'tag_VIDEO';
    $('#wrongPage').hide();
  	handlColor(1);
    whetherEnd(videoToEnd);
    if (videoError) {
      errorState('.content2');
      return;
    }
    $(window).scrollTop(videoPos);
  	if (!hasVideoClick) {
      hasVideoClick = true;
      $.ajax({
        type : "GET",
        url  : dataurl,
        //url : 'http://172.17.133.114:8080/vbanner.json',
        data : {
          "code": "Video-Banner-1",
          "sort": 0,
          "ver" : version,
          "checkFlag": false
        },
        success: function(data) {
          var result  = data['Video-Banner-1List'][0];
          var link    = result.url;
          var mtype   = result.mimetype;
          var conDis  = encodeURI(result.contentDisposition);
          $('#videoBanner').attr('gyhref',link);
          $('#videoBanner').attr('type',mtype);
          $('#videoBanner').attr('dis', conDis);
          $('#vbsrc').attr('src',result.cover);
          $('#vbcount').text(result.count);
          $('#vbtitle').text(result.title);
          $('#vbtime').text(result.duration);
        },
        error: function() {
          errorTrack('加载错误','视频错误次数');
        }
      });
      addClickEvent();
  	}
  };


  Picture.onclick = function() {
    currentTag = 'tag_PICTRUE';
    errorPage.onclick = function() {
      pictureAjax();
    };
    $('#wrongPage').hide();
  	handlColor(2);
    whetherEnd(picToEnd);
    if (picError) {
      errorState('.content3');
      return;
    }
    $(window).scrollTop(picPos);
  	if (!hasPictureClick) {
      hasPictureClick = true;
      $.ajax({
        type : "GET",
        url  : dataurl,
        //url : 'http://172.17.133.114:8080/pbanner.json',
        data : {
          "code": "Picture-Banner-1",
          "sort": 0,
          "ver" : version,
          "checkFlag": false
        },
        success: function(data) {
          var result = data['Picture-Banner-1List'][0];
          var link   = result.url;
          var mtype  = result.mimetype;
          var conDis = encodeURI(result.contentDisposition);
          $('#pictureBanner').attr('gyhref',link);
          $('#pictureBanner').attr('type',mtype);
          $('#pictureBanner').attr('dis',conDis);
          $('#pbposter').attr('src',result.cover);
          $('#pbcount').text(result.count);
          $('#pbtitle').text(result.title);
        },
        error: function() {
          errorTrack('加载错误','图片错误次数');
        }
      });
      addClickEvent();
  	}
  };

  Music.onclick = function() {
    currentTag = 'tag_MUSIC';
    errorPage.onclick = function() {
      musicAjax();
    };
    $('#wrongPage').hide();
  	handlColor(3);
    whetherEnd(musicToEnd);
    if (musicError) {
      errorState('.content4');
      return;
    }
    $(window).scrollTop(musicPos);
  	if (!hasMusicClick) {
      hasMusicClick = true;
      $.ajax({
        type : "GET",
        url  : dataurl,
        //url : 'http://172.17.133.114:8080/mbanner.json',
        data : {
          "code": "Music-Banner-1",
          "sort": 0,
          "ver" : version,
          "checkFlag": false
        },
        success: function(data) {
          var result  = data['Music-Banner-1List'][0];
          var link    = result.url;
          var mtype   = result.mimetype;
          var conDis  = encodeURI(result.contentDisposition);
          $('#musicBanner').attr('gyhref',link);
          $('#musicBanner').attr('type',mtype);
          $('#musicBanner').attr('dis',conDis);
          $('#mbsrc').attr('src',result.cover);
          $('#mbcount').text(result.count);
          $('#mbtitle').text(result.title);
        },
        error: function() {
          errorTrack('加载错误','音乐错误次数');
        }
      });
      addClickEvent();
  	}
  };

  /*----------------------------------------------main---------------------------------------------*/
  version = GetQueryString('ver');
	$.ajax({
		type : "GET",
		url  : dataurl,
    //url : 'http://172.17.133.114:8080/banner.json',
		data : {
			"code": "Banner",
			"sort": 0,
      "ver" : version,
      "checkFlag": false
		},
		success  : function(data) {
      var arr = data.BannerList;
      var srclen  = arr.length;
      var string = createBannerItems(srclen, arr);
      $('.swiper-wrapper').append($(string));
      var BannerSwiper = new Swiper('#swiper-container1',{
        speed:300,
        direction: 'horizontal',
        autoplay:2000,
        loop:true,
        pagination : '#pagination1',
        paginationClickable: true,
        autoplayDisableOnInteraction: false
      });

      var bannerIMGArr = $('.bannerIMG');
      var bannerPArr   = $('.bannerP');
      var bannerAArr   = $('.bannerA');
      var destlen = bannerIMGArr.length;
      bannerIMGArr[0].src = arr[srclen - 1].cover;
      for (var i = 1; i < destlen - 1; i++) {
        bannerIMGArr[i].src = arr[i - 1].cover;
      }
      bannerIMGArr[destlen - 1].src = arr[0].cover;
      bannerPArr[0].innerText = arr[srclen - 1].title;
      for (var j = 1; j < destlen - 1; j++) {
        bannerPArr[j].innerText = arr[j - 1].title;
      }
      bannerPArr[destlen - 1].innerText = arr[0].title;
      bannerAArr[0].setAttribute('gyhref', arr[srclen - 1].url);
      for (var s = 1; s < destlen - 1; s++) {
        bannerAArr[s].setAttribute('gyhref', arr[s - 1].url);
      }
      bannerAArr[destlen - 1].setAttribute('gyhref', arr[0].url);
      bannerAArr[0].setAttribute('type', arr[srclen - 1].mimetype);
      for (var r = 1; r < destlen - 1; r++) {
        bannerAArr[r].setAttribute('type', arr[r - 1].mimetype);
      }
      bannerAArr[destlen - 1].setAttribute('type', arr[0].mimetype);
      bannerAArr[0].setAttribute('dis', encodeURI(arr[srclen - 1].contentDisposition));
      for (var x = 1; x < destlen - 1; x++) {
        bannerAArr[x].setAttribute('dis', encodeURI(arr[x - 1].contentDisposition));
      }
      bannerAArr[destlen - 1].setAttribute('dis', encodeURI(arr[0].contentDisposition));
		},
    error: function() {
      errorTrack('加载错误','轮播错误次数');
    }
	});

  addClickEvent();

  $(window).scroll(function() {
    var scrollTop = $(this).scrollTop();
    var scrollHeight = $(document).height();
    var windowHeight = $(this).height();
    switch (currentTag) {
      case 'tag_HOT':
        hotPos = scrollTop;
        break;
      case 'tag_VIDEO':
        videoPos = scrollTop;
        break;
      case 'tag_PICTRUE':
        picPos = scrollTop;
        break;
      case 'tag_MUSIC':
        musicPos = scrollTop;
        break;
    }
  　if (scrollTop + windowHeight >= scrollHeight) {
      switch (currentTag) {
        case 'tag_HOT':
          if (hotToEnd) return;
          if (!hotLoading) {
            hotLoading = true;
           loadingState();
            $.ajax({
              type : "GET",
              url  : dataurl,
              //url : 'http://172.17.133.114:8080/hot.json',
              timeout: 15000,
              data : {
                "code": "Hot",
                "sort": hotSort,
                "ver" : version,
                "checkFlag": false
              },
              success : function(data) {
                var len = data.HotList.length;
                if (len == 0) {
                  dataOver();
                  hotToEnd = true;
                } else {
                  dataNotOver();
                  hotToEnd = false;
                  var str = createHotItems(len, data.HotList);
                  $('.mainWrap').append($(str));
                  hotSort = data.HotList[len - 1].sort;
                }
                $('#loading').hide();
                hotLoading = false;
                trackLoadCount('推荐页手动加载', '推荐手动次数');
              },
              error: function() {
                $('#loading').hide();
                errorTrack('加载错误','推荐错误次数');
              },
              complete: function(XMLHttpRequest, status) {
                hotLoading = false;
                if (status == 'timeout') {
                  timeOutProcess();
                }
              }
            });
          }
          break;
        case 'tag_VIDEO':
          if (videoToEnd) return;
          if (!videoLoading) {
            videoLoading = true;
            loadingState();
            $.ajax({
              type : "GET",
              url  : dataurl,
              //url : 'http://172.17.133.114:8080/video.json',
              timeout: 15000,
              data : {
                "code": "Video",
                "sort": videoSort,
                "ver" : version,
                "checkFlag": false
              },
              success: function(data) {
                var len = data.VideoList.length;
                if (len == 0) {
                  dataOver();
                  videoToEnd = true;
                  return;
                } else {
                  dataNotOver();
                  videoToEnd = false;
                  var str = createVideoItems(len, data.VideoList);
                  $('.content2').append($(str));
                  videoSort = data.VideoList[len - 1].sort;
                }
                $('#loading').hide();
                videoLoading = false;
                trackLoadCount('视频页手动加载', '视频手动次数');
              },
              error: function() {
                $('#loading').hide();
                errorTrack('加载错误','视频错误次数');
              },
              complete: function(XMLHttpRequest, status) {
                videoLoading = false;
                if (status == 'timeout') {
                  timeOutProcess();
                }
              }
            });
          }
          break;
        case 'tag_PICTRUE':
          if (picToEnd) return;
          if (!picLoading) {
            picLoading = true;
           loadingState();
            $.ajax({
              type : "GET",
              url  : dataurl,
              //url : 'http://172.17.133.114:8080/picture.json',
              timeout: 15000,
              data : {
                "code": "Picture",
                "sort": picSort,
                "ver" : version,
                "checkFlag": false
              },
              success: function(data) {
                var len = data.PictureList.length;
                if (len == 0) {
                  dataOver();
                  picToEnd = true;
                } else {
                  dataNotOver();
                  picToEnd = false;
                  var str = createPicItems(len, data.PictureList);
                  $('.content3').append($(str));
                  picSort = data.PictureList[len - 1].sort;
                }
                $('#loading').hide();
                picLoading = false;
                trackLoadCount('图片页手动加载', '图片手动次数');
              },
              error: function() {
                $('#loading').hide();
                errorTrack('加载错误','图片错误次数');
              },
              complete: function(XMLHttpRequest, status) {
                picLoading = false;
                if (status == 'timeout') {
                  timeOutProcess();
                }
              }
            });
          }
          break;
        case 'tag_MUSIC':
          if (musicToEnd) return;
          if (!musicLoading) {
            musicLoading = true;
           loadingState();
            $.ajax({
              type : "GET",
              url  : dataurl,
              //url : 'http://172.17.133.114:8080/music.json',
              timeout: 15000,
              data : {
                "code": "Music",
                "sort": musicSort,
                "ver" : version,
                "checkFlag": false
              },
              success: function(data) {
                var len = data.MusicList.length;
                if (len == 0) {
                  dataOver();
                  musicToEnd = true;
                } else {
                  dataNotOver();
                  musicToEnd = false;
                  var str = createMusicItems(len, data.MusicList);
                  $('.content4').append($(str));
                  musicSort = data.MusicList[len - 1].sort;
                }
                $('#loading').hide();
                musicLoading = false;
                trackLoadCount('音乐页手动加载', '音乐手动次数');
              },
              error: function() {
                $('#loading').hide();
                errorTrack('加载错误','音乐错误次数');
              },
              complete: function(XMLHttpRequest, status) {
                musicLoading = false;
                if (status == 'timeout') {
                  timeOutProcess();
                }
              }
            });
          }
          break;
        default:
          break;
      }
    }
  });

});
