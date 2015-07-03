module("routes", {
  setup: function() {
    var harness = this;
    harness.data = {};

    // Set up a test router
    harness.SubRouter = Backbone.Router.extend({
      before: {
        "sync": ["beforeSync"],
        "sync/:id": ["handleID"],
        "sync/:id/:name": ["handleName"],

        "async": ["beforeAsync"]
      },

      routes: {
        "": "test",
        "sync": "sync",
        "sync/:id": "sync",
        "sync/:id/:name": "sync",
        "async": "async"
      },

      after: {
        "sync": ["afterSync"],
      },

      afterSync: function() {
        this.afterSync = true;
      },

      beforeSync: function() {
        this.beforeSync = true;
      },

      beforeAsync: function() {
        var self = this;
        var done = self.async();
        window.setTimeout(function() {
          self.beforeAsync = true;
          done();
        }, 500);
      },

      handleID: function(id) {
        harness.data = {
          route: "sub/sync/:id",
          context: this.router,
          args: arguments
        };
      },

      handleName: function(name) {
        harness.data = {
          route: "sub/sync/:id/:name",
          context: this.router,
          args: arguments
        };
      },

      test: function() {
        harness.data = {
          route: "sub",
          context: this.router,
          args: arguments
        };
      },

      sync: function() {
        harness.data = {
          route: "sub/sync",
          context: this.router,
          args: arguments
        };
      },

      async: function() {
        harness.data = {
          route: "sub/async",
          context: this.router,
          args: arguments
        };
      },
    });

    // Set up the router
    harness.router = new Backbone.RouteManager({
      routes: {
        "sub/": harness.SubRouter,

        "": "index",
        "params/:id/*path": "params"
      },

      index: function() {
        harness.data = {
          route: "",
          context: this.router,
          args: arguments
        };
      },

      params: function() {
        harness.data = {
          route: "params",
          context: this.router,
          args: arguments
        };
      }
    });

    // Do not trigger the initial route
  },

  teardown: function() {
    var handler = this;

    handler.router.navigate("", false);
    Backbone.history.stop();
  }
});

// Ensure the basic navigation still works like normal routers
test("navigation", function() {
  expect(2);

  var harness = this;

  // Trigger the manager route
  Backbone.history.start();
  equal(harness.data.route, "", "Manager route triggered");

  // Trigger the sub route
  harness.router.navigate("sub", true);
  equal(harness.data.route, "sub", "Sub route triggered");
});

test("events", function() {
  expect(2);

  var harness = this;

  // Trigger the manager route
  harness.router.on("route:index", function() {
    ok(true, "Route manager event triggered");
  });

  Backbone.history.start();

  // Trigger the sub route
  harness.router.routers["sub/"].on("route:test", function() {
    ok(true, "SubRouter event triggered");
  });

  harness.router.navigate("sub", true);
});

// Test params object
test("params", function() {
  expect(4);

  var harness = this;

  Backbone.history.start();

  // Test synchronous filters
  harness.router.navigate("params/5/lol/hi", true);
  equal(harness.data.route, "params", "Params triggered");
  equal(typeof harness.data.context.params, "object", "Params is an object");

  equal(harness.data.context.params.id, "5",
    "Param var contains the right value");

  equal(harness.data.context.params.path, "lol/hi",
    "Params splat contains the right value");
});

// Auto params mapping
test("mapping", function() {
  expect(2);

  var harness = this;

  Backbone.history.start();

  // Ensure mapping by name works
  harness.router.navigate("sub/sync/lol", true);
  equal(harness.data.route, "sub/sync", "Params triggered");
  equal(harness.data.args[0], "lol", "id mapped correctly");
});

// Synchronous filters
test("sync filters", function() {
  expect(3);

  var harness = this;

  Backbone.history.start();

  // Test synchronous filters
  harness.router.navigate("sub/sync", true);
  ok(harness.data.context.beforeSync, "beforeSync set correctly");
  equal(harness.data.route, "sub/sync", "Sync triggered");
  ok(harness.data.context.afterSync, "afterSync set correctly");
});

// Asynchronous filters
asyncTest("async filters", function() {
  expect(2);

  var harness = this;

  Backbone.history.start();

  // Test synchronous filters
  Backbone.history.on("after", function() {
    ok(harness.data.context.beforeAsync, "beforeAsync set correctly");
    equal(harness.data.route, "sub/async", "Async triggered");

    // Unbind
    Backbone.history.off("after");

    start();
  });
  harness.router.navigate("sub/async", true);
});
