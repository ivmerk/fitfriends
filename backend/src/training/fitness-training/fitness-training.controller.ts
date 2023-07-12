import {
  Body,
  Controller,
  Get,
  HttpException,
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
import FitnessTrainongService from './fitness-training.service';
import CreateTrainingDto from './dto/create-training.dto';
import { ApiResponse } from '@nestjs/swagger';
import { fillObject } from 'src/common/helpers';
import { TrainingRdo } from './rdo/training.rdo';
import { UpdateUserDto } from 'src/users/fitness-user/dto/update-user.dto';
import { JwtAuthGuard } from 'src/users/fitness-user/guards/jwt-auth.guard';
import { RequestWithTokenPayload } from 'src/types/request-with-token-payloads';
import { UserRole } from 'src/types/user-role.enum';
import { AUTH_USER_ONLY_TRAINERS_PERMIT } from 'src/users/fitness-user/fitness-user.constant';
import { TrainingQuery } from './query/training.query';

@Controller('training')
export class FitnessTrainingController {
  constructor(
    private readonly fitnessTrainingService: FitnessTrainongService,
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new training has been successfully created.',
  })
  @UseGuards(JwtAuthGuard)
  @Post('/register')
  public async create(
    @Body() dto: CreateTrainingDto,
    @Req() { user: payload }: RequestWithTokenPayload,
  ) {
    if (payload.userRole !== UserRole.Trainer) {
      throw new HttpException(
        { status: HttpStatus.FORBIDDEN, error: AUTH_USER_ONLY_TRAINERS_PERMIT },
        HttpStatus.FORBIDDEN,
      );
    }
    const newTraining = await this.fitnessTrainingService.createTraining(dto);
    return fillObject(TrainingRdo, newTraining);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
    @Req() { user: payload }: RequestWithTokenPayload,
  ) {
    if (payload.userRole !== UserRole.Trainer) {
      throw new HttpException(
        { status: HttpStatus.FORBIDDEN, error: AUTH_USER_ONLY_TRAINERS_PERMIT },
        HttpStatus.FORBIDDEN,
      );
    }
    const updatedTraiding = await this.fitnessTrainingService.updateTraining(
      id,
      dto,
    );
    return fillObject(TrainingRdo, updatedTraiding);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/feed')
  public async feedLine(
    @Query(new ValidationPipe({ transform: true })) query: TrainingQuery,
    @Req() { user: payload }: RequestWithTokenPayload,
  ) {
    if (payload.userRole !== UserRole.Trainer) {
      throw new HttpException(
        { status: HttpStatus.FORBIDDEN, error: AUTH_USER_ONLY_TRAINERS_PERMIT },
        HttpStatus.FORBIDDEN,
      );
    }
    return await this.fitnessTrainingService.getTrainings(query, payload.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async show(@Param('id', ParseIntPipe) id: number) {
    const updatedTraiding = await this.fitnessTrainingService.getTraining(id);
    return fillObject(TrainingRdo, updatedTraiding);
  }
}
