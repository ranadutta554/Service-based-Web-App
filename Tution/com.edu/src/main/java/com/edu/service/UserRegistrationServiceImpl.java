package com.edu.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edu.entity.UserRegistrationEntity;
import com.edu.repository.UserRegistrationRepository;

@Service
public class UserRegistrationServiceImpl implements UserRegistrationService {

    @Autowired
    private UserRegistrationRepository repo;

    @Override
    public UserRegistrationEntity saveUser(UserRegistrationEntity user) {
        return repo.save(user);
    }

    @Override
    public List<UserRegistrationEntity> getAllUsers() {
        return repo.findAll();
    }

    @Override
    public UserRegistrationEntity getUserByEmail(String email) {
        return repo.findByEmail(email);
    }

    @Override
    public UserRegistrationEntity updateUser(UserRegistrationEntity user) {
        return repo.save(user);
    }

    @Override
    public void deleteUser(String email) {
        repo.deleteById(email);
    }
}