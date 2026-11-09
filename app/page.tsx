import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { IBM_Plex_Sans } from "next/font/google";
import InteractiveBackground from "./Interactivebackground";
import Navbar, { type NavItem } from "./Navbar";

const font = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

/* ------------------------------------------------------------------ */
/*  EDIT YOUR CONTENT HERE                                             */
/*  Images: place them in /public/images and reference them like       */
/*  "/images/profile.jpg". Leave "" to show an empty placeholder.      */
/* ------------------------------------------------------------------ */

type Social = { label: string; href: string };
type Project = {
  title: string;
  description: string;
  role: string;
  image: string;
  url: string;
  techs: string[];
};
type Certificate = { name: string; image: string };

const EMAIL = "danilogranados1409@gmail.com";

const COPYRIGHT_YEAR = 2026;

const profile: {
  name: string;
  role: string;
  about: string;
  photo: string;
  socials: Social[];
} = {
  name: "Danilo Granados",
  role: "Developer",
  about:
    "Student at ¡Supérate! Hilasal. I have been studying for 3 years ICT, english and values. I am focused on innovation and development of finances and technology. Leadership, determination and Discipline. ",

  photo: "/images/1787501913778.jpg", // e.g. "/images/profile.jpg"
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/danilo-granados-?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
    { label: "GitHub", href: "https://github.com/DaniloMCD" },
  ],
};

type Technology = { name: string; color: string };

const technologies: Technology[] = [
  { name: "Next.js", color: "#4b7bec" },
  { name: "Supabase", color: "#3ecf8e" },
  { name: "PostgreSQL", color: "#3ecf8e" },
  { name: "GitHub", color: "#ffffff" },
  { name: "Excel", color: "#1e9e55" },
  { name: "Canva", color: "#6fd3f5" },
  { name: "Power BI", color: "#d4a50a" },
];

// Colors for the technology chips shown inside each project card
const projectTechStyles: Record<string, { bg: string; fg: string }> = {
  HTML: { bg: "#8b2a2a", fg: "#ffffff" }, // dark red
  JavaScript: { bg: "#a68a0a", fg: "#ffffff" }, // dark yellow
  Tailwind: { bg: "#1f7a99", fg: "#ffffff" }, // dark light-blue
  Prisma: { bg: "#2a4f8f", fg: "#ffffff" }, // dark blue
  "Next.js": { bg: "#14264d", fg: "#ffffff" }, // darker blue than Prisma
  Supabase: { bg: "#7fe0b0", fg: "#0b3b26" }, // light green
};

const aboutHighlights: Record<string, string> = {
  "¡Supérate!": "pf-hl-green",
  Hilasal: "pf-hl-blue",
};

const projects: Project[] = [
  {
    title: "Demo's PC",
    description:
      "A website created in 2024. It's goal was helping people to build their computers and show a list with some products of many brands.",
    role: "Product Owner & Developer",
    image: "/images/Captura demos pc.PNG", // e.g. "/images/project-1.png"
    url: "https://demos-pc-10.vercel.app/",
    techs: ["HTML", "JavaScript", "Tailwind"],
  },
  {
    title: "Payvo",
    description:
      "A startup/fintech made in 2025. It's goal was helping salvadorians to take control of their money. Where your money goes, from where it comes and what you can do to have no debts it's what Payvo shows.",
    role: "Scrum Master & Developer",
    image: "/images/Captura payvo.PNG",
    url: "https://payvo-gules.vercel.app/LandingPage/",
    techs: ["HTML", "JavaScript", "Tailwind", "Prisma"],
  },
  {
    title: "Finans",
    description:
      "A startup/fintech made in 2026. It's goal was helping salvadorians with their stores clasified on MSMEs to control their money, showing where it goes and comes from, seeing future payments to make and debts.",
    role: "DB Developer",
    image: "/images/Captura finans.PNG",
    url: "https://finans-website.onrender.com/",
    techs: ["Next.js", "Tailwind", "Supabase"],
  },
];

const certificates: Certificate[] = [
  { name: "Introducción a la educación financiera", image: "/images/Downloading file.jpg" },
  { name: "Basic english course A2: Past experiences and plans", image: "/images/Downloading file (1).jpg" },
  { name: "Practical and conversational english course", image: "/images/tmp_65dec519-4d17-460f-b95c-e5114f4d4219.jpeg" },
  { name: "Microsoft Excel Expert ", image: "/images/IMG-20260325-WA0010.jpg" },
];

// Navbar links. Each id must match a section id below.
const navItems: NavItem[] = [
  { id: "profile", label: "Profile" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

/* ------------------------------------------------------------------ */

const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  EMAIL
)}&su=${encodeURIComponent("Hello from your portfolio")}`;

const [firstName, ...restName] = profile.name.split(" ");
const lastName = restName.join(" ");

function HighlightedText({
  text,
  highlights,
}: {
  text: string;
  highlights: Record<string, string>;
}) {
  const escaped = Object.keys(highlights).map((word) =>
    word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  );
  const parts = text.split(new RegExp(`(${escaped.join("|")})`, "g"));
  return (
    <>
      {parts.map((part, i) =>
        highlights[part] ? (
          <span key={i} className={highlights[part]}>
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
}

type ImageSlotProps = {
  src: string;
  alt: string;
  label: string;
  className?: string;
  openInNewTab?: boolean;
};

function ImageSlot({
  src,
  alt,
  label,
  className = "",
  openInNewTab = false,
}: ImageSlotProps) {
  if (!src) {
    return (
      <div
        className={`pf-placeholder ${className}`}
        role="img"
        aria-label={label}
      >
        <span>{label}</span>
      </div>
    );
  }

  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={`pf-image ${className}`} loading="lazy" />
  );

  if (!openInNewTab) return img;

  return (
    <a
      href={src}
      target="_blank"
      rel="noopener noreferrer"
      className="pf-image-link"
      aria-label={`${alt} (opens in a new tab)`}
    >
      {img}
    </a>
  );
}

export const metadata: Metadata = {
  title: `${profile.name} | Portfolio`,
  description: profile.about,
};

export default function Portfolio() {
  return (
    <main className={`pf-page ${font.className}`}>
      <InteractiveBackground />
      <Navbar brand={profile.name} items={navItems} />

      <div className="pf-content">
        {/* Profile */}
        <section id="profile" className="pf-profile">
          <div className="pf-container pf-profile-grid">
            <div className="pf-photo-col">
              <ImageSlot
                src={profile.photo}
                alt={`Portrait of ${profile.name}`}
                label="Your photo"
                className="pf-photo"
              />
              <ul className="pf-socials" aria-label="Social links">
                {profile.socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pf-social-btn"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pf-profile-text">
              <h1>
                <span className="pf-name-first">{firstName}</span>{" "}
                <span className="pf-name-last">{lastName}</span>
              </h1>
              <p className="pf-role-line pt-3">{profile.role}</p>
              <p className="pf-about pt-3">
                <HighlightedText
                  text={profile.about}
                  highlights={aboutHighlights}
                />
              </p>
              <p className="pt-4">Technologies that I use:</p>
              <ul className="pf-techs" aria-label="Technologies">
                {technologies.map((tech) => (
                  <li
                    key={tech.name}
                    className="pf-tech"
                    style={{ "--tech": tech.color } as CSSProperties}
                  >
                    {tech.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section
          id="projects"
          className="pf-section"
          aria-labelledby="projects-title"
        >
          <div className="pf-container">
            <h2 id="projects-title">Projects</h2>
            <div className="pf-project-grid">
              {projects.map((p) => (
                <article key={p.title} className="pf-card">
                  <ImageSlot
                    src={p.image}
                    alt={`Screenshot of ${p.title}`}
                    label="Website screenshot"
                    className="pf-card-image"
                  />
                  <div className="pf-card-body">
                    <h3>{p.title}</h3>
                    <p className="pf-card-text">{p.description}</p>
                    <p className="pf-card-role pt-3">
                      <span>Role</span> {p.role}
                    </p>

                    <ul
                      className="pf-card-techs"
                      aria-label={`Technologies used in ${p.title}`}
                    >
                      {p.techs.map((t) => {
                        const s = projectTechStyles[t];
                        return (
                          <li
                            key={t}
                            className="pf-card-tech"
                            style={
                              {
                                "--chip-bg": s.bg,
                                "--chip-fg": s.fg,
                              } as CSSProperties
                            }
                          >
                            {t}
                          </li>
                        );
                      })}
                    </ul>

                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pf-visit"
                    >
                      Visit website
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Education & certificates */}
        <section
          id="education"
          className="pf-section pf-alt-section"
          aria-labelledby="certs-title"
        >
          <div className="pf-container">
            <h2 id="certs-title">Education &amp; certificates</h2>
            <div className="pf-cert-grid">
              {certificates.map((c) => (
                <figure key={c.name} className="pf-cert">
                  <ImageSlot
                    src={c.image}
                    alt={`Certificate: ${c.name}`}
                    label="Certificate image"
                    className="pf-cert-image"
                    openInNewTab
                  />
                  <figcaption>{c.name}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="pf-section pf-contact-section"
          aria-labelledby="contact-title"
        >
          <div className="pf-container pf-contact">
            <h2 id="contact-title">Contact me</h2>
            <p>
              Have a project in mind or want to work together? Send me a
              message and I will get back to you as soon as possible.
            </p>
            <a
              href={gmailLink}
              target="_blank"
              rel="noopener noreferrer"
              className="pf-contact-btn"
            >
              Write me on Gmail
            </a>
            <p className="pf-email">{EMAIL}</p>
          </div>
        </section>

        <footer className="pf-footer">
          <div className="pf-container">
            &copy; {COPYRIGHT_YEAR} {profile.name}
          </div>
        </footer>
      </div>
    </main>
  );
}