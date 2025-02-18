import Redis from 'ioredis'

export const redis = new Redis(process.env.REDIS_URL!, {
  maxRetriesPerRequest: null,
  reconnectOnError: (err) => {
    if (err.message.includes('ECONNRESET')) {
      console.warn('Redis connection was reset. Attempting to reconnect...')
      return true
    }
    return false
  },
  retryStrategy: (times) => {
    if (times >= 5) return null
    return Math.min(times * 100, 2000)
  },
})
