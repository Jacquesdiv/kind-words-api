import { Response } from 'express';

export class HttpUtil {
  
  public handleError = (err: Error, res: Response) => {
    const msg = (err.message ? err.message : err) as string;

    if (err instanceof Error400) {
      res.status(400).send(msg);
    } else if (err instanceof Error401) {
      res.status(401).send(msg);
    } else if (err instanceof Error404) {
      res.status(404).send(msg);
    } else if (err instanceof Error500) {
      res.status(500).send(msg);
    } else {
      res.status(500).send(msg);
    }
  }

  public json = async (promise: Promise<any>, res: Response) => {
    try {
      const data = await promise;
      res.json(data);
    } catch (err) {
      this.handleError(err, res);
    }
  }
}

export class Error400 extends Error { }
export class Error401 extends Error { }
export class Error404 extends Error { }
export class Error500 extends Error { }
