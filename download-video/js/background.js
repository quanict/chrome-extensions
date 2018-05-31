// Create a rule that will show the page action when the conditions are met.
const kanjiRule = {
  // Declare the rule conditions.
  conditions: [new chrome.declarativeContent.PageStateMatcher({
    pageUrl: {hostEquals: 'j-dict.com'},
  })],
  // Shows the page action when the condition is met.
  actions: [new chrome.declarativeContent.ShowPageAction()]
}

var RequestMatcher = chrome.declarativeWebRequest.RequestMatcher;
var IgnoreRules = chrome.declarativeWebRequest.IgnoreRules;
var RedirectRequest = chrome.declarativeWebRequest.RedirectRequest;

var catImageUrl = 'http://j-dict.com/postrequest.ashx';

function registerRules() {
  var redirectRule = {
    priority: 100,
    conditions: [
      // If any of these conditions is fulfilled, the actions are executed.
      new RequestMatcher({
        // Both, the url and the resourceType must match.
        url: {hostSuffix: 'j-dict.com'},
        //resourceType: ['main_frame']
      }),
      new RequestMatcher({
        url: {hostSuffix: 'j-dict.com'},
        //resourceType: ['main_frame']
      }),
    ],
    actions: [
      new RedirectRequest({redirectUrl: catImageUrl})
    ]
  };

  var exceptionRule = {
    priority: 1000,
    conditions: [
      // We use hostContains to compensate for various top-level domains.
      new RequestMatcher({url: {hostSuffix: '.j-dict.com'}})
    ],
    actions: [
      new IgnoreRules({lowerPriorityThan: 1000})
    ]
  };

  var callback = function() {
    if (chrome.runtime.lastError) {
      console.error('Error adding rules: ' + chrome.runtime.lastError);
    } else {
      console.info('Rules successfully installed');
      chrome.declarativeWebRequest.onRequest.getRules(null,
          function(rules) {
            console.info('Now the following rules are registered: ' +
                         JSON.stringify(rules, null, 2));
          });
    }
  };

  chrome.declarativeWebRequest.onRequest.addRules([ exceptionRule], callback);
}

function setup() {

  // chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
  //   chrome.declarativeContent.onPageChanged.addRules([kanjiRule]);
  // });
  // This function is also called when the extension has been updated.  Because
  // registered rules are persisted beyond browser restarts, we remove
  // previously registered rules before registering new ones.
  chrome.declarativeWebRequest.onRequest.removeRules(
    null,
    function() {
      if (chrome.runtime.lastError) {
        console.error('Error clearing rules: ' + chrome.runtime.lastError);
      } else {
        registerRules();
      }
    });

chrome.runtime.onSuspend.addListener(function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    // After the unload event listener runs, the page will unload, so any
    // asynchronous callbacks will not fire.
    
    });
    console.log("Unloading.");
    chrome.browserAction.setBadgeText({text: ""});
    chrome.tabs.sendMessage(lastTabId, "Background page unloaded.");
  });

var wr = chrome.declarativeWebRequest;
  chrome.declarativeWebRequest.onRequest.addRules([{
    id: "0",
    conditions: [new wr.RequestMatcher({url: {hostSuffix: "bing.com"}})],
    actions: [new wr.RedirectRequest({redirectUrl: "http://google.com"})]
  }]);

}

chrome.runtime.onInstalled.addListener(setup);


