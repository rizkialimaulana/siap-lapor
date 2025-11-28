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
import { Alert, AlertDescription } from "../ui/alert";
import { CheckCircle, AlertCircle, Save } from "lucide-react";
import { toast } from "sonner";

const subDistricts = [
  "Ayah",
  "Buayan",
  "Puring",
  "Petanahan",
  "Klirong",
  "Mirit",
  "Prembun",
  "Kutowinangun",
  "Alian",
  "Rowokele",
];

const villagesBySubDistrict: Record<string, string[]> = {
  Ayah: ["Ayah", "Baseh", "Gombong", "Karangbolong", "Karangduwur"],
  Buayan: ["Buayan", "Kalibalik", "Sidoharjo", "Watulawang"],
  Puring: ["Puring", "Kalibening", "Karanggayam", "Tanjungsari"],
  Petanahan: ["Petanahan", "Bener", "Jladri", "Sidomulyo"],
  Klirong: ["Klirong", "Soko", "Tanggeran", "Wadasmalang"],
  Mirit: ["Mirit", "Boto", "Jati", "Sidowarno"],
  Prembun: ["Prembun", "Karangsari", "Sumberejo"],
  Kutowinangun: ["Kutowinangun", "Karangsambung", "Wadas"],
  Alian: ["Alian", "Pujotirto", "Rowokele"],
  Rowokele: ["Rowokele", "Karanggayam", "Pandansari"],
};

const commodityTypes = [
  "Ikan Bandeng",
  "Ikan Nila",
  "Ikan Lele",
  "Ikan Gurame",
  "Ikan Tongkol",
  "Ikan Cakalang",
  "Udang Windu",
  "Udang Vaname",
  "Cumi-cumi",
  "Rajungan",
];

const unitTypes = ["Kg", "Ton", "Ekor", "Keranjang"];

export function FieldDataInputForm() {
  const [formData, setFormData] = useState({
    kecamatan: "",
    desa: "",
    tanggal: "",
    komoditas: "",
    kuantitas: "",
    satuan: "Kg",
    petugas: "Ahmad Fauzi",
    catatan: "",
  });

  const [validationStatus, setValidationStatus] = useState<
    "idle" | "valid" | "invalid"
  >("idle");
  const [availableVillages, setAvailableVillages] = useState<string[]>([]);

  const handleSubDistrictChange = (value: string) => {
    setFormData({ ...formData, kecamatan: value, desa: "" });
    setAvailableVillages(villagesBySubDistrict[value] || []);
    validateForm({ ...formData, kecamatan: value, desa: "" });
  };

  const handleInputChange = (field: string, value: string) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);
    validateForm(newFormData);
  };

  const validateForm = (data: typeof formData) => {
    const isValid =
      data.kecamatan !== "" &&
      data.desa !== "" &&
      data.tanggal !== "" &&
      data.komoditas !== "" &&
      data.kuantitas !== "" &&
      parseFloat(data.kuantitas) > 0;

    setValidationStatus(isValid ? "valid" : "invalid");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validationStatus === "valid") {
      toast.success("Data berhasil disimpan!", {
        description: "Data lapangan telah tersimpan dan menunggu validasi.",
      });

      // Reset form
      setFormData({
        kecamatan: "",
        desa: "",
        tanggal: "",
        komoditas: "",
        kuantitas: "",
        satuan: "Kg",
        petugas: "Ahmad Fauzi",
        catatan: "",
      });
      setValidationStatus("idle");
      setAvailableVillages([]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl text-slate-900 mb-2">Input Data Lapangan</h2>
        <p className="text-slate-600">
          Form pendataan produksi perikanan untuk petugas lapangan
        </p>
      </div>

      {/* Validation Status Alert */}
      {validationStatus !== "idle" && (
        <Alert
          className={
            validationStatus === "valid"
              ? "border-emerald-500 bg-emerald-50"
              : "border-amber-500 bg-amber-50"
          }
        >
          {validationStatus === "valid" ? (
            <CheckCircle className="h-4 w-4 text-emerald-600" />
          ) : (
            <AlertCircle className="h-4 w-4 text-amber-600" />
          )}
          <AlertDescription
            className={
              validationStatus === "valid"
                ? "text-emerald-800"
                : "text-amber-800"
            }
          >
            {validationStatus === "valid"
              ? "Validasi berhasil. Formulir siap untuk dikirim."
              : "Mohon lengkapi semua field yang wajib diisi."}
          </AlertDescription>
        </Alert>
      )}

      {/* Main Form */}
      <Card>
        <CardHeader>
          <CardTitle>Formulir Data Produksi</CardTitle>
          <CardDescription>
            Isi semua informasi dengan lengkap dan akurat
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Location Section */}
            <div className="space-y-4">
              <h3 className="text-slate-900 pb-2 border-b border-slate-200">
                Informasi Lokasi
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="kecamatan">
                    Kecamatan <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.kecamatan}
                    onValueChange={handleSubDistrictChange}
                  >
                    <SelectTrigger id="kecamatan" className="w-full">
                      <SelectValue placeholder="Pilih Kecamatan" />
                    </SelectTrigger>
                    <SelectContent>
                      {subDistricts.map((district) => (
                        <SelectItem key={district} value={district}>
                          {district}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="desa">
                    Desa <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.desa}
                    onValueChange={(value) => handleInputChange("desa", value)}
                    disabled={!formData.kecamatan}
                  >
                    <SelectTrigger id="desa" className="w-full">
                      <SelectValue placeholder="Pilih Desa" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableVillages.map((village) => (
                        <SelectItem key={village} value={village}>
                          {village}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Production Data Section */}
            <div className="space-y-4">
              <h3 className="text-slate-900 pb-2 border-b border-slate-200">
                Data Produksi
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tanggal">
                    Tanggal Produksi <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="tanggal"
                    type="date"
                    value={formData.tanggal}
                    onChange={(e) =>
                      handleInputChange("tanggal", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="komoditas">
                    Jenis Komoditas <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.komoditas}
                    onValueChange={(value) =>
                      handleInputChange("komoditas", value)
                    }
                  >
                    <SelectTrigger id="komoditas" className="w-full">
                      <SelectValue placeholder="Pilih Komoditas" />
                    </SelectTrigger>
                    <SelectContent>
                      {commodityTypes.map((commodity) => (
                        <SelectItem key={commodity} value={commodity}>
                          {commodity}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="kuantitas">
                    Kuantitas Produksi <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="kuantitas"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="Masukkan jumlah produksi"
                    value={formData.kuantitas}
                    onChange={(e) =>
                      handleInputChange("kuantitas", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="satuan">
                    Satuan <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.satuan}
                    onValueChange={(value) =>
                      handleInputChange("satuan", value)
                    }
                  >
                    <SelectTrigger id="satuan">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {unitTypes.map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {unit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Metadata Section */}
            <div className="space-y-4">
              <h3 className="text-slate-900 pb-2 border-b border-slate-200">
                Metadata
              </h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="petugas">Nama Petugas Lapangan</Label>
                  <Input
                    id="petugas"
                    value={formData.petugas}
                    disabled
                    className="bg-slate-100"
                  />
                  <p className="text-sm text-slate-500">
                    Terisi otomatis berdasarkan akun yang login
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="catatan">Catatan / Observasi</Label>
                  <Textarea
                    id="catatan"
                    placeholder="Tambahkan catatan atau observasi lapangan..."
                    rows={4}
                    value={formData.catatan}
                    onChange={(e) =>
                      handleInputChange("catatan", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-slate-200">
              <Button
                type="submit"
                className="bg-cyan-600 hover:bg-cyan-700 w-full md:w-auto"
                disabled={validationStatus !== "valid"}
              >
                <Save className="w-4 h-4 mr-2" />
                Simpan Data
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
