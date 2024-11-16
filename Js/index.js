const artigos = [
    { titulo: "Impacto da IA na educação", autor: "João Cláudio", palavraChave: ["IA", "Educação", "Aprendizado"] },
    { titulo: "Soluções de energia sustentável", autor: "Roberto Freitas", palavraChave: ["Energia", "Sustentabilidade", "Ambiente"] },
    { titulo: "Avanços na computação quântica", autor: "Ana Diniz", palavraChave: ["Quântico", "Computação", "Tecnologia"] },
    { titulo: "Aprendizado de máquina no sistema de saúde", autor: "Pedro Henrique", palavraChave: ["Aprendizado de máquina", "Cuidados de Saúde", "IA"] },
    { titulo: "Recursos renováveis em cidades inteligentes", autor: "Giovanna Siqueira", palavraChave: ["Renovável", "Cidades inteligentes", "Ambiente"] }
];

function verificarInput() {
    const pesquisa = document.getElementById('search-bar');
    const resultados = document.getElementById('search-results');
    const recomendacoes = document.getElementById('recommended-articles');
    const searchButton = document.getElementById('buscar');

    if (pesquisa.value === "") {
        resultados.innerHTML = "<p>Por favor, insira um termo para busca.</p>";
        recomendacoes.innerHTML = '';
        searchButton.textContent = 'Buscar';
        searchButton.onclick = performSearch;
        return;
    } else {
        performSearch();
    }
}


function performSearch() {
    const pesquisa = document.getElementById('search-bar').value.toLowerCase().trim();
    const resultados = document.getElementById('search-results');
    const recomendacoes = document.getElementById('recommended-articles');
    const searchButton = document.getElementById('buscar');

    if (pesquisa === '') {
        searchButton.textContent = 'Buscar';
        searchButton.onclick = performSearch;
        resultsDiv.innerHTML = '';
        return;
    }

    if (!pesquisa) {
        resultados.innerHTML = "<p>Por favor, insira um termo para busca.</p>";
        recomendacoes.innerHTML = '';
        return;
    }

    const filteredResults = artigos.filter(artigos =>
        artigos.titulo.toLowerCase().includes(pesquisa) ||
        artigos.autor.toLowerCase().includes(pesquisa) ||
        artigos.palavraChave.some(keyword => keyword.toLowerCase().includes(pesquisa))
    );

    
    if (filteredResults.length > 0) {
        resultados.innerHTML = `
            <p>Resultados para "<b>${pesquisa}</b>":</p>
            <ul>
                ${filteredResults.map(artigos => `
                    <li>
                        <span class="artigos-titulo">${artigos.titulo}</span><br>
                        <span class="autor">Autor: ${artigos.autor}</span><br>
                        <span>Palavras-chave: ${artigos.palavraChave.join(', ')}</span>
                    </li>
                `).join('')}
            </ul>
        `;
        
        generateRecommendations(filteredResults);
    } else {
        resultados.innerHTML = "<p>Nenhum resultado encontrado.</p>";
        recomendacoes.innerHTML = '';
    }

    searchButton.textContent = 'Limpar';
    searchButton.onclick = resetSearch;
}

function resetSearch() {
    const searchBar = document.getElementById('search-bar');
    const resultsDiv = document.getElementById('search-results');
    const recomendacoes = document.getElementById('recommended-articles');
    const searchButton = document.getElementById('buscar');


    searchBar.value = '';
    resultsDiv.innerHTML = '';
    recomendacoes.innerHTML = '';


    searchButton.textContent = 'Buscar';
    searchButton.onclick = performSearch;
}

function generateRecommendations(filteredResults) {
    const recomendacoes = document.getElementById('recommended-articles');
    let recommendedartigos = [];

    const allpalavraChave = new Set();
    filteredResults.forEach(artigos => {
        artigos.palavraChave.forEach(keyword => allpalavraChave.add(keyword.toLowerCase()));
    });

    artigos.forEach(artigos => {
        if (!filteredResults.includes(artigos)) {
            const commonpalavraChave = artigos.palavraChave.filter(keyword => allpalavraChave.has(keyword.toLowerCase()));
            if (commonpalavraChave.length > 0) {
                recommendedartigos.push({
                    titulo: artigos.titulo,
                    autor: artigos.autor,
                    commonpalavraChave: commonpalavraChave
                });
            }
        }
    });

    if (recommendedartigos.length > 0) {
        recomendacoes.innerHTML = `
            <p>Recomendações baseadas em sua pesquisa:</p>
            <ul>
                ${recommendedartigos.map(artigos => `
                    <li>
                        <span class="artigos-titulo">${artigos.titulo}</span><br>
                        <span class="autor">Autor: ${artigos.autor}</span><br>
                        <span>Palavras-chave comuns: ${artigos.commonpalavraChave.join(', ')}</span>
                    </li>
                `).join('')}
            </ul>
        `;
    } else {
        recomendacoes.innerHTML = "<p>Nenhuma recomendação disponível.</p>";
    }
}

function FecharPopup() {
    const fechar = document.getElementById('popupbox')
    fechar.style.display = 'none'

    const fbackground = document.getElementById('popupOverlay')
    fbackground.style.display = 'none'
}

document.getElementById('popupOverlay').addEventListener('animationend', function (event) {
    if (event.animationName === 'desaparecer2') {
        this.style.display = 'none';
    }
});

