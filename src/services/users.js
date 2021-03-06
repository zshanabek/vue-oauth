import { get, post } from 'axios'

class UsersService {
  user = null

  constructor() {
    this.user = JSON.parse(localStorage.getItem('user'))
  }

  async signIn(body) {
    const data = (await post(`https://django-oauth.herokuapp.com/dj-rest-auth/login/`, body)).data
    this.user = data.user
    localStorage.setItem('access_token', data.access_token)
    localStorage.setItem('user', JSON.stringify(this.user))
    return this.user
  }

  async logout() {
    await post(`https://django-oauth.herokuapp.com/dj-rest-auth/logout/`)
    this.user = null
    localStorage.removeItem('user')
    localStorage.removeItem('access_token')
  }

  async signUp(body) {
    const data = (await post(`https://django-oauth.herokuapp.com/dj-rest-auth/registration/`, body)).data
    this.user = data.user
    localStorage.setItem('access_token', data.access_token)
    localStorage.setItem('user', JSON.stringify(this.user))
    return this.user
  }

  async getProfile() {
    const access_token = localStorage.getItem('access_token')
    const user = (await get(`https://django-oauth.herokuapp.com/dj-rest-auth/user/`, { headers: { Authorization:`Bearer ${access_token}`}})).data
    return user
  }

  async getUserList() {
    return (await get(`https://django-oauth.herokuapp.com/users/`)).data
  }

  async googleSignIn(body) {
    const data = (await post(`https://django-oauth.herokuapp.com/dj-rest-auth/google/`, body)).data
    this.user = data.user
    localStorage.setItem('access_token', data.access_token)
    localStorage.setItem('user', JSON.stringify(this.user))
    return this.user
  }
}

const usersService = new UsersService()

export { usersService }
