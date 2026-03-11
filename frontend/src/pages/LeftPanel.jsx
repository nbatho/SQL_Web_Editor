import React from 'react';

const schemaText = `
Table: BoPhan
+--------------------+-----------------+
| Column Name        | Type            |
+--------------------+-----------------+
| MaBoPhan           | varchar(10)     |
| TenBoPhan          | nvarchar(100)   |
+--------------------+-----------------+

Table: CaLamViec
+--------------------+-----------------+
| Column Name        | Type            |
+--------------------+-----------------+
| MaCa               | varchar(10)     |
| TenCa              | nvarchar(50)    |
| GioBatDau          | time(7)         |
| GioKetThuc         | time(7)         |
+--------------------+-----------------+

Table: ChiTietPhieuThue
+--------------------+-----------------+
| Column Name        | Type            |
+--------------------+-----------------+
| MaPhieuThue        | varchar(10)     |
| SoPhong            | varchar(10)     |
| DonGiaThucTe       | decimal(18, 2)  |
| SoNguoiO           | int             |
+--------------------+-----------------+

Table: ChiTietVatTu
+--------------------+-----------------+
| Column Name        | Type            |
+--------------------+-----------------+
| SoPhong            | varchar(10)     |
| MaVatTu            | varchar(10)     |
| SoLuong            | int             |
+--------------------+-----------------+

Table: DanhGia
+--------------------+-----------------+
| Column Name        | Type            |
+--------------------+-----------------+
| MaDanhGia          | varchar(10)     |
| MaKH               | varchar(10)     |
| MaPhieuThue        | varchar(10)     |
| SoSao              | int             |
| NoiDung            | nvarchar(max)   |
+--------------------+-----------------+

Table: DatPhong
+--------------------+-----------------+
| Column Name        | Type            |
+--------------------+-----------------+
| MaDatPhong         | varchar(10)     |
| MaKH               | varchar(10)     |
| NgayDat            | datetime        |
| NgayDuKienDen      | date            |
| NgayDuKienDi       | date            |
| TienCoc            | decimal(18, 2)  |
| MaKM               | varchar(10)     |
| MaTrangThai        | varchar(10)     |
+--------------------+-----------------+

Table: DichVu
+--------------------+-----------------+
| Column Name        | Type            |
+--------------------+-----------------+
| MaDichVu           | varchar(10)     |
| TenDichVu          | nvarchar(100)   |
| DonGia             | decimal(18, 2)  |
| MoTa               | nvarchar(max)   |
| TrangThai          | nvarchar(50)    |
+--------------------+-----------------+

Table: HoaDon
+--------------------+-----------------+
| Column Name        | Type            |
+--------------------+-----------------+
| MaHoaDon           | varchar(10)     |
| MaPhieuThue        | varchar(10)     |
| NgayLap            | datetime        |
| TongTienPhong      | decimal(18, 2)  |
| TongTienDichVu     | decimal(18, 2)  |
| VAT                | float           |
| TongThanhToan      | decimal(18, 2)  |
| TrangThaiThanhToan | nvarchar(50)    |
+--------------------+-----------------+

Table: KhachHang
+--------------------+-----------------+
| Column Name        | Type            |
+--------------------+-----------------+
| MaKH               | varchar(10)     |
| HoTen              | nvarchar(100)   |
| SDT                | varchar(15)     |
| Email              | varchar(100)    |
| MaLoaiTV           | varchar(10)     |
+--------------------+-----------------+

Table: KhuyenMai
+--------------------+-----------------+
| Column Name        | Type            |
+--------------------+-----------------+
| MaKM               | varchar(10)     |
| TenKhuyenMai       | nvarchar(100)   |
| PhanTramGiam       | float           |
| NgayBatDau         | date            |
| NgayKetThuc        | date            |
| DieuKienApDung     | nvarchar(max)   |
+--------------------+-----------------+

Table: LoaiPhong
+--------------------+-----------------+
| Column Name        | Type            |
+--------------------+-----------------+
| MaLoai             | varchar(10)     |
| TenLoai            | nvarchar(100)   |
| DonGiaCoBan        | decimal(18, 2)  |
| SoNguoiToiDa       | int             |
| DienTich           | float           |
| MoTa               | nvarchar(max)   |
| TrangThaiHoatDong  | nvarchar(50)    |
+--------------------+-----------------+

Table: LoaiThanhVien
+--------------------+-----------------+
| Column Name        | Type            |
+--------------------+-----------------+
| MaLoaiTV           | varchar(10)     |
| TenLoai            | nvarchar(50)    |
| UuDai              | nvarchar(max)   |
+--------------------+-----------------+

Table: NhanVien
+--------------------+-----------------+
| Column Name        | Type            |
+--------------------+-----------------+
| MaNV               | varchar(10)     |
| HoTen              | nvarchar(100)   |
| ChucVu             | nvarchar(50)    |
| Luong              | decimal(18, 2)  |
| MaBoPhan           | varchar(10)     |
| MaCa               | varchar(10)     |
+--------------------+-----------------+

Table: PhieuThue
+--------------------+-----------------+
| Column Name        | Type            |
+--------------------+-----------------+
| MaPhieuThue        | varchar(10)     |
| MaDatPhong         | varchar(10)     |
| NgayCheckinThucTe  | datetime        |
| NgayCheckoutThucTe | datetime        |
| TrangThaiThue      | nvarchar(50)    |
+--------------------+-----------------+

Table: Phong
+--------------------+-----------------+
| Column Name        | Type            |
+--------------------+-----------------+
| SoPhong            | varchar(10)     |
| Tang               | int             |
| MaLoai             | varchar(10)     |
| MaTrangThaiPhong   | varchar(10)     |
+--------------------+-----------------+

Table: PhuongThucThanhToan
+--------------------+-----------------+
| Column Name        | Type            |
+--------------------+-----------------+
| MaPTTT             | varchar(10)     |
| TenPTTT            | nvarchar(50)    |
+--------------------+-----------------+

Table: SuDungDichVu
+--------------------+-----------------+
| Column Name        | Type            |
+--------------------+-----------------+
| MaSuDung           | varchar(10)     |
| MaPhieuThue        | varchar(10)     |
| SoPhong            | varchar(10)     |
| MaDichVu           | varchar(10)     |
| SoLuong            | int             |
| ThoiDiemSuDung     | datetime        |
| ThanhTien          | decimal(18, 2)  |
+--------------------+-----------------+

Table: ThanhToan
+--------------------+-----------------+
| Column Name        | Type            |
+--------------------+-----------------+
| MaThanhToan        | varchar(10)     |
| MaHoaDon           | varchar(10)     |
| MaPTTT             | varchar(10)     |
| SoTienThanhToan    | decimal(18, 2)  |
| NgayThanhToan      | datetime        |
+--------------------+-----------------+

Table: TrangThaiDatPhong
+--------------------+-----------------+
| Column Name        | Type            |
+--------------------+-----------------+
| MaTrangThaiDat     | varchar(10)     |
| TenTrangThai       | nvarchar(50)    |
+--------------------+-----------------+

Table: TrangThaiPhong
+--------------------+-----------------+
| Column Name        | Type            |
+--------------------+-----------------+
| MaTrangThaiPhong   | varchar(10)     |
| TenTrangThai       | nvarchar(50)    |
+--------------------+-----------------+

Table: VatTu
+--------------------+-----------------+
| Column Name        | Type            |
+--------------------+-----------------+
| MaVatTu            | varchar(10)     |
| TenVatTu           | nvarchar(100)   |
| LoaiVatTu          | nvarchar(50)    |
| GiaTriTaiSan       | decimal(18, 2)  |
+--------------------+-----------------+
`;

export default function LeftPanel() {
    return (
        <div className="flex flex-col h-full">
            <h2 className="mb-2 sm:mb-3 md:mb-4 text-base sm:text-lg md:text-xl font-bold">
                Database Schema
            </h2>
            
            <div className="flex-1 overflow-y-auto overflow-x-auto bg-[#1e1e1e] text-[#d4d4d4] rounded-md sm:rounded-lg p-2 sm:p-3 md:p-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <pre className="m-0 font-mono text-[11px] sm:text-xs md:text-[13px]">
                    <code>{schemaText.trim()}</code>
                </pre>
            </div>
        </div>
    );
}