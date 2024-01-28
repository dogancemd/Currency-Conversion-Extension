var Rates = {
    "HUF" : 1,
    "EUR" : 387.58,
    "TRY" : 11.76
};

var from_currency = "HUF";
var to_currency = "HUF";



function change_exchange() {
    var from = document.getElementById("from");
    var to = document.getElementById("to");
    document.getElementById("from_name").innerText = from.options[from.selectedIndex].value + ":";
    document.getElementById("resultName").innerText = to.options[to.selectedIndex].value + ":";
    from_currency = from.options[from.selectedIndex].value;
    to_currency = to.options[to.selectedIndex].value;
    convert();

}


function convert() {
    var magnitude = document.getElementById("thousand");
    var input = document.getElementById("from_val").value;
    var to_val = document.getElementById("resultVal");
    var result = input * Rates[from_currency] / Rates[to_currency];
    if (magnitude.checked) {
        result = result * 1000;
    }
    to_val.innerText = result;
    
}

document.getElementById("from_val").onchange = convert;
document.getElementById("from").onchange = change_exchange;
document.getElementById("to").onchange = change_exchange;