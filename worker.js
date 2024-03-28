import { createClient, commandOptions } from 'redis';
import { updateProjectStatus } from './db.js';

const subscriber = createClient();
subscriber.connect();

const transcribe = async (id) => {
  console.log(`Transcribing audio from ${id}`);

  // Introducing a 10-second delay
  await new Promise((resolve) => {
    setTimeout(resolve, 10000);
  });

  console.log(`Transcription completed for ${id}`);

  await updateProjectStatus(id, 'processing');
};

const main = async () => {
  while (1) {
    const res = await subscriber.brPop(
      commandOptions({ isolated: true }),
      'atlas-projects',
      0
    );
    // console.log(res.element);
    const id = res.element;
    transcribe(id);
  }
};

main();
