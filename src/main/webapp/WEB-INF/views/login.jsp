<%@include file="template/header.jspf" %>

<div class="mui-container d-flex mui--align-middle justify-content-center" >
    <div class="d-flex mui-col-md-5 d-flex justify-content-center" style="border: 1px solid green; border-radius: 20px;margin-top: 60px">

       <%-- <form:form class="mui-form mui-col-md-12" method="post" action="${pageContext.request.contextPath}/logins">
            <legend  class="text-danger bold" style="margin-bottom: 10px; margin-top: 20px"><i class="fa fa-key text-danger"></i> Please Login</legend>
            <hr style="border: 0.8px solid green; width: 100%"/>
                <span class="mui--text-danger ">${errorMsg}</span>
            <div class="mui-textfield mui-textfield--float-label heavily-padded">
                <input type="text" id="username" name="username" required autofocus>
                <label>Your Username</label>
            </div>
            <div class="mui-textfield mui-textfield--float-label heavily-padded">
                <input type="password" id="password" name="password" required>
                <label>Your Password</label>
            </div>
            <input name="_csrf" type="hidden" value="4b07e915-905d-4c04-a88f-e85910fedf36" />
            <div class="d-flex justify-content-between mui-row mui-col-md-12 text-white" style="margin-bottom: 30px;">
                <a href="/" class="mui-btn mui-btn--raised mui-btn--danger rounded"><i class="fa fa-undo"></i> Cancel</a>
                <button type="submit" class="mui-btn mui-btn--raised bg-success text-white rounded"><i class="fa fa-unlock"></i> Login</button>
            </div>
        </form:form>--%>

    <form:form class="mui-form mui-col-md-12" action="${pageContext.request.contextPath}/logins" method="post">
        <br/>
        <h3  class="text-danger bold" style="margin-bottom: 10px; margin-top: 20px"><i class="fa fa-key text-danger"></i> Please Login</h3>
        <br/>
        <div class="mui-textfield mui-textfield--float-label heavily-padded">
            <input type="text" id="username" name="username" required autofocus>
            <label>Your Username</label>
        </div>
        <br>
        <div class="mui-textfield mui-textfield--float-label heavily-padded">
            <input type="password" id="password" name="password" required>
            <label>Your Password</label>
        </div>
        <br>
        <div class="d-flex justify-content-between mui-row mui-col-md-12 text-white" style="margin-bottom: 30px;">
            <a href="/" class="mui-btn mui-btn--raised mui-btn--danger rounded"><i class="fa fa-undo"></i> Cancel</a>
            <button type="submit" class="mui-btn mui-btn--raised bg-success text-white rounded"><i class="fa fa-unlock"></i> Login</button>
        </div>
        <br/>
        <br/>
    </form:form>

    </div>
</div>


<nav class="navbar bg-success rounded fixed-bottom">
    <div class="container-fluid">
        <div class="col-md-12 justify-content-around row">
            <div class="col-md-6">
                <a class="navbar-brand text-light" href="/limousine"><span class="justify-content-start" style="font-size: small"> Copyright &copy; 2022</span></a>
            </div>
            <div class="col-md-6 d-flex flex-row-reverse text-light">
                <span class="justify-content-end">Mneulite Investments</span>
            </div>
        </div>

    </div>
</nav>


