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
    function requestLoan(uint256 _collateralValue,uint256 _collateralAmount,uint256 percentage,uint256 _duration,uint256 borrowValue)external returns(bytes32){
        bytes32 loanID = LibTrustLend.id(msg.sender,block.timestamp);
        (uint256 interest, uint256 _borrowAmount) = LibTrustLend.percentageWithBorrowTokenAmount(
            _collateralValue,
            _collateralAmount,
            borrowValue,            
            percentage
        );
        
    

    loans[loanID] = Loan({
            involvers: Parties({
                lender: address(0),
                borrower: msg.sender
            }),
            amounts: LoanAmounts({
                collateralToken: address(1), // Replace with actual token address
                borrowedToken: address(2),   // Replace with actual token address
                collateralAmount: _collateralAmount,
                borrowedAmount: _borrowAmount,
                interest: interest,
                loanPercentage: percentage
            }),
            status: Status({
                isPaid: false,
                isLend: false
            }),
            duration: Time({
                duration:_duration,
                end: 0,
                start:0 // Set the start time to the current timestamp during lending
            }),
            loanId: loanID
        });
        emit RequestLoan(msg.sender,loanID, _collateralAmount, _borrowAmount, interest, percentage, _duration);
        return loanID;
}
 function lendLoan(bytes32 _loanId)external{
        Loan storage loan = loans[_loanId];
        require(!loan.status.isLend," Lent out");
        require(!loan.status.isPaid," paid out ");
        require(loan.involvers.lender == address(0),"have an Issuer");
        loan.involvers.lender = msg.sender;
        loan.duration.start = block.timestamp;
        loan.duration.end = block.timestamp + loan.duration.duration;
        loan.status.isLend = true;
        emit LendLoan(loan.involvers.borrower, loan.involvers.lender, _loanId, loan.amounts.collateralAmount, loan.amounts.borrowedAmount,loan.amounts.interest,loan.amounts.loanPercentage, loan.duration.end);




    } 

     function liquidate(bytes32 _loanId )external{
         Loan storage loan = loans[_loanId];
        require(loan.status.isLend," !Lent out");
        require(!loan.status.isPaid," paid out ");
        require(loan.duration.end < block.timestamp, "Still Active");
        require(loan.involvers.lender != address(0),"No Issuer");

        //transfer the borrowed amout to the lender and claim collateral
        //IERC20(_tokenAddress).transferFrom(msg.sender,loan.involvers.lender,(loan.amounts.borrowedAmount + loan.amounts.interest))
        //claim collateral e.g ETH ->
        //msg.sender.transfer(loan.amounts.collateralAmount)

        loan.status.isPaid = true;
        emit Liquidate(msg.sender,loan.involvers.lender, _loanId, loan.involvers.borrower, loan.amounts.collateralAmount, (loan.amounts.borrowedAmount + loan.amounts.interest),loan.amounts.loanPercentage);

    } 

}