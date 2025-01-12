/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProfilingStatusModel } from '../models/ProfilingStatusModel';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ProfilingResource {

    /**
     * @returns any Success
     * @throws ApiError
     */
    public static getProfilingStatus(): CancelablePromise<ProfilingStatusModel> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/umbraco/management/api/v1/profiling/status',
        });
    }

    /**
     * @returns any Success
     * @throws ApiError
     */
    public static putProfilingStatus({
        requestBody,
    }: {
        requestBody?: ProfilingStatusModel,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/umbraco/management/api/v1/profiling/status',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
