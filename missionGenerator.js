// Array of mission names
const missionNames = [
    "Lakeview",
    "Greenland",
    "Firestorm",
    "Dark Horizon",
    "Blue Thunder",
    "Red Falcon",
    "Shadow Strike",
    "Midnight Sun",
    "Silver Arrow",
    "Ironclad",
    "Omega Protocol",
    "Blackout",
    "Eagle Eye",
    "Stormchaser",
    "Deep Impact",
    "Lunar Eclipse"
];

// Function to generate a random mission name
function generateMission() {
    // Get a random index from missionNames array
    const randomIndex = Math.floor(Math.random() * missionNames.length);
    // Get the mission name at the random index
    const missionName = missionNames[randomIndex];
    // Display the mission name in the HTML element
    document.getElementById("missionResult").textContent = `Mission: ${missionName}`;
}
