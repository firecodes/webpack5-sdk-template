export class UnsupportedError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'UnsupportedError'
		if (Error.hasOwnProperty('captureStackTrace')) {
			Error.captureStackTrace(this, UnsupportedError)
		} else {
			this.stack = (new Error(message)).stack
		}
	}
}

export class InvalidStateError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'InvalidStateError'
		if (Error.hasOwnProperty('captureStackTrace')) {
			Error.captureStackTrace(this, InvalidStateError)
		} else {
			this.stack = (new Error(message)).stack
		}
	}
}
