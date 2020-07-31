import {combineReducers} from 'redux'
import studentProfile from './studentProfile'
import profileCourses from './profileCourses'
import searchResults from './search'
import courses from './courses'

export default combineReducers({
  studentProfile,
  profileCourses,
  courses,
  searchResults
})
