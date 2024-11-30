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
        } else if (position === "ShootingGuard") {
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
                overallSum += starters[i];
                overallSum += bench[i];
            }
            const teamOverall = Math.round((overallSum + 70) / 10);
            const teamName = conferenceTeams[conference][i];
            const conferenceName = conference;
            const team = new Team(teamName, conferenceName, 0, 0, i + 1, teamOverall, i + 1, starters, bench);
            teams[conference][conferenceTeams[conference][i]] = team;
        }
    }
}

createLeague();
console.log(teams);