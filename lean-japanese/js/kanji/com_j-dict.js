function getNodesText(tagName){

}

Object.prototype.getNodesText = function(tagName,runCount) {
	let text = [], that = this;
	if( typeof runCount==='undefined' ){
		runCount = 1;
	}
	console.log("begin getNodesText",{runCount,tagName,that}, typeof tagName );

	
	if( typeof tagName === 'object' && tagName.length > 0 ){
		let tagFirst = tagName.shift().toString();
		console.log("=======================tagname line-15: ",{tagFirst,tagName,that});
		if( tagName.length > 0 ){
			try {
			    let tags = that.getElementsByTagName(tagFirst.toUpperCase());
				if( tags.length > 0 ){
					for (var tag of tags ) {
						//console.log("get getNodesText loop runCount "+runCount,tag,tagName);
						text.push( tag.getNodesText(tagName,runCount++) );
					}
				}
			}
			catch(err) {
			    console.log("have error",{that,err});
			}
				
		} else {
			
			text.push(that.getNodesText(tagFirst,runCount++));
			console.log("tagname line-33 runCount "+runCount,{tagFirst,text,that});
		}
	} else if ( typeof tagName === 'String') {
		let texts = that.getElementsByTagName(tagName.toUpperCase());
		if( texts.length > 0 ){
			for (var w of texts ) {
				text.push(w.innerText);
			}
		}
	} else {
		console.log("tagname line-42 runCount :"+runCount,{tagName,that});
	}
	return text;
};

function getKanjiChar(){
	console.log("======================================================call getKanjiChar");
	let kanjiDetail = Array.from(document.querySelectorAll(".dekiru-popup-detail"));
	if( kanjiDetail.length > 0 ){
		kanjiDetail = kanjiDetail[0];
		if( kanjiDetail.innerHTML.length > 0 ){
			let data = {
				kanji : document.querySelectorAll(".dekiru-popup-detail .qqq.japan-font")[0].innerText,
				hanViet : document.querySelectorAll(".dekiru-popup-detail .qqe")[0].innerText,
				svg : document.getElementById("drawkanji").innerHTML,
				meaning:null,
				onyomi:null,kunyomi:null,
				parts:[]
				//content : document.querySelectorAll(".dekiru-popup-detail .kanji-search-block")[0].innerHTML,
			};

			let searchData = Array.from(document.querySelectorAll(".dekiru-popup-detail .kanji-search-block"));
			for (var i = 0; i < searchData.length; i++) {
				let testData = searchData[i];
				let label = testData.getElementsByTagName("LABEL");
				if( label.length > 0 && typeof label[0] !== 'undefined' ){
					label = label[0].innerText.trim();
					label = label.substring(0, label.length - 1);

					let searchValue = testData.getElementsByTagName("P");
					if( searchValue.length < 1 ){
						searchValue = testData.getElementsByTagName("A");
					}
					if( searchValue.length > 0 ){
						searchValue = searchValue[0].innerText;
						switch(label) {
							case "Ý nghĩa":
								data.meaning = searchValue; break;
							case "Onyomi":
								data.onyomi = searchValue; break;
							case "Kunyomi":
								data.kunyomi = searchValue; break;
							case "Trình độ":
								data.level = searchValue; break;
							case "Số nét":
								data.drawline = searchValue;break;
								case "Cách ghi nhớ":
								data.remembering = searchValue;break;
								case "Hình ảnh gợi nhớ":
								data.data.rememberingByImage = searchValue;break;
								case "Bộ phận cấu thành":

							default:
								//console.log("check data "+i+":",{label,testData});
							break;

						}
					} else if (label=="Bộ phận cấu thàn"){
						searchValue = testData.getElementsByTagName("UL");
						if( searchValue.length > 0 ){
							data.parts = searchValue[0].getNodesText(['li','span']);

						}
					} else {
						//console.log("check data "+i+": value of '"+label+"'' is null",{searchValue,testData});
					}//
				} else {
					//console.log("check data "+i+": label null ",{label,searchValue});
				}
				
			}
			console.log("bug:",data.parts); 		
		}
		
	}
}

let kanjModaliArea = document.querySelectorAll(".dekiru-popup-detail");
Array.from(kanjModaliArea).forEach(function(node) {
	node.addEventListener('DOMNodeInserted', getKanjiChar);
});


