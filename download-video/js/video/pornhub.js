

var videoSrc='';

let videoPayler = $('#player');
//if( videoSrc.lenght < 5 && videoPayler.length > 0 ){
	videoPayler.get(0).addEventListener('DOMNodeInserted', getVideoSource);
//}


function getVideoSource(){

	if( typeof videoSrc!== 'undefined' && videoSrc.length < 5 ){
		let videoNode = $('.mhp1138_videoWrapper');
		if( videoNode.length > 0 ){
			let source = videoNode.find('source');
            videoSrc = source.get(0).src;
            console.log("call me",{videoSrc,videoNode});
            let downloadBtn = $('<a/>',{
                text: 'Download',
                id:'extDownload',
                target:"_blank",
				style:'z-index:999; background:red; position:fixed;',
                href:videoSrc
            });
            downloadBtn.insertBefore(videoNode);

        } else {
			console.log("no see payler");
		}

	}
	
}
