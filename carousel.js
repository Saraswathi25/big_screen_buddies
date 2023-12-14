

document.addEventListener('DOMContentLoaded', function () {
  const carousel = document.querySelector('.carousel');
  const items = carousel.querySelectorAll('.carousel-item');
  let currentIndex = 0;
  let slideInterval;

  function preloadImages() {
      items.forEach(item => {
          const img = item.querySelector('img');
          const image = new Image();
          image.src = img.src;
      });
  }

  function showItem(index) {
      items.forEach((item, i) => {
          item.style.display = i === index ? 'block' : 'none';
      });
  }

  function nextItem() {
      currentIndex = (currentIndex + 1) % items.length;
      showItem(currentIndex);
  }

  function prevItem() {
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      showItem(currentIndex);
  }

  function startSlideshow() {
      slideInterval = setInterval(nextItem, 500); // Change item every 3 seconds
  }

  function stopSlideshow() {
      clearInterval(slideInterval);
  }

  preloadImages();
  showItem(currentIndex);
  startSlideshow();

  carousel.addEventListener('mouseover', stopSlideshow);
  carousel.addEventListener('mouseout', startSlideshow);

  // Add event listeners for hover effect on each item
  items.forEach(item => {
      item.addEventListener('mouseover', function () {
          const hiddenText = this.querySelector('.hidden-text');
          if (hiddenText) {
              hiddenText.style.maxHeight = hiddenText.scrollHeight + 'px';
          }
      });

      item.addEventListener('mouseout', function () {
          const hiddenText = this.querySelector('.hidden-text');
          if (hiddenText) {
              hiddenText.style.maxHeight = '0';
          }
      });
  });

  // Add event listeners for next and prev buttons
  const nextBtn = document.querySelector('.next-btn');
  const prevBtn = document.querySelector('.prev-btn');

  nextBtn.addEventListener('click', function () {
      nextItem();
      stopSlideshow(); // Pause slideshow on button click
  });

  prevBtn.addEventListener('click', function () {
      prevItem();
      stopSlideshow(); // Pause slideshow on button click
  });
  
  var moviesContainer = document.getElementById("movies_container");
  for (const movieKey in movie_data) {
      if (Object.hasOwnProperty.call(movie_data, movieKey)) {
        const movie = movie_data[movieKey];
    
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");
    
        const image = document.createElement("img");
        image.src = movie.image_link; // Assuming you have an image_link property in your movie data
        movieCard.appendChild(image);
    
        const movieInfo = document.createElement("div");
        movieInfo.classList.add("movie-info");
        movieInfo.innerHTML = `<h2 class="movie_name">${movie.name}</h2>`;
        // Add other movie details here.
    
        movieCard.appendChild(movieInfo);
        movies_Container.appendChild(movieCard);
      }
    }

    $("#logout").click(()=>{
       // let keepKey =localStorage.getItem("userInfo")
       clearLocalStorageExceptOne("userInfo");
        function clearLocalStorageExceptOne(keepKey) {
            for (var key in localStorage) {
              if (localStorage.hasOwnProperty(key) && key !== keepKey) {
                localStorage.removeItem(key);
              }
            }
          }
   
    })

  
});

