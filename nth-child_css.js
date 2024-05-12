

     .fijo{
          --color:red;
          & > :nth-child(n){
               background-color: var(--color); 
               width:50%;
               display:grid;
               justify-items: center;
               align-items: center;
               border: 3px white solid;
               color:white;
               height:40px;
               border-radius:10px;
               margin:auto;
               
          }
          
     }

<div  x-ref="ver2"
      class="grid grid-cols-[1fr,1fr,1fr]
             mt-[30px]  bg-yellow-200   fijo
             ">
     <div class=" grid grid-cols-[1fr,1fr]">
          <div>1a</div>
          <div>2a</div>
     </div>
     <div>2</div>

     <div>3</div>

</div>

