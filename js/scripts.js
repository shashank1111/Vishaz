/*-----------------------------------------------------------------------------------

    Theme Name: Coco
    Theme URI: http://
    Description: The Multi-Purpose Onepage Template
    Author: UI-ThemeZ
    Author URI: http://themeforest.net/user/UI-ThemeZ
    Version: 1.0

-----------------------------------------------------------------------------------*/


$(function() {

    "use strict";

    var wind = $(window);



    // scrollIt
    $.scrollIt({
      upKey: 38,                // key code to navigate to the next section
      downKey: 40,              // key code to navigate to the previous section
      easing: 'swing',          // the easing function for animation
      scrollTime: 600,          // how long (in ms) the animation takes
      activeClass: 'active',    // class given to the active nav element
      onPageChange: null,       // function(pageIndex) that is called when page is changed
      topOffset: 0            // offste (in px) for fixed top navigation
    });



    // navbar scrolling background
    wind.on("scroll",function () {

        var bodyScroll = wind.scrollTop(),
            navbar = $(".navbar"),
            logo = $(".navbar .logo> img");

        if(bodyScroll > 100){

            navbar.addClass("nav-scroll");
            logo.attr('src', 'img/logo-dark.png');

        }else{

            navbar.removeClass("nav-scroll");
            logo.attr('src', 'img/logo-light.png');
        }
    });


    // close navbar-collapse when a  clicked
    $(".navbar-nav a").on('click', function () {
        $(".navbar-collapse").removeClass("show");
    });



    // progress bar
    wind.on('scroll', function () {
        $(".skill-progress .progres").each(function () {
            var bottom_of_object = 
            $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = 
            $(window).scrollTop() + $(window).height();
            var myVal = $(this).attr('data-value');
            if(bottom_of_window > bottom_of_object) {
                $(this).css({
                  width : myVal
                });
            }
        });
    });



    // sections background image from data background
    var pageSection = $(".bg-img, section");
    pageSection.each(function(indx){
        
        if ($(this).attr("data-background")){
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });


    // === owl-carousel === //

    // Testimonials owlCarousel
    $('.carousel-single.owl-carousel').owlCarousel({
        items:1,
        loop:true,
        margin: 0,
        mouseDrag:false,
        autoplay:true,
        smartSpeed:500
    });

    // Team owlCarousel
    $('.journey .owl-carousel').owlCarousel({
        loop:false,
        margin: 30,
        mouseDrag:true,
        autoplay:false,
        dots: true,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
            },
            600:{
                items:2
            },
            1000:{
                items:4
            }
        }
    });
    $('.our-story .owl-carousel').owlCarousel({
        loop:false,
        margin: 0,
        mouseDrag:true,
        autoplay:false,
        dots: true,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    });

    // Testimonials owlCarousel
    $('.testimonials .owl-carousel').owlCarousel({
        loop:true,
        margin: 30,
        mouseDrag:true,
        autoplay:true,
        dots: true,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
            },
            600:{
                items:2
            },
            1000:{
                items:3
            }
        }
    });

    // === End owl-carousel === //


    // magnificPopup
    $('.gallery').magnificPopup({
        delegate: '.popimg',
        type: 'image',
        gallery: {
            enabled: true
        }
    });

    // YouTubePopUp
    $("a.vid").YouTubePopUp();


});


// === window When Loading === //

$(window).on("load",function (){

    var wind = $(window);

    // Preloader
    $(".loading").fadeOut(500);


    // stellar
    wind.stellar();


    // isotope
    $('.gallery').isotope({
      // options
      itemSelector: '.items'
    });

    var $gallery = $('.gallery').isotope({
      // options
    });

    // filter items on button click
    $('.filtering').on( 'click', 'span', function() {

        var filterValue = $(this).attr('data-filter');

        $gallery.isotope({ filter: filterValue });

    });

    $('.filtering').on( 'click', 'span', function() {

        $(this).addClass('active').siblings().removeClass('active');

    });


    // contact form validator
    $('#contact-form').validator();

    $('#contact-form').on('submit', function (e) {
        if (!e.isDefaultPrevented()) {
            var url = "contact.php";

            $.ajax({
                type: "POST",
                url: url,
                data: $(this).serialize(),
                success: function (data)
                {
                    var messageAlert = 'alert-' + data.type;
                    var messageText = data.message;

                    var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                    if (messageAlert && messageText) {
                        $('#contact-form').find('.messages').html(alertBox);
                        $('#contact-form')[0].reset();
                    }
                }
            });
            return false;
        }
    });

});


// Slider 
$(document).ready(function() {

    var owl = $('.header .owl-carousel');


    // Slider owlCarousel
    $('.slider .owl-carousel').owlCarousel({
        items: 1,
        loop:true,
        margin: 0,
        autoplay:true,
        smartSpeed:500
    });

    // Slider owlCarousel
    $('.slider-fade .owl-carousel').owlCarousel({
        items: 1,
        loop:true,
        margin: 0,
        autoplay:true,
        smartSpeed:500,
        animateOut: 'fadeOut'
    });

    owl.on('changed.owl.carousel', function(event) {
        var item = event.item.index - 2;     // Position of the current item
        $('h4').removeClass('animated fadeInLeft');
        $('h1').removeClass('animated fadeInRight');
        $('p').removeClass('animated fadeInUp');
        $('.butn').removeClass('animated zoomIn');
        $('.owl-item').not('.cloned').eq(item).find('h4').addClass('animated fadeInLeft');
        $('.owl-item').not('.cloned').eq(item).find('h1').addClass('animated fadeInRight');
        $('.owl-item').not('.cloned').eq(item).find('p').addClass('animated fadeInUp');
        $('.owl-item').not('.cloned').eq(item).find('.butn').addClass('animated zoomIn');
    });

});








// Little Canvas things
var canvas = document.querySelector("#canvas"),
  ctx = canvas.getContext("2d");

// Set Canvas to be window size
canvas.width = window.innerWidth;
canvas.height = 700;

// Configuration, Play with these
var config = {
  particleNumber: 800,
  maxParticleSize: 10,
  maxSpeed: 40,
  colorVariation: 50
};

// Colors
var colorPalette = {
  bg: { r: 12, g: 9, b: 29 },
  matter: [
    { r: 36, g: 18, b: 42 }, // darkPRPL
    { r: 78, g: 36, b: 42 }, // rockDust
    { r: 252, g: 178, b: 96 }, // solorFlare
    { r: 253, g: 238, b: 152 } // totesASun
  ]
};

// Some Variables hanging out
var particles = [],
  centerX = canvas.width / 2,
  centerY = canvas.height / 2,
  drawBg,
  // Draws the background for the canvas, because space
  drawBg = function(ctx, color) {
    ctx.fillStyle = "rgb(" + color.r + "," + color.g + "," + color.b + ")";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

// Particle Constructor
var Particle = function(x, y) {
  // X Coordinate
  this.x = x || Math.round(Math.random() * canvas.width);
  // Y Coordinate
  this.y = y || Math.round(Math.random() * canvas.height);
  // Radius of the space dust
  this.r = Math.ceil(Math.random() * config.maxParticleSize);
  // Color of the rock, given some randomness
  this.c = colorVariation(
    colorPalette.matter[Math.floor(Math.random() * colorPalette.matter.length)],
    true
  );
  // Speed of which the rock travels
  this.s = Math.pow(Math.ceil(Math.random() * config.maxSpeed), 0.7);
  // Direction the Rock flies
  this.d = Math.round(Math.random() * 360);
};

// Provides some nice color variation
// Accepts an rgba object
// returns a modified rgba object or a rgba string if true is passed in for argument 2
var colorVariation = function(color, returnString) {
  var r, g, b, a, variation;
  r = Math.round(
    Math.random() * config.colorVariation - config.colorVariation / 2 + color.r
  );
  g = Math.round(
    Math.random() * config.colorVariation - config.colorVariation / 2 + color.g
  );
  b = Math.round(
    Math.random() * config.colorVariation - config.colorVariation / 2 + color.b
  );
  a = Math.random() + 0.5;
  if (returnString) {
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
  } else {
    return { r, g, b, a };
  }
};

// Used to find the rocks next point in space, accounting for speed and direction
var updateParticleModel = function(p) {
  var a = 180 - (p.d + 90); // find the 3rd angle
  p.d > 0 && p.d < 180
    ? (p.x += p.s * Math.sin(p.d) / Math.sin(p.s))
    : (p.x -= p.s * Math.sin(p.d) / Math.sin(p.s));
  p.d > 90 && p.d < 270
    ? (p.y += p.s * Math.sin(a) / Math.sin(p.s))
    : (p.y -= p.s * Math.sin(a) / Math.sin(p.s));
  return p;
};

// Just the function that physically draws the particles
// Physically? sure why not, physically.
var drawParticle = function(x, y, r, c) {
  ctx.beginPath();
  ctx.fillStyle = c;
  ctx.arc(x, y, r, 0, 2 * Math.PI, false);
  ctx.fill();
  ctx.closePath();
};

// Remove particles that aren't on the canvas
var cleanUpArray = function() {
  particles = particles.filter(p => {
    return p.x > -100 && p.y > -100;
  });
};

var initParticles = function(numParticles, x, y) {
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle(x, y));
  }
  particles.forEach(p => {
    drawParticle(p.x, p.y, p.r, p.c);
  });
};

// That thing
window.requestAnimFrame = (function() {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

// Our Frame function
var frame = function() {
  // Draw background first
  drawBg(ctx, colorPalette.bg);
  // Update Particle models to new position
  particles.map(p => {
    return updateParticleModel(p);
  });
  // Draw em'
  particles.forEach(p => {
    drawParticle(p.x, p.y, p.r, p.c);
  });
  // Play the same song? Ok!
  window.requestAnimFrame(frame);
};

// Click listener
document.body.addEventListener("click", function(event) {
  var x = event.clientX,
    y = event.clientY;
  cleanUpArray();
  initParticles(config.particleNumber, x, y);
});

// First Frame
frame();

// First particle explosion
initParticles(config.particleNumber);


var x = document.getElementById("myAudio"); 
x.play();
var a = true;
function toggleAudio(){
    a = !a;
    if(a== true){
       x.play(); 
   }else{
    x.pause();
   }
    
}
