import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, {  useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext.js";
import useFetch from "../../hooks/useFetch.js";
import "./Reserve.css"
export const Reserve = ({ setOpen, hotelId }) => {
  const { data/*, loading, error*/ } = useFetch(`hotels/room/${hotelId}`);
  const { dates } = useContext(SearchContext);
  
  console.log(data);
  console.log()
  
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);
  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      allDates.includes(new Date(date).getTime())
    );

    return !isFound;
  };
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
  console.log("selected rooms ids : "+selectedRooms )
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`/rooms/availability/${roomId}`, {
            dates: allDates,
          });
          return res.data;
        })
      );
      setOpen(false);
      navigate("/");
    } catch (err) {}
  };
  return (
    <div className="reserve">
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
          <div className="ritem" key={item._id}>
            <div className="ritemInfo">
              <div className="rTitle">
                <b>Title  </b>

                {item.title}
              </div>
              <div className="rDesc">
                <b>Room Description : </b>
                {item.desc}
              </div>
              <div className="rMax">
                <b>Max Peaple : </b>
                {item.maxPeople}
              </div>
              <div className="rPrice">
                <b>Price : </b>
                {item.price} $
              </div>
              {item.roomNumbers.map((roomNumber) => (
                <div className="rSelectRooms" key={roomNumber._id}>
                  <label className="room ">{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={hundleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="rbutton">
          
          Reserve now !
        </button>
      </div>
    </div>
  );
};
