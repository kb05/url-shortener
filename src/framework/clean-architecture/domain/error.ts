/**
 * The purpose is create a class which other errors can extend
 *
 * @export
 * @class DomainError
 */
export abstract class DomainError {


    abstract describe() : string
    
    getType() {
        return DomainError;
    }
}
