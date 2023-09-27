// chatApi.ts
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from 'zod';
import * as twilio from 'twilio';

// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const {TWILIO_ACCOUNT_SID} = process.env
const {TWILIO_AUTH_TOKEN} = process.env

const client = new twilio.Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

client.flexApi.v1.flexFlow
                 .create({
                    janitorEnabled: true,
                    friendlyName: 'mha-care chat',
                    chatServiceSid: 'IG73e50941a88e1aafa4bb686cfac1af48',
                    channelType: 'web'
                  })
                 .then(flex_flow => console.log(flex_flow.sid)).catch((err)=>{
                  console.log(err)
                 })
