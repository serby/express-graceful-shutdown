import { Server } from 'http';
import { RequestHandler } from 'express';

interface GracefulShutdownMiddlewareOptions {
  forceTimeout?: number;
  logger?: {
    info: (msg: string) => void;
    error: (msg: string) => void;
  };
}

declare function createGracefulShutdownMiddleware(
  server: Server,
  opts: GracefulShutdownMiddlewareOptions
): RequestHandler;

export = createGracefulShutdownMiddleware;
