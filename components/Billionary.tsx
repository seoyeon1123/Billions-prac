import Link from 'next/link';

interface IProps {
  id: string;
  name: string;
  netWorth: number;
  squareImage: string;
  industries: string[];
}

export default function Billionary({
  id,
  name,
  netWorth,
  industries,
  squareImage,
}: IProps) {
  return (
    <div className="flex flex-col justify-between items-center p-2 bg-slate-800 rounded-lg shadow-md">
      <Link href={`/home/person/${id}`}>
        <img
          src={squareImage}
          alt={name}
          className="w-60 h-52 mb-2 rounded-xl object-cover cursor-pointer"
        />
      </Link>
      <div className="text-center">
        <Link href={`/home/person/${id}`}>
          <h2 className="text-xl">{name}</h2>
        </Link>
        <div className="flex flex-row justify-center items-center mb-6">
          <p className="text-sm pr-1">${netWorth.toFixed(0)}</p>
          <p className="text-sm">/ {industries[0]}</p>
        </div>
      </div>
    </div>
  );
}
