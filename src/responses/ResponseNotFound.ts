import { Response } from 'express';
import HttpStatusCode from './HttpStatusCode';

function responseNotFound(res: Response) {
  const status = HttpStatusCode.NOT_FOUND;
  const message = 'Caminho não identificado!';
  const error = true;
  const body = {};

  return res.status(status).send({
    status, message, error, body,
  });
}

export default responseNotFound;
