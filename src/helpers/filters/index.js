const getArrayIntersection = (first, second) => first.filter(item => second.includes(item));

/**
 * get books collection filtered by tags
 * @param books
 * @param tags
 */
export const filterByTags = (books, tags) => tags && tags.length
    ? books.filter(book => getArrayIntersection(tags, book.tags).length === tags.length)
    : books;