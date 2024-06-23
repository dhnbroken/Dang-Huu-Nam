# Problem 3 explanation

```
interface  WalletBalance {
	currency:  string;
	amount:  number;
}

interface  FormattedWalletBalance {
	currency:  string;
	amount:  number;
	formatted:  string;
}

interface  Props  extends  BoxProps {}
```

- Declare WalletBalance and FormattedWalletBalance can be shorter:

```
interface WalletBalance {
	currency: string;
	amount: number;
}

interface FormattedWalletBalance extends WalletBalance {
	formatted: string;
}
```

- Unused Props

##

```
const  sortedBalances  =  useMemo(() => {
	return balances
		.filter((balance:  WalletBalance) => {
			const  balancePriority  =  getPriority(balance.blockchain);
			if (lhsPriority >  -99) {
				if (balance.amount  <=  0) {
					return  true;
				}
			}
			return  false;
		})
		.sort((lhs:  WalletBalance, rhs:  WalletBalance) => {
			const  leftPriority  =  getPriority(lhs.blockchain);
			const  rightPriority  =  getPriority(rhs.blockchain);
			if (leftPriority  >  rightPriority) {
				return  -1;
			} else  if (rightPriority  >  leftPriority) {
				return  1;
			}
		});
}, [balances, prices]);
```

- WalletBalance does not include blockchain property
- "Prices" is not used in the calculation of sortedBalances -> Can't control if "Prices" change.
- Declare a variable name "balancePriority" but unused and using a "lhsPriority" - which is not declared or imported.
- Not returning value in the function

##

- This function is unused

```
const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
	return {
		...balance,
		formatted:  balance.amount.toFixed()
	}
})
```

##

```
const rows = sortedBalances.map((balance: FormattedWalletBalance, index:  number) => {
	const  usdValue = prices[balance.currency] *  balance.amount;
	return (
		<WalletRow
			className={classes.row}
			key={index}
			amount={balance.amount}
			usdValue={usdValue}
			formattedAmount={balance.formatted}
		/>
	);
});
```

- balance.currency is string so usdValue is wrong value calculated
- index as key -> If the list can change over time, as it can lead to performance issues and bugs with element state
- sortedBalances does not have formatted property

##

```
const  getPriority  = (blockchain:  string):  number  => {
	switch (blockchain) {
		case  'Osmosis':
			return  100;
		case  'Ethereum':
			return  50;
		case  'Arbitrum':
			return  30;
		case  'Zilliqa':
			return  20;
		case  'Neo':
			return  20;
		default:
			return  -99;
	}
};
```

- This function are called many times. We can use an object to map blockchains to makes it easier to manage and update.
