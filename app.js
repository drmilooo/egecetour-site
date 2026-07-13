/**
 * Egece Transfer - App JavaScript (Supabase & Rezervasyon Yönetimi)
 * 
 * Bu dosya hem müşteri rezervasyon formunu hem de admin panelinin işlevselliğini yönetir.
 * Supabase bağlantı bilgilerini ve WhatsApp telefon numarasını aşağıdan düzenleyebilirsiniz.
 */

// ==========================================
// ⚙️ YAPILANDIRMA AYARLARI (Lütfen Düzenleyin)
// ==========================================
const SUPABASE_URL = "https://YOUR_SUPABASE_PROJECT_URL.supabase.co"; // Supabase Proje URL'niz
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY"; // Supabase Anon Key (Public API Key)
const WHATSAPP_NUMBER = "905326908396"; // Rezervasyonların yönlendirileceği WhatsApp numarası (Ülke kodu dahil, boşluksuz)
const ADMIN_PASSWORD = "admin123"; // Admin Paneli giriş şifresi
const TELEGRAM_BOT_TOKEN = "8668497531:AAFPaW0637kX93PgSyQBk9YwG9Z9jmivqnM"; // Telegram Bot Token'ınız (İsteğe bağlı, bildirim için)
const TELEGRAM_CHAT_ID = "6985543333"; // Telegram Chat ID'niz (İsteğe bağlı, bildirim için)

// ==========================================
// 🌍 DİL ÇEVİRİ VE YÖNETİM SİSTEMİ (Multilingual)
// ==========================================
let currentLang = "tr";

const TRANSLATIONS = {
    tr: {
        title: "Egece Transfer - Havalimanı & Otel VIP Transfer",
        hero_badge: "Antalya Havalimanı (AYT) VIP Ulaşım",
        hero_title: "Egece Transfer <br> <span class=\"text-amber-400\">Araçta Güvenli Ödeme</span>",
        hero_desc: "Antalya Havalimanı'nden Belek, Kemer, Side, Alanya ve tüm tatil merkezlerine lüks Mercedes Vito VIP araçlarımızla 7/24 konforlu ulaşım. Kredi kartı bilgisi gerekmez, ödemenizi araçta yapın.",
        form_title: "Hızlı Rezervasyon Formu",
        form_desc: "Ödemeyi transfer esnasında araçta yapın",
        label_name: "Adınız Soyadınız",
        label_phone: "Telefon Numarası",
        label_from: "Alış Noktası (Nereden)",
        label_to: "Varış Noktası (Nereye)",
        label_date: "Transfer Tarihi",
        label_time: "Transfer Saati",
        label_payment: "Ödeme Yöntemi",
        payment_cash: "Araçta Nakit/POS",
        payment_cash_desc: "Kart veya Nakit ödeme",
        payment_transfer: "Havale / EFT",
        payment_transfer_desc: "Banka havalesi ile",
        btn_book: "Rezervasyon Yap",
        badge_karşılama: "7/24 Canlı Karşılama",
        badge_karşılama_desc: "Antalya Havalimanı'nda uçuş gecikmelerini takip ediyor, uçağınız indiğinde sizi isminizle kapıda karşılıyoruz.",
        badge_ödeme: "Araçta Güvenle Öde",
        badge_ödeme_desc: "Rezervasyonunuzu oluştururken kredi kartı bilgisi vermeyin. Ücreti yolculuk anında araçta ödeyin.",
        badge_konfor: "VIP Vito Konforu",
        badge_konfor_desc: "Geniş bagaj hacmi, klima, lüks deri koltuklar ve profesyonel şoförlerimizle konforlu seyahat.",
        footer_desc: "Egece Transfer - Havalimanı Transfer Hizmetleri",
        footer_copy: "© 2026 Egece Transfer. Tüm hakları saklıdır.",
        msg_required: "Lütfen tüm alanları eksiksiz doldurun.",
        msg_invalid_phone: "Lütfen geçerli bir telefon numarası girin.",
        msg_overlap: "Seçtiğiniz saatte (veya çok yakınında) zaten bir rezervasyon bulunmaktadır. Lütfen başka bir saat seçin.",
        msg_success_supabase: "Rezervasyon kaydedildi! WhatsApp'a yönlendiriliyorsunuz...",
        msg_success: "WhatsApp'a yönlendiriliyorsunuz...",
        msg_telegram: "Telegram bildirimi gönderiliyor..."
    },
    en: {
        title: "Egece Transfer - Airport & Hotel VIP Transfer",
        hero_badge: "Antalya Airport (AYT) VIP Transport",
        hero_title: "Egece Transfer <br> <span class=\"text-amber-400\">Safe Payment in Vehicle</span>",
        hero_desc: "Comfortable 7/24 transport from Antalya Airport to Belek, Kemer, Side, Alanya and all holiday destinations with our luxury Mercedes Vito VIP vehicles. No credit card details required, pay in the vehicle.",
        form_title: "Quick Booking Form",
        form_desc: "Make payment in the vehicle during the transfer",
        label_name: "Your Name & Surname",
        label_phone: "Phone Number",
        label_from: "Pickup Location (From)",
        label_to: "Drop-off Location (To)",
        label_date: "Transfer Date",
        label_time: "Transfer Time",
        label_payment: "Payment Method",
        payment_cash: "Cash/POS in Car",
        payment_cash_desc: "Card or Cash payment",
        payment_transfer: "Bank Transfer",
        payment_transfer_desc: "Via bank transfer/EFT",
        btn_book: "Book Now",
        badge_karşılama: "24/7 Meet & Greet",
        badge_karşılama_desc: "We track flight delays at Antalya Airport and meet you at the gate with your name when your flight lands.",
        badge_ödeme: "Pay Safely in Car",
        badge_ödeme_desc: "Do not provide credit card details when booking. Pay safely in the vehicle during your journey.",
        badge_konfor: "VIP Vito Comfort",
        badge_konfor_desc: "Comfortable travel with large luggage capacity, air conditioning, luxury leather seats, and professional drivers.",
        footer_desc: "Egece Transfer - Airport Transfer Services",
        footer_copy: "© 2026 Egece Transfer. All rights reserved.",
        msg_required: "Please fill in all fields.",
        msg_invalid_phone: "Please enter a valid phone number.",
        msg_overlap: "There is already a booking at (or very close to) your selected time. Please choose another time.",
        msg_success_supabase: "Booking saved! Redirecting to WhatsApp...",
        msg_success: "Redirecting to WhatsApp...",
        msg_telegram: "Sending Telegram notification..."
    },
    ru: {
        title: "Egece Transfer - VIP трансфер из аэропорта и в отель",
        hero_badge: "VIP-транспорт в аэропорту Анталии (AYT)",
        hero_title: "Egece Transfer <br> <span class=\"text-amber-400\">Безопасная оплата в авто</span>",
        hero_desc: "Комфортный трансфер 24/7 из аэропорта Анталии в Белек, Кемер, Сиде, Аланью и все курортные направления на наших роскошных автомобилях Mercedes Vito VIP. Данные кредитной карты не требуются, оплата в автомобиле.",
        form_title: "Форма быстрого бронирования",
        form_desc: "Произведите оплату в автомобиле во время трансфера",
        label_name: "Ваше имя и фамилия",
        label_phone: "Номер телефона",
        label_from: "Место отправления (Откуда)",
        label_to: "Место назначения (Куда)",
        label_date: "Дата трансфера",
        label_time: "Время трансфера",
        label_payment: "Способ оплаты",
        payment_cash: "Наличные/POS в авто",
        payment_cash_desc: "Оплата картой или наличными",
        payment_transfer: "Перевод на счет",
        payment_transfer_desc: "Банковским переводом",
        btn_book: "Забронировать",
        badge_karşılama: "Встреча 24/7",
        badge_karşılama_desc: "Мы отслеживаем задержки рейсов в аэропорту Анталии и встречаем вас у ворот с вашим именем по прибытии.",
        badge_ödeme: "Безопасная оплата",
        badge_ödeme_desc: "Не предоставляйте данные кредитной карты при бронировании. Оплачивайте безопасно в автомобиле.",
        badge_konfor: "VIP Vito Комфорт",
        badge_konfor_desc: "Комфортное путешествие с большим багажным отделением, кондиционером, кожаными сиденьями и профессиональными водителями.",
        footer_desc: "Egece Transfer - Услуги трансфера из аэропорта",
        footer_copy: "© 2026 Egece Transfer. Все права защищены.",
        msg_required: "Пожалуйста, заполните все поля.",
        msg_invalid_phone: "Пожалуйста, введите корректный номер телефона.",
        msg_overlap: "На выбранное вами время уже есть бронирование. Пожалуйста, выберите другое время.",
        msg_success_supabase: "Бронь сохранена! Перенаправление на WhatsApp...",
        msg_success: "Перенаправление на WhatsApp...",
        msg_telegram: "Отправка уведомления в Telegram..."
    },
    de: {
        title: "Egece Transfer - Flughafen & Hotel VIP Transfer",
        hero_badge: "Antalya Flughafen (AYT) VIP Transport",
        hero_title: "Egece Transfer <br> <span class=\"text-amber-400\">Sichere Zahlung im Auto</span>",
        hero_desc: "Bequemer 24/7-Transport vom Flughafen Antalya nach Belek, Kemer, Side, Alanya und zu allen Urlaubszielen mit unseren luxuriösen Mercedes Vito VIP-Fahrzeugen. Keine Kreditkartendaten erforderlich, Zahlung im Fahrzeug.",
        form_title: "Schnellbuchungsformular",
        form_desc: "Zahlung erfolgt im Fahrzeug während des Transfers",
        label_name: "Ihr Name & Nachname",
        label_phone: "Telefonnummer",
        label_from: "Abholort (Von)",
        label_to: "Zielort (Nach)",
        label_date: "Transferdatum",
        label_time: "Transferzeit",
        label_payment: "Zahlungsart",
        payment_cash: "Bar/POS im Auto",
        payment_cash_desc: "Karten- oder Barzahlung",
        payment_transfer: "Überweisung",
        payment_transfer_desc: "Per Banküberweisung",
        btn_book: "Jetzt buchen",
        badge_karşılama: "24/7 Abholung",
        badge_karşılama_desc: "Wir verfolgen Flugverspätungen am Flughafen Antalya und holen Sie bei der Landung mit Ihrem Namen am Gate ab.",
        badge_ödeme: "Sicher im Auto zahlen",
        badge_ödeme_desc: "Geben Sie bei der Buchung keine Kreditkartendaten an. Bezahlen Sie während Ihrer Reise sicher im Auto.",
        badge_konfor: "VIP Vito Komfort",
        badge_konfor_desc: "Bequemes Reisen mit großem Gepäckraum, Klimaanlage, luxuriösen Ledersitzen und professionellen Fahrern.",
        footer_desc: "Egece Transfer - Flughafentransfers",
        footer_copy: "© 2026 Egece Transfer. Alle Rechte vorbehalten.",
        msg_required: "Bitte füllen Sie alle Felder aus.",
        msg_invalid_phone: "Bitte geben Sie eine gültige Telefonnummer ein.",
        msg_overlap: "Für Ihre gewählte Zeit liegt bereits eine Buchung vor. Bitte wählen Sie eine andere Zeit.",
        msg_success_supabase: "Reservierung gespeichert! Weiterleitung zu WhatsApp...",
        msg_success: "Weiterleitung zu WhatsApp...",
        msg_telegram: "Telegram-Benachrichtigung wird gesendet..."
    },
    pl: {
        title: "Egece Transfer - VIP Transfer Lotniskowy i Hotelowy",
        hero_badge: "Transport VIP z lotniska w Antalyi (AYT)",
        hero_title: "Egece Transfer <br> <span class=\"text-amber-400\">Bezpieczna płatność w aucie</span>",
        hero_desc: "Komfortowy transport 24/7 z lotniska w Antalyi do Belek, Kemer, Side, Alanyi i wszystkich kierunków wakacyjnych naszymi luksusowymi pojazdami Mercedes Vito VIP. Dane karty nie są wymagane, płatność w aucie.",
        form_title: "Szybki formularz rezerwacji",
        form_desc: "Dokonaj płatności w pojeździe podczas transferu",
        label_name: "Imię i nazwisko",
        label_phone: "Numer telefonu",
        label_from: "Miejsce odbioru (Skąd)",
        label_to: "Miejsce docelowe (Dokąd)",
        label_date: "Data transferu",
        label_time: "Godzina transferu",
        label_payment: "Metoda płatności",
        payment_cash: "Gotówka/POS w aucie",
        payment_cash_desc: "Płatność kartą lub gotówką",
        payment_transfer: "Przelew bankowy",
        payment_transfer_desc: "Przelewem bankowym/EFT",
        btn_book: "Zarezerwuj teraz",
        badge_karşılama: "Powitanie 24/7",
        badge_karşılama_desc: "Śledzimy opóźnienia lotów na lotnisku w Antalyi i witamy Cię na bramce z Twoim imieniem po wylądowaniu.",
        badge_ödeme: "Bezpieczna płatność",
        badge_ödeme_desc: "Nie podawaj danych karty podczas rezerwacji. Zapłać bezpiecznie w pojeździe podczas podróży.",
        badge_konfor: "Komfort VIP Vito",
        badge_konfor_desc: "Wygodna podróż z dużą pojemnością bagażnika, klimatyzacją, skórzanymi fotelami i profesjonalnymi kierowcami.",
        footer_desc: "Egece Transfer - Usługi Transferu Lotniskowego",
        footer_copy: "© 2026 Egece Transfer. Wszelkie prawa zastrzeżone.",
        msg_required: "Proszę wypełnić wszystkie pola.",
        msg_invalid_phone: "Proszę podać poprawny numer telefonu.",
        msg_overlap: "Istnieje już rezerwacja w wybranym czasie lub bardzo blisko niego. Wybierz inną godzinę.",
        msg_success_supabase: "Rezerwacja zapisana! Przekierowanie do WhatsApp...",
        msg_success: "Przekierowanie do WhatsApp...",
        msg_telegram: "Wysyłanie powiadomienia Telegram..."
    },
    kk: {
        title: "Egece Transfer - Әуежай және Қонақ үй VIP трансфері",
        hero_badge: "Анталия әуежайы (AYT) VIP тасымалы",
        hero_title: "Egece Transfer <br> <span class=\"text-amber-400\">Көлікте қауіпсіз төлеу</span>",
        hero_desc: "Анталия әуежайынан Белек, Кемер, Сиде, Алания және барлық демалыс орындарына біздің сәнді Mercedes Vito VIP көліктерімізбен 7/24 жайлы тасымалдау. Несие картасының деректері қажет емес, төлем көлікте жасалады.",
        form_title: "Жылдам брондау формасы",
        form_desc: "Төлемді трансфер кезінде көлікте жасаңыз",
        label_name: "Аты-жөніңіз",
        label_phone: "Телефон нөмірі",
        label_from: "Алу нүктесі (Қайдан)",
        label_to: "Бару нүктесі (Қайда)",
        label_date: "Трансфер күні",
        label_time: "Трансфер уақыты",
        label_payment: "Төлем әдісі",
        payment_cash: "Көлікте қолма-қол/POS",
        payment_cash_desc: "Карта немесе қолма-қол төлем",
        payment_transfer: "Шотқа аудару",
        payment_transfer_desc: "Банк аударымы арқылы",
        btn_book: "Брондау",
        badge_karşılama: "7/24 Күтіп алу",
        badge_karşılama_desc: "Біз Анталия әуежайындағы рейстердің кешігуін қадағалаймыз және сіздің рейсіңіз қонған кезде сізді есіміңізбен күтіп аламыз.",
        badge_ödeme: "Қауіпсіз төлеу",
        badge_ödeme_desc: "Брондау кезінде несие картасының деректерін бермеңіз. Төлемді көлікте қауіпсіз жасаңыз.",
        badge_konfor: "VIP Vito Жайлылығы",
        badge_konfor_desc: "Кең багаж көлемі, кондиционер, сәнді былғары орындықтар және кәсіби жүргізушілермен жайлы саяхат.",
        footer_desc: "Әуежай трансфері қызметтері - Egece Transfer",
        footer_copy: "© 2026 Egece Transfer. Барлық құқықтар қорғалған.",
        msg_required: "Барлық өрістерді толтырыңыз.",
        msg_invalid_phone: "Жарамды телефон нөмірін енгізіңіз.",
        msg_overlap: "Сіз таңдаған уақытта (немесе оған өте жақын) брондау бар. Басқа уақытты таңдаңыз.",
        msg_success_supabase: "Брондау сақталды! WhatsApp-қа бағытталуда...",
        msg_success: "WhatsApp-қа бағытталуда...",
        msg_telegram: "Telegram хабарламасы жіберілуде..."
    }
};

function changeLanguage(lang) {
    if (!TRANSLATIONS[lang]) return;
    currentLang = lang;
    
    document.title = TRANSLATIONS[lang].title;

    const elements = document.querySelectorAll("[data-translate]");
    elements.forEach(el => {
        const key = el.getAttribute("data-translate");
        if (TRANSLATIONS[lang][key]) {
            el.innerHTML = TRANSLATIONS[lang][key];
        }
    });

    const nameInput = document.getElementById("isim");
    if (nameInput) {
        nameInput.placeholder = lang === "tr" ? "Örn: Ahmet Yılmaz" : 
                               lang === "ru" ? "Напр.: Иван Иванов" : 
                               lang === "de" ? "z.B. Max Mustermann" : 
                               lang === "pl" ? "np. Jan Kowalski" : 
                               lang === "kk" ? "Мысалы: Болат Әлиев" : 
                               "e.g. John Doe";
    }

    const fromInput = document.getElementById("nereden");
    if (fromInput) {
        fromInput.placeholder = lang === "tr" ? "Nereden alınacaksınız?" : 
                              lang === "ru" ? "Откуда вас забрать?" : 
                              lang === "de" ? "Wo werden Sie abgeholt?" : 
                              lang === "pl" ? "Skąd odebrać?" : 
                              lang === "kk" ? "Қайдан алынасыз?" : 
                              "Where will you be picked up?";
    }

    const toInput = document.getElementById("nereye");
    if (toInput) {
        toInput.placeholder = lang === "tr" ? "Nereye gideceksiniz?" : 
                            lang === "ru" ? "Куда вы едете?" : 
                            lang === "de" ? "Wohin möchten Sie?" : 
                            lang === "pl" ? "Dokąd chcesz jechać?" : 
                            lang === "kk" ? "Қайда барасыз?" : 
                            "Where are you going?";
    }

    if (phoneInputIti) {
        try {
            if (lang === "tr") phoneInputIti.setCountry("tr");
            else if (lang === "ru") phoneInputIti.setCountry("ru");
            else if (lang === "de") phoneInputIti.setCountry("de");
            else if (lang === "en") phoneInputIti.setCountry("gb");
            else if (lang === "pl") phoneInputIti.setCountry("pl");
            else if (lang === "kk") phoneInputIti.setCountry("kz");
        } catch (e) {
            console.warn("Telefon alanı ülkesi güncellenemedi:", e);
        }
    }
}

window.selectLanguage = function(lang) {
    changeLanguage(lang);
    const modal = document.getElementById("langModal");
    if (modal) {
        modal.classList.add("opacity-0", "pointer-events-none");
        setTimeout(() => {
            modal.style.display = "none";
        }, 300);
    }
};

// ==========================================
// 🔌 SUPABASE BAĞLANTISININ BAŞLATILMASI
// ==========================================
let supabase = null;
try {
    if (SUPABASE_URL && SUPABASE_URL !== "https://YOUR_SUPABASE_PROJECT_URL.supabase.co" && SUPABASE_ANON_KEY && SUPABASE_ANON_KEY !== "YOUR_SUPABASE_ANON_KEY") {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
} catch (error) {
    console.error("Supabase bağlantısı başlatılırken hata oluştu. Lütfen URL ve Anon Key değerlerini kontrol edin.", error);
}

// Supabase'in kurulu olup olmadığını kontrol eden yardımcı fonksiyon
function checkSupabaseConnection() {
    if (!supabase) {
        alert("⚠️ Supabase bağlantısı henüz yapılandırılmamış veya hatalı!\nLütfen 'app.js' dosyasını açarak SUPABASE_URL ve SUPABASE_ANON_KEY değerlerini güncelleyin.");
        return false;
    }
    return true;
}

// Tarih formatlama yardımcı fonksiyonu (TR formatına çevirir)
function formatDateTime(dateTimeStr) {
    if (!dateTimeStr) return "";
    const date = new Date(dateTimeStr);
    return date.toLocaleString('tr-TR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Telegram Bildirimi Gönderme Fonksiyonu (İsteğe bağlı)
function sendTelegramNotification(message) {
    return new Promise((resolve) => {
        if (!TELEGRAM_BOT_TOKEN || TELEGRAM_BOT_TOKEN === "YOUR_TELEGRAM_BOT_TOKEN" || !TELEGRAM_CHAT_ID || TELEGRAM_CHAT_ID === "YOUR_TELEGRAM_CHAT_ID") {
            resolve();
            return;
        }
        const encodedMessage = encodeURIComponent(message);
        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${encodedMessage}`;
        
        let finished = false;
        const done = () => {
            if (!finished) {
                finished = true;
                resolve();
            }
        };

        // 1. Image Beacon ile gönderim (CORS ve Local Origin engellerini aşar)
        const img = new Image();
        img.onload = done;
        img.onerror = done;
        img.src = url;
        
        window.telegramBeacons = window.telegramBeacons || [];
        window.telegramBeacons.push(img);

        // 2. Fetch ile gönderim (no-cors modu)
        fetch(url, { mode: 'no-cors' }).then(done).catch(done);

        // 3. Emniyet Zaman Aşımı (1.5 saniye sonra devam et)
        setTimeout(done, 1500);
    });
}

// ==========================================
// 👤 MÜŞTERİ REZERVASYON İŞLEMLERİ (index.html)
// ==========================================
let phoneInputIti = null;

document.addEventListener("DOMContentLoaded", () => {
    const bookingForm = document.getElementById("bookingForm");
    
    // Uluslararası telefon seçiciyi başlat (intl-tel-input)
    try {
        const phoneInput = document.getElementById("telefon");
        const itiFunc = window.intlTelInput || intlTelInput;
        if (phoneInput && typeof itiFunc !== "undefined") {
            phoneInputIti = itiFunc(phoneInput, {
                initialCountry: "tr",
                preferredCountries: ["tr", "ru", "de", "gb", "ua", "kz"],
                utilsScript: "utils.js",
                autoPlaceholder: "aggressive",
                formatOnDisplay: true
            });
        }
    } catch (err) {
        console.warn("intl-tel-input başlatılamadı, standart telefon alanı kullanılacak:", err);
    }

    if (bookingForm) {
        // Tarih seçici için minimum tarihi bugün yap
        const dateInput = document.getElementById("transfer_tarih");
        if (dateInput) {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            dateInput.min = `${year}-${month}-${day}`;
        }

        bookingForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            
            // Form elementlerini al
            const submitBtn = document.getElementById("submitBtn");
            const btnText = document.getElementById("btnText");
            const btnSpinner = document.getElementById("btnSpinner");

            const isim = document.getElementById("isim").value.trim();
            // Numarayı ülke kodu dahil (+90542...) formatta al
            const telefon = phoneInputIti ? phoneInputIti.getNumber() : document.getElementById("telefon").value.trim();
            const nereden = document.getElementById("nereden").value.trim();
            const nereye = document.getElementById("nereye").value.trim();
            const transfer_tarih = document.getElementById("transfer_tarih").value;
            const transfer_saat = document.getElementById("transfer_saat").value;
            const tarih_saat = `${transfer_tarih}T${transfer_saat}:00`;
            const odeme_yontemi = document.querySelector('input[name="odeme_yontemi"]:checked')?.value;

            // Validasyonlar
            if (phoneInputIti && !phoneInputIti.isValidNumber()) {
                showToast(TRANSLATIONS[currentLang]?.msg_invalid_phone || "Lütfen geçerli bir telefon numarası girin.", "error");
                return;
            }

            // Validasyonlar
            if (!isim || !telefon || !nereden || !nereye || !tarih_saat || !odeme_yontemi) {
                showToast(TRANSLATIONS[currentLang]?.msg_required || "Lütfen tüm alanları eksiksiz doldurun.", "error");
                return;
            }

            // Butonu yükleniyor durumuna getir
            if (submitBtn) submitBtn.disabled = true;
            if (btnText) btnText.textContent = TRANSLATIONS[currentLang]?.msg_saving || "Gönderiliyor...";
            if (btnSpinner) btnSpinner.classList.remove("hidden");

            // 1. Çift Rezervasyon Kontrolü (Aynı saatte başka rezervasyon var mı? +/- 2 saat aralığı)
            if (supabase) {
                try {
                    const chosenDate = new Date(tarih_saat);
                    const minTime = new Date(chosenDate.getTime() - 2 * 60 * 60 * 1000).toISOString();
                    const maxTime = new Date(chosenDate.getTime() + 2 * 60 * 60 * 1000).toISOString();

                    const { data: overlapData, error: overlapError } = await supabase
                        .from('rezervasyonlar')
                        .select('*')
                        .neq('durum', 'İptal Edildi')
                        .gte('tarih_saat', minTime)
                        .lte('tarih_saat', maxTime);

                    if (overlapError) throw overlapError;

                    if (overlapData && overlapData.length > 0) {
                        showToast(TRANSLATIONS[currentLang]?.msg_overlap || "Seçtiğiniz saatte (veya çok yakınında) zaten bir rezervasyon bulunmaktadır. Lütfen başka bir saat seçin.", "error");
                        
                        // Butonu eski haline getir
                        if (submitBtn) submitBtn.disabled = false;
                        if (btnText) btnText.textContent = TRANSLATIONS[currentLang]?.btn_book || "Rezervasyonu Tamamla";
                        if (btnSpinner) btnSpinner.classList.add("hidden");
                        return; // İşlemi durdur
                    }
                } catch (err) {
                    console.warn("Çift rezervasyon kontrolü başarısız oldu, işleme devam ediliyor:", err);
                }
            }

            // 2. Supabase'e Kaydetmeyi Dene (Eğer yapılandırılmışsa)
            if (supabase) {
                try {
                    const { data, error } = await supabase
                        .from('rezervasyonlar')
                        .insert([
                            { 
                                isim, 
                                telefon, 
                                nereden, 
                                nereye, 
                                tarih_saat, 
                                odeme_yontemi, 
                                durum: 'Beklemede' 
                            }
                        ])
                        .select();

                    if (error) throw error;
                    showToast(TRANSLATIONS[currentLang]?.msg_success_supabase || "Rezervasyon sisteme kaydedildi! WhatsApp'a yönlendiriliyorsunuz...", "success");
                } catch (err) {
                    console.warn("Supabase kaydı başarısız oldu (Yine de WhatsApp yönlendirmesi yapılıyor):", err);
                    showToast(TRANSLATIONS[currentLang]?.msg_success || "WhatsApp'a yönlendiriliyorsunuz...", "success");
                }
            } else {
                console.warn("Supabase henüz yapılandırılmamış. WhatsApp yönlendirmesine geçiliyor.");
                showToast(TRANSLATIONS[currentLang]?.msg_success || "WhatsApp'a yönlendiriliyorsunuz...", "success");
            }

            // 3. Mesaj İçeriğini Hazırlama
            const formattedDate = formatDateTime(tarih_saat);
            const wpMessage = 
`*🚖 EGECE TRANSFER REZERVASYON TALEBİ*
--------------------------------------------
👤 *İsim Soyisim:* ${isim}
📞 *Telefon:* ${telefon}
📍 *Alış Noktası (Nereden):* ${nereden}
🏁 *Varış Noktası (Nereye):* ${nereye}
📅 *Transfer Tarih & Saat:* ${formattedDate}
💳 *Ödeme Türü:* ${odeme_yontemi}
--------------------------------------------
*Not:* Rezervasyonumun onaylanmasını rica ederim.`;

            // Telegram Bildirimini Gönder ve Tamamlanmasını Bekle
            showToast(TRANSLATIONS[currentLang]?.msg_telegram || "Telegram bildirimi gönderiliyor...", "info");
            await sendTelegramNotification(wpMessage);

            const encodedMessage = encodeURIComponent(wpMessage);
            const wpURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

            // Formu temizle
            bookingForm.reset();

            // Yönlendirme yap
            showToast(TRANSLATIONS[currentLang]?.msg_success || "WhatsApp'a yönlendiriliyorsunuz...", "success");
            setTimeout(() => {
                window.location.href = wpURL;
                
                // Butonu eski haline getir
                if (submitBtn) submitBtn.disabled = false;
                if (btnText) btnText.textContent = TRANSLATIONS[currentLang]?.btn_book || "Rezervasyon Yap";
                if (btnSpinner) btnSpinner.classList.add("hidden");
            }, 1000);
        });
    }
});

// ==========================================
// 🛡️ ADMIN PANELİ İŞLEMLERİ (admin.html)
// ==========================================
// Admin panelinin başlatılması
async function initAdminPanel() {
    if (!checkSupabaseConnection()) return;

    // Şifre kontrolü
    if (!checkAdminSession()) {
        showLoginModal();
        return;
    }

    // Panel içeriğini göster
    const adminContent = document.getElementById("adminContent");
    if (adminContent) adminContent.classList.remove("hidden");

    // İstatistikleri ve rezervasyonları yükle
    await fetchReservations();
}

// Şifre oturumunu kontrol et
function checkAdminSession() {
    return sessionStorage.getItem("admin_logged_in") === "true";
}

// Şifre Giriş Modalını Göster
function showLoginModal() {
    const loginModal = document.getElementById("loginModal");
    if (loginModal) {
        loginModal.classList.remove("hidden");
        loginModal.classList.add("flex");
    }
}

// Şifre Girişini Doğrula
function verifyAdminPassword() {
    const passwordInput = document.getElementById("adminPasswordInput");
    const loginError = document.getElementById("loginError");
    const enteredPassword = passwordInput ? passwordInput.value : "";

    if (enteredPassword === ADMIN_PASSWORD) {
        sessionStorage.setItem("admin_logged_in", "true");
        
        // Modalı gizle ve içeriği yükle
        const loginModal = document.getElementById("loginModal");
        if (loginModal) {
            loginModal.classList.add("hidden");
            loginModal.classList.remove("flex");
        }
        
        const adminContent = document.getElementById("adminContent");
        if (adminContent) adminContent.classList.remove("hidden");
        
        showToast("Giriş Başarılı!", "success");
        fetchReservations();
    } else {
        if (loginError) {
            loginError.textContent = "Hatalı şifre! Lütfen tekrar deneyin.";
            loginError.classList.remove("hidden");
        }
        if (passwordInput) {
            passwordInput.value = "";
            passwordInput.focus();
        }
    }
}

// Çıkış Yap
function logoutAdmin() {
    sessionStorage.removeItem("admin_logged_in");
    window.location.reload();
}

// Rezervasyonları Supabase'den Çekme
async function fetchReservations() {
    if (!checkSupabaseConnection()) return;

    showTableLoading(true);

    try {
        const { data, error } = await supabase
            .from('rezervasyonlar')
            .select('*')
            .order('olusturma_tarihi', { ascending: false });

        if (error) throw error;

        renderReservationsTable(data);
        updateStatistics(data);

    } catch (err) {
        console.error("Veri çekme hatası:", err);
        showToast("Veriler yüklenirken bir hata oluştu: " + err.message, "error");
    } finally {
        showTableLoading(false);
    }
}

// Rezervasyon Tablosunu Oluşturma
function renderReservationsTable(reservations) {
    const tableBody = document.getElementById("reservationsTableBody");
    if (!tableBody) return;

    if (!reservations || reservations.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="8" class="px-6 py-12 text-center text-slate-400">
                    <div class="flex flex-col items-center justify-center space-y-2">
                        <svg class="w-12 h-12 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                        </svg>
                        <p class="text-lg font-medium">Kayıtlı Rezervasyon Bulunmuyor</p>
                        <p class="text-sm text-slate-500">Müşteriler rezervasyon yaptıkça burada görünecektir.</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    tableBody.innerHTML = reservations.map(res => {
        // Duruma göre satır arka planı ve badge stilleri
        let rowBgClass = "hover:bg-slate-800/50 transition-colors";
        let statusBadgeClass = "";
        
        if (res.durum === 'Onaylandı') {
            rowBgClass = "bg-emerald-950/20 hover:bg-emerald-950/30 border-l-4 border-emerald-500 transition-colors";
            statusBadgeClass = "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
        } else if (res.durum === 'İptal Edildi') {
            rowBgClass = "bg-rose-950/20 hover:bg-rose-950/30 border-l-4 border-rose-500 transition-colors";
            statusBadgeClass = "bg-rose-500/10 text-rose-400 border border-rose-500/20";
        } else {
            rowBgClass = "bg-slate-900 hover:bg-slate-800/40 border-l-4 border-amber-500/50 transition-colors";
            statusBadgeClass = "bg-amber-500/10 text-amber-400 border border-amber-500/20";
        }

        const formattedDate = formatDateTime(res.tarih_saat);
        const createdDate = formatDateTime(res.olusturma_tarihi);

        return `
            <tr id="row-${res.id}" class="${rowBgClass} border-b border-slate-800">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-white">
                    ${res.isim}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <a href="tel:${res.telefon}" class="text-amber-400 hover:text-amber-300 hover:underline flex items-center space-x-1 font-medium">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                        <span>${res.telefon}</span>
                    </a>
                </td>
                <td class="px-6 py-4 text-sm text-slate-300">
                    <div class="flex flex-col">
                        <span class="text-emerald-400 font-medium text-xs uppercase tracking-wider">NEREDEN</span>
                        <span>${res.nereden}</span>
                    </div>
                </td>
                <td class="px-6 py-4 text-sm text-slate-300">
                    <div class="flex flex-col">
                        <span class="text-rose-400 font-medium text-xs uppercase tracking-wider">NEREYE</span>
                        <span>${res.nereye}</span>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-300 font-medium">
                    ${formattedDate}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                    <span class="px-2.5 py-1 rounded text-xs bg-slate-800 text-slate-400 border border-slate-700">
                        ${res.odeme_yontemi}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <span class="px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${statusBadgeClass}">
                        ${res.durum}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-xs text-slate-500">
                    ${createdDate}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button onclick="updateBookingStatus(${res.id}, 'Onaylandı')" 
                        class="inline-flex items-center px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-900 ${res.durum === 'Onaylandı' ? 'opacity-50 cursor-not-allowed' : ''}"
                        ${res.durum === 'Onaylandı' ? 'disabled' : ''}>
                        Onayla
                    </button>
                    <button onclick="updateBookingStatus(${res.id}, 'İptal Edildi')" 
                        class="inline-flex items-center px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:ring-offset-slate-900 ${res.durum === 'İptal Edildi' ? 'opacity-50 cursor-not-allowed' : ''}"
                        ${res.durum === 'İptal Edildi' ? 'disabled' : ''}>
                        İptal Et
                    </button>
                </td>
            </tr>
        `;
    }).join("");
}

// Rezervasyon Durumunu Güncelleme (Onayla / İptal Et)
async function updateBookingStatus(id, newStatus) {
    if (!checkSupabaseConnection()) return;

    try {
        const { data, error } = await supabase
            .from('rezervasyonlar')
            .update({ durum: newStatus })
            .eq('id', id)
            .select();

        if (error) throw error;

        showToast(`Rezervasyon başarıyla '${newStatus}' durumuna güncellendi.`, "success");
        
        // Tabloyu yeniden çekerek güncel UI'ı göster
        await fetchReservations();

    } catch (err) {
        console.error("Güncelleme hatası:", err);
        showToast("Durum güncellenirken hata oluştu: " + err.message, "error");
    }
}

// İstatistik Kartlarını Güncelleme
function updateStatistics(reservations) {
    const totalCount = reservations.length;
    const pendingCount = reservations.filter(r => r.durum === 'Beklemede').length;
    const approvedCount = reservations.filter(r => r.durum === 'Onaylandı').length;
    const cancelledCount = reservations.filter(r => r.durum === 'İptal Edildi').length;

    const statTotal = document.getElementById("statTotal");
    const statPending = document.getElementById("statPending");
    const statApproved = document.getElementById("statApproved");
    const statCancelled = document.getElementById("statCancelled");

    if (statTotal) statTotal.textContent = totalCount;
    if (statPending) statPending.textContent = pendingCount;
    if (statApproved) statApproved.textContent = approvedCount;
    if (statCancelled) statCancelled.textContent = cancelledCount;
}

// Tablo Yükleniyor Durumu
function showTableLoading(isLoading) {
    const tableSpinner = document.getElementById("tableSpinner");
    if (tableSpinner) {
        if (isLoading) {
            tableSpinner.classList.remove("hidden");
        } else {
            tableSpinner.classList.add("hidden");
        }
    }
}

// ==========================================
// 🔔 BİLDİRİM / TOAST YARDIMCI FONKSİYONU
// ==========================================
function showToast(message, type = "info") {
    // Varsa eski toasty kaldır
    const existingToast = document.querySelector(".toast-notification");
    if (existingToast) existingToast.remove();

    // Yeni toast container oluştur
    const toast = document.createElement("div");
    toast.className = `toast-notification fixed bottom-5 right-5 z-50 flex items-center p-4 rounded-lg shadow-xl text-sm font-medium border transition-all duration-300 transform translate-y-10 opacity-0`;
    
    // Türüne göre renk belirle
    if (type === "success") {
        toast.className += " bg-emerald-950 text-emerald-400 border-emerald-500/50";
    } else if (type === "error") {
        toast.className += " bg-rose-950 text-rose-400 border-rose-500/50";
    } else {
        toast.className += " bg-slate-800 text-amber-400 border-amber-500/50";
    }

    // İkon ekleme
    let iconSvg = '';
    if (type === 'success') {
        iconSvg = `<svg class="w-5 h-5 mr-3 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;
    } else if (type === 'error') {
        iconSvg = `<svg class="w-5 h-5 mr-3 text-rose-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>`;
    } else {
        iconSvg = `<svg class="w-5 h-5 mr-3 text-amber-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;
    }

    toast.innerHTML = `
        <div class="flex items-center">
            ${iconSvg}
            <span>${message}</span>
        </div>
    `;

    document.body.appendChild(toast);

    // Animasyonla göster
    setTimeout(() => {
        toast.classList.remove("translate-y-10", "opacity-0");
    }, 10);

    // 4 saniye sonra kaldır
    setTimeout(() => {
        toast.classList.add("translate-y-10", "opacity-0");
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 4000);
}
