const plant = "plant";
const reptile = "reptile";
const dusk = "dusk";
const aquatic = "aquatic";
const bird = "bird";
const dawn = "dawn";
const bug = "bug";
const beast = "beast";
const mech = "mech";

const plantReptileDusk = [plant,reptile,dusk];
const aquaBirdDawn = [aquatic,bird,dawn];
const bugBeastMech = [bug,beast,mech];

const skillArray = {reptile: 31, plant: 31, dusk: 27, bird: 35, bug: 35, dawn: 39, mech: 41, beast: 31, aquatic: 35};


const axieJson = {
    "aquatic-tail-04.png":{
        "name": "Nimo",
        "damage": 40,
        "shield": 0,
        "type": aquatic,
        "energy": 0            
    },  
    "reptile-horn-08.png":{
        "name": "Scaly Spoon",
        "damage": 85,
        "shield": 40,
        "type": reptile,
        "energy": 1            
    },        
    "bird-mouth-04.png":{
        "name": "Peace Maker",
        "damage": 120,
        "shield": 30,
        "type": bird,
        "energy": 1
    },
    "reptile-back-06.png":{
        "name": "Green Thorns",
        "damage": 20,
        "shield": 30,
        "type": reptile,
        "energy": 0
    },
    "bug-tail-02.png":{
        "name": "Ant",
        "damage": 30,
        "shield": 40,
        "type": bug,
        "energy": 1
    },
    "reptile-back-04.png":{
        "name": "Spike Throw",
        "damage": 100,
        "shield": 50,
        "type": reptile,
        "energy": 1
    },
    "bug-horn-02.png":{
        "name": "Lagging",
        "damage": 40,
        "shield": 0,
        "type": bug,
        "energy": 0
    },
    "bird-tail-06.png":{
        "name": "The Last One",
        "damage": 160,
        "shield": 10,
        "type": bird,
        "energy": 1
    },
    "beast-mouth-08.png":{
        "name": "Axie Kiss",
        "damage": 90,
        "shield": 30,
        "type": bird,
        "energy": 1
    },
    "aquatic-back-10.png":{
        "name": "Anemone",
        "damage": 50,
        "shield": 0,
        "type": aquatic,
        "energy": 1
    },
    "bird-mouth-02.png":{
        "name": "Doubletalk",
        "damage": 0,
        "shield": 40,
        "type": bird,
        "energy": 1
    },
    "bird-horn-08.png":{
        "name": "Kestrel",
        "damage": 130,
        "shield": 0,
        "type": bird,
        "energy": 1
    },
    "aquatic-mouth-04.png":{
        "name": "Catfish",
        "damage": 70,
        "shield": 10,
        "type": aquatic,
        "energy": 1
    },
    "beast-horn-12.png":{
        "name": "Arco",
        "damage": 100,
        "shield": 50,
        "type": beast,
        "energy": 1
    },
    "reptile-tail-10.png":{
        "name": "Gila",
        "damage": 100,
        "shield": 50,
        "type": reptile,
        "energy": 1
    },
    "aquatic-back-12.png":{
        "name": "Perch",
        "damage": 100,
        "shield": 20,
        "type": aquatic,
        "energy": 1
    },
    "reptile-horn-12.png":{
        "name": "Bumpy",
        "damage": 80,
        "shield": 20,
        "type": reptile,
        "energy": 1
    },
    "reptile-tail-08.png":{
        "name": "Snake Jar",
        "damage": 70,
        "shield": 10,
        "type": reptile,
        "energy": 1
    },
    "beast-horn-10.png":{
        "name": "Dual Blade",
        "damage": 130,
        "shield": 20,
        "type": beast,
        "energy": 1
    },
    "beast-mouth-02.png":{
        "name": "Nut Cracker",
        "damage": 105,
        "shield": 40,
        "type": beast,
        "energy": 1
    },
    "aquatic-back-08.png":{
        "name": "Sponge",
        "damage": 60,
        "shield": 90,
        "type": aquatic,
        "energy": 1
    },
    "plant-back-04.png":{
        "name": "Shiitake",
        "damage": 0,
        "shield": 40,
        "type": plant,
        "energy": 1
    },
    "reptile-mouth-10.png":{
        "name": "Tiny Turtle",
        "damage": 90,
        "shield": 50,
        "type": reptile,
        "energy": 1
    },
    "plant-tail-08.png":{
        "name": "Yam",
        "damage": 30,
        "shield": 60,
        "type": plant,
        "energy": 1
    },
    "bird-back-06.png":{
        "name": "Raven",
        "damage": 110,
        "shield": 30,
        "type": bird,
        "energy": 1
    },
    "beast-mouth-04.png":{
        "name": "Goda",
        "damage": 80,
        "shield": 40,
        "type": beast,
        "energy": 1
    },
    "plant-horn-08.png":{
        "name": "Strawberry Shortcake",
        "damage": 0,
        "shield": 0,
        "type": plant,
        "energy": 2
    },
    "bird-tail-02.png":{
        "name": "Swallow",
        "damage": 120,
        "shield": 20,
        "type": bird,
        "energy": 1
    },
    "bug-back-02.png":{
        "name": "Snail Shell",
        "damage": 40,
        "shield": 100,
        "type": bug,
        "energy": 1
    },
    "reptile-back-12.png":{
        "name": "Croc",
        "damage": 80,
        "shield": 60,
        "type": reptile,
        "energy": 1
    },
    "beast-tail-10.png":{
        "name": "Nut Cracker",
        "damage": 105,
        "shield": 40,
        "type": beast,
        "energy": 1
    },
    "bird-horn-06.png":{
        "name": "Trump",
        "damage": 120,
        "shield": 30,
        "type": bird,
        "energy": 1
    },
    "bird-tail-04.png":{
        "name": "Feather Fan",
        "damage": 40,
        "shield": 90,
        "type": bird,
        "energy": 1
    },
    "bug-mouth-02.png":{
        "name": "Mosquito",
        "damage": 60,
        "shield": 40,
        "type": bug,
        "energy": 1
    },
    "beast-back-04.png":{
        "name": "Hero",
        "damage": 50,
        "shield": 0,
        "type": beast,
        "energy": 0
    },
    "bug-horn-06.png":{
        "name": "Catepillars",
        "damage": 80,
        "shield": 50,
        "type": bug,
        "energy": 1
    },
    "beast-tail-08.png":{
        "name": "Hare",
        "damage": 120,
        "shield": 30,
        "type": beast,
        "energy": 1
    },
    "beast-mouth-10.png":{
        "name": "Confident",
        "damage": 0,
        "shield": 30,
        "type": beast,
        "energy": 0
    },
    "bird-horn-02.png":{
        "name": "Egg Shell",
        "damage": 150,
        "shield": 0,
        "type": bird,
        "energy": 1
    },
    "aquatic-tail-06.png":{
        "name": "Tadpole",
        "damage": 100,
        "shield": 40,
        "type": aquatic,
        "energy": 1
    },
    "bird-horn-04.png":{
        "name": "Cuckoo",
        "damage": 0,
        "shield": 40,
        "type": bird,
        "energy": 0
    },
    "reptile-mouth-04.png":{
        "name": "Kotaro Bite",
        "damage": 120,
        "shield": 20,
        "type": reptile,
        "energy": 1
    },
    "plant-horn-02.png":{
        "name": "Bamboo Shoot",
        "damage": 80,
        "shield": 70,
        "type": plant,
        "energy": 1
    },
    "bug-tail-10.png":{
        "name": "Pupae",
        "damage": 60,
        "shield": 0,
        "type": bug,
        "energy": 0
    },
    "plant-back-08.png":{
        "name": "Watering Can",
        "damage": 60,
        "shield": 90,
        "type": plant,
        "energy": 1
    },
    "plant-mouth-02.png":{
        "name": "Serious",
        "damage": 30,
        "shield": 60,
        "type": plant,
        "energy": 1
    },
    "plant-horn-12.png":{
        "name": "Watermelon",
        "damage": 30,
        "shield": 30,
        "type": plant,
        "energy": 1
    },
    "beast-tail-02.png":{
        "name": "Cottentail",
        "damage": 0,
        "shield": 0,
        "type": beast,
        "energy": 0
    },
    "beast-horn-02.png":{
        "name": "Little Branch",
        "damage": 110,
        "shield": 40,
        "type": beast,
        "energy": 1
    },
    "beast-back-02.png":{
        "name": "Ronin",
        "damage": 75,
        "shield": 0,
        "type": beast,
        "energy": 1
    },
    "plant-horn-10.png":{
        "name": "Cactus",
        "damage": 120,
        "shield": 20,
        "type": plant,
        "energy": 1
    },
    "reptile-tail-06.png":{
        "name": "Tiny Dino",
        "damage": 80,
        "shield": 40,
        "type": reptile,
        "energy": 1
    },
    "beast-back-06.png":{
        "name": "Jaguar",
        "damage": 115,
        "shield": 35,
        "type": beast,
        "energy": 1
    },
    "plant-tail-02.png":{
        "name": "Carrot",
        "damage": 100,
        "shield": 40,
        "type": plant,
        "energy": 1
    },
    "reptile-horn-02.png":{
        "name": "Unko",
        "damage": 30,
        "shield": 40,
        "type": reptile,
        "energy": 1
    },
    "aquatic-tail-10.png":{
        "name": "Navaga",
        "damage": 110,
        "shield": 40,
        "type": aquatic,
        "energy": 1
    },
    "plant-mouth-08.png":{
        "name": "Herbivore",
        "damage": 60,
        "shield": 60,
        "type": plant,
        "energy": 1
    },
    "beast-back-08.png":{
        "name": "Risky Beast",
        "damage": 125,
        "shield": 25,
        "type": beast,
        "energy": 1
    },
    "bug-mouth-10.png":{
        "name": "Square Teeth",
        "damage": 30,
        "shield": 0,
        "type": bug,
        "energy": 0
    },
    "bug-tail-08.png":{
        "name": "Gravel Ant",
        "damage": 70,
        "shield": 50,
        "type": bug,
        "energy": 1
    },
    "reptile-back-02.png":{
        "name": "Bone Sail",
        "damage": 80,
        "shield": 70,
        "type": reptile,
        "energy": 1
    },
    "plant-horn-04.png":{
        "name": "Beech",
        "damage": 105,
        "shield": 40,
        "type": plant,
        "energy": 1
    },
    "plant-tail-12.png":{
        "name": "Hot Butt",
        "damage": 90,
        "shield": 70,
        "type": plant,
        "energy": 1
    },
    "bug-back-04.png":{
        "name": "Barb Strike",
        "damage": 100,
        "shield": 50,
        "type": bug,
        "energy": 1
    },
    "reptile-mouth-02.png":{
        "name": "Toothless Bite",
        "damage": 20,
        "shield": 40,
        "type": reptile,
        "energy": 1
    },
    "plant-back-10.png":{
        "name": "Mint",
        "damage": 0,
        "shield": 50,
        "type": plant,
        "energy": 0
    },
    "aquatic-mouth-08.png":{
        "name": "Risky Fish",
        "damage": 130,
        "shield": 30,
        "type": aquatic,
        "energy": 1
    },
    "aquatic-horn-08.png":{
        "name": "Anemone",
        "damage": 50,
        "shield": 0,
        "type": aquatic,
        "energy": 1
    },
    "aquatic-back-02.png":{
        "name": "Hermit",
        "damage": 0,
        "shield": 100,
        "type": aquatic,
        "energy": 1
    },
    "aquatic-horn-02.png":{
        "name": "Babylonia",
        "damage": 100,
        "shield": 50,
        "type": aquatic,
        "energy": 1
    },
    "plant-tail-10.png":{
        "name": "Potato Leaf",
        "damage": 70,
        "shield": 80,
        "type": plant,
        "energy": 1
    },
    "bird-back-12.png":{
        "name": "Tri Feather",
        "damage": 40,
        "shield": 10,
        "type": bird,
        "energy": 0
    },
    "plant-mouth-10.png":{
        "name": "Silence Whisper",
        "damage": 0,
        "shield": 0,
        "type": plant,
        "energy": 1
    },
    "reptile-horn-06.png":{
        "name": "Cerastes",
        "damage": 90,
        "shield": 60,
        "type": reptile,
        "energy": 1
    },
    "aquatic-horn-10.png":{
        "name": "Oranda",
        "damage": 120,
        "shield": 30,
        "type": aquatic,
        "energy": 1
    },
    "bug-horn-10.png":{
        "name": "Parasite",
        "damage": 90,
        "shield": 50,
        "type": bug,
        "energy": 1
    },
    "bug-mouth-04.png":{
        "name": "Pincer",
        "damage": 30,
        "shield": 10,
        "type": bug,
        "energy": 1
    },
    "aquatic-tail-08.png":{
        "name": "Ranchu",
        "damage": 110,
        "shield": 30,
        "type": aquatic,
        "energy": 1
    },
    "bug-back-08.png":{
        "name": "Sandal",
        "damage": 110,
        "shield": 50,
        "type": bug,
        "energy": 1
    },
    "plant-back-12.png":{
        "name": "Pumpkin",
        "damage": 0,
        "shield": 120,
        "type": plant,
        "energy": 1
    },
    "beast-tail-12.png":{
        "name": "Gerbil",
        "damage": 40,
        "shield": 20,
        "type": beast,
        "energy": 1
    },
    "plant-horn-06.png":{
        "name": "Rose Bud",
        "damage": 0,
        "shield": 40,
        "type": plant,
        "energy": 1
    },
    "plant-tail-06.png":{
        "name": "Hatsune",
        "damage": 60,
        "shield": 80,
        "type": plant,
        "energy": 1
    },
    "bird-horn-10.png":{
        "name": "Wing Horn",
        "damage": 50,
        "shield": 10,
        "type": bird,
        "energy": 1
    },
    "bug-horn-12.png":{
        "name": "Leaf Bug",
        "damage": 20,
        "shield": 30,
        "type": bug,
        "energy": 0
    },
    "aquatic-tail-12.png":{
        "name": "Shrimp",
        "damage": 30,
        "shield": 30,
        "type": aquatic,
        "energy": 1
    },
    "plant-tail-04.png":{
        "name": "Cattail",
        "damage": 20,
        "shield": 30,
        "type": plant,
        "energy": 0
    },
    "beast-horn-04.png":{
        "name": "Imp",
        "damage": 70,
        "shield": 20,
        "type": beast,
        "energy": 1
    },
    "aquatic-mouth-10.png":{
        "name": "Piranha",
        "damage": 130,
        "shield": 20,
        "type": aquatic,
        "energy": 1
    },
    "bird-back-02.png":{
        "name": "Baloon",
        "damage": 60,
        "shield": 0,
        "type": bird,
        "energy": 0
    },
    "bird-mouth-08.png":{
        "name": "Hungry Bird",
        "damage": 110,
        "shield": 40,
        "type": bird,
        "energy": 1
    },
    "aquatic-horn-06.png":{
        "name": "Clamshell",
        "damage": 110,
        "shield": 40,
        "type": aquatic,
        "energy": 1
    },
    "bird-tail-10.png":{
        "name": "Granma's Fan",
        "damage": 110,
        "shield": 30,
        "type": bird,
        "energy": 1
    },
    "aquatic-back-04.png":{
        "name": "Blue Moon",
        "damage": 120,
        "shield": 30,
        "type": aquatic,
        "energy": 1
    },
    "aquatic-back-06.png":{
        "name": "Goldfish",
        "damage": 120,
        "shield": 30,
        "type": aquatic,
        "energy": 1
    },
    "reptile-tail-02.png":{
        "name": "Wall Gecko",
        "damage": 100,
        "shield": 0,
        "type": reptile,
        "energy": 1
    },
    "reptile-tail-04.png":{
        "name": "Iguana",
        "damage": 90,
        "shield": 60,
        "type": reptile,
        "energy": 1
    },
    "plant-mouth-04.png":{
        "name": "Zigzag",
        "damage": 50,
        "shield": 50,
        "type": plant,
        "energy": 1
    },
    "bug-horn-04.png":{
        "name": "Antenna",
        "damage": 90,
        "shield": 60,
        "type": bug,
        "energy": 1
    },
    "bird-back-04.png":{
        "name": "Cupid",
        "damage": 90,
        "shield": 50,
        "type": bird,
        "energy": 1
    },
    "beast-tail-06.png":{
        "name": "Shiba",
        "damage": 110,
        "shield": 40,
        "type": beast,
        "energy": 1
    },
    "bird-tail-08.png":{
        "name": "Cloud",
        "damage": 100,
        "shield": 50,
        "type": bird,
        "energy": 1
    },
    "bird-mouth-10.png":{
        "name": "Little Owl",
        "damage": 50,
        "shield": 10,
        "type": bird,
        "energy": 1
    },
    "bug-back-10.png":{
        "name": "Scarab",
        "damage": 100,
        "shield": 40,
        "type": bug,
        "energy": 1
    },
    "aquatic-tail-02.png":{
        "name": "Koinobori",
        "damage": 115,
        "shield": 35,
        "type": aquatic,
        "energy": 1
    },
    "aquatic-mouth-02.png":{
        "name": "Lam",
        "damage": 120,
        "shield": 40,
        "type": aquatic,
        "energy": 1
    },
    "plant-back-02.png":{
        "name": "Turnip",
        "damage": 60,
        "shield": 80,
        "type": plant,
        "energy": 1
    },
    "reptile-back-08.png":{
        "name": "Indian Star",
        "damage": 20,
        "shield": 110,
        "type": reptile,
        "energy": 1
    },
    "plant-back-06.png":{
        "name": "Bidens",
        "damage": 0,
        "shield": 50,
        "type": plant,
        "energy": 1
    },
    "bird-tail-12.png":{
        "name": "Post Fight",
        "damage": 140,
        "shield": 0,
        "type": bird,
        "energy": 0
    },
    "bug-back-12.png":{
        "name": "Spiky Wing",
        "damage": 20,
        "shield": 0,
        "type": bug,
        "energy": 0
    },
    "bird-horn-12.png":{
        "name": "Feather Spear",
        "damage": 100,
        "shield": 50,
        "type": bird,
        "energy": 1
    },
    "beast-back-10.png":{
        "name": "Woodman Power",
        "damage": 50,
        "shield": 100,
        "type": beast,
        "energy": 1
    },
    "bird-back-10.png":{
        "name": "Kingfisher",
        "damage": 140,
        "shield": 10,
        "type": bird,
        "energy": 1
    },
    "aquatic-horn-04.png":{
        "name": "Teal Shell",
        "damage": 50,
        "shield": 80,
        "type": aquatic,
        "energy": 1
    },
    "beast-horn-08.png":{
        "name": "Pock",
        "damage": 70,
        "shield": 0,
        "type": beast,
        "energy": 1
    },
    "beast-back-12.png":{
        "name": "Furball",
        "damage": 30,
        "shield": 40,
        "type": beast,
        "energy": 1
    },
    "reptile-back-10.png":{
        "name": "Red Ear",
        "damage": 10,
        "shield": 130,
        "type": reptile,
        "energy": 1
    },
    "reptile-mouth-08.png":{
        "name": "Why So Serious",
        "damage": 100,
        "shield": 50,
        "type": reptile,
        "energy": 1
    },
    "reptile-horn-10.png":{
        "name": "Incisor",
        "damage": 100,
        "shield": 40,
        "type": reptile,
        "energy": 1
    },
    "bird-back-08.png":{
        "name": "Pigeon Post",
        "damage": 120,
        "shield": 10,
        "type": bird,
        "energy": 1
    },
    "reptile-horn-04.png":{
        "name": "Scaly Spear",
        "damage": 100,
        "shield": 50,
        "type": reptile,
        "energy": 1
    },
    "beast-tail-04.png":{
        "name": "Rice",
        "damage": 90,
        "shield": 20,
        "type": beast,
        "energy": 1
    },
    "reptile-tail-12.png":{
        "name": "Grass Snake",
        "damage": 10,
        "shield": 20,
        "type": reptile,
        "energy": 1
    },
    "beast-horn-06.png":{
        "name": "Merry",
        "damage": 65,
        "shield": 85,
        "type": beast,
        "energy": 1
    },
    "bug-mouth-08.png":{
        "name": "Cute Bunny",
        "damage": 120,
        "shield": 30,
        "type": bug,
        "energy": 1
    },
    "bug-tail-04.png":{
        "name": "Twin Tail",
        "damage": 30,
        "shield": 0,
        "type": bug,
        "energy": 0
    },
    "bug-tail-12.png":{
        "name": "Thorny Caterpillar",
        "damage": 120,
        "shield": 30,
        "type": bug,
        "energy": 1
    },
}
