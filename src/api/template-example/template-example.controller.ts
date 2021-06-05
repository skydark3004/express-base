import * as _ from 'lodash';
import { Request, Response } from 'express';

import * as _service from './template-example.service';
import { TemplateExampleConst } from './template-example.const';

import * as Utils from '../../libs/utils';
import { validationParamError } from '../../libs/error';
import { AppConst } from '../../common/constants';



export function create(req: Request, res: Response) {
  req.checkBody('exampleDataString').trim()
    .notEmpty().withMessage(TemplateExampleConst.RESPONSE_VALIDATE.TEMPLATE_EXAMPLE_DATA_1_IS_REQUIRED)
    .isMongoId().withMessage(TemplateExampleConst.RESPONSE_VALIDATE.TEMPLATE_EXAMPLE_DATA_1_IS_NOT_VALID);
  req.checkBody('exampleDataString1').trim()
    .notEmpty().withMessage(TemplateExampleConst.RESPONSE_VALIDATE.TEMPLATE_EXAMPLE_DATA_2_IS_REQUIRED)
    .isIn(Object.values(AppConst.EXAMPLE_CATEGORIES)).withMessage(TemplateExampleConst.RESPONSE_VALIDATE.TEMPLATE_EXAMPLE_DATA_2_IS_NOT_VALID);

  req.checkBody('exampleDataMultiLanguage')
    .notEmpty().withMessage(TemplateExampleConst.RESPONSE_VALIDATE.TEMPLATE_EXAMPLE_DATA_3_IS_REQUIRED)
    .isArray().withMessage(TemplateExampleConst.RESPONSE_VALIDATE.TEMPLATE_EXAMPLE_DATA_3_IS_REQUIRED);
  req.checkBody('exampleDataBoolean')
    .notEmpty().withMessage(TemplateExampleConst.RESPONSE_VALIDATE.TEMPLATE_EXAMPLE_DATA_4_IS_REQUIRED)
    .isBoolean().withMessage(TemplateExampleConst.RESPONSE_VALIDATE.TEMPLATE_EXAMPLE_DATA_4_IS_REQUIRED);

  const errors = req.validationErrors();
  if (errors) {
    return validationParamError(res, errors);
  }

  let arrayByLangContentObj = Object.values(req.body.content.map((item: any) => item.language));
  if (!arrayByLangContentObj.includes(AppConst.DEFAULT_LANGUAGE)) {
    return res.bad(TemplateExampleConst.RESPONSE_VALIDATE.LANGUAGE_MUST_BE_HAVE_DEFAULT_LANG);
  }
  if (Utils.ObjectUtil.checkIfDuplicateExists(arrayByLangContentObj)) {
    return res.bad(TemplateExampleConst.RESPONSE_VALIDATE.LANGUAGE_CAN_NOT_DUPLICATE);
  }

  const encodeData = Utils.StringUtil.removeAllSpecialCharByParams(req.body, ['exampleDataString', 'exampleDataString1']);
  if (req.body.exampleDataBoolean == true) {
    encodeData.exampleDataBoolean = true;
  } else {
    encodeData.exampleDataBoolean = false;
  }
  const params: any = _.pick(encodeData, ['exampleDataString', 'exampleDataString1', 'exampleDataMultiLanguage', 'exampleDataBoolean']);
  _service.create(params)
    .then(result => {
      return res.ok(result);
    })
    .catch(err => {
      return res.bad(err);
    });
}

export function update(req: Request, res: Response) {
  req.checkParams('id').trim().notEmpty().withMessage(TemplateExampleConst.RESPONSE_VALIDATE.ID_IS_REQUIRED)
    .isMongoId().withMessage(TemplateExampleConst.RESPONSE_VALIDATE.ID_IS_NOT_VALID);

  if (req.body.exampleDataMultiLanguage) {
    req.checkBody('exampleDataMultiLanguage')
      .notEmpty().withMessage(TemplateExampleConst.RESPONSE_VALIDATE.TEMPLATE_EXAMPLE_DATA_3_IS_REQUIRED)
      .isArray().withMessage(TemplateExampleConst.RESPONSE_VALIDATE.TEMPLATE_EXAMPLE_DATA_3_IS_REQUIRED);
  }

  const errors = req.validationErrors();
  if (errors) {
    return validationParamError(res, errors);
  }

  if (req.body.content) {
    let arrayByLangContentObj = Object.values(req.body.content.map((item: any) => item.language));
    if (Utils.ObjectUtil.checkIfDuplicateExists(arrayByLangContentObj)) {
      return res.bad(TemplateExampleConst.RESPONSE_VALIDATE.LANGUAGE_CAN_NOT_DUPLICATE);
    }
  }

  const id = Utils.StringUtil.removeAllSpecialCharacter(req.params.id);
  const params: any = _.pick(req.body, ['exampleDataMultiLanguage']);
  _service.update(id, params)
    .then(user => {
      return res.ok(user);
    })
    .catch(err => {
      return res.bad(err);
    });
}

export function getDetailById(req: Request, res: Response) {
  const id = Utils.StringUtil.removeAllSpecialCharacter(req.params.id);
  _service.getDetailById(id)
    .then(data => {
      return res.ok(data);
    })
    .catch(err => {
      return res.bad(err);
    });
}

export function deleteObjById(req: Request, res: Response) {
  req.checkParams('id').trim().notEmpty().withMessage(TemplateExampleConst.RESPONSE_VALIDATE.ID_IS_REQUIRED)
    .isMongoId().withMessage(TemplateExampleConst.RESPONSE_VALIDATE.ID_IS_NOT_VALID);
  const errors = req.validationErrors();
  if (errors) {
    return validationParamError(res, errors);
  }
  const id = Utils.StringUtil.removeAllSpecialCharacter(req.params.id);
  _service.deleteObjById(id)
    .then(data => {
      return res.ok(data);
    })
    .catch(err => {
      return res.bad(err);
    });
}
export function changeStatusActive(req: Request, res: Response) {
  req.checkParams('id').trim().notEmpty().withMessage(TemplateExampleConst.RESPONSE_VALIDATE.ID_IS_REQUIRED)
    .isMongoId().withMessage(TemplateExampleConst.RESPONSE_VALIDATE.ID_IS_NOT_VALID);
  req.checkBody('status').trim().notEmpty().withMessage(TemplateExampleConst.RESPONSE_VALIDATE.STATUS_IS_REQUIRED)
    .isBoolean().withMessage(TemplateExampleConst.RESPONSE_VALIDATE.STATUS_IS_NOT_VALID);
  const errors = req.validationErrors();
  if (errors) {
    return validationParamError(res, errors);
  }
  const id = Utils.StringUtil.removeAllSpecialCharacter(req.params.id);
  let status = false;
  if (req.body.status == true) {
    status = true;
  }
  _service.changeStatusActive(id, status)
    .then(data => {
      return res.ok(data);
    })
    .catch(err => {
      return res.bad(err);
    });
}

export function getList(req: Request, res: Response) {
  const errors = req.validationErrors();
  if (errors) {
    return validationParamError(res, errors);
  }

  let queryRequest: any = Utils.StringUtil.removeAllSpecialCharByParams(req.query, ['page', 'pageSize', 'keySearch', 'language']);
  _service.getList(queryRequest)
    .then(data => {
      return res.ok(data);
    })
    .catch(err => {
      return res.bad(err);
    });
}