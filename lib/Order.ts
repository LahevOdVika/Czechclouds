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
