import com.saloon.util.TimeSlotUtils;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {
    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private StaffRepository staffRepository;

    @GetMapping("/available-slots")
    public List<String> getAvailableSlots(@RequestParam String date, @RequestParam Long staffId) {
        List<String> allSlots = TimeSlotUtils.generateTimeSlots();
        List<String> bookedSlots = appointmentRepository.findAll().stream()
                .filter(a -> a.getDate().equals(date) && a.getStaff().getId().equals(staffId) && a.getStatus() != AppointmentStatus.CANCELLED)
                .map(Appointment::getTimeSlot)
                .collect(Collectors.toList());

        return allSlots.stream()
                .filter(slot -> !bookedSlots.contains(slot))
                .collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity<?> bookAppointment(@RequestBody AppointmentRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Service service = serviceRepository.findById(request.getServiceId())
                .orElseThrow(() -> new RuntimeException("Service not found"));
        Staff staff = staffRepository.findById(request.getStaffId())
                .orElseThrow(() -> new RuntimeException("Staff not found"));

        Appointment appointment = new Appointment();
        appointment.setUser(user);
        appointment.setService(service);
        appointment.setStaff(staff);
        appointment.setDate(request.getDate());
        appointment.setTimeSlot(request.getTimeSlot());
        appointment.setStatus(AppointmentStatus.BOOKED);

        return ResponseEntity.ok(appointmentRepository.save(appointment));
    }

    @GetMapping("/user/{userId}")
    public List<Appointment> getUserAppointments(@PathVariable Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return appointmentRepository.findByUser(user);
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<?> cancelAppointment(@PathVariable Long id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        
        appointment.setStatus(AppointmentStatus.CANCELLED);
        appointmentRepository.save(appointment);
        
        return ResponseEntity.ok().build();
    }
}
