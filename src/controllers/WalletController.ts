import Wallet from '../models/Wallet'
import Ticket from '../models/Ticket'
import type { ITokenProps, IWalletControllerArgs } from '../types'

export default {
  index: async (hasToken: ITokenProps) => {
    try {
      if (hasToken.role !== 'ADM') throw new Error('User Unauthorized')

      const wallets = await Wallet.find().sort('-updatedAt').lean()

      return wallets
    } catch (error: any) {
      throw new Error(error.message)
    }
  },
  showOne: async (args: IWalletControllerArgs, hasToken: ITokenProps) => {
    try {
      if (!args?._id) throw new Error('Wallet Not Found')

      const wallet = await Wallet.findById(args._id).lean()
      if (!wallet) throw new Error('Wallet Not Found')

      const isSameUser = hasToken._id === wallet.user?.toString()
      if (!isSameUser) throw new Error('User Unauthorized')

      return wallet
    } catch (error: any) {
      throw new Error(error.message)
    }
  },
  show: async (hasToken: ITokenProps) => {
    try {
      const wallet = await Wallet.find({ user: hasToken._id })
        .populate('ticket')
        .populate('user')

      if (!wallet) throw new Error('Wallet Not Found')

      const walletLengthOnUser = wallet.length

      if (hasToken.role === 'USER' && walletLengthOnUser >= 3) {
        const showWallet = wallet.filter((_, index) => index <= 2)

        return showWallet
      }

      return wallet
    } catch (error: any) {
      throw new Error(error.message)
    }
  },
  store: async (args: IWalletControllerArgs, hasToken: ITokenProps) => {
    try {
      const wallet = await Wallet.find({ user: hasToken._id })
      const walletLengthOnUser = wallet.length

      if (hasToken.role === 'USER' && walletLengthOnUser >= 1)
        throw new Error('Wallet limit Reached')

      let newWallet: any = await Wallet.create({
        user: hasToken._id,
        description: args.input.description,
      })

      newWallet = {
        ...newWallet._doc,
        sumCostWallet: 0,
        sumAmountWallet: 0,
        sumGradeWallet: 0,
      }

      return newWallet
    } catch (error: any) {
      throw new Error(error.message)
    }
  },
  update: async (args: IWalletControllerArgs, hasToken: ITokenProps) => {
    try {
      let wallet: any = await Wallet.findById(args._id)
      if (!wallet) throw new Error('Wallet Not Found')

      const isSameUser = hasToken._id === wallet.user?.toString()
      if (!isSameUser) throw new Error('User Unauthorized')

      await wallet.updateOne({
        description: args.input.description,
      })

      wallet = await Wallet.findById(args._id).lean()

      return wallet
    } catch (error: any) {
      throw new Error(error.message)
    }
  },
  destroy: async (args: IWalletControllerArgs, hasToken: ITokenProps) => {
    try {
      const wallet = await Wallet.findById(args._id)
      if (!wallet) throw new Error('Wallet Not Found')

      const isSameUser = hasToken._id === wallet.user?.toString()
      if (!isSameUser) throw new Error('User Unauthorized')

      await Ticket.deleteMany({
        _id: {
          $in: wallet?.ticket,
        },
      })

      await wallet.deleteOne()
      return !!wallet
    } catch (error: any) {
      throw new Error(error.message)
    }
  },
}
