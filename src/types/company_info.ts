import { IndividualInfo } from "./Individual_info";

export interface CompanyInfo {
  phoneNumber: string;
  industry: string;
  email: string;
  address: string;
  website: string;
  keyContacts: IndividualInfo[];
}
