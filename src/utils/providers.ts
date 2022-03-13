import { StaticJsonRpcProvider } from '@ethersproject/providers'
import getRpcUrl from 'utils/getRpcUrl'

const RPC_URL = getRpcUrl()
// const RPC_URL = 'https://data-seed-prebsc-1-s1.binance.org:8545'

export const simpleRpcProvider = new StaticJsonRpcProvider(RPC_URL)

export default null
