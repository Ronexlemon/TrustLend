// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract ETH_USD{
     /* uint80 roundID */
         //   int answer,
            /*uint startedAt*/
            /*uint timeStamp*/
            /*uint80 answeredInRound*/
             int256 answer;
            function setdata(int256 _price)public  {
                answer  = _price;
            }

    function latestRoundData()external view returns(uint80,int,uint256,uint256,uint80 answerInRound){
        return (0,answer,block.timestamp,block.timestamp,0);
    }

}

contract USDC_USD{
     /* uint80 roundID */
         //   int answer,
            /*uint startedAt*/
            /*uint timeStamp*/
            /*uint80 answeredInRound*/
            int256 answer;
            function setdata(int256 _price)public  {
                answer  = _price;
            }

    function latestRoundData()external view returns(uint80,int,uint256,uint256,uint80){
        return (0,answer,block.timestamp,block.timestamp,0);
    }

}

interface Aggregator{
    function latestRoundData() external  view returns(uint80,int,uint256,uint256,uint80 answerInRound);
}