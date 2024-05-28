export function Footer() {
  return (
    <footer className="pt-8 pb-2">
      <div className="text-center py-4">
        <p className="text-sm flex items-center justify-center gap-2">
          Made with{" "}
          <span className="w-4 h-4 inline-block">
            <svg
              viewBox="0 0 60 58"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.4348 0.5C4.67181 0.5 0 5.17181 0 10.9348C0 16.3448 4.11705 20.7932 9.38895 21.3178V44.8476C9.38895 52.0514 15.2287 57.8911 22.4324 57.8911H37.0408C44.2445 57.8911 50.0842 52.0514 50.0842 44.8477V21.3569C55.6061 21.0864 60 16.5237 60 10.9348C60 5.17181 55.3282 0.5 49.5652 0.5L10.4348 0.5Z"
                fill="url(#paint0_linear_2974_31682)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_2974_31682"
                  x1="8.25"
                  y1="45.6955"
                  x2="49.412"
                  y2="9.45708"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#D04EC5" />
                  <stop offset="1" stopColor="#ED7BC7" />
                </linearGradient>
              </defs>
            </svg>
          </span>{" "}
          by{" "}
          <a
            href="https://twitter.com/breadchain_"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            @breadchain_
          </a>
        </p>
      </div>
    </footer>
  );
}
