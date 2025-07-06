
function applyFilters() {
    const player = document.getElementById('playerFilter').value.toLowerCase();
    const team = document.getElementById('teamFilter').value.toLowerCase();
    const series = document.getElementById('seriesFilter').value.toLowerCase();
    const sport = document.getElementById('sportFilter').value.toLowerCase();
    const rookie = document.getElementById('rookieFilter').value;
    const auto = document.getElementById('autoFilter').value;
    const mem = document.getElementById('memFilter').value;

    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';

    cards.forEach(card => {
        if (
            (player && !card['Jméno hráče'].toLowerCase().includes(player)) ||
            (team && !card['Hráčův tým'].toLowerCase().includes(team)) ||
            (series && !card['Série/Set'].toLowerCase().includes(series)) ||
            (sport && !card['Sport'].toLowerCase().includes(sport)) ||
            (rookie && card['Rookie'] !== rookie) ||
            (auto && card['Podpis'] !== auto) ||
            (mem && card['Memorabilia'] !== mem)
        ) return;

        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `
            <img src="images/${String(card['ID']).padStart(6, '0')}_front_back.jpg" onclick="window.open(this.src)">
            <div class="card-info">
                <h3>${card['Jméno hráče']}</h3>
                <p><strong>ID:</strong> ${card['ID']}</p>
                <p><strong>Tým:</strong> ${card['Hráčův tým']}</p>
                <p><strong>Rok:</strong> ${card['Ročník (year)']}</p>
                <p><strong>Série:</strong> ${card['Série/Set']}</p>
                <p><strong>Sport:</strong> ${card['Sport']}</p>
                <p><strong>Typ:</strong> ${card['Typ karty']}</p>
                <p><strong>Limitace:</strong> ${card['Limitace']}</p>
                <p><strong>Podpis:</strong> ${card['Podpis']}</p>
                <p><strong>Memorabilia:</strong> ${card['Memorabilia']}</p>
                <p><strong>Rookie:</strong> ${card['Rookie']}</p>
                <p><strong>Nákupní cena:</strong> ${card['Nákupní cena [CZK]']}</p>
                <p><strong>Hodnota:</strong> ${card['Aktuální hodnota 3Q/2025']}</p>
                <p><em>${card['Poznámka']}</em></p>
            </div>
        `;
        gallery.appendChild(div);
    });
}

document.addEventListener('DOMContentLoaded', applyFilters);
