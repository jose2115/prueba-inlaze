import nodemailer from 'nodemailer'

const sendEmail = async (data) => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // const testAccount = await nodemailer.createTestAccount()

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.googlemail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'xxxxxx@gmail.com', // generated ethereal user
      pass: '1234' // generated ethereal password
    }
  })

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: data.from, // sender address
    to: data.to, // list of receivers
    subject: data.subject, // Subject line
    html: data.html // html body
  })

  // console.log('Message sent: %s', info.messageId)
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  return true
}

export default {
  sendEmail
}
