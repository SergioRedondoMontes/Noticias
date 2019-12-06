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
