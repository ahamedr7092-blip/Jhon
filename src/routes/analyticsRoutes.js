/**
 * Analytics Routes
 * 
 * Routes for analytics endpoints (admin only)
 */

const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const { protect } = require('../middleware/authMiddleware');

/**
 * GET /api/analytics/dashboard
 * Get dashboard metrics (protected)
 */
router.get('/dashboard', protect, analyticsController.getDashboardMetrics);

/**
 * GET /api/analytics/revenue
 * Get revenue breakdown (protected)
 */
router.get('/revenue', protect, analyticsController.getRevenueBreakdown);

/**
 * GET /api/analytics/growth
 * Get user growth data (protected)
 */
router.get('/growth', protect, analyticsController.getUserGrowth);

module.exports = router;
