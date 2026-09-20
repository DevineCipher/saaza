import { SITE } from "../site";

export default function WhatsAppButton() {
  return (
    <a
      className="wa-float"
      href={SITE.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label="Open WhatsApp chat"
    >
      <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
        <path
          fill="#fff"
          d="M19.1 17.5c-.3-.1-1.7-.8-1.9-.9s-.5-.1-.7.1-.8.9-1 .1c-.2.1-1 .4-1.9 1.2s-1.3 1.8-1.5 2.1-.3.5 0 .6 1.1.4 1.5.6.9.1 1.2 0 .9-.4 1.8-1.2.9-1.2 1-1.4.1-.3 0-.4-.3-.1-.6-.2zm4.7-11C17.5.2 8.4 1.5 4.1 7.8s-.8 15.4 5.5 19.6l-1.5 5.4 5.5-1.4c7.3 4 16.6-.3 19.2-8.4 2.6-8.1-1.8-16.8-9-19.5zM16.1 29c-2.2 0-4.4-.6-6.3-1.7l-.5-.3-3.3.9.9-3.2-.3-.5C3.4 19.4 3.8 12 8.6 8s12.4-3.9 16.5.9 4.1 12.4.1 16.5c-2.4 2.3-5.6 3.6-9.1 3.6z"
        />
      </svg>
    </a>
  );
}
