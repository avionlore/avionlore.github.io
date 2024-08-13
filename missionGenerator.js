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
    "Sandsturm (alle Mechs Trefferwurf +1)",
    "Jeder Blip hat jede Runde eine 1W6 (6 Erfolg) Chance, aktiviert zu werden."
];

// Array Mission Classes
let missionClasses = {
    L: {
        className: "L",
        classFullName: "Light",
        classDifficultyModifier: 1
    },
    LM: {
        className: "LM",
        classFullName: "Light+Medium",
        classDifficultyModifier: 5
    },
    MH: {
        className: "MH",
        classFullName: "Medium+Heavy",
        classDifficultyModifier: 10
    },    
    MA: {
        className: "MA",
        classFullName: "Medium+Assault",
        classDifficultyModifier: 15
    },
    LMHA: {
        className: "LMHA",
        classFullName: "Light+Medium+Heavy+Assault",
        classDifficultyModifier: 20
    }
};

const poolL1 = [
    "Wasp",
    "Jenner",
    "Hatchetman",
    "Panther",
    "Mercury",
    "Atlas"
];

const poolL2 = [
    "Urban",
    "Raven",
    "Wasp",
    "Mercury",
    "Jenner",
    "Hatchetman"
];

const poolL3 = [
    "Wasp",
    "Sentinel",
    "Mercury",
    "Urban",
    "Raven",
    "Exterminator"
];

const poolM1 = [
    "Hunchback",
    "Enforcer",
    "Centurion",
    "ShadowHawk",
    "Blackjack",
    "PhoenixHawk"
];

const poolM2 = [
    "Urban",
    "PhoenixHawk",
    "Wolverine",
    "ShadowHawk",
    "Griffin",
    "Catapult"
];

const poolM3 = [
    "Griffin",
    "Hunchback",
    "Wolverine",
    "Centurion",
    "Catapult",
    "Warhammer"
];

const poolH1 = [
    "Grashopper",
    "Catapult",
    "Warhammer",
    "Thunderbolt",
    "Orion",
    "Banshee"
];

const poolH2 = [
    "Crusader",
    "Catapult",
    "Grashopper",
    "Orion",
    "BlackKnight",
    "Thunderbolt"
];

const poolH3 = [
    "Exterminator",
    "Crusader",
    "Warhammer",
    "Thunderbolt",
    "Orion",
    "KingCrab"
];

const poolA1 = [
    "Marauder2",
    "Highlander",
    "Grashopper",
    "Banshee",
    "Atlas",
    "KingCrab"
];

const poolA2 = [
    "Catapult",
    "Banshee",
    "Highlander",
    "Atlas",
    "KingCrab",
    "Marauder2"
];

const poolA3 = [
    "KingCrab",
    "Atlas",
    "Orion",
    "Highlander",
    "Marauder2",
    "Banshee"
];


let poolsL = {
    1: poolL1,
    2: poolL2,
    3: poolL3
}

let poolsM = {
    1: poolM1,
    2: poolM2,
    3: poolM3
}


let poolsH = {
    1: poolH1,
    2: poolH2,
    3: poolH3
}

let poolsA = {
    1: poolA1,
    2: poolA2,
    3: poolA3
}


let mechClassMapping = {
    "L": poolsL,
    "M": poolsM,
    "H": poolsH,
    "A": poolsA
};

const maxBlipsPerClass = 3;

// Function to generate a random mission name
function generateMissions() {
    const numMissions = rollDice(5);
    const missionsContainer = document.getElementById("missionsContainer");
    missionsContainer.innerHTML = ""; // Clear previous missions
    
    for (let i = 0; i < numMissions; i++) {
        let missionDifficultyValue = 1;
        // Get the mission name at the random index
        const missionName = missionNames[Math.floor(Math.random() * missionNames.length)];
        let missionParameter = missionParameters[Math.floor(Math.random() * missionParameters.length)];
        const missionClass = getRandomMissionClass();
        // Create a new paragraph element for each mission
        const missionElement = document.createElement("p");
        const missionTitle = document.createElement("p");
        missionTitle.textContent = `Mission ${i + 1}: ${missionName}`;
        const missionElementParameter = document.createElement("p");
        if(rollDice(3) > 1) 
        { 
            missionParameter = "Nothing special";
        }
        else
        {
            missionDifficultyValue+=5;
        }
        missionElementParameter.textContent = `Parameters: ${missionParameter}`;

        const missionElementClass = document.createElement("p");
        missionElementClass.textContent = `Class: ${missionClass.className}`;

        const missionElementBlips = document.createElement("p");
        missionElementBlips.classList.add("hideme");
        blipsFromPools = rollPools(rollDice(6), missionClass);
        displayTextFromPools = blipsFromPools.map(obj => obj.displayPosition).join(", ");
        blipsFromPools.forEach(pool => {
            const subElement = document.createElement("p");
            subElement.textContent = `${pool.displayPosition}`;
            missionElementBlips.appendChild(subElement);
            missionDifficultyValue+=pool.poolDifficulty;
        });

        const missionElementBlipsMechSetup = document.createElement("p");
        missionElementBlipsMechSetup.classList.add("hideme");
        blipsFromPools.forEach(pool => {
            const subElement = document.createElement("p");
            subElement.textContent = `${pool.displayPosition}: ${pool.mechs}`;
            missionElementBlipsMechSetup.appendChild(subElement);
        });

        const missionDifficulty = document.createElement("p");
        missionDifficulty.textContent = `Difficulty: ${missionDifficultyValue}`;
       

        const missionShowBlipsButton = document.createElement("button");
        missionShowBlipsButton.innerText = "Intel Blips";
        missionShowBlipsButton.addEventListener('click', function(){
            if (missionElementBlips.style.display == 'block') {
                missionElementBlips.style.display = 'none';
            } else {
                missionElementBlips.style.display = 'block';
            }
        });

        const missionShowBlipsMechSetupButton = document.createElement("button");
        missionShowBlipsMechSetupButton.innerText = "Intel Mechs";
        missionShowBlipsMechSetupButton.addEventListener('click', function(){
            if (missionElementBlipsMechSetup.style.display == 'block') {
                missionElementBlipsMechSetup.style.display = 'none';
            } else {
                missionElementBlipsMechSetup.style.display = 'block';
            }
        });

        diceThrowPlayerWhichQuadrant = rollDice(6);
        diceThrowPlayerWhichPosInQuadrant = rollDice(6);
        const missionElementPlayerStart = document.createElement("p");
        missionElementPlayerStart.textContent = `Player Start (Quadrant,Pos in Quadrant): ${diceThrowPlayerWhichQuadrant},${diceThrowPlayerWhichPosInQuadrant}`;
        // Append the mission element to the missions container
        const missionContainer = document.createElement("p");
        missionContainer.classList.add("mission");
        missionContainer.appendChild(missionElement);
        missionContainer.appendChild(missionTitle);
        missionContainer.appendChild(missionDifficulty);
        missionContainer.appendChild(missionElementParameter);
        missionContainer.appendChild(missionElementClass);
        missionContainer.appendChild(missionElementPlayerStart);
        missionContainer.appendChild(missionShowBlipsButton);
        missionContainer.appendChild(missionShowBlipsMechSetupButton);
        missionContainer.appendChild(missionElementBlips);
        missionContainer.appendChild(missionElementBlipsMechSetup);

        missionsContainer.appendChild(missionContainer);
    }
}

function getRandomMissionClass()
{
        // Step 1: Get all the keys of missionClasses
    let keys = Object.keys(missionClasses);

    // Step 2: Generate a random index based on the number of keys
    let randomIndex = Math.floor(Math.random() * keys.length);

    // Step 3: Select a random key
    let randomKey = keys[randomIndex];

    // Step 4: Get the corresponding item from missionClasses
    return missionClasses[randomKey];
}

function rollDice(sides) {
    return Math.floor(Math.random() * sides) + 1;
}

function howManyMechsCanSpawnFromBlip()
{
    diceRoll = rollDice(6);
    if(diceRoll == 1)
    {
        return 0;
    }
    else if(diceRoll < 4)
    {
        return 1;
    }
    else if(diceRoll < 6)
    {
        return 2;
    }
    else
    {
        return 3
    }
}

function rollPools(amount, poolClass) {
    let pools = []

    for (let i = 1; i <= amount; i++) {
        const pool = {
            display: "",
            poolType: "",
            poolPos: 0,
            poolQuadrant: 0,
            poolClass: poolClass.className,
            mechCount: howManyMechsCanSpawnFromBlip(),
            mechs: "",
            poolDifficulty: 0
        };

        switch (pool.poolClass) {
            case "L":
                pool.poolType = "L";
                pool.poolDifficulty+=1;
                break;
            case "LM":
                if(rollDice(2) == 1) {
                    pool.poolType = "L";
                    pool.poolDifficulty+=1;
                }
                else { 
                    pool.poolType = "M";
                    pool.poolDifficulty+=2;
                }
                break;            
            case "MH":
                if(rollDice(2) == 1) { 
                    pool.poolType = "M";
                    pool.poolDifficulty+=2;
                }
                else { 
                    pool.poolType = "H";
                    pool.poolDifficulty+=3;
                }
                break;                
            case "MA":
                    if(rollDice(2) == 1) { 
                        pool.poolType = "A";
                        pool.poolDifficulty+=4;
                    }
                    else { 
                        pool.poolType = "M";
                        pool.poolDifficulty+=3;
                    }
                    break;
            case "LMHA":
                diceRoll = rollDice(4)
                switch (diceRoll) {
                    case 1:
                        pool.poolType="L";
                        pool.poolDifficulty+=1;
                        break;
                    case 2:
                        pool.poolType="M";
                        pool.poolDifficulty+=2;
                        break;
                    case 3:
                        pool.poolType="H";
                        pool.poolDifficulty+=3;
                        break;
                    case 4:
                        pool.poolType="A";
                        pool.poolDifficulty+=4;
                        break;
                }

        }
        if(checkIfPoolIsAlreadyAtMax(pools, pool.poolType))
        {
            continue;
        }
        let poolsWithMechs = mechClassMapping[pool.poolType];

        pool.poolPos = rollDice(6);
        pool.poolQuadrant = rollDice(4);

        const mechs = [];
        for(i=0;i<pool.mechCount;i++)
        {
            let diceMechPool = rollDice(3);
            let diceMechFromPool = rollDice(6) - 1;
            mechPool = poolsWithMechs[diceMechPool]
            mechs.push(`${mechPool[diceMechFromPool]} (${diceMechPool}, ${diceMechFromPool})`)
        }

        pool.displayPosition = `${pool.poolType} (Quadrant: ${pool.poolQuadrant} , Pos: ${pool.poolPos})`
        pool.mechs = mechs.join(" -- ");
        pool.poolDifficulty+= pool.mechCount;
        pools.push(pool);
    }

    return pools;
}

function checkIfPoolIsAlreadyAtMax(pools, poolType)
{
    const count = pools.filter(pool => pool.poolType === poolType).length;
    if(count >= maxBlipsPerClass)
    {
        return true
    }
    return false;
}
