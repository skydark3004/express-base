import { IOptionCommon, ILanguage } from '../../common/interfaces';

export class ICreateTemplateExampleRequest {
    examplePopulateData: string;
    exampleDataString: string;
    exampleDataNumber: number;
    exampleDataBoolean: boolean;
    exampleDataMultiLanguage: ILanguage[];
}

export class IUpdateTemplateExampleRequest {
    examplePopulateData: string;
    exampleDataString: string;
    exampleDataNumber: number;
    exampleDataBoolean: boolean;
    exampleDataMultiLanguage: ILanguage[];
}

export class IActionAnyTemplateExampleRequest {
    exampleTest1: string;
    exampleTest2: string;
}
export class IListTemplateExampleRequest extends IOptionCommon {
    keySearch?: string;
}