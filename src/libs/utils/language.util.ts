import { AppConst } from '../../common/constants';
export class Language {
    _data: any;
    _lang: string = AppConst.DEFAULT_LANGUAGE;
    constructor(data: any) {
        this._data = data;
    }

    switch(lang: any) {
        this._lang = lang;
        let result = this.run(this._data);
        return result;
    }

    convertArrayToObject() {
        if (Array.isArray(this._data)) {
            let result: any = {};
            this._data.forEach((e, i) => {
                result[e.language] = e.content;
            });
            return result;
        } else {
            return {};
        }
    }

    private run(data: any) {
        if (Array.isArray(data)) {
            for (let i = 0; i < data.length; i++) {
                data[i] = this.run(data[i]);
            }
            return data;
        } else if (typeof data === 'object') {
            if (data[this._lang] !== undefined) {
                return data[this._lang];
            } else {
                Object.keys(data).forEach((key: any) => {
                    data[key] = this.run(data[key]);
                });
                return data;
            }
        } else {
            return data;
        }
    }
}