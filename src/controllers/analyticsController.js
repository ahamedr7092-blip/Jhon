/**
 * Analytics Controller
 * 
 * Handles analytics endpoints
 */

const analyticsService = require('../services/analyticsService');

/**
 * Get dashboard metrics
 */
const getDashboardMetrics = async (req, res) => {
  try {
    const { days = 30 } = req.query;
    const metrics = await analyticsService.getDashboardMetrics(parseInt(days));

    res.json({
      success: true,
      metrics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to get metrics',
      message: error.message
    });
  }
};

/**
 * Get revenue breakdown
 */
const getRevenueBreakdown = async (req, res) => {
  try {
    const { days = 30 } = req.query;
    const breakdown = await analyticsService.getRevenueBreakdown(parseInt(days));

    res.json({
      success: true,
      breakdown
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to get revenue breakdown',
      message: error.message
    });
  }
};

/**
 * Get user growth data
 */
const getUserGrowth = async (req, res) => {
  try {
    const { days = 30 } = req.query;
    const growth = await analyticsService.getUserGrowth(parseInt(days));

    res.json({
      success: true,
      growth
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to get user growth',
      message: error.message
    });
  }
};

module.exports = {
  getDashboardMetrics,
  getRevenueBreakdown,
  getUserGrowth
};
