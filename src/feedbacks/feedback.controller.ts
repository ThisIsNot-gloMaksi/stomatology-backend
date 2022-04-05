import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post} from '@nestjs/common';
import {FeedbackService} from './feedback.service';
import {CreateFeedbackDto} from './feedback.dto';
import {ApiBody, ApiCreatedResponse, ApiParam, ApiTags,} from '@nestjs/swagger';
import {Feedback} from './feedback.entity';
import {DeleteDto} from "../utils/result.dto";

@ApiTags('feedbacks')
@Controller('api/v1/feedbacks')
export class FeedbackController {
    constructor(private readonly feedbackService: FeedbackService) {
    }

    @Get()
    @ApiCreatedResponse({type: Feedback, isArray: true, description: 'Отзывы'})
    getFeedbacks() {
        return this.feedbackService.getFeedbacks();
    }

    @Get(':id')
    @ApiParam({name: 'id', description: 'id отзыва'})
    @ApiCreatedResponse({type: Feedback, description: 'Отзыв'})
    getFeedbackById(@Param('id', ParseIntPipe) id: number) {
        return this.feedbackService.getFeedbackById(id);
    }

    @Post()
    @ApiBody({description: 'Отзыв', type: CreateFeedbackDto})
    @ApiCreatedResponse({type: Feedback, description: 'Отзыв'})
    createFeedback(@Body() dto: CreateFeedbackDto) {
        return this.feedbackService.createFeedback(dto);
    }

    @Delete(':id')
    @ApiParam({name: 'id', description: 'id отзыва'})
    @ApiCreatedResponse({type: DeleteDto, description: 'Результат удаления'})
    deleteById(@Param('id', ParseIntPipe) id: number) {
        return this.feedbackService.deleteFeedbackById(id);
    }
}
