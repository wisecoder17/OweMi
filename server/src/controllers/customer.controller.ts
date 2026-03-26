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
      const { type, value } = req.body;
      const traderId = "60d0fe4f5311236168a109ca"; // MOCKED TRADER ID for MVP (no auth yet)

      if (!type || !value) {
        res.status(400).json({ message: "Type (BVN/NIN) and Value are required." });
        return;
      }

      if (type === 'BVN' && value.length !== 11) {
        res.status(400).json({ message: "Invalid BVN. Must be 11 digits." });
        return;
      }

      const result = await customerService.verifyCustomer(traderId, { type, value });
      
      res.status(200).json(result);
    } catch (error) {
      console.error('Controller Error:', (error as Error).message);
      res.status(500).json({ message: "Internal Server Error during verification", error: (error as Error).message });
    }
  }
};
