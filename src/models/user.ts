export interface LoginResponse {
  accessToken: string;
}

export interface LoginArgument {
  username?: string;
  password?: string;
}

export interface ChangePasswordResponse {
  message: string;
}

export interface ChangePasswordArgument {
  idUser: number;
  password: string;
  // idPermissions: number[],
  // idDepartment: number,
  // idRole: number
  // newPassword: string;
}

export interface IRole {
  id: string,
  name: string,
  createdAt: Date,
  updatedAt: Date
}
export interface IUser {
  id: string;
  username: string;
  role: IRole;
  createdAt: Date;
  updatedAt: Date;
  posts: [];
  activities: [];
}


export interface GetUserListResponse {
  items: IUser[],
  currentPage: number,
  size: number,
  total: number
}

export interface UserRequestQuery {
  currentPage?: number;
  size?: number;
  username?: string
}
