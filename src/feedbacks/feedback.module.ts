import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Feedback} from './feedback.entity';
import {FeedbackController} from './feedback.controller';
import {FeedbackService} from './feedback.service';
import {ControllerExceptions} from "../valid/controller.valid";

@Module({
    imports: [TypeOrmModule.forFeature([Feedback])],
    controllers: [FeedbackController],
    providers: [FeedbackService, ControllerExceptions],
})
export class FeedbackModule {
}
