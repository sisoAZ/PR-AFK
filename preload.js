// preload.js

// Node.js の全 API は、プリロードプロセスで利用可能です。
// Chrome 拡張機能と同じサンドボックスも持っています。
const sleep = require('sleep-async')();
let textarea;

window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("login").addEventListener("click", () => {
        mail = document.getElementById("mail").value
        pass = document.getElementById("pass").value
        document.getElementById("mail").value = ""
        document.getElementById("pass").value = ""
        textarea = document.getElementById("log")
        const bot = require("./test_mineflayer").bot(mail, pass)

        bot.on("spawn", () => {
            log("Conncted Playerrealms")
            log("Logged in " + bot.username)
        })

        bot.once("spawn", () => {
            bot.chat("/realm");
        });

        bot.on("playerJoined", () => {
            update_players(bot.players)
        })

        bot.on("playerLeft", () => {
            update_players(bot.players)
        })

        bot.on("windowOpen", function (window) {
            sleep.sleep(1000, function () {
                //for (slot of window.slots) {
                //    log(slot)
                //    console.log(slot)
                //}
                console.log(window.slots[8])
                //if (window.slots[8] == null) {
                //    sleep.sleep(5000, () => {
                //        bot.chat("/realm")
                //    })
                //    return
                //}
                if (window.slots[8].name == "barrier") {
                    bot.clickWindow(1, 0, 0);
                    sleep.sleep(5000, () => {
                        bot.chat("/realm")
                    })
                }
                //if (window.slots[8].name == "iron_door") {
                //    bot.clickWindow(8, 0, 0);
                //}
            })
        })
        bot.on("message", function (msg) {
            const message = msg.toString();
            log(message)
        })

        bot.on("kicked", (err) => {
            console.log("KICKED LOG " + err)
            log("KICKED " + err)
        })

        bot.on("error", (err) => {
            console.log("ERROR LOG " + err)
            log("ERROR " + err)
        })

        bot.on("end", () => {
            log("BOT END")
        })

        document.getElementById("logout").addEventListener("click", () => {
            setTimeout(() => {
                bot.end()
            }, 1000);
            log("Logout")
        })
        
        document.getElementById("send").addEventListener("click", () => {
            msg = document.getElementById("chat").value
            console.log(msg)
            if (msg != "") { bot.chat(msg) }
            document.getElementById("chat").value = ""
        })
        
        document.getElementById("chat").addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                msg = document.getElementById("chat").value
                console.log(msg)
                if (msg != "") { bot.chat(msg) }
                document.getElementById("chat").value = ""
            }
        })
    })
})


async function log(text) {
    textarea.value += text + "\n"
    textarea.scrollTop = textarea.scrollHeight
}

async function update_players(player_list) {
    console.log(player_list)
    const ul = document.getElementById("player_list")
    ul.innerHTML = ""
    let player_size = 0
    for (player in player_list) {
        const li = document.createElement("li")
        player_size += 1
        li.innerHTML = player
        ul.appendChild(li)
    }
    document.getElementById("players").innerText = player_size
}