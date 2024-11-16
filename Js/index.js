const artigos = [
    { titulo: "Impacto da IA na educação", autor: "João Cláudio", palavraChave: ["IA", "Educação", "Aprendizado"] },
    { titulo: "Soluções de energia sustentável", autor: "Roberto Freitas", palavraChave: ["Energia", "Sustentabilidade", "Ambiente"] },
    { titulo: "Avanços na computação quântica", autor: "Ana Diniz", palavraChave: ["Quântico", "Computação", "Tecnologia"] },
    { titulo: "Aprendizado de máquina no sistema de saúde", autor: "Pedro Henrique", palavraChave: ["Aprendizado de máquina", "Cuidados de Saúde", "IA"] },
    { titulo: "Recursos renováveis em cidades inteligentes", autor: "Giovanna Siqueira", palavraChave: ["Renovável", "Cidades inteligentes", "Ambiente"] }
];

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

const performSearchDebounced = debounce(performSearch, 300);

function performSearch() {
    const pesquisa = document.getElementById('search-bar').value.toLowerCase().addEventListener('input', performSearchDebounced);;
    const resultados = document.getElementById('search-results');
    const recomendacoes = document.getElementById('recommended-artigos');

    if (!pesquisa) {
        resultados.innerHTML = "<p>Por favor, insira um termo para busca.</p>";
        recomendacoes.innerHTML = '';
        return;
    }

    const filteredResults = artigos.filter(article =>
        article.titulo.toLowerCase().includes(pesquisa) ||
        article.autor.toLowerCase().includes(pesquisa) ||
        article.palavraChave.some(keyword => keyword.toLowerCase().includes(pesquisa))
    );

    
    if (filteredResults.length > 0) {
        resultados.innerHTML = `
            <p>Resultados para "<b>${pesquisa}</b>":</p>
            <ul>
                ${filteredResults.map(article => `
                    <li>
                        <span class="article-titulo">${article.titulo}</span><br>
                        <span class="autor">Autor: ${article.autor}</span><br>
                        <span>Palavras-chave: ${article.palavraChave.join(', ')}</span>
                    </li>
                `).join('')}
            </ul>
        `;
        
        generateRecommendations(filteredResults);
    } else {
        resultados.innerHTML = "<p>Nenhum resultado encontrado.</p>";
        recomendacoes.innerHTML = '';
    }
}

function generateRecommendations(filteredResults) {
    const recomendacoes = document.getElementById('recommended-artigos');
    let recommendedartigos = [];

    const allpalavraChave = new Set();
    filteredResults.forEach(article => {
        article.palavraChave.forEach(keyword => allpalavraChave.add(keyword.toLowerCase()));
    });

    artigos.forEach(article => {
        if (!filteredResults.includes(article)) {
            const commonpalavraChave = article.palavraChave.filter(keyword => allpalavraChave.has(keyword.toLowerCase()));
            if (commonpalavraChave.length > 0) {
                recommendedartigos.push({
                    titulo: article.titulo,
                    autor: article.autor,
                    commonpalavraChave: commonpalavraChave
                });
            }
        }
    });

    if (recommendedartigos.length > 0) {
        recomendacoes.innerHTML = `
            <p>Recomendações baseadas em sua pesquisa:</p>
            <ul>
                ${recommendedartigos.map(article => `
                    <li>
                        <span class="article-titulo">${article.titulo}</span><br>
                        <span class="autor">Autor: ${article.autor}</span><br>
                        <span>Palavras-chave comuns: ${article.commonpalavraChave.join(', ')}</span>
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

