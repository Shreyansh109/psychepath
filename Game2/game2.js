document.getElementById('blastSFX').volume=0.02;

var sound=1;

document.getElementById('correctBall').style.width = 
  `${document.getElementById('cannon1_1').offsetWidth / 2.5}px`;

let correctBallX = 0;
let animationRunning = false;
let currentRandomNumber = null; // Store the latest random number
let correctCount = 0;
let wrongCount = 0;
let missCount = 0; // 🔹 New Missed Ball Counter
let ballRound = 0;

// Create counter display
const counterDisplay = document.createElement("div");
counterDisplay.style.position = "absolute";
counterDisplay.style.top = "10px";
counterDisplay.style.right = "10px";
counterDisplay.style.background = "black";
counterDisplay.style.color = "white";
counterDisplay.style.padding = "10px";
counterDisplay.style.fontSize = "18px";
counterDisplay.style.borderRadius = "5px";
counterDisplay.innerHTML = `✅ Correct: ${correctCount} | ❌ Wrong: ${wrongCount} | ⚠️ Missed: ${missCount}`;
document.body.appendChild(counterDisplay);

// Key press handler
document.addEventListener("keydown", function(event) {
    console.log("Key Pressed:", event.key);
    console.log("Expected Number:", currentRandomNumber);

    if (!currentRandomNumber) return; // Ignore input if no active number

    if (parseInt(event.key) === currentRandomNumber) {
        console.log("✅ Correct Key Pressed!");
        correctCount++;
        numberGenerator(); // Generate a new ball
    } else if (event.key != 'N' && event.key !='n') {
        console.log("❌ Wrong Key Pressed!");
        wrongCount++;
    }

    if(event.key=='n' || event.key=='N'){
        sound=sound*-1;
    }

    // Update counter display
    updateCounterDisplay();
});

// Function to update counter display
function updateCounterDisplay() {
    counterDisplay.innerHTML = `✅ Correct: ${correctCount} | ❌ Wrong: ${wrongCount} | ⚠️ Missed: ${missCount}`;
}

var pu=2;//position updater 
let at = 8; // Animation time
// Ball animation function
function ballAnimation1(randomNumber) {
    if (ballRound <= 50) {
        if (ballRound == 10) {
            at = 6;
        } else if (ballRound == 20) {
            at = 3;
            pu=4;
        } else if (ballRound == 30) {
            at = 1;
        } else if (ballRound == 40) {
            pu=6;
            at=1.5;
        }

        let ball = document.getElementById('correctBall');
        console.log("Generated Number:", randomNumber);

        if (!animationRunning) return;

        if (ball.offsetTop > 0) {
            ball.style.top = `${ball.offsetTop - pu}px`;
            setTimeout(() => ballAnimation1(randomNumber), at);
        } else {
            // 🔹 Ball reached top without key press → Increase missed count
            console.log("⚠️ Ball Missed!");
            missCount++;
            updateCounterDisplay(); // Update counter display

            animationRunning = false;
            console.log(ballRound); 
            setTimeout(numberGenerator(),50);
        }
    }
    else{
        let finalScore=correctCount*10-wrongCount*7 - missCount*5;
        //fetch here
        document.getElementById('correct').innerHTML=`${correctCount}`;
        document.getElementById('wrong').innerHTML=`${wrongCount}`;
        document.getElementById('missed').innerHTML=`${missCount}`;
        document.getElementById('scoreId').innerHTML=`${finalScore}`;
        sessionStorage.setItem('score',finalScore);

        finalScorePercentage=finalScore/500*100;

        if(finalScorePercentage>=90){
            document.getElementById('messageID').innerHTML='Master';
            document.getElementById('descriptionID').innerHTML='Incredible Reflexes! You’re a true master of Reflex Rush!';
        }else if(finalScorePercentage>=70){
            document.getElementById('messageID').innerHTML='Expert';
            document.getElementById('descriptionID').innerHTML='Great Job! Your reflexes are sharp!';
        }else if(finalScorePercentage>=50){
            document.getElementById('messageID').innerHTML='Skilled';
            document.getElementById('descriptionID').innerHTML='Good effort! Keep practicing to improve your accuracy!';
        }else if(finalScorePercentage>=20){
            document.getElementById('messageID').innerHTML='Amateur';
            document.getElementById('descriptionID').innerHTML='Not bad! Try to focus more on accuracy!';
        }else{
            document.getElementById('messageID').innerHTML='Novice';
            document.getElementById('descriptionID').innerHTML='Needs Improvement! React faster and avoid mistakes!';
        }

        counterDisplay.style.display='none';
        document.getElementById('body').style.display='flex';
    }
}

// Number generator function
function numberGenerator() {
    if (ballRound <= 50) {
        ballRound++;
        let ball = document.getElementById('correctBall');
        let randomNumber = Math.floor(Math.random() * 4 + 1);
        currentRandomNumber = randomNumber; // Store the number globally

        console.log("New Random Number:", randomNumber);

        let cannon = document.getElementById(`cannon${randomNumber}_1`);
        correctBallX = cannon.offsetLeft + (cannon.offsetWidth / 2) - (ball.offsetWidth / 2);

        ball.style.left = `${correctBallX}px`;
        ball.style.top = `${window.innerHeight - cannon.offsetHeight}px`;

        document.getElementById('blastSFX').currentTime=0;
        if(sound==1){
            document.getElementById('blastSFX').play();
        }

        if (ballRound <= 51) {
            if (!animationRunning) {
                animationRunning = true;
                ballAnimation1(randomNumber);
            }
        }
    }
}

setTimeout(numberGenerator(),50);
