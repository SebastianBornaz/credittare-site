
function PMT(rate, period, sum) {
    return rate * sum * Math.pow((1 + rate), period) / (1 - Math.pow((1 + rate), period));
}
function roundUp(number, digits) {
    var factor = Math.pow(10,digits);
    return Math.ceil(number*factor) / factor;
}
function updateFields() {
    // variabile citite
    var period = document.getElementById('period').value;
    var dob = document.getElementById('dob').value;
    var comml = document.getElementById('comm').value;
    var sum = document.getElementById('sum').value;
    //formule matematice 
    var rata = -Math.round(PMT(dob / 100 / 12, period, sum) * 100) / 100;
    var commt = comml/100 * sum;
    var d12 = dob/12;
    var cost_total = rata*period - sum + comml*((sum - rata/d12)*(Math.pow(1 + d12, period) - 1)/d12 + rata*period/d12);
    var total_plata = sum + cost_total;
    //afisare
    document.getElementById('ratalunara').value = rata;
    document.getElementById('commt').value = commt;
    document.getElementById('costtotal').value = cost_total;
    document.getElementById('platatotal').value = total_plata;
}
