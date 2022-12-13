package com.mana.limo.controller;

import com.mana.limo.domain.Privilege;
import com.mana.limo.domain.Asset;
import com.mana.limo.domain.enums.AssetType;
import com.mana.limo.domain.enums.MsgType;
import com.mana.limo.domain.enums.Status;
import com.mana.limo.service.*;
import com.mana.limo.util.Constants;
import com.mana.limo.util.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author :: codemaster
 * created on :: 3/11/2022
 * Package Name :: com.mana.limo.controller
 */

@Controller
@Transactional
public class AssetController {

    @Autowired
    UserService userService;

    @Autowired
    AssetService assetService;

    @Autowired
    PrivilegeService privilegeService;

    @Autowired
    OrganizationService organizationService;

    @Autowired
    BusinessUnitService businessUnitService;

    public void setUp(Model model, Asset asset, BindingResult result){
        List<Privilege> privileges=privilegeService.getAllPrivileges();
        model.addAttribute("command", asset);
        model.addAttribute("user", userService.getCurrentUser());
        model.addAttribute("title", "Assets List");
        model.addAttribute("statuses", Status.values());
        model.addAttribute("privileges", privileges);
        model.addAttribute("orgs", organizationService.getAllOrganizations());
        model.addAttribute("units", businessUnitService.getAllBusinessUnits());
        model.addAttribute("assetTypes", AssetType.values());
        model.addAttribute("pageTitle", Constants.TITLE+ ((asset.getId()==null)?" New Role":" Edit Role::"+asset.getName()));

    }

    @Transactional
    @GetMapping("/assets-list")
    public String getAllRoles(Model model, HttpServletRequest request){
        model.addAttribute("pageContext", request.getContextPath());
        model.addAttribute("user", userService.getCurrentUser());
        model.addAttribute("title", "Assets List");
        model.addAttribute("pageTitle", Constants.TITLE+" :: Assets List");
        return "assets/list";
    }

    @GetMapping("/assets-creation")
    public String createRole(Model model,@RequestParam(value = "assetId", required = false) String assetId){
        Asset asset=(assetId!=null)?assetService.get(assetId):new Asset();
        setUp(model,asset, null);
        return "assets/item";
    }

    @Transactional
    @PostMapping("/assets-creation")
    public String makePrivilege(Model model, @ModelAttribute("item") @Valid Asset asset, BindingResult result) {
        model.addAttribute("msg", new Message("Asset saved successfully!", MsgType.success));
        List<String> privileges = userService.getCurrentUser().getUserRoles().stream().map(role -> role.getPrivileges().stream().map(p -> p.getPrintName())).collect(Collectors.toList()).stream().map(stringStream -> stringStream.collect(Collectors.joining(","))).collect(Collectors.toList());
        model.addAttribute("user", userService.getCurrentUser());
        model.addAttribute("privileges", privileges);
        model.addAttribute("title", "Assets List");
        model.addAttribute("pageTitle", Constants.TITLE + " :: Assets List");
        if (result.hasErrors()) {
            model.addAttribute("msg", new Message(result.getAllErrors().stream().map(error -> error.toString()).collect(Collectors.joining("\n")), MsgType.danger));
            setUp(model, asset,result);
            return "assets/item";
        }
        Asset asset1 = (asset.getId() == null || asset.getId().length() < 1) ? assetService.save(asset) : assetService.update(asset);
        return "assets/list";
    }
}
