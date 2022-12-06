import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import path from 'path';

const hbs = require('nodemailer-express-handlebars');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'mn.acunab@gmail.com',
        pass: ''
    }
});

const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve('./src/views/'),
        defaultLayout: false
    },
    viewPath: path.resolve('./src/views/')
};

transporter.use('compile', hbs(handlebarOptions));

class EmailController {

    async sendEmailLottery(req: Request, res: Response) {

        const emailOptions = {
            from: 'info@gmail.com',
            to: 'mn.acunab@gmail.com',
            subject: 'Welcome!',
            template: 'email',
            context: {
                organizationName: 'Alaska',
                projectName: 'Projecto Gorila',
                taskType: 'Design',
                assignmentName: 'Commit refactory',
                completedUser: 'Jorge'
            }
        }
        await transporter.sendMail(emailOptions, function(error, info) {
            if(error) {
                console.log(error);
                return res.status(400).json({
                    ok: false,
                    msg: `Ocurrio un error: ${ error }`
                })
            }
            console.log('Message send: ' + info.response);
        });
        res.status(200).json({
            ok: true,
            msg: 'Se envio email?'
        })
    }
}

export default new EmailController();