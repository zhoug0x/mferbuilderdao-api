import type { NextApiRequest, NextApiResponse } from 'next'
import { ethers, BigNumber } from 'ethers'
import { MferBuilderDAO } from 'mferbuilderdao-sdk'

interface TokenProperties {
  bg: string
  head: string
  headphones: string
  smoke: string
}

interface Token {
  name: string
  description: BigNumber
  image: string
  properties: TokenProperties
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    const { id } = request.query

    if (!id || isNaN(parseInt(id as string)) || parseInt(id as string) < 0) {
      return response.status(400).end()
    }

    // connect to sdk
    const provider = ethers.getDefaultProvider('mainnet')
    const sdk = MferBuilderDAO.connect({ signerOrProvider: provider })

    // fetch most recent auction data from the chain
    const tokenContract = sdk.token()
    const result = await tokenContract.tokenURI(parseInt(id as string))

    // parse result
    const b64 = result.split(',')[1]
    const bytes = ethers.utils.base64.decode(b64)
    const token: Token = JSON.parse(ethers.utils.toUtf8String(bytes))

    // return data
    return response.status(200).json({ ...token })
  } catch (error) {
    console.error(error)
    return response.status(500).end()
  }
}
