import { ErrorRequestHandler } from 'express';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import handleValidationError from '../../errors/handleValidationError';
import handleZodError from '../../errors/handleZodError';
import handleDuplicateError from '../../errors/handleDuplicateError';
import { errorLogger } from '../../shared/logger';
import { IErrorMessage } from '../../types/errors.types';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  // Log error
  config.env === 'development'
    ? console.log('🚨 globalErrorHandler ~~ ', error)
    : errorLogger.error('🚨 globalErrorHandler ~~ ', error);

  let code = 500;
  let message = 'Something went wrong';
  let errorMessages: IErrorMessage[] = [];

  // Handle ZodError
  if (error.name === 'ZodError') {
    const simplifiedError = handleZodError(error);
    code = simplifiedError.code;
    message = simplifiedError.errorMessages.map(err => err.message).join(', ');
    errorMessages = simplifiedError.errorMessages;
  }
  // Handle ValidationError (e.g., Mongoose)
  else if (error.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    code = simplifiedError.code;
    message = simplifiedError.errorMessages.map(err => err.message).join(', ');
    errorMessages = simplifiedError.errorMessages;
  }
  // Handle DuplicateError
  else if (error.name === 'DuplicateError') {
    const simplifiedError = handleDuplicateError(error);
    code = simplifiedError.code;
    message = simplifiedError.errorMessages.map(err => err.message).join(', ');
    errorMessages = simplifiedError.errorMessages;
  }
  // ✅ Handle CastError (Mongoose bad ObjectId, wrong type, etc.)
  else if (error.name === 'CastError') {
    code = 400;
    message = `Invalid ${error.path}: ${error.value}`;
    errorMessages = [
      {
        path: error.path,
        message: `Invalid ${error.path}: ${error.value}`,
      },
    ];
  }
  // Handle ApiError (custom)
  else if (error instanceof ApiError) {
    code = error.code;
    message = error.message || 'Something went wrong';
    errorMessages = error.message
      ? [{ path: '', message: error.message }]
      : [];
  }
  // Handle generic Error
  else if (error instanceof Error) {
    message = error.message || 'Internal Server Error';
    errorMessages = error.message
      ? [{ path: '', message: error.message }]
      : [];
  }

  // Format multiple error messages
  const formattedMessage =
    errorMessages.length > 1
      ? errorMessages.map(err => err.message).join(', ')
      : message;

  res.status(code).json({
    code,
    message: formattedMessage,
    error: errorMessages,
    stack: config.env === 'development' ? error?.stack : undefined,
  });
};

export default globalErrorHandler;
