



import React from 'react';
import { useParams, Outlet } from 'react-router-dom';
import Banner from '../components/MentorshipComponents/Banner';
import Sessions from '../components/MentorshipComponents/Sessions';
import ReviewOnly from '../components/ReviewOnly';
import Courses from '../components/MentorshipComponents/Courses';
import ImgRun from '../components/HomeComponents/ImgRun';
import { pages } from '../constants/pages';

const Mentorship = () => {
  const { mentorKey } = useParams();
  const mentors = pages.mentorship;
  const mentor = mentors[mentorKey];

  if (!mentor) return <p>Mentor not found!</p>;

  const { banner, sessions, course_review, events } = mentor;

  return (
    <div className="w-full">
      <Banner data={banner} />

      <div className="lg:px-20 w-full flex flex-col lg:flex-row gap-5 mt-6">
        <div className="flex-1 min-w-0 px-4 sm:px-10 lg:px-0">
          <Sessions data={sessions} mentorKey={mentorKey} />
          <Outlet />
          <ReviewOnly review={course_review} />
          <ImgRun datas={events} dirc="right" speed="30" m="mb-0" h="h-[200px] sm:h-[247px]" />
        </div>

        <div className="lg:w-[310px] flex-shrink-0">
          <Courses name={banner.mentor_profile_details.name} />
        </div>
      </div>
    </div>
  );
};

export default Mentorship;
