<img src="https://res.cloudinary.com/dpfpk49oa/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1693113157/medical-check_lqv20o.jpg?_s=public-apps" width="100"/>

# Aido
Your Healthcare Ally

- [Live URL](https://aido-ar2ndw3szq-uc.a.run.app/)
- Backend was built with Flask -- [Backend Repo](https://github.com/NidheeshaT/aido-server)
- Both client & server were dockerized & deployed on [Google Cloud Run](https://cloud.google.com/run)

> **NOTE**
> The deployments might be down right now as the Cloud access was given only during the hackathon.

## Features
- Virtually Interactive 3D Character with speech & hand gestures
- Multilingual Chat Sessions in different languages 
- Follow-up Questions based on previous conversation 
- Persistent chat sessions considering chat history of user 
- Personalised medical query & mental health support 
- Multilingual Voice Chat Support

## Tech Stack
- Google PaLM2 based on model chat-bison using Google vertex AI
- Deployed both client & server on Google Cloud Run
- Database on Cloud SQL (PostgreSQL)
- Google OAuth
- Deepgram STT & ElevenLabs TTS
- CI/CD using Google Cloud source repositories & Cloud build
- Google Translate
- T3 Stack: Next.js, tRPC, Prisma, Typescript
- Flask Backend API

## Challenges Faced
- No finetuning available for chat-bison model
- It was our first time using & configuring GCP & Gitlab
- No Direct support of CI/CD of Gitlab on Cloud Run
- Didn't get access to Google TTS & STT due to Quota Limit
- The TTS generation & lipsyncing had a lot of latency

## Future Scope 
- MedPaLM integration for better accuracy.
- Using 3D model for other usecases like kids' trainer, lifestyle expert etc.
- Break the sentences according to fullstops & punctuations before processing further (to avoid latency)
- Can extend the concept to Metaverse domain

## Team Members - t3-tribe
- Nagaraj Pandith
- Swasthik Shetty
- Nidheesha T
