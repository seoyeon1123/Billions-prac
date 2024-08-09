import { API_URL } from '@/app/api-config';
import FinancialAssets from '@/components/person-financialAssets';

export interface IParams {
  params: { id: string };
}

async function getDetail(id: string) {
  const response = await fetch(`${API_URL}/person/${id}`);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
}

export default async function DetailPerson({ params: { id } }: IParams) {
  const person = await getDetail(id);
  return (
    <div className="flex flex-col gap-10 my-16">
      <img
        src={person.squareImage}
        alt={person.name}
        className="w-72 rounded-full"
      />
      <div className="flex flex-row items-baseline gap-3">
        <h1 className="text-4xl font-extrabold">{person.name}</h1>
        <div className="text-lg flex gap-2">
          <h2>{person.state}</h2>
          <h2> {person.city}</h2>
        </div>
      </div>
      <p className="w-full bg-slate-700 p-3 rounded-2xl">BIO : {person.bio}</p>
      <p className="w-full bg-slate-200 text-black p-3 rounded-2xl">
        ABOUT : {person.about}
      </p>
      <div className="w-full bg-slate-700 p-3 rounded-2xl">
        <h1 className="text-3xl font-extrabold pt-1 p-3">Financial Assets</h1>
        <FinancialAssets financialAssets={person.financialAssets} />
      </div>
    </div>
  );
}
