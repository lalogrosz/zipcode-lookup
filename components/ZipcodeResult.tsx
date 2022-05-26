import { useEffect, useState } from "react";
import { History, useAppContext } from "../providers/appProvider";
import ZipcodeCard from "./ZipcodeCard";

const ZipcodeResult = () => {
  const { zipCodeSelected, loading, history, clearHistory } = useAppContext();
  const [cleanHistory, setCleanHistory] = useState<History[]>(history);

  useEffect(() => {
    setCleanHistory(
      history
        .filter(
          (item) => item.zipCode.zipcode !== zipCodeSelected?.zipcode || item.country.name !== zipCodeSelected?.country
        )
        .slice(0, 5)
    );
  }, [history, zipCodeSelected]);

  return (
    <section>
      {cleanHistory.length > 0 && (
        <>
          <div className="relative">
            <button
              onClick={clearHistory}
              className="absolute right-0 px-4 py-1 bg-red-600 text-white font-small text-sm leading-snug rounded shadow-md"
            >
              Clear
            </button>
            <h2 className="text-center text-2xl text-bold">Last results</h2>
          </div>
          <div className="flex space-x-2 justify-center mt-2">
            {cleanHistory.map((zipCode, index) => (
              <ZipcodeCard
                key={index}
                zipcode={zipCode.zipCode.zipcode}
                city={zipCode.zipCode.city}
                state={zipCode.zipCode.state}
                country={zipCode.country.name}
                type="small"
              />
            ))}
          </div>
        </>
      )}
      {zipCodeSelected && !loading && (
        <ZipcodeCard
          className="mx-auto mt-20"
          zipcode={zipCodeSelected?.zipcode}
          city={zipCodeSelected?.city}
          state={zipCodeSelected?.state}
          country={zipCodeSelected?.country}
          type="big"
        />
      )}
    </section>
  );
};

export default ZipcodeResult;
