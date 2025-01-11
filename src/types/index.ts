import { User } from '@prisma/client'
import { JwtPayload } from 'jsonwebtoken'

export interface SessionType {
  user: User
  token: string
}

export interface CustomJwtPayload extends JwtPayload {
  email: string
  id: string
}
