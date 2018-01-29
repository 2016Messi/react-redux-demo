import { combineReducers } from 'redux'
import { user } from '././redux/user.redux'
import { chatuser} from '././redux/charuser.redux'
export default combineReducers({user,chatuser});