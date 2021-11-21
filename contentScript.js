loadDragDrop();
//console.log("Loading Content Script load");
var attackMoves = [];

var baseAxieType = "";

var assumeDamageBonus = false;

var critBonus = 0

async function loadDragDrop(){
    //console.log("Loading drag and drop load");
    while(!document.querySelector("canvas")) {
        await new Promise(r => setTimeout(r, 500));
    }

    if(document.getElementById("damageTable")){
        //console.log("already loaded");
        return; 
    }

    const baseAxieHtml = document.querySelector("div.flex.items-center.mt-4 > div");
    if(!baseAxieHtml){
        //console.log("Not Petite or Adult don't load");
        return; 
    }
    //console.log(baseAxieHtml);
    baseAxieType = baseAxieHtml.innerHTML.toLowerCase();
    //console.log(baseAxieType);
    attackMoves = [];// clear attack moves

    const axieDiv = document.querySelector("canvas");

    const divDmgWapper = document.createElement("div");
    divDmgWapper.className = 'mt-40'
    const divDmgHeader = document.createElement("div");
    divDmgHeader.className = 'font-bold text-20 leading-24 text-white mb-12';
    divDmgHeader.innerText = 'Damage - Critical Hit Damage Bonus ' + Math.floor(getCritBonus()) + '%';
    const divDmgContainer = document.createElement("div");
    divDmgContainer.className = "rounded-12 border border-gray-3 px-16 py-16 bg-gray-4 overflow-hidden flex flex-wrap";
    divDmgContainer.style.width = "95%"
    const table = document.createElement("table");
    table.style.borderCollapse = "collapse";
    table.style.width = "100%";
    table.id = "damageTable";
    var header = table.createTHead();
    var row = header.insertRow();
    row.style.fontWeight = "bold";
    row.style.textDecoration = "underline";
    row.style.padding = "5px";
    var cell0 = row.insertCell(0);
    var cell1 = row.insertCell(1);
    var cell2 = row.insertCell(2);
    var cell3 = row.insertCell(3);
    var cell4 = row.insertCell(4);
    cell0.innerHTML = "Move"
    cell0.style.width = "120px";
    cell1.innerHTML = "Plant<br>Reptile<br>Dusk"
    cell2.innerHTML = "Bird<br>Aquatic<br>Dawn"
    cell3.innerHTML = "Bug<br>Beast<br>Mech"
    cell4.innerHTML = "Eng"
    var uxRow = table.insertRow();
    var uxCell = uxRow.insertCell();
    uxCell.colSpan = 4;
    uxCell.innerText = 'Drag ability cards of Axie over image to start';

    var clearLink = document.createElement("button");
    clearLink.id = "clearData";
    clearLink.innerHTML = "clear";
    clearLink.className = "rounded px-8 py-4 transition focus:outline-none border text-white border-gray-2 hover:border-gray-1 active:border-gray-3 bg-gray-5 hover:bg-gray-4 active:bg-gray-6";
    clearLink.style = "margin-right: 200px;";
    clearLink.addEventListener('click', function() {
        clearData();
    });
    
    var damageBonusBox = document.createElement("input");
    damageBonusBox.type = "checkbox";
    damageBonusBox.id = "damageBonusBox";
    damageBonusBox.addEventListener('click', function() {
        assumeDamageBonusCheckbox();
    });
    
    var damageBonusDiv = document.createElement("div");
    damageBonusDiv.style.float = "right"; 
    damageBonusDiv.innerHTML = 'Assume Damage Bonuses:';
    damageBonusDiv.title = 'Add damage bonus for abilities with conditionals like Swallow - Deal 120% damage if this Axie attacks first.';
    damageBonusDiv.appendChild(damageBonusBox);
    
    let moveImgs = getElementsByXPath('//*[@id="__next"]/div[4]/div/div[2]/div/div[2]/div/div[2]/img');
    //console.log(moveImgs);
    moveImgs.forEach(img => {
        img.setAttribute("draggable", "true");
        img.addEventListener("dragstart", drag);
    });
    
    axieDiv.parentElement.parentElement.addEventListener("drop", drop);
    axieDiv.parentElement.parentElement.addEventListener("dragover", allowDrop);
    axieDiv.parentElement.parentElement.addEventListener("dragleave", dragLeave); 

    divDmgContainer.append(clearLink);
    divDmgContainer.append(damageBonusDiv);
    divDmgContainer.append(table);

    divDmgWapper.appendChild(divDmgHeader);
    divDmgWapper.appendChild(divDmgContainer);


    axieDiv.parentElement.parentElement.prepend(divDmgWapper);

}

function getElementsByXPath(xpath, parent)
{
    let results = [];
    let query = document.evaluate(xpath, parent || document,
        null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (let i = 0, length = query.snapshotLength; i < length; ++i) {
        results.push(query.snapshotItem(i));
    }
    return results;
}

function allowDrop(ev) {
    //console.log("allowDrop")
    ev.preventDefault();
    ev.target.style.border = "1px solid green";
}

function drag(ev) {
    //console.log(ev.target.src)
    ev.dataTransfer.setData("text/plain", ev.target.src);
}

function dragLeave(ev) {
    //console.log(ev.target.src)
    ev.target.style.border = "";
}

function drop(ev) {
    ev.preventDefault();
    ev.target.style.border = "";
    
    var data = ev.dataTransfer.getData("text");
    
    addToAttackMoves(data);
}

function clearData(){
    attackMoves = [];
    renderMovesHtml();
}

function assumeDamageBonusCheckbox(){
    assumeDamageBonus = document.getElementById('damageBonusBox').checked;
    renderMovesHtml();
}

function getCritBonus(){
    if(critBonus == 0){
        let morale = 27; // lowest morale in game
        let moralIcon = 'M11.177 9.139c0 .132-.009.261-.023.39-.176 1.959-1.5 3.263-3.336 3.263-1.781 0-3.017-1.232-3.33-3.106a3.407 3.407 0 01-.046-.547l.012-.229c.043-.771.39-1.577.909-2.087l.363-.358.024.509c.012.236.128.458.337.642.107.094.365.195.676.195.161 0 .314-.028.442-.08a.596.596 0 00.397-.532c.023-.325-.107-.486-.272-.69-.184-.226-.413-.507-.534-1.13-.15-.778.287-1.514 1.23-2.073l.482-.285-.146.54a.995.995 0 00-.032.213c-.02.567.444 1.273 1.417 2.157 1.242 1.13 1.419 2.14 1.423 2.98l.007.228z';
        let svgs = document.getElementsByTagName('svg');
        for(var i = 0; i < svgs.length; i++) {
            if (svgs[i].innerHTML.includes(moralIcon)) {
                morale = svgs[i].nextElementSibling.innerHTML;
                //console.log(morale);
            }
        }
        critBonus = Math.sqrt(morale)*10+morale*0.4-18;
        //console.log(critBonus);
    }

    return critBonus
}


function addToAttackMoves(attackMoveUrl){
    if(!baseAxieType){
        //console.log("null baseAxieType");
        let baseAxieHtml = document.querySelector("div.flex.items-center.mt-4 > div");
        baseAxieType = baseAxieHtml.innerHTML.toLowerCase();
    }

    let attackMove = attackMoveUrl.substring(attackMoveUrl.lastIndexOf('/')+1);

    if(!axieJson[attackMove]){
        //console.log(attackMove);
        return;//attack move not not found in json
    }

    if(getOccurrence(attackMoves, attackMove) >= 2){
        return; //already two in the array which is the max
    }

    var removeTopMove = false;
    attackMoves.push(attackMove);
    if(attackMoves.length > 4){
        attackMoves = attackMoves.slice(1,5)
        var removeTopMove = true;
    }
    //console.log(attackMoves);
    renderMovesHtml();
    //renderAttackScore();
}

function getOccurrence(array, value) {
    return array.filter((v) => (v === value)).length;
}

function renderMovesHtml(){

    const dropArea = document.getElementById("damageTable");
        while(dropArea.rows.length > 1) {
        dropArea.deleteRow(1);
      }
    
    const numberOfMoves = attackMoves.length;
    
    let plantDmgTotal = 0;
    let birdDmgTotal = 0;
    let bugDmgTotal = 0;
    let engTotal = 0;
    attackMoves.forEach(move => {
        
        if(!axieJson[move]){
            var row = dropArea.insertRow();
            var cell0 = row.insertCell(0);
            cell0.innerHTML = move;
        }else {
        var row = dropArea.insertRow();
        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);
        var cell2 = row.insertCell(2);
        var cell3 = row.insertCell(3);
        var cell4 = row.insertCell(4);
        moveJson = axieJson[move];

        //apply combo bonus if 2 or more cards are played
        let comboBonus = numberOfMoves >=2 ? calcComboBonus(moveJson.damage, baseAxieType): 0;
        //15% bonus for moves if they are the same type as base axie body
        let sameTypeBonus = calcSameTypeBonus(moveJson.type, baseAxieType);
        //figure out damage bonus from card
        let dmgBonus = moveJson.hasOwnProperty('damageBonus') && assumeDamageBonus ? calcAssumeDamageBonus(moveJson.damageBonus,moveJson.name) : 1;

            //console.log(moveJson.hasOwnProperty('damageBonus') && assumeDamageBonus);
        let numberOfAttacks = calcNumberOfAttacks(moveJson.name);

        cell0.innerHTML = moveJson.name;

        var dmgVsPlant = calcDamage(moveJson.damage,calcAttackRPS(moveJson.type, "PRD"), sameTypeBonus, comboBonus,dmgBonus, numberOfAttacks);
        plantDmgTotal += dmgVsPlant;
        cell1.innerHTML = dmgVsPlant
        cell1.title = "Crit Dmg " + calcCritDamage(moveJson.damage,calcAttackRPS(moveJson.type, "PRD"), sameTypeBonus, comboBonus,dmgBonus, moveJson.name);

        var dmgVsBird = calcDamage(moveJson.damage,calcAttackRPS(moveJson.type, "ABD"), sameTypeBonus, comboBonus,dmgBonus, numberOfAttacks);
        birdDmgTotal += dmgVsBird;
        cell2.innerHTML = dmgVsBird
        cell2.title = "Crit Dmg " + calcCritDamage(moveJson.damage,calcAttackRPS(moveJson.type, "ABD"), sameTypeBonus, comboBonus,dmgBonus, moveJson.name);

        var dmgVsBug = calcDamage(moveJson.damage,calcAttackRPS(moveJson.type, "BBM"), sameTypeBonus, comboBonus,dmgBonus, numberOfAttacks);
        bugDmgTotal += dmgVsBug;
        cell3.innerHTML = dmgVsBug;
        cell3.title = "Crit Dmg " + calcCritDamage(moveJson.damage,calcAttackRPS(moveJson.type, "BBM"), sameTypeBonus, comboBonus,dmgBonus, moveJson.name);

        engTotal += moveJson.energy;
        cell4.innerHTML = moveJson.energy;
        }
    });

    var row = dropArea.insertRow();
    row.style.borderTop = "solid thin";
    var cell0 = row.insertCell(0);
    var cell1 = row.insertCell(1);
    var cell2 = row.insertCell(2);
    var cell3 = row.insertCell(3);
    var cell4 = row.insertCell(4);
    cell0.innerHTML = "<b>Total</b>"
    cell1.innerHTML = "<b>"+plantDmgTotal+"</b>"
    cell2.innerHTML = "<b>"+birdDmgTotal+"</b>"
    cell3.innerHTML = "<b>"+bugDmgTotal+"</b>"
    cell4.innerHTML = "<b>"+engTotal+"</b>"

}
function calcDamage(damage,attackRPS,typeBonus,combo,damageBonus,numberOfAttacks){
    //console.log("damage: "+damage+" damageBonus:" +damageBonus +" attackRPS:" + attackRPS +" typeBonus:" + typeBonus +" combo:" + combo +" numberOfAttacks:" + numberOfAttacks);
    if(damage == 0)
        return 0;
    else
        return Math.floor(damage * damageBonus * attackRPS * typeBonus + combo) * numberOfAttacks;
}

function calcCritDamage(damage,attackRPS,typeBonus,combo,damageBonus,cardName){
    var critBonusPercent = (getCritBonus()/100+1)
    //console.log(critBonusPercent)
    if(damage == 0){
        return 0;
    }
    else if (cardName === "Dual Blade"){ //ignore damage bonus as the bonus is a crit and crit bonus is fixed
        damageBonus = 1;
        critBonusPercent = 2;
    }
    else if (cardName ===  "Ronin"){ //ignore damage bonus as the bonus is a crit
        damageBonus = 1;
    }
   // console.log(cardName +" - "+ damage +"  *" + damageBonus +"*" + attackRPS +"*" + typeBonus +"*" + critBonusPercent +"+" + combo)
    return Math.floor(damage * damageBonus * attackRPS * typeBonus * critBonusPercent + combo) // seems to be off by 1 from what is displayed in the game
}


function calcAttackRPS(moveType,baseAxieType){
    if(plantReptileDusk.includes(moveType)){
        if(baseAxieType === "PRD"){
            return 1;
        }else if (baseAxieType === "ABD"){
            return 1.15;
        }else if (baseAxieType === "BBM"){
            return .85;
        }else{
            throw "base axie type " + baseAxieType + " is unknown";
        }
    }else if (aquaBirdDawn.includes(moveType)){
        if(baseAxieType === "PRD"){
            return .85;
        }else if (baseAxieType === "ABD"){
            return 1;
        }else if (baseAxieType === "BBM"){
            return 1.15;
        }else{
            throw "base axie type " + baseAxieType + " is unknown";
        }
    
    }else if (bugBeastMech.includes(moveType)){
        if(baseAxieType === "PRD"){
            return 1.15;
        }else if (baseAxieType === "ABD"){
            return .85;
        }else if (baseAxieType === "BBM"){
            return 1;
        }else{
            throw "base axie type " + baseAxieType + " is unknown";
        }
    }else{
        throw "Attack move type " + moveType + " is unknown";
    }
}

function calcAssumeDamageBonus(damageBonusAmt, cardName){
     if (cardName === 'Ronin') {
        return getCritBonus()/100 + 1
     } else {
        return damageBonusAmt;
     }

}

function calcComboBonus(damage,baseAxieType){
    //console.log(baseAxieType);
    //console.log(skillArray);
    skill = skillArray[baseAxieType];
    return (skill*0.55-12.5);
}

function calcNumberOfAttacks(moveName){
    if(moveName === "Furball"){
        return 3;
    }else if ((moveName === "Twin Tail" && attackMoves.length >= 2 ) || (moveName === "Tri Feather" && assumeDamageBonus )) {
        return 2;
    } else {
        return 1;
    }
}

function calcSameTypeBonus(moveType, baseAxieType){
    if (moveType === baseAxieType){
        return 1.1;
    } else if (specialClasses.includes(baseAxieType)){ //special classes get 7.5% bonus in of move in there type
        if(baseAxieType === dawn && aquaBirdDawn.includes(moveType) ){
            return 1.075;
        }else if (baseAxieType === dusk && plantReptileDusk.includes(moveType)){
            return 1.075;
        }else if (baseAxieType === mech && bugBeastMech.includes(moveType)){
            return 1.075;
        }else{
          return 1; 
        }
    } else{
        return 1;
    } 
}

var plant = "plant";
var reptile = "reptile";
var dusk = "dusk";
var aquatic = "aquatic";
var bird = "bird";
var dawn = "dawn";
var bug = "bug";
var beast = "beast";
var mech = "mech";

var plantReptileDusk = [plant,reptile,dusk];
var aquaBirdDawn = [aquatic,bird,dawn];
var bugBeastMech = [bug,beast,mech];

var specialClasses = [dusk,dawn,mech];

var skillArray = {reptile: 31, plant: 31, dusk: 27, bird: 35, bug: 35, dawn: 39, mech: 41, beast: 31, aquatic: 35};

var axieJson = {
    "aquatic-tail-04.png":{
        "name": "Nimo",
        "damage": 20,
        "shield": 0,
        "type": aquatic,
        "energy": 0        
    },  
    "aquatic-horn-12.png":{
        "name": "Shoal Star",
        "damage": 110,
        "shield": 10,
        "type": aquatic,
        "energy": 1           
    },
    "reptile-horn-08.png":{
        "name": "Scaly Spoon",
        "damage": 80,
        "shield": 50,
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
        "shield": 100,
        "type": bug,
        "energy": 1
    },
    "reptile-back-04.png":{
        "name": "Tri Spikes",
        "damage": 80,
        "shield": 50,
        "type": reptile,
        "energy": 1
    },
    "bug-horn-02.png":{
        "name": "Lagging",
        "damage": 30,
        "shield": 0,
        "type": bug,
        "energy": 0
    },
    "bird-tail-06.png":{
        "name": "The Last One",
        "damage": 150,
        "shield": 0,
        "type": bird,
        "energy": 1
    },
    "beast-mouth-08.png":{
        "name": "Axie Kiss",
        "damage": 100,
        "shield": 30,
        "type": beast,
        "energy": 1
    },
    "aquatic-back-10.png":{
        "name": "Anemone",
        "damage": 80,
        "shield": 35,
        "type": aquatic,
        "energy": 1
    },
    "bird-mouth-02.png":{
        "name": "Doubletalk",
        "damage": 60,
        "shield": 0,
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
    "bug-horn-08.png":{
        "name": "Pliers",
        "damage": 110,
        "shield": 30,
        "type": bug,
        "energy": 1,
        "damageBonus":1.3
    },
    "aquatic-mouth-04.png":{
        "name": "Catfish",
        "damage": 80,
        "shield": 30,
        "type": aquatic,
        "energy": 1
    },
    "beast-horn-12.png":{
        "name": "Acro",
        "damage": 100,
        "shield": 50,
        "type": beast,
        "energy": 1
    },
    "reptile-tail-10.png":{
        "name": "Gila",
        "damage": 100,
        "shield": 55,
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
        "damage": 90,
        "shield": 20,
        "type": reptile,
        "energy": 1
    },
    "reptile-tail-08.png":{
        "name": "Snake Jar",
        "damage": 80,
        "shield": 10,
        "type": reptile,
        "energy": 1
    },
    "beast-horn-10.png":{
        "name": "Dual Blade",
        "damage": 130,
        "shield": 20,
        "type": beast,
        "energy": 1,
        "damageBonus":2
    },
    "beast-mouth-02.png":{
        "name": "Nut Cracker",
        "damage": 105,
        "shield": 30,
        "type": beast,
        "energy": 1,
        "damageBonus":1.2
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
        "damage": 75,
        "shield": 50,
        "type": reptile,
        "energy": 1
    },
    "plant-tail-08.png":{
        "name": "Yam",
        "damage": 20,
        "shield": 20,
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
        "shield": 40,
        "type": plant,
        "energy": 2
    },
    "bird-tail-02.png":{
        "name": "Swallow",
        "damage": 110,
        "shield": 20,
        "type": bird,
        "energy": 1,
        "damageBonus":1.2,
        "bonusType":"order-first"
    },
    "bug-back-02.png":{
        "name": "Snail Shell",
        "damage": 40,
        "shield": 60,
        "type": bug,
        "energy": 1
    },
    "reptile-back-12.png":{
        "name": "Croc",
        "damage": 85,
        "shield": 60,
        "type": reptile,
        "energy": 1
    },
    "beast-tail-10.png":{
        "name": "Nut Cracker",
        "damage": 105,
        "shield": 30,
        "type": beast,
        "energy": 1,
        "damageBonus":1.2,
        "bonusType": "combo"
    },
    "bird-horn-06.png":{
        "name": "Trump",
        "damage": 120,
        "shield": 30,
        "type": bird,
        "energy": 1,
        "damageBonus":1.2,
        "bonusType": "chain"
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
        "damage": 80,
        "shield": 40,
        "type": bug,
        "energy": 1
    },
    "beast-back-04.png":{
        "name": "Hero",
        "damage": 60,
        "shield": 0,
        "type": beast,
        "energy": 0
    },
    "bug-horn-06.png":{
        "name": "Caterpillars",
        "damage": 100,
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
        "name": "Eggshell",
        "damage": 120,
        "shield": 0,
        "type": bird,
        "energy": 1
    },
    "aquatic-tail-06.png":{
        "name": "Tadpole",
        "damage": 110,
        "shield": 40,
        "type": aquatic,
        "energy": 1
    },
    "bug-tail-06.png":{
        "name": "Fish Snack",
        "damage": 60,
        "shield": 90,
        "type": bug,
        "energy": 1
    },
    "bird-horn-04.png":{
        "name": "Cuckoo",
        "damage": 0,
        "shield": 30,
        "type": bird,
        "energy": 0
    },
    "reptile-mouth-04.png":{
        "name": "Kotaro",
        "damage": 85,
        "shield": 30,
        "type": reptile,
        "energy": 1
    },
    "plant-horn-02.png":{
        "name": "Bamboo Shoot",
        "damage": 80,
        "shield": 70,
        "type": plant,
        "energy": 1,
        "damageBonus":1.2
    },
    "bug-tail-10.png":{
        "name": "Pupae",
        "damage": 70,
        "shield": 0,
        "type": bug,
        "energy": 0,
        "damageBonus":2
    },
    "plant-back-08.png":{
        "name": "Watering Can",
        "damage": 45,
        "shield": 80,
        "type": plant,
        "energy": 1
    },
    "plant-mouth-02.png":{
        "name": "Serious",
        "damage": 30,
        "shield": 30,
        "type": plant,
        "energy": 1
    },
    "plant-horn-12.png":{
        "name": "Watermelon",
        "damage": 30,
        "shield": 50,
        "type": plant,
        "energy": 1
    },
    "beast-tail-02.png":{
        "name": "Cottontail",
        "damage": 0,
        "shield": 30,
        "type": beast,
        "energy": 0
    },
    "beast-horn-02.png":{
        "name": "Little Branch",
        "damage": 125,
        "shield": 25,
        "type": beast,
        "energy": 1
    },
    "beast-back-02.png":{
        "name": "Ronin",
        "damage": 80,
        "shield": 0,
        "type": beast,
        "energy": 1,
        "damageBonus":2
    },
    "plant-horn-10.png":{
        "name": "Cactus",
        "damage": 115,
        "shield": 20,
        "type": plant,
        "energy": 1,
        "damageBonus":1.2
    },
    "reptile-tail-06.png":{
        "name": "Tiny Dino",
        "damage": 80,
        "shield": 40,
        "type": reptile,
        "energy": 1,
        "damageBonus":1.5
    },
    "beast-back-06.png":{
        "name": "Jaguar",
        "damage": 120,
        "shield": 35,
        "type": beast,
        "energy": 1
    },
    "plant-tail-02.png":{
        "name": "Carrot",
        "damage": 70,
        "shield": 40,
        "type": plant,
        "energy": 1
    },
    "reptile-horn-02.png":{
        "name": "Unko",
        "damage": 30,
        "shield": 100,
        "type": reptile,
        "energy": 1
    },
    "aquatic-tail-10.png":{
        "name": "Navaga",
        "damage": 100,
        "shield": 40,
        "type": aquatic,
        "energy": 1,
        "damageBonus":1.2
    },
    "plant-mouth-08.png":{
        "name": "Herbivore",
        "damage": 75,
        "shield": 75,
        "type": plant,
        "energy": 1
    },
    "beast-back-08.png":{
        "name": "Risky Beast",
        "damage": 125,
        "shield": 25,
        "type": beast,
        "energy": 1,
        "damageBonus":1.5
    },
    "bug-mouth-10.png":{
        "name": "Square Teeth",
        "damage": 30,
        "shield": 0,
        "type": bug,
        "energy": 0,
        "damageBonus":2,
        "bonusType":"comboed"
    },
    "bug-tail-08.png":{
        "name": "Gravel Ant",
        "damage": 30,
        "shield": 30,
        "type": bug,
        "energy": 1
    },
    "reptile-back-02.png":{
        "name": "Bone Sail",
        "damage": 80,
        "shield": 80,
        "type": reptile,
        "energy": 1
    },
    "plant-horn-04.png":{
        "name": "Beech",
        "damage": 105,
        "shield": 40,
        "type": plant,
        "energy": 1,
        "damageBonus":1.2
    },
    "plant-tail-12.png":{
        "name": "Hot Butt",
        "damage": 90,
        "shield": 70,
        "type": plant,
        "energy": 1
    },
    "bug-back-04.png":{
        "name": "Garish Worm",
        "damage": 90,
        "shield": 40,
        "type": bug,
        "energy": 1
    },
    "bug-back-06.png":{
        "name": "Buzz Buzz",
        "damage": 110,
        "shield": 40,
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
        "damage": 105,
        "shield": 20,
        "type": aquatic,
        "energy": 1
    },
    "aquatic-horn-08.png":{
        "name": "Anemone",
        "damage": 80,
        "shield": 35,
        "type": aquatic,
        "energy": 1
    },
    "aquatic-back-02.png":{
        "name": "Hermit",
        "damage": 0,
        "shield": 115,
        "type": aquatic,
        "energy": 1
    },
    "aquatic-horn-02.png":{
        "name": "Babylonia",
        "damage": 100,
        "shield": 50,
        "type": aquatic,
        "energy": 1,
        "damageBonus":1.3
    },
    "plant-tail-10.png":{
        "name": "Potato Leaf",
        "damage": 70,
        "shield": 80,
        "type": plant,
        "energy": 1
    },
    "bird-back-12.png":{
        "name": "Tri-Feather",
        "damage": 40,
        "shield": 10,
        "type": bird,
        "energy": 0
    },
    "plant-mouth-10.png":{
        "name": "Silence Whisper",
        "damage": 0,
        "shield": 40,
        "type": plant,
        "energy": 1
    },
    "reptile-horn-06.png":{
        "name": "Cerastes",
        "damage": 90,
        "shield": 60,
        "type": reptile,
        "energy": 1,
        "damageBonus":1.3
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
        "damage": 80,
        "shield": 50,
        "type": bug,
        "energy": 1
    },
    "bug-mouth-04.png":{
        "name": "Pincer",
        "damage": 20,
        "shield": 0,
        "type": bug,
        "energy": 1
    },
    "aquatic-tail-08.png":{
        "name": "Ranchu",
        "damage": 120,
        "shield": 30,
        "type": aquatic,
        "energy": 1
    },
    "bug-back-08.png":{
        "name": "Sandal",
        "damage": 110,
        "shield": 50,
        "type": bug,
        "energy": 1,
        "damageBonus":1.5
    },
    "plant-back-12.png":{
        "name": "Pumpkin",
        "damage": 0,
        "shield": 115,
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
        "shield": 50,
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
        "shield": 20,
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
        "damage": 80,
        "shield": 30,
        "type": beast,
        "energy": 1
    },
    "aquatic-mouth-10.png":{
        "name": "Piranha",
        "damage": 120,
        "shield": 30,
        "type": aquatic,
        "energy": 1
    },
    "bird-back-02.png":{
        "name": "Balloon",
        "damage": 40,
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
        "name": "Grandma's Fan",
        "damage": 120,
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
        "damage": 105,
        "shield": 20,
        "type": aquatic,
        "energy": 1
    },
    "reptile-tail-02.png":{
        "name": "Wall Gecko",
        "damage": 90,
        "shield": 20,
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
        "damage": 60,
        "shield": 60,
        "type": plant,
        "energy": 1
    },
    "bug-horn-04.png":{
        "name": "Antenna",
        "damage": 80,
        "shield": 50,
        "type": bug,
        "energy": 1
    },
    "bird-back-04.png":{
        "name": "Cupid",
        "damage": 120,
        "shield": 20,
        "type": bird,
        "energy": 1
    },
    "beast-tail-06.png":{
        "name": "Shiba",
        "damage": 120,
        "shield": 30,
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
        "damage": 25,
        "shield": 0,
        "type": bird,
        "energy": 1
    },
    "bug-back-10.png":{
        "name": "Scarab",
        "damage": 110,
        "shield": 40,
        "type": bug,
        "energy": 1
    },
    "aquatic-tail-02.png":{
        "name": "Koi",
        "damage": 110,
        "shield": 30,
        "type": aquatic,
        "energy": 1
    },
    "aquatic-mouth-02.png":{
        "name": "Lam",
        "damage": 110,
        "shield": 40,
        "type": aquatic,
        "energy": 1,
        "damageBonus":1.2
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
        "shield": 80,
        "type": reptile,
        "energy": 1
    },
    "plant-back-06.png":{
        "name": "Bidens",
        "damage": 0,
        "shield": 50,
        "type": plant,
        "energy": 0
    },
    "bird-tail-12.png":{
        "name": "Post Fight",
        "damage": 110,
        "shield": 0,
        "type": bird,
        "energy": 0
    },
    "bug-back-12.png":{
        "name": "Spiky Wing",
        "damage": 10,
        "shield": 30,
        "type": bug,
        "energy": 0
    },
    "bird-horn-12.png":{
        "name": "Feather Spear",
        "damage": 110,
        "shield": 50,
        "type": bird,
        "energy": 1,
        "damageBonus":1.2,
        "bonusType":"chain"
    },
    "beast-back-10.png":{
        "name": "Timber",
        "damage": 80,
        "shield": 80,
        "type": beast,
        "energy": 1
    },
    "bird-back-10.png":{
        "name": "Kingfisher",
        "damage": 130,
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
        "name": "Pocky",
        "damage": 125,
        "shield": 20,
        "type": beast,
        "energy": 1
    },
    "beast-back-12.png":{
        "name": "Furball",
        "damage": 40,
        "shield": 30,
        "type": beast,
        "energy": 1
    },
    "reptile-back-10.png":{
        "name": "Red Ear",
        "damage": 10,
        "shield": 145,
        "type": reptile,
        "energy": 1
    },
    "reptile-mouth-08.png":{
        "name": "Razor Bite",
        "damage": 95,
        "shield": 55,
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
        "damage": 110,
        "shield": 50,
        "type": reptile,
        "energy": 1,
        "damageBonus":1.2,
        "bonusType": "chain"
    },
    "beast-tail-04.png":{
        "name": "Rice",
        "damage": 80,
        "shield": 10,
        "type": beast,
        "energy": 1
    },
    "reptile-tail-12.png":{
        "name": "Grass Snake",
        "damage": 20,
        "shield": 30,
        "type": reptile,
        "energy": 1
    },
    "beast-horn-06.png":{
        "name": "Merry",
        "damage": 75,
        "shield": 85,
        "type": beast,
        "energy": 1
    },
    "bug-mouth-08.png":{
        "name": "Cute Bunny",
        "damage": 100,
        "shield": 35,
        "type": bug,
        "energy": 1
    },
    "bug-tail-04.png":{
        "name": "Twin Tail",
        "damage": 40,
        "shield": 0,
        "type": bug,
        "energy": 0
    },
    "bug-tail-12.png":{
        "name": "Thorny Caterpillar",
        "damage": 100,
        "shield": 30,
        "type": bug,
        "energy": 1,
        "damageBonus":1.3
    },
}
