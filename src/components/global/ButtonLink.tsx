import Link from "next/link";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
};

export default function ButtonLink({ href, children }: ButtonLinkProps) {
  return <Link href={href}>{children}</Link>;
}
