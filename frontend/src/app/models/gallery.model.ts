import { User } from './user.model';

export class Gallery {
  constructor(
    public _id: string,
    public user: User,
    public title: string,
    public image: string,
  ) {}
}

export interface GalleryData {
  [key: string]: any;
  title: string;
  image: File;
}
