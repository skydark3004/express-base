import * as _ from 'lodash';
import { Request, Response, NextFunction } from 'express';
import { upload } from '../../configs/multer.config'
import * as _service from './item.service';
import { BaseError } from '../../libs/error';
import { ItemConst } from './item.const';
import { validationParamError } from '../../libs/error';



export async function getAll(req: Request, res: Response) {
  try {
    const items = await _service.getAll();
    res.status(200).json({
      status: 'success',
      length: items.length,
      data: items
    });
  } catch (err) {
    return res.bad(err);
  }
}

export const uploadFileMulter = upload.array('images', 10); // maximum of files is 10

export async function uploadFile(req: Request, res: Response) {
  try {
    req.checkBody('folder').trim().notEmpty().withMessage(ItemConst.RESPONSE_VALIDATE.FOLDER_IS_REQUIRED)
    const errors = req.validationErrors();
    if (errors) {
      return validationParamError(res, errors);
    }

    if (req.files.length === 0) {
      throw new BaseError({ message: 'dont have file' });
    }

    const myfiles = JSON.parse(JSON.stringify(req.files))
    myfiles.map(async function (item: any) {
      await _service.create({
        name: item.filename,
        folder: req.body.folder,
        type: item.mimetype.split('/')[1]
      })
    })

    res.status(200).json({ status: 'success', message: 'uploaded' })
  } catch (err) {
    return res.bad(err);
  }
}


export async function softDelete(req: Request, res: Response) {
  try {
    req.checkParams('id').trim().notEmpty().withMessage(ItemConst.RESPONSE_VALIDATE.ID_IS_REQUIRED)
      .isMongoId().withMessage(ItemConst.RESPONSE_VALIDATE.ID_IS_NOT_VALID);
    const errors = req.validationErrors();
    if (errors) {
      return validationParamError(res, errors);
    }

    const item = await _service.changeStatusActive(req.params.id, true)

    res.status(200).json({
      status: 'success',
      data: item
    });
  } catch (err) {
    return res.bad(err);
  }
}

export async function restore(req: Request, res: Response) {
  try {
    req.checkParams('id').trim().notEmpty().withMessage(ItemConst.RESPONSE_VALIDATE.ID_IS_REQUIRED)
      .isMongoId().withMessage(ItemConst.RESPONSE_VALIDATE.ID_IS_NOT_VALID);
    const errors = req.validationErrors();
    if (errors) {
      return validationParamError(res, errors);
    }

    const item = await _service.changeStatusActive(req.params.id, false)

    res.status(200).json({
      status: 'success',
      data: item
    });
  } catch (err) {
    return res.bad(err);
  }
}

export async function destroy(req: Request, res: Response) {
  try {
    req.checkParams('id').trim().notEmpty().withMessage(ItemConst.RESPONSE_VALIDATE.ID_IS_REQUIRED)
      .isMongoId().withMessage(ItemConst.RESPONSE_VALIDATE.ID_IS_NOT_VALID);
    const errors = req.validationErrors();
    if (errors) {
      return validationParamError(res, errors);
    }

    const folder = await _service.deleteObjById(req.params.id)

    res.status(200).json({
      status: 'success',
      data: folder
    });
  } catch (err) {
    return res.bad(err);
  }
}


