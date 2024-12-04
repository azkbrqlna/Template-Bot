const command = require("./command");

class HaloCommand extends command {
  constructor(sock) {
    super("halo", "cek", ["hi"]);
    this.sock = sock;
  }

  async execute(message, args, sock) {
    try {
      const jid = message.key.remoteJid;

      // Balasan teks
      const response = "Halo! Ada yang bisa saya bantu? 😊";

      if (message.message?.imageMessage?.caption) {
        await sock.sendMessage(jid, { text: response });
      } else {
        // Jika tidak ada gambar, cukup balas pesan teks
        await sock.sendMessage(jid, { text: "https://github.com/azkbrqlna" });
      }

      const text = await sock.sendMessage(jid, { text: "hello!" }); // send a message
      await sock.sendMessage(jid, { delete: text.key });
    } catch (error) {
      console.error("Error in HaloCommand:", error);
    }
  }
}

module.exports = HaloCommand;
