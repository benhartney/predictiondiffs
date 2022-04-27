window.now = new Date()

function convertDaysToYearsMonthsDays(value) {
  var year, months, week, days;

  year = value >= 365 ? Math.floor(value / 365) : 0;
  value = year ? value - (year*365) : value;

  months = value >= 30 ? Math.floor((value % 365) / 30) : 0;
  value = months ? value - (months*30) : value;

  week = value >= 7 ? Math.floor((value % 365) / 7) : 0;
  value = week ? value - (week*7) : value;

  days = value < 7 ? Math.floor((value % 365) % 7) : 0;

  var returnString = ''

  if (year > 0) {
    returnString = year + 'y'
  }

  if (months > 0) {
    returnString = returnString + ' ' + months + 'm'
  }

  if (week > 0) {
    returnString = returnString + ' ' + week + 'w'
  }

  if (days > 0) {
    returnString = returnString + ' ' + week + 'd'
  }

  return returnString.trim()

}

function dateDifferenceInDays(date1, date2) {
  var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  var firstDate = new Date(date1);
  var secondDate = new Date(date2);

  return Math.round((secondDate.getTime() - firstDate.getTime())/(oneDay));
}

function absoluteDateDifferenceInDays(date1, date2) {
  var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  var firstDate = new Date(date1);
  var secondDate = new Date(date2);

  return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
}

function mobileCheck() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};


function msToTime(duration) {

  var returnString = ''

  var milliseconds = Math.floor((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24)


  if (hours > 0) {
    return hours + 'h'
  } else if (minutes > 0) {
    return minutes + 'm'
  } else {
    return '1m ago'
  }
  
}




function addPredictionsToPage(html_id, predictions) {
  $('#'+html_id+'-loadingSpinner1').hide()
  $('#'+html_id+'-loadingSpinner2').hide()
  $('#'+html_id+'-loadingSpinner3').hide()

  var binary_for_news = predictions.map(x => {
    if (x.type === 'binary') {
      return x
    }
  }).sort(function (a, b) {
    if (Math.abs(a.to-a.from) === Math.abs(b.to-b.from)) {
      return (a.to - b.to)
    }
    return (Math.abs(a.to-a.from) - Math.abs(b.to-b.from));
  }).filter(function(x) {
    return x !== undefined; // TODO replace this with _.compact(list)
  }).reverse();

  binary_for_news.forEach(function (item) {
    var listingTemplate = Handlebars.compile(document.getElementById("change-template").innerHTML);
    // only show predictions with changes, in the changes section
    if (item.diff_string_no_value_for_no_change !== window.zero_diff_string_for_difference_string_v2) {
      $("#"+html_id+"-changesInnerBinary").append(listingTemplate(item));
    }
  })

  var date_for_news = predictions.map(x => {
    if (x.type === 'date') {
      return x
    }
  }).sort(function (a, b) {
    return (a.absolutePercentageDifferenceForDates - b.absolutePercentageDifferenceForDates)
  }).filter(function(x) {
    return x !== undefined; // TODO replace this with _.compact(list)
  }).reverse();

  date_for_news.forEach(function (item) {
    var listingTemplate = Handlebars.compile(document.getElementById("change-template").innerHTML);
    // only show predictions with changes, in the changes section
    if (item.diff_string_no_value_for_no_change !== window.zero_diff_string_for_difference_string_v2) {
      $("#"+html_id+"-changesInnerDate").append(listingTemplate(item));
    }
  })


  var amount_for_news = predictions.map(x => {
    if (x.type === 'amount') {
      return x
    }
  }).sort(function (a, b) {
    return (a.absolutePercentageDifferenceForAmount - b.absolutePercentageDifferenceForAmount)
  }).filter(function(x) {
    return x !== undefined; // TODO replace this with _.compact(list)
  }).reverse();

  amount_for_news.forEach(function (item) {
    var listingTemplate = Handlebars.compile(document.getElementById("change-template").innerHTML);
    // only show predictions with changes, in the changes section
    if (item.diff_string_no_value_for_no_change !== window.zero_diff_string_for_difference_string_v2) {
      $("#"+html_id+"-changesInnerAmount").append(listingTemplate(item));
    }
  })


  if ($('#'+html_id+'-changesInnerBinary').is(':empty') === false) {
    $('#'+html_id+'-changesInnerBinaryHeader').show()
  }
  
  if ($('#'+html_id+'-changesInnerAmount').is(':empty') === false) {
    $('#'+html_id+'-changesInnerAmountHeader').show()
  }

  if ($('#'+html_id+'-changesInnerDate').is(':empty') === false) {
    $('#'+html_id+'-changesInnerDateHeader').show()
  }

  if( $('#'+html_id+'-changesInnerBinary').is(':empty') === true && $('#'+html_id+'-changesInnerAmount').is(':empty') === true && $('#'+html_id+'-changesInnerDate').is(':empty') === true) {
    $("#"+html_id+"-changesInnerBinary").text("None - take a look at Most Likely Outcomes to see where things stand.")
  }


  

  var predictions_to_add_to_calendar_section = predictions.map(x => {
    if (x.type === 'date' || x.period_end_date !== null) {
      return x
    }
  }).filter(function(x) {
    return x !== undefined; // TODO replace this with _.compact(list)
  });


  predictions_to_add_to_calendar_section.forEach(function (prediction, index) {
    var compare_date_for_a = prediction.type === 'date' ? prediction.to : prediction.period_end_date
    prediction.date_for_calendar_display = compare_date_for_a.toISOString().split('T')[0]
    prediction.show_current_value_for_display = prediction.type !== 'date'
  })

  var grouped_predictions_to_add_to_calendar_section = convetPredictionsToGroupedByDate(predictions_to_add_to_calendar_section)

  var dateTemplate = Handlebars.compile(document.getElementById("current-calendar-template-date").innerHTML);
  var listingTemplateForCalendar = Handlebars.compile(document.getElementById("current-calendar-template").innerHTML);

  grouped_predictions_to_add_to_calendar_section.forEach(function (group) {
    $("#"+html_id+"-currentCalendarInner").append(dateTemplate(group));
    group.predictions.forEach(function (prediction) {
      $("#"+html_id+"-currentCalendarInner").append(listingTemplateForCalendar(prediction));
    })
  })
  // handle empty?

  
  if ($('#flexSwitchCheckDefault').is(':checked')) {
    $('.currentSituationMovement').show()
  } else {
    $('.currentSituationMovement').hide()
  }
}


function convetPredictionsToGroupedByDate(predictions) {
  var date_strings = _.uniq(_.map(predictions, function(prediction){ return prediction.date_for_calendar_display; }).filter(function(x) {
    return x !== undefined; // TODO replace this with _.compact(list)
  }))
  var return_arr = []
  date_strings.forEach(function (date_string) {
    var array_of_predictions_for_a_date_string = []
    predictions.forEach(function (prediction) {
      if (prediction.date_for_calendar_display === date_string) {
        array_of_predictions_for_a_date_string.push(prediction)
      }
    })
    return_arr.push({
      date_string: date_string,
      predictions: array_of_predictions_for_a_date_string
    })
  })
  //sort
  return_arr = return_arr.sort(function (a, b) {
    return (Date.parse(a.date_string) - Date.parse(b.date_string));
  })

  return_arr.forEach(function (group) {
    group.predictions = group.predictions.sort(function (a, b) { // within each group, sort the predictions. date. amount. binary (in order of confidence).
      if (a.type === 'date' || a.type === 'amount') {
        return -1
      } else if (b.type === 'date' || b.type === 'amount') {
        return 1
      } else { // both binary
        if (Math.abs(a.to-a.from) === Math.abs(b.to-b.from)) {
          return (b.to - a.to)
        }
        return (Math.abs(b.to-b.from) - Math.abs(a.to-a.from));
      }
    })
  })

  return return_arr
}

function currentValueForDisplay(type, last_prediction) {
  console.log('currentValueForDisplay')
  console.log(type)
  console.log(last_prediction)
  if (type === 'binary') {
    return last_prediction + '%'
  } else if (type === 'date') {
    return last_prediction.toISOString().split('T')[0]
  } else if (type === 'amount') {
    return last_prediction
  }
}

function mainFunction(start_datetime){


  var setTabTemplate = Handlebars.compile(document.getElementById("set-tab-template").innerHTML);
  var setTabContentTemplate = Handlebars.compile(document.getElementById("set-tab-content-template").innerHTML);
  $("#set-tabs").html(setTabTemplate({html_id:'all',title:'All'}));
  $("#set-tab-contents").html(setTabContentTemplate({html_id:'all',title:'All'}));

  $('.spinner-border').show()
  start_date = new Date(start_datetime)
  $.get("/questions?from="+start_date.toISOString(), function( response ) {




    response.forEach(function (category) { 
      $("#set-tabs").append(setTabTemplate({html_id:category.html_id,title:category.title}));
      $("#set-tab-contents").append(setTabContentTemplate({html_id:category.html_id,title:category.title}));
    })
  
  
    $('.set-tab-content-temp').first().addClass('show').addClass('active');
    $('.set-tab-temp').first().addClass('active').attr("aria-selected","true");
    
    
  
  
    $('.changesInnerBinaryHeader, .changesInnerAmountHeader, .changesInnerDateHeader, .currentInnerInnerBinaryHeader, .currentInnerInnerAmountHeader, .currentInnerInnerDateHeader').hide()

    $('.changesInnerBinaryHeader, .changesInnerAmountHeader, .changesInnerDateHeader, .currentInnerInnerBinaryHeader, .currentInnerInnerAmountHeader, .currentInnerInnerDateHeader').hide()
    $('.changesInnerBinary, .changesInnerAmount, .changesInnerDate, .currentInnerInnerBinary, .currentInnerInnerAmount, .currentInnerInnerDate, .currentCalendarInner').empty()
    $('.spinner-border').show()
  
    window.response_count = {}
    window.predictions_for_display = {}
    window.sets_painted = 0
  
    response.forEach(function (category) { 
  
      window.response_count[category.html_id] = 0
      window.predictions_for_display[category.html_id] = []
  
      category.questions.forEach(function (question) {
  
  
        window.response_count[category.html_id] = window.response_count[category.html_id] + 1
  

          

        // this is only because I don't know how to pass a javascript date object in the api
        if (question.type === 'date') {
          question.first_and_last_prediction = [
            new Date(question.first_and_last_prediction[0]),
            new Date(question.first_and_last_prediction[1])
          ]
          // don't know if I have to do the following, it's only for binaries, not dates
          question.first_and_last_prediction_possibly_inverted = [
            new Date(question.first_and_last_prediction_possibly_inverted[0]),
            new Date(question.first_and_last_prediction_possibly_inverted[1])
          ]
        }


        var data_to_add = {
          question_id: question.id,
          set_title: category.title,
          type: question.type,
          title_for_display: question.title_for_display,
          periodless_title_for_display: question.periodless_title_for_display,
          period_end_date: typeof question.period_end_date == 'undefined' ? null : new Date(Date.parse(question.period_end_date)),
          from: question.first_and_last_prediction[0],
          to: question.first_and_last_prediction[1],
          current_value_for_display: currentValueForDisplay(question.type, question.first_and_last_prediction[1]),
          diff_string: difference_string_for_news(question.first_and_last_prediction[0], question.first_and_last_prediction[1], question.type),
          diff_string_no_value_for_no_change: difference_string_for_most_likely_outcomes(question.first_and_last_prediction[0], question.first_and_last_prediction[1], question.type),
          absolutePercentageDifferenceForDates: absolutePercentageDifferenceForDates(question.first_and_last_prediction[0], question.first_and_last_prediction[1], question.type),
          from_possibly_inverted: question.first_and_last_prediction_possibly_inverted[0],
          to_possibly_inverted: question.first_and_last_prediction_possibly_inverted[1],
          current_value_for_display_possibly_inverted: currentValueForDisplay(question.type, question.first_and_last_prediction_possibly_inverted[1]),
          diff_string_possibly_inverted: difference_string_for_news(question.first_and_last_prediction_possibly_inverted[0], question.first_and_last_prediction_possibly_inverted[1], question.type),
          diff_string_no_value_for_no_change_possibly_inverted: difference_string_for_most_likely_outcomes(question.first_and_last_prediction_possibly_inverted[0], question.first_and_last_prediction_possibly_inverted[1], question.type),
          absolutePercentageDifferenceForDates_possibly_inverted: absolutePercentageDifferenceForDates(question.first_and_last_prediction_possibly_inverted[0], question.first_and_last_prediction_possibly_inverted[1], question.type)
        }
        console.log(data_to_add)



        window.predictions_for_display[category.html_id].push(data_to_add)

        if (window.response_count[category.html_id] === category.questions.length) { // no more questions to come back for the set
          addPredictionsToPage(category.html_id, window.predictions_for_display[category.html_id])
          window.sets_painted = window.sets_painted + 1
          if (window.sets_painted === response.length) { // no more sets to come back
            var all_predictions_for_display = []
            for (const property in window.predictions_for_display) {
              window.predictions_for_display[property].forEach(function (prediction, index) {
                prediction.showSetTitle = true // this is used in the handlebars js template
                all_predictions_for_display.push(prediction)
              })
            }
            all_predictions_for_display = [...new Set(all_predictions_for_display)] // remove duplicates
            addPredictionsToPage('all', all_predictions_for_display)
          }
        }
      })
    })

  })




}

function findClosestPrediction(relevant_datetime, response_datetimes, response_predictions) {
  var relevant_datetime_converted = new Date(relevant_datetime)

  var closest_prediction = 0 // this is not good! actually doesn't matter?
  var closest_datetime = new Date(1) // this is not good! actually doesn't matter?
  response_datetimes.forEach(function (item, index) {

    var absolute_difference_for_existing_closest = Math.abs(relevant_datetime_converted - closest_datetime)

    var absolute_difference_for_one_being_checked = Math.abs(relevant_datetime_converted - item)

    if (absolute_difference_for_one_being_checked < absolute_difference_for_existing_closest) {
      closest_prediction = response_predictions[index]
      closest_datetime = item
    }
  })
  return closest_prediction
}

function absolutePercentageDifferenceForAmount(from, to) {
  return Math.round((Math.abs(to - from) / from) * 100)
}

function absolutePercentageDifferenceForDates(from, to, type) {
  if (type === 'date' || type === 'amount') {
    var diff = absoluteDateDifferenceInDays(from, to)
    var diffBetweenNowAndFrom = absoluteDateDifferenceInDays(window.now, from)
    return Math.round((diff / diffBetweenNowAndFrom) * 100)
  } else {
    return null
  }
}

window.zero_diff_string_for_difference_string_v2 = '<span style="color:#C3C3C3!important">(-)</span>'

function difference_string_for_most_likely_outcomes(from, to, question_type) {

  var minimum_news_level_storage = localStorage.getItem("minimum_news_level")

  var returnString = ""

  if (question_type === 'amount') {
    var diff = Math.round((to - from) * 100) / 100
    var absPercentageDiff = absolutePercentageDifferenceForAmount(from, to)
    if (diff > 0) {
      var possibleReturnString = '<b>(+' + diff + ', +' + absPercentageDiff + '%)</b>'
      if (minimum_news_level_storage === 'small') {
        returnString = possibleReturnString
      } else if (minimum_news_level_storage === 'medium') {
        if (absPercentageDiff > 4) {
          returnString = possibleReturnString
        } else {
          returnString = window.zero_diff_string_for_difference_string_v2
        }
      } else if (minimum_news_level_storage === 'large') {
        if (absPercentageDiff > 9) {
          returnString = possibleReturnString
        } else {
          returnString = window.zero_diff_string_for_difference_string_v2
        }
      }
    } else if (diff === 0) {
      returnString = window.zero_diff_string_for_difference_string_v2
    } else {
      var possibleReturnString = '<b>(' + diff + ', -' + absPercentageDiff + '%)</b>'
      if (minimum_news_level_storage === 'small') {
        returnString = possibleReturnString
      } else if (minimum_news_level_storage === 'medium') {
        if (absPercentageDiff > 4) {
          returnString = possibleReturnString
        } else {
          returnString = window.zero_diff_string_for_difference_string_v2
        }
      } else if (minimum_news_level_storage === 'large') {
        if (absPercentageDiff > 9) {
          returnString = possibleReturnString
        } else {
          returnString = window.zero_diff_string_for_difference_string_v2
        }
      }
    }
  } else if (question_type === 'date') {
    var diff = dateDifferenceInDays(from, to)
    var absPercentageDiff = absolutePercentageDifferenceForDates(from, to, question_type)
    // todo: factor in the minimal setting
    if (diff > 0) {
      var possibleReturnString = '<b>(' + convertDaysToYearsMonthsDays(diff) + ' days (' + absPercentageDiff + '%) later)</b>'
      if (minimum_news_level_storage === 'small') {
        returnString = possibleReturnString
      } else if (minimum_news_level_storage === 'medium') {
        if (absPercentageDiff > 4) {
          returnString = possibleReturnString
        } else {
          returnString = window.zero_diff_string_for_difference_string_v2
        }
      } else if (minimum_news_level_storage === 'large') {
        if (absPercentageDiff > 9) {
          returnString = possibleReturnString
        } else {
          returnString = window.zero_diff_string_for_difference_string_v2
        }
      }
    } else if (diff === 0) {
      returnString = window.zero_diff_string_for_difference_string_v2
    } else {
      var possibleReturnString = '<b>(' + convertDaysToYearsMonthsDays(Math.abs(diff)) + ' (' + absPercentageDiff + '%) sooner)</b>'
      if (minimum_news_level_storage === 'small') {
        returnString = possibleReturnString
      } else if (minimum_news_level_storage === 'medium') {
        if (absPercentageDiff > 4) {
          returnString = possibleReturnString
        } else {
          returnString = window.zero_diff_string_for_difference_string_v2
        }
      } else if (minimum_news_level_storage === 'large') {
        if (Math.abs(diff) > 9) {
          returnString = possibleReturnString
        } else {
          returnString = window.zero_diff_string_for_difference_string_v2
        }
      }
    }
  } else if (question_type === 'binary') {
    var diff = to - from
    if (diff > 0) {
      var possibleReturnString = '<b>(+' + diff + ')</b>'
      if (minimum_news_level_storage === 'small') {
        returnString = possibleReturnString
      } else if (minimum_news_level_storage === 'medium') {
        if (Math.abs(diff) > 4) {
          returnString = possibleReturnString
        } else {
          returnString = window.zero_diff_string_for_difference_string_v2
        }
      } else if (minimum_news_level_storage === 'large') {
        if (Math.abs(diff) > 9) {
          returnString = possibleReturnString
        } else {
          returnString = window.zero_diff_string_for_difference_string_v2
        }
      }
    } else if (diff === 0) {
      returnString = window.zero_diff_string_for_difference_string_v2
    } else {
      var possibleReturnString = '<b>(' + diff + ')</b>'
      if (minimum_news_level_storage === 'small') {
        returnString = possibleReturnString
      } else if (minimum_news_level_storage === 'medium') {
        if (Math.abs(diff) > 4) {
          returnString = possibleReturnString
        } else {
          returnString = window.zero_diff_string_for_difference_string_v2
        }
      } else if (minimum_news_level_storage === 'large') {
        if (Math.abs(diff) > 9) {
          returnString = possibleReturnString
        } else {
          returnString = window.zero_diff_string_for_difference_string_v2
        }
      }
    }
  }
  return returnString
}

function difference_string_for_news(from, to, question_type) {
  var minimum_news_level_storage = localStorage.getItem("minimum_news_level")
  
  var returnString = ""
  if (question_type === 'amount') {
    var diff = Math.round((to - from) * 100) / 100
    var absPercentageDiff = absolutePercentageDifferenceForAmount(from, to)
    if (diff > 0) {
      var possibleReturnString = '<b>+' + diff + ', +' + absPercentageDiff + '%</b> (' + from + ' -> ' + to + ')'
      if (minimum_news_level_storage === 'small') {
        returnString = possibleReturnString
      } else if (minimum_news_level_storage === 'medium') {
        if (absPercentageDiff > 4) {
          returnString = possibleReturnString
        } else {
          returnString = 'never see this'
        }
      } else if (minimum_news_level_storage === 'large') {
        if (absPercentageDiff > 9) {
          returnString = possibleReturnString
        } else {
          returnString = 'never see this'
        }
      }
    } else if (diff === 0) { // this is not used?
      returnString = 'never see this'
    } else {
      var possibleReturnString = '<b>' + diff + ', -' + absPercentageDiff + '%</b> (' + from + ' -> ' + to + ')'
      if (minimum_news_level_storage === 'small') {
        returnString = possibleReturnString
      } else if (minimum_news_level_storage === 'medium') {
        if (absPercentageDiff > 4) {
          returnString = possibleReturnString
        } else {
          returnString = 'never see this'
        }
      } else if (minimum_news_level_storage === 'large') {
        if (absPercentageDiff > 9) {
          returnString = possibleReturnString
        } else {
          returnString = 'never see this'
        }
      }
    }
  } else if (question_type === 'date') {
    var diff = dateDifferenceInDays(from,to)
    var absPercentageDiff = absolutePercentageDifferenceForDates(from, to, question_type)
    if (diff > 0) {
      var possibleReturnString = '<b>' + convertDaysToYearsMonthsDays(diff) + ' (' + absPercentageDiff + '%) later</b> (' + from.toISOString().split('T')[0] + ' -> ' + to.toISOString().split('T')[0] + ')'
      if (minimum_news_level_storage === 'small') {
        returnString = possibleReturnString
      } else if (minimum_news_level_storage === 'medium') {
        if (absPercentageDiff > 4) {
          returnString = possibleReturnString
        } else {
          returnString = 'never see this'
        }
      } else if (minimum_news_level_storage === 'large') {
        if (absPercentageDiff > 9) {
          returnString = possibleReturnString
        } else {
          returnString = 'never see this'
        }
      }
    } else if (diff === 0) {
      returnString = 'never see this'
    } else {
      var possibleReturnString = '<b>' + convertDaysToYearsMonthsDays(Math.abs(diff)) + ' (' + absPercentageDiff + '%) sooner</b> (' + from.toISOString().split('T')[0] + ' -> ' + to.toISOString().split('T')[0] + ')'
      if (minimum_news_level_storage === 'small') {
        returnString = possibleReturnString
      } else if (minimum_news_level_storage === 'medium') {
        if (absPercentageDiff > 4) {
          returnString = possibleReturnString
        } else {
          returnString = 'never see this'
        }
      } else if (minimum_news_level_storage === 'large') {
        if (absPercentageDiff > 9) {
          returnString = possibleReturnString
        } else {
          returnString = 'never see this'
        }
      }
    }
  } else if (question_type === 'binary') {
    var diff = to - from
    if (diff > 0) {
      var possibleReturnString = '<b>+' + diff + '</b> (' + from + '% -> ' + to + '%)'
      if (minimum_news_level_storage === 'small') {
        returnString = possibleReturnString
      } else if (minimum_news_level_storage === 'medium') {
        if (Math.abs(diff) > 4) {
          returnString = possibleReturnString
        } else {
          returnString = 'never see this'
        }
      } else if (minimum_news_level_storage === 'large') {
        if (Math.abs(diff) > 9) {
          returnString = possibleReturnString
        } else {
          returnString = 'never see this'
        }
      }
    } else if (diff === 0) { // this is not used?
      returnString = 'never see this'
    } else {
      var possibleReturnString = '<b>' + diff + '</b> (' + from + '% -> ' + to + '%)'
      if (minimum_news_level_storage === 'small') {
        returnString = possibleReturnString
      } else if (minimum_news_level_storage === 'medium') {
        if (Math.abs(diff) > 4) {
          returnString = possibleReturnString
        } else {
          returnString = 'never see this'
        }
      } else if (minimum_news_level_storage === 'large') {
        if (Math.abs(diff) > 9) {
          returnString = possibleReturnString
        } else {
          returnString = 'never see this'
        }
      }
    }
  }
  return returnString
}

$(document).ready(function() {

  var minimum_news_level_storage = localStorage.getItem("minimum_news_level")
  if (minimum_news_level_storage === null) {
    minimum_news_level_storage = $('input[name=minimumNewsLevelRadios]:checked').attr('data-value-to-save')
    localStorage.setItem("minimum_news_level", minimum_news_level_storage);
  } else {
    $("[data-value-to-save='"+minimum_news_level_storage+"']").prop('checked', true)
  }

  var last_visit_storage = localStorage.getItem("lastvisit")
  if (last_visit_storage !== null) {
    window.last_visit = new Date(last_visit_storage)
    $('.last-visit-text').html(" ("+msToTime(window.now - window.last_visit)+")");
  }
  localStorage.setItem("lastvisit", window.now);

  var two_months_ago = window.now - (5259492 * 1000)
  var two_weeks_ago = window.now - (1209600 * 1000)
  var week_ago = window.now - (604800 * 1000)
  var day_ago = window.now - (86400 * 1000)
  var three_days_ago = window.now - (259200 * 1000)

  $("#2m-button").click(function() {
    mainFunction(two_months_ago)
  });

  $("#2w-button").click(function() {
    mainFunction(two_weeks_ago)
  });
  
  $("#1w-button").click(function() {
    mainFunction(week_ago)
  });

  $("#3d-button").click(function() {
    mainFunction(three_days_ago)
  });

  $("#24h-button").click(function() {
    mainFunction(day_ago)
  });

  $("#last-visit-button").click(function() {
    if (last_visit_storage === null) {
      alert("This button will work the next time you visit this page");
      return false;
    } else {
      mainFunction(window.last_visit)
    }
  });

  if (mobileCheck() === false) {
    $('#mobile-warning').hide()
  }

  var urlParams = new URLSearchParams(window.location.search);

  if (urlParams.has('testf')) {
    localStorage.setItem("testf", true);
  }

  if (localStorage.getItem("testf") === 'true') {
    $('#twitterLink').hide()
  }

  $("#flexSwitchCheckDefault").click(function() {
    if (this.checked) {
      $('.currentSituationMovement').show()
    } else {
      $('.currentSituationMovement').hide()  
    }
  })



  
  
  $('#minimumNewsLevelRadioSmall').click(function() {
    localStorage.setItem("minimum_news_level", 'small'); // TODO change this to use .attr('data-value-to-save')
    $('input[name=btnradio]:checked').click()
  })

  $('#minimumNewsLevelRadioMedium').click(function() {
    localStorage.setItem("minimum_news_level", 'medium'); // TODO change this to use .attr('data-value-to-save')
    $('input[name=btnradio]:checked').click()
  })

  $('#minimumNewsLevelRadioLarge').click(function() {
    localStorage.setItem("minimum_news_level", 'large'); // TODO change this to use .attr('data-value-to-save')
    $('input[name=btnradio]:checked').click()
  })







  var has_seen_modal = localStorage.getItem("has_seen_modal")
  if (has_seen_modal === null) {
    localStorage.setItem("has_seen_modal", 'true');
    $('#exampleModal').modal('show')
  }

  if (last_visit_storage === null) {
    $("#1w-button").click()
  } else {
    $("#last-visit-button").click()
  }
  


});
