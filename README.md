# Aido
Your Healthcare Ally

[Live URL - Deployed on Cloud Run](https://aido-ar2ndw3szq-uc.a.run.app/)

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
- CI/CD using Google Cloud source repositories & Cloud build
- Google Translate
- T3 Stack: Next.js, tRPC, Prisma, Typescript
- Flask Backend API

## Challenges Faced
- No finetuning available for chat-bison model
- It was our first time using & configuring GCP & Gitlab
- No Direct support of CI/CD of Gitlab on Cloud Run
- Didn't get access to TTS & STT due to Quota Limit

## Future Scope 
- MedPaLM integration for better accuracy.
- Using 3D model for other usecases like kids' trainer, lifestyle expert etc.

## Team Members - t3-tribe
- Nagaraj Pandith
- Swasthik Shetty
- Nidheesha T