import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'Dheeraj Sisodiya | Java Full Stack Developer Portfolio',
  description: 'Java Full Stack Developer with experience in Spring Boot, Spring Security, REST APIs, MySQL, Docker, and React. View projects, skills, experience, and certifications.',
  keywords: ['Java Developer', 'Full Stack Developer', 'Spring Boot', 'Spring Security', 'FastAPI', 'Next.js', 'Indore', 'Dheeraj Sisodiya'],
  authors: [{ name: 'Dheeraj Sisodiya' }],
  openGraph: {
    title: 'Dheeraj Sisodiya | Java Full Stack Developer',
    description: 'Java Full Stack Developer specializing in secure, production-ready Spring Boot microservices and modern web frontends.',
    type: 'website',
    url: 'https://dheerajsisodiya.dev',
    images: [
      {
        url: '/images/dheeraj-sisodiya.png',
        width: 576,
        height: 1024,
        alt: 'Dheeraj Sisodiya, Java Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dheeraj Sisodiya | Java Full Stack Developer',
    description: 'Java Full Stack Developer specializing in secure, production-ready Spring Boot microservices and modern web frontends.',
    images: ['/images/dheeraj-sisodiya.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans antialiased selection:bg-brand-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
