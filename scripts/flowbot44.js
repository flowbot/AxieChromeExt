var attackMoves = [];

var baseAxieType = "";

var assumeDamageBonus = false;

function clearData(){
    attackMoves = [];
    renderMovesHtml();
}

function assumeDamageBonusCheckbox(){
    assumeDamageBonus = document.getElementById('damageBonusBox').checked;
    clearData();
}


function addToAttackMoves(attackMoveUrl){
    
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
        let sameTypeBonus = moveJson.type === baseAxieType ? 1.15 : 1
        //figure out damage bonus from card
        let dmgBonus = moveJson.hasOwnProperty('damageBonus') && assumeDamageBonus ? moveJson.damageBonus : 1;
            //console.log(moveJson.hasOwnProperty('damageBonus') && assumeDamageBonus);
        let numberOfAttacks = calcNumberOfAttacks(moveJson.name);

        cell0.innerHTML = moveJson.name;

        var dmgVsPlant = calcDamage(moveJson.damage,calcAttackRPS(moveJson.type, "PRD"), sameTypeBonus, comboBonus,dmgBonus, numberOfAttacks);
        plantDmgTotal += dmgVsPlant;
        cell1.innerHTML = dmgVsPlant

        var dmgVsBird = calcDamage(moveJson.damage,calcAttackRPS(moveJson.type, "ABD"), sameTypeBonus, comboBonus,dmgBonus, numberOfAttacks);
        birdDmgTotal += dmgVsBird;
        cell2.innerHTML = dmgVsBird
        
        var dmgVsBug = calcDamage(moveJson.damage,calcAttackRPS(moveJson.type, "BBM"), sameTypeBonus, comboBonus,dmgBonus, numberOfAttacks);
        bugDmgTotal += dmgVsBug;
        cell3.innerHTML = dmgVsBug;

        engTotal += moveJson.energy;
        cell4.innerHTML = moveJson.energy;
        }
    });

    var row = dropArea.insertRow();
    row.className = "total";
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

    return Math.ceil(damage * damageBonus * attackRPS * typeBonus + combo) * numberOfAttacks;
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

function calcComboBonus(damage,baseAxieType){
    //console.log(baseAxieType);
    //console.log(skillArray);
    skill = skillArray[baseAxieType];
    return (damage * skill / 500);
}

function calcNumberOfAttacks(moveName){
    if(moveName === "Furball"){
        return 3;
    }else if ((moveName === "Twin Tail" || moveName === "Tri Feather") && assumeDamageBonus ) {
        return 2;
    } else {
        return 1;
    }

}
