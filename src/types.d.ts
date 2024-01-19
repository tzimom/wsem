export type ResponsePayload<T = {}> = {
    statusCode: number;
    message?: string;
} & { [k in keyof T]?: T[k] };
