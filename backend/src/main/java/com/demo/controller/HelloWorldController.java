package com.demo.controller;

import com.demo.model.Counter;
import com.demo.service.CounterService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class HelloWorldController {


    private final CounterService counterService;

    public HelloWorldController(CounterService counterService) {
        this.counterService = counterService;
    }

    @GetMapping("/hello")
    public Map<String, String> sayHello() {
        return Map.of("response", "Hello World");
    }

    @PostMapping("/increment")
    public Counter incrementCounter() {
        return counterService.incrementCounter();
    }
}