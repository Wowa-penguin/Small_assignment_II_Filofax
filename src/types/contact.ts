import { CompanyInfo } from "./company_info";
import { ContactType } from "./contact_type";
import { IndividualInfo } from "./Individual_info";

export interface Contact {
  name: string;
  thumbnail: string;
  type: ContactType;
  info: IndividualInfo | CompanyInfo;
}
