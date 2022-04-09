import {Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors} from '@nestjs/common';
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {editFileName, imageFileFilter} from "../utils/file-upload.utils";


@Controller('api/v1/files')
export class FileController {

    @Post("upload")
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
    seeUploadedFile(@Param('img-path') image, @Res() res) {
        return res.sendFile(image, {root: './files'});
    }
}
