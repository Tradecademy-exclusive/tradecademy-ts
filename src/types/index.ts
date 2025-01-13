import { Course, User } from '@prisma/client'
import { JwtPayload } from 'jsonwebtoken'

interface UserType extends User {
  courses: Course[]
}

export interface SessionType {
  user: UserType
  token: string
}

export interface CustomJwtPayload extends JwtPayload {
  email: string
  id: string
}
