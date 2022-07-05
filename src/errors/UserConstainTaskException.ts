import HttpStatusCode from '../responses/HttpStatusCode';
import HttpException from './HttpException';

class UserConstainTaskException extends HttpException {
  constructor() {
    super(HttpStatusCode.CONFLICT, 'Impossível excluir, usuário possui tarefas relacionadas');
  }
}

export default UserConstainTaskException;
