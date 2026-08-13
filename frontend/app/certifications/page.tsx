import CertificationsGrid from '../../components/CertificationsGrid';
import { getCertifications } from '../../lib/api';

export default async function CertificationsPage() {
  const certifications = await getCertifications();
  return (
    <div className="pt-8 pb-16">
      <CertificationsGrid certifications={certifications} />
    </div>
  );
}
