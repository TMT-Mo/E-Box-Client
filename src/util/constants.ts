export enum StatusPost {
  Process = "Process",
  Approved = "Approved",
  Rejected = "Rejected",
}

export enum KEY {
  ACCESS_TOKEN = "accessToken",
  LOCATION = "location",
}

export enum AlertStatus {
  SUCCESS = "success",
  ERROR = "error",
  INFO = "info",
}

export const LocationPath = {
  general: {
    login: "/login",
    home: "/home",
  },
  admin: {
    admin: "/admin",
    postManagement: `/admin/post-management`,
    chat: "/admin/chat",
    history: "/admin/history",
    account: "/admin/account",
    activity: "/admin/activity",
  },
};

export enum DataTableHeader {
  STATUS = "status",
}