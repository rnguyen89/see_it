//future goals
  //implement lightbox
  //play thumbnails within same page

  'use strict';
  
  //note to always add 'callback=?'
  const TMDB_SEARCH_URL = 'https://api.themoviedb.org/3/discover/movie?';
  
//   const API = '726674d72b203bef2e539a683d3d257b'; 
  

// loop through data

function callback(data) {
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
        console.log(json);
      });
    
