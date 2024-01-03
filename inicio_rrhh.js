# Cuando cargo la pagina base_admin.html

  
<body  style="display:none;"
       x-show="inicio"
       class="block bg-[#F8F8F8] " 
       x-data="data_admin()" x-init="
       usuario.id = {{session.id}};
       usuario_id();
       if('{{session.rol}}' === 'Trabajador'){
  
            ver_tab('perfil');
            tab2 = 'resumen';

         };
         start();

1º display:none --> para ocultar la pagina
2º x-show="inicio" --> ocultar mediante alpine el body ..
3º x-data="data_admin()"  ---> cargo el fichero de alpine
4º x-init="

      ejecuto 

           usuario.id = {{session.id}}
           cargo en usuario el id del usuario que esta entrando en la pagina
           una vez echo esto , pido al servidor que me de toda la informacion de este usuario.
