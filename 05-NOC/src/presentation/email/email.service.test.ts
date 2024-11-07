import nodemailer from 'nodemailer';
import { EmailService, SendMailOptions } from "./email.service";




describe('email.service.test', () => {

    
    const mockSendMail = jest.fn();
    
    // mock al create transport 
    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendMail
    })
    const emailService = new EmailService();
    
    test('should should send email', async() => { 
        

        const options: SendMailOptions ={
            to: 'test@example.com',
            subject: 'test message',
            htmlBody: '<h1>test message</h1>'
        }

         await emailService.sendEmail(options);

        expect( mockSendMail ).toHaveBeenCalledWith({
            "attachments": expect.any(Array),
            "html": "<h1>test message</h1>",
            "subject": "test message",
            "to": "test@example.com",
        })
     })

     test('should send email with attachments', async() => { 

        const email = 'test@example.com'

        await emailService.sendEmailWithFileSystemLogs(email);

        expect( mockSendMail ).toHaveBeenCalledWith({
            to: email,
            subject: "test message",
            html: '<h1>test message</h1>',
            attachments: expect.arrayContaining([
                
            ]) 

        })
      })
});