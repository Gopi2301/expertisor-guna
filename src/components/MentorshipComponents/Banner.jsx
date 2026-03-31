








import { assets } from "../../assets/assets";

const Banner = ({ data }) => {
  // Handler for system share
  const handleShare = async (e) => {
    e.preventDefault();
    const currentUrl = window.location.href;

    const shareData = {
      title: document.title || 'Check out this profile!',
      text: `Check out ${data?.mentor_profile_details?.name}'s profile!`,
      url: currentUrl,
    };

    if (navigator.share) {
      // Mobile browsers: open native share dialog
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share cancelled or failed:', err);
      }
    } else {
      // Desktop fallback: copy URL
      try {
        await navigator.clipboard.writeText(currentUrl);
        alert('Profile link copied to clipboard!');
      } catch (err) {
        alert('Failed to copy link. Please copy manually.');
      }
    }
  };

  return (
    <div>
      <div className="w-full mb-[34px]">
        {/* Banner Image */}
        <div className="w-full hidden sm:block   md:max-h-max overflow-hidden">
          <img
            src={data.banner_img}
            alt="Mentor banner"
            className="w-full h-full overflow-hidden object-cover"
          />
        </div>

        <div className="w-full sm:hidden block">
          <img src={data.banner_img_mob} alt="" className="w-full h-full overflow-hidden object-cover"/>
        </div>

        {/* Main Content */}
        <div className="px-4  -mt-6 sm:-mt-4 sm:px-10 lg:px-20 flex flex-col lg:flex-row justify-between gap-5 lg:items-center">
          {/* Left: Profile + Details */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <img
              src={data.mentor_profile_details.profile_img}
              alt={data.mentor_profile_details.name}
              className="h-[120px] w-[120px] sm:h-[160px] sm:w-[160px] lg:h-[180px] lg:w-[180px] object-cover rounded-full"
            />

            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-inter font-semibold text-[18px] sm:text-[20px] lg:text-[24px] text-white">
                  {data.mentor_profile_details.name}
                </h3>
                <img
                  src={data.mentor_profile_details.verify_i}
                  alt="Verified badge"
                  className="h-5 w-5"
                />
              </div>

              <p className="font-inter font-normal text-[14px] sm:text-[15px] lg:text-[16px] text-[#A7A7A7]">
                {data.mentor_profile_details.domain}
              </p>

              <div className="flex flex-wrap gap-3">
                {data.mentor_profile_details.specification.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 p-2 rounded-xl border min-w-[120px] sm:min-w-[140px] justify-center"
                    style={{
                      backgroundColor: item.bg_color,
                      borderColor: item.border_color,
                    }}
                  >
                    <img
                      src={item.img}
                      alt={item.para}
                      className="h-6 w-6 sm:h-8 sm:w-8"
                    />
                    <p className="font-inter font-medium text-[10px] sm:text-[13px] lg:text-[14px] text-white text-center">
                      {item.para}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Socials + Share */}
          <div className="w-full sm:w-auto flex flex-col sm:flex-row lg:flex-col gap-4 sm:items-center justify-between ">
            {/* Social Icons */}
            <div className="flex gap-2 sm:gap-3 justify-start lg:justify-end flex-wrap">
              {data.mentor_profile_details.sm.map((item, i) => (
                item.link && (
                  <a
                    key={i}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#141414] hover:bg-[#1E1E1E] p-[10px] rounded-full flex items-center justify-center transition"
                  >
                    <img
                      src={item.icon}
                      alt={`social-icon-${i}`}
                      className="h-5 w-5"
                    />
                  </a>
                )
              ))}

            </div>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="w-full sm:w-auto flex items-center justify-center py-[10px] px-16 gap-2 bg-[#F2F2F21A] border border-[#A7A7A7] rounded-md hover:bg-[#F2F2F233] transition"
            >
              <img src={assets.share} alt="Share" className="h-5 w-5" />
              <p className="font-inter font-medium text-[14px] text-white">
                Share profile
              </p>
            </button>
          </div>
        </div>
      </div>

      <hr className="h-[1px] bg-[#1D1D1D] border-0 w-full" />
    </div>
  );
};

export default Banner;






