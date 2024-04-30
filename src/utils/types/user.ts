export interface ProfileProps {
  _id: string
  email: string
  firstName: string
  lastName: string
  avatar: string
  providerId: string
  lastLogin: Date | null
  newUser: boolean
  tier: string
  createdAt: Date
  updatedAt: Date
}
