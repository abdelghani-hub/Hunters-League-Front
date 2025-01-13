export interface PageableResponse<T> {
  content: T[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  }
}

export interface PageRequest {
  page: number;
  size: number;
  sort?: string;
}
