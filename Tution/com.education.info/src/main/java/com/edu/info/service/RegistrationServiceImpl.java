package com.edu.info.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edu.info.entity.RegistrationEntity;

import com.edu.info.repository.RegistrationRepository;

@Service
public class RegistrationServiceImpl implements RegistrationService {

    @Autowired
    private RegistrationRepository rrepo;

    @Override
    public RegistrationEntity saveRegistration(RegistrationEntity re) {
        return rrepo.save(re);
    }

    @Override
    public List<RegistrationEntity> fetchAllRegistration() {
        return rrepo.findAll();
    }

    @Override
    public RegistrationEntity fetchRegistrationByemail(String email) {
        return rrepo.findById(email).orElse(null);
    }

    @Override
    public RegistrationEntity updateRegistration(RegistrationEntity re) {
        return rrepo.save(re);
    }

    @Override
    public void deleteRegistration(String email) {
        rrepo.deleteById(email);
    }

	

}




    
