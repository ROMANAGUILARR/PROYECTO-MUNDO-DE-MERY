package com.example.backend.controllers;

import com.example.backend.dto.AdminProductResponse;
import com.example.backend.dto.ProductDetailResponse;
import com.example.backend.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping("/{id}")
    public ResponseEntity<ProductDetailResponse> getProduct(@PathVariable Long id) {
        ProductDetailResponse response = productService.getProductDetailsById(id);

        return ResponseEntity.ok(response);
    }

    // Obtener todos los productos activos (para la tienda)
    @GetMapping
    public ResponseEntity<List<AdminProductResponse>> getAllActiveProducts() {
        List<AdminProductResponse> products = productService.getAllAdminProducts();
        return ResponseEntity.ok(products);
    }
}
