const fs = require('fs');
let quad = fs.readFileSync('quadsafari.html', 'utf8');
quad = quad.replace('<select id="kisi_sayisi"', '<select id="kisi_sayisi" onchange="calculateSafariPrice()"');
const oldPriceFunc = /window\.calculateSafariPrice = function\(\) \{[\s\S]*?\}\n/m;
const newPriceFunc = window.calculateSafariPrice = function() {
    const atvEl = document.getElementById("atv_sayisi");
    const kisiEl = document.getElementById("kisi_sayisi");
    const atvCount = parseInt(atvEl.value) || 1;
    let kisiCount = parseInt(kisiEl.value) || 1;
    let price = 0;
    const priceValue = document.getElementById("priceValue");
    if (kisiCount > atvCount * 2) {
        showToast("1 ATV'ye maksimum 2 kisi binebilir.", "error");
        kisiCount = atvCount * 2;
        kisiEl.value = kisiCount;
    }
    if (kisiCount < atvCount) {
        showToast("Kisi sayisi ATV sayisindan az olamaz.", "error");
        kisiCount = atvCount;
        kisiEl.value = kisiCount;
    }
    const doubleATVs = kisiCount - atvCount;
    const singleATVs = atvCount - doubleATVs;
    price = (singleATVs * 25) + (doubleATVs * 40);
    if (priceValue) {
        priceValue.textContent = \\ \$\;
        window.lastCalculatedPrice = price;
    }
}\n;
quad = quad.replace(oldPriceFunc, newPriceFunc);
fs.writeFileSync('quadsafari.html', quad, 'utf8');
console.log('Fixed logic');
