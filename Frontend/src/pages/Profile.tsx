import TodayStatusCard from "../components/profile/TodayStatusCard";

import ProfileStatCard from "../components/profile/ProfileStatCard";

import AttendanceOverviewCard from "../components/profile/AttendanceOverviewCard";

import { profileStatsData } from "../data/profileData";

const Profile = () => {
  return (
    <div className="space-y-4">
      
      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-[1.1fr_1fr_1.1fr]
          gap-4
          items-start
        "
      >
        {/* TODAY */}
        <div className="self-start">
          <TodayStatusCard />
        </div>

        {/* STATS */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            gap-4
            self-start
          "
        >
          {profileStatsData.map((item) => {
            const Icon = item.icon;

            return (
              <ProfileStatCard
                key={item.id}
                icon={<Icon size={18} />}
                subtitle={item.title}
                value={item.value}
              />
            );
          })}
        </div>

        {/* ATTENDANCE */}
        <div className="self-start">
          <AttendanceOverviewCard />
        </div>
      </div>
    </div>
  );
};

export default Profile;