package com.fitness.tracker.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/")
    public String sessionID(HttpServletRequest request){
        return "Backend is running!" + request.getSession().getId();
    }
}
