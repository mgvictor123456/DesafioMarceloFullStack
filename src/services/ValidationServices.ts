import { Types } from 'mongoose';

class ValidationServices {
  public validateId(id: string): boolean {
    if (!Types.ObjectId.isValid(id)) {
      return true;
    }
    return false;
  }
}

export default new ValidationServices();
