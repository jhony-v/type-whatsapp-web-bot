# type-whatsapp-web-bot

Create your bot responses using the power of decorators and fast implementation




### Example 

```ts
import {
 Query,
 Match,
 WhatsAppBotEngine,

} from "type-whatsapp-web-bot"

@Query()
class GenericBotResolver {
   
   @Match("bot:date")
   getCurrentDate() {
     return new Date().toLocaleDateString();  
   } 

   @Match("bot:sum {{a}}+{{b}}")
   getAddition({ a, b }) {
    return `result: ${Number(a)+Number(b)}`;
   }

   @Match("ping")
   getOpposite() {
    return "pong";
   }
}

const engine = new WhatsAppBotEngine({
   resolvers: [
    GenericBotResolver,
   ] 
});

engine.bootstrap();

```