

let $table = $('#table')
let $remove = $('#remove')
var selectedRow = null
var mapNoticias = null

$( $table ).ready(function() {
    getNews();
});

function getNews(){
    $.get("http://127.0.0.1:8000/api/noticia/", data => {
        if(data != []){
            //   for (i = 0; i < data.length; i++) {
            //       console.log(data[i]);
            //   }
            orderNews(data);
          }else{
              //TODO: Delete table
          }
          })
      }

// ordena por fecha las noticias
function orderNews(data){
 
    //"05-11-2019 22:20:44"
    orderNoticias = data.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return dateFormat(new Date(b.pub_date), "dd-mm-yyyy H:MM:ss") -  dateFormat(new Date(a.pub_date), "dddd, mmmm dS, yyyy, h:MM:ss TT");
      });
    insertNews();
}


/**Futuras modificaciones
 * <div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
 */

 function insertNews(){
    const news = $('#news');
    for (i = 0; i < 10; i++) {
        if(i === 0){
            var firstCol =$('<div>', {
                'class': 'col-12 border border-primary',
                'id': i
            })
            var row = $('<div>', {
                'class': 'row',
            })
            var col = $('<div>', {
                'class': 'd-flex col-12 justify-content-center align-content-center'
            })
            col.append($('<h2>'+ orderNoticias[i].title +'</h2>'))
            var col1 = $('<div>', {
                'class': 'col-6'
            })
            col1.append($('<img src=' + orderNoticias[i].img_url + '></img>'))
            var col2 = $('<div>', {
                'class': 'd-flex col-6'
            })
            col2.append($('<h4>'+ orderNoticias[i].header +'</h4>'))
            var button = $('<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalScrollable">Leer mas...</button>')

            col2.append(button);

            row.append(col);
            row.append(col1);
            row.append(col2);

            firstCol.append(row);

            news.append(firstCol);
        }else{
            var firstCol =$('<div>', {
                'class': 'col-4',
                'id': i
            })

            var card = $('<div class="card">')
            var img = $('<img src="'+orderNoticias[i].img_url+'" class="card-img-top" alt="...">')
            var cardbody = $('<div class="card-body">')
            var title = $('<p class="card-title">'+ orderNoticias[i].title +'</p>');
            var button = $('<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalScrollable">Leer mas...</button>')

            cardbody.append(title);
            cardbody.append(button);
            card.append(img);
            card.append(cardbody);
            
            firstCol.append(card);

            news.append(firstCol);
        }
    }
 }
