import axios from "../utils/axios";

async function getConfiguration() {
  let configuration = JSON.parse(localStorage.getItem("configuration"));

  if (!configuration) {
    const {data} = await axios.get("/configuration");
    configuration = data;
    localStorage.setItem("configuration", JSON.stringify(data));
  }

  return configuration;
}

export default getConfiguration;
