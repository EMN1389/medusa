/* eslint-disable */ 
let api = '8a6c7fe283f2a91d936ae29cb5082fbf';
let media = 'movie';

let url = `https://api.themoviedb.org/3/trending/${media}/day?api_key=${api}&language=fr-FR`;
let url2 = `https://api.themoviedb.org/3/${media}/top_rated?api_key=${api}&language=fr-FR&page=1`;
let url3 = `https://api.themoviedb.org/3/${media}/popular?api_key=${api}&language=fr-FR&page=1`;
let url4 = `https://api.themoviedb.org/3/genre/${media}/list?api_key=${api}&language=fr-FR`;
let url5 = `https://api.themoviedb.org/3/person/popular?api_key=${api}&language=fr-FR&page=1`;

switchinput = document.querySelector('.homepage-tendances-switchon');
switchinput.addEventListener('click', switchtoggle);

function switchtoggle(){
    if (media =="movie") {
        media ="tv";
        switchinput.setAttribute("src", "assets/images/btn-film-serie.svg");
        url = `https://api.themoviedb.org/3/trending/${media}/day?api_key=${api}&language=fr-FR`;
        url2 = `https://api.themoviedb.org/3/${media}/top_rated?api_key=${api}&language=fr-FR&page=1`;
        url3 = `https://api.themoviedb.org/3/${media}/popular?api_key=${api}&language=fr-FR&page=1`;
        url4 = `https://api.themoviedb.org/3/genre/${media}/list?api_key=${api}&language=fr-FR`;
        
    }
    else {
        media ="movie";
        switchinput.setAttribute("src", "assets/images/btn-serie-mobile.svg");
        url = `https://api.themoviedb.org/3/trending/${media}/day?api_key=${api}&language=fr-FR`;
        url2 = `https://api.themoviedb.org/3/${media}/top_rated?api_key=${api}&language=fr-FR&page=1`;
        url3 = `https://api.themoviedb.org/3/${media}/popular?api_key=${api}&language=fr-FR&page=1`;
        url4 = `https://api.themoviedb.org/3/genre/${media}/list?api_key=${api}&language=fr-FR`;
    }
    requete();
}

window.onload = function() {
  
requete();
};

function requete() {
        fetch(url).then(function(response) {
        let contentType = response.headers.get("content-type");
        if(contentType && contentType.indexOf("application/json") !== -1) {
          return response.json().then(function(json) {
          cards = document.querySelector(".homepage-tendances .homepage-container .homepage-cards");
          cards.innerHTML = '';
          for (i=0; i < json.results.length; i++) {
              if (json.results[i].backdrop_path == null) {
                source = "assets/images/art.jpg";
              }else {
                source = 'https://image.tmdb.org/t/p/w500/'+json.results[i].poster_path+'';
              }

              titreh2 = json.results[i].title??json.results[i].name;
              cards.innerHTML += '<div class="homepage-cards-theCard">'+
                '<a href="lecteur.html?id='+json.results[i].id+'&media='+media+'" class="movie_linkimg">'+
                    '<img class="homepage-tendances-images" src="'+source+'" alt="">'+
                '</a>'+ 
                '<div class="homepage-theCard-title">'+
                  '<a href="lecteur.html?id='+json.results[i].id+'&media='+media+'" class="movie_link">'+
                      '<h2 class="original_title">'+titreh2+'</h2>'+
                  '</a>'+
                // '<div class="homepage-theCard-note">'+
                //       '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">'+
                //           '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />'+
                //       '</svg>'+
                //       '<p class="views">'+json.results[i].popularity+'</p>'+
                //   '</div>'+
              '</div>'+
          '</div>';
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
            cards = document.querySelector(".homepage-bestnote .homepage-container .homepage-cards");
            cards.innerHTML = '';
            for (i=0; i < json.results.length; i++) {
              cards.innerHTML += '<div class="homepage-cards-theCard">'+
              '<a href="lecteur.html?id='+json.results[i].id+'&media='+media+'" class="movie_link2img">'+
                  '<img class="homepage-rank-images" src="https://image.tmdb.org/t/p/original/'+json.results[i].poster_path+'" alt="">'+
              '</a>'+
              '<div class= "homepage-theCard-title">'+
                  '<a href="lecteur.html?id='+json.results[i].id+'&media='+media+'" class="movie_link2">'+
                      '<h2 class="original_titlerank">'+json.results[i].title+'</h2>'+
                  '</a>'+
                  // '<div class="homepage-theCard-note">'+
                  //     '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">'+
                  //         '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />'+
                  //     '</svg>'+
                  //     '<p class="rank">'+json.results[i].vote_average+'/10</p> '+
                  // '</div>'+
              '</div>'+
          '</div>';
           }
            });
        } else {
          console.log("Attendu format JSON");
        };
      });
      
      fetch(url3).then(function(response) {
          let contentType = response.headers.get("content-type");
          if(contentType && contentType.indexOf("application/json") !== -1) {
            return response.json().then(function(json) {
            cards = document.querySelector(".homepage-popu .homepage-container .homepage-cards");
            cards.innerHTML = '';
            for (i=0; i < json.results.length; i++) {

              cards.innerHTML += '<div class="homepage-cards-theCard">'+
                  '<a href="lecteur.html?id='+json.results[i].id+'&media='+media+'" class="movie_link3img">'+
                      '<img class="homepage-popularity-images" src="https://image.tmdb.org/t/p/original/'+json.results[i].poster_path+'" alt="">'+
                  '</a>'+
                  '<div class= "homepage-theCard-title">'+
                      '<a href="lecteur.html?id='+json.results[i].id+'&media='+media+'" class="movie_link3">'+
                          '<h2 class="original_titlepopularity">'+json.results[i].title+'</h2>'+
                      '</a>'+
                      // '<div class="homepage-theCard-note">'+
                      //     '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">'+
                      //         '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />'+
                      //     '</svg>'+
                      //     '<p class="popularity">'+json.results[i].popularity+'</p>'+
                      // '</div>'+
                  '</div>'+
              '</div>';
            }
            });
        } else {
          console.log("Attendu format JSON");
        };
        
        });
      
        fetch(url4).then(function(response) {
          let contentType = response.headers.get("content-type");
          if(contentType && contentType.indexOf("application/json") !== -1) {
            return response.json().then(function(json) {
        
                genres = document.querySelectorAll('.lecteur-kind');
                genres2 = document.querySelectorAll('.genres');
                for (i=0; i < genres.length; i++){
                    genres[i].textContent = json.genres[i].name;
                    genres[i].href = 'liste.html?genre='+json.genres[i].name;
                }
                for (i=0; i < genres2.length; i++){
                    genres2[i].textContent = json.genres[i].name;
                    genres2[i].href = 'liste.html?genre='+json.genres[i].name;
                }
            });
        } else {
          console.log("Attendu format JSON");
        };
        
        });
      
      fetch(url5).then(function(response) {
          let contentType = response.headers.get("content-type");
          if(contentType && contentType.indexOf("application/json") !== -1) {
            return response.json().then(function(json) {
              cards = document.querySelector(".homepage-actor-container");
              cards.innerHTML = '';
                for (i=0; i < json.results.length; i++){
                  cards.innerHTML += '<div class="homepage-actor-card">'+
                            '<img class="actor_img" src="https://image.tmdb.org/t/p/w500/'+json.results[i].profile_path+'" alt="">'+
                            '<a href="acteur.html?id='+json.results[i].id+'" class="actor_name">'+json.results[i].name+'</a>'+
                        '</div>';
                }
        
            });
        } else {
          console.log("Attendu format JSON");
        };
        
        });

}
