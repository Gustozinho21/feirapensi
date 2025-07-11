document.addEventListener('DOMContentLoaded', function() {
    // Seleciona os elementos da página
    const stars = document.querySelectorAll('.rating-system .stars i');
    const ratingText = document.querySelector('.rating-text');
    const starsContainer = document.querySelector('.rating-system .stars');
    const ratingsLink = document.querySelector('.view-ratings-link'); // Seleciona o link

    // Função para destacar as estrelas
    function highlightStars(value) {
        stars.forEach(star => {
            if (star.dataset.value <= value) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }
    
    // Função para resetar a interface de avaliação
    function resetStars() {
        highlightStars(0);
        starsContainer.dataset.rating = "0";
        ratingText.textContent = "Avalie nosso conteúdo novamente!"; // Mensagem após reset
    }

    stars.forEach(star => {
        // Efeito visual ao passar o mouse
        star.addEventListener('mouseover', function() {
            highlightStars(this.dataset.value);
        });

        // Ao tirar o mouse, volta ao estado atual
        star.addEventListener('mouseout', function() {
            highlightStars(starsContainer.dataset.rating);
        });

        // Evento principal: ao clicar em uma estrela
        star.addEventListener('click', function() {
            const value = this.dataset.value;

            // Pega a lista de avaliações antigas ou cria uma nova
            let allRatings = JSON.parse(localStorage.getItem('pensi105-all-ratings')) || [];

            // Adiciona a nova avaliação
            allRatings.push(value);

            // Salva a lista atualizada de volta no localStorage
            localStorage.setItem('pensi105-all-ratings', JSON.stringify(allRatings));

            // --- LÓGICA PRINCIPAL DA MUDANÇA ---
            // 1. Mostra a mensagem de agradecimento
            ratingText.textContent = `Obrigado por avaliar com ${value} estrelas!`;

            // 2. Faz o link para "Ver todas as avaliações" APARECER
            ratingsLink.style.display = 'inline-block';
            
            // Impede novos cliques enquanto a mensagem é exibida
            starsContainer.style.pointerEvents = 'none';

            // 3. Reseta as estrelas após um intervalo, mas mantém o link visível
            setTimeout(() => {
                resetStars();
                starsContainer.style.pointerEvents = 'auto'; // Reativa os cliques nas estrelas
            }, 2000); // 2 segundos
        });
    });
    
    // Garante que a interface comece zerada
    ratingText.textContent = "Avalie nosso conteúdo";
    highlightStars(0);
});