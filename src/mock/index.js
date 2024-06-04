import Mock from 'mockjs'
import { login, logout, getUserInfo } from './login'
// Configure the Ajax request delay, which can be used to test some effects in the project when the network delay is large
Mock.setup({
  timeout: 1000
})

// Login related and get user information
Mock.mock(/\/login/, login)
Mock.mock(/\/get_info/, getUserInfo)
Mock.mock(/\/logout/, logout)

export default Mock
