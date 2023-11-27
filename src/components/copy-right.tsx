import { TWITTER } from "@/utils/constants";

export function CopyRight() {
  return (
    <div className="text-center">
      <p>
        <small>
          {`© 2020, Built with `}
          <a
            href="https://nextjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Next.js
          </a>
        </small>
      </p>
      <p>
        <small>
          {`createdBy `}
          <a href={TWITTER} target="_blank" rel="noopener noreferrer">
            @kimizuy
          </a>
        </small>
      </p>
    </div>
  );
}
