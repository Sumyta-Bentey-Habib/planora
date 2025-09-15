"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function ProtectedRoute({ allowedRoles, children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      Swal.fire("Unauthorized", "Please login to access this page", "error").then(() => {
        router.push("/login");
      });
      return;
    }

    if (!allowedRoles.includes(session.user.role)) {
      Swal.fire("Forbidden", "You do not have access to this page", "error").then(() => {
        router.push("/");
      });
      return;
    }

    setLoading(false);
  }, [status, session]);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return children;
}
