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
    const tokenContract = sdk.token()

    console.log('fetching...')

    const currentBlock = await provider.getBlockNumber()

    const allMintsFilter = tokenContract.filters.Transfer(
      ethers.constants.AddressZero, // from
      null, // to
      null // tokenId
    )

    const results = await tokenContract.queryFilter(
      allMintsFilter,
      currentBlock - 2000, // fetch how many blocks in the past before the current block
      currentBlock
    )

    console.log({ results })

    response
      .status(200)
      .json({ totalResults: results.length, sample: results[0] })
  } catch (error) {
    console.error(error)
    response.status(500)
  }
}
