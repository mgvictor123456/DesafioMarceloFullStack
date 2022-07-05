import HttpStatusCode from '../responses/HttpStatusCode';
import HttpException from './HttpException';

class NoContentException extends HttpException {
  constructor() {
    super(HttpStatusCode.NO_CONTENT, 'Nem um registro localizado');
  }
}

export default NoContentException;
