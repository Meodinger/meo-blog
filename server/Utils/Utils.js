const crypto = require("crypto");

/**
 * @private
 * Use `md5_2` instead
 */
const md5 = (str) => {
    let obj = crypto.createHash("md5");
    obj.update(str);
    return obj.digest("hex");
};
/**
 * Calc twice when restore password
 * @param {string} str password
 * @return {string} hash
 */
const md5_2 = (str) => md5(str + md5(str));

/**
 * Verify two time stamps
 * Two time stamps are equal as long as their difference less than 2ms
 * @param {number} one
 * @param {number} another
 * @return {boolean}
 */
const verifyTimeStamp = (one, another) => {
    return (Math.abs(one - another) < 2);
}

exports.md5 = md5_2;
exports.verifyTimeStamp = verifyTimeStamp;