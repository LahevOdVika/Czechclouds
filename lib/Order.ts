/**
 * Order class
 * @property {string} fullname - Full name of the person
 * @property {string} email - Email address
 * @property {string} plan - Plan name
 * @property {boolean} yearly - Yearly subscription
 * @property {number} additionalsize - Additional size
 * @property {boolean} domainoption - Domain option
 * @property {string} domainname - Domain name
 * @property {string[]} users - List of users
 * @property {number} price - Price
 */

export class Order {
  fullname: string;
  email: string;
  plan: string;
  yearly: boolean;
  additionalsize: number;
  domainoption: boolean;
  domainname?: string;
  users: string[];
  price: number;

  constructor(
    fullname: string,
    email: string,
    plan: string,
    yearly: boolean,
    additionalsize: number,
    domainoption: boolean,
    users: string[],
    price: number,
    domainname?: string,
  ) {
    this.fullname = fullname;
    this.email = email;
    this.plan = plan;
    this.yearly = yearly;
    this.additionalsize = additionalsize;
    this.domainoption = domainoption;
    this.domainname = domainname;
    this.users = users;
    this.price = price;
  }
}
