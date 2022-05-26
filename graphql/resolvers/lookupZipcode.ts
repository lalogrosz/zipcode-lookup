import axios from "axios";

interface Args {
  country: string;
  zipCode: string;
}

const resolvers = async (_: any, args: Args) => {
  try {
    const { data } = await axios.get(`https://api.zippopotam.us/${args.country}/${args.zipCode}`);
    return {
      zipcode: args.zipCode,
      city: data.places[0]["place name"],
      state: data.places[0]["state"],
      country: data.country
    };
  } catch (error) {
    throw new Error("Zipcode not found");
  }
};

export default resolvers;
