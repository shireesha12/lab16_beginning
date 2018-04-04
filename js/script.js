/*eslint-env browser*/

var $ = function (id) {
  "use strict";
    return window.document.getElementById(id);
};

var calculateDays = function () {
  "use strict";
    var event, dt, year, date, today,oneDay, days;
    
    event = $("event").value;
    dt = $("date").value;
    //validate event and dae text box
    if(event.length === 0 || dt.length === 0) {
      $("message").innerHTML = "please enter both an event name and a date";
        return;
    } 
    //make sure date has slashes 
    if(dt.indexOf("/") === -1) {
         $("message").innerHTML = "please enter date in mm/dd/yyyy format";
         return;
    }
    //make sure date has 4 digit year
    year = dt.substr(dt.length - 4);
    if (isNaN(year)) {
        $("message").innerHTML = "please enter date in mm/dd/yyyy format";
        return;
    }
    
    //convert date strings to date obect and make sure it valid
    date = new Date(dt);
    if (date === "invalid date") {
        $("message").innerHTML = "please enter date in mm/dd/yyyy format";
        return; 
    }
    
    //calculate days
    today = new Date();
    //hours*mintues*seconds*milliseconds
    oneDay = 24 * 60 * 60 * 1000;
    //event date - todays's date
    days = (date.getTime() - today.getTime())/ oneDay;
    days = Math.ceil(days);
    //calculate and display message
    if (days === 0) {
        $("message").innerHTML = "Today is ".concat(event.toLowerCase()) + "!" + date.toDateString();
    }
    if (days < 0) {
        $("message").innerHTML = "Event ".concat(event.toLowerCase()) + " happened " + Math.abs(days) + " days in the past!";
    }
    if (days > 0) {
         $("message").innerHTML = Math.abs(days) + " untill ".concat(event.toLowerCase()) + " occurs." + days.toDateString();
    }
    
};

window.addEventListener("load", function () {
    "use strict";
    $("countdown").addEventListener("click", calculateDays);
    $("event").focus();
});