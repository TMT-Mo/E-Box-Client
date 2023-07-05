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

export interface UserInfo {
  userId: number;
  roleName: string;
  nbf: string;
  iat: number;
  exp: number;
  userName: string;
  signature: string;
  idPermissions: string;
  departmentName: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

export interface GetSignatureArgs {
  userId: number;
}

export interface GetSignatureResponse {
  signature: string;
  avatar?: string;
}
