import {
  Claim as ClaimEvent,
  LendLoan as LendLoanEvent,
  Liquidate as LiquidateEvent,
  Repay as RepayEvent,
  RequestLoan as RequestLoanEvent
} from "../generated/TrustLend/TrustLend"
import {
  Claim,
  LendLoan,
  Liquidate,
  Repay,
  RequestLoan
} from "../generated/schema"

export function handleClaim(event: ClaimEvent): void {
  let entity = new Claim(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._borrower = event.params._borrower
  entity._loanId = event.params._loanId
  entity._collateralAmount = event.params._collateralAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleLendLoan(event: LendLoanEvent): void {
  let entity = new LendLoan(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.led__borrower = event.params.led._borrower
  entity.led__lender = event.params.led._lender
  entity.led__loanId = event.params.led._loanId
  entity.led__collateralAmount = event.params.led._collateralAmount
  entity.led__borrowedAmount = event.params.led._borrowedAmount
  entity.led__interest = event.params.led._interest
  entity.led__percentage = event.params.led._percentage
  entity.led__endTime = event.params.led._endTime
  entity.led__isPaid = event.params.led._isPaid
  entity.led__isLend = event.params.led._isLend

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleLiquidate(event: LiquidateEvent): void {
  let entity = new Liquidate(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._liquidator = event.params._liquidator
  entity._lender = event.params._lender
  entity._loanId = event.params._loanId
  entity._borrower = event.params._borrower
  entity._collateralAmountAcquired = event.params._collateralAmountAcquired
  entity._amountWithInterest = event.params._amountWithInterest
  entity._percentage = event.params._percentage

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRepay(event: RepayEvent): void {
  let entity = new Repay(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._borrower = event.params._borrower
  entity._lender = event.params._lender
  entity._loanId = event.params._loanId
  entity._borrowedToken = event.params._borrowedToken
  entity._collateralToken = event.params._collateralToken
  entity._collateralAmount = event.params._collateralAmount
  entity._interest = event.params._interest

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRequestLoan(event: RequestLoanEvent): void {
  let entity = new RequestLoan(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.reg__borrower = event.params.reg._borrower
  entity.reg__loanId = event.params.reg._loanId
  entity.reg__collateralAmount = event.params.reg._collateralAmount
  entity.reg__borrowedAmount = event.params.reg._borrowedAmount
  entity.reg__interest = event.params.reg._interest
  entity.reg__percentage = event.params.reg._percentage
  entity.reg__isPaid = event.params.reg._isPaid
  entity.reg__isLend = event.params.reg._isLend

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
