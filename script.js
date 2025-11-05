document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    let selectedCar = {}; // Seçilen arabanın bilgilerini tutacak obje

    // --- Aşama 1: Araç Seçimi ---
    const setupCarSelection = () => {
        const initialHTML = `
            <h1>Geleceğin Arabanı Seç!</h1>
            <div class="car-selection">
                <div class="car-option" data-car="lamborghini-terzo-millennio" data-shortname="terzo">
                    <img src="lamborghini_terzo.jpg" alt="Lamborghini Terzo Millennio">
                    <h2>Lamborghini Terzo Millennio</h2>
                    <button>Bunu Seç!</button>
                </div>
                <div class="car-option" data-car="mercedes-vision-avtr" data-shortname="avtr">
                    <img src="mercedes_avtr.jpg" alt="Mercedes-Benz Vision AVTR">
                    <h2>Mercedes-Benz Vision AVTR</h2>
                    <button>Bunu Seç!</button>
                </div>
            </div>
        `;
        container.innerHTML = initialHTML; // HTML'i sıfırla

        document.querySelectorAll('.car-option button').forEach(button => {
            button.addEventListener('click', (event) => {
                const carOption = event.target.closest('.car-option');
                
                // Seçilen arabanın bilgilerini kaydet
                selectedCar.name = carOption.getAttribute('data-car');
                selectedCar.text = carOption.querySelector('h2').textContent;
                selectedCar.shortname = carOption.getAttribute('data-shortname');
                
                setupColorSelection(); // İkinci aşamaya geç
            });
        });
    };

    // --- Aşama 2: Renk Seçimi ---
    const setupColorSelection = () => {
        const colorSelectionHTML = `
            <div class="selection-result">
                <h2>Seçilen Araç: **${selectedCar.text}**</h2>
                <div class="next-options">
                    <h3>Sıradaki Seçimin: Renk</h3>
                    <div class="color-options">
                        <button class="color-btn" data-color="neon-green">Neon Yeşil</button>
                        <button class="color-btn" data-color="galaxy-blue">Galaksi Mavi</button>
                        <button class="color-btn" data-color="lava-red">Lava Kırmızısı</button>
                    </div>
                </div>
                <button id="reset-button" style="margin-top: 30px;">Başa Dön</button>
            </div>
        `;
        container.innerHTML = colorSelectionHTML;

        document.querySelectorAll('.color-btn').forEach(colorButton => {
            colorButton.addEventListener('click', (e) => {
                selectedCar.color = e.target.getAttribute('data-color');
                selectedCar.colorText = e.target.textContent;
                showFinalResult(); // Son aşamaya geç
            });
        });

        document.getElementById('reset-button').addEventListener('click', () => {
            setupCarSelection(); // Başa dön
        });
    };

    // --- Aşama 3: Sonuç Gösterimi ---
    const showFinalResult = () => {
        // Dosya adı mantığını kuruyoruz: örn. terzo_neon_green.jpg
        const imageName = `${selectedCar.shortname}_${selectedCar.color.replace('-', '_')}.jpg`;
        const finalResultHTML = `
            <div class="final-result">
                <h1>🎉 Nihai Seçimin 🎉</h1>
                <h2>${selectedCar.text} - ${selectedCar.colorText}</h2>
                <div class="car-display">
                    <img src="${imageName}" alt="${selectedCar.text} (${selectedCar.colorText} Renk)">
                </div>
                <p class="final-message">Bu fütüristik araçla yollara hükmetmeye hazırsın!</p>
                <button id="reset-button" style="margin-top: 30px;">Yeni Seçim Yap</button>
            </div>
        `;
        container.innerHTML = finalResultHTML;

        document.getElementById('reset-button').addEventListener('click', () => {
            setupCarSelection(); // Başa dön
        });
    };

    // Siteyi başlat
    setupCarSelection();
});