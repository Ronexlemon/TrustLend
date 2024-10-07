// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import  "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract LinkToken is ERC20{

    constructor()ERC20("Link", "Link Tokens"){

    }
    function mint(address _to)public{
        _mint(_to,1000 *10**18);
    }

}

contract USDC is ERC20{

    constructor()ERC20("USDC", "Dollar circle"){

    }
    function mint(address _to)public{
        _mint(_to,1000 *10**18);
    }

}