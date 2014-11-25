some from https://github.com/darcyclarke/Front-end-Developer-Interview-Questions/blob/master/README.md

#### General Questions:

* If you have 5 different stylesheets, how would you best integrate them into the site?
  * <b>File concatenation</b>
    * Reduce the number of HTTP requests by combining the Javascript and CSS into single files. 
  * In addition those files should be minimized
  
* Can you describe the difference between progressive enhancement and graceful degradation? Bonus points for describing feature detection
  * <b>progressive enhancement</b>
    * Start by establishing a basic level of user experience that all browsers will be able to provide 
    * Also build in more advanced functionality that will automatically be available to browsers that can use it
    * means looking forward, is quite nice if you have the time
  * <b>graceful degradation</b>
    * building your web functionality so that it provides a certain level of user experience in more modern browsers
    * it will also degrade gracefully to a lower level of user in experience in older browsers
    * Degrading gracefully means looking back, and is often <b>necessary</b>

* How would you optimize a websites assets/resources?
  * File concatenation, merger multiple JS into one
  * File minification, compress JS & CSS
  * CDN (Content Delivery Network) Hosted, a network of servers in different geographical locations. Each server has a copy of a site’s files. When a visitor to your site requests a file, the file is delivered from the nearest server (or the one that’s experiencing the lightest load at the time).
  * Caching/ Customize Header Expiry
  * off-load the assets, separating the Javascripts, images, CSS and static files from main server where the website is hosted and place them on another server or rely on other web services.
  * handling web images, optimize images….

* Name 3 ways to decrease page load. (perceived or actual load time)
  * minimize http requests
  * reduce server response time
  * enable compression, zip the large page, reduce the bandage of page, reduce http response
  * enable browser caching
  * minify resources
  * optimize images, never scale down image
  * optimize CSS delivery, only use one CSS external file
  * reduce plugin and redirections

    
* Traditionally, why has it been better to serve site assets from multiple domains?
  * it can increase the number of assets a browser can download in parallel
  * Domain sharding is a technique to accelerate page load times by tricking browsers into opening more simultaneous connections than are normally allowed. It's a widely-used optimization tactic that enables browsers to make better use of high-bandwidth internet connections.
  * How many resources will a browser download from a given domain at a time?
    * IE: 2-6, chrom 6, firefox: 8
  * What are the exceptions?
    * Bonus points for identifying mobile as a possible downside (http://www.mobify.com/blog/domain-sharding-bad-news-mobile-performance/)
       * consumes extra CPU, memory and battery power
       * implement HTTP pipelining and no longer observe the old HTTP/1.1 connection rules.
    * Bonus points for identifying HTTP2 / SPDY as an exception


* If you jumped on a project and they used tabs and you used spaces, what would you do?
  * Suggest the project utilize something like EditorConfig (http://editorconfig.org)
    * define and maintain consistent coding styles between different editors and IDEs 
  * Conform to the conventions (stay consistent)
  * `issue :retab! command`
 
  
* Write a simple slideshow page
  * Bonus points if it does not use JS.
  
  
* What tools do you use to test your code's performance?
  * Profiler, JSPerf, Dromaeo
  
* If you could master one technology this year, what would it be?

* What are the differences between Long-Polling, Websockets and SSE?


* Explain the importance of standards and standards bodies.


* What is FOUC? How do you avoid FOUC?


* Do your best to describe the process from the time you type in a website's URL to it finishing loading on your screen.
