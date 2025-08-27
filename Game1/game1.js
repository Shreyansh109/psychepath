document.addEventListener("DOMContentLoaded", function () {
    let video = document.getElementById("scene");

    // Array to store user choices
    let userChoices = [0];

    // Video scenes mapping
    let scenes = {
        "Act1": "file:///C:/Users/shrey/Desktop/Shreyansh/Technovation/Resources/Act1.mp4",
        "AskHelp": "file:///C:/Users/shrey/Desktop/Shreyansh/Technovation/Resources/Act1EventHelp.mp4",
        "SearchClue": "file:///C:/Users/shrey/Desktop/Shreyansh/Technovation/Resources/Act1EventClue.mp4",
        "BreakWindow": "file:///C:/Users/shrey/Desktop/Shreyansh/Technovation/Resources/Act1EventBreakWindow.mp4", // Correct choice
        "Act2": "file:///C:/Users/shrey/Desktop/Shreyansh/Technovation/Resources/Act2.mp4",
        "LeaveHim": "file:///C:/Users/shrey/Desktop/Shreyansh/Technovation/Resources/Act2EventLeave.mp4", // Direct to Act 3
        "AskQuestion": "file:///C:/Users/shrey/Desktop/Shreyansh/Technovation/Resources/Act2EventQuestion.mp4", // Leads to extra choice
        "AskHelpHim": "file:///C:/Users/shrey/Desktop/Shreyansh/Technovation/Resources/Act2EventHelpHim.mp4", // Direct to Act 3
        "Act3": "file:///C:/Users/shrey/Desktop/Shreyansh/Technovation/Resources/Act3.mp4",
        "SafePath": "file:///C:/Users/shrey/Desktop/Shreyansh/Technovation/Resources/Act3EventShotnLong.mp4",
        "HackAI": "file:///C:/Users/shrey/Desktop/Shreyansh/Technovation/Resources/Act3Hack.mp4",
        "FastDangerous": "file:///C:/Users/shrey/Desktop/Shreyansh/Technovation/Resources/Act3EventShotnLong.mp4",
        "Act4": "file:///C:/Users/shrey/Desktop/Shreyansh/Technovation/Resources/Act4.mp4",
        "Diplomatic": "file:///C:/Users/shrey/Desktop/Shreyansh/Technovation/Resources/Act4EventDiplomatic.mp4",
        "LeaveAlone": "file:///C:/Users/shrey/Desktop/Shreyansh/Technovation/Resources/Act4LeaveAlone.mp4",
        "OverwriteAI": "file:///C:/Users/shrey/Desktop/Shreyansh/Technovation/Resources/Act4EventOverWrite.mp4",
        "DestroyAI": "file:///C:/Users/shrey/Desktop/Shreyansh/Technovation/Resources/Act4EventDestroy.mp4"
    };

    // Available choices for each act
    let choices = {
        "Act1": [
            { text: "1. Ask for help", nextScene: "AskHelp" },
            { text: "2. Search for clues", nextScene: "SearchClue" },
            { text: "3. Break the window", nextScene: "BreakWindow" } // Correct choice
        ],
        "Act2": [
            { text: "1. Leave him", nextScene: "LeaveHim" }, // Moves to Act 3
            { text: "2. Ask question", nextScene: "AskQuestion" }, // Leads to extra choice
            { text: "3. Ask if he needs help", nextScene: "AskHelpHim" } // Moves to Act 3
        ],
        "AskQuestion": [
            { text: "1. Leave him", nextScene: "LeaveHim" }, // Moves to Act 3
            { text: "2. Ask again if he needs help", nextScene: "AskHelpHim" } // Moves to Act 3
        ],
        "Act3": [
            { text: "1. Take the safe and long path", nextScene: "SafePath" },
            { text: "2. Hack AI", nextScene: "HackAI" },
            { text: "3. Take the dangerous but fast path", nextScene: "FastDangerous" }
        ],
        "Act4": [
            { text: "1. Be Diplomatic", nextScene: "Diplomatic" },
            { text: "2. Leave Others Alone", nextScene: "LeaveAlone" },
            { text: "3. Overwrite the AI to Help Others", nextScene: "OverwriteAI" },
            { text: "4. Destroy the AI to Free Everyone", nextScene: "DestroyAI" }
        ]
    };

    let currentAct = "Act1"; // Track the current act to manage choices properly

    // Function to create and show options dynamically
    function showOptions() {
        let optionContainer = document.createElement("div");
        optionContainer.id = "optionsContainer";
        optionContainer.className = "fade-in";

        choices[currentAct].forEach((option) => {
            let btn = document.createElement("div");
            btn.className = "option";
            btn.innerText = option.text;
            btn.addEventListener("click", function () {
                handleChoice(option.nextScene, option.text);
            });
            optionContainer.appendChild(btn);
        });

        document.body.appendChild(optionContainer);
    }

    // Function to handle user choices
    function handleChoice(sceneKey, optionText) {
        let optionContainer = document.getElementById("optionsContainer");
        if (optionContainer) {
            optionContainer.remove();
        }

        // Store the chosen option in the array
        userChoices.push(optionText);
        sessionStorage.setItem("Game1user",userChoices);
        console.log("User Choices:", userChoices); // Debugging: See choices in console

        if (sceneKey === "BreakWindow") {
            // Correct choice in Act 1: Transition to Act 2
            playScene("BreakWindow", function () {
                currentAct = "Act2"; // Update to Act 2 choices
                playScene("Act2", function () {
                    showOptions();
                });
            });
        } else if (sceneKey === "SearchClue" || sceneKey === "AskHelp") {
            // If player makes a wrong choice, remove that option and show remaining choices
            playScene(sceneKey, function () {
                choices["Act1"] = choices["Act1"].filter((opt) => opt.nextScene !== sceneKey); // Remove selected choice from Act 1
                showOptions(); // Show remaining options again
            });
        } else if (sceneKey === "LeaveHim" || sceneKey === "AskHelpHim") {
            // Moves directly to Act 3
            playScene(sceneKey, function () {
                currentAct = "Act3"; // Move to Act 3
                playScene("Act3", function () {
                    showOptions();
                });
            });
        } else if (sceneKey === "AskQuestion") {
            // Leads to extra choices
            playScene(sceneKey, function () {
                currentAct = "AskQuestion"; // Switch options to AskQuestion choices
                showOptions();
            });
        } else if (sceneKey === "SafePath" || sceneKey === "FastDangerous") {
            // All Act 3 choices move to Act 4
            playScene(sceneKey, function () {
                currentAct = "Act4"; // Move to Act 4
                playScene("Act4", function () {
                    showOptions();
                });
            });
        }else if(sceneKey === "HackAI"){
            brython();
            document.getElementById("interpreter").style.display = "block";
            let timeLeft = 15;
            let timerInterval;
            let attemptUsed = false; // Now correctly handled in JavaScript

            timerInterval = setInterval(() => {
                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    alert("Failed! Time ran out.");
                    disableRunButton();
                    window.open("file:///C:/Users/shrey/Desktop/Shreyansh/Technovation/Game2/game2_introPage.html", "_parent");
                } else {
                    document.getElementById("timer").textContent = timeLeft;
                    timeLeft--;
                }
            }, 1000);

            window.stopTimer = function () {
                clearInterval(timerInterval);
            }

            window.disableRunButton = function () {
                document.getElementById("runPython").disabled = true;
            }

            document.getElementById("runPython").addEventListener("click", function () {
                if(document.getElementById("output").innerHTML == document.getElementById("expected").innerHTML){
                    document.getElementById("interpreter").style.display = "none";
                    currentAct = "Act4"; // Move to Act 4
                    playScene("Act4", function () {
                        showOptions();
                        // userChoices[0]=1;
                        // console.log(userChoices);
                    });
                }
                if (attemptUsed) return;
                attemptUsed = true;
                stopTimer();
            });
        } else if (sceneKey === "Diplomatic" || sceneKey === "LeaveAlone" || sceneKey === "OverwriteAI" || sceneKey === "DestroyAI") {
            // Act 4 choices end the game and redirect to a new HTML document
            playScene(sceneKey, function () {
                console.log("Final Choices:", userChoices); // Debugging: See all choices before redirecting
                userChoices[0]=1;
                sessionStorage.setItem("Game1user",userChoices);
                window.location.href = "file:///C:/Users/shrey/Desktop/Shreyansh/Technovation/Game2/game2_introPage.html";
            });
        } else {
            // General case for other choices
            playScene(sceneKey, function () {
                showOptions();
            });
        }
    }

    // Function to play a scene and execute a callback after video ends
    function playScene(sceneKey, callback) {
        if (scenes[sceneKey]) {
            video.src = scenes[sceneKey];
            video.load();
            video.play();
            if (callback) {
                video.addEventListener("ended", callback, { once: true });
            }
        }
    }

    // Initial event listener to show choices after Act 1 video ends
    video.addEventListener("ended", function () {
        showOptions();
    }, { once: true });
});