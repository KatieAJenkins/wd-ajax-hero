'use strict';
$(document).ready(function(){
  'use strict';
  // console.log('connected');
  var movies = [];
  console.log(movies);

  var renderMovies = function() {
    $('#listings').empty();

    for (var movie of movies) {
      var $col = $('<div class="col s6">');
      var $card = $('<div class="card hoverable">');
      var $content = $('<div class="card-content center">');
      var $title = $('<h6 class="card-title truncate">');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.title
      });

      $title.tooltip({ delay: 50, });
      $title.text(movie.title);

      var $poster = $('<img class="poster">');

      $poster.attr({
        src: movie.poster,
        alt: `${movie.poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      var $action = $('<div class="card-action center">');
      var $plot = $('<a class="waves-effect waves-light btn modal-trigger">');

      $plot.attr('href', `#${movie.id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      var $modal = $(`<div id="${movie.id}" class="modal">`);
      var $modalContent = $('<div class="modal-content">');
      var $modalHeader = $('<h4>').text(movie.title);
      var $movieYear = $('<h6>').text(`Released in ${movie.year}`);
      var $modalText = $('<p>').text(movie.plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };

  $('#search' ).click( "click", addMovie);

  function addMovie(movies) {
    event.preventDefault();
    let inputValue = $("input").val();
    console.log('inputValue ', inputValue);
    let omdbApi = 'http://www.omdbapi.com/?s=';
    //
    // if(inputValue !== ''){
    //   console.log('not blank!');
    //   inputValue = '';
    // }
    //
    // if(inputValue === ''){
    //   console.log("Please enter a search value");
    // }

    let jsonData = $.getJSON(omdbApi + inputValue);

    jsonData.done(function(data){
      // console.log('running API call');
      // console.log(data.Search);
      let movieObject = {};
      let movieArray =[];
      let results = data.Search; //array like object returned
      console.log(results);
      for (var i = 0; i < results.length; i++){
        console.log(results[i]);
        // console.log(movies.push(results[i]));
        // console.log(movies);
        //build up results movie object
        // let movieObj = {};
        // movieObj.title = results[i].Title;
        // // //poster
        // movieObj.poster = results[i].Poster;
        // // //id
        // movieObj.id = results[i].imdbID;
        // // //plot
        // // // movieObj.plot = results[i].plot;
        // // console.log(movieObj);
        // // console.log(movies);
        // console.log(movieArray);
        // return movieObj;
      }
      renderMovies();
      // movieArray.push(movieObj);
      // movies.push(movieObj);
      // console.log(movies);
      // movies.push(movieObj);
      // console.log(movies);

      // for(var i = 0; i < results.length; i++){
      //   console.log(results[i]);
      //   console.log(results[i].Title);
      //   results[i].Title =
      // }
    });
  }
});
