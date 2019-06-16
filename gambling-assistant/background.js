chrome.alarms.onAlarm.addListener(function( alarm ) {
    chrome.notifications.create({
        "type":"basic",
        "title":"Time To Take A Break",
        "message":"Time To Do Something Else...",
        "iconUrl":"icon.png"},
        function(){
    });
});