var fs = require('fs');
 
var csvFile = fs.readFileSync("friends_list.csv","utf8");

function Email(first_name, last_name, months_since_contact, email_address){
    this.first_name = first_name;
    this.last_name = last_name;
    this.months_since_contact = months_since_contact;
    this.email_address = email_address;
}

var csvParse = function(string){
    string = string.split("\n");
    var keys = string[0].split(",");
    var array = [];
    for(i=1; i<string.length; i++){
    array[i-1] = new Email();
    var count = 0;
    var keyValue = string[i].split(",");
        for(var prop in array[i-1]){
            array[i-1][prop] = keyValue[count];
            count++;
        }
    }
    return array;
};

var csvData = csvParse(csvFile);

var fs = require('fs');
 
var csvFile = fs.readFileSync("friends_list.csv","utf8");
var emailTemplate = fs.readFileSync('email_template.ejs', 'utf8');
 
function csvParse(csvFile){
    var arrayOfObjects = [];
    var arr = csvFile.split("\n");
    var newObj;
 
    keys = arr.shift().split(",");
 
    arr.forEach(function(contact){
        contact = contact.split(",");
        newObj = {};
 
        for(var i =0; i < contact.length; i++){
            newObj[keys[i]] = contact[i];
        }
 
        arrayOfObjects.push(newObj);
 
    })
 
    return arrayOfObjects;
}
 
friendList = csvParse(csvFile);
 
friendList.forEach(function(row){
 
    firstName = row["firstName"];
    numMonthsSinceContact = row["monthsSinceContact"];
 
    // we make a copy of the emailTemplate variable to a new variable to ensure
    // we don't edit the original template text since we'll need to us it for 
    // multiple emails
 
    templateCopy = emailTemplate;
 
    // use .replace to replace FIRST_NAME and NUM_MONTHS_SINCE_CONTACT with firstName and  monthsSinceLastContact  
    templateCopy = templateCopy.replace(/FIRST_NAME/gi,
    firstName).replace(/MONTHS_SINCE_CONTACT/gi, numMonthsSinceContact);
 
    console.log(templateCopy);
 
 
})

var FeedSub = require('feedsub');
 
 
var blogContent = new FeedSub('http://cbulacan9.github.io/atom.xml', {
        emitOnStart: true
});
 
 
blogContent.read(function(err,blogPosts){
  var posts = blogPosts;
  friend_list.forEach(function(person) {
       var first_name = person['firstName'];
       var email = person['emailAddress'];
       var numMonthsSinceContact = person["monthsSinceContact"];
       var friend_template = jade.compileFile('jade_template.jade');

  sendEmail(first_name, email, 'Christian Bulacan', 'cbulacan9@gmail.com', 'Check this out.', friend_template({
       FIRST_NAME: first_name,
       NUM_MONTHS_SINCE_CONTACT: numMonthsSinceContact,
       latestPosts: weekAgo(posts, new Date())
    }))
  })
})
