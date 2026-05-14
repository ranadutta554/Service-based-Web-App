//package com.edu.service;
//
//import java.time.LocalDateTime;
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.edu.entity.Booking;
//import com.edu.repository.BookingRepository;
//
//@Service
//public class BookingServiceImpl implements BookingService {
//
//    @Autowired
//    private BookingRepository repo;
//
//    @Override
//    public List<Booking> getUserBookings(String email) {
//        return repo.findByUserEmail(email);
//    }
//
//    @Override
//    public List<Booking> getProviderBookings(String email) {
//        return repo.findByProviderEmail(email);
//    }
//
//    @Override
//    public Booking saveBooking(Booking booking) {
//        booking.setStatus("PENDING");
//        booking.setBookingDate(LocalDateTime.now());
//        return repo.save(booking);
//    }
//
//    @Override
//    public Booking updateStatus(Long id, String status) {
//        Booking b = repo.findById(id).orElse(null);
//        if (b != null) {
//            b.setStatus(status);
//            return repo.save(b);
//        }
//        return null;
//    }
//
//    @Override
//    public void deleteBooking(Long id) {
//        repo.deleteById(id);
//    }
//
//}

package com.edu.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edu.entity.Booking;
import com.edu.entity.MyService;
import com.edu.repository.BookingRepository;
import com.edu.repository.MyServiceRepository;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingRepository repo;

    @Autowired
    private MyServiceRepository serviceRepo;

    @Override
    public Booking saveBooking(Booking booking) {

        // 🔥 BLOCK SAME SLOT
        List<Booking> existing = repo.findByServiceIdAndScheduledDateAndStatusIn(
                booking.getServiceId(),
                booking.getScheduledDate(),
                List.of("PENDING", "ACCEPTED")
        );

        if (!existing.isEmpty()) {
            throw new RuntimeException("Time slot already booked ❌");
        }

        // 🔥 FETCH PROVIDER USING serviceId
        MyService service = serviceRepo
                .findByServiceId(booking.getServiceId().intValue())
                .stream()
                .findFirst()
                .orElse(null);

        if (service == null) {
            throw new RuntimeException("Service not found ❌");
        }

        // 🔥 AUTO SET PROVIDER
        booking.setProviderEmail(service.getProviderEmail());
        booking.setProviderName(service.getProviderName());

        booking.setStatus("PENDING");
        booking.setBookingDate(LocalDateTime.now());

        return repo.save(booking);
    }

    @Override
    public List<Booking> getUserBookings(String email) {
        return repo.findByUserEmail(email);
    }

    @Override
    public List<Booking> getProviderBookings(String email) {
        return repo.findByProviderEmail(email);
    }

    @Override
    public Booking updateBooking(Booking booking) {
        return repo.save(booking); // ✅ direct save, no validation
    }

    @Override
    public void deleteBooking(Long id) {
        repo.deleteById(id);
    }
    @Override
    public Booking getBookingById(Long id) {
        return repo.findById(id).orElse(null);
    }
    @Override
    public Booking updateStatus(Long id, String status) {

        Booking booking = repo.findById(id).orElse(null);

        if (booking == null) {
            throw new RuntimeException("Booking not found ❌");
        }

        String current = booking.getStatus();

        // ✅ VALID FLOW CONTROL (important)
        if ("CANCELLED".equals(current)) {
            throw new RuntimeException("Cannot update cancelled booking ❌");
        }

        if ("COMPLETED".equals(current)) {
            throw new RuntimeException("Already completed ❌");
        }

        // ✅ update status safely
        booking.setStatus(status.toUpperCase());

        return repo.save(booking); // safe now
    }
}