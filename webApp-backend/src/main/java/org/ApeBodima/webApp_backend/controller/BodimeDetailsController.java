package org.ApeBodima.webApp_backend.controller;


import org.ApeBodima.webApp_backend.DTO.request.BodimeContactSaveDTO;
import org.ApeBodima.webApp_backend.DTO.request.BodimeDetailsSaveDTO;
import org.ApeBodima.webApp_backend.service.BodimeDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/bodime-details")
@CrossOrigin
public class BodimeDetailsController {
    @Autowired
    private BodimeDetailsService bodimeDetailsService;


    @PostMapping("/save")
    public String saveCustomer(@RequestBody BodimeDetailsSaveDTO bodimeDetailsSaveDTO){
        String message = bodimeDetailsService.save(bodimeDetailsSaveDTO);
        return message;
    }

    @GetMapping("/get-by-id/{id}")
    public BodimeDetailsSaveDTO getBodimeDetailsById(@PathVariable(value="id") String bodimId){
        BodimeDetailsSaveDTO bodimeDetailsSaveDTO = bodimeDetailsService.getBodimeDetailsById(bodimId);
        return bodimeDetailsSaveDTO;
    }

    @GetMapping("/get-all")
    public List<BodimeDetailsSaveDTO> getAllBodimeDetails(){
        List<BodimeDetailsSaveDTO> bodimeSaveDTOList = bodimeDetailsService.getAllBodimeDetails();
        return bodimeSaveDTOList;
    }


}
