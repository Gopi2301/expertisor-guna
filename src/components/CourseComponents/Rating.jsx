import { FaStar,FaStarHalfAlt,FaRegStar } from "react-icons/fa";
const Rating = ({value}) => {
  return (
    <div className="flex items-center gap-3">
        <div className="flex items-center gap-x-1">
            <span>
                {value >=1 ? <FaStar color="yellow"/> : value >= 0.5 ? <FaStarHalfAlt color="yellow"/> : <FaRegStar  color="grey"/>}
            </span>
            <span>
                {value >=2 ? <FaStar color="yellow"/> : value >= 1.5 ? <FaStarHalfAlt color="yellow"/> : <FaRegStar  color="grey"/>}
            </span>
            <span>
                {value >=3 ? <FaStar color="yellow"/> : value >= 2.5 ? <FaStarHalfAlt color="yellow"/> : <FaRegStar  color="grey"/>}
            </span>
            <span>
                {value >=4 ? <FaStar color="yellow"/> : value >= 3.5 ? <FaStarHalfAlt color="yellow" /> : <FaRegStar  color="grey"/>}
            </span>
            <span>
                {value >=5 ? <FaStar color="yellow"/> : value >= 4.5 ? <FaStarHalfAlt color="yellow"/> : <FaRegStar  color="grey"/>}
            </span>
        </div>
        <p>{value}</p>

    </div>
  )
}

export default Rating