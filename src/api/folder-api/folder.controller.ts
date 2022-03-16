import * as _ from 'lodash';
import { Request, Response } from 'express';
import * as _service from './folder.service';
import { BaseError } from '../../libs/error';
import { FolderConst } from './folder.const';
import { validationParamError } from '../../libs/error';

export async function getAll(req: Request, res: Response) {
  try {
    const folder = await _service.getAll();
    res.status(200).json({
      status: 'success',
      length: folder.length,
      data: folder
    });
  } catch (err) {
    return res.bad(err);
  }
}

export async function getOne(req: Request, res: Response) {
  try {
    req.checkParams('id').trim().notEmpty().withMessage(FolderConst.RESPONSE_VALIDATE.ID_IS_REQUIRED)
      .isMongoId().withMessage(FolderConst.RESPONSE_VALIDATE.ID_IS_NOT_VALID);
    const errors = req.validationErrors();
    if (errors) {
      return validationParamError(res, errors);
    }

    const folder = await _service.getOne(req.params.id);
    res.status(200).json({
      status: 'success',
      data: folder
    });
  } catch (err) {
    return res.bad(err);
  }
}

export async function getAllItemsInFolder(req: Request, res: Response) {
  try {
    if (req.query.typeFile && req.query.sort) throw new BaseError({ message: 'only have a query param' });
    const folder = await _service.getAllItemsInFolder(req.params.id, req.query.typeFile, req.query.sort);
    res.status(200).json({
      status: 'success',
      length: folder.length,
      data: folder
    });
  } catch (err) {
    return res.bad(err);
  }
}

export async function create(req: Request, res: Response) {
  try {
    req.checkBody('name').trim().notEmpty().withMessage(FolderConst.RESPONSE_VALIDATE.NAME_IS_REQUIRED)
    const errors = req.validationErrors();
    if (errors) {
      return validationParamError(res, errors);
    }

    const folder = await _service.create({
      name: req.body.name,
    })

    res.status(200).json({
      status: 'success',
      data: folder
    });
  } catch (err) {
    return res.bad(err);
  }
}

export async function editName(req: Request, res: Response) {
  try {
    req.checkParams('id').trim().notEmpty().withMessage(FolderConst.RESPONSE_VALIDATE.ID_IS_REQUIRED)
      .isMongoId().withMessage(FolderConst.RESPONSE_VALIDATE.ID_IS_NOT_VALID);
    req.checkBody('name').trim().notEmpty().withMessage(FolderConst.RESPONSE_VALIDATE.NAME_IS_REQUIRED)
    const errors = req.validationErrors();
    if (errors) {
      return validationParamError(res, errors);
    }


    const folder = await _service.editName(req.params.id, { name: req.body.name })

    res.status(200).json({
      status: 'success',
      data: folder
    });
  } catch (err) {
    return res.bad(err);
  }
}

export async function softDelete(req: Request, res: Response) {
  try {
    req.checkParams('id').trim().notEmpty().withMessage(FolderConst.RESPONSE_VALIDATE.ID_IS_REQUIRED)
      .isMongoId().withMessage(FolderConst.RESPONSE_VALIDATE.ID_IS_NOT_VALID);
    const errors = req.validationErrors();
    if (errors) {
      return validationParamError(res, errors);
    }

    const folder = await _service.softDelete(req.params.id)

    res.status(200).json({
      status: 'success',
      data: folder
    });
  } catch (err) {
    return res.bad(err);
  }
}

export async function restore(req: Request, res: Response) {
  try {
    req.checkParams('id').trim().notEmpty().withMessage(FolderConst.RESPONSE_VALIDATE.ID_IS_REQUIRED)
      .isMongoId().withMessage(FolderConst.RESPONSE_VALIDATE.ID_IS_NOT_VALID);
    const errors = req.validationErrors();
    if (errors) {
      return validationParamError(res, errors);
    }

    const folder = await _service.restore(req.params.id)

    res.status(200).json({
      status: 'success',
      data: folder
    });
  } catch (err) {
    return res.bad(err);
  }
}

export async function destroy(req: Request, res: Response) {
  try {
    req.checkParams('id').trim().notEmpty().withMessage(FolderConst.RESPONSE_VALIDATE.ID_IS_REQUIRED)
      .isMongoId().withMessage(FolderConst.RESPONSE_VALIDATE.ID_IS_NOT_VALID);
    const errors = req.validationErrors();
    if (errors) {
      return validationParamError(res, errors);
    }
    
    const destroy = await _service.deleteObjById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: destroy
    });
  } catch (err) {
    return res.bad(err);
  }
}
