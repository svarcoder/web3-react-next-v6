import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import {
	Balance,
	BlockNumber,
	connectorsByName,
	getErrorMessage,
} from "../shared/Function";
import { ethers } from "ethers";

const Main = () => {
	const context = useWeb3React<Web3Provider>();
	const {
		connector,
		library,
		chainId,
		account,
		activate,
		deactivate,
		active,
		error,
	} = context;

	const [activatingConnector, setActivatingConnector] = useState<any>();
	const isHmyLibrary = library?._network?.name === "hmy";
	const blockNum = BlockNumber(chainId, library);
	const balance = Balance(account, chainId, library);

	useEffect(() => {
		if (activatingConnector && activatingConnector === connector) {
			setActivatingConnector(undefined);
		}
	}, [activatingConnector, connector]);

	// const triedEager = useEagerConnect();

	// useInactiveListener(!triedEager || !!activatingConnector);

	return (
		<div className='wrapper'>
			<div className='card'>
				<div className='card-header text-center'>Web3 React</div>
				<div className='card-body'>
					<div className='text-break'>
						ChainId: {chainId ? chainId : "-----"}
					</div>
					<div className='text-break'>
						Block Number: {blockNum ? blockNum : "-----"}
					</div>
					<div className='text-break'>
						Account: {account ? account : "-----"}
					</div>
					<div className='text-break'>
						Balance:
						{balance ? ethers?.utils?.formatEther(balance.toString()) : "-----"}
					</div>
				</div>
			</div>

			<div className='card mt-4 mb-4'>
				<div className='card-body'>
					<div className='container text-center'>
						<div className='row'>
							{Object.keys(connectorsByName).map((name: any, index: number) => {
								const currentConnector =
									connectorsByName[name as keyof typeof connectorsByName];
								const activating = currentConnector === activatingConnector;
								const connected = currentConnector === connector;
								const disabled = !!activatingConnector || connected || !!error;

								return (
									<div className='grid_mobile col-4 mb-4' key={index + 1}>
										<button
											className='btn btn-outline-primary w-100'
											style={{
												borderColor: activating
													? "orange"
													: connected
													? "green"
													: "unset",
												cursor: disabled ? "unset" : "pointer",
												position: "relative",
											}}
											disabled={disabled}
											onClick={() => {
												setActivatingConnector(currentConnector);
												activate(
													connectorsByName[
														name as keyof typeof connectorsByName
													]
												);
											}}>
											<div
												style={{
													position: "absolute",
													top: "0",
													right: "0",
													height: "100%",
													display: "flex",
													alignItems: "center",
													color: "black",
													margin: "0 1rem 0 0",
												}}>
												{connected && (
													<span role='img' aria-label='check'>
														✅
													</span>
												)}
											</div>
											{activating ? `Loading....` : name}
										</button>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>

			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}>
				{(active || error) && (
					<button
						className='btn btn-outline-danger'
						onClick={() => {
							deactivate();
						}}>
						Deactivate
					</button>
				)}

				{!!error && (
					<h4 style={{ marginTop: "1rem", marginBottom: "0" }}>
						{getErrorMessage(error)}
					</h4>
				)}
			</div>
			{!!(library && !isHmyLibrary && account) && (
				<hr style={{ margin: "2rem" }} />
			)}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}>
				{!!(library && !isHmyLibrary && account) && (
					<button
						className='btn btn-outline-info'
						onClick={() => {
							library
								.getSigner(account)
								.signMessage("👋 Hi.")
								.then((signature: any) => {
									window.alert(`Success!\n\n${signature}`);
								})
								.catch((error: any) => {
									window.alert(
										"Failure!" +
											(error && error.message ? `\n\n${error.message}` : "")
									);
								});
						}}>
						Sign Message
					</button>
				)}
			</div>
		</div>
	);
};

export default Main;
