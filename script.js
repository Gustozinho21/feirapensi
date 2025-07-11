document.addEventListener('DOMContentLoaded', function() {
    const stars = document.querySelectorAll('.rating-system .stars i');
    const ratingText = document.querySelector('.rating-text');
    const starsContainer = document.querySelector('.rating-system .stars');

    stars.forEach(star => {
        star.addEventListener('mouseover', function() {
            const value = this.dataset.value;
            highlightStars(value);
        });

        star.addEventListener('mouseout', function() {
            const currentRating = starsContainer.dataset.rating;
            highlightStars(currentRating);
        });

        star.addEventListener('click', function() {
            const value = this.dataset.value;
            starsContainer.dataset.rating = value;
            ratingText.textContent = `Sua avaliação: ${value} de 5 estrelas`;
            highlightStars(value);
        });
    });

    function highlightStars(value) {
        stars.forEach(star => {
            if (star.dataset.value <= value) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }
});```

### Explicação das Mudanças:

1.  **HTML**:
    *   Foi adicionada uma referência à biblioteca Font Awesome no `<head>` para podermos usar os ícones de estrela.
    *   Uma nova `<section>` com o `id="avaliacao"` foi criada no final do `<body>`.
    *   Dentro dessa seção, há um `div` para o sistema de avaliação que contém os ícones de estrela (`<i>`) e um parágrafo para exibir o texto da avaliação.

2.  **CSS**:
    *   Novos estilos foram adicionados para a seção de avaliação, centralizando o conteúdo e definindo cores e tamanhos para as estrelas e o texto.
    *   As estrelas são cinzas por padrão e ficam amarelas quando o mouse passa por cima (`hover`) ou quando estão ativas (`.active`).

3.  **JavaScript**:
    *   O código adiciona "ouvintes de evento" às estrelas.
    *   **`mouseover`**: Quando o mouse passa por cima de uma estrela, todas as estrelas até ela são destacadas.
    *   **`mouseout`**: Quando o mouse sai, a exibição volta para a avaliação que foi clicada por último.
    *   **`click`**: Quando uma estrela é clicada, a avaliação é "salva" (em um atributo de dados) e o texto é atualizado.

Com essas adições, seu site agora terá um sistema de avaliação com estrelas funcional e estilizado na parte inferior.