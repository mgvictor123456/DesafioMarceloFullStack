import { Router } from 'express';

abstract class Controller {
    protected path: string;
    public router: Router;

    constructor(path: string) {
      this.router = Router();
      this.path = path;

      setTimeout(() => {
        this.iniRoutes();
      }, 0);
    }

    protected abstract iniRoutes(): void;
}

export default Controller;
