function PMT(rate, period, sum) {
    return rate * sum * Math.pow((1 + rate), period) / (1 - Math.pow((1 + rate), period));
}

function roundUp(number, digits) {
    var factor = Math.pow(10, digits);
    return Math.ceil(number * factor) / factor;
}

function updateFields() {
    // variabile citite
    var period = document.getElementsByName('perioada')[0].value;
    var dob = document.getElementsByName('dobanda')[0].value;
    var comml = document.getElementsByName('comision-lunar')[0].value;
    var sum = document.getElementsByName('suma-imprumutata')[0].value;

    //formule matematice
    var rata = -Math.round(PMT(dob / 100 / 12, period, sum)*100)/100;
    var commt = comml/100 * sum;
    var d12 = dob/12;
    var cost_total = Math.ceil(rata*period - sum + comml*((sum - rata/d12)*(Math.pow(1 + d12, period) - 1)/d12 + rata*period/d12));
    var total_plata = sum + cost_total;

    //afisare
    if (period == null || period == 0 || dob == null || dob == 0 || sum == null || sum == 0) {
        document.getElementById('ratalunara').value = 0;
        document.getElementById('ratalunara').style.color = "rgba(219, 94, 94, 0.8)";
        document.getElementById('costtotal').value = 0;
        document.getElementById('costtotal').style.color = "rgba(219, 94, 94, 0.8";
    }
    else {
        document.getElementById('ratalunara').value = rata;
        document.getElementById('ratalunara').style.color = "rgba(46, 150, 46, 0.8)";
        document.getElementById('costtotal').value = cost_total;
        document.getElementById('costtotal').style.color = "rgba(46, 150, 46, 0.8)";
    }

    document.getElementById('commt').value = commt;
    document.getElementById('platatotal').value = total_plata;
}

function restrictInput() {
    this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
}

function generateTable() {
    //variabile
    var period = document.getElementsByName('perioada')[0].value;
    var dob = document.getElementsByName('dobanda')[0].value;
    var comml = document.getElementsByName('comision-lunar')[0].value;
    var sum = document.getElementsByName('suma-imprumutata')[0].value;

    //formule matematice
    var rata = -Math.round(PMT(dob / 100 / 12, period, sum)*100)/100;
    var commt = comml/100 * sum;
    var d12 = dob/12;
    var cost_total = Math.ceil(rata*period - sum + comml*((sum - rata/d12)*(Math.pow(1 + d12, period) - 1)/d12 + rata*period/d12));
    
    //table start
    var headers = ["#", "Sold credit initial", "Principal", "Dobanda", "Rata de credit", "Sold credit final", "Comision lunar", "Total de plata lunar"];
    var parentNode = document.getElementsByTagName('section')[0];
    var tbl = document.createElement('table');
    tbl.classList.add('alt');
    tbl.id = "tbl";
    //table head
        var tableHead = document.createElement('thead');
        var tr = document.createElement('tr');
        for (var i = 0; i < 8; i++) {
            var th = document.createElement('th');
            th.appendChild(document.createTextNode(headers[i]));
            tr.appendChild(th);
        }
        tableHead.appendChild(tr);
        tbl.appendChild(tableHead);

    //table content
        var tableBody = document.createElement('tbody');
        // first cycle is independent
        var A = sum;
        var C = roundUp(A * d12/100, 2);
        var D = rata;
        var B = roundUp(D - C, 2);
        var E = roundUp(A - B, 2);
        var F = A * comml;
        var G = D + F;

        for (var i = 0; i < period; i++) {
            var tr = document.createElement('tr');
            // #
            var td = document.createElement('td');
            td.appendChild(document.createTextNode(i+1));
            tr.appendChild(td);
            // A
            var td = document.createElement('td');
            td.appendChild(document.createTextNode(A));
            tr.appendChild(td);
            // B
            var td = document.createElement('td');
            td.appendChild(document.createTextNode(B));
            tr.appendChild(td);
            // C
            var td = document.createElement('td');
            td.appendChild(document.createTextNode(C));
            tr.appendChild(td);
            // D
            var td = document.createElement('td');
            td.appendChild(document.createTextNode(D));
            tr.appendChild(td);
            // E
            var td = document.createElement('td');
            td.appendChild(document.createTextNode(E));
            tr.appendChild(td);
            // F
            var td = document.createElement('td');
            td.appendChild(document.createTextNode(F));
            tr.appendChild(td);
            // G
            var td = document.createElement('td');
            td.appendChild(document.createTextNode(G));
            tr.appendChild(td);
            var A = E;
            var C = roundUp(A * d12/100, 2);
            var D = rata;
            var B = roundUp(D - C, 2);
            var E = roundUp(A - B, 2);
            var F = A * 0;
            var G = D + F;
            tableBody.appendChild(tr);
        }

    tbl.appendChild(tableBody);
    parentNode.appendChild(tbl);
    //  tbl.style.display = "none";
}

var x = document.getElementById('table-button');
x.addEventListener('click', generateTable);
x.addEventListener('click', function() {document.getElementById('download-button').style.visibility = "visible";})

//calcul onkeyup
document.getElementById("period").addEventListener('keyup', updateFields);
document.getElementById("dob").addEventListener('keyup', updateFields);
document.getElementById("comm").addEventListener('keyup', updateFields);
document.getElementById("sum").addEventListener('keyup', updateFields);

//input restrict event
document.getElementById("period").addEventListener('input', restrictInput);
document.getElementById("dob").addEventListener('input', restrictInput);
document.getElementById("comm").addEventListener('input', restrictInput);
document.getElementById("sum").addEventListener('input', restrictInput);
