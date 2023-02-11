import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {  useState } from "react";
//import { SearchContext } from "../../context/SearchContext.js";
import useFetch from "../../hooks/useFetch.js";
export const Reserve = ({ setOpen, hotelId }) => {
  const { data/*, loading, error*/ } = useFetch(`hotels/room/${hotelId}`);
  //const { dates } = useContext(SearchContext);
  //console.log(data);
  
  
  const [selectedRooms, setSelectedRooms] = useState([]);
  const hundleSelect = (e) => {
    const checked = e.target.checked;
    const Value = e.target.value;
    console.log(Value);
    setSelectedRooms(
      checked
        ? [...selectedRooms, Value]
        : selectedRooms.filter((item) => item !== Value)
    );
  };
  console.log(selectedRooms )
  // const hundleClick = (e) => {
    
  // };
  return (
    <div className="container">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => {
            setOpen(false);
          }}
        />
        <span>Select your rooms : </span>
        {data.map((item) => (
          <div className="ritem">
            <div className="ritemInfo">
              <div className="rTitle">
                <b>Title</b>

                {item.title}
              </div>
              <div className="rDesc">
                <b>Room Description</b>
                {item.desc}
              </div>
              <div className="rMax">
                <b>Max Peaple</b>
                {item.maxPeople}
              </div>
              <div className="rPrice">
                <b>Price</b>
                {item.price}
              </div>
              {item.roomNumbers.map((roomNumber) => (
                <div className="roomNumber" key={roomNumber._id}>
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={hundleSelect}
                    // disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button className="rButton">
          
          Reserve now !
        </button>
      </div>
    </div>
  );
};
