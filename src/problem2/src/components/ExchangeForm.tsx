import React, { useEffect, useMemo, useState } from 'react';
import { Prices } from '../store/interface';
import CurrencyOptions from './CurrencyOptions';
import { formatNumber } from 'utils/formatNumber';
import { icons } from 'store/icons';

const ExchangeForm: React.FC = () => {
  const [prices, setPrices] = useState<Prices[]>([]);

  const [originCurrency, setOriginCurrency] = useState('');

  const [selectedOption, setSelectedOption] = useState<Prices>({
    currency: 'ETH',
    date: '2023-08-29T07:10:52.000Z',
    price: 1645.9337373737374
  });

  const getData = async () => {
    await fetch('https://interview.switcheo.com/prices.json')
      .then((response) => response.json())
      .then((data) => setPrices(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getData();
  }, []);

  function isValidNumber(input: string) {
    const regex = /^[1-9][0-9]*$/;
    return input === '' || regex.test(input);
  }

  function handleChangeOriginCurrency(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target.value;

    if (isValidNumber(input)) {
      setOriginCurrency(input);
    }
  }

  const resultExchange = useMemo(() => {
    return selectedOption.price * Number(originCurrency);
  }, [originCurrency, selectedOption]);

  return (
    <div className="w-4/5 md:w-3/5 shadow-md rounded h-full lg:min-h-96 relative">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-full bg-blue-700">
        <img alt="arr" src={icons['leftArrow']} width={30} height={30} className="hidden lg:block" />
        <img alt="arr" src={icons['downArrow']} width={25} height={25} className="lg:hidden" />
      </div>
      <div className="flex flex-col lg:flex-row justify-between items-center w-full lg:h-96">
        <div className="w-full lg:w-1/2 h-full bg-white p-8 pt-20 px-20 flex flex-col ">
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4 h-full">
            <div className="h-1/4">
              <CurrencyOptions prices={prices} setSelectedOption={setSelectedOption} selectedOption={selectedOption} />
            </div>
            <div className="h-1/4 relative  flex items-center text-xl border-b !border-b-gray-300">
              <input
                placeholder="100"
                className="border-transparent  h-14 focus:border-transparent focus:ring-0 pl-1 text-xl w-full"
                value={formatNumber(originCurrency)}
                onChange={handleChangeOriginCurrency}
              />
            </div>
            <div className="h-1/4">
              <div className="text-sm text-gray-500">Exchange Rate</div>
              <div className=" text-blue-800 font-semibold mt-1">{`$${formatNumber(selectedOption.price.toFixed(2))}`}</div>
            </div>
          </form>
        </div>

        <div className="w-full lg:w-1/2 h-full bg-gray-100 p-8 pt-20 px-20 flex flex-col">
          <div className="flex flex-col gap-4 h-full">
            <div className="h-1/4">
              <div className="block text-lg font-medium leading-6 text-gray-900">To</div>
              <div className="py-1.5  flex items-center gap-2">
                <img alt="usd" src={icons['USDCurr']} width={36} height={36} />
                <span className="font-semibold text-xl">USD</span>
              </div>
            </div>
            <div className="relative h-1/4 flex items-center text-xl">
              <div className="">${formatNumber(resultExchange)}</div>
            </div>
            <div className="w-full h-1/4 flex flex-col justify-center items-end">
              <button className="w-full mt-8 lg:w-auto lg:mt-0 p-6 py-3 rounded bg-blue-700 text-white hover:bg-blue-900">
                Exchange
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeForm;
