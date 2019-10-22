// click event listener on buttons
$('.btn-large').on('click', function() {

    // clear previously displayed results
    $('#gif-spot').empty();

    // data-name property value sotred from button
    var searchTerm = $(this).attr('data-name');
    // query variable concatenated with searchTerm value
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=LBJytWzpwJ4zbDuVEoyEEbeC3vd9SdYd&limit=10&q=" + searchTerm;
    
    // ajax get request from giphy with queryURL
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
        // after making request, then...
        .then(function(response){
            // console log response
            console.log(response);

            // store returned data as results variable
            var results = response.data;

            // iterate through results items
            for (let r = 0; r < results.length; r++) {
                const datGif = results[r];

                // create parent div for datGif content
                var gifDiv = $('<div>');

                // create rating p tag
                var gifRating = $('<p>').text('Rating: '+datGif.rating);

                // create image tag and setting src attr to datGif image
                var gifImage = $('<img>');
                gifImage.attr('src', datGif.images.fixed_height.url);

                // append gifRating and gifImage to gifDiv
                gifDiv.append(gifRating);
                gifDiv.append(gifImage);

                // prepend gifDiv to DOM in #gif-spot
                $('#gif-spot').prepend(gifDiv);

                
            }
        })
    
    
})