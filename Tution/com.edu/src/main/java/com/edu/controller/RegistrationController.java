package com.edu.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.edu.entity.RegistrationEntity;
import com.edu.service.RegistrationService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@CrossOrigin(origins = "http://localhost:5173")   // ✅ ENABLE CORS
@RestController
public class RegistrationController {

    @Autowired
    private RegistrationService service;

    // ✅ REGISTER (SERVICE PROVIDER)
    @PostMapping("/addr")
    public RegistrationEntity add(@RequestBody RegistrationEntity r) {
        return service.saveRegistration(r);
    }

    // 🔥 ✅ LOGIN (ADD THIS METHOD)
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody RegistrationEntity req) {

        RegistrationEntity user = service.fetchRegistrationByemail(req.getEmail());

        if (user == null) {
            return new ResponseEntity<>("User Not Found", HttpStatus.NOT_FOUND);
        }

        if (!user.getPass().equals(req.getPass())) {
            return new ResponseEntity<>("Wrong Password", HttpStatus.UNAUTHORIZED);
        }

        return ResponseEntity.ok(user);
    }

    // ✅ FETCH ALL
    @GetMapping("/fetchr")
    public List<RegistrationEntity> fetchAll() {
        return service.fetchAllRegistration();
    }

    // ✅ FETCH BY EMAIL
    @GetMapping("/fetchr/{email}")
    public ResponseEntity<?> fetchById(@PathVariable String email) {
        RegistrationEntity r = service.fetchRegistrationByemail(email);
        if (r != null)
            return ResponseEntity.ok(r);
        else
            return new ResponseEntity<>("Data not Found", HttpStatus.NOT_FOUND);
    }

    // ✅ UPDATE
    @PutMapping("/updater")
    public ResponseEntity<?> update(@RequestBody RegistrationEntity r) {
        RegistrationEntity existing =
                service.fetchRegistrationByemail(r.getEmail());

        if (existing != null)
            return ResponseEntity.ok(service.updateRegistration(r));
        else
            return new ResponseEntity<>("Data not Found", HttpStatus.NOT_FOUND);
    }

    // ✅ DELETE
    @DeleteMapping("/deleter/{email}")
    public ResponseEntity<?> delete(@PathVariable String email) {
        RegistrationEntity r = service.fetchRegistrationByemail(email);
        if (r != null) {
            service.deleteRegistration(email);
            return ResponseEntity.ok("Deleted");
        } else
            return new ResponseEntity<>("Data not Found", HttpStatus.NOT_FOUND);
    }
}