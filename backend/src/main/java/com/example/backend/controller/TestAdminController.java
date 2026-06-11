package com.example.backend.controller;

import com.example.backend.models.Persona;
import com.example.backend.models.Role;
import com.example.backend.models.User;
import com.example.backend.repositories.PersonaRepository;
import com.example.backend.repositories.RoleRepository;
import com.example.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 * Componente que crea el usuario administrador al iniciar la aplicacion.
 * Se ejecuta automaticamente solo si no existe ningun usuario con rol ADMIN.
 */
@Component
@RequiredArgsConstructor
public class TestAdminController implements CommandLineRunner {

    private static final String ADMIN_EMAIL = "admin@ceramica.com";
    private static final String ADMIN_PASSWORD = "admin123";
    private static final String ADMIN_DNI = "00000001";

    private final UserRepository userRepository;
    private final PersonaRepository personaRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        System.out.println("========================================");
        System.out.println("INICIANDO VERIFICACIÓN DE USUARIO ADMIN");
        System.out.println("========================================");
        crearAdmin();
    }

    @Transactional
    private void crearAdmin() {
        try {
            System.out.println("Paso 1: Buscando/creando rol ADMIN...");
            
            // 1. Obtener o crear rol ADMIN
            Role adminRole = roleRepository.findByName("ADMIN")
                    .orElseGet(() -> {
                        System.out.println("   - Creando rol ADMIN en base de datos...");
                        Role nuevoRol = new Role();
                        nuevoRol.setName("ADMIN");
                        return roleRepository.save(nuevoRol);
                    });
            System.out.println("   ✅ Rol ADMIN listo (id: " + adminRole.getId() + ")");

            System.out.println("Paso 2: Buscando/creando persona del admin...");
            
            // 2. Buscar o crear persona del admin
            Persona adminPersona = personaRepository.findByDni(ADMIN_DNI)
                    .orElseGet(() -> {
                        System.out.println("   - Creando nueva persona para el admin...");
                        Persona persona = new Persona();
                        persona.setName("Administrador del Sistema");
                        persona.setFirstName("Administrador");
                        persona.setLastName("Sistema");
                        persona.setMotherLastName("");
                        persona.setDni(ADMIN_DNI);
                        persona.setBirthDate("2000-01-01");
                        return personaRepository.save(persona);
                    });
            System.out.println("   ✅ Persona lista (id: " + adminPersona.getId() + ")");

            System.out.println("Paso 3: Verificando si el usuario admin ya existe...");
            
            // 3. Verificar si el usuario ya existe
            if (userRepository.findByEmail(ADMIN_EMAIL).isPresent()) {
                System.out.println("   ⚠️ El usuario admin YA EXISTE con email: " + ADMIN_EMAIL);
                return;
            }
            System.out.println("   - Usuario no existe, procediendo a crear...");

            System.out.println("Paso 4: Creando usuario administrador...");
            
            // 4. Crear usuario admin USANDO REFERENCIA POR ID (evita detached entity)
            User adminUser = new User();
            adminUser.setEmail(ADMIN_EMAIL);
            adminUser.setPassword(passwordEncoder.encode(ADMIN_PASSWORD));
            adminUser.setAuthProvider("LOCAL");
            adminUser.setRole(adminRole);
            
            // IMPORTANTE: Usar la misma instancia administrada por el persistence context
            adminUser.setPersona(adminPersona);
            
            userRepository.save(adminUser);
            
            System.out.println("   ✅ Usuario administrador CREADO EXITOSAMENTE!");
            
            System.out.println("========================================");
            System.out.println("✅ ADMINISTRADOR CREADO CORRECTAMENTE!");
            System.out.println("========================================");
            System.out.println("   Email: " + ADMIN_EMAIL);
            System.out.println("   Contrasena: " + ADMIN_PASSWORD);
            System.out.println("   Rol: ADMIN");
            System.out.println("========================================");
            System.out.println("Ahora puedes iniciar sesion en el frontend.");
            System.out.println("========================================");
            
        } catch (Exception e) {
            System.out.println("❌ ERROR al crear administrador: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }
} 