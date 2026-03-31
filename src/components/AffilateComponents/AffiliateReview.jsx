import Marquee from 'react-fast-marquee'
import Review from './Review'

const AffiliateReview = ({review}) => {
  return (

    <div className='my-14'>
      <Marquee speed={"50"} pauseOnHover className="[&>div]:flex [&>div]:items-stretch "
      >
        {
          review.map((data, i) => (
            <Review data={data} key={i} height="350px"/>
          ))
        }
      </Marquee>
    </div>
  )
}

export default AffiliateReview




