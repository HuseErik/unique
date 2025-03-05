document.addEventListener('DOMContentLoaded', () => {
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
  function scrollToHomeAndReload(event) {
    event.preventDefault();
    document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => location.reload(), 1000);
  }

  window.onload = function () {
    document.getElementById("loading-screen").style.display = "none";
  };


  document.querySelector('.navbar-brand').addEventListener('click', scrollToHomeAndReload);
});