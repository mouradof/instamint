import nodemailer from "nodemailer"

async function sendVerificationEmail(userEmail, token) {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "localhost",  // Use MailHog address from Docker Compose
        port: process.env.SMTP_PORT || 1025,         // Default MailHog SMTP port
        secure: false,  // True for 465, false for other ports. MailHog does not use SSL.
        // Remove auth object if MailHog does not require authentication
    })

    const verificationUrl = `http://localhost:4002/auth/verify?token=${token}`

    await transporter.sendMail({
        from: "no-reply@yourapi.com",  // Make sure this matches your MailHog configuration
        to: userEmail,
        subject: "Verify Your Email",
        html: `Click here to verify your email: <a href="${verificationUrl}">${verificationUrl}</a>`,
    })
}

export default sendVerificationEmail