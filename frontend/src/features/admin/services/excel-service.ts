const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export const exportToExcel = async (type: 'personas' | 'products' | 'users') => {
  try {
    const response = await fetch(`${API_BASE_URL}/excel/${type}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Error al exportar ${type}`);
    }

    const blob = await response.blob();
    

    const contentDisposition = response.headers.get('content-disposition');
    let filename = `${type}_export.xlsx`;
    if (contentDisposition && contentDisposition.indexOf('filename=') !== -1) {
      filename = contentDisposition.split('filename=')[1].replace(/['"]/g, '');
    }

    const url = window.URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    
    a.remove();
    window.URL.revokeObjectURL(url);
    
  } catch (error) {
    console.error("Error en la descarga de Excel:", error);
    throw error;
  }
};
