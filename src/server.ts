import colors from 'colors';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import app from './app'; // Express app
import config from './config'; // Configuration
import { errorLogger, logger } from './shared/logger'; // Logging
import { socketHelper } from './app/socket/socket'; // Socket helpers

// Uncaught exceptions
process.on('uncaughtException', error => {
  errorLogger.error('Unhandled Exception Detected', error);
  if (server) {
    server.close(() => process.exit(1)); // Ensure server is closed before exit
  } else {
    process.exit(1);
  }
});

let server: any;
async function main() {
  try {
    // Connect to MongoDB
    mongoose.connect(config.mongoose.url as string);
    logger.info(colors.green('🚀 Database connected successfully'));

    // Start server
    const port = typeof config.port === 'number' ? config.port : Number(config.port);
    server = app.listen(port, config.backendIp as string, () => {
      logger.info(
        colors.yellow(`♻️  Application listening on http://${config.backendIp}:${port}/test`)
      );
    });

    // Setup Socket.IO
    const io = new Server(server, {
      pingTimeout: 60000,
      cors: { origin: '*' },
    });
    socketHelper.socket(io);
    // @ts-ignore
    global.io = io; // Attach to global

  } catch (error) {
    errorLogger.error(colors.red('🤢 Failed to connect Database'));
  }

  // Handle unhandled rejections
  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorLogger.error('Unhandled Rejection Detected', error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

main();

// Gracefully handle SIGTERM (shutting down server)
process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close(() => {
      logger.info('Server closed gracefully');
      process.exit(0); // Exit after server closure
    });
  } else {
    process.exit(1); // Force exit if server not running
  }
});
