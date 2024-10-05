// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

library LibTrustLend{

function id(address _borrower, uint256 _time)public  pure returns(bytes32){
    return keccak256(abi.encode(_borrower,_time));
}

function percentageWithBorrowTokenAmount(uint256 _collateralValueUSD,uint256 _collateralAmount,uint256 _borrowValueUSD,uint256 percentage) public pure returns(uint256 interest, uint256 _borrowAmount ){
    assembly{
        
        let totalColValue := mul(_collateralValueUSD, _collateralAmount)

        // Calculate interest = totalColValue * (percentage / 100)
        let interestValueInUSD := div(mul(totalColValue, percentage), 100)

        // Calculate borrowAmount = totalColValue * ((100 - percentage) / 100)
        let borrowValueInUSD := div(mul(totalColValue, sub(100,percentage)), 100)
        _borrowAmount := div(borrowValueInUSD,_borrowValueUSD)
        interest := div(interestValueInUSD,_borrowValueUSD)
    
    }
}

}