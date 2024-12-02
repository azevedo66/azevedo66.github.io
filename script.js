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

const schedule = {
    day: 1,
    1: [[1, 2], [8, 10], [9, 16], [7, 11], [3, 15], [6, 12], [4, 14], [5, 13]],
    2: [[9, 10], [1, 3], [8, 11], [2, 16], [7, 12], [4, 15], [6, 13], [5, 14]],
    3: [[2, 3], [9, 11], [1, 4], [8, 12], [10, 16], [7, 13], [5, 15], [6, 14]],
    4: [[10, 11], [2, 4], [9, 12], [1, 5], [8, 13], [3, 16], [7, 14], [6, 15]],
    5: [[3, 4], [10, 12], [2, 5], [9, 13], [1, 6], [8, 14], [11, 16], [7, 15]],
    6: [[11, 12], [3, 5], [10, 13], [2, 6], [9, 14], [1, 7], [8, 15], [4, 16]],
    7: [[4, 5], [11, 13], [3, 6], [10, 14], [2, 7], [9, 15], [1, 8], [12, 16]],
    8: [[13, 12], [4, 6], [11, 14], [3, 7], [10, 15], [2, 8], [5, 16], [1, 9]],
    9: [[5, 6], [12, 14], [4, 7], [11, 15], [3, 8], [13, 16], [2, 9], [1, 10]],
    10: [[13, 14], [5, 7], [12, 15], [4, 8], [6, 16], [3, 9], [1, 11], [2, 10]],
    11: [[6, 7], [13, 15], [5, 8], [14, 16], [4, 9], [1, 12], [3, 10]],
    12: [[2, 11], [14, 15], [6, 8], [7, 16], [5, 9], [1, 13], [4, 10]],
    13: [[2, 12], [3, 11], [7, 8], [15, 16], [6, 9], [1, 14], [5, 10]],
    14: [[2, 13], [4, 11], [3, 12], [8, 16], [7, 9], [1, 15], [6, 10]],
    15: [[2, 14], [5, 11], [3, 13], [4, 12], [8, 9], [1, 16], [7, 10]],
    16: [[2, 15], [6, 11], [3, 14], [5, 12], [4, 13]] 
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

function simulateGame(team1, team2) {
    const starterPossessions = 50;
    const benchPossessions = 25;
    let teamScore1 = 0;
    let teamScore2 = 0;

    function simulatePossession(team, lineup) {
        let player;
        if (lineup === "starters") {
            const randomPlayerIndex = Math.floor(Math.random() * team.starters.length);
            player = team.starters[randomPlayerIndex];
        } else {
            const randomPlayerIndex = Math.floor(Math.random() * team.bench.length);
            player = team.bench[randomPlayerIndex];
        }
        const points = simulatePlayerScore(player);
        return points;
    }

    function simulatePlayerScore(player) {
        const randomNum = Math.random() * 100;
        const minFgPercentage = 40;
        const playerFgPercentage = ((player - 69) * 0.5) + minFgPercentage;
        if (randomNum < playerFgPercentage) {
            const pointAmountNum = Math.random() * 100;
            if (pointAmountNum < 70) {
                return 2;
            } else {
                return 3;
            }
        }

        return 0;
    }

    for (let i = 0; i < starterPossessions; i++) {
        const possession1 = simulatePossession(team1, "starters");
        const possession2 = simulatePossession(team2, "starters");
        teamScore1 += possession1;
        teamScore2 += possession2;
    }

    for (let i = 0; i < benchPossessions; i++) {
        const possession1 = simulatePossession(team1, "bench");
        const possession2 = simulatePossession(team2, "bench");
        teamScore1 += possession1;
        teamScore2 += possession2;
    }

    if (teamScore1 > teamScore2) {
        return team1;
    } else if (teamScore2 > teamScore1) {
        return team2;
    } else {
        const randomWinner = Math.floor(Math.random());
        if (randomWinner === 1) {
            return team1;
        } else {
            return team2;
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
        conferenceDiv.id = conference + "-standings";
        conferenceTitle.id = conference + "-title-standings";
        conferenceTitle.className = "conference-title-standings";
        conferenceTitle.innerHTML = conference;
        document.getElementById("standings-screen-container").append(conferenceDiv);
        document.getElementById(conference + "-standings").append(conferenceTitle);
        for (let i = 1; i <= 16; i++) {
            for (const team in teams[conference]) {
                if (teams[conference][team].standing === i) {
                    const teamDiv = document.createElement("div");
                    document.getElementById(conference + "-standings").append(teamDiv);
                    teamDiv.innerHTML = `${i}. ${team} (${teams[conference][team].overall} ovr) (${teams[conference][team].wins}-${teams[conference][team].losses})`;
                }
            }
        }
    }
}

function scheduleScreen() {
    hideAllScreens();
    document.getElementById("btn-menu-container").style.display = "block";
    document.getElementById("schedule-screen-container").style.display = "block";
    document.getElementById("schedule-screen-container").innerHTML = "";
    if (schedule.day <= 16) {
        const day = schedule.day.toString();
        for (const conference in teams) {
            const conferenceDiv = document.createElement("div");
            const conferenceTitle = document.createElement("div");
            conferenceDiv.id = conference + "-schedule";
            conferenceTitle.id = conference + "-title-schedule";
            conferenceTitle.className = "conference-title-schedule";
            conferenceTitle.innerHTML = conference;
            document.getElementById("schedule-screen-container").append(conferenceDiv);
            document.getElementById(conference + "-schedule").append(conferenceTitle);
            for (let i = 0; i < schedule[day].length; i++) {
                let team1, team2, record1, record2;
                for (const team in teams[conference]) {
                    if (teams[conference][team].teamNum === schedule[day][i][0]) {
                        team1 = team;
                        record1 = `(${teams[conference][team].wins}-${teams[conference][team].losses})`;
                    } else if (teams[conference][team].teamNum === schedule[day][i][1]) {
                        team2 = team;
                        record2 = `(${teams[conference][team].wins}-${teams[conference][team].losses})`;
                    }
                }
                const matchup = document.createElement("div");
                matchup.innerHTML = `${team1} ${record1} vs. ${team2} ${record2}`;
                document.getElementById(conference + "-schedule").append(matchup);
            }
        }
    } else {
        document.getElementById("schedule-screen-container").innerHTML = "No more regular season games remaining";
    }
}

function hideAllScreens() {
    document.getElementById("start-screen-container").style.display = "none";
    document.getElementById("btn-menu-container").style.display = "none";
    document.getElementById("roster-screen-container").style.display = "none";
    document.getElementById("standings-screen-container").style.display = "none";
    document.getElementById("schedule-screen-container").style.display = "none";

}

selectTeamScreen();