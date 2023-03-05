import { ethers, BigNumber, Contract } from 'ethers'
import { MferBuilderDAO } from 'mferbuilderdao-sdk'

const { NODE_URL } = process.env

export interface Auction {
  tokenId: string
  highestBid: BigNumber
  highestBidder: string
  startTime: number
  endTime: number
  settled: boolean
}

export class AuctionService {
  private contract: Contract

  constructor() {
    const provider = new ethers.providers.JsonRpcProvider(NODE_URL, 'mainnet')
    const sdk = MferBuilderDAO.connect({ signerOrProvider: provider })
    this.contract = sdk.auction()
  }

  async getLatestAuction(): Promise<Auction> {
    const result = await this.contract.auction()
    const auction: Auction = {
      tokenId: result[0].toString(),
      highestBid: result[1],
      highestBidder: result[2],
      startTime: result[3],
      endTime: result[4],
      settled: result[5],
    }
    return auction
  }
}
