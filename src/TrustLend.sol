// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "./InterfaceTrustLend.sol";
import "./LibTrustLend.sol";
contract TrustLend is IntTrustLend {
    using LibTrustLend for *;
    

    

    

    //events
    event  RequestLoan(address indexed  _borrower,bytes32  indexed  _loanId,uint256 _collateralAmount,uint256 _borrowedAmount,uint256 _interest,uint256 _percentage,uint256 _duration);
    event LendLoan(address indexed  _borrower,address indexed _lender,bytes32 indexed _loanId,uint256 _collateralAmount,uint256 _borrowedAmount,uint256 _interest,uint256 _percentage,uint256 _endTime);
     event Liquidate(address indexed  _liquidator,address indexed _lender,bytes32 indexed _loanId,address _borrower,uint256 _collateralAmountAcquired,uint256 _amountWithInterest,uint256 _percentage);
     event Claim(address indexed  _borrower,bytes32 indexed _loanId,uint256 _collateralAmount);
     //mapping
    mapping(bytes32 => Loan)public  loans;

}