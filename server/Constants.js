
/**
 * Pretend to be an enum
 * @type {Object}
 */
const CATEGORY = {
    Code: 'Code',
    Diary: 'Diary',
    Essay: 'Essay',
    Other: 'Other',
};

const LINE_BREAK = (process.platform === 'win32') ? '\n\r' : '\n';

exports.CATEGORY = CATEGORY;
exports.LINE_BREAK = LINE_BREAK;