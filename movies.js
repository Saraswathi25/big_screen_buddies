$(document).ready(function () {
  var selectedDate;

  // Get the topic from the URL
//   const urlParams = new URLSearchParams(window.location.search);
//   const id = urlParams.get("id"); // "default" or a default topic if none selected
function getMovieData(movie1) {
   
  return movie_data[movie1]
}
const movie_data = {
  movie1: {
    id: 1,
    name: "The Hunger Games: The Ballad of Songbirds and Snakes",
    type:"Action, Adventure",
    description:
      "The Hunger Games: The Ballad of Songbirds & Snakes follows a young Coriolanus (Tom Blyth) who is the last hope for his failing lineage, the one-proud Snow family that has fallen from grace in a post-war Capitol. With his livelihood threatened, Snow is reluctantly assigned to mentor Lucy Gray Baird (Rachel Zegler), a tribute from the impoverished District 12. But after Lucy Gray’s charm captivates the audience of Panem, Snow sees an opportunity to shift their fates. With everything he has worked for hanging in the balance, Snow unites with Lucy Gray to turn the odds in their favor. Battling his instincts for both good and evil, Snow sets out on a race against time to survive and reveal if he will ultimately become a songbird or a snake.",
    duration: "2h 37min",
    image_link:"assets/movie_1.jpg",
    seats: {
      total: 100,
      available: 75,
      reserved: 25,
    },
    showtime:["9:30 am","2:00pm","6:00pm"]
  },
  movie2: {
    id: 2,
    name: "Godzilla Minus One (Japanese w/e.s.t.)",
    type:"Action, Adventure",
    description:
      "Japan, devastated after the war, faces a new threat in the form of Godzilla. How will the   country confront this impossible situation?",
   
      duration: "2h 37min",
      seats: {
        total: 100,
        available: 75,
        reserved: 25,
      },
      image_link:"assets/godzila.webp",
      showtime:["9:30 am","6:00pm"]
  },
  movie3: {
    id: 3,
    name: "The Boys in the Boat",
    type:"Action, Adventure",
    description:
      "THE BOYS IN THE BOAT is a sports drama based on the #1 New York Times bestselling non-fiction novel written by Daniel James Brown. The film, directed by George Clooney, is about the 1936 University of Washington rowing team that competed for gold at the Summer Olympics in Berlin. This inspirational true story follows a group of underdogs at the height of the Great Depression as they are thrust into the spotlight and take on elite rivals from around the world.",
      duration: "2h 37min",
      seats: {
        total: 100,
        available: 75,
        reserved: 25,
      },
      image_link:"assets/movie_2",
      showtime:["9:30 am","6:00pm"]
  },
  movie4: {
    id: 4,
    name: "Aquaman And The Lost Kingdom",
    type:"Action, Adventure, Sequel, Adaptation",
    description:
      "Action Adventure. When an ancient power is unleashed, Aquaman must forge an uneasy alliance with an unlikely ally to protect Atlantis, and the world, from irreversible devastation.",

      duration: "2h 37min",
      seats: {
        total: 140,
        available: 75,
        reserved: 25,
      },
      image_link:"assets/acqua.webp",
      showtime:["9:30 am","6:00pm","10:00pm"]
  },
  movie5: {
    id: 5,
    name: "Migration",
    type:"Action, Animation, Comedy",
    description:
      "This holiday season, Illumination, creators of the blockbuster Minions, Despicable Me, Sing and The Secret Life of Pets comedies, invites you to take flight into the thrill of the unknown with a funny, feathered family vacation like no other in the action-packed new original comedy, Migration.",
      duration: "2h 37min",
      seats: {
        total: 100,
        available: 75,
        reserved: 25,
      },
      image_link:"assets/migration.webp",
      showtime:["9:30 am","6:00pm"]
  },
};
 

  const movieData = getMovieData("movie2");
  displayData(movieData);

 function displayShowTimes(showtime){
    let additionalInfoHTML=''
    for (let i = 0; i < showtime.length; i++) {
        additionalInfoHTML += `<button class="showtime_button" class="showTimeButton" >${showtime[i]}</button>`;
      }
      return additionalInfoHTML;
    
}

  function displayData(movieData) {  
  
            const movieHTML = `
            <div id="movie_info">
            <div>
            <img src="${movieData.image_link}" class="movie_image">
            </div>
            <div class="details">
            <h2>${movieData.name}</h2>
            <p>${movieData.type}</p>
            <p>Showtime: ${movieData.duration}</p>
            <p>Seats Available: ${movieData.seats.available}/${movieData.seats.total}</p>
           <div id="showTimeDiv"> ${displayShowTimes(movieData.showtime)}</div>
    </div>
    </div>
    <p class="description">${movieData.description}</p>
    
            `;
        $("#movieDetails").append(movieHTML);
 
}
$(".close-overlay").click(() => {
  $("#overlay").hide();
 
});
$('#date').on('change', function() {
  // Retrieve the value of the date input
  selectedDate = $(this).val();
});
$("#movieDetails").on("click", ".showtime_button", function() {
  // Get the value of the clicked showtime
  // let isloggedIn = localStorage.getItem("isloggedIn");
  if(selectedDate){
  // if(isloggedIn)
  // {
    let clickedShowtime = $(this).text();
    window.location.href = "seat_selection.html?time=" + clickedShowtime;
//   }
// else{
//   window.location.href = "login.html";
// }
  }
else{
  $("#overlay").show();
}
});

const urlParamsSeatSelection= new URLSearchParams(window.location.search);

  const time = urlParamsSeatSelection.get("time");
  var selectedSeats = [];
  var totalSeats = 140;
  var seatsPerRow = 14;
  var gapBetweenSeats = 7;
  var availableSeats = 80;
  $("#displayShowTime").text(time);

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function isSeatAvailable(seatNumber) {
    // Add your logic to determine if the seat is available
    return availableSeats > 0 && Math.random() < 0.8; // Example: 80% chance of being available
  }
  function blockRandomSeats() {
    // Block a random percentage of seats
    var blockedPercentage = 20; // Adjust this value based on the percentage you want to block
    var seatsToBlock = Math.floor((blockedPercentage / 100) * totalSeats);
  
    for (var i = 0; i < seatsToBlock; i++) {
      var randomSeatNumber = getRandomInt(1, totalSeats);
  
      // Check if the seat is not already blocked and is available
      if (!$('.seat[data-seat="' + randomSeatNumber + '"]').hasClass('blocked') && isSeatAvailable(randomSeatNumber)) {
        $('.seat[data-seat="' + randomSeatNumber + '"]').addClass('blocked');
        availableSeats--;
      }
    }
  }  
  for (var i = 1; i <= totalSeats; i++) {
    if ((i - 1) % seatsPerRow === 0) {
      // Start a new row
      $('#seat-map').append('<div class="row" id="row-' + (i - 1) / seatsPerRow + '"></div>');
    }
  
    var $row = $('#row-' + Math.floor((i - 1) / seatsPerRow));
    var isGap = i % seatsPerRow === gapBetweenSeats + 1;
  
    if (isGap) {
      // Add a gap
      $row.append('<div class="gap"></div>');
    }
  
    $row.append('<div class="seat" data-seat="' + i + '"><i class="fas fa-chair"><p class="seat-number">' + i + '</p></i></div>');
  }
  
  blockRandomSeats(); // Call this function to block random seats
  
  $('.seat:not(.blocked)').click(function () {
    var seatNumber = $(this).data('seat');
  
    if ($(this).hasClass('selected')) {
      // Deselect the seat
      $(this).removeClass('selected');
      selectedSeats = selectedSeats.filter(function (seat) {
        return seat !== seatNumber;
      });
    } else {
      // Select the seat
      $(this).addClass('selected');
      selectedSeats.push(seatNumber);
    }
  
    updateSelectedSeats();
  });
  
  function updateSelectedSeats() {
    // Update your logic for handling selected seats
     $('#selected-seats').text('Selected Seats: ' + selectedSeats.join(', '));
    console.log('Selected Seats: ', selectedSeats);
  }

$("#back").click(()=>{
  window.location.href = "movie_details.html";
})
  
});
