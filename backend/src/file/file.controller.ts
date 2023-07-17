import {
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  MAXIMUM_USER_AVATAR_FILE_SIZE,
  userAvatarTypes,
} from 'src/common/constant.user';
import { TOO_BIG_FILE, WRONG_FILE_TYPE } from './file.constant';
import { trainingVideoTypes } from 'src/common/constant.training';
import { FileService } from './file.service';
import uploaderConfig from 'src/config/uploader.config';
import { ConfigType } from '@nestjs/config';
import { fillObject } from 'src/common/helpers';
import { UploadedFileRdo } from './rdo/uploaded-file.rdo';

@Controller('files')
export class FileController {
  constructor(
    private readonly fileService: FileService,

    @Inject(uploaderConfig.KEY)
    private readonly applicationConfig: ConfigType<typeof uploaderConfig>,
  ) {}

  @Post('/upload/video')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadVideoFile(@UploadedFile() file: Express.Multer.File) {
    const fileType = file.originalname.slice(
      file.originalname.lastIndexOf('.') + 1,
    );
    if (!trainingVideoTypes.includes(fileType)) {
      throw new HttpException(
        { status: HttpStatus.NOT_ACCEPTABLE, error: WRONG_FILE_TYPE },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    const newFile = await this.fileService.saveFile(file);
    const path = `${this.applicationConfig.serveRoot}${newFile.path}`;
    return fillObject(UploadedFileRdo, Object.assign(newFile, { path }));
  }

  @Post('/upload/avatar')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadImageFile(@UploadedFile() file: Express.Multer.File) {
    const fileType = file.originalname.slice(
      file.originalname.lastIndexOf('.') + 1,
    );
    if (file.size > MAXIMUM_USER_AVATAR_FILE_SIZE) {
      throw new HttpException(
        { status: HttpStatus.NOT_ACCEPTABLE, error: TOO_BIG_FILE },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    if (!userAvatarTypes.includes(fileType)) {
      throw new HttpException(
        { status: HttpStatus.NOT_ACCEPTABLE, error: WRONG_FILE_TYPE },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    const newFile = await this.fileService.saveFile(file);
    const path = `${this.applicationConfig.serveRoot}${newFile.path}`;
    return fillObject(UploadedFileRdo, Object.assign(newFile, { path }));
  }
}
