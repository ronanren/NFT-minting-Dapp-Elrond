import * as Dapp from "@elrondnetwork/dapp";
import {
	Transaction,
	GasPrice,
	Address,
	TransactionPayload,
	Balance,
	ChainID,
	TransactionVersion,
	GasLimit,
} from "@elrondnetwork/erdjs";
import { RawTransactionType } from "../helpers/types";

export default function useNewTransaction() {
	const { chainId } = Dapp.useContext();
	const gasPrice = 1000000000;
	const version = 1;
	const configGasLimit = 50000;
	const gasPerDataByte = 1500;

	return (rawTransaction: RawTransactionType) => {
		const gasLimit = rawTransaction.gasLimit
			? new GasLimit(rawTransaction.gasLimit)
			: Dapp.calculateGasLimit({
				data: rawTransaction.data || "",
				gasLimit: configGasLimit,
				gasPerDataByte,
			});
		return new Transaction({
			value: Balance.egld(rawTransaction.value),
			data: new TransactionPayload(rawTransaction.data),
			receiver: new Address(rawTransaction.receiver),
			gasLimit,
			gasPrice: new GasPrice(gasPrice),
			chainID: new ChainID(chainId.valueOf()),
			version: new TransactionVersion(version),
		});
	};
}