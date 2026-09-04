export interface BackendToJsResponse {
    success: boolean
    data?: any
    failureReason?: FailureReason

}

export enum FailureReason {
    INVALID_PARAMS,
    METHOD_NOT_FOUND,
    CEF_UNAVAILABLE,
}