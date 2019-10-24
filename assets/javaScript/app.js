$(document).ready(function(){
    // Default topics array
    var topics = ['Pogs', '90s Taco Bell', 'Furby', 'Tamagotchi Toy', 'Aerosmith', 'Trolls 90s', 'Street Sharks'];
    
    
   
   
    // creating buttons
    function createButtons(){
        
        $('#button-spot').empty();
        
        // iterate through topics array
        for (let t = 0; t < topics.length; t++) {
            const selection = topics[t];
            
            // Materialize button tag variable
            var button = $('<a class="waves-effect orange waves-light btn-large"</a>');
            // Assign selection as data-name attribute to all buttons
            button.attr('data-name', selection);
            // Set button text to display corresponding option
            button.text(selection);
            // Appends button to #button-spot
            $('#button-spot').append(button);
        }
    }

    // click function for adding new item to topics array
    $('#submit-button').on('click', function(){
        event.preventDefault();

        // save input value as a variable
        var newGif = $('#gif_selection').val().trim();
        // push input value data to topics array
        topics.push(newGif);
        // call createButtons again, now that newGif has been added to topics array
        createButtons();
        
    })

    // Run createButtons function
    createButtons();

    // Create function for starting and stopping gifs
    $(document).on('click', '.gif', function(){

        var state = $(this).attr('data-type');

        if (state === 'still') {
            // if data type = 'still', change 'src' attr to 'data-animate' and change 'data-type' attr to 'animate'
            $(this).attr('src', $(this).attr('data-animate'));
            $(this).attr('data-type', 'animate');
        } else {
            // else change back to 'data-still' and 'still'
            $(this).attr('src', $(this).attr('data-still'));
            $(this).attr('data-type', 'still');
        }

    })
    
    
    // click event listener on buttons
    $(document).on('click', '.btn-large', function() {
        
        // clear previously displayed results
        $('#gif-spot').empty();
        
        // data-name property value sorted from button
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
            
            // store returned data as results variable
            var results = response.data;
            
            // iterate through results items
            for (let r = 0; r < results.length; r++) {
                // create variables for setting img attributes
                var datGif = results[r];
                var stillImgUrl = datGif.images.fixed_height_still.url;
                var imgURL = datGif.images.fixed_height.url;
                
                
                // create parent div for datGif content
                var gifDiv = $('<div>');
                
                // create rating p tag
                var gifRating = $('<p>').text('Rating: '+datGif.rating);
                
                // create image tag and setting src attr to datGif image
                var gifImage = $('<img class="gif">');
                gifImage.attr('src', stillImgUrl);
                gifImage.attr('data-still', stillImgUrl);
                gifImage.attr('data-animate', imgURL);
                // gif loads in a still state
                gifImage.attr('data-type', 'still');

                // append gifRating and gifImage to gifDiv
                gifDiv.append(gifRating);
                gifDiv.append(gifImage);
                
                // prepend gifDiv to DOM in #gif-spot
                $('#gif-spot').prepend(gifDiv);
                
                
            }
        })
    })
})






