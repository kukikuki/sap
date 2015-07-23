package com.bmstu;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.List;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.servlet.Servlet;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.naming.InitialContext;
import javax.naming.NamingException;

import com.sap.ui5.resource.util.IXSSEncoder;
import com.sap.ui5.resource.util.XSSEncoder;

/**
 * Servlet implementation class JdbcServlet
 */
public class JdbcServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	private static String currentControlPointId = null;
	private static String currentControlPointState = "free";
	private static boolean isStateChanged = false;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public JdbcServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see Servlet#init(ServletConfig)
	 */

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		
		response.setContentType("text/event-stream");
		response.setCharacterEncoding("UTF-8");
 

		PrintWriter writer = response.getWriter();	

		if (request.getParameter("controlPointId") != null){
			isStateChanged=true;
			currentControlPointId = request.getParameter("controlPointId");
			currentControlPointState = request.getParameter("state");
			
		} else {
			if (isStateChanged == true){
				isStateChanged = false;
				response.setContentType("text/event-stream");
				response.setCharacterEncoding("UTF-8");
				writer.write(new String("data: " + currentControlPointId + "-" + currentControlPointState + "\n\n"));
				writer.flush();
				writer.close();
			}
		}
	}
	


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			doGet(request, response);
		} catch (Exception e) {
			response.getWriter().println(
					"Persistence operation failed with reason: "
							+ e.getMessage());
			e.printStackTrace();
		}
	}
	
//	private void appendPersonTable(HttpServletResponse response)
//			throws SQLException, IOException {
//		// Append table that lists all persons
//		List<Message> resultList = messageDao.selectAllMessages();
//		response.getWriter().println(
//				"<p><table border=\"1\"><tr><th colspan=\"3\">"
//						+ (resultList.isEmpty() ? "" : resultList.size() + " ")
//						+ "Entries in the Database</th></tr>");
//		if (resultList.isEmpty()) {
//			response.getWriter().println(
//					"<tr><td colspan=\"3\">Database is empty</td></tr>");
//		} else {
//			response.getWriter()
//					.println(
//							"<tr><th>First name</th><th>Last name</th><th>Id</th></tr>");
//		}
//		IXSSEncoder xssEncoder = XSSEncoder.getInstance();
//		for (Message p : resultList) {
//			response.getWriter().println(
//					"<tr><td>" + xssEncoder.encodeHTML(p.getId())
//							+ "</td><td>"
//							+ xssEncoder.encodeHTML(p.getDeviceId())
//							+ "</td><td>" + p.getId() + "</td></tr>");
//		}
//		response.getWriter().println("</table></p>");
//	}
}
