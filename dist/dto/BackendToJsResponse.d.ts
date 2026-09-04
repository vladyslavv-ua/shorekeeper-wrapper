export interface BackendToJsResponse {
    success: boolean;
    data?: any;
    failureReason?: FailureReason;
}
export declare enum FailureReason {
    INVALID_PARAMS = 0,
    METHOD_NOT_FOUND = 1,
    CEF_UNAVAILABLE = 2
}
//# sourceMappingURL=BackendToJsResponse.d.ts.map