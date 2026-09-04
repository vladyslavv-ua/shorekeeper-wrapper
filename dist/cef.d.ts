/** Options accepted by the CEF message-router function injected into the page. */
export interface CefQueryOptions {
    /** Payload forwarded to the native CEF query handler. */
    request: string;
    /** Keep the query open so the native side can send more than one response. */
    persistent?: boolean;
    onSuccess?: (response: string) => void;
    onFailure?: (errorCode: number, errorMessage: string) => void;
}
/** Signature installed by CEF's `CefMessageRouterBrowserSide`. */
export type CefQuery = (options: CefQueryOptions) => number;
/** Signature of the optional cancellation function installed by CEF. */
export type CefQueryCancel = (requestId: number) => void;
declare global {
    interface Window {
        cefQuery: CefQuery;
        cefQueryCancel?: CefQueryCancel;
    }
}
export declare class CefUnavailableError extends Error {
    constructor();
}
/** Whether the current browser context has the CEF query bridge installed. */
export declare function isCefAvailable(): boolean;
/**
 * Send a one-shot request to the native CEF host.
 *
 * For persistent queries, use the typed `window.cefQuery(...)` API directly.
 */
export declare function cefQuery(request: string): Promise<string>;
//# sourceMappingURL=cef.d.ts.map