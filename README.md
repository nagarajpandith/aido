<img src="https://res.cloudinary.com/dpfpk49oa/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1693113157/medical-check_lqv20o.jpg?_s=public-apps" width="100"/>

# Aido
🏆 Awarded the 'Most Innovative Approach' at [NivHack](https://niveussolutions.com/hackathon) 2023 hosted at Niveus Solutions Pvt. Ltd., Mangalore.

<img src="https://github.com/nagarajpandith/aido-client/assets/83623339/a36de8a0-41f1-43bf-93b4-51e2516d046d" width="500" />

- [Live URL](https://aido-ar2ndw3szq-uc.a.run.app/)
- Backend was built with Flask -- [Backend Repo](https://github.com/NidheeshaT/aido-server)
- Both client & server were dockerized & deployed on [Google Cloud Run](https://cloud.google.com/run)
- [Final Presentation Pitch Deck](https://www.canva.com/design/DAFstFPq9mU/VrI2Bq1hMvutvrdiTBLdRw/view?utm_content=DAFstFPq9mU&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink)

> **NOTE**
> The deployments might be down right now as the Cloud access was given only during the hackathon.

## Features
- Virtually Interactive 3D Character with speech & hand gestures
- Multilingual Chat Sessions in different languages 
- Follow-up Questions based on previous conversation 
- Persistent chat sessions considering chat history of user 
- Personalised medical query & mental health support 
- Multilingual Voice Chat Support

## Architecture
![image](https://github.com/nagarajpandith/aido-client/assets/83623339/bfe71acf-7b0a-497a-9c9a-4023ba835823)

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

## Screenshots
![4](https://github.com/nagarajpandith/aido-client/assets/83623339/4934cc2a-d8dc-4d2b-8371-e8ca0c04c060)
![5](https://github.com/nagarajpandith/aido-client/assets/83623339/afa9cc57-4c06-4805-80a2-2339b699a3a1)
![6](https://github.com/nagarajpandith/aido-client/assets/83623339/f259b79e-7cec-48ed-88bf-c75c647f5a61)
![7](https://github.com/nagarajpandith/aido-client/assets/83623339/88cff44a-f68a-4dfc-8173-62b696387708)
![8](https://github.com/nagarajpandith/aido-client/assets/83623339/a925f607-f0be-4c32-9766-bb04ca311547)

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
