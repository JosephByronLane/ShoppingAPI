import 'express';

declare module 'express' {
  export interface Request {
    id?: number;
    nombre?: string;
  }
}