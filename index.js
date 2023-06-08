const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const lineReader = require('line-by-line');

(function () {
    const file = 'mosd/staticcheck.json'
    if (!fs.existsSync(file)) {
        return
    }

    const lr = new lineReader(file);
    lr.on('line', function (line) {
        const currentLine = JSON.parse(line);
        core.info(`::error file=${currentLine.location.file},line=${currentLine.location.line},col=${currentLine.location.column}::${currentLine.message}`);
    });
})();

(function () {
    let file = 'yaml-lint.txt'
    if (!fs.existsSync(file)) {
        return
    }
    const rgx = /(\w+):\s([^:]+):(\d+):(\d+): (.+)/gi;

    const lr = new lineReader(file);
    lr.on('line', function (line) {
        const matches = rgx.exec(line)
        if (!matches) {
            core.warning(`skip: ${line}.`)
            return
        }
        core.info(`::error file=${matches[2]},line=${matches[3]},col=${matches[4]}::${matches[5]}`);
    });
})();

(function () {
    const file = 'eslint.json'
    if (!fs.existsSync(file)) {
        returns
    }
    const lines = JSON.parse(fs.readFileSync(file, 'utf8'));
    lines.forEach(function (line) {
        line.messages.forEach(function (message) {
            if (line.severity === 1) {
                core.info(`::warning file=${line.filePath},line=${message.line},col=${message.column}::${message.message}`);
            }
            if (line.severity === 2) {
                core.info(`::error file=${line.filePath},line=${message.line},col=${message.column}::${message.message}`);
            }
        });
    })
})();
