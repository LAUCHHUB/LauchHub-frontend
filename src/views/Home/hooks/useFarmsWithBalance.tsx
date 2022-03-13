import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { FAST_INTERVAL } from 'config/constants'
import { SerializedFarmConfig } from 'config/constants/types'
import useSWR from 'swr'

export interface FarmWithBalance extends SerializedFarmConfig {
  balance: BigNumber
}

const useFarmsWithBalance = () => {
  const { account } = useWeb3React()

  const {
    data: { farmsWithStakedBalance, earningsSum } = {
      farmsWithStakedBalance: [] as FarmWithBalance[],
      earningsSum: null,
    },
  } = useSWR(
    account ? [account, 'farmsWithBalance'] : null,
    async () => {
      return {
        farmsWithStakedBalance: [],
        earningsSum: 1,
      }
    },
    { refreshInterval: FAST_INTERVAL },
  )

  return { farmsWithStakedBalance, earningsSum }
}

export default useFarmsWithBalance
