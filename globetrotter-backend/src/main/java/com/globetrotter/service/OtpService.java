package com.globetrotter.service;

import com.globetrotter.config.MailProperties;
import com.globetrotter.entity.OtpVerification;
import com.globetrotter.entity.User;
import com.globetrotter.repository.OtpRepository;
import com.globetrotter.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Properties;
import java.util.Random;
import jakarta.mail.*;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;

@Service
@RequiredArgsConstructor
public class OtpService {
    private final OtpRepository otpRepository;
    private final UserRepository userRepository;
    private final MailProperties mailProperties;

    public void generateAndSendOtp(String email) {
        userRepository.findByEmail(email).orElseGet(() -> {
            User u = User.builder()
                    .email(email)
                    .verified(false)
                    .type(User.Role.USER)
                    .build();
            return userRepository.save(u);
        });

        String otp = String.format("%06d", new Random().nextInt(900000) + 100000);
        OtpVerification record = OtpVerification.builder()
                .email(email)
                .otp(otp)
                .expiryTime(LocalDateTime.now().plusMinutes(5))
                .verified(false)
                .build();
        otpRepository.save(record);

        sendOtpEmail(email, otp);
    }

    private void sendOtpEmail(String to, String otp) {
        Properties props = new Properties();
        props.put("mail.smtp.auth", String.valueOf(mailProperties.isSmtpAuth()));
        props.put("mail.smtp.starttls.enable", String.valueOf(mailProperties.isSmtpStarttlsEnable()));
        props.put("mail.smtp.host", mailProperties.getHost());
        props.put("mail.smtp.port", String.valueOf(mailProperties.getPort()));

        Session session = Session.getInstance(props, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(mailProperties.getUsername(), mailProperties.getPassword());
            }
        });

        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(mailProperties.getUsername()));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to));
            message.setSubject("Your OTP Code");
            message.setText("Your OTP is: " + otp + " and will expire in 5 minutes.");
            Transport.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Error sending OTP", e);
        }
    }

    public boolean verifyOtp(String email, String otp) {
        var opt = otpRepository.findTopByEmailOrderByIdDesc(email);
        if (opt.isEmpty()) return false;
        OtpVerification rec = opt.get();
        if (rec.isVerified()) return true;
        if (rec.getExpiryTime().isBefore(LocalDateTime.now())) return false;
        if (!rec.getOtp().equals(otp)) return false;
        rec.setVerified(true);
        otpRepository.save(rec);
        return true;
    }

    public boolean isLatestOtpVerified(String email) {
        var opt = otpRepository.findTopByEmailOrderByIdDesc(email);
        return opt.map(OtpVerification::isVerified).orElse(false);
    }
}