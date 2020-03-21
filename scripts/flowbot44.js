var attackMoves = [];

var baseAxieType = "";

function clearData(){
    attackMoves = [];
    renderMovesHtml();
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

function addToAttackMoves(attackMoveUrl){
    
    let attackMove = attackMoveUrl.substring(attackMoveUrl.lastIndexOf('/')+1);

    if(!axieJson[attackMove]){
        console.log(attackMove);
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

function getBaseAxieType(){
    const axieTypeHtml= document.querySelector("div.flex.items-center.mt-4 > div");
   // console.log(axieTypeHtml.innerHTML);
    return axieTypeHtml.innerHTML.toLowerCase();
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
        comboBonus = numberOfMoves >=2 ? calcComboBonus(moveJson.damage, baseAxieType): 0;
        //15% bonus for moves if they are the same type as base axie body
        sameTypeBonus = moveJson.type === baseAxieType ? 1.15 : 1
        
        cell0.innerHTML = moveJson.name;

        var dmgVsPlant = Math.ceil(moveJson.damage * calcAttackRPS(moveJson.type, "PRD") * sameTypeBonus + comboBonus);
        plantDmgTotal += dmgVsPlant;
        cell1.innerHTML = dmgVsPlant

        var dmgVsBird = Math.ceil(moveJson.damage * calcAttackRPS(moveJson.type, "ABD") * sameTypeBonus + comboBonus);
        birdDmgTotal += dmgVsBird;
        cell2.innerHTML = dmgVsBird
        
        var dmgVsBug = Math.ceil(moveJson.damage * calcAttackRPS(moveJson.type, "BBM") * sameTypeBonus + comboBonus);
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
