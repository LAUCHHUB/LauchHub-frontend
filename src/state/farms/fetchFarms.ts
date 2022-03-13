/* eslint-disable no-await-in-loop */
import { Token } from '@pancakeswap/sdk'
import BigNumber from 'bignumber.js'
import { getFarmContract, getTokenLPsContract } from 'utils/contractHelpers'

const ChainId: any = 56

const configInfoPoolDev = {
  contractAddress: '0x01E17e4E4f533EDa43DF743587921397639F28ef',

  token: new Token(
    ChainId,
    '0xe81257d932280ae440b17afc5f07c8a110d21432',
    18,
    'ZUKI',
    'ZUKIMOBA Token',
    'https://zukimoba.com/',
  ),
  quoteToken: new Token(
    ChainId,
    '0x55d398326f99059ff775485246999027b3197955',
    18,
    'WBNB',
    'Wrapped BNB',
    'https://www.binance.com/',
  ),

  lpSymbol: 'ZUKI-BNB LPs',
  lpAddresses: '0x7A1afa8397429d44c21d37d39026427C599c8c18',
}
const configInfoPoolProd = {
  contractAddress: '0x776a57cb3E793bF999b7B7a7a7Ed589bA37eD6c7',

  token: new Token(
    ChainId,
    '0xe81257d932280ae440b17afc5f07c8a110d21432',
    18,
    'ZUKI',
    'ZUKIMOBA Token',
    'https://zukimoba.com/',
  ),
  quoteToken: new Token(
    ChainId,
    '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    18,
    'WBNB',
    'Wrapped BNB',
    'https://www.binance.com/',
  ),

  lpSymbol: 'ZUKI-BNB LPs',
  lpAddresses: '0x93Fc9986DA7CEcC8479F951fF918D95a7e80A161',
}
const configInfoPool = ChainId === 97 ? configInfoPoolDev : configInfoPoolProd

const farmContract = getFarmContract(configInfoPool.contractAddress)
const contractTokenLPs = getTokenLPsContract(configInfoPool.lpAddresses)
const dailyReward = 9999
const ZPPrice = 1
const LPsTokenPrice = 4.645164691287571

const getPercent = (poolData, lpTokenPrice, tokenRewardPrice) => {
  const rewardPerBlock = poolData.rewardPerBlock * tokenRewardPrice * poolData.dailyReward * 365
  const totalAmount = poolData.totalAmount * lpTokenPrice
  const percent = Math.round((rewardPerBlock / (totalAmount > 0 ? totalAmount : 1)) * 100)
  return poolData.totalAmount <= 0 ? undefined : percent
}

const fetchFarms = async (account) => {
  const { contractAddress } = configInfoPool

  /**
   * Fetch Pools detail && info total
   */

  let data: any = {}
  try {
    const _totalPool = await farmContract.totalPool()
    const _listPools: any = []
    let _totalDepositAllPool = 0
    let _totalUserDividendsAllPool = 0
    let _totalAmountAllPool = 0

    for (let poolId = 1; poolId <= +_totalPool; poolId++) {
      const responsePoolDetail: any = await farmContract.pools(`${poolId}`)
      const currentTimestamp = new Date().getTime()
      const endTimestamp = responsePoolDetail.toTime * 1000

      let _userInfo
      let _userDividends: any = 0
      if (account) {
        const responseUserInfo: any = await farmContract.getUserInfo(account, `${poolId}`)
        _userInfo = {
          amount: +responseUserInfo.amount / 1e18,
          checkpoint: responseUserInfo.checkpoint * 1000,
          isUnStake: responseUserInfo.isUnStake,
          nftId: +responseUserInfo.nftId,
          poolId: +responseUserInfo.poolId,
          registerTime: responseUserInfo.registerTime * 1000,
          rewardDebt: +responseUserInfo.rewardDebt / 1e18,
          start: responseUserInfo.start * 1000,
          totalPayout: +responseUserInfo.totalPayout / 1e18,
        }

        _totalDepositAllPool += _userInfo.amount

        _userDividends = await farmContract.getUserDividends(account, `${poolId}`)
        _userDividends /= 1e18
        _userDividends += _userInfo.rewardDebt
        _totalUserDividendsAllPool += _userDividends
      }

      const poolData: any = {
        pid: poolId,
        contract: contractAddress,
        fromTime: responsePoolDetail.fromTime * 1000,
        toTime: responsePoolDetail.toTime * 1000,
        locked: responsePoolDetail.locked,
        rewardPerBlock: responsePoolDetail.rewardPerBlock / 1e18,
        tokenAddress: responsePoolDetail.tokenAddress,
        finalAmount: responsePoolDetail.finalAmount / 1e18,
        totalAmount: responsePoolDetail.totalAmount / 1e18,
        poolEnded: currentTimestamp >= endTimestamp,
        poolStatus: currentTimestamp >= endTimestamp ? 'finished' : 'live',
        userInfo: _userInfo,
        userDividends: _userDividends,
        dailyReward,
        dual: {
          earnLabel: 'Point Hub',
          label: 'HUB',
          symbol: 'Point Hub',
        },
        ...configInfoPool,
      }

      poolData.apr = getPercent(poolData, LPsTokenPrice, ZPPrice)

      _totalAmountAllPool += poolData.totalAmount
      // _totalAmountAllPool += poolData.poolEnded ? poolData.finalAmount : poolData.totalAmount
      _listPools.push(poolData)
    }

    data = {
      _listPools,
      _totalDepositAllPool,
      _totalAmountAllPool,
      _totalUserDividendsAllPool,
    }
  } catch (error) {
    // setListPools(null)
    console.error('useGetListPools', error)
  }

  /**
   * Fetch Info LPs Token
   */
  if (account) {
    try {
      await Promise.all([
        contractTokenLPs.balanceOf(account),
        contractTokenLPs.symbol(),
        contractTokenLPs.name(),
        contractTokenLPs.decimals(),
      ]).then(([_balance, _symbol, _name, _decimals]) => {
        data = {
          ...data,
          lpsToken: {
            balance: _balance.div(10 ** _decimals),
            symbol: _symbol,
            name: _name,
            decimals: _decimals,
            address: configInfoPool.lpAddresses,
          },
        }
      })
    } catch (error) {
      console.error('error', error)
    }
  }

  return data
}

export default fetchFarms
