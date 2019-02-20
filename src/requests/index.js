/**
 * emulate api call to fetch books data
 * @param fileName
 */
export const fetchBookList = fileName => fetch(
    `./storage/${fileName}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
    }).then(
    rawResponse => {
        const {status, statusText} = rawResponse;
        return status && status === 200
            ? Promise.resolve(rawResponse.json())
            : Promise.reject(`${status} error: ${statusText}`)
    })