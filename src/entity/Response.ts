export class Response {
    hasError: boolean
    error?: {}
    data?: {}

    constructor(hasError: boolean, error: {}, data: {} ){
        this.hasError = hasError;
        this.error = error;
        this.data = data;
    }
}