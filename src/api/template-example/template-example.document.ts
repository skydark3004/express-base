
/**
 * @api {POST} api/v1/template-example/create 1. create
 * @apiName create
 * @apiGroup TemplatesExamples
 * @apiDescription Add
 * @apiVersion  1.0.0
 * @apiUse failed
 * @apiParam (Headers) {String} Authorization Json Web Token (JWT).
 *
 * @apiParam (Body) {String} exampleDataString exampleDataString
 * @apiParam (Body) {String} exampleDataString1 exampleDataString1
 * @apiParam (Body) {Boolean} exampleDataBoolean exampleDataBoolean
 * @apiParam (Body) {Array} exampleDataMultiLanguage exampleDataMultiLanguage
 * @apiParam (Body) {String} exampleDataMultiLanguage.language language of content
 * @apiParam (Body) {String} exampleDataMultiLanguage.content content of content
 * @apiParamExample {String} Request-Example
  link :http://domain.com/api/v1/template-example
 * @apiParamExample {json} Request-Example:
  {
    "exampleDataString": "exampleDataString",
    "exampleDataString1": "exampleDataString1",
    "exampleDataBoolean": true,
    "exampleDataMultiLanguage": [
      {
        "language": "vi",
        "content": "test content 1"
      },
      {
        "language": "en",
        "content": "test content 2"
      }
    ]
  }
 * @apiSuccessExample {JSON} Response: HTTP/1.1 200 OK
  {
    "_id": "5edbcde1ee738c18a0fd16d8",
    "dateCreated": "2020-06-06T17:09:53.724Z",
    "dateUpdated": "2020-06-06T17:09:53.724Z"
  }
*/


/**
 * @api {PUT} api/v1/template-example/:id 2. update
 * @apiName update
 * @apiGroup TemplatesExamples
 * @apiDescription Update data
 * @apiVersion  1.0.0
 * @apiUse failed
 *
 * @apiParam (Params) {String} id id
 * @apiParam (Body) {String} exampleDataString exampleDataString
 * @apiParam (Body) {String} exampleDataString1 exampleDataString1
 * @apiParam (Body) {Boolean} exampleDataBoolean exampleDataBoolean
 * @apiParam (Body) {Array} [exampleDataMultiLanguage] exampleDataMultiLanguage
 * @apiParam (Body) {String} exampleDataMultiLanguage.language language of content
 * @apiParam (Body) {String} exampleDataMultiLanguage.content content of content
 * @apiParamExample {String} Request-Example
  PUT link :http://domain.com/api/v1/template-example/5ed6193e939e9c2c6895c263
 * @apiParamExample {json} Request-Example:
  {
    "exampleDataString": "exampleDataString",
    "exampleDataString1": "exampleDataString1",
    "exampleDataBoolean": true,
    "exampleDataMultiLanguage": [
      {
        "language": "en",
        "content": "test content policy 22"
      }
    ]
}
 * @apiSuccessExample {JSON} Response: HTTP/1.1 200 OK
  {
    "_id": "5edbcaca46fe1c17f049aed1",
    "dateCreated": "2020-06-06T16:56:42.472Z",
    "dateUpdated": "2020-06-06T17:43:38.672Z"
  }
*/


/**
 * @api {GET} api/v1/template-example/list [admin] 3. get list
 * @apiName getList
 * @apiGroup TemplatesExamples
 * @apiDescription Get List
 * @apiVersion  1.0.0
 * @apiUse failed
 *
 * @apiParam (QueryString) {String} [keySearch] keySearch
 * @apiUse pagination
 * @apiParamExample {String} Request-Example
 Get list :http://domain.com/api/v1/template-example/list?page=1&pageSize=20&keySearch=
* @apiSuccessExample {JSON} Response: HTTP/1.1 200 OK
{
  "data": [
    {
      "_id": "5edbcaca46fe1c17f049aed1"
    }
  ],
  "totalItem": 1,
  "page": 1,
  "pageSize": 20,
  "totalPage": 1
}
*/

/**
 * @api {GET} api/v1/template-example/:id 4. get detail
 * @apiName getDetail
 * @apiGroup TemplatesExamples
 * @apiDescription Get detail
 * @apiVersion  1.0.0
 * @apiUse failed
 *
 * @apiParam (Params) {String} id id
 * @apiParamExample {String} Request-Example
  Get detail :http://domain.com/api/v1/template-example/5edbcaca46fe1c17f049aed1
 * @apiSuccessExample {JSON} Response: HTTP/1.1 200 OK
  {
    "_id": "5edbcaca46fe1c17f049aed1",
    "dateCreated": "2020-06-06T16:56:42.472Z",
    "dateUpdated": "2020-06-06T17:21:41.615Z"
  }
*/

/**
 * @api {DELETE} api/v1/template-example/:id [admin] 5. delete by id
 * @apiName deleteById
 * @apiGroup TemplatesExamples
 * @apiDescription Delete by id
 * @apiVersion  1.0.0
 * @apiUse failed
 *
 * @apiParam (Params) {String} id id
 * @apiParamExample {String} Request-Example
  DELETE link :http://domain.com/api/v1/template-example/5ed6193e939e9c2c6895c263
 * @apiSuccessExample {JSON} Response: HTTP/1.1 200 OK
  {
    "_id": "5edbcaca46fe1c17f049aed1",
    "dateCreated": "2020-06-06T16:56:42.472Z",
    "dateUpdated": "2020-06-06T17:43:38.672Z"
  }
*/

/**
 * @api {Patch} api/v1/template-example/:id/change-status-active 6. change status active
 * @apiName changeStatusActive
 * @apiGroup TemplatesExamples
 * @apiDescription change status active
 * @apiVersion  1.0.0
 * @apiUse failed
 *
 * @apiParam (Params) {String} id id
 * @apiParam (Body) {Boolean} status status true or false
 * @apiParamExample {String} Request-Example
  PATCH link :http://domain.com/api/v1/template-example/5ed6193e939e9c2c6895c263/change-status-active
  * @apiParamExample {json} Request-Example:
  {
    "status": true
  }
 * @apiSuccessExample {JSON} Response: HTTP/1.1 200 OK
  {
    "_id": "5edbcaca46fe1c17f049aed1",
    "dateCreated": "2020-06-06T16:56:42.472Z",
    "dateUpdated": "2020-06-06T17:43:38.672Z"
  }
*/