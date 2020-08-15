import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { join } from 'path';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('uploads/:name')
    servieFile(@Param('name') name: string, @Res() res: Response) {
        // console.log(``)
        res.contentType('png');
        res.sendFile(name, { root: 'uploads' });
    }
}
