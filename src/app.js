const config = require("./readConfig");
const fs = require('fs');

config.initialize();


fs.readFile(config.createSuitableConfigPath("chrisChanQuotes.json"), "utf-8", (err, data) => {
    if (err) throw err;
    const quotesJSONData = JSON.parse(data);
    const quotes = quotesJSONData.chrisChanQuotes;

    const convertJSONObjectToJSArray = (JSONObject) => {
        const arr = [];
        for (const items of JSONObject)
            arr.push(JSON.stringify(items));
        return arr;
    };

    // stolen from stack overflow
    function getRandom(list) {
        return list[Math.floor((Math.random()*list.length))];
    }

    console.log(getRandom(convertJSONObjectToJSArray(quotes)));
});