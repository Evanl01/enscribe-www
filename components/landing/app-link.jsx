import Link from "next/link";
import { appPath } from "@/lib/app-url";

/**
 * Link to routes on the product app (app.enscribe.online).
 * @param {object} props
 * @param {string} props.href — app path, e.g. "/signup"
 */
export function AppLink({ href, children, className, ...rest }) {
  return (
    <Link href={appPath(href)} className={className} {...rest}>
      {children}
    </Link>
  );
}
