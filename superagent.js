

superagent
  .post('https://api.example.com/login')
  .send(postData)
  .then(response => {
      console.log('Respuesta completa del servidor:', response);
  })
  .catch(error => {
      console.error('Error:', error);
  });


       superagent
          .get('https://api.example.com/data')
          .then(response => console.log(response.body))
          .catch(error => console.error('Error:', error));

      la respuesta la da en response.body --> importante
#-----------------------------------------------------
   request
       .post('/api/pet')
       .send({ name: 'Manny', species: 'cat' })
       .set('X-API-Key', 'foobar')
       .set('Accept', 'application/json')
       .then(res => {
          alert('yay got ' + JSON.stringify(res.body));
       });

#-------------------------------------------------------
       request
       .get('/search')
       .query({ query: 'Manny' })
       .query({ range: '1..5' })
       .query({ order: 'desc' })
       .then(res => {

       });
#----------------------------------------------------
        request
        .get('/querystring')
        .query('search=Manny&range=1..5')
        .then(res => {

        });
#-----------------------------------------------------
        request.post('/user')
        .set('Content-Type', 'application/json')
        .send('{"name":"tj","pet":"tobi"}')
        .then(callback)
        .catch(errorCallback)
#------------------------------------------------------
# tipo formData enviando ..
  
  request.post('/user')
        .type('form')
        .send({ name: 'tj' })
        .send({ pet: 'tobi' })
        .then(callback, errorCallback)

#--------------------------------------------------------
       request.post('/user')
       .type('application/json')

     request.post('/user')
       .type('json')

     request.post('/user')
       .type('png')

#------------------------------------
      request.post(url)
      .attach('field_name', file)
      .on('progress', event => {
        /* the event is:
        {
          direction: "upload" or "download"
          percent: 0 to 100 // may be missing if file size is unknown
          total: // total file size, may be missing
          loaded: // bytes downloaded or uploaded so far
        } */
      })
      .then()

#------------------------------------------
  



