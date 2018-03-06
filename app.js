$(document).ready(function(){
  $('input.timepicker#start1').timepicker({
      timeFormat: 'hh:mmp',
      interval: 15,
      minTime: new Date(0,0,0,8,0,0),
      maxTime: new Date(0,0,0,16,0,0),
      defaultTime: new Date(0,0,0,8,0,0),
      startTime: new Date(0,0,0,8,0,0),
      dynamic: false,
      dropdown: true,
  });
  $('input.timepicker#end1').timepicker({
      timeFormat: 'hh:mmp',
      interval: 15,
      minTime: new Date(0,0,0,8,0,0),
      maxTime: new Date(0,0,0,16,0,0),
      defaultTime: new Date(0,0,0,8,0,0),
      startTime: new Date(0,0,0,8,0,0),
      dynamic: false,
      dropdown: true,
  });
});

var count = 2;

window.app = {
  addRow: function(){
    //Generate HTML for next row
    $( ".schedule--table" ).append( "<tr><td>"+count+"</td><td><input class=\"timepicker start\" id=\"start"+count+"\" type=\"text\"></td><td><input class=\"timepicker end\" id=\"end"+count+"\" type=\"text\"></td><td><input id=\"client"+count+"\" type=\"text\"></td><td><input id=\"task"+count+"\" type=\"text\"></td><td><input id=\"tracker"+count+"\" type=\"text\"></td></tr>" );

    //Get previous end element and value
    var prev = count - 1;
    var end = $('input.timepicker#end'+prev).val();

    //Set start time of new row
    $('input.timepicker#start'+count).timepicker({
      timeFormat: 'hh:mmp',
      interval: 15,
      minTime: new Date(0,0,0,8,0,0),
      maxTime: new Date(0,0,0,16,0,0),
      defaultTime: end,
      startTime: end,
      dynamic: false,
      dropdown: true,
      change: function(time){
        $('input.timepicker#end'+prev).val(this.val());
      }
    });

    //Set on change function of end time to update the val of previous row start time
    var prevInstance = $('input.timepicker#end'+prev).timepicker();
    prevInstance.options.change = function(){
      var thisCount = count - 1;
      var nextStartTime = $(this).val();
      $('input.timepicker#start'+thisCount).val(nextStartTime);
    }

    //Set end time of new row
    $('input.timepicker#end'+count).timepicker({
      timeFormat: 'hh:mmp',
      interval: 15,
      minTime: new Date(0,0,0,8,0,0),
      maxTime: new Date(0,0,0,16,0,0),
      defaultTime: new Date(0,0,0,16,0,0),
      startTime: end,
      dynamic: false,
      dropdown: true,
    });
    count++;
  },
  generateSchedule: function(){
    // if (typeof(Storage) !== "undefined") {
    // var storeSchedule = $('.schedule--table').html();
    //   alert(storeSchedule);
    // localStorage.setItem("schedule", storeSchedule);
    // $('.schedule--table').html(localStorage.getItem("schedule"));
    // }else{
    //   alert('not supported');
    // }
    $('#generated-schedule').html('');
    var schedule = "*Schedule*";
    var x;
    for(x = 1; x < count ; x++){
      var start = $('#start'+x).val();
      var end = $('#end'+x).val();

      if(start.includes("AM") == true){
        var start_time = start.slice(0, -2);
        start_time += ":00";
        start_time = new Date("2014 "+start_time);
      }else{
        var start_time = start.slice(0, -2);
        start_time += ":00";
        var hours = new Date("2014 "+start_time).getHours();
        var mins =  new Date("2014 "+start_time).getMinutes();
        if(hours > 0 && hours < 6){
          hours = hours + 12;
          start_time = hours+":"+mins+":00";
        }
        start_time = new Date("2014 "+start_time);
      }

      if(end.includes("AM") == true){
        var end_time = end.slice(0, -2);
        end_time += ":00";
        end_time = new Date("2014 "+end_time);
      }else{
        var end_time = end.slice(0, -2);
        end_time += ":00";
        var hours = new Date("2014 "+end_time).getHours();
        var mins = new Date("2014 "+end_time).getMinutes();
        if(hours > 0 && hours < 6){
          hours = hours + 12;
          end_time = hours+":"+mins+":00";
        }
        end_time = new Date("2014 "+end_time);
      }
      var diffMs = (end_time - start_time);
      var diffHrs = Math.floor((diffMs % 86400000) / 3600000);
      var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);

      var total_time = "0 minutes";

      if(diffHrs == 0){
        total_time = "";
        if(diffMins != 0){
          total_time += diffMins + " minutes";
        }
      }else if (diffHrs == 1){
        total_time = diffHrs + " hour";
        if(diffMins != 0){
          total_time += " and " + diffMins + " minutes";
        }
      }else if (diffHrs > 1){
        total_time = diffHrs + " hours";
        if(diffMins != 0){
          total_time += " and " + diffMins + " minutes";
        }
      }
      var client = $('#client'+x).val();
      var task = $('#task'+x).val();
      var tracker = $('#tracker'+x).val();

      schedule += "<br>"+start+" - "+end+" ("+total_time+") - "+client+" - "+task+" - "+tracker;
    }
    $('#generated-schedule').append(schedule);
  },
  generateReport: function(){
    $('#generated-report').html('');
    var report = "*Report*";
    var x;
    for(x = 1; x < count ; x++){
      var start = $('#start'+x).val();
      var end = $('#end'+x).val();

      if(start.includes("AM") == true){
        var start_time = start.slice(0, -2);
        start_time += ":00";
        start_time = new Date("2014 "+start_time);
      }else{
        var start_time = start.slice(0, -2);
        start_time += ":00";
        var hours = new Date("2014 "+start_time).getHours();
        var mins =  new Date("2014 "+start_time).getMinutes();
        if(hours > 0 && hours < 6){
          hours = hours + 12;
          start_time = hours+":"+mins+":00";
        }
        start_time = new Date("2014 "+start_time);
      }

      if(end.includes("AM") == true){
        var end_time = end.slice(0, -2);
        end_time += ":00";
        end_time = new Date("2014 "+end_time);
      }else{
        var end_time = end.slice(0, -2);
        end_time += ":00";
        var hours = new Date("2014 "+end_time).getHours();
        var mins = new Date("2014 "+end_time).getMinutes();
        if(hours > 0 && hours < 6){
          hours = hours + 12;
          end_time = hours+":"+mins+":00";
        }
        end_time = new Date("2014 "+end_time);
      }
      var diffMs = (end_time - start_time);
      var diffHrs = Math.floor((diffMs % 86400000) / 3600000);
      var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);

      var total_time = "0 minutes";

      if(diffHrs == 0){
        total_time = "";
        if(diffMins != 0){
          total_time += diffMins + " minutes";
        }
      }else if (diffHrs == 1){
        total_time = diffHrs + " hour";
        if(diffMins != 0){
          total_time += " and " + diffMins + " minutes";
        }
      }else if (diffHrs > 1){
        total_time = diffHrs + " hours";
        if(diffMins != 0){
          total_time += " and " + diffMins + " minutes";
        }
      }
      var client = $('#client'+x).val();

      report += '<br>'+total_time+' - '+ client;
    }
    $('#generated-report').append(report);
  },
  reset: function(){
    count = 2;
    $('#generated-schedule').html('');
    $('#generated-report').html('');
    $('.schedule--table').html('');
    $('.schedule--table').append('<tr>        <th>#</th><th>Start</th><th>End</th><th>Client Name</th><th>Task</th><th>Tracker</th></tr><tr><td>1</td><td><input class=\"timepicker start\" id=\"start1\"></td><td><input class=\"timepicker end\" id=\"end1\"></td><td><input id=\"client1\" type=\"text\"></td><td><input id=\"task1\" type=\"text\"></td><td><input id=\"tracker1\" type=\"text\"></td></tr>');
    $('.timepicker').timepicker({
      timeFormat: 'hh:mmp',
      interval: 15,
      minTime: new Date(0,0,0,8,0,0),
      maxTime: new Date(0,0,0,16,0,0),
      defaultTime: new Date(0,0,0,8,0,0),
      startTime: new Date(0,0,0,8,0,0),
      dynamic: false,
      dropdown: true,
    });
  },
  copy: function(e){
    if(e == 'schedule'){
      var target = $("#generated-schedule").html();
    }else if(e == 'report'){
      var target = $("#generated-report").html();
    }

    var $temp = $("<textarea>");
    var brRegex = /<br\s*[\/]?>/gi;
    $("body").append($temp);
    $temp.val(target.replace(brRegex, "\r\n")).select();
    document.execCommand("copy");
    $temp.remove();
  }
}
