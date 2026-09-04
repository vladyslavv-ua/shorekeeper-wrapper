import {CefUnavailableError, isCefAvailable} from "../cef"

export function executeQuery(query: string, params: any[], resultType: "JSON" | "CSV") {

    if (!isCefAvailable()) {
        return Promise.reject(new CefUnavailableError())
    }

    return new Promise((resolve, reject) => {
        window.cefQuery({
            request: JSON.stringify({
                method: "executeQuery",
                params: {
                    query: query,
                    params: params,
                },
                resultType
            }),
        })
    })
}
