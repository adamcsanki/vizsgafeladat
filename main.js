'use strict';
window.addEventListener('load', Window_Load_Handler, false);

function Window_Load_Handler() {
    LoadAdatsorokFromDatastore();
    drawTable();

    fx();
    drawAtlagTable();

}

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
            var atlag = sum / temp.length;
            result.push({ Tanulo: nevek[i], Tantargy: tantargyak[j], Atlag: atlag });
            //console.log(temp);
        }
    }
    console.log(result);
    return result;
}
 var felevi = fx();

function drawAtlagTable() {
    var nodeTBody = document.querySelector('#pnlAtlag TABLE > TBODY');
    nodeTBody.innerText = '';
    for (var i = 0; i < felevi.length; i++) {

        var resultTR = document.createElement('TR');
        var TD1 = document.createElement('TD');
        var TD2 = document.createElement('TD');
        var TD3 = document.createElement('TD');
        TD1.innerText = felevi[i].Tanulo;
        TD2.innerText = felevi[i].Tantargy;
        TD3.innerText = felevi[i].Atlag;
        resultTR.appendChild(TD1);
        resultTR.appendChild(TD2);
        resultTR.appendChild(TD3);
        nodeTBody.appendChild(resultTR);
        


    }
    return resultTR;
}



