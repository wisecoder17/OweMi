import { Request, Response } from 'express';
import { customerService } from '../services/customer.service';

/**
 * Customer Controller handles HTTP requests for identity verification.
 */

export const customerController = {
  /**
   * POST /api/customer/verify
   */
  async verify(req: Request, res: Response): Promise<void> {
    try {
      const { type, value, firstName, lastName } = req.body;
      const traderId = "60d0fe4f5311236168a109ca"; // MOCKED TRADER ID for MVP (no auth yet)

      if (!type || !value) {
        res.status(400).json({ message: "Type (BVN/NIN) and Value are required." });
        return;
      }

      if (type === 'BVN' && (value.length !== 11 || !/^\d{11}$/.test(value))) {
        res.status(400).json({ message: "Invalid BVN. Must be 11 numeric digits." });
        return;
      }

      const result = await customerService.verifyCustomer(traderId, { 
        type, 
        value, 
        firstName: firstName || '', 
        lastName: lastName || '' 
      });
      
      res.status(200).json(result);
    } catch (error: any) {
      console.error('Controller Error:', error.message);
      
      // Rule 16: Failure to verify should not crash the app experience. 
      // Return 400 with the error message for the UI to display cleanly.
      res.status(400).json({ 
        status: 'fail', 
        message: error.message || "Identity verification failed" 
      });
    }
  }
};
