import { newMockEvent } from "matchstick-as"
import { ethereum, Address, Bytes, BigInt } from "@graphprotocol/graph-ts"
import {
  Claim,
  LendLoan,
  Liquidate,
  Repay,
  RequestLoan
} from "../generated/TrustLend/TrustLend"

export function createClaimEvent(
  _borrower: Address,
  _loanId: Bytes,
  _collateralAmount: BigInt
): Claim {
  let claimEvent = changetype<Claim>(newMockEvent())

  claimEvent.parameters = new Array()

  claimEvent.parameters.push(
    new ethereum.EventParam("_borrower", ethereum.Value.fromAddress(_borrower))
  )
  claimEvent.parameters.push(
    new ethereum.EventParam("_loanId", ethereum.Value.fromFixedBytes(_loanId))
  )
  claimEvent.parameters.push(
    new ethereum.EventParam(
      "_collateralAmount",
      ethereum.Value.fromUnsignedBigInt(_collateralAmount)
    )
  )

  return claimEvent
}

export function createLendLoanEvent(
  _borrower: Address,
  _lender: Address,
  _loanId: Bytes,
  _collateralAmount: BigInt,
  _borrowedAmount: BigInt,
  _interest: BigInt,
  _percentage: BigInt,
  _endTime: BigInt
): LendLoan {
  let lendLoanEvent = changetype<LendLoan>(newMockEvent())

  lendLoanEvent.parameters = new Array()

  lendLoanEvent.parameters.push(
    new ethereum.EventParam("_borrower", ethereum.Value.fromAddress(_borrower))
  )
  lendLoanEvent.parameters.push(
    new ethereum.EventParam("_lender", ethereum.Value.fromAddress(_lender))
  )
  lendLoanEvent.parameters.push(
    new ethereum.EventParam("_loanId", ethereum.Value.fromFixedBytes(_loanId))
  )
  lendLoanEvent.parameters.push(
    new ethereum.EventParam(
      "_collateralAmount",
      ethereum.Value.fromUnsignedBigInt(_collateralAmount)
    )
  )
  lendLoanEvent.parameters.push(
    new ethereum.EventParam(
      "_borrowedAmount",
      ethereum.Value.fromUnsignedBigInt(_borrowedAmount)
    )
  )
  lendLoanEvent.parameters.push(
    new ethereum.EventParam(
      "_interest",
      ethereum.Value.fromUnsignedBigInt(_interest)
    )
  )
  lendLoanEvent.parameters.push(
    new ethereum.EventParam(
      "_percentage",
      ethereum.Value.fromUnsignedBigInt(_percentage)
    )
  )
  lendLoanEvent.parameters.push(
    new ethereum.EventParam(
      "_endTime",
      ethereum.Value.fromUnsignedBigInt(_endTime)
    )
  )

  return lendLoanEvent
}

export function createLiquidateEvent(
  _liquidator: Address,
  _lender: Address,
  _loanId: Bytes,
  _borrower: Address,
  _collateralAmountAcquired: BigInt,
  _amountWithInterest: BigInt,
  _percentage: BigInt
): Liquidate {
  let liquidateEvent = changetype<Liquidate>(newMockEvent())

  liquidateEvent.parameters = new Array()

  liquidateEvent.parameters.push(
    new ethereum.EventParam(
      "_liquidator",
      ethereum.Value.fromAddress(_liquidator)
    )
  )
  liquidateEvent.parameters.push(
    new ethereum.EventParam("_lender", ethereum.Value.fromAddress(_lender))
  )
  liquidateEvent.parameters.push(
    new ethereum.EventParam("_loanId", ethereum.Value.fromFixedBytes(_loanId))
  )
  liquidateEvent.parameters.push(
    new ethereum.EventParam("_borrower", ethereum.Value.fromAddress(_borrower))
  )
  liquidateEvent.parameters.push(
    new ethereum.EventParam(
      "_collateralAmountAcquired",
      ethereum.Value.fromUnsignedBigInt(_collateralAmountAcquired)
    )
  )
  liquidateEvent.parameters.push(
    new ethereum.EventParam(
      "_amountWithInterest",
      ethereum.Value.fromUnsignedBigInt(_amountWithInterest)
    )
  )
  liquidateEvent.parameters.push(
    new ethereum.EventParam(
      "_percentage",
      ethereum.Value.fromUnsignedBigInt(_percentage)
    )
  )

  return liquidateEvent
}

export function createRepayEvent(
  _borrower: Address,
  _lender: Address,
  _loanId: Bytes,
  _borrowedToken: Address,
  _collateralToken: Address,
  _collateralAmount: BigInt,
  _interest: BigInt
): Repay {
  let repayEvent = changetype<Repay>(newMockEvent())

  repayEvent.parameters = new Array()

  repayEvent.parameters.push(
    new ethereum.EventParam("_borrower", ethereum.Value.fromAddress(_borrower))
  )
  repayEvent.parameters.push(
    new ethereum.EventParam("_lender", ethereum.Value.fromAddress(_lender))
  )
  repayEvent.parameters.push(
    new ethereum.EventParam("_loanId", ethereum.Value.fromFixedBytes(_loanId))
  )
  repayEvent.parameters.push(
    new ethereum.EventParam(
      "_borrowedToken",
      ethereum.Value.fromAddress(_borrowedToken)
    )
  )
  repayEvent.parameters.push(
    new ethereum.EventParam(
      "_collateralToken",
      ethereum.Value.fromAddress(_collateralToken)
    )
  )
  repayEvent.parameters.push(
    new ethereum.EventParam(
      "_collateralAmount",
      ethereum.Value.fromUnsignedBigInt(_collateralAmount)
    )
  )
  repayEvent.parameters.push(
    new ethereum.EventParam(
      "_interest",
      ethereum.Value.fromUnsignedBigInt(_interest)
    )
  )

  return repayEvent
}

export function createRequestLoanEvent(reg: ethereum.Tuple): RequestLoan {
  let requestLoanEvent = changetype<RequestLoan>(newMockEvent())

  requestLoanEvent.parameters = new Array()

  requestLoanEvent.parameters.push(
    new ethereum.EventParam("reg", ethereum.Value.fromTuple(reg))
  )

  return requestLoanEvent
}
