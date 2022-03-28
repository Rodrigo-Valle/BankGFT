export const smtp = {
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    user: process.env.EMAIL,
    pass: process.env.PASSWORD_EMAIL
}