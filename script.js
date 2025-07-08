
function applyFilters() {
    const player = document.getElementById('playerFilter').value.toLowerCase();
    const team = document.getElementById('teamFilter').value.toLowerCase();
    const series = document.getElementById('seriesFilter').value.toLowerCase();
    const sport = document.getElementById('sportFilter').value.toLowerCase();
    const rookie = document.getElementById('rookieFilter').value;
    const auto = document.getElementById('autoFilter').value;
    const mem = document.getElementById('memFilter').value;
    const idFrom = parseInt(document.getElementById('idFrom').value);
    const idTo = parseInt(document.getElementById('idTo').value);

    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';

    cards.forEach(card => {
        const cardId = parseInt(card['ID']);
        if (
            (player && !card['Jméno hráče'].toLowerCase().includes(player)) ||
            (team && !card['Hráčův tým'].toLowerCase().includes(team)) ||
            (series && !card['Série'].toLowerCase().includes(series)) ||
            (sport && !card['Sport'].toLowerCase().includes(sport)) ||
            (rookie && card['Rookie'] !== 'Ano') ||
            (auto && card['Podpis'] !== 'Ano') ||
            (mem && card['Memorabilia'] !== 'Ano') ||
            (!isNaN(idFrom) && cardId < idFrom) ||
            (!isNaN(idTo) && cardId > idTo)
        ) return;

        const div = document.createElement('div');
        div.className = 'card';

        let info = `
            <h3>${card['Jméno hráče']}</h3>
            <p><strong>ID:</strong> ${card['ID']}</p>
            <p><strong>Tým:</strong> ${card['Hráčův tým']}</p>
            <p><strong>Rok:</strong> ${card['Ročník']}</p>
            <p><strong>Série:</strong> ${card['Série']}</p>
            <p><strong>Sport:</strong> ${card['Sport']}</p>
            <p><strong>Typ:</strong> ${card['Typ']}</p>
        `;

        if (card['Limitace']) {
            info += `<p><strong>Limitace:</strong> ${card['Limitace']}</p>`;
        }
        if (card['Podpis'] === 'Ano') {
            info += `<p><strong>Podpis:</strong> Ano</p>`;
        }
        if (card['Memorabilia'] === 'Ano') {
            info += `<p><strong>Memorabilia:</strong> Ano</p>`;
        }
        if (card['Rookie'] === 'Ano') {
            info += `<p><strong>Rookie:</strong> Ano</p>`;
        }
        if (card['Poznámka']) {
            info += `<p><em>${card['Poznámka']}</em></p>`;
        }

        div.innerHTML = `
            <img src="images/${String(card['ID']).padStart(6, '0')}_front_back.jpg" onclick="openImagePopup(this.src)">
            <div class="card-info">${info}</div>
        `;
        gallery.appendChild(div);
    });
}

function openImagePopup(src) {
    const newWindow = window.open("", "_blank", "width=820,height=900");
    newWindow.document.write(\`
        <html><head><title>Náhled karty</title></head>
        <body style="margin:0;text-align:center;background:#222;">
        <img src="\${src}" style="max-width:800px;width:100%;height:auto;margin:20px auto;display:block;border-radius:8px;">
        </body></html>
    \`);
}

document.addEventListener('DOMContentLoaded', applyFilters);
