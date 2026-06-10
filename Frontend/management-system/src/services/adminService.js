import api from './api';

const adminService = {
  /**
   * Get dashboard statistics
   * @returns {Promise}
   */
  getDashboardStats: async () => {
    try {
      const response = await api.get('/admin/dashboard');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get all companies
   * @returns {Promise}
   */
  getCompanies: async () => {
    try {
      const response = await api.get('/admin/companies');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Suspend a company
   * @param {string} companyId
   * @returns {Promise}
   */
  suspendCompany: async (companyId) => {
    try {
      const response = await api.put(`/admin/companies/${companyId}/suspend`, {});
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Unsuspend a company
   * @param {string} companyId
   * @returns {Promise}
   */
  unsuspendCompany: async (companyId) => {
    try {
      const response = await api.put(`/admin/companies/${companyId}/unsuspend`, {});
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get all plans (for management)
   * @returns {Promise}
   */
  getPlans: async () => {
    try {
      const response = await api.get('/admin/plans');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Create a new plan
   * @param {object} planData
   * @returns {Promise}
   */
  createPlan: async (planData) => {
    try {
      const response = await api.post('/admin/plans', planData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Update a plan
   * @param {string} planId
   * @param {object} planData
   * @returns {Promise}
   */
  updatePlan: async (planId, planData) => {
    try {
      const response = await api.put(`/admin/plans/${planId}`, planData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Delete a plan
   * @param {string} planId
   * @returns {Promise}
   */
  deletePlan: async (planId) => {
    try {
      const response = await api.delete(`/admin/plans/${planId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get revenue statistics
   * @returns {Promise}
   */
  getRevenue: async () => {
    try {
      const response = await api.get('/admin/revenue');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default adminService;
