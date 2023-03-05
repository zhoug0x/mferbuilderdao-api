import { AuctionService, Auction } from '@/services/AuctionService'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<Auction>
) {
  try {
    const auctionService = new AuctionService()
    const latestAuction = await auctionService.getLatestAuction()
    return response.status(200).json(latestAuction)
  } catch (error) {
    console.error(error)
    return response.status(500)
  }
}
