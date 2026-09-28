export type ID = string;

export interface BaseEntity {
  id: ID;
  createdAt: Date;
  updatedAt: Date;
}

export type Status = 'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR';
