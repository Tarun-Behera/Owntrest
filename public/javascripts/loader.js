
    window.addEventListener("load", function () {
      // Hide the loader
      const loader = document.getElementById('loader'); // Assuming loader.ejs has an element with id 'loader'
      if (loader) {
        loader.classList.add('hidden');
        loader.classList.add('fade-out');
      }
  
      // Show the main animation content
      const animation = document.querySelector('.main-content'); 
      if (animation) {
        animation.classList.remove('hidden');
        animation.classList.add('fade-in');
      }
    });
  