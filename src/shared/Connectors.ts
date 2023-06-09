import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkConnector } from "@web3-react/network-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { LedgerConnector } from "@web3-react/ledger-connector";
import { TrezorConnector } from "@web3-react/trezor-connector";
import { FrameConnector } from "@web3-react/frame-connector";
import { AuthereumConnector } from "@web3-react/authereum-connector";
import { FortmaticConnector } from "@web3-react/fortmatic-connector";
import { MagicConnector } from "@web3-react/magic-connector";
import { PortisConnector } from "@web3-react/portis-connector";
import { SquarelinkConnector } from "@web3-react/squarelink-connector";
import { TorusConnector } from "@web3-react/torus-connector";
import { OneWalletConnector } from "@harmony-react/onewallet-connector";
import { MathWalletConnector } from "@harmony-react/mathwallet-connector";

/** This is initialize all connectors. */

const POLLING_INTERVAL = 12000;
const RPC_URLS: { [chainId: number]: string } = {
	1: process.env.REACT_APP_RPC_URL_1 as string,
	5: process.env.REACT_APP_RPC_URL_5 as string,
};

export const injected = new InjectedConnector({
	supportedChainIds: [1, 3, 4, 5, 42],
});

export const network = new NetworkConnector({
	urls: { 5: RPC_URLS[5] },
	defaultChainId: 5,
});

export const walletconnect = new WalletConnectConnector({
	rpc: { 5: RPC_URLS[5] },
	bridge: "https://bridge.walletconnect.org",
	qrcode: true,
});

export const walletlink = new WalletLinkConnector({
	url: RPC_URLS[5],
	appName: "web3-react example",
});

export const ledger = new LedgerConnector({
	chainId: 5,
	url: RPC_URLS[5],
	pollingInterval: POLLING_INTERVAL,
});

export const trezor = new TrezorConnector({
	chainId: 5,
	url: RPC_URLS[5],
	pollingInterval: POLLING_INTERVAL,
	manifestEmail: "dummy@abc.xyz",
	manifestAppUrl: "http://localhost:3000",
});

export const frame = new FrameConnector({ supportedChainIds: [1] });

export const authereum = new AuthereumConnector({ chainId: 42 });

export const fortmatic = new FortmaticConnector({
	apiKey: process.env.REACT_APP_FORTMATIC_API_KEY as string,
	chainId: 1,
});

export const magic = new MagicConnector({
	apiKey: process.env.REACT_APP_MAGIC_API_KEY as string,
	chainId: 1,
	email: "charvai1997@gmail.com",
});

export const portis = new PortisConnector({
	dAppId: process.env.REACT_APP_PORTIS_DAPP_ID as string,
	networks: [1, 100],
});

export const squarelink = new SquarelinkConnector({
	clientId: process.env.REACT_APP_SQUARELINK_CLIENT_ID as string,
	networks: [1, 100],
});

export const torus = new TorusConnector({ chainId: 1 });

export const onewallet = new OneWalletConnector({ chainId: 1 });

export const mathwallet = new MathWalletConnector({ chainId: 1 });
