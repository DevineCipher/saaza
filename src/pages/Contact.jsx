import { useState } from "react";
import { SITE } from "../site";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });

  function update(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function submit(e) {
    e.preventDefault();
    const body = [
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email}`,
      `Company: ${form.company}`,
      "",
      form.message,
    ].join("\n");
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <main className="contact-page">
      <section className="contact-hero">
        <h1>Contact us</h1>
        <p>Contact us about anything related to our company or services.</p>
      </section>
      <section className="section contact-grid">
        <form className="contact-form" onSubmit={submit}>
          <label>
            Name *
            <input name="name" required placeholder="John Doe" value={form.name} onChange={update} />
          </label>
          <label>
            Phone Number
            <input name="phone" placeholder="+92 329 8699415" value={form.phone} onChange={update} />
          </label>
          <label>
            Email *
            <input
              name="email"
              type="email"
              required
              placeholder="example@mail.com"
              value={form.email}
              onChange={update}
            />
          </label>
          <label>
            Company
            <input name="company" placeholder="ACME Corp" value={form.company} onChange={update} />
          </label>
          <label>
            Subject *
            <input
              name="subject"
              required
              placeholder="Describe your request"
              value={form.subject}
              onChange={update}
            />
          </label>
          <label>
            Message *
            <textarea
              name="message"
              required
              placeholder="Write down your message"
              value={form.message}
              onChange={update}
            />
          </label>
          <button className="btn btn-dark" type="submit">
            Send Message
          </button>
          {sent && <p>Your email app should open with the message to {SITE.email}.</p>}
        </form>
        <aside className="contact-aside">
          <h2>Need help?</h2>
          <p>Email, call, or WhatsApp us and we will get back to you.</p>
          <p>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </p>
          <p>
            <a href={SITE.phoneHref}>{SITE.phone}</a>
          </p>
          <a className="btn btn-outline" href={SITE.whatsapp} target="_blank" rel="noreferrer">
            Chat on WhatsApp
          </a>
        </aside>
      </section>
    </main>
  );
}
