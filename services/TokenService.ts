import { Contract, ethers } from 'ethers'
import { MferBuilderDAO } from 'mferbuilderdao-sdk'

const { NODE_URL } = process.env

export interface TokenProperties {
  bg: string
  head: string
  headphones: string
  smoke: string
}

export interface Token {
  name: string
  description: string
  image: string
  properties: TokenProperties
}

export class TokenService {
  private contract: Contract

  constructor() {
    const provider = new ethers.providers.JsonRpcProvider(NODE_URL, 'mainnet')
    const sdk = MferBuilderDAO.connect({ signerOrProvider: provider })
    this.contract = sdk.token()
  }

  async getTokenById(id: string): Promise<Token> {
    const result = await this.contract.tokenURI(id)
    const b64 = result.split(',')[1]
    const bytes = ethers.utils.base64.decode(b64)
    const token: Token = JSON.parse(ethers.utils.toUtf8String(bytes))
    return token
  }
}
