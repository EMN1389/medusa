/* eslint-disable */ 
let api = '8a6c7fe283f2a91d936ae29cb5082fbf';
let lien = new URL(location.href);
let film= lien.searchParams.get("id");
let media= lien.searchParams.get("media");
let saisonep = lien.searchParams.get("s")+lien.searchParams.get("e");;

let url = `https://api.themoviedb.org/3/genre/${media}/list?api_key=${api}&language=fr-FR`
let url2 = `https://api.themoviedb.org/3/${media}/${film}?api_key=${api}&language=fr-FR`;
let url3 = `https://api.themoviedb.org/3/${media}/${film}/credits?api_key=${api}&language=fr-FR`


fetch(url).then(function(response) {
  let contentType = response.headers.get("content-type");
  if(contentType && contentType.indexOf("application/json") !== -1) {
    return response.json().then(function(json) {

        genres = document.querySelectorAll('.lecteur-kind');

        for (i=0; i < json.genres.length; i++){
            genres[i].textContent = json.genres[i].name;
        }

    });
} else {
  console.log("Attendu format JSON");
};
});

fetch(url2).then(function(response) {
  let contentType = response.headers.get("content-type");
  if(contentType && contentType.indexOf("application/json") !== -1) {
    return response.json().then(function(json) {
        titre = document.querySelector('.lecteur-movietitle');
        synopsis = document.querySelector('.lecteur-synopsispara');
        producteur = document.querySelector('.lecteur-producteur');
        genre = document.querySelector('.lecteur-genre');
        annee = document.querySelector('.lecteur-annee');
        langueo = document.querySelector('.lecteur-langueo');
        duree = document.querySelector('.lecteur-duree');
        notemoy = document.querySelector('.lecteur-notemoy');
        noteimg = document.querySelector('.noteimg');
        note = document.querySelector('.lecteur-note');
        commentaires = document.querySelector('.lecteur-commentaires');
        background = document.querySelector('.lecteur-bg');
        background.style.background = "url('https://image.tmdb.org/t/p/original/"+json.poster_path+"') no-repeat center";
        background.style.backgroundSize = "contain";
        titre.textContent = "Titre : "+json.title;
        synopsis.textContent = "Synopsis : "+json.overview;
        for (i=0; i <json.production_companies.length ; i++) {
          producteur.textContent += " - "+json.production_companies[i].name;
        }
        for (i=0; i <json.genres.length ; i++) {
          genre.textContent +=  " - "+json.genres[i].name+" ";
        }
        if (json.release_date == null) {
          date = json.first_air_date.split('-');
        } 
        else {
          date = json.release_date.split('-');
        }
        annee.textContent = "Date de sortie : "+date[2]+"/"+date[1]+"/"+date[0];
        langueo.textContent = "Langue originale : "+json.original_language;
        duree.textContent = "Durée : "+json.runtime+" min";
        notemoy.textContent = "Note moyenne : "+json.vote_average+"/10";
        if (json.vote_average >= 9) {
          noteimg.textContent = "*****";
        } else if (json.vote_average >= 7){
          noteimg.textContent = "****";
        }else if (json.vote_average > 5){
          noteimg.textContent = "***";
        }else if (json.vote_average >= 3){
          noteimg.textContent = "**";
        }else if (json.vote_average > 1){
          noteimg.textContent = "*";
        }else if (json.vote_average >= 0){
          noteimg.textContent = "";
        }
        note.textContent = "Nombres de notes : "+json.vote_count;
        commentaires.textContent = "Commentaires : "+json.title;

        idserie = film;
        saison = json.seasons.length;
        episodes = json.seasons[0].episode_count;
        urlsaisonep = `https://api.themoviedb.org/3/tv/${idserie}/season/${saison}?api_key=${api}&language=fr-FR`;

  

        fetch(urlsaisonep).then(function(response) {
          let contentType = response.headers.get("content-type");
          if(contentType && contentType.indexOf("application/json") !== -1) {
            return response.json().then(function(json2) {
              cards= document.querySelector('.lecteur-episodes-scroll');
              cards.innerHTML='';
              for (i=0; i < episodes; i++) {       
                cards.innerHTML += '<div class="lecteur-episodescontent">'+
                '<a href="lecteur.html?id='+json2.episodes[i].id+'" class="episodelinkimg">'+
                  '<img src="https://image.tmdb.org/t/p/original/'+json2.episodes[i].still_path+'" class="lecteur-episodescard">'+
                '</a>'+
                '<a href="lecteur.html?id='+json2.episodes[i].id+'" class="episodelinktitle">'+
                  '<p class="lecteur-episodestitle">'+json2.episodes[i].name+'</p>'+
                '</a>'+
              '</div>';
              }
            });
        } else {
          console.log("Attendu format JSON");
        };
        });


      
    });
  } else {
    console.log("Attendu format JSON");
  };
});

fetch(url3).then(function(response) {
  let contentType = response.headers.get("content-type");
  if(contentType && contentType.indexOf("application/json") !== -1) {
    return response.json().then(function(json) {
    json.crew.forEach(data => {
      if (data.job == "Producer") {
        realisateur = document.querySelector('.lecteur-realisateur');
        realisateur.textContent += " - "+data.name;
      }
        cards = document.querySelector('.lecteur-castingcards');
        for (i=0; i < json.cast.length; i++) {
          cards.innerHTML += '<div>'+
          '<a href="acteur.html?id='+json.cast[i].id+'" class="acteurlink">'+
            '<img src="https://image.tmdb.org/t/p/original/'+json.cast[i].profile_path+'" class="lecteur-castingcard">'+
          '</a>'+
          '<a href="acteur.html?id="'+json.cast[i].id+'" class="acteurlink2">'+
            '<p class="lecteur-castingcardname">'+json.cast[i].name+'</p>'+
            '<p class="lecteur-castingcardchar">'+json.cast[i].character+'</p>'+
          '</a>'+
        '</div>';
        }
    });
    });
} else {
  console.log("Attendu format JSON");
};
});

episodetitle = document.querySelector(".lecteur-movieepisode");
episodezone = document.querySelector(".lecteur-episodes-scroll");
if (media == "movie") {
  episodetitle.style.display = "none";
  episodezone.style.display = "none";
}