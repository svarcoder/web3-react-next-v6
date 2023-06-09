import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { connectorNames, connectorTypes } from "../walletHelper/constants";

const MyCom = () => {
	const context = useWeb3React();

	const [activeConnector, setActiveConnector] = useState<any>();
	const [blockNumber, setBlockNumber] = useState<any>();
	const [balance, setBalance] = useState<any>();

	const {
		library,
		account,
		activate,
		connector,
		chainId,
		deactivate,
		active,
		error,
	} = context;

	console.log("library", library);
	console.log("account", account);
	console.log("connector", connector);
	console.log("chainId", chainId);
	console.log("active", active);
	console.log("error", error);

	useEffect(() => {
		if (error) {
			alert("Error : " + error);
		}
	}, [error]);

	useEffect(() => {
		if (library) {
			let stale = false;

			library.eth
				.getBlockNumber()
				.then((r: any) => {
					if (!stale) {
						setBlockNumber(r);
					}
				})
				.catch((e: any) => {
					console.log(e);
					if (!stale) {
						setBlockNumber(null);
					}
				});
			return () => {
				stale = true;
				setBlockNumber(null);
			};
		}
	}, [library, chainId]);

	useEffect(() => {
		if (library && account) {
			let stale = false;

			library.eth
				.getBalance(account)
				.then((r: any) => {
					if (!stale) {
						setBalance(library.utils.fromWei(r, "ether"));
					}
				})
				.catch(() => {
					if (!stale) {
						setBalance(null);
					}
				});

			return () => {
				stale = true;
				setBlockNumber(null);
			};
		}
	}, [library, account, chainId]);

	const signMessage = async () => {
		await library.eth.sign("Hello world", account).then(console.log);
	};

	return (
		<div
			style={{
				padding: "40px",
			}}>
			<div>
				<h1 style={{ textAlign: "center", color: "green" }}>
					{" "}
					Web3-React V6 Demo
				</h1>
				<div>
					<h1> ChainId: {chainId || "None"}</h1>
					<h1> Account: {account || "None"}</h1>
					<h1> Block Number: {blockNumber || "None"}</h1>
					<h1> Balance: {balance || "None"}</h1>
				</div>

				<div>
					<div
						style={{
							display: "grid",
							gridTemplateColumns: "1fr 1fr 1fr",
							gap: "1rem",
						}}>
						{Object.keys(connectorTypes).map((con) => {
							const current = connectorTypes[con];
							const disabled = current === connector;
							const name = connectorNames[con];

							return (
								<div key={con}>
									<button
										style={{
											width: "150px",
											height: "56px",
											borderRadius: "16px",
											color: "rgba(0, 0, 0, 0.87)",
											textTransform: "uppercase",
											backgroundColor: "#e0e0e0",
											boxShadow:
												"0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%)",
											cursor: "pointer",
											border: "none",
										}}
										onClick={() => {
											account && disabled
												? deactivate()
												: setActiveConnector(current);
											activate(connectorTypes[con]);
										}}>
										<div>
											{account && disabled
												? "Disconnected"
												: name.toUpperCase()}
										</div>
									</button>
								</div>
							);
						})}
					</div>
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							margin: "20px",
							width: "80%",
						}}>
						<button
							style={{
								width: "150px",
								height: "56px",
								borderRadius: "16px",
								color: "rgba(0, 0, 0, 0.87)",
								textTransform: "uppercase",
								backgroundColor: "#e0e0e0",
								boxShadow:
									"0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%)",
								cursor: "pointer",
								border: "none",
							}}
							disabled={!activeConnector || !account}
							onClick={() => signMessage()}>
							<div>Sign Message</div>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MyCom;
