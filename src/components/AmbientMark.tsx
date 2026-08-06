export default function AmbientMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <g opacity="0.9">
        <path
          d="M96 96 L40 46 C28 35 28 16 40 6 C52 -4 70 -2 79 10 L96 96 Z"
          fill="currentColor"
          opacity="0.9"
        />
        <path
          d="M104 96 L160 46 C172 35 172 16 160 6 C148 -4 130 -2 121 10 L104 96 Z"
          fill="currentColor"
          opacity="0.65"
        />
        <path
          d="M96 104 L40 154 C28 165 28 184 40 194 C52 204 70 202 79 190 L96 104 Z"
          fill="currentColor"
          opacity="0.65"
        />
        <path
          d="M104 104 L160 154 C172 165 172 184 160 194 C148 204 130 202 121 190 L104 104 Z"
          fill="currentColor"
          opacity="0.9"
        />
        <circle cx="100" cy="100" r="6" fill="currentColor" />
      </g>
    </svg>
  );
}
