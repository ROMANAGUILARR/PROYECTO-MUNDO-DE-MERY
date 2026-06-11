"use client";

import { useEffect, useState, useRef } from "react";
import {
  adminService,
  type AdminCategoryResponse,
  type AdminProductRequest,
  type AdminProductResponse,
} from "@/features/admin/services/admin-service";
import ProductModal from "./ProductModal";
import { FaFilePdf, FaPrint, FaFileExcel } from "react-icons/fa";
import { exportToExcel, exportToPDF, printTable } from "@/lib/exportUtils";

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<AdminProductResponse[]>([]);
  const [categories, setCategories] = useState<AdminCategoryResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] =
    useState<AdminProductResponse | null>(null);
  const tableRef = useRef<HTMLTableElement | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const [productsData, categoriesData] = await Promise.all([
        adminService.getProducts(),
        adminService.getCategories(),
      ]);

      setProducts(productsData);
      setCategories(categoriesData);
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Error al cargar los datos"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      return;
    }

    try {
      await adminService.deleteProduct(id);
      setProducts((currentProducts) =>
        currentProducts.filter((product) => product.id !== id)
      );
    } catch (err: unknown) {
      alert("Error al eliminar: " + getErrorMessage(err, "Error al eliminar"));
    }
  };

  const handleSave = async (data: AdminProductRequest, id?: number) => {
    if (id) {
      const updated = await adminService.updateProduct(id, data);
      setProducts((currentProducts) =>
        currentProducts.map((product) =>
          product.id === id ? updated : product
        )
      );
      return;
    }

    const created = await adminService.createProduct(data);
    setProducts((currentProducts) => [...currentProducts, created]);
  };

  const openNewModal = () => {
    setProductToEdit(null);
    setIsModalOpen(true);
  };

  const openEditModal = (product: AdminProductResponse) => {
    setProductToEdit(product);
    setIsModalOpen(true);
  };

  // Funciones de exportación usando utilitarios
  const handleExportExcel = () => {
    const data = products.map((p) => ({
      ID: p.id,
      Nombre: p.name,
      Precio: `S/ ${p.price}`,
      Stock: p.stock,
      Categoría: p.categoryName || "Sin categoría",
    }));
    exportToExcel(data, "productos.xlsx");
  };

  const handleExportPDF = () => {
    const columns = ["ID", "Nombre", "Precio", "Stock", "Categoría"];
    const data = products.map((p) => [
      p.id,
      p.name,
      `S/ ${p.price}`,
      p.stock,
      p.categoryName || "Sin categoría",
    ]);
    exportToPDF(columns, data, "Reporte de Productos", "productos.pdf");
  };

  const handlePrint = () => {
    if (tableRef.current) {
      printTable(tableRef.current.outerHTML, "Reporte de Productos");
    }
  };

  if (loading) {
    return <div className="text-slate-500">Cargando productos...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">
          Gestión de Productos
        </h1>

        <div className="flex gap-3 flex-wrap">
          <button
            onClick={handleExportExcel}
            className="flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors shadow-sm"
          >
            <FaFileExcel />
            Excel
          </button>
          <button
            onClick={handleExportPDF}
            className="flex items-center gap-2 px-3 py-1.5 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors shadow-sm"
          >
            <FaFilePdf />
            PDF
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-700 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors shadow-sm"
          >
            <FaPrint />
            Imprimir
          </button>
          <button
            onClick={openNewModal}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
          >
            + Nuevo Producto
          </button>
        </div>
      </div>

      <div ref={tableRef} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                Precio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                Stock
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-500">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 bg-white">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-slate-50">
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                  {product.id}
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-900">
                  {product.name}
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                  S/ {product.price}
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                  {product.stock}
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                  <button
                    onClick={() => openEditModal(product)}
                    className="mr-4 text-indigo-600 hover:text-indigo-900"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}

            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-slate-500">
                  No hay productos registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        productToEdit={productToEdit}
        categories={categories}
      />
    </div>
  );
}