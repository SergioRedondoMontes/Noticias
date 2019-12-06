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
    insertSingleNew(result[result.length - 1]);
  });
}

function deleteNew(id) {
  $.ajax({
    url: URL + id,
    type: "DELETE",
    success: function(result) {
      $("#" + id).remove();
    }
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

/***
 * Boton desactivado por defecto al estar los campos vacíos
 * Se activa cuando todos los campos estan rellenos
 * Se desactiva si detecta un campo vacío
 */
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

function onFormSubmit() {
  var formData = readFormData();
  postNew(formData);
}

function onDelete(id) {
  if (confirm("Are you sure to delete this new ?")) {
    deleteNew(id);
  }
}

function readFormData() {
  var formData = {};
  formData["title"] = $("#inputTitle").val();
  formData["header"] = $("#inputHeader").val();
  formData["img_url"] = $("#inputImg").val();
  formData["content"] = $("#inputContent").val();
  formData["img2_url"] = $("#inputImg2").val();
  return formData;
}
