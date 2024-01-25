Euro_to_forint = 387,58;
TRY_to_forint = 11,76;


function convert() {
    var magnitude = document.getElementById("thousand");
    console.log(magnitude);
    var input = document.getElementById("forint").value;
    var euro_output = document.getElementById("EURO");
    var euro_val = input * (1 / Euro_to_forint)
    var try_output = document.getElementById("TRY");
    var try_val = input * (1 / TRY_to_forint)
    if (magnitude.checked) {
        euro_val = euro_val * 1000;
        try_val = try_val * 1000;
    }
    euro_output.innerHTML = euro_val.toFixed(2);
    try_output.innerHTML = try_val.toFixed(2);
}

document.getElementById("convert").onclick = convert;