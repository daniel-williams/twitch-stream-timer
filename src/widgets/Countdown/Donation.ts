export class Donation {
  amount: number;
  user: string;

  constructor(amount?: number, user?: string) {
    this.amount = amount;
    this.user = user;
  }
}