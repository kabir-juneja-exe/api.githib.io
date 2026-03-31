const { Client, GatewayIntentBits } = require('discord.js');
const Topgg = require('@top-gg/sdk');

// Initialize the Discord Client with needed Intents
const client = new Client({ 
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.DirectMessages] 
});

const webhook = new Topgg.Webhook(process.env.TOPGG_AUTH);

module.exports = async (req, res) => {
    // Top.gg sends a POST request
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

    try {
        // Use the Top.gg SDK to parse the vote and check the password
        const vote = await webhook.listener((vote) => vote)(req, res, () => {});

        // Login to Discord to send the DM
        await client.login(process.env.DISCORD_TOKEN);

        // Fetch the user who voted
        const user = await client.users.fetch(vote.user);
        
        if (user) {
            await user.send("Thanks for voting! You're a legend. 🚀");
            console.log(`Successfully DMed ${user.tag}`);
        }

        res.status(200).send('Webhook Received');
    } catch (error) {
        console.error('Webhook Error:', error);
        res.status(500).send('Internal Server Error');
    }
};

