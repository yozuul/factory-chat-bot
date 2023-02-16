import { Context as ContextTelegraf } from 'telegraf';

export interface Context extends ContextTelegraf {
   session: {
      path?: 'home' | 'products' | 'newArea' | 'newChannel' | 'subscribe'
   };
}