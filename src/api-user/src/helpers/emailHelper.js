import nodemailer from "nodemailer"

async function sendVerificationEmail(userEmail, token) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "localhost",
    port: process.env.SMTP_PORT || 1025,
    secure: false,
  })

  const verificationUrl = `http://localhost:4000/auth/verify?token=${token}`

  const mailOptions = {
    from: "no-reply@yourapi.com",
    to: userEmail,
    subject: "Verify Your Email",
    html: `<p>Click here to verify your email: <a href="${verificationUrl}">${verificationUrl}</a></p>`,
  }

  await transporter.sendMail(mailOptions)
}

export default sendVerificationEmail