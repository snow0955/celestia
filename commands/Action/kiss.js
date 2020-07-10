const Command = require('../../base/Command.js');
const request = require('node-superfetch');
const { IMGUR_KEY, KISS_ALBUM_ID } = process.env; 

class Kiss extends Command {
    constructor(client) {
        super(client, {
            name: 'kiss',
            description: 'Kisses the user you mentioned!',
            category: 'Action',
            usage: 'kiss <@USER_MENTION>',
            guildOnly: true,
            aliases: ['smooch']
        });
        this.cache = null;
    }

    async run(message) {
        let user = message.mentions.members.first() 

        if (!user || !args[1]) {
            return message.reply('Command Usage: `kiss <@USER_MENTION>`')
        }

        const image = await this.random();
        if (!image) return message.reply('This album has no images...');
        return message.channel.send(`_**${message.author.username}** kisses **${user.username}**._`, { files: [image] });

    }

    async random() {
        if (this.cache) return this.cache[Math.floor(Math.random() * this.cache.length)];
        const { body } = await request
            .get(`https://api.imgur.com/3/album/${KISS_ALBUM_ID}`)
            .set({ Authorization: `Client-ID ${IMGUR_KEY}` });
        if (!body.data.images.length) return null;
        this.cache = body.data.images.map(image => image.link);
        setTimeout(() => { this.cache = null; }, 3.6e+6);
        return body.data.images[Math.floor(Math.random() * body.data.images.length)].link;
    }
};

module.exports = Kiss;