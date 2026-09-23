/* Status pill: 'live' → solid "Available now", 'dev' → outlined "In development" */
export function StatusPill({ status }) {
  return status === 'live'
    ? <span className="pill live"><span className="dot"></span>Available now</span>
    : <span className="pill status"><span className="dot"></span>In development</span>;
}
