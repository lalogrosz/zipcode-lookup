import { memo, useEffect } from "react";
import { Country } from "../providers/appProvider";
import { countryList } from "../utils/countries";

interface CountryListProps {
  selected: Country;
  onChange: (country: Country) => void;
}

const DEFAULT_COUNTRY = "US";

const CountryList = ({ selected, onChange }: CountryListProps) => {
  useEffect(() => {
    onChange({ code: DEFAULT_COUNTRY, name: countryList[DEFAULT_COUNTRY] });
  }, [onChange]);

  const MemorizedOptions = ({ countries }: { countries: Record<string, string> }) => (
    <>
      {Object.keys(countries).map((country: string) => (
        <option key={country} value={country}>
          {countries[country]}
        </option>
      ))}
    </>
  );
  const Options = memo(MemorizedOptions);
  const { code } = selected;
  return (
    <select
      value={code}
      onChange={(event) => onChange({ code: event.target.value, name: countryList[event.target.value] })}
      className="form-select 
                              block
                              w-full
                              px-3
                              py-1.5
                              text-base
                              font-normal
                              text-gray-700
                              bg-white bg-clip-padding bg-no-repeat
                              border border-solid border-gray-300
                              rounded
                              transition
                              ease-in-out
                              m-0
                              md:mr-2
                              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      aria-label="Default select example"
    >
      <Options countries={countryList} />
    </select>
  );
};

export default CountryList;
