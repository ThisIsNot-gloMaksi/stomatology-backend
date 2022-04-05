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

    async getFeedbacks(): Promise<Feedback[]> {
        return await this.controllerExceptions
            .notUndefinedItem(this.feedbackRepository.find(), 'feedbacks');
    }

    async getFeedbackById(id: number): Promise<Feedback> {
        return this.controllerExceptions.notUndefinedItem(this.feedbackRepository.findOne(id), 'feedback');
    }

    async createFeedback(dto: CreateFeedbackDto): Promise<Feedback> {
        const feedback = this.feedbackRepository.create({
            estimation: dto.estimation,
            description: dto.description,
            date: new Date(),
        });
        return await this.feedbackRepository.save(feedback);
    }

    async deleteFeedbackById(id: number): Promise<DeleteResult> {
        return await this.feedbackRepository.delete(id);
    }
}
