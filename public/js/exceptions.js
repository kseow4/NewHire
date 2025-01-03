
class DateFormatException extends Error {
    constructor(message) {
        super();
        Error.captureStackTrace(this, this.constructor);
        this.name = "DateFormatException";
        this.message = message;
    }
}

// InvalidDateFormatOptionException.prototype = Object.create(Error.prototype);
// InvalidDateFormatOptionException.prototype.name = "InvalidDateFormatOptionException";
// InvalidDateFormatOptionException.prototype.constructor = InvalidDateFormatOptionException;