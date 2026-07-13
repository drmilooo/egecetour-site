const fs = require('fs');
let index = fs.readFileSync('index.html', 'utf8');

// Colors & Backgrounds
index = index.replace(/amber/g, 'emerald');
index = index.replace(/transfer_bg\.jpg/g, 'safari_bg.png');
index = index.replace('Egece Transfer - Havalimani & Otel VIP Transfer', 'Egece Quad Safari');
index = index.replace('Antalya Havalimani (AYT) VIP Ulasim', 'Doga ve Adrenalin Sizi Bekliyor');
index = index.replace('VIP Transfer Hizmetleri', 'Doga ve Adrenalin Sizi Bekliyor');
index = index.replace('Egece Transfer <br>', 'Egece Quad Safari <br>');

// Replace Form Body
const formStart = index.indexOf('<!-- Quick Travel Plan Form -->');
const formEnd = index.indexOf('</form>') + 7;
const newForm = \<!-- Quick Travel Plan Form -->
<form id="reservationForm" onsubmit="event.preventDefault(); submitReservation();" class="mt-8">
    <div class="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-800 p-6 md:p-8 shadow-2xl">
        <div class="mb-6 flex items-center justify-between">
            <h3 class="text-xl md:text-2xl font-bold text-white"><span data-translate="form_title">Hizli Yolculuk Plani</span></h3>
            <div class="w-10 h-1 bg-emerald-500 rounded-full"></div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="space-y-4 lg:col-span-2">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="relative">
                        <label for="isim" class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1"><span data-translate="label_name">Adiniz Soyadiniz</span></label>
                        <span class="absolute left-3 top-[34px] text-slate-500 text-sm">??</span>
                        <input type="text" id="isim" placeholder="Adiniz Soyadiniz" required class="block w-full pl-8 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm">
                    </div>
                    <div class="relative">
                        <label for="telefon" class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1"><span data-translate="label_phone">Telefon Numarasi</span></label>
                        <input type="tel" id="telefon" required class="block w-full pl-3 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm" style="width: 100%;">
                    </div>
                </div>

                <div class="relative">
                    <label for="eposta" class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">E-Posta Adresi (Opsiyonel)</label>
                    <span class="absolute left-3 top-[34px] text-slate-500 text-sm">??</span>
                    <input type="email" id="eposta" placeholder="ornek@email.com" class="block w-full pl-8 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm">
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="space-y-4">
                        <div class="relative">
                            <label for="nereden" class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Bulundugunuz Bölge</label>
                            <span class="absolute left-3 top-[34px] text-emerald-500 text-sm">??</span>
                            <select id="nereden" onchange="window.populateSafariHotels()" class="w-full pl-8 pr-8 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm appearance-none cursor-pointer">
                                <option value="" disabled selected>Bölge Seçiniz</option>
                                <option value="Göynük">Göynük</option>
                                <option value="Beldibi">Beldibi</option>
                                <option value="Kemer">Kemer</option>
                                <option value="Kiris">Kiris</option>
                                <option value="Çamyuva">Çamyuva</option>
                            </select>
                            <span class="absolute right-3 top-[34px] text-slate-500 pointer-events-none text-[9px]">?</span>
                        </div>
                        <div class="relative mt-4 hidden" id="otel_container">
                            <label for="secilen_otel" class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Oteliniz</label>
                            <span class="absolute left-3 top-[34px] text-emerald-500 text-sm">??</span>
                            <select id="secilen_otel" class="w-full pl-8 pr-8 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm appearance-none cursor-pointer">
                                <option value="" disabled selected>Önce Bölge Seçiniz</option>
                            </select>
                            <span class="absolute right-3 top-[34px] text-slate-500 pointer-events-none text-[9px]">?</span>
                        </div>
                        <input type="hidden" id="nereye" value="Safari Alani">

                        <div>
                            <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Katilim Detaylari</label>
                            <div class="grid grid-cols-2 gap-2">
                                <div class="relative">
                                    <label class="block text-[8px] text-slate-500 uppercase font-bold absolute -top-2 left-2 bg-slate-950 px-1">ATV Sayisi</label>
                                    <select id="atv_sayisi" onchange="window.calculateSafariPrice()" class="block w-full px-2 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs">
                                        <option value="1">1 ATV</option>
                                        <option value="2">2 ATV</option>
                                        <option value="3">3 ATV</option>
                                        <option value="4">4 ATV</option>
                                        <option value="5">5 ATV</option>
                                    </select>
                                </div>
                                <div class="relative">
                                    <label class="block text-[8px] text-slate-500 uppercase font-bold absolute -top-2 left-2 bg-slate-950 px-1">Kisi Sayisi</label>
                                    <select id="kisi_sayisi" onchange="window.calculateSafariPrice()" class="block w-full px-2 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs">
                                        <option value="1">1 Kisi</option>
                                        <option value="2">2 Kisi</option>
                                        <option value="3">3 Kisi</option>
                                        <option value="4">4 Kisi</option>
                                        <option value="5">5 Kisi</option>
                                        <option value="6">6 Kisi</option>
                                        <option value="7">7 Kisi</option>
                                        <option value="8">8 Kisi</option>
                                        <option value="9">9 Kisi</option>
                                        <option value="10">10 Kisi</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="mt-4">
                            <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Saat Dilimi</label>
                            <div class="grid grid-cols-2 gap-2">
                                <label class="cursor-pointer relative">
                                    <input type="radio" name="saat_dilimi" value="Sabah Turu" class="peer sr-only" checked>
                                    <div class="rounded-xl border border-slate-800 bg-slate-950 p-2 text-center peer-checked:border-emerald-500 peer-checked:bg-emerald-500/10 transition-all hover:border-slate-600 h-full flex flex-col justify-center items-center">
                                        <span class="text-xl mb-1">??</span>
                                        <span class="block text-[9px] font-bold text-slate-300">Sabah Turu</span>
                                    </div>
                                </label>
                                <label class="cursor-pointer relative">
                                    <input type="radio" name="saat_dilimi" value="Ögle Turu" class="peer sr-only">
                                    <div class="rounded-xl border border-slate-800 bg-slate-950 p-2 text-center peer-checked:border-emerald-500 peer-checked:bg-emerald-500/10 transition-all hover:border-slate-600 h-full flex flex-col justify-center items-center">
                                        <span class="text-xl mb-1">??</span>
                                        <span class="block text-[9px] font-bold text-slate-300">Ögle Turu</span>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="space-y-4">
                        <div class="relative">
                            <label for="transfer_tarih" class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1"><span data-translate="label_date">Tur Tarihi</span></label>
                            <span class="absolute left-3 top-[34px] text-emerald-500 text-sm">??</span>
                            <input type="text" id="transfer_tarih" placeholder="Tarih Seçiniz" required class="block w-full pl-8 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm cursor-pointer" readonly>
                        </div>

                        <div>
                            <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2"><span data-translate="label_payment">Ödeme Yöntemi</span></label>
                            <div class="grid grid-cols-1 gap-2">
                                <label class="cursor-pointer relative">
                                    <input type="radio" name="odeme_yontemi" value="Nakit/POS" class="peer sr-only" checked>
                                    <div class="rounded-xl border border-slate-800 bg-slate-950 p-3 flex items-center peer-checked:border-emerald-500 peer-checked:bg-emerald-500/10 transition-all hover:border-slate-600">
                                        <div class="w-4 h-4 rounded-full border-2 border-slate-600 mr-3 peer-checked:border-emerald-500 flex items-center justify-center">
                                            <div class="w-2 h-2 rounded-full bg-emerald-500 scale-0 peer-checked:scale-100 transition-transform"></div>
                                        </div>
                                        <div>
                                            <span class="block text-xs font-bold text-slate-200"><span data-translate="payment_cash">Araçta Nakit/POS</span></span>
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="relative">
                    <label for="ozel_not" class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1"><span data-translate="label_special_note">Özel Notunuz</span></label>
                    <textarea id="ozel_not" rows="2" class="block w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs resize-none" placeholder="Varsa özel istekleriniz, bebek koltugu talebi vb."></textarea>
                </div>
            </div>

            <div class="lg:col-span-1">
                <div class="bg-slate-950 rounded-xl border border-slate-800 p-5 sticky top-24">
                    <div class="mb-4">
                        <label class="flex items-start cursor-pointer group">
                            <div class="relative flex items-center justify-center mt-0.5 mr-3">
                                <input type="checkbox" id="kvkk_consent" required class="peer sr-only">
                                <div class="w-4 h-4 rounded border border-slate-600 bg-slate-900 peer-checked:bg-emerald-500 peer-checked:border-emerald-500 transition-all group-hover:border-emerald-500/50"></div>
                                <svg class="absolute w-3 h-3 text-white scale-0 peer-checked:scale-100 transition-transform pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                                </svg>
                            </div>
                            <span class="text-[9px] text-slate-400 leading-relaxed"><span data-translate="label_kvkk">Kisisel verilerimin KVKK kapsaminda islenmesini ve transfer sartlarini kabul ediyorum.</span></span>
                        </label>
                    </div>
                    
                    <div id="priceDisplayContainer" class="mb-4 pt-4 border-t border-slate-800">
                        <div class="flex items-center justify-between mb-1">
                            <span id="priceLabel" class="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Transfer Ücreti</span>
                        </div>
                        <div class="text-3xl font-bold text-emerald-400 tracking-tight" id="priceValue">25 $</div>
                    </div>

                    <button type="submit" id="submitBtn" class="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-emerald-500/20 active:scale-[0.98] flex items-center justify-center group">
                        <span id="btnText" class="text-sm tracking-wide"><span data-translate="btn_book">Rezervasyon Yap</span></span>
                        <svg id="btnSpinner" class="animate-spin -mr-1 ml-3 h-4 w-4 text-slate-950 hidden" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</form>\;
index = index.substring(0, formStart) + newForm + index.substring(formEnd);

// Scripts Replacements
const calculateScript = \
window.populateSafariHotels = function() {
    const bolge = document.getElementById("nereden").value;
    const otelContainer = document.getElementById("otel_container");
    const otelSelect = document.getElementById("secilen_otel");
    if (bolge && typeof HOTELS_DB !== 'undefined' && HOTELS_DB[bolge]) {
        otelSelect.innerHTML = '<option value="" disabled selected>Otel Seçiniz</option>';
        HOTELS_DB[bolge].forEach(otel => {
            otelSelect.innerHTML += \\\<option value="\">\</option>\\\;
        });
        otelContainer.classList.remove("hidden");
    } else {
        otelContainer.classList.add("hidden");
        otelSelect.innerHTML = '<option value="" disabled selected>Önce Bölge Seçiniz</option>';
    }
}

window.calculateSafariPrice = function() {
    const atvEl = document.getElementById("atv_sayisi");
    const kisiEl = document.getElementById("kisi_sayisi");
    if(!atvEl || !kisiEl) return;
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
        priceValue.textContent = \\\\ $\\\;
        window.lastCalculatedPrice = price;
    }
}

window.submitReservation = async function() {
    const submitBtn = document.getElementById("submitBtn");
    const btnText = document.getElementById("btnText");
    const btnSpinner = document.getElementById("btnSpinner");
    const isim = document.getElementById("isim").value.trim();
    const telefon = phoneInputIti ? phoneInputIti.getNumber() : document.getElementById("telefon").value.trim();
    const eposta = document.getElementById("eposta").value.trim();
    const bolge = document.getElementById("nereden").value;
    const secilen_otel = document.getElementById("secilen_otel").value;
    const nereden = bolge && secilen_otel && secilen_otel !== "Önce Bölge Seçiniz" && secilen_otel !== "Otel Seçiniz" ? \\\\ (\)\\\ : (bolge || "");
    const atv_sayisi = document.getElementById("atv_sayisi").value;
    const kisi_sayisi = document.getElementById("kisi_sayisi").value;
    const selectedSaatEl = document.querySelector('input[name="saat_dilimi"]:checked');
    const saat_dilimi = selectedSaatEl ? selectedSaatEl.value : "Belirtilmedi";
    const calculatedPrice = window.lastCalculatedPrice || 25;
    const ozel_not = document.getElementById("ozel_not").value.trim();
    const transfer_tarih = document.getElementById("transfer_tarih").value;
    const kvkkChecked = document.getElementById("kvkk_consent").checked;
    
    if (!kvkkChecked) {
        showToast("Lütfen KVKK sartlarini kabul edin.", "error");
        return;
    }
    if (phoneInputIti && !phoneInputIti.isValidNumber()) {
        showToast("Lütfen geçerli bir telefon numarasi girin.", "error");
        return;
    }
    if (!isim || !telefon || !bolge || !transfer_tarih) {
        showToast("Lütfen tüm alanlari eksiksiz doldurun.", "error");
        return;
    }
    if (bolge && (!secilen_otel || secilen_otel === "Önce Bölge Seçiniz" || secilen_otel === "Otel Seçiniz")) {
        showToast("Lütfen otelinizi seçin.", "error");
        return;
    }

    if (submitBtn) submitBtn.disabled = true;
    if (btnText) btnText.textContent = "Gönderiliyor...";
    if (btnSpinner) btnSpinner.classList.remove("hidden");

    const pickupTimes = {
        "Sabah Turu": { "Beldibi": "10:00", "Göynük": "10:15", "Kemer": "10:30", "Kiris": "10:45", "Çamyuva": "11:00" },
        "Ögle Turu": { "Beldibi": "14:00", "Göynük": "14:15", "Kemer": "14:30", "Kiris": "14:45", "Çamyuva": "15:00" }
    };
    const expectedPickupTime = (pickupTimes[saat_dilimi] && pickupTimes[saat_dilimi][bolge]) ? pickupTimes[saat_dilimi][bolge] : "10:00";
    const formattedDate = formatDateTime(transfer_tarih + 'T' + expectedPickupTime + ':00');

    const wpMessage = \\\?? EGECE QUAD SAFARI REZERVASYONU
--------------------------------------------
?? Isim Soyisim: \
?? Telefon: \
?? E-Posta: \
?? Alinacak Otel: \
?? Tur Tarihi: \
? Saat Dilimi: \ (Otelden Alinis: \)
?? ATV Sayisi: \ ATV
?? Kisi Sayisi: \ Kisi
?? Toplam Ücret: \ $
?? Ödeme Türü: Araçta Ödeme
--------------------------------------------
?? Özel Not: \\\\;

    try {
        if (typeof SUPABASE_URL !== 'undefined' && supabaseClient) {
            await supabaseClient.from('reservations').insert([{
                ad_soyad: isim,
                telefon: telefon,
                eposta: eposta,
                nereden: nereden,
                nereye: 'Safari Alani',
                tarih: transfer_tarih,
                saat: expectedPickupTime,
                arac_tipi: \\\\ ATV, \ Kisi\\\,
                yolcu_sayisi: kisi_sayisi,
                odeme_yontemi: 'Nakit/POS',
                ozel_not: \\\[\] \\\\,
                fiyat: calculatedPrice,
                durum: 'Yeni'
            }]);
        }
        await fetch(\\\https://api.telegram.org/bot\/sendMessage\\\, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: wpMessage })
        });
        document.getElementById("reservationForm").reset();
        document.getElementById("reservationForm").classList.add("hidden");
        document.getElementById("successMessage").classList.remove("hidden");
        document.getElementById("success-desc").textContent = "Safari talebiniz basariyla alinmistir. Ekibimiz en kisa sürede sizinle iletisime geçecektir.";
    } catch (e) {
        showToast("Bir hata olustu, lütfen tekrar deneyin.", "error");
    } finally {
        if (submitBtn) submitBtn.disabled = false;
        if (btnText) btnText.textContent = "Rezervasyon Yap";
        if (btnSpinner) btnSpinner.classList.add("hidden");
    }
}
\;

index = index.replace('window.submitReservation = async function() {', calculateScript + '\\n// Remove duplicate\\n// function removed');
// We need to properly replace the old submitReservation in index.html to avoid dupes.
const submitStart = index.indexOf('window.submitReservation = async function() {');
const submitEnd = index.indexOf('window.openBookingModal = function() {');
if (submitStart !== -1 && submitEnd !== -1) {
    index = index.substring(0, submitStart) + calculateScript + index.substring(submitEnd);
}

fs.writeFileSync('quadsafari.html', index, 'utf8');
