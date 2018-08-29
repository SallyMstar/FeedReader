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


        /* TODO: Write a test that loops through each feed
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

        /* TODO: Write a test that loops through each feed
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


    /* TODO: Write a new test suite named "The menu" */

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
    describe('The menu', function() {
            let view = document.body;
            let trigger = view.className;
            let menuIcon = $('.menu-icon-link');

            console.log(trigger);
         it('Page starts with hidden menu', function() {
            expect(trigger).toMatch("menu-hidden");
         })

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('Menu shows when clicked', function() {
            // simulate click
                menuIcon.click();
            // retrieve class value after simulated click
                trigger = view.className;
                expect(trigger).not.toMatch("menu-hidden");
                });

          it('Menu hides when clicked again', function() {
            // simulate click
                menuIcon.click();
            // retrieve class value after simulated click
                trigger = view.className;
                expect(trigger).toMatch("menu-hidden");               
                });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
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
            expect(feedContainer.children.length === 0).not.toBe('true');
        });
    });


    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
            let feedContainer = document.querySelector('.feed');
            let feedMill =  [];
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        beforeEach(function(done) {
            loadFeed(0);
            let feed1 = feedContainer.children[0].innerText;

            loadFeed(1,done);
            let feed2 = feedContainer.children[1].innerText;

            feedMill.push(feed1);
            feedMill.push(feed2);
        });
        it('content updates on change', function() {
            expect(feedMill[0] != feedMill[1]).toBe(true);
        })
    });
}());
