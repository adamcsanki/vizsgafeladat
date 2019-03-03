'use strict';

function AdatSor(Tanulo, Tantargy, Erdemjegy, Datum) {
    this.Tanulo = Tanulo;
    this.Tantargy = Tantargy;
    this.Erdemjegy = Erdemjegy;
    this.Datum = Datum;
}

var nevek = ['A. Péter', 'O. Rafael', 'Cs. Ádám', 'P. Imre'];
var tantargyak = ['Biológia', 'Ének', 'Fizika', 'Földrajz', 'Matematika', 'Rajz', 'Történelem'];
var jegyek = [5, 4, 3, 2, 1];
var dataStore = [];

function nev_Generator() {
    var randomSzam = Math.floor(Math.random() * nevek.length)
    return nevek[randomSzam];
}


function nev_tantargy_Generator() {
    var randomSzam = Math.floor(Math.random() * tantargyak.length);
    return tantargyak[randomSzam];
}


function jegy_Generator() {
    var randomSzam = Math.floor(Math.random() * jegyek.length);
    return jegyek[randomSzam];
}


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


function dataStoreGenerator() {
    for (var i = 0; i < 200; i++) {
        dataStore.push(new AdatSor(nev_Generator(), nev_tantargy_Generator(), jegy_Generator(), randomDate('09-01-2018', '01-31-2019')));
    }
    
}

//*********************************************************** */DATA generálása console-ra***************************************************************
/*dataStoreGenerator();
console.log(JSON.stringify(dataStore));*/


function LoadAdatsorokFromDatastore() {
    var temp = JSON.parse(jsonDataStore);
    //console.log(temp);
    dataStore = temp.map(AnonymousAdatSorToAdatSor);
    //console.log(dataStore);
}

function AnonymousAdatSorToAdatSor(item, index, originalArray) {
    return new AdatSor(
        item.Tanulo,
        item.Tantargy,
        item.Erdemjegy,
        item.Datum
    );
}


function fx() {
    var result = [];

    for (var i = 0; i < nevek.length; i++) {
        for (var j = 0; j < tantargyak.length; j++) {
            var temp = dataStore.filter((item) => { return item.Tanulo === nevek[i] && item.Tantargy === tantargyak[j] });
            var sum = 0;
            for (var k = 0; k < temp.length; k++) {
                sum += temp[k].Erdemjegy;
            }
            result.push({ Tanulo: nevek[i], Tantargy: tantargyak[j], Atlag: sum / temp.length });
        }
    }
    //console.log(JSON.stringify(result));
    //console.log(fx());
    return (result);
}




function Student1() {
    var result = [];
    for (var i = 0; i < fx().length; i++) {
        if (fx()[i].Tanulo.indexOf('A. Péter') > -1) {
            result.push(fx()[i]);
        }
    }
    return result;
}

function Student2() {
    var result = [];
    for (var i = 0; i < fx().length; i++) {
        if (fx()[i].Tanulo.indexOf('O. Rafael') > -1) {
            result.push(fx()[i]);
        }
    }
    return result;
}

function Student3() {
    var result = [];
    for (var i = 0; i < fx().length; i++) {
        if (fx()[i].Tanulo.indexOf('Cs. Ádám') > -1) {
            result.push(fx()[i]);
        }
    }
    return result;
}

function Student4() {
    var result = [];
    for (var i = 0; i < fx().length; i++) {
        if (fx()[i].Tanulo.indexOf('P. Imre') > -1) {
            result.push(fx()[i]);
        }
    }

    return result;
}

function ChooseFilter(number) {
    if (number == 2) {
        var chosenFilter = Student1();
    }
    else if (number == 3) {
        var chosenFilter = Student2();
    }
    else if (number == 4) {
        var chosenFilter = Student3();
    }
    else if (number == 5) {
        var chosenFilter = Student4();
    }
    return chosenFilter;
}




function TanuloSzovegesErtekelese(erdemjegy) {
    var SzovegesErtekeles;

    switch (erdemjegy) {
        case 1:
            SzovegesErtekeles = 'Elégtelen (1)';
            break;
        case 2:
            SzovegesErtekeles = 'Elégséges (2)';
            break;
        case 3:
            SzovegesErtekeles = 'Közepes (3)';
            break;
        case 4:
            SzovegesErtekeles = 'Jó (4)';
            break;
        case 5:
            SzovegesErtekeles = 'Jeles (5)';
            break;
    }
    return SzovegesErtekeles;
}
