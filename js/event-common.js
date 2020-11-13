var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";

var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

/* Slider */
var flexSlide = new Swiper('.flex-slider', {
    autoplay: 500,
    slidesPerView: 1,
    centeredSlides: true,
    paginationClickable: true,
    observer: true,
        observeParents: true,
});

var videoLists = [
    '4RKoDg1JMxs',
    'wTss4e05TXM'
]   

/* Video popup */
var videoList = document.querySelectorAll('.video-wrap .video-list');
Array.prototype.forEach.call(videoList, function(list) {
    list.addEventListener('click', function(event) {  
        
        var videoPopup = document.getElementById('reamian-now_popup');
        var videoNum = this.getAttribute('data-video-num');

        videoPopup.style.display = 'block';

        player.cueVideoById({videoId:videoLists[videoNum], 'startSeconds': 0,});
    });
});


var videoPopupClose = document.querySelector('#reamian-now_popup .btn-layerpopup_close');
videoPopupClose.addEventListener('click', function(event) {
    videoPopupCloseFn(event);
})

function videoPopupCloseFn(event) {
    var _this = event.target;
    var videoParent = _this.parentElement;
    videoParent.style.display = 'none';
    player.stopVideo();
}

/* Tab Menu */
var tabList = document.querySelectorAll('.tab .tab-list');
Array.prototype.forEach.call(tabList, function(list) {
    list.children[0].addEventListener('click', function(event) {
        event.preventDefault();

        var tabContent = document.querySelectorAll('.tab-content');
        var tabNum = this.parentElement.getAttribute('data-num');


        Array.prototype.forEach.call(tabContent, function(cont, i) {
            cont.style.display = 'none';
            tabList[i].className = 'tab-list'
        });

        tabContent[tabNum].style.display = 'block';

        if(list.className.indexOf('tab-active') == -1) {
            list.className = 'tab-list tab-active'
        } 

    });
});

function onYouTubeIframeAPIReady(videoNum) {
    player = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: videoLists[videoNum],
        playerVars: { 
            'autoplay' : 0,
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });

    console.log('onYouTubeIframeAPIReady');
}

function onPlayerReady(event) {
    // event.target.playVideo();
    console.log('준비완료');
  }

var done = false;
function onPlayerStateChange(event) {
    console.log('onPlayerStateChange');
    if (event.data == YT.PlayerState.PLAYING && !done) {
        // setTimeout(stopVideo, 6000);
        done = true;
    }
}

function stopVideo() {
    console.log('stopVideo');
    player.stopVideo();
}