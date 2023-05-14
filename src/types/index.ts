import { RouterState } from "connected-react-router";

export interface ApplicationState {
  router: RouterState;
  auth: AuthState;
  message: any;
}

export interface SignInPayload {
  email: string;
  password: string;
}
export interface SignUpPayload {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface BisanConfigPayload {
  accountId: string;
  appId: string;
  appSecret: string;
  username: string;
  password: string;
}
export interface AddCustomersAndSuppliersPayload {
  userName: string;
  userEmail: string;
  userMobile: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: any;
}
export interface VoucherSettingsPayload {
  number: number;
}

export interface ProfileInfoPayload {
  username: string;
  gender: string;
}

export interface ProfilePasswordPayload {
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordPayload {
  userId: string;
  password: string;
  confirmPassword: string;
}
export interface AddCustomersAndSuppliersPayload {
  userName: string;
  userEmail: string;
  userMobile: string;
  userPhone: string;
}
export interface ManualVoucherPayload {
  file: string;
  cost: string;
  bnr: string;
  ticketNumber: string;
  passengers: string[];
  airlineKey: string;
  setOpen: any;
  setOpenError: any;
}

export interface InvoicePayload {
  supplier: any;
  customer: any;
  sale: string;
  purchase: string;
  quantity: string;
  comment: string;
  item: string;
  type: string;
  ticketData: any;
  setOpen: any;
  setOpenError: any;
}
export interface VoucherPayload {
  file: string;
  cost: string;
  bnr: string;
  ticketNumber: string;
  passengers: string[];
  airlineKey: string;
  route: any;
  setOpen: any;
  setOpenError: any;
}

export interface InvoicePayloadForHotel {
  supplier: any;
  customer: any;
  sale: string;
  purchase: string;
  quantity: string;
  comment: string;
  item: string;
  checkIn: any;
  checkOut: any;
  setOpen: any;
  setOpenError: any;
}



export interface ReturnsPayload {
  supplier: any;
  customer: any;
  sale: string;
  purchase: string;
  quantity: string;
  comment: string;
  setOpen: any;
  setOpenError: any;
}
