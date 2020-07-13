import { combineReducers } from 'redux'
import studentProfile from './studentProfile'
import courses from './courses'

export default combineReducers({
  studentProfile,
  courses
})
