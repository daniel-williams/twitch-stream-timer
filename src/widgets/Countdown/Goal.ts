import {Donation} from './Donation';


export class Goal {
  targetAmount: number;
  donations: Donation[];

  constructor(targetAmount?: number) {
    this.targetAmount = targetAmount || 20;
    this.donations = [];
  }

  get count(): number {
    return this.donations.length;
  }
  get currentAmount(): number {
    return this.donations.reduce((total, item) => {
      total += item.amount;
      return total;
    }, 0);
  }

  reachedGoal(): boolean {
    return this.currentAmount >= this.targetAmount;
  }

  getProgress(): number {
    return Math.min(1, this.currentAmount / this.targetAmount);
  }
}
