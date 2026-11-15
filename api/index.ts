import type {NextFunction, Request, Response} from 'express';
import { createApiApp } from '../src/server/createApiApp';

const app = createApiApp();

function restoreRewrittenPath(req: Request): void {
  const rewrittenPath = req.query.path;
  if (typeof rewrittenPath !== 'string') return;

  const url = new URL(req.url, 'http://vercel.local');
  url.searchParams.delete('path');
  const apiPath = rewrittenPath.replace(/^\/+/, '');
  req.url = `/api/${apiPath}${url.search}`;
}

export default (req: Request, res: Response, next: NextFunction) => {
  restoreRewrittenPath(req);
  return app(req, res, next);
};
