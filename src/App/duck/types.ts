export const SAMPLE_REDUX_ACTION = 'SAMPLE_REDUX_ACTION'

interface SampleAction {
    type: typeof SAMPLE_REDUX_ACTION
    text: string
}

export type ActionTypes = SampleAction
