package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductRequest {
    private String name;
    private BigDecimal price;
    private Integer stock;
    private String imageUrl;
    private Boolean status;
    private Long categoryId;

    // Método para validar los campos obligatorios
    public boolean isValid() {
        return name != null && !name.trim().isEmpty() &&
               price != null && price.compareTo(BigDecimal.ZERO) > 0 &&
               stock != null && stock >= 0 &&
               imageUrl != null && !imageUrl.trim().isEmpty() &&
               categoryId != null && categoryId > 0;
    }

    // Método para obtener el mensaje de error correspondiente
    public String getValidationError() {
        if (name == null || name.trim().isEmpty()) {
            return "El nombre es obligatorio";
        }
        if (price == null || price.compareTo(BigDecimal.ZERO) <= 0) {
            return "El precio debe ser mayor a 0";
        }
        if (stock == null || stock < 0) {
            return "El stock no puede ser negativo";
        }
        if (imageUrl == null || imageUrl.trim().isEmpty()) {
            return "La URL de la imagen es obligatoria";
        }
        if (categoryId == null || categoryId <= 0) {
            return "Debe seleccionar una categoría válida";
        }
        return null;
    }
}
