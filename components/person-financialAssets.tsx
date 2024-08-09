interface IFinancialAsset {
  exchange: string;
  ticker: string;
  companyName: string;
  numberOfShares: number;
  sharePrice: number;
  currencyCode: string;
  exchangeRate: number;
  interactive: boolean;
  currentPrice: number;
}

interface IFinancialAssetsProps {
  financialAssets: IFinancialAsset[];
}

export default function FinancialAssets({
  financialAssets,
}: IFinancialAssetsProps) {
  return (
    <div className="grid grid-cols-4 gap-5 p-3">
      {financialAssets.map((asset) => (
        <div
          key={asset.ticker}
          className="p-5 bg-slate-200 rounded-lg shadow-md *:text-black "
        >
          <h3 className="text-xl font-semibold pb-3">{asset.companyName}</h3>

          <div className=" *:text-sm">
            <p>→ Exchange: {asset.exchange}</p>
            <p>→ Ticker: {asset.ticker}</p>
            <p>→ Number of Shares: {asset.numberOfShares}</p>
            <p>→ Share Price: ${asset.sharePrice.toFixed(2)}</p>
            <p>→ Currency: {asset.currencyCode}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
