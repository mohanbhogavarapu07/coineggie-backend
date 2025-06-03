import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendNewsletterEmail = async (subscriberEmail, newsletterContent) => {
  const mailOptions = {
    from: {
      name: 'Krishna Kumar',
      address: process.env.EMAIL_USER
    },
    to: subscriberEmail,
    subject: 'New Newsletter Available!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #333; margin-bottom: 10px;">New Newsletter Available!</h1>
          <div style="height: 2px; background-color: #e0e0e0; margin: 20px 0;"></div>
        </div>
        <div style="color: #444; line-height: 1.6;">
          ${newsletterContent}
        </div>
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center;">
          <p style="color: #666; font-size: 14px;">Visit our website to read the full newsletter.</p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending newsletter email:', error);
    return false;
  }
};

const sendContactFormEmail = async (contactDetails) => {
  const mailOptions = {
    from: {
      name: 'Krishna Kumar Website',
      address: process.env.EMAIL_USER
    },
    to: process.env.OWNER_EMAIL,
    subject: 'New Contact Form Submission',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #333; margin-bottom: 10px;">New Contact Form Submission</h1>
          <div style="height: 2px; background-color: #e0e0e0; margin: 20px 0;"></div>
        </div>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
          <div style="margin-bottom: 15px;">
            <h3 style="color: #444; margin: 0 0 5px 0; font-size: 16px;">Name</h3>
            <p style="color: #666; margin: 0; font-size: 15px;">${contactDetails.name}</p>
          </div>
          
          <div style="margin-bottom: 15px;">
            <h3 style="color: #444; margin: 0 0 5px 0; font-size: 16px;">Email</h3>
            <p style="color: #666; margin: 0; font-size: 15px;">
              <a href="mailto:${contactDetails.email}" style="color: #0066cc; text-decoration: none;">
                ${contactDetails.email}
              </a>
            </p>
          </div>
          
          <div>
            <h3 style="color: #444; margin: 0 0 5px 0; font-size: 16px;">Message</h3>
            <div style="color: #666; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">
              ${contactDetails.message}
            </div>
          </div>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center;">
          <p style="color: #666; font-size: 14px;">
            This message was sent from the contact form on your website.
          </p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending contact form email:', error);
    return false;
  }
};

export const sendAssessmentResultsEmail = async ({ to, name, assessmentType, results }) => {
  try {
    const assessmentNames = {
      'entrepreneurial-potential': 'Entrepreneurial Potential Assessment',
      'productivity-style': 'Productivity Style Quiz',
      'emotional-intelligence': 'Emotional Intelligence (EQ) Evaluator',
      'resilience-score': 'Resilience Score Analyzer',
      'leadership-archetype': 'Leadership Archetype Assessment',
      'burnout-risk': 'Burnout Risk Assessment',
      'mental-fitness-index': 'Mental Fitness Index'
    };

    const assessmentName = assessmentNames[assessmentType] || assessmentType;

    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Your ${assessmentName} Results</h2>
        <p>Dear ${name},</p>
        <p>Thank you for completing the ${assessmentName}. Here are your results:</p>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          ${results}
        </div>
        <p>If you have any questions about your results, please don't hesitate to reach out.</p>
        <p>Best regards,<br>Your Assessment Team</p>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: `Your ${assessmentName} Results`,
      html: emailContent
    });
    return true;
  } catch (error) {
    console.error('Error sending assessment results email:', error);
    return false;
  }
};

export const sendAssessmentPDFEmail = async ({ to, assessmentType, pdfBuffer }) => {
  try {
    const assessmentNames = {
      'entrepreneurial-potential': 'Entrepreneurial Potential Assessment',
      'productivity-style': 'Productivity Style Quiz',
      'emotional-intelligence': 'Emotional Intelligence (EQ) Evaluator',
      'resilience-score': 'Resilience Score Analyzer',
      'leadership-archetype': 'Leadership Archetype Assessment',
      'burnout-risk': 'Burnout Risk Assessment',
      'mental-fitness-index': 'Mental Fitness Index'
    };

    const assessmentName = assessmentNames[assessmentType] || assessmentType;

    const mailOptions = {
      from: {
        name: 'Krishna Kumar',
        address: process.env.EMAIL_USER
      },
      to,
      subject: `Your ${assessmentName} Results`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">Your ${assessmentName} Results</h2>
          <p>Thank you for completing the ${assessmentName}. Please find your detailed results attached to this email.</p>
          <p>If you have any questions about your results, please don't hesitate to reach out.</p>
          <p>Best regards,<br>Your Assessment Team</p>
        </div>
      `,
      attachments: [
        {
          filename: `${assessmentType}-results.pdf`,
          content: pdfBuffer
        }
      ]
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending assessment PDF email:', error);
    return false;
  }
};

export {
  sendNewsletterEmail,
  sendContactFormEmail
}; 