const nodemailer = require("nodemailer");

class MailService {
  transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587, // TLS
      secure: false,
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASS,
      },
    });
  }

  async sendMail(to, subject, html) {
    const result = await this.transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to,
      subject,
      html,
    });
    console.log(result);
  }
}

module.exports = new MailService();
