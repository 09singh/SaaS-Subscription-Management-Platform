import api from './api';

const companyService = {
  /**
   * Submit company form/details
   * @param {object} data
   * @returns {Promise}
   */
  submitCompanyForm: async (data) => {
    try {
      const response = await api.post('/company/details', data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get available plans
   * @returns {Promise}
   */
  getPlans: async () => {
    try {
      const response = await api.get('/company/plans');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Upgrade to a plan
   * @param {string} planId
   * @returns {Promise}
   */
  upgradePlan: async (planId) => {
    try {
      const response = await api.post(`/company/plans/${planId}/upgrade`, {});
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get usage statistics
   * @returns {Promise}
   */
  getUsage: async () => {
    try {
      const response = await api.get('/company/usage');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get company employees
   * @returns {Promise}
   */
  getEmployees: async () => {
    try {
      const response = await api.get('/company/employees');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Add employee to company
   * @param {object} employeeData
   * @returns {Promise}
   */
  addEmployee: async (employeeData) => {
    try {
      const response = await api.post('/company/employees', employeeData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Remove employee from company
   * @param {string} employeeId
   * @returns {Promise}
   */
  removeEmployee: async (employeeId) => {
    try {
      const response = await api.delete(`/company/employees/${employeeId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default companyService;
