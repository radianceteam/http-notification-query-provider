import { ApiProperty } from "@nestjs/swagger";

export class MessageQueryDto {

    @ApiProperty({example: '1', description: 'Hash user provaider'})
    readonly hash: string;

    @ApiProperty({example: 'nonce', description: 'Client nonce'})
    readonly nonce: string;

    @ApiProperty({example: 'message', description: 'Client Message'})
    readonly message: string;


    @ApiProperty({example: 'message', description: 'Client Message'})
    readonly key: string;



  }