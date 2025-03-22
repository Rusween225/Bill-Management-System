package com.example.Bill_Managment.services;

import com.example.Bill_Managment.entity.Bill;
import com.example.Bill_Managment.repositories.BillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BillService {
    @Autowired
    private BillRepository billRepository;

    public List<Bill> getBillsByUserId(Long userId) {
        return billRepository.findByUserId(userId);
    }
}
