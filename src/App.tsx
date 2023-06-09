import Main from "./module/Main";
import { Web3ReactProvider } from "@web3-react/core";
import { getLibrary } from "./shared/Function";
import "./App.css";

function App() {
	return (
		<Web3ReactProvider getLibrary={getLibrary}>
			<Main />
		</Web3ReactProvider>
	);
}

export default App;
