import { get, post } from 'axios'

class UsersService {
  user = null

  constructor() {
    this.user = JSON.parse(localStorage.getItem('user'))
  }

  async signIn(body) {
    const user = (await post(`${process.env.VUE_APP_API}/dj-rest-auth/login/`, body)).data
    this.user = user
    localStorage.setItem('access_token', user.access_token)
    localStorage.setItem('user', JSON.stringify(user))
    return user
  }

  async logout() {
    await post(`${process.env.VUE_APP_API}/dj-rest-auth/logout/`)
    this.user = null
    localStorage.removeItem('user')
    localStorage.removeItem('access_token')
  }

  async signUp(body) {
    const user = (await post(`${process.env.VUE_APP_API}/dj-rest-auth/registration/`, body)).data
    this.user = user
    localStorage.setItem('access_token', user.access_token)
    localStorage.setItem('user', JSON.stringify(user))
    return user
  }

  async getProfile() {
    const access_token = localStorage.getItem('access_token')
    const user = (await get(`${process.env.VUE_APP_API}/dj-rest-auth/user/`, { headers: { Authorization:`Bearer ${access_token}`}})).data
    return user
  }

  async getUserList() {
    return (await get(`${process.env.VUE_APP_API}/users/`)).data
  }

  async googleSignIn(body) {
    const user = (await post(`${process.env.VUE_APP_API}/dj-rest-auth/google/`, body)).data
    this.user = user
    localStorage.setItem('access_token', user.access_token)
    localStorage.setItem('user', JSON.stringify(user))
    return user
  }
}

const usersService = new UsersService()

export { usersService }
