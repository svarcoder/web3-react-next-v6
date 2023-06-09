import { Web3Provider } from "@ethersproject/providers";
import {
	authereum,
	fortmatic,
	frame,
	injected,
	ledger,
	magic,
	mathwallet,
	network,
	onewallet,
	portis,
	squarelink,
	torus,
	trezor,
	walletconnect,
	walletlink,
} from "./Connectors";
import {
	NoEthereumProviderError,
	UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import { UnsupportedChainIdError } from "@web3-react/core";
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from "@web3-react/walletconnect-connector";
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from "@web3-react/frame-connector";
import { BigNumber } from "@ethersproject/bignumber";
import { useEffect, useState } from "react";
import { toBech32 } from "@harmony-js/crypto";

/** This is enum of connector names. */
enum ConnectorNames {
	Injected = "Injected",
	Network = "Network",
	WalletConnect = "WalletConnect",
	WalletLink = "WalletLink",
	Ledger = "Ledger",
	Trezor = "Trezor",
	Frame = "Frame",
	Authereum = "Authereum",
	Fortmatic = "Fortmatic",
	Magic = "Magic",
	Portis = "Portis",
	Squarelink = "Squarelink",
	Torus = "Torus",
	OneWallet = "OneWallet",
	Mathwallet = "MathWallet",
}

/** This is initialize from connecter names to connector. */
export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
	[ConnectorNames.Injected]: injected,
	[ConnectorNames.Network]: network,
	[ConnectorNames.WalletConnect]: walletconnect,
	[ConnectorNames.WalletLink]: walletlink,
	[ConnectorNames.Ledger]: ledger,
	[ConnectorNames.Trezor]: trezor,
	[ConnectorNames.Frame]: frame,
	[ConnectorNames.Authereum]: authereum,
	[ConnectorNames.Fortmatic]: fortmatic,
	[ConnectorNames.Magic]: magic,
	[ConnectorNames.Portis]: portis,
	[ConnectorNames.Squarelink]: squarelink,
	[ConnectorNames.Torus]: torus,
	[ConnectorNames.OneWallet]: onewallet,
	[ConnectorNames.Mathwallet]: mathwallet,
};

/**
 * Represents get library function.
 * @getLibrary
 * @param {any} provider - The provider is for return library.
 */
export const getLibrary = (provider: any): Web3Provider => {
	const library = new Web3Provider(provider);
	library.pollingInterval = 12000;
	return library;
};

/**
 * Represents get error function.
 * @getErrorMessage
 * @param {Error} error - This is error type.
 */
export const getErrorMessage = (error: Error) => {
	if (error instanceof NoEthereumProviderError) {
		return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
	} else if (error instanceof UnsupportedChainIdError) {
		return "You're connected to an unsupported network.";
	} else if (
		error instanceof UserRejectedRequestErrorInjected ||
		error instanceof UserRejectedRequestErrorWalletConnect ||
		error instanceof UserRejectedRequestErrorFrame
	) {
		return "Please authorize this website to access your Ethereum account.";
	} else {
		console.error(error);
		return "An unknown error occurred. Check the console for more details.";
	}
};

/**
 * Represents get block number.
 * @BlockNumber
 * @param { number | undefined} chainId - This is chain id.
 * @param { Web3Provider | undefined | any} library - This is library.
 */
export const BlockNumber = (
	chainId: number | undefined,
	library: Web3Provider | undefined | any
) => {
	const isHmyLibrary = library?.messenger?.chainType === "hmy";

	const [blockNumber, setBlockNumber] = useState<number | null>();
	useEffect((): any => {
		if (!!library) {
			let stale = false;

			library
				.getBlockNumber()
				.then((blockNumber: any) => {
					if (isHmyLibrary) {
						blockNumber = BigNumber.from(blockNumber.result).toNumber();
					}
					if (!stale) {
						setBlockNumber(blockNumber);
					}
				})
				.catch(() => {
					if (!stale) {
						setBlockNumber(null);
					}
				});

			const updateBlockNumber = (blockNumber: number) => {
				setBlockNumber(blockNumber);
			};

			if (library.on) {
				library.on("block", updateBlockNumber);
			}

			return () => {
				stale = true;
				if (library.on) {
					library.removeListener("block", updateBlockNumber);
				}
				setBlockNumber(undefined);
			};
		}
	}, [library, chainId, isHmyLibrary]);

	return blockNumber;
};

/**
 * Represents get balance form account.
 * @Balance
 * @param {string | null | undefined} account - This is account address.
 * @param { number | undefined} chainId - This is chain id.
 * @param { Web3Provider | undefined | any} library - This is library.
 */
export const Balance = (
	account: string | null | undefined,
	chainId: number | undefined,
	library: Web3Provider | undefined | any
) => {
	const isHmyLibrary = library?.messenger?.chainType === "hmy";

	const [balance, setBalance] = useState<any>();
	useEffect((): any => {
		if (!!account && !!library) {
			let stale = false;
			let accountArgs = isHmyLibrary ? { address: toBech32(account) } : account;

			library
				.getBalance(accountArgs)
				.then((balance: any) => {
					if (isHmyLibrary) {
						balance = balance.result;
					}
					if (!stale) {
						setBalance(balance);
					}
				})
				.catch(() => {
					if (!stale) {
						setBalance(null);
					}
				});

			return () => {
				stale = true;
				setBalance(undefined);
			};
		}
	}, [account, library, chainId, isHmyLibrary]);

	return balance;
};

/**
 * Represents when metamask and coinbase is installed function.
 * @activateInjectedProvider
 * @param {"MetaMask" | "CoinBase"} providerName - This is provider name.
 */
export const activateInjectedProvider = (
	providerName: "MetaMask" | "CoinBase"
) => {
	if (typeof window !== "undefined") {
		const { ethereum } = window as any;

		if (!ethereum?.providers) {
			return undefined;
		}

		let provider;
		switch (providerName) {
			case "CoinBase":
				provider = ethereum.providers.find(
					({ isCoinbaseWallet }: any) => isCoinbaseWallet
				);
				break;
			case "MetaMask":
				provider = ethereum.providers.find(({ isMetaMask }: any) => isMetaMask);
				break;
		}

		if (provider) {
			console.log(provider);
			ethereum.setSelectedProvider(provider);
		}
	}
};
