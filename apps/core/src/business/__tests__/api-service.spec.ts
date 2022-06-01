import { f } from '@/tests/utils/assertions-utils'
import { get, post, put, patch, remove } from '@/business/api-service'

jest.mock('@/services/api-service')

beforeEach(() => {
    // createReducerManager({})
})

describe('api-service', () => {
    it('when fetching should return correct data', async () => {
        f(get).mockReturnValue({ status: 200, data: { user: 'dummy', lastname: 'other' }})

        expect(await get('https://dummy.com/get')).toEqual({ status: 200, data: { user: 'dummy', lastname: 'other' }})
        expect(get).toHaveBeenCalledTimes(1)
        expect(get).toHaveBeenCalledWith('https://dummy.com/get')
    })

    it('when posting should postThunk and return correct data', async () => {
        f(post).mockReturnValue({ status: 200, data: { user: 'dummy', lastname: 'other' }})
 
        expect(await post('https://dummy.com/post', { val1: 'name', val2: 'surname' })).toEqual({ status: 200, data: { user: 'dummy', lastname: 'other' }})
        expect(post).toHaveBeenCalledTimes(1)
        expect(post).toHaveBeenCalledWith('https://dummy.com/post', { val1: 'name', val2: 'surname' })
    })

    it('when putting should put and return correct data', async () => {
        f(put).mockReturnValue({ status: 200, data: { user: 'dummy', lastname: 'other' }})

        expect(await put('https://dummy.com/put', { val1: 'name', val2: 'surname' })).toEqual({ status: 200, data: { user: 'dummy', lastname: 'other' }})
        expect(put).toHaveBeenCalledTimes(1)
        expect(put).toHaveBeenCalledWith('https://dummy.com/put', { val1: 'name', val2: 'surname' })
    })

    it('when patching should patch and return correct data', async () => {
        f(patch).mockReturnValue({ status: 200, data: { user: 'dummy', lastname: 'other' }})

        expect(await patch('https://dummy.com/patch', { val1: 'name', val2: 'surname' })).toEqual({ status: 200, data: { user: 'dummy', lastname: 'other' }})
        expect(patch).toHaveBeenCalledTimes(1)
        expect(patch).toHaveBeenCalledWith('https://dummy.com/patch', { val1: 'name', val2: 'surname' })
    })

    it('when removing should remove and return correct data', async () => {
        f(remove).mockReturnValue({ status: 200, data: { user: 'dummy', lastname: 'other' }})

        expect(await remove('https://dummy.com/remove')).toEqual({ status: 200, data: { user: 'dummy', lastname: 'other' }})
        expect(remove).toHaveBeenCalledTimes(1)
        expect(remove).toHaveBeenCalledWith('https://dummy.com/remove')
    })
})
