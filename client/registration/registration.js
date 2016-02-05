$(document).ready(function() {

  $.ajax({
    url: '/obie/',
    type: 'GET',
    contentType: 'application/json',
    success: function(session) {
      localStorage.setItem('obie', session);
    },
    error: function() {
      console.log('error getting session');
    }
  });

  var addHouse = function(house) {
    $.ajax({
      url: '/houses',
      type: 'POST',
      data: JSON.stringify(house),
      contentType: 'application/json',
      success: function(data) {
        console.log('new house added to the db');
        getHouseToken(data.insertId);
      }
    });
  };

  var getSession = function() {
    $.ajax({
      url: '/obie/',
      type: 'GET',
      contentType: 'application/json',
      success: function(session) {
        console.log('got initial session from registration page');
        localStorage.setItem('obie', session);
      }.bind(this),
      error: function() {
        console.log('error getting session');
      }
    });
  }

  var updateSession = function() {
    $.ajax({
      url: '/obie/tokenChange',
      type: 'GET',
      headers: {token: localStorage.getItem('obie')},
      contentType: 'application/json',
      success: function(session) {
        console.log('updated the session: ', session);
        localStorage.setItem('obie', session);
        window.location.href ='/';
      }.bind(this),
      error: function() {
        console.log('error getting session');
      }
    });
  };

  var getHouseToken = function(houseId) {
    $.ajax({
      url: '/houses/token/'+houseId,
      type: 'GET',
      contentType: 'application/json',
      success: function(data) {
        var token = data[0].token; 
        // alert('Your token is ' + token);
        $('#house-code').val(token); 
      },
      error: function(error) {
        console.log('error: ', error);
      }
    });
  };

  var createHouse = function(event) {
    event.preventDefault();
    if (!$('#create-house-form').valid()) {
      return;
    }
    var house = {
      name: $('#house-name').val()
    };
    $('#create-house-div').hide('slow');
    $('#join-house-div').show('slow');
    $('#create-house-btn').hide();
    addHouse(house);
  };

  
  
  var updateUserHouseId = function(houseId) {
    $.ajax({
      url: '/houses/users',
      type: 'PUT',
      headers: {token: localStorage.getItem('obie')},
      data: JSON.stringify({houseId: houseId}),
      contentType: 'application/json',
      success: function(data) {
        // updateSession();
        window.location.href = '/logout';
      },
      error: function(error) {
        console.log('error: ', error);
      }
    })  
  };

  var findHouse = function(event) {
    // event.preventDefault();
    var houseCode = $('#house-code').val();
    //get request for house with provided houseCode
    $.ajax({
      url: '/houses/' + houseCode,
      type: 'GET',
      contentType: 'application/json',
      success: function(houseId) {
        //if successful, want to call updateUserHouseId
        //with appropriate userId, adding the houseId
        //Need somewhere to store that id when it comes back. 
        updateUserHouseId(houseId[0].id); 
      },
      error: function(error) {
        console.log('error: ', error);
      }
    });
  };

  // store session:
  getSession();

  // routing to correct form:
  // landlord
  $('#show-landlord').on('click', function() {
    window.location.href = '/registration/landlordRegistration.html'
  });

  // tenant
  $('#show-tenant').on('click', function() {
    $('#create-house-div').show('slow');
    $('#landlord-or-tenant').hide('slow');
  });

  // create a house
  $('#create-house-submit').on('click', createHouse);

  // join a house
  $('#join-house-submit').on('click', function(event) {
    event.preventDefault();
    if (!$('#join-house-form').valid()) {
      return;
    }
    findHouse();
  });

  // tenant
  // show join house div on button click
  $('#join-house-btn').on('click', function(event) {
    event.preventDefault();
    $('#create-house-div').hide('slow');
    $('#join-house-div').show('slow');
  });

  // show create house div on button click
  $('#create-house-btn').on('click', function(event) {
    event.preventDefault();
    $('#create-house-div').show('slow');
    $('#join-house-div').hide('slow');
  });

  // validate forms:
  $('#create-house-form').validate();
  $('#join-house-form').validate();

});