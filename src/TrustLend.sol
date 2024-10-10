// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "./InterfaceTrustLend.sol";
import "./LibTrustLend.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "./mockchainlinkDataFeed.sol";
import "./IaggregatorChainlink.sol";


contract TrustLend is IntTrustLend {
    using LibTrustLend for *;
    
    

    
struct Request{
    address   _borrower;
    bytes32    _loanId;
    uint256 _collateralAmount;
    uint256 _borrowedAmount;
    uint256 _interest;
    uint256 _percentage;
    bool   _isPaid;
    bool  _isLend;
}
    

    //events
    event  RequestLoan(Request reg);
    event LendLoan(address indexed  _borrower,address indexed _lender,bytes32 indexed _loanId,uint256 _collateralAmount,uint256 _borrowedAmount,uint256 _interest,uint256 _percentage,uint256 _endTime);
     event Liquidate(address indexed  _liquidator,address indexed _lender,bytes32 indexed _loanId,address _borrower,uint256 _collateralAmountAcquired,uint256 _amountWithInterest,uint256 _percentage);
     event Claim(address indexed  _borrower,bytes32 indexed _loanId,uint256 _collateralAmount);
     event Repay(address indexed  _borrower,address indexed  _lender,bytes32 indexed _loanId,address _borrowedToken,address _collateralToken,uint256 _collateralAmount, uint256 _interest);
     
     

    //mapping
    mapping(bytes32 => Loan)public  loans;
    mapping (address token=> address priceFeed)public priceFeeds;
    
    
    function requestLoan(uint256 _collateralAmount,uint256 percentage,uint256 _duration,address collateral, address borrowed)external returns(bytes32){
        bytes32 loanID = LibTrustLend.id(msg.sender,block.timestamp);
        int collateralValue = getUSDPrice(priceFeeds[collateral]);
        int borrowedValue = getUSDPrice(priceFeeds[borrowed]);
        
        (uint256 interest, uint256 _borrowAmount) = LibTrustLend.percentageWithBorrowTokenAmount(
             collateralValue,
            _collateralAmount,
            borrowedValue,            
            percentage
        );
        
    

    loans[loanID] = Loan({
            involvers: Parties({
                lender: address(0),
                borrower: msg.sender
            }),
            amounts: LoanAmounts({
                collateralToken: collateral, // Replace with actual token address
                borrowedToken: borrowed,   // Replace with actual token address
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
        IERC20(collateral).transferFrom(msg.sender,address(this),_collateralAmount);
        
        emit RequestLoan(Request( msg.sender,loanID, _collateralAmount, _borrowAmount, interest, percentage,false,false));
        return loanID;
}

   function lendLoan(bytes32 _loanId) external {
    Loan storage loan = loans[_loanId];
    require(!loan.status.isLend, "Already lent out");
    require(!loan.status.isPaid, "Already paid out");
    require(loan.involvers.lender == address(0), "Loan already has a lender");

    // Set lender details and loan start/end times
    loan.involvers.lender = msg.sender;
    loan.duration.start = block.timestamp;
    loan.duration.end = block.timestamp + loan.duration.duration;
    loan.status.isLend = true;

    // Transfer borrowed amount from lender to contract
    IERC20(loan.amounts.borrowedToken).transferFrom(msg.sender, address(this), loan.amounts.borrowedAmount);

    
    IERC20(loan.amounts.borrowedToken).transfer(loan.involvers.borrower, loan.amounts.borrowedAmount);

    emit LendLoan(
        loan.involvers.borrower,
        loan.involvers.lender,
        _loanId,
        loan.amounts.collateralAmount,
        loan.amounts.borrowedAmount,
        loan.amounts.interest,
        loan.amounts.loanPercentage,
        loan.duration.end
    );
}


    function liquidate(bytes32 _loanId )external{
         Loan storage loan = loans[_loanId];
        require(loan.status.isLend," !Lent out");
        require(!loan.status.isPaid," paid out ");
        require(loan.duration.end < block.timestamp, "Still Active");
        require(loan.involvers.lender != address(0),"No Issuer");

        //transfer the borrowed amout to the lender and claim collateral
        IERC20(loan.amounts.borrowedToken).transferFrom(msg.sender,address(this),(loan.amounts.borrowedAmount + loan.amounts.interest));
        
        IERC20(loan.amounts.borrowedToken).transfer(loan.involvers.lender,(loan.amounts.borrowedAmount + loan.amounts.interest));
        //claim collateral e.g ETH ->
        //payable(msg.sender).transfer(loan.amounts.collateralAmount);
        IERC20(loan.amounts.borrowedToken).transfer(msg.sender,loan.amounts.collateralAmount);


        loan.status.isPaid = true;
        emit Liquidate(msg.sender,loan.involvers.lender, _loanId, loan.involvers.borrower, loan.amounts.collateralAmount, (loan.amounts.borrowedAmount + loan.amounts.interest),loan.amounts.loanPercentage);

    } 

    function claimCollateralBack(bytes32 _loanId)external {
         Loan storage loan = loans[_loanId];
        require(loan.status.isLend," !Lent out");
        require(!loan.status.isPaid," paid out ");
        require(loan.duration.end == 0, "Still Active");
        require(loan.involvers.lender == address(0),"Has Issuer");
        require(loan.involvers.borrower == msg.sender,"Has Issuer");

        //return back the collateral
       //payable(loan.involvers.borrower).transfer(loan.amounts.collateralAmount);
        IERC20(loan.amounts.collateralToken).transfer(msg.sender,loan.amounts.collateralAmount);
       
        loan.amounts.collateralAmount = 0 ;
        loan.status.isPaid = true;
        emit Claim(loan.involvers.borrower, _loanId,loan.amounts.collateralAmount);

    }
    function payLoan(bytes32 _loanId)external {
         Loan storage loan = loans[_loanId];
        require(loan.status.isLend," !Lent out");
        require(!loan.status.isPaid," paid out ");
         require(loan.involvers.borrower == msg.sender,"Has Issuer");
           IERC20(loan.amounts.borrowedToken).transferFrom(msg.sender,loan.involvers.lender,(loan.amounts.borrowedAmount + loan.amounts.interest));
        //claim collateral e.g ETH ->
        //payable (loan.involvers.borrower).transfer(loan.amounts.collateralAmount);
        
         IERC20(loan.amounts.collateralToken).transfer(msg.sender,loan.amounts.collateralAmount);
         
        loan.status.isPaid = true;
        emit Repay(loan.involvers.borrower,loan.involvers.lender, _loanId,loan.amounts.borrowedToken, loan.amounts.collateralToken, loan.amounts.collateralAmount, loan.amounts.interest);


    }
    //onlyOwner
    function setPriceFeed(address token, address pricefeed)external {
        require ((token !=address(0) && pricefeed !=address(0)),"Invalid Address");
        priceFeeds[token] = pricefeed;
    }

    function getUSDPrice(address _token)public view returns(int){
        (
            /* uint80 roundID */,
            int answer,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = AggregatorV3Interface(_token).latestRoundData();
        return answer;
    }
}