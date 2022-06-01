export default class FatalError extends Error {
    name: string

    constructor(name: string, message: string) {
        super(message)

        this.name = name
    }
}
