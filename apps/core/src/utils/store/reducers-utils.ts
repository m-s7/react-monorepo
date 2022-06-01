import store from '@/store/store'
import { Action, ActionCreator } from 'redux'
import { ActionReducerMapBuilder, AsyncThunk } from '@reduxjs/toolkit'

export const buildExtraReducersLinkToRestReducerStatus = <S, T, A, R>(
    builder: ActionReducerMapBuilder<S>,
    actionCreator: AsyncThunk<T, A, R>,
    action: ActionCreator<Action>): ActionReducerMapBuilder<S> => builder
    .addCase(actionCreator.pending, () => {
        store.dispatch(action('loading'))
    })
    .addCase(actionCreator.fulfilled, () => {
        store.dispatch(action('idle'))
    })
    .addCase(actionCreator.rejected, () => {
        store.dispatch(action('failed'))
    })
