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
  * Looking for a number of solutions which can include:
    * File concatenation
    * File minification
    * CDN Hosted
    * Caching
    * etc.
    
    
* Traditionally, why has it been better to serve site assets from multiple domains?
  * How many resources will a browser download from a given domain at a time?
  * What are the exceptions?
    * Bonus points for identifying mobile as a possible downside (http://www.mobify.com/blog/domain-sharding-bad-news-mobile-performance/)
    * Bonus points for identifying HTTP2 / SPDY as an exception
    
    
* Name 3 ways to decrease page load. (perceived or actual load time)

* If you jumped on a project and they used tabs and you used spaces, what would you do?
  * Suggest the project utilize something like EditorConfig (http://editorconfig.org)
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
