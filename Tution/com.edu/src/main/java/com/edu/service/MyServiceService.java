package com.edu.service;

import java.util.List;
import com.edu.entity.MyService;

public interface MyServiceService {

    MyService addService(MyService s);

    List<MyService> getAllServices();

    List<MyService> getServicesByProvider(String email);

    MyService getServiceById(int id);

    MyService updateService(MyService s);

    void deleteService(int id);

    List<MyService> getByServiceType(String type);

    List<MyService> getServicesByServiceId(int serviceId);
}