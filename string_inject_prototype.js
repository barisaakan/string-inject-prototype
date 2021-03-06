
String.prototype.inject = function injectNew(entry) {  

      var text = this;
      text = text.replace( /{{ /gi,"{{" );
      text = text.replace( / }}/gi,"}}" );
      var keyword;
      var numberOfUnknowns = ( text.split("{{").length-1 )
      var i;
      var k;
      var operations;
      var equation;
      var calculation;
      var rhs;

      for( i = 0; i< numberOfUnknowns; i++ ){

        keyword = text.split( "{{" )[1].split( "}}" )[0].trim();
        
        if( keyword.includes( "+" ) || keyword.includes( "-" ) || keyword.includes( "*" ) || keyword.includes( "/" ) ){
                    
          var originalKeyword = keyword;
          var numberOfOperations = ( ( keyword.split( " " ).length + 1 ) / 2 );
        
          for( k = 0;k<numberOfOperations;k++ ){

            var d = 2 * k;
            operations = keyword.split( " " )[d];
            keyword = keyword.replace( operations, entry[operations] );
                
          } 
   
          var product = eval( keyword ); 
          text = text.replace( "{{" + originalKeyword + "}}", product );
                
          }else if ( keyword.includes( "(" ) || keyword.includes( ")" ) ){

            calculation = keyword.split( "(" )[0]; 
            equation = entry[calculation];
            rhs = String(equation).split( "=>" )[1].trim();
            var numberOfOperations = ( ( rhs.split( " " ).length+1 ) / 2 );

            for( k = 0;k<numberOfOperations;k++ ){

              var d = 2 * k; 
              operations = rhs.split( " " )[d];
              rhs = rhs.replace( operations, entry[operations] );
                
            } 

            var product = eval( rhs );  
            text = text.replace( "{{" + keyword + "}}", product );
            
          }
          text = text.replace( "{{"+ keyword +"}}", entry[keyword] );
      }
  return text
}





      
