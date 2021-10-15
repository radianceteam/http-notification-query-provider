import { ApiProperty } from "@nestjs/swagger";

export class SubscribeDto {

    @ApiProperty({example: 'token', description: 'validate token'})
    readonly token: string;

    @ApiProperty({example: 'parametr', description: 'Free Ton parametr parametr'})
    readonly parametr: string;

    @ApiProperty({example: 'wallet', description: 'wallet Free Tom subscribe'})
    readonly wallet: string;

    @ApiProperty({example: 'email', description: 'metod subscribe service'})
    readonly metod: string;

    @ApiProperty({example: 'sendto', description: 'Send to metod adres'})
    readonly sendto: string;
    

  }