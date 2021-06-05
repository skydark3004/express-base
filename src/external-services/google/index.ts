import { isEmpty } from 'lodash';
import { BaseError } from '../../libs/error';
import APP_CONFIG from '../../configs/app.config';
import { StringUtil } from '../../libs/utils';
import axios from 'axios';

export class GoogleMapApiService {
    private url: string;
    constructor() {
        this.url = `https://maps.googleapis.com/maps/api`;
    }

    public getLocationWithLatLng = async (lat: any, lng: any) => {
        let result: any = {};
        return axios.get(`${this.url}/geocode/json?latlng=${lat},${lng}&key=${APP_CONFIG.ENV.GOOGLE.API_KEY}`)
            .then(res => {
                let googleResult = res.data;
                if (googleResult.status === 'OK') {
                    const locationAddress = googleResult.results[0];
                    const decodeAddress = this.decodeAddressComponent(locationAddress.address_components);
                    result.formattedAddress = locationAddress.formatted_address;
                    result.postalCode = decodeAddress.zipCode;
                    result.city = decodeAddress.city;
                    result.country = decodeAddress.country;
                    result.state = decodeAddress.city && !isEmpty(decodeAddress.city) ? StringUtil.toUrl(decodeAddress.city, true).toLowerCase() : undefined;
                    return result;
                } else if (googleResult.status === 'ZERO_RESULTS') {
                    throw new BaseError({ message: `Can not get location in map with this address.` });
                }
                else {
                    throw new BaseError({ message: `Get location in google map fail.` });
                }
            })
            .catch(error => {
                if (error !== undefined && error.error_message !== undefined && error.error_message !== null) {
                    throw new BaseError({ message: error.error_message });
                }
                throw new BaseError({ message: error.message || error });
            });
    }
    private decodeAddressComponent(address_components: any) {
        let results: any = {};
        if (address_components.length == 0)
            return results;
        for (let i = 0; i < address_components.length; i++) {
            if (address_components[i].types.includes('postal_code')) {
                results.zipCode = address_components[i].long_name;
            }
            if (address_components[i].types.includes('administrative_area_level_1', 0)) {
                results.city = address_components[i].long_name;
            }
            if (address_components[i].types.includes('country', 0)) {
                results.country = address_components[i].long_name;
            }
        }
        return results;
    }

}