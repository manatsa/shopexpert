
<%@page import="java.util.Iterator"%>
<%@page import="java.net.URL"%>
<title>SEMS Report</title>
<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>

<%//Crystal Java Reporting Component (JRC) imports.%>

<%//Java imports. %>
<%@page import="java.io.*" %>
<%@ page import="com.crystaldecisions.sdk.occa.report.reportsource.IReportSource" %>
<%@ page import="com.crystaldecisions.report.web.viewer.CrystalReportViewer" %>
<%@ page import="com.crystaldecisions.sdk.occa.report.lib.PropertyBag" %>
<%@ page import="java.util.Set" %>
<%//Crystal Reports for Eclipse Version 2 imports.%>
<%@ page import="com.crystaldecisions.sdk.occa.report.application.*"%>
<%@ page import="com.mana.limo.util.CRJavaHelper" %>
<%@ page import="com.mana.limo.util.StringUtils" %>
<%@ page import="com.crystaldecisions.report.web.viewer.CrPrintMode" %>
<%@ page import="org.springframework.util.ResourceUtils" %>
<%@ page import="org.springframework.core.io.ClassPathResource" %>
<%--<%@include file="template/header.jspf"%>--%>

<%   
	Set<String> keys=request.getParameterMap().keySet();
	String report="";
		try{
            report=request.getSession().getAttribute("report_name").toString();
		}catch(Exception e){
			e.printStackTrace();
		}

        File jsp = new File(request.getSession().getServletContext().getRealPath(request.getServletPath())).getParentFile();
        String DBUSERNAME = "admin";
        String DBPASSWORD = "Adm1n2022";
        String DBCLASSNAME = "oracle.jdbc.OracleDriver";
        String CONNECTIONURL = "jdbc:oracle:thin:@//localhost:2010/shopexpert";
        String jndiName = "JDBC(JNDI)";
%>

<%

    try {
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


        viewer.processHttpRequest(
                request,
                response,
                pageContext.getServletContext(),
                pageContext.getOut() );
        viewer.refresh();

                viewer.dispose();

    } catch(Exception ex) {
        out.println(ex);
        ex.printStackTrace();
    }
    
    
%>
<%@include file="template/footer.jspf"%>


