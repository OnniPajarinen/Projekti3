function fetchRates() {
    $.ajax({
        url: "https://openexchangerates.org/api/latest.json?app_id=1c24f6bc0a1a4d8da2da59ca56c752d8",
        type: "GET",
        success: function (response) {
            var rates = response.rates;

            $("#menu").html('<option value="" selected disabled>Select</option>');
            $("#menu").append('<option value="EUR">EUR</option>')
            $("#menu").append('<option value="JPY">JPY</option>')
            $("#menu").append('<option value="GBP">GBP</option>')
            $("#menu").append('<option value="AUD">AUD</option>')
            $("#menu").append('<option value="CNY">CNY</option>')
            $("#menu").append('<option value="INR">INR</option>')
            $("#menu").append('<option value="" disabled>-</option>')

            $("#multiply").spinner({
                min: 1,
                max: 1000,
                step: 1,
                spin: function (event, ui) {
                    $(this).val(ui.value);
                }
            });

            $.each(rates, function (currency, rate) {
                $("#menu").append(`<option value="${currency}">${currency}</option>`);
            });
        },
        
    });
}
$("#firstly").hide();
$("#firstly1").hide();

function exchange() {
    

    var selectedCurrency = $("#menu").val();
    

    $.ajax({
        url: "https://openexchangerates.org/api/latest.json?app_id=1c24f6bc0a1a4d8da2da59ca56c752d8",
        type: "GET",
        success: function (response) {
            var rate = response.rates[selectedCurrency];
            var multiply = document.getElementById("multiply").value
            var final = rate*multiply
            var formattedRate = final.toFixed(2);
            if (multiply > 0 ){
                $("#firstly").html(`${multiply} USD = ${formattedRate} ${selectedCurrency}<hr><hr>`);
                $("#firstly1").html(`1 USD = ${rate} ${selectedCurrency}`);
                $("#firstly1").append(`<br><hr>5 USD = ${rate*5} ${selectedCurrency}`);
                $("#firstly1").append(`<br><hr>10 USD = ${rate*10} ${selectedCurrency}`);
                $("#firstly1").append(`<br><hr>50 USD = ${rate*50} ${selectedCurrency}`);
                $("#firstly1").append(`<br><hr>100 USD = ${rate*100} ${selectedCurrency}`);
                $("#firstly1").append(`<br><hr>500 USD = ${rate*500} ${selectedCurrency}`);
                $("#firstly1").append(`<br><hr>1000 USD = ${rate*1000} ${selectedCurrency}`);
                $("#firstly1").append(`<br><hr>2000 USD = ${rate*2000} ${selectedCurrency}`);
                $("#firstly1").append(`<br><hr>5000 USD = ${rate*5000} ${selectedCurrency}`);
                $("#firstly1").append(`<br><hr>10000 USD = ${rate*10000} ${selectedCurrency}`);

            }
            else ($("#firstly").html("Write a number above 0!"))
            
        },
        
    });
}




$("#button2").on("click", function() {
    if ($("#firstly1").is(":visible")) {
        $("#firstly1").slideUp("slow", function() {
            $("#button2").html("Show the extra rates!");
        });
    } else {
        $("#firstly1").slideDown("slow", function() {
            $("#button2").html("Hide the extra rates!");
        });
    }
});



$("#menu").on("change", function() {
    $("#firstly").slideDown("slow", function() {
        setTimeout(function() {
            $("#firstly1").slideDown("slow");
        }, 400);
    });
});



$(document).ready(fetchRates);
