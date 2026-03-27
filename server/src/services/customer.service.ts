import Customer from '../models/Customer';
import Debt from '../models/Debt';
import { config } from '../config/env';
import { interswitchService } from './interswitch.service';
import * as mockService from './mock.service';

/**
 * Customer Service orchestrates identity verification and record management.
 */

export const customerService = {
  /**
   * Verify Customer by BVN
   */
  async verifyCustomer(traderId: any, input: { type: string; value: string }) {
    try {
      let result;

      // Rule 16: Interswitch logic handled by interswitch.service.ts (including MOCK)
      const identity = await interswitchService.verifyBVNFullDetails(input.value);
      const credit = await interswitchService.getCreditHistory(input.value);

      result = {
        identity,
        credit,
        message: "Identity confirmed"
      };

      // Save/Update Customer in DB
      let customer = await Customer.findOne({ bvn: input.value, traderId });

      if (!customer) {
        customer = new Customer({
          traderId,
          bvn: input.value,
          name: result.identity.name,
          photoUrl: result.identity.photoUrl,
          phone: result.identity.phoneMasked,
          dob: new Date(result.identity.dob),
          verificationType: "BVN",
          identityConfirmed: result.identity.confirmed,
          creditStatus: result.credit as any
        });
      } else {
        // Update existing customer state if needed
        customer.creditStatus = result.credit as any;
        customer.identityConfirmed = result.identity.confirmed;
      }

      await customer.save();

      // Rule 11: Demo Scenario 3 - Existing debtor warning
      const existingDebts = await Debt.find({ 
        customerId: customer._id, 
        traderId, 
        status: { $ne: 'paid' } 
      });
      
      const totalOwed = existingDebts.reduce((sum, d) => sum + d.amount, 0);

      return {
        ...result,
        customerId: customer._id,
        internalLedger: {
          isExistingDebtor: existingDebts.length > 0,
          totalOwed,
          debtCount: existingDebts.length
        }
      };
    } catch (error) {
      console.error('Customer Verification Error:', (error as Error).message);
      throw error;
    }
  }
};
