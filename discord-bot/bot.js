const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const getServerInfo = require('./serverInfo');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', () => {
    console.log('Ready!');
    //client.user.setPresence({ activities: [{ name: `'with discord.js'` }], status: 'online' });
    updateBotActivity();
});

client.on('messageCreate', async message => {
    if (message.content === '!serverinfo') {
        try {
            const data = await getServerInfo();
            const serverInfoEmbed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Server Information')
                .addFields(
                    { name: 'Server Name', value: data.hostname, inline: true },
                    { name: 'Players Online', value: `${data.online}/${data.maxplayers}`, inline: true },
                    { name: 'Address', value: "195.18.27.241:1606", inline: true}
                );
            message.channel.send({ embeds: [serverInfoEmbed] });
        } catch (error) {
            console.error('Error fetching server data:', error);
            message.channel.send('Sorry, I could not fetch the server data.');
        }
    }

    if (message.content === '!players') {
        try {
            const data = await getServerInfo();
            if (data.online > 0) {
                const playerListEmbed = new EmbedBuilder()
                    .setColor('#0099ff')
                    .setTitle('Текущие игроки онлайн')
                    .setDescription(data.players.map(player => `**${player.name} [${player.id}]**`).join('\n'));
                message.channel.send({ embeds: [playerListEmbed] });
            } else {
                message.channel.send('В настоящее время ни один игрок не находится онлайн.');
            }
        } catch (error) {
            console.error('Error fetching player data:', error);
            message.channel.send('Sorry, I could not fetch the player data.');
        }
    }
    if (message.content === '!ip') {
        try {
            const data = await getServerInfo();
            const serverIpEmbed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Faze DeathMatch')
                .addFields(
                    { name: 'Address', value: "195.18.27.241:1606", inline: true},
                    { name: 'Online', value: `${data.online}/${data.maxplayers}`, inline: true }
                );
            message.channel.send({ embeds: [serverIpEmbed] });
        } catch (error) {
            console.error('Error fetching server data:', error);
            message.channel.send('Sorry, I could not fetch the server data.');
        }
    }
});

async function updateBotActivity() {
    try {
        const data = await getServerInfo();
        client.user.setPresence({ activities: [{ name: `Faze DM [${data.online}/${data.maxplayers}]` }], status: 'online' });
    } catch (error) {
        console.error('Error updating bot activity:', error);
    } finally {
        setTimeout(updateBotActivity, 60000); // Обновляем статус каждую минуту (60000 миллисекунд)
    }
}


client.login('MTI2MDU5MTgxMTE0ODEyMDA2NA.GWscCZ.17pBJJYlF80KxmI33iRHplN-ATZ084f9E9HDIg');