import { useContext } from "react";
import LocationIcon from "../assets/icons8-location-24.png";
import WhiteLocationIcon from "../assets/icons8-location-24-white.png"
import type { EntryProp } from '../Data/type';
import { ThemeContext } from "./ThemeContext";
type props = {
  entry:EntryProp
};

function Entry(props: props) {
  const { image, country, location, place, date } = props.entry;
   const { theme } = useContext(ThemeContext);

   console.log(theme);
  return (
    <>
      <article className="instance">
        <img src={image.src} alt={image.alt} />
        <div className="instance-content">
          <div className="instance-content-1">
            <img src={theme === "light"?LocationIcon:WhiteLocationIcon} alt="locaion icon" height={20} width={20} />
            &emsp;
            <span className="instance-content-date">{country}</span>&emsp;
            <a href={location} target="_blank">
              View in Google Map
            </a>
          </div>
          <h2>{place}</h2>
          {date && <p className="instance-content-date">{date}</p>}
          <p className="details">{props.entry.details}</p>
        </div>
      </article>
    </>
  );
}

// const nums = [1,2,3,4];
// const arr = nums.map((nums)=>{
//     return nums*nums;
// })

// const name = ['alice','bob','charles','danielle']

// const cname = name.map((names)=>{
//         return captilaize(names)
// })

// function captilaize(name:string)
// {
//     var c= name.charAt(0).toUpperCase()
//     var n = name.slice(1,name.length)
//     return c+n;
// }

// console.log(cname);

// const cnt = name.map((name)=>{
//     return <p>{name}</p>
// })

// console.log(cnt);
export default Entry;
