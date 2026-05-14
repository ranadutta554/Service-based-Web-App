package com.edu.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.edu.entity.MyService;

public interface MyServiceRepository extends JpaRepository<MyService, Integer> {

    List<MyService> findByServiceId(int serviceId);

    List<MyService> findByProviderEmail(String providerEmail);

    List<MyService> findByServiceType(String serviceType);
}