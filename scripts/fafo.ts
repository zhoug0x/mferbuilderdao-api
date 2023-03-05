import { ethers } from 'ethers'
import * as fs from 'fs'
import { MferBuilderDAO } from 'mferbuilderdao-sdk'

const { NODE_URL } = process.env

const getLatestMintTransfers = async (totalBlocks: number) => {
  
  const provider = new ethers.providers.JsonRpcProvider(NODE_URL, 'mainnet')
  const sdk = MferBuilderDAO.connect({ signerOrProvider: provider })
  const tokenContract = sdk.token()

  const allMintsFilter = tokenContract.filters.Transfer(
    ethers.constants.AddressZero, // from
    null, // to
    null // tokenId
  )

  console.log('\nfetching data...\n')
  const currentBlock = await provider.getBlockNumber()
  const results = await tokenContract.queryFilter(
    allMintsFilter,
    currentBlock - 5000, // fetch how many blocks in the past before the current block
    currentBlock
  )

  return results

}

const main = async () => {
  if (!NODE_URL) throw Error('NODE_URL not set in .env.local')

  // get the most recent mint transfers of the past 5000 mined blocks
  const results = await getLatestMintTransfers(5000)

  console.log('\nfetched ' + results.length + 'mint events\n')

  console.log('\nwriting file...\n')
  fs.writeFileSync('scripts/output.json', JSON.stringify(results, null, 2))
  console.log('\ndone!\n')

  process.exit(0)
}

main()
