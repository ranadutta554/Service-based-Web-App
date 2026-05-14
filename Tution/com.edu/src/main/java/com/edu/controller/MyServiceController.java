package com.edu.controller;

import java.io.File;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.edu.entity.MyService;
import com.edu.service.MyServiceService;

@RestController
@RequestMapping("/myservice")
@CrossOrigin(origins = "http://localhost:5173")
public class MyServiceController {

    @Autowired
    private MyServiceService service;

    // ✅ ADD SERVICE (🔥 FINAL FIXED)
    @PostMapping(value = "/add", consumes = "multipart/form-data")
    public MyService addService(

            @RequestParam("image") MultipartFile file,
            @RequestParam("serviceId") int serviceId,
            @RequestParam("serviceName") String serviceName,
            @RequestParam("description") String description,
            @RequestParam("location") String location,
            @RequestParam("workingTime") String workingTime,
            @RequestParam("workingDays") String workingDays,
            @RequestParam("charge") int charge,
            @RequestParam("status") String status,
            @RequestParam("serviceType") String serviceType,
            @RequestParam(value = "meetingLink", required = false) String meetingLink,

            // 🔥 GET FROM HEADER (NOT FORM DATA)
            @RequestHeader("X-User-Email") String providerEmail,
            @RequestHeader("X-User-Name") String providerName
    ) {
        try {

            String uploadDir = System.getProperty("user.dir") + File.separator + "uploads" + File.separator + "images" + File.separator;

            File dir = new File(uploadDir);

            if (!dir.exists()) {
                dir.mkdirs();
            }

            if (file == null || file.isEmpty()) {
                throw new RuntimeException("Image file is empty");
            }

            String fileName = System.currentTimeMillis() + "_" +
                    file.getOriginalFilename().replace(" ", "_");

            File dest = new File(uploadDir + fileName);

            file.transferTo(dest);

            MyService s = new MyService();

            s.setServiceId(serviceId);
            s.setServiceName(serviceName);
            s.setDescription(description);
            s.setLocation(location);
            s.setWorkingTime(workingTime);
            s.setWorkingDays(workingDays);
            s.setCharge(charge);
            s.setStatus(status);

            // 🔥 ALWAYS CORRECT NOW
            s.setProviderEmail(providerEmail);
            s.setProviderName(providerName);

            s.setServiceType(serviceType);
            s.setMeetinglink(meetingLink);
            s.setImagePath(fileName);

            return service.addService(s);

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error while adding service: " + e.getMessage());
        }
    }

    // ✅ GET BY SERVICE ID
//    @GetMapping("/service/{serviceId}")
//    public List<MyService> getByServiceId(@PathVariable int serviceId) {
//        return service.getByServiceId(serviceId);
//    }
    @GetMapping("/service/{serviceId}")
    public List<MyService> getByServiceId(@PathVariable int serviceId) {
        return service.getServicesByServiceId(serviceId);
    }
    
    // ✅ GET ALL
    @GetMapping("/all")
    public List<MyService> getAllServices() {
        return service.getAllServices();
    }

    // ✅ GET SINGLE
    @GetMapping("/get/{id}")
    public MyService getServiceById(@PathVariable int id) {
        return service.getServiceById(id);
    }

    // ✅ CATEGORY FILTER
    @GetMapping("/category/{type}")
    public List<MyService> getByCategory(@PathVariable String type) {
        return service.getByServiceType(type);
    }

    // 🔥 GET PROVIDER SERVICES (VERY IMPORTANT)
    @GetMapping("/provider/{email}")
    public List<MyService> getByProvider(@PathVariable String email) {
        return service.getServicesByProvider(email);
    }

    @PutMapping("/update/{id}")
    public MyService updateService(@PathVariable int id, @RequestBody MyService updated) {
        MyService existing = service.getServiceById(id);

        existing.setServiceName(updated.getServiceName());
        existing.setLocation(updated.getLocation());
        existing.setCharge(updated.getCharge());

        return service.addService(existing);
    }
    // ✅ DELETE
    @DeleteMapping("/delete/{id}")
    public String deleteService(@PathVariable int id) {
        service.deleteService(id);
        return "Deleted Successfully";
    }
}