/* eslint-disable */ 
api = '8a6c7fe283f2a91d936ae29cb5082fbf';
let closebtn = document.querySelector('.btn-genre');
let inputsearch = document.querySelector('.search-input2'); 


function myFunction() {
  let liens = document.querySelector(".lecteur-menu");
  let contenu = document.querySelector(".contenu");
  if (liens.style.display === "block") {
    liens.style.display = "none";
    closebtn.src = "assets/images/btn-genre.svg";
    inputsearch.style.display ='block';
  } else {
    liens.style.display = "block";
    closebtn.src = "assets/images/btn-close.svg";
    inputsearch.style.display ='none';
  }
  contenu.classList.toggle("lecteur-none");
  this.classList.toggle("lecteur-change");
}

  const hamburger = document.querySelector('.lecteur-icon');
  hamburger.addEventListener('click', myFunction);

  let monInput = document.querySelector(".search-input2");
  let alertmess = document.querySelector(".lecteur-menu-alert");
  let alertbtn = document.querySelector('.lecteur-closebtn');


  alertbtn.addEventListener('click', function(){
    alertmess.classList.toggle("lecteur-none");
    inputsearch.style.display ='none';
  })


  monInput.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {

      let url = `https://api.themoviedb.org/3/search/movie?api_key=${api}&query=${monInput.value}`;
      fetch(url).then(function(response) {
        let contentType = response.headers.get("content-type");
        if(contentType && contentType.indexOf("application/json") !== -1) {
          return response.json().then(function(json) {
          
            if (json.results == null || json.results ==''){
              alertmess.classList.toggle("lecteur-none");
            }
            else {
              window.location.href = "liste.html?keyword="+monInput.value;
            }

          });
      } else {
        console.log("Attendu format JSON");
      };
      
      });



      
    }
  });
