var SDK = {

  serverURL: "https://localhost:8000",

  request: function (options, cb) {


    //Perform XHR
    $.ajax({
      url: SDK.serverURL + options.url,
      method: options.method,
      xhrFields: { withCredentials: true },
      dataType: "json",
      data: JSON.stringify(options.data),
      success: function (data, status, xhr) {
        cb(null, data, status, xhr);
      },
      error: function (xhr, status, errorThrown) {
        cb({xhr: xhr, status: status, error: errorThrown});
      }
    });
  },

  login: function (username, pw, cb) {
    this.request({
      data: {
        username: username,
        password: pw
      },
      url: "/login",
      method: "POST"
    }, function (err, data) {

      //On login-error
      if (err) return cb(err);

      SDK.Storage.persist("username", data.userid);
      SDK.Storage.persist("userid", data.password);
      SDK.Storage.persist("password", data.username);

      cb(null, data);

    });
  },
// Bog SDK
  Book: {
    getAll: function (cb) {
      SDK.request({method: "GET", url: "/getbooks"}, cb);
    },
    create: function (data, cb) {
      SDK.request({method: "POST", url: "/createbook", data: data}, cb);
    },
    delete: function (data, cb) {
      SDK.request({method: "POST", url: "/deletebook", data: data}, cb);
    }

  },
// User SDK
  User: {
    getAll: function (cb) {
      SDK.request({method: "GET", url: "/getusers"}, cb);
    },
  // current: function () {
    //  return SDK.Storage.load("user");
    //},
    create: function (data, cb) {
      SDK.request({method: "POST", url: "/createuser", data: data}, cb);

    },

    delete: function(data,cb) {
      SDK.request({method: "POST", url: "/deleteuseradmin", data: data}, cb);
    },
    update: function(data,cb){
      SDK.request({method: "POST", url: "/updateuser", data: data}, cb);
    }
  },
// Annoncer SDK
  allAds: {
    getAll: function (cb) {
      SDK.request({method: "GET", url: "/getads"}, cb);
    },
    create: function (data, cb) {
      SDK.request({method: "POST", url: "/createad", data: data}, cb);

    },
    delete: function(data,cb){
      SDK.request({method: "POST", url: "/deletead", data: data}, cb);
    },

    reserve: function (data, cb) {
      SDK.request({method: "POST", url: "/reservead", data: data}, cb);
    },
    myads: function (cb) {
      SDK.request({method: "GET", url: "/getmyads"}, cb);
    },
    myreservations: function(cb) {
      SDK.request({method: "GET", url: "/getmyreservations"}, cb);

    },
    deletereservation: function (data, cb) {
      SDK.request({method: "POST", url: "/deletereservation", data: data}, cb);
    },
    unlockreservation: function (data, cb) {
      SDK.request({method: "POST", url: "/unlockad", data: data}, cb);
    }
  },



  logOut:function() {
    SDK.Storage.remove("tokenId");
    SDK.Storage.remove("userId");
    SDK.Storage.remove("user");
  },

  Storage: {
    prefix: "BoghandelSDK",


    persist: function (key, value) {
      window.localStorage.setItem(this.prefix + key, (typeof value === 'object') ? JSON.stringify(value) : value)
    }

    ,
    load: function (key) {
      var val = window.localStorage.getItem(this.prefix + key);
      try {
        return JSON.parse(val);
      }
      catch (e) {
        return val;
      }
    }
    ,
    remove: function (key) {
      window.localStorage.removeItem(this.prefix + key);

    }

  }};






