import {ActionTypes} from "../types";

const sampleReducer = (state = '', action: ActionTypes) => {
  switch (action.type) {
    case 'SAMPLE_REDUX_ACTION':
      return action.text
    default:
      return state
  }
}

export default sampleReducer
