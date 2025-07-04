const cron = require('node-cron');
const cronJob1 = require('./jobs/cronJob1');
const cronJob2 = require('./jobs/cronJob2');
const cronJob3 = require('./jobs/cronJob3');
const cronJob4 = require('./jobs/cronJob4');
const logger = require('./config/logger');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

// Create logs directory if it doesn't exist
if (!fs.existsSync('logs')) {
    fs.mkdirSync('logs');
}

// Validate environment variables
function validateEnvironment() {
    const requiredVars = [
        'AWS_ACCESS_KEY_ID',
        'AWS_SECRET_ACCESS_KEY',
        'AWS_REGION',
        'CLEVERTAP_ACCOUNT_ID',
        'CLEVERTAP_PASSCODE',
        'S3_CART_ABANDON_BUCKET',
        'S3_CHARGED_EVENTS_BUCKET',
        'S3_DELTA_EVENTS_BUCKET'
    ];

    const missing = requiredVars.filter(varName => !process.env[varName]);

    if (missing.length > 0) {
        logger.error('Missing required environment variables:', missing);
        process.exit(1);
    }

    logger.info('Environment validation passed');
}

// Schedule Cron Job 1 - Runs at 4:15 PM daily
cron.schedule('34 11 * * *', async () => {
    try {
        logger.info('Executing scheduled Cron Job 1 at 4:15 PM');
        await cronJob1.execute();
    } catch (error) {
        logger.error('Scheduled Cron Job 1 failed:', error);
    }
}, {
    scheduled: true,
    timezone: "Asia/Kolkata"
});

// Schedule Cron Job 2 - Runs at 4:18 PM daily
cron.schedule('35 11 * * *', async () => {
    try {
        logger.info('Executing scheduled Cron Job 2 at 4:18 PM');
        await cronJob2.execute();
    } catch (error) {
        logger.error('Scheduled Cron Job 2 failed:', error);
    }
}, {
    scheduled: true,
    timezone: "Asia/Kolkata"
});

// Schedule Cron Job 3 - Runs at 4:21 PM daily
cron.schedule('54 13 * * *', async () => {
    try {
        logger.info('Executing scheduled Cron Job 3 at 4:21 PM');
        await cronJob3.execute();
    } catch (error) {
        logger.error('Scheduled Cron Job 3 failed:', error);
    }
}, {
    scheduled: true,
    timezone: "Asia/Kolkata"
});

// Schedule Cron Job 4 - Runs at 4:24 PM daily
cron.schedule('55 13 * * *', async () => {
    try {
        logger.info('Executing scheduled Cron Job 4 at 4:24 PM');
        await cronJob4.execute();
    } catch (error) {
        logger.error('Scheduled Cron Job 4 failed:', error);
    }
}, {
    scheduled: true,
    timezone: "Asia/Kolkata"
});

// Manual execution functions for testing
async function runJob1Manually() {
    try {
        logger.info('Manual execution of Cron Job 1');
        await cronJob1.execute();
    } catch (error) {
        logger.error('Manual Cron Job 1 execution failed:', error);
    }
}

async function runJob2Manually() {
    try {
        logger.info('Manual execution of Cron Job 2');
        await cronJob2.execute();
    } catch (error) {
        logger.error('Manual Cron Job 2 execution failed:', error);
    }
}

async function runJob3Manually() {
    try {
        logger.info('Manual execution of Cron Job 3');
        await cronJob3.execute();
    } catch (error) {
        logger.error('Manual Cron Job 3 execution failed:', error);
    }
}

async function runJob4Manually() {
    try {
        logger.info('Manual execution of Cron Job 4');
        await cronJob4.execute();
    } catch (error) {
        logger.error('Manual Cron Job 4 execution failed:', error);
    }
}

// Graceful shutdown
process.on('SIGINT', () => {
    logger.info('Received SIGINT. Graceful shutdown...');
    process.exit(0);
});

process.on('SIGTERM', () => {
    logger.info('Received SIGTERM. Graceful shutdown...');
    process.exit(0);
});

// Start the application
async function startApp() {
    try {
        validateEnvironment();

        logger.info('CleverTap Data Processor started successfully');
        logger.info('Cron Job 1 scheduled for 4:15 PM daily');
        logger.info('Cron Job 2 scheduled for 4:18 PM daily');
        logger.info('Cron Job 3 scheduled for 4:21 PM daily');
        logger.info('Cron Job 4 scheduled for 4:24 PM daily');

        // Uncomment these lines for manual testing
        // await runJob1Manually();
        // await runJob2Manually();
        // await runJob3Manually();
        // await runJob4Manually();

    } catch (error) {
        logger.error('Application startup failed:', error);
        process.exit(1);
    }
}

startApp();

// Export for testing
module.exports = {
    runJob1Manually,
    runJob2Manually,
    runJob3Manually,
    runJob4Manually
};