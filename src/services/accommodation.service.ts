import { inject } from '@loopback/core';
import { repository } from '@loopback/repository';
import { AccommodationRepository } from '../repositories';
import { get, post, requestBody } from '@loopback/rest';

export class AccommodationService {
  constructor(
    @repository(AccommodationRepository)
    public accommodationRepository: AccommodationRepository,
  ) {}

  @get('/accommodations')
  async find(@requestBody() filter: any): Promise<any[]> {
    return this.accommodationRepository.find(filter);
  }
}
