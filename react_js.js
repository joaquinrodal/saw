
    <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>

     <div id="hola"  x-init="
       
        ReactDOM.render(
        React.createElement('div', { style: {'color':'red'},className: 'text-[45px]' }, mensaje_notificacion ),
        document.getElementById('hola')
        );
       ">

       </div>
