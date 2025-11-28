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
import { Textarea } from "../ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { CheckCircle, XCircle, Eye, Filter } from "lucide-react";
import { toast } from "sonner";

interface FieldData {
  id: string;
  tanggal: string;
  kecamatan: string;
  desa: string;
  komoditas: string;
  kuantitas: number;
  satuan: string;
  petugas: string;
  status: "pending" | "draft";
}

const mockFieldData: FieldData[] = [
  {
    id: "FD-001",
    tanggal: "2025-11-05",
    kecamatan: "Petanahan",
    desa: "Jladri",
    komoditas: "Ikan Bandeng",
    kuantitas: 450,
    satuan: "Kg",
    petugas: "Ahmad Fauzi",
    status: "pending",
  },
  {
    id: "FD-002",
    tanggal: "2025-11-06",
    kecamatan: "Ayah",
    desa: "Karangbolong",
    komoditas: "Udang Vaname",
    kuantitas: 280,
    satuan: "Kg",
    petugas: "Budi Santoso",
    status: "pending",
  },
  {
    id: "FD-003",
    tanggal: "2025-11-06",
    kecamatan: "Puring",
    desa: "Tanjungsari",
    komoditas: "Ikan Nila",
    kuantitas: 320,
    satuan: "Kg",
    petugas: "Ahmad Fauzi",
    status: "draft",
  },
  {
    id: "FD-004",
    tanggal: "2025-11-07",
    kecamatan: "Buayan",
    desa: "Sidoharjo",
    komoditas: "Ikan Lele",
    kuantitas: 520,
    satuan: "Kg",
    petugas: "Dewi Lestari",
    status: "pending",
  },
  {
    id: "FD-005",
    tanggal: "2025-11-07",
    kecamatan: "Mirit",
    desa: "Jati",
    komoditas: "Ikan Gurame",
    kuantitas: 180,
    satuan: "Kg",
    petugas: "Ahmad Fauzi",
    status: "pending",
  },
];

export function ValidationModule() {
  const [data, setData] = useState<FieldData[]>(mockFieldData);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [filterOfficer, setFilterOfficer] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDateFrom, setFilterDateFrom] = useState("");
  const [filterDateTo, setFilterDateTo] = useState("");
  const [reviewData, setReviewData] = useState<FieldData | null>(null);
  const [verificationNotes, setVerificationNotes] = useState("");
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const officers = Array.from(new Set(mockFieldData.map((d) => d.petugas)));

  const filteredData = data.filter((item) => {
    if (filterOfficer !== "all" && item.petugas !== filterOfficer) return false;
    if (filterStatus !== "all" && item.status !== filterStatus) return false;
    if (filterDateFrom && item.tanggal < filterDateFrom) return false;
    if (filterDateTo && item.tanggal > filterDateTo) return false;
    return true;
  });

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredData.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredData.map((d) => d.id));
    }
  };

  const handleReview = (item: FieldData) => {
    setReviewData(item);
    setVerificationNotes("");
    setIsReviewOpen(true);
  };

  const handleApprove = (id?: string) => {
    const idsToApprove = id ? [id] : selectedIds;
    if (idsToApprove.length === 0) return;

    setData(data.filter((item) => !idsToApprove.includes(item.id)));
    setSelectedIds([]);
    setIsReviewOpen(false);

    toast.success("Data disetujui", {
      description: `${idsToApprove.length} record telah divalidasi dan disetujui.`,
    });
  };

  const handleReject = (id?: string) => {
    const idsToReject = id ? [id] : selectedIds;
    if (idsToReject.length === 0) return;

    setData(data.filter((item) => !idsToReject.includes(item.id)));
    setSelectedIds([]);
    setIsReviewOpen(false);

    toast.error("Data ditolak", {
      description: `${idsToReject.length} record telah ditolak.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl text-slate-900 mb-2">
          Validasi & Verifikasi Data
        </h2>
        <p className="text-slate-600">
          Tinjau dan validasi data lapangan yang telah diinput
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-cyan-600" />
            <CardTitle>Filter Data</CardTitle>
          </div>
          <CardDescription>
            Saring data berdasarkan kriteria tertentu
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Petugas</Label>
              <Select value={filterOfficer} onValueChange={setFilterOfficer}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Petugas</SelectItem>
                  {officers.map((officer) => (
                    <SelectItem key={officer} value={officer}>
                      {officer}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Tanggal Dari</Label>
              <Input
                type="date"
                value={filterDateFrom}
                onChange={(e) => setFilterDateFrom(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Tanggal Sampai</Label>
              <Input
                type="date"
                value={filterDateTo}
                onChange={(e) => setFilterDateTo(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Data Belum Terverifikasi</CardTitle>
              <CardDescription>
                {filteredData.length} record menunggu validasi
              </CardDescription>
            </div>
            {selectedIds.length > 0 && (
              <div className="flex gap-2">
                <Button
                  onClick={() => handleApprove()}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Setujui ({selectedIds.length})
                </Button>
                <Button onClick={() => handleReject()} variant="destructive">
                  <XCircle className="w-4 h-4 mr-2" />
                  Tolak ({selectedIds.length})
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={
                        selectedIds.length === filteredData.length &&
                        filteredData.length > 0
                      }
                      onCheckedChange={toggleSelectAll}
                    />
                  </TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Lokasi</TableHead>
                  <TableHead>Komoditas</TableHead>
                  <TableHead>Kuantitas</TableHead>
                  <TableHead>Petugas</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedIds.includes(item.id)}
                        onCheckedChange={() => toggleSelection(item.id)}
                      />
                    </TableCell>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>
                      {new Date(item.tanggal).toLocaleDateString("id-ID")}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div>{item.kecamatan}</div>
                        <div className="text-sm text-slate-500">
                          {item.desa}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{item.komoditas}</TableCell>
                    <TableCell>
                      {item.kuantitas} {item.satuan}
                    </TableCell>
                    <TableCell>{item.petugas}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          item.status === "pending" ? "default" : "secondary"
                        }
                      >
                        {item.status === "pending" ? "Pending" : "Draft"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleReview(item)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Review
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

      {/* Review Detail Sheet */}
      <Sheet open={isReviewOpen} onOpenChange={setIsReviewOpen}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Review Detail Data</SheetTitle>
            <SheetDescription>
              Tinjau data lapangan dan berikan verifikasi
            </SheetDescription>
          </SheetHeader>

          {reviewData && (
            <div className="mt-6 space-y-6 mx-6">
              {/* Data Review */}
              <div className="space-y-4">
                <h4 className="text-slate-900 pb-2 border-b">Informasi Data</h4>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-500">ID Record</p>
                    <p className="text-slate-900">{reviewData.id}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Tanggal</p>
                    <p className="text-slate-900">
                      {new Date(reviewData.tanggal).toLocaleDateString("id-ID")}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-500">Kecamatan</p>
                    <p className="text-slate-900">{reviewData.kecamatan}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Desa</p>
                    <p className="text-slate-900">{reviewData.desa}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Komoditas</p>
                    <p className="text-slate-900">{reviewData.komoditas}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Kuantitas</p>
                    <p className="text-slate-900">
                      {reviewData.kuantitas} {reviewData.satuan}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-500">Petugas</p>
                    <p className="text-slate-900">{reviewData.petugas}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Status</p>
                    <Badge
                      variant={
                        reviewData.status === "pending"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {reviewData.status === "pending" ? "Pending" : "Draft"}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Verification Notes */}
              <div className="space-y-2">
                <Label htmlFor="verification-notes">Catatan Verifikasi</Label>
                <Textarea
                  id="verification-notes"
                  placeholder="Tambahkan catatan verifikasi (opsional)..."
                  rows={4}
                  value={verificationNotes}
                  onChange={(e) => setVerificationNotes(e.target.value)}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <Button
                  onClick={() => handleApprove(reviewData.id)}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Setujui
                </Button>
                <Button
                  onClick={() => handleReject(reviewData.id)}
                  variant="destructive"
                  className="flex-1"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Tolak
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
