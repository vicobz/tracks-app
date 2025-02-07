// src/api/transaction.service.ts
import { transactionsClient } from './client';
import { SERVICES } from './api.config';
import { PaginatedResponse } from '../types/pagination';
import { Offer } from '../types/offer';
import { Partner } from '../types/partner';
import { Transaction, TransactionFilter } from '../types/transaction';

export const TransactionsService = {
  /**
   * Fetch all active partners with their active offers
   */
  async listActivePartnersWithOffers(): Promise<PaginatedResponse<Partner>> {
    try {
      console.log('[TransactionsService] Fetching active partners with offers');
      const response = await transactionsClient
        .get<PaginatedResponse<Partner>>(SERVICES.TRANSACTIONS.ENDPOINTS.PARTNERS_ACTIVE_WITH_OFFERS)

      console.log('[TransactionsService] Successfully fetched partners with offers:', {
        partnersCount: response.data.data.length,
        totalOffers: response.data.data.reduce((acc, partner) => acc + partner.offers.length, 0)
      });
      return response.data;
    } catch (error) {
      console.error('[TransactionsService] Error fetching partners with offers:', error);
      throw error;
    }
  },

  /**
   * Retrieve user transactions with optional filters
   */
  async listUserTransactions(
    userId: string,
    filters?: TransactionFilter
  ): Promise<PaginatedResponse<Transaction>> {
    try {
      const response = await transactionsClient.get<PaginatedResponse<Transaction>>(
        SERVICES.TRANSACTIONS.ENDPOINTS.USER_TRANSACTIONS.replace(':userID', userId),
        { params: filters }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching user transactions:', error);
      throw error;
    }
  }
};