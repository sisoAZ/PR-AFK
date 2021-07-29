const mineflayer = require("mineflayer")

const createBot = (mail = null, pass = null) => {
    return mineflayer.createBot({
        host: "playerrealms.com",
        port: 25565,
        username: mail,
        password: pass,
        version: "1.12.2"
    })
}

module.exports.bot = createBot