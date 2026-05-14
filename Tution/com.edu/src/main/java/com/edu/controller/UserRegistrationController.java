package com.edu.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.edu.entity.UserRegistrationEntity;
import com.edu.service.UserRegistrationService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/user")
public class UserRegistrationController {

    @Autowired
    private UserRegistrationService service;

    // ✅ REGISTER USER
    @PostMapping("/register")
    public UserRegistrationEntity register(@RequestBody UserRegistrationEntity user) {
        return service.saveUser(user);
    }

    // ✅ LOGIN USER
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserRegistrationEntity req) {

        UserRegistrationEntity user = service.getUserByEmail(req.getEmail());

        if (user == null) {
            return ResponseEntity.status(404).body("User Not Found");
        }

        if (!user.getPass().equals(req.getPass())) {
            return ResponseEntity.status(401).body("Wrong Password");
        }

        return ResponseEntity.ok(user);
    }

    // ✅ GET ALL USERS
    @GetMapping("/all")
    public List<UserRegistrationEntity> getAll() {
        return service.getAllUsers();
    }

    // ✅ DELETE USER
    @DeleteMapping("/{email}")
    public void delete(@PathVariable String email) {
        service.deleteUser(email);
    }
}