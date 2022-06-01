export {}
// import store from '@/store/store'
// import { updateRouteReducers } from '@/utils/store/reducers-utils'
// import dummyReducer from '@/tests/data/dummy-slice'
// import { reducersManager } from '@/services/reducers-manager'

// describe('reducers-utils', () => {
//     describe('when updating route reducers', () => {
//         beforeEach(() => {
//             // jest.spyOn(reducersManager, 'contains')
//             // jest.spyOn(reducersManager, 'resetTemp')
//         })
//
//         it('should do nothing in no reducer is found in config', async () => {
//             // jest.spyOn(reducersManager, 'add')
//
//             // updateRouteReducers(({} as AppConfig))
//
//             // expect(reducersManager.contains).not.toHaveBeenCalled()
//             // expect(reducersManager.add).not.toHaveBeenCalled()
//             // expect(reducersManager.resetTemp).not.toHaveBeenCalled()
//         })
//
//         it('should not add reducer if reducer exists', () => {
//             // const config: unknown = { reducers: [{ name: 'test-dummy', file: dummyReducer }]}
//
//             // reducersManager.add('test-dummy', dummyReducer)
//
//             // jest.spyOn(reducersManager, 'add')
//
//             // updateRouteReducers((config as AppConfig))
//             // expect(reducersManager.contains).toHaveBeenCalledTimes(1)
//             // expect(reducersManager.add).not.toHaveBeenCalled()
//             // expect(reducersManager.resetTemp).toHaveBeenCalledTimes(1)
//         })
//
//         it('should add reducer if reducer does not exists', () => {
//             // const config: unknown = {
//             //     reducers: [{ name: 'test-dummy', file: dummyReducer }, {
//             //         name: 'test-dummy2',
//             //         file: dummyReducer,
//             //     }],
//             // }
//
//             // ?            jest.spyOn(reducersManager, 'add')
//
//             // updateRouteReducers((config as AppConfig))
//             //     expect(reducersManager.contains).toHaveBeenCalledTimes(2)
//             //     expect(reducersManager.add).toHaveBeenCalledTimes(2)
//             //     expect(reducersManager.resetTemp).toHaveBeenCalledTimes(1)
//             // })
//         })
//     })
// })