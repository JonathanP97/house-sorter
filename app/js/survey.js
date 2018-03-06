$(document).ready(function() {
  $('select').material_select();

  redoSurvey = function() {
    window.location.replace("/survey");
  }

  $('.btn-large').on('click', function(event) {
    event.preventDefault();

    var form = {
      name : $(".survey-form [name=name]").val().trim(),
      scores: [
        $(".survey-form [name=q-1]").val(),
        $(".survey-form [name=q-2]").val(),
        $(".survey-form [name=q-3]").val(),
        $(".survey-form [name=q-4]").val(),
        $(".survey-form [name=q-5]").val(),
        $(".survey-form [name=q-6]").val()
      ]
    };      
    
    $.ajax("/houses", {
      type: "POST",
      data: form
    }).then(data => displayResults(data));
  });

});

function displayResults(data) {
  
  console.log(data);
  var houseNum = data.house;
  var house = null;

  $(".main").empty();
  $(".main").append("<h4>Congrats " + data.members[(data.members.length-1)] + " you are in the " + data.name +" house");

  var imgSource = "../data/images/" + data.name.toLowerCase() +".png";
  console.log(imgSource);

  var img = $("<img>");
  img.attr("src", imgSource);
  $(".main").append(img);

  var list = $("<ul>");
  var first = $("<li>Members in "+ data.name +": </li>");
  list.append(first);
  for(var i =0; i<data.members.length; i++) {
    var li = $("<li>" +data.members[i] + "</li>");
    list.append(li);
  }

  var redoButton = $("<button onclick='redoSurvey()' class='waves-effect waves-dark btn' >Retake Survey</button>");
  $(".main").append(list);
  $(".main").append(redoButton);
}