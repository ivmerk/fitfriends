import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import FitnessTrainongService from './fitness-training.service';
import CreateTrainingDto from './dto/create-training.dto';
import { ApiResponse } from '@nestjs/swagger';
import { fillObject } from 'src/common/helpers';
import { TrainingRdo } from './rdo/training.rdo';
import { UpdateUserDto } from 'src/users/fitness-user/dto/update-user.dto';
import { JwtAuthGuard } from 'src/users/fitness-user/guards/jwt-auth.guard';

@Controller('training')
export class FitnessTrainingController {
  constructor(
    private readonly fitnessTrainingService: FitnessTrainongService,
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new training has been successfully created.',
  })
  @Post('/register')
  public async create(@Body() dto: CreateTrainingDto) {
    const newTraining = await this.fitnessTrainingService.createTraining(dto);
    return fillObject(TrainingRdo, newTraining);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
  ) {
    const updatedTraiding = await this.fitnessTrainingService.updateTraining(
      id,
      dto,
    );
    return fillObject(TrainingRdo, updatedTraiding);
  }

  @Get(':id')
  public async show(@Param('id', ParseIntPipe) id: number) {
    const updatedTraiding = await this.fitnessTrainingService.getTraining(id);
    return fillObject(TrainingRdo, updatedTraiding);
  }

  // @Get('/feed')
  // public async feedLine(
  //   @Query(new ValidationPipe({transform: true})) query)
  // )
}
