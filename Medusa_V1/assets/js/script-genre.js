/* eslint-disable */ 
let api = '8a6c7fe283f2a91d936ae29cb5082fbf';
let url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${api}&language=fr-FR`

fetch(url).then(function(response) {
  let contentType = response.headers.get("content-type");
  if(contentType && contentType.indexOf("application/json") !== -1) {
    return response.json().then(function(json) {

        card = document.querySelector('.genre-grid');
        cards2 = document.querySelector(".lecteur-menu-content");
        card.innerHTML = '';
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

            card.innerHTML += '<section class="genre-section">'+
            '<div class="genre-container">'+
                '<div class="genre-card">'+
                    '<img src="assets/images/art.jpg" alt="">'+
                    '<a href="liste.html?genre='+json.genres[i].name+'" class="lecteur-kind2">'+json.genres[i].name+'</a>'+
                '</div>'+
            '</div>'+
           '</section>';
            cards2.innerHTML += '<a href="liste.html?genre='+json.genres[i].name+'" class="lecteur-kind">'+json.genres[i].name+'</a>';
        }

    });
} else {
  console.log("Attendu format JSON");
};

});

