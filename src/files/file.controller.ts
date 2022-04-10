import {Controller, Get, Param, Post, Res, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express';
import {diskStorage} from 'multer';
import {editFileName, imageFileFilter} from '../utils/file-upload.utils';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {JwtAuthGuard} from '../auth/guard/jwt.guard';

@ApiTags('files')
@Controller('api/v1/files')
export class FileController {

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('upload')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './files',
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        }),
    )
    uploadedFile(@UploadedFile() file) {
        return {
            originalName: file.originalname,
            fileName: file.filename,
        };
    }

    @Get(':img-path')
    getFile(@Param('img-path') image, @Res() res) {
        return res.sendFile(image, {root: './files'});
    }
}
