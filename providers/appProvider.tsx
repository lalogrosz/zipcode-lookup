import { useLazyQuery } from "@apollo/client";
import { createContext, useContext, useEffect, useState } from "react";
import { GET_ZIPCODE } from "../graphql/queries";

export interface Country {
  code: string;
  name: string;
}

export interface ZipCode {
  zipcode: string;
  city: string;
  state: string;
  country: string;
}

export interface History {
  country: Country;
  zipCode: ZipCode;
}

export interface AppProviderProps {
  zipCode: string;
  setZipcode: (value: string) => void;
  country: Country;
  setCountry: (value: Country) => void;
  zipCodeSelected?: ZipCode;
  setZipCodeSelected: (value: ZipCode) => void;
  history: History[];
  setHistory: (zipCode: ZipCode, country: Country) => void;
  clearHistory: () => void;
  search: () => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  error: string;
}

export const AppContext = createContext<AppProviderProps | undefined>(undefined);
const Provider = AppContext.Provider;

export default function AppProvider({ children }: React.PropsWithChildren<{}>) {
  const [zipCode, setZipcode] = useState("");
  const [country, setCountry] = useState({} as Country);
  const [zipCodeSelected, setZipCodeSelected] = useState<ZipCode | undefined>();
  const [history, setHistoryState] = useState([] as History[]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Save the history to local storage and state
  const setHistory = (zipCode: ZipCode, country: Country) => {
    const newHistory = [
      {
        zipCode,
        country
      },
      ...history
    ];

    // remove last if is more than 5
    if (newHistory.length > 6) {
      newHistory.pop();
    }

    window.localStorage.setItem("history", JSON.stringify(newHistory));
    setHistoryState(newHistory);
  };

  const clearHistory = () => {
    window.localStorage.removeItem("history");
    setHistoryState([]);
  };

  const [getZipcode] = useLazyQuery(GET_ZIPCODE, {
    onCompleted: (data) => {
      if (data) {
        setZipCodeSelected({ ...data.lookupZipcode, country: country.name });
        setHistory(data.lookupZipcode, country);
      }
      setLoading(false);
    },
    onError: (error) => {
      setError(error.message);
      setLoading(false);
    },
    // I need it because I have conflicts when I set a state for loading and zipCodeSelected before calling the query
    fetchPolicy: "no-cache"
  });

  // Load the history from local storage
  useEffect(() => {
    if (window.localStorage.getItem("history")) {
      setHistoryState(JSON.parse(window.localStorage.getItem("history") as string));
    }
  }, []);

  const search = () => {
    setError("");
    setZipCodeSelected(undefined);
    // Avoid search if the zipcode is in the history
    const historyFound = history.find(
      (history) => history.zipCode.zipcode === zipCode && history.country.code === country.code
    );
    if (historyFound) {
      setZipCodeSelected(historyFound.zipCode);
      return;
    }

    setLoading(true);
    getZipcode({ variables: { zipCode, country: country.code } });
  };

  return (
    <Provider
      value={{
        zipCode,
        setZipcode,
        country,
        setCountry,
        zipCodeSelected,
        setZipCodeSelected,
        history,
        setHistory,
        clearHistory,
        search,
        loading,
        setLoading,
        error
      }}
    >
      {children}
    </Provider>
  );
}

export const useAppContext = (): AppProviderProps => {
  return useContext(AppContext) as AppProviderProps;
};
