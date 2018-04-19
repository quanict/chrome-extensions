let ajaxLoading = false;
$.ajaxSetup({
    url: "https://jp.giaiphapict.loc/api/kanjiword",
    global: false,
    type: "POST",
    crossDomain:true,
    cache:true,
    async:true,
    success: function(msg){
        //getKanjiStatus();
        ajaxLoading = false;
        console.log(msg);
    },
    error: function(jxhr){
        console.log(jxhr);

    }
});

$( document ).ajaxStart(function() {
    ajaxLoading = true;
});

let wordTypes = ['','noun'];

let kanjiChecking;
function getKanjiWord(){
    let word = $("#word-detail-overview");
    if( word.length > 0 && (kanjiChecking === undefined || kanjiChecking.length < 1) ){
        kanjiChecking = $("#txtKanji",word).get(0).dataset.kanji;
        if( $("#word-detail-info .word-type").length < 1 ){
            kanjiChecking = "exit";
            console.log("no data");
            return false;
        }
        let type = $("#word-detail-info .word-type").get(0).dataset.type;
        console.log(type)

        let data = {
            'kanji': $("#txtKanji",word).get(0).dataset.kanji,
            'romaji':$(".romaji",word).get(0).innerHTML,
            'hiragana':$(".kana.japan-font",word).get(0).innerHTML,
            'type':wordTypes[type],
            'vietnamese':[]
        };
        let meaning = $("#word-detail-info ol > li .nvmn-meaning");
        if( meaning.length > 0 ){
            meaning.each(function (index,e) {
                data.vietnamese.push(e.innerHTML);
            });
        }
        data.source = "j-dict.com";
        $.ajax({data: data});
        console.log("bug",{data});
    }

}

function getKanjiStatus(){
    let chars = $("#kanji-filter-result .kanji-in-list-item > div.img");
    console.log("getKanjiStatus",{chars});
    $.each( chars, function() {
        let char = $(this);
        $.ajax({data: {txt:char.attr("data-text")},type: "GET",
            success: function(data){
                if( typeof data === 'object' && data.status ){
                    char.css({'background':'#33b874'});
                }
            }
        });

    });
}
$( document ).ready(function() {
    //getKanjiStatus();
});
let wrapper = $("#dict-result-wrapper");
if( wrapper.length > 0 ){
    wrapper.get(0).addEventListener('DOMNodeInserted', getKanjiWord);
} else {
    console.log("no see wrapper");
}

