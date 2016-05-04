export class Donation {
  amount: number;
  name: string;

  constructor(amount?: number, name?: string) {
    this.amount = amount;
    this.name = name;
  }
}