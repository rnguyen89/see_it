'use strict';
  
const TMDB_SEARCH_URL = 'https://api.themoviedb.org/3/discover/movie?';
  
const TMDB_POSTER = 'http://image.tmdb.org/t/p/w185/'; 

const TMDB_TRAILER = 'https://api.themoviedb.org/3/movie/177572/videos?api_key=726674d72b203bef2e539a683d3d257b&language=en-US'

// loop through data

function callback(data) {
  $('.js-results').html('');
  $.each(data.results, function(i, item) {
    
      $('.js-results').append(`
 
          <li>
           <div class="collapsible-header"><i class="medium material-icons">movie</i>
           ${item.title}
           </div>
           <div class="collapsible-body">
           <div><img class="materialboxed responsive-img" data-caption="Poster of the movie: ${item.title}" src="http://image.tmdb.org/t/p/original/${item.poster_path}"></div>
           <div class="movie-desc center">
           <p class="movie-desc1">${item.overview}</p>
           </div>
           <p>Vote Average: ${item.vote_average} & count ${item.vote_count} & pop ${item.popularity}</p>
           <a href="https://www.themoviedb.org/movie/${item.id}/videos">link to video</a>
           </div>
 
 
      `) 
      $('.collapsible').collapsible();
      $('.materialboxed').materialbox();
      
      
  })
  console.log(data);
}


// function callback(data) {
//     $('.js-results').html('');
//     $.each(data.results, function(i, item) {
      
//         $('.js-results').append(`
   
//           <div class="wrapper center">
//             <img src="http://image.tmdb.org/t/p/w185/${item.poster_path}">
//             <div class="center">
//               <h2>${item.title}</h2>
//               <p class="movie-desc">${item.overview}</p>
//               <p>Vote Average: ${item.vote_average} & count ${item.vote_count} & pop ${item.popularity}</p>
//               <a href="https://www.themoviedb.org/movie/${item.id}/videos">link to video</a>
//             </div>
//           </div>
   
//         `) 
      
//     })
//     console.log(data);
// }


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

