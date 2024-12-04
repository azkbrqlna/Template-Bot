const command = require("./command");
const path = require("path");

class HandleMenu extends command {
  constructor(sock) {
    super("menu", "menampilkan menu", ["menu"]);
    this.sock = sock;
  }

  async execute(message, args, sock) {
    try {
      const jid = message.key.remoteJid;

      const text = `HALO SEMUANYA WELCOME TO MENU ELAINA

Create by Azkbrqlna
-->masih dalam pengembangan<--

PREFIX = [ ! , . , / , # ]

╭─「 *MENU ADMIN* 」
│ • .antitoxic <on/off> = jaga ketikan
│ • .promote @member = menaikan jabatan
│ • .demote @member = mengkudeta
╰───────────>

╭─「 *MENU SEMUANYA* 」
│ • .ai <text> = tanyakan kepada AI
│ • .hidetag = tag semua orang 
│ • .sticker = membuat sticker
╰───────────>
`;
      const image = path.join(__dirname, "../image/Elaina.jpg");
      await sock.sendMessage(jid, {
        image: { url: image },
        caption: text,
      });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = HandleMenu;
