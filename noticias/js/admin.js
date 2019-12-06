let URL = "http://127.0.0.1:8000/api/noticia/";
let $table = $("#table");
var arrNews = null;

$($table).ready(function() {
  getNews();
});

// Start ajax functions
function getNews() {
  $.get(URL, data => {
    if (data != []) {
      arrNews = data;
      insertNews();
    } else {
      //TODO: Delete table
    }
  });
}

function postNew(data) {
  $.post(URL, data, function(result) {
    console.log(result);
    resetForm();
    // insertSingleNew(data);
  });
}

function deleteNew() {
  $.ajax({
    url: URL,
    type: "DELETE",
    success: function(result) {}
  });
}

// End ajax functions

// Start visual functions
function insertSingleNew(data) {
  content =
    '<tr id ="' +
    data.id +
    '">' +
    ' <th scope="row">' +
    data.id +
    "</th>" +
    " <td>" +
    data.title +
    "</td>" +
    "<td>" +
    data.header +
    "</td>" +
    "<td>" +
    data.pub_date +
    "</td>" +
    "<td>" +
    data.img_url +
    "</td>" +
    '<td><button type="button" class="btn btn-danger" onClick="onDelete(' +
    data.id +
    ')"> Delete </button>' +
    "</td>" +
    "</tr>";
  $("#tbody").append(content);
}

function insertNews() {
  var content;

  for (i = 0; i < arrNews.length; i++) {
    content =
      '<tr id ="' +
      arrNews[i].id +
      '">' +
      ' <th scope="row">' +
      arrNews[i].id +
      "</th>" +
      " <td>" +
      arrNews[i].title +
      "</td>" +
      "<td>" +
      arrNews[i].header +
      "</td>" +
      "<td>" +
      arrNews[i].pub_date +
      "</td>" +
      "<td>" +
      arrNews[i].img_url +
      "</td>" +
      '<td><button type="button" class="btn btn-danger" onClick="onDelete(' +
      arrNews[i].id +
      ')"> Delete </button>' +
      "</td>" +
      "</tr>";
    $("#tbody").append(content);
  }
}

function resetForm() {
  $("#title").empty();
  $("#header").empty();
  $("#img_url").empty();
  $("#content").empty();
  $("#img2_url").empty();
}

$(document).ready(function() {
  $(':button[type="submit"]').prop("disabled", true);
  $(".field input, .field textarea").on("keyup", function() {
    let empty = false;

    $(".field input").each(function() {
      if ($(this).val().length == 0) empty = true;
    });
    $(".field textarea").each(function() {
      if ($(this).val().length == 0) empty = true;
    });

    if (empty) $(':button[type="submit"]').prop("disabled", true);
    else $(':button[type="submit"]').prop("disabled", false);
  });
});

// End visual functions
