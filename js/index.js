'use strict';

const TMDB_SEARCH_URL = 'https://api.themoviedb.org/3/discover/movie?';

const TMDB_POSTER = 'https://image.tmdb.org/t/p/w185/';


function startSearchScroll() {
  window.scroll({
    top: $('#js-search-form').offset().top,
    left: 0,
    behavior: 'smooth'
  });
}

function clickScrollEvent() {
  $('.start-button').on('click', function(e){
    startSearchScroll();
  })
}


// This function receives data from AJAX and appends data to DOM

function callbackMovieData(data) {
  $('.js-results').html('');
  $.each(data.results, function (i, item) {
    var div = $(`
 
      <li>
        <div class="collapsible-header"><i class="medium material-icons">movie</i>
            ${item.title}
            </div>
          <div class="collapsible-body">
            <div class="row">
              <div class="col m4 s12 center">
                <img class="materialboxed responsive-img poster z-depth-5" data-caption="Poster of the movie: ${item.title}" src="http://image.tmdb.org/t/p/w500/${item.poster_path}"></div>
                  <div class="col m8 s12 movie-desc center">
                      <p class="movie-desc1">${item.overview}</p>
                      
                      <div class="center white-text user-avg">
                      
                      <p>
                      User Score: ${item.vote_average}<i class=" material-icons tiny">star</i></p>
                      </div>
                  </div>

              </div>
                  <div class="center-align">
                  <a class="center-align waves-effect waves-light btn modal-trigger red darken-2 pulse" href="#modal1">Trailer</a>
                  </div>
           </div>
            
           </li>
       `)

    div.click(function (e) {
      openModal(item);
    })

    $('.js-results').append(div)
    $('.collapsible').collapsible();
    $('.materialboxed').materialbox();
    $('.modal').modal();

  })
}

function openModal(item) {
  $('.modal-content h4').text(item.title);
  getTrailer(item);
}



// GET youtube key from TMDB API and render youtube movie trailer to DOM

function callbackTrailer(data) {
  if (data.results.length > 0) {
    $('#trailer').attr("src", `//www.youtube.com/embed/${data.results[0].key}?rel=0`);
  } else {
    $('.modal-content h4').text("Trailer not found");
    $('#trailer').attr("src", "");
  }
}

function getTrailer(item) {

  const TMDB_TRAILER = `https://api.themoviedb.org/3/movie/${item.id}/videos?`

  const trailerKey = {
    url: TMDB_TRAILER,
    data: {
      api_key: '726674d72b203bef2e539a683d3d257b',
      language: 'en-US',
    },

    dataType: 'json',
    type: 'GET',
    success: callbackTrailer
  };

  $.ajax(trailerKey);

}

function getMovieData() {
  var q = $('.js-search').val();
  const settings = {
    url: TMDB_SEARCH_URL,
    data: {
      api_key: '726674d72b203bef2e539a683d3d257b',
      language: 'en-US',
      sort_by: 'popularity.desc',
      include_adult: false,
      include_video: true,
      page: 1,
      primary_release_year: q
    },

    dataType: 'json',
    type: 'GET',
    success: callbackMovieData
  };

  $.ajax(settings);
  $('.js-search').val("")
};

function watchSubmit(){
    clickScrollEvent();
    $('#js-search-form').submit(function (e) {
      e.preventDefault();
      getMovieData();
      getTrailer();
    });
  }

  watchSubmit();