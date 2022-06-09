import { pickOne } from '../object'

describe('object.ts', () => {
    it('should return one property', () => {
        const testObject = { name: 'test-name', surname: 'test-surname', age: 99, data: { some: 'value' }}
        
        const data = pickOne(testObject, 'data')

        expect(data).toEqual({ some: 'value' })
    })
})
