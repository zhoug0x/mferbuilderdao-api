import { TokenService } from '@/services/TokenService'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    const { id } = request.query

    // validate token id
    if (!id || isNaN(parseInt(id as string)) || parseInt(id as string) < 0) {
      return response.status(400).end()
    }

    const tokenService = new TokenService()
    const token = await tokenService.getTokenById(id as string)
    return response.status(200).json(token)
  } catch (error) {
    console.error(error)
    return response.status(500).end()
  }
}
