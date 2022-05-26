import axios from "axios";
import lookupZipcode from "./lookupZipcode";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("lookupZipcode tests", () => {
  it("should return a zipcode", async () => {
    const args = {
      country: "us",
      zipCode: "90210"
    };

    const expected = {
      zipcode: "90210",
      city: "Beverly Hills",
      state: "California",
      country: "United States"
    };

    mockedAxios.get.mockResolvedValue({
      data: {
        country: "United States",
        "country abbreviation": "US",
        places: [
          {
            "place name": "Beverly Hills",
            state: "California",
            "state abbreviation": "CA",
            latitude: "34.0446",
            longitude: "-118.4452"
          }
        ]
      }
    });

    const result = await lookupZipcode(null, args);

    expect(result).toEqual(expected);
  });

  it("should throw an error", async () => {
    const args = {
      country: "us",
      zipCode: "90002"
    };

    mockedAxios.get.mockRejectedValue({
      response: {
        status: 404
      }
    });

    await expect(lookupZipcode(null, args)).rejects.toThrow("Zipcode not found");
  });
});
