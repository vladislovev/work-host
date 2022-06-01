// SPDX-License-Identifier: MIT
pragma solidity 0.8.14;


interface IERC20 {

    event Transfer(address indexed from, address indexed to, uint256 value);

    event Approval(address indexed owner, address indexed spender, uint256 value);

    function totalSupply() external view returns (uint256);

    function balanceOf(address account) external view returns (uint256);

    function transfer(address to, uint256 amount) external returns (bool);

    function allowance(address owner, address spender) external view returns (uint256);

    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);
}

contract MultiSender {

    function sendMultiERC20(
        address addressERC20,
        address[] memory listReceivers,
        uint256[] memory amounts,
        uint256 totalAmount
    ) public returns (bool) {
        uint256 totalReceivers = listReceivers.length;
        IERC20 erc20 = IERC20(addressERC20);
        require(
            erc20.balanceOf(msg.sender) >= totalReceivers * totalAmount,
            "Total balance not enough"
        );

        uint256 allowance = erc20.allowance(msg.sender, address(this));
        require(
            allowance >= totalAmount,
            "Check the token allowance"
        );
        for (uint256 i = 0; i < totalReceivers; i++) {
            erc20.transferFrom(msg.sender, listReceivers[i], amounts[i]);
        }
        return true;
    }
    
}