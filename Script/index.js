// Kyseinen funktio tekee sen, että se tuo APIsta vedetyn xml tiedoston tiedot kaikista valuutoista ja paljonko saa yhdellä USD.
function fetchRates() {
    $.ajax({
        url: "https://openexchangerates.org/api/latest.json?app_id=1c24f6bc0a1a4d8da2da59ca56c752d8",
        type: "GET",
        success: function (response) {
            var rates = response.rates;

            // Lisäilin eniten käytettyjä valuuttoja jo listan ekoille paikoille ja laitoin myös Select napin ja - napin,
            // mistä ei voi klikata, mutta se näyttää etsiessä valuuttoja siistimmältä.
            $("#menu").html('<option value="" selected disabled>Select</option>');
            $("#menu").append('<option value="EUR">EUR</option>')
            $("#menu").append('<option value="JPY">JPY</option>')
            $("#menu").append('<option value="GBP">GBP</option>')
            $("#menu").append('<option value="AUD">AUD</option>')
            $("#menu").append('<option value="CNY">CNY</option>')
            $("#menu").append('<option value="INR">INR</option>')
            $("#menu").append('<option value="" disabled>-</option>')

            // Tämä on jQuery UIta ja se tekee määrän syöttölaatikosta hienomman.
            $("#multiply").spinner({
                min: 1,
                max: 1000,
                step: 1,
                spin: function (event, ui) {
                    $(this).val(ui.value);
                }
            });

            //Tämä kalastaa juuri ne valuutat ja niitten raten xml tiedostosta.
            $.each(rates, function (currency) {
                $("#menu").append(`<option value="${currency}">${currency}</option>`);
            });
        },
        
    });
}
// Laatikoiden borderit näkyivät, joten ne pitää piilottaa, ennenkuin niitä tarvitaan.
$("#firstly").hide();
$("#firstly1").hide();

// Tämä funktio tekee sen vaihdoksen ja kertaa myös määrän siihen valuuttaan mitä valitsit.
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
                // Tässä on se, mitä halusit tietää esim. 5USD Euroissa.
                $("#firstly").html(`${multiply} USD = ${formattedRate} ${selectedCurrency}<hr><hr>`);
                // Tässä on se, missä tehdään, eri USD summat olisivat kyseisessä valuutassa.
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
            // Jos olet kirjoittanut jotakin muuta tai vain 0 tai alle, tulee kyseinen teksti näkyville.
            else ($("#firstly").html("Write a number above 0!"))
            
            
        },
        
    });
}



// Hide/Show the rates! nappia painamalla, joko slide up tai down animaatio tapahtuu, jolloin nuo kyseiset ekstra valuuttakurssit lähtevät.
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


// Tämä funktio tekee sen, että ekstrat avautuvat hitaammin, eikä heti sen haluaman aikana.
$("#menu").on("change", function() {
    $("#firstly").slideDown("slow", function() {
        setTimeout(function() {
            $("#firstly1").slideDown("slow");
        }, 400);
    });
});


// Tämä komento tekee sen, että dropdowniin valuutat haetaan heti, kun sivu latautuu.
$(document).ready(fetchRates);
