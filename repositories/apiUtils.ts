import qs from 'qs';

export const apiParamsSerializer = (params: unknown): string => {
    return qs.stringify(params, { arrayFormat: 'comma' });
};
