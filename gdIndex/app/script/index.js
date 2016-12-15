require('sass/index.scss');
var $ = require('webpack-zepto');
const path = require('path');

if (parseURL(window.location.href) && parseURL(window.location.href).la == "en") {
    var language = require('script/languagepack_en').eng;
}
if (parseURL(window.location.href) && parseURL(window.location.href).la == "zh") {
    var language = require('script/languagepack_zh').chn;
}
randerHTML();

function randerHTML() {
    var iconlist = require('./list.js');
    var videoHTML = "",
        musicHTML = '';

    //video
    videoHTML += "<div class='cateTitle' style='background:url(img/video_icon.png) no-repeat 0px center;background-size:0.45rem;'><h2 class='video'></h2></div>";
    videoHTML += "<ul style='border-bottom: 1px solid #eee;'>";
    for (var i = 0; i < 8; i++) {
        videoHTML += "<li name='" + iconlist.music[i].title + "'><div class='icon' style='background:url(img/" + iconlist.video[i].image + ") no-repeat center center;background-size:1.4rem;'></div>";
        videoHTML += "<div class='title'>" + iconlist.video[i].title + "</div>";
        videoHTML += "</li>";
    }
    videoHTML += "<div style='clear:both;height:1px;font-size:1px;'></div></ul>";

    //music
    musicHTML += "<div class='cateTitle' style='background:url(img/music_icon.png) no-repeat 0px center;background-size:0.45rem;'><h2 class='music'></h2></div><ul>";
    for (var i = 0; i < 8; i++) {
        musicHTML += "<li name='" + iconlist.music[i].title + "'><div class='icon' style='background:url(img/" + iconlist.music[i].image + ") no-repeat center center; background-size:1.4rem;'></div>";
        musicHTML += "<div class='title'>" + iconlist.music[i].title + "</div>";
        musicHTML += "</li>";
    }
    musicHTML += "<div style='clear:both;height:1px;font-size:1px;'></div></ul>";
    $(".mainlist").html(videoHTML + musicHTML);
    setLanguage(language);
    clickEvent();
}

function clickEvent() {
    $("li").click(function() {
        console.log($(this).attr("name"));
        //do sth.
    })
}

function setLanguage(lang) {
    lang == undefined ? lang = require('script/languagepack_en.js').eng : lang = lang;
    $(".video").html(lang.video);
    $(".music").html(lang.music);

}

function parseURL(url) {
    if (url.indexOf("?") >= 0) {
        return (function(url) {
                var parames = {};
                url.replace(/(\w+)=(\w+)/ig, function(a, b, c) { parames[b] = c; });
                return parames;
            })(url)
            /*
			平台
			mp=a（a=android，即android平台）

			versionName
			vc=1.2.1.1

			机型
			md= google+Nexus+5

			系统版本
			os=4.4.4

			获取唯一id
			Id=5 885788c73335cb98d714804c1eba89f

			语言
			la=zh

			地区
			ar=CN

			MCC
			mc=460
 */
    } else {
        return;
    }
}