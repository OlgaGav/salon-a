    const langSwitch = document.getElementById('langSwitch');
    const textNodes = document.querySelectorAll('.t');

    langSwitch.addEventListener('click', (e)=>{
    if(e.target.dataset.lang){
      const lang = e.target.dataset.lang;
      // highlight active
      langSwitch.querySelectorAll('span').forEach(s=>s.classList.remove('active'));
      e.target.classList.add('active');
      // swap text
      textNodes.forEach(node=>{
      node.textContent = node.dataset[lang];
  });
  document.documentElement.lang = lang;  }
    });
    // show mobile book button for narrow screens
    function adaptMobile() {
      const mb = document.getElementById('mobileBook');
      if(window.innerWidth <= 520) {
        mb.style.display = 'inline-block';
      } else {
        mb.style.display = 'none';
      }
    }
    window.addEventListener('resize', adaptMobile);
    adaptMobile();

    // Gallery lightbox functionality
  const totalImages = 35; 
  const galleryEl = document.getElementById("gallery");

  // Load images automatically
  for (let i = 1; i <= totalImages; i++) {
    const img = document.createElement("img");
    img.src = `/assets/gallery/gallery${i}.jpg`;
    img.alt = `Portfolio image ${i}`;
    img.dataset.index = i;
    galleryEl.appendChild(img);
  }

  // Lightbox logic
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.getElementById("lightbox-close");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");

  let currentIndex = 1;

  function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = `/assets/gallery/gallery${index}.jpg`;
    lightbox.classList.remove("hidden");
  }

  function closeLightbox() {
    lightbox.classList.add("hidden");
  }

  function showNext() {
    currentIndex = currentIndex === totalImages ? 1 : currentIndex + 1;
    openLightbox(currentIndex);
  }

  function showPrev() {
    currentIndex = currentIndex === 1 ? totalImages : currentIndex - 1;
    openLightbox(currentIndex);
  }

  galleryEl.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
      openLightbox(Number(e.target.dataset.index));
    }
  });

  closeBtn.addEventListener("click", closeLightbox);
  nextBtn.addEventListener("click", showNext);
  prevBtn.addEventListener("click", showPrev);

  // Close on background click
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Arrow keys
  document.addEventListener("keydown", (e) => {
    if (lightbox.classList.contains("hidden")) return;
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "Escape") closeLightbox();
  });