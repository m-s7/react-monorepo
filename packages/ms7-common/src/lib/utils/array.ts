export const containsObject = <T>(haystack: Array<T>, needle: T): boolean => {
    for(const entry of haystack) {
        let contains = true
        for(const key of Object.keys(needle)) {
            if(entry[key as keyof T] !== needle[key as keyof T]) {
                contains = false

                break
            }
        }

        if(contains) return true
    }

    return false
}