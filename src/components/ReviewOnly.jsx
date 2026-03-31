// import Marquee from "react-fast-marquee"
// import Review from "./AffilateComponents/Review"

// const ReviewOnly = ({review}) => {
//   return (
//     <div className='my-14 '>
//       <Marquee speed={"50"} pauseOnHover className=""
//       >
//         {
//           review.map((data, i) => (
//             <Review data={data} key={i} height="290px"/>
//           ))
//         }
//       </Marquee>
//     </div>  )
// }

// export default ReviewOnly



// ReviewOnly.jsx (updated)
import Marquee from "react-fast-marquee";
import Review from "./AffilateComponents/Review";

const ReviewOnly = ({ review }) => {
  return (
    // outer wrapper ensures the marquee is clipped to this column's width
    <div className="my-8 sm:my-14 w-full overflow-hidden">
      <div className="w-full">
        <Marquee
          speed={50}
          pauseOnHover
          gradient={true}
          gradientColor={[12, 12, 12]}
          className="w-full"
        >
          {review.map((data, i) => (
            // flex-shrink-0 prevents cards from shrinking; marquee will clone/scroll them
            <div key={i} className="mr-3 flex-shrink-0">
              <Review data={data} height="290px" />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default ReviewOnly;
