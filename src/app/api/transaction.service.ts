// src/api/transaction.service.ts
import { transactionsClient } from './client';
import { SERVICES } from './constants';
import { PaginatedResponse } from '../types/pagination';
import { Offer } from '../types/offer';
import { Partner } from '../types/partner';
import { Transaction, TransactionFilter } from '../types/transaction';

export const TransactionsService = {
  /**
   * Fetch all partners
   */
  async listPartners(): Promise<PaginatedResponse<Partner>> {
    try {
      const response = await transactionsClient.get<PaginatedResponse<Partner>>(
        SERVICES.TRANSACTIONS.ENDPOINTS.PARTNERS
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching partners', error);
      throw error;
    }
  },

  /**
   * Fetch active offers from transactions service
   * @returns List of active offers
   */
  async listActiveOffers(): Promise<PaginatedResponse<Offer>> {
    try {
      const response = await transactionsClient.get<PaginatedResponse<Offer>>(
        SERVICES.TRANSACTIONS.ENDPOINTS.ACTIVE_OFFERS
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching active offers', error);
      throw error;
    }
  },

  /**
   * Retrieve user transactions with optional filters
   * @param userId User identifier
   * @param filters Optional transaction filtering parameters
   * @returns Paginated list of transactions
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
      console.error('Error fetching user transactions', error);
      throw error;
    }
  }
};