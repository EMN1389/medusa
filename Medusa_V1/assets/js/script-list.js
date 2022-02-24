/* eslint-disable */ 
let api = '8a6c7fe283f2a91d936ae29cb5082fbf';
let lien = new URL(location.href);
let keyword = lien.searchParams.get("genre")??lien.searchParams.get("keyword");
let media= "movie";

let page = 1;

url = `https://api.themoviedb.org/3/search/movie?api_key=${api}&query=${keyword}&page=${page}`;
url2 = `https://api.themoviedb.org/3/genre/movie/list?api_key=${api}&language=fr-FR`;

requete();
function changepage() {
  console.log(page);
  page = this.textContent;
  url = `https://api.themoviedb.org/3/search/movie?api_key=${api}&query=${keyword}&page=${page}`;
  requete();
}



function requete() {
  fetch(url).then(function(response) {
    let contentType = response.headers.get("content-type");
    if(contentType && contentType.indexOf("application/json") !== -1) {
      return response.json().then(function(json) {
        cards = document.querySelector('.genre-grid');
        cards.innerHTML = '';

        pagination = document.querySelector('.pagination-div');

        console.log(json.total_pages);
        pagination.innerHTML = '';
        for (i=1; i <= json.total_pages; i++) {
          pagination.innerHTML += '<a class="pagination" href="#">'+i+'</a>';
        }
        pageselect = document.querySelectorAll(".pagination");
        for (i=0; i < pageselect.length; i++){
          
          pageselect[i].addEventListener('click', changepage);
        }
        for (i=0; i< json.results.length; i++){
          if (json.results[i].backdrop_path == null) {
            source = "assets/images/art.jpg";
          }else {
            source = 'https://image.tmdb.org/t/p/original/'+json.results[i].backdrop_path+'"';
          }
          cards.innerHTML += '<section class="genre-section">'+
            '<div class="genre-container">'+
                '<div class="genre-card">'+
                    '<a href="lecteur.html?id='+json.results[i].id+'&media='+media+'" class="list-movielink">'+
                      '<img class="list-movie" src="'+source+'" alt="">'+
                    '</a>'+
                    '<a href="lecteur.html?id='+json.results[i].id+'&media='+media+'" class="list-title">'+json.results[i].title+'</a>'+
                '</div>'+
            '</div>'+
            '</section>'
        }
      });
  } else {
    console.log("Attendu format JSON");
  }
  });


  fetch(url2).then(function(response) {
    let contentType = response.headers.get("content-type");
    if(contentType && contentType.indexOf("application/json") !== -1) {
      return response.json().then(function(json) {
          cards2 = document.querySelector(".lecteur-menu-content");
          cards2.innerHTML = '<a href="homepage.html">'+
          '<img class="lecteur-menu-picture" src="https://st.depositphotos.com/1026550/2436/i/600/depositphotos_24363035-stock-photo-empty-room.jpg" alt="">'+
        '</a>'+
        '<h3>Identifiant</h3>'+
        '<div class="lecteur-menu-search">'+
          '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 lecteur-menu-searchicon" fill="none" viewBox="0 0 24 24" stroke="currentColor">'+
            '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />'+
          '</svg>'+
          '<input type="text" name="search" class="lecteur-menu-searchinput">'+
        '</div>'+
        '<div class="lecteur-menu-alert lecteur-none">'+
          '<span class="lecteur-closebtn">&times;</span>'+
          '<strong>Erreur !</strong> Aucun résultat trouvé'+
        '</div>'+
        '<h3>Favoris</h3>';
          for (i=0; i < json.genres.length; i++){
              cards2.innerHTML += '<a href="liste.html?genre='+json.genres[i].name+'" class="lecteur-kind">'+json.genres[i].name+'</a>';
          }

      });
  } else {
    console.log("Attendu format JSON");
  };

  });
}