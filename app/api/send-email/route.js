import nodemailer from 'nodemailer';

export async function POST(request) {
  const { name, email, phone, message } = await request.json();

  // Create a transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Gmail SMTP server
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'sasitharani@gmail.com', // Replace with your email
      pass: 'xwwhhaozejfdiavv', // Replace with your Google App Password
    },
  });

  // Create the HTML content for the email
  const htmlContent = `
    <h2>You have got an enquiry from Insphile website</h2>
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Field</th>
        <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Details</th>
      </tr>
      <tr>
        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Name</td>
        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${name}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Email</td>
        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${email}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Phone</td>
        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${phone}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Message</td>
        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${message}</td>
      </tr>
    </table>
  `;

  // Send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Insphile Support" <sasitharani@gmail.com>', // Replace with your email
    to: "hrd@insphile.in, sasitharani@gmail.com",
    subject: "New Enquiry from Insphile Website",
    html: htmlContent,
  });

  return new Response(JSON.stringify({ message: 'Email sent successfully' }), { status: 200 });
}