import { UserDto } from '../common/types';

export interface CreateCardDto {
  restaurant_id: number;
  message: string;
}

export enum CardStatus {
  Waiting = 'WAITING',
  Matched = 'MATCHED',
}

export interface RestaurantDto {
  id: number;
  name: string;
  longitude: number;
  latitude: number;
  pictures: string[];
}

export interface CardDto {
  id: number;
  restaurant: RestaurantDto;
  user: UserDto;
  message: string;
  status: CardStatus;
}
