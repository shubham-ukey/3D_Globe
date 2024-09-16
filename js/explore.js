// File: explore.js

document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startBtn');
    const backBtn = document.getElementById('backBtn');
    const introSection = document.getElementById('intro');
    const exploreSection = document.getElementById('exploreSection');

    // Show the exploration section and hide the intro section
    startBtn.addEventListener('click', () => {
        introSection.style.display = 'none';
        exploreSection.style.display = 'block';
    });

    // Show the intro section and hide the exploration section
    backBtn.addEventListener('click', () => {
        introSection.style.display = 'block';
        exploreSection.style.display = 'none';
    });
});
