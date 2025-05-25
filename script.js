
function baixar() {
    const url = document.getElementById('url').value;
    if (!url) {
        alert("Cole um link do TikTok!");
        return;
    }

    const resultado = document.getElementById('resultado');
    resultado.innerHTML = "<p>🔗 Gerando link de download...</p>";

    fetch(`https://api.tikmate.app/api/lookup?url=${encodeURIComponent(url)}`)
        .then(res => res.json())
        .then(data => {
            if (data.token) {
                const downloadUrl = `https://tikmate.app/download/${data.token}/${data.id}.mp4`;
                resultado.innerHTML = `<a href="${downloadUrl}" target="_blank">🎬 Baixar Vídeo sem Marca d'água</a>`;
            } else {
                resultado.innerHTML = "<p>❌ Erro ao gerar link. Verifique o link do TikTok.</p>";
            }
        })
        .catch(() => {
            resultado.innerHTML = "<p>❌ Erro na requisição. Tente novamente.</p>";
        });
}
