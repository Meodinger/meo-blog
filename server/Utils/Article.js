
/**
 * Message when read file failed or some other errors while read
 * @param {string} message error message
 * @return {string} message client get
 */
const articleErr = (message) => {
    return `# Error: ${message}`;
}

/**
 * Message when read file failed or some other errors while read
 * @param {{name: string, message: string}} err get while readdir
 * @param {string} cate where err occurred
 * @return {string} message client get
 */
const articlesErr = (err, cate) => {
    return `{"articles":[{"title": "${err.name}", "abstract": "${err.message}", "category": "${cate}", "time": 0, "tags": ["NO","TAG","HERE"]}]}`;
}

/**
 * Message when server denied an access
 * @param {string} cate where access denied occurred
 * @param {string} reason why access denied
 * @return {string} message client get
 */
const articlesDenied = (cate, reason) => {
    return `{"articles":[{"title": "Denied", "abstract": "${reason}", "category": "${cate}", "time": 0, "tags": ["NO","TAG","HERE"]}]}`;
}

exports.articleErr = articleErr;
exports.articlesErr = articlesErr;
exports.articlesDenied = articlesDenied;