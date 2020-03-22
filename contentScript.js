loadDragDrop();

async function loadDragDrop(){
   
    while(!document.querySelector("canvas")) {
        await new Promise(r => setTimeout(r, 500));
    }

    if(document.getElementById("damageTable")){
        return; //stop if already loaded
    }

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
    clearLink.addEventListener('click', function() {
        clearData();
    });
    
    let moveImgs = getElementsByXPath('//*[@id="__next"]/div[4]/div/div[2]/div/div[2]/div/div[2]/img');
    //console.log(moveImgs);
    moveImgs.forEach(img => {
        img.setAttribute("draggable", "true");
        img.addEventListener("dragstart",drag);
    });
    
    axieDiv.parentElement.parentElement.addEventListener("drop", drop);
    axieDiv.parentElement.parentElement.addEventListener("dragover", allowDrop);
    axieDiv.parentElement.parentElement.addEventListener("dragleave", dragLeave); 

    baseAxieType = getBaseAxieType();

    divDmgContainer.append(clearLink);
    divDmgContainer.append(table);

    axieDiv.parentElement.parentElement.parentElement.append(divDmgHeader);
    axieDiv.parentElement.parentElement.parentElement.append(divDmgContainer);
}