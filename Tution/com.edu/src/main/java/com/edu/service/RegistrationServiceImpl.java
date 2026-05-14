package com.edu.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edu.entity.RegistrationEntity;
import com.edu.repository.RegistrationRepository;

@Service
public class RegistrationServiceImpl implements RegistrationService {

    @Autowired
    private RegistrationRepository repo;

    @Override
    public RegistrationEntity saveRegistration(RegistrationEntity re) {
        return repo.save(re);
    }

    @Override
    public List<RegistrationEntity> fetchAllRegistration() {
        return repo.findAll();
    }

    @Override
    public RegistrationEntity updateRegistration(RegistrationEntity re) {
        return repo.save(re);
    }

    @Override
    public void deleteRegistration(String email) {
        repo.deleteById(email);
    }

    @Override
    public RegistrationEntity fetchRegistrationByemail(String email) {
        return repo.findById(email).orElse(null);
    }
}