import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Feedback} from './feedback.entity';
import {DeleteResult, Repository} from 'typeorm';
import {CreateFeedbackDto} from './feedback.dto';

@Injectable()
export class FeedbackService {
    constructor(
        @InjectRepository(Feedback)
        private readonly feedbackRepository: Repository<Feedback>,
    ) {
    }

    getFeedbacks(): Promise<Feedback[]> {
        return this.feedbackRepository.find();
    }

    getFeedbackById(id: number): Promise<Feedback> {
        return this.feedbackRepository.findOne(id);
    }

    createFeedback(dto: CreateFeedbackDto) {
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
