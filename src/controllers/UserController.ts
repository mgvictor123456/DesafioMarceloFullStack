import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import HttpException from '../errors/HttpException';
import IdInvalidException from '../errors/IdInvalidException';
import NoContentException from '../errors/NoContentException';
import ServerErrorException from '../errors/ServerErrorException';
import HttpStatusCode from '../responses/HttpStatusCode';
import responseOk from '../responses/ResponceOk';
import responseCreate from '../responses/ResponseCreate';
import User from '../schemas/User';
import ValidationServices from '../services/ValidationServices';
import Controller from './Controller';

class UserController extends Controller {
  constructor() {
    super('/user');
  }

  protected iniRoutes(): void {
    this.router.get(this.path, this.list);
    this.router.get(`${this.path}/:id`, this.findById);
    this.router.post(this.path, this.create);
    this.router.put(`${this.path}/:id`, this.edit);
    this.router.delete(`${this.path}/:id`, this.delete);
  }

  private async list(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const users = await User.find();
      return (responseOk(res, users));
    } catch (error) {
      return res.send(new ServerErrorException(error));
      // return res.send(new HttpException(HttpStatusCode.INTERNAL_SERVER_ERROR, 'Erro interno no Servidor'));
    }
  }

  private async findById(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const { id } = req.params;
      if (ValidationServices.validateId(id)) return res.status(HttpStatusCode.BAD_REQUEST).send(new IdInvalidException());

      const user = await User.findById(id);
      return (responseOk(res, user));
    } catch (error) {
      return res.send(new ServerErrorException(error));
      // return res.send(new HttpException(HttpStatusCode.INTERNAL_SERVER_ERROR, 'Erro interno no Servidor'));
    }
  }

  private async create(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const user = await User.create(req.body);

      return (responseCreate(res, user));
    } catch (error) {
      return res.send(new ServerErrorException(error));
      // return res.send(new HttpException(HttpStatusCode.INTERNAL_SERVER_ERROR, 'Erro interno no Servidor'));
    }
  }

  private async edit(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const { id } = req.params;
      if (ValidationServices.validateId(id)) return res.status(HttpStatusCode.BAD_REQUEST).send(new IdInvalidException());
      // if (ValidationServices.validateId(id)) return res.status(HttpStatusCode.BAD_REQUEST).send(new HttpException(HttpStatusCode.BAD_REQUEST, 'Solicitação invalida'));

      const user = await User.findByIdAndUpdate(id, req.body, () => {});

      return (responseOk(res, user));
    } catch (error) {
      return res.send(new ServerErrorException(error));
      // return res.send(new HttpException(HttpStatusCode.INTERNAL_SERVER_ERROR, 'Erro interno no Servidor'));
    }
  }

  private async delete(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const { id } = req.params;
      if (ValidationServices.validateId(id)) return res.status(HttpStatusCode.BAD_REQUEST).send(new IdInvalidException());
      // if (ValidationServices.validateId(id)) return res.status(HttpStatusCode.BAD_REQUEST).send(new HttpException(HttpStatusCode.BAD_REQUEST, 'Solicitação invalida'));

      const user = await User.findById(id);
      if (user) {
        user.deleteOne();
        return (responseOk(res, user));
      }

      return res.status(HttpStatusCode.NO_CONTENT).send(new NoContentException());
    } catch (error) {
      return res.send(new ServerErrorException(error));
      // return res.send(new HttpException(HttpStatusCode.INTERNAL_SERVER_ERROR, 'Erro interno no Servidor'));
    }
  }
}
export default UserController;
