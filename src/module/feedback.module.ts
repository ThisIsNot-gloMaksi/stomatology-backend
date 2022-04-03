import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Feedback} from '../entity/feedback.entity';
import {FeedbackController} from '../controller/feedback.controller';
import {FeedbackService} from '../service/feedback.service';

@Module({
    imports: [TypeOrmModule.forFeature([Feedback])],
    controllers: [FeedbackController],
    providers: [FeedbackService],
})
export class FeedbackModule {
}
