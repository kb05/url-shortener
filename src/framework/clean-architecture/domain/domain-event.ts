/**
 * The purpose is create a class which other DomainEvent can extend
 *
 * @export
 * @class Model
 */
export class DomainEvent {
    
    getType() {
        return DomainEvent;
    }
}
