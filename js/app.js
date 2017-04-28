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
      let results = data.Search; //array like object returned
      console.log(results);
      results.push(movies);
      console.log(movies);

      // for(var i = 0; i < results.length; i++){
      //   console.log(results[i]);
      //   console.log(results[i].Title);
      //   results[i].Title =
      // }
    })
  }
});


////////EXTRA CODE/////////////
  //
  // function addMovie(event) {
  // var target = $(event.target).text();
  // console.log(target);
  //
  // };
