package com.edu.info.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edu.info.entity.ServiceEntity;
import com.edu.info.repository.ServiceRepository;

@Service
public class ServiceServiceImpl implements ServiceService {
	@Autowired
	private ServiceRepository srepo;
	@Override
	public ServiceEntity saveService(ServiceEntity s) {
		return srepo.save(s);
	}
	 @Override
	public List<ServiceEntity> fetchAllServices() {
		 return srepo.findAll();
	    }
	 @Override
	 public ServiceEntity fetchServiceById(int serviceId) {
	        return srepo.findById(serviceId).orElse(null);
	    }
	 @Override
	  public ServiceEntity updateService(ServiceEntity s) {
	        return srepo.save(s);
	    }
	 @Override
	    public void deleteService(int serviceId) {
	        srepo.deleteById(serviceId);
	    }

	
}
