
     document.querySelectorAll('.toggle').forEach(toggle => {
        toggle.addEventListener('click', () => {
          document.querySelector('.wrapper').classList.toggle('flip');
        });
      });
