document.addEventListener('DOMContentLoaded', function() {
    const ratingsList = document.getElementById('ratings-list');
    const summaryText = document.getElementById('summary-text');
    
    // Pega a lista de notas do localStorage
    const allRatings = JSON.parse(localStorage.getItem('pensi105-all-ratings')) || [];

    if (allRatings.length === 0) {
        summaryText.textContent = "Nenhuma avaliação foi enviada ainda.";
        return;
    }

    // Calcula a média
    const totalRatings = allRatings.length;
    const sumOfRatings = allRatings.reduce((sum, rating) => sum + parseInt(rating), 0);
    const averageRating = (sumOfRatings / totalRatings).toFixed(2); // Média com 2 casas decimais

    summaryText.innerHTML = `<strong>Total de Avaliações:</strong> ${totalRatings} | <strong>Média:</strong> ${averageRating} estrelas`;

    // Função para criar a exibição de estrelas
    function createStarsDisplay(rating) {
        let starsHTML = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                starsHTML += '<i class="fas fa-star"></i>'; // Estrela preenchida
            } else {
                starsHTML += '<i class="far fa-star"></i>'; // Estrela vazia (requer Font Awesome regular)
            }
        }
        return `<span class="stars-display">${starsHTML}</span>`;
    }

    // Exibe cada avaliação na lista
    allRatings.forEach((rating, index) => {
        const listItem = document.createElement('li');
        const starsDisplay = createStarsDisplay(rating);
        
        listItem.innerHTML = `
            <span>Avaliação #${index + 1}</span>
            ${starsDisplay}
        `;
        
        ratingsList.appendChild(listItem);
    });
});