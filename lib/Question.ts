export class Question {
  fullname: string;
  email: string;
  order?: string | null;
  isclient: boolean;
  reason: "question" | "complain" | "refund" | "bigger";
  message: string;

  constructor(
    fullName: string,
    email: string,
    order: string | null,
    isClient: boolean,
    reason: "question" | "complain" | "refund" | "bigger",
    message: string,
  ) {
    this.fullname = fullName;
    this.email = email;
    this.order = order;
    this.isclient = isClient;
    this.reason = reason;
    this.message = message;
  }
}
