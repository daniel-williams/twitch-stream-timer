import {Donation} from './Donation';

export interface IGoal {
  targetAcount?: number;
  donations?: Array<Donation>;
}

export class Goal implements IGoal {
  public targetAmount: number;
  public donations: Donation[];

  constructor(targetAmount?: number) {
    this.targetAmount = targetAmount || 20;
    this.donations = [];
  }

  get donationCount(): number {
    return this.donations.length;
  }
  get totalDonations(): number {
    return this.donations.reduce((total, item) => {
      total += item.amount;
      return total;
    }, 0);
  }
  get hasReachedTarget(): boolean {
    return this.totalDonations >= this.targetAmount;
  }
  get targetProgress(): number {
    return Math.min(1, this.totalDonations / this.targetAmount);
  }

  public displayProgress(): string {
    return Math.round((this.totalDonations / this.targetAmount) * 100) + '%';
  }
}
