document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener("DOMContentLoaded", () => {
        const health = document.getElementById("health");
        const happy = document.getElementById("happy");
        const thirsty = document.getElementById("thirsty");
        const hunger = document.getElementById("hunger");
        const gameOverScreen = document.getElementById("game-over");
        const page1 = document.getElementById("page1");
        const page2 = document.getElementById("page2");
        const restartButton = document.getElementById("restart");
    
        function checkGameOver() {
            if (health.value <= 0 || happy.value <= 0 || thirsty.value <= 0 || hunger.value <= 0) {
                page2.style.display = "none";
                gameOverScreen.style.display = "block";
            }
        }
    
        function resetGame() {
            health.value = 100;
            happy.value = 100;
            thirsty.value = 100;
            hunger.value = 100;
            gameOverScreen.style.display = "none";
            page1.style.display = "block";
            page2.style.display = "none";
        }
    
        document.getElementById("eat").addEventListener("click", () => {
            hunger.value = Math.min(100, hunger.value + 10);
            checkGameOver();
        });
    
        document.getElementById("drink").addEventListener("click", () => {
            thirsty.value = Math.min(100, thirsty.value + 10);
            checkGameOver();
        });
    
        document.getElementById("walk").addEventListener("click", () => {
            health.value = Math.min(100, health.value + 10);
            checkGameOver();
        });
    
        document.getElementById("play").addEventListener("click", () => {
            happy.value = Math.min(100, happy.value + 10);
            checkGameOver();
        });
    
        document.getElementById("make-pet").addEventListener("click", () => {
            page1.style.display = "none";
            page2.style.display = "block";
        });
    
        restartButton.addEventListener("click", resetGame);
    });
    
    // Add typing effect to the title
    const title = document.getElementById('title');
    title.innerHTML = title.textContent.split('').map((char, i) =>
        `<span style="animation-delay: ${i * 0.1}s">${char}</span>`
    ).join('');
    
    // Handle image selection and switching to the second page
    document.querySelectorAll('.pet-selection img').forEach(img => {
        img.addEventListener('click', function() {
            // Remove 'selected' class from all images
            document.querySelectorAll('.pet-selection img').forEach(img => img.classList.remove('selected'));
            // Add 'selected' class to the clicked image
            this.classList.add('selected');
            
            // Play the associated pet sound
            const petSound = document.getElementById(`${this.id}-sound`);
            if (petSound) {
                petSound.play();
                setTimeout(() => {
                    petSound.pause();
                    petSound.currentTime = 0; 
                }, 2000);
            }
        });
    });
      
 
    // Handle "Make Pet" button click
    document.getElementById('make-pet').addEventListener('click', function() {
        const selectedPet = document.querySelector('.pet-selection img.selected');
        const petName = document.getElementById('pet-name').value;
        
        if (selectedPet && petName) {
            document.getElementById('page1').style.display = 'none';
            document.getElementById('page2').style.display = 'block';
    
            // Display selected pet name and image
            document.getElementById('pet-name-display').textContent = petName;
            document.getElementById('pet-image').src = selectedPet.src;
    
            // Reset stats
            document.getElementById('health').value = 100;
            document.getElementById('happy').value = 100;
            document.getElementById('thirsty').value = 100;
            document.getElementById('hunger').value = 100;

            setInterval(() => {
                decreaseStat('health', -11);
                decreaseStat('happy', -9);
                decreaseStat('thirsty', -17);
                decreaseStat('hunger', -14);
                checkPetStatus();
                // if (checkGameOver()) {
                //     clearInterval(gameInterval); 
                //     document.getElementById('game-over').style.display = 'block';
                // }
            }, 1000);
    
            // Add event listeners for actions
            document.getElementById('eat').addEventListener('click', function() {
                changeStat('hunger', 10);
               
            });
    
            document.getElementById('drink').addEventListener('click', function() {
                changeStat('thirsty', 10);
            });
    
            document.getElementById('walk').addEventListener('click', function() {
                changeStat('health', 5);
                
            });
    
            document.getElementById('play').addEventListener('click', function() {
                changeStat('happy', 10);
               
            });
        } else {
            alert('Please select a pet and enter a name.');
        }
    });
});
 
function changeStat(statId, change) {
    const stat = document.getElementById(statId);
    let currentValue = parseInt(stat.value,10);
    currentValue += change;
    if (currentValue > 100) currentValue = 100;
    if (currentValue < 0) currentValue = 0;
    stat.value = currentValue;
}

function decreaseStat(statId, change) {
    const stat = document.getElementById(statId);
    let currentValue = parseInt(stat.value, 10);
    currentValue += change;
    if (currentValue > 100) currentValue = 100;
    if (currentValue < 0) currentValue = 0;
    stat.value = currentValue;
}

function checkPetStatus() {
    const health = parseInt(document.getElementById('health').value, 10);
    const happy = parseInt(document.getElementById('happy').value, 10);
    const thirsty = parseInt(document.getElementById('thirsty').value, 10);
    const hunger = parseInt(document.getElementById('hunger').value, 10);
   
    if (health <= 0, happy <= 0, thirsty <= 0, hunger <= 0) {
        alert('Your pet has died.');
        // Return to the first page
        document.getElementById('page2').style.display = 'none';
        document.getElementById('page1').style.display = 'block';
       
        // Reset inputs and selections
        document.querySelectorAll('.pet-selection img').forEach(img => img.classList.remove('selected'));
        document.getElementById('pet-name').value = '';
        document.getElementById('health').value = 100;
        document.getElementById('happy').value = 100;
        document.getElementById('thirsty').value = 50;
        document.getElementById('hunger').value = 50;
    }
}

// kristians code i worked out this code and we used part of this for the code above
// document.addEventListener("DOMContentLoaded", () => {
//     const health = document.getElementById("health");
//     const happy = document.getElementById("happy");
//     const thirsty = document.getElementById("thirsty");
//     const hunger = document.getElementById("hunger");
//     const gameOverScreen = document.getElementById("game-over");
//     const page1 = document.getElementById("page1");
//     const page2 = document.getElementById("page2");
//     const restartButton = document.getElementById("restart");
    
//     function checkGameOver() {
//         if (health.value <= 0 || happy.value <= 0 || thirsty.value <= 0 || hunger.value <= 0) {
//             page2.style.display = "none";
//             gameOverScreen.style.display = "block";
//             return true; // Game Over condition met
//         }
//         return false;
//     }

//     function resetGame() {
//         health.value = 100;
//         happy.value = 100;
//         thirsty.value = 100;
//         hunger.value = 100;
//         gameOverScreen.style.display = game-over;
//         page1.style.display = "block";
//         page2.style.display = "none";
//     }

//     function changeStat(statId, change) {
//         const stat = document.getElementById(statId);
//         let currentValue = parseInt(stat.value, 10);
//         currentValue += change;
//         if (currentValue > 100) currentValue = 100;
//         if (currentValue < 0) currentValue = 0;
//         stat.value = currentValue;
//         checkGameOver(); // Check game over after changing the stat
//     }

//     function decreaseStat(statId, change) {
//         changeStat(statId, change);
//     }

//     document.getElementById("eat").addEventListener("click", () => changeStat('hunger', 10));
//     document.getElementById("drink").addEventListener("click", () => changeStat('thirsty', 10));
//     document.getElementById("walk").addEventListener("click", () => changeStat('health', 10));
//     document.getElementById("play").addEventListener("click", () => changeStat('happy', 10));

//     document.getElementById("make-pet").addEventListener("click", () => {
//         const selectedPet = document.querySelector('.pet-selection img.selected');
//         const petName = document.getElementById('pet-name').value;
        
//         if (selectedPet && petName) {
//             page1.style.display = "none";
//             page2.style.display = "block";
    
//             document.getElementById('pet-name-display').textContent = petName;
//             document.getElementById('pet-image').src = selectedPet.src;
    
//             // Reset stats
//             health.value = 100;
//             happy.value = 100;
//             thirsty.value = 100;
//             hunger.value = 100;

//             setInterval(() => {
//                 decreaseStat('health', -5);
//                 decreaseStat('happy', -5);
//                 decreaseStat('thirsty', -5);
//                 decreaseStat('hunger', -5);
//                 if (checkGameOver()) {
//                     clearInterval(gameInterval); 
//                 }
//             }, 1000);

//         } else {
//             alert('Please select a pet and enter a name.');
//         }
//     });

//     restartButton.addEventListener("click", resetGame);

//     // Add typing effect to the title
//     const title = document.getElementById('title');
//     title.innerHTML = title.textContent.split('').map((char, i) =>
//         `<span style="animation-delay: ${i * 0.1}s">${char}</span>`
//     ).join('');

//     // Handle image selection and switching to the second page
//     document.querySelectorAll('.pet-selection img').forEach(img => {
//         img.addEventListener('click', function() {
//             document.querySelectorAll('.pet-selection img').forEach(img => img.classList.remove('selected'));
//             this.classList.add('selected');
            
//             const petSound = document.getElementById(`${this.id}-sound`);
//             if (petSound) {
//                 petSound.play();
//                 setTimeout(() => {
//                     petSound.pause();
//                     petSound.currentTime = 0; 
//                 }, 2000);
//             }
//         });
//     });
// });
