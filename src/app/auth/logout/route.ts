import { logout } from "@/features/auth/services/auth";

// Services sender hertil, når backenden svarer 401 (udløbet token).
export const GET = logout;
