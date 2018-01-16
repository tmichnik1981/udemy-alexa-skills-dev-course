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

- Goal: wishing our guest
- Invocation
  - Name: **greeter** - must appear to activate our skill
  - ie. open/launch/talk to/begin **greeter** - activating the skill
  - tell/ask **greeter** to/for/about <some request>  - activating  and requesting in the same time
- Requests
  - Alexa, ask greeter to say hello to **John**
  - Alexa, ask greeter to wish our guest **John**
  - Alexa, ask greeter to wish **John**
- Response
  - Hello **John**, Good morning

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

2. Modify your lambda code

   ```javascript
   /*---------------------------------------*/
    if(request.intent.name === "HelloIntent"){
      let name = request.intent.slots.FirstName.value;
     options.speechText = `Hello <say-as interpret-as="spell-out">${name}</say-as> ${name}. `;
     options.speechText += getWish();

      getQuote(function(quote, err){
   /*---------------------------------------*/         

   function buildResponse(options){
       var response = {
           "version": "1.0",
           "response": {
           "outputSpeech": {
               "type": "SSML",
               "ssml":"<speak>" + options.speechText + "</speak>" 
             },
             "shouldEndSession": options.endSession
       }
   };

       if(options.repromptText){
           response.response.reprompt = {           
                   "outputSpeech": {
                     "type": "SSML",
                     "text": "<speak>" +options.repromptText+ "</speak>" 
                   }  
           };
       }
       return response;
   }
   ```

###### Uploading lambda automation

1. Install python

2. AWS CLI setup

   - Install cli:`pip install awscli`. 
   - Create a user and give permissions at IAM Management console
     - Go to https://console.aws.amazon.com/iam/home
     - Go to **Users** section
     - User name: "alexaskill"
     - Access type: **Programmatic access**
     - Click: **Next: Permissions**
     - Select: **Attach existing policies directly**
     - Type "lambda" in the table
     - Select **AWSLambdaFullAccess**
     - Click: **Next: Review**
     - Click: **Create User**
     - Copy **Acccess key** and **Secret Access Key**
   - AWS configure
     - type `aws configure`
     - pass **Acccess key** and **Secret Access Key**
     - region: eu-west-1
     - format: json

3. Upload lambda

   - Archive your lambda script

     ```shell
     # on Windows you may need to download zip.exe
     zip -r lambda_upload.zip index.js
     ```

   - Send an archived lambda to AWS

     ```shell
     aws lambda update-function-code --function-name GreetingsSkill --zip-file fileb://lambda_upload.zip

     # you will see the output like
     {
         "TracingConfig": {
             "Mode": "PassThrough"
         },
         "CodeSha256": "nNnwyW1HITZGsjD2oo8FLb7nh6/geM0Jum5reseq5bg=",
         "FunctionName": "GreetingsSkill",
         "CodeSize": 1408,
         "MemorySize": 128,
         "FunctionArn": "arn:aws:lambda:eu-west-1:235502691856:function:GreetingsSkill",
         "Version": "$LATEST",
         "Role": "arn:aws:iam::235502691856:role/lambda_basic_execution",
         "Timeout": 3,
         "LastModified": "2018-01-11T14:54:42.292+0000",
         "Handler": "index.handler",
         "Runtime": "nodejs6.10",
         "Description": ""
     }

     ```



###### Sessions

When we want to move the info from one intent to another withing a session or when we need to pass the information in steps because full information would be too big. 

1. Add new Intents.

   ```
   HelloIntent say hello to {FirstName}
   HelloIntent wish our guest {FirstName}
   HelloIntent wish {FirstName}

   QuoteIntent get me a quote
   QuoteIntent get a quote

   NextQuoteIntent more
   NextQuoteIntent one more
   NextQuoteIntent yes
   ```

2. Update lambda's code

   ```javascript

        /*---------------------------------------*/
       }else if(request.type == "IntentRequest"){
           if(request.intent.name === "HelloIntent"){
               
               handleHelloIntent(request, context)
   		//New intent!!!
           }else  if(request.intent.name === "QuoteIntent"){
               handleQuoteIntent(request, context, session);
            //New intent!!! 
           }else  if(request.intent.name === "NextQuoteIntent"){
               handleNextQuoteIntent(request, context, session);
           //Handling built-in intents: StopIntent and   CanceIntent
           }else if (request.intent.name === "AMAZON.StopIntent" 
                     || request.intent.name === "AMAZON.CanceIntent") {
              
             context.succeed(buildResponse(
               {
                   speechText: "Good bye. ",
                   endSession: true
               }));
           }else {
               throw "Unknown intent";
           }
        } 
   /*--------------------------------------*/

   function getQuote(callback){
     /*--------*/ 
   }

   function getWish(){
    /*--------*/ 
   }

   function buildResponse(options){
       var response = {
           "version": "1.0",
           "response": {
           "outputSpeech": {
               "type": "SSML",
               "ssml":"<speak>" + options.speechText + "</speak>" 
             },
             "shouldEndSession": options.endSession
       }
   };

       if(options.repromptText){
           response.response.reprompt = {           
                   "outputSpeech": {
                     "type": "SSML",
                     "text": "<speak>" +options.repromptText+ "</speak>" 
                   }  
           };
       }
   	//passing session attributes to the session
       //it will be send back
       if(options.session && options.session.attributes){
           response.sessionAttributes = options.session.attributes;
       }

       return response;
   }

   function handleLaunchRequest(context){
   	/*--------*/ 
   }

   function handleHelloIntent(request, context){
       let options = {};
       
           let name = request.intent.slots.FirstName.value;
           options.speechText = `Hello <say-as interpret-as="spell-out">${name}</say-as> ${name}. `;
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
   }
   function handleQuoteIntent(request, context, session){
       let options = {};
       options.session = session;

       getQuote(function(quote, err){
           if(err){
               context.fail(err);
           }else{
               options.speechText=quote;
               options.speechText += " Do you want to listen to one more quote";
               options.repromptText = "You can say yes or one more";
               //passing flag "true" 
               //it will send back with a new request 
               options.session.attributes.quoteIntent = true;
               options.endSession = false;
               context.succeed(buildResponse(options));
           }
       });
   }
   function handleNextQuoteIntent(request, context, session){
       let options = {};
       options.session = session;
       //checking if flag quoteIntent was set previously
       if(session.attributes.quoteIntent){

       getQuote(function(quote, err){
           if(err){
               context.fail(err);
           }else{
               options.speechText=quote;
               options.speechText += " Do you want to listen to one more quote";
               options.repromptText = "You can say yes or one more";
              // options.session.attributes.quoteIntent = true;
               options.endSession = false;
               context.succeed(buildResponse(options));
           }
       });

   }else{
       options.speechText = " Wrong invocation of this intent. "
       options.endSession = true;
       context.succeed(buildResponse(options));
   }
   }
   ```

3. Update **Intent Schema**

   - Alexa provides the  [ build-in intents](https://developer.amazon.com/docs/custom-skills/standard-built-in-intents.html), ie. AMAZON.StopIntent, AMAZON.HelpIntent. However you still need to implement handling those events in lambda.

   ```json
   {
     "intents":[
       {
         "intent" : "HelloIntent",
         "slots" : [
           {
             "name": "FirstName",
             "type": "GUEST_NAMES"
           }
         ]
       },
   	{
   		"intent": "QuoteIntent" 
   	},
   	{
   		"intent": "NextQuoteIntent" 
   	},
   	{
   		"intent": "AMAZON.StopIntent" 
   	},
   	{
   		"intent": "AMAZON.CancelIntent" 
   	}
     ]
   }
   ```

###### Home cards 

> Interactions between a user and an Alexa device can [include *home cards*](https://developer.amazon.com/docs/custom-skills/include-a-card-in-your-skills-response.html) displayed in the Amazon Alexa App, the companion app available for Fire OS, Android, iOS, and [desktop web browsers](http://alexa.amazon.com/). These are graphical cards that describe or enhance the voice interaction. A custom skill can include these cards in its responses.

1. Modify lambda's code

   - For diplaying images in a card use free to use pictures from the web 

   ```javascript
   function buildResponse(options){
    /*-----------*/
        if(options.cardTitle){
           response.response.card = 
           {
               type: "Simple",
               title: options.cardTitle
           }
           if(options.imageUrl){
               response.response.card.type = "Standard";
               response.response.card.text = options.cardContent;
               response.response.card.image = {
                   smallImageUrl: options.imageUrl,
                   largeImageUrl: options.imageUrl
               };
           } else{
               response.response.card.content = options.cardContent;
           }
       }
     /*------------*/
   }

   /*------------*/
   function handleHelloIntent(request, context){
       let options = {};
       
           let name = request.intent.slots.FirstName.value;
           options.speechText = `Hello <say-as interpret-as="spell-out">${name}</say-as> ${name}. `;
           options.speechText += getWish();
           options.cardTitle = `Hello ${name}!`;

           getQuote(function(quote, err){
               if(err){
                   context.fail(err);
               }else{
                   options.speechText+=quote;

                   options.cardContent = quote;
                   options.imageUrl = "https://upload.wikimedia.org/wikipedia/commons/5/5b/Hello_smile.png";
                   options.endSession = true;
                   context.succeed(buildResponse(options));
               }
           });
   }
   ```

2. Card part in a sample response

   ```json
   "card": {
               "type": "Standard",
               "title": "Hello John!",
               "text": "All I can say about life is, Oh God, enjoy it! ",
               "image": {
                         "smallImageUrl":         "https://upload.wikimedia.org/wikipedia/commons/5/5b/Hello_smile.png",
                         "largeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/5/5b/Hello_smile.png"
                        }
           }
   ```

###### Debugging

- For debugging errors you should consider add logging to your lambada script. Logging (especially huge objects) should be conditional so that not to slow down your function.

  ```javascript
   if(process.env.NODE_DEBUG_EN){
          console.log("Request:\n" + JSON.stringify(event, null, 2));   
  }
  ```

- Running locally you add a local environment variable to the command 

  ```shell
  env NODE_DEBUG_EN=1 lambda-local -l index.js -h handler -e event.json
  ```

- In [aws consol](aws.amazon.com) you can do the same

  - Open your function
  - Go to **Environment variables** section
  - Enter your variable: NODE_DEBUG_EN = "1"

- Verify your logs

  - Open your function 
  - Go to **Monitoring** tab
  - open link **Jump to Logs**

###### Testing with Mocha

1. Install Mocha and Chai

   ```shell
   npm install -g mocha
   npm install chai
   ```

2. Create a **test.js** file  in a directory with your lambda function

   ```javascript
   //always use strict
   'use strict'

   /**
    * chai - helpful checks
    * loading chai module
   */
   var expect = require('chai').expect,  
   /**
    * loading lambda's module
    */
   lambdaToTest = require('./index')

   //object passed to a lambda
   function Context() {
     this.speechResponse = null;
     this.speechError = null;

     this.succeed = function(rsp) {
       this.speechResponse = rsp;
       this.done();
     };

     this.fail = function(rsp) {
       this.speechError = rsp;
       this.done();
     };

   }

   //validation
   function validRsp(ctx,options) {
        expect(ctx.speechError).to.be.null;
        expect(ctx.speechResponse.version).to.be.equal('1.0');
        expect(ctx.speechResponse.response).not.to.be.undefined;
     /*--------**/
   }
   function validCard(ctx) {
        expect(ctx.speechResponse.response.card).not.to.be.undefined;
        expect(ctx.speechResponse.response.card.type).to.be.equal('Simple');
        expect(ctx.speechResponse.response.card.title).not.to.be.undefined;
        expect(ctx.speechResponse.response.card.content).not.to.be.undefined;
   }
   //event template passed to a lambda
   var event = {
     session: {
       new: false,
       sessionId: 'session1234',
       attributes: {},
       user: {
         userId: 'usrid123'
       },
       application: {
         applicationId: 'amzn1.echo-sdk-ams.app.1234'
       }
     },
     version: '1.0',
     request: {
       intent: {
         slots: {
           SlotName: {
             name: 'SlotName',
             value: 'slot value'
           }
         },
         name: 'intent name'
       },
       type: 'IntentRequest',
       requestId: 'request5678'
     }
   };

   //test suite
   describe('All intents', function() {
     var ctx = new Context();

     /**test case
     	 testing LaunchIntent
     */
     describe('Test LaunchIntent', function() {

         /*setting the input data and calling lambda */
         before(function(done) {
           event.request.type = 'LaunchRequest';
           event.request.intent = {};
           event.session.attributes = {};
           ctx.done = done;
           lambdaToTest.handler(event , ctx);
         });

   	/*assertions*/
        it('valid response', function() {
          validRsp(ctx,{
            endSession: false,
          });
        });

        it('valid outputSpeech', function() {
          expect(ctx.speechResponse.response.outputSpeech.ssml).to.match(/Welcome/);
        });
       
        it('valid repromptSpeech', function() {
          expect(ctx.speechResponse.response.reprompt.outputSpeech.ssml)
            .to.match(/You can say/);
        });

     });
   /**OTHER TEST CASES*/  
    });  
   ```

3. Run your test `mocka test`


#### Developing "Greetings Skill" using Webservice (python)

###### Setup

1. Install python

2. Install [flask](http://flask.pocoo.org/)

   ```shell
   pip install Flask
   ```

3. Add greeting.py script

   ```python
   from flask import Flask
   app = Flask(__name__)

   @app.route("/")
   def hello():
       return "Hello World!"

   if __name__== "__main__":
       app.run()
   ```

4. Run `python greeting.py`

   - If you can see the result

     ```shell
      * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
     127.0.0.1 - - [15/Jan/2018 14:50:35] "GET / HTTP/1.1" 200 -
     127.0.0.1 - - [15/Jan/2018 14:50:35] "GET /favicon.ico HTTP/1.1" 404 -
     ```

   - it means that you service is running

   - stop the service

5. Implement a webservice

   - [Requirements for Your Web Service](https://developer.amazon.com/docs/custom-skills/host-a-custom-skill-as-a-web-service.html#requirements-for-your-web-service)


   - Sample code **tutorials\Greetings\webservice\greetings.py**
   - Sample test **tutorials\Greetings\webservice\test.py**

6. Test with curl

   ```shell
   curl -H "Content-Type: application/json" --data @event.json http://127.0.0.1:5000/alexa_end_point
   ```

###### Testing local webservice with Alexa skill

1. Download [ngrok](https://ngrok.com/download).
2. Run your service `python greeting.py` 
3. Expose your service outside using ngrok:  `ngrok http 5000`
   - Displayed address can be used in a skill to configure **http**  url instead of lambda's address

###### Flask-Ask framework

- [flask-ask](https://github.com/johnwheeler/flask-ask)
- [flask-ask quickstart](https://developer.amazon.com/blogs/post/Tx14R0IYYGH3SKT/Flask-Ask-A-New-Python-Framework-for-Rapid-Alexa-Skills-Kit-Development)
- [flask-ask tutorial](https://alexatutorial.com/flask-ask/)
- installation:  `pip install flask-ask `
- instaling requests module: `pip install requests`
- sample code: **tutorials\Greetings\webservice\greeting_ask.py**

#### Developing "Food Nutrition Lookup Skill"

- [Nutrient data](https://www.ars.usda.gov/northeast-area/beltsville-md/beltsville-human-nutrition-research-center/nutrient-data-laboratory/docs/sr28-download-files/)
- Script generating food db (json files) : **tutorials\FoodNutritionSkill\gen_food_js.py**

###### Creating a Lambda function

1. Init **Node** package

   - Might be neccessary to install **Winston** package: `npm install winston --save`

   ```shell
   npm init
   This utility will walk you through creating a package.json file.
   It only covers the most common items, and tries to guess sensible defaults.

   See `npm help json` for definitive documentation on these fields
   and exactly what they do.

   Use `npm install <pkg> --save` afterwards to install a package and
   save it as a dependency in the package.json file.

   Press ^C at any time to quit.
   name: (FoodNutritionSkill) food_nutrition
   version: (1.0.0)
   description: Food nutrition look up skill
   entry point: (index.js)
   test command: mocha test.js
   git repository:
   keywords:
   author:
   license: (ISC)
   ```

2. Copy  **tutorials\helper_files\alexa_skill_template.js** to **tutorials\FoodNutritionSkill\index.js**

3. Implement your lambda function: **index.js**

   - Sample code: **tutorials\FoodNutritionSkill\index.js**

4. Test locally

   - Run `source run` or `lambda-local -l index.js -h handler -e event.json`

###### Testing with mocha

1. Copy...
2. Implemen..
   - sds
3. Run test `env NODE_DEBUG_EN=1 mocha test.js`

