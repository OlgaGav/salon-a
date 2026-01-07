
document.getElementById("mobileLang")?.addEventListener("change", (e) => {
  window.location.href = e.target.value;
});

// show mobile [Book] button for narrow screens
function adaptMobile() {
  const mb = document.getElementById("mobileBook");
  const ml = document.getElementById("mobileLang");
  const dl = document.getElementById("langSwitch");

  if (window.innerWidth <= 520) {
    mb.style.display = "inline-block";
    ml.style.display = "inline-block";
    dl.style.display = "none";
  } else {
    mb.style.display = "none";
    ml.style.display = "none";
    dl.style.display = "block";
  }
}
window.addEventListener("resize", adaptMobile);
adaptMobile();

// Gallery lightbox functionality
const totalImages = 35;
const galleryEl = document.getElementById("gallery");

// Load images automatically
for (let i = 1; i <= totalImages; i++) {
  const img = document.createElement("img");
  img.src = `assets/gallery/gallery${i}.jpg`;
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
  lightboxImg.src = `assets/gallery/gallery${index}.jpg`;
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

// code for the gallery wrapper
const galleryPrev = document.getElementById("galleryPrev");
const galleryNext = document.getElementById("galleryNext");

galleryPrev.addEventListener("click", () => {
  galleryEl.scrollBy({ left: -300, behavior: "smooth" });
});

galleryNext.addEventListener("click", () => {
  galleryEl.scrollBy({ left: 300, behavior: "smooth" });
});

// Services accordion functionality
document.querySelectorAll(".service-toggle").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".service-item");
    item.classList.toggle("open");
  });
});
