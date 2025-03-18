import { Session } from 'node:inspector/promises';
import { writeFile } from 'node:fs/promises';

function cpuProfiling() {
  let _session: Session;

  return {
    async start() {
      _session = new Session();
      _session.connect();

      await _session.post('Profiler.enable');
      await _session.post('Profiler.start');

      console.log('Profiling started');
    },

    async stop() {
      console.log('Profiling stopped');

      const { profile } = await _session.post('Profiler.stop');
      if (!profile) return;

      const profileName = `cpu-profile-${Date.now()}.cpuprofile`;
      const profileString = JSON.stringify(profile);

      await writeFile(profileName, profileString);

      _session.disconnect();
    },
  };
}

const { start: startCpuProfiling, stop } = cpuProfiling();

function stopCpuProfiling() {
  const exitSignals = ['SIGINT', 'SIGTERM', 'SIGQUIT'];

  exitSignals.forEach(signal => {
    process.once(signal, async () => {
      await stop();
      process.exit(0);
    });
  });
}

export { startCpuProfiling, stopCpuProfiling };

// open *.cpuprofile with https://discoveryjs.github.io/cpupro/
