/* ===== SLIDER ===== */
const track = document.querySelector('.slider-track');

if(track){

  const slides = Array.from(track.children);
  const nextBtn = document.querySelector('.next');
  const prevBtn = document.querySelector('.prev');

  let index = 0;
  let slideWidth = slides[0].clientWidth;

  function updatePosition(){
    slideWidth = slides[0].clientWidth;
    track.style.transform = `translateX(-${index * slideWidth}px)`;
  }

  window.addEventListener('resize', updatePosition);

  nextBtn.addEventListener('click', ()=>{
    index = (index + 1) % slides.length;
    updatePosition();
  });

  prevBtn.addEventListener('click', ()=>{
    index = (index - 1 + slides.length) % slides.length;
    updatePosition();
  });

}

/* ===== WEATHER ===== */
const tempEl = document.querySelector('.temp');
const weatherTextEl = document.getElementById('weatherText');

if(tempEl){

  const API = "https://api.open-meteo.com/v1/forecast?latitude=-6.7714&longitude=-79.8409&current_weather=true";

  function getPeriodo(){
    const h = new Date().getHours();
    if(h >= 6 && h < 12) return "Día";
    if(h >= 12 && h < 19) return "Tarde";
    return "Noche";
  }

  fetch(API)
    .then(r=>r.json())
    .then(d=>{
      tempEl.textContent = Math.round(d.current_weather.temperature)+" °C";
      weatherTextEl.textContent = getPeriodo();
    })
    .catch(()=>{
      tempEl.textContent = "-- °C";
    });
}

/* ===== SHARE ===== */
const shareBtn = document.getElementById("shareBtn");

if(shareBtn){
  shareBtn.addEventListener("click", async ()=>{
    const data = {
      title:"COMPUGUED",
      text:"Catálogo tecnológico",
      url:location.href
    };

    if(navigator.share){
      try{
        await navigator.share(data);
      }catch{}
    }else if(navigator.clipboard){
      navigator.clipboard.writeText(location.href);
      alert("Enlace copiado");
    }
  });
}

/* ===== MAPA ===== */
function goToMap(){
  window.location.href = "mapa.html";
}
