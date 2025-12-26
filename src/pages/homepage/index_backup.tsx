import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Homepage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // cek token di localStorage
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("userEmail");

    if (!token) {
      router.replace("./");
    } else {
      setUserEmail(email);
    }
    setChecked(true);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    router.replace("./");
  };

  const getData = async () => {
    const data = await fetch("https://reqres.in/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "reqres_746dd67bd84f4cab98b82566173afb71",
      },
    });
    const result = await data.json();
    console.log(result);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-8 ${
        !checked ? "hidden" : ""
      }`}
    >
      <h1 className="text-3xl font-bold">
        Selamat datang{userEmail ? `, ${userEmail}` : ""} 🎉
      </h1>
      <p className="mt-4 text-gray-600">
        Kamu berhasil login menggunakan token sebagai session.
      </p>

      <button
        onClick={handleLogout}
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded"
      >
        Logout
      </button>
    </main>
  );
}
