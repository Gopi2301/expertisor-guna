// import { X } from "lucide-react"; // red X icon

// const problems = [
//   "Spending too much on ads, but sales are not improving",
//   "Product is not showing up when people search on Amazon",
//   "Sales are very slow, even after many weeks or months",
//   "Don’t know the right price! Too high leads to no sales; Too low leads to no profit.",
//   "People are seeing your product, but not buying",
//   "Competitors are winning with better reviews and rankings",
//   "Not sure how to pick the right product or category to sell",
//   "Profit is low because of high fees, ads, and pricing issues",
//   "Not sure what is working and what is simply wasting time",
// ];

// const FeelingStuck = () => {
//     return (
//         <div className='px-5 sm:px-14 lg:px-20'>
//                 <div className="bg-black   py-10">
//                     <div className=" flex flex-wrap justify-center gap-3">
//                         {problems.map((text, index) => (
//                             <div
//                                 key={index}
//                                 className="flex items-center gap-2 bg-[#1a1a1a] text-white px-4 py-3 rounded-full text-sm md:text-base"
//                             >
//                                 <X className="text-red-500 w-5 h-5 flex-shrink-0" />
//                                 <span>{text}</span>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//         </div>
//     )
// }

// export default FeelingStuck




import Problem from "./Problem";
import Heading from '../../components/Heading'
import { pages } from "../../constants/pages";



const FeelingStuck = () => {
    return (
        <>
            <div className="md:mt-[94px]">
                <div className="px-3 sm:px-14 lg:px-20">
                    <Heading head={pages.Amazon_page.feeling_stuck.head} highlights={pages.Amazon_page.feeling_stuck.highlights} p1={pages.Amazon_page.feeling_stuck.p1} p2={pages.Amazon_page.feeling_stuck.p2} />
                </div>
                <Problem />
            </div>
        </>
    );
};

export default FeelingStuck;
