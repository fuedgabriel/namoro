let intervalId;

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
    updateCounter(startDate);
    intervalId = setInterval(() => updateCounter(startDate), 1000);
}

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

function uploadImages() {
    const files = document.getElementById('imageUpload').files;
    if (files.length !== 16) {
        alert('Por favor, selecione exatamente 16 imagens.');
        return;
    }
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';
    for (let i = 0; i < files.length; i++) {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(files[i]);
        gallery.appendChild(img);
    }
}
