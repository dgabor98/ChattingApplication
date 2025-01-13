package com.demo.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "counter")
@Data
public class Counter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer value = 0;

}