const nodemailer = require("nodemailer");

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false, 
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASS,
  },
})

// make function 
async function varificationEmail(email,token){
try {
  const info = await transporter.sendMail({
    from: 'hanif007.dev@gmail.com', 
    to: email, 
    subject: "please verify your email ", 
    html: `<b> Verify your email <a href="http://localhost:5173/verify/${token}" >Click Here</a></b>`
  });

  console.log("Message sent: %s", info.messageId);
  // Preview URL is only available when using an Ethereal test account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
} catch (err) {
  console.error("Error while sending mail:", err);
}
}
// make functionn for fogerpassword reset by email
async function forgetPasswordEmail(email,token){
try {
  const info = await transporter.sendMail({
    from: 'hanif007.dev@gmail.com', 
    to: email, 
    subject: "please reset your password ", 
    html: `<b> For reseting password <a href="http://localhost:5173/resetpassword/${token}" >Click Here</a></b>`
  });

  console.log("Message sent: %s", info.messageId);
  // Preview URL is only available when using an Ethereal test account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
} catch (err) {
  console.error("Error while sending mail:", err);
}
}

module.exports= {varificationEmail,forgetPasswordEmail}
