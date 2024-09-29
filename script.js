let intervalId;

// Função para iniciar a contagem e salvar a data no Local Storage
function startCounting() {
    const startDateInput = document.getElementById('startDate').value;
    if (!startDateInput) {
        alert('Por favor, insira a data de início do relacionamento.');
        return;
    }
    const startDate = new Date(startDateInput);
    if (startDate > new Date()) {
        alert('A data de início não pode ser no futuro.');
        return;
    }
    if (intervalId) clearInterval(intervalId);

    // Salva a data de início no Local Storage
    localStorage.setItem('startDate', startDateInput);

    updateCounter(startDate);
    intervalId = setInterval(() => updateCounter(startDate), 1000);
}

// Função para atualizar o contador
function updateCounter(startDate) {
    const now = new Date();
    const elapsed = now - startDate;
    const seconds = Math.floor((elapsed / 1000) % 60);
    const minutes = Math.floor((elapsed / (1000 * 60)) % 60);
    const hours = Math.floor((elapsed / (1000 * 60 * 60)) % 24);
    const days = Math.floor(elapsed / (1000 * 60 * 60 * 24));

    document.getElementById('timeCounter').innerText =
        `${days} dias, ${hours} horas, ${minutes} minutos e ${seconds} segundos.`;
}

// Função para fazer upload das imagens e salvar no Local Storage
function uploadImages() {
    const files = document.getElementById('imageUpload').files;
    if (files.length !== 16) {
        alert('Por favor, selecione exatamente 16 imagens.');
        return;
    }

    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';

    let imagesData = [];
    let loadedImages = 0;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];

        const reader = new FileReader();
        reader.onload = function(event) {
            const img = document.createElement('img');
            img.src = event.target.result;
            gallery.appendChild(img);

            imagesData.push(event.target.result);
            loadedImages++;

            // Salva as imagens no Local Storage após todas serem carregadas
            if (loadedImages === files.length) {
                localStorage.setItem('imagesData', JSON.stringify(imagesData));
            }
        };
        reader.readAsDataURL(file);
    }
}

// Função para carregar imagens do Local Storage
function loadImages() {
    const imagesData = JSON.parse(localStorage.getItem('imagesData'));
    if (imagesData && imagesData.length === 16) {
        const gallery = document.getElementById('gallery');
        gallery.innerHTML = '';

        for (let i = 0; i < imagesData.length; i++) {
            const img = document.createElement('img');
            img.src = imagesData[i];
            gallery.appendChild(img);
        }
    }
}

// Função para carregar a data de início do Local Storage e iniciar a contagem
function loadStartDate() {
    const startDateInput = localStorage.getItem('startDate');
    if (startDateInput) {
        document.getElementById('startDate').value = startDateInput;
        const startDate = new Date(startDateInput);
        updateCounter(startDate);
        intervalId = setInterval(() => updateCounter(startDate), 1000);
    }
}

// Carrega as imagens e a data de início ao carregar a página
window.onload = function() {
    loadStartDate();
    loadImages();
};
