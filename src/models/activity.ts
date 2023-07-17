export interface IActivity {
    id?: string;
    title: string;
    description: string;
    creator: string;
    createdAt: Date
  }
  

export interface GetActivityListQuery {
    id?: string;
    size?: number
}

export interface GetActivityListResponse{
    items: IActivity[],
    total: number
}