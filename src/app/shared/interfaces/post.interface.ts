export interface IPostResponse {
  id?: number;
  title: string;
  author: string;
  image: any;
}

export interface IPostRequest {
  title: string;
  author: string;
  image: any;
}
