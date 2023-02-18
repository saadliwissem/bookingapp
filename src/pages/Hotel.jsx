import "./Hotel.css";
import { Navbar } from "../components/navbar/Navbar";
import Header from "../components/header/Header";
import { MailList } from "../components/MailList/MailList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { Footer } from "../components/foooter/Footer";
import { useState,useEffect, useContext } from "react";
import useFetch from "../hooks/useFetch";
import { SearchContext } from "../context/SearchContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Reserve } from "../components/reserve/Reserve";


export const Hotel = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [url,setUrl]=useState("nothing")
  useEffect(()=>{

    const cu = window.location.href;
    setUrl(cu)
  },[])
  
  
  const id = url.split("/")[5]
  console.log(id)
  const { data, loading } = useFetch(`/hotels/find/${id}`);
  
  const {dates ,options}= useContext(SearchContext);

//calculate dates between start and end date 

const Milliseconds_per_day = 1000*60*60*24;
function daydiff(date1,date2){
  const timeDiff = Math.abs(date2.getTime()-date1.getTime());
  const diffDays = Math.ceil(timeDiff/Milliseconds_per_day)
  return diffDays
}
const days = daydiff(dates[0].endDate ,dates[0].startDate) 
  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };
  const {user} = useContext(AuthContext)
  const navigate= useNavigate()
  const [openModal,setOpenModal]= useState(false)
  const hundleClick=()=>{
     if(user){
       setOpenModal(true)
     }
     else{
       navigate("/login")
     }
    
  }
  return (
    <div> 
      <Navbar />
      <Header type="list" />
      {loading ? (
        "loading"
      ) : (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img
                  src={data.photos[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="hotelWrapper">
            <button onClick={hundleClick} className="bookNow">Reserve or Book Now!</button>
            <h1 className="hotelTitle">{data.name} </h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.city}</span>
            </div>
            <span className="hotelDistance">
              Excellent location – {data.distance}
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi
            </span>
            <div className="hotelImages">
              {data.photos?.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">Stay in the heart of City</h1>
                <p className="hotelDesc">
                  {data.desc}
                </p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {days}-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2>
                  <b>${days*data.cheapestPrice*options.room}</b> ({days}{""})
                </h2>
                <button onClick={hundleClick}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
       {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
    </div>
  );
};
