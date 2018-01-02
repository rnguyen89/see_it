'use strict';
  
const TMDB_SEARCH_URL = 'https://api.themoviedb.org/3/discover/movie?';
  
const TMDB_POSTER = 'https://image.tmdb.org/t/p/w185/'; 

// const TMDB_TRAILER = `https://api.themoviedb.org/3/movie/${item.id}/videos?`


// This function receives data from AJAX and appends data to DOM

function callback(data) {
  $('.js-results').html('');
  $.each(data.results, function(i, item) {
    
    var div = $(`
 
      <li>
        <div class="collapsible-header"><i class="medium material-icons">movie</i>
            ${item.title}
            </div>
          <div class="collapsible-body">
            <div class="row">
              <div class="col m4 s12 center">
                <img class="materialboxed responsive-img poster" data-caption="Poster of the movie: ${item.title}" src="http://image.tmdb.org/t/p/w500/${item.poster_path}"></div>
                    <div class="col m8 s12 movie-desc center">
                      <p class="movie-desc1">${item.overview}</p>
                  </div>
                      <p>Vote Average: ${item.vote_average} & count ${item.vote_count} & pop ${item.popularity}</p>
                  </div>
                  <div class="center-align">
                  <a class="center-align waves-effect waves-light btn modal-trigger red darken-2" href="#modal1">Trailer</a>
                  </div>
           </div>
            
           </li>
       `) 
      
       div.click(function(e) {
        openModal(item);
       })

      $('.js-results').append(div)
      $('.collapsible').collapsible();
      $('.materialboxed').materialbox();
      $('.modal').modal();
      
  })
  console.log(data);
}

function openModal(item){
  $('.modal-content h4').text(item.title);
  getTrailer(item);
}

      // second endpoint //
//need to get key from second endpoint
//need to use ${item.id} to get correct key
//need to add key to youtube link:
  // "//www.youtube.com/embed/${key-goes-here}?rel=0"



$('#js-search-form').submit(function (e) {
  e.preventDefault();
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
    success: callback
  };
      
    $.ajax(settings);
    $('.js-search').val("")
});
    
//render to dom

function callbackTrailer(data) {
  console.log(data);
  if(data.results.length > 0) {
    $('#trailer').attr("src",`//www.youtube.com/embed/${data.results[0].key}?rel=0`);
  } else {
    $('.model-content h4').text("Trailer not found");
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