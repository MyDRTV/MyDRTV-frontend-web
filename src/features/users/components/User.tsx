import { getCurrentUser } from "@/features/users/services/user";

// Viser den indloggede brugers oplysninger.
export default async function User() {
  const user = await getCurrentUser();

  return (
    <div className="flex flex-col gap-2">
      <h1>{user.user_name}</h1>
      <p>{user.user_email}</p>
      <p>{user.user_role}</p>
    </div>
  );
}
