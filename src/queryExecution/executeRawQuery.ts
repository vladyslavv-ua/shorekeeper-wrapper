import {CefUnavailableError, isCefAvailable} from "../cef"
import {FailureReason} from "../dto/BackendToJsResponse"
import type {BackendToJsResponse} from "../dto/BackendToJsResponse"

export function executeRawQuery(query: string, params: any[], outputFormat: "JSON" | "CSV"): Promise<BackendToJsResponse> {

    if (!isCefAvailable()) {
        return Promise.reject({
            success: false,
            failureReason: FailureReason.CEF_UNAVAILABLE
        })
    }

    return new Promise((resolve, reject) => {
        window.cefQuery({
            request: JSON.stringify({
                method: "executeRawQuery",
                params: {
                    query: query,
                    params: params,
                    outputFormat: outputFormat
                }
            }),
            onSuccess: function (response) {
                resolve(JSON.parse(response))
            },
            onFailure: function (errorCode, errorMessage) {
                reject({
                    success: false,
                    failureReason: FailureReason.CEF_UNAVAILABLE
                })
            }
        })
    })
}