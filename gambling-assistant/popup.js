document.getElementById("clear").addEventListener("click", function(evt){
  chrome.alarms.clearAll();
});

var alarms = document.getElementsByClassName("alarm");
for(var alarm of alarms){
  alarm.addEventListener("click", function(item){
    var id = this.getAttribute("id");
    var date = new Date();
    var minutes = Number(this.getAttribute("minutes"));
    date.setMinutes(date.getMinutes() + minutes);

    hasAlarms(function(alarms){
      var hasAlarm = alarms.some(function(a) {
        return a.name == id;
      });

      chrome.alarms.clear(id);
      if(!hasAlarm) {
        chrome.alarms.create(id, {delayInMinutes: minutes});
      }
    });
  });
}

function loop(timestamp) 
{
  //this need's to run in the same scope as chrome.alarms
  hasAlarms(function(isRunning){
    for(var alarm of alarms){
      alarm.innerHTML =  "Time out in " + alarm.getAttribute("minutes") + " Minutes";
    }
  });
  
  chrome.alarms.getAll(function(alarms) {
    alarms.some(function(a) {
        var now = new Date().getTime();
        var distance = a.scheduledTime - now;

        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
        document.getElementById(a.name).innerHTML = hours + "h " + minutes + "m " + seconds + "s ";
    });
  });
  window.requestAnimationFrame(loop);
}
window.requestAnimationFrame(loop);

function hasAlarms(callback) {
  chrome.alarms.getAll(function(alarms) {
      callback(alarms);
  });
}