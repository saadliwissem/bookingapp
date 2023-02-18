import useFetch from "../../hooks/useFetch.js";
import "./Featured.css";
export const Feautured = () => {
  //const uri = "https://main--bespoke-treacle-5ca4d6.netlify.app/"
  const { data, loading } = useFetch(
    "/hotels/CountByCity?cities=london,madrid,kasserine"
  );
  console.log(data)
  return (
    <>
      <div className="featured">
        {loading ? (
          "loading please wait"
        ) : (
          <>
            <div className="featuredItem">
              <img
                src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
                alt=""
                className="featuredImg"
              />
              <div className="featuredTitles">
                <h1>London</h1>
                <h2>{data[0]} properties</h2>
              </div>
            </div>

            <div className="featuredItem">
              <img
                src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
                alt=""
                className="featuredImg"
              />
              <div className="featuredTitles">
                <h1>madrid</h1>
                <h2>{data[1]} properties</h2>
              </div>
            </div>
            <div className="featuredItem">
              <img
                src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
                alt=""
                className="featuredImg"
              />
              <div className="featuredTitles">
                <h1>kasserine</h1>
                <h2>{data[2]} properties</h2>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
