import {inject, service} from '@loopback/core';
import {
  post,
  requestBody,
  response,
  Request,
  RestBindings,
  Response,
} from '@loopback/rest';
import {FileService} from '../services';

export class FileController {
  constructor(
    @service(FileService)
    public fileService: FileService,
  ) {}

  @post('/files/single')
  @response(204)
  async uploadSingle(
    @requestBody.file() request: Request,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ): Promise<void> {
    await this.fileService.uploadSingle(request, response);
  }

  @post('/files/multiple')
  @response(204)
  async uploadMultiple(
    @requestBody.file() request: Request,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ): Promise<void> {
    await this.fileService.uploadMultiple(request, response);
  }
}
