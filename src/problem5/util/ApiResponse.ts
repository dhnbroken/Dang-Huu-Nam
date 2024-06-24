import { Response } from 'express';
import httpStatusCodes from 'http-status-codes';

export interface IOverrideRequest {
  code: number;
  message: string;
  positive: string;
  negative: string;
}

export interface ICookie {
  key: string;
  value: string;
}

export default class apiResponse {
  static result = (res: any, data: object, status = 200, cookie: ICookie = { key: '', value: '' }) => {
    res.status(status);

    if (cookie?.key && cookie?.value) {
      res.cookie(cookie.key, cookie.value);
    }
    res.json({
      ...data,
      success: true
    });
  };

  static error = (
    res: Response,
    status = 400,
    error = httpStatusCodes.getStatusText(status),
    // override: IOverrideRequest | null = null,
    details = {}
  ) => {
    res.status(status).json({
      error: {
        message: error,
        data: details
      },
      success: false
    });
  };

  static setCookie = (res: Response, key: string, value: string) => {
    res.cookie(key, value);
  };
}
