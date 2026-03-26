import axios from 'axios';
import { config } from '../config/env';

/**
 * Interswitch Service handles real external API calls to Interswitch Sandbox.
 * Note: Auth flow (TerminalID, Client Secret etc.) should be implemented here.
 * For MVP, we use the provided sandbox endpoints.
 */

export const interswitchService = {
  /**
   * BVN Full Details Verification
   */
  async verifyBVNFullDetails(bvn: string) {
    try {
      // For MVP Sandbox/Demo:
      // Real implementation would use axios.post(baseUrl + '/bvn-rest/api/v1/bvn/verify', ...)
      // with Authorization and TerminalID headers.
      
      const response = await axios.post(`${config.INTERSWITCH.BASE_URL}/api/v1/bvn/verify`, {
        bvn: bvn
      }, {
        headers: {
          'Authorization': `Bearer ${config.INTERSWITCH.CLIENT_ID}:${config.INTERSWITCH.CLIENT_SECRET}`,
          'TerminalID': '7001'
        }
      });

      return response.data;
    } catch (error) {
      console.error('Interswitch BVN API Error:', (error as Error).message);
      throw error;
    }
  },

  /**
   * Credit History API
   */
  async getCreditHistory(bvn: string) {
    try {
      // For MVP Sandbox/Demo:
      // Real implementation would use axios.get(baseUrl + '/idp-rest/api/v1/credit/history?bvn=' + bvn)
      
      const response = await axios.get(`${config.INTERSWITCH.BASE_URL}/api/v1/credit/history`, {
        params: { bvn },
        headers: {
          'Authorization': `Bearer ${config.INTERSWITCH.CLIENT_ID}:${config.INTERSWITCH.CLIENT_SECRET}`
        }
      });

      return response.data;
    } catch (error) {
       console.error('Interswitch Credit API Error:', (error as Error).message);
       throw error;
    }
  }
};
