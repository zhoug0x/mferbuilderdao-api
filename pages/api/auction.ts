import type { NextApiRequest, NextApiResponse } from 'next'

import { ethers } from 'ethers'
import { MferBuilderDAO } from 'mferbuilderdao-sdk'

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  // connect to sdk
  const provider = ethers.getDefaultProvider('mainnet')
  const sdk = MferBuilderDAO.connect({ signerOrProvider: provider })

  // get current auction data from the chain
  const auctionContract = sdk.auction()
  const result = await auctionContract.auction()

  // return result
  response.status(200).json({ result })
}
