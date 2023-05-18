type launch = {
    owner: string,
    share: boolean,
    description: string,
    id: number,
    uuid: string,
    name: string,
    number: number,
    startTime: number,
    endTime: number,
    lastModified: number,
    status: string,
    statistics: {
        executions: {
            total: number,
            failed: number,
            passed: number
        },
        defects: {
            system_issue: {
                total: number,
                si001: number
            },
            to_investigate: {
                total: number,
                ti001: number
            },
            automation_bug: {
                total: number,
                ab001: number
            }
        }
    },
    attributes: [
        {
            key: string,
            value: string
        },
        {
            key: null,
            value: string
        },
        {
            key: string,
            value: string
        }
    ],
    mode: string,
    analysing: [],
    approximateDuration: number,
    hasRetries: boolean,
    rerun: boolean
}

type page = {
    number: number,
    size: number,
    totalElements: number,
    totalPages: number
}

type launchResponse = {
    data: {
        content: launch[],
        page: page
    }
}