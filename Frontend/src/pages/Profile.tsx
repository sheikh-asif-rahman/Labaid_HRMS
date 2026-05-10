import TodayStatusCard from "../components/profile/TodayStatusCard";

import ProfileStatCard from "../components/profile/ProfileStatCard";

import AttendanceOverviewCard from "../components/profile/AttendanceOverviewCard";

import EventCalendarCard from "../components/profile/EventCalendarCard";

import QuickActionCard from "../components/profile/QuickActionCard";

import { profileStatsData } from "../data/profileData";

const Profile = () => {
  return (
    <div className="space-y-4">
      {/* TOP SECTION */}
      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-[240px_minmax(0,1fr)_300px]
          2xl:grid-cols-[260px_minmax(0,1fr)_320px]
          gap-4
          items-start
        "
      >
        {/* TODAY */}
        <div
          className="
            self-start
            w-full
            xl:w-[240px]
            2xl:w-[260px]
          "
        >
          <TodayStatusCard />
        </div>

        {/* STATS */}
        <div
          className="
            grid
            grid-cols-2
            gap-4
            self-start
            min-w-0
          "
        >
          {profileStatsData.map((item) => {
            const Icon = item.icon;

            return (
              <ProfileStatCard
                key={item.id}
                icon={<Icon size={16} />}
                subtitle={item.title}
                value={item.value}
              />
            );
          })}
        </div>

        {/* ATTENDANCE */}
        <div className="self-start w-full">
          <AttendanceOverviewCard />
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-[1.2fr_0.8fr]
          gap-4
          items-start
        "
      >
        {/* EVENTS */}
        <div>
          <EventCalendarCard />
        </div>

        {/* QUICK ACTIONS */}
        <div>
          <QuickActionCard />
        </div>
      </div>
    </div>
  );
};

export default Profile;