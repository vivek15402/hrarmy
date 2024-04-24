var config = {
    host: 'k8cbszo2oiu6a23.sg.qlikcloud.com',
    prefix: '/',
    port: 443,
    isSecure: true,
    webIntegrationId: 'KH5sEY6TLaRdzLS90Pq_wMaLiNKU0iNd'
};

//Redirect to login if user is not logged in
async function login() {
    function isLoggedIn() {
        return fetch("https://"+config.host+"/api/v1/users/me", {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'qlik-web-integration-id': config.webIntegrationId,
            },
        }).then(response => {
            return response.status === 200;
        });
    }
    return isLoggedIn().then(loggedIn =>{
        if (!loggedIn) {
            window.location.href = "https://"+config.host+
            "/login?qlik-web-integration-id=" + config.webIntegrationId +
            "&returnto=" + location.href;
            throw new Error('not logged in');
        }
    });
}
login().then(() => {
    require.config( {
        baseUrl: ( config.isSecure ? "https://" : "http://" ) + config.host +
        (config.port ? ":" + config.port : "") + config.prefix + "resources",
        webIntegrationId: config.webIntegrationId
    } );
    //Load js/qlik after authentication is successful
    require( ["js/qlik"], function ( qlik ) {
        qlik.on( "error", function ( error ) {
            $( '#popupText' ).append( error.message + "<br>" );
            $( '#popup' ).fadeIn( 1000 );
        } );
        $( "#closePopup" ).click( function () {
            $( '#popup' ).hide();
        } );
        //open apps -- inserted here --
        var app = qlik.openApp( '3a6f9acf-bd8d-4407-b00f-97cc4bd07809', config );
       
        //get objects -- inserted here --
        app.visualization.get('961fdd68-0cb3-4986-80f6-911beaf3975e').then(function(vis){
        vis.show("QV01");
        } );
    } );
});
