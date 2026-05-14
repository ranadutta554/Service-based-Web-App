package com.edu.entity;

import jakarta.persistence.*;

@Entity
public class MyService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;   // ✅ MAIN PRIMARY KEY

    private int serviceId;   // ✅ reference id

    private String serviceName;
    private String description;
    private String location;
    private String workingTime;
    private String workingDays;
    private int charge;
    private String status;

    private String providerEmail;
    private String providerName;

    private String serviceType;
    private String meetinglink;
    private String imagePath;

    // GETTERS & SETTERS

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public int getServiceId() { return serviceId; }
    public void setServiceId(int serviceId) { this.serviceId = serviceId; }

    public String getServiceName() { return serviceName; }
    public void setServiceName(String serviceName) { this.serviceName = serviceName; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getWorkingTime() { return workingTime; }
    public void setWorkingTime(String workingTime) { this.workingTime = workingTime; }

    public String getWorkingDays() { return workingDays; }
    public void setWorkingDays(String workingDays) { this.workingDays = workingDays; }

    public int getCharge() { return charge; }
    public void setCharge(int charge) { this.charge = charge; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getProviderEmail() { return providerEmail; }
    public void setProviderEmail(String providerEmail) { this.providerEmail = providerEmail; }

    public String getProviderName() { return providerName; }
    public void setProviderName(String providerName) { this.providerName = providerName; }

    public String getServiceType() { return serviceType; }
    public void setServiceType(String serviceType) { this.serviceType = serviceType; }

    public String getMeetinglink() { return meetinglink; }
    public void setMeetinglink(String meetinglink) { this.meetinglink = meetinglink; }

    public String getImagePath() { return imagePath; }
    public void setImagePath(String imagePath) { this.imagePath = imagePath; }
}