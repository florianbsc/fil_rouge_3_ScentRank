import {Controller, Get} from '@nestjs/common';

@Controller('parfums')
export class ParfumsController {

    @Get()
    findAll() {
        return 'Liste des parfums';
    }
}
