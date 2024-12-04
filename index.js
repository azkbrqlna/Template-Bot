const {
  DisconnectReason,
  makeWASocket,
  useMultiFileAuthState,
  Browsers,
} = require("@whiskeysockets/baileys");
const pino = require("pino");
const initializeCommands = require("./config");
const anticall = require("./src/events/__anticall");
async function connectToWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState("session");
  const sock = makeWASocket({
    logger: pino({ level: "fatal" }),
    auth: state,
    printQRInTerminal: true,
    defaultQueryTimeoutMs: undefined,
    keepAliveIntervalMs: 30000,
    shouldSyncHistoryMessages: () => false,
    markOnlineOnConnect: true,
    syncFullHistory: false,
    generateHighQualityLinkPreview: true,
    browser: Browsers.macOS("Edge"),
  });

  sock.ev.on("connection.update", ({ connection, lastDisconnect }) => {
    if (connection === "close") {
      const shouldReconnect =
        lastDisconnect.error?.output.statusCode !== DisconnectReason.loggedOut;
      if (shouldReconnect) {
        console.log("Menghubungkan ulang...");
        connectToWhatsApp();
      }
    }
    if (connection === "open") {
      console.log("Terhubung");
    }
  });
  sock.ev.on("creds.update", saveCreds);
  //anticall
  sock.ev.on("call", (call) => anticall(sock, call));
  //welcome in group
  sock.ev.on("group-participants.update", async (group) =>
    welcome(sock, group)
  );
  //cmds messages
  const commands = initializeCommands(sock);
  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (msg && msg.key && !msg.key.fromMe) {
      await sock.readMessages([msg.key]);

      for (const command of commands) {
        await command.handle(msg, sock);
      }
    }
  });
}

connectToWhatsApp();
