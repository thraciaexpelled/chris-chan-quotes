const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');

module.exports = {
    createSuitableConfigPath(configFilename) {
        return path.join(os.homedir(), ".config", "chris-chan-quotes", configFilename);
    },

    configExists(configFilepath) {
        return fs.existsSync(configFilepath);
    },

    createConfigFile(configFilepath) {
        if (!this.configExists(configFilepath)) {
            fs.copyFile(path.join(__dirname, "..", "res", "quotes.json"), configFilepath, (err) => {
                if (err) {
                    if (err.code == 'ENONET') {
                        console.log("- error detected, fixing error");
                        fs.mkdir(path.dirname(configFilepath), { recursive: true }, (err) => {
                            if (err) throw err;
                            console.log("- trying again");
                            this.createConfigFile(configFilepath);
                        });
                    }
                }
                console.log("+ created quotes file as one had not existed");
            });
        }
        return 0;
    },

    initialize() {
        const quotesFilepath = this.createSuitableConfigPath("chrisChanQuotes.json");
        fs.mkdir(path.dirname(quotesFilepath), { recursive: true }, (err) => {
            if (err) throw err;
        });

        assert.strictEqual(this.createConfigFile(quotesFilepath), 0, "- config file was not created succesfully");
    }
}