const dev = {
  API_PATH: "https://g1api.finlogix.com/v1",
  LOCAL_API_PATH: "https://g1api.finlogix.com/v1",
};

const config = process.env.NODE_ENV === "development" ? dev : prod;

export default { ...config };
