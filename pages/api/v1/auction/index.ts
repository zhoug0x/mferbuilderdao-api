import type { NextApiRequest, NextApiResponse } from 'next'
import { ethers, BigNumber } from 'ethers'
import { MferBuilderDAO } from 'mferbuilderdao-sdk'

interface Auction {
  tokenId: string
  highestBid: BigNumber
  highestBidder: string
  startTime: number
  endTime: number
  settled: boolean
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    // connect to sdk
    const provider = ethers.getDefaultProvider('mainnet')
    const sdk = MferBuilderDAO.connect({ signerOrProvider: provider })

    // fetch most recent auction data from the chain
    const auctionContract = sdk.auction()
    const result = await auctionContract.auction()

    // parse results
    const auction: Auction = {
      tokenId: result[0].toString(),
      highestBid: result[1],
      highestBidder: result[2],
      startTime: result[3],
      endTime: result[4],
      settled: result[5],
    }

    // return result
    response.status(200).json({ ...auction })
  } catch (error) {
    console.error(error)
    response.status(500)
  }
}
