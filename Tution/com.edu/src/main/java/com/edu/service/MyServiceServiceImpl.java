package com.edu.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edu.entity.MyService;
import com.edu.repository.MyServiceRepository;

@Service
public class MyServiceServiceImpl implements MyServiceService {

    @Autowired
    private MyServiceRepository repo;

    @Override
    public MyService addService(MyService s) {
        return repo.save(s);
    }

    @Override
    public List<MyService> getAllServices() {
        return repo.findAll();
    }

    @Override
    public List<MyService> getServicesByProvider(String email) {
        return repo.findByProviderEmail(email);
    }

    @Override
    public MyService getServiceById(int id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public MyService updateService(MyService s) {
        return repo.save(s);
    }

    @Override
    public void deleteService(int id) {
        repo.deleteById(id);
    }

    @Override
    public List<MyService> getByServiceType(String type) {
        return repo.findByServiceType(type);
    }

    @Override
    public List<MyService> getServicesByServiceId(int serviceId) {
        return repo.findByServiceId(serviceId);
    }
}