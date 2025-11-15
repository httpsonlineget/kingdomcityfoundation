/* script.js
   Minimal JS for:
   - Mobile nav toggle
   - Hero slideshow rotation
   - Footer year injection
   - Front-end form handlers (demo)
   - Gift card file preview
   - Gallery zoom (lightbox)
*/

/* ------------------------------------ */
/* NAV TOGGLE */
/* ------------------------------------ */
function setupNavToggle(id){
  const btn = document.getElementById(id);
  if(!btn) return;
  btn.addEventListener('click', ()=> {
    const nav = document.querySelector('.main-nav');
    if(!nav) return;
    if(window.getComputedStyle(nav).display === 'none' || nav.style.display === 'none') {
      nav.style.display = 'flex';
    } else {
      nav.style.display = '';
    }
  });
}
['navToggle','navToggle2','navToggle3','navToggle4','navToggle5','navToggle6'].forEach(setupNavToggle);


/* ------------------------------------ */
/* HERO SLIDESHOW */
/* ------------------------------------ */
(function heroSlideshow(){
  const container = document.getElementById('heroSlides');
  if(!container) return;

  const imgs = Array.from(container.querySelectorAll('img'));
  let idx = 0;

  setInterval(()=> {
    imgs.forEach((img,i)=> {
      img.style.opacity = (i===idx ? '1' : '0');
    });
    idx = (idx + 1) % imgs.length;
  }, 4500);
})();


/* ------------------------------------ */
/* FOOTER YEAR AUTO-INJECT */
/* ------------------------------------ */
document.querySelectorAll('[id^="year"]').forEach(el => {
  el.textContent = new Date().getFullYear();
});


/* ------------------------------------ */
/* CONTACT FORM DEMO SUBMIT */
/* ------------------------------------ */
function handleContactSubmit(e){
  e.preventDefault();
  alert('Thanks — your message was recorded (demo). Integrate a backend or form service for live submissions.');
  e.target.reset();
  return false;
}


/* ------------------------------------ */
/* DONATION SIMULATOR */
/* ------------------------------------ */
function simulateDonate(type){
  alert('Demo: You clicked to donate for "' + type + '". Integrate a payment gateway (Paystack/Flutterwave/Stripe/PayPal) for live payments.');
}


/* ------------------------------------ */
/* GIFT CARD PREVIEW */
/* ------------------------------------ */
(function giftPreview(){
  const giftForm = document.getElementById('giftUpload');
  if(!giftForm) return;

  const fileInput = giftForm.querySelector('input[name="giftFile"]');
  const thumb = document.getElementById('giftThumb');

  fileInput.addEventListener('change', (ev)=>{
    const file = ev.target.files[0];
    if(!file) return;

    if(file.type.startsWith('image/')){
      const reader = new FileReader();
      reader.onload = function(e){
        thumb.src = e.target.result;
        thumb.style.display = 'block';
      };
      reader.readAsDataURL(file);
    } else {
      thumb.style.display = 'none';
      alert('PDF uploaded. Our team will verify. Preview not available for PDFs.');
    }
  });
})();

function handleGiftUpload(e){
  e.preventDefault();
  alert('Gift card submitted (demo). Our team will contact you for verification. In production, store this file in your backend.');
  e.target.reset();

  const thumb = document.getElementById('giftThumb');
  if(thumb) thumb.style.display = 'none';

  return false;
}


/* ------------------------------------ */
/* GALLERY ZOOM (LIGHTBOX) */
/* ------------------------------------ */
(function galleryZoom(){
  const images = document.querySelectorAll(".gallery img");
  if(!images.length) return;

  let lightbox = document.getElementById("lightbox");
  let lightboxImg = document.getElementById("lightbox-img");

  // Create lightbox if not in HTML
  if(!lightbox){
    lightbox = document.createElement("div");
    lightbox.id = "lightbox";
    lightbox.className = "lightbox";

    lightboxImg = document.createElement("img");
    lightboxImg.id = "lightbox-img";

    lightbox.appendChild(lightboxImg);
    document.body.appendChild(lightbox);
  }

  images.forEach(img => {
    img.addEventListener("click", () => {
      lightbox.style.display = "flex";
      lightboxImg.src = img.src;
    });
  });

  // Close lightbox when clicked
  lightbox.addEventListener("click", () => {
    lightbox.style.display = "none";
  });
})();
