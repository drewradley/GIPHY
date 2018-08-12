{/* <script type="text/javascript"> */}


var movies = ["goth", "Robert Smith", "Siouxsie", "Sisters of Mercy"];
var img = $('<img>');
var imgStatic = $('<img>');
var paused = true;
$('.jumbotron').hide();


function renderButtons() {
  $("#movie-input").val("")
  $("#buttons-view").empty();
  for(var i=0;i<movies.length;i++)
  {
    createInput(); 
    function createInput(){
       var input = $(`<input type="button" value="${movies[i]}" class ="buttonM btn btn-primary"/>`)
        input.appendTo($("#buttons-view"));
      }
    
    
  }

  
}
function alertMovieName() {

  var query = 'batman';
  var  searchType = 'random';
  var url = `http://api.giphy.com/v1/gifs/search?q=${searchType}+${query}&api_key=dc6zaTOxFJmzC&tag`;
  
  $('.jumbotron').show();
  $("#movies-view").empty();
  $(".chicken").empty();
  // var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=cats";

  var queryURL = `https://api.giphy.com/v1/gifs/search?q=${$(this).attr("value")}&api_key=dc6zaTOxFJmzC&limit=12`;
  // queryURL=`http://api.giphy.com/v1/gifs/search?q=${searchType}+${$(this).attr("value")}&api_key=dc6zaTOxFJmzC&tag&limit=12`;
  // var queryURL = `https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=${$(this).attr("value")}`;
  QueryCall();
  // RandomGIF();
  function RandomGIF()
  {
    // queryURL = `https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=${$(this).attr("value")}`;
    $.ajax({
        url: url,
        method: "GET"
      }).then(function(response) {
          console.log(response.data[0].images.fixed_height_still.url);
          img =$('<img>');
          img.attr('src',response.data[0].images.fixed_height_still.url);
          $('.chicken').append(img);
      });
  }
  function QueryCall()
  {
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        var gifs = response.data;
        
        gifs.forEach(function(gif) {
          row=$('<div>');
            row.addClass("row")
          column=$('<div>');
            column.addClass("col-4 card")
          div=$('<div>');
            div.addClass("card-body")
          card=$('<div>');
            card.addClass("card mx-auto")
          img =$('<img>');
            img.addClass("GIFme card-img-top")
          // console.log(gif.title)
            img.attr('still',gif.images.fixed_height_still.url);
            img.attr('move',gif.images.fixed_height.url);
            img.attr('state','still');
            img.attr('src',gif.images.fixed_height_still.url);
            img.attr('alt',gif.title);
        
        
      $('.chicken').append(column);
            column.append(img);
            column.append(div);
            div.append(`<h5 class="card-title">Rated ${gif.rating.toUpperCase()}</h5>`)
            div.append(`<p class="card-text"> ${gif.title}</p>`)

        })
      });
  }


}

$(document).on('click', '.GIFme', function() {
  var state = $(this).attr("state");
  if(state === "still")
  {
    $(this).attr("state","move")
    var moveSRC =$(this).attr("move")
    // console.log(moveSRC)
    $(this).attr("src", $(this).attr("move"))
  }
  else
  {
    $(this).attr("state","still")
    var stillSRC =$(this).attr("still")
    // console.log(stillSRC)
    $(this).attr("src", $(this).attr("still"))
  }
//   var src = $(this).attr("src");
//     if($(this).hasClass('playing')){
//   //stop
//       $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
//       $(this).removeClass('playing');
//     } else {
//   //play
//         $(this).addClass('playing');
//         $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
// }
}); 


$(document).on("click", ".buttonM", alertMovieName);

$("#add-movie").on("click", function(event) {

  // event.preventDefault() prevents submit button from trying to send a form.
  // Using a submit button instead of a regular button allows the user to hit
  // "Enter" instead of clicking the button if desired
  event.preventDefault();
  var mM = $("#movie-input").val().trim();
  
  for(var i=0;i<movies.length; i++)
  {
    if(mM.toLowerCase()==movies[i].toLowerCase()||mM=="")
    {
      return;
    }
  }
  if (mM!=="")
  {
           
    movies.push(mM);
  
  // Write code to grab the text the user types into the input field
  // Write code to add the new movie into the movies array

  // The renderButtons function is called, rendering the list of movie buttons
  
  renderButtons();
 
}
});

// Calling the renderButtons function to display the initial list of movies
renderButtons();
