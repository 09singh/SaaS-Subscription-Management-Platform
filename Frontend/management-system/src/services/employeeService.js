
import api from "./api";

const employeeService = {
  /**
   * Get employee profile
   * @returns {Promise}
   */
  getProfile: async () => {
    try {
      const response = await api.get('/employee/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get employee tasks
   * @returns {Promise}
   */
  getTasks: async () => {
    try {
      const response = await api.get('/employee/tasks');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Update task status
   * @param {string} taskId
   * @param {string} status
   * @returns {Promise}
   */
  updateTaskStatus: async (taskId, status) => {
    try {
      const response = await api.put(`/employee/tasks/${taskId}`, { status });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // /**
  //  * Upload document
  //  * @param {FormData} formData
  //  * @returns {Promise}
  //  */
  // uploadDocument: async (formData) => {
  //   try {
  //     const response = await api.post('/employee/documents', formData, {
  //       headers: { 'Content-Type': 'multipart/form-data' },
  //     });
  //     return response.data;
  //   } catch (error) {
  //     throw error.response?.data || error;
  //   }
  // },

  // /**
  //  * Delete document
  //  * @param {string} id
  //  * @returns {Promise}
  //  */
  // deleteDocument: async (id) => {
  //   try {
  //     const response = await api.delete(`/employee/documents/${id}`);
  //     return response.data;
  //   } catch (error) {
  //     throw error.response?.data || error;
  //   }
  // },

// Raise an issue
  raiseIssue: async (payload) => {
    try {
      const response = await api.post('/employee/issues', payload);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default employeeService;
