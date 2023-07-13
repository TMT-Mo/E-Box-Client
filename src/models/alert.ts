import { AlertStatus } from "@/util/constants";

export interface Alert {
  status?: AlertStatus.SUCCESS | AlertStatus.ERROR | AlertStatus.INFO;
  message?: string;
  errorMessage?: string;
  duration?: number;
  isOpen: boolean;
}

export interface ValidationErrors{
  
  errorMessage: string;
  // code: number
}
