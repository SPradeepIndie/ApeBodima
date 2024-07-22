package org.ApeBodima.webApp_backend.service.IMPL;

import jakarta.transaction.Transactional;
import org.ApeBodima.webApp_backend.DTO.request.BodimeDetailsSaveDTO;
import org.ApeBodima.webApp_backend.entity.Bodime_Contact;
import org.ApeBodima.webApp_backend.entity.Bodime_Detail;
import org.ApeBodima.webApp_backend.entity.Bodime_Review;
import org.ApeBodima.webApp_backend.entity.WebApp_User;
import org.ApeBodima.webApp_backend.repository.BodimeDetailsContactRepo;
import org.ApeBodima.webApp_backend.repository.BodimeDetailsRepo;
import org.ApeBodima.webApp_backend.repository.BodimeReviewRepo;
import org.ApeBodima.webApp_backend.service.serviceInterFaces.BodimeDetailsService;
import org.ApeBodima.webApp_backend.util.mappers.BodimeMapper;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Service
public class BodimeDetailsServiceIMPL implements BodimeDetailsService {
    @Autowired
    private BodimeDetailsRepo bodimeDetailsRepo;

    @Autowired
    private BodimeDetailsContactRepo bodimeDetailsContactRepo;

    @Autowired
    private BodimeReviewRepo bodimeReviewRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private BodimeMapper bodimeMapper;

    @Override
    public String save(BodimeDetailsSaveDTO bodimeDetailsSaveDTO) {
        Bodime_Detail bodime_detail = new Bodime_Detail(
                bodimeDetailsSaveDTO.getBodimId(),
                bodimeDetailsSaveDTO.getPrice(),
                bodimeDetailsSaveDTO.getCapacity(),
                bodimeDetailsSaveDTO.getDistanceToUni(),
                bodimeDetailsSaveDTO.getType(),
                bodimeDetailsSaveDTO.getNumChairs(),
                bodimeDetailsSaveDTO.getNumFans(),
                bodimeDetailsSaveDTO.getNumTables(),
                bodimeDetailsSaveDTO.getNumNets(),
                bodimeDetailsSaveDTO.getKitchen(),
                bodimeDetailsSaveDTO.getLocationAddress(),
                bodimeDetailsSaveDTO.getBodimPlaceName()



        );
        WebApp_User webApp_user = modelMapper.map(bodimeDetailsSaveDTO.getWebApp_user(), WebApp_User.class);
        bodime_detail.setWebApp_user(webApp_user);
        webApp_user.setBodime_details(bodime_detail);
        bodimeDetailsRepo.save(bodime_detail);

        if(bodimeDetailsRepo.existsById(bodime_detail.getBodimId())){
            List<Bodime_Contact> bodime_contacts = modelMapper.map(
                    bodimeDetailsSaveDTO.getContacts(),new TypeToken<List<Bodime_Contact>>(){

                    }.getType());

            List<Bodime_Review> bodime_reviews = modelMapper.map(
                    bodimeDetailsSaveDTO.getReviews(),new TypeToken<List<Bodime_Review>>(){

                    }.getType());



                for (int i = 0; i < bodime_contacts.size(); i++) {
                    bodime_contacts.get(i).setBodime_details(bodime_detail);
                }
                for (int i = 0; i < bodime_reviews.size(); i++) {
                    bodime_reviews.get(i).setBodime_details(bodime_detail);
                }

                if (bodime_contacts.size() > 0) {
                    bodimeDetailsContactRepo.saveAll(bodime_contacts);
                }
                if (bodime_reviews.size() > 0) {
                    bodimeReviewRepo.saveAll(bodime_reviews);
                }


                return "Bodime added successfully ";




        }
        return "error occurd";

    }


    @Override
    public BodimeDetailsSaveDTO getBodimeDetailsById(String bodimId) {
        if(bodimeDetailsRepo.existsById(bodimId)){
            Bodime_Detail bodime_detail = bodimeDetailsRepo.getReferenceById(bodimId);
            BodimeDetailsSaveDTO bodimeDetailsSaveDto = new BodimeDetailsSaveDTO(
                    bodime_detail.getBodimId(),
                    bodime_detail.getPrice(),
                    bodime_detail.getCapacity(),
                    bodime_detail.getDistanceToUni(),
                    bodime_detail.getType(),
                    bodime_detail.getNumChairs(),
                    bodime_detail.getNumFans(),
                    bodime_detail.getNumTables(),
                    bodime_detail.getNumNets(),
                    bodime_detail.getKitchen(),
                    bodime_detail.getRating(),
                    bodime_detail.getLocationAddress(),
                    bodime_detail.getNearestCity(),
                    bodime_detail.getBodimPlaceName(),
                    bodimeMapper.entityListToDTOList(bodime_detail.getBodime_contacts()),
                    bodimeMapper.entityListToDTOList2(bodime_detail.getBodime_reviews()),
                    bodime_detail.getWebApp_user()

            );
            return bodimeDetailsSaveDto;
        }
        else{
            throw new RuntimeException("Not Found Bodime Details");
        }
    }

    @Override
    @Transactional
    public List<BodimeDetailsSaveDTO> getAllBodimeDetails(int page, int size) {



        Page<Bodime_Detail> bodimeDetailsPage = bodimeDetailsRepo.findAll(PageRequest.of(page, size));
        List<BodimeDetailsSaveDTO> bodimeDetailsSaveDTOS = bodimeMapper.pagetoDtoList(bodimeDetailsPage);


        return bodimeDetailsSaveDTOS;
    }


    @Override
    @Transactional
    public List<BodimeDetailsSaveDTO> getAllBodimeDetailsByCapacity(int page, int size, int capacity) {
        Page<Bodime_Detail> bodimeDetailsPage = bodimeDetailsRepo.findAllByCapacity(PageRequest.of(page, size),capacity);
        List<BodimeDetailsSaveDTO> bodimeDetailsSaveDTOS = bodimeMapper.pagetoDtoList(bodimeDetailsPage);
        return bodimeDetailsSaveDTOS;
    }

    @Override
    @Transactional
    public List<BodimeDetailsSaveDTO> getAllBodimeDetailsByDistance(int page, int size, double distance) {
        Page<Bodime_Detail> bodimeDetailsPage = bodimeDetailsRepo.findAllByDistanceToUniLessThanEqual(PageRequest.of(page, size),distance);
        List<BodimeDetailsSaveDTO> bodimeDetailsSaveDTOS = bodimeMapper.pagetoDtoList(bodimeDetailsPage);
        return bodimeDetailsSaveDTOS;
    }

    @Override
    public String update(BodimeDetailsSaveDTO bodimeDetailsSaveDTO, String bodimId) {
        if (!bodimeDetailsRepo.existsById(bodimeDetailsSaveDTO.getBodimId())) {
            return "Bodime details not found";
        }

        Bodime_Detail bodime_detail = bodimeDetailsRepo.findById(bodimeDetailsSaveDTO.getBodimId()).orElseThrow();
        bodime_detail.setPrice(bodimeDetailsSaveDTO.getPrice());
        bodime_detail.setCapacity(bodimeDetailsSaveDTO.getCapacity());
        bodime_detail.setDistanceToUni(bodimeDetailsSaveDTO.getDistanceToUni());
        bodime_detail.setType(bodimeDetailsSaveDTO.getType());
        bodime_detail.setNumChairs(bodimeDetailsSaveDTO.getNumChairs());
        bodime_detail.setNumFans(bodimeDetailsSaveDTO.getNumFans());
        bodime_detail.setNumTables(bodimeDetailsSaveDTO.getNumTables());
        bodime_detail.setNumNets(bodimeDetailsSaveDTO.getNumNets());
        bodime_detail.setKitchen(bodimeDetailsSaveDTO.getKitchen());
        bodime_detail.setLocationAddress(bodimeDetailsSaveDTO.getLocationAddress());
        bodime_detail.setBodimPlaceName(bodimeDetailsSaveDTO.getBodimPlaceName());

        WebApp_User webApp_user = modelMapper.map(bodimeDetailsSaveDTO.getWebApp_user(), WebApp_User.class);
        bodime_detail.setWebApp_user(webApp_user);
        webApp_user.setBodime_details(bodime_detail);

        bodimeDetailsRepo.save(bodime_detail);

        List<Bodime_Contact> bodime_contacts = modelMapper.map(
                bodimeDetailsSaveDTO.getContacts(), new TypeToken<List<Bodime_Contact>>() {}.getType()
        );

        List<Bodime_Review> bodime_reviews = modelMapper.map(
                bodimeDetailsSaveDTO.getReviews(), new TypeToken<List<Bodime_Review>>() {}.getType()
        );

        for (Bodime_Contact contact : bodime_contacts) {
            contact.setBodime_details(bodime_detail);
        }
        for (Bodime_Review review : bodime_reviews) {
            review.setBodime_details(bodime_detail);
        }

        if (!bodime_contacts.isEmpty()) {
            bodimeDetailsContactRepo.saveAll(bodime_contacts);
        }
        if (!bodime_reviews.isEmpty()) {
            bodimeReviewRepo.saveAll(bodime_reviews);
        }

        return "Bodime details updated successfully";
    }

    @Override
    @Transactional
    public List<BodimeDetailsSaveDTO> getAllBodimeDetailsByNearestCity(int page, int size, String nearestCity) {
        Page<Bodime_Detail> bodimeDetailsPage = bodimeDetailsRepo.findAllByNearestCity(PageRequest.of(page, size),nearestCity);
        List<BodimeDetailsSaveDTO> bodimeDetailsSaveDTOS = bodimeMapper.pagetoDtoList(bodimeDetailsPage);
        return bodimeDetailsSaveDTOS;
    }


    public List<BodimeDetailsSaveDTO> sortBodimeDetailsByRating(List<BodimeDetailsSaveDTO> bodimeDetailsList) {
        Collections.sort(bodimeDetailsList, new Comparator<BodimeDetailsSaveDTO>() {
            @Override
            public int compare(BodimeDetailsSaveDTO o1, BodimeDetailsSaveDTO o2) {
                return Double.compare(o2.getRating(), o1.getRating());
            }
        });
        return bodimeDetailsList;
    }


}
