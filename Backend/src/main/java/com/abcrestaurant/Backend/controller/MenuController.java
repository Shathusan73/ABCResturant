package com.abcrestaurant.Backend.controller;

import com.abcrestaurant.Backend.entity.Menu;
import com.abcrestaurant.Backend.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/menus")
@CrossOrigin(origins = "http://localhost:3000")
public class MenuController {

    @Autowired
    private MenuService menuService;

    @GetMapping
    public ResponseEntity<List<Menu>> getAllMenus() {
        List<Menu> menus = menuService.getAllMenus();
        return ResponseEntity.ok(menus);
    }

    @PostMapping
    public ResponseEntity<Menu> createMenu(
            @RequestParam("name") String name,
            @RequestParam("price") Double price,
            @RequestParam("description") String description,
            @RequestParam("ingredients") List<String> ingredients,
            @RequestParam("categoryId") Long categoryId,
            @RequestParam("image") MultipartFile image) {

        try {
            String imagePath = menuService.saveImage(image);
            Menu menu = menuService.createMenu(name, price, description, ingredients, categoryId, imagePath);
            return ResponseEntity.ok(menu);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Menu> updateMenu(
            @PathVariable Long id,
            @RequestParam("name") String name,
            @RequestParam("price") Double price,
            @RequestParam("description") String description,
            @RequestParam("ingredients") List<String> ingredients,
            @RequestParam(value = "categoryId", required = false) Long categoryId,
            @RequestParam(value = "image", required = false) MultipartFile image) {

        try {
            String imagePath = null;
            if (image != null) {
                imagePath = menuService.saveImage(image);
            }
            Menu menu = menuService.updateMenu(id, name, price, description, ingredients, categoryId, imagePath);
            return ResponseEntity.ok(menu);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMenu(@PathVariable Long id) {
        menuService.deleteMenu(id);
        return ResponseEntity.noContent().build();
    }
}
