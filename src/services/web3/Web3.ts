import Web3Libs from 'web3'
// import { PROVIDER_NETWORK_URL } from 'constants/index'
const PROVIDER_NETWORK_URL = 'https://data-seed-prebsc-1-s1.binance.org:8545'

class Web3 {
  address: string

  web3: any

  contract: any

  constructor(address, ABI) {
    this.address = address
    this.web3 = new Web3Libs(new Web3Libs.providers.HttpProvider(PROVIDER_NETWORK_URL))
    this.contract = new this.web3.eth.Contract(ABI, address)
  }
}

export default Web3
