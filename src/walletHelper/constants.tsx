import {
	injected,
	portis,
	fortmatic,
	network,
	torus,
	walletconnect,
} from "./connector";

export const connectorTypes: any = {
	Injected: injected,
	Portis: portis,
	Fortmatic: fortmatic,
	Network: network,
	Torus: torus,
	WalletConnect: walletconnect,
};

export const connectorNames: any = {
	Injected: "metamask",
	Portis: "portis",
	Fortmatic: "fortmatic",
	Network: "infura",
	Torus: "torus",
	WalletConnect: "walletconnect",
};
