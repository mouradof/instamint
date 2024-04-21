import nodemailer from "nodemailer"

async function sendVerificationEmail(userEmail, token) {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "localhost",
        port: process.env.SMTP_PORT || 1025,
        secure: false,
    })

    const verificationUrl = `http://localhost:4002/auth/verify?token=${token}`

    await transporter.sendMail({
        from: "no-reply@yourapi.com",
        to: userEmail,
        subject: "Verify Your Email",
        html: `Click here to verify your email: <a href="${verificationUrl}">${verificationUrl}</a>`,
    })
}

export default sendVerificationEmail