// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function getJDictKanji(){
  let kanjiDetail = Array.from(document.querySelectorAll(".dekiru-popup-detail"));

  console.log("bug:",kanjiDetail);
}

// The onClicked callback function.
function onClickHandler(e, tab) {

  if (e.menuItemId == "radio1" || e.menuItemId == "radio2") {
    console.log("radio item " + e.menuItemId +
                " was clicked (previous checked state was "  +
                e.wasChecked + ")");
  } else if (e.menuItemId == "checkbox1" || e.menuItemId == "checkbox2") {
    console.log("checkbox item " + e.menuItemId +
                " was clicked, state is now: " + e.checked +
                " (previous state was " + e.wasChecked + ")");
  } else if (e.menuItemId == "kanji-j-dict"){
    console.log("click kanji-j-dict",{e,tab});
  } else {
    if( e.pageUrl == "http://j-dict.com/kanji.htm" ){
      getJDictKanji();  
    } else {
      console.log("info: ",e);
      console.log("tab: " ,tab);  
    }

    
    //console.log("item " + info.menuItemId + " was clicked");
    
  }
};



function createContext(){
  chrome.contextMenus.removeAll();
  // Create one test item for each context type.
  var contexts = ["page","selection","link","editable","image","video","audio"];
  
  for (var i = 0; i < contexts.length; i++) {
    var context = contexts[i];
    var title = "Test '" + context + "' menu item";
    var id = chrome.contextMenus.create({"title": title, "contexts":[context], "id": "context" + context});
  }

  // Create a parent item and two children.
  chrome.contextMenus.create({"title": "Get Kanji", "id": "kanji" });
  chrome.contextMenus.create( {"title": "Child 1", "parentId": "kanji", "id": "kanji-j-dict"});

  // Intentionally create an invalid item, to show off error checking in the
  // create callback.
  // chrome.contextMenus.create({"title": "Oops", "id": "child1"}, function() {
  //   if (chrome.extension.lastError) {
  //     console.log("Got expected error: " + chrome.extension.lastError.message);
  //   }
  // });

  chrome.contextMenus.onClicked.addListener(onClickHandler);
}

const contextRule = {
  // Declare the rule conditions.
  conditions: [new chrome.declarativeContent.PageStateMatcher({
    pageUrl: {hostEquals: 'j-dict.com'},
  })],
  // Shows the page action when the condition is met.
  actions: [
    
    new chrome.declarativeContent.ShowPageAction()
  ]
}

function setup(){

  createContext();
  
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([contextRule]);
  });
}

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(setup);