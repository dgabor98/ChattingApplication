package com.demo.service;

import com.demo.model.Counter;
import com.demo.repository.CounterRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

@Service
public class CounterService {

    private final CounterRepository counterRepository;

    public CounterService(CounterRepository counterRepository) {
        this.counterRepository = counterRepository;
    }

    @PostConstruct
    public void initializeDatabase() {
        if (counterRepository.count() == 0) {
            Counter counter = new Counter();
            counter.setValue(0);
            counterRepository.save(counter);
        }
    }

    public Counter incrementCounter() {
        Counter counter = counterRepository.findById(1L).orElseThrow(() -> new RuntimeException("Counter not found"));
        counter.setValue(counter.getValue() + 1);
        return counterRepository.save(counter);
    }

    public Counter getCounter() {
        return counterRepository.findById(1L).orElseThrow(() -> new RuntimeException("Counter not found"));
    }
}