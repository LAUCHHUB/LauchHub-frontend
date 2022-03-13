import Web3 from 'web3'
import abiPancakeFactory from 'config/abi/abiPancakeFactory.json'
// import { PROVIDER_NETWORK_URL } from 'constants/index'
const PROVIDER_NETWORK_URL = 'https://data-seed-prebsc-1-s1.binance.org:8545'

class Web3Factory {
  address: string

  web3: any

  contract: any

  constructor(contractAddress, abi?: any) {
    this.web3 = new Web3(PROVIDER_NETWORK_URL)
    this.address = contractAddress
    this.contract = new this.web3.eth.Contract(abi || abiPancakeFactory, contractAddress)
  }

  async getPair(addressFrom, addressTo) {
    try {
      const response = await this.contract.methods.getPair(addressFrom, addressTo).call()
      return response
    } catch (error) {
      console.error('getPair', error)
      return false
    }
  }
}

export default Web3Factory
