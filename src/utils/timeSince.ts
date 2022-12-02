export function timeSince(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return `${interval}y ago`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return `${interval}m ago`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return `${interval}d ago`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return ` ${interval}h ago`;
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return `${interval} min. ago`;
  }

  return `${Math.floor(seconds)}s ago`;
}
