const routerAbi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "addressERC20",
				"type": "address"
			},
			{
				"internalType": "address[]",
				"name": "listReceivers",
				"type": "address[]"
			},
			{
				"internalType": "uint256[]",
				"name": "amounts",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256",
				"name": "totalAmount",
				"type": "uint256"
			}
		],
		"name": "sendMultiERC20",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

export default routerAbi