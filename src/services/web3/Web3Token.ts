import Web3 from 'web3'
import abiToken from 'config/abi/abiToken.json'
// import { PROVIDER_NETWORK_URL } from 'constants/index'
const PROVIDER_NETWORK_URL = 'https://data-seed-prebsc-1-s1.binance.org:8545'

class Web3Token {
  address: string

  web3: any

  contract: any

  constructor(address, abi?: any) {
    this.address = address
    this.web3 = new Web3(new Web3.providers.HttpProvider(PROVIDER_NETWORK_URL))
    this.contract = new this.web3.eth.Contract(abi || abiToken, address)
  }

  async getInfo(funcName) {
    try {
      return await this.contract.methods[funcName]().call()
    } catch (error) {
      console.error('getInfo', error)
      return false
    }
  }

  async symbol() {
    const response = await this.contract.methods.symbol().call()
    return response
  }

  async decimals() {
    const response = await this.contract.methods.decimals().call()
    return response
  }

  async balanceOf(address) {
    const response = await this.contract.methods.balanceOf(address).call()
    return response
  }

  async getFullInfo() {
    return Promise.all([await this.symbol(), await this.decimals()])
      .then(([symbol, decimals]) => {
        return { address: this.address, symbol, decimals }
      })
      .catch((error) => {
        console.error('E0089', error)
        return null
      })
  }

  async totalSupply() {
    const response = (await this.contract.methods.totalSupply().call()) / 10 ** (await this.decimals())
    return response
  }
}

export default Web3Token
