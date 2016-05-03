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

  // addDonation(donation: Donation): void {
  //   if (!donation
  //     || typeof donation.amount !== 'number'
  //     || donation.amount <= 0
  //   ) {
  //     return;
  //   }
  //   this.donations.push(donation);
  // }
  // getDonations(): Donation[] {
  //   return this.donations;
  // }

  reachedGoal(): boolean {
    return this.currentAmount >= this.targetAmount;
  }
}
