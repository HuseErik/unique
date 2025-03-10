document.addEventListener('DOMContentLoaded', () => {

  window.onload = function () {
    // Set a delay of 3 seconds (3000 milliseconds)
    setTimeout(function() {
      document.getElementById("loading-screen").style.display = "none";
    }, 3000); // 3000ms delay before hiding the loading screen
  };

  // Disable scrolling & lock functions initially
  document.body.classList.remove('unlocked'); // Ensure scrolling is locked
  document.getElementById("openLetterBtn").classList.add("hidden");

  // Lock gallery navigation
  const leftBtn = document.querySelector('.left-btn');
  const rightBtn = document.querySelector('.right-btn');
  leftBtn.disabled = true;
  rightBtn.disabled = true;

  // Get the modal elements
  const pinModal = new bootstrap.Modal(document.getElementById('pinModal'), {
    backdrop: 'static', // Prevent closing by clicking outside
    keyboard: false // Prevent closing with Esc key
  });

  const pinInput = document.getElementById('pinInput');
  const pinError = document.getElementById('pinError');
  const submitPinBtn = document.getElementById('submitPinBtn');

  // Proceed button opens the PIN modal
  document.querySelector('.proceed-btn').addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default anchor behavior
    pinModal.show();
  });

  // Handle PIN submission
  submitPinBtn.addEventListener('click', checkPin);
  pinInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      checkPin();
    }
  });

  function checkPin() {
    const enteredPin = pinInput.value.trim();

    if (enteredPin === '0107') {
      // Correct PIN: Unlock everything
      pinModal.hide(); // Close modal

      // Automatically scroll to About Us section
      document.getElementById('about').scrollIntoView({ behavior: 'smooth' });

      // Enable scrolling properly
      document.body.classList.add('unlocked');

      // Show the letter button
      document.getElementById("openLetterBtn").classList.remove("hidden");

      // Enable gallery navigation
      leftBtn.disabled = false;
      rightBtn.disabled = false;

      // Remove the welcome message after 3 seconds
      setTimeout(() => {
        welcomeMessage.remove();
      }, 3000);

    } else {
      // Incorrect PIN: Show error
      pinError.style.display = 'block';
      pinInput.value = ''; // Clear input field
    }
  }

  // About me Zoom Picture
  const aboutRight = document.querySelector(".about-right");
  const aboutImage = document.querySelector(".about-image");

  // Create magnifier dynamically
  const magnifier = document.createElement("div");
  magnifier.classList.add("magnifier");
  aboutRight.appendChild(magnifier);

  aboutRight.addEventListener("mousemove", function (e) {
    let rect = aboutImage.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    let xPercent = (x / rect.width) * 100;
    let yPercent = (y / rect.height) * 100;

    // Set magnifier position
    magnifier.style.left = `${x}px`;
    magnifier.style.top = `${y}px`;
    magnifier.style.display = "block";

    // Apply background image for zoom effect
    magnifier.style.backgroundImage = `url('${aboutImage.src}')`;
    magnifier.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
  });

  aboutRight.addEventListener("mouseleave", function () {
    magnifier.style.display = "none"; // Hide magnifier when leaving
  });

  // Gallery scrolling system
  const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
  let currentIndex = 0;
  let visibleItems = 3;

  function updateVisibleItems() {
    const screenWidth = window.innerWidth;
    visibleItems = screenWidth <= 480 ? 1 : screenWidth <= 768 ? 2 : 3;
  }

  function updateGalleryView() {
    updateVisibleItems();
    galleryItems.forEach((item, index) => {
      item.style.display = index >= currentIndex && index < currentIndex + visibleItems ? 'flex' : 'none';
    });
  }

  leftBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = galleryItems.length - visibleItems;
    }
    updateGalleryView();
  });

  rightBtn.addEventListener('click', () => {
    if (currentIndex < galleryItems.length - visibleItems) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    updateGalleryView();
  });

  window.addEventListener('resize', updateGalleryView);
  updateGalleryView();

  // Modal Image Preview
  const modalImage = document.getElementById('modalImage');
  const modalCaption = document.getElementById('modalCaption');

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      modalImage.src = item.dataset.bsSrc;
      modalCaption.textContent = item.querySelector('img').alt;
    });
  });

  // Toggle the visibility of the letter and button text
  function toggleLetter() {
    let letter = document.getElementById("floating-love-letter");
    let button = document.getElementById("openLetterBtn");

    if (letter.classList.contains("hidden")) {
      letter.classList.remove("hidden");
      letter.classList.add("visible");
      button.textContent = "Close my letter";
    } else {
      letter.classList.remove("visible");
      letter.classList.add("hidden");
      button.textContent = "Open my letter";
    }
  }

  document.getElementById("openLetterBtn").addEventListener("click", toggleLetter);

  // Home button reload function with delay
/*  function scrollToHomeAndReload(event) {
    event.preventDefault();
    document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => location.reload(), 1000);


  document.querySelector('.navbar-brand').addEventListener('click', scrollToHomeAndReload);
*/

  // List of MP3 file names
  // var playlist = [
  //     '1.mp3',  // Song 1
  //     '2.mp3',  // Song 2
  //     '3.mp3'   // Song 3
  // ];

  // var currentSongIndex = 0;  // Keep track of the current song index

  // // Function to change to the next song
  // function nextSong() {
  //     currentSongIndex++;
  //     if (currentSongIndex >= playlist.length) {
  //         currentSongIndex = 0;  // If at the end of the playlist, loop back to the first song
  //     }

  //     var audioPlayer = document.getElementById('audioPlayer');
  //     var audioSource = document.getElementById('audioSource');
  //     audioSource.src = 'Mp3/' + playlist[currentSongIndex];  // Update the source of the audio file
  //     audioPlayer.load();  // Reload the audio element with the new source
  //     audioPlayer.play();  // Play the new song
  // }

});