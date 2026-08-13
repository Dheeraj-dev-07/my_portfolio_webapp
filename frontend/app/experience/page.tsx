import ExperienceCard from '../../components/ExperienceCard';
import { getExperience } from '../../lib/api';

export default async function ExperiencePage() {
  const experiences = await getExperience();
  return (
    <div className="pt-8 pb-16">
      <ExperienceCard experiences={experiences} />
    </div>
  );
}
