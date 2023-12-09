import {Entity, model, property} from '@loopback/repository';

@model()
export class LoginCredentialsDto extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  constructor(data?: Partial<LoginCredentialsDto>) {
    super(data);
  }
}
