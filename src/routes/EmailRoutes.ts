import { Application } from "express";
import EmailController from "../controllers/EmailController";
import { CommonRoutesConfig } from "../helpers/CommonRoutesConfig"


export class EmailRoutes extends CommonRoutesConfig {

    constructor(app: Application) {
        super(app, 'EmailRoute');
    }

    configureRoutes(): Application {

        this.app.route('/api/send')
            .get(
                EmailController.sendEmailLottery
            )
        
        return this.app;
    }
}