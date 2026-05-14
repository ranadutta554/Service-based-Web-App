package com.edu.service;


import java.util.List;

import com.edu.entity.ServiceEntity;

public interface ServiceService {

	ServiceEntity saveService(ServiceEntity s);

	List<ServiceEntity> fetchAllServices();

	ServiceEntity updateService(ServiceEntity s);

	ServiceEntity fetchServiceById(int serviceId);

	void deleteService(int serviceId);

	List<ServiceEntity> getServices(String email);

	List<ServiceEntity> getServicesByCategory(int cid);

}