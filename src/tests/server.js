import { setupServer } from 'msw/node'
import { studentHandlers } from './handlers/students'

export const server = setupServer(...studentHandlers)
