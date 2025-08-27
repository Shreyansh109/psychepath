document.getElementById("play").style.left=`${(document.getElementById('background-video').offsetWidth/2)-(document.getElementById('play').offsetWidth)/2}px`;
document.getElementById("play").style.top=`${document.getElementById('background-video').offsetHeight/4*3}px`;



//describing setting page

//sound variable changing
let sn=1;
document.getElementById('sound-button').onclick=function () {
    sn=sn*-1;
}

document.getElementById('settingBG').style.width=`${document.getElementById('background-video').offsetWidth}px`;
document.getElementById('settingBG').style.height=`${document.getElementById('background-video').offsetHeight}px`;

document.getElementById('setting').onclick=function(){
    //SFX controls
    if(sn==1){//1-->sound on, 0-->sound off
        document.getElementById('settingSFX').play();
    }
    document.getElementById('settingBG').style.display='flex';
}

document.getElementById("close-text-id").onclick = function() {
    if(sn==1){
        document.getElementById('closeSFX').play();
    }
    document.getElementById("settingBG").style.display='none';
}



// fetch('/login', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ email, password })
//   })
//   .then(response => {
//     if (response.redirected) {
//       window.location.href = response.url;
//     } else if (response.ok) {
//       // If the server is returning 200 OK but not a redirect,
//       // do it manually:
//       window.location.href = "projectAlpha_home.html";
//     } else {
//       return response.json();
//     }
//   })



//controlling scroll animation
document.getElementById("about").style.top=`${document.getElementById('background-video').offsetHeight}px`;
document.getElementById("about").style.width=`${document.getElementById('background-video').offsetWidth}px`;
document.getElementById("about").style.height=`${document.getElementById('background-video').offsetHeight+50}px`;


//scroll animation script
function revealOnScroll() {
    const sections = document.querySelectorAll('.hidden');
    const windowBottom = window.innerHeight; // Bottom of the viewport

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        
        if (rect.top - windowBottom <= -1) { // Trigger when top of section is 1px inside screen
            let progress = (windowBottom - rect.top) / windowBottom; // Normalize progress
            progress = Math.min(Math.max(progress, 0), 1); // Keep between 0-1

            // Text fades in first
            const textElement = section.querySelector('.text');
            textElement.style.opacity = Math.min(progress * 1.5, 1); // Text becomes visible faster

            // Container fades in after text
            section.style.opacity = 0.1 + progress * 0.9; // Opacity from 0.1 to 1
            section.style.transform = `scale(${0.8 + progress * 0.2})`; // Scale 0.8 → 1
            
            if (progress >= 1) {
                section.classList.add('visible');
            } else {
                section.classList.remove('visible');
            }
        } else {
            section.classList.remove('visible');
        }
    });
}

// Run on page load and scroll
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

document.getElementById('credit').style.top=`${document.getElementById('about').offsetHeight+document.getElementById('about').offsetTop}px`;