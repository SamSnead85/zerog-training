/**
 * API Client Utilities
 * 
 * Production-ready API client with error handling, retries,
 * request/response interceptors, and type safety.
 */

// =============================================================================
// TYPES
// =============================================================================

export interface ApiResponse<T> {
    data: T;
    success: true;
    message?: string;
}

export interface ApiError {
    success: false;
    error: {
        code: string;
        message: string;
        details?: Record<string, unknown>;
    };
    statusCode: number;
}

export type ApiResult<T> = ApiResponse<T> | ApiError;

interface RequestConfig {
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    headers?: Record<string, string>;
    body?: unknown;
    timeout?: number;
    retries?: number;
    retryDelay?: number;
}

// =============================================================================
// API CLIENT CLASS
// =============================================================================

class ApiClient {
    private baseUrl: string;
    private defaultHeaders: Record<string, string>;
    private defaultTimeout: number;

    constructor(baseUrl: string = "/api") {
        this.baseUrl = baseUrl;
        this.defaultHeaders = {
            "Content-Type": "application/json",
        };
        this.defaultTimeout = 30000; // 30 seconds
    }

    private async request<T>(
        endpoint: string,
        config: RequestConfig
    ): Promise<ApiResult<T>> {
        const { method, headers = {}, body, timeout = this.defaultTimeout, retries = 3, retryDelay = 1000 } = config;

        const url = `${this.baseUrl}${endpoint}`;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const fetchOptions: RequestInit = {
            method,
            headers: { ...this.defaultHeaders, ...headers },
            signal: controller.signal,
            credentials: "include",
        };

        if (body && method !== "GET") {
            fetchOptions.body = JSON.stringify(body);
        }

        let lastError: Error | null = null;

        for (let attempt = 0; attempt <= retries; attempt++) {
            try {
                const response = await fetch(url, fetchOptions);
                clearTimeout(timeoutId);

                // Parse response
                let data: unknown;
                const contentType = response.headers.get("content-type");
                if (contentType?.includes("application/json")) {
                    data = await response.json();
                } else {
                    data = await response.text();
                }

                // Handle non-2xx responses
                if (!response.ok) {
                    return {
                        success: false,
                        error: {
                            code: `HTTP_${response.status}`,
                            message: (data as { message?: string })?.message || response.statusText,
                            details: data as Record<string, unknown>,
                        },
                        statusCode: response.status,
                    };
                }

                return {
                    success: true,
                    data: data as T,
                };
            } catch (error) {
                clearTimeout(timeoutId);
                lastError = error as Error;

                // Don't retry on abort or non-retryable errors
                if (error instanceof DOMException && error.name === "AbortError") {
                    return {
                        success: false,
                        error: {
                            code: "TIMEOUT",
                            message: "Request timed out",
                        },
                        statusCode: 408,
                    };
                }

                // Retry on network errors
                if (attempt < retries) {
                    await new Promise((resolve) => setTimeout(resolve, retryDelay * (attempt + 1)));
                    continue;
                }
            }
        }

        // All retries exhausted
        return {
            success: false,
            error: {
                code: "NETWORK_ERROR",
                message: lastError?.message || "Network error occurred",
            },
            statusCode: 0,
        };
    }

    // HTTP Methods
    async get<T>(endpoint: string, options?: Partial<RequestConfig>): Promise<ApiResult<T>> {
        return this.request<T>(endpoint, { method: "GET", ...options });
    }

    async post<T>(endpoint: string, body?: unknown, options?: Partial<RequestConfig>): Promise<ApiResult<T>> {
        return this.request<T>(endpoint, { method: "POST", body, ...options });
    }

    async put<T>(endpoint: string, body?: unknown, options?: Partial<RequestConfig>): Promise<ApiResult<T>> {
        return this.request<T>(endpoint, { method: "PUT", body, ...options });
    }

    async patch<T>(endpoint: string, body?: unknown, options?: Partial<RequestConfig>): Promise<ApiResult<T>> {
        return this.request<T>(endpoint, { method: "PATCH", body, ...options });
    }

    async delete<T>(endpoint: string, options?: Partial<RequestConfig>): Promise<ApiResult<T>> {
        return this.request<T>(endpoint, { method: "DELETE", ...options });
    }

    // Set auth header
    setAuthToken(token: string) {
        this.defaultHeaders["Authorization"] = `Bearer ${token}`;
    }

    clearAuthToken() {
        delete this.defaultHeaders["Authorization"];
    }
}

// =============================================================================
// SINGLETON EXPORT
// =============================================================================

export const api = new ApiClient();

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

export function isApiError(result: ApiResult<unknown>): result is ApiError {
    return !result.success;
}

export function handleApiError(error: ApiError): string {
    // Handle specific error codes
    switch (error.error.code) {
        case "HTTP_401":
            return "Please log in to continue";
        case "HTTP_403":
            return "You don't have permission to perform this action";
        case "HTTP_404":
            return "The requested resource was not found";
        case "HTTP_422":
            return "Please check your input and try again";
        case "HTTP_429":
            return "Too many requests. Please wait a moment and try again";
        case "HTTP_500":
        case "HTTP_502":
        case "HTTP_503":
            return "Server error. Please try again later";
        case "TIMEOUT":
            return "Request timed out. Please check your connection";
        case "NETWORK_ERROR":
            return "Network error. Please check your connection";
        default:
            return error.error.message || "An unexpected error occurred";
    }
}

// =============================================================================
// TYPED API ENDPOINTS
// =============================================================================

export const endpoints = {
    // Auth
    auth: {
        login: "/auth/login",
        signup: "/auth/signup",
        logout: "/auth/logout",
        forgotPassword: "/auth/forgot-password",
        resetPassword: "/auth/reset-password",
        verify: "/auth/verify",
        refresh: "/auth/refresh",
    },
    // User
    user: {
        profile: "/user/profile",
        settings: "/user/settings",
        notifications: "/user/notifications",
        progress: "/user/progress",
    },
    // Training
    training: {
        modules: "/training/modules",
        module: (id: string) => `/training/modules/${id}`,
        lessons: (moduleId: string) => `/training/modules/${moduleId}/lessons`,
        progress: (moduleId: string) => `/training/modules/${moduleId}/progress`,
        complete: (moduleId: string) => `/training/modules/${moduleId}/complete`,
    },
    // Learning Paths
    paths: {
        list: "/paths",
        path: (id: string) => `/paths/${id}`,
        enroll: (id: string) => `/paths/${id}/enroll`,
        progress: (id: string) => `/paths/${id}/progress`,
    },
    // Organization
    org: {
        details: "/org",
        members: "/org/members",
        invite: "/org/invite",
        roles: "/org/roles",
        analytics: "/org/analytics",
    },
    // AI
    ai: {
        generate: "/ai/generate",
        suggest: "/ai/suggest",
        analyze: "/ai/analyze",
    },
} as const;
