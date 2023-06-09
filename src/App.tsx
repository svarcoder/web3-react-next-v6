import { Web3ReactProvider } from "@web3-react/core";
import MyCom from "./module/MyCom";
import { getLibrary } from "./walletHelper/getLibrary";

function App() {
	return (
		<>
			<Web3ReactProvider getLibrary={getLibrary}>
				<MyCom />
			</Web3ReactProvider>
		</>
	);
}

export default App;
