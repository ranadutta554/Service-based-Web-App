package com.edu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.edu.entity.UserRegistrationEntity;
import com.edu.service.UserRegistrationService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/profile")
public class UserProfileController {

    @Autowired
    private UserRegistrationService service;

    // ✅ GET PROFILE
    @GetMapping("/{email}")
    public ResponseEntity<?> getProfile(@PathVariable String email) {

        UserRegistrationEntity user = service.getUserByEmail(email);

        if (user == null) {
            return ResponseEntity.status(404).body("User not found ❌");
        }

        return ResponseEntity.ok(user);
    }

    // ✅ UPDATE PROFILE (SAFE)
    @PutMapping("/update")
    public ResponseEntity<?> updateProfile(@RequestBody UserRegistrationEntity user) {

        UserRegistrationEntity existing = service.getUserByEmail(user.getEmail());

        if (existing == null) {
            return ResponseEntity.status(404).body("User not found ❌");
        }

        // ✅ ONLY ALLOW SAFE FIELDS
        existing.setName(user.getName());
        existing.setContactno(user.getContactno());

        UserRegistrationEntity updated = service.saveUser(existing);

        return ResponseEntity.ok(updated);
    }

    // ✅ CHANGE PASSWORD (SEPARATE API)
    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(
            @RequestParam String email,
            @RequestParam String oldPass,
            @RequestParam String newPass) {

        UserRegistrationEntity user = service.getUserByEmail(email);

        if (user == null) {
            return ResponseEntity.status(404).body("User not found ❌");
        }

        if (!user.getPass().equals(oldPass)) {
            return ResponseEntity.status(401).body("Wrong old password ❌");
        }

        user.setPass(newPass);
        service.saveUser(user);

        return ResponseEntity.ok("Password updated successfully ✅");
    }
}