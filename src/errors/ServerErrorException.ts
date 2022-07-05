import { isValidObjectId } from 'mongoose';
import HttpStatusCode from '../responses/HttpStatusCode';
import HttpException from './HttpException';

class ServerErrorException extends HttpException {
  constructor(error) {
    super(getStatus(error), getMessage(error));
  }
}

function getStatus(error): number {
  if (isMongoException(error)) return HttpStatusCode.BAD_REQUEST;
  return HttpStatusCode.INTERNAL_SERVER_ERROR;
}

function isMongoException(error): boolean {
  if (isMongoError(error) || isValidationError(error)) return true;
  return false;
}

function isMongoError(error): boolean {
  return error.name === 'MongoError';
}

function isValidationError(error): boolean {
  return error.name === 'ValidationError';
}

function getMessage(error): string {
  try {
    if (isMongoException(error)) {
      if (isKeyUniqueError(error)) return getMessageKeyUnique(error);
      if (isValidationError(error)) return getMessageValidationError(error);
    } else return getMessageGeneric();
  } catch (error) {
    return getMessageGeneric();
  }
}

function isKeyUniqueError(error) {
  return isMongoError(error) && error.code === 11000;
}

function getMessageKeyUnique(error): string {
  const { keyPattern } = error;

  const listFormatedErrors = [];
  Object.keys(keyPattern).forEach((field) => {
    listFormatedErrors.push(`${field} deve ser único`);
  });

  return listFormatedErrors.join(' | ');
}

function getMessageValidationError(error): string {
  const { errors } = error;

  const listFormatedErrors = [];
  Object.keys(errors).forEach((field) => {
    listFormatedErrors.push(errors[field].message);
  });

  return listFormatedErrors.join(' | ');
}

function getMessageGeneric(): string {
  return 'Erro interno no servidor.';
}

export default ServerErrorException;
