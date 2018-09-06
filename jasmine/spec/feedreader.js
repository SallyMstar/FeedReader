/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */

// ------------ First Test Suite -----------
// Test to be sure all feeds are
    describe('RSS Feeds', function() { 
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('have valid urls', function() {
            for(let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
                console.log(feed.url);
            }
         })

        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('have names', function() {
            for(let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
                console.log(feed.name);
            }
         })
    });


    /* Write a new test suite named "The menu" */

        /* Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
    describe('The menu', function() {
            let view = document.body;
            let trigger = view.classList;
            let menuIcon = $('.menu-icon-link');

            console.log(trigger);
         it('Page starts with hidden menu', function() {
            expect(trigger).toContain("menu-hidden");
         })

         /* Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('Menu shows when clicked', function() {
            // simulate click
                menuIcon.click();
            // retrieve class value after simulated click
                trigger = view.className;
                expect(trigger).not.toContain("menu-hidden");
                });

          it('Menu hides when clicked again', function() {
            // simulate click
                menuIcon.click();
            // retrieve class value after simulated click
                trigger = view.className;
                expect(trigger).toContain("menu-hidden");               
                });
    });

    /* Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        
        beforeEach(function(done) {
            loadFeed(0,done);
        });

        it('feed container has content', function(){
            let feedContainer = document.querySelector('.feed');
            let feedEntries = document.querySelectorAll('.entry');
            // Double-check the number of entries
              console.log(feedEntries.length); 

            expect(feedEntries.length).toBeGreaterThan(0);
        });
    });


    /* Write a new test suite named "New Feed Selection" */
    // Compare each feed to the previous one to be sure the content is updating properly
    describe('New Feed Selection', function() {
            // create the variables needed to retrieve feeds and store them in an array
            const feedContainer = document.querySelector('.feed');
            const feedMill = [];

        beforeEach(function(done) {  // create the async functions to run prior to comparisons 
            loadFeed(0, function() {
                feedMill.push($('.feed').html());
            loadFeed(1, function() {
                feedMill.push($('.feed').html());
                done();
            });
            });
        })

        it('content updates on change', function() {
            // Retrieve entries for each feed and index each.
            Array.from(allFeeds).forEach(function(entry, index) {
                // If it's the last feed, skip the comparison to successor as there isn't one
                if(feedMill[1]) {
                    // Compare each entry to the previously saved entry to be sure the content isn't the same
                    expect(feedMill[0]).not.toEqual(feedMill[1]);
// Console print to verify output as expected
                    console.log(feedMill[0]);
                    console.log(" compared to ");
                    console.log(feedMill[1]);
                    console.log("---------------------");
                } else {
                    console.log("end of list");
                }
        });
        });
    });
}());