import { ContactType } from "./contact_type";

export type KeyContact = {
  name: string;
  email: string;
};

export type BaseContact = {
  name: string;
  type: ContactType;
  phoneNumber: string;
  email: string;
  address: string;
  website: string;
};

export type IndividualContact = BaseContact & {
  type: ContactType.Individual;
  title?: string;
};

export type CompanyContact = BaseContact & {
  type: ContactType.Company;
  industry?: string;
  keyContacts?: KeyContact[];
};

export type Contact = IndividualContact | CompanyContact;
