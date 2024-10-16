export const trustAbi = [
   {"type":"function","name":"claimCollateralBack","inputs":[{"name":"_loanId","type":"bytes32","internalType":"bytes32"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"getBlockTime","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getUSDPrice","inputs":[{"name":"_token","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"int256","internalType":"int256"}],"stateMutability":"view"},{"type":"function","name":"lendLoan","inputs":[{"name":"_loanId","type":"bytes32","internalType":"bytes32"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"liquidate","inputs":[{"name":"_loanId","type":"bytes32","internalType":"bytes32"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"loans","inputs":[{"name":"","type":"bytes32","internalType":"bytes32"}],"outputs":[{"name":"involvers","type":"tuple","internalType":"struct IntTrustLend.Parties","components":[{"name":"lender","type":"address","internalType":"address"},{"name":"borrower","type":"address","internalType":"address"}]},{"name":"amounts","type":"tuple","internalType":"struct IntTrustLend.LoanAmounts","components":[{"name":"collateralToken","type":"address","internalType":"address"},{"name":"borrowedToken","type":"address","internalType":"address"},{"name":"collateralAmount","type":"uint256","internalType":"uint256"},{"name":"borrowedAmount","type":"uint256","internalType":"uint256"},{"name":"interest","type":"uint256","internalType":"uint256"},{"name":"loanPercentage","type":"uint256","internalType":"uint256"}]},{"name":"status","type":"tuple","internalType":"struct IntTrustLend.Status","components":[{"name":"isPaid","type":"bool","internalType":"bool"},{"name":"isLend","type":"bool","internalType":"bool"}]},{"name":"duration","type":"tuple","internalType":"struct IntTrustLend.Time","components":[{"name":"duration","type":"uint256","internalType":"uint256"},{"name":"end","type":"uint256","internalType":"uint256"},{"name":"start","type":"uint256","internalType":"uint256"}]},{"name":"loanId","type":"bytes32","internalType":"bytes32"}],"stateMutability":"view"},{"type":"function","name":"payLoan","inputs":[{"name":"_loanId","type":"bytes32","internalType":"bytes32"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"priceFeeds","inputs":[{"name":"token","type":"address","internalType":"address"}],"outputs":[{"name":"priceFeed","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"requestLoan","inputs":[{"name":"_collateralAmount","type":"uint256","internalType":"uint256"},{"name":"percentage","type":"uint256","internalType":"uint256"},{"name":"_duration","type":"uint256","internalType":"uint256"},{"name":"collateral","type":"address","internalType":"address"},{"name":"borrowed","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"bytes32","internalType":"bytes32"}],"stateMutability":"nonpayable"},{"type":"function","name":"setPriceFeed","inputs":[{"name":"token","type":"address","internalType":"address"},{"name":"pricefeed","type":"address","internalType":"address"},{"name":"decimal","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"tokendecimal","inputs":[{"name":"token","type":"address","internalType":"address"}],"outputs":[{"name":"decimals","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"event","name":"Claim","inputs":[{"name":"_borrower","type":"address","indexed":true,"internalType":"address"},{"name":"_loanId","type":"bytes32","indexed":true,"internalType":"bytes32"},{"name":"_collateralAmount","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"LendLoan","inputs":[{"name":"led","type":"tuple","indexed":false,"internalType":"struct TrustLend.Lend","components":[{"name":"_borrower","type":"address","internalType":"address"},{"name":"_lender","type":"address","internalType":"address"},{"name":"_loanId","type":"bytes32","internalType":"bytes32"},{"name":"_collateralAmount","type":"uint256","internalType":"uint256"},{"name":"_borrowedAmount","type":"uint256","internalType":"uint256"},{"name":"_interest","type":"uint256","internalType":"uint256"},{"name":"_percentage","type":"uint256","internalType":"uint256"},{"name":"_endTime","type":"uint256","internalType":"uint256"},{"name":"_isPaid","type":"bool","internalType":"bool"},{"name":"_isLend","type":"bool","internalType":"bool"}]}],"anonymous":false},{"type":"event","name":"Liquidate","inputs":[{"name":"_liquidator","type":"address","indexed":true,"internalType":"address"},{"name":"_lender","type":"address","indexed":true,"internalType":"address"},{"name":"_loanId","type":"bytes32","indexed":true,"internalType":"bytes32"},{"name":"_borrower","type":"address","indexed":false,"internalType":"address"},{"name":"_collateralAmountAcquired","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"_amountWithInterest","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"_percentage","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"Repay","inputs":[{"name":"_borrower","type":"address","indexed":true,"internalType":"address"},{"name":"_lender","type":"address","indexed":true,"internalType":"address"},{"name":"_loanId","type":"bytes32","indexed":true,"internalType":"bytes32"},{"name":"_borrowedToken","type":"address","indexed":false,"internalType":"address"},{"name":"_collateralToken","type":"address","indexed":false,"internalType":"address"},{"name":"_collateralAmount","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"_interest","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"RequestLoan","inputs":[{"name":"reg","type":"tuple","indexed":false,"internalType":"struct TrustLend.Request","components":[{"name":"_borrower","type":"address","internalType":"address"},{"name":"_loanId","type":"bytes32","internalType":"bytes32"},{"name":"_collateralAmount","type":"uint256","internalType":"uint256"},{"name":"_borrowedAmount","type":"uint256","internalType":"uint256"},{"name":"_interest","type":"uint256","internalType":"uint256"},{"name":"_percentage","type":"uint256","internalType":"uint256"},{"name":"_isPaid","type":"bool","internalType":"bool"},{"name":"_isLend","type":"bool","internalType":"bool"}]}],"anonymous":false}
  ] as const;
  

  export const erc20Abi = [
    {
      "constant": true,
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_spender",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_from",
          "type": "address"
        },
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "name": "",
          "type": "uint8"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "name": "balance",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_spender",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    }
  ] as const
  