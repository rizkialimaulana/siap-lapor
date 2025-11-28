import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  CheckCircle,
  Clock,
  FileText,
  Download,
  Plus,
} from "lucide-react";

interface MainDashboardProps {
  onNavigateToInput: () => void;
}

// Mock data for charts
const weeklyProductionData = [
  { week: "Minggu 1", produksi: 1250 },
  { week: "Minggu 2", produksi: 1580 },
  { week: "Minggu 3", produksi: 1420 },
  { week: "Minggu 4", produksi: 1890 },
  { week: "Minggu 5", produksi: 1650 },
  { week: "Minggu 6", produksi: 2100 },
  { week: "Minggu 7", produksi: 1920 },
  { week: "Minggu 8", produksi: 2250 },
];

const subDistrictProductionData = [
  { kecamatan: "Ayah", produksi: 4500 },
  { kecamatan: "Buayan", produksi: 3200 },
  { kecamatan: "Puring", produksi: 5800 },
  { kecamatan: "Petanahan", produksi: 6200 },
  { kecamatan: "Klirong", produksi: 2900 },
  { kecamatan: "Mirit", produksi: 3400 },
];

export function MainDashboard({ onNavigateToInput }: MainDashboardProps) {
  const handleExport = (format: "pdf" | "excel") => {
    // Mock export functionality
    alert(`Mengekspor laporan dalam format ${format.toUpperCase()}...`);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl text-slate-900 mb-2">
          Dashboard Laporan & Monitoring
        </h2>
        <p className="text-slate-600">
          Ringkasan data produksi perikanan Kabupaten Kebumen
        </p>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-cyan-600">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Total Produksi Tahunan</CardDescription>
              <TrendingUp className="w-5 h-5 text-cyan-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-slate-900 mb-1">142,580 Kg</div>
            <p className="text-sm text-emerald-600">+12.5% dari tahun lalu</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-600">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Data Tervalidasi</CardDescription>
              <CheckCircle className="w-5 h-5 text-emerald-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-slate-900 mb-1">1,248</div>
            <p className="text-sm text-slate-600">Record data terverifikasi</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Menunggu Validasi</CardDescription>
              <Clock className="w-5 h-5 text-amber-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-slate-900 mb-1">47</div>
            <p className="text-sm text-slate-600">Record perlu divalidasi</p>
          </CardContent>
        </Card>
      </div>

      {/* Action Panel */}
      <Card>
        <CardHeader>
          <CardTitle>Aksi Cepat</CardTitle>
          <CardDescription>Akses cepat ke fungsi utama sistem</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button
              onClick={onNavigateToInput}
              className="bg-cyan-600 hover:bg-cyan-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Input Data Lapangan
            </Button>
            <Button
              variant="outline"
              onClick={() => handleExport("pdf")}
              className="border-cyan-600 text-cyan-700 hover:bg-cyan-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Ekspor Laporan (PDF)
            </Button>
            <Button
              variant="outline"
              onClick={() => handleExport("excel")}
              className="border-emerald-600 text-emerald-700 hover:bg-emerald-50"
            >
              <FileText className="w-4 h-4 mr-2" />
              Ekspor Laporan (Excel)
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Data Visualization Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Production Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Tren Produksi Mingguan</CardTitle>
            <CardDescription>
              Data produksi 8 minggu terakhir (dalam Kg)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyProductionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="week"
                  tick={{ fill: "#64748b", fontSize: 12 }}
                />
                <YAxis tick={{ fill: "#64748b", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="produksi"
                  stroke="#0891b2"
                  strokeWidth={3}
                  name="Produksi (Kg)"
                  dot={{ fill: "#0891b2", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Production by Sub-district */}
        <Card>
          <CardHeader>
            <CardTitle>Produksi per Kecamatan</CardTitle>
            <CardDescription>
              Total produksi berdasarkan wilayah (dalam Kg)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={subDistrictProductionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="kecamatan"
                  tick={{ fill: "#64748b", fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis tick={{ fill: "#64748b", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="produksi"
                  fill="#14b8a6"
                  name="Produksi (Kg)"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
