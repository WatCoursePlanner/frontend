const sampleReducer = (state = '', action) => {
  switch (action.type) {
    case 'SAMPLE_REDUX_ACTION':
      return action.text
    default:
      return state
  }
}

export default sampleReducer
