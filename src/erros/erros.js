export class InvalidArgumentError extends Error {
    constructor(mensagem) {
        super(mensagem);
        this.name = 'InvalidArgumentError';
    }
}
  
export class InternalServerError extends Error {
    constructor(mensagem) {
        super(mensagem);
        this.name = 'InternalServerError';
    }
}

export class ExpirationError extends Error {
    constructor(mensagem) {
        super(mensagem);
        this.name = 'ExpirationError'
    }
}
