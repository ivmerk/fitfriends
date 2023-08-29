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
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import FitnessTrainingService from './fitness-training.service';
import CreateTrainingDto from './dto/create-training.dto';
import { ApiResponse } from '@nestjs/swagger';
import { fillObject } from 'src/common/helpers';
import { TrainingRdo } from './rdo/training.rdo';
import { UpdateUserDto } from 'src/users/fitness-user/dto/update-user.dto';
import { JwtAuthGuard } from 'src/users/fitness-user/guards/jwt-auth.guard';
import { RequestWithTokenPayload } from 'src/types/request-with-token-payloads';
import { UserRole } from 'src/types/user-role.enum';
import { TrainingQuery } from './query/training.query';
import { Roles } from 'src/users/fitness-user/decorators/user-roles.decorator';
import { UserRolesGuard } from 'src/users/fitness-user/guards/user-roles.quard';
import { MAXIMUMPRICE, durationOfTraining } from 'src/common/constant.training';
import { CaloriesQtt } from 'src/common/constant.user';
import { Rating } from 'src/common/constant';
import { DEFAULT_USER_COUNT_LIMIT } from 'src/users/fitness-user/fitness-user.constant';

@Controller('training')
export class FitnessTrainingController {
  constructor(
    private readonly fitnessTrainingService: FitnessTrainingService,
  ) {}

  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.CREATED,
    description: 'The new training has been successfully created.',
  })
  @Roles(UserRole.Trainer)
  @UseGuards(UserRolesGuard)
  @Post('/register')
  public async create(@Body() dto: CreateTrainingDto) {
    const newTraining = await this.fitnessTrainingService.createTraining(dto);
    return fillObject(TrainingRdo, newTraining);
  }

  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.OK,
    description: 'The training has been successfully updates.',
  })
  @Roles(UserRole.Trainer)
  @UseGuards(UserRolesGuard)
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

  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.OK,
    description: 'The training list has been successfully created.',
  })
  @Roles(UserRole.Trainer)
  @UseGuards(UserRolesGuard)
  @Get('/feed')
  public async feedLine(
    @Query(new ValidationPipe({ transform: true })) query: TrainingQuery,
    @Req() { user: payload }: RequestWithTokenPayload,
  ) {
    const trainings = await this.fitnessTrainingService.getTrainings(
      query,
      payload.sub,
    );
    return { ...fillObject(TrainingRdo, trainings) };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/bytrainer/:id')
  public async showByTrainer(@Param('id', ParseIntPipe) id: number) {
    const trainings = await this.fitnessTrainingService.getTrainingsFromTrainer(
      id,
    );
    return { ...fillObject(TrainingRdo, trainings) };
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async show(@Param('id', ParseIntPipe) id: number) {
    const updatedTraiding = await this.fitnessTrainingService.getTraining(id);
    return fillObject(TrainingRdo, updatedTraiding);
  }
}
