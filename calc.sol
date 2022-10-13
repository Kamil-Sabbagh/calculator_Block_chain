// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract calc {

    function add(int num1, int num2) public pure returns(int){
        return num1+num2;
    }

    function sub(int num1, int num2)public pure returns(int){
        return num1-num2;
    }

    function mult(int num1, int num2)public pure returns(int){
       return num1*num2;
    }

    function divide(int num1, int num2) public pure returns(int){
        if (num2 != 0 )
            return num1/num2;
        
        revert("Divide by 0");
    }

}