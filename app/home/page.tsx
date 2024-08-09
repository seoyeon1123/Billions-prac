import { API_URL } from '../api-config';
import Billionary from '../../components/Billionary';

interface IBillionary {
  id: string;
  name: string;
  squareImage: string;
  netWorth: number;
  industries: string[];
}

async function getBillionaries(): Promise<IBillionary[]> {
  const response = await fetch(API_URL);
  return response.json();
}

// MainPage 컴포넌트
export default async function MainPage() {
  const billionaries: IBillionary[] = await getBillionaries();

  return (
    <div className="grid grid-cols-4 gap-4 ">
      {billionaries.map((people) => (
        <Billionary
          key={people.id}
          id={people.id}
          name={people.name}
          netWorth={people.netWorth}
          industries={people.industries}
          squareImage={people.squareImage}
        />
      ))}
    </div>
  );
}
