import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Feedback} from './feedback.entity';
import {DeleteResult, Repository} from 'typeorm';
import {CreateFeedbackDto} from './feedback.dto';
import {ControllerExceptions} from "../valid/controller.valid";

@Injectable()
export class FeedbackService {
    constructor(
        @InjectRepository(Feedback)
        private readonly feedbackRepository: Repository<Feedback>,
        private readonly controllerExceptions: ControllerExceptions
    ) {
    }

    getFeedbacks(): Promise<Feedback[]> {
        return this.controllerExceptions
            .notUndefinedPromise(this.feedbackRepository.find(), 'feedbacks');
    }

    getFeedbackById(id: number): Promise<Feedback> {
        return this.controllerExceptions.notUndefinedPromise(this.feedbackRepository.findOne(id), 'feedback');
    }

    createFeedback(dto: CreateFeedbackDto): Promise<Feedback> {
        const feedback = this.feedbackRepository.create({
            estimation: dto.estimation,
            description: dto.description,
            date: new Date(),
        });
        return this.feedbackRepository.save(feedback);
    }

    deleteFeedbackById(id: number): Promise<DeleteResult> {
        return this.feedbackRepository.delete(id);
    }
}
