const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const lineReader = require('line-by-line');

(function () {
    let file = 'mosd/staticcheck.json'
    if (!fs.existsSync(file)) {
        core.warning(
            `No file was found with the provided path: ${file}.`
        )
        return
    }

    let lr = new lineReader(file);
    lr.on('line', function (line) {
        const currentLine = JSON.parse(line);
        core.info(`::error file=${currentLine.location.file},line=${currentLine.location.line},col=${currentLine.location.column}::${currentLine.message}`);
    });
})();
