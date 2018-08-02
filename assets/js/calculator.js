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
