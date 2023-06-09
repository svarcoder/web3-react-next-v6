import web3 from "web3";
import { provider } from "web3-core";

export const getLibrary = (provider: provider) => {
	const library = new web3(provider);
	return library;
};
