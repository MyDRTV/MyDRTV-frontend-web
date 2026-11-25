import Link from "next/link";

const Header = () => {
  return (
    <nav className="flex justify-end border-b border-gray-400 pb-6 mb-10">
      <ul className="flex gap-8 text-lg font-medium">
        <li>
          <Link
            href="/dashboard"
            className="opacity-70 transition-opacity hover:opacity-100"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            href="/movies"
            className="opacity-70 transition-opacity hover:opacity-100"
          >
            Movies
          </Link>
        </li>
        <li>
          <Link
            href="/profile"
            className="opacity-70 transition-opacity hover:opacity-100"
          >
            Profile
          </Link>
        </li>
        <li>
          <Link
            href="/create-movie"
            className="opacity-70 transition-opacity hover:opacity-100"
          >
            Create new movie
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
