package com.edu.info.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.edu.info.entity.RegistrationEntity;
import com.edu.info.service.RegistrationService;

@RestController
public class RegistrationController {

    @Autowired
    private RegistrationService service;

    @PostMapping("/addr")
    public RegistrationEntity add(@RequestBody RegistrationEntity r) {
        return service.saveRegistration(r);
    }

    @GetMapping("/fetchr")
    public List<RegistrationEntity> fetchAll() {
        return service.fetchAllRegistration();
    }

    @GetMapping("/fetchr/{regNo}")
    public ResponseEntity<?> fetchById(@PathVariable String email) {
        RegistrationEntity r = service.fetchRegistrationByemail(email);
        if (r != null)
            return ResponseEntity.ok(r);
        else
            return new ResponseEntity<>("Data not Found", HttpStatus.NOT_FOUND);
    }

    @PutMapping("/updater")
    public ResponseEntity<?> update(@RequestBody RegistrationEntity r) {
        RegistrationEntity existing =
                service.fetchRegistrationByemail(r.getEmail());

        if (existing != null)
            return ResponseEntity.ok(service.updateRegistration(r));
        else
            return new ResponseEntity<>("Data not Found", HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/deleter/{regNo}")
    public ResponseEntity<?> delete(@PathVariable String email) {
        RegistrationEntity r = service.fetchRegistrationByemail(email);
        if (r != null) {
            service.deleteRegistration(email);
            return ResponseEntity.ok("Deleted");
        } else
            return new ResponseEntity<>("Data not Found", HttpStatus.NOT_FOUND);
    }
}
