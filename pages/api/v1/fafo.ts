import { ethers } from 'ethers'
import { MferBuilderDAO } from 'mferbuilderdao-sdk'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    const provider = ethers.getDefaultProvider('mainnet')
    const sdk = MferBuilderDAO.connect({ signerOrProvider: provider })

    const auctionContract = sdk.auction()
    const tokenContract = sdk.token()



    // TODO: parse events here to get historical auctions
    const auctionFilters = auctionContract.filters
    const tokenFilters = tokenContract.filters

    const output = { auctionFilters, tokenFilters }

    

    response.status(200).json(output)
  } catch (error) {
    console.error(error)
    response.status(500)
  }
}
