export interface User {
  profile: Profile
  _id: string
  googleId: string
  credits: number
  __v: number
}

export interface Profile {
  sub: string
  name: string
  given_name: string
  family_name: string
  picture: string
  email: string
  email_verified: boolean
}
