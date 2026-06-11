package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

/**
 * DTO para productos destacados en el home
 * Retorna: imagen, nombre, precio, descripción corta
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class HomeProductDTO {
    private Long id;
    private String name;
    private BigDecimal price;
    private String imageUrl;
    private String shortDescription;
    private String categoryLabel;
}