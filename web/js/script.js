//FYI This code is just for the slideshow on golf.html. There is nothing
//in here that is relevant to the CTF Challenge. Please don't waste your
//time looking through this... unless you want to roast me for my poor coding skills :)

var currentSlide = 0;

document.addEventListener("DOMContentLoaded", () => {
  goToSlide(currentSlide);
})

function goToSlide(index) {
  var slides = document.querySelectorAll('.slideshow-container img');
  var captions = document.querySelectorAll('.slideshow-container .caption');
  
  //wrap the index if it goes out of bounds.
  index = (index + slides.length) % slides.length;
  
  slides[currentSlide].style.display = 'none';
  captions[currentSlide].style.display = 'none';

  slides[index].style.display = 'block';
  captions[index].style.display = 'block';
  
  currentSlide = index;
}

function nextSlide() {
  goToSlide(currentSlide+1);
}

function prevSlide() {
  goToSlide(currentSlide-1);
}