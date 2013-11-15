var casper = require('casper').create({   
    verbose: true, 
    logLevel: 'debug',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/537.22 (KHTML, like Gecko) Chrome/25.0.1364.172 Safari/537.22',
    pageSettings: {
      loadImages:  false,         // The WebPage instance used by Casper will
      loadPlugins: false         // use these settings
    }
});

var email = casper.cli.get("email")
var password = casper.cli.get("password")

casper.on('remote.message', function(msg) {
    this.echo('remote message caught: ' + msg);
});

var url = 'https://wwws.mint.com/login.event';

casper.start(url, function() {
    console.log("page loaded");
});

casper.thenEvaluate(function(email, password){
    
    document.querySelector('#form-login-username').value = email;
    document.querySelector('#form-login-password').value = password;
    document.querySelector('.signup-submit').click();
    
}, {
  email: email,
  password: password
});

casper.thenOpen('https://wwws.mint.com/transaction.event', function() {
    
});


casper.then(function(){
    
    // grab all pending charges and put it into an array
    var pendingArray = this.getElementsInfo('.pending');
    
    // echo out the most recent pending charge
    this.echo(pendingArray[0].text)
    this.echo(pendingArray[0].html)
})

casper.run();