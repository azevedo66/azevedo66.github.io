let userSelectedTeam;

const teams = {};

const firstNames = ["Kenyon", "Will", "Zachary", "Martin", "Jeffery", "Brian", "Devon", "Steven", "Benny", "Nathan", 
"Mathhew", "Ben", "Benjamin", "Jim", "Wayne", "Jacob", "Jake", "Glen", "Elliot", "Stewart", "Isaac", "Tim", 
"Coby", "Brad", "Jeremy", "Melvin", "Tyrek", "Jerrod", "Philip", "Tony", "Jaeden", "Mark", "Alex", "Neal", 
"Reese", "Darin", "Lamont", "Vernon", "Vincent", "Brodie", "Ray", "Bradley", "David", "Keith", "Jamal", 
"Dylan", "Edward", "Seth", "Stephon", "Shayne"];

const lastNames = ["House", "Prewitt", "Burden", "Larsen", "Key", "Mancuso", "Horn", "Hanes", "Coley", "Nettles", 
"Ventura", "Smith", "Croft", "Samples", "Kaminski", "White", "Green", "Foley", "Phelps", "Barney", "Coffey", 
"Fuller", "Farnsworth", "Wilburn", "Espino", "Snell", "Allan", "Reaves", "Brockman", "Kelley", "Boyer", "Harman", 
"Meadows", "Hensley", "Mcmillen", "Jacobs", "Leblanc", "Akins", "Cornett", "Maxey", "Rubin", "Moses", "Conway", 
"Gates", "Christie", "Whalen", "Lawson", "Clary", "Beckett", "Keener"];

const conferenceTeams = {
    north: ["Aliens", "Astronauts", "Blizzards", "Crabs", "Defenders", "Dragons", "Eagles", "Hammers", "Ogres", "Riot", "Rocks", "Stars", "Tigers", "Volcanoes", "Wind", "Zombies"],
    east: ["Bears", "Beavers", "Dribblers", "Fighters", "Flames", "Gnomes", "Ice", "Mustangs", "Sailors", "Skeletons", "Tornadoes", "Troopers", "Wasps", "Wings", "Wizards", "Wolves"],
    south: ["Bats", "Comets", "Flash", "Gators", "Gladiators", "Hoopers", "Hustlers", "Longhorns", "Miners", "Monsters", "Mysteries", "Roses", "Sharks", "Snipers", "Silencers", "Whales"],
    west: ["Ballers", "Crusaders", "Dinos", "Dogs", "Explorers", "Frogs", "Jungle", "Knights", "Magicians", "Missiles", "Phantoms", "Pirates", "Scorpions", "Turtles", "Vipers", "Wave"]
};

class Team {
    constructor(name, conference, wins, losses, standing, overall, teamNum, starters, bench) {
        this.name = name;
        this.conference = conference;
        this.wins = wins;
        this.losses = losses;
        this.standing = standing;
        this.overall = overall;
        this.teamNum = teamNum;
        this.starters = starters;
        this.bench = bench;
    }
}

class Player {
    constructor(firstName, lastName, position, height, weight, overall, year) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.position = position;
        this.height = height;
        this.weight = weight;
        this.overall = overall;
        this.year = year;
    }
}

function createRandomPlayer(position, year, role) {
    function generateFirstName() {
        const randomIndex = Math.floor(Math.random() * firstNames.length);
        return firstNames[randomIndex];
    }
    
    function generateLastName() {
        const randomIndex = Math.floor(Math.random() * lastNames.length);
        return lastNames[randomIndex];
    }
    
    function generateHeight(position) {
        const randomIndex = Math.floor(Math.random() * 5);
        if (position === "Point Guard") {
            const heights = ["5'11\"", "6'0\"", "6'1\"", "6'2\"", "6'3\"", "6'4\"", "6'5\""];
            return heights[randomIndex];
        } else if (position === "Shooting Guard") {
            const heights = ["6'3\"", "6'4\"", "6'5\"", "6'6\"", "6'7\""];
            return heights[randomIndex];
        } else if (position === "Small Forward") {
            const heights = ["6'5\"", "6'6\"", "6'7\"", "6'8\"", "6'9\""];
            return heights[randomIndex];
        } else if (position === "Power Forward") {
            const heights = ["6'7\"", "6'8\"", "6'9\"", "6'10\"", "6'11\""];
            return heights[randomIndex];
        } else if (position === "Center") {
            const heights = ["6'9\"", "6'10\"", "6'11\"", "7'0\"", "7'1\"", "7'2\"", "7'3\""];
            return heights[randomIndex];
        }
    }

    function generateWeight(position) {
        const randomIndex = Math.floor(Math.random() * 5);
        if (position === "Point Guard") {
            const weights = [160, 165, 170, 175, 180, 185, 190, 195, 200, 205, 210, 215, 220];
            return weights[randomIndex];
        } else if (position === "Shooting Guard") {
            const weights = [200, 205, 210, 215, 220, 225, 230];
            return weights[randomIndex];
        } else if (position === "Small Forward") {
            const weights = [220, 225, 230, 235, 240, 245];
            return weights[randomIndex];
        } else if (position === "Power Forward") {
            const weights = [240, 245, 250, 255, 260];
            return weights[randomIndex];
        } else if (position === "Center") {
            const weights = [250, 255, 260, 265, 270, 275, 280, 285, 290, 295, 300];
            return weights[randomIndex];
        }
    }

    function generateOverall(role) {
        if (role === "starter") {
            return Math.floor(Math.random() * (99 - 75) + 75);
        } else if (role === "bench") {
            return Math.floor(Math.random() * (75 - 60) + 60);
        }
    }

    const player = new Player(generateFirstName(), generateLastName(), position, generateHeight(position), generateWeight(position), generateOverall(role), year);
    return player;
}

function createLeague() {
    for (const conference in conferenceTeams) {
        teams[conference] = {};
        for (let i = 0; i < conferenceTeams[conference].length; i++) {
            const starters = [];
            const bench = [];
            const positions = ["Point Guard", "Shooting Guard", "Small Forward", "Power Forward", "Center"];
            const years = ["Freshman", "Sophomore", "Junior", "Senior"];
            for (let i = 0; i < positions.length; i++) {
                const randomYearIndex1 = Math.floor(Math.random() * years.length);
                const randomYearIndex2 = Math.floor(Math.random() * years.length);
                const starterPlayer = createRandomPlayer(positions[i], years[randomYearIndex1], "starter");
                const benchPlayer = createRandomPlayer(positions[i], years[randomYearIndex2], "bench");
                starters.push(starterPlayer);
                bench.push(benchPlayer);
            }
            let overallSum = 0;
            for (let i = 0; i < 5; i++) {
                overallSum += starters[i].overall;
                overallSum += bench[i].overall;
            }
            const teamOverall = Math.round((overallSum + 70) / 10);
            const teamName = conferenceTeams[conference][i];
            const conferenceName = conference;
            const team = new Team(teamName, conferenceName, 0, 0, i + 1, teamOverall, i + 1, starters, bench);
            teams[conference][conferenceTeams[conference][i]] = team;
        }
    }
}

function orderStandings() {
    for (const conference in teams) {
        const teamsArr = [];
        for (const team in teams[conference]) {
            teamsArr.push({name: teams[conference][team].name, wins: teams[conference][team].wins, standing: teams[conference][team].standing});
        }
        teamsArr.sort(function(a, b) {
            return b.wins - a.wins;
        });
        for (let i = 1; i < teamsArr.length + 1; i++) {
            for (const team in teams[conference]) {
                if (teams[conference][team].name === teamsArr[i - 1].name) {
                    teams[conference][team].standing = i;
                }
            }
        }
    }
}

function selectTeamScreen() {
    const selectTeamDropdown = document.getElementById("selectTeamDropdown");
    let index = 1;
    for (const conference in conferenceTeams) {
        for (let i = 0; i < conferenceTeams[conference].length; i++) {
            const teamOption = document.createElement("option");
            teamOption.value = conferenceTeams[conference][i];
            teamOption.textContent = `${index}. ${conferenceTeams[conference][i]}`;
            selectTeamDropdown.appendChild(teamOption);
            index++;
        }
    }
}

document.getElementById("selectTeamForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const selectTeamDropdown = document.getElementById("selectTeamDropdown");
    userSelectedTeam = selectTeamDropdown.value;
    createLeague();
    rosterScreen();
    console.log(teams);
});

function rosterScreen() {
    hideAllScreens();
    document.getElementById("btn-menu-container").style.display = "block";
    document.getElementById("roster-screen-container").style.display = "block";
    document.getElementById("starters-container").innerHTML = "";
    document.getElementById("bench-container").innerHTML = "";
    document.getElementById("roster-screen-team-name").innerHTML = userSelectedTeam;
    for (const conference in teams) {
        for (const team in teams[conference]) {
            if (team === userSelectedTeam) {
                for (let i = 0; i < teams[conference][team]["starters"].length; i++) {
                    const player = teams[conference][team]["starters"][i];
                    const playerDiv = document.createElement("div");
                    document.getElementById("starters-container").append(playerDiv);
                    playerDiv.innerHTML = `${player.position}: ${player.firstName} ${player.lastName} (${player.overall} ovr) Height: ${player.height} Weight: ${player.weight}`;
                }
                for (let i = 0; i < teams[conference][team]["bench"].length; i++) {
                    const player = teams[conference][team]["bench"][i];
                    const playerDiv = document.createElement("div");
                    document.getElementById("bench-container").append(playerDiv);
                    playerDiv.innerHTML = `${player.position}: ${player.firstName} ${player.lastName} (${player.overall} ovr) Height: ${player.height} Weight: ${player.weight}`;
                }
            }
        }
    }
}

function standingsScreen() {
    hideAllScreens();
    orderStandings();
    document.getElementById("btn-menu-container").style.display = "block";
    document.getElementById("standings-screen-container").style.display = "block";
    document.getElementById("standings-screen-container").innerHTML = "";
    for (const conference in teams) {
        const conferenceDiv = document.createElement("div");
        const conferenceTitle = document.createElement("div");
        conferenceDiv.id = conference;
        conferenceTitle.id = conference + "-title-standings";
        conferenceTitle.className = "conference-title-standings";
        conferenceTitle.innerHTML = conference;
        document.getElementById("standings-screen-container").append(conferenceDiv);
        document.getElementById(conference).append(conferenceTitle);
        for (let i = 1; i <= 16; i++) {
            for (const team in teams[conference]) {
                if (teams[conference][team].standing === i) {
                    const teamDiv = document.createElement("div");
                    document.getElementById(conference).append(teamDiv);
                    teamDiv.innerHTML = `${i}. ${team} (${teams[conference][team].overall} ovr) (${teams[conference][team].wins}-${teams[conference][team].losses})`;
                }
            }
        }
    }
}

function hideAllScreens() {
    document.getElementById("start-screen-container").style.display = "none";
    document.getElementById("btn-menu-container").style.display = "none";
    document.getElementById("roster-screen-container").style.display = "none";
    document.getElementById("standings-screen-container").style.display = "none";
}

selectTeamScreen();