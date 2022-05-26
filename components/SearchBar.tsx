import { useState } from "react";
import { useAppContext } from "../providers/appProvider";
import cn from "classnames";
import CountryList from "./CountryList";

const SearchBar = () => {
  const { zipCode, setZipcode, country, setCountry, search, loading, error } = useAppContext();

  const [hasError, setHasError] = useState(false);

  const handleSearch = () => {
    if (!loading) {
      if (zipCode.length > 0) {
        search();
        setHasError(false);
      } else {
        setHasError(true);
      }
    }
  };

  return (
    <div className="container mt-24 px-6 mx-auto">
      <section className="mb-5 text-gray-800 text-center lg:text-left">
        <div className="flex flex-wrap justify-center">
          <div className="grow-0 shrink-0 basis-auto w-full lg:w-12/12 px-3">
            <div className="grid lg:grid-cols-5 gap-x-6 items-center">
              <div className="mb-10 lg:mb-0 col-span-2">
                <h2 className="text-3xl font-bold">
                  Search by zip code
                  <br />
                  <span className="text-blue-600">And country</span>
                </h2>
              </div>

              <div className="mb-6 md:mb-0 col-span-3">
                <div className="md:flex flex-row">
                  <div className="md:mr-2 relative">
                    {loading && (
                      <span className="absolute right-0 top-3">
                        <svg
                          className="w-5 h-5 mr-3 -ml-1 text-blue-500 animate-spin"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      </span>
                    )}
                    <input
                      type="number"
                      className={cn(
                        "form-control block w-full px-4 py-2 mb-2 md:mb-0  text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white  focus:outline-none",
                        { "border-red-500": hasError, "focus:border-blue-600": !hasError }
                      )}
                      placeholder="Zip code"
                      defaultValue={zipCode}
                      onBlur={(event) => setZipcode(event?.target?.value)}
                    />
                  </div>
                  <CountryList selected={country} onChange={setCountry} />
                  <button
                    type="submit"
                    className="disabled:opacity-50 inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    onClick={handleSearch}
                    disabled={loading}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {error && <p className="text-right mr-4 text-red-500">{error}</p>}
      </section>
    </div>
  );
};

export default SearchBar;
