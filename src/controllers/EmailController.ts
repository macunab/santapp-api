import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import path from 'path';
import { Lottery, Participant } from '../models/lottery.interface';

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

        const lottery: Lottery = req.body;
        const randomParticipants: Array<Participant> = lottery.participants.sort(() => Math.random() - 0.5);
        const matches = randomParticipants.map((value, index) => {
            return {
                santa: value,
                receiver: randomParticipants[index + 1] ? randomParticipants[index + 1].name : randomParticipants[0].name
            }
        })

        for(var match of matches) {
            const emailOptions = {
                from: 'santapp@gmail.com',
                to: match.santa.email,
                subject: 'Secret Santa Resultados',
                template: 'email',
                context: {
                    title: lottery.tittle,
                    santaName: match.santa.name,
                    receiver: match.receiver,
                }
            }
            await transporter.sendMail(emailOptions, function(error, info) {
                if(error) {
                    console.log(error);
                }
            })
        }
        res.status(200).json({
            ok: true,
            msg: 'the emails were sent successfully'
        })
    }
}

export default new EmailController();