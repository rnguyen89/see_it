//future goals
  //implement lightbox
  //play thumbnails within same page

'use strict';
  
const TMDB_SEARCH_URL = 'https://api.themoviedb.org/3/discover/movie?';
  
const TMDB_POSTER = 'http://image.tmdb.org/t/p/w185/';  

// loop through data

function callback(data) {
  const results = data.items.map((item, index) => renderResult(item));
    $('.js-results').html(results);
}


function callback(data) {
    
    $.each(data, function(i, item) {

          $('.js-results').html(`
          <div class="center">
          <img src="http://image.tmdb.org/t/p/w185/${data.results[0].poster_path}">
        </div>
        <div class="center">
        <h2>${data.results[0].title}</h2>
        <p>${data.results[0].overview}</p>
      </div>

      <div class="center">
      <img src="http://image.tmdb.org/t/p/w185/${data.results[1].poster_path}">
    </div>
    <div class="center">
    <h2>${data.results[1].title}</h2>
    <p>${data.results[1].overview}</p>
    </div>
    <div class="center">
    <img src="http://image.tmdb.org/t/p/w185/${data.results[2].poster_path}">
    </div>
    <div class="center">
    <h2>${data.results[2].title}</h2>
    <p>${data.results[2].overview}</p>
    </div>
    `)
      
    })
    console.log(data);
}

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
      });
    
//render to dom

// function renderResult(items) {
//   console.log(items);
//     $('.js-results').html(`
//       <div>
//         <img src="TMDB_POSTER ${index.results[0].poster_path}">
//       </div>
//     `)
// }
