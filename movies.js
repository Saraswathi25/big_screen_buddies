$(document).ready(function () {
  // Get the topic from the URL
//   const urlParams = new URLSearchParams(window.location.search);
//   const id = urlParams.get("id"); // "default" or a default topic if none selected

  const movieData = getMovieData("movie1");
  displayData(movieData);

 function displayShowTimes(showtime){
    let additionalInfoHTML=''
    for (let i = 0; i < showtime.length; i++) {
        additionalInfoHTML += `<button class="showtime_button" >${showtime[i]}</button>`;
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
            ${displayShowTimes(movieData.showtime)}
    </div>
    </div>
    <p class="description">${movieData.description}</p>
    
            `;
        $("#movieDetails").append(movieHTML);
 
}


  function getMovieData(movie1) {
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
        name: "Inception",
        description:
          "A mind-bending science fiction thriller about dream infiltration and manipulation.",
        showtime: "2h 37min",
        seats: {
          total: 100,
          available: 75,
          reserved: 25,
        }
      }
    };
    return movie_data[movie1]
  }
});
