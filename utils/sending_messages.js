

const nodemailer = require('nodemailer');
require('dotenv').config(); 

const transporter = nodemailer.createTransport({
service: 'gmail',
auth: {
    user: process.env.NODEMAILER_EMAIL, 
    pass: process.env.NODEMAILER_PASS  
},
tls: {
    rejectUnauthorized: false
}

});

async function sendEmail({ to, subject, text, html }) {
    console.log(to)
try {
    const mailOptions = {
        from: process.env.NODEMAILER_EMAIL, 
        to,                                  
        subject,                             
        text,                               
        html                                 
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ', info.response);
    return info; 
} catch (error) {
    console.error('Error sending email: ', error);
    throw new Error('Error sending email');
}
}
const sendFeedbackRequestEmail = async (studentEmail, teacherName, lessonId) => {
    const feedbackFormLink = `http://localhost:5173/feedback?lessonId=${lessonId}`;
    
    const emailContent = `
        <p>Dear Student,</p>
        <p>We hope you enjoyed your recent lesson with ${teacherName}. Your feedback is important to us and will help us improve our teaching methods.</p>
        <p>Please take a moment to provide your feedback by completing the feedback form below:</p>
        <a href="${feedbackFormLink}">Feedback Form</a>
        <p>Thank you for your time and valuable input.</p>
    `;

    try {
        await sendEmail({
            to: studentEmail,
            subject: 'Feedback Request: Your Recent Lesson',
            html: emailContent
        });
        console.log('Feedback request email sent successfully');
    } catch (error) {
        console.error('Error sending feedback request email:', error);
    }
};
const sendZoomLessonInventation = async (emails,studentName,teacherName,joinUrl)=>
    {

        try{

            await sendEmail({
                to: emails,
                subject: `Welcome to the lesson `,
                html: `<p>Welcome to the lesson with teacher ${teacherName} and student ${studentName}.
                 Lesson zoom link: <br> ${joinUrl}</p>`
            });
        }
        catch(err)
        {
            console.log(err)
        }

    }
const sendNewLessonEmail = async (emails,teacherName,studentName,dateToSet)=>
    {
        // console.log(emails)
        try{

            await sendEmail({to:emails,subject: `new lesson shedulde`,
            html: `<p>A new lesson shedulde added with teacher 
            ${teacherName} with student ${studentName} on date 
            ${dateToSet.date.toLocaleDateString()} at hour ${dateToSet.date.toLocaleTimeString()}
            </p>` 
            
        });
    }
    catch(err)
    {
        console.log(err)
    }
}
const sendEmailRegisration = async (role,name)=>
    {
        try{

            await sendEmail({
                to: 'shlomomarachot@gmail.com',
                subject: 'Welcome to Our Website',
                html: `<h1>Welcome ${role} ${name}</h1><p>Thank you for registering to classMate!</p>`
                
              });   
            
        }
        catch(err)
        {
            console.log(err)
        }
        
    }
    const sendEmailCreatePasswoed = async (email)=>
        {
            try{
                // const newPasswordPageUrl = `http://localhost:5173/feedback?lessonId=${lessonId}`;

    
                await sendEmail({
                    to: email,
                    subject: 'create new password',
                     html: `<a href="${newPasswordPageLink}"></a>`

                    
                  });   
                
            }
            catch(err)
            {
                console.log(err)
            }
            
        }
    
    
    module.exports = {
        sendEmail,
        sendFeedbackRequestEmail,
        sendZoomLessonInventation,
        sendNewLessonEmail,
        sendEmailRegisration,
        sendEmailCreatePasswoed
      };

              




  