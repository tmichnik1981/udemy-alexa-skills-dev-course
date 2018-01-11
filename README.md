# Comprehensive Alexa Skill Development Course

#### Links

- [Mozilla JavaScript Docs](https://developer.mozilla.org/pl/docs/Web/JavaScript)
- [Node.js Tutorial](https://blog.risingstack.com/node-hero-tutorial-getting-started-with-node-js/)
- [Mocha Testing Framework](https://mochajs.org/)
- [Alexa on Amazon.com](https://www.amazon.com/b/ref=echo_dp_pack?node=16067214011)

#### General

- 10000 skills in a store
- Devices: Amazon Echo, Echo Dot
- Alexa - cloud-based voice service
- Alexa Voice Service (AVS)
- Alexa Skill Kit (ASK)
- Alexa Skill Store
- Use cases: play music, check weather get inf., news, sport scores, control smart things

###### Built-in features

- How is the weather
- Set my alarm for 1 hour
- Whats in the news
- IFTTT (trigger find my phone)
- Find me nearby thai restaurant
- Tell me about the movie <title>
- Smart home - Wemo, Philips Hue, Samsung SmarThings, Wink, Nest and many more


#### Developing "Greetings Skill"

- Goal: wishing our fuest
- Invocation
  - Name: **greeter** - must appear to activate our skill
  - ie. open/launch/talk to/begin **greeter** - activating the skill
  - tell/ask **greeter** to/for/about <some request>  - activating  and requesting in the same time
- Requests
  - Alexa, ask greeter to say hello to **John**
  - Alexa, ask greeter to wish our guest **John**
  - Alexa, ask greeter to wish **John**
- Response
  - Helo **John**, Good morning

#### Instructions

###### Creating a skill

1. Go to https://developer.amazon.com/

   - Select **Alexa**
   - Go to **Your Dashboard**
   - Select **Alexa Skill Kit**
   - Click **Create a New Skill** 

2. Fill **Skill Information**

   - Select Skill Type ([types of skills](https://developer.amazon.com/docs/ask-overviews/understanding-the-different-types-of-skills.html)) : **Custom Interaction Model** 
   - Name : "Greetings"
   - Invocation Name : "greeter"

3. Fill **Interaction Model**      

   - Intent Schema ([built-in intents](https://developer.amazon.com/docs/custom-skills/implement-the-built-in-intents.html#Available%20Built-in%20Intents))- JSON declaration of intents (features ) and slots  (variables) 

     - **slot** ([built-in slots](https://developer.amazon.com/docs/custom-skills/custom-interaction-model-reference.html#Slot%20Types))has a name and type
     - **slot  type** - built-in ([slot types ref](https://developer.amazon.com/docs/custom-skills/slot-type-reference.html)) or custom

     ```json
     {
       "intents": [
         {
           "intent": "HelloIntent",
           "slots": [
             {
               "name" : "FirstName",
               "type" : "GUEST_NAMES" 
             }
           ]
         }
       ]
     }
     ```

   - Custom Slot Types 

     - Enter Type - the same as used in **Intent Schema**

     - Enter Values - most possible values (you can restrict type to **only those values** programmatically)

       ```
       John
       James
       Annie
       Moana
       Emma
       Madison
       ```

   - Note that slot value passed to your service can be a bit different than provided on a list ie. **value four stars will be converted to 4 stars**  ([slot types values](https://developer.amazon.com/docs/custom-skills/custom-interaction-model-reference.html#custom-slot-type-values))

   - Sample Utterances - possible sencences used to invoke the intent (feature)

     ```
     # <INTENT_NAME> <SOME_TEXT> {<SLOT_NAME>}
     HelloIntent say hello to {FirstName}
     HelloIntent wish our guest {FirstName}
     HelloIntent wish {FirstName}
     ```

4. Configuration

   - Service : **AWS Lambda ARN** (most recommended).
   - In the Default field provide an url to your lambda function (or https service) ie. arn:aws:lambda:eu-west-1:235502691856:function:hello-world-alexa-skill
   - Account Linking : **No**

5. Test - when the lambda is already implemented

   - Section: **Service Simulator**,  **Enter Utterances** =   write one of the utterances  previously provided (without an intent name) ie. "say hello to James"

   - Click button **Ask Greetings** 

   - You can do a similar test with your Echo Dot on with [Echo Simulator](https://echosim.io/welcome)

     ```
     # Say 
     > Alexa, open greeter 
     # after receiving a resonse, say
     > say hello to John

     # Or just
     > Alexa, ask greeter to say hello to John
     ```

     ​

###### Creating a Lambda function

1. Go to https://aws.amazon.com/, login or create an account

2. Go to **Services** and choose **Lambda**

3. Click **Create function**
   - Select **Author from scratch** or  **Blueprints** (to start with some sample code)
   - Name: "GreetingsSkill"
   - Runtime: Node.js 6.10
   - Role: **Choose an existing role** if have done that before or **Create a custom role** and then IAM Role: **lambda_basic_execution**. Click **Allow**.
   - Existing role: **lambda_basic_execution**
   - Click **Create function**

4. Your new function **GreetingsSkill** is opened and you can continue with configuring and implementation.
   - In the **Designer** select **Alexa Skills Kit** trigger. Note that this kind of a trigger is not available for some locations. For sure it works for Ireland and US.
   - In the **Configure triggers**  section click **Add**
   - Handler: "index.handler" (by default), index - file, handler - main function
   - Other settings can be left as they are
   - Click **Save**

5. Implementation

   - possible requests (events) sent by Alexa skill kit to lambda

     ```
     i)   LaunchRequest       Ex: "Open greeter"
     ii)  IntentRequest       Ex: "Say hello to John" or "ask greeter to say hello to John"
     iii) SessionEndedRequest Ex: "exit" or error or timeout
     ```

   - Develop your lambda offline in your IDE, then pass to **Fuction code** section 

     ```js
     'use strict';
     /*
     	event - object with the request
     	context - a helper object for communication with AWS lambda ie. sending responses
     */
     exports.handler = function (event, context) {

     try{
     	let request = event.request;
     /**
     	Request 
         i)   LaunchRequest       Ex: "Open greeter"
         ii)  IntentRequest       Ex: "Say hello to John" or "ask greeter to say hello to
           		John"
         iii) SessionEndedRequest Ex: "exit" or error or timeout
      */
     if(request.type == "LaunchRequest"){
     	let options = {};
         options.speechText= "Welcome to Greetings skill. Using our skill you can greet your 		guests. Whom you want to greet? ",
           
         options.repromptText= "You can say for example, say hello to John. ",
         
           options.endSession= false
         // context.succeed() sending a response to Alexa
         context.succeed(buildResponse(options));

     }else if(request.type == "IntentRequest"){
     	let options = {};
       	//HelloIntent = intent name
         if(request.intent.name === "HelloIntent"){
         	let name = request.intent.slots.FirstName.value;
         	options.speechText = "Hello " + name + ". ";
         	options.speechText += getWish();
         	options.endSession = true;
         	context.succeed(buildResponse(options));
         }else {
         	throw "Unknown intent";
        	}
     } else if(request.type == "SessionEndedRequest"){

     }else{
     	context.fail("Unknown intent type");
     }
     }catch(e){
     	context.fail("Exception: " + e);
     }
     }

     function getWish(){
         var myDate = new Date();
         var hours = myDate.getUTCHours() - 8;
         if(hours < 0){
             hours  = hours + 24;
         }
         if(hours < 12){
             return "Good Morning. ";
         } else if(hours < 18){
             return "Good afternoon. ";
         } else{
             return "Good evening. ";
         }
     }

     function buildResponse(options){
         var response = {
             "version": "1.0",
             "response": {
             "outputSpeech": {
                 "type": "PlainText",
                 "text": options.speechText
               },
               "shouldEndSession": options.endSession
         }
     };

     	if(options.repromptText){
         	response.response.reprompt = {           
             	     "outputSpeech": {
                       "type": "PlainText",
                       "text": options.repromptText
                     }  
             };
         }
         return response;
     }
     ```

   - sample request

     ```json
     {
       "session": {
         "new": false,
         "sessionId": "session1234",
         "attributes": {},
         "user": {
           "userId": "usr123"
         },
         "application": {
           "applicationId": "amzn1.echo-sdk-ams.app.5acba9b5-6d09-4444-aaa8-618c56eb0335"
         }
       },
       "version": "1.0",
       "request": {
         "intent": {
           "slots": {
             "FirstName": {
               "name": "FirstName",
               "value": "John"
             }
           },
           "name": "HelloIntent"
         },
         "type": "IntentRequest",
         "requestId": "request5678"
       }
     }
     ```

   - Click **Test**

   - Pass a sample request and save

   - The Lambda can be tested with your new test

###### Improvements

1. Add requesting [forismatic](http://forismatic.com/en/api) to get random quatas.

   - Take api-url (http://api.forismatic.com/api/1.0/json?method=getQuote&lang=en&format=json)

   - Add quering to your lamba code

     ```js
     'use strict';
     //importing http module
     var http = require('http');

     exports.handler = function (event, context) {
       
       /*------------------------------------------------**/
            }else if(request.type == "IntentRequest"){
             let options = {};
             if(request.intent.name === "HelloIntent"){
                 let name = request.intent.slots.FirstName.value;
                 options.speechText = "Hello " + name + ". ";
                 options.speechText += getWish();

                 getQuote(function(quote, err){
                     if(err){
                         context.fail(err);
                     }else{
                         options.speechText+=quote;
                         options.endSession = true;
                         context.succeed(buildResponse(options));
                     }
                 });

             }else {
                 throw "Unknown intent";
             }
          }
     }
      /*------------------------------------------------**/

     //new function
     function getQuote(callback){
         var url ="http://api.forismatic.com/api/1.0/json?method=getQuote&lang=en&format=json";
         var req = http.get(url, function(res){
             var body = "";
             res.on('data', function(chunk){
                 body+=chunk;
             });

             res.on('end', function(){
                 body = body.replace(/\\/g,'');
                 var quote = JSON.parse(body);
                 callback(quote.quoteText);
             });

             res.on('error', function(err){
                 callback('', err);
             });
         });
     }
     ```

2. Testing locally

   - Install node.js

   - Node install procedure for macOS/linux (reference https://github.com/creationix/nvm)

     ```bash
     curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
     source ~/.bash_profile
     nvm install v4.3.2
     ```

   - For windows, please download node.js from https://nodejs.org/en/download.

   - Lambda local setup (https://github.com/ashiina/lambda-local)

     ```shell
     npm install -g lambda-local
     ```

   - Go to the directory with your lambda script and an event

     ```shell
     # index.js - lambda source code
     # event.json - request
     lambda-local -l index.js -h handler -e event.json
     ```

###### SSML ([Speech Synthesis Markup Language ](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speech-synthesis-markup-language-ssml-reference))

1. Testing SSML

   - SSML tags allow for controlling how outputtext is pronounced

   - Copy a sample to **Voice Simulator** in your skill

   - Click **Listen** 

     ```xml
     <speak>
         Here is a number spoken as a cardinal number: 
         <say-as interpret-as="cardinal">12345</say-as>.
         Here is a word spelled out: <say-as interpret-as="spell-out">hello</say-as>
     </speak>
     ```

2. Modify your lambda







