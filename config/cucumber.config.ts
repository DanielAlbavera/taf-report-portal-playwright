module.exports = {
    default: {
        formatOptions: {
            snippetInterface: 'async-await'
        },
        paths: [
            'tests/cucumber-test-runner/features/*.feature'
        ],
        publishQuiet: true,
        dryRun: false,
        require: [
            'tests/cucumber-test-runner/steps/*.ts',
            'tests/cucumber-test-runner/support/**'
        ],
        requireModule: [
            'ts-node/register'
        ],
        format: [
            'html:test-results/cucumber-report.html'
        ],
        parallel: 2
    }
}