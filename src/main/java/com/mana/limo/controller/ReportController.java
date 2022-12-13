package com.mana.limo.controller;

import com.crystaldecisions.report.web.viewer.CrPrintMode;
import com.crystaldecisions.report.web.viewer.CrystalReportViewer;
import com.crystaldecisions.sdk.occa.report.application.ParameterFieldController;
import com.crystaldecisions.sdk.occa.report.application.ReportClientDocument;
import com.crystaldecisions.sdk.occa.report.lib.ReportSDKException;
import com.crystaldecisions.sdk.occa.report.lib.ReportSDKExceptionBase;
import com.crystaldecisions.sdk.occa.report.reportsource.IReportSource;
import com.mana.limo.domain.Privilege;
import com.mana.limo.domain.UserRole;
import com.mana.limo.domain.enums.Status;
import com.mana.limo.service.PrivilegeService;
import com.mana.limo.service.UserRoleService;
import com.mana.limo.service.UserService;
import com.mana.limo.util.CRJavaHelper;
import com.mana.limo.util.Constants;
import com.mana.limo.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * @author :: codemaster
 * created on :: 3/11/2022
 * Package Name :: com.mana.limo.controller
 */

@Controller
@Transactional
public class ReportController {

    @Autowired
    UserService userService;

    @Autowired
    UserRoleService userRoleService;

    @Autowired
    PrivilegeService privilegeService;

    @Transactional
    @GetMapping("/report")
    public String getAllRoles(Model model, HttpServletRequest request, HttpServletResponse response, @RequestParam("name") String report){
        request.getSession().setAttribute("report_name",report);
        List<String> privileges = userService.getCurrentUser().getUserRoles().stream().map(role -> role.getPrivileges().stream().map(p -> p.getPrintName())).collect(Collectors.toList()).stream().map(stringStream -> stringStream.collect(Collectors.joining(","))).collect(Collectors.toList());
        model.addAttribute("user", userService.getCurrentUser());
        model.addAttribute("privileges", privileges);
        model.addAttribute("title", "SEMS Reports");
        model.addAttribute("pageTitle", Constants.TITLE + " :: Privilege List");
        return "reporter";
/*
        try{
        Set<String> keys=request.getParameterMap().keySet();


//            report=request.getSession().getAttribute("report_name").toString();


        File jsp = new File(request.getSession().getServletContext().getRealPath(request.getServletPath())).getParentFile();
        String DBUSERNAME = "admin";
        String DBPASSWORD = "Adm1n2022";
        String DBCLASSNAME = "oracle.jdbc.OracleDriver";
        String CONNECTIONURL = "jdbc:oracle:thin:@//localhost:2010/shopexpert";
        String jndiName = "JDBC(JNDI)";

        CrystalReportViewer viewer = new CrystalReportViewer();
        viewer.setName(StringUtils.toCamelCase3(report));
        ReportClientDocument doc = new ReportClientDocument();
        //doc.open(jsp.getAbsolutePath()+"/reports/"+report, OpenReportOptions._discardSavedData);

            doc.open(new ClassPathResource("reports/"+report).getPath(), 0);//OpenReportOptions._discardSavedData);


        CRJavaHelper.changeDataSource(doc, DBUSERNAME, DBPASSWORD, CONNECTIONURL, DBCLASSNAME, jndiName);

        if(keys.size()>1)
        {
            ParameterFieldController paramController = doc.getDataDefController().getParameterFieldController();
            for(String key:keys)
            {
                if(!key.contentEquals("report_name") || !key.contentEquals("CRVCompositeViewState")){
                    System.err.println( "Key: "+key+"  *** Value: "+request.getParameterMap().get(key).toString());
                    paramController.setCurrentValue("",key,request.getParameterMap().get(key));
                }
            }
        }

        IReportSource reportSource =doc.getReportSource();
        viewer.setReportSource(reportSource);
        viewer.setBestFitPage(true);
        viewer.setDisplayToolbar(true);
        viewer.setDisplayPage(true);
        viewer.setBestFitPage(true);
        viewer.setHasRefreshButton(false);
        viewer.setEnableDrillDown(true);
        viewer.setHasExportButton(true);
        viewer.setHasGotoPageButton(true);
        viewer.setDisplayGroupTree(true);
        viewer.setDisplayToolbar(true);
        viewer.setHasLogo(false);
        viewer.setHasToggleGroupTreeButton(false);
        viewer.setHasToggleParameterPanelButton(false);
        viewer.setHasGotoPageButton(true);
        viewer.setBestFitPage(true);
        viewer.setBestFitPage(true);
        viewer.setOwnPage(true);
        viewer.setOwnPage(true);
        viewer.setOwnForm(true);
        viewer.setPrintMode(CrPrintMode.ACTIVEX);
        doc.getReportSource().refresh();


        viewer.processHttpRequest(request,response,request.getServletContext(),null);

        PrintWriter pwriter = response.getWriter();
        pwriter.write(viewer.getHtmlContent(request,response, request.getServletContext()));
        } catch (ReportSDKException e) {
            throw new RuntimeException(e);
        } catch (ReportSDKExceptionBase e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }


        */
/*try {
            response.sendRedirect("/");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }*//*
         */
    }



}
