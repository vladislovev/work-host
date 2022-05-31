import './App.css';
import router from './components/frontend/router'

const routing = new router(
  '0xD2ae7BDa445F580Ce1790872876524ebb93F8CA2', 
  'https://speedy-nodes-nyc.moralis.io/8f92744f1777e6b94d592c12/eth/rinkeby', 
  4)


function App() {
  return (
    <div className="App">
      <button onClick={async() => routing.approveERC20_sendMultiERC20(
        '0x00Eb93d4a108117eb6470100937eBf4B74806c18', 
        ['0x99dB02471F82A64EF708DcfC8C3d022822530bf3', '0x1cA129e961c664630fb963F5a3Dc4d58F4bb3194'],
        [100, 150],
        250
      )}> send Multi ERC20</button>    
    </div>
  );
}

export default App;
