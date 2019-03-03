'use strict'

window.addEventListener('load', Window_Load_Handler, false);

function Window_Load_Handler() {
    LoadAdatsorokFromDatastore();
    drawTable();
    drawAtlagTable(Student1());

    fx();
    
    var nodeClickFilterButton = document.getElementById('szures');
    nodeClickFilterButton.addEventListener('click', StudentFilter_Click_Handler, false);

    var nodeClickGenerateButton = document.getElementById('printGenerator');
    nodeClickGenerateButton.addEventListener('click', PrintTable_Click_Handler, false);

    var nodeClickPrintButton = document.getElementById('printGrades');
    nodeClickPrintButton.addEventListener('click', PrintGrades_Click_Handler, false);
}

function StudentFilter_Click_Handler() {
    var filterSelect = document.getElementById('selectTanulo');
    var kategoria = parseInt(filterSelect.value);
    var filterText = fx().Tanulo;

    var filteredStudent = ChooseFilter(kategoria, filterText);
    var nodeTBodyAtlag = document.getElementById('pnlAtlag');
    drawAtlagTable(filteredStudent);
}

function PrintTable_Click_Handler() {
    var nodeClickGenerateButton = document.getElementById('printTable');
    nodeClickGenerateButton.innerText = '';
    drawPrintTable(Student1());
    drawPrintTable(Student2());
    drawPrintTable(Student3());
    drawPrintTable(Student4());
}

function PrintGrades_Click_Handler() {
    window.print();

}

//****************************************eredmények kirajzolása táblázatba***************************************
function drawTable() {
    var nodeTBody = document.querySelector('#pnlTable TABLE > TBODY');
    nodeTBody.innerText = '';
    for (var i = 0; i < dataStore.length; i++) {

        var resultTR = document.createElement('TR');
        var TD1 = document.createElement('TD');
        var TD2 = document.createElement('TD');
        var TD3 = document.createElement('TD');
        var TD4 = document.createElement('TD');
        TD1.innerText = dataStore[i].Tanulo;
        TD2.innerText = dataStore[i].Tantargy;
        TD3.innerText = dataStore[i].Erdemjegy;
        TD4.innerText = dataStore[i].Datum;
        resultTR.appendChild(TD1);
        resultTR.appendChild(TD2);
        resultTR.appendChild(TD3);
        resultTR.appendChild(TD4);
        nodeTBody.appendChild(resultTR);
    }
    return resultTR;
}

//*************************************tanulók átlagának kirajzolása************************************************** 
function drawAtlagTable(studentObjektum) {
    var nodeTBody = document.querySelector('#pnlAtlag TABLE > TBODY');
    nodeTBody.innerText = '';
    for (var i = 0; i < studentObjektum.length; i++) {
        var resultTR = document.createElement('TR');
        var TD1 = document.createElement('TD');
        var TD2 = document.createElement('TD');
        TD1.innerText = studentObjektum[i].Tantargy;
        TD2.innerText = studentObjektum[i].Atlag.toFixed(1);
        resultTR.appendChild(TD1);
        resultTR.appendChild(TD2);
        nodeTBody.appendChild(resultTR);
    }
    return resultTR;
}

//**************************************félévi értesítő kirajzolása***************************************************
function drawPrintTable(studentObjektum) {
    var nodePrintSection = document.getElementById('printTable');
    var resultDIV = document.createElement('DIV');
    var resultTable = document.createElement('TABLE');
    var resultTHead = document.createElement('THEAD');
    var resultTRinTHead = document.createElement('TR');
    var resultTR2inTHead = document.createElement('TR');
    var resultTHinTHEAD = document.createElement('TH');
    var resultTH2inTHead = document.createElement('TH');
    var resultTH3inTHead = document.createElement('TH');
    var resultTFoot = document.createElement('TFOOT');
    var resultTBody = document.createElement('TBODY');
    for (var i = 0; i < studentObjektum.length; i++) {
        var erdemjegy = parseInt(studentObjektum[i].Atlag.toFixed(0));
        var resultTR = document.createElement('TR');
        var resultTD1 = document.createElement('TD');
        var resultTD2 = document.createElement('TD');
        resultTD1.innerText = studentObjektum[i].Tantargy;
        resultTD2.innerHTML = TanuloSzovegesErtekelese(erdemjegy);
        resultTHinTHEAD.innerText = studentObjektum[i].Tanulo;
        resultTH2inTHead.innerText = 'Tantárgy';
        resultTH3inTHead.innerText = 'Átlag';
        resultTable.setAttribute('border', 1)
        resultDIV.setAttribute('class', 'pageBreak');
        resultTHinTHEAD.setAttribute('colspan', 2);
        resultTR.appendChild(resultTD1);
        resultTR.appendChild(resultTD2);
        resultTRinTHead.appendChild(resultTHinTHEAD);
        resultTR2inTHead.appendChild(resultTH2inTHead);
        resultTR2inTHead.appendChild(resultTH3inTHead);
        resultTBody.appendChild(resultTR);
        resultTHead.appendChild(resultTRinTHead);
        resultTHead.appendChild(resultTR2inTHead);
        resultTable.appendChild(resultTHead);
        resultTable.appendChild(resultTFoot);
        resultTable.appendChild(resultTBody);
        nodePrintSection.appendChild(resultTable);
        nodePrintSection.appendChild(resultDIV);
    }
}
