const scenarios = [
    {
        text: "You're lost in a dense, dark forest. The air is heavy, and the trees seem to whisper. Pick a color that represents how you feel.",
        video: "file:///C:/Users/shrey/Desktop/Shreyansh/Technovation/Resources/game3_vid1.mp4",
        colors: { "Red": "Panic, urgency", "Blue": "Calm, introspective", "Black": "Fear, uncertainty", "Green": "Bravery", "White": "Hope" }
    },
    {
        text: "You stand at the edge of a towering cliff, looking at the infinite sky and ocean below. What color represents your emotions?",
        video: "file:///C:/Users/shrey/Desktop/Shreyansh/Technovation/Resources/game3_vid2.mp4",
        colors: { "Red": "Thrill-seeker", "Orange": "Curious, adventurous", "Yellow": "Optimistic", "Blue": "Peaceful, deep thinker", "Black": "Feeling overwhelmed" }
    },
    {
        text: "You walk into a grand but abandoned library, its books full of lost knowledge. What color feels right?",
        video: "file:///C:/Users/shrey/Desktop/Shreyansh/Technovation/Resources/game3_vid3.mp4",
        colors: { "Yellow": "Curiosity", "Purple": "Philosophical", "Brown": "Appreciates history", "Blue": "Thoughtful", "Black": "Fear of forgotten truths" }
    },
    {
        text: "You're surrounded by people celebrating, dancing under lanterns. Which color captures your mood?",
        video: "file:///C:/Users/shrey/Desktop/Shreyansh/Technovation/Resources/game3_vid4.mp4",
        colors: { "Red": "Energetic", "Orange": "Friendly", "Yellow": "Cheerful", "Green": "Deep connections", "Gray": "Detached" }
    },
    {
        text: "You stand by a still pool that reflects everything you've seen so far. What color represents your state of mind?",
        video: "file:///C:/Users/shrey/Desktop/Shreyansh/Technovation/Resources/game3_vid5.mp4",
        colors: { "White": "Inner peace", "Purple": "Deep thinker", "Blue": "Reflective", "Black": "Feeling lost", "Gray": "Emotionally disconnected" }
    }
];

let userChoices = [];
let currentScenario = 0;

function loadScenario() {
    if (currentScenario >= scenarios.length) {
        analyzeEmotions();
        document.getElementById('bodyID').style.backgroundImage = 'none';
        document.getElementById('bodyID').style.background = `linear-gradient(45deg, ${userChoices[0]}, ${userChoices[1]}, ${userChoices[2]}, ${userChoices[3]})`;
        document.getElementById('messageBGM').play();
        document.getElementById('messageBGM').volume=0.2;
        document.getElementById('messageDialog').play();
        return;
    }

    const scenario = scenarios[currentScenario];
    document.getElementById("scenario-text").innerText = scenario.text;
    document.getElementById("video-source").src = scenario.video;
    document.getElementById("scene-video").load(); // Reload video
    document.getElementById("color-options").innerHTML = "";

    for (let color in scenario.colors) {
        let button = document.createElement("button");
        button.className = "color-btn";
        button.style.backgroundColor = color.toLowerCase();
        button.setAttribute("data-color", color);
        button.onclick = () => selectColor(color);
        document.getElementById("color-options").appendChild(button);
        
    }

    document.getElementById("next-btn").style.display = "none";
    document.getElementById("result").innerText = "";
}

function selectColor(color) {
    userChoices.push(color);   
    document.getElementById("next-btn").style.display = "block";
}

function nextScenario() {
    currentScenario++;
    loadScenario();
}

function analyzeEmotions() {
    let colorFrequency = {};
    userChoices.forEach(color => {
        colorFrequency[color] = (colorFrequency[color] || 0) + 1;
    });

    let dominantColor = Object.keys(colorFrequency).reduce((a, b) => colorFrequency[a] > colorFrequency[b] ? a : b);

    let resultMessage = "";
    switch (dominantColor) {
        case "Red":
            resultMessage = "🔥 You are passionate and intense. You act on emotions and love excitement.";
            break;
        case "Blue":
            resultMessage = "🌊 You are thoughtful and calm, preferring deep connections and reflection.";
            break;
        case "Green":
            resultMessage = "🌿 You seek balance and are connected to nature and growth.";
            break;
        case "Yellow":
            resultMessage = "☀️ You are optimistic, full of energy, and enjoy social interactions.";
            break;
        case "Black":
        case "Gray":
            resultMessage = "🌑 You may be feeling lost or emotionally detached. Take time to reflect.";
            break;
        default:
            resultMessage = "🌈 You have a mix of emotions, showing adaptability and complexity.";
    }

    sessionStorage.setItem("userColors", resultMessage);

    document.getElementById("game-container").innerHTML = `
        <h1>Results</h1>
        <p>${resultMessage}</p>
        <button onclick="Report()">Report</button>
    `;
}

function Report() {
    window.open("file:///C:/Users/shrey/Desktop/Shreyansh/Technovation/Report/report.html","_parent");
}

loadScenario();