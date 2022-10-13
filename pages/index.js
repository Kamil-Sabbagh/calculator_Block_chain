import React from "react";
import { useContract } from "wagmi";
import { chain } from 'wagmi'
import { getDefaultProvider } from 'ethers'



const abi = [
	{
		"inputs": [
			{
				"internalType": "int256",
				"name": "num1",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "num2",
				"type": "int256"
			}
		],
		"name": "add",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "int256",
				"name": "num1",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "num2",
				"type": "int256"
			}
		],
		"name": "divide",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "int256",
				"name": "num1",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "num2",
				"type": "int256"
			}
		],
		"name": "mult",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "int256",
				"name": "num1",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "num2",
				"type": "int256"
			}
		],
		"name": "sub",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	}
]

const address = '0xc3b34fd2F83b1504DBC61Dd66817C9e0A17a6A89'

const provider = getDefaultProvider(chain.goerli.id)


export default function Home() {
  
  const [input1, setInput1] = React.useState(0)
  const [input2, setInput2] = React.useState(0)
  const [error, setError] = React.useState('')
  const [finResult, setResult] = React.useState()
  
  const contract = useContract({addressOrName: address, contractInterface: abi, signerOrProvider: provider})

  async function add() {

    updateStatus(`adding numbers ${input1} and ${input2}`);
    // const account = await getCurrentAccount();
    // updateResult(`sending from ${account}`);
    // const coolNumber = await contract.number().call();
    // updateResult(`coolNumber: ${coolNumber}`);
    const result = await contract.add(input1, input2);
    updateResult(`${result}`);
    setError('')
  }

  async function subtract() {
    updateStatus(`subtracting numbers ${input1} and ${input2}`);
    // const account = await getCurrentAccount();
    // updateResult(`sending from ${account}`);
    const result = await contract.sub(input1, input2);
    
    updateResult(`${result}`);
    setError('')
  }

  async function multiply() {
    updateStatus(`multiplying numbers ${input1} and ${input2}`);
    // const account = await getCurrentAccount();
    // updateResult(`sending from ${account}`);
    const result = await contract.mult(input1, input2)
    updateResult(`${result}`);
    setError('')

  }

  async function division() {
    updateStatus(`dividing numbers ${input1} and ${input2}`);
    // const account = await getCurrentAccount();
    // updateResult(`sending from ${account}`);
    try{
      const result = await contract.divide(input1, input2)
      updateResult(`${result}`);
      setError('')
    } catch(e){
      setError(e.message)
    }

  }
  async function getCurrentAccount() {
    const accounts = await window.web3.eth.getAccounts();
    const statusEl = document.getElementById('current_account');
    statusEl.innerHTML = accounts[0];
    return accounts[0];
  }

  async function load() {
    await loadWeb3();
    window.contract = await loadContract();
    updateStatus(`ready`);
  }

  function updateStatus(status) {
    const statusEl = document.getElementById('status');
    statusEl.innerHTML = status;
    console.log(status);
  }
  async function updateResult(result) {
    setResult(result)
  }



  return (

    <div>

      web 3 Demo
      <br />
      status: <span id="status"> loading....</span>
      <br />
      account: <span id="current_account"> ... </span>
      <br />
      <label for="Input1">Input1:</label>
      <input type="Number" name="Input1" id="Input1" value={input1} onChange={(e) => setInput1(parseInt(e.target.value))} />
      <label for="Input2">Input2:</label>
      <input type="Number" name="Input2" id="Input2" value={input2} onChange={(e) => setInput2(parseInt(e.target.value))} />
      <br />
      <button onClick={add}> add </button>
      <button onClick={subtract}> subtract </button>
      <button onClick={multiply}> multiply </button>
      <button onClick={division}> division </button>
      <br />
      {error ? (<div> {error} </div>) : (<div> result: <span id="result"> {finResult} </span> </div> )}
      <br />

    </div>
  )
}
