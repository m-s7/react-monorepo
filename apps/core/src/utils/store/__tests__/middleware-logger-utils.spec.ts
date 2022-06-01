import { logRestAction } from '@/utils/store/middleware-logger-utils'
import { logging } from '@/business/log-manager'
import each from 'jest-each'
import faker from '@faker-js/faker'

interface Url {
    url: string,
    path: string,
}

interface Action {
    type: string,
    meta: { arg: string | { url: string, body: string }},
    payload: { data: 'test-data' },
    error: 'test-error',
}

const createAction = (method: string, status: string, url: string): Action => ({
    type: `test/${method}/${status}`,
    meta: ((method === 'get' || method === 'remove') ? { arg: url } : { arg: { url, body: 'test-body' }}),
    payload: { data: 'test-data' },
    error: 'test-error',
})
const getRandomUrlObject = (): Url => {
    const url = faker.internet.url()
    const path = `${faker.internet.domainSuffix()}/${faker.internet.domainSuffix()}`

    return { url: `${url}/${path}`, path: `/${path}` }
}

describe('middleware-logger-utils', () => {
    const logger = logging.getLogger('test')

    beforeEach(() => {
        jest.spyOn(logger, 'debug')
    })

    describe('when logging rest action should log correct message', () => {
        each`
            method      | status            | params
            ${'get'}    | ${'pending'}      | ${['Fetch from']}
            ${'get'}    | ${'fulfilled'}    | ${['Received data from', 'test-data']}
            ${'get'}    | ${'rejected'}     | ${['Failed to fetch from', 'test-error']}
            ${'post'}   | ${'pending'}      | ${['Post to', 'test-body']}
            ${'post'}   | ${'fulfilled'}    | ${['Created on', 'test-data']}
            ${'post'}   | ${'rejected'}     | ${['Failed to postThunk to', 'test-error']}
            ${'put'}    | ${'pending'}      | ${['Put data to', 'test-body']}
            ${'put'}    | ${'fulfilled'}    | ${['Updated on', 'test-data']}
            ${'put'}    | ${'rejected'}     | ${['Failed to put to', 'test-error']}
            ${'patch'}  | ${'pending'}      | ${['Patch data on', 'test-body']}
            ${'patch'}  | ${'fulfilled'}    | ${['Updated on', 'test-data']}
            ${'patch'}  | ${'rejected'}     | ${['Failed to patch on', 'test-error']}
            ${'remove'} | ${'pending'}      | ${['Delete data on']}
            ${'remove'} | ${'fulfilled'}    | ${['Deleted from']}
            ${'remove'} | ${'rejected'}     | ${['Failed to delete on', 'test-error']}
            `
            .it('on $method/$status action', ({ method, status, params }) => {
                const { url, path } = getRandomUrlObject()
                const action = createAction(method, status, url)
                params[0] += ` ${path}`

                logRestAction(logger, action)

                expect(logger.debug).toHaveBeenCalledTimes(1)
                expect(logger.debug).toHaveBeenCalledWith(...params)
            })
    })
})
