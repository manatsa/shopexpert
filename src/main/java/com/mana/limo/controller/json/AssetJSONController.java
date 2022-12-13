package com.mana.limo.controller.json;

import com.mana.limo.domain.Asset;
import com.mana.limo.service.AssetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author :: codemaster
 * created on :: 19/10/2022
 * Package Name :: com.mana.limo.controller
 */

@RestController
@RequestMapping("/asset")
public class AssetJSONController {

    @Autowired
    AssetService assetService;

    @GetMapping("/list")
    public List<Asset> getAllAssets(){
        return assetService.getAllAssets();
    }

    @GetMapping("/show")
    public Asset getById(@RequestParam("assetId") String assetId){
        System.err.println(assetService.get(assetId));
        return  assetService.get(assetId);
    }



}
