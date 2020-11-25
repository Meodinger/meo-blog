const {CATEGORY, LINE_BREAK} = require('../Constants');
const {md5} = require('../Utils/Utils');


const dateFormat = require('dateformat');
const {
    writeFileSync,
    existsSync,
} = require('fs');
const {
    readJsonSync,
    writeJSONSync,
    removeSync,
    copySync
} = require('fs-extra');

exports.default = class ConfigManager {

    constructor() {
        this.unInitialized_pwd = '-null-';
        this.configPath = './config.json';

        if (!existsSync(this.configPath)) {
            writeFileSync(this.configPath,
                `{
              "password" : "${this.unInitialized_pwd}"
            }`);
        }

        process.stdout.write(`now password hash: ${this.load()['password']}\n`);
        if (this.load()['password'] === this.unInitialized_pwd) {
            process.stdout.write(`No password for ${CATEGORY.Diary} now, please enter one\n`);
            process.stdin.on('data', (input) => {
                this.set('password', md5(input.slice(0, -LINE_BREAK.length)));
            })
        }
    }

    /**
     * Loads config.json (Only password now) into memory
     * @public
     * @return {({password: string}|Boolean)} False if the config.json could not be loaded
     */
    load() {
        try {
            this.config = readJsonSync(this.configPath);
        } catch (e) {
            return false;
        }

        return this.config;
    }

    /**
     * Creates backup of current config
     * @private
     * @return {String} Backed up config.json path
     */
    backup() {
        const backupPath = `${this.configPath}.${dateFormat('dd-mm-yy-HH-MM-ss')}.bak`;
        copySync(this.configPath, backupPath);

        return backupPath;
    }

    /**
     * First makes a backup of the current `config.json`
     * Then writes current config to disk
     * @public
     * @return {Boolean} False on failure
     */
    save() {
        const backupPath = this.backup();

        try {
            writeJSONSync(this.configPath, this.config, {
                // Indent with two spaces
                spaces: 2,
            });
            removeSync(backupPath);
            process.stdout.write(`Saved config file\n`);

            return true;
        } catch (err) {
            process.stdout.write(`Failed to save config file: ${err}\n`);

            return false;
        }
    }

    /**
     * Get current value of config[`key`]
     * @param {string} key to get value
     * @public
     * @return {*} value
     */
    get(key) {
        return this.config[key];
    }

    /**
     * Updates current config[`key`] with `value` then writes changes to disk
     * @param {string} key the key of config
     * @param {*} value new value to change `key` to
     * @public
     * @return {Boolean} False on failure
     */
    set(key, value) {
        this.config[key] = value;
        return this.save();
    }
}
