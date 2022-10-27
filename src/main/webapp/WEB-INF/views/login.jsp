<%--<%@include file="template/header.jspf" %>--%>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" type="text/css" />
<!-- start: Favicon -->
<%--<link rel="shortcut icon" href="<c:url value="../../resources/login/img/favicon.ico" />">--%>
<!-- end: Favicon -->
<%--<link href="css/custom.css" type="text/css"
      rel="stylesheet">
<link href="css/custom.login.css" rel="stylesheet" type="text/css" />--%>
<script src="https://code.jquery.com/jquery-3.6.1.min.js" type="text/javascript"></script>
<%--
<style>
    .sidebar-nav{
        display: none;
    }
    #page-wrapper {
        margin: 0 ! important;
    }
    .make-scroll{
        height: 445px;
        overflow: scroll;
    }
    .fa-caret-down, .fa-user, .fa-envelope{
        display: none;
    }
</style>
--%>

<div class="row">
    <div class="col-lg-12">
        <div class="row">
            <div class="col-lg-2">

            </div>
            <div class="col-lg-4">
                <img src="images/aids-logo.png"  />
            </div>
            <div class="col-lg-2">

            </div>
            <div class="col-lg-4">
                <img src="images/applogo.png"   />
            </div>
        </div>
    </div>
</div>
<div class="row-fluid">
    <div class="row-fluid">
        <div class="login-box">
            <div class="icons">
                <a href="index.html"><i class="halflings-icon home"></i></a>
                <a href="#"><i class="halflings-icon cog"></i></a>
            </div>
            <h2>Login to your account</h2>
<%--            <%@include file="template/message.jspf" %>--%>
            <form class="form-horizontal"  method="post">
                <fieldset>
                    <div class="input-prepend" title="Username">
                        <span class="add-on"><i class="halflings-icon user"></i></span>
                        <input class="input-large span10" name='j_username' id="username" type="text" placeholder="type username"/>
                    </div>
                    <div class="clearfix"></div>
                    <div class="input-prepend" title="Password">
                        <span class="add-on"><i class="halflings-icon lock"></i></span>
                        <input class="input-large span10" name='j_password' id="password" type="password" placeholder="type password"/>
                    </div>
                    <div class="clearfix"></div>							
                    <label class="remember" for="remember"><input type="checkbox" id="remember" />Remember me</label>
                    <div class="button-login">	
                        <button type="submit" class="btn btn-primary">Login</button>
                    </div>
                    <div class="clearfix"></div>
                </fieldset>
            </form>
        </div>
    </div>
</div>
<%@include file="template/footer.jspf" %>
<script type="text/javascript">
    $("#username").focus();
    $("#toggle-rem-side-bar").remove();
</script>
