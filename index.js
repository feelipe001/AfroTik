
require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text && text.includes('tiktok.com')) {
        bot.sendMessage(chatId, '🔗 Processando seu link...');

        try {
            const response = await axios.get(`https://www.tikwm.com/api/?url=${text}`);
            const result = response.data;

            if (result && result.data && result.data.play) {
                await bot.sendVideo(chatId, result.data.play, {
                    caption: "Aqui está seu vídeo sem marca d'água!\n\nAproveita e confere nossos outros serviços:",

🔥 Aproveita e confere nossos outros serviços:",
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "🎬 Filmes Grátis (UnitTV)", url: "https://links.unitvnet.app/IAFLDMW" }],
                            [{ text: "📲 Baixar Vídeos do Instagram (AfroInsta)", url: "https://t.me/AfroinstaDownloaderBot" }],
                            [{ text: "🎨 Wallpapers Top (AfroWallpapers)", url: "https://afrowallpapers.site" }]
                        ]
                    }
                });
            } else {
                bot.sendMessage(chatId, '❌ Erro ao obter o vídeo. Verifique o link e tente novamente.');
            }
        } catch (error) {
            console.error(error);
            bot.sendMessage(chatId, '❌ Erro na requisição. Tente novamente mais tarde.');
        }
    } else {
        bot.sendMessage(chatId, '🚀 Envie um link válido do TikTok para baixar o vídeo sem marca d'água.');
    }
});
