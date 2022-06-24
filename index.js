const core = require('@actions/core');
const github = require('@actions/github');

try {
    core.info(`::error file=mosd/internal/model/host.go,line=173}::awesome comment`);
} catch (error) {
    core.setFailed(error.message);
}
