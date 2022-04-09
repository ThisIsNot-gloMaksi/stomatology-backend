import {ApiProperty} from "@nestjs/swagger";

export class DeleteDto {
    @ApiProperty()
    raw: string[];
    @ApiProperty()
    affected: number
}

export class UpdateDto {
    @ApiProperty()
    generatedMaps: string[];
    @ApiProperty()
    raw: string[];
    @ApiProperty()
    affected: number
}
