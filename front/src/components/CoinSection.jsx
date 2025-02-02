import { useState } from 'react'
import useSWR from 'swr';
import axios from 'axios';
import Marquee from 'react-fast-marquee';
import "../assets/css/coin-section.css";
import { Spinner } from 'flowbite-react';

function CoinSection(){
  const [previousRates, setPreviousRates] = useState({});

  const currencyNames = {
    'USD': 'Dollar',
    'EUR': 'Euro', 
    'GBP': 'Pound',
    'BTC': 'Bitcoin',
    'ETH': 'Ethereum',
    'SOL': 'Solana'
  };

  const formatCurrency = (value) => {
    return Number(value).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const getTrend = (currencyCode, currentValue) => {
    if (!previousRates[currencyCode]) return 'neutral';
    if (currentValue > previousRates[currencyCode]) return 'up';
    if (currentValue < previousRates[currencyCode]) return 'down';
    return 'neutral';
  };

  const getChange = (currencyCode, currentValue) => {
    if (!previousRates[currencyCode]) return '0,00%';
    const previousValue = previousRates[currencyCode];
    const change = ((currentValue - previousValue) / previousValue) * 100;
    return `${change >= 0 ? '+' : ''}${change.toFixed(2).replace('.', ',')}%`;
  };

  const fetcher = async () => {
    const [usdResponse, eurResponse, gbpResponse, cryptoResponse] = await Promise.all([
      axios.get('https://api.exchangerate-api.com/v4/latest/USD'),
      axios.get('https://api.exchangerate-api.com/v4/latest/EUR'),
      axios.get('https://api.exchangerate-api.com/v4/latest/GBP'),
      axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=brl&include_24hr_change=true')
    ]);

    const currencyList = [
      { code: 'USD', value: formatCurrency(usdResponse.data.rates.BRL), trend: getTrend('USD', usdResponse.data.rates.BRL), change: getChange('USD', usdResponse.data.rates.BRL) },
      { code: 'EUR', value: formatCurrency(eurResponse.data.rates.BRL), trend: getTrend('EUR', eurResponse.data.rates.BRL), change: getChange('EUR', eurResponse.data.rates.BRL) },
      { code: 'GBP', value: formatCurrency(gbpResponse.data.rates.BRL), trend: getTrend('GBP', gbpResponse.data.rates.BRL), change: getChange('GBP', gbpResponse.data.rates.BRL) },
      { code: 'BTC', value: formatCurrency(cryptoResponse.data.bitcoin.brl), trend: cryptoResponse.data.bitcoin.brl_24h_change > 0 ? 'up' : 'down', change: `${cryptoResponse.data.bitcoin.brl_24h_change.toFixed(2)}%` },
      { code: 'ETH', value: formatCurrency(cryptoResponse.data.ethereum.brl), trend: cryptoResponse.data.ethereum.brl_24h_change > 0 ? 'up' : 'down', change: `${cryptoResponse.data.ethereum.brl_24h_change.toFixed(2)}%` },
      { code: 'SOL', value: formatCurrency(cryptoResponse.data.solana.brl), trend: cryptoResponse.data.solana.brl_24h_change > 0 ? 'up' : 'down', change: `${cryptoResponse.data.solana.brl_24h_change.toFixed(2)}%` }
    ];

    const newPreviousRates = {};
    currencyList.forEach(currency => {
      newPreviousRates[currency.code] = parseFloat(currency.value.replace(/\./g, '').replace(',', '.'));
    });
    setPreviousRates(newPreviousRates);

    return currencyList;
  };

  const { data: currencies = [], isLoading, error } = useSWR('currencies', fetcher, {
    refreshInterval: 300000,
    revalidateOnFocus: false,
    dedupingInterval: 300000
  });

  if (isLoading) {
    return (
      <div className="coin-section-box text-black py-2 text-center">
        <Spinner className='text-blue-500'/>
      </div>
    );
  }

  if (error) {
    return (
      <div className="coin-section-box text-black py-2 text-center">
        Something unexpected happened, check your connection and try again!
      </div>
    );
  }

  return (
    <div className="coin-section-box text-black py-2">
      <Marquee gradient={false} speed={40} pauseOnHover={true}>
        {currencies.map((currency, index) => (
          <div key={index} className="mx-16 flex items-center">
            <span>{currencyNames[currency.code]}:</span>
            <span className={`ml-2 ${
              currency.trend === 'up' ? 'text-green-500' : 
              currency.trend === 'down' ? 'text-red-700' : ''
            }`}>
              R$ {currency.value}
            </span>
            <span className={`ml-1 ${
              currency.trend === 'up' ? 'text-green-500' : 
              currency.trend === 'down' ? 'text-red-700' : ''
            }`}>
              {currency.change}
            </span>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default CoinSection;