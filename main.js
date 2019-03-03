'use strict';
window.addEventListener('load', Window_Load_Handler, false);

function Window_Load_Handler() {
    LoadAdatsorokFromDatastore();
    drawTable();
    drawAtlagTable(Student1());

    fx();
    //drawAtlagTable(fx());

    var nodeClickFilterButton = document.getElementById('szures');
    nodeClickFilterButton.addEventListener('click', StudentFilter_Click_Handler, false);

    var nodeClickGenerateButton = document.getElementById('printGenerator');
    nodeClickGenerateButton.addEventListener('click', PrintTable_Click_Handler, false);

    var nodeClickPrintButton = document.getElementById('printGrades');
    nodeClickPrintButton.addEventListener('click', PrintGrades_Click_Handler, false);

}

/*var picsagomb = document.getElementById('lofasz');
picsagomb.addEventListener('click', Button_Click_Handler, false);

function Button_Click_Handler()
{
   fx();
   drawAtlagTable(); 
}*/

function AdatSor(Tanulo, Tantargy, Erdemjegy, Datum) {
    this.Tanulo = Tanulo;
    this.Tantargy = Tantargy;
    this.Erdemjegy = Erdemjegy;
    this.Datum = Datum;
}

var nevek = ['A Péter', 'O Rafael', 'Cs Ádám', 'P Imre'];
var tantargyak = ['Biológia', 'Ének', 'Fizika', 'Földrajz', 'Matematika', 'Rajz', 'Történelem'];
var jegyek = [5, 4, 3, 2, 1];
var dataStore = [];
function nev_Generator() {
    var randomSzam = Math.floor(Math.random() * nevek.length)
    return nevek[randomSzam];
}
console.log(nev_Generator());

function nev_tantargy_Generator() {
    var randomSzam = Math.floor(Math.random() * tantargyak.length);
    return tantargyak[randomSzam];
}

console.log(nev_tantargy_Generator());
// jegyek generálása
function jegy_Generator() {
    var randomSzam = Math.floor(Math.random() * jegyek.length);
    return jegyek[randomSzam];
}

console.log(jegy_Generator());

function randomDate(date1, date2) {
    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
    var date1 = date1 || '01-01-1970';
    var date2 = date2 || new Date().toLocaleDateString();
    date1 = new Date(date1).getTime();
    date2 = new Date(date2).getTime();
    if (date1 > date2) {
        return new Date(getRandomArbitrary(date2, date1)).toLocaleDateString();
    } else {
        return new Date(getRandomArbitrary(date1, date2)).toLocaleDateString();

    }
}
console.log(randomDate('09-01-2018', '01-31-2019'));

function dataStoreGenerator() {
    for (var i = 0; i < 101; i++) {
        dataStore.push(new AdatSor(nev_Generator(), nev_tantargy_Generator(), jegy_Generator(), randomDate('09-01-2018', '01-31-2019')));
    }

}
function LoadAdatsorokFromDatastore() {
    var temp = JSON.parse(jsonDataStore);
    console.log(temp);
    dataStore = temp.map(AnonymousAdatSorToAdatSor);
    console.log(dataStore);
}

function AnonymousAdatSorToAdatSor(item, index, originalArray) {
    return new AdatSor(
        item.Tanulo,
        item.Tantargy,
        item.Erdemjegy,
        item.Datum
    );
}
/*function drawDatastore()
{
    var nodeDatastorePanel = document.querySelector('#pnlDatastore PRE');
    nodeDatastorePanel.innerText = JSON.stringify(dataStore, null, 4)
}*/

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
/*dataStoreGenerator();
console.log(JSON.stringify(dataStore));*/

function fx() {
    var result = [];
  
    for (var i = 0; i < nevek.length; i++) {
        for (var j = 0; j < tantargyak.length; j++) {
            var temp = dataStore.filter((item) => { return item.Tanulo === nevek[i] && item.Tantargy === tantargyak[j] });
            var sum = 0;
            for (var k = 0; k < temp.length; k++) {
                sum += temp[k].Erdemjegy;
            }
            
            
            
            //var atlag = sum / kabbe;
            result.push({ Tanulo: nevek[i], Tantargy: tantargyak[j], Atlag: sum/temp.length });
            //console.log(temp);
        }
    }
    //console.log(JSON.stringify(result));
    //console.log(fx());
    return (result);
}


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

function Student1 ()
{
    var result = [];
    for (var i = 0; i< fx().length; i++)
    {
        if (fx()[i].Tanulo.indexOf('A Péter')>-1)
        {
            result.push(fx()[i]);
        }
    }
    return result;
}
function Student2 ()
{
    var result = [];
    for (var i = 0; i< fx().length; i++)
    {
        if (fx()[i].Tanulo.indexOf('O Rafael')>-1)
        {
            result.push(fx()[i]);
        }
    }
    return result;
}
function Student3 ()
{
    var result = [];
    for (var i = 0; i< fx().length; i++)
    {
        if (fx()[i].Tanulo.indexOf('Cs Ádám')>-1)
        {
            result.push(fx()[i]);
        }
    }
    return result;
}
function Student4 ()
{
    var result = [];
    for (var i = 0; i< fx().length; i++)
    {
        if (fx()[i].Tanulo.indexOf('P Imre')>-1)
        {
            result.push(fx()[i]);
        }
    }
    
    return result;
}

function ChooseFilter(number)
{
    /*if (number == 1)
    {
        var chosenFilter = WholeClassFilter();
    }*/
    if (number ==2)
    {
        var chosenFilter = Student1();
    }
    else if (number == 3)
    {
        var chosenFilter = Student2();
    }
    else if (number == 4)
    {
        var chosenFilter = Student3();
    }
    else if (number == 5)
    {
        var chosenFilter = Student4();
    }
    return chosenFilter;
}  

function StudentFilter_Click_Handler()
{
    var filterSelect = document.getElementById('selectTanulo');
    var kategoria = parseInt(filterSelect.value);
    var filterText = fx().Tanulo; 
     
    var filteredStudent = ChooseFilter(kategoria, filterText);
    var nodeTBodyAtlag = document.getElementById('pnlAtlag');
    drawAtlagTable(filteredStudent);

}

function drawPrintTable(studentObjektum)
{
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
    for (var i = 0; i<studentObjektum.length;i++)
    {
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

function TanuloSzovegesErtekelese(erdemjegy)
{
    var SzovegesErtekeles;

    switch(erdemjegy)
    {
        case 1:
        SzovegesErtekeles='Elégtelen (1)';
        break;
        case 2:
        SzovegesErtekeles='Elégséges (2)';
        break;
        case 3:
        SzovegesErtekeles='Közepes (3)';
        break;
        case 4:
        SzovegesErtekeles='Jó (4)';
        break;
        case 5:
        SzovegesErtekeles='Jeles (5)';
        break;
        
    }
    return SzovegesErtekeles;
}

function PrintTable_Click_Handler()
{
    var nodeClickGenerateButton = document.getElementById('printTable');
    nodeClickGenerateButton.innerText = '';
    drawPrintTable(Student1());
    drawPrintTable(Student2());
    drawPrintTable(Student3());
    drawPrintTable(Student4());
}

function PrintGrades_Click_Handler()
{
    window.print();

}



/*function TanuloFilter_Change_Handler()
{
    var filterSelect = document.getElementById('selectTanulo');
    var filterValue = parseInt(filterSelect.value);
    var filterDone = ChooseFilter(filterValue);
    drawAtlagTable(filterDone);
}*/


