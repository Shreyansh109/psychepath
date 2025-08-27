document.addEventListener("DOMContentLoaded", function() {
    const musicToggle = document.getElementById("music-toggle");
    const soundToggle = document.getElementById("sound-toggle");
    const musicBars = document.querySelector(".wave-container");
    const soundWave = document.querySelector(".sound-wave");

    // Set waves visible initially if toggles are ON
    musicBars.style.opacity = musicToggle.checked ? "1" : "0";
    soundWave.style.opacity = soundToggle.checked ? "1" : "0";

    // Toggle music waves
    musicToggle.addEventListener("change", function() {
        musicBars.style.opacity = musicToggle.checked ? "1" : "0";
    });

    // Toggle sound wave
    soundToggle.addEventListener("change", function() {
        soundWave.style.opacity = soundToggle.checked ? "1" : "0";
    });
});



let mus=1;//music switch variable
document.getElementById('music-button').onclick = function(){
    mus=mus*-1;
    if(mus==-1){
        document.getElementById('BGM').pause();
    }else if(mus==1){
        document.getElementById('BGM').play();
    }
}
