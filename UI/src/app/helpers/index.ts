const isNullOrUndefined = (value: null | undefined | string) => {
    return value === null || value === undefined;
}

const generateRouteFromSegments = (segments: string[]) => {
    return segments.reduce((acc, currentValue) => {
        return acc.concat(currentValue)
    }, '')
}
export const Helpers = {
    isNullOrUndefined,
    generateRouteFromSegments
}
