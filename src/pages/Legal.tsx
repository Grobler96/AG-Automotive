import { Link } from 'react-router-dom';
import { useSEO } from '@/lib/useSEO';
import { site, tel } from '@/config/site';

/*
 * Plain English privacy and terms pages. They describe what this site actually does today: no forms, no cookies, no
 * analytics, fonts served from this site. If a contact form or analytics is added, update the privacy page first.
 * Not legal advice: the client should read both and confirm they match how the business works.
 */

const Page = ({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) => (
  <section className="bg-ink">
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 sm:py-24">
      <p className="mono">// {site.name}</p>
      <h1 className="mt-3 font-display font-bold uppercase text-4xl sm:text-5xl leading-[0.98]">{title}</h1>
      <p className="mt-3 text-sm text-paper/55">Last updated {updated}</p>
      <div className="mt-8 space-y-4 text-paper/80 [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:uppercase [&_h2]:text-paper [&_a]:text-lime [&_a]:underline [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1">{children}</div>
      <p className="mt-12"><Link to="/" className="btn btn-ghost">Back to the home page</Link></p>
    </div>
  </section>
);

const contact = (
  <span>
    Phone or text <a href={tel}>{site.phoneDisplay}</a>
    {site.email && <> or email <a href={`mailto:${site.email}`}>{site.email}</a></>}.
  </span>
);

export function Privacy() {
  useSEO();
  return (
    <Page title="Privacy policy" updated="October 2026">
      <p>This page explains how {site.name}, a mobile mechanic covering {site.area}, handles your information.</p>

      <h2>What this website collects</h2>
      <p>Nothing. This website has no forms, no accounts, no cookies and no analytics or tracking tools. The fonts are served from this website, not from another company.</p>

      <h2>When you call, text or email us</h2>
      <p>If you contact us, we receive what you choose to send: usually your name, phone number or email address, your location and details of your vehicle. We use it to reply to you, give you a quote and carry out the work, and to keep a record of the job. We do not sell your details or pass them on for marketing.</p>
      <p>Because texts, calls and emails go through your phone network or email provider, those companies handle them under their own policies.</p>

      <h2>Hosting</h2>
      <p>This website is hosted by GitHub Pages. Like any web host, GitHub may record technical information about visitors, such as an IP address, when it delivers a page. We do not see or use that information. See GitHub's privacy statement for how it is handled.</p>

      <h2>How long we keep things</h2>
      <p>We keep contact details and job records for as long as we need them to deal with your enquiry, do the job and keep the records we need for the business. You can ask us to delete your details at any time.</p>

      <h2>Your rights</h2>
      <p>Under UK data protection law you can ask us what information we hold about you, ask us to correct it, or ask us to delete it. {contact}</p>
      <p>If you are unhappy with how your information has been handled, you can complain to the Information Commissioner's Office at <a href="https://ico.org.uk" rel="noopener">ico.org.uk</a>.</p>

      <h2>If this changes</h2>
      <p>If we add a contact form or other tools to this website, we will update this page first.</p>
    </Page>
  );
}

export function Terms() {
  useSEO();
  return (
    <Page title="Website terms" updated="October 2026">
      <p>By using this website you agree to these terms. They are about the website only. Work on your vehicle is agreed with you directly when we quote.</p>

      <h2>Information on this site</h2>
      <p>The information here is general and is there to help you decide whether to get in touch. It is not a diagnosis or advice about your particular vehicle. Which jobs your vehicle needs, and what they involve, depends on the vehicle, so we look at each one and quote for each job.</p>

      <h2>Quotes</h2>
      <p>We do not publish prices. Every job is quoted for the vehicle and the work. {contact}</p>

      <h2>Photos and content</h2>
      <p>The photos and text on this website belong to {site.name} or are used with permission. Please do not copy them without asking first.</p>

      <h2>Links to other websites</h2>
      <p>This site links to other websites, such as the designer's. We are not responsible for what is on them.</p>

      <h2>Liability</h2>
      <p>We take care to keep this website accurate, but we cannot promise it is always complete or up to date. Nothing in these terms limits any right you have under the law that cannot be limited, including for death or personal injury caused by negligence, or for fraud.</p>

      <h2>Law</h2>
      <p>These terms are governed by the law of England and Wales.</p>

      <h2>Your privacy</h2>
      <p>See our <Link to="/privacy/">privacy policy</Link>.</p>
    </Page>
  );
}
