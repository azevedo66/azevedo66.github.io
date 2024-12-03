let userSelectedTeam;

const teams = {};

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

const bracketMatchups = {
    round: 0
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

    const heights = {
        "Point Guard": ["5'11\"", "6'0\"", "6'1\"", "6'2\"", "6'3\"", "6'4\"", "6'5\""],
        "Shooting Guard": ["6'3\"", "6'4\"", "6'5\"", "6'6\"", "6'7\""],
        "Small Forward": ["6'5\"", "6'6\"", "6'7\"", "6'8\"", "6'9\""],
        "Power Forward": ["6'7\"", "6'8\"", "6'9\"", "6'10\"", "6'11\""],
        "Center": ["6'9\"", "6'10\"", "6'11\"", "7'0\"", "7'1\"", "7'2\"", "7'3\""]
    };

    const weights = {
        "Point Guard": [160, 165, 170, 175, 180, 185, 190, 195, 200, 205, 210, 215, 220],
        "Shooting Guard": [200, 205, 210, 215, 220, 225, 230],
        "Small Forward": [220, 225, 230, 235, 240, 245],
        "Power Forward": [240, 245, 250, 255, 260],
        "Center": [250, 255, 260, 265, 270, 275, 280, 285, 290, 295, 300]
    };

    function getRandomElement(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    function generateOverall(role) {
        const range = role === "starter" ? [75, 99] : role === "bench" ? [60, 75] : [0, 0];
        return Math.floor(Math.random() * (range[1] - range[0]) + range[0]);
    }

    const player = new Player(
        getRandomElement(firstNames), 
        getRandomElement(lastNames), 
        position, 
        getRandomElement(heights[position]), 
        getRandomElement(weights[position]), 
        generateOverall(role), 
        year
    );

    return player;
}

function createLeague() {
    const positions = ["Point Guard", "Shooting Guard", "Small Forward", "Power Forward", "Center"];
    const years = ["Freshman", "Sophomore", "Junior", "Senior"];

    function generateTeamPlayers() {
        const starters = [];
        const bench = [];

        for (const position of positions) {
            const randomYear1 = years[Math.floor(Math.random() * years.length)];
            const randomYear2 = years[Math.floor(Math.random() * years.length)];
            starters.push(createRandomPlayer(position, randomYear1, "starter"));
            bench.push(createRandomPlayer(position, randomYear2, "bench"));
        }

        return { starters, bench };
    }

    function calculateTeamOverall(starters, bench) {
        let overallSum = 0;

        for (const player of [...starters, ...bench]) {
            overallSum += player.overall;
        }

        return Math.round((overallSum + 70) / 10);
    }

    for (const conference in conferenceTeams) {
        teams[conference] = {}; 
        conferenceTeams[conference].forEach((teamName, index) => {
            const { starters, bench } = generateTeamPlayers();
            const teamOverall = calculateTeamOverall(starters, bench);
            const team = new Team(
                teamName,
                conference,
                0,
                0,
                index + 1,
                teamOverall,
                index + 1,
                starters,
                bench
            );

            teams[conference][teamName] = team;
        });
    }
}

function orderStandings() {
    for (const conference in teams) {
        const teamsArr = Object.values(teams[conference]).map(team => ({
            name: team.name,
            wins: team.wins,
            standing: team.standing
        }));

        teamsArr.sort((a, b) => b.wins - a.wins);

        teamsArr.forEach((team, index) => {
            const teamObj = teams[conference][team.name];
            teamObj.standing = index + 1;
        });
    }
}

function simulateGame(team1, team2) {
    const starterPossessions = 50;
    const benchPossessions = 25;
    const minFgPercentage = 40;

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

        return simulatePlayerScore(player);
    }

    function simulatePlayerScore(player) {
        const randomNum = Math.random() * 100;
        const playerFgPercentage = minFgPercentage + (player.overall / 100) * (100 - minFgPercentage);
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
        teamScore1 += simulatePossession(team1, "starters");
        teamScore2 += simulatePossession(team2, "starters");
    }

    for (let i = 0; i < benchPossessions; i++) {
        teamScore1 += simulatePossession(team1, "bench");
        teamScore2 += simulatePossession(team2, "bench");
    }

    while (teamScore1 === teamScore2) {
        teamScore1 += simulatePossession(team1, "starters");
        teamScore2 += simulatePossession(team2, "starters");
    }

   return teamScore1 > teamScore2 ? team1 : team2;
}

function simulateRegularSeasonGame() {
    if (schedule.day <= 16) {
        const day = schedule.day.toString();
        const dayGames = schedule[day];

        for (const conference in teams) {
            dayGames.forEach(game => {
                const [team1Num, team2Num] = game;
                const team1 = Object.values(teams[conference]).find(team => team.teamNum === team1Num);
                const team2 = Object.values(teams[conference]).find(team => team.teamNum === team2Num);
                const winner = simulateGame(team1, team2);

                if (winner.name === team1.name) {
                    team1.wins += 1;
                    team2.losses += 1;
                } else if (winner.name === team2.name) {
                    team1.losses += 1;
                    team2.wins += 1;
                }
            })
        }

        schedule.day += 1;
        standingsScreen();
    } else if (schedule.day === 17) {
        bracketMatchups.round += 1;
        schedule.day += 1;
        createBracketMatchups();
        bracketScreen();
    }
}

function simulateRound() {
    const round = bracketMatchups.round;
    const roundMatchups = bracketMatchups[round];
    const nextRoundMatchups = [];

    if (roundMatchups.length === 1) {
        const [team1, team2] = roundMatchups[0];
        const winner = simulateGame(team1, team2);
        bracketMatchups.champion = winner;
        bracketScreen();
        return;
    }

    for (let i = 0; i < roundMatchups.length; i += 2) {
         const [team1, team2] = roundMatchups[i];
         const [team3, team4] = roundMatchups[i + 1];
         const winner1 = simulateGame(team1, team2);
         const winner2 = simulateGame(team3, team4);
         nextRoundMatchups.push([winner1, winner2]);
    }

    bracketMatchups[round + 1] = nextRoundMatchups;
    bracketMatchups.round += 1;

    bracketScreen();
}

function createBracketMatchups() {
    const firstRoundMatchups = [[1, 16], [8, 9], [5, 12], [4, 13], [6, 11], [3, 14], [7, 10], [2, 15]];

    if (bracketMatchups.round === 1) {
        const roundMatchups = [];

        for (const conference in teams) {
            firstRoundMatchups.forEach(([standing1, standing2]) => {
                const team1 = Object.values(teams[conference]).find(team => team.standing === standing1);
                const team2 = Object.values(teams[conference]).find(team => team.standing === standing2);
                roundMatchups.push([team1, team2]);
            });
        }

        bracketMatchups[1] = roundMatchups;
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
    document.getElementById("standings-screen-container").style.display = "flex";
    document.getElementById("standings-screen-container").innerHTML = "";

    for (const conference in teams) {
        const conferenceDiv = document.createElement("div");
        const conferenceTitle = document.createElement("div");
        conferenceDiv.id = conference + "-standings";
        conferenceTitle.id = conference + "-title-standings";
        conferenceDiv.className = "conference-section-standings";
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

                    if (teams[conference][team].name === userSelectedTeam) {
                        teamDiv.style.fontWeight = "bold";
                    }
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
                
                if (team1 === userSelectedTeam || team2 === userSelectedTeam) {
                    matchup.style.fontWeight = "bold";
                }
            }
        }
    } else {
        document.getElementById("schedule-screen-container").innerHTML = "No more regular season games remaining";
    }
}

function bracketScreen() {
    hideAllScreens();
    document.getElementById("btn-menu-container").style.display = "block";
    const container = document.getElementById("bracket-screen-container");
    container.style.display = "flex";
    container.innerHTML = "";

    for (const round in bracketMatchups) {
        if (round !== "round" && round !== "champion") {
            const roundSection = document.createElement("div");
            const roundTitle = document.createElement("div");
            roundSection.id = "round-" + round + "-section";
            roundTitle.id = "round-" + round + "-title";
            roundTitle.innerHTML = `Round ${round}`;
            container.append(roundSection);
            roundSection.append(roundTitle);

            for (let i = 0; i < bracketMatchups[round].length; i++) {
                const matchupDiv = document.createElement("div");
                const teamDiv1 = document.createElement("div");
                const teamDiv2 = document.createElement("div");
                matchupDiv.id = `round-${round}-matchup-${i + 1}`;
                teamDiv1.id = `round-${round}-matchup-${i + 1}-team-1`;
                teamDiv2.id = `round-${round}-matchup-${i + 1}-team-2`;
                matchupDiv.className = "bracket-matchup";
                teamDiv1.className = "bracket-team-top";
                teamDiv2.className = "bracket-team-bottom";
                teamDiv1.innerHTML = `${bracketMatchups[round][i][0].standing}. ${bracketMatchups[round][i][0].name} (${bracketMatchups[round][i][0].overall} ovr)`;
                teamDiv2.innerHTML = `${bracketMatchups[round][i][1].standing}. ${bracketMatchups[round][i][1].name} (${bracketMatchups[round][i][1].overall} ovr)`;

                if (bracketMatchups[round][i][0].name === userSelectedTeam || bracketMatchups[round][i][1].name === userSelectedTeam) {
                    matchupDiv.style.fontWeight = "bold";
                }

                roundSection.append(matchupDiv);
                matchupDiv.append(teamDiv1);
                matchupDiv.append(teamDiv2);
            }
        }
    }

    if (bracketMatchups.champion) {
        const championSection = document.createElement("div");
        const championTitle = document.createElement("div");
        championSection.id = "champion-section";
        championTitle.id = "champion-title";
        championTitle.innerHTML = "Champion";
        const championDiv = document.createElement("div");
        const champion = bracketMatchups.champion;
        championDiv.id = "champion";
        championDiv.innerHTML = `${champion.standing}. ${champion.name} (${champion.overall} ovr)`;
        container.append(championSection);
        championSection.append(championTitle);
        championSection.append(championDiv);
    }
}

function hideAllScreens() {
    document.getElementById("start-screen-container").style.display = "none";
    document.getElementById("btn-menu-container").style.display = "none";
    document.getElementById("roster-screen-container").style.display = "none";
    document.getElementById("standings-screen-container").style.display = "none";
    document.getElementById("schedule-screen-container").style.display = "none";
    document.getElementById("bracket-screen-container").style.display = "none";
}

document.getElementById("selectTeamForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const selectTeamDropdown = document.getElementById("selectTeamDropdown");
    userSelectedTeam = selectTeamDropdown.value;
    createLeague();
    rosterScreen();
});

document.getElementById("sim-btn").addEventListener("click", function (event) {
    if (schedule.day <= 17) {
        simulateRegularSeasonGame();
    } else if (!bracketMatchups.champion) {
        simulateRound();
    }
});

selectTeamScreen();