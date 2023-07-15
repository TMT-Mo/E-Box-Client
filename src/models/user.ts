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

export interface IUser {
  id: string;
  username: string;
  roleName: string;
  createdAt: Date;
  updatedAt: Date;
  posts: [];
  activities: [];
}

export interface GetSignatureArgs {
  userId: number;
}

export interface GetSignatureResponse {
  signature: string;
  avatar?: string;
}
