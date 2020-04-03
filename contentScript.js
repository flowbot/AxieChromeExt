loadDragDrop();

async function loadDragDrop(){
   
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
     
    baseAxieType = baseAxieHtml.innerHTML.toLowerCase();
    
    attackMoves = [];// clear attack moves

    const axieDiv = document.querySelector("canvas");

    const divDmgHeader = document.createElement("div");
    divDmgHeader.className = 'font-bold text-20 leading-24 text-white mb-12';
    divDmgHeader.innerText = 'Damage'
    const divDmgContainer = document.createElement("div");
    divDmgContainer.className = "damageDiv rounded-12 border border-gray-3 px-16 py-16 bg-gray-4 overflow-hidden flex flex-wrap";
    
    const table = document.createElement("table");
    table.className = "damageTable";
    table.id = "damageTable";
    var header = table.createTHead();
    var row = header.insertRow();
    var cell0 = row.insertCell(0);
    var cell1 = row.insertCell(1);
    var cell2 = row.insertCell(2);
    var cell3 = row.insertCell(3);
    var cell4 = row.insertCell(4);
    cell0.innerHTML = "Move"
    cell0.className = "header first"
    cell1.innerHTML = "Plant<br>Reptile<br>Dawn"
    cell1.className = "header"
    cell2.innerHTML = "Bird<br>Aquatic<br>Dusk"
    cell2.className = "header"
    cell3.innerHTML = "Bug<br>Beast<br>Mech"
    cell3.className = "header"
    cell4.innerHTML = "Eng"
    cell4.className = "header"

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
    damageBonusDiv.className = "damageBonusDiv"; 
    damageBonusDiv.innerHTML = 'Assume Damage Bonuses:';
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

    axieDiv.parentElement.parentElement.parentElement.append(divDmgHeader);
    axieDiv.parentElement.parentElement.parentElement.append(divDmgContainer);
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