export default function CountryFlag({ country }: { country: string }) {
  return <span className={`fi fi-${country.toLowerCase()}`}></span>;
}
