// Array of mission names
const missionNames = [
    "Grassland #1",
    "Grassland #2",
    "Grassland #3",
    "Desert #1",
    "Desert #2",
    "Desert #3",
    "Rolling Hills #1 (Grassland/Hills)",
    "Hill Tops #1 (Grassland/Hills)",
    "Barren Lands #1 (Desert/Hills)",
    "Barren Lands #2 (Desert/Hills)",
    "Racice Riverdelta (CJW)",
    "Pozorista Mountains (CW)",
    "Kozice Valley (CDS)",
    "Lake Losiije (CNC) (Desert/Lake)",
    "Holth Forest (CGB) (Forest/Fire)",
    "Devils Bath (CSV) (Geyser/Vulkane)",
    "Robyns Crossing (Flussübergang)",
    "Deployment Zone (Desert)"
];

// Array mission parameters
const missionParameters = [
    "Solarstürme jede Runde möglich (Rundenstart, 1W6, 5+6 kein Feuern möglich)",
    "Bombardment jede Runde (+1 Schaden falls Mech nicht bewegt wird in einer Runde)",
    "Hitzeplanet (wenn ein Mech in einer Runde feuert, muss er in der nächsten Runde pausieren)",
    "Hohe Schwerkraft (alle Mechs Bewegung -1)",
    "Sehr hohe Schwerkraft (alle Mechs Bewegung -2)",
    "Hohe Piratenaktivität, jede Runde könnte ein Pirat erscheinen (Rundenstart, 1W6, 6 Pirat erscheint)",
    "Sandsturm (alle Mechs Trefferwurf +1)"
];

// Array Mission Classes
const missionClasses = [
    "L",
    "LM",
    "MH",
    "MA",
    "LMHA"
];

const poolL1 = [
    "Wasp",
    "Jenner",
    "Hatchetman",
    "Panther",
    "Mercury",
    "Atlas"
];

// Function to generate a random mission name
function generateMissions() {
    const numMissions = rollDice(5);
    const missionsContainer = document.getElementById("missionsContainer");
    missionsContainer.innerHTML = ""; // Clear previous missions
    
    const selectElement = document.getElementById('planets');
    const selectedPlanet = selectElement.value;
    if (selectedPlanet == "") {
        return
    }

    for (let i = 0; i < numMissions; i++) {
        // Get the mission name at the random index
        const missionName = missionNames[Math.floor(Math.random() * missionNames.length)];
        let missionParameter = missionParameters[Math.floor(Math.random() * missionParameters.length)];
        const missionClass = missionClasses[Math.floor(Math.random() * missionClasses.length)];
        // Create a new paragraph element for each mission
        const missionElement = document.createElement("p");
        const missionTitle = document.createElement("p");
        missionTitle.textContent = `Mission ${i + 1}: ${missionName}`;
        const missionElementParameter = document.createElement("p");
        if(rollDice(3) > 1) { missionParameter = "Nothing special";} 
        missionElementParameter.textContent = `Parameters: ${missionParameter}`;

        const missionElementClass = document.createElement("p");
        missionElementClass.textContent = `Klasse: ${missionClass}`;

        const missionElementBlips = document.createElement("p");
        blipsFromPools = rollPools(rollDice(6), missionClass);
        missionElementBlips.textContent = `Blips: ${blipsFromPools}`;

        diceThrowPlayerWhichQuadrant = rollDice(6);
        diceThrowPlayerWhichPosInQuadrant = rollDice(6);
        const missionElementPlayerStart = document.createElement("p");
        missionElementPlayerStart.textContent = `Player Start (Quadrant,Pos in Quadrant): ${diceThrowPlayerWhichQuadrant},${diceThrowPlayerWhichPosInQuadrant}`;
        // Append the mission element to the missions container
        const missionContainer = document.createElement("p");
        missionContainer.classList.add("mission");
        missionContainer.appendChild(missionElement);
        missionContainer.appendChild(missionTitle);
        missionContainer.appendChild(missionElementParameter);
        missionContainer.appendChild(missionElementClass);
        missionContainer.appendChild(missionElementPlayerStart);
        missionContainer.appendChild(missionElementBlips);

        missionsContainer.appendChild(missionContainer);
    }
}
function rollDice(sides) {
    return Math.floor(Math.random() * sides) + 1;
}

function rollPools(amount, poolClass) {
    let pools = [];
    for (let i = 1; i <= amount; i++) {
        poolNumber = rollDice(3);
        let poolType = "";
        switch (poolClass) {
            case "L":
                poolType = "L";
                break;
            case "LM":
                if(rollDice(2) == 1) { poolType = "L"; }
                else { poolType = "M";}
                break;            
            case "MH":
                if(rollDice(2) == 1) { poolType = "M"; }
                else { poolType = "H";}
                break;                
            case "MA":
                    if(rollDice(2) == 1) { poolType = "A"; }
                    else { poolType = "M";}
                    break;
            case "LMHA":
                diceRoll = rollDice(4)
                switch (diceRoll) {
                    case 1:
                        poolType="L";
                        break;
                    case 2:
                        poolType="M";
                        break;
                    case 3:
                        poolType="H";
                        break;
                    case 4:
                        poolType="A";
                        break;
                }

                }
        poolPos = rollDice(6);
        pools.push(`${poolType}${poolNumber} (Pos: ${poolPos})`);
    }

    return pools;
}
