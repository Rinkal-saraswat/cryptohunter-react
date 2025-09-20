const API_KEY = process.env.REACT_APP_CG_API_KEY;


export const CoinList = (Currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${Currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false?x_cg_demo_api_key=${API_KEY}`;

export const SingleCoin = (id) =>
  `https://api.coingecko.com/api/v3/coins/${id}`;

export const HistoricalChart = (id, days = 365, Currency) =>
`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${Currency}&days=${days}`;

export const TrendingCoins = (Currency) =>
 //  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${Currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;
//`http://api.coingecko.com/api/v3/coins/markets?vs_currency=${Currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false&x_cg_demo_api_key=${API_KEY}`
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${Currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false?x_cg_demo_api_key=${API_KEY}`;  
