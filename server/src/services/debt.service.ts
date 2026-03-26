import Debt from '../models/Debt';
import Customer from '../models/Customer';

/**
 * Debt Service handles the core ledger management logic.
 */

export const debtService = {
  /**
   * Create New Debt Record after verification
   */
  async createDebt(traderId: any, data: { customerId: string; amount: number; item: string; dueDate: string }) {
    try {
      const debt = new Debt({
        traderId,
        customerId: data.customerId,
        amount: data.amount,
        item: data.item,
        dueDate: new Date(data.dueDate),
        status: "unpaid",
        recordedAt: new Date()
      });

      await debt.save();

      // Optionally we could update the customer's owemiScore here
      return debt;
    } catch (error) {
       console.error('Debt Creation Error:', (error as Error).message);
       throw error;
    }
  },

  /**
   * List Debts with Summary for Ledger
   */
  async getLedgerSummary(traderId: any) {
    try {
      const debts = await Debt.find({ traderId }).populate('customerId', 'name photoUrl').sort({ recordedAt: -1 });
      
      const summary = {
        totalOutstanding: 0,
        unpaidCount: 0,
        overdueCount: 0,
        debts: debts.map((d: any) => {
          // Compute status on fly or use stored status?
          // For MVP we can compute if it's overdue
          const isOverdue = d.status === 'unpaid' && new Date(d.dueDate) < new Date();
          const finalStatus = isOverdue ? 'overdue' : d.status;

          if (finalStatus !== 'paid') {
            summary.totalOutstanding += d.amount;
          }
          if (finalStatus === 'unpaid') summary.unpaidCount++;
          if (finalStatus === 'overdue') summary.overdueCount++;

          return {
            id: d._id,
            customerId: (d.customerId as any)._id,
            customerName: (d.customerId as any).name,
            customerPhoto: (d.customerId as any).photoUrl,
            amount: d.amount,
            item: d.item,
            dueDate: d.dueDate,
            recordedAt: d.recordedAt,
            status: finalStatus
          };
        })
      };

      return summary;
    } catch (error) {
       console.error('Ledger Fetch Error:', (error as Error).message);
       throw error;
    }
  },

  /**
   * Update Debt Status (Collect Payment)
   */
  async updateDebtStatus(traderId: any, debtId: string, status: "paid" | "overdue") {
    try {
      const debt = await Debt.findOneAndUpdate(
        { _id: debtId, traderId },
        { status, paidAt: status === 'paid' ? new Date() : undefined },
        { new: true }
      );

      return debt;
    } catch (error) {
       console.error('Debt Update Error:', (error as Error).message);
       throw error;
    }
  }
};
