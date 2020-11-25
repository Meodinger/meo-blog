/**
 * Wait some time
 * @param ms {number} to sleep
 */
export const sleep = async (ms) =>
    new Promise((resolve) => setTimeout(() => resolve(''), ms));

/**
 * Get value by key in the url
 * @param key {string} the query key
 * @return {string | undefined} the value of the key
 */
export const getQueryString = (key) => {
    const reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    const r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return undefined;
}

/**
 * parse time stamp to date string
 * @param {number} time stamp in ms
 * @return {string} date
 */
export const stamp2date = (time) => {
    let temp = new Date();
    temp.setTime(time);
    return temp.toLocaleString();
}