const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const Topgg = require('@top-gg/sdk');

const client = new Client({ 
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.DirectMessages] 
});

const webhook = new Topgg.Webhook(process.env.TOPGG_AUTH);

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

    try {
        // Manually check the authorization header to avoid the SDK crash
        const auth = req.headers.authorization;
        if (auth !== process.env.TOPGG_AUTH) {
            return res.status(401).send('Unauthorized');
        }

        const vote = req.body;

        // Login and send DM
        await client.login(process.env.DISCORD_TOKEN);
        const user = await client.users.fetch(vote.user);
        
        if (user) {
            // Create the Embed
            const voteEmbed = new EmbedBuilder()
                .setTitle(`Thank you for voting for Aurora`)
                .setDescription("Thanks for voting for me in top.gg! Your vote means a lot to me, it lets me grow even more so if you're free after 12 hours, please [vote](https://top.gg/bot/1483861970242502686/vote) for me <:milk_heart:1479726148740055184>")
                .setFooter({ 
                    text: new Date().toLocaleString(), 
                    iconURL: user.displayAvatarURL({ dynamic: true }) 
                });

            // Send the ping and the embed
            await user.send({ 
                content: `<@${user.id}>`, 
                embeds: [voteEmbed] 
            });
        }

        // Vercel-friendly response
        return res.status(200).send({ message: 'OK' });
        
    } catch (error) {
        console.error('Webhook Error:', error);
        return res.status(500).send({ error: error.message });
    }
};
