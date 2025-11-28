import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { UserPlus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  lastLogin: string;
}

const roles = [
  "Admin",
  "Project Manager",
  "Data Analyst",
  "Programmer",
  "Field Officer",
  "Validator",
  "Viewer",
];

const mockUsers: User[] = [
  {
    id: "U-001",
    name: "Dr. Siti Aminah",
    email: "siti.aminah@dinlutkan.kebumen.go.id",
    role: "Project Manager",
    lastLogin: "2025-11-08 09:15",
  },
  {
    id: "U-002",
    name: "Ahmad Fauzi",
    email: "ahmad.fauzi@dinlutkan.kebumen.go.id",
    role: "Field Officer",
    lastLogin: "2025-11-08 08:30",
  },
  {
    id: "U-003",
    name: "Budi Santoso",
    email: "budi.santoso@dinlutkan.kebumen.go.id",
    role: "Field Officer",
    lastLogin: "2025-11-07 14:20",
  },
  {
    id: "U-004",
    name: "Dewi Lestari",
    email: "dewi.lestari@dinlutkan.kebumen.go.id",
    role: "Data Analyst",
    lastLogin: "2025-11-08 10:45",
  },
  {
    id: "U-005",
    name: "Eko Prasetyo",
    email: "eko.prasetyo@dinlutkan.kebumen.go.id",
    role: "Programmer",
    lastLogin: "2025-11-08 07:00",
  },
  {
    id: "U-006",
    name: "Fitri Handayani",
    email: "fitri.handayani@dinlutkan.kebumen.go.id",
    role: "Validator",
    lastLogin: "2025-11-08 11:20",
  },
];

export function UserManagement() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Field Officer",
  });

  const handleAddUser = () => {
    setEditingUser(null);
    setFormData({ name: "", email: "", role: "Field Officer" });
    setIsDialogOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
    });
    setIsDialogOpen(true);
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus pengguna ini?")) {
      setUsers(users.filter((u) => u.id !== userId));
      toast.success("Pengguna berhasil dihapus");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingUser) {
      // Update existing user
      setUsers(
        users.map((u) =>
          u.id === editingUser.id
            ? {
                ...u,
                name: formData.name,
                email: formData.email,
                role: formData.role,
              }
            : u
        )
      );
      toast.success("Data pengguna berhasil diperbarui");
    } else {
      // Add new user
      const newUser: User = {
        id: `U-${String(users.length + 1).padStart(3, "0")}`,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        lastLogin: "-",
      };
      setUsers([...users, newUser]);
      toast.success("Pengguna baru berhasil ditambahkan");
    }

    setIsDialogOpen(false);
  };

  const getRoleBadgeVariant = (role: string) => {
    const variants: Record<
      string,
      "default" | "secondary" | "destructive" | "outline"
    > = {
      Admin: "destructive",
      "Project Manager": "default",
      "Data Analyst": "secondary",
      Programmer: "secondary",
      "Field Officer": "outline",
      Validator: "secondary",
      Viewer: "outline",
    };
    return variants[role] || "outline";
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-slate-900 mb-2">Manajemen Pengguna</h2>
          <p className="text-slate-600">Kelola pengguna dan hak akses sistem</p>
        </div>
        <Button
          onClick={handleAddUser}
          className="bg-cyan-600 hover:bg-cyan-700"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Tambah Pengguna
        </Button>
      </div>

      {/* User Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Pengguna</CardTitle>
          <CardDescription>{users.length} pengguna terdaftar</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Login Terakhir</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={getRoleBadgeVariant(user.role)}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-600">
                      {user.lastLogin}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditUser(user)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit User Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingUser ? "Edit Pengguna" : "Tambah Pengguna Baru"}
            </DialogTitle>
            <DialogDescription>
              {editingUser
                ? "Perbarui informasi pengguna dan role akses"
                : "Masukkan informasi pengguna baru dan tentukan role akses"}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Nama Lengkap <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Masukkan nama lengkap"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="nama@dinlutkan.kebumen.go.id"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">
                Role / Hak Akses <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.role}
                onValueChange={(value) =>
                  setFormData({ ...formData, role: value })
                }
              >
                <SelectTrigger id="role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-slate-500">
                Role menentukan tingkat akses pengguna ke sistem
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-cyan-600 hover:bg-cyan-700"
              >
                {editingUser ? "Simpan Perubahan" : "Tambah Pengguna"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="flex-1"
              >
                Batal
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
