

$(document).ready(function () {
  var selectedDate;
  var clickedShowtime ;
  var totalCost ;
  var today = new Date().toISOString().split('T')[0];
  $('#date').attr('min', today);

  // Get the topic from the URL
//   const urlParams = new URLSearchParams(window.location.search);
//   const id = urlParams.get("id"); // "default" or a default topic if none selected
const getMovieData=(movie1)=> {
   
  return movie_data[movie1]
}
 
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
  selectedDate = selectedDate.toISOString().split('T')[0];
});
$("#movieDetails").on("click", ".showtime_button", function() {
  // Get the value of the clicked showtime
   let isLoggedIn = localStorage.getItem("isLoggedIn");
   clickedShowtime = $(this).text();
   localStorage.setItem("time",clickedShowtime)
   localStorage.setItem("date",selectedDate)
  if(selectedDate){
  if(isLoggedIn == "true")
   {
   
    window.location.href = "seat_selection.html?time=" + clickedShowtime;
  } else{
   window.location.href = "login.html?time=" + clickedShowtime;
}
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
  var costPerSeat = 10;
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
    totalCost = selectedSeats.length * costPerSeat
    // Update your logic for handling selected seats
     $('#selected-seats').text('Selected Seats: ' + selectedSeats.join(', '));
     $('#total-cost').text('Total Cost: $' + totalCost.toFixed(2));
   
  }

$("#back").click(()=>{
  let date = localStorage.getItem('date');
  //$("#date").text(date)
  window.location.href = "movie_details.html";
})

$("#buy").click(()=>{
  if(selectedSeats.length>0){
    localStorage.setItem("seat",selectedSeats);
    localStorage.setItem("Cost",totalCost.toFixed(2))
    window.location.href = "payment.html";
  }
  else{
    $("#overlay").show();
  }
 
})

$("#logout").click(()=>{
  let path = window.location.pathname;
  let page = path.split("/").pop();
if(page=="seat_selection.html"|| page=="payment.html"){
  window.location.href = "index.html";
}
else{
  clearLocalStorageExceptOne("userInfo");
  function clearLocalStorageExceptOne(keepKey) {
      for (var key in localStorage) {
        if (localStorage.hasOwnProperty(key) && key !== keepKey) {
          localStorage.removeItem(key);
        }
      }
    }
}
 

})

});
