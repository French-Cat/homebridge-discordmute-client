const RPC = require("discord-rpc");
const client = new RPC.Client({ transport: "ipc" });

client.on("ready", async function () {
    require('http').createServer(async function (req, res) {
        if (req.url == "/mute") {
            const data = await client.getVoiceSettings()
            client.setVoiceSettings({
                mute: !data.mute,
            });
            res.writeHead(200)
            res.end("200")
            return
        }
        if (req.url == "/deaf") {
            const data = await client.getVoiceSettings()
            client.setVoiceSettings({
                deaf: !data.deaf,
            });
            res.writeHead(200)
            res.end("200")
            return
        }
        if (req.url = "/status") {
            const data = await client.getVoiceSettings()
            res.writeHead(200)
            res.end(JSON.stringify({mute: data.mute, deaf: data.deaf}))
            return
        }
        res.writeHead(404);
        res.end("404");
    }).listen(1337);
})

function login() {
    const config = require("./config.json")
    client.login({
        clientId: config.discordID.toString(),
        clientSecret: config.discordSecret.toString(),
        scopes: ["rpc", "rpc.voice.write"],
        redirectUri: `http://localhost:1337`
    });
}

client.on("disconnected", login)

login()