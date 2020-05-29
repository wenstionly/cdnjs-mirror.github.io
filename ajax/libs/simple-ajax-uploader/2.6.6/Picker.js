ss.Picker = function( options ) {

    var wrap = document.createElement('div'),
        content = document.createElement('div'),
        progBox = document.createElement('div'),
        uploadBtn = document.createElement( 'button' ),
        openBtn = ss.verifyElem( options.openPickerBtn );
        
    if ( openBtn === false ) {
        throw new Error( 'Invalid element passed as open picker button.' );
    }
    
    wrap.className = 'picker-wrap';    
    wrap.innerHTML = '<div class="picker-header"> <div class="picker-header-inside picker-clearfix"><div style="float: left;">Upload Files</div><a href="#" class="picker-close" title="Close">x</a></div> </div>';
        
    content.className = 'picker-wrap';  
    wrap.appendChild( content );
    
    if ( ss.XhrOk ) {
        content.innerHTML = '<div class="picker-dzone"><span>Drag files here</span></div><span class="picker-label">Or select a file to upload:</span>';
    
    } else {
        content.innerHTML = '<span class="picker-label">Select a file to upload:</span>';
    }
        
    uploadBtn.type = 'button';
    uploadBtn.className = 'picker-btn picker-choose';
    uploadBtn.innerHTML = 'Choose file';
    content.appendChild( uploadBtn );
        
    progBox.className = 'picker-prog-box';    
    content.appendChild( progBox );
    
    document.body.appendChild( wrap );    
    
    var overrides = {
        button: uploadBtn,
        preview: true,
        
        onAbort: function() {},
        add: function() {},
        onChange: function() {},
        onProgress: function() {},
        startXHR: function() {},
        endXHR: function() {},
        startNonXHR: function() {},
        endNonXHR: function() {},        
        
        onSubmit: function( filename, extension, uploadBtn, size, prevImg ) {
            var item = document.createElement('div'),
                name = document.createElement('div');
                                
            item.className = 'picker-item';            
            name.className = 'picker-name';
            name.innerHTML = filename;
            item.appendChild( name ); 
            
            if ( ss.XhrOk ||
                self._opts.progressUrl ||
                self._opts.sessionProgressUrl ||
                self._opts.nginxProgressUrl )
            {
                var sizeBox = document.createElement('div'),
                    prog = document.createElement('div'),
                    progBar = document.createElement('div');  
                    
                sizeBox.className = 'picker-size';
                item.appendChild( sizeBox );                                        
                this.setFileSizeBox( sizeBox );                    

                prog.className = 'picker-progress';
                progBar.className = 'picker-progress-bar';  
                prog.appendChild( progBar );                
                this.setProgressBar( progBar );
            }
            
            if ( ss.XhrOk ) {
                var cancelBtn = document.createElement('button');
                cancelBtn.type = 'button';
                cancelBtn.className = 'picker-btn picker-cancel';
                cancelBtn.innerHTML = '&#10006; Cancel';
                item.appendChild( cancelBtn );
                this.setAbortBtn( cancelBtn, true );
            }
        }
    };
    
    ss.extendObj( options, overrides );        

    ss.SimpleUploader( options );
    
    openBtn.off = ss.addEvent( openBtn, 'click', function() {
        wrap.style.display = 'block';
    });     
};