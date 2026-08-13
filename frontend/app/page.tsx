import PortfolioContainer from '../components/PortfolioContainer';
import {
  getProfile,
  getSkills,
  getExperience,
  getEducation,
  getCertifications,
  getAchievements
} from '../lib/api';

export default async function HomePage() {
  const [
    profile,
    skills,
    experience,
    education,
    certifications,
    achievements
  ] = await Promise.all([
    getProfile(),
    getSkills(),
    getExperience(),
    getEducation(),
    getCertifications(),
    getAchievements()
  ]);

  return (
    <PortfolioContainer
      profile={profile}
      skills={skills}
      experience={experience}
      education={education}
      certifications={certifications}
      achievements={achievements}
    />
  );
}
