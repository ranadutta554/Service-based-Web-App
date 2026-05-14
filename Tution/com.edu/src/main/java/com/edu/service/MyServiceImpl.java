package com.edu.service;

import java.util.List;

import com.edu.entity.ServiceEntity;

public interface MyServiceImpl {
	  List<ServiceEntity> findByProviderEmail(String providerEmail);
}
