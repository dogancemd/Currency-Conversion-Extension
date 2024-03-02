var Rates = { "HUF": 1, "TRY": 11.584, "EUR": 393.904, "PLN": 91.1598, "USD": 363.62 }

var from_currency = "HUF";
var to_currency = "EUR";



function Switch() {
    var from = document.getElementById("from");
    var to = document.getElementById("to");
    var tmp = from.selectedIndex;
    from.selectedIndex = to.selectedIndex;
    to.selectedIndex = tmp;
    change_exchange();
    convert();
}


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
    to_val.innerText = result.toFixed(2);
    
}

document.getElementById("from_name").innerText = from_currency + ":";
document.getElementById("resultName").innerText = to_currency + ":";
document.getElementById("switch").onclick = Switch;
document.getElementById("thousand").onchange = convert;
document.getElementById("from_val").onchange = convert;
var from_element = document.getElementById("from")
var to_element = document.getElementById("to")
for ( currency in Rates){
    console.log(currency);
    var option = document.createElement("option");
    var option2 = document.createElement("option");
    option.text = currency;
    option2.text = currency;
    from_element.add(option);
    to_element.add(option2);
}
document.getElementById("from").onchange = change_exchange;
document.getElementById("to").onchange = change_exchange;