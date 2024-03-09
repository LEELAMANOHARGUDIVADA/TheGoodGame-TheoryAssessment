import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";


const Home = () => {
    const [responseData, setResponseData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
  
    const dataHandler = async () => {
      try {
        const response = await fetch("https://api.punkapi.com/v2/beers");
  
        if (!response.ok) {
          throw new Error("Failed to Fetch Data");
        }
        const data = await response.json();
        setResponseData(data);
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      console.log(responseData);
    }, [responseData]);
  
    const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
    };
  
    const filteredData = responseData.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    return (
      <>
        {responseData.length === 0 && (
          <div className="mt-10 w-full flex items-center justify-center">
            <button
              onClick={dataHandler}
              className="bg-sky-400 px-10 py-4 rounded-lg text-white font-semibold text-sm text-center"
            >
              Get data
            </button>
          </div>
        )}
  
        {responseData.length > 0 && (
          <>
            <div className="mt-20 w-full flex items-center justify-center">
              <div className="w-1/3 px-10 py-4 rounded-full shadow-lg flex items-center justify-between">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="outline-none"
                  placeholder="Search something..."
                />
                <CiSearch size={25} className="cursor-pointer" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10 p-24">
              {filteredData.map((item) => (
                <div key={item.id}>
                  <div className="w-[500px] bg-white h-[1700px] px-10 py-5 shadow-xl rounded-lg flex flex-col items-start justify-start gap-3 cursor-pointer hover:shadow-2xl">
                  <div className="w-full flex items-center justify-center my-20">
                    <img
                      src={item.image_url}
                      alt="image"
                      className="w-40 h-40 object-contain "
                    />
                  </div>
                  <h3 className="font-semibold text-lg flex gap-1 items-center justify-center">
                    Name: <p className="font-thin text-sm">{item.name}</p>
                  </h3>
                  <h3 className="font-semibold flex gap-1 items-center justify-center">
                    abv: <p className="font-thin text-sm">{item.abv}</p>
                  </h3>
                  <h3 className="font-semibold flex gap-1 items-center justify-center">
                    attenuation_level: <p className="font-thin text-sm">{item.attenuation_level}</p>
                    <p className="font-thin text-sm">
                      {item.attenuation_level}
                    </p>
                  </h3>
                  <h3 className="font-semibold flex gap-1 items-center justify-center">
                    <p className="font-thin text-sm">
                      boil_volume: {item.boil_volume.value}{" "}
                      {item.boil_volume.unit}
                    </p>
                  </h3>
                  <h3 className="font-semibold flex gap-1 items-center justify-center">
                    Brewers_tips:
                    <p className="font-thin text-sm">{item.brewers_tips}</p>{" "}
                  </h3>
                  <h3 className="font-semibold flex gap-1 items-center justify-center">
                    Contributed by:
                    <p className="font-thin text-sm"> {item.contributed_by}</p>
                  </h3>
                  <h3 className="font-semibold flex gap-1 items-center justify-center">
                    Description:
                    <p className="font-thin text-sm">{item.description}</p>{" "}
                  </h3>
                  <h3 className="font-semibold flex gap-1 items-center justify-center">
                    ebc: <p className="font-thin text-sm">{item.ebc}</p>
                  </h3>
                  <h3 className="font-semibold flex gap-1 items-center justify-center">
                    First Brewed:
                    <p className="font-thin text-sm">{item.first_brewed}</p>{" "}
                  </h3>
                  <h3 className="font-semibold flex gap-1 items-center justify-center">
                    Food Pairing:{" "}
                    <p className="font-thin text-sm">{item.food_pairing}</p>
                  </h3>
                  <h3 className="font-semibold flex gap-1 items-center justify-center">
                    ibu: <p className="font-thin text-sm">{item.ibu}</p>
                  </h3>
                  <div className="flex gap-2">
                    <h3 className="font-semibold flex gap-1 items-start justify-center">
                      Ingredients:
                    </h3>
                    <p className="font-thin text-sm">
                      <ul>
                        <li className="font-semibold">
                          Yeast: {item.ingredients.yeast}
                        </li>
                        <div className="flex gap-2">
                          <li className="font-semibold">Hops:</li>
                          <ul className="">
                            {item.ingredients.hops.map((hop, index) => (
                              <li>{hop.name}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex gap-2">
                          <li className="font-semibold">Malt:</li>
                          <ul>
                            {item.ingredients.malt.map((malt, index) => (
                              <>
                                <li key={index}>{malt.name} </li>
                                <li className="font-semibold">
                                  Amount: {malt.amount.value} {malt.amount.unit}
                                </li>
                              </>
                            ))}
                          </ul>
                        </div>
                      </ul>
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <h3 className="font-semibold flex gap-1 items-center justify-center">
                      Method:
                    </h3>
                    <p className="font-thin text-sm">
                      <ul>
                        <li>
                          Fermentation Temp:
                          {item.method.fermentation.temp.value}{" "}
                          {item.method.fermentation.temp.unit}
                        </li>
                      </ul>
                    </p>
                  </div>

                  <h3 className="font-semibold flex gap-1 items-center justify-center">
                    ph: <p className="font-thin text-sm">{item.ph}</p>
                  </h3>
                  <h3 className="font-semibold flex gap-1 items-center justify-center">
                    srm: <p className="font-thin text-sm">{item.srm}</p>
                  </h3>
                  <h3 className="font-semibold flex gap-1 items-center justify-center">
                    Tagline: <p className="font-thin text-sm">{item.tagline}</p>
                  </h3>
                  <h3 className="font-semibold flex gap-1 items-center justify-center">
                    target_fg:{" "}
                    <p className="font-thin text-sm">{item.target_fg}</p>
                  </h3>
                  <h3 className="font-semibold flex gap-1 items-center justify-center">
                    target_og:{" "}
                    <p className="font-thin text-sm">{item.target_og}</p>
                  </h3>
                  <h3 className="font-semibold flex gap-1 items-center justify-center">
                    Volume:{" "}
                    <p className="font-thin text-sm">
                      {item.volume.value} {item.volume.unit}
                    </p>
                  </h3>
                </div>
                </div>
              ))}
            </div>
          </>
        )}
      </>
    );
  };
  
  export default Home;
  









