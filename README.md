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

   - Configuration

     - Service : **AWS Lambda ARN** (most recommended).
     - In the **Default** field provide an url to your lambda function (or https service) ie. **arn:aws:lambda:eu-west-1:235502691856:function:hello-world-alexa-skill**
     - Account Linking : **No**

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