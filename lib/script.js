function navbarbg() {
    $(document).scroll(function () {
      if (window.pageYOffset > 10) {
        $("nav").addClass("navbar-bg", "shadow");
      } else {
        $("nav").removeClass("navbar-bg", "shadow");
      }
    });
  }
  
  $(document).ready(function navbarCollapse() {
    const button = $(".navbar-toggler");
    const nav = $("nav");
    const divPilih = $(".btn-pilih");
  
    button.click(function () {
      nav.toggleClass("collapse-bg");
  
      if (divPilih.hasClass("justify-content-end")) {
        divPilih.removeClass("justify-content-end").addClass("justify-content-center");
      } else {
        divPilih.removeClass("justify-content-center").addClass("justify-content-end");
      }
    });
  });
  
  function muteVideo() {
    // Volume for teaser's video
    const volume = document.getElementById("volume");
    const teaserVideo = jQuery("#video-teaser");
    let isMuted = true;
    jQuery(function () {
      teaserVideo.YTPlayer();
      jQuery("#P1").YTPlayer();
    });
  
    volume.addEventListener("click", () => {
      if (isMuted) {
        teaserVideo.YTPUnmute();
        isMuted = false;
        volume.classList.remove("fa-volume-mute");
        volume.classList.add("fa-volume-up");
      } else {
        teaserVideo.YTPMute();
        isMuted = true;
        volume.classList.remove("fa-volume-up");
        volume.classList.add("fa-volume-mute");
      }
    });
  }
  