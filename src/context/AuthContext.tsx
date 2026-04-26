import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type User = { name: string; email: string };
type Pet = {
  id: string;
  name: string;
  species: "perro" | "gato";
  breed: string;
  age: number;
  weight: number;
  notes?: string;
};

type AuthCtx = {
  user: User | null;
  pets: Pet[];
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  addPet: (pet: Omit<Pet, "id">) => void;
  removePet: (id: string) => void;
  updatePet: (id: string, pet: Omit<Pet, "id">) => void;
};

const Ctx = createContext<AuthCtx | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    const u = localStorage.getItem("dh_user");
    const p = localStorage.getItem("dh_pets");
    if (u) setUser(JSON.parse(u));
    if (p) setPets(JSON.parse(p));
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem("dh_user", JSON.stringify(user));
    else localStorage.removeItem("dh_user");
  }, [user]);

  useEffect(() => {
    localStorage.setItem("dh_pets", JSON.stringify(pets));
  }, [pets]);

  const login = (email: string, password: string) => {
    if (!email || !password) return false;
    setUser({ name: email.split("@")[0], email });
    return true;
  };
  const register = (name: string, email: string, password: string) => {
    if (!name || !email || !password) return false;
    setUser({ name, email });
    return true;
  };
  const logout = () => {
    setUser(null);
  };
  const addPet = (pet: Omit<Pet, "id">) =>
    setPets((p) => [...p, { ...pet, id: crypto.randomUUID() }]);
  const removePet = (id: string) => setPets((p) => p.filter((x) => x.id !== id));
  const updatePet = (id: string, pet: Omit<Pet, "id">) =>
    setPets((p) => p.map((x) => (x.id === id ? { ...pet, id } : x)));

  return (
    <Ctx.Provider value={{ user, pets, login, register, logout, addPet, removePet, updatePet }}>
      {children}
    </Ctx.Provider>
  );
};

export const useAuth = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAuth must be used within AuthProvider");
  return c;
};

export type { Pet };