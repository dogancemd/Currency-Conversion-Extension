var Rates = { "HUF": 1, "TRY": 11.584, "EUR": 393.904, "PLN": 91.1598, "USD": 363.62 }

var from_currency;
var to_currency;
var magnitude = 1;
_IP = "http://localhost:5000"

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

function change_magnitude() {
    var magnitude_elements = document.getElementsByName("magnitude");
    for (element  in magnitude_elements) {
        if (magnitude_elements[element].checked) {
            magnitude = magnitude_elements[element].value;
            break;
        }
    }
    convert();
}

function convert() {
    var input = document.getElementById("from_val").value;
    var to_val = document.getElementById("resultVal");
    var result = input * Rates[from_currency] * magnitude / Rates[to_currency];
    to_val.innerText = result.toFixed(2);
    
}

function refresh_rates() {
    fetch(_IP+"/api/rates")
        .then(response => response.json())
        .then(data => {
            Rates = data.rates;
            document.getElementById("refresh-info").innerHTML = data.timestamp;
            console.log("Rates refreshed");
        });

}


document.getElementById("from_name").innerText = from_currency + ":";
document.getElementById("resultName").innerText = to_currency + ":";
document.getElementById("switch").onclick = Switch;
document.getElementById("from_val").onchange = convert;
document.getElementById("refresh").onclick = refresh_rates;
magnitude_elements = document.getElementsByName("magnitude")
for (element in magnitude_elements) {
    magnitude_elements[element].onchange = change_magnitude;
}
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
change_exchange();