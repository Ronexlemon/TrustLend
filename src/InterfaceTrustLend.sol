// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;


interface  IntTrustLend {

    //struct
    struct LoanAmounts{
        address collateralToken;
        address borrowedToken;
        uint256 collateralAmount;
        uint    borrowedAmount;
        uint256 interest;
        uint256 loanPercentage;

    }
    struct Parties{
        address lender;
        address borrower;

    }
    struct Status{
        bool   isPaid;
        bool   isLend;

    }
    struct Time{
        uint256 duration;
         uint256 end;
        uint256 start;
    }
    struct Loan{
        Parties involvers;        
        LoanAmounts amounts;
        Status status;  
        Time duration; 
        bytes32 loanId;

    }



    //functions

    //request for loan

    function requestLoan(uint256 _collateralValue,uint256 _collateralAmount,uint256 percentage,uint256 _duration,uint256 borrowValue)external returns(bytes32);

    function lendLoan(bytes32 _loanId)external ;

    function liquidate(bytes32 _loanId )external ;

    function claimCollateralBack(bytes32 _loanId)external ;

    
    
}