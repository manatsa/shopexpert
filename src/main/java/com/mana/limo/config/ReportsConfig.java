package com.mana.limo.config;

import com.crystaldecisions.report.web.viewer.CrystalReportViewerServlet;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.WebApplicationInitializer;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration;

/**
 * @author :: codemaster
 * created on :: 11/11/2022
 * Package Name :: com.mana.limo.config
*/





@Configuration
public class ReportsConfig implements WebApplicationInitializer {

    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {
        System.err.println("++++++++++++++ setting init parameneters ++++++++++");
        servletContext.setInitParameter("crystal_image_uri","/crystalreportviewers");
        servletContext.setInitParameter("crystal_image_use_relative", "webapp");
ServletRegistration.Dynamic crystalReportViewerHandler = servletContext
                .addServlet("CrystalReportViewerHandler", new CrystalReportViewerServlet());

        crystalReportViewerHandler.setLoadOnStartup(1);
//        crystalReportViewerHandler.setAsyncSupported(true);
        crystalReportViewerHandler.addMapping("CrystalReportViewerHandler");

        System.err.println("___________________ done setting init parameneters ________________");
    }
}
