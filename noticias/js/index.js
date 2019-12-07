let $container = $("#news");
var orderNoticias = null;

$($container).ready(function() {
  getNews();
});

function getNews() {
  $.get("http://127.0.0.1:8000/api/noticia/", data => {
    if (data != []) {
      orderNews(data);
    } else {
      //TODO: Delete table
    }
  });
}

function getNew(id) {
  var url = "http://127.0.0.1:8000/api/noticia/" + id + "/";
  $.get(url, data => {
    if (data != []) {
      pushModal(data);
    } else {
      alert("No se ha podido cargar la noticia, intentlo más tarde");
    }
  });
}

// ordena por fecha las noticias
function orderNews(data) {
  //"05-11-2019 22:20:44"
  orderNoticias = data.sort(function(a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return (
      dateFormat(new Date(b.pub_date), "dd-mm-yyyy H:MM:ss") -
      dateFormat(new Date(a.pub_date), "dddd, mmmm dS, yyyy, h:MM:ss TT")
    );
  });
  insertNews();
}

function insertNews() {
  const news = $("#news");
  var size = orderNoticias.length - 1;
  var tmp = size - 9;
  for (i = size; i >= tmp; i--) {
    if (i === size) {
      var firstCol = $("<div>", {
        class: "col-12 border border-primary",
        id: i
      });
      var row = $("<div>", {
        class: "row"
      });
      var col = $("<div>", {
        class: "d-flex col-12 justify-content-center align-content-center"
      });
      col.append($("<h2>" + orderNoticias[i].title + "</h2>"));
      var col1 = $("<div>", {
        class: "col-6"
      });
      col1.append($("<img src=" + orderNoticias[i].img_url + "></img>"));
      var col2 = $("<div>", {
        class: "d-flex col-6"
      });
      col2.append(
        '<div class="row">' +
          '<div class="col-12">' +
          "<h4>" +
          orderNoticias[i].header +
          "</h4>" +
          "</div>" +
          '<div class="offset-7 col-4">' +
          '<button type="button" class="btn btn-primary" data-toggle="modal" style="width:100%" onclick="getNew(' +
          orderNoticias[i].id +
          ')" data-target="#exampleModalScrollable">Leer mas...</button>' +
          "</div>" +
          "</div>"
      );

      row.append(col);
      row.append(col1);
      row.append(col2);

      firstCol.append(row);

      news.append(firstCol);
    } else {
      var firstCol = $("<div>", {
        class: "col-4",
        id: i
      });

      var card = $('<div class="card">');
      var img = $(
        '<img class="imgCard" src="' +
          orderNoticias[i].img_url +
          '" class="card-img-top" alt="...">'
      );
      var cardbody = $('<div class="card-body">');
      var title = $('<p class="card-title">' + orderNoticias[i].title + "</p>");
      var button = $(
        '<button type="button" class="btn btn-primary btnCard" data-toggle="modal" onclick="getNew(' +
          orderNoticias[i].id +
          ')" data-target="#exampleModalScrollable">Leer mas...</button>'
      );

      cardbody.append(title);
      cardbody.append(button);
      card.append(img);
      card.append(cardbody);

      firstCol.append(card);

      news.append(firstCol);
    }
  }
}

function pushModal(data) {
  var title = $("#modalTitle");
  var header = $("#modalHeader");
  var content = $("#modalContent");
  var img = $("#modalImg");

  //limpiamos los textos
  title.empty();
  header.empty();
  content.empty();

  //Solo muestro la segunda imagen si es distita de la primera
  if (data.img_url != data.img2_url) {
    $(".modal-body").append(
      '<img id="modalImg" src="' + data.img2_url + '" alt="" />'
    );
  }
  title.append(data.title);
  header.append(data.header);
  img.attr("src", data.img_url);
  content.append(data.content);
}
