import { disconnectFromDatabase } from "./database";
import logger from "./logger";

const shutdownGracefully = (server: any, signals: string[]) => {
  signals.forEach((signal) => {
    process.on(signal, async () => {
      logger.info(`Received ${signal}, shutting down gracefully`);
      server.close(async () => {
        logger.info("Server gracefully stopped");
        //disconnect from database
        await disconnectFromDatabase();
        process.exit(0);
      });
    });
  });
};

export default shutdownGracefully;
