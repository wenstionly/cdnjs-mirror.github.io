ss.s3 = ss.s3 || {};

ss.s3.getAuth = function( url, data, callback ) {
    var xhr = ss.newXHR(),
        onload;
        
    onload = function() {
    
        try {
            if ( onload && this.readyState === 4 ) {
                onload = undefined;
                xhr.onreadystatechange = function() {};
            
                if ( xhr.status === 200 ) {                
                    var data = ss.parseJSON( xhr.responseText );
                    
                    if ( data && data.success === true ) {
                        callback( data );
                        return;
                    }            
                } else {
                    callback( false );
                }
            }
        } catch ( e ) {
            callback( false );
        }
    };
        
    xhr.onreadystatechange = onload;
    xhr.open( 'POST', url, true );    
    xhr.setRequestHeader( 'Content-type', 'application/x-www-form-urlencoded' );    
    xhr.send( ( !data ? null : ss.obj2string( data ) ) );
};

