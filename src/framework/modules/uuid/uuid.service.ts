export abstract class UUIDService {
    abstract getShortUUID(length : number) : Promise<string>
}
