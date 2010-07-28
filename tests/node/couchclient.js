var
  DB_NAME  = "commonjs-couchdb-client-test",
  DB_NAME2 = "commonjs-couchdb-client-test-mirror",
  TEST_ID  = "ABC123",
  TEST_DOC = { hello: "world" },
  assert   = require("assert"),
  couchdb  = require("../../lib/couchdb"),
  when     = require("promised-io/promise").when,
  client   = couchdb.createClient({ 
               port: 5984, 
               host: "192.168.15.52", 
               user: "dev", 
               password: "asdfasdf"
             }),
  sys      = require("sys");

exports["should get all dbs"] = function() {
  var 
    hsaRun = false,
    response = null;
    
  var HttpClient = require("promised-io/http-client").Client;
  var httpClient = new HttpClient();

  return when(client.allDbs(), function success(resp) {
    assert.notEqual(null, resp);
    assert.ok(Array.isArray(resp), "Response should be an array: " + sys.inspect(resp));
  }, function error(err) {
    assert.ok(false, err);
  });
};

if (require.main == module) {
  require("patr/runner").run(exports);
}

/*exports["should create db"] = function(assert, beforeExit) {
  var response = null;
  
  client.db(DB_NAME).create(function(err, resp) {
    response = resp;
  });
  
  client.db(DB_NAME).exists(function(err, found) {
    assert.ok(found);
  });
  
  client.db(DB_NAME).remove(function(err, resp) {
    assert.equal(null, err, JSON.stringify(err));
    assert.ok(resp.ok, JSON.stringify(resp));
  });
  
  beforeExit(function() {
    assert.notEqual(null, response);
  });
};*/
/*
exports["should get UUIDs"] = function(assert, beforeExit) {
  var 
    count  = 5, 
    hasRun = false;
  
  client.uuids(count, function(err, resp) {
    hasRun = true;
    assert.notEqual(null, resp);
    assert.equal(null, err);
    assert.equal(count, resp.uuids.length, sys.puts(JSON.stringify(resp)));
  });
  
  beforeExit(function() {
    assert.ok(hasRun, "Callback should've run");
  })
};

exports["should not find database that does not exist"] = function(assert, beforeExit) {
  var hasRun = false;
  
  client.db("asdfasdfadsfsdukiuy").exists(function(err, found) {
    hasRun = true;
    assert.equal(null, err);
    assert.equal(found, false, "Should not find db that does not exist");
  });
  
  beforeExit(function() {
    assert.ok(hasRun, "Should have called callback");
  });
};

exports["should save documnet WITH _id specified"] = function(assert, beforeExit) {
  var 
    hasRun = false,
    db     = client.db(DB_NAME),
    doc    = { _id: "test-doc", hello: "world" };
  
  db.openDoc(doc._id, function(err, existingDoc) {
    // Remove the doc if it exists
    if (!err && existingDoc) {
      require("sys").puts("Removing existing doc");
      db.removeDoc(existingDoc._id, existingDoc._rev, function(err, resp) { 
        require("sys").puts(JSON.stringify(err));
        require("sys").puts(JSON.stringify(resp));
      });
    }
    
    db.saveDoc(doc, function(err, resp) {
      hasRun = true;
      assert.equal(null, err);
      assert.equal(doc._id, resp.id, JSON.stringify(resp));
      assert.equal("string", typeof resp.rev, JSON.stringify(resp));
      
      db.removeDoc(doc._id, resp.rev, function(err, resp) { 
        assert.equal(null, err, JSON.stringify(err));
      });
    });
  });
  
  beforeExit(function() {
    assert.ok(hasRun, "Should have called callback");
  });
};

exports["should save document WITHOUT _id specified"] = function(assert, beforeExit) {
  var 
    hasRun = false,
    db     = client.db(DB_NAME),
    doc    = { hello: "world" };
  
  db.saveDoc(doc, function(err, resp) {
    hasRun = true;
    assert.equal(null, err);
    assert.equal("string", typeof resp.id);
    assert.equal("string", typeof resp.rev);
    
    db.removeDoc(resp.id, resp.rev, function(err, resp) {
      assert.equal(null, err, JSON.stringify(err));
      assert.ok(resp.ok, JSON.stringify(resp));
    });
  });
  
  beforeExit(function() {
    assert.ok(hasRun, "Should have called callback");
  });
}*/