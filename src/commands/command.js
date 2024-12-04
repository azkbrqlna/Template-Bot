class Command {
  constructor(name, desc = "", alias = []) {
    this.prefix = ["!", ".", "/", "#"]; // Daftar prefix yang didukung
    this.name = name;
    this.desc = desc;
    this.alias = alias.length > 0 ? [name, ...alias] : [name];
  }

  async handle(message, sock) {
    const body =
      message.message?.conversation ||
      message.message?.extendedTextMessage?.text ||
      message.message?.imageMessage?.caption;

    if (!body) return;

    const prefix = body[0];
    const argAll = body.slice(1).split(" "); // Menghapus prefix dari pesan

    if (this.prefix.includes(prefix)) {
      const cmdNoPrefix = argAll[0].toLowerCase();
      if (this.alias.includes(cmdNoPrefix)) {
        const args = argAll.slice(1); // Ambil argumen setelah perintah
        await this.execute(message, args, sock);
      }
    }
  }
}

module.exports = Command;
