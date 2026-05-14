package com.edu.service;

import java.util.List;
import com.edu.entity.UserRegistrationEntity;

public interface UserRegistrationService {

    UserRegistrationEntity saveUser(UserRegistrationEntity user);

    List<UserRegistrationEntity> getAllUsers();

    UserRegistrationEntity getUserByEmail(String email);

    UserRegistrationEntity updateUser(UserRegistrationEntity user);

    void deleteUser(String email);
}