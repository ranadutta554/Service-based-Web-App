//package com.edu.service;
//
//import java.util.List;
//import com.edu.entity.Booking;
//
//public interface BookingService {
//
//    Booking saveBooking(Booking booking);
//
//    List<Booking> getUserBookings(String email); // ✅ FIXED
//
//    Booking updateStatus(Long id, String status);
//
//    void deleteBooking(Long id);
//
//	List<Booking> getProviderBookings(String email);
//}

package com.edu.service;

import java.util.List;
import com.edu.entity.Booking;

public interface BookingService {

    Booking saveBooking(Booking booking);

    List<Booking> getUserBookings(String email);

    List<Booking> getProviderBookings(String email);

    //Booking updateStatus(Long id, String status);
	Booking updateBooking(Booking booking);

    void deleteBooking(Long id);

	Booking getBookingById(Long id);

	Booking updateStatus(Long id, String status);

}