import ContactForm from '../../components/ContactForm';
import { getProfile } from '../../lib/api';

export default async function ContactPage() {
  const profile = await getProfile();
  return (
    <div className="pt-8 pb-16">
      <ContactForm profile={profile} />
    </div>
  );
}
