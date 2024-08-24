package com.abcrestaurant.Backend.service;

import com.abcrestaurant.Backend.entity.Facility;
import com.abcrestaurant.Backend.repository.FacilityRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FacilityService {

    private final FacilityRepository facilityRepository;

    public FacilityService(FacilityRepository facilityRepository) {
        this.facilityRepository = facilityRepository;
    }

    public Facility createFacility(Facility facility) {
        return facilityRepository.save(facility);
    }

    public List<Facility> getAllFacilities() {
        return facilityRepository.findAll();
    }

    public Facility getFacilityById(Long id) {
        return facilityRepository.findById(id).orElseThrow(() -> new RuntimeException("Facility not found"));
    }

    public Facility updateFacility(Long id, Facility facilityDetails) {
        Facility facility = getFacilityById(id);
        facility.setName(facilityDetails.getName());
        facility.setImageUrl(facilityDetails.getImageUrl());
        return facilityRepository.save(facility);
    }

    public void deleteFacility(Long id) {
        Facility facility = getFacilityById(id);
        facilityRepository.delete(facility);
    }
}
