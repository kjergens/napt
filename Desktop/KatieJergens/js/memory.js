// Global vars
var card_to_match;
var turns;
var win = false;
var cardset;
var allcards;

var setup = function() {

	if (win) {
		$(".modal-overlay").show();
		$(".modal").fadeIn("slow");
	}

	// Initialize
	card_to_match = null;
	turns = 0;
	win = false;

	cardset = cardset.concat(cardset); // make doubles

	// Shuffle the array of cards
	this.$cardset = $(shuffleCards(cardset));

	// Arrange the cards on the board
	var board = '';
	this.$cardset.each(function(key, val){
		board += '<div class="card_container" data-id="'+ val.id +'"><div class="card">\
		<div class="card_face"><img src="'+ val.img +'"\
		alt="'+ val.name +'" /></div>\
		<div class="card_back"><img src="img/card_decoration.svg"></div></div>\
		</div>';
	})

	// Put board on the page
	$(".game").html(board);

	// Bind event handlers
	$(".card_container").on("click", cardClicked);
	$(".close").on("click", closeModal);

   $('#easy').click(function () {
    	console.log("Easy");
    	cardset = allcards.slice(0,4);
    	setup();
  });

	// Reveal
	$(".game").show("slow");

};

// Fisher--Yates Algorithm -- http://bost.ocks.org/mike/shuffle/
var shuffleCards = function(array){

	var counter = array.length, temp, index;
 	// While there are elements in the array
 	while (counter > 0) {
    	// Pick a random index
    	index = Math.floor(Math.random() * counter);
    	// Decrease counter by 1
    	counter--;
    	// And swap the last element with it
    	temp = array[counter];
    	array[counter] = array[index];
    	array[index] = temp;
  	}
  	return array;

};

// Handle card clicked
var cardClicked = function(){
	var $card = $(this);

	// If card is not matched nor picked
	if (!$card.find(".card").hasClass("matched") 
		&& !$card.find(".card").hasClass("active")){

		// Mark the card as active, as in, it's in play.
		$card.find(".card").addClass("active");

		// If there is no other active card, mark this as the card_to_match
		if(!card_to_match){
			card_to_match = $(this).attr("data-id");
		} else { 
				if ($(this).attr("data-id") == card_to_match){
					// Mark both active cards as matched
					setTimeout(function(){
						$(".active").addClass("matched");

						console.log($(".card.matched").length);

						// Check if won
						if($(".card.matched").length == cards.length){


							// Notify of win
							var win_text = "You Won in " + turns + " turns.";
						  $("#win_message").html(win_text);

							win = true;
							console.log(win);
						
							// End game & start a new one
							$(".game").fadeOut();
							setup();
						}

					}, 600);
				} 

				// Remove both active cards
				setTimeout(function(){
					$(".active").removeClass("active");
				}, 600);

				card_to_match = null;

				// Increment turns
				turns++;
		}
	}
};

var closeModal = function() {
	// Hide the win modal
	$(".modal-overlay").fadeOut();
	$(".modal").fadeOut();
}

var allcards = [
	{
		name: "chilled",
		img: "img/chilled.png",
		id: 1,
	},
	{
		name: "dirty",
		img: "img/dirty.png",
		id: 2
	},
	{
		name: "up",
		img: "img/up.png",
		id: 3
	},
	{
		name: "twist",
		img: "img/twist.png",
		id: 4
	}, 
	{
		name: "shaken",
		img: "img/shaken.png",
		id: 5
	},
	{
		name: "rocks",
		img: "img/rocks.png",
		id: 6
	},

];
    
// On load 
$(function(){
	cardset = allcards.slice(); // default cardset
	
	setup();

});



