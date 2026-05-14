//package com.edu.service;
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.edu.entity.ServiceEntity;
//import com.edu.repository.ServiceRepository;
//
//@Service
//public class ServiceServiceImpl implements ServiceService {
//	@Autowired
//	private ServiceRepository srepo;
//	@Override
//	public ServiceEntity saveService(ServiceEntity s) {
//		return srepo.save(s);
//	}
//	 @Override
//	public List<ServiceEntity> fetchAllServices() {
//		 return srepo.findAll();
//	    }
//	 @Override
//	 public ServiceEntity fetchServiceById(int serviceId) {
//	        return srepo.findById(serviceId).orElse(null);
//	    }
//	 @Override
//	  public ServiceEntity updateService(ServiceEntity s) {
//	        return srepo.save(s);
//	    }
//	 @Override
//	    public void deleteService(int serviceId) {
//	        srepo.deleteById(serviceId);
//	    }
//	 public List<ServiceEntity> fetchServicesByCid(int cid){
//		 return srepo.findByCid(cid);
//	 }
//	 @Override
//	 public List<ServiceEntity> getServices(String email) {
//		// TODO Auto-generated method stub
//		return null;
//	 }
//	 @Override
//	 public List<ServiceEntity> getServicesByCategory(int cid) {
//		// TODO Auto-generated method stub
//		return null;
//	 }
//	
//}
package com.edu.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edu.entity.ServiceEntity;
import com.edu.repository.ServiceRepository;

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

    // ❌ REMOVE THIS (not needed)
    public List<ServiceEntity> fetchServicesByCid(int cid){
        return srepo.findByCid(cid);
    }

    @Override
    public List<ServiceEntity> getServices(String email) {
        return null;
    }

    // ✅ 🔥 THIS IS THE MAIN FIX
    @Override
    public List<ServiceEntity> getServicesByCategory(int cid) {
        return srepo.findByCid(cid);
    }
}